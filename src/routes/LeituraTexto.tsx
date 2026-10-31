import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getTextoById } from '../data/leitura/textos';
import type { ReadingLine, ReadingWord } from '../data/leitura/types';
import Furigana from '../components/Furigana';
import AudioButton from '../components/AudioButton';
import SaveWordForm from '../features/flashcards/SaveWordForm';
import ReadAloudBar from '../features/leitura/ReadAloudBar';
import { useReadAloud, type ReadAloudMode } from '../features/leitura/useReadAloud';

// Na palavra, guarda a linha e a posição também — pra salvar o card com a
// frase de contexto e a palavra destacada nela.
type Selection =
  | { kind: 'word'; word: ReadingWord; line: ReadingLine; lineIndex: number; wordIndex: number }
  | { kind: 'line'; line: ReadingLine };

export default function LeituraTexto() {
  const { id } = useParams<{ id: string }>();
  const texto = id ? getTextoById(id) : undefined;
  const [showFurigana, setShowFurigana] = useState(true);
  const [selection, setSelection] = useState<Selection | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [readMode, setReadMode] = useState<ReadAloudMode>('normal');
  const [hideText, setHideText] = useState(false);
  const lineTexts = (texto?.lines ?? []).map((line) => line.words.map((w) => w.text).join(''));
  const readAloud = useReadAloud(lineTexts, readMode);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeLine = readAloud.state.status === 'idle' ? null : readAloud.state.line;

  // Acompanha a linha sendo lida, pra ela não sair da tela em textos longos.
  useEffect(() => {
    if (readAloud.state.status !== 'playing') return;
    lineRefs.current[readAloud.state.line]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [readAloud.state.status, readAloud.state.line]);

  function select(next: Selection) {
    setSelection(next);
    cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

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

      <ReadAloudBar
        state={readAloud.state}
        totalLines={texto.lines.length}
        mode={readMode}
        onModeChange={setReadMode}
        hideText={hideText}
        onHideTextChange={setHideText}
        onPlay={readAloud.play}
        onPause={readAloud.pause}
        onRestart={readAloud.restart}
      />

      <div ref={cardRef} className="card-surface min-h-20 scroll-mt-4">
        {selection ? (
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-x-1 gap-y-1">
              {selection.kind === 'word' ? (
                <Furigana
                  segments={[{ text: selection.word.text, reading: selection.word.reading }]}
                  className="font-jp text-xl"
                />
              ) : (
                selection.line.words.map((word, j) => (
                  <Furigana
                    key={j}
                    segments={[{ text: word.text, reading: showFurigana ? word.reading : undefined }]}
                    className="font-jp text-xl"
                  />
                ))
              )}
              <AudioButton
                text={
                  selection.kind === 'word'
                    ? selection.word.text
                    : selection.line.words.map((w) => w.text).join('')
                }
                size="sm"
              />
            </div>
            <p className="text-sm text-ink">
              {selection.kind === 'word'
                ? (selection.word.meaning ?? '(sem tradução — palavra gramatical)')
                : selection.line.translation}
            </p>
            {selection.kind === 'word' && selection.word.meaning && (
              <div className="pt-2">
                <SaveWordForm
                  key={`${selection.lineIndex}-${selection.wordIndex}`}
                  word={selection.word}
                  wordIndex={selection.wordIndex}
                  line={selection.line}
                  texto={texto}
                />
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm text-sage">
            Toque numa palavra para ver o significado, ou em <span className="font-semibold">PT</span> para ver a
            frase completa.
          </p>
        )}
      </div>

      <div className="card-surface space-y-5">
        {hideText && (
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-indigo/5 px-3 py-2 text-sm">
            <span className="text-sage">Texto escondido — ouça e tente entender antes de ler.</span>
            <button className="btn-ghost px-3 py-1 text-xs" onClick={() => setHideText(false)}>
              Mostrar texto
            </button>
          </div>
        )}
        {texto.lines.map((line, i) => (
          <div
            key={i}
            ref={(el) => {
              lineRefs.current[i] = el;
            }}
            className={`-mx-2 flex flex-wrap items-start gap-x-1 gap-y-2 rounded-lg px-2 py-1 transition-colors ${
              activeLine === i ? 'bg-indigo/10' : ''
            }`}
          >
            <AudioButton text={lineTexts[i]} size="sm" />
            <div
              className={`contents ${hideText ? '[&>*]:pointer-events-none [&>*]:select-none [&>*]:blur' : ''}`}
              aria-hidden={hideText}
            >
              <button
                type="button"
                onClick={() => select({ kind: 'line', line })}
                className="inline-flex h-6 shrink-0 items-center justify-center rounded-full px-1.5 text-[10px] font-bold tracking-wide text-sage transition-colors hover:bg-indigo/10 hover:text-indigo"
                aria-label="Ver tradução da frase completa"
                title="Ver tradução da frase completa"
              >
                PT
              </button>
              {line.words.map((word, j) => (
                <button
                  key={j}
                  onClick={() => select({ kind: 'word', word, line, lineIndex: i, wordIndex: j })}
                  className="rounded px-0.5 leading-relaxed transition-colors hover:bg-indigo/10"
                >
                  <Furigana
                    segments={[{ text: word.text, reading: showFurigana ? word.reading : undefined }]}
                    className="font-jp text-lg"
                  />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
