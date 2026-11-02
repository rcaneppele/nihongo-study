import { db } from '../db/schema';

/** Esvazia todas as tabelas (inclusive `local`) — chame no `beforeEach` dos testes de integração. */
export async function limparBanco(): Promise<void> {
  await db.transaction('rw', db.tables, () => Promise.all(db.tables.map((t) => t.clear())));
}
