import { describe, expect, it } from 'vitest';
import { kanaParaRomaji, soKana } from './romaji';

describe('kanaParaRomaji', () => {
  it.each([
    ['ねこ', 'neko'],
    ['しゃしん', 'shashin'],
    ['ちょっと', 'chotto'],
    ['じゅう', 'juu'],
    ['きょう', 'kyou'],
    ['りょこう', 'ryokou'],
    ['ぎゅうにゅう', 'gyuunyuu'],
    ['つづく', 'tsuzuku'],
    ['はなぢ', 'hanaji'],
  ])('hiragana: %s → %s', (kana, romaji) => {
    expect(kanaParaRomaji(kana)).toBe(romaji);
  });

  it('vogal longa por extenso, sem mácron — como nas lições', () => {
    expect(kanaParaRomaji('どうぞ')).toBe('douzo');
    expect(kanaParaRomaji('いもうと')).toBe('imouto');
    expect(kanaParaRomaji('おじいさん')).toBe('ojiisan');
    expect(kanaParaRomaji('せんせい')).toBe('sensei');
  });

  it('`ー` do katakana repete a vogal', () => {
    expect(kanaParaRomaji('コーヒー')).toBe('koohii');
    expect(kanaParaRomaji('ラーメン')).toBe('raamen');
    expect(kanaParaRomaji('ニュース')).toBe('nyuusu');
  });

  it('`っ` dobra a consoante seguinte (inclusive antes de "ch")', () => {
    expect(kanaParaRomaji('きって')).toBe('kitte');
    expect(kanaParaRomaji('がっこう')).toBe('gakkou');
    expect(kanaParaRomaji('あっち')).toBe('acchi');
    expect(kanaParaRomaji('ベッド')).toBe('beddo');
    expect(kanaParaRomaji('ざっし')).toBe('zasshi');
  });

  it('`ん` antes de vogal ganha apóstrofo, pra não virar な/に/ぬ/ね/の', () => {
    expect(kanaParaRomaji('きんえん')).toBe("kin'en");
    expect(kanaParaRomaji('たんい')).toBe("tan'i");
    expect(kanaParaRomaji('こんや')).toBe('konya');
    expect(kanaParaRomaji('ほん')).toBe('hon');
    expect(kanaParaRomaji('さんぽ')).toBe('sanpo');
  });

  it('sons dos empréstimos (kana + vogal pequena)', () => {
    expect(kanaParaRomaji('フォーク')).toBe('fooku');
    expect(kanaParaRomaji('パーティー')).toBe('paatii');
    expect(kanaParaRomaji('ファイル')).toBe('fairu');
    expect(kanaParaRomaji('チェック')).toBe('chekku');
    expect(kanaParaRomaji('ウィーン')).toBe('wiin');
  });

  it('o que não é kana passa direto', () => {
    expect(kanaParaRomaji('～さん')).toBe('～san');
    expect(kanaParaRomaji('コピー する')).toBe('kopii suru');
    expect(kanaParaRomaji('')).toBe('');
  });

  it('`っ` no fim da palavra some; `ー` sem vogal antes também', () => {
    expect(kanaParaRomaji('あっ')).toBe('a');
    expect(kanaParaRomaji('ー')).toBe('');
  });
});

describe('soKana', () => {
  it('hiragana, katakana e `ー` contam; kanji, latim e vazio não', () => {
    expect(soKana('ねこ')).toBe(true);
    expect(soKana('コーヒー')).toBe(true);
    expect(soKana('食べる')).toBe(false);
    expect(soKana('neko')).toBe(false);
    expect(soKana('')).toBe(false);
  });
});
