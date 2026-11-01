import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { version } from './package.json';

export default defineConfig({
  base: '/nihongo-study/',
  define: {
    __APP_VERSION__: JSON.stringify(version),
  },
  plugins: [
    react(),
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
        navigateFallbackDenylist: [/\.pdf$/],
        runtimeCaching: [
          // Manual do usuário (PDF de alguns MB): fora do pré-cache, guardado na
          // primeira abertura. O nome tem hash, então cada versão nova é outra
          // entrada e a antiga sai pelo limite de 1.
          {
            urlPattern: /\.pdf$/,
            handler: 'CacheFirst',
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
        name: 'Nihongo Study',
        short_name: 'Nihongo',
        description: 'Estudo de japonês: flash cards, kana, kanji e leitura.',
        lang: 'pt-BR',
        theme_color: '#1E3A5F',
        background_color: '#F7F5F0',
        display: 'standalone',
        start_url: '/nihongo-study/',
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
