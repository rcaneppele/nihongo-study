import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { LICOES } from '../../licoes';
import { SITE } from '../../lib/site';
import { gerarLlmsTxt, gerarSitemap } from './arquivosPublicos';

/**
 * Os arquivos de `public/` estão em dia com o conteúdo do app. Se este teste
 * falhar depois de criar uma lição ou um texto de leitura, `npm test -u`
 * regrava os arquivos (e o diff mostra o que mudou).
 */
const PUBLIC = join(__dirname, '..', '..', '..', 'public');

describe('arquivos públicos para buscadores', () => {
  it('public/sitemap.xml está em dia com as páginas do app', async () => {
    await expect(gerarSitemap()).toMatchFileSnapshot(join(PUBLIC, 'sitemap.xml'));
  });

  it('public/llms.txt está em dia com as lições e os textos', async () => {
    await expect(gerarLlmsTxt()).toMatchFileSnapshot(join(PUBLIC, 'llms.txt'));
  });

  it('sitemap: endereços absolutos de produção, um por página', () => {
    const locs = [...gerarSitemap().matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    expect(locs[0]).toBe(`${SITE.url}/`);
    expect(locs.every((l) => l.startsWith(`${SITE.url}/`))).toBe(true);
    expect(locs).toContain(`${SITE.url}/licoes/particulas`);
    expect(locs).toContain(`${SITE.url}/privacidade`);
    expect(new Set(locs).size).toBe(locs.length);
  });

  it('llms.txt: título, resumo e um link para cada lição', () => {
    const txt = gerarLlmsTxt();
    expect(txt.startsWith(`# ${SITE.nome}\n\n> ${SITE.descricao}\n`)).toBe(true);
    for (const { meta } of LICOES) expect(txt).toContain(`](${SITE.url}/licoes/${meta.id})`);
  });

  it('robots.txt libera tudo e aponta o sitemap', () => {
    const robots = readFileSync(join(PUBLIC, 'robots.txt'), 'utf8');
    expect(robots).toMatch(/^User-agent: \*\nAllow: \/$/m);
    expect(robots).not.toMatch(/Disallow: \/\s*$/m);
    expect(robots).toContain(`Sitemap: ${SITE.url}/sitemap.xml`);
  });
});
