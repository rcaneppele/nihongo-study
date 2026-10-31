import { db, type Card } from '../../db/schema';
import { freshSrs } from '../srs/fsrs';
import { cardStage, STAGE_HINTS, STAGE_LABELS } from './stages';

/** Rótulo do estágio do card (Reconheço / Sei dizer / Domino), com a explicação no tooltip. */
export function StageChip({ card }: { card: Card }) {
  const stage = cardStage(card);
  if (stage === 'novo') return null;
  const style = stage === 'reconheco' ? 'border-line text-sage' : stage === 'seiDizer' ? 'border-indigo/40 text-indigo' : 'border-sage text-sage';
  return (
    <span className={`ml-2 rounded border px-2 py-0.5 text-xs ${style}`} title={STAGE_HINTS[stage]}>
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
  const now = Date.now();
  if (stage === 'novo' || stage === 'reconheco') {
    return (
      <button
        className="text-xs text-sage hover:text-indigo"
        title="Já reconheço esta palavra — começar a treinar dizê-la em japonês (português → japonês)"
        onClick={() => db.cards.update(card.id, { production: freshSrs(now), updatedAt: now })}
      >
        Treinar a dizer
      </button>
    );
  }
  return (
    <button
      className="text-xs text-sage hover:text-indigo"
      title={stage === 'seiDizer' ? 'Parar de treinar a dizer e voltar só ao reconhecimento' : 'Recomeçar do zero o treino de dizer'}
      onClick={() =>
        db.cards.update(card.id, { production: stage === 'seiDizer' ? undefined : freshSrs(now), updatedAt: now })
      }
    >
      Voltar um estágio
    </button>
  );
}
