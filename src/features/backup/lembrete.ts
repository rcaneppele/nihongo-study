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

/**
 * Dias sem backup e se é hora de lembrar. `primeiroDia`: o dia mais antigo
 * com atividade (`AAAA-MM-DD`), usado quando nunca houve backup.
 */
export function estadoBackup(ultimo: number | undefined, primeiroDia: string | undefined, now: number = Date.now()): EstadoBackup {
  const desde = ultimo ?? (primeiroDia ? new Date(`${primeiroDia}T00:00:00`).getTime() : undefined);
  const dias = desde === undefined ? undefined : Math.floor((now - desde) / DIA_MS);
  return { ultimo, dias, lembrar: dias !== undefined && dias >= DIAS_LEMBRETE };
}

export function useEstadoBackup(): EstadoBackup | undefined {
  return useLiveQuery(async () => {
    const ultimo = await ultimoBackup();
    const primeiroDia = ultimo === undefined ? (await db.activity.orderBy('day').first())?.day : undefined;
    return estadoBackup(ultimo, primeiroDia);
  }, []);
}

/** "hoje", "ontem", "há 5 dias". */
export function haQuantoTempo(ts: number): string {
  const dias = Math.floor((Date.now() - ts) / DIA_MS);
  if (dias <= 0) return 'hoje';
  if (dias === 1) return 'ontem';
  return `há ${dias} dias`;
}

/** "agora há pouco", "há 5 min", "há 2 h", "ontem", "há 3 dias". */
export function tempoDesde(ts: number): string {
  const min = Math.floor((Date.now() - ts) / 60000);
  if (min < 1) return 'agora há pouco';
  if (min < 60) return `há ${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `há ${h} h`;
  const dias = Math.floor(h / 24);
  return dias === 1 ? 'ontem' : `há ${dias} dias`;
}
