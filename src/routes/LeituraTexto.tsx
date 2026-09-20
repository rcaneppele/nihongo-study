import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getTextoById } from '../data/leitura/textos';
import type { ReadingWord } from '../data/leitura/types';
import Furigana from '../components/Furigana';
import AudioButton from '../components/AudioButton';

export default function LeituraTexto() {
  const { id } = useParams<{ id: string }>();
  const texto = id ? getTextoById(id) : undefined;
  const [showFurigana, setShowFurigana] = useState(true);
  const [selected, setSelected] = useState<ReadingWord | null>(null);

  if (!texto) {
    return (
      <div className="card-surface text-center">
        <p className="text-sage">Texto não encontrado.</p>
        <Link to="/leitura" className="btn-ghost mt-3 inline-block">
          Voltar
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Link to="/leitura" className="text-sm text-sage hover:text-hanko hover:underline">
          ← Todos os textos
        </Link>
        <button className="btn-ghost text-xs" onClick={() => setShowFurigana((v) => !v)}>
          {showFurigana ? 'Ocultar furigana' : 'Mostrar furigana'}
        </button>
      </div>

      <div>
        <p className="font-jp text-2xl">{texto.title}</p>
        <p className="text-sm text-sage">Nível {texto.level}</p>
      </div>

      <div className="card-surface min-h-20">
        {selected ? (
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Furigana
                segments={[{ text: selected.text, reading: selected.reading }]}
                className="font-jp text-xl"
              />
              <AudioButton text={selected.text} size="sm" />
            </div>
            <p className="text-sm text-ink">{selected.meaning ?? '(sem tradução — palavra gramatical)'}</p>
          </div>
        ) : (
          <p className="text-sm text-sage">Toque numa palavra do texto para ver o significado aqui.</p>
        )}
      </div>

      <div className="card-surface space-y-5">
        {texto.lines.map((line, i) => (
          <div key={i} className="flex flex-wrap items-start gap-x-1 gap-y-2">
            <AudioButton text={line.map((w) => w.text).join('')} size="sm" />
            {line.map((word, j) => (
              <button
                key={j}
                onClick={() => setSelected(word)}
                className="rounded px-0.5 leading-relaxed transition-colors hover:bg-indigo/10"
              >
                <Furigana
                  segments={[{ text: word.text, reading: showFurigana ? word.reading : undefined }]}
                  className="font-jp text-lg"
                />
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
