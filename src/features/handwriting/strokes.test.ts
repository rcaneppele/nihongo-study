import { describe, expect, it } from 'vitest';
import { ALL_KANA } from '../../data/kana';
import { KANJI_N5 } from '../../data/kanji';
import { DRAW_PASS_THRESHOLD, getReferenceStrokes, hasReference, resampleStroke, scoreDrawing, type Stroke } from './strokes';

const CANVAS = 280;

/** Desenha os traços de referência no canvas, como a mão faria (com margem e escala). */
function desenharReferencia(char: string, { escala = 0.8, deslocamento = 0.1, inverter = false } = {}): Stroke[] {
  const ref = getReferenceStrokes(char)!;
  let t = 0;
  return ref.map((traco) => {
    const pontos = traco.map(([x, y]) => ({ x: (deslocamento + x * escala) * CANVAS, y: (deslocamento + y * escala) * CANVAS, t: t++ }));
    return inverter ? pontos.reverse() : pontos;
  });
}

describe('dados de referência', () => {
  it('todo kana do treino tem traço de referência', () => {
    expect(ALL_KANA.filter((k) => !hasReference(k.char)).map((k) => k.char)).toEqual([]);
  });

  it('todo kanji do módulo tem traço de referência', () => {
    expect(KANJI_N5.filter((k) => !hasReference(k.char)).map((k) => k.char)).toEqual([]);
  });

  it('coordenadas normalizadas em [0, 1]', () => {
    for (const k of [...ALL_KANA, ...KANJI_N5]) {
      for (const traco of getReferenceStrokes(k.char)!) {
        expect(traco.length, k.char).toBeGreaterThan(0);
        for (const [x, y] of traco) {
          expect(x, k.char).toBeGreaterThanOrEqual(0);
          expect(x, k.char).toBeLessThanOrEqual(1);
          expect(y, k.char).toBeGreaterThanOrEqual(0);
          expect(y, k.char).toBeLessThanOrEqual(1);
        }
      }
    }
  });
});

describe('scoreDrawing', () => {
  it('o próprio traçado de referência passa, para todo kana e kanji', () => {
    const reprovados = [...ALL_KANA, ...KANJI_N5]
      .map((k) => ({ char: k.char, score: scoreDrawing(desenharReferencia(k.char), k.char, CANVAS).score }))
      .filter((r) => r.score < DRAW_PASS_THRESHOLD);
    expect(reprovados).toEqual([]);
  });

  it('desenho certo, na ordem e direção certas, não recebe dica', () => {
    for (const k of ALL_KANA.filter((k) => k.group === 'single')) {
      expect(scoreDrawing(desenharReferencia(k.char), k.char, CANVAS).hints, k.char).toEqual([]);
    }
  });

  it('combinados (yōon) usam a referência de cada kana, lado a lado', () => {
    const ref = getReferenceStrokes('きゃ')!;
    expect(ref).toHaveLength(getReferenceStrokes('き')!.length + getReferenceStrokes('ゃ')!.length);
    for (const [x] of ref.slice(0, getReferenceStrokes('き')!.length).flat()) expect(x).toBeLessThanOrEqual(0.5);
    expect(scoreDrawing(desenharReferencia('きゃ'), 'きゃ', CANVAS).passed).toBe(true);
    expect(scoreDrawing(desenharReferencia('き'), 'きゃ', CANVAS).passed).toBe(false);
  });

  it('não depende de onde nem de que tamanho se desenha no canvas', () => {
    for (const char of ['あ', 'ア', '日', '木']) {
      const pequeno = scoreDrawing(desenharReferencia(char, { escala: 0.4, deslocamento: 0.5 }), char, CANVAS);
      expect(pequeno.passed, char).toBe(true);
    }
  });

  it('desenhar outro caractere bem diferente reprova', () => {
    const pares: [string, string][] = [
      ['あ', 'い'],
      ['日', '木'],
      ['ん', 'ぬ'],
      ['ア', 'ロ'],
    ];
    for (const [desenhado, esperado] of pares) {
      const r = scoreDrawing(desenharReferencia(desenhado), esperado, CANVAS);
      expect(r.passed, `${desenhado} no lugar de ${esperado} (${r.score})`).toBe(false);
    }
  });

  it('traço na direção errada passa (a nota é a forma) mas ganha dica de direção', () => {
    const r = scoreDrawing(desenharReferencia('い', { inverter: true }), 'い', CANVAS);
    expect(r.passed).toBe(true);
    expect(r.hints.some((h) => h.includes('direção'))).toBe(true);
  });

  it('número de traços diferente vira dica', () => {
    const [primeiro] = desenharReferencia('け');
    const r = scoreDrawing([primeiro], 'け', CANVAS);
    expect(r.givenStrokes).toBe(1);
    expect(r.expectedStrokes).toBe(getReferenceStrokes('け')!.length);
    expect(r.hints[0]).toContain('traço(s)');
  });

  it('nada desenhado (ou "Não sei") dá zero', () => {
    expect(scoreDrawing([], 'あ', CANVAS)).toMatchObject({ score: 0, passed: false, givenStrokes: 0 });
    expect(scoreDrawing([[{ x: 1, y: 1, t: 0 }]], 'あ', CANVAS).score).toBe(0);
  });

  it('caractere sem referência dá zero com aviso', () => {
    expect(scoreDrawing(desenharReferencia('あ'), '★', CANVAS)).toMatchObject({ score: 0, expectedStrokes: 0 });
  });
});

describe('resampleStroke', () => {
  it('sempre devolve n pontos', () => {
    expect(resampleStroke([{ x: 0, y: 0, t: 0 }, { x: 10, y: 0, t: 1 }], 16)).toHaveLength(16);
    expect(resampleStroke([{ x: 5, y: 5, t: 0 }], 8)).toHaveLength(8);
    expect(resampleStroke([], 8)).toEqual([]);
  });
});
