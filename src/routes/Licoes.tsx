import { Link } from 'react-router-dom';
import { LICOES } from '../licoes';

export default function Licoes() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Lições</h1>
        <p className="mt-1 text-sm text-sage">
          Explicações detalhadas sobre gramática, vocabulário e cultura
        </p>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-ink">Praticar</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            to="/licoes/quiz"
            className="card-surface flex items-center gap-3 border-hanko/30 transition-colors hover:border-hanko"
          >
            <span className="text-3xl leading-none" aria-hidden>
              📝
            </span>
            <div className="min-w-0">
              <div className="font-medium text-ink">Quiz</div>
              <div className="mt-0.5 text-sm text-sage">
                Teste seus conhecimentos com perguntas aleatórias das lições
              </div>
            </div>
          </Link>

          <Link
            to="/licoes/kakitori"
            className="card-surface flex items-center gap-3 border-indigo/30 transition-colors hover:border-indigo"
          >
            <span className="text-3xl leading-none" aria-hidden>
              🎧
            </span>
            <div className="min-w-0">
              <div className="font-medium text-ink">Kakitori</div>
              <div className="mt-0.5 text-sm text-sage">Ouça e escreva o que foi dito</div>
            </div>
          </Link>
        </div>
      </div>

      <div className="space-y-4 border-t border-line pt-6">
        <p className="text-sm font-medium text-ink">Estudar</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LICOES.map(({ meta }) => (
            <Link
              key={meta.id}
              to={`/licoes/${meta.id}`}
              className="card-surface block transition-colors hover:border-indigo"
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl leading-none" aria-hidden>
                  {meta.emoji}
                </span>
                <div className="min-w-0">
                  <div className="font-medium text-ink">{meta.title}</div>
                  <div className="mt-0.5 text-sm text-sage">{meta.subtitle}</div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {meta.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-line px-2 py-0.5 text-xs text-sage"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
