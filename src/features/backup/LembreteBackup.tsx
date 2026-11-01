import { Link } from 'react-router-dom';
import { ChevronRight, DatabaseBackup } from 'lucide-react';
import { TILE } from '../../lib/cores';
import { useEstadoBackup } from './lembrete';

/** Aviso discreto na Home quando faz tempo que este aparelho não tem backup (ver `useEstadoBackup`). */
export default function LembreteBackup() {
  const estado = useEstadoBackup();
  if (!estado?.lembrar) return null;
  return (
    <Link to="/config?tab=dados" className="card-surface flex items-center gap-3 py-3 transition-colors hover:border-sora/40">
      <span className={`icon-tile h-9 w-9 shrink-0 ${TILE.sora}`}>
        <DatabaseBackup className="h-4 w-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium text-ink">
          {estado.ultimo === undefined ? 'Você ainda não fez backup deste aparelho' : `Último backup há ${estado.dias} dias`}
        </span>
        <span className="block text-xs text-sage">Exporte ou sincronize para não perder o progresso.</span>
      </span>
      <ChevronRight className="h-4 w-4 shrink-0 text-sage" />
    </Link>
  );
}
