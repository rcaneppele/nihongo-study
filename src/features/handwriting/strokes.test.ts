import { describe, expect, it } from 'vitest';
import { ALL_KANA } from '../../data/kana';
import { KANJI_N5 } from '../../data/kanji';
import { DRAW_PASS_THRESHOLD, getReferenceStrokes, hasReference, resampleStroke, scoreDrawing, type Stroke } from './strokes';

const CANVAS = 280;

/** Desenha os traços de referência no canvas, como a mão faria (com margem e escala). */
function desenharReferencia(
  char: string,
  { escala = 0.8, escalaY = escala, deslocamento = 0.1, inverter = false }: { escala?: number; escalaY?: number; deslocamento?: number; inverter?: boolean } = {}
): Stroke[] {
  const ref = getReferenceStrokes(char)!;
  let t = 0;
  return ref.map((traco) => {
    const pontos = traco.map(([x, y]) => ({ x: (deslocamento + x * escala) * CANVAS, y: (deslocamento + y * escalaY) * CANVAS, t: t++ }));
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
    // Junta os problemas e confere uma vez só: um `expect` por coordenada estourava o tempo com cobertura.
    const fora = (v: number) => !(v >= 0 && v <= 1);
    const problemas: string[] = [];
    for (const k of [...ALL_KANA, ...KANJI_N5]) {
      for (const traco of getReferenceStrokes(k.char)!) {
        if (traco.length === 0) problemas.push(`${k.char}: traço vazio`);
        for (const [x, y] of traco) if (fora(x) || fora(y)) problemas.push(`${k.char}: (${x}, ${y})`);
      }
    }
    expect(problemas).toEqual([]);
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
    expect(r.passed).toBe(false);
    expect(r.hints[0]).toBe(`Ficou faltando traço: o traçado oficial usa ${r.expectedStrokes} (você fez 1) — veja a animação.`);
  });

  it('nada desenhado (ou "Não sei") dá zero', () => {
    expect(scoreDrawing([], 'あ', CANVAS)).toMatchObject({ score: 0, passed: false, givenStrokes: 0 });
    expect(scoreDrawing([[{ x: 1, y: 1, t: 0 }]], 'あ', CANVAS).score).toBe(0);
  });

  it('a proporção conta: o mesmo kana achatado reprova, com dica de forma', () => {
    const r = scoreDrawing(desenharReferencia('あ', { escalaY: 0.3 }), 'あ', CANVAS);
    expect(r.passed).toBe(false);
    expect(r.hints.some((h) => h.includes('forma'))).toBe(true);
  });

  it('desenho incompleto reprova, com nota na proporção do que foi feito', () => {
    const completo = scoreDrawing(desenharReferencia('日'), '日', CANVAS);
    const metade = scoreDrawing(desenharReferencia('日').slice(0, 2), '日', CANVAS);
    expect(metade.passed).toBe(false);
    expect(metade.score).toBeLessThan(completo.score);
    expect(metade.score).toBeLessThanOrEqual(Math.round(completo.score / 2));
    expect(metade.hints).toEqual(['Ficou faltando traço: o traçado oficial usa 4 (você fez 2) — veja a animação.']);
  });

  it('esquecer um traço curto também conta: が sem o tenten reprova', () => {
    const tracos = desenharReferencia('が');
    const r = scoreDrawing(tracos.slice(0, -2), 'が', CANVAS);
    expect(r.passed).toBe(false);
    expect(r.hints[0]).toMatch(/^Ficou faltando traço/);
  });

  it('um traço só esquecido, longe dos outros: reprova', () => {
    const r = scoreDrawing(desenharReferencia('い').slice(0, 1), 'い', CANVAS);
    expect(r.passed).toBe(false);
    expect(r.hints[0]).toMatch(/^Ficou faltando traço/);
  });

  it('traço a mais não é "faltando": só a dica de contagem', () => {
    const tracos = desenharReferencia('い');
    const r = scoreDrawing([...tracos, tracos[1]], 'い', CANVAS);
    expect(r.passed).toBe(true);
    expect(r.hints).toEqual(['O traçado oficial usa 2 traço(s) (você fez 3) — dá uma olhada na ordem certa.']);
  });

  it('desenhar ligando os traços (sem levantar a caneta) não conta como traço faltando', () => {
    const [primeiro, segundo] = desenharReferencia('い');
    const r = scoreDrawing([[...primeiro, ...segundo]], 'い', CANVAS);
    expect(r.passed).toBe(true);
    expect(r.hints.some((h) => h.startsWith('Ficou faltando'))).toBe(false);
  });

  it('traços na ordem trocada: a nota é a forma do todo, mas cada traço ganha dica', () => {
    const [primeiro, segundo] = desenharReferencia('い');
    const r = scoreDrawing([segundo, primeiro], 'い', CANVAS);
    expect(r.passed).toBe(true);
    expect(r.hints).toEqual(['Traço 1: tente seguir a forma esperada mais de perto.', 'Traço 2: tente seguir a forma esperada mais de perto.']);
  });

  it('no máximo 3 dicas, por mais traços que haja para corrigir', () => {
    const r = scoreDrawing(desenharReferencia('語', { inverter: true }), '語', CANVAS);
    expect(r.hints).toHaveLength(3);
    expect(r.hints[0]).toBe('Traço 1: confira a direção (de onde a caneta começa e termina).');
  });

  it('toque solto (um ponto só) não conta como traço', () => {
    const r = scoreDrawing([...desenharReferencia('あ'), [{ x: 5, y: 5, t: 99 }]], 'あ', CANVAS);
    expect(r).toMatchObject({ givenStrokes: getReferenceStrokes('あ')!.length, hints: [] });
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

  it('pontos equidistantes ao longo do traço, do primeiro ao último, com o tempo interpolado', () => {
    const traco = [
      { x: 0, y: 0, t: 0 },
      { x: 30, y: 0, t: 30 },
      { x: 30, y: 10, t: 40 },
    ];
    expect(resampleStroke(traco, 5)).toEqual([
      { x: 0, y: 0, t: 0 },
      { x: 10, y: 0, t: 10 },
      { x: 20, y: 0, t: 20 },
      { x: 30, y: 0, t: 30 },
      { x: 30, y: 10, t: 40 },
    ]);
  });

  it('traço parado (um ponto, ou todos no mesmo lugar) vira n cópias do ponto', () => {
    const p = { x: 5, y: 5, t: 0 };
    expect(resampleStroke([p], 3)).toEqual([p, p, p]);
    expect(resampleStroke([p, { ...p, t: 1 }], 3)).toEqual([p, p, p]);
  });
});
