import { defineConfig, mergeConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import viteConfig from './vite.config.ts';

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
              provider: playwright(),
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
        // Recalibrados em novembro/2026, na ida para o Vitest 5: a cobertura passou a contar
        // instruções e ramos de verdade (antes, linhas), então os mesmos testes dão números
        // menores — sobretudo em ramos. Os valores abaixo são o piso dessa medição nova.
        thresholds: {
          'src/db/**/*.ts': { lines: 98, branches: 96, functions: 98, statements: 98 },
          'src/features/**/*.ts': { lines: 93, branches: 89, functions: 87, statements: 91 },
          // Os hooks de tela (`use*.ts`) são cobertos pelos testes de componente e pelo E2E, não em Node.
          'src/lib/**/*.ts': { lines: 60, branches: 50, functions: 64, statements: 59 },
        },
      },
    },
  })
);
