import { useLiveQuery } from 'dexie-react-hooks';
import { db, type Activity, type Review } from '../../db/schema';
import { incrementar } from '../../db/contadores';
import { getDeviceId, setMeta } from '../../db/local';
import { ACTIVITY_CONTADORES } from '../../db/merge';

/**
 * Atividade diária de estudo — base da meta diária e da sequência de dias.
 * Cada parte do app chama `registrarAtividade` ao concluir algo; o dia é a
 * data local do aparelho.
 */
export type TipoAtividade = 'revisoes' | 'praticas' | 'leituras' | 'novos';

/** Um texto lido vale 10 atividades na meta — dá bem mais trabalho que uma resposta. */
export const PESO_LEITURA = 10;
export const META_PADRAO = 20;
export const META_OPCOES = [10, 20, 40, 60] as const;
const META_KEY = 'metaDiaria';

export function diaLocal(ts: number = Date.now()): string {
  const d = new Date(ts);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function vazio(day: string): Activity {
  return { day, revisoes: 0, praticas: 0, leituras: 0, novos: 0, updatedAt: Date.now() };
}

/** Soma `n` (negativo no desfazer, sem passar de 0) ao contador do dia de hoje. */
export async function registrarAtividade(tipo: TipoAtividade, n = 1): Promise<void> {
  if (n === 0) return;
  const day = diaLocal();
  const deviceId = await getDeviceId();
  await db.transaction('rw', db.activity, async () => {
    const atual = (await db.activity.get(day)) ?? vazio(day);
    const now = Date.now();
    await db.activity.put({ ...atual, ...incrementar(atual, { [tipo]: n }, ACTIVITY_CONTADORES, deviceId, now), updatedAt: now });
  });
}

export function pontos(a: Activity | undefined): number {
  if (!a) return 0;
  return a.revisoes + a.praticas + a.novos + a.leituras * PESO_LEITURA;
}

export function useMetaDiaria(): number {
  const entry = useLiveQuery(() => db.meta.get(META_KEY), []);
  return typeof entry?.value === 'number' && entry.value > 0 ? entry.value : META_PADRAO;
}

export function setMetaDiaria(meta: number) {
  return setMeta(META_KEY, meta);
}

export interface ResumoDia {
  hoje: Activity;
  pontos: number;
  /** Dias seguidos com estudo, terminando hoje (ou ontem, se hoje ainda não estudou). */
  sequencia: number;
  estudouHoje: boolean;
  /** Últimos 7 dias (o último é hoje), pra faixa da semana da Home. */
  semana: { day: string; diaDoMes: number; diaDaSemana: number; estudou: boolean }[];
}

/**
 * Dias com estudo: qualquer dia com atividade registrada **ou** com revisão
 * de flash card em `reviews` — o histórico de revisões é anterior à tabela
 * `activity`, então assim a sequência de quem já estudava não zera.
 */
export function diasEstudados(atividades: Activity[], reviews: Review[]): Set<string> {
  const dias = new Set(atividades.filter((a) => pontos(a) > 0).map((a) => a.day));
  for (const r of reviews) dias.add(diaLocal(r.reviewedAt));
  return dias;
}

/** Dias seguidos com estudo até hoje. Hoje sem atividade ainda não quebra a sequência (o dia não acabou). */
export function sequenciaDeDias(dias: Set<string>): number {
  let sequencia = 0;
  const cursor = new Date();
  if (!dias.has(diaLocal())) cursor.setDate(cursor.getDate() - 1);
  while (dias.has(diaLocal(cursor.getTime()))) {
    sequencia++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return sequencia;
}

export function useResumoDia(): ResumoDia | undefined {
  return useLiveQuery(async () => {
    const [atividades, reviews] = await Promise.all([db.activity.toArray(), db.reviews.toArray()]);
    const dias = diasEstudados(atividades, reviews);

    const hojeKey = diaLocal();
    const hoje = atividades.find((a) => a.day === hojeKey) ?? vazio(hojeKey);
    const estudouHoje = dias.has(hojeKey);
    const sequencia = sequenciaDeDias(dias);
    const semana = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      const day = diaLocal(d.getTime());
      return { day, diaDoMes: d.getDate(), diaDaSemana: d.getDay(), estudou: dias.has(day) };
    });
    return { hoje, pontos: pontos(hoje), sequencia, estudouHoje, semana };
  }, []);
}
