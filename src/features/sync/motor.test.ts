import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { db } from '../../db/schema';
import { apagarTudo } from '../../db/backup';
import { ErroAutorizacao } from './destino';
import { decidirEpoca, definirDependenciasSync, estadoSync, sincronizar, statusSync, type MotivoSync } from './motor';
import { apagarCard, criarCard } from '../flashcards/cards';
import { registrarRevisao } from '../flashcards/revisao';
import { Rating } from '../srs/fsrs';
import { limparBanco } from '../../test/banco';
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
    expect(await b.usar(fronts)).toEqual([]);
    expect(drive.conteudo()?.cards).toEqual([]);
  });

  it('"apagar tudo" num aparelho: recusando, o outro mescla (os dados dele voltam pro Drive)', async () => {
    await a.usar(() => criarCard({ front: 'ねこ', back: 'gato' }));
    await a.sync();
    await b.sync();
    await a.usar(apagarTudo);
    await a.sync();

    respostaConfirmar = false;
    await b.sync('foco');
    expect(await b.usar(fronts)).toEqual(['ねこ']);
    expect(drive.conteudo()?.cards.map((c) => c.front)).toEqual(['ねこ']);
  });
});
