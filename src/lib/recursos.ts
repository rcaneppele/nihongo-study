/**
 * O que o app oferece, em uma frase por recurso — para quem lê o site de fora
 * (buscadores e assistentes de IA): entra nos dados estruturados do
 * `index.html` (`config/metadados.ts`) e no `llms.txt` (`src/features/seo/`).
 * Ao criar ou tirar uma funcionalidade grande, atualize aqui. Sem dependências:
 * o build importa este arquivo.
 */
export const RECURSOS: readonly string[] = [
  'Hiragana e katakana: treino digitando o romaji ou desenhando à mão, com correção da forma e da ordem dos traços',
  'Kanji do JLPT N5 com radical, mnemônico, leituras, exemplos e treino de caligrafia',
  'Vocabulário do JLPT N5 com o significado em português, em flash cards com repetição espaçada (algoritmo FSRS)',
  'Lições de gramática, vocabulário e cultura escritas para quem fala português, com exemplos em kana e romaji',
  'Leitura graduada em quatro níveis, com furigana, áudio e o significado de cada palavra',
  'Prática das quatro habilidades: ditado (kakitori), shadowing, "Diga em japonês" e diário guiado',
  'Funciona offline e pode ser instalado no celular, no tablet e no computador (PWA)',
  'Grátis, sem cadastro e sem anúncios: os dados ficam no aparelho, com sincronização opcional pelo Google Drive do próprio usuário',
];
