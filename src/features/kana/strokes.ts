import kanaStrokesData from '../../data/kanjivg/kana-strokes.json';

/**
 * Captura de traços do modo desenho.
 *
 * Um traço (Stroke) é a sequência de pontos entre apertar e soltar (pointerdown
 * → pointerup). Guardamos x, y e t (timestamp) — t é útil para analisar ritmo e
 * direção. Esses dados são a base para:
 *   1) reconhecer qual kana foi desenhado;
 *   2) dar feedback de caligrafia comparando com a ordem/direção do KanjiVG.
 */

export interface Point {
  x: number;
  y: number;
  t: number;
}

export type Stroke = Point[];

/** Reamostra um traço para N pontos equidistantes (normaliza p/ comparação). */
export function resampleStroke(stroke: Stroke, n = 32): Point[] {
  if (stroke.length === 0) return stroke;
  if (stroke.length === 1 || pathLength(stroke) === 0) {
    return Array.from({ length: n }, () => stroke[0]);
  }
  const total = pathLength(stroke);
  const step = total / (n - 1);
  const out: Point[] = [stroke[0]];
  let acc = 0;
  let prev = stroke[0];

  for (let i = 1; i < stroke.length; i++) {
    const cur = stroke[i];
    let segment = dist(prev, cur);
    while (acc + segment >= step && out.length < n) {
      const ratio = segment === 0 ? 0 : (step - acc) / segment;
      const np: Point = {
        x: prev.x + ratio * (cur.x - prev.x),
        y: prev.y + ratio * (cur.y - prev.y),
        t: prev.t + ratio * (cur.t - prev.t),
      };
      out.push(np);
      prev = np;
      segment = dist(prev, cur);
      acc = 0;
    }
    acc += segment;
    prev = cur;
  }
  while (out.length < n) out.push(stroke[stroke.length - 1]);
  return out.slice(0, n);
}

function dist(a: Point, b: Point): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function pathLength(stroke: Stroke): number {
  let len = 0;
  for (let i = 1; i < stroke.length; i++) len += dist(stroke[i - 1], stroke[i]);
  return len;
}

/**
 * Reconhecimento e feedback de caligrafia.
 *
 * Compara os traços do usuário com os dados de referência do KanjiVG
 * (src/data/kanjivg/kana-strokes.json, gerado por scripts/build-kana-strokes.mjs):
 *   - nº de traços (esperado x feito);
 *   - forma de cada traço (distância média ponto a ponto, após normalizar
 *     posição/escala pela caixa delimitadora — assim um kana desenhado menor
 *     ou deslocado no canvas não é penalizado por isso, só pela forma);
 *   - direção de cada traço (do ponto inicial ao final, comparada por ângulo).
 * Traços são pareados por índice (traço 1 do usuário vs. traço 1 da
 * referência, etc.), o que também penaliza naturalmente erros de ordem: um
 * traço fora de ordem tende a comparar mal contra o traço errado da referência.
 */

const REFERENCE_N = 32;
const SHAPE_DIST_THRESHOLD = 0.22;
const MIN_VECTOR_LENGTH = 0.03;

export const DRAW_PASS_THRESHOLD = 60;

export type ReferenceStrokes = number[][][]; // [traço][ponto][x, y], normalizado em [0,1]

const REFERENCE_DATA = kanaStrokesData as Record<string, { strokes: ReferenceStrokes }>;

export function hasReference(char: string): boolean {
  return char in REFERENCE_DATA;
}

/** Traços de referência (ordem correta, coordenadas em [0,1]) — para exibir como dica/feedback. */
export function getReferenceStrokes(char: string): ReferenceStrokes | undefined {
  return REFERENCE_DATA[char]?.strokes;
}

export interface DrawScore {
  score: number; // 0..100
  passed: boolean;
  expectedStrokes: number;
  givenStrokes: number;
  hints: string[];
}

export function scoreDrawing(strokes: Stroke[], char: string, canvasSize: number): DrawScore {
  const reference = REFERENCE_DATA[char]?.strokes;
  const given = strokes.filter((s) => s.length > 1);

  if (!reference || reference.length === 0) {
    return { score: 0, passed: false, expectedStrokes: 0, givenStrokes: given.length, hints: ['Sem dados de referência para este kana.'] };
  }
  if (given.length === 0) {
    return { score: 0, passed: false, expectedStrokes: reference.length, givenStrokes: 0, hints: ['Desenhe o kana antes de verificar.'] };
  }

  const userNorm = normalizeByBoundingBox(toUnitSquareStrokes(given, canvasSize));
  const refNorm = normalizeByBoundingBox(reference);

  const pairCount = Math.min(userNorm.length, refNorm.length);
  const strokeScores: number[] = [];
  const strokeHints: string[] = [];

  for (let i = 0; i < pairCount; i++) {
    const shape = shapeScore(userNorm[i], refNorm[i]);
    const direction = angleScore(strokeVector(userNorm[i]), strokeVector(refNorm[i]));
    strokeScores.push(shape * 0.65 + direction * 0.35);

    if (direction < 0.4 && shape >= 0.4) {
      strokeHints.push(`Traço ${i + 1}: confira a direção (de onde a caneta começa e termina).`);
    } else if (shape < 0.5) {
      strokeHints.push(`Traço ${i + 1}: tente seguir a forma esperada mais de perto.`);
    }
  }

  const pairedAvg = strokeScores.length ? strokeScores.reduce((a, b) => a + b, 0) / strokeScores.length : 0;
  const diff = Math.abs(given.length - reference.length);
  const countFactor = diff === 0 ? 1 : diff === 1 ? 0.75 : 0.5;
  const score = Math.max(0, Math.min(100, Math.round(100 * pairedAvg * countFactor)));

  const hints = [...strokeHints];
  if (diff !== 0) {
    hints.unshift(
      given.length < reference.length
        ? `Esperado ${reference.length} traço(s), você fez ${given.length} — faltou pelo menos um.`
        : `Esperado ${reference.length} traço(s), você fez ${given.length} — traço(s) extra.`
    );
  }

  return {
    score,
    passed: score >= DRAW_PASS_THRESHOLD,
    expectedStrokes: reference.length,
    givenStrokes: given.length,
    hints: hints.slice(0, 3),
  };
}

function toUnitSquareStrokes(strokes: Stroke[], canvasSize: number): ReferenceStrokes {
  return strokes.map((s) => resampleStroke(s, REFERENCE_N).map((p) => [p.x / canvasSize, p.y / canvasSize]));
}

/** Centraliza e escala (preservando proporção) pela caixa delimitadora conjunta de todos os traços. */
function normalizeByBoundingBox(strokes: ReferenceStrokes): ReferenceStrokes {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  for (const stroke of strokes) {
    for (const [x, y] of stroke) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
  const span = Math.max(maxX - minX, maxY - minY, 1e-6);
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  return strokes.map((stroke) => stroke.map(([x, y]) => [(x - cx) / span + 0.5, (y - cy) / span + 0.5]));
}

function shapeScore(a: number[][], b: number[][]): number {
  let total = 0;
  for (let i = 0; i < a.length; i++) total += Math.hypot(a[i][0] - b[i][0], a[i][1] - b[i][1]);
  const avg = total / a.length;
  return Math.max(0, Math.min(1, 1 - avg / SHAPE_DIST_THRESHOLD));
}

function strokeVector(stroke: number[][]): { dx: number; dy: number; len: number } {
  const [x0, y0] = stroke[0];
  const [x1, y1] = stroke[stroke.length - 1];
  const dx = x1 - x0;
  const dy = y1 - y0;
  return { dx, dy, len: Math.hypot(dx, dy) };
}

function angleScore(a: { dx: number; dy: number; len: number }, b: { dx: number; dy: number; len: number }): number {
  if (a.len < MIN_VECTOR_LENGTH || b.len < MIN_VECTOR_LENGTH) return 1;
  const cos = (a.dx * b.dx + a.dy * b.dy) / (a.len * b.len);
  return Math.max(0, cos);
}
