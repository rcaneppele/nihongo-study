import type { Card } from './schema';
import type { BackupFile } from './backup';
import { freshSrs } from '../features/srs/fsrs';

/**
 * Migrações incrementais por versão — cada passo só roda se o backup ainda
 * não chegou lá, nunca todos de uma vez. Importante: aplicar sempre "se
 * schemaVersion < SCHEMA_VERSION, faça a migração de v1" (como era antes)
 * reprocessaria backups já em v2 (FSRS) pela migração de v1→v2 sempre que
 * SCHEMA_VERSION subisse de novo (ex.: agora para 3) — resetaria o
 * progresso de FSRS de todo mundo à toa. Por isso os passos são
 * condicionais na versão de origem, não só na versão atual.
 */
export function migrateBackup(data: BackupFile): BackupFile {
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
