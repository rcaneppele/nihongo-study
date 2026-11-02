import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, PartyPopper } from 'lucide-react';
import { trilhaDeLicoes, useProgressoLicoes } from './progresso';

/** "Sua trilha de lições": quantas concluídas e a próxima — no topo de Lições e no hub Aprender. */
export default function TrilhaLicoes() {
  const progresso = useProgressoLicoes();
  if (!progresso) return null;
  const { concluidas, total, proxima } = trilhaDeLicoes(progresso);
  const emAndamento = proxima && progresso.get(proxima.meta.id) !== undefined;

  return (
    <div className="card-surface flex flex-wrap items-center gap-4">
      <span className="icon-tile h-11 w-11 shrink-0 rounded-2xl bg-fuji/12 text-fuji">
        {proxima ? <BookOpen className="h-5 w-5" /> : <PartyPopper className="h-5 w-5" />}
      </span>
      <div className="min-w-0 flex-1 space-y-1.5">
        <p className="text-sm text-sage">
          <span className="font-semibold text-ink">
            {concluidas} de {total}
          </span>{' '}
          lições concluídas
        </p>
        <div className="h-1.5 overflow-hidden rounded-full bg-line">
          <div className="h-full rounded-full bg-fuji" style={{ width: `${(concluidas / total) * 100}%` }} />
        </div>
      </div>
      {proxima ? (
        <Link to={`/licoes/${proxima.meta.id}`} className="btn-ghost shrink-0">
          {emAndamento ? 'Continuar' : 'Próxima'}: {proxima.meta.emoji} {proxima.meta.title}
          <ArrowRight className="h-4 w-4" />
        </Link>
      ) : (
        <p className="text-sm text-sage">Trilha completa! Revisite as lições quando quiser.</p>
      )}
    </div>
  );
}
