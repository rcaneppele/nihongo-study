import { BookOpen } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import AtividadeCard from '../components/AtividadeCard';
import ProximoPassoCard from '../components/ProximoPassoCard';
import { ATIVIDADES_APRENDER } from '../features/metodo/estrutura';
import TrilhaLicoes from '../features/licoes/TrilhaLicoes';

/** Hub "Aprender": onde entra conteúdo novo, com explicação (etapa 1 do ciclo do método). */
export default function Aprender() {
  return (
    <div className="space-y-6">
      <PageHeader
        icon={<BookOpen className="h-5 w-5" />}
        cor="fuji"
        title="Aprender"
        subtitle="Conteúdo novo, com explicação: assuntos, palavras, kanji e os alfabetos."
      />
      <ProximoPassoCard alvo="aprender" />
      <TrilhaLicoes />
      <h2 className="text-sm font-semibold uppercase tracking-wider text-sage">Tudo para aprender</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {ATIVIDADES_APRENDER.map((a) => (
          <AtividadeCard key={a.titulo} atividade={a} />
        ))}
      </div>
    </div>
  );
}
