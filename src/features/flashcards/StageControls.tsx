import { db, type Card } from '../../db/schema';
import { carimbosCard } from '../../db/merge';
import { freshSrs } from '../srs/fsrs';
import { cardStage, STAGE_BADGE, STAGE_HINTS, STAGE_LABELS } from './stages';

/** Rótulo do estágio do card (Reconheço / Sei dizer / Domino), com a explicação no tooltip. */
export function StageChip({ card }: { card: Card }) {
  const stage = cardStage(card);
  if (stage === 'novo') return null;
  return (
    <span className={`badge ${STAGE_BADGE[stage]}`} title={STAGE_HINTS[stage]}>
      {STAGE_LABELS[stage]}
    </span>
  );
}

/**
 * Mudança manual de estágio: "Treinar a dizer" adianta a promoção que o
 * FSRS faria sozinho (intervalo ≥ 7 dias); "voltar" tira a produção (volta
 * pra Reconheço — será promovido de novo quando o reconhecimento firmar)
 * ou, de Domino, reinicia a produção do zero.
 */
export function StageAction({ card }: { card: Card }) {
  const stage = cardStage(card);
  // Hora do clique (não do render), pra valer como carimbo da produção na mesclagem.
  const setProduction = (production: Card['production']) =>
    db.cards.update(card.id, { production, ...carimbosCard(card, ['productionUpdatedAt'], Date.now()) });
  if (stage === 'novo' || stage === 'reconheco') {
    return (
      <button
        className="text-xs text-sage hover:text-indigo"
        title="Já reconheço esta palavra — começar a treinar dizê-la em japonês (português → japonês)"
        onClick={() => setProduction(freshSrs(Date.now()))}
      >
        Treinar a dizer
      </button>
    );
  }
  return (
    <button
      className="text-xs text-sage hover:text-indigo"
      title={stage === 'seiDizer' ? 'Parar de treinar a dizer e voltar só ao reconhecimento' : 'Recomeçar do zero o treino de dizer'}
      onClick={() => setProduction(stage === 'seiDizer' ? undefined : freshSrs(Date.now()))}
    >
      Voltar um estágio
    </button>
  );
}
