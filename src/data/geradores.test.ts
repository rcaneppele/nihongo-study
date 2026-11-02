import { beforeEach, describe, expect, it } from 'vitest';
import fc from 'fast-check';
import { LICOES } from '../licoes';
import { contarDisponiveis as contarQuiz, gerarQuiz, PARTICULAS_COMUNS } from './quiz/gerador';
import { TIPOS_QUIZ, type TipoQuiz } from './quiz/types';
import { contarDisponiveis as contarKakitori, gerarKakitori, listarFontes } from './kakitori/gerador';
import { contarFrases, gerarGramatica, lerFrase } from './gramatica/gerador';
import { PONTOS_GRAMATICA } from './gramatica/frases';
import {
  contarDisponiveis as contarDiga,
  gerarDiga,
  kanaAudio,
  kanaExibicao,
  licoesComFrases,
  romaji,
  salvarFrasesComoCards,
} from '../features/diga/gerador';
import { conteudoDoItem } from '../features/exercicios/conteudo';
import { db } from '../db/schema';
import { cardStage } from '../features/flashcards/stages';
import { limparBanco } from '../test/banco';

const TODAS = LICOES.map((l) => l.meta.id);
const TIPOS = TIPOS_QUIZ.map((t) => t.tipo);
const arbLicoes = fc.subarray(TODAS, { minLength: 1 });
const arbTipos = fc.subarray(TIPOS, { minLength: 1 }) as fc.Arbitrary<TipoQuiz[]>;

describe('Quiz', () => {
  it('nunca passa da quantidade pedida nem do disponível; sem pergunta repetida; só das lições e tipos escolhidos', () => {
    fc.assert(
      fc.property(arbLicoes, arbTipos, fc.integer({ min: 1, max: 40 }), (licaoIds, tipos, quantidade) => {
        const quiz = gerarQuiz({ licaoIds, tipos, quantidade });
        expect(quiz.length).toBe(Math.min(quantidade, contarQuiz(licaoIds, tipos)));
        expect(new Set(quiz.map((p) => `${p.tipo}:${p.id}`)).size).toBe(quiz.length);
        for (const p of quiz) {
          expect(licaoIds).toContain(p.licaoId);
          expect(tipos).toContain(p.tipo);
        }
      }),
      { numRuns: 50 }
    );
  });

  it('"Escolher partícula": a correta entre 4 alternativas distintas; "Reordenar": mesmos tokens', () => {
    const quiz = gerarQuiz({ licaoIds: TODAS, tipos: ['escolher-particula', 'reordenar-frase'], quantidade: 9999 });
    expect(quiz.length).toBeGreaterThan(0);
    for (const p of quiz) {
      if (p.tipo === 'escolher-particula') {
        expect(p.alternativas, p.id).toContain(p.correta);
        expect(new Set(p.alternativas).size, p.id).toBe(4);
        expect(p.alternativas.filter((a) => a !== p.correta).every((a) => PARTICULAS_COMUNS.includes(a)), p.id).toBe(true);
      } else if (p.tipo === 'reordenar-frase') {
        expect([...p.tokensEmbaralhados].map((t) => t.texto).sort(), p.id).toEqual(p.respostaCorreta.map((t) => t.texto).sort());
        if (p.respostaCorreta.length > 2) expect(p.tokensEmbaralhados, `${p.id}: embaralhou`).not.toEqual(p.respostaCorreta);
      }
    }
  });

  it('todo item gerado tem conteúdo recuperável pelo histórico (Pontos fracos)', () => {
    for (const p of gerarQuiz({ licaoIds: TODAS, tipos: TIPOS, quantidade: 9999 })) {
      expect(conteudoDoItem('quiz', p.id), p.id).toBeDefined();
    }
  });
});

describe('Kakitori (ditado)', () => {
  const fontes = listarFontes();

  it('fontes vêm só das lições com grupos de ditado, com ids únicos', () => {
    expect(fontes.length).toBeGreaterThan(0);
    expect(new Set(fontes.map((f) => f.id)).size).toBe(fontes.length);
  });

  it('gera da fonte escolhida, sem repetir, até a quantidade', () => {
    fc.assert(
      fc.property(fc.subarray(fontes.map((f) => f.id), { minLength: 1 }), fc.integer({ min: 1, max: 30 }), (fonteIds, quantidade) => {
        const itens = gerarKakitori({ fonteIds, quantidade } as never);
        expect(itens.length).toBe(Math.min(quantidade, contarKakitori(fonteIds)));
        expect(new Set(itens.map((i) => i.id)).size).toBe(itens.length);
        for (const i of itens) {
          expect(i.audioText.trim()).not.toBe('');
          expect(conteudoDoItem('kakitori', i.id), i.id).toBeDefined();
        }
      }),
      { numRuns: 30 }
    );
  });
});

describe('Gramática em contexto', () => {
  it('lerFrase separa antes/lacuna/depois e junta romaji com espaço', () => {
    expect(lerFrase('わたし|watashi [は|wa] がくせい|gakusei じゃない|ja nai です|desu')).toEqual({
      antes: [{ texto: 'わたし', romaji: 'watashi' }],
      correta: { texto: 'は', romaji: 'wa' },
      depois: [
        { texto: 'がくせい', romaji: 'gakusei' },
        { texto: 'じゃない', romaji: 'ja nai' },
        { texto: 'です', romaji: 'desu' },
      ],
    });
  });

  it('perguntas dos pontos escolhidos, alternativas com a correta, sem repetir', () => {
    const pontos = PONTOS_GRAMATICA.map((p) => p.id);
    fc.assert(
      fc.property(fc.subarray(pontos, { minLength: 1 }), fc.integer({ min: 1, max: 30 }), (ids, n) => {
        const perguntas = gerarGramatica(ids, n);
        expect(perguntas.length).toBe(Math.min(n, contarFrases(ids)));
        expect(new Set(perguntas.map((p) => p.id)).size).toBe(perguntas.length);
        for (const p of perguntas) {
          expect(p.alternativas).toContain(p.correta);
          expect(new Set(p.alternativas).size).toBe(p.alternativas.length);
          expect(conteudoDoItem('gramatica', p.id)).toBeDefined();
        }
      }),
      { numRuns: 30 }
    );
  });
});

describe('Diga em japonês', () => {
  beforeEach(limparBanco);

  it('frases das lições escolhidas, sem repetir', () => {
    const ids = licoesComFrases().map((l) => l.meta.id);
    expect(ids.length).toBeGreaterThan(0);
    const itens = gerarDiga(ids, 9999);
    expect(itens.length).toBe(contarDiga(ids));
    expect(new Set(itens.map((i) => i.id)).size).toBe(itens.length);
    for (const i of itens) expect(conteudoDoItem('diga', i.id), i.id).toBeDefined();
  });

  it('exibição: partícula grudada na palavra anterior; áudio sem espaços; romaji com espaços', () => {
    const tokens = [
      { texto: 'たなかさん', romaji: 'tanaka-san' },
      { texto: 'は', romaji: 'wa' },
      { texto: 'せんせい', romaji: 'sensei' },
      { texto: 'です', romaji: 'desu' },
    ];
    expect(kanaExibicao(tokens)).toBe('たなかさんは せんせい です');
    expect(kanaAudio(tokens)).toBe('たなかさんはせんせいです');
    expect(romaji(tokens)).toBe('tanaka-san wa sensei desu');
  });

  it('salvar frases erradas cria cards já em "Sei dizer", sem duplicar', async () => {
    const [a, b] = gerarDiga(licoesComFrases().map((l) => l.meta.id), 2);
    expect(await salvarFrasesComoCards([a, b])).toBe(2);
    expect(await salvarFrasesComoCards([a])).toBe(0);
    const cards = await db.cards.toArray();
    expect(cards).toHaveLength(2);
    expect(cards.every((c) => cardStage(c) === 'seiDizer' && c.category === 'Frases')).toBe(true);
  });
});
