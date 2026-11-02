import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ChevronLeft, MessageCircle, PenLine } from 'lucide-react';
import { LICOES } from '../licoes';
import { marcarConcluida, marcarVista, useProgressoLicoes } from '../features/licoes/progresso';
import { promptsDaLicao } from '../data/diario/prompts';

export default function Licao() {
  const { id } = useParams<{ id: string }>();
  const entry = LICOES.find((l) => l.meta.id === id);
  const progresso = useProgressoLicoes();

  useEffect(() => {
    if (entry) void marcarVista(entry.meta.id);
  }, [entry]);

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
  const temDiario = promptsDaLicao(meta.id).length > 0;
  const concluidaEm = progresso?.get(meta.id)?.completedAt;

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

      <div className="card-hero flex flex-wrap items-center gap-4">
        <span
          className={`icon-tile h-11 w-11 rounded-2xl ${concluidaEm ? 'bg-matcha/12 text-matcha' : 'bg-fuji/12 text-fuji'}`}
        >
          <CheckCircle2 className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          {concluidaEm ? (
            <>
              <p className="font-medium">Lição concluída</p>
              <p className="text-sm text-sage">
                Em {new Date(concluidaEm).toLocaleDateString('pt-BR')}. Volte quando quiser rever.
              </p>
            </>
          ) : (
            <>
              <p className="font-medium">Terminou de estudar?</p>
              <p className="text-sm text-sage">Marque a lição como concluída para avançar na sua trilha.</p>
            </>
          )}
        </div>
        {concluidaEm ? (
          <button className="btn-ghost" onClick={() => void marcarConcluida(meta.id, false)}>
            Desmarcar
          </button>
        ) : (
          <button className="btn-dark" onClick={() => void marcarConcluida(meta.id, true)}>
            Concluí esta lição
          </button>
        )}
      </div>

      {temFrases && (
        <div className="card-surface flex flex-wrap items-center gap-4">
          <span className="icon-tile h-11 w-11 rounded-2xl bg-fuji/12 text-fuji">
            <MessageCircle className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-medium">Pratique esta lição</p>
            <p className="text-sm text-sage">Veja as frases em português e diga em japonês.</p>
          </div>
          <Link to={`/licoes/diga?licao=${meta.id}`} className="btn-ghost">
            Diga em japonês <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}

      {temDiario && (
        <div className="card-surface flex flex-wrap items-center gap-4">
          <span className="icon-tile h-11 w-11 rounded-2xl bg-kin/12 text-kin">
            <PenLine className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-medium">Escreva com esta lição</p>
            <p className="text-sm text-sage">Algumas frases suas no diário guiado, usando o que acabou de ver.</p>
          </div>
          <Link to={`/licoes/diario?licao=${meta.id}`} className="btn-ghost">
            Diário guiado <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
