import type { BackupFile } from '../../db/backup';

/**
 * Onde o arquivo de sincronização fica guardado. O Google Drive é a
 * primeira implementação (`googleDrive.ts`); outro destino (Dropbox,
 * OneDrive…) só precisa implementar isto.
 */
export interface DestinoSync {
  /** Versão atual do arquivo remoto, ou `null` se ele não existe. */
  versao(): Promise<string | null>;
  /** Baixa o arquivo remoto (`null` se não existe). */
  baixar(): Promise<{ backup: BackupFile; versao: string } | null>;
  /** Grava o arquivo remoto (cria se não existe). Devolve a nova versão. */
  subir(backup: BackupFile): Promise<string>;
  /** Apaga o arquivo remoto. */
  apagar(): Promise<void>;
  /** Conta conectada (pra mostrar na tela). */
  conta(): Promise<string | undefined>;
}

/** O acesso venceu ou foi revogado — precisa entrar de novo. */
export class ErroAutorizacao extends Error {
  constructor() {
    super('É preciso entrar de novo no Google.');
  }
}
