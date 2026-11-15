import { describe, expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter, matchPath } from 'react-router-dom';
import type { ReactNode } from 'react';

/**
 * Guia "Começando do zero": mesmas regras de conteúdo das lições (japonês
 * sempre com romaji e tradução, sem kanji em exemplo, abre com "Como ler") e
 * todo link interno cai numa rota que existe.
 */
const exemplos: { jp: string; romaji?: string; pt: string }[] = [];
const secoes: string[] = [];

vi.mock('../components/Licao', async (original) => {
  const real = await original<typeof import('../components/Licao')>();
  return {
    ...real,
    Ex: (props: { jp: string; romaji?: string; pt: string }) => {
      exemplos.push(props);
      return null;
    },
    Section: ({ title, children }: { title: string; children: ReactNode }) => {
      secoes.push(title);
      return <section>{children}</section>;
    },
  };
});

const { default: Comecar } = await import('./Comecar');
const { ROTAS } = await import('../rotas');
const { ROTA_COMECAR } = await import('../features/comecar/rota');
const { secaoDaRota } = await import('../features/metodo/estrutura');

const html = renderToStaticMarkup(
  <MemoryRouter>
    <Comecar />
  </MemoryRouter>
);
const KANJI = /[一-龯々]/u;

describe('guia "Começando do zero"', () => {
  it('está registrado como rota, dentro de Aprender', () => {
    expect(ROTAS.some((r) => r.path === ROTA_COMECAR)).toBe(true);
    expect(secaoDaRota(ROTA_COMECAR)).toBe('aprender');
  });

  it('abre com "Como ler este guia" e fecha com o manual', () => {
    expect(secoes[0]).toBe('Como ler este guia');
    expect(html).toContain('manual-do-usuario.pdf');
  });

  it('exemplos só em kana, sempre com romaji e tradução', () => {
    expect(exemplos.length).toBeGreaterThanOrEqual(10);
    for (const e of exemplos) {
      expect(KANJI.test(e.jp), e.jp).toBe(false);
      expect(e.romaji?.trim(), e.jp).toBeTruthy();
      expect(KANJI.test(e.romaji ?? ''), e.jp).toBe(false);
      expect(e.pt.trim(), e.jp).not.toBe('');
    }
  });

  it('todo link interno cai numa rota que existe', () => {
    const links = [...html.matchAll(/href="(\/[^"]*)"/g)].map((m) => m[1]).filter((h) => !h.endsWith('.pdf'));
    expect(links.length).toBeGreaterThanOrEqual(7);
    for (const to of links) {
      expect(ROTAS.some((r) => matchPath(r.path, to.split('?')[0])), to).toBe(true);
    }
  });
});
