import { db, type Card } from '../../db/schema';
import { ALL_KANA } from '../../data/kana';
import { KANJI_N5 } from '../../data/kanji';
import { LEITURA_TEXTOS } from '../../data/leitura/textos';
import type { ReadingWord } from '../../data/leitura/types';
import { textWords } from '../leitura/knowledge';
import { novoCard } from '../flashcards/cards';
import type { StudyItem } from '../flashcards/stages';
import { desempenhoPorItem } from '../exercicios/historico';
import { conteudoDoItem } from '../exercicios/conteudo';

/**
 * "Pontos fracos": o que o usuário mais erra, juntando todos os módulos que
 * guardam desempenho. Não grava nada novo — é leitura do que já existe. O
 * treino é prática livre (StudySession em modo "practice"), então kana,
 * kanji, palavras da leitura e frases das lições entram como cards
 * transitórios, não gravados.
 */
export type Origem = 'cards' | 'kana' | 'kanji' | 'leitura' | 'licoes';

export interface PontoFraco {
  id: string;
  origem: Origem;
  jp: string;
  pt: string;
  reading?: string;
  /** Resumo do desempenho, ex.: "errou 3×", "acerto 40%". */
  detalhe: string;
  /** Maior = mais fraco; ordena dentro da origem. */
  peso: number;
  item: StudyItem;
}

export const ORIGEM_LABELS: Record<Origem, string> = {
  cards: 'Flash cards',
  kana: 'Kana',
  kanji: 'Kanji',
  leitura: 'Palavras que você ainda consulta na leitura',
  licoes: 'Frases e perguntas das lições',
};

/** Nome de cada exercício no detalhe do ponto fraco. */
const EXERCICIO_LABEL: Record<string, string> = {
  quiz: 'quiz',
  diga: 'diga em japonês',
  kakitori: 'ditado',
  gramatica: 'gramática',
};

/** Abaixo disso de acerto num item de exercício, ele conta como ponto fraco (mesmo que o último tenha acertado). */
const EXERCICIO_ACERTO_MINIMO = 0.7;

/** Abaixo disso de acerto, o kana conta como ponto fraco. */
const KANA_ACERTO_MINIMO = 0.85;

function cardTransitorio(id: string, front: string, back: string, reading?: string): Card {
  return novoCard({ front, back, reading }, Date.now(), id);
}

/** Palavras dos textos de leitura por chave, pra recuperar o significado das consultadas. */
const PALAVRA_POR_CHAVE: Map<string, ReadingWord> = new Map(
  LEITURA_TEXTOS.flatMap((t) => textWords(t).map((w) => [w.key, w.word] as const))
);

export async function carregarPontosFracos(): Promise<Record<Origem, PontoFraco[]>> {
  const [cards, kana, kanji, palavras, exercicios] = await Promise.all([
    db.cards.toArray(),
    db.kanaProgress.toArray(),
    db.kanjiProgress.toArray(),
    db.wordKnowledge.toArray(),
    db.exerciseResults.where('kind').anyOf(['quiz', 'diga', 'kakitori', 'gramatica']).toArray(),
  ]);

  // Flash cards: lapsos (vezes que esqueceu depois de já ter acertado) nas
  // duas direções. A direção de treino é a que mais errou.
  const fracosCards: PontoFraco[] = cards
    .map((card) => {
      const lapsosProd = card.production?.lapses ?? 0;
      return { card, lapsosProd, total: card.lapses + lapsosProd };
    })
    .filter((c) => c.total > 0)
    .map(({ card, lapsosProd, total }) => ({
      id: `card-${card.id}`,
      origem: 'cards' as const,
      jp: card.front,
      pt: card.back,
      reading: card.reading,
      detalhe: `esqueceu ${total}×${lapsosProd > card.lapses ? ' (ao dizer em japonês)' : ''}`,
      peso: total * 10 + card.difficulty,
      item: { card, direction: lapsosProd > card.lapses ? ('production' as const) : ('recognition' as const) },
    }));

  // Kana: taxa de acerto somando "digitar romaji" e "múltipla escolha".
  const kanaPorChar = new Map(ALL_KANA.map((k) => [k.char, k]));
  const fracosKana: PontoFraco[] = kana
    .map((p) => {
      const certos = p.romajiCorrect + (p.choiceCorrect ?? 0);
      const errados = p.romajiWrong + (p.choiceWrong ?? 0);
      return { p, certos, errados, taxa: certos / Math.max(1, certos + errados) };
    })
    .filter(({ errados, taxa }) => errados > 0 && taxa < KANA_ACERTO_MINIMO)
    .map(({ p, errados, taxa }) => {
      const romaji = kanaPorChar.get(p.char)?.romaji ?? '';
      return {
        id: `kana-${p.char}`,
        origem: 'kana' as const,
        jp: p.char,
        pt: romaji,
        detalhe: `acerto ${Math.round(taxa * 100)}% · errou ${errados}×`,
        peso: (1 - taxa) * 100 + errados,
        item: { card: cardTransitorio(`kana-${p.char}`, p.char, romaji), direction: 'recognition' as const },
      };
    });

  // Kanji: lapsos do FSRS do módulo de Kanji.
  const kanjiPorChar = new Map(KANJI_N5.map((k) => [k.char, k]));
  const fracosKanji: PontoFraco[] = kanji
    .filter((p) => p.lapses > 0)
    .flatMap((p) => {
      const entry = kanjiPorChar.get(p.char);
      if (!entry) return [];
      const leituras = [...entry.kunyomi, ...entry.onyomi].map((r) => r.kana).join('、');
      return [
        {
          id: `kanji-${p.char}`,
          origem: 'kanji' as const,
          jp: p.char,
          pt: entry.meaning,
          reading: leituras,
          detalhe: `esqueceu ${p.lapses}×`,
          peso: p.lapses * 10 + p.difficulty,
          item: {
            card: cardTransitorio(`kanji-${p.char}`, p.char, entry.meaning, leituras),
            direction: 'recognition' as const,
          },
        },
      ];
    });

  // Leitura: palavras consultadas na leitura mais recente em que apareceram.
  const fracosLeitura: PontoFraco[] = palavras
    .filter((w) => w.status === 'consultada')
    .flatMap((w) => {
      const palavra = PALAVRA_POR_CHAVE.get(w.key);
      if (!palavra?.meaning) return [];
      return [
        {
          id: `leitura-${w.key}`,
          origem: 'leitura' as const,
          jp: w.key,
          pt: palavra.meaning,
          detalhe: `consultou em ${w.lookupCount} de ${w.seenCount} leitura(s)`,
          peso: w.lookupCount * 10 + w.lookupCount / Math.max(1, w.seenCount),
          item: {
            card: cardTransitorio(`leitura-${w.key}`, w.key, palavra.meaning),
            direction: 'recognition' as const,
          },
        },
      ];
    });

  // Lições: itens de Quiz, "Diga em japonês", ditado e gramática errados na
  // última tentativa ou com acerto baixo no histórico.
  const fracosLicoes: PontoFraco[] = [...desempenhoPorItem(exercicios).values()]
    .filter((d) => d.erros > 0 && (d.ultimaErrada || d.taxa < EXERCICIO_ACERTO_MINIMO))
    .flatMap((d) => {
      const c = conteudoDoItem(d.kind, d.itemId);
      if (!c) return [];
      const id = `${d.kind}-${d.itemId}`;
      return [
        {
          id,
          origem: 'licoes' as const,
          jp: c.jp,
          pt: c.pt,
          reading: c.reading,
          detalhe: `${EXERCICIO_LABEL[d.kind] ?? d.kind} · errou ${d.erros} de ${d.tentativas}`,
          peso: (1 - d.taxa) * 100 + d.erros + (d.ultimaErrada ? 20 : 0),
          item: { card: cardTransitorio(id, c.jp, c.pt, c.reading), direction: c.direcao },
        },
      ];
    });

  const porPeso = (a: PontoFraco, b: PontoFraco) => b.peso - a.peso;
  return {
    cards: fracosCards.sort(porPeso),
    kana: fracosKana.sort(porPeso),
    kanji: fracosKanji.sort(porPeso),
    leitura: fracosLeitura.sort(porPeso),
    licoes: fracosLicoes.sort(porPeso),
  };
}

/**
 * Mistura os mais fracos de cada origem, alternando entre elas (um de cada
 * por vez), pra o treino não virar só kana ou só cards.
 */
export function misturar(listas: PontoFraco[][], limite: number): PontoFraco[] {
  const resultado: PontoFraco[] = [];
  for (let i = 0; resultado.length < limite; i++) {
    const rodada = listas.map((l) => l[i]).filter(Boolean);
    if (rodada.length === 0) break;
    resultado.push(...rodada.slice(0, limite - resultado.length));
  }
  return resultado;
}
