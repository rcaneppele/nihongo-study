import { test, expect } from '../fixtures';
import { backup, cardRevisado, DIA } from '../dados';

/**
 * Pontos fracos (treino em prática livre do que mais se erra), "Já sei" no
 * mapa de palavras e o aviso de conquista desbloqueada.
 */
test.describe('Pontos fracos', () => {
  test('sem erros registrados: explica de onde eles vêm', async ({ app, page }) => {
    await app.abrir('/pontos-fracos');
    await expect(page.getByText('Nenhum ponto fraco por enquanto')).toBeVisible();
  });

  test('junta o que foi errado em cada parte do app e treina sem mexer na agenda', async ({ app, page }) => {
    const esquecido = cardRevisado('ねこ', 'gato', 3, 2 * DIA, { lapses: 2 });
    await app.prepararDados(
      backup({
        cards: [esquecido, cardRevisado('いぬ', 'cachorro', 10, 5 * DIA)],
        kanaProgress: [
          { char: 'ぬ', type: 'hiragana', romajiCorrect: 1, romajiWrong: 3 },
          { char: 'あ', type: 'hiragana', romajiCorrect: 5, romajiWrong: 0 },
        ],
      })
    );
    await app.abrir('/pontos-fracos');
    await expect(page.getByText('2 itens para reforçar, de 2 partes do app')).toBeVisible();
    // Só o que foi errado aparece: o card firme e o kana sempre acertado ficam de fora.
    await expect(page.getByText('gato')).toBeVisible();
    await expect(page.getByText('cachorro')).toBeHidden();

    await page.getByRole('button', { name: 'Treinar meus pontos fracos (2)' }).click();
    await expect(page.getByText('Prática livre')).toBeVisible();
    for (let i = 1; i <= 2; i++) {
      await expect(page.getByText(`${i} de 2`)).toBeVisible();
      await page.getByRole('button', { name: /Mostrar resposta/ }).click();
      await page.getByRole('button', { name: /Próximo/ }).click();
    }
    await expect(page.getByText('Sessão concluída.')).toBeVisible();
    await page.getByRole('button', { name: 'Voltar' }).click();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Pontos fracos/);

    // Prática livre: nenhuma revisão gravada, e a data do card não mudou.
    expect(await app.lerTabela('reviews')).toHaveLength(0);
    const cards = await app.lerTabela<{ front: string; dueDate: number }>('cards');
    expect(cards.find((c) => c.front === 'ねこ')?.dueDate).toBe(esquecido.dueDate);
  });
});

test.describe('Palavras novas', () => {
  test('"Já sei" marca a palavra como conhecida sem criar card, e dá para desmarcar', async ({ app, page }) => {
    await app.abrir('/aprender/palavras');
    const palavra = page.locator('section.grid > button').first();
    const frente = (await palavra.locator('span').first().textContent())!;
    await palavra.click();
    await page.getByRole('button', { name: 'Já sei esta palavra' }).click();
    await expect(page.getByText('(marcada aqui no mapa)')).toBeVisible();
    expect(await app.lerTabela('cards')).toHaveLength(0);
    expect(await app.lerTabela('wordKnowledge')).toMatchObject([{ key: frente, status: 'compreendida' }]);

    await page.getByRole('button', { name: 'Desmarcar "já sei"' }).click();
    await expect(page.getByRole('button', { name: 'Já sei esta palavra' })).toBeVisible();
    expect(await app.lerTabela('wordKnowledge')).toHaveLength(0);
    // Fica a lápide, para a palavra não voltar de outro aparelho na sincronização.
    expect(await app.lerTabela('deleted')).toMatchObject([{ table: 'wordKnowledge', key: frente }]);
  });
});

test.describe('Palavras novas: grade', () => {
  test('começa com as palavras mais úteis; "Mostrar todas" abre o deck inteiro', async ({ app, page }) => {
    await app.abrir('/aprender/palavras');
    const palavras = page.locator('section.grid > button');
    await expect(palavras).toHaveCount(48);
    const mostrar = page.getByRole('button', { name: /Mostrar todas as \d+ palavras/ });
    await mostrar.click();
    expect(await palavras.count()).toBeGreaterThan(100);
    await page.getByRole('button', { name: 'Mostrar só as mais úteis' }).click();
    await expect(palavras).toHaveCount(48);
  });

  test('no celular, tocar numa palavra leva até o painel dela (que fica abaixo da grade)', async ({ app, page }) => {
    await page.setViewportSize({ width: 390, height: 740 });
    await app.abrir('/aprender/palavras');
    const palavra = page.locator('section.grid > button').nth(1);
    const frente = (await palavra.locator('span').first().textContent())!;
    await expect(page.getByRole('button', { name: 'Já sei esta palavra' })).not.toBeInViewport();
    await palavra.click();
    await expect(page.getByRole('button', { name: 'Já sei esta palavra' })).toBeInViewport();
    await expect(page.getByText(frente).last()).toBeInViewport();
  });
});

test.describe('Revisão do dia longa', () => {
  test('fila grande é feita em sessões de até 50, e a pendência continua visível', async ({ app, page }) => {
    const cards = Array.from({ length: 60 }, (_, i) => cardRevisado(`palavra${i}`, `significado ${i}`, 3, -DIA));
    await app.prepararDados(backup({ cards }));
    await app.abrir('/revisar');
    await expect(page.getByText('60 itens para relembrar')).toBeVisible();
    await expect(page.getByText(/em sessões de até 50, os mais atrasados primeiro/)).toBeVisible();
    await page.getByRole('button', { name: /Começar revisão \(50\)/ }).click();
    await expect(page.getByText('1 de 50')).toBeVisible();
  });
});

test.describe('Navegação', () => {
  test('a pendência de revisão tem texto para leitor de tela, não só o ponto vermelho', async ({ app, page }) => {
    await app.prepararDados(backup({ cards: [cardRevisado('ねこ', 'gato', 3, -DIA)] }));
    await app.abrir('/');
    await expect(page.getByRole('link', { name: /Revisar.*1 para revisar/ }).first()).toBeVisible();
  });
});

test.describe('Conquistas', () => {
  test('terminar a primeira leitura avisa a conquista e ela aparece no Progresso', async ({ app, page }) => {
    await app.abrir('/leitura/apresentacao');
    await page.getByRole('button', { name: 'Terminei a leitura' }).click();
    const aviso = page.getByRole('status').filter({ hasText: 'Conquista desbloqueada' });
    await expect(aviso).toBeVisible();
    await expect(aviso).toContainText('Primeira leitura');
    expect((await app.lerTabela<{ id: string }>('achievements')).map((a) => a.id)).toContain('leitura-1');

    await aviso.getByRole('link', { name: 'Ver' }).click();
    await expect(page).toHaveURL(/\/progresso#conquistas$/);
    await expect(aviso).toBeHidden();
    await expect(page.getByText('Primeira leitura').first()).toBeVisible();

    // Já desbloqueada: ler de novo não avisa outra vez.
    await app.abrir('/leitura/apresentacao');
    await page.getByRole('button', { name: 'Terminei a leitura' }).click();
    await expect(page.getByText('Leitura registrada')).toBeVisible();
    await page.waitForTimeout(2500);
    await expect(aviso).toBeHidden();
  });
});
