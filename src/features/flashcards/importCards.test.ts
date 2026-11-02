import { describe, expect, it } from 'vitest';
import { parseCardsCsv, parseCsvRows } from './importCards';

describe('parseCsvRows', () => {
  it('separa por vírgula e ignora linhas em branco', () => {
    expect(parseCsvRows('a,b\r\n\r\nc,d\n')).toEqual([
      ['a', 'b'],
      ['c', 'd'],
    ]);
  });

  it('aceita vírgula, quebra de linha e aspas escapadas dentro de aspas', () => {
    expect(parseCsvRows('"comer, beber","linha 1\nlinha 2","diz ""oi"""')).toEqual([
      ['comer, beber', 'linha 1\nlinha 2', 'diz "oi"'],
    ]);
  });
});

describe('parseCardsCsv', () => {
  it('lê cabeçalho, colunas opcionais e tags', () => {
    const cards = parseCardsCsv('front,back,reading,category,tags\n食べる,"comer, alimentar-se",たべる,Verbos,n5; verbo\n猫,gato');
    expect(cards).toHaveLength(2);
    expect(cards[0]).toMatchObject({
      front: '食べる',
      back: 'comer, alimentar-se',
      reading: 'たべる',
      category: 'Verbos',
      tags: ['n5', 'verbo'],
    });
    expect(cards[1]).toMatchObject({ front: '猫', back: 'gato', reading: undefined, tags: [] });
  });
});
