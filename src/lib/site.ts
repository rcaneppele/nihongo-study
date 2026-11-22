/**
 * Dados públicos do site — fonte única do que buscadores, redes sociais
 * (prévia do link no LinkedIn, WhatsApp etc.) e assistentes de IA leem sobre o
 * app. O `vite.config.ts` injeta daqui as tags do `<head>` do `index.html`
 * (título, descrição, Open Graph, dados estruturados) e a descrição do
 * manifesto; o app usa os mesmos dados no título de cada página
 * (`src/features/seo/`).
 *
 * Sem dependências: o `vite.config.ts` importa este arquivo no build (o
 * repositório e o e-mail ficam em `contato.ts`, também sem dependências).
 */
export const SITE = {
  nome: 'Nihongo Study',
  /** Endereço de produção, sem barra no fim (ver docs/regras-negocio.md §6). */
  url: 'https://nihongostudy.app',
  /** Título da página inicial — até ~60 caracteres, para não ser cortado nos buscadores. */
  titulo: 'Nihongo Study — app grátis para aprender japonês',
  /** Descrição da página inicial — até ~160 caracteres, pelo mesmo motivo. */
  descricao:
    'Aprenda japonês do zero, em português: hiragana, katakana, kanji, flash cards com repetição espaçada, lições e leitura. Grátis, sem cadastro e offline.',
  /** Imagem da prévia do link (gerada por `npm run build:og-image`). */
  imagem: {
    caminho: '/og-image.png',
    largura: 1200,
    altura: 630,
    alt: 'Nihongo Study: app grátis para aprender japonês do zero, em português',
  },
  /**
   * Indexação padrão (`<meta name="robots">`). `max-image-preview:large`: o
   * Google pode mostrar a imagem grande. O app troca por `noindex` nas telas
   * que não fazem sentido num buscador (ver src/features/seo/).
   */
  robots: 'index, follow, max-image-preview:large',
  /** Como o autor aparece na política de privacidade. */
  autor: 'Rodrigo Caneppele',
} as const;

/** Endereço absoluto de um caminho do site (`/licoes/kana` → `https://nihongostudy.app/licoes/kana`). */
export function urlDoSite(caminho: string): string {
  return SITE.url + (caminho.startsWith('/') ? caminho : `/${caminho}`);
}
