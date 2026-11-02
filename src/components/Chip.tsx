import type { ReactNode } from 'react';

/** Filtro/seleção em pílula (classes `chip`/`chip-active`); `aria-pressed` diz se está ligado. */
export default function Chip({
  active,
  onClick,
  children,
  className = '',
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button type="button" aria-pressed={active} onClick={onClick} className={`chip ${active ? 'chip-active' : ''} ${className}`.trim()}>
      {children}
    </button>
  );
}
