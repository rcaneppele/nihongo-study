import { test, expect } from '../fixtures';
import { backup, card, cardRevisado, DIA, licaoVista } from '../dados';

/** Flash cards: aprender palavras, Revisão do dia, desfazer, produção, prática livre e a lista "Meus cards". */

test.describe('Aprender palavras e revisar', () => {
  test('aprender as próximas 10, revisar todas e ver o dia contado na Home', async ({ app, page }) => {
    await app.abrir('/aprender/palavras');
    await page.getByRole('button', { name: 'Aprender as próximas 10' }).click();
    await expect(page.getByText(/10 card\(s\) criado\(s\) — já estão na Revisão do dia/)).toBeVisible();

    await app.abrir('/revisar');
    await expect(page.getByText('10 item(ns) para relembrar')).toBeVisible();
    await page.getByRole('button', { name: /Começar revisão/ }).click();

    for (let i = 1; i <= 10; i++) {
      await expect(page.getByText(`${i} de 10`)).toBeVisible();
      await page.getByRole('button', { name: /Mostrar resposta/ }).click();
      await page.getByRole('button', { name: /^Lembrei/ }).click();
    }
    await expect(page.getByText('Sessão concluída.')).toBeVisible();
    await page.getByRole('button', { name: 'Concluir revisão' }).click();
    await expect(page.getByText('Revisão do dia concluída!')).toBeVisible();

    const reviews = await app.lerTabela('reviews');
    expect(reviews).toHaveLength(10);
    const cards = await app.lerTabela<{ state: number; dueDate: number }>('cards');
    expect(cards.every((c) => c.state === 2 && c.dueDate > Date.now())).toBe(true);

    await app.abrir('/');
    // 10 revisões + 10 palavras novas = 20 pontos, a meta padrão.
    await expect(page.getByText('Meta de hoje batida — bom trabalho!')).toBeVisible();
  });

  test('atalhos de teclado: Espaço mostra a resposta e dá "Lembrei"', async ({ app, page }) => {
    await app.prepararDados(backup({ cards: [card('ねこ', 'gato')], lessonProgress: [licaoVista('kana')] }));
    await app.abrir('/revisar');
    await page.getByRole('button', { name: /Começar revisão/ }).click();
    await expect(page.getByText('ねこ')).toBeVisible();
    await page.keyboard.press('Space');
    await expect(page.getByText('gato')).toBeVisible();
    await page.keyboard.press('Space');
    await expect(page.getByText('Sessão concluída.')).toBeVisible();
    expect(await app.lerTabela('reviews')).toHaveLength(1);
  });

  test('desfazer volta o card e apaga a revisão', async ({ app, page }) => {
    await app.prepararDados(backup({ cards: [card('ねこ', 'gato'), card('いぬ', 'cachorro')] }));
    await app.abrir('/revisar');
    await page.getByRole('button', { name: /Começar revisão/ }).click();
    await page.getByRole('button', { name: /Mostrar resposta/ }).click();
    await page.getByRole('button', { name: /^Não lembrei/ }).click();
    await expect(page.getByText('2 de 2')).toBeVisible();
    await page.getByRole('button', { name: 'Desfazer' }).click();
    await expect(page.getByText('1 de 2')).toBeVisible();
    // Volta já mostrando a resposta, pronto pra dar outra nota.
    await expect(page.getByRole('button', { name: /^Lembrei/ })).toBeVisible();
    await expect.poll(async () => (await app.lerTabela('reviews')).length).toBe(0);
    const lapides = await app.lerTabela<{ table: string }>('deleted');
    expect(lapides.filter((l) => l.table === 'reviews')).toHaveLength(1);
  });

  test('desistir no meio volta ao hub sem marcar como concluída; o que foi respondido fica', async ({ app, page }) => {
    await app.prepararDados(backup({ cards: [card('ねこ', 'gato'), card('いぬ', 'cachorro')] }));
    await app.abrir('/revisar');
    await page.getByRole('button', { name: /Começar revisão/ }).click();
    await page.getByRole('button', { name: /Mostrar resposta/ }).click();
    await page.getByRole('button', { name: /^Lembrei/ }).click();
    await page.getByRole('button', { name: 'Desistir e voltar' }).click();
    await expect(page.getByText('1 item(ns) para relembrar')).toBeVisible();
  });
});

test.describe('Direção de produção (Sei dizer)', () => {
  test('produção vencida aparece como "Como se diz em japonês?"', async ({ app, page }) => {
    const ontem = Date.now() - DIA;
    const producao = { stability: 0, difficulty: 0, state: 0, reps: 0, lapses: 0, scheduledDays: 0, dueDate: ontem };
    await app.prepararDados(backup({ cards: [cardRevisado('ねこ', 'gato', 10, 5 * DIA, { production: producao })] }));
    await app.abrir('/revisar');
    await page.getByRole('button', { name: /Começar revisão/ }).click();
    await expect(page.getByText('Como se diz em japonês?')).toBeVisible();
    await expect(page.getByText('gato')).toBeVisible();
    await page.getByRole('button', { name: /Mostrar resposta/ }).click();
    await expect(page.getByText('ねこ').first()).toBeVisible();
    await page.getByRole('button', { name: /^Lembrei/ }).click();
    const [review] = await app.lerTabela<{ direction?: string }>('reviews');
    expect(review.direction).toBe('production');
  });

  test('"Treinar a dizer" na lista muda o estágio para Sei dizer', async ({ app, page }) => {
    await app.prepararDados(backup({ cards: [cardRevisado('ねこ', 'gato', 3, 3 * DIA)] }));
    await app.abrir('/flashcards');
    await expect(page.getByText('Reconheço')).toBeVisible();
    await page.getByRole('button', { name: 'Treinar a dizer' }).click();
    await expect(page.getByText('Sei dizer')).toBeVisible();
    await page.getByRole('button', { name: 'Voltar um estágio' }).click();
    await expect(page.getByText('Reconheço')).toBeVisible();
  });
});

test.describe('Agenda no tempo', () => {
  test('card revisado hoje some da fila e volta no dia em que vence', async ({ app, page }) => {
    const inicio = Date.parse('2026-03-15T10:00:00-03:00');
    await page.clock.install({ time: inicio });
    await app.prepararDados(backup({ cards: [card('ねこ', 'gato', { dueDate: inicio, createdAt: inicio, updatedAt: inicio })], exportedAt: inicio }));
    await app.abrir('/revisar');
    await page.getByRole('button', { name: /Começar revisão/ }).click();
    await page.getByRole('button', { name: /Mostrar resposta/ }).click();
    const lembrei = page.getByRole('button', { name: /^Lembrei/ });
    const dias = Number((await lembrei.innerText()).match(/em (\d+) dias/)?.[1] ?? 1);
    await lembrei.click();
    await page.getByRole('button', { name: 'Concluir revisão' }).click();
    await expect(page.getByText('Revisão do dia concluída!')).toBeVisible();

    await page.clock.setFixedTime(inicio + (dias - 1) * DIA);
    await app.abrir('/revisar');
    await expect(page.getByText('Tudo em dia')).toBeVisible();

    await page.clock.setFixedTime(inicio + (dias + 1) * DIA);
    await app.abrir('/revisar');
    await expect(page.getByText('1 item(ns) para relembrar')).toBeVisible();
  });
});

test.describe('Meus cards', () => {
  test('criar, buscar, anotar e apagar um card', async ({ app, page }) => {
    await app.abrir('/flashcards');
    await page.getByRole('button', { name: 'Novo card' }).click();
    await page.getByLabel('Frente (japonês)').fill('さくら');
    await page.getByLabel('Verso (significado)').fill('cerejeira');
    await page.getByLabel('Categoria (opcional)').fill('Natureza');
    await page.getByRole('button', { name: 'Adicionar card' }).click();
    await page.getByLabel('Frente (japonês)').fill('うみ');
    await page.getByLabel('Verso (significado)').fill('mar');
    await page.getByRole('button', { name: 'Adicionar card' }).click();
    await page.getByRole('button', { name: 'Fechar' }).click();
    await expect(page.getByText('2 cards · 2 para revisar')).toBeVisible();

    await page.getByRole('searchbox', { name: 'Buscar cards' }).fill('cerej');
    await expect(page.getByText('1 de 2 card(s)')).toBeVisible();
    await expect(page.getByText('うみ')).toBeHidden();
    await page.getByRole('searchbox', { name: 'Buscar cards' }).fill('');

    await page.getByRole('button', { name: 'Natureza' }).click();
    await expect(page.getByText('うみ')).toBeHidden();
    await page.getByRole('button', { name: 'Todas' }).click();

    await page.getByRole('button', { name: 'Excluir うみ' }).click();
    await expect(page.getByText('1 cards · 1 para revisar')).toBeVisible();
    const lapides = await app.lerTabela<{ table: string }>('deleted');
    expect(lapides.some((l) => l.table === 'cards')).toBe(true);
  });

  test('prática livre não mexe na agenda', async ({ app, page }) => {
    await app.prepararDados(backup({ cards: [card('ねこ', 'gato'), card('いぬ', 'cachorro')] }));
    await app.abrir('/flashcards');
    await page.getByRole('button', { name: 'Praticar' }).click();
    await page.getByRole('button', { name: /Dizer em japonês/ }).click();
    await page.getByRole('button', { name: 'Iniciar prática' }).click();
    await expect(page.getByText('Prática livre')).toBeVisible();
    for (let i = 0; i < 2; i++) {
      await page.getByRole('button', { name: /Mostrar resposta/ }).click();
      await page.getByRole('button', { name: /Próximo/ }).click();
    }
    await expect(page.getByText('Sessão concluída.')).toBeVisible();
    expect(await app.lerTabela('reviews')).toHaveLength(0);
    const cards = await app.lerTabela<{ state: number }>('cards');
    expect(cards.every((c) => c.state === 0)).toBe(true);
  });
});
