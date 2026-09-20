import { useState } from 'react';
import { db } from '../../db/schema';
import type { KanjiEntry } from '../../data/kanji';
import { scoreDrawing, type DrawScore, type Stroke } from '../handwriting/strokes';
import StrokeReferenceFigure from '../handwriting/StrokeReferenceFigure';
import KanaCanvas from '../../components/KanaCanvas';

const CANVAS_SIZE = 280;

/**
 * Prática de caligrafia dos kanji já aprendidos — mesmo motor do modo
 * "desenho" do treino de kana (KanaCanvas + scoreDrawing), gravando
 * drawBest em kanjiProgress. Independente do ciclo de FSRS, igual ao
 * drawBest de KanaProgress: não é gatilho de agendamento de revisão.
 */
export default function KanjiDrawSession({ entries, onDone }: { entries: KanjiEntry[]; onDone: () => void }) {
  const [index, setIndex] = useState(0);
  const entry = entries[index];

  if (!entry) {
    return (
      <div className="card-surface space-y-4 text-center">
        <p className="font-display text-xl">
          {entries.length === 0 ? 'Aprenda um kanji antes de praticar a caligrafia dele.' : 'Prática concluída.'}
        </p>
        <button className="btn-primary" onClick={onDone}>
          Voltar
        </button>
      </div>
    );
  }

  function next() {
    setIndex((i) => i + 1);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm text-sage">
        <span>
          {index + 1} de {entries.length}
        </span>
        <button className="text-xs text-sage hover:text-hanko hover:underline" onClick={onDone}>
          Parar por aqui
        </button>
      </div>
      <DrawQuestion key={entry.char} entry={entry} onNext={next} />
    </div>
  );
}

function DrawQuestion({ entry, onNext }: { entry: KanjiEntry; onNext: () => void }) {
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [result, setResult] = useState<DrawScore | null>(null);

  async function check(giveUp = false) {
    if (result) return;
    const outcome = scoreDrawing(giveUp ? [] : strokes, entry.char, CANVAS_SIZE);
    setResult(outcome);
    const p = await db.kanjiProgress.get(entry.char);
    if (p) {
      await db.kanjiProgress.update(entry.char, {
        drawBest: Math.max(p.drawBest ?? 0, outcome.score),
        updatedAt: Date.now(),
      });
    }
  }

  return (
    <div className="card-surface space-y-4">
      <div className="text-center">
        <p className="text-sm text-sage">Desenhe o kanji para:</p>
        <p className="font-jp text-2xl text-indigo">{entry.meaning}</p>
      </div>

      <div className="flex justify-center">
        <KanaCanvas size={CANVAS_SIZE} onStrokesChange={setStrokes} />
      </div>

      {!result ? (
        <div className="flex justify-center gap-3">
          <button className="btn-primary" onClick={() => check()}>
            Verificar
          </button>
          <button className="btn-ghost" onClick={() => check(true)}>
            Não sei
          </button>
        </div>
      ) : (
        <div className="space-y-3 text-center">
          <p className={`text-3xl font-semibold ${result.passed ? 'text-indigo' : 'text-hanko'}`}>{result.score}%</p>

          {result.hints.length > 0 && (
            <ul className="mx-auto max-w-xs space-y-1 text-left text-sm text-sage">
              {result.hints.map((hint, i) => (
                <li key={i}>• {hint}</li>
              ))}
            </ul>
          )}

          <div className="flex flex-col items-center gap-1">
            <p className="text-xs text-sage">Traço correto:</p>
            <StrokeReferenceFigure char={entry.char} />
          </div>

          <button className="btn-primary mx-auto block w-full max-w-[10rem]" onClick={onNext} autoFocus>
            Próximo
          </button>
        </div>
      )}
    </div>
  );
}
