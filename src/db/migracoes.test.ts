import { beforeEach, describe, expect, it } from 'vitest';
import { State } from 'ts-fsrs';
import { db } from './schema';
import { exportData, importData, mesmoConteudo, parseBackup, SCHEMA_VERSION, TABELAS_SINCRONIZADAS } from './backup';
import { limparBanco } from '../test/banco';

const ARQUIVOS = import.meta.glob<string>('./__fixtures__/backup-v*.json', { query: '?raw', import: 'default', eager: true });
const versoes = Object.keys(ARQUIVOS)
  .map((caminho) => Number(/backup-v(\d+)\.json$/.exec(caminho)?.[1]))
  .sort((a, b) => a - b);

function fixture(v: number): string {
  return ARQUIVOS[`./__fixtures__/backup-v${v}.json`];
}

beforeEach(limparBanco);

describe('fixtures de backup', () => {
  it('existe uma fixture para cada versão, até a atual', () => {
    expect(versoes).toEqual(Array.from({ length: SCHEMA_VERSION }, (_, i) => i + 1));
  });
});

describe.each(versoes)('backup v%i', (v) => {
  it('migra até a versão atual com todas as tabelas', () => {
    const backup = parseBackup(fixture(v));
    expect(backup.schemaVersion).toBe(SCHEMA_VERSION);
    for (const t of TABELAS_SINCRONIZADAS) expect(Array.isArray(backup[t]), t).toBe(true);
  });

  it('importa (substituir) e exporta de volta o mesmo conteúdo', async () => {
    const backup = parseBackup(fixture(v));
    await importData(backup, 'replace');
    expect(mesmoConteudo(await exportData(), backup)).toBe(true);
  });

  it('importa mesclando num banco vazio', async () => {
    const backup = parseBackup(fixture(v));
    await importData(backup, 'merge');
    expect(await db.cards.count()).toBe(backup.cards.length);
    expect(await db.reviews.count()).toBe(backup.reviews.length);
  });

  it('não perde o histórico de revisões nem o progresso de kana', () => {
    const original = JSON.parse(fixture(v));
    const backup = parseBackup(fixture(v));
    expect(backup.reviews).toEqual(original.reviews);
    expect(backup.kanaProgress).toEqual(original.kanaProgress);
  });
});

describe('migrações específicas', () => {
  it('v1 → v2: card do SM-2 vira card novo do FSRS, sem os campos antigos', () => {
    const [card] = parseBackup(fixture(1)).cards as unknown as Record<string, unknown>[];
    expect(card.state).toBe(State.New);
    expect(card).not.toHaveProperty('ef');
    expect(card).not.toHaveProperty('interval');
    expect(card).not.toHaveProperty('repetitions');
    expect(card).toMatchObject({ front: 'ねこ', back: 'gato', reading: 'neko', category: 'Animais' });
  });

  it('a partir da v2, o estado FSRS é preservado (não reseta de novo)', () => {
    for (const v of versoes.filter((n) => n >= 2)) {
      const original = JSON.parse(fixture(v)).cards[0];
      const [card] = parseBackup(fixture(v)).cards;
      expect({ stability: card.stability, reps: card.reps, dueDate: card.dueDate }, `v${v}`).toEqual({
        stability: original.stability,
        reps: original.reps,
        dueDate: original.dueDate,
      });
    }
  });

  it('cada versão preserva as tabelas que já tinha', () => {
    for (const v of versoes) {
      const original = JSON.parse(fixture(v));
      const backup = parseBackup(fixture(v));
      for (const t of TABELAS_SINCRONIZADAS) {
        if (t === 'cards' || !(t in original)) continue;
        expect(backup[t], `v${v}.${t}`).toEqual(original[t]);
      }
    }
  });

  it('arquivo que não é do app é recusado', () => {
    expect(() => parseBackup('{"app":"outro"}')).toThrow('Não parece um backup do Nihongo Study.');
    expect(() => parseBackup('isso não é json')).toThrow();
  });
});
