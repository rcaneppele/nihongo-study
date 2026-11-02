import 'fake-indexeddb/auto';
import { beforeEach, describe, expect, it } from 'vitest';
import { incrementar, mesclarContadores } from './contadores';
import {
  cardMantido,
  carimbosCard,
  iguais,
  mesclarAtividade,
  mesclarCard,
  mesclarConquista,
  mesclarKana,
  mesclarKanji,
  mesclarLeitura,
  mesclarLicao,
  mesclarPalavra,
} from './merge';
import { db, type Card } from './schema';
import { exportData, importData, mesmoConteudo, SCHEMA_VERSION, type BackupFile } from './backup';
import { freshSrs } from '../features/srs/fsrs';
import { umKanaProgress, umKanjiProgress } from '../test/fabricas';

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
    exerciseResults: [],
    lessonProgress: [],
    achievements: [],
    journal: [],
    ...parcial,
  };
}

describe('contadores por aparelho', () => {
  it('registro antigo vira legado e o aparelho soma por cima', () => {
    const r = incrementar({ n: 5 }, { n: 2 }, CAMPOS, 'A', 100);
    expect(r.n).toBe(7);
    expect(r.porAparelho.legado.n).toBe(5);
  });

  it('registro antigo zerado não cria entrada de legado', () => {
    expect(mesclarContadores({ n: 0 }, { n: 0 }, CAMPOS)).toEqual({ n: 0, porAparelho: {} });
    expect(incrementar({ n: 0 }, { n: 1 }, CAMPOS, 'A', 100).porAparelho).toEqual({ A: { n: 1, updatedAt: 100 } });
  });

  it('legado dos dois lados com campos diferentes: junta os campos, sem inventar os que nenhum tem', () => {
    const campos = ['n', 'm', 'k'] as const;
    const r = mesclarContadores({ n: 3 }, { m: 2 }, campos);
    expect(r.porAparelho).toEqual({ legado: { updatedAt: 0, n: 3, m: 2 } });
    expect(r).toMatchObject({ n: 3, m: 2, k: 0 });
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

describe('mesclarCard — card sem carimbos por grupo (novo ou anterior à v6)', () => {
  // Regressão (achada pelo teste de propriedade em merge.propriedades.test.ts):
  // o aparelho do meio subia o `updatedAt` sem gravar os carimbos ausentes, e
  // o estado velho do SRS passava a vencer a revisão feita noutro aparelho.
  it('revisão num aparelho não se perde quando um terceiro mescla uma edição de nota antes', () => {
    const base = card('c', 'ねこ', 100);
    const revisadoEmC = { ...base, reps: 1, state: 2, ...carimbosCard(base, ['srsUpdatedAt'], 1000) };
    const notaEmA = { ...base, note: 'nota', ...carimbosCard(base, ['contentUpdatedAt'], 1001) };
    const b = mesclarCard(base, notaEmA);
    expect(mesclarCard(b, revisadoEmC)).toMatchObject({ reps: 1, state: 2, note: 'nota' });
    expect(mesclarCard(revisadoEmC, b)).toMatchObject({ reps: 1, state: 2, note: 'nota' });
  });
});

describe('cardMantido (duplicatas da mesma frente)', () => {
  it('fica o criado primeiro; no empate, o de menor id — o mesmo em qualquer aparelho e em qualquer ordem', () => {
    const a = card('b-id', 'ねこ', 10);
    const b = card('a-id', 'ねこ', 10);
    const c = card('c-id', 'ねこ', 5);
    expect(cardMantido([a, b]).id).toBe('a-id');
    expect(cardMantido([b, a]).id).toBe('a-id');
    expect(cardMantido([a, b, c]).id).toBe('c-id');
    expect(cardMantido([c, b, a]).id).toBe('c-id');
  });
});

describe('mesclarLicao e mesclarConquista', () => {
  it('lição: concluir num aparelho e abrir no outro — fica concluída e com a última abertura', () => {
    const concluida = { lessonId: 'desu', viewedAt: 100, completedAt: 150, updatedAt: 150 };
    const aberta = { lessonId: 'desu', viewedAt: 300, updatedAt: 0 };
    for (const r of [mesclarLicao(concluida, aberta), mesclarLicao(aberta, concluida)]) {
      expect(r).toEqual({ lessonId: 'desu', viewedAt: 300, completedAt: 150, updatedAt: 150 });
    }
  });

  it('lição: desmarcar depois de concluir vence', () => {
    const concluida = { lessonId: 'desu', viewedAt: 100, completedAt: 150, updatedAt: 150 };
    const desmarcada = { lessonId: 'desu', viewedAt: 100, updatedAt: 200 };
    expect(mesclarLicao(concluida, desmarcada).completedAt).toBeUndefined();
    expect(mesclarLicao(desmarcada, concluida).completedAt).toBeUndefined();
  });

  it('conquista: fica a primeira data', () => {
    expect(mesclarConquista({ id: 'x', unlockedAt: 200 }, { id: 'x', unlockedAt: 100 }).unlockedAt).toBe(100);
    expect(mesclarConquista({ id: 'x', unlockedAt: 100 }, { id: 'x', unlockedAt: 200 }).unlockedAt).toBe(100);
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

  it('diário: exclusão propaga e resultados de exercício se juntam sem duplicar', async () => {
    const entrada = { id: 'j1', promptId: 'p', text: 'わたしは がくせいです', checked: [], createdAt: 100, updatedAt: 100 };
    await db.journal.put(entrada);
    const resultado = { id: 'e1', kind: 'quiz' as const, itemId: 'desu-f1', score: 1, doneAt: 100 };
    const outro = backup({ deleted: [{ table: 'journal', key: 'j1', deletedAt: 200 }], exerciseResults: [resultado] });
    await importData(outro, 'merge');
    await importData(outro, 'merge');
    expect(await db.journal.count()).toBe(0);
    expect(await db.exerciseResults.count()).toBe(1);
  });

  it('exportar e mesclar no mesmo aparelho não muda nada', async () => {
    await db.cards.put(card('c1', 'いぬ', 100));
    await db.lessonProgress.put({ lessonId: 'desu', viewedAt: 100, completedAt: 100, updatedAt: 100 });
    await db.achievements.put({ id: 'licao-1', unlockedAt: 100 });
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

describe('datas que não dependem de quem venceu', () => {
  it('card e kanji: fica a criação mais antiga, de qualquer lado', () => {
    expect(mesclarCard(card('x', 'ねこ', 20), card('x', 'ねこ', 10)).createdAt).toBe(10);
    expect(mesclarCard(card('x', 'ねこ', 10), card('x', 'ねこ', 20)).createdAt).toBe(10);
    const kanji = (createdAt: number, updatedAt: number) => umKanjiProgress('日', { createdAt, updatedAt });
    expect(mesclarKanji(kanji(20, 5), kanji(10, 1)).createdAt).toBe(10);
    expect(mesclarKanji(kanji(10, 1), kanji(20, 5)).createdAt).toBe(10);
  });

  it('leitura e atividade: fica a alteração mais recente, de qualquer lado', () => {
    const leitura = (updatedAt: number) => ({ textId: 't', timesRead: 1, lastReadAt: 1, updatedAt });
    expect(mesclarLeitura(leitura(10), leitura(20)).updatedAt).toBe(20);
    expect(mesclarLeitura(leitura(20), leitura(10)).updatedAt).toBe(20);
    const dia = (updatedAt: number) => ({ day: '2026-11-02', revisoes: 1, novos: 0, praticas: 0, leituras: 0, updatedAt });
    expect(mesclarAtividade(dia(10), dia(20)).updatedAt).toBe(20);
    expect(mesclarAtividade(dia(20), dia(10)).updatedAt).toBe(20);
  });
});

describe('mesclarPalavra e mesclarKana', () => {
  it('palavra: a situação da leitura mais recente vence, venha de onde vier', () => {
    const palavra = (status: 'compreendida' | 'consultada', updatedAt: number) => ({
      key: 'ねこ',
      status,
      seenCount: 1,
      lookupCount: 0,
      updatedAt,
    });
    expect(mesclarPalavra(palavra('consultada', 10), palavra('compreendida', 20))).toMatchObject({
      status: 'compreendida',
      updatedAt: 20,
    });
    expect(mesclarPalavra(palavra('compreendida', 20), palavra('consultada', 10))).toMatchObject({
      status: 'compreendida',
      updatedAt: 20,
    });
  });

  it('kana: os quatro contadores somam por aparelho', () => {
    const lado = (aparelho: string) =>
      umKanaProgress('あ', {
        romajiCorrect: 1,
        romajiWrong: 2,
        choiceCorrect: 3,
        choiceWrong: 4,
        porAparelho: { [aparelho]: { romajiCorrect: 1, romajiWrong: 2, choiceCorrect: 3, choiceWrong: 4, updatedAt: 1 } },
      });
    expect(mesclarKana(lado('A'), lado('B'))).toMatchObject({
      romajiCorrect: 2,
      romajiWrong: 4,
      choiceCorrect: 6,
      choiceWrong: 8,
    });
  });

  it('kana: melhor desenho e última prática ficam mesmo se só um lado tiver', () => {
    const com = umKanaProgress('あ', { drawBest: 70, lastPracticed: 50 });
    const sem = umKanaProgress('あ');
    expect(mesclarKana(sem, com)).toMatchObject({ drawBest: 70, lastPracticed: 50 });
    expect(mesclarKana(com, sem)).toMatchObject({ drawBest: 70, lastPracticed: 50 });
    expect(mesclarKana(sem, sem).drawBest).toBeUndefined();
  });
});

describe('iguais', () => {
  it.each([
    ['objetos com as mesmas chaves em outra ordem', { a: 1, b: { c: [1, 2] } }, { b: { c: [1, 2] }, a: 1 }, true],
    ['chave com undefined conta como ausente', { a: 1, b: undefined }, { a: 1 }, true],
    ['uma chave a mais', { a: 1 }, { a: 1, b: 2 }, false],
    ['valor diferente lá dentro', { a: { b: 1 } }, { a: { b: 2 } }, false],
    ['objeto contra número', {}, 1, false],
    ['número contra objeto', 1, {}, false],
    ['null contra objeto', null, {}, false],
    ['objeto contra null', {}, null, false],
    ['lista contra objeto com as mesmas chaves', [1], { 0: 1 }, false],
    ['objeto contra lista', { 0: 1 }, [1], false],
  ])('%s', (_caso, a, b, esperado) => {
    expect(iguais(a, b)).toBe(esperado);
  });
});
