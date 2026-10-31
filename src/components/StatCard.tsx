import { useState, type ReactNode } from 'react';
import { BARRA, TILE, type Cor } from '../lib/cores';

/**
 * Contador com ícone na cor do módulo. Com `total`, mostra "x/total" e uma
 * barra fina; com `crescimento`, um selo "↗ +n"; com `hint`, um ⓘ que abre a
 * explicação com toque (não só hover/title — funciona no celular).
 */
export default function StatCard({
  icon,
  cor,
  valor,
  total,
  label,
  crescimento,
  hint,
}: {
  icon: ReactNode;
  cor: Cor;
  valor: number | string;
  total?: number;
  label: string;
  crescimento?: number;
  hint?: string;
}) {
  const [showHint, setShowHint] = useState(false);
  const percent = total && typeof valor === 'number' ? Math.round((valor / total) * 100) : null;

  return (
    <div className="card-surface min-w-0 p-4 sm:p-5">
      <div className="flex items-center justify-between gap-2">
        <span className={`icon-tile h-9 w-9 ${TILE[cor]}`}>{icon}</span>
        {percent !== null ? (
          <span className="text-[11px] font-medium text-sage">{percent}%</span>
        ) : crescimento ? (
          <span className={`badge ${TILE[cor]}`}>↗ +{crescimento}</span>
        ) : null}
      </div>
      <p className="mt-3 text-2xl font-semibold tracking-tight">
        {valor}
        {total !== undefined && <span className="text-base font-normal text-sage">/{total}</span>}
      </p>
      <div className="flex items-center gap-1 text-xs text-sage">
        {label}
        {hint && (
          <button
            type="button"
            className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-sage/60 text-[10px] leading-none hover:border-indigo hover:text-indigo"
            title={hint}
            aria-label={`O que é: ${label}`}
            aria-expanded={showHint}
            onClick={() => setShowHint((v) => !v)}
          >
            i
          </button>
        )}
      </div>
      {percent !== null && (
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
          <div className={`h-full rounded-full ${BARRA[cor]}`} style={{ width: `${percent}%` }} />
        </div>
      )}
      {hint && showHint && <p className="mt-2 text-xs text-sage">{hint}</p>}
    </div>
  );
}
