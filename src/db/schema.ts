import Dexie, { type Table } from 'dexie';

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
  // Estado SRS (SM-2)
  ef: number; // easiness factor
  interval: number; // intervalo atual em dias
  repetitions: number; // acertos consecutivos
  dueDate: number; // timestamp da próxima revisão
  lastReviewedAt?: number;
  createdAt: number;
  updatedAt: number; // usado na mesclagem (vence o mais recente)
}

export interface Review {
  id: string;
  cardId: string;
  reviewedAt: number;
  quality: number; // 0..5
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
  }
}

export const db = new NihongoDB();

export function newId(): string {
  return crypto.randomUUID();
}
