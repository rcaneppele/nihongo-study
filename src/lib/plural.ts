/**
 * Concordância de número nos textos da interface — no lugar de "card(s)" e
 * "item(ns)", e de plural fixo que erra no 1 ("1 palavras").
 */

/** Só a palavra: `um` para 1, `varios` para o resto (inclusive 0: "0 cards"). */
export function palavra(n: number, um: string, varios: string): string {
  return n === 1 ? um : varios;
}

/** O número e a palavra concordando: "1 card", "3 cards". */
export function plural(n: number, um: string, varios: string): string {
  return `${n} ${palavra(n, um, varios)}`;
}
