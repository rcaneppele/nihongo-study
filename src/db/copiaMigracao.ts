import Dexie, { type Table } from 'dexie';
import type { BackupFile } from './backup';
import { db } from './schema';

/**
 * Cópia de segurança automática antes de migrar o banco. Uma migração com
 * defeito que termina "com sucesso" deixa os dados errados sem deixar erro
 * nenhum — o Dexie só desfaz sozinho quando ela lança exceção. Por isso, ao
 * detectar que o banco vai subir de versão, os dados são copiados *antes* de
 * o `db` abrir, e podem ser restaurados em Configurações › Dados.
 *
 * Fica num banco separado, para a cópia não depender do schema que ela
 * protege. É do mesmo site, então não protege de o navegador limpar os dados
 * (para isso: `persistencia.ts`, backup e sincronização). Só existe uma cópia,
 * ela não entra no backup e vence em `DIAS_COPIA` dias: depois disso, restaurar
 * apagaria mais estudo do que recuperaria.
 */

export const DIAS_COPIA = 30;
const DIA_MS = 24 * 60 * 60 * 1000;
const ID_COPIA = 'ultima';
/** Só deste aparelho e sensível (token do Google): nunca é copiada. */
const TABELA_FORA_DA_COPIA = 'local';

export interface CopiaMigracao {
  id: string;
  criadaEm: number;
  /** Em `schemaVersion` da versão de origem: restaurar passa por `migrateBackup`. */
  backup: BackupFile;
}

class CopiaDB extends Dexie {
  copias!: Table<CopiaMigracao, string>;

  constructor() {
    super('nihongo-study-copia');
    this.version(1).stores({ copias: 'id' });
  }
}

const copiaDb = new CopiaDB();

export function copiaVencida(criadaEm: number, now: number): boolean {
  return now - criadaEm >= DIAS_COPIA * DIA_MS;
}

export function lerCopia(): Promise<CopiaMigracao | undefined> {
  return copiaDb.copias.get(ID_COPIA);
}

export function apagarCopia(): Promise<void> {
  return copiaDb.copias.delete(ID_COPIA);
}

/** Abre o banco como está (sem declarar versão, o Dexie não migra) e lê os dados, se ele for anterior a `versaoAtual`. */
async function lerBancoDesatualizado(nomeBanco: string, versaoAtual: number, now: number): Promise<BackupFile | null> {
  const banco = new Dexie(nomeBanco);
  try {
    await banco.open();
  } catch (err) {
    if ((err as Error).name === 'NoSuchDatabaseError') return null; // primeira abertura neste aparelho
    throw err;
  }
  try {
    if (banco.verno >= versaoAtual) return null;
    const tabelas = banco.tables.filter((t) => t.name !== TABELA_FORA_DA_COPIA);
    const linhas = await Promise.all(tabelas.map((t) => t.toArray()));
    if (linhas.every((l) => l.length === 0)) return null;
    const dados = Object.fromEntries(tabelas.map((t, i) => [t.name, linhas[i]]));
    return { app: 'nihongo-study', schemaVersion: banco.verno, exportedAt: now, ...dados } as BackupFile;
  } finally {
    banco.close();
  }
}

/**
 * Chamar antes de qualquer uso de `db`. Nunca lança: uma falha aqui (sem
 * espaço, por exemplo) não pode impedir o app de abrir.
 */
export async function guardarCopiaAntesDeMigrar(
  versaoAtual: number,
  { nomeBanco = db.name, now = Date.now() }: { nomeBanco?: string; now?: number } = {}
): Promise<void> {
  try {
    const existente = await lerCopia();
    if (existente && copiaVencida(existente.criadaEm, now)) await apagarCopia();
    const backup = await lerBancoDesatualizado(nomeBanco, versaoAtual, now);
    if (backup) await copiaDb.copias.put({ id: ID_COPIA, criadaEm: now, backup });
  } catch (err) {
    console.warn('Não foi possível guardar a cópia antes de atualizar os dados.', err);
  }
}
