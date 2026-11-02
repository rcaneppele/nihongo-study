import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { db } from '../../db/schema';
import { ultimoBackup } from '../../db/local';
import { ErroAutorizacao } from './destino';
import {
  aoMudarDeTela,
  apagarDoDrive,
  conectar,
  definirDependenciasSync,
  desconectar,
  entrarDeNovo,
  estadoSync,
  iniciarSync,
  statusSync,
} from './motor';
import { criarCard } from '../flashcards/cards';
import { limparBanco } from '../../test/banco';
import { ArmazenamentoEmMemoria, DriveEmMemoria } from '../../test/aparelhos';
import { umBackup, umCard } from '../../test/fabricas';

// Sem Client ID o motor fica desligado (`syncDisponivel`); aqui ele precisa existir.
vi.mock('./googleAuth', async (original) => ({
  ...(await original<typeof import('./googleAuth')>()),
  CLIENT_ID: 'client-id-de-teste',
}));

/**
 * Gatilhos do motor de sincronização (`iniciarSync`, `aoMudarDeTela`) e
 * ligar/desligar. Relógio e `setTimeout` falsos; `document`, `window` e
 * `location` simulados — o motor só usa eventos e o caminho da página.
 */

const ATRASO_ALTERACAO_MS = 30 * 1000;
const INTERVALO_FOCO_MS = 5 * 60 * 1000;
const INTERVALO_LOGIN_MS = 10 * 60 * 1000;

let drive: DriveEmMemoria;
let token: string | null;
let logins: { silencioso: boolean; conta?: string }[];
let documento: EventTarget & { visibilityState: 'visible' | 'hidden' };
let janela: EventTarget;
let sessao: ArmazenamentoEmMemoria;

function irPara(rota: string) {
  vi.stubGlobal('location', { pathname: import.meta.env.BASE_URL.slice(0, -1) + rota });
}

/** Deixa as promessas do motor andarem (o IndexedDB falso responde em `setImmediate`, que não é falso). */
async function assentar(voltas = 60) {
  for (let i = 0; i < voltas; i++) await new Promise((r) => setImmediate(r));
}

async function esperar(condicao: () => boolean) {
  for (let i = 0; i < 500 && !condicao(); i++) await assentar(1);
  expect(condicao()).toBe(true);
  await assentar();
}

function esconder() {
  documento.visibilityState = 'hidden';
  documento.dispatchEvent(new Event('visibilitychange'));
}

function mostrar() {
  documento.visibilityState = 'visible';
  documento.dispatchEvent(new Event('visibilitychange'));
}

async function conectado(extra: Record<string, unknown> = {}) {
  await db.local.put({ key: 'sync', value: { conectado: true, ...extra } });
}

/** Conecta, abre o app (ciclo de abertura) e espera ficar ocioso. */
async function abrirConectado() {
  await conectado();
  await iniciarSync(null);
  expect(statusSync().fase).toBe('ocioso');
}

beforeEach(async () => {
  vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'Date'] });
  vi.setSystemTime(new Date('2026-11-02T10:00:00'));
  await limparBanco();
  drive = new DriveEmMemoria();
  token = 'token-valido';
  logins = [];
  sessao = new ArmazenamentoEmMemoria();
  documento = Object.assign(new EventTarget(), { visibilityState: 'visible' as const });
  janela = new EventTarget();
  vi.stubGlobal('sessionStorage', sessao);
  vi.stubGlobal('navigator', { onLine: true });
  vi.stubGlobal('document', documento);
  vi.stubGlobal('window', janela);
  irPara('/');
  definirDependenciasSync({
    destino: () => drive,
    tokenAtual: async () => token,
    entrarNoGoogle: (silencioso, conta) => void logins.push({ silencioso, conta }),
    confirmar: () => true,
  });
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe('iniciarSync: ao abrir o app', () => {
  it('desconectado: não sincroniza nem passa a vigiar o banco', async () => {
    await iniciarSync(null);
    await criarCard({ front: 'ねこ', back: 'gato' });
    await vi.advanceTimersByTimeAsync(ATRASO_ALTERACAO_MS);
    await assentar();
    expect(statusSync()).toEqual({ fase: 'desligado', pendente: false });
    expect(drive.chamadas).toEqual({ versao: 0, baixar: 0, subir: 0, apagar: 0 });
  });

  it('conectado: sincroniza na abertura e grava o último sync como backup', async () => {
    await criarCard({ front: 'ねこ', back: 'gato' });
    await abrirConectado();
    expect(drive.conteudo()?.cards.map((c) => c.front)).toEqual(['ねこ']);
    expect((await estadoSync()).ultimoSync).toBe(Date.now());
    expect(await ultimoBackup()).toBe(Date.now());
  });

  it('volta do Google ao conectar: marca conectado e guarda a conta', async () => {
    await iniciarSync({ ok: true, silencioso: false });
    expect(await estadoSync()).toMatchObject({ conectado: true, conta: 'pessoa@exemplo.com' });
    expect(drive.chamadas.subir).toBe(1);
  });

  it('volta do Google sem conseguir a conta: segue conectado, sem conta', async () => {
    drive.conta = async () => Promise.reject(new Error('sem permissão'));
    await iniciarSync({ ok: true, silencioso: false });
    const estado = await estadoSync();
    expect(estado.conectado).toBe(true);
    expect(estado.conta).toBeUndefined();
  });

  it('volta do Google sem token: não busca a conta', async () => {
    token = null;
    const conta = vi.spyOn(drive, 'conta');
    await iniciarSync({ ok: true, silencioso: false });
    expect(conta).not.toHaveBeenCalled();
  });

  it('volta silenciosa (renovação) num aparelho desconectado: não conecta', async () => {
    await iniciarSync({ ok: true, silencioso: true });
    expect((await estadoSync()).conectado).toBe(false);
    expect(statusSync().fase).toBe('desligado');
  });

  it('já com a conta guardada: não pergunta de novo', async () => {
    await conectado({ conta: 'antiga@exemplo.com' });
    await iniciarSync({ ok: true, silencioso: true });
    expect((await estadoSync()).conta).toBe('antiga@exemplo.com');
  });

  it('o Google recusou o login: mostra o código e não volta lá sozinho', async () => {
    await conectado();
    token = null;
    await iniciarSync({ ok: false, silencioso: true, erro: 'access_denied' });
    expect(statusSync()).toMatchObject({ fase: 'precisaLogin', erro: 'access_denied' });
    expect(logins).toEqual([]);
  });

  it('um login que deu certo apaga a recusa anterior', async () => {
    sessao.setItem('nihongo-study:sync-login-falhou', 'access_denied');
    await iniciarSync({ ok: true, silencioso: false });
    expect(sessao.getItem('nihongo-study:sync-login-falhou')).toBeNull();
  });
});

describe('alteração no banco', () => {
  it('marca pendente e sincroniza 30 s depois da última alteração', async () => {
    await abrirConectado();
    await criarCard({ front: 'ねこ', back: 'gato' });
    expect(statusSync().pendente).toBe(true);

    await vi.advanceTimersByTimeAsync(ATRASO_ALTERACAO_MS - 10_000);
    await criarCard({ front: 'いぬ', back: 'cachorro' }); // reinicia a contagem
    await vi.advanceTimersByTimeAsync(ATRASO_ALTERACAO_MS - 10_000);
    await assentar();
    expect(drive.chamadas.subir).toBe(1); // só o da abertura

    await vi.advanceTimersByTimeAsync(10_000);
    await esperar(() => drive.chamadas.subir === 2);
    expect(drive.conteudo()?.cards.map((c) => c.front).sort()).toEqual(['いぬ', 'ねこ']);
    expect(statusSync()).toMatchObject({ fase: 'ocioso', pendente: false });
  });

  it('gravar em `local` (só deste aparelho) não conta como alteração', async () => {
    await abrirConectado();
    await db.local.put({ key: 'qualquer', value: 1 });
    expect(statusSync().pendente).toBe(false);
  });

  it('o que o próprio motor grava ao mesclar não conta como alteração', async () => {
    drive.gravarDireto(umBackup({ cards: [umCard({ front: 'いぬ' }, Date.now())] })); // outro aparelho
    await abrirConectado();
    expect(await db.cards.count()).toBe(1);
    expect(statusSync().pendente).toBe(false);
  });

  it('depois de aplicar a mesclagem, volta a vigiar o banco', async () => {
    drive.gravarDireto(umBackup({ cards: [umCard({ front: 'いぬ' }, Date.now())] }));
    await abrirConectado();
    await criarCard({ front: 'ねこ', back: 'gato' });
    expect(statusSync().pendente).toBe(true);
  });

  it('ciclo que desiste porque outro aparelho grava sem parar: a alteração continua pendente', async () => {
    await abrirConectado();
    await criarCard({ front: 'ねこ', back: 'gato' });
    drive.aoBaixar = () => drive.gravarDireto(drive.conteudo()!);
    esconder();
    await esperar(() => drive.chamadas.baixar === 4); // abertura + 3 tentativas
    expect(statusSync()).toMatchObject({ fase: 'ocioso', pendente: true });
    expect(drive.chamadas.subir).toBe(1);
  });
});

describe('sair e voltar ao app', () => {
  it('ao sair com alteração pendente, envia na hora', async () => {
    await abrirConectado();
    await criarCard({ front: 'ねこ', back: 'gato' });
    esconder();
    await esperar(() => drive.chamadas.subir === 2);
  });

  it('ao sair sem nada pendente, não faz nada', async () => {
    await abrirConectado();
    const antes = { ...drive.chamadas };
    esconder();
    await assentar();
    expect(drive.chamadas).toEqual(antes);
  });

  it('ao voltar logo depois de um ciclo, sem nada pendente: não sincroniza', async () => {
    await abrirConectado();
    const antes = { ...drive.chamadas };
    await vi.advanceTimersByTimeAsync(INTERVALO_FOCO_MS - 1000);
    mostrar();
    await assentar();
    expect(drive.chamadas).toEqual(antes);
  });

  it('ao voltar depois de 5 minutos: sincroniza (foco e visibilidade juntos contam uma vez só)', async () => {
    await abrirConectado();
    const versoes = drive.chamadas.versao;
    await vi.advanceTimersByTimeAsync(INTERVALO_FOCO_MS + 1000);
    mostrar();
    janela.dispatchEvent(new Event('focus'));
    await esperar(() => drive.chamadas.versao === versoes + 1);
    expect(drive.chamadas.versao).toBe(versoes + 1);
  });

  it('dois retornos com mais de 2 s entre eles: os dois contam', async () => {
    await abrirConectado();
    await vi.advanceTimersByTimeAsync(INTERVALO_FOCO_MS + 1000);
    const versoes = drive.chamadas.versao;
    janela.dispatchEvent(new Event('focus'));
    await esperar(() => drive.chamadas.versao === versoes + 1);
    await vi.advanceTimersByTimeAsync(INTERVALO_FOCO_MS + 1000);
    janela.dispatchEvent(new Event('focus'));
    await esperar(() => drive.chamadas.versao === versoes + 2);
  });

  it('ao voltar com alteração pendente: sincroniza mesmo dentro dos 5 minutos', async () => {
    await abrirConectado();
    await criarCard({ front: 'ねこ', back: 'gato' });
    janela.dispatchEvent(new Event('focus'));
    await esperar(() => drive.chamadas.subir === 2);
  });

  it('ao voltar precisando de login: tenta de novo mesmo dentro dos 5 minutos', async () => {
    await abrirConectado();
    token = null;
    janela.dispatchEvent(new Event('online')); // ciclo sem token: precisa de login, sem ir ao Google
    await esperar(() => statusSync().fase === 'precisaLogin');
    expect(logins).toEqual([]);

    janela.dispatchEvent(new Event('focus'));
    await esperar(() => logins.length === 1);
  });

  it('a internet voltou: sincroniza', async () => {
    await abrirConectado();
    const versoes = drive.chamadas.versao;
    janela.dispatchEvent(new Event('online'));
    await esperar(() => drive.chamadas.versao === versoes + 1);
  });
});

describe('ir ao Google sozinho (token vencido com o app aberto)', () => {
  async function abertoComTokenVencido() {
    await abrirConectado();
    token = null;
  }

  it.each(['/', '/aprender', '/praticar', '/praticar/ouvir', '/progresso/', '/config', '/licoes'])(
    'mudar para %s (sem sessão de estudo): renova',
    async (rota) => {
      await abertoComTokenVencido();
      irPara(rota);
      await aoMudarDeTela();
      await esperar(() => logins.length === 1);
      expect(logins[0]).toEqual({ silencioso: true, conta: undefined });
    }
  );

  it.each(['/revisar', '/praticar/ouvir/mais', '/leitura/ola', '/licoes/kana', '/aprender/palavras', '/aprenderx', 'x/aprender'])(
    'mudar para %s: não sai da tela',
    async (rota) => {
      await abertoComTokenVencido();
      irPara(rota);
      await aoMudarDeTela();
      await assentar();
      expect(logins).toEqual([]);
    }
  );

  it('com token válido, mudar de tela não faz nada', async () => {
    await abrirConectado();
    const antes = { ...drive.chamadas };
    irPara('/aprender');
    await aoMudarDeTela();
    await assentar();
    expect(drive.chamadas).toEqual(antes);
  });

  it('desconectado, mudar de tela não faz nada', async () => {
    token = null;
    await aoMudarDeTela();
    await assentar();
    expect(logins).toEqual([]);
  });

  it('não insiste: espera 10 minutos entre uma ida ao Google e outra', async () => {
    await abertoComTokenVencido();
    await aoMudarDeTela();
    await esperar(() => logins.length === 1);

    await vi.advanceTimersByTimeAsync(INTERVALO_LOGIN_MS - 1);
    await aoMudarDeTela();
    await assentar();
    expect(logins).toHaveLength(1);

    await vi.advanceTimersByTimeAsync(1);
    await aoMudarDeTela();
    await esperar(() => logins.length === 2);
  });

  it('voltar ao app numa tela de sessão de estudo: não sai dela', async () => {
    await abertoComTokenVencido();
    irPara('/revisar');
    await vi.advanceTimersByTimeAsync(INTERVALO_FOCO_MS + 1000);
    janela.dispatchEvent(new Event('focus'));
    await assentar();
    expect(statusSync().fase).toBe('precisaLogin');
    expect(logins).toEqual([]);
  });

  it('a internet voltar não leva ao Google, nem numa tela sem sessão', async () => {
    await abertoComTokenVencido();
    janela.dispatchEvent(new Event('online'));
    await assentar();
    expect(statusSync().fase).toBe('precisaLogin');
    expect(logins).toEqual([]);
  });
});

describe('ligar e desligar', () => {
  it('conectar: esquece a recusa anterior e vai ao Google escolhendo a conta', () => {
    sessao.setItem('nihongo-study:sync-login-falhou', 'access_denied');
    conectar();
    expect(sessao.getItem('nihongo-study:sync-login-falhou')).toBeNull();
    expect(logins).toEqual([{ silencioso: false, conta: undefined }]);
  });

  it('entrar de novo: sugere a conta conectada', async () => {
    await conectado({ conta: 'pessoa@exemplo.com' });
    await entrarDeNovo();
    expect(logins).toEqual([{ silencioso: false, conta: 'pessoa@exemplo.com' }]);
  });

  it('desconectar: para de sincronizar e não apaga nada', async () => {
    await criarCard({ front: 'ねこ', back: 'gato' });
    await abrirConectado();
    await db.local.put({ key: 'driveFileId', value: 'arquivo-1' });
    await desconectar();
    expect(statusSync()).toEqual({ fase: 'desligado', pendente: false, erro: undefined });
    expect(await estadoSync()).toEqual({ conectado: false });
    expect(await db.local.get('driveFileId')).toBeUndefined();
    expect(await db.cards.count()).toBe(1);
    expect(drive.conteudo()?.cards).toHaveLength(1);
  });

  it('apagar do Drive: remove o arquivo e desconecta, mantendo os dados daqui', async () => {
    await criarCard({ front: 'ねこ', back: 'gato' });
    await abrirConectado();
    await apagarDoDrive();
    expect(drive.arquivo).toBeNull();
    expect((await estadoSync()).conectado).toBe(false);
    expect(await db.cards.count()).toBe(1);
  });

  it('apagar do Drive sem acesso válido: erro de autorização, nada muda', async () => {
    await abrirConectado();
    token = null;
    await expect(apagarDoDrive()).rejects.toBeInstanceOf(ErroAutorizacao);
    expect(drive.chamadas.apagar).toBe(0);
    expect((await estadoSync()).conectado).toBe(true);
  });
});
