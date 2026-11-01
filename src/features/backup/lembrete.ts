import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../db/schema';
import { ultimoBackup } from '../../db/local';

/**
 * Lembrete de backup: os dados só existem neste aparelho, e navegadores de
 * celular podem limpar o armazenamento — além disso, o backup é o que leva
 * o progresso pra outro aparelho. Lembra depois de `DIAS_LEMBRETE` dias sem
 * backup, contando do primeiro dia de estudo se nunca houve um.
 */
export const DIAS_LEMBRETE = 7;
const DIA_MS = 24 * 60 * 60 * 1000;

export interface EstadoBackup {
  /** Quando foi o último backup (`undefined` = nunca). */
  ultimo?: number;
  /** Dias desde o último backup, ou desde o primeiro estudo se nunca houve. `undefined` = ainda não estudou. */
  dias?: number;
  lembrar: boolean;
}

export function useEstadoBackup(): EstadoBackup | undefined {
  return useLiveQuery(async () => {
    const ultimo = await ultimoBackup();
    let desde = ultimo;
    if (desde === undefined) {
      const primeiroDia = (await db.activity.orderBy('day').first())?.day;
      if (primeiroDia) desde = new Date(`${primeiroDia}T00:00:00`).getTime();
    }
    const dias = desde === undefined ? undefined : Math.floor((Date.now() - desde) / DIA_MS);
    return { ultimo, dias, lembrar: dias !== undefined && dias >= DIAS_LEMBRETE };
  }, []);
}

/** "hoje", "ontem", "há 5 dias". */
export function haQuantoTempo(ts: number): string {
  const dias = Math.floor((Date.now() - ts) / DIA_MS);
  if (dias <= 0) return 'hoje';
  if (dias === 1) return 'ontem';
  return `há ${dias} dias`;
}
