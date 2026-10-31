import type { ReactNode } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, type Review } from '../../db/schema';
import { cardStage, STAGE_BAR, STAGE_HINTS, STAGE_LABELS, type Stage } from './stages';
import StatCard from '../../components/StatCard';
import { useResumoDia } from '../atividade/atividade';
import { CalendarDays, Copy, Flame, History, Route, Target } from 'lucide-react';

/**
 * Com `enable_short_term: false` no FSRS (ver src/features/srs/fsrs.ts), um
 * card só assume `state` 0 (Novo) ou 2 (Revisão) — nunca 1 (Aprendendo) nem
 * 3 (Reaprendendo), porque não há passos de aprendizado em minutos/horas.
 * Por isso as estatísticas de estágio não precisam desses dois baldes.
 */
const MATURE_DAYS = 21;
const HEATMAP_DAYS = 84; // 12 semanas, estilo GitHub
const DAY_MS = 24 * 60 * 60 * 1000;

export default function ProgressStats() {
  const cards = useLiveQuery(() => db.cards.toArray(), [], null);
  const resumo = useResumoDia();
  const reviews = useLiveQuery(() => db.reviews.toArray(), [], null);

  if (!cards || !reviews) return null;

  const totalReviews = reviews.length;
  const accuracy = totalReviews > 0 ? Math.round((reviews.filter((r) => r.quality > 1).length / totalReviews) * 100) : null;

  let novo = 0;
  let jovem = 0;
  let maduro = 0;
  for (const c of cards) {
    if (c.state === 2) {
      if (c.scheduledDays >= MATURE_DAYS) maduro++;
      else jovem++;
    } else {
      novo++;
    }
  }

  const stageCounts: Record<Stage, number> = { novo: 0, reconheco: 0, seiDizer: 0, domino: 0 };
  for (const c of cards) stageCounts[cardStage(c)]++;

  const dayCounts = buildDayCounts(reviews, HEATMAP_DAYS);
  // Uma sequência só no app: a de estudo (qualquer atividade), a mesma do
  // bloco "Hoje" da Home — não uma "sequência de revisões" à parte.
  const sequencia = resumo?.sequencia ?? 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        <StatCard icon={<Copy className="h-[18px] w-[18px]" />} cor="sora" valor={cards.length} label="Cards no total" />
        <StatCard
          icon={<History className="h-[18px] w-[18px]" />}
          cor="indigo"
          valor={totalReviews}
          label="Revisões feitas"
        />
        <StatCard
          icon={<Target className="h-[18px] w-[18px]" />}
          cor="matcha"
          valor={accuracy === null ? '—' : `${accuracy}%`}
          label="Taxa de acerto"
          hint="Revisões em que você lembrou (qualquer nota acima de Não lembrei), sobre o total de revisões."
        />
        <StatCard
          icon={<Flame className="h-[18px] w-[18px]" />}
          cor="hanko"
          valor={sequencia > 0 ? `${sequencia} dia(s)` : '—'}
          label="Sequência de estudo"
        />
      </div>

      <section className="card-surface space-y-3">
        <SectionTitle icon={<Route className="h-4 w-4" />}>Jornada do vocabulário</SectionTitle>
        <p className="text-sm text-sage">
          Primeiro você reconhece a palavra (japonês → português). Quando o reconhecimento firma, o card passa a pedir
          também que você diga a palavra em japonês (português → japonês) — é o vocabulário que você consegue usar.
        </p>
        {cards.length === 0 ? (
          <p className="text-sm text-sage">Nenhum card cadastrado ainda.</p>
        ) : (
          <SegmentBar
            segments={(['novo', 'reconheco', 'seiDizer', 'domino'] as Stage[]).map((stage) => ({
              label: STAGE_LABELS[stage],
              hint: STAGE_HINTS[stage],
              count: stageCounts[stage],
              className: STAGE_BAR[stage],
            }))}
          />
        )}
      </section>

      <section className="card-surface space-y-3">
        <SectionTitle icon={<History className="h-4 w-4" />}>Intervalo de reconhecimento</SectionTitle>
        {cards.length === 0 ? (
          <p className="text-sm text-sage">Nenhum card cadastrado ainda.</p>
        ) : (
          <SegmentBar
            segments={[
              { label: 'Novo', count: novo, className: 'bg-line' },
              { label: 'Aprendendo', count: jovem, className: 'bg-sora/40' },
              { label: `Maduro (≥ ${MATURE_DAYS} dias)`, count: maduro, className: 'bg-sora' },
            ]}
          />
        )}
      </section>

      <section className="card-surface space-y-3">
        <SectionTitle icon={<CalendarDays className="h-4 w-4" />}>Revisões nos últimos {HEATMAP_DAYS} dias</SectionTitle>
        {totalReviews === 0 ? (
          <p className="text-sm text-sage">Nenhuma revisão registrada ainda.</p>
        ) : (
          <Heatmap dayCounts={dayCounts} />
        )}
      </section>
    </div>
  );
}

function SectionTitle({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <h2 className="flex items-center gap-2 font-medium">
      <span className="icon-tile h-7 w-7 rounded-lg bg-indigo/8 text-indigo">{icon}</span>
      {children}
    </h2>
  );
}


function SegmentBar({
  segments,
}: {
  segments: { label: string; hint?: string; count: number; className: string }[];
}) {
  const total = segments.reduce((sum, s) => sum + s.count, 0) || 1;

  return (
    <div className="space-y-2">
      <div className="flex h-3 w-full gap-0.5 overflow-hidden rounded-full">
        {segments.map((s) => (
          <div key={s.label} className={s.className} style={{ width: `${(s.count / total) * 100}%` }} />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-sage">
        {segments.map((s) => (
          <span key={s.label} className="flex items-center gap-1.5" title={s.hint}>
            <span className={`inline-block h-2.5 w-2.5 rounded-full ${s.className}`} />
            {s.label}: {s.count}
          </span>
        ))}
      </div>
    </div>
  );
}

function Heatmap({ dayCounts }: { dayCounts: { day: number; count: number }[] }) {
  const max = Math.max(1, ...dayCounts.map((d) => d.count));
  const firstWeekday = new Date(dayCounts[0].day).getDay();
  const padded: ({ day: number; count: number } | null)[] = [
    ...Array<null>(firstWeekday).fill(null),
    ...dayCounts,
  ];
  const weeks: ({ day: number; count: number } | null)[][] = [];
  for (let i = 0; i < padded.length; i += 7) weeks.push(padded.slice(i, i + 7));

  return (
    <div className="overflow-x-auto">
      <div className="inline-flex gap-1">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((d, di) =>
              d ? (
                <div
                  key={di}
                  title={`${new Date(d.day).toLocaleDateString('pt-BR')}: ${d.count} revisão(ões)`}
                  className={`h-3.5 w-3.5 rounded-[4px] ${heatColor(d.count, max)}`}
                />
              ) : (
                <div key={di} className="h-3.5 w-3.5" />
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function heatColor(count: number, max: number): string {
  if (count === 0) return 'bg-line/60';
  const ratio = count / max;
  if (ratio > 0.75) return 'bg-matcha';
  if (ratio > 0.5) return 'bg-matcha/70';
  if (ratio > 0.25) return 'bg-matcha/45';
  return 'bg-matcha/25';
}

function startOfDay(ts: number): number {
  const d = new Date(ts);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

function buildDayCounts(reviews: Review[], days: number): { day: number; count: number }[] {
  const counts = new Map<number, number>();
  for (const r of reviews) {
    const day = startOfDay(r.reviewedAt);
    counts.set(day, (counts.get(day) ?? 0) + 1);
  }
  const today = startOfDay(Date.now());
  const result: { day: number; count: number }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const day = today - i * DAY_MS;
    result.push({ day, count: counts.get(day) ?? 0 });
  }
  return result;
}

