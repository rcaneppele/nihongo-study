import { beforeEach, describe, expect, it } from 'vitest';
import { db } from '../../db/schema';
import { LICOES } from '../../licoes';
import { diaLocal } from '../atividade/atividade';
import { marcarConcluida, marcarVista, trilhaDeLicoes } from './progresso';
import { limparBanco } from '../../test/banco';

beforeEach(limparBanco);
const [primeira, segunda] = LICOES.map((l) => l.meta.id);

describe('progresso das lições', () => {
  it('abrir só registra a abertura (não conclui, não conta como alteração)', async () => {
    await marcarVista(primeira);
    expect(await db.lessonProgress.get(primeira)).toMatchObject({ lessonId: primeira, updatedAt: 0 });
    expect((await db.lessonProgress.get(primeira))?.completedAt).toBeUndefined();
  });

  it('concluir conta como item novo uma vez só; desmarcar tira a conclusão', async () => {
    await marcarConcluida(primeira, true);
    await marcarConcluida(primeira, true);
    expect((await db.activity.get(diaLocal()))?.novos).toBe(1);
    await marcarConcluida(primeira, false);
    expect((await db.lessonProgress.get(primeira))?.completedAt).toBeUndefined();
  });

  it('trilha: próxima é a primeira não concluída, na ordem de LICOES', async () => {
    expect(trilhaDeLicoes(new Map()).proxima?.meta.id).toBe(primeira);
    await marcarConcluida(primeira, true);
    const mapa = new Map((await db.lessonProgress.toArray()).map((l) => [l.lessonId, l]));
    const trilha = trilhaDeLicoes(mapa);
    expect(trilha).toMatchObject({ concluidas: 1, total: LICOES.length });
    expect(trilha.proxima?.meta.id).toBe(segunda);
    expect(trilha.ultimoEstudo).toBeGreaterThan(0);
  });

  it('lição que não existe mais não conta', () => {
    const t = trilhaDeLicoes(new Map([['removida', { lessonId: 'removida', viewedAt: 1, completedAt: 1, updatedAt: 1 }]]));
    expect(t.concluidas).toBe(0);
  });
});
