import type { HtmlTagDescriptor } from 'vite';
import { SITE, urlDoSite } from '../src/lib/site.ts';
import { RECURSOS } from '../src/lib/recursos.ts';

/**
 * Tags do `<head>` do `index.html` — o `vite.config.ts` injeta estas tags no
 * build e no `npm run dev`, a partir de `src/lib/site.ts`.
 *
 * O app é uma SPA: toda rota recebe este mesmo HTML. Por isso:
 * - nada aqui é específico de uma página. O título, a descrição e o endereço
 *   canônico de cada rota são aplicados pelo próprio app
 *   (`src/features/seo/`), que o Google lê ao renderizar;
 * - sem `<link rel="canonical">` nem `og:url` fixos: apontariam toda rota para
 *   a raiz e tirariam as lições do índice (e o link de uma lição compartilhado
 *   viraria um link para a raiz);
 * - quem não roda JavaScript (prévia de link nas redes, robôs de IA) lê só o
 *   que está aqui e o conteúdo estático do `#root`.
 */
export function tagsDoHead(): HtmlTagDescriptor[] {
  const imagem = urlDoSite(SITE.imagem.caminho);
  const meta = (atributo: 'name' | 'property', chave: string, content: string | number): HtmlTagDescriptor => ({
    tag: 'meta',
    attrs: { [atributo]: chave, content: String(content) },
    injectTo: 'head',
  });

  return [
    { tag: 'title', children: SITE.titulo, injectTo: 'head' },
    meta('name', 'description', SITE.descricao),
    meta('name', 'robots', SITE.robots),
    // Nome curto do app instalado: sem isto, o iPhone usa o <title>, que muda a cada tela.
    meta('name', 'application-name', SITE.nome),
    meta('name', 'apple-mobile-web-app-title', SITE.nome),

    // Prévia do link (LinkedIn, WhatsApp, Facebook, Telegram…) — Open Graph.
    meta('property', 'og:type', 'website'),
    meta('property', 'og:site_name', SITE.nome),
    meta('property', 'og:locale', 'pt_BR'),
    meta('property', 'og:title', SITE.titulo),
    meta('property', 'og:description', SITE.descricao),
    meta('property', 'og:image', imagem),
    meta('property', 'og:image:type', 'image/png'),
    meta('property', 'og:image:width', SITE.imagem.largura),
    meta('property', 'og:image:height', SITE.imagem.altura),
    meta('property', 'og:image:alt', SITE.imagem.alt),
    // X/Twitter lê o resto do Open Graph; só precisa saber que a imagem é grande.
    meta('name', 'twitter:card', 'summary_large_image'),

    // Dados estruturados (schema.org): o que é o app, para buscadores e assistentes de IA.
    // `type="application/ld+json"` não é script executável — a CSP (sem 'unsafe-inline') não se aplica.
    {
      tag: 'script',
      attrs: { type: 'application/ld+json' },
      children: jsonSeguroEmHtml(dadosEstruturados(imagem)),
      injectTo: 'head',
    },
  ];
}

function dadosEstruturados(imagem: string) {
  const raiz = urlDoSite('/');
  return {
    '@context': 'https://schema.org',
    '@graph': [
      // O nome do site nos resultados do Google vem daqui.
      { '@type': 'WebSite', '@id': `${raiz}#site`, name: SITE.nome, url: raiz, inLanguage: 'pt-BR' },
      {
        '@type': 'WebApplication',
        '@id': `${raiz}#app`,
        name: SITE.nome,
        url: raiz,
        description: SITE.descricao,
        image: imagem,
        inLanguage: 'pt-BR',
        about: { '@type': 'Language', name: 'Japonês', alternateName: 'ja' },
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'Qualquer navegador: Android, iPhone, iPad, Windows, macOS e Linux',
        browserRequirements: 'Navegador atual com JavaScript. Pode ser instalado (PWA) e funciona offline.',
        isAccessibleForFree: true,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
        featureList: RECURSOS,
        author: { '@type': 'Person', name: SITE.autor },
        isPartOf: { '@id': `${raiz}#site` },
      },
    ],
  };
}

/** JSON dentro de `<script>`: `<` escapado, para um texto nunca fechar a tag antes da hora. */
function jsonSeguroEmHtml(dados: unknown): string {
  return JSON.stringify(dados).replace(/</g, '\\u003c');
}
