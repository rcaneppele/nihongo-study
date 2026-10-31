import type { ReadingProgress } from '../../db/schema';
import { LEITURA_TEXTOS } from '../../data/leitura/textos';
import type { ReadingText } from '../../data/leitura/types';
import { knownPercent, type KnownWords } from './knowledge';

const DIA_MS = 24 * 60 * 60 * 1000;

export interface TextoRecomendado {
  texto: ReadingText;
  percent: number;
  timesRead: number;
}

/**
 * Texto de leitura recomendado: o de maior "% conhecido", com −50 se lido
 * nos últimos 3 dias e −5 por releitura (pra variar). Com `soLidos`, só entre
 * os já lidos ao menos uma vez — pra escutar sem ler (Ouvir) ou fazer
 * shadowing (Falar) de um texto cujo conteúdo o aluno já conhece.
 * Usado pela sugestão da Home e pelo "Próximo passo" dos hubs.
 */
export function recomendarTexto(
  known: KnownWords,
  progress: ReadingProgress[],
  { soLidos = false }: { soLidos?: boolean } = {}
): TextoRecomendado | null {
  const porId = new Map(progress.map((p) => [p.textId, p]));
  const agora = Date.now();
  let melhor: (TextoRecomendado & { score: number }) | null = null;
  for (const texto of LEITURA_TEXTOS) {
    const p = porId.get(texto.id);
    if (soLidos && !p) continue;
    const percent = knownPercent(texto, known);
    const recente = p && agora - p.lastReadAt < 3 * DIA_MS;
    const score = percent - (recente ? 50 : 0) - (p?.timesRead ?? 0) * 5;
    if (!melhor || score > melhor.score) melhor = { texto, percent, timesRead: p?.timesRead ?? 0, score };
  }
  return melhor ? { texto: melhor.texto, percent: melhor.percent, timesRead: melhor.timesRead } : null;
}

/** Explicação do porquê do texto recomendado, pelo "% conhecido". */
export function porqueDoTexto(percent: number): string {
  return percent >= 85
    ? `Você conhece ~${percent}% das palavras — no ponto para ler com fluidez e ainda aprender algo.`
    : percent > 0
      ? `É o texto em que você mais conhece palavras (~${percent}%). Toque nas que não souber.`
      : 'Ler textos curtos do seu nível é a forma mais natural de fixar vocabulário. Toque nas palavras que não souber.';
}
