import { db, newId, type Card, type WordKnowledge } from '../../db/schema';
import { N5_DECK, type N5Entry } from '../../data/seed/n5';
import { LEITURA_TEXTOS } from '../../data/leitura/textos';
import type { ReadingText } from '../../data/leitura/types';
import { wordKey } from '../leitura/knowledge';
import { freshSrs } from '../srs/fsrs';
import { cardStage } from './stages';

/**
 * Mapa de vocabulário: o deck N5 (só as entradas sem kanji, mesmo filtro de
 * N5_DECK) cruzado com o que o usuário já sabe de cada palavra.
 *
 * Estados de uma palavra no mapa:
 * - **nova**: sem card e nunca marcada como conhecida.
 * - **naFila**: tem card, ainda não revisado.
 * - **reconheco**: card já revisado, ou marcada como compreendida (leitura
 *   sem consultar, ou "Já sei" no mapa — ambos em `wordKnowledge`).
 * - **seiDizer** / **domino**: estágios do card (ver stages.ts).
 */
export type WordState = 'nova' | 'naFila' | 'reconheco' | 'seiDizer' | 'domino';

export const WORD_STATE_LABELS: Record<WordState, string> = {
  nova: 'Nova',
  naFila: 'Na fila',
  reconheco: 'Reconheço',
  seiDizer: 'Sei dizer',
  domino: 'Domino',
};

export const WORD_STATE_ORDER: WordState[] = ['nova', 'naFila', 'reconheco', 'seiDizer', 'domino'];

/** Estados que contam como "conhecida" no % do mapa. */
export const KNOWN_STATES: WordState[] = ['reconheco', 'seiDizer', 'domino'];

export interface VocabWord {
  entry: N5Entry;
  /** Posição no deck — desempate estável na ordem de utilidade. */
  deckIndex: number;
  /** Textos de leitura em que a palavra aparece (medida de utilidade). */
  texts: ReadingText[];
  state: WordState;
  card?: Card;
  knowledge?: WordKnowledge;
}

/**
 * Em quais textos de leitura cada palavra aparece, pela mesma chave do
 * vocabulário passivo (`wordKey`). Calculado uma vez — os textos são
 * estáticos.
 */
const TEXTS_BY_KEY: Map<string, ReadingText[]> = (() => {
  const map = new Map<string, ReadingText[]>();
  for (const texto of LEITURA_TEXTOS) {
    const keys = new Set<string>();
    for (const line of texto.lines) for (const word of line.words) {
      const key = wordKey(word);
      if (key) keys.add(key);
    }
    for (const key of keys) map.set(key, [...(map.get(key) ?? []), texto]);
  }
  return map;
})();

export function buildVocabulary(cards: Card[], knowledge: WordKnowledge[]): VocabWord[] {
  const cardByFront = new Map(cards.map((c) => [c.front, c]));
  const knowledgeByKey = new Map(knowledge.map((k) => [k.key, k]));

  return N5_DECK.map((entry, deckIndex) => {
    const card = cardByFront.get(entry.front);
    const k = knowledgeByKey.get(entry.front);
    let state: WordState = 'nova';
    if (card) {
      const stage = cardStage(card);
      state = stage === 'novo' ? (k?.status === 'compreendida' ? 'reconheco' : 'naFila') : stage;
    } else if (k?.status === 'compreendida') {
      state = 'reconheco';
    }
    return { entry, deckIndex, texts: TEXTS_BY_KEY.get(entry.front) ?? [], state, card, knowledge: k };
  });
}

/**
 * Ordem de utilidade: primeiro as palavras que aparecem em mais textos de
 * leitura (aprender elas destrava mais leitura), depois a categoria em
 * ordem "iniciante primeiro" (o que entra em qualquer conversa antes de
 * substantivos específicos), depois a ordem do próprio deck. Hoje só uma
 * parte do deck aparece nos textos, então o desempate pesa bastante.
 */
export function byUsefulness(a: VocabWord, b: VocabWord): number {
  return (
    b.texts.length - a.texts.length ||
    categoryRank(a.entry.category) - categoryRank(b.entry.category) ||
    a.deckIndex - b.deckIndex
  );
}

const BEGINNER_CATEGORY_ORDER = [
  'Saudações e expressões',
  'Pronomes e interrogativos',
  'Números e tempo',
  'Verbos',
  'Adjetivos',
  'Advérbios',
  'Partículas e gramática',
  'Substantivos',
];

function categoryRank(category: string): number {
  const i = BEGINNER_CATEGORY_ORDER.indexOf(category);
  return i === -1 ? BEGINNER_CATEGORY_ORDER.length : i;
}

/** Cria cards (estado FSRS novo) para as palavras dadas — mesmo formato do import do N5. */
export async function learnWords(words: VocabWord[]): Promise<number> {
  const now = Date.now();
  const toAdd = words.filter((w) => !w.card);
  await db.cards.bulkAdd(
    toAdd.map((w) => ({ id: newId(), ...w.entry, ...freshSrs(now), createdAt: now, updatedAt: now }))
  );
  return toAdd.length;
}

/** "Já sei": marca a palavra como compreendida sem criar card (vai pro vocabulário passivo). */
export function markKnown(word: VocabWord) {
  const now = Date.now();
  return db.wordKnowledge.put({
    key: word.entry.front,
    status: 'compreendida',
    seenCount: word.knowledge?.seenCount ?? 0,
    lookupCount: word.knowledge?.lookupCount ?? 0,
    updatedAt: now,
  });
}

/** Desfaz o "Já sei" — só quando a palavra nunca apareceu numa leitura concluída (senão o registro é da leitura). */
export function unmarkKnown(word: VocabWord) {
  return db.wordKnowledge.delete(word.entry.front);
}

/**
 * Card transitório (não gravado) pra "Testar" palavras sem card na prática
 * livre — a prática não grava nada, então não precisa existir no banco.
 */
export function practiceCard(word: VocabWord): Card {
  if (word.card) return word.card;
  const now = Date.now();
  return { id: `vocab-${word.entry.front}`, ...word.entry, ...freshSrs(now), createdAt: now, updatedAt: now };
}
