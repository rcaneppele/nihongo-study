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

/**
 * Atalho para o caso comum de uma palavra inteira com uma leitura só (ex.:
 * colunas de kanji de referência nas tabelas de vocabulário das lições —
 * família, pronomes, sufixos). Para palavras com okurigana (leitura só numa
 * parte, ex. 食べる), use `Furigana` com `segments` diretamente.
 */
export function FuriganaWord({
  kanji,
  reading,
  className,
}: {
  kanji: string;
  reading: string;
  className?: string;
}) {
  return <Furigana segments={[{ text: kanji, reading }]} className={className} />;
}
