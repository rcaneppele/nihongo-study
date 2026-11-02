import { describe, expect, it } from 'vitest';
import fc from 'fast-check';
import { incrementar, mesclarContadores } from './contadores';
import {
  ACTIVITY_CONTADORES,
  carimbosCard,
  iguais,
  mesclarAtividade,
  mesclarCard,
  mesclarConquista,
  mesclarDiario,
  mesclarKanji,
  mesclarLapide,
  mesclarLicao,
  mesclarMeta,
  type GrupoCard,
} from './merge';
import type { Activity, Card } from './schema';
import { umaAtividade, umCard, umKanjiProgress } from '../test/fabricas';

/**
 * Propriedades da mesclagem entre aparelhos (regras-negocio.md §6): vários
 * aparelhos alteram os dados e sincronizam numa ordem qualquer; depois que
 * todos trocam tudo com todos, ficam **iguais** (convergem) e com o
 * resultado certo — a soma do que cada um fez, ou a última alteração de
 * cada grupo de campos. Cada operação acontece num instante diferente (o
 * relógio só anda), como na vida real.
 */

const APARELHOS = ['A', 'B', 'C'] as const;
type Aparelho = (typeof APARELHOS)[number];

const arbAparelho = fc.constantFrom(...APARELHOS);

/** Sincronizar `de` → `para` e de volta, como faz o ciclo do motor (baixar, mesclar, subir). */
function trocar<T>(estado: Record<Aparelho, T>, x: Aparelho, y: Aparelho, mesclar: (a: T, b: T) => T) {
  const xy = mesclar(estado[x], estado[y]);
  estado[x] = xy;
  estado[y] = mesclar(estado[y], xy);
}

function sincronizarTodos<T>(estado: Record<Aparelho, T>, mesclar: (a: T, b: T) => T) {
  for (let rodada = 0; rodada < 2; rodada++) {
    for (const x of APARELHOS) for (const y of APARELHOS) if (x !== y) trocar(estado, x, y, mesclar);
  }
}

describe('contadores por aparelho (atividade do dia, kana, palavras, leituras)', () => {
  type Op = { tipo: 'somar'; aparelho: Aparelho; campo: (typeof ACTIVITY_CONTADORES)[number]; n: number } | { tipo: 'sync'; x: Aparelho; y: Aparelho };
  const arbOp: fc.Arbitrary<Op> = fc.oneof(
    fc.record({
      tipo: fc.constant('somar' as const),
      aparelho: arbAparelho,
      campo: fc.constantFrom(...ACTIVITY_CONTADORES),
      n: fc.integer({ min: 1, max: 20 }),
    }),
    fc.record({ tipo: fc.constant('sync' as const), x: arbAparelho, y: arbAparelho })
  );

  it('convergem para a soma de tudo o que cada aparelho fez, em qualquer ordem de sincronização', () => {
    fc.assert(
      fc.property(fc.array(arbOp, { maxLength: 60 }), (ops) => {
        const estado = Object.fromEntries(APARELHOS.map((a) => [a, umaAtividade('2026-03-15')])) as Record<Aparelho, Activity>;
        const esperado: Record<string, number> = { revisoes: 0, praticas: 0, leituras: 0, novos: 0 };
        let relogio = 1000;
        for (const op of ops) {
          relogio++;
          if (op.tipo === 'somar') {
            const atual = estado[op.aparelho];
            estado[op.aparelho] = {
              ...atual,
              ...incrementar(atual, { [op.campo]: op.n }, ACTIVITY_CONTADORES, op.aparelho, relogio),
              updatedAt: relogio,
            };
            esperado[op.campo] += op.n;
          } else if (op.x !== op.y) {
            trocar(estado, op.x, op.y, mesclarAtividade);
          }
        }
        sincronizarTodos(estado, mesclarAtividade);
        for (const a of APARELHOS) {
          expect(iguais(estado[a], estado.A)).toBe(true);
          for (const c of ACTIVITY_CONTADORES) expect(estado[a][c]).toBe(esperado[c]);
        }
      })
    );
  });

  it('mesclar é idempotente: o mesmo arquivo de novo não conta duas vezes', () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: 50 }), fc.integer({ min: 0, max: 50 }), (na, nb) => {
        const a = incrementar(undefined, { n: na }, ['n'] as const, 'A', 1);
        const b = incrementar(undefined, { n: nb }, ['n'] as const, 'B', 2);
        const ab = mesclarContadores(a, b, ['n'] as const);
        expect(mesclarContadores(ab, b, ['n'] as const)).toEqual(ab);
        expect(mesclarContadores(ab, ab, ['n'] as const)).toEqual(ab);
        expect(mesclarContadores(b, a, ['n'] as const).n).toBe(ab.n);
      })
    );
  });
});

describe('cards: cada grupo de campos vence pela última alteração', () => {
  const GRUPOS: GrupoCard[] = ['contentUpdatedAt', 'srsUpdatedAt', 'productionUpdatedAt'];
  type Op = { tipo: 'editar'; aparelho: Aparelho; grupo: GrupoCard; valor: number } | { tipo: 'sync'; x: Aparelho; y: Aparelho };
  const arbOp: fc.Arbitrary<Op> = fc.oneof(
    fc.record({ tipo: fc.constant('editar' as const), aparelho: arbAparelho, grupo: fc.constantFrom(...GRUPOS), valor: fc.integer({ min: 1, max: 1e6 }) }),
    fc.record({ tipo: fc.constant('sync' as const), x: arbAparelho, y: arbAparelho })
  );

  function editar(card: Card, grupo: GrupoCard, valor: number, now: number): Card {
    const mudanca: Partial<Card> =
      grupo === 'contentUpdatedAt'
        ? { back: `significado ${valor}` }
        : grupo === 'srsUpdatedAt'
          ? { reps: valor, dueDate: valor }
          : { production: { ...card, stability: 1, difficulty: 5, state: 2, reps: valor, lapses: 0, scheduledDays: 1, dueDate: valor } };
    return { ...card, ...mudanca, ...carimbosCard(card, [grupo], now) };
  }

  /** Carimbo ausente vale `updatedAt`: compara pelo valor efetivo. */
  function carimbosEfetivos(card: Card): Card {
    const r = { ...card };
    for (const g of GRUPOS) r[g] = card[g] ?? card.updatedAt;
    return r;
  }

  it('convergem e cada grupo fica com a última edição feita em qualquer aparelho', () => {
    fc.assert(
      fc.property(fc.array(arbOp, { maxLength: 50 }), (ops) => {
        const base = umCard({ id: 'c', front: 'ねこ' }, 100);
        const estado: Record<Aparelho, Card> = { A: base, B: base, C: base };
        const ultima: Partial<Record<GrupoCard, Card>> = {};
        let relogio = 1000;
        for (const op of ops) {
          relogio++;
          if (op.tipo === 'editar') {
            estado[op.aparelho] = editar(estado[op.aparelho], op.grupo, op.valor, relogio);
            ultima[op.grupo] = estado[op.aparelho];
          } else if (op.x !== op.y) {
            trocar(estado, op.x, op.y, mesclarCard);
          }
        }
        sincronizarTodos(estado, mesclarCard);
        for (const a of APARELHOS) expect(carimbosEfetivos(estado[a])).toEqual(carimbosEfetivos(estado.A));
        const final = estado.A;
        if (ultima.contentUpdatedAt) expect(final.back).toBe(ultima.contentUpdatedAt.back);
        if (ultima.srsUpdatedAt) expect(final.reps).toBe(ultima.srsUpdatedAt.reps);
        if (ultima.productionUpdatedAt) expect(final.production).toEqual(ultima.productionUpdatedAt.production);
      })
    );
  });

  it('mesclar um card com ele mesmo não muda nada', () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 1e9 }), (t) => {
        const c = umCard({ updatedAt: t, srsUpdatedAt: t, contentUpdatedAt: t - 1 });
        expect(mesclarCard(c, c)).toEqual(c);
      })
    );
  });
});

/**
 * Regras "vence o mais recente / o mais antigo" (kanji, meta, lápide,
 * lição, conquista, diário): com instantes distintos, comutativas,
 * associativas e idempotentes.
 */
describe('mesclagens de "um vence"', () => {
  const instantes = fc.uniqueArray(fc.integer({ min: 1, max: 1e9 }), { minLength: 3, maxLength: 3 });

  const casos = [
    { nome: 'kanji', fazer: (t: number) => umKanjiProgress('日', { updatedAt: t, reps: t, drawBest: t % 100 }), mesclar: mesclarKanji },
    { nome: 'meta', fazer: (t: number) => ({ key: 'tema', value: t, updatedAt: t }), mesclar: mesclarMeta },
    { nome: 'lápide', fazer: (t: number) => ({ table: 'cards' as const, key: 'x', deletedAt: t }), mesclar: mesclarLapide },
    {
      nome: 'lição',
      fazer: (t: number) => ({ lessonId: 'desu', viewedAt: t * 3 % 1e9, updatedAt: t, ...(t % 2 ? { completedAt: t } : {}) }),
      mesclar: mesclarLicao,
    },
    { nome: 'conquista', fazer: (t: number) => ({ id: 'x', unlockedAt: t }), mesclar: mesclarConquista },
    {
      nome: 'diário',
      fazer: (t: number) => ({ id: 'j', promptId: 'p', text: `texto ${t}`, checked: [], createdAt: 1, updatedAt: t }),
      mesclar: mesclarDiario,
    },
  ];

  it.each(casos)('$nome', ({ fazer, mesclar }) => {
    const m = mesclar as (a: unknown, b: unknown) => unknown;
    fc.assert(
      fc.property(instantes, ([t1, t2, t3]) => {
        const [a, b, c] = [fazer(t1), fazer(t2), fazer(t3)];
        expect(m(a, b)).toEqual(m(b, a));
        expect(m(m(a, b), c)).toEqual(m(a, m(b, c)));
        expect(m(a, a)).toEqual(a);
      })
    );
  });
});
