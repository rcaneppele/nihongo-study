import { db, newId, type Card } from '../../db/schema';
import { apagar } from '../../db/local';
import { carimbosCard } from '../../db/merge';
import { freshSrs } from '../srs/fsrs';
import { cardStage } from './stages';

/**
 * Serviço dos flash cards: criar, editar e apagar cards. Toda gravação de
 * card fora da revisão (ver `revisao.ts`) passa por aqui, pra sair sempre
 * completa (estado FSRS novo, datas) e com os carimbos da mesclagem.
 */

/** O que define um card novo; o resto (id, FSRS, datas) a fábrica preenche. */
export type CamposCard = Pick<Card, 'front' | 'back'> &
  Partial<Pick<Card, 'reading' | 'category' | 'tags' | 'note' | 'example' | 'source' | 'production'>>;

/** Card novo (estado FSRS "novo", vencendo agora). Não grava. */
export function novoCard(campos: CamposCard, now: number = Date.now(), id: string = newId()): Card {
  return { id, tags: [], ...campos, ...freshSrs(now), createdAt: now, updatedAt: now };
}

/** Card já existente com essa frente — o critério de duplicata do app inteiro (import, N5, leitura, mesclagem). */
export function cardPorFrente(front: string): Promise<Card | undefined> {
  return db.cards.filter((c) => c.front === front).first();
}

export async function criarCard(campos: CamposCard, now: number = Date.now()): Promise<Card> {
  const card = novoCard(campos, now);
  await db.cards.add(card);
  return card;
}

/**
 * Cria os cards cuja frente ainda não existe (nem no banco, nem repetida na
 * própria lista). Devolve quantos foram criados e quantos ignorados.
 */
export async function adicionarCardsNovos(
  lista: CamposCard[],
  now: number = Date.now()
): Promise<{ criados: number; ignorados: number }> {
  const frentes = new Set((await db.cards.toArray()).map((c) => c.front));
  const novos: Card[] = [];
  for (const campos of lista) {
    if (frentes.has(campos.front)) continue;
    frentes.add(campos.front);
    novos.push(novoCard(campos, now));
  }
  if (novos.length > 0) await db.cards.bulkAdd(novos);
  return { criados: novos.length, ignorados: lista.length - novos.length };
}

/** Grava a nota do card (string vazia = apagou de propósito; ver `cardNote`). */
export function editarNota(card: Card, nota: string, now: number = Date.now()) {
  return db.cards.update(card.id, { note: nota.trim(), ...carimbosCard(card, ['contentUpdatedAt'], now) });
}

/**
 * Produção depois da mudança manual de estágio: de Novo/Reconheço,
 * "Treinar a dizer" adianta a promoção que o FSRS faria sozinho; de Sei
 * dizer, volta só ao reconhecimento; de Domino, recomeça a produção do zero.
 */
export function producaoAoMudarEstagio(card: Card, now: number): Card['production'] {
  const stage = cardStage(card);
  if (stage === 'seiDizer') return undefined;
  return freshSrs(now);
}

export function mudarEstagio(card: Card, now: number = Date.now()) {
  return db.cards.update(card.id, {
    production: producaoAoMudarEstagio(card, now),
    ...carimbosCard(card, ['productionUpdatedAt'], now),
  });
}

export function apagarCard(id: string): Promise<void> {
  return apagar('cards', id);
}
