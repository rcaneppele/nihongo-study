import type { RefObject } from 'react';
import { isSpeechSupported } from '../features/audio/speech';
import { useLessonNarration } from '../features/audio/useLessonNarration';

export default function LessonAudioBar({
  containerRef,
}: {
  containerRef: RefObject<HTMLElement | null>;
}) {
  const { state, play, pause, stop } = useLessonNarration(containerRef);

  if (!isSpeechSupported()) return null;

  return (
    <div className="flex items-center gap-2 rounded-lg border border-line bg-surface/60 px-3 py-2">
      {state === 'playing' ? (
        <button
          type="button"
          onClick={pause}
          className="btn-ghost inline-flex items-center gap-1.5 px-3 py-1.5 text-sm"
        >
          <PauseIcon /> Pausar
        </button>
      ) : (
        <button
          type="button"
          onClick={play}
          className="btn-ghost inline-flex items-center gap-1.5 px-3 py-1.5 text-sm"
        >
          <PlayIcon /> {state === 'paused' ? 'Continuar' : 'Ouvir lição'}
        </button>
      )}
      {state !== 'idle' && (
        <button
          type="button"
          onClick={stop}
          className="btn-ghost inline-flex items-center gap-1.5 px-3 py-1.5 text-sm"
        >
          <StopIcon /> Encerrar
        </button>
      )}
    </div>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width={14} height={14} fill="currentColor" aria-hidden>
      <polygon points="6 4 20 12 6 20" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" width={14} height={14} fill="currentColor" aria-hidden>
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  );
}

function StopIcon() {
  return (
    <svg viewBox="0 0 24 24" width={14} height={14} fill="currentColor" aria-hidden>
      <rect x="5" y="5" width="14" height="14" />
    </svg>
  );
}
