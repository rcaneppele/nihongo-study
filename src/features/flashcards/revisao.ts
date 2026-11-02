import { State } from 'ts-fsrs';
import { db, newId, type Card, type Review } from '../../db/schema';
import { apagar } from '../../db/local';
import { carimbosCard } from '../../db/merge';
import { applyFsrs, type Grade } from '../srs/fsrs';
import { registrarAtividade } from '../atividade/atividade';
import { promotedProduction, type Direction } from './stages';

/**
 * Revisão de um flash card (Revisão do dia): a nota atualiza o FSRS da
 * direção revisada, grava a linha em `reviews` e conta na atividade do dia.
 * Desfazer volta o card ao estado anterior e apaga a revisão (com lápide).
 */

/** O que precisa ser revertido ao desfazer uma nota: o card como estava antes e a revisão criada. */
export interface RevisaoFeita {
  antes: Card;
  direcao: Direction;
  reviewId: string;
}

/**
 * Regra pura da nota: as mudanças no card e a linha de `reviews`. No
 * reconhecimento, o intervalo novo pode promover o card a "Sei dizer"
 * (nasce a produção); só carimba a produção se ela foi criada aqui.
 */
export function calcularRevisao(
  card: Card,
  direcao: Direction,
  nota: Grade,
  now: number,
  reviewId: string = newId()
): { mudancas: Partial<Card>; review: Review } {
  let mudancas: Partial<Card>;
  let intervalo: number;
  if (direcao === 'production') {
    if (!card.production) throw new Error('Card sem direção de produção.');
    const resultado = applyFsrs(card.production, nota, now);
    mudancas = { production: resultado, ...carimbosCard(card, ['productionUpdatedAt'], now) };
    intervalo = resultado.scheduledDays;
  } else {
    const resultado = applyFsrs(card, nota, now);
    const production = promotedProduction(card, resultado.scheduledDays, now);
    const promovido = production !== card.production;
    mudancas = {
      ...resultado,
      ...(promovido ? { production } : {}),
      ...carimbosCard(card, promovido ? ['srsUpdatedAt', 'productionUpdatedAt'] : ['srsUpdatedAt'], now),
    };
    intervalo = resultado.scheduledDays;
  }
  const review: Review = {
    id: reviewId,
    cardId: card.id,
    ...(direcao === 'production' ? { direction: 'production' as const } : {}),
    reviewedAt: now,
    quality: nota,
    intervalAfter: intervalo,
  };
  return { mudancas, review };
}

/** Primeira revisão de reconhecimento de um card = palavra nova aprendida hoje. */
function ehPalavraNova(card: Card, direcao: Direction): boolean {
  return direcao === 'recognition' && card.state === State.New;
}

export async function registrarRevisao(
  card: Card,
  direcao: Direction,
  nota: Grade,
  now: number = Date.now()
): Promise<RevisaoFeita> {
  const { mudancas, review } = calcularRevisao(card, direcao, nota, now);
  await db.transaction('rw', db.cards, db.reviews, async () => {
    await db.cards.update(card.id, mudancas);
    await db.reviews.add(review);
  });
  await registrarAtividade('revisoes');
  if (ehPalavraNova(card, direcao)) await registrarAtividade('novos');
  return { antes: card, direcao, reviewId: review.id };
}

export async function desfazerRevisao(feita: RevisaoFeita, now: number = Date.now()): Promise<void> {
  const { antes, direcao, reviewId } = feita;
  await db.transaction('rw', db.cards, db.reviews, db.deleted, async () => {
    // O estado restaurado precisa vencer a nota desfeita na mesclagem: carimbo novo nos dois grupos de SRS.
    await db.cards.put({ ...antes, ...carimbosCard(antes, ['srsUpdatedAt', 'productionUpdatedAt'], now) });
    await apagar('reviews', reviewId);
  });
  await registrarAtividade('revisoes', -1);
  if (ehPalavraNova(antes, direcao)) await registrarAtividade('novos', -1);
}
