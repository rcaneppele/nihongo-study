import Dexie, { type Table } from 'dexie';
import { freshSrs } from '../features/srs/fsrs';

/**
 * Modelo de dados local (IndexedDB via Dexie).
 *
 * Importante: as chaves primárias são UUIDs (string), não auto-incremento.
 * Como cada dispositivo gera dados de forma independente, IDs numéricos
 * colidiriam ao mesclar backups. UUID evita isso (ver src/db/backup.ts).
 */

export interface Card {
  id: string;
  front: string; // japonês (palavra/frase)
  back: string; // significado
  reading?: string; // leitura (kana/romaji)
  category?: string; // categoria principal (usada no filtro)
  tags: string[];
  // Estado SRS (FSRS) — ver src/features/srs/fsrs.ts
  stability: number;
  difficulty: number;
  state: number; // State do ts-fsrs: 0 New, 1 Learning, 2 Review, 3 Relearning
  reps: number;
  lapses: number;
  scheduledDays: number;
  dueDate: number; // timestamp da próxima revisão
  lastReviewedAt?: number;
  createdAt: number;
  updatedAt: number; // usado na mesclagem (vence o mais recente)
}

export interface Review {
  id: string;
  cardId: string;
  reviewedAt: number;
  quality: number; // Rating do FSRS (1..4). Reviews anteriores à migração para FSRS usam a escala antiga do SM-2 (0..5) — é só histórico, não é relido pelo app.
  intervalAfter: number;
}

export type KanaType = 'hiragana' | 'katakana';

export interface KanaProgress {
  char: string; // ex.: "あ" (chave primária)
  type: KanaType;
  romajiCorrect: number;
  romajiWrong: number;
  drawBest?: number; // melhor pontuação de caligrafia (0..100)
  lastPracticed?: number;
}

export interface Meta {
  key: string;
  value: unknown;
}

export class NihongoDB extends Dexie {
  cards!: Table<Card, string>;
  reviews!: Table<Review, string>;
  kanaProgress!: Table<KanaProgress, string>;
  meta!: Table<Meta, string>;

  constructor() {
    super('nihongo-study');
    this.version(1).stores({
      // Apenas as colunas indexadas precisam ser declaradas.
      cards: 'id, category, dueDate, updatedAt',
      reviews: 'id, cardId, reviewedAt',
      kanaProgress: 'char, type',
      meta: 'key',
    });
    // v2: troca do algoritmo de repetição espaçada de SM-2 para FSRS. Os
    // campos antigos (ef/interval/repetitions) não têm conversão exata pros
    // novos (stability/difficulty/state) — os cards existentes são
    // resetados para o estado "novo" do FSRS, perdendo o progresso de
    // agendamento acumulado mas mantendo o histórico em `reviews`.
    this.version(2)
      .stores({})
      .upgrade(async (tx) => {
        const now = Date.now();
        await tx
          .table('cards')
          .toCollection()
          .modify((card) => {
            delete card.ef;
            delete card.interval;
            delete card.repetitions;
            Object.assign(card, freshSrs(now));
          });
      });
  }
}

export const db = new NihongoDB();

export function newId(): string {
  return crypto.randomUUID();
}
