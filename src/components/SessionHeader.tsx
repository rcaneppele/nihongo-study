import type { ReactNode } from 'react';

/**
 * Cabeçalho das sessões de revisão: "3 de 20" + barra de progresso fina,
 * desfazer a última resposta e sair. `index` é o card atual (0-based), então
 * a barra mostra quantos já foram respondidos.
 */
export default function SessionHeader({
  index,
  total,
  onUndo,
  onQuit,
  badge,
  semDesfazer,
}: {
  index: number;
  total: number;
  onUndo?: () => void;
  onQuit: () => void;
  badge?: ReactNode;
  /** Sessões sem desfazer (ex.: treino de kana) — esconde o botão em vez de deixá-lo desabilitado. */
  semDesfazer?: boolean;
}) {
  const done = Math.min(index, total);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2 text-sm text-sage">
        <div className="flex items-center gap-2">
          {badge}
          <span>
            {Math.min(index + 1, total)} de {total}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {!semDesfazer && (
          <button
            className="inline-flex items-center gap-1 text-xs text-sage hover:text-indigo disabled:opacity-40 disabled:hover:text-sage"
            onClick={onUndo}
            disabled={!onUndo}
            title="Desfazer a última resposta (Ctrl+Z)"
          >
            <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 14 4 9l5-5" />
              <path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11" />
            </svg>
            Desfazer
          </button>
          )}
          <button className="text-xs text-sage hover:text-hanko hover:underline" onClick={onQuit}>
            Desistir e voltar
          </button>
        </div>
      </div>
      <div
        className="h-1 w-full overflow-hidden rounded-full bg-line"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={done}
      >
        <div className="h-full bg-indigo/60 transition-[width]" style={{ width: `${total ? (done / total) * 100 : 0}%` }} />
      </div>
    </div>
  );
}
