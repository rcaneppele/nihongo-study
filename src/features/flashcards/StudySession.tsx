import { useState } from 'react';
import { db, type Card, newId } from '../../db/schema';
import { applySm2, REVIEW_GRADES } from '../srs/sm2';
import AudioButton from '../../components/AudioButton';

/**
 * "review" usa a nota pra atualizar o SM-2 (ef/interval/dueDate) — é a
 * revisão guiada pelo algoritmo. "practice" só passa os cards pra frente,
 * sem gravar nada — pra poder treinar a qualquer momento sem distorcer a
 * agenda de repetição espaçada.
 */
export type StudyMode = 'review' | 'practice';

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

  const card = cards[index];
  if (!card) {
    return (
      <div className="card-surface text-center">
        <p className="font-display text-xl">Sessão concluída.</p>
        <button className="btn-primary mt-4" onClick={onDone}>
          Voltar
        </button>
      </div>
    );
  }

  function advance() {
    setShowBack(false);
    setIndex((i) => i + 1);
  }

  async function grade(quality: number) {
    const result = applySm2(card, quality);
    await db.transaction('rw', db.cards, db.reviews, async () => {
      await db.cards.update(card.id, {
        ...result,
        lastReviewedAt: Date.now(),
        updatedAt: Date.now(),
      });
      await db.reviews.add({
        id: newId(),
        cardId: card.id,
        reviewedAt: Date.now(),
        quality,
        intervalAfter: result.interval,
      });
    });
    advance();
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm text-sage">
        <div className="flex items-center gap-2">
          {mode === 'practice' && (
            <span className="rounded bg-line/60 px-2 py-0.5 text-xs uppercase tracking-wide">Prática livre</span>
          )}
          <span>
            {index + 1} de {cards.length}
          </span>
        </div>
        <button className="text-xs text-sage hover:text-hanko hover:underline" onClick={onDone}>
          Desistir e voltar
        </button>
      </div>

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
          Mostrar resposta
        </button>
      ) : mode === 'review' ? (
        <div className="grid grid-cols-4 gap-2">
          {REVIEW_GRADES.map((g) => (
            <button key={g.label} className="btn-ghost" onClick={() => grade(g.quality)}>
              {g.label}
            </button>
          ))}
        </div>
      ) : (
        <button className="btn-primary w-full" onClick={advance}>
          Próximo
        </button>
      )}
    </div>
  );
}
