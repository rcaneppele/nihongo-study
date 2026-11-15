import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../db/schema';

/**
 * Cartão "Novo no japonês? Comece por aqui" da Home, que leva ao guia
 * "Começando do zero" (`/aprender/comecar`). Só aparece num aparelho sem
 * nenhum sinal de estudo — quem já estuda (ou importou um backup) não o vê —
 * e some de vez ao ser dispensado. Dispensar vale só para este aparelho
 * (`db.local`, fora do backup). Ver `docs/regras-negocio.md` §5d.
 */
const DISPENSADO_KEY = 'avisoComecarDispensado';

/** Tabelas cujo conteúdo indica que alguém já estuda neste aparelho. */
export const TABELAS_DE_USO = [
  'cards',
  'lessonProgress',
  'kanaProgress',
  'kanjiProgress',
  'readingProgress',
  'wordKnowledge',
  'exerciseResults',
  'journal',
  'activity',
] as const;

export type ContagemDeUso = Record<(typeof TABELAS_DE_USO)[number], number>;

/** Aparelho novo = nada gravado em nenhuma das tabelas de estudo. */
export function ehAparelhoNovo(contagem: ContagemDeUso): boolean {
  return TABELAS_DE_USO.every((t) => contagem[t] === 0);
}

export function deveMostrarAvisoComecar(contagem: ContagemDeUso, dispensado: boolean): boolean {
  return !dispensado && ehAparelhoNovo(contagem);
}

export async function contarUso(): Promise<ContagemDeUso> {
  const totais = await Promise.all(TABELAS_DE_USO.map((t) => db.table(t).count()));
  return Object.fromEntries(TABELAS_DE_USO.map((t, i) => [t, totais[i]])) as ContagemDeUso;
}

export async function avisoComecarVisivel(): Promise<boolean> {
  const [contagem, dispensado] = await Promise.all([contarUso(), db.local.get(DISPENSADO_KEY)]);
  return deveMostrarAvisoComecar(contagem, dispensado?.value === true);
}

export function useAvisoComecar(): boolean {
  return useLiveQuery(avisoComecarVisivel, []) ?? false;
}

export function dispensarAvisoComecar() {
  return db.local.put({ key: DISPENSADO_KEY, value: true });
}
