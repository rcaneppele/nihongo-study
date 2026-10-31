/** Ícones de módulo feitos com o próprio caractere japonês (mesmo tamanho dos ícones lucide). */
export function IconKana({ className }: { className?: string }) {
  return (
    <span aria-hidden className={`grid place-items-center font-jp text-[0.95rem] leading-none ${className ?? ''}`}>
      あ
    </span>
  );
}

export function IconKanji({ className }: { className?: string }) {
  return (
    <span aria-hidden className={`grid place-items-center font-jp text-[0.95rem] leading-none ${className ?? ''}`}>
      字
    </span>
  );
}
