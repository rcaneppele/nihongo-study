import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { db } from '../../db/schema';
import { diaLocal, diasEstudados, pontos, PESO_LEITURA, registrarAtividade, resumoDoDia, sequenciaDeDias } from './atividade';
import { limparBanco } from '../../test/banco';
import { AGORA, DIA, umaAtividade, umaReview } from '../../test/fabricas';

beforeEach(limparBanco);
afterEach(() => vi.useRealTimers());

const dia = (deslocamento: number) => diaLocal(AGORA + deslocamento * DIA);

describe('diaLocal', () => {
  it('data local AAAA-MM-DD, com zero à esquerda', () => {
    expect(diaLocal(new Date(2026, 0, 5, 23, 59).getTime())).toBe('2026-01-05');
    expect(diaLocal(new Date(2026, 0, 6, 0, 0).getTime())).toBe('2026-01-06');
  });
});

describe('pontos', () => {
  it(`leitura vale ${PESO_LEITURA}`, () => {
    expect(pontos(umaAtividade('x', { revisoes: 3, praticas: 2, novos: 1, leituras: 1 }))).toBe(6 + PESO_LEITURA);
    expect(pontos(undefined)).toBe(0);
  });
});

describe('sequenciaDeDias', () => {
  it('conta os dias seguidos até hoje', () => {
    expect(sequenciaDeDias(new Set([dia(0), dia(-1), dia(-2), dia(-4)]), AGORA)).toBe(3);
  });

  it('hoje ainda sem estudo não quebra a sequência de ontem', () => {
    expect(sequenciaDeDias(new Set([dia(-1), dia(-2)]), AGORA)).toBe(2);
  });

  it('um dia sem estudo zera', () => {
    expect(sequenciaDeDias(new Set([dia(-2), dia(-3)]), AGORA)).toBe(0);
    expect(sequenciaDeDias(new Set(), AGORA)).toBe(0);
  });

  it('atravessa virada de mês e de ano', () => {
    const anoNovo = new Date(2026, 0, 1, 9).getTime();
    const dias = new Set([0, -1, -2].map((d) => diaLocal(anoNovo + d * DIA)));
    expect(sequenciaDeDias(dias, anoNovo)).toBe(3);
  });
});

describe('diasEstudados', () => {
  it('dia com atividade ou com revisão antiga (anterior à tabela de atividade); dia zerado não conta', () => {
    const dias = diasEstudados(
      [umaAtividade(dia(0), { praticas: 1 }), umaAtividade(dia(-1))],
      [umaReview('c', { reviewedAt: AGORA - 10 * DIA })]
    );
    expect(dias).toEqual(new Set([dia(0), dia(-10)]));
  });
});

describe('resumoDoDia', () => {
  it('pontos de hoje, sequência e a semana terminando hoje', () => {
    const r = resumoDoDia([umaAtividade(dia(0), { revisoes: 5 }), umaAtividade(dia(-1), { novos: 1 })], [], AGORA);
    expect(r.pontos).toBe(5);
    expect(r.estudouHoje).toBe(true);
    expect(r.sequencia).toBe(2);
    expect(r.semana).toHaveLength(7);
    expect(r.semana[6]).toMatchObject({ day: dia(0), estudou: true });
    expect(r.semana[5]).toMatchObject({ day: dia(-1), estudou: true });
    expect(r.semana[0]).toMatchObject({ day: dia(-6), estudou: false });
  });

  it('sem nada gravado: dia vazio', () => {
    expect(resumoDoDia([], [], AGORA)).toMatchObject({ pontos: 0, sequencia: 0, estudouHoje: false });
  });
});

describe('registrarAtividade', () => {
  it('soma no dia de hoje e desfaz sem passar de zero', async () => {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(AGORA);
    await registrarAtividade('revisoes');
    await registrarAtividade('revisoes', 2);
    await registrarAtividade('leituras');
    await registrarAtividade('revisoes', -5);
    await registrarAtividade('novos', 0);
    expect(await db.activity.get(dia(0))).toMatchObject({ revisoes: 0, leituras: 1, novos: 0 });
  });

  it('cada dia num registro próprio', async () => {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(AGORA);
    await registrarAtividade('praticas');
    vi.setSystemTime(AGORA + DIA);
    await registrarAtividade('praticas');
    expect((await db.activity.toArray()).map((a) => [a.day, a.praticas])).toEqual([
      [dia(0), 1],
      [dia(1), 1],
    ]);
  });
});
