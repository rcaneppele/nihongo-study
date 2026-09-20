import { Link } from 'react-router-dom';
import { LEITURA_TEXTOS } from '../data/leitura/textos';
import type { ReadingText } from '../data/leitura/types';

const NIVEIS = [
  { level: 1 as const, label: 'Nível 1', desc: 'Bem iniciante — só hiragana/katakana' },
  { level: 2 as const, label: 'Nível 2', desc: 'Kanji comuns, com furigana' },
];

export default function Leitura() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold">Leitura</h1>
        <p className="text-sm text-sage">Textos curtos para praticar leitura corrida, do seu nível</p>
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
                <TextoCard key={t.id} texto={t} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function TextoCard({ texto }: { texto: ReadingText }) {
  return (
    <Link to={`/leitura/${texto.id}`} className="card-surface block space-y-1.5 transition-colors hover:border-indigo">
      <p className="font-jp text-lg">{texto.title}</p>
      <p className="text-sm text-sage">{texto.summaryPt}</p>
      <p className="text-xs text-sage/70">~{texto.wordCount} palavras únicas</p>
    </Link>
  );
}
