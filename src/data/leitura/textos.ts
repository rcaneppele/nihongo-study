import type { NivelLeitura, ReadingText } from './types';
import { TEXTOS_NIVEL_0 } from './textos-nivel0';
import { TEXTOS_NIVEL_3 } from './textos-nivel3';

/**
 * Textos de leitura extensiva — conteúdo original, nunca copiado/traduzido
 * de terceiros (Tadoku, Satori Reader ou qualquer outra fonte), mesmo
 * princípio de originalidade das lições (ver docs/padrao-licoes.md).
 *
 * Nível 0 (textos-nivel0.ts): primeiros passos — 4 ou 5 frases curtíssimas,
 * só kana, para quem acabou de aprender o alfabeto.
 * Nível 1: bem iniciante, só hiragana/katakana (sem kanji) — mesma regra de
 * "sem kanji em frase corrida" que as lições seguem, aqui estendida ao
 * próprio texto (não só aos exemplos).
 * Nível 2: kanji comuns já com furigana (`reading`) em cada palavra que o
 * contém — o objetivo aqui é treinar a leitura de kanji em contexto, não
 * evitá-lo.
 * Nível 3 (textos-nivel3.ts): textos mais longos, mais kanji (com furigana)
 * e gramática do N4 (〜ながら, 〜たり, 〜てくれる…).
 */
export const NIVEIS_LEITURA: { level: NivelLeitura; label: string; desc: string }[] = [
  { level: 0, label: 'Primeiros passos', desc: 'Textos curtíssimos, só kana — para quem acabou de aprender o alfabeto' },
  { level: 1, label: 'Nível 1', desc: 'Bem iniciante — só hiragana/katakana' },
  { level: 2, label: 'Nível 2', desc: 'Kanji comuns, com furigana' },
  { level: 3, label: 'Nível 3', desc: 'Textos mais longos, mais kanji (com furigana) e gramática do N4' },
];

export function rotuloNivel(level: NivelLeitura): string {
  return NIVEIS_LEITURA.find((n) => n.level === level)?.label ?? `Nível ${level}`;
}

export const LEITURA_TEXTOS: ReadingText[] = [
  ...TEXTOS_NIVEL_0,
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
          { text: 'たなかです。', meaning: 'sou a Tanaka', lemma: 'たなか' },
        ],
        translation: 'Eu sou a Tanaka.',
      },
      {
        words: [
          { text: 'にほんじんです。', meaning: 'sou japonesa', lemma: 'にほんじん' },
        ],
        translation: 'Sou japonesa.',
      },
      {
        words: [
          { text: 'がくせいです。', meaning: 'sou estudante', lemma: 'がくせい' },
        ],
        translation: 'Sou estudante.',
      },
      {
        words: [
          { text: 'にじゅっさいです。', meaning: 'tenho vinte anos', lemma: 'にじゅっさい' },
        ],
        translation: 'Tenho vinte anos.',
      },
      {
        words: [
          { text: 'まいにち', meaning: 'todo dia' },
          { text: 'にほんごを', meaning: 'japonês (+ partícula de objeto)' },
          { text: 'べんきょうします。', meaning: 'estudo', lemma: 'べんきょうする' },
        ],
        translation: 'Estudo japonês todos os dias.',
      },
      {
        words: [
          { text: 'にほんごは', meaning: 'o japonês (+ partícula de tópico)' },
          { text: 'たのしいです。', meaning: 'é divertido', lemma: 'たのしい' },
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
          { text: 'みることです。', meaning: 'é assistir', lemma: 'みる' },
        ],
        translation: 'Meu hobby é assistir filmes.',
      },
      {
        words: [
          { text: 'とうきょうから', meaning: 'de Tóquio', lemma: 'とうきょう' },
          { text: 'きました。', meaning: 'vim', lemma: 'くる' },
        ],
        translation: 'Vim de Tóquio.',
      },
      {
        words: [
          { text: 'しんせつな', meaning: 'gentis', lemma: 'しんせつ' },
          { text: 'ともだちが', meaning: 'amigos (+ partícula de sujeito)' },
          { text: 'たくさん', meaning: 'muitos' },
          { text: 'います。', meaning: 'tenho, há', lemma: 'いる' },
        ],
        translation: 'Tenho muitos amigos gentis.',
      },
      {
        words: [
          { text: 'これから', meaning: 'de agora em diante' },
          { text: 'もっと', meaning: 'mais' },
          { text: 'にほんごを', meaning: 'japonês (+ partícula de objeto)' },
          { text: 'がんばります。', meaning: 'vou me esforçar', lemma: 'がんばる' },
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
          { text: 'ろくじに', meaning: 'às seis horas', lemma: 'ろくじ' },
          { text: 'おきます。', meaning: 'acordo', lemma: 'おきる' },
        ],
        translation: 'Acordo às seis da manhã, todos os dias.',
      },
      {
        words: [
          { text: 'かおを', meaning: 'o rosto (+ partícula de objeto)' },
          { text: 'あらって、', meaning: 'lavo, e', lemma: 'あらう' },
          { text: 'あさごはんを', meaning: 'o café da manhã (+ partícula de objeto)' },
          { text: 'たべます。', meaning: 'como', lemma: 'たべる' },
        ],
        translation: 'Lavo o rosto e como o café da manhã.',
      },
      {
        words: [
          { text: 'しちじはんに', meaning: 'às sete e meia', lemma: 'しちじはん' },
          { text: 'いえを', meaning: 'de casa (+ partícula de origem/saída)' },
          { text: 'でます。', meaning: 'saio', lemma: 'でる' },
        ],
        translation: 'Saio de casa às sete e meia.',
      },
      {
        words: [
          { text: 'でんしゃで', meaning: 'de trem', lemma: 'でんしゃ' },
          { text: 'がっこうへ', meaning: 'para a escola', lemma: 'がっこう' },
          { text: 'いきます。', meaning: 'vou', lemma: 'いく' },
        ],
        translation: 'Vou para a escola de trem.',
      },
      {
        words: [
          { text: 'がっこうで', meaning: 'na escola', lemma: 'がっこう' },
          { text: 'にほんごと', meaning: 'japonês e', lemma: 'にほんご' },
          { text: 'えいごを', meaning: 'inglês (+ partícula de objeto)' },
          { text: 'べんきょうします。', meaning: 'estudo', lemma: 'べんきょうする' },
        ],
        translation: 'Na escola, estudo japonês e inglês.',
      },
      {
        words: [
          { text: 'ひるごはんは', meaning: 'o almoço', lemma: 'ひるごはん' },
          { text: 'ともだちと', meaning: 'com amigos', lemma: 'ともだち' },
          { text: 'たべます。', meaning: 'como', lemma: 'たべる' },
        ],
        translation: 'Almoço com os amigos.',
      },
      {
        words: [
          { text: 'ごごは', meaning: 'à tarde', lemma: 'ごご' },
          { text: 'としょかんで', meaning: 'na biblioteca', lemma: 'としょかん' },
          { text: 'ほんを', meaning: 'livro (+ partícula de objeto)' },
          { text: 'よみます。', meaning: 'leio', lemma: 'よむ' },
        ],
        translation: 'De tarde, leio livros na biblioteca.',
      },
      {
        words: [
          { text: 'よる', meaning: 'à noite' },
          { text: 'じゅうじに', meaning: 'às dez horas', lemma: 'じゅうじ' },
          { text: 'ねます。', meaning: 'durmo', lemma: 'ねる' },
        ],
        translation: 'À noite, durmo às dez horas.',
      },
      {
        words: [
          { text: 'しゅうまつは', meaning: 'o fim de semana', lemma: 'しゅうまつ' },
          { text: 'すこし', meaning: 'um pouco' },
          { text: 'ちがいます。', meaning: 'é diferente', lemma: 'ちがう' },
        ],
        translation: 'O fim de semana é um pouco diferente.',
      },
      {
        words: [
          { text: 'あさ', meaning: 'de manhã' },
          { text: 'はやく', meaning: 'cedo', lemma: 'はやい' },
          { text: 'おきて、', meaning: 'acordo, e', lemma: 'おきる' },
          { text: 'うんどうを', meaning: 'exercício (+ partícula de objeto)' },
          { text: 'します。', meaning: 'faço', lemma: 'する' },
        ],
        translation: 'De manhã, acordo cedo e faço exercício.',
      },
      {
        words: [
          { text: 'よるは', meaning: 'à noite', lemma: 'よる' },
          { text: 'ゆっくり', meaning: 'com calma' },
          { text: 'おふろに', meaning: 'na banheira', lemma: 'おふろ' },
          { text: 'はいります。', meaning: 'entro', lemma: 'はいる' },
        ],
        translation: 'À noite, tomo um banho relaxante.',
      },
      {
        words: [
          { text: 'まいにちが', meaning: 'todo dia (+ partícula de sujeito)' },
          { text: 'いそがしいですが、', meaning: 'é corrido, mas', lemma: 'いそがしい' },
          { text: 'たのしいです。', meaning: 'é divertido', lemma: 'たのしい' },
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
          { text: 'スーパーへ', meaning: 'para o supermercado', lemma: 'スーパー' },
          { text: 'いきました。', meaning: 'fui', lemma: 'いく' },
        ],
        translation: 'Hoje fui ao supermercado.',
      },
      {
        words: [
          { text: 'やさいと', meaning: 'verduras e', lemma: 'やさい' },
          { text: 'くだものを', meaning: 'frutas (+ partícula de objeto)' },
          { text: 'かいました。', meaning: 'comprei', lemma: 'かう' },
        ],
        translation: 'Comprei verduras e frutas.',
      },
      {
        words: [
          { text: 'りんごは', meaning: 'a maçã', lemma: 'りんご' },
          { text: 'ひとつ', meaning: 'uma unidade' },
          { text: 'ひゃくえんでした。', meaning: 'custava cem ienes', lemma: 'ひゃくえん' },
        ],
        translation: 'A maçã custava cem ienes a unidade.',
      },
      {
        words: [
          { text: 'ぎゅうにゅうも', meaning: 'leite também', lemma: 'ぎゅうにゅう' },
          { text: 'かいました。', meaning: 'comprei', lemma: 'かう' },
        ],
        translation: 'Comprei leite também.',
      },
      {
        words: [
          { text: 'ぜんぶで', meaning: 'no total', lemma: 'ぜんぶ' },
          { text: 'さんぜんえんでした。', meaning: 'foi três mil ienes', lemma: 'さんぜんえん' },
        ],
        translation: 'No total, foram três mil ienes.',
      },
      {
        words: [
          { text: 'スーパーの', meaning: 'do supermercado', lemma: 'スーパー' },
          { text: 'ひとは', meaning: 'a pessoa/funcionário', lemma: 'ひと' },
          { text: 'とても', meaning: 'muito' },
          { text: 'しんせつでした。', meaning: 'foi gentil', lemma: 'しんせつ' },
        ],
        translation: 'O funcionário do supermercado foi muito gentil.',
      },
      {
        words: [
          { text: 'うちに', meaning: 'para casa', lemma: 'うち' },
          { text: 'かえって、', meaning: 'volto, e', lemma: 'かえる' },
          { text: 'りょうりを', meaning: 'comida/culinária (+ partícula de objeto)' },
          { text: 'しました。', meaning: 'fiz', lemma: 'する' },
        ],
        translation: 'Voltei para casa e cozinhei.',
      },
      {
        words: [
          { text: 'とても', meaning: 'muito' },
          { text: 'おいしかったです。', meaning: 'estava gostoso', lemma: 'おいしい' },
        ],
        translation: 'Estava muito gostoso.',
      },
      {
        words: [
          { text: 'また', meaning: 'de novo' },
          { text: 'らいしゅう', meaning: 'semana que vem' },
          { text: 'いきたいです。', meaning: 'quero ir', lemma: 'いく' },
        ],
        translation: 'Quero ir de novo semana que vem.',
      },
      {
        words: [
          { text: 'スーパーは', meaning: 'o supermercado', lemma: 'スーパー' },
          { text: 'いえから', meaning: 'de casa', lemma: 'いえ' },
          { text: 'ちかいです。', meaning: 'é perto', lemma: 'ちかい' },
        ],
        translation: 'O supermercado é perto de casa.',
      },
      {
        words: [
          { text: 'やすい', meaning: 'barato, em promoção' },
          { text: 'ひは、', meaning: 'no dia,', lemma: 'ひ' },
          { text: 'いつも', meaning: 'sempre' },
          { text: 'こんでいます。', meaning: 'está cheio', lemma: 'こむ' },
        ],
        translation: 'Nos dias de promoção, está sempre cheio.',
      },
      {
        words: [
          { text: 'かいものは', meaning: 'fazer compras', lemma: 'かいもの' },
          { text: 'たのしい', meaning: 'divertido' },
          { text: 'じかんです。', meaning: 'é um momento', lemma: 'じかん' },
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
          { text: 'わたしの', meaning: 'minha', lemma: 'わたし' },
          { text: 'かぞくは', meaning: 'a família (+ partícula de tópico)' },
          { text: 'よにんです。', meaning: 'são quatro pessoas', lemma: 'よにん' },
        ],
        translation: 'Minha família tem quatro pessoas.',
      },
      {
        words: [
          { text: 'ちちと', meaning: 'pai e', lemma: 'ちち' },
          { text: 'ははと', meaning: 'mãe e', lemma: 'はは' },
          { text: 'あにが', meaning: 'irmão mais velho (+ partícula de sujeito)' },
          { text: 'います。', meaning: 'há, existe (seres vivos)', lemma: 'いる' },
        ],
        translation: 'Há meu pai, minha mãe e meu irmão mais velho.',
      },
      {
        words: [
          { text: 'ちちは', meaning: 'meu pai', lemma: 'ちち' },
          { text: 'かいしゃいんです。', meaning: 'é funcionário de empresa', lemma: 'かいしゃいん' },
        ],
        translation: 'Meu pai é funcionário de empresa.',
      },
      {
        words: [
          { text: 'ははは', meaning: 'minha mãe', lemma: 'はは' },
          { text: 'りょうりが', meaning: 'culinária (+ partícula de sujeito)' },
          { text: 'じょうずです。', meaning: 'é boa em, é hábil', lemma: 'じょうず' },
        ],
        translation: 'Minha mãe cozinha bem.',
      },
      {
        words: [
          { text: 'あには', meaning: 'meu irmão mais velho', lemma: 'あに' },
          { text: 'だいがくせいです。', meaning: 'é universitário', lemma: 'だいがくせい' },
        ],
        translation: 'Meu irmão mais velho é universitário.',
      },
      {
        words: [
          { text: 'みんな', meaning: 'todos' },
          { text: 'なかが', meaning: 'relação (+ partícula de sujeito)' },
          { text: 'いいです。', meaning: 'é boa', lemma: 'いい' },
        ],
        translation: 'Todos nós nos damos bem.',
      },
      {
        words: [
          { text: 'にちようびは', meaning: 'aos domingos', lemma: 'にちようび' },
          { text: 'いつも', meaning: 'sempre' },
          { text: 'かぞくで', meaning: 'em família', lemma: 'かぞく' },
          { text: 'しょくじを', meaning: 'refeição (+ partícula de objeto)' },
          { text: 'します。', meaning: 'fazemos', lemma: 'する' },
        ],
        translation: 'Aos domingos, sempre fazemos uma refeição em família.',
      },
      {
        words: [
          { text: 'わたしは', meaning: 'eu', lemma: 'わたし' },
          { text: 'かぞくが', meaning: 'a família (+ partícula de sujeito/objeto emocional)' },
          { text: 'だいすきです。', meaning: 'amo, gosto muito', lemma: 'だいすき' },
        ],
        translation: 'Eu amo minha família.',
      },
      {
        words: [
          { text: 'そふと', meaning: 'avô e', lemma: 'そふ' },
          { text: 'そぼも', meaning: 'avó também', lemma: 'そぼ' },
          { text: 'ちかくに', meaning: 'perto', lemma: 'ちかく' },
          { text: 'すんでいます。', meaning: 'moram', lemma: 'すむ' },
        ],
        translation: 'Meu avô e minha avó também moram perto.',
      },
      {
        words: [
          { text: 'ときどき', meaning: 'às vezes' },
          { text: 'みんなで', meaning: 'todos juntos', lemma: 'みんな' },
          { text: 'りょこうに', meaning: 'em viagem', lemma: 'りょこう' },
          { text: 'いきます。', meaning: 'vamos', lemma: 'いく' },
        ],
        translation: 'Às vezes, todos nós viajamos juntos.',
      },
      {
        words: [
          { text: 'かぞくは', meaning: 'a família', lemma: 'かぞく' },
          { text: 'わたしの', meaning: 'meu', lemma: 'わたし' },
          { text: 'たからものです。', meaning: 'é tesouro', lemma: 'たからもの' },
        ],
        translation: 'A família é o meu tesouro.',
      },
      {
        words: [
          { text: 'いつまでも', meaning: 'para sempre' },
          { text: 'かぞくを', meaning: 'a família (+ partícula de objeto)' },
          { text: 'たいせつに', meaning: 'com carinho', lemma: 'たいせつ' },
          { text: 'したいです。', meaning: 'quero tratar', lemma: 'する' },
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
          { text: 'きょうは', meaning: 'hoje', lemma: 'きょう' },
          { text: 'はるです。', meaning: 'é primavera', lemma: 'はる' },
        ],
        translation: 'Hoje é primavera.',
      },
      {
        words: [
          { text: 'てんきが', meaning: 'o tempo (+ partícula de sujeito)' },
          { text: 'とても', meaning: 'muito' },
          { text: 'いいです。', meaning: 'está bom', lemma: 'いい' },
        ],
        translation: 'O tempo está muito bom.',
      },
      {
        words: [
          { text: 'そらは', meaning: 'o céu', lemma: 'そら' },
          { text: 'あおくて、', meaning: 'está azul, e', lemma: 'あおい' },
          { text: 'かぜが', meaning: 'o vento (+ partícula de sujeito)' },
          { text: 'きもち', meaning: 'sensação' },
          { text: 'いいです。', meaning: 'é boa, é agradável', lemma: 'いい' },
        ],
        translation: 'O céu está azul, e o vento é agradável.',
      },
      {
        words: [
          { text: 'なつは', meaning: 'o verão', lemma: 'なつ' },
          { text: 'とても', meaning: 'muito' },
          { text: 'あついです。', meaning: 'é quente', lemma: 'あつい' },
        ],
        translation: 'O verão é muito quente.',
      },
      {
        words: [
          { text: 'あきは', meaning: 'o outono', lemma: 'あき' },
          { text: 'すずしくて、', meaning: 'é fresco, e', lemma: 'すずしい' },
          { text: 'きれいです。', meaning: 'é bonito', lemma: 'きれい' },
        ],
        translation: 'O outono é fresco e bonito.',
      },
      {
        words: [
          { text: 'ふゆは', meaning: 'o inverno', lemma: 'ふゆ' },
          { text: 'さむくて、', meaning: 'é frio, e', lemma: 'さむい' },
          { text: 'ゆきが', meaning: 'a neve (+ partícula de sujeito)' },
          { text: 'ふります。', meaning: 'cai (neve/chuva)', lemma: 'ふる' },
        ],
        translation: 'O inverno é frio, e neva.',
      },
      {
        words: [
          { text: 'わたしは', meaning: 'eu', lemma: 'わたし' },
          { text: 'はると', meaning: 'primavera e', lemma: 'はる' },
          { text: 'あきが', meaning: 'outono (+ partícula de sujeito)' },
          { text: 'すきです。', meaning: 'gosto', lemma: 'すき' },
        ],
        translation: 'Eu gosto de primavera e outono.',
      },
      {
        words: [
          { text: 'つゆの', meaning: 'da estação chuvosa', lemma: 'つゆ' },
          { text: 'じきは、', meaning: 'a época,', lemma: 'じき' },
          { text: 'あめが', meaning: 'chuva (+ partícula de sujeito)' },
          { text: 'おおいです。', meaning: 'é muita', lemma: 'おおい' },
        ],
        translation: 'Na época da estação chuvosa, chove muito.',
      },
      {
        words: [
          { text: 'たいふうの', meaning: 'de tufão', lemma: 'たいふう' },
          { text: 'ひは、', meaning: 'no dia,', lemma: 'ひ' },
          { text: 'そとへ', meaning: 'para fora', lemma: 'そと' },
          { text: 'でません。', meaning: 'não saio', lemma: 'でる' },
        ],
        translation: 'Em dias de tufão, não saio de casa.',
      },
      {
        words: [
          { text: 'てんきが', meaning: 'o tempo (+ partícula de sujeito)' },
          { text: 'いいと、', meaning: 'quando está bom,', lemma: 'いい' },
          { text: 'きもちも', meaning: 'o humor também', lemma: 'きもち' },
          { text: 'いいです。', meaning: 'fica bom', lemma: 'いい' },
        ],
        translation: 'Quando o tempo está bom, meu humor também melhora.',
      },
      {
        words: [
          { text: 'にほんの', meaning: 'do Japão', lemma: 'にほん' },
          { text: 'てんきは、', meaning: 'o tempo,', lemma: 'てんき' },
          { text: 'へんかが', meaning: 'mudanças (+ partícula de sujeito)' },
          { text: 'おおくて', meaning: 'são muitas, e', lemma: 'おおい' },
          { text: 'おもしろいです。', meaning: 'é interessante', lemma: 'おもしろい' },
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
          { text: 'わたしの', meaning: 'meu', lemma: 'わたし' },
          { text: 'しゅみは', meaning: 'o hobby (+ partícula de tópico)' },
          { text: 'どくしょです。', meaning: 'é leitura', lemma: 'どくしょ' },
        ],
        translation: 'Meu hobby é a leitura.',
      },
      {
        words: [
          { text: 'まいばん', meaning: 'toda noite' },
          { text: 'ねる', meaning: 'dormir' },
          { text: 'まえに', meaning: 'antes de', lemma: 'まえ' },
          { text: 'ほんを', meaning: 'livro (+ partícula de objeto)' },
          { text: 'よみます。', meaning: 'leio', lemma: 'よむ' },
        ],
        translation: 'Toda noite, leio um livro antes de dormir.',
      },
      {
        words: [
          { text: 'すきな', meaning: 'favorito, de que gosto', lemma: 'すき' },
          { text: 'ほんは', meaning: 'o livro', lemma: 'ほん' },
          { text: 'おもしろい', meaning: 'interessante' },
          { text: 'ものがたりです。', meaning: 'é uma história', lemma: 'ものがたり' },
        ],
        translation: 'O livro de que gosto é uma história interessante.',
      },
      {
        words: [
          { text: 'としょかんへ', meaning: 'para a biblioteca', lemma: 'としょかん' },
          { text: 'よく', meaning: 'frequentemente' },
          { text: 'いきます。', meaning: 'vou', lemma: 'いく' },
        ],
        translation: 'Vou com frequência à biblioteca.',
      },
      {
        words: [
          { text: 'としょかんは', meaning: 'a biblioteca', lemma: 'としょかん' },
          { text: 'しずかで、', meaning: 'é silenciosa, e', lemma: 'しずか' },
          { text: 'すきな', meaning: 'que eu gosto', lemma: 'すき' },
          { text: 'ばしょです。', meaning: 'é um lugar', lemma: 'ばしょ' },
        ],
        translation: 'A biblioteca é silenciosa, um lugar de que gosto.',
      },
      {
        words: [
          { text: 'いっしゅうかんに', meaning: 'em uma semana', lemma: 'いっしゅうかん' },
          { text: 'にさつ', meaning: 'dois volumes (livros)' },
          { text: 'よみます。', meaning: 'leio', lemma: 'よむ' },
        ],
        translation: 'Leio dois livros por semana.',
      },
      {
        words: [
          { text: 'どくしょは', meaning: 'a leitura', lemma: 'どくしょ' },
          { text: 'たのしくて、', meaning: 'é divertida, e', lemma: 'たのしい' },
          { text: 'べんきょうにも', meaning: 'também em estudo', lemma: 'べんきょう' },
          { text: 'なります。', meaning: 'se torna', lemma: 'なる' },
        ],
        translation: 'A leitura é divertida, e também vira estudo.',
      },
      {
        words: [
          { text: 'ミステリーの', meaning: 'de mistério', lemma: 'ミステリー' },
          { text: 'ほんが', meaning: 'livro (+ partícula de sujeito)' },
          { text: 'とくに', meaning: 'especialmente' },
          { text: 'すきです。', meaning: 'gosto', lemma: 'すき' },
        ],
        translation: 'Gosto especialmente de livros de mistério.',
      },
      {
        words: [
          { text: 'ともだちに', meaning: 'para amigos', lemma: 'ともだち' },
          { text: 'すきな', meaning: 'favoritos', lemma: 'すき' },
          { text: 'ほんを', meaning: 'livros (+ partícula de objeto)' },
          { text: 'すすめます。', meaning: 'recomendo', lemma: 'すすめる' },
        ],
        translation: 'Recomendo meus livros favoritos para os amigos.',
      },
      {
        words: [
          { text: 'としょかんの', meaning: 'da biblioteca', lemma: 'としょかん' },
          { text: 'カードを', meaning: 'cartão (+ partícula de objeto)' },
          { text: 'もっています。', meaning: 'tenho', lemma: 'もつ' },
        ],
        translation: 'Tenho um cartão da biblioteca.',
      },
      {
        words: [
          { text: 'これからも', meaning: 'de agora em diante também' },
          { text: 'たくさん', meaning: 'muitos' },
          { text: 'ほんを', meaning: 'livros (+ partícula de objeto)' },
          { text: 'よみたいです。', meaning: 'quero ler', lemma: 'よむ' },
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
          { text: 'どようびの', meaning: 'de sábado', lemma: 'どようび' },
          { text: 'あさは', meaning: 'a manhã', lemma: 'あさ' },
          { text: 'ゆっくり', meaning: 'com calma, devagar' },
          { text: 'おきます。', meaning: 'acordo', lemma: 'おきる' },
        ],
        translation: 'No sábado de manhã, acordo com calma.',
      },
      {
        words: [
          { text: 'あさごはんを', meaning: 'o café da manhã (+ partícula de objeto)' },
          { text: 'たべながら、', meaning: 'enquanto como,', lemma: 'たべる' },
          { text: 'テレビを', meaning: 'TV (+ partícula de objeto)' },
          { text: 'みます。', meaning: 'assisto', lemma: 'みる' },
        ],
        translation: 'Assisto TV enquanto tomo café da manhã.',
      },
      {
        words: [
          { text: 'ごごは', meaning: 'de tarde', lemma: 'ごご' },
          { text: 'おんがくを', meaning: 'música (+ partícula de objeto)' },
          { text: 'ききます。', meaning: 'escuto', lemma: 'きく' },
        ],
        translation: 'De tarde, escuto música.',
      },
      {
        words: [
          { text: 'ときどき', meaning: 'às vezes' },
          { text: 'ともだちと', meaning: 'com amigos', lemma: 'ともだち' },
          { text: 'でかけます。', meaning: 'saio (de casa)', lemma: 'でかける' },
        ],
        translation: 'Às vezes, saio com amigos.',
      },
      {
        words: [
          { text: 'にちようびは', meaning: 'no domingo', lemma: 'にちようび' },
          { text: 'そうじを', meaning: 'faxina (+ partícula de objeto)' },
          { text: 'して、', meaning: 'faço, e', lemma: 'する' },
          { text: 'せんたくも', meaning: 'lavagem de roupa também', lemma: 'せんたく' },
          { text: 'します。', meaning: 'faço', lemma: 'する' },
        ],
        translation: 'No domingo, faço faxina e também lavo roupa.',
      },
      {
        words: [
          { text: 'よるは', meaning: 'a noite', lemma: 'よる' },
          { text: 'はやく', meaning: 'cedo', lemma: 'はやい' },
          { text: 'ねます。', meaning: 'durmo', lemma: 'ねる' },
        ],
        translation: 'À noite, durmo cedo.',
      },
      {
        words: [
          { text: 'しゅうまつは', meaning: 'o fim de semana', lemma: 'しゅうまつ' },
          { text: 'ゆっくり', meaning: 'com calma' },
          { text: 'できて、', meaning: 'consigo, e', lemma: 'できる' },
          { text: 'いいです。', meaning: 'é bom', lemma: 'いい' },
        ],
        translation: 'No fim de semana consigo descansar com calma, e isso é bom.',
      },
      {
        words: [
          { text: 'ときどき、', meaning: 'às vezes,' },
          { text: 'りょうりを', meaning: 'comida/culinária (+ partícula de objeto)' },
          { text: 'つくります。', meaning: 'faço, preparo', lemma: 'つくる' },
        ],
        translation: 'Às vezes, cozinho.',
      },
      {
        words: [
          { text: 'うちの', meaning: 'de casa', lemma: 'うち' },
          { text: 'しょくぶつに', meaning: 'nas plantas', lemma: 'しょくぶつ' },
          { text: 'みずを', meaning: 'água (+ partícula de objeto)' },
          { text: 'あげます。', meaning: 'dou', lemma: 'あげる' },
        ],
        translation: 'Dou água nas plantas de casa.',
      },
      {
        words: [
          { text: 'うちに', meaning: 'em casa', lemma: 'うち' },
          { text: 'いる', meaning: 'ficar, estar' },
          { text: 'ひは、', meaning: 'nos dias,', lemma: 'ひ' },
          { text: 'こころが', meaning: 'a mente/coração (+ partícula de sujeito)' },
          { text: 'やすまります。', meaning: 'descansa', lemma: 'やすまる' },
        ],
        translation: 'Nos dias em que fico em casa, minha mente descansa.',
      },
      {
        words: [
          { text: 'らいしゅうも、', meaning: 'semana que vem também,', lemma: 'らいしゅう' },
          { text: 'うちで', meaning: 'em casa', lemma: 'うち' },
          { text: 'のんびり', meaning: 'relaxadamente' },
          { text: 'すごしたいです。', meaning: 'quero passar o tempo', lemma: 'すごす' },
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
          { text: 'わたしは', meaning: 'eu', lemma: 'わたし' },
          { text: 'すしが', meaning: 'sushi (+ partícula de sujeito)' },
          { text: 'だいすきです。', meaning: 'amo, gosto muito', lemma: 'だいすき' },
        ],
        translation: 'Eu amo sushi.',
      },
      {
        words: [
          { text: 'とくに、', meaning: 'especialmente,' },
          { text: 'さかなの', meaning: 'de peixe', lemma: 'さかな' },
          { text: 'すしが', meaning: 'sushi (+ partícula de sujeito)' },
          { text: 'すきです。', meaning: 'gosto', lemma: 'すき' },
        ],
        translation: 'Gosto especialmente do sushi de peixe.',
      },
      {
        words: [
          { text: 'しゅうまつに、', meaning: 'no fim de semana,', lemma: 'しゅうまつ' },
          { text: 'かぞくと', meaning: 'com a família', lemma: 'かぞく' },
          { text: 'すしやへ', meaning: 'para a loja de sushi', lemma: 'すしや' },
          { text: 'いきます。', meaning: 'vou', lemma: 'いく' },
        ],
        translation: 'No fim de semana, vou com a família a uma loja de sushi.',
      },
      {
        words: [
          { text: 'すしやさんは', meaning: 'a loja de sushi', lemma: 'すしや' },
          { text: 'いつも', meaning: 'sempre' },
          { text: 'こんでいます。', meaning: 'está cheia/lotada', lemma: 'こむ' },
        ],
        translation: 'A loja de sushi está sempre cheia.',
      },
      {
        words: [
          { text: 'でも、', meaning: 'mas,' },
          { text: 'すしは', meaning: 'o sushi', lemma: 'すし' },
          { text: 'とても', meaning: 'muito' },
          { text: 'おいしいです。', meaning: 'é gostoso', lemma: 'おいしい' },
        ],
        translation: 'Mas o sushi é muito gostoso.',
      },
      {
        words: [
          { text: 'わたしは', meaning: 'eu', lemma: 'わたし' },
          { text: 'おちゃも', meaning: 'chá também', lemma: 'おちゃ' },
          { text: 'いっしょに', meaning: 'junto' },
          { text: 'のみます。', meaning: 'bebo', lemma: 'のむ' },
        ],
        translation: 'Eu também bebo chá junto.',
      },
      {
        words: [
          { text: 'すしを', meaning: 'sushi (+ partícula de objeto)' },
          { text: 'たべる', meaning: 'comer' },
          { text: 'ひは、', meaning: 'o dia (é),', lemma: 'ひ' },
          { text: 'いつも', meaning: 'sempre' },
          { text: 'たのしいです。', meaning: 'é divertido', lemma: 'たのしい' },
        ],
        translation: 'Os dias em que como sushi são sempre divertidos.',
      },
      {
        words: [
          { text: 'たまに、', meaning: 'de vez em quando,' },
          { text: 'いえで', meaning: 'em casa', lemma: 'いえ' },
          { text: 'すしを', meaning: 'sushi (+ partícula de objeto)' },
          { text: 'つくります。', meaning: 'faço', lemma: 'つくる' },
        ],
        translation: 'De vez em quando, faço sushi em casa.',
      },
      {
        words: [
          { text: 'でも、', meaning: 'mas,' },
          { text: 'おみせの', meaning: 'da loja', lemma: 'おみせ' },
          { text: 'すしの', meaning: 'o sushi', lemma: 'すし' },
          { text: 'ほうが', meaning: 'mais (+ comparativo)', lemma: 'ほう' },
          { text: 'おいしいです。', meaning: 'é gostoso', lemma: 'おいしい' },
        ],
        translation: 'Mas o sushi da loja é mais gostoso.',
      },
      {
        words: [
          { text: 'すきな', meaning: 'favoritos', lemma: 'すき' },
          { text: 'ねたは、', meaning: 'os ingredientes,', lemma: 'ねた' },
          { text: 'まぐろと', meaning: 'atum e', lemma: 'まぐろ' },
          { text: 'サーモンです。', meaning: 'é salmão', lemma: 'サーモン' },
        ],
        translation: 'Meus ingredientes favoritos são atum e salmão.',
      },
      {
        words: [
          { text: 'これからも', meaning: 'de agora em diante também' },
          { text: 'すしを', meaning: 'sushi (+ partícula de objeto)' },
          { text: 'たべつづけたいです。', meaning: 'quero continuar comendo', lemma: 'たべつづける' },
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
          { text: 'ともだちに', meaning: 'para um amigo', lemma: 'ともだち' },
          { text: 'でんわを', meaning: 'telefonema (+ partícula de objeto)' },
          { text: 'しました。', meaning: 'fiz', lemma: 'する' },
        ],
        translation: 'Ontem, liguei para um amigo.',
      },
      {
        words: [
          { text: 'さいしょに、', meaning: 'primeiro,', lemma: 'さいしょ' },
          { text: '「もしもし」と', meaning: '"alô", (+ partícula de citação)', lemma: 'もしもし' },
          { text: 'いいました。', meaning: 'eu disse', lemma: 'いう' },
        ],
        translation: 'Primeiro, disse "alô".',
      },
      {
        words: [
          { text: 'ともだちは', meaning: 'o amigo', lemma: 'ともだち' },
          { text: 'げんきそうでした。', meaning: 'parecia estar bem', lemma: 'げんき' },
        ],
        translation: 'O amigo parecia estar bem.',
      },
      {
        words: [
          { text: 'がっこうの', meaning: 'da escola', lemma: 'がっこう' },
          { text: 'はなしや、', meaning: 'história/conversa, e', lemma: 'はなし' },
          { text: 'しゅみの', meaning: 'de hobby', lemma: 'しゅみ' },
          { text: 'はなしを', meaning: 'conversa (+ partícula de objeto)' },
          { text: 'しました。', meaning: 'fizemos', lemma: 'する' },
        ],
        translation: 'Conversamos sobre a escola e sobre hobbies.',
      },
      {
        words: [
          { text: 'でんわは', meaning: 'o telefonema', lemma: 'でんわ' },
          { text: 'いちじかん', meaning: 'uma hora' },
          { text: 'ぐらい', meaning: 'cerca de' },
          { text: 'つづきました。', meaning: 'durou, continuou', lemma: 'つづく' },
        ],
        translation: 'A ligação durou cerca de uma hora.',
      },
      {
        words: [
          { text: 'さいごに、', meaning: 'no fim,', lemma: 'さいご' },
          { text: '「またね」と', meaning: '"até mais", (+ partícula de citação)', lemma: 'またね' },
          { text: 'いって、', meaning: 'dizendo, e', lemma: 'いう' },
          { text: 'でんわを', meaning: 'o telefone (+ partícula de objeto)' },
          { text: 'きりました。', meaning: 'desliguei, cortei', lemma: 'きる' },
        ],
        translation: 'No fim, disse "até mais" e desliguei.',
      },
      {
        words: [
          { text: 'とても', meaning: 'muito' },
          { text: 'たのしい', meaning: 'divertido' },
          { text: 'じかんでした。', meaning: 'foi um tempo/momento', lemma: 'じかん' },
        ],
        translation: 'Foi um momento muito divertido.',
      },
      {
        words: [
          { text: 'ともだちの', meaning: 'do amigo', lemma: 'ともだち' },
          { text: 'こえを', meaning: 'a voz (+ partícula de objeto)' },
          { text: 'きいて、', meaning: 'ouvindo,', lemma: 'きく' },
          { text: 'あんしんしました。', meaning: 'fiquei aliviado', lemma: 'あんしんする' },
        ],
        translation: 'Ouvindo a voz do amigo, fiquei aliviado.',
      },
      {
        words: [
          { text: 'らいげつ、', meaning: 'mês que vem,' },
          { text: 'ともだちに', meaning: 'com o amigo', lemma: 'ともだち' },
          { text: 'あう', meaning: 'encontrar' },
          { text: 'やくそくを', meaning: 'promessa (+ partícula de objeto)' },
          { text: 'しました。', meaning: 'fiz', lemma: 'する' },
        ],
        translation: 'Combinei de encontrar o amigo mês que vem.',
      },
      {
        words: [
          { text: 'ともだちとは、', meaning: 'com esse amigo,', lemma: 'ともだち' },
          { text: 'こどもの', meaning: 'da infância', lemma: 'こども' },
          { text: 'ときからの', meaning: 'desde a época (modificando a palavra seguinte)', lemma: 'とき' },
          { text: 'なかです。', meaning: 'é a amizade', lemma: 'なか' },
        ],
        translation: 'Com esse amigo, é uma amizade que vem desde a infância.',
      },
      {
        words: [
          { text: 'でんわを', meaning: 'o telefone (+ partícula de objeto)' },
          { text: 'きると、', meaning: 'quando desligo,', lemma: 'きる' },
          { text: 'すこし', meaning: 'um pouco' },
          { text: 'さびしく', meaning: 'com saudade', lemma: 'さびしい' },
          { text: 'なりました。', meaning: 'fiquei', lemma: 'なる' },
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
          { text: 'しちじに', meaning: 'às sete horas', lemma: 'しちじ' },
          { text: 'おきます。', meaning: 'acordo', lemma: 'おきる' },
        ],
        translation: 'Toda manhã, acordo às sete horas.',
      },
      {
        words: [
          { text: 'はを', meaning: 'os dentes (+ partícula de objeto)' },
          { text: 'みがいて、', meaning: 'escovo, e', lemma: 'みがく' },
          { text: 'ふくを', meaning: 'a roupa (+ partícula de objeto)' },
          { text: 'きます。', meaning: 'visto', lemma: 'きる' },
        ],
        translation: 'Escovo os dentes e me visto.',
      },
      {
        words: [
          { text: 'あさごはんを', meaning: 'o café da manhã (+ partícula de objeto)' },
          { text: 'たべて、', meaning: 'como, e', lemma: 'たべる' },
          { text: 'かばんを', meaning: 'a mochila (+ partícula de objeto)' },
          { text: 'もちます。', meaning: 'seguro, carrego', lemma: 'もつ' },
        ],
        translation: 'Como o café da manhã e pego a mochila.',
      },
      {
        words: [
          { text: 'はちじに', meaning: 'às oito horas', lemma: 'はちじ' },
          { text: 'いえを', meaning: 'de casa', lemma: 'いえ' },
          { text: 'でます。', meaning: 'saio', lemma: 'でる' },
        ],
        translation: 'Saio de casa às oito horas.',
      },
      {
        words: [
          { text: 'がっこうまで', meaning: 'até a escola', lemma: 'がっこう' },
          { text: 'あるいて', meaning: 'a pé (andando)', lemma: 'あるく' },
          { text: 'じゅっぷんです。', meaning: 'são dez minutos', lemma: 'じゅっぷん' },
        ],
        translation: 'São dez minutos a pé até a escola.',
      },
      {
        words: [
          { text: 'がっこうで', meaning: 'na escola', lemma: 'がっこう' },
          { text: 'ともだちに', meaning: 'os amigos', lemma: 'ともだち' },
          { text: 'あいます。', meaning: 'encontro', lemma: 'あう' },
        ],
        translation: 'Na escola, encontro os amigos.',
      },
      {
        words: [
          { text: 'じゅぎょうは', meaning: 'a aula', lemma: 'じゅぎょう' },
          { text: 'はちじはんに', meaning: 'às oito e meia', lemma: 'はちじはん' },
          { text: 'はじまります。', meaning: 'começa', lemma: 'はじまる' },
        ],
        translation: 'A aula começa às oito e meia.',
      },
      {
        words: [
          { text: 'じゅぎょうちゅうは、', meaning: 'durante a aula,', lemma: 'じゅぎょうちゅう' },
          { text: 'せんせいの', meaning: 'do professor', lemma: 'せんせい' },
          { text: 'はなしを', meaning: 'a fala (+ partícula de objeto)' },
          { text: 'よく', meaning: 'atentamente' },
          { text: 'ききます。', meaning: 'escuto', lemma: 'きく' },
        ],
        translation: 'Durante a aula, escuto atentamente o professor.',
      },
      {
        words: [
          { text: 'ひるやすみに、', meaning: 'no intervalo do almoço,', lemma: 'ひるやすみ' },
          { text: 'べんとうを', meaning: 'bentô (+ partícula de objeto)' },
          { text: 'たべます。', meaning: 'como', lemma: 'たべる' },
        ],
        translation: 'No intervalo do almoço, como um bentô.',
      },
      {
        words: [
          { text: 'じゅぎょうが', meaning: 'a aula (+ partícula de sujeito)' },
          { text: 'おわると、', meaning: 'quando termina,', lemma: 'おわる' },
          { text: 'ともだちと', meaning: 'com amigos', lemma: 'ともだち' },
          { text: 'あそびます。', meaning: 'curto, brinco', lemma: 'あそぶ' },
        ],
        translation: 'Quando a aula termina, curto com os amigos.',
      },
      {
        words: [
          { text: 'がっこうは', meaning: 'a escola', lemma: 'がっこう' },
          { text: 'たのしくて、', meaning: 'é divertida, e', lemma: 'たのしい' },
          { text: 'まいにち', meaning: 'todo dia' },
          { text: 'いきたく', meaning: 'vontade de ir', lemma: 'いく' },
          { text: 'なります。', meaning: 'dá, fico com', lemma: 'なる' },
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
          { text: 'あしたは', meaning: 'amanhã', lemma: 'あした' },
          { text: 'わたしの', meaning: 'meu', lemma: 'わたし' },
          { text: 'たんじょうびです。', meaning: 'é aniversário', lemma: 'たんじょうび' },
        ],
        translation: 'Amanhã é meu aniversário.',
      },
      {
        words: [
          { text: 'ことしで', meaning: 'neste ano', lemma: 'ことし' },
          { text: 'にじゅういっさいに', meaning: 'vinte e um anos', lemma: 'にじゅういっさい' },
          { text: 'なります。', meaning: 'me tornarei, farei', lemma: 'なる' },
        ],
        translation: 'Este ano, farei vinte e um anos.',
      },
      {
        words: [
          { text: 'かぞくが', meaning: 'a família (+ partícula de sujeito)' },
          { text: 'パーティーを', meaning: 'festa (+ partícula de objeto)' },
          { text: 'して', meaning: 'fazendo', lemma: 'する' },
          { text: 'くれます。', meaning: 'fazem (para mim, favor)', lemma: 'くれる' },
        ],
        translation: 'Minha família vai fazer uma festa para mim.',
      },
      {
        words: [
          { text: 'ともだちも', meaning: 'amigos também', lemma: 'ともだち' },
          { text: 'よびました。', meaning: 'chamei, convidei', lemma: 'よぶ' },
        ],
        translation: 'Também convidei meus amigos.',
      },
      {
        words: [
          { text: 'おいしい', meaning: 'gostoso' },
          { text: 'ケーキを', meaning: 'bolo (+ partícula de objeto)' },
          { text: 'たべる', meaning: 'comer' },
          { text: 'よていです。', meaning: 'é o plano, previsão', lemma: 'よてい' },
        ],
        translation: 'O plano é comer um bolo gostoso.',
      },
      {
        words: [
          { text: 'みんなから', meaning: 'de todo mundo', lemma: 'みんな' },
          { text: 'プレゼントを', meaning: 'presente (+ partícula de objeto)' },
          { text: 'もらいます。', meaning: 'recebo', lemma: 'もらう' },
        ],
        translation: 'Vou receber presentes de todo mundo.',
      },
      {
        words: [
          { text: 'とても', meaning: 'muito' },
          { text: 'たのしみです。', meaning: 'estou ansioso, aguardo com expectativa', lemma: 'たのしみ' },
        ],
        translation: 'Estou muito ansioso.',
      },
      {
        words: [
          { text: 'パーティーは', meaning: 'a festa', lemma: 'パーティー' },
          { text: 'よる', meaning: 'à noite' },
          { text: 'しちじから', meaning: 'a partir das sete', lemma: 'しちじ' },
          { text: 'です。', meaning: 'é' },
        ],
        translation: 'A festa começa às sete da noite.',
      },
      {
        words: [
          { text: 'みんなで', meaning: 'todos juntos', lemma: 'みんな' },
          { text: 'しゃしんを', meaning: 'fotos (+ partícula de objeto)' },
          { text: 'とる', meaning: 'tirar' },
          { text: 'つもりです。', meaning: 'pretendemos', lemma: 'つもり' },
        ],
        translation: 'Pretendemos tirar fotos todos juntos.',
      },
      {
        words: [
          { text: 'あたらしい', meaning: 'nova' },
          { text: 'としを', meaning: 'idade (+ partícula de objeto)' },
          { text: 'むかえるのが', meaning: 'completar', lemma: 'むかえる' },
          { text: 'たのしみです。', meaning: 'estou animado', lemma: 'たのしみ' },
        ],
        translation: 'Estou animado para completar uma nova idade.',
      },
      {
        words: [
          { text: 'すてきな', meaning: 'maravilhoso', lemma: 'すてき' },
          { text: 'たんじょうびに', meaning: 'em aniversário', lemma: 'たんじょうび' },
          { text: 'なりそうです。', meaning: 'parece que vai ser', lemma: 'なる' },
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
          { text: 'わたしは', meaning: 'eu', lemma: 'わたし' },
          { text: 'いぬを', meaning: 'cachorro (+ partícula de objeto)' },
          { text: 'かっています。', meaning: 'tenho, crio (animal)', lemma: 'かう' },
        ],
        translation: 'Eu tenho um cachorro.',
      },
      {
        words: [
          { text: 'なまえは', meaning: 'o nome', lemma: 'なまえ' },
          { text: 'ぽちです。', meaning: 'é Pochi', lemma: 'ぽち' },
        ],
        translation: 'O nome dele é Pochi.',
      },
      {
        words: [
          { text: 'まいあさ、', meaning: 'toda manhã,' },
          { text: 'こうえんで', meaning: 'no parque', lemma: 'こうえん' },
          { text: 'さんぽを', meaning: 'passeio (+ partícula de objeto)' },
          { text: 'します。', meaning: 'faço', lemma: 'する' },
        ],
        translation: 'Toda manhã, passeamos no parque.',
      },
      {
        words: [
          { text: 'ぽちは', meaning: 'o Pochi', lemma: 'ぽち' },
          { text: 'とても', meaning: 'muito' },
          { text: 'げんきで、', meaning: 'é ativo/saudável, e', lemma: 'げんき' },
          { text: 'よく', meaning: 'bastante, frequentemente' },
          { text: 'はしります。', meaning: 'corre', lemma: 'はしる' },
        ],
        translation: 'O Pochi é muito ativo e corre bastante.',
      },
      {
        words: [
          { text: 'わたしを', meaning: 'a mim (+ partícula de objeto)' },
          { text: 'みると、', meaning: 'quando vê,', lemma: 'みる' },
          { text: 'しっぽを', meaning: 'o rabo (+ partícula de objeto)' },
          { text: 'ふります。', meaning: 'abana, balança', lemma: 'ふる' },
        ],
        translation: 'Quando me vê, abana o rabo.',
      },
      {
        words: [
          { text: 'よる', meaning: 'à noite' },
          { text: 'いっしょに', meaning: 'juntos' },
          { text: 'ねます。', meaning: 'dormimos', lemma: 'ねる' },
        ],
        translation: 'À noite, dormimos juntos.',
      },
      {
        words: [
          { text: 'ぽちは', meaning: 'o Pochi', lemma: 'ぽち' },
          { text: 'わたしの', meaning: 'minha', lemma: 'わたし' },
          { text: 'たいせつな', meaning: 'importante', lemma: 'たいせつ' },
          { text: 'かぞくです。', meaning: 'é família', lemma: 'かぞく' },
        ],
        translation: 'O Pochi é um membro importante da minha família.',
      },
      {
        words: [
          { text: 'まいにち、', meaning: 'todo dia,' },
          { text: 'ドッグフードを', meaning: 'ração (+ partícula de objeto)' },
          { text: 'あげます。', meaning: 'dou', lemma: 'あげる' },
        ],
        translation: 'Todo dia, dou ração para ele.',
      },
      {
        words: [
          { text: 'びょういんへ', meaning: 'para a clínica', lemma: 'びょういん' },
          { text: 'いくのは、', meaning: 'ir,', lemma: 'いく' },
          { text: 'すこし', meaning: 'um pouco' },
          { text: 'きらいです。', meaning: 'não gosta', lemma: 'きらい' },
        ],
        translation: 'Ele não gosta muito de ir ao veterinário.',
      },
      {
        words: [
          { text: 'でも、', meaning: 'mas,' },
          { text: 'わたしと', meaning: 'comigo', lemma: 'わたし' },
          { text: 'いると、', meaning: 'quando está,', lemma: 'いる' },
          { text: 'あんしんするみたいです。', meaning: 'parece que fica tranquilo', lemma: 'あんしんする' },
        ],
        translation: 'Mas quando está comigo, ele parece ficar tranquilo.',
      },
      {
        words: [
          { text: 'ぽちが', meaning: 'o Pochi (+ partícula de sujeito)' },
          { text: 'いる', meaning: 'existir, estar' },
          { text: 'まいにちは、', meaning: 'todo dia,', lemma: 'まいにち' },
          { text: 'とても', meaning: 'muito' },
          { text: 'しあわせです。', meaning: 'é feliz', lemma: 'しあわせ' },
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
          { text: 'でんしゃで', meaning: 'de trem', lemma: 'でんしゃ' },
          { text: 'うみへ', meaning: 'para o mar', lemma: 'うみ' },
          { text: 'いきました。', meaning: 'fui', lemma: 'いく' },
        ],
        translation: 'Semana passada, fui de trem até o mar.',
      },
      {
        words: [
          { text: 'でんしゃは', meaning: 'o trem', lemma: 'でんしゃ' },
          { text: 'にじかん', meaning: 'duas horas' },
          { text: 'ぐらい', meaning: 'cerca de' },
          { text: 'かかりました。', meaning: 'levou (tempo)', lemma: 'かかる' },
        ],
        translation: 'O trem levou cerca de duas horas.',
      },
      {
        words: [
          { text: 'まどから', meaning: 'da janela', lemma: 'まど' },
          { text: 'やまや', meaning: 'montanhas e', lemma: 'やま' },
          { text: 'かわが', meaning: 'rios (+ partícula de sujeito)' },
          { text: 'みえました。', meaning: 'era possível ver', lemma: 'みえる' },
        ],
        translation: 'Da janela, dava para ver montanhas e rios.',
      },
      {
        words: [
          { text: 'でんしゃの', meaning: 'do trem', lemma: 'でんしゃ' },
          { text: 'なかで、', meaning: 'dentro,', lemma: 'なか' },
          { text: 'おべんとうを', meaning: 'bentô (+ partícula de objeto)' },
          { text: 'たべました。', meaning: 'comi', lemma: 'たべる' },
        ],
        translation: 'Comi um bentô dentro do trem.',
      },
      {
        words: [
          { text: 'うみに', meaning: 'ao mar', lemma: 'うみ' },
          { text: 'ついたとき、', meaning: 'quando cheguei,', lemma: 'つく' },
          { text: 'とても', meaning: 'muito' },
          { text: 'きれいでした。', meaning: 'estava bonito', lemma: 'きれい' },
        ],
        translation: 'Quando cheguei ao mar, estava muito bonito.',
      },
      {
        words: [
          { text: 'かえりの', meaning: 'da volta', lemma: 'かえり' },
          { text: 'でんしゃで、', meaning: 'no trem,', lemma: 'でんしゃ' },
          { text: 'ぐっすり', meaning: 'profundamente' },
          { text: 'ねました。', meaning: 'dormi', lemma: 'ねる' },
        ],
        translation: 'No trem de volta, dormi profundamente.',
      },
      {
        words: [
          { text: 'たのしい', meaning: 'divertido' },
          { text: 'いちにちでした。', meaning: 'foi um dia', lemma: 'いちにち' },
        ],
        translation: 'Foi um dia divertido.',
      },
      {
        words: [
          { text: 'うみの', meaning: 'do mar', lemma: 'うみ' },
          { text: 'ちかくで、', meaning: 'perto,', lemma: 'ちかく' },
          { text: 'さかなりょうりを', meaning: 'culinária de peixe (+ partícula de objeto)' },
          { text: 'たべました。', meaning: 'comi', lemma: 'たべる' },
        ],
        translation: 'Perto do mar, comi um prato de peixe.',
      },
      {
        words: [
          { text: 'すなはまを', meaning: 'a praia de areia (+ partícula de objeto)' },
          { text: 'はだしで', meaning: 'descalço', lemma: 'はだし' },
          { text: 'あるきました。', meaning: 'caminhei', lemma: 'あるく' },
        ],
        translation: 'Caminhei descalço pela praia.',
      },
      {
        words: [
          { text: 'おみやげに、', meaning: 'como lembrança,', lemma: 'おみやげ' },
          { text: 'かいがらを', meaning: 'conchas (+ partícula de objeto)' },
          { text: 'ひろいました。', meaning: 'peguei', lemma: 'ひろう' },
        ],
        translation: 'Peguei conchas como lembrança.',
      },
      {
        words: [
          { text: 'また、', meaning: 'de novo,' },
          { text: 'でんしゃで', meaning: 'de trem', lemma: 'でんしゃ' },
          { text: 'どこかへ', meaning: 'para algum lugar', lemma: 'どこか' },
          { text: 'いきたいです。', meaning: 'quero ir', lemma: 'いく' },
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
          { text: 'きょうは', meaning: 'hoje', lemma: 'きょう' },
          { text: 'にちようびですが、', meaning: 'é domingo, mas', lemma: 'にちようび' },
          { text: 'あめです。', meaning: 'está chovendo', lemma: 'あめ' },
        ],
        translation: 'Hoje é domingo, mas está chovendo.',
      },
      {
        words: [
          { text: 'そとへ', meaning: 'para fora', lemma: 'そと' },
          { text: 'でかけられません。', meaning: 'não posso sair', lemma: 'でかける' },
        ],
        translation: 'Não posso sair.',
      },
      {
        words: [
          { text: 'うちで', meaning: 'em casa', lemma: 'うち' },
          { text: 'えいがを', meaning: 'filme (+ partícula de objeto)' },
          { text: 'みることに', meaning: 'a assistir', lemma: 'みる' },
          { text: 'しました。', meaning: 'decidi', lemma: 'する' },
        ],
        translation: 'Decidi assistir a um filme em casa.',
      },
      {
        words: [
          { text: 'あたたかい', meaning: 'quente' },
          { text: 'おちゃを', meaning: 'chá (+ partícula de objeto)' },
          { text: 'のみながら、', meaning: 'enquanto bebo,', lemma: 'のむ' },
          { text: 'みました。', meaning: 'assisti', lemma: 'みる' },
        ],
        translation: 'Assisti enquanto tomava um chá quente.',
      },
      {
        words: [
          { text: 'まどの', meaning: 'da janela', lemma: 'まど' },
          { text: 'そとの', meaning: 'de fora', lemma: 'そと' },
          { text: 'あめの', meaning: 'da chuva', lemma: 'あめ' },
          { text: 'おとが', meaning: 'o som (+ partícula de sujeito)' },
          { text: 'すきです。', meaning: 'gosto', lemma: 'すき' },
        ],
        translation: 'Gosto do som da chuva do lado de fora da janela.',
      },
      {
        words: [
          { text: 'こんな', meaning: 'assim, deste tipo' },
          { text: 'ひは、', meaning: 'o dia (é),', lemma: 'ひ' },
          { text: 'うちで', meaning: 'em casa', lemma: 'うち' },
          { text: 'のんびり', meaning: 'com calma, relaxadamente' },
          { text: 'します。', meaning: 'faço', lemma: 'する' },
        ],
        translation: 'Em dias assim, relaxo em casa.',
      },
      {
        words: [
          { text: 'あめの', meaning: 'de chuva', lemma: 'あめ' },
          { text: 'ひも、', meaning: 'o dia também,', lemma: 'ひ' },
          { text: 'わるくないです。', meaning: 'não é ruim', lemma: 'わるい' },
        ],
        translation: 'Um dia de chuva também não é ruim.',
      },
      {
        words: [
          { text: 'えいがの', meaning: 'do filme', lemma: 'えいが' },
          { text: 'あとで、', meaning: 'depois,', lemma: 'あと' },
          { text: 'しょうせつを', meaning: 'romance (+ partícula de objeto)' },
          { text: 'よみました。', meaning: 'li', lemma: 'よむ' },
        ],
        translation: 'Depois do filme, li um romance.',
      },
      {
        words: [
          { text: 'あめの', meaning: 'de chuva', lemma: 'あめ' },
          { text: 'ひは、', meaning: 'no dia,', lemma: 'ひ' },
          { text: 'あたまが', meaning: 'a cabeça/mente (+ partícula de sujeito)' },
          { text: 'すっきり', meaning: 'clara' },
          { text: 'します。', meaning: 'fica', lemma: 'する' },
        ],
        translation: 'Em dias de chuva, minha mente fica mais clara.',
      },
      {
        words: [
          { text: 'あめが', meaning: 'a chuva (+ partícula de sujeito)' },
          { text: 'やんだら、', meaning: 'quando parar,', lemma: 'やむ' },
          { text: 'さんぽに', meaning: 'para um passeio', lemma: 'さんぽ' },
          { text: 'いきたいです。', meaning: 'quero ir', lemma: 'いく' },
        ],
        translation: 'Quando a chuva parar, quero sair para passear.',
      },
      {
        words: [
          { text: 'こんな', meaning: 'assim, deste tipo' },
          { text: 'にちようびも、', meaning: 'um domingo também,', lemma: 'にちようび' },
          { text: 'たまには', meaning: 'de vez em quando', lemma: 'たまに' },
          { text: 'いいです。', meaning: 'é bom', lemma: 'いい' },
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
          { text: 'わたしは', meaning: 'eu', lemma: 'わたし' },
          { text: 'まいにち', meaning: 'todo dia' },
          { text: 'うちの', meaning: 'de casa', lemma: 'うち' },
          { text: 'しごとを', meaning: 'tarefa (+ partícula de objeto)' },
          { text: 'てつだいます。', meaning: 'ajudo', lemma: 'てつだう' },
        ],
        translation: 'Eu ajudo nas tarefas de casa todos os dias.',
      },
      {
        words: [
          { text: 'あさは', meaning: 'de manhã', lemma: 'あさ' },
          { text: 'おさらを', meaning: 'os pratos (+ partícula de objeto)' },
          { text: 'あらいます。', meaning: 'lavo', lemma: 'あらう' },
        ],
        translation: 'De manhã, lavo os pratos.',
      },
      {
        words: [
          { text: 'ゆうがたは', meaning: 'no fim de tarde', lemma: 'ゆうがた' },
          { text: 'いぬの', meaning: 'do cachorro', lemma: 'いぬ' },
          { text: 'さんぽを', meaning: 'passeio (+ partícula de objeto)' },
          { text: 'します。', meaning: 'faço', lemma: 'する' },
        ],
        translation: 'No fim da tarde, passeio com o cachorro.',
      },
      {
        words: [
          { text: 'ときどき', meaning: 'às vezes' },
          { text: 'せんたくも', meaning: 'lavagem de roupa também', lemma: 'せんたく' },
          { text: 'てつだいます。', meaning: 'ajudo', lemma: 'てつだう' },
        ],
        translation: 'Às vezes, também ajudo a lavar roupa.',
      },
      {
        words: [
          { text: 'ははは', meaning: 'minha mãe', lemma: 'はは' },
          { text: 'いつも', meaning: 'sempre' },
          { text: '「ありがとう」と', meaning: '"obrigada", (+ partícula de citação)', lemma: 'ありがとう' },
          { text: 'いいます。', meaning: 'diz', lemma: 'いう' },
        ],
        translation: 'Minha mãe sempre diz "obrigada".',
      },
      {
        words: [
          { text: 'てつだいを', meaning: 'ajuda (+ partícula de objeto)' },
          { text: 'すると、', meaning: 'quando faço,', lemma: 'する' },
          { text: 'きもちが', meaning: 'o sentimento (+ partícula de sujeito)' },
          { text: 'いいです。', meaning: 'é bom', lemma: 'いい' },
        ],
        translation: 'Quando ajudo, me sinto bem.',
      },
      {
        words: [
          { text: 'かぞくの', meaning: 'da família', lemma: 'かぞく' },
          { text: 'ために、', meaning: 'para o bem de, por causa de' },
          { text: 'これからも', meaning: 'de agora em diante também' },
          { text: 'がんばります。', meaning: 'vou me esforçar', lemma: 'がんばる' },
        ],
        translation: 'Vou continuar me esforçando pela minha família.',
      },
      {
        words: [
          { text: 'りょうりの', meaning: 'de culinária', lemma: 'りょうり' },
          { text: 'てつだいも', meaning: 'ajuda também', lemma: 'てつだい' },
          { text: 'すきです。', meaning: 'gosto', lemma: 'すき' },
        ],
        translation: 'Também gosto de ajudar na cozinha.',
      },
      {
        words: [
          { text: 'ははから、', meaning: 'da minha mãe,', lemma: 'はは' },
          { text: 'いろいろ', meaning: 'várias coisas' },
          { text: 'おしえて', meaning: 'ensino', lemma: 'おしえる' },
          { text: 'もらいます。', meaning: 'recebo, aprendo', lemma: 'もらう' },
        ],
        translation: 'Aprendo várias coisas com minha mãe.',
      },
      {
        words: [
          { text: 'じぶんで', meaning: 'por mim mesmo', lemma: 'じぶん' },
          { text: 'できることが', meaning: 'as coisas que consigo fazer (+ partícula de sujeito)', lemma: 'できる' },
          { text: 'ふえて、', meaning: 'aumentam, e', lemma: 'ふえる' },
          { text: 'うれしいです。', meaning: 'fico feliz', lemma: 'うれしい' },
        ],
        translation: 'Fico feliz porque as coisas que consigo fazer sozinho estão aumentando.',
      },
      {
        words: [
          { text: 'おてつだいは、', meaning: 'ajudar em casa,', lemma: 'おてつだい' },
          { text: 'かぞくの', meaning: 'da família', lemma: 'かぞく' },
          { text: 'きずなを', meaning: 'o laço (+ partícula de objeto)' },
          { text: 'つよく', meaning: 'forte', lemma: 'つよい' },
          { text: 'します。', meaning: 'fortalece, faz', lemma: 'する' },
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
          { text: 'わたしの', meaning: 'minha', lemma: 'わたし' },
          { text: 'がっこうは、', meaning: 'a escola,', lemma: 'がっこう' },
          { text: 'おおきい', meaning: 'grande' },
          { text: 'がっこうです。', meaning: 'é escola', lemma: 'がっこう' },
        ],
        translation: 'Minha escola é uma escola grande.',
      },
      {
        words: [
          { text: 'まいにち、', meaning: 'todo dia,' },
          { text: 'はちじに', meaning: 'às oito horas', lemma: 'はちじ' },
          { text: 'じゅぎょうが', meaning: 'a aula (+ partícula de sujeito)' },
          { text: 'はじまります。', meaning: 'começa', lemma: 'はじまる' },
        ],
        translation: 'Todo dia, a aula começa às oito horas.',
      },
      {
        words: [
          { text: 'すきな', meaning: 'favorita', lemma: 'すき' },
          { text: 'かもくは、', meaning: 'a matéria,', lemma: 'かもく' },
          { text: 'すうがくです。', meaning: 'é matemática', lemma: 'すうがく' },
        ],
        translation: 'Minha matéria favorita é matemática.',
      },
      {
        words: [
          { text: 'れきしも', meaning: 'história também', lemma: 'れきし' },
          { text: 'おもしろくて、', meaning: 'é interessante, e', lemma: 'おもしろい' },
          { text: 'すきです。', meaning: 'gosto', lemma: 'すき' },
        ],
        translation: 'História também é interessante, e eu gosto.',
      },
      {
        words: [
          { text: 'クラスに、', meaning: 'na turma,', lemma: 'クラス' },
          { text: 'なかの いい', meaning: 'íntimos, que se dão bem', lemma: 'なかがいい' },
          { text: 'ともだちが', meaning: 'amigos (+ partícula de sujeito)' },
          { text: 'います。', meaning: 'há, tenho', lemma: 'いる' },
        ],
        translation: 'Na turma, tenho amigos íntimos.',
      },
      {
        words: [
          { text: 'きゅうけいじかんは、', meaning: 'no intervalo,', lemma: 'きゅうけいじかん' },
          { text: 'みんなで', meaning: 'todos juntos', lemma: 'みんな' },
          { text: 'はなします。', meaning: 'conversamos', lemma: 'はなす' },
        ],
        translation: 'No intervalo, todos conversamos juntos.',
      },
      {
        words: [
          { text: 'せんせいは、', meaning: 'o professor,', lemma: 'せんせい' },
          { text: 'きびしいですが、', meaning: 'é rigoroso, mas', lemma: 'きびしい' },
          { text: 'しんせつです。', meaning: 'é gentil', lemma: 'しんせつ' },
        ],
        translation: 'O professor é rigoroso, mas gentil.',
      },
      {
        words: [
          { text: 'しゅくだいは、', meaning: 'o dever de casa,', lemma: 'しゅくだい' },
          { text: 'まいばん', meaning: 'toda noite' },
          { text: 'します。', meaning: 'faço', lemma: 'する' },
        ],
        translation: 'Faço o dever de casa toda noite.',
      },
      {
        words: [
          { text: 'きんようびは、', meaning: 'na sexta-feira,', lemma: 'きんようび' },
          { text: 'テストが', meaning: 'prova (+ partícula de sujeito)' },
          { text: 'あります。', meaning: 'há', lemma: 'ある' },
        ],
        translation: 'Na sexta-feira, tem prova.',
      },
      {
        words: [
          { text: 'テストの', meaning: 'da prova', lemma: 'テスト' },
          { text: 'まえは、', meaning: 'antes,', lemma: 'まえ' },
          { text: 'としょかんで', meaning: 'na biblioteca', lemma: 'としょかん' },
          { text: 'べんきょうします。', meaning: 'estudo', lemma: 'べんきょうする' },
        ],
        translation: 'Antes da prova, estudo na biblioteca.',
      },
      {
        words: [
          { text: 'がっこうせいかつは、', meaning: 'a vida escolar,', lemma: 'がっこうせいかつ' },
          { text: 'たのしいです。', meaning: 'é divertida', lemma: 'たのしい' },
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
          { text: 'わたしは、', meaning: 'eu,', lemma: 'わたし' },
          { text: 'スポーツが', meaning: 'esporte (+ partícula de sujeito)' },
          { text: 'だいすきです。', meaning: 'amo', lemma: 'だいすき' },
        ],
        translation: 'Eu amo esportes.',
      },
      {
        words: [
          { text: 'とくに、', meaning: 'especialmente,' },
          { text: 'サッカーが', meaning: 'futebol (+ partícula de sujeito)' },
          { text: 'すきです。', meaning: 'gosto', lemma: 'すき' },
        ],
        translation: 'Especialmente, gosto de futebol.',
      },
      {
        words: [
          { text: 'しゅうに', meaning: 'por semana', lemma: 'しゅう' },
          { text: 'にかい、', meaning: 'duas vezes,' },
          { text: 'れんしゅうが', meaning: 'treino (+ partícula de sujeito)' },
          { text: 'あります。', meaning: 'há', lemma: 'ある' },
        ],
        translation: 'Por semana, tem treino duas vezes.',
      },
      {
        words: [
          { text: 'チームの', meaning: 'do time', lemma: 'チーム' },
          { text: 'みんなと、', meaning: 'com todos,', lemma: 'みんな' },
          { text: 'いっしょに', meaning: 'juntos' },
          { text: 'はしります。', meaning: 'corro', lemma: 'はしる' },
        ],
        translation: 'Corro junto com todo o time.',
      },
      {
        words: [
          { text: 'れんしゅうは、', meaning: 'o treino,', lemma: 'れんしゅう' },
          { text: 'たいへんですが、', meaning: 'é puxado, mas', lemma: 'たいへん' },
          { text: 'たのしいです。', meaning: 'é divertido', lemma: 'たのしい' },
        ],
        translation: 'O treino é puxado, mas divertido.',
      },
      {
        words: [
          { text: 'しあいの', meaning: 'de jogo', lemma: 'しあい' },
          { text: 'ひは、', meaning: 'no dia,', lemma: 'ひ' },
          { text: 'すこし', meaning: 'um pouco' },
          { text: 'きんちょうします。', meaning: 'fico nervoso', lemma: 'きんちょうする' },
        ],
        translation: 'No dia do jogo, fico um pouco nervoso.',
      },
      {
        words: [
          { text: 'せんしゅう、', meaning: 'semana passada,' },
          { text: 'しあいに', meaning: 'no jogo', lemma: 'しあい' },
          { text: 'かちました。', meaning: 'ganhamos', lemma: 'かつ' },
        ],
        translation: 'Semana passada, ganhamos o jogo.',
      },
      {
        words: [
          { text: 'みんなで、', meaning: 'todos juntos,', lemma: 'みんな' },
          { text: 'とても', meaning: 'muito' },
          { text: 'よろこびました。', meaning: 'ficamos felizes', lemma: 'よろこぶ' },
        ],
        translation: 'Todos juntos, ficamos muito felizes.',
      },
      {
        words: [
          { text: 'コーチは、', meaning: 'o técnico,', lemma: 'コーチ' },
          { text: 'いつも', meaning: 'sempre' },
          { text: 'おうえんして', meaning: 'apoiando', lemma: 'おうえんする' },
          { text: 'くれます。', meaning: 'nos dá, faz por nós', lemma: 'くれる' },
        ],
        translation: 'O técnico sempre nos incentiva.',
      },
      {
        words: [
          { text: 'スポーツを', meaning: 'esporte (+ partícula de objeto)' },
          { text: 'すると、', meaning: 'quando faço,', lemma: 'する' },
          { text: 'げんきに', meaning: 'com energia', lemma: 'げんき' },
          { text: 'なります。', meaning: 'fico', lemma: 'なる' },
        ],
        translation: 'Quando faço esporte, fico cheio de energia.',
      },
      {
        words: [
          { text: 'これからも、', meaning: 'de agora em diante também,' },
          { text: 'サッカーを', meaning: 'futebol (+ partícula de objeto)' },
          { text: 'つづけたいです。', meaning: 'quero continuar', lemma: 'つづける' },
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
          { text: 'きのうから、', meaning: 'desde ontem,', lemma: 'きのう' },
          { text: 'のどが', meaning: 'a garganta (+ partícula de sujeito)' },
          { text: 'いたいです。', meaning: 'dói', lemma: 'いたい' },
        ],
        translation: 'Desde ontem, minha garganta dói.',
      },
      {
        words: [
          { text: 'けさ、', meaning: 'esta manhã,' },
          { text: 'ねつを', meaning: 'a febre (+ partícula de objeto)' },
          { text: 'はかりました。', meaning: 'medi', lemma: 'はかる' },
        ],
        translation: 'Esta manhã, medi a febre.',
      },
      {
        words: [
          { text: 'さんじゅうはちどでした。', meaning: 'estava trinta e oito graus', lemma: 'さんじゅうはちど' },
        ],
        translation: 'Estava com 38 graus.',
      },
      {
        words: [
          { text: 'がっこうを', meaning: 'a escola (+ partícula de objeto)' },
          { text: 'やすむことに', meaning: 'a faltar', lemma: 'やすむ' },
          { text: 'しました。', meaning: 'decidi', lemma: 'する' },
        ],
        translation: 'Decidi faltar à escola.',
      },
      {
        words: [
          { text: 'ははが、', meaning: 'minha mãe,', lemma: 'はは' },
          { text: 'おかゆを', meaning: 'mingau de arroz (+ partícula de objeto)' },
          { text: 'つくって', meaning: 'fazendo', lemma: 'つくる' },
          { text: 'くれました。', meaning: 'fez para mim', lemma: 'くれる' },
        ],
        translation: 'Minha mãe fez mingau para mim.',
      },
      {
        words: [
          { text: 'くすりを', meaning: 'remédio (+ partícula de objeto)' },
          { text: 'のんで、', meaning: 'tomei, e', lemma: 'のむ' },
          { text: 'ねました。', meaning: 'dormi', lemma: 'ねる' },
        ],
        translation: 'Tomei remédio e dormi.',
      },
      {
        words: [
          { text: 'いちにちじゅう、', meaning: 'o dia todo,' },
          { text: 'ベッドに', meaning: 'na cama', lemma: 'ベッド' },
          { text: 'いました。', meaning: 'fiquei', lemma: 'いる' },
        ],
        translation: 'Fiquei na cama o dia todo.',
      },
      {
        words: [
          { text: 'ゆうがた、', meaning: 'no fim da tarde,' },
          { text: 'すこし', meaning: 'um pouco' },
          { text: 'げんきに', meaning: 'melhor', lemma: 'げんき' },
          { text: 'なりました。', meaning: 'fiquei', lemma: 'なる' },
        ],
        translation: 'No fim da tarde, melhorei um pouco.',
      },
      {
        words: [
          { text: 'ともだちが、', meaning: 'um amigo,', lemma: 'ともだち' },
          { text: 'メールを', meaning: 'mensagem (+ partícula de objeto)' },
          { text: 'くれました。', meaning: 'me mandou', lemma: 'くれる' },
        ],
        translation: 'Um amigo me mandou uma mensagem.',
      },
      {
        words: [
          { text: 'からだが', meaning: 'o corpo, a saúde (+ partícula de sujeito)' },
          { text: 'たいせつだと、', meaning: 'que é importante,', lemma: 'たいせつ' },
          { text: 'わかりました。', meaning: 'entendi', lemma: 'わかる' },
        ],
        translation: 'Entendi que a saúde é importante.',
      },
      {
        words: [
          { text: 'あしたは、', meaning: 'amanhã,', lemma: 'あした' },
          { text: 'きっと', meaning: 'com certeza' },
          { text: 'よく', meaning: 'melhor' },
          { text: 'なります。', meaning: 'vou ficar', lemma: 'なる' },
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
          { text: 'ともだちと', meaning: 'com uma amiga', lemma: 'ともだち' },
          { text: 'ふくを', meaning: 'roupa (+ partícula de objeto)' },
          { text: 'かいに', meaning: 'para comprar', lemma: 'かう' },
          { text: 'いきました。', meaning: 'fui', lemma: 'いく' },
        ],
        translation: 'Hoje, fui comprar roupas com uma amiga.',
      },
      {
        words: [
          { text: 'デパートには、', meaning: 'no shopping,', lemma: 'デパート' },
          { text: 'いろいろな', meaning: 'vários', lemma: 'いろいろ' },
          { text: 'みせが', meaning: 'lojas (+ partícula de sujeito)' },
          { text: 'あります。', meaning: 'há', lemma: 'ある' },
        ],
        translation: 'No shopping, tem várias lojas.',
      },
      {
        words: [
          { text: 'あたらしい', meaning: 'nova' },
          { text: 'スカートを', meaning: 'saia (+ partícula de objeto)' },
          { text: 'みつけました。', meaning: 'encontrei', lemma: 'みつける' },
        ],
        translation: 'Encontrei uma saia nova.',
      },
      {
        words: [
          { text: 'しちゃくしつで、', meaning: 'no provador,', lemma: 'しちゃくしつ' },
          { text: 'きて', meaning: 'vestindo', lemma: 'きる' },
          { text: 'みました。', meaning: 'experimentei', lemma: 'みる' },
        ],
        translation: 'No provador, experimentei vestir.',
      },
      {
        words: [
          { text: 'サイズが', meaning: 'o tamanho (+ partícula de sujeito)' },
          { text: 'ちょうど', meaning: 'justamente' },
          { text: 'よかったです。', meaning: 'estava bom', lemma: 'いい' },
        ],
        translation: 'O tamanho estava certinho.',
      },
      {
        words: [
          { text: 'いろは、', meaning: 'a cor,', lemma: 'いろ' },
          { text: 'あおと', meaning: 'azul e', lemma: 'あお' },
          { text: 'しろが', meaning: 'branco (+ partícula de sujeito)' },
          { text: 'ありました。', meaning: 'tinha', lemma: 'ある' },
        ],
        translation: 'Tinha nas cores azul e branco.',
      },
      {
        words: [
          { text: 'すこし', meaning: 'um pouco' },
          { text: 'なやんで、', meaning: 'fiquei em dúvida, e', lemma: 'なやむ' },
          { text: 'あおいのを', meaning: 'a azul (+ partícula de objeto)', lemma: 'あおい' },
          { text: 'えらびました。', meaning: 'escolhi', lemma: 'えらぶ' },
        ],
        translation: 'Fiquei um pouco em dúvida e escolhi a azul.',
      },
      {
        words: [
          { text: 'レジで、', meaning: 'no caixa,', lemma: 'レジ' },
          { text: 'おかねを', meaning: 'dinheiro (+ partícula de objeto)' },
          { text: 'はらいました。', meaning: 'paguei', lemma: 'はらう' },
        ],
        translation: 'No caixa, paguei.',
      },
      {
        words: [
          { text: 'セールで、', meaning: 'por estar em promoção,', lemma: 'セール' },
          { text: 'やすく', meaning: 'barato', lemma: 'やすい' },
          { text: 'かえました。', meaning: 'consegui comprar', lemma: 'かえる' },
        ],
        translation: 'Estava em promoção e consegui comprar barato.',
      },
      {
        words: [
          { text: 'ともだちも、', meaning: 'minha amiga também,', lemma: 'ともだち' },
          { text: 'くつを', meaning: 'sapato (+ partícula de objeto)' },
          { text: 'かいました。', meaning: 'comprou', lemma: 'かう' },
        ],
        translation: 'Minha amiga também comprou um sapato.',
      },
      {
        words: [
          { text: 'たのしい', meaning: 'divertido' },
          { text: 'かいものの', meaning: 'de compras', lemma: 'かいもの' },
          { text: 'じかんでした。', meaning: 'foi um momento', lemma: 'じかん' },
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
          { text: 'わたしは、', meaning: 'eu,', lemma: 'わたし' },
          { text: 'おんがくが', meaning: 'música (+ partícula de sujeito)' },
          { text: 'だいすきです。', meaning: 'amo', lemma: 'だいすき' },
        ],
        translation: 'Eu amo música.',
      },
      {
        words: [
          { text: 'ちいさい', meaning: 'pequeno' },
          { text: 'ときから、', meaning: 'desde quando era,', lemma: 'とき' },
          { text: 'ピアノを', meaning: 'piano (+ partícula de objeto)' },
          { text: 'ひいています。', meaning: 'toco', lemma: 'ひく' },
        ],
        translation: 'Toco piano desde que era pequeno.',
      },
      {
        words: [
          { text: 'まいにち、', meaning: 'todo dia,' },
          { text: 'いちじかん', meaning: 'uma hora' },
          { text: 'れんしゅうします。', meaning: 'pratico', lemma: 'れんしゅうする' },
        ],
        translation: 'Todo dia, pratico uma hora.',
      },
      {
        words: [
          { text: 'クラシックも', meaning: 'clássico também', lemma: 'クラシック' },
          { text: 'ポップスも', meaning: 'pop também', lemma: 'ポップス' },
          { text: 'すきです。', meaning: 'gosto', lemma: 'すき' },
        ],
        translation: 'Gosto tanto de clássico quanto de pop.',
      },
      {
        words: [
          { text: 'でんしゃの', meaning: 'do trem', lemma: 'でんしゃ' },
          { text: 'なかで、', meaning: 'dentro,', lemma: 'なか' },
          { text: 'おんがくを', meaning: 'música (+ partícula de objeto)' },
          { text: 'ききます。', meaning: 'escuto', lemma: 'きく' },
        ],
        translation: 'Escuto música dentro do trem.',
      },
      {
        words: [
          { text: 'すきな', meaning: 'favorita', lemma: 'すき' },
          { text: 'きょくを', meaning: 'música, canção (+ partícula de objeto)' },
          { text: 'きくと、', meaning: 'quando escuto,', lemma: 'きく' },
          { text: 'げんきに', meaning: 'animado', lemma: 'げんき' },
          { text: 'なります。', meaning: 'fico', lemma: 'なる' },
        ],
        translation: 'Quando escuto minha música favorita, fico animado.',
      },
      {
        words: [
          { text: 'がっこうの', meaning: 'da escola', lemma: 'がっこう' },
          { text: 'コンサートで、', meaning: 'no concerto,', lemma: 'コンサート' },
          { text: 'ひきました。', meaning: 'toquei', lemma: 'ひく' },
        ],
        translation: 'Toquei no concerto da escola.',
      },
      {
        words: [
          { text: 'すこし', meaning: 'um pouco' },
          { text: 'きんちょうしましたが、', meaning: 'fiquei nervoso, mas', lemma: 'きんちょうする' },
          { text: 'うまく', meaning: 'bem', lemma: 'うまい' },
          { text: 'できました。', meaning: 'consegui fazer', lemma: 'できる' },
        ],
        translation: 'Fiquei um pouco nervoso, mas consegui fazer bem.',
      },
      {
        words: [
          { text: 'みんなが、', meaning: 'todos,', lemma: 'みんな' },
          { text: 'はくしゅを', meaning: 'palmas (+ partícula de objeto)' },
          { text: 'して', meaning: 'fazendo', lemma: 'する' },
          { text: 'くれました。', meaning: 'me deram', lemma: 'くれる' },
        ],
        translation: 'Todos me deram palmas.',
      },
      {
        words: [
          { text: 'しょうらい、', meaning: 'no futuro,', lemma: 'しょうらい' },
          { text: 'おんがくの', meaning: 'de música', lemma: 'おんがく' },
          { text: 'しごとを', meaning: 'trabalho (+ partícula de objeto)' },
          { text: 'したいです。', meaning: 'quero fazer', lemma: 'する' },
        ],
        translation: 'No futuro, quero trabalhar com música.',
      },
      {
        words: [
          { text: 'おんがくは、', meaning: 'a música,', lemma: 'おんがく' },
          { text: 'わたしの', meaning: 'minha', lemma: 'わたし' },
          { text: 'じんせいの', meaning: 'de vida', lemma: 'じんせい' },
          { text: 'ぶぶんです。', meaning: 'é parte', lemma: 'ぶぶん' },
        ],
        translation: 'A música é parte da minha vida.',
      },
    ],
  },
  {
    id: 'hajimete-no-happyou',
    title: 'はじめての はっぴょう',
    level: 1,
    wordCount: 49,
    summaryPt: 'Um dia de apresentação de japonês contado pelos sentimentos: do nervoso ao alívio, com onomatopeias.',
    lines: [
      {
        words: [
          { text: 'きょうは', meaning: 'hoje (+ partícula de tópico)' },
          { text: 'にほんごの', meaning: 'de japonês', lemma: 'にほんご' },
          { text: 'はっぴょうの', meaning: 'da apresentação', lemma: 'はっぴょう' },
          { text: 'ひです。', meaning: 'é o dia', lemma: 'ひ' },
        ],
        translation: 'Hoje é o dia da apresentação de japonês.',
      },
      {
        words: [
          { text: 'あさから', meaning: 'desde a manhã', lemma: 'あさ' },
          { text: 'どきどき', meaning: 'com o coração acelerado, nervosa' },
          { text: 'しています。', meaning: 'estou (する + ています)', lemma: 'する' },
        ],
        translation: 'Desde a manhã, estou nervosa.',
      },
      {
        words: [
          { text: 'でも、', meaning: 'mas' },
          { text: 'でんしゃが', meaning: 'o trem (+ partícula de sujeito)', lemma: 'でんしゃ' },
          { text: 'きませんでした。', meaning: 'não veio', lemma: 'くる' },
        ],
        translation: 'Mas o trem não veio.',
      },
      {
        words: [
          { text: 'わたしは', meaning: 'eu (+ partícula de tópico)', lemma: 'わたし' },
          { text: 'いらいら', meaning: 'impaciente, irritada' },
          { text: 'しました。', meaning: 'fiquei (する no passado)', lemma: 'する' },
        ],
        translation: 'Fiquei irritada.',
      },
      {
        words: [
          { text: 'がっこうに', meaning: 'à escola', lemma: 'がっこう' },
          { text: 'つきました。', meaning: 'cheguei', lemma: 'つく' },
        ],
        translation: 'Cheguei à escola.',
      },
      {
        words: [
          { text: 'まだ', meaning: 'ainda' },
          { text: 'じかんが', meaning: 'tempo (+ partícula de sujeito)', lemma: 'じかん' },
          { text: 'ありました。', meaning: 'havia', lemma: 'ある' },
        ],
        translation: 'Ainda havia tempo.',
      },
      {
        words: [
          { text: 'ほっと', meaning: 'aliviada (っと: um instante)' },
          { text: 'しました。', meaning: 'fiquei (する no passado)', lemma: 'する' },
        ],
        translation: 'Fiquei aliviada.',
      },
      {
        words: [
          { text: 'はっぴょうの', meaning: 'da apresentação', lemma: 'はっぴょう' },
          { text: 'まえは', meaning: 'antes (+ partícula de tópico)', lemma: 'まえ' },
          { text: 'むねが', meaning: 'o peito (+ partícula de sujeito)', lemma: 'むね' },
          { text: 'どきどき', meaning: 'batendo forte' },
          { text: 'しました。', meaning: 'ficou (する no passado)', lemma: 'する' },
        ],
        translation: 'Antes da apresentação, meu peito batia forte.',
      },
      {
        words: [
          { text: 'でも、', meaning: 'mas' },
          { text: 'みんな', meaning: 'todos' },
          { text: 'にこにこ', meaning: 'sorrindo' },
          { text: 'していました。', meaning: 'estavam (する + ていました)', lemma: 'する' },
        ],
        translation: 'Mas todos estavam sorrindo.',
      },
      {
        words: [
          { text: 'はっぴょうが', meaning: 'a apresentação (+ partícula de sujeito)', lemma: 'はっぴょう' },
          { text: 'おわりました。', meaning: 'terminou', lemma: 'おわる' },
        ],
        translation: 'A apresentação terminou.',
      },
      {
        words: [
          { text: 'せんせいが', meaning: 'a professora (+ partícula de sujeito)', lemma: 'せんせい' },
          { text: '「ぺらぺらですね」と', meaning: '"é fluente, hein" (+ と, de citação)', lemma: 'ぺらぺら' },
          { text: 'いいました。', meaning: 'disse', lemma: 'いう' },
        ],
        translation: 'A professora disse: "Você é fluente, hein!"',
      },
      {
        words: [
          { text: 'びっくり', meaning: 'surpresa' },
          { text: 'しました。', meaning: 'fiquei (する no passado)', lemma: 'する' },
        ],
        translation: 'Fiquei surpresa.',
      },
      {
        words: [
          { text: 'わたしは', meaning: 'eu (+ partícula de tópico)', lemma: 'わたし' },
          { text: '「いいえ、', meaning: '"não,' },
          { text: 'まだまだです」と', meaning: 'ainda tenho muito a aprender" (+ と, de citação)', lemma: 'まだまだ' },
          { text: 'いいました。', meaning: 'disse', lemma: 'いう' },
        ],
        translation: 'Eu disse: "Que nada, ainda tenho muito a aprender."',
      },
      {
        words: [
          { text: 'そのあと、', meaning: 'depois disso' },
          { text: 'おなかが', meaning: 'a barriga (+ partícula de sujeito)', lemma: 'おなか' },
          { text: 'ぺこぺこでした。', meaning: 'estava morrendo de fome', lemma: 'ぺこぺこ' },
        ],
        translation: 'Depois disso, eu estava morrendo de fome.',
      },
      {
        words: [
          { text: 'ともだちと', meaning: 'com uma amiga', lemma: 'ともだち' },
          { text: 'ラーメンを', meaning: 'lámen (+ partícula de objeto)', lemma: 'ラーメン' },
          { text: 'たべました。', meaning: 'comi', lemma: 'たべる' },
        ],
        translation: 'Comi lámen com uma amiga.',
      },
      {
        words: [
          { text: 'よるは', meaning: 'à noite (+ partícula de tópico)', lemma: 'よる' },
          { text: 'ぐっすり', meaning: 'profundamente' },
          { text: 'ねました。', meaning: 'dormi', lemma: 'ねる' },
        ],
        translation: 'À noite, dormi profundamente.',
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
          { text: '今日は', reading: 'きょうは', meaning: 'hoje (+ partícula de tópico)', lemma: '今日', lemmaReading: 'きょう' },
          { text: '天気が', reading: 'てんきが', meaning: 'o tempo/clima (+ partícula de sujeito)' },
          { text: 'いいです。', meaning: 'está bom', lemma: 'いい' },
        ],
        translation: 'Hoje o tempo está bom.',
      },
      {
        words: [
          { text: '私は', reading: 'わたしは', meaning: 'eu (+ partícula de tópico)', lemma: '私', lemmaReading: 'わたし' },
          { text: '公園へ', reading: 'こうえんへ', meaning: 'para o parque', lemma: '公園', lemmaReading: 'こうえん' },
          { text: '行きました。', reading: 'いきました。', meaning: 'fui', lemma: '行く', lemmaReading: 'いく' },
        ],
        translation: 'Eu fui ao parque.',
      },
      {
        words: [
          { text: '公園には', reading: 'こうえんには', meaning: 'no parque', lemma: '公園', lemmaReading: 'こうえん' },
          { text: '花が', reading: 'はなが', meaning: 'flor (+ partícula de sujeito)' },
          { text: 'たくさん', meaning: 'muitas, bastante' },
          { text: 'さいていました。', meaning: 'estavam desabrochando', lemma: 'さく' },
        ],
        translation: 'No parque, havia muitas flores desabrochando.',
      },
      {
        words: [
          { text: '川の', reading: 'かわの', meaning: 'do rio', lemma: '川', lemmaReading: 'かわ' },
          { text: '近くを', reading: 'ちかくを', meaning: 'as proximidades (+ partícula de trajeto)', lemma: '近く', lemmaReading: 'ちかく' },
          { text: '歩きました。', reading: 'あるきました。', meaning: 'caminhei', lemma: '歩く', lemmaReading: 'あるく' },
        ],
        translation: 'Caminhei perto do rio.',
      },
      {
        words: [
          { text: '小さい', reading: 'ちいさい', meaning: 'pequeno' },
          { text: '子供たちが', reading: 'こどもたちが', meaning: 'as crianças (+ partícula de sujeito)', lemma: '子供', lemmaReading: 'こども' },
          { text: '走っていました。', reading: 'はしっていました。', meaning: 'estavam correndo', lemma: '走る', lemmaReading: 'はしる' },
        ],
        translation: 'Crianças pequenas estavam correndo.',
      },
      {
        words: [
          { text: '私も', reading: 'わたしも', meaning: 'eu também', lemma: '私', lemmaReading: 'わたし' },
          { text: '少し', reading: 'すこし', meaning: 'um pouco' },
          { text: '走りました。', reading: 'はしりました。', meaning: 'corri', lemma: '走る', lemmaReading: 'はしる' },
        ],
        translation: 'Eu também corri um pouco.',
      },
      {
        words: [
          { text: 'とても', meaning: 'muito' },
          { text: '楽しかったです。', reading: 'たのしかったです。', meaning: 'foi divertido', lemma: '楽しい', lemmaReading: 'たのしい' },
        ],
        translation: 'Foi muito divertido.',
      },
      {
        words: [
          { text: '来週も', reading: 'らいしゅうも', meaning: 'semana que vem também', lemma: '来週', lemmaReading: 'らいしゅう' },
          { text: 'また', meaning: 'de novo' },
          { text: '行きたいです。', reading: 'いきたいです。', meaning: 'quero ir', lemma: '行く', lemmaReading: 'いく' },
        ],
        translation: 'Quero ir de novo semana que vem também.',
      },
      {
        words: [
          { text: '公園の', reading: 'こうえんの', meaning: 'do parque', lemma: '公園', lemmaReading: 'こうえん' },
          { text: '近くで、', reading: 'ちかくで、', meaning: 'perto,', lemma: '近く', lemmaReading: 'ちかく' },
          { text: 'アイスクリームを', meaning: 'sorvete (+ partícula de objeto)' },
          { text: '買いました。', reading: 'かいました。', meaning: 'comprei', lemma: '買う', lemmaReading: 'かう' },
        ],
        translation: 'Perto do parque, comprei um sorvete.',
      },
      {
        words: [
          { text: 'ベンチに', meaning: 'no banco', lemma: 'ベンチ' },
          { text: '座って、', reading: 'すわって、', meaning: 'sentei, e', lemma: '座る', lemmaReading: 'すわる' },
          { text: '少し', reading: 'すこし', meaning: 'um pouco' },
          { text: '休みました。', reading: 'やすみました。', meaning: 'descansei', lemma: '休む', lemmaReading: 'やすむ' },
        ],
        translation: 'Sentei no banco e descansei um pouco.',
      },
      {
        words: [
          { text: '鳥に', reading: 'とりに', meaning: 'para os pássaros', lemma: '鳥', lemmaReading: 'とり' },
          { text: 'パンを', meaning: 'pão (+ partícula de objeto)' },
          { text: 'あげている', meaning: 'dando', lemma: 'あげる' },
          { text: '人も', reading: 'ひとも', meaning: 'pessoas também', lemma: '人', lemmaReading: 'ひと' },
          { text: 'いました。', meaning: 'havia', lemma: 'いる' },
        ],
        translation: 'Também tinha gente dando pão para os pássaros.',
      },
      {
        words: [
          { text: '今度は、', reading: 'こんどは、', meaning: 'da próxima vez,', lemma: '今度', lemmaReading: 'こんど' },
          { text: '友達も', reading: 'ともだちも', meaning: 'amigos também', lemma: '友達', lemmaReading: 'ともだち' },
          { text: '誘いたいです。', reading: 'さそいたいです。', meaning: 'quero convidar', lemma: '誘う', lemmaReading: 'さそう' },
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
          { text: '田中さん、', reading: 'たなかさん、', meaning: 'Tanaka (+ sufixo honorífico),', lemma: '田中', lemmaReading: 'たなか' },
          { text: 'お元気ですか。', reading: 'おげんきですか。', meaning: 'como vai?', lemma: '元気', lemmaReading: 'げんき' },
        ],
        translation: 'Tanaka, como vai você?',
      },
      {
        words: [
          { text: '私は', reading: 'わたしは', meaning: 'eu', lemma: '私', lemmaReading: 'わたし' },
          { text: '元気です。', reading: 'げんきです。', meaning: 'estou bem', lemma: '元気', lemmaReading: 'げんき' },
        ],
        translation: 'Eu estou bem.',
      },
      {
        words: [
          { text: '今、', reading: 'いま、', meaning: 'agora,' },
          { text: '新しい', reading: 'あたらしい', meaning: 'novo' },
          { text: '会社で', reading: 'かいしゃで', meaning: 'numa empresa', lemma: '会社', lemmaReading: 'かいしゃ' },
          { text: '働いています。', reading: 'はたらいています。', meaning: 'estou trabalhando', lemma: '働く', lemmaReading: 'はたらく' },
        ],
        translation: 'Agora estou trabalhando numa empresa nova.',
      },
      {
        words: [
          { text: '仕事は', reading: 'しごとは', meaning: 'o trabalho', lemma: '仕事', lemmaReading: 'しごと' },
          { text: '大変ですが、', reading: 'たいへんですが、', meaning: 'é puxado, mas', lemma: '大変', lemmaReading: 'たいへん' },
          { text: '楽しいです。', reading: 'たのしいです。', meaning: 'é divertido', lemma: '楽しい', lemmaReading: 'たのしい' },
        ],
        translation: 'O trabalho é puxado, mas é divertido.',
      },
      {
        words: [
          { text: '会社の', reading: 'かいしゃの', meaning: 'da empresa', lemma: '会社', lemmaReading: 'かいしゃ' },
          { text: '人たちは', reading: 'ひとたちは', meaning: 'as pessoas', lemma: '人たち', lemmaReading: 'ひとたち' },
          { text: 'とても', meaning: 'muito' },
          { text: '親切です。', reading: 'しんせつです。', meaning: 'são gentis', lemma: '親切', lemmaReading: 'しんせつ' },
        ],
        translation: 'As pessoas da empresa são muito gentis.',
      },
      {
        words: [
          { text: '来月、', reading: 'らいげつ、', meaning: 'mês que vem,' },
          { text: '日本へ', reading: 'にほんへ', meaning: 'para o Japão', lemma: '日本', lemmaReading: 'にほん' },
          { text: '行きます。', reading: 'いきます。', meaning: 'vou', lemma: '行く', lemmaReading: 'いく' },
        ],
        translation: 'Mês que vem, vou ao Japão.',
      },
      {
        words: [
          { text: 'その時、', reading: 'そのとき、', meaning: 'nessa hora,', lemma: 'その時', lemmaReading: 'そのとき' },
          { text: '一緒に', reading: 'いっしょに', meaning: 'juntos', lemma: '一緒に', lemmaReading: 'いっしょに' },
          { text: '会いましょう。', reading: 'あいましょう。', meaning: 'vamos nos encontrar', lemma: '会う', lemmaReading: 'あう' },
        ],
        translation: 'Nessa hora, vamos nos encontrar.',
      },
      {
        words: [
          { text: '返事を', reading: 'へんじを', meaning: 'a resposta (+ partícula de objeto)' },
          { text: '待っています。', reading: 'まっています。', meaning: 'estou esperando', lemma: '待つ', lemmaReading: 'まつ' },
        ],
        translation: 'Estou esperando sua resposta.',
      },
      {
        words: [
          { text: '最近、', reading: 'さいきん、', meaning: 'recentemente,' },
          { text: '料理も', reading: 'りょうりも', meaning: 'culinária também', lemma: '料理', lemmaReading: 'りょうり' },
          { text: '始めました。', reading: 'はじめました。', meaning: 'comecei', lemma: '始める', lemmaReading: 'はじめる' },
        ],
        translation: 'Recentemente, também comecei a cozinhar.',
      },
      {
        words: [
          { text: 'まだ', meaning: 'ainda' },
          { text: '上手じゃないですが、', reading: 'じょうずじゃないですが、', meaning: 'não sou bom nisso ainda, mas', lemma: '上手', lemmaReading: 'じょうず' },
          { text: '楽しいです。', reading: 'たのしいです。', meaning: 'é divertido', lemma: '楽しい', lemmaReading: 'たのしい' },
        ],
        translation: 'Ainda não sou bom nisso, mas é divertido.',
      },
      {
        words: [
          { text: '日本に', reading: 'にほんに', meaning: 'no Japão', lemma: '日本', lemmaReading: 'にほん' },
          { text: '着いたら、', reading: 'ついたら、', meaning: 'quando chegar,', lemma: '着く', lemmaReading: 'つく' },
          { text: '一緒に', reading: 'いっしょに', meaning: 'juntos', lemma: '一緒に', lemmaReading: 'いっしょに' },
          { text: '料理しましょう。', reading: 'りょうりしましょう。', meaning: 'vamos cozinhar', lemma: '料理する', lemmaReading: 'りょうりする' },
        ],
        translation: 'Quando eu chegar no Japão, vamos cozinhar juntos.',
      },
      {
        words: [
          { text: 'それでは、', meaning: 'bem, então,' },
          { text: '体に', reading: 'からだに', meaning: 'com o corpo, a saúde', lemma: '体', lemmaReading: 'からだ' },
          { text: '気をつけて。', reading: 'きをつけて。', meaning: 'se cuide', lemma: '気をつける', lemmaReading: 'きをつける' },
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
          { text: '今朝から', reading: 'けさから', meaning: 'desde esta manhã', lemma: '今朝', lemmaReading: 'けさ' },
          { text: '雨が', reading: 'あめが', meaning: 'chuva (+ partícula de sujeito)' },
          { text: '降っています。', reading: 'ふっています。', meaning: 'está chovendo', lemma: '降る', lemmaReading: 'ふる' },
        ],
        translation: 'Está chovendo desde esta manhã.',
      },
      {
        words: [
          { text: '空は', reading: 'そらは', meaning: 'o céu', lemma: '空', lemmaReading: 'そら' },
          { text: '暗くて、', reading: 'くらくて、', meaning: 'está escuro, e', lemma: '暗い', lemmaReading: 'くらい' },
          { text: '風も', reading: 'かぜも', meaning: 'o vento também', lemma: '風', lemmaReading: 'かぜ' },
          { text: '強いです。', reading: 'つよいです。', meaning: 'está forte', lemma: '強い', lemmaReading: 'つよい' },
        ],
        translation: 'O céu está escuro, e o vento também está forte.',
      },
      {
        words: [
          { text: '傘を', reading: 'かさを', meaning: 'guarda-chuva (+ partícula de objeto)' },
          { text: '持って、', reading: 'もって、', meaning: 'levando, e', lemma: '持つ', lemmaReading: 'もつ' },
          { text: '駅まで', reading: 'えきまで', meaning: 'até a estação', lemma: '駅', lemmaReading: 'えき' },
          { text: '歩きました。', reading: 'あるきました。', meaning: 'caminhei', lemma: '歩く', lemmaReading: 'あるく' },
        ],
        translation: 'Levei um guarda-chuva e caminhei até a estação.',
      },
      {
        words: [
          { text: '電車は', reading: 'でんしゃは', meaning: 'o trem', lemma: '電車', lemmaReading: 'でんしゃ' },
          { text: 'いつもより', meaning: 'mais que o normal', lemma: 'いつも' },
          { text: '混んでいました。', reading: 'こんでいました。', meaning: 'estava lotado', lemma: '混む', lemmaReading: 'こむ' },
        ],
        translation: 'O trem estava mais lotado que o normal.',
      },
      {
        words: [
          { text: '会社に', reading: 'かいしゃに', meaning: 'na empresa', lemma: '会社', lemmaReading: 'かいしゃ' },
          { text: '着いた時、', reading: 'ついたとき、', meaning: 'quando cheguei,', lemma: '着く', lemmaReading: 'つく' },
          { text: '服が', reading: 'ふくが', meaning: 'as roupas', lemma: '服', lemmaReading: 'ふく' },
          { text: '少し', reading: 'すこし', meaning: 'um pouco' },
          { text: '濡れていました。', reading: 'ぬれていました。', meaning: 'estavam molhadas', lemma: '濡れる', lemmaReading: 'ぬれる' },
        ],
        translation: 'Quando cheguei à empresa, minhas roupas estavam um pouco molhadas.',
      },
      {
        words: [
          { text: '雨の日は', reading: 'あめのひは', meaning: 'dias chuvosos', lemma: '雨の日', lemmaReading: 'あめのひ' },
          { text: 'あまり', meaning: 'não muito (+ negativo)' },
          { text: '好きじゃありません。', reading: 'すきじゃありません。', meaning: 'não gosto', lemma: '好き', lemmaReading: 'すき' },
        ],
        translation: 'Não gosto muito de dias chuvosos.',
      },
      {
        words: [
          { text: 'でも、', meaning: 'mas,' },
          { text: '雨の', reading: 'あめの', meaning: 'da chuva', lemma: '雨', lemmaReading: 'あめ' },
          { text: '音を', reading: 'おとを', meaning: 'o som (+ partícula de objeto)' },
          { text: '聞くのは', reading: 'きくのは', meaning: 'ouvir (é)', lemma: '聞く', lemmaReading: 'きく' },
          { text: '好きです。', reading: 'すきです。', meaning: 'eu gosto', lemma: '好き', lemmaReading: 'すき' },
        ],
        translation: 'Mas gosto de ouvir o som da chuva.',
      },
      {
        words: [
          { text: '明日は', reading: 'あしたは', meaning: 'amanhã', lemma: '明日', lemmaReading: 'あした' },
          { text: '晴れると', reading: 'はれると', meaning: 'se ficar ensolarado', lemma: '晴れる', lemmaReading: 'はれる' },
          { text: 'いいですね。', meaning: 'seria bom, né', lemma: 'いい' },
        ],
        translation: 'Seria bom se amanhã fizesse sol, né.',
      },
      {
        words: [
          { text: '会社では、', reading: 'かいしゃでは、', meaning: 'na empresa,', lemma: '会社', lemmaReading: 'かいしゃ' },
          { text: '濡れた', reading: 'ぬれた', meaning: 'molhadas', lemma: '濡れる', lemmaReading: 'ぬれる' },
          { text: '服を', reading: 'ふくを', meaning: 'roupas (+ partícula de objeto)' },
          { text: '拭きました。', reading: 'ふきました。', meaning: 'sequei', lemma: '拭く', lemmaReading: 'ふく' },
        ],
        translation: 'Na empresa, sequei as roupas molhadas.',
      },
      {
        words: [
          { text: '同僚も', reading: 'どうりょうも', meaning: 'os colegas também', lemma: '同僚', lemmaReading: 'どうりょう' },
          { text: 'みんな、', meaning: 'todos,' },
          { text: '傘を', reading: 'かさを', meaning: 'guarda-chuva (+ partícula de objeto)' },
          { text: '持っていました。', reading: 'もっていました。', meaning: 'estavam com', lemma: '持つ', lemmaReading: 'もつ' },
        ],
        translation: 'Os colegas também estavam todos com guarda-chuva.',
      },
      {
        words: [
          { text: '雨の', reading: 'あめの', meaning: 'de chuva', lemma: '雨', lemmaReading: 'あめ' },
          { text: '日は、', reading: 'ひは、', meaning: 'nos dias,', lemma: '日', lemmaReading: 'ひ' },
          { text: '電車が', reading: 'でんしゃが', meaning: 'o trem (+ partícula de sujeito)' },
          { text: 'いつも', meaning: 'sempre' },
          { text: '遅れます。', reading: 'おくれます。', meaning: 'atrasa', lemma: '遅れる', lemmaReading: 'おくれる' },
        ],
        translation: 'Em dias de chuva, o trem sempre atrasa.',
      },
      {
        words: [
          { text: '早く', reading: 'はやく', meaning: 'logo', lemma: '早い', lemmaReading: 'はやい' },
          { text: '晴れの日に', reading: 'はれのひに', meaning: 'num dia de sol', lemma: '晴れの日', lemmaReading: 'はれのひ' },
          { text: 'なってほしいです。', meaning: 'quero que fique', lemma: 'なる' },
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
          { text: '京都へ', reading: 'きょうとへ', meaning: 'para Kyoto', lemma: '京都', lemmaReading: 'きょうと' },
          { text: '旅行に', reading: 'りょこうに', meaning: 'em viagem', lemma: '旅行', lemmaReading: 'りょこう' },
          { text: '行きました。', reading: 'いきました。', meaning: 'fui', lemma: '行く', lemmaReading: 'いく' },
        ],
        translation: 'Semana passada, fiz uma viagem a Kyoto.',
      },
      {
        words: [
          { text: '新幹線で', reading: 'しんかんせんで', meaning: 'de trem-bala', lemma: '新幹線', lemmaReading: 'しんかんせん' },
          { text: '二時間ぐらい', reading: 'にじかんぐらい', meaning: 'cerca de duas horas', lemma: '二時間', lemmaReading: 'にじかん' },
          { text: 'かかりました。', meaning: 'levou (tempo)', lemma: 'かかる' },
        ],
        translation: 'Levou cerca de duas horas de trem-bala.',
      },
      {
        words: [
          { text: '古い', reading: 'ふるい', meaning: 'antigos' },
          { text: 'お寺を', reading: 'おてらを', meaning: 'templos (+ partícula de objeto)' },
          { text: 'たくさん', meaning: 'muitos' },
          { text: '見ました。', reading: 'みました。', meaning: 'vi', lemma: '見る', lemmaReading: 'みる' },
        ],
        translation: 'Vi muitos templos antigos.',
      },
      {
        words: [
          { text: '有名な', reading: 'ゆうめいな', meaning: 'famoso', lemma: '有名', lemmaReading: 'ゆうめい' },
          { text: '神社にも', reading: 'じんじゃにも', meaning: 'ao santuário também', lemma: '神社', lemmaReading: 'じんじゃ' },
          { text: '行きました。', reading: 'いきました。', meaning: 'fui', lemma: '行く', lemmaReading: 'いく' },
        ],
        translation: 'Também fui a um santuário famoso.',
      },
      {
        words: [
          { text: 'お土産に', reading: 'おみやげに', meaning: 'como lembrancinha', lemma: 'お土産', lemmaReading: 'おみやげ' },
          { text: '抹茶のお菓子を', reading: 'まっちゃのおかしを', meaning: 'doce de chá verde (+ partícula de objeto)', lemma: '抹茶のお菓子', lemmaReading: 'まっちゃのおかし' },
          { text: '買いました。', reading: 'かいました。', meaning: 'comprei', lemma: '買う', lemmaReading: 'かう' },
        ],
        translation: 'Comprei doces de chá verde como lembrancinha.',
      },
      {
        words: [
          { text: '夜は', reading: 'よるは', meaning: 'à noite', lemma: '夜', lemmaReading: 'よる' },
          { text: '京都の', reading: 'きょうとの', meaning: 'de Kyoto', lemma: '京都', lemmaReading: 'きょうと' },
          { text: '料理を', reading: 'りょうりを', meaning: 'a culinária (+ partícula de objeto)' },
          { text: '食べました。', reading: 'たべました。', meaning: 'comi', lemma: '食べる', lemmaReading: 'たべる' },
        ],
        translation: 'À noite, comi a culinária de Kyoto.',
      },
      {
        words: [
          { text: 'とても', meaning: 'muito' },
          { text: '静かで、', reading: 'しずかで、', meaning: 'era tranquilo, e', lemma: '静か', lemmaReading: 'しずか' },
          { text: 'きれいな', meaning: 'bonita', lemma: 'きれい' },
          { text: '町でした。', reading: 'まちでした。', meaning: 'era uma cidade', lemma: '町', lemmaReading: 'まち' },
        ],
        translation: 'Era uma cidade muito tranquila e bonita.',
      },
      {
        words: [
          { text: 'また', meaning: 'de novo' },
          { text: '京都へ', reading: 'きょうとへ', meaning: 'para Kyoto', lemma: '京都', lemmaReading: 'きょうと' },
          { text: '行きたいです。', reading: 'いきたいです。', meaning: 'quero ir', lemma: '行く', lemmaReading: 'いく' },
        ],
        translation: 'Quero ir a Kyoto de novo.',
      },
      {
        words: [
          { text: 'バスで、', meaning: 'de ônibus,', lemma: 'バス' },
          { text: '色々な', reading: 'いろいろな', meaning: 'vários', lemma: '色々', lemmaReading: 'いろいろ' },
          { text: 'お寺を', reading: 'おてらを', meaning: 'templos (+ partícula de objeto)' },
          { text: '回りました。', reading: 'まわりました。', meaning: 'visitei', lemma: '回る', lemmaReading: 'まわる' },
        ],
        translation: 'De ônibus, visitei vários templos.',
      },
      {
        words: [
          { text: '竹林を', reading: 'ちくりんを', meaning: 'floresta de bambu (+ partícula de objeto)' },
          { text: '歩いた時、', reading: 'あるいたとき、', meaning: 'quando caminhei,', lemma: '歩く', lemmaReading: 'あるく' },
          { text: 'とても', meaning: 'muito' },
          { text: '静かでした。', reading: 'しずかでした。', meaning: 'estava silencioso', lemma: '静か', lemmaReading: 'しずか' },
        ],
        translation: 'Quando caminhei pela floresta de bambu, estava muito silencioso.',
      },
      {
        words: [
          { text: '着物を', reading: 'きものを', meaning: 'quimono (+ partícula de objeto)' },
          { text: '着て、', reading: 'きて、', meaning: 'vestindo, e', lemma: '着る', lemmaReading: 'きる' },
          { text: '写真も', reading: 'しゃしんも', meaning: 'fotos também', lemma: '写真', lemmaReading: 'しゃしん' },
          { text: '撮りました。', reading: 'とりました。', meaning: 'tirei', lemma: '撮る', lemmaReading: 'とる' },
        ],
        translation: 'Vesti um quimono e também tirei fotos.',
      },
      {
        words: [
          { text: '京都の', reading: 'きょうとの', meaning: 'de Kyoto', lemma: '京都', lemmaReading: 'きょうと' },
          { text: '旅は、', reading: 'たびは、', meaning: 'a viagem,', lemma: '旅', lemmaReading: 'たび' },
          { text: '忘れられない', reading: 'わすれられない', meaning: 'inesquecível', lemma: '忘れる', lemmaReading: 'わすれる' },
          { text: '思い出に', reading: 'おもいでに', meaning: 'em lembrança', lemma: '思い出', lemmaReading: 'おもいで' },
          { text: 'なりました。', meaning: 'virou', lemma: 'なる' },
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
          { text: '今日は', reading: 'きょうは', meaning: 'hoje', lemma: '今日', lemmaReading: 'きょう' },
          { text: '妹の', reading: 'いもうとの', meaning: 'da minha irmã mais nova', lemma: '妹', lemmaReading: 'いもうと' },
          { text: '誕生日です。', reading: 'たんじょうびです。', meaning: 'é aniversário', lemma: '誕生日', lemmaReading: 'たんじょうび' },
        ],
        translation: 'Hoje é o aniversário da minha irmã mais nova.',
      },
      {
        words: [
          { text: '家族と', reading: 'かぞくと', meaning: 'com a família', lemma: '家族', lemmaReading: 'かぞく' },
          { text: '一緒に', reading: 'いっしょに', meaning: 'juntos', lemma: '一緒に', lemmaReading: 'いっしょに' },
          { text: 'パーティーを', meaning: 'a festa (+ partícula de objeto)' },
          { text: 'しました。', meaning: 'fizemos', lemma: 'する' },
        ],
        translation: 'Fizemos uma festa junto com a família.',
      },
      {
        words: [
          { text: '大きい', reading: 'おおきい', meaning: 'grande' },
          { text: 'ケーキを', meaning: 'bolo (+ partícula de objeto)' },
          { text: '買いました。', reading: 'かいました。', meaning: 'compramos', lemma: '買う', lemmaReading: 'かう' },
        ],
        translation: 'Compramos um bolo grande.',
      },
      {
        words: [
          { text: 'みんなで', meaning: 'todos juntos', lemma: 'みんな' },
          { text: '歌を', reading: 'うたを', meaning: 'música (+ partícula de objeto)' },
          { text: '歌いました。', reading: 'うたいました。', meaning: 'cantamos', lemma: '歌う', lemmaReading: 'うたう' },
        ],
        translation: 'Todos juntos, cantamos uma música.',
      },
      {
        words: [
          { text: '妹は', reading: 'いもうとは', meaning: 'minha irmã mais nova', lemma: '妹', lemmaReading: 'いもうと' },
          { text: 'とても', meaning: 'muito' },
          { text: '嬉しそうでした。', reading: 'うれしそうでした。', meaning: 'parecia feliz', lemma: '嬉しい', lemmaReading: 'うれしい' },
        ],
        translation: 'Minha irmã mais nova parecia muito feliz.',
      },
      {
        words: [
          { text: 'プレゼントは', meaning: 'o presente', lemma: 'プレゼント' },
          { text: '新しい', reading: 'あたらしい', meaning: 'novo' },
          { text: '靴でした。', reading: 'くつでした。', meaning: 'era um sapato', lemma: '靴', lemmaReading: 'くつ' },
        ],
        translation: 'O presente foi um par de sapatos novo.',
      },
      {
        words: [
          { text: '楽しい', reading: 'たのしい', meaning: 'divertido' },
          { text: '一日でした。', reading: 'いちにちでした。', meaning: 'foi um dia', lemma: '一日', lemmaReading: 'いちにち' },
        ],
        translation: 'Foi um dia divertido.',
      },
      {
        words: [
          { text: '妹は、', reading: 'いもうとは、', meaning: 'minha irmã mais nova,', lemma: '妹', lemmaReading: 'いもうと' },
          { text: 'プレゼントを', meaning: 'presente (+ partícula de objeto)' },
          { text: '見て', reading: 'みて', meaning: 'vendo', lemma: '見る', lemmaReading: 'みる' },
          { text: 'とても', meaning: 'muito' },
          { text: '喜びました。', reading: 'よろこびました。', meaning: 'ficou feliz', lemma: '喜ぶ', lemmaReading: 'よろこぶ' },
        ],
        translation: 'Minha irmã mais nova ficou muito feliz ao ver o presente.',
      },
      {
        words: [
          { text: '写真も', reading: 'しゃしんも', meaning: 'fotos também', lemma: '写真', lemmaReading: 'しゃしん' },
          { text: 'たくさん', meaning: 'muitas' },
          { text: '撮りました。', reading: 'とりました。', meaning: 'tiramos', lemma: '撮る', lemmaReading: 'とる' },
        ],
        translation: 'Também tiramos muitas fotos.',
      },
      {
        words: [
          { text: '片付けは', reading: 'かたづけは', meaning: 'arrumar depois', lemma: '片付け', lemmaReading: 'かたづけ' },
          { text: '大変でしたが、', reading: 'たいへんでしたが、', meaning: 'foi trabalhoso, mas', lemma: '大変', lemmaReading: 'たいへん' },
          { text: 'いい', meaning: 'bom' },
          { text: '一日でした。', reading: 'いちにちでした。', meaning: 'foi um dia', lemma: '一日', lemmaReading: 'いちにち' },
        ],
        translation: 'Arrumar depois foi trabalhoso, mas foi um bom dia.',
      },
      {
        words: [
          { text: '来年も、', reading: 'らいねんも、', meaning: 'ano que vem também,', lemma: '来年', lemmaReading: 'らいねん' },
          { text: '家族で', reading: 'かぞくで', meaning: 'em família', lemma: '家族', lemmaReading: 'かぞく' },
          { text: 'お祝いしたいです。', reading: 'おいわいしたいです。', meaning: 'quero comemorar', lemma: 'お祝いする', lemmaReading: 'おいわいする' },
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
          { text: '母に', reading: 'ははに', meaning: 'com/da minha mãe', lemma: '母', lemmaReading: 'はは' },
          { text: '日本の', reading: 'にほんの', meaning: 'japonesa', lemma: '日本', lemmaReading: 'にほん' },
          { text: '料理を', reading: 'りょうりを', meaning: 'culinária (+ partícula de objeto)' },
          { text: '習いました。', reading: 'ならいました。', meaning: 'aprendi', lemma: '習う', lemmaReading: 'ならう' },
        ],
        translation: 'Aprendi culinária japonesa com minha mãe.',
      },
      {
        words: [
          { text: '今日は', reading: 'きょうは', meaning: 'hoje', lemma: '今日', lemmaReading: 'きょう' },
          { text: '味噌汁を', reading: 'みそしるを', meaning: 'sopa de missô (+ partícula de objeto)' },
          { text: '作りました。', reading: 'つくりました。', meaning: 'fiz', lemma: '作る', lemmaReading: 'つくる' },
        ],
        translation: 'Hoje fiz sopa de missô.',
      },
      {
        words: [
          { text: 'まず、', meaning: 'primeiro,' },
          { text: '野菜を', reading: 'やさいを', meaning: 'verduras (+ partícula de objeto)' },
          { text: '小さく', reading: 'ちいさく', meaning: 'pequeno', lemma: '小さい', lemmaReading: 'ちいさい' },
          { text: '切りました。', reading: 'きりました。', meaning: 'cortei', lemma: '切る', lemmaReading: 'きる' },
        ],
        translation: 'Primeiro, cortei os legumes em pedaços pequenos.',
      },
      {
        words: [
          { text: 'それから、', meaning: 'depois disso,' },
          { text: 'お湯で', reading: 'おゆで', meaning: 'com água quente', lemma: 'お湯', lemmaReading: 'おゆ' },
          { text: '野菜を', reading: 'やさいを', meaning: 'verduras (+ partícula de objeto)' },
          { text: '煮ました。', reading: 'にました。', meaning: 'cozinhei', lemma: '煮る', lemmaReading: 'にる' },
        ],
        translation: 'Depois, cozinhei os legumes em água quente.',
      },
      {
        words: [
          { text: '最後に', reading: 'さいごに', meaning: 'por último', lemma: '最後', lemmaReading: 'さいご' },
          { text: '味噌を', reading: 'みそを', meaning: 'missô (+ partícula de objeto)' },
          { text: '入れました。', reading: 'いれました。', meaning: 'coloquei', lemma: '入れる', lemmaReading: 'いれる' },
        ],
        translation: 'Por último, coloquei o missô.',
      },
      {
        words: [
          { text: '少し', reading: 'すこし', meaning: 'um pouco' },
          { text: '難しかったですが、', reading: 'むずかしかったですが、', meaning: 'foi difícil, mas', lemma: '難しい', lemmaReading: 'むずかしい' },
          { text: '上手に', reading: 'じょうずに', meaning: 'bem', lemma: '上手', lemmaReading: 'じょうず' },
          { text: 'できました。', meaning: 'consegui fazer', lemma: 'できる' },
        ],
        translation: 'Foi um pouco difícil, mas consegui fazer bem.',
      },
      {
        words: [
          { text: '家族は', reading: 'かぞくは', meaning: 'minha família', lemma: '家族', lemmaReading: 'かぞく' },
          { text: '美味しいと', reading: 'おいしいと', meaning: 'que estava gostoso', lemma: '美味しい', lemmaReading: 'おいしい' },
          { text: '言いました。', reading: 'いいました。', meaning: 'disse', lemma: '言う', lemmaReading: 'いう' },
        ],
        translation: 'Minha família disse que estava gostoso.',
      },
      {
        words: [
          { text: 'また', meaning: 'de novo' },
          { text: '作りたいです。', reading: 'つくりたいです。', meaning: 'quero fazer', lemma: '作る', lemmaReading: 'つくる' },
        ],
        translation: 'Quero fazer de novo.',
      },
      {
        words: [
          { text: '次は、', reading: 'つぎは、', meaning: 'da próxima vez,', lemma: '次', lemmaReading: 'つぎ' },
          { text: 'お寿司の', reading: 'おすしの', meaning: 'de sushi', lemma: 'お寿司', lemmaReading: 'おすし' },
          { text: '作り方も', reading: 'つくりかたも', meaning: 'o modo de fazer também', lemma: '作り方', lemmaReading: 'つくりかた' },
          { text: '習いたいです。', reading: 'ならいたいです。', meaning: 'quero aprender', lemma: '習う', lemmaReading: 'ならう' },
        ],
        translation: 'Da próxima vez, quero aprender também como fazer sushi.',
      },
      {
        words: [
          { text: '料理を', reading: 'りょうりを', meaning: 'culinária (+ partícula de objeto)' },
          { text: 'すると、', meaning: 'quando faço,', lemma: 'する' },
          { text: '母の', reading: 'ははの', meaning: 'da minha mãe', lemma: '母', lemmaReading: 'はは' },
          { text: '大変さが', reading: 'たいへんさが', meaning: 'a dificuldade (+ partícula de sujeito)', lemma: '大変さ', lemmaReading: 'たいへんさ' },
          { text: '分かります。', reading: 'わかります。', meaning: 'entendo', lemma: '分かる', lemmaReading: 'わかる' },
        ],
        translation: 'Quando cozinho, entendo o quanto é trabalhoso para minha mãe.',
      },
      {
        words: [
          { text: '台所は', reading: 'だいどころは', meaning: 'a cozinha', lemma: '台所', lemmaReading: 'だいどころ' },
          { text: '少し', reading: 'すこし', meaning: 'um pouco' },
          { text: '汚れましたが、', reading: 'よごれましたが、', meaning: 'ficou suja, mas', lemma: '汚れる', lemmaReading: 'よごれる' },
          { text: '大丈夫です。', reading: 'だいじょうぶです。', meaning: 'está tudo bem', lemma: '大丈夫', lemmaReading: 'だいじょうぶ' },
        ],
        translation: 'A cozinha ficou um pouco suja, mas está tudo bem.',
      },
      {
        words: [
          { text: 'これからも、', meaning: 'de agora em diante também,' },
          { text: '母と', reading: 'ははと', meaning: 'com minha mãe', lemma: '母', lemmaReading: 'はは' },
          { text: '一緒に', reading: 'いっしょに', meaning: 'juntos', lemma: '一緒に', lemmaReading: 'いっしょに' },
          { text: '料理を', reading: 'りょうりを', meaning: 'culinária (+ partícula de objeto)' },
          { text: 'したいです。', meaning: 'quero fazer', lemma: 'する' },
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
          { text: '会社の', reading: 'かいしゃの', meaning: 'da empresa', lemma: '会社', lemmaReading: 'かいしゃ' },
          { text: '面接が', reading: 'めんせつが', meaning: 'a entrevista (+ partícula de sujeito)' },
          { text: 'あります。', meaning: 'há/tem', lemma: 'ある' },
        ],
        translation: 'Amanhã tenho uma entrevista de emprego.',
      },
      {
        words: [
          { text: '少し', reading: 'すこし', meaning: 'um pouco' },
          { text: '緊張しています。', reading: 'きんちょうしています。', meaning: 'estou nervoso', lemma: '緊張する', lemmaReading: 'きんちょうする' },
        ],
        translation: 'Estou um pouco nervoso.',
      },
      {
        words: [
          { text: 'スーツを', meaning: 'terno (+ partícula de objeto)' },
          { text: '着て、', reading: 'きて、', meaning: 'vestindo, e', lemma: '着る', lemmaReading: 'きる' },
          { text: '早く', reading: 'はやく', meaning: 'cedo', lemma: '早い', lemmaReading: 'はやい' },
          { text: '家を', reading: 'いえを', meaning: 'de casa', lemma: '家', lemmaReading: 'いえ' },
          { text: '出るつもりです。', reading: 'でるつもりです。', meaning: 'pretendo sair', lemma: '出る', lemmaReading: 'でる' },
        ],
        translation: 'Pretendo vestir um terno e sair de casa cedo.',
      },
      {
        words: [
          { text: '質問の', reading: 'しつもんの', meaning: 'das perguntas', lemma: '質問', lemmaReading: 'しつもん' },
          { text: '答えを', reading: 'こたえを', meaning: 'as respostas (+ partícula de objeto)' },
          { text: '何度も', reading: 'なんども', meaning: 'várias vezes', lemma: '何度も', lemmaReading: 'なんども' },
          { text: '練習しました。', reading: 'れんしゅうしました。', meaning: 'pratiquei', lemma: '練習する', lemmaReading: 'れんしゅうする' },
        ],
        translation: 'Pratiquei várias vezes as respostas das perguntas.',
      },
      {
        words: [
          { text: 'この', meaning: 'esta' },
          { text: '会社で', reading: 'かいしゃで', meaning: 'nesta empresa', lemma: '会社', lemmaReading: 'かいしゃ' },
          { text: '働きたい', reading: 'はたらきたい', meaning: 'querer trabalhar', lemma: '働く', lemmaReading: 'はたらく' },
          { text: '理由も', reading: 'りゆうも', meaning: 'o motivo também', lemma: '理由', lemmaReading: 'りゆう' },
          { text: '考えました。', reading: 'かんがえました。', meaning: 'pensei', lemma: '考える', lemmaReading: 'かんがえる' },
        ],
        translation: 'Também pensei no motivo pelo qual quero trabalhar nesta empresa.',
      },
      {
        words: [
          { text: 'うまく', meaning: 'bem', lemma: 'うまい' },
          { text: 'いくと', meaning: 'se for/acontecer', lemma: 'いく' },
          { text: 'いいです。', meaning: 'seria bom', lemma: 'いい' },
        ],
        translation: 'Espero que dê tudo certo.',
      },
      {
        words: [
          { text: '面接の後、', reading: 'めんせつのあと、', meaning: 'depois da entrevista,', lemma: '面接', lemmaReading: 'めんせつ' },
          { text: '友達に', reading: 'ともだちに', meaning: 'para um amigo', lemma: '友達', lemmaReading: 'ともだち' },
          { text: '電話するつもりです。', reading: 'でんわするつもりです。', meaning: 'pretendo telefonar', lemma: '電話する', lemmaReading: 'でんわする' },
        ],
        translation: 'Depois da entrevista, pretendo ligar para um amigo.',
      },
      {
        words: [
          { text: '面接では、', reading: 'めんせつでは、', meaning: 'na entrevista,', lemma: '面接', lemmaReading: 'めんせつ' },
          { text: '笑顔で', reading: 'えがおで', meaning: 'com um sorriso', lemma: '笑顔', lemmaReading: 'えがお' },
          { text: '話す', reading: 'はなす', meaning: 'falar' },
          { text: 'つもりです。', meaning: 'pretendo', lemma: 'つもり' },
        ],
        translation: 'Na entrevista, pretendo falar com um sorriso.',
      },
      {
        words: [
          { text: '少し', reading: 'すこし', meaning: 'um pouco' },
          { text: '不安ですが、', reading: 'ふあんですが、', meaning: 'estou inseguro, mas', lemma: '不安', lemmaReading: 'ふあん' },
          { text: '頑張りたいです。', reading: 'がんばりたいです。', meaning: 'quero me esforçar', lemma: '頑張る', lemmaReading: 'がんばる' },
        ],
        translation: 'Estou um pouco inseguro, mas quero dar o meu melhor.',
      },
      {
        words: [
          { text: '今夜は', reading: 'こんやは', meaning: 'esta noite', lemma: '今夜', lemmaReading: 'こんや' },
          { text: '早く', reading: 'はやく', meaning: 'cedo', lemma: '早い', lemmaReading: 'はやい' },
          { text: '寝て、', reading: 'ねて、', meaning: 'vou dormir, e', lemma: '寝る', lemmaReading: 'ねる' },
          { text: '体調を', reading: 'たいちょうを', meaning: 'a condição física (+ partícula de objeto)' },
          { text: '整えます。', reading: 'ととのえます。', meaning: 'vou ajustar', lemma: '整える', lemmaReading: 'ととのえる' },
        ],
        translation: 'Esta noite, vou dormir cedo para me preparar fisicamente.',
      },
      {
        words: [
          { text: 'いい', meaning: 'bom' },
          { text: '結果に', reading: 'けっかに', meaning: 'em resultado', lemma: '結果', lemmaReading: 'けっか' },
          { text: 'なることを', meaning: 'virar, se tornar (+ partícula de objeto)', lemma: 'なる' },
          { text: '願っています。', reading: 'ねがっています。', meaning: 'estou desejando', lemma: '願う', lemmaReading: 'ねがう' },
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
          { text: 'アパートに', meaning: 'para um apartamento', lemma: 'アパート' },
          { text: '引っ越します。', reading: 'ひっこします。', meaning: 'vou me mudar', lemma: '引っ越す', lemmaReading: 'ひっこす' },
        ],
        translation: 'Mês que vem, vou me mudar para um apartamento novo.',
      },
      {
        words: [
          { text: '今の', reading: 'いまの', meaning: 'atual', lemma: '今', lemmaReading: 'いま' },
          { text: '部屋より', reading: 'へやより', meaning: 'que o quarto', lemma: '部屋', lemmaReading: 'へや' },
          { text: '少し', reading: 'すこし', meaning: 'um pouco' },
          { text: '広いです。', reading: 'ひろいです。', meaning: 'é espaçoso', lemma: '広い', lemmaReading: 'ひろい' },
        ],
        translation: 'É um pouco mais espaçoso que o quarto atual.',
      },
      {
        words: [
          { text: '駅からも', reading: 'えきからも', meaning: 'da estação também', lemma: '駅', lemmaReading: 'えき' },
          { text: '近くて、', reading: 'ちかくて、', meaning: 'é perto, e', lemma: '近い', lemmaReading: 'ちかい' },
          { text: '便利です。', reading: 'べんりです。', meaning: 'é conveniente', lemma: '便利', lemmaReading: 'べんり' },
        ],
        translation: 'Também é perto da estação, e é conveniente.',
      },
      {
        words: [
          { text: '今週末、', reading: 'こんしゅうまつ、', meaning: 'neste fim de semana,' },
          { text: '荷物を', reading: 'にもつを', meaning: 'as coisas (+ partícula de objeto)' },
          { text: '箱に', reading: 'はこに', meaning: 'na caixa', lemma: '箱', lemmaReading: 'はこ' },
          { text: '入れます。', reading: 'いれます。', meaning: 'vou colocar', lemma: '入れる', lemmaReading: 'いれる' },
        ],
        translation: 'Neste fim de semana, vou colocar as coisas nas caixas.',
      },
      {
        words: [
          { text: '友達も', reading: 'ともだちも', meaning: 'meus amigos também', lemma: '友達', lemmaReading: 'ともだち' },
          { text: '手伝ってくれます。', reading: 'てつだってくれます。', meaning: 'vão me ajudar', lemma: '手伝う', lemmaReading: 'てつだう' },
        ],
        translation: 'Meus amigos também vão me ajudar.',
      },
      {
        words: [
          { text: '新しい', reading: 'あたらしい', meaning: 'novo' },
          { text: '部屋の', reading: 'へやの', meaning: 'do quarto', lemma: '部屋', lemmaReading: 'へや' },
          { text: '家具も', reading: 'かぐも', meaning: 'os móveis também', lemma: '家具', lemmaReading: 'かぐ' },
          { text: '考えています。', reading: 'かんがえています。', meaning: 'estou pensando', lemma: '考える', lemmaReading: 'かんがえる' },
        ],
        translation: 'Também estou pensando nos móveis do novo quarto.',
      },
      {
        words: [
          { text: '早く', reading: 'はやく', meaning: 'logo', lemma: '早い', lemmaReading: 'はやい' },
          { text: '新しい', reading: 'あたらしい', meaning: 'nova' },
          { text: '生活を', reading: 'せいかつを', meaning: 'a vida (+ partícula de objeto)' },
          { text: '始めたいです。', reading: 'はじめたいです。', meaning: 'quero começar', lemma: '始める', lemmaReading: 'はじめる' },
        ],
        translation: 'Quero começar logo a nova vida.',
      },
      {
        words: [
          { text: '新しい', reading: 'あたらしい', meaning: 'novo' },
          { text: '部屋には、', reading: 'へやには、', meaning: 'no quarto,', lemma: '部屋', lemmaReading: 'へや' },
          { text: '大きい', reading: 'おおきい', meaning: 'grande' },
          { text: '窓が', reading: 'まどが', meaning: 'janela (+ partícula de sujeito)' },
          { text: 'あります。', meaning: 'há', lemma: 'ある' },
        ],
        translation: 'O quarto novo tem uma janela grande.',
      },
      {
        words: [
          { text: '近くに', reading: 'ちかくに', meaning: 'perto', lemma: '近く', lemmaReading: 'ちかく' },
          { text: 'スーパーも', meaning: 'supermercado também', lemma: 'スーパー' },
          { text: 'あって、', meaning: 'há, e', lemma: 'ある' },
          { text: '便利そうです。', reading: 'べんりそうです。', meaning: 'parece conveniente', lemma: '便利', lemmaReading: 'べんり' },
        ],
        translation: 'Perto também tem um supermercado, parece ser bem conveniente.',
      },
      {
        words: [
          { text: '引っ越しの', reading: 'ひっこしの', meaning: 'da mudança', lemma: '引っ越し', lemmaReading: 'ひっこし' },
          { text: '後、', reading: 'あと、', meaning: 'depois,' },
          { text: '部屋を', reading: 'へやを', meaning: 'o quarto (+ partícula de objeto)' },
          { text: '掃除します。', reading: 'そうじします。', meaning: 'vou limpar', lemma: '掃除する', lemmaReading: 'そうじする' },
        ],
        translation: 'Depois da mudança, vou limpar o quarto.',
      },
      {
        words: [
          { text: '新生活が、', reading: 'しんせいかつが、', meaning: 'a nova vida,', lemma: '新生活', lemmaReading: 'しんせいかつ' },
          { text: '楽しみで', reading: 'たのしみで', meaning: 'empolgante, e', lemma: '楽しみ', lemmaReading: 'たのしみ' },
          { text: '仕方ありません。', reading: 'しかたありません。', meaning: 'não aguento de tanta ansiedade', lemma: '仕方ない', lemmaReading: 'しかたない' },
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
          { text: '町の', reading: 'まちの', meaning: 'da cidade', lemma: '町', lemmaReading: 'まち' },
          { text: '夏祭りに', reading: 'なつまつりに', meaning: 'ao festival de verão', lemma: '夏祭り', lemmaReading: 'なつまつり' },
          { text: '行きました。', reading: 'いきました。', meaning: 'fui', lemma: '行く', lemmaReading: 'いく' },
        ],
        translation: 'Ontem, fui ao festival de verão da cidade.',
      },
      {
        words: [
          { text: '友達と', reading: 'ともだちと', meaning: 'com amigos', lemma: '友達', lemmaReading: 'ともだち' },
          { text: '浴衣を', reading: 'ゆかたを', meaning: 'yukata (+ partícula de objeto)' },
          { text: '着て', reading: 'きて', meaning: 'vestindo', lemma: '着る', lemmaReading: 'きる' },
          { text: '行きました。', reading: 'いきました。', meaning: 'fomos', lemma: '行く', lemmaReading: 'いく' },
        ],
        translation: 'Fui vestindo yukata com meus amigos.',
      },
      {
        words: [
          { text: '屋台で', reading: 'やたいで', meaning: 'na barraca', lemma: '屋台', lemmaReading: 'やたい' },
          { text: 'たこ焼きを', reading: 'たこやきを', meaning: 'takoyaki (+ partícula de objeto)' },
          { text: '食べました。', reading: 'たべました。', meaning: 'comemos', lemma: '食べる', lemmaReading: 'たべる' },
        ],
        translation: 'Comi takoyaki numa barraca.',
      },
      {
        words: [
          { text: '夜、', reading: 'よる、', meaning: 'à noite,' },
          { text: '大きい', reading: 'おおきい', meaning: 'grandes' },
          { text: '花火を', reading: 'はなびを', meaning: 'fogos de artifício (+ partícula de objeto)' },
          { text: '見ました。', reading: 'みました。', meaning: 'vimos', lemma: '見る', lemmaReading: 'みる' },
        ],
        translation: 'À noite, vimos fogos de artifício grandes.',
      },
      {
        words: [
          { text: '空が', reading: 'そらが', meaning: 'o céu (+ partícula de sujeito)' },
          { text: '色々な', reading: 'いろいろな', meaning: 'várias', lemma: '色々', lemmaReading: 'いろいろ' },
          { text: '色に', reading: 'いろに', meaning: 'em cores', lemma: '色', lemmaReading: 'いろ' },
          { text: 'なりました。', meaning: 'ficou', lemma: 'なる' },
        ],
        translation: 'O céu ficou de várias cores.',
      },
      {
        words: [
          { text: '人が', reading: 'ひとが', meaning: 'as pessoas (+ partícula de sujeito)' },
          { text: '多くて、', reading: 'おおくて、', meaning: 'eram muitas, e', lemma: '多い', lemmaReading: 'おおい' },
          { text: '少し', reading: 'すこし', meaning: 'um pouco' },
          { text: '疲れました。', reading: 'つかれました。', meaning: 'fiquei cansado', lemma: '疲れる', lemmaReading: 'つかれる' },
        ],
        translation: 'Havia muita gente, e fiquei um pouco cansado.',
      },
      {
        words: [
          { text: 'でも、', meaning: 'mas,' },
          { text: 'とても', meaning: 'muito' },
          { text: '楽しい', reading: 'たのしい', meaning: 'divertida' },
          { text: '夜でした。', reading: 'よるでした。', meaning: 'foi a noite', lemma: '夜', lemmaReading: 'よる' },
        ],
        translation: 'Mas foi uma noite muito divertida.',
      },
      {
        words: [
          { text: '帰る前に、', reading: 'かえるまえに、', meaning: 'antes de voltar,', lemma: '帰る', lemmaReading: 'かえる' },
          { text: 'お面を', reading: 'おめんを', meaning: 'máscara (+ partícula de objeto)' },
          { text: '買いました。', reading: 'かいました。', meaning: 'comprei', lemma: '買う', lemmaReading: 'かう' },
        ],
        translation: 'Antes de voltar, comprei uma máscara.',
      },
      {
        words: [
          { text: '太鼓の', reading: 'たいこの', meaning: 'do tambor', lemma: '太鼓', lemmaReading: 'たいこ' },
          { text: '音が、', reading: 'おとが、', meaning: 'o som,', lemma: '音', lemmaReading: 'おと' },
          { text: '遠くまで', reading: 'とおくまで', meaning: 'até longe', lemma: '遠く', lemmaReading: 'とおく' },
          { text: '聞こえました。', reading: 'きこえました。', meaning: 'se ouvia', lemma: '聞こえる', lemmaReading: 'きこえる' },
        ],
        translation: 'O som do tambor se ouvia até longe.',
      },
      {
        words: [
          { text: '来年も', reading: 'らいねんも', meaning: 'ano que vem também', lemma: '来年', lemmaReading: 'らいねん' },
          { text: '友達と', reading: 'ともだちと', meaning: 'com amigos', lemma: '友達', lemmaReading: 'ともだち' },
          { text: '行く', reading: 'いく', meaning: 'ir', lemma: '行く', lemmaReading: 'いく' },
          { text: '約束を', reading: 'やくそくを', meaning: 'promessa (+ partícula de objeto)' },
          { text: 'しました。', meaning: 'fiz', lemma: 'する' },
        ],
        translation: 'Combinei de ir de novo ano que vem com meus amigos.',
      },
      {
        words: [
          { text: '夏祭りは、', reading: 'なつまつりは、', meaning: 'o festival de verão,', lemma: '夏祭り', lemmaReading: 'なつまつり' },
          { text: '夏の', reading: 'なつの', meaning: 'do verão', lemma: '夏', lemmaReading: 'なつ' },
          { text: '一番の', reading: 'いちばんの', meaning: 'a melhor', lemma: '一番', lemmaReading: 'いちばん' },
          { text: '思い出です。', reading: 'おもいでです。', meaning: 'é lembrança', lemma: '思い出', lemmaReading: 'おもいで' },
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
          { text: '痛かったです。', reading: 'いたかったです。', meaning: 'doeu', lemma: '痛い', lemmaReading: 'いたい' },
        ],
        translation: 'Esta manhã, minha cabeça doeu.',
      },
      {
        words: [
          { text: '熱も', reading: 'ねつも', meaning: 'febre também', lemma: '熱', lemmaReading: 'ねつ' },
          { text: '少し', reading: 'すこし', meaning: 'um pouco' },
          { text: 'ありました。', meaning: 'tinha', lemma: 'ある' },
        ],
        translation: 'Também tive um pouco de febre.',
      },
      {
        words: [
          { text: 'それで、', meaning: 'por isso,' },
          { text: '近くの', reading: 'ちかくの', meaning: 'próximo', lemma: '近く', lemmaReading: 'ちかく' },
          { text: '病院へ', reading: 'びょういんへ', meaning: 'para o hospital', lemma: '病院', lemmaReading: 'びょういん' },
          { text: '行きました。', reading: 'いきました。', meaning: 'fui', lemma: '行く', lemmaReading: 'いく' },
        ],
        translation: 'Por isso, fui a um hospital perto de casa.',
      },
      {
        words: [
          { text: '医者は', reading: 'いしゃは', meaning: 'o médico', lemma: '医者', lemmaReading: 'いしゃ' },
          { text: '優しく、', reading: 'やさしく、', meaning: 'gentilmente, e', lemma: '優しい', lemmaReading: 'やさしい' },
          { text: '丁寧に', reading: 'ていねいに', meaning: 'com cuidado', lemma: '丁寧', lemmaReading: 'ていねい' },
          { text: '診てくれました。', reading: 'みてくれました。', meaning: 'me examinou', lemma: '診る', lemmaReading: 'みる' },
        ],
        translation: 'O médico me examinou com gentileza e cuidado.',
      },
      {
        words: [
          { text: '薬を', reading: 'くすりを', meaning: 'remédio (+ partícula de objeto)' },
          { text: 'もらって、', meaning: 'recebi, e', lemma: 'もらう' },
          { text: '家に', reading: 'いえに', meaning: 'para casa', lemma: '家', lemmaReading: 'いえ' },
          { text: '帰りました。', reading: 'かえりました。', meaning: 'voltei', lemma: '帰る', lemmaReading: 'かえる' },
        ],
        translation: 'Recebi remédio e voltei para casa.',
      },
      {
        words: [
          { text: '一日中、', reading: 'いちにちじゅう、', meaning: 'o dia inteiro,' },
          { text: 'ゆっくり', meaning: 'tranquilamente' },
          { text: '休みました。', reading: 'やすみました。', meaning: 'descansei', lemma: '休む', lemmaReading: 'やすむ' },
        ],
        translation: 'Descansei tranquilamente o dia inteiro.',
      },
      {
        words: [
          { text: '今は', reading: 'いまは', meaning: 'agora', lemma: '今', lemmaReading: 'いま' },
          { text: 'もう', meaning: 'já' },
          { text: '元気に', reading: 'げんきに', meaning: 'bem/saudável', lemma: '元気', lemmaReading: 'げんき' },
          { text: 'なりました。', meaning: 'fiquei', lemma: 'なる' },
        ],
        translation: 'Agora já estou bem de novo.',
      },
      {
        words: [
          { text: '薬は、', reading: 'くすりは、', meaning: 'o remédio,', lemma: '薬', lemmaReading: 'くすり' },
          { text: '一日に', reading: 'いちにちに', meaning: 'por dia', lemma: '一日', lemmaReading: 'いちにち' },
          { text: '三回', reading: 'さんかい', meaning: 'três vezes' },
          { text: '飲みます。', reading: 'のみます。', meaning: 'tomo', lemma: '飲む', lemmaReading: 'のむ' },
        ],
        translation: 'Tomo o remédio três vezes por dia.',
      },
      {
        words: [
          { text: 'しばらく、', meaning: 'por um tempo,' },
          { text: '辛い', reading: 'からい', meaning: 'picante' },
          { text: '物は', reading: 'ものは', meaning: 'coisas', lemma: '物', lemmaReading: 'もの' },
          { text: '控えます。', reading: 'ひかえます。', meaning: 'vou evitar', lemma: '控える', lemmaReading: 'ひかえる' },
        ],
        translation: 'Por um tempo, vou evitar coisas picantes.',
      },
      {
        words: [
          { text: '家族が、', reading: 'かぞくが、', meaning: 'minha família,', lemma: '家族', lemmaReading: 'かぞく' },
          { text: '色々', reading: 'いろいろ', meaning: 'de várias formas' },
          { text: '心配してくれました。', reading: 'しんぱいしてくれました。', meaning: 'se preocupou por mim', lemma: '心配する', lemmaReading: 'しんぱいする' },
        ],
        translation: 'Minha família se preocupou comigo de várias formas.',
      },
      {
        words: [
          { text: '健康の', reading: 'けんこうの', meaning: 'da saúde', lemma: '健康', lemmaReading: 'けんこう' },
          { text: '大切さを、', reading: 'たいせつさを、', meaning: 'a importância,', lemma: '大切さ', lemmaReading: 'たいせつさ' },
          { text: '改めて', reading: 'あらためて', meaning: 'mais uma vez' },
          { text: '感じました。', reading: 'かんじました。', meaning: 'senti', lemma: '感じる', lemmaReading: 'かんじる' },
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
          { text: '夏休みに', reading: 'なつやすみに', meaning: 'nas férias de verão', lemma: '夏休み', lemmaReading: 'なつやすみ' },
          { text: '沖縄へ', reading: 'おきなわへ', meaning: 'para Okinawa', lemma: '沖縄', lemmaReading: 'おきなわ' },
          { text: '行く', reading: 'いく', meaning: 'ir', lemma: '行く', lemmaReading: 'いく' },
          { text: '予定です。', reading: 'よていです。', meaning: 'é o plano', lemma: '予定', lemmaReading: 'よてい' },
        ],
        translation: 'Nas férias de verão, o plano é ir a Okinawa.',
      },
      {
        words: [
          { text: '友達と', reading: 'ともだちと', meaning: 'com amigos', lemma: '友達', lemmaReading: 'ともだち' },
          { text: '一緒に', reading: 'いっしょに', meaning: 'juntos', lemma: '一緒に', lemmaReading: 'いっしょに' },
          { text: '計画を', reading: 'けいかくを', meaning: 'o plano (+ partícula de objeto)' },
          { text: '立てています。', reading: 'たてています。', meaning: 'estamos fazendo', lemma: '立てる', lemmaReading: 'たてる' },
        ],
        translation: 'Estou planejando junto com meus amigos.',
      },
      {
        words: [
          { text: 'まず、', meaning: 'primeiro,' },
          { text: '飛行機の', reading: 'ひこうきの', meaning: 'de avião', lemma: '飛行機', lemmaReading: 'ひこうき' },
          { text: '切符を', reading: 'きっぷを', meaning: 'a passagem (+ partícula de objeto)' },
          { text: '買いました。', reading: 'かいました。', meaning: 'compramos', lemma: '買う', lemmaReading: 'かう' },
        ],
        translation: 'Primeiro, compramos as passagens de avião.',
      },
      {
        words: [
          { text: '次に、', reading: 'つぎに、', meaning: 'em seguida,', lemma: '次', lemmaReading: 'つぎ' },
          { text: '泊まる', reading: 'とまる', meaning: 'hospedar-se', lemma: '泊まる', lemmaReading: 'とまる' },
          { text: 'ホテルを', meaning: 'hotel (+ partícula de objeto)' },
          { text: '探しています。', reading: 'さがしています。', meaning: 'estamos procurando', lemma: '探す', lemmaReading: 'さがす' },
        ],
        translation: 'Em seguida, estamos procurando um hotel para nos hospedar.',
      },
      {
        words: [
          { text: 'きれいな', meaning: 'cristalino', lemma: 'きれい' },
          { text: '海で', reading: 'うみで', meaning: 'no mar', lemma: '海', lemmaReading: 'うみ' },
          { text: '泳ぎたいです。', reading: 'およぎたいです。', meaning: 'quero nadar', lemma: '泳ぐ', lemmaReading: 'およぐ' },
        ],
        translation: 'Quero nadar num mar cristalino.',
      },
      {
        words: [
          { text: '美味しい', reading: 'おいしい', meaning: 'gostosa' },
          { text: '沖縄料理も', reading: 'おきなわりょうりも', meaning: 'a culinária de Okinawa também', lemma: '沖縄料理', lemmaReading: 'おきなわりょうり' },
          { text: '食べてみたいです。', reading: 'たべてみたいです。', meaning: 'quero experimentar comer', lemma: '食べる', lemmaReading: 'たべる' },
        ],
        translation: 'Também quero experimentar a culinária de Okinawa.',
      },
      {
        words: [
          { text: '旅行が', reading: 'りょこうが', meaning: 'a viagem (+ partícula de sujeito)' },
          { text: '来るのが', reading: 'くるのが', meaning: 'chegar', lemma: '来る', lemmaReading: 'くる' },
          { text: '待ち遠しいです。', reading: 'まちどおしいです。', meaning: 'mal posso esperar', lemma: '待ち遠しい', lemmaReading: 'まちどおしい' },
        ],
        translation: 'Mal posso esperar a viagem chegar.',
      },
      {
        words: [
          { text: '沖縄では、', reading: 'おきなわでは、', meaning: 'em Okinawa,', lemma: '沖縄', lemmaReading: 'おきなわ' },
          { text: 'シュノーケリングも', meaning: 'mergulho com snorkel também', lemma: 'シュノーケリング' },
          { text: 'したいです。', meaning: 'quero fazer', lemma: 'する' },
        ],
        translation: 'Em Okinawa, também quero fazer snorkel.',
      },
      {
        words: [
          { text: '友達と', reading: 'ともだちと', meaning: 'com amigos', lemma: '友達', lemmaReading: 'ともだち' },
          { text: '荷物の', reading: 'にもつの', meaning: 'das coisas', lemma: '荷物', lemmaReading: 'にもつ' },
          { text: 'リストを', meaning: 'lista (+ partícula de objeto)' },
          { text: '作りました。', reading: 'つくりました。', meaning: 'fizemos', lemma: '作る', lemmaReading: 'つくる' },
        ],
        translation: 'Fizemos uma lista das coisas para levar com os amigos.',
      },
      {
        words: [
          { text: '天気が', reading: 'てんきが', meaning: 'o tempo (+ partícula de sujeito)' },
          { text: 'いいことを、', meaning: 'estar bom,', lemma: 'いい' },
          { text: '祈っています。', reading: 'いのっています。', meaning: 'estou torcendo', lemma: '祈る', lemmaReading: 'いのる' },
        ],
        translation: 'Estou torcendo para o tempo estar bom.',
      },
      {
        words: [
          { text: '楽しい', reading: 'たのしい', meaning: 'divertidas' },
          { text: '夏休みに', reading: 'なつやすみに', meaning: 'em férias de verão', lemma: '夏休み', lemmaReading: 'なつやすみ' },
          { text: 'なりそうです。', meaning: 'parece que vai virar', lemma: 'なる' },
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
          { text: '高校の時、', reading: 'こうこうのとき、', meaning: 'na época do colégio,', lemma: '高校', lemmaReading: 'こうこう' },
          { text: '田村先生という', reading: 'たむらせんせいという', meaning: 'chamado professor Tamura', lemma: '田村先生', lemmaReading: 'たむらせんせい' },
          { text: '先生が', reading: 'せんせいが', meaning: 'um professor (+ partícula de sujeito)' },
          { text: 'いました。', meaning: 'havia', lemma: 'いる' },
        ],
        translation: 'Na época do colégio, havia um professor chamado Tamura.',
      },
      {
        words: [
          { text: 'いつも', meaning: 'sempre' },
          { text: '面白い', reading: 'おもしろい', meaning: 'interessantes' },
          { text: '話を', reading: 'はなしを', meaning: 'histórias (+ partícula de objeto)' },
          { text: 'してくれました。', meaning: 'contava (pra gente)', lemma: 'する' },
        ],
        translation: 'Ele sempre contava histórias interessantes para nós.',
      },
      {
        words: [
          { text: '分からない時、', reading: 'わからないとき、', meaning: 'quando eu não entendia,', lemma: '分かる', lemmaReading: 'わかる' },
          { text: 'いつも', meaning: 'sempre' },
          { text: '丁寧に', reading: 'ていねいに', meaning: 'com cuidado', lemma: '丁寧', lemmaReading: 'ていねい' },
          { text: '教えてくれました。', reading: 'おしえてくれました。', meaning: 'me ensinava', lemma: '教える', lemmaReading: 'おしえる' },
        ],
        translation: 'Quando eu não entendia algo, ele sempre me explicava com cuidado.',
      },
      {
        words: [
          { text: '生徒たちに', reading: 'せいとたちに', meaning: 'entre os alunos', lemma: '生徒', lemmaReading: 'せいと' },
          { text: 'とても', meaning: 'muita' },
          { text: '人気が', reading: 'にんきが', meaning: 'popularidade (+ partícula de sujeito)' },
          { text: 'ありました。', meaning: 'havia', lemma: 'ある' },
        ],
        translation: 'Ele era muito popular entre os alunos.',
      },
      {
        words: [
          { text: '卒業する時、', reading: 'そつぎょうするとき、', meaning: 'na hora de nos formar,', lemma: '卒業する', lemmaReading: 'そつぎょうする' },
          { text: '皆', reading: 'みんな', meaning: 'todos' },
          { text: '泣きました。', reading: 'なきました。', meaning: 'choramos', lemma: '泣く', lemmaReading: 'なく' },
        ],
        translation: 'Na hora de nos formar, todos choramos.',
      },
      {
        words: [
          { text: '今でも', reading: 'いまでも', meaning: 'ainda hoje', lemma: '今', lemmaReading: 'いま' },
          { text: '時々', reading: 'ときどき', meaning: 'às vezes' },
          { text: '先生の', reading: 'せんせいの', meaning: 'do professor', lemma: '先生', lemmaReading: 'せんせい' },
          { text: 'ことを', meaning: 'sobre ele (+ partícula de objeto)' },
          { text: '思い出します。', reading: 'おもいだします。', meaning: 'me lembro', lemma: '思い出す', lemmaReading: 'おもいだす' },
        ],
        translation: 'Ainda hoje, às vezes me lembro dele.',
      },
      {
        words: [
          { text: 'いつか', meaning: 'algum dia' },
          { text: 'また', meaning: 'de novo' },
          { text: '会いたいです。', reading: 'あいたいです。', meaning: 'quero encontrar', lemma: '会う', lemmaReading: 'あう' },
        ],
        translation: 'Quero encontrá-lo de novo algum dia.',
      },
      {
        words: [
          { text: '先生の', reading: 'せんせいの', meaning: 'do professor', lemma: '先生', lemmaReading: 'せんせい' },
          { text: '言葉は、', reading: 'ことばは、', meaning: 'as palavras,', lemma: '言葉', lemmaReading: 'ことば' },
          { text: '今でも', reading: 'いまでも', meaning: 'ainda hoje', lemma: '今', lemmaReading: 'いま' },
          { text: '心に', reading: 'こころに', meaning: 'no coração', lemma: '心', lemmaReading: 'こころ' },
          { text: '残っています。', reading: 'のこっています。', meaning: 'ficaram guardadas', lemma: '残る', lemmaReading: 'のこる' },
        ],
        translation: 'As palavras do professor ainda hoje ficaram guardadas no meu coração.',
      },
      {
        words: [
          { text: '困った時、', reading: 'こまったとき、', meaning: 'quando estou em dificuldade,', lemma: '困る', lemmaReading: 'こまる' },
          { text: 'いつも', meaning: 'sempre' },
          { text: '先生の', reading: 'せんせいの', meaning: 'do professor', lemma: '先生', lemmaReading: 'せんせい' },
          { text: 'ことを', meaning: 'sobre ele (+ partícula de objeto)' },
          { text: '思い出します。', reading: 'おもいだします。', meaning: 'me lembro', lemma: '思い出す', lemmaReading: 'おもいだす' },
        ],
        translation: 'Quando estou em dificuldade, sempre me lembro do professor.',
      },
      {
        words: [
          { text: '同級生とも、', reading: 'どうきゅうせいとも、', meaning: 'com os colegas de turma também,', lemma: '同級生', lemmaReading: 'どうきゅうせい' },
          { text: '先生の', reading: 'せんせいの', meaning: 'do professor', lemma: '先生', lemmaReading: 'せんせい' },
          { text: '話を', reading: 'はなしを', meaning: 'conversa (+ partícula de objeto)' },
          { text: 'します。', meaning: 'fazemos', lemma: 'する' },
        ],
        translation: 'Com os colegas de turma também, conversamos sobre o professor.',
      },
      {
        words: [
          { text: '先生の', reading: 'せんせいの', meaning: 'do professor', lemma: '先生', lemmaReading: 'せんせい' },
          { text: 'おかげで、', meaning: 'graças a,' },
          { text: '今の', reading: 'いまの', meaning: 'de hoje', lemma: '今', lemmaReading: 'いま' },
          { text: 'わたしが', meaning: 'eu (+ partícula de sujeito)' },
          { text: 'います。', meaning: 'existo, estou', lemma: 'いる' },
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
          { text: '駅で', reading: 'えきで', meaning: 'na estação', lemma: '駅', lemmaReading: 'えき' },
          { text: '大変な', reading: 'たいへんな', meaning: 'grave', lemma: '大変', lemmaReading: 'たいへん' },
          { text: 'ことが', meaning: 'uma coisa (+ partícula de sujeito)' },
          { text: 'ありました。', meaning: 'aconteceu', lemma: 'ある' },
        ],
        translation: 'Esta manhã, aconteceu algo sério na estação.',
      },
      {
        words: [
          { text: '電車を', reading: 'でんしゃを', meaning: 'do trem (+ partícula de objeto)' },
          { text: '降りた後、', reading: 'おりたあと、', meaning: 'depois de descer,', lemma: '降りる', lemmaReading: 'おりる' },
          { text: '財布が', reading: 'さいふが', meaning: 'a carteira (+ partícula de sujeito)' },
          { text: 'ないと', meaning: 'que não tinha', lemma: 'ない' },
          { text: '気づきました。', reading: 'きづきました。', meaning: 'percebi', lemma: '気づく', lemmaReading: 'きづく' },
        ],
        translation: 'Depois de descer do trem, percebi que não tinha mais a carteira.',
      },
      {
        words: [
          { text: 'とても', meaning: 'muito' },
          { text: '驚いて、', reading: 'おどろいて、', meaning: 'me assustei, e', lemma: '驚く', lemmaReading: 'おどろく' },
          { text: '慌てました。', reading: 'あわてました。', meaning: 'entrei em pânico', lemma: '慌てる', lemmaReading: 'あわてる' },
        ],
        translation: 'Fiquei muito assustado e entrei em pânico.',
      },
      {
        words: [
          { text: 'すぐに', meaning: 'imediatamente' },
          { text: '駅員さんに', reading: 'えきいんさんに', meaning: 'ao funcionário da estação', lemma: '駅員', lemmaReading: 'えきいん' },
          { text: '話しました。', reading: 'はなしました。', meaning: 'contei', lemma: '話す', lemmaReading: 'はなす' },
        ],
        translation: 'Contei imediatamente ao funcionário da estação.',
      },
      {
        words: [
          { text: '駅員さんは', reading: 'えきいんさんは', meaning: 'o funcionário da estação', lemma: '駅員', lemmaReading: 'えきいん' },
          { text: '忘れ物センターに', reading: 'わすれものセンターに', meaning: 'para o centro de achados e perdidos', lemma: '忘れ物センター', lemmaReading: 'わすれものセンター' },
          { text: '連絡してくれました。', reading: 'れんらくしてくれました。', meaning: 'entrou em contato (por mim)', lemma: '連絡する', lemmaReading: 'れんらくする' },
        ],
        translation: 'O funcionário entrou em contato com o centro de achados e perdidos por mim.',
      },
      {
        words: [
          { text: '三十分後、', reading: 'さんじゅっぷんご、', meaning: 'trinta minutos depois,', lemma: '三十分後', lemmaReading: 'さんじゅっぷんご' },
          { text: '財布が', reading: 'さいふが', meaning: 'a carteira (+ partícula de sujeito)' },
          { text: '見つかりました。', reading: 'みつかりました。', meaning: 'foi encontrada', lemma: '見つかる', lemmaReading: 'みつかる' },
        ],
        translation: 'Trinta minutos depois, a carteira foi encontrada.',
      },
      {
        words: [
          { text: '本当に', reading: 'ほんとうに', meaning: 'realmente', lemma: '本当に', lemmaReading: 'ほんとうに' },
          { text: '安心しました。', reading: 'あんしんしました。', meaning: 'fiquei aliviado', lemma: '安心する', lemmaReading: 'あんしんする' },
        ],
        translation: 'Fiquei realmente aliviado.',
      },
      {
        words: [
          { text: 'これから', meaning: 'de agora em diante' },
          { text: '気をつけようと', reading: 'きをつけようと', meaning: 'que vou tomar cuidado', lemma: '気をつける', lemmaReading: 'きをつける' },
          { text: '思います。', reading: 'おもいます。', meaning: 'penso', lemma: '思う', lemmaReading: 'おもう' },
        ],
        translation: 'Vou tomar mais cuidado daqui em diante.',
      },
      {
        words: [
          { text: '財布の', reading: 'さいふの', meaning: 'da carteira', lemma: '財布', lemmaReading: 'さいふ' },
          { text: '中を、', reading: 'なかを、', meaning: 'o interior,', lemma: '中', lemmaReading: 'なか' },
          { text: 'すぐに', meaning: 'imediatamente' },
          { text: '確認しました。', reading: 'かくにんしました。', meaning: 'conferi', lemma: '確認する', lemmaReading: 'かくにんする' },
        ],
        translation: 'Conferi imediatamente o conteúdo da carteira.',
      },
      {
        words: [
          { text: 'お金も', reading: 'おかねも', meaning: 'dinheiro também', lemma: 'お金', lemmaReading: 'おかね' },
          { text: 'カードも、', meaning: 'cartões também,', lemma: 'カード' },
          { text: '全部', reading: 'ぜんぶ', meaning: 'tudo' },
          { text: 'ありました。', meaning: 'estava', lemma: 'ある' },
        ],
        translation: 'O dinheiro e os cartões, tudo estava lá.',
      },
      {
        words: [
          { text: '駅員さんに、', reading: 'えきいんさんに、', meaning: 'ao funcionário da estação,', lemma: '駅員', lemmaReading: 'えきいん' },
          { text: '何度も', reading: 'なんども', meaning: 'várias vezes', lemma: '何度も', lemmaReading: 'なんども' },
          { text: 'お礼を', reading: 'おれいを', meaning: 'agradecimento (+ partícula de objeto)' },
          { text: '言いました。', reading: 'いいました。', meaning: 'disse', lemma: '言う', lemmaReading: 'いう' },
        ],
        translation: 'Agradeci várias vezes ao funcionário da estação.',
      },
      {
        words: [
          { text: 'この', meaning: 'esta' },
          { text: '経験から、', reading: 'けいけんから、', meaning: 'dessa experiência,', lemma: '経験', lemmaReading: 'けいけん' },
          { text: '大事な', reading: 'だいじな', meaning: 'importante', lemma: '大事', lemmaReading: 'だいじ' },
          { text: 'ことを', meaning: 'coisa (+ partícula de objeto)' },
          { text: '学びました。', reading: 'まなびました。', meaning: 'aprendi', lemma: '学ぶ', lemmaReading: 'まなぶ' },
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
          { text: '先月から、', reading: 'せんげつから、', meaning: 'desde o mês passado,', lemma: '先月', lemmaReading: 'せんげつ' },
          { text: 'コンビニで', meaning: 'na loja de conveniência', lemma: 'コンビニ' },
          { text: 'アルバイトを', meaning: 'o trabalho de meio período (+ partícula de objeto)' },
          { text: '始めました。', reading: 'はじめました。', meaning: 'comecei', lemma: '始める', lemmaReading: 'はじめる' },
        ],
        translation: 'Desde o mês passado, comecei um trabalho de meio período numa loja de conveniência.',
      },
      {
        words: [
          { text: '最初の日は、', reading: 'さいしょのひは、', meaning: 'no primeiro dia,', lemma: '最初の日', lemmaReading: 'さいしょのひ' },
          { text: '覚える', reading: 'おぼえる', meaning: 'memorizar' },
          { text: 'ことが', meaning: 'coisas (+ partícula de sujeito)' },
          { text: '多くて', reading: 'おおくて', meaning: 'eram muitas, e', lemma: '多い', lemmaReading: 'おおい' },
          { text: '大変でした。', reading: 'たいへんでした。', meaning: 'foi difícil', lemma: '大変', lemmaReading: 'たいへん' },
        ],
        translation: 'No primeiro dia, havia muita coisa para memorizar e foi difícil.',
      },
      {
        words: [
          { text: 'レジの', meaning: 'do caixa', lemma: 'レジ' },
          { text: '使い方を', reading: 'つかいかたを', meaning: 'o modo de usar (+ partícula de objeto)' },
          { text: '先輩に', reading: 'せんぱいに', meaning: 'com um colega mais experiente', lemma: '先輩', lemmaReading: 'せんぱい' },
          { text: '習いました。', reading: 'ならいました。', meaning: 'aprendi', lemma: '習う', lemmaReading: 'ならう' },
        ],
        translation: 'Aprendi a usar o caixa com um colega mais experiente.',
      },
      {
        words: [
          { text: 'お客さんに', reading: 'おきゃくさんに', meaning: 'aos clientes', lemma: 'お客さん', lemmaReading: 'おきゃくさん' },
          { text: '挨拶するのも', reading: 'あいさつするのも', meaning: 'cumprimentar também', lemma: '挨拶する', lemmaReading: 'あいさつする' },
          { text: '大事な', reading: 'だいじな', meaning: 'importante', lemma: '大事', lemmaReading: 'だいじ' },
          { text: '仕事です。', reading: 'しごとです。', meaning: 'é o trabalho', lemma: '仕事', lemmaReading: 'しごと' },
        ],
        translation: 'Cumprimentar os clientes também é uma parte importante do trabalho.',
      },
      {
        words: [
          { text: '今は', reading: 'いまは', meaning: 'agora', lemma: '今', lemmaReading: 'いま' },
          { text: '少しずつ', reading: 'すこしずつ', meaning: 'aos poucos' },
          { text: '慣れてきました。', reading: 'なれてきました。', meaning: 'fui me acostumando', lemma: '慣れる', lemmaReading: 'なれる' },
        ],
        translation: 'Agora estou me acostumando aos poucos.',
      },
      {
        words: [
          { text: '週に', reading: 'しゅうに', meaning: 'por semana', lemma: '週', lemmaReading: 'しゅう' },
          { text: '三回、', reading: 'さんかい、', meaning: 'três vezes,' },
          { text: '夕方から', reading: 'ゆうがたから', meaning: 'a partir do fim da tarde', lemma: '夕方', lemmaReading: 'ゆうがた' },
          { text: '働いています。', reading: 'はたらいています。', meaning: 'estou trabalhando', lemma: '働く', lemmaReading: 'はたらく' },
        ],
        translation: 'Trabalho três vezes por semana, a partir do fim da tarde.',
      },
      {
        words: [
          { text: '給料で', reading: 'きゅうりょうで', meaning: 'com o salário', lemma: '給料', lemmaReading: 'きゅうりょう' },
          { text: '好きな', reading: 'すきな', meaning: 'de que eu gosto', lemma: '好き', lemmaReading: 'すき' },
          { text: '物を', reading: 'ものを', meaning: 'coisas (+ partícula de objeto)' },
          { text: '買いたいです。', reading: 'かいたいです。', meaning: 'quero comprar', lemma: '買う', lemmaReading: 'かう' },
        ],
        translation: 'Quero comprar coisas de que gosto com o salário.',
      },
      {
        words: [
          { text: '忙しい', reading: 'いそがしい', meaning: 'movimentado' },
          { text: '時間帯は、', reading: 'じかんたいは、', meaning: 'no horário,', lemma: '時間帯', lemmaReading: 'じかんたい' },
          { text: '休む', reading: 'やすむ', meaning: 'descansar' },
          { text: '暇も', reading: 'ひまも', meaning: 'tempo livre também', lemma: '暇', lemmaReading: 'ひま' },
          { text: 'ありません。', meaning: 'não tenho', lemma: 'ある' },
        ],
        translation: 'No horário de movimento, não tenho nem tempo para descansar.',
      },
      {
        words: [
          { text: 'でも、', meaning: 'mas,' },
          { text: 'お客さんに', reading: 'おきゃくさんに', meaning: 'pelos clientes', lemma: 'お客さん', lemmaReading: 'おきゃくさん' },
          { text: '感謝されると、', reading: 'かんしゃされると、', meaning: 'quando sou agradecido,', lemma: '感謝する', lemmaReading: 'かんしゃする' },
          { text: '嬉しいです。', reading: 'うれしいです。', meaning: 'fico feliz', lemma: '嬉しい', lemmaReading: 'うれしい' },
        ],
        translation: 'Mas fico feliz quando um cliente me agradece.',
      },
      {
        words: [
          { text: '先輩たちも、', reading: 'せんぱいたちも、', meaning: 'os colegas mais experientes também,', lemma: '先輩', lemmaReading: 'せんぱい' },
          { text: 'とても', meaning: 'muito' },
          { text: '優しいです。', reading: 'やさしいです。', meaning: 'são gentis', lemma: '優しい', lemmaReading: 'やさしい' },
        ],
        translation: 'Os colegas mais experientes também são muito gentis.',
      },
      {
        words: [
          { text: 'このバイトを', meaning: 'este trabalho (+ partícula de objeto)', lemma: 'バイト' },
          { text: '通して、', reading: 'とおして、', meaning: 'através de,', lemma: '通す', lemmaReading: 'とおす' },
          { text: '色々な', reading: 'いろいろな', meaning: 'várias', lemma: '色々', lemmaReading: 'いろいろ' },
          { text: 'ことを', meaning: 'coisas (+ partícula de objeto)' },
          { text: '学んでいます。', reading: 'まなんでいます。', meaning: 'estou aprendendo', lemma: '学ぶ', lemmaReading: 'まなぶ' },
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
          { text: '今夜は', reading: 'こんやは', meaning: 'esta noite', lemma: '今夜', lemmaReading: 'こんや' },
          { text: '誰も', reading: 'だれも', meaning: 'ninguém' },
          { text: '予定が', reading: 'よていが', meaning: 'plano/compromisso (+ partícula de sujeito)' },
          { text: 'ありません。', meaning: 'não tem', lemma: 'ある' },
        ],
        translation: 'Esta noite não tenho nenhum compromisso.',
      },
      {
        words: [
          { text: 'お茶を', reading: 'おちゃを', meaning: 'chá (+ partícula de objeto)' },
          { text: '入れて、', reading: 'いれて、', meaning: 'preparei, e', lemma: '入れる', lemmaReading: 'いれる' },
          { text: 'ソファに', meaning: 'no sofá', lemma: 'ソファ' },
          { text: '座りました。', reading: 'すわりました。', meaning: 'sentei', lemma: '座る', lemmaReading: 'すわる' },
        ],
        translation: 'Preparei um chá e sentei no sofá.',
      },
      {
        words: [
          { text: '好きな', reading: 'すきな', meaning: 'de que gosto', lemma: '好き', lemmaReading: 'すき' },
          { text: '本を', reading: 'ほんを', meaning: 'livro (+ partícula de objeto)' },
          { text: '読み始めました。', reading: 'よみはじめました。', meaning: 'comecei a ler', lemma: '読み始める', lemmaReading: 'よみはじめる' },
        ],
        translation: 'Comecei a ler um livro de que gosto.',
      },
      {
        words: [
          { text: '外は', reading: 'そとは', meaning: 'do lado de fora', lemma: '外', lemmaReading: 'そと' },
          { text: '静かで、', reading: 'しずかで、', meaning: 'estava quieto, e', lemma: '静か', lemmaReading: 'しずか' },
          { text: '雨の', reading: 'あめの', meaning: 'da chuva', lemma: '雨', lemmaReading: 'あめ' },
          { text: '音だけ', reading: 'おとだけ', meaning: 'só o som', lemma: '音', lemmaReading: 'おと' },
          { text: '聞こえました。', reading: 'きこえました。', meaning: 'se ouvia', lemma: '聞こえる', lemmaReading: 'きこえる' },
        ],
        translation: 'Lá fora estava quieto, só se ouvia o som da chuva.',
      },
      {
        words: [
          { text: '時間を', reading: 'じかんを', meaning: 'o tempo (+ partícula de objeto)' },
          { text: '忘れるくらい、', reading: 'わすれるくらい、', meaning: 'a ponto de esquecer,', lemma: '忘れる', lemmaReading: 'わすれる' },
          { text: '物語に', reading: 'ものがたりに', meaning: 'na história', lemma: '物語', lemmaReading: 'ものがたり' },
          { text: '夢中に', reading: 'むちゅうに', meaning: 'absorto', lemma: '夢中', lemmaReading: 'むちゅう' },
          { text: 'なりました。', meaning: 'fiquei', lemma: 'なる' },
        ],
        translation: 'Fiquei tão absorto na história que esqueci do tempo.',
      },
      {
        words: [
          { text: '気がついたら、', reading: 'きがついたら、', meaning: 'quando percebi,', lemma: '気がつく', lemmaReading: 'きがつく' },
          { text: 'もう', meaning: 'já' },
          { text: '十二時でした。', reading: 'じゅうにじでした。', meaning: 'era meia-noite', lemma: '十二時', lemmaReading: 'じゅうにじ' },
        ],
        translation: 'Quando percebi, já era meia-noite.',
      },
      {
        words: [
          { text: 'こんな', meaning: 'desse jeito, assim' },
          { text: '静かな', reading: 'しずかな', meaning: 'tranquila', lemma: '静か', lemmaReading: 'しずか' },
          { text: '夜も', reading: 'よるも', meaning: 'noite também', lemma: '夜', lemmaReading: 'よる' },
          { text: 'たまには', meaning: 'de vez em quando', lemma: 'たまに' },
          { text: 'いいですね。', meaning: 'é bom, né', lemma: 'いい' },
        ],
        translation: 'Uma noite tranquila assim, de vez em quando, também é boa, né.',
      },
      {
        words: [
          { text: 'お茶が', reading: 'おちゃが', meaning: 'o chá (+ partícula de sujeito)' },
          { text: '冷めても、', reading: 'さめても、', meaning: 'mesmo esfriando,', lemma: '冷める', lemmaReading: 'さめる' },
          { text: '気づきませんでした。', reading: 'きづきませんでした。', meaning: 'não percebi', lemma: '気づく', lemmaReading: 'きづく' },
        ],
        translation: 'Mesmo o chá esfriando, eu nem percebi.',
      },
      {
        words: [
          { text: '続きが', reading: 'つづきが', meaning: 'a continuação (+ partícula de sujeito)' },
          { text: '気になって、', reading: 'きになって、', meaning: 'fiquei curioso, e', lemma: '気になる', lemmaReading: 'きになる' },
          { text: '眠れませんでした。', reading: 'ねむれませんでした。', meaning: 'não consegui dormir', lemma: '眠る', lemmaReading: 'ねむる' },
        ],
        translation: 'Fiquei curioso pela continuação e não consegui dormir.',
      },
      {
        words: [
          { text: '結局、', reading: 'けっきょく、', meaning: 'no final,' },
          { text: '朝まで', reading: 'あさまで', meaning: 'até de manhã', lemma: '朝', lemmaReading: 'あさ' },
          { text: '読んでしまいました。', reading: 'よんでしまいました。', meaning: 'acabei lendo', lemma: '読む', lemmaReading: 'よむ' },
        ],
        translation: 'No final, acabei lendo até de manhã.',
      },
      {
        words: [
          { text: '明日は、', reading: 'あしたは、', meaning: 'amanhã,', lemma: '明日', lemmaReading: 'あした' },
          { text: '続きの', reading: 'つづきの', meaning: 'da continuação', lemma: '続き', lemmaReading: 'つづき' },
          { text: '本を', reading: 'ほんを', meaning: 'livro (+ partícula de objeto)' },
          { text: '買いに', reading: 'かいに', meaning: 'para comprar', lemma: '買う', lemmaReading: 'かう' },
          { text: '行きます。', reading: 'いきます。', meaning: 'vou', lemma: '行く', lemmaReading: 'いく' },
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
          { text: '三か月前から、', reading: 'さんかげつまえから、', meaning: 'desde três meses atrás,', lemma: '三か月前', lemmaReading: 'さんかげつまえ' },
          { text: '自動車学校に', reading: 'じどうしゃがっこうに', meaning: 'na autoescola', lemma: '自動車学校', lemmaReading: 'じどうしゃがっこう' },
          { text: '通っています。', reading: 'かよっています。', meaning: 'estou frequentando', lemma: '通う', lemmaReading: 'かよう' },
        ],
        translation: 'Desde três meses atrás, estou frequentando a autoescola.',
      },
      {
        words: [
          { text: '運転は、', reading: 'うんてんは、', meaning: 'dirigir,', lemma: '運転', lemmaReading: 'うんてん' },
          { text: '最初', reading: 'さいしょ', meaning: 'no início' },
          { text: 'とても', meaning: 'muito' },
          { text: '難しかったです。', reading: 'むずかしかったです。', meaning: 'foi difícil', lemma: '難しい', lemmaReading: 'むずかしい' },
        ],
        translation: 'Dirigir, no início, foi muito difícil.',
      },
      {
        words: [
          { text: '先生は、', reading: 'せんせいは、', meaning: 'o instrutor,', lemma: '先生', lemmaReading: 'せんせい' },
          { text: '優しく', reading: 'やさしく', meaning: 'com gentileza', lemma: '優しい', lemmaReading: 'やさしい' },
          { text: '教えてくれました。', reading: 'おしえてくれました。', meaning: 'me ensinou', lemma: '教える', lemmaReading: 'おしえる' },
        ],
        translation: 'O instrutor me ensinou com gentileza.',
      },
      {
        words: [
          { text: '少しずつ、', reading: 'すこしずつ、', meaning: 'aos poucos,' },
          { text: '運転に', reading: 'うんてんに', meaning: 'a dirigir', lemma: '運転', lemmaReading: 'うんてん' },
          { text: '慣れてきました。', reading: 'なれてきました。', meaning: 'fui me acostumando', lemma: '慣れる', lemmaReading: 'なれる' },
        ],
        translation: 'Aos poucos, fui me acostumando a dirigir.',
      },
      {
        words: [
          { text: '先週、', reading: 'せんしゅう、', meaning: 'semana passada,' },
          { text: '筆記試験を', reading: 'ひっきしけんを', meaning: 'a prova escrita (+ partícula de objeto)' },
          { text: '受けました。', reading: 'うけました。', meaning: 'fiz', lemma: '受ける', lemmaReading: 'うける' },
        ],
        translation: 'Semana passada, fiz a prova escrita.',
      },
      {
        words: [
          { text: '合格して、', reading: 'ごうかくして、', meaning: 'passei, e', lemma: '合格する', lemmaReading: 'ごうかくする' },
          { text: 'とても', meaning: 'muito' },
          { text: '嬉しかったです。', reading: 'うれしかったです。', meaning: 'fiquei feliz', lemma: '嬉しい', lemmaReading: 'うれしい' },
        ],
        translation: 'Passei, e fiquei muito feliz.',
      },
      {
        words: [
          { text: '今日は、', reading: 'きょうは、', meaning: 'hoje,', lemma: '今日', lemmaReading: 'きょう' },
          { text: '最後の', reading: 'さいごの', meaning: 'a última', lemma: '最後', lemmaReading: 'さいご' },
          { text: '実技試験でした。', reading: 'じつぎしけんでした。', meaning: 'foi a prova prática', lemma: '実技試験', lemmaReading: 'じつぎしけん' },
        ],
        translation: 'Hoje foi a prova prática final.',
      },
      {
        words: [
          { text: '緊張しましたが、', reading: 'きんちょうしましたが、', meaning: 'fiquei nervoso, mas', lemma: '緊張する', lemmaReading: 'きんちょうする' },
          { text: '落ち着いて', reading: 'おちついて', meaning: 'com calma', lemma: '落ち着く', lemmaReading: 'おちつく' },
          { text: '運転しました。', reading: 'うんてんしました。', meaning: 'dirigi', lemma: '運転する', lemmaReading: 'うんてんする' },
        ],
        translation: 'Fiquei nervoso, mas dirigi com calma.',
      },
      {
        words: [
          { text: 'とうとう、', meaning: 'finalmente,' },
          { text: '免許を', reading: 'めんきょを', meaning: 'a carteira (+ partícula de objeto)' },
          { text: 'もらいました。', meaning: 'recebi', lemma: 'もらう' },
        ],
        translation: 'Finalmente, recebi a carteira.',
      },
      {
        words: [
          { text: '家族が、', reading: 'かぞくが、', meaning: 'minha família,', lemma: '家族', lemmaReading: 'かぞく' },
          { text: '一番', reading: 'いちばん', meaning: 'a mais' },
          { text: '喜んでくれました。', reading: 'よろこんでくれました。', meaning: 'ficou feliz por mim', lemma: '喜ぶ', lemmaReading: 'よろこぶ' },
        ],
        translation: 'Minha família foi quem mais ficou feliz.',
      },
      {
        words: [
          { text: '今度、', reading: 'こんど、', meaning: 'da próxima vez,' },
          { text: '一人で', reading: 'ひとりで', meaning: 'sozinho', lemma: '一人で', lemmaReading: 'ひとりで' },
          { text: '運転してみたいです。', reading: 'うんてんしてみたいです。', meaning: 'quero tentar dirigir', lemma: '運転する', lemmaReading: 'うんてんする' },
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
          { text: '半年前から、', reading: 'はんとしまえから、', meaning: 'desde seis meses atrás,', lemma: '半年前', lemmaReading: 'はんとしまえ' },
          { text: 'スポーツクラブに', meaning: 'a uma academia', lemma: 'スポーツクラブ' },
          { text: '通っています。', reading: 'かよっています。', meaning: 'estou frequentando', lemma: '通う', lemmaReading: 'かよう' },
        ],
        translation: 'Desde seis meses atrás, estou frequentando uma academia.',
      },
      {
        words: [
          { text: '仕事の後、', reading: 'しごとのあと、', meaning: 'depois do trabalho,', lemma: '仕事', lemmaReading: 'しごと' },
          { text: '週に', reading: 'しゅうに', meaning: 'por semana', lemma: '週', lemmaReading: 'しゅう' },
          { text: '三回', reading: 'さんかい', meaning: 'três vezes' },
          { text: '行きます。', reading: 'いきます。', meaning: 'vou', lemma: '行く', lemmaReading: 'いく' },
        ],
        translation: 'Depois do trabalho, vou três vezes por semana.',
      },
      {
        words: [
          { text: '最初は、', reading: 'さいしょは、', meaning: 'no início,', lemma: '最初', lemmaReading: 'さいしょ' },
          { text: '十分も', reading: 'じゅっぷんも', meaning: 'nem dez minutos', lemma: '十分', lemmaReading: 'じゅっぷん' },
          { text: '走れませんでした。', reading: 'はしれませんでした。', meaning: 'eu não conseguia correr', lemma: '走る', lemmaReading: 'はしる' },
        ],
        translation: 'No início, eu nem conseguia correr dez minutos.',
      },
      {
        words: [
          { text: '今は、', reading: 'いまは、', meaning: 'agora,', lemma: '今', lemmaReading: 'いま' },
          { text: '三十分', reading: 'さんじゅっぷん', meaning: 'trinta minutos' },
          { text: '走れるように', reading: 'はしれるように', meaning: 'a conseguir correr', lemma: '走る', lemmaReading: 'はしる' },
          { text: 'なりました。', meaning: 'passei', lemma: 'なる' },
        ],
        translation: 'Agora já consigo correr trinta minutos.',
      },
      {
        words: [
          { text: 'トレーナーが、', meaning: 'o treinador,', lemma: 'トレーナー' },
          { text: '正しい', reading: 'ただしい', meaning: 'correto' },
          { text: '方法を', reading: 'ほうほうを', meaning: 'o modo (+ partícula de objeto)' },
          { text: '教えてくれます。', reading: 'おしえてくれます。', meaning: 'me ensina', lemma: '教える', lemmaReading: 'おしえる' },
        ],
        translation: 'O treinador me ensina o jeito certo de fazer.',
      },
      {
        words: [
          { text: '筋肉も、', reading: 'きんにくも、', meaning: 'os músculos também,', lemma: '筋肉', lemmaReading: 'きんにく' },
          { text: '少し', reading: 'すこし', meaning: 'um pouco' },
          { text: '増えてきました。', reading: 'ふえてきました。', meaning: 'foram aumentando', lemma: '増える', lemmaReading: 'ふえる' },
        ],
        translation: 'Meus músculos também aumentaram um pouco.',
      },
      {
        words: [
          { text: '運動の後は、', reading: 'うんどうのあとは、', meaning: 'depois de me exercitar,', lemma: '運動', lemmaReading: 'うんどう' },
          { text: '体が', reading: 'からだが', meaning: 'o corpo (+ partícula de sujeito)' },
          { text: '軽く', reading: 'かるく', meaning: 'leve', lemma: '軽い', lemmaReading: 'かるい' },
          { text: '感じます。', reading: 'かんじます。', meaning: 'sinto', lemma: '感じる', lemmaReading: 'かんじる' },
        ],
        translation: 'Depois de me exercitar, sinto o corpo mais leve.',
      },
      {
        words: [
          { text: 'クラブで、', meaning: 'na academia,', lemma: 'クラブ' },
          { text: '新しい', reading: 'あたらしい', meaning: 'novos' },
          { text: '友達も', reading: 'ともだちも', meaning: 'amigos também', lemma: '友達', lemmaReading: 'ともだち' },
          { text: 'できました。', meaning: 'fiz', lemma: 'できる' },
        ],
        translation: 'Também fiz amigos novos na academia.',
      },
      {
        words: [
          { text: '週末は、', reading: 'しゅうまつは、', meaning: 'no fim de semana,', lemma: '週末', lemmaReading: 'しゅうまつ' },
          { text: 'みんなで', meaning: 'todos juntos', lemma: 'みんな' },
          { text: '一緒に', reading: 'いっしょに', meaning: 'juntos', lemma: '一緒に', lemmaReading: 'いっしょに' },
          { text: '運動します。', reading: 'うんどうします。', meaning: 'nos exercitamos', lemma: '運動する', lemmaReading: 'うんどうする' },
        ],
        translation: 'No fim de semana, todos nós nos exercitamos juntos.',
      },
      {
        words: [
          { text: '体重も、', reading: 'たいじゅうも、', meaning: 'o peso também,', lemma: '体重', lemmaReading: 'たいじゅう' },
          { text: '少し', reading: 'すこし', meaning: 'um pouco' },
          { text: '減りました。', reading: 'へりました。', meaning: 'diminuiu', lemma: '減る', lemmaReading: 'へる' },
        ],
        translation: 'Meu peso também diminuiu um pouco.',
      },
      {
        words: [
          { text: 'これからも、', meaning: 'de agora em diante também,' },
          { text: '健康のために', reading: 'けんこうのために', meaning: 'pela saúde', lemma: '健康', lemmaReading: 'けんこう' },
          { text: '続けたいです。', reading: 'つづけたいです。', meaning: 'quero continuar', lemma: '続ける', lemmaReading: 'つづける' },
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
          { text: '友達の', reading: 'ともだちの', meaning: 'de um amigo', lemma: '友達', lemmaReading: 'ともだち' },
          { text: '誕生日が', reading: 'たんじょうびが', meaning: 'o aniversário (+ partícula de sujeito)' },
          { text: 'あります。', meaning: 'há', lemma: 'ある' },
        ],
        translation: 'Semana que vem, é aniversário de um amigo.',
      },
      {
        words: [
          { text: '何を', reading: 'なにを', meaning: 'o quê (+ partícula de objeto)' },
          { text: 'あげようか、', meaning: 'vou dar,', lemma: 'あげる' },
          { text: 'ずっと', meaning: 'o tempo todo' },
          { text: '考えています。', reading: 'かんがえています。', meaning: 'fico pensando', lemma: '考える', lemmaReading: 'かんがえる' },
        ],
        translation: 'Fico pensando o tempo todo no que dar de presente.',
      },
      {
        words: [
          { text: '友達は、', reading: 'ともだちは、', meaning: 'meu amigo,', lemma: '友達', lemmaReading: 'ともだち' },
          { text: 'コーヒーが', meaning: 'café (+ partícula de sujeito)' },
          { text: '好きです。', reading: 'すきです。', meaning: 'gosta', lemma: '好き', lemmaReading: 'すき' },
        ],
        translation: 'Meu amigo gosta de café.',
      },
      {
        words: [
          { text: 'だから、', meaning: 'por isso,' },
          { text: 'いい', meaning: 'boa' },
          { text: 'コーヒーカップを', meaning: 'xícara de café (+ partícula de objeto)' },
          { text: '探しました。', reading: 'さがしました。', meaning: 'procurei', lemma: '探す', lemmaReading: 'さがす' },
        ],
        translation: 'Por isso, procurei uma boa xícara de café.',
      },
      {
        words: [
          { text: 'デパートで、', meaning: 'no shopping,', lemma: 'デパート' },
          { text: '素敵な', reading: 'すてきな', meaning: 'linda', lemma: '素敵', lemmaReading: 'すてき' },
          { text: 'カップを', meaning: 'xícara (+ partícula de objeto)' },
          { text: '見つけました。', reading: 'みつけました。', meaning: 'encontrei', lemma: '見つける', lemmaReading: 'みつける' },
        ],
        translation: 'Encontrei uma xícara linda no shopping.',
      },
      {
        words: [
          { text: 'でも、', meaning: 'mas,' },
          { text: '少し', reading: 'すこし', meaning: 'um pouco' },
          { text: '値段が', reading: 'ねだんが', meaning: 'o preço (+ partícula de sujeito)' },
          { text: '高かったです。', reading: 'たかかったです。', meaning: 'estava alto', lemma: '高い', lemmaReading: 'たかい' },
        ],
        translation: 'Mas o preço era um pouco alto.',
      },
      {
        words: [
          { text: '店員さんに、', reading: 'てんいんさんに、', meaning: 'com a vendedora,', lemma: '店員', lemmaReading: 'てんいん' },
          { text: '相談してみました。', reading: 'そうだんしてみました。', meaning: 'consultei', lemma: '相談する', lemmaReading: 'そうだんする' },
        ],
        translation: 'Consultei a vendedora.',
      },
      {
        words: [
          { text: '結局、', reading: 'けっきょく、', meaning: 'no final,' },
          { text: 'そのカップを', meaning: 'aquela xícara (+ partícula de objeto)', lemma: 'カップ' },
          { text: '買うことに', reading: 'かうことに', meaning: 'a comprar', lemma: '買う', lemmaReading: 'かう' },
          { text: 'しました。', meaning: 'decidi', lemma: 'する' },
        ],
        translation: 'No final, decidi comprar aquela xícara.',
      },
      {
        words: [
          { text: 'かわいい', meaning: 'bonito' },
          { text: '紙で、', reading: 'かみで、', meaning: 'com papel,', lemma: '紙', lemmaReading: 'かみ' },
          { text: '包んでもらいました。', reading: 'つつんでもらいました。', meaning: 'pedi para embrulhar', lemma: '包む', lemmaReading: 'つつむ' },
        ],
        translation: 'Pedi para embrulhar num papel bonito.',
      },
      {
        words: [
          { text: '友達が、', reading: 'ともだちが、', meaning: 'meu amigo,', lemma: '友達', lemmaReading: 'ともだち' },
          { text: '驚いてくれると', reading: 'おどろいてくれると', meaning: 'se surpreender', lemma: '驚く', lemmaReading: 'おどろく' },
          { text: 'いいです。', meaning: 'espero que', lemma: 'いい' },
        ],
        translation: 'Espero que meu amigo se surpreenda.',
      },
      {
        words: [
          { text: 'プレゼントを', meaning: 'presente (+ partícula de objeto)' },
          { text: '選ぶのも、', reading: 'えらぶのも、', meaning: 'escolher também,', lemma: '選ぶ', lemmaReading: 'えらぶ' },
          { text: '楽しい', reading: 'たのしい', meaning: 'divertido' },
          { text: '時間です。', reading: 'じかんです。', meaning: 'é um momento', lemma: '時間', lemmaReading: 'じかん' },
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
          { text: '先週から、', reading: 'せんしゅうから、', meaning: 'desde a semana passada,', lemma: '先週', lemmaReading: 'せんしゅう' },
          { text: '猫を', reading: 'ねこを', meaning: 'gata (+ partícula de objeto)' },
          { text: '飼い始めました。', reading: 'かいはじめました。', meaning: 'comecei a criar', lemma: '飼い始める', lemmaReading: 'かいはじめる' },
        ],
        translation: 'Desde a semana passada, comecei a criar uma gata.',
      },
      {
        words: [
          { text: '名前は、', reading: 'なまえは、', meaning: 'o nome,', lemma: '名前', lemmaReading: 'なまえ' },
          { text: 'モモです。', meaning: 'é Momo', lemma: 'モモ' },
        ],
        translation: 'O nome dela é Momo.',
      },
      {
        words: [
          { text: '最初は、', reading: 'さいしょは、', meaning: 'no início,', lemma: '最初', lemmaReading: 'さいしょ' },
          { text: 'ベッドの下に', reading: 'ベッドのしたに', meaning: 'embaixo da cama', lemma: 'ベッドの下', lemmaReading: 'ベッドのした' },
          { text: '隠れていました。', reading: 'かくれていました。', meaning: 'ela ficava escondida', lemma: '隠れる', lemmaReading: 'かくれる' },
        ],
        translation: 'No início, ela ficava escondida embaixo da cama.',
      },
      {
        words: [
          { text: '毎日、', reading: 'まいにち、', meaning: 'a cada dia,' },
          { text: '少しずつ', reading: 'すこしずつ', meaning: 'aos poucos' },
          { text: '慣れてきました。', reading: 'なれてきました。', meaning: 'foi se acostumando', lemma: '慣れる', lemmaReading: 'なれる' },
        ],
        translation: 'A cada dia, ela foi se acostumando aos poucos.',
      },
      {
        words: [
          { text: '今は、', reading: 'いまは、', meaning: 'agora,', lemma: '今', lemmaReading: 'いま' },
          { text: '私の', reading: 'わたしの', meaning: 'meu', lemma: '私', lemmaReading: 'わたし' },
          { text: '膝の上で', reading: 'ひざのうえで', meaning: 'no colo', lemma: '膝の上', lemmaReading: 'ひざのうえ' },
          { text: '寝ます。', reading: 'ねます。', meaning: 'dorme', lemma: '寝る', lemmaReading: 'ねる' },
        ],
        translation: 'Agora ela dorme no meu colo.',
      },
      {
        words: [
          { text: '朝、', reading: 'あさ、', meaning: 'de manhã,' },
          { text: 'ご飯を', reading: 'ごはんを', meaning: 'comida (+ partícula de objeto)' },
          { text: 'あげると、', meaning: 'quando dou,', lemma: 'あげる' },
          { text: '走ってきます。', reading: 'はしってきます。', meaning: 'vem correndo', lemma: '走る', lemmaReading: 'はしる' },
        ],
        translation: 'De manhã, quando dou comida, ela vem correndo.',
      },
      {
        words: [
          { text: 'おもちゃで', meaning: 'com brinquedo', lemma: 'おもちゃ' },
          { text: '遊ぶのが、', reading: 'あそぶのが、', meaning: 'brincar,', lemma: '遊ぶ', lemmaReading: 'あそぶ' },
          { text: '大好きです。', reading: 'だいすきです。', meaning: 'ela adora', lemma: '大好き', lemmaReading: 'だいすき' },
        ],
        translation: 'Ela adora brincar com brinquedos.',
      },
      {
        words: [
          { text: '病院で、', reading: 'びょういんで、', meaning: 'na clínica,', lemma: '病院', lemmaReading: 'びょういん' },
          { text: '注射も', reading: 'ちゅうしゃも', meaning: 'vacina também', lemma: '注射', lemmaReading: 'ちゅうしゃ' },
          { text: '受けました。', reading: 'うけました。', meaning: 'tomou, recebeu', lemma: '受ける', lemmaReading: 'うける' },
        ],
        translation: 'Na clínica, ela também tomou vacina.',
      },
      {
        words: [
          { text: '少し', reading: 'すこし', meaning: 'um pouco' },
          { text: '怖がっていましたが、', reading: 'こわがっていましたが、', meaning: 'ficou assustada, mas', lemma: '怖がる', lemmaReading: 'こわがる' },
          { text: '大丈夫でした。', reading: 'だいじょうぶでした。', meaning: 'ficou tudo bem', lemma: '大丈夫', lemmaReading: 'だいじょうぶ' },
        ],
        translation: 'Ela ficou um pouco assustada, mas ficou tudo bem.',
      },
      {
        words: [
          { text: 'モモが', meaning: 'a Momo (+ partícula de sujeito)' },
          { text: 'いると、', meaning: 'quando está,', lemma: 'いる' },
          { text: '家が', reading: 'いえが', meaning: 'a casa (+ partícula de sujeito)' },
          { text: '明るく', reading: 'あかるく', meaning: 'alegre', lemma: '明るい', lemmaReading: 'あかるい' },
          { text: 'なりました。', meaning: 'ficou', lemma: 'なる' },
        ],
        translation: 'Com a Momo em casa, tudo ficou mais alegre.',
      },
      {
        words: [
          { text: 'これからも、', meaning: 'de agora em diante também,' },
          { text: '大切に', reading: 'たいせつに', meaning: 'com carinho', lemma: '大切', lemmaReading: 'たいせつ' },
          { text: '育てたいです。', reading: 'そだてたいです。', meaning: 'quero criar', lemma: '育てる', lemmaReading: 'そだてる' },
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
          { text: '大事な', reading: 'だいじな', meaning: 'importante', lemma: '大事', lemmaReading: 'だいじ' },
          { text: '試験が', reading: 'しけんが', meaning: 'prova (+ partícula de sujeito)' },
          { text: 'あります。', meaning: 'há', lemma: 'ある' },
        ],
        translation: 'Mês que vem, tenho uma prova importante.',
      },
      {
        words: [
          { text: '毎日、', reading: 'まいにち、', meaning: 'todo dia,' },
          { text: '図書館で', reading: 'としょかんで', meaning: 'na biblioteca', lemma: '図書館', lemmaReading: 'としょかん' },
          { text: '勉強しています。', reading: 'べんきょうしています。', meaning: 'estou estudando', lemma: '勉強する', lemmaReading: 'べんきょうする' },
        ],
        translation: 'Todo dia, estou estudando na biblioteca.',
      },
      {
        words: [
          { text: '図書館は、', reading: 'としょかんは、', meaning: 'a biblioteca,', lemma: '図書館', lemmaReading: 'としょかん' },
          { text: '朝', reading: 'あさ', meaning: 'de manhã' },
          { text: '九時に', reading: 'くじに', meaning: 'às nove horas', lemma: '九時', lemmaReading: 'くじ' },
          { text: '開きます。', reading: 'ひらきます。', meaning: 'abre', lemma: '開く', lemmaReading: 'ひらく' },
        ],
        translation: 'A biblioteca abre às nove da manhã.',
      },
      {
        words: [
          { text: '静かな', reading: 'しずかな', meaning: 'silencioso', lemma: '静か', lemmaReading: 'しずか' },
          { text: '場所で、', reading: 'ばしょで、', meaning: 'num lugar,', lemma: '場所', lemmaReading: 'ばしょ' },
          { text: '集中できます。', reading: 'しゅうちゅうできます。', meaning: 'consigo me concentrar', lemma: '集中する', lemmaReading: 'しゅうちゅうする' },
        ],
        translation: 'Consigo me concentrar num lugar silencioso.',
      },
      {
        words: [
          { text: '分からない', reading: 'わからない', meaning: 'que não entendo', lemma: '分かる', lemmaReading: 'わかる' },
          { text: '問題は、', reading: 'もんだいは、', meaning: 'as questões,', lemma: '問題', lemmaReading: 'もんだい' },
          { text: '友達に', reading: 'ともだちに', meaning: 'para amigos', lemma: '友達', lemmaReading: 'ともだち' },
          { text: '聞きます。', reading: 'ききます。', meaning: 'pergunto', lemma: '聞く', lemmaReading: 'きく' },
        ],
        translation: 'As questões que não entendo, pergunto para amigos.',
      },
      {
        words: [
          { text: '休憩の時、', reading: 'きゅうけいのとき、', meaning: 'na hora do intervalo,', lemma: '休憩', lemmaReading: 'きゅうけい' },
          { text: 'コーヒーを', meaning: 'café (+ partícula de objeto)' },
          { text: '飲みます。', reading: 'のみます。', meaning: 'tomo', lemma: '飲む', lemmaReading: 'のむ' },
        ],
        translation: 'Na hora do intervalo, tomo café.',
      },
      {
        words: [
          { text: '長い時間', reading: 'ながいじかん', meaning: 'por muito tempo' },
          { text: '座っていると、', reading: 'すわっていると、', meaning: 'quando fico sentado,', lemma: '座る', lemmaReading: 'すわる' },
          { text: '疲れます。', reading: 'つかれます。', meaning: 'fico cansado', lemma: '疲れる', lemmaReading: 'つかれる' },
        ],
        translation: 'Quando fico sentado por muito tempo, fico cansado.',
      },
      {
        words: [
          { text: 'でも、', meaning: 'mas,' },
          { text: '諦めずに', reading: 'あきらめずに', meaning: 'sem desistir', lemma: '諦める', lemmaReading: 'あきらめる' },
          { text: '頑張っています。', reading: 'がんばっています。', meaning: 'estou me esforçando', lemma: '頑張る', lemmaReading: 'がんばる' },
        ],
        translation: 'Mas estou me esforçando sem desistir.',
      },
      {
        words: [
          { text: '夜、', reading: 'よる、', meaning: 'à noite,' },
          { text: '家に', reading: 'いえに', meaning: 'para casa', lemma: '家', lemmaReading: 'いえ' },
          { text: '帰ってからも', reading: 'かえってからも', meaning: 'mesmo depois de voltar', lemma: '帰る', lemmaReading: 'かえる' },
          { text: '復習します。', reading: 'ふくしゅうします。', meaning: 'revejo a matéria', lemma: '復習する', lemmaReading: 'ふくしゅうする' },
        ],
        translation: 'À noite, mesmo depois de voltar para casa, revejo a matéria.',
      },
      {
        words: [
          { text: '試験まで、', reading: 'しけんまで、', meaning: 'até a prova,', lemma: '試験', lemmaReading: 'しけん' },
          { text: 'あと', meaning: 'faltam' },
          { text: '少しです。', reading: 'すこしです。', meaning: 'poucos dias', lemma: '少し', lemmaReading: 'すこし' },
        ],
        translation: 'Falta pouco para a prova.',
      },
      {
        words: [
          { text: '頑張った', reading: 'がんばった', meaning: 'que me esforcei', lemma: '頑張る', lemmaReading: 'がんばる' },
          { text: '結果が、', reading: 'けっかが、', meaning: 'o resultado,', lemma: '結果', lemmaReading: 'けっか' },
          { text: 'いい', meaning: 'boa' },
          { text: '点数に', reading: 'てんすうに', meaning: 'em nota', lemma: '点数', lemmaReading: 'てんすう' },
          { text: 'なるといいです。', meaning: 'espero que vire', lemma: 'なる' },
        ],
        translation: 'Espero que o resultado do meu esforço vire uma boa nota.',
      },
    ],
  },
  ...TEXTOS_NIVEL_3,
];

export function getTextoById(id: string): ReadingText | undefined {
  return LEITURA_TEXTOS.find((t) => t.id === id);
}
