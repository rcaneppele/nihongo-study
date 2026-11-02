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
   * preenchida em todas as palavras cuja forma difere da de dicionário. */
  lemma?: string;
  /** Leitura em kana do `lemma`, quando ele tem kanji (ex.: `行く` → `いく`).
   * Vira a leitura sugerida do card. */
  lemmaReading?: string;
}

/** Uma frase/linha do texto. */
export interface ReadingLine {
  words: ReadingWord[];
  /** Tradução natural em pt-BR da frase inteira, escrita à mão — não é a
   * concatenação dos `meaning` de cada palavra. Exibida sob demanda (botão
   * "ver tradução"), como complemento ao significado por palavra. */
  translation: string;
}

/** 0 = primeiros passos (curtíssimos, só kana); 1 = só kana; 2 = kanji com furigana; 3 = textos longos, N4. */
export type NivelLeitura = 0 | 1 | 2 | 3;

export interface ReadingText {
  id: string;
  title: string;
  level: NivelLeitura;
  /** Nº aproximado de palavras únicas — indicador de dificuldade na listagem. */
  wordCount: number;
  /** Resumo em português, exibido na listagem. */
  summaryPt: string;
  lines: ReadingLine[];
}
