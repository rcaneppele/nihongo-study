import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from '@vitest/browser/context';
import KanaCanvas from './KanaCanvas';
import { ThemeProvider } from '../lib/useTheme';
import type { Stroke } from '../features/handwriting/strokes';

/** Dispara um traço de verdade (pointerdown → moves → pointerup) sobre o canvas. */
function tracar(canvas: HTMLCanvasElement, pontos: [number, number][]) {
  const r = canvas.getBoundingClientRect();
  const evento = (tipo: string, [x, y]: [number, number]) =>
    canvas.dispatchEvent(new PointerEvent(tipo, { bubbles: true, pointerId: 1, isPrimary: true, clientX: r.left + x, clientY: r.top + y, buttons: 1 }));
  evento('pointerdown', pontos[0]);
  for (const p of pontos.slice(1)) evento('pointermove', p);
  evento('pointerup', pontos[pontos.length - 1]);
}

describe('KanaCanvas', () => {
  it('cada traço vira uma lista de pontos em coordenadas do canvas', async () => {
    const onStrokes = vi.fn<(s: Stroke[]) => void>();
    const tela = render(
      <ThemeProvider>
        <KanaCanvas size={200} onStrokesChange={onStrokes} />
      </ThemeProvider>
    );
    const canvas = tela.container.querySelector('canvas')!;
    await expect.element(page.elementLocator(canvas)).toBeVisible();
    tracar(canvas, [[20, 20], [60, 20], [100, 20]]);
    tracar(canvas, [[50, 10], [50, 150]]);
    await vi.waitFor(() => expect(onStrokes.mock.lastCall?.[0]).toHaveLength(2));
    const [primeiro, segundo] = onStrokes.mock.lastCall![0];
    expect(primeiro[0]).toMatchObject({ x: 20, y: 20 });
    expect(primeiro.at(-1)).toMatchObject({ x: 100, y: 20 });
    expect(segundo.at(-1)).toMatchObject({ x: 50, y: 150 });
  });

  it('desenha pixels no canvas (o traço aparece)', async () => {
    const tela = render(
      <ThemeProvider>
        <KanaCanvas size={200} />
      </ThemeProvider>
    );
    const canvas = tela.container.querySelector('canvas')!;
    tracar(canvas, [[20, 100], [180, 100]]);
    await vi.waitFor(() => {
      const ctx = canvas.getContext('2d')!;
      const dados = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let pintados = 0;
      for (let i = 3; i < dados.length; i += 4) if (dados[i] > 0) pintados++;
      expect(pintados).toBeGreaterThan(50);
    });
  });

  it('tem botão de limpar que apaga os traços', async () => {
    const onStrokes = vi.fn<(s: Stroke[]) => void>();
    const tela = render(
      <ThemeProvider>
        <KanaCanvas size={200} onStrokesChange={onStrokes} />
      </ThemeProvider>
    );
    tracar(tela.container.querySelector('canvas')!, [[20, 20], [100, 100]]);
    await vi.waitFor(() => expect(onStrokes.mock.lastCall?.[0]).toHaveLength(1));
    await tela.getByRole('button', { name: /Limpar/i }).click();
    await vi.waitFor(() => expect(onStrokes.mock.lastCall?.[0]).toHaveLength(0));
  });
});
