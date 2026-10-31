import { Link } from 'react-router-dom';
import { LEITURA_TEXTOS } from '../data/leitura/textos';
import type { ReadingText } from '../data/leitura/types';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, type ReadingProgress } from '../db/schema';
import { knownPercent, useKnownWords, type KnownWords } from '../features/leitura/knowledge';
import { BookOpenText, CheckCircle2, ChevronRight } from 'lucide-react';

const NIVEIS = [
  { level: 1 as const, label: 'Nível 1', desc: 'Bem iniciante — só hiragana/katakana' },
  { level: 2 as const, label: 'Nível 2', desc: 'Kanji comuns, com furigana' },
];

export default function Leitura() {
  const known = useKnownWords();
  const progress = useLiveQuery(() => db.readingProgress.toArray(), []);
  const progressById = new Map((progress ?? []).map((p) => [p.textId, p]));

  return (
    <div className="space-y-8">
      <div className="flex items-start gap-3">
        <span className="icon-tile h-11 w-11 rounded-2xl bg-matcha/12 text-matcha">
          <BookOpenText className="h-5 w-5" />
        </span>
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">Leitura</h1>
          <p className="text-sm text-sage">Textos curtos para praticar leitura corrida, do seu nível</p>
          <p className="mt-1 max-w-2xl text-xs text-sage">
            A barra mostra quanto do texto você já conhece (palavras lidas sem consultar + as dos seus flash cards).
            Textos com uns <span className="font-semibold text-matcha">90% ou mais</span> são os melhores para ler com
            fluidez e ainda aprender algo novo.
          </p>
        </div>
      </div>

      {NIVEIS.map(({ level, label, desc }) => {
        const textos = LEITURA_TEXTOS.filter((t) => t.level === level);
        if (textos.length === 0) return null;
        return (
          <section key={level} className="space-y-3">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h2 className="font-display text-lg font-semibold tracking-tight">{label}</h2>
              <p className="text-sm text-sage">{desc}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {textos.map((t) => (
                <TextoCard key={t.id} texto={t} known={known} progress={progressById.get(t.id)} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function TextoCard({
  texto,
  known,
  progress,
}: {
  texto: ReadingText;
  known?: KnownWords;
  progress?: ReadingProgress;
}) {
  const percent = known ? knownPercent(texto, known) : 0;
  // Faixa do "% conhecido": verde no ponto ideal (~90%+), âmbar perto, neutro abaixo.
  const barra = percent >= 90 ? 'bg-matcha' : percent >= 70 ? 'bg-kin' : 'bg-sage/50';

  return (
    <Link
      to={`/leitura/${texto.id}`}
      className="card-surface group flex min-w-0 flex-col gap-2 transition-colors hover:border-matcha/40"
    >
      <div className="flex items-start justify-between gap-2">
        <p className="font-jp text-lg font-medium">{texto.title}</p>
        {progress && (
          <span className="badge bg-matcha/12 text-matcha" title={`Lido ${progress.timesRead} vez(es)`}>
            <CheckCircle2 className="h-3 w-3" />
            {progress.timesRead > 1 ? `${progress.timesRead}×` : 'Lido'}
          </span>
        )}
      </div>
      <p className="flex-1 text-sm text-sage">{texto.summaryPt}</p>
      <div className="space-y-1">
        <div className="h-1.5 overflow-hidden rounded-full bg-line">
          <div className={`h-full rounded-full ${barra}`} style={{ width: `${percent}%` }} />
        </div>
        <p className="flex items-center justify-between text-xs text-sage">
          <span>
            {percent > 0 ? `conhece ~${percent}%` : 'ainda não lido'} · ~{texto.wordCount} palavras
          </span>
          <ChevronRight className="h-4 w-4 text-ink/30 transition-transform group-hover:translate-x-0.5" />
        </p>
      </div>
    </Link>
  );
}
