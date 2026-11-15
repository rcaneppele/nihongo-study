import { test, expect } from '../fixtures';

/**
 * Cabeçalhos de segurança (config/cabecalhos.ts): o `vite preview` do E2E serve os
 * mesmos que o Cloudflare Pages. As outras jornadas já falham se a CSP
 * barrar algo que o app usa (vira erro no console); aqui se confere que ela
 * está ligada e barra o que deve.
 */
test('o app é servido com a política de segurança de conteúdo e os demais cabeçalhos', async ({ page }) => {
  const resposta = await page.goto('./');
  const cabecalhos = resposta!.headers();
  const csp = cabecalhos['content-security-policy'];
  expect(csp).toContain("default-src 'self'");
  expect(csp).toContain("script-src 'self'");
  expect(csp).not.toContain("script-src 'self' 'unsafe-inline'");
  expect(csp).toContain("frame-ancestors 'none'");
  expect(csp).toContain('https://www.googleapis.com');
  expect(cabecalhos['x-content-type-options']).toBe('nosniff');
  expect(cabecalhos['x-frame-options']).toBe('DENY');
  expect(cabecalhos['referrer-policy']).toBe('strict-origin-when-cross-origin');
});

test('script injetado na página não roda, e pedido a endereço de fora é barrado', async ({ page, errosDaPagina }) => {
  await page.goto('./');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  const resultado = await page.evaluate(async () => {
    const violacoes: string[] = [];
    document.addEventListener('securitypolicyviolation', (e) => violacoes.push(e.effectiveDirective));
    const script = document.createElement('script');
    script.textContent = 'window.__injetado = true';
    document.body.appendChild(script);
    const pedido = await fetch('https://exemplo.invalid/roubo').then(
      () => 'passou',
      () => 'barrado'
    );
    await new Promise((r) => setTimeout(r, 50));
    return { injetado: (window as unknown as { __injetado?: boolean }).__injetado === true, pedido, violacoes };
  });
  expect(resultado.injetado).toBe(false);
  expect(resultado.pedido).toBe('barrado');
  expect(resultado.violacoes).toEqual(expect.arrayContaining(['script-src-elem', 'connect-src']));
  // As violações provocadas de propósito aparecem como erro no console: são o esperado aqui.
  expect(errosDaPagina.every((e) => /Content[- ]Security[- ]Policy/.test(e))).toBe(true);
  errosDaPagina.length = 0;
});

test('o tema salvo vale antes de o app montar (o script do tema é um arquivo, não inline)', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('nihongo-study:theme', 'dark'));
  // Segura o JavaScript do app: se a classe aparecer, foi o tema.js.
  await page.route('**/assets/*.js', () => {});
  await page.goto('./', { waitUntil: 'commit' });
  await expect(page.locator('html')).toHaveClass(/dark/);
});
