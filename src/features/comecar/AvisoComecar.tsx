import { Link } from 'react-router-dom';
import { ArrowRight, Compass, X } from 'lucide-react';
import { TILE } from '../../lib/cores';
import { dispensarAvisoComecar, useAvisoComecar } from './aparelhoNovo';
import { ROTA_COMECAR } from './rota';

/** Cartão da Home para quem nunca estudou japonês — só num aparelho sem estudo nenhum (ver `aparelhoNovo.ts`). */
export default function AvisoComecar() {
  if (!useAvisoComecar()) return null;
  return (
    <div className="card-hero flex items-start gap-4">
      <span className={`icon-tile h-11 w-11 shrink-0 rounded-2xl ${TILE.fuji}`}>
        <Compass className="h-5 w-5" />
      </span>
      <div className="min-w-0 flex-1 space-y-3">
        <div>
          <p className="font-semibold text-ink">Novo no japonês? Comece por aqui</p>
          <p className="text-sm text-sage">
            Um guia curto de como o idioma funciona, o que aprender primeiro e quais partes do app usar nas primeiras
            semanas.
          </p>
        </div>
        <Link to={ROTA_COMECAR} className="btn-dark inline-flex">
          Ler o guia
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <button
        type="button"
        className="shrink-0 rounded-lg p-1 text-sage hover:text-ink"
        aria-label="Dispensar o guia para iniciantes"
        onClick={() => void dispensarAvisoComecar()}
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
