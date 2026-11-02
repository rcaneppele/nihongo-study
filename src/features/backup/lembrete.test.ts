import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { DIAS_LEMBRETE, estadoBackup, haQuantoTempo, tempoDesde } from './lembrete';
import { diaLocal } from '../atividade/atividade';
import { AGORA, DIA } from '../../test/fabricas';

beforeEach(() => {
  vi.useFakeTimers({ toFake: ['Date'] });
  vi.setSystemTime(AGORA);
});
afterEach(() => vi.useRealTimers());

describe('haQuantoTempo', () => {
  it.each([
    [0, 'hoje'],
    [DIA - 1, 'hoje'],
    [DIA, 'ontem'],
    [5 * DIA, 'há 5 dias'],
  ])('%i ms atrás → %s', (atras, texto) => {
    expect(haQuantoTempo(AGORA - atras)).toBe(texto);
  });
});

describe('tempoDesde', () => {
  it.each([
    [30 * 1000, 'agora há pouco'],
    [5 * 60 * 1000, 'há 5 min'],
    [2 * 60 * 60 * 1000, 'há 2 h'],
    [DIA, 'ontem'],
    [3 * DIA, 'há 3 dias'],
  ])('%i ms atrás → %s', (atras, texto) => {
    expect(tempoDesde(AGORA - atras)).toBe(texto);
  });
});

describe('estadoBackup', () => {
  it('nunca estudou nem fez backup: nada a lembrar', () => {
    expect(estadoBackup(undefined, undefined, AGORA)).toEqual({ ultimo: undefined, dias: undefined, lembrar: false });
  });

  it(`backup recente: não lembra; com ${DIAS_LEMBRETE} dias, lembra`, () => {
    expect(estadoBackup(AGORA - (DIAS_LEMBRETE * DIA - 1), undefined, AGORA)).toEqual({
      ultimo: AGORA - (DIAS_LEMBRETE * DIA - 1),
      dias: DIAS_LEMBRETE - 1,
      lembrar: false,
    });
    expect(estadoBackup(AGORA - DIAS_LEMBRETE * DIA, undefined, AGORA)).toMatchObject({ dias: DIAS_LEMBRETE, lembrar: true });
  });

  it('nunca fez backup: conta desde o primeiro dia de estudo (meia-noite local)', () => {
    const inicio = new Date(AGORA);
    inicio.setHours(0, 0, 0, 0);
    const primeiroDia = diaLocal(inicio.getTime() - DIAS_LEMBRETE * DIA);
    expect(estadoBackup(undefined, primeiroDia, AGORA)).toMatchObject({ ultimo: undefined, dias: DIAS_LEMBRETE, lembrar: true });
    expect(estadoBackup(undefined, diaLocal(AGORA), AGORA)).toMatchObject({ dias: 0, lembrar: false });
  });

  it('com backup, o primeiro dia de estudo não importa', () => {
    expect(estadoBackup(AGORA - DIA, '2020-01-01', AGORA)).toMatchObject({ dias: 1, lembrar: false });
  });
});
