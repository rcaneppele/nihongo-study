import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { Trophy, X } from 'lucide-react';
import { db } from '../../db/schema';
import { diaLocal } from '../atividade/atividade';
import { avaliarConquistas, type Conquista } from './conquistas';

const DURACAO_MS = 7000;
/** Espera depois da última mudança antes de conferir — no meio de uma sessão, confere uma vez só quando para. */
const ESPERA_MS = 1500;

/**
 * Confere as conquistas ao abrir o app, a cada troca de tela e quando a
 * atividade do dia muda (toda ação de estudo registra atividade) e avisa as
 * que acabaram de ser desbloqueadas — um aviso discreto no rodapé, que some
 * sozinho. Fica no Layout.
 */
export default function AvisoConquista() {
  const location = useLocation();
  const [novas, setNovas] = useState<Conquista[]>([]);
  const atividadeHoje = useLiveQuery(async () => (await db.activity.get(diaLocal()))?.updatedAt ?? 0, []);

  useEffect(() => {
    // Depois de começar, o resultado não é descartado: a conquista já foi gravada e o aviso precisa aparecer.
    const t = setTimeout(() => {
      void avaliarConquistas().then((c) => {
        if (c.length > 0) setNovas(c);
      });
    }, ESPERA_MS);
    return () => clearTimeout(t);
  }, [location.pathname, atividadeHoje]);

  useEffect(() => {
    if (novas.length === 0) return;
    const t = setTimeout(() => setNovas([]), DURACAO_MS);
    return () => clearTimeout(t);
  }, [novas]);

  if (novas.length === 0) return null;
  const [primeira] = novas;

  return (
    <div
      role="status"
      className="fixed inset-x-3 bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))] z-40 mx-auto flex max-w-md items-center gap-3 rounded-2xl border border-line/70 bg-surface p-3 shadow-xl md:bottom-6"
    >
      <span className="icon-tile h-10 w-10 shrink-0 rounded-xl bg-kin/12 text-kin">
        <Trophy className="h-5 w-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-sage">Conquista desbloqueada</p>
        <p className="truncate font-medium text-ink">
          {primeira.titulo}
          {novas.length > 1 && <span className="text-sm font-normal text-sage"> e mais {novas.length - 1}</span>}
        </p>
      </div>
      <Link to="/progresso#conquistas" className="text-xs font-medium text-indigo hover:underline" onClick={() => setNovas([])}>
        Ver
      </Link>
      <button
        className="grid h-7 w-7 place-items-center rounded-full text-sage hover:bg-line/60 hover:text-ink"
        onClick={() => setNovas([])}
        aria-label="Fechar"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
