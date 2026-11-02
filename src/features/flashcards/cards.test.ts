import { beforeEach, describe, expect, it } from 'vitest';
import { State } from 'ts-fsrs';
import { db } from '../../db/schema';
import { freshSrs } from '../srs/fsrs';
import { adicionarCardsNovos, apagarCard, cardPorFrente, criarCard, editarNota, mudarEstagio, novoCard } from './cards';
import { cardStage } from './stages';
import { AGORA, umCard } from '../../test/fabricas';
import { limparBanco } from '../../test/banco';

beforeEach(limparBanco);

describe('novoCard', () => {
  it('card completo, novo, vencendo agora', () => {
    const c = novoCard({ front: '猫', back: 'gato' }, AGORA, 'x');
    expect(c).toEqual({ id: 'x', front: '猫', back: 'gato', tags: [], ...freshSrs(AGORA), createdAt: AGORA, updatedAt: AGORA });
  });

  it('ids diferentes por padrão', () => {
    expect(novoCard({ front: 'a', back: 'b' }).id).not.toBe(novoCard({ front: 'a', back: 'b' }).id);
  });
});

describe('adicionarCardsNovos', () => {
  it('ignora frentes que já existem e repetidas no próprio lote', async () => {
    await criarCard({ front: '猫', back: 'gato' });
    const r = await adicionarCardsNovos([
      { front: '猫', back: 'gato de novo' },
      { front: '犬', back: 'cachorro' },
      { front: '犬', back: 'cão' },
    ]);
    expect(r).toEqual({ criados: 1, ignorados: 2 });
    expect((await db.cards.toArray()).map((c) => c.front).sort()).toEqual(['犬', '猫']);
    expect((await cardPorFrente('犬'))?.back).toBe('cachorro');
  });

  it('lote vazio não grava nada', async () => {
    expect(await adicionarCardsNovos([])).toEqual({ criados: 0, ignorados: 0 });
  });
});

describe('editarNota', () => {
  it('grava a nota aparada e carimba só o conteúdo', async () => {
    const card = umCard();
    await db.cards.add(card);
    await editarNota(card, '  vem do português  ', AGORA + 5);
    expect(await db.cards.get(card.id)).toMatchObject({ note: 'vem do português', contentUpdatedAt: AGORA + 5, updatedAt: AGORA + 5 });
    expect((await db.cards.get(card.id))?.srsUpdatedAt).toBe(card.updatedAt);
  });
});

describe('mudarEstagio', () => {
  it('Novo → Sei dizer → Reconheço; Domino recomeça a produção', async () => {
    const card = umCard();
    await db.cards.add(card);
    await mudarEstagio(card, AGORA);
    let atual = (await db.cards.get(card.id))!;
    expect(cardStage(atual)).toBe('seiDizer');
    expect(atual.productionUpdatedAt).toBe(AGORA);

    await mudarEstagio(atual, AGORA + 1);
    atual = (await db.cards.get(card.id))!;
    expect(atual.production).toBeUndefined();

    const dominado = umCard({ production: { ...freshSrs(AGORA), state: State.Review, scheduledDays: 30 } });
    await db.cards.add(dominado);
    await mudarEstagio(dominado, AGORA);
    expect((await db.cards.get(dominado.id))?.production).toEqual(freshSrs(AGORA));
  });
});

describe('apagarCard', () => {
  it('apaga e deixa lápide', async () => {
    const card = umCard();
    await db.cards.add(card);
    await apagarCard(card.id);
    expect(await db.cards.get(card.id)).toBeUndefined();
    expect(await db.deleted.get(['cards', card.id])).toMatchObject({ table: 'cards', key: card.id });
  });
});
