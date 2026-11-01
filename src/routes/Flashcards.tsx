import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { usePendencias } from '../features/metodo/pendencias';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, type Card, newId } from '../db/schema';
import { apagar } from '../db/local';
import { freshSrs } from '../features/srs/fsrs';
import StudySession, { type StudyMode } from '../features/flashcards/StudySession';
import { buildReviewQueue, type Direction, type StudyItem } from '../features/flashcards/stages';
import { StageAction, StageChip } from '../features/flashcards/StageControls';
import { NoteEditor } from '../features/flashcards/CardNote';
import AudioButton from '../components/AudioButton';
import { Layers, Play, Plus, Search, Shuffle, Sparkles, Trash2 } from 'lucide-react';
import PageHeader from '../components/PageHeader';

// Abas que existiam aqui e viraram páginas do método: links antigos
// (`/flashcards?tab=…`) redirecionam pro lugar novo.
const ABAS_MOVIDAS: Record<string, string> = {
  vocabulario: '/aprender/palavras',
  progresso: '/progresso',
};

const PAGE_SIZE = 20;

/**
 * "Meus cards" (Revisar › Meus cards): a lista dos flash cards — buscar,
 * criar, anotar, mudar estágio — e a prática livre. A revisão (FSRS) fica
 * num lugar só, a Revisão do dia em /revisar (cards + kanji).
 */
export default function Flashcards() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const pendencias = usePendencias();
  const abaMovida = ABAS_MOVIDAS[params.get('tab') ?? ''];
  const [category, setCategory] = useState<string>('todas');
  const [search, setSearch] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [session, setSession] = useState<{ mode: StudyMode; items: StudyItem[] } | null>(null);
  // `?praticar=producao` vem de Praticar › Falar: abre direto a prática na
  // direção "dizer em japonês".
  const praticarProducao = params.get('praticar') === 'producao';
  const [configuringPractice, setConfiguringPractice] = useState(praticarProducao);
  const [adding, setAdding] = useState(false);

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
  // categoria própria e explícita, sem afetar o SRS). Inclui as duas
  // direções (reconhecimento e produção) — ver stages.ts.
  const due = buildReviewQueue(all);

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

  // Na prática livre, qualquer card serve nas duas direções (nada é
  // gravado), independente do estágio.
  function startPractice(pool: Card[], direction: Direction) {
    setSession({ mode: 'practice', items: shuffle(pool).map((card) => ({ card, direction })) });
    setConfiguringPractice(false);
  }

  if (abaMovida) return <Navigate to={abaMovida} replace />;

  if (session) {
    return <StudySession items={session.items} mode={session.mode} onDone={() => setSession(null)} />;
  }

  if (configuringPractice) {
    return (
      <PracticeConfigScreen
        // Remonta quando os cards chegam do banco — vindo direto pela URL
        // (?praticar=producao) a tela abre antes do carregamento, e a seleção
        // inicial ("todas as categorias") ficaria vazia.
        key={(cards ?? []).length > 0 ? 'carregado' : 'carregando'}
        cards={cards ?? []}
        initialDirection={praticarProducao ? 'production' : 'recognition'}
        onStart={startPractice}
        onCancel={() => setConfiguringPractice(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        icon={<Layers className="h-5 w-5" />}
        cor="sora"
        title="Meus cards"
        subtitle={`${all.length} cards · ${due.length} para revisar`}
      >
        <button className="btn-ghost" disabled={(cards ?? []).length === 0} onClick={() => setConfiguringPractice(true)}>
          <Shuffle className="h-4 w-4" />
          Praticar
        </button>
        {/* Revisar fica num lugar só — a Revisão do dia (cards + kanji). */}
        <Link to="/revisar" className="btn-primary">
          <Play className="h-4 w-4" />
          Revisão do dia{pendencias.revisao > 0 ? ` (${pendencias.revisao})` : ''}
        </Link>
      </PageHeader>

      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {categories.length > 0 ? (
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
          ) : (
            <span />
          )}
          {!adding && (
            <button className="btn-ghost" onClick={() => setAdding(true)}>
              <Plus className="h-4 w-4" />
              Novo card
            </button>
          )}
        </div>

        {adding && <AddCardForm onClose={() => setAdding(false)} />}

        {filtered.length > 0 && (
          <div>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sage" />
              <input
                type="search"
                className="field pl-9"
                placeholder="Buscar por frente, verso ou leitura…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Buscar cards"
              />
            </div>
            {query && (
              <p className="mt-1 text-xs text-sage">
                {searched.length} de {filtered.length} card(s)
              </p>
            )}
          </div>
        )}

        <ul className="space-y-2">
          {visible.map((card) => (
            <li key={card.id} className="card-surface flex flex-wrap items-center gap-x-4 gap-y-2 p-4">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="font-jp text-lg">{card.front}</span>
                  <AudioButton text={card.front} size="sm" />
                  <StageChip card={card} />
                  {card.category && (
                    <span className="badge bg-line/70 font-medium text-sage">{card.category}</span>
                  )}
                </div>
                <p className="truncate text-sm text-sage">
                  {card.reading && <span className="font-jp">{card.reading} · </span>}
                  <span className="text-ink">{card.back}</span>
                </p>
              </div>
              <NoteEditor key={card.updatedAt} card={card} />
              <div className="flex shrink-0 items-center gap-3">
                <StageAction card={card} />
                <button
                  className="grid h-8 w-8 place-items-center rounded-full text-sage transition-colors hover:bg-hanko/10 hover:text-hanko"
                  onClick={() => apagar('cards', card.id)}
                  aria-label={`Excluir ${card.front}`}
                  title="Excluir card"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="card-surface flex flex-col items-center gap-3 py-10 text-center">
              <span className="icon-tile h-12 w-12 rounded-2xl bg-sora/12 text-sora">
                <Layers className="h-6 w-6" />
              </span>
              <div>
                <p className="font-medium">Nenhum card ainda</p>
                <p className="text-sm text-sage">
                  Comece pelas palavras mais úteis do N5, salve palavras da leitura ou crie um card.
                </p>
              </div>
              <button className="btn-primary" onClick={() => navigate('/aprender/palavras')}>
                <Sparkles className="h-4 w-4" />
                Escolher palavras para aprender
              </button>
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
    </div>
  );
}

const UNCATEGORIZED = '__sem_categoria__';

function PracticeConfigScreen({
  cards,
  onStart,
  onCancel,
  initialDirection,
}: {
  cards: Card[];
  onStart: (cards: Card[], direction: Direction) => void;
  onCancel: () => void;
  initialDirection: Direction;
}) {
  const [direction, setDirection] = useState<Direction>(initialDirection);
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
                  className={`chip ${active ? 'chip-active' : ''}`}
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

      <div>
        <p className="mb-2 text-sm font-medium text-ink">Direção</p>
        <div className="flex flex-wrap gap-2">
          {PRACTICE_DIRECTIONS.map((d) => (
            <Chip key={d.key} active={direction === d.key} onClick={() => setDirection(d.key)}>
              {d.label}
            </Chip>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between rounded-lg border border-line p-4">
        <p className="text-sm text-sage">{matching.length} cards selecionados</p>
        <div className="flex gap-2">
          <button className="btn-ghost" onClick={onCancel}>
            Cancelar
          </button>
          <button className="btn-primary" disabled={matching.length === 0} onClick={() => onStart(matching, direction)}>
            Iniciar prática
          </button>
        </div>
      </div>
    </div>
  );
}

const PRACTICE_DIRECTIONS: { key: Direction; label: string }[] = [
  { key: 'recognition', label: 'Reconhecer (japonês → português)' },
  { key: 'production', label: 'Dizer em japonês (português → japonês)' },
];

function AddCardForm({ onClose }: { onClose: () => void }) {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [reading, setReading] = useState('');
  const [category, setCategory] = useState('');
  const [note, setNote] = useState('');

  async function add() {
    if (!front.trim() || !back.trim()) return;
    const now = Date.now();
    const card: Card = {
      id: newId(),
      front: front.trim(),
      back: back.trim(),
      reading: reading.trim() || undefined,
      category: category.trim() || undefined,
      note: note.trim() || undefined,
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
    setNote('');
  }

  return (
    <div className="card-surface space-y-3">
      <p className="font-medium">Novo card</p>
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
        <div className="sm:col-span-2">
          <label className="label" htmlFor="note">
            Nota (opcional)
          </label>
          <input
            id="note"
            className="field"
            placeholder="Origem da palavra, uso, falso amigo…"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-2">
        <button className="btn-primary" onClick={add} disabled={!front.trim() || !back.trim()}>
          Adicionar card
        </button>
        <button className="btn-ghost" onClick={onClose}>
          Fechar
        </button>
      </div>
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
      className={`chip ${active ? 'chip-active' : ''}`}
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
