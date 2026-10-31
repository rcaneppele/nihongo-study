import type { ReactNode } from 'react';
import { Lightbulb } from 'lucide-react';
import AudioButton from './AudioButton';

// Visual das lições na cor do módulo (`fuji`): barra no título da seção,
// barra lateral dos exemplos, cabeçalho das tabelas. Notas em `kin` (dica).

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="flex items-center gap-2.5 font-display text-xl font-semibold tracking-tight text-ink">
        <span aria-hidden className="h-5 w-1 shrink-0 rounded-full bg-fuji" />
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

export function Ex({
  jp,
  romaji,
  pt,
  notes,
}: {
  jp: string;
  romaji?: string;
  pt: string;
  notes?: string;
}) {
  return (
    <div className="min-w-0 rounded-xl border border-l-4 border-line/70 border-l-fuji/60 bg-surface px-4 py-3 shadow-card">
      <div className="flex items-start gap-1">
        <p className="break-words font-jp text-lg leading-snug text-ink">{jp}</p>
        <AudioButton text={jp} size="sm" />
      </div>
      {romaji && <p className="mt-0.5 break-words text-sm italic text-sage">{romaji}</p>}
      <p className="mt-1 break-words text-sm text-ink/80">{pt}</p>
      {notes && <p className="mt-1 break-words text-xs italic text-sage">→ {notes}</p>}
    </div>
  );
}

export function ReadingKey({ lines }: { lines: { text: string; desc: string }[] }) {
  return (
    <div className="w-fit min-w-0 max-w-full rounded-xl border border-line bg-paper/60 px-4 py-3 font-mono text-sm text-ink">
      {lines.map((l, i) => (
        <div key={i} className="flex flex-wrap items-baseline gap-x-3">
          <span>{l.text}</span>
          <span className="text-xs text-sage">← {l.desc}</span>
        </div>
      ))}
    </div>
  );
}

export function Note({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-w-0 gap-3 rounded-xl border border-kin/25 bg-kin/8 px-4 py-3 text-sm leading-relaxed text-ink">
      <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-kin" aria-hidden />
      <div className="min-w-0">
        <span className="font-semibold text-kin">Nota: </span>
        {children}
      </div>
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
    <div className="overflow-x-auto rounded-2xl border border-line/70 bg-surface shadow-card">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-line bg-fuji/8">
            {headers.map((h, i) => (
              <th
                key={i}
                className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-fuji"
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
