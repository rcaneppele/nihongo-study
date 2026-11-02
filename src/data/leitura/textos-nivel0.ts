import type { ReadingText } from './types';

/**
 * Nível 0 — "Primeiros passos": para quem acabou de aprender o kana. Quatro
 * ou cinco frases curtíssimas, só kana, vocabulário do dia a dia e quase
 * só です/ます no presente. Conteúdo original (ver textos.ts).
 */
export const TEXTOS_NIVEL_0: ReadingText[] = [
  {
    id: 'n0-neko',
    title: 'ねこ',
    level: 0,
    wordCount: 8,
    summaryPt: 'A gata Tama: o nome, a cor e o tamanho.',
    lines: [
      {
        words: [
          { text: 'これは', meaning: 'isto (+ partícula de tópico)' },
          { text: 'ねこです。', meaning: 'é um gato', lemma: 'ねこ' },
        ],
        translation: 'Isto é um gato.',
      },
      {
        words: [
          { text: 'なまえは', meaning: 'o nome (+ partícula de tópico)' },
          { text: 'タマです。', meaning: 'é Tama', lemma: 'タマ' },
        ],
        translation: 'O nome é Tama.',
      },
      {
        words: [
          { text: 'タマは', meaning: 'Tama (+ partícula de tópico)' },
          { text: 'しろいです。', meaning: 'é branca', lemma: 'しろい' },
        ],
        translation: 'A Tama é branca.',
      },
      {
        words: [{ text: 'ちいさいです。', meaning: 'é pequena', lemma: 'ちいさい' }],
        translation: 'É pequena.',
      },
      {
        words: [
          { text: 'とても', meaning: 'muito' },
          { text: 'かわいいです。', meaning: 'é fofa', lemma: 'かわいい' },
        ],
        translation: 'É muito fofa.',
      },
    ],
  },
  {
    id: 'n0-asagohan',
    title: 'あさごはん',
    level: 0,
    wordCount: 7,
    summaryPt: 'O café da manhã: pão, leite e uma fruta.',
    lines: [
      {
        words: [{ text: 'あさです。', meaning: 'é de manhã', lemma: 'あさ' }],
        translation: 'É de manhã.',
      },
      {
        words: [
          { text: 'パンを', meaning: 'pão (+ partícula de objeto)' },
          { text: 'たべます。', meaning: 'como', lemma: 'たべる' },
        ],
        translation: 'Como pão.',
      },
      {
        words: [
          { text: 'ミルクを', meaning: 'leite (+ partícula de objeto)' },
          { text: 'のみます。', meaning: 'bebo', lemma: 'のむ' },
        ],
        translation: 'Bebo leite.',
      },
      {
        words: [
          { text: 'バナナも', meaning: 'banana também', lemma: 'バナナ' },
          { text: 'たべます。', meaning: 'como', lemma: 'たべる' },
        ],
        translation: 'Como banana também.',
      },
      {
        words: [{ text: 'おいしいです。', meaning: 'está gostoso', lemma: 'おいしい' }],
        translation: 'Está gostoso.',
      },
    ],
  },
  {
    id: 'n0-heya',
    title: 'わたしの へや',
    level: 0,
    wordCount: 11,
    summaryPt: 'Um quarto pequeno: a mesa, os livros e a janela.',
    lines: [
      {
        words: [
          { text: 'これは', meaning: 'isto (+ partícula de tópico)' },
          { text: 'わたしの', meaning: 'meu, minha', lemma: 'わたし' },
          { text: 'へやです。', meaning: 'é o quarto', lemma: 'へや' },
        ],
        translation: 'Este é o meu quarto.',
      },
      {
        words: [
          { text: 'つくえが', meaning: 'mesa, escrivaninha (+ partícula de sujeito)' },
          { text: 'あります。', meaning: 'há, tem', lemma: 'ある' },
        ],
        translation: 'Tem uma escrivaninha.',
      },
      {
        words: [
          { text: 'ほんが', meaning: 'livro (+ partícula de sujeito)' },
          { text: 'たくさん', meaning: 'muitos' },
          { text: 'あります。', meaning: 'há, tem', lemma: 'ある' },
        ],
        translation: 'Tem muitos livros.',
      },
      {
        words: [
          { text: 'まどは', meaning: 'a janela (+ partícula de tópico)' },
          { text: 'おおきいです。', meaning: 'é grande', lemma: 'おおきい' },
        ],
        translation: 'A janela é grande.',
      },
      {
        words: [
          { text: 'へやは', meaning: 'o quarto (+ partícula de tópico)' },
          { text: 'ちいさいですが、', meaning: 'é pequeno, mas', lemma: 'ちいさい' },
          { text: 'すきです。', meaning: 'gosto', lemma: 'すき' },
        ],
        translation: 'O quarto é pequeno, mas eu gosto dele.',
      },
    ],
  },
  {
    id: 'n0-kouen',
    title: 'こうえん',
    level: 0,
    wordCount: 9,
    summaryPt: 'Domingo no parque: um cachorro e crianças brincando.',
    lines: [
      {
        words: [
          { text: 'きょうは', meaning: 'hoje (+ partícula de tópico)' },
          { text: 'にちようびです。', meaning: 'é domingo', lemma: 'にちようび' },
        ],
        translation: 'Hoje é domingo.',
      },
      {
        words: [
          { text: 'こうえんに', meaning: 'ao parque', lemma: 'こうえん' },
          { text: 'いきます。', meaning: 'vou', lemma: 'いく' },
        ],
        translation: 'Vou ao parque.',
      },
      {
        words: [
          { text: 'いぬが', meaning: 'cachorro (+ partícula de sujeito)' },
          { text: 'います。', meaning: 'há, tem (seres vivos)', lemma: 'いる' },
        ],
        translation: 'Tem um cachorro.',
      },
      {
        words: [
          { text: 'こどもが', meaning: 'criança (+ partícula de sujeito)' },
          { text: 'あそびます。', meaning: 'brinca', lemma: 'あそぶ' },
        ],
        translation: 'As crianças brincam.',
      },
      {
        words: [
          { text: 'たのしいです。', meaning: 'é divertido', lemma: 'たのしい' },
        ],
        translation: 'É divertido.',
      },
    ],
  },
  {
    id: 'n0-hare',
    title: 'いい てんき',
    level: 0,
    wordCount: 7,
    summaryPt: 'Um dia de sol, céu azul e um passeio.',
    lines: [
      {
        words: [
          { text: 'きょうは', meaning: 'hoje (+ partícula de tópico)' },
          { text: 'はれです。', meaning: 'está ensolarado', lemma: 'はれ' },
        ],
        translation: 'Hoje está ensolarado.',
      },
      {
        words: [
          { text: 'そらは', meaning: 'o céu (+ partícula de tópico)' },
          { text: 'あおいです。', meaning: 'é azul', lemma: 'あおい' },
        ],
        translation: 'O céu está azul.',
      },
      {
        words: [{ text: 'あたたかいです。', meaning: 'está agradável, morno', lemma: 'あたたかい' }],
        translation: 'Está um calor agradável.',
      },
      {
        words: [
          { text: 'さんぽを', meaning: 'passeio a pé (+ partícula de objeto)' },
          { text: 'します。', meaning: 'faço', lemma: 'する' },
        ],
        translation: 'Vou dar uma caminhada.',
      },
    ],
  },
  {
    id: 'n0-supaa',
    title: 'スーパー',
    level: 0,
    wordCount: 6,
    summaryPt: 'Comprar maçãs no supermercado — e o preço.',
    lines: [
      {
        words: [
          { text: 'スーパーに', meaning: 'ao supermercado', lemma: 'スーパー' },
          { text: 'いきます。', meaning: 'vou', lemma: 'いく' },
        ],
        translation: 'Vou ao supermercado.',
      },
      {
        words: [
          { text: 'りんごを', meaning: 'maçã (+ partícula de objeto)' },
          { text: 'かいます。', meaning: 'compro', lemma: 'かう' },
        ],
        translation: 'Compro maçãs.',
      },
      {
        words: [
          { text: 'りんごは', meaning: 'a maçã (+ partícula de tópico)' },
          { text: 'ひゃくえんです。', meaning: 'custa cem ienes', lemma: 'ひゃくえん' },
        ],
        translation: 'A maçã custa cem ienes.',
      },
      {
        words: [{ text: 'やすいです。', meaning: 'é barato', lemma: 'やすい' }],
        translation: 'É barato.',
      },
    ],
  },
  {
    id: 'n0-tomodachi',
    title: 'ともだち',
    level: 0,
    wordCount: 6,
    summaryPt: 'A amiga Yuki, estudante, que gosta de tênis.',
    lines: [
      {
        words: [
          { text: 'ともだちの', meaning: 'amiga, de amigo', lemma: 'ともだち' },
          { text: 'ゆきさんです。', meaning: 'é a Yuki', lemma: 'ゆきさん' },
        ],
        translation: 'Esta é a minha amiga Yuki.',
      },
      {
        words: [
          { text: 'ゆきさんは', meaning: 'a Yuki', lemma: 'ゆきさん' },
          { text: 'がくせいです。', meaning: 'é estudante', lemma: 'がくせい' },
        ],
        translation: 'A Yuki é estudante.',
      },
      {
        words: [
          { text: 'テニスが', meaning: 'tênis (+ partícula de sujeito)' },
          { text: 'すきです。', meaning: 'gosta', lemma: 'すき' },
        ],
        translation: 'Gosta de tênis.',
      },
      {
        words: [
          { text: 'わたしも', meaning: 'eu também', lemma: 'わたし' },
          { text: 'テニスが', meaning: 'tênis (+ partícula de sujeito)' },
          { text: 'すきです。', meaning: 'gosto', lemma: 'すき' },
        ],
        translation: 'Eu também gosto de tênis.',
      },
    ],
  },
  {
    id: 'n0-yoru',
    title: 'よる',
    level: 0,
    wordCount: 8,
    summaryPt: 'A noite: banho, um livro e cama às dez.',
    lines: [
      {
        words: [{ text: 'よるです。', meaning: 'é noite', lemma: 'よる' }],
        translation: 'É noite.',
      },
      {
        words: [
          { text: 'おふろに', meaning: 'no ofurô (banho de banheira)', lemma: 'おふろ' },
          { text: 'はいります。', meaning: 'entro', lemma: 'はいる' },
        ],
        translation: 'Tomo banho de ofurô.',
      },
      {
        words: [
          { text: 'ほんを', meaning: 'livro (+ partícula de objeto)' },
          { text: 'よみます。', meaning: 'leio', lemma: 'よむ' },
        ],
        translation: 'Leio um livro.',
      },
      {
        words: [
          { text: 'じゅうじに', meaning: 'às dez horas', lemma: 'じゅうじ' },
          { text: 'ねます。', meaning: 'durmo', lemma: 'ねる' },
        ],
        translation: 'Durmo às dez.',
      },
      {
        words: [{ text: 'おやすみなさい。', meaning: 'boa noite (antes de dormir)' }],
        translation: 'Boa noite.',
      },
    ],
  },
  {
    id: 'n0-densha',
    title: 'でんしゃ',
    level: 0,
    wordCount: 8,
    summaryPt: 'Uma viagem curta de trem, olhando as montanhas.',
    lines: [
      {
        words: [
          { text: 'えきに', meaning: 'à estação', lemma: 'えき' },
          { text: 'いきます。', meaning: 'vou', lemma: 'いく' },
        ],
        translation: 'Vou à estação.',
      },
      {
        words: [
          { text: 'でんしゃに', meaning: 'no trem', lemma: 'でんしゃ' },
          { text: 'のります。', meaning: 'embarco, pego', lemma: 'のる' },
        ],
        translation: 'Pego o trem.',
      },
      {
        words: [
          { text: 'でんしゃは', meaning: 'o trem (+ partícula de tópico)' },
          { text: 'はやいです。', meaning: 'é rápido', lemma: 'はやい' },
        ],
        translation: 'O trem é rápido.',
      },
      {
        words: [
          { text: 'まどから', meaning: 'pela janela', lemma: 'まど' },
          { text: 'やまを', meaning: 'montanha (+ partícula de objeto)' },
          { text: 'みます。', meaning: 'olho, vejo', lemma: 'みる' },
        ],
        translation: 'Olho as montanhas pela janela.',
      },
    ],
  },
  {
    id: 'n0-kazoku',
    title: 'わたしの かぞく',
    level: 0,
    wordCount: 9,
    summaryPt: 'Uma família de quatro: o pai, a mãe e o irmão.',
    lines: [
      {
        words: [
          { text: 'かぞくは', meaning: 'a família (+ partícula de tópico)' },
          { text: 'よにんです。', meaning: 'são quatro pessoas', lemma: 'よにん' },
        ],
        translation: 'Minha família tem quatro pessoas.',
      },
      {
        words: [
          { text: 'ちちと', meaning: 'meu pai e', lemma: 'ちち' },
          { text: 'ははと', meaning: 'minha mãe e', lemma: 'はは' },
          { text: 'あにと', meaning: 'meu irmão mais velho e', lemma: 'あに' },
          { text: 'わたしです。', meaning: 'eu', lemma: 'わたし' },
        ],
        translation: 'Meu pai, minha mãe, meu irmão mais velho e eu.',
      },
      {
        words: [
          { text: 'ちちは', meaning: 'meu pai (+ partícula de tópico)' },
          { text: 'やさしいです。', meaning: 'é gentil', lemma: 'やさしい' },
        ],
        translation: 'Meu pai é gentil.',
      },
      {
        words: [
          { text: 'あには', meaning: 'meu irmão mais velho (+ partícula de tópico)' },
          { text: 'せが', meaning: 'estatura (+ partícula de sujeito)' },
          { text: 'たかいです。', meaning: 'é alto', lemma: 'たかい' },
        ],
        translation: 'Meu irmão é alto.',
      },
    ],
  },
];
