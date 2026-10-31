import { previewInterval, REVIEW_GRADES, Rating, type Grade, type SrsState } from './fsrs';
import { useGradeMode } from './gradeMode';
import { useShortcuts } from '../../lib/useShortcuts';

/**
 * Botões de nota das revisões (flash cards e kanji). Cada botão tem uma
 * legenda pequena com quando o card volta ("rever em 12 dias") — explica a
 * consequência da nota em vez de deixar o usuário adivinhar — e o atalho de
 * teclado. Espaço/Enter = "Lembrei" (a resposta mais comum).
 *
 * Só fica montado com a resposta revelada, então os atalhos numéricos não
 * disparam antes do "Mostrar resposta".
 */
export default function GradeButtons({
  srs,
  disabled,
  onGrade,
}: {
  srs: SrsState;
  disabled: boolean;
  onGrade: (grade: Grade) => void;
}) {
  const mode = useGradeMode();
  const grades = REVIEW_GRADES.filter((g) => mode === 'full' || g.simple);
  const now = Date.now();

  const shortcuts: Record<string, () => void> = {};
  grades.forEach((g, i) => {
    shortcuts[String(i + 1)] = () => !disabled && onGrade(g.grade);
  });
  shortcuts[' '] = shortcuts.Enter = () => !disabled && onGrade(Rating.Good);
  useShortcuts(shortcuts);

  return (
    <div className={`grid gap-2 ${grades.length === 4 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-2'}`}>
      {grades.map((g, i) => (
        <button
          key={g.label}
          className={`btn flex-col gap-0.5 py-2.5 ${GRADE_STYLE[g.grade]}`}
          disabled={disabled}
          title={g.hint}
          onClick={() => onGrade(g.grade)}
        >
          <span className="flex items-center gap-1.5">
            {g.label}
            <kbd className="kbd">{i + 1}</kbd>
            {g.grade === Rating.Good && <kbd className="kbd">Espaço</kbd>}
          </span>
          <span className="text-xs font-normal opacity-75">{formatInterval(previewInterval(srs, g.grade, now))}</span>
        </button>
      ))}
    </div>
  );
}

// Cor de significado por nota, em tons suaves — só "Lembrei" (a resposta
// mais comum) é sólido, pra ser a ação óbvia.
const GRADE_STYLE: Record<Grade, string> = {
  [Rating.Again]: 'border border-hanko/30 bg-hanko/5 text-hanko hover:bg-hanko/10',
  [Rating.Hard]: 'border border-kin/30 bg-kin/5 text-kin hover:bg-kin/10',
  [Rating.Good]: 'bg-indigo text-paper hover:bg-indigo-soft',
  [Rating.Easy]: 'border border-matcha/30 bg-matcha/5 text-matcha hover:bg-matcha/10',
};

function formatInterval(days: number): string {
  if (days <= 1) return 'rever amanhã';
  if (days < 30) return `rever em ${days} dias`;
  if (days < 365) {
    const months = Math.round(days / 30);
    return months === 1 ? 'rever em 1 mês' : `rever em ${months} meses`;
  }
  const years = Math.round((days / 365) * 10) / 10;
  return years === 1 ? 'rever em 1 ano' : `rever em ${String(years).replace('.', ',')} anos`;
}
