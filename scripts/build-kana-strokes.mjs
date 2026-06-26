/**
 * Gera src/data/kanjivg/kana-strokes.json a partir do projeto KanjiVG
 * (CC BY-SA — https://kanjivg.tagaini.net/).
 *
 * Uso: node scripts/build-kana-strokes.mjs
 *
 * Baixa o SVG de cada kana, extrai os <path> dentro do grupo
 * StrokePaths_XXXXX (já na ordem correta de traço), converte cada path em
 * pontos amostrados, normaliza pelas dimensões do viewBox (→ [0,1]) e
 * reamostra cada traço para RESAMPLE_N pontos equidistantes — o mesmo número
 * usado por resampleStroke() em src/features/kana/strokes.ts, para comparação
 * direta em tempo de execução.
 *
 * A lista HIRAGANA_GROUPS abaixo precisa ficar em sincronia com FAMILY_DATA
 * em src/data/kana.ts — se adicionar uma família de kana lá, adicione aqui
 * também e rode este script de novo.
 */
import { writeFile } from 'node:fs/promises';

const OUT_FILE = new URL('../src/data/kanjivg/kana-strokes.json', import.meta.url);
const BASE_URL = 'https://raw.githubusercontent.com/KanjiVG/kanjivg/master/kanji/';
const SEGMENTS = 12;
const RESAMPLE_N = 32;
const CONCURRENCY = 8;

const HIRAGANA_GROUPS = [
  'あいうえお', 'かきくけこ', 'さしすせそ', 'たちつてと', 'なにぬねの',
  'はひふへほ', 'まみむめも', 'やゆよ', 'らりるれろ', 'わを', 'ん',
  'がぎぐげご', 'ざじずぜぞ', 'だぢづでど', 'ばびぶべぼ', 'ぱぴぷぺぽ',
  'ゃゅょ',
];
const HIRAGANA_CHARS = Array.from(new Set(HIRAGANA_GROUPS.flatMap((g) => Array.from(g))));

function toKatakana(ch) {
  return String.fromCodePoint(ch.codePointAt(0) + 0x60);
}
const KATAKANA_CHARS = HIRAGANA_CHARS.map(toKatakana);
const ALL_CHARS = [...HIRAGANA_CHARS, ...KATAKANA_CHARS];

function kanjivgId(ch) {
  return ch.codePointAt(0).toString(16).padStart(5, '0');
}

async function fetchText(url, attempt = 1) {
  const res = await fetch(url);
  if (!res.ok) {
    if (attempt < 3) {
      await new Promise((r) => setTimeout(r, 300 * attempt));
      return fetchText(url, attempt + 1);
    }
    throw new Error(`HTTP ${res.status} em ${url}`);
  }
  return res.text();
}

function tokenizePath(d) {
  return d.match(/[MmLlHhVvCcSsQqTtAaZz]|-?\d*\.?\d+(?:e-?\d+)?/g) || [];
}

function parsePathToPoints(d) {
  const tokens = tokenizePath(d);
  let i = 0;
  const nums = (n) => {
    const out = [];
    for (let k = 0; k < n; k++) out.push(parseFloat(tokens[i++]));
    return out;
  };

  let cur = { x: 0, y: 0 };
  let start = { x: 0, y: 0 };
  let prevCtrl = null;
  const points = [];
  let cmd = null;

  function sampleCubic(p0, p1, p2, p3) {
    for (let s = 1; s <= SEGMENTS; s++) {
      const t = s / SEGMENTS;
      const mt = 1 - t;
      points.push({
        x: mt * mt * mt * p0.x + 3 * mt * mt * t * p1.x + 3 * mt * t * t * p2.x + t * t * t * p3.x,
        y: mt * mt * mt * p0.y + 3 * mt * mt * t * p1.y + 3 * mt * t * t * p2.y + t * t * t * p3.y,
      });
    }
  }
  function sampleQuad(p0, p1, p2) {
    for (let s = 1; s <= SEGMENTS; s++) {
      const t = s / SEGMENTS;
      const mt = 1 - t;
      points.push({
        x: mt * mt * p0.x + 2 * mt * t * p1.x + t * t * p2.x,
        y: mt * mt * p0.y + 2 * mt * t * p1.y + t * t * p2.y,
      });
    }
  }

  while (i < tokens.length) {
    const tok = tokens[i];
    if (/^[MmLlHhVvCcSsQqTtAaZz]$/.test(tok)) {
      cmd = tok;
      i++;
    }
    switch (cmd) {
      case 'M': {
        const [x, y] = nums(2);
        cur = { x, y };
        start = cur;
        points.push({ ...cur });
        break;
      }
      case 'm': {
        const [dx, dy] = nums(2);
        cur = { x: cur.x + dx, y: cur.y + dy };
        start = cur;
        points.push({ ...cur });
        break;
      }
      case 'L': {
        const [x, y] = nums(2);
        cur = { x, y };
        points.push({ ...cur });
        break;
      }
      case 'l': {
        const [dx, dy] = nums(2);
        cur = { x: cur.x + dx, y: cur.y + dy };
        points.push({ ...cur });
        break;
      }
      case 'H': {
        const [x] = nums(1);
        cur = { x, y: cur.y };
        points.push({ ...cur });
        break;
      }
      case 'h': {
        const [dx] = nums(1);
        cur = { x: cur.x + dx, y: cur.y };
        points.push({ ...cur });
        break;
      }
      case 'V': {
        const [y] = nums(1);
        cur = { x: cur.x, y };
        points.push({ ...cur });
        break;
      }
      case 'v': {
        const [dy] = nums(1);
        cur = { x: cur.x, y: cur.y + dy };
        points.push({ ...cur });
        break;
      }
      case 'C': {
        const [x1, y1, x2, y2, x, y] = nums(6);
        const p0 = cur, p1 = { x: x1, y: y1 }, p2 = { x: x2, y: y2 }, p3 = { x, y };
        sampleCubic(p0, p1, p2, p3);
        cur = p3;
        prevCtrl = p2;
        break;
      }
      case 'c': {
        const [x1, y1, x2, y2, x, y] = nums(6);
        const p0 = cur;
        const p1 = { x: cur.x + x1, y: cur.y + y1 };
        const p2 = { x: cur.x + x2, y: cur.y + y2 };
        const p3 = { x: cur.x + x, y: cur.y + y };
        sampleCubic(p0, p1, p2, p3);
        cur = p3;
        prevCtrl = p2;
        break;
      }
      case 'S': {
        const [x2, y2, x, y] = nums(4);
        const p0 = cur;
        const p1 = prevCtrl ? { x: 2 * cur.x - prevCtrl.x, y: 2 * cur.y - prevCtrl.y } : cur;
        const p2 = { x: x2, y: y2 };
        const p3 = { x, y };
        sampleCubic(p0, p1, p2, p3);
        cur = p3;
        prevCtrl = p2;
        break;
      }
      case 's': {
        const [x2, y2, x, y] = nums(4);
        const p0 = cur;
        const p1 = prevCtrl ? { x: 2 * cur.x - prevCtrl.x, y: 2 * cur.y - prevCtrl.y } : cur;
        const p2 = { x: cur.x + x2, y: cur.y + y2 };
        const p3 = { x: cur.x + x, y: cur.y + y };
        sampleCubic(p0, p1, p2, p3);
        cur = p3;
        prevCtrl = p2;
        break;
      }
      case 'Q': {
        const [x1, y1, x, y] = nums(4);
        sampleQuad(cur, { x: x1, y: y1 }, { x, y });
        cur = { x, y };
        prevCtrl = { x: x1, y: y1 };
        break;
      }
      case 'q': {
        const [x1, y1, x, y] = nums(4);
        const p1 = { x: cur.x + x1, y: cur.y + y1 };
        const p2 = { x: cur.x + x, y: cur.y + y };
        sampleQuad(cur, p1, p2);
        cur = p2;
        prevCtrl = p1;
        break;
      }
      case 'Z':
      case 'z': {
        points.push({ ...start });
        cur = start;
        break;
      }
      default:
        throw new Error(`comando de path não suportado: "${cmd}" em "${d}"`);
    }
  }
  return points;
}

function dist(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}
function pathLength(pts) {
  let len = 0;
  for (let i = 1; i < pts.length; i++) len += dist(pts[i - 1], pts[i]);
  return len;
}
function resample(pts, n) {
  if (pts.length === 0) return [];
  if (pts.length === 1 || pathLength(pts) === 0) return Array.from({ length: n }, () => pts[0]);
  const total = pathLength(pts);
  const step = total / (n - 1);
  const out = [pts[0]];
  let acc = 0;
  let prev = pts[0];
  for (let i = 1; i < pts.length; i++) {
    const curPt = pts[i];
    let segment = dist(prev, curPt);
    while (acc + segment >= step && out.length < n) {
      const ratio = segment === 0 ? 0 : (step - acc) / segment;
      const np = { x: prev.x + ratio * (curPt.x - prev.x), y: prev.y + ratio * (curPt.y - prev.y) };
      out.push(np);
      prev = np;
      segment = dist(prev, curPt);
      acc = 0;
    }
    acc += segment;
    prev = curPt;
  }
  while (out.length < n) out.push(pts[pts.length - 1]);
  return out.slice(0, n);
}

function extractStrokePaths(svg, id) {
  const groupMatch = svg.match(new RegExp(`<g id="kvg:StrokePaths_${id}"[^>]*>([\\s\\S]*?)</g>\\s*</g>`));
  const scope = groupMatch ? groupMatch[1] : svg;
  const pathRe = /<path[^>]*\sd="([^"]+)"/g;
  const ds = [];
  let m;
  while ((m = pathRe.exec(scope))) ds.push(m[1]);
  return ds;
}

function extractViewBox(svg) {
  const m = svg.match(/viewBox="([\d.\s-]+)"/);
  if (!m) return { w: 109, h: 109 };
  const [, , w, h] = m[1].trim().split(/\s+/).map(Number);
  return { w, h };
}

async function processChar(ch) {
  const id = kanjivgId(ch);
  const svg = await fetchText(`${BASE_URL}${id}.svg`);
  const { w, h } = extractViewBox(svg);
  const ds = extractStrokePaths(svg, id);
  if (ds.length === 0) throw new Error(`${ch} (${id}): nenhum stroke path encontrado`);
  const strokes = ds.map((d) => {
    const raw = parsePathToPoints(d);
    const sampled = resample(raw, RESAMPLE_N);
    return sampled.map((p) => [round(p.x / w), round(p.y / h)]);
  });
  return { char: ch, id, strokes };
}

function round(n) {
  return Math.round(n * 10000) / 10000;
}

async function mapWithConcurrency(items, limit, fn) {
  const results = new Array(items.length);
  let idx = 0;
  async function worker() {
    while (idx < items.length) {
      const cur = idx++;
      results[cur] = await fn(items[cur], cur);
    }
  }
  await Promise.all(Array.from({ length: limit }, worker));
  return results;
}

async function main() {
  console.log(`Buscando ${ALL_CHARS.length} kana do KanjiVG...`);
  const out = {};
  const errors = [];
  await mapWithConcurrency(ALL_CHARS, CONCURRENCY, async (ch) => {
    try {
      const { strokes } = await processChar(ch);
      out[ch] = { strokes };
      process.stdout.write('.');
    } catch (err) {
      errors.push(`${ch}: ${err.message}`);
      process.stdout.write('x');
    }
  });
  console.log('\n');
  if (errors.length) {
    console.error('Falhas:', errors.join('\n'));
  }
  console.log(`OK: ${Object.keys(out).length}/${ALL_CHARS.length}`);
  await writeFile(OUT_FILE, JSON.stringify(out));
  console.log(`Salvo em ${OUT_FILE.pathname}`);
}

main();
