import type { ComponentType } from 'react';
import {
  BookOpen,
  BookOpenText,
  CalendarClock,
  ChartColumn,
  Copy,
  Ear,
  Headphones,
  House,
  Layers,
  ListChecks,
  MessageCircle,
  Mic,
  PenLine,
  Sparkles,
  Target,
} from 'lucide-react';
import { IconKana, IconKanji } from '../../components/IconesJp';
import type { Cor } from '../../lib/cores';

/**
 * Estrutura do app organizada pelo **método** (ciclo de aprendizado), não
 * por ferramenta — ver regras-negocio.md §5d:
 *
 *   Hoje → Aprender (conteúdo novo) → Praticar (ler · ouvir · falar ·
 *   escrever) → Revisar (fixar) → Progresso (acompanhar)
 *
 * Fonte única da navegação (barra lateral e inferior) e dos hubs. As telas
 * de cada ferramenta continuam nas rotas de sempre; aqui só se decide onde
 * cada uma aparece — e uma mesma ferramenta pode aparecer em mais de um
 * lugar (ex.: Kakitori em Ouvir e em Escrever).
 */

export type Icone = ComponentType<{ className?: string }>;

/** Contadores de pendência que um item pode mostrar (ver usePendencias). */
export type Pendencia = 'cards' | 'kanji' | 'revisao';

export interface Atividade {
  titulo: string;
  /** Pra que serve / quando usar — uma frase. */
  desc: string;
  to: string;
  icone: Icone;
  cor: Cor;
  pendencia?: Pendencia;
}

export type SecaoId = 'hoje' | 'aprender' | 'praticar' | 'revisar' | 'progresso';

export interface Secao {
  id: SecaoId;
  to: string;
  label: string;
  icone: Icone;
  cor: Cor;
  /** Atalhos que aparecem embaixo da seção na barra lateral do desktop. */
  filhos?: { to: string; label: string }[];
  pendencia?: Pendencia;
}

export type HabilidadeId = 'ler' | 'ouvir' | 'falar' | 'escrever';

export interface Habilidade {
  id: HabilidadeId;
  label: string;
  icone: Icone;
  cor: Cor;
  /** O que é treinar essa habilidade e por que importa. */
  porque: string;
  atividades: Atividade[];
}

export const HABILIDADES: Record<HabilidadeId, Habilidade> = {
  ler: {
    id: 'ler',
    label: 'Ler',
    icone: BookOpenText,
    cor: 'matcha',
    porque:
      'Entender japonês escrito. Ler muito material fácil, no seu nível, é o que mais fixa vocabulário e gramática — e o kana precisa estar automático pra leitura fluir.',
    atividades: [
      {
        titulo: 'Textos graduados',
        desc: 'Textos curtos do seu nível, com furigana. Toque nas palavras que não souber — elas viram candidatas a card.',
        to: '/leitura',
        icone: BookOpenText,
        cor: 'matcha',
      },
      {
        titulo: 'Reconhecer kana',
        desc: 'Se ainda trava em algum hiragana ou katakana, treine digitando o romaji de cada um.',
        to: '/kana?modo=romaji',
        icone: IconKana,
        cor: 'kin',
      },
    ],
  },
  ouvir: {
    id: 'ouvir',
    label: 'Ouvir',
    icone: Headphones,
    cor: 'sora',
    porque:
      'Entender japonês falado. O ouvido precisa de treino próprio: reconhecer palavras na fala corrida, sem o apoio do texto.',
    atividades: [
      {
        titulo: 'Escutar antes de ler',
        desc: 'Os textos abrem com o texto escondido: tente entender só de ouvido, depois confira lendo.',
        to: '/leitura?modo=ouvir',
        icone: Ear,
        cor: 'sora',
      },
      {
        titulo: 'Ditado (Kakitori)',
        desc: 'Ouça uma palavra ou frase das lições e escreva o que entendeu.',
        to: '/licoes/kakitori',
        icone: Headphones,
        cor: 'sora',
      },
      {
        titulo: 'Ouvir acompanhando o texto',
        desc: 'Ouça o texto inteiro com a linha atual destacada — liga o som à escrita.',
        to: '/leitura?modo=acompanhar',
        icone: BookOpenText,
        cor: 'matcha',
      },
    ],
  },
  falar: {
    id: 'falar',
    label: 'Falar',
    icone: Mic,
    cor: 'sakura',
    porque:
      'Produzir japonês. Entender não basta: dizer em voz alta é o que transforma vocabulário passivo em ativo.',
    atividades: [
      {
        titulo: 'Diga em japonês',
        desc: 'Veja uma frase em português e monte-a em japonês, em voz alta. Confira com o áudio.',
        to: '/licoes/diga',
        icone: MessageCircle,
        cor: 'fuji',
      },
      {
        titulo: 'Shadowing',
        desc: 'Os textos abrem no modo Shadowing: repita cada frase logo depois do áudio, imitando o ritmo.',
        to: '/leitura?modo=shadowing',
        icone: Mic,
        cor: 'sakura',
      },
      {
        titulo: 'Dizer as palavras dos seus cards',
        desc: 'Prática livre dos seus cards na direção "dizer em japonês": você vê o português e diz a palavra.',
        to: '/flashcards?praticar=producao',
        icone: Copy,
        cor: 'sora',
      },
    ],
  },
  escrever: {
    id: 'escrever',
    label: 'Escrever',
    icone: PenLine,
    cor: 'kin',
    porque:
      'Escrever à mão, com a ordem de traços certa. Desenhar fixa a forma do caractere muito melhor do que só olhar.',
    atividades: [
      {
        titulo: 'Desenhar kana',
        desc: 'Treino de kana no modo desenho — o app confere a forma e a ordem dos traços.',
        to: '/kana?modo=desenho',
        icone: IconKana,
        cor: 'kin',
      },
      {
        titulo: 'Caligrafia de kanji',
        desc: 'Desenhe os kanji que você já aprendeu, com o traçado de referência como correção.',
        to: '/kanji?modo=caligrafia',
        icone: IconKanji,
        cor: 'hanko',
      },
      {
        titulo: 'Ditado escrito (Kakitori)',
        desc: 'Ouça e escreva à mão o que entendeu (dá pra trocar para digitar).',
        to: '/licoes/kakitori?modo=desenhar',
        icone: PenLine,
        cor: 'kin',
      },
    ],
  },
};

export const ATIVIDADES_APRENDER: Atividade[] = [
  {
    titulo: 'Lições',
    desc: 'Gramática, vocabulário e cultura explicados do zero, com exemplos e romaji. Comece por aqui num assunto novo.',
    to: '/licoes',
    icone: BookOpen,
    cor: 'fuji',
  },
  {
    titulo: 'Palavras novas',
    desc: 'As próximas palavras mais úteis do N5, por tema. Aprenda de 10 em 10 — elas viram flash cards.',
    to: '/aprender/palavras',
    icone: Sparkles,
    cor: 'sora',
  },
  {
    titulo: 'Kanji novos',
    desc: 'Cada kanji do N5 com radical, mnemônico, leituras e exemplos, antes de entrar na revisão.',
    to: '/kanji',
    icone: IconKanji,
    cor: 'hanko',
  },
  {
    titulo: 'Alfabetos (kana)',
    desc: 'Hiragana e katakana: reconhecer cada caractere na hora é a base de todo o resto.',
    to: '/kana',
    icone: IconKana,
    cor: 'kin',
  },
];

/**
 * Atividades de Revisar além da "Revisão do dia" (que encadeia flash cards e
 * kanji vencidos num bloco próprio no topo do hub — ver Revisar.tsx).
 */
export const ATIVIDADES_REVISAR: Atividade[] = [
  {
    titulo: 'Pontos fracos',
    desc: 'O que você mais erra em todo o app, reunido para um reforço rápido.',
    to: '/pontos-fracos',
    icone: Target,
    cor: 'sakura',
  },
  {
    titulo: 'Testar lições (Quiz)',
    desc: 'Perguntas das lições: ordem da frase, partículas, significado. Bom para ver o que ficou.',
    to: '/licoes/quiz',
    icone: ListChecks,
    cor: 'fuji',
  },
  {
    titulo: 'Meus cards',
    desc: 'Ver, buscar, criar e praticar livremente os seus flash cards.',
    to: '/flashcards',
    icone: Layers,
    cor: 'sora',
  },
];

const HABILIDADES_ORDEM: HabilidadeId[] = ['ler', 'ouvir', 'falar', 'escrever'];
export const LISTA_HABILIDADES = HABILIDADES_ORDEM.map((id) => HABILIDADES[id]);

export const SECOES: Secao[] = [
  { id: 'hoje', to: '/', label: 'Hoje', icone: House, cor: 'indigo' },
  {
    id: 'aprender',
    to: '/aprender',
    label: 'Aprender',
    icone: BookOpen,
    cor: 'fuji',
    filhos: [
      { to: '/licoes', label: 'Lições' },
      { to: '/aprender/palavras', label: 'Palavras novas' },
      { to: '/kanji', label: 'Kanji novos' },
      { to: '/kana', label: 'Alfabetos' },
    ],
  },
  {
    id: 'praticar',
    to: '/praticar',
    label: 'Praticar',
    icone: Target,
    cor: 'matcha',
    filhos: LISTA_HABILIDADES.map((h) => ({ to: `/praticar/${h.id}`, label: h.label })),
  },
  {
    id: 'revisar',
    to: '/revisar',
    label: 'Revisar',
    icone: CalendarClock,
    cor: 'sora',
    pendencia: 'revisao',
    filhos: [
      { to: '/revisar', label: 'Revisão do dia' },
      { to: '/pontos-fracos', label: 'Pontos fracos' },
      { to: '/licoes/quiz', label: 'Testar lições' },
      { to: '/flashcards', label: 'Meus cards' },
    ],
  },
  { id: 'progresso', to: '/progresso', label: 'Progresso', icone: ChartColumn, cor: 'kin' },
];

/**
 * A qual seção do menu uma rota pertence — pra destacar o item certo na
 * navegação mesmo dentro das telas de ferramenta (ex.: /leitura/abc está em
 * Praticar). Ferramentas que aparecem em mais de uma seção ficam na seção
 * "principal" delas.
 */
export function secaoDaRota(pathname: string, search = ''): SecaoId | null {
  const p = pathname.replace(/\/+$/, '') || '/';
  const q = new URLSearchParams(search);
  if (p === '/') return 'hoje';
  // Ferramentas abertas num modo de habilidade (pelos hubs de Praticar).
  if ((p === '/kana' && q.get('modo') === 'desenho') || (p === '/kanji' && q.get('modo') === 'caligrafia')) {
    return 'praticar';
  }
  if (p === '/flashcards' && q.get('praticar') === 'producao') return 'praticar';
  if (p.startsWith('/aprender') || p === '/kana' || p === '/kanji') return 'aprender';
  if (p === '/licoes/quiz') return 'revisar';
  if (p === '/licoes/kakitori' || p === '/licoes/diga') return 'praticar';
  if (p.startsWith('/licoes')) return 'aprender';
  if (p === '/flashcards') return 'revisar';
  if (p.startsWith('/praticar') || p.startsWith('/leitura')) return 'praticar';
  if (p.startsWith('/revisar') || p === '/pontos-fracos') return 'revisar';
  if (p.startsWith('/progresso')) return 'progresso';
  // Configurações (e qualquer rota fora do método): nenhuma seção ativa.
  return null;
}
