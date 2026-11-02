import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

/**
 * Dois projetos de teste (docs/estrategia-testes.md):
 * - `node` (camadas 2–4): unitários, integridade de conteúdo e integração
 *   com o banco (fake-indexeddb) — `*.test.ts(x)`, rápido.
 * - `browser` (camada 5): componentes num Chromium de verdade (Browser Mode,
 *   via Playwright) — `*.browser.test.tsx`.
 */
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      projects: [
        {
          extends: true,
          test: {
            name: 'node',
            include: ['src/**/*.test.{ts,tsx}'],
            exclude: ['src/**/*.browser.test.tsx'],
            setupFiles: ['src/test/setup.ts'],
          },
        },
        {
          extends: true,
          test: {
            name: 'browser',
            include: ['src/**/*.browser.test.tsx'],
            setupFiles: ['src/test/setup.browser.ts'],
            browser: {
              enabled: true,
              provider: 'playwright',
              headless: true,
              screenshotFailures: false,
              instances: [{ browser: 'chromium' }],
            },
          },
        },
      ],
      coverage: {
        provider: 'v8',
        include: ['src/**/*.{ts,tsx}'],
        exclude: ['src/**/*.test.*', 'src/test/**', 'src/licoes/**', 'src/data/**', 'src/**/*.d.ts', 'src/main.tsx'],
        reporter: ['text-summary', 'html', 'json-summary'],
        // Limites mínimos (só sobem, nunca descem): ao ganhar cobertura,
        // suba o número. A lógica (.ts) é coberta em Node; as telas (.tsx),
        // pelos testes de componente e pelo E2E.
        thresholds: {
          'src/db/**/*.ts': { lines: 97, branches: 96, functions: 99, statements: 97 },
          'src/features/**/*.ts': { lines: 89, branches: 94, functions: 83, statements: 89 },
        },
      },
    },
  })
);
