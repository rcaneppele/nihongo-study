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
