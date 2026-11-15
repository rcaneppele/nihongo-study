import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import raw from './seed/n5.json';
import { kanaParaRomaji, soKana } from '../lib/romaji';
import { romajiConfere } from '../test/romaji';

/**
 * Integridade do romaji: em todo par "japonês em kana + romaji" do conteúdo
 * (frases de exemplo das lições, frases de quiz/diga/ditado, gramática,
 * leituras dos kanji), o romaji tem que ser a leitura daquele kana. Os
 * pares são lidos direto do código-fonte, para valer também para o que
 * for escrito depois.
 */

const SRC = join(__dirname, '..');
const PAR = /\b(?:jp|texto|kana)\s*[=:]\s*\{?\s*(["'`])((?:(?!\1).)+)\1\s*\}?\s*,?\s*romaji\s*[=:]\s*\{?\s*(["'`])((?:(?!\3).)+)\3/g;

function pares(arquivo: string): { japones: string; romaji: string; onde: string }[] {
  const fonte = readFileSync(arquivo, 'utf8');
  return [...fonte.matchAll(PAR)].map((m) => ({
    japones: m[2],
    romaji: m[4],
    onde: `${arquivo.slice(SRC.length + 1)}:${fonte.slice(0, m.index).split('\n').length}`,
  }));
}

const ARQUIVOS = [
  ...readdirSync(join(SRC, 'licoes'))
    .filter((f) => f.endsWith('.tsx') && !f.includes('.test.'))
    .map((f) => join(SRC, 'licoes', f)),
  join(SRC, 'data/kanji.ts'),
  join(SRC, 'data/gramatica/frases.ts'),
  join(SRC, 'data/diario/prompts.ts'),
  join(SRC, 'data/verbos/lista.ts'),
];

describe('romaji do conteúdo', () => {
  const todos = ARQUIVOS.flatMap(pares);
  const conferidos = todos.map((p) => ({ ...p, ok: romajiConfere(p.japones, p.romaji) })).filter((p) => p.ok !== null);

  it('encontra os pares no código (a extração não quebrou em silêncio)', () => {
    expect(conferidos.length).toBeGreaterThan(1500);
  });

  it('todo romaji é a leitura do kana ao lado', () => {
    const errados = conferidos.filter((p) => !p.ok).map((p) => `${p.onde}  ${p.japones}  ≠  ${p.romaji}`);
    expect(errados).toEqual([]);
  });
});

describe('romaji do deck N5', () => {
  it('nas entradas em kana, a leitura segue a mesma convenção das lições (sem mácron, vogal longa por extenso)', () => {
    const fora = (raw as { front: string; reading: string }[])
      .filter((e) => soKana(e.front.replace(/[～\s]/g, '')))
      // では/それでは: a partícula は se lê "wa".
      .filter((e) => kanaParaRomaji(e.front).replace(/\s/g, '') !== e.reading.replace(/\s/g, '') && !/では$/.test(e.front))
      .map((e) => `${e.front}: ${e.reading} (esperado ${kanaParaRomaji(e.front)})`);
    expect(fora).toEqual([]);
  });
});
