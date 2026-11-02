import { test, expect } from '../fixtures';

/**
 * Fumaça: toda tela abre sem erro e mostra o título. As lições e os textos
 * de leitura são descobertos pelas próprias listas do app — conteúdo novo
 * entra no teste sozinho.
 */
const ROTAS: [string, RegExp][] = [
  ['/', /こんにちは|こんばんは|おはよう/],
  ['/aprender', /^Aprender$/],
  ['/aprender/palavras', /Palavras novas/],
  ['/kana', /Treino de kana/],
  ['/kanji', /Kanji/],
  ['/praticar', /^Praticar$/],
  ['/praticar/ler', /^Ler$/],
  ['/praticar/ouvir', /^Ouvir$/],
  ['/praticar/falar', /^Falar$/],
  ['/praticar/escrever', /^Escrever$/],
  ['/leitura', /Leitura/],
  ['/licoes', /Lições/],
  ['/licoes/quiz', /Testar lições|Quiz/],
  ['/licoes/kakitori', /Kakitori|Ditado/],
  ['/licoes/diga', /Diga em japonês/],
  ['/licoes/gramatica', /Gramática em contexto/],
  ['/licoes/diario', /Diário/],
  ['/revisar', /^Revisar$/],
  ['/pontos-fracos', /Pontos fracos/],
  ['/flashcards', /Meus cards/],
  ['/progresso', /Progresso/],
  ['/config', /Configurações/],
];

for (const [rota, titulo] of ROTAS) {
  test(`abre ${rota}`, async ({ app, page }) => {
    await app.abrir(rota);
    await expect(page.getByRole('heading', { level: 1 }).first()).toHaveText(titulo);
  });
}

test('toda lição da lista abre', async ({ app, page }) => {
  test.slow();
  await app.abrir('/licoes');
  const links = await page.locator('main a[href*="/licoes/"]').evaluateAll((as) =>
    [...new Set(as.map((a) => new URL((a as HTMLAnchorElement).href).pathname))].filter((p) => /\/licoes\/[a-z0-9-]+$/.test(p) && !/(quiz|kakitori|diga|gramatica|diario)$/.test(p))
  );
  expect(links.length).toBeGreaterThan(5);
  for (const href of links) {
    await page.goto(href);
    await expect(page.getByRole('heading', { name: 'Como ler esta lição' }), href).toBeVisible();
  }
});

test('todo texto de leitura abre', async ({ app, page }) => {
  test.slow();
  await app.abrir('/leitura');
  const links = await page.locator('main a[href*="/leitura/"]').evaluateAll((as) => [...new Set(as.map((a) => new URL((a as HTMLAnchorElement).href).pathname))]);
  expect(links.length).toBeGreaterThan(20);
  for (const href of links) {
    await page.goto(href);
    await expect(page.getByRole('heading', { level: 1 }), href).toBeVisible();
    await expect(page.getByRole('button', { name: /Terminei a leitura/ }), href).toBeVisible();
  }
});

test('rota desconhecida não quebra o app (menu continua utilizável)', async ({ app, page }) => {
  await app.abrir('/nao-existe');
  await page.getByRole('link', { name: 'Revisar' }).first().click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Revisar');
});
