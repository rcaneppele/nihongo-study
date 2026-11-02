import { describe, expect, it } from 'vitest';
import { parseAnkiText, parseCardsCsv, parseCardsFile, parseCardsJson, parseCsvRows } from './importCards';

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

describe('parseCardsJson', () => {
  it('array de cards parciais; sempre gera id novo', () => {
    const [c] = parseCardsJson('[{"id":"x","front":"犬","back":"cachorro","tags":["a"]}]');
    expect(c).toMatchObject({ front: '犬', back: 'cachorro', tags: ['a'] });
    expect(c.id).not.toBe('x');
    expect(() => parseCardsJson('{"front":"x"}')).toThrow('JSON de cards deve ser um array.');
  });
});

describe('parseAnkiText', () => {
  it('"Notas em Texto Simples" com cabeçalho, HTML, som e colunas de tipo/deck/tags', () => {
    const texto = [
      '#separator:tab',
      '#html:true',
      '#notetype column:1',
      '#deck column:2',
      '#tags column:6',
      'Basic\tJaponês\t<b>猫</b>[sound:neko.mp3]\tgato&nbsp;doméstico\tねこ\tanimal n5',
    ].join('\n');
    expect(parseAnkiText(texto)).toMatchObject([{ front: '猫', back: 'gato doméstico', reading: 'ねこ', tags: ['animal', 'n5'] }]);
  });

  it('"Cartões em Texto Simples" sem cabeçalho (só pergunta e resposta)', () => {
    expect(parseAnkiText('犬\tcachorro\n\n鳥\tpássaro')).toMatchObject([
      { front: '犬', back: 'cachorro' },
      { front: '鳥', back: 'pássaro' },
    ]);
  });

  it('colunas nomeadas em #columns', () => {
    const texto = '#separator:comma\n#columns:Leitura,Frente,Verso\nねこ,猫,gato';
    expect(parseAnkiText(texto)).toMatchObject([{ front: '猫', back: 'gato', reading: 'ねこ' }]);
  });
});

describe('parseCardsFile', () => {
  it('escolhe o formato pelo nome e pelo conteúdo', () => {
    expect(parseCardsFile('[{"front":"a","back":"b"}]', 'cards.JSON')[0].front).toBe('a');
    expect(parseCardsFile('#separator:tab\na\tb', 'x.txt')[0].back).toBe('b');
    expect(parseCardsFile('a\tb', 'x.txt')[0].back).toBe('b');
    expect(parseCardsFile('front,back\na,"b, c"', 'x.csv')[0].back).toBe('b, c');
  });
});
