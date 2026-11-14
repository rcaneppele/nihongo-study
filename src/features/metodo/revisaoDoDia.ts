import type { KanjiEntry } from '../../data/kanji';
import type { StudyItem } from '../flashcards/stages';
import { embaralhar, type Rng } from '../../lib/aleatorio';

/**
 * Teto de itens por sessão da Revisão do dia. Depois de uns dias sem
 * estudar, a fila pode passar de cem itens — uma sessão única desse
 * tamanho desanima e cansa a ponto de a nota deixar de ser honesta. A fila
 * continua a mesma; só é percorrida em sessões menores, com o resto a um
 * toque ("Continuar revisão").
 */
export const SESSAO_MAXIMA = 50;

export interface SessaoDoDia {
  cards: StudyItem[];
  kanji: KanjiEntry[];
  /** Itens vencidos que ficaram para a próxima sessão. */
  restam: number;
}

function venceEm(item: StudyItem): number {
  return item.direction === 'production' && item.card.production ? item.card.production.dueDate : item.card.dueDate;
}

/**
 * Monta uma sessão com no máximo `max` itens: os mais atrasados primeiro
 * (são os mais perto de serem esquecidos), embaralhados dentro da sessão.
 * Cards e kanji dividem o teto na proporção do que cada um tem vencido,
 * para nenhum dos dois esperar o outro zerar. `kanji` já chega do mais
 * atrasado para o menos (ver `getDueKanji`).
 */
export function montarSessaoDoDia(cards: StudyItem[], kanji: KanjiEntry[], max: number = SESSAO_MAXIMA, rng: Rng = Math.random): SessaoDoDia {
  const total = cards.length + kanji.length;
  if (total <= max) return { cards: embaralhar(cards, rng), kanji: embaralhar(kanji, rng), restam: 0 };

  let nKanji = Math.round((max * kanji.length) / total);
  if (kanji.length > 0) nKanji = Math.max(1, nKanji);
  nKanji = Math.min(nKanji, kanji.length, cards.length > 0 ? max - 1 : max);
  const nCards = Math.min(cards.length, max - nKanji);

  const maisAtrasados = [...cards].sort((a, b) => venceEm(a) - venceEm(b)).slice(0, nCards);
  return {
    cards: embaralhar(maisAtrasados, rng),
    kanji: embaralhar(kanji.slice(0, nKanji), rng),
    restam: total - nCards - nKanji,
  };
}
