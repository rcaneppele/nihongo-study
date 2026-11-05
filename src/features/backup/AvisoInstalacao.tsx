import { Smartphone, X } from 'lucide-react';
import { TILE } from '../../lib/cores';
import { dispensarAvisoInstalacao, useAvisoInstalacao } from './instalacao';

/** Aviso discreto na Home, só no Safari do iPhone/iPad com o app fora da tela inicial (ver `instalacao.ts`). */
export default function AvisoInstalacao() {
  if (!useAvisoInstalacao()) return null;
  return (
    <div className="card-surface flex items-start gap-3 py-3">
      <span className={`icon-tile h-9 w-9 shrink-0 ${TILE.sora}`}>
        <Smartphone className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-ink">Instale o app para proteger seu progresso</p>
        <p className="text-xs text-sage">
          No Safari, o iPhone e o iPad podem apagar os dados de sites que ficam alguns dias sem uso. Toque em Compartilhar
          e depois em “Adicionar à Tela de Início”, e passe a abrir o app pelo ícone.
        </p>
      </div>
      <button
        type="button"
        className="shrink-0 rounded-lg p-1 text-sage hover:text-ink"
        aria-label="Dispensar aviso de instalação"
        onClick={() => void dispensarAvisoInstalacao()}
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
