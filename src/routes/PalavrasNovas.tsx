import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Sparkles } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import VocabularyMap from '../features/flashcards/VocabularyMap';
import StudySession from '../features/flashcards/StudySession';
import type { StudyItem } from '../features/flashcards/stages';

/**
 * "Aprender › Palavras novas" (/aprender/palavras): o mapa de vocabulário do
 * N5 — antes uma aba de Flash cards. Daqui saem os cards de palavras novas
 * ("Aprender as próximas 10"); o "Testar" abre a prática livre aqui mesmo.
 */
export default function PalavrasNovas() {
  const [sessao, setSessao] = useState<StudyItem[] | null>(null);

  if (sessao) return <StudySession items={sessao} mode="practice" onDone={() => setSessao(null)} />;

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Link to="/aprender" className="inline-flex items-center gap-1 text-sm text-sage hover:text-ink">
          <ChevronLeft className="h-4 w-4" />
          Aprender
        </Link>
        <PageHeader
          icon={<Sparkles className="h-5 w-5" />}
          cor="sora"
          title="Palavras novas"
          subtitle="O vocabulário do N5 por tema, na ordem das palavras mais úteis. Aprenda de 10 em 10 — elas viram flash cards e entram na revisão."
        />
      </div>
      <VocabularyMap onPractice={setSessao} />
    </div>
  );
}
