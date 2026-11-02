import { beforeEach, describe, expect, it } from 'vitest';
import { State } from 'ts-fsrs';
import { db } from '../../db/schema';
import { Rating, applyFsrs, freshSrs } from '../srs/fsrs';
import { diaLocal } from '../atividade/atividade';
import { calcularRevisao, desfazerRevisao, registrarRevisao } from './revisao';
import { AGORA, DIA, umCard } from '../../test/fabricas';
import { limparBanco } from '../../test/banco';

beforeEach(limparBanco);

async function atividadeDeHoje() {
  return db.activity.get(diaLocal());
}

describe('calcularRevisao', () => {
  it('reconhecimento: aplica o FSRS, carimba o SRS e gera a review', () => {
    const card = umCard();
    const { mudancas, review } = calcularRevisao(card, 'recognition', Rating.Good, AGORA, 'r1');
    expect(mudancas).toMatchObject({ ...applyFsrs(card, Rating.Good, AGORA), srsUpdatedAt: AGORA, updatedAt: AGORA });
    expect(mudancas.production).toBeUndefined();
    // Grupo não alterado mantém o carimbo antigo (aqui, o `updatedAt` de criação).
    expect(mudancas.productionUpdatedAt).toBe(card.updatedAt);
    expect(review).toEqual({ id: 'r1', cardId: card.id, reviewedAt: AGORA, quality: Rating.Good, intervalAfter: mudancas.scheduledDays });
  });

  it('reconhecimento que chega a 7 dias promove a "Sei dizer" e carimba as duas direções', () => {
    const card = umCard(applyFsrs(freshSrs(AGORA - 3 * DIA), Rating.Good, AGORA - 3 * DIA));
    expect(card.scheduledDays).toBeLessThan(7);
    const { mudancas } = calcularRevisao(card, 'recognition', Rating.Easy, AGORA);
    expect(mudancas.scheduledDays).toBeGreaterThanOrEqual(7);
    expect(mudancas.production).toEqual(freshSrs(AGORA));
    expect(mudancas.productionUpdatedAt).toBe(AGORA);
  });

  it('produção: só mexe na produção e marca a direção na review', () => {
    const card = umCard({ production: freshSrs(AGORA - DIA) }, AGORA - DIA);
    const { mudancas, review } = calcularRevisao(card, 'production', Rating.Good, AGORA);
    expect(mudancas.production).toEqual(applyFsrs(card.production!, Rating.Good, AGORA));
    expect(mudancas).toMatchObject({ productionUpdatedAt: AGORA, srsUpdatedAt: AGORA - DIA, contentUpdatedAt: AGORA - DIA });
    expect(mudancas.stability).toBeUndefined();
    expect(review.direction).toBe('production');
  });

  it('produção num card sem produção é erro', () => {
    expect(() => calcularRevisao(umCard(), 'production', Rating.Good, AGORA)).toThrow();
  });
});

describe('registrarRevisao / desfazerRevisao', () => {
  it('grava card + review e conta revisão e palavra nova no dia', async () => {
    const card = umCard();
    await db.cards.add(card);
    await registrarRevisao(card, 'recognition', Rating.Good);
    const salvo = await db.cards.get(card.id);
    expect(salvo?.state).toBe(State.Review);
    expect(await db.reviews.where('cardId').equals(card.id).count()).toBe(1);
    expect(await atividadeDeHoje()).toMatchObject({ revisoes: 1, novos: 1 });
  });

  it('revisar card que já não é novo não conta palavra nova; produção também não', async () => {
    const card = umCard({ state: State.Review, production: freshSrs(AGORA) });
    await db.cards.add(card);
    await registrarRevisao(card, 'recognition', Rating.Good);
    await registrarRevisao((await db.cards.get(card.id))!, 'production', Rating.Good);
    expect(await atividadeDeHoje()).toMatchObject({ revisoes: 2, novos: 0 });
  });

  it('desfazer volta o card exatamente ao estado de antes, apaga a review com lápide e desconta a atividade', async () => {
    const card = umCard();
    await db.cards.add(card);
    const feita = await registrarRevisao(card, 'recognition', Rating.Good);
    await desfazerRevisao(feita, AGORA + 1000);
    const restaurado = await db.cards.get(card.id);
    // Mesmo estado de antes; carimbos novos nos dois grupos de SRS, pra vencer a nota desfeita na mesclagem.
    expect(restaurado).toEqual({ ...card, srsUpdatedAt: AGORA + 1000, productionUpdatedAt: AGORA + 1000, contentUpdatedAt: card.updatedAt, updatedAt: AGORA + 1000 });
    expect(await db.reviews.count()).toBe(0);
    expect(await db.deleted.get(['reviews', feita.reviewId])).toBeDefined();
    expect(await atividadeDeHoje()).toMatchObject({ revisoes: 0, novos: 0 });
  });

  it('desfazer uma promoção tira a produção', async () => {
    const card = umCard(applyFsrs(freshSrs(AGORA - 3 * DIA), Rating.Good, AGORA - 3 * DIA));
    await db.cards.add(card);
    const feita = await registrarRevisao(card, 'recognition', Rating.Easy, AGORA);
    expect((await db.cards.get(card.id))?.production).toBeDefined();
    await desfazerRevisao(feita);
    expect((await db.cards.get(card.id))?.production).toBeUndefined();
  });
});
