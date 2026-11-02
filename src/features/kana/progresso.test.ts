import { beforeEach, describe, expect, it } from 'vitest';
import { db } from '../../db/schema';
import { HIRAGANA_KANA } from '../../data/kana';
import { diaLocal } from '../atividade/atividade';
import { getWeakKana, registrarDesenhoKana, registrarRespostaKana, sessaoDeFracos } from './progresso';
import { limparBanco } from '../../test/banco';
import { MIN_WEAK_POOL } from './treino';

const [a, i] = HIRAGANA_KANA;
beforeEach(limparBanco);

describe('progresso de kana', () => {
  it('soma acertos e erros por modo e conta como prática', async () => {
    await registrarRespostaKana(a, 'romaji', true);
    await registrarRespostaKana(a, 'romaji', false);
    await registrarRespostaKana(a, 'escolha', true);
    expect(await db.kanaProgress.get(a.char)).toMatchObject({ romajiCorrect: 1, romajiWrong: 1, choiceCorrect: 1, type: 'hiragana' });
    expect((await db.activity.get(diaLocal()))?.praticas).toBe(3);
  });

  it('desenho guarda só a melhor nota', async () => {
    await registrarDesenhoKana(a, 70);
    await registrarDesenhoKana(a, 40);
    expect((await db.kanaProgress.get(a.char))?.drawBest).toBe(70);
    await registrarDesenhoKana(a, 90);
    expect((await db.kanaProgress.get(a.char))?.drawBest).toBe(90);
  });

  it('pontos fracos: só o que errou, na escrita escolhida, completando a sessão', async () => {
    await registrarRespostaKana(a, 'romaji', false);
    await registrarRespostaKana(i, 'romaji', true);
    expect(await getWeakKana('hiragana', 'romaji')).toEqual([a]);
    expect(await getWeakKana('katakana', 'romaji')).toEqual([]);
    expect(await getWeakKana('hiragana', 'escolha')).toEqual([]);
    const sessao = await sessaoDeFracos([a], 'hiragana', 'romaji');
    expect(sessao).toHaveLength(MIN_WEAK_POOL);
    expect(sessao.slice(0, 2)).toEqual([a, i]);
  });
});
