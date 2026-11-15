import { beforeEach, describe, expect, it } from 'vitest';
import { db } from '../../db/schema';
import { limparBanco } from '../../test/banco';
import { umaAtividade, umCard, umKanaProgress } from '../../test/fabricas';
import { marcarVista } from '../licoes/progresso';
import {
  avisoComecarVisivel,
  deveMostrarAvisoComecar,
  dispensarAvisoComecar,
  ehAparelhoNovo,
  TABELAS_DE_USO,
  type ContagemDeUso,
} from './aparelhoNovo';

const VAZIO = Object.fromEntries(TABELAS_DE_USO.map((t) => [t, 0])) as ContagemDeUso;

describe('ehAparelhoNovo / deveMostrarAvisoComecar', () => {
  it('aparelho sem nada gravado é novo', () => {
    expect(ehAparelhoNovo(VAZIO)).toBe(true);
    expect(deveMostrarAvisoComecar(VAZIO, false)).toBe(true);
  });

  it.each(TABELAS_DE_USO)('um registro em %s já indica que alguém estuda aqui', (tabela) => {
    expect(ehAparelhoNovo({ ...VAZIO, [tabela]: 1 })).toBe(false);
  });

  it('dispensado não aparece mais, mesmo com o aparelho vazio', () => {
    expect(deveMostrarAvisoComecar(VAZIO, true)).toBe(false);
  });
});

describe('avisoComecarVisivel (banco)', () => {
  beforeEach(limparBanco);

  it('aparece no aparelho vazio e some ao dispensar', async () => {
    expect(await avisoComecarVisivel()).toBe(true);
    await dispensarAvisoComecar();
    expect(await avisoComecarVisivel()).toBe(false);
  });

  it('some quando a pessoa começa a estudar (abrir uma lição já conta)', async () => {
    await marcarVista('kana');
    expect(await avisoComecarVisivel()).toBe(false);
  });

  it('não aparece para quem já tem dados (ex.: importou um backup)', async () => {
    await db.cards.add(umCard());
    expect(await avisoComecarVisivel()).toBe(false);
    await limparBanco();
    await db.kanaProgress.add(umKanaProgress('あ'));
    expect(await avisoComecarVisivel()).toBe(false);
    await limparBanco();
    await db.activity.add(umaAtividade('2026-03-15'));
    expect(await avisoComecarVisivel()).toBe(false);
  });
});
