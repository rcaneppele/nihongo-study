import { db } from '../../db/schema';

/** O pedaço de `navigator.storage` usado aqui; ausente em navegadores sem a API. */
export type Armazenamento = Pick<StorageManager, 'persist' | 'persisted'>;

/**
 * Pede ao navegador para não limpar os dados sozinho quando faltar espaço.
 * Só depois de haver o que proteger, porque o Firefox mostra um diálogo de
 * permissão e não faz sentido no primeiro acesso. Repete a cada abertura até
 * conseguir: Chrome e Safari decidem pelo uso do site, sem perguntar, então a
 * resposta pode mudar com o tempo. É best-effort: o backup continua sendo a
 * proteção garantida.
 */
export async function pedirArmazenamentoPersistente(armazenamento: Armazenamento | undefined = navigator.storage): Promise<boolean> {
  if (!armazenamento?.persist || !armazenamento.persisted) return false;
  if (await armazenamento.persisted()) return true;
  const temDados = (await db.activity.count()) > 0 || (await db.cards.count()) > 0;
  return temDados ? armazenamento.persist() : false;
}
