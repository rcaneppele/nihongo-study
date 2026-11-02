import { useLiveQuery } from 'dexie-react-hooks';
import { BookOpen, BookOpenText, Ear, Headphones, MessageCircle, Mic, PenLine, Sparkles } from 'lucide-react';
import {
  db,
  type Card,
  type ExerciseResult,
  type KanaProgress,
  type KanjiProgress,
  type LessonProgress,
  type ReadingProgress,
  type WordKnowledge,
} from '../../db/schema';
import { LICOES } from '../../licoes';
import { trilhaDeLicoes } from '../licoes/progresso';
import { KANJI_N5 } from '../../data/kanji';
import { familyPreview } from '../../data/kana';
import { buildReviewQueue } from '../flashcards/stages';
import { buildVocabulary, byUsefulness } from '../flashcards/vocabulary';
import { useKnownWords, type KnownWords } from '../leitura/knowledge';
import { porqueDoTexto, recomendarTexto } from '../leitura/recomendacao';
import { desempenhoPorFamilia } from '../kana/desempenho';
import { IconKana, IconKanji } from '../../components/IconesJp';
import type { Cor } from '../../lib/cores';
import type { HabilidadeId, Icone } from './estrutura';

/**
 * "Próximo passo" de cada hub do método: uma ação recomendada, calculada só
 * com dados que o app já guarda (nenhum registro novo). Regras em
 * regras-negocio.md §5d.
 */
export interface Passo {
  titulo: string;
  porque: string;
  to: string;
  icone: Icone;
  cor: Cor;
}

export type AlvoPasso = 'aprender' | 'praticar' | HabilidadeId;

export interface Dados {
  cards: Card[];
  knowledge: WordKnowledge[];
  leituras: ReadingProgress[];
  kana: KanaProgress[];
  kanji: KanjiProgress[];
  licoes: LessonProgress[];
  /** Resultados do "Diga em japonês". */
  diga: ExerciseResult[];
}

const DIA_MS = 24 * 60 * 60 * 1000;
const LOTE_PALAVRAS = 10;
/** Sem estudar lição há mais que isso, a próxima lição da trilha passa na frente das palavras. */
const INTERVALO_LICAO_MS = 3 * DIA_MS;
/** Janela dos erros do "Diga em japonês" que o próximo passo de Falar considera. */
const JANELA_ERROS_DIGA_MS = 14 * DIA_MS;

function passoLicao(licoes: LessonProgress[], porqueExtra: string): Passo | null {
  const progresso = new Map(licoes.map((l) => [l.lessonId, l]));
  const { concluidas, total, proxima } = trilhaDeLicoes(progresso);
  if (!proxima) return null;
  const continuar = progresso.has(proxima.meta.id);
  return {
    titulo: `${continuar ? 'Continuar' : 'Estudar'} a lição "${proxima.meta.title}"`,
    porque: `É a próxima da sua trilha (${concluidas} de ${total} concluídas). ${porqueExtra}`,
    to: `/licoes/${proxima.meta.id}`,
    icone: BookOpen,
    cor: 'fuji',
  };
}

function passoAprender({ cards, knowledge, kanji, licoes }: Dados, now: number): Passo {
  const { ultimoEstudo } = trilhaDeLicoes(new Map(licoes.map((l) => [l.lessonId, l])));
  if (now - ultimoEstudo > INTERVALO_LICAO_MS) {
    const licao = passoLicao(
      licoes,
      'As lições explicam a gramática que as palavras e os textos usam — vale alternar com as palavras novas.'
    );
    if (licao) return licao;
  }
  const novas = buildVocabulary(cards, knowledge)
    .filter((w) => w.state === 'nova')
    .sort(byUsefulness);
  if (novas.length > 0) {
    const n = Math.min(LOTE_PALAVRAS, novas.length);
    const primeira = novas[0];
    return {
      titulo: `Aprender ${n} palavra(s) nova(s)`,
      porque: `A próxima mais útil é ${primeira.entry.front} (${primeira.entry.back})${
        primeira.texts.length > 0 ? ` — aparece em ${primeira.texts.length} texto(s) de leitura` : ''
      }.`,
      to: '/aprender/palavras',
      icone: Sparkles,
      cor: 'sora',
    };
  }
  const kanjiNovos = KANJI_N5.length - kanji.length;
  if (kanjiNovos > 0) {
    return {
      titulo: 'Aprender kanji novos',
      porque: `Você já passou por todo o vocabulário N5 sem kanji. Ainda há ${kanjiNovos} kanji do N5 para conhecer.`,
      to: '/kanji',
      icone: IconKanji,
      cor: 'hanko',
    };
  }
  const licao = passoLicao(licoes, 'Você já viu todo o vocabulário e os kanji do N5 — siga com a gramática.');
  if (licao) return licao;
  return {
    titulo: 'Revisitar uma lição',
    porque: 'Você já viu todo o vocabulário e os kanji do N5. Releia as lições para aprofundar a gramática.',
    to: '/licoes',
    icone: BookOpen,
    cor: 'fuji',
  };
}

function passoLer({ leituras }: Dados, known: KnownWords, now: number): Passo {
  const t = recomendarTexto(known, leituras, { agora: now });
  if (!t) return { titulo: 'Ler um texto', porque: porqueDoTexto(0), to: '/leitura', icone: BookOpenText, cor: 'matcha' };
  return {
    titulo: `Ler 「${t.texto.title}」`,
    porque: porqueDoTexto(t.percent),
    to: `/leitura/${t.texto.id}`,
    icone: BookOpenText,
    cor: 'matcha',
  };
}

function passoOuvir({ leituras }: Dados, known: KnownWords, now: number): Passo {
  const t = recomendarTexto(known, leituras, { soLidos: true, agora: now });
  if (t) {
    return {
      titulo: `Escutar 「${t.texto.title}」 sem ler`,
      porque: `Você já leu esse texto${t.timesRead > 1 ? ` ${t.timesRead}×` : ''}. Agora tente entender só de ouvido — conteúdo conhecido é o melhor treino de escuta.`,
      to: `/leitura/${t.texto.id}?modo=ouvir`,
      icone: Ear,
      cor: 'sora',
    };
  }
  return {
    titulo: 'Fazer um ditado',
    porque: 'Você ainda não terminou nenhum texto de leitura — comece a escuta pelo ditado de palavras e frases das lições.',
    to: '/licoes/kakitori',
    icone: Headphones,
    cor: 'sora',
  };
}

/** Lição com mais frases erradas no "Diga em japonês" nos últimos dias. */
function licaoComMaisErros(diga: ExerciseResult[], now: number): { id: string; erros: number } | null {
  const desde = now - JANELA_ERROS_DIGA_MS;
  const erros = new Map<string, number>();
  for (const r of diga) {
    if (r.doneAt < desde || r.score === undefined || r.score >= 1 || !r.lessonId) continue;
    erros.set(r.lessonId, (erros.get(r.lessonId) ?? 0) + 1);
  }
  let pior: { id: string; erros: number } | null = null;
  for (const [id, n] of erros) if (!pior || n > pior.erros) pior = { id, erros: n };
  return pior;
}

function passoFalar({ cards, leituras, diga }: Dados, known: KnownWords, now: number): Passo {
  const producao = buildReviewQueue(cards, now).filter((i) => i.direction === 'production').length;
  if (producao > 0) {
    return {
      titulo: `Dizer ${producao} palavra(s) em japonês`,
      porque: 'Estão vencidas na direção "dizer em japonês" — entram na Revisão do dia, junto com o resto.',
      to: '/revisar',
      icone: MessageCircle,
      cor: 'sakura',
    };
  }
  const pior = licaoComMaisErros(diga, now);
  const licao = pior && LICOES.find((l) => l.meta.id === pior.id);
  if (pior && licao) {
    return {
      titulo: `Diga em japonês: ${licao.meta.title}`,
      porque: `Você errou ${pior.erros} frase(s) dessa lição nos últimos dias — treine de novo enquanto está fresco.`,
      to: `/licoes/diga?licao=${licao.meta.id}`,
      icone: MessageCircle,
      cor: 'fuji',
    };
  }
  const t = recomendarTexto(known, leituras, { soLidos: true, agora: now });
  if (t) {
    return {
      titulo: `Shadowing de 「${t.texto.title}」`,
      porque: 'Um texto que você já leu: repita cada frase logo depois do áudio, imitando ritmo e entonação.',
      to: `/leitura/${t.texto.id}?modo=shadowing`,
      icone: Mic,
      cor: 'sakura',
    };
  }
  return {
    titulo: 'Diga em japonês',
    porque: 'Monte frases inteiras das lições em voz alta, partindo do português.',
    to: '/licoes/diga',
    icone: MessageCircle,
    cor: 'fuji',
  };
}

function passoEscrever({ kana, kanji }: Dados): Passo {
  const desempenho = desempenhoPorFamilia(kana, 'hiragana', 'desenho');
  let pior: { key: string; taxa: number } | null = null;
  for (const [key, d] of desempenho) {
    if (d.taxa < 0.85 && (!pior || d.taxa < pior.taxa)) pior = { key, taxa: d.taxa };
  }
  if (pior) {
    return {
      titulo: `Redesenhar a família ${familyPreview('hiragana', pior.key)}`,
      porque: `É a família de hiragana com a nota de desenho mais baixa (${Math.round(pior.taxa * 100)}%).`,
      to: '/kana?modo=desenho',
      icone: IconKana,
      cor: 'kin',
    };
  }
  const semDesenho = kanji.filter((k) => k.drawBest === undefined).length;
  if (semDesenho > 0) {
    return {
      titulo: 'Caligrafia de kanji',
      porque: `${semDesenho} kanji que você já aprendeu ainda não foram desenhados nenhuma vez.`,
      to: '/kanji?modo=caligrafia',
      icone: IconKanji,
      cor: 'hanko',
    };
  }
  if (desempenho.size === 0) {
    return {
      titulo: 'Desenhar o hiragana',
      porque: 'Você ainda não desenhou nenhum kana. Desenhar com a ordem de traços certa fixa a forma de cada um.',
      to: '/kana?modo=desenho',
      icone: IconKana,
      cor: 'kin',
    };
  }
  return {
    titulo: 'Ditado escrito à mão',
    porque: 'Seu desenho de kana está em dia. Treine escrevendo o que ouve no ditado.',
    to: '/licoes/kakitori?modo=desenhar',
    icone: PenLine,
    cor: 'kin',
  };
}

/**
 * Praticar (as 4 habilidades): input primeiro — sem leitura concluída nos
 * últimos 2 dias, o passo é ler; senão, escutar um texto já lido.
 */
function passoPraticar(dados: Dados, known: KnownWords, now: number): Passo {
  const ultimaLeitura = Math.max(0, ...dados.leituras.map((l) => l.lastReadAt));
  return now - ultimaLeitura > 2 * DIA_MS ? passoLer(dados, known, now) : passoOuvir(dados, known, now);
}

export function calcularPasso(alvo: AlvoPasso, dados: Dados, known: KnownWords, now: number = Date.now()): Passo {
  switch (alvo) {
    case 'aprender':
      return passoAprender(dados, now);
    case 'praticar':
      return passoPraticar(dados, known, now);
    case 'ler':
      return passoLer(dados, known, now);
    case 'ouvir':
      return passoOuvir(dados, known, now);
    case 'falar':
      return passoFalar(dados, known, now);
    case 'escrever':
      return passoEscrever(dados);
  }
}

export function useProximoPasso(alvo: AlvoPasso): Passo | undefined {
  const known = useKnownWords();
  const dados = useLiveQuery(async () => {
    const [cards, knowledge, leituras, kana, kanji, licoes, diga] = await Promise.all([
      db.cards.toArray(),
      db.wordKnowledge.toArray(),
      db.readingProgress.toArray(),
      db.kanaProgress.toArray(),
      db.kanjiProgress.toArray(),
      db.lessonProgress.toArray(),
      db.exerciseResults.where('kind').equals('diga').toArray(),
    ]);
    return { cards, knowledge, leituras, kana, kanji, licoes, diga };
  }, []);
  if (!dados || !known) return undefined;
  return calcularPasso(alvo, dados, known);
}

