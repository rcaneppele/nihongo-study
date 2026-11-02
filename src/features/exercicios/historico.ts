import { useLiveQuery } from 'dexie-react-hooks';
import { db, newId, type ExerciseKind, type ExerciseResult } from '../../db/schema';

/**
 * Histórico dos exercícios que não passam pelo FSRS (Quiz, "Diga em
 * japonês", ditado, gramática em contexto, escuta e shadowing): uma linha
 * por resposta em `exerciseResults`. Só cresce — é lido por Pontos fracos,
 * pelo "Próximo passo" de Falar e pelo nível de Ouvir/Falar.
 */
export type NovoResultado = Omit<ExerciseResult, 'id' | 'doneAt'>;

export async function registrarResultados(resultados: NovoResultado[]): Promise<void> {
  if (resultados.length === 0) return;
  const now = Date.now();
  await db.exerciseResults.bulkAdd(resultados.map((r) => ({ ...r, id: newId(), doneAt: now })));
}

/** Resultados dos tipos pedidos (todos, sem filtro), do mais recente ao mais antigo. */
export function useResultados(kinds?: ExerciseKind[]): ExerciseResult[] | undefined {
  return useLiveQuery(async () => {
    const rows = kinds ? await db.exerciseResults.where('kind').anyOf(kinds).toArray() : await db.exerciseResults.toArray();
    return rows.sort((a, b) => b.doneAt - a.doneAt);
  }, [kinds?.join(',')]);
}

/** Quantas respostas recentes entram na taxa de acerto de uma habilidade. */
export const JANELA_ACERTO = 30;

/** Média de `score` das `n` respostas avaliadas mais recentes (0..1), ou `null` sem nenhuma. */
export function acertoRecente(resultados: ExerciseResult[], kind: ExerciseKind, n = JANELA_ACERTO): number | null {
  const avaliados = resultados
    .filter((r) => r.kind === kind && r.score !== undefined)
    .sort((a, b) => b.doneAt - a.doneAt)
    .slice(0, n);
  if (avaliados.length === 0) return null;
  return avaliados.reduce((s, r) => s + (r.score ?? 0), 0) / avaliados.length;
}

export interface DesempenhoItem {
  kind: ExerciseKind;
  itemId: string;
  lessonId?: string;
  tentativas: number;
  erros: number;
  /** Taxa de acerto de todas as tentativas (0..1). */
  taxa: number;
  ultimaErrada: boolean;
  ultimaEm: number;
}

/** Desempenho por item (chave `kind:itemId`), só das respostas com nota. */
export function desempenhoPorItem(resultados: ExerciseResult[]): Map<string, DesempenhoItem> {
  const porItem = new Map<string, DesempenhoItem>();
  for (const r of [...resultados].sort((a, b) => a.doneAt - b.doneAt)) {
    if (r.score === undefined) continue;
    const key = `${r.kind}:${r.itemId}`;
    const d = porItem.get(key) ?? {
      kind: r.kind,
      itemId: r.itemId,
      lessonId: r.lessonId,
      tentativas: 0,
      erros: 0,
      taxa: 0,
      ultimaErrada: false,
      ultimaEm: 0,
    };
    const acertos = d.taxa * d.tentativas + r.score;
    d.tentativas++;
    if (r.score < 1) d.erros++;
    d.taxa = acertos / d.tentativas;
    d.ultimaErrada = r.score < 1;
    d.ultimaEm = r.doneAt;
    porItem.set(key, d);
  }
  return porItem;
}
