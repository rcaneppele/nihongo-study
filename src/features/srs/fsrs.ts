/**
 * FSRS (Free Spaced Repetition Scheduler) — algoritmo de repetição espaçada.
 *
 * Recebe o estado atual do card e a nota da revisão (Rating.Again/Hard/Good/
 * Easy), devolve o novo estado. Está isolado aqui de propósito, assim como o
 * SM-2 que substituiu — dá pra trocar de novo no futuro sem mexer no resto
 * do app. `enable_short_term: false` desliga os passos de aprendizado em
 * minutos/horas do FSRS: aqui cada card passa no máximo uma vez por sessão,
 * então intervalos sub-diários não fazem sentido — o menor intervalo vira 1
 * dia, como no SM-2 anterior.
 */
import { Rating, State, createEmptyCard, fsrs, generatorParameters, type Card as FsrsCard, type Grade } from 'ts-fsrs';

export type { Grade };
export { Rating };

export interface SrsState {
  stability: number;
  difficulty: number;
  state: State;
  reps: number;
  lapses: number;
  scheduledDays: number;
  dueDate: number;
  lastReviewedAt?: number;
}

type SrsInput = Pick<
  SrsState,
  'stability' | 'difficulty' | 'state' | 'reps' | 'lapses' | 'scheduledDays' | 'dueDate' | 'lastReviewedAt'
>;

const scheduler = fsrs(generatorParameters({ enable_short_term: false }));

function toSrsState(card: FsrsCard): SrsState {
  return {
    stability: card.stability,
    difficulty: card.difficulty,
    state: card.state,
    reps: card.reps,
    lapses: card.lapses,
    scheduledDays: card.scheduled_days,
    dueDate: card.due.getTime(),
    lastReviewedAt: card.last_review?.getTime(),
  };
}

function toFsrsCard(state: SrsInput): FsrsCard {
  return {
    due: new Date(state.dueDate),
    stability: state.stability,
    difficulty: state.difficulty,
    elapsed_days: 0,
    scheduled_days: state.scheduledDays,
    learning_steps: 0,
    reps: state.reps,
    lapses: state.lapses,
    state: state.state,
    last_review: state.lastReviewedAt !== undefined ? new Date(state.lastReviewedAt) : undefined,
  };
}

/** Estado inicial de um card novo (vence agora, entra na primeira sessão). */
export function freshSrs(now: number = Date.now()): SrsState {
  return toSrsState(createEmptyCard(now));
}

export function applyFsrs(state: SrsInput, grade: Grade, now: number = Date.now()): SrsState {
  const { card } = scheduler.next(toFsrsCard(state), now, grade);
  return toSrsState(card);
}

/** Rótulos dos botões de revisão e a nota (Rating do FSRS) que cada um envia. */
export const REVIEW_GRADES = [
  { label: 'De novo', grade: Rating.Again },
  { label: 'Difícil', grade: Rating.Hard },
  { label: 'Bom', grade: Rating.Good },
  { label: 'Fácil', grade: Rating.Easy },
] as const;
