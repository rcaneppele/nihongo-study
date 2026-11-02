import { describe, expect, it } from 'vitest';
import { LEITURA_TEXTOS } from './textos';

const KANJI = /[一-龯々]/u;

describe('textos de leitura', () => {
  it('ids únicos e toda linha com tradução', () => {
    const ids = LEITURA_TEXTOS.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const t of LEITURA_TEXTOS) {
      for (const line of t.lines) expect(line.translation.trim(), t.id).not.toBe('');
    }
  });

  it('palavra com kanji tem furigana; níveis 0 e 1 não têm kanji', () => {
    for (const t of LEITURA_TEXTOS) {
      for (const w of t.lines.flatMap((l) => l.words)) {
        if (!KANJI.test(w.text)) continue;
        expect(t.level, `${t.id}: ${w.text}`).toBeGreaterThanOrEqual(2);
        expect(w.reading, `${t.id}: ${w.text}`).toBeTruthy();
        expect(KANJI.test(w.reading ?? ''), `${t.id}: ${w.reading}`).toBe(false);
      }
    }
  });

  it('forma de dicionário com kanji tem leitura', () => {
    for (const t of LEITURA_TEXTOS) {
      for (const w of t.lines.flatMap((l) => l.words)) {
        if (w.lemma && KANJI.test(w.lemma)) expect(w.lemmaReading, `${t.id}: ${w.lemma}`).toBeTruthy();
      }
    }
  });
});
