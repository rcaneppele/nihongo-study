import type { PorAparelho } from './schema';

/**
 * Contadores separados por aparelho (`PorAparelho`). Cada aparelho só
 * escreve a própria entrada, então mesclar é ficar com a entrada mais
 * recente de cada aparelho e somar — o resultado conta o que os dois
 * fizeram, e mesclar o mesmo arquivo de novo não conta duas vezes.
 *
 * Registros anteriores à v6 não têm `porAparelho`: os totais deles viram a
 * entrada `legado`. Como dois aparelhos podem ter o mesmo registro antigo
 * (já mesclado à mão antes), o `legado` mescla pelo maior valor de cada
 * contador — igual à mesclagem de antes da v6.
 */

export const LEGADO = 'legado';

type ComContadores<K extends string> = Partial<Record<K, number>> & { porAparelho?: PorAparelho<K> };
type Resultado<K extends string> = Record<K, number> & { porAparelho: PorAparelho<K> };
/** Uma entrada por dentro: contadores + `updatedAt`, sem a tipagem por campo. */
type Entrada = Record<string, number | undefined>;
type Entradas = Record<string, Entrada>;

function entradas(row: Record<string, unknown>, campos: readonly string[]): Entradas {
  if (row.porAparelho) return row.porAparelho as Entradas;
  const legado: Entrada = { updatedAt: 0 };
  for (const c of campos) if (row[c]) legado[c] = row[c] as number;
  // Registro novo (tudo zerado) não tem legado nenhum.
  return Object.keys(legado).length > 1 ? { [LEGADO]: legado } : {};
}

function totais(por: Entradas, campos: readonly string[]): Record<string, number> {
  const t: Record<string, number> = {};
  for (const c of campos) t[c] = Object.values(por).reduce((soma, e) => soma + (e[c] ?? 0), 0);
  return t;
}

/** Soma `delta` à entrada deste aparelho (sem deixar nenhum total abaixo de 0). Devolve os campos a gravar. */
export function incrementar<K extends string>(
  row: ComContadores<K> | undefined,
  delta: Partial<Record<K, number>>,
  campos: readonly K[],
  deviceId: string,
  now: number
): Resultado<K> {
  const por = { ...entradas(row ?? {}, campos) };
  const minha: Entrada = { ...(por[deviceId] ?? {}), updatedAt: now };
  for (const c of campos) {
    const d = delta[c];
    if (d === undefined) continue;
    // Não deixa o total ficar negativo (ex.: desfazer depois de outro aparelho já ter mesclado).
    const outros = totais(por, [c])[c] - (minha[c] ?? 0);
    minha[c] = Math.max(-outros, (minha[c] ?? 0) + d);
  }
  por[deviceId] = minha;
  return { ...totais(por, campos), porAparelho: por } as Resultado<K>;
}

/** Mescla os contadores de dois registros da mesma chave. */
export function mesclarContadores<K extends string>(
  a: ComContadores<K>,
  b: ComContadores<K>,
  campos: readonly K[]
): Resultado<K> {
  const por: Entradas = { ...entradas(a, campos) };
  for (const [id, entrada] of Object.entries(entradas(b, campos))) {
    const atual = por[id];
    if (!atual) {
      por[id] = entrada;
    } else if (id === LEGADO) {
      const max: Entrada = { updatedAt: 0 };
      for (const c of campos) {
        if (atual[c] !== undefined || entrada[c] !== undefined) max[c] = Math.max(atual[c] ?? 0, entrada[c] ?? 0);
      }
      por[id] = max;
    } else if ((entrada.updatedAt ?? 0) > (atual.updatedAt ?? 0)) {
      por[id] = entrada;
    }
  }
  return { ...totais(por, campos), porAparelho: por } as Resultado<K>;
}
