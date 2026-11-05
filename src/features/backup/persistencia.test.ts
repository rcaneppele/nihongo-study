import { beforeEach, describe, expect, it, vi } from 'vitest';
import { pedirArmazenamentoPersistente } from './persistencia';
import { db } from '../../db/schema';
import { limparBanco } from '../../test/banco';
import { umCard } from '../../test/fabricas';

function armazenamento({ persistido = false, concede = true } = {}) {
  return { persisted: vi.fn(async () => persistido), persist: vi.fn(async () => concede) };
}

beforeEach(limparBanco);

describe('pedirArmazenamentoPersistente', () => {
  it('sem dados: não pede (no Firefox, pedir abre um diálogo)', async () => {
    const a = armazenamento();
    expect(await pedirArmazenamentoPersistente(a)).toBe(false);
    expect(a.persist).not.toHaveBeenCalled();
  });

  it('com cards: pede e devolve a resposta do navegador', async () => {
    await db.cards.put(umCard());
    const a = armazenamento({ concede: false });
    expect(await pedirArmazenamentoPersistente(a)).toBe(false);
    expect(a.persist).toHaveBeenCalledOnce();
  });

  it('com atividade: pede', async () => {
    await db.activity.put({ day: '2026-11-05', revisoes: 1, praticas: 0, leituras: 0, novos: 0, updatedAt: 1 });
    expect(await pedirArmazenamentoPersistente(armazenamento())).toBe(true);
  });

  it('já persistido: não pede de novo', async () => {
    await db.cards.put(umCard());
    const a = armazenamento({ persistido: true });
    expect(await pedirArmazenamentoPersistente(a)).toBe(true);
    expect(a.persist).not.toHaveBeenCalled();
  });

  it('navegador sem a API: não falha', async () => {
    await db.cards.put(umCard());
    expect(await pedirArmazenamentoPersistente({} as never)).toBe(false);
  });
});
