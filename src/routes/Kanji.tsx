import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/schema';
import { KANJI_N5, type KanjiEntry } from '../data/kanji';
import { getAvailableNewKanji, getDueKanji, getStartedKanji } from '../features/kanji/kanjiQueue';
import KanjiLearn from '../features/kanji/KanjiLearn';
import KanjiReviewSession from '../features/kanji/KanjiReviewSession';
import KanjiDrawSession from '../features/kanji/KanjiDrawSession';

const NEW_BATCH_SIZES = [5, 10, 20];

type Session = { mode: 'aprender' | 'revisar' | 'caligrafia'; entries: KanjiEntry[] } | null;

export default function Kanji() {
  const [session, setSession] = useState<Session>(null);
  const [batchSize, setBatchSize] = useState(5);

  const learnedCount = useLiveQuery(() => db.kanjiProgress.count(), [], 0);
  const dueCount = useLiveQuery(
    () => db.kanjiProgress.where('dueDate').belowOrEqual(Date.now()).count(),
    [],
    0
  );
  const availableNew = KANJI_N5.length - learnedCount;

  async function startLearn() {
    const entries = await getAvailableNewKanji(batchSize);
    setSession({ mode: 'aprender', entries });
  }

  async function startReview() {
    const entries = shuffle(await getDueKanji());
    setSession({ mode: 'revisar', entries });
  }

  async function startDraw() {
    const entries = shuffle(await getStartedKanji());
    setSession({ mode: 'caligrafia', entries });
  }

  if (session) {
    const onDone = () => setSession(null);
    if (session.mode === 'aprender') return <KanjiLearn entries={session.entries} onDone={onDone} />;
    if (session.mode === 'revisar') return <KanjiReviewSession entries={session.entries} onDone={onDone} />;
    return <KanjiDrawSession entries={session.entries} onDone={onDone} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Kanji</h1>
        <p className="text-sm text-sage">Nível N5 · significado, leituras e traço</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="card-surface">
          <div className="font-display text-3xl font-semibold text-indigo">
            {learnedCount}/{KANJI_N5.length}
          </div>
          <div className="mt-1 text-sm text-sage">Aprendidos</div>
        </div>
        <div className="card-surface">
          <div className="font-display text-3xl font-semibold text-hanko">{dueCount}</div>
          <div className="mt-1 text-sm text-sage">Para revisar hoje</div>
        </div>
        <div className="card-surface">
          <div className="font-display text-3xl font-semibold text-ink">{availableNew}</div>
          <div className="mt-1 text-sm text-sage">Ainda não iniciados</div>
        </div>
      </div>

      <div className="card-surface space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-ink">Aprender kanji novos</p>
            <p className="text-xs text-sage">
              {availableNew > 0 ? `${availableNew} disponíveis` : 'Você já aprendeu todos os kanji do N5!'}
            </p>
          </div>
          <div className="inline-flex rounded-lg border border-line p-1">
            {NEW_BATCH_SIZES.map((n) => (
              <button
                key={n}
                onClick={() => setBatchSize(n)}
                className={[
                  'rounded-md px-3 py-1.5 text-sm transition-colors',
                  batchSize === n ? 'bg-indigo text-paper' : 'text-ink hover:bg-line/40',
                ].join(' ')}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
        <button className="btn-primary w-full" disabled={availableNew === 0} onClick={startLearn}>
          Aprender {Math.min(batchSize, availableNew)} kanji novos
        </button>
      </div>

      <div className="flex items-center justify-between rounded-lg border border-line p-4">
        <div>
          <p className="text-sm font-medium text-ink">📅 Revisar</p>
          <p className="text-xs text-sage">
            {dueCount > 0 ? `${dueCount} kanji esperando por você` : 'Nada pendente agora'}
          </p>
        </div>
        <button className="btn-ghost shrink-0" disabled={dueCount === 0} onClick={startReview}>
          Revisar
        </button>
      </div>

      <div className="flex items-center justify-between rounded-lg border border-line p-4">
        <div>
          <p className="text-sm font-medium text-ink">✍️ Praticar caligrafia</p>
          <p className="text-xs text-sage">
            {learnedCount > 0 ? `${learnedCount} kanji já aprendidos` : 'Aprenda um kanji primeiro'}
          </p>
        </div>
        <button className="btn-ghost shrink-0" disabled={learnedCount === 0} onClick={startDraw}>
          Praticar
        </button>
      </div>
    </div>
  );
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
