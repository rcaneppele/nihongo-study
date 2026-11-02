import type { IndexableType, Table } from 'dexie';
import { db, type Card, type Tombstone } from './schema';
import type { BackupFile } from './backup';
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

/** Lápides com mais tempo que isso são descartadas — um aparelho sem sincronizar há mais tempo pode ressuscitar o que foi apagado. */
const LAPIDE_VALIDADE_MS = 180 * 24 * 60 * 60 * 1000;

/**
 * Mescla registro a registro com as regras de src/db/merge.ts, grava só o
 * que mudou e aplica as exclusões dos dois lados. Roda dentro da transação
 * de `importData` (em `backup.ts`).
 */
export async function mesclarNoBanco(backup: BackupFile, now: number = Date.now()): Promise<void> {

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
