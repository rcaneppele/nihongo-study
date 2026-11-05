import { describe, expect, it } from 'vitest';
import { estaNoEnderecoAntigo } from './mudancaEndereco';

describe('estaNoEnderecoAntigo', () => {
  it('só o endereço do GitHub Pages é o antigo', () => {
    expect(estaNoEnderecoAntigo('rcaneppele.github.io')).toBe(true);
  });

  it.each(['nihongostudy.app', 'www.nihongostudy.app', 'nihongo-study-bk5.pages.dev', 'localhost', 'outro.github.io'])(
    '%s não é',
    (host) => {
      expect(estaNoEnderecoAntigo(host)).toBe(false);
    }
  );
});
