import { beforeEach, describe, expect, it } from 'vitest';
import { db, type ExerciseResult } from '../../db/schema';
import { acertoRecente, desempenhoPorItem, registrarResultados } from './historico';
import { limparBanco } from '../../test/banco';

beforeEach(limparBanco);

function r(kind: ExerciseResult['kind'], itemId: string, score: number | undefined, doneAt: number): ExerciseResult {
  return { id: `${kind}-${itemId}-${doneAt}`, kind, itemId, score, doneAt };
}

describe('registrarResultados', () => {
  it('uma linha por resposta, com id e data', async () => {
    await registrarResultados([{ kind: 'quiz', itemId: 'q1', lessonId: 'desu', score: 1 }, { kind: 'quiz', itemId: 'q2', score: 0 }]);
    const linhas = await db.exerciseResults.toArray();
    expect(linhas).toHaveLength(2);
    expect(linhas.every((l) => l.id && l.doneAt > 0)).toBe(true);
    await registrarResultados([]);
    expect(await db.exerciseResults.count()).toBe(2);
  });
});

describe('acertoRecente', () => {
  it('média das n respostas avaliadas mais recentes do tipo', () => {
    const rs = [r('diga', 'a', 0, 1), r('diga', 'b', 1, 2), r('diga', 'c', 1, 3), r('quiz', 'x', 0, 4), r('shadowing', 's', undefined, 5)];
    expect(acertoRecente(rs, 'diga')).toBeCloseTo(2 / 3);
    expect(acertoRecente(rs, 'diga', 2)).toBe(1);
    expect(acertoRecente(rs, 'shadowing')).toBeNull();
    expect(acertoRecente([], 'quiz')).toBeNull();
  });
});

describe('desempenhoPorItem', () => {
  it('tentativas, erros, taxa e se a última foi errada (em ordem de tempo)', () => {
    const d = desempenhoPorItem([r('quiz', 'q1', 1, 3), r('quiz', 'q1', 0, 1), r('quiz', 'q1', 0, 2), r('escuta', 't', 0.5, 1)]);
    expect(d.get('quiz:q1')).toMatchObject({ tentativas: 3, erros: 2, ultimaErrada: false, ultimaEm: 3 });
    expect(d.get('quiz:q1')?.taxa).toBeCloseTo(1 / 3);
    expect(d.get('escuta:t')).toMatchObject({ tentativas: 1, erros: 1, taxa: 0.5, ultimaErrada: true });
  });
});
