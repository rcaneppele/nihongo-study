import { beforeEach, describe, expect, it, vi } from 'vitest';
import { State } from 'ts-fsrs';
import { db } from '../../db/schema';
import { HIRAGANA_KANA } from '../../data/kana';
import { avaliarConquistas, carregarNumeros, CONQUISTAS } from './conquistas';
import { diaLocal } from '../atividade/atividade';
import { limparBanco } from '../../test/banco';
import { DIA, umaAtividade, umaReview, umCard, umKanaProgress } from '../../test/fabricas';

beforeEach(limparBanco);

describe('conquistas', () => {
  it('ids únicos e meta positiva', () => {
    expect(new Set(CONQUISTAS.map((c) => c.id)).size).toBe(CONQUISTAS.length);
    for (const c of CONQUISTAS) expect(c.meta, c.id).toBeGreaterThan(0);
  });

  it('banco vazio: tudo zero, nada desbloqueado', async () => {
    const n = await carregarNumeros();
    expect(Object.values(n).every((v) => v === 0)).toBe(true);
    expect(await avaliarConquistas()).toEqual([]);
  });

  it('desbloqueia quando o número chega à meta, uma vez só, guardando a data', async () => {
    const hoje = Date.now();
    await db.activity.bulkAdd(Array.from({ length: 7 }, (_, i) => umaAtividade(diaLocal(hoje - i * DIA), { revisoes: 1 })));
    await db.kanaProgress.bulkAdd(HIRAGANA_KANA.map((k) => umKanaProgress(k.char, { romajiCorrect: 1 })));
    await db.readingProgress.add({ textId: 'n0-ola', timesRead: 1, lastReadAt: hoje, updatedAt: hoje });
    const novas = (await avaliarConquistas()).map((c) => c.id);
    expect(novas).toEqual(expect.arrayContaining(['sequencia-7', 'hiragana']));
    expect(novas).not.toContain('sequencia-30');
    expect(await avaliarConquistas()).toEqual([]);
    expect((await db.achievements.get('hiragana'))?.unlockedAt).toBeGreaterThan(0);
  });

  it('só calcula os números das conquistas ainda não desbloqueadas', async () => {
    const contarRevisoes = vi.spyOn(db.reviews, 'count');
    await avaliarConquistas();
    expect(contarRevisoes).toHaveBeenCalled();
    // Com as duas conquistas de revisões já desbloqueadas, o histórico de revisões deixa de ser contado.
    await db.achievements.bulkPut(CONQUISTAS.filter((c) => c.numero === 'revisoes').map((c) => ({ id: c.id, unlockedAt: 1 })));
    contarRevisoes.mockClear();
    await avaliarConquistas();
    expect(contarRevisoes).not.toHaveBeenCalled();
    contarRevisoes.mockRestore();
  });

  it('tudo desbloqueado: não lê tabela nenhuma além das conquistas', async () => {
    await db.achievements.bulkPut(CONQUISTAS.map((c) => ({ id: c.id, unlockedAt: 1 })));
    const lerCards = vi.spyOn(db.cards, 'toArray');
    expect(await avaliarConquistas()).toEqual([]);
    expect(lerCards).not.toHaveBeenCalled();
    lerCards.mockRestore();
  });

  it('acertos das lições contam quiz, diga, ditado e gramática com nota máxima — não escuta nem shadowing', async () => {
    await db.exerciseResults.bulkAdd([
      { id: '1', kind: 'quiz', itemId: 'a', score: 1, doneAt: 1 },
      { id: '2', kind: 'diga', itemId: 'a', score: 1, doneAt: 1 },
      { id: '3', kind: 'kakitori', itemId: 'a', score: 1, doneAt: 1 },
      { id: '4', kind: 'gramatica', itemId: 'a', score: 1, doneAt: 1 },
      { id: '5', kind: 'gramatica', itemId: 'b', score: 0.5, doneAt: 1 },
      { id: '6', kind: 'escuta', itemId: 't', score: 1, doneAt: 1 },
      { id: '7', kind: 'shadowing', itemId: 't', doneAt: 1 },
    ]);
    expect(await carregarNumeros()).toMatchObject({ acertosLicoes: 4, escutas: 1, shadowings: 1 });
  });

  it('números contam o que importa', async () => {
    const revisado = umCard({ state: State.Review });
    await db.cards.bulkAdd([revisado, umCard()]);
    await db.reviews.bulkAdd([umaReview(revisado.id), umaReview(revisado.id)]);
    await db.exerciseResults.bulkAdd([
      { id: '1', kind: 'quiz', itemId: 'a', score: 1, doneAt: 1 },
      { id: '2', kind: 'quiz', itemId: 'b', score: 0, doneAt: 1 },
      { id: '3', kind: 'escuta', itemId: 't', score: 1, doneAt: 1 },
      { id: '4', kind: 'shadowing', itemId: 't', doneAt: 1 },
    ]);
    expect(await carregarNumeros()).toMatchObject({ compreendidas: 1, revisoes: 2, acertosLicoes: 1, escutas: 1, shadowings: 1 });
  });
});
