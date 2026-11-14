import { describe, expect, it } from 'vitest';
import { palavra, plural } from './plural';

describe('plural', () => {
  it('1 fica no singular; 0 e os demais, no plural', () => {
    expect(plural(1, 'card', 'cards')).toBe('1 card');
    expect(plural(0, 'card', 'cards')).toBe('0 cards');
    expect(plural(2, 'item', 'itens')).toBe('2 itens');
  });

  it('`palavra` devolve só a palavra, pra quando o número é mostrado à parte', () => {
    expect(palavra(1, 'vez', 'vezes')).toBe('vez');
    expect(palavra(5, 'vez', 'vezes')).toBe('vezes');
  });
});
