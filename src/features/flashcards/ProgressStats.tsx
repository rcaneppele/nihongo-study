import { useLiveQuery } from 'dexie-react-hooks';
import { db, type Review } from '../../db/schema';

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

  const dayCounts = buildDayCounts(reviews, HEATMAP_DAYS);
  const streak = computeStreak(dayCounts);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-4">
        <Stat label="Cards no total" value={cards.length} />
        <Stat label="Revisões feitas" value={totalReviews} />
        <Stat label="Taxa de acerto" value={accuracy === null ? '—' : `${accuracy}%`} accent />
        <Stat label="Sequência atual" value={streak > 0 ? `${streak} dia(s)` : '—'} />
      </div>

      <section className="card-surface space-y-3">
        <h2 className="font-medium">Estágio dos cards</h2>
        {cards.length === 0 ? (
          <p className="text-sm text-sage">Nenhum card cadastrado ainda.</p>
        ) : (
          <StageBar novo={novo} jovem={jovem} maduro={maduro} />
        )}
      </section>

      <section className="card-surface space-y-3">
        <h2 className="font-medium">Revisões nos últimos {HEATMAP_DAYS} dias</h2>
        {totalReviews === 0 ? (
          <p className="text-sm text-sage">Nenhuma revisão registrada ainda.</p>
        ) : (
          <Heatmap dayCounts={dayCounts} />
        )}
      </section>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: number | string; accent?: boolean }) {
  return (
    <div className="card-surface">
      <div className={`font-display text-3xl font-semibold ${accent ? 'text-hanko' : 'text-indigo'}`}>{value}</div>
      <div className="mt-1 text-sm text-sage">{label}</div>
    </div>
  );
}

function StageBar({ novo, jovem, maduro }: { novo: number; jovem: number; maduro: number }) {
  const total = novo + jovem + maduro || 1;
  const segments = [
    { label: 'Novo', count: novo, className: 'bg-line' },
    { label: 'Aprendendo', count: jovem, className: 'bg-indigo/50' },
    { label: 'Maduro', count: maduro, className: 'bg-indigo' },
  ];

  return (
    <div className="space-y-2">
      <div className="flex h-3 w-full overflow-hidden rounded-full">
        {segments.map((s) => (
          <div key={s.label} className={s.className} style={{ width: `${(s.count / total) * 100}%` }} />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-sage">
        {segments.map((s) => (
          <span key={s.label} className="flex items-center gap-1.5">
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
                  className={`h-3 w-3 rounded-sm ${heatColor(d.count, max)}`}
                />
              ) : (
                <div key={di} className="h-3 w-3" />
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
  if (ratio > 0.75) return 'bg-indigo';
  if (ratio > 0.5) return 'bg-indigo/70';
  if (ratio > 0.25) return 'bg-indigo/45';
  return 'bg-indigo/25';
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

function computeStreak(dayCounts: { day: number; count: number }[]): number {
  let streak = 0;
  for (let i = dayCounts.length - 1; i >= 0; i--) {
    if (dayCounts[i].count > 0) streak++;
    else break;
  }
  return streak;
}
