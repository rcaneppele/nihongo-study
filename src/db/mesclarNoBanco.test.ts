import { beforeEach, describe, expect, it } from 'vitest';
import { db, type JournalEntry, type WordKnowledge } from './schema';
import { importData } from './backup';
import { limparBanco } from '../test/banco';
import { AGORA, DIA, umBackup, umCard, umKanaProgress, umaReview } from '../test/fabricas';

/**
 * Mesclagem no banco (importar no modo Mesclar / ciclo de sync), tabela a
 * tabela: o registro que já existe aqui é mesclado (não sobrescrito), e as
 * lápides dos dois lados decidem o que entra e o que sai.
 */
beforeEach(limparBanco);

const mesclar = (parcial: Parameters<typeof umBackup>[0]) => importData(umBackup(parcial), 'merge');

function palavra(key: string, updatedAt: number, extra: Partial<WordKnowledge> = {}): WordKnowledge {
  return { key, status: 'compreendida', seenCount: 1, lookupCount: 0, updatedAt, ...extra };
}
function diario(id: string, updatedAt: number, text = 'texto'): JournalEntry {
  return { id, promptId: 'p', text, checked: [], createdAt: 1, updatedAt };
}

describe('lápide daqui contra registro do outro aparelho', () => {
  it.each([
    ['cards', () => umCard({ id: 'x', updatedAt: AGORA }), (t: number) => umCard({ id: 'x', updatedAt: t })],
    ['wordKnowledge', () => palavra('x', AGORA), (t: number) => palavra('x', t)],
    ['journal', () => diario('x', AGORA), (t: number) => diario('x', t)],
  ] as const)('%s: alteração anterior (ou no mesmo instante) da exclusão não volta; posterior volta', async (tabela, _local, doOutro) => {
    // Relógio real: lápide com mais de 180 dias expira na própria mesclagem.
    const t = Date.now();
    await db.deleted.put({ table: tabela, key: 'x', deletedAt: t });
    await mesclar({ [tabela]: [doOutro(t - 1)] });
    await mesclar({ [tabela]: [doOutro(t)] });
    expect(await db.table(tabela).get('x')).toBeUndefined();
    await mesclar({ [tabela]: [doOutro(t + 1)] });
    expect(await db.table(tabela).get('x')).toBeDefined();
  });

  it('revisão desfeita aqui não volta do outro aparelho', async () => {
    const t = Date.now();
    await db.deleted.put({ table: 'reviews', key: 'r1', deletedAt: t });
    await mesclar({ reviews: [umaReview('c', { id: 'r1', reviewedAt: t - 10 }), umaReview('c', { id: 'r2' })] });
    expect((await db.reviews.toArray()).map((r) => r.id)).toEqual(['r2']);
  });

  it('lápide do outro aparelho apaga daqui o que é mais velho que ela', async () => {
    await db.wordKnowledge.put(palavra('velha', AGORA - 10));
    await db.wordKnowledge.put(palavra('nova', AGORA + 10));
    await db.journal.put(diario('j', AGORA - 10));
    await mesclar({
      deleted: [
        { table: 'wordKnowledge', key: 'velha', deletedAt: AGORA },
        { table: 'wordKnowledge', key: 'nova', deletedAt: AGORA },
        { table: 'journal', key: 'j', deletedAt: AGORA },
      ],
    });
    expect((await db.wordKnowledge.toArray()).map((w) => w.key)).toEqual(['nova']);
    expect(await db.journal.count()).toBe(0);
  });

  it('lápides: vale a exclusão mais recente; com mais de 180 dias, são descartadas', async () => {
    const agora = Date.now();
    await db.deleted.put({ table: 'cards', key: 'a', deletedAt: agora - 10 });
    await mesclar({
      deleted: [
        { table: 'cards', key: 'a', deletedAt: agora - 5 },
        { table: 'cards', key: 'antiga', deletedAt: agora - 181 * DIA },
        { table: 'cards', key: 'quase', deletedAt: agora - 179 * DIA },
      ],
    });
    expect((await db.deleted.get(['cards', 'a']))?.deletedAt).toBe(agora - 5);
    expect(await db.deleted.get(['cards', 'antiga'])).toBeUndefined();
    expect(await db.deleted.get(['cards', 'quase'])).toBeDefined();
  });
});

describe('registro que já existe aqui é mesclado, não sobrescrito', () => {
  it('kana: acertos de dois aparelhos somam; melhor desenho fica', async () => {
    await db.kanaProgress.put(umKanaProgress('あ', { romajiCorrect: 2, drawBest: 80, porAparelho: { A: { romajiCorrect: 2, updatedAt: 1 } } }));
    await mesclar({ kanaProgress: [umKanaProgress('あ', { romajiCorrect: 3, drawBest: 50, porAparelho: { B: { romajiCorrect: 3, updatedAt: 1 } } })] });
    expect(await db.kanaProgress.get('あ')).toMatchObject({ romajiCorrect: 5, drawBest: 80 });
  });

  it('leitura: vezes lidas somam por aparelho; última leitura fica', async () => {
    await db.readingProgress.put({ textId: 't', timesRead: 1, lastReadAt: 10, updatedAt: 10, porAparelho: { A: { timesRead: 1, updatedAt: 10 } } });
    await mesclar({ readingProgress: [{ textId: 't', timesRead: 2, lastReadAt: 20, updatedAt: 20, porAparelho: { B: { timesRead: 2, updatedAt: 20 } } }] });
    expect(await db.readingProgress.get('t')).toMatchObject({ timesRead: 3, lastReadAt: 20 });
  });

  it('lição: conclusão daqui não some por uma abertura de lá', async () => {
    await db.lessonProgress.put({ lessonId: 'desu', viewedAt: 10, completedAt: 10, updatedAt: 10 });
    await mesclar({ lessonProgress: [{ lessonId: 'desu', viewedAt: 30, updatedAt: 0 }] });
    expect(await db.lessonProgress.get('desu')).toEqual({ lessonId: 'desu', viewedAt: 30, completedAt: 10, updatedAt: 10 });
  });

  it('conquista: fica a data mais antiga', async () => {
    await db.achievements.put({ id: 'x', unlockedAt: 20 });
    await mesclar({ achievements: [{ id: 'x', unlockedAt: 10 }] });
    expect((await db.achievements.get('x'))?.unlockedAt).toBe(10);
  });

  it('palavra e diário: vence a alteração mais recente; contadores da palavra somam', async () => {
    await db.wordKnowledge.put(palavra('ねこ', 20, { status: 'consultada', lookupCount: 1, porAparelho: { A: { seenCount: 1, lookupCount: 1, updatedAt: 20 } } }));
    await db.journal.put(diario('j', 20, 'daqui'));
    await mesclar({
      wordKnowledge: [palavra('ねこ', 10, { porAparelho: { B: { seenCount: 1, lookupCount: 0, updatedAt: 10 } } })],
      journal: [diario('j', 10, 'de lá')],
    });
    expect(await db.wordKnowledge.get('ねこ')).toMatchObject({ status: 'consultada', seenCount: 2, lookupCount: 1 });
    expect((await db.journal.get('j'))?.text).toBe('daqui');
  });

  it('backup vazio não muda nada', async () => {
    const card = umCard();
    await db.cards.put(card);
    await mesclar({});
    expect(await db.cards.get(card.id)).toEqual(card);
  });
});
