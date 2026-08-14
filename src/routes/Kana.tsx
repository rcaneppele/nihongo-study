import { useEffect, useRef, useState } from 'react';
import { db, type KanaProgress, type KanaType } from '../db/schema';
import { KANA_FAMILIES, familyPreview, getKanaByFamilies, type KanaEntry, type KanaGroup } from '../data/kana';
import KanaCanvas from '../components/KanaCanvas';
import AudioButton from '../components/AudioButton';
import { getReferenceStrokes, scoreDrawing, type DrawScore, type ReferenceStrokes, type Stroke } from '../features/kana/strokes';
import { useHoldToPauseAdvance } from '../lib/useHoldToPauseAdvance';

const CANVAS_SIZE = 280;
const STROKE_COLORS = ['text-indigo', 'text-hanko', 'text-sage', 'text-indigo-soft', 'text-ink'];
/** Tempo até avançar sozinho pra próxima pergunta após responder (o usuário pode tocar "Próximo" a qualquer momento pra pular a espera). Errar dá mais tempo pra ler a resposta certa. */
const AUTO_ADVANCE_RIGHT_MS = 1100;
const AUTO_ADVANCE_WRONG_MS = 2600;
/** Igual ao acima, mas para o modo desenho: só começa a contar depois que a animação do traço
 * correto termina, e o tempo é maior porque tem % + dicas pra ler, além da própria animação. */
const AUTO_ADVANCE_DRAW_RIGHT_MS = 3000;
const AUTO_ADVANCE_DRAW_WRONG_MS = 6000;

type Mode = 'romaji' | 'desenho';
type Script = KanaType | 'both';
type Stage = 'config' | 'test' | 'result';

interface TestAnswer {
  entry: KanaEntry;
  correct: boolean;
}

const SINGLE_FAMILIES = KANA_FAMILIES.filter((f) => f.group === 'single').map((f) => f.key);

export default function Kana() {
  const [stage, setStage] = useState<Stage>('config');
  const [mode, setMode] = useState<Mode>('romaji');
  const [script, setScript] = useState<Script>('hiragana');
  const [selected, setSelected] = useState<Set<string>>(new Set(SINGLE_FAMILIES));
  const [pool, setPool] = useState<KanaEntry[]>([]);
  const [answers, setAnswers] = useState<TestAnswer[]>([]);

  function toggleFamily(key: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function setGroupSelection(group: KanaGroup, on: boolean) {
    const keys = KANA_FAMILIES.filter((f) => f.group === group).map((f) => f.key);
    setSelected((prev) => {
      const next = new Set(prev);
      keys.forEach((k) => (on ? next.add(k) : next.delete(k)));
      return next;
    });
  }

  async function startTest() {
    const entries = getKanaByFamilies(script, selected);
    const progress = await db.kanaProgress.bulkGet(entries.map((e) => e.char));
    setPool(shuffle(buildWeightedPool(entries, progress, mode)));
    setAnswers([]);
    setStage('test');
  }

  function finishTest(result: TestAnswer[]) {
    setAnswers(result);
    setStage('result');
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Treino de kana</h1>
        <p className="text-sm text-sage">Hiragana e katakana</p>
      </div>

      {stage === 'config' && (
        <ConfigScreen
          mode={mode}
          setMode={setMode}
          script={script}
          setScript={setScript}
          selected={selected}
          onToggleFamily={toggleFamily}
          onSetGroupSelection={setGroupSelection}
          onStart={startTest}
        />
      )}

      {stage === 'test' && (
        <KanaTest pool={pool} mode={mode} onFinish={finishTest} onCancel={() => setStage('config')} />
      )}

      {stage === 'result' && (
        <ResultScreen
          answers={answers}
          onRestart={startTest}
          onBackToConfig={() => setStage('config')}
        />
      )}
    </div>
  );
}

function ConfigScreen({
  mode,
  setMode,
  script,
  setScript,
  selected,
  onToggleFamily,
  onSetGroupSelection,
  onStart,
}: {
  mode: Mode;
  setMode: (m: Mode) => void;
  script: Script;
  setScript: (s: Script) => void;
  selected: Set<string>;
  onToggleFamily: (key: string) => void;
  onSetGroupSelection: (group: KanaGroup, on: boolean) => void;
  onStart: () => void;
}) {
  const single = KANA_FAMILIES.filter((f) => f.group === 'single');
  const composite = KANA_FAMILIES.filter((f) => f.group === 'composite');
  const previewType: KanaType = script === 'katakana' ? 'katakana' : 'hiragana';
  const selectedCount = getKanaByFamilies(script, selected).length;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <p className="label">Modo de treino</p>
          <Segment
            value={mode}
            onChange={(v) => setMode(v as Mode)}
            options={[
              { value: 'romaji', label: 'Digitar romaji' },
              { value: 'desenho', label: 'Desenhar' },
            ]}
          />
        </div>
        <div className="space-y-1.5">
          <p className="label">Escrita</p>
          <Segment
            value={script}
            onChange={(v) => setScript(v as Script)}
            options={[
              { value: 'hiragana', label: 'Hiragana' },
              { value: 'katakana', label: 'Katakana' },
              { value: 'both', label: 'Ambos' },
            ]}
          />
        </div>
      </div>

      <FamilyGroup
        title="Básicos (seion, dakuten, handakuten)"
        families={single}
        selected={selected}
        previewType={previewType}
        onToggle={onToggleFamily}
        onSelectAll={() => onSetGroupSelection('single', true)}
        onSelectNone={() => onSetGroupSelection('single', false)}
      />

      <FamilyGroup
        title="Combinados (yōon)"
        families={composite}
        selected={selected}
        previewType={previewType}
        onToggle={onToggleFamily}
        onSelectAll={() => onSetGroupSelection('composite', true)}
        onSelectNone={() => onSetGroupSelection('composite', false)}
      />

      <div className="flex items-center justify-between rounded-lg border border-line p-4">
        <p className="text-sm text-sage">{selectedCount} kana selecionados</p>
        <button className="btn-primary" disabled={selectedCount === 0} onClick={onStart}>
          Iniciar teste
        </button>
      </div>
    </div>
  );
}

function FamilyGroup({
  title,
  families,
  selected,
  previewType,
  onToggle,
  onSelectAll,
  onSelectNone,
}: {
  title: string;
  families: Array<{ key: string; group: KanaGroup }>;
  selected: Set<string>;
  previewType: KanaType;
  onToggle: (key: string) => void;
  onSelectAll: () => void;
  onSelectNone: () => void;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-medium text-ink">{title}</p>
        <div className="flex gap-3 text-sm">
          <button className="text-indigo hover:underline" onClick={onSelectAll}>
            Todos
          </button>
          <button className="text-sage hover:underline" onClick={onSelectNone}>
            Nenhum
          </button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8">
        {families.map((f) => {
          const active = selected.has(f.key);
          return (
            <button
              key={f.key}
              onClick={() => onToggle(f.key)}
              className={[
                'rounded-lg border p-2 text-center transition-colors',
                active ? 'border-indigo bg-indigo/10' : 'border-line hover:bg-line/30',
              ].join(' ')}
            >
              <p className="font-jp text-lg leading-tight">{familyPreview(previewType, f.key)}</p>
              <p className="text-xs text-sage">{f.key}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function KanaTest({
  pool,
  mode,
  onFinish,
  onCancel,
}: {
  pool: KanaEntry[];
  mode: Mode;
  onFinish: (answers: TestAnswer[]) => void;
  onCancel: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<TestAnswer[]>([]);
  const current = pool[index];

  function record(correct: boolean) {
    const next = [...answers, { entry: current, correct }];
    if (index + 1 >= pool.length) {
      onFinish(next);
    } else {
      setAnswers(next);
      setIndex(index + 1);
    }
  }

  const correctSoFar = answers.filter((a) => a.correct).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm text-sage">
        <span>
          {index + 1} / {pool.length}
        </span>
        <span>
          {correctSoFar} acerto{correctSoFar === 1 ? '' : 's'}
        </span>
        <button className="text-xs text-sage hover:text-hanko hover:underline" onClick={onCancel}>
          Desistir e voltar à seleção
        </button>
      </div>

      {mode === 'romaji' ? (
        <RomajiQuestion key={current.char + index} entry={current} onAnswered={record} />
      ) : (
        <DrawQuestion key={current.char + index} entry={current} onAnswered={record} />
      )}
    </div>
  );
}

function RomajiQuestion({
  entry,
  onAnswered,
}: {
  entry: KanaEntry;
  onAnswered: (correct: boolean) => void;
}) {
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<'idle' | 'right' | 'wrong'>('idle');
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const advanceMs = feedback === 'right' ? AUTO_ADVANCE_RIGHT_MS : AUTO_ADVANCE_WRONG_MS;
  const paused = useHoldToPauseAdvance(advanceMs, () => onAnswered(feedback === 'right'), feedback !== 'idle');

  useEffect(() => {
    if (feedback === 'idle') return;
    // setTimeout(0) garante que o keydown/keyup do Enter atual já terminou
    // antes de focar o botão — evita que o mesmo Enter dispare o clique
    const focusId = setTimeout(() => nextBtnRef.current?.focus(), 0);
    return () => clearTimeout(focusId);
  }, [feedback]);

  async function check(giveUp = false) {
    if (feedback !== 'idle') return;
    if (!giveUp && !answer.trim()) return;
    const correct = !giveUp && answer.trim().toLowerCase() === entry.romaji;
    setFeedback(correct ? 'right' : 'wrong');
    await updateProgress(entry, correct);
  }

  return (
    <div className="card-surface space-y-4 text-center">
      <div className="flex items-center justify-center gap-2">
        <p className="font-jp text-7xl">{entry.char}</p>
        <AudioButton text={entry.char} />
      </div>

      {feedback === 'idle' ? (
        <div className="mx-auto flex max-w-md items-center gap-2">
          <input
            autoFocus
            className="field text-center"
            placeholder="romaji"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && check()}
          />
          <button className="btn-primary" onClick={() => check()} disabled={!answer.trim()}>
            Verificar
          </button>
          <button className="btn-ghost ml-4 shrink-0 whitespace-nowrap px-6" onClick={() => check(true)}>
            Não sei
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <p className={feedback === 'right' ? 'text-indigo' : 'text-hanko'}>
            {feedback === 'right' ? 'Certo!' : `Era "${entry.romaji}"`}
          </p>
          <div className="mx-auto flex max-w-[10rem] flex-col items-center gap-1">
            <button ref={nextBtnRef} className="btn-primary w-full" onClick={() => onAnswered(feedback === 'right')}>
              Próximo
            </button>
            <div className="h-1 w-full overflow-hidden rounded-full bg-line">
              <div
                key={feedback}
                className={`countdown-bar h-full bg-indigo/50 ${paused ? 'paused' : ''}`}
                style={{ animationDuration: `${advanceMs}ms` }}
              />
            </div>
            <p className="text-center text-[11px] text-sage/70">
              {paused ? 'Pausado — solte para continuar' : 'Toque e segure para pausar'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function DrawQuestion({
  entry,
  onAnswered,
}: {
  entry: KanaEntry;
  onAnswered: (correct: boolean) => void;
}) {
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [result, setResult] = useState<DrawScore | null>(null);
  const [animationDone, setAnimationDone] = useState(false);
  const advanceMs = result?.passed ? AUTO_ADVANCE_DRAW_RIGHT_MS : AUTO_ADVANCE_DRAW_WRONG_MS;
  const paused = useHoldToPauseAdvance(advanceMs, () => onAnswered(!!result?.passed), !!result && animationDone);

  async function check(giveUp = false) {
    if (result) return;
    const outcome = scoreDrawing(giveUp ? [] : strokes, entry.char, CANVAS_SIZE);
    setResult(outcome);
    const p = await db.kanaProgress.get(entry.char);
    await db.kanaProgress.put({
      char: entry.char,
      type: entry.type,
      romajiCorrect: p?.romajiCorrect ?? 0,
      romajiWrong: p?.romajiWrong ?? 0,
      drawBest: Math.max(p?.drawBest ?? 0, outcome.score),
      lastPracticed: Date.now(),
    });
  }

  return (
    <div className="card-surface space-y-4">
      <div className="text-center">
        <p className="text-sm text-sage">
          Desenhe o kana correspondente a ({entry.type === 'hiragana' ? 'hiragana' : 'katakana'})
        </p>
        <p className="font-jp text-2xl text-indigo">{entry.romaji}</p>
      </div>

      <div className="flex justify-center">
        <KanaCanvas size={CANVAS_SIZE} onStrokesChange={setStrokes} />
      </div>

      {!result ? (
        <div className="flex justify-center gap-3">
          <button className="btn-primary" onClick={() => check()}>
            Verificar
          </button>
          <button className="btn-ghost" onClick={() => check(true)}>
            Não sei
          </button>
        </div>
      ) : (
        <div className="space-y-3 text-center">
          <p className={`text-3xl font-semibold ${result.passed ? 'text-indigo' : 'text-hanko'}`}>{result.score}%</p>

          {result.hints.length > 0 && (
            <ul className="mx-auto max-w-xs space-y-1 text-left text-sm text-sage">
              {result.hints.map((hint, i) => (
                <li key={i}>• {hint}</li>
              ))}
            </ul>
          )}

          <div className="flex flex-col items-center gap-1">
            <p className="text-xs text-sage">Traço correto:</p>
            <KanaReferenceFigure
              char={entry.char}
              onDone={() => setAnimationDone(true)}
              onReplayStart={() => setAnimationDone(false)}
            />
          </div>

          <div className="mx-auto flex max-w-[10rem] flex-col items-center gap-1">
            <button className="btn-primary w-full" onClick={() => onAnswered(result.passed)} autoFocus>
              Próximo
            </button>
            {animationDone && (
              <>
                <div className="h-1 w-full overflow-hidden rounded-full bg-line">
                  <div
                    className={`countdown-bar h-full bg-indigo/50 ${paused ? 'paused' : ''}`}
                    style={{ animationDuration: `${advanceMs}ms` }}
                  />
                </div>
                <p className="text-center text-[11px] text-sage/70">
                  {paused ? 'Pausado — solte para continuar' : 'Toque e segure para pausar'}
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function KanaReferenceFigure({
  char,
  size = 96,
  onDone,
  onReplayStart,
}: {
  char: string;
  size?: number;
  onDone?: () => void;
  onReplayStart?: () => void;
}) {
  const refStrokes = getReferenceStrokes(char);
  const [replayKey, setReplayKey] = useState(0);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    // Sem dados de traço pra esse kana: não há animação a esperar, libera o avanço na hora.
    if (!refStrokes) onDoneRef.current?.();
  }, [refStrokes]);

  if (!refStrokes) return null;

  function handleReplay() {
    onReplayStart?.();
    setReplayKey((k) => k + 1);
  }

  return (
    <KanaStrokeAnimation key={replayKey} strokes={refStrokes} size={size} onDone={onDone} onReplay={handleReplay} />
  );
}

function KanaStrokeAnimation({
  strokes,
  size,
  onReplay,
  onDone,
}: {
  strokes: ReferenceStrokes;
  size: number;
  onReplay: () => void;
  onDone?: () => void;
}) {
  const [visiblePoints, setVisiblePoints] = useState<number[]>(() => strokes.map(() => 0));
  const [currentStroke, setCurrentStroke] = useState(0);
  const [done, setDone] = useState(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    let strokeIdx = 0;
    let pointIdx = 0;
    let pauseFrames = 0;
    let rafId: number;
    const PAUSE_FRAMES = 18; // ~300ms de pausa entre traços

    function tick() {
      if (pauseFrames > 0) {
        pauseFrames--;
        rafId = requestAnimationFrame(tick);
        return;
      }

      pointIdx++;
      const maxPoints = strokes[strokeIdx].length;

      if (pointIdx >= maxPoints) {
        const si = strokeIdx;
        const mp = maxPoints;
        setVisiblePoints((prev) => {
          const next = [...prev];
          next[si] = mp;
          return next;
        });

        strokeIdx++;
        if (strokeIdx >= strokes.length) {
          setCurrentStroke(strokes.length);
          setDone(true);
          onDoneRef.current?.();
          return;
        }
        pointIdx = 0;
        pauseFrames = PAUSE_FRAMES;
        setCurrentStroke(strokeIdx);
      } else {
        const si = strokeIdx;
        const pi = pointIdx;
        setVisiblePoints((prev) => {
          const next = [...prev];
          next[si] = pi;
          return next;
        });
      }

      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [strokes]);

  return (
    <div className="flex flex-col items-center gap-1.5">
      <svg width={size} height={size} viewBox="0 0 1 1" className="rounded-xl border border-line bg-surface">
        {strokes.map((stroke, i) => {
          const pts = visiblePoints[i];
          if (pts === 0) return null;

          const isActive = i === currentStroke && !done;
          const color = STROKE_COLORS[i % STROKE_COLORS.length];

          return (
            <g key={i} className={color}>
              {pts >= 2 && (
                <polyline
                  points={stroke.slice(0, pts).map(([x, y]) => `${x},${y}`).join(' ')}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={0.045}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
              <circle cx={stroke[0][0]} cy={stroke[0][1]} r={0.05} fill="currentColor" />
              <text
                x={stroke[0][0]}
                y={stroke[0][1]}
                fontSize={0.06}
                fill="white"
                textAnchor="middle"
                dominantBaseline="central"
              >
                {i + 1}
              </text>
              {isActive && pts > 0 && pts < stroke.length && (
                <circle
                  cx={stroke[pts - 1][0]}
                  cy={stroke[pts - 1][1]}
                  r={0.035}
                  fill="currentColor"
                  opacity={0.5}
                />
              )}
            </g>
          );
        })}
      </svg>
      {done && (
        <button className="btn-ghost gap-1.5 px-3 py-1.5 text-xs" onClick={onReplay}>
          <span aria-hidden="true">↺</span> Repetir animação
        </button>
      )}
    </div>
  );
}

function ResultScreen({
  answers,
  onRestart,
  onBackToConfig,
}: {
  answers: TestAnswer[];
  onRestart: () => void;
  onBackToConfig: () => void;
}) {
  const total = answers.length;
  const correct = answers.filter((a) => a.correct).length;
  const accuracy = total ? Math.round((correct / total) * 100) : 0;
  const mistakes = answers.filter((a) => !a.correct);

  return (
    <div className="card-surface space-y-6 text-center">
      <div>
        <p className="text-sm text-sage">Resultado do teste</p>
        <p className="font-display text-4xl font-semibold text-indigo">{accuracy}%</p>
        <p className="text-sm text-sage">
          {correct} de {total} corretos
        </p>
      </div>

      {mistakes.length > 0 && (
        <div className="text-left">
          <p className="mb-2 text-sm font-medium text-ink">Para revisar</p>
          <div className="flex flex-wrap gap-2">
            {mistakes.map((m, i) => (
              <span key={i} className="rounded-lg border border-line px-3 py-1.5 text-sm">
                <span className="font-jp">{m.entry.char}</span> — {m.entry.romaji}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-center gap-3">
        <button className="btn-ghost" onClick={onBackToConfig}>
          Nova seleção
        </button>
        <button className="btn-primary" onClick={onRestart}>
          Refazer teste
        </button>
      </div>
    </div>
  );
}

function Segment({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <div className="inline-flex rounded-lg border border-line p-1">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={[
            'rounded-md px-3 py-1.5 text-sm transition-colors',
            value === o.value ? 'bg-indigo text-paper' : 'text-ink hover:bg-line/40',
          ].join(' ')}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

async function updateProgress(entry: KanaEntry, correct: boolean) {
  const p = await db.kanaProgress.get(entry.char);
  await db.kanaProgress.put({
    char: entry.char,
    type: entry.type,
    romajiCorrect: (p?.romajiCorrect ?? 0) + (correct ? 1 : 0),
    romajiWrong: (p?.romajiWrong ?? 0) + (correct ? 0 : 1),
    drawBest: p?.drawBest,
    lastPracticed: Date.now(),
  });
}

// Kana com histórico de mais erros entram repetidos no pool (até
// MAX_EXTRA_REPS vezes a mais), pra receberem mais prática dentro da sessão
// em vez de aparecerem só uma vez igual aos que o usuário já domina.
const MAX_EXTRA_REPS = 3;

function buildWeightedPool(entries: KanaEntry[], progress: Array<KanaProgress | undefined>, mode: Mode): KanaEntry[] {
  const pool: KanaEntry[] = [];
  entries.forEach((entry, i) => {
    pool.push(entry);
    const reps = Math.round(errorRateFor(progress[i], mode) * MAX_EXTRA_REPS);
    for (let r = 0; r < reps; r++) pool.push(entry);
  });
  return pool;
}

function errorRateFor(p: KanaProgress | undefined, mode: Mode): number {
  if (!p) return 0;
  if (mode === 'desenho') {
    return p.drawBest === undefined ? 0 : (100 - p.drawBest) / 100;
  }
  const total = p.romajiCorrect + p.romajiWrong;
  return total === 0 ? 0 : p.romajiWrong / total;
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
