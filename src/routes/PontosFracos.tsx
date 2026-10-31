import type { ReactNode } from 'react';
import { BookOpenText, Copy, Dumbbell, PartyPopper, Target } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { TILE, type Cor } from '../lib/cores';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import StudySession from '../features/flashcards/StudySession';
import type { StudyItem } from '../features/flashcards/stages';
import {
  carregarPontosFracos,
  misturar,
  ORIGEM_LABELS,
  type Origem,
  type PontoFraco,
} from '../features/pontos-fracos/pontosFracos';

const ORIGENS: Origem[] = ['cards', 'kana', 'kanji', 'leitura'];

// Cada origem na cor e com o ícone do seu módulo (mesmos da navegação).
const ORIGEM_ESTILO: Record<Origem, { cor: Cor; icon: ReactNode }> = {
  cards: { cor: 'sora', icon: <Copy className="h-4 w-4" /> },
  kana: { cor: 'kin', icon: <span className="font-jp text-sm">あ</span> },
  kanji: { cor: 'hanko', icon: <span className="font-jp text-sm">字</span> },
  leitura: { cor: 'matcha', icon: <BookOpenText className="h-4 w-4" /> },
};
const TREINO_MISTO = 20;
const VISIVEIS_POR_ORIGEM = 8;

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * "Pontos fracos" (/pontos-fracos): o que mais erra em cada módulo, com
 * treino em prática livre — nada aqui mexe na agenda de revisão (ver
 * src/features/pontos-fracos/pontosFracos.ts).
 */
export default function PontosFracos() {
  const dados = useLiveQuery(carregarPontosFracos, []);
  const [sessao, setSessao] = useState<StudyItem[] | null>(null);
  const [expandidas, setExpandidas] = useState<Set<Origem>>(new Set());

  if (sessao) return <StudySession items={sessao} mode="practice" onDone={() => setSessao(null)} />;
  if (!dados) return null;

  const total = ORIGENS.reduce((n, o) => n + dados[o].length, 0);

  function treinar(itens: PontoFraco[]) {
    setSessao(shuffle(itens.map((p) => p.item)));
  }

  return (
    <div className="space-y-6">
      <PageHeader
        icon={<Target className="h-5 w-5" />}
        cor="sakura"
        title="Pontos fracos"
        subtitle="O que você mais erra em cada parte do app. O treino aqui é prática livre — não mexe na agenda das revisões."
      />

      {total === 0 ? (
        <div className="card-surface flex flex-col items-center gap-3 py-10 text-center">
          <span className="icon-tile h-12 w-12 rounded-2xl bg-matcha/12 text-matcha">
            <PartyPopper className="h-6 w-6" />
          </span>
          <div>
            <p className="font-medium">Nenhum ponto fraco por enquanto</p>
            <p className="mx-auto max-w-md text-sm text-sage">
              Eles aparecem aqui quando você esquece um flash card ou kanji, erra kana no treino ou consulta palavras
              na leitura.
            </p>
          </div>
        </div>
      ) : (
        <div className="card-hero flex flex-wrap items-center gap-4">
          <span className="icon-tile h-11 w-11 rounded-2xl bg-sakura/12 text-sakura">
            <Dumbbell className="h-5 w-5" />
          </span>
          <p className="min-w-0 flex-1 text-sm text-sage">
            <span className="text-lg font-semibold text-ink">{total}</span> item(ns) para reforçar, de{' '}
            {ORIGENS.filter((o) => dados[o].length > 0).length} parte(s) do app
          </p>
          <button
            className="btn-dark"
            onClick={() => treinar(misturar(ORIGENS.map((o) => dados[o]), TREINO_MISTO))}
          >
            Treinar meus pontos fracos ({Math.min(TREINO_MISTO, total)})
          </button>
        </div>
      )}

      {ORIGENS.filter((o) => dados[o].length > 0).map((origem) => {
        const lista = dados[origem];
        const aberta = expandidas.has(origem);
        const visiveis = aberta ? lista : lista.slice(0, VISIVEIS_POR_ORIGEM);
        return (
          <section key={origem} className="card-surface space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="flex items-center gap-2.5 font-medium">
                <span className={`icon-tile h-8 w-8 rounded-lg ${TILE[ORIGEM_ESTILO[origem].cor]}`}>
                  {ORIGEM_ESTILO[origem].icon}
                </span>
                {ORIGEM_LABELS[origem]}
                <span className={`badge ${TILE[ORIGEM_ESTILO[origem].cor]}`}>{lista.length}</span>
              </h2>
              <button className="btn-ghost px-3 py-1 text-xs" onClick={() => treinar(lista.slice(0, TREINO_MISTO))}>
                Treinar só estes
              </button>
            </div>
            <ul className="divide-y divide-line/70">
              {visiveis.map((p) => (
                <li key={p.id} className="flex items-baseline justify-between gap-3 py-2">
                  <span className="min-w-0">
                    <span className="font-jp text-lg">{p.jp}</span>
                    <span className="ml-2 text-sm text-ink">{p.pt}</span>
                  </span>
                  <span className="badge shrink-0 bg-hanko/8 text-hanko">{p.detalhe}</span>
                </li>
              ))}
            </ul>
            {lista.length > VISIVEIS_POR_ORIGEM && (
              <button
                className="text-xs text-sage hover:text-indigo hover:underline"
                onClick={() =>
                  setExpandidas((prev) => {
                    const next = new Set(prev);
                    if (aberta) next.delete(origem);
                    else next.add(origem);
                    return next;
                  })
                }
              >
                {aberta ? 'Mostrar menos' : `Mostrar todos (${lista.length})`}
              </button>
            )}
            {origem === 'kana' && (
              <p className="text-xs text-sage">
                Para treinar escrita e outros modos, use o <Link to="/kana" className="text-indigo hover:underline">treino de kana</Link>.
              </p>
            )}
          </section>
        );
      })}
    </div>
  );
}
