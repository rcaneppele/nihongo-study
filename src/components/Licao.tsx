import type { ReactNode } from 'react';

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="border-b border-line pb-2 font-display text-xl font-semibold text-ink">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

export function Ex({
  jp,
  pt,
  notes,
}: {
  jp: string;
  pt: string;
  notes?: string;
}) {
  return (
    <div className="min-w-0 rounded-lg border-l-4 border-indigo/40 bg-white/70 px-4 py-3">
      <p className="break-words font-jp text-lg leading-snug text-ink">{jp}</p>
      <p className="mt-1 break-words text-sm text-ink/80">{pt}</p>
      {notes && <p className="mt-1 break-words text-xs italic text-sage">{notes}</p>}
    </div>
  );
}

export function Note({ children }: { children: ReactNode }) {
  return (
    <div className="min-w-0 rounded-lg border border-indigo/20 bg-indigo/5 px-4 py-3 text-sm leading-relaxed text-ink">
      <span className="font-semibold text-indigo">Nota: </span>
      {children}
    </div>
  );
}

export function GrammarTable({
  headers,
  rows,
  jpCols = [],
}: {
  headers: string[];
  rows: (string | ReactNode)[][];
  jpCols?: number[];
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-line bg-white/60">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-line">
            {headers.map((h, i) => (
              <th
                key={i}
                className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-sage"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-line/60 last:border-0">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`px-3 py-2.5 text-ink ${jpCols.includes(j) ? 'font-jp text-base' : ''}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
