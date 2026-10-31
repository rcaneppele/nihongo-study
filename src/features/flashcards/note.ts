import type { Card } from '../../db/schema';
import { n5Note } from '../../data/seed/n5';

/** Nota do card: a própria, senão a do deck N5 pela frente. `''` (apagada pelo usuário) não mostra nada. */
export function cardNote(card: Card): string | undefined {
  return (card.note ?? n5Note(card.front)) || undefined;
}
