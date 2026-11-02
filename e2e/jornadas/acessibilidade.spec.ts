import AxeBuilder from '@axe-core/playwright';
import { test, expect } from '../fixtures';

/**
 * Acessibilidade (axe-core) nas telas principais, no tema claro e no
 * escuro: sem violação séria ou crítica (nome de botão, rótulo de campo,
 * estrutura ARIA, teclado…).
 *
 * Contraste de cor fica de fora por enquanto: o texto secundário (`sage`)
 * tem contraste 3,3–3,6 sobre o papel claro (o WCAG AA pede 4,5). Corrigir
 * é mudar a paleta — decisão de design pendente, ver
 * docs/estrategia-testes.md › Pendências. Quando decidir, tire o
 * `disableRules`.
 */
const ROTAS = [
  '/',
  '/aprender',
  '/aprender/palavras',
  '/kana',
  '/kanji',
  '/praticar',
  '/praticar/ler',
  '/leitura',
  '/leitura/apresentacao',
  '/licoes',
  '/licoes/desu',
  '/licoes/quiz',
  '/licoes/kakitori',
  '/licoes/diga',
  '/licoes/gramatica',
  '/licoes/diario',
  '/revisar',
  '/pontos-fracos',
  '/flashcards',
  '/progresso',
  '/config',
  '/config?tab=config',
  '/config?tab=sobre',
];

for (const tema of ['light', 'dark'] as const) {
  test.describe(`tema ${tema === 'light' ? 'claro' : 'escuro'}`, () => {
    test.use({ colorScheme: tema });
    for (const rota of ROTAS) {
      test(`sem violações sérias em ${rota}`, async ({ app, page }) => {
        await app.abrir(rota);
        await page.waitForTimeout(300); // transições de entrada
        const { violations } = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
          .disableRules(['color-contrast'])
          .analyze();
        const graves = violations
          .filter((v) => v.impact === 'serious' || v.impact === 'critical')
          .map((v) => `${v.id} (${v.impact}): ${v.help} — ${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(' | ')}`);
        expect(graves).toEqual([]);
      });
    }
  });
}
