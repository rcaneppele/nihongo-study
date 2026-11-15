import { describe, expect, it } from 'vitest';
import { matchPath } from 'react-router-dom';
import { KANJI_N5, getNextNewKanji } from './kanji';
import { leituraEmKana, N5_DECK, N5_CATEGORY_ORDER, n5CategoryCounts, n5Homonimos, n5Kanji, n5PorLeitura } from './seed/n5';
import { ALL_KANA, HIRAGANA_KANA, KANA_FAMILIES, KATAKANA_KANA, getConfusables } from './kana';
import { PROMPTS_DIARIO } from './diario/prompts';
import { LICOES } from '../licoes';
import { ATIVIDADES_APRENDER, ATIVIDADES_REVISAR, LISTA_HABILIDADES, SECOES, secaoDaRota } from '../features/metodo/estrutura';
import { ROTAS } from '../rotas';

/** Integridade dos dados estáticos do app (camada 3 de docs/estrategia-testes.md). */

const KANJI = /[一-龯々]/u;
const SO_KANA = /^[\u3040-\u30ffー・、。！？ \u3000]+$/u;

describe('kanji N5', () => {
  it('caractere e ordem pedagógica únicos, ordem contínua a partir de 1', () => {
    expect(new Set(KANJI_N5.map((k) => k.char)).size).toBe(KANJI_N5.length);
    const ordens = KANJI_N5.map((k) => k.order).sort((a, b) => a - b);
    expect(ordens).toEqual(Array.from({ length: KANJI_N5.length }, (_, i) => i + 1));
  });

  it.each(KANJI_N5.map((k) => [k.char, k] as const))('%s: dados completos', (_, k) => {
    expect(k.meaning.trim()).not.toBe('');
    expect(k.mnemonic.trim()).not.toBe('');
    expect(k.onyomi.length + k.kunyomi.length).toBeGreaterThan(0);
    expect(k.radicals.length).toBeGreaterThan(0);
    expect(k.strokeCount).toBeGreaterThan(0);
    expect(k.examples.length).toBeGreaterThan(0);
    for (const r of [...k.onyomi, ...k.kunyomi]) {
      expect(r.kana).toMatch(SO_KANA);
      expect(r.romaji).toMatch(/^[a-z.\-' ]+$/);
    }
    for (const e of k.examples) {
      expect(e.word, 'exemplo usa o próprio kanji').toContain(k.char);
      expect(KANJI.test(e.reading), `leitura de ${e.word}`).toBe(false);
      expect(e.meaning.trim()).not.toBe('');
    }
  });

  it('getNextNewKanji segue a ordem e pula os iniciados', () => {
    const primeiros = getNextNewKanji(new Set(), 3);
    expect(primeiros.map((k) => k.order)).toEqual([1, 2, 3]);
    expect(getNextNewKanji(new Set([primeiros[0].char]), 1)[0].order).toBe(2);
  });
});

describe('deck N5', () => {
  it('frentes únicas, com leitura, significado e categoria conhecida', () => {
    expect(new Set(N5_DECK.map((e) => e.front)).size).toBe(N5_DECK.length);
    for (const e of N5_DECK) {
      expect(e.back.trim(), e.front).not.toBe('');
      expect(e.reading.trim(), e.front).not.toBe('');
      expect(N5_CATEGORY_ORDER, `${e.front}: ${e.category}`).toContain(e.category);
    }
  });

  const soKanaDoDeck = (t: string) => /^[\u3041-\u3096\u30a1-\u30fa\u30fc～]+$/.test(t);

  it('palavra com kanji na frente tem a leitura inteira em kana (é o que o app mostra em destaque)', () => {
    for (const e of N5_DECK.filter((x) => KANJI.test(x.front))) {
      expect(soKanaDoDeck(e.reading), `${e.front}: ${e.reading}`).toBe(true);
      expect(e.kanji, e.front).toBeUndefined();
    }
  });

  it('palavra em kana tem a leitura em romaji; o kanji de referência, quando há, tem kanji e não repete outra entrada', () => {
    const frentes = new Set(N5_DECK.map((e) => e.front));
    for (const e of N5_DECK.filter((x) => !KANJI.test(x.front))) {
      expect(/^[a-z～' ]+$/.test(e.reading), `${e.front}: ${e.reading}`).toBe(true);
      if (e.kanji === undefined) continue;
      expect(KANJI.test(e.kanji), `${e.front}: ${e.kanji}`).toBe(true);
      expect(frentes.has(e.kanji), `${e.kanji} é entrada própria e referência de ${e.front}`).toBe(false);
    }
  });

  it('o deck tem o vocabulário N5 inteiro, não só as palavras em kana', () => {
    expect(N5_DECK.length).toBeGreaterThan(700);
    for (const palavra of ['一', '月曜日', '大きい', '食べ物', '学校', '水']) {
      expect(N5_DECK.some((e) => e.front === palavra), palavra).toBe(true);
    }
  });

  it('homônimos são entradas separadas, cada uma com seu kanji', () => {
    expect(n5Homonimos('橋').map((e) => e.front)).toEqual(['箸']);
    expect(n5Homonimos('暑い').map((e) => e.front).sort()).toEqual(['厚い', '熱い'].sort());
    expect(n5Homonimos('猫')).toEqual([]);
    expect(n5Homonimos('não-é-do-deck')).toEqual([]);
    expect(n5PorLeitura('ねこ')?.front).toBe('猫');
    expect(n5PorLeitura('はし')).toBeUndefined();
    expect(n5Kanji('たべる')).toBe('食べる');
    expect(n5Kanji('パン')).toBeUndefined();
    expect(leituraEmKana({ front: '橋', reading: 'はし' })).toBe('はし');
    expect(leituraEmKana({ front: 'パン', reading: 'pan' })).toBe('パン');
  });

  it('contagem por categoria soma o deck', () => {
    expect(n5CategoryCounts().reduce((s, c) => s + c.count, 0)).toBe(N5_DECK.length);
  });
});

describe('kana', () => {
  it('46 básicos + dakuten/handakuten + yōon em cada escrita, sem repetição', () => {
    expect(HIRAGANA_KANA.length).toBe(KATAKANA_KANA.length);
    expect(new Set(ALL_KANA.map((k) => k.char)).size).toBe(ALL_KANA.length);
    expect(HIRAGANA_KANA.length).toBeGreaterThanOrEqual(46 + 25 + 33);
  });

  it('romaji único dentro de cada escrita, fora os homófonos じ/ぢ e ず/づ (a múltipla escolha não põe os dois juntos)', () => {
    for (const lista of [HIRAGANA_KANA, KATAKANA_KANA]) {
      const romaji = lista.map((k) => k.romaji);
      expect(romaji.filter((r, i) => romaji.indexOf(r) !== i).sort()).toEqual(['ji', 'zu']);
    }
  });

  it('toda família tem kana nas duas escritas', () => {
    for (const f of KANA_FAMILIES) {
      expect(HIRAGANA_KANA.some((k) => k.row === f.key), f.key).toBe(true);
      expect(KATAKANA_KANA.some((k) => k.row === f.key), f.key).toBe(true);
    }
  });

  it('confundíveis existem e são da mesma escrita', () => {
    for (const k of ALL_KANA) {
      const lista = k.type === 'hiragana' ? HIRAGANA_KANA : KATAKANA_KANA;
      for (const c of getConfusables(k.type, k.char)) expect(lista.some((x) => x.char === c), `${k.char} ~ ${c}`).toBe(true);
    }
  });
});

describe('diário guiado', () => {
  it('ids únicos, lição existente, exemplos só em kana com romaji, checklist', () => {
    expect(new Set(PROMPTS_DIARIO.map((p) => p.id)).size).toBe(PROMPTS_DIARIO.length);
    for (const p of PROMPTS_DIARIO) {
      expect(LICOES.some((l) => l.meta.id === p.licaoId), p.id).toBe(true);
      expect(p.instrucao.trim(), p.id).not.toBe('');
      expect(p.checklist.length, p.id).toBeGreaterThan(0);
      for (const e of p.exemplo) {
        expect(KANJI.test(e.jp), `${p.id}: ${e.jp}`).toBe(false);
        expect(e.romaji.trim(), p.id).not.toBe('');
        expect(e.pt.trim(), p.id).not.toBe('');
      }
    }
  });
});

describe('estrutura do método e rotas', () => {
  const existe = (to: string) => {
    const caminho = to.split('?')[0];
    return ROTAS.some((r) => matchPath(r.path, caminho));
  };
  const links = [
    ...SECOES.flatMap((s) => [s.to, ...(s.filhos ?? []).map((f) => f.to)]),
    ...ATIVIDADES_APRENDER.map((a) => a.to),
    ...ATIVIDADES_REVISAR.map((a) => a.to),
    ...LISTA_HABILIDADES.flatMap((h) => h.atividades.map((a) => a.to)),
    ...LICOES.map((l) => `/licoes/${l.meta.id}`),
  ];

  it('todo link da navegação e dos hubs cai numa rota que existe', () => {
    expect(links.filter((to) => !existe(to))).toEqual([]);
  });

  it('todo link (menos Configurações) pertence a uma seção do método', () => {
    for (const to of links) {
      const [p, q = ''] = to.split('?');
      expect(secaoDaRota(p, q ? `?${q}` : ''), to).not.toBeNull();
    }
    expect(secaoDaRota('/config')).toBeNull();
  });

  it.each([
    ['/', '', 'hoje'],
    ['/leitura/abc', '', 'praticar'],
    ['/kana', '?modo=desenho', 'praticar'],
    ['/kana', '', 'aprender'],
    ['/kanji', '?modo=caligrafia', 'praticar'],
    ['/flashcards', '?praticar=producao', 'praticar'],
    ['/flashcards', '', 'revisar'],
    ['/licoes/quiz', '', 'revisar'],
    ['/licoes/diga', '', 'praticar'],
    ['/licoes/desu', '', 'aprender'],
    ['/progresso/', '', 'progresso'],
  ])('secaoDaRota(%s%s) = %s', (p, q, secao) => {
    expect(secaoDaRota(p, q)).toBe(secao);
  });
});
