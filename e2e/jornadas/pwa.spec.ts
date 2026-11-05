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

test('manual: link fixo, sempre da rede quando online e disponível offline depois de aberto', async ({ app, page, context, baseURL }) => {
  const sw = await (await page.request.get(`${baseURL}sw.js`)).text();
  expect(sw).toMatch(/\/\\\.pdf\$\/,\s*new \w+\.NetworkFirst\(/);

  await app.abrir('/');
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await page.reload();
  await expect.poll(() => page.evaluate(() => !!navigator.serviceWorker.controller), { timeout: 20_000 }).toBe(true);

  const baixarManual = () =>
    page.evaluate(async () => {
      const r = await fetch('manual-do-usuario.pdf');
      return { ok: r.ok, tipo: r.headers.get('content-type'), inicio: new TextDecoder().decode((await r.arrayBuffer()).slice(0, 5)) };
    });
  const esperado = { ok: true, tipo: expect.stringContaining('pdf'), inicio: '%PDF-' };
  expect(await baixarManual()).toEqual(esperado);
  await context.setOffline(true);
  expect(await baixarManual()).toEqual(esperado);
});

// Na Cloudflare, /privacidade.html redireciona para /privacidade: sem internet ou com o
// service worker ativo, esse endereço não pode cair no fallback do app.
test('política de privacidade abre com e sem .html, inclusive offline', async ({ app, page, context }) => {
  await app.abrir('/');
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await page.reload();
  await expect.poll(() => page.evaluate(() => !!navigator.serviceWorker.controller), { timeout: 20_000 }).toBe(true);

  await context.setOffline(true);
  for (const caminho of ['privacidade.html', 'privacidade']) {
    await page.goto(caminho);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Política de privacidade');
    await expect(page.locator('#root')).toHaveCount(0);
  }
});

test('manifesto do app instalável', async ({ page, baseURL }) => {
  const resposta = await page.request.get(`${baseURL}manifest.webmanifest`);
  expect(resposta.ok()).toBe(true);
  const manifesto = await resposta.json();
  expect(manifesto).toMatchObject({ name: 'Nihongo Study', display: 'standalone', lang: 'pt-BR', start_url: new URL(baseURL!).pathname });
  expect(manifesto.icons.length).toBeGreaterThan(0);
});
