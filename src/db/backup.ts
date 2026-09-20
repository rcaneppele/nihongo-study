import { db, type Card, type Review, type KanaProgress, type KanjiProgress, type Meta } from './schema';
import { freshSrs } from '../features/srs/fsrs';

/**
 * Backup / sincronização manual entre dispositivos.
 *
 * Sem backend: a "sincronização" é exportar um JSON num aparelho e importar
 * no outro. O mesmo arquivo serve de backup — importante porque navegadores
 * de celular (em especial iOS) podem limpar o IndexedDB sob pressão de
 * armazenamento.
 */

export const SCHEMA_VERSION = 3;

export interface BackupFile {
  app: 'nihongo-study';
  schemaVersion: number;
  exportedAt: number;
  cards: Card[];
  reviews: Review[];
  kanaProgress: KanaProgress[];
  kanjiProgress: KanjiProgress[];
  meta: Meta[];
}

export async function exportData(): Promise<BackupFile> {
  const [cards, reviews, kanaProgress, kanjiProgress, meta] = await Promise.all([
    db.cards.toArray(),
    db.reviews.toArray(),
    db.kanaProgress.toArray(),
    db.kanjiProgress.toArray(),
    db.meta.toArray(),
  ]);
  return {
    app: 'nihongo-study',
    schemaVersion: SCHEMA_VERSION,
    exportedAt: Date.now(),
    cards,
    reviews,
    kanaProgress,
    kanjiProgress,
    meta,
  };
}

export function downloadBackup(backup: BackupFile): void {
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const date = new Date(backup.exportedAt).toISOString().slice(0, 10);
  const a = document.createElement('a');
  a.href = url;
  a.download = `nihongo-study-${date}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function parseBackup(text: string): BackupFile {
  const data = JSON.parse(text);
  if (data?.app !== 'nihongo-study') {
    throw new Error('Não parece um backup do Nihongo Study.');
  }
  return migrateBackup(data as BackupFile);
}

/**
 * Migrações incrementais por versão — cada passo só roda se o backup ainda
 * não chegou lá, nunca todos de uma vez. Importante: aplicar sempre "se
 * schemaVersion < SCHEMA_VERSION, faça a migração de v1" (como era antes)
 * reprocessaria backups já em v2 (FSRS) pela migração de v1→v2 sempre que
 * SCHEMA_VERSION subisse de novo (ex.: agora para 3) — resetaria o
 * progresso de FSRS de todo mundo à toa. Por isso os passos são
 * condicionais na versão de origem, não só na versão atual.
 */
function migrateBackup(data: BackupFile): BackupFile {
  let result = data;
  if (result.schemaVersion < 2) result = migrateV1ToV2(result);
  if (result.schemaVersion < 3) result = migrateV2ToV3(result);
  return result;
}

/**
 * v1 → v2: troca do algoritmo de repetição espaçada de SM-2 para FSRS. Os
 * campos antigos (ef/interval/repetitions) não têm conversão exata pros
 * novos (stability/difficulty/state) — os cards existentes são resetados
 * para o estado "novo" do FSRS, perdendo o progresso de agendamento
 * acumulado mas mantendo o histórico em `reviews`. Mesma migração que já
 * roda no upgrade do Dexie (ver src/db/schema.ts).
 */
function migrateV1ToV2(data: BackupFile): BackupFile {
  const now = Date.now();
  return {
    ...data,
    schemaVersion: 2,
    cards: data.cards.map((card) => {
      const migrated: Card & { ef?: number; interval?: number; repetitions?: number } = {
        ...card,
        ...freshSrs(now),
      };
      delete migrated.ef;
      delete migrated.interval;
      delete migrated.repetitions;
      return migrated;
    }),
  };
}

/** v2 → v3: nova tabela `kanjiProgress` (módulo de Kanji) — backups antigos simplesmente não têm nenhuma linha ainda. */
function migrateV2ToV3(data: BackupFile): BackupFile {
  return {
    ...data,
    schemaVersion: 3,
    kanjiProgress: data.kanjiProgress ?? [],
  };
}

export type ImportMode = 'replace' | 'merge';

export async function importData(backup: BackupFile, mode: ImportMode = 'replace'): Promise<void> {
  await db.transaction('rw', db.cards, db.reviews, db.kanaProgress, db.kanjiProgress, db.meta, async () => {
    if (mode === 'replace') {
      await Promise.all([
        db.cards.clear(),
        db.reviews.clear(),
        db.kanaProgress.clear(),
        db.kanjiProgress.clear(),
        db.meta.clear(),
      ]);
      await db.cards.bulkAdd(backup.cards);
      await db.reviews.bulkAdd(backup.reviews);
      await db.kanaProgress.bulkAdd(backup.kanaProgress);
      await db.kanjiProgress.bulkAdd(backup.kanjiProgress);
      await db.meta.bulkAdd(backup.meta);
      return;
    }

    // merge: vence o registro mais recente; reviews são idempotentes pelo id.
    for (const card of backup.cards) {
      const existing = await db.cards.get(card.id);
      if (!existing || card.updatedAt >= existing.updatedAt) await db.cards.put(card);
    }
    await db.reviews.bulkPut(backup.reviews);
    for (const k of backup.kanaProgress) {
      const existing = await db.kanaProgress.get(k.char);
      if (!existing || (k.lastPracticed ?? 0) >= (existing.lastPracticed ?? 0)) {
        await db.kanaProgress.put(k);
      }
    }
    for (const k of backup.kanjiProgress) {
      const existing = await db.kanjiProgress.get(k.char);
      if (!existing || k.updatedAt >= existing.updatedAt) await db.kanjiProgress.put(k);
    }
    await db.meta.bulkPut(backup.meta);
  });
}
