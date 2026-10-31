import type { ReactNode } from 'react';
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
        {playing ? (
          <button className="btn-primary" onClick={onPause}>
            ⏸ Pausar
          </button>
        ) : (
          <button className="btn-primary" onClick={onPlay}>
            ▶ {state.status === 'paused' ? 'Continuar' : 'Ouvir o texto'}
          </button>
        )}
        {state.status === 'paused' && (
          <button className="btn-ghost" onClick={onRestart}>
            Do início
          </button>
        )}
        <span className="text-sm text-sage">
          {state.status === 'idle' ? `${totalLines} linhas` : `Linha ${state.line + 1} de ${totalLines}`}
        </span>
      </div>

      {state.shadowPauseMs !== null && (
        <div className="space-y-1">
          <p className="text-sm font-medium text-indigo">Sua vez — repita a frase em voz alta</p>
          <div className="h-1 w-full overflow-hidden rounded-full bg-line">
            <div
              key={state.line}
              className="countdown-bar h-full bg-indigo/50"
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
        <label className="inline-flex cursor-pointer items-center gap-2" title="Esconde o texto para você tentar entender só ouvindo">
          <input type="checkbox" checked={hideText} onChange={(e) => onHideTextChange(e.target.checked)} />
          Escutar primeiro (esconder texto)
        </label>
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
      <div className="inline-flex rounded-lg border border-line p-0.5">{children}</div>
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
      className={`rounded-md px-2.5 py-1 text-xs disabled:opacity-50 ${active ? 'bg-indigo text-paper' : ''}`}
      disabled={disabled}
      title={title}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
