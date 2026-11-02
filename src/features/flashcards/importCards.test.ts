import { beforeEach, describe, expect, it } from 'vitest';
import { db } from '../../db/schema';
import { limparBanco } from '../../test/banco';
import {
  importarArquivoDeCards,
  parseAnkiText,
  parseCardsCsv,
  parseCardsFile,
  parseCardsJson,
  parseCsvRows,
} from './importCards';

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

describe('CSV: linhas, cabeçalho e espaços', () => {
  it('linha só com espaços e vírgulas é descartada; linha com um campo vazio, não', () => {
    expect(parseCsvRows('a,b\n  ,  \nc,')).toEqual([
      ['a', 'b'],
      ['c', ''],
    ]);
  });

  it('sem cabeçalho, a primeira linha já é um card', () => {
    expect(parseCardsCsv('猫,gato\n犬,cachorro').map((c) => c.front)).toEqual(['猫', '犬']);
  });

  it('cabeçalho só quando tem "front" e "back"; uma palavra parecida na primeira linha não some', () => {
    expect(parseCardsCsv('frontal,de frente\n猫,gato').map((c) => c.front)).toEqual(['frontal', '猫']);
  });

  it('apara espaços das colunas e das tags; tag vazia é ignorada', () => {
    const [c] = parseCardsCsv('  猫 , gato ,  ねこ , Animais ,  n5 ; ;animal ');
    expect(c).toMatchObject({ front: '猫', back: 'gato', reading: 'ねこ', category: 'Animais', tags: ['n5', 'animal'] });
  });

  it('arquivo vazio: nenhum card', () => {
    expect(parseCardsCsv('')).toEqual([]);
    expect(parseCardsCsv('\n\n')).toEqual([]);
  });

  it('JSON: campos ausentes viram vazios', () => {
    expect(parseCardsJson('[{"front":"犬"}]')[0]).toMatchObject({ front: '犬', back: '', tags: [] });
  });
});

describe('Anki: cabeçalho, HTML e colunas', () => {
  it('cabeçalho com espaços e maiúsculas; separador pelo nome', () => {
    expect(parseAnkiText('# Separator : Semicolon\n# HTML : true\n猫;<i>gato</i>')).toMatchObject([{ front: '猫', back: 'gato' }]);
  });

  it('com cabeçalho, o separador declarado vale mesmo se a linha tiver vírgula ou tab', () => {
    expect(parseAnkiText('#separator:pipe\n猫, gato|cat\tgato')).toMatchObject([{ front: '猫, gato', back: 'cat\tgato' }]);
  });

  it('sem #html:true, o texto fica como está (só som e entidades são limpos)', () => {
    const [c] = parseAnkiText('#separator:tab\na<b>b\tc &amp; d &lt;e&gt; &quot;f&quot; &#39;g&#39;[sound:x.mp3]');
    expect(c).toMatchObject({ front: 'a<b>b', back: `c & d <e> "f" 'g'` });
  });

  it('com #html:true, <br> (em qualquer forma) vira quebra de linha e as outras tags somem', () => {
    const [c] = parseAnkiText('#html:true\n<div>um<br>dois<br/>três<BR />quatro</div>\tok');
    expect(c.front).toBe('um\ndois\ntrês\nquatro');
  });

  it('coluna de guid é ignorada; colunas nomeadas que não batem caem na ordem das colunas', () => {
    const texto = '#separator:tab\n#guid column:1\n#columns:Id\tX\tY\tZ\nabc123\t猫\tgato\tねこ';
    expect(parseAnkiText(texto)).toMatchObject([{ front: '猫', back: 'gato', reading: 'ねこ' }]);
  });

  it('tags separadas por vários espaços; sem coluna de leitura, sem leitura', () => {
    const [c] = parseAnkiText('#separator:tab\n#tags column:3\n猫\tgato\t  animal   n5 ');
    expect(c).toMatchObject({ front: '猫', back: 'gato', reading: undefined, tags: ['animal', 'n5'] });
  });

  it('linhas em branco no meio são ignoradas; linha sem frente nem verso também, mas só com verso fica', () => {
    const cards = parseAnkiText('#separator:tab\n猫\tgato\n   \n\t\n\tsó verso');
    expect(cards.map((c) => [c.front, c.back])).toEqual([
      ['猫', 'gato'],
      ['', 'só verso'],
    ]);
  });

  it('só cabeçalho, sem linhas: nenhum card', () => {
    expect(parseAnkiText('#separator:tab\n#html:false\n')).toEqual([]);
  });

  it('sem cabeçalho: tab tem preferência; senão, vírgula', () => {
    expect(parseAnkiText('猫,x\tgato')).toMatchObject([{ front: '猫,x', back: 'gato' }]);
    expect(parseAnkiText('猫,gato')).toMatchObject([{ front: '猫', back: 'gato' }]);
  });

  it('reconhece o export do Anki pela primeira linha não vazia, com quebra de linha do Windows', () => {
    expect(parseCardsFile('\r\n\r\n#deck column:1\r\nDeck\t猫\tgato', 'x.txt')).toMatchObject([{ front: '猫', back: 'gato' }]);
    expect(parseCardsFile('\n#tags column:3\n猫\tgato\tn5', 'x.txt')[0].tags).toEqual(['n5']);
  });

  it('CSV comum não é confundido com Anki', () => {
    expect(parseCardsFile('#1,primeiro', 'x.csv')).toMatchObject([{ front: '#1', back: 'primeiro' }]);
  });
});

describe('importarArquivoDeCards', () => {
  beforeEach(limparBanco);

  it('cria os cards do arquivo e devolve quantos', async () => {
    expect(await importarArquivoDeCards('猫,gato\n犬,cachorro', 'cards.csv')).toBe(2);
    expect((await db.cards.toArray()).map((c) => c.front).sort()).toEqual(['犬', '猫']);
  });

  it('arquivo sem nenhum card: erro, e nada é gravado', async () => {
    await expect(importarArquivoDeCards('\n', 'vazio.csv')).rejects.toThrow('Nenhum card encontrado no arquivo.');
    expect(await db.cards.count()).toBe(0);
  });
});
