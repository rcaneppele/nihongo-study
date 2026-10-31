import { Link } from 'react-router-dom';
import { LEITURA_TEXTOS } from '../data/leitura/textos';
import type { ReadingText } from '../data/leitura/types';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, type ReadingProgress } from '../db/schema';
import { knownPercent, useKnownWords, type KnownWords } from '../features/leitura/knowledge';

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
      <div>
        <h1 className="font-display text-2xl font-semibold">Leitura</h1>
        <p className="text-sm text-sage">Textos curtos para praticar leitura corrida, do seu nível</p>
        <p className="mt-1 text-xs text-sage">
          O "% conhecido" conta as palavras que você já leu sem consultar e as dos seus flash cards. Textos com uns 90%
          ou mais são os melhores para ler com fluidez e ainda aprender algo novo.
        </p>
      </div>

      {NIVEIS.map(({ level, label, desc }) => {
        const textos = LEITURA_TEXTOS.filter((t) => t.level === level);
        if (textos.length === 0) return null;
        return (
          <section key={level} className="space-y-3">
            <div>
              <h2 className="font-display text-lg font-semibold">{label}</h2>
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
  return (
    <Link to={`/leitura/${texto.id}`} className="card-surface block space-y-1.5 transition-colors hover:border-indigo">
      <p className="font-jp text-lg">{texto.title}</p>
      <p className="text-sm text-sage">{texto.summaryPt}</p>
      <p className="text-xs text-sage/70">
        ~{texto.wordCount} palavras únicas
        {percent > 0 && <> · conhece ~{percent}%</>}
        {progress && <> · lido {progress.timesRead}×</>}
      </p>
    </Link>
  );
}
