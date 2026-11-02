import { describe, expect, it } from 'vitest';
import { State } from 'ts-fsrs';
import { N5_DECK } from '../../data/seed/n5';
import { KANJI_N5 } from '../../data/kanji';
import { HIRAGANA_KANA } from '../../data/kana';
import { LEITURA_TEXTOS } from '../../data/leitura/textos';
import { LICOES } from '../../licoes';
import { freshSrs } from '../srs/fsrs';
import { novoCard } from '../flashcards/cards';
import { palavrasConhecidas } from '../leitura/knowledge';
import { calcularPasso, type AlvoPasso, type Dados } from './proximoPasso';
import { AGORA, DIA, umKanaProgress, umKanjiProgress } from '../../test/fabricas';
import type { LessonProgress } from '../../db/schema';

function dados(parcial: Partial<Dados> = {}): Dados {
  return { cards: [], knowledge: [], leituras: [], kana: [], kanji: [], licoes: [], diga: [], ...parcial };
}

const semPalavras = palavrasConhecidas([], [], [], AGORA);
const passo = (alvo: AlvoPasso, d: Partial<Dados> = {}) => calcularPasso(alvo, dados(d), semPalavras, AGORA);
const licaoAberta = (id: string, ha: number, concluida = false): LessonProgress => ({
  lessonId: id,
  viewedAt: AGORA - ha,
  updatedAt: AGORA - ha,
  ...(concluida ? { completedAt: AGORA - ha } : {}),
});
const todasAsPalavras = N5_DECK.map((e) => ({ ...novoCard(e, AGORA - 30 * DIA), state: State.Review, dueDate: AGORA + 30 * DIA }));
const todasAsLicoes = LICOES.map((l) => licaoAberta(l.meta.id, DIA, true));

describe('Próximo passo — Aprender', () => {
  it('sem lição há mais de 3 dias: a próxima lição da trilha', () => {
    expect(passo('aprender')).toMatchObject({ titulo: `Estudar a lição "${LICOES[0].meta.title}"`, to: `/licoes/${LICOES[0].meta.id}` });
    expect(passo('aprender', { licoes: [licaoAberta(LICOES[0].meta.id, 4 * DIA)] }).titulo).toBe(`Continuar a lição "${LICOES[0].meta.title}"`);
  });

  it('com lição recente: palavras novas, até 10', () => {
    expect(passo('aprender', { licoes: [licaoAberta(LICOES[0].meta.id, DIA)] })).toMatchObject({
      titulo: 'Aprender 10 palavra(s) nova(s)',
      to: '/aprender/palavras',
    });
  });

  it('vocabulário N5 acabou: kanji novos; kanji acabaram: a lição; trilha completa: revisitar', () => {
    const recente = [licaoAberta(LICOES[0].meta.id, DIA)];
    expect(passo('aprender', { licoes: recente, cards: todasAsPalavras }).to).toBe('/kanji');
    const kanji = KANJI_N5.map((k) => umKanjiProgress(k.char));
    expect(passo('aprender', { licoes: recente, cards: todasAsPalavras, kanji }).to).toBe(`/licoes/${LICOES[0].meta.id}`);
    expect(passo('aprender', { licoes: todasAsLicoes, cards: todasAsPalavras, kanji }).titulo).toBe('Revisitar uma lição');
  });
});

describe('Próximo passo — Ler, Ouvir e Praticar', () => {
  it('Ler: um texto específico', () => {
    expect(passo('ler').to).toMatch(/^\/leitura\/.+/);
  });

  it('Ouvir: sem texto lido, ditado; com texto lido, escutar sem ler', () => {
    expect(passo('ouvir').to).toBe('/licoes/kakitori');
    const lido = { textId: LEITURA_TEXTOS[0].id, timesRead: 1, lastReadAt: AGORA - 5 * DIA, updatedAt: AGORA };
    expect(passo('ouvir', { leituras: [lido] }).to).toBe(`/leitura/${LEITURA_TEXTOS[0].id}?modo=ouvir`);
  });

  it('Praticar: sem leitura nos últimos 2 dias, ler; senão, ouvir', () => {
    const lido = (ha: number) => ({ textId: LEITURA_TEXTOS[0].id, timesRead: 1, lastReadAt: AGORA - ha, updatedAt: AGORA });
    expect(passo('praticar', { leituras: [lido(3 * DIA)] }).titulo).toMatch(/^Ler/);
    expect(passo('praticar', { leituras: [lido(DIA)] }).titulo).toMatch(/^Escutar/);
  });
});

describe('Próximo passo — Falar', () => {
  it('produções vencidas primeiro (→ Revisão do dia)', () => {
    const card = { ...novoCard({ front: 'ねこ', back: 'gato' }, AGORA - 10 * DIA), state: State.Review, dueDate: AGORA + DIA, production: freshSrs(AGORA - DIA) };
    expect(passo('falar', { cards: [card] })).toMatchObject({ titulo: 'Dizer 1 palavra(s) em japonês', to: '/revisar' });
  });

  it('depois, a lição com mais frases erradas no Diga dos últimos 14 dias', () => {
    const [l1, l2] = LICOES.map((l) => l.meta.id);
    const erro = (lessonId: string, ha: number) => ({ id: `${lessonId}${ha}`, kind: 'diga' as const, itemId: 'x', lessonId, score: 0, doneAt: AGORA - ha });
    const diga = [erro(l1, DIA), erro(l2, DIA), erro(l2, 2 * DIA), erro(l1, 20 * DIA), erro(l1, 21 * DIA)];
    expect(passo('falar', { diga }).to).toBe(`/licoes/diga?licao=${l2}`);
  });

  it('sem erros: shadowing de texto lido; sem texto lido: Diga em japonês', () => {
    const lido = { textId: LEITURA_TEXTOS[0].id, timesRead: 1, lastReadAt: AGORA - 5 * DIA, updatedAt: AGORA };
    expect(passo('falar', { leituras: [lido] }).to).toBe(`/leitura/${LEITURA_TEXTOS[0].id}?modo=shadowing`);
    expect(passo('falar').to).toBe('/licoes/diga');
  });
});

describe('Próximo passo — Escrever', () => {
  it('família de hiragana com pior desenho (< 85%) → kanji sem caligrafia → começar → ditado à mão', () => {
    const familiaA = HIRAGANA_KANA.filter((k) => k.row === 'a');
    const desenhou = (nota: number) => familiaA.map((k) => umKanaProgress(k.char, { drawBest: nota }));
    expect(passo('escrever', { kana: desenhou(50) }).titulo).toContain('Redesenhar a família');
    expect(passo('escrever', { kana: desenhou(90), kanji: [umKanjiProgress('日')] }).to).toBe('/kanji?modo=caligrafia');
    expect(passo('escrever').titulo).toBe('Desenhar o hiragana');
    expect(passo('escrever', { kana: desenhou(90) }).to).toBe('/licoes/kakitori?modo=desenhar');
  });
});
