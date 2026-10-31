import { useState } from 'react';
import { db, type Card, newId } from '../../db/schema';
import { applyFsrs, type Grade } from '../srs/fsrs';
import GradeButtons from '../srs/GradeButtons';
import AudioButton from '../../components/AudioButton';
import SessionHeader from '../../components/SessionHeader';
import { useShortcuts } from '../../lib/useShortcuts';

/**
 * "review" usa a nota pra atualizar o FSRS (stability/difficulty/dueDate) —
 * é a revisão guiada pelo algoritmo. "practice" só passa os cards pra
 * frente, sem gravar nada — pra poder treinar a qualquer momento sem
 * distorcer a agenda de repetição espaçada.
 */
export type StudyMode = 'review' | 'practice';

/** O que precisa ser revertido ao desfazer uma nota: o card como estava antes e a linha de `reviews` criada. */
interface UndoEntry {
  before: Card;
  reviewId: string;
}

export default function StudySession({
  cards,
  mode,
  onDone,
}: {
  cards: Card[];
  mode: StudyMode;
  onDone: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [grading, setGrading] = useState(false);
  // Pilha de notas dadas nesta sessão (só no modo review). Os objetos em
  // `cards` são a foto de antes da sessão, então servem de "estado anterior"
  // pra restaurar no desfazer.
  const [undoStack, setUndoStack] = useState<UndoEntry[]>([]);

  const card = cards[index];
  const canUndo = index > 0 && !grading;

  function advance() {
    setShowBack(false);
    setIndex((i) => i + 1);
  }

  async function grade(rating: Grade) {
    // Sem essa trava, um segundo clique durante a gravação (dedo trêmulo,
    // duplo clique) registraria uma revisão duplicada no histórico e pularia
    // o próximo card sem revisar (advance() chamado duas vezes).
    if (grading) return;
    setGrading(true);
    const result = applyFsrs(card, rating);
    const reviewId = newId();
    await db.transaction('rw', db.cards, db.reviews, async () => {
      await db.cards.update(card.id, {
        ...result,
        updatedAt: Date.now(),
      });
      await db.reviews.add({
        id: reviewId,
        cardId: card.id,
        reviewedAt: Date.now(),
        quality: rating,
        intervalAfter: result.scheduledDays,
      });
    });
    setUndoStack((s) => [...s, { before: card, reviewId }]);
    setGrading(false);
    advance();
  }

  // Volta um card e mostra a resposta de novo, pronto pra ser reavaliado.
  // No modo review, restaura o estado FSRS anterior e apaga a revisão gravada
  // — como se a nota nunca tivesse sido dada.
  async function undo() {
    if (!canUndo) return;
    if (mode === 'review') {
      const last = undoStack[undoStack.length - 1];
      if (!last) return;
      setGrading(true);
      await db.transaction('rw', db.cards, db.reviews, async () => {
        await db.cards.put({ ...last.before, updatedAt: Date.now() });
        await db.reviews.delete(last.reviewId);
      });
      setUndoStack((s) => s.slice(0, -1));
      setGrading(false);
    }
    setIndex((i) => i - 1);
    setShowBack(true);
  }

  useShortcuts({
    undo: canUndo ? undo : undefined,
    ' ': card && !showBack ? () => setShowBack(true) : card && mode === 'practice' ? advance : undefined,
    Enter: card && !showBack ? () => setShowBack(true) : card && mode === 'practice' ? advance : undefined,
  });

  if (!card) {
    return (
      <div className="card-surface text-center">
        <p className="font-display text-xl">Sessão concluída.</p>
        <div className="mt-4 flex justify-center gap-2">
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
      <SessionHeader
        index={index}
        total={cards.length}
        onUndo={canUndo ? undo : undefined}
        onQuit={onDone}
        badge={
          mode === 'practice' && (
            <span className="rounded bg-line/60 px-2 py-0.5 text-xs uppercase tracking-wide">Prática livre</span>
          )
        }
      />

      <div className="card-surface min-h-48 grid place-items-center text-center">
        <div>
          <div className="flex items-center justify-center gap-2">
            <p className="font-jp text-4xl">{card.front}</p>
            <AudioButton text={card.front} />
          </div>
          {showBack && (
            <div className="mt-4 border-t border-line pt-4">
              {card.reading && <p className="font-jp text-lg text-sage">{card.reading}</p>}
              <p className="text-xl">{card.back}</p>
            </div>
          )}
        </div>
      </div>

      {!showBack ? (
        <button className="btn-primary w-full" onClick={() => setShowBack(true)}>
          Mostrar resposta <kbd className="kbd">Espaço</kbd>
        </button>
      ) : mode === 'review' ? (
        <GradeButtons srs={card} disabled={grading} onGrade={grade} />
      ) : (
        <button className="btn-primary w-full" onClick={advance}>
          Próximo <kbd className="kbd">Espaço</kbd>
        </button>
      )}
    </div>
  );
}
