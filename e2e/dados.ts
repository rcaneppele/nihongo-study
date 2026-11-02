/**
 * Dados de partida dos testes ponta a ponta, no formato do arquivo de
 * backup do app (importado pelo próprio fluxo de Configurações). Ficam
 * independentes do código-fonte de propósito: o E2E testa o app como uma
 * caixa-preta, inclusive a leitura deste formato.
 */
export const SCHEMA_VERSION = 7;
export const DIA = 24 * 60 * 60 * 1000;

type Registro = Record<string, unknown>;

export interface BackupE2E {
  app: 'nihongo-study';
  schemaVersion: number;
  exportedAt: number;
  cards: Registro[];
  reviews: Registro[];
  kanaProgress: Registro[];
  kanjiProgress: Registro[];
  wordKnowledge: Registro[];
  readingProgress: Registro[];
  activity: Registro[];
  meta: Registro[];
  deleted: Registro[];
  exerciseResults: Registro[];
  lessonProgress: Registro[];
  achievements: Registro[];
  journal: Registro[];
}

export function backup(parcial: Partial<BackupE2E> = {}): BackupE2E {
  return {
    app: 'nihongo-study',
    schemaVersion: SCHEMA_VERSION,
    exportedAt: Date.now(),
    cards: [],
    reviews: [],
    kanaProgress: [],
    kanjiProgress: [],
    wordKnowledge: [],
    readingProgress: [],
    activity: [],
    meta: [],
    deleted: [],
    exerciseResults: [],
    lessonProgress: [],
    achievements: [],
    journal: [],
    ...parcial,
  };
}

let seq = 0;

/** Card novo (estado "novo" do FSRS), vencendo agora. */
export function card(front: string, back: string, extra: Registro = {}): Registro {
  const agora = Date.now();
  return {
    id: `e2e-${++seq}-${front}`,
    front,
    back,
    tags: [],
    stability: 0,
    difficulty: 0,
    state: 0,
    reps: 0,
    lapses: 0,
    scheduledDays: 0,
    dueDate: agora,
    createdAt: agora,
    updatedAt: agora,
    ...extra,
  };
}

/** Card já revisado (estado Review do FSRS) com o intervalo dado, vencendo em `venceEm` ms. */
export function cardRevisado(front: string, back: string, intervaloDias: number, venceEm: number, extra: Registro = {}): Registro {
  const agora = Date.now();
  return card(front, back, {
    stability: intervaloDias,
    difficulty: 5,
    state: 2,
    reps: 3,
    scheduledDays: intervaloDias,
    dueDate: agora + venceEm,
    lastReviewedAt: agora - intervaloDias * DIA,
    ...extra,
  });
}

/** Lição aberta há pouco — tira o "estude uma lição" da frente do Plano do dia. */
export function licaoVista(lessonId: string, concluida = false): Registro {
  const agora = Date.now();
  return { lessonId, viewedAt: agora, updatedAt: agora, ...(concluida ? { completedAt: agora } : {}) };
}
