import Dexie, { type Table } from 'dexie';
import { freshSrs } from '../features/srs/fsrs';

/**
 * Modelo de dados local (IndexedDB via Dexie).
 *
 * Importante: as chaves primárias são UUIDs (string), não auto-incremento.
 * Como cada dispositivo gera dados de forma independente, IDs numéricos
 * colidiriam ao mesclar backups. UUID evita isso (ver src/db/backup.ts).
 */

/**
 * Frase de contexto de um card — onde a palavra foi encontrada (ex.: um
 * texto de leitura). Dividida em pedaços pra poder mostrar furigana e
 * destacar a palavra do card (`highlight` = índice em `segments`).
 */
export interface CardExample {
  segments: { text: string; reading?: string }[];
  highlight?: number;
  translation?: string;
}

/** De onde o card veio, quando foi criado a partir de outro conteúdo do app. */
export interface CardSource {
  kind: 'leitura';
  id: string;
  title: string;
}

export interface Card {
  id: string;
  front: string; // japonês (palavra/frase)
  back: string; // significado
  reading?: string; // leitura (kana/romaji)
  category?: string; // categoria principal (usada no filtro)
  tags: string[];
  // Opcionais, sem índice — backups e cards antigos simplesmente não têm.
  example?: CardExample;
  source?: CardSource;
  /**
   * Nota de origem/uso (ex.: "vem do português 'pão'"), exibida no verso.
   * String vazia = o usuário apagou a nota de propósito (esconde também a
   * nota do deck N5 — ver `cardNote`).
   */
  note?: string;
  /**
   * Estado FSRS da direção de **produção** (português → japonês), separado
   * do reconhecimento (campos de SRS abaixo, japonês → português). Só existe
   * a partir do estágio "Sei dizer" — ver src/features/flashcards/stages.ts.
   */
  production?: CardSrs;
  // Estado SRS (FSRS) — ver src/features/srs/fsrs.ts
  stability: number;
  difficulty: number;
  state: number; // State do ts-fsrs: 0 New, 1 Learning, 2 Review, 3 Relearning
  reps: number;
  lapses: number;
  scheduledDays: number;
  dueDate: number; // timestamp da próxima revisão
  lastReviewedAt?: number;
  createdAt: number;
  /** Última alteração de qualquer campo. */
  updatedAt: number;
  /**
   * Carimbos por grupo de campos, pra mesclagem entre aparelhos não deixar
   * uma edição de nota desfazer uma revisão feita no outro (ver
   * src/db/merge.ts). Ausente = vale `updatedAt` (cards anteriores à v6).
   */
  contentUpdatedAt?: number; // front/back/reading/category/tags/example/source/note
  srsUpdatedAt?: number; // estado FSRS do reconhecimento
  productionUpdatedAt?: number; // `production`
}

/** Campos de estado do FSRS, mesmo formato dos que ficam direto no Card (reconhecimento). */
export interface CardSrs {
  stability: number;
  difficulty: number;
  state: number;
  reps: number;
  lapses: number;
  scheduledDays: number;
  dueDate: number;
  lastReviewedAt?: number;
}

export interface Review {
  id: string;
  cardId: string;
  /** Direção revisada; ausente = reconhecimento (todas as revisões anteriores aos estágios). */
  direction?: 'production';
  reviewedAt: number;
  quality: number; // Rating do FSRS (1..4). Reviews anteriores à migração para FSRS usam a escala antiga do SM-2 (0..5) — é só histórico, não é relido pelo app.
  intervalAfter: number;
}

export type KanaType = 'hiragana' | 'katakana';

/**
 * Contadores de um registro separados por aparelho (`deviceId` → valores),
 * pra mesclagem somar o que cada aparelho fez em vez de ficar só com um lado
 * (ver src/db/contadores.ts). Os totais continuam materializados nos campos
 * do próprio registro — quem só lê não precisa saber disso. Cada entrada só
 * é escrita pelo próprio aparelho, então vence a de `updatedAt` maior; a
 * entrada `legado` guarda os totais anteriores à v6.
 */
export type PorAparelho<K extends string> = Record<string, Partial<Record<K, number>> & { updatedAt: number }>;

export interface KanaProgress {
  char: string; // ex.: "あ" (chave primária)
  type: KanaType;
  romajiCorrect: number;
  romajiWrong: number;
  choiceCorrect?: number; // modo múltipla escolha (romaji → kana) — direção oposta à de romajiCorrect/Wrong
  choiceWrong?: number;
  drawBest?: number; // melhor pontuação de caligrafia (0..100)
  lastPracticed?: number;
  porAparelho?: PorAparelho<KanaContador>;
}

export type KanaContador = 'romajiCorrect' | 'romajiWrong' | 'choiceCorrect' | 'choiceWrong';

/** Preferências sincronizadas (tema, meta diária…). Entra no backup. */
export interface Meta {
  key: string;
  value: unknown;
  updatedAt?: number; // ausente = 0 (anterior à v6); na mesclagem vence o mais recente
}

/** Estado só deste aparelho (id do aparelho, sincronização). Nunca entra no backup. */
export interface LocalState {
  key: string;
  value: unknown;
}

/** Tabelas em que um registro pode ser apagado individualmente. */
export type DeletableTable = 'cards' | 'reviews' | 'wordKnowledge' | 'journal';

/**
 * Registro de exclusão ("lápide"), pra exclusão se propagar na mesclagem em
 * vez de o registro voltar do outro aparelho. Vence o registro se
 * `deletedAt` for mais recente que a última alteração dele.
 */
export interface Tombstone {
  table: DeletableTable;
  key: string;
  deletedAt: number;
  /** Card apagado por ser duplicata de outro: as revisões dele passam para este id. */
  mergedInto?: string;
}

/**
 * Progresso de SRS (FSRS) de um kanji do módulo de Kanji (ver
 * src/data/kanji.ts e src/features/kanji/). Chave primária é o próprio
 * caractere, igual ao padrão de KanaProgress — só existe uma linha aqui
 * depois que o usuário "aprende" aquele kanji pela primeira vez (não é
 * pré-populada para todo o dataset).
 */
export interface KanjiProgress {
  char: string;
  stability: number;
  difficulty: number;
  state: number;
  reps: number;
  lapses: number;
  scheduledDays: number;
  dueDate: number;
  lastReviewedAt?: number;
  drawBest?: number; // melhor nota de caligrafia (0..100) — independente do ciclo de FSRS, mesmo padrão de KanaProgress.drawBest; mesclado pelo maior
  createdAt: number;
  /** Última alteração do estado FSRS — praticar caligrafia não mexe nele (ver src/db/merge.ts). */
  updatedAt: number;
}

/**
 * O que o usuário sabe de uma palavra vista na leitura extensiva (ver
 * src/features/leitura/knowledge.ts). Chave = forma "limpa" da palavra
 * (`wordKey`), a mesma usada como frente do card ao salvar da leitura.
 * Reflete a leitura mais recente: "compreendida" = leu sem tocar pra ver o
 * significado; "consultada" = tocou.
 */
export interface WordKnowledge {
  key: string;
  status: 'compreendida' | 'consultada';
  seenCount: number; // em quantas leituras concluídas a palavra apareceu
  lookupCount: number; // em quantas delas foi consultada
  updatedAt: number;
  porAparelho?: PorAparelho<'seenCount' | 'lookupCount'>;
}

/** Textos de leitura concluídos ("Terminei a leitura"). Chave = id do texto. */
export interface ReadingProgress {
  textId: string;
  timesRead: number;
  lastReadAt: number;
  updatedAt: number;
  porAparelho?: PorAparelho<'timesRead'>;
}

/**
 * Atividade de estudo de um dia (data local "AAAA-MM-DD"), pra meta diária e
 * sequência de dias — ver src/features/atividade/atividade.ts.
 */
export interface Activity {
  day: string;
  revisoes: number; // notas dadas em revisões FSRS (flash cards e kanji)
  praticas: number; // respostas em treinos que não mexem no FSRS (kana, quiz, kakitori, prática livre…)
  leituras: number; // textos de leitura concluídos
  novos: number; // itens aprendidos pela primeira vez (primeira revisão de um card, kanji aprendido)
  updatedAt: number;
  porAparelho?: PorAparelho<ActivityContador>;
}

export type ActivityContador = 'revisoes' | 'praticas' | 'leituras' | 'novos';

/** Exercícios que guardam resultado por item (ver src/features/exercicios/historico.ts). */
export type ExerciseKind = 'quiz' | 'diga' | 'kakitori' | 'gramatica' | 'escuta' | 'shadowing';

/**
 * Resultado de um item de exercício fora do FSRS — uma linha por resposta,
 * histórico imutável como `reviews`. Alimenta Pontos fracos, o "Próximo
 * passo" e o nível de Ouvir/Falar.
 */
export interface ExerciseResult {
  id: string;
  kind: ExerciseKind;
  /** Pergunta, frase ou item de ditado; na escuta e no shadowing, o id do texto de leitura. */
  itemId: string;
  lessonId?: string;
  /** 0..1 — 1 acertou, 0 errou; escuta: 1 entendeu quase tudo, 0,5 uma parte, 0 pouco. Ausente = sem avaliação (shadowing). */
  score?: number;
  doneAt: number;
}

/** Progresso de uma lição (`src/licoes/`). Chave = id da lição. */
export interface LessonProgress {
  lessonId: string;
  /** Última vez que a lição foi aberta. */
  viewedAt: number;
  /** Quando foi marcada como concluída; ausente = não concluída. */
  completedAt?: number;
  /** Última alteração de `completedAt` (marcar/desmarcar) — abrir a lição não conta. */
  updatedAt: number;
}

/** Conquista desbloqueada (ver src/features/conquistas/conquistas.ts). Chave = id da conquista. */
export interface Achievement {
  id: string;
  unlockedAt: number;
}

/** Entrada do diário guiado (ver src/features/diario/). */
export interface JournalEntry {
  id: string;
  promptId: string;
  text: string;
  /** Itens do checklist de autoavaliação que o usuário marcou (índices como string). */
  checked: string[];
  createdAt: number;
  updatedAt: number;
}

export class NihongoDB extends Dexie {
  cards!: Table<Card, string>;
  reviews!: Table<Review, string>;
  kanaProgress!: Table<KanaProgress, string>;
  kanjiProgress!: Table<KanjiProgress, string>;
  wordKnowledge!: Table<WordKnowledge, string>;
  readingProgress!: Table<ReadingProgress, string>;
  activity!: Table<Activity, string>;
  meta!: Table<Meta, string>;
  deleted!: Table<Tombstone, [string, string]>;
  local!: Table<LocalState, string>;
  exerciseResults!: Table<ExerciseResult, string>;
  lessonProgress!: Table<LessonProgress, string>;
  achievements!: Table<Achievement, string>;
  journal!: Table<JournalEntry, string>;

  constructor() {
    super('nihongo-study');
    this.version(1).stores({
      // Apenas as colunas indexadas precisam ser declaradas.
      cards: 'id, category, dueDate, updatedAt',
      reviews: 'id, cardId, reviewedAt',
      kanaProgress: 'char, type',
      meta: 'key',
    });
    // v2: troca do algoritmo de repetição espaçada de SM-2 para FSRS. Os
    // campos antigos (ef/interval/repetitions) não têm conversão exata pros
    // novos (stability/difficulty/state) — os cards existentes são
    // resetados para o estado "novo" do FSRS, perdendo o progresso de
    // agendamento acumulado mas mantendo o histórico em `reviews`.
    this.version(2)
      .stores({})
      .upgrade(async (tx) => {
        const now = Date.now();
        await tx
          .table('cards')
          .toCollection()
          .modify((card) => {
            delete card.ef;
            delete card.interval;
            delete card.repetitions;
            Object.assign(card, freshSrs(now));
          });
      });
    // v3: nova tabela para o progresso de SRS do módulo de Kanji. `dueDate`
    // precisa ser indexado (igual a `cards`) para as consultas de fila
    // (`db.kanjiProgress.where('dueDate')...`) funcionarem.
    this.version(3).stores({
      kanjiProgress: 'char, dueDate',
    });
    // v4: vocabulário passivo da leitura extensiva — palavras compreendidas/
    // consultadas e textos concluídos. Só tabelas novas, nada a migrar.
    this.version(4).stores({
      wordKnowledge: 'key',
      readingProgress: 'textId',
    });
    // v5: atividade por dia (meta diária e sequência). Só tabela nova.
    this.version(5).stores({
      activity: 'day',
    });
    // v6: base da sincronização entre aparelhos — lápides de exclusão e o
    // estado local do aparelho (fora do backup). Os campos novos dos
    // registros (`porAparelho`, carimbos por grupo, `Meta.updatedAt`) são
    // opcionais: ausentes valem como antes, nada a migrar.
    this.version(6).stores({
      deleted: '[table+key]',
      local: 'key',
    });
    // v7: histórico dos exercícios (quiz, diga, ditado, gramática, escuta,
    // shadowing), progresso das lições, conquistas e diário guiado. Só
    // tabelas novas, nada a migrar.
    this.version(7).stores({
      exerciseResults: 'id, kind, itemId, doneAt',
      lessonProgress: 'lessonId',
      achievements: 'id',
      journal: 'id, promptId, createdAt',
    });
  }
}

export const db = new NihongoDB();

export function newId(): string {
  return crypto.randomUUID();
}
