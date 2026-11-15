import { describe, expect, it } from 'vitest';
import { emDestaque, formasDaPalavra } from './formas';

describe('formasDaPalavra', () => {
  it('frente com kanji e leitura em kana (deck N5, palavra salva da leitura): kana, kanji e romaji gerado', () => {
    expect(formasDaPalavra({ front: '橋', reading: 'はし' })).toEqual({ kana: 'はし', kanji: '橋', romaji: 'hashi' });
    expect(formasDaPalavra({ front: '大きい', reading: 'おおきい' })).toEqual({ kana: 'おおきい', kanji: '大きい', romaji: 'ookii' });
  });

  it('frente em kana com leitura em romaji: usa o romaji do card; o kanji vem do deck, se a palavra tem', () => {
    expect(formasDaPalavra({ front: 'たべる', reading: 'taberu' })).toEqual({ kana: 'たべる', kanji: '食べる', romaji: 'taberu' });
    expect(formasDaPalavra({ front: 'パン', reading: 'pan' })).toEqual({ kana: 'パン', kanji: undefined, romaji: 'pan' });
  });

  it('entrada do deck com o kanji de referência explícito', () => {
    expect(formasDaPalavra({ front: 'あう', reading: 'au', kanji: '会う' }).kanji).toBe('会う');
  });

  it('frente em kana sem leitura (card do usuário): o romaji é gerado', () => {
    expect(formasDaPalavra({ front: 'ねこ' })).toEqual({ kana: 'ねこ', kanji: undefined, romaji: 'neko' });
    expect(formasDaPalavra({ front: 'ねこ', reading: 'ねこ' }).romaji).toBe('neko');
  });

  it('sufixos do deck (～) contam como kana', () => {
    expect(formasDaPalavra({ front: '～さん', reading: '～san' })).toMatchObject({ kana: '～さん', romaji: '～san' });
    expect(formasDaPalavra({ front: '～回', reading: '～かい' })).toEqual({ kana: '～かい', kanji: '～回', romaji: '～kai' });
  });

  it('frente com kanji sem leitura em kana (card feito à mão): só o kanji, com o que houver de leitura', () => {
    expect(formasDaPalavra({ front: '猫' })).toEqual({ kanji: '猫', romaji: undefined });
    expect(formasDaPalavra({ front: '猫', reading: 'neko' })).toEqual({ kanji: '猫', romaji: 'neko' });
  });

  it('frente que não é só japonês (frase com latim) fica como está', () => {
    expect(formasDaPalavra({ front: 'Tシャツ', reading: 'tiishatsu' })).toEqual({ kana: 'Tシャツ', romaji: 'tiishatsu' });
  });
});

describe('emDestaque', () => {
  const formas = { kana: 'はし', kanji: '橋', romaji: 'hashi' };

  it('kana em destaque (padrão): o kanji é só apoio', () => {
    expect(emDestaque(formas, 'kana')).toEqual({ principal: 'はし', apoio: '橋' });
  });

  it('kanji em destaque: o kana vira o apoio', () => {
    expect(emDestaque(formas, 'kanji')).toEqual({ principal: '橋', apoio: 'はし' });
  });

  it('palavra com uma forma só: é ela, sem apoio, nas duas preferências', () => {
    expect(emDestaque({ kana: 'パン' }, 'kanji')).toEqual({ principal: 'パン', apoio: undefined });
    expect(emDestaque({ kanji: '猫' }, 'kana')).toEqual({ principal: '猫', apoio: undefined });
  });
});
