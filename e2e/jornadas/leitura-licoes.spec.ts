import type { Page } from '@playwright/test';
import { test, expect } from '../fixtures';

/** Leitura extensiva e lições (conteúdo, conclusão, Quiz, Diga em japonês, Kakitori, Gramática, Diário). */

test.describe('Leitura extensiva', () => {
  test('tocar palavra, salvar como card com a frase, terminar a leitura e ver o vocabulário contado', async ({ app, page }) => {
    await app.abrir('/leitura/apresentacao');
    await page.getByRole('button', { name: 'たのしいです。', exact: true }).click();
    await page.getByRole('button', { name: '+ Salvar nos flash cards' }).click();
    await page.getByRole('button', { name: 'Salvar', exact: true }).click();
    await expect(page.getByText(/Salvo|já está nos seus cards|nos flash cards/i).first()).toBeVisible();

    const [card] = await app.lerTabela<{ front: string; category: string; source: { id: string }; example: { translation: string } }>('cards');
    expect(card).toMatchObject({ category: 'Leitura', source: { id: 'apresentacao' } });
    expect(card.example.translation.length).toBeGreaterThan(0);

    await page.getByRole('button', { name: 'Terminei a leitura' }).click();
    await expect(page.getByText('Leitura registrada')).toBeVisible();
    await expect(page.getByText('Palavras que você consultou')).toBeVisible();
    const palavras = await app.lerTabela<{ status: string }>('wordKnowledge');
    expect(palavras.some((p) => p.status === 'consultada')).toBe(true);
    expect(palavras.some((p) => p.status === 'compreendida')).toBe(true);
    expect(await app.lerTabela('readingProgress')).toHaveLength(1);
  });

  test('furigana liga e desliga; tradução da frase; áudio fala a linha', async ({ app, page }) => {
    await app.abrir('/leitura');
    const textoComKanji = page.locator('main a[href*="/leitura/"]').filter({ hasText: /Nível 2|N2|kanji/i }).first();
    await (await textoComKanji.count() ? textoComKanji : page.locator('main a[href*="/leitura/"]').last()).click();
    const furigana = page.getByRole('button', { name: 'Furigana' });
    if (await page.locator('main rt').count()) {
      await expect(furigana).toHaveAttribute('aria-pressed', 'true');
      await furigana.click();
      await expect(page.locator('main rt').first()).toBeHidden();
      await furigana.click();
      await expect(page.locator('main rt').first()).toBeVisible();
    }
    await page.getByRole('button', { name: /ver tradução da frase completa/ }).first().click();
    await page.getByRole('button', { name: /^Ouvir pronúncia de / }).first().click();
    await expect.poll(() => app.falas()).toHaveLength(1);
  });

  test('ouvir o texto inteiro fala todas as linhas, em ordem', async ({ app, page }) => {
    await app.abrir('/leitura/apresentacao');
    await page.getByRole('button', { name: 'Ouvir o texto' }).click();
    await expect.poll(async () => (await app.falas()).length, { timeout: 20_000 }).toBe(12);
    expect((await app.falas())[0]).toContain('はじめまして');
  });

  test('escutar sem ler: texto escondido, autoavaliação gravada no histórico', async ({ app, page }) => {
    await app.abrir('/leitura/apresentacao?modo=ouvir');
    await expect(page.getByText('Texto escondido — ouça e tente entender antes de ler.')).toBeVisible();
    await page.getByRole('button', { name: 'Ouvir o texto' }).click();
    await expect.poll(async () => (await app.falas()).length, { timeout: 20_000 }).toBe(12);
    await page.getByRole('button', { name: 'Mostrar texto' }).click();
    await expect(page.getByText('Quanto você entendeu só de ouvido?')).toBeVisible();
    await page.getByRole('button', { name: 'Quase tudo' }).click();
    await expect.poll(async () => (await app.lerTabela<{ kind: string; score: number }>('exerciseResults')).map((r) => [r.kind, r.score])).toEqual([['escuta', 1]]);
  });
});

test.describe('Lições', () => {
  test('concluir uma lição avança a trilha e conta no dia; desmarcar volta', async ({ app, page }) => {
    await app.abrir('/licoes/desu');
    await page.getByRole('button', { name: 'Concluí esta lição' }).click();
    await expect(page.getByText('Lição concluída')).toBeVisible();
    const [p] = await app.lerTabela<{ lessonId: string; completedAt?: number }>('lessonProgress');
    expect(p).toMatchObject({ lessonId: 'desu' });
    expect(p.completedAt).toBeGreaterThan(0);
    await page.getByRole('button', { name: 'Desmarcar' }).click();
    await expect(page.getByRole('button', { name: 'Concluí esta lição' })).toBeVisible();
  });

  test('o áudio dos exemplos fala o japonês', async ({ app, page }) => {
    await app.abrir('/licoes/aisatsu');
    await page.locator('main').getByRole('button', { name: /Ouvir/ }).first().click();
    await expect.poll(async () => (await app.falas()).length).toBeGreaterThan(0);
  });
});

/** Responde as perguntas do Quiz que aparecerem, sem se importar com acerto. */
async function responderQuiz(page: Page, total: number) {
  for (let i = 1; i <= total; i++) {
    await expect(page.getByText(`${i} de ${total}`)).toBeVisible();
    const vf = page.getByRole('button', { name: 'Verdadeiro' });
    if (await vf.isVisible()) await vf.click();
    else await page.locator('main button:not([disabled])').filter({ hasNotText: /Desistir/ }).first().click();
    const conferir = page.getByRole('button', { name: 'Conferir' });
    if (await conferir.isVisible().catch(() => false)) await conferir.click();
    await page.getByRole('button', { name: i === total ? 'Finalizar' : 'Próxima' }).click();
  }
}

test.describe('Exercícios das lições', () => {
  test('Quiz de verdadeiro ou falso: 3 perguntas, resultado e histórico', async ({ app, page }) => {
    await app.abrir('/licoes/quiz');
    for (const tipo of ['Reordenar frase', 'Escolher partícula', 'Significado']) await page.getByRole('button', { name: tipo }).click();
    await page.getByRole('spinbutton', { name: 'Quantidade de perguntas' }).fill('3');
    await page.getByRole('button', { name: 'Gerar quiz' }).click();
    await responderQuiz(page, 3);
    await expect(page.getByRole('button', { name: 'Novo quiz' })).toBeVisible();
    const historico = await app.lerTabela<{ kind: string }>('exerciseResults');
    expect(historico).toHaveLength(3);
    expect(historico.every((r) => r.kind === 'quiz')).toBe(true);
  });

  test('Diga em japonês: errar e acertar, salvar as erradas como cards já em "Sei dizer"', async ({ app, page }) => {
    await app.abrir('/licoes/diga');
    await page.getByRole('spinbutton').fill('2');
    await page.getByRole('button', { name: 'Começar' }).click();
    await page.getByRole('button', { name: /Mostrar resposta/ }).click();
    await expect.poll(async () => (await app.falas()).length).toBeGreaterThan(0);
    await page.getByRole('button', { name: /^Errei/ }).click();
    await page.getByRole('button', { name: /Mostrar resposta/ }).click();
    await page.getByRole('button', { name: /^Acertei/ }).click();
    await page.getByRole('button', { name: /Salvar as 1 que errei/ }).click();
    const [card] = await app.lerTabela<{ category: string; production?: unknown }>('cards');
    expect(card.category).toBe('Frases');
    expect(card.production).toBeDefined();
    expect((await app.lerTabela<{ score: number }>('exerciseResults')).map((r) => r.score).sort()).toEqual([0, 1]);
  });

  test('Kakitori: ouvir, digitar, revelar e autoavaliar', async ({ app, page }) => {
    await app.abrir('/licoes/kakitori');
    await page.getByRole('spinbutton', { name: 'Quantidade de itens' }).fill('2');
    await page.getByRole('button', { name: 'Gerar ditado' }).click();
    for (let i = 0; i < 2; i++) {
      await expect.poll(async () => (await app.falas()).length).toBeGreaterThan(i);
      await page.getByRole('textbox').fill('てすと');
      await page.getByRole('button', { name: 'Revelar resposta' }).click();
      await expect(page.getByText('Resposta certa')).toBeVisible();
      await page.getByRole('button', { name: i === 0 ? '✓ Acertei' : '✗ Errei' }).click();
    }
    await expect(page.getByText('Resultado do ditado')).toBeVisible();
    expect((await app.lerTabela<{ kind: string }>('exerciseResults')).filter((r) => r.kind === 'kakitori')).toHaveLength(2);
  });

  test('Gramática em contexto: completar a lacuna e ver o porquê', async ({ app, page }) => {
    await app.abrir('/licoes/gramatica');
    await page.getByRole('spinbutton').fill('2');
    await page.getByRole('button', { name: 'Começar' }).click();
    await responderQuiz(page, 2);
    await expect(page.getByText('Resultado — gramática em contexto')).toBeVisible();
    expect((await app.lerTabela<{ kind: string }>('exerciseResults')).every((r) => r.kind === 'gramatica')).toBe(true);
  });

  test('Diário guiado: escrever, marcar o checklist, editar e apagar', async ({ app, page }) => {
    await app.abrir('/licoes/diario');
    await page.getByRole('button', { name: /^Meu nome em katakana/ }).click();
    await page.getByRole('button', { name: 'Ver um exemplo' }).click();
    await page.getByRole('textbox', { name: 'Seu texto' }).fill('ロドリゴ です。');
    await page.getByRole('checkbox').first().check();
    await page.getByRole('button', { name: 'Salvar no diário' }).click();
    await expect(page.getByText('Suas entradas')).toBeVisible();
    const [entrada] = await app.lerTabela<{ text: string; checked: string[] }>('journal');
    expect(entrada).toMatchObject({ text: 'ロドリゴ です。', checked: ['0'] });

    await page.getByRole('button', { name: 'Editar entrada' }).click();
    await page.getByRole('textbox', { name: 'Seu texto' }).fill('ロドリゴ です。ブラジルじん です。');
    await page.getByRole('button', { name: 'Salvar alterações' }).click();
    await expect(page.getByText('ブラジルじん')).toBeVisible();

    page.once('dialog', (d) => d.accept());
    await page.getByRole('button', { name: 'Apagar entrada' }).click();
    await expect.poll(async () => (await app.lerTabela('journal')).length).toBe(0);
  });
});
