export interface Token {
  texto: string;
  romaji: string;
  /** Marca a partícula usada como lacuna nas perguntas de "escolher partícula". */
  particula?: boolean;
}

export interface FraseEstruturada {
  id: string;
  tokens: Token[];
  pt: string;
}

export interface PerguntaSignificado {
  id: string;
  tipo: 'significado';
  pergunta: string;
  alternativas: string[];
  correta: number;
  /** Só vale a pena preencher quando a resposta não é autoexplicativa (ex.: exceções de conjugação). */
  explicacao?: string;
}

export interface PerguntaVerdadeiroFalso {
  id: string;
  tipo: 'verdadeiro-falso';
  afirmacao: string;
  correta: boolean;
  explicacao?: string;
}

export type PerguntaAutorada = PerguntaSignificado | PerguntaVerdadeiroFalso;

/** Conteúdo de quiz que uma lição pode exportar, ao lado de `meta` e `Component`. */
export interface QuizLicao {
  /** Alimenta os tipos "reordenar-frase" e "escolher-particula". */
  frases?: FraseEstruturada[];
  /** Alimenta "significado" e "verdadeiro-falso". */
  perguntas?: PerguntaAutorada[];
}

export type TipoQuiz = 'reordenar-frase' | 'escolher-particula' | 'significado' | 'verdadeiro-falso';

export const TIPOS_QUIZ: { tipo: TipoQuiz; label: string; descricao: string }[] = [
  { tipo: 'reordenar-frase', label: 'Reordenar frase', descricao: 'Toque nas palavras na ordem certa' },
  { tipo: 'escolher-particula', label: 'Escolher partícula', descricao: 'Complete a frase com a partícula correta' },
  { tipo: 'significado', label: 'Significado', descricao: 'Múltipla escolha sobre vocabulário e conceitos' },
  { tipo: 'verdadeiro-falso', label: 'Verdadeiro ou falso', descricao: 'Avalie afirmações sobre a lição' },
];

export interface PerguntaReordenar {
  id: string;
  tipo: 'reordenar-frase';
  licaoId: string;
  tokensEmbaralhados: Token[];
  respostaCorreta: Token[];
  pt: string;
}

export interface PerguntaParticula {
  id: string;
  tipo: 'escolher-particula';
  licaoId: string;
  antes: Token[];
  depois: Token[];
  alternativas: string[];
  correta: string;
  pt: string;
}

export type PerguntaGerada =
  | PerguntaReordenar
  | PerguntaParticula
  | (PerguntaSignificado & { licaoId: string })
  | (PerguntaVerdadeiroFalso & { licaoId: string });

export interface QuizConfig {
  licaoIds: string[];
  tipos: TipoQuiz[];
  quantidade: number;
}

/** Registro de uma pergunta já respondida, usado na tela de resultado detalhado. */
export interface RegistroResposta {
  pergunta: PerguntaGerada;
  acertou: boolean;
  suaResposta: string;
  respostaCorreta: string;
}
