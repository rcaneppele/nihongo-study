import { useState } from 'react';
import { db } from '../../db/schema';
import { freshSrs } from '../srs/fsrs';
import type { KanjiEntry } from '../../data/kanji';
import AudioButton from '../../components/AudioButton';
import Furigana from '../../components/Furigana';

/**
 * Tela de "aprender" um kanji novo, antes dele entrar no ciclo de revisão do
 * FSRS — mostra radicais/mnemônico, leituras e exemplos de uso de uma vez
 * (diferente da revisão, que esconde a resposta). Ao confirmar, cria a linha
 * em kanjiProgress com freshSrs() — igual ao card novo de flash cards.
 */
export default function KanjiLearn({ entries, onDone }: { entries: KanjiEntry[]; onDone: () => void }) {
  const [index, setIndex] = useState(0);
  const [saving, setSaving] = useState(false);
  const entry = entries[index];

  if (!entry) {
    return (
      <div className="card-surface space-y-4 text-center">
        <p className="font-display text-xl">
          {entries.length === 0 ? 'Nenhum kanji novo por aqui.' : 'Kanji adicionados à revisão.'}
        </p>
        <button className="btn-primary" onClick={onDone}>
          Voltar
        </button>
      </div>
    );
  }

  async function confirm() {
    if (saving) return;
    setSaving(true);
    const now = Date.now();
    await db.kanjiProgress.put({ char: entry.char, ...freshSrs(now), createdAt: now, updatedAt: now });
    setSaving(false);
    setIndex((i) => i + 1);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm text-sage">
        <span>
          {index + 1} de {entries.length} · kanji novo
        </span>
        <button className="text-xs text-sage hover:text-hanko hover:underline" onClick={onDone}>
          Parar por aqui
        </button>
      </div>

      <div className="card-surface space-y-5">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2">
            <p className="font-jp text-7xl">{entry.char}</p>
            <AudioButton text={entry.examples[0]?.word ?? entry.char} />
          </div>
          <p className="mt-1 text-lg text-indigo">{entry.meaning}</p>
        </div>

        <div>
          <p className="label mb-1.5">Radicais</p>
          <div className="flex flex-wrap gap-2">
            {entry.radicals.map((r, i) => (
              <span key={i} className="rounded-lg border border-line px-3 py-1.5 text-sm">
                <span className="font-jp mr-1.5 text-base">{r.char}</span>
                {r.name}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-line bg-line/20 p-3 text-sm leading-relaxed text-ink">
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-sage">Mnemônico</p>
          {entry.mnemonic}
        </div>

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

        <button className="btn-primary w-full" disabled={saving} onClick={confirm}>
          Entendi, adicionar à revisão
        </button>
      </div>
    </div>
  );
}
