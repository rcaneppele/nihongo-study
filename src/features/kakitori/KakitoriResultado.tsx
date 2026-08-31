import type { RegistroKakitori } from '../../data/kakitori/types';

export default function KakitoriResultado({ registros }: { registros: RegistroKakitori[] }) {
  const acertos = registros.filter((r) => r.acertou).length;

  return (
    <div className="space-y-4">
      <div className="card-surface text-center">
        <p className="font-display text-xl">
          Você acertou {acertos} de {registros.length}
        </p>
      </div>

      <ul className="space-y-2">
        {registros.map((r, i) => (
          <li
            key={i}
            className={`card-surface space-y-1.5 border-l-4 ${r.acertou ? 'border-l-sage' : 'border-l-hanko'}`}
          >
            <p className="text-xs text-sage">{r.item.origemLabel}</p>
            <p className={`text-sm ${r.acertou ? 'text-sage' : 'text-hanko'}`}>
              {r.acertou ? '✓' : '✗'} Sua resposta:{' '}
              <span className="font-jp">{r.suaResposta.trim() || '(em branco)'}</span>
            </p>
            <p className="text-sm text-ink/80">
              Resposta: <span className="font-jp">{r.item.kana}</span>
              {r.item.kanji && <span className="font-jp text-ink/60"> ({r.item.kanji})</span>}
              {r.item.romaji && <span className="italic text-sage"> — {r.item.romaji}</span>}
            </p>
            <p className="text-xs text-sage">{r.item.pt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
