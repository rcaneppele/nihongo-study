import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { db } from '../../db/schema';
import { limparBanco } from '../../test/banco';

/**
 * Fala (Web Speech): escolha da voz japonesa, velocidade, uma fala por vez
 * e a espera pelo fim da fala (com interrupção). `speechSynthesis`
 * simulado — o módulo lê `window` ao carregar, por isso o import dinâmico.
 */

interface Voz {
  lang: string;
  name: string;
  default?: boolean;
  localService?: boolean;
}

class Fala {
  lang = '';
  rate = 1;
  voice: Voz | null = null;
  onend: (() => void) | null = null;
  onerror: (() => void) | null = null;
  constructor(readonly text: string) {}
}

const sintese = {
  vozes: [] as Voz[],
  faladas: [] as Fala[],
  cancelamentos: 0,
  onvoiceschanged: null as (() => void) | null,
  getVoices() {
    return this.vozes;
  },
  speak(f: Fala) {
    this.faladas.push(f);
  },
  cancel() {
    this.cancelamentos++;
  },
};

vi.hoisted(() => {
  // Antes do import: o módulo confere `'speechSynthesis' in window` ao carregar.
  (globalThis as { window?: unknown }).window = globalThis;
});
vi.stubGlobal('speechSynthesis', sintese);
vi.stubGlobal('SpeechSynthesisUtterance', Fala);

const {
  acompanharVelocidadeDaFala,
  currentSpeechGeneration,
  isSpeechSupported,
  setSpeechSpeed,
  speakJapanese,
  speakJapaneseAndWait,
  stopSpeaking,
} = await import('./speech');

beforeEach(async () => {
  await limparBanco();
  sintese.vozes = [];
  sintese.faladas = [];
  sintese.cancelamentos = 0;
  await setSpeechSpeed('normal');
});
afterEach(() => vi.stubGlobal('speechSynthesis', sintese));

const ultima = () => sintese.faladas.at(-1)!;

describe('speakJapanese', () => {
  it('fala em japonês, cancelando a fala anterior (cliques rápidos não se sobrepõem)', () => {
    speakJapanese('ねこ');
    expect(ultima()).toMatchObject({ text: 'ねこ', lang: 'ja-JP' });
    expect(sintese.cancelamentos).toBe(1);
  });

  it('texto vazio não fala nada', () => {
    speakJapanese('   ');
    expect(sintese.faladas).toEqual([]);
  });

  it('sem nenhuma voz japonesa: fala mesmo assim, com a voz padrão do navegador', () => {
    sintese.vozes = [{ lang: 'pt-BR', name: 'Luciana', default: true }];
    speakJapanese('ねこ');
    expect(ultima().voice).toBeNull();
  });

  it('entre vozes japonesas: idioma exato primeiro, depois a padrão, depois a local (funciona offline)', () => {
    const exata = { lang: 'ja-JP', name: 'exata' };
    sintese.vozes = [{ lang: 'ja', name: 'generica', default: true, localService: true }, exata];
    speakJapanese('ねこ');
    expect(ultima().voice).toBe(exata);

    const padrao = { lang: 'ja-JP', name: 'padrao', default: true };
    sintese.vozes = [exata, { lang: 'ja-JP', name: 'local', localService: true }, padrao];
    speakJapanese('ねこ');
    expect(ultima().voice).toBe(padrao);

    const local = { lang: 'ja-JP', name: 'local', localService: true };
    sintese.vozes = [exata, local];
    speakJapanese('ねこ');
    expect(ultima().voice).toBe(local);
  });

  it('lista de vozes vazia num instante (o navegador ainda carregando) usa as vozes vistas antes', () => {
    const voz = { lang: 'ja-JP', name: 'kyoko' };
    sintese.vozes = [voz];
    speakJapanese('ねこ');
    sintese.vozes = [];
    speakJapanese('いぬ');
    expect(ultima().voice).toBe(voz);
  });
});

describe('velocidade da fala', () => {
  it('devagar fala mais lento que o normal, e a escolha fica nas preferências (entra no backup)', async () => {
    speakJapanese('ねこ');
    const normal = ultima().rate;
    await setSpeechSpeed('slow');
    speakJapanese('ねこ');
    expect(ultima().rate).toBeLessThan(normal);
    expect(await db.meta.get('speechSpeed')).toMatchObject({ value: 'slow' });
  });

  it('acompanha a preferência gravada (ex.: vinda de outro aparelho); valor estranho é ignorado', async () => {
    speakJapanese('ねこ');
    const normal = ultima().rate;
    acompanharVelocidadeDaFala();
    await db.meta.put({ key: 'speechSpeed', value: 'slow', updatedAt: 1 });
    await vi.waitFor(() => {
      speakJapanese('ねこ');
      expect(ultima().rate).toBeLessThan(normal);
    });
    await db.meta.put({ key: 'speechSpeed', value: 'turbo', updatedAt: 2 });
    await new Promise((r) => setTimeout(r, 30));
    speakJapanese('ねこ');
    expect(ultima().rate).toBeLessThan(normal);
  });
});

describe('speakJapaneseAndWait', () => {
  it('resolve como concluída quando a fala termina', async () => {
    const espera = speakJapaneseAndWait('ねこ');
    ultima().onend?.();
    expect(await espera).toEqual({ completed: true, generation: currentSpeechGeneration() });
  });

  it('erro na fala: não concluída', async () => {
    const espera = speakJapaneseAndWait('ねこ');
    ultima().onerror?.();
    expect((await espera).completed).toBe(false);
  });

  it('outra fala começou no meio: a primeira conta como interrompida', async () => {
    const espera = speakJapaneseAndWait('ねこ');
    const primeira = ultima();
    speakJapanese('いぬ');
    primeira.onend?.();
    const r = await espera;
    expect(r.completed).toBe(false);
    expect(r.generation).toBeLessThan(currentSpeechGeneration());
  });

  it('parar a fala interrompe quem estava esperando', async () => {
    const espera = speakJapaneseAndWait('ねこ');
    const fala = ultima();
    stopSpeaking();
    fala.onend?.();
    expect((await espera).completed).toBe(false);
  });

  it('texto vazio: resolve na hora, sem falar', async () => {
    expect((await speakJapaneseAndWait('')).completed).toBe(false);
    expect(sintese.faladas).toEqual([]);
  });
});

describe('navegador sem Web Speech', () => {
  it('nada fala e nada quebra', async () => {
    const semFala = globalThis as { speechSynthesis?: unknown };
    delete semFala.speechSynthesis;
    expect(isSpeechSupported()).toBe(false);
    speakJapanese('ねこ');
    stopSpeaking();
    expect((await speakJapaneseAndWait('ねこ')).completed).toBe(false);
    expect(sintese.faladas).toEqual([]);
  });
});
