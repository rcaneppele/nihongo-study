import { useSearchParams } from 'react-router-dom';
import { desempenhoPorFamilia, type DesempenhoFamilia } from '../features/kana/desempenho';
import { Target } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import ResultadoResumo from '../components/ResultadoResumo';
import SessionHeader from '../components/SessionHeader';
import { useEffect, useRef, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, type KanaProgress, type KanaType } from '../db/schema';
import {
  KANA_FAMILIES,
  familyPreview,
  getConfusables,
  getKana,
  getKanaByFamilies,
  type KanaEntry,
  type KanaGroup,
} from '../data/kana';
import KanaCanvas from '../components/KanaCanvas';
import AudioButton from '../components/AudioButton';
import { scoreDrawing, type DrawScore, type Stroke } from '../features/handwriting/strokes';
import StrokeReferenceFigure from '../features/handwriting/StrokeReferenceFigure';
import { useHoldToPauseAdvance } from '../lib/useHoldToPauseAdvance';
import { registrarAtividade } from '../features/atividade/atividade';

const CANVAS_SIZE = 280;
/** Tempo até avançar sozinho pra próxima pergunta após responder (o usuário pode tocar "Próximo" a qualquer momento pra pular a espera). Errar dá mais tempo pra ler a resposta certa. */
const AUTO_ADVANCE_RIGHT_MS = 1100;
const AUTO_ADVANCE_WRONG_MS = 2600;
/** Igual ao acima, mas para o modo desenho: só começa a contar depois que a animação do traço
 * correto termina, e o tempo é maior porque tem % + dicas pra ler, além da própria animação. */
const AUTO_ADVANCE_DRAW_RIGHT_MS = 3000;
const AUTO_ADVANCE_DRAW_WRONG_MS = 6000;

type Mode = 'romaji' | 'escolha' | 'desenho';
type Script = KanaType | 'both';
type Stage = 'config' | 'test' | 'result';

interface TestAnswer {
  entry: KanaEntry;
  correct: boolean;
}

const SINGLE_FAMILIES = KANA_FAMILIES.filter((f) => f.group === 'single').map((f) => f.key);

export default function Kana() {
  const [stage, setStage] = useState<Stage>('config');
  // `?modo=` vem dos hubs do método (ex.: Praticar › Escrever abre em "desenho").
  const [params] = useSearchParams();
  const modoDaUrl = params.get('modo');
  const [mode, setMode] = useState<Mode>(
    modoDaUrl === 'romaji' || modoDaUrl === 'escolha' || modoDaUrl === 'desenho' ? modoDaUrl : 'romaji'
  );
  const [script, setScript] = useState<Script>('hiragana');
  const [selected, setSelected] = useState<Set<string>>(new Set(SINGLE_FAMILIES));
  const [pool, setPool] = useState<KanaEntry[]>([]);
  const [answers, setAnswers] = useState<TestAnswer[]>([]);
  const [source, setSource] = useState<'normal' | 'weak'>('normal');
  const weakKana = useLiveQuery(() => getWeakKana(script, mode), [script, mode], [] as KanaEntry[]);

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

  async function runTest(entries: KanaEntry[], applyWeighting: boolean) {
    const pool = applyWeighting
      ? buildWeightedPool(entries, await db.kanaProgress.bulkGet(entries.map((e) => e.char)), mode)
      : entries;
    setPool(arrangeNoAdjacent(pool));
    setAnswers([]);
    setStage('test');
  }

  function startTest() {
    setSource('normal');
    return runTest(getKanaByFamilies(script, selected), true);
  }

  async function startWeakTest() {
    if (weakKana.length === 0) return;
    setSource('weak');
    // Sem repetição ponderada aqui: esse pool já É só os piores kana, então
    // pesar de novo por cima (como no teste normal) inflava demais a sessão
    // — 5 kana fracos viravam 17 perguntas. padWeakPool ainda garante um
    // mínimo de variedade quando há poucos kana fracos de verdade.
    return runTest(await padWeakPool(weakKana, script, mode), false);
  }

  function restartTest() {
    return source === 'weak' ? startWeakTest() : startTest();
  }

  function finishTest(result: TestAnswer[]) {
    setAnswers(result);
    setStage('result');
  }

  return (
    <div className="space-y-6">
      <PageHeader
        icon={<span className="font-jp text-xl">あ</span>}
        cor="kin"
        title="Treino de kana"
        subtitle="Hiragana e katakana"
      />

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
          weakCount={weakKana.length}
          onStartWeak={startWeakTest}
        />
      )}

      {stage === 'test' && (
        <KanaTest pool={pool} mode={mode} onFinish={finishTest} onCancel={() => setStage('config')} />
      )}

      {stage === 'result' && (
        <ResultScreen
          answers={answers}
          onRestart={restartTest}
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
  weakCount,
  onStartWeak,
}: {
  mode: Mode;
  setMode: (m: Mode) => void;
  script: Script;
  setScript: (s: Script) => void;
  selected: Set<string>;
  onToggleFamily: (key: string) => void;
  onSetGroupSelection: (group: KanaGroup, on: boolean) => void;
  onStart: () => void;
  weakCount: number;
  onStartWeak: () => void;
}) {
  const single = KANA_FAMILIES.filter((f) => f.group === 'single');
  const composite = KANA_FAMILIES.filter((f) => f.group === 'composite');
  const previewType: KanaType = script === 'katakana' ? 'katakana' : 'hiragana';
  const selectedCount = getKanaByFamilies(script, selected).length;
  const progresso = useLiveQuery(() => db.kanaProgress.toArray(), []);
  const desempenho = desempenhoPorFamilia(progresso ?? [], script, mode);

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
              { value: 'escolha', label: 'Múltipla escolha' },
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

      <div className="card-surface flex flex-wrap items-center gap-4">
        <span className="icon-tile bg-sakura/12 text-sakura">
          <Target className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-ink">Praticar pontos fracos</p>
          <p className="text-xs text-sage">
            {weakCount > 0
              ? `${weakCount} kana com mais erros no modo "${mode === 'romaji' ? 'digitar romaji' : mode === 'escolha' ? 'múltipla escolha' : 'desenhar'}"`
              : 'Pratique um pouco primeiro para identificarmos seus pontos fracos'}
          </p>
        </div>
        <button className="btn-ghost shrink-0" disabled={weakCount === 0} onClick={onStartWeak}>
          Praticar fracos
        </button>
      </div>

      <FamilyGroup
        title="Básicos (seion, dakuten, handakuten)"
        families={single}
        selected={selected}
        previewType={previewType}
        onToggle={onToggleFamily}
        desempenho={desempenho}
        onSelectAll={() => onSetGroupSelection('single', true)}
        onSelectNone={() => onSetGroupSelection('single', false)}
      />

      <FamilyGroup
        title="Combinados (yōon)"
        families={composite}
        selected={selected}
        previewType={previewType}
        onToggle={onToggleFamily}
        desempenho={desempenho}
        onSelectAll={() => onSetGroupSelection('composite', true)}
        onSelectNone={() => onSetGroupSelection('composite', false)}
      />

      <p className="text-xs text-sage">
        A barrinha em cada família é o seu acerto no modo escolhido:{' '}
        <span className="font-medium text-matcha">verde</span> a partir de 85%,{' '}
        <span className="font-medium text-kin">âmbar</span> a partir de 60%,{' '}
        <span className="font-medium text-hanko">vermelho</span> abaixo. Sem barra = ainda não praticou.
      </p>

      <div className="card-surface flex items-center justify-between gap-3">
        <p className="text-sm text-sage">
          <span className="font-semibold text-ink">{selectedCount}</span> kana selecionados
        </p>
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
  desempenho,
  onSelectAll,
  onSelectNone,
}: {
  title: string;
  families: Array<{ key: string; group: KanaGroup }>;
  selected: Set<string>;
  previewType: KanaType;
  onToggle: (key: string) => void;
  desempenho: Map<string, DesempenhoFamilia>;
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
          const d = desempenho.get(f.key);
          return (
            <button
              key={f.key}
              onClick={() => onToggle(f.key)}
              title={
                d
                  ? `Acerto ${Math.round(d.taxa * 100)}% · ${d.praticados} de ${d.total} praticados`
                  : 'Ainda não praticado neste modo'
              }
              className={[
                'rounded-xl border p-2 text-center transition-colors',
                active ? 'border-kin/60 bg-kin/8' : 'border-line/70 bg-surface hover:border-kin/30',
              ].join(' ')}
            >
              <p className="font-jp text-lg leading-tight">{familyPreview(previewType, f.key)}</p>
              <p className="text-xs text-sage">{f.key}</p>
              <span className="mt-1.5 block h-1 overflow-hidden rounded-full bg-line/70">
                {d && (
                  <span
                    className={`block h-full rounded-full ${
                      d.taxa >= 0.85 ? 'bg-matcha' : d.taxa >= 0.6 ? 'bg-kin' : 'bg-hanko/80'
                    }`}
                    style={{ width: `${Math.max(8, (d.praticados / d.total) * 100)}%` }}
                  />
                )}
              </span>
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
      <SessionHeader
        index={index}
        total={pool.length}
        onQuit={onCancel}
        semDesfazer
        badge={
          <span className="badge bg-matcha/12 text-matcha">
            {correctSoFar} acerto{correctSoFar === 1 ? '' : 's'}
          </span>
        }
      />

      {mode === 'romaji' ? (
        <RomajiQuestion key={current.char + index} entry={current} onAnswered={record} />
      ) : mode === 'escolha' ? (
        <ChoiceQuestion key={current.char + index} entry={current} pool={pool} onAnswered={record} />
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
    <div className="card-hero space-y-4 text-center">
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
          <p className={feedback === 'right' ? 'text-matcha' : 'text-hanko'}>
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

const CHOICE_COUNT = 6;

// Prioriza kana visualmente confusos com o correto (getConfusables) como
// distratores; completa com aleatórios. Busca primeiro nos kana que o
// usuário selecionou para a sessão (pool); se não for suficiente, busca em
// todo o script mas só dentro do mesmo grupo (básicos ou combinados/yōon —
// ver KanaGroup) do kana perguntado, pra não misturar um combinado tipo
// りゅ como opção errada numa sessão só de kana básicos (ou vice-versa). Só
// recorre a qualquer kana do script (widePool sem filtro de grupo) como
// último recurso, o que na prática quase nunca acontece — cada grupo sozinho
// já tem kana de sobra pra preencher CHOICE_COUNT.
function buildChoiceOptions(entry: KanaEntry, pool: KanaEntry[]): KanaEntry[] {
  const sameType = (k: KanaEntry) => k.type === entry.type && k.char !== entry.char;
  const uniqueByChar = (list: KanaEntry[]) => {
    const seen = new Set<string>();
    return list.filter((k) => (seen.has(k.char) ? false : (seen.add(k.char), true)));
  };

  const narrowCandidates = uniqueByChar(pool.filter(sameType));
  const widePool = getKana(entry.type).filter(sameType);
  const sameGroupPool = widePool.filter((k) => k.group === entry.group);
  const confusableChars = new Set(getConfusables(entry.type, entry.char));

  const usedRomaji = new Set([entry.romaji]);
  const options: KanaEntry[] = [entry];

  function tryAdd(candidate: KanaEntry) {
    if (options.length >= CHOICE_COUNT || usedRomaji.has(candidate.romaji)) return;
    options.push(candidate);
    usedRomaji.add(candidate.romaji);
  }

  shuffle(narrowCandidates.filter((k) => confusableChars.has(k.char))).forEach(tryAdd);
  shuffle(narrowCandidates).forEach(tryAdd);
  shuffle(sameGroupPool.filter((k) => confusableChars.has(k.char))).forEach(tryAdd);
  shuffle(sameGroupPool).forEach(tryAdd);
  shuffle(widePool.filter((k) => confusableChars.has(k.char))).forEach(tryAdd);
  shuffle(widePool).forEach(tryAdd);

  return shuffle(options);
}

function ChoiceQuestion({
  entry,
  pool,
  onAnswered,
}: {
  entry: KanaEntry;
  pool: KanaEntry[];
  onAnswered: (correct: boolean) => void;
}) {
  const [options] = useState(() => buildChoiceOptions(entry, pool));
  const [picked, setPicked] = useState<KanaEntry | null>(null);
  const [feedback, setFeedback] = useState<'idle' | 'right' | 'wrong'>('idle');
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const advanceMs = feedback === 'right' ? AUTO_ADVANCE_RIGHT_MS : AUTO_ADVANCE_WRONG_MS;
  const paused = useHoldToPauseAdvance(advanceMs, () => onAnswered(feedback === 'right'), feedback !== 'idle');

  useEffect(() => {
    if (feedback === 'idle') return;
    const focusId = setTimeout(() => nextBtnRef.current?.focus(), 0);
    return () => clearTimeout(focusId);
  }, [feedback]);

  async function choose(option: KanaEntry | null) {
    if (feedback !== 'idle') return;
    const correct = option?.char === entry.char;
    setPicked(option);
    setFeedback(correct ? 'right' : 'wrong');
    await updateChoiceProgress(entry, correct);
  }

  return (
    <div className="card-hero space-y-4 text-center">
      <div className="text-center">
        <p className="text-sm text-sage">
          Escolha o kana correspondente a ({entry.type === 'hiragana' ? 'hiragana' : 'katakana'})
        </p>
        <p className="font-jp text-3xl text-indigo">{entry.romaji}</p>
      </div>

      <div className="mx-auto grid max-w-sm grid-cols-3 gap-2">
        {options.map((o) => {
          const isCorrectAnswer = feedback !== 'idle' && o.char === entry.char;
          const isWrongPick = feedback !== 'idle' && picked?.char === o.char && o.char !== entry.char;
          return (
            <button
              key={o.char}
              disabled={feedback !== 'idle'}
              onClick={() => choose(o)}
              className={[
                'font-jp rounded-lg border p-3 text-3xl transition-colors',
                feedback === 'idle'
                  ? 'border-line hover:bg-line/30'
                  : isCorrectAnswer
                    ? 'border-indigo bg-indigo/10 text-indigo'
                    : isWrongPick
                      ? 'border-hanko bg-hanko/10 text-hanko'
                      : 'border-line opacity-50',
              ].join(' ')}
            >
              {o.char}
            </button>
          );
        })}
      </div>

      {feedback === 'idle' ? (
        <button className="btn-ghost text-xs" onClick={() => choose(null)}>
          Não sei
        </button>
      ) : (
        <div className="space-y-3">
          <p className={feedback === 'right' ? 'text-matcha' : 'text-hanko'}>
            {feedback === 'right' ? 'Certo!' : `Era "${entry.char}"`}
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
    void registrarAtividade('praticas');
    const p = await db.kanaProgress.get(entry.char);
    await db.kanaProgress.put({
      char: entry.char,
      type: entry.type,
      romajiCorrect: p?.romajiCorrect ?? 0,
      romajiWrong: p?.romajiWrong ?? 0,
      choiceCorrect: p?.choiceCorrect,
      choiceWrong: p?.choiceWrong,
      drawBest: Math.max(p?.drawBest ?? 0, outcome.score),
      lastPracticed: Date.now(),
    });
  }

  return (
    <div className="card-hero space-y-4">
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
          <p className={`text-3xl font-semibold ${result.passed ? 'text-matcha' : 'text-hanko'}`}>{result.score}%</p>

          {result.hints.length > 0 && (
            <ul className="mx-auto max-w-xs space-y-1 text-left text-sm text-sage">
              {result.hints.map((hint, i) => (
                <li key={i}>• {hint}</li>
              ))}
            </ul>
          )}

          <div className="flex flex-col items-center gap-1">
            <p className="text-xs text-sage">Traço correto:</p>
            <StrokeReferenceFigure
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
  const mistakes = answers.filter((a) => !a.correct);

  return (
    <div className="space-y-4">
      <ResultadoResumo titulo="Resultado do teste" acertos={correct} total={total} />
      <div className="card-surface space-y-6 text-center">

      {mistakes.length > 0 && (
        <div className="text-left">
          <p className="mb-2 text-sm font-medium text-ink">Para revisar</p>
          <div className="flex flex-wrap gap-2">
            {mistakes.map((m, i) => (
              <span key={i} className="rounded-xl border border-kin/25 bg-kin/8 px-3 py-1.5 text-sm">
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
    <div className="segmented">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={[
            'segmented-item',
            value === o.value ? 'segmented-item-active' : '',
          ].join(' ')}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

async function updateProgress(entry: KanaEntry, correct: boolean) {
  void registrarAtividade('praticas');
  const p = await db.kanaProgress.get(entry.char);
  await db.kanaProgress.put({
    char: entry.char,
    type: entry.type,
    romajiCorrect: (p?.romajiCorrect ?? 0) + (correct ? 1 : 0),
    romajiWrong: (p?.romajiWrong ?? 0) + (correct ? 0 : 1),
    choiceCorrect: p?.choiceCorrect,
    choiceWrong: p?.choiceWrong,
    drawBest: p?.drawBest,
    lastPracticed: Date.now(),
  });
}

async function updateChoiceProgress(entry: KanaEntry, correct: boolean) {
  void registrarAtividade('praticas');
  const p = await db.kanaProgress.get(entry.char);
  await db.kanaProgress.put({
    char: entry.char,
    type: entry.type,
    romajiCorrect: p?.romajiCorrect ?? 0,
    romajiWrong: p?.romajiWrong ?? 0,
    choiceCorrect: (p?.choiceCorrect ?? 0) + (correct ? 1 : 0),
    choiceWrong: (p?.choiceWrong ?? 0) + (correct ? 0 : 1),
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

// Embaralhar puro pode deixar cópias do mesmo kana (das repetições de
// buildWeightedPool) lado a lado ou próximas — o que é justamente o
// oposto do que a repetição espaçada busca (massed practice em vez de
// intercalada). Aqui sempre coloca, a cada passo, um kana dentre os que
// ainda têm mais cópias pendentes e que não seja igual ao anterior — só
// repete adjacente se for matematicamente impossível evitar (mais da
// metade do pool sendo do mesmo kana).
function arrangeNoAdjacent(entries: KanaEntry[]): KanaEntry[] {
  const groups = new Map<string, { entry: KanaEntry; count: number }>();
  for (const e of shuffle(entries)) {
    const g = groups.get(e.char);
    if (g) g.count++;
    else groups.set(e.char, { entry: e, count: 1 });
  }
  const remaining = [...groups.values()];

  const result: KanaEntry[] = [];
  let lastChar: string | null = null;
  while (result.length < entries.length) {
    remaining.sort((a, b) => b.count - a.count);
    // Prioriza o kana mais frequente entre os diferentes do anterior — só
    // volta a considerar o mesmo char do passo anterior se ele for o único
    // que ainda sobrou (repetição adjacente inevitável).
    const eligible = remaining.filter((g) => g.count > 0 && g.entry.char !== lastChar);
    const pool = eligible.length > 0 ? eligible : remaining.filter((g) => g.count > 0);
    if (pool.length === 0) break;
    const topCount = pool[0].count;
    const tied = pool.filter((g) => g.count === topCount);
    const pick = tied[Math.floor(Math.random() * tied.length)];
    pick.count--;
    result.push(pick.entry);
    lastChar = pick.entry.char;
  }
  return result;
}

function errorRateFor(p: KanaProgress | undefined, mode: Mode): number {
  if (!p) return 0;
  if (mode === 'desenho') {
    return p.drawBest === undefined ? 0 : (100 - p.drawBest) / 100;
  }
  if (mode === 'escolha') {
    const total = (p.choiceCorrect ?? 0) + (p.choiceWrong ?? 0);
    return total === 0 ? 0 : (p.choiceWrong ?? 0) / total;
  }
  const total = p.romajiCorrect + p.romajiWrong;
  return total === 0 ? 0 : p.romajiWrong / total;
}

function attemptsFor(p: KanaProgress | undefined, mode: Mode): number {
  if (!p) return 0;
  if (mode === 'desenho') return p.drawBest === undefined ? 0 : 1;
  if (mode === 'escolha') return (p.choiceCorrect ?? 0) + (p.choiceWrong ?? 0);
  return p.romajiCorrect + p.romajiWrong;
}

// Kana com mais erros no modo selecionado, ignorando a seleção manual de
// famílias — respeita só a escrita (hiragana/katakana/ambos) escolhida. Só
// entram kana já praticados nesse modo e com pelo menos um erro; sem isso
// não há "ponto fraco" a mostrar. Limitado a WEAK_POOL_CAP pra sessão não
// ficar enorme quando o histórico de erros é grande.
const WEAK_POOL_CAP = 20;

async function getWeakKana(script: Script, mode: Mode): Promise<KanaEntry[]> {
  const entries = getKana(script);
  const progress = await db.kanaProgress.bulkGet(entries.map((e) => e.char));
  return entries
    .map((entry, i) => ({ entry, rate: errorRateFor(progress[i], mode), attempts: attemptsFor(progress[i], mode) }))
    .filter((x) => x.attempts > 0 && x.rate > 0)
    .sort((a, b) => b.rate - a.rate)
    .slice(0, WEAK_POOL_CAP)
    .map((x) => x.entry);
}

// Com poucos kana fracos (no limite, só 1), a sessão de "praticar fracos"
// (sem repetição ponderada — ver startWeakTest) ficaria curta demais pra
// parecer uma sessão de verdade. MIN_WEAK_POOL garante um mínimo de
// variedade completando com outros kana do script. O contador exibido na
// tela (weakCount) continua refletindo só os kana realmente errados; esse
// preenchimento entra apenas na hora de montar a sessão de fato.
const MIN_WEAK_POOL = 4;

async function padWeakPool(weak: KanaEntry[], script: Script, mode: Mode): Promise<KanaEntry[]> {
  if (weak.length === 0 || weak.length >= MIN_WEAK_POOL) return weak;

  const entries = getKana(script);
  const progress = await db.kanaProgress.bulkGet(entries.map((e) => e.char));
  const weakChars = new Set(weak.map((e) => e.char));
  const rest = entries
    .map((entry, i) => ({ entry, attempts: attemptsFor(progress[i], mode) }))
    .filter((x) => !weakChars.has(x.entry.char));

  const practiced = shuffle(rest.filter((x) => x.attempts > 0)).map((x) => x.entry);
  const unpracticed = shuffle(rest.filter((x) => x.attempts === 0)).map((x) => x.entry);
  const filler = [...practiced, ...unpracticed].slice(0, MIN_WEAK_POOL - weak.length);

  return [...weak, ...filler];
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
