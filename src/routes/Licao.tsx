import { Link, useParams } from 'react-router-dom';
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
        <Link to="/licoes" className="btn-ghost mb-4 inline-flex text-sm">
          ← Lições
        </Link>
        <div className="flex items-start gap-4">
          <span className="text-5xl leading-none" aria-hidden>
            {meta.emoji}
          </span>
          <div>
            <h1 className="font-display text-2xl font-semibold">{meta.title}</h1>
            <p className="mt-0.5 text-sm text-sage">{meta.subtitle}</p>
          </div>
        </div>
      </div>

      <Component />

      {temFrases && (
        <div className="card-surface flex flex-wrap items-center justify-between gap-3 border-indigo/30">
          <div>
            <p className="font-medium">Pratique esta lição</p>
            <p className="text-sm text-sage">Veja as frases em português e diga em japonês.</p>
          </div>
          <Link to={`/licoes/diga?licao=${meta.id}`} className="btn-primary">
            🗣️ Diga em japonês
          </Link>
        </div>
      )}
    </div>
  );
}
