import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, type KanjiProgress } from '../../db/schema';
import { applyFsrs, type Grade } from '../srs/fsrs';
import GradeButtons from '../srs/GradeButtons';
import type { KanjiEntry } from '../../data/kanji';
import AudioButton from '../../components/AudioButton';
import Furigana from '../../components/Furigana';
import SessionHeader from '../../components/SessionHeader';
import { useShortcuts } from '../../lib/useShortcuts';

/**
 * Revisão espaçada dos kanji já aprendidos — mesmo padrão auto-graded de
 * StudySession.tsx (flash cards): mostra o kanji, "Mostrar resposta" revela
 * leituras/significado/exemplos, e a nota do FSRS (GradeButtons) atualiza
 * kanjiProgress. Desfazer restaura o kanjiProgress de antes da nota.
 */
export default function KanjiReviewSession({ entries, onDone }: { entries: KanjiEntry[]; onDone: () => void }) {
  const [index, setIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [grading, setGrading] = useState(false);
  const [undoStack, setUndoStack] = useState<KanjiProgress[]>([]);
  const entry = entries[index];
  const progress = useLiveQuery(() => (entry ? db.kanjiProgress.get(entry.char) : undefined), [entry?.char]);
  const canUndo = index > 0 && !grading;

  async function grade(rating: Grade) {
    if (grading || !entry) return;
    setGrading(true);
    const before = await db.kanjiProgress.get(entry.char);
    if (before) {
      const result = applyFsrs(before, rating);
      await db.kanjiProgress.update(entry.char, { ...result, updatedAt: Date.now() });
      setUndoStack((s) => [...s, before]);
    }
    setGrading(false);
    setShowBack(false);
    setIndex((i) => i + 1);
  }

  async function undo() {
    if (!canUndo) return;
    const last = undoStack[undoStack.length - 1];
    if (last) {
      setGrading(true);
      await db.kanjiProgress.put({ ...last, updatedAt: Date.now() });
      setUndoStack((s) => s.slice(0, -1));
      setGrading(false);
    }
    setIndex((i) => i - 1);
    setShowBack(true);
  }

  useShortcuts({
    undo: canUndo ? undo : undefined,
    ' ': entry && !showBack ? () => setShowBack(true) : undefined,
    Enter: entry && !showBack ? () => setShowBack(true) : undefined,
  });

  if (!entry) {
    return (
      <div className="card-surface space-y-4 text-center">
        <p className="font-display text-xl">Revisão concluída.</p>
        <div className="flex justify-center gap-2">
          {canUndo && (
            <button className="btn-ghost" onClick={undo}>
              Desfazer última
            </button>
          )}
          <button className="btn-primary" onClick={onDone}>
            Voltar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <SessionHeader index={index} total={entries.length} onUndo={canUndo ? undo : undefined} onQuit={onDone} />

      <div className="card-surface min-h-48 space-y-4 text-center">
        <div className="flex items-center justify-center gap-2">
          <p className="font-jp text-7xl">{entry.char}</p>
          {showBack && <AudioButton text={entry.examples[0]?.word ?? entry.char} />}
        </div>

        {showBack && (
          <div className="space-y-4 border-t border-line pt-4 text-left">
            <p className="text-center text-lg text-indigo">{entry.meaning}</p>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="label mb-1">Kun'yomi</p>
                {entry.kunyomi.length === 0 ? (
                  <p className="text-sage">—</p>
                ) : (
                  entry.kunyomi.map((r, i) => (
                    <p key={i} className="font-jp">
                      {r.kana} <span className="text-sage">({r.romaji})</span>
                    </p>
                  ))
                )}
              </div>
              <div>
                <p className="label mb-1">On'yomi</p>
                {entry.onyomi.length === 0 ? (
                  <p className="text-sage">—</p>
                ) : (
                  entry.onyomi.map((r, i) => (
                    <p key={i} className="font-jp">
                      {r.kana} <span className="text-sage">({r.romaji})</span>
                    </p>
                  ))
                )}
              </div>
            </div>

            <div>
              <p className="label mb-1.5">Exemplos</p>
              <div className="space-y-1.5">
                {entry.examples.map((ex, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <Furigana segments={[{ text: ex.word, reading: ex.reading }]} className="font-jp text-lg" />
                    <AudioButton text={ex.word} size="sm" />
                    <span className="text-sage">{ex.meaning}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {!showBack ? (
        <button className="btn-primary w-full" onClick={() => setShowBack(true)}>
          Mostrar resposta <kbd className="kbd">Espaço</kbd>
        </button>
      ) : (
        progress && <GradeButtons srs={progress} disabled={grading} onGrade={grade} />
      )}
    </div>
  );
}
