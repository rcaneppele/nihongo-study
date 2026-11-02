import { db, type KanjiProgress } from '../../db/schema';
import { applyFsrs, freshSrs, type Grade } from '../srs/fsrs';
import { registrarAtividade } from '../atividade/atividade';

/**
 * Serviço do progresso de kanji (`kanjiProgress`): aprender (entra no FSRS),
 * revisar/desfazer e a melhor nota de caligrafia. A linha só existe depois
 * que o kanji é aprendido.
 */

/** Aprender um kanji novo: cria a linha com estado FSRS novo — igual ao card novo de flash cards. */
export async function aprenderKanji(char: string, now: number = Date.now()): Promise<void> {
  await db.kanjiProgress.put({ char, ...freshSrs(now), createdAt: now, updatedAt: now });
  await registrarAtividade('novos');
}

/** Dá a nota do FSRS. Devolve o progresso de antes (pra desfazer), ou `undefined` se o kanji não foi aprendido. */
export async function registrarRevisaoKanji(
  char: string,
  nota: Grade,
  now: number = Date.now()
): Promise<KanjiProgress | undefined> {
  const antes = await db.kanjiProgress.get(char);
  if (!antes) return undefined;
  await db.kanjiProgress.update(char, { ...applyFsrs(antes, nota, now), updatedAt: now });
  await registrarAtividade('revisoes');
  return antes;
}

/** Volta ao progresso de antes da nota, com carimbo novo pra vencer a nota desfeita na mesclagem. */
export async function desfazerRevisaoKanji(antes: KanjiProgress, now: number = Date.now()): Promise<void> {
  await db.kanjiProgress.put({ ...antes, updatedAt: now });
  await registrarAtividade('revisoes', -1);
}

/**
 * Guarda a melhor nota de caligrafia. Sem mexer em `updatedAt`: ele é o
 * carimbo do estado FSRS, e a melhor nota já mescla pelo maior (ver
 * src/db/merge.ts). Conta como prática mesmo para kanji não aprendido.
 */
export async function registrarCaligrafiaKanji(char: string, nota: number): Promise<void> {
  await registrarAtividade('praticas');
  const p = await db.kanjiProgress.get(char);
  if (p) await db.kanjiProgress.update(char, { drawBest: Math.max(p.drawBest ?? 0, nota) });
}
