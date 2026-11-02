import { readFile } from 'node:fs/promises';
import type { Browser, Page } from '@playwright/test';
import { App, test, expect } from '../fixtures';
import { backup, card } from '../dados';

/** Backup e sincronização por arquivo entre dois aparelhos (dois contextos), e as preferências. */

async function outroAparelho(browser: Browser): Promise<{ page: Page; app: App; fechar: () => Promise<void> }> {
  const contexto = await browser.newContext({ locale: 'pt-BR', serviceWorkers: 'block' });
  const page = await contexto.newPage();
  return { page, app: new App(page), fechar: () => contexto.close() };
}

async function exportar(page: Page): Promise<string> {
  const baixou = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Exportar backup' }).click();
  const arquivo = await baixou;
  expect(arquivo.suggestedFilename()).toMatch(/^nihongo-study-\d{4}-\d{2}-\d{2}\.json$/);
  return readFile((await arquivo.path())!, 'utf8');
}

async function escolherArquivo(page: Page, botao: string, conteudo: string) {
  const escolher = page.waitForEvent('filechooser');
  await page.getByRole('button', { name: botao }).click();
  await (await escolher).setFiles({ name: 'backup.json', mimeType: 'application/json', buffer: Buffer.from(conteudo) });
}

test.describe('Backup entre aparelhos', () => {
  test('exportar num aparelho e importar (mesclar) no outro junta os dados dos dois', async ({ app, page, browser }) => {
    await app.prepararDados(backup({ cards: [card('ねこ', 'gato')] }));
    await app.abrir('/config');
    const arquivo = await exportar(page);
    await expect(page.getByText(/Último backup|hoje/).first()).toBeVisible();

    const b = await outroAparelho(browser);
    await b.app.prepararDados(backup({ cards: [card('いぬ', 'cachorro')] }));
    await b.app.abrir('/config');
    await b.page.getByRole('button', { name: 'Mesclar' }).click();
    await escolherArquivo(b.page, 'Importar backup', arquivo);
    await expect(b.page.getByText('Backup importado (mesclado).')).toBeVisible();
    expect((await b.app.lerTabela<{ front: string }>('cards')).map((c) => c.front).sort()).toEqual(['いぬ', 'ねこ']);
    await b.fechar();
  });

  test('substituir pede confirmação; recusar não muda nada', async ({ app, page }) => {
    await app.prepararDados(backup({ cards: [card('ねこ', 'gato')] }));
    await app.abrir('/config');
    page.once('dialog', (d) => d.dismiss());
    await escolherArquivo(page, 'Importar backup', JSON.stringify(backup({ cards: [] }))).catch(() => {});
    await expect.poll(async () => (await app.lerTabela('cards')).length).toBe(1);
  });

  test('"Sincronizar com arquivo" mescla e oferece o arquivo juntado para levar de volta', async ({ app, page, browser }) => {
    const b = await outroAparelho(browser);
    await b.app.prepararDados(backup({ cards: [card('いぬ', 'cachorro')] }));
    await b.app.abrir('/config');
    const doOutro = await exportar(b.page);
    await b.fechar();

    await app.prepararDados(backup({ cards: [card('ねこ', 'gato')] }));
    await app.abrir('/config');
    await escolherArquivo(page, 'Sincronizar com arquivo', doOutro);
    const baixou = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Baixar arquivo' }).click();
    const juntado = JSON.parse(await readFile((await (await baixou).path())!, 'utf8'));
    expect(juntado.cards.map((c: { front: string }) => c.front).sort()).toEqual(['いぬ', 'ねこ']);
  });

  test('arquivo que não é backup mostra erro e não muda nada', async ({ app, page }) => {
    await app.prepararDados(backup({ cards: [card('ねこ', 'gato')] }));
    await app.abrir('/config');
    await page.getByRole('button', { name: 'Mesclar' }).click();
    await escolherArquivo(page, 'Importar backup', '{"qualquer":"coisa"}');
    await expect(page.getByText('Erro: Não parece um backup do Nihongo Study.')).toBeVisible();
    expect(await app.lerTabela('cards')).toHaveLength(1);
  });

  test('importar cards de CSV', async ({ app, page }) => {
    await app.abrir('/config');
    const escolher = page.waitForEvent('filechooser');
    await page.getByRole('button', { name: 'Escolher arquivo' }).click();
    await (await escolher).setFiles({ name: 'cards.csv', mimeType: 'text/csv', buffer: Buffer.from('front,back\n猫,gato\n犬,"cão, cachorro"') });
    await expect(page.getByText('2 card(s) importado(s).')).toBeVisible();
  });

  test('apagar todos os dados, com confirmação', async ({ app, page }) => {
    await app.prepararDados(backup({ cards: [card('ねこ', 'gato')] }));
    await app.abrir('/config');
    page.once('dialog', (d) => d.accept());
    await page.getByRole('button', { name: /Apagar todos os dados/ }).click();
    await expect(page.getByText('Todos os dados foram apagados.')).toBeVisible();
    expect(await app.lerTabela('cards')).toHaveLength(0);
  });
});

test.describe('Preferências', () => {
  test('tema escuro fica salvo e vale depois de recarregar', async ({ app, page }) => {
    await app.abrir('/config?tab=config');
    await page.getByRole('button', { name: 'Escuro', exact: true }).click();
    await expect(page.locator('html')).toHaveClass(/dark/);
    await page.reload();
    await expect(page.locator('html')).toHaveClass(/dark/);
    await expect(page.getByRole('group', { name: 'Tema' }).getByRole('button', { name: 'Escuro' })).toHaveAttribute('aria-pressed', 'true');
  });

  test('tema "Sistema" segue o aparelho', async ({ app, page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await app.abrir('/config?tab=config');
    await page.getByRole('button', { name: 'Sistema', exact: true }).click();
    await expect(page.locator('html')).toHaveClass(/dark/);
    await page.emulateMedia({ colorScheme: 'light' });
    await expect(page.locator('html')).not.toHaveClass(/dark/);
  });

  test('meta diária aparece na Home', async ({ app, page }) => {
    await app.abrir('/config?tab=config');
    const quarenta = page.getByRole('group', { name: 'Meta diária' }).getByRole('button', { name: '40' });
    await quarenta.click();
    await expect(quarenta).toHaveAttribute('aria-pressed', 'true');
    await app.abrir('/');
    await expect(page.getByText('de 40')).toBeVisible();
  });

  test('"4 botões" mostra as quatro notas na revisão', async ({ app, page }) => {
    await app.prepararDados(backup({ cards: [card('ねこ', 'gato')] }));
    await app.abrir('/config?tab=config');
    await page.getByRole('button', { name: '4 botões' }).click();
    await expect(page.getByRole('button', { name: '4 botões' })).toHaveAttribute('aria-pressed', 'true');
    await app.abrir('/revisar');
    await page.getByRole('button', { name: /Começar revisão/ }).click();
    await page.getByRole('button', { name: /Mostrar resposta/ }).click();
    for (const nota of ['Não lembrei', 'Com esforço', 'Lembrei', 'Fácil']) {
      await expect(page.getByRole('button', { name: new RegExp(`^${nota}`) })).toBeVisible();
    }
  });
});
