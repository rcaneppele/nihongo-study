import type { ReactNode } from 'react';

/**
 * Card das sessões de estudo, com efeito de "baralho": duas cartas atrás,
 * levemente deslocadas — sensação de pilha sem enfeite. `etiqueta` vai no
 * canto superior esquerdo (ex.: direção do card).
 */
export default function StudyCard({ etiqueta, children }: { etiqueta?: ReactNode; children: ReactNode }) {
  return (
    <div className="relative pb-3">
      <div aria-hidden className="absolute inset-x-8 bottom-0 top-6 rounded-3xl border border-line/70 bg-surface/50" />
      <div aria-hidden className="absolute inset-x-4 bottom-1.5 top-3 rounded-3xl border border-line/70 bg-surface/80" />
      <div className="card-hero relative grid min-h-56 place-items-center pt-12 text-center sm:pt-12">
        {etiqueta && <div className="absolute left-5 top-5">{etiqueta}</div>}
        {children}
      </div>
    </div>
  );
}
