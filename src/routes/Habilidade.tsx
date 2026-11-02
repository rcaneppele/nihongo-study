import { Link, Navigate, useParams } from 'react-router-dom';
import { ChartColumn, ChevronLeft } from 'lucide-react';
import StatCard from '../components/StatCard';
import { useNivel } from '../features/metodo/nivel';
import PageHeader from '../components/PageHeader';
import AtividadeCard from '../components/AtividadeCard';
import ProximoPassoCard from '../components/ProximoPassoCard';
import { HABILIDADES, type HabilidadeId } from '../features/metodo/estrutura';

/** Página de uma habilidade (/praticar/:habilidade): o porquê e as atividades que a treinam. */
export default function Habilidade() {
  const { habilidade } = useParams<{ habilidade: string }>();
  const h = habilidade && habilidade in HABILIDADES ? HABILIDADES[habilidade as HabilidadeId] : undefined;
  if (!h) return <Navigate to="/praticar" replace />;

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Link to="/praticar" className="inline-flex items-center gap-1 text-sm text-sage hover:text-ink">
          <ChevronLeft className="h-4 w-4" />
          Praticar
        </Link>
        <PageHeader icon={<h.icone className="h-5 w-5" />} cor={h.cor} title={h.label} subtitle={h.porque} />
      </div>
      <ProximoPassoCard alvo={h.id} />
      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-sage">Atividades</h2>
        <div className="grid gap-3">
          {h.atividades.map((a) => (
            <AtividadeCard key={a.titulo} atividade={a} />
          ))}
        </div>
      </section>
      <SeuNivel id={h.id} />
    </div>
  );
}

/** "Seu nível nesta habilidade": indicadores que o app já consegue medir (ver nivel.ts). */
function SeuNivel({ id }: { id: HabilidadeId }) {
  const nivel = useNivel(id);
  if (!nivel) return null;
  return (
    <section className="space-y-3">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-sage">Seu nível nesta habilidade</h2>
      <div className={`grid grid-cols-2 gap-3 sm:gap-5 ${nivel.indicadores.length > 3 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
        {nivel.indicadores.map((ind) => (
          <StatCard
            key={ind.label}
            icon={<ChartColumn className="h-[18px] w-[18px]" />}
            cor={ind.cor}
            valor={ind.valor}
            total={ind.total}
            label={ind.label}
            hint={ind.hint}
          />
        ))}
      </div>
      {nivel.observacao && <p className="text-xs text-sage">{nivel.observacao}</p>}
    </section>
  );
}
