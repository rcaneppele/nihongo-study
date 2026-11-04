import { describe, expect, it } from 'vitest';
import { conjugar } from './conjugacao';
import { VERBOS_GRUPO_1, VERBOS_GRUPO_2 } from './lista';
import { N5_DECK } from '../seed/n5';

describe('conjugar', () => {
  it.each([
    // Uma por terminação do Grupo 1, escritas à mão.
    ['かう', 1, 'かいます', 'かわない', 'かって', 'かった'],
    ['かく', 1, 'かきます', 'かかない', 'かいて', 'かいた'],
    ['およぐ', 1, 'およぎます', 'およがない', 'およいで', 'およいだ'],
    ['はなす', 1, 'はなします', 'はなさない', 'はなして', 'はなした'],
    ['まつ', 1, 'まちます', 'またない', 'まって', 'まった'],
    ['しぬ', 1, 'しにます', 'しなない', 'しんで', 'しんだ'],
    ['あそぶ', 1, 'あそびます', 'あそばない', 'あそんで', 'あそんだ'],
    ['のむ', 1, 'のみます', 'のまない', 'のんで', 'のんだ'],
    ['とる', 1, 'とります', 'とらない', 'とって', 'とった'],
    // Exceções e disfarçados.
    ['いく', 1, 'いきます', 'いかない', 'いって', 'いった'],
    ['ある', 1, 'あります', 'ない', 'あって', 'あった'],
    ['かえる', 1, 'かえります', 'かえらない', 'かえって', 'かえった'],
    // Grupo 2.
    ['たべる', 2, 'たべます', 'たべない', 'たべて', 'たべた'],
    ['みる', 2, 'みます', 'みない', 'みて', 'みた'],
  ] as const)('%s (Grupo %i)', (dicionario, grupo, masu, nai, te, ta) => {
    expect(conjugar(dicionario, grupo)).toEqual({ masu, nai, te, ta });
  });
});

describe('lista de referência', () => {
  const todos = [...VERBOS_GRUPO_1, ...VERBOS_GRUPO_2];

  it('tem os verbos do quadro: 25 no Grupo 1, 17 no Grupo 2, sem repetir', () => {
    expect(VERBOS_GRUPO_1).toHaveLength(25);
    expect(VERBOS_GRUPO_2).toHaveLength(17);
    expect(new Set(todos.map((v) => v.dicionario)).size).toBe(todos.length);
  });

  it('dados completos: romaji sem acento e tradução', () => {
    for (const v of todos) {
      expect(v.romaji, v.dicionario).toMatch(/^[a-z]+$/);
      expect(v.pt.trim(), v.dicionario).not.toBe('');
    }
  });

  it('Grupo 2 só tem -iru/-eru; no Grupo 1, -iru/-eru é sempre marcado como disfarçado', () => {
    for (const v of VERBOS_GRUPO_2) expect(v.romaji, v.dicionario).toMatch(/(i|e)ru$/);
    for (const v of VERBOS_GRUPO_1) {
      expect(Boolean(v.disfarcado), v.dicionario).toBe(/(i|e)ru$/.test(v.romaji));
    }
  });

  it('todos dão para estudar em Palavras novas, menos ころす (fora do N5)', () => {
    const frentes = new Set(N5_DECK.map((e) => e.front));
    const fora = todos.map((v) => v.dicionario).filter((d) => !frentes.has(d));
    expect(fora).toEqual(['ころす']);
  });
});
