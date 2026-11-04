import { describe, expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import type { ReactNode } from 'react';

/**
 * Regras de conteúdo das lições (CLAUDE.md › Convenções e
 * docs/padrao-licoes.md), conferidas renderizando cada lição de verdade:
 * os componentes de apresentação são trocados por versões que anotam as
 * props, então o teste vê exatamente o que a lição mostra.
 */
const exemplos: { licao: string; jp: string; romaji?: string; pt: string }[] = [];
const secoes: { licao: string; title: string }[] = [];
let licaoAtual = '';

vi.mock('../components/Licao', async (original) => {
  const real = await original<typeof import('../components/Licao')>();
  return {
    ...real,
    Ex: (props: { jp: string; romaji?: string; pt: string }) => {
      exemplos.push({ licao: licaoAtual, ...props });
      return null;
    },
    Section: ({ title, children }: { title: string; children: ReactNode }) => {
      secoes.push({ licao: licaoAtual, title });
      return <section>{children}</section>;
    },
  };
});

const { LICOES } = await import('./index');
const { PARTICULAS_COMUNS } = await import('../data/quiz/gerador');
/** Partículas que podem ser lacuna: as alternativas do Quiz e as de fim de frase/conjunção. */
const PARTICULAS = [...PARTICULAS_COMUNS, 'か', 'ね', 'よ', 'のに', 'より'];

const KANJI = /[一-龯々]/u;

function renderizar(id: string) {
  const entrada = LICOES.find((l) => l.meta.id === id)!;
  licaoAtual = id;
  return renderToStaticMarkup(
    <MemoryRouter>
      <entrada.Component />
    </MemoryRouter>
  );
}

for (const l of LICOES) renderizar(l.meta.id);

describe('registro de lições', () => {
  it('ids únicos, meta completa', () => {
    const ids = LICOES.map((l) => l.meta.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const { meta } of LICOES) {
      expect(meta.title.trim(), meta.id).not.toBe('');
      expect(meta.subtitle.trim(), meta.id).not.toBe('');
      expect(meta.emoji.trim(), meta.id).not.toBe('');
      expect(meta.id, meta.id).toMatch(/^[a-z0-9-]+$/);
    }
  });
});

describe.each(LICOES.map((l) => l.meta.id))('lição %s', (id) => {
  it('renderiza com conteúdo', () => {
    expect(renderizar(id).length).toBeGreaterThan(500);
  });

  it('abre com a seção "Como ler esta lição"', () => {
    expect(secoes.find((s) => s.licao === id)?.title).toBe('Como ler esta lição');
  });

  it('exemplos só em kana, sempre com romaji e tradução', () => {
    const daLicao = exemplos.filter((e) => e.licao === id);
    for (const e of daLicao) {
      expect(KANJI.test(e.jp), `${id}: ${e.jp}`).toBe(false);
      expect(e.romaji?.trim(), `${id}: ${e.jp} sem romaji`).toBeTruthy();
      expect(KANJI.test(e.romaji ?? ''), `${id}: romaji com kanji`).toBe(false);
      expect(e.pt.trim(), `${id}: ${e.jp} sem tradução`).not.toBe('');
    }
  });
});

describe('dados de exercício das lições', () => {
  it('Onomatopeias entra na trilha antes de Kanji, com Quiz, Diga e ditado', () => {
    const ids = LICOES.map((l) => l.meta.id);
    expect(ids.indexOf('onomatopeias')).toBe(ids.indexOf('kanji') - 1);
    const licao = LICOES.find((l) => l.meta.id === 'onomatopeias')!;
    expect(licao.quiz?.frases?.length).toBeGreaterThan(0);
    expect(licao.quiz?.perguntas?.length).toBeGreaterThan(0);
    expect(licao.diga?.length).toBeGreaterThan(0);
    expect(licao.kakitori?.length).toBeGreaterThan(0);
  });

  const frasesDe = (l: (typeof LICOES)[number]) => [...(l.quiz?.frases ?? []), ...(l.diga ?? [])];

  it('ids únicos por tipo de exercício no app inteiro (o histórico guarda kind:itemId)', () => {
    const frases = LICOES.flatMap((l) => frasesDe(l).map((f) => f.id));
    const perguntas = LICOES.flatMap((l) => (l.quiz?.perguntas ?? []).map((p) => p.id));
    const ditado = LICOES.flatMap((l) => (l.kakitori ?? []).flatMap((g) => g.itens.map((i) => i.id)));
    const grupos = LICOES.flatMap((l) => (l.kakitori ?? []).map((g) => g.id));
    for (const [nome, ids] of Object.entries({ frases, perguntas: [...frases, ...perguntas], ditado, grupos })) {
      const repetidos = ids.filter((x, i) => ids.indexOf(x) !== i);
      expect(repetidos, nome).toEqual([]);
    }
  });

  it('frases estruturadas: kana, romaji em todo token, tradução', () => {
    for (const l of LICOES) {
      for (const f of frasesDe(l)) {
        expect(f.tokens.length, f.id).toBeGreaterThan(0);
        expect(f.pt.trim(), f.id).not.toBe('');
        for (const t of f.tokens) {
          expect(t.texto.trim(), f.id).not.toBe('');
          expect(t.romaji.trim(), `${f.id}: ${t.texto}`).not.toBe('');
          expect(KANJI.test(t.texto), `${f.id}: ${t.texto}`).toBe(false);
        }
      }
      // No Quiz, `particula` marca a lacuna do "Escolher partícula" — uma por frase.
      for (const f of l.quiz?.frases ?? []) {
        const marcadas = f.tokens.filter((t) => t.particula);
        expect(marcadas.length, `${f.id}: no máximo uma partícula-lacuna`).toBeLessThanOrEqual(1);
        // A lacuna é só a partícula (não "palavra + partícula"), uma das alternativas do Quiz.
        for (const t of marcadas) expect(PARTICULAS, `${f.id}: ${t.texto}`).toContain(t.texto);
      }
    }
  });

  it('perguntas de significado: resposta dentro das alternativas, sem alternativa repetida', () => {
    for (const l of LICOES) {
      for (const p of l.quiz?.perguntas ?? []) {
        if (p.tipo !== 'significado') {
          expect(p.afirmacao.trim(), p.id).not.toBe('');
          continue;
        }
        expect(p.alternativas.length, p.id).toBeGreaterThanOrEqual(2);
        expect(p.correta, p.id).toBeGreaterThanOrEqual(0);
        expect(p.correta, p.id).toBeLessThan(p.alternativas.length);
        expect(new Set(p.alternativas).size, p.id).toBe(p.alternativas.length);
      }
    }
  });

  it('itens de ditado: kana sem kanji, tradução e grupo com rótulo', () => {
    for (const l of LICOES) {
      for (const g of l.kakitori ?? []) {
        expect(g.label.trim(), g.id).not.toBe('');
        expect(g.itens.length, g.id).toBeGreaterThan(0);
        for (const i of g.itens) {
          expect(KANJI.test(i.kana), `${i.id}: ${i.kana}`).toBe(false);
          expect(i.pt.trim(), i.id).not.toBe('');
          expect(i.jp.trim(), i.id).not.toBe('');
        }
      }
    }
  });
});
