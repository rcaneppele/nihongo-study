import type { PerguntaCompletar, Token } from '../quiz/types';
import { FRASES_GRAMATICA, PONTOS_GRAMATICA, type FraseGramatica } from './frases';

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function token(bloco: string): Token {
  const [texto, romaji = ''] = bloco.split('|');
  return { texto, romaji };
}

/**
 * Separa a frase no que vem antes da lacuna, a resposta e o que vem depois.
 * O romaji pode ter espaço ("janai desu"): pedaço sem `|` continua o bloco
 * anterior.
 */
export function lerFrase(frase: string): { antes: Token[]; correta: Token; depois: Token[] } {
  const blocos: string[] = [];
  for (const pedaco of frase.split(' ').filter(Boolean)) {
    if (pedaco.includes('|') || blocos.length === 0) blocos.push(pedaco);
    else blocos[blocos.length - 1] += ` ${pedaco}`;
  }
  const i = blocos.findIndex((b) => b.startsWith('['));
  return {
    antes: blocos.slice(0, i).map(token),
    correta: token(blocos[i].slice(1, -1)),
    depois: blocos.slice(i + 1).map(token),
  };
}

const PONTO_POR_ID = new Map(PONTOS_GRAMATICA.map((p) => [p.id, p]));

export function perguntaDaFrase(f: FraseGramatica): PerguntaCompletar {
  const { antes, correta, depois } = lerFrase(f.frase);
  const ponto = PONTO_POR_ID.get(f.ponto)!;
  return {
    id: f.id,
    tipo: 'completar',
    licaoId: ponto.licaoId,
    ponto: ponto.titulo,
    antes,
    depois,
    alternativas: shuffle([correta.texto, ...f.distratoras]),
    correta: correta.texto,
    pt: f.pt,
    explicacao: f.explicacao,
  };
}

export function contarFrases(pontoIds: string[]): number {
  return FRASES_GRAMATICA.filter((f) => pontoIds.includes(f.ponto)).length;
}

/** Sorteia `quantidade` frases dos pontos escolhidos. */
export function gerarGramatica(pontoIds: string[], quantidade: number): PerguntaCompletar[] {
  return shuffle(FRASES_GRAMATICA.filter((f) => pontoIds.includes(f.ponto)))
    .slice(0, quantidade)
    .map(perguntaDaFrase);
}
