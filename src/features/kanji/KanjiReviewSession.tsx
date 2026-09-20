import { useState } from 'react';
import { db } from '../../db/schema';
import { applyFsrs, REVIEW_GRADES, type Grade } from '../srs/fsrs';
import type { KanjiEntry } from '../../data/kanji';
import AudioButton from '../../components/AudioButton';
import Furigana from '../../components/Furigana';

/**
 * Revisão espaçada dos kanji já aprendidos — mesmo padrão auto-graded de
 * StudySession.tsx (flash cards): mostra o kanji, "Mostrar resposta" revela
 * leituras/significado/exemplos, e as 4 notas do FSRS atualizam
 * kanjiProgress.
 */
export default function KanjiReviewSession({ entries, onDone }: { entries: KanjiEntry[]; onDone: () => void }) {
  const [index, setIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [grading, setGrading] = useState(false);
  const entry = entries[index];

  if (!entry) {
    return (
      <div className="card-surface space-y-4 text-center">
        <p className="font-display text-xl">Revisão concluída.</p>
        <button className="btn-primary" onClick={onDone}>
          Voltar
        </button>
      </div>
    );
  }

  async function grade(rating: Grade) {
    if (grading) return;
    setGrading(true);
    const progress = await db.kanjiProgress.get(entry.char);
    if (progress) {
      const result = applyFsrs(progress, rating);
      await db.kanjiProgress.update(entry.char, { ...result, updatedAt: Date.now() });
    }
    setGrading(false);
    setShowBack(false);
    setIndex((i) => i + 1);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm text-sage">
        <span>
          {index + 1} de {entries.length}
        </span>
        <button className="text-xs text-sage hover:text-hanko hover:underline" onClick={onDone}>
          Desistir e voltar
        </button>
      </div>

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
          Mostrar resposta
        </button>
      ) : (
        <div className="grid grid-cols-4 gap-2">
          {REVIEW_GRADES.map((g) => (
            <button key={g.label} className="btn-ghost" disabled={grading} onClick={() => grade(g.grade)}>
              {g.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
