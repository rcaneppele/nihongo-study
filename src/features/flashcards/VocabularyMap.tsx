import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../db/schema';
import { n5CategoryCounts } from '../../data/seed/n5';
import AudioButton from '../../components/AudioButton';
import ProgressRing from '../../components/ProgressRing';
import { Shuffle, Sparkles } from 'lucide-react';
import { StageAction } from './StageControls';
import { NoteBox } from './CardNote';
import { cardNote } from './note';
import type { StudyItem } from './stages';
import {
  buildVocabulary,
  byUsefulness,
  KNOWN_STATES,
  learnWords,
  markKnown,
  practiceCard,
  unmarkKnown,
  WORD_STATE_LABELS,
  WORD_STATE_ORDER,
  type VocabWord,
  type WordState,
} from './vocabulary';

const BATCH = 10;

// Cores por estado — as mesmas dos estágios na lista de cards e no Progresso
// (STAGE_BADGE/STAGE_BAR em stages.ts): neutro → azul claro → azul → verde.
// `hanko` fica de fora de propósito (reservado a destaque/perigo).
const TILE_CLASSES: Record<WordState, string> = {
  nova: 'border-line/70 bg-surface text-ink',
  naFila: 'border-dashed border-sora/50 bg-surface text-ink',
  reconheco: 'border-sora/20 bg-sora/12 text-ink',
  seiDizer: 'border-sora bg-sora text-paper',
  domino: 'border-matcha/30 bg-matcha/15 text-ink',
};

const DOT_CLASSES: Record<WordState, string> = {
  nova: 'border border-line bg-surface',
  naFila: 'border border-dashed border-sora/60 bg-surface',
  reconheco: 'bg-sora/40',
  seiDizer: 'bg-sora',
  domino: 'bg-matcha',
};

const BADGE_CLASSES: Record<WordState, string> = {
  nova: 'bg-line/70 text-sage',
  naFila: 'bg-sora/8 text-sora',
  reconheco: 'bg-sora/12 text-sora',
  seiDizer: 'bg-sora text-paper',
  domino: 'bg-matcha/15 text-matcha',
};

/**
 * Aba "Vocabulário" de /flashcards: o deck N5 por categoria, cada palavra
 * colorida pelo estado (nova → domino), com % conhecido, "Aprender as
 * próximas 10" (cria os cards em ordem de utilidade), "Testar 10" (prática
 * livre das já conhecidas) e um painel com a palavra selecionada — por
 * padrão, a mais útil que o usuário ainda não sabe.
 */
export default function VocabularyMap({ onPractice }: { onPractice: (items: StudyItem[]) => void }) {
  const [category, setCategory] = useState<string>('todas');
  const [selectedFront, setSelectedFront] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const data = useLiveQuery(async () => {
    const [cards, knowledge] = await Promise.all([db.cards.toArray(), db.wordKnowledge.toArray()]);
    return buildVocabulary(cards, knowledge);
  }, []);

  if (!data) return null;

  const words = data.filter((w) => category === 'todas' || w.entry.category === category);
  const counts = Object.fromEntries(WORD_STATE_ORDER.map((s) => [s, 0])) as Record<WordState, number>;
  for (const w of words) counts[w.state]++;
  const known = KNOWN_STATES.reduce((sum, s) => sum + counts[s], 0);
  const percent = words.length ? Math.round((known / words.length) * 100) : 0;

  const nextNew = words.filter((w) => w.state === 'nova').sort(byUsefulness);
  const knownWords = words.filter((w) => KNOWN_STATES.includes(w.state));
  const selected =
    words.find((w) => w.entry.front === selectedFront) ?? nextNew[0] ?? [...words].sort(byUsefulness)[0];
  const isSuggestion = !selectedFront || selected?.entry.front !== selectedFront;
  // Grade em ordem de utilidade, igual à ordem em que "Aprender" pega as palavras.
  const sorted = [...words].sort(byUsefulness);

  async function learnNext() {
    const batch = nextNew.slice(0, BATCH);
    const n = await learnWords(batch);
    setMsg(`${n} card(s) criado(s) — já estão em "Estudar", no topo da página.`);
  }

  function testKnown() {
    const pool = [...knownWords].sort(() => Math.random() - 0.5).slice(0, BATCH);
    onPractice(pool.map((w) => ({ card: practiceCard(w), direction: 'recognition' })));
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        <Chip active={category === 'todas'} onClick={() => setCategory('todas')}>
          Todas
        </Chip>
        {n5CategoryCounts().map((c) => (
          <Chip key={c.category} active={category === c.category} onClick={() => setCategory(c.category)}>
            {c.category}
          </Chip>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="space-y-5">
          <section className="card-hero grid gap-5 sm:grid-cols-[auto_minmax(0,1fr)]">
            <div>
              <p className="text-xs text-sage">
                {category === 'todas' ? 'Vocabulário N5' : category} · {words.length} palavras
              </p>
              <div className="mt-3 flex items-center gap-4">
                <ProgressRing fracao={percent / 100} cor="matcha">
                  <div>
                    <p className="text-xl font-semibold">{percent}%</p>
                    <p className="mt-0.5 text-[11px] text-sage">conhecido</p>
                  </div>
                </ProgressRing>
              <div className="grid grid-cols-1 gap-y-1 text-sm">
                {WORD_STATE_ORDER.map((s) => (
                  <span key={s} className="flex items-center gap-1.5">
                    <span className={`inline-block h-2.5 w-2.5 rounded-sm ${DOT_CLASSES[s]}`} />
                    <span className="font-medium">{counts[s]}</span>
                    <span className="text-sage">{WORD_STATE_LABELS[s]}</span>
                  </span>
                ))}
              </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:justify-center">
              <button className="btn-primary justify-start" disabled={nextNew.length === 0} onClick={learnNext}>
                <Sparkles className="h-4 w-4" />
                Aprender as próximas {Math.min(BATCH, nextNew.length) || BATCH}
              </button>
              <button className="btn-ghost justify-start" disabled={knownWords.length === 0} onClick={testKnown}>
                <Shuffle className="h-4 w-4" />
                Testar {Math.min(BATCH, knownWords.length) || BATCH} que já conheço
              </button>
              <p className="text-xs text-sage">
                "Aprender" cria cards das palavras novas mais úteis (as que mais aparecem nos textos de leitura).
                "Testar" é prática livre — não mexe na agenda de revisão.
              </p>
              {msg && <p className="text-xs text-indigo">{msg}</p>}
            </div>
          </section>

          <section className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-4">
            {sorted.map((w) => (
              <button
                key={w.entry.front}
                onClick={() => setSelectedFront(w.entry.front)}
                className={`rounded-xl border px-3 py-2 text-left transition-shadow hover:shadow-card ${TILE_CLASSES[w.state]} ${
                  selected?.entry.front === w.entry.front ? 'ring-2 ring-indigo ring-offset-2 ring-offset-paper' : ''
                }`}
              >
                <span className="block font-jp text-base">{w.entry.front}</span>
                <span className="block truncate text-xs opacity-75">{w.entry.back}</span>
              </button>
            ))}
          </section>
        </div>

        {selected && <WordPanel word={selected} isSuggestion={isSuggestion} />}
      </div>
    </div>
  );
}

function WordPanel({ word, isSuggestion }: { word: VocabWord; isSuggestion: boolean }) {
  const { entry, state, card, texts } = word;
  // "Já sei" só pode ser desfeito se veio do mapa — se a palavra já foi lida
  // numa leitura concluída, o registro é da leitura.
  const markedHere = state === 'reconheco' && !card && (word.knowledge?.seenCount ?? 0) === 0;

  return (
    <aside className="card-hero h-fit space-y-4 lg:sticky lg:top-4">
      <p className="text-xs text-sage">
        {isSuggestion && state === 'nova' ? 'Próxima palavra mais útil que você ainda não sabe' : entry.category}
      </p>
      <div>
        <div className="flex items-center gap-2">
          <p className="font-jp text-3xl">{entry.front}</p>
          <AudioButton text={entry.front} />
        </div>
        <p className="text-sm text-sage">{entry.reading}</p>
        <p className="mt-1 text-lg">{entry.back}</p>
      </div>

      {(card ? cardNote(card) : entry.note) && <NoteBox note={(card ? cardNote(card) : entry.note)!} />}

      <span className={`badge ${BADGE_CLASSES[state]}`}>{WORD_STATE_LABELS[state]}</span>

      <div className="text-sm">
        {texts.length === 0 ? (
          <p className="text-sage">Ainda não aparece nos textos de leitura.</p>
        ) : (
          <>
            <p className="text-sage">Aparece em {texts.length} texto(s) de leitura:</p>
            <ul className="mt-1 space-y-0.5">
              {texts.slice(0, 4).map((t) => (
                <li key={t.id}>
                  <Link to={`/leitura/${t.id}`} className="font-jp text-indigo hover:underline">
                    {t.title}
                  </Link>
                </li>
              ))}
              {texts.length > 4 && <li className="text-xs text-sage">e mais {texts.length - 4}</li>}
            </ul>
          </>
        )}
      </div>

      <div className="space-y-2 border-t border-line pt-4">
        {!card && state === 'nova' && (
          <>
            <button className="btn-primary w-full" onClick={() => learnWords([word])}>
              Aprender (criar card)
            </button>
            <button className="btn-ghost w-full" onClick={() => markKnown(word)}>
              Já sei esta palavra
            </button>
          </>
        )}
        {!card && state === 'reconheco' && (
          <>
            <p className="text-xs text-sage">
              Você já compreende esta palavra{markedHere ? ' (marcada aqui no mapa)' : ' (de uma leitura)'}. Crie o card
              se quiser revisar e treinar dizê-la em japonês.
            </p>
            <button className="btn-ghost w-full" onClick={() => learnWords([word])}>
              Criar card
            </button>
            {markedHere && (
              <button className="w-full text-xs text-sage hover:text-hanko" onClick={() => unmarkKnown(word)}>
                Desmarcar "já sei"
              </button>
            )}
          </>
        )}
        {card && (
          <div className="flex items-center justify-between gap-2 text-sm">
            <span className="text-sage">Está nos seus flash cards.</span>
            <StageAction card={card} />
          </div>
        )}
      </div>
    </aside>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`chip ${active ? 'chip-active' : ''}`}
    >
      {children}
    </button>
  );
}
