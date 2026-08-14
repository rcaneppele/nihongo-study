import { useEffect, useRef, useState } from 'react';
import type { Point, Stroke } from '../features/kana/strokes';
import { useTheme } from '../lib/useTheme';

/**
 * Canvas de desenho de kana. Captura traços via pointer events (funciona com
 * dedo, mouse e Apple Pencil) e os entrega via onStrokesChange.
 * O reconhecimento/feedback (KanjiVG) ainda não está implementado — ver
 * src/features/kana/strokes.ts.
 */
export default function KanaCanvas({
  size = 280,
  onStrokesChange,
}: {
  size?: number;
  onStrokesChange?: (strokes: Stroke[]) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const drawing = useRef(false);
  const current = useRef<Stroke>([]);
  const { resolvedTheme } = useTheme();

  // Densidade de pixels para traço nítido em telas retina.
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;

  useEffect(() => {
    redraw(canvasRef.current, strokes, size, dpr);
    onStrokesChange?.(strokes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [strokes, resolvedTheme]);

  function pos(e: React.PointerEvent): Point {
    const rect = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top, t: performance.now() };
  }

  function start(e: React.PointerEvent) {
    e.preventDefault();
    drawing.current = true;
    current.current = [pos(e)];
    canvasRef.current?.setPointerCapture(e.pointerId);
  }
  function move(e: React.PointerEvent) {
    if (!drawing.current) return;
    current.current.push(pos(e));
    redraw(canvasRef.current, [...strokes, current.current], size, dpr);
  }
  function end() {
    if (!drawing.current) return;
    drawing.current = false;
    if (current.current.length > 1) setStrokes((s) => [...s, current.current]);
    current.current = [];
  }

  function clear() {
    setStrokes([]);
  }

  return (
    <div className="inline-flex flex-col items-center gap-3">
      <canvas
        ref={canvasRef}
        width={size * dpr}
        height={size * dpr}
        style={{ width: size, height: size, touchAction: 'none' }}
        className="rounded-2xl border border-line bg-surface"
        onPointerDown={start}
        onPointerMove={move}
        onPointerUp={end}
        onPointerLeave={end}
      />
      <div className="flex items-center gap-3 text-sm text-sage">
        <span>{strokes.length} traço(s)</span>
        <button className="btn-ghost" onClick={clear}>
          Limpar
        </button>
      </div>
    </div>
  );
}

/** Lê o valor atual (já resolvido pro tema claro/escuro) de um token de cor do index.css. */
function themeColor(cssVar: string, fallback: string): string {
  const value = getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim();
  return value ? `rgb(${value})` : fallback;
}

function redraw(canvas: HTMLCanvasElement | null, strokes: Stroke[], size: number, dpr: number) {
  const ctx = canvas?.getContext('2d');
  if (!ctx || !canvas) return;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, size, size);

  // Guias (linhas centrais) para apoiar a caligrafia.
  ctx.strokeStyle = themeColor('--color-line', '#E4DFD4');
  ctx.lineWidth = 1;
  ctx.setLineDash([6, 6]);
  ctx.beginPath();
  ctx.moveTo(size / 2, 0);
  ctx.lineTo(size / 2, size);
  ctx.moveTo(0, size / 2);
  ctx.lineTo(size, size / 2);
  ctx.stroke();
  ctx.setLineDash([]);

  // Traços do usuário.
  ctx.strokeStyle = themeColor('--color-ink', '#1B2430');
  ctx.lineWidth = 8;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  for (const stroke of strokes) {
    if (stroke.length < 2) continue;
    ctx.beginPath();
    ctx.moveTo(stroke[0].x, stroke[0].y);
    for (let i = 1; i < stroke.length; i++) ctx.lineTo(stroke[i].x, stroke[i].y);
    ctx.stroke();
  }
}
