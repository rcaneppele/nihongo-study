import { Link } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/schema';
import { ALL_KANA } from '../data/kana';

export default function Home() {
  const totalCards = useLiveQuery(() => db.cards.count(), [], 0);
  const dueCards = useLiveQuery(
    () => db.cards.where('dueDate').belowOrEqual(Date.now()).count(),
    [],
    0
  );
  const kanaPracticed = useLiveQuery(() => db.kanaProgress.count(), [], 0);

  return (
    <div className="space-y-6">
      <section>
        <h1 className="font-display text-3xl font-semibold text-center">こんにちは</h1>
      </section>

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Para revisar hoje" value={dueCards} accent />
        <Stat label="Cards no total" value={totalCards} />
        <Stat label="Kana praticados" value={`${kanaPracticed}/${ALL_KANA.length}`} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Action
          to="/flashcards"
          title="Revisar flash cards"
          desc={dueCards > 0 ? `${dueCards} esperando por você` : 'Nada pendente agora'}
        />
        <Action to="/kana" title="Treinar kana" desc="Hiragana e katakana" />
      </div>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: number | string; accent?: boolean }) {
  return (
    <div className="card-surface">
      <div className={`font-display text-3xl font-semibold ${accent ? 'text-hanko' : 'text-indigo'}`}>
        {value}
      </div>
      <div className="mt-1 text-sm text-sage">{label}</div>
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
