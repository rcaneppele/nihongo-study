import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * Direção das dependências (docs/boas-praticas.md §1): a dependência aponta
 * para dentro — `routes` → `features` → `db`/`data`/`lib`. Quando `data`
 * importava de `licoes` (e `licoes` de `data`), o build avisava de chunk
 * circular e o conteúdo estático deixava de ser "puro".
 */

const SRC = join(__dirname);

function arquivos(pasta: string): string[] {
  return readdirSync(pasta).flatMap((nome) => {
    const caminho = join(pasta, nome);
    if (statSync(caminho).isDirectory()) return arquivos(caminho);
    return /\.tsx?$/.test(nome) && !/\.test\./.test(nome) ? [caminho] : [];
  });
}

/** Pastas de `src/` que cada arquivo da pasta importa (por caminho relativo). */
function importacoesProibidas(pasta: string, proibidas: string[]): string[] {
  const achados: string[] = [];
  for (const arquivo of arquivos(join(SRC, pasta))) {
    const fonte = readFileSync(arquivo, 'utf8');
    // `import type` não conta: some na compilação, não cria dependência em runtime.
    for (const [, alvo] of fonte.matchAll(/^import\s+(?!type\b)[^;]*?from\s+'(\.[^']+)'/gm)) {
      const destino = relative(SRC, join(arquivo, '..', alvo)).split(/[\\/]/)[0];
      if (proibidas.includes(destino)) achados.push(`${relative(SRC, arquivo)} → ${alvo}`);
    }
  }
  return achados;
}

describe('direção das dependências', () => {
  it('src/data (conteúdo estático) não importa de features, routes, licoes, components nem do banco', () => {
    expect(importacoesProibidas('data', ['features', 'routes', 'licoes', 'components', 'db'])).toEqual([]);
  });

  it('src/lib (utilitários genéricos) não importa de features, routes, licoes nem data', () => {
    expect(importacoesProibidas('lib', ['features', 'routes', 'licoes', 'data'])).toEqual([]);
  });

  it('src/db não importa de routes, components nem licoes', () => {
    expect(importacoesProibidas('db', ['routes', 'components', 'licoes'])).toEqual([]);
  });

  it('src/features não importa de routes', () => {
    expect(importacoesProibidas('features', ['routes'])).toEqual([]);
  });
});
