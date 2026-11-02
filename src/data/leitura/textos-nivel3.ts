import type { ReadingText } from './types';

/**
 * Nível 3: textos mais longos, com mais kanji (sempre com furigana) e
 * gramática da fronteira N5/N4 — 〜て encadeando ações, 〜ながら, 〜たり,
 * 〜てくれる, 〜たい, ので/から. Conteúdo original (ver textos.ts).
 */
export const TEXTOS_NIVEL_3: ReadingText[] = [
  {
    id: 'n3-shiki',
    title: '日本の 四季',
    level: 3,
    wordCount: 45,
    summaryPt: 'As quatro estações do Japão — cerejeiras, calor, folhas vermelhas e neve — e a preferida de quem escreve.',
    lines: [
      {
        words: [
          { text: '日本には', reading: 'にほんには', meaning: 'no Japão', lemma: '日本', lemmaReading: 'にほん' },
          { text: '四つの', reading: 'よっつの', meaning: 'quatro', lemma: '四つ', lemmaReading: 'よっつ' },
          { text: '季節が', reading: 'きせつが', meaning: 'estação do ano (+ partícula de sujeito)' },
          { text: 'あります。', meaning: 'há', lemma: 'ある' },
        ],
        translation: 'No Japão há quatro estações.',
      },
      {
        words: [
          { text: '春は', reading: 'はるは', meaning: 'a primavera (+ partícula de tópico)' },
          { text: '桜が', reading: 'さくらが', meaning: 'cerejeira (+ partícula de sujeito)' },
          { text: '咲いて、', reading: 'さいて、', meaning: 'floresce, e', lemma: '咲く', lemmaReading: 'さく' },
          { text: 'とても', meaning: 'muito' },
          { text: 'きれいです。', meaning: 'é bonito', lemma: 'きれい' },
        ],
        translation: 'Na primavera as cerejeiras florescem e fica muito bonito.',
      },
      {
        words: [
          { text: '夏は', reading: 'なつは', meaning: 'o verão (+ partícula de tópico)' },
          { text: '暑くて、', reading: 'あつくて、', meaning: 'é quente, e', lemma: '暑い', lemmaReading: 'あつい' },
          { text: '雨も', reading: 'あめも', meaning: 'chuva também', lemma: '雨', lemmaReading: 'あめ' },
          { text: '多いです。', reading: 'おおいです。', meaning: 'é muita', lemma: '多い', lemmaReading: 'おおい' },
        ],
        translation: 'O verão é quente e chove bastante também.',
      },
      {
        words: [
          { text: '夏休みには', reading: 'なつやすみには', meaning: 'nas férias de verão', lemma: '夏休み', lemmaReading: 'なつやすみ' },
          { text: '花火大会に', reading: 'はなびたいかいに', meaning: 'ao festival de fogos de artifício', lemma: '花火大会', lemmaReading: 'はなびたいかい' },
          { text: '行く', reading: 'いく', meaning: 'ir (que vai)' },
          { text: '人が', reading: 'ひとが', meaning: 'pessoa (+ partícula de sujeito)' },
          { text: '多いです。', reading: 'おおいです。', meaning: 'são muitas', lemma: '多い', lemmaReading: 'おおい' },
        ],
        translation: 'Nas férias de verão, muita gente vai a festivais de fogos de artifício.',
      },
      {
        words: [
          { text: '秋は', reading: 'あきは', meaning: 'o outono (+ partícula de tópico)' },
          { text: '涼しくて、', reading: 'すずしくて、', meaning: 'é fresco, e', lemma: '涼しい', lemmaReading: 'すずしい' },
          { text: '食べ物が', reading: 'たべものが', meaning: 'comida (+ partícula de sujeito)' },
          { text: 'おいしい', meaning: 'gostoso' },
          { text: '季節です。', reading: 'きせつです。', meaning: 'é a estação', lemma: '季節', lemmaReading: 'きせつ' },
        ],
        translation: 'O outono é fresco e é a estação em que a comida fica mais gostosa.',
      },
      {
        words: [
          { text: '山の', reading: 'やまの', meaning: 'das montanhas', lemma: '山', lemmaReading: 'やま' },
          { text: '木の', reading: 'きの', meaning: 'das árvores', lemma: '木', lemmaReading: 'き' },
          { text: '葉が', reading: 'はが', meaning: 'folha (+ partícula de sujeito)' },
          { text: '赤や', reading: 'あかや', meaning: 'vermelho, e', lemma: '赤', lemmaReading: 'あか' },
          { text: '黄色に', reading: 'きいろに', meaning: 'amarelo (+ partícula de resultado)', lemma: '黄色', lemmaReading: 'きいろ' },
          { text: 'なります。', meaning: 'ficam, tornam-se', lemma: 'なる' },
        ],
        translation: 'As folhas das árvores das montanhas ficam vermelhas e amarelas.',
      },
      {
        words: [
          { text: '冬は', reading: 'ふゆは', meaning: 'o inverno (+ partícula de tópico)' },
          { text: '寒いですが、', reading: 'さむいですが、', meaning: 'é frio, mas', lemma: '寒い', lemmaReading: 'さむい' },
          { text: '北の', reading: 'きたの', meaning: 'do norte', lemma: '北', lemmaReading: 'きた' },
          { text: '方では', reading: 'ほうでは', meaning: 'na região, para os lados', lemma: '方', lemmaReading: 'ほう' },
          { text: '雪が', reading: 'ゆきが', meaning: 'neve (+ partícula de sujeito)' },
          { text: 'たくさん', meaning: 'muito' },
          { text: '降ります。', reading: 'ふります。', meaning: 'cai (chuva, neve)', lemma: '降る', lemmaReading: 'ふる' },
        ],
        translation: 'O inverno é frio, e no norte cai muita neve.',
      },
      {
        words: [
          { text: '私は', reading: 'わたしは', meaning: 'eu (+ partícula de tópico)', lemma: '私', lemmaReading: 'わたし' },
          { text: '秋が', reading: 'あきが', meaning: 'outono (+ partícula de sujeito)' },
          { text: '一番', reading: 'いちばん', meaning: 'o mais, mais do que tudo' },
          { text: '好きです。', reading: 'すきです。', meaning: 'gosto', lemma: '好き', lemmaReading: 'すき' },
        ],
        translation: 'O outono é a estação de que eu mais gosto.',
      },
      {
        words: [
          { text: '天気が', reading: 'てんきが', meaning: 'o tempo, o clima (+ partícula de sujeito)' },
          { text: 'いい', meaning: 'bom' },
          { text: '日は、', reading: 'ひは、', meaning: 'nos dias', lemma: '日', lemmaReading: 'ひ' },
          { text: '公園を', reading: 'こうえんを', meaning: 'pelo parque (+ partícula de trajeto)' },
          { text: '散歩します。', reading: 'さんぽします。', meaning: 'passeio a pé', lemma: '散歩する', lemmaReading: 'さんぽする' },
        ],
        translation: 'Nos dias de tempo bom, passeio pelo parque.',
      },
      {
        words: [
          { text: 'ブラジルの', meaning: 'do Brasil', lemma: 'ブラジル' },
          { text: '季節は', reading: 'きせつは', meaning: 'as estações (+ partícula de tópico)' },
          { text: '日本と', reading: 'にほんと', meaning: 'em relação ao Japão', lemma: '日本', lemmaReading: 'にほん' },
          { text: '少し', reading: 'すこし', meaning: 'um pouco' },
          { text: '違います。', reading: 'ちがいます。', meaning: 'são diferentes', lemma: '違う', lemmaReading: 'ちがう' },
        ],
        translation: 'As estações do Brasil são um pouco diferentes das do Japão.',
      },
    ],
  },
  {
    id: 'n3-onsen',
    title: 'はじめての 温泉',
    level: 3,
    wordCount: 38,
    summaryPt: 'A primeira ida a uma fonte termal: as regras do banho, a vista da montanha e a noite no ryokan.',
    lines: [
      {
        words: [
          { text: '先週、', reading: 'せんしゅう、', meaning: 'semana passada', lemma: '先週', lemmaReading: 'せんしゅう' },
          { text: '友達と', reading: 'ともだちと', meaning: 'com amigos', lemma: '友達', lemmaReading: 'ともだち' },
          { text: '箱根の', reading: 'はこねの', meaning: 'de Hakone', lemma: '箱根', lemmaReading: 'はこね' },
          { text: '温泉に', reading: 'おんせんに', meaning: 'a uma fonte termal', lemma: '温泉', lemmaReading: 'おんせん' },
          { text: '行きました。', reading: 'いきました。', meaning: 'fui', lemma: '行く', lemmaReading: 'いく' },
        ],
        translation: 'Semana passada fui com amigos a uma fonte termal em Hakone.',
      },
      {
        words: [
          { text: '温泉は', reading: 'おんせんは', meaning: 'a fonte termal (+ partícula de tópico)' },
          { text: '初めてだったので、', reading: 'はじめてだったので、', meaning: 'como era a primeira vez', lemma: '初めて', lemmaReading: 'はじめて' },
          { text: '少し', reading: 'すこし', meaning: 'um pouco' },
          { text: '緊張しました。', reading: 'きんちょうしました。', meaning: 'fiquei nervoso', lemma: '緊張する', lemmaReading: 'きんちょうする' },
        ],
        translation: 'Como era a minha primeira vez numa fonte termal, fiquei um pouco nervoso.',
      },
      {
        words: [
          { text: '入る', reading: 'はいる', meaning: 'entrar' },
          { text: '前に、', reading: 'まえに、', meaning: 'antes de', lemma: '前', lemmaReading: 'まえ' },
          { text: '体を', reading: 'からだを', meaning: 'corpo (+ partícula de objeto)' },
          { text: 'きれいに', meaning: 'bem limpo', lemma: 'きれい' },
          { text: '洗います。', reading: 'あらいます。', meaning: 'lava-se', lemma: '洗う', lemmaReading: 'あらう' },
        ],
        translation: 'Antes de entrar, lava-se bem o corpo.',
      },
      {
        words: [
          { text: 'タオルを', meaning: 'toalha (+ partícula de objeto)' },
          { text: 'お湯に', reading: 'おゆに', meaning: 'na água quente', lemma: 'お湯', lemmaReading: 'おゆ' },
          { text: '入れては', reading: 'いれては', meaning: 'colocar (+ partícula de tópico)', lemma: '入れる', lemmaReading: 'いれる' },
          { text: 'いけません。', meaning: 'não pode', lemma: 'いけない' },
        ],
        translation: 'Não se pode pôr a toalha na água.',
      },
      {
        words: [
          { text: 'お湯は', reading: 'おゆは', meaning: 'a água quente (+ partícula de tópico)' },
          { text: '熱かったですが、', reading: 'あつかったですが、', meaning: 'estava quente, mas', lemma: '熱い', lemmaReading: 'あつい' },
          { text: 'とても', meaning: 'muito' },
          { text: '気持ちが', reading: 'きもちが', meaning: 'sensação (+ partícula de sujeito)' },
          { text: 'よかったです。', meaning: 'foi boa', lemma: 'いい' },
        ],
        translation: 'A água estava quente, mas foi muito gostoso.',
      },
      {
        words: [
          { text: '外の', reading: 'そとの', meaning: 'ao ar livre, de fora', lemma: '外', lemmaReading: 'そと' },
          { text: 'お風呂から', reading: 'おふろから', meaning: 'do banho, da banheira', lemma: 'お風呂', lemmaReading: 'おふろ' },
          { text: '山が', reading: 'やまが', meaning: 'montanha (+ partícula de sujeito)' },
          { text: '見えました。', reading: 'みえました。', meaning: 'dava para ver', lemma: '見える', lemmaReading: 'みえる' },
        ],
        translation: 'Do banho ao ar livre dava para ver as montanhas.',
      },
      {
        words: [
          { text: '夜は', reading: 'よるは', meaning: 'à noite (+ partícula de tópico)' },
          { text: '旅館で', reading: 'りょかんで', meaning: 'no ryokan (pousada japonesa)', lemma: '旅館', lemmaReading: 'りょかん' },
          { text: '日本料理を', reading: 'にほんりょうりを', meaning: 'culinária japonesa (+ partícula de objeto)' },
          { text: '食べました。', reading: 'たべました。', meaning: 'comi', lemma: '食べる', lemmaReading: 'たべる' },
        ],
        translation: 'À noite, comemos comida japonesa no ryokan.',
      },
      {
        words: [
          { text: '浴衣を', reading: 'ゆかたを', meaning: 'yukata, quimono leve (+ partícula de objeto)' },
          { text: '着て、', reading: 'きて、', meaning: 'vesti, e', lemma: '着る', lemmaReading: 'きる' },
          { text: 'みんなで', meaning: 'todos juntos', lemma: 'みんな' },
          { text: '写真を', reading: 'しゃしんを', meaning: 'foto (+ partícula de objeto)' },
          { text: '撮りました。', reading: 'とりました。', meaning: 'tiramos', lemma: '撮る', lemmaReading: 'とる' },
        ],
        translation: 'Vestimos yukata e tiramos fotos todos juntos.',
      },
      {
        words: [
          { text: '次は', reading: 'つぎは', meaning: 'da próxima vez (+ partícula de tópico)' },
          { text: '冬に', reading: 'ふゆに', meaning: 'no inverno', lemma: '冬', lemmaReading: 'ふゆ' },
          { text: '雪を', reading: 'ゆきを', meaning: 'neve (+ partícula de objeto)' },
          { text: '見ながら', reading: 'みながら', meaning: 'enquanto vejo', lemma: '見る', lemmaReading: 'みる' },
          { text: '入りたいです。', reading: 'はいりたいです。', meaning: 'quero entrar', lemma: '入る', lemmaReading: 'はいる' },
        ],
        translation: 'Da próxima vez, quero ir no inverno e entrar na água vendo a neve.',
      },
    ],
  },
  {
    id: 'n3-kaitenzushi',
    title: '回転寿司',
    level: 3,
    wordCount: 37,
    summaryPt: 'Jantar num sushi de esteira: os pratos que giram, o pedido pelo tablet e a conta pela cor dos pratos.',
    lines: [
      {
        words: [
          { text: '昨日の', reading: 'きのうの', meaning: 'de ontem', lemma: '昨日', lemmaReading: 'きのう' },
          { text: '晩ご飯は', reading: 'ばんごはんは', meaning: 'o jantar (+ partícula de tópico)' },
          { text: '回転寿司でした。', reading: 'かいてんずしでした。', meaning: 'foi sushi de esteira', lemma: '回転寿司', lemmaReading: 'かいてんずし' },
        ],
        translation: 'O jantar de ontem foi num sushi de esteira.',
      },
      {
        words: [
          { text: 'お寿司が', reading: 'おすしが', meaning: 'sushi (+ partícula de sujeito)' },
          { text: '小さい', reading: 'ちいさい', meaning: 'pequeno' },
          { text: 'お皿に', reading: 'おさらに', meaning: 'em pratos', lemma: 'お皿', lemmaReading: 'おさら' },
          { text: '乗って、', reading: 'のって、', meaning: 'em cima, e', lemma: '乗る', lemmaReading: 'のる' },
          { text: '回って', reading: 'まわって', meaning: 'girando', lemma: '回る', lemmaReading: 'まわる' },
          { text: 'います。', meaning: 'está, estão', lemma: 'いる' },
        ],
        translation: 'Os sushis vão girando em cima de pratinhos.',
      },
      {
        words: [
          { text: '好きな', reading: 'すきな', meaning: 'de que gosta', lemma: '好き', lemmaReading: 'すき' },
          { text: 'お皿を', reading: 'おさらを', meaning: 'prato (+ partícula de objeto)' },
          { text: '自分で', reading: 'じぶんで', meaning: 'por conta própria', lemma: '自分', lemmaReading: 'じぶん' },
          { text: '取ります。', reading: 'とります。', meaning: 'pega', lemma: '取る', lemmaReading: 'とる' },
        ],
        translation: 'Você mesmo pega os pratos que quiser.',
      },
      {
        words: [
          { text: 'タブレットで', meaning: 'pelo tablet', lemma: 'タブレット' },
          { text: '注文する', reading: 'ちゅうもんする', meaning: 'pedir' },
          { text: 'ことも', meaning: '(o ato de) também', lemma: 'こと' },
          { text: 'できます。', meaning: 'é possível', lemma: 'できる' },
        ],
        translation: 'Também dá para pedir pelo tablet.',
      },
      {
        words: [
          { text: 'お皿の', reading: 'おさらの', meaning: 'do prato', lemma: 'お皿', lemmaReading: 'おさら' },
          { text: '色で', reading: 'いろで', meaning: 'pela cor', lemma: '色', lemmaReading: 'いろ' },
          { text: '値段が', reading: 'ねだんが', meaning: 'preço (+ partícula de sujeito)' },
          { text: '違います。', reading: 'ちがいます。', meaning: 'é diferente', lemma: '違う', lemmaReading: 'ちがう' },
        ],
        translation: 'O preço muda conforme a cor do prato.',
      },
      {
        words: [
          { text: '私は', reading: 'わたしは', meaning: 'eu (+ partícula de tópico)', lemma: '私', lemmaReading: 'わたし' },
          { text: 'まぐろと', meaning: 'atum e', lemma: 'まぐろ' },
          { text: 'サーモンを', meaning: 'salmão (+ partícula de objeto)' },
          { text: 'たくさん', meaning: 'bastante' },
          { text: '食べました。', reading: 'たべました。', meaning: 'comi', lemma: '食べる', lemmaReading: 'たべる' },
        ],
        translation: 'Comi bastante atum e salmão.',
      },
      {
        words: [
          { text: 'お茶は', reading: 'おちゃは', meaning: 'o chá (+ partícula de tópico)' },
          { text: '無料で、', reading: 'むりょうで、', meaning: 'é grátis, e', lemma: '無料', lemmaReading: 'むりょう' },
          { text: '粉の', reading: 'こなの', meaning: 'em pó', lemma: '粉', lemmaReading: 'こな' },
          { text: 'お茶を', reading: 'おちゃを', meaning: 'chá (+ partícula de objeto)' },
          { text: 'お湯に', reading: 'おゆに', meaning: 'na água quente', lemma: 'お湯', lemmaReading: 'おゆ' },
          { text: '入れて', reading: 'いれて', meaning: 'coloca, e', lemma: '入れる', lemmaReading: 'いれる' },
          { text: '作ります。', reading: 'つくります。', meaning: 'prepara', lemma: '作る', lemmaReading: 'つくる' },
        ],
        translation: 'O chá é grátis: você põe o chá em pó na água quente e prepara.',
      },
      {
        words: [
          { text: '全部で', reading: 'ぜんぶで', meaning: 'no total', lemma: '全部', lemmaReading: 'ぜんぶ' },
          { text: '十二皿', reading: 'じゅうにさら', meaning: 'doze pratos' },
          { text: '食べて、', reading: 'たべて、', meaning: 'comi, e', lemma: '食べる', lemmaReading: 'たべる' },
          { text: '千五百円でした。', reading: 'せんごひゃくえんでした。', meaning: 'foram 1.500 ienes', lemma: '千五百円', lemmaReading: 'せんごひゃくえん' },
        ],
        translation: 'Comi doze pratos no total, e deu 1.500 ienes.',
      },
      {
        words: [
          { text: '安くて', reading: 'やすくて', meaning: 'barato, e', lemma: '安い', lemmaReading: 'やすい' },
          { text: 'おいしいので、', meaning: 'como é gostoso', lemma: 'おいしい' },
          { text: 'また', meaning: 'de novo' },
          { text: '行きたいです。', reading: 'いきたいです。', meaning: 'quero ir', lemma: '行く', lemmaReading: 'いく' },
        ],
        translation: 'Como é barato e gostoso, quero ir de novo.',
      },
    ],
  },
  {
    id: 'n3-shinkansen',
    title: '新幹線で 大阪へ',
    level: 3,
    wordCount: 38,
    summaryPt: 'Uma viagem de trem-bala de Tóquio a Osaka: o monte Fuji pela janela, takoyaki e as luzes de Dotonbori.',
    lines: [
      {
        words: [
          { text: '土曜日に、', reading: 'どようびに、', meaning: 'no sábado', lemma: '土曜日', lemmaReading: 'どようび' },
          { text: '新幹線で', reading: 'しんかんせんで', meaning: 'de trem-bala', lemma: '新幹線', lemmaReading: 'しんかんせん' },
          { text: '東京から', reading: 'とうきょうから', meaning: 'de Tóquio', lemma: '東京', lemmaReading: 'とうきょう' },
          { text: '大阪へ', reading: 'おおさかへ', meaning: 'para Osaka', lemma: '大阪', lemmaReading: 'おおさか' },
          { text: '行きました。', reading: 'いきました。', meaning: 'fui', lemma: '行く', lemmaReading: 'いく' },
        ],
        translation: 'No sábado, fui de trem-bala de Tóquio para Osaka.',
      },
      {
        words: [
          { text: '新幹線は', reading: 'しんかんせんは', meaning: 'o trem-bala (+ partícula de tópico)' },
          { text: 'とても', meaning: 'muito' },
          { text: '速くて、', reading: 'はやくて、', meaning: 'é rápido, e', lemma: '速い', lemmaReading: 'はやい' },
          { text: '二時間半ぐらいで', reading: 'にじかんはんぐらいで', meaning: 'em cerca de duas horas e meia', lemma: '二時間半', lemmaReading: 'にじかんはん' },
          { text: '着きます。', reading: 'つきます。', meaning: 'chega', lemma: '着く', lemmaReading: 'つく' },
        ],
        translation: 'O trem-bala é muito rápido: chega em umas duas horas e meia.',
      },
      {
        words: [
          { text: '駅で', reading: 'えきで', meaning: 'na estação', lemma: '駅', lemmaReading: 'えき' },
          { text: 'お弁当と', reading: 'おべんとうと', meaning: 'marmita (bentô) e', lemma: 'お弁当', lemmaReading: 'おべんとう' },
          { text: '飲み物を', reading: 'のみものを', meaning: 'bebida (+ partícula de objeto)' },
          { text: '買いました。', reading: 'かいました。', meaning: 'comprei', lemma: '買う', lemmaReading: 'かう' },
        ],
        translation: 'Comprei um bentô e uma bebida na estação.',
      },
      {
        words: [
          { text: '窓から', reading: 'まどから', meaning: 'pela janela', lemma: '窓', lemmaReading: 'まど' },
          { text: '富士山が', reading: 'ふじさんが', meaning: 'o monte Fuji (+ partícula de sujeito)' },
          { text: '見えました。', reading: 'みえました。', meaning: 'dava para ver', lemma: '見える', lemmaReading: 'みえる' },
        ],
        translation: 'Deu para ver o monte Fuji pela janela.',
      },
      {
        words: [
          { text: '車内は', reading: 'しゃないは', meaning: 'dentro do trem (+ partícula de tópico)' },
          { text: '静かで、', reading: 'しずかで、', meaning: 'é silencioso, e', lemma: '静か', lemmaReading: 'しずか' },
          { text: '電話で', reading: 'でんわで', meaning: 'ao telefone', lemma: '電話', lemmaReading: 'でんわ' },
          { text: '話す', reading: 'はなす', meaning: 'falar (que fala)' },
          { text: '人は', reading: 'ひとは', meaning: 'pessoa (+ partícula de tópico)' },
          { text: 'いません。', meaning: 'não há', lemma: 'いる' },
        ],
        translation: 'Dentro do trem é silencioso: ninguém fala ao telefone.',
      },
      {
        words: [
          { text: '大阪では', reading: 'おおさかでは', meaning: 'em Osaka', lemma: '大阪', lemmaReading: 'おおさか' },
          { text: 'たこ焼きを', reading: 'たこやきを', meaning: 'takoyaki, bolinho de polvo (+ partícula de objeto)' },
          { text: '食べました。', reading: 'たべました。', meaning: 'comi', lemma: '食べる', lemmaReading: 'たべる' },
        ],
        translation: 'Em Osaka, comi takoyaki.',
      },
      {
        words: [
          { text: '外は', reading: 'そとは', meaning: 'por fora (+ partícula de tópico)' },
          { text: 'カリカリで、', meaning: 'crocante, e', lemma: 'カリカリ' },
          { text: '中は', reading: 'なかは', meaning: 'por dentro (+ partícula de tópico)' },
          { text: '熱くて', reading: 'あつくて', meaning: 'quente, e', lemma: '熱い', lemmaReading: 'あつい' },
          { text: 'やわらかかったです。', meaning: 'estava macio', lemma: 'やわらかい' },
        ],
        translation: 'Por fora era crocante, e por dentro, quente e macio.',
      },
      {
        words: [
          { text: '夜は', reading: 'よるは', meaning: 'à noite (+ partícula de tópico)' },
          { text: '道頓堀の', reading: 'どうとんぼりの', meaning: 'de Dotonbori', lemma: '道頓堀', lemmaReading: 'どうとんぼり' },
          { text: '明るい', reading: 'あかるい', meaning: 'luminoso, claro' },
          { text: '看板を', reading: 'かんばんを', meaning: 'letreiro (+ partícula de objeto)' },
          { text: '見ながら', reading: 'みながら', meaning: 'enquanto via', lemma: '見る', lemmaReading: 'みる' },
          { text: '歩きました。', reading: 'あるきました。', meaning: 'caminhei', lemma: '歩く', lemmaReading: 'あるく' },
        ],
        translation: 'À noite, caminhei vendo os letreiros luminosos de Dotonbori.',
      },
      {
        words: [
          { text: '短い', reading: 'みじかい', meaning: 'curto' },
          { text: '旅行でしたが、', reading: 'りょこうでしたが、', meaning: 'foi uma viagem, mas', lemma: '旅行', lemmaReading: 'りょこう' },
          { text: '楽しかったです。', reading: 'たのしかったです。', meaning: 'foi divertido', lemma: '楽しい', lemmaReading: 'たのしい' },
        ],
        translation: 'Foi uma viagem curta, mas divertida.',
      },
    ],
  },
  {
    id: 'n3-gomi',
    title: 'ごみの 出し方',
    level: 3,
    wordCount: 34,
    summaryPt: 'Quem chega ao Japão se surpreende com a separação do lixo: os dias de cada tipo e as regras.',
    lines: [
      {
        words: [
          { text: '日本に', reading: 'にほんに', meaning: 'ao Japão', lemma: '日本', lemmaReading: 'にほん' },
          { text: '来て、', reading: 'きて、', meaning: 'vim, e', lemma: '来る', lemmaReading: 'くる' },
          { text: 'ごみの', meaning: 'do lixo', lemma: 'ごみ' },
          { text: '出し方に', reading: 'だしかたに', meaning: 'com o jeito de pôr para fora', lemma: '出し方', lemmaReading: 'だしかた' },
          { text: 'びっくりしました。', meaning: 'me surpreendi', lemma: 'びっくりする' },
        ],
        translation: 'Quando vim para o Japão, me surpreendi com o jeito de jogar o lixo fora.',
      },
      {
        words: [
          { text: 'ごみを', meaning: 'lixo (+ partícula de objeto)' },
          { text: '種類で', reading: 'しゅるいで', meaning: 'por tipo', lemma: '種類', lemmaReading: 'しゅるい' },
          { text: '分けなければ', reading: 'わけなければ', meaning: 'se não separar', lemma: '分ける', lemmaReading: 'わける' },
          { text: 'なりません。', meaning: '(é obrigatório: "não pode deixar de")', lemma: 'なる' },
        ],
        translation: 'É preciso separar o lixo por tipo.',
      },
      {
        words: [
          { text: '燃える', reading: 'もえる', meaning: 'que queima, combustível' },
          { text: 'ごみは', meaning: 'o lixo (+ partícula de tópico)' },
          { text: '月曜日と', reading: 'げつようびと', meaning: 'segunda-feira e', lemma: '月曜日', lemmaReading: 'げつようび' },
          { text: '木曜日です。', reading: 'もくようびです。', meaning: 'é quinta-feira', lemma: '木曜日', lemmaReading: 'もくようび' },
        ],
        translation: 'O lixo combustível sai na segunda e na quinta.',
      },
      {
        words: [
          { text: 'ペットボトルと', meaning: 'garrafa PET e', lemma: 'ペットボトル' },
          { text: '缶は', reading: 'かんは', meaning: 'lata (+ partícula de tópico)' },
          { text: '水曜日に', reading: 'すいようびに', meaning: 'na quarta-feira', lemma: '水曜日', lemmaReading: 'すいようび' },
          { text: '出します。', reading: 'だします。', meaning: 'põe para fora', lemma: '出す', lemmaReading: 'だす' },
        ],
        translation: 'Garrafas PET e latas saem na quarta.',
      },
      {
        words: [
          { text: 'ペットボトルは', meaning: 'a garrafa PET', lemma: 'ペットボトル' },
          { text: 'キャップを', meaning: 'tampa (+ partícula de objeto)' },
          { text: '外して、', reading: 'はずして、', meaning: 'tira, e', lemma: '外す', lemmaReading: 'はずす' },
          { text: '中を', reading: 'なかを', meaning: 'por dentro (+ partícula de objeto)' },
          { text: '洗います。', reading: 'あらいます。', meaning: 'lava', lemma: '洗う', lemmaReading: 'あらう' },
        ],
        translation: 'Da garrafa PET, tira-se a tampa e lava-se por dentro.',
      },
      {
        words: [
          { text: 'ごみは', meaning: 'o lixo (+ partícula de tópico)' },
          { text: '朝', reading: 'あさ', meaning: 'de manhã' },
          { text: '八時までに', reading: 'はちじまでに', meaning: 'até as oito horas', lemma: '八時', lemmaReading: 'はちじ' },
          { text: '出して', reading: 'だして', meaning: 'ponha para fora', lemma: '出す', lemmaReading: 'だす' },
          { text: 'ください。', meaning: 'por favor' },
        ],
        translation: 'Ponha o lixo para fora até as oito da manhã.',
      },
      {
        words: [
          { text: '間違えると、', reading: 'まちがえると、', meaning: 'se errar', lemma: '間違える', lemmaReading: 'まちがえる' },
          { text: 'ごみが', meaning: 'lixo (+ partícula de sujeito)' },
          { text: '残ります。', reading: 'のこります。', meaning: 'fica, sobra', lemma: '残る', lemmaReading: 'のこる' },
        ],
        translation: 'Se você errar, o lixo fica lá (não é recolhido).',
      },
      {
        words: [
          { text: '最初は', reading: 'さいしょは', meaning: 'no começo (+ partícula de tópico)' },
          { text: '大変でしたが、', reading: 'たいへんでしたが、', meaning: 'foi difícil, mas', lemma: '大変', lemmaReading: 'たいへん' },
          { text: '今は', reading: 'いまは', meaning: 'agora (+ partícula de tópico)' },
          { text: 'もう', meaning: 'já' },
          { text: '慣れました。', reading: 'なれました。', meaning: 'me acostumei', lemma: '慣れる', lemmaReading: 'なれる' },
        ],
        translation: 'No começo foi difícil, mas agora já me acostumei.',
      },
      {
        words: [
          { text: 'みんなが', meaning: 'todos (+ partícula de sujeito)' },
          { text: 'ルールを', meaning: 'regra (+ partícula de objeto)' },
          { text: '守るので、', reading: 'まもるので、', meaning: 'como respeitam', lemma: '守る', lemmaReading: 'まもる' },
          { text: '町が', reading: 'まちが', meaning: 'cidade (+ partícula de sujeito)' },
          { text: 'きれいです。', meaning: 'é limpa', lemma: 'きれい' },
        ],
        translation: 'Como todos respeitam as regras, a cidade é limpa.',
      },
    ],
  },
  {
    id: 'n3-hanami',
    title: 'お花見',
    level: 3,
    wordCount: 44,
    summaryPt: 'Um hanami com o pessoal da empresa: guardar lugar cedo, comer debaixo das cerejeiras e as pétalas caindo.',
    lines: [
      {
        words: [
          { text: '四月の', reading: 'しがつの', meaning: 'de abril', lemma: '四月', lemmaReading: 'しがつ' },
          { text: '初めに、', reading: 'はじめに、', meaning: 'no começo', lemma: '初め', lemmaReading: 'はじめ' },
          { text: '会社の', reading: 'かいしゃの', meaning: 'da empresa', lemma: '会社', lemmaReading: 'かいしゃ' },
          { text: '人たちと', reading: 'ひとたちと', meaning: 'com as pessoas', lemma: '人たち', lemmaReading: 'ひとたち' },
          { text: 'お花見を', reading: 'おはなみを', meaning: 'hanami, ver as cerejeiras (+ partícula de objeto)' },
          { text: 'しました。', meaning: 'fiz', lemma: 'する' },
        ],
        translation: 'No começo de abril, fiz hanami com o pessoal da empresa.',
      },
      {
        words: [
          { text: '朝', reading: 'あさ', meaning: 'de manhã' },
          { text: '早く', reading: 'はやく', meaning: 'cedo', lemma: '早い', lemmaReading: 'はやい' },
          { text: '公園に', reading: 'こうえんに', meaning: 'ao parque', lemma: '公園', lemmaReading: 'こうえん' },
          { text: '行って、', reading: 'いって、', meaning: 'fui, e', lemma: '行く', lemmaReading: 'いく' },
          { text: '場所を', reading: 'ばしょを', meaning: 'lugar (+ partícula de objeto)' },
          { text: '取りました。', reading: 'とりました。', meaning: 'guardei, reservei', lemma: '取る', lemmaReading: 'とる' },
        ],
        translation: 'Fui cedo ao parque e guardei um lugar.',
      },
      {
        words: [
          { text: '桜の', reading: 'さくらの', meaning: 'da cerejeira', lemma: '桜', lemmaReading: 'さくら' },
          { text: '木の', reading: 'きの', meaning: 'da árvore', lemma: '木', lemmaReading: 'き' },
          { text: '下に', reading: 'したに', meaning: 'embaixo', lemma: '下', lemmaReading: 'した' },
          { text: 'シートを', meaning: 'lona (+ partícula de objeto)' },
          { text: '敷きます。', reading: 'しきます。', meaning: 'estende-se', lemma: '敷く', lemmaReading: 'しく' },
        ],
        translation: 'Estende-se uma lona embaixo das cerejeiras.',
      },
      {
        words: [
          { text: '昼から', reading: 'ひるから', meaning: 'a partir do meio-dia', lemma: '昼', lemmaReading: 'ひる' },
          { text: 'みんなが', meaning: 'todos (+ partícula de sujeito)' },
          { text: '来て、', reading: 'きて、', meaning: 'vieram, e', lemma: '来る', lemmaReading: 'くる' },
          { text: 'お弁当を', reading: 'おべんとうを', meaning: 'marmita, bentô (+ partícula de objeto)' },
          { text: '食べたり、', reading: 'たべたり、', meaning: 'comer (entre outras coisas)', lemma: '食べる', lemmaReading: 'たべる' },
          { text: '話したり', reading: 'はなしたり', meaning: 'conversar (entre outras coisas)', lemma: '話す', lemmaReading: 'はなす' },
          { text: 'しました。', meaning: 'fizemos', lemma: 'する' },
        ],
        translation: 'A partir do meio-dia todos chegaram, e ficamos comendo bentô, conversando…',
      },
      {
        words: [
          { text: '風が', reading: 'かぜが', meaning: 'vento (+ partícula de sujeito)' },
          { text: '吹くと、', reading: 'ふくと、', meaning: 'quando sopra', lemma: '吹く', lemmaReading: 'ふく' },
          { text: '花びらが', reading: 'はなびらが', meaning: 'pétala (+ partícula de sujeito)' },
          { text: '雪のように', reading: 'ゆきのように', meaning: 'como neve', lemma: '雪', lemmaReading: 'ゆき' },
          { text: '落ちて', reading: 'おちて', meaning: 'caindo', lemma: '落ちる', lemmaReading: 'おちる' },
          { text: 'きました。', meaning: 'vinham', lemma: 'くる' },
        ],
        translation: 'Quando o vento soprava, as pétalas caíam como neve.',
      },
      {
        words: [
          { text: '部長が', reading: 'ぶちょうが', meaning: 'o chefe do departamento (+ partícula de sujeito)' },
          { text: '歌を', reading: 'うたを', meaning: 'canção (+ partícula de objeto)' },
          { text: '歌って、', reading: 'うたって、', meaning: 'cantou, e', lemma: '歌う', lemmaReading: 'うたう' },
          { text: 'みんなで', meaning: 'todos juntos', lemma: 'みんな' },
          { text: '笑いました。', reading: 'わらいました。', meaning: 'rimos', lemma: '笑う', lemmaReading: 'わらう' },
        ],
        translation: 'O chefe cantou uma música, e todos riram juntos.',
      },
      {
        words: [
          { text: '夜の', reading: 'よるの', meaning: 'da noite', lemma: '夜', lemmaReading: 'よる' },
          { text: '桜も', reading: 'さくらも', meaning: 'as cerejeiras também', lemma: '桜', lemmaReading: 'さくら' },
          { text: 'ライトが', meaning: 'luz, holofote (+ partícula de sujeito)' },
          { text: '当たって、', reading: 'あたって、', meaning: 'iluminadas, e', lemma: '当たる', lemmaReading: 'あたる' },
          { text: 'きれいでした。', meaning: 'estavam bonitas', lemma: 'きれい' },
        ],
        translation: 'À noite, com as luzes, as cerejeiras também estavam lindas.',
      },
      {
        words: [
          { text: '桜は', reading: 'さくらは', meaning: 'a cerejeira (+ partícula de tópico)' },
          { text: '一週間ぐらいで', reading: 'いっしゅうかんぐらいで', meaning: 'em cerca de uma semana', lemma: '一週間', lemmaReading: 'いっしゅうかん' },
          { text: '散って', reading: 'ちって', meaning: 'perder as flores', lemma: '散る', lemmaReading: 'ちる' },
          { text: 'しまいます。', meaning: '(acaba — e é uma pena)', lemma: 'しまう' },
        ],
        translation: 'Em cerca de uma semana, as flores das cerejeiras caem.',
      },
      {
        words: [
          { text: '短い', reading: 'みじかい', meaning: 'curto' },
          { text: '時間だから、', reading: 'じかんだから、', meaning: 'como é um tempo', lemma: '時間', lemmaReading: 'じかん' },
          { text: 'みんな', meaning: 'todos' },
          { text: '大切に', reading: 'たいせつに', meaning: 'com carinho, dando valor', lemma: '大切', lemmaReading: 'たいせつ' },
          { text: '見ます。', reading: 'みます。', meaning: 'olham, apreciam', lemma: '見る', lemmaReading: 'みる' },
        ],
        translation: 'Como dura pouco, todos as apreciam com carinho.',
      },
    ],
  },
  {
    id: 'n3-kaisha',
    title: '会社の 一日',
    level: 3,
    wordCount: 43,
    summaryPt: 'Um dia de trabalho em Tóquio: o trem lotado, reuniões, almoço com colegas e a frase de quem sai antes.',
    lines: [
      {
        words: [
          { text: '私は', reading: 'わたしは', meaning: 'eu (+ partícula de tópico)', lemma: '私', lemmaReading: 'わたし' },
          { text: '東京の', reading: 'とうきょうの', meaning: 'de Tóquio', lemma: '東京', lemmaReading: 'とうきょう' },
          { text: '会社で', reading: 'かいしゃで', meaning: 'numa empresa', lemma: '会社', lemmaReading: 'かいしゃ' },
          { text: '働いて', reading: 'はたらいて', meaning: 'trabalhando', lemma: '働く', lemmaReading: 'はたらく' },
          { text: 'います。', meaning: 'estou', lemma: 'いる' },
        ],
        translation: 'Eu trabalho numa empresa em Tóquio.',
      },
      {
        words: [
          { text: '毎朝', reading: 'まいあさ', meaning: 'toda manhã' },
          { text: '七時半の', reading: 'しちじはんの', meaning: 'das sete e meia', lemma: '七時半', lemmaReading: 'しちじはん' },
          { text: '電車に', reading: 'でんしゃに', meaning: 'no trem', lemma: '電車', lemmaReading: 'でんしゃ' },
          { text: '乗ります。', reading: 'のります。', meaning: 'embarco, pego', lemma: '乗る', lemmaReading: 'のる' },
        ],
        translation: 'Toda manhã pego o trem das sete e meia.',
      },
      {
        words: [
          { text: '電車は', reading: 'でんしゃは', meaning: 'o trem (+ partícula de tópico)' },
          { text: 'いつも', meaning: 'sempre' },
          { text: '人が', reading: 'ひとが', meaning: 'pessoa (+ partícula de sujeito)' },
          { text: '多くて、', reading: 'おおくて、', meaning: 'são muitas, e', lemma: '多い', lemmaReading: 'おおい' },
          { text: '座れません。', reading: 'すわれません。', meaning: 'não consigo sentar', lemma: '座る', lemmaReading: 'すわる' },
        ],
        translation: 'O trem está sempre cheio, e não consigo sentar.',
      },
      {
        words: [
          { text: '会社に', reading: 'かいしゃに', meaning: 'à empresa', lemma: '会社', lemmaReading: 'かいしゃ' },
          { text: '着いたら、', reading: 'ついたら、', meaning: 'quando chego', lemma: '着く', lemmaReading: 'つく' },
          { text: 'まず', meaning: 'primeiro' },
          { text: 'メールを', meaning: 'e-mail (+ partícula de objeto)' },
          { text: '読みます。', reading: 'よみます。', meaning: 'leio', lemma: '読む', lemmaReading: 'よむ' },
        ],
        translation: 'Quando chego à empresa, primeiro leio os e-mails.',
      },
      {
        words: [
          { text: '十時から', reading: 'じゅうじから', meaning: 'a partir das dez', lemma: '十時', lemmaReading: 'じゅうじ' },
          { text: '会議が', reading: 'かいぎが', meaning: 'reunião (+ partícula de sujeito)' },
          { text: 'あります。', meaning: 'há, tem', lemma: 'ある' },
        ],
        translation: 'Às dez tem reunião.',
      },
      {
        words: [
          { text: '昼休みは', reading: 'ひるやすみは', meaning: 'o intervalo do almoço (+ partícula de tópico)' },
          { text: '同僚と', reading: 'どうりょうと', meaning: 'com colegas', lemma: '同僚', lemmaReading: 'どうりょう' },
          { text: '近くの', reading: 'ちかくの', meaning: 'próximo, ali perto', lemma: '近く', lemmaReading: 'ちかく' },
          { text: '店で', reading: 'みせで', meaning: 'num restaurante, numa loja', lemma: '店', lemmaReading: 'みせ' },
          { text: 'ラーメンを', meaning: 'lámen (+ partícula de objeto)' },
          { text: '食べます。', reading: 'たべます。', meaning: 'como', lemma: '食べる', lemmaReading: 'たべる' },
        ],
        translation: 'No almoço, como lámen com os colegas num restaurante ali perto.',
      },
      {
        words: [
          { text: '午後は', reading: 'ごごは', meaning: 'à tarde (+ partícula de tópico)' },
          { text: '資料を', reading: 'しりょうを', meaning: 'documentos, material (+ partícula de objeto)' },
          { text: '作ったり、', reading: 'つくったり、', meaning: 'preparar (entre outras coisas)', lemma: '作る', lemmaReading: 'つくる' },
          { text: '電話を', reading: 'でんわを', meaning: 'telefone (+ partícula de objeto)' },
          { text: 'かけたり', meaning: 'ligar (entre outras coisas)', lemma: 'かける' },
          { text: 'します。', meaning: 'faço', lemma: 'する' },
        ],
        translation: 'À tarde, preparo documentos, faço ligações…',
      },
      {
        words: [
          { text: '仕事は', reading: 'しごとは', meaning: 'o trabalho (+ partícula de tópico)' },
          { text: '六時に', reading: 'ろくじに', meaning: 'às seis', lemma: '六時', lemmaReading: 'ろくじ' },
          { text: '終わりますが、', reading: 'おわりますが、', meaning: 'termina, mas', lemma: '終わる', lemmaReading: 'おわる' },
          { text: '残業の', reading: 'ざんぎょうの', meaning: 'de hora extra', lemma: '残業', lemmaReading: 'ざんぎょう' },
          { text: '日も', reading: 'ひも', meaning: 'dias também', lemma: '日', lemmaReading: 'ひ' },
          { text: 'あります。', meaning: 'há', lemma: 'ある' },
        ],
        translation: 'O expediente termina às seis, mas também há dias de hora extra.',
      },
      {
        words: [
          { text: '帰る', reading: 'かえる', meaning: 'voltar para casa' },
          { text: '前に、', reading: 'まえに、', meaning: 'antes de', lemma: '前', lemmaReading: 'まえ' },
          { text: 'みんなに', meaning: 'para todos', lemma: 'みんな' },
          { text: '「お先に', reading: '「おさきに', meaning: 'antes (de vocês)', lemma: 'お先に', lemmaReading: 'おさきに' },
          { text: '失礼します」と', reading: 'しつれいします」と', meaning: '"com licença" (me retiro)', lemma: '失礼します', lemmaReading: 'しつれいします' },
          { text: '言います。', reading: 'いいます。', meaning: 'digo', lemma: '言う', lemmaReading: 'いう' },
        ],
        translation: 'Antes de ir embora, digo a todos: "com licença, vou na frente".',
      },
    ],
  },
  {
    id: 'n3-nihongo',
    title: '日本語の 勉強',
    level: 3,
    wordCount: 31,
    summaryPt: 'Um ano estudando japonês: do hiragana aos primeiros livros, a vergonha de errar e o conselho da professora.',
    lines: [
      {
        words: [
          { text: '私は', reading: 'わたしは', meaning: 'eu (+ partícula de tópico)', lemma: '私', lemmaReading: 'わたし' },
          { text: '一年前から', reading: 'いちねんまえから', meaning: 'desde um ano atrás', lemma: '一年前', lemmaReading: 'いちねんまえ' },
          { text: '日本語を', reading: 'にほんごを', meaning: 'japonês (+ partícula de objeto)' },
          { text: '勉強して', reading: 'べんきょうして', meaning: 'estudando', lemma: '勉強する', lemmaReading: 'べんきょうする' },
          { text: 'います。', meaning: 'estou', lemma: 'いる' },
        ],
        translation: 'Estudo japonês há um ano.',
      },
      {
        words: [
          { text: '最初は', reading: 'さいしょは', meaning: 'no começo (+ partícula de tópico)' },
          { text: 'ひらがなも', meaning: 'nem o hiragana', lemma: 'ひらがな' },
          { text: '読めませんでした。', reading: 'よめませんでした。', meaning: 'não conseguia ler', lemma: '読む', lemmaReading: 'よむ' },
        ],
        translation: 'No começo, não conseguia ler nem o hiragana.',
      },
      {
        words: [
          { text: '今は', reading: 'いまは', meaning: 'agora (+ partícula de tópico)' },
          { text: '簡単な', reading: 'かんたんな', meaning: 'simples, fácil', lemma: '簡単', lemmaReading: 'かんたん' },
          { text: '本なら', reading: 'ほんなら', meaning: 'se for livro', lemma: '本', lemmaReading: 'ほん' },
          { text: '読めます。', reading: 'よめます。', meaning: 'consigo ler', lemma: '読む', lemmaReading: 'よむ' },
        ],
        translation: 'Agora, se for um livro simples, consigo ler.',
      },
      {
        words: [
          { text: '毎日', reading: 'まいにち', meaning: 'todos os dias' },
          { text: 'アプリで', meaning: 'pelo aplicativo', lemma: 'アプリ' },
          { text: '単語を', reading: 'たんごを', meaning: 'palavra, vocabulário (+ partícula de objeto)' },
          { text: '覚えます。', reading: 'おぼえます。', meaning: 'memorizo', lemma: '覚える', lemmaReading: 'おぼえる' },
        ],
        translation: 'Todos os dias memorizo palavras pelo aplicativo.',
      },
      {
        words: [
          { text: '漢字は', reading: 'かんじは', meaning: 'os kanji (+ partícula de tópico)' },
          { text: '難しいですが、', reading: 'むずかしいですが、', meaning: 'são difíceis, mas', lemma: '難しい', lemmaReading: 'むずかしい' },
          { text: '少しずつ', reading: 'すこしずつ', meaning: 'aos poucos' },
          { text: '覚えて', reading: 'おぼえて', meaning: 'memorizando', lemma: '覚える', lemmaReading: 'おぼえる' },
          { text: 'います。', meaning: 'estou', lemma: 'いる' },
        ],
        translation: 'Os kanji são difíceis, mas estou aprendendo aos poucos.',
      },
      {
        words: [
          { text: '一番', reading: 'いちばん', meaning: 'o mais' },
          { text: '難しいのは、', reading: 'むずかしいのは、', meaning: 'o que é difícil', lemma: '難しい', lemmaReading: 'むずかしい' },
          { text: '話す', reading: 'はなす', meaning: 'falar' },
          { text: 'ことです。', meaning: 'é (o ato de)', lemma: 'こと' },
        ],
        translation: 'O mais difícil é falar.',
      },
      {
        words: [
          { text: '間違えるのが', reading: 'まちがえるのが', meaning: 'errar (+ partícula de sujeito)', lemma: '間違える', lemmaReading: 'まちがえる' },
          { text: '恥ずかしくて、', reading: 'はずかしくて、', meaning: 'dá vergonha, e', lemma: '恥ずかしい', lemmaReading: 'はずかしい' },
          { text: 'なかなか', meaning: 'custa a (com negativa: não… fácil)' },
          { text: '話せません。', reading: 'はなせません。', meaning: 'não consigo falar', lemma: '話す', lemmaReading: 'はなす' },
        ],
        translation: 'Tenho vergonha de errar e não consigo falar com facilidade.',
      },
      {
        words: [
          { text: 'でも、', meaning: 'mas' },
          { text: '先生は', reading: 'せんせいは', meaning: 'a professora (+ partícula de tópico)' },
          { text: '「間違えても', reading: '「まちがえても', meaning: 'mesmo errando', lemma: '間違える', lemmaReading: 'まちがえる' },
          { text: '大丈夫」と', reading: 'だいじょうぶ」と', meaning: '"tudo bem" (+ citação)', lemma: '大丈夫', lemmaReading: 'だいじょうぶ' },
          { text: '言いました。', reading: 'いいました。', meaning: 'disse', lemma: '言う', lemmaReading: 'いう' },
        ],
        translation: 'Mas a professora disse: "tudo bem errar".',
      },
      {
        words: [
          { text: '来年は', reading: 'らいねんは', meaning: 'ano que vem (+ partícula de tópico)' },
          { text: '日本へ', reading: 'にほんへ', meaning: 'para o Japão', lemma: '日本', lemmaReading: 'にほん' },
          { text: '行って、', reading: 'いって、', meaning: 'ir, e', lemma: '行く', lemmaReading: 'いく' },
          { text: '日本語で', reading: 'にほんごで', meaning: 'em japonês', lemma: '日本語', lemmaReading: 'にほんご' },
          { text: '話したいです。', reading: 'はなしたいです。', meaning: 'quero falar', lemma: '話す', lemmaReading: 'はなす' },
        ],
        translation: 'Ano que vem quero ir ao Japão e conversar em japonês.',
      },
    ],
  },
  {
    id: 'n3-kissaten',
    title: '雨の 日の 喫茶店',
    level: 3,
    wordCount: 41,
    summaryPt: 'Um dia de chuva sem guarda-chuva, um café antigo e a conversa com uma senhora que frequenta o lugar há 40 anos.',
    lines: [
      {
        words: [
          { text: '朝から', reading: 'あさから', meaning: 'desde a manhã', lemma: '朝', lemmaReading: 'あさ' },
          { text: '雨が', reading: 'あめが', meaning: 'chuva (+ partícula de sujeito)' },
          { text: '降って', reading: 'ふって', meaning: 'caindo', lemma: '降る', lemmaReading: 'ふる' },
          { text: 'いました。', meaning: 'estava', lemma: 'いる' },
        ],
        translation: 'Chovia desde a manhã.',
      },
      {
        words: [
          { text: '傘を', reading: 'かさを', meaning: 'guarda-chuva (+ partícula de objeto)' },
          { text: '忘れたので、', reading: 'わすれたので、', meaning: 'como esqueci', lemma: '忘れる', lemmaReading: 'わすれる' },
          { text: '駅の', reading: 'えきの', meaning: 'da estação', lemma: '駅', lemmaReading: 'えき' },
          { text: '近くの', reading: 'ちかくの', meaning: 'perto', lemma: '近く', lemmaReading: 'ちかく' },
          { text: '喫茶店に', reading: 'きっさてんに', meaning: 'num café (cafeteria)', lemma: '喫茶店', lemmaReading: 'きっさてん' },
          { text: '入りました。', reading: 'はいりました。', meaning: 'entrei', lemma: '入る', lemmaReading: 'はいる' },
        ],
        translation: 'Como esqueci o guarda-chuva, entrei num café perto da estação.',
      },
      {
        words: [
          { text: '古くて', reading: 'ふるくて', meaning: 'antigo, e', lemma: '古い', lemmaReading: 'ふるい' },
          { text: '小さい', reading: 'ちいさい', meaning: 'pequeno' },
          { text: '店でしたが、', reading: 'みせでしたが、', meaning: 'era um lugar, mas', lemma: '店', lemmaReading: 'みせ' },
          { text: '静かで', reading: 'しずかで', meaning: 'tranquilo, e', lemma: '静か', lemmaReading: 'しずか' },
          { text: '落ち着きました。', reading: 'おちつきました。', meaning: 'me senti à vontade', lemma: '落ち着く', lemmaReading: 'おちつく' },
        ],
        translation: 'Era um lugar velho e pequeno, mas tranquilo e aconchegante.',
      },
      {
        words: [
          { text: 'マスターが', meaning: 'o dono do café (+ partícula de sujeito)' },
          { text: 'ゆっくり', meaning: 'com calma' },
          { text: 'コーヒーを', meaning: 'café (+ partícula de objeto)' },
          { text: 'いれて', meaning: 'preparando (passar café)', lemma: 'いれる' },
          { text: 'くれました。', meaning: '(fez isso) para mim', lemma: 'くれる' },
        ],
        translation: 'O dono preparou um café para mim, com calma.',
      },
      {
        words: [
          { text: '窓の', reading: 'まどの', meaning: 'da janela', lemma: '窓', lemmaReading: 'まど' },
          { text: '外を', reading: 'そとを', meaning: 'lá fora (+ partícula de trajeto)' },
          { text: '歩く', reading: 'あるく', meaning: 'andar (que anda)' },
          { text: '人を', reading: 'ひとを', meaning: 'pessoa (+ partícula de objeto)' },
          { text: '見ながら、', reading: 'みながら、', meaning: 'enquanto olhava', lemma: '見る', lemmaReading: 'みる' },
          { text: '本を', reading: 'ほんを', meaning: 'livro (+ partícula de objeto)' },
          { text: '読みました。', reading: 'よみました。', meaning: 'li', lemma: '読む', lemmaReading: 'よむ' },
        ],
        translation: 'Li um livro enquanto olhava as pessoas passando lá fora.',
      },
      {
        words: [
          { text: 'となりの', meaning: 'do lado', lemma: 'となり' },
          { text: '席の', reading: 'せきの', meaning: 'do assento', lemma: '席', lemmaReading: 'せき' },
          { text: 'おばあさんが', meaning: 'senhora idosa (+ partícula de sujeito)' },
          { text: '話しかけて', reading: 'はなしかけて', meaning: 'puxando conversa', lemma: '話しかける', lemmaReading: 'はなしかける' },
          { text: 'きました。', meaning: 'veio', lemma: 'くる' },
        ],
        translation: 'A senhora da mesa ao lado puxou conversa comigo.',
      },
      {
        words: [
          { text: 'おばあさんは', meaning: 'a senhora', lemma: 'おばあさん' },
          { text: 'この', meaning: 'este' },
          { text: '店に', reading: 'みせに', meaning: 'a este lugar', lemma: '店', lemmaReading: 'みせ' },
          { text: '四十年', reading: 'よんじゅうねん', meaning: 'há quarenta anos' },
          { text: '通って', reading: 'かよって', meaning: 'frequentando', lemma: '通う', lemmaReading: 'かよう' },
          { text: 'いるそうです。', meaning: 'dizem que está (pelo que ela contou)', lemma: 'いる' },
        ],
        translation: 'Pelo que ela contou, frequenta este café há quarenta anos.',
      },
      {
        words: [
          { text: '一時間ぐらい', reading: 'いちじかんぐらい', meaning: 'cerca de uma hora', lemma: '一時間', lemmaReading: 'いちじかん' },
          { text: '話して、', reading: 'はなして、', meaning: 'conversamos, e', lemma: '話す', lemmaReading: 'はなす' },
          { text: '雨が', reading: 'あめが', meaning: 'chuva (+ partícula de sujeito)' },
          { text: '止みました。', reading: 'やみました。', meaning: 'parou', lemma: '止む', lemmaReading: 'やむ' },
        ],
        translation: 'Conversamos por cerca de uma hora, e a chuva parou.',
      },
      {
        words: [
          { text: '雨の', reading: 'あめの', meaning: 'de chuva', lemma: '雨', lemmaReading: 'あめ' },
          { text: '日も', reading: 'ひも', meaning: 'dia também', lemma: '日', lemmaReading: 'ひ' },
          { text: '悪くないと', reading: 'わるくないと', meaning: 'que não é ruim', lemma: '悪い', lemmaReading: 'わるい' },
          { text: '思いました。', reading: 'おもいました。', meaning: 'pensei', lemma: '思う', lemmaReading: 'おもう' },
        ],
        translation: 'Pensei que dia de chuva também não é tão ruim.',
      },
    ],
  },
  {
    id: 'n3-shougatsu',
    title: 'お正月',
    level: 3,
    wordCount: 45,
    summaryPt: 'O Ano-Novo japonês: soba no último dia do ano, a visita ao santuário, otoshidama e os cartões de ano-novo.',
    lines: [
      {
        words: [
          { text: '日本の', reading: 'にほんの', meaning: 'do Japão', lemma: '日本', lemmaReading: 'にほん' },
          { text: 'お正月は', reading: 'おしょうがつは', meaning: 'o Ano-Novo (+ partícula de tópico)' },
          { text: '一年で', reading: 'いちねんで', meaning: 'no ano', lemma: '一年', lemmaReading: 'いちねん' },
          { text: '一番', reading: 'いちばん', meaning: 'o mais' },
          { text: '大切な', reading: 'たいせつな', meaning: 'importante', lemma: '大切', lemmaReading: 'たいせつ' },
          { text: '行事です。', reading: 'ぎょうじです。', meaning: 'é o evento, a celebração', lemma: '行事', lemmaReading: 'ぎょうじ' },
        ],
        translation: 'O Ano-Novo é a celebração mais importante do ano no Japão.',
      },
      {
        words: [
          { text: '大晦日の', reading: 'おおみそかの', meaning: 'do último dia do ano', lemma: '大晦日', lemmaReading: 'おおみそか' },
          { text: '夜は', reading: 'よるは', meaning: 'à noite (+ partícula de tópico)' },
          { text: '家族で', reading: 'かぞくで', meaning: 'em família', lemma: '家族', lemmaReading: 'かぞく' },
          { text: 'そばを', meaning: 'soba, macarrão de trigo-sarraceno (+ partícula de objeto)' },
          { text: '食べます。', reading: 'たべます。', meaning: 'come-se', lemma: '食べる', lemmaReading: 'たべる' },
        ],
        translation: 'Na noite do último dia do ano, a família come soba.',
      },
      {
        words: [
          { text: 'そばは', meaning: 'o soba (+ partícula de tópico)' },
          { text: '長いので、', reading: 'ながいので、', meaning: 'como é comprido', lemma: '長い', lemmaReading: 'ながい' },
          { text: '「長生き」の', reading: '「ながいき」の', meaning: 'de "vida longa"', lemma: '長生き', lemmaReading: 'ながいき' },
          { text: '意味が', reading: 'いみが', meaning: 'significado (+ partícula de sujeito)' },
          { text: 'あります。', meaning: 'há, tem', lemma: 'ある' },
        ],
        translation: 'Como o soba é comprido, simboliza "vida longa".',
      },
      {
        words: [
          { text: '一月一日には', reading: 'いちがつついたちには', meaning: 'no dia 1º de janeiro', lemma: '一月一日', lemmaReading: 'いちがつついたち' },
          { text: '神社へ', reading: 'じんじゃへ', meaning: 'ao santuário xintoísta', lemma: '神社', lemmaReading: 'じんじゃ' },
          { text: '初詣に', reading: 'はつもうでに', meaning: 'para a primeira visita do ano', lemma: '初詣', lemmaReading: 'はつもうで' },
          { text: '行きます。', reading: 'いきます。', meaning: 'vai-se', lemma: '行く', lemmaReading: 'いく' },
        ],
        translation: 'No dia 1º de janeiro, vai-se ao santuário para a primeira visita do ano (hatsumōde).',
      },
      {
        words: [
          { text: '新しい', reading: 'あたらしい', meaning: 'novo' },
          { text: '年の', reading: 'としの', meaning: 'do ano', lemma: '年', lemmaReading: 'とし' },
          { text: 'お願いを', reading: 'おねがいを', meaning: 'pedido (+ partícula de objeto)' },
          { text: 'して、', meaning: 'faz, e', lemma: 'する' },
          { text: 'おみくじを', meaning: 'omikuji, papel da sorte (+ partícula de objeto)' },
          { text: '引きます。', reading: 'ひきます。', meaning: 'tira', lemma: '引く', lemmaReading: 'ひく' },
        ],
        translation: 'Faz-se um pedido para o novo ano e tira-se um omikuji.',
      },
      {
        words: [
          { text: '子供たちは', reading: 'こどもたちは', meaning: 'as crianças', lemma: '子供', lemmaReading: 'こども' },
          { text: 'お年玉を', reading: 'おとしだまを', meaning: 'otoshidama, dinheiro de Ano-Novo (+ partícula de objeto)' },
          { text: 'もらって、', meaning: 'recebem, e', lemma: 'もらう' },
          { text: 'とても', meaning: 'muito' },
          { text: '喜びます。', reading: 'よろこびます。', meaning: 'ficam felizes', lemma: '喜ぶ', lemmaReading: 'よろこぶ' },
        ],
        translation: 'As crianças recebem otoshidama e ficam muito felizes.',
      },
      {
        words: [
          { text: 'お正月には', reading: 'おしょうがつには', meaning: 'no Ano-Novo', lemma: 'お正月', lemmaReading: 'おしょうがつ' },
          { text: 'おせち料理という', reading: 'おせちりょうりという', meaning: 'chamado osechi', lemma: 'おせち料理', lemmaReading: 'おせちりょうり' },
          { text: '特別な', reading: 'とくべつな', meaning: 'especial', lemma: '特別', lemmaReading: 'とくべつ' },
          { text: '料理を', reading: 'りょうりを', meaning: 'comida, prato (+ partícula de objeto)' },
          { text: '食べます。', reading: 'たべます。', meaning: 'come-se', lemma: '食べる', lemmaReading: 'たべる' },
        ],
        translation: 'No Ano-Novo come-se uma comida especial chamada osechi.',
      },
      {
        words: [
          { text: '年賀状も', reading: 'ねんがじょうも', meaning: 'cartões de Ano-Novo também', lemma: '年賀状', lemmaReading: 'ねんがじょう' },
          { text: '書きますが、', reading: 'かきますが、', meaning: 'escreve-se, mas', lemma: '書く', lemmaReading: 'かく' },
          { text: '最近は', reading: 'さいきんは', meaning: 'ultimamente (+ partícula de tópico)' },
          { text: 'メールで', meaning: 'por mensagem, e-mail', lemma: 'メール' },
          { text: '送る', reading: 'おくる', meaning: 'enviar (que envia)' },
          { text: '人も', reading: 'ひとも', meaning: 'pessoas também', lemma: '人', lemmaReading: 'ひと' },
          { text: '多いです。', reading: 'おおいです。', meaning: 'são muitas', lemma: '多い', lemmaReading: 'おおい' },
        ],
        translation: 'Também se escrevem cartões de Ano-Novo, mas hoje muita gente manda por mensagem.',
      },
      {
        words: [
          { text: '会った', reading: 'あった', meaning: 'que encontrou', lemma: '会う', lemmaReading: 'あう' },
          { text: '人には', reading: 'ひとには', meaning: 'às pessoas', lemma: '人', lemmaReading: 'ひと' },
          { text: '「あけまして', meaning: '(feliz Ano-Novo:) "o ano se abriu"', lemma: 'あけまして' },
          { text: 'おめでとう', meaning: 'parabéns, felicitações' },
          { text: 'ございます」と', meaning: '(forma polida) + citação', lemma: 'ございます' },
          { text: '言います。', reading: 'いいます。', meaning: 'diz-se', lemma: '言う', lemmaReading: 'いう' },
        ],
        translation: 'Para quem se encontra, diz-se "akemashite omedetou gozaimasu" (feliz Ano-Novo).',
      },
    ],
  },
];
