import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, type Card, newId } from '../db/schema';
import { freshSrs } from '../features/srs/fsrs';
import StudySession, { type StudyMode } from '../features/flashcards/StudySession';
import AudioButton from '../components/AudioButton';

export default function Flashcards() {
  const [category, setCategory] = useState<string>('todas');
  const [session, setSession] = useState<{ mode: StudyMode; cards: Card[] } | null>(null);
  const [configuringPractice, setConfiguringPractice] = useState(false);

  const cards = useLiveQuery(() => db.cards.toArray(), [], [] as Card[]);
  const categories = Array.from(
    new Set((cards ?? []).map((c) => c.category).filter(Boolean) as string[])
  ).sort();

  const filtered = (cards ?? []).filter((c) => category === 'todas' || c.category === category);
  const due = filtered.filter((c) => c.dueDate <= Date.now());

  function startReview() {
    setSession({ mode: 'review', cards: due });
  }

  function startPractice(pool: Card[]) {
    setSession({ mode: 'practice', cards: shuffle(pool) });
    setConfiguringPractice(false);
  }

  if (session) {
    return <StudySession cards={session.cards} mode={session.mode} onDone={() => setSession(null)} />;
  }

  if (configuringPractice) {
    return (
      <PracticeConfigScreen
        cards={cards ?? []}
        onStart={startPractice}
        onCancel={() => setConfiguringPractice(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold">Flash cards</h1>
          <p className="text-sm text-sage">
            {filtered.length} cards · {due.length} para revisar
          </p>
        </div>
        <div className="flex gap-2">
          <button
            className="btn-ghost"
            disabled={(cards ?? []).length === 0}
            onClick={() => setConfiguringPractice(true)}
          >
            Praticar
          </button>
          <button className="btn-primary" disabled={due.length === 0} onClick={startReview}>
            Estudar ({due.length})
          </button>
        </div>
      </div>

      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <Chip active={category === 'todas'} onClick={() => setCategory('todas')}>
            Todas
          </Chip>
          {categories.map((c) => (
            <Chip key={c} active={category === c} onClick={() => setCategory(c)}>
              {c}
            </Chip>
          ))}
        </div>
      )}

      <AddCardForm />

      <ul className="space-y-2">
        {filtered.map((card) => (
          <li key={card.id} className="card-surface flex items-center justify-between gap-4">
            <div className="flex items-center">
              <span className="font-jp text-lg">{card.front}</span>
              <AudioButton text={card.front} size="sm" />
              <span className="mx-2 text-line">·</span>
              <span className="text-sm">{card.back}</span>
              {card.category && (
                <span className="ml-2 rounded bg-line/60 px-2 py-0.5 text-xs text-sage">
                  {card.category}
                </span>
              )}
            </div>
            <button
              className="text-sm text-sage hover:text-hanko"
              onClick={() => db.cards.delete(card.id)}
              aria-label={`Excluir ${card.front}`}
            >
              Excluir
            </button>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="card-surface text-center text-sage">
            Nenhum card ainda. Adicione acima ou importe na tela de dados.
          </li>
        )}
      </ul>
    </div>
  );
}

const UNCATEGORIZED = '__sem_categoria__';

function PracticeConfigScreen({
  cards,
  onStart,
  onCancel,
}: {
  cards: Card[];
  onStart: (cards: Card[]) => void;
  onCancel: () => void;
}) {
  const categories = Array.from(new Set(cards.map((c) => c.category).filter(Boolean) as string[])).sort();
  const hasUncategorized = cards.some((c) => !c.category);
  const allKeys = hasUncategorized ? [...categories, UNCATEGORIZED] : categories;

  const [selected, setSelected] = useState<Set<string>>(new Set(allKeys));

  function toggle(key: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  const matching = cards.filter((c) => selected.has(c.category || UNCATEGORIZED));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Praticar livremente</h1>
        <p className="text-sm text-sage">Escolha as categorias que quer treinar</p>
      </div>

      {allKeys.length > 0 ? (
        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-medium text-ink">Categorias</p>
            <div className="flex gap-3 text-sm">
              <button className="text-indigo hover:underline" onClick={() => setSelected(new Set(allKeys))}>
                Todas
              </button>
              <button className="text-sage hover:underline" onClick={() => setSelected(new Set())}>
                Nenhuma
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {allKeys.map((key) => {
              const active = selected.has(key);
              const count = cards.filter((c) => (c.category || UNCATEGORIZED) === key).length;
              return (
                <button
                  key={key}
                  onClick={() => toggle(key)}
                  className={[
                    'rounded-full border px-3 py-1.5 text-sm transition-colors',
                    active ? 'border-indigo bg-indigo text-paper' : 'border-line text-ink hover:bg-line/40',
                  ].join(' ')}
                >
                  {key === UNCATEGORIZED ? 'Sem categoria' : key} ({count})
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <p className="text-sm text-sage">Nenhum card cadastrado ainda.</p>
      )}

      <div className="flex items-center justify-between rounded-lg border border-line p-4">
        <p className="text-sm text-sage">{matching.length} cards selecionados</p>
        <div className="flex gap-2">
          <button className="btn-ghost" onClick={onCancel}>
            Cancelar
          </button>
          <button className="btn-primary" disabled={matching.length === 0} onClick={() => onStart(matching)}>
            Iniciar prática
          </button>
        </div>
      </div>
    </div>
  );
}

function AddCardForm() {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [reading, setReading] = useState('');
  const [category, setCategory] = useState('');

  async function add() {
    if (!front.trim() || !back.trim()) return;
    const now = Date.now();
    const card: Card = {
      id: newId(),
      front: front.trim(),
      back: back.trim(),
      reading: reading.trim() || undefined,
      category: category.trim() || undefined,
      tags: [],
      ...freshSrs(now),
      createdAt: now,
      updatedAt: now,
    };
    await db.cards.add(card);
    setFront('');
    setBack('');
    setReading('');
    setCategory('');
  }

  return (
    <div className="card-surface space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="front">
            Frente (japonês)
          </label>
          <input id="front" className="field font-jp" value={front} onChange={(e) => setFront(e.target.value)} />
        </div>
        <div>
          <label className="label" htmlFor="back">
            Verso (significado)
          </label>
          <input id="back" className="field" value={back} onChange={(e) => setBack(e.target.value)} />
        </div>
        <div>
          <label className="label" htmlFor="reading">
            Leitura (opcional)
          </label>
          <input id="reading" className="field font-jp" value={reading} onChange={(e) => setReading(e.target.value)} />
        </div>
        <div>
          <label className="label" htmlFor="category">
            Categoria (opcional)
          </label>
          <input id="category" className="field" value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>
      </div>
      <button className="btn-primary" onClick={add} disabled={!front.trim() || !back.trim()}>
        Adicionar card
      </button>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        'rounded-full border px-3 py-1 text-sm transition-colors',
        active ? 'border-indigo bg-indigo text-paper' : 'border-line text-ink hover:bg-line/40',
      ].join(' ')}
    >
      {children}
    </button>
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
