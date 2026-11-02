import { beforeEach, describe, expect, it } from 'vitest';
import { State } from 'ts-fsrs';
import { db } from '../../db/schema';
import { KANJI_N5 } from '../../data/kanji';
import { Rating } from '../srs/fsrs';
import { diaLocal } from '../atividade/atividade';
import { aprenderKanji, desfazerRevisaoKanji, registrarCaligrafiaKanji, registrarRevisaoKanji } from './progresso';
import { getAvailableNewKanji, getDueKanji, getStartedKanji } from './kanjiQueue';
import { limparBanco } from '../../test/banco';
import { AGORA, DIA } from '../../test/fabricas';

beforeEach(limparBanco);

const ordem = [...KANJI_N5].sort((x, y) => x.order - y.order);

describe('progresso de kanji', () => {
  it('aprender cria o kanji no FSRS (vencendo agora) e conta como novo', async () => {
    await aprenderKanji('日', AGORA);
    expect(await db.kanjiProgress.get('日')).toMatchObject({ char: '日', state: State.New, dueDate: AGORA, createdAt: AGORA });
    expect((await db.activity.get(diaLocal()))?.novos).toBe(1);
  });

  it('revisar e desfazer', async () => {
    await aprenderKanji('日', AGORA);
    const antes = await registrarRevisaoKanji('日', Rating.Good, AGORA + 1);
    expect(antes?.state).toBe(State.New);
    expect((await db.kanjiProgress.get('日'))?.state).toBe(State.Review);
    await desfazerRevisaoKanji(antes!, AGORA + 2);
    expect(await db.kanjiProgress.get('日')).toEqual({ ...antes, updatedAt: AGORA + 2 });
    expect((await db.activity.get(diaLocal()))?.revisoes).toBe(0);
  });

  it('revisar kanji não aprendido não faz nada', async () => {
    expect(await registrarRevisaoKanji('日', Rating.Good)).toBeUndefined();
    expect(await db.kanjiProgress.count()).toBe(0);
  });

  it('caligrafia guarda a melhor nota sem mexer no carimbo do FSRS', async () => {
    await aprenderKanji('日', AGORA);
    await registrarCaligrafiaKanji('日', 80);
    await registrarCaligrafiaKanji('日', 50);
    expect(await db.kanjiProgress.get('日')).toMatchObject({ drawBest: 80, updatedAt: AGORA });
    await registrarCaligrafiaKanji('木', 90);
    expect(await db.kanjiProgress.get('木')).toBeUndefined();
  });
});

describe('filas de kanji', () => {
  it('novos na ordem pedagógica, pulando os já aprendidos', async () => {
    expect((await getAvailableNewKanji(3)).map((k) => k.char)).toEqual(ordem.slice(0, 3).map((k) => k.char));
    await aprenderKanji(ordem[0].char);
    expect((await getAvailableNewKanji(2)).map((k) => k.char)).toEqual(ordem.slice(1, 3).map((k) => k.char));
  });

  it('vencidos e iniciados', async () => {
    await aprenderKanji(ordem[1].char, Date.now() - DIA);
    await aprenderKanji(ordem[0].char, Date.now() + DIA);
    expect((await getDueKanji()).map((k) => k.char)).toEqual([ordem[1].char]);
    expect((await getStartedKanji()).map((k) => k.char)).toEqual([ordem[0].char, ordem[1].char]);
  });
});
