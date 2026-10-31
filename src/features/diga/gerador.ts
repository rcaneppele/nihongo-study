import { LICOES } from '../../licoes';
import type { Token } from '../../data/quiz/types';
import { db, newId } from '../../db/schema';
import { freshSrs } from '../srs/fsrs';

/**
 * "Diga em japonês": a frase aparece em português e o usuário a diz em
 * japonês (em voz alta ou de cabeça) antes de revelar — produção de frase
 * inteira, autoavaliada (sem reconhecimento de fala). O conteúdo são as
 * `quiz.frases` das lições (mesmas do "Reordenar frase" do Quiz) mais as
 * frases próprias de cada lição em `diga` — gramática da lição com
 * vocabulário já visto, em contextos novos.
 */
export interface ItemDiga {
  id: string;
  licaoId: string;
  origem: string;
  emoji: string;
  pt: string;
  tokens: Token[];
}

export interface RegistroDiga {
  item: ItemDiga;
  acertou: boolean;
}

/** Categoria dos cards salvos a partir daqui. */
export const CATEGORIA_FRASES = 'Frases';

function frasesDaLicao(l: (typeof LICOES)[number]) {
  return [...(l.diga ?? []), ...(l.quiz?.frases ?? [])];
}

export function licoesComFrases() {
  return LICOES.filter((l) => frasesDaLicao(l).length > 0);
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function montarPool(licaoIds: string[]): ItemDiga[] {
  return licoesComFrases()
    .filter((l) => licaoIds.includes(l.meta.id))
    .flatMap((l) =>
      frasesDaLicao(l).map((f) => ({
        id: f.id,
        licaoId: l.meta.id,
        origem: l.meta.title,
        emoji: l.meta.emoji,
        pt: f.pt,
        tokens: f.tokens,
      }))
    );
}

export function gerarDiga(licaoIds: string[], quantidade: number): ItemDiga[] {
  return shuffle(montarPool(licaoIds)).slice(0, quantidade);
}

export function contarDisponiveis(licaoIds: string[]): number {
  return montarPool(licaoIds).length;
}

/**
 * Frase em kana pra exibir: partícula grudada na palavra anterior e espaço
 * entre os blocos, como nos textos de leitura de nível 1 ("たなかさんは
 * せんせい です") — mais fácil de ler pra quem ainda está aprendendo kana.
 */
export function kanaExibicao(tokens: Token[]): string {
  return tokens.reduce((acc, t, i) => (i === 0 ? t.texto : ehParticula(t) ? acc + t.texto : `${acc} ${t.texto}`), '');
}

// Nas frases do quiz, `particula: true` marca só a partícula que vira lacuna
// no "Escolher partícula" (uma por frase — o gerador usa a primeira marcada),
// então as demais partículas vêm sem a marca. Pra exibição, reconhece pelo
// próprio texto do token.
const PARTICULAS = new Set(['は', 'が', 'を', 'に', 'で', 'へ', 'と', 'も', 'の', 'から', 'まで', 'や', 'か', 'ね', 'よ', 'ごろ']);

function ehParticula(t: Token): boolean {
  return !!t.particula || PARTICULAS.has(t.texto);
}

/** Texto pro áudio: sem espaços, senão a síntese de voz faz pausas artificiais. */
export function kanaAudio(tokens: Token[]): string {
  return tokens.map((t) => t.texto).join('');
}

export function romaji(tokens: Token[]): string {
  return tokens.map((t) => t.romaji).join(' ');
}

/**
 * Salva frases como flash cards (frente = frase em kana, verso = português,
 * leitura = romaji) já no estágio "Sei dizer" — o objetivo é treinar dizer
 * a frase, não reconhecê-la. Pula frases que já têm card (mesma frente).
 * Devolve quantos cards foram criados.
 */
export async function salvarFrasesComoCards(itens: ItemDiga[]): Promise<number> {
  const now = Date.now();
  const existentes = new Set((await db.cards.toArray()).map((c) => c.front));
  const novos = itens.filter((it) => !existentes.has(kanaExibicao(it.tokens)));
  await db.cards.bulkAdd(
    novos.map((it) => ({
      id: newId(),
      front: kanaExibicao(it.tokens),
      back: it.pt,
      reading: romaji(it.tokens),
      category: CATEGORIA_FRASES,
      tags: ['frase', it.licaoId],
      ...freshSrs(now),
      production: freshSrs(now),
      createdAt: now,
      updatedAt: now,
    }))
  );
  return novos.length;
}
