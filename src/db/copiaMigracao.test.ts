import Dexie from 'dexie';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { apagarTudo, restaurarCopiaDeMigracao, SCHEMA_VERSION } from './backup';
import { apagarCopia, copiaVencida, DIAS_COPIA, guardarCopiaAntesDeMigrar, lerCopia } from './copiaMigracao';
import { db } from './schema';
import { limparBanco } from '../test/banco';
import { umCard } from '../test/fabricas';

const BANCO_ANTIGO = 'teste-banco-antigo';
const DIA_MS = 24 * 60 * 60 * 1000;
const AGORA = Date.UTC(2026, 10, 5);

/** Banco como o de um aparelho que ainda está na v6, com um token em `local`. */
async function criarBancoV6(comDados = true) {
  const antigo = new Dexie(BANCO_ANTIGO);
  antigo.version(6).stores({
    cards: 'id, category, dueDate, updatedAt',
    reviews: 'id, cardId, reviewedAt',
    kanaProgress: 'char, type',
    meta: 'key',
    kanjiProgress: 'char, dueDate',
    wordKnowledge: 'key',
    readingProgress: 'textId',
    activity: 'day',
    deleted: '[table+key]',
    local: 'key',
  });
  await antigo.open();
  if (comDados) {
    await antigo.table('cards').add(umCard({ id: 'c1', front: 'ねこ' }));
    await antigo.table('local').add({ key: 'googleToken', value: 'segredo' });
  }
  antigo.close();
}

beforeEach(async () => {
  await limparBanco();
  await apagarCopia();
  await Dexie.delete(BANCO_ANTIGO);
});
afterEach(() => vi.restoreAllMocks());

describe('guardarCopiaAntesDeMigrar', () => {
  it('banco anterior à versão atual: guarda os dados com a versão de origem, sem a tabela local', async () => {
    await criarBancoV6();
    await guardarCopiaAntesDeMigrar(7, { nomeBanco: BANCO_ANTIGO, now: AGORA });
    const copia = await lerCopia();
    expect(copia?.criadaEm).toBe(AGORA);
    expect(copia?.backup.schemaVersion).toBe(6);
    expect(copia?.backup.cards.map((c) => c.front)).toEqual(['ねこ']);
    expect(copia?.backup).not.toHaveProperty('local');
  });

  it('não altera o banco nem a versão dele', async () => {
    await criarBancoV6();
    await guardarCopiaAntesDeMigrar(7, { nomeBanco: BANCO_ANTIGO, now: AGORA });
    const antigo = new Dexie(BANCO_ANTIGO);
    await antigo.open();
    expect(antigo.verno).toBe(6);
    expect(await antigo.table('cards').count()).toBe(1);
    expect(await antigo.table('local').count()).toBe(1);
    antigo.close();
  });

  it('banco já na versão atual: não copia', async () => {
    await criarBancoV6();
    await guardarCopiaAntesDeMigrar(6, { nomeBanco: BANCO_ANTIGO, now: AGORA });
    expect(await lerCopia()).toBeUndefined();
  });

  it('primeira abertura (sem banco): não copia nem cria o banco', async () => {
    await guardarCopiaAntesDeMigrar(7, { nomeBanco: BANCO_ANTIGO, now: AGORA });
    expect(await lerCopia()).toBeUndefined();
    expect(await Dexie.exists(BANCO_ANTIGO)).toBe(false);
  });

  it('banco sem nenhum dado: não copia', async () => {
    await criarBancoV6(false);
    await guardarCopiaAntesDeMigrar(7, { nomeBanco: BANCO_ANTIGO, now: AGORA });
    expect(await lerCopia()).toBeUndefined();
  });

  it('migração nova substitui a cópia anterior', async () => {
    await criarBancoV6();
    await guardarCopiaAntesDeMigrar(7, { nomeBanco: BANCO_ANTIGO, now: AGORA });
    await guardarCopiaAntesDeMigrar(8, { nomeBanco: BANCO_ANTIGO, now: AGORA + 1000 });
    expect((await lerCopia())?.criadaEm).toBe(AGORA + 1000);
  });

  it('descarta a cópia vencida ao abrir; a de dentro do prazo fica', async () => {
    await criarBancoV6();
    await guardarCopiaAntesDeMigrar(7, { nomeBanco: BANCO_ANTIGO, now: AGORA });
    await guardarCopiaAntesDeMigrar(6, { nomeBanco: BANCO_ANTIGO, now: AGORA + (DIAS_COPIA - 1) * DIA_MS });
    expect(await lerCopia()).toBeDefined();
    await guardarCopiaAntesDeMigrar(6, { nomeBanco: BANCO_ANTIGO, now: AGORA + DIAS_COPIA * DIA_MS });
    expect(await lerCopia()).toBeUndefined();
  });

  it('falha ao copiar não impede o app de abrir', async () => {
    await criarBancoV6();
    const aviso = vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(Dexie.prototype, 'open').mockRejectedValueOnce(new Error('sem espaço'));
    await expect(guardarCopiaAntesDeMigrar(7, { nomeBanco: BANCO_ANTIGO, now: AGORA })).resolves.toBeUndefined();
    expect(aviso).toHaveBeenCalledOnce();
  });
});

describe('copiaVencida', () => {
  it('vence ao completar o prazo, não antes', () => {
    expect(copiaVencida(AGORA, AGORA + DIAS_COPIA * DIA_MS - 1)).toBe(false);
    expect(copiaVencida(AGORA, AGORA + DIAS_COPIA * DIA_MS)).toBe(true);
  });
});

describe('restaurarCopiaDeMigracao', () => {
  it('substitui os dados pelos da cópia, migrados, e apaga a cópia', async () => {
    await criarBancoV6();
    await guardarCopiaAntesDeMigrar(7, { nomeBanco: BANCO_ANTIGO, now: AGORA });
    await db.cards.put(umCard({ id: 'c1', front: 'estragado' }));
    await db.cards.put(umCard({ id: 'c2', front: 'depois' }));

    await restaurarCopiaDeMigracao();

    expect((await db.cards.toArray()).map((c) => c.front)).toEqual(['ねこ']);
    expect(await db.meta.get('dataEpoch')).toBeDefined(); // a sincronização substitui, não mescla de volta
    expect(await lerCopia()).toBeUndefined();
  });

  it('sem cópia: erro com mensagem e nada muda', async () => {
    await db.cards.put(umCard({ front: 'ねこ' }));
    await expect(restaurarCopiaDeMigracao()).rejects.toThrow('não está mais disponível');
    expect(await db.cards.count()).toBe(1);
  });
});

describe('integração com o resto do banco', () => {
  it('SCHEMA_VERSION acompanha a versão do Dexie (é ela que decide quando copiar)', async () => {
    await db.open();
    expect(db.verno).toBe(SCHEMA_VERSION);
  });

  it('"Apagar todos os dados" apaga a cópia também', async () => {
    await criarBancoV6();
    await guardarCopiaAntesDeMigrar(7, { nomeBanco: BANCO_ANTIGO, now: AGORA });
    await apagarTudo();
    expect(await lerCopia()).toBeUndefined();
  });
});
