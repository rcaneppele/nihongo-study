import { Link } from 'react-router-dom';
import { BookOpen, CheckCircle2, ChevronRight, Headphones, ListChecks, MessageCircle } from 'lucide-react';
import { LICOES } from '../licoes';
import { TILE, type Cor } from '../lib/cores';
import TrilhaLicoes from '../features/licoes/TrilhaLicoes';
import { useProgressoLicoes } from '../features/licoes/progresso';

// Cor da etiqueta pelo tipo de lição — o tipo vem na primeira tag de cada
// lição (`meta.tags`). Etiquetas sem cor própria (nível, assunto) ficam neutras.
const COR_DA_TAG: Record<string, Cor> = {
  gramática: 'fuji',
  conversa: 'matcha',
  vocabulário: 'kin',
  cultura: 'sakura',
  escrita: 'sora',
};

export default function Licoes() {
  const progresso = useProgressoLicoes();

  return (
    <div className="space-y-8">
      <div className="flex items-start gap-3">
        <span className="icon-tile h-11 w-11 rounded-2xl bg-fuji/12 text-fuji">
          <BookOpen className="h-5 w-5" />
        </span>
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">Lições</h1>
          <p className="text-sm text-sage">Explicações detalhadas sobre gramática, vocabulário e cultura</p>
        </div>
      </div>

      <TrilhaLicoes />

      <div className="card-surface flex flex-wrap items-center gap-x-4 gap-y-2 py-4 text-sm">
        <span className="text-sage">Estudou uma lição? Próximo passo do ciclo:</span>
        <Link to="/praticar/falar" className="inline-flex items-center gap-1.5 font-medium text-matcha hover:underline">
          <MessageCircle className="h-4 w-4" />
          Praticar falando
        </Link>
        <Link to="/praticar/ouvir" className="inline-flex items-center gap-1.5 font-medium text-sora hover:underline">
          <Headphones className="h-4 w-4" />
          Praticar ouvindo
        </Link>
        <Link to="/licoes/quiz" className="inline-flex items-center gap-1.5 font-medium text-fuji hover:underline">
          <ListChecks className="h-4 w-4" />
          Testar o que ficou
        </Link>
      </div>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-sage">Todas as lições</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {LICOES.map(({ meta }) => (
            <Link
              key={meta.id}
              to={`/licoes/${meta.id}`}
              className="card-surface group flex min-w-0 items-start gap-4 transition-colors hover:border-fuji/40"
            >
              <span className="icon-tile h-12 w-12 rounded-2xl bg-fuji/8 text-2xl leading-none" aria-hidden>
                {meta.emoji}
              </span>
              <div className="min-w-0 flex-1">
                <div className="font-medium text-ink">{meta.title}</div>
                <div className="mt-0.5 text-sm text-sage">{meta.subtitle}</div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {progresso?.get(meta.id)?.completedAt !== undefined ? (
                    <span className="badge bg-matcha/12 text-matcha">
                      <CheckCircle2 className="h-3 w-3" />
                      Concluída
                    </span>
                  ) : (
                    progresso?.has(meta.id) && <span className="badge bg-line/70 text-sage">Em andamento</span>
                  )}
                  {meta.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className={`badge ${COR_DA_TAG[tag] ? TILE[COR_DA_TAG[tag]] : 'bg-line/70 text-sage'}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-ink/30 transition-transform group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
