import { useLiveQuery } from 'dexie-react-hooks';
import { State } from 'ts-fsrs';
import { db } from '../../db/schema';
import { incrementar } from '../../db/contadores';
import { getDeviceId } from '../../db/local';
import { READING_CONTADORES, WORD_CONTADORES } from '../../db/merge';
import type { ReadingLine, ReadingText, ReadingWord } from '../../data/leitura/types';
import { suggestCard } from '../flashcards/mining';
import { cardStage } from '../flashcards/stages';
import { registrarAtividade } from '../atividade/atividade';

/**
 * Vocabulário passivo medido pela leitura: ao concluir um texto, as palavras
 * que o usuário leu sem tocar pra ver o significado contam como
 * compreendidas; as que tocou, como consultadas. Somado aos cards já
 * revisados, dá o "% que você conhece" de cada texto — pra escolher leituras
 * no ponto certo (quase tudo conhecido, poucas palavras novas).
 */

/**
 * Identidade de uma palavra do texto no vocabulário: a mesma forma "limpa"
 * sugerida como frente de card (`lemma`, ou o texto sem pontuação/partícula
 * — ver suggestCard), pra palavra salva como card e palavra lida baterem.
 * Palavras sem `meaning` (partículas/gramática) ficam de fora.
 */
export function wordKey(word: ReadingWord): string | null {
  if (!word.meaning) return null;
  return suggestCard(word).front || null;
}

export interface WordOccurrence {
  key: string;
  word: ReadingWord;
  line: ReadingLine;
  lineIndex: number;
  wordIndex: number;
}

/** Palavras únicas do texto (primeira ocorrência de cada uma). */
export function textWords(texto: ReadingText): WordOccurrence[] {
  const seen = new Map<string, WordOccurrence>();
  texto.lines.forEach((line, lineIndex) =>
    line.words.forEach((word, wordIndex) => {
      const key = wordKey(word);
      if (key && !seen.has(key)) seen.set(key, { key, word, line, lineIndex, wordIndex });
    })
  );
  return [...seen.values()];
}

/** Registra a leitura concluída: atualiza cada palavra do texto e o contador do texto. */
export async function finishReading(texto: ReadingText, lookedUp: Set<string>): Promise<void> {
  const now = Date.now();
  const keys = textWords(texto).map((w) => w.key);
  const deviceId = await getDeviceId();
  await db.transaction('rw', db.wordKnowledge, db.readingProgress, async () => {
    const existing = await db.wordKnowledge.bulkGet(keys);
    await db.wordKnowledge.bulkPut(
      keys.map((key, i) => {
        const consulted = lookedUp.has(key);
        return {
          key,
          status: consulted ? 'consultada' : 'compreendida',
          ...incrementar(existing[i], { seenCount: 1, lookupCount: consulted ? 1 : 0 }, WORD_CONTADORES, deviceId, now),
          updatedAt: now,
        } as const;
      })
    );
    const progress = await db.readingProgress.get(texto.id);
    await db.readingProgress.put({
      textId: texto.id,
      ...incrementar(progress, { timesRead: 1 }, READING_CONTADORES, deviceId, now),
      lastReadAt: now,
      updatedAt: now,
    });
  });
  await registrarAtividade('leituras');
}

export interface KnownWords {
  /** Compreendidas: lidas sem consultar na leitura mais recente + frentes de cards já revisados. */
  understood: Set<string>;
  /** Frentes de cards no estágio Sei dizer ou Domino. */
  canSay: Set<string>;
  /**
   * Crescimento dos últimos 7 dias, só com o que dá pra medir de verdade:
   * compreendidas = cards com a primeira revisão na semana + palavras
   * compreendidas na primeira leitura em que apareceram (`seenCount` 1);
   * sei dizer = cards de "Sei dizer"/"Domino" cuja primeira revisão de
   * produção foi na semana.
   */
  understoodWeek: number;
  canSayWeek: number;
}

const SEMANA_MS = 7 * 24 * 60 * 60 * 1000;

export function useKnownWords(): KnownWords | undefined {
  return useLiveQuery(async () => {
    const [knowledge, cards, reviews] = await Promise.all([
      db.wordKnowledge.toArray(),
      db.cards.toArray(),
      db.reviews.toArray(),
    ]);
    const desde = Date.now() - SEMANA_MS;

    // Primeira revisão de cada card, por direção.
    const primeiraRec = new Map<string, number>();
    const primeiraProd = new Map<string, number>();
    for (const r of reviews) {
      const mapa = r.direction === 'production' ? primeiraProd : primeiraRec;
      const atual = mapa.get(r.cardId);
      if (atual === undefined || r.reviewedAt < atual) mapa.set(r.cardId, r.reviewedAt);
    }

    const understood = new Set(knowledge.filter((k) => k.status === 'compreendida').map((k) => k.key));
    const novasNaSemana = new Set(
      knowledge.filter((k) => k.status === 'compreendida' && k.seenCount === 1 && k.updatedAt >= desde).map((k) => k.key)
    );
    const canSay = new Set<string>();
    let canSayWeek = 0;
    for (const card of cards) {
      if (card.state !== State.New || card.production) understood.add(card.front);
      if ((primeiraRec.get(card.id) ?? 0) >= desde) novasNaSemana.add(card.front);
      const stage = cardStage(card);
      if (stage === 'seiDizer' || stage === 'domino') {
        canSay.add(card.front);
        if ((primeiraProd.get(card.id) ?? 0) >= desde) canSayWeek++;
      }
    }
    return { understood, canSay, understoodWeek: novasNaSemana.size, canSayWeek };
  }, []);
}

/** Porcentagem (0–100) das palavras únicas do texto que o usuário já compreende. */
export function knownPercent(texto: ReadingText, known: KnownWords): number {
  const words = textWords(texto);
  if (words.length === 0) return 0;
  const count = words.filter((w) => known.understood.has(w.key)).length;
  return Math.round((count / words.length) * 100);
}
