import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { TILE } from '../lib/cores';
import { useProximoPasso, type AlvoPasso } from '../features/metodo/proximoPasso';

/**
 * Bloco "Próximo passo" no topo de cada hub: uma ação recomendada pelos
 * dados de uso (ver src/features/metodo/proximoPasso.ts) e um botão.
 */
export default function ProximoPassoCard({ alvo }: { alvo: AlvoPasso }) {
  const passo = useProximoPasso(alvo);
  if (!passo) return null;
  const Icone = passo.icone;

  return (
    <section className="card-hero flex flex-wrap items-center gap-4">
      <span className={`icon-tile h-12 w-12 rounded-2xl ${TILE[passo.cor]}`}>
        <Icone className="h-6 w-6" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-sage">Próximo passo</p>
        <p className="text-lg font-semibold tracking-tight">{passo.titulo}</p>
        <p className="text-sm text-sage">{passo.porque}</p>
      </div>
      <Link to={passo.to} className="btn-dark">
        Começar <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  );
}
