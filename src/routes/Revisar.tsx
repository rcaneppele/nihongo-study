import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { ArrowRight, CalendarClock, CheckCircle2 } from 'lucide-react';
import { db } from '../db/schema';
import type { KanjiEntry } from '../data/kanji';
import PageHeader from '../components/PageHeader';
import AtividadeCard from '../components/AtividadeCard';
import StudySession from '../features/flashcards/StudySession';
import KanjiReviewSession from '../features/kanji/KanjiReviewSession';
import { buildReviewQueue, type StudyItem } from '../features/flashcards/stages';
import { getDueKanji } from '../features/kanji/kanjiQueue';
import { ATIVIDADES_REVISAR } from '../features/metodo/estrutura';
import { usePendencias } from '../features/metodo/pendencias';

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

type Etapa =
  | { tipo: 'hub' }
  | { tipo: 'cards'; cards: StudyItem[]; kanji: KanjiEntry[] }
  | { tipo: 'kanji'; kanji: KanjiEntry[] };

/**
 * Hub "Revisar" (etapa 3 do ciclo — relembrar antes de esquecer). No topo, a
 * **Revisão do dia**: um botão só que encadeia as duas revisões de
 * repetição espaçada que já existem — primeiro os flash cards vencidos
 * (mesma fila do "Revisar cards" de Meus cards), depois os kanji vencidos —
 * sem mudar a lógica de nenhuma delas. Abaixo, as outras formas de revisar.
 */
export default function Revisar() {
  const pendencias = usePendencias();
  const [etapa, setEtapa] = useState<Etapa>({ tipo: 'hub' });
  const [concluida, setConcluida] = useState(false);
  const totalCards = useLiveQuery(() => db.cards.count(), [], 0);

  async function comecar() {
    const cards = shuffle(buildReviewQueue(await db.cards.toArray()));
    const kanji = shuffle(await getDueKanji());
    setConcluida(false);
    if (cards.length > 0) setEtapa({ tipo: 'cards', cards, kanji });
    else if (kanji.length > 0) setEtapa({ tipo: 'kanji', kanji });
  }

  // Sair no meio: volta pro hub sem marcar como concluída (o que foi
  // respondido já está gravado; o resto continua vencido).
  function desistir() {
    setEtapa({ tipo: 'hub' });
  }

  function terminar() {
    setEtapa({ tipo: 'hub' });
    setConcluida(true);
  }

  if (etapa.tipo === 'cards') {
    const temKanji = etapa.kanji.length > 0;
    return (
      <StudySession
        items={etapa.cards}
        mode="review"
        doneLabel={temKanji ? `Continuar para os kanji (${etapa.kanji.length})` : 'Concluir revisão'}
        onDone={() => (temKanji ? setEtapa({ tipo: 'kanji', kanji: etapa.kanji }) : terminar())}
        onQuit={desistir}
      />
    );
  }
  if (etapa.tipo === 'kanji') {
    return <KanjiReviewSession entries={etapa.kanji} doneLabel="Concluir revisão" onDone={terminar} onQuit={desistir} />;
  }

  const total = pendencias.revisao;
  const partes = [
    pendencias.cards > 0 && `${pendencias.cards} flash card(s)`,
    pendencias.kanji > 0 && `${pendencias.kanji} kanji`,
  ].filter(Boolean);

  return (
    <div className="space-y-6">
      <PageHeader
        icon={<CalendarClock className="h-5 w-5" />}
        cor="sora"
        title="Revisar"
        subtitle="Relembre na hora certa o que já aprendeu, antes de esquecer."
      />

      <section className="card-hero flex flex-wrap items-center gap-4">
        {total > 0 ? (
          <>
            <span className="icon-tile h-12 w-12 rounded-2xl bg-sora/12 text-sora">
              <CalendarClock className="h-6 w-6" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-sage">Revisão do dia</p>
              <p className="text-xl font-semibold tracking-tight">{total} item(ns) para relembrar</p>
              <p className="text-sm text-sage">{partes.join(' · ')} — em sequência, numa sessão só.</p>
            </div>
            <button className="btn-dark" onClick={comecar}>
              Começar revisão <ArrowRight className="h-4 w-4" />
            </button>
          </>
        ) : (
          <>
            <span className="icon-tile h-12 w-12 rounded-2xl bg-matcha/12 text-matcha">
              <CheckCircle2 className="h-6 w-6" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-sage">Revisão do dia</p>
              <p className="text-xl font-semibold tracking-tight">
                {concluida ? 'Revisão do dia concluída!' : 'Tudo em dia'}
              </p>
              <p className="text-sm text-sage">
                {totalCards === 0
                  ? 'Ainda não há nada para revisar — aprenda palavras ou kanji novos e eles aparecem aqui no dia certo.'
                  : 'Nenhum flash card ou kanji vencido agora. Se quiser reforçar, use os pontos fracos abaixo.'}
              </p>
            </div>
          </>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-sage">Outras formas de revisar</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {ATIVIDADES_REVISAR.map((a) => (
            <AtividadeCard key={a.titulo} atividade={a} pendente={a.pendencia ? pendencias[a.pendencia] : undefined} />
          ))}
        </div>
      </section>
    </div>
  );
}
