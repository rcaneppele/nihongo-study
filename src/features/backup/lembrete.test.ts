import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { haQuantoTempo, tempoDesde } from './lembrete';
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
