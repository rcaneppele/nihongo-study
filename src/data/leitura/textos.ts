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
    wordCount: 20,
    summaryPt: 'Uma breve apresentação pessoal: nome, nacionalidade, idade e o que estuda.',
    lines: [
      [{ text: 'はじめまして。', meaning: 'muito prazer (ao se apresentar pela primeira vez)' }],
      [
        { text: 'わたしは', meaning: 'eu (+ partícula de tópico)' },
        { text: 'たなかです。', meaning: 'sou a Tanaka' },
      ],
      [{ text: 'にほんじんです。', meaning: 'sou japonesa' }],
      [{ text: 'がくせいです。', meaning: 'sou estudante' }],
      [{ text: 'にじゅっさいです。', meaning: 'tenho vinte anos' }],
      [
        { text: 'まいにち', meaning: 'todo dia' },
        { text: 'にほんごを', meaning: 'japonês (+ partícula de objeto)' },
        { text: 'べんきょうします。', meaning: 'estudo' },
      ],
      [
        { text: 'にほんごは', meaning: 'o japonês (+ partícula de tópico)' },
        { text: 'たのしいです。', meaning: 'é divertido' },
      ],
      [{ text: 'どうぞ' }, { text: 'よろしく', meaning: 'conte comigo, um prazer' }, { text: 'おねがいします。', meaning: '(fórmula de cortesia)' }],
    ],
  },
  {
    id: 'seikatsu',
    title: 'まいにちの せいかつ',
    level: 1,
    wordCount: 24,
    summaryPt: 'A rotina de um dia comum, do café da manhã até a hora de dormir.',
    lines: [
      [
        { text: 'まいあさ', meaning: 'toda manhã' },
        { text: 'ろくじに', meaning: 'às seis horas' },
        { text: 'おきます。', meaning: 'acordo' },
      ],
      [
        { text: 'かおを', meaning: 'o rosto (+ partícula de objeto)' },
        { text: 'あらって、', meaning: 'lavo, e' },
        { text: 'あさごはんを', meaning: 'o café da manhã (+ partícula de objeto)' },
        { text: 'たべます。', meaning: 'como' },
      ],
      [
        { text: 'しちじはんに', meaning: 'às sete e meia' },
        { text: 'いえを', meaning: 'de casa (+ partícula de origem/saída)' },
        { text: 'でます。', meaning: 'saio' },
      ],
      [
        { text: 'でんしゃで', meaning: 'de trem' },
        { text: 'がっこうへ', meaning: 'para a escola' },
        { text: 'いきます。', meaning: 'vou' },
      ],
      [
        { text: 'がっこうで', meaning: 'na escola' },
        { text: 'にほんごと', meaning: 'japonês e' },
        { text: 'えいごを', meaning: 'inglês (+ partícula de objeto)' },
        { text: 'べんきょうします。', meaning: 'estudo' },
      ],
      [
        { text: 'ひるごはんは', meaning: 'o almoço' },
        { text: 'ともだちと', meaning: 'com amigos' },
        { text: 'たべます。', meaning: 'como' },
      ],
      [
        { text: 'ごごは', meaning: 'à tarde' },
        { text: 'としょかんで', meaning: 'na biblioteca' },
        { text: 'ほんを', meaning: 'livro (+ partícula de objeto)' },
        { text: 'よみます。', meaning: 'leio' },
      ],
      [
        { text: 'よる', meaning: 'à noite' },
        { text: 'じゅうじに', meaning: 'às dez horas' },
        { text: 'ねます。', meaning: 'durmo' },
      ],
    ],
  },
  {
    id: 'kaimono',
    title: 'スーパーで かいもの',
    level: 1,
    wordCount: 22,
    summaryPt: 'Uma ida ao mercado para comprar frutas, verduras e leite.',
    lines: [
      [
        { text: 'きょう', meaning: 'hoje' },
        { text: 'スーパーへ', meaning: 'para o supermercado' },
        { text: 'いきました。', meaning: 'fui' },
      ],
      [
        { text: 'やさいと', meaning: 'verduras e' },
        { text: 'くだものを', meaning: 'frutas (+ partícula de objeto)' },
        { text: 'かいました。', meaning: 'comprei' },
      ],
      [
        { text: 'りんごは', meaning: 'a maçã' },
        { text: 'ひとつ', meaning: 'uma unidade' },
        { text: 'ひゃくえんでした。', meaning: 'custava cem ienes' },
      ],
      [
        { text: 'ぎゅうにゅうも', meaning: 'leite também' },
        { text: 'かいました。', meaning: 'comprei' },
      ],
      [
        { text: 'ぜんぶで', meaning: 'no total' },
        { text: 'さんぜんえんでした。', meaning: 'foi três mil ienes' },
      ],
      [
        { text: 'スーパーの', meaning: 'do supermercado' },
        { text: 'ひとは', meaning: 'a pessoa/funcionário' },
        { text: 'とても', meaning: 'muito' },
        { text: 'しんせつでした。', meaning: 'foi gentil' },
      ],
      [
        { text: 'うちに', meaning: 'para casa' },
        { text: 'かえって、', meaning: 'volto, e' },
        { text: 'りょうりを', meaning: 'comida/culinária (+ partícula de objeto)' },
        { text: 'しました。', meaning: 'fiz' },
      ],
      [{ text: 'とても', meaning: 'muito' }, { text: 'おいしかったです。', meaning: 'estava gostoso' }],
    ],
  },
  {
    id: 'kazoku',
    title: 'かぞく',
    level: 1,
    wordCount: 20,
    summaryPt: 'A família do narrador — pai, mãe, irmão mais velho — e o domingo que passam juntos.',
    lines: [
      [
        { text: 'わたしの', meaning: 'minha' },
        { text: 'かぞくは', meaning: 'a família (+ partícula de tópico)' },
        { text: 'よにんです。', meaning: 'são quatro pessoas' },
      ],
      [
        { text: 'ちちと', meaning: 'pai e' },
        { text: 'ははと', meaning: 'mãe e' },
        { text: 'あにが', meaning: 'irmão mais velho (+ partícula de sujeito)' },
        { text: 'います。', meaning: 'há, existe (seres vivos)' },
      ],
      [
        { text: 'ちちは', meaning: 'meu pai' },
        { text: 'かいしゃいんです。', meaning: 'é funcionário de empresa' },
      ],
      [
        { text: 'ははは', meaning: 'minha mãe' },
        { text: 'りょうりが', meaning: 'culinária (+ partícula de sujeito)' },
        { text: 'じょうずです。', meaning: 'é boa em, é hábil' },
      ],
      [
        { text: 'あには', meaning: 'meu irmão mais velho' },
        { text: 'だいがくせいです。', meaning: 'é universitário' },
      ],
      [
        { text: 'みんな', meaning: 'todos' },
        { text: 'なかが', meaning: 'relação (+ partícula de sujeito)' },
        { text: 'いいです。', meaning: 'é boa' },
      ],
      [
        { text: 'にちようびは', meaning: 'aos domingos' },
        { text: 'いつも', meaning: 'sempre' },
        { text: 'かぞくで', meaning: 'em família' },
        { text: 'しょくじを', meaning: 'refeição (+ partícula de objeto)' },
        { text: 'します。', meaning: 'fazemos' },
      ],
      [
        { text: 'わたしは', meaning: 'eu' },
        { text: 'かぞくが', meaning: 'a família (+ partícula de sujeito/objeto emocional)' },
        { text: 'だいすきです。', meaning: 'amo, gosto muito' },
      ],
    ],
  },
  {
    id: 'tenki',
    title: 'てんき',
    level: 1,
    wordCount: 18,
    summaryPt: 'As quatro estações do ano e o tipo de tempo de cada uma.',
    lines: [
      [
        { text: 'きょうは', meaning: 'hoje' },
        { text: 'はるです。', meaning: 'é primavera' },
      ],
      [
        { text: 'てんきが', meaning: 'o tempo (+ partícula de sujeito)' },
        { text: 'とても', meaning: 'muito' },
        { text: 'いいです。', meaning: 'está bom' },
      ],
      [
        { text: 'そらは', meaning: 'o céu' },
        { text: 'あおくて、', meaning: 'está azul, e' },
        { text: 'かぜが', meaning: 'o vento (+ partícula de sujeito)' },
        { text: 'きもち', meaning: 'sensação' },
        { text: 'いいです。', meaning: 'é boa, é agradável' },
      ],
      [
        { text: 'なつは', meaning: 'o verão' },
        { text: 'とても', meaning: 'muito' },
        { text: 'あついです。', meaning: 'é quente' },
      ],
      [
        { text: 'あきは', meaning: 'o outono' },
        { text: 'すずしくて、', meaning: 'é fresco, e' },
        { text: 'きれいです。', meaning: 'é bonito' },
      ],
      [
        { text: 'ふゆは', meaning: 'o inverno' },
        { text: 'さむくて、', meaning: 'é frio, e' },
        { text: 'ゆきが', meaning: 'a neve (+ partícula de sujeito)' },
        { text: 'ふります。', meaning: 'cai (neve/chuva)' },
      ],
      [
        { text: 'わたしは', meaning: 'eu' },
        { text: 'はると', meaning: 'primavera e' },
        { text: 'あきが', meaning: 'outono (+ partícula de sujeito)' },
        { text: 'すきです。', meaning: 'gosto' },
      ],
    ],
  },
  {
    id: 'dokusho',
    title: 'どくしょが すき',
    level: 1,
    wordCount: 20,
    summaryPt: 'Por que a leitura é o hobby favorito do narrador.',
    lines: [
      [
        { text: 'わたしの', meaning: 'meu' },
        { text: 'しゅみは', meaning: 'o hobby (+ partícula de tópico)' },
        { text: 'どくしょです。', meaning: 'é leitura' },
      ],
      [
        { text: 'まいばん', meaning: 'toda noite' },
        { text: 'ねる', meaning: 'dormir' },
        { text: 'まえに', meaning: 'antes de' },
        { text: 'ほんを', meaning: 'livro (+ partícula de objeto)' },
        { text: 'よみます。', meaning: 'leio' },
      ],
      [
        { text: 'すきな', meaning: 'favorito, de que gosto' },
        { text: 'ほんは', meaning: 'o livro' },
        { text: 'おもしろい', meaning: 'interessante' },
        { text: 'ものがたりです。', meaning: 'é uma história' },
      ],
      [
        { text: 'としょかんへ', meaning: 'para a biblioteca' },
        { text: 'よく', meaning: 'frequentemente' },
        { text: 'いきます。', meaning: 'vou' },
      ],
      [
        { text: 'としょかんは', meaning: 'a biblioteca' },
        { text: 'しずかで、', meaning: 'é silenciosa, e' },
        { text: 'すきな', meaning: 'que eu gosto' },
        { text: 'ばしょです。', meaning: 'é um lugar' },
      ],
      [
        { text: 'いっしゅうかんに', meaning: 'em uma semana' },
        { text: 'にさつ', meaning: 'dois volumes (livros)' },
        { text: 'よみます。', meaning: 'leio' },
      ],
      [
        { text: 'どくしょは', meaning: 'a leitura' },
        { text: 'たのしくて、', meaning: 'é divertida, e' },
        { text: 'べんきょうにも', meaning: 'também em estudo' },
        { text: 'なります。', meaning: 'se torna' },
      ],
    ],
  },
  {
    id: 'shuumatsu-uchi',
    title: 'しゅうまつは うちで',
    level: 1,
    wordCount: 24,
    summaryPt: 'Um fim de semana tranquilo em casa, sem sair.',
    lines: [
      [
        { text: 'どようびの', meaning: 'de sábado' },
        { text: 'あさは', meaning: 'a manhã' },
        { text: 'ゆっくり', meaning: 'com calma, devagar' },
        { text: 'おきます。', meaning: 'acordo' },
      ],
      [
        { text: 'あさごはんを', meaning: 'o café da manhã (+ partícula de objeto)' },
        { text: 'たべながら、', meaning: 'enquanto como,' },
        { text: 'テレビを', meaning: 'TV (+ partícula de objeto)' },
        { text: 'みます。', meaning: 'assisto' },
      ],
      [
        { text: 'ごごは', meaning: 'de tarde' },
        { text: 'おんがくを', meaning: 'música (+ partícula de objeto)' },
        { text: 'ききます。', meaning: 'escuto' },
      ],
      [
        { text: 'ときどき', meaning: 'às vezes' },
        { text: 'ともだちと', meaning: 'com amigos' },
        { text: 'でかけます。', meaning: 'saio (de casa)' },
      ],
      [
        { text: 'にちようびは', meaning: 'no domingo' },
        { text: 'そうじを', meaning: 'faxina (+ partícula de objeto)' },
        { text: 'して、', meaning: 'faço, e' },
        { text: 'せんたくも', meaning: 'lavagem de roupa também' },
        { text: 'します。', meaning: 'faço' },
      ],
      [
        { text: 'よるは', meaning: 'a noite' },
        { text: 'はやく', meaning: 'cedo' },
        { text: 'ねます。', meaning: 'durmo' },
      ],
      [
        { text: 'しゅうまつは', meaning: 'o fim de semana' },
        { text: 'ゆっくり', meaning: 'com calma' },
        { text: 'できて、', meaning: 'consigo, e' },
        { text: 'いいです。', meaning: 'é bom' },
      ],
    ],
  },
  {
    id: 'suki-na-tabemono',
    title: 'すきな たべもの',
    level: 1,
    wordCount: 22,
    summaryPt: 'Por que o narrador ama sushi e como aproveita esse prato com a família.',
    lines: [
      [
        { text: 'わたしは', meaning: 'eu' },
        { text: 'すしが', meaning: 'sushi (+ partícula de sujeito)' },
        { text: 'だいすきです。', meaning: 'amo, gosto muito' },
      ],
      [
        { text: 'とくに、', meaning: 'especialmente,' },
        { text: 'さかなの', meaning: 'de peixe' },
        { text: 'すしが', meaning: 'sushi (+ partícula de sujeito)' },
        { text: 'すきです。', meaning: 'gosto' },
      ],
      [
        { text: 'しゅうまつに、', meaning: 'no fim de semana,' },
        { text: 'かぞくと', meaning: 'com a família' },
        { text: 'すしやへ', meaning: 'para a loja de sushi' },
        { text: 'いきます。', meaning: 'vou' },
      ],
      [
        { text: 'すしやさんは', meaning: 'a loja de sushi' },
        { text: 'いつも', meaning: 'sempre' },
        { text: 'こんでいます。', meaning: 'está cheia/lotada' },
      ],
      [
        { text: 'でも、', meaning: 'mas,' },
        { text: 'すしは', meaning: 'o sushi' },
        { text: 'とても', meaning: 'muito' },
        { text: 'おいしいです。', meaning: 'é gostoso' },
      ],
      [
        { text: 'わたしは', meaning: 'eu' },
        { text: 'おちゃも', meaning: 'chá também' },
        { text: 'いっしょに', meaning: 'junto' },
        { text: 'のみます。', meaning: 'bebo' },
      ],
      [
        { text: 'すしを', meaning: 'sushi (+ partícula de objeto)' },
        { text: 'たべる', meaning: 'comer' },
        { text: 'ひは、', meaning: 'o dia (é),' },
        { text: 'いつも', meaning: 'sempre' },
        { text: 'たのしいです。', meaning: 'é divertido' },
      ],
    ],
  },
  {
    id: 'denwa',
    title: 'でんわ',
    level: 1,
    wordCount: 26,
    summaryPt: 'Um telefonema de uma hora com um amigo, do "alô" ao "até mais".',
    lines: [
      [
        { text: 'きのう、', meaning: 'ontem,' },
        { text: 'ともだちに', meaning: 'para um amigo' },
        { text: 'でんわを', meaning: 'telefonema (+ partícula de objeto)' },
        { text: 'しました。', meaning: 'fiz' },
      ],
      [
        { text: 'さいしょに、', meaning: 'primeiro,' },
        { text: '「もしもし」と', meaning: '"alô", (+ partícula de citação)' },
        { text: 'いいました。', meaning: 'eu disse' },
      ],
      [
        { text: 'ともだちは', meaning: 'o amigo' },
        { text: 'げんきそうでした。', meaning: 'parecia estar bem' },
      ],
      [
        { text: 'がっこうの', meaning: 'da escola' },
        { text: 'はなしや、', meaning: 'história/conversa, e' },
        { text: 'しゅみの', meaning: 'de hobby' },
        { text: 'はなしを', meaning: 'conversa (+ partícula de objeto)' },
        { text: 'しました。', meaning: 'fizemos' },
      ],
      [
        { text: 'でんわは', meaning: 'o telefonema' },
        { text: 'いちじかん', meaning: 'uma hora' },
        { text: 'ぐらい', meaning: 'cerca de' },
        { text: 'つづきました。', meaning: 'durou, continuou' },
      ],
      [
        { text: 'さいごに、', meaning: 'no fim,' },
        { text: '「またね」と', meaning: '"até mais", (+ partícula de citação)' },
        { text: 'いって、', meaning: 'dizendo, e' },
        { text: 'でんわを', meaning: 'o telefone (+ partícula de objeto)' },
        { text: 'きりました。', meaning: 'desliguei, cortei' },
      ],
      [
        { text: 'とても', meaning: 'muito' },
        { text: 'たのしい', meaning: 'divertido' },
        { text: 'じかんでした。', meaning: 'foi um tempo/momento' },
      ],
    ],
  },
  {
    id: 'asa-no-gakkou',
    title: 'あさの がっこう',
    level: 1,
    wordCount: 24,
    summaryPt: 'A rotina da manhã, de acordar até o início da aula.',
    lines: [
      [
        { text: 'まいあさ、', meaning: 'toda manhã,' },
        { text: 'しちじに', meaning: 'às sete horas' },
        { text: 'おきます。', meaning: 'acordo' },
      ],
      [
        { text: 'はを', meaning: 'os dentes (+ partícula de objeto)' },
        { text: 'みがいて、', meaning: 'escovo, e' },
        { text: 'ふくを', meaning: 'a roupa (+ partícula de objeto)' },
        { text: 'きます。', meaning: 'visto' },
      ],
      [
        { text: 'あさごはんを', meaning: 'o café da manhã (+ partícula de objeto)' },
        { text: 'たべて、', meaning: 'como, e' },
        { text: 'かばんを', meaning: 'a mochila (+ partícula de objeto)' },
        { text: 'もちます。', meaning: 'seguro, carrego' },
      ],
      [
        { text: 'はちじに', meaning: 'às oito horas' },
        { text: 'いえを', meaning: 'de casa' },
        { text: 'でます。', meaning: 'saio' },
      ],
      [
        { text: 'がっこうまで', meaning: 'até a escola' },
        { text: 'あるいて', meaning: 'a pé (andando)' },
        { text: 'じゅっぷんです。', meaning: 'são dez minutos' },
      ],
      [
        { text: 'がっこうで', meaning: 'na escola' },
        { text: 'ともだちに', meaning: 'os amigos' },
        { text: 'あいます。', meaning: 'encontro' },
      ],
      [
        { text: 'じゅぎょうは', meaning: 'a aula' },
        { text: 'はちじはんに', meaning: 'às oito e meia' },
        { text: 'はじまります。', meaning: 'começa' },
      ],
    ],
  },
  {
    id: 'tanjoubi',
    title: 'たんじょうび',
    level: 1,
    wordCount: 22,
    summaryPt: 'A expectativa para o próprio aniversário, com festa e bolo.',
    lines: [
      [
        { text: 'あしたは', meaning: 'amanhã' },
        { text: 'わたしの', meaning: 'meu' },
        { text: 'たんじょうびです。', meaning: 'é aniversário' },
      ],
      [
        { text: 'ことしで', meaning: 'neste ano' },
        { text: 'にじゅういっさいに', meaning: 'vinte e um anos' },
        { text: 'なります。', meaning: 'me tornarei, farei' },
      ],
      [
        { text: 'かぞくが', meaning: 'a família (+ partícula de sujeito)' },
        { text: 'パーティーを', meaning: 'festa (+ partícula de objeto)' },
        { text: 'して', meaning: 'fazendo' },
        { text: 'くれます。', meaning: 'fazem (para mim, favor)' },
      ],
      [
        { text: 'ともだちも', meaning: 'amigos também' },
        { text: 'よびました。', meaning: 'chamei, convidei' },
      ],
      [
        { text: 'おいしい', meaning: 'gostoso' },
        { text: 'ケーキを', meaning: 'bolo (+ partícula de objeto)' },
        { text: 'たべる', meaning: 'comer' },
        { text: 'よていです。', meaning: 'é o plano, previsão' },
      ],
      [
        { text: 'みんなから', meaning: 'de todo mundo' },
        { text: 'プレゼントを', meaning: 'presente (+ partícula de objeto)' },
        { text: 'もらいます。', meaning: 'recebo' },
      ],
      [
        { text: 'とても', meaning: 'muito' },
        { text: 'たのしみです。', meaning: 'estou ansioso, aguardo com expectativa' },
      ],
    ],
  },
  {
    id: 'watashi-no-inu',
    title: 'わたしの いぬ',
    level: 1,
    wordCount: 24,
    summaryPt: 'O cachorro de estimação do narrador e o passeio diário no parque.',
    lines: [
      [
        { text: 'わたしは', meaning: 'eu' },
        { text: 'いぬを', meaning: 'cachorro (+ partícula de objeto)' },
        { text: 'かっています。', meaning: 'tenho, crio (animal)' },
      ],
      [
        { text: 'なまえは', meaning: 'o nome' },
        { text: 'ぽちです。', meaning: 'é Pochi' },
      ],
      [
        { text: 'まいあさ、', meaning: 'toda manhã,' },
        { text: 'こうえんで', meaning: 'no parque' },
        { text: 'さんぽを', meaning: 'passeio (+ partícula de objeto)' },
        { text: 'します。', meaning: 'faço' },
      ],
      [
        { text: 'ぽちは', meaning: 'o Pochi' },
        { text: 'とても', meaning: 'muito' },
        { text: 'げんきで、', meaning: 'é ativo/saudável, e' },
        { text: 'よく', meaning: 'bastante, frequentemente' },
        { text: 'はしります。', meaning: 'corre' },
      ],
      [
        { text: 'わたしを', meaning: 'a mim (+ partícula de objeto)' },
        { text: 'みると、', meaning: 'quando vê,' },
        { text: 'しっぽを', meaning: 'o rabo (+ partícula de objeto)' },
        { text: 'ふります。', meaning: 'abana, balança' },
      ],
      [
        { text: 'よる', meaning: 'à noite' },
        { text: 'いっしょに', meaning: 'juntos' },
        { text: 'ねます。', meaning: 'dormimos' },
      ],
      [
        { text: 'ぽちは', meaning: 'o Pochi' },
        { text: 'わたしの', meaning: 'minha' },
        { text: 'たいせつな', meaning: 'importante' },
        { text: 'かぞくです。', meaning: 'é família' },
      ],
    ],
  },
  {
    id: 'densha-no-tabi',
    title: 'でんしゃの たび',
    level: 1,
    wordCount: 26,
    summaryPt: 'Uma viagem de trem até o mar, com paisagem e um bentô no caminho.',
    lines: [
      [
        { text: 'せんしゅう、', meaning: 'semana passada,' },
        { text: 'でんしゃで', meaning: 'de trem' },
        { text: 'うみへ', meaning: 'para o mar' },
        { text: 'いきました。', meaning: 'fui' },
      ],
      [
        { text: 'でんしゃは', meaning: 'o trem' },
        { text: 'にじかん', meaning: 'duas horas' },
        { text: 'ぐらい', meaning: 'cerca de' },
        { text: 'かかりました。', meaning: 'levou (tempo)' },
      ],
      [
        { text: 'まどから', meaning: 'da janela' },
        { text: 'やまや', meaning: 'montanhas e' },
        { text: 'かわが', meaning: 'rios (+ partícula de sujeito)' },
        { text: 'みえました。', meaning: 'era possível ver' },
      ],
      [
        { text: 'でんしゃの', meaning: 'do trem' },
        { text: 'なかで、', meaning: 'dentro,' },
        { text: 'おべんとうを', meaning: 'bentô (+ partícula de objeto)' },
        { text: 'たべました。', meaning: 'comi' },
      ],
      [
        { text: 'うみに', meaning: 'ao mar' },
        { text: 'ついたとき、', meaning: 'quando cheguei,' },
        { text: 'とても', meaning: 'muito' },
        { text: 'きれいでした。', meaning: 'estava bonito' },
      ],
      [
        { text: 'かえりの', meaning: 'da volta' },
        { text: 'でんしゃで、', meaning: 'no trem,' },
        { text: 'ぐっすり', meaning: 'profundamente' },
        { text: 'ねました。', meaning: 'dormi' },
      ],
      [
        { text: 'たのしい', meaning: 'divertido' },
        { text: 'いちにちでした。', meaning: 'foi um dia' },
      ],
    ],
  },
  {
    id: 'ame-no-nichiyoubi',
    title: 'あめの にちようび',
    level: 1,
    wordCount: 22,
    summaryPt: 'Um domingo chuvoso passado em casa, assistindo filme.',
    lines: [
      [
        { text: 'きょうは', meaning: 'hoje' },
        { text: 'にちようびですが、', meaning: 'é domingo, mas' },
        { text: 'あめです。', meaning: 'está chovendo' },
      ],
      [
        { text: 'そとへ', meaning: 'para fora' },
        { text: 'でかけられません。', meaning: 'não posso sair' },
      ],
      [
        { text: 'うちで', meaning: 'em casa' },
        { text: 'えいがを', meaning: 'filme (+ partícula de objeto)' },
        { text: 'みることに', meaning: 'a assistir' },
        { text: 'しました。', meaning: 'decidi' },
      ],
      [
        { text: 'あたたかい', meaning: 'quente' },
        { text: 'おちゃを', meaning: 'chá (+ partícula de objeto)' },
        { text: 'のみながら、', meaning: 'enquanto bebo,' },
        { text: 'みました。', meaning: 'assisti' },
      ],
      [
        { text: 'まどの', meaning: 'da janela' },
        { text: 'そとの', meaning: 'de fora' },
        { text: 'あめの', meaning: 'da chuva' },
        { text: 'おとが', meaning: 'o som (+ partícula de sujeito)' },
        { text: 'すきです。', meaning: 'gosto' },
      ],
      [
        { text: 'こんな', meaning: 'assim, deste tipo' },
        { text: 'ひは、', meaning: 'o dia (é),' },
        { text: 'うちで', meaning: 'em casa' },
        { text: 'のんびり', meaning: 'com calma, relaxadamente' },
        { text: 'します。', meaning: 'faço' },
      ],
      [
        { text: 'あめの', meaning: 'de chuva' },
        { text: 'ひも、', meaning: 'o dia também,' },
        { text: 'わるくないです。', meaning: 'não é ruim' },
      ],
    ],
  },
  {
    id: 'otetsudai',
    title: 'おてつだい',
    level: 1,
    wordCount: 24,
    summaryPt: 'As tarefas domésticas que o narrador ajuda a fazer todo dia.',
    lines: [
      [
        { text: 'わたしは', meaning: 'eu' },
        { text: 'まいにち', meaning: 'todo dia' },
        { text: 'うちの', meaning: 'de casa' },
        { text: 'しごとを', meaning: 'tarefa (+ partícula de objeto)' },
        { text: 'てつだいます。', meaning: 'ajudo' },
      ],
      [
        { text: 'あさは', meaning: 'de manhã' },
        { text: 'おさらを', meaning: 'os pratos (+ partícula de objeto)' },
        { text: 'あらいます。', meaning: 'lavo' },
      ],
      [
        { text: 'ゆうがたは', meaning: 'no fim de tarde' },
        { text: 'いぬの', meaning: 'do cachorro' },
        { text: 'さんぽを', meaning: 'passeio (+ partícula de objeto)' },
        { text: 'します。', meaning: 'faço' },
      ],
      [
        { text: 'ときどき', meaning: 'às vezes' },
        { text: 'せんたくも', meaning: 'lavagem de roupa também' },
        { text: 'てつだいます。', meaning: 'ajudo' },
      ],
      [
        { text: 'ははは', meaning: 'minha mãe' },
        { text: 'いつも', meaning: 'sempre' },
        { text: '「ありがとう」と', meaning: '"obrigada", (+ partícula de citação)' },
        { text: 'いいます。', meaning: 'diz' },
      ],
      [
        { text: 'てつだいを', meaning: 'ajuda (+ partícula de objeto)' },
        { text: 'すると、', meaning: 'quando faço,' },
        { text: 'きもちが', meaning: 'o sentimento (+ partícula de sujeito)' },
        { text: 'いいです。', meaning: 'é bom' },
      ],
      [
        { text: 'かぞくの', meaning: 'da família' },
        { text: 'ために、', meaning: 'para o bem de, por causa de' },
        { text: 'これからも', meaning: 'de agora em diante também' },
        { text: 'がんばります。', meaning: 'vou me esforçar' },
      ],
    ],
  },

  // ---------------------------------------------------------------------
  // Nível 2 — kanji comuns com furigana
  // ---------------------------------------------------------------------
  {
    id: 'shumatsu-sanpo',
    title: 'しゅうまつの さんぽ',
    level: 2,
    wordCount: 45,
    summaryPt: 'Um passeio de fim de semana num parque florido, observando crianças brincarem.',
    lines: [
      [
        { text: '今日は', reading: 'きょうは', meaning: 'hoje (+ partícula de tópico)' },
        { text: '天気が', reading: 'てんきが', meaning: 'o tempo/clima (+ partícula de sujeito)' },
        { text: 'いいです。', meaning: 'está bom' },
      ],
      [
        { text: '私は', reading: 'わたしは', meaning: 'eu (+ partícula de tópico)' },
        { text: '公園へ', reading: 'こうえんへ', meaning: 'para o parque' },
        { text: '行きました。', reading: 'いきました。', meaning: 'fui' },
      ],
      [
        { text: '公園には', reading: 'こうえんには', meaning: 'no parque' },
        { text: '花が', reading: 'はなが', meaning: 'flor (+ partícula de sujeito)' },
        { text: 'たくさん', meaning: 'muitas, bastante' },
        { text: 'さいていました。', meaning: 'estavam desabrochando' },
      ],
      [
        { text: '川の', reading: 'かわの', meaning: 'do rio' },
        { text: '近くを', reading: 'ちかくを', meaning: 'as proximidades (+ partícula de trajeto)' },
        { text: '歩きました。', reading: 'あるきました。', meaning: 'caminhei' },
      ],
      [
        { text: '小さい', reading: 'ちいさい', meaning: 'pequeno' },
        { text: '子供たちが', reading: 'こどもたちが', meaning: 'as crianças (+ partícula de sujeito)' },
        { text: '走っていました。', reading: 'はしっていました。', meaning: 'estavam correndo' },
      ],
      [
        { text: '私も', reading: 'わたしも', meaning: 'eu também' },
        { text: '少し', reading: 'すこし', meaning: 'um pouco' },
        { text: '走りました。', reading: 'はしりました。', meaning: 'corri' },
      ],
      [
        { text: 'とても', meaning: 'muito' },
        { text: '楽しかったです。', reading: 'たのしかったです。', meaning: 'foi divertido' },
      ],
      [
        { text: '来週も', reading: 'らいしゅうも', meaning: 'semana que vem também' },
        { text: 'また', meaning: 'de novo' },
        { text: '行きたいです。', reading: 'いきたいです。', meaning: 'quero ir' },
      ],
    ],
  },
  {
    id: 'tomodachi-tegami',
    title: 'ともだちへの てがみ',
    level: 2,
    wordCount: 50,
    summaryPt: 'Uma carta contando as novidades do trabalho e combinando um encontro.',
    lines: [
      [
        { text: '田中さん、', reading: 'たなかさん、', meaning: 'Tanaka (+ sufixo honorífico),' },
        { text: 'お元気ですか。', reading: 'おげんきですか。', meaning: 'como vai?' },
      ],
      [
        { text: '私は', reading: 'わたしは', meaning: 'eu' },
        { text: '元気です。', reading: 'げんきです。', meaning: 'estou bem' },
      ],
      [
        { text: '今、', reading: 'いま、', meaning: 'agora,' },
        { text: '新しい', reading: 'あたらしい', meaning: 'novo' },
        { text: '会社で', reading: 'かいしゃで', meaning: 'numa empresa' },
        { text: '働いています。', reading: 'はたらいています。', meaning: 'estou trabalhando' },
      ],
      [
        { text: '仕事は', reading: 'しごとは', meaning: 'o trabalho' },
        { text: '大変ですが、', reading: 'たいへんですが、', meaning: 'é puxado, mas' },
        { text: '楽しいです。', reading: 'たのしいです。', meaning: 'é divertido' },
      ],
      [
        { text: '会社の', reading: 'かいしゃの', meaning: 'da empresa' },
        { text: '人たちは', reading: 'ひとたちは', meaning: 'as pessoas' },
        { text: 'とても', meaning: 'muito' },
        { text: '親切です。', reading: 'しんせつです。', meaning: 'são gentis' },
      ],
      [
        { text: '来月、', reading: 'らいげつ、', meaning: 'mês que vem,' },
        { text: '日本へ', reading: 'にほんへ', meaning: 'para o Japão' },
        { text: '行きます。', reading: 'いきます。', meaning: 'vou' },
      ],
      [
        { text: 'その時、', reading: 'そのとき、', meaning: 'nessa hora,' },
        { text: '一緒に', reading: 'いっしょに', meaning: 'juntos' },
        { text: '会いましょう。', reading: 'あいましょう。', meaning: 'vamos nos encontrar' },
      ],
      [
        { text: '返事を', reading: 'へんじを', meaning: 'a resposta (+ partícula de objeto)' },
        { text: '待っています。', reading: 'まっています。', meaning: 'estou esperando' },
      ],
    ],
  },
  {
    id: 'ame-no-hi',
    title: 'あめの ひ',
    level: 2,
    wordCount: 48,
    summaryPt: 'Um dia chuvoso a caminho do trabalho, e por que a chuva também tem seu charme.',
    lines: [
      [
        { text: '今朝から', reading: 'けさから', meaning: 'desde esta manhã' },
        { text: '雨が', reading: 'あめが', meaning: 'chuva (+ partícula de sujeito)' },
        { text: '降っています。', reading: 'ふっています。', meaning: 'está chovendo' },
      ],
      [
        { text: '空は', reading: 'そらは', meaning: 'o céu' },
        { text: '暗くて、', reading: 'くらくて、', meaning: 'está escuro, e' },
        { text: '風も', reading: 'かぜも', meaning: 'o vento também' },
        { text: '強いです。', reading: 'つよいです。', meaning: 'está forte' },
      ],
      [
        { text: '傘を', reading: 'かさを', meaning: 'guarda-chuva (+ partícula de objeto)' },
        { text: '持って、', reading: 'もって、', meaning: 'levando, e' },
        { text: '駅まで', reading: 'えきまで', meaning: 'até a estação' },
        { text: '歩きました。', reading: 'あるきました。', meaning: 'caminhei' },
      ],
      [
        { text: '電車は', reading: 'でんしゃは', meaning: 'o trem' },
        { text: 'いつもより', meaning: 'mais que o normal' },
        { text: '混んでいました。', reading: 'こんでいました。', meaning: 'estava lotado' },
      ],
      [
        { text: '会社に', reading: 'かいしゃに', meaning: 'na empresa' },
        { text: '着いた時、', reading: 'ついたとき、', meaning: 'quando cheguei,' },
        { text: '服が', reading: 'ふくが', meaning: 'as roupas' },
        { text: '少し', reading: 'すこし', meaning: 'um pouco' },
        { text: '濡れていました。', reading: 'ぬれていました。', meaning: 'estavam molhadas' },
      ],
      [
        { text: '雨の日は', reading: 'あめのひは', meaning: 'dias chuvosos' },
        { text: 'あまり', meaning: 'não muito (+ negativo)' },
        { text: '好きじゃありません。', reading: 'すきじゃありません。', meaning: 'não gosto' },
      ],
      [
        { text: 'でも、', meaning: 'mas,' },
        { text: '雨の', reading: 'あめの', meaning: 'da chuva' },
        { text: '音を', reading: 'おとを', meaning: 'o som (+ partícula de objeto)' },
        { text: '聞くのは', reading: 'きくのは', meaning: 'ouvir (é)' },
        { text: '好きです。', reading: 'すきです。', meaning: 'eu gosto' },
      ],
      [
        { text: '明日は', reading: 'あしたは', meaning: 'amanhã' },
        { text: '晴れると', reading: 'はれると', meaning: 'se ficar ensolarado' },
        { text: 'いいですね。', meaning: 'seria bom, né' },
      ],
    ],
  },
  {
    id: 'kyoto-ryokou',
    title: 'きょうと りょこう',
    level: 2,
    wordCount: 40,
    summaryPt: 'Uma viagem de trem-bala a Kyoto para visitar templos antigos e experimentar a culinária local.',
    lines: [
      [
        { text: '先週、', reading: 'せんしゅう、', meaning: 'semana passada,' },
        { text: '京都へ', reading: 'きょうとへ', meaning: 'para Kyoto' },
        { text: '旅行に', reading: 'りょこうに', meaning: 'em viagem' },
        { text: '行きました。', reading: 'いきました。', meaning: 'fui' },
      ],
      [
        { text: '新幹線で', reading: 'しんかんせんで', meaning: 'de trem-bala' },
        { text: '二時間ぐらい', reading: 'にじかんぐらい', meaning: 'cerca de duas horas' },
        { text: 'かかりました。', meaning: 'levou (tempo)' },
      ],
      [
        { text: '古い', reading: 'ふるい', meaning: 'antigos' },
        { text: 'お寺を', reading: 'おてらを', meaning: 'templos (+ partícula de objeto)' },
        { text: 'たくさん', meaning: 'muitos' },
        { text: '見ました。', reading: 'みました。', meaning: 'vi' },
      ],
      [
        { text: '有名な', reading: 'ゆうめいな', meaning: 'famoso' },
        { text: '神社にも', reading: 'じんじゃにも', meaning: 'ao santuário também' },
        { text: '行きました。', reading: 'いきました。', meaning: 'fui' },
      ],
      [
        { text: 'お土産に', reading: 'おみやげに', meaning: 'como lembrancinha' },
        { text: '抹茶のお菓子を', reading: 'まっちゃのおかしを', meaning: 'doce de chá verde (+ partícula de objeto)' },
        { text: '買いました。', reading: 'かいました。', meaning: 'comprei' },
      ],
      [
        { text: '夜は', reading: 'よるは', meaning: 'à noite' },
        { text: '京都の', reading: 'きょうとの', meaning: 'de Kyoto' },
        { text: '料理を', reading: 'りょうりを', meaning: 'a culinária (+ partícula de objeto)' },
        { text: '食べました。', reading: 'たべました。', meaning: 'comi' },
      ],
      [
        { text: 'とても', meaning: 'muito' },
        { text: '静かで、', reading: 'しずかで、', meaning: 'era tranquilo, e' },
        { text: 'きれいな', meaning: 'bonita' },
        { text: '町でした。', reading: 'まちでした。', meaning: 'era uma cidade' },
      ],
      [
        { text: 'また', meaning: 'de novo' },
        { text: '京都へ', reading: 'きょうとへ', meaning: 'para Kyoto' },
        { text: '行きたいです。', reading: 'いきたいです。', meaning: 'quero ir' },
      ],
    ],
  },
  {
    id: 'tanjoubi-party',
    title: 'たんじょうび パーティー',
    level: 2,
    wordCount: 38,
    summaryPt: 'Uma festa de aniversário em família, com bolo, música e um presente especial.',
    lines: [
      [
        { text: '今日は', reading: 'きょうは', meaning: 'hoje' },
        { text: '妹の', reading: 'いもうとの', meaning: 'da minha irmã mais nova' },
        { text: '誕生日です。', reading: 'たんじょうびです。', meaning: 'é aniversário' },
      ],
      [
        { text: '家族と', reading: 'かぞくと', meaning: 'com a família' },
        { text: '一緒に', reading: 'いっしょに', meaning: 'juntos' },
        { text: 'パーティーを', meaning: 'a festa (+ partícula de objeto)' },
        { text: 'しました。', meaning: 'fizemos' },
      ],
      [
        { text: '大きい', reading: 'おおきい', meaning: 'grande' },
        { text: 'ケーキを', meaning: 'bolo (+ partícula de objeto)' },
        { text: '買いました。', reading: 'かいました。', meaning: 'compramos' },
      ],
      [
        { text: 'みんなで', meaning: 'todos juntos' },
        { text: '歌を', reading: 'うたを', meaning: 'música (+ partícula de objeto)' },
        { text: '歌いました。', reading: 'うたいました。', meaning: 'cantamos' },
      ],
      [
        { text: '妹は', reading: 'いもうとは', meaning: 'minha irmã mais nova' },
        { text: 'とても', meaning: 'muito' },
        { text: '嬉しそうでした。', reading: 'うれしそうでした。', meaning: 'parecia feliz' },
      ],
      [
        { text: 'プレゼントは', meaning: 'o presente' },
        { text: '新しい', reading: 'あたらしい', meaning: 'novo' },
        { text: '靴でした。', reading: 'くつでした。', meaning: 'era um sapato' },
      ],
      [
        { text: '楽しい', reading: 'たのしい', meaning: 'divertido' },
        { text: '一日でした。', reading: 'いちにちでした。', meaning: 'foi um dia' },
      ],
    ],
  },
  {
    id: 'ryouri-narau',
    title: 'りょうりを ならう',
    level: 2,
    wordCount: 45,
    summaryPt: 'Aprendendo com a mãe a preparar sopa de missô do zero, passo a passo.',
    lines: [
      [
        { text: '母に', reading: 'ははに', meaning: 'com/da minha mãe' },
        { text: '日本の', reading: 'にほんの', meaning: 'japonesa' },
        { text: '料理を', reading: 'りょうりを', meaning: 'culinária (+ partícula de objeto)' },
        { text: '習いました。', reading: 'ならいました。', meaning: 'aprendi' },
      ],
      [
        { text: '今日は', reading: 'きょうは', meaning: 'hoje' },
        { text: '味噌汁を', reading: 'みそしるを', meaning: 'sopa de missô (+ partícula de objeto)' },
        { text: '作りました。', reading: 'つくりました。', meaning: 'fiz' },
      ],
      [
        { text: 'まず、', meaning: 'primeiro,' },
        { text: '野菜を', reading: 'やさいを', meaning: 'verduras (+ partícula de objeto)' },
        { text: '小さく', reading: 'ちいさく', meaning: 'pequeno' },
        { text: '切りました。', reading: 'きりました。', meaning: 'cortei' },
      ],
      [
        { text: 'それから、', meaning: 'depois disso,' },
        { text: 'お湯で', reading: 'おゆで', meaning: 'com água quente' },
        { text: '野菜を', reading: 'やさいを', meaning: 'verduras (+ partícula de objeto)' },
        { text: '煮ました。', reading: 'にました。', meaning: 'cozinhei' },
      ],
      [
        { text: '最後に', reading: 'さいごに', meaning: 'por último' },
        { text: '味噌を', reading: 'みそを', meaning: 'missô (+ partícula de objeto)' },
        { text: '入れました。', reading: 'いれました。', meaning: 'coloquei' },
      ],
      [
        { text: '少し', reading: 'すこし', meaning: 'um pouco' },
        { text: '難しかったですが、', reading: 'むずかしかったですが、', meaning: 'foi difícil, mas' },
        { text: '上手に', reading: 'じょうずに', meaning: 'bem' },
        { text: 'できました。', meaning: 'consegui fazer' },
      ],
      [
        { text: '家族は', reading: 'かぞくは', meaning: 'minha família' },
        { text: '美味しいと', reading: 'おいしいと', meaning: 'que estava gostoso' },
        { text: '言いました。', reading: 'いいました。', meaning: 'disse' },
      ],
      [
        { text: 'また', meaning: 'de novo' },
        { text: '作りたいです。', reading: 'つくりたいです。', meaning: 'quero fazer' },
      ],
    ],
  },
  {
    id: 'mensetsu',
    title: 'めんせつ',
    level: 2,
    wordCount: 42,
    summaryPt: 'A véspera de uma entrevista de emprego: nervosismo, preparação e um pouco de esperança.',
    lines: [
      [
        { text: '明日、', reading: 'あした、', meaning: 'amanhã,' },
        { text: '会社の', reading: 'かいしゃの', meaning: 'da empresa' },
        { text: '面接が', reading: 'めんせつが', meaning: 'a entrevista (+ partícula de sujeito)' },
        { text: 'あります。', meaning: 'há/tem' },
      ],
      [
        { text: '少し', reading: 'すこし', meaning: 'um pouco' },
        { text: '緊張しています。', reading: 'きんちょうしています。', meaning: 'estou nervoso' },
      ],
      [
        { text: 'スーツを', meaning: 'terno (+ partícula de objeto)' },
        { text: '着て、', reading: 'きて、', meaning: 'vestindo, e' },
        { text: '早く', reading: 'はやく', meaning: 'cedo' },
        { text: '家を', reading: 'いえを', meaning: 'de casa' },
        { text: '出るつもりです。', reading: 'でるつもりです。', meaning: 'pretendo sair' },
      ],
      [
        { text: '質問の', reading: 'しつもんの', meaning: 'das perguntas' },
        { text: '答えを', reading: 'こたえを', meaning: 'as respostas (+ partícula de objeto)' },
        { text: '何度も', reading: 'なんども', meaning: 'várias vezes' },
        { text: '練習しました。', reading: 'れんしゅうしました。', meaning: 'pratiquei' },
      ],
      [
        { text: 'この', meaning: 'esta' },
        { text: '会社で', reading: 'かいしゃで', meaning: 'nesta empresa' },
        { text: '働きたい', reading: 'はたらきたい', meaning: 'querer trabalhar' },
        { text: '理由も', reading: 'りゆうも', meaning: 'o motivo também' },
        { text: '考えました。', reading: 'かんがえました。', meaning: 'pensei' },
      ],
      [
        { text: 'うまく', meaning: 'bem' },
        { text: 'いくと', meaning: 'se for/acontecer' },
        { text: 'いいです。', meaning: 'seria bom' },
      ],
      [
        { text: '面接の後、', reading: 'めんせつのあと、', meaning: 'depois da entrevista,' },
        { text: '友達に', reading: 'ともだちに', meaning: 'para um amigo' },
        { text: '電話するつもりです。', reading: 'でんわするつもりです。', meaning: 'pretendo telefonar' },
      ],
    ],
  },
  {
    id: 'hikkoshi',
    title: 'ひっこし',
    level: 2,
    wordCount: 44,
    summaryPt: 'Preparativos para se mudar para um apartamento novo, mais espaçoso e perto da estação.',
    lines: [
      [
        { text: '来月、', reading: 'らいげつ、', meaning: 'mês que vem,' },
        { text: '新しい', reading: 'あたらしい', meaning: 'novo' },
        { text: 'アパートに', meaning: 'para um apartamento' },
        { text: '引っ越します。', reading: 'ひっこします。', meaning: 'vou me mudar' },
      ],
      [
        { text: '今の', reading: 'いまの', meaning: 'atual' },
        { text: '部屋より', reading: 'へやより', meaning: 'que o quarto' },
        { text: '少し', reading: 'すこし', meaning: 'um pouco' },
        { text: '広いです。', reading: 'ひろいです。', meaning: 'é espaçoso' },
      ],
      [
        { text: '駅からも', reading: 'えきからも', meaning: 'da estação também' },
        { text: '近くて、', reading: 'ちかくて、', meaning: 'é perto, e' },
        { text: '便利です。', reading: 'べんりです。', meaning: 'é conveniente' },
      ],
      [
        { text: '今週末、', reading: 'こんしゅうまつ、', meaning: 'neste fim de semana,' },
        { text: '荷物を', reading: 'にもつを', meaning: 'as coisas (+ partícula de objeto)' },
        { text: '箱に', reading: 'はこに', meaning: 'na caixa' },
        { text: '入れます。', reading: 'いれます。', meaning: 'vou colocar' },
      ],
      [
        { text: '友達も', reading: 'ともだちも', meaning: 'meus amigos também' },
        { text: '手伝ってくれます。', reading: 'てつだってくれます。', meaning: 'vão me ajudar' },
      ],
      [
        { text: '新しい', reading: 'あたらしい', meaning: 'novo' },
        { text: '部屋の', reading: 'へやの', meaning: 'do quarto' },
        { text: '家具も', reading: 'かぐも', meaning: 'os móveis também' },
        { text: '考えています。', reading: 'かんがえています。', meaning: 'estou pensando' },
      ],
      [
        { text: '早く', reading: 'はやく', meaning: 'logo' },
        { text: '新しい', reading: 'あたらしい', meaning: 'nova' },
        { text: '生活を', reading: 'せいかつを', meaning: 'a vida (+ partícula de objeto)' },
        { text: '始めたいです。', reading: 'はじめたいです。', meaning: 'quero começar' },
      ],
    ],
  },
  {
    id: 'natsu-matsuri',
    title: 'なつまつり',
    level: 2,
    wordCount: 43,
    summaryPt: 'Uma noite de festival de verão: yukata, takoyaki e fogos de artifício com amigos.',
    lines: [
      [
        { text: '昨日、', reading: 'きのう、', meaning: 'ontem,' },
        { text: '町の', reading: 'まちの', meaning: 'da cidade' },
        { text: '夏祭りに', reading: 'なつまつりに', meaning: 'ao festival de verão' },
        { text: '行きました。', reading: 'いきました。', meaning: 'fui' },
      ],
      [
        { text: '友達と', reading: 'ともだちと', meaning: 'com amigos' },
        { text: '浴衣を', reading: 'ゆかたを', meaning: 'yukata (+ partícula de objeto)' },
        { text: '着て', reading: 'きて', meaning: 'vestindo' },
        { text: '行きました。', reading: 'いきました。', meaning: 'fomos' },
      ],
      [
        { text: '屋台で', reading: 'やたいで', meaning: 'na barraca' },
        { text: 'たこ焼きを', reading: 'たこやきを', meaning: 'takoyaki (+ partícula de objeto)' },
        { text: '食べました。', reading: 'たべました。', meaning: 'comemos' },
      ],
      [
        { text: '夜、', reading: 'よる、', meaning: 'à noite,' },
        { text: '大きい', reading: 'おおきい', meaning: 'grandes' },
        { text: '花火を', reading: 'はなびを', meaning: 'fogos de artifício (+ partícula de objeto)' },
        { text: '見ました。', reading: 'みました。', meaning: 'vimos' },
      ],
      [
        { text: '空が', reading: 'そらが', meaning: 'o céu (+ partícula de sujeito)' },
        { text: '色々な', reading: 'いろいろな', meaning: 'várias' },
        { text: '色に', reading: 'いろに', meaning: 'em cores' },
        { text: 'なりました。', meaning: 'ficou' },
      ],
      [
        { text: '人が', reading: 'ひとが', meaning: 'as pessoas (+ partícula de sujeito)' },
        { text: '多くて、', reading: 'おおくて、', meaning: 'eram muitas, e' },
        { text: '少し', reading: 'すこし', meaning: 'um pouco' },
        { text: '疲れました。', reading: 'つかれました。', meaning: 'fiquei cansado' },
      ],
      [
        { text: 'でも、', meaning: 'mas,' },
        { text: 'とても', meaning: 'muito' },
        { text: '楽しい', reading: 'たのしい', meaning: 'divertida' },
        { text: '夜でした。', reading: 'よるでした。', meaning: 'foi a noite' },
      ],
    ],
  },
  {
    id: 'byouin',
    title: 'びょういん',
    level: 2,
    wordCount: 41,
    summaryPt: 'Uma manhã de dor de cabeça e febre leva a uma visita ao hospital — e a um dia de descanso.',
    lines: [
      [
        { text: '今朝、', reading: 'けさ、', meaning: 'esta manhã,' },
        { text: '頭が', reading: 'あたまが', meaning: 'a cabeça (+ partícula de sujeito)' },
        { text: '痛かったです。', reading: 'いたかったです。', meaning: 'doeu' },
      ],
      [
        { text: '熱も', reading: 'ねつも', meaning: 'febre também' },
        { text: '少し', reading: 'すこし', meaning: 'um pouco' },
        { text: 'ありました。', meaning: 'tinha' },
      ],
      [
        { text: 'それで、', meaning: 'por isso,' },
        { text: '近くの', reading: 'ちかくの', meaning: 'próximo' },
        { text: '病院へ', reading: 'びょういんへ', meaning: 'para o hospital' },
        { text: '行きました。', reading: 'いきました。', meaning: 'fui' },
      ],
      [
        { text: '医者は', reading: 'いしゃは', meaning: 'o médico' },
        { text: '優しく、', reading: 'やさしく、', meaning: 'gentilmente, e' },
        { text: '丁寧に', reading: 'ていねいに', meaning: 'com cuidado' },
        { text: '診てくれました。', reading: 'みてくれました。', meaning: 'me examinou' },
      ],
      [
        { text: '薬を', reading: 'くすりを', meaning: 'remédio (+ partícula de objeto)' },
        { text: 'もらって、', meaning: 'recebi, e' },
        { text: '家に', reading: 'いえに', meaning: 'para casa' },
        { text: '帰りました。', reading: 'かえりました。', meaning: 'voltei' },
      ],
      [
        { text: '一日中、', reading: 'いちにちじゅう、', meaning: 'o dia inteiro,' },
        { text: 'ゆっくり', meaning: 'tranquilamente' },
        { text: '休みました。', reading: 'やすみました。', meaning: 'descansei' },
      ],
      [
        { text: '今は', reading: 'いまは', meaning: 'agora' },
        { text: 'もう', meaning: 'já' },
        { text: '元気に', reading: 'げんきに', meaning: 'bem/saudável' },
        { text: 'なりました。', meaning: 'fiquei' },
      ],
    ],
  },
  {
    id: 'ryokou-keikaku',
    title: 'りょこうの けいかく',
    level: 2,
    wordCount: 44,
    summaryPt: 'Planejando com os amigos uma viagem de verão a Okinawa: passagens, hotel e praias.',
    lines: [
      [
        { text: '夏休みに', reading: 'なつやすみに', meaning: 'nas férias de verão' },
        { text: '沖縄へ', reading: 'おきなわへ', meaning: 'para Okinawa' },
        { text: '行く', reading: 'いく', meaning: 'ir' },
        { text: '予定です。', reading: 'よていです。', meaning: 'é o plano' },
      ],
      [
        { text: '友達と', reading: 'ともだちと', meaning: 'com amigos' },
        { text: '一緒に', reading: 'いっしょに', meaning: 'juntos' },
        { text: '計画を', reading: 'けいかくを', meaning: 'o plano (+ partícula de objeto)' },
        { text: '立てています。', reading: 'たてています。', meaning: 'estamos fazendo' },
      ],
      [
        { text: 'まず、', meaning: 'primeiro,' },
        { text: '飛行機の', reading: 'ひこうきの', meaning: 'de avião' },
        { text: '切符を', reading: 'きっぷを', meaning: 'a passagem (+ partícula de objeto)' },
        { text: '買いました。', reading: 'かいました。', meaning: 'compramos' },
      ],
      [
        { text: '次に、', reading: 'つぎに、', meaning: 'em seguida,' },
        { text: '泊まる', reading: 'とまる', meaning: 'hospedar-se' },
        { text: 'ホテルを', meaning: 'hotel (+ partícula de objeto)' },
        { text: '探しています。', reading: 'さがしています。', meaning: 'estamos procurando' },
      ],
      [
        { text: 'きれいな', meaning: 'cristalino' },
        { text: '海で', reading: 'うみで', meaning: 'no mar' },
        { text: '泳ぎたいです。', reading: 'およぎたいです。', meaning: 'quero nadar' },
      ],
      [
        { text: '美味しい', reading: 'おいしい', meaning: 'gostosa' },
        { text: '沖縄料理も', reading: 'おきなわりょうりも', meaning: 'a culinária de Okinawa também' },
        { text: '食べてみたいです。', reading: 'たべてみたいです。', meaning: 'quero experimentar comer' },
      ],
      [
        { text: '旅行が', reading: 'りょこうが', meaning: 'a viagem (+ partícula de sujeito)' },
        { text: '来るのが', reading: 'くるのが', meaning: 'chegar' },
        { text: '待ち遠しいです。', reading: 'まちどおしいです。', meaning: 'mal posso esperar' },
      ],
    ],
  },
  {
    id: 'wasurerarenai-sensei',
    title: 'わすれられない せんせい',
    level: 2,
    wordCount: 42,
    summaryPt: 'A lembrança de um professor do colégio que marcou a vida de todos os alunos.',
    lines: [
      [
        { text: '高校の時、', reading: 'こうこうのとき、', meaning: 'na época do colégio,' },
        { text: '田村先生という', reading: 'たむらせんせいという', meaning: 'chamado professor Tamura' },
        { text: '先生が', reading: 'せんせいが', meaning: 'um professor (+ partícula de sujeito)' },
        { text: 'いました。', meaning: 'havia' },
      ],
      [
        { text: 'いつも', meaning: 'sempre' },
        { text: '面白い', reading: 'おもしろい', meaning: 'interessantes' },
        { text: '話を', reading: 'はなしを', meaning: 'histórias (+ partícula de objeto)' },
        { text: 'してくれました。', meaning: 'contava (pra gente)' },
      ],
      [
        { text: '分からない時、', reading: 'わからないとき、', meaning: 'quando eu não entendia,' },
        { text: 'いつも', meaning: 'sempre' },
        { text: '丁寧に', reading: 'ていねいに', meaning: 'com cuidado' },
        { text: '教えてくれました。', reading: 'おしえてくれました。', meaning: 'me ensinava' },
      ],
      [
        { text: '生徒たちに', reading: 'せいとたちに', meaning: 'entre os alunos' },
        { text: 'とても', meaning: 'muita' },
        { text: '人気が', reading: 'にんきが', meaning: 'popularidade (+ partícula de sujeito)' },
        { text: 'ありました。', meaning: 'havia' },
      ],
      [
        { text: '卒業する時、', reading: 'そつぎょうするとき、', meaning: 'na hora de nos formar,' },
        { text: '皆', reading: 'みんな', meaning: 'todos' },
        { text: '泣きました。', reading: 'なきました。', meaning: 'choramos' },
      ],
      [
        { text: '今でも', reading: 'いまでも', meaning: 'ainda hoje' },
        { text: '時々', reading: 'ときどき', meaning: 'às vezes' },
        { text: '先生の', reading: 'せんせいの', meaning: 'do professor' },
        { text: 'ことを', meaning: 'sobre ele (+ partícula de objeto)' },
        { text: '思い出します。', reading: 'おもいだします。', meaning: 'me lembro' },
      ],
      [
        { text: 'いつか', meaning: 'algum dia' },
        { text: 'また', meaning: 'de novo' },
        { text: '会いたいです。', reading: 'あいたいです。', meaning: 'quero encontrar' },
      ],
    ],
  },
  {
    id: 'wasuremono',
    title: 'わすれもの',
    level: 2,
    wordCount: 46,
    summaryPt: 'Um susto na estação de trem: a carteira perdida e o alívio de encontrá-la de volta.',
    lines: [
      [
        { text: '今朝、', reading: 'けさ、', meaning: 'esta manhã,' },
        { text: '駅で', reading: 'えきで', meaning: 'na estação' },
        { text: '大変な', reading: 'たいへんな', meaning: 'grave' },
        { text: 'ことが', meaning: 'uma coisa (+ partícula de sujeito)' },
        { text: 'ありました。', meaning: 'aconteceu' },
      ],
      [
        { text: '電車を', reading: 'でんしゃを', meaning: 'do trem (+ partícula de objeto)' },
        { text: '降りた後、', reading: 'おりたあと、', meaning: 'depois de descer,' },
        { text: '財布が', reading: 'さいふが', meaning: 'a carteira (+ partícula de sujeito)' },
        { text: 'ないと', meaning: 'que não tinha' },
        { text: '気づきました。', reading: 'きづきました。', meaning: 'percebi' },
      ],
      [
        { text: 'とても', meaning: 'muito' },
        { text: '驚いて、', reading: 'おどろいて、', meaning: 'me assustei, e' },
        { text: '慌てました。', reading: 'あわてました。', meaning: 'entrei em pânico' },
      ],
      [
        { text: 'すぐに', meaning: 'imediatamente' },
        { text: '駅員さんに', reading: 'えきいんさんに', meaning: 'ao funcionário da estação' },
        { text: '話しました。', reading: 'はなしました。', meaning: 'contei' },
      ],
      [
        { text: '駅員さんは', reading: 'えきいんさんは', meaning: 'o funcionário da estação' },
        { text: '忘れ物センターに', reading: 'わすれものセンターに', meaning: 'para o centro de achados e perdidos' },
        { text: '連絡してくれました。', reading: 'れんらくしてくれました。', meaning: 'entrou em contato (por mim)' },
      ],
      [
        { text: '三十分後、', reading: 'さんじゅっぷんご、', meaning: 'trinta minutos depois,' },
        { text: '財布が', reading: 'さいふが', meaning: 'a carteira (+ partícula de sujeito)' },
        { text: '見つかりました。', reading: 'みつかりました。', meaning: 'foi encontrada' },
      ],
      [
        { text: '本当に', reading: 'ほんとうに', meaning: 'realmente' },
        { text: '安心しました。', reading: 'あんしんしました。', meaning: 'fiquei aliviado' },
      ],
      [
        { text: 'これから', meaning: 'de agora em diante' },
        { text: '気をつけようと', reading: 'きをつけようと', meaning: 'que vou tomar cuidado' },
        { text: '思います。', reading: 'おもいます。', meaning: 'penso' },
      ],
    ],
  },
  {
    id: 'conveni-baito',
    title: 'コンビニの バイト',
    level: 2,
    wordCount: 48,
    summaryPt: 'O começo de um trabalho de meio período numa loja de conveniência, do primeiro dia difícil à rotina.',
    lines: [
      [
        { text: '先月から、', reading: 'せんげつから、', meaning: 'desde o mês passado,' },
        { text: 'コンビニで', meaning: 'na loja de conveniência' },
        { text: 'アルバイトを', meaning: 'o trabalho de meio período (+ partícula de objeto)' },
        { text: '始めました。', reading: 'はじめました。', meaning: 'comecei' },
      ],
      [
        { text: '最初の日は、', reading: 'さいしょのひは、', meaning: 'no primeiro dia,' },
        { text: '覚える', reading: 'おぼえる', meaning: 'memorizar' },
        { text: 'ことが', meaning: 'coisas (+ partícula de sujeito)' },
        { text: '多くて', reading: 'おおくて', meaning: 'eram muitas, e' },
        { text: '大変でした。', reading: 'たいへんでした。', meaning: 'foi difícil' },
      ],
      [
        { text: 'レジの', meaning: 'do caixa' },
        { text: '使い方を', reading: 'つかいかたを', meaning: 'o modo de usar (+ partícula de objeto)' },
        { text: '先輩に', reading: 'せんぱいに', meaning: 'com um colega mais experiente' },
        { text: '習いました。', reading: 'ならいました。', meaning: 'aprendi' },
      ],
      [
        { text: 'お客さんに', reading: 'おきゃくさんに', meaning: 'aos clientes' },
        { text: '挨拶するのも', reading: 'あいさつするのも', meaning: 'cumprimentar também' },
        { text: '大事な', reading: 'だいじな', meaning: 'importante' },
        { text: '仕事です。', reading: 'しごとです。', meaning: 'é o trabalho' },
      ],
      [
        { text: '今は', reading: 'いまは', meaning: 'agora' },
        { text: '少しずつ', reading: 'すこしずつ', meaning: 'aos poucos' },
        { text: '慣れてきました。', reading: 'なれてきました。', meaning: 'fui me acostumando' },
      ],
      [
        { text: '週に', reading: 'しゅうに', meaning: 'por semana' },
        { text: '三回、', reading: 'さんかい、', meaning: 'três vezes,' },
        { text: '夕方から', reading: 'ゆうがたから', meaning: 'a partir do fim da tarde' },
        { text: '働いています。', reading: 'はたらいています。', meaning: 'estou trabalhando' },
      ],
      [
        { text: '給料で', reading: 'きゅうりょうで', meaning: 'com o salário' },
        { text: '好きな', reading: 'すきな', meaning: 'de que eu gosto' },
        { text: '物を', reading: 'ものを', meaning: 'coisas (+ partícula de objeto)' },
        { text: '買いたいです。', reading: 'かいたいです。', meaning: 'quero comprar' },
      ],
    ],
  },
  {
    id: 'shizukana-yoru',
    title: 'しずかな よる',
    level: 2,
    wordCount: 47,
    summaryPt: 'Uma noite tranquila em casa, perdida num bom livro enquanto chove lá fora.',
    lines: [
      [
        { text: '今夜は', reading: 'こんやは', meaning: 'esta noite' },
        { text: '誰も', reading: 'だれも', meaning: 'ninguém' },
        { text: '予定が', reading: 'よていが', meaning: 'plano/compromisso (+ partícula de sujeito)' },
        { text: 'ありません。', meaning: 'não tem' },
      ],
      [
        { text: 'お茶を', reading: 'おちゃを', meaning: 'chá (+ partícula de objeto)' },
        { text: '入れて、', reading: 'いれて、', meaning: 'preparei, e' },
        { text: 'ソファに', meaning: 'no sofá' },
        { text: '座りました。', reading: 'すわりました。', meaning: 'sentei' },
      ],
      [
        { text: '好きな', reading: 'すきな', meaning: 'de que gosto' },
        { text: '本を', reading: 'ほんを', meaning: 'livro (+ partícula de objeto)' },
        { text: '読み始めました。', reading: 'よみはじめました。', meaning: 'comecei a ler' },
      ],
      [
        { text: '外は', reading: 'そとは', meaning: 'do lado de fora' },
        { text: '静かで、', reading: 'しずかで、', meaning: 'estava quieto, e' },
        { text: '雨の', reading: 'あめの', meaning: 'da chuva' },
        { text: '音だけ', reading: 'おとだけ', meaning: 'só o som' },
        { text: '聞こえました。', reading: 'きこえました。', meaning: 'se ouvia' },
      ],
      [
        { text: '時間を', reading: 'じかんを', meaning: 'o tempo (+ partícula de objeto)' },
        { text: '忘れるくらい、', reading: 'わすれるくらい、', meaning: 'a ponto de esquecer,' },
        { text: '物語に', reading: 'ものがたりに', meaning: 'na história' },
        { text: '夢中に', reading: 'むちゅうに', meaning: 'absorto' },
        { text: 'なりました。', meaning: 'fiquei' },
      ],
      [
        { text: '気がついたら、', reading: 'きがついたら、', meaning: 'quando percebi,' },
        { text: 'もう', meaning: 'já' },
        { text: '十二時でした。', reading: 'じゅうにじでした。', meaning: 'era meia-noite' },
      ],
      [
        { text: 'こんな', meaning: 'desse jeito, assim' },
        { text: '静かな', reading: 'しずかな', meaning: 'tranquila' },
        { text: '夜も', reading: 'よるも', meaning: 'noite também' },
        { text: 'たまには', meaning: 'de vez em quando' },
        { text: 'いいですね。', meaning: 'é bom, né' },
      ],
    ],
  },
];

export function getTextoById(id: string): ReadingText | undefined {
  return LEITURA_TEXTOS.find((t) => t.id === id);
}
