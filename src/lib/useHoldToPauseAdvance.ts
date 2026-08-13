import { useEffect, useRef, useState } from 'react';

const INTERACTIVE_SELECTOR = 'button, a, input, select, textarea, [role="button"], [contenteditable="true"]';

/**
 * Avança automaticamente após `ms`, mas pausa enquanto o usuário mantém o dedo/clique pressionado
 * em qualquer ponto da tela fora de elementos interativos — mesmo gesto de "segurar para pausar"
 * dos stories do Instagram/WhatsApp. Dá tempo de ler com calma antes do avanço automático, já que
 * o timer em si não tem como ser cancelado, só adiantado ou pausado.
 */
export function useHoldToPauseAdvance(ms: number, onAdvance: () => void, enabled = true): boolean {
  const [paused, setPaused] = useState(false);
  const onAdvanceRef = useRef(onAdvance);
  onAdvanceRef.current = onAdvance;

  useEffect(() => {
    if (!enabled) return;

    let isPaused = false;
    let remaining = ms;
    let start = performance.now();
    let timeoutId: ReturnType<typeof setTimeout>;

    function schedule() {
      start = performance.now();
      timeoutId = setTimeout(() => onAdvanceRef.current(), remaining);
    }

    function pause() {
      if (isPaused) return;
      isPaused = true;
      clearTimeout(timeoutId);
      remaining = Math.max(0, remaining - (performance.now() - start));
      setPaused(true);
    }

    function resume() {
      if (!isPaused) return;
      isPaused = false;
      schedule();
      setPaused(false);
    }

    function handlePointerDown(e: PointerEvent) {
      if (e.target instanceof HTMLElement && e.target.closest(INTERACTIVE_SELECTOR)) return;
      pause();
    }

    schedule();
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('pointerup', resume);
    document.addEventListener('pointercancel', resume);
    window.addEventListener('blur', resume);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('pointerup', resume);
      document.removeEventListener('pointercancel', resume);
      window.removeEventListener('blur', resume);
    };
  }, [ms, enabled]);

  return enabled && paused;
}
