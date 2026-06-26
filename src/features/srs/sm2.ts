/**
 * SM-2 (SuperMemo 2) — algoritmo de repetição espaçada.
 *
 * Recebe o estado atual do card e a nota de qualidade da revisão (0..5),
 * devolve o novo estado. Está isolado aqui de propósito: dá pra trocar por
 * FSRS ou outro algoritmo no futuro sem mexer no resto do app.
 *
 * Mapeamento sugerido dos botões da UI para a nota `quality`:
 *   De novo = 0 | Difícil = 3 | Bom = 4 | Fácil = 5
 */

export interface SrsState {
  ef: number;
  interval: number;
  repetitions: number;
  dueDate: number;
}

const DAY_MS = 24 * 60 * 60 * 1000;
const MIN_EF = 1.3;
const START_EF = 2.5;

/** Estado inicial de um card novo (vence agora, entra na primeira sessão). */
export function freshSrs(now: number = Date.now()): SrsState {
  return { ef: START_EF, interval: 0, repetitions: 0, dueDate: now };
}

export function applySm2(
  state: Pick<SrsState, 'ef' | 'interval' | 'repetitions'>,
  quality: number,
  now: number = Date.now()
): SrsState {
  const q = Math.max(0, Math.min(5, Math.round(quality)));
  let { ef, interval, repetitions } = state;

  if (q >= 3) {
    if (repetitions === 0) interval = 1;
    else if (repetitions === 1) interval = 6;
    else interval = Math.round(interval * ef);
    repetitions += 1;
  } else {
    repetitions = 0;
    interval = 1;
  }

  ef = ef + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  if (ef < MIN_EF) ef = MIN_EF;

  return { ef, interval, repetitions, dueDate: now + interval * DAY_MS };
}

/** Rótulos dos botões de revisão e a nota que cada um envia. */
export const REVIEW_GRADES = [
  { label: 'De novo', quality: 0 },
  { label: 'Difícil', quality: 3 },
  { label: 'Bom', quality: 4 },
  { label: 'Fácil', quality: 5 },
] as const;
