import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import type { ReadingLine, ReadingText, ReadingWord } from '../../data/leitura/types';
import { exampleFromLine, findCardByFront, saveMinedCard, sourceFromText, suggestCard } from './mining';

/**
 * "Salvar nos flash cards" no cartão da palavra tocada na leitura. Abre um
 * mini-formulário pré-preenchido (`suggestCard`) pra o usuário conferir —
 * a forma no texto costuma vir com partícula/conjugação — e cria o card com
 * a frase de contexto e a origem. Montar com `key` por palavra, pra o
 * estado zerar ao tocar em outra.
 */
export default function SaveWordForm({
  word,
  wordIndex,
  line,
  texto,
}: {
  word: ReadingWord;
  wordIndex: number;
  line: ReadingLine;
  texto: ReadingText;
}) {
  const suggestion = suggestCard(word);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(suggestion);
  const [error, setError] = useState<string | null>(null);
  const existing = useLiveQuery(() => findCardByFront(suggestion.front), [suggestion.front]);

  if (existing) {
    return <p className="text-xs text-sage">✓ Já está nos seus flash cards</p>;
  }

  if (!editing) {
    return (
      <button className="btn-ghost px-3 py-1 text-xs" onClick={() => setEditing(true)}>
        + Salvar nos flash cards
      </button>
    );
  }

  async function save() {
    const front = draft.front.trim();
    if (!front || !draft.back.trim()) return;
    if (await findCardByFront(front)) {
      setError(`Você já tem um card com "${front}".`);
      return;
    }
    await saveMinedCard(draft, exampleFromLine(line, wordIndex), sourceFromText(texto));
    setEditing(false);
  }

  function field(key: keyof typeof draft, label: string, jp: boolean) {
    return (
      <div>
        <label className="label" htmlFor={`save-${key}`}>
          {label}
        </label>
        <input
          id={`save-${key}`}
          className={`field ${jp ? 'font-jp' : ''}`}
          value={draft[key]}
          onChange={(e) => {
            setError(null);
            setDraft((d) => ({ ...d, [key]: e.target.value }));
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-3 rounded-lg border border-line p-3">
      <p className="text-xs text-sage">
        Confira antes de salvar — no texto a palavra pode estar com partícula ou conjugada. A frase onde ela apareceu vai
        junto no card.
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        {field('front', 'Frente (japonês)', true)}
        {field('reading', 'Leitura (opcional)', true)}
        {field('back', 'Significado', false)}
      </div>
      {error && <p className="text-xs text-hanko">{error}</p>}
      <div className="flex gap-2">
        <button className="btn-primary px-3 py-1 text-xs" onClick={save} disabled={!draft.front.trim() || !draft.back.trim()}>
          Salvar
        </button>
        <button className="btn-ghost px-3 py-1 text-xs" onClick={() => setEditing(false)}>
          Cancelar
        </button>
      </div>
    </div>
  );
}
