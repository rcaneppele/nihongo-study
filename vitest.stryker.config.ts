import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

// Só os testes em Node, para o Stryker (testes de mutação não rodam no Browser Mode).
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      include: ['src/**/*.test.{ts,tsx}'],
      exclude: ['src/**/*.browser.test.tsx'],
      setupFiles: ['src/test/setup.ts'],
    },
  })
);
