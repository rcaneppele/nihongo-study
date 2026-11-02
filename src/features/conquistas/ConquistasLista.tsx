import { Lock, Trophy } from 'lucide-react';
import { TILE } from '../../lib/cores';
import { useConquistas, type GrupoConquista } from './conquistas';

const GRUPOS: GrupoConquista[] = ['Vocabulário', 'Escrita', 'Leitura', 'Lições', 'Prática', 'Constância'];

/** Conquistas na página Progresso: desbloqueadas com a data; as outras, apagadas, com o quanto falta. */
export default function ConquistasLista() {
  const estados = useConquistas();
  if (!estados) return null;
  const total = estados.filter((e) => e.unlockedAt !== undefined).length;

  return (
    <section id="conquistas" className="space-y-3">
      <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-sage">
        Conquistas
        <span className="badge bg-kin/12 normal-case tracking-normal text-kin">
          {total} de {estados.length}
        </span>
      </h2>
      {GRUPOS.map((grupo) => (
        <div key={grupo} className="space-y-2">
          <p className="text-xs text-sage">{grupo}</p>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {estados
              .filter((e) => e.conquista.grupo === grupo)
              .map(({ conquista: c, valor, unlockedAt }) => {
                const feita = unlockedAt !== undefined;
                return (
                  <div key={c.id} className="card-surface flex items-center gap-3 p-3">
                    <span className={`icon-tile h-9 w-9 shrink-0 rounded-xl ${feita ? TILE[c.cor] : 'bg-line/70 text-sage'}`}>
                      {feita ? <Trophy className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                    </span>
                    <div className="min-w-0 flex-1 space-y-1">
                      <p className={`text-sm font-medium ${feita ? 'text-ink' : 'text-sage'}`}>{c.titulo}</p>
                      <p className="text-xs text-sage">{c.descricao}</p>
                      {feita ? (
                        <p className="text-[11px] text-sage">em {new Date(unlockedAt).toLocaleDateString('pt-BR')}</p>
                      ) : (
                        <div className="flex items-center gap-2">
                          <div className="h-1 flex-1 overflow-hidden rounded-full bg-line">
                            <div className="h-full rounded-full bg-kin/60" style={{ width: `${Math.min(1, valor / c.meta) * 100}%` }} />
                          </div>
                          <span className="text-[11px] text-sage">
                            {Math.min(valor, c.meta)}/{c.meta}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      ))}
    </section>
  );
}
