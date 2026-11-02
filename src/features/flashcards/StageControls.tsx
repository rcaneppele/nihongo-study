import type { Card } from '../../db/schema';
import { mudarEstagio } from './cards';
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
  if (stage === 'novo' || stage === 'reconheco') {
    return (
      <button
        className="text-xs text-sage hover:text-indigo"
        title="Já reconheço esta palavra — começar a treinar dizê-la em japonês (português → japonês)"
        onClick={() => mudarEstagio(card)}
      >
        Treinar a dizer
      </button>
    );
  }
  return (
    <button
      className="text-xs text-sage hover:text-indigo"
      title={stage === 'seiDizer' ? 'Parar de treinar a dizer e voltar só ao reconhecimento' : 'Recomeçar do zero o treino de dizer'}
      onClick={() => mudarEstagio(card)}
    >
      Voltar um estágio
    </button>
  );
}
