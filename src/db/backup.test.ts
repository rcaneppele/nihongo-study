import { beforeEach, describe, expect, it } from 'vitest';
import { db } from './schema';
import { apagar, DATA_EPOCH_KEY, getDeviceId, novaEpoca, setMeta, ultimoBackup, marcarBackup } from './local';
import {
  apagarTudo,
  exportData,
  importarBackup,
  importData,
  mesmoConteudo,
  parseBackup,
  TABELAS_SINCRONIZADAS,
  type BackupFile,
  type TabelaSincronizada,
} from './backup';
import { limparBanco } from '../test/banco';
import { umaAtividade, umaReview, umBackup, umCard, umKanaProgress, umKanjiProgress } from '../test/fabricas';

beforeEach(limparBanco);

describe('tabelas sincronizadas', () => {
  it('todas as tabelas do banco entram no backup, menos `local` (só do aparelho)', () => {
    expect([...TABELAS_SINCRONIZADAS].sort()).toEqual(db.tables.map((t) => t.name).filter((n) => n !== 'local').sort());
  });
});

describe('exportar / importar', () => {
  it('exportar e importar (substituir) num banco vazio reproduz tudo', async () => {
    await db.cards.add(umCard());
    await setMeta('tema', 'dark');
    const backup = await exportData();
    await limparBanco();
    await importarBackup(backup, 'replace');
    const depois = await exportData();
    // Substituir marca uma época nova — o resto é igual.
    expect(depois.meta.find((m) => m.key === DATA_EPOCH_KEY)).toBeDefined();
    expect(mesmoConteudo({ ...depois, meta: depois.meta.filter((m) => m.key !== DATA_EPOCH_KEY) }, backup)).toBe(true);
  });

  it('mesclar não marca época nova', async () => {
    await importarBackup(umBackup({ cards: [umCard()] }), 'merge');
    expect(await db.meta.get(DATA_EPOCH_KEY)).toBeUndefined();
    expect(await db.cards.count()).toBe(1);
  });

  it('substituir troca tudo, inclusive o que só existia aqui', async () => {
    await db.cards.add(umCard({ front: 'só-aqui' }));
    await importarBackup(umBackup({ cards: [umCard({ front: 'do-arquivo' })] }), 'replace');
    expect((await db.cards.toArray()).map((c) => c.front)).toEqual(['do-arquivo']);
  });

  it('apagar tudo esvazia os dados, marca época nova e preserva o estado do aparelho', async () => {
    const id = await getDeviceId();
    await db.cards.add(umCard());
    await marcarBackup();
    await apagarTudo();
    expect(await db.cards.count()).toBe(0);
    expect(await db.meta.get(DATA_EPOCH_KEY)).toBeDefined();
    expect(await getDeviceId()).toBe(id);
    expect(await ultimoBackup()).toBeDefined();
  });
});

describe('dados do aparelho (local.ts)', () => {
  it('id do aparelho é criado uma vez e fica fora do backup', async () => {
    const id = await getDeviceId();
    expect(await getDeviceId()).toBe(id);
    expect(JSON.stringify(await exportData())).not.toContain(id);
  });

  it('setMeta carimba a data; novaEpoca grava a época', async () => {
    await setMeta('x', 1);
    expect((await db.meta.get('x'))?.updatedAt).toBeGreaterThan(0);
    await novaEpoca();
    expect(typeof (await db.meta.get(DATA_EPOCH_KEY))?.value).toBe('number');
  });

  it('apagar deixa lápide', async () => {
    const c = umCard();
    await db.cards.add(c);
    await apagar('cards', c.id);
    expect(await db.cards.get(c.id)).toBeUndefined();
    expect((await db.deleted.get(['cards', c.id]))?.deletedAt).toBeGreaterThan(0);
  });
});

/** Dois registros distintos de cada tabela sincronizada (o segundo, em duas versões). */
const DOIS_REGISTROS: { [T in TabelaSincronizada]: (versao: number) => BackupFile[T] } = {
  cards: (v) => [umCard({ id: 'a' }), umCard({ id: 'b', reps: v })],
  reviews: (v) => [umaReview('c', { id: 'a' }), umaReview('c', { id: 'b', intervalAfter: v })],
  kanaProgress: (v) => [umKanaProgress('あ'), umKanaProgress('い', { romajiCorrect: v })],
  kanjiProgress: (v) => [umKanjiProgress('日'), umKanjiProgress('月', { reps: v })],
  wordKnowledge: (v) => [
    { key: 'a', status: 'compreendida', seenCount: 1, lookupCount: 0, updatedAt: 1 },
    { key: 'b', status: 'compreendida', seenCount: v, lookupCount: 0, updatedAt: 1 },
  ],
  readingProgress: (v) => [
    { textId: 'a', timesRead: 1, lastReadAt: 1, updatedAt: 1 },
    { textId: 'b', timesRead: v, lastReadAt: 1, updatedAt: 1 },
  ],
  activity: (v) => [umaAtividade('2026-01-01'), umaAtividade('2026-01-02', { revisoes: v })],
  meta: (v) => [
    { key: 'a', value: 1 },
    { key: 'b', value: v },
  ],
  deleted: (v) => [
    { table: 'cards', key: 'x', deletedAt: 1 },
    { table: 'journal', key: 'x', deletedAt: v },
  ],
  exerciseResults: (v) => [
    { id: 'a', kind: 'diga', itemId: 'i', doneAt: 1 },
    { id: 'b', kind: 'diga', itemId: 'i', doneAt: v },
  ],
  lessonProgress: (v) => [
    { lessonId: 'a', viewedAt: 1, updatedAt: 1 },
    { lessonId: 'b', viewedAt: v, updatedAt: 1 },
  ],
  achievements: (v) => [
    { id: 'a', unlockedAt: 1 },
    { id: 'b', unlockedAt: v },
  ],
  journal: (v) => [
    { id: 'a', promptId: 'p', text: 't', checked: [], createdAt: 1, updatedAt: 1 },
    { id: 'b', promptId: 'p', text: 't', checked: [], createdAt: 1, updatedAt: v },
  ],
};

describe('mesmoConteudo (decide se a sincronização precisa subir)', () => {
  it.each(TABELAS_SINCRONIZADAS)('%s: a ordem dos registros não importa; um registro diferente, sim', (tabela) => {
    const linhas = DOIS_REGISTROS[tabela](2) as unknown[];
    const outraVersao = DOIS_REGISTROS[tabela](3) as unknown[];
    const com = (registros: unknown[]) => umBackup({ [tabela]: registros });
    expect(mesmoConteudo(com(linhas), com([...linhas].reverse()))).toBe(true);
    expect(mesmoConteudo(com(linhas), com([linhas[0], outraVersao[1]]))).toBe(false);
    expect(mesmoConteudo(com(linhas), com(linhas.slice(0, 1)))).toBe(false);
  });

  it('lápides de tabelas diferentes com a mesma chave são registros diferentes', () => {
    const lapide = (table: 'cards' | 'journal') => ({ table, key: 'x', deletedAt: 1 });
    expect(mesmoConteudo(umBackup({ deleted: [lapide('cards')] }), umBackup({ deleted: [lapide('journal')] }))).toBe(false);
  });
});

describe('parseBackup', () => {
  it.each(['null', '{}', '{"app":"outro-app"}', '[]'])('%s não é um backup do app', (texto) => {
    expect(() => parseBackup(texto)).toThrow('Não parece um backup do Nihongo Study.');
  });

  it('texto que nem é JSON: erro de leitura', () => {
    expect(() => parseBackup('isto não é json')).toThrow(SyntaxError);
  });
});

describe('importData', () => {
  it('sem modo: substitui (apaga o que só existia aqui)', async () => {
    await db.cards.add(umCard({ id: 'so-aqui' }));
    await importData(umBackup({ cards: [umCard({ id: 'do-arquivo' })] }));
    expect((await db.cards.toArray()).map((c) => c.id)).toEqual(['do-arquivo']);
  });
});
