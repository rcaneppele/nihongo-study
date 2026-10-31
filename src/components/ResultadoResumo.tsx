import type { ReactNode } from 'react';
import ProgressRing from './ProgressRing';

/**
 * Topo das telas de resultado (quiz, kakitori, diga em japonês, kana): anel
 * com a porcentagem de acerto, colorido pela nota — verde ≥ 80%, âmbar ≥ 50%,
 * vermelho abaixo — e o "x de y". `children` = ações extras (ex.: salvar
 * erradas nos flash cards).
 */
export default function ResultadoResumo({
  titulo,
  acertos,
  total,
  unidade = 'corretos',
  children,
}: {
  titulo: string;
  acertos: number;
  total: number;
  unidade?: string;
  children?: ReactNode;
}) {
  const percent = total ? Math.round((acertos / total) * 100) : 0;

  return (
    <div className="card-hero flex flex-col items-center gap-2 text-center">
      <p className="text-sm text-sage">{titulo}</p>
      <ProgressRing
        fracao={percent / 100}
        cor={percent >= 80 ? 'matcha' : percent >= 50 ? 'kin' : 'hanko'}
        tamanho="h-28 w-28"
      >
        <p className="text-3xl font-semibold">{percent}%</p>
      </ProgressRing>
      <p className="text-sm text-sage">
        {acertos} de {total} {unidade}
      </p>
      {children}
    </div>
  );
}
