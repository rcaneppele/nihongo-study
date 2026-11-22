import { test, expect } from '../fixtures';

/**
 * O que buscadores, prévias de link (LinkedIn, WhatsApp…) e assistentes de IA
 * leem do app: o HTML como chega do servidor, sem rodar JavaScript (tags do
 * `<head>` geradas de `src/lib/site.ts`), e o título/canônico/indexação que o
 * próprio app aplica a cada tela (`src/features/seo/`).
 */

const SITE = 'https://nihongostudy.app';

test('o HTML sem JavaScript traz título, descrição, prévia do link e dados estruturados', async ({ request }) => {
  // Uma rota interna: o servidor entrega o mesmo index.html a todas.
  const html = await (await request.get('licoes/particulas')).text();
  const meta = (chave: string) =>
    html.match(new RegExp(`<meta (?:name|property)="${chave}" content="([^"]*)"`))?.[1];

  expect(html).toContain('<title>Nihongo Study — app grátis para aprender japonês</title>');
  expect(meta('description')).toMatch(/^Aprenda japonês do zero, em português/);
  expect(meta('og:title')).toBe('Nihongo Study — app grátis para aprender japonês');
  expect(meta('og:image')).toBe(`${SITE}/og-image.png`);
  expect(meta('og:locale')).toBe('pt_BR');
  expect(meta('twitter:card')).toBe('summary_large_image');
  // Canônico fixo apontaria toda rota para a raiz: quem põe é o app, por tela.
  expect(html).not.toContain('rel="canonical"');
  expect(meta('og:url')).toBeUndefined();

  const jsonLd = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)![1]);
  const app = jsonLd['@graph'].find((n: { '@type': string }) => n['@type'] === 'WebApplication');
  expect(app).toMatchObject({ name: 'Nihongo Study', url: `${SITE}/`, isAccessibleForFree: true, inLanguage: 'pt-BR' });
  expect(app.featureList.length).toBeGreaterThan(3);

  // Conteúdo estático no #root, para quem não roda JavaScript (e tela de abertura enquanto carrega).
  expect(html).toMatch(/<div id="root">[\s\S]*<h1[^>]*>Nihongo Study<\/h1>[\s\S]*Aprenda japonês do zero/);
});

test('a imagem da prévia existe e tem o tamanho declarado', async ({ request }) => {
  const resposta = await request.get('og-image.png');
  expect(resposta.status()).toBe(200);
  expect(resposta.headers()['content-type']).toBe('image/png');
  const png = await resposta.body();
  // Cabeçalho IHDR do PNG: largura e altura nos bytes 16–23.
  expect([png.readUInt32BE(16), png.readUInt32BE(20)]).toEqual([1200, 630]);
  expect(png.length).toBeLessThan(300 * 1024);
});

test('robots.txt, sitemap.xml e llms.txt estão publicados', async ({ request }) => {
  const robots = await (await request.get('robots.txt')).text();
  expect(robots).toContain(`Sitemap: ${SITE}/sitemap.xml`);
  const sitemap = await (await request.get('sitemap.xml')).text();
  expect(sitemap).toContain(`<loc>${SITE}/licoes/particulas</loc>`);
  const llms = await (await request.get('llms.txt')).text();
  expect(llms).toMatch(/^# Nihongo Study\n/);
});

test('cada tela tem o próprio título e endereço canônico, também ao navegar dentro do app', async ({ app, page }) => {
  const canonico = page.locator('link[rel="canonical"]');
  const robots = page.locator('meta[name="robots"]');

  await app.abrir('/licoes/particulas');
  await expect(page).toHaveTitle('Partículas — lição de japonês · Nihongo Study');
  await expect(canonico).toHaveAttribute('href', `${SITE}/licoes/particulas`);
  await expect(robots).toHaveAttribute('content', /^index/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Partículas \(は, が, を/);

  await page.getByRole('main').getByRole('link', { name: 'Lições' }).click();
  await expect(page).toHaveTitle('Lições de japonês · Nihongo Study');
  await expect(canonico).toHaveAttribute('href', `${SITE}/licoes`);
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
});

test('telas de dados pessoais e endereço inexistente ficam fora do índice', async ({ app, page }) => {
  await app.abrir('/config');
  await expect(page).toHaveTitle('Configurações · Nihongo Study');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow');
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);

  await app.abrir('/licoes/nao-existe');
  await expect(page).toHaveTitle('Página não encontrada · Nihongo Study');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow');
});
