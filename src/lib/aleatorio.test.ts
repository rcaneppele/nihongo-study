import { describe, expect, it } from 'vitest';
import fc from 'fast-check';
import { comSemente, embaralhar, sortear, sortearUm } from './aleatorio';

describe('embaralhar', () => {
  it('devolve os mesmos itens, sem mexer na lista original', () => {
    fc.assert(
      fc.property(fc.array(fc.integer()), fc.integer(), (lista, semente) => {
        const copia = [...lista];
        const resultado = embaralhar(lista, comSemente(semente));
        expect(lista).toEqual(copia);
        expect([...resultado].sort()).toEqual([...lista].sort());
      })
    );
  });

  it('com a mesma semente, o mesmo resultado', () => {
    const lista = Array.from({ length: 20 }, (_, i) => i);
    expect(embaralhar(lista, comSemente(42))).toEqual(embaralhar(lista, comSemente(42)));
    expect(embaralhar(lista, comSemente(42))).not.toEqual(embaralhar(lista, comSemente(7)));
  });

  it('não é enviesado: cada posição recebe cada item com frequência parecida', () => {
    const rng = comSemente(1);
    const contagem = [0, 0, 0];
    for (let i = 0; i < 6000; i++) contagem[embaralhar([0, 1, 2], rng)[0]]++;
    for (const c of contagem) expect(c).toBeGreaterThan(1800);
  });
});

describe('sortear', () => {
  it('até n itens distintos', () => {
    fc.assert(
      fc.property(fc.uniqueArray(fc.integer()), fc.integer({ min: -2, max: 30 }), (lista, n) => {
        const r = sortear(lista, n, comSemente(n));
        expect(r.length).toBe(Math.max(0, Math.min(n, lista.length)));
        expect(new Set(r).size).toBe(r.length);
        for (const x of r) expect(lista).toContain(x);
      })
    );
  });

  it('sortearUm de lista vazia é undefined', () => {
    expect(sortearUm([])).toBeUndefined();
    expect(sortearUm(['a'])).toBe('a');
  });
});

describe('comSemente', () => {
  it('gera números em [0, 1)', () => {
    const rng = comSemente(123);
    for (let i = 0; i < 1000; i++) {
      const x = rng();
      expect(x).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThan(1);
    }
  });
});
