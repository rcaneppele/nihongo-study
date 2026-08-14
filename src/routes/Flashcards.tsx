import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, type Card, newId } from '../db/schema';
import { freshSrs } from '../features/srs/fsrs';
import StudySession, { type StudyMode } from '../features/flashcards/StudySession';
import ProgressStats from '../features/flashcards/ProgressStats';
import AudioButton from '../components/AudioButton';

type TabKey = 'estudar' | 'progresso';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'estudar', label: 'Estudar' },
  { key: 'progresso', label: 'Progresso' },
];

function asTabKey(value: string | null): TabKey | null {
  return TABS.some((t) => t.key === value) ? (value as TabKey) : null;
}

const PAGE_SIZE = 20;

export default function Flashcards() {
  const [params, setParams] = useSearchParams();
  const tab = asTabKey(params.get('tab')) ?? 'estudar';
  const [category, setCategory] = useState<string>('todas');
  const [search, setSearch] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [session, setSession] = useState<{ mode: StudyMode; cards: Card[] } | null>(null);
  const [configuringPractice, setConfiguringPractice] = useState(false);

  function setTab(key: TabKey) {
    setParams(key === 'estudar' ? {} : { tab: key }, { replace: true });
  }

  const cards = useLiveQuery(() => db.cards.toArray(), [], [] as Card[]);
  const categories = Array.from(
    new Set((cards ?? []).map((c) => c.category).filter(Boolean) as string[])
  ).sort();

  const all = cards ?? [];
  const filtered = all.filter((c) => category === 'todas' || c.category === category);
  // due é sempre sobre TODOS os cards, não sobre `filtered` — o chip de
  // categoria é só um filtro de exibição da lista abaixo (ver
  // regras-negocio.md), não deve reduzir silenciosamente o que "Estudar"
  // revisa. Quem quer estudar por categoria usa "Praticar" (tem seleção de
  // categoria própria e explícita, sem afetar o SRS).
  const due = all.filter((c) => c.dueDate <= Date.now());

  const query = search.trim().toLowerCase();
  const searched = query
    ? filtered.filter(
        (c) =>
          c.front.toLowerCase().includes(query) ||
          c.back.toLowerCase().includes(query) ||
          (c.reading ?? '').toLowerCase().includes(query)
      )
    : filtered;
  const visible = searched.slice(0, visibleCount);
  const remaining = searched.length - visible.length;

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [category, search]);

  // Se a categoria selecionada deixou de existir (ex.: apagou o último card
  // dela), volta pra "todas" — senão a lista fica presa vazia, sem chip
  // visível pra sair desse filtro (a fileira de chips só aparece se houver
  // categoria).
  useEffect(() => {
    if (category !== 'todas' && !categories.includes(category)) setCategory('todas');
  }, [category, categories]);

  function startReview() {
    // Embaralha, igual à prática — senão a ordem de revisão é sempre a
    // mesma (ordem de inserção no banco), e o usuário pode acabar
    // decorando a sequência dos cards em vez de lembrar cada um sozinho.
    setSession({ mode: 'review', cards: shuffle(due) });
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
            {all.length} cards · {due.length} para revisar
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

      <div role="tablist" aria-label="Seções de flash cards" className="flex gap-1 border-b border-line">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={tab === t.key}
            onClick={() => setTab(t.key)}
            className={[
              'rounded-t-lg px-4 py-2 text-sm font-medium transition-colors',
              tab === t.key ? 'border border-b-0 border-line bg-surface text-indigo' : 'text-sage hover:text-ink',
            ].join(' ')}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div role="tabpanel">
        {tab === 'progresso' ? (
          <ProgressStats />
        ) : (
          <div className="space-y-6">
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

            {filtered.length > 0 && (
              <div>
                <input
                  type="search"
                  className="field"
                  placeholder="Buscar por frente, verso ou leitura…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  aria-label="Buscar cards"
                />
                {query && (
                  <p className="mt-1 text-xs text-sage">
                    {searched.length} de {filtered.length} card(s)
                  </p>
                )}
              </div>
            )}

            <ul className="space-y-2">
              {visible.map((card) => (
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
              {filtered.length > 0 && searched.length === 0 && (
                <li className="card-surface text-center text-sage">Nenhum card encontrado para "{search}".</li>
              )}
            </ul>

            {remaining > 0 && (
              <button className="btn-ghost w-full" onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}>
                Carregar mais ({remaining} restante{remaining === 1 ? '' : 's'})
              </button>
            )}
          </div>
        )}
      </div>
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
