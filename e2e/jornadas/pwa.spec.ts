import { test, expect } from '../fixtures';

/**
 * PWA (projeto `pwa`, com service worker ligado): depois da primeira
 * visita, o app abre e funciona sem internet — telas, lições, leitura e os
 * dados gravados.
 */
test('instalado, funciona offline: abrir, navegar, entrar direto numa rota e gravar dados', async ({ app, page, context }) => {
  await app.abrir('/');
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  // Sem clientsClaim, o worker controla a página a partir da abertura seguinte
  // — dali em diante os arquivos vêm do pré-cache.
  await page.reload();
  await expect.poll(() => page.evaluate(() => !!navigator.serviceWorker.controller), { timeout: 20_000 }).toBe(true);

  await context.setOffline(true);
  await page.reload();
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

  await page.getByRole('link', { name: 'Lições' }).first().click();
  await page.locator('main a[href$="/licoes/desu"]').first().click();
  await expect(page.getByRole('heading', { name: 'Como ler esta lição' })).toBeVisible();

  await page.goto('leitura/apresentacao');
  await expect(page.getByRole('button', { name: 'Terminei a leitura' })).toBeVisible();
  await page.getByRole('button', { name: 'Terminei a leitura' }).click();
  await expect(page.getByText('Leitura registrada')).toBeVisible();

  await page.goto('progresso');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Progresso/);
  expect(await app.lerTabela('readingProgress')).toHaveLength(1);
});

test('manifesto do app instalável', async ({ page, baseURL }) => {
  const resposta = await page.request.get(`${baseURL}manifest.webmanifest`);
  expect(resposta.ok()).toBe(true);
  const manifesto = await resposta.json();
  expect(manifesto).toMatchObject({ name: 'Nihongo Study', display: 'standalone', lang: 'pt-BR', start_url: '/nihongo-study/' });
  expect(manifesto.icons.length).toBeGreaterThan(0);
});
