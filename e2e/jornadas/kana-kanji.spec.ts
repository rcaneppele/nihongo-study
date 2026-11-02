import type { Page } from '@playwright/test';
import { test, expect } from '../fixtures';
import { backup, DIA } from '../dados';
import kanaStrokes from '../../src/data/kanjivg/kana-strokes.json' with { type: 'json' };
import kanjiStrokes from '../../src/data/kanjivg/kanji-strokes.json' with { type: 'json' };

/** Treino de kana (digitar romaji, múltipla escolha, desenhar) e módulo de kanji (aprender, revisar, caligrafia). */

const VOGAIS: Record<string, string> = { あ: 'a', い: 'i', う: 'u', え: 'e', お: 'o' };
const ROMAJI_PARA_KANA = Object.fromEntries(Object.entries(VOGAIS).map(([k, r]) => [r, k]));
const TRACOS = { ...kanaStrokes, ...kanjiStrokes } as Record<string, { strokes: number[][][] }>;

/** Desenha no canvas os traços de referência do KanjiVG, como uma mão faria. */
async function desenhar(page: Page, char: string) {
  const canvas = page.locator('canvas').first();
  const caixa = (await canvas.boundingBox())!;
  for (const traco of TRACOS[char].strokes) {
    const [x0, y0] = traco[0];
    await page.mouse.move(caixa.x + (0.1 + x0 * 0.8) * caixa.width, caixa.y + (0.1 + y0 * 0.8) * caixa.height);
    await page.mouse.down();
    for (const [x, y] of traco.slice(1)) {
      await page.mouse.move(caixa.x + (0.1 + x * 0.8) * caixa.width, caixa.y + (0.1 + y * 0.8) * caixa.height, { steps: 2 });
    }
    await page.mouse.up();
  }
}

/** Seleciona só a família "a" (あいうえお) — sessão de 5 perguntas. */
async function soAFamiliaA(page: Page) {
  await page.getByRole('button', { name: 'Nenhum' }).first().click();
  await expect(page.getByText(/^0$/).first()).toBeVisible();
  await page.getByRole('button', { name: /^あいうえお/ }).click();
  await expect(page.getByText('5', { exact: true })).toBeVisible();
}

test.describe('Treino de kana', () => {
  test('digitar romaji: acerta tudo, vê o resultado e grava o progresso', async ({ app, page }) => {
    await app.abrir('/kana');
    await soAFamiliaA(page);
    await page.getByRole('button', { name: 'Iniciar teste' }).click();
    for (let i = 0; i < 5; i++) {
      const kana = (await page.locator('main p.font-jp').first().innerText()).trim();
      await page.getByPlaceholder('romaji').fill(VOGAIS[kana]);
      await page.keyboard.press('Enter');
      await expect(page.getByText('Certo!')).toBeVisible();
      await page.getByRole('button', { name: 'Próximo' }).click();
    }
    await expect(page.getByText('Resultado do teste')).toBeVisible();
    await expect(page.getByText('Para revisar')).toBeHidden();
    const progresso = await app.lerTabela<{ char: string; romajiCorrect: number }>('kanaProgress');
    expect(progresso.map((p) => p.char).sort()).toEqual(Object.keys(VOGAIS).sort());
    expect(progresso.every((p) => p.romajiCorrect === 1)).toBe(true);
  });

  test('errar mostra a resposta certa e o kana aparece em "Para revisar" e em Praticar fracos', async ({ app, page }) => {
    await app.abrir('/kana');
    await soAFamiliaA(page);
    await page.getByRole('button', { name: 'Iniciar teste' }).click();
    for (let i = 0; i < 5; i++) {
      await page.getByRole('button', { name: 'Não sei' }).click();
      await expect(page.getByText(/^Era "/)).toBeVisible();
      await page.getByRole('button', { name: 'Próximo' }).click();
    }
    await expect(page.getByText('Para revisar')).toBeVisible();
    await page.getByRole('button', { name: 'Nova seleção' }).click();
    await expect(page.getByText(/5 kana com mais erros/)).toBeVisible();
    await page.getByRole('button', { name: 'Praticar fracos' }).click();
    await expect(page.getByText('1 de 5')).toBeVisible();
  });

  test('múltipla escolha: escolher o kana do romaji', async ({ app, page }) => {
    await app.abrir('/kana?modo=escolha');
    await soAFamiliaA(page);
    await page.getByRole('button', { name: 'Iniciar teste' }).click();
    for (let i = 0; i < 5; i++) {
      const romaji = (await page.locator('main p.font-jp.text-indigo').innerText()).trim();
      const opcoes = page.locator('main .grid button');
      await expect(opcoes).toHaveCount(6);
      await opcoes.filter({ hasText: new RegExp(`^${ROMAJI_PARA_KANA[romaji]}$`) }).click();
      await expect(page.getByText('Certo!')).toBeVisible();
      await page.getByRole('button', { name: 'Próximo' }).click();
    }
    await expect(page.getByText('Resultado do teste')).toBeVisible();
    const progresso = await app.lerTabela<{ choiceCorrect?: number }>('kanaProgress');
    expect(progresso.every((p) => p.choiceCorrect === 1)).toBe(true);
  });

  test('desenhar: o traçado certo passa, mostra a nota e anima a referência', async ({ app, page }) => {
    await app.abrir('/kana?modo=desenho');
    await soAFamiliaA(page);
    await page.getByRole('button', { name: 'Iniciar teste' }).click();
    const romaji = (await page.locator('main p.font-jp.text-indigo').innerText()).trim();
    await desenhar(page, ROMAJI_PARA_KANA[romaji]);
    await page.getByRole('button', { name: 'Verificar' }).click();
    const nota = Number((await page.getByText(/^\d+%$/).innerText()).replace('%', ''));
    expect(nota).toBeGreaterThanOrEqual(60);
    await expect(page.getByText('Traço correto:')).toBeVisible();
    const [p] = await app.lerTabela<{ drawBest: number }>('kanaProgress');
    expect(p.drawBest).toBe(nota);
  });

  test('desenhar um combinado (yōon) também pode passar', async ({ app, page }) => {
    await app.abrir('/kana?modo=desenho');
    await page.getByRole('button', { name: 'Nenhum' }).first().click();
    await page.getByRole('button', { name: /^きゃきゅきょ/ }).click();
    await page.getByRole('button', { name: 'Iniciar teste' }).click();
    const romaji = (await page.locator('main p.font-jp.text-indigo').innerText()).trim();
    const char = { kya: 'きゃ', kyu: 'きゅ', kyo: 'きょ' }[romaji]!;
    // Combinado = os dois kana lado a lado: desenha cada um na sua metade.
    const canvas = page.locator('canvas').first();
    const caixa = (await canvas.boundingBox())!;
    let i = 0;
    for (const c of [...char]) {
      for (const traco of TRACOS[c].strokes) {
        const ponto = ([x, y]: number[]) => [caixa.x + ((i + x) / 2) * caixa.width, caixa.y + ((y + 0.5) / 2) * caixa.height];
        const [sx, sy] = ponto(traco[0]);
        await page.mouse.move(sx, sy);
        await page.mouse.down();
        for (const pt of traco.slice(1)) {
          const [x, y] = ponto(pt);
          await page.mouse.move(x, y, { steps: 2 });
        }
        await page.mouse.up();
      }
      i++;
    }
    await page.getByRole('button', { name: 'Verificar' }).click();
    const nota = Number((await page.getByText(/^\d+%$/).innerText()).replace('%', ''));
    expect(nota).toBeGreaterThanOrEqual(60);
  });
});

test.describe('Kanji', () => {
  test('aprender 5 kanji, revisar no dia seguinte e praticar a caligrafia', async ({ app, page }) => {
    const inicio = Date.parse('2026-03-15T10:00:00-03:00');
    await page.clock.install({ time: inicio });
    await app.abrir('/kanji');
    await page.getByRole('button', { name: '5', exact: true }).click();
    await page.getByRole('button', { name: 'Aprender 5 kanji novos' }).click();
    const aprendidos: string[] = [];
    for (let i = 0; i < 5; i++) {
      await expect(page.getByText(`${i + 1} de 5`)).toBeVisible();
      aprendidos.push((await page.locator('main p.font-jp.text-7xl').innerText()).trim());
      await expect(page.getByText('Mnemônico')).toBeVisible();
      await page.getByRole('button', { name: 'Entendi, adicionar à revisão' }).click();
    }
    expect(new Set(aprendidos).size).toBe(5);
    await expect(page.getByText('Kanji adicionados à revisão.')).toBeVisible();
    expect((await app.lerTabela<{ char: string }>('kanjiProgress')).map((k) => k.char).sort()).toEqual([...aprendidos].sort());

    // Kanji novo vence na hora: entra na Revisão do dia, depois dos flash cards.
    await app.abrir('/revisar');
    await expect(page.getByText('5 item(ns) para relembrar')).toBeVisible();
    await page.getByRole('button', { name: /Começar revisão/ }).click();
    for (let i = 0; i < 5; i++) {
      await page.getByRole('button', { name: /Mostrar resposta/ }).click();
      await page.getByRole('button', { name: /^Lembrei/ }).click();
    }
    await expect(page.getByText('Revisão concluída.')).toBeVisible();

    await page.clock.setFixedTime(inicio + DIA);
    await app.abrir('/revisar');
    await expect(page.getByText('Tudo em dia')).toBeVisible();

    await app.abrir('/kanji');
    await page.getByRole('button', { name: 'Praticar', exact: true }).click();
    const significado = (await page.locator('main p.text-hanko').first().innerText()).trim();
    expect(significado.length).toBeGreaterThan(0);
    await page.getByRole('button', { name: 'Não sei' }).click();
    await expect(page.getByText('0%')).toBeVisible();
  });

  test('caligrafia de kanji: desenhar o traço certo passa', async ({ app, page }) => {
    const agora = Date.now();
    const umKanji = (char: string) => ({ char, stability: 3, difficulty: 5, state: 2, reps: 1, lapses: 0, scheduledDays: 3, dueDate: agora + 3 * DIA, createdAt: agora, updatedAt: agora });
    await app.prepararDados(backup({ kanjiProgress: [umKanji('一')] }));
    await app.abrir('/kanji');
    await page.getByRole('button', { name: 'Praticar', exact: true }).click();
    await desenhar(page, '一');
    await page.getByRole('button', { name: 'Verificar' }).click();
    const nota = Number((await page.getByText(/^\d+%$/).innerText()).replace('%', ''));
    expect(nota).toBeGreaterThanOrEqual(60);
    await expect.poll(async () => (await app.lerTabela<{ drawBest?: number }>('kanjiProgress'))[0].drawBest).toBe(nota);
  });
});
