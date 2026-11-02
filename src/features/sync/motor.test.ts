import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { db } from '../../db/schema';
import { apagarTudo } from '../../db/backup';
import { ErroAutorizacao } from './destino';
import { decidirEpoca, definirDependenciasSync, estadoSync, sincronizar, statusSync, type MotivoSync } from './motor';
import { apagarCard, criarCard } from '../flashcards/cards';
import { registrarRevisao } from '../flashcards/revisao';
import { Rating } from '../srs/fsrs';
import { limparBanco } from '../../test/banco';
import { umBackup, umCard } from '../../test/fabricas';
import { ArmazenamentoEmMemoria, bancoVazio, DriveEmMemoria, fotografarBanco, restaurarBanco, type FotoDoBanco } from '../../test/aparelhos';

let drive: DriveEmMemoria;
let token: string | null;
let logins: { silencioso: boolean; conta?: string }[];
let respostaConfirmar: boolean;
let perguntas: string[];

function ligarMotor() {
  definirDependenciasSync({
    destino: () => drive,
    tokenAtual: async () => token,
    entrarNoGoogle: (silencioso, conta) => void logins.push({ silencioso, conta }),
    confirmar: (msg) => {
      perguntas.push(msg);
      return respostaConfirmar;
    },
  });
}

async function conectar() {
  await db.local.put({ key: 'sync', value: { conectado: true } });
}

/** Um aparelho: seu banco inteiro e o motor "recém-aberto" sempre que entra em cena. */
class Aparelho {
  foto: FotoDoBanco = bancoVazio();
  async usar<T>(fn: () => Promise<T>): Promise<T> {
    await restaurarBanco(this.foto);
    ligarMotor();
    try {
      return await fn();
    } finally {
      this.foto = await fotografarBanco();
    }
  }
  async sync(motivo: MotivoSync = 'manual') {
    return this.usar(() => sincronizar(motivo));
  }
}

async function fronts(): Promise<string[]> {
  return (await db.cards.toArray()).map((c) => c.front).sort();
}

beforeEach(async () => {
  await limparBanco();
  drive = new DriveEmMemoria();
  token = 'token-valido';
  logins = [];
  respostaConfirmar = true;
  perguntas = [];
  vi.stubGlobal('sessionStorage', new ArmazenamentoEmMemoria());
  vi.stubGlobal('navigator', { onLine: true });
  ligarMotor();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('decidirEpoca', () => {
  it.each([
    { remota: 5, local: 9, ja: false, esperado: 'mesclar', porque: 'primeira sincronização sempre mescla' },
    { remota: 5, local: 5, ja: true, esperado: 'mesclar', porque: 'mesma época' },
    { remota: 5, local: 9, ja: true, esperado: 'substituir-remoto', porque: 'este aparelho foi substituído depois' },
    { remota: 9, local: 5, ja: true, esperado: 'perguntar', porque: 'outro aparelho foi substituído depois' },
  ])('$porque', ({ remota, local, ja, esperado }) => {
    expect(decidirEpoca(remota, local, ja)).toBe(esperado);
  });
});

describe('ciclo de sincronização', () => {
  it('desconectado: não faz nada', async () => {
    await sincronizar('manual');
    expect(statusSync().fase).toBe('desligado');
    expect(drive.chamadas).toEqual({ versao: 0, baixar: 0, subir: 0, apagar: 0 });
  });

  it('sem internet: fica offline, sem chamar o Drive', async () => {
    await conectar();
    vi.stubGlobal('navigator', { onLine: false });
    await sincronizar('manual');
    expect(statusSync().fase).toBe('offline');
    expect(drive.chamadas.baixar).toBe(0);
  });

  it('primeira vez: sobe o que há no aparelho e grava o último sync', async () => {
    await conectar();
    await criarCard({ front: 'ねこ', back: 'gato' });
    await sincronizar('abertura');
    expect(statusSync()).toMatchObject({ fase: 'ocioso', pendente: false });
    expect(drive.conteudo()?.cards.map((c) => c.front)).toEqual(['ねこ']);
    expect((await estadoSync()).ultimoSync).toBeDefined();
    expect((await estadoSync()).versaoRemota).toBe('1');
    expect(drive.chamadas.baixar).toBe(1);
  });

  it('nada mudou aqui nem lá: o atalho só consulta a versão', async () => {
    await conectar();
    await sincronizar('abertura');
    const antes = { ...drive.chamadas };
    await sincronizar('foco');
    expect(drive.chamadas.baixar).toBe(antes.baixar);
    expect(drive.chamadas.subir).toBe(antes.subir);
    expect(drive.chamadas.versao).toBe(antes.versao + 1);
  });

  it('remoto igual ao local depois de mesclar: não sobe de novo', async () => {
    await conectar();
    await criarCard({ front: 'ねこ', back: 'gato' });
    await sincronizar('abertura');
    await sincronizar('manual');
    expect(drive.chamadas.subir).toBe(1);
  });

  it('outro aparelho grava no meio do ciclo: repete e não perde nada', async () => {
    await conectar();
    await criarCard({ front: 'ねこ', back: 'gato' });
    await sincronizar('abertura');
    const outro = drive.conteudo()!;
    let vezes = 0;
    drive.aoBaixar = () => {
      if (vezes++ > 0) return;
      drive.gravarDireto({ ...outro, cards: [...outro.cards, { ...outro.cards[0], id: 'outro', front: 'いぬ' }] });
    };
    await criarCard({ front: 'とり', back: 'pássaro' });
    await sincronizar('manual');
    expect(drive.chamadas.baixar).toBeGreaterThanOrEqual(3);
    expect(drive.conteudo()?.cards.map((c) => c.front).sort()).toEqual(['いぬ', 'とり', 'ねこ']);
    expect(await fronts()).toEqual(['いぬ', 'とり', 'ねこ']);
  });

  it('nunca conectado: o estado guardado é "desconectado"', async () => {
    expect(await estadoSync()).toEqual({ conectado: false });
  });

  it('desconectado depois de ter sincronizado: o status volta a "desligado"', async () => {
    await conectar();
    await sincronizar('manual');
    expect(statusSync().fase).toBe('ocioso');
    await db.local.put({ key: 'sync', value: { conectado: false } });
    await sincronizar('manual');
    expect(statusSync().fase).toBe('desligado');
  });

  it('durante o ciclo o status é "sincronizando"', async () => {
    await conectar();
    await sincronizar('manual');
    let fase: string | undefined;
    drive.aoBaixar = () => void (fase = statusSync().fase);
    await sincronizar('manual');
    expect(fase).toBe('sincronizando');
  });

  it('pedido durante um ciclo: não roda junto, mas garante mais um ciclo depois', async () => {
    await conectar();
    const primeiro = sincronizar('manual');
    const segundo = sincronizar('manual');
    expect(segundo).toBe(primeiro);
    await primeiro;
    expect(drive.chamadas.baixar).toBe(2);
    await sincronizar('manual');
    expect(drive.chamadas.baixar).toBe(3);
  });

  it('com Web Locks: o ciclo roda dentro da trava entre abas', async () => {
    await conectar();
    const travas: string[] = [];
    vi.stubGlobal('navigator', {
      onLine: true,
      locks: { request: (nome: string, fn: () => Promise<void>) => (travas.push(nome), fn()) },
    });
    await sincronizar('manual');
    expect(travas).toEqual(['nihongo-study-sync']);
    expect(drive.chamadas.subir).toBe(1);
  });

  it('ao abrir o app não usa o atalho: baixa mesmo sem nada mudado', async () => {
    await conectar();
    await sincronizar('abertura');
    await sincronizar('abertura');
    expect(drive.chamadas.baixar).toBe(2);
  });

  it('primeira sincronização deste aparelho, com dados no Drive: baixa (o atalho precisa de uma versão conhecida)', async () => {
    drive.gravarDireto(umBackup({ cards: [umCard({ front: 'いぬ' })] }));
    await conectar();
    await sincronizar('foco');
    expect(await fronts()).toEqual(['いぬ']);
  });

  it('primeira sincronização com épocas diferentes: mescla, nunca substitui', async () => {
    drive.gravarDireto(umBackup({ cards: [umCard({ front: 'いぬ' })] }));
    await apagarTudo(); // época local mais nova que a do Drive
    await criarCard({ front: 'ねこ', back: 'gato' });
    await conectar();
    await sincronizar('abertura');
    expect(await fronts()).toEqual(['いぬ', 'ねこ']);
    expect(drive.conteudo()?.cards.map((c) => c.front).sort()).toEqual(['いぬ', 'ねこ']);
  });

  it('a época vem só da chave dela no meta (outras preferências numéricas não contam)', async () => {
    await conectar();
    await sincronizar('abertura');
    const atual = drive.conteudo()!;
    drive.gravarDireto({ ...atual, meta: [{ key: 'dailyGoal', value: 40, updatedAt: 1 }, ...atual.meta] });
    await sincronizar('manual');
    expect(perguntas).toEqual([]);
  });

  it('outro aparelho gravando sem parar: desiste depois de 3 tentativas, sem subir e sem perder o pendente', async () => {
    await conectar();
    await sincronizar('abertura');
    await criarCard({ front: 'ねこ', back: 'gato' });
    drive.aoBaixar = () => drive.gravarDireto(drive.conteudo()!);
    const antes = { ...drive.chamadas };
    await sincronizar('manual');
    expect(drive.chamadas.baixar - antes.baixar).toBe(3);
    expect(drive.chamadas.subir).toBe(antes.subir);
    expect(statusSync()).toMatchObject({ fase: 'ocioso', pendente: false });
  });

  it('acesso vencido no meio: pede login e mantém a alteração pendente', async () => {
    await conectar();
    drive.falha = new ErroAutorizacao();
    await sincronizar('manual');
    expect(statusSync()).toMatchObject({ fase: 'precisaLogin', pendente: true });
  });

  it('erro do Drive: mostra o erro e mantém pendente', async () => {
    await conectar();
    drive.falha = new Error('Google Drive respondeu 503.');
    await sincronizar('manual');
    expect(statusSync()).toMatchObject({ fase: 'erro', erro: 'Google Drive respondeu 503.', pendente: true });
  });

  it('sem token ao abrir o app: vai ao Google sozinho (silencioso, com a conta); numa alteração, não', async () => {
    await db.local.put({ key: 'sync', value: { conectado: true, conta: 'pessoa@exemplo.com' } });
    token = null;
    await sincronizar('alteracao');
    expect(logins).toEqual([]);
    expect(statusSync().fase).toBe('precisaLogin');
    await sincronizar('abertura');
    expect(logins).toEqual([{ silencioso: true, conta: 'pessoa@exemplo.com' }]);
    // Não insiste: dentro do intervalo, não vai ao Google de novo.
    await sincronizar('abertura');
    expect(logins).toHaveLength(1);
  });
});

describe('dois aparelhos', () => {
  let a: Aparelho;
  let b: Aparelho;

  beforeEach(async () => {
    a = new Aparelho();
    b = new Aparelho();
    await a.usar(conectar);
    await b.usar(conectar);
  });

  it('o que cada um cria chega ao outro', async () => {
    await a.usar(() => criarCard({ front: 'ねこ', back: 'gato' }));
    await a.sync();
    await b.usar(() => criarCard({ front: 'いぬ', back: 'cachorro' }));
    await b.sync();
    await a.sync();
    expect(await a.usar(fronts)).toEqual(['いぬ', 'ねこ']);
    expect(await b.usar(fronts)).toEqual(['いぬ', 'ねこ']);
  });

  it('revisão feita num chega ao outro; exclusão também', async () => {
    const card = await a.usar(() => criarCard({ front: 'ねこ', back: 'gato' }));
    await a.sync();
    await b.sync();
    await b.usar(async () => registrarRevisao((await db.cards.get(card.id))!, 'recognition', Rating.Good));
    await b.sync();
    await a.sync();
    expect((await a.usar(() => db.cards.get(card.id)))?.reps).toBe(1);
    expect(await a.usar(() => db.reviews.count())).toBe(1);

    await a.usar(() => apagarCard(card.id));
    await a.sync();
    await b.sync();
    expect(await b.usar(fronts)).toEqual([]);
  });

  it('"apagar tudo" num aparelho: o outro pergunta e, se aceitar, fica igual (não ressuscita nada)', async () => {
    await a.usar(() => criarCard({ front: 'ねこ', back: 'gato' }));
    await a.sync();
    await b.sync();
    await a.usar(apagarTudo);
    await a.sync();
    expect(drive.conteudo()?.cards).toEqual([]);

    await b.usar(() => criarCard({ front: 'só-em-b', back: 'x' }));
    respostaConfirmar = true;
    await b.sync('foco');
    expect(perguntas).toHaveLength(1);
    const epoca = drive.conteudo()!.meta.find((m) => m.key === 'dataEpoch')!.value as number;
    const quando = new Date(epoca).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
    expect(perguntas[0]).toBe(
      `Os dados foram substituídos (ou apagados) em outro aparelho em ${quando}.\n\n` +
        'OK: deixar este aparelho igual ao outro (o que só existe aqui é descartado).\n' +
        'Cancelar: juntar os dados deste aparelho com os do outro, como numa sincronização normal.'
    );
    expect(await b.usar(fronts)).toEqual([]);
    expect(drive.conteudo()?.cards).toEqual([]);
  });

  it('"apagar tudo" num aparelho: recusando, o outro mescla (os dados dele voltam pro Drive)', async () => {
    await a.usar(() => criarCard({ front: 'ねこ', back: 'gato' }));
    await a.sync();
    await b.sync();
    await a.usar(apagarTudo);
    await a.usar(() => criarCard({ front: 'novo-em-a', back: 'x' }));
    await a.sync();

    respostaConfirmar = false;
    await b.sync('foco');
    expect(await b.usar(fronts)).toEqual(['novo-em-a', 'ねこ']);
    expect(drive.conteudo()?.cards.map((c) => c.front).sort()).toEqual(['novo-em-a', 'ねこ']);
  });
});
