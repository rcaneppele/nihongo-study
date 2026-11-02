import { beforeEach, describe, expect, it } from 'vitest';
import { db } from './schema';
import { apagar, DATA_EPOCH_KEY, getDeviceId, novaEpoca, setMeta, ultimoBackup, marcarBackup } from './local';
import { apagarTudo, exportData, importarBackup, mesmoConteudo, TABELAS_SINCRONIZADAS } from './backup';
import { limparBanco } from '../test/banco';
import { umBackup, umCard } from '../test/fabricas';

beforeEach(limparBanco);

describe('tabelas sincronizadas', () => {
  it('todas as tabelas do banco entram no backup, menos `local` (só do aparelho)', () => {
    expect([...TABELAS_SINCRONIZADAS].sort()).toEqual(db.tables.map((t) => t.name).filter((n) => n !== 'local').sort());
  });
});

describe('exportar / importar', () => {
  it('exportar e importar (substituir) num banco vazio reproduz tudo', async () => {
    await db.cards.add(umCard());
    await setMeta('tema', 'dark');
    const backup = await exportData();
    await limparBanco();
    await importarBackup(backup, 'replace');
    const depois = await exportData();
    // Substituir marca uma época nova — o resto é igual.
    expect(depois.meta.find((m) => m.key === DATA_EPOCH_KEY)).toBeDefined();
    expect(mesmoConteudo({ ...depois, meta: depois.meta.filter((m) => m.key !== DATA_EPOCH_KEY) }, backup)).toBe(true);
  });

  it('mesclar não marca época nova', async () => {
    await importarBackup(umBackup({ cards: [umCard()] }), 'merge');
    expect(await db.meta.get(DATA_EPOCH_KEY)).toBeUndefined();
    expect(await db.cards.count()).toBe(1);
  });

  it('substituir troca tudo, inclusive o que só existia aqui', async () => {
    await db.cards.add(umCard({ front: 'só-aqui' }));
    await importarBackup(umBackup({ cards: [umCard({ front: 'do-arquivo' })] }), 'replace');
    expect((await db.cards.toArray()).map((c) => c.front)).toEqual(['do-arquivo']);
  });

  it('apagar tudo esvazia os dados, marca época nova e preserva o estado do aparelho', async () => {
    const id = await getDeviceId();
    await db.cards.add(umCard());
    await marcarBackup();
    await apagarTudo();
    expect(await db.cards.count()).toBe(0);
    expect(await db.meta.get(DATA_EPOCH_KEY)).toBeDefined();
    expect(await getDeviceId()).toBe(id);
    expect(await ultimoBackup()).toBeDefined();
  });
});

describe('dados do aparelho (local.ts)', () => {
  it('id do aparelho é criado uma vez e fica fora do backup', async () => {
    const id = await getDeviceId();
    expect(await getDeviceId()).toBe(id);
    expect(JSON.stringify(await exportData())).not.toContain(id);
  });

  it('setMeta carimba a data; novaEpoca grava a época', async () => {
    await setMeta('x', 1);
    expect((await db.meta.get('x'))?.updatedAt).toBeGreaterThan(0);
    await novaEpoca();
    expect(typeof (await db.meta.get(DATA_EPOCH_KEY))?.value).toBe('number');
  });

  it('apagar deixa lápide', async () => {
    const c = umCard();
    await db.cards.add(c);
    await apagar('cards', c.id);
    expect(await db.cards.get(c.id)).toBeUndefined();
    expect((await db.deleted.get(['cards', c.id]))?.deletedAt).toBeGreaterThan(0);
  });
});
