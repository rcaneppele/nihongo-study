import { beforeEach, describe, expect, it } from 'vitest';
import { State } from 'ts-fsrs';
import { db } from '../../db/schema';
import { LEITURA_TEXTOS } from '../../data/leitura/textos';
import type { ReadingText } from '../../data/leitura/types';
import { freshSrs } from '../srs/fsrs';
import { diaLocal } from '../atividade/atividade';
import { finishReading, knownPercent, palavrasConhecidas, textWords, wordKey } from './knowledge';
import { limparBanco } from '../../test/banco';
import { AGORA, DIA, umaReview, umCard } from '../../test/fabricas';

beforeEach(limparBanco);

const texto: ReadingText = {
  id: 't-teste',
  level: 1,
  title: 'teste',
  lines: [
    {
      translation: 'Gato é bonito.',
      words: [
        { text: 'ねこ', meaning: 'gato' },
        { text: 'は', },
        { text: 'かわいい', meaning: 'fofo' },
        { text: 'ねこ', meaning: 'gato' },
      ],
    },
  ],
} as ReadingText;

describe('textWords / wordKey', () => {
  it('palavras únicas com significado, na ordem em que aparecem', () => {
    expect(textWords(texto).map((w) => w.key)).toEqual(['ねこ', 'かわいい']);
    expect(wordKey({ text: 'は' } as never)).toBeNull();
  });

  it('todo texto de leitura tem palavras com chave', () => {
    for (const t of LEITURA_TEXTOS) expect(textWords(t).length, t.id).toBeGreaterThan(0);
  });
});

describe('finishReading', () => {
  it('compreendida = lida sem consultar; consultada = tocou; conta leitura e atividade', async () => {
    await finishReading(texto, new Set(['かわいい']));
    expect(await db.wordKnowledge.get('ねこ')).toMatchObject({ status: 'compreendida', seenCount: 1, lookupCount: 0 });
    expect(await db.wordKnowledge.get('かわいい')).toMatchObject({ status: 'consultada', seenCount: 1, lookupCount: 1 });
    expect(await db.readingProgress.get('t-teste')).toMatchObject({ timesRead: 1 });
    expect((await db.activity.get(diaLocal()))?.leituras).toBe(1);

    await finishReading(texto, new Set());
    expect(await db.wordKnowledge.get('かわいい')).toMatchObject({ status: 'compreendida', seenCount: 2, lookupCount: 1 });
    expect((await db.readingProgress.get('t-teste'))?.timesRead).toBe(2);
  });
});

describe('palavrasConhecidas', () => {
  it('compreendidas: da leitura + cards já revisados; sei dizer: cards com produção', () => {
    const revisado = umCard({ front: 'いぬ', state: State.Review });
    const novo = umCard({ front: 'とり' });
    const dizendo = umCard({ front: 'さかな', state: State.Review, production: freshSrs(AGORA) });
    const k = palavrasConhecidas(
      [{ key: 'ねこ', status: 'compreendida', seenCount: 1, lookupCount: 0, updatedAt: AGORA }, { key: 'うま', status: 'consultada', seenCount: 1, lookupCount: 1, updatedAt: AGORA }],
      [revisado, novo, dizendo],
      [umaReview(revisado.id, { reviewedAt: AGORA - 2 * DIA }), umaReview(dizendo.id, { reviewedAt: AGORA - 30 * DIA }), umaReview(dizendo.id, { direction: 'production', reviewedAt: AGORA - DIA })],
      AGORA
    );
    expect([...k.understood].sort()).toEqual(['いぬ', 'さかな', 'ねこ'].sort());
    expect([...k.canSay]).toEqual(['さかな']);
    // Semana: ねこ (1ª leitura) + いぬ (1ª revisão há 2 dias); さかな foi revisada pela 1ª vez há 30 dias.
    expect(k.understoodWeek).toBe(2);
    expect(k.canSayWeek).toBe(1);
  });

  it('knownPercent', () => {
    const k = palavrasConhecidas([{ key: 'ねこ', status: 'compreendida', seenCount: 1, lookupCount: 0, updatedAt: AGORA }], [], [], AGORA);
    expect(knownPercent(texto, k)).toBe(50);
  });
});
