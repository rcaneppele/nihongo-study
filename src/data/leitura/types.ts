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
  /** Forma de dicionário, quando a forma no texto é conjugada/flexionada
   * (ex.: `行きました` → `行く`). Identifica a palavra no vocabulário
   * passivo e vira a frente sugerida ao salvar como card — sem ela, usa a
   * forma do texto sem pontuação/partícula (ver `wordKey`). Opcional:
   * preenchida aos poucos. */
  lemma?: string;
}

/** Uma frase/linha do texto. */
export interface ReadingLine {
  words: ReadingWord[];
  /** Tradução natural em pt-BR da frase inteira, escrita à mão — não é a
   * concatenação dos `meaning` de cada palavra. Exibida sob demanda (botão
   * "ver tradução"), como complemento ao significado por palavra. */
  translation: string;
}

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
