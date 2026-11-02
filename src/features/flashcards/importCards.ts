import { db, type Card } from '../../db/schema';
import { novoCard } from './cards';

/**
 * Quebra um CSV em linhas e colunas (RFC 4180): campo entre aspas pode ter
 * vírgula, quebra de linha e aspas escapadas como `""`. Linhas em branco
 * são descartadas.
 */
export function parseCsvRows(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let quoted = false;

  const endRow = () => {
    row.push(field);
    if (row.some((c) => c.trim().length > 0)) rows.push(row);
    row = [];
    field = '';
  };

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (ch === '"') quoted = false;
      else field += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ',') {
      row.push(field);
      field = '';
    } else if (ch === '\n') endRow();
    else if (ch !== '\r') field += ch;
  }
  endRow();
  return rows;
}

/**
 * Importação de cards via CSV.
 * Formato esperado (com ou sem cabeçalho):
 *
 *   front,back,reading,category,tags
 *   猫,gato,ねこ,Animais,n5;substantivo
 *
 * Tags são separadas por ';'. Campos com vírgula vão entre aspas
 * (`"comer, beber"`).
 */
export function parseCardsCsv(text: string): Card[] {
  const lines = parseCsvRows(text);
  if (lines.length === 0) return [];

  const header = lines[0].join(',');
  const hasHeader = /front/i.test(header) && /back/i.test(header);
  const rows = hasHeader ? lines.slice(1) : lines;
  const now = Date.now();

  return rows.map((line) => {
    const cols = line.map((c) => c.trim());
    const [front = '', back = '', reading = '', category = '', tags = ''] = cols;
    return novoCard(
      {
        front,
        back,
        reading: reading || undefined,
        category: category || undefined,
        tags: tags ? tags.split(';').map((t) => t.trim()).filter(Boolean) : [],
      },
      now
    );
  });
}

/** Importação via JSON: um array de objetos parciais de card. */
export function parseCardsJson(text: string): Card[] {
  const data = JSON.parse(text);
  if (!Array.isArray(data)) throw new Error('JSON de cards deve ser um array.');
  const now = Date.now();
  // Sempre gera um id novo, mesmo se o JSON trouxer um: preservar o id do
  // arquivo só criaria risco de colidir com um card existente (o bulkAdd
  // falha pra tudo no lote) sem nenhum ganho — essa importação sempre insere
  // cards novos, nunca faz merge por id (isso é o backup).
  return data.map((raw: Partial<Card>) =>
    novoCard(
      { front: raw.front ?? '', back: raw.back ?? '', reading: raw.reading, category: raw.category, tags: raw.tags ?? [] },
      now
    )
  );
}

const ANKI_SEPARATOR_NAMES: Record<string, string> = {
  tab: '\t',
  comma: ',',
  semicolon: ';',
  pipe: '|',
  colon: ':',
  space: ' ',
};

function cleanAnkiField(raw: string | undefined, html: boolean): string {
  let value = raw ?? '';
  if (html) {
    value = value.replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '');
  }
  return value
    .replace(/\[sound:[^\]]*\]/gi, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .trim();
}

/**
 * Importação dos exports em texto simples do Anki: tanto "Notas em Texto
 * Simples" (um card por nota, com cabeçalho `#separator`/`#html`/
 * `#notetype column`/`#deck column`/`#tags column`/`#columns`) quanto
 * "Cartões em Texto Simples" (sempre Pergunta/Resposta, sem cabeçalho de
 * colunas). Também serve como fallback genérico para qualquer TSV.
 */
export function parseAnkiText(text: string): Card[] {
  const lines = text.split(/\r?\n/);
  let i = 0;
  let separator = '\t';
  let html = false;
  let tagsColumn: number | null = null;
  let notetypeColumn: number | null = null;
  let deckColumn: number | null = null;
  let guidColumn: number | null = null;
  let columnNames: string[] | null = null;

  // Linhas em branco antes do cabeçalho (arquivo editado à mão) não escondem o cabeçalho.
  while (i < lines.length && lines[i].trim() === '') i++;
  const inicio = i;
  while (i < lines.length && lines[i].startsWith('#')) {
    const [rawKey, ...rest] = lines[i].slice(1).split(':');
    const key = rawKey.trim().toLowerCase();
    const value = rest.join(':').trim();
    if (key === 'separator') separator = ANKI_SEPARATOR_NAMES[value.toLowerCase()] ?? value;
    else if (key === 'html') html = /true/i.test(value);
    else if (key === 'tags column') tagsColumn = parseInt(value, 10) - 1;
    else if (key === 'notetype column') notetypeColumn = parseInt(value, 10) - 1;
    else if (key === 'deck column') deckColumn = parseInt(value, 10) - 1;
    else if (key === 'guid column') guidColumn = parseInt(value, 10) - 1;
    else if (key === 'columns') columnNames = value.split(separator).map((c) => c.trim());
    i++;
  }

  const rows = lines.slice(i).filter((l) => l.trim().length > 0);
  if (rows.length === 0) return [];
  // Sem cabeçalho: detecta o separador pelo conteúdo da primeira linha.
  if (i === inicio) separator = rows[0].includes('\t') ? '\t' : rows[0].includes(',') ? ',' : separator;

  const skip = new Set(
    [notetypeColumn, deckColumn, guidColumn, tagsColumn].filter((v): v is number => v !== null)
  );

  const namedIndex = (pattern: RegExp): number | null => {
    if (!columnNames) return null;
    const idx = columnNames.findIndex((name, col) => !skip.has(col) && pattern.test(name));
    return idx === -1 ? null : idx;
  };

  const frontIdx = namedIndex(/front|expression|frente|palavra|termo/i);
  const backIdx = namedIndex(/back|meaning|significado|verso|defini/i);
  const readingIdx = namedIndex(/reading|leitura|kana|furigana/i);

  const now = Date.now();
  return rows
    .map((line) => {
      const cols = line.split(separator);
      const fieldCols = cols.map((_, idx) => idx).filter((idx) => !skip.has(idx));

      const front = cleanAnkiField(cols[frontIdx ?? fieldCols[0] ?? 0], html);
      const back = cleanAnkiField(cols[backIdx ?? fieldCols[1] ?? 1], html);
      const readingCol = readingIdx ?? fieldCols[2];
      const reading = readingCol !== undefined ? cleanAnkiField(cols[readingCol], html) : undefined;
      const tags =
        tagsColumn !== null && cols[tagsColumn] ? cols[tagsColumn].trim().split(/\s+/).filter(Boolean) : [];

      return novoCard({ front, back, reading: reading || undefined, tags }, now);
    })
    .filter((c) => c.front || c.back);
}

/** Decide o parser certo a partir do nome do arquivo e sniff do conteúdo. */
export function parseCardsFile(text: string, filename: string): Card[] {
  if (filename.toLowerCase().endsWith('.json')) return parseCardsJson(text);

  const firstLine = text.split(/\r?\n/).find((l) => l.trim().length > 0) ?? '';
  const looksLikeAnkiExport = /^#(separator|html|notetype|deck|tags|guid|columns)\b/i.test(firstLine) || firstLine.includes('\t');
  return looksLikeAnkiExport ? parseAnkiText(text) : parseCardsCsv(text);
}

/** Lê o arquivo de cards (CSV, JSON ou texto do Anki) e cria os cards. Devolve quantos. */
export async function importarArquivoDeCards(texto: string, nomeDoArquivo: string): Promise<number> {
  const cards = parseCardsFile(texto, nomeDoArquivo);
  if (cards.length === 0) throw new Error('Nenhum card encontrado no arquivo.');
  await db.cards.bulkAdd(cards);
  return cards.length;
}
