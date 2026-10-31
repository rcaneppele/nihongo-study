import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../db/schema';

/**
 * Quantos botões de nota aparecem nas revisões (flash cards e kanji):
 * "simple" = só Não lembrei/Lembrei (padrão), "full" = as 4 notas do FSRS.
 * Persistido em db.meta, então entra no backup como o tema.
 */
export type GradeMode = 'simple' | 'full';

const META_KEY = 'reviewGradeMode';

export function useGradeMode(): GradeMode {
  const entry = useLiveQuery(() => db.meta.get(META_KEY), []);
  return entry?.value === 'full' ? 'full' : 'simple';
}

export function setGradeMode(mode: GradeMode) {
  return db.meta.put({ key: META_KEY, value: mode });
}
