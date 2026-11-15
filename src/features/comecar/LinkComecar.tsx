import { Link } from 'react-router-dom';
import { ChevronRight, Compass } from 'lucide-react';
import { ROTA_COMECAR } from './rota';

/** Acesso permanente e discreto ao guia "Começando do zero" (hub Aprender e Lições). */
export default function LinkComecar() {
  return (
    <Link
      to={ROTA_COMECAR}
      className="card-surface group flex items-center gap-3 py-3 text-sm transition-colors hover:border-fuji/40"
    >
      <Compass className="h-4 w-4 shrink-0 text-fuji" />
      <span className="min-w-0 flex-1 text-sage">
        <span className="font-medium text-ink">Nunca estudou japonês?</span> Leia o guia “Começando do zero”.
      </span>
      <ChevronRight className="h-4 w-4 shrink-0 text-sage transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
