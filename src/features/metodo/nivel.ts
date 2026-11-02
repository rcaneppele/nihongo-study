import { useLiveQuery } from 'dexie-react-hooks';
import { db, type ExerciseResult, type KanaProgress, type KanjiProgress } from '../../db/schema';
import { ALL_KANA } from '../../data/kana';
import { LEITURA_TEXTOS } from '../../data/leitura/textos';
import { useKnownWords, type KnownWords } from '../leitura/knowledge';
import { CATEGORIA_FRASES } from '../diga/gerador';
import { acertoRecente, JANELA_ACERTO } from '../exercicios/historico';
import type { Cor } from '../../lib/cores';
import type { HabilidadeId } from './estrutura';

/** Um indicador de "Seu nível nesta habilidade" (ver Habilidade.tsx). */
export interface Indicador {
  label: string;
  valor: number | string;
  total?: number;
  cor: Cor;
  hint?: string;
}

export interface Nivel {
  indicadores: Indicador[];
  /** Ressalva quando a habilidade não é medida diretamente pelo app. */
  observacao?: string;
}

function porcento(taxa: number | null): string {
  return taxa === null ? '—' : `${Math.round(taxa * 100)}%`;
}

/**
 * Indicadores de cada habilidade, com o que o app grava: leituras, kana e
 * kanji, e o histórico dos exercícios (`exerciseResults`) — ditado e escuta
 * medem Ouvir; "Diga em japonês" e shadowing medem Falar. Ouvir e Falar são
 * autoavaliados (sem reconhecimento de voz).
 */
export function useNivel(id: HabilidadeId): Nivel | undefined {
  const known = useKnownWords();
  const dados = useLiveQuery(async () => {
    const [leituras, kana, kanji, frases, exercicios, diario] = await Promise.all([
      db.readingProgress.count(),
      db.kanaProgress.toArray(),
      db.kanjiProgress.toArray(),
      db.cards.where('category').equals(CATEGORIA_FRASES).count(),
      db.exerciseResults.where('kind').anyOf(['kakitori', 'escuta', 'diga', 'shadowing']).toArray(),
      db.journal.count(),
    ]);
    return { leituras, kana, kanji, frases, exercicios, diario };
  }, []);
  if (!dados || !known) return undefined;
  return calcularNivel(id, dados, known);
}

/** O que `calcularNivel` lê do banco. */
export interface DadosNivel {
  leituras: number;
  kana: KanaProgress[];
  kanji: KanjiProgress[];
  frases: number;
  exercicios: ExerciseResult[];
  diario: number;
}

export function calcularNivel(id: HabilidadeId, dados: DadosNivel, known: KnownWords): Nivel {
  const { leituras, kana, kanji, frases, exercicios, diario } = dados;
  const escutas = exercicios.filter((r) => r.kind === 'escuta');
  const textosShadowing = new Set(exercicios.filter((r) => r.kind === 'shadowing').map((r) => r.itemId));

  switch (id) {
    case 'ler':
      return {
        indicadores: [
          { label: 'Textos lidos', valor: leituras, total: LEITURA_TEXTOS.length, cor: 'matcha' },
          {
            label: 'Palavras compreendidas',
            valor: known.understood.size,
            cor: 'matcha',
            hint: 'Palavras lidas sem precisar consultar, mais as dos flash cards já revisados.',
          },
          {
            label: 'Kana reconhecidos',
            valor: kana.filter((k) => k.romajiCorrect > 0 || (k.choiceCorrect ?? 0) > 0).length,
            total: ALL_KANA.length,
            cor: 'kin',
            hint: 'Kana que você já acertou pelo menos uma vez digitando o romaji ou na múltipla escolha.',
          },
        ],
      };
    case 'ouvir':
      return {
        indicadores: [
          {
            label: 'Acerto no ditado',
            valor: porcento(acertoRecente(exercicios, 'kakitori')),
            cor: 'sora',
            hint: `Média dos seus últimos ${JANELA_ACERTO} itens de ditado (Kakitori), pela sua própria conferência.`,
          },
          {
            label: 'Entendimento só de ouvido',
            valor: porcento(acertoRecente(exercicios, 'escuta')),
            cor: 'sora',
            hint: `Média das suas últimas escutas com o texto escondido: "quase tudo" vale 100%, "uma parte" 50%, "pouco" 0%. Você já fez ${escutas.length} escuta(s) assim.`,
          },
          {
            label: 'Textos prontos para escutar',
            valor: leituras,
            total: LEITURA_TEXTOS.length,
            cor: 'matcha',
            hint: 'Textos que você já leu — o conteúdo conhecido é o melhor ponto de partida para treinar só de ouvido.',
          },
        ],
        observacao: 'A escuta é autoavaliada: você mesmo confere o ditado e diz quanto entendeu antes de ver o texto.',
      };
    case 'falar':
      return {
        indicadores: [
          {
            label: 'Palavras que sei dizer',
            valor: known.canSay.size,
            cor: 'sora',
            hint: 'Flash cards no estágio Sei dizer ou Domino.',
          },
          {
            label: 'Acerto no "Diga em japonês"',
            valor: porcento(acertoRecente(exercicios, 'diga')),
            cor: 'fuji',
            hint: `Média das suas últimas ${JANELA_ACERTO} frases do "Diga em japonês", pela sua própria conferência.`,
          },
          {
            label: 'Textos em shadowing',
            valor: textosShadowing.size,
            total: LEITURA_TEXTOS.length,
            cor: 'sakura',
            hint: 'Textos que você acompanhou até o fim no modo Shadowing, repetindo cada frase.',
          },
          {
            label: 'Frases salvas para treinar',
            valor: frases,
            cor: 'fuji',
            hint: 'Frases do "Diga em japonês" salvas como flash cards (as que você errou).',
          },
        ],
        observacao:
          'A fala é autoavaliada (sem reconhecimento de voz): você confere sua frase com a resposta e o áudio.',
      };
    case 'escrever': {
      const kanaDesenhados = kana.filter((k) => k.drawBest !== undefined);
      const media = kanaDesenhados.length
        ? Math.round(kanaDesenhados.reduce((s, k) => s + (k.drawBest ?? 0), 0) / kanaDesenhados.length)
        : null;
      return {
        indicadores: [
          { label: 'Kana desenhados', valor: kanaDesenhados.length, total: ALL_KANA.length, cor: 'kin' },
          {
            label: 'Nota média do desenho',
            valor: media === null ? '—' : `${media}%`,
            cor: 'kin',
            hint: 'Média da melhor nota de cada kana já desenhado.',
          },
          {
            label: 'Entradas no diário',
            valor: diario,
            cor: 'kin',
            hint: 'Textos curtos que você escreveu no diário guiado.',
          },
          {
            label: 'Kanji desenhados',
            valor: kanji.filter((k) => k.drawBest !== undefined).length,
            total: kanji.length || undefined,
            cor: 'hanko',
            hint: 'Dos kanji que você já aprendeu, quantos já foram desenhados na caligrafia.',
          },
        ],
      };
    }
  }
}
