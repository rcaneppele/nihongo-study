import { beforeEach, describe, expect, it } from 'vitest';
import { db } from '../../db/schema';
import { LICOES } from '../../licoes';
import { KANJI_N5 } from '../../data/kanji';
import { carregarPontosFracos, misturar, type PontoFraco } from './pontosFracos';
import { limparBanco } from '../../test/banco';
import { umCard, umKanaProgress, umKanjiProgress } from '../../test/fabricas';

beforeEach(limparBanco);

describe('carregarPontosFracos', () => {
  it('banco vazio: nada', async () => {
    const r = await carregarPontosFracos();
    expect(Object.values(r).every((l) => l.length === 0)).toBe(true);
  });

  it('cards: lapsos nas duas direções, o pior primeiro, treinando a direção que mais errou', async () => {
    const c1 = umCard({ front: 'a', lapses: 1 });
    const c2 = umCard({ front: 'b', lapses: 1, production: { ...umCard(), lapses: 3 } });
    await db.cards.bulkAdd([c1, c2, umCard({ front: 'sem-erro' })]);
    const { cards } = await carregarPontosFracos();
    expect(cards.map((p) => p.jp)).toEqual(['b', 'a']);
    expect(cards[0].item.direction).toBe('production');
    expect(cards[0].detalhe).toContain('ao dizer em japonês');
  });

  it('kana: só com erro e acerto abaixo de 85%', async () => {
    await db.kanaProgress.bulkAdd([
      umKanaProgress('あ', { romajiCorrect: 1, romajiWrong: 3 }),
      umKanaProgress('い', { romajiCorrect: 19, romajiWrong: 1 }),
      umKanaProgress('う', { romajiCorrect: 5 }),
    ]);
    expect((await carregarPontosFracos()).kana.map((p) => p.jp)).toEqual(['あ']);
  });

  it('kanji: lapsos; leitura: palavras consultadas', async () => {
    await db.kanjiProgress.add(umKanjiProgress(KANJI_N5[0].char, { lapses: 2 }));
    await db.wordKnowledge.add({ key: 'わたし', status: 'consultada', seenCount: 2, lookupCount: 2, updatedAt: 1 });
    const r = await carregarPontosFracos();
    expect(r.kanji.map((p) => p.jp)).toEqual([KANJI_N5[0].char]);
    expect(r.leitura.map((p) => p.jp)).toEqual(['わたし']);
  });

  it('lições: item errado na última tentativa entra; acertado depois de muitos acertos, não', async () => {
    const pergunta = LICOES.flatMap((l) => l.quiz?.perguntas ?? [])[0];
    const frase = LICOES.flatMap((l) => l.quiz?.frases ?? [])[0];
    await db.exerciseResults.bulkAdd([
      { id: '1', kind: 'quiz', itemId: pergunta.id, score: 0, doneAt: 1 },
      { id: '2', kind: 'diga', itemId: frase.id, score: 0, doneAt: 1 },
      ...Array.from({ length: 9 }, (_, i) => ({ id: `ok${i}`, kind: 'diga' as const, itemId: frase.id, score: 1, doneAt: 2 + i })),
    ]);
    const { licoes } = await carregarPontosFracos();
    expect(licoes.map((p) => p.id)).toEqual([`quiz-${pergunta.id}`]);
  });
});

describe('misturar', () => {
  const p = (id: string) => ({ id }) as PontoFraco;
  it('alterna entre as origens até o limite', () => {
    expect(misturar([[p('a1'), p('a2'), p('a3')], [p('b1')], []], 4).map((x) => x.id)).toEqual(['a1', 'b1', 'a2', 'a3']);
    expect(misturar([[p('a1')], [p('b1')]], 1).map((x) => x.id)).toEqual(['a1']);
    expect(misturar([], 5)).toEqual([]);
  });
});

describe('carregarPontosFracos — ordem, bordas e o que vai pro treino', () => {
  it('cards: mais esquecidos primeiro; empatados, o mais difícil; empate entre direções treina o reconhecimento', async () => {
    await db.cards.bulkAdd([
      umCard({ id: 'facil', front: 'fácil', lapses: 1, difficulty: 2 }),
      umCard({ id: 'dificil', front: 'difícil', lapses: 1, difficulty: 8 }),
      umCard({ id: 'muitos', front: 'muitos', lapses: 2, difficulty: 1 }),
      umCard({ id: 'empate', front: 'empate', lapses: 1, difficulty: 1, production: { ...umCard(), lapses: 1 } }),
    ]);
    const { cards } = await carregarPontosFracos();
    expect(cards.map((p) => p.jp)).toEqual(['empate', 'muitos', 'difícil', 'fácil']);
    expect(cards[0]).toMatchObject({ detalhe: 'esqueceu 2×', item: { direction: 'recognition' } });
  });

  it('kana: soma digitar e múltipla escolha; exatamente 85% não é ponto fraco; nunca praticado também não', async () => {
    await db.kanaProgress.bulkAdd([
      umKanaProgress('あ', { romajiCorrect: 0, romajiWrong: 1, choiceCorrect: 10 }), // 91%
      umKanaProgress('い', { romajiCorrect: 1, choiceWrong: 2 }), // 33%
      umKanaProgress('う', { romajiCorrect: 17, romajiWrong: 3 }), // 85%
      umKanaProgress('え'),
      umKanaProgress('お', { romajiCorrect: 1, romajiWrong: 1 }), // 50%
    ]);
    const { kana } = await carregarPontosFracos();
    expect(kana.map((p) => p.jp)).toEqual(['い', 'お']);
    expect(kana[0]).toMatchObject({ pt: 'i', detalhe: 'acerto 33% · errou 2×', item: { card: { front: 'い', back: 'i' } } });
  });

  it('kanji: sem lapso não entra; kanji fora do N5 é ignorado; o card de treino traz significado e leituras', async () => {
    const [k1, k2, k3] = KANJI_N5;
    await db.kanjiProgress.bulkAdd([
      umKanjiProgress(k1.char, { lapses: 1, difficulty: 9 }),
      umKanjiProgress(k2.char, { lapses: 2, difficulty: 1 }),
      umKanjiProgress(k3.char, { lapses: 0 }),
      umKanjiProgress('龘', { lapses: 5 }),
    ]);
    const { kanji } = await carregarPontosFracos();
    expect(kanji.map((p) => p.jp)).toEqual([k2.char, k1.char]);
    const leituras = [...k2.kunyomi, ...k2.onyomi].map((r) => r.kana).join('、');
    expect(kanji[0]).toMatchObject({
      pt: k2.meaning,
      reading: leituras,
      detalhe: 'esqueceu 2×',
      item: { card: { front: k2.char, back: k2.meaning, reading: leituras } },
    });
  });

  it('leitura: só consultadas e conhecidas dos textos; mais consultas primeiro, e no empate a mais consultada proporcionalmente', async () => {
    const palavra = (key: string, lookupCount: number, seenCount: number, status: 'consultada' | 'compreendida' = 'consultada') => ({
      key,
      status,
      seenCount,
      lookupCount,
      updatedAt: 1,
    });
    await db.wordKnowledge.bulkAdd([
      palavra('わたし', 2, 5),
      palavra('ねこ', 2, 2),
      palavra('いぬ', 3, 9),
      palavra('がっこう', 4, 4, 'compreendida'),
      palavra('não-existe-nos-textos', 9, 9),
    ]);
    const { leitura } = await carregarPontosFracos();
    expect(leitura.map((p) => p.jp)).toEqual(['いぬ', 'ねこ', 'わたし']);
    expect(leitura[1]).toMatchObject({ detalhe: 'consultou em 2 de 2 leitura(s)', item: { card: { front: 'ねこ' } } });
    expect(leitura[1].pt).toBeTruthy();
  });

  it('lições: acerto abaixo de 70% entra mesmo com a última certa; exatamente 70%, não; errada por último vem primeiro', async () => {
    const [p1, p2, p3] = LICOES.flatMap((l) => l.quiz?.perguntas ?? []);
    const resultados = (itemId: string, scores: number[]) =>
      scores.map((score, i) => ({ id: `${itemId}-${i}`, kind: 'quiz' as const, itemId, score, doneAt: i + 1 }));
    await db.exerciseResults.bulkAdd([
      ...resultados(p1.id, [0, 1]), // 50%, última certa
      ...resultados(p2.id, [0, 0, 0, 1, 1, 1, 1, 1, 1, 1]), // 70%, última certa
      ...resultados(p3.id, [1, 0]), // 50%, última errada
      ...resultados('pergunta-que-nao-existe', [0]),
    ]);
    const { licoes } = await carregarPontosFracos();
    expect(licoes.map((p) => p.id)).toEqual([`quiz-${p3.id}`, `quiz-${p1.id}`]);
    expect(licoes[1]).toMatchObject({ detalhe: 'quiz · errou 1 de 2', item: { card: { front: licoes[1].jp, back: licoes[1].pt } } });
  });
});

describe('misturar — limite no meio de uma rodada', () => {
  const p = (id: string) => ({ id }) as PontoFraco;
  it('para exatamente no limite, mesmo no meio da rodada', () => {
    expect(misturar([[p('a1'), p('a2')], [p('b1'), p('b2')]], 3).map((x) => x.id)).toEqual(['a1', 'b1', 'a2']);
  });
});
