import { useSyncExternalStore } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { exportData, importData, mesmoConteudo, type BackupFile } from '../../db/backup';
import { DATA_EPOCH_KEY, marcarBackup } from '../../db/local';
import { db } from '../../db/schema';
import { ErroAutorizacao, type DestinoSync } from './destino';
import { CLIENT_ID, entrarNoGoogle, esquecerToken, revogarAcesso, tokenAtual, type RetornoOAuth } from './googleAuth';
import { googleDrive } from './googleDrive';

/**
 * Sincronização automática com o Google Drive (ver regras-negocio.md §6 e
 * docs/proposta-sincronizacao.md). Um ciclo: baixar o arquivo remoto →
 * mesclar aqui (a mesma mesclagem do importar) → subir o resultado, se
 * mudou algo. A mesclagem é idempotente e não depende da ordem, então dois
 * aparelhos sincronizando ao mesmo tempo se acertam no ciclo seguinte.
 *
 * Opcional e dispensável: desligada por padrão, e o app funciona igual sem
 * ela. Nada aqui bloqueia o uso — falhas só mudam o status.
 */

const ESTADO_KEY = 'sync';
const ATRASO_ALTERACAO_MS = 30 * 1000; // depois da última alteração (fim de uma sessão de estudo)
const INTERVALO_FOCO_MS = 5 * 60 * 1000; // ao voltar pro app, se faz mais tempo que isso
const INTERVALO_LOGIN_MS = 10 * 60 * 1000; // entre idas automáticas ao Google
const TENTATIVAS = 3;
const LOGIN_FALHOU = 'nihongo-study:sync-login-falhou'; // sessionStorage: o código de erro que o Google devolveu
const ULTIMO_LOGIN = 'nihongo-study:sync-ultimo-login'; // sessionStorage

/** Estado guardado em `db.local` (só deste aparelho). */
export interface EstadoSync {
  conectado: boolean;
  conta?: string;
  ultimoSync?: number;
  /** Versão do arquivo remoto no último ciclo — se não mudou e nada mudou aqui, não há o que fazer. */
  versaoRemota?: string;
}

export type FaseSync = 'desligado' | 'ocioso' | 'sincronizando' | 'offline' | 'precisaLogin' | 'erro';

export interface StatusSync {
  fase: FaseSync;
  /** Há alteração local ainda não enviada. */
  pendente: boolean;
  erro?: string;
}

export const syncDisponivel = Boolean(CLIENT_ID);

// --- dependências externas --------------------------------------------------

/**
 * O que o motor usa de fora: o destino (Google Drive), o token e o login do
 * Google, e o diálogo de confirmação. Os testes trocam por implementações em
 * memória com `definirDependenciasSync` — o resto do motor não sabe disso.
 */
export interface DependenciasSync {
  destino: (token: string) => DestinoSync;
  tokenAtual: () => Promise<string | null>;
  entrarNoGoogle: (silencioso: boolean, conta?: string) => void;
  confirmar: (mensagem: string) => boolean;
}

const PADRAO: DependenciasSync = {
  destino: googleDrive,
  tokenAtual,
  entrarNoGoogle,
  confirmar: (mensagem) => confirm(mensagem),
};
let deps: DependenciasSync = PADRAO;

/** Troca dependências do motor (testes) e zera o estado em memória dele. */
export function definirDependenciasSync(parcial: Partial<DependenciasSync>): void {
  deps = { ...PADRAO, ...parcial };
  status = { fase: 'desligado', pendente: false };
  emAndamento = null;
  deNovo = false;
  ultimoCiclo = 0;
}

// --- status observável pela tela --------------------------------------------

let status: StatusSync = { fase: 'desligado', pendente: false };

/** Status atual (fora do React — a tela usa `useStatusSync`). */
export function statusSync(): StatusSync {
  return status;
}
const ouvintes = new Set<() => void>();

function setStatus(parcial: Partial<StatusSync>) {
  status = { ...status, ...parcial };
  ouvintes.forEach((f) => f());
}

export function useStatusSync(): StatusSync {
  return useSyncExternalStore(
    (f) => {
      ouvintes.add(f);
      return () => ouvintes.delete(f);
    },
    () => status
  );
}

async function lerEstado(): Promise<EstadoSync> {
  return ((await db.local.get(ESTADO_KEY))?.value as EstadoSync | undefined) ?? { conectado: false };
}

async function gravarEstado(parcial: Partial<EstadoSync>): Promise<void> {
  await db.local.put({ key: ESTADO_KEY, value: { ...(await lerEstado()), ...parcial } });
}

export async function estadoSync(): Promise<EstadoSync> {
  return lerEstado();
}

/** Estado guardado (conectado, conta, último sync), reativo. `undefined` enquanto carrega. */
export function useEstadoSync(): EstadoSync | undefined {
  return useLiveQuery(lerEstado, []);
}

// --- ciclo ------------------------------------------------------------------

export type MotivoSync = 'abertura' | 'foco' | 'navegacao' | 'alteracao' | 'saida' | 'online' | 'manual';

let emAndamento: Promise<void> | null = null;
let deNovo = false;
/** Enquanto o próprio motor grava a mesclagem — não conta como alteração local. */
let aplicandoRemoto = false;

/** Roda um ciclo (ou agenda mais um, se já há um rodando). Nunca lança erro. */
export function sincronizar(motivo: MotivoSync): Promise<void> {
  if (emAndamento) {
    deNovo = true;
    return emAndamento;
  }
  emAndamento = (async () => {
    try {
      do {
        deNovo = false;
        await cicloComTrava(motivo);
      } while (deNovo);
    } finally {
      emAndamento = null;
    }
  })();
  return emAndamento;
}

/** Trava entre abas do mesmo aparelho (quando o navegador tem a Web Locks API). */
async function cicloComTrava(motivo: MotivoSync): Promise<void> {
  if (!navigator.locks) return ciclo(motivo);
  await navigator.locks.request('nihongo-study-sync', () => ciclo(motivo));
}

async function ciclo(motivo: MotivoSync): Promise<void> {
  const estado = await lerEstado();
  if (!estado.conectado) {
    setStatus({ fase: 'desligado' });
    return;
  }
  if (!navigator.onLine) {
    setStatus({ fase: 'offline' });
    return;
  }
  const token = await deps.tokenAtual();
  if (!token) {
    if (podeIrAoGoogleSozinho(motivo)) {
      sessionStorage.setItem(ULTIMO_LOGIN, String(Date.now()));
      deps.entrarNoGoogle(true, estado.conta); // sai do app e volta em seguida
    }
    setStatus({ fase: 'precisaLogin', erro: sessionStorage.getItem(LOGIN_FALHOU) ?? undefined });
    return;
  }

  ultimoCiclo = Date.now();
  setStatus({ fase: 'sincronizando', erro: undefined });
  try {
    const destino = deps.destino(token);
    for (let i = 0; i < TENTATIVAS; i++) {
      if (await tentar(destino, estado, motivo)) {
        setStatus({ fase: 'ocioso' });
        return;
      }
    }
    // Outro aparelho gravando sem parar — tenta de novo no próximo gatilho.
    setStatus({ fase: 'ocioso' });
  } catch (err) {
    // O que não subiu continua pendente.
    if (err instanceof ErroAutorizacao) {
      await esquecerToken();
      setStatus({ fase: 'precisaLogin', pendente: true });
    } else {
      setStatus({ fase: 'erro', erro: (err as Error).message, pendente: true });
    }
  }
}

/**
 * Uma tentativa do ciclo. `false` se o arquivo remoto mudou no meio
 * (outro aparelho gravou) — aí repete tudo.
 */
async function tentar(destino: DestinoSync, estado: EstadoSync, motivo: MotivoSync): Promise<boolean> {
  // Atalho: nada mudou aqui nem lá desde o último ciclo. Não vale ao abrir o app: o aviso de
  // alteração pendente vive só na memória, e o app pode ter sido fechado antes de enviar.
  const atalho = motivo !== 'abertura' && motivo !== 'manual';
  if (atalho && !status.pendente && estado.versaoRemota !== undefined) {
    if ((await destino.versao()) === estado.versaoRemota) {
      await concluir(estado.versaoRemota);
      return true;
    }
  }

  const remoto = await destino.baixar();
  const pendenteAntes = status.pendente;
  setStatus({ pendente: false }); // o que mudar daqui em diante entra no próximo ciclo
  let subir = true;
  if (remoto) {
    const epocaRemota = epocaDoBackup(remoto.backup);
    const decisao = decidirEpoca(epocaRemota, await epocaLocal(), estado.versaoRemota !== undefined);
    const acao =
      decisao === 'perguntar' ? (deps.confirmar(mensagemDeEpoca(epocaRemota)) ? 'substituir-local' : 'mesclar') : decisao;
    aplicandoRemoto = true;
    try {
      if (acao === 'substituir-local') {
        await importData(remoto.backup, 'replace');
        subir = false;
      } else if (acao === 'mesclar') {
        await importData(remoto.backup, 'merge');
      }
      // 'substituir-remoto': este aparelho foi substituído — sobe sem mesclar.
    } finally {
      aplicandoRemoto = false;
    }
  }

  let versao = remoto?.versao;
  if (subir) {
    const local = await exportData();
    if (!remoto || !mesmoConteudo(local, remoto.backup)) {
      if (remoto && (await destino.versao()) !== remoto.versao) {
        setStatus({ pendente: pendenteAntes || status.pendente });
        return false;
      }
      versao = await destino.subir(local);
    }
  }
  await concluir(versao);
  return true;
}

async function concluir(versaoRemota: string | undefined) {
  await gravarEstado({ ultimoSync: Date.now(), versaoRemota });
  await marcarBackup(); // a cópia no Drive vale como backup (lembrete da Home)
}

async function epocaLocal(): Promise<number> {
  const valor = (await db.meta.get(DATA_EPOCH_KEY))?.value;
  return typeof valor === 'number' ? valor : 0;
}

/**
 * "Substituir" e "Apagar tudo" marcam uma época nova nos dados
 * (`novaEpoca`). Uma época diferente dos dois lados quer dizer que um
 * aparelho foi substituído por inteiro — mesclar traria de volta tudo o
 * que foi substituído. Na primeira sincronização do aparelho, sempre
 * mescla (é o que a tela promete ao conectar: nada se perde).
 */
export function decidirEpoca(
  epocaRemota: number,
  epocaLocal: number,
  jaSincronizou: boolean
): 'mesclar' | 'substituir-remoto' | 'perguntar' {
  if (!jaSincronizou || epocaRemota === epocaLocal) return 'mesclar';
  return epocaLocal > epocaRemota ? 'substituir-remoto' : 'perguntar';
}

function epocaDoBackup(backup: BackupFile): number {
  const valor = backup.meta.find((m) => m.key === DATA_EPOCH_KEY)?.value;
  return typeof valor === 'number' ? valor : 0;
}

/** A época remota é mais nova: o outro aparelho foi substituído — a pessoa decide se este acompanha. */
function mensagemDeEpoca(epocaRemota: number): string {
  const quando = new Date(epocaRemota).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
  return (
    `Os dados foram substituídos (ou apagados) em outro aparelho em ${quando}.\n\n` +
    'OK: deixar este aparelho igual ao outro (o que só existe aqui é descartado).\n' +
    'Cancelar: juntar os dados deste aparelho com os do outro, como numa sincronização normal.'
  );
}

/**
 * Telas sem sessão de estudo em andamento (hubs, Progresso, Config): ir ao
 * Google e voltar recarrega a página, mas ali não se perde nada. Revisar
 * fica de fora — a revisão do dia roda dentro da própria rota.
 */
const TELA_SEM_SESSAO = /^\/(aprender|praticar(\/[^/]+)?|progresso|config|licoes)?\/?$/;

function telaSemSessao(): boolean {
  const rota = location.pathname.slice(import.meta.env.BASE_URL.length - 1);
  return TELA_SEM_SESSAO.test(rota);
}

/**
 * Sem token válido, renovar é passar pelo Google (sai do app e volta). Só
 * faz isso sozinho onde não atrapalha: ao abrir o app, ou ao voltar pra ele
 * / mudar de tela estando numa tela sem sessão de estudo — nunca no meio de
 * uma sessão, que se perderia no recarregamento. E não insiste se o Google
 * já pediu login.
 */
function podeIrAoGoogleSozinho(motivo: MotivoSync): boolean {
  if (sessionStorage.getItem(LOGIN_FALHOU)) return false;
  const ultimo = Number(sessionStorage.getItem(ULTIMO_LOGIN) ?? 0);
  if (Date.now() - ultimo < INTERVALO_LOGIN_MS) return false;
  if (motivo === 'abertura') return true;
  return (motivo === 'foco' || motivo === 'navegacao') && telaSemSessao();
}

/**
 * Chamado pelo Layout a cada troca de tela: com o app aberto por mais de
 * 1 hora (o token venceu sem a pessoa sair dele), renova ao entrar numa
 * tela sem sessão de estudo.
 */
export async function aoMudarDeTela(): Promise<void> {
  if (status.fase === 'desligado' || status.fase === 'sincronizando' || !telaSemSessao()) return;
  if (!(await deps.tokenAtual())) void sincronizar('navegacao');
}

// --- ligar/desligar ---------------------------------------------------------

/** Conectar: vai ao Google (com tela de escolha de conta); a volta é tratada em `iniciarSync`. */
export function conectar(): void {
  sessionStorage.removeItem(LOGIN_FALHOU);
  deps.entrarNoGoogle(false);
}

/** "Entrar de novo" depois que o acesso venceu e a renovação sozinha não deu: já sugere a conta conectada. */
export async function entrarDeNovo(): Promise<void> {
  deps.entrarNoGoogle(false, (await lerEstado()).conta);
}

/** Desconectar: não apaga nada, nem aqui nem no Drive. */
export async function desconectar(): Promise<void> {
  await revogarAcesso();
  await db.local.delete('driveFileId');
  await db.local.put({ key: ESTADO_KEY, value: { conectado: false } satisfies EstadoSync });
  setStatus({ fase: 'desligado', pendente: false, erro: undefined });
}

/**
 * Apaga o arquivo do Drive e desconecta este aparelho (conectado, o próximo
 * ciclo recriaria o arquivo). Os dados deste aparelho ficam.
 */
export async function apagarDoDrive(): Promise<void> {
  const token = await deps.tokenAtual();
  if (!token) throw new ErroAutorizacao();
  await deps.destino(token).apagar();
  await desconectar();
}

// --- gatilhos ---------------------------------------------------------------

let timerAlteracao: ReturnType<typeof setTimeout> | undefined;
let ultimoCiclo = 0;

function marcarAlteracao() {
  if (aplicandoRemoto || status.fase === 'desligado') return;
  setStatus({ pendente: true });
  clearTimeout(timerAlteracao);
  timerAlteracao = setTimeout(() => void sincronizar('alteracao'), ATRASO_ALTERACAO_MS);
}

/**
 * Chamado uma vez em `main.tsx`, depois de ler a volta do Google. Liga os
 * gatilhos: abrir o app, voltar o foco, sair do app, voltar a internet e
 * gravar qualquer coisa no banco (com atraso, pra juntar uma sessão
 * inteira num ciclo só).
 */
export async function iniciarSync(retorno: RetornoOAuth): Promise<void> {
  if (!syncDisponivel) return;

  if (retorno && !retorno.ok) {
    sessionStorage.setItem(LOGIN_FALHOU, retorno.erro); // não insiste sozinho; a tela oferece "Entrar de novo"
  } else if (retorno?.ok) {
    sessionStorage.removeItem(LOGIN_FALHOU);
    if (!retorno.silencioso) await gravarEstado({ conectado: true });
  }

  const estado = await lerEstado();
  if (!estado.conectado) return;
  setStatus({ fase: 'ocioso' });

  if (retorno?.ok && !estado.conta) {
    const token = await deps.tokenAtual();
    if (token) {
      const conta = await deps.destino(token)
        .conta()
        .catch(() => undefined);
      await gravarEstado({ conta });
    }
  }

  for (const table of db.tables) {
    if (table.name === 'local') continue;
    table.hook('creating', marcarAlteracao);
    table.hook('updating', marcarAlteracao);
    table.hook('deleting', marcarAlteracao);
  }

  // Voltar pro app: aba/app de novo visível ou, no computador, a janela de novo em foco (trocar de
  // janela nem sempre esconde a aba). Os dois eventos costumam vir juntos — um ciclo só.
  let ultimaVolta = 0;
  function aoVoltar() {
    if (Date.now() - ultimaVolta < 2000) return;
    ultimaVolta = Date.now();
    if (status.pendente || status.fase === 'precisaLogin' || Date.now() - ultimoCiclo > INTERVALO_FOCO_MS) {
      void sincronizar('foco');
    }
  }
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      if (status.pendente) void sincronizar('saida');
    } else aoVoltar();
  });
  window.addEventListener('focus', aoVoltar);
  window.addEventListener('online', () => void sincronizar('online'));

  await sincronizar('abertura');
}
