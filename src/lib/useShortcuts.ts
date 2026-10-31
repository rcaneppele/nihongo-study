import { useEffect, useRef } from 'react';

/**
 * Atalhos de teclado de uma tela de sessão (revisão de flash cards/kanji).
 * Chave = `KeyboardEvent.key` (ex.: " ", "Enter", "1"), ou "undo" para
 * Ctrl+Z/Cmd+Z. Handler `undefined` = atalho desligado naquele momento.
 *
 * Ignora teclas digitadas em campos de texto e dá preventDefault no que
 * trata — senão Espaço/Enter também "clicariam" o botão que ficou com foco
 * depois de um clique de mouse, disparando a ação duas vezes.
 */
export function useShortcuts(handlers: Record<string, (() => void) | undefined>) {
  const ref = useRef(handlers);
  ref.current = handlers;

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      if (target?.closest('input, textarea, select, [contenteditable="true"]')) return;
      if (e.repeat || e.altKey) return;

      const mod = e.ctrlKey || e.metaKey;
      const key = mod ? (e.key.toLowerCase() === 'z' && !e.shiftKey ? 'undo' : null) : e.key;
      const handler = key ? ref.current[key] : undefined;
      if (!handler) return;

      e.preventDefault();
      handler();
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);
}
