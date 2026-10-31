import { Link, useParams } from 'react-router-dom';
import { ArrowRight, ChevronLeft, MessageCircle } from 'lucide-react';
import { LICOES } from '../licoes';

export default function Licao() {
  const { id } = useParams<{ id: string }>();
  const entry = LICOES.find((l) => l.meta.id === id);

  if (!entry) {
    return (
      <div className="py-12 text-center">
        <p className="text-sage">Lição não encontrada.</p>
        <Link to="/licoes" className="btn-ghost mt-4 inline-flex">
          ← Voltar
        </Link>
      </div>
    );
  }

  const { meta, Component, quiz, diga } = entry;
  const temFrases = (quiz?.frases?.length ?? 0) + (diga?.length ?? 0) > 0;

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <Link to="/licoes" className="mb-4 inline-flex items-center gap-1 text-sm text-sage hover:text-ink">
          <ChevronLeft className="h-4 w-4" />
          Lições
        </Link>
        <div className="flex items-center gap-4">
          <span className="icon-tile h-16 w-16 rounded-3xl bg-fuji/8 text-4xl leading-none" aria-hidden>
            {meta.emoji}
          </span>
          <div>
            <h1 className="font-display text-2xl font-semibold tracking-tight">{meta.title}</h1>
            <p className="mt-0.5 text-sm text-sage">{meta.subtitle}</p>
          </div>
        </div>
      </div>

      <Component />

      {temFrases && (
        <div className="card-hero flex flex-wrap items-center gap-4">
          <span className="icon-tile h-11 w-11 rounded-2xl bg-fuji/12 text-fuji">
            <MessageCircle className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-medium">Pratique esta lição</p>
            <p className="text-sm text-sage">Veja as frases em português e diga em japonês.</p>
          </div>
          <Link to={`/licoes/diga?licao=${meta.id}`} className="btn-dark">
            Diga em japonês <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
