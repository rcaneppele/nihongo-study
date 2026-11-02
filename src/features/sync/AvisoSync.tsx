import { CloudOff } from 'lucide-react';
import { TILE } from '../../lib/cores';
import { entrarDeNovo, useEstadoSync, useStatusSync } from './motor';

/**
 * Aviso na Home quando a sincronização parou e precisa da pessoa: o Google
 * pediu login de novo (a renovação automática ao abrir o app não bastou).
 */
export default function AvisoSync() {
  const estado = useEstadoSync();
  const status = useStatusSync();
  if (!estado?.conectado || status.fase !== 'precisaLogin') return null;
  return (
    <div className="card-surface flex items-center gap-3 py-3">
      <span className={`icon-tile h-9 w-9 shrink-0 ${TILE.sora}`}>
        <CloudOff className="h-4 w-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium text-ink">Sincronização pausada</span>
        <span className="block text-xs text-sage">O acesso ao Google venceu. O que você estudar fica guardado aqui.</span>
      </span>
      <button className="btn-ghost shrink-0" onClick={() => void entrarDeNovo()}>
        Entrar
      </button>
    </div>
  );
}
