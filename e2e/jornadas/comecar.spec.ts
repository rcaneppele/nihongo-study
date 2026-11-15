import { backup, card } from '../dados';
import { test, expect } from '../fixtures';

/** Guia "Começando do zero": cartão da Home num aparelho novo, o guia e o acesso permanente. */

const CARTAO = 'Novo no japonês? Comece por aqui';

test('aparelho novo: o cartão da Home leva ao guia, e o primeiro passo à lição de Kana', async ({ app, page }) => {
  await app.abrir('/');
  await expect(page.getByText(CARTAO)).toBeVisible();
  await page.getByRole('link', { name: /Ler o guia/ }).click();

  await expect(page.getByRole('heading', { level: 1, name: 'Começando do zero' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Abrir o manual' })).toHaveAttribute('href', /manual-do-usuario\.pdf$/);

  await page.getByRole('link', { name: /Lição de Kana/ }).click();
  await expect(page.getByRole('heading', { level: 1, name: /Kana/ })).toBeVisible();

  // Abrir a primeira lição já é começar a estudar: o cartão sai da Home.
  await app.abrir('/');
  await expect(page.getByText(/こんにちは|こんばんは|おはよう/).first()).toBeVisible();
  await expect(page.getByText(CARTAO)).toHaveCount(0);
});

test('dispensar o cartão vale para este aparelho; o guia continua em Aprender e em Lições', async ({ app, page }) => {
  await app.abrir('/');
  await page.getByRole('button', { name: 'Dispensar o guia para iniciantes' }).click();
  await expect(page.getByText(CARTAO)).toHaveCount(0);
  await page.reload();
  await expect(page.getByText(/こんにちは|こんばんは|おはよう/).first()).toBeVisible();
  await expect(page.getByText(CARTAO)).toHaveCount(0);
  expect(await app.lerTabela('local')).toContainEqual({ key: 'avisoComecarDispensado', value: true });

  for (const rota of ['/aprender', '/licoes']) {
    await app.abrir(rota);
    await page.getByRole('link', { name: /Nunca estudou japonês/ }).click();
    await expect(page.getByRole('heading', { level: 1, name: 'Começando do zero' })).toBeVisible();
  }
});

test('quem já estuda (ex.: importou um backup) não vê o cartão', async ({ app, page }) => {
  await app.prepararDados(backup({ cards: [card('ねこ', 'gato')] }));
  await app.abrir('/');
  await expect(page.getByText(/こんにちは|こんばんは|おはよう/).first()).toBeVisible();
  await expect(page.getByText(CARTAO)).toHaveCount(0);
});
