import type { ReactNode } from 'react';
import { TRACO, type Cor } from '../lib/cores';

/** Anel de progresso (0–1) com conteúdo no centro — meta do dia, % conhecido etc. */
export default function ProgressRing({
  fracao,
  cor = 'indigo',
  tamanho = 'h-24 w-24',
  children,
}: {
  fracao: number;
  cor?: Cor;
  tamanho?: string;
  children?: ReactNode;
}) {
  const raio = 15.5;
  const circ = 2 * Math.PI * raio;
  const f = Math.max(0, Math.min(1, fracao));

  return (
    <div className={`relative shrink-0 ${tamanho}`}>
      <svg viewBox="0 0 36 36" className={`${tamanho} -rotate-90`} aria-hidden>
        <circle cx="18" cy="18" r={raio} fill="none" className="stroke-line" strokeWidth="3.2" />
        <circle
          cx="18"
          cy="18"
          r={raio}
          fill="none"
          className={`transition-[stroke-dasharray] duration-500 ${TRACO[cor]}`}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeDasharray={`${f * circ} ${circ}`}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center leading-none">{children}</div>
    </div>
  );
}
