import { describe, expect, it } from 'vitest';
import fc from 'fast-check';
import { ALL_KANA, getConfusables, getKana, getKanaByFamilies, HIRAGANA_KANA, type KanaEntry } from '../../data/kana';
import { comSemente } from '../../lib/aleatorio';
import {
  arrangeNoAdjacent,
  attemptsFor,
  buildChoiceOptions,
  buildWeightedPool,
  CHOICE_COUNT,
  completarFracos,
  errorRateFor,
  kanaFracos,
  MAX_EXTRA_REPS,
  MIN_WEAK_POOL,
  montarSessao,
  romajiAceitos,
  romajiCorreto,
  WEAK_POOL_CAP,
} from './treino';
import { umKanaProgress } from '../../test/fabricas';

const [a, i, u] = HIRAGANA_KANA;

describe('errorRateFor / attemptsFor', () => {
  it('por modo: romaji, múltipla escolha e desenho', () => {
    const p = umKanaProgress('あ', { romajiCorrect: 3, romajiWrong: 1, choiceCorrect: 1, choiceWrong: 1, drawBest: 70 });
    expect(errorRateFor(p, 'romaji')).toBe(0.25);
    expect(errorRateFor(p, 'escolha')).toBe(0.5);
    expect(errorRateFor(p, 'desenho')).toBeCloseTo(0.3);
    expect(attemptsFor(p, 'romaji')).toBe(4);
    expect(attemptsFor(p, 'escolha')).toBe(2);
    expect(attemptsFor(p, 'desenho')).toBe(1);
  });

  it('sem histórico: zero', () => {
    expect(errorRateFor(undefined, 'romaji')).toBe(0);
    expect(errorRateFor(umKanaProgress('あ'), 'romaji')).toBe(0);
    expect(errorRateFor(umKanaProgress('あ'), 'desenho')).toBe(0);
    expect(errorRateFor(umKanaProgress('あ'), 'escolha')).toBe(0);
    expect(attemptsFor(umKanaProgress('あ'), 'desenho')).toBe(0);
  });
});

describe('buildWeightedPool', () => {
  it(`kana que mais erra entra até ${MAX_EXTRA_REPS} vezes a mais`, () => {
    const pool = buildWeightedPool([a, i, u], [umKanaProgress('あ', { romajiWrong: 5 }), umKanaProgress('い', { romajiCorrect: 1, romajiWrong: 1 }), undefined], 'romaji');
    expect(pool.filter((k) => k === a)).toHaveLength(1 + MAX_EXTRA_REPS);
    expect(pool.filter((k) => k === i)).toHaveLength(1 + Math.round(0.5 * MAX_EXTRA_REPS));
    expect(pool.filter((k) => k === u)).toHaveLength(1);
    expect(pool).toHaveLength(3 + MAX_EXTRA_REPS + Math.round(0.5 * MAX_EXTRA_REPS));
  });
});

describe('montarSessao', () => {
  const progresso = [umKanaProgress('あ', { romajiWrong: 5 }), undefined, undefined];

  it('ponderada: o kana que mais erra aparece mais vezes, nunca lado a lado', () => {
    const sessao = montarSessao([a, i, u], progresso, 'romaji', true, comSemente(1));
    expect(contar(sessao)).toEqual({ あ: 1 + MAX_EXTRA_REPS, い: 1, う: 1 });
  });

  it('sem ponderar: cada kana uma vez', () => {
    const sessao = montarSessao([a, i, u], progresso, 'romaji', false, comSemente(1));
    expect(contar(sessao)).toEqual({ あ: 1, い: 1, う: 1 });
  });
});

describe('arrangeNoAdjacent', () => {
  const arbPool = fc.array(fc.record({ kana: fc.integer({ min: 0, max: 5 }), copias: fc.integer({ min: 1, max: 4 }) }), { maxLength: 6 }).map((spec) =>
    spec.flatMap(({ kana, copias }) => Array.from({ length: copias }, () => HIRAGANA_KANA[kana]))
  );

  it('mesmos itens, sem repetição lado a lado quando é possível evitar', () => {
    fc.assert(
      fc.property(arbPool, fc.integer(), (pool, semente) => {
        const r = arrangeNoAdjacent(pool, comSemente(semente));
        expect(r.map((k) => k.char).sort()).toEqual(pool.map((k) => k.char).sort());
        const maisFrequente = Math.max(0, ...Object.values(contar(pool)));
        const possivel = maisFrequente <= Math.ceil(pool.length / 2);
        if (possivel) for (let j = 1; j < r.length; j++) expect(r[j].char).not.toBe(r[j - 1].char);
      })
    );
  });
});

function contar(pool: KanaEntry[]): Record<string, number> {
  const c: Record<string, number> = {};
  for (const k of pool) c[k.char] = (c[k.char] ?? 0) + 1;
  return c;
}

describe('kanaFracos / completarFracos', () => {
  it(`só os que já errou, do pior pro melhor, até ${WEAK_POOL_CAP}`, () => {
    const entries = getKana('hiragana');
    const progress = entries.map((e, j) => umKanaProgress(e.char, { romajiCorrect: j % 4, romajiWrong: j % 3 }));
    const fracos = kanaFracos(entries, progress, 'romaji');
    expect(fracos.length).toBeLessThanOrEqual(WEAK_POOL_CAP);
    const taxas = fracos.map((k) => errorRateFor(progress[entries.indexOf(k)], 'romaji'));
    for (let j = 1; j < taxas.length; j++) expect(taxas[j]).toBeLessThanOrEqual(taxas[j - 1]);
    expect(taxas.every((t) => t > 0)).toBe(true);
  });

  it(`com poucos fracos, completa até ${MIN_WEAK_POOL} (praticados primeiro)`, () => {
    const entries = [a, i, u, ...HIRAGANA_KANA.slice(3, 10)];
    const progress = entries.map((e) => (e === a ? umKanaProgress('あ', { romajiWrong: 1 }) : e === u ? umKanaProgress('う', { romajiCorrect: 2 }) : undefined));
    const sessao = completarFracos([a], entries, progress, 'romaji', comSemente(1));
    expect(sessao).toHaveLength(MIN_WEAK_POOL);
    expect(sessao[0]).toBe(a);
    expect(sessao[1]).toBe(u);
    expect(new Set(sessao).size).toBe(MIN_WEAK_POOL);
  });

  it('sem fracos, não inventa sessão; com muitos, não completa', () => {
    expect(completarFracos([], HIRAGANA_KANA, [], 'romaji')).toEqual([]);
    const muitos = HIRAGANA_KANA.slice(0, 6);
    expect(completarFracos(muitos, HIRAGANA_KANA, [], 'romaji')).toBe(muitos);
    const noMinimo = HIRAGANA_KANA.slice(0, MIN_WEAK_POOL);
    expect(completarFracos(noMinimo, HIRAGANA_KANA, [], 'romaji')).toBe(noMinimo);
  });

  it('completando com poucos kana disponíveis, nenhum entra duas vezes', () => {
    const entries = [a, i, u];
    const progress = [umKanaProgress('あ', { romajiWrong: 1 }), umKanaProgress('い', { romajiCorrect: 1 }), umKanaProgress('う', { romajiCorrect: 1 })];
    const sessao = completarFracos([a], entries, progress, 'romaji', comSemente(1));
    expect(sessao.map((k) => k.char).sort()).toEqual(['あ', 'い', 'う']);
  });
});

describe('buildChoiceOptions', () => {
  it(`${CHOICE_COUNT} opções com o correto, sem romaji repetido, mesma escrita e mesmo grupo`, () => {
    for (const escrita of ['hiragana', 'katakana'] as const) {
      for (const k of getKana(escrita)) {
        const pool = getKanaByFamilies(escrita, [k.row]);
        const opcoes = buildChoiceOptions(k, pool, comSemente(k.char.charCodeAt(0)));
        expect(opcoes, k.char).toHaveLength(CHOICE_COUNT);
        expect(opcoes).toContain(k);
        expect(new Set(opcoes.map((o) => o.romaji)).size).toBe(CHOICE_COUNT);
        expect(opcoes.every((o) => o.type === k.type && o.group === k.group)).toBe(true);
      }
    }
  });
});

describe('buildChoiceOptions: de onde vêm as opções erradas', () => {
  const hira = (char: string) => HIRAGANA_KANA.find((k) => k.char === char)!;

  it('kana da outra escrita no pool não viram opção', () => {
    for (let semente = 0; semente < 20; semente++) {
      const opcoes = buildChoiceOptions(a, getKana('katakana'), comSemente(semente));
      expect(opcoes.every((o) => o.type === 'hiragana')).toBe(true);
    }
  });

  it('o som da resposta certa não se repete numa opção errada (じ e ぢ)', () => {
    for (let semente = 0; semente < 20; semente++) {
      const opcoes = buildChoiceOptions(hira('じ'), [hira('じ'), hira('ぢ')], comSemente(semente));
      expect(opcoes.map((o) => o.char)).not.toContain('ぢ');
    }
  });

  it('os kana parecidos com o certo entram primeiro', () => {
    const todos = getKana('hiragana');
    for (const k of todos) {
      const parecidos = getConfusables('hiragana', k.char).map(hira);
      const sons = new Set(parecidos.map((p) => p.romaji).filter((r) => r !== k.romaji));
      const esperados = Math.min(CHOICE_COUNT - 1, sons.size);
      const opcoes = buildChoiceOptions(k, todos, comSemente(k.char.charCodeAt(0)));
      expect(opcoes.filter((o) => o !== k && parecidos.includes(o)), k.char).toHaveLength(esperados);
    }
  });
});

describe('romajiCorreto', () => {
  const kana = (char: string) => ALL_KANA.find((k) => k.char === char)!;

  it('ignora maiúsculas e espaços nas pontas', () => {
    expect(romajiCorreto('  KA ', { ...a, romaji: 'ka' })).toBe(true);
    expect(romajiCorreto('ga', { ...a, romaji: 'ka' })).toBe(false);
  });

  it.each([
    ['し', ['shi', 'si']],
    ['ち', ['chi', 'ti']],
    ['つ', ['tsu', 'tu']],
    ['ふ', ['fu', 'hu']],
    ['じ', ['ji', 'zi']],
    ['ぢ', ['ji', 'zi', 'di']],
    ['づ', ['zu', 'du']],
    ['を', ['wo', 'o']],
    ['ん', ['n', 'nn']],
    ['しゃ', ['sha', 'sya']],
    ['しゅ', ['shu', 'syu']],
    ['しょ', ['sho', 'syo']],
    ['ちゃ', ['cha', 'tya']],
    ['ちゅ', ['chu', 'tyu']],
    ['ちょ', ['cho', 'tyo']],
    ['じゃ', ['ja', 'zya', 'jya']],
    ['じゅ', ['ju', 'zyu', 'jyu']],
    ['じょ', ['jo', 'zyo', 'jyo']],
    ['シ', ['shi', 'si']],
    ['ヂ', ['ji', 'zi', 'di']],
    ['ヅ', ['zu', 'du']],
  ])('%s aceita as romanizações de quem digita japonês: %j', (char, aceitas) => {
    for (const r of aceitas) expect(romajiCorreto(r, kana(char)), r).toBe(true);
    expect(romajiAceitos(kana(char))).toEqual(aceitas);
  });

  it('kana sem romanização alternativa só aceita a forma do app', () => {
    expect(romajiAceitos(kana('か'))).toEqual(['ka']);
    expect(romajiCorreto('', kana('か'))).toBe(false);
  });

  it('não confunde kana diferentes: a alternativa de um não vale para outro', () => {
    expect(romajiCorreto('si', kana('す'))).toBe(false);
    expect(romajiCorreto('tu', kana('と'))).toBe(false);
    expect(romajiCorreto('o', kana('わ'))).toBe(false);
    expect(romajiCorreto('di', kana('じ'))).toBe(false);
    expect(romajiCorreto('du', kana('ず'))).toBe(false);
    expect(romajiCorreto('hu', kana('ほ'))).toBe(false);
  });

  it('a forma do app vem primeiro, e nenhuma alternativa é a resposta de outro kana da mesma escrita', () => {
    for (const k of ALL_KANA) {
      const aceitas = romajiAceitos(k);
      expect(aceitas[0]).toBe(k.romaji);
      for (const alt of aceitas.slice(1)) {
        const outros = ALL_KANA.filter((o) => o.type === k.type && o.char !== k.char && o.romaji === alt);
        // `ぢ`/`づ` têm o mesmo som (e o mesmo romaji no app) de `じ`/`ず`; `o` é o som de を.
        const mesmoSom = outros.every((o) => o.romaji === k.romaji || (k.romaji === 'wo' && alt === 'o'));
        expect(mesmoSom, `${k.char}: "${alt}" é a resposta de ${outros.map((o) => o.char).join(', ')}`).toBe(true);
      }
    }
  });
});
