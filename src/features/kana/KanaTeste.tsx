import { useEffect, useRef, useState } from 'react';
import SessionHeader from '../../components/SessionHeader';
import KanaCanvas from '../../components/KanaCanvas';
import AudioButton from '../../components/AudioButton';
import type { KanaEntry } from '../../data/kana';
import { scoreDrawing, type DrawScore, type Stroke } from '../handwriting/strokes';
import StrokeReferenceFigure from '../handwriting/StrokeReferenceFigure';
import { useHoldToPauseAdvance } from '../../lib/useHoldToPauseAdvance';
import type { ModoKana } from './desempenho';
import { buildChoiceOptions, romajiCorreto, type RespostaKana } from './treino';
import { registrarDesenhoKana, registrarRespostaKana } from './progresso';

const CANVAS_SIZE = 280;
/** Tempo até avançar sozinho pra próxima pergunta após responder (o usuário pode tocar "Próximo" a qualquer momento pra pular a espera). Errar dá mais tempo pra ler a resposta certa. */
const AUTO_ADVANCE_RIGHT_MS = 1100;
const AUTO_ADVANCE_WRONG_MS = 2600;
/** Igual ao acima, mas para o modo desenho: só começa a contar depois que a animação do traço
 * correto termina, e o tempo é maior porque tem % + dicas pra ler, além da própria animação. */
const AUTO_ADVANCE_DRAW_RIGHT_MS = 3000;
const AUTO_ADVANCE_DRAW_WRONG_MS = 6000;

/** Sessão do teste de kana: uma pergunta por vez no modo escolhido, contando os acertos. */
export default function KanaTeste({
  pool,
  mode,
  onFinish,
  onCancel,
}: {
  pool: KanaEntry[];
  mode: ModoKana;
  onFinish: (answers: RespostaKana[]) => void;
  onCancel: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<RespostaKana[]>([]);
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
    const correct = !giveUp && romajiCorreto(answer, entry);
    setFeedback(correct ? 'right' : 'wrong');
    await registrarRespostaKana(entry, 'romaji', correct);
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
          <ProximoComContagem
            botaoRef={nextBtnRef}
            onProximo={() => onAnswered(feedback === 'right')}
            advanceMs={advanceMs}
            paused={paused}
          />
        </div>
      )}
    </div>
  );
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
    await registrarRespostaKana(entry, 'escolha', correct);
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
          <ProximoComContagem
            botaoRef={nextBtnRef}
            onProximo={() => onAnswered(feedback === 'right')}
            advanceMs={advanceMs}
            paused={paused}
          />
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
    await registrarDesenhoKana(entry, outcome.score);
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

          <ProximoComContagem
            autoFocus
            onProximo={() => onAnswered(result.passed)}
            advanceMs={advanceMs}
            paused={paused}
            contando={animationDone}
          />
        </div>
      )}
    </div>
  );
}

/**
 * "Próximo" com a barra do auto-avanço (ver `useHoldToPauseAdvance`). No
 * desenho, a barra só aparece depois da animação do traço (`contando`).
 */
function ProximoComContagem({
  onProximo,
  advanceMs,
  paused,
  contando = true,
  botaoRef,
  autoFocus,
}: {
  onProximo: () => void;
  advanceMs: number;
  paused: boolean;
  contando?: boolean;
  botaoRef?: React.Ref<HTMLButtonElement>;
  autoFocus?: boolean;
}) {
  return (
    <div className="mx-auto flex max-w-[10rem] flex-col items-center gap-1">
      <button ref={botaoRef} className="btn-primary w-full" onClick={onProximo} autoFocus={autoFocus}>
        Próximo
      </button>
      {contando && (
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
  );
}
