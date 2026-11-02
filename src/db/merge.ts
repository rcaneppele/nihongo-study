import { mesclarContadores } from './contadores';
import type {
  Achievement,
  Activity,
  ActivityContador,
  Card,
  KanaContador,
  KanaProgress,
  JournalEntry,
  KanjiProgress,
  LessonProgress,
  Meta,
  ReadingProgress,
  Tombstone,
  WordKnowledge,
} from './schema';

/**
 * Regras de mesclagem entre aparelhos, uma por tabela — funções puras,
 * aplicadas por `importData` (modo Mesclar) em src/db/backup.ts. Todas são
 * idempotentes (mesclar o mesmo arquivo de novo não muda nada) e não
 * dependem da ordem (mesclar A em B dá o mesmo que B em A), pra dois
 * aparelhos sincronizando sempre chegarem ao mesmo estado.
 *
 * Empate de data mantém o local.
 */

export const KANA_CONTADORES: readonly KanaContador[] = ['romajiCorrect', 'romajiWrong', 'choiceCorrect', 'choiceWrong'];
export const ACTIVITY_CONTADORES: readonly ActivityContador[] = ['revisoes', 'praticas', 'leituras', 'novos'];
export const WORD_CONTADORES = ['seenCount', 'lookupCount'] as const;
export const READING_CONTADORES = ['timesRead'] as const;

function maxOpt(a: number | undefined, b: number | undefined): number | undefined {
  if (a === undefined) return b;
  if (b === undefined) return a;
  return Math.max(a, b);
}

/**
 * Grupos de campos do card, cada um com seu carimbo: o que mudou por último
 * em cada grupo vence, independente dos outros. Assim editar a nota num
 * aparelho não desfaz uma revisão feita no outro.
 */
const GRUPOS_CARD = [
  {
    carimbo: 'contentUpdatedAt',
    campos: ['front', 'back', 'reading', 'category', 'tags', 'example', 'source', 'note'],
  },
  {
    carimbo: 'srsUpdatedAt',
    campos: ['stability', 'difficulty', 'state', 'reps', 'lapses', 'scheduledDays', 'dueDate', 'lastReviewedAt'],
  },
  { carimbo: 'productionUpdatedAt', campos: ['production'] },
] as const satisfies readonly { carimbo: keyof Card; campos: readonly (keyof Card)[] }[];

export type GrupoCard = (typeof GRUPOS_CARD)[number]['carimbo'];

/**
 * Carimbos a gravar junto com uma alteração do card: `now` nos grupos
 * alterados e, nos outros que ainda não têm carimbo (cards anteriores à
 * v6), o `updatedAt` de antes — senão eles cairiam no `updatedAt` novo e
 * pareceriam alterados agora também.
 */
export function carimbosCard(card: Card, alterados: GrupoCard[], now: number): Partial<Card> {
  const r: Partial<Card> = { updatedAt: now };
  for (const g of GRUPOS_CARD) r[g.carimbo] = alterados.includes(g.carimbo) ? now : (card[g.carimbo] ?? card.updatedAt);
  return r;
}

export function mesclarCard(local: Card, outro: Card): Card {
  const r = { ...local } as unknown as Record<string, unknown>;
  const o = outro as unknown as Record<string, unknown>;
  const updatedAt = Math.max(local.updatedAt, outro.updatedAt);
  for (const g of GRUPOS_CARD) {
    const tLocal = local[g.carimbo] ?? local.updatedAt;
    const tOutro = outro[g.carimbo] ?? outro.updatedAt;
    const vencedor = tOutro > tLocal ? outro : local;
    if (vencedor === outro) {
      for (const c of g.campos) {
        if (o[c] === undefined) delete r[c];
        else r[c] = o[c];
      }
    }
    // Carimbo ausente vale o `updatedAt` do card. Se o `updatedAt` do
    // resultado subiu, o carimbo precisa ficar explícito — senão o grupo
    // pareceria alterado agora e venceria, com o estado velho, uma revisão
    // feita noutro aparelho.
    const t = Math.max(tLocal, tOutro);
    if (vencedor[g.carimbo] === undefined && t === updatedAt) delete r[g.carimbo];
    else r[g.carimbo] = t;
  }
  r.updatedAt = updatedAt;
  r.createdAt = Math.min(local.createdAt, outro.createdAt);
  return r as unknown as Card;
}

/**
 * Entre cards com a mesma frente (duplicatas — ex.: a mesma palavra aprendida
 * em dois aparelhos antes de sincronizar), qual fica. O critério só usa
 * campos que nunca mudam, pra todo aparelho escolher o mesmo.
 */
export function cardMantido(cards: Card[]): Card {
  return cards.reduce((a, b) => (b.createdAt < a.createdAt || (b.createdAt === a.createdAt && b.id < a.id) ? b : a));
}

export function mesclarKana(local: KanaProgress, outro: KanaProgress): KanaProgress {
  return {
    char: local.char,
    type: local.type,
    ...mesclarContadores(local, outro, KANA_CONTADORES),
    drawBest: maxOpt(local.drawBest, outro.drawBest),
    lastPracticed: maxOpt(local.lastPracticed, outro.lastPracticed),
  };
}

/** Estado FSRS: vence o `updatedAt` mais recente. Caligrafia: fica a melhor nota dos dois. */
export function mesclarKanji(local: KanjiProgress, outro: KanjiProgress): KanjiProgress {
  const vencedor = outro.updatedAt > local.updatedAt ? outro : local;
  return {
    ...vencedor,
    drawBest: maxOpt(local.drawBest, outro.drawBest),
    createdAt: Math.min(local.createdAt, outro.createdAt),
  };
}

/** Situação (compreendida/consultada) da leitura mais recente; contadores somados por aparelho. */
export function mesclarPalavra(local: WordKnowledge, outro: WordKnowledge): WordKnowledge {
  const vencedor = outro.updatedAt > local.updatedAt ? outro : local;
  return {
    key: local.key,
    status: vencedor.status,
    ...mesclarContadores(local, outro, WORD_CONTADORES),
    updatedAt: vencedor.updatedAt,
  };
}

export function mesclarLeitura(local: ReadingProgress, outro: ReadingProgress): ReadingProgress {
  return {
    textId: local.textId,
    ...mesclarContadores(local, outro, READING_CONTADORES),
    lastReadAt: Math.max(local.lastReadAt, outro.lastReadAt),
    updatedAt: Math.max(local.updatedAt, outro.updatedAt),
  };
}

/** O mesmo dia estudado em dois aparelhos soma os dois (cada um conta só a própria entrada). */
export function mesclarAtividade(local: Activity, outro: Activity): Activity {
  return {
    day: local.day,
    ...mesclarContadores(local, outro, ACTIVITY_CONTADORES),
    updatedAt: Math.max(local.updatedAt, outro.updatedAt),
  };
}

export function mesclarMeta(local: Meta, outro: Meta): Meta {
  return (outro.updatedAt ?? 0) > (local.updatedAt ?? 0) ? outro : local;
}

export function mesclarLapide(local: Tombstone, outro: Tombstone): Tombstone {
  return outro.deletedAt > local.deletedAt ? outro : local;
}

/**
 * Lição: abrir só avança `viewedAt` (fica o maior); marcar/desmarcar como
 * concluída vence pelo `updatedAt` mais recente.
 */
export function mesclarLicao(local: LessonProgress, outro: LessonProgress): LessonProgress {
  const vence = outro.updatedAt > local.updatedAt ? outro : local;
  const resultado: LessonProgress = {
    lessonId: local.lessonId,
    viewedAt: Math.max(local.viewedAt, outro.viewedAt),
    updatedAt: vence.updatedAt,
  };
  if (vence.completedAt !== undefined) resultado.completedAt = vence.completedAt;
  return resultado;
}

/** Conquista: fica a data em que foi desbloqueada primeiro, em qualquer aparelho. */
export function mesclarConquista(local: Achievement, outro: Achievement): Achievement {
  return outro.unlockedAt < local.unlockedAt ? outro : local;
}

/** Entrada do diário: vence a edição mais recente. */
export function mesclarDiario(local: JournalEntry, outro: JournalEntry): JournalEntry {
  return outro.updatedAt > local.updatedAt ? outro : local;
}

/** Comparação de registros sem depender da ordem das chaves — evita regravar o que não mudou. */
export function iguais(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  const ra = a as Record<string, unknown>;
  const rb = b as Record<string, unknown>;
  const ka = Object.keys(ra).filter((k) => ra[k] !== undefined);
  const kb = Object.keys(rb).filter((k) => rb[k] !== undefined);
  return ka.length === kb.length && ka.every((k) => iguais(ra[k], rb[k]));
}
