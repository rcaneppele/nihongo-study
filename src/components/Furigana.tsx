export interface FuriganaSegment {
  text: string;
  reading?: string;
}

/**
 * Kanji com a leitura pequena em cima (furigana), via <ruby>/<rt> nativos do
 * HTML — como aparece em texto japonês real. `segments` permite misturar
 * trechos com e sem leitura na mesma palavra (ex.: okurigana): só o kanji
 * leva `reading`, o resto passa sem.
 *
 * Ex.: uma palavra simples de um kanji só —
 *   <Furigana segments={[{ text: '父', reading: 'ちち' }]} />
 * Ex.: um verbo com okurigana —
 *   <Furigana segments={[{ text: '食', reading: 'た' }, { text: 'べる' }]} />
 */
export default function Furigana({ segments, className }: { segments: FuriganaSegment[]; className?: string }) {
  return (
    <span className={className}>
      {segments.map((s, i) =>
        s.reading ? (
          <ruby key={i}>
            {s.text}
            <rt className="text-[0.6em] text-sage">{s.reading}</rt>
          </ruby>
        ) : (
          <span key={i}>{s.text}</span>
        )
      )}
    </span>
  );
}
