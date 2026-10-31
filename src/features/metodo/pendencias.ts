import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../db/schema';
import { buildReviewQueue } from '../flashcards/stages';
import type { Pendencia } from './estrutura';

/** Pendências de revisão (mesma fila do "Estudar" + kanji vencidos), pros selos da navegação e dos hubs. */
export function usePendencias(): Record<Pendencia, number> {
  const cards = useLiveQuery(async () => buildReviewQueue(await db.cards.toArray()).length, [], 0);
  const kanji = useLiveQuery(() => db.kanjiProgress.where('dueDate').belowOrEqual(Date.now()).count(), [], 0);
  return { cards, kanji, revisao: cards + kanji };
}
