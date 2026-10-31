import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../db/schema';
import { ALL_KANA } from '../../data/kana';
import { LEITURA_TEXTOS } from '../../data/leitura/textos';
import { useKnownWords } from '../leitura/knowledge';
import { CATEGORIA_FRASES } from '../diga/gerador';
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

/**
 * Indicadores de cada habilidade, só com dados que o app já grava — sem
 * inventar nota de "ouvir" ou "falar", que hoje não são medidos diretamente.
 */
export function useNivel(id: HabilidadeId): Nivel | undefined {
  const known = useKnownWords();
  const dados = useLiveQuery(async () => {
    const [leituras, kana, kanji, frases] = await Promise.all([
      db.readingProgress.count(),
      db.kanaProgress.toArray(),
      db.kanjiProgress.toArray(),
      db.cards.where('category').equals(CATEGORIA_FRASES).count(),
    ]);
    return { leituras, kana, kanji, frases };
  }, []);
  if (!dados || !known) return undefined;
  const { leituras, kana, kanji, frases } = dados;

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
            label: 'Textos prontos para escutar',
            valor: leituras,
            total: LEITURA_TEXTOS.length,
            cor: 'sora',
            hint: 'Textos que você já leu — o conteúdo conhecido é o melhor ponto de partida para treinar só de ouvido.',
          },
        ],
        observacao:
          'O app ainda não mede a escuta diretamente (os ditados e o "escutar primeiro" não guardam resultado) — o número acima mostra quanto material você já tem para treinar.',
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
            label: 'Frases para treinar',
            valor: frases,
            cor: 'fuji',
            hint: 'Frases do "Diga em japonês" salvas como flash cards (as que você errou).',
          },
        ],
        observacao:
          'A fala em si não é avaliada (sem reconhecimento de voz) — os números vêm das palavras e frases que você treina dizer.',
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
