import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/schema';
import { ALL_KANA } from '../data/kana';
import { KANJI_N5 } from '../data/kanji';
import { LEITURA_TEXTOS } from '../data/leitura/textos';
import { LICOES } from '../licoes';
import { buildReviewQueue } from '../features/flashcards/stages';
import { useKnownWords } from '../features/leitura/knowledge';

export default function Home() {
  const known = useKnownWords();
  // Mesma fila do "Estudar" em /flashcards (reconhecimento + produção).
  const dueCards = useLiveQuery(async () => buildReviewQueue(await db.cards.toArray()).length, [], 0);
  const kanaPracticed = useLiveQuery(() => db.kanaProgress.count(), [], 0);
  const kanjiDue = useLiveQuery(
    () => db.kanjiProgress.where('dueDate').belowOrEqual(Date.now()).count(),
    [],
    0
  );
  const kanjiLearned = useLiveQuery(() => db.kanjiProgress.count(), [], 0);

  return (
    <div className="space-y-6">
      <section>
        <h1 className="font-display text-3xl font-semibold text-center">こんにちは</h1>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Stat label="Para revisar hoje" value={dueCards} accent />
        <Stat
          label="Palavras compreendidas"
          value={known?.understood.size ?? 0}
          hint="Seu vocabulário passivo: palavras que você leu sem precisar consultar o significado, mais as dos flash cards que você já revisou."
        />
        <Stat
          label="Palavras que sei dizer"
          value={known?.canSay.size ?? 0}
          hint="Seu vocabulário ativo: flash cards no estágio Sei dizer ou Domino — você consegue dizer a palavra em japonês partindo do português."
        />
        <Stat label="Kana praticados" value={`${kanaPracticed}/${ALL_KANA.length}`} />
        <Stat label="Kanji aprendidos" value={`${kanjiLearned}/${KANJI_N5.length}`} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Action
          to="/flashcards"
          title="Revisar flash cards"
          desc={dueCards > 0 ? `${dueCards} esperando por você` : 'Nada pendente agora'}
        />
        <Action to="/kana" title="Treinar kana" desc="Hiragana e katakana" />
        <Action
          to="/kanji"
          title="Estudar kanji"
          desc={kanjiDue > 0 ? `${kanjiDue} para revisar` : 'N5 · significado, leitura e traço'}
        />
        <Action to="/leitura" title="Ler japonês" desc={`${LEITURA_TEXTOS.length} textos, com furigana`} />
        <Action to="/licoes" title="Lições" desc={`${LICOES.length} assuntos disponíveis`} />
        <Action to="/pontos-fracos" title="Pontos fracos" desc="O que você mais erra, para reforçar" />
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  accent,
  hint,
}: {
  label: string;
  value: number | string;
  accent?: boolean;
  hint?: string;
}) {
  // A explicação abre com toque (não só hover/title), pra funcionar no celular.
  const [showHint, setShowHint] = useState(false);

  return (
    <div className="card-surface">
      <div className={`font-display text-3xl font-semibold ${accent ? 'text-hanko' : 'text-indigo'}`}>
        {value}
      </div>
      <div className="mt-1 flex items-center gap-1 text-sm text-sage">
        {label}
        {hint && (
          <button
            type="button"
            className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-sage/60 text-[10px] leading-none hover:border-indigo hover:text-indigo"
            title={hint}
            aria-label={`O que é: ${label}`}
            aria-expanded={showHint}
            onClick={() => setShowHint((v) => !v)}
          >
            i
          </button>
        )}
      </div>
      {hint && showHint && <p className="mt-2 text-xs text-sage">{hint}</p>}
    </div>
  );
}

function Action({ to, title, desc }: { to: string; title: string; desc: string }) {
  return (
    <Link to={to} className="card-surface block transition-colors hover:border-indigo">
      <div className="font-medium">{title}</div>
      <div className="mt-1 text-sm text-sage">{desc}</div>
    </Link>
  );
}
