/**
 * Conjugação dos verbos da lista de referência (regras da lição de verbos).
 * Calcular em vez de digitar forma por forma evita erro de digitação numa
 * tabela de 42 linhas, e `conjugacao.test.ts` confere contra formas escritas
 * à mão. Cobre só as formas que a lição ensina.
 */
export type GrupoVerbo = 1 | 2;

export interface FormasVerbo {
  masu: string;
  nai: string;
  te: string;
  ta: string;
}

/** Última sílaba do Grupo 1 → sílaba da linha -i (base de ます). */
const LINHA_I: Record<string, string> = { う: 'い', く: 'き', ぐ: 'ぎ', す: 'し', つ: 'ち', ぬ: 'に', ぶ: 'び', む: 'み', る: 'り' };
/** Última sílaba do Grupo 1 → sílaba da linha -a (base de ない); う vira わ, não あ. */
const LINHA_A: Record<string, string> = { う: 'わ', く: 'か', ぐ: 'が', す: 'さ', つ: 'た', ぬ: 'な', ぶ: 'ば', む: 'ま', る: 'ら' };
/** Última sílaba do Grupo 1 → terminação da forma て. */
const FORMA_TE: Record<string, string> = { う: 'って', つ: 'って', る: 'って', む: 'んで', ぶ: 'んで', ぬ: 'んで', く: 'いて', ぐ: 'いで', す: 'して' };

/** A forma た é a forma て com た no lugar de て (e だ no lugar de で). */
function teParaTa(te: string): string {
  return te.slice(0, -1) + (te.endsWith('で') ? 'だ' : 'た');
}

export function conjugar(dicionario: string, grupo: GrupoVerbo): FormasVerbo {
  const raiz = dicionario.slice(0, -1);
  if (grupo === 2) {
    return { masu: `${raiz}ます`, nai: `${raiz}ない`, te: `${raiz}て`, ta: `${raiz}た` };
  }
  const fim = dicionario.slice(-1);
  // Duas exceções do Grupo 1: いく na forma て/た e ある na negativa.
  const te = dicionario === 'いく' ? 'いって' : raiz + FORMA_TE[fim];
  return {
    masu: `${raiz}${LINHA_I[fim]}ます`,
    nai: dicionario === 'ある' ? 'ない' : `${raiz}${LINHA_A[fim]}ない`,
    te,
    ta: teParaTa(te),
  };
}
