import type { CardExample, CardSource } from '../../db/schema';
import { criarCard } from './cards';
import type { ReadingLine, ReadingText, ReadingWord } from '../../data/leitura/types';

/** Categoria dos cards criados a partir da leitura extensiva. */
export const MINED_CATEGORY = 'Leitura';

export interface CardDraft {
  front: string;
  reading: string;
  back: string;
}

const TRAILING_PUNCTUATION = /[。、！？!?「」『』…・\s]+$/u;
// Palavras como "天気が" vêm anotadas com "(+ partícula de sujeito)" no
// significado — o card deve ser só "天気".
const PARTICLE_NOTE = /\s*\(\+ partícula[^)]*\)\s*$/u;

/**
 * Sugestão de card pra uma palavra tocada na leitura. Os textos guardam a
 * forma de superfície (com partícula e pontuação grudadas — ver
 * src/data/leitura/types.ts), então isto é só um ponto de partida: o
 * usuário confere e edita antes de salvar. Remove a pontuação final e,
 * quando o significado indica uma partícula de 1 caractere grudada, tira ela
 * também (da frente e da leitura). Se a palavra tem `lemma`, usa ele.
 */
export function suggestCard(word: ReadingWord): CardDraft {
  // Com forma de dicionário anotada, ela é a frente e `lemmaReading` a
  // leitura (a leitura do texto é da forma conjugada, não serve). O
  // significado continua o da forma do texto ("fui"), pro usuário ajustar.
  if (word.lemma) {
    return { front: word.lemma, reading: word.lemmaReading ?? '', back: (word.meaning ?? '').replace(PARTICLE_NOTE, '') };
  }

  let front = word.text.replace(TRAILING_PUNCTUATION, '');
  let reading = (word.reading ?? '').replace(TRAILING_PUNCTUATION, '');
  let back = word.meaning ?? '';

  if (PARTICLE_NOTE.test(back)) {
    back = back.replace(PARTICLE_NOTE, '');
    if (front.length > 1) front = front.slice(0, -1);
    if (reading.length > 1) reading = reading.slice(0, -1);
  }

  return { front, reading, back };
}

export function exampleFromLine(line: ReadingLine, wordIndex: number): CardExample {
  return {
    segments: line.words.map((w) => ({ text: w.text, reading: w.reading })),
    highlight: wordIndex,
    translation: line.translation,
  };
}

export function sourceFromText(texto: ReadingText): CardSource {
  return { kind: 'leitura', id: texto.id, title: texto.title };
}

export async function saveMinedCard(draft: CardDraft, example: CardExample, source: CardSource): Promise<void> {
  await criarCard({
    front: draft.front.trim(),
    back: draft.back.trim(),
    reading: draft.reading.trim() || undefined,
    category: MINED_CATEGORY,
    tags: ['leitura'],
    example,
    source,
  });
}
