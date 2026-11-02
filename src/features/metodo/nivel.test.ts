import { describe, expect, it } from 'vitest';
import { ALL_KANA } from '../../data/kana';
import { LEITURA_TEXTOS } from '../../data/leitura/textos';
import { calcularNivel, type DadosNivel, type Indicador } from './nivel';
import type { KnownWords } from '../leitura/knowledge';
import type { ExerciseKind, ExerciseResult } from '../../db/schema';
import { AGORA, umKanaProgress, umKanjiProgress } from '../../test/fabricas';
import type { HabilidadeId } from './estrutura';

function dados(parcial: Partial<DadosNivel> = {}): DadosNivel {
  return { leituras: 0, kana: [], kanji: [], frases: 0, exercicios: [], diario: 0, ...parcial };
}

function palavras(understood: string[] = [], canSay: string[] = []): KnownWords {
  return { understood: new Set(understood), canSay: new Set(canSay), understoodWeek: 0, canSayWeek: 0 };
}

let seq = 0;
function resultado(kind: ExerciseKind, score: number | undefined, itemId = `item-${seq}`): ExerciseResult {
  seq++;
  return { id: `r${seq}`, kind, itemId, score, doneAt: AGORA + seq };
}

/** Indicadores da habilidade, por rótulo. */
function indicadores(id: HabilidadeId, d: Partial<DadosNivel> = {}, known = palavras()): Record<string, Indicador> {
  return Object.fromEntries(calcularNivel(id, dados(d), known).indicadores.map((i) => [i.label, i]));
}

describe('Seu nível — Ler', () => {
  it('textos lidos, palavras compreendidas e kana reconhecidos (digitando ou na múltipla escolha)', () => {
    const ler = indicadores(
      'ler',
      {
        leituras: 3,
        kana: [
          umKanaProgress('あ', { romajiCorrect: 1 }),
          umKanaProgress('い', { choiceCorrect: 2 }),
          umKanaProgress('う', { romajiWrong: 5, choiceWrong: 1 }), // só errou: não conta
          umKanaProgress('え', { drawBest: 90 }), // só desenhou: é Escrever
        ],
      },
      palavras(['ねこ', 'いぬ'])
    );
    expect(ler['Textos lidos']).toMatchObject({ valor: 3, total: LEITURA_TEXTOS.length });
    expect(ler['Palavras compreendidas'].valor).toBe(2);
    expect(ler['Kana reconhecidos']).toMatchObject({ valor: 2, total: ALL_KANA.length });
  });
});

describe('Seu nível — Ouvir', () => {
  it('sem nenhum exercício: traço, não 0%', () => {
    const ouvir = indicadores('ouvir');
    expect(ouvir['Acerto no ditado'].valor).toBe('—');
    expect(ouvir['Entendimento só de ouvido'].valor).toBe('—');
  });

  it('ditado e escuta em porcentagem arredondada, cada um com o seu tipo de exercício', () => {
    const ouvir = indicadores('ouvir', {
      leituras: 4,
      exercicios: [
        resultado('kakitori', 1),
        resultado('kakitori', 1),
        resultado('kakitori', 0),
        resultado('escuta', 0.5),
        resultado('escuta', 1),
        resultado('diga', 0), // é Falar
      ],
    });
    expect(ouvir['Acerto no ditado'].valor).toBe('67%');
    expect(ouvir['Entendimento só de ouvido'].valor).toBe('75%');
    expect(ouvir['Entendimento só de ouvido'].hint).toContain('Você já fez 2 escuta(s)');
    expect(ouvir['Textos prontos para escutar']).toMatchObject({ valor: 4, total: LEITURA_TEXTOS.length });
  });

  it('avisa que a escuta é autoavaliada', () => {
    expect(calcularNivel('ouvir', dados(), palavras()).observacao).toMatch(/autoavaliada/);
  });
});

describe('Seu nível — Falar', () => {
  it('palavras que sei dizer, acerto no Diga, textos em shadowing (sem repetir) e frases salvas', () => {
    const falar = indicadores(
      'falar',
      {
        frases: 5,
        exercicios: [
          resultado('diga', 1),
          resultado('diga', 0),
          resultado('shadowing', undefined, 'texto-a'),
          resultado('shadowing', undefined, 'texto-a'),
          resultado('shadowing', undefined, 'texto-b'),
        ],
      },
      palavras(['ねこ', 'いぬ', 'とり'], ['ねこ'])
    );
    expect(falar['Palavras que sei dizer'].valor).toBe(1);
    expect(falar['Acerto no "Diga em japonês"'].valor).toBe('50%');
    expect(falar['Textos em shadowing']).toMatchObject({ valor: 2, total: LEITURA_TEXTOS.length });
    expect(falar['Frases salvas para treinar'].valor).toBe(5);
  });

  it('avisa que a fala é autoavaliada', () => {
    expect(calcularNivel('falar', dados(), palavras()).observacao).toMatch(/autoavaliada/);
  });
});

describe('Seu nível — Escrever', () => {
  it('sem desenho nenhum: nota média em traço e kanji sem total', () => {
    const escrever = indicadores('escrever');
    expect(escrever['Nota média do desenho'].valor).toBe('—');
    expect(escrever['Kanji desenhados']).toMatchObject({ valor: 0, total: undefined });
  });

  it('kana desenhados com a média arredondada da melhor nota; kanji desenhados entre os aprendidos; diário', () => {
    const escrever = indicadores('escrever', {
      diario: 3,
      kana: [umKanaProgress('あ', { drawBest: 80 }), umKanaProgress('い', { drawBest: 75 }), umKanaProgress('う', { romajiCorrect: 3 })],
      kanji: [umKanjiProgress('日', { drawBest: 60 }), umKanjiProgress('月'), umKanjiProgress('火', { drawBest: 0 })],
    });
    expect(escrever['Kana desenhados']).toMatchObject({ valor: 2, total: ALL_KANA.length });
    expect(escrever['Nota média do desenho'].valor).toBe('78%');
    expect(escrever['Entradas no diário'].valor).toBe(3);
    expect(escrever['Kanji desenhados']).toMatchObject({ valor: 2, total: 3 });
  });

  it('Ler e Escrever não têm ressalva de autoavaliação', () => {
    expect(calcularNivel('ler', dados(), palavras()).observacao).toBeUndefined();
    expect(calcularNivel('escrever', dados(), palavras()).observacao).toBeUndefined();
  });
});
