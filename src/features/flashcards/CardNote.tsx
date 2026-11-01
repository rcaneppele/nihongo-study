import { useState } from 'react';
import { db, type Card } from '../../db/schema';
import { carimbosCard } from '../../db/merge';
import { cardNote } from './note';

/** Bloco da nota no verso do card (sessão de estudo) e no painel do mapa de vocabulário. */
export function NoteBox({ note }: { note: string }) {
  return (
    <div className="rounded-lg bg-indigo/5 px-3 py-2 text-left text-sm text-ink">
      <span className="mr-1 font-medium text-indigo">Nota:</span>
      {note}
    </div>
  );
}

/**
 * Editar a nota de um card na lista de /flashcards. Abre um campo
 * pré-preenchido com a nota atual (inclusive a do deck N5); salvar vazio
 * grava `''`, que esconde a nota.
 */
export function NoteEditor({ card }: { card: Card }) {
  const current = cardNote(card) ?? '';
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(current);

  if (!editing) {
    return (
      <button
        className="text-xs text-sage hover:text-indigo"
        title={current || 'Adicionar uma nota (origem, uso, falso amigo…)'}
        onClick={() => {
          setText(current);
          setEditing(true);
        }}
      >
        {current ? 'Nota' : '+ Nota'}
      </button>
    );
  }

  async function save() {
    await db.cards.update(card.id, { note: text.trim(), ...carimbosCard(card, ['contentUpdatedAt'], Date.now()) });
    setEditing(false);
  }

  return (
    <div className="mt-2 w-full space-y-2">
      <textarea
        className="field min-h-16"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Origem da palavra, uso, falso amigo…"
        aria-label={`Nota de ${card.front}`}
      />
      <div className="flex gap-2">
        <button className="btn-primary px-3 py-1 text-xs" onClick={save}>
          Salvar nota
        </button>
        <button className="btn-ghost px-3 py-1 text-xs" onClick={() => setEditing(false)}>
          Cancelar
        </button>
      </div>
    </div>
  );
}
