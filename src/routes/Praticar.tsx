import { Link } from 'react-router-dom';
import { ChevronRight, Target } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import ProximoPassoCard from '../components/ProximoPassoCard';
import { TILE } from '../lib/cores';
import { LISTA_HABILIDADES } from '../features/metodo/estrutura';

/** Hub "Praticar": as quatro habilidades (etapa 2 do ciclo — usar o que aprendeu). */
export default function Praticar() {
  return (
    <div className="space-y-6">
      <PageHeader
        icon={<Target className="h-5 w-5" />}
        cor="matcha"
        title="Praticar"
        subtitle="Use o que aprendeu nas quatro habilidades: ler e ouvir (entender), falar e escrever (produzir)."
      />
      <ProximoPassoCard alvo="praticar" />
      <h2 className="text-sm font-semibold uppercase tracking-wider text-sage">As quatro habilidades</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {LISTA_HABILIDADES.map((h) => (
          <Link
            key={h.id}
            to={`/praticar/${h.id}`}
            className="card-hero group flex min-w-0 flex-col gap-3 transition-colors hover:border-ink/20"
          >
            <div className="flex items-center justify-between gap-3">
              <span className={`icon-tile h-12 w-12 rounded-2xl ${TILE[h.cor]}`}>
                <h.icone className="h-6 w-6" />
              </span>
              <span className="badge bg-line/70 text-sage">{h.atividades.length} atividades</span>
            </div>
            <div>
              <p className="flex items-center gap-1 text-lg font-semibold tracking-tight">
                {h.label}
                <ChevronRight className="h-4 w-4 text-ink/30 transition-transform group-hover:translate-x-0.5" />
              </p>
              <p className="text-sm text-sage">{h.porque}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
