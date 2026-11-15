import type { Browser, Page } from '@playwright/test';
import { test, expect, App } from '../fixtures';
import { backup, card } from '../dados';
import { DriveFalso } from '../driveFalso';

/**
 * Sincronização com o Google Drive, de ponta a ponta, contra um Google
 * simulado (e2e/driveFalso.ts): conectar, dois aparelhos na mesma conta,
 * acesso vencido (aviso na Home e "Entrar de novo") e apagar a cópia do
 * Drive. A lógica do ciclo é testada em Node (motor.test.ts); aqui é o
 * caminho inteiro pela tela, incluindo a ida e a volta do login.
 */

/** Outro aparelho: contexto novo do navegador, ligado ao mesmo Drive. */
async function outroAparelho(browser: Browser, drive: DriveFalso, baseURL: string | undefined) {
  const contexto = await browser.newContext({ baseURL, locale: 'pt-BR', serviceWorkers: 'block' });
  await drive.ligar(contexto);
  const page = await contexto.newPage();
  return { contexto, page, app: new App(page) };
}

async function conectar(app: App, page: Page) {
  await app.abrir('/config');
  await page.getByRole('button', { name: 'Conectar com o Google' }).click();
  // Vai ao "Google" e volta para a mesma tela, já conectado.
  await expect(page.getByText('Conectado como aluna@exemplo.com')).toBeVisible();
  await expect(page.getByText(/^Sincronizado/)).toBeVisible();
}

async function sincronizarAgora(page: Page) {
  await page.getByRole('button', { name: 'Sincronizar agora' }).click();
  await expect(page.getByRole('button', { name: 'Sincronizar agora' })).toBeEnabled();
  await expect(page.getByText(/^Sincronizado/)).toBeVisible();
}

const frentes = async (app: App) => (await app.lerTabela<{ front: string }>('cards')).map((c) => c.front).sort();

test('conectar envia os dados ao Drive; um segundo aparelho recebe, e o que ele cria volta para o primeiro', async ({
  app,
  page,
  context,
  browser,
  baseURL,
}) => {
  const drive = new DriveFalso();
  await drive.ligar(context);
  await app.prepararDados(backup({ cards: [card('ねこ', 'gato')] }));
  await conectar(app, page);
  expect(drive.conteudo()?.cards.map((c) => c.front)).toEqual(['ねこ']);
  // O token não vai para o arquivo do Drive, e o endereço ficou limpo depois da volta do login.
  expect(JSON.stringify(drive.conteudo())).not.toContain(drive.token);
  expect(page.url()).not.toContain('access_token');
  await expect(page.getByText('dados sincronizados com o Google Drive')).toBeVisible();

  const b = await outroAparelho(browser, drive, baseURL);
  await conectar(b.app, b.page);
  expect(await frentes(b.app)).toEqual(['ねこ']);

  // O segundo aparelho ganha um card e sincroniza; o primeiro o recebe.
  const escolher = b.page.waitForEvent('filechooser');
  await b.page.getByRole('button', { name: 'Escolher arquivo' }).click();
  await (await escolher).setFiles({ name: 'cards.csv', mimeType: 'text/csv', buffer: Buffer.from('いぬ,cachorro') });
  await expect(b.page.getByText('1 card importado.')).toBeVisible();
  // "Sincronizado…" já estava na tela antes do clique: o que confirma o ciclo é o dado chegar.
  await sincronizarAgora(b.page);
  await expect.poll(() => drive.conteudo()?.cards.map((c) => c.front).sort()).toEqual(['いぬ', 'ねこ']);

  await sincronizarAgora(page);
  await expect.poll(() => frentes(app)).toEqual(['いぬ', 'ねこ']);
  await b.contexto.close();
});

test('acesso vencido: avisa na Home, não perde nada, e "Entrar" retoma a sincronização', async ({ app, page, context }) => {
  const drive = new DriveFalso();
  await drive.ligar(context);
  await app.prepararDados(backup({ cards: [card('ねこ', 'gato')] }));
  await conectar(app, page);

  // O Google deixa de aceitar o token, e a renovação sem tela também falha.
  drive.token = 'token-e2e-2';
  drive.exigeInteracao = true;
  await page.getByRole('button', { name: 'Sincronizar agora' }).click();
  await expect(page.getByText(/O acesso ao Google venceu/)).toBeVisible();
  await expect(page.getByRole('button', { name: 'Entrar de novo no Google' })).toBeVisible();

  await app.abrir('/');
  await expect(page.getByText('Sincronização pausada')).toBeVisible();
  expect(await frentes(app)).toEqual(['ねこ']);

  const chamadasAntes = drive.chamadas.length;
  await page.getByRole('button', { name: 'Entrar', exact: true }).click();
  // Espera a ida ao "Google" e a volta terminarem antes de mexer na página (navegar no meio do
  // caminho cancelaria o login): de volta, o app abre e já sincroniza — chega pedido novo ao Drive.
  await expect.poll(() => drive.chamadas.length).toBeGreaterThan(chamadasAntes);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByText('Sincronização pausada')).toBeHidden();
  await app.abrir('/config');
  await expect(page.getByText(/^Sincronizado/)).toBeVisible();
});

test('apagar a cópia do Drive remove o arquivo e desconecta, sem tocar nos dados do aparelho', async ({ app, page, context }) => {
  const drive = new DriveFalso();
  await drive.ligar(context);
  await app.prepararDados(backup({ cards: [card('ねこ', 'gato')] }));
  await conectar(app, page);
  expect(drive.arquivo).not.toBeNull();

  await page.getByText('Apagar a cópia no Drive').click();
  page.once('dialog', (d) => d.accept());
  await page.getByRole('button', { name: 'Apagar dados do Drive' }).click();
  await expect(page.getByText('Cópia no Drive apagada e aparelho desconectado.')).toBeVisible();
  expect(drive.arquivo).toBeNull();
  // Desconectar revoga o acesso no Google.
  expect(drive.chamadas).toContain('POST oauth2.googleapis.com/revoke');
  await expect(page.getByRole('button', { name: 'Conectar com o Google' })).toBeVisible();
  await expect(page.getByText('dados salvos só neste dispositivo')).toBeVisible();
  expect(await frentes(app)).toEqual(['ねこ']);
});
