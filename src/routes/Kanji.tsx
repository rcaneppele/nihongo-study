import type { ReactNode } from 'react';
import { CalendarClock, ChevronRight, PenLine, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import { TILE, type Cor } from '../lib/cores';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/schema';
import { KANJI_N5, type KanjiEntry } from '../data/kanji';
import { getAvailableNewKanji, getStartedKanji } from '../features/kanji/kanjiQueue';
import KanjiLearn from '../features/kanji/KanjiLearn';
import KanjiDrawSession from '../features/kanji/KanjiDrawSession';
import { embaralhar } from '../lib/aleatorio';
import Segmentado from '../components/Segmentado';

const NEW_BATCH_SIZES = [5, 10, 20];

type Session = { mode: 'aprender' | 'caligrafia'; entries: KanjiEntry[] } | null;

export default function Kanji() {
  const [session, setSession] = useState<Session>(null);
  const [batchSize, setBatchSize] = useState(5);
  // `?modo=caligrafia` vem de Praticar › Escrever: começa a prática de
  // caligrafia direto (uma vez só — ao sair dela, fica na página do kanji).
  const [params] = useSearchParams();
  const caligrafiaDireto = params.get('modo') === 'caligrafia';
  const jaAbriu = useRef(false);
  useEffect(() => {
    if (!caligrafiaDireto || jaAbriu.current) return;
    jaAbriu.current = true;
    void getStartedKanji().then((entries) => {
      if (entries.length > 0) setSession({ mode: 'caligrafia', entries: embaralhar(entries) });
    });
  }, [caligrafiaDireto]);

  const learnedCount = useLiveQuery(() => db.kanjiProgress.count(), [], 0);
  const dueCount = useLiveQuery(
    () => db.kanjiProgress.where('dueDate').belowOrEqual(Date.now()).count(),
    [],
    0
  );
  const availableNew = KANJI_N5.length - learnedCount;

  async function startLearn() {
    const entries = await getAvailableNewKanji(batchSize);
    setSession({ mode: 'aprender', entries });
  }

  async function startDraw() {
    const entries = embaralhar(await getStartedKanji());
    setSession({ mode: 'caligrafia', entries });
  }

  if (session) {
    const onDone = () => setSession(null);
    if (session.mode === 'aprender') return <KanjiLearn entries={session.entries} onDone={onDone} />;
    return <KanjiDrawSession entries={session.entries} onDone={onDone} />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        icon={<span className="font-jp text-xl">字</span>}
        cor="hanko"
        title="Kanji"
        subtitle="Nível N5 · significado, leituras e traço"
      />

      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
        <StatCard
          icon={<span className="font-jp">字</span>}
          cor="hanko"
          valor={learnedCount}
          total={KANJI_N5.length}
          label="Aprendidos"
        />
        <StatCard
          icon={<CalendarClock className="h-[18px] w-[18px]" />}
          cor="sora"
          valor={dueCount}
          label="Para revisar hoje"
        />
        <StatCard
          icon={<Sparkles className="h-[18px] w-[18px]" />}
          cor="fuji"
          valor={availableNew}
          label="Ainda não iniciados"
        />
      </div>

      <div className="card-hero space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="icon-tile bg-fuji/12 text-fuji">
              <Sparkles className="h-5 w-5" />
            </span>
            <div>
              <p className="font-medium text-ink">Aprender kanji novos</p>
              <p className="text-xs text-sage">
                {availableNew > 0 ? `${availableNew} disponíveis` : 'Você já aprendeu todos os kanji do N5!'}
              </p>
            </div>
          </div>
          <Segmentado
            rotulo="Quantos kanji aprender"
            opcoes={NEW_BATCH_SIZES.map((n) => ({ valor: n, rotulo: n }))}
            valor={batchSize}
            onChange={setBatchSize}
          />
        </div>
        <button className="btn-primary w-full" disabled={availableNew === 0} onClick={startLearn}>
          Aprender {Math.min(batchSize, availableNew)} kanji novos
        </button>
      </div>

      {/* A revisão dos kanji fica na Revisão do dia (junto com os cards) —
          aqui só o aviso de que há vencidos. */}
      {dueCount > 0 && (
        <Link
          to="/revisar"
          className="flex items-center gap-3 rounded-2xl border border-sora/25 bg-sora/8 px-4 py-3 text-sm text-ink hover:bg-sora/12"
        >
          <CalendarClock className="h-5 w-5 shrink-0 text-sora" />
          <span className="min-w-0 flex-1">
            <span className="font-semibold">{dueCount} kanji para revisar hoje</span> — eles entram na Revisão do dia.
          </span>
          <ChevronRight className="h-4 w-4 shrink-0 text-ink/40" />
        </Link>
      )}

      <div className="grid gap-3">
        <AcaoKanji
          icon={<PenLine className="h-5 w-5" />}
          cor="kin"
          titulo="Praticar caligrafia"
          desc={learnedCount > 0 ? `${learnedCount} kanji já aprendidos` : 'Aprenda um kanji primeiro'}
          botao="Praticar"
          disabled={learnedCount === 0}
          onClick={startDraw}
        />
      </div>
    </div>
  );
}

/** Cartão de ação do módulo: ícone, título com pendências, descrição e botão. */
function AcaoKanji({
  icon,
  cor,
  titulo,
  desc,
  pendente,
  botao,
  disabled,
  onClick,
}: {
  icon: ReactNode;
  cor: Cor;
  titulo: string;
  desc: string;
  pendente?: number;
  botao: string;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <div className="card-surface flex min-w-0 items-center gap-4">
      <span className={`icon-tile h-11 w-11 rounded-2xl ${TILE[cor]}`}>{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-2 font-medium text-ink">
          {titulo}
          {!!pendente && <span className="badge bg-hanko/10 text-hanko">{pendente}</span>}
        </p>
        <p className="text-sm text-sage">{desc}</p>
      </div>
      <button className="btn-ghost shrink-0" disabled={disabled} onClick={onClick}>
        {botao}
      </button>
    </div>
  );
}

