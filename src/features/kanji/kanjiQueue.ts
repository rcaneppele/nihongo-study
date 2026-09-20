import { db } from '../../db/schema';
import { KANJI_N5, getKanjiByChar, getNextNewKanji, type KanjiEntry } from '../../data/kanji';

/** Kanji já "aprendidos" (com linha em kanjiProgress) e com dueDate vencido. */
export async function getDueKanji(): Promise<KanjiEntry[]> {
  const now = Date.now();
  const progress = await db.kanjiProgress.where('dueDate').belowOrEqual(now).toArray();
  return progress
    .map((p) => getKanjiByChar(p.char))
    .filter((k): k is KanjiEntry => k !== undefined);
}

/** Kanji do dataset que o usuário ainda não começou a estudar, na ordem pedagógica. */
export async function getAvailableNewKanji(limit: number): Promise<KanjiEntry[]> {
  const started = new Set(await db.kanjiProgress.toCollection().primaryKeys());
  return getNextNewKanji(started, limit);
}

/** Kanji já com pelo menos uma linha em kanjiProgress — usados na prática livre de caligrafia. */
export async function getStartedKanji(): Promise<KanjiEntry[]> {
  const started = new Set(await db.kanjiProgress.toCollection().primaryKeys());
  return KANJI_N5.filter((k) => started.has(k.char)).sort((a, b) => a.order - b.order);
}
