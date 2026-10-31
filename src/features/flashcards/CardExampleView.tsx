import { useState } from 'react';
import type { CardExample, CardSource } from '../../db/schema';
import Furigana from '../../components/Furigana';
import AudioButton from '../../components/AudioButton';

/**
 * Frase de contexto no verso do card: a frase onde a palavra foi
 * encontrada, com a palavra destacada, áudio, tradução sob demanda e a
 * origem ("Leitura · 公園で"). A origem é só texto, não link — sair no meio
 * da sessão perderia o progresso dela.
 */
export default function CardExampleView({ example, source }: { example: CardExample; source?: CardSource }) {
  const [showTranslation, setShowTranslation] = useState(false);
  const sentence = example.segments.map((s) => s.text).join('');

  return (
    <div className="space-y-2 border-t border-line pt-4">
      <div className="flex flex-wrap items-center justify-center gap-x-0.5 gap-y-1">
        {example.segments.map((seg, i) => (
          <Furigana
            key={i}
            segments={[seg]}
            className={`font-jp text-lg ${i === example.highlight ? 'rounded bg-indigo/10 px-1 font-semibold text-indigo' : ''}`}
          />
        ))}
        <AudioButton text={sentence} size="sm" />
      </div>
      {example.translation &&
        (showTranslation ? (
          <p className="text-sm text-ink">{example.translation}</p>
        ) : (
          <button className="text-xs text-sage hover:text-indigo hover:underline" onClick={() => setShowTranslation(true)}>
            Ver tradução da frase
          </button>
        ))}
      {source && (
        <p className="text-xs text-sage">
          Leitura · <span className="font-jp">{source.title}</span>
        </p>
      )}
    </div>
  );
}
