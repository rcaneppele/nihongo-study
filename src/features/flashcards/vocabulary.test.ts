import { beforeEach, describe, expect, it } from 'vitest';
import { State } from 'ts-fsrs';
import { db } from '../../db/schema';
import { N5_DECK } from '../../data/seed/n5';
import { freshSrs } from '../srs/fsrs';
import { buildVocabulary, byUsefulness, learnWords, markKnown, practiceCard, unmarkKnown } from './vocabulary';
import { novoCard } from './cards';
import { limparBanco } from '../../test/banco';
import { AGORA } from '../../test/fabricas';

beforeEach(limparBanco);
const [e1, e2, e3, e4, e5] = N5_DECK;

describe('buildVocabulary', () => {
  it('estado de cada palavra do N5 cruzando cards e o que já sabe', () => {
    const cards = [
      novoCard(e1, AGORA),
      { ...novoCard(e2, AGORA), state: State.Review },
      { ...novoCard(e3, AGORA), state: State.Review, production: freshSrs(AGORA) },
      novoCard(e5, AGORA),
    ];
    const knowledge = [
      { key: e4.front, status: 'compreendida' as const, seenCount: 1, lookupCount: 0, updatedAt: AGORA },
      { key: e5.front, status: 'compreendida' as const, seenCount: 1, lookupCount: 0, updatedAt: AGORA },
    ];
    const v = new Map(buildVocabulary(cards, knowledge).map((w) => [w.entry.front, w.state]));
    expect(v.get(e1.front)).toBe('naFila');
    expect(v.get(e2.front)).toBe('reconheco');
    expect(v.get(e3.front)).toBe('seiDizer');
    expect(v.get(e4.front)).toBe('reconheco');
    expect(v.get(e5.front)).toBe('reconheco');
    expect(v.get(N5_DECK[10].front)).toBe('nova');
    expect(v.size).toBe(N5_DECK.length);
  });

  it('ordem de utilidade é total e estável (palavras de mais textos primeiro)', () => {
    const lista = buildVocabulary([], []).sort(byUsefulness);
    for (let i = 1; i < lista.length; i++) expect(lista[i].texts.length).toBeLessThanOrEqual(lista[i - 1].texts.length);
  });
});

describe('ações do mapa de vocabulário', () => {
  it('aprender cria cards só para as que não têm', async () => {
    const vocab = buildVocabulary([], []);
    expect(await learnWords(vocab.slice(0, 3))).toBe(3);
    const depois = buildVocabulary(await db.cards.toArray(), []);
    expect(await learnWords(depois.slice(0, 4))).toBe(1);
  });

  it('"Já sei" e desfazer', async () => {
    const [palavra] = buildVocabulary([], []);
    await markKnown(palavra);
    expect(await db.wordKnowledge.get(palavra.entry.front)).toMatchObject({ status: 'compreendida', seenCount: 0 });
    await unmarkKnown(palavra);
    expect(await db.wordKnowledge.get(palavra.entry.front)).toBeUndefined();
    expect(await db.deleted.get(['wordKnowledge', palavra.entry.front])).toBeDefined();
  });

  it('praticar palavra sem card usa um card transitório (não gravado)', () => {
    const [palavra] = buildVocabulary([], []);
    expect(practiceCard(palavra)).toMatchObject({ id: `vocab-${palavra.entry.front}`, front: palavra.entry.front });
  });
});
