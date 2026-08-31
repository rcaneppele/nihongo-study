import { LICOES } from '../../licoes';
import type { FonteKakitori, ItemKakitori, ItemKakitoriFonte, KakitoriConfig } from './types';

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pickN<T>(arr: T[], n: number): T[] {
  return shuffle(arr).slice(0, n);
}

function itemDeFonte(item: ItemKakitoriFonte, origemLabel: string): ItemKakitori {
  return {
    id: item.id,
    origemLabel,
    audioText: item.jp,
    kana: item.kana,
    // Só mostra "kanji" separado quando o texto falado diferir da leitura em kana — ex.: nas
    // frases (kana puras, regra do projeto) os dois são iguais, então não faz sentido repetir.
    kanji: item.jp !== item.kana ? item.jp : undefined,
    romaji: item.romaji,
    pt: item.pt,
  };
}

/** Lista as fontes selecionáveis na tela de configuração: um chip por grupo nomeado de `kakitori`
 * (ex.: "Kanji - Números", "Kanji - Dias da semana"). Lições sem `kakitori` explícito não aparecem
 * — as `frases` do quiz (usadas no Quiz da lição) tendem a ser frases completas demais pra ditado,
 * então só entram no Kakitori as lições com conteúdo pensado especificamente pra isso. */
export function listarFontes(): FonteKakitori[] {
  return LICOES.flatMap(({ meta, kakitori }): FonteKakitori[] =>
    (kakitori ?? []).map((grupo) => ({ id: grupo.id, label: grupo.label, emoji: meta.emoji }))
  );
}

function itensDaFonte(fonteId: string): ItemKakitori[] {
  for (const { kakitori } of LICOES) {
    const grupo = kakitori?.find((g) => g.id === fonteId);
    if (grupo) {
      return grupo.itens.map((item) => itemDeFonte(item, grupo.label));
    }
  }
  return [];
}

function montarPool(fonteIds: string[]): ItemKakitori[] {
  return fonteIds.flatMap(itensDaFonte);
}

/** Monta um ditado aleatório a partir das fontes (lições/grupos) escolhidas pelo usuário. */
export function gerarKakitori(config: KakitoriConfig): ItemKakitori[] {
  const pool = montarPool(config.fonteIds);
  return pickN(pool, Math.min(config.quantidade, pool.length));
}

/** Quantos itens essa combinação de fontes consegue gerar, sem montar o ditado. */
export function contarDisponiveis(fonteIds: string[]): number {
  return montarPool(fonteIds).length;
}
