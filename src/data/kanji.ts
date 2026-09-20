/**
 * Dataset do módulo de Kanji: os kanji do nível N5 (ver regras-negocio.md),
 * cada um com leituras, radicais/mnemônico (para a tela de "aprender") e
 * exemplos de uso. `order` define a progressão pedagógica de introdução —
 * as funções de consulta abaixo respeitam essa ordem.
 */

export interface KanjiRadical {
  char: string;
  name: string;
}

export interface KanjiReading {
  kana: string;
  romaji: string;
}

export interface KanjiExample {
  word: string;
  reading: string;
  meaning: string;
}

export interface KanjiEntry {
  char: string;
  meaning: string;
  onyomi: KanjiReading[];
  kunyomi: KanjiReading[];
  radicals: KanjiRadical[];
  mnemonic: string;
  strokeCount: number;
  order: number;
  examples: KanjiExample[];
}

export const KANJI_N5: KanjiEntry[] = [
  {
    char: '一',
    meaning: 'um',
    onyomi: [{ kana: 'イチ', romaji: 'ichi' }],
    kunyomi: [{ kana: 'ひとつ', romaji: 'hitotsu' }],
    radicals: [{ char: '一', name: 'traço horizontal' }],
    mnemonic:
      'Um único traço horizontal desenhado no chão: a quantidade mínima que existe, um objeto só. Não tem como simplificar mais que isso — por isso é o primeiro kanji que qualquer aluno aprende.',
    strokeCount: 1,
    order: 1,
    examples: [
      { word: '一', reading: 'いち', meaning: 'um' },
      { word: '一つ', reading: 'ひとつ', meaning: 'uma unidade, uma coisa' },
      { word: '一月', reading: 'いちがつ', meaning: 'janeiro' },
    ],
  },
  {
    char: '二',
    meaning: 'dois',
    onyomi: [{ kana: 'ニ', romaji: 'ni' }],
    kunyomi: [{ kana: 'ふたつ', romaji: 'futatsu' }],
    radicals: [{ char: '二', name: 'dois traços horizontais' }],
    mnemonic:
      'Dois traços horizontais empilhados, um sobre o outro — como se um segundo traço tivesse se juntado ao primeiro (一) para formar o próximo número. Basta contar as linhas.',
    strokeCount: 2,
    order: 2,
    examples: [
      { word: '二', reading: 'に', meaning: 'dois' },
      { word: '二つ', reading: 'ふたつ', meaning: 'duas unidades' },
      { word: '二月', reading: 'にがつ', meaning: 'fevereiro' },
    ],
  },
  {
    char: '三',
    meaning: 'três',
    onyomi: [{ kana: 'サン', romaji: 'san' }],
    kunyomi: [{ kana: 'みっつ', romaji: 'mittsu' }],
    radicals: [{ char: '三', name: 'três traços horizontais' }],
    mnemonic:
      'A mesma pilha de traços de 二 ganha mais uma linha: três traços paralelos, simples de contar um a um. A progressão visual de 一 a 三 é a coisa mais direta do japonês escrito.',
    strokeCount: 3,
    order: 3,
    examples: [
      { word: '三', reading: 'さん', meaning: 'três' },
      { word: '三つ', reading: 'みっつ', meaning: 'três unidades' },
      { word: '三月', reading: 'さんがつ', meaning: 'março' },
    ],
  },
  {
    char: '四',
    meaning: 'quatro',
    onyomi: [{ kana: 'シ', romaji: 'shi' }],
    kunyomi: [
      { kana: 'よん', romaji: 'yon' },
      { kana: 'よっつ', romaji: 'yottsu' },
    ],
    radicals: [
      { char: '囗', name: 'caixa, moldura' },
      { char: '儿', name: 'pernas' },
    ],
    mnemonic:
      'Dentro de uma caixa fechada (囗) aparecem duas perninhas (儿), como se alguém estivesse contando escondido lá dentro. Muita gente evita ler esse kanji como "shi" em situações formais porque soa igual a 死 (morte) — por isso o japonês do dia a dia prefere よん para contar.',
    strokeCount: 5,
    order: 4,
    examples: [
      { word: '四月', reading: 'しがつ', meaning: 'abril' },
      { word: '四つ', reading: 'よっつ', meaning: 'quatro unidades' },
      { word: '四人', reading: 'よにん', meaning: 'quatro pessoas' },
    ],
  },
  {
    char: '五',
    meaning: 'cinco',
    onyomi: [{ kana: 'ゴ', romaji: 'go' }],
    kunyomi: [{ kana: 'いつつ', romaji: 'itsutsu' }],
    radicals: [{ char: '五', name: 'forma de ampulheta' }],
    mnemonic:
      'Uma linha em cima, um X cruzado no meio e uma linha embaixo — como uma ampulheta simplificada. Pense nos dedos das duas mãos se cruzando bem no meio da contagem, na metade do caminho até dez.',
    strokeCount: 4,
    order: 5,
    examples: [
      { word: '五月', reading: 'ごがつ', meaning: 'maio' },
      { word: '五つ', reading: 'いつつ', meaning: 'cinco unidades' },
      { word: '五人', reading: 'ごにん', meaning: 'cinco pessoas' },
    ],
  },
  {
    char: '六',
    meaning: 'seis',
    onyomi: [{ kana: 'ロク', romaji: 'roku' }],
    kunyomi: [{ kana: 'むっつ', romaji: 'muttsu' }],
    radicals: [
      { char: '亠', name: 'telhado' },
      { char: '八', name: 'pernas abertas' },
    ],
    mnemonic:
      'Um telhadinho (亠) cobre duas pernas abertas em V (八), como uma casinha simples e apertada. Seis pessoas mal cabem embaixo desse teto pequeno.',
    strokeCount: 4,
    order: 6,
    examples: [
      { word: '六月', reading: 'ろくがつ', meaning: 'junho' },
      { word: '六つ', reading: 'むっつ', meaning: 'seis unidades' },
      { word: '六日', reading: 'むいか', meaning: 'dia seis do mês' },
    ],
  },
  {
    char: '七',
    meaning: 'sete',
    onyomi: [{ kana: 'シチ', romaji: 'shichi' }],
    kunyomi: [
      { kana: 'なな', romaji: 'nana' },
      { kana: 'ななつ', romaji: 'nanatsu' },
    ],
    radicals: [{ char: '七', name: 'gancho' }],
    mnemonic:
      'Uma linha horizontal com um gancho caindo para baixo, como uma foice pendurada na parede — sete foices enfileiradas, prontas para a colheita da semana.',
    strokeCount: 2,
    order: 7,
    examples: [
      { word: '七月', reading: 'しちがつ', meaning: 'julho' },
      { word: '七つ', reading: 'ななつ', meaning: 'sete unidades' },
      { word: '七日', reading: 'なのか', meaning: 'dia sete do mês' },
    ],
  },
  {
    char: '八',
    meaning: 'oito',
    onyomi: [{ kana: 'ハチ', romaji: 'hachi' }],
    kunyomi: [{ kana: 'やっつ', romaji: 'yattsu' }],
    radicals: [{ char: '八', name: 'duas pernas se afastando' }],
    mnemonic:
      'Duas pernas se abrem para lados opostos, como um compasso aberto ao máximo. Oito é o número em que tudo parece se espalhar e se dividir para longe do centro.',
    strokeCount: 2,
    order: 8,
    examples: [
      { word: '八月', reading: 'はちがつ', meaning: 'agosto' },
      { word: '八つ', reading: 'やっつ', meaning: 'oito unidades' },
      { word: '八日', reading: 'ようか', meaning: 'dia oito do mês' },
    ],
  },
  {
    char: '九',
    meaning: 'nove',
    onyomi: [
      { kana: 'キュウ', romaji: 'kyuu' },
      { kana: 'ク', romaji: 'ku' },
    ],
    kunyomi: [{ kana: 'ここのつ', romaji: 'kokonotsu' }],
    radicals: [{ char: '九', name: 'braço dobrado em gancho' }],
    mnemonic:
      'Um braço se dobra em gancho, como alguém contando nos dedos e quase fechando a mão inteira. Falta pouquíssimo para chegar aos dez dedos — só mais um.',
    strokeCount: 2,
    order: 9,
    examples: [
      { word: '九月', reading: 'くがつ', meaning: 'setembro' },
      { word: '九つ', reading: 'ここのつ', meaning: 'nove unidades' },
      { word: '九州', reading: 'きゅうしゅう', meaning: 'Kyushu (região do Japão)' },
    ],
  },
  {
    char: '十',
    meaning: 'dez',
    onyomi: [{ kana: 'ジュウ', romaji: 'juu' }],
    kunyomi: [{ kana: 'とお', romaji: 'too' }],
    radicals: [{ char: '十', name: 'cruz' }],
    mnemonic:
      'Uma cruz simples: uma linha vertical cruzando uma horizontal. As duas mãos se cruzam na frente do corpo assim que terminam de contar os dez dedos.',
    strokeCount: 2,
    order: 10,
    examples: [
      { word: '十', reading: 'じゅう', meaning: 'dez' },
      { word: '十日', reading: 'とおか', meaning: 'dia dez do mês' },
      { word: '十人', reading: 'じゅうにん', meaning: 'dez pessoas' },
    ],
  },
  {
    char: '百',
    meaning: 'cem',
    onyomi: [{ kana: 'ヒャク', romaji: 'hyaku' }],
    kunyomi: [],
    radicals: [
      { char: '一', name: 'linha/tampa' },
      { char: '白', name: 'branco' },
    ],
    mnemonic:
      'Uma linha (一) tampa a palavra "branco" (白) por cima, como uma tampa fechando uma pilha de folhas de papel branco tão alta que precisa de uma linha no topo para marcar onde ela termina.',
    strokeCount: 6,
    order: 11,
    examples: [
      { word: '百', reading: 'ひゃく', meaning: 'cem' },
      { word: '百円', reading: 'ひゃくえん', meaning: 'cem ienes' },
      { word: '三百', reading: 'さんびゃく', meaning: 'trezentos' },
    ],
  },
  {
    char: '千',
    meaning: 'mil',
    onyomi: [{ kana: 'セン', romaji: 'sen' }],
    kunyomi: [],
    radicals: [
      { char: '丿', name: 'traço inclinado' },
      { char: '十', name: 'dez (cruz)' },
    ],
    mnemonic:
      'Um traço inclinado corta o alto do número dez (十), como se dez cruzes fossem riscadas de uma só vez. Mil é dez vezes cem, e aqui dez já sai multiplicado com um único corte.',
    strokeCount: 3,
    order: 12,
    examples: [
      { word: '千', reading: 'せん', meaning: 'mil' },
      { word: '千円', reading: 'せんえん', meaning: 'mil ienes' },
      { word: '三千', reading: 'さんぜん', meaning: 'três mil' },
    ],
  },
  {
    char: '万',
    meaning: 'dez mil',
    onyomi: [
      { kana: 'マン', romaji: 'man' },
      { kana: 'バン', romaji: 'ban' },
    ],
    kunyomi: [{ kana: 'よろず', romaji: 'yorozu' }],
    radicals: [{ char: '万', name: 'leque dobrado' }],
    mnemonic:
      'A forma lembra um leque dobrado, estreito na base e se abrindo para o alto. Dez mil é uma quantidade que se abre e se multiplica de repente, como um leque que revela muito mais do que parecia fechado.',
    strokeCount: 3,
    order: 13,
    examples: [
      { word: '一万円', reading: 'いちまんえん', meaning: 'dez mil ienes' },
      { word: '万一', reading: 'まんいち', meaning: 'no caso improvável de, se por acaso' },
      { word: '万年筆', reading: 'まんねんひつ', meaning: 'caneta-tinteiro' },
    ],
  },
  {
    char: '円',
    meaning: 'iene, círculo',
    onyomi: [{ kana: 'エン', romaji: 'en' }],
    kunyomi: [],
    radicals: [
      { char: '冂', name: 'moldura curva' },
      { char: '儿', name: 'pernas, base' },
    ],
    mnemonic:
      'Uma moldura curva por cima (冂) parece a borda de uma moeda, apoiada em uma base (儿) por baixo — o desenho de uma moeda redonda. Por isso o mesmo kanji significa tanto "círculo" quanto a moeda japonesa, o iene.',
    strokeCount: 4,
    order: 14,
    examples: [
      { word: '円', reading: 'えん', meaning: 'iene; círculo' },
      { word: '百円', reading: 'ひゃくえん', meaning: 'cem ienes' },
      { word: '円高', reading: 'えんだか', meaning: 'valorização do iene' },
    ],
  },
  {
    char: '時',
    meaning: 'hora, tempo',
    onyomi: [{ kana: 'ジ', romaji: 'ji' }],
    kunyomi: [{ kana: 'とき', romaji: 'toki' }],
    radicals: [
      { char: '日', name: 'sol' },
      { char: '寺', name: 'templo' },
    ],
    mnemonic:
      'O sol (日) passa bem por cima de um templo (寺). Os monges marcavam as horas do dia observando a posição do sol sobre o telhado do templo, tocando o sino a cada hora certa.',
    strokeCount: 10,
    order: 15,
    examples: [
      { word: '時間', reading: 'じかん', meaning: 'tempo, horário' },
      { word: '何時', reading: 'なんじ', meaning: 'que horas?' },
      { word: '時々', reading: 'ときどき', meaning: 'às vezes' },
    ],
  },
  {
    char: '分',
    meaning: 'minuto, dividir',
    onyomi: [
      { kana: 'フン', romaji: 'fun' },
      { kana: 'ブン', romaji: 'bun' },
      { kana: 'ブ', romaji: 'bu' },
    ],
    kunyomi: [
      { kana: 'わかる', romaji: 'wakaru' },
      { kana: 'わける', romaji: 'wakeru' },
    ],
    radicals: [
      { char: '八', name: 'dividir em duas partes' },
      { char: '刀', name: 'faca' },
    ],
    mnemonic:
      'Uma faca (刀) corta algo em duas partes que se afastam (八). Dividir com uma faca é a imagem perfeita de "separar" — e cada corte do relógio também separa a hora em minutos.',
    strokeCount: 4,
    order: 16,
    examples: [
      { word: '分かる', reading: 'わかる', meaning: 'entender' },
      { word: '五分', reading: 'ごふん', meaning: 'cinco minutos' },
      { word: '半分', reading: 'はんぶん', meaning: 'metade' },
    ],
  },
  {
    char: '半',
    meaning: 'metade',
    onyomi: [{ kana: 'ハン', romaji: 'han' }],
    kunyomi: [{ kana: 'なかば', romaji: 'nakaba' }],
    radicals: [
      { char: '八', name: 'dividir em duas partes' },
      { char: '十', name: 'cruz, o todo' },
    ],
    mnemonic:
      'Um número inteiro representado pela cruz (十) é cortado ao meio, separado em duas partes (八) — literalmente "metade de um todo", como cortar uma pizza inteira bem no centro.',
    strokeCount: 5,
    order: 17,
    examples: [
      { word: '半分', reading: 'はんぶん', meaning: 'metade' },
      { word: '一時半', reading: 'いちじはん', meaning: 'uma e meia (hora)' },
      { word: '半年', reading: 'はんとし', meaning: 'meio ano' },
    ],
  },
  {
    char: '週',
    meaning: 'semana',
    onyomi: [{ kana: 'シュウ', romaji: 'shuu' }],
    kunyomi: [],
    radicals: [
      { char: '辶', name: 'caminho, andar' },
      { char: '周', name: 'volta completa' },
    ],
    mnemonic:
      'Andar (辶) dando uma volta completa (周) até voltar ao ponto de partida — é exatamente isso que uma semana faz: passamos pelos sete dias e retornamos ao mesmo dia na semana seguinte.',
    strokeCount: 11,
    order: 18,
    examples: [
      { word: '今週', reading: 'こんしゅう', meaning: 'esta semana' },
      { word: '来週', reading: 'らいしゅう', meaning: 'semana que vem' },
      { word: '週末', reading: 'しゅうまつ', meaning: 'fim de semana' },
    ],
  },
  {
    char: '曜',
    meaning: 'dia da semana',
    onyomi: [{ kana: 'ヨウ', romaji: 'you' }],
    kunyomi: [],
    radicals: [
      { char: '日', name: 'sol' },
      { char: '隹', name: 'pássaro' },
      { char: '羽', name: 'asas' },
    ],
    mnemonic:
      'O sol (日) nasce e um pássaro (隹) abre as asas (羽) para voar em direção a ele. Cada novo dia da semana é como esse pássaro decolando ao amanhecer, sempre associado a um astro ou elemento diferente.',
    strokeCount: 18,
    order: 19,
    examples: [
      { word: '何曜日', reading: 'なんようび', meaning: 'que dia da semana?' },
      { word: '日曜日', reading: 'にちようび', meaning: 'domingo' },
      { word: '曜日', reading: 'ようび', meaning: 'dia da semana' },
    ],
  },
  {
    char: '年',
    meaning: 'ano',
    onyomi: [{ kana: 'ネン', romaji: 'nen' }],
    kunyomi: [{ kana: 'とし', romaji: 'toshi' }],
    radicals: [{ char: '年', name: 'espiga de arroz carregada nas costas' }],
    mnemonic:
      'A forma antiga de 年 desenhava uma pessoa carregando uma espiga de arroz nas costas. A colheita do arroz acontecia uma vez por ano, e esse ciclo agrícola virou sinônimo da passagem de um ano inteiro.',
    strokeCount: 6,
    order: 20,
    examples: [
      { word: '今年', reading: 'ことし', meaning: 'este ano' },
      { word: '来年', reading: 'らいねん', meaning: 'ano que vem' },
      { word: '一年', reading: 'いちねん', meaning: 'um ano' },
    ],
  },
  {
    char: '月',
    meaning: 'mês, lua',
    onyomi: [
      { kana: 'ゲツ', romaji: 'getsu' },
      { kana: 'ガツ', romaji: 'gatsu' },
    ],
    kunyomi: [{ kana: 'つき', romaji: 'tsuki' }],
    radicals: [{ char: '月', name: 'lua crescente' }],
    mnemonic:
      'O traçado lembra uma lua crescente vista no céu à noite. Como o calendário japonês antigo era lunar, o mesmo kanji serve tanto para "lua" quanto para "mês".',
    strokeCount: 4,
    order: 21,
    examples: [
      { word: '月', reading: 'つき', meaning: 'lua; mês' },
      { word: '今月', reading: 'こんげつ', meaning: 'este mês' },
      { word: '月曜日', reading: 'げつようび', meaning: 'segunda-feira' },
    ],
  },
  {
    char: '今',
    meaning: 'agora',
    onyomi: [{ kana: 'コン', romaji: 'kon' }],
    kunyomi: [{ kana: 'いま', romaji: 'ima' }],
    radicals: [
      { char: '人', name: 'pessoa curvada' },
      { char: '一', name: 'linha' },
    ],
    mnemonic:
      'Uma pessoa curvada (人) parece debruçada bem em cima de uma linha (一), exatamente neste instante. "Agora" é sempre esse momento presente em que alguém está debruçado sobre o que faz.',
    strokeCount: 4,
    order: 22,
    examples: [
      { word: '今', reading: 'いま', meaning: 'agora' },
      { word: '今日', reading: 'きょう', meaning: 'hoje' },
      { word: '今週', reading: 'こんしゅう', meaning: 'esta semana' },
    ],
  },
  {
    char: '火',
    meaning: 'fogo',
    onyomi: [{ kana: 'カ', romaji: 'ka' }],
    kunyomi: [{ kana: 'ひ', romaji: 'hi' }],
    radicals: [{ char: '火', name: 'chamas' }],
    mnemonic:
      'Duas pequenas chamas se erguem dos lados de uma fogueira central — o próprio traçado do kanji já parece um desenho de fogo queimando.',
    strokeCount: 4,
    order: 23,
    examples: [
      { word: '火', reading: 'ひ', meaning: 'fogo' },
      { word: '火曜日', reading: 'かようび', meaning: 'terça-feira' },
      { word: '花火', reading: 'はなび', meaning: 'fogos de artifício' },
    ],
  },
  {
    char: '水',
    meaning: 'água',
    onyomi: [{ kana: 'スイ', romaji: 'sui' }],
    kunyomi: [{ kana: 'みず', romaji: 'mizu' }],
    radicals: [{ char: '水', name: 'correnteza' }],
    mnemonic:
      'Uma linha central de correnteza com respingos escorrendo para os dois lados — o próprio traçado do kanji imita a água correndo em um riacho.',
    strokeCount: 4,
    order: 24,
    examples: [
      { word: '水', reading: 'みず', meaning: 'água' },
      { word: '水曜日', reading: 'すいようび', meaning: 'quarta-feira' },
      { word: '水泳', reading: 'すいえい', meaning: 'natação' },
    ],
  },
  {
    char: '木',
    meaning: 'árvore',
    onyomi: [
      { kana: 'モク', romaji: 'moku' },
      { kana: 'ボク', romaji: 'boku' },
    ],
    kunyomi: [{ kana: 'き', romaji: 'ki' }],
    radicals: [{ char: '木', name: 'árvore' }],
    mnemonic:
      'Um tronco vertical com galhos se abrindo para os lados e raízes se espalhando por baixo — a silhueta mais simples possível de uma árvore.',
    strokeCount: 4,
    order: 25,
    examples: [
      { word: '木', reading: 'き', meaning: 'árvore' },
      { word: '木曜日', reading: 'もくようび', meaning: 'quinta-feira' },
      { word: '木材', reading: 'もくざい', meaning: 'madeira' },
    ],
  },
  {
    char: '金',
    meaning: 'ouro, dinheiro',
    onyomi: [{ kana: 'キン', romaji: 'kin' }],
    kunyomi: [{ kana: 'かね', romaji: 'kane' }],
    radicals: [
      { char: '人', name: 'telhado' },
      { char: '王', name: 'tesouro' },
      { char: '丷', name: 'pepitas' },
    ],
    mnemonic:
      'Sob um telhado (人) que protege um tesouro (王), duas pequenas pepitas (丷) brilham escondidas — um cofre guardando ouro e joias, por isso o kanji também significa dinheiro.',
    strokeCount: 8,
    order: 26,
    examples: [
      { word: 'お金', reading: 'おかね', meaning: 'dinheiro' },
      { word: '金曜日', reading: 'きんようび', meaning: 'sexta-feira' },
      { word: '金色', reading: 'きんいろ', meaning: 'cor dourada' },
    ],
  },
  {
    char: '土',
    meaning: 'terra',
    onyomi: [
      { kana: 'ド', romaji: 'do' },
      { kana: 'ト', romaji: 'to' },
    ],
    kunyomi: [{ kana: 'つち', romaji: 'tsuchi' }],
    radicals: [
      { char: '十', name: 'cruz' },
      { char: '一', name: 'linha do chão' },
    ],
    mnemonic:
      'Uma cruz (十) fincada sobre uma linha que representa o chão (一) — como uma estaca cravada bem no meio de um terreno de terra.',
    strokeCount: 3,
    order: 27,
    examples: [
      { word: '土', reading: 'つち', meaning: 'terra, solo' },
      { word: '土曜日', reading: 'どようび', meaning: 'sábado' },
      { word: '土地', reading: 'とち', meaning: 'terreno, lote de terra' },
    ],
  },
  {
    char: '日',
    meaning: 'dia, sol',
    onyomi: [
      { kana: 'ニチ', romaji: 'nichi' },
      { kana: 'ジツ', romaji: 'jitsu' },
    ],
    kunyomi: [{ kana: 'ひ', romaji: 'hi' }],
    radicals: [{ char: '日', name: 'sol' }],
    mnemonic:
      'Um quadrado com um traço no meio representa o disco do sol visto no céu. Como um dia é definido pelo sol nascer e se pôr, o mesmo kanji vale tanto para "sol" quanto para "dia".',
    strokeCount: 4,
    order: 28,
    examples: [
      { word: '日曜日', reading: 'にちようび', meaning: 'domingo' },
      { word: '誕生日', reading: 'たんじょうび', meaning: 'aniversário' },
      { word: '毎日', reading: 'まいにち', meaning: 'todo dia' },
    ],
  },
  {
    char: '上',
    meaning: 'cima',
    onyomi: [{ kana: 'ジョウ', romaji: 'jou' }],
    kunyomi: [{ kana: 'うえ', romaji: 'ue' }],
    radicals: [
      { char: '卜', name: 'traço vertical curto' },
      { char: '一', name: 'linha de base' },
    ],
    mnemonic:
      'Uma linha de base (一) com um pequeno traço saindo para cima dela — a marca mais simples que existe para indicar "isso está acima daquela linha".',
    strokeCount: 3,
    order: 29,
    examples: [
      { word: '上', reading: 'うえ', meaning: 'cima, em cima de' },
      { word: '上手', reading: 'じょうず', meaning: 'habilidoso' },
      { word: '屋上', reading: 'おくじょう', meaning: 'terraço, topo do prédio' },
    ],
  },
  {
    char: '下',
    meaning: 'baixo',
    onyomi: [
      { kana: 'カ', romaji: 'ka' },
      { kana: 'ゲ', romaji: 'ge' },
    ],
    kunyomi: [{ kana: 'した', romaji: 'shita' }],
    radicals: [
      { char: '一', name: 'linha de base' },
      { char: '卜', name: 'traço vertical curto' },
    ],
    mnemonic:
      'O espelho de 上: agora o pequeno traço sai para baixo da linha de base (一). Se em cima da linha é 上, embaixo da mesma linha é exatamente 下.',
    strokeCount: 3,
    order: 30,
    examples: [
      { word: '下', reading: 'した', meaning: 'embaixo, abaixo de' },
      { word: '下手', reading: 'へた', meaning: 'sem habilidade' },
      { word: '地下', reading: 'ちか', meaning: 'subsolo' },
    ],
  },
  {
    char: '中',
    meaning: 'meio, dentro',
    onyomi: [{ kana: 'チュウ', romaji: 'chuu' }],
    kunyomi: [{ kana: 'なか', romaji: 'naka' }],
    radicals: [
      { char: '口', name: 'caixa, boca' },
      { char: '丨', name: 'linha vertical' },
    ],
    mnemonic:
      'Uma linha vertical atravessa bem o centro de uma caixa (口) — como uma flecha que acerta o meio exato do alvo, dividindo tudo em partes iguais dos dois lados.',
    strokeCount: 4,
    order: 31,
    examples: [
      { word: '中', reading: 'なか', meaning: 'dentro, meio' },
      { word: '中国', reading: 'ちゅうごく', meaning: 'China' },
      { word: '一日中', reading: 'いちにちじゅう', meaning: 'o dia inteiro' },
    ],
  },
  {
    char: '外',
    meaning: 'fora',
    onyomi: [
      { kana: 'ガイ', romaji: 'gai' },
      { kana: 'ゲ', romaji: 'ge' },
    ],
    kunyomi: [{ kana: 'そと', romaji: 'soto' }],
    radicals: [
      { char: '夕', name: 'noite, lua parcial' },
      { char: '卜', name: 'previsão, aposta' },
    ],
    mnemonic:
      'À noite (夕), quando a lua já não ilumina tudo, alguém faz uma previsão (卜) do que está lá fora, na escuridão além da porta de casa.',
    strokeCount: 5,
    order: 32,
    examples: [
      { word: '外', reading: 'そと', meaning: 'fora, exterior' },
      { word: '外国', reading: 'がいこく', meaning: 'país estrangeiro' },
      { word: '外国人', reading: 'がいこくじん', meaning: 'estrangeiro (pessoa)' },
    ],
  },
  {
    char: '前',
    meaning: 'antes, frente',
    onyomi: [{ kana: 'ゼン', romaji: 'zen' }],
    kunyomi: [{ kana: 'まえ', romaji: 'mae' }],
    radicals: [
      { char: '丷', name: 'pés apontando para frente' },
      { char: '一', name: 'linha do chão' },
      { char: '刂', name: 'lâmina' },
    ],
    mnemonic:
      'Pés (丷) avançam sobre uma linha do chão (一) na direção de uma lâmina afiada (刂) logo à frente. Para chegar "antes" dos outros é preciso caminhar para frente sem hesitar, mesmo com o perigo na dianteira.',
    strokeCount: 9,
    order: 33,
    examples: [
      { word: '名前', reading: 'なまえ', meaning: 'nome' },
      { word: '午前', reading: 'ごぜん', meaning: 'período da manhã, antes do meio-dia' },
      { word: '前', reading: 'まえ', meaning: 'antes; frente' },
    ],
  },
  {
    char: '後',
    meaning: 'depois, atrás',
    onyomi: [
      { kana: 'ゴ', romaji: 'go' },
      { kana: 'コウ', romaji: 'kou' },
    ],
    kunyomi: [
      { kana: 'うしろ', romaji: 'ushiro' },
      { kana: 'あと', romaji: 'ato' },
    ],
    radicals: [
      { char: '彳', name: 'passos, caminhar' },
      { char: '夂', name: 'pé arrastando' },
    ],
    mnemonic:
      'Alguém caminha (彳) mas um pé fica se arrastando para trás (夂), como quem sempre chega atrasado. Por isso esse kanji marca tanto o que vem "depois" quanto o que fica "atrás".',
    strokeCount: 9,
    order: 34,
    examples: [
      { word: '後ろ', reading: 'うしろ', meaning: 'atrás' },
      { word: '午後', reading: 'ごご', meaning: 'período da tarde, depois do meio-dia' },
      { word: '後で', reading: 'あとで', meaning: 'depois, mais tarde' },
    ],
  },
  {
    char: '左',
    meaning: 'esquerda',
    onyomi: [{ kana: 'サ', romaji: 'sa' }],
    kunyomi: [{ kana: 'ひだり', romaji: 'hidari' }],
    radicals: [
      { char: 'ナ', name: 'mão estendida' },
      { char: '工', name: 'ferramenta' },
    ],
    mnemonic:
      'Uma mão estendida (ナ) segura uma ferramenta de trabalho (工). Nas oficinas tradicionais, geralmente era a mão esquerda que segurava a peça firme enquanto a direita manejava a ferramenta principal.',
    strokeCount: 5,
    order: 35,
    examples: [
      { word: '左', reading: 'ひだり', meaning: 'esquerda' },
      { word: '左手', reading: 'ひだりて', meaning: 'mão esquerda' },
      { word: '左側', reading: 'ひだりがわ', meaning: 'lado esquerdo' },
    ],
  },
  {
    char: '右',
    meaning: 'direita',
    onyomi: [
      { kana: 'ウ', romaji: 'u' },
      { kana: 'ユウ', romaji: 'yuu' },
    ],
    kunyomi: [{ kana: 'みぎ', romaji: 'migi' }],
    radicals: [
      { char: 'ナ', name: 'mão estendida' },
      { char: '口', name: 'boca' },
    ],
    mnemonic:
      'Uma mão (ナ) se aproxima da boca (口) para levar comida até ela. A maioria das pessoas come com a mão direita, e é exatamente essa combinação que forma o kanji de "direita".',
    strokeCount: 5,
    order: 36,
    examples: [
      { word: '右', reading: 'みぎ', meaning: 'direita' },
      { word: '右手', reading: 'みぎて', meaning: 'mão direita' },
      { word: '右側', reading: 'みぎがわ', meaning: 'lado direito' },
    ],
  },
  {
    char: '東',
    meaning: 'leste',
    onyomi: [{ kana: 'トウ', romaji: 'tou' }],
    kunyomi: [{ kana: 'ひがし', romaji: 'higashi' }],
    radicals: [
      { char: '木', name: 'árvore' },
      { char: '日', name: 'sol' },
    ],
    mnemonic:
      'O sol (日) aparece preso atrás de uma árvore (木), bem no horizonte. É a imagem clássica do nascer do sol, que acontece sempre na direção do leste.',
    strokeCount: 8,
    order: 37,
    examples: [
      { word: '東', reading: 'ひがし', meaning: 'leste' },
      { word: '東京', reading: 'とうきょう', meaning: 'Tóquio' },
      { word: '東口', reading: 'ひがしぐち', meaning: 'saída/portão leste' },
    ],
  },
  {
    char: '西',
    meaning: 'oeste',
    onyomi: [
      { kana: 'セイ', romaji: 'sei' },
      { kana: 'サイ', romaji: 'sai' },
    ],
    kunyomi: [{ kana: 'にし', romaji: 'nishi' }],
    radicals: [{ char: '西', name: 'pássaro pousando no ninho' }],
    mnemonic:
      'A forma lembra um pássaro descendo e pousando em seu ninho ao anoitecer. Os pássaros voltam para casa bem na direção em que o sol está se pondo: o oeste.',
    strokeCount: 6,
    order: 38,
    examples: [
      { word: '西', reading: 'にし', meaning: 'oeste' },
      { word: '西口', reading: 'にしぐち', meaning: 'saída/portão oeste' },
      { word: '関西', reading: 'かんさい', meaning: 'região de Kansai' },
    ],
  },
  {
    char: '南',
    meaning: 'sul',
    onyomi: [{ kana: 'ナン', romaji: 'nan' }],
    kunyomi: [{ kana: 'みなみ', romaji: 'minami' }],
    radicals: [{ char: '南', name: 'tenda virada para o sol' }],
    mnemonic:
      'Imagine a entrada de uma tenda armada de frente para o lado mais quente e ensolarado do acampamento. Por causa da posição do Japão, virar a casa para esse lado significa virá-la para o sul.',
    strokeCount: 9,
    order: 39,
    examples: [
      { word: '南', reading: 'みなみ', meaning: 'sul' },
      { word: '南口', reading: 'みなみぐち', meaning: 'saída/portão sul' },
      { word: '東南アジア', reading: 'とうなんアジア', meaning: 'Sudeste Asiático' },
    ],
  },
  {
    char: '北',
    meaning: 'norte',
    onyomi: [{ kana: 'ホク', romaji: 'hoku' }],
    kunyomi: [{ kana: 'きた', romaji: 'kita' }],
    radicals: [{ char: '北', name: 'duas pessoas de costas' }],
    mnemonic:
      'Duas pessoas ficam de costas uma para a outra, cada uma olhando para um lado oposto. Da mesma forma, o norte é sempre o lado "de costas" e oposto ao sul num mapa.',
    strokeCount: 5,
    order: 40,
    examples: [
      { word: '北', reading: 'きた', meaning: 'norte' },
      { word: '北口', reading: 'きたぐち', meaning: 'saída/portão norte' },
      { word: '東北', reading: 'とうほく', meaning: 'região de Tohoku' },
    ],
  },
  {
    char: '大',
    meaning: 'grande',
    onyomi: [
      { kana: 'ダイ', romaji: 'dai' },
      { kana: 'タイ', romaji: 'tai' },
    ],
    kunyomi: [{ kana: 'おおきい', romaji: 'ookii' }],
    radicals: [{ char: '大', name: 'pessoa de braços abertos' }],
    mnemonic:
      'Uma pessoa abre bem os braços e as pernas, esticando o corpo o máximo possível. É assim que se mostra que algo é grande: ocupando o maior espaço possível.',
    strokeCount: 3,
    order: 41,
    examples: [
      { word: '大きい', reading: 'おおきい', meaning: 'grande' },
      { word: '大学', reading: 'だいがく', meaning: 'universidade' },
      { word: '大丈夫', reading: 'だいじょうぶ', meaning: 'tudo bem, sem problema' },
    ],
  },
  {
    char: '小',
    meaning: 'pequeno',
    onyomi: [{ kana: 'ショウ', romaji: 'shou' }],
    kunyomi: [{ kana: 'ちいさい', romaji: 'chiisai' }],
    radicals: [{ char: '小', name: 'três gotinhas' }],
    mnemonic:
      'Três gotinhas pequenas caem lado a lado, cada uma bem menor que a pessoa de braços abertos de 大 — uma imagem de algo que ocupa pouquíssimo espaço.',
    strokeCount: 3,
    order: 42,
    examples: [
      { word: '小さい', reading: 'ちいさい', meaning: 'pequeno' },
      { word: '小学校', reading: 'しょうがっこう', meaning: 'escola primária' },
      { word: '小説', reading: 'しょうせつ', meaning: 'romance, novela' },
    ],
  },
  {
    char: '高',
    meaning: 'alto, caro',
    onyomi: [{ kana: 'コウ', romaji: 'kou' }],
    kunyomi: [{ kana: 'たかい', romaji: 'takai' }],
    radicals: [
      { char: '亠', name: 'telhado pontudo' },
      { char: '口', name: 'janelas empilhadas' },
    ],
    mnemonic:
      'Um telhado pontudo (亠) fica no topo de uma torre com janelas empilhadas (口) uma sobre a outra. Quanto mais andares com janelas, mais alto — e mais caro — é o prédio.',
    strokeCount: 10,
    order: 43,
    examples: [
      { word: '高い', reading: 'たかい', meaning: 'alto; caro' },
      { word: '高校', reading: 'こうこう', meaning: 'ensino médio' },
      { word: '高速道路', reading: 'こうそくどうろ', meaning: 'rodovia, via expressa' },
    ],
  },
  {
    char: '安',
    meaning: 'barato, tranquilo',
    onyomi: [{ kana: 'アン', romaji: 'an' }],
    kunyomi: [{ kana: 'やすい', romaji: 'yasui' }],
    radicals: [
      { char: '宀', name: 'telhado, casa' },
      { char: '女', name: 'mulher' },
    ],
    mnemonic:
      'Uma mulher (女) sentada tranquila debaixo de um teto protegido (宀). Estar em casa, protegido e em paz, é a imagem original de "tranquilo" — que também deu origem ao sentido de algo "barato", sem complicação.',
    strokeCount: 6,
    order: 44,
    examples: [
      { word: '安い', reading: 'やすい', meaning: 'barato' },
      { word: '安全', reading: 'あんぜん', meaning: 'segurança' },
      { word: '不安', reading: 'ふあん', meaning: 'ansiedade, inquietação' },
    ],
  },
  {
    char: '新',
    meaning: 'novo',
    onyomi: [{ kana: 'シン', romaji: 'shin' }],
    kunyomi: [{ kana: 'あたらしい', romaji: 'atarashii' }],
    radicals: [
      { char: '立', name: 'em pé' },
      { char: '木', name: 'árvore' },
      { char: '斤', name: 'machado' },
    ],
    mnemonic:
      'Uma pessoa fica em pé (立) ao lado de uma árvore (木) recém-cortada com um machado (斤). A madeira fresca, ainda com o corte recente, é o próprio símbolo de algo novinho em folha.',
    strokeCount: 13,
    order: 45,
    examples: [
      { word: '新しい', reading: 'あたらしい', meaning: 'novo' },
      { word: '新聞', reading: 'しんぶん', meaning: 'jornal' },
      { word: '新幹線', reading: 'しんかんせん', meaning: 'trem-bala shinkansen' },
    ],
  },
  {
    char: '古',
    meaning: 'antigo, velho',
    onyomi: [{ kana: 'コ', romaji: 'ko' }],
    kunyomi: [{ kana: 'ふるい', romaji: 'furui' }],
    radicals: [
      { char: '十', name: 'dez' },
      { char: '口', name: 'boca' },
    ],
    mnemonic:
      'A mesma história (口, "boca") é contada de boca em boca por dez (十) gerações diferentes. Quando algo já passou por tantas gerações contando a mesma coisa, com certeza é bem antigo.',
    strokeCount: 5,
    order: 46,
    examples: [
      { word: '古い', reading: 'ふるい', meaning: 'antigo, velho' },
      { word: '中古', reading: 'ちゅうこ', meaning: 'usado, seminovo' },
      { word: '古本', reading: 'ふるほん', meaning: 'livro usado' },
    ],
  },
  {
    char: '長',
    meaning: 'longo, chefe',
    onyomi: [{ kana: 'チョウ', romaji: 'chou' }],
    kunyomi: [{ kana: 'ながい', romaji: 'nagai' }],
    radicals: [{ char: '長', name: 'cabelo comprido ao vento' }],
    mnemonic:
      'O desenho original mostrava um ancião de cabelos longos apoiado em uma bengala. Cabelo comprido de tão velho — e, tradicionalmente, a pessoa mais velha do grupo é quem vira o chefe.',
    strokeCount: 8,
    order: 47,
    examples: [
      { word: '長い', reading: 'ながい', meaning: 'longo' },
      { word: '校長', reading: 'こうちょう', meaning: 'diretor de escola' },
      { word: '社長', reading: 'しゃちょう', meaning: 'presidente de empresa' },
    ],
  },
  {
    char: '多',
    meaning: 'muitos',
    onyomi: [{ kana: 'タ', romaji: 'ta' }],
    kunyomi: [{ kana: 'おおい', romaji: 'ooi' }],
    radicals: [
      { char: '夕', name: 'noite' },
      { char: '夕', name: 'noite (repetida)' },
    ],
    mnemonic:
      'Duas luas de noite (夕) empilhadas, uma sobre a outra, como se muitas noites tivessem se repetido e se acumulado. A repetição do mesmo símbolo é o próprio truque visual para dizer "muitos".',
    strokeCount: 6,
    order: 48,
    examples: [
      { word: '多い', reading: 'おおい', meaning: 'muitos, numerosos' },
      { word: '多分', reading: 'たぶん', meaning: 'provavelmente, talvez' },
      { word: '多数', reading: 'たすう', meaning: 'grande número, maioria' },
    ],
  },
  {
    char: '少',
    meaning: 'poucos',
    onyomi: [{ kana: 'ショウ', romaji: 'shou' }],
    kunyomi: [
      { kana: 'すくない', romaji: 'sukunai' },
      { kana: 'すこし', romaji: 'sukoshi' },
    ],
    radicals: [
      { char: '小', name: 'pequeno' },
      { char: 'ノ', name: 'traço cortando' },
    ],
    mnemonic:
      'Um traço extra corta o kanji de "pequeno" (小), como se estivesse riscando e tirando ainda mais uma parte dele. O que já era pequeno fica reduzido a quase nada — ou seja, pouco.',
    strokeCount: 4,
    order: 49,
    examples: [
      { word: '少ない', reading: 'すくない', meaning: 'poucos' },
      { word: '少し', reading: 'すこし', meaning: 'um pouco' },
      { word: '少年', reading: 'しょうねん', meaning: 'menino, garoto' },
    ],
  },
  {
    char: '早',
    meaning: 'cedo',
    onyomi: [
      { kana: 'ソウ', romaji: 'sou' },
      { kana: 'サッ', romaji: 'sat' },
    ],
    kunyomi: [{ kana: 'はやい', romaji: 'hayai' }],
    radicals: [
      { char: '日', name: 'sol' },
      { char: '十', name: 'broto' },
    ],
    mnemonic:
      'O sol (日) aparece bem baixinho, ainda por cima de um broto que mal cresceu (十). O sol mal nasceu e a plantinha mal brotou: tudo ainda está no início bem cedo do dia.',
    strokeCount: 6,
    order: 50,
    examples: [
      { word: '早い', reading: 'はやい', meaning: 'cedo; rápido' },
      { word: '早朝', reading: 'そうちょう', meaning: 'de manhã cedo' },
      { word: '早速', reading: 'さっそく', meaning: 'imediatamente' },
    ],
  },
  {
    char: '白',
    meaning: 'branco',
    onyomi: [{ kana: 'ハク', romaji: 'haku' }],
    kunyomi: [{ kana: 'しろい', romaji: 'shiroi' }],
    radicals: [{ char: '白', name: 'raio de luz saindo do sol' }],
    mnemonic:
      'Um raio de luz sai disparado do topo de um sol (日). A luz pura e sem cor de um raio de sol é a própria definição visual do branco.',
    strokeCount: 5,
    order: 51,
    examples: [
      { word: '白い', reading: 'しろい', meaning: 'branco' },
      { word: '白', reading: 'しろ', meaning: 'branco (cor); inocente' },
      { word: '面白い', reading: 'おもしろい', meaning: 'interessante, engraçado' },
    ],
  },
  {
    char: '黒',
    meaning: 'preto',
    onyomi: [{ kana: 'コク', romaji: 'koku' }],
    kunyomi: [{ kana: 'くろい', romaji: 'kuroi' }],
    radicals: [
      { char: '里', name: 'vila, campo' },
      { char: '灬', name: 'chamas' },
    ],
    mnemonic:
      'Chamas (灬) queimam embaixo de um campo (里) até cobri-lo de fuligem. Depois que o fogo passa, tudo o que sobra é a fuligem preta espalhada pelo chão.',
    strokeCount: 11,
    order: 52,
    examples: [
      { word: '黒い', reading: 'くろい', meaning: 'preto' },
      { word: '黒', reading: 'くろ', meaning: 'preto (cor)' },
      { word: '黒板', reading: 'こくばん', meaning: 'quadro-negro' },
    ],
  },
  {
    char: '赤',
    meaning: 'vermelho',
    onyomi: [{ kana: 'セキ', romaji: 'seki' }],
    kunyomi: [{ kana: 'あかい', romaji: 'akai' }],
    radicals: [
      { char: '土', name: 'terra' },
      { char: '火', name: 'fogo' },
    ],
    mnemonic:
      'Fogo (火) queima bem em cima da terra (土), tingindo tudo ao redor de um vermelho intenso — como lava ou brasas quentes tocando o chão.',
    strokeCount: 7,
    order: 53,
    examples: [
      { word: '赤い', reading: 'あかい', meaning: 'vermelho' },
      { word: '赤', reading: 'あか', meaning: 'vermelho (cor)' },
      { word: '赤ちゃん', reading: 'あかちゃん', meaning: 'bebê' },
    ],
  },
  {
    char: '青',
    meaning: 'azul',
    onyomi: [{ kana: 'セイ', romaji: 'sei' }],
    kunyomi: [{ kana: 'あおい', romaji: 'aoi' }],
    radicals: [
      { char: '生', name: 'brotar, crescer' },
      { char: '月', name: 'lua (forma estilizada)' },
    ],
    mnemonic:
      'Uma planta brota e cresce (生) sob a luz prateada da lua (月). O verde-azulado da vegetação brotando à noite é exatamente o tom que esse kanji descreve, cobrindo tanto o azul quanto o verde.',
    strokeCount: 8,
    order: 54,
    examples: [
      { word: '青い', reading: 'あおい', meaning: 'azul' },
      { word: '青', reading: 'あお', meaning: 'azul (cor)' },
      { word: '青年', reading: 'せいねん', meaning: 'jovem, rapaz' },
    ],
  },
  {
    char: '山',
    meaning: 'montanha',
    onyomi: [{ kana: 'サン', romaji: 'san' }],
    kunyomi: [{ kana: 'やま', romaji: 'yama' }],
    radicals: [{ char: '山', name: 'três picos' }],
    mnemonic:
      'Três picos pontudos enfileirados, o do meio mais alto que os das pontas — a silhueta mais simples e reconhecível de uma cadeia de montanhas vista de longe.',
    strokeCount: 3,
    order: 55,
    examples: [
      { word: '山', reading: 'やま', meaning: 'montanha' },
      { word: '富士山', reading: 'ふじさん', meaning: 'Monte Fuji' },
      { word: '火山', reading: 'かざん', meaning: 'vulcão' },
    ],
  },
  {
    char: '川',
    meaning: 'rio',
    onyomi: [{ kana: 'セン', romaji: 'sen' }],
    kunyomi: [{ kana: 'かわ', romaji: 'kawa' }],
    radicals: [{ char: '川', name: 'rio' }],
    mnemonic:
      '川 são três correntes de água desenhadas lado a lado, como se você olhasse de cima para um rio serpenteando entre as margens. As três linhas verticais lembram ondas correndo todas na mesma direção — é literalmente o desenho de um rio.',
    strokeCount: 3,
    order: 56,
    examples: [
      { word: '川', reading: 'かわ', meaning: 'rio' },
      { word: '小川', reading: 'おがわ', meaning: 'riacho, córrego' },
      { word: '川岸', reading: 'かわぎし', meaning: 'margem do rio' },
    ],
  },
  {
    char: '田',
    meaning: 'arrozal',
    onyomi: [{ kana: 'デン', romaji: 'den' }],
    kunyomi: [{ kana: 'た', romaji: 'ta' }],
    radicals: [
      { char: '囗', name: 'cerca quadrada' },
      { char: '十', name: 'divisória em cruz' },
    ],
    mnemonic:
      '田 é um campo visto de cima, cercado por uma moldura quadrada e cortado ao meio por uma cruz — como as pequenas valas que dividem um arrozal em parcelas irrigadas. Imagine olhar do alto para os quadradinhos de água refletindo o céu: isso é um arrozal.',
    strokeCount: 5,
    order: 57,
    examples: [
      { word: '田んぼ', reading: 'たんぼ', meaning: 'arrozal, plantação de arroz' },
      { word: '田舎', reading: 'いなか', meaning: 'interior, zona rural' },
      { word: '水田', reading: 'すいでん', meaning: 'arrozal irrigado' },
    ],
  },
  {
    char: '天',
    meaning: 'céu',
    onyomi: [{ kana: 'テン', romaji: 'ten' }],
    kunyomi: [{ kana: 'あま', romaji: 'ama' }],
    radicals: [
      { char: '大', name: 'pessoa de braços abertos' },
      { char: '一', name: 'traço por cima da cabeça' },
    ],
    mnemonic:
      '天 é o kanji de "grande" (大, uma pessoa de braços e pernas bem abertos) com um traço extra por cima da cabeça. Esse traço é o teto do mundo — o céu que fica acima até da coisa mais grandiosa que existe, como alguém gigante esticando os braços para tentar tocá-lo.',
    strokeCount: 4,
    order: 58,
    examples: [
      { word: '天気', reading: 'てんき', meaning: 'tempo, clima' },
      { word: '天国', reading: 'てんごく', meaning: 'paraíso, céu' },
      { word: '天の川', reading: 'あまのがわ', meaning: 'Via Láctea' },
    ],
  },
  {
    char: '気',
    meaning: 'espírito, energia',
    onyomi: [{ kana: 'キ', romaji: 'ki' }],
    kunyomi: [],
    radicals: [
      { char: '气', name: 'vapor subindo' },
      { char: 'メ', name: 'faísca' },
    ],
    mnemonic:
      '気 tem o formato de uma tampa de panela com vapor saindo por cima (气) e, dentro, um traço em X parecido com uma faísca. Pense numa panela de arroz fervendo: o vapor que sobe dali é justamente o "ki" — a energia invisível que anima as pessoas e as coisas.',
    strokeCount: 6,
    order: 59,
    examples: [
      { word: '元気', reading: 'げんき', meaning: 'saudável, disposto' },
      { word: '気分', reading: 'きぶん', meaning: 'humor, estado de espírito' },
      { word: '病気', reading: 'びょうき', meaning: 'doença' },
    ],
  },
  {
    char: '雨',
    meaning: 'chuva',
    onyomi: [{ kana: 'ウ', romaji: 'u' }],
    kunyomi: [{ kana: 'あめ', romaji: 'ame' }],
    radicals: [{ char: '雨', name: 'chuva' }],
    mnemonic:
      '雨 é uma janela (a moldura de cima) com quatro gotinhas caindo por baixo dela — como olhar pela janela e ver a chuva escorrendo do lado de fora. É um dos kanji mais literalmente desenhados: parece mesmo uma cena de chuva.',
    strokeCount: 8,
    order: 60,
    examples: [
      { word: '雨', reading: 'あめ', meaning: 'chuva' },
      { word: '大雨', reading: 'おおあめ', meaning: 'chuva forte' },
      { word: '雨傘', reading: 'あまがさ', meaning: 'guarda-chuva' },
    ],
  },
  {
    char: '花',
    meaning: 'flor',
    onyomi: [{ kana: 'カ', romaji: 'ka' }],
    kunyomi: [{ kana: 'はな', romaji: 'hana' }],
    radicals: [
      { char: '艹', name: 'planta' },
      { char: '化', name: 'transformar' },
    ],
    mnemonic:
      '花 junta o radical de planta (艹, duas folhinhas no topo) com 化, que sozinho significa "transformar-se". Uma flor é exatamente isso: uma planta que se transforma, brotando pétalas coloridas a partir de um simples broto verde.',
    strokeCount: 7,
    order: 61,
    examples: [
      { word: '花', reading: 'はな', meaning: 'flor' },
      { word: '花火', reading: 'はなび', meaning: 'fogos de artifício' },
      { word: '花見', reading: 'はなみ', meaning: 'hanami, contemplação das flores de cerejeira' },
    ],
  },
  {
    char: '人',
    meaning: 'pessoa',
    onyomi: [
      { kana: 'ジン', romaji: 'jin' },
      { kana: 'ニン', romaji: 'nin' },
    ],
    kunyomi: [{ kana: 'ひと', romaji: 'hito' }],
    radicals: [{ char: '人', name: 'pessoa' }],
    mnemonic:
      '人 são duas pernas apoiadas uma na outra, como um boneco palito visto de lado — a perna da frente dando um passo e a de trás sustentando o peso. É o desenho mais simples possível de uma pessoa andando.',
    strokeCount: 2,
    order: 62,
    examples: [
      { word: '人', reading: 'ひと', meaning: 'pessoa' },
      { word: '日本人', reading: 'にほんじん', meaning: 'japonês, japonesa (pessoa)' },
      { word: '外国人', reading: 'がいこくじん', meaning: 'estrangeiro' },
    ],
  },
  {
    char: '子',
    meaning: 'criança',
    onyomi: [
      { kana: 'シ', romaji: 'shi' },
      { kana: 'ス', romaji: 'su' },
    ],
    kunyomi: [{ kana: 'こ', romaji: 'ko' }],
    radicals: [{ char: '子', name: 'criança' }],
    mnemonic:
      '子 mostra uma cabeça grande (o traço de cima) e um corpinho enrolado com os bracinhos abertos (o gancho de baixo) — a proporção de cabeça grande para corpo pequeno que todo bebê tem. É a caricatura de uma criança envolta em uma manta.',
    strokeCount: 3,
    order: 63,
    examples: [
      { word: '子供', reading: 'こども', meaning: 'criança' },
      { word: '女の子', reading: 'おんなのこ', meaning: 'menina' },
      { word: '男の子', reading: 'おとこのこ', meaning: 'menino' },
    ],
  },
  {
    char: '女',
    meaning: 'mulher',
    onyomi: [{ kana: 'ジョ', romaji: 'jo' }],
    kunyomi: [{ kana: 'おんな', romaji: 'onna' }],
    radicals: [{ char: '女', name: 'mulher' }],
    mnemonic:
      '女 desenha uma pessoa ajoelhada com os braços cruzados na frente do corpo, numa pose tradicional de sentar-se com elegância. É a forma antiga de representar uma mulher sentada em postura formal.',
    strokeCount: 3,
    order: 64,
    examples: [
      { word: '女の人', reading: 'おんなのひと', meaning: 'mulher' },
      { word: '女の子', reading: 'おんなのこ', meaning: 'menina' },
      { word: '彼女', reading: 'かのじょ', meaning: 'namorada; ela' },
    ],
  },
  {
    char: '男',
    meaning: 'homem',
    onyomi: [{ kana: 'ダン', romaji: 'dan' }],
    kunyomi: [{ kana: 'おとこ', romaji: 'otoko' }],
    radicals: [
      { char: '田', name: 'arrozal' },
      { char: '力', name: 'força' },
    ],
    mnemonic:
      '男 é o kanji de arrozal (田) em cima de 力, que sozinho significa "força" (lembra um braço flexionado). No Japão agrário antigo, era o homem quem trabalhava a força bruta no campo — daí arrozal mais força virar o kanji de "homem".',
    strokeCount: 7,
    order: 65,
    examples: [
      { word: '男の人', reading: 'おとこのひと', meaning: 'homem' },
      { word: '男の子', reading: 'おとこのこ', meaning: 'menino' },
      { word: '男性', reading: 'だんせい', meaning: 'homem, sexo masculino (formal)' },
    ],
  },
  {
    char: '父',
    meaning: 'pai',
    onyomi: [{ kana: 'フ', romaji: 'fu' }],
    kunyomi: [{ kana: 'ちち', romaji: 'chichi' }],
    radicals: [{ char: '父', name: 'pai' }],
    mnemonic:
      '父 pode ser visto como uma pessoa parada bem no centro, as pernas firmes no chão (os dois traços de baixo, em V) e os braços cruzados na altura do peito (o X no topo) — a postura séria e protetora de um pai plantado à porta de casa, de braços cruzados, esperando os filhos voltarem.',
    strokeCount: 4,
    order: 66,
    examples: [
      { word: '父', reading: 'ちち', meaning: 'pai (forma humilde, para o próprio pai)' },
      { word: 'お父さん', reading: 'おとうさん', meaning: 'pai, papai (forma educada)' },
      { word: '父母', reading: 'ふぼ', meaning: 'pais (pai e mãe)' },
    ],
  },
  {
    char: '母',
    meaning: 'mãe',
    onyomi: [{ kana: 'ボ', romaji: 'bo' }],
    kunyomi: [{ kana: 'はは', romaji: 'haha' }],
    radicals: [{ char: '母', name: 'mãe' }],
    mnemonic:
      '母 é parecido com 女 (mulher sentada), mas com dois pontinhos a mais no meio do corpo — os dois seios de quem amamenta. É o kanji de mulher com esse detalhe extra que marca justamente o papel de mãe.',
    strokeCount: 5,
    order: 67,
    examples: [
      { word: '母', reading: 'はは', meaning: 'mãe (forma humilde, para a própria mãe)' },
      { word: 'お母さん', reading: 'おかあさん', meaning: 'mãe, mamãe (forma educada)' },
      { word: '祖母', reading: 'そぼ', meaning: 'avó' },
    ],
  },
  {
    char: '友',
    meaning: 'amigo',
    onyomi: [{ kana: 'ユウ', romaji: 'yuu' }],
    kunyomi: [{ kana: 'とも', romaji: 'tomo' }],
    radicals: [
      { char: '⼜', name: 'mão' },
      { char: '⼜', name: 'outra mão' },
    ],
    mnemonic:
      '友 mostra duas mãos, uma sobre a outra, como um aperto de mão ou mãos dadas. Amizade é exatamente isso: duas mãos que se encontram e seguram uma a outra.',
    strokeCount: 4,
    order: 68,
    examples: [
      { word: '友達', reading: 'ともだち', meaning: 'amigo, amiga' },
      { word: '友人', reading: 'ゆうじん', meaning: 'amigo, amiga (forma mais formal)' },
      { word: '親友', reading: 'しんゆう', meaning: 'melhor amigo, amigo íntimo' },
    ],
  },
  {
    char: '私',
    meaning: 'eu',
    onyomi: [{ kana: 'シ', romaji: 'shi' }],
    kunyomi: [
      { kana: 'わたし', romaji: 'watashi' },
      { kana: 'わたくし', romaji: 'watakushi' },
    ],
    radicals: [
      { char: '禾', name: 'espiga de arroz' },
      { char: '厶', name: 'algo puxado só para si' },
    ],
    mnemonic:
      '私 junta 禾 (uma espiga de arroz, radical de cereais) com 厶, que sozinho significa "privado, particular" (como um braço puxando algo só para si). Antigamente, 私 indicava o arroz que alguém colhia e guardava para o próprio consumo, em vez de entregar à coletividade — daí virar o pronome "eu", o que é meu e particular.',
    strokeCount: 7,
    order: 69,
    examples: [
      { word: '私', reading: 'わたし', meaning: 'eu' },
      { word: '私たち', reading: 'わたしたち', meaning: 'nós' },
      { word: '私立', reading: 'しりつ', meaning: 'privado, particular (instituição)' },
    ],
  },
  {
    char: '目',
    meaning: 'olho',
    onyomi: [{ kana: 'モク', romaji: 'moku' }],
    kunyomi: [{ kana: 'め', romaji: 'me' }],
    radicals: [{ char: '目', name: 'olho' }],
    mnemonic:
      '目 é um olho desenhado na vertical: o contorno retangular é a órbita e os traços internos são o globo ocular. Basta girar mentalmente o retângulo para reconhecer um olho bem aberto olhando de frente.',
    strokeCount: 5,
    order: 70,
    examples: [
      { word: '目', reading: 'め', meaning: 'olho' },
      { word: '目玉', reading: 'めだま', meaning: 'globo ocular; atração principal' },
      { word: '目的', reading: 'もくてき', meaning: 'objetivo, propósito' },
    ],
  },
  {
    char: '耳',
    meaning: 'orelha',
    onyomi: [{ kana: 'ジ', romaji: 'ji' }],
    kunyomi: [{ kana: 'みみ', romaji: 'mimi' }],
    radicals: [{ char: '耳', name: 'orelha' }],
    mnemonic:
      '耳 desenha o contorno de uma orelha vista de lado, com suas dobras (os traços horizontais) e o lóbulo na base (o traço final, para baixo). Basta olhar a silhueta do próprio kanji de lado para reconhecer uma orelha.',
    strokeCount: 6,
    order: 71,
    examples: [
      { word: '耳', reading: 'みみ', meaning: 'orelha, ouvido' },
      { word: '耳鼻科', reading: 'じびか', meaning: 'otorrinolaringologia' },
      { word: '耳たぶ', reading: 'みみたぶ', meaning: 'lóbulo da orelha' },
    ],
  },
  {
    char: '口',
    meaning: 'boca',
    onyomi: [{ kana: 'コウ', romaji: 'kou' }],
    kunyomi: [{ kana: 'くち', romaji: 'kuchi' }],
    radicals: [{ char: '口', name: 'boca' }],
    mnemonic:
      '口 é só um quadrado — a forma mais simples de desenhar uma boca aberta, como quando alguém fala "ó" bem redondo. Muitos kanji ligados a falar, comer ou lugares com entrada usam esse quadradinho como boca.',
    strokeCount: 3,
    order: 72,
    examples: [
      { word: '口', reading: 'くち', meaning: 'boca' },
      { word: '入口', reading: 'いりぐち', meaning: 'entrada' },
      { word: '出口', reading: 'でぐち', meaning: 'saída' },
    ],
  },
  {
    char: '手',
    meaning: 'mão',
    onyomi: [{ kana: 'シュ', romaji: 'shu' }],
    kunyomi: [{ kana: 'て', romaji: 'te' }],
    radicals: [{ char: '手', name: 'mão' }],
    mnemonic:
      '手 mostra um braço vertical terminando em três dedos abertos no topo — uma versão estilizada de uma mão espalmada, como se você estivesse acenando ou pedindo para alguém parar.',
    strokeCount: 4,
    order: 73,
    examples: [
      { word: '手', reading: 'て', meaning: 'mão' },
      { word: '手紙', reading: 'てがみ', meaning: 'carta' },
      { word: '上手', reading: 'じょうず', meaning: 'habilidoso, bom em algo' },
    ],
  },
  {
    char: '足',
    meaning: 'pé, perna',
    onyomi: [{ kana: 'ソク', romaji: 'soku' }],
    kunyomi: [
      { kana: 'あし', romaji: 'ashi' },
      { kana: 'たりる', romaji: 'tariru' },
    ],
    radicals: [
      { char: '口', name: 'joelho dobrado' },
      { char: '止', name: 'pé parado' },
    ],
    mnemonic:
      '足 tem um quadrado em cima (a coxa dobrada no joelho) sobre o kanji 止, que sozinho representa um pé parado. Junte os dois e você tem a perna inteira, do joelho até a pegada do pé no chão.',
    strokeCount: 7,
    order: 74,
    examples: [
      { word: '足', reading: 'あし', meaning: 'pé, perna' },
      { word: '足りる', reading: 'たりる', meaning: 'ser suficiente, bastar' },
      { word: '足首', reading: 'あしくび', meaning: 'tornozelo' },
    ],
  },
  {
    char: '車',
    meaning: 'carro',
    onyomi: [{ kana: 'シャ', romaji: 'sha' }],
    kunyomi: [{ kana: 'くるま', romaji: 'kuruma' }],
    radicals: [{ char: '車', name: 'carro' }],
    mnemonic:
      '車 é a vista de cima de uma carroça: o quadrado central é a carroceria e o traço vertical que atravessa tudo é o eixo que liga as rodas dos dois lados. É literalmente o desenho de um veículo sobre rodas, herdado de quando "carro" significava carroça.',
    strokeCount: 7,
    order: 75,
    examples: [
      { word: '車', reading: 'くるま', meaning: 'carro' },
      { word: '電車', reading: 'でんしゃ', meaning: 'trem elétrico' },
      { word: '自動車', reading: 'じどうしゃ', meaning: 'automóvel' },
    ],
  },
  {
    char: '電',
    meaning: 'eletricidade',
    onyomi: [{ kana: 'デン', romaji: 'den' }],
    kunyomi: [],
    radicals: [
      { char: '雨', name: 'chuva' },
      { char: '田', name: 'raio caindo' },
    ],
    mnemonic:
      '電 é a chuva (雨, a moldura com gotas) com um raio caindo logo abaixo dela. Antes de existir eletricidade em fios, o único jeito de ver energia elétrica na natureza era um raio rasgando o céu durante a tempestade.',
    strokeCount: 13,
    order: 76,
    examples: [
      { word: '電気', reading: 'でんき', meaning: 'eletricidade, luz elétrica' },
      { word: '電話', reading: 'でんわ', meaning: 'telefone' },
      { word: '電車', reading: 'でんしゃ', meaning: 'trem elétrico' },
    ],
  },
  {
    char: '話',
    meaning: 'falar, história',
    onyomi: [{ kana: 'ワ', romaji: 'wa' }],
    kunyomi: [
      { kana: 'はなす', romaji: 'hanasu' },
      { kana: 'はなし', romaji: 'hanashi' },
    ],
    radicals: [
      { char: '言', name: 'palavra' },
      { char: '舌', name: 'língua' },
    ],
    mnemonic:
      '話 junta 言 (o radical de "palavra", uma boca com linhas de fala saindo) com 舌, que sozinho significa "língua" (o órgão da boca). Falar é justamente isso: mexer a língua para produzir palavras.',
    strokeCount: 13,
    order: 77,
    examples: [
      { word: '話す', reading: 'はなす', meaning: 'falar' },
      { word: '電話', reading: 'でんわ', meaning: 'telefone' },
      { word: '会話', reading: 'かいわ', meaning: 'conversa' },
    ],
  },
  {
    char: '語',
    meaning: 'língua, idioma',
    onyomi: [{ kana: 'ゴ', romaji: 'go' }],
    kunyomi: [{ kana: 'かたる', romaji: 'kataru' }],
    radicals: [
      { char: '言', name: 'palavra' },
      { char: '吾', name: 'nós' },
    ],
    mnemonic:
      '語 é 言 (palavra, falar) ao lado de 吾, um caractere antigo para "eu, nós" usado aqui como pista de som. Pense nele como "as palavras que nós usamos" — o conjunto de palavras que forma um idioma inteiro.',
    strokeCount: 14,
    order: 78,
    examples: [
      { word: '日本語', reading: 'にほんご', meaning: 'língua japonesa' },
      { word: '英語', reading: 'えいご', meaning: 'língua inglesa' },
      { word: '単語', reading: 'たんご', meaning: 'palavra, vocábulo' },
    ],
  },
  {
    char: '本',
    meaning: 'livro, origem',
    onyomi: [{ kana: 'ホン', romaji: 'hon' }],
    kunyomi: [{ kana: 'もと', romaji: 'moto' }],
    radicals: [
      { char: '木', name: 'árvore' },
      { char: '一', name: 'raiz na base do tronco' },
    ],
    mnemonic:
      '本 é o kanji de árvore (木) com um traço extra bem na base do tronco, marcando a raiz — a origem de onde tudo cresce. Um livro se chama assim porque, antigamente, era feito de tiras de madeira amarradas: o material vem direto da árvore.',
    strokeCount: 5,
    order: 79,
    examples: [
      { word: '本', reading: 'ほん', meaning: 'livro' },
      { word: '日本', reading: 'にほん', meaning: 'Japão' },
      { word: '本当', reading: 'ほんとう', meaning: 'verdade, de verdade' },
    ],
  },
  {
    char: '学',
    meaning: 'estudo',
    onyomi: [{ kana: 'ガク', romaji: 'gaku' }],
    kunyomi: [{ kana: 'まなぶ', romaji: 'manabu' }],
    radicals: [
      { char: '冖', name: 'teto' },
      { char: '子', name: 'criança' },
    ],
    mnemonic:
      '学 tem uma criança (子) embaixo de um teto (冖), com um emaranhado de traços por cima representando ideias novas entrando na cabeça dela. É a cena de uma criança sentada dentro da sala de aula, coberta por um turbilhão de conhecimento novo.',
    strokeCount: 8,
    order: 80,
    examples: [
      { word: '学生', reading: 'がくせい', meaning: 'estudante' },
      { word: '学校', reading: 'がっこう', meaning: 'escola' },
      { word: '大学', reading: 'だいがく', meaning: 'universidade' },
    ],
  },
  {
    char: '校',
    meaning: 'escola',
    onyomi: [{ kana: 'コウ', romaji: 'kou' }],
    kunyomi: [],
    radicals: [
      { char: '木', name: 'madeira' },
      { char: '交', name: 'cruzar' },
    ],
    mnemonic:
      '校 junta 木 (madeira) com 交, que sozinho significa "cruzar" (duas pernas se cruzando). Escolas antigas eram construções de madeira onde os caminhos de várias crianças se cruzavam todos os dias — todo mundo se encontrando no mesmo prédio de madeira.',
    strokeCount: 10,
    order: 81,
    examples: [
      { word: '学校', reading: 'がっこう', meaning: 'escola' },
      { word: '高校', reading: 'こうこう', meaning: 'colégio, ensino médio' },
      { word: '校長', reading: 'こうちょう', meaning: 'diretor, diretora de escola' },
    ],
  },
  {
    char: '生',
    meaning: 'vida, nascer',
    onyomi: [
      { kana: 'セイ', romaji: 'sei' },
      { kana: 'ショウ', romaji: 'shou' },
    ],
    kunyomi: [
      { kana: 'いきる', romaji: 'ikiru' },
      { kana: 'うまれる', romaji: 'umareru' },
      { kana: 'なま', romaji: 'nama' },
    ],
    radicals: [{ char: '生', name: 'broto saindo da terra' }],
    mnemonic:
      '生 desenha um broto verde saindo da linha do chão (o traço horizontal de baixo) e continuando a crescer para cima. É a imagem mais simples de vida nascendo: uma plantinha rompendo a terra.',
    strokeCount: 5,
    order: 82,
    examples: [
      { word: '先生', reading: 'せんせい', meaning: 'professor, professora' },
      { word: '学生', reading: 'がくせい', meaning: 'estudante' },
      { word: '生まれる', reading: 'うまれる', meaning: 'nascer' },
    ],
  },
  {
    char: '先',
    meaning: 'antes, à frente',
    onyomi: [{ kana: 'セン', romaji: 'sen' }],
    kunyomi: [{ kana: 'さき', romaji: 'saki' }],
    radicals: [
      { char: '𠂉', name: 'pé dando um passo' },
      { char: '儿', name: 'pernas de uma pessoa' },
    ],
    mnemonic:
      '先 mostra um pé dando um passo à frente (a parte de cima) sobre um par de pernas (儿, embaixo). Quem está "à frente" literalmente já deu o passo antes de todo mundo — daí também virar a palavra para quem vem antes, como um professor ou alguém mais experiente.',
    strokeCount: 6,
    order: 83,
    examples: [
      { word: '先生', reading: 'せんせい', meaning: 'professor, professora' },
      { word: '先週', reading: 'せんしゅう', meaning: 'semana passada' },
      { word: '先に', reading: 'さきに', meaning: 'antes, primeiro' },
    ],
  },
  {
    char: '名',
    meaning: 'nome',
    onyomi: [
      { kana: 'メイ', romaji: 'mei' },
      { kana: 'ミョウ', romaji: 'myou' },
    ],
    kunyomi: [{ kana: 'な', romaji: 'na' }],
    radicals: [
      { char: '夕', name: 'entardecer' },
      { char: '口', name: 'boca' },
    ],
    mnemonic:
      '名 junta 夕 (entardecer, noite) com 口 (boca). Antigamente, sem luz elétrica, à noite não dava para reconhecer o rosto de ninguém — então era preciso dizer o próprio nome em voz alta (boca) para se identificar no escuro.',
    strokeCount: 6,
    order: 84,
    examples: [
      { word: '名前', reading: 'なまえ', meaning: 'nome' },
      { word: '有名', reading: 'ゆうめい', meaning: 'famoso' },
      { word: '名字', reading: 'みょうじ', meaning: 'sobrenome' },
    ],
  },
  {
    char: '国',
    meaning: 'país',
    onyomi: [{ kana: 'コク', romaji: 'koku' }],
    kunyomi: [{ kana: 'くに', romaji: 'kuni' }],
    radicals: [
      { char: '囗', name: 'fronteira' },
      { char: '玉', name: 'joia' },
    ],
    mnemonic:
      '国 é uma joia preciosa (玉, uma pedra de valor) protegida dentro de uma fronteira fechada (囗, o quadrado ao redor). Um país é exatamente isso: um território de fronteiras bem demarcadas guardando o que seu povo mais valoriza.',
    strokeCount: 8,
    order: 85,
    examples: [
      { word: '国', reading: 'くに', meaning: 'país' },
      { word: '外国', reading: 'がいこく', meaning: 'país estrangeiro' },
      { word: '国語', reading: 'こくご', meaning: 'língua japonesa (como matéria escolar)' },
    ],
  },
  {
    char: '会',
    meaning: 'encontrar, associação',
    onyomi: [{ kana: 'カイ', romaji: 'kai' }],
    kunyomi: [{ kana: 'あう', romaji: 'au' }],
    radicals: [
      { char: '人', name: 'telhado, pessoas abrigadas' },
      { char: '云', name: 'nuvens se encontrando' },
    ],
    mnemonic:
      '会 tem um telhado triangular no topo, como pessoas se abrigando juntas, sobre uma base que lembra nuvens se encontrando no céu. Imagine várias pessoas se juntando debaixo do mesmo teto para conversar — isso é um encontro, e por extensão também vira "associação/empresa", um grupo de gente reunida em torno do mesmo propósito.',
    strokeCount: 6,
    order: 86,
    examples: [
      { word: '会う', reading: 'あう', meaning: 'encontrar-se (com alguém)' },
      { word: '会社', reading: 'かいしゃ', meaning: 'empresa' },
      { word: '会話', reading: 'かいわ', meaning: 'conversa' },
    ],
  },
  {
    char: '社',
    meaning: 'empresa',
    onyomi: [{ kana: 'シャ', romaji: 'sha' }],
    kunyomi: [],
    radicals: [
      { char: '示', name: 'altar' },
      { char: '土', name: 'terra' },
    ],
    mnemonic:
      '社 junta 示 (radical de altar, ligado a rituais e divindades) com 土 (terra). Vem da ideia de um santuário erguido sobre um pedaço de terra para o deus local — depois, o sentido se expandiu para qualquer organização de pessoas reunidas em torno de um mesmo propósito, como uma empresa.',
    strokeCount: 7,
    order: 87,
    examples: [
      { word: '会社', reading: 'かいしゃ', meaning: 'empresa' },
      { word: '社会', reading: 'しゃかい', meaning: 'sociedade' },
      { word: '社員', reading: 'しゃいん', meaning: 'funcionário de empresa' },
    ],
  },
  {
    char: '店',
    meaning: 'loja',
    onyomi: [{ kana: 'テン', romaji: 'ten' }],
    kunyomi: [{ kana: 'みせ', romaji: 'mise' }],
    radicals: [
      { char: '广', name: 'telhado inclinado' },
      { char: '占', name: 'ocupar um lugar' },
    ],
    mnemonic:
      '店 é um telhado inclinado (广, uma construção aberta de um lado) sobre 占, que sozinho significa "ocupar um lugar". Uma loja é justamente um espaço construído que alguém ocupa para expor e vender suas mercadorias.',
    strokeCount: 8,
    order: 88,
    examples: [
      { word: '店', reading: 'みせ', meaning: 'loja' },
      { word: '店員', reading: 'てんいん', meaning: 'atendente de loja' },
      { word: '書店', reading: 'しょてん', meaning: 'livraria' },
    ],
  },
  {
    char: '駅',
    meaning: 'estação',
    onyomi: [{ kana: 'エキ', romaji: 'eki' }],
    kunyomi: [],
    radicals: [
      { char: '馬', name: 'cavalo' },
      { char: '尺', name: 'medida' },
    ],
    mnemonic:
      '駅 tem o radical de cavalo (馬) ao lado de 尺, que sozinho significa "medida". Antes dos trens, uma "estação" era um posto de troca de cavalos, colocado a intervalos medidos ao longo da estrada — daí o cavalo ter ficado gravado no kanji até hoje, mesmo depois de virar estação de trem.',
    strokeCount: 14,
    order: 89,
    examples: [
      { word: '駅', reading: 'えき', meaning: 'estação (de trem)' },
      { word: '駅員', reading: 'えきいん', meaning: 'funcionário da estação' },
      { word: '駅前', reading: 'えきまえ', meaning: 'em frente à estação' },
    ],
  },
  {
    char: '道',
    meaning: 'caminho',
    onyomi: [{ kana: 'ドウ', romaji: 'dou' }],
    kunyomi: [{ kana: 'みち', romaji: 'michi' }],
    radicals: [
      { char: '辶', name: 'ir por um caminho' },
      { char: '首', name: 'cabeça' },
    ],
    mnemonic:
      '道 junta o radical de movimento 辶 (sempre indica ir de um lugar a outro) com 首, que sozinho significa "cabeça". É seguir um caminho guiando-se pela própria cabeça, decidindo para onde ir — o mesmo kanji usado em "dō" de judô, caminho como disciplina de vida.',
    strokeCount: 12,
    order: 90,
    examples: [
      { word: '道', reading: 'みち', meaning: 'caminho, rua' },
      { word: '道路', reading: 'どうろ', meaning: 'rodovia, via pública' },
      { word: '歩道', reading: 'ほどう', meaning: 'calçada' },
    ],
  },
  {
    char: '見',
    meaning: 'ver',
    onyomi: [{ kana: 'ケン', romaji: 'ken' }],
    kunyomi: [
      { kana: 'みる', romaji: 'miru' },
      { kana: 'みえる', romaji: 'mieru' },
    ],
    radicals: [
      { char: '目', name: 'olho' },
      { char: '儿', name: 'pernas de uma pessoa' },
    ],
    mnemonic:
      '見 é um olho enorme (目) em cima de um par de pernas (儿) — uma pessoa inteira reduzida ao essencial para essa ação: os olhos que enxergam e as pernas que a levam para perto do que ela quer ver.',
    strokeCount: 7,
    order: 91,
    examples: [
      { word: '見る', reading: 'みる', meaning: 'ver, olhar' },
      { word: '見える', reading: 'みえる', meaning: 'ser visível, poder ver' },
      { word: '見学', reading: 'けんがく', meaning: 'visita de observação, estudo' },
    ],
  },
  {
    char: '聞',
    meaning: 'ouvir, perguntar',
    onyomi: [{ kana: 'ブン', romaji: 'bun' }],
    kunyomi: [
      { kana: 'きく', romaji: 'kiku' },
      { kana: 'きこえる', romaji: 'kikoeru' },
    ],
    radicals: [
      { char: '門', name: 'portão' },
      { char: '耳', name: 'orelha' },
    ],
    mnemonic:
      '聞 é uma orelha (耳) espiando por dentro de um portão fechado (門). Imagine encostar o ouvido numa porta para tentar escutar uma conversa do outro lado — é exatamente esse gesto de aguçar o ouvido que o kanji desenha.',
    strokeCount: 14,
    order: 92,
    examples: [
      { word: '聞く', reading: 'きく', meaning: 'ouvir, escutar, perguntar' },
      { word: '新聞', reading: 'しんぶん', meaning: 'jornal' },
      { word: '聞こえる', reading: 'きこえる', meaning: 'ser audível, poder ouvir' },
    ],
  },
  {
    char: '読',
    meaning: 'ler',
    onyomi: [{ kana: 'ドク', romaji: 'doku' }],
    kunyomi: [{ kana: 'よむ', romaji: 'yomu' }],
    radicals: [
      { char: '言', name: 'palavra' },
      { char: '売', name: 'vender' },
    ],
    mnemonic:
      '読 junta 言 (palavra, fala) com 売, que sozinho significa "vender". Pense num vendedor de jornais gritando na rua as palavras das manchetes para anunciar as notícias — ele está literalmente "vendendo palavras em voz alta", e ler é decodificar essas palavras.',
    strokeCount: 14,
    order: 93,
    examples: [
      { word: '読む', reading: 'よむ', meaning: 'ler' },
      { word: '読書', reading: 'どくしょ', meaning: 'leitura (de livros)' },
      { word: '音読', reading: 'おんどく', meaning: 'leitura em voz alta' },
    ],
  },
  {
    char: '書',
    meaning: 'escrever',
    onyomi: [{ kana: 'ショ', romaji: 'sho' }],
    kunyomi: [{ kana: 'かく', romaji: 'kaku' }],
    radicals: [
      { char: '聿', name: 'mão segurando um pincel' },
      { char: '日', name: 'sol' },
    ],
    mnemonic:
      '書 tem em cima uma mão segurando um pincel (聿) e embaixo o sol (日). Imagine um escriba sentado à luz do dia, pincel na mão, registrando tudo no papel enquanto há claridade — escrever era um trabalho que se fazia à luz do sol.',
    strokeCount: 10,
    order: 94,
    examples: [
      { word: '書く', reading: 'かく', meaning: 'escrever' },
      { word: '辞書', reading: 'じしょ', meaning: 'dicionário' },
      { word: '図書館', reading: 'としょかん', meaning: 'biblioteca' },
    ],
  },
  {
    char: '食',
    meaning: 'comer',
    onyomi: [{ kana: 'ショク', romaji: 'shoku' }],
    kunyomi: [{ kana: 'たべる', romaji: 'taberu' }],
    radicals: [
      { char: '人', name: 'tampa' },
      { char: '良', name: 'bom' },
    ],
    mnemonic:
      '食 tem um telhado, como a tampa de uma tigela, sobre 良, que sozinho significa "bom". É a imagem de uma tigela de comida tampada, guardando algo bom por dentro, esperando para ser aberta e comida.',
    strokeCount: 9,
    order: 95,
    examples: [
      { word: '食べる', reading: 'たべる', meaning: 'comer' },
      { word: '食事', reading: 'しょくじ', meaning: 'refeição' },
      { word: '朝食', reading: 'ちょうしょく', meaning: 'café da manhã' },
    ],
  },
  {
    char: '飲',
    meaning: 'beber',
    onyomi: [{ kana: 'イン', romaji: 'in' }],
    kunyomi: [{ kana: 'のむ', romaji: 'nomu' }],
    radicals: [
      { char: '食', name: 'tigela de comida' },
      { char: '欠', name: 'boca bem aberta' },
    ],
    mnemonic:
      '飲 é o radical de comida (食, a tigela tampada) ao lado de 欠, que sozinho representa uma pessoa de boca bem aberta, como num bocejo. Beber é usar essa boca aberta para receber um líquido, assim como comer usa a boca para o sólido — os dois lados do mesmo radical de alimentação.',
    strokeCount: 12,
    order: 96,
    examples: [
      { word: '飲む', reading: 'のむ', meaning: 'beber' },
      { word: '飲み物', reading: 'のみもの', meaning: 'bebida' },
      { word: '飲食店', reading: 'いんしょくてん', meaning: 'restaurante, estabelecimento de comida e bebida' },
    ],
  },
  {
    char: '行',
    meaning: 'ir',
    onyomi: [
      { kana: 'コウ', romaji: 'kou' },
      { kana: 'ギョウ', romaji: 'gyou' },
    ],
    kunyomi: [
      { kana: 'いく', romaji: 'iku' },
      { kana: 'おこなう', romaji: 'okonau' },
    ],
    radicals: [{ char: '行', name: 'cruzamento de caminhos' }],
    mnemonic:
      '行 desenha um cruzamento visto de cima: duas ruas perpendiculares se cortando, uma de cada lado do kanji. Um cruzamento é o símbolo perfeito de "ir" — é o lugar por onde se passa para chegar a qualquer destino, e também de "realizar", no sentido de colocar um plano em movimento.',
    strokeCount: 6,
    order: 97,
    examples: [
      { word: '行く', reading: 'いく', meaning: 'ir' },
      { word: '旅行', reading: 'りょこう', meaning: 'viagem' },
      { word: '銀行', reading: 'ぎんこう', meaning: 'banco' },
    ],
  },
  {
    char: '来',
    meaning: 'vir',
    onyomi: [{ kana: 'ライ', romaji: 'rai' }],
    kunyomi: [{ kana: 'くる', romaji: 'kuru' }],
    radicals: [
      { char: '木', name: 'árvore' },
      { char: '𛀁', name: 'pegadas convergindo' },
    ],
    mnemonic:
      '来 pode ser visto como uma árvore (木) com traços extras convergindo por cima, como pegadas vindas de direções diferentes que se encontram no mesmo ponto. É a ideia de algo chegando de longe até um lugar central — o sentido de "vir".',
    strokeCount: 7,
    order: 98,
    examples: [
      { word: '来る', reading: 'くる', meaning: 'vir' },
      { word: '来週', reading: 'らいしゅう', meaning: 'semana que vem' },
      { word: '未来', reading: 'みらい', meaning: 'futuro' },
    ],
  },
  {
    char: '出',
    meaning: 'sair',
    onyomi: [{ kana: 'シュツ', romaji: 'shutsu' }],
    kunyomi: [
      { kana: 'でる', romaji: 'deru' },
      { kana: 'だす', romaji: 'dasu' },
    ],
    radicals: [{ char: '出', name: 'saindo além do limite' }],
    mnemonic:
      '出 parece um pé (a forma de baixo) ultrapassando uma soleira e continuando a crescer para fora dela (a forma de cima, maior, saindo do contorno). É a imagem de algo que estava contido e agora avança para além do limite — exatamente o gesto de sair.',
    strokeCount: 5,
    order: 99,
    examples: [
      { word: '出る', reading: 'でる', meaning: 'sair, partir' },
      { word: '出す', reading: 'だす', meaning: 'tirar para fora, entregar, enviar' },
      { word: '出口', reading: 'でぐち', meaning: 'saída' },
    ],
  },
  {
    char: '入',
    meaning: 'entrar',
    onyomi: [{ kana: 'ニュウ', romaji: 'nyuu' }],
    kunyomi: [
      { kana: 'はいる', romaji: 'hairu' },
      { kana: 'いれる', romaji: 'ireru' },
    ],
    radicals: [{ char: '入', name: 'cunha entrando numa fresta' }],
    mnemonic:
      '入 é como uma cunha apontando para baixo e para dentro, estreitando-se até um ponto — como enfiar a ponta de algo numa fresta para fazê-lo entrar. É quase o kanji de 人 (pessoa), mas com as pernas fechadas, como alguém se espremendo para entrar por um vão estreito.',
    strokeCount: 2,
    order: 100,
    examples: [
      { word: '入る', reading: 'はいる', meaning: 'entrar' },
      { word: '入れる', reading: 'いれる', meaning: 'colocar dentro, inserir' },
      { word: '入学', reading: 'にゅうがく', meaning: 'ingresso, matrícula escolar' },
    ],
  },
  {
    char: '立',
    meaning: 'ficar em pé',
    onyomi: [{ kana: 'リツ', romaji: 'ritsu' }],
    kunyomi: [
      { kana: 'たつ', romaji: 'tatsu' },
      { kana: 'たてる', romaji: 'tateru' },
    ],
    radicals: [{ char: '立', name: 'pessoa em pé sobre o chão' }],
    mnemonic:
      '立 mostra uma figura com braços abertos (a parte de cima, parecida com 大) apoiada sobre uma linha horizontal firme, o chão, embaixo. É a postura de alguém plantado bem em pé, com os pés fincados no chão.',
    strokeCount: 5,
    order: 101,
    examples: [
      { word: '立つ', reading: 'たつ', meaning: 'ficar em pé, levantar-se' },
      { word: '立てる', reading: 'たてる', meaning: 'erguer, montar' },
      { word: '立派', reading: 'りっぱ', meaning: 'esplêndido, admirável' },
    ],
  },
  {
    char: '休',
    meaning: 'descansar',
    onyomi: [{ kana: 'キュウ', romaji: 'kyuu' }],
    kunyomi: [{ kana: 'やすむ', romaji: 'yasumu' }],
    radicals: [
      { char: '亻', name: 'pessoa' },
      { char: '木', name: 'árvore' },
    ],
    mnemonic:
      '休 é uma pessoa (亻) encostada numa árvore (木) — a cena clássica de alguém parando embaixo da sombra para descansar do calor e do trabalho.',
    strokeCount: 6,
    order: 102,
    examples: [
      { word: '休む', reading: 'やすむ', meaning: 'descansar, faltar (à escola/trabalho)' },
      { word: '休み', reading: 'やすみ', meaning: 'descanso, folga, férias' },
      { word: '休憩', reading: 'きゅうけい', meaning: 'pausa, intervalo' },
    ],
  },
  {
    char: '買',
    meaning: 'comprar',
    onyomi: [{ kana: 'バイ', romaji: 'bai' }],
    kunyomi: [{ kana: 'かう', romaji: 'kau' }],
    radicals: [
      { char: '网', name: 'rede' },
      { char: '貝', name: 'concha, dinheiro antigo' },
    ],
    mnemonic:
      '買 tem uma rede (网, o topo) sobre 貝, que sozinho significa "concha" — conchas eram usadas como dinheiro na China antiga. Pense em alguém usando uma rede para juntar conchas (moedas) suficientes na hora de fazer uma compra.',
    strokeCount: 12,
    order: 103,
    examples: [
      { word: '買う', reading: 'かう', meaning: 'comprar' },
      { word: '買い物', reading: 'かいもの', meaning: 'compras' },
      { word: '買い手', reading: 'かいて', meaning: 'comprador' },
    ],
  },
  {
    char: '使',
    meaning: 'usar',
    onyomi: [{ kana: 'シ', romaji: 'shi' }],
    kunyomi: [{ kana: 'つかう', romaji: 'tsukau' }],
    radicals: [
      { char: '亻', name: 'pessoa' },
      { char: '吏', name: 'funcionário' },
    ],
    mnemonic:
      '使 é uma pessoa (亻) ao lado de 吏, que sozinho remete a um funcionário cumprindo ordens. Usar algo ou alguém é justamente colocar essa pessoa (ou ferramenta) a serviço de uma tarefa, como um funcionário empregado para um trabalho — daí também 大使, "embaixador", a pessoa enviada para representar o país.',
    strokeCount: 8,
    order: 104,
    examples: [
      { word: '使う', reading: 'つかう', meaning: 'usar' },
      { word: '使い方', reading: 'つかいかた', meaning: 'modo de usar' },
      { word: '大使', reading: 'たいし', meaning: 'embaixador' },
    ],
  },
  {
    char: '待',
    meaning: 'esperar',
    onyomi: [{ kana: 'タイ', romaji: 'tai' }],
    kunyomi: [{ kana: 'まつ', romaji: 'matsu' }],
    radicals: [
      { char: '彳', name: 'passos' },
      { char: '寺', name: 'templo' },
    ],
    mnemonic:
      '待 tem o radical de "passos" (彳, indica caminhar) ao lado de 寺 (templo). Imagine alguém caminhando até o templo e então parando ali, aguardando pacientemente em frente ao portão — esperar é esse ato de chegar e ficar parado no lugar combinado.',
    strokeCount: 9,
    order: 105,
    examples: [
      { word: '待つ', reading: 'まつ', meaning: 'esperar' },
      { word: '待ち合わせ', reading: 'まちあわせ', meaning: 'combinar de se encontrar (com alguém)' },
      { word: '待合室', reading: 'まちあいしつ', meaning: 'sala de espera' },
    ],
  },
  {
    char: '作',
    meaning: 'fazer, criar',
    onyomi: [{ kana: 'サク', romaji: 'saku' }],
    kunyomi: [{ kana: 'つくる', romaji: 'tsukuru' }],
    radicals: [
      { char: '亻', name: 'pessoa' },
      { char: '乍', name: 'corte rápido' },
    ],
    mnemonic:
      '作 é uma pessoa (亻) ao lado de 乍, que lembra um movimento rápido de corte, como talhar madeira com uma faca. É a imagem de um artesão dando as primeiras marteladas ou cortes rápidos para começar a fazer/criar alguma coisa do zero.',
    strokeCount: 7,
    order: 106,
    examples: [
      { word: '作る', reading: 'つくる', meaning: 'fazer, produzir, construir' },
      { word: '作文', reading: 'さくぶん', meaning: 'redação (texto escolar)' },
      { word: '作業', reading: 'さぎょう', meaning: 'trabalho, tarefa, operação' },
    ],
  },
  {
    char: '持',
    meaning: 'segurar, ter',
    onyomi: [{ kana: 'ジ', romaji: 'ji' }],
    kunyomi: [{ kana: 'もつ', romaji: 'motsu' }],
    radicals: [
      { char: '扌', name: 'mão' },
      { char: '寺', name: 'templo' },
    ],
    mnemonic:
      '持 junta o radical de mão (扌) com 寺 (templo). Pense em alguém segurando com as duas mãos um objeto sagrado enquanto caminha até o templo para uma oferenda — segurar com cuidado algo que se carrega até chegar ao destino.',
    strokeCount: 9,
    order: 107,
    examples: [
      { word: '持つ', reading: 'もつ', meaning: 'segurar, ter, carregar' },
      { word: '気持ち', reading: 'きもち', meaning: 'sentimento, sensação' },
      { word: '持ち物', reading: 'もちもの', meaning: 'pertences' },
    ],
  },
  {
    char: '歩',
    meaning: 'andar',
    onyomi: [{ kana: 'ホ', romaji: 'ho' }],
    kunyomi: [{ kana: 'あるく', romaji: 'aruku' }],
    radicals: [
      { char: '止', name: 'pé' },
      { char: '少', name: 'pouco' },
    ],
    mnemonic:
      '歩 parece o kanji de pé (止, em cima) com um pequeno traço extra embaixo, como se fosse 少 (pouco). Andar é dar passos pequenos, um pé de cada vez, avançando pouco a pouco — em vez de correr, você avança aos poucos.',
    strokeCount: 8,
    order: 108,
    examples: [
      { word: '歩く', reading: 'あるく', meaning: 'andar, caminhar' },
      { word: '散歩', reading: 'さんぽ', meaning: 'passeio (a pé)' },
      { word: '歩道', reading: 'ほどう', meaning: 'calçada' },
    ],
  },
  {
    char: '走',
    meaning: 'correr',
    onyomi: [{ kana: 'ソウ', romaji: 'sou' }],
    kunyomi: [{ kana: 'はしる', romaji: 'hashiru' }],
    radicals: [
      { char: '土', name: 'corpo inclinado para frente' },
      { char: '止', name: 'pé' },
    ],
    mnemonic:
      '走 tem, em cima, uma figura inclinada para a frente, como alguém disparando na largada, e embaixo o radical de pé (止). É a imagem de um corredor tão inclinado para frente que quase cai, com as pernas disparando para não perder o equilíbrio — o oposto do passo calmo de 歩.',
    strokeCount: 7,
    order: 109,
    examples: [
      { word: '走る', reading: 'はしる', meaning: 'correr' },
      { word: '走者', reading: 'そうしゃ', meaning: 'corredor' },
      { word: '走り出す', reading: 'はしりだす', meaning: 'começar a correr' },
    ],
  },
  {
    char: '帰',
    meaning: 'voltar (para casa)',
    onyomi: [{ kana: 'キ', romaji: 'ki' }],
    kunyomi: [
      { kana: 'かえる', romaji: 'kaeru' },
      { kana: 'かえす', romaji: 'kaesu' },
    ],
    radicals: [
      { char: '⼸', name: 'chegar, parar' },
      { char: '帚', name: 'vassoura' },
    ],
    mnemonic:
      '帰 tem à direita o kanji de vassoura (帚) e à esquerda um radical que remete a chegar e parar. A imagem é a de alguém finalmente chegando em casa e pegando a vassoura para variar — voltar para casa é voltar para as próprias tarefas domésticas, para o lugar que é seu para cuidar.',
    strokeCount: 10,
    order: 110,
    examples: [
      { word: '帰る', reading: 'かえる', meaning: 'voltar (para casa)' },
      { word: '帰り', reading: 'かえり', meaning: 'a volta, o caminho de volta' },
      { word: '帰国', reading: 'きこく', meaning: 'retornar ao próprio país' },
    ],
  },
];

export function getKanjiByChar(char: string): KanjiEntry | undefined {
  return KANJI_N5.find((k) => k.char === char);
}

/** Próximos kanji ainda não iniciados (sem linha em kanjiProgress), na ordem pedagógica. */
export function getNextNewKanji(startedChars: Set<string>, limit: number): KanjiEntry[] {
  return [...KANJI_N5]
    .sort((a, b) => a.order - b.order)
    .filter((k) => !startedChars.has(k.char))
    .slice(0, limit);
}
