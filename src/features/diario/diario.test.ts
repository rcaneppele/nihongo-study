import { beforeEach, describe, expect, it } from 'vitest';
import { db } from '../../db/schema';
import { apagarEntrada, salvarEntrada } from './diario';
import { diaLocal } from '../atividade/atividade';
import { limparBanco } from '../../test/banco';
import { AGORA, DIA } from '../../test/fabricas';

beforeEach(limparBanco);

/** Diário guiado: salvar conta como prática do dia; editar não conta de novo; apagar deixa lápide. */
describe('diário guiado', () => {
  it('entrada nova: grava texto e checklist, e conta uma prática no dia', async () => {
    await salvarEntrada('quem-eu-sou', 'わたしは ロドリゴ です。', ['nome'], undefined, AGORA);
    const [entrada] = await db.journal.toArray();
    expect(entrada).toMatchObject({ promptId: 'quem-eu-sou', text: 'わたしは ロドリゴ です。', checked: ['nome'], createdAt: AGORA, updatedAt: AGORA });
    expect((await db.activity.get(diaLocal(AGORA)))?.praticas).toBe(1);
  });

  it('editar: muda texto, checklist e data de alteração, sem contar outra prática', async () => {
    await salvarEntrada('quem-eu-sou', 'antes', [], undefined, AGORA);
    const [entrada] = await db.journal.toArray();
    await salvarEntrada('quem-eu-sou', 'depois', ['nome', 'sem-san'], entrada, AGORA + DIA);
    expect(await db.journal.toArray()).toEqual([{ ...entrada, text: 'depois', checked: ['nome', 'sem-san'], updatedAt: AGORA + DIA }]);
    expect((await db.activity.get(diaLocal(AGORA + DIA)))?.praticas ?? 0).toBe(0);
  });

  it('apagar: some daqui e deixa lápide para sumir dos outros aparelhos', async () => {
    await salvarEntrada('quem-eu-sou', 'texto', [], undefined, AGORA);
    const [entrada] = await db.journal.toArray();
    await apagarEntrada(entrada.id);
    expect(await db.journal.count()).toBe(0);
    expect(await db.deleted.get(['journal', entrada.id])).toMatchObject({ table: 'journal', key: entrada.id });
  });
});
