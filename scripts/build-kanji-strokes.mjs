/**
 * Gera src/data/kanjivg/kanji-strokes.json a partir do projeto KanjiVG
 * (CC BY-SA — https://kanjivg.tagaini.net/). Lógica de busca/parse do SVG
 * compartilhada com build-kana-strokes.mjs — ver scripts/lib/kanjivg.mjs.
 *
 * Uso: node scripts/build-kanji-strokes.mjs
 *
 * A lista KANJI_CHARS abaixo precisa ficar em sincronia com KANJI_N5 em
 * src/data/kanji.ts — se adicionar kanji novos lá (N4, N3...), adicione os
 * caracteres aqui também e rode este script de novo. Node não consegue
 * importar o .ts diretamente sem um passo de build, por isso a lista é
 * duplicada aqui em vez de importada (mesmo padrão de
 * build-kana-strokes.mjs com FAMILY_DATA de src/data/kana.ts).
 */
import { writeFile } from 'node:fs/promises';
import { fetchStrokesForChars } from './lib/kanjivg.mjs';

const OUT_FILE = new URL('../src/data/kanjivg/kanji-strokes.json', import.meta.url);
const RESAMPLE_N = 32;
const CONCURRENCY = 8;

// prettier-ignore
const KANJI_CHARS = [
  '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '百', '千', '万', '円', '時',
  '分', '半', '週', '曜', '年', '月', '今', '火', '水', '木', '金', '土', '日', '上', '下',
  '中', '外', '前', '後', '左', '右', '東', '西', '南', '北', '大', '小', '高', '安', '新',
  '古', '長', '多', '少', '早', '白', '黒', '赤', '青', '山', '川', '田', '天', '気', '雨',
  '花', '人', '子', '女', '男', '父', '母', '友', '私', '目', '耳', '口', '手', '足', '車',
  '電', '話', '語', '本', '学', '校', '生', '先', '名', '国', '会', '社', '店', '駅', '道',
  '見', '聞', '読', '書', '食', '飲', '行', '来', '出', '入', '立', '休', '買', '使', '待',
  '作', '持', '歩', '走', '帰',
];

const ALL_CHARS = Array.from(new Set(KANJI_CHARS));

async function main() {
  console.log(`Buscando ${ALL_CHARS.length} kanji do KanjiVG...`);
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
