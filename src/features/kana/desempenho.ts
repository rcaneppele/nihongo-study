import type { KanaProgress, KanaType } from '../../db/schema';
import { KANA_FAMILIES, getKanaByFamilies } from '../../data/kana';

/** Modos do treino de kana (mesmos de src/routes/Kana.tsx). */
export type ModoKana = 'romaji' | 'escolha' | 'desenho';

export interface DesempenhoFamilia {
  /** Acerto médio (0–1) dos kana praticados da família, no modo escolhido. */
  taxa: number;
  praticados: number;
  total: number;
}

/**
 * Desempenho de cada família no modo de treino atual, a partir do
 * kanaProgress: romaji e múltipla escolha pela taxa de acerto; desenho pela
 * melhor nota (0–100). A largura da barra = quantos kana da família já foram
 * praticados nesse modo; a cor = o acerto.
 */
export function desempenhoPorFamilia(
  progresso: KanaProgress[],
  script: KanaType | 'both',
  mode: ModoKana
): Map<string, DesempenhoFamilia> {
  const porChar = new Map(progresso.map((p) => [p.char, p]));
  const resultado = new Map<string, DesempenhoFamilia>();
  for (const f of KANA_FAMILIES) {
    const entradas = getKanaByFamilies(script, [f.key]);
    let soma = 0;
    let praticados = 0;
    for (const e of entradas) {
      const p = porChar.get(e.char);
      if (!p) continue;
      if (mode === 'desenho') {
        if (p.drawBest === undefined) continue;
        soma += p.drawBest / 100;
      } else {
        const certos = mode === 'romaji' ? p.romajiCorrect : (p.choiceCorrect ?? 0);
        const errados = mode === 'romaji' ? p.romajiWrong : (p.choiceWrong ?? 0);
        if (certos + errados === 0) continue;
        soma += certos / (certos + errados);
      }
      praticados++;
    }
    if (praticados > 0) resultado.set(f.key, { taxa: soma / praticados, praticados, total: entradas.length });
  }
  return resultado;
}
