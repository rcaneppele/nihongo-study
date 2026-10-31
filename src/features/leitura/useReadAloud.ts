import { useEffect, useRef, useState } from 'react';
import { currentSpeechGeneration, speakJapaneseAndWait, stopSpeaking } from '../audio/speech';

/**
 * "normal": lê as linhas em sequência. "shadowing": depois de cada linha,
 * pausa ~1,2× o tempo que a linha levou, pra o usuário repetir em voz alta
 * (sem reconhecimento de fala — a conferência é de ouvido).
 */
export type ReadAloudMode = 'normal' | 'shadowing';

export interface ReadAloudState {
  status: 'idle' | 'playing' | 'paused';
  /** Linha sendo lida (ou onde parou, quando pausado). */
  line: number;
  /** Duração da pausa de shadowing em andamento (ms), ou null fora dela. */
  shadowPauseMs: number | null;
}

const MIN_SHADOW_PAUSE_MS = 1500;

/**
 * Lê um texto inteiro linha a linha via SpeechSynthesis. Pausar para no fim
 * da fala atual (cancela e lembra a linha) — `speechSynthesis.pause()` é
 * instável no Android, então "continuar" recomeça a linha onde parou.
 * Qualquer outra fala no meio (ex.: botão de áudio de uma linha) interrompe
 * a leitura, que fica pausada naquela linha.
 */
export function useReadAloud(lines: string[], mode: ReadAloudMode) {
  const [state, setState] = useState<ReadAloudState>({ status: 'idle', line: 0, shadowPauseMs: null });
  // Token da execução atual — pausar/parar/recomeçar invalida o loop antigo.
  const runRef = useRef(0);

  // Sair da tela para a leitura em andamento.
  useEffect(() => {
    const run = runRef;
    return () => {
      run.current++;
      stopSpeaking();
    };
  }, []);

  async function run(from: number) {
    const run = ++runRef.current;
    const alive = () => runRef.current === run;

    for (let i = from; i < lines.length; i++) {
      setState({ status: 'playing', line: i, shadowPauseMs: null });
      const startedAt = Date.now();
      const { completed, generation } = await speakJapaneseAndWait(lines[i]);
      if (!alive()) return;
      if (!completed) {
        setState({ status: 'paused', line: i, shadowPauseMs: null });
        return;
      }

      if (mode === 'shadowing') {
        const pause = Math.max(MIN_SHADOW_PAUSE_MS, (Date.now() - startedAt) * 1.2);
        setState({ status: 'playing', line: i, shadowPauseMs: pause });
        await new Promise((r) => setTimeout(r, pause));
        if (!alive()) return;
        if (currentSpeechGeneration() !== generation) {
          setState({ status: 'paused', line: i + 1 < lines.length ? i + 1 : 0, shadowPauseMs: null });
          return;
        }
      }
    }
    if (alive()) setState({ status: 'idle', line: 0, shadowPauseMs: null });
  }

  function play() {
    void run(state.status === 'paused' ? state.line : 0);
  }

  function pause() {
    runRef.current++;
    stopSpeaking();
    setState((s) => ({ ...s, status: 'paused', shadowPauseMs: null }));
  }

  function restart() {
    void run(0);
  }

  function stop() {
    runRef.current++;
    stopSpeaking();
    setState({ status: 'idle', line: 0, shadowPauseMs: null });
  }

  return { state, play, pause, restart, stop };
}
