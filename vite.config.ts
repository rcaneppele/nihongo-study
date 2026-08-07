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
      includeAssets: ['icons/apple-touch-icon.png', 'favicon.png', 'logo.png'],
      manifest: {
        name: 'Nihongo Study',
        short_name: 'Nihongo',
        description: 'Estudo de japonês: flash cards e treino de kana.',
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
