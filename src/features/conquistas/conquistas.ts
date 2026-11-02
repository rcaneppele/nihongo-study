import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../db/schema';
import { HIRAGANA_KANA, KATAKANA_KANA } from '../../data/kana';
import { KANJI_N5 } from '../../data/kanji';
import { LEITURA_TEXTOS } from '../../data/leitura/textos';
import { N5_DECK } from '../../data/seed/n5';
import { LICOES } from '../../licoes';
import type { Cor } from '../../lib/cores';
import { buildVocabulary } from '../flashcards/vocabulary';
import { palavrasConhecidas } from '../leitura/knowledge';
import { diasEstudados, sequenciaDeDias } from '../atividade/atividade';

/**
 * Conquistas locais: marcos calculados só com o que o app já guarda (sem
 * ranking nem comparação — app de um usuário). Uma conquista vale quando o
 * número dela chega à meta; a data em que isso foi visto pela primeira vez
 * fica em `db.achievements` (sincronizada; fica a mais antiga).
 */
export interface Numeros {
  compreendidas: number;
  seiDizer: number;
  n5: number;
  hiragana: number;
  katakana: number;
  kanji: number;
  textosLidos: number;
  sequencia: number;
  revisoes: number;
  licoesConcluidas: number;
  escutas: number;
  shadowings: number;
  diario: number;
  acertosLicoes: number;
}

export type GrupoConquista = 'Vocabulário' | 'Escrita' | 'Leitura' | 'Constância' | 'Lições' | 'Prática';

export interface Conquista {
  id: string;
  titulo: string;
  descricao: string;
  grupo: GrupoConquista;
  cor: Cor;
  meta: number;
  numero: keyof Numeros;
}

export const CONQUISTAS: Conquista[] = [
  { id: 'palavras-50', titulo: '50 palavras', descricao: '50 palavras compreendidas.', grupo: 'Vocabulário', cor: 'matcha', meta: 50, numero: 'compreendidas' },
  { id: 'palavras-200', titulo: '200 palavras', descricao: '200 palavras compreendidas.', grupo: 'Vocabulário', cor: 'matcha', meta: 200, numero: 'compreendidas' },
  { id: 'palavras-500', titulo: '500 palavras', descricao: '500 palavras compreendidas.', grupo: 'Vocabulário', cor: 'matcha', meta: 500, numero: 'compreendidas' },
  { id: 'dizer-25', titulo: 'Já sei dizer', descricao: '25 palavras no estágio Sei dizer ou Domino.', grupo: 'Vocabulário', cor: 'sora', meta: 25, numero: 'seiDizer' },
  { id: 'dizer-100', titulo: 'Vocabulário ativo', descricao: '100 palavras no estágio Sei dizer ou Domino.', grupo: 'Vocabulário', cor: 'sora', meta: 100, numero: 'seiDizer' },
  { id: 'n5-completo', titulo: 'N5 completo', descricao: 'Todas as palavras do deck N5 reconhecidas (ou marcadas como "Já sei").', grupo: 'Vocabulário', cor: 'sora', meta: N5_DECK.length, numero: 'n5' },
  { id: 'hiragana', titulo: 'Todo o hiragana', descricao: `Acertou cada um dos ${HIRAGANA_KANA.length} hiragana (com dakuten e combinados) pelo menos uma vez.`, grupo: 'Escrita', cor: 'kin', meta: HIRAGANA_KANA.length, numero: 'hiragana' },
  { id: 'katakana', titulo: 'Todo o katakana', descricao: `Acertou cada um dos ${KATAKANA_KANA.length} katakana pelo menos uma vez.`, grupo: 'Escrita', cor: 'kin', meta: KATAKANA_KANA.length, numero: 'katakana' },
  { id: 'kanji-10', titulo: 'Primeiros kanji', descricao: '10 kanji aprendidos.', grupo: 'Escrita', cor: 'hanko', meta: 10, numero: 'kanji' },
  { id: 'kanji-50', titulo: '50 kanji', descricao: '50 kanji aprendidos.', grupo: 'Escrita', cor: 'hanko', meta: 50, numero: 'kanji' },
  { id: 'kanji-n5', titulo: 'Kanji do N5', descricao: `Todos os ${KANJI_N5.length} kanji do N5 aprendidos.`, grupo: 'Escrita', cor: 'hanko', meta: KANJI_N5.length, numero: 'kanji' },
  { id: 'leitura-1', titulo: 'Primeira leitura', descricao: 'Um texto lido até o fim.', grupo: 'Leitura', cor: 'matcha', meta: 1, numero: 'textosLidos' },
  { id: 'leitura-10', titulo: 'Leitor', descricao: '10 textos diferentes lidos.', grupo: 'Leitura', cor: 'matcha', meta: 10, numero: 'textosLidos' },
  { id: 'leitura-todas', titulo: 'Biblioteca inteira', descricao: `Todos os ${LEITURA_TEXTOS.length} textos de leitura lidos.`, grupo: 'Leitura', cor: 'matcha', meta: LEITURA_TEXTOS.length, numero: 'textosLidos' },
  { id: 'sequencia-7', titulo: 'Uma semana', descricao: '7 dias seguidos de estudo.', grupo: 'Constância', cor: 'hanko', meta: 7, numero: 'sequencia' },
  { id: 'sequencia-30', titulo: 'Um mês', descricao: '30 dias seguidos de estudo.', grupo: 'Constância', cor: 'hanko', meta: 30, numero: 'sequencia' },
  { id: 'sequencia-100', titulo: 'Cem dias', descricao: '100 dias seguidos de estudo.', grupo: 'Constância', cor: 'hanko', meta: 100, numero: 'sequencia' },
  { id: 'revisoes-100', titulo: '100 revisões', descricao: '100 revisões de flash cards.', grupo: 'Constância', cor: 'sora', meta: 100, numero: 'revisoes' },
  { id: 'revisoes-1000', titulo: '1000 revisões', descricao: '1000 revisões de flash cards.', grupo: 'Constância', cor: 'sora', meta: 1000, numero: 'revisoes' },
  { id: 'licao-1', titulo: 'Primeira lição', descricao: 'Uma lição marcada como concluída.', grupo: 'Lições', cor: 'fuji', meta: 1, numero: 'licoesConcluidas' },
  { id: 'licoes-todas', titulo: 'Trilha completa', descricao: `Todas as ${LICOES.length} lições concluídas.`, grupo: 'Lições', cor: 'fuji', meta: LICOES.length, numero: 'licoesConcluidas' },
  { id: 'acertos-100', titulo: '100 acertos', descricao: '100 acertos em quiz, ditado, gramática e "Diga em japonês".', grupo: 'Lições', cor: 'fuji', meta: 100, numero: 'acertosLicoes' },
  { id: 'escuta-10', titulo: 'Ouvido treinado', descricao: '10 escutas com o texto escondido.', grupo: 'Prática', cor: 'sora', meta: 10, numero: 'escutas' },
  { id: 'shadowing-10', titulo: 'Sombra', descricao: '10 shadowings de texto inteiro.', grupo: 'Prática', cor: 'sakura', meta: 10, numero: 'shadowings' },
  { id: 'diario-7', titulo: 'Diário em dia', descricao: '7 entradas no diário guiado.', grupo: 'Prática', cor: 'kin', meta: 7, numero: 'diario' },
];

export async function carregarNumeros(): Promise<Numeros> {
  const [cards, knowledge, kana, kanji, leituras, atividades, reviews, licoes, exercicios, diario] = await Promise.all([
    db.cards.toArray(),
    db.wordKnowledge.toArray(),
    db.kanaProgress.toArray(),
    db.kanjiProgress.count(),
    db.readingProgress.toArray(),
    db.activity.toArray(),
    db.reviews.toArray(),
    db.lessonProgress.toArray(),
    db.exerciseResults.toArray(),
    db.journal.count(),
  ]);

  const { understood, canSay } = palavrasConhecidas(knowledge, cards, reviews);
  const reconhecidos = new Set(kana.filter((k) => k.romajiCorrect > 0 || (k.choiceCorrect ?? 0) > 0).map((k) => k.char));
  const textos = new Set(LEITURA_TEXTOS.map((t) => t.id));
  const idsLicoes = new Set(LICOES.map((l) => l.meta.id));

  return {
    compreendidas: understood.size,
    seiDizer: canSay.size,
    n5: buildVocabulary(cards, knowledge).filter((w) => w.state !== 'nova' && w.state !== 'naFila').length,
    hiragana: HIRAGANA_KANA.filter((k) => reconhecidos.has(k.char)).length,
    katakana: KATAKANA_KANA.filter((k) => reconhecidos.has(k.char)).length,
    kanji,
    textosLidos: leituras.filter((l) => textos.has(l.textId)).length,
    sequencia: sequenciaDeDias(diasEstudados(atividades, reviews)),
    revisoes: reviews.length,
    licoesConcluidas: licoes.filter((l) => l.completedAt !== undefined && idsLicoes.has(l.lessonId)).length,
    escutas: exercicios.filter((r) => r.kind === 'escuta').length,
    shadowings: exercicios.filter((r) => r.kind === 'shadowing').length,
    diario,
    acertosLicoes: exercicios.filter((r) => r.kind !== 'escuta' && r.kind !== 'shadowing' && r.score === 1).length,
  };
}

/**
 * Confere as metas e grava as conquistas novas (com a data de agora).
 * Devolve as que acabaram de ser desbloqueadas.
 */
export async function avaliarConquistas(): Promise<Conquista[]> {
  const numeros = await carregarNumeros();
  const jaTem = new Set((await db.achievements.toArray()).map((a) => a.id));
  const novas = CONQUISTAS.filter((c) => !jaTem.has(c.id) && numeros[c.numero] >= c.meta);
  if (novas.length > 0) {
    const now = Date.now();
    await db.achievements.bulkPut(novas.map((c) => ({ id: c.id, unlockedAt: now })));
  }
  return novas;
}

export interface EstadoConquista {
  conquista: Conquista;
  valor: number;
  unlockedAt?: number;
}

/** Todas as conquistas com o número atual e a data, se já desbloqueada — pra página Progresso. */
export function useConquistas(): EstadoConquista[] | undefined {
  return useLiveQuery(async () => {
    const [numeros, desbloqueadas] = await Promise.all([carregarNumeros(), db.achievements.toArray()]);
    const quando = new Map(desbloqueadas.map((a) => [a.id, a.unlockedAt]));
    return CONQUISTAS.map((c) => ({ conquista: c, valor: numeros[c.numero], unlockedAt: quando.get(c.id) }));
  }, []);
}
