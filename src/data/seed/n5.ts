import raw from './n5.json';

/**
 * Deck de vocabulário N5 (JLPT), pra importação por categoria em Config >
 * Dados > "Vocabulário N5". Fonte: lista pública de vocabulário N5
 * (formato Anki, tanos.co.uk), traduzida/categorizada em pt-BR.
 */
export interface N5Entry {
  front: string;
  reading: string;
  back: string;
  category: string;
  tags: string[];
}

const KANJI_RE = /[一-龯]/;

// Por enquanto, fora os cards com kanji na frente — o usuário ainda está
// aprendendo a ler kana (mesma regra das lições, ver CLAUDE.md). `raw` fica
// completo em n5.json; é só remover este filtro quando fizer sentido incluir
// kanji.
export const N5_DECK: N5Entry[] = (raw as N5Entry[]).filter((entry) => !KANJI_RE.test(entry.front));

export const N5_CATEGORY_ORDER = [
  'Substantivos',
  'Verbos',
  'Adjetivos',
  'Advérbios',
  'Números e tempo',
  'Pronomes e interrogativos',
  'Saudações e expressões',
  'Partículas e gramática',
] as const;

export interface N5CategoryCount {
  category: string;
  count: number;
}

export function n5CategoryCounts(): N5CategoryCount[] {
  const counts = new Map<string, number>();
  for (const entry of N5_DECK) {
    counts.set(entry.category, (counts.get(entry.category) ?? 0) + 1);
  }
  return N5_CATEGORY_ORDER.filter((category) => counts.has(category)).map((category) => ({
    category,
    count: counts.get(category)!,
  }));
}
