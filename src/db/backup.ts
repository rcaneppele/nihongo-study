import { db, type Card, type Review, type KanaProgress, type Meta } from './schema';

/**
 * Backup / sincronização manual entre dispositivos.
 *
 * Sem backend: a "sincronização" é exportar um JSON num aparelho e importar
 * no outro. O mesmo arquivo serve de backup — importante porque navegadores
 * de celular (em especial iOS) podem limpar o IndexedDB sob pressão de
 * armazenamento.
 */

export const SCHEMA_VERSION = 1;

export interface BackupFile {
  app: 'nihongo-study';
  schemaVersion: number;
  exportedAt: number;
  cards: Card[];
  reviews: Review[];
  kanaProgress: KanaProgress[];
  meta: Meta[];
}

export async function exportData(): Promise<BackupFile> {
  const [cards, reviews, kanaProgress, meta] = await Promise.all([
    db.cards.toArray(),
    db.reviews.toArray(),
    db.kanaProgress.toArray(),
    db.meta.toArray(),
  ]);
  return {
    app: 'nihongo-study',
    schemaVersion: SCHEMA_VERSION,
    exportedAt: Date.now(),
    cards,
    reviews,
    kanaProgress,
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
  // TODO: migrar dados se data.schemaVersion < SCHEMA_VERSION
  return data as BackupFile;
}

export type ImportMode = 'replace' | 'merge';

export async function importData(backup: BackupFile, mode: ImportMode = 'replace'): Promise<void> {
  await db.transaction('rw', db.cards, db.reviews, db.kanaProgress, db.meta, async () => {
    if (mode === 'replace') {
      await Promise.all([db.cards.clear(), db.reviews.clear(), db.kanaProgress.clear(), db.meta.clear()]);
      await db.cards.bulkAdd(backup.cards);
      await db.reviews.bulkAdd(backup.reviews);
      await db.kanaProgress.bulkAdd(backup.kanaProgress);
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
    await db.meta.bulkPut(backup.meta);
  });
}
