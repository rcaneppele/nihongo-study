import { defineConfig, devices } from '@playwright/test';

/**
 * Testes ponta a ponta (camada 6 de docs/estrategia-testes.md): o build de
 * produção servido pelo `vite preview`, num navegador de verdade.
 *
 * Projetos: Chromium (desktop e celular), Firefox e WebKit (iPhone). Para
 * rodar só alguns: `E2E_NAVEGADORES=chromium,firefox npm run test:e2e`
 * (WebKit precisa das bibliotecas do sistema: `sudo npx playwright install-deps webkit`).
 * O projeto `pwa` liga o service worker (os outros bloqueiam, pra o
 * auto-update do PWA não recarregar a página no meio de um teste). O
 * `visual` (screenshots) só roda com `npm run test:visual`.
 */
const PORTA = 4173;
const BASE = `http://localhost:${PORTA}/nihongo-study/`;

const todos = [
  { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  { name: 'celular', use: { ...devices['Pixel 7'] } },
  { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  { name: 'webkit', use: { ...devices['iPhone 14'] } },
];
const escolhidos = process.env.E2E_NAVEGADORES?.split(',').map((n) => n.trim());
const navegadores = escolhidos ? todos.filter((p) => escolhidos.includes(p.name)) : todos;

export default defineConfig({
  testDir: 'e2e',
  outputDir: 'test-results/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : [['list']],
  timeout: 60_000,
  expect: { timeout: 10_000, toHaveScreenshot: { maxDiffPixelRatio: 0.01, animations: 'disabled' } },
  use: {
    baseURL: BASE,
    locale: 'pt-BR',
    timezoneId: 'America/Sao_Paulo',
    serviceWorkers: 'block',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    ...navegadores.map((p) => ({ ...p, testIgnore: [/pwa\.spec/, /visual\.spec/] })),
    { name: 'pwa', testMatch: /pwa\.spec/, use: { ...devices['Desktop Chrome'], serviceWorkers: 'allow' } },
    // Imagens de referência dependem do sistema: só com E2E_VISUAL=1 (`npm run test:visual`).
    ...(process.env.E2E_VISUAL ? [{ name: 'visual', testMatch: /visual\.spec/, use: { ...devices['Desktop Chrome'] } }] : []),
  ],
  webServer: {
    command: `npm run build && npx vite preview --port ${PORTA} --strictPort`,
    url: BASE,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
