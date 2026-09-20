import { useEffect, useRef, useState } from 'react';
import { getReferenceStrokes, type ReferenceStrokes } from './strokes';

const STROKE_COLORS = ['text-indigo', 'text-hanko', 'text-sage', 'text-indigo-soft', 'text-ink'];

/**
 * Animação do traçado de referência (ordem/direção correta) de um kana ou
 * kanji, usada como feedback depois do modo desenho — compartilhada entre
 * src/routes/Kana.tsx e src/features/kanji/.
 */
export default function StrokeReferenceFigure({
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
    // Sem dados de traço pra esse caractere: não há animação a esperar, libera o avanço na hora.
    if (!refStrokes) onDoneRef.current?.();
  }, [refStrokes]);

  if (!refStrokes) return null;

  function handleReplay() {
    onReplayStart?.();
    setReplayKey((k) => k + 1);
  }

  return (
    <StrokeAnimation key={replayKey} strokes={refStrokes} size={size} onDone={onDone} onReplay={handleReplay} />
  );
}

function StrokeAnimation({
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
