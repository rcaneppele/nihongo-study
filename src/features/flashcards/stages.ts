import { State } from 'ts-fsrs';
import type { Card } from '../../db/schema';
import { freshSrs } from '../srs/fsrs';

/**
 * Estágios de vocabulário de um card — derivados do estado FSRS, nunca
 * gravados como campo próprio:
 *
 * - **novo**: reconhecimento ainda não revisado.
 * - **reconheço**: só a direção japonês → português (o card de sempre).
 * - **seiDizer**: ganhou a direção português → japonês (`card.production`),
 *   rótulo "Sei dizer" na interface.
 * - **domino**: produção com intervalo ≥ MASTERED_DAYS. Só um rótulo — o
 *   FSRS continua agendando as duas direções, cada vez mais espaçadas.
 */
export type Stage = 'novo' | 'reconheco' | 'seiDizer' | 'domino';

/** Intervalo de reconhecimento (dias) a partir do qual o card ganha a direção de produção. */
export const PRODUCTION_MIN_DAYS = 7;
/** Intervalo de produção (dias) a partir do qual o card conta como dominado (mesmo limiar do "Maduro"). */
export const MASTERED_DAYS = 21;
/**
 * Máximo de cards de produção **novos** por sessão de revisão — sem isso,
 * quem já tem muitos cards firmes receberia dezenas de produções novas de
 * uma vez. O resto entra nas próximas sessões.
 */
export const NEW_PRODUCTION_PER_SESSION = 20;

export const STAGE_LABELS: Record<Stage, string> = {
  novo: 'Novo',
  reconheco: 'Reconheço',
  seiDizer: 'Sei dizer',
  domino: 'Domino',
};

export const STAGE_HINTS: Record<Stage, string> = {
  novo: 'Ainda não revisado',
  reconheco: 'Você reconhece a palavra em japonês (japonês → português)',
  seiDizer: 'Você também treina dizer a palavra em japonês, partindo do português',
  domino: `Você diz a palavra em japonês com segurança (intervalo ≥ ${MASTERED_DAYS} dias)`,
};

/**
 * Cores dos estágios — as mesmas na lista de cards, no mapa de vocabulário e
 * no Progresso: cinza → azul claro → azul → verde (o "dominado").
 */
export const STAGE_BADGE: Record<Stage, string> = {
  novo: 'bg-line/70 text-sage',
  reconheco: 'bg-sora/12 text-sora',
  seiDizer: 'bg-sora text-paper',
  domino: 'bg-matcha/15 text-matcha',
};

export const STAGE_BAR: Record<Stage, string> = {
  novo: 'bg-line',
  reconheco: 'bg-sora/40',
  seiDizer: 'bg-sora',
  domino: 'bg-matcha',
};

export function cardStage(card: Card): Stage {
  if (card.production) {
    return card.production.state === State.Review && card.production.scheduledDays >= MASTERED_DAYS
      ? 'domino'
      : 'seiDizer';
  }
  return card.state === State.New ? 'novo' : 'reconheco';
}

/**
 * Depois de uma revisão de reconhecimento: se o intervalo novo chegou a
 * PRODUCTION_MIN_DAYS e o card ainda não tem produção, ele sobe pra
 * "Sei dizer" — a produção nasce como card novo, vencendo na hora.
 */
export function promotedProduction(card: Card, newScheduledDays: number, now: number): Card['production'] {
  if (card.production || newScheduledDays < PRODUCTION_MIN_DAYS) return card.production;
  return freshSrs(now);
}

export type Direction = 'recognition' | 'production';

export interface StudyItem {
  card: Card;
  direction: Direction;
}

/**
 * Fila da sessão "Estudar": reconhecimentos e produções vencidos. Se as
 * duas direções do mesmo card vencem juntas, entra só a produção — ver a
 * frente em japonês logo antes (ou depois) entregaria a resposta da outra.
 * O reconhecimento continua vencido e entra numa próxima sessão.
 */
export function buildReviewQueue(cards: Card[], now: number = Date.now()): StudyItem[] {
  const items: StudyItem[] = [];
  let newProductions = 0;

  for (const card of cards) {
    const prod = card.production;
    let productionDue = !!prod && prod.dueDate <= now;
    if (productionDue && prod!.state === State.New) {
      if (newProductions >= NEW_PRODUCTION_PER_SESSION) productionDue = false;
      else newProductions++;
    }

    if (productionDue) items.push({ card, direction: 'production' });
    else if (card.dueDate <= now) items.push({ card, direction: 'recognition' });
  }
  return items;
}
