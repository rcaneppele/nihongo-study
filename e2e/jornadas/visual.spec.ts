import { test, expect } from '../fixtures';
import { backup, card, cardRevisado, DIA, licaoVista } from '../dados';

/**
 * Regressão visual (projeto `visual`): screenshot das telas principais, no
 * claro e no escuro, no desktop e no celular, com relógio e dados fixos.
 * As imagens de referência ficam em `e2e/jornadas/visual.spec.ts-snapshots/`
 * e dependem do sistema (fontes, renderização): gere e confira sempre na
 * mesma máquina. Mudança de layout intencional → `npm run test:visual:atualizar`
 * e revise as imagens novas no diff antes de commitar.
 */
const AGORA = Date.parse('2026-03-16T10:00:00-03:00');

const TELAS = ['/', '/aprender', '/aprender/palavras', '/praticar', '/revisar', '/flashcards', '/progresso', '/licoes', '/licoes/desu', '/leitura/apresentacao', '/kana', '/config'];

for (const tema of ['light', 'dark'] as const) {
  for (const tamanho of [
    { nome: 'desktop', viewport: { width: 1280, height: 900 } },
    { nome: 'celular', viewport: { width: 390, height: 844 } },
  ]) {
    test.describe(`${tema} ${tamanho.nome}`, () => {
      test.use({ colorScheme: tema, viewport: tamanho.viewport });

      test.beforeEach(async ({ app, page }) => {
        await page.clock.install({ time: AGORA });
        await app.prepararDados(
          backup({
            exportedAt: AGORA,
            cards: [
              card('ねこ', 'gato', { dueDate: AGORA - DIA, createdAt: AGORA - 5 * DIA, updatedAt: AGORA - 5 * DIA }),
              cardRevisado('いぬ', 'cachorro', 10, 3 * DIA, { createdAt: AGORA - 20 * DIA, updatedAt: AGORA - DIA }),
            ],
            lessonProgress: [licaoVista('kana', true)],
            activity: [{ day: '2026-03-15', revisoes: 12, praticas: 4, leituras: 1, novos: 3, updatedAt: AGORA - DIA }],
          })
        );
      });

      for (const rota of TELAS) {
        test(`tela ${rota}`, async ({ app, page }) => {
          await app.abrir(rota);
          await page.waitForLoadState('networkidle');
          const nome = rota === '/' ? 'home' : rota.slice(1).replace(/\//g, '-');
          // A versão do app muda a cada release — mascarada pra não invalidar as imagens.
          await expect(page).toHaveScreenshot(`${tema}-${tamanho.nome}-${nome}.png`, {
            fullPage: true,
            mask: [page.getByText(/^v\d+\.\d+\.\d+$/)],
          });
        });
      }
    });
  }
}
