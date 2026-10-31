import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { TILE } from '../lib/cores';
import type { Atividade } from '../features/metodo/estrutura';

/** Uma atividade num hub do método: ícone, título (com pendências), pra que serve, e seta. */
export default function AtividadeCard({ atividade, pendente }: { atividade: Atividade; pendente?: number }) {
  const { to, icone: Icone, cor, titulo, desc } = atividade;
  return (
    <Link to={to} className="card-surface group flex min-w-0 items-start gap-4 transition-colors hover:border-ink/20">
      <span className={`icon-tile h-11 w-11 rounded-2xl ${TILE[cor]}`}>
        <Icone className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2 font-medium text-ink">
          {titulo}
          {!!pendente && <span className="badge bg-hanko/10 text-hanko">{pendente}</span>}
        </span>
        <span className="mt-0.5 block text-sm text-sage">{desc}</span>
      </span>
      <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-ink/30 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
