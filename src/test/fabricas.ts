import type { BackupFile } from '../db/backup';
import { SCHEMA_VERSION } from '../db/backup';
import type { Activity, Card, KanaProgress, KanjiProgress, Review } from '../db/schema';
import { novoCard } from '../features/flashcards/cards';
import { freshSrs } from '../features/srs/fsrs';

/**
 * Fábricas de dados de teste: registros completos e válidos com o mínimo de
 * parâmetro — cada teste só diz o que importa para ele.
 */

export const DIA = 24 * 60 * 60 * 1000;
/** Um instante fixo (meio-dia local de 15/03/2026) para os testes não dependerem do relógio. */
export const AGORA = new Date(2026, 2, 15, 12, 0, 0).getTime();

let seq = 0;
export function umId(prefixo = 'id'): string {
  return `${prefixo}-${++seq}`;
}

export function umCard(extra: Partial<Card> = {}, now: number = AGORA): Card {
  const front = extra.front ?? umId('palavra');
  return { ...novoCard({ front, back: `significado de ${front}` }, now, extra.id ?? umId('card')), ...extra };
}

export function umaReview(cardId: string, extra: Partial<Review> = {}): Review {
  return { id: umId('review'), cardId, reviewedAt: AGORA, quality: 3, intervalAfter: 1, ...extra };
}

export function umKanaProgress(char: string, extra: Partial<KanaProgress> = {}): KanaProgress {
  return { char, type: 'hiragana', romajiCorrect: 0, romajiWrong: 0, ...extra };
}

export function umKanjiProgress(char: string, extra: Partial<KanjiProgress> = {}, now: number = AGORA): KanjiProgress {
  return { char, ...freshSrs(now), createdAt: now, updatedAt: now, ...extra };
}

export function umaAtividade(day: string, extra: Partial<Activity> = {}): Activity {
  return { day, revisoes: 0, praticas: 0, leituras: 0, novos: 0, updatedAt: AGORA, ...extra };
}

/** Backup "do outro aparelho" só com o que o teste precisa. */
export function umBackup(parcial: Partial<BackupFile> = {}): BackupFile {
  return {
    app: 'nihongo-study',
    schemaVersion: SCHEMA_VERSION,
    exportedAt: AGORA,
    cards: [],
    reviews: [],
    kanaProgress: [],
    kanjiProgress: [],
    wordKnowledge: [],
    readingProgress: [],
    activity: [],
    meta: [],
    deleted: [],
    exerciseResults: [],
    lessonProgress: [],
    achievements: [],
    journal: [],
    ...parcial,
  };
}
