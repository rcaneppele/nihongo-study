import type { ReactNode } from 'react';
import { EyeOff, Headphones, Mic, Pause, Play, RotateCcw } from 'lucide-react';
import { setSpeechSpeed, useSpeechSpeed, type SpeechSpeed } from '../audio/speech';
import type { ReadAloudMode, ReadAloudState } from './useReadAloud';

const MODES: { key: ReadAloudMode; label: string; hint: string }[] = [
  { key: 'normal', label: 'Contínuo', hint: 'Lê o texto do começo ao fim' },
  { key: 'shadowing', label: 'Shadowing', hint: 'Pausa depois de cada linha para você repetir em voz alta' },
];

const SPEEDS: { key: SpeechSpeed; label: string }[] = [
  { key: 'normal', label: 'Normal' },
  { key: 'slow', label: 'Lenta' },
];

/**
 * Controles do "ouvir o texto" na leitura: tocar/pausar/continuar, modo
 * (contínuo ou shadowing), velocidade da fala (global, ver speech.ts) e
 * "escutar primeiro" (esconde o texto pra treinar listening antes de ler).
 */
export default function ReadAloudBar({
  state,
  totalLines,
  mode,
  onModeChange,
  hideText,
  onHideTextChange,
  onPlay,
  onPause,
  onRestart,
}: {
  state: ReadAloudState;
  totalLines: number;
  mode: ReadAloudMode;
  onModeChange: (mode: ReadAloudMode) => void;
  hideText: boolean;
  onHideTextChange: (hide: boolean) => void;
  onPlay: () => void;
  onPause: () => void;
  onRestart: () => void;
}) {
  const speed = useSpeechSpeed();
  const playing = state.status === 'playing';

  return (
    <div className="card-surface space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="icon-tile h-9 w-9 bg-matcha/12 text-matcha">
          <Headphones className="h-[18px] w-[18px]" />
        </span>
        {playing ? (
          <button className="btn-primary" onClick={onPause}>
            <Pause className="h-4 w-4" />
            Pausar
          </button>
        ) : (
          <button className="btn-primary" onClick={onPlay}>
            <Play className="h-4 w-4" />
            {state.status === 'paused' ? 'Continuar' : 'Ouvir o texto'}
          </button>
        )}
        {state.status === 'paused' && (
          <button className="btn-ghost" onClick={onRestart}>
            <RotateCcw className="h-4 w-4" />
            Do início
          </button>
        )}
        <span className={`badge ${state.status === 'idle' ? 'bg-line/70 text-sage' : 'bg-matcha/12 text-matcha'}`}>
          {state.status === 'idle' ? `${totalLines} linhas` : `Linha ${state.line + 1} de ${totalLines}`}
        </span>
      </div>

      {state.shadowPauseMs !== null && (
        <div className="space-y-1">
          <p className="flex items-center gap-1.5 text-sm font-medium text-matcha">
            <Mic className="h-4 w-4" />
            Sua vez — repita a frase em voz alta
          </p>
          <div className="h-1 w-full overflow-hidden rounded-full bg-line">
            <div
              key={state.line}
              className="countdown-bar h-full bg-matcha/60"
              style={{ animationDuration: `${state.shadowPauseMs}ms` }}
            />
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
        <Segmented label="Modo">
          {MODES.map((m) => (
            <SegmentButton key={m.key} active={mode === m.key} disabled={playing} title={m.hint} onClick={() => onModeChange(m.key)}>
              {m.label}
            </SegmentButton>
          ))}
        </Segmented>
        <Segmented label="Velocidade">
          {SPEEDS.map((s) => (
            <SegmentButton key={s.key} active={speed === s.key} onClick={() => setSpeechSpeed(s.key)}>
              {s.label}
            </SegmentButton>
          ))}
        </Segmented>
        <button
          className={`chip inline-flex items-center gap-1.5 ${hideText ? 'chip-active' : ''}`}
          aria-pressed={hideText}
          title="Esconde o texto para você tentar entender só ouvindo"
          onClick={() => onHideTextChange(!hideText)}
        >
          <EyeOff className="h-3.5 w-3.5" />
          Escutar primeiro
        </button>
      </div>
      {mode === 'shadowing' && (
        <p className="text-xs text-sage">
          Shadowing: ouça cada frase e repita logo em seguida, imitando o ritmo e a entonação. A pausa é proporcional ao
          tamanho da frase.
        </p>
      )}
    </div>
  );
}

function Segmented({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-sage">{label}</span>
      <div className="segmented" role="group" aria-label={label}>
        {children}
      </div>
    </div>
  );
}

function SegmentButton({
  active,
  disabled,
  title,
  onClick,
  children,
}: {
  active: boolean;
  disabled?: boolean;
  title?: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={`segmented-item px-2.5 py-1 text-xs ${active ? 'segmented-item-active' : ''}`}
      disabled={disabled}
      title={title}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
