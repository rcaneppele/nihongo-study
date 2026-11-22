import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import { VitePWA } from 'vite-plugin-pwa';
import pacote from './package.json' with { type: 'json' };
import { CABECALHOS, arquivoHeaders } from './config/cabecalhos.ts';
import { tagsDoHead } from './config/metadados.ts';
import { SITE } from './src/lib/site.ts';

// O app é servido na raiz do domínio (nihongostudy.app). Ver .github/workflows/deploy.yml.
const base = '/';

export default defineConfig({
  base,
  // O E2E roda contra o `vite preview`: com os mesmos cabeçalhos da produção, a CSP é testada de verdade.
  preview: { headers: CABECALHOS },
  // PostCSS aqui (e não num postcss.config.js à parte): são só estes dois plugins.
  css: { postcss: { plugins: [tailwindcss(), autoprefixer()] } },
  define: {
    __APP_VERSION__: JSON.stringify(pacote.version),
  },
  build: {
    rollupOptions: {
      output: {
        // Separa o que muda pouco (bibliotecas; dados de traço, vocabulário,
        // textos e lições) do código do app: num deploy que só mexe no código,
        // o service worker baixa de novo só o chunk do app.
        manualChunks(id) {
          if (id.includes('/node_modules/')) return 'vendor';
          if (id.includes('/src/data/kanjivg/kana-')) return 'tracos-kana';
          if (id.includes('/src/data/kanjivg/kanji-')) return 'tracos-kanji';
          if (id.includes('/src/data/')) return 'dados';
          if (id.includes('/src/licoes/')) return 'licoes';
        },
      },
    },
  },
  plugins: [
    react(),
    {
      // Título, descrição, prévia do link (Open Graph) e dados estruturados no <head> (ver config/metadados.ts).
      name: 'metadados-do-site',
      transformIndexHtml: () => tagsDoHead(),
    },
    {
      // Cabeçalhos de segurança no Cloudflare Pages (ver config/cabecalhos.ts).
      name: 'cabecalhos-de-seguranca',
      apply: 'build',
      generateBundle() {
        this.emitFile({ type: 'asset', fileName: '_headers', source: arquivoHeaders() });
      },
    },
    VitePWA({
      registerType: 'autoUpdate',
      // Registro manual em src/lib/pwaUpdate.ts — precisa de `updateViaCache: 'none'` e checagem
      // periódica/on-focus, que o script auto-injetado (`injectRegister: 'auto'`) não oferece.
      injectRegister: false,
      includeAssets: ['icons/apple-touch-icon.png', 'favicon.png', 'logo.png', 'logo-dark.png'],
      workbox: {
        // Inter (latin) é pequena e entra no pré-cache. As fontes japonesas vêm
        // fatiadas em dezenas de arquivos por faixa de caracteres (o navegador
        // só baixa os que a página usa) — pré-cachear todas seria vários MB;
        // em vez disso, cada fatia baixada fica num cache próprio e passa a
        // funcionar offline dali em diante.
        globPatterns: ['**/*.{js,css,html}', 'assets/inter-latin-*.woff2'],
        // Abrir o manual numa aba é uma navegação: sem isto, o fallback de SPA
        // responde com o index.html (app sem rota, miolo em branco) em vez do PDF.
        // Idem para os arquivos dos buscadores (robots.txt, sitemap.xml, llms.txt).
        navigateFallbackDenylist: [/\.(?:pdf|txt|xml)$/],
        runtimeCaching: [
          // Manual do usuário (PDF de alguns MB): fora do pré-cache, guardado na
          // primeira abertura. O nome é fixo (para o link poder ser compartilhado),
          // então a rede vem primeiro: online entrega a versão nova, offline a guardada.
          {
            urlPattern: /\.pdf$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'manual',
              expiration: { maxEntries: 1 },
              // O leitor de PDF do navegador pede o arquivo em pedaços (Range);
              // sem isto, a resposta em cache volta inteira em vez de 206.
              rangeRequests: true,
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /\.woff2?$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'fontes',
              expiration: { maxEntries: 400 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
      manifest: {
        name: SITE.nome,
        short_name: 'Nihongo',
        description: SITE.descricao,
        lang: 'pt-BR',
        theme_color: '#1E3A5F',
        background_color: '#F7F5F0',
        display: 'standalone',
        start_url: base,
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'icons/icon-512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
});
