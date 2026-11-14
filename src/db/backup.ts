import type { Table } from 'dexie';
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
import { iguais } from './merge';
import { migrateBackup } from './migracoes';
import { mesclarNoBanco } from './mesclarNoBanco';
import { novaEpoca } from './local';
import { apagarCopia, lerCopia } from './copiaMigracao';

/**
 * Backup / sincronização manual entre dispositivos.
 *
 * Sem backend: a "sincronização" é exportar um JSON num aparelho e importar
 * no outro. O mesmo arquivo serve de backup — importante porque navegadores
 * de celular (em especial iOS) podem limpar o IndexedDB sob pressão de
 * armazenamento. Migrações por versão em `migracoes.ts`; a mesclagem no
 * banco em `mesclarNoBanco.ts` (regras por tabela em `merge.ts`); baixar e
 * compartilhar o arquivo em `src/features/backup/arquivo.ts`.
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

export type TabelaSincronizada = Exclude<keyof BackupFile, 'app' | 'schemaVersion' | 'exportedAt'>;

/**
 * As tabelas que entram no backup e na sincronização, com a chave de cada
 * registro — a fonte única da lista: exportar, importar, comparar e apagar
 * tudo percorrem esta tabela. Tabela nova no schema entra aqui (o tipo
 * obriga) e na mesclagem (`mesclarNoBanco.ts`). `local` fica de fora de
 * propósito: é só deste aparelho.
 */
const CHAVE_DO_REGISTRO: { [T in TabelaSincronizada]: (row: BackupFile[T][number]) => string } = {
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

export const TABELAS_SINCRONIZADAS = Object.keys(CHAVE_DO_REGISTRO) as TabelaSincronizada[];

function tabelaDexie(nome: TabelaSincronizada): Table<unknown, unknown> {
  return db.table(nome);
}

export async function exportData(now: number = Date.now()): Promise<BackupFile> {
  const linhas = await Promise.all(TABELAS_SINCRONIZADAS.map((t) => tabelaDexie(t).toArray()));
  const dados = Object.fromEntries(TABELAS_SINCRONIZADAS.map((t, i) => [t, linhas[i]]));
  return { app: 'nihongo-study', schemaVersion: SCHEMA_VERSION, exportedAt: now, ...dados } as BackupFile;
}

const ARQUIVO_DANIFICADO = 'O arquivo de backup está incompleto ou danificado';

/**
 * Lê o texto de um backup (arquivo escolhido pelo usuário ou baixado do
 * Drive) e devolve já migrado para a versão atual. Nada vindo de fora entra
 * no banco sem passar por aqui:
 *
 * - backup de uma versão **mais nova** do app é recusado — este aparelho
 *   não conhece as tabelas novas e, na sincronização, regravaria o arquivo
 *   do Drive sem elas;
 * - arquivo com formato errado é recusado antes de qualquer gravação, em
 *   vez de deixar registro quebrado no banco (que só apareceria depois,
 *   como tela em branco).
 */
export function parseBackup(text: string): BackupFile {
  const data: unknown = JSON.parse(text);
  if (!ehObjeto(data) || data.app !== 'nihongo-study') {
    throw new Error('Não parece um backup do Nihongo Study.');
  }
  if (typeof data.schemaVersion !== 'number' || !Number.isInteger(data.schemaVersion) || data.schemaVersion < 1) {
    throw new Error(`${ARQUIVO_DANIFICADO} (versão).`);
  }
  if (data.schemaVersion > SCHEMA_VERSION) {
    throw new Error(
      'Este arquivo foi criado por uma versão mais nova do app. Atualize o app neste aparelho (feche e abra de novo) e tente outra vez.'
    );
  }
  // As tabelas que a versão de origem já tinha precisam ser listas antes de migrar (a migração percorre os cards).
  for (const tabela of TABELAS_SINCRONIZADAS) {
    if (data[tabela] !== undefined && !Array.isArray(data[tabela])) throw new Error(`${ARQUIVO_DANIFICADO} (${tabela}).`);
  }
  if (!Array.isArray(data.cards)) throw new Error(`${ARQUIVO_DANIFICADO} (cards).`);
  return validarBackup(migrateBackup(data as unknown as BackupFile));
}

function ehObjeto(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

/** Card com o mínimo que as telas e a fila de revisão usam sem conferir. */
function cardValido(card: Record<string, unknown>): boolean {
  return (
    typeof card.front === 'string' &&
    typeof card.back === 'string' &&
    Array.isArray(card.tags) &&
    card.tags.every((t) => typeof t === 'string') &&
    typeof card.dueDate === 'number' &&
    typeof card.updatedAt === 'number'
  );
}

/** Confere o formato depois de migrar: toda tabela é lista de objetos com a chave do registro. */
function validarBackup(backup: BackupFile): BackupFile {
  for (const tabela of TABELAS_SINCRONIZADAS) {
    const linhas: unknown = backup[tabela];
    const chave = CHAVE_DO_REGISTRO[tabela] as unknown as (row: Record<string, unknown>) => unknown;
    const ok =
      Array.isArray(linhas) &&
      linhas.every((linha) => {
        if (!ehObjeto(linha)) return false;
        const k = chave(linha);
        // A chave das lápides é composta de dois campos: os dois precisam existir.
        if (typeof k !== 'string' || k.length === 0 || k.includes('undefined')) return false;
        return tabela !== 'cards' || cardValido(linha);
      });
    if (!ok) throw new Error(`${ARQUIVO_DANIFICADO} (${tabela}).`);
  }
  return backup;
}

/** Os dois backups têm os mesmos dados (sem depender da ordem dos registros nem da data de exportação). */
export function mesmoConteudo(a: BackupFile, b: BackupFile): boolean {
  return TABELAS_SINCRONIZADAS.every((tabela) => {
    const chave = CHAVE_DO_REGISTRO[tabela] as (row: unknown) => string;
    const linhasA = a[tabela] as unknown[];
    const linhasB = b[tabela] as unknown[];
    if (linhasA.length !== linhasB.length) return false;
    const porChave = new Map(linhasA.map((r) => [chave(r), r]));
    return linhasB.every((r) => iguais(porChave.get(chave(r)), r));
  });
}

export type ImportMode = 'replace' | 'merge';

/**
 * Grava o backup no banco: `replace` apaga tudo e põe o backup no lugar;
 * `merge` mescla registro a registro (ver `mesclarNoBanco.ts`). Não mexe na
 * época dos dados — quem substitui por vontade do usuário usa
 * `importarBackup`.
 */
export async function importData(backup: BackupFile, mode: ImportMode = 'replace'): Promise<void> {
  const tabelas = TABELAS_SINCRONIZADAS.map(tabelaDexie);
  await db.transaction('rw', tabelas, async () => {
    if (mode === 'merge') return mesclarNoBanco(backup);
    await Promise.all(tabelas.map((t) => t.clear()));
    for (const nome of TABELAS_SINCRONIZADAS) await tabelaDexie(nome).bulkAdd(backup[nome]);
  });
}

/**
 * Importar pedido pelo usuário (Config › Dados). No modo Substituir marca uma
 * época nova, pra sincronização substituir os outros aparelhos em vez de
 * mesclar de volta o que foi substituído.
 */
export async function importarBackup(backup: BackupFile, mode: ImportMode): Promise<void> {
  await importData(backup, mode);
  if (mode === 'replace') await novaEpoca();
}

/**
 * Volta os dados para a cópia guardada antes da última migração. Substitui
 * com época nova, como qualquer Substituir: dados errados que já tenham
 * chegado ao Drive não voltam na mesclagem.
 */
export async function restaurarCopiaDeMigracao(): Promise<void> {
  const copia = await lerCopia();
  if (!copia) throw new Error('A cópia de segurança não está mais disponível.');
  await importarBackup(migrateBackup(copia.backup), 'replace');
  await apagarCopia();
}

/** "Apagar todos os dados": esvazia as tabelas sincronizadas e marca época nova (ver `novaEpoca`). A cópia de segurança sai junto. */
export async function apagarTudo(): Promise<void> {
  const tabelas = TABELAS_SINCRONIZADAS.map(tabelaDexie);
  await db.transaction('rw', tabelas, () => Promise.all(tabelas.map((t) => t.clear())));
  await novaEpoca();
  await apagarCopia();
}
