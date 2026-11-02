import { describe, expect, it } from 'vitest';
import fc from 'fast-check';
import { getKana, getKanaByFamilies, HIRAGANA_KANA, type KanaEntry } from '../../data/kana';
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

describe('romajiCorreto', () => {
  it('ignora maiúsculas e espaços nas pontas', () => {
    expect(romajiCorreto('  KA ', { ...a, romaji: 'ka' })).toBe(true);
    expect(romajiCorreto('ga', { ...a, romaji: 'ka' })).toBe(false);
  });
});
