import { useState } from 'react';
import type { Card } from '../../db/schema';
import type { Grade } from '../srs/fsrs';
import GradeButtons from '../srs/GradeButtons';
import AudioButton from '../../components/AudioButton';
import Furigana from '../../components/Furigana';
import SessionHeader from '../../components/SessionHeader';
import StudyCard from '../../components/StudyCard';
import { Eye, MessageCircle } from 'lucide-react';
import { useShortcuts } from '../../lib/useShortcuts';
import CardExampleView from './CardExampleView';
import { NoteBox } from './CardNote';
import { cardNote } from './note';
import type { StudyItem } from './stages';
import { registrarAtividade } from '../atividade/atividade';
import { desfazerRevisao, registrarRevisao, type RevisaoFeita } from './revisao';

/**
 * "review" usa a nota pra atualizar o FSRS (stability/difficulty/dueDate) —
 * é a revisão guiada pelo algoritmo. "practice" só passa os cards pra
 * frente, sem gravar nada — pra poder treinar a qualquer momento sem
 * distorcer a agenda de repetição espaçada.
 *
 * Cada item tem uma direção: "recognition" (japonês → português, o card de
 * sempre) ou "production" (português → japonês, a partir do estágio
 * Sei dizer — ver stages.ts). A produção é respondida de cabeça/em voz alta
 * e autoavaliada, igual ao reconhecimento.
 */
export type StudyMode = 'review' | 'practice';

export default function StudySession({
  items,
  mode,
  onDone,
  onQuit = onDone,
  doneLabel = 'Voltar',
}: {
  items: StudyItem[];
  mode: StudyMode;
  /** Fim normal da sessão (botão da tela final). */
  onDone: () => void;
  /** "Desistir e voltar" no meio — por padrão, o mesmo que onDone. */
  onQuit?: () => void;
  /** Rótulo do botão da tela final — ex.: "Continuar para os kanji" na Revisão do dia. */
  doneLabel?: string;
}) {
  const [index, setIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [grading, setGrading] = useState(false);
  // Pilha de notas dadas nesta sessão (só no modo review). Os objetos em
  // `items` são a foto de antes da sessão, então servem de "estado anterior"
  // pra restaurar no desfazer.
  const [undoStack, setUndoStack] = useState<RevisaoFeita[]>([]);

  const item = items[index];
  const card = item?.card;
  const isProduction = item?.direction === 'production';
  const note = card ? cardNote(card) : undefined;
  const canUndo = index > 0 && !grading;

  function advance() {
    setShowBack(false);
    setIndex((i) => i + 1);
  }

  function nextPractice() {
    void registrarAtividade('praticas');
    advance();
  }

  async function grade(rating: Grade) {
    // Sem essa trava, um segundo clique durante a gravação (dedo trêmulo,
    // duplo clique) registraria uma revisão duplicada no histórico e pularia
    // o próximo card sem revisar (advance() chamado duas vezes).
    if (grading || !card) return;
    setGrading(true);
    const feita = await registrarRevisao(card, item.direction, rating);
    setUndoStack((st) => [...st, feita]);
    setGrading(false);
    advance();
  }

  // Volta um card e mostra a resposta de novo, pronto pra ser reavaliado.
  // No modo review, restaura o estado FSRS anterior (inclusive desfaz uma
  // promoção pra Sei dizer) e apaga a revisão gravada — como se a nota nunca
  // tivesse sido dada.
  async function undo() {
    if (!canUndo) return;
    if (mode === 'review') {
      const last = undoStack[undoStack.length - 1];
      if (!last) return;
      setGrading(true);
      await desfazerRevisao(last);
      setUndoStack((st) => st.slice(0, -1));
      setGrading(false);
    } else {
      void registrarAtividade('praticas', -1);
    }
    setIndex((i) => i - 1);
    setShowBack(true);
  }

  useShortcuts({
    undo: canUndo ? undo : undefined,
    ' ': card && !showBack ? () => setShowBack(true) : card && mode === 'practice' ? nextPractice : undefined,
    Enter: card && !showBack ? () => setShowBack(true) : card && mode === 'practice' ? nextPractice : undefined,
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
            {doneLabel}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <SessionHeader
        index={index}
        total={items.length}
        onUndo={canUndo ? undo : undefined}
        onQuit={onQuit}
        badge={
          mode === 'practice' && (
            <span className="rounded bg-line/60 px-2 py-0.5 text-xs uppercase tracking-wide">Prática livre</span>
          )
        }
      />

      <StudyCard
        etiqueta={
          isProduction ? (
            <span className="badge bg-matcha/12 text-xs text-matcha">
              <MessageCircle className="h-3.5 w-3.5" />
              Dizer em japonês
            </span>
          ) : (
            <span className="badge bg-sora/12 text-xs text-sora">
              <Eye className="h-3.5 w-3.5" />
              Reconhecer
            </span>
          )
        }
      >
        {isProduction ? (
          <div className="w-full">
            <p className="label">Como se diz em japonês?</p>
            <p className="text-2xl">{card.back}</p>
            {card.example && !showBack && <ClozeSentence card={card} />}
            {showBack && (
              <div className="mt-4 border-t border-line pt-4">
                <div className="flex items-center justify-center gap-2">
                  <p className="font-jp text-5xl">{card.front}</p>
                  <AudioButton text={card.front} />
                </div>
                {card.reading && <p className="font-jp text-lg text-sage">{card.reading}</p>}
                <NotaEExemplo card={card} note={note} />
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-center gap-2">
              <p className="font-jp text-5xl">{card.front}</p>
              <AudioButton text={card.front} />
            </div>
            {showBack && (
              <div className="mt-4 border-t border-line pt-4">
                {card.reading && <p className="font-jp text-lg text-sage">{card.reading}</p>}
                <p className="text-xl">{card.back}</p>
                <NotaEExemplo card={card} note={note} />
              </div>
            )}
          </div>
        )}
      </StudyCard>

      {!showBack ? (
        <button className="btn-primary w-full" onClick={() => setShowBack(true)}>
          Mostrar resposta <kbd className="kbd">Espaço</kbd>
        </button>
      ) : mode === 'review' ? (
        <GradeButtons srs={isProduction ? card.production! : card} disabled={grading} onGrade={grade} />
      ) : (
        <button className="btn-primary w-full" onClick={nextPractice}>
          Próximo <kbd className="kbd">Espaço</kbd>
        </button>
      )}
    </div>
  );
}

/** Nota e frase de contexto do card, no verso das duas direções. */
function NotaEExemplo({ card, note }: { card: Card; note?: string }) {
  return (
    <>
      {note && (
        <div className="mt-4">
          <NoteBox note={note} />
        </div>
      )}
      {card.example && (
        <div className="mt-4">
          <CardExampleView example={card.example} source={card.source} />
        </div>
      )}
    </>
  );
}

/**
 * Frente do card de produção com frase de contexto: a frase com lacuna no
 * lugar da palavra do card (mantendo partícula grudada, ex.: "＿＿が"), sem
 * furigana na lacuna, mais a tradução da frase como pista.
 */
function ClozeSentence({ card }: { card: Card }) {
  const example = card.example!;
  return (
    <div className="mt-4 space-y-1 border-t border-line pt-4">
      <div className="flex flex-wrap items-center justify-center gap-x-0.5 gap-y-1">
        {example.segments.map((seg, i) =>
          i === example.highlight ? (
            <span key={i} className="font-jp text-lg">
              <span className="rounded bg-indigo/10 px-2 text-indigo">＿＿</span>
              {seg.text.startsWith(card.front) ? seg.text.slice(card.front.length) : ''}
            </span>
          ) : (
            <Furigana key={i} segments={[seg]} className="font-jp text-lg" />
          )
        )}
      </div>
      {example.translation && <p className="text-sm text-sage">{example.translation}</p>}
    </div>
  );
}
