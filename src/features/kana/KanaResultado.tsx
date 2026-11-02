import ResultadoResumo from '../../components/ResultadoResumo';
import type { RespostaKana } from './treino';

export default function KanaResultado({
  answers,
  onRestart,
  onBackToConfig,
}: {
  answers: RespostaKana[];
  onRestart: () => void;
  onBackToConfig: () => void;
}) {
  const total = answers.length;
  const correct = answers.filter((a) => a.correct).length;
  const mistakes = answers.filter((a) => !a.correct);

  return (
    <div className="space-y-4">
      <ResultadoResumo titulo="Resultado do teste" acertos={correct} total={total} />
      <div className="card-surface space-y-6 text-center">

      {mistakes.length > 0 && (
        <div className="text-left">
          <p className="mb-2 text-sm font-medium text-ink">Para revisar</p>
          <div className="flex flex-wrap gap-2">
            {mistakes.map((m, i) => (
              <span key={i} className="rounded-xl border border-kin/25 bg-kin/8 px-3 py-1.5 text-sm">
                <span className="font-jp">{m.entry.char}</span> — {m.entry.romaji}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-center gap-3">
        <button className="btn-ghost" onClick={onBackToConfig}>
          Nova seleção
        </button>
        <button className="btn-primary" onClick={onRestart}>
          Refazer teste
        </button>
      </div>
      </div>
    </div>
  );
}
