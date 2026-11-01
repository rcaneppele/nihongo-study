import 'fake-indexeddb/auto';
import { beforeEach, describe, expect, it } from 'vitest';
import { incrementar, mesclarContadores } from './contadores';
import { carimbosCard, mesclarCard } from './merge';
import { db, type Card } from './schema';
import { exportData, importData, mesmoConteudo, SCHEMA_VERSION, type BackupFile } from './backup';
import { freshSrs } from '../features/srs/fsrs';

const CAMPOS = ['n'] as const;

function card(id: string, front: string, t: number, extra: Partial<Card> = {}): Card {
  return { id, front, back: front, tags: [], ...freshSrs(t), createdAt: t, updatedAt: t, ...extra };
}

/** Backup "do outro aparelho" só com o que o teste precisa. */
function backup(parcial: Partial<BackupFile>): BackupFile {
  return {
    app: 'nihongo-study',
    schemaVersion: SCHEMA_VERSION,
    exportedAt: Date.now(),
    cards: [],
    reviews: [],
    kanaProgress: [],
    kanjiProgress: [],
    wordKnowledge: [],
    readingProgress: [],
    activity: [],
    meta: [],
    deleted: [],
    ...parcial,
  };
}

describe('contadores por aparelho', () => {
  it('registro antigo vira legado e o aparelho soma por cima', () => {
    const r = incrementar({ n: 5 }, { n: 2 }, CAMPOS, 'A', 100);
    expect(r.n).toBe(7);
    expect(r.porAparelho.legado.n).toBe(5);
  });

  it('dois aparelhos somam, e mesclar de novo não conta duas vezes', () => {
    const a = incrementar(undefined, { n: 3 }, CAMPOS, 'A', 100);
    const b = incrementar(undefined, { n: 4 }, CAMPOS, 'B', 100);
    const ab = mesclarContadores(a, b, CAMPOS);
    expect(ab.n).toBe(7);
    expect(mesclarContadores(ab, b, CAMPOS).n).toBe(7);
    expect(mesclarContadores(b, a, CAMPOS).n).toBe(7);
  });

  it('desfazer (negativo) propaga e não deixa o total negativo', () => {
    const a1 = incrementar(undefined, { n: 2 }, CAMPOS, 'A', 100);
    const a2 = incrementar(a1, { n: -1 }, CAMPOS, 'A', 200);
    expect(mesclarContadores(a1, a2, CAMPOS).n).toBe(1);
    expect(incrementar(undefined, { n: -1 }, CAMPOS, 'A', 100).n).toBe(0);
  });

  it('legado dos dois lados fica com o maior (como antes da v6)', () => {
    expect(mesclarContadores({ n: 5 }, { n: 8 }, CAMPOS).n).toBe(8);
  });
});

describe('mesclarCard', () => {
  it('nota editada num aparelho e revisão no outro: os dois ficam', () => {
    const base = card('c1', 'ねこ', 100);
    const revisado = { ...base, reps: 1, state: 2, ...carimbosCard(base, ['srsUpdatedAt'], 200) };
    const comNota = { ...base, note: 'gato', ...carimbosCard(base, ['contentUpdatedAt'], 300) };
    for (const r of [mesclarCard(revisado, comNota), mesclarCard(comNota, revisado)]) {
      expect(r.reps).toBe(1);
      expect(r.note).toBe('gato');
      expect(r.updatedAt).toBe(300);
    }
  });
});

describe('importData (mesclar)', () => {
  beforeEach(async () => {
    await Promise.all(db.tables.map((t) => t.clear()));
  });

  it('exclusão chega ao outro aparelho; edição posterior à exclusão ressuscita', async () => {
    await db.cards.bulkPut([card('c1', 'いぬ', 100), card('c2', 'ねこ', 100)]);
    await importData(
      backup({
        cards: [card('c2', 'ねこ', 100, { note: 'x', contentUpdatedAt: 500, updatedAt: 500 })],
        deleted: [
          { table: 'cards', key: 'c1', deletedAt: 200 },
          { table: 'cards', key: 'c2', deletedAt: 300 },
        ],
      }),
      'merge'
    );
    expect(await db.cards.get('c1')).toBeUndefined();
    expect((await db.cards.get('c2'))?.note).toBe('x');
  });

  it('revisão desfeita no outro aparelho sai daqui', async () => {
    await db.reviews.put({ id: 'r1', cardId: 'c1', reviewedAt: 100, quality: 3, intervalAfter: 1 });
    await importData(backup({ deleted: [{ table: 'reviews', key: 'r1', deletedAt: 150 }] }), 'merge');
    expect(await db.reviews.count()).toBe(0);
  });

  it('mesma palavra aprendida nos dois aparelhos vira um card só, com as revisões juntas', async () => {
    await db.cards.put(card('a', 'みず', 100, { reps: 2, srsUpdatedAt: 400, updatedAt: 400 }));
    await db.reviews.put({ id: 'ra', cardId: 'a', reviewedAt: 400, quality: 3, intervalAfter: 1 });
    const outro = backup({
      cards: [card('b', 'みず', 50)],
      reviews: [{ id: 'rb', cardId: 'b', reviewedAt: 60, quality: 3, intervalAfter: 1 }],
    });
    await importData(outro, 'merge');
    await importData(outro, 'merge'); // idempotente: o card apagado não volta
    const cards = await db.cards.toArray();
    expect(cards.map((c) => c.id)).toEqual(['b']); // o mais antigo fica
    expect(cards[0].reps).toBe(2); // com o estado SRS mais recente
    expect((await db.reviews.toArray()).every((r) => r.cardId === 'b')).toBe(true);
  });

  it('atividade do mesmo dia em dois aparelhos soma e é idempotente', async () => {
    const dia = { day: '2026-11-01', revisoes: 0, praticas: 0, leituras: 0, novos: 0, updatedAt: 0 };
    await db.activity.put({ ...dia, ...incrementar(dia, { revisoes: 10 }, ['revisoes'], 'A', 1), updatedAt: 1 });
    const deB = { ...dia, ...incrementar(dia, { revisoes: 5 }, ['revisoes'], 'B', 1), updatedAt: 1 };
    await importData(backup({ activity: [deB] }), 'merge');
    await importData(backup({ activity: [deB] }), 'merge');
    expect((await db.activity.get('2026-11-01'))?.revisoes).toBe(15);
  });

  it('preferência mais recente vence; mais antiga não', async () => {
    await db.meta.put({ key: 'theme', value: 'dark', updatedAt: 200 });
    await importData(backup({ meta: [{ key: 'theme', value: 'light', updatedAt: 100 }] }), 'merge');
    expect((await db.meta.get('theme'))?.value).toBe('dark');
    await importData(backup({ meta: [{ key: 'theme', value: 'light', updatedAt: 300 }] }), 'merge');
    expect((await db.meta.get('theme'))?.value).toBe('light');
  });

  it('kanji: FSRS mais recente vence, caligrafia fica com a melhor nota', async () => {
    const k = { char: '日', ...freshSrs(100), createdAt: 100, updatedAt: 100 };
    await db.kanjiProgress.put({ ...k, reps: 3, updatedAt: 300, drawBest: 40 });
    await importData(backup({ kanjiProgress: [{ ...k, drawBest: 90 }] }), 'merge');
    const r = await db.kanjiProgress.get('日');
    expect(r?.reps).toBe(3);
    expect(r?.drawBest).toBe(90);
  });

  it('exportar e mesclar no mesmo aparelho não muda nada', async () => {
    await db.cards.put(card('c1', 'いぬ', 100));
    const antes = await exportData();
    await importData(antes, 'merge');
    const depois = await exportData();
    expect({ ...depois, exportedAt: 0 }).toEqual({ ...antes, exportedAt: 0 });
  });
});

describe('mesmoConteudo', () => {
  it('não depende da ordem dos registros nem da data de exportação', () => {
    const a = backup({ cards: [card('a', 'いぬ', 1), card('b', 'ねこ', 1)], exportedAt: 1 });
    const b = backup({ cards: [card('b', 'ねこ', 1), card('a', 'いぬ', 1)], exportedAt: 2 });
    expect(mesmoConteudo(a, b)).toBe(true);
    expect(mesmoConteudo(a, backup({ cards: [card('a', 'いぬ', 1)] }))).toBe(false);
    expect(mesmoConteudo(a, backup({ cards: [card('a', 'いぬ', 1), card('b', 'ねこ', 2)] }))).toBe(false);
  });
});
