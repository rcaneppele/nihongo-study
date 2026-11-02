import { beforeEach, describe, expect, it } from 'vitest';
import { db } from '../../db/schema';
import type { ReadingLine, ReadingText, ReadingWord } from '../../data/leitura/types';
import { exampleFromLine, MINED_CATEGORY, saveMinedCard, sourceFromText, suggestCard } from './mining';
import { limparBanco } from '../../test/banco';

beforeEach(limparBanco);

const w = (p: Partial<ReadingWord>) => ({ text: '', ...p }) as ReadingWord;

describe('suggestCard', () => {
  it('tira a pontuação grudada', () => {
    expect(suggestCard(w({ text: 'ねこ。', reading: 'ねこ。', meaning: 'gato' }))).toEqual({ front: 'ねこ', reading: 'ねこ', back: 'gato' });
  });

  it('tira a partícula anotada no significado (da frente e da leitura)', () => {
    expect(suggestCard(w({ text: '天気が', reading: 'てんきが', meaning: 'tempo (+ partícula de sujeito)' }))).toEqual({
      front: '天気',
      reading: 'てんき',
      back: 'tempo',
    });
  });

  it('com forma de dicionário, usa o lema e a leitura dele', () => {
    expect(suggestCard(w({ text: '行きました', reading: 'いきました', meaning: 'fui', lemma: '行く', lemmaReading: 'いく' }))).toEqual({
      front: '行く',
      reading: 'いく',
      back: 'fui',
    });
  });
});

describe('saveMinedCard', () => {
  it('card com frase de contexto, origem, categoria e tag da leitura', async () => {
    const line = { translation: 'O gato dorme.', words: [w({ text: 'ねこが', reading: 'ねこが' }), w({ text: 'ねる', reading: 'ねる' })] } as ReadingLine;
    const texto = { id: 't1', title: 'Gatos', level: 1, lines: [line] } as ReadingText;
    await saveMinedCard({ front: ' ねこ ', reading: '', back: 'gato' }, exampleFromLine(line, 0), sourceFromText(texto));
    const [card] = await db.cards.toArray();
    expect(card).toMatchObject({
      front: 'ねこ',
      reading: undefined,
      category: MINED_CATEGORY,
      tags: ['leitura'],
      source: { kind: 'leitura', id: 't1', title: 'Gatos' },
      example: { highlight: 0, translation: 'O gato dorme.' },
    });
    expect(card.example?.segments).toHaveLength(2);
  });
});
