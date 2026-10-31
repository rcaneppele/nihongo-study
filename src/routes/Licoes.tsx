import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ChevronRight, Headphones, ListChecks, MessageCircle } from 'lucide-react';
import { LICOES } from '../licoes';
import { TILE, type Cor } from '../lib/cores';

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

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-sage">Praticar</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Pratica
            to="/licoes/quiz"
            icon={<ListChecks className="h-5 w-5" />}
            titulo="Quiz"
            desc="Perguntas aleatórias das lições: ordem da frase, partículas, significado"
          />
          <Pratica
            to="/licoes/kakitori"
            icon={<Headphones className="h-5 w-5" />}
            titulo="Kakitori"
            desc="Ouça e escreva o que foi dito"
          />
          <Pratica
            to="/licoes/diga"
            icon={<MessageCircle className="h-5 w-5" />}
            titulo="Diga em japonês"
            desc="Veja em português e monte a frase em japonês"
          />
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-sage">Estudar</h2>
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

/** Atalho para um modo de prática, na cor das lições. */
function Pratica({ to, icon, titulo, desc }: { to: string; icon: ReactNode; titulo: string; desc: string }) {
  return (
    <Link to={to} className="card-surface group flex min-w-0 items-center gap-4 transition-colors hover:border-fuji/40">
      <span className="icon-tile h-11 w-11 rounded-2xl bg-fuji/12 text-fuji">{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block font-medium text-ink">{titulo}</span>
        <span className="block text-sm text-sage">{desc}</span>
      </span>
      <ChevronRight className="h-4 w-4 shrink-0 text-ink/30 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
