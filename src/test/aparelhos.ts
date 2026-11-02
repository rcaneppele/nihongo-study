import { db } from '../db/schema';
import { parseBackup, type BackupFile } from '../db/backup';
import type { DestinoSync } from '../features/sync/destino';

/**
 * Simulação de vários aparelhos num processo só: cada aparelho é uma foto
 * completa do banco (inclusive `local`, que é só dele). `usar` troca o banco
 * pela foto do aparelho; `guardar` tira a foto de volta.
 */
export type FotoDoBanco = Record<string, unknown[]>;

export async function fotografarBanco(): Promise<FotoDoBanco> {
  const foto: FotoDoBanco = {};
  for (const t of db.tables) foto[t.name] = await t.toArray();
  return foto;
}

export async function restaurarBanco(foto: FotoDoBanco): Promise<void> {
  await db.transaction('rw', db.tables, async () => {
    for (const t of db.tables) {
      await t.clear();
      await t.bulkAdd(foto[t.name] ?? []);
    }
  });
}

export function bancoVazio(): FotoDoBanco {
  return Object.fromEntries(db.tables.map((t) => [t.name, []]));
}

/**
 * Google Drive em memória: guarda o arquivo como texto (como o real, que
 * passa por JSON) e numera as versões. `aoBaixar` permite simular outro
 * aparelho gravando no meio do ciclo.
 */
export class DriveEmMemoria implements DestinoSync {
  arquivo: string | null = null;
  numero = 0;
  chamadas = { versao: 0, baixar: 0, subir: 0, apagar: 0 };
  aoBaixar?: () => void;
  falha?: Error;

  private verificar() {
    if (this.falha) throw this.falha;
  }

  async versao(): Promise<string | null> {
    this.chamadas.versao++;
    this.verificar();
    return this.arquivo === null ? null : String(this.numero);
  }

  async baixar(): Promise<{ backup: BackupFile; versao: string } | null> {
    this.chamadas.baixar++;
    this.verificar();
    if (this.arquivo === null) return null;
    const resultado = { backup: parseBackup(this.arquivo), versao: String(this.numero) };
    this.aoBaixar?.();
    return resultado;
  }

  async subir(backup: BackupFile): Promise<string> {
    this.chamadas.subir++;
    this.verificar();
    this.gravarDireto(backup);
    return String(this.numero);
  }

  /** Grava sem passar pelo motor (outro aparelho, por fora). */
  gravarDireto(backup: BackupFile) {
    this.arquivo = JSON.stringify(backup);
    this.numero++;
  }

  async apagar(): Promise<void> {
    this.chamadas.apagar++;
    this.arquivo = null;
  }

  async conta(): Promise<string | undefined> {
    return 'pessoa@exemplo.com';
  }

  conteudo(): BackupFile | null {
    return this.arquivo === null ? null : parseBackup(this.arquivo);
  }
}

/** `sessionStorage` mínimo para os testes em Node. */
export class ArmazenamentoEmMemoria {
  private dados = new Map<string, string>();
  getItem(k: string) {
    return this.dados.get(k) ?? null;
  }
  setItem(k: string, v: string) {
    this.dados.set(k, String(v));
  }
  removeItem(k: string) {
    this.dados.delete(k);
  }
  clear() {
    this.dados.clear();
  }
}
