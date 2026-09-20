/**
 * Gera src/data/kanjivg/kana-strokes.json a partir do projeto KanjiVG
 * (CC BY-SA — https://kanjivg.tagaini.net/). Lógica de busca/parse do SVG
 * compartilhada com build-kanji-strokes.mjs — ver scripts/lib/kanjivg.mjs.
 *
 * Uso: node scripts/build-kana-strokes.mjs
 *
 * RESAMPLE_N (pontos por traço) precisa ficar igual ao usado por
 * resampleStroke() em src/features/handwriting/strokes.ts, para comparação
 * direta em tempo de execução.
 *
 * A lista HIRAGANA_GROUPS abaixo precisa ficar em sincronia com FAMILY_DATA
 * em src/data/kana.ts — se adicionar uma família de kana lá, adicione aqui
 * também e rode este script de novo.
 */
import { writeFile } from 'node:fs/promises';
import { fetchStrokesForChars } from './lib/kanjivg.mjs';

const OUT_FILE = new URL('../src/data/kanjivg/kana-strokes.json', import.meta.url);
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

async function main() {
  console.log(`Buscando ${ALL_CHARS.length} kana do KanjiVG...`);
  const { out, errors } = await fetchStrokesForChars(ALL_CHARS, { concurrency: CONCURRENCY, resampleN: RESAMPLE_N });
  console.log('\n');
  if (errors.length) {
    console.error('Falhas:', errors.join('\n'));
  }
  console.log(`OK: ${Object.keys(out).length}/${ALL_CHARS.length}`);
  await writeFile(OUT_FILE, JSON.stringify(out));
  console.log(`Salvo em ${OUT_FILE.pathname}`);
}

main();
