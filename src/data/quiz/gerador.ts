import { LICOES } from '../../licoes';
import type {
  FraseEstruturada,
  PerguntaGerada,
  PerguntaParticula,
  PerguntaReordenar,
  QuizConfig,
  TipoQuiz,
  Token,
} from './types';

const PARTICULAS_COMUNS = ['は', 'が', 'を', 'に', 'で', 'の', 'と', 'も', 'へ', 'から', 'まで', 'しか', 'だけ'];

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pickN<T>(arr: T[], n: number): T[] {
  return shuffle(arr).slice(0, n);
}

function embaralharTokens(tokens: Token[]): Token[] {
  if (tokens.length < 2) return tokens;
  let tentativa = shuffle(tokens);
  let tentativas = 0;
  while (tentativa.every((t, i) => t === tokens[i]) && tentativas < 10) {
    tentativa = shuffle(tokens);
    tentativas++;
  }
  return tentativa;
}

function gerarReordenar(frase: FraseEstruturada, licaoId: string): PerguntaReordenar {
  return {
    id: frase.id,
    tipo: 'reordenar-frase',
    licaoId,
    tokensEmbaralhados: embaralharTokens(frase.tokens),
    respostaCorreta: frase.tokens,
    pt: frase.pt,
  };
}

function gerarParticula(frase: FraseEstruturada, licaoId: string): PerguntaParticula | null {
  const indice = frase.tokens.findIndex((t) => t.particula);
  if (indice === -1) return null;

  const correta = frase.tokens[indice].texto;
  const distratoras = pickN(
    PARTICULAS_COMUNS.filter((p) => p !== correta),
    3
  );

  return {
    id: frase.id,
    tipo: 'escolher-particula',
    licaoId,
    antes: frase.tokens.slice(0, indice),
    depois: frase.tokens.slice(indice + 1),
    alternativas: shuffle([correta, ...distratoras]),
    correta,
    pt: frase.pt,
  };
}

function montarPool(licaoIds: string[], tipos: TipoQuiz[]): PerguntaGerada[] {
  const licoes = LICOES.filter((l) => licaoIds.includes(l.meta.id) && l.quiz);

  const pool: PerguntaGerada[] = [];

  for (const { meta, quiz } of licoes) {
    if (!quiz) continue;

    if (tipos.includes('reordenar-frase')) {
      for (const frase of quiz.frases ?? []) {
        pool.push(gerarReordenar(frase, meta.id));
      }
    }
    if (tipos.includes('escolher-particula')) {
      for (const frase of quiz.frases ?? []) {
        const pergunta = gerarParticula(frase, meta.id);
        if (pergunta) pool.push(pergunta);
      }
    }
    for (const pergunta of quiz.perguntas ?? []) {
      if (tipos.includes(pergunta.tipo)) {
        pool.push({ ...pergunta, licaoId: meta.id });
      }
    }
  }

  return pool;
}

/** Monta um quiz aleatório a partir das lições e tipos escolhidos pelo usuário. */
export function gerarQuiz(config: QuizConfig): PerguntaGerada[] {
  const pool = montarPool(config.licaoIds, config.tipos);
  return pickN(pool, Math.min(config.quantidade, pool.length));
}

/** Quantas perguntas essa combinação de lições e tipos consegue gerar, sem montar o quiz. */
export function contarDisponiveis(licaoIds: string[], tipos: TipoQuiz[]): number {
  return montarPool(licaoIds, tipos).length;
}
