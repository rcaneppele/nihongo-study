import { useState } from 'react';
import { kanaExibicao, romaji, salvarFrasesComoCards, type RegistroDiga } from './gerador';

/**
 * Resultado do "Diga em japonês": acertos e a lista das frases, com a opção
 * de salvar as erradas como flash cards (já no estágio "Sei dizer") — assim
 * elas voltam em revisão espaçada em vez de sumir depois do exercício.
 */
export default function DigaResultado({ registros }: { registros: RegistroDiga[] }) {
  const acertos = registros.filter((r) => r.acertou).length;
  const erradas = registros.filter((r) => !r.acertou).map((r) => r.item);
  const [msg, setMsg] = useState<string | null>(null);

  async function salvar() {
    const n = await salvarFrasesComoCards(erradas);
    setMsg(
      n === 0
        ? 'Essas frases já estavam nos seus flash cards.'
        : `${n} frase(s) salva(s) em Flash cards, categoria "Frases" — elas vão aparecer em "Estudar" para você treinar dizer.`
    );
  }

  return (
    <div className="space-y-4">
      <div className="card-surface space-y-3 text-center">
        <p className="font-display text-xl">
          Você disse {acertos} de {registros.length} frase(s) certas
        </p>
        {erradas.length > 0 && (
          <>
            <button className="btn-ghost" onClick={salvar} disabled={msg !== null}>
              Salvar as {erradas.length} que errei nos flash cards
            </button>
            {msg && <p className="text-sm text-indigo">{msg}</p>}
          </>
        )}
      </div>

      <ul className="space-y-2">
        {registros.map(({ item, acertou }, i) => (
          <li key={i} className={`card-surface space-y-1 border-l-4 ${acertou ? 'border-l-sage' : 'border-l-hanko'}`}>
            <p className="text-sm text-ink">
              {acertou ? '✓' : '✗'} {item.pt}
            </p>
            <p className="font-jp text-lg">{kanaExibicao(item.tokens)}</p>
            <p className="text-xs text-sage">{romaji(item.tokens)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
