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
 * A NOTA compara a forma final do desenho com a forma de referência do
 * KanjiVG (src/data/kanjivg/kana-strokes.json, gerado por
 * scripts/build-kana-strokes.mjs), tratando todos os traços como uma única
 * nuvem de pontos (distância de Chamfer) — de propósito, sem exigir que o
 * usuário acerte quantidade, ordem ou direção dos traços. O que importa pra
 * nota é só: o desenho final ficou parecido com o kana esperado? Um kana
 * feito num traço só (sem levantar a caneta), mas com a forma certa, tira
 * nota alta.
 *
 * Quantidade/ordem/direção dos traços continuam gerando DICAS (comparando
 * traço a traço por índice, como antes), pra orientar o usuário a seguir o
 * traçado oficial — só não derrubam mais a nota.
 */

const REFERENCE_N = 32;
const SHAPE_DIST_THRESHOLD = 0.22;
const MIN_VECTOR_LENGTH = 0.03;

/** Nº total de pontos (aprox.) usado pra representar o desenho inteiro como nuvem, distribuído entre os traços proporcionalmente ao comprimento de cada um. */
const CLOUD_TOTAL_POINTS = 128;
const MIN_POINTS_PER_STROKE = 4;
/**
 * Distância média (Chamfer, em unidades da caixa delimitadora) acima da qual a
 * nota de forma vai a zero. Calibrado simulando tremor de mão realista
 * (ruído + leve desalinhamento entre traços + início/fim imprecisos): nesse
 * valor, um desenho correto mas tremido passa na maioria das vezes (~85-100%
 * dependendo do nível de tremor). Limitação conhecida: como a nota ignora
 * contagem/ordem/direção de traço por completo (de propósito), alguns pares
 * de kana bem parecidos (は/ほ, る/ろ, ぬ/め, よ/ま...) podem ocasionalmente
 * passar mesmo desenhados errados — não há como eliminar isso sem voltar a
 * penalizar contagem/ordem/direção, o que pioraria o problema oposto.
 */
const CLOUD_SHAPE_THRESHOLD = 0.12;

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

  // Nota: forma do desenho inteiro (nuvem de pontos) vs. forma de referência,
  // independente de quantos traços o usuário usou, em que ordem ou direção.
  const userCloud = buildPointCloud(userNorm);
  const refCloud = buildPointCloud(refNorm);
  const shape = chamferShapeScore(userCloud, refCloud);
  const score = Math.max(0, Math.min(100, Math.round(100 * shape)));

  // Dicas: pareamento traço a traço por índice, só orientativo — não afeta a nota.
  const diff = Math.abs(given.length - reference.length);
  const hints: string[] = [];
  if (diff !== 0) {
    hints.push(`O traçado oficial usa ${reference.length} traço(s) (você fez ${given.length}) — dá uma olhada na ordem certa.`);
  } else {
    for (let i = 0; i < reference.length; i++) {
      const strokeShape = shapeScore(userNorm[i], refNorm[i]);
      const direction = angleScore(strokeVector(userNorm[i]), strokeVector(refNorm[i]));
      if (direction < 0.4 && strokeShape >= 0.4) {
        hints.push(`Traço ${i + 1}: confira a direção (de onde a caneta começa e termina).`);
      } else if (strokeShape < 0.5) {
        hints.push(`Traço ${i + 1}: tente seguir a forma esperada mais de perto.`);
      }
    }
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

/**
 * Reamostra o desenho inteiro (todos os traços) numa nuvem de ~CLOUD_TOTAL_POINTS
 * pontos, distribuídos entre os traços proporcionalmente ao comprimento de cada
 * um — assim um kana desenhado num traço só (sem levantar a caneta) fica
 * representado com densidade equivalente a se tivesse sido feito no nº
 * "oficial" de traços.
 */
function buildPointCloud(strokes: ReferenceStrokes): number[][] {
  const lengths = strokes.map(polyline2DLength);
  const totalLength = lengths.reduce((a, b) => a + b, 0);
  if (totalLength === 0) return strokes.flatMap((s) => (s.length ? [s[0]] : []));

  const cloud: number[][] = [];
  strokes.forEach((stroke, i) => {
    const share = lengths[i] / totalLength;
    const n = Math.max(MIN_POINTS_PER_STROKE, Math.round(CLOUD_TOTAL_POINTS * share));
    cloud.push(...resamplePolyline2D(stroke, n));
  });
  return cloud;
}

/** Distância de Chamfer (simétrica): média, nos dois sentidos, da distância de cada ponto até o ponto mais próximo da outra nuvem. Não exige correspondência de traço, ordem ou direção — só proximidade geométrica. */
function chamferShapeScore(a: number[][], b: number[][]): number {
  const avgDist = (averageNearestDistance(a, b) + averageNearestDistance(b, a)) / 2;
  return Math.max(0, Math.min(1, 1 - avgDist / CLOUD_SHAPE_THRESHOLD));
}

function averageNearestDistance(from: number[][], to: number[][]): number {
  if (from.length === 0 || to.length === 0) return 0;
  let total = 0;
  for (const p of from) {
    let best = Infinity;
    for (const q of to) {
      const d = Math.hypot(p[0] - q[0], p[1] - q[1]);
      if (d < best) best = d;
    }
    total += best;
  }
  return total / from.length;
}

function polyline2DLength(points: number[][]): number {
  let len = 0;
  for (let i = 1; i < points.length; i++) len += Math.hypot(points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1]);
  return len;
}

/** Reamostragem equidistante genérica (sem timestamp), usada pra montar a nuvem de pontos. */
function resamplePolyline2D(points: number[][], n: number): number[][] {
  if (points.length === 0) return [];
  if (n <= 1) return [points[0]];
  if (points.length === 1 || polyline2DLength(points) === 0) {
    return Array.from({ length: n }, () => points[0]);
  }
  const total = polyline2DLength(points);
  const step = total / (n - 1);
  const out: number[][] = [points[0]];
  let acc = 0;
  let prev = points[0];

  for (let i = 1; i < points.length; i++) {
    const cur = points[i];
    let segment = Math.hypot(cur[0] - prev[0], cur[1] - prev[1]);
    while (acc + segment >= step && out.length < n) {
      const ratio = segment === 0 ? 0 : (step - acc) / segment;
      const np = [prev[0] + ratio * (cur[0] - prev[0]), prev[1] + ratio * (cur[1] - prev[1])];
      out.push(np);
      prev = np;
      segment = Math.hypot(cur[0] - prev[0], cur[1] - prev[1]);
      acc = 0;
    }
    acc += segment;
    prev = cur;
  }
  while (out.length < n) out.push(points[points.length - 1]);
  return out.slice(0, n);
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
