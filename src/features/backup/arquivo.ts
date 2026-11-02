import type { BackupFile } from '../../db/backup';

/**
 * O backup como arquivo do navegador: baixar e compartilhar (celular:
 * mandar pro Drive, WhatsApp, e-mail…). A leitura e a gravação dos dados em
 * si ficam em `src/db/backup.ts`.
 */

function arquivoDoBackup(backup: BackupFile, comoTexto = false): File {
  const date = new Date(backup.exportedAt).toISOString().slice(0, 10);
  const conteudo = JSON.stringify(backup, null, 2);
  return comoTexto
    ? new File([conteudo], `nihongo-study-${date}.txt`, { type: 'text/plain' })
    : new File([conteudo], `nihongo-study-${date}.json`, { type: 'application/json' });
}

export function downloadBackup(backup: BackupFile): void {
  const file = arquivoDoBackup(backup);
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
  for (const file of [arquivoDoBackup(backup), arquivoDoBackup(backup, true)]) {
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
