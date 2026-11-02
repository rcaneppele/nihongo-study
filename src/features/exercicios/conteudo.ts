import type { ExerciseKind } from '../../db/schema';
import { LICOES } from '../../licoes';
import type { Token } from '../../data/quiz/types';
import { FRASES_GRAMATICA } from '../../data/gramatica/frases';
import { lerFrase } from '../../data/gramatica/gerador';
import { kanaExibicao, romaji } from '../diga/gerador';

/**
 * O conteúdo de um item de exercício a partir do id guardado no histórico
 * — pra listar e treinar os erros em Pontos fracos. `direcao` diz como
 * treinar: frase a montar = produção (vê o português, diz em japonês);
 * pergunta e ditado = reconhecimento.
 */
export interface ConteudoItem {
  jp: string;
  pt: string;
  reading?: string;
  direcao: 'recognition' | 'production';
}

function frase(tokens: Token[], pt: string): ConteudoItem {
  return { jp: kanaExibicao(tokens), pt, reading: romaji(tokens), direcao: 'production' };
}

let indice: Map<string, ConteudoItem> | null = null;

function montarIndice(): Map<string, ConteudoItem> {
  const m = new Map<string, ConteudoItem>();
  for (const { quiz, diga, kakitori } of LICOES) {
    for (const f of [...(quiz?.frases ?? []), ...(diga ?? [])]) {
      m.set(`quiz:${f.id}`, frase(f.tokens, f.pt));
      m.set(`diga:${f.id}`, frase(f.tokens, f.pt));
    }
    for (const p of quiz?.perguntas ?? []) {
      m.set(
        `quiz:${p.id}`,
        p.tipo === 'significado'
          ? { jp: p.pergunta, pt: p.alternativas[p.correta], direcao: 'recognition' }
          : { jp: p.afirmacao, pt: p.correta ? 'Verdadeiro' : 'Falso', direcao: 'recognition' }
      );
    }
    for (const grupo of kakitori ?? []) {
      for (const item of grupo.itens) {
        m.set(`kakitori:${item.id}`, { jp: item.jp, pt: item.pt, reading: item.romaji, direcao: 'recognition' });
      }
    }
  }
  for (const f of FRASES_GRAMATICA) {
    const { antes, correta, depois } = lerFrase(f.frase);
    const tokens = [...antes, correta, ...depois];
    m.set(`gramatica:${f.id}`, {
      jp: kanaExibicao(tokens),
      pt: `${f.pt} — ${f.explicacao}`,
      reading: romaji(tokens),
      direcao: 'recognition',
    });
  }
  return m;
}

export function conteudoDoItem(kind: ExerciseKind, itemId: string): ConteudoItem | undefined {
  indice ??= montarIndice();
  return indice.get(`${kind}:${itemId}`);
}
