import { describe, expect, it } from 'vitest';
import fc from 'fast-check';
import { State } from 'ts-fsrs';
import { freshSrs } from '../srs/fsrs';
import {
  buildReviewQueue,
  cardStage,
  MASTERED_DAYS,
  NEW_PRODUCTION_PER_SESSION,
  PRODUCTION_MIN_DAYS,
  promotedProduction,
} from './stages';
import { AGORA, DIA, umCard } from '../../test/fabricas';
import type { Card, CardSrs } from '../../db/schema';

function revisado(dias: number, extra: Partial<CardSrs> = {}): CardSrs {
  return { ...freshSrs(AGORA), state: State.Review, reps: 3, scheduledDays: dias, dueDate: AGORA + dias * DIA, ...extra };
}

describe('cardStage', () => {
  it('Novo → Reconheço → Sei dizer → Domino', () => {
    expect(cardStage(umCard())).toBe('novo');
    expect(cardStage(umCard(revisado(3)))).toBe('reconheco');
    expect(cardStage(umCard({ ...revisado(10), production: freshSrs(AGORA) }))).toBe('seiDizer');
    expect(cardStage(umCard({ ...revisado(10), production: revisado(MASTERED_DAYS - 1) }))).toBe('seiDizer');
    expect(cardStage(umCard({ ...revisado(10), production: revisado(MASTERED_DAYS) }))).toBe('domino');
  });

  it('produção com intervalo longo mas fora de Review (reaprendendo) ainda é Sei dizer', () => {
    expect(cardStage(umCard({ production: revisado(40, { state: State.Relearning }) }))).toBe('seiDizer');
  });
});

describe('promotedProduction', () => {
  it(`ganha a produção quando o reconhecimento chega a ${PRODUCTION_MIN_DAYS} dias`, () => {
    const card = umCard(revisado(3));
    expect(promotedProduction(card, PRODUCTION_MIN_DAYS - 1, AGORA)).toBeUndefined();
    expect(promotedProduction(card, PRODUCTION_MIN_DAYS, AGORA)).toEqual(freshSrs(AGORA));
  });

  it('não recria a produção que já existe', () => {
    const production = revisado(30);
    expect(promotedProduction(umCard({ production }), 100, AGORA)).toBe(production);
  });
});

describe('buildReviewQueue', () => {
  const ontem = AGORA - DIA;

  it('entra o reconhecimento vencido; o que vence depois fica de fora', () => {
    const vencido = umCard({ dueDate: AGORA - 1 });
    const futuro = umCard({ dueDate: AGORA + DIA });
    expect(buildReviewQueue([vencido, futuro], AGORA)).toEqual([{ card: vencido, direction: 'recognition' }]);
  });

  it('se as duas direções vencem juntas, entra só a produção', () => {
    const card = umCard({ dueDate: ontem, production: revisado(5, { dueDate: ontem, lastReviewedAt: ontem - 5 * DIA }) });
    expect(buildReviewQueue([card], AGORA)).toEqual([{ card, direction: 'production' }]);
  });

  it('reconhecimento revisado hoje segura a produção (inclusive a recém-promovida) até amanhã', () => {
    const card = umCard({ ...revisado(7), dueDate: AGORA + 7 * DIA, lastReviewedAt: AGORA - 1000, production: freshSrs(AGORA) });
    expect(buildReviewQueue([card], AGORA)).toEqual([]);
    expect(buildReviewQueue([card], AGORA + DIA)).toEqual([{ card, direction: 'production' }]);
  });

  it('produção revisada hoje segura o reconhecimento vencido', () => {
    const card = umCard({ dueDate: ontem, production: revisado(3, { lastReviewedAt: AGORA - 1000 }) });
    expect(buildReviewQueue([card], AGORA)).toEqual([]);
  });

  it(`no máximo ${NEW_PRODUCTION_PER_SESSION} produções novas por sessão; o resto continua no reconhecimento se vencido`, () => {
    const cards = Array.from({ length: NEW_PRODUCTION_PER_SESSION + 5 }, () =>
      umCard({ ...revisado(10), dueDate: AGORA + DIA, production: freshSrs(ontem) })
    );
    const fila = buildReviewQueue(cards, AGORA);
    expect(fila.filter((i) => i.direction === 'production')).toHaveLength(NEW_PRODUCTION_PER_SESSION);
    expect(fila).toHaveLength(NEW_PRODUCTION_PER_SESSION);
  });

  it('vencer exatamente agora já conta (nas duas direções)', () => {
    const rec = umCard({ dueDate: AGORA });
    const prod = umCard({ dueDate: AGORA + DIA, production: revisado(3, { dueDate: AGORA, lastReviewedAt: AGORA - 3 * DIA }) });
    expect(buildReviewQueue([rec, prod], AGORA).map((i) => i.direction)).toEqual(['recognition', 'production']);
  });

  it('"mesmo dia" é dia, mês e ano: revisado no mesmo dia do mês anterior (ou do ano anterior) não segura', () => {
    const mesPassado = new Date(AGORA);
    mesPassado.setMonth(mesPassado.getMonth() - 1);
    const anoPassado = new Date(AGORA);
    anoPassado.setFullYear(anoPassado.getFullYear() - 1);
    const outroMesMesmoDiaEAno = new Date(AGORA);
    outroMesMesmoDiaEAno.setMonth(outroMesMesmoDiaEAno.getMonth() - 2);
    for (const quando of [mesPassado, anoPassado, outroMesMesmoDiaEAno]) {
      const card = umCard({ dueDate: AGORA - DIA, production: revisado(3, { dueDate: AGORA + DIA, lastReviewedAt: quando.getTime() }) });
      expect(buildReviewQueue([card], AGORA), quando.toISOString()).toEqual([{ card, direction: 'recognition' }]);
    }
  });

  it(`o teto de ${NEW_PRODUCTION_PER_SESSION} vale só para produções novas; as já em revisão entram todas`, () => {
    const cards = Array.from({ length: NEW_PRODUCTION_PER_SESSION + 5 }, () =>
      umCard({ ...revisado(10), dueDate: AGORA + DIA, production: revisado(5, { dueDate: AGORA - DIA, lastReviewedAt: AGORA - 6 * DIA }) })
    );
    expect(buildReviewQueue(cards, AGORA)).toHaveLength(NEW_PRODUCTION_PER_SESSION + 5);
  });

  it('propriedades: nunca o mesmo card duas vezes, só itens vencidos, ordem preservada', () => {
    const arbSrs = fc.record({
      dueOffset: fc.integer({ min: -30, max: 30 }),
      revisadoHa: fc.option(fc.integer({ min: 0, max: 30 }), { nil: undefined }),
      novo: fc.boolean(),
    });
    const arbCard = fc.record({ rec: arbSrs, prod: fc.option(arbSrs, { nil: undefined }) });
    const montar = (s: { dueOffset: number; revisadoHa?: number; novo: boolean }): CardSrs => ({
      ...freshSrs(AGORA),
      state: s.novo ? State.New : State.Review,
      dueDate: AGORA + s.dueOffset * DIA,
      lastReviewedAt: s.revisadoHa === undefined ? undefined : AGORA - s.revisadoHa * DIA,
    });
    fc.assert(
      fc.property(fc.array(arbCard, { maxLength: 60 }), (specs) => {
        const cards: Card[] = specs.map((sp) => umCard({ ...montar(sp.rec), production: sp.prod && montar(sp.prod) }));
        const fila = buildReviewQueue(cards, AGORA);
        const ids = fila.map((i) => i.card.id);
        expect(new Set(ids).size).toBe(ids.length);
        expect(ids).toEqual(cards.filter((c) => ids.includes(c.id)).map((c) => c.id));
        for (const { card, direction } of fila) {
          const srs = direction === 'production' ? card.production! : card;
          expect(srs.dueDate).toBeLessThanOrEqual(AGORA);
        }
        expect(fila.filter((i) => i.direction === 'production' && i.card.production!.state === State.New).length).toBeLessThanOrEqual(
          NEW_PRODUCTION_PER_SESSION
        );
      })
    );
  });
});
