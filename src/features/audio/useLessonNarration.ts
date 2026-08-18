import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';
import { buildNarrationQueue, type NarrationRun } from './narration';
import { isSpeechSupported, onSpeechCancelledExternally, speakUtterance } from './speech';

export type NarrationState = 'idle' | 'playing' | 'paused';

export function useLessonNarration(containerRef: RefObject<HTMLElement | null>) {
  const [state, setState] = useState<NarrationState>('idle');
  const stateRef = useRef<NarrationState>('idle');
  const queueRef = useRef<NarrationRun[]>([]);
  const indexRef = useRef(0);
  const sessionRef = useRef(0);

  const setStateBoth = useCallback((next: NarrationState) => {
    stateRef.current = next;
    setState(next);
  }, []);

  const speakFrom = useCallback(
    (session: number) => {
      const queue = queueRef.current;
      if (indexRef.current >= queue.length) {
        indexRef.current = 0;
        setStateBoth('idle');
        return;
      }

      const run = queue[indexRef.current];
      const utterance = speakUtterance(run.text, run.lang);
      utterance.onend = () => {
        if (session !== sessionRef.current) return;
        indexRef.current++;
        speakFrom(session);
      };
      window.speechSynthesis.speak(utterance);
    },
    [setStateBoth],
  );

  const stop = useCallback(() => {
    sessionRef.current++;
    window.speechSynthesis.cancel();
    indexRef.current = 0;
    setStateBoth('idle');
  }, [setStateBoth]);

  const play = useCallback(() => {
    if (!isSpeechSupported() || !containerRef.current) return;

    if (stateRef.current === 'paused') {
      window.speechSynthesis.resume();
      setStateBoth('playing');
      return;
    }

    window.speechSynthesis.cancel();
    queueRef.current = buildNarrationQueue(containerRef.current);
    indexRef.current = 0;
    sessionRef.current++;
    setStateBoth('playing');
    speakFrom(sessionRef.current);
  }, [containerRef, setStateBoth, speakFrom]);

  const pause = useCallback(() => {
    if (stateRef.current !== 'playing') return;
    window.speechSynthesis.pause();
    setStateBoth('paused');
  }, [setStateBoth]);

  // Uma fala pontual (botão de pronúncia de um exemplo) cancela a fila do
  // navegador por baixo — sem isso, o estado do player ficaria "tocando"
  // com a narração na verdade silenciada.
  useEffect(() => {
    return onSpeechCancelledExternally(() => {
      if (stateRef.current === 'idle') return;
      sessionRef.current++;
      indexRef.current = 0;
      setStateBoth('idle');
    });
  }, [setStateBoth]);

  useEffect(() => {
    return () => window.speechSynthesis.cancel();
  }, []);

  return { state, play, pause, stop };
}
