import type { ReactNode } from 'react';

export interface OpcaoSegmentada<T extends string | number> {
  valor: T;
  rotulo: ReactNode;
}

/**
 * Escolha única em botões lado a lado (classes `segmented`/`segmented-item`).
 * `aria-pressed` diz qual está selecionada — pra leitor de tela e pros testes.
 */
export default function Segmentado<T extends string | number>({
  opcoes,
  valor,
  onChange,
  rotulo,
  itemClassName = '',
}: {
  opcoes: readonly OpcaoSegmentada<T>[];
  valor: T;
  onChange: (valor: T) => void;
  /** Nome do grupo para leitor de tela (ex.: "Tema"). */
  rotulo: string;
  itemClassName?: string;
}) {
  return (
    <div className="segmented" role="group" aria-label={rotulo}>
      {opcoes.map((o) => (
        <button
          key={o.valor}
          type="button"
          aria-pressed={valor === o.valor}
          onClick={() => onChange(o.valor)}
          className={`segmented-item ${itemClassName} ${valor === o.valor ? 'segmented-item-active' : ''}`}
        >
          {o.rotulo}
        </button>
      ))}
    </div>
  );
}
