/** Novo conjunto com `item` incluído se não estava, ou removido se estava (seleção de chips). */
export function alternar<T>(conjunto: ReadonlySet<T>, item: T): Set<T> {
  const novo = new Set(conjunto);
  if (novo.has(item)) novo.delete(item);
  else novo.add(item);
  return novo;
}

/** Novo conjunto com todos os `itens` incluídos (`ligar`) ou removidos. */
export function definirVarios<T>(conjunto: ReadonlySet<T>, itens: Iterable<T>, ligar: boolean): Set<T> {
  const novo = new Set(conjunto);
  for (const item of itens) {
    if (ligar) novo.add(item);
    else novo.delete(item);
  }
  return novo;
}
