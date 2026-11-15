import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../db/schema';
import { setMeta } from '../../db/local';
import { n5Kanji } from '../../data/seed/n5';
import { kanaParaRomaji, soKana, temKanji } from '../../lib/romaji';

/**
 * As formas de escrever uma palavra — kana, kanji e romaji — a partir do
 * card (ou da entrada do deck), e qual delas vai em destaque.
 *
 * O usuário ainda está aprendendo a ler kana, então o padrão é **kana em
 * destaque, com o kanji como referência opcional** (mesma regra das lições).
 * Quem já lê kanji troca para "kanji em destaque" em Configurações.
 *
 * Os cards chegam em dois formatos, e os dois caem aqui:
 * - frente com kanji + leitura em kana (deck N5, palavras salvas da leitura);
 * - frente em kana + leitura em romaji (deck N5 em kana, cards do usuário).
 */
export interface FormasDaPalavra {
  kana?: string;
  kanji?: string;
  romaji?: string;
}

/** Só kana, tolerando o `～` dos sufixos e prefixos do deck (～さん). */
function ehKana(texto: string): boolean {
  return soKana(texto.replace(/[～〜\s]/g, ''));
}

export function formasDaPalavra(palavra: { front: string; reading?: string; kanji?: string }): FormasDaPalavra {
  const { front, reading } = palavra;
  if (temKanji(front)) {
    // Sem leitura em kana (card feito à mão, com romaji ou nada): fica só o kanji.
    if (!reading || !ehKana(reading)) return { kanji: front, romaji: reading || undefined };
    return { kana: reading, kanji: front, romaji: kanaParaRomaji(reading) };
  }
  if (ehKana(front)) {
    const romaji = reading && !ehKana(reading) ? reading : kanaParaRomaji(front);
    return { kana: front, kanji: palavra.kanji ?? n5Kanji(front), romaji };
  }
  // Frente que não é japonês "puro" (frase, latim misturado): mostra como está.
  return { kana: front, romaji: reading || undefined };
}

/** Qual forma vai em destaque nos cards. */
export type EscritaDosCards = 'kana' | 'kanji';

/** A forma em destaque e a de apoio (a outra, quando existe). */
export function emDestaque(formas: FormasDaPalavra, escrita: EscritaDosCards): { principal: string; apoio?: string } {
  const [primeira, segunda] = escrita === 'kanji' ? [formas.kanji, formas.kana] : [formas.kana, formas.kanji];
  const principal = primeira ?? segunda ?? '';
  return { principal, apoio: primeira && segunda ? segunda : undefined };
}

const META_KEY = 'cardScript';

/** Preferência de escrita dos cards. Persistida em db.meta, então entra no backup como o tema. */
export function useEscritaDosCards(): EscritaDosCards {
  const entry = useLiveQuery(() => db.meta.get(META_KEY), []);
  return entry?.value === 'kanji' ? 'kanji' : 'kana';
}

export function setEscritaDosCards(escrita: EscritaDosCards) {
  return setMeta(META_KEY, escrita);
}
