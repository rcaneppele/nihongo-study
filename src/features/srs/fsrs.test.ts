import { describe, expect, it } from 'vitest';
import fc from 'fast-check';
import { State } from 'ts-fsrs';
import { applyFsrs, freshSrs, previewInterval, Rating, REVIEW_GRADES, type Grade, type SrsState } from './fsrs';
import { AGORA, DIA } from '../../test/fabricas';

const NOTAS: Grade[] = [Rating.Again, Rating.Hard, Rating.Good, Rating.Easy];

describe('freshSrs', () => {
  it('card novo vence agora, sem histórico', () => {
    expect(freshSrs(AGORA)).toMatchObject({ state: State.New, reps: 0, lapses: 0, dueDate: AGORA, scheduledDays: 0 });
  });
});

describe('applyFsrs', () => {
  it('sem passos de minutos: o menor intervalo é 1 dia, e a nota ordena o intervalo', () => {
    const intervalos = NOTAS.map((n) => applyFsrs(freshSrs(AGORA), n, AGORA).scheduledDays);
    expect(intervalos[0]).toBe(1);
    for (let i = 1; i < intervalos.length; i++) expect(intervalos[i]).toBeGreaterThanOrEqual(intervalos[i - 1]);
    for (const n of NOTAS) expect(applyFsrs(freshSrs(AGORA), n, AGORA).state).toBe(State.Review);
  });

  it('"Lembrei" seguidos fazem o intervalo crescer', () => {
    let s: SrsState = freshSrs(AGORA);
    let anterior = 0;
    for (let i = 0; i < 6; i++) {
      s = applyFsrs(s, Rating.Good, s.dueDate);
      expect(s.scheduledDays).toBeGreaterThan(anterior);
      anterior = s.scheduledDays;
    }
    expect(s.reps).toBe(6);
  });

  it('"Não lembrei" num card firme conta lapso e encurta o intervalo', () => {
    let s: SrsState = freshSrs(AGORA);
    for (let i = 0; i < 4; i++) s = applyFsrs(s, Rating.Good, s.dueDate);
    const lapso = applyFsrs(s, Rating.Again, s.dueDate);
    expect(lapso.lapses).toBe(s.lapses + 1);
    expect(lapso.scheduledDays).toBeLessThan(s.scheduledDays);
    expect(lapso.stability).toBeLessThan(s.stability);
  });

  it('dueDate = momento da revisão + intervalo; lastReviewedAt = momento da revisão', () => {
    fc.assert(
      fc.property(fc.constantFrom(...NOTAS), fc.integer({ min: 0, max: 400 }), (nota, dias) => {
        const now = AGORA + dias * DIA;
        const r = applyFsrs(freshSrs(AGORA), nota, now);
        expect(r.lastReviewedAt).toBe(now);
        expect(Math.round((r.dueDate - now) / DIA)).toBe(r.scheduledDays);
      })
    );
  });

  it('nunca produz número inválido, qualquer que seja a sequência de notas', () => {
    fc.assert(
      fc.property(fc.array(fc.constantFrom(...NOTAS), { maxLength: 30 }), (notas) => {
        let s: SrsState = freshSrs(AGORA);
        for (const n of notas) {
          s = applyFsrs(s, n, s.dueDate);
          expect(Number.isFinite(s.stability) && s.stability > 0).toBe(true);
          expect(s.difficulty).toBeGreaterThanOrEqual(1);
          expect(s.difficulty).toBeLessThanOrEqual(10);
          expect(s.scheduledDays).toBeGreaterThanOrEqual(1);
        }
        expect(s.reps).toBe(notas.length);
      })
    );
  });
});

describe('previewInterval', () => {
  it('é o intervalo que a nota daria', () => {
    for (const n of NOTAS) expect(previewInterval(freshSrs(AGORA), n, AGORA)).toBe(applyFsrs(freshSrs(AGORA), n, AGORA).scheduledDays);
  });
});

describe('REVIEW_GRADES', () => {
  it('quatro botões, dois no modo simples (Não lembrei / Lembrei)', () => {
    expect(REVIEW_GRADES.map((g) => g.grade)).toEqual(NOTAS);
    expect(REVIEW_GRADES.filter((g) => g.simple).map((g) => g.label)).toEqual(['Não lembrei', 'Lembrei']);
  });
});
