import { db, newId, type JournalEntry } from '../../db/schema';
import { apagar } from '../../db/local';
import { registrarAtividade } from '../atividade/atividade';

/**
 * Diário guiado: o texto que o usuário escreveu para uma proposta
 * (src/data/diario/prompts.ts) e os itens do checklist que marcou. Entra no
 * backup e na sincronização; apagar deixa lápide.
 */
export async function salvarEntrada(
  promptId: string,
  text: string,
  checked: string[],
  existente?: JournalEntry
): Promise<void> {
  const now = Date.now();
  if (existente) {
    await db.journal.put({ ...existente, text, checked, updatedAt: now });
    return;
  }
  await db.journal.add({ id: newId(), promptId, text, checked, createdAt: now, updatedAt: now });
  await registrarAtividade('praticas', 1);
}

export function apagarEntrada(id: string): Promise<void> {
  return apagar('journal', id);
}
