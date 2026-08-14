import type { KanaType } from '../db/schema';

export type KanaGroup = 'single' | 'composite';

export interface KanaEntry {
  char: string;
  romaji: string;
  type: KanaType;
  row: string; // família do gojūon: a, ka, ..., ga, za, ..., kya, sha, ...
  group: KanaGroup;
}

export interface KanaFamily {
  key: string;
  group: KanaGroup;
}

interface FamilyDef {
  key: string;
  group: KanaGroup;
  // Cada elemento é uma "unidade" de kana em hiragana — 1 caractere no seion/
  // dakuten/handakuten, mas 2 codepoints no yōon (ex.: "きゃ" = き + ゃ). Por
  // isso não dá para guardar a família como uma string só e dividir por
  // caractere: isso quebraria os pares yōon em pedaços soltos.
  kana: string[];
  romaji: string[];
}

// Katakana é derivado pelo deslocamento de código Unicode (+0x60) de cada
// codepoint da unidade, já que os dois blocos têm o mesmo layout
// (ex.: あ U+3042 + 0x60 = ア U+30A2).
const FAMILY_DATA: FamilyDef[] = [
  // Seion
  { key: 'a', group: 'single', kana: ['あ', 'い', 'う', 'え', 'お'], romaji: ['a', 'i', 'u', 'e', 'o'] },
  { key: 'ka', group: 'single', kana: ['か', 'き', 'く', 'け', 'こ'], romaji: ['ka', 'ki', 'ku', 'ke', 'ko'] },
  { key: 'sa', group: 'single', kana: ['さ', 'し', 'す', 'せ', 'そ'], romaji: ['sa', 'shi', 'su', 'se', 'so'] },
  { key: 'ta', group: 'single', kana: ['た', 'ち', 'つ', 'て', 'と'], romaji: ['ta', 'chi', 'tsu', 'te', 'to'] },
  { key: 'na', group: 'single', kana: ['な', 'に', 'ぬ', 'ね', 'の'], romaji: ['na', 'ni', 'nu', 'ne', 'no'] },
  { key: 'ha', group: 'single', kana: ['は', 'ひ', 'ふ', 'へ', 'ほ'], romaji: ['ha', 'hi', 'fu', 'he', 'ho'] },
  { key: 'ma', group: 'single', kana: ['ま', 'み', 'む', 'め', 'も'], romaji: ['ma', 'mi', 'mu', 'me', 'mo'] },
  { key: 'ya', group: 'single', kana: ['や', 'ゆ', 'よ'], romaji: ['ya', 'yu', 'yo'] },
  { key: 'ra', group: 'single', kana: ['ら', 'り', 'る', 'れ', 'ろ'], romaji: ['ra', 'ri', 'ru', 're', 'ro'] },
  { key: 'wa', group: 'single', kana: ['わ', 'を'], romaji: ['wa', 'wo'] },
  { key: 'n', group: 'single', kana: ['ん'], romaji: ['n'] },
  // Dakuten / handakuten
  { key: 'ga', group: 'single', kana: ['が', 'ぎ', 'ぐ', 'げ', 'ご'], romaji: ['ga', 'gi', 'gu', 'ge', 'go'] },
  { key: 'za', group: 'single', kana: ['ざ', 'じ', 'ず', 'ぜ', 'ぞ'], romaji: ['za', 'ji', 'zu', 'ze', 'zo'] },
  { key: 'da', group: 'single', kana: ['だ', 'ぢ', 'づ', 'で', 'ど'], romaji: ['da', 'ji', 'zu', 'de', 'do'] },
  { key: 'ba', group: 'single', kana: ['ば', 'び', 'ぶ', 'べ', 'ぼ'], romaji: ['ba', 'bi', 'bu', 'be', 'bo'] },
  { key: 'pa', group: 'single', kana: ['ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ'], romaji: ['pa', 'pi', 'pu', 'pe', 'po'] },
  // Yōon (combinados)
  { key: 'kya', group: 'composite', kana: ['きゃ', 'きゅ', 'きょ'], romaji: ['kya', 'kyu', 'kyo'] },
  { key: 'sha', group: 'composite', kana: ['しゃ', 'しゅ', 'しょ'], romaji: ['sha', 'shu', 'sho'] },
  { key: 'cha', group: 'composite', kana: ['ちゃ', 'ちゅ', 'ちょ'], romaji: ['cha', 'chu', 'cho'] },
  { key: 'nya', group: 'composite', kana: ['にゃ', 'にゅ', 'にょ'], romaji: ['nya', 'nyu', 'nyo'] },
  { key: 'hya', group: 'composite', kana: ['ひゃ', 'ひゅ', 'ひょ'], romaji: ['hya', 'hyu', 'hyo'] },
  { key: 'mya', group: 'composite', kana: ['みゃ', 'みゅ', 'みょ'], romaji: ['mya', 'myu', 'myo'] },
  { key: 'rya', group: 'composite', kana: ['りゃ', 'りゅ', 'りょ'], romaji: ['rya', 'ryu', 'ryo'] },
  { key: 'gya', group: 'composite', kana: ['ぎゃ', 'ぎゅ', 'ぎょ'], romaji: ['gya', 'gyu', 'gyo'] },
  { key: 'ja', group: 'composite', kana: ['じゃ', 'じゅ', 'じょ'], romaji: ['ja', 'ju', 'jo'] },
  { key: 'bya', group: 'composite', kana: ['びゃ', 'びゅ', 'びょ'], romaji: ['bya', 'byu', 'byo'] },
  { key: 'pya', group: 'composite', kana: ['ぴゃ', 'ぴゅ', 'ぴょ'], romaji: ['pya', 'pyu', 'pyo'] },
];

const KATAKANA_OFFSET = 0x60;

function toKatakana(unit: string): string {
  return Array.from(unit)
    .map((ch) => String.fromCodePoint(ch.codePointAt(0)! + KATAKANA_OFFSET))
    .join('');
}

export const KANA_FAMILIES: KanaFamily[] = FAMILY_DATA.map(({ key, group }) => ({ key, group }));

function buildEntries(type: KanaType): KanaEntry[] {
  return FAMILY_DATA.flatMap(({ key, group, kana, romaji }) =>
    kana.map((unit, i) => ({
      char: type === 'hiragana' ? unit : toKatakana(unit),
      romaji: romaji[i],
      type,
      row: key,
      group,
    }))
  );
}

export const HIRAGANA_KANA = buildEntries('hiragana');
export const KATAKANA_KANA = buildEntries('katakana');
export const ALL_KANA = [...HIRAGANA_KANA, ...KATAKANA_KANA];

export function getKana(type: KanaType | 'both'): KanaEntry[] {
  if (type === 'hiragana') return HIRAGANA_KANA;
  if (type === 'katakana') return KATAKANA_KANA;
  return ALL_KANA;
}

export function getKanaByFamilies(type: KanaType | 'both', familyKeys: Iterable<string>): KanaEntry[] {
  const keys = new Set(familyKeys);
  return getKana(type).filter((k) => keys.has(k.row));
}

// Texto de prévia de uma família (ex.: "あいうえお") para a tela de seleção.
export function familyPreview(type: KanaType, key: string): string {
  return getKana(type)
    .filter((k) => k.row === key)
    .map((k) => k.char)
    .join('');
}

// Grupos de kana que iniciantes costumam confundir visualmente — usados como
// distratores prioritários no modo "múltipla escolha" (src/routes/Kana.tsx).
// Formas parecidas dentro do mesmo script se confundem por motivos
// diferentes em hiragana e katakana, por isso as listas são separadas (não
// dá pra derivar uma da outra pelo deslocamento de código Unicode).
const HIRAGANA_CONFUSABLE_GROUPS: string[][] = [
  ['ぬ', 'め', 'ね', 'れ', 'わ'],
  ['さ', 'ち', 'き'],
  ['る', 'ろ'],
  ['は', 'ほ'],
  ['く', 'へ'],
  ['い', 'り'],
  ['あ', 'お'],
];

const KATAKANA_CONFUSABLE_GROUPS: string[][] = [
  ['シ', 'ツ'],
  ['ソ', 'ン'],
  ['ウ', 'ワ'],
  ['チ', 'テ'],
  ['ル', 'レ'],
  ['ミ', 'ニ', 'コ'],
  ['ク', 'タ'],
];

export function getConfusables(type: KanaType, char: string): string[] {
  const groups = type === 'hiragana' ? HIRAGANA_CONFUSABLE_GROUPS : KATAKANA_CONFUSABLE_GROUPS;
  const group = groups.find((g) => g.includes(char));
  return group ? group.filter((c) => c !== char) : [];
}
