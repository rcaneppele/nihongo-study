import { db, newId, type DeletableTable } from './schema';

/**
 * Acesso a dados com efeito na sincronização entre aparelhos: id do
 * aparelho, preferências com data de alteração e exclusões com lápide.
 * Toda gravação em `db.meta` e toda exclusão individual devem passar por
 * aqui — senão a mudança não vence (ou não se propaga) na mesclagem
 * (ver src/db/merge.ts).
 */

const DEVICE_ID_KEY = 'deviceId';
let deviceIdCache: Promise<string> | undefined;

/** Id deste aparelho, criado no primeiro uso. Fica em `db.local`, fora do backup. */
export function getDeviceId(): Promise<string> {
  deviceIdCache ??= db.transaction('rw', db.local, async () => {
    const entry = await db.local.get(DEVICE_ID_KEY);
    if (typeof entry?.value === 'string') return entry.value;
    const id = newId();
    await db.local.put({ key: DEVICE_ID_KEY, value: id });
    return id;
  });
  return deviceIdCache;
}

const LAST_BACKUP_KEY = 'lastBackupAt';

/** Registra que um backup deste aparelho foi salvo ou compartilhado agora. */
export function marcarBackup() {
  return db.local.put({ key: LAST_BACKUP_KEY, value: Date.now() });
}

/** Quando foi o último backup deste aparelho (`undefined` = nunca). */
export async function ultimoBackup(): Promise<number | undefined> {
  const entry = await db.local.get(LAST_BACKUP_KEY);
  return typeof entry?.value === 'number' ? entry.value : undefined;
}

/** Grava uma preferência (`db.meta`) com a data de alteração. */
export function setMeta(key: string, value: unknown) {
  return db.meta.put({ key, value, updatedAt: Date.now() });
}

/** Apaga um registro deixando a lápide, pra exclusão chegar aos outros aparelhos. */
export async function apagar(table: DeletableTable, key: string): Promise<void> {
  await db.transaction('rw', db.table(table), db.deleted, async () => {
    await db.table(table).delete(key);
    await db.deleted.put({ table, key, deletedAt: Date.now() });
  });
}

/** Chave de `db.meta` com a "época" dos dados — ver `novaEpoca`. */
export const DATA_EPOCH_KEY = 'dataEpoch';

/**
 * Marca que os dados deste aparelho foram substituídos por inteiro
 * (importar no modo Substituir, apagar tudo). A sincronização usa isso pra
 * substituir em vez de mesclar nos outros aparelhos — senão a mesclagem
 * traria de volta tudo o que foi substituído.
 */
export function novaEpoca() {
  return setMeta(DATA_EPOCH_KEY, Date.now());
}
