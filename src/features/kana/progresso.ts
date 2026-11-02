import { db, type KanaContador, type KanaProgress } from '../../db/schema';
import { incrementar } from '../../db/contadores';
import { getDeviceId } from '../../db/local';
import { KANA_CONTADORES } from '../../db/merge';
import { getKana, type KanaEntry } from '../../data/kana';
import { registrarAtividade } from '../atividade/atividade';
import { completarFracos, kanaFracos, type Escrita } from './treino';
import type { ModoKana } from './desempenho';

/**
 * Serviço do progresso de kana (`kanaProgress`): cada resposta do treino
 * soma acertos/erros (contados por aparelho, ver src/db/contadores.ts) e o
 * desenho guarda a melhor nota de caligrafia. Toda resposta conta como
 * prática na atividade do dia.
 */

const CONTADOR: Record<Exclude<ModoKana, 'desenho'>, { certo: KanaContador; errado: KanaContador }> = {
  romaji: { certo: 'romajiCorrect', errado: 'romajiWrong' },
  escolha: { certo: 'choiceCorrect', errado: 'choiceWrong' },
};

async function gravar(entry: KanaEntry, delta: Partial<Record<KanaContador, number>>, notaDesenho?: number, now = Date.now()) {
  const deviceId = await getDeviceId();
  await db.transaction('rw', db.kanaProgress, async () => {
    const p = await db.kanaProgress.get(entry.char);
    await db.kanaProgress.put({
      char: entry.char,
      type: entry.type,
      ...incrementar(p, delta, KANA_CONTADORES, deviceId, now),
      drawBest: notaDesenho === undefined ? p?.drawBest : Math.max(p?.drawBest ?? 0, notaDesenho),
      lastPracticed: now,
    });
  });
}

/** Resposta no modo romaji ou múltipla escolha. */
export async function registrarRespostaKana(
  entry: KanaEntry,
  modo: Exclude<ModoKana, 'desenho'>,
  correto: boolean,
  now: number = Date.now()
): Promise<void> {
  await registrarAtividade('praticas');
  const { certo, errado } = CONTADOR[modo];
  await gravar(entry, { [correto ? certo : errado]: 1 }, undefined, now);
}

/** Desenho avaliado (0–100): só a melhor nota fica. */
export async function registrarDesenhoKana(entry: KanaEntry, nota: number, now: number = Date.now()): Promise<void> {
  await registrarAtividade('praticas');
  await gravar(entry, {}, nota, now);
}

/** Progresso de cada kana da lista, na mesma ordem (`undefined` = nunca praticado). */
export function progressoDe(entries: KanaEntry[]): Promise<Array<KanaProgress | undefined>> {
  return db.kanaProgress.bulkGet(entries.map((e) => e.char));
}

export async function getWeakKana(escrita: Escrita, modo: ModoKana): Promise<KanaEntry[]> {
  const entries = getKana(escrita);
  return kanaFracos(entries, await progressoDe(entries), modo);
}

/** Sessão de "praticar fracos": os fracos, completados até um mínimo de variedade. */
export async function sessaoDeFracos(weak: KanaEntry[], escrita: Escrita, modo: ModoKana): Promise<KanaEntry[]> {
  const entries = getKana(escrita);
  return completarFracos(weak, entries, await progressoDe(entries), modo);
}
