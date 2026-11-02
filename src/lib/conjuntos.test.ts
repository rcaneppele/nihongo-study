import { describe, expect, it } from 'vitest';
import { alternar, definirVarios } from './conjuntos';

describe('alternar', () => {
  it('inclui o que não estava e tira o que estava, sem mexer no original', () => {
    const original = new Set(['a']);
    expect([...alternar(original, 'b')]).toEqual(['a', 'b']);
    expect([...alternar(original, 'a')]).toEqual([]);
    expect([...original]).toEqual(['a']);
  });

  it('alternar duas vezes volta ao começo', () => {
    const s = new Set([1, 2]);
    expect(alternar(alternar(s, 3), 3)).toEqual(s);
  });
});

describe('definirVarios', () => {
  it('liga e desliga vários de uma vez', () => {
    expect(definirVarios(new Set(['a']), ['b', 'c'], true)).toEqual(new Set(['a', 'b', 'c']));
    expect(definirVarios(new Set(['a', 'b']), ['b', 'x'], false)).toEqual(new Set(['a']));
  });
});
