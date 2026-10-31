import type { ReactNode } from 'react';
import { TILE, type Cor } from '../lib/cores';

/**
 * Cabeçalho padrão de página: ícone na cor do módulo, título, subtítulo e
 * ações à direita (quebram pra baixo no celular).
 */
export default function PageHeader({
  icon,
  cor,
  title,
  subtitle,
  children,
}: {
  icon: ReactNode;
  cor: Cor;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex min-w-0 items-start gap-3">
        <span className={`icon-tile h-11 w-11 rounded-2xl ${TILE[cor]}`}>{icon}</span>
        <div className="min-w-0">
          <h1 className="font-display text-2xl font-semibold tracking-tight">{title}</h1>
          {subtitle && <div className="text-sm text-sage">{subtitle}</div>}
        </div>
      </div>
      {children && <div className="flex flex-wrap gap-2">{children}</div>}
    </div>
  );
}
