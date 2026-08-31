/** Um item de ditado: o app toca o áudio de `audioText` e o usuário escreve o que ouviu antes de
 * revelar `kana`/`kanji`/`romaji`/`pt`. Não há correção automática de texto — o usuário se
 * autoavalia ao ver a resposta, como no flip-card dos flashcards. */
export interface ItemKakitori {
  id: string;
  origemLabel: string;
  audioText: string;
  kana: string;
  kanji?: string;
  romaji?: string;
  pt: string;
}

export interface ItemKakitoriFonte {
  id: string;
  jp: string;
  kana: string;
  romaji?: string;
  pt: string;
}

/** Um grupo nomeado de itens de ditado que uma lição pode exportar (campo `kakitori` em
 * `LicaoEntry`), selecionável separadamente na tela de configuração do Kakitori — ex.: a lição de
 * kanji separa "Números", "Dias da semana" e "Frases" em vez de expor a lição inteira como uma
 * única opção, já que o usuário pode querer treinar só um desses tipos de kanji por vez. */
export interface GrupoKakitori {
  id: string;
  label: string;
  itens: ItemKakitoriFonte[];
}

/** Uma fonte selecionável na tela de configuração: ou a lição inteira (quando ela não define
 * `kakitori`, usa as `frases` do quiz) ou um dos grupos nomeados de `kakitori`. */
export interface FonteKakitori {
  id: string;
  label: string;
  emoji: string;
}

/** Como o usuário registra a resposta antes de revelar: digitando (com autoavaliação de texto) ou
 * desenhando à mão (sem nenhuma correção — nem automática, nem de texto — só a autoavaliação). */
export type ModoKakitori = 'digitar' | 'desenhar';

export interface KakitoriConfig {
  fonteIds: string[];
  quantidade: number;
}

export interface RegistroKakitori {
  item: ItemKakitori;
  acertou: boolean;
  suaResposta: string;
}
