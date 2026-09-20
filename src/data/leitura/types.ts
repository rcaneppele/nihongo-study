export interface ReadingWord {
  /** Forma de superfície (kana ou kanji+okurigana). Pontuação vai grudada
   * no fim do texto da última palavra da frase (ex.: "です。"), sem token
   * separado pra pontuação. */
  text: string;
  /** Furigana — só quando `text` contém kanji. */
  reading?: string;
  /** Significado em pt-BR pro dicionário pop-up. Undefined em partículas
   * onde não agrega (usuário já viu isso nas lições de gramática). */
  meaning?: string;
}

/** Uma frase/linha do texto. */
export type ReadingLine = ReadingWord[];

export interface ReadingText {
  id: string;
  title: string;
  level: 1 | 2;
  /** Nº aproximado de palavras únicas — indicador de dificuldade na listagem. */
  wordCount: number;
  /** Resumo em português, exibido na listagem. */
  summaryPt: string;
  lines: ReadingLine[];
}
