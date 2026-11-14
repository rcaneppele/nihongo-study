import { db, type KanjiProgress } from '../../db/schema';
import { applyFsrs, freshSrs, type Grade } from '../srs/fsrs';
import { getDeviceId } from '../../db/local';
import { registrarAtividade } from '../atividade/atividade';

/**
 * Serviço do progresso de kanji (`kanjiProgress`): aprender (entra no FSRS),
 * revisar/desfazer e a melhor nota de caligrafia. A linha só existe depois
 * que o kanji é aprendido.
 */

/**
 * Aprender um kanji novo: cria a linha com estado FSRS novo — igual ao card
 * novo de flash cards. Se a linha já existe (o kanji chegou de outro
 * aparelho pela sincronização no meio da sessão), não faz nada: gravar por
 * cima zeraria o progresso.
 */
export async function aprenderKanji(char: string, now: number = Date.now()): Promise<void> {
  await getDeviceId();
  await db.transaction('rw', db.kanjiProgress, db.activity, async () => {
    if (await db.kanjiProgress.get(char)) return;
    await db.kanjiProgress.add({ char, ...freshSrs(now), createdAt: now, updatedAt: now });
    await registrarAtividade('novos');
  });
}

/** Dá a nota do FSRS. Devolve o progresso de antes (pra desfazer), ou `undefined` se o kanji não foi aprendido. */
export async function registrarRevisaoKanji(
  char: string,
  nota: Grade,
  now: number = Date.now()
): Promise<KanjiProgress | undefined> {
  await getDeviceId(); // mora em `db.local`, fora da transação abaixo
  // Progresso e atividade do dia numa transação só: ou a nota conta por inteiro, ou não conta.
  return db.transaction('rw', db.kanjiProgress, db.activity, async () => {
    const antes = await db.kanjiProgress.get(char);
    if (!antes) return undefined;
    await db.kanjiProgress.update(char, { ...applyFsrs(antes, nota, now), updatedAt: now });
    await registrarAtividade('revisoes');
    return antes;
  });
}

/** Volta ao progresso de antes da nota, com carimbo novo pra vencer a nota desfeita na mesclagem. */
export async function desfazerRevisaoKanji(antes: KanjiProgress, now: number = Date.now()): Promise<void> {
  await getDeviceId();
  await db.transaction('rw', db.kanjiProgress, db.activity, async () => {
    await db.kanjiProgress.put({ ...antes, updatedAt: now });
    await registrarAtividade('revisoes', -1);
  });
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
