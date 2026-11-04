import { Section, Ex, Note, GrammarTable, ReadingKey } from '../components/Licao';
import { FuriganaWord } from '../components/Furigana';
import type { FraseEstruturada, QuizLicao } from '../data/quiz/types';
import type { GrupoKakitori } from '../data/kakitori/types';

/*
 * Fontes usadas só para verificar classificação e uso (nada copiado):
 * - Divisão em 擬音語/擬態語 e a de cinco tipos de Kindaichi (1978), com 擬情語
 *   para estados mentais: artigos do repositório da Universidade de Hiroshima.
 * - びっくり + に e registro em relação a おどろく: TKG Japanese Entries (tkgje.jp).
 * - Oposição entre dores (しくしく, きりきり...): gendai.media/articles/-/43552.
 */

export const meta = {
  id: 'onomatopeias',
  title: 'Onomatopeias',
  subtitle: 'オノマトペ — sons, jeitos e, principalmente, sentimentos',
  emoji: '💓',
  tags: ['vocabulário', 'conversa'],
};

export const quiz: QuizLicao = {
  frases: [
    {
      id: 'onomatope-f1',
      tokens: [
        { texto: 'いま', romaji: 'ima' },
        { texto: 'すごく', romaji: 'sugoku' },
        { texto: 'どきどきしています', romaji: 'dokidoki shite imasu' },
      ],
      pt: 'Agora estou muito nervoso(a).',
    },
    {
      id: 'onomatope-f2',
      tokens: [
        { texto: 'りょこう', romaji: 'ryokou' },
        { texto: 'の', romaji: 'no', particula: true },
        { texto: 'まえは', romaji: 'mae wa' },
        { texto: 'いつも', romaji: 'itsumo' },
        { texto: 'わくわくします', romaji: 'wakuwaku shimasu' },
      ],
      pt: 'Antes de uma viagem, sempre fico animado(a).',
    },
    {
      id: 'onomatope-f3',
      tokens: [
        { texto: 'きのうは', romaji: 'kinou wa' },
        { texto: 'しごと', romaji: 'shigoto' },
        { texto: 'で', romaji: 'de', particula: true },
        { texto: 'いらいらしました', romaji: 'iraira shimashita' },
      ],
      pt: 'Ontem fiquei irritado(a) com o trabalho.',
    },
    {
      id: 'onomatope-f4',
      tokens: [
        { texto: 'おおきい', romaji: 'ookii' },
        { texto: 'じしんに', romaji: 'jishin ni' },
        { texto: 'びっくりしました', romaji: 'bikkuri shimashita' },
      ],
      pt: 'Levei um susto com o terremoto forte.',
    },
    {
      id: 'onomatope-f5',
      tokens: [
        { texto: 'テスト', romaji: 'tesuto' },
        { texto: 'が', romaji: 'ga', particula: true },
        { texto: 'おわって', romaji: 'owatte' },
        { texto: 'ほっとしました', romaji: 'hotto shimashita' },
      ],
      pt: 'A prova acabou e fiquei aliviado(a).',
    },
    {
      id: 'onomatope-f6',
      tokens: [
        { texto: 'コンサート', romaji: 'konsaato' },
        { texto: 'が', romaji: 'ga', particula: true },
        { texto: 'なくなって', romaji: 'nakunatte' },
        { texto: 'がっかりしました', romaji: 'gakkari shimashita' },
      ],
      pt: 'O show foi cancelado e fiquei decepcionado(a).',
    },
    {
      id: 'onomatope-f7',
      tokens: [
        { texto: 'あたま', romaji: 'atama' },
        { texto: 'が', romaji: 'ga', particula: true },
        { texto: 'ずきずきします', romaji: 'zukizuki shimasu' },
      ],
      pt: 'Minha cabeça está latejando.',
    },
    {
      id: 'onomatope-f8',
      tokens: [
        { texto: 'おなか', romaji: 'onaka' },
        { texto: 'が', romaji: 'ga', particula: true },
        { texto: 'ぺこぺこです', romaji: 'pekopeko desu' },
      ],
      pt: 'Estou morrendo de fome.',
    },
    {
      id: 'onomatope-f9',
      tokens: [
        { texto: 'あめ', romaji: 'ame' },
        { texto: 'が', romaji: 'ga', particula: true },
        { texto: 'ザーザー', romaji: 'zaazaa' },
        { texto: 'ふっています', romaji: 'futte imasu' },
      ],
      pt: 'Está chovendo forte.',
    },
    {
      id: 'onomatope-f10',
      tokens: [
        { texto: 'しゅうまつは', romaji: 'shuumatsu wa' },
        { texto: 'いえ', romaji: 'ie' },
        { texto: 'で', romaji: 'de', particula: true },
        { texto: 'ごろごろします', romaji: 'gorogoro shimasu' },
      ],
      pt: 'No fim de semana fico à toa em casa.',
    },
    {
      id: 'onomatope-f11',
      tokens: [
        { texto: 'シャワー', romaji: 'shawaa' },
        { texto: 'を', romaji: 'o', particula: true },
        { texto: 'あびて', romaji: 'abite' },
        { texto: 'すっきりしました', romaji: 'sukkiri shimashita' },
      ],
      pt: 'Tomei um banho e me senti renovado(a).',
    },
    {
      id: 'onomatope-f12',
      tokens: [
        { texto: 'ねこが', romaji: 'neko ga' },
        { texto: 'ニャーニャー', romaji: 'nyaanyaa' },
        { texto: 'と', romaji: 'to', particula: true },
        { texto: 'ないています', romaji: 'naite imasu' },
      ],
      pt: 'O gato está miando.',
    },
  ],
  perguntas: [
    {
      id: 'onomatope-p1',
      tipo: 'significado',
      pergunta: 'Quais são os três grupos de onomatopeias desta lição?',
      alternativas: [
        'Sons, jeitos/estados e sentimentos',
        'Animais, pessoas e objetos',
        'Educadas, casuais e formais',
        'Hiragana, katakana e kanji',
      ],
      correta: 0,
      explicacao: 'ぎおんご (sons), ぎたいご (jeitos e estados) e ぎじょうご (sentimentos).',
    },
    {
      id: 'onomatope-p2',
      tipo: 'significado',
      pergunta: 'O que significa わくわくします?',
      alternativas: [
        'Fico animado(a), na expectativa de algo bom',
        'Fico com medo do que vem',
        'Fico irritado(a)',
        'Fico aliviado(a)',
      ],
      correta: 0,
      explicacao: 'わくわく é só positivo. Para o nervoso, ou para o frio na barriga, é どきどき.',
    },
    {
      id: 'onomatope-p3',
      tipo: 'significado',
      pergunta: 'A prova acabou e foi tudo bem. O que você diz?',
      alternativas: ['ほっとしました', 'いらいらしました', 'そわそわしています', 'がっかりしました'],
      correta: 0,
      explicacao: 'ほっと é o alívio: o ar que sai quando a tensão acaba.',
    },
    {
      id: 'onomatope-p4',
      tipo: 'significado',
      pergunta: 'Qual é a diferença entre どきどき e どきっと?',
      alternativas: [
        'どきどき continua por um tempo; どきっと é um pulo só',
        'どきどき é casual; どきっと é formal',
        'どきどき é medo; どきっと é alegria',
        'Nenhuma, são a mesma palavra',
      ],
      correta: 0,
      explicacao: 'A repetição sugere algo que continua; っと marca um instante.',
    },
    {
      id: 'onomatope-p5',
      tipo: 'significado',
      pergunta: 'A dor de cabeça lateja, no ritmo do pulso. Como dizer ao médico?',
      alternativas: ['あたまがずきずきします', 'あたまがひりひりします', 'あたまがわくわくします', 'あたまがぺこぺこです'],
      correta: 0,
      explicacao: 'ずきずき é a dor que pulsa; ひりひり é ardência, como a da queimadura de sol.',
    },
    {
      id: 'onomatope-p6',
      tipo: 'significado',
      pergunta: 'Assistindo a um jogo apertado, com medo de seu time perder, você sente:',
      alternativas: ['はらはら', 'のんびり', 'すっきり', 'ぐっすり'],
      correta: 0,
      explicacao: 'はらはら é a aflição de quem assiste a algo arriscado sem poder interferir.',
    },
    {
      id: 'onomatope-p7',
      tipo: 'significado',
      pergunta: 'Entre きらきら e ぎらぎら, qual descreve o sol forte e incômodo do verão?',
      alternativas: ['ぎらぎら', 'きらきら'],
      correta: 0,
      explicacao: 'O som vozeado (com ゛) tende a soar mais pesado e forte; きらきら é o brilho delicado.',
    },
    {
      id: 'onomatope-p8',
      tipo: 'significado',
      pergunta: 'Num e-mail formal ao chefe, qual é a melhor troca para びっくりしました?',
      alternativas: ['おどろきました', 'びっくりした', 'どきっとしました', 'ぺこぺこです'],
      correta: 0,
      explicacao: 'Na escrita formal, a palavra comum (おどろく) costuma substituir a onomatopeia.',
    },
    {
      id: 'onomatope-vf1',
      tipo: 'verdadeiro-falso',
      afirmacao: 'No Japão, onomatopeias são coisa de criança e os adultos evitam.',
      correta: false,
      explicacao: 'Adultos usam o tempo todo, na conversa, na publicidade e até no consultório médico.',
    },
    {
      id: 'onomatope-vf2',
      tipo: 'verdadeiro-falso',
      afirmacao: 'おなかがぺこぺこします é o jeito certo de dizer "estou com fome".',
      correta: false,
      explicacao: 'Com fome é ぺこぺこです. ぺこぺこする é curvar-se repetidamente, ou bajular.',
    },
    {
      id: 'onomatope-vf3',
      tipo: 'verdadeiro-falso',
      afirmacao: 'Mesmo quando o português diz "estou surpreso", o japonês costuma dizer びっくりしました, no passado.',
      correta: true,
      explicacao: 'O passado relata o momento em que o sentimento veio.',
    },
    {
      id: 'onomatope-vf4',
      tipo: 'verdadeiro-falso',
      afirmacao: 'Para o sentimento de outra pessoa, たなかさんはいらいらしています soa mais natural que たなかさんはいらいらします.',
      correta: true,
      explicacao: 'O que você vê de fora, em curso, pede 〜ています.',
    },
    {
      id: 'onomatope-vf5',
      tipo: 'verdadeiro-falso',
      afirmacao: 'どきどきする conjuga como する: どきどきします, どきどきしました, どきどきしています.',
      correta: true,
      explicacao: 'A onomatopeia não muda; quem conjuga é する.',
    },
  ],
};

export const kakitori: GrupoKakitori[] = [
  {
    id: 'onomatope-sentimentos',
    label: 'Onomatopeias — sentimentos',
    itens: [
      { id: 'onomatope-k1', jp: 'いま、どきどきしています。', kana: 'いま、どきどきしています。', romaji: 'ima, dokidoki shite imasu.', pt: 'Agora estou nervoso(a).' },
      { id: 'onomatope-k2', jp: 'りょこうのまえはわくわくします。', kana: 'りょこうのまえはわくわくします。', romaji: 'ryokou no mae wa wakuwaku shimasu.', pt: 'Antes de viajar, fico animado(a).' },
      { id: 'onomatope-k3', jp: 'バスがきません。いらいらします。', kana: 'バスがきません。いらいらします。', romaji: 'basu ga kimasen. iraira shimasu.', pt: 'O ônibus não vem. Fico irritado(a).' },
      { id: 'onomatope-k4', jp: 'ああ、びっくりした！', kana: 'ああ、びっくりした！', romaji: 'aa, bikkuri shita!', pt: 'Ai, que susto! (casual)' },
      { id: 'onomatope-k5', jp: 'テストがおわって、ほっとしました。', kana: 'テストがおわって、ほっとしました。', romaji: 'tesuto ga owatte, hotto shimashita.', pt: 'A prova acabou e fiquei aliviado(a).' },
      { id: 'onomatope-k6', jp: 'コンサートがなくなって、がっかりしました。', kana: 'コンサートがなくなって、がっかりしました。', romaji: 'konsaato ga nakunatte, gakkari shimashita.', pt: 'O show foi cancelado e fiquei decepcionado(a).' },
      { id: 'onomatope-k7', jp: 'おんせんでのんびりしました。', kana: 'おんせんでのんびりしました。', romaji: 'onsen de nonbiri shimashita.', pt: 'Relaxei na fonte termal.' },
      { id: 'onomatope-k8', jp: 'くよくよしないでください。', kana: 'くよくよしないでください。', romaji: 'kuyokuyo shinaide kudasai.', pt: 'Não fique remoendo isso.' },
    ],
  },
  {
    id: 'onomatope-corpo',
    label: 'Onomatopeias — sons e corpo',
    itens: [
      { id: 'onomatope-k9', jp: 'いぬがワンワンとほえています。', kana: 'いぬがワンワンとほえています。', romaji: 'inu ga wanwan to hoete imasu.', pt: 'O cachorro está latindo.' },
      { id: 'onomatope-k10', jp: 'あめがザーザーふっています。', kana: 'あめがザーザーふっています。', romaji: 'ame ga zaazaa futte imasu.', pt: 'Está chovendo forte.' },
      { id: 'onomatope-k11', jp: 'ゆうべはぐっすりねました。', kana: 'ゆうべはぐっすりねました。', romaji: 'yuube wa gussuri nemashita.', pt: 'Ontem à noite dormi profundamente.' },
      { id: 'onomatope-k12', jp: 'おなかがぺこぺこです。', kana: 'おなかがぺこぺこです。', romaji: 'onaka ga pekopeko desu.', pt: 'Estou morrendo de fome.' },
      { id: 'onomatope-k13', jp: 'あたまがずきずきします。', kana: 'あたまがずきずきします。', romaji: 'atama ga zukizuki shimasu.', pt: 'Minha cabeça está latejando.' },
      { id: 'onomatope-k14', jp: 'のどがひりひりします。', kana: 'のどがひりひりします。', romaji: 'nodo ga hirihiri shimasu.', pt: 'Minha garganta está ardendo.' },
    ],
  },
];

export const diga: FraseEstruturada[] = [
  {
    id: 'onomatope-d1',
    tokens: [
      { texto: 'めんせつ', romaji: 'mensetsu' },
      { texto: 'の', romaji: 'no', particula: true },
      { texto: 'まえは', romaji: 'mae wa' },
      { texto: 'どきどきします', romaji: 'dokidoki shimasu' },
    ],
    pt: 'Antes de uma entrevista, fico nervoso(a).',
  },
  {
    id: 'onomatope-d2',
    tokens: [
      { texto: 'らいしゅう', romaji: 'raishuu' },
      { texto: 'の', romaji: 'no', particula: true },
      { texto: 'りょこうに', romaji: 'ryokou ni' },
      { texto: 'わくわくしています', romaji: 'wakuwaku shite imasu' },
    ],
    pt: 'Estou animado(a) com a viagem da semana que vem.',
  },
  {
    id: 'onomatope-d3',
    tokens: [
      { texto: 'でんしゃ', romaji: 'densha' },
      { texto: 'に', romaji: 'ni', particula: true },
      { texto: 'まにあって', romaji: 'maniatte' },
      { texto: 'ほっとしました', romaji: 'hotto shimashita' },
    ],
    pt: 'Consegui pegar o trem a tempo e fiquei aliviado(a).',
  },
  {
    id: 'onomatope-d4',
    tokens: [
      { texto: 'たなかさんは', romaji: 'tanaka-san wa' },
      { texto: 'いらいらしています', romaji: 'iraira shite imasu' },
    ],
    pt: 'A Tanaka está irritada.',
  },
  {
    id: 'onomatope-d5',
    tokens: [
      { texto: 'おんせん', romaji: 'onsen' },
      { texto: 'で', romaji: 'de', particula: true },
      { texto: 'のんびりしました', romaji: 'nonbiri shimashita' },
    ],
    pt: 'Relaxei na fonte termal.',
  },
  {
    id: 'onomatope-d6',
    tokens: [
      { texto: 'のど', romaji: 'nodo' },
      { texto: 'が', romaji: 'ga', particula: true },
      { texto: 'ひりひりします', romaji: 'hirihiri shimasu' },
    ],
    pt: 'Minha garganta está ardendo.',
  },
  {
    id: 'onomatope-d7',
    tokens: [
      { texto: 'ゆうべは', romaji: 'yuube wa' },
      { texto: 'ぐっすり', romaji: 'gussuri' },
      { texto: 'ねました', romaji: 'nemashita' },
    ],
    pt: 'Ontem à noite dormi profundamente.',
  },
  {
    id: 'onomatope-d8',
    tokens: [
      { texto: 'くよくよ', romaji: 'kuyokuyo' },
      { texto: 'しないでください', romaji: 'shinaide kudasai' },
    ],
    pt: 'Não fique remoendo isso.',
  },
];

export default function Onomatopeias() {
  return (
    <div className="space-y-10">
      <Section title="Como ler esta lição">
        <p className="text-sm leading-relaxed text-ink">
          Todo japonês aparece em kana + romaji + tradução. A lição segue uma tendência da escrita
          japonesa: <strong>sons</strong> em katakana (<span className="font-jp">ワンワン</span>),{' '}
          <strong>jeitos e sentimentos</strong> em hiragana (<span className="font-jp">どきどき</span>).
          É tendência, não regra: em mangá e na internet você também vai ver{' '}
          <span className="font-jp">ドキドキ</span> e <span className="font-jp">イライラ</span>, e a
          palavra é a mesma.
        </p>
        <ReadingKey
          lines={[
            { text: 'いま、どきどきしています。', desc: 'hiragana' },
            { text: 'ima, dokidoki shite imasu.', desc: 'romaji' },
            { text: 'Agora estou nervoso(a).', desc: 'significado' },
            { text: 'ワンワン', desc: 'katakana: aqui, um som' },
            { text: '〜する', desc: '〜 marca onde entra a onomatopeia' },
          ]}
        />
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink">
          <li>
            A <strong>repetição tem ritmo igual</strong>: <em>do-ki-do-ki</em>, quatro batidas do
            mesmo tamanho. Evite o "DÓ-qui-DÓ-qui" do português, que força a primeira sílaba.
          </li>
          <li>
            O <strong className="font-jp">っ</strong> pequeno vale uma batida inteira de silêncio:{' '}
            <span className="font-jp">びっくり</span> é <em>bi-(pausa)-ku-ri</em>, e{' '}
            <span className="font-jp">ほっと</span> é <em>ho-(pausa)-to</em>. Sem a pausa, a palavra
            deixa de existir.
          </li>
          <li>
            O romaji escreve a repetição numa palavra só (<em>dokidoki</em>), e{' '}
            <span className="font-jp">ー</span> como vogal dobrada (<em>zaazaa</em>).
          </li>
        </ul>
        <p className="text-sm leading-relaxed text-ink">
          Em duas tabelas há uma coluna "Kanji (furigana)", como{' '}
          <span className="font-jp text-base">
            <FuriganaWord kanji="擬音語" reading="ぎおんご" />
          </span>
          . É só referência: pode ignorar o kanji por enquanto.
        </p>
      </Section>

      <Section title="Objetivos desta lição">
        <p className="text-sm leading-relaxed text-ink">Ao final, você vai saber:</p>
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink">
          <li>reconhecer os três grupos de onomatopeias e o que cada um descreve;</li>
          <li>
            dizer como se sente com <strong>onomatopeia + する</strong>, escolhendo entre{' '}
            <span className="font-jp">します</span>, <span className="font-jp">しました</span> e{' '}
            <span className="font-jp">しています</span>;
          </li>
          <li>
            separar sentimentos que o português chama pelo mesmo nome, como os dois "ansioso"{' '}
            <span className="font-jp">どきどき</span> e <span className="font-jp">わくわく</span>;
          </li>
          <li>descrever uma dor para o médico;</li>
          <li>saber quando a onomatopeia cabe e quando trocar por uma palavra mais formal.</li>
        </ul>
        <p className="text-sm leading-relaxed text-ink">
          <strong>Fora do escopo:</strong> esta lição não é um dicionário de onomatopeias, que tem
          milhares de itens. Ela ensina como o sistema funciona e um conjunto de uso frequente. A
          conjugação de <span className="font-jp">する</span> e a forma て são da lição de verbos:
          aqui só as aplicamos.
        </p>
      </Section>

      <Section title="Por que o japonês precisa tanto disso">
        <p className="text-sm leading-relaxed text-ink">
          O português também imita sons: "au-au", "tique-taque", "cocoricó". A diferença é o
          alcance. O japonês usa esse mesmo recurso para descrever o que <strong>não faz barulho
          nenhum</strong>: o brilho de uma estrela, a maciez de um pão, o aperto no peito antes de
          uma entrevista.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          Muitas vezes, onde o português precisa de um adjetivo mais um advérbio, o japonês resolve
          com uma palavra: <span className="font-jp">ぐっすりねました</span> é "dormi profundamente".
          Por isso, elas aparecem em toda parte: na conversa, no mangá, na propaganda de comida e
          no consultório. Quem não as conhece perde boa parte do colorido da língua.
        </p>
        <Ex
          jp="おなかがぺこぺこです。"
          romaji="onaka ga pekopeko desu."
          pt="Estou morrendo de fome."
          notes="fala do dia a dia: uma das primeiras que todo estudante ouve"
        />
        <Ex
          jp="ふわふわのパンケーキをたべました。"
          romaji="fuwafuwa no pankeeki o tabemashita."
          pt="Comi uma panqueca bem fofinha."
          notes="na cafeteria: é o tipo de palavra que aparece em cardápio e propaganda"
        />
        <Note>
          Duas histórias que todo japonês conhece mostram o alcance disso. No conto de Momotarou, o
          pêssego gigante desce o rio fazendo <span className="font-jp">どんぶらこ、どんぶらこ</span>{' '}
          (<em>donburako</em>), o balanço pesado de algo boiando. E o mangá tem até uma
          "onomatopeia" para o silêncio: <span className="font-jp">シーン</span> (<em>shiin</em>),
          que aparece no quadrinho quando ninguém diz nada.
        </Note>
      </Section>

      <Section title="Os três grupos">
        <p className="text-sm leading-relaxed text-ink">
          O nome geral é <span className="font-jp">オノマトペ</span> (<em>onomatope</em>), que veio
          do francês. Elas se dividem pelo que imitam: um som real, um jeito ou estado que não faz
          som, ou um sentimento. Saber o grupo ajuda a prever como a palavra entra na frase.
        </p>
        <GrammarTable
          headers={['Grupo', 'Kanji (furigana)', 'O que descreve', 'Exemplos']}
          jpCols={[1, 3]}
          rows={[
            ['1. Sons', <FuriganaWord key="g1" kanji="擬音語" reading="ぎおんご" />, 'barulhos e vozes reais', 'ワンワン, ザーザー, カンカン'],
            ['2. Jeitos e estados', <FuriganaWord key="g2" kanji="擬態語" reading="ぎたいご" />, 'aparência, textura, maneira de agir', 'きらきら, ふわふわ, ぐっすり'],
            ['3. Sentimentos', <FuriganaWord key="g3" kanji="擬情語" reading="ぎじょうご" />, 'o que se passa por dentro', 'どきどき, いらいら, がっかり'],
          ]}
        />
        <Note>
          <strong>Aprofundamento:</strong> a divisão varia conforme o autor. Muitos dicionários só
          separam dois grupos, sons e o resto, e colocam os sentimentos dentro de{' '}
          <span className="font-jp">ぎたいご</span>. O linguista Kindaichi Haruhiko dividiu em
          cinco. Se o seu material contar diferente, as palavras são as mesmas: muda só a
          organização.
        </Note>
        <p className="text-sm leading-relaxed text-ink">
          Esta lição passa rápido pelos dois primeiros e se demora no terceiro. É o grupo que você
          mais vai usar para falar de si mesmo e o que funciona como <strong>verbo</strong>.
        </p>
      </Section>

      <Section title="Grupo 1 — sons">
        <p className="text-sm leading-relaxed text-ink">
          É o grupo mais fácil para quem fala português, porque a ideia é a mesma. O que muda é a
          convenção: o cachorro japonês faz <span className="font-jp">ワンワン</span>, não "au-au".
          E o som costuma vir colado ao verbo, onde o português preferiria um advérbio: "chove
          forte" vira "chove <span className="font-jp">ザーザー</span>".
        </p>
        <GrammarTable
          headers={['Som', 'Romaji', 'O que é']}
          jpCols={[0]}
          rows={[
            ['ワンワン', 'wanwan', 'cachorro (au-au)'],
            ['ニャーニャー', 'nyaanyaa', 'gato (miau)'],
            ['コケコッコー', 'kokekokkoo', 'galo (cocoricó)'],
            ['ザーザー', 'zaazaa', 'chuva forte'],
            ['ゴロゴロ', 'gorogoro', 'trovão ao longe'],
            ['カンカン', 'kankan', 'sino da cancela do trem'],
            ['パチパチ', 'pachipachi', 'palmas'],
            ['ゲラゲラ', 'geragera', 'gargalhada'],
          ]}
        />
        <Ex
          jp="いぬがワンワンとほえています。"
          romaji="inu ga wanwan to hoete imasu."
          pt="O cachorro está latindo."
          notes="と liga o som ao verbo, como se citasse o que se ouviu"
        />
        <Ex
          jp="あめがザーザーふっています。"
          romaji="ame ga zaazaa futte imasu."
          pt="Está chovendo forte."
          notes="sem と: nas formas repetidas, ele costuma ser opcional"
        />
        <Ex
          jp="ふみきりがカンカンなっています。"
          romaji="fumikiri ga kankan natte imasu."
          pt="O sino da passagem de nível está tocando."
          notes="na rua: um som que quem mora no Japão ouve todo dia"
        />
        <Note>
          O <span className="font-jp">と</span> é o mesmo de citar uma fala. Numa forma repetida,
          ele pode sair: <span className="font-jp">ワンワンとほえる</span> e{' '}
          <span className="font-jp">ワンワンほえる</span> convivem. Na forma não repetida, ele tende
          a ficar: <span className="font-jp">ニャーとなきます</span>.
        </Note>
      </Section>

      <Section title="Grupo 2 — jeitos e estados">
        <p className="text-sm leading-relaxed text-ink">
          Aqui não há som nenhum: a palavra sugere como algo <strong>parece</strong>, como se{' '}
          <strong>sente ao toque</strong> ou de que <strong>maneira</strong> se faz alguma coisa.
          Não há equivalente direto em português, então vale aprender cada uma com a cena em que
          ela aparece. Você já conhece uma: <span className="font-jp">ゆっくり</span>, "com calma".
        </p>
        <p className="text-sm leading-relaxed text-ink">
          Este é o grupo com mais encaixes na frase, e cada palavra aceita alguns deles, não todos:
        </p>
        <GrammarTable
          headers={['Encaixe', 'Para quê', 'Exemplo']}
          jpCols={[2]}
          rows={[
            ['〜 + verbo', 'como a ação é feita', 'ぐっすりねました'],
            ['〜 + の + substantivo', 'qualificar uma coisa', 'ふわふわのパン'],
            ['〜 + です', 'estado atual', 'ぺこぺこです'],
            ['〜 + する', 'estar nesse estado, agir desse jeito', 'ごろごろします'],
          ]}
        />
        <Ex
          jp="ほしがきらきらひかっています。"
          romaji="hoshi ga kirakira hikatte imasu."
          pt="As estrelas estão brilhando, cintilantes."
          notes="〜 + verbo: きらきら diz como é o brilho"
        />
        <Ex
          jp="ゆっくりはなしてください。"
          romaji="yukkuri hanashite kudasai."
          pt="Fale devagar, por favor."
          notes="conversando com um japonês: talvez a frase mais útil desta lição"
        />
        <Ex
          jp="しゅうまつはいえでごろごろします。"
          romaji="shuumatsu wa ie de gorogoro shimasu."
          pt="No fim de semana fico à toa em casa."
          notes="〜 + する: ごろごろ também é o trovão do grupo 1, o contexto decide"
        />
        <p className="text-sm leading-relaxed text-ink">
          Vale destacar um subgrupo: o do <strong>estado do corpo</strong>, que normalmente pede{' '}
          <span className="font-jp">です</span>, não <span className="font-jp">する</span>. Aqui o
          reflexo de copiar os sentimentos dá errado, como você vai ver nos erros comuns.
        </p>
        <GrammarTable
          headers={['Frase', 'Romaji', 'Significado']}
          jpCols={[0]}
          rows={[
            ['おなかがぺこぺこです', 'onaka ga pekopeko desu', 'estou morrendo de fome'],
            ['のどがからからです', 'nodo ga karakara desu', 'estou morrendo de sede'],
            ['もうくたくたです', 'mou kutakuta desu', 'estou exausto(a)'],
            ['にほんごがぺらぺらです', 'nihongo ga perapera desu', 'fala japonês fluentemente'],
          ]}
        />
      </Section>

      <Section title="Grupo 3 — sentimentos viram verbos com する">
        <p className="text-sm leading-relaxed text-ink">
          A onomatopeia de sentimento, sozinha, não é verbo. Basta acrescentar{' '}
          <span className="font-jp">する</span> para ela ganhar tempo, negação e registro. O
          mecanismo é o mesmo de <span className="font-jp">べんきょうする</span>, que você viu na
          lição de verbos: é um verbo irregular, e a onomatopeia nunca muda.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          A divergência com o português está aqui. Dizemos "estou nervoso", com "estar" e um
          adjetivo, e a tentação é procurar uma cópula. O japonês costuma preferir o verbo:{' '}
          <span className="font-jp">どきどきします</span>. Use esta construção sempre que quiser
          dizer como você se sente num momento concreto.
        </p>
        <GrammarTable
          headers={['Forma', 'Trilha educada', 'Trilha casual']}
          jpCols={[1, 2]}
          rows={[
            ['presente', 'どきどきします', 'どきどきする'],
            ['em curso', 'どきどきしています', 'どきどきしてる'],
            ['passado', 'どきどきしました', 'どきどきした'],
            ['negativa', 'どきどきしません', 'どきどきしない'],
            ['passado negativo', 'どきどきしませんでした', 'どきどきしなかった'],
          ]}
        />
        <Note>
          Na fala casual, <span className="font-jp">〜ている</span> quase sempre encurta para{' '}
          <span className="font-jp">〜てる</span>: <span className="font-jp">どきどきしてる</span> é
          o que você mais vai ouvir entre amigos.
        </Note>
      </Section>

      <Section title="Qual tempo usar — ます, ました ou ています">
        <p className="text-sm leading-relaxed text-ink">
          Esta é a escolha que o português não ensina a fazer. O japonês pergunta: você está falando
          de um costume, do momento em que o sentimento chegou, ou do estado em que está agora?
        </p>
        <GrammarTable
          headers={['Forma', 'Quando', 'Exemplo']}
          jpCols={[2]}
          rows={[
            ['〜します', 'costume, ou o que sente diante de algo', 'テストのまえはどきどきします'],
            ['〜しました', 'o momento em que o sentimento veio', 'おおきいおとにびっくりしました'],
            ['〜しています', 'estado em curso, agora', 'いま、どきどきしています'],
          ]}
        />
        <Ex
          jp="テストのまえはいつもどきどきします。"
          romaji="tesuto no mae wa itsumo dokidoki shimasu."
          pt="Antes de uma prova, sempre fico nervoso(a)."
          notes="〜します: um costume, por isso combina com いつも"
        />
        <Ex
          jp="いま、どきどきしています。"
          romaji="ima, dokidoki shite imasu."
          pt="Agora estou nervoso(a)."
          notes="〜しています: está acontecendo enquanto você fala"
        />
        <Ex
          jp="ああ、びっくりした！"
          romaji="aa, bikkuri shita!"
          pt="Ai, que susto!"
          notes="casual, e a forma que mais se ouve: o susto acabou de acontecer, então vai no passado"
        />
        <Ex
          jp="おおきいじしんにびっくりしました。"
          romaji="ookii jishin ni bikkuri shimashita."
          pt="Levei um susto com o terremoto forte."
          notes="educada, contando depois do ocorrido: に marca o que causou o susto"
        />
        <p className="text-sm leading-relaxed text-ink">
          A armadilha do português é o "estou": "estou surpreso" e "estou aliviado" parecem pedir o
          presente, mas o natural é <span className="font-jp">びっくりしました</span> e{' '}
          <span className="font-jp">ほっとしました</span>. O japonês relata a mudança que aconteceu
          em você.
        </p>
        <Note>
          Isso é o ponto de partida, não uma proibição: <span className="font-jp">まだびっくりしています</span>{' '}
          ("ainda estou surpreso") e <span className="font-jp">いまはほっとしています</span> ("agora
          estou aliviado") existem, quando você quer destacar que o estado continua.
        </Note>
        <p className="text-sm leading-relaxed text-ink">
          <strong>Falando de outra pessoa</strong>, você só vê o sentimento de fora, então use{' '}
          <span className="font-jp">〜しています</span> para o estado atual, ou o passado para contar
          o que aconteceu. Dizer <span className="font-jp">たなかさんはいらいらします</span> soa
          estranho, como se você sentisse por ela.
        </p>
        <Ex
          jp="たなかさんはいらいらしています。"
          romaji="tanaka-san wa iraira shite imasu."
          pt="A Tanaka está irritada."
          notes="outra pessoa: você descreve o que observa"
        />
        <Ex
          jp="ぜんぜんどきどきしませんでした。"
          romaji="zenzen dokidoki shimasen deshita."
          pt="Não fiquei nem um pouco nervoso(a)."
          notes="negar também funciona: ぜんぜん + verbo negativo, como na lição Vida cotidiana"
        />
      </Section>

      <Section title="O coração acelerado — どきどき, わくわく, はらはら, そわそわ">
        <p className="text-sm leading-relaxed text-ink">
          O português junta boa parte disto em "ansioso". O japonês separa pela causa e pelo que
          você espera que aconteça. Quem traduz tudo por uma palavra só acaba dizendo que está
          empolgado com o exame médico.
        </p>
        <GrammarTable
          headers={['Palavra', 'Sensação', 'Cena típica']}
          jpCols={[0]}
          rows={[
            ['どきどき', 'coração batendo forte, de nervoso ou de emoção', 'entrevista, paixão, véspera de prova'],
            ['わくわく', 'expectativa alegre: só coisa boa', 'véspera de viagem, abrir um presente'],
            ['はらはら', 'aflição de quem assiste e não pode interferir', 'jogo apertado, criança perto da escada'],
            ['そわそわ', 'inquietação, não conseguir parar quieto', 'esperando um telefonema, um resultado'],
          ]}
        />
        <Ex
          jp="めんせつのまえはどきどきします。"
          romaji="mensetsu no mae wa dokidoki shimasu."
          pt="Antes de uma entrevista, fico nervoso(a)."
          notes="どきどき de nervoso, na entrevista de emprego"
        />
        <Ex
          jp="すきなひとのまえでは、どきどきします。"
          romaji="suki na hito no mae de wa, dokidoki shimasu."
          pt="Na frente de quem eu gosto, meu coração dispara."
          notes="どきどき de paixão: mesma palavra, emoção oposta"
        />
        <Ex
          jp="あしたからりょこうです。わくわくしています。"
          romaji="ashita kara ryokou desu. wakuwaku shite imasu."
          pt="A viagem começa amanhã. Estou animado(a)."
          notes="わくわく: aqui どきどき também caberia, mas わくわく deixa claro que é só alegria"
        />
        <Ex
          jp="サッカーのしあいをみて、はらはらしました。"
          romaji="sakkaa no shiai o mite, harahara shimashita."
          pt="Vendo o jogo de futebol, fiquei com o coração na mão."
          notes="はらはら: a forma て liga a causa ao sentimento"
        />
        <Ex
          jp="でんわをまっています。そわそわしています。"
          romaji="denwa o matte imasu. sowasowa shite imasu."
          pt="Estou esperando a ligação. Não consigo ficar quieto(a)."
          notes="そわそわ aparece no corpo: andar de um lado para o outro, olhar o celular"
        />
      </Section>

      <Section title="A irritação — いらいら, むかむか, うんざり">
        <p className="text-sm leading-relaxed text-ink">
          As três traduzem por "irritado" ou "com raiva", mas variam em intensidade e duração.{' '}
          <span className="font-jp">いらいら</span> é a impaciência do dia a dia, aquela que vem
          de ter de esperar. <span className="font-jp">むかむか</span> é mais forte, e sobe pelo
          estômago: serve também para enjoo. <span className="font-jp">うんざり</span> é o cansaço
          de quem já aguentou demais.
        </p>
        <Ex
          jp="バスがぜんぜんきません。いらいらします。"
          romaji="basu ga zenzen kimasen. iraira shimasu."
          pt="O ônibus não vem de jeito nenhum. Fico irritado(a)."
          notes="no ponto de ônibus: a cena clássica de いらいら"
        />
        <Ex
          jp="あのひとのことばに、むかむかしました。"
          romaji="ano hito no kotoba ni, mukamuka shimashita."
          pt="Fiquei com raiva do que aquela pessoa disse."
          notes="むかむか de raiva: に marca a causa"
        />
        <Ex
          jp="むねがむかむかします。"
          romaji="mune ga mukamuka shimasu."
          pt="Estou enjoado(a)."
          notes="むかむか de enjoo: o sujeito é uma parte do corpo, e isso muda o sentido"
        />
        <Ex
          jp="まいにちざんぎょうで、もううんざりです。"
          romaji="mainichi zangyou de, mou unzari desu."
          pt="Hora extra todo dia: já estou farto(a)."
          notes="no trabalho: うんざり aceita です, comum depois de もう, e で marca a causa"
        />
      </Section>

      <Section title="A queda — がっかり, しょんぼり, くよくよ">
        <p className="text-sm leading-relaxed text-ink">
          O que separa estas três é <strong>quem olha</strong> e <strong>quanto tempo dura</strong>.{' '}
          <span className="font-jp">がっかり</span> é a decepção de um fato concreto, como
          "poxa, que pena". <span className="font-jp">しょんぼり</span> é o abatimento visível, em
          geral de outra pessoa. <span className="font-jp">くよくよ</span> é ficar remoendo o que
          já passou, e quase sempre aparece num consolo.
        </p>
        <Ex
          jp="コンサートがなくなって、がっかりしました。"
          romaji="konsaato ga nakunatte, gakkari shimashita."
          pt="O show foi cancelado e fiquei decepcionado(a)."
          notes="がっかり: um fato, e a reação a ele"
        />
        <Ex
          jp="こどもがしょんぼりしています。"
          romaji="kodomo ga shonbori shite imasu."
          pt="A criança está cabisbaixa."
          notes="しょんぼり: descreve o que se vê de fora"
        />
        <Ex
          jp="だいじょうぶですよ。くよくよしないでください。"
          romaji="daijoubu desu yo. kuyokuyo shinaide kudasai."
          pt="Vai ficar tudo bem. Não fique remoendo isso."
          notes="consolando alguém: しない (negativa casual) + で + ください faz o pedido negativo"
        />
      </Section>

      <Section title="O susto e o alívio — びっくり, ほっと, すっきり, のんびり">
        <p className="text-sm leading-relaxed text-ink">
          Estas marcam uma <strong>mudança de estado</strong>, por isso costumam vir no passado
          quando você conta o que houve. Duas delas têm paralelo com as interjeições do português:{' '}
          <span className="font-jp">びっくり</span> é o "opa!", <span className="font-jp">ほっと</span>{' '}
          é o "ufa!". A diferença é que, em japonês, a frase com{' '}
          <span className="font-jp">する</span> é a forma normal de contar isso.
        </p>
        <Ex
          jp="でんしゃにまにあって、ほっとしました。"
          romaji="densha ni maniatte, hotto shimashita."
          pt="Consegui pegar o trem a tempo e fiquei aliviado(a)."
          notes="na estação: a forma て diz o que trouxe o alívio"
        />
        <Ex
          jp="シャワーをあびて、すっきりしました。"
          romaji="shawaa o abite, sukkiri shimashita."
          pt="Tomei um banho e me senti renovado(a)."
          notes="すっきり: algo que incomodava saiu, no corpo ou na cabeça"
        />
        <Ex
          jp="おんせんでのんびりしました。"
          romaji="onsen de nonbiri shimashita."
          pt="Relaxei na fonte termal."
          notes="のんびり: sem pressa; で marca o lugar, como na lição de partículas"
        />
        <Note>
          Duas para reconhecer, muito comuns hoje: <span className="font-jp">もやもや</span> é um
          incômodo que você não sabe nomear ("estou com uma coisa estranha aqui dentro"), e{' '}
          <span className="font-jp">うきうき</span> é a leveza de quem está de bom humor, como numa
          manhã de folga.
        </Note>
      </Section>

      <Section title="A forma também significa — repetição, っと e o ゛">
        <p className="text-sm leading-relaxed text-ink">
          O formato da palavra dá pistas sobre o significado, mesmo quando você nunca a viu. O que
          se repete tende a <strong>continuar</strong>, e o que termina em{' '}
          <span className="font-jp">っと</span> tende a ser <strong>um instante</strong>. Isso explica
          por que <span className="font-jp">いらいらしています</span> é tão natural, enquanto{' '}
          <span className="font-jp">いらっとしました</span> vem no passado.
        </p>
        <GrammarTable
          headers={['Continua', 'Um instante', 'Diferença']}
          jpCols={[0, 1]}
          rows={[
            ['どきどき', 'どきっと', 'coração acelerado × um pulo no peito'],
            ['いらいら', 'いらっと', 'impaciência × uma irritação súbita'],
            ['びくびく', 'びくっと', 'com medo, encolhido × um sobressalto'],
          ]}
        />
        <Ex
          jp="せんせいがきゅうにわたしをみました。どきっとしました。"
          romaji="sensei ga kyuu ni watashi o mimashita. dokitto shimashita."
          pt="O professor olhou de repente para mim. Levei um susto."
          notes="どきっと: um instante só, então vai no passado"
        />
        <p className="text-sm leading-relaxed text-ink">
          O <strong>som vozeado</strong> (com <span className="font-jp">゛</span>) também carrega
          sentido: tende a soar maior, mais pesado ou menos agradável. Vale como pista, mas nem toda
          palavra tem par, e o significado exato precisa ser aprendido.
        </p>
        <GrammarTable
          headers={['Sem ゛', 'Sentido', 'Com ゛', 'Sentido']}
          jpCols={[0, 2]}
          rows={[
            ['きらきら', 'brilho delicado (estrela)', 'ぎらぎら', 'brilho agressivo (sol de verão)'],
            ['とんとん', 'batidinhas leves', 'どんどん', 'pancadas fortes'],
            ['ころころ', 'algo pequeno rolando', 'ごろごろ', 'algo pesado rolando; ficar à toa'],
            ['さらさら', 'liso, solto (cabelo, areia fina)', 'ざらざら', 'áspero (lixa)'],
          ]}
        />
        <Note>
          <strong>Aprofundamento:</strong> várias dessas raízes geram verbos comuns com{' '}
          <span className="font-jp">〜つく</span>: <span className="font-jp">いらいら → いらつく</span>{' '}
          (irritar-se), <span className="font-jp">ふらふら → ふらつく</span> (cambalear). A mais
          famosa é <span className="font-jp">むかつく</span>, "que ódio!". Ela é gíria e soa agressiva:
          aprenda a reconhecer, mas não use com quem você não tem intimidade.
        </Note>
      </Section>

      <Section title="No médico — descrever a dor">
        <p className="text-sm leading-relaxed text-ink">
          Aqui a onomatopeia é informação, não enfeite. Em português, dizemos "dói muito"; em
          japonês, dizer <em>como</em> dói costuma ser a resposta esperada para{' '}
          <span className="font-jp">どんないたみですか</span> ("que tipo de dor é?"). A estrutura é
          fixa: parte do corpo + <span className="font-jp">が</span> + onomatopeia +{' '}
          <span className="font-jp">します</span>.
        </p>
        <GrammarTable
          headers={['Palavra', 'Tipo de dor', 'Onde costuma aparecer']}
          jpCols={[0]}
          rows={[
            ['ずきずき', 'latejante, no ritmo do pulso', 'cabeça, dente, machucado'],
            ['がんがん', 'pancadas fortes', 'cabeça (ressaca, por exemplo)'],
            ['ちくちく', 'pontadas de agulha', 'garganta, pele, roupa que pinica'],
            ['ひりひり', 'ardência', 'queimadura de sol, garganta'],
            ['きりきり', 'dor aguda, como uma torção', 'estômago'],
            ['しくしく', 'dor fraca e persistente', 'barriga'],
          ]}
        />
        <Ex
          jp="どんないたみですか。"
          romaji="donna itami desu ka."
          pt="Que tipo de dor é?"
          notes="o que o médico pergunta: agora você sabe responder"
        />
        <Ex
          jp="あたまがずきずきします。"
          romaji="atama ga zukizuki shimasu."
          pt="Minha cabeça está latejando."
          notes="resposta no consultório: não precisa de いたい, a palavra já diz que dói"
        />
        <Ex
          jp="おなかがしくしくいたいです。"
          romaji="onaka ga shikushiku itai desu."
          pt="Minha barriga está com uma dor fraca e contínua."
          notes="〜 + いたいです também é natural, com a onomatopeia dizendo como dói"
        />
        <Ex
          jp="のどがひりひりします。"
          romaji="nodo ga hirihiri shimasu."
          pt="Minha garganta está ardendo."
          notes="na farmácia: dá para pedir o remédio certo sem saber o termo técnico"
        />
        <Note>
          Se a palavra exata não vier na hora, diga onde dói e use{' '}
          <span className="font-jp">いたいです</span>. A onomatopeia refina a descrição, mas não é
          obrigatória.
        </Note>
      </Section>

      <Section title="Registro — quando trocar por outra palavra">
        <p className="text-sm leading-relaxed text-ink">
          Na fala, as onomatopeias cabem quase sempre, inclusive com pessoas mais velhas. Elas soam
          espontâneas, e é justamente isso que atrapalha num texto formal: em e-mail de trabalho,
          relatório ou discurso, use a palavra comum. Veja o par mais útil de cada uma:
        </p>
        <GrammarTable
          headers={['Na conversa', 'Em tom formal', 'Kanji (furigana)']}
          jpCols={[0, 1, 2]}
          rows={[
            ['どきどきします', 'きんちょうします', <FuriganaWord key="r1" kanji="緊張" reading="きんちょう" />],
            ['びっくりしました', 'おどろきました', <FuriganaWord key="r2" kanji="驚く" reading="おどろく" />],
            ['ほっとしました', 'あんしんしました', <FuriganaWord key="r3" kanji="安心" reading="あんしん" />],
            ['がっかりしました', 'ざんねんです', <FuriganaWord key="r4" kanji="残念" reading="ざんねん" />],
          ]}
        />
        <Ex
          jp="めんせつは、すこしきんちょうしました。"
          romaji="mensetsu wa, sukoshi kinchou shimashita."
          pt="Fiquei um pouco tenso(a) na entrevista."
          notes="falando com um recrutador: きんちょう só tem o sentido de tensão, sem a emoção de どきどき"
        />
        <Ex
          jp="ニュースをみて、おどろきました。"
          romaji="nyuusu o mite, odorokimashita."
          pt="Fiquei surpreso(a) ao ver a notícia."
          notes="tom mais sério: combina com o e-mail e a conversa de trabalho"
        />
      </Section>

      <Section title="Nota cultural: elas não são infantis">
        <p className="text-sm leading-relaxed text-ink">
          Em português, "au-au" e "dodói" são fala de criança, e o aluno brasileiro tende a evitar o
          que soa assim. Em japonês, um adulto que diz{' '}
          <span className="font-jp">おなかがぺこぺこです</span> para um colega não parece imaturo: parece
          alguém à vontade na língua. Evitá-las por vergonha deixa sua fala mais dura do que
          precisa, e usar um sinônimo formal na conversa com um amigo soa distante.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          Há, porém, um cuidado social com <span className="font-jp">ぺらぺら</span>. Ela é um elogio
          que se faz <strong>aos outros</strong>. Se alguém disser que o seu japonês é fluente, negue
          com leveza, como vimos na lição de apresentação. Afirmar isso de si mesmo soa como
          gabar-se.
        </p>
        <Ex
          jp="にほんご、ぺらぺらですね！"
          romaji="nihongo, perapera desu ne!"
          pt="Seu japonês é fluente, hein!"
          notes="o elogio que você vai ouvir, muitas vezes depois de uma frase simples"
        />
        <Ex
          jp="いいえ、まだまだです。"
          romaji="iie, mada mada desu."
          pt="Que nada, ainda tenho muito a aprender."
          notes="a resposta esperada: aceitar de pronto soaria presunçoso"
        />
      </Section>

      <Section title="Exemplo completo — um dia em sentimentos">
        <p className="text-sm leading-relaxed text-ink">
          Uma pequena história, com uma onomatopeia em cada virada. Repare como o tempo verbal muda
          com o que está acontecendo. Na Leitura, o texto{' '}
          <span className="font-jp">はじめてのはっぴょう</span>, do nível 1, traz outra história assim
          para praticar.
        </p>
        <Ex
          jp="あしたはめんせつです。いま、どきどきしています。"
          romaji="ashita wa mensetsu desu. ima, dokidoki shite imasu."
          pt="Amanhã tenho uma entrevista. Agora estou nervoso(a)."
          notes="em curso: 〜しています"
        />
        <Ex
          jp="つぎのひ、でんしゃがきませんでした。いらいらしました。"
          romaji="tsugi no hi, densha ga kimasen deshita. iraira shimashita."
          pt="No dia seguinte, o trem não vinha. Fiquei irritado(a)."
          notes="contando depois: o sentimento já passou, então 〜しました"
        />
        <Ex
          jp="でも、まにあいました。ほっとしました。"
          romaji="demo, maniaimashita. hotto shimashita."
          pt="Mas cheguei a tempo. Fiquei aliviado(a)."
          notes="a tensão acabou: a palavra de alívio fecha a virada da história"
        />
        <Ex
          jp="めんせつがおわって、おなかがぺこぺこでした。"
          romaji="mensetsu ga owatte, onaka ga pekopeko deshita."
          pt="Terminada a entrevista, eu estava morrendo de fome."
          notes="estado do corpo: です, aqui no passado でした"
        />
        <Ex
          jp="よるはぐっすりねました。"
          romaji="yoru wa gussuri nemashita."
          pt="À noite, dormi profundamente."
          notes="jeito de fazer: a palavra entra direto antes do verbo"
        />
      </Section>

      <Section title="Erros comuns">
        <GrammarTable
          headers={['Erro', 'Incorreto', 'Correto', 'Por quê']}
          jpCols={[1, 2]}
          rows={[
            ['"Com fome" com する', 'おなかがぺこぺこします', 'おなかがぺこぺこです', 'Estado do corpo pede です. ぺこぺこする é curvar-se repetidamente, ou bajular.'],
            ['Passado no sentimento atual', 'いま、どきどきしました (querendo "estou nervoso agora")', 'いま、どきどきしています', 'ました relata o que aconteceu; o que continua agora pede ています.'],
            ['Presente em "estou surpreso"', 'びっくりします (sobre o que acabou de acontecer)', 'びっくりしました', 'O japonês relata o momento em que o sentimento veio.'],
            ['Causa com を', 'おとをびっくりしました', 'おとにびっくりしました', 'Quem causa o sentimento não é objeto do verbo: use に.'],
            ['と com palavra de sentimento', 'びっくりとしました', 'びっくりしました', 'する entra direto depois da onomatopeia.'],
            ['Esquecer o と de ほっと', 'ほっします', 'ほっとします', 'Em ほっと, o と faz parte da palavra.'],
            ['Pular o っ', 'ほとしました / びくりしました', 'ほっとしました / びっくりしました', 'っ vale uma batida inteira; sem ele, a palavra não existe.'],
            ['わくわく para preocupação', 'けんさでわくわくします (querendo "estou ansioso com o exame")', 'けんさでどきどきします', 'わくわく é só para o que se espera com alegria.'],
            ['Outra pessoa no presente', 'たなかさんはどきどきします', 'たなかさんはどきどきしています', 'Sentimento visto de fora, agora, pede ています.'],
            ['Tom de conversa no formal', 'びっくりしました (em e-mail ao chefe)', 'おどろきました', 'Na escrita formal, prefira a palavra comum.'],
            ['Elogiar a si mesmo', 'わたしはにほんごがぺらぺらです', 'すこしはなせます', 'ぺらぺら é elogio para os outros; sobre si, soa como gabar-se.'],
          ]}
        />
      </Section>

      <Section title="Resumo e tabela de referência">
        <GrammarTable
          headers={['Tema', 'Regra', 'Exemplo']}
          jpCols={[2]}
          rows={[
            ['Grupo 1: sons', 'em geral katakana; と opcional na forma repetida', 'ワンワン(と)ほえます'],
            ['Grupo 2: jeitos', 'antes do verbo, com の + substantivo, する ou です', 'ぐっすりねました / ふわふわのパン'],
            ['Estado do corpo', 'です', 'おなかがぺこぺこです'],
            ['Grupo 3: sentimentos', 'onomatopeia + する (irregular)', 'どきどきします'],
            ['Costume', '〜します', 'テストのまえはどきどきします'],
            ['Estado em curso', '〜しています', 'いま、どきどきしています'],
            ['O momento em que veio', '〜しました', 'びっくりしました'],
            ['Outra pessoa', '〜しています, ou passado', 'たなかさんはいらいらしています'],
            ['Causa', 'に, で, ou a forma て antes do sentimento', 'テストがおわって、ほっとしました'],
            ['Dor', 'parte do corpo + が + 〜します', 'あたまがずきずきします'],
            ['Pistas da forma', 'repetida = continua; っと = instante; ゛= mais pesado', 'どきどき / どきっと'],
            ['Tom formal', 'troque pela palavra comum', 'びっくり → おどろく'],
          ]}
        />
        <p className="text-sm leading-relaxed text-ink">Os sentimentos desta lição, para consulta:</p>
        <GrammarTable
          headers={['Palavra', 'Romaji', 'Sentimento']}
          jpCols={[0]}
          rows={[
            ['どきどき', 'dokidoki', 'nervoso ou emoção, coração acelerado'],
            ['わくわく', 'wakuwaku', 'expectativa alegre'],
            ['はらはら', 'harahara', 'aflição de quem assiste'],
            ['そわそわ', 'sowasowa', 'inquietação'],
            ['いらいら', 'iraira', 'impaciência, irritação'],
            ['むかむか', 'mukamuka', 'raiva que sobe; enjoo'],
            ['うんざり', 'unzari', 'estar farto(a)'],
            ['がっかり', 'gakkari', 'decepção'],
            ['しょんぼり', 'shonbori', 'abatimento visível'],
            ['くよくよ', 'kuyokuyo', 'remoer o que passou'],
            ['びっくり', 'bikkuri', 'susto, surpresa'],
            ['ほっと', 'hotto', 'alívio'],
            ['すっきり', 'sukkiri', 'sensação de renovado(a)'],
            ['のんびり', 'nonbiri', 'descontração, sem pressa'],
            ['もやもや', 'moyamoya', 'incômodo sem nome'],
            ['うきうき', 'ukiuki', 'bom humor, leveza'],
          ]}
        />
      </Section>
    </div>
  );
}
