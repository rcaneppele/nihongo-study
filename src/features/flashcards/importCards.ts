import { type Card, newId } from '../../db/schema';
import { freshSrs } from '../srs/sm2';

/**
 * Importação simples de cards via CSV.
 * Formato esperado (com ou sem cabeçalho):
 *
 *   front,back,reading,category,tags
 *   猫,gato,ねこ,Animais,n5;substantivo
 *
 * Tags são separadas por ';'. Este parser é propositalmente simples e NÃO
 * trata todos os casos de CSV (ex.: vírgulas dentro de aspas).
 * TODO: trocar por um parser robusto (ex.: papaparse) se necessário.
 */
export function parseCardsCsv(text: string): Card[] {
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length === 0) return [];

  const hasHeader = /front/i.test(lines[0]) && /back/i.test(lines[0]);
  const rows = hasHeader ? lines.slice(1) : lines;
  const now = Date.now();

  return rows.map((line) => {
    const cols = line.split(',').map((c) => c.trim());
    const [front = '', back = '', reading = '', category = '', tags = ''] = cols;
    return {
      id: newId(),
      front,
      back,
      reading: reading || undefined,
      category: category || undefined,
      tags: tags ? tags.split(';').map((t) => t.trim()).filter(Boolean) : [],
      ...freshSrs(now),
      createdAt: now,
      updatedAt: now,
    } satisfies Card;
  });
}

/** Importação via JSON: um array de objetos parciais de card. */
export function parseCardsJson(text: string): Card[] {
  const data = JSON.parse(text);
  if (!Array.isArray(data)) throw new Error('JSON de cards deve ser um array.');
  const now = Date.now();
  return data.map((raw: Partial<Card>) => ({
    id: raw.id ?? newId(),
    front: raw.front ?? '',
    back: raw.back ?? '',
    reading: raw.reading,
    category: raw.category,
    tags: raw.tags ?? [],
    ...freshSrs(now),
    createdAt: now,
    updatedAt: now,
  }));
}
