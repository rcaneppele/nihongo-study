/**
 * Cores de módulo (tokens em src/index.css) prontas para os usos permitidos:
 * tile de ícone/selo (fundo suave + texto forte) e barra fina. Escritas por
 * extenso — o Tailwind só gera classes que aparecem inteiras no código.
 */
export type Cor = 'sora' | 'matcha' | 'fuji' | 'kin' | 'sakura' | 'hanko' | 'indigo';

/** Fundo suave + ícone/texto na cor — `icon-tile` e `badge`. */
export const TILE: Record<Cor, string> = {
  sora: 'bg-sora/12 text-sora',
  matcha: 'bg-matcha/12 text-matcha',
  fuji: 'bg-fuji/12 text-fuji',
  kin: 'bg-kin/12 text-kin',
  sakura: 'bg-sakura/12 text-sakura',
  hanko: 'bg-hanko/10 text-hanko',
  indigo: 'bg-indigo/8 text-indigo',
};

/** Só a cor do texto/ícone. */
export const TEXTO: Record<Cor, string> = {
  sora: 'text-sora',
  matcha: 'text-matcha',
  fuji: 'text-fuji',
  kin: 'text-kin',
  sakura: 'text-sakura',
  hanko: 'text-hanko',
  indigo: 'text-indigo',
};

/** Fundo um pouco mais forte que o TILE — indicador do item ativo na barra inferior do celular. */
export const PILULA: Record<Cor, string> = {
  sora: 'bg-sora/20 text-sora',
  matcha: 'bg-matcha/20 text-matcha',
  fuji: 'bg-fuji/20 text-fuji',
  kin: 'bg-kin/20 text-kin',
  sakura: 'bg-sakura/20 text-sakura',
  hanko: 'bg-hanko/15 text-hanko',
  indigo: 'bg-indigo/15 text-indigo',
};

/** Preenchimento de barra fina de progresso. */
export const BARRA: Record<Cor, string> = {
  sora: 'bg-sora',
  matcha: 'bg-matcha',
  fuji: 'bg-fuji',
  kin: 'bg-kin',
  sakura: 'bg-sakura',
  hanko: 'bg-hanko/80',
  indigo: 'bg-indigo',
};

/** Traço de SVG (anel de progresso). */
export const TRACO: Record<Cor, string> = {
  sora: 'stroke-sora',
  matcha: 'stroke-matcha',
  fuji: 'stroke-fuji',
  kin: 'stroke-kin',
  sakura: 'stroke-sakura',
  hanko: 'stroke-hanko',
  indigo: 'stroke-indigo',
};
