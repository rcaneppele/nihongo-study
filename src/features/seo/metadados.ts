import { matchRoutes } from 'react-router-dom';
import { LICOES } from '../../licoes';
import { LEITURA_TEXTOS, NIVEIS_LEITURA, rotuloNivel } from '../../data/leitura/textos';
import { KANJI_N5 } from '../../data/kanji';
import { N5_DECK } from '../../data/seed/n5';
import { HABILIDADES, LISTA_HABILIDADES, type HabilidadeId } from '../metodo/estrutura';
import { SITE, urlDoSite } from '../../lib/site';

/**
 * Título, descrição e indexação de cada tela — o que os buscadores leem do
 * app. O app é uma SPA (toda rota recebe o mesmo `index.html`), então é o
 * próprio app que aplica isto ao trocar de tela (`MetadadosDaPagina.tsx`); o
 * Google lê ao renderizar a página. Também gera o `sitemap.xml` e o
 * `llms.txt` (`arquivosPublicos.ts`), com as mesmas páginas.
 */

export interface MetadadosDaPagina {
  /** Texto do `<title>`, já com o nome do app. */
  titulo: string;
  descricao: string;
  /**
   * Falso nas telas que só mostram dados do próprio usuário (para um buscador
   * são páginas vazias) e em endereço que não existe.
   */
  indexar: boolean;
}

interface Pagina {
  /** Nome da tela no título da aba; sem ele, vale o título do site (página inicial). */
  titulo?: string;
  descricao?: string;
  indexar: boolean;
}

interface PaginaComParametro {
  /** Endereço de cada valor existente do parâmetro (para o sitemap). */
  caminhos: () => string[];
  /** Metadados para um valor do parâmetro; `undefined` se ele não existe (ex.: lição apagada). */
  pagina: (parametro: string) => Pagina | undefined;
}

const NAO_ENCONTRADA: Pagina = { titulo: 'Página não encontrada', indexar: false };

/** "Os dois alfabetos" → "os dois alfabetos" (sem mexer em sigla, como "N5"). */
function minusculaInicial(texto: string): string {
  return /^\p{Lu}\p{Ll}/u.test(texto) ? texto[0].toLowerCase() + texto.slice(1) : texto;
}

/** "mais de 700": número arredondado para baixo, que não fica velho a cada palavra nova. */
export function maisDe(n: number): string {
  return `mais de ${Math.floor(n / 10) * 10}`;
}

/**
 * Uma entrada por rota de `src/rotas.ts` (o teste confere). As telas de
 * dados pessoais (revisão, progresso, cards, configurações) ficam fora do
 * índice: para quem chega por um buscador, estariam vazias.
 */
export const PAGINAS: Record<string, Pagina | PaginaComParametro> = {
  '/': { indexar: true },
  '/aprender': {
    titulo: 'Aprender',
    descricao:
      'Por onde aprender japonês do zero: lições em português, as palavras do JLPT N5, kanji com radical e mnemônico e os alfabetos hiragana e katakana.',
    indexar: true,
  },
  '/aprender/comecar': {
    titulo: 'Começando do zero no japonês',
    descricao:
      'Guia para quem nunca estudou japonês: como o idioma funciona, por onde começar e como usar o app, em uns dez minutos de leitura.',
    indexar: true,
  },
  '/aprender/palavras': {
    titulo: 'Palavras novas do N5',
    descricao: `As ${maisDe(N5_DECK.length)} palavras do JLPT N5 por tema, com o significado em português. Aprenda de 10 em 10 e revise com flash cards de repetição espaçada.`,
    indexar: true,
  },
  '/licoes': {
    titulo: 'Lições de japonês',
    descricao:
      'Lições de japonês para iniciantes, escritas em português: gramática, vocabulário e cultura, com exemplos em kana e romaji.',
    indexar: true,
  },
  '/licoes/:id': {
    caminhos: () => LICOES.map((l) => `/licoes/${l.meta.id}`),
    pagina: (id) => {
      const licao = LICOES.find((l) => l.meta.id === id);
      if (!licao) return undefined;
      const { title, subtitle } = licao.meta;
      return {
        titulo: `${title} — lição de japonês`,
        descricao: `Lição de japonês para iniciantes, em português: ${title} (${minusculaInicial(subtitle)}). Com exemplos em kana e romaji.`,
        indexar: true,
      };
    },
  },
  '/licoes/quiz': {
    titulo: 'Quiz das lições',
    descricao:
      'Quiz de japonês gerado das lições que você escolher: ordem da frase, partículas, significado e outros tipos de pergunta.',
    indexar: true,
  },
  '/licoes/kakitori': {
    titulo: 'Kakitori — ditado em japonês',
    descricao:
      'Ditado em japonês (kakitori): ouça palavras e frases das lições e escreva o que entendeu, digitando ou à mão.',
    indexar: true,
  },
  '/licoes/diga': {
    titulo: 'Diga em japonês',
    descricao:
      'Treino de conversação: veja uma frase em português, diga em japonês em voz alta e confira com a resposta e o áudio.',
    indexar: true,
  },
  '/licoes/gramatica': {
    titulo: 'Gramática em contexto',
    descricao:
      'Exercícios de gramática japonesa com frases novas para completar: mostram se você entendeu a regra ou só decorou o exemplo.',
    indexar: true,
  },
  '/licoes/diario': {
    titulo: 'Diário guiado em japonês',
    descricao:
      'Diário guiado em japonês: propostas de escrita para cada lição, com um checklist para conferir o que você escreveu.',
    indexar: true,
  },
  '/leitura': {
    titulo: 'Leitura graduada em japonês',
    descricao: `${LEITURA_TEXTOS.length} textos curtos em japonês, em ${NIVEIS_LEITURA.length} níveis (do só kana ao N4), com furigana, áudio e o significado de cada palavra.`,
    indexar: true,
  },
  '/leitura/:id': {
    caminhos: () => LEITURA_TEXTOS.map((t) => `/leitura/${t.id}`),
    pagina: (id) => {
      const texto = LEITURA_TEXTOS.find((t) => t.id === id);
      if (!texto) return undefined;
      return {
        titulo: `${texto.title} — leitura em japonês`,
        descricao: `${texto.summaryPt} Texto graduado em japonês (${minusculaInicial(rotuloNivel(texto.level))}), com furigana, áudio e o significado de cada palavra.`,
        indexar: true,
      };
    },
  },
  '/kana': {
    titulo: 'Treino de hiragana e katakana',
    descricao:
      'Treine hiragana e katakana digitando o romaji ou desenhando à mão: o app confere a forma e a ordem dos traços.',
    indexar: true,
  },
  '/kanji': {
    titulo: 'Kanji do N5',
    descricao: `${KANJI_N5.length} kanji do JLPT N5 com radical, mnemônico, leituras e exemplos, revisão espaçada e treino de caligrafia com a ordem dos traços.`,
    indexar: true,
  },
  '/praticar': {
    titulo: 'Praticar japonês',
    descricao:
      'Pratique japonês nas quatro habilidades — ler, ouvir, falar e escrever — com textos graduados, ditado, shadowing e caligrafia.',
    indexar: true,
  },
  '/praticar/:habilidade': {
    caminhos: () => LISTA_HABILIDADES.map((h) => `/praticar/${h.id}`),
    pagina: (id) => {
      const h = Object.hasOwn(HABILIDADES, id) ? HABILIDADES[id as HabilidadeId] : undefined;
      return h && { titulo: `${h.label} em japonês`, descricao: h.porque, indexar: true };
    },
  },
  '/revisar': { titulo: 'Revisar', indexar: false },
  '/flashcards': { titulo: 'Meus cards', indexar: false },
  '/pontos-fracos': { titulo: 'Pontos fracos', indexar: false },
  '/progresso': { titulo: 'Progresso', indexar: false },
  '/config': { titulo: 'Configurações', indexar: false },
};

const ROTAS = Object.keys(PAGINAS).map((path) => ({ path }));

function temParametro(p: Pagina | PaginaComParametro): p is PaginaComParametro {
  return 'pagina' in p;
}

/** Título, descrição e indexação da tela num endereço (só o caminho, sem `?…`). */
export function metadadosDaRota(pathname: string): MetadadosDaPagina {
  const achada = matchRoutes(ROTAS, pathname)?.[0];
  let pagina: Pagina = NAO_ENCONTRADA;
  if (achada) {
    const entrada = PAGINAS[achada.route.path];
    const parametro = Object.values(achada.params)[0] ?? '';
    pagina = (temParametro(entrada) ? entrada.pagina(parametro) : entrada) ?? NAO_ENCONTRADA;
  }
  return {
    titulo: pagina.titulo ? `${pagina.titulo} · ${SITE.nome}` : SITE.titulo,
    descricao: pagina.descricao ?? SITE.descricao,
    indexar: pagina.indexar,
  };
}

/**
 * Endereço canônico de uma tela: o de produção, sem `?…` nem barra no fim.
 * Junta as variações de um mesmo endereço (ex.: `/kana?modo=desenho` é a
 * página `/kana`) e vale mesmo com o app aberto em outro endereço.
 */
export function urlCanonica(pathname: string): string {
  return urlDoSite(pathname.replace(/\/+$/, '') || '/');
}

/** Todas as telas que entram no índice dos buscadores, na ordem das rotas. */
export function caminhosIndexaveis(): string[] {
  return Object.entries(PAGINAS).flatMap(([path, entrada]) => {
    if (!temParametro(entrada)) return entrada.indexar ? [path] : [];
    return entrada.caminhos().filter((caminho) => metadadosDaRota(caminho).indexar);
  });
}
