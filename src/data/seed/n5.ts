import raw from './n5.json';

const KANJI_RE = /[一-龯々]/;

/**
 * Deck de vocabulário N5 (JLPT): base de Aprender › Palavras novas e da
 * importação por categoria em Config > Dados > "Vocabulário N5". Fonte:
 * lista pública de vocabulário N5 (formato Anki, tanos.co.uk),
 * traduzida/categorizada em pt-BR.
 *
 * Duas formas de entrada, conforme a palavra se escreve:
 * - **em kana** (`front` em kana, `reading` em romaji): palavras que se
 *   escrevem em kana e os verbos da lição de verbos; quando a palavra
 *   também tem kanji, ele vem em `kanji`, só como referência;
 * - **com kanji** (`front` com kanji, `reading` em kana): as demais.
 *
 * O usuário ainda está aprendendo a ler kana, então o app mostra toda
 * palavra **em kana, com o kanji como referência opcional** (mesma regra
 * das lições — ver `formasDoCard` em src/features/flashcards/formas.ts). O
 * kanji fica na frente das entradas que o têm porque é ele que identifica
 * a palavra: há homônimos em kana (はし é 橋 "ponte" e 箸 "hashi").
 */
export interface N5Entry {
  front: string;
  reading: string;
  /** Kanji de referência de uma entrada em kana (ex.: たべる → 食べる). */
  kanji?: string;
  back: string;
  category: string;
  tags: string[];
  /** Nota de origem/uso (empréstimo do português, falso amigo, homônimo…), exibida no verso do card. */
  note?: string;
}

export const N5_DECK: N5Entry[] = raw as N5Entry[];

const POR_FRENTE = new Map(N5_DECK.map((e) => [e.front, e]));

/**
 * Nota do deck N5 pra uma frente de card — usada como reserva quando o card
 * não tem `note` própria, pra cards importados antes das notas existirem
 * também mostrarem a nota.
 */
export function n5Note(front: string): string | undefined {
  return POR_FRENTE.get(front)?.note;
}

/** Kanji de referência de uma palavra em kana do deck (`undefined` se não tem ou não é do deck). */
export function n5Kanji(front: string): string | undefined {
  return POR_FRENTE.get(front)?.kanji;
}

/** Como a palavra se lê em kana: a própria frente, ou a leitura quando a frente tem kanji. */
export function leituraEmKana(entry: Pick<N5Entry, 'front' | 'reading'>): string {
  return KANJI_RE.test(entry.front) ? entry.reading : entry.front;
}

const POR_LEITURA = (() => {
  const mapa = new Map<string, N5Entry[]>();
  for (const e of N5_DECK) mapa.set(leituraEmKana(e), [...(mapa.get(leituraEmKana(e)) ?? []), e]);
  return mapa;
})();

/** Outras palavras do deck que se leem igual (はし: 橋 e 箸) — em kana elas são indistinguíveis. */
export function n5Homonimos(front: string): N5Entry[] {
  const entry = POR_FRENTE.get(front);
  if (!entry) return [];
  return (POR_LEITURA.get(leituraEmKana(entry)) ?? []).filter((e) => e !== entry);
}

/** A palavra do deck que se lê assim em kana — só quando é uma só (homônimos não dá para saber qual). */
export function n5PorLeitura(kana: string): N5Entry | undefined {
  const lista = POR_LEITURA.get(kana);
  return lista?.length === 1 ? lista[0] : undefined;
}

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
