import { useLiveQuery } from 'dexie-react-hooks';
import { ChartColumn, Eye, MessageCircle } from 'lucide-react';
import { db } from '../db/schema';
import { ALL_KANA } from '../data/kana';
import { KANJI_N5 } from '../data/kanji';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import ProgressStats from '../features/flashcards/ProgressStats';
import { useKnownWords } from '../features/leitura/knowledge';
import ConquistasLista from '../features/conquistas/ConquistasLista';

/**
 * "Progresso" (etapa de acompanhar do ciclo): vocabulário passivo/ativo,
 * escrita (kana/kanji) e as estatísticas de revisão — antes espalhados entre
 * a Home e a aba Progresso dos flash cards.
 */
export default function Progresso() {
  const known = useKnownWords();
  const kanaPracticed = useLiveQuery(() => db.kanaProgress.count(), [], 0);
  const kanjiLearned = useLiveQuery(() => db.kanjiProgress.count(), [], 0);

  return (
    <div className="space-y-6">
      <PageHeader
        icon={<ChartColumn className="h-5 w-5" />}
        cor="kin"
        title="Progresso"
        subtitle="O que você já domina e onde ainda está fraco."
      />

      <section className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        <StatCard
          icon={<Eye className="h-[18px] w-[18px]" />}
          cor="matcha"
          valor={known?.understood.size ?? 0}
          label="Palavras compreendidas"
          crescimento={known?.understoodWeek}
          hint="Seu vocabulário passivo: palavras que você leu sem precisar consultar o significado, mais as dos flash cards que você já revisou. O selo mostra quantas entraram nos últimos 7 dias."
        />
        <StatCard
          icon={<MessageCircle className="h-[18px] w-[18px]" />}
          cor="sora"
          valor={known?.canSay.size ?? 0}
          label="Palavras que sei dizer"
          crescimento={known?.canSayWeek}
          hint="Seu vocabulário ativo: flash cards no estágio Sei dizer ou Domino — você consegue dizer a palavra em japonês partindo do português. O selo mostra quantas entraram nos últimos 7 dias."
        />
        <StatCard
          icon={<span className="font-jp">あ</span>}
          cor="kin"
          valor={kanaPracticed}
          total={ALL_KANA.length}
          label="Kana praticados"
        />
        <StatCard
          icon={<span className="font-jp">字</span>}
          cor="hanko"
          valor={kanjiLearned}
          total={KANJI_N5.length}
          label="Kanji aprendidos"
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-sage">Revisão e vocabulário</h2>
        <ProgressStats />
      </section>

      <ConquistasLista />
    </div>
  );
}
