import { useLiveQuery } from 'dexie-react-hooks';
import { db, type LessonProgress } from '../../db/schema';
import { LICOES, type LicaoEntry } from '../../licoes';
import { registrarAtividade } from '../atividade/atividade';

/**
 * Progresso das lições: quando cada uma foi aberta e se foi marcada como
 * concluída (pelo próprio usuário, no fim da lição). A ordem da trilha é a
 * de `LICOES`.
 */
export async function marcarVista(lessonId: string): Promise<void> {
  await db.transaction('rw', db.lessonProgress, async () => {
    const atual = await db.lessonProgress.get(lessonId);
    await db.lessonProgress.put({ ...(atual ?? { lessonId, updatedAt: 0 }), viewedAt: Date.now() });
  });
}

/** Marca ou desmarca como concluída. Concluir conta como item novo do dia (meta e Plano do dia). */
export async function marcarConcluida(lessonId: string, concluida: boolean): Promise<void> {
  const now = Date.now();
  const atual = await db.lessonProgress.get(lessonId);
  const registro: LessonProgress = { lessonId, viewedAt: atual?.viewedAt ?? now, updatedAt: now };
  if (concluida) registro.completedAt = now;
  await db.lessonProgress.put(registro);
  if (concluida && atual?.completedAt === undefined) await registrarAtividade('novos', 1);
}

export function useProgressoLicoes(): Map<string, LessonProgress> | undefined {
  return useLiveQuery(async () => new Map((await db.lessonProgress.toArray()).map((l) => [l.lessonId, l])), []);
}

export interface Trilha {
  concluidas: number;
  total: number;
  /** Primeira lição da trilha ainda não concluída. */
  proxima?: LicaoEntry;
  /** Última vez que alguma lição foi aberta ou concluída (0 = nunca). */
  ultimoEstudo: number;
}

export function trilhaDeLicoes(progresso: Map<string, LessonProgress>): Trilha {
  let concluidas = 0;
  let ultimoEstudo = 0;
  for (const p of progresso.values()) {
    if (p.completedAt !== undefined && LICOES.some((l) => l.meta.id === p.lessonId)) concluidas++;
    ultimoEstudo = Math.max(ultimoEstudo, p.viewedAt, p.completedAt ?? 0);
  }
  return {
    concluidas,
    total: LICOES.length,
    proxima: LICOES.find((l) => progresso.get(l.meta.id)?.completedAt === undefined),
    ultimoEstudo,
  };
}
