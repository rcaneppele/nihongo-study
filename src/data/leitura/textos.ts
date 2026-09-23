import type { ReadingText } from './types';

/**
 * Textos de leitura extensiva — conteúdo original, nunca copiado/traduzido
 * de terceiros (Tadoku, Satori Reader ou qualquer outra fonte), mesmo
 * princípio de originalidade das lições (ver docs/padrao-licoes.md).
 *
 * Nível 1: bem iniciante, só hiragana/katakana (sem kanji) — mesma regra de
 * "sem kanji em frase corrida" que as lições seguem, aqui estendida ao
 * próprio texto (não só aos exemplos).
 * Nível 2: kanji comuns já com furigana (`reading`) em cada palavra que o
 * contém — o objetivo aqui é treinar a leitura de kanji em contexto, não
 * evitá-lo.
 */
export const LEITURA_TEXTOS: ReadingText[] = [
  // ---------------------------------------------------------------------
  // Nível 1
  // ---------------------------------------------------------------------
  {
    id: 'apresentacao',
    title: 'わたしの しょうかい',
    level: 1,
    wordCount: 33,
    summaryPt: 'Uma breve apresentação pessoal: nome, nacionalidade, idade e o que estuda.',
    lines: [
      {
        words: [
          { text: 'はじめまして。', meaning: 'muito prazer (ao se apresentar pela primeira vez)' },
        ],
        translation: 'Muito prazer.',
      },
      {
        words: [
          { text: 'わたしは', meaning: 'eu (+ partícula de tópico)' },
          { text: 'たなかです。', meaning: 'sou a Tanaka' },
        ],
        translation: 'Eu sou a Tanaka.',
      },
      {
        words: [
          { text: 'にほんじんです。', meaning: 'sou japonesa' },
        ],
        translation: 'Sou japonesa.',
      },
      {
        words: [
          { text: 'がくせいです。', meaning: 'sou estudante' },
        ],
        translation: 'Sou estudante.',
      },
      {
        words: [
          { text: 'にじゅっさいです。', meaning: 'tenho vinte anos' },
        ],
        translation: 'Tenho vinte anos.',
      },
      {
        words: [
          { text: 'まいにち', meaning: 'todo dia' },
          { text: 'にほんごを', meaning: 'japonês (+ partícula de objeto)' },
          { text: 'べんきょうします。', meaning: 'estudo' },
        ],
        translation: 'Estudo japonês todos os dias.',
      },
      {
        words: [
          { text: 'にほんごは', meaning: 'o japonês (+ partícula de tópico)' },
          { text: 'たのしいです。', meaning: 'é divertido' },
        ],
        translation: 'O japonês é divertido.',
      },
      {
        words: [
          { text: 'どうぞ' },
          { text: 'よろしく', meaning: 'conte comigo, um prazer' },
          { text: 'おねがいします。', meaning: '(fórmula de cortesia)' },
        ],
        translation: 'Conto com você — um prazer.',
      },
      {
        words: [
          { text: 'しゅみは', meaning: 'o hobby (+ partícula de tópico)' },
          { text: 'えいがを', meaning: 'filme (+ partícula de objeto)' },
          { text: 'みることです。', meaning: 'é assistir' },
        ],
        translation: 'Meu hobby é assistir filmes.',
      },
      {
        words: [
          { text: 'とうきょうから', meaning: 'de Tóquio' },
          { text: 'きました。', meaning: 'vim' },
        ],
        translation: 'Vim de Tóquio.',
      },
      {
        words: [
          { text: 'しんせつな', meaning: 'gentis' },
          { text: 'ともだちが', meaning: 'amigos (+ partícula de sujeito)' },
          { text: 'たくさん', meaning: 'muitos' },
          { text: 'います。', meaning: 'tenho, há' },
        ],
        translation: 'Tenho muitos amigos gentis.',
      },
      {
        words: [
          { text: 'これから', meaning: 'de agora em diante' },
          { text: 'もっと', meaning: 'mais' },
          { text: 'にほんごを', meaning: 'japonês (+ partícula de objeto)' },
          { text: 'がんばります。', meaning: 'vou me esforçar' },
        ],
        translation: 'De agora em diante, vou me esforçar ainda mais com o japonês.',
      },
    ],
  },
  {
    id: 'seikatsu',
    title: 'まいにちの せいかつ',
    level: 1,
    wordCount: 39,
    summaryPt: 'A rotina de um dia comum, do café da manhã até a hora de dormir.',
    lines: [
      {
        words: [
          { text: 'まいあさ', meaning: 'toda manhã' },
          { text: 'ろくじに', meaning: 'às seis horas' },
          { text: 'おきます。', meaning: 'acordo' },
        ],
        translation: 'Acordo às seis da manhã, todos os dias.',
      },
      {
        words: [
          { text: 'かおを', meaning: 'o rosto (+ partícula de objeto)' },
          { text: 'あらって、', meaning: 'lavo, e' },
          { text: 'あさごはんを', meaning: 'o café da manhã (+ partícula de objeto)' },
          { text: 'たべます。', meaning: 'como' },
        ],
        translation: 'Lavo o rosto e como o café da manhã.',
      },
      {
        words: [
          { text: 'しちじはんに', meaning: 'às sete e meia' },
          { text: 'いえを', meaning: 'de casa (+ partícula de origem/saída)' },
          { text: 'でます。', meaning: 'saio' },
        ],
        translation: 'Saio de casa às sete e meia.',
      },
      {
        words: [
          { text: 'でんしゃで', meaning: 'de trem' },
          { text: 'がっこうへ', meaning: 'para a escola' },
          { text: 'いきます。', meaning: 'vou' },
        ],
        translation: 'Vou para a escola de trem.',
      },
      {
        words: [
          { text: 'がっこうで', meaning: 'na escola' },
          { text: 'にほんごと', meaning: 'japonês e' },
          { text: 'えいごを', meaning: 'inglês (+ partícula de objeto)' },
          { text: 'べんきょうします。', meaning: 'estudo' },
        ],
        translation: 'Na escola, estudo japonês e inglês.',
      },
      {
        words: [
          { text: 'ひるごはんは', meaning: 'o almoço' },
          { text: 'ともだちと', meaning: 'com amigos' },
          { text: 'たべます。', meaning: 'como' },
        ],
        translation: 'Almoço com os amigos.',
      },
      {
        words: [
          { text: 'ごごは', meaning: 'à tarde' },
          { text: 'としょかんで', meaning: 'na biblioteca' },
          { text: 'ほんを', meaning: 'livro (+ partícula de objeto)' },
          { text: 'よみます。', meaning: 'leio' },
        ],
        translation: 'De tarde, leio livros na biblioteca.',
      },
      {
        words: [
          { text: 'よる', meaning: 'à noite' },
          { text: 'じゅうじに', meaning: 'às dez horas' },
          { text: 'ねます。', meaning: 'durmo' },
        ],
        translation: 'À noite, durmo às dez horas.',
      },
      {
        words: [
          { text: 'しゅうまつは', meaning: 'o fim de semana' },
          { text: 'すこし', meaning: 'um pouco' },
          { text: 'ちがいます。', meaning: 'é diferente' },
        ],
        translation: 'O fim de semana é um pouco diferente.',
      },
      {
        words: [
          { text: 'あさ', meaning: 'de manhã' },
          { text: 'はやく', meaning: 'cedo' },
          { text: 'おきて、', meaning: 'acordo, e' },
          { text: 'うんどうを', meaning: 'exercício (+ partícula de objeto)' },
          { text: 'します。', meaning: 'faço' },
        ],
        translation: 'De manhã, acordo cedo e faço exercício.',
      },
      {
        words: [
          { text: 'よるは', meaning: 'à noite' },
          { text: 'ゆっくり', meaning: 'com calma' },
          { text: 'おふろに', meaning: 'na banheira' },
          { text: 'はいります。', meaning: 'entro' },
        ],
        translation: 'À noite, tomo um banho relaxante.',
      },
      {
        words: [
          { text: 'まいにちが', meaning: 'todo dia (+ partícula de sujeito)' },
          { text: 'いそがしいですが、', meaning: 'é corrido, mas' },
          { text: 'たのしいです。', meaning: 'é divertido' },
        ],
        translation: 'Todo dia é corrido, mas divertido.',
      },
    ],
  },
  {
    id: 'kaimono',
    title: 'スーパーで かいもの',
    level: 1,
    wordCount: 35,
    summaryPt: 'Uma ida ao mercado para comprar frutas, verduras e leite.',
    lines: [
      {
        words: [
          { text: 'きょう', meaning: 'hoje' },
          { text: 'スーパーへ', meaning: 'para o supermercado' },
          { text: 'いきました。', meaning: 'fui' },
        ],
        translation: 'Hoje fui ao supermercado.',
      },
      {
        words: [
          { text: 'やさいと', meaning: 'verduras e' },
          { text: 'くだものを', meaning: 'frutas (+ partícula de objeto)' },
          { text: 'かいました。', meaning: 'comprei' },
        ],
        translation: 'Comprei verduras e frutas.',
      },
      {
        words: [
          { text: 'りんごは', meaning: 'a maçã' },
          { text: 'ひとつ', meaning: 'uma unidade' },
          { text: 'ひゃくえんでした。', meaning: 'custava cem ienes' },
        ],
        translation: 'A maçã custava cem ienes a unidade.',
      },
      {
        words: [
          { text: 'ぎゅうにゅうも', meaning: 'leite também' },
          { text: 'かいました。', meaning: 'comprei' },
        ],
        translation: 'Comprei leite também.',
      },
      {
        words: [
          { text: 'ぜんぶで', meaning: 'no total' },
          { text: 'さんぜんえんでした。', meaning: 'foi três mil ienes' },
        ],
        translation: 'No total, foram três mil ienes.',
      },
      {
        words: [
          { text: 'スーパーの', meaning: 'do supermercado' },
          { text: 'ひとは', meaning: 'a pessoa/funcionário' },
          { text: 'とても', meaning: 'muito' },
          { text: 'しんせつでした。', meaning: 'foi gentil' },
        ],
        translation: 'O funcionário do supermercado foi muito gentil.',
      },
      {
        words: [
          { text: 'うちに', meaning: 'para casa' },
          { text: 'かえって、', meaning: 'volto, e' },
          { text: 'りょうりを', meaning: 'comida/culinária (+ partícula de objeto)' },
          { text: 'しました。', meaning: 'fiz' },
        ],
        translation: 'Voltei para casa e cozinhei.',
      },
      {
        words: [
          { text: 'とても', meaning: 'muito' },
          { text: 'おいしかったです。', meaning: 'estava gostoso' },
        ],
        translation: 'Estava muito gostoso.',
      },
      {
        words: [
          { text: 'また', meaning: 'de novo' },
          { text: 'らいしゅう', meaning: 'semana que vem' },
          { text: 'いきたいです。', meaning: 'quero ir' },
        ],
        translation: 'Quero ir de novo semana que vem.',
      },
      {
        words: [
          { text: 'スーパーは', meaning: 'o supermercado' },
          { text: 'いえから', meaning: 'de casa' },
          { text: 'ちかいです。', meaning: 'é perto' },
        ],
        translation: 'O supermercado é perto de casa.',
      },
      {
        words: [
          { text: 'やすい', meaning: 'barato, em promoção' },
          { text: 'ひは、', meaning: 'no dia,' },
          { text: 'いつも', meaning: 'sempre' },
          { text: 'こんでいます。', meaning: 'está cheio' },
        ],
        translation: 'Nos dias de promoção, está sempre cheio.',
      },
      {
        words: [
          { text: 'かいものは', meaning: 'fazer compras' },
          { text: 'たのしい', meaning: 'divertido' },
          { text: 'じかんです。', meaning: 'é um momento' },
        ],
        translation: 'Fazer compras é um momento divertido.',
      },
    ],
  },
  {
    id: 'kazoku',
    title: 'かぞく',
    level: 1,
    wordCount: 35,
    summaryPt: 'A família do narrador — pai, mãe, irmão mais velho — e o domingo que passam juntos.',
    lines: [
      {
        words: [
          { text: 'わたしの', meaning: 'minha' },
          { text: 'かぞくは', meaning: 'a família (+ partícula de tópico)' },
          { text: 'よにんです。', meaning: 'são quatro pessoas' },
        ],
        translation: 'Minha família tem quatro pessoas.',
      },
      {
        words: [
          { text: 'ちちと', meaning: 'pai e' },
          { text: 'ははと', meaning: 'mãe e' },
          { text: 'あにが', meaning: 'irmão mais velho (+ partícula de sujeito)' },
          { text: 'います。', meaning: 'há, existe (seres vivos)' },
        ],
        translation: 'Há meu pai, minha mãe e meu irmão mais velho.',
      },
      {
        words: [
          { text: 'ちちは', meaning: 'meu pai' },
          { text: 'かいしゃいんです。', meaning: 'é funcionário de empresa' },
        ],
        translation: 'Meu pai é funcionário de empresa.',
      },
      {
        words: [
          { text: 'ははは', meaning: 'minha mãe' },
          { text: 'りょうりが', meaning: 'culinária (+ partícula de sujeito)' },
          { text: 'じょうずです。', meaning: 'é boa em, é hábil' },
        ],
        translation: 'Minha mãe cozinha bem.',
      },
      {
        words: [
          { text: 'あには', meaning: 'meu irmão mais velho' },
          { text: 'だいがくせいです。', meaning: 'é universitário' },
        ],
        translation: 'Meu irmão mais velho é universitário.',
      },
      {
        words: [
          { text: 'みんな', meaning: 'todos' },
          { text: 'なかが', meaning: 'relação (+ partícula de sujeito)' },
          { text: 'いいです。', meaning: 'é boa' },
        ],
        translation: 'Todos nós nos damos bem.',
      },
      {
        words: [
          { text: 'にちようびは', meaning: 'aos domingos' },
          { text: 'いつも', meaning: 'sempre' },
          { text: 'かぞくで', meaning: 'em família' },
          { text: 'しょくじを', meaning: 'refeição (+ partícula de objeto)' },
          { text: 'します。', meaning: 'fazemos' },
        ],
        translation: 'Aos domingos, sempre fazemos uma refeição em família.',
      },
      {
        words: [
          { text: 'わたしは', meaning: 'eu' },
          { text: 'かぞくが', meaning: 'a família (+ partícula de sujeito/objeto emocional)' },
          { text: 'だいすきです。', meaning: 'amo, gosto muito' },
        ],
        translation: 'Eu amo minha família.',
      },
      {
        words: [
          { text: 'そふと', meaning: 'avô e' },
          { text: 'そぼも', meaning: 'avó também' },
          { text: 'ちかくに', meaning: 'perto' },
          { text: 'すんでいます。', meaning: 'moram' },
        ],
        translation: 'Meu avô e minha avó também moram perto.',
      },
      {
        words: [
          { text: 'ときどき', meaning: 'às vezes' },
          { text: 'みんなで', meaning: 'todos juntos' },
          { text: 'りょこうに', meaning: 'em viagem' },
          { text: 'いきます。', meaning: 'vamos' },
        ],
        translation: 'Às vezes, todos nós viajamos juntos.',
      },
      {
        words: [
          { text: 'かぞくは', meaning: 'a família' },
          { text: 'わたしの', meaning: 'meu' },
          { text: 'たからものです。', meaning: 'é tesouro' },
        ],
        translation: 'A família é o meu tesouro.',
      },
      {
        words: [
          { text: 'いつまでも', meaning: 'para sempre' },
          { text: 'かぞくを', meaning: 'a família (+ partícula de objeto)' },
          { text: 'たいせつに', meaning: 'com carinho' },
          { text: 'したいです。', meaning: 'quero tratar' },
        ],
        translation: 'Quero sempre cuidar bem da minha família.',
      },
    ],
  },
  {
    id: 'tenki',
    title: 'てんき',
    level: 1,
    wordCount: 35,
    summaryPt: 'As quatro estações do ano e o tipo de tempo de cada uma.',
    lines: [
      {
        words: [
          { text: 'きょうは', meaning: 'hoje' },
          { text: 'はるです。', meaning: 'é primavera' },
        ],
        translation: 'Hoje é primavera.',
      },
      {
        words: [
          { text: 'てんきが', meaning: 'o tempo (+ partícula de sujeito)' },
          { text: 'とても', meaning: 'muito' },
          { text: 'いいです。', meaning: 'está bom' },
        ],
        translation: 'O tempo está muito bom.',
      },
      {
        words: [
          { text: 'そらは', meaning: 'o céu' },
          { text: 'あおくて、', meaning: 'está azul, e' },
          { text: 'かぜが', meaning: 'o vento (+ partícula de sujeito)' },
          { text: 'きもち', meaning: 'sensação' },
          { text: 'いいです。', meaning: 'é boa, é agradável' },
        ],
        translation: 'O céu está azul, e o vento é agradável.',
      },
      {
        words: [
          { text: 'なつは', meaning: 'o verão' },
          { text: 'とても', meaning: 'muito' },
          { text: 'あついです。', meaning: 'é quente' },
        ],
        translation: 'O verão é muito quente.',
      },
      {
        words: [
          { text: 'あきは', meaning: 'o outono' },
          { text: 'すずしくて、', meaning: 'é fresco, e' },
          { text: 'きれいです。', meaning: 'é bonito' },
        ],
        translation: 'O outono é fresco e bonito.',
      },
      {
        words: [
          { text: 'ふゆは', meaning: 'o inverno' },
          { text: 'さむくて、', meaning: 'é frio, e' },
          { text: 'ゆきが', meaning: 'a neve (+ partícula de sujeito)' },
          { text: 'ふります。', meaning: 'cai (neve/chuva)' },
        ],
        translation: 'O inverno é frio, e neva.',
      },
      {
        words: [
          { text: 'わたしは', meaning: 'eu' },
          { text: 'はると', meaning: 'primavera e' },
          { text: 'あきが', meaning: 'outono (+ partícula de sujeito)' },
          { text: 'すきです。', meaning: 'gosto' },
        ],
        translation: 'Eu gosto de primavera e outono.',
      },
      {
        words: [
          { text: 'つゆの', meaning: 'da estação chuvosa' },
          { text: 'じきは、', meaning: 'a época,' },
          { text: 'あめが', meaning: 'chuva (+ partícula de sujeito)' },
          { text: 'おおいです。', meaning: 'é muita' },
        ],
        translation: 'Na época da estação chuvosa, chove muito.',
      },
      {
        words: [
          { text: 'たいふうの', meaning: 'de tufão' },
          { text: 'ひは、', meaning: 'no dia,' },
          { text: 'そとへ', meaning: 'para fora' },
          { text: 'でません。', meaning: 'não saio' },
        ],
        translation: 'Em dias de tufão, não saio de casa.',
      },
      {
        words: [
          { text: 'てんきが', meaning: 'o tempo (+ partícula de sujeito)' },
          { text: 'いいと、', meaning: 'quando está bom,' },
          { text: 'きもちも', meaning: 'o humor também' },
          { text: 'いいです。', meaning: 'fica bom' },
        ],
        translation: 'Quando o tempo está bom, meu humor também melhora.',
      },
      {
        words: [
          { text: 'にほんの', meaning: 'do Japão' },
          { text: 'てんきは、', meaning: 'o tempo,' },
          { text: 'へんかが', meaning: 'mudanças (+ partícula de sujeito)' },
          { text: 'おおくて', meaning: 'são muitas, e' },
          { text: 'おもしろいです。', meaning: 'é interessante' },
        ],
        translation: 'O tempo do Japão muda bastante, e isso é interessante.',
      },
    ],
  },
  {
    id: 'dokusho',
    title: 'どくしょが すき',
    level: 1,
    wordCount: 35,
    summaryPt: 'Por que a leitura é o hobby favorito do narrador.',
    lines: [
      {
        words: [
          { text: 'わたしの', meaning: 'meu' },
          { text: 'しゅみは', meaning: 'o hobby (+ partícula de tópico)' },
          { text: 'どくしょです。', meaning: 'é leitura' },
        ],
        translation: 'Meu hobby é a leitura.',
      },
      {
        words: [
          { text: 'まいばん', meaning: 'toda noite' },
          { text: 'ねる', meaning: 'dormir' },
          { text: 'まえに', meaning: 'antes de' },
          { text: 'ほんを', meaning: 'livro (+ partícula de objeto)' },
          { text: 'よみます。', meaning: 'leio' },
        ],
        translation: 'Toda noite, leio um livro antes de dormir.',
      },
      {
        words: [
          { text: 'すきな', meaning: 'favorito, de que gosto' },
          { text: 'ほんは', meaning: 'o livro' },
          { text: 'おもしろい', meaning: 'interessante' },
          { text: 'ものがたりです。', meaning: 'é uma história' },
        ],
        translation: 'O livro de que gosto é uma história interessante.',
      },
      {
        words: [
          { text: 'としょかんへ', meaning: 'para a biblioteca' },
          { text: 'よく', meaning: 'frequentemente' },
          { text: 'いきます。', meaning: 'vou' },
        ],
        translation: 'Vou com frequência à biblioteca.',
      },
      {
        words: [
          { text: 'としょかんは', meaning: 'a biblioteca' },
          { text: 'しずかで、', meaning: 'é silenciosa, e' },
          { text: 'すきな', meaning: 'que eu gosto' },
          { text: 'ばしょです。', meaning: 'é um lugar' },
        ],
        translation: 'A biblioteca é silenciosa, um lugar de que gosto.',
      },
      {
        words: [
          { text: 'いっしゅうかんに', meaning: 'em uma semana' },
          { text: 'にさつ', meaning: 'dois volumes (livros)' },
          { text: 'よみます。', meaning: 'leio' },
        ],
        translation: 'Leio dois livros por semana.',
      },
      {
        words: [
          { text: 'どくしょは', meaning: 'a leitura' },
          { text: 'たのしくて、', meaning: 'é divertida, e' },
          { text: 'べんきょうにも', meaning: 'também em estudo' },
          { text: 'なります。', meaning: 'se torna' },
        ],
        translation: 'A leitura é divertida, e também vira estudo.',
      },
      {
        words: [
          { text: 'ミステリーの', meaning: 'de mistério' },
          { text: 'ほんが', meaning: 'livro (+ partícula de sujeito)' },
          { text: 'とくに', meaning: 'especialmente' },
          { text: 'すきです。', meaning: 'gosto' },
        ],
        translation: 'Gosto especialmente de livros de mistério.',
      },
      {
        words: [
          { text: 'ともだちに', meaning: 'para amigos' },
          { text: 'すきな', meaning: 'favoritos' },
          { text: 'ほんを', meaning: 'livros (+ partícula de objeto)' },
          { text: 'すすめます。', meaning: 'recomendo' },
        ],
        translation: 'Recomendo meus livros favoritos para os amigos.',
      },
      {
        words: [
          { text: 'としょかんの', meaning: 'da biblioteca' },
          { text: 'カードを', meaning: 'cartão (+ partícula de objeto)' },
          { text: 'もっています。', meaning: 'tenho' },
        ],
        translation: 'Tenho um cartão da biblioteca.',
      },
      {
        words: [
          { text: 'これからも', meaning: 'de agora em diante também' },
          { text: 'たくさん', meaning: 'muitos' },
          { text: 'ほんを', meaning: 'livros (+ partícula de objeto)' },
          { text: 'よみたいです。', meaning: 'quero ler' },
        ],
        translation: 'Quero continuar lendo muitos livros.',
      },
    ],
  },
  {
    id: 'shuumatsu-uchi',
    title: 'しゅうまつは うちで',
    level: 1,
    wordCount: 40,
    summaryPt: 'Um fim de semana tranquilo em casa, sem sair.',
    lines: [
      {
        words: [
          { text: 'どようびの', meaning: 'de sábado' },
          { text: 'あさは', meaning: 'a manhã' },
          { text: 'ゆっくり', meaning: 'com calma, devagar' },
          { text: 'おきます。', meaning: 'acordo' },
        ],
        translation: 'No sábado de manhã, acordo com calma.',
      },
      {
        words: [
          { text: 'あさごはんを', meaning: 'o café da manhã (+ partícula de objeto)' },
          { text: 'たべながら、', meaning: 'enquanto como,' },
          { text: 'テレビを', meaning: 'TV (+ partícula de objeto)' },
          { text: 'みます。', meaning: 'assisto' },
        ],
        translation: 'Assisto TV enquanto tomo café da manhã.',
      },
      {
        words: [
          { text: 'ごごは', meaning: 'de tarde' },
          { text: 'おんがくを', meaning: 'música (+ partícula de objeto)' },
          { text: 'ききます。', meaning: 'escuto' },
        ],
        translation: 'De tarde, escuto música.',
      },
      {
        words: [
          { text: 'ときどき', meaning: 'às vezes' },
          { text: 'ともだちと', meaning: 'com amigos' },
          { text: 'でかけます。', meaning: 'saio (de casa)' },
        ],
        translation: 'Às vezes, saio com amigos.',
      },
      {
        words: [
          { text: 'にちようびは', meaning: 'no domingo' },
          { text: 'そうじを', meaning: 'faxina (+ partícula de objeto)' },
          { text: 'して、', meaning: 'faço, e' },
          { text: 'せんたくも', meaning: 'lavagem de roupa também' },
          { text: 'します。', meaning: 'faço' },
        ],
        translation: 'No domingo, faço faxina e também lavo roupa.',
      },
      {
        words: [
          { text: 'よるは', meaning: 'a noite' },
          { text: 'はやく', meaning: 'cedo' },
          { text: 'ねます。', meaning: 'durmo' },
        ],
        translation: 'À noite, durmo cedo.',
      },
      {
        words: [
          { text: 'しゅうまつは', meaning: 'o fim de semana' },
          { text: 'ゆっくり', meaning: 'com calma' },
          { text: 'できて、', meaning: 'consigo, e' },
          { text: 'いいです。', meaning: 'é bom' },
        ],
        translation: 'No fim de semana consigo descansar com calma, e isso é bom.',
      },
      {
        words: [
          { text: 'ときどき、', meaning: 'às vezes,' },
          { text: 'りょうりを', meaning: 'comida/culinária (+ partícula de objeto)' },
          { text: 'つくります。', meaning: 'faço, preparo' },
        ],
        translation: 'Às vezes, cozinho.',
      },
      {
        words: [
          { text: 'うちの', meaning: 'de casa' },
          { text: 'しょくぶつに', meaning: 'nas plantas' },
          { text: 'みずを', meaning: 'água (+ partícula de objeto)' },
          { text: 'あげます。', meaning: 'dou' },
        ],
        translation: 'Dou água nas plantas de casa.',
      },
      {
        words: [
          { text: 'うちに', meaning: 'em casa' },
          { text: 'いる', meaning: 'ficar, estar' },
          { text: 'ひは、', meaning: 'nos dias,' },
          { text: 'こころが', meaning: 'a mente/coração (+ partícula de sujeito)' },
          { text: 'やすまります。', meaning: 'descansa' },
        ],
        translation: 'Nos dias em que fico em casa, minha mente descansa.',
      },
      {
        words: [
          { text: 'らいしゅうも、', meaning: 'semana que vem também,' },
          { text: 'うちで', meaning: 'em casa' },
          { text: 'のんびり', meaning: 'relaxadamente' },
          { text: 'すごしたいです。', meaning: 'quero passar o tempo' },
        ],
        translation: 'Semana que vem também, quero passar o tempo relaxando em casa.',
      },
    ],
  },
  {
    id: 'suki-na-tabemono',
    title: 'すきな たべもの',
    level: 1,
    wordCount: 38,
    summaryPt: 'Por que o narrador ama sushi e como aproveita esse prato com a família.',
    lines: [
      {
        words: [
          { text: 'わたしは', meaning: 'eu' },
          { text: 'すしが', meaning: 'sushi (+ partícula de sujeito)' },
          { text: 'だいすきです。', meaning: 'amo, gosto muito' },
        ],
        translation: 'Eu amo sushi.',
      },
      {
        words: [
          { text: 'とくに、', meaning: 'especialmente,' },
          { text: 'さかなの', meaning: 'de peixe' },
          { text: 'すしが', meaning: 'sushi (+ partícula de sujeito)' },
          { text: 'すきです。', meaning: 'gosto' },
        ],
        translation: 'Gosto especialmente do sushi de peixe.',
      },
      {
        words: [
          { text: 'しゅうまつに、', meaning: 'no fim de semana,' },
          { text: 'かぞくと', meaning: 'com a família' },
          { text: 'すしやへ', meaning: 'para a loja de sushi' },
          { text: 'いきます。', meaning: 'vou' },
        ],
        translation: 'No fim de semana, vou com a família a uma loja de sushi.',
      },
      {
        words: [
          { text: 'すしやさんは', meaning: 'a loja de sushi' },
          { text: 'いつも', meaning: 'sempre' },
          { text: 'こんでいます。', meaning: 'está cheia/lotada' },
        ],
        translation: 'A loja de sushi está sempre cheia.',
      },
      {
        words: [
          { text: 'でも、', meaning: 'mas,' },
          { text: 'すしは', meaning: 'o sushi' },
          { text: 'とても', meaning: 'muito' },
          { text: 'おいしいです。', meaning: 'é gostoso' },
        ],
        translation: 'Mas o sushi é muito gostoso.',
      },
      {
        words: [
          { text: 'わたしは', meaning: 'eu' },
          { text: 'おちゃも', meaning: 'chá também' },
          { text: 'いっしょに', meaning: 'junto' },
          { text: 'のみます。', meaning: 'bebo' },
        ],
        translation: 'Eu também bebo chá junto.',
      },
      {
        words: [
          { text: 'すしを', meaning: 'sushi (+ partícula de objeto)' },
          { text: 'たべる', meaning: 'comer' },
          { text: 'ひは、', meaning: 'o dia (é),' },
          { text: 'いつも', meaning: 'sempre' },
          { text: 'たのしいです。', meaning: 'é divertido' },
        ],
        translation: 'Os dias em que como sushi são sempre divertidos.',
      },
      {
        words: [
          { text: 'たまに、', meaning: 'de vez em quando,' },
          { text: 'いえで', meaning: 'em casa' },
          { text: 'すしを', meaning: 'sushi (+ partícula de objeto)' },
          { text: 'つくります。', meaning: 'faço' },
        ],
        translation: 'De vez em quando, faço sushi em casa.',
      },
      {
        words: [
          { text: 'でも、', meaning: 'mas,' },
          { text: 'おみせの', meaning: 'da loja' },
          { text: 'すしの', meaning: 'o sushi' },
          { text: 'ほうが', meaning: 'mais (+ comparativo)' },
          { text: 'おいしいです。', meaning: 'é gostoso' },
        ],
        translation: 'Mas o sushi da loja é mais gostoso.',
      },
      {
        words: [
          { text: 'すきな', meaning: 'favoritos' },
          { text: 'ねたは、', meaning: 'os ingredientes,' },
          { text: 'まぐろと', meaning: 'atum e' },
          { text: 'サーモンです。', meaning: 'é salmão' },
        ],
        translation: 'Meus ingredientes favoritos são atum e salmão.',
      },
      {
        words: [
          { text: 'これからも', meaning: 'de agora em diante também' },
          { text: 'すしを', meaning: 'sushi (+ partícula de objeto)' },
          { text: 'たべつづけたいです。', meaning: 'quero continuar comendo' },
        ],
        translation: 'Quero continuar comendo sushi de agora em diante.',
      },
    ],
  },
  {
    id: 'denwa',
    title: 'でんわ',
    level: 1,
    wordCount: 44,
    summaryPt: 'Um telefonema de uma hora com um amigo, do "alô" ao "até mais".',
    lines: [
      {
        words: [
          { text: 'きのう、', meaning: 'ontem,' },
          { text: 'ともだちに', meaning: 'para um amigo' },
          { text: 'でんわを', meaning: 'telefonema (+ partícula de objeto)' },
          { text: 'しました。', meaning: 'fiz' },
        ],
        translation: 'Ontem, liguei para um amigo.',
      },
      {
        words: [
          { text: 'さいしょに、', meaning: 'primeiro,' },
          { text: '「もしもし」と', meaning: '"alô", (+ partícula de citação)' },
          { text: 'いいました。', meaning: 'eu disse' },
        ],
        translation: 'Primeiro, disse "alô".',
      },
      {
        words: [
          { text: 'ともだちは', meaning: 'o amigo' },
          { text: 'げんきそうでした。', meaning: 'parecia estar bem' },
        ],
        translation: 'O amigo parecia estar bem.',
      },
      {
        words: [
          { text: 'がっこうの', meaning: 'da escola' },
          { text: 'はなしや、', meaning: 'história/conversa, e' },
          { text: 'しゅみの', meaning: 'de hobby' },
          { text: 'はなしを', meaning: 'conversa (+ partícula de objeto)' },
          { text: 'しました。', meaning: 'fizemos' },
        ],
        translation: 'Conversamos sobre a escola e sobre hobbies.',
      },
      {
        words: [
          { text: 'でんわは', meaning: 'o telefonema' },
          { text: 'いちじかん', meaning: 'uma hora' },
          { text: 'ぐらい', meaning: 'cerca de' },
          { text: 'つづきました。', meaning: 'durou, continuou' },
        ],
        translation: 'A ligação durou cerca de uma hora.',
      },
      {
        words: [
          { text: 'さいごに、', meaning: 'no fim,' },
          { text: '「またね」と', meaning: '"até mais", (+ partícula de citação)' },
          { text: 'いって、', meaning: 'dizendo, e' },
          { text: 'でんわを', meaning: 'o telefone (+ partícula de objeto)' },
          { text: 'きりました。', meaning: 'desliguei, cortei' },
        ],
        translation: 'No fim, disse "até mais" e desliguei.',
      },
      {
        words: [
          { text: 'とても', meaning: 'muito' },
          { text: 'たのしい', meaning: 'divertido' },
          { text: 'じかんでした。', meaning: 'foi um tempo/momento' },
        ],
        translation: 'Foi um momento muito divertido.',
      },
      {
        words: [
          { text: 'ともだちの', meaning: 'do amigo' },
          { text: 'こえを', meaning: 'a voz (+ partícula de objeto)' },
          { text: 'きいて、', meaning: 'ouvindo,' },
          { text: 'あんしんしました。', meaning: 'fiquei aliviado' },
        ],
        translation: 'Ouvindo a voz do amigo, fiquei aliviado.',
      },
      {
        words: [
          { text: 'らいげつ、', meaning: 'mês que vem,' },
          { text: 'ともだちに', meaning: 'com o amigo' },
          { text: 'あう', meaning: 'encontrar' },
          { text: 'やくそくを', meaning: 'promessa (+ partícula de objeto)' },
          { text: 'しました。', meaning: 'fiz' },
        ],
        translation: 'Combinei de encontrar o amigo mês que vem.',
      },
      {
        words: [
          { text: 'ともだちとは、', meaning: 'com esse amigo,' },
          { text: 'こどもの', meaning: 'da infância' },
          { text: 'ときからの', meaning: 'desde a época (modificando a palavra seguinte)' },
          { text: 'なかです。', meaning: 'é a amizade' },
        ],
        translation: 'Com esse amigo, é uma amizade que vem desde a infância.',
      },
      {
        words: [
          { text: 'でんわを', meaning: 'o telefone (+ partícula de objeto)' },
          { text: 'きると、', meaning: 'quando desligo,' },
          { text: 'すこし', meaning: 'um pouco' },
          { text: 'さびしく', meaning: 'com saudade' },
          { text: 'なりました。', meaning: 'fiquei' },
        ],
        translation: 'Quando desliguei o telefone, fiquei um pouco com saudade.',
      },
    ],
  },
  {
    id: 'asa-no-gakkou',
    title: 'あさの がっこう',
    level: 1,
    wordCount: 41,
    summaryPt: 'A rotina da manhã, de acordar até o início da aula.',
    lines: [
      {
        words: [
          { text: 'まいあさ、', meaning: 'toda manhã,' },
          { text: 'しちじに', meaning: 'às sete horas' },
          { text: 'おきます。', meaning: 'acordo' },
        ],
        translation: 'Toda manhã, acordo às sete horas.',
      },
      {
        words: [
          { text: 'はを', meaning: 'os dentes (+ partícula de objeto)' },
          { text: 'みがいて、', meaning: 'escovo, e' },
          { text: 'ふくを', meaning: 'a roupa (+ partícula de objeto)' },
          { text: 'きます。', meaning: 'visto' },
        ],
        translation: 'Escovo os dentes e me visto.',
      },
      {
        words: [
          { text: 'あさごはんを', meaning: 'o café da manhã (+ partícula de objeto)' },
          { text: 'たべて、', meaning: 'como, e' },
          { text: 'かばんを', meaning: 'a mochila (+ partícula de objeto)' },
          { text: 'もちます。', meaning: 'seguro, carrego' },
        ],
        translation: 'Como o café da manhã e pego a mochila.',
      },
      {
        words: [
          { text: 'はちじに', meaning: 'às oito horas' },
          { text: 'いえを', meaning: 'de casa' },
          { text: 'でます。', meaning: 'saio' },
        ],
        translation: 'Saio de casa às oito horas.',
      },
      {
        words: [
          { text: 'がっこうまで', meaning: 'até a escola' },
          { text: 'あるいて', meaning: 'a pé (andando)' },
          { text: 'じゅっぷんです。', meaning: 'são dez minutos' },
        ],
        translation: 'São dez minutos a pé até a escola.',
      },
      {
        words: [
          { text: 'がっこうで', meaning: 'na escola' },
          { text: 'ともだちに', meaning: 'os amigos' },
          { text: 'あいます。', meaning: 'encontro' },
        ],
        translation: 'Na escola, encontro os amigos.',
      },
      {
        words: [
          { text: 'じゅぎょうは', meaning: 'a aula' },
          { text: 'はちじはんに', meaning: 'às oito e meia' },
          { text: 'はじまります。', meaning: 'começa' },
        ],
        translation: 'A aula começa às oito e meia.',
      },
      {
        words: [
          { text: 'じゅぎょうちゅうは、', meaning: 'durante a aula,' },
          { text: 'せんせいの', meaning: 'do professor' },
          { text: 'はなしを', meaning: 'a fala (+ partícula de objeto)' },
          { text: 'よく', meaning: 'atentamente' },
          { text: 'ききます。', meaning: 'escuto' },
        ],
        translation: 'Durante a aula, escuto atentamente o professor.',
      },
      {
        words: [
          { text: 'ひるやすみに、', meaning: 'no intervalo do almoço,' },
          { text: 'べんとうを', meaning: 'bentô (+ partícula de objeto)' },
          { text: 'たべます。', meaning: 'como' },
        ],
        translation: 'No intervalo do almoço, como um bentô.',
      },
      {
        words: [
          { text: 'じゅぎょうが', meaning: 'a aula (+ partícula de sujeito)' },
          { text: 'おわると、', meaning: 'quando termina,' },
          { text: 'ともだちと', meaning: 'com amigos' },
          { text: 'あそびます。', meaning: 'curto, brinco' },
        ],
        translation: 'Quando a aula termina, curto com os amigos.',
      },
      {
        words: [
          { text: 'がっこうは', meaning: 'a escola' },
          { text: 'たのしくて、', meaning: 'é divertida, e' },
          { text: 'まいにち', meaning: 'todo dia' },
          { text: 'いきたく', meaning: 'vontade de ir' },
          { text: 'なります。', meaning: 'dá, fico com' },
        ],
        translation: 'A escola é divertida, e me dá vontade de ir todo dia.',
      },
    ],
  },
  {
    id: 'tanjoubi',
    title: 'たんじょうび',
    level: 1,
    wordCount: 37,
    summaryPt: 'A expectativa para o próprio aniversário, com festa e bolo.',
    lines: [
      {
        words: [
          { text: 'あしたは', meaning: 'amanhã' },
          { text: 'わたしの', meaning: 'meu' },
          { text: 'たんじょうびです。', meaning: 'é aniversário' },
        ],
        translation: 'Amanhã é meu aniversário.',
      },
      {
        words: [
          { text: 'ことしで', meaning: 'neste ano' },
          { text: 'にじゅういっさいに', meaning: 'vinte e um anos' },
          { text: 'なります。', meaning: 'me tornarei, farei' },
        ],
        translation: 'Este ano, farei vinte e um anos.',
      },
      {
        words: [
          { text: 'かぞくが', meaning: 'a família (+ partícula de sujeito)' },
          { text: 'パーティーを', meaning: 'festa (+ partícula de objeto)' },
          { text: 'して', meaning: 'fazendo' },
          { text: 'くれます。', meaning: 'fazem (para mim, favor)' },
        ],
        translation: 'Minha família vai fazer uma festa para mim.',
      },
      {
        words: [
          { text: 'ともだちも', meaning: 'amigos também' },
          { text: 'よびました。', meaning: 'chamei, convidei' },
        ],
        translation: 'Também convidei meus amigos.',
      },
      {
        words: [
          { text: 'おいしい', meaning: 'gostoso' },
          { text: 'ケーキを', meaning: 'bolo (+ partícula de objeto)' },
          { text: 'たべる', meaning: 'comer' },
          { text: 'よていです。', meaning: 'é o plano, previsão' },
        ],
        translation: 'O plano é comer um bolo gostoso.',
      },
      {
        words: [
          { text: 'みんなから', meaning: 'de todo mundo' },
          { text: 'プレゼントを', meaning: 'presente (+ partícula de objeto)' },
          { text: 'もらいます。', meaning: 'recebo' },
        ],
        translation: 'Vou receber presentes de todo mundo.',
      },
      {
        words: [
          { text: 'とても', meaning: 'muito' },
          { text: 'たのしみです。', meaning: 'estou ansioso, aguardo com expectativa' },
        ],
        translation: 'Estou muito ansioso.',
      },
      {
        words: [
          { text: 'パーティーは', meaning: 'a festa' },
          { text: 'よる', meaning: 'à noite' },
          { text: 'しちじから', meaning: 'a partir das sete' },
          { text: 'です。', meaning: 'é' },
        ],
        translation: 'A festa começa às sete da noite.',
      },
      {
        words: [
          { text: 'みんなで', meaning: 'todos juntos' },
          { text: 'しゃしんを', meaning: 'fotos (+ partícula de objeto)' },
          { text: 'とる', meaning: 'tirar' },
          { text: 'つもりです。', meaning: 'pretendemos' },
        ],
        translation: 'Pretendemos tirar fotos todos juntos.',
      },
      {
        words: [
          { text: 'あたらしい', meaning: 'nova' },
          { text: 'としを', meaning: 'idade (+ partícula de objeto)' },
          { text: 'むかえるのが', meaning: 'completar' },
          { text: 'たのしみです。', meaning: 'estou animado' },
        ],
        translation: 'Estou animado para completar uma nova idade.',
      },
      {
        words: [
          { text: 'すてきな', meaning: 'maravilhoso' },
          { text: 'たんじょうびに', meaning: 'em aniversário' },
          { text: 'なりそうです。', meaning: 'parece que vai ser' },
        ],
        translation: 'Parece que vai ser um aniversário maravilhoso.',
      },
    ],
  },
  {
    id: 'watashi-no-inu',
    title: 'わたしの いぬ',
    level: 1,
    wordCount: 40,
    summaryPt: 'O cachorro de estimação do narrador e o passeio diário no parque.',
    lines: [
      {
        words: [
          { text: 'わたしは', meaning: 'eu' },
          { text: 'いぬを', meaning: 'cachorro (+ partícula de objeto)' },
          { text: 'かっています。', meaning: 'tenho, crio (animal)' },
        ],
        translation: 'Eu tenho um cachorro.',
      },
      {
        words: [
          { text: 'なまえは', meaning: 'o nome' },
          { text: 'ぽちです。', meaning: 'é Pochi' },
        ],
        translation: 'O nome dele é Pochi.',
      },
      {
        words: [
          { text: 'まいあさ、', meaning: 'toda manhã,' },
          { text: 'こうえんで', meaning: 'no parque' },
          { text: 'さんぽを', meaning: 'passeio (+ partícula de objeto)' },
          { text: 'します。', meaning: 'faço' },
        ],
        translation: 'Toda manhã, passeamos no parque.',
      },
      {
        words: [
          { text: 'ぽちは', meaning: 'o Pochi' },
          { text: 'とても', meaning: 'muito' },
          { text: 'げんきで、', meaning: 'é ativo/saudável, e' },
          { text: 'よく', meaning: 'bastante, frequentemente' },
          { text: 'はしります。', meaning: 'corre' },
        ],
        translation: 'O Pochi é muito ativo e corre bastante.',
      },
      {
        words: [
          { text: 'わたしを', meaning: 'a mim (+ partícula de objeto)' },
          { text: 'みると、', meaning: 'quando vê,' },
          { text: 'しっぽを', meaning: 'o rabo (+ partícula de objeto)' },
          { text: 'ふります。', meaning: 'abana, balança' },
        ],
        translation: 'Quando me vê, abana o rabo.',
      },
      {
        words: [
          { text: 'よる', meaning: 'à noite' },
          { text: 'いっしょに', meaning: 'juntos' },
          { text: 'ねます。', meaning: 'dormimos' },
        ],
        translation: 'À noite, dormimos juntos.',
      },
      {
        words: [
          { text: 'ぽちは', meaning: 'o Pochi' },
          { text: 'わたしの', meaning: 'minha' },
          { text: 'たいせつな', meaning: 'importante' },
          { text: 'かぞくです。', meaning: 'é família' },
        ],
        translation: 'O Pochi é um membro importante da minha família.',
      },
      {
        words: [
          { text: 'まいにち、', meaning: 'todo dia,' },
          { text: 'ドッグフードを', meaning: 'ração (+ partícula de objeto)' },
          { text: 'あげます。', meaning: 'dou' },
        ],
        translation: 'Todo dia, dou ração para ele.',
      },
      {
        words: [
          { text: 'びょういんへ', meaning: 'para a clínica' },
          { text: 'いくのは、', meaning: 'ir,' },
          { text: 'すこし', meaning: 'um pouco' },
          { text: 'きらいです。', meaning: 'não gosta' },
        ],
        translation: 'Ele não gosta muito de ir ao veterinário.',
      },
      {
        words: [
          { text: 'でも、', meaning: 'mas,' },
          { text: 'わたしと', meaning: 'comigo' },
          { text: 'いると、', meaning: 'quando está,' },
          { text: 'あんしんするみたいです。', meaning: 'parece que fica tranquilo' },
        ],
        translation: 'Mas quando está comigo, ele parece ficar tranquilo.',
      },
      {
        words: [
          { text: 'ぽちが', meaning: 'o Pochi (+ partícula de sujeito)' },
          { text: 'いる', meaning: 'existir, estar' },
          { text: 'まいにちは、', meaning: 'todo dia,' },
          { text: 'とても', meaning: 'muito' },
          { text: 'しあわせです。', meaning: 'é feliz' },
        ],
        translation: 'Todo dia com o Pochi é muito feliz.',
      },
    ],
  },
  {
    id: 'densha-no-tabi',
    title: 'でんしゃの たび',
    level: 1,
    wordCount: 40,
    summaryPt: 'Uma viagem de trem até o mar, com paisagem e um bentô no caminho.',
    lines: [
      {
        words: [
          { text: 'せんしゅう、', meaning: 'semana passada,' },
          { text: 'でんしゃで', meaning: 'de trem' },
          { text: 'うみへ', meaning: 'para o mar' },
          { text: 'いきました。', meaning: 'fui' },
        ],
        translation: 'Semana passada, fui de trem até o mar.',
      },
      {
        words: [
          { text: 'でんしゃは', meaning: 'o trem' },
          { text: 'にじかん', meaning: 'duas horas' },
          { text: 'ぐらい', meaning: 'cerca de' },
          { text: 'かかりました。', meaning: 'levou (tempo)' },
        ],
        translation: 'O trem levou cerca de duas horas.',
      },
      {
        words: [
          { text: 'まどから', meaning: 'da janela' },
          { text: 'やまや', meaning: 'montanhas e' },
          { text: 'かわが', meaning: 'rios (+ partícula de sujeito)' },
          { text: 'みえました。', meaning: 'era possível ver' },
        ],
        translation: 'Da janela, dava para ver montanhas e rios.',
      },
      {
        words: [
          { text: 'でんしゃの', meaning: 'do trem' },
          { text: 'なかで、', meaning: 'dentro,' },
          { text: 'おべんとうを', meaning: 'bentô (+ partícula de objeto)' },
          { text: 'たべました。', meaning: 'comi' },
        ],
        translation: 'Comi um bentô dentro do trem.',
      },
      {
        words: [
          { text: 'うみに', meaning: 'ao mar' },
          { text: 'ついたとき、', meaning: 'quando cheguei,' },
          { text: 'とても', meaning: 'muito' },
          { text: 'きれいでした。', meaning: 'estava bonito' },
        ],
        translation: 'Quando cheguei ao mar, estava muito bonito.',
      },
      {
        words: [
          { text: 'かえりの', meaning: 'da volta' },
          { text: 'でんしゃで、', meaning: 'no trem,' },
          { text: 'ぐっすり', meaning: 'profundamente' },
          { text: 'ねました。', meaning: 'dormi' },
        ],
        translation: 'No trem de volta, dormi profundamente.',
      },
      {
        words: [
          { text: 'たのしい', meaning: 'divertido' },
          { text: 'いちにちでした。', meaning: 'foi um dia' },
        ],
        translation: 'Foi um dia divertido.',
      },
      {
        words: [
          { text: 'うみの', meaning: 'do mar' },
          { text: 'ちかくで、', meaning: 'perto,' },
          { text: 'さかなりょうりを', meaning: 'culinária de peixe (+ partícula de objeto)' },
          { text: 'たべました。', meaning: 'comi' },
        ],
        translation: 'Perto do mar, comi um prato de peixe.',
      },
      {
        words: [
          { text: 'すなはまを', meaning: 'a praia de areia (+ partícula de objeto)' },
          { text: 'はだしで', meaning: 'descalço' },
          { text: 'あるきました。', meaning: 'caminhei' },
        ],
        translation: 'Caminhei descalço pela praia.',
      },
      {
        words: [
          { text: 'おみやげに、', meaning: 'como lembrança,' },
          { text: 'かいがらを', meaning: 'conchas (+ partícula de objeto)' },
          { text: 'ひろいました。', meaning: 'peguei' },
        ],
        translation: 'Peguei conchas como lembrança.',
      },
      {
        words: [
          { text: 'また、', meaning: 'de novo,' },
          { text: 'でんしゃで', meaning: 'de trem' },
          { text: 'どこかへ', meaning: 'para algum lugar' },
          { text: 'いきたいです。', meaning: 'quero ir' },
        ],
        translation: 'Quero ir de trem a algum lugar de novo.',
      },
    ],
  },
  {
    id: 'ame-no-nichiyoubi',
    title: 'あめの にちようび',
    level: 1,
    wordCount: 39,
    summaryPt: 'Um domingo chuvoso passado em casa, assistindo filme.',
    lines: [
      {
        words: [
          { text: 'きょうは', meaning: 'hoje' },
          { text: 'にちようびですが、', meaning: 'é domingo, mas' },
          { text: 'あめです。', meaning: 'está chovendo' },
        ],
        translation: 'Hoje é domingo, mas está chovendo.',
      },
      {
        words: [
          { text: 'そとへ', meaning: 'para fora' },
          { text: 'でかけられません。', meaning: 'não posso sair' },
        ],
        translation: 'Não posso sair.',
      },
      {
        words: [
          { text: 'うちで', meaning: 'em casa' },
          { text: 'えいがを', meaning: 'filme (+ partícula de objeto)' },
          { text: 'みることに', meaning: 'a assistir' },
          { text: 'しました。', meaning: 'decidi' },
        ],
        translation: 'Decidi assistir a um filme em casa.',
      },
      {
        words: [
          { text: 'あたたかい', meaning: 'quente' },
          { text: 'おちゃを', meaning: 'chá (+ partícula de objeto)' },
          { text: 'のみながら、', meaning: 'enquanto bebo,' },
          { text: 'みました。', meaning: 'assisti' },
        ],
        translation: 'Assisti enquanto tomava um chá quente.',
      },
      {
        words: [
          { text: 'まどの', meaning: 'da janela' },
          { text: 'そとの', meaning: 'de fora' },
          { text: 'あめの', meaning: 'da chuva' },
          { text: 'おとが', meaning: 'o som (+ partícula de sujeito)' },
          { text: 'すきです。', meaning: 'gosto' },
        ],
        translation: 'Gosto do som da chuva do lado de fora da janela.',
      },
      {
        words: [
          { text: 'こんな', meaning: 'assim, deste tipo' },
          { text: 'ひは、', meaning: 'o dia (é),' },
          { text: 'うちで', meaning: 'em casa' },
          { text: 'のんびり', meaning: 'com calma, relaxadamente' },
          { text: 'します。', meaning: 'faço' },
        ],
        translation: 'Em dias assim, relaxo em casa.',
      },
      {
        words: [
          { text: 'あめの', meaning: 'de chuva' },
          { text: 'ひも、', meaning: 'o dia também,' },
          { text: 'わるくないです。', meaning: 'não é ruim' },
        ],
        translation: 'Um dia de chuva também não é ruim.',
      },
      {
        words: [
          { text: 'えいがの', meaning: 'do filme' },
          { text: 'あとで、', meaning: 'depois,' },
          { text: 'しょうせつを', meaning: 'romance (+ partícula de objeto)' },
          { text: 'よみました。', meaning: 'li' },
        ],
        translation: 'Depois do filme, li um romance.',
      },
      {
        words: [
          { text: 'あめの', meaning: 'de chuva' },
          { text: 'ひは、', meaning: 'no dia,' },
          { text: 'あたまが', meaning: 'a cabeça/mente (+ partícula de sujeito)' },
          { text: 'すっきり', meaning: 'clara' },
          { text: 'します。', meaning: 'fica' },
        ],
        translation: 'Em dias de chuva, minha mente fica mais clara.',
      },
      {
        words: [
          { text: 'あめが', meaning: 'a chuva (+ partícula de sujeito)' },
          { text: 'やんだら、', meaning: 'quando parar,' },
          { text: 'さんぽに', meaning: 'para um passeio' },
          { text: 'いきたいです。', meaning: 'quero ir' },
        ],
        translation: 'Quando a chuva parar, quero sair para passear.',
      },
      {
        words: [
          { text: 'こんな', meaning: 'assim, deste tipo' },
          { text: 'にちようびも、', meaning: 'um domingo também,' },
          { text: 'たまには', meaning: 'de vez em quando' },
          { text: 'いいです。', meaning: 'é bom' },
        ],
        translation: 'Um domingo assim, de vez em quando, também é bom.',
      },
    ],
  },
  {
    id: 'otetsudai',
    title: 'おてつだい',
    level: 1,
    wordCount: 40,
    summaryPt: 'As tarefas domésticas que o narrador ajuda a fazer todo dia.',
    lines: [
      {
        words: [
          { text: 'わたしは', meaning: 'eu' },
          { text: 'まいにち', meaning: 'todo dia' },
          { text: 'うちの', meaning: 'de casa' },
          { text: 'しごとを', meaning: 'tarefa (+ partícula de objeto)' },
          { text: 'てつだいます。', meaning: 'ajudo' },
        ],
        translation: 'Eu ajudo nas tarefas de casa todos os dias.',
      },
      {
        words: [
          { text: 'あさは', meaning: 'de manhã' },
          { text: 'おさらを', meaning: 'os pratos (+ partícula de objeto)' },
          { text: 'あらいます。', meaning: 'lavo' },
        ],
        translation: 'De manhã, lavo os pratos.',
      },
      {
        words: [
          { text: 'ゆうがたは', meaning: 'no fim de tarde' },
          { text: 'いぬの', meaning: 'do cachorro' },
          { text: 'さんぽを', meaning: 'passeio (+ partícula de objeto)' },
          { text: 'します。', meaning: 'faço' },
        ],
        translation: 'No fim da tarde, passeio com o cachorro.',
      },
      {
        words: [
          { text: 'ときどき', meaning: 'às vezes' },
          { text: 'せんたくも', meaning: 'lavagem de roupa também' },
          { text: 'てつだいます。', meaning: 'ajudo' },
        ],
        translation: 'Às vezes, também ajudo a lavar roupa.',
      },
      {
        words: [
          { text: 'ははは', meaning: 'minha mãe' },
          { text: 'いつも', meaning: 'sempre' },
          { text: '「ありがとう」と', meaning: '"obrigada", (+ partícula de citação)' },
          { text: 'いいます。', meaning: 'diz' },
        ],
        translation: 'Minha mãe sempre diz "obrigada".',
      },
      {
        words: [
          { text: 'てつだいを', meaning: 'ajuda (+ partícula de objeto)' },
          { text: 'すると、', meaning: 'quando faço,' },
          { text: 'きもちが', meaning: 'o sentimento (+ partícula de sujeito)' },
          { text: 'いいです。', meaning: 'é bom' },
        ],
        translation: 'Quando ajudo, me sinto bem.',
      },
      {
        words: [
          { text: 'かぞくの', meaning: 'da família' },
          { text: 'ために、', meaning: 'para o bem de, por causa de' },
          { text: 'これからも', meaning: 'de agora em diante também' },
          { text: 'がんばります。', meaning: 'vou me esforçar' },
        ],
        translation: 'Vou continuar me esforçando pela minha família.',
      },
      {
        words: [
          { text: 'りょうりの', meaning: 'de culinária' },
          { text: 'てつだいも', meaning: 'ajuda também' },
          { text: 'すきです。', meaning: 'gosto' },
        ],
        translation: 'Também gosto de ajudar na cozinha.',
      },
      {
        words: [
          { text: 'ははから、', meaning: 'da minha mãe,' },
          { text: 'いろいろ', meaning: 'várias coisas' },
          { text: 'おしえて', meaning: 'ensino' },
          { text: 'もらいます。', meaning: 'recebo, aprendo' },
        ],
        translation: 'Aprendo várias coisas com minha mãe.',
      },
      {
        words: [
          { text: 'じぶんで', meaning: 'por mim mesmo' },
          { text: 'できることが', meaning: 'as coisas que consigo fazer (+ partícula de sujeito)' },
          { text: 'ふえて、', meaning: 'aumentam, e' },
          { text: 'うれしいです。', meaning: 'fico feliz' },
        ],
        translation: 'Fico feliz porque as coisas que consigo fazer sozinho estão aumentando.',
      },
      {
        words: [
          { text: 'おてつだいは、', meaning: 'ajudar em casa,' },
          { text: 'かぞくの', meaning: 'da família' },
          { text: 'きずなを', meaning: 'o laço (+ partícula de objeto)' },
          { text: 'つよく', meaning: 'forte' },
          { text: 'します。', meaning: 'fortalece, faz' },
        ],
        translation: 'Ajudar em casa fortalece os laços da família.',
      },
    ],
  },
  {
    id: 'watashi-no-gakkou',
    title: 'わたしの がっこう',
    level: 1,
    wordCount: 28,
    summaryPt: 'As matérias favoritas do narrador na escola, os amigos da turma e a rotina de provas.',
    lines: [
      {
        words: [
          { text: 'わたしの', meaning: 'minha' },
          { text: 'がっこうは、', meaning: 'a escola,' },
          { text: 'おおきい', meaning: 'grande' },
          { text: 'がっこうです。', meaning: 'é escola' },
        ],
        translation: 'Minha escola é uma escola grande.',
      },
      {
        words: [
          { text: 'まいにち、', meaning: 'todo dia,' },
          { text: 'はちじに', meaning: 'às oito horas' },
          { text: 'じゅぎょうが', meaning: 'a aula (+ partícula de sujeito)' },
          { text: 'はじまります。', meaning: 'começa' },
        ],
        translation: 'Todo dia, a aula começa às oito horas.',
      },
      {
        words: [
          { text: 'すきな', meaning: 'favorita' },
          { text: 'かもくは、', meaning: 'a matéria,' },
          { text: 'すうがくです。', meaning: 'é matemática' },
        ],
        translation: 'Minha matéria favorita é matemática.',
      },
      {
        words: [
          { text: 'れきしも', meaning: 'história também' },
          { text: 'おもしろくて、', meaning: 'é interessante, e' },
          { text: 'すきです。', meaning: 'gosto' },
        ],
        translation: 'História também é interessante, e eu gosto.',
      },
      {
        words: [
          { text: 'クラスに、', meaning: 'na turma,' },
          { text: 'なかの いい', meaning: 'íntimos, que se dão bem' },
          { text: 'ともだちが', meaning: 'amigos (+ partícula de sujeito)' },
          { text: 'います。', meaning: 'há, tenho' },
        ],
        translation: 'Na turma, tenho amigos íntimos.',
      },
      {
        words: [
          { text: 'きゅうけいじかんは、', meaning: 'no intervalo,' },
          { text: 'みんなで', meaning: 'todos juntos' },
          { text: 'はなします。', meaning: 'conversamos' },
        ],
        translation: 'No intervalo, todos conversamos juntos.',
      },
      {
        words: [
          { text: 'せんせいは、', meaning: 'o professor,' },
          { text: 'きびしいですが、', meaning: 'é rigoroso, mas' },
          { text: 'しんせつです。', meaning: 'é gentil' },
        ],
        translation: 'O professor é rigoroso, mas gentil.',
      },
      {
        words: [
          { text: 'しゅくだいは、', meaning: 'o dever de casa,' },
          { text: 'まいばん', meaning: 'toda noite' },
          { text: 'します。', meaning: 'faço' },
        ],
        translation: 'Faço o dever de casa toda noite.',
      },
      {
        words: [
          { text: 'きんようびは、', meaning: 'na sexta-feira,' },
          { text: 'テストが', meaning: 'prova (+ partícula de sujeito)' },
          { text: 'あります。', meaning: 'há' },
        ],
        translation: 'Na sexta-feira, tem prova.',
      },
      {
        words: [
          { text: 'テストの', meaning: 'da prova' },
          { text: 'まえは、', meaning: 'antes,' },
          { text: 'としょかんで', meaning: 'na biblioteca' },
          { text: 'べんきょうします。', meaning: 'estudo' },
        ],
        translation: 'Antes da prova, estudo na biblioteca.',
      },
      {
        words: [
          { text: 'がっこうせいかつは、', meaning: 'a vida escolar,' },
          { text: 'たのしいです。', meaning: 'é divertida' },
        ],
        translation: 'A vida escolar é divertida.',
      },
    ],
  },
  {
    id: 'supootsu-ga-suki',
    title: 'スポーツが すき',
    level: 1,
    wordCount: 30,
    summaryPt: 'A paixão do narrador pelo futebol e os treinos com o time da escola.',
    lines: [
      {
        words: [
          { text: 'わたしは、', meaning: 'eu,' },
          { text: 'スポーツが', meaning: 'esporte (+ partícula de sujeito)' },
          { text: 'だいすきです。', meaning: 'amo' },
        ],
        translation: 'Eu amo esportes.',
      },
      {
        words: [
          { text: 'とくに、', meaning: 'especialmente,' },
          { text: 'サッカーが', meaning: 'futebol (+ partícula de sujeito)' },
          { text: 'すきです。', meaning: 'gosto' },
        ],
        translation: 'Especialmente, gosto de futebol.',
      },
      {
        words: [
          { text: 'しゅうに', meaning: 'por semana' },
          { text: 'にかい、', meaning: 'duas vezes,' },
          { text: 'れんしゅうが', meaning: 'treino (+ partícula de sujeito)' },
          { text: 'あります。', meaning: 'há' },
        ],
        translation: 'Por semana, tem treino duas vezes.',
      },
      {
        words: [
          { text: 'チームの', meaning: 'do time' },
          { text: 'みんなと、', meaning: 'com todos,' },
          { text: 'いっしょに', meaning: 'juntos' },
          { text: 'はしります。', meaning: 'corro' },
        ],
        translation: 'Corro junto com todo o time.',
      },
      {
        words: [
          { text: 'れんしゅうは、', meaning: 'o treino,' },
          { text: 'たいへんですが、', meaning: 'é puxado, mas' },
          { text: 'たのしいです。', meaning: 'é divertido' },
        ],
        translation: 'O treino é puxado, mas divertido.',
      },
      {
        words: [
          { text: 'しあいの', meaning: 'de jogo' },
          { text: 'ひは、', meaning: 'no dia,' },
          { text: 'すこし', meaning: 'um pouco' },
          { text: 'きんちょうします。', meaning: 'fico nervoso' },
        ],
        translation: 'No dia do jogo, fico um pouco nervoso.',
      },
      {
        words: [
          { text: 'せんしゅう、', meaning: 'semana passada,' },
          { text: 'しあいに', meaning: 'no jogo' },
          { text: 'かちました。', meaning: 'ganhamos' },
        ],
        translation: 'Semana passada, ganhamos o jogo.',
      },
      {
        words: [
          { text: 'みんなで、', meaning: 'todos juntos,' },
          { text: 'とても', meaning: 'muito' },
          { text: 'よろこびました。', meaning: 'ficamos felizes' },
        ],
        translation: 'Todos juntos, ficamos muito felizes.',
      },
      {
        words: [
          { text: 'コーチは、', meaning: 'o técnico,' },
          { text: 'いつも', meaning: 'sempre' },
          { text: 'おうえんして', meaning: 'apoiando' },
          { text: 'くれます。', meaning: 'nos dá, faz por nós' },
        ],
        translation: 'O técnico sempre nos incentiva.',
      },
      {
        words: [
          { text: 'スポーツを', meaning: 'esporte (+ partícula de objeto)' },
          { text: 'すると、', meaning: 'quando faço,' },
          { text: 'げんきに', meaning: 'com energia' },
          { text: 'なります。', meaning: 'fico' },
        ],
        translation: 'Quando faço esporte, fico cheio de energia.',
      },
      {
        words: [
          { text: 'これからも、', meaning: 'de agora em diante também,' },
          { text: 'サッカーを', meaning: 'futebol (+ partícula de objeto)' },
          { text: 'つづけたいです。', meaning: 'quero continuar' },
        ],
        translation: 'Quero continuar jogando futebol de agora em diante.',
      },
    ],
  },
  {
    id: 'byouki-no-hi',
    title: 'びょうきの ひ',
    level: 1,
    wordCount: 26,
    summaryPt: 'Um dia em que o narrador ficou doente, descansou e foi cuidado pela família.',
    lines: [
      {
        words: [
          { text: 'きのうから、', meaning: 'desde ontem,' },
          { text: 'のどが', meaning: 'a garganta (+ partícula de sujeito)' },
          { text: 'いたいです。', meaning: 'dói' },
        ],
        translation: 'Desde ontem, minha garganta dói.',
      },
      {
        words: [
          { text: 'けさ、', meaning: 'esta manhã,' },
          { text: 'ねつを', meaning: 'a febre (+ partícula de objeto)' },
          { text: 'はかりました。', meaning: 'medi' },
        ],
        translation: 'Esta manhã, medi a febre.',
      },
      {
        words: [
          { text: 'さんじゅうはちどでした。', meaning: 'estava trinta e oito graus' },
        ],
        translation: 'Estava com 38 graus.',
      },
      {
        words: [
          { text: 'がっこうを', meaning: 'a escola (+ partícula de objeto)' },
          { text: 'やすむことに', meaning: 'a faltar' },
          { text: 'しました。', meaning: 'decidi' },
        ],
        translation: 'Decidi faltar à escola.',
      },
      {
        words: [
          { text: 'ははが、', meaning: 'minha mãe,' },
          { text: 'おかゆを', meaning: 'mingau de arroz (+ partícula de objeto)' },
          { text: 'つくって', meaning: 'fazendo' },
          { text: 'くれました。', meaning: 'fez para mim' },
        ],
        translation: 'Minha mãe fez mingau para mim.',
      },
      {
        words: [
          { text: 'くすりを', meaning: 'remédio (+ partícula de objeto)' },
          { text: 'のんで、', meaning: 'tomei, e' },
          { text: 'ねました。', meaning: 'dormi' },
        ],
        translation: 'Tomei remédio e dormi.',
      },
      {
        words: [
          { text: 'いちにちじゅう、', meaning: 'o dia todo,' },
          { text: 'ベッドに', meaning: 'na cama' },
          { text: 'いました。', meaning: 'fiquei' },
        ],
        translation: 'Fiquei na cama o dia todo.',
      },
      {
        words: [
          { text: 'ゆうがた、', meaning: 'no fim da tarde,' },
          { text: 'すこし', meaning: 'um pouco' },
          { text: 'げんきに', meaning: 'melhor' },
          { text: 'なりました。', meaning: 'fiquei' },
        ],
        translation: 'No fim da tarde, melhorei um pouco.',
      },
      {
        words: [
          { text: 'ともだちが、', meaning: 'um amigo,' },
          { text: 'メールを', meaning: 'mensagem (+ partícula de objeto)' },
          { text: 'くれました。', meaning: 'me mandou' },
        ],
        translation: 'Um amigo me mandou uma mensagem.',
      },
      {
        words: [
          { text: 'からだが', meaning: 'o corpo, a saúde (+ partícula de sujeito)' },
          { text: 'たいせつだと、', meaning: 'que é importante,' },
          { text: 'わかりました。', meaning: 'entendi' },
        ],
        translation: 'Entendi que a saúde é importante.',
      },
      {
        words: [
          { text: 'あしたは、', meaning: 'amanhã,' },
          { text: 'きっと', meaning: 'com certeza' },
          { text: 'よく', meaning: 'melhor' },
          { text: 'なります。', meaning: 'vou ficar' },
        ],
        translation: 'Amanhã, com certeza vou melhorar.',
      },
    ],
  },
  {
    id: 'fuku-wo-kai-ni-iku',
    title: 'ふくを かいに いく',
    level: 1,
    wordCount: 30,
    summaryPt: 'Uma tarde comprando roupas novas com uma amiga, do provador à conta final.',
    lines: [
      {
        words: [
          { text: 'きょう、', meaning: 'hoje,' },
          { text: 'ともだちと', meaning: 'com uma amiga' },
          { text: 'ふくを', meaning: 'roupa (+ partícula de objeto)' },
          { text: 'かいに', meaning: 'para comprar' },
          { text: 'いきました。', meaning: 'fui' },
        ],
        translation: 'Hoje, fui comprar roupas com uma amiga.',
      },
      {
        words: [
          { text: 'デパートには、', meaning: 'no shopping,' },
          { text: 'いろいろな', meaning: 'vários' },
          { text: 'みせが', meaning: 'lojas (+ partícula de sujeito)' },
          { text: 'あります。', meaning: 'há' },
        ],
        translation: 'No shopping, tem várias lojas.',
      },
      {
        words: [
          { text: 'あたらしい', meaning: 'nova' },
          { text: 'スカートを', meaning: 'saia (+ partícula de objeto)' },
          { text: 'みつけました。', meaning: 'encontrei' },
        ],
        translation: 'Encontrei uma saia nova.',
      },
      {
        words: [
          { text: 'しちゃくしつで、', meaning: 'no provador,' },
          { text: 'きて', meaning: 'vestindo' },
          { text: 'みました。', meaning: 'experimentei' },
        ],
        translation: 'No provador, experimentei vestir.',
      },
      {
        words: [
          { text: 'サイズが', meaning: 'o tamanho (+ partícula de sujeito)' },
          { text: 'ちょうど', meaning: 'justamente' },
          { text: 'よかったです。', meaning: 'estava bom' },
        ],
        translation: 'O tamanho estava certinho.',
      },
      {
        words: [
          { text: 'いろは、', meaning: 'a cor,' },
          { text: 'あおと', meaning: 'azul e' },
          { text: 'しろが', meaning: 'branco (+ partícula de sujeito)' },
          { text: 'ありました。', meaning: 'tinha' },
        ],
        translation: 'Tinha nas cores azul e branco.',
      },
      {
        words: [
          { text: 'すこし', meaning: 'um pouco' },
          { text: 'なやんで、', meaning: 'fiquei em dúvida, e' },
          { text: 'あおいのを', meaning: 'a azul (+ partícula de objeto)' },
          { text: 'えらびました。', meaning: 'escolhi' },
        ],
        translation: 'Fiquei um pouco em dúvida e escolhi a azul.',
      },
      {
        words: [
          { text: 'レジで、', meaning: 'no caixa,' },
          { text: 'おかねを', meaning: 'dinheiro (+ partícula de objeto)' },
          { text: 'はらいました。', meaning: 'paguei' },
        ],
        translation: 'No caixa, paguei.',
      },
      {
        words: [
          { text: 'セールで、', meaning: 'por estar em promoção,' },
          { text: 'やすく', meaning: 'barato' },
          { text: 'かえました。', meaning: 'consegui comprar' },
        ],
        translation: 'Estava em promoção e consegui comprar barato.',
      },
      {
        words: [
          { text: 'ともだちも、', meaning: 'minha amiga também,' },
          { text: 'くつを', meaning: 'sapato (+ partícula de objeto)' },
          { text: 'かいました。', meaning: 'comprou' },
        ],
        translation: 'Minha amiga também comprou um sapato.',
      },
      {
        words: [
          { text: 'たのしい', meaning: 'divertido' },
          { text: 'かいものの', meaning: 'de compras' },
          { text: 'じかんでした。', meaning: 'foi um momento' },
        ],
        translation: 'Foi um momento divertido de fazer compras.',
      },
    ],
  },
  {
    id: 'ongaku-ga-suki',
    title: 'おんがくが すき',
    level: 1,
    wordCount: 30,
    summaryPt: 'A paixão do narrador por música, tocando piano e ouvindo diferentes estilos.',
    lines: [
      {
        words: [
          { text: 'わたしは、', meaning: 'eu,' },
          { text: 'おんがくが', meaning: 'música (+ partícula de sujeito)' },
          { text: 'だいすきです。', meaning: 'amo' },
        ],
        translation: 'Eu amo música.',
      },
      {
        words: [
          { text: 'ちいさい', meaning: 'pequeno' },
          { text: 'ときから、', meaning: 'desde quando era,' },
          { text: 'ピアノを', meaning: 'piano (+ partícula de objeto)' },
          { text: 'ひいています。', meaning: 'toco' },
        ],
        translation: 'Toco piano desde que era pequeno.',
      },
      {
        words: [
          { text: 'まいにち、', meaning: 'todo dia,' },
          { text: 'いちじかん', meaning: 'uma hora' },
          { text: 'れんしゅうします。', meaning: 'pratico' },
        ],
        translation: 'Todo dia, pratico uma hora.',
      },
      {
        words: [
          { text: 'クラシックも', meaning: 'clássico também' },
          { text: 'ポップスも', meaning: 'pop também' },
          { text: 'すきです。', meaning: 'gosto' },
        ],
        translation: 'Gosto tanto de clássico quanto de pop.',
      },
      {
        words: [
          { text: 'でんしゃの', meaning: 'do trem' },
          { text: 'なかで、', meaning: 'dentro,' },
          { text: 'おんがくを', meaning: 'música (+ partícula de objeto)' },
          { text: 'ききます。', meaning: 'escuto' },
        ],
        translation: 'Escuto música dentro do trem.',
      },
      {
        words: [
          { text: 'すきな', meaning: 'favorita' },
          { text: 'きょくを', meaning: 'música, canção (+ partícula de objeto)' },
          { text: 'きくと、', meaning: 'quando escuto,' },
          { text: 'げんきに', meaning: 'animado' },
          { text: 'なります。', meaning: 'fico' },
        ],
        translation: 'Quando escuto minha música favorita, fico animado.',
      },
      {
        words: [
          { text: 'がっこうの', meaning: 'da escola' },
          { text: 'コンサートで、', meaning: 'no concerto,' },
          { text: 'ひきました。', meaning: 'toquei' },
        ],
        translation: 'Toquei no concerto da escola.',
      },
      {
        words: [
          { text: 'すこし', meaning: 'um pouco' },
          { text: 'きんちょうしましたが、', meaning: 'fiquei nervoso, mas' },
          { text: 'うまく', meaning: 'bem' },
          { text: 'できました。', meaning: 'consegui fazer' },
        ],
        translation: 'Fiquei um pouco nervoso, mas consegui fazer bem.',
      },
      {
        words: [
          { text: 'みんなが、', meaning: 'todos,' },
          { text: 'はくしゅを', meaning: 'palmas (+ partícula de objeto)' },
          { text: 'して', meaning: 'fazendo' },
          { text: 'くれました。', meaning: 'me deram' },
        ],
        translation: 'Todos me deram palmas.',
      },
      {
        words: [
          { text: 'しょうらい、', meaning: 'no futuro,' },
          { text: 'おんがくの', meaning: 'de música' },
          { text: 'しごとを', meaning: 'trabalho (+ partícula de objeto)' },
          { text: 'したいです。', meaning: 'quero fazer' },
        ],
        translation: 'No futuro, quero trabalhar com música.',
      },
      {
        words: [
          { text: 'おんがくは、', meaning: 'a música,' },
          { text: 'わたしの', meaning: 'minha' },
          { text: 'じんせいの', meaning: 'de vida' },
          { text: 'ぶぶんです。', meaning: 'é parte' },
        ],
        translation: 'A música é parte da minha vida.',
      },
    ],
  },

  // ---------------------------------------------------------------------
  // Nível 2 — kanji comuns com furigana
  // ---------------------------------------------------------------------
  {
    id: 'shumatsu-sanpo',
    title: 'しゅうまつの さんぽ',
    level: 2,
    wordCount: 61,
    summaryPt: 'Um passeio de fim de semana num parque florido, observando crianças brincarem.',
    lines: [
      {
        words: [
          { text: '今日は', reading: 'きょうは', meaning: 'hoje (+ partícula de tópico)' },
          { text: '天気が', reading: 'てんきが', meaning: 'o tempo/clima (+ partícula de sujeito)' },
          { text: 'いいです。', meaning: 'está bom' },
        ],
        translation: 'Hoje o tempo está bom.',
      },
      {
        words: [
          { text: '私は', reading: 'わたしは', meaning: 'eu (+ partícula de tópico)' },
          { text: '公園へ', reading: 'こうえんへ', meaning: 'para o parque' },
          { text: '行きました。', reading: 'いきました。', meaning: 'fui' },
        ],
        translation: 'Eu fui ao parque.',
      },
      {
        words: [
          { text: '公園には', reading: 'こうえんには', meaning: 'no parque' },
          { text: '花が', reading: 'はなが', meaning: 'flor (+ partícula de sujeito)' },
          { text: 'たくさん', meaning: 'muitas, bastante' },
          { text: 'さいていました。', meaning: 'estavam desabrochando' },
        ],
        translation: 'No parque, havia muitas flores desabrochando.',
      },
      {
        words: [
          { text: '川の', reading: 'かわの', meaning: 'do rio' },
          { text: '近くを', reading: 'ちかくを', meaning: 'as proximidades (+ partícula de trajeto)' },
          { text: '歩きました。', reading: 'あるきました。', meaning: 'caminhei' },
        ],
        translation: 'Caminhei perto do rio.',
      },
      {
        words: [
          { text: '小さい', reading: 'ちいさい', meaning: 'pequeno' },
          { text: '子供たちが', reading: 'こどもたちが', meaning: 'as crianças (+ partícula de sujeito)' },
          { text: '走っていました。', reading: 'はしっていました。', meaning: 'estavam correndo' },
        ],
        translation: 'Crianças pequenas estavam correndo.',
      },
      {
        words: [
          { text: '私も', reading: 'わたしも', meaning: 'eu também' },
          { text: '少し', reading: 'すこし', meaning: 'um pouco' },
          { text: '走りました。', reading: 'はしりました。', meaning: 'corri' },
        ],
        translation: 'Eu também corri um pouco.',
      },
      {
        words: [
          { text: 'とても', meaning: 'muito' },
          { text: '楽しかったです。', reading: 'たのしかったです。', meaning: 'foi divertido' },
        ],
        translation: 'Foi muito divertido.',
      },
      {
        words: [
          { text: '来週も', reading: 'らいしゅうも', meaning: 'semana que vem também' },
          { text: 'また', meaning: 'de novo' },
          { text: '行きたいです。', reading: 'いきたいです。', meaning: 'quero ir' },
        ],
        translation: 'Quero ir de novo semana que vem também.',
      },
      {
        words: [
          { text: '公園の', reading: 'こうえんの', meaning: 'do parque' },
          { text: '近くで、', reading: 'ちかくで、', meaning: 'perto,' },
          { text: 'アイスクリームを', meaning: 'sorvete (+ partícula de objeto)' },
          { text: '買いました。', reading: 'かいました。', meaning: 'comprei' },
        ],
        translation: 'Perto do parque, comprei um sorvete.',
      },
      {
        words: [
          { text: 'ベンチに', meaning: 'no banco' },
          { text: '座って、', reading: 'すわって、', meaning: 'sentei, e' },
          { text: '少し', reading: 'すこし', meaning: 'um pouco' },
          { text: '休みました。', reading: 'やすみました。', meaning: 'descansei' },
        ],
        translation: 'Sentei no banco e descansei um pouco.',
      },
      {
        words: [
          { text: '鳥に', reading: 'とりに', meaning: 'para os pássaros' },
          { text: 'パンを', meaning: 'pão (+ partícula de objeto)' },
          { text: 'あげている', meaning: 'dando' },
          { text: '人も', reading: 'ひとも', meaning: 'pessoas também' },
          { text: 'いました。', meaning: 'havia' },
        ],
        translation: 'Também tinha gente dando pão para os pássaros.',
      },
      {
        words: [
          { text: '今度は、', reading: 'こんどは、', meaning: 'da próxima vez,' },
          { text: '友達も', reading: 'ともだちも', meaning: 'amigos também' },
          { text: '誘いたいです。', reading: 'さそいたいです。', meaning: 'quero convidar' },
        ],
        translation: 'Da próxima vez, quero convidar meus amigos também.',
      },
    ],
  },
  {
    id: 'tomodachi-tegami',
    title: 'ともだちへの てがみ',
    level: 2,
    wordCount: 63,
    summaryPt: 'Uma carta contando as novidades do trabalho e combinando um encontro.',
    lines: [
      {
        words: [
          { text: '田中さん、', reading: 'たなかさん、', meaning: 'Tanaka (+ sufixo honorífico),' },
          { text: 'お元気ですか。', reading: 'おげんきですか。', meaning: 'como vai?' },
        ],
        translation: 'Tanaka, como vai você?',
      },
      {
        words: [
          { text: '私は', reading: 'わたしは', meaning: 'eu' },
          { text: '元気です。', reading: 'げんきです。', meaning: 'estou bem' },
        ],
        translation: 'Eu estou bem.',
      },
      {
        words: [
          { text: '今、', reading: 'いま、', meaning: 'agora,' },
          { text: '新しい', reading: 'あたらしい', meaning: 'novo' },
          { text: '会社で', reading: 'かいしゃで', meaning: 'numa empresa' },
          { text: '働いています。', reading: 'はたらいています。', meaning: 'estou trabalhando' },
        ],
        translation: 'Agora estou trabalhando numa empresa nova.',
      },
      {
        words: [
          { text: '仕事は', reading: 'しごとは', meaning: 'o trabalho' },
          { text: '大変ですが、', reading: 'たいへんですが、', meaning: 'é puxado, mas' },
          { text: '楽しいです。', reading: 'たのしいです。', meaning: 'é divertido' },
        ],
        translation: 'O trabalho é puxado, mas é divertido.',
      },
      {
        words: [
          { text: '会社の', reading: 'かいしゃの', meaning: 'da empresa' },
          { text: '人たちは', reading: 'ひとたちは', meaning: 'as pessoas' },
          { text: 'とても', meaning: 'muito' },
          { text: '親切です。', reading: 'しんせつです。', meaning: 'são gentis' },
        ],
        translation: 'As pessoas da empresa são muito gentis.',
      },
      {
        words: [
          { text: '来月、', reading: 'らいげつ、', meaning: 'mês que vem,' },
          { text: '日本へ', reading: 'にほんへ', meaning: 'para o Japão' },
          { text: '行きます。', reading: 'いきます。', meaning: 'vou' },
        ],
        translation: 'Mês que vem, vou ao Japão.',
      },
      {
        words: [
          { text: 'その時、', reading: 'そのとき、', meaning: 'nessa hora,' },
          { text: '一緒に', reading: 'いっしょに', meaning: 'juntos' },
          { text: '会いましょう。', reading: 'あいましょう。', meaning: 'vamos nos encontrar' },
        ],
        translation: 'Nessa hora, vamos nos encontrar.',
      },
      {
        words: [
          { text: '返事を', reading: 'へんじを', meaning: 'a resposta (+ partícula de objeto)' },
          { text: '待っています。', reading: 'まっています。', meaning: 'estou esperando' },
        ],
        translation: 'Estou esperando sua resposta.',
      },
      {
        words: [
          { text: '最近、', reading: 'さいきん、', meaning: 'recentemente,' },
          { text: '料理も', reading: 'りょうりも', meaning: 'culinária também' },
          { text: '始めました。', reading: 'はじめました。', meaning: 'comecei' },
        ],
        translation: 'Recentemente, também comecei a cozinhar.',
      },
      {
        words: [
          { text: 'まだ', meaning: 'ainda' },
          { text: '上手じゃないですが、', reading: 'じょうずじゃないですが、', meaning: 'não sou bom nisso ainda, mas' },
          { text: '楽しいです。', reading: 'たのしいです。', meaning: 'é divertido' },
        ],
        translation: 'Ainda não sou bom nisso, mas é divertido.',
      },
      {
        words: [
          { text: '日本に', reading: 'にほんに', meaning: 'no Japão' },
          { text: '着いたら、', reading: 'ついたら、', meaning: 'quando chegar,' },
          { text: '一緒に', reading: 'いっしょに', meaning: 'juntos' },
          { text: '料理しましょう。', reading: 'りょうりしましょう。', meaning: 'vamos cozinhar' },
        ],
        translation: 'Quando eu chegar no Japão, vamos cozinhar juntos.',
      },
      {
        words: [
          { text: 'それでは、', meaning: 'bem, então,' },
          { text: '体に', reading: 'からだに', meaning: 'com o corpo, a saúde' },
          { text: '気をつけて。', reading: 'きをつけて。', meaning: 'se cuide' },
        ],
        translation: 'Bem, então — se cuide.',
      },
    ],
  },
  {
    id: 'ame-no-hi',
    title: 'あめの ひ',
    level: 2,
    wordCount: 64,
    summaryPt: 'Um dia chuvoso a caminho do trabalho, e por que a chuva também tem seu charme.',
    lines: [
      {
        words: [
          { text: '今朝から', reading: 'けさから', meaning: 'desde esta manhã' },
          { text: '雨が', reading: 'あめが', meaning: 'chuva (+ partícula de sujeito)' },
          { text: '降っています。', reading: 'ふっています。', meaning: 'está chovendo' },
        ],
        translation: 'Está chovendo desde esta manhã.',
      },
      {
        words: [
          { text: '空は', reading: 'そらは', meaning: 'o céu' },
          { text: '暗くて、', reading: 'くらくて、', meaning: 'está escuro, e' },
          { text: '風も', reading: 'かぜも', meaning: 'o vento também' },
          { text: '強いです。', reading: 'つよいです。', meaning: 'está forte' },
        ],
        translation: 'O céu está escuro, e o vento também está forte.',
      },
      {
        words: [
          { text: '傘を', reading: 'かさを', meaning: 'guarda-chuva (+ partícula de objeto)' },
          { text: '持って、', reading: 'もって、', meaning: 'levando, e' },
          { text: '駅まで', reading: 'えきまで', meaning: 'até a estação' },
          { text: '歩きました。', reading: 'あるきました。', meaning: 'caminhei' },
        ],
        translation: 'Levei um guarda-chuva e caminhei até a estação.',
      },
      {
        words: [
          { text: '電車は', reading: 'でんしゃは', meaning: 'o trem' },
          { text: 'いつもより', meaning: 'mais que o normal' },
          { text: '混んでいました。', reading: 'こんでいました。', meaning: 'estava lotado' },
        ],
        translation: 'O trem estava mais lotado que o normal.',
      },
      {
        words: [
          { text: '会社に', reading: 'かいしゃに', meaning: 'na empresa' },
          { text: '着いた時、', reading: 'ついたとき、', meaning: 'quando cheguei,' },
          { text: '服が', reading: 'ふくが', meaning: 'as roupas' },
          { text: '少し', reading: 'すこし', meaning: 'um pouco' },
          { text: '濡れていました。', reading: 'ぬれていました。', meaning: 'estavam molhadas' },
        ],
        translation: 'Quando cheguei à empresa, minhas roupas estavam um pouco molhadas.',
      },
      {
        words: [
          { text: '雨の日は', reading: 'あめのひは', meaning: 'dias chuvosos' },
          { text: 'あまり', meaning: 'não muito (+ negativo)' },
          { text: '好きじゃありません。', reading: 'すきじゃありません。', meaning: 'não gosto' },
        ],
        translation: 'Não gosto muito de dias chuvosos.',
      },
      {
        words: [
          { text: 'でも、', meaning: 'mas,' },
          { text: '雨の', reading: 'あめの', meaning: 'da chuva' },
          { text: '音を', reading: 'おとを', meaning: 'o som (+ partícula de objeto)' },
          { text: '聞くのは', reading: 'きくのは', meaning: 'ouvir (é)' },
          { text: '好きです。', reading: 'すきです。', meaning: 'eu gosto' },
        ],
        translation: 'Mas gosto de ouvir o som da chuva.',
      },
      {
        words: [
          { text: '明日は', reading: 'あしたは', meaning: 'amanhã' },
          { text: '晴れると', reading: 'はれると', meaning: 'se ficar ensolarado' },
          { text: 'いいですね。', meaning: 'seria bom, né' },
        ],
        translation: 'Seria bom se amanhã fizesse sol, né.',
      },
      {
        words: [
          { text: '会社では、', reading: 'かいしゃでは、', meaning: 'na empresa,' },
          { text: '濡れた', reading: 'ぬれた', meaning: 'molhadas' },
          { text: '服を', reading: 'ふくを', meaning: 'roupas (+ partícula de objeto)' },
          { text: '拭きました。', reading: 'ふきました。', meaning: 'sequei' },
        ],
        translation: 'Na empresa, sequei as roupas molhadas.',
      },
      {
        words: [
          { text: '同僚も', reading: 'どうりょうも', meaning: 'os colegas também' },
          { text: 'みんな、', meaning: 'todos,' },
          { text: '傘を', reading: 'かさを', meaning: 'guarda-chuva (+ partícula de objeto)' },
          { text: '持っていました。', reading: 'もっていました。', meaning: 'estavam com' },
        ],
        translation: 'Os colegas também estavam todos com guarda-chuva.',
      },
      {
        words: [
          { text: '雨の', reading: 'あめの', meaning: 'de chuva' },
          { text: '日は、', reading: 'ひは、', meaning: 'nos dias,' },
          { text: '電車が', reading: 'でんしゃが', meaning: 'o trem (+ partícula de sujeito)' },
          { text: 'いつも', meaning: 'sempre' },
          { text: '遅れます。', reading: 'おくれます。', meaning: 'atrasa' },
        ],
        translation: 'Em dias de chuva, o trem sempre atrasa.',
      },
      {
        words: [
          { text: '早く', reading: 'はやく', meaning: 'logo' },
          { text: '晴れの日に', reading: 'はれのひに', meaning: 'num dia de sol' },
          { text: 'なってほしいです。', meaning: 'quero que fique' },
        ],
        translation: 'Quero que logo venha um dia de sol.',
      },
    ],
  },
  {
    id: 'kyoto-ryokou',
    title: 'きょうと りょこう',
    level: 2,
    wordCount: 57,
    summaryPt: 'Uma viagem de trem-bala a Kyoto para visitar templos antigos e experimentar a culinária local.',
    lines: [
      {
        words: [
          { text: '先週、', reading: 'せんしゅう、', meaning: 'semana passada,' },
          { text: '京都へ', reading: 'きょうとへ', meaning: 'para Kyoto' },
          { text: '旅行に', reading: 'りょこうに', meaning: 'em viagem' },
          { text: '行きました。', reading: 'いきました。', meaning: 'fui' },
        ],
        translation: 'Semana passada, fiz uma viagem a Kyoto.',
      },
      {
        words: [
          { text: '新幹線で', reading: 'しんかんせんで', meaning: 'de trem-bala' },
          { text: '二時間ぐらい', reading: 'にじかんぐらい', meaning: 'cerca de duas horas' },
          { text: 'かかりました。', meaning: 'levou (tempo)' },
        ],
        translation: 'Levou cerca de duas horas de trem-bala.',
      },
      {
        words: [
          { text: '古い', reading: 'ふるい', meaning: 'antigos' },
          { text: 'お寺を', reading: 'おてらを', meaning: 'templos (+ partícula de objeto)' },
          { text: 'たくさん', meaning: 'muitos' },
          { text: '見ました。', reading: 'みました。', meaning: 'vi' },
        ],
        translation: 'Vi muitos templos antigos.',
      },
      {
        words: [
          { text: '有名な', reading: 'ゆうめいな', meaning: 'famoso' },
          { text: '神社にも', reading: 'じんじゃにも', meaning: 'ao santuário também' },
          { text: '行きました。', reading: 'いきました。', meaning: 'fui' },
        ],
        translation: 'Também fui a um santuário famoso.',
      },
      {
        words: [
          { text: 'お土産に', reading: 'おみやげに', meaning: 'como lembrancinha' },
          { text: '抹茶のお菓子を', reading: 'まっちゃのおかしを', meaning: 'doce de chá verde (+ partícula de objeto)' },
          { text: '買いました。', reading: 'かいました。', meaning: 'comprei' },
        ],
        translation: 'Comprei doces de chá verde como lembrancinha.',
      },
      {
        words: [
          { text: '夜は', reading: 'よるは', meaning: 'à noite' },
          { text: '京都の', reading: 'きょうとの', meaning: 'de Kyoto' },
          { text: '料理を', reading: 'りょうりを', meaning: 'a culinária (+ partícula de objeto)' },
          { text: '食べました。', reading: 'たべました。', meaning: 'comi' },
        ],
        translation: 'À noite, comi a culinária de Kyoto.',
      },
      {
        words: [
          { text: 'とても', meaning: 'muito' },
          { text: '静かで、', reading: 'しずかで、', meaning: 'era tranquilo, e' },
          { text: 'きれいな', meaning: 'bonita' },
          { text: '町でした。', reading: 'まちでした。', meaning: 'era uma cidade' },
        ],
        translation: 'Era uma cidade muito tranquila e bonita.',
      },
      {
        words: [
          { text: 'また', meaning: 'de novo' },
          { text: '京都へ', reading: 'きょうとへ', meaning: 'para Kyoto' },
          { text: '行きたいです。', reading: 'いきたいです。', meaning: 'quero ir' },
        ],
        translation: 'Quero ir a Kyoto de novo.',
      },
      {
        words: [
          { text: 'バスで、', meaning: 'de ônibus,' },
          { text: '色々な', reading: 'いろいろな', meaning: 'vários' },
          { text: 'お寺を', reading: 'おてらを', meaning: 'templos (+ partícula de objeto)' },
          { text: '回りました。', reading: 'まわりました。', meaning: 'visitei' },
        ],
        translation: 'De ônibus, visitei vários templos.',
      },
      {
        words: [
          { text: '竹林を', reading: 'ちくりんを', meaning: 'floresta de bambu (+ partícula de objeto)' },
          { text: '歩いた時、', reading: 'あるいたとき、', meaning: 'quando caminhei,' },
          { text: 'とても', meaning: 'muito' },
          { text: '静かでした。', reading: 'しずかでした。', meaning: 'estava silencioso' },
        ],
        translation: 'Quando caminhei pela floresta de bambu, estava muito silencioso.',
      },
      {
        words: [
          { text: '着物を', reading: 'きものを', meaning: 'quimono (+ partícula de objeto)' },
          { text: '着て、', reading: 'きて、', meaning: 'vestindo, e' },
          { text: '写真も', reading: 'しゃしんも', meaning: 'fotos também' },
          { text: '撮りました。', reading: 'とりました。', meaning: 'tirei' },
        ],
        translation: 'Vesti um quimono e também tirei fotos.',
      },
      {
        words: [
          { text: '京都の', reading: 'きょうとの', meaning: 'de Kyoto' },
          { text: '旅は、', reading: 'たびは、', meaning: 'a viagem,' },
          { text: '忘れられない', reading: 'わすれられない', meaning: 'inesquecível' },
          { text: '思い出に', reading: 'おもいでに', meaning: 'em lembrança' },
          { text: 'なりました。', meaning: 'virou' },
        ],
        translation: 'A viagem a Kyoto virou uma lembrança inesquecível.',
      },
    ],
  },
  {
    id: 'tanjoubi-party',
    title: 'たんじょうび パーティー',
    level: 2,
    wordCount: 53,
    summaryPt: 'Uma festa de aniversário em família, com bolo, música e um presente especial.',
    lines: [
      {
        words: [
          { text: '今日は', reading: 'きょうは', meaning: 'hoje' },
          { text: '妹の', reading: 'いもうとの', meaning: 'da minha irmã mais nova' },
          { text: '誕生日です。', reading: 'たんじょうびです。', meaning: 'é aniversário' },
        ],
        translation: 'Hoje é o aniversário da minha irmã mais nova.',
      },
      {
        words: [
          { text: '家族と', reading: 'かぞくと', meaning: 'com a família' },
          { text: '一緒に', reading: 'いっしょに', meaning: 'juntos' },
          { text: 'パーティーを', meaning: 'a festa (+ partícula de objeto)' },
          { text: 'しました。', meaning: 'fizemos' },
        ],
        translation: 'Fizemos uma festa junto com a família.',
      },
      {
        words: [
          { text: '大きい', reading: 'おおきい', meaning: 'grande' },
          { text: 'ケーキを', meaning: 'bolo (+ partícula de objeto)' },
          { text: '買いました。', reading: 'かいました。', meaning: 'compramos' },
        ],
        translation: 'Compramos um bolo grande.',
      },
      {
        words: [
          { text: 'みんなで', meaning: 'todos juntos' },
          { text: '歌を', reading: 'うたを', meaning: 'música (+ partícula de objeto)' },
          { text: '歌いました。', reading: 'うたいました。', meaning: 'cantamos' },
        ],
        translation: 'Todos juntos, cantamos uma música.',
      },
      {
        words: [
          { text: '妹は', reading: 'いもうとは', meaning: 'minha irmã mais nova' },
          { text: 'とても', meaning: 'muito' },
          { text: '嬉しそうでした。', reading: 'うれしそうでした。', meaning: 'parecia feliz' },
        ],
        translation: 'Minha irmã mais nova parecia muito feliz.',
      },
      {
        words: [
          { text: 'プレゼントは', meaning: 'o presente' },
          { text: '新しい', reading: 'あたらしい', meaning: 'novo' },
          { text: '靴でした。', reading: 'くつでした。', meaning: 'era um sapato' },
        ],
        translation: 'O presente foi um par de sapatos novo.',
      },
      {
        words: [
          { text: '楽しい', reading: 'たのしい', meaning: 'divertido' },
          { text: '一日でした。', reading: 'いちにちでした。', meaning: 'foi um dia' },
        ],
        translation: 'Foi um dia divertido.',
      },
      {
        words: [
          { text: '妹は、', reading: 'いもうとは、', meaning: 'minha irmã mais nova,' },
          { text: 'プレゼントを', meaning: 'presente (+ partícula de objeto)' },
          { text: '見て', reading: 'みて', meaning: 'vendo' },
          { text: 'とても', meaning: 'muito' },
          { text: '喜びました。', reading: 'よろこびました。', meaning: 'ficou feliz' },
        ],
        translation: 'Minha irmã mais nova ficou muito feliz ao ver o presente.',
      },
      {
        words: [
          { text: '写真も', reading: 'しゃしんも', meaning: 'fotos também' },
          { text: 'たくさん', meaning: 'muitas' },
          { text: '撮りました。', reading: 'とりました。', meaning: 'tiramos' },
        ],
        translation: 'Também tiramos muitas fotos.',
      },
      {
        words: [
          { text: '片付けは', reading: 'かたづけは', meaning: 'arrumar depois' },
          { text: '大変でしたが、', reading: 'たいへんでしたが、', meaning: 'foi trabalhoso, mas' },
          { text: 'いい', meaning: 'bom' },
          { text: '一日でした。', reading: 'いちにちでした。', meaning: 'foi um dia' },
        ],
        translation: 'Arrumar depois foi trabalhoso, mas foi um bom dia.',
      },
      {
        words: [
          { text: '来年も、', reading: 'らいねんも、', meaning: 'ano que vem também,' },
          { text: '家族で', reading: 'かぞくで', meaning: 'em família' },
          { text: 'お祝いしたいです。', reading: 'おいわいしたいです。', meaning: 'quero comemorar' },
        ],
        translation: 'Ano que vem também, quero comemorar em família.',
      },
    ],
  },
  {
    id: 'ryouri-narau',
    title: 'りょうりを ならう',
    level: 2,
    wordCount: 63,
    summaryPt: 'Aprendendo com a mãe a preparar sopa de missô do zero, passo a passo.',
    lines: [
      {
        words: [
          { text: '母に', reading: 'ははに', meaning: 'com/da minha mãe' },
          { text: '日本の', reading: 'にほんの', meaning: 'japonesa' },
          { text: '料理を', reading: 'りょうりを', meaning: 'culinária (+ partícula de objeto)' },
          { text: '習いました。', reading: 'ならいました。', meaning: 'aprendi' },
        ],
        translation: 'Aprendi culinária japonesa com minha mãe.',
      },
      {
        words: [
          { text: '今日は', reading: 'きょうは', meaning: 'hoje' },
          { text: '味噌汁を', reading: 'みそしるを', meaning: 'sopa de missô (+ partícula de objeto)' },
          { text: '作りました。', reading: 'つくりました。', meaning: 'fiz' },
        ],
        translation: 'Hoje fiz sopa de missô.',
      },
      {
        words: [
          { text: 'まず、', meaning: 'primeiro,' },
          { text: '野菜を', reading: 'やさいを', meaning: 'verduras (+ partícula de objeto)' },
          { text: '小さく', reading: 'ちいさく', meaning: 'pequeno' },
          { text: '切りました。', reading: 'きりました。', meaning: 'cortei' },
        ],
        translation: 'Primeiro, cortei os legumes em pedaços pequenos.',
      },
      {
        words: [
          { text: 'それから、', meaning: 'depois disso,' },
          { text: 'お湯で', reading: 'おゆで', meaning: 'com água quente' },
          { text: '野菜を', reading: 'やさいを', meaning: 'verduras (+ partícula de objeto)' },
          { text: '煮ました。', reading: 'にました。', meaning: 'cozinhei' },
        ],
        translation: 'Depois, cozinhei os legumes em água quente.',
      },
      {
        words: [
          { text: '最後に', reading: 'さいごに', meaning: 'por último' },
          { text: '味噌を', reading: 'みそを', meaning: 'missô (+ partícula de objeto)' },
          { text: '入れました。', reading: 'いれました。', meaning: 'coloquei' },
        ],
        translation: 'Por último, coloquei o missô.',
      },
      {
        words: [
          { text: '少し', reading: 'すこし', meaning: 'um pouco' },
          { text: '難しかったですが、', reading: 'むずかしかったですが、', meaning: 'foi difícil, mas' },
          { text: '上手に', reading: 'じょうずに', meaning: 'bem' },
          { text: 'できました。', meaning: 'consegui fazer' },
        ],
        translation: 'Foi um pouco difícil, mas consegui fazer bem.',
      },
      {
        words: [
          { text: '家族は', reading: 'かぞくは', meaning: 'minha família' },
          { text: '美味しいと', reading: 'おいしいと', meaning: 'que estava gostoso' },
          { text: '言いました。', reading: 'いいました。', meaning: 'disse' },
        ],
        translation: 'Minha família disse que estava gostoso.',
      },
      {
        words: [
          { text: 'また', meaning: 'de novo' },
          { text: '作りたいです。', reading: 'つくりたいです。', meaning: 'quero fazer' },
        ],
        translation: 'Quero fazer de novo.',
      },
      {
        words: [
          { text: '次は、', reading: 'つぎは、', meaning: 'da próxima vez,' },
          { text: 'お寿司の', reading: 'おすしの', meaning: 'de sushi' },
          { text: '作り方も', reading: 'つくりかたも', meaning: 'o modo de fazer também' },
          { text: '習いたいです。', reading: 'ならいたいです。', meaning: 'quero aprender' },
        ],
        translation: 'Da próxima vez, quero aprender também como fazer sushi.',
      },
      {
        words: [
          { text: '料理を', reading: 'りょうりを', meaning: 'culinária (+ partícula de objeto)' },
          { text: 'すると、', meaning: 'quando faço,' },
          { text: '母の', reading: 'ははの', meaning: 'da minha mãe' },
          { text: '大変さが', reading: 'たいへんさが', meaning: 'a dificuldade (+ partícula de sujeito)' },
          { text: '分かります。', reading: 'わかります。', meaning: 'entendo' },
        ],
        translation: 'Quando cozinho, entendo o quanto é trabalhoso para minha mãe.',
      },
      {
        words: [
          { text: '台所は', reading: 'だいどころは', meaning: 'a cozinha' },
          { text: '少し', reading: 'すこし', meaning: 'um pouco' },
          { text: '汚れましたが、', reading: 'よごれましたが、', meaning: 'ficou suja, mas' },
          { text: '大丈夫です。', reading: 'だいじょうぶです。', meaning: 'está tudo bem' },
        ],
        translation: 'A cozinha ficou um pouco suja, mas está tudo bem.',
      },
      {
        words: [
          { text: 'これからも、', meaning: 'de agora em diante também,' },
          { text: '母と', reading: 'ははと', meaning: 'com minha mãe' },
          { text: '一緒に', reading: 'いっしょに', meaning: 'juntos' },
          { text: '料理を', reading: 'りょうりを', meaning: 'culinária (+ partícula de objeto)' },
          { text: 'したいです。', meaning: 'quero fazer' },
        ],
        translation: 'De agora em diante também, quero cozinhar junto com minha mãe.',
      },
    ],
  },
  {
    id: 'mensetsu',
    title: 'めんせつ',
    level: 2,
    wordCount: 58,
    summaryPt: 'A véspera de uma entrevista de emprego: nervosismo, preparação e um pouco de esperança.',
    lines: [
      {
        words: [
          { text: '明日、', reading: 'あした、', meaning: 'amanhã,' },
          { text: '会社の', reading: 'かいしゃの', meaning: 'da empresa' },
          { text: '面接が', reading: 'めんせつが', meaning: 'a entrevista (+ partícula de sujeito)' },
          { text: 'あります。', meaning: 'há/tem' },
        ],
        translation: 'Amanhã tenho uma entrevista de emprego.',
      },
      {
        words: [
          { text: '少し', reading: 'すこし', meaning: 'um pouco' },
          { text: '緊張しています。', reading: 'きんちょうしています。', meaning: 'estou nervoso' },
        ],
        translation: 'Estou um pouco nervoso.',
      },
      {
        words: [
          { text: 'スーツを', meaning: 'terno (+ partícula de objeto)' },
          { text: '着て、', reading: 'きて、', meaning: 'vestindo, e' },
          { text: '早く', reading: 'はやく', meaning: 'cedo' },
          { text: '家を', reading: 'いえを', meaning: 'de casa' },
          { text: '出るつもりです。', reading: 'でるつもりです。', meaning: 'pretendo sair' },
        ],
        translation: 'Pretendo vestir um terno e sair de casa cedo.',
      },
      {
        words: [
          { text: '質問の', reading: 'しつもんの', meaning: 'das perguntas' },
          { text: '答えを', reading: 'こたえを', meaning: 'as respostas (+ partícula de objeto)' },
          { text: '何度も', reading: 'なんども', meaning: 'várias vezes' },
          { text: '練習しました。', reading: 'れんしゅうしました。', meaning: 'pratiquei' },
        ],
        translation: 'Pratiquei várias vezes as respostas das perguntas.',
      },
      {
        words: [
          { text: 'この', meaning: 'esta' },
          { text: '会社で', reading: 'かいしゃで', meaning: 'nesta empresa' },
          { text: '働きたい', reading: 'はたらきたい', meaning: 'querer trabalhar' },
          { text: '理由も', reading: 'りゆうも', meaning: 'o motivo também' },
          { text: '考えました。', reading: 'かんがえました。', meaning: 'pensei' },
        ],
        translation: 'Também pensei no motivo pelo qual quero trabalhar nesta empresa.',
      },
      {
        words: [
          { text: 'うまく', meaning: 'bem' },
          { text: 'いくと', meaning: 'se for/acontecer' },
          { text: 'いいです。', meaning: 'seria bom' },
        ],
        translation: 'Espero que dê tudo certo.',
      },
      {
        words: [
          { text: '面接の後、', reading: 'めんせつのあと、', meaning: 'depois da entrevista,' },
          { text: '友達に', reading: 'ともだちに', meaning: 'para um amigo' },
          { text: '電話するつもりです。', reading: 'でんわするつもりです。', meaning: 'pretendo telefonar' },
        ],
        translation: 'Depois da entrevista, pretendo ligar para um amigo.',
      },
      {
        words: [
          { text: '面接では、', reading: 'めんせつでは、', meaning: 'na entrevista,' },
          { text: '笑顔で', reading: 'えがおで', meaning: 'com um sorriso' },
          { text: '話す', reading: 'はなす', meaning: 'falar' },
          { text: 'つもりです。', meaning: 'pretendo' },
        ],
        translation: 'Na entrevista, pretendo falar com um sorriso.',
      },
      {
        words: [
          { text: '少し', reading: 'すこし', meaning: 'um pouco' },
          { text: '不安ですが、', reading: 'ふあんですが、', meaning: 'estou inseguro, mas' },
          { text: '頑張りたいです。', reading: 'がんばりたいです。', meaning: 'quero me esforçar' },
        ],
        translation: 'Estou um pouco inseguro, mas quero dar o meu melhor.',
      },
      {
        words: [
          { text: '今夜は', reading: 'こんやは', meaning: 'esta noite' },
          { text: '早く', reading: 'はやく', meaning: 'cedo' },
          { text: '寝て、', reading: 'ねて、', meaning: 'vou dormir, e' },
          { text: '体調を', reading: 'たいちょうを', meaning: 'a condição física (+ partícula de objeto)' },
          { text: '整えます。', reading: 'ととのえます。', meaning: 'vou ajustar' },
        ],
        translation: 'Esta noite, vou dormir cedo para me preparar fisicamente.',
      },
      {
        words: [
          { text: 'いい', meaning: 'bom' },
          { text: '結果に', reading: 'けっかに', meaning: 'em resultado' },
          { text: 'なることを', meaning: 'virar, se tornar (+ partícula de objeto)' },
          { text: '願っています。', reading: 'ねがっています。', meaning: 'estou desejando' },
        ],
        translation: 'Estou torcendo para que dê um bom resultado.',
      },
    ],
  },
  {
    id: 'hikkoshi',
    title: 'ひっこし',
    level: 2,
    wordCount: 60,
    summaryPt: 'Preparativos para se mudar para um apartamento novo, mais espaçoso e perto da estação.',
    lines: [
      {
        words: [
          { text: '来月、', reading: 'らいげつ、', meaning: 'mês que vem,' },
          { text: '新しい', reading: 'あたらしい', meaning: 'novo' },
          { text: 'アパートに', meaning: 'para um apartamento' },
          { text: '引っ越します。', reading: 'ひっこします。', meaning: 'vou me mudar' },
        ],
        translation: 'Mês que vem, vou me mudar para um apartamento novo.',
      },
      {
        words: [
          { text: '今の', reading: 'いまの', meaning: 'atual' },
          { text: '部屋より', reading: 'へやより', meaning: 'que o quarto' },
          { text: '少し', reading: 'すこし', meaning: 'um pouco' },
          { text: '広いです。', reading: 'ひろいです。', meaning: 'é espaçoso' },
        ],
        translation: 'É um pouco mais espaçoso que o quarto atual.',
      },
      {
        words: [
          { text: '駅からも', reading: 'えきからも', meaning: 'da estação também' },
          { text: '近くて、', reading: 'ちかくて、', meaning: 'é perto, e' },
          { text: '便利です。', reading: 'べんりです。', meaning: 'é conveniente' },
        ],
        translation: 'Também é perto da estação, e é conveniente.',
      },
      {
        words: [
          { text: '今週末、', reading: 'こんしゅうまつ、', meaning: 'neste fim de semana,' },
          { text: '荷物を', reading: 'にもつを', meaning: 'as coisas (+ partícula de objeto)' },
          { text: '箱に', reading: 'はこに', meaning: 'na caixa' },
          { text: '入れます。', reading: 'いれます。', meaning: 'vou colocar' },
        ],
        translation: 'Neste fim de semana, vou colocar as coisas nas caixas.',
      },
      {
        words: [
          { text: '友達も', reading: 'ともだちも', meaning: 'meus amigos também' },
          { text: '手伝ってくれます。', reading: 'てつだってくれます。', meaning: 'vão me ajudar' },
        ],
        translation: 'Meus amigos também vão me ajudar.',
      },
      {
        words: [
          { text: '新しい', reading: 'あたらしい', meaning: 'novo' },
          { text: '部屋の', reading: 'へやの', meaning: 'do quarto' },
          { text: '家具も', reading: 'かぐも', meaning: 'os móveis também' },
          { text: '考えています。', reading: 'かんがえています。', meaning: 'estou pensando' },
        ],
        translation: 'Também estou pensando nos móveis do novo quarto.',
      },
      {
        words: [
          { text: '早く', reading: 'はやく', meaning: 'logo' },
          { text: '新しい', reading: 'あたらしい', meaning: 'nova' },
          { text: '生活を', reading: 'せいかつを', meaning: 'a vida (+ partícula de objeto)' },
          { text: '始めたいです。', reading: 'はじめたいです。', meaning: 'quero começar' },
        ],
        translation: 'Quero começar logo a nova vida.',
      },
      {
        words: [
          { text: '新しい', reading: 'あたらしい', meaning: 'novo' },
          { text: '部屋には、', reading: 'へやには、', meaning: 'no quarto,' },
          { text: '大きい', reading: 'おおきい', meaning: 'grande' },
          { text: '窓が', reading: 'まどが', meaning: 'janela (+ partícula de sujeito)' },
          { text: 'あります。', meaning: 'há' },
        ],
        translation: 'O quarto novo tem uma janela grande.',
      },
      {
        words: [
          { text: '近くに', reading: 'ちかくに', meaning: 'perto' },
          { text: 'スーパーも', meaning: 'supermercado também' },
          { text: 'あって、', meaning: 'há, e' },
          { text: '便利そうです。', reading: 'べんりそうです。', meaning: 'parece conveniente' },
        ],
        translation: 'Perto também tem um supermercado, parece ser bem conveniente.',
      },
      {
        words: [
          { text: '引っ越しの', reading: 'ひっこしの', meaning: 'da mudança' },
          { text: '後、', reading: 'あと、', meaning: 'depois,' },
          { text: '部屋を', reading: 'へやを', meaning: 'o quarto (+ partícula de objeto)' },
          { text: '掃除します。', reading: 'そうじします。', meaning: 'vou limpar' },
        ],
        translation: 'Depois da mudança, vou limpar o quarto.',
      },
      {
        words: [
          { text: '新生活が、', reading: 'しんせいかつが、', meaning: 'a nova vida,' },
          { text: '楽しみで', reading: 'たのしみで', meaning: 'empolgante, e' },
          { text: '仕方ありません。', reading: 'しかたありません。', meaning: 'não aguento de tanta ansiedade' },
        ],
        translation: 'Estou tão animado com a nova vida que mal posso esperar.',
      },
    ],
  },
  {
    id: 'natsu-matsuri',
    title: 'なつまつり',
    level: 2,
    wordCount: 59,
    summaryPt: 'Uma noite de festival de verão: yukata, takoyaki e fogos de artifício com amigos.',
    lines: [
      {
        words: [
          { text: '昨日、', reading: 'きのう、', meaning: 'ontem,' },
          { text: '町の', reading: 'まちの', meaning: 'da cidade' },
          { text: '夏祭りに', reading: 'なつまつりに', meaning: 'ao festival de verão' },
          { text: '行きました。', reading: 'いきました。', meaning: 'fui' },
        ],
        translation: 'Ontem, fui ao festival de verão da cidade.',
      },
      {
        words: [
          { text: '友達と', reading: 'ともだちと', meaning: 'com amigos' },
          { text: '浴衣を', reading: 'ゆかたを', meaning: 'yukata (+ partícula de objeto)' },
          { text: '着て', reading: 'きて', meaning: 'vestindo' },
          { text: '行きました。', reading: 'いきました。', meaning: 'fomos' },
        ],
        translation: 'Fui vestindo yukata com meus amigos.',
      },
      {
        words: [
          { text: '屋台で', reading: 'やたいで', meaning: 'na barraca' },
          { text: 'たこ焼きを', reading: 'たこやきを', meaning: 'takoyaki (+ partícula de objeto)' },
          { text: '食べました。', reading: 'たべました。', meaning: 'comemos' },
        ],
        translation: 'Comi takoyaki numa barraca.',
      },
      {
        words: [
          { text: '夜、', reading: 'よる、', meaning: 'à noite,' },
          { text: '大きい', reading: 'おおきい', meaning: 'grandes' },
          { text: '花火を', reading: 'はなびを', meaning: 'fogos de artifício (+ partícula de objeto)' },
          { text: '見ました。', reading: 'みました。', meaning: 'vimos' },
        ],
        translation: 'À noite, vimos fogos de artifício grandes.',
      },
      {
        words: [
          { text: '空が', reading: 'そらが', meaning: 'o céu (+ partícula de sujeito)' },
          { text: '色々な', reading: 'いろいろな', meaning: 'várias' },
          { text: '色に', reading: 'いろに', meaning: 'em cores' },
          { text: 'なりました。', meaning: 'ficou' },
        ],
        translation: 'O céu ficou de várias cores.',
      },
      {
        words: [
          { text: '人が', reading: 'ひとが', meaning: 'as pessoas (+ partícula de sujeito)' },
          { text: '多くて、', reading: 'おおくて、', meaning: 'eram muitas, e' },
          { text: '少し', reading: 'すこし', meaning: 'um pouco' },
          { text: '疲れました。', reading: 'つかれました。', meaning: 'fiquei cansado' },
        ],
        translation: 'Havia muita gente, e fiquei um pouco cansado.',
      },
      {
        words: [
          { text: 'でも、', meaning: 'mas,' },
          { text: 'とても', meaning: 'muito' },
          { text: '楽しい', reading: 'たのしい', meaning: 'divertida' },
          { text: '夜でした。', reading: 'よるでした。', meaning: 'foi a noite' },
        ],
        translation: 'Mas foi uma noite muito divertida.',
      },
      {
        words: [
          { text: '帰る前に、', reading: 'かえるまえに、', meaning: 'antes de voltar,' },
          { text: 'お面を', reading: 'おめんを', meaning: 'máscara (+ partícula de objeto)' },
          { text: '買いました。', reading: 'かいました。', meaning: 'comprei' },
        ],
        translation: 'Antes de voltar, comprei uma máscara.',
      },
      {
        words: [
          { text: '太鼓の', reading: 'たいこの', meaning: 'do tambor' },
          { text: '音が、', reading: 'おとが、', meaning: 'o som,' },
          { text: '遠くまで', reading: 'とおくまで', meaning: 'até longe' },
          { text: '聞こえました。', reading: 'きこえました。', meaning: 'se ouvia' },
        ],
        translation: 'O som do tambor se ouvia até longe.',
      },
      {
        words: [
          { text: '来年も', reading: 'らいねんも', meaning: 'ano que vem também' },
          { text: '友達と', reading: 'ともだちと', meaning: 'com amigos' },
          { text: '行く', reading: 'いく', meaning: 'ir' },
          { text: '約束を', reading: 'やくそくを', meaning: 'promessa (+ partícula de objeto)' },
          { text: 'しました。', meaning: 'fiz' },
        ],
        translation: 'Combinei de ir de novo ano que vem com meus amigos.',
      },
      {
        words: [
          { text: '夏祭りは、', reading: 'なつまつりは、', meaning: 'o festival de verão,' },
          { text: '夏の', reading: 'なつの', meaning: 'do verão' },
          { text: '一番の', reading: 'いちばんの', meaning: 'a melhor' },
          { text: '思い出です。', reading: 'おもいでです。', meaning: 'é lembrança' },
        ],
        translation: 'O festival de verão é minha melhor lembrança do verão.',
      },
    ],
  },
  {
    id: 'byouin',
    title: 'びょういん',
    level: 2,
    wordCount: 56,
    summaryPt: 'Uma manhã de dor de cabeça e febre leva a uma visita ao hospital — e a um dia de descanso.',
    lines: [
      {
        words: [
          { text: '今朝、', reading: 'けさ、', meaning: 'esta manhã,' },
          { text: '頭が', reading: 'あたまが', meaning: 'a cabeça (+ partícula de sujeito)' },
          { text: '痛かったです。', reading: 'いたかったです。', meaning: 'doeu' },
        ],
        translation: 'Esta manhã, minha cabeça doeu.',
      },
      {
        words: [
          { text: '熱も', reading: 'ねつも', meaning: 'febre também' },
          { text: '少し', reading: 'すこし', meaning: 'um pouco' },
          { text: 'ありました。', meaning: 'tinha' },
        ],
        translation: 'Também tive um pouco de febre.',
      },
      {
        words: [
          { text: 'それで、', meaning: 'por isso,' },
          { text: '近くの', reading: 'ちかくの', meaning: 'próximo' },
          { text: '病院へ', reading: 'びょういんへ', meaning: 'para o hospital' },
          { text: '行きました。', reading: 'いきました。', meaning: 'fui' },
        ],
        translation: 'Por isso, fui a um hospital perto de casa.',
      },
      {
        words: [
          { text: '医者は', reading: 'いしゃは', meaning: 'o médico' },
          { text: '優しく、', reading: 'やさしく、', meaning: 'gentilmente, e' },
          { text: '丁寧に', reading: 'ていねいに', meaning: 'com cuidado' },
          { text: '診てくれました。', reading: 'みてくれました。', meaning: 'me examinou' },
        ],
        translation: 'O médico me examinou com gentileza e cuidado.',
      },
      {
        words: [
          { text: '薬を', reading: 'くすりを', meaning: 'remédio (+ partícula de objeto)' },
          { text: 'もらって、', meaning: 'recebi, e' },
          { text: '家に', reading: 'いえに', meaning: 'para casa' },
          { text: '帰りました。', reading: 'かえりました。', meaning: 'voltei' },
        ],
        translation: 'Recebi remédio e voltei para casa.',
      },
      {
        words: [
          { text: '一日中、', reading: 'いちにちじゅう、', meaning: 'o dia inteiro,' },
          { text: 'ゆっくり', meaning: 'tranquilamente' },
          { text: '休みました。', reading: 'やすみました。', meaning: 'descansei' },
        ],
        translation: 'Descansei tranquilamente o dia inteiro.',
      },
      {
        words: [
          { text: '今は', reading: 'いまは', meaning: 'agora' },
          { text: 'もう', meaning: 'já' },
          { text: '元気に', reading: 'げんきに', meaning: 'bem/saudável' },
          { text: 'なりました。', meaning: 'fiquei' },
        ],
        translation: 'Agora já estou bem de novo.',
      },
      {
        words: [
          { text: '薬は、', reading: 'くすりは、', meaning: 'o remédio,' },
          { text: '一日に', reading: 'いちにちに', meaning: 'por dia' },
          { text: '三回', reading: 'さんかい', meaning: 'três vezes' },
          { text: '飲みます。', reading: 'のみます。', meaning: 'tomo' },
        ],
        translation: 'Tomo o remédio três vezes por dia.',
      },
      {
        words: [
          { text: 'しばらく、', meaning: 'por um tempo,' },
          { text: '辛い', reading: 'からい', meaning: 'picante' },
          { text: '物は', reading: 'ものは', meaning: 'coisas' },
          { text: '控えます。', reading: 'ひかえます。', meaning: 'vou evitar' },
        ],
        translation: 'Por um tempo, vou evitar coisas picantes.',
      },
      {
        words: [
          { text: '家族が、', reading: 'かぞくが、', meaning: 'minha família,' },
          { text: '色々', reading: 'いろいろ', meaning: 'de várias formas' },
          { text: '心配してくれました。', reading: 'しんぱいしてくれました。', meaning: 'se preocupou por mim' },
        ],
        translation: 'Minha família se preocupou comigo de várias formas.',
      },
      {
        words: [
          { text: '健康の', reading: 'けんこうの', meaning: 'da saúde' },
          { text: '大切さを、', reading: 'たいせつさを、', meaning: 'a importância,' },
          { text: '改めて', reading: 'あらためて', meaning: 'mais uma vez' },
          { text: '感じました。', reading: 'かんじました。', meaning: 'senti' },
        ],
        translation: 'Senti mais uma vez a importância de cuidar da saúde.',
      },
    ],
  },
  {
    id: 'ryokou-keikaku',
    title: 'りょこうの けいかく',
    level: 2,
    wordCount: 57,
    summaryPt: 'Planejando com os amigos uma viagem de verão a Okinawa: passagens, hotel e praias.',
    lines: [
      {
        words: [
          { text: '夏休みに', reading: 'なつやすみに', meaning: 'nas férias de verão' },
          { text: '沖縄へ', reading: 'おきなわへ', meaning: 'para Okinawa' },
          { text: '行く', reading: 'いく', meaning: 'ir' },
          { text: '予定です。', reading: 'よていです。', meaning: 'é o plano' },
        ],
        translation: 'Nas férias de verão, o plano é ir a Okinawa.',
      },
      {
        words: [
          { text: '友達と', reading: 'ともだちと', meaning: 'com amigos' },
          { text: '一緒に', reading: 'いっしょに', meaning: 'juntos' },
          { text: '計画を', reading: 'けいかくを', meaning: 'o plano (+ partícula de objeto)' },
          { text: '立てています。', reading: 'たてています。', meaning: 'estamos fazendo' },
        ],
        translation: 'Estou planejando junto com meus amigos.',
      },
      {
        words: [
          { text: 'まず、', meaning: 'primeiro,' },
          { text: '飛行機の', reading: 'ひこうきの', meaning: 'de avião' },
          { text: '切符を', reading: 'きっぷを', meaning: 'a passagem (+ partícula de objeto)' },
          { text: '買いました。', reading: 'かいました。', meaning: 'compramos' },
        ],
        translation: 'Primeiro, compramos as passagens de avião.',
      },
      {
        words: [
          { text: '次に、', reading: 'つぎに、', meaning: 'em seguida,' },
          { text: '泊まる', reading: 'とまる', meaning: 'hospedar-se' },
          { text: 'ホテルを', meaning: 'hotel (+ partícula de objeto)' },
          { text: '探しています。', reading: 'さがしています。', meaning: 'estamos procurando' },
        ],
        translation: 'Em seguida, estamos procurando um hotel para nos hospedar.',
      },
      {
        words: [
          { text: 'きれいな', meaning: 'cristalino' },
          { text: '海で', reading: 'うみで', meaning: 'no mar' },
          { text: '泳ぎたいです。', reading: 'およぎたいです。', meaning: 'quero nadar' },
        ],
        translation: 'Quero nadar num mar cristalino.',
      },
      {
        words: [
          { text: '美味しい', reading: 'おいしい', meaning: 'gostosa' },
          { text: '沖縄料理も', reading: 'おきなわりょうりも', meaning: 'a culinária de Okinawa também' },
          { text: '食べてみたいです。', reading: 'たべてみたいです。', meaning: 'quero experimentar comer' },
        ],
        translation: 'Também quero experimentar a culinária de Okinawa.',
      },
      {
        words: [
          { text: '旅行が', reading: 'りょこうが', meaning: 'a viagem (+ partícula de sujeito)' },
          { text: '来るのが', reading: 'くるのが', meaning: 'chegar' },
          { text: '待ち遠しいです。', reading: 'まちどおしいです。', meaning: 'mal posso esperar' },
        ],
        translation: 'Mal posso esperar a viagem chegar.',
      },
      {
        words: [
          { text: '沖縄では、', reading: 'おきなわでは、', meaning: 'em Okinawa,' },
          { text: 'シュノーケリングも', meaning: 'mergulho com snorkel também' },
          { text: 'したいです。', meaning: 'quero fazer' },
        ],
        translation: 'Em Okinawa, também quero fazer snorkel.',
      },
      {
        words: [
          { text: '友達と', reading: 'ともだちと', meaning: 'com amigos' },
          { text: '荷物の', reading: 'にもつの', meaning: 'das coisas' },
          { text: 'リストを', meaning: 'lista (+ partícula de objeto)' },
          { text: '作りました。', reading: 'つくりました。', meaning: 'fizemos' },
        ],
        translation: 'Fizemos uma lista das coisas para levar com os amigos.',
      },
      {
        words: [
          { text: '天気が', reading: 'てんきが', meaning: 'o tempo (+ partícula de sujeito)' },
          { text: 'いいことを、', meaning: 'estar bom,' },
          { text: '祈っています。', reading: 'いのっています。', meaning: 'estou torcendo' },
        ],
        translation: 'Estou torcendo para o tempo estar bom.',
      },
      {
        words: [
          { text: '楽しい', reading: 'たのしい', meaning: 'divertidas' },
          { text: '夏休みに', reading: 'なつやすみに', meaning: 'em férias de verão' },
          { text: 'なりそうです。', meaning: 'parece que vai virar' },
        ],
        translation: 'Parece que vai ser umas férias de verão divertidas.',
      },
    ],
  },
  {
    id: 'wasurerarenai-sensei',
    title: 'わすれられない せんせい',
    level: 2,
    wordCount: 61,
    summaryPt: 'A lembrança de um professor do colégio que marcou a vida de todos os alunos.',
    lines: [
      {
        words: [
          { text: '高校の時、', reading: 'こうこうのとき、', meaning: 'na época do colégio,' },
          { text: '田村先生という', reading: 'たむらせんせいという', meaning: 'chamado professor Tamura' },
          { text: '先生が', reading: 'せんせいが', meaning: 'um professor (+ partícula de sujeito)' },
          { text: 'いました。', meaning: 'havia' },
        ],
        translation: 'Na época do colégio, havia um professor chamado Tamura.',
      },
      {
        words: [
          { text: 'いつも', meaning: 'sempre' },
          { text: '面白い', reading: 'おもしろい', meaning: 'interessantes' },
          { text: '話を', reading: 'はなしを', meaning: 'histórias (+ partícula de objeto)' },
          { text: 'してくれました。', meaning: 'contava (pra gente)' },
        ],
        translation: 'Ele sempre contava histórias interessantes para nós.',
      },
      {
        words: [
          { text: '分からない時、', reading: 'わからないとき、', meaning: 'quando eu não entendia,' },
          { text: 'いつも', meaning: 'sempre' },
          { text: '丁寧に', reading: 'ていねいに', meaning: 'com cuidado' },
          { text: '教えてくれました。', reading: 'おしえてくれました。', meaning: 'me ensinava' },
        ],
        translation: 'Quando eu não entendia algo, ele sempre me explicava com cuidado.',
      },
      {
        words: [
          { text: '生徒たちに', reading: 'せいとたちに', meaning: 'entre os alunos' },
          { text: 'とても', meaning: 'muita' },
          { text: '人気が', reading: 'にんきが', meaning: 'popularidade (+ partícula de sujeito)' },
          { text: 'ありました。', meaning: 'havia' },
        ],
        translation: 'Ele era muito popular entre os alunos.',
      },
      {
        words: [
          { text: '卒業する時、', reading: 'そつぎょうするとき、', meaning: 'na hora de nos formar,' },
          { text: '皆', reading: 'みんな', meaning: 'todos' },
          { text: '泣きました。', reading: 'なきました。', meaning: 'choramos' },
        ],
        translation: 'Na hora de nos formar, todos choramos.',
      },
      {
        words: [
          { text: '今でも', reading: 'いまでも', meaning: 'ainda hoje' },
          { text: '時々', reading: 'ときどき', meaning: 'às vezes' },
          { text: '先生の', reading: 'せんせいの', meaning: 'do professor' },
          { text: 'ことを', meaning: 'sobre ele (+ partícula de objeto)' },
          { text: '思い出します。', reading: 'おもいだします。', meaning: 'me lembro' },
        ],
        translation: 'Ainda hoje, às vezes me lembro dele.',
      },
      {
        words: [
          { text: 'いつか', meaning: 'algum dia' },
          { text: 'また', meaning: 'de novo' },
          { text: '会いたいです。', reading: 'あいたいです。', meaning: 'quero encontrar' },
        ],
        translation: 'Quero encontrá-lo de novo algum dia.',
      },
      {
        words: [
          { text: '先生の', reading: 'せんせいの', meaning: 'do professor' },
          { text: '言葉は、', reading: 'ことばは、', meaning: 'as palavras,' },
          { text: '今でも', reading: 'いまでも', meaning: 'ainda hoje' },
          { text: '心に', reading: 'こころに', meaning: 'no coração' },
          { text: '残っています。', reading: 'のこっています。', meaning: 'ficaram guardadas' },
        ],
        translation: 'As palavras do professor ainda hoje ficaram guardadas no meu coração.',
      },
      {
        words: [
          { text: '困った時、', reading: 'こまったとき、', meaning: 'quando estou em dificuldade,' },
          { text: 'いつも', meaning: 'sempre' },
          { text: '先生の', reading: 'せんせいの', meaning: 'do professor' },
          { text: 'ことを', meaning: 'sobre ele (+ partícula de objeto)' },
          { text: '思い出します。', reading: 'おもいだします。', meaning: 'me lembro' },
        ],
        translation: 'Quando estou em dificuldade, sempre me lembro do professor.',
      },
      {
        words: [
          { text: '同級生とも、', reading: 'どうきゅうせいとも、', meaning: 'com os colegas de turma também,' },
          { text: '先生の', reading: 'せんせいの', meaning: 'do professor' },
          { text: '話を', reading: 'はなしを', meaning: 'conversa (+ partícula de objeto)' },
          { text: 'します。', meaning: 'fazemos' },
        ],
        translation: 'Com os colegas de turma também, conversamos sobre o professor.',
      },
      {
        words: [
          { text: '先生の', reading: 'せんせいの', meaning: 'do professor' },
          { text: 'おかげで、', meaning: 'graças a,' },
          { text: '今の', reading: 'いまの', meaning: 'de hoje' },
          { text: 'わたしが', meaning: 'eu (+ partícula de sujeito)' },
          { text: 'います。', meaning: 'existo, estou' },
        ],
        translation: 'Graças ao professor, eu sou quem sou hoje.',
      },
    ],
  },
  {
    id: 'wasuremono',
    title: 'わすれもの',
    level: 2,
    wordCount: 63,
    summaryPt: 'Um susto na estação de trem: a carteira perdida e o alívio de encontrá-la de volta.',
    lines: [
      {
        words: [
          { text: '今朝、', reading: 'けさ、', meaning: 'esta manhã,' },
          { text: '駅で', reading: 'えきで', meaning: 'na estação' },
          { text: '大変な', reading: 'たいへんな', meaning: 'grave' },
          { text: 'ことが', meaning: 'uma coisa (+ partícula de sujeito)' },
          { text: 'ありました。', meaning: 'aconteceu' },
        ],
        translation: 'Esta manhã, aconteceu algo sério na estação.',
      },
      {
        words: [
          { text: '電車を', reading: 'でんしゃを', meaning: 'do trem (+ partícula de objeto)' },
          { text: '降りた後、', reading: 'おりたあと、', meaning: 'depois de descer,' },
          { text: '財布が', reading: 'さいふが', meaning: 'a carteira (+ partícula de sujeito)' },
          { text: 'ないと', meaning: 'que não tinha' },
          { text: '気づきました。', reading: 'きづきました。', meaning: 'percebi' },
        ],
        translation: 'Depois de descer do trem, percebi que não tinha mais a carteira.',
      },
      {
        words: [
          { text: 'とても', meaning: 'muito' },
          { text: '驚いて、', reading: 'おどろいて、', meaning: 'me assustei, e' },
          { text: '慌てました。', reading: 'あわてました。', meaning: 'entrei em pânico' },
        ],
        translation: 'Fiquei muito assustado e entrei em pânico.',
      },
      {
        words: [
          { text: 'すぐに', meaning: 'imediatamente' },
          { text: '駅員さんに', reading: 'えきいんさんに', meaning: 'ao funcionário da estação' },
          { text: '話しました。', reading: 'はなしました。', meaning: 'contei' },
        ],
        translation: 'Contei imediatamente ao funcionário da estação.',
      },
      {
        words: [
          { text: '駅員さんは', reading: 'えきいんさんは', meaning: 'o funcionário da estação' },
          { text: '忘れ物センターに', reading: 'わすれものセンターに', meaning: 'para o centro de achados e perdidos' },
          { text: '連絡してくれました。', reading: 'れんらくしてくれました。', meaning: 'entrou em contato (por mim)' },
        ],
        translation: 'O funcionário entrou em contato com o centro de achados e perdidos por mim.',
      },
      {
        words: [
          { text: '三十分後、', reading: 'さんじゅっぷんご、', meaning: 'trinta minutos depois,' },
          { text: '財布が', reading: 'さいふが', meaning: 'a carteira (+ partícula de sujeito)' },
          { text: '見つかりました。', reading: 'みつかりました。', meaning: 'foi encontrada' },
        ],
        translation: 'Trinta minutos depois, a carteira foi encontrada.',
      },
      {
        words: [
          { text: '本当に', reading: 'ほんとうに', meaning: 'realmente' },
          { text: '安心しました。', reading: 'あんしんしました。', meaning: 'fiquei aliviado' },
        ],
        translation: 'Fiquei realmente aliviado.',
      },
      {
        words: [
          { text: 'これから', meaning: 'de agora em diante' },
          { text: '気をつけようと', reading: 'きをつけようと', meaning: 'que vou tomar cuidado' },
          { text: '思います。', reading: 'おもいます。', meaning: 'penso' },
        ],
        translation: 'Vou tomar mais cuidado daqui em diante.',
      },
      {
        words: [
          { text: '財布の', reading: 'さいふの', meaning: 'da carteira' },
          { text: '中を、', reading: 'なかを、', meaning: 'o interior,' },
          { text: 'すぐに', meaning: 'imediatamente' },
          { text: '確認しました。', reading: 'かくにんしました。', meaning: 'conferi' },
        ],
        translation: 'Conferi imediatamente o conteúdo da carteira.',
      },
      {
        words: [
          { text: 'お金も', reading: 'おかねも', meaning: 'dinheiro também' },
          { text: 'カードも、', meaning: 'cartões também,' },
          { text: '全部', reading: 'ぜんぶ', meaning: 'tudo' },
          { text: 'ありました。', meaning: 'estava' },
        ],
        translation: 'O dinheiro e os cartões, tudo estava lá.',
      },
      {
        words: [
          { text: '駅員さんに、', reading: 'えきいんさんに、', meaning: 'ao funcionário da estação,' },
          { text: '何度も', reading: 'なんども', meaning: 'várias vezes' },
          { text: 'お礼を', reading: 'おれいを', meaning: 'agradecimento (+ partícula de objeto)' },
          { text: '言いました。', reading: 'いいました。', meaning: 'disse' },
        ],
        translation: 'Agradeci várias vezes ao funcionário da estação.',
      },
      {
        words: [
          { text: 'この', meaning: 'esta' },
          { text: '経験から、', reading: 'けいけんから、', meaning: 'dessa experiência,' },
          { text: '大事な', reading: 'だいじな', meaning: 'importante' },
          { text: 'ことを', meaning: 'coisa (+ partícula de objeto)' },
          { text: '学びました。', reading: 'まなびました。', meaning: 'aprendi' },
        ],
        translation: 'Aprendi algo importante com essa experiência.',
      },
    ],
  },
  {
    id: 'conveni-baito',
    title: 'コンビニの バイト',
    level: 2,
    wordCount: 65,
    summaryPt: 'O começo de um trabalho de meio período numa loja de conveniência, do primeiro dia difícil à rotina.',
    lines: [
      {
        words: [
          { text: '先月から、', reading: 'せんげつから、', meaning: 'desde o mês passado,' },
          { text: 'コンビニで', meaning: 'na loja de conveniência' },
          { text: 'アルバイトを', meaning: 'o trabalho de meio período (+ partícula de objeto)' },
          { text: '始めました。', reading: 'はじめました。', meaning: 'comecei' },
        ],
        translation: 'Desde o mês passado, comecei um trabalho de meio período numa loja de conveniência.',
      },
      {
        words: [
          { text: '最初の日は、', reading: 'さいしょのひは、', meaning: 'no primeiro dia,' },
          { text: '覚える', reading: 'おぼえる', meaning: 'memorizar' },
          { text: 'ことが', meaning: 'coisas (+ partícula de sujeito)' },
          { text: '多くて', reading: 'おおくて', meaning: 'eram muitas, e' },
          { text: '大変でした。', reading: 'たいへんでした。', meaning: 'foi difícil' },
        ],
        translation: 'No primeiro dia, havia muita coisa para memorizar e foi difícil.',
      },
      {
        words: [
          { text: 'レジの', meaning: 'do caixa' },
          { text: '使い方を', reading: 'つかいかたを', meaning: 'o modo de usar (+ partícula de objeto)' },
          { text: '先輩に', reading: 'せんぱいに', meaning: 'com um colega mais experiente' },
          { text: '習いました。', reading: 'ならいました。', meaning: 'aprendi' },
        ],
        translation: 'Aprendi a usar o caixa com um colega mais experiente.',
      },
      {
        words: [
          { text: 'お客さんに', reading: 'おきゃくさんに', meaning: 'aos clientes' },
          { text: '挨拶するのも', reading: 'あいさつするのも', meaning: 'cumprimentar também' },
          { text: '大事な', reading: 'だいじな', meaning: 'importante' },
          { text: '仕事です。', reading: 'しごとです。', meaning: 'é o trabalho' },
        ],
        translation: 'Cumprimentar os clientes também é uma parte importante do trabalho.',
      },
      {
        words: [
          { text: '今は', reading: 'いまは', meaning: 'agora' },
          { text: '少しずつ', reading: 'すこしずつ', meaning: 'aos poucos' },
          { text: '慣れてきました。', reading: 'なれてきました。', meaning: 'fui me acostumando' },
        ],
        translation: 'Agora estou me acostumando aos poucos.',
      },
      {
        words: [
          { text: '週に', reading: 'しゅうに', meaning: 'por semana' },
          { text: '三回、', reading: 'さんかい、', meaning: 'três vezes,' },
          { text: '夕方から', reading: 'ゆうがたから', meaning: 'a partir do fim da tarde' },
          { text: '働いています。', reading: 'はたらいています。', meaning: 'estou trabalhando' },
        ],
        translation: 'Trabalho três vezes por semana, a partir do fim da tarde.',
      },
      {
        words: [
          { text: '給料で', reading: 'きゅうりょうで', meaning: 'com o salário' },
          { text: '好きな', reading: 'すきな', meaning: 'de que eu gosto' },
          { text: '物を', reading: 'ものを', meaning: 'coisas (+ partícula de objeto)' },
          { text: '買いたいです。', reading: 'かいたいです。', meaning: 'quero comprar' },
        ],
        translation: 'Quero comprar coisas de que gosto com o salário.',
      },
      {
        words: [
          { text: '忙しい', reading: 'いそがしい', meaning: 'movimentado' },
          { text: '時間帯は、', reading: 'じかんたいは、', meaning: 'no horário,' },
          { text: '休む', reading: 'やすむ', meaning: 'descansar' },
          { text: '暇も', reading: 'ひまも', meaning: 'tempo livre também' },
          { text: 'ありません。', meaning: 'não tenho' },
        ],
        translation: 'No horário de movimento, não tenho nem tempo para descansar.',
      },
      {
        words: [
          { text: 'でも、', meaning: 'mas,' },
          { text: 'お客さんに', reading: 'おきゃくさんに', meaning: 'pelos clientes' },
          { text: '感謝されると、', reading: 'かんしゃされると、', meaning: 'quando sou agradecido,' },
          { text: '嬉しいです。', reading: 'うれしいです。', meaning: 'fico feliz' },
        ],
        translation: 'Mas fico feliz quando um cliente me agradece.',
      },
      {
        words: [
          { text: '先輩たちも、', reading: 'せんぱいたちも、', meaning: 'os colegas mais experientes também,' },
          { text: 'とても', meaning: 'muito' },
          { text: '優しいです。', reading: 'やさしいです。', meaning: 'são gentis' },
        ],
        translation: 'Os colegas mais experientes também são muito gentis.',
      },
      {
        words: [
          { text: 'このバイトを', meaning: 'este trabalho (+ partícula de objeto)' },
          { text: '通して、', reading: 'とおして、', meaning: 'através de,' },
          { text: '色々な', reading: 'いろいろな', meaning: 'várias' },
          { text: 'ことを', meaning: 'coisas (+ partícula de objeto)' },
          { text: '学んでいます。', reading: 'まなんでいます。', meaning: 'estou aprendendo' },
        ],
        translation: 'Através deste trabalho, estou aprendendo várias coisas.',
      },
    ],
  },
  {
    id: 'shizukana-yoru',
    title: 'しずかな よる',
    level: 2,
    wordCount: 61,
    summaryPt: 'Uma noite tranquila em casa, perdida num bom livro enquanto chove lá fora.',
    lines: [
      {
        words: [
          { text: '今夜は', reading: 'こんやは', meaning: 'esta noite' },
          { text: '誰も', reading: 'だれも', meaning: 'ninguém' },
          { text: '予定が', reading: 'よていが', meaning: 'plano/compromisso (+ partícula de sujeito)' },
          { text: 'ありません。', meaning: 'não tem' },
        ],
        translation: 'Esta noite não tenho nenhum compromisso.',
      },
      {
        words: [
          { text: 'お茶を', reading: 'おちゃを', meaning: 'chá (+ partícula de objeto)' },
          { text: '入れて、', reading: 'いれて、', meaning: 'preparei, e' },
          { text: 'ソファに', meaning: 'no sofá' },
          { text: '座りました。', reading: 'すわりました。', meaning: 'sentei' },
        ],
        translation: 'Preparei um chá e sentei no sofá.',
      },
      {
        words: [
          { text: '好きな', reading: 'すきな', meaning: 'de que gosto' },
          { text: '本を', reading: 'ほんを', meaning: 'livro (+ partícula de objeto)' },
          { text: '読み始めました。', reading: 'よみはじめました。', meaning: 'comecei a ler' },
        ],
        translation: 'Comecei a ler um livro de que gosto.',
      },
      {
        words: [
          { text: '外は', reading: 'そとは', meaning: 'do lado de fora' },
          { text: '静かで、', reading: 'しずかで、', meaning: 'estava quieto, e' },
          { text: '雨の', reading: 'あめの', meaning: 'da chuva' },
          { text: '音だけ', reading: 'おとだけ', meaning: 'só o som' },
          { text: '聞こえました。', reading: 'きこえました。', meaning: 'se ouvia' },
        ],
        translation: 'Lá fora estava quieto, só se ouvia o som da chuva.',
      },
      {
        words: [
          { text: '時間を', reading: 'じかんを', meaning: 'o tempo (+ partícula de objeto)' },
          { text: '忘れるくらい、', reading: 'わすれるくらい、', meaning: 'a ponto de esquecer,' },
          { text: '物語に', reading: 'ものがたりに', meaning: 'na história' },
          { text: '夢中に', reading: 'むちゅうに', meaning: 'absorto' },
          { text: 'なりました。', meaning: 'fiquei' },
        ],
        translation: 'Fiquei tão absorto na história que esqueci do tempo.',
      },
      {
        words: [
          { text: '気がついたら、', reading: 'きがついたら、', meaning: 'quando percebi,' },
          { text: 'もう', meaning: 'já' },
          { text: '十二時でした。', reading: 'じゅうにじでした。', meaning: 'era meia-noite' },
        ],
        translation: 'Quando percebi, já era meia-noite.',
      },
      {
        words: [
          { text: 'こんな', meaning: 'desse jeito, assim' },
          { text: '静かな', reading: 'しずかな', meaning: 'tranquila' },
          { text: '夜も', reading: 'よるも', meaning: 'noite também' },
          { text: 'たまには', meaning: 'de vez em quando' },
          { text: 'いいですね。', meaning: 'é bom, né' },
        ],
        translation: 'Uma noite tranquila assim, de vez em quando, também é boa, né.',
      },
      {
        words: [
          { text: 'お茶が', reading: 'おちゃが', meaning: 'o chá (+ partícula de sujeito)' },
          { text: '冷めても、', reading: 'さめても、', meaning: 'mesmo esfriando,' },
          { text: '気づきませんでした。', reading: 'きづきませんでした。', meaning: 'não percebi' },
        ],
        translation: 'Mesmo o chá esfriando, eu nem percebi.',
      },
      {
        words: [
          { text: '続きが', reading: 'つづきが', meaning: 'a continuação (+ partícula de sujeito)' },
          { text: '気になって、', reading: 'きになって、', meaning: 'fiquei curioso, e' },
          { text: '眠れませんでした。', reading: 'ねむれませんでした。', meaning: 'não consegui dormir' },
        ],
        translation: 'Fiquei curioso pela continuação e não consegui dormir.',
      },
      {
        words: [
          { text: '結局、', reading: 'けっきょく、', meaning: 'no final,' },
          { text: '朝まで', reading: 'あさまで', meaning: 'até de manhã' },
          { text: '読んでしまいました。', reading: 'よんでしまいました。', meaning: 'acabei lendo' },
        ],
        translation: 'No final, acabei lendo até de manhã.',
      },
      {
        words: [
          { text: '明日は、', reading: 'あしたは、', meaning: 'amanhã,' },
          { text: '続きの', reading: 'つづきの', meaning: 'da continuação' },
          { text: '本を', reading: 'ほんを', meaning: 'livro (+ partícula de objeto)' },
          { text: '買いに', reading: 'かいに', meaning: 'para comprar' },
          { text: '行きます。', reading: 'いきます。', meaning: 'vou' },
        ],
        translation: 'Amanhã, vou comprar o livro seguinte.',
      },
    ],
  },
  {
    id: 'unten-menkyo',
    title: 'うんてん めんきょ',
    level: 2,
    wordCount: 40,
    summaryPt: 'Os meses de aula na autoescola até finalmente conseguir a carteira de motorista.',
    lines: [
      {
        words: [
          { text: '三か月前から、', reading: 'さんかげつまえから、', meaning: 'desde três meses atrás,' },
          { text: '自動車学校に', reading: 'じどうしゃがっこうに', meaning: 'na autoescola' },
          { text: '通っています。', reading: 'かよっています。', meaning: 'estou frequentando' },
        ],
        translation: 'Desde três meses atrás, estou frequentando a autoescola.',
      },
      {
        words: [
          { text: '運転は、', reading: 'うんてんは、', meaning: 'dirigir,' },
          { text: '最初', reading: 'さいしょ', meaning: 'no início' },
          { text: 'とても', meaning: 'muito' },
          { text: '難しかったです。', reading: 'むずかしかったです。', meaning: 'foi difícil' },
        ],
        translation: 'Dirigir, no início, foi muito difícil.',
      },
      {
        words: [
          { text: '先生は、', reading: 'せんせいは、', meaning: 'o instrutor,' },
          { text: '優しく', reading: 'やさしく', meaning: 'com gentileza' },
          { text: '教えてくれました。', reading: 'おしえてくれました。', meaning: 'me ensinou' },
        ],
        translation: 'O instrutor me ensinou com gentileza.',
      },
      {
        words: [
          { text: '少しずつ、', reading: 'すこしずつ、', meaning: 'aos poucos,' },
          { text: '運転に', reading: 'うんてんに', meaning: 'a dirigir' },
          { text: '慣れてきました。', reading: 'なれてきました。', meaning: 'fui me acostumando' },
        ],
        translation: 'Aos poucos, fui me acostumando a dirigir.',
      },
      {
        words: [
          { text: '先週、', reading: 'せんしゅう、', meaning: 'semana passada,' },
          { text: '筆記試験を', reading: 'ひっきしけんを', meaning: 'a prova escrita (+ partícula de objeto)' },
          { text: '受けました。', reading: 'うけました。', meaning: 'fiz' },
        ],
        translation: 'Semana passada, fiz a prova escrita.',
      },
      {
        words: [
          { text: '合格して、', reading: 'ごうかくして、', meaning: 'passei, e' },
          { text: 'とても', meaning: 'muito' },
          { text: '嬉しかったです。', reading: 'うれしかったです。', meaning: 'fiquei feliz' },
        ],
        translation: 'Passei, e fiquei muito feliz.',
      },
      {
        words: [
          { text: '今日は、', reading: 'きょうは、', meaning: 'hoje,' },
          { text: '最後の', reading: 'さいごの', meaning: 'a última' },
          { text: '実技試験でした。', reading: 'じつぎしけんでした。', meaning: 'foi a prova prática' },
        ],
        translation: 'Hoje foi a prova prática final.',
      },
      {
        words: [
          { text: '緊張しましたが、', reading: 'きんちょうしましたが、', meaning: 'fiquei nervoso, mas' },
          { text: '落ち着いて', reading: 'おちついて', meaning: 'com calma' },
          { text: '運転しました。', reading: 'うんてんしました。', meaning: 'dirigi' },
        ],
        translation: 'Fiquei nervoso, mas dirigi com calma.',
      },
      {
        words: [
          { text: 'とうとう、', meaning: 'finalmente,' },
          { text: '免許を', reading: 'めんきょを', meaning: 'a carteira (+ partícula de objeto)' },
          { text: 'もらいました。', meaning: 'recebi' },
        ],
        translation: 'Finalmente, recebi a carteira.',
      },
      {
        words: [
          { text: '家族が、', reading: 'かぞくが、', meaning: 'minha família,' },
          { text: '一番', reading: 'いちばん', meaning: 'a mais' },
          { text: '喜んでくれました。', reading: 'よろこんでくれました。', meaning: 'ficou feliz por mim' },
        ],
        translation: 'Minha família foi quem mais ficou feliz.',
      },
      {
        words: [
          { text: '今度、', reading: 'こんど、', meaning: 'da próxima vez,' },
          { text: '一人で', reading: 'ひとりで', meaning: 'sozinho' },
          { text: '運転してみたいです。', reading: 'うんてんしてみたいです。', meaning: 'quero tentar dirigir' },
        ],
        translation: 'Da próxima vez, quero tentar dirigir sozinho.',
      },
    ],
  },
  {
    id: 'supootsu-kurabu',
    title: 'スポーツクラブ',
    level: 2,
    wordCount: 40,
    summaryPt: 'A rotina de exercícios do narrador numa academia perto de casa, e os resultados aos poucos.',
    lines: [
      {
        words: [
          { text: '半年前から、', reading: 'はんとしまえから、', meaning: 'desde seis meses atrás,' },
          { text: 'スポーツクラブに', meaning: 'a uma academia' },
          { text: '通っています。', reading: 'かよっています。', meaning: 'estou frequentando' },
        ],
        translation: 'Desde seis meses atrás, estou frequentando uma academia.',
      },
      {
        words: [
          { text: '仕事の後、', reading: 'しごとのあと、', meaning: 'depois do trabalho,' },
          { text: '週に', reading: 'しゅうに', meaning: 'por semana' },
          { text: '三回', reading: 'さんかい', meaning: 'três vezes' },
          { text: '行きます。', reading: 'いきます。', meaning: 'vou' },
        ],
        translation: 'Depois do trabalho, vou três vezes por semana.',
      },
      {
        words: [
          { text: '最初は、', reading: 'さいしょは、', meaning: 'no início,' },
          { text: '十分も', reading: 'じゅっぷんも', meaning: 'nem dez minutos' },
          { text: '走れませんでした。', reading: 'はしれませんでした。', meaning: 'eu não conseguia correr' },
        ],
        translation: 'No início, eu nem conseguia correr dez minutos.',
      },
      {
        words: [
          { text: '今は、', reading: 'いまは、', meaning: 'agora,' },
          { text: '三十分', reading: 'さんじゅっぷん', meaning: 'trinta minutos' },
          { text: '走れるように', reading: 'はしれるように', meaning: 'a conseguir correr' },
          { text: 'なりました。', meaning: 'passei' },
        ],
        translation: 'Agora já consigo correr trinta minutos.',
      },
      {
        words: [
          { text: 'トレーナーが、', meaning: 'o treinador,' },
          { text: '正しい', reading: 'ただしい', meaning: 'correto' },
          { text: '方法を', reading: 'ほうほうを', meaning: 'o modo (+ partícula de objeto)' },
          { text: '教えてくれます。', reading: 'おしえてくれます。', meaning: 'me ensina' },
        ],
        translation: 'O treinador me ensina o jeito certo de fazer.',
      },
      {
        words: [
          { text: '筋肉も、', reading: 'きんにくも、', meaning: 'os músculos também,' },
          { text: '少し', reading: 'すこし', meaning: 'um pouco' },
          { text: '増えてきました。', reading: 'ふえてきました。', meaning: 'foram aumentando' },
        ],
        translation: 'Meus músculos também aumentaram um pouco.',
      },
      {
        words: [
          { text: '運動の後は、', reading: 'うんどうのあとは、', meaning: 'depois de me exercitar,' },
          { text: '体が', reading: 'からだが', meaning: 'o corpo (+ partícula de sujeito)' },
          { text: '軽く', reading: 'かるく', meaning: 'leve' },
          { text: '感じます。', reading: 'かんじます。', meaning: 'sinto' },
        ],
        translation: 'Depois de me exercitar, sinto o corpo mais leve.',
      },
      {
        words: [
          { text: 'クラブで、', meaning: 'na academia,' },
          { text: '新しい', reading: 'あたらしい', meaning: 'novos' },
          { text: '友達も', reading: 'ともだちも', meaning: 'amigos também' },
          { text: 'できました。', meaning: 'fiz' },
        ],
        translation: 'Também fiz amigos novos na academia.',
      },
      {
        words: [
          { text: '週末は、', reading: 'しゅうまつは、', meaning: 'no fim de semana,' },
          { text: 'みんなで', meaning: 'todos juntos' },
          { text: '一緒に', reading: 'いっしょに', meaning: 'juntos' },
          { text: '運動します。', reading: 'うんどうします。', meaning: 'nos exercitamos' },
        ],
        translation: 'No fim de semana, todos nós nos exercitamos juntos.',
      },
      {
        words: [
          { text: '体重も、', reading: 'たいじゅうも、', meaning: 'o peso também,' },
          { text: '少し', reading: 'すこし', meaning: 'um pouco' },
          { text: '減りました。', reading: 'へりました。', meaning: 'diminuiu' },
        ],
        translation: 'Meu peso também diminuiu um pouco.',
      },
      {
        words: [
          { text: 'これからも、', meaning: 'de agora em diante também,' },
          { text: '健康のために', reading: 'けんこうのために', meaning: 'pela saúde' },
          { text: '続けたいです。', reading: 'つづけたいです。', meaning: 'quero continuar' },
        ],
        translation: 'De agora em diante também, quero continuar pela saúde.',
      },
    ],
  },
  {
    id: 'purezento-wo-erabu',
    title: 'プレゼントを えらぶ',
    level: 2,
    wordCount: 38,
    summaryPt: 'A busca por um presente de aniversário perfeito para um amigo, entre lojas e ideias.',
    lines: [
      {
        words: [
          { text: '来週、', reading: 'らいしゅう、', meaning: 'semana que vem,' },
          { text: '友達の', reading: 'ともだちの', meaning: 'de um amigo' },
          { text: '誕生日が', reading: 'たんじょうびが', meaning: 'o aniversário (+ partícula de sujeito)' },
          { text: 'あります。', meaning: 'há' },
        ],
        translation: 'Semana que vem, é aniversário de um amigo.',
      },
      {
        words: [
          { text: '何を', reading: 'なにを', meaning: 'o quê (+ partícula de objeto)' },
          { text: 'あげようか、', meaning: 'vou dar,' },
          { text: 'ずっと', meaning: 'o tempo todo' },
          { text: '考えています。', reading: 'かんがえています。', meaning: 'fico pensando' },
        ],
        translation: 'Fico pensando o tempo todo no que dar de presente.',
      },
      {
        words: [
          { text: '友達は、', reading: 'ともだちは、', meaning: 'meu amigo,' },
          { text: 'コーヒーが', meaning: 'café (+ partícula de sujeito)' },
          { text: '好きです。', reading: 'すきです。', meaning: 'gosta' },
        ],
        translation: 'Meu amigo gosta de café.',
      },
      {
        words: [
          { text: 'だから、', meaning: 'por isso,' },
          { text: 'いい', meaning: 'boa' },
          { text: 'コーヒーカップを', meaning: 'xícara de café (+ partícula de objeto)' },
          { text: '探しました。', reading: 'さがしました。', meaning: 'procurei' },
        ],
        translation: 'Por isso, procurei uma boa xícara de café.',
      },
      {
        words: [
          { text: 'デパートで、', meaning: 'no shopping,' },
          { text: '素敵な', reading: 'すてきな', meaning: 'linda' },
          { text: 'カップを', meaning: 'xícara (+ partícula de objeto)' },
          { text: '見つけました。', reading: 'みつけました。', meaning: 'encontrei' },
        ],
        translation: 'Encontrei uma xícara linda no shopping.',
      },
      {
        words: [
          { text: 'でも、', meaning: 'mas,' },
          { text: '少し', reading: 'すこし', meaning: 'um pouco' },
          { text: '値段が', reading: 'ねだんが', meaning: 'o preço (+ partícula de sujeito)' },
          { text: '高かったです。', reading: 'たかかったです。', meaning: 'estava alto' },
        ],
        translation: 'Mas o preço era um pouco alto.',
      },
      {
        words: [
          { text: '店員さんに、', reading: 'てんいんさんに、', meaning: 'com a vendedora,' },
          { text: '相談してみました。', reading: 'そうだんしてみました。', meaning: 'consultei' },
        ],
        translation: 'Consultei a vendedora.',
      },
      {
        words: [
          { text: '結局、', reading: 'けっきょく、', meaning: 'no final,' },
          { text: 'そのカップを', meaning: 'aquela xícara (+ partícula de objeto)' },
          { text: '買うことに', reading: 'かうことに', meaning: 'a comprar' },
          { text: 'しました。', meaning: 'decidi' },
        ],
        translation: 'No final, decidi comprar aquela xícara.',
      },
      {
        words: [
          { text: 'かわいい', meaning: 'bonito' },
          { text: '紙で、', reading: 'かみで、', meaning: 'com papel,' },
          { text: '包んでもらいました。', reading: 'つつんでもらいました。', meaning: 'pedi para embrulhar' },
        ],
        translation: 'Pedi para embrulhar num papel bonito.',
      },
      {
        words: [
          { text: '友達が、', reading: 'ともだちが、', meaning: 'meu amigo,' },
          { text: '驚いてくれると', reading: 'おどろいてくれると', meaning: 'se surpreender' },
          { text: 'いいです。', meaning: 'espero que' },
        ],
        translation: 'Espero que meu amigo se surpreenda.',
      },
      {
        words: [
          { text: 'プレゼントを', meaning: 'presente (+ partícula de objeto)' },
          { text: '選ぶのも、', reading: 'えらぶのも、', meaning: 'escolher também,' },
          { text: '楽しい', reading: 'たのしい', meaning: 'divertido' },
          { text: '時間です。', reading: 'じかんです。', meaning: 'é um momento' },
        ],
        translation: 'Escolher um presente também é um momento divertido.',
      },
    ],
  },
  {
    id: 'atarashii-petto',
    title: 'あたらしい ペット',
    level: 2,
    wordCount: 40,
    summaryPt: 'A chegada de uma gatinha nova para casa, do primeiro dia tímido à rotina de carinho.',
    lines: [
      {
        words: [
          { text: '先週から、', reading: 'せんしゅうから、', meaning: 'desde a semana passada,' },
          { text: '猫を', reading: 'ねこを', meaning: 'gata (+ partícula de objeto)' },
          { text: '飼い始めました。', reading: 'かいはじめました。', meaning: 'comecei a criar' },
        ],
        translation: 'Desde a semana passada, comecei a criar uma gata.',
      },
      {
        words: [
          { text: '名前は、', reading: 'なまえは、', meaning: 'o nome,' },
          { text: 'モモです。', meaning: 'é Momo' },
        ],
        translation: 'O nome dela é Momo.',
      },
      {
        words: [
          { text: '最初は、', reading: 'さいしょは、', meaning: 'no início,' },
          { text: 'ベッドの下に', reading: 'ベッドのしたに', meaning: 'embaixo da cama' },
          { text: '隠れていました。', reading: 'かくれていました。', meaning: 'ela ficava escondida' },
        ],
        translation: 'No início, ela ficava escondida embaixo da cama.',
      },
      {
        words: [
          { text: '毎日、', reading: 'まいにち、', meaning: 'a cada dia,' },
          { text: '少しずつ', reading: 'すこしずつ', meaning: 'aos poucos' },
          { text: '慣れてきました。', reading: 'なれてきました。', meaning: 'foi se acostumando' },
        ],
        translation: 'A cada dia, ela foi se acostumando aos poucos.',
      },
      {
        words: [
          { text: '今は、', reading: 'いまは、', meaning: 'agora,' },
          { text: '私の', reading: 'わたしの', meaning: 'meu' },
          { text: '膝の上で', reading: 'ひざのうえで', meaning: 'no colo' },
          { text: '寝ます。', reading: 'ねます。', meaning: 'dorme' },
        ],
        translation: 'Agora ela dorme no meu colo.',
      },
      {
        words: [
          { text: '朝、', reading: 'あさ、', meaning: 'de manhã,' },
          { text: 'ご飯を', reading: 'ごはんを', meaning: 'comida (+ partícula de objeto)' },
          { text: 'あげると、', meaning: 'quando dou,' },
          { text: '走ってきます。', reading: 'はしってきます。', meaning: 'vem correndo' },
        ],
        translation: 'De manhã, quando dou comida, ela vem correndo.',
      },
      {
        words: [
          { text: 'おもちゃで', meaning: 'com brinquedo' },
          { text: '遊ぶのが、', reading: 'あそぶのが、', meaning: 'brincar,' },
          { text: '大好きです。', reading: 'だいすきです。', meaning: 'ela adora' },
        ],
        translation: 'Ela adora brincar com brinquedos.',
      },
      {
        words: [
          { text: '病院で、', reading: 'びょういんで、', meaning: 'na clínica,' },
          { text: '注射も', reading: 'ちゅうしゃも', meaning: 'vacina também' },
          { text: '受けました。', reading: 'うけました。', meaning: 'tomou, recebeu' },
        ],
        translation: 'Na clínica, ela também tomou vacina.',
      },
      {
        words: [
          { text: '少し', reading: 'すこし', meaning: 'um pouco' },
          { text: '怖がっていましたが、', reading: 'こわがっていましたが、', meaning: 'ficou assustada, mas' },
          { text: '大丈夫でした。', reading: 'だいじょうぶでした。', meaning: 'ficou tudo bem' },
        ],
        translation: 'Ela ficou um pouco assustada, mas ficou tudo bem.',
      },
      {
        words: [
          { text: 'モモが', meaning: 'a Momo (+ partícula de sujeito)' },
          { text: 'いると、', meaning: 'quando está,' },
          { text: '家が', reading: 'いえが', meaning: 'a casa (+ partícula de sujeito)' },
          { text: '明るく', reading: 'あかるく', meaning: 'alegre' },
          { text: 'なりました。', meaning: 'ficou' },
        ],
        translation: 'Com a Momo em casa, tudo ficou mais alegre.',
      },
      {
        words: [
          { text: 'これからも、', meaning: 'de agora em diante também,' },
          { text: '大切に', reading: 'たいせつに', meaning: 'com carinho' },
          { text: '育てたいです。', reading: 'そだてたいです。', meaning: 'quero criar' },
        ],
        translation: 'Quero continuar cuidando bem dela de agora em diante.',
      },
    ],
  },
  {
    id: 'toshokan-de-benkyou',
    title: 'としょかんで べんきょう',
    level: 2,
    wordCount: 40,
    summaryPt: 'A reta final de estudos para uma prova importante, dias inteiros na biblioteca da cidade.',
    lines: [
      {
        words: [
          { text: '来月、', reading: 'らいげつ、', meaning: 'mês que vem,' },
          { text: '大事な', reading: 'だいじな', meaning: 'importante' },
          { text: '試験が', reading: 'しけんが', meaning: 'prova (+ partícula de sujeito)' },
          { text: 'あります。', meaning: 'há' },
        ],
        translation: 'Mês que vem, tenho uma prova importante.',
      },
      {
        words: [
          { text: '毎日、', reading: 'まいにち、', meaning: 'todo dia,' },
          { text: '図書館で', reading: 'としょかんで', meaning: 'na biblioteca' },
          { text: '勉強しています。', reading: 'べんきょうしています。', meaning: 'estou estudando' },
        ],
        translation: 'Todo dia, estou estudando na biblioteca.',
      },
      {
        words: [
          { text: '図書館は、', reading: 'としょかんは、', meaning: 'a biblioteca,' },
          { text: '朝', reading: 'あさ', meaning: 'de manhã' },
          { text: '九時に', reading: 'くじに', meaning: 'às nove horas' },
          { text: '開きます。', reading: 'ひらきます。', meaning: 'abre' },
        ],
        translation: 'A biblioteca abre às nove da manhã.',
      },
      {
        words: [
          { text: '静かな', reading: 'しずかな', meaning: 'silencioso' },
          { text: '場所で、', reading: 'ばしょで、', meaning: 'num lugar,' },
          { text: '集中できます。', reading: 'しゅうちゅうできます。', meaning: 'consigo me concentrar' },
        ],
        translation: 'Consigo me concentrar num lugar silencioso.',
      },
      {
        words: [
          { text: '分からない', reading: 'わからない', meaning: 'que não entendo' },
          { text: '問題は、', reading: 'もんだいは、', meaning: 'as questões,' },
          { text: '友達に', reading: 'ともだちに', meaning: 'para amigos' },
          { text: '聞きます。', reading: 'ききます。', meaning: 'pergunto' },
        ],
        translation: 'As questões que não entendo, pergunto para amigos.',
      },
      {
        words: [
          { text: '休憩の時、', reading: 'きゅうけいのとき、', meaning: 'na hora do intervalo,' },
          { text: 'コーヒーを', meaning: 'café (+ partícula de objeto)' },
          { text: '飲みます。', reading: 'のみます。', meaning: 'tomo' },
        ],
        translation: 'Na hora do intervalo, tomo café.',
      },
      {
        words: [
          { text: '長い時間', reading: 'ながいじかん', meaning: 'por muito tempo' },
          { text: '座っていると、', reading: 'すわっていると、', meaning: 'quando fico sentado,' },
          { text: '疲れます。', reading: 'つかれます。', meaning: 'fico cansado' },
        ],
        translation: 'Quando fico sentado por muito tempo, fico cansado.',
      },
      {
        words: [
          { text: 'でも、', meaning: 'mas,' },
          { text: '諦めずに', reading: 'あきらめずに', meaning: 'sem desistir' },
          { text: '頑張っています。', reading: 'がんばっています。', meaning: 'estou me esforçando' },
        ],
        translation: 'Mas estou me esforçando sem desistir.',
      },
      {
        words: [
          { text: '夜、', reading: 'よる、', meaning: 'à noite,' },
          { text: '家に', reading: 'いえに', meaning: 'para casa' },
          { text: '帰ってからも', reading: 'かえってからも', meaning: 'mesmo depois de voltar' },
          { text: '復習します。', reading: 'ふくしゅうします。', meaning: 'revejo a matéria' },
        ],
        translation: 'À noite, mesmo depois de voltar para casa, revejo a matéria.',
      },
      {
        words: [
          { text: '試験まで、', reading: 'しけんまで、', meaning: 'até a prova,' },
          { text: 'あと', meaning: 'faltam' },
          { text: '少しです。', reading: 'すこしです。', meaning: 'poucos dias' },
        ],
        translation: 'Falta pouco para a prova.',
      },
      {
        words: [
          { text: '頑張った', reading: 'がんばった', meaning: 'que me esforcei' },
          { text: '結果が、', reading: 'けっかが、', meaning: 'o resultado,' },
          { text: 'いい', meaning: 'boa' },
          { text: '点数に', reading: 'てんすうに', meaning: 'em nota' },
          { text: 'なるといいです。', meaning: 'espero que vire' },
        ],
        translation: 'Espero que o resultado do meu esforço vire uma boa nota.',
      },
    ],
  },
];

export function getTextoById(id: string): ReadingText | undefined {
  return LEITURA_TEXTOS.find((t) => t.id === id);
}
