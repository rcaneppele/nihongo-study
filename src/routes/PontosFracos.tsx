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
      <div>
        <h1 className="font-display text-2xl font-semibold">Pontos fracos</h1>
        <p className="mt-1 text-sm text-sage">
          O que você mais erra em cada parte do app, reunido num lugar só. O treino aqui é prática livre — não mexe na
          agenda das revisões.
        </p>
      </div>

      {total === 0 ? (
        <div className="card-surface text-center text-sm text-sage">
          Nenhum ponto fraco por enquanto. Eles aparecem aqui quando você esquece um flash card ou kanji, erra kana no
          treino ou consulta palavras na leitura.
        </div>
      ) : (
        <div className="card-surface flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-sage">{total} item(ns) para reforçar</p>
          <button
            className="btn-primary"
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
              <h2 className="font-medium">
                {ORIGEM_LABELS[origem]} <span className="text-sm font-normal text-sage">· {lista.length}</span>
              </h2>
              <button className="btn-ghost px-3 py-1 text-xs" onClick={() => treinar(lista.slice(0, TREINO_MISTO))}>
                Treinar só estes
              </button>
            </div>
            <ul className="divide-y divide-line">
              {visiveis.map((p) => (
                <li key={p.id} className="flex items-baseline justify-between gap-3 py-2">
                  <span className="min-w-0">
                    <span className="font-jp text-lg">{p.jp}</span>
                    <span className="ml-2 text-sm text-ink">{p.pt}</span>
                  </span>
                  <span className="shrink-0 text-xs text-sage">{p.detalhe}</span>
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
