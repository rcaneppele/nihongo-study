import type { IndexableType, Table } from 'dexie';
import {
  db,
  type Card,
  type Review,
  type KanaProgress,
  type KanjiProgress,
  type Meta,
  type ReadingProgress,
  type Activity,
  type WordKnowledge,
  type Tombstone,
  type ExerciseResult,
  type LessonProgress,
  type Achievement,
  type JournalEntry,
} from './schema';
import { freshSrs } from '../features/srs/fsrs';
import {
  cardMantido,
  iguais,
  mesclarAtividade,
  mesclarCard,
  mesclarConquista,
  mesclarDiario,
  mesclarKana,
  mesclarKanji,
  mesclarLapide,
  mesclarLeitura,
  mesclarLicao,
  mesclarMeta,
  mesclarPalavra,
} from './merge';

/**
 * Backup / sincronização manual entre dispositivos.
 *
 * Sem backend: a "sincronização" é exportar um JSON num aparelho e importar
 * no outro. O mesmo arquivo serve de backup — importante porque navegadores
 * de celular (em especial iOS) podem limpar o IndexedDB sob pressão de
 * armazenamento.
 */

export const SCHEMA_VERSION = 7;

export interface BackupFile {
  app: 'nihongo-study';
  schemaVersion: number;
  exportedAt: number;
  cards: Card[];
  reviews: Review[];
  kanaProgress: KanaProgress[];
  kanjiProgress: KanjiProgress[];
  wordKnowledge: WordKnowledge[];
  readingProgress: ReadingProgress[];
  activity: Activity[];
  meta: Meta[];
  deleted: Tombstone[];
  exerciseResults: ExerciseResult[];
  lessonProgress: LessonProgress[];
  achievements: Achievement[];
  journal: JournalEntry[];
}

export async function exportData(): Promise<BackupFile> {
  const [
    cards,
    reviews,
    kanaProgress,
    kanjiProgress,
    wordKnowledge,
    readingProgress,
    activity,
    meta,
    deleted,
    exerciseResults,
    lessonProgress,
    achievements,
    journal,
  ] = await Promise.all([
    db.cards.toArray(),
    db.reviews.toArray(),
    db.kanaProgress.toArray(),
    db.kanjiProgress.toArray(),
    db.wordKnowledge.toArray(),
    db.readingProgress.toArray(),
    db.activity.toArray(),
    db.meta.toArray(),
    db.deleted.toArray(),
    db.exerciseResults.toArray(),
    db.lessonProgress.toArray(),
    db.achievements.toArray(),
    db.journal.toArray(),
  ]);
  return {
    app: 'nihongo-study',
    schemaVersion: SCHEMA_VERSION,
    exportedAt: Date.now(),
    cards,
    reviews,
    kanaProgress,
    kanjiProgress,
    wordKnowledge,
    readingProgress,
    activity,
    meta,
    deleted,
    exerciseResults,
    lessonProgress,
    achievements,
    journal,
  };
}

function backupFile(backup: BackupFile, comoTexto = false): File {
  const date = new Date(backup.exportedAt).toISOString().slice(0, 10);
  const conteudo = JSON.stringify(backup, null, 2);
  return comoTexto
    ? new File([conteudo], `nihongo-study-${date}.txt`, { type: 'text/plain' })
    : new File([conteudo], `nihongo-study-${date}.json`, { type: 'application/json' });
}

export function downloadBackup(backup: BackupFile): void {
  const file = backupFile(backup);
  const url = URL.createObjectURL(file);
  const a = document.createElement('a');
  a.href = url;
  a.download = file.name;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Arquivo que o compartilhamento do sistema aceita (celular: mandar pro
 * Drive, WhatsApp, e-mail…), ou `null` se não dá pra compartilhar arquivo
 * aqui. O Chrome só compartilha alguns tipos de arquivo e não está claro se
 * JSON é um deles — se não for, vai como .txt (mesmo conteúdo; o importar
 * aceita os dois).
 */
function shareableFile(backup: BackupFile): File | null {
  if (typeof navigator.canShare !== 'function') return null;
  for (const file of [backupFile(backup), backupFile(backup, true)]) {
    if (navigator.canShare({ files: [file] })) return file;
  }
  return null;
}

export function canShareBackup(): boolean {
  return shareableFile({ exportedAt: 0 } as BackupFile) !== null;
}

/** Abre o compartilhamento do sistema com o arquivo. `false` se a pessoa cancelou. */
export async function shareBackup(backup: BackupFile): Promise<boolean> {
  const file = shareableFile(backup);
  if (!file) throw new Error('Este navegador não compartilha arquivos.');
  try {
    await navigator.share({ files: [file], title: file.name });
    return true;
  } catch (err) {
    if ((err as Error).name === 'AbortError') return false;
    throw err;
  }
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
  if (result.schemaVersion < 4) result = migrateV3ToV4(result);
  if (result.schemaVersion < 5) result = migrateV4ToV5(result);
  if (result.schemaVersion < 6) result = migrateV5ToV6(result);
  if (result.schemaVersion < 7) result = migrateV6ToV7(result);
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

/** v3 → v4: tabelas `wordKnowledge` e `readingProgress` (leitura extensiva) — backups antigos não têm linhas. */
function migrateV3ToV4(data: BackupFile): BackupFile {
  return {
    ...data,
    schemaVersion: 4,
    wordKnowledge: data.wordKnowledge ?? [],
    readingProgress: data.readingProgress ?? [],
  };
}

/** v4 → v5: tabela `activity` (meta diária/sequência) — backups antigos não têm linhas. */
function migrateV4ToV5(data: BackupFile): BackupFile {
  return { ...data, schemaVersion: 5, activity: data.activity ?? [] };
}

/**
 * v5 → v6: lápides de exclusão (`deleted`). Os campos novos dos registros
 * (`porAparelho`, carimbos por grupo do card, `Meta.updatedAt`) são
 * opcionais — ausentes valem como antes (ver src/db/merge.ts).
 */
function migrateV5ToV6(data: BackupFile): BackupFile {
  return { ...data, schemaVersion: 6, deleted: data.deleted ?? [] };
}

/** v6 → v7: histórico de exercícios, progresso das lições, conquistas e diário — backups antigos não têm linhas. */
function migrateV6ToV7(data: BackupFile): BackupFile {
  return {
    ...data,
    schemaVersion: 7,
    exerciseResults: data.exerciseResults ?? [],
    lessonProgress: data.lessonProgress ?? [],
    achievements: data.achievements ?? [],
    journal: data.journal ?? [],
  };
}

/** Chave de cada registro, por tabela do backup. */
const CHAVES: { [T in Exclude<keyof BackupFile, 'app' | 'schemaVersion' | 'exportedAt'>]: (row: BackupFile[T][number]) => string } = {
  cards: (r) => r.id,
  reviews: (r) => r.id,
  kanaProgress: (r) => r.char,
  kanjiProgress: (r) => r.char,
  wordKnowledge: (r) => r.key,
  readingProgress: (r) => r.textId,
  activity: (r) => r.day,
  meta: (r) => r.key,
  deleted: (r) => `${r.table}:${r.key}`,
  exerciseResults: (r) => r.id,
  lessonProgress: (r) => r.lessonId,
  achievements: (r) => r.id,
  journal: (r) => r.id,
};

/** Os dois backups têm os mesmos dados (sem depender da ordem dos registros nem da data de exportação). */
export function mesmoConteudo(a: BackupFile, b: BackupFile): boolean {
  return (Object.keys(CHAVES) as (keyof typeof CHAVES)[]).every((tabela) => {
    const chave = CHAVES[tabela] as (row: unknown) => string;
    const linhasA = a[tabela] as unknown[];
    const linhasB = b[tabela] as unknown[];
    if (linhasA.length !== linhasB.length) return false;
    const porChave = new Map(linhasA.map((r) => [chave(r), r]));
    return linhasB.every((r) => iguais(porChave.get(chave(r)), r));
  });
}

export type ImportMode = 'replace' | 'merge';

/** Lápides com mais tempo que isso são descartadas — um aparelho sem sincronizar há mais tempo pode ressuscitar o que foi apagado. */
const LAPIDE_VALIDADE_MS = 180 * 24 * 60 * 60 * 1000;

export async function importData(backup: BackupFile, mode: ImportMode = 'replace'): Promise<void> {
  const tables = [
    db.cards,
    db.reviews,
    db.kanaProgress,
    db.kanjiProgress,
    db.wordKnowledge,
    db.readingProgress,
    db.activity,
    db.meta,
    db.deleted,
    db.exerciseResults,
    db.lessonProgress,
    db.achievements,
    db.journal,
  ];
  await db.transaction('rw', tables, async () => {
    if (mode === 'replace') {
      await Promise.all(tables.map((t) => t.clear()));
      await db.cards.bulkAdd(backup.cards);
      await db.reviews.bulkAdd(backup.reviews);
      await db.kanaProgress.bulkAdd(backup.kanaProgress);
      await db.kanjiProgress.bulkAdd(backup.kanjiProgress);
      await db.wordKnowledge.bulkAdd(backup.wordKnowledge);
      await db.readingProgress.bulkAdd(backup.readingProgress);
      await db.activity.bulkAdd(backup.activity);
      await db.meta.bulkAdd(backup.meta);
      await db.deleted.bulkAdd(backup.deleted);
      await db.exerciseResults.bulkAdd(backup.exerciseResults);
      await db.lessonProgress.bulkAdd(backup.lessonProgress);
      await db.achievements.bulkAdd(backup.achievements);
      await db.journal.bulkAdd(backup.journal);
      return;
    }
    await mergeAll(backup);
  });
}

/**
 * Mescla registro a registro com as regras de src/db/merge.ts, grava só o
 * que mudou e aplica as exclusões dos dois lados. Roda dentro da transação
 * de `importData`.
 */
async function mergeAll(backup: BackupFile): Promise<void> {
  const now = Date.now();

  // 1. Lápides primeiro: decidem o que entra e o que sai nas outras tabelas.
  await mergeTable(db.deleted, backup.deleted, (t) => [t.table, t.key] as [string, string], mesclarLapide);
  const lapides = new Map<string, Tombstone>();
  for (const t of await db.deleted.toArray()) lapides.set(`${t.table}:${t.key}`, t);
  const apagado = (table: Tombstone['table'], key: string, alteradoEm: number) => {
    const t = lapides.get(`${table}:${key}`);
    return t !== undefined && t.deletedAt >= alteradoEm;
  };

  // 2. Registros que podem ser apagados: o mais recente entre a alteração e a exclusão vence.
  await mergeTable(
    db.cards,
    backup.cards.filter((c) => !apagado('cards', c.id, c.updatedAt)),
    (c) => c.id,
    mesclarCard
  );
  await mergeTable(
    db.wordKnowledge,
    backup.wordKnowledge.filter((w) => !apagado('wordKnowledge', w.key, w.updatedAt)),
    (w) => w.key,
    mesclarPalavra
  );
  await mergeTable(
    db.journal,
    backup.journal.filter((j) => !apagado('journal', j.id, j.updatedAt)),
    (j) => j.id,
    mesclarDiario
  );
  await applyTombstones(db.cards, 'cards', lapides, (c) => c.updatedAt);
  await applyTombstones(db.wordKnowledge, 'wordKnowledge', lapides, (w) => w.updatedAt);
  await applyTombstones(db.journal, 'journal', lapides, (j) => j.updatedAt);

  // 3. Revisões: histórico imutável — só entra, ou sai por lápide (desfazer).
  await db.reviews.bulkPut(backup.reviews.filter((r) => !apagado('reviews', r.id, r.reviewedAt)));
  await applyTombstones(db.reviews, 'reviews', lapides, (r) => r.reviewedAt);
  // Resultados de exercícios: histórico imutável, sem exclusão — só entra.
  await db.exerciseResults.bulkPut(backup.exerciseResults);

  // 4. Tabelas sem exclusão individual.
  await mergeTable(db.kanaProgress, backup.kanaProgress, (k) => k.char, mesclarKana);
  await mergeTable(db.kanjiProgress, backup.kanjiProgress, (k) => k.char, mesclarKanji);
  await mergeTable(db.readingProgress, backup.readingProgress, (r) => r.textId, mesclarLeitura);
  await mergeTable(db.activity, backup.activity, (a) => a.day, mesclarAtividade);
  await mergeTable(db.meta, backup.meta, (m) => m.key, mesclarMeta);
  await mergeTable(db.lessonProgress, backup.lessonProgress, (l) => l.lessonId, mesclarLicao);
  await mergeTable(db.achievements, backup.achievements, (a) => a.id, mesclarConquista);

  // 5. Duplicatas e revisões de cards juntados (dos dois lados).
  await dedupeCards(now);
  await remapReviews();

  // 6. Limpeza das lápides antigas.
  await db.deleted.filter((t) => now - t.deletedAt > LAPIDE_VALIDADE_MS).delete();
}

/** Mescla `incoming` na tabela: cria o que não existe, mescla o que existe, grava só o que mudou. */
async function mergeTable<T, K extends IndexableType>(
  table: Table<T, K>,
  incoming: T[],
  keyOf: (row: T) => K,
  merge: (local: T, outro: T) => T
): Promise<void> {
  if (incoming.length === 0) return;
  const locais = await table.bulkGet(incoming.map(keyOf));
  const gravar: T[] = [];
  incoming.forEach((row, i) => {
    const local = locais[i];
    const resultado = local ? merge(local, row) : row;
    if (!local || !iguais(local, resultado)) gravar.push(resultado);
  });
  if (gravar.length > 0) await table.bulkPut(gravar);
}

/** Apaga os registros locais com lápide mais recente que a última alteração deles. */
async function applyTombstones<T>(
  table: Table<T, string>,
  nome: Tombstone['table'],
  lapides: Map<string, Tombstone>,
  alteradoEm: (row: T) => number
): Promise<void> {
  const keys = [...lapides.values()].filter((t) => t.table === nome).map((t) => t.key);
  if (keys.length === 0) return;
  const rows = await table.bulkGet(keys);
  const apagar = keys.filter((key, i) => {
    const row = rows[i];
    return row !== undefined && lapides.get(`${nome}:${key}`)!.deletedAt >= alteradoEm(row);
  });
  if (apagar.length > 0) await table.bulkDelete(apagar);
}

/**
 * Junta cards com a mesma frente (mesmo critério de duplicata do resto do
 * app — ver `findCardByFront`): a mesma palavra aprendida em dois aparelhos
 * antes de sincronizar vira um card só, com o estado mais recente de cada
 * grupo de campos. O outro fica com lápide apontando para o mantido.
 */
async function dedupeCards(now: number): Promise<void> {
  const porFrente = new Map<string, Card[]>();
  for (const c of await db.cards.toArray()) {
    const grupo = porFrente.get(c.front);
    if (grupo) grupo.push(c);
    else porFrente.set(c.front, [c]);
  }
  for (const grupo of porFrente.values()) {
    if (grupo.length < 2) continue;
    const mantido = cardMantido(grupo);
    let resultado = mantido;
    for (const c of grupo) {
      if (c.id === mantido.id) continue;
      resultado = mesclarCard(resultado, { ...c, id: mantido.id, createdAt: mantido.createdAt });
      await db.cards.delete(c.id);
      await db.deleted.put({ table: 'cards', key: c.id, deletedAt: now, mergedInto: mantido.id });
    }
    await db.cards.put(resultado);
  }
}

/** Revisões de cards juntados como duplicata (aqui ou no outro aparelho) passam para o card mantido. */
async function remapReviews(): Promise<void> {
  const destino = new Map<string, string>();
  for (const t of await db.deleted.toArray()) {
    if (t.table === 'cards' && t.mergedInto) destino.set(t.key, t.mergedInto);
  }
  if (destino.size === 0) return;
  const final = (id: string) => {
    // Segue a cadeia (A → B → C), com limite contra ciclo.
    for (let i = 0; i < 10 && destino.has(id); i++) id = destino.get(id)!;
    return id;
  };
  await db.reviews
    .where('cardId')
    .anyOf([...destino.keys()])
    .modify((r) => {
      r.cardId = final(r.cardId);
    });
}
