import { Section, Ex, Note, GrammarTable, ReadingKey } from '../components/Licao';
import type { QuizLicao } from '../data/quiz/types';
import type { GrupoKakitori } from '../data/kakitori/types';

export const meta = {
  id: 'kosoado',
  title: 'Ko-So-A-Do',
  subtitle: 'Os demonstrativos japoneses (este, esse, aquele, qual)',
  emoji: '👆',
  tags: ['gramática', 'n5'],
};

export const quiz: QuizLicao = {
  frases: [
    {
      id: 'kosoado-f1',
      tokens: [
        { texto: 'この', romaji: 'kono' },
        { texto: 'ほん', romaji: 'hon' },
        { texto: 'は', romaji: 'wa', particula: true },
        { texto: 'おもしろい', romaji: 'omoshiroi' },
        { texto: 'です', romaji: 'desu' },
      ],
      pt: 'Este livro é interessante.',
    },
    {
      id: 'kosoado-f2',
      tokens: [
        { texto: 'それ', romaji: 'sore' },
        { texto: 'を', romaji: 'o', particula: true },
        { texto: 'ください', romaji: 'kudasai' },
      ],
      pt: 'Me dá isso, por favor.',
    },
    {
      id: 'kosoado-f3',
      tokens: [
        { texto: 'あれ', romaji: 'are' },
        { texto: 'は', romaji: 'wa', particula: true },
        { texto: 'わたし', romaji: 'watashi' },
        { texto: 'の', romaji: 'no' },
        { texto: 'かさ', romaji: 'kasa' },
        { texto: 'です', romaji: 'desu' },
      ],
      pt: 'Aquilo é meu guarda-chuva.',
    },
    {
      id: 'kosoado-f4',
      tokens: [
        { texto: 'どの', romaji: 'dono' },
        { texto: 'でんしゃ', romaji: 'densha' },
        { texto: 'に', romaji: 'ni', particula: true },
        { texto: 'のります', romaji: 'norimasu' },
        { texto: 'か', romaji: 'ka' },
      ],
      pt: 'Em qual trem você vai entrar?',
    },
    {
      id: 'kosoado-f5',
      tokens: [
        { texto: 'これ', romaji: 'kore' },
        { texto: 'は', romaji: 'wa', particula: true },
        { texto: 'なん', romaji: 'nan' },
        { texto: 'です', romaji: 'desu' },
        { texto: 'か', romaji: 'ka' },
      ],
      pt: 'O que é isto?',
    },
    {
      id: 'kosoado-f6',
      tokens: [
        { texto: 'ここ', romaji: 'koko' },
        { texto: 'に', romaji: 'ni', particula: true },
        { texto: 'すわって', romaji: 'suwatte' },
        { texto: 'ください', romaji: 'kudasai' },
      ],
      pt: 'Por favor, sente-se aqui.',
    },
    {
      id: 'kosoado-f7',
      tokens: [
        { texto: 'えき', romaji: 'eki' },
        { texto: 'は', romaji: 'wa', particula: true },
        { texto: 'あちら', romaji: 'achira' },
        { texto: 'です', romaji: 'desu' },
      ],
      pt: 'A estação é por lá.',
    },
    {
      id: 'kosoado-f8',
      tokens: [
        { texto: 'どっち', romaji: 'docchi' },
        { texto: 'が', romaji: 'ga', particula: true },
        { texto: 'いい', romaji: 'ii' },
      ],
      pt: 'Qual dos dois você prefere?',
    },
    {
      id: 'kosoado-f9',
      tokens: [
        { texto: 'どちらさま', romaji: 'dochira-sama' },
        { texto: 'です', romaji: 'desu' },
        { texto: 'か', romaji: 'ka' },
      ],
      pt: 'Quem é, por favor?',
    },
  ],
  perguntas: [
    {
      id: 'kosoado-sig1',
      tipo: 'significado',
      pergunta: 'O que significa これ?',
      alternativas: ['isto (perto de quem fala)', 'isso (perto de quem ouve)', 'aquilo (longe dos dois)', 'qual'],
      correta: 0,
    },
    {
      id: 'kosoado-sig2',
      tipo: 'significado',
      pergunta: 'O que significa あそこ?',
      alternativas: ['lá (longe dos dois)', 'aqui', 'aí', 'qual lugar'],
      correta: 0,
    },
    {
      id: 'kosoado-sig3',
      tipo: 'significado',
      pergunta: 'Que grupo do Ko-So-A-Do indica algo perto de quem ouve?',
      alternativas: ['そ (so)', 'こ (ko)', 'あ (a)', 'ど (do)'],
      correta: 0,
    },
    {
      id: 'kosoado-vf1',
      tipo: 'verdadeiro-falso',
      afirmacao: 'この precisa vir sempre acompanhado de um substantivo.',
      correta: true,
      explicacao: 'この nunca fica sozinho; これ é a forma que fica sozinha.',
    },
    {
      id: 'kosoado-vf2',
      tipo: 'verdadeiro-falso',
      afirmacao: 'あそこ é a forma irregular do grupo あ para lugar (em vez de あこ).',
      correta: true,
    },
    {
      id: 'kosoado-vf3',
      tipo: 'verdadeiro-falso',
      afirmacao: 'こちら e こっち têm o mesmo grau de formalidade.',
      correta: false,
      explicacao: 'こちら é mais formal; こっち é a versão casual.',
    },
    {
      id: 'kosoado-vf4',
      tipo: 'verdadeiro-falso',
      afirmacao: 'これ pode substituir o objeto sem precisar nomeá-lo.',
      correta: true,
    },
    {
      id: 'kosoado-sig4',
      tipo: 'significado',
      pergunta: 'O que significa どちらさまですか, perguntado educadamente ao telefone ou no interfone?',
      alternativas: ['Quem é, por favor?', 'Onde você está?', 'Que horas são?', 'Qual você prefere?'],
      correta: 0,
    },
    {
      id: 'kosoado-vf5',
      tipo: 'verdadeiro-falso',
      afirmacao: 'あの, sozinho e sem substantivo depois, também funciona como uma interjeição de hesitação, algo como "hã...".',
      correta: true,
    },
    {
      id: 'kosoado-sig5',
      tipo: 'significado',
      pergunta: 'Entre どの, どれ e どちら, qual delas sempre precisa vir antes de um substantivo?',
      alternativas: ['どの', 'どれ', 'どちら', 'どっち'],
      correta: 0,
    },
    {
      id: 'kosoado-vf6',
      tipo: 'verdadeiro-falso',
      afirmacao: 'どちら só pode ser usada quando há exatamente duas opções, nunca mais.',
      correta: false,
      explicacao: 'Essa é a regra clássica, mas na fala educada どちら costuma substituir どれ mesmo com três ou mais opções, por soar mais elegante.',
    },
  ],
};

// Palavras demonstrativas isoladas pro ditado — em vez das `frases` do quiz acima (frases
// completas, longas demais pro Kakitori). Cobre as quatro séries ko/so/a/do em cada uma das
// formas (pronome, lugar, direção formal/casual, tipo, modo) — a própria palavra já é a unidade
// de vocabulário desta lição, sem precisar de frase ao redor.
export const kakitori: GrupoKakitori[] = [
  {
    id: 'kosoado-termos',
    label: meta.title,
    itens: [
      { id: 'kosoado-1', jp: 'これ', kana: 'これ', romaji: 'kore', pt: 'isto (perto de quem fala)' },
      { id: 'kosoado-2', jp: 'それ', kana: 'それ', romaji: 'sore', pt: 'isso (perto de quem ouve)' },
      { id: 'kosoado-3', jp: 'あれ', kana: 'あれ', romaji: 'are', pt: 'aquilo (longe dos dois)' },
      { id: 'kosoado-4', jp: 'どれ', kana: 'どれ', romaji: 'dore', pt: 'qual (dentre 3 ou mais)' },
      { id: 'kosoado-5', jp: 'ここ', kana: 'ここ', romaji: 'koko', pt: 'aqui' },
      { id: 'kosoado-6', jp: 'そこ', kana: 'そこ', romaji: 'soko', pt: 'aí' },
      { id: 'kosoado-7', jp: 'あそこ', kana: 'あそこ', romaji: 'asoko', pt: 'lá (longe dos dois)' },
      { id: 'kosoado-8', jp: 'どこ', kana: 'どこ', romaji: 'doko', pt: 'onde' },
      { id: 'kosoado-9', jp: 'こちら', kana: 'こちら', romaji: 'kochira', pt: 'aqui / este lado (formal)' },
      { id: 'kosoado-10', jp: 'あちら', kana: 'あちら', romaji: 'achira', pt: 'lá / aquele lado (formal)' },
      { id: 'kosoado-11', jp: 'どちら', kana: 'どちら', romaji: 'dochira', pt: 'onde / qual dos dois (formal)' },
      { id: 'kosoado-12', jp: 'こっち', kana: 'こっち', romaji: 'kocchi', pt: 'aqui / pra cá (casual)' },
      { id: 'kosoado-13', jp: 'あっち', kana: 'あっち', romaji: 'acchi', pt: 'lá / pra lá (casual)' },
      { id: 'kosoado-14', jp: 'どっち', kana: 'どっち', romaji: 'docchi', pt: 'qual dos dois (casual)' },
      { id: 'kosoado-15', jp: 'こんな', kana: 'こんな', romaji: 'konna', pt: 'desse tipo (assim, perto de quem fala)' },
      { id: 'kosoado-16', jp: 'そんな', kana: 'そんな', romaji: 'sonna', pt: 'desse tipo (que você disse)' },
      { id: 'kosoado-17', jp: 'あんな', kana: 'あんな', romaji: 'anna', pt: 'daquele tipo (mais distante)' },
      { id: 'kosoado-18', jp: 'どんな', kana: 'どんな', romaji: 'donna', pt: 'que tipo de' },
      { id: 'kosoado-19', jp: 'こう', kana: 'こう', romaji: 'kou', pt: 'assim (deste jeito)' },
      { id: 'kosoado-20', jp: 'そう', kana: 'そう', romaji: 'sou', pt: 'assim (desse jeito) / sim, é isso' },
      { id: 'kosoado-21', jp: 'どう', kana: 'どう', romaji: 'dou', pt: 'como' },
    ],
  },
];

export default function KoSoADo() {
  return (
    <div className="space-y-10">
      <Section title="Como ler esta lição">
        <p className="text-sm leading-relaxed text-ink">
          As palavras deste tema (<span className="font-jp">こ</span>/<span className="font-jp">そ</span>/
          <span className="font-jp">あ</span>/<span className="font-jp">ど</span>) quase sempre se
          escrevem em hiragana — inclusive em textos formais, já que são palavras gramaticais, não
          substantivos comuns. Então aqui você verá:
        </p>
        <ReadingKey
          lines={[
            { text: 'これ', desc: 'hiragana' },
            { text: 'kore', desc: 'romaji' },
            { text: 'isto', desc: 'significado' },
          ]}
        />
      </Section>

      <Section title="Objetivos desta lição">
        <p className="text-sm leading-relaxed text-ink">Ao final, você deve saber:</p>
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink">
          <li>
            Reconhecer as quatro "distâncias" (こ/そ/あ/ど) e aplicá-las nas sete séries do sistema
            (adjetivo, pronome, lugar, direção formal, direção casual, tipo, modo) — como um
            sistema só, não como listas soltas de vocabulário.
          </li>
          <li>
            Escolher entre a forma que acompanha substantivo (<span className="font-jp">この</span>
            ) e a que fica sozinha (<span className="font-jp">これ</span>), sem misturar as duas.
          </li>
          <li>
            Saber quando usar <span className="font-jp">どちら</span>/
            <span className="font-jp">どっち</span> (duas opções), <span className="font-jp">どれ</span>{' '}
            (três ou mais) e <span className="font-jp">どの</span> (sempre com substantivo).
          </li>
          <li>
            Reconhecer usos que vão além de apontar objetos: <span className="font-jp">あの</span>{' '}
            como hesitação, <span className="font-jp">どちらさま</span> como pergunta educada de
            identificação, e a extensão do sistema para algo já dito na conversa.
          </li>
          <li>Indicar uma pessoa ou lugar com educação, sem apontar com o dedo.</li>
        </ul>
      </Section>

      <Section title="O que é o sistema Ko-So-A-Do">
        <p className="text-sm leading-relaxed text-ink">
          <strong>Ko-So-A-Do</strong> (<span className="font-jp">こそあど</span>) é o conjunto de
          palavras que em português seriam "este, esse, aquele, aqui, aí, lá, qual". Você usa esse
          sistema o tempo todo: apontando um item no balcão de uma loja, perguntando onde fica algo
          na rua, ou descrevendo um objeto perdido sem saber o nome exato dele.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          O nome vem da primeira sílaba de cada grupo: <strong className="font-jp">こ</strong> (
          <em>ko</em>), <strong className="font-jp">そ</strong> (<em>so</em>),{' '}
          <strong className="font-jp">あ</strong> (<em>a</em>) e{' '}
          <strong className="font-jp">ど</strong> (<em>do</em>).
        </p>
        <p className="text-sm leading-relaxed text-ink">
          A grande sacada é que <strong>cada grupo indica uma distância diferente</strong>. Uma
          vez que você entende as quatro distâncias, entende o sistema inteiro — o que muda de uma
          série para outra (<span className="font-jp">これ</span>, <span className="font-jp">ここ</span>,{' '}
          <span className="font-jp">こちら</span>...) é só a <em>função</em> (objeto, lugar,
          direção), nunca a lógica da distância.
        </p>
        <Note>
          O português também distingue três distâncias — "este/esse/aquele" —, o que ajuda bastante
          aqui. A diferença é que, na fala cotidiana do Brasil, é comum usar "esse" para tudo que
          não é "aquele", sem separar bem "este" de "esse". O japonês mantém as três formas bem
          separadas, sempre pela mesma régua: perto de quem fala, perto de quem ouve, ou longe dos
          dois.
        </Note>
      </Section>

      <Section title="As quatro distâncias">
        <p className="text-sm leading-relaxed text-ink">
          O que muda de um grupo para outro não é o tipo de palavra — todos os quatro têm um
          pronome, um lugar, uma direção — e sim a <strong>distância</strong> entre você, a
          pessoa com quem você fala, e a coisa da qual estão falando. Fixe essa régua uma vez só e
          o sistema inteiro se resolve sozinho: cada palavra nova que aparecer daqui em diante é
          só essa régua aplicada a uma função diferente (objeto, lugar, direção...).
        </p>
        <GrammarTable
          headers={['Grupo', 'Onde está a coisa', 'Ideia em português']}
          jpCols={[0]}
          rows={[
            ['こ (ko)', 'perto de quem fala', 'este / isto / aqui'],
            ['そ (so)', 'perto de quem ouve', 'esse / isso / aí'],
            ['あ (a)', 'longe dos dois', 'aquele / aquilo / lá'],
            ['ど (do)', 'é uma pergunta', 'qual? / onde? / como?'],
          ]}
        />
        <Note>
          Imagine uma conversa entre A e B.
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              <span className="font-jp">これ</span> (<em>kore</em>) é algo perto de{' '}
              <strong>A</strong> (quem fala).
            </li>
            <li>
              <span className="font-jp">それ</span> (<em>sore</em>) é algo perto de{' '}
              <strong>B</strong> (quem ouve).
            </li>
            <li>
              <span className="font-jp">あれ</span> (<em>are</em>) é algo longe dos{' '}
              <strong>dois</strong>.
            </li>
          </ul>
          <p className="mt-2">
            Se só há uma pessoa, <span className="font-jp">それ</span> vira "perto, mas não na
            mão" e <span className="font-jp">あれ</span> vira "bem longe".
          </p>
        </Note>
        <p className="text-sm leading-relaxed text-ink">
          Essa régua de distância física é o ponto de partida certo, mas não é a história
          completa: às vezes o japonês mede distância dentro da <strong>conversa</strong>, não no
          espaço — o que muda qual grupo soa natural mesmo com o objeto fisicamente perto. Isso
          fica para a seção "Uso além da distância física", mais adiante.
        </p>
      </Section>

      <Section title="Tabela geral">
        <p className="text-sm leading-relaxed text-ink">
          Cada grupo tem uma palavra para cada função (apontar objeto, indicar lugar, etc.). A
          estrutura se repete: só muda a primeira sílaba.
        </p>
        <GrammarTable
          headers={[
            'Grupo',
            'Adjetivo',
            'Pronome',
            'Lugar',
            'Direção (formal)',
            'Direção (casual)',
            'Tipo',
            'Modo',
          ]}
          jpCols={[0, 1, 2, 3, 4, 5, 6, 7]}
          rows={[
            [
              'こ',
              'この (kono)',
              'これ (kore)',
              'ここ (koko)',
              'こちら (kochira)',
              'こっち (kocchi)',
              'こんな (konna)',
              'こう (kou)',
            ],
            [
              'そ',
              'その (sono)',
              'それ (sore)',
              'そこ (soko)',
              'そちら (sochira)',
              'そっち (socchi)',
              'そんな (sonna)',
              'そう (sou)',
            ],
            [
              'あ',
              'あの (ano)',
              'あれ (are)',
              'あそこ (asoko)',
              'あちら (achira)',
              'あっち (acchi)',
              'あんな (anna)',
              'ああ (aa)',
            ],
            [
              'ど',
              'どの (dono)',
              'どれ (dore)',
              'どこ (doko)',
              'どちら (dochira)',
              'どっち (docchi)',
              'どんな (donna)',
              'どう (dou)',
            ],
          ]}
        />
        <p className="text-sm leading-relaxed text-ink">Vamos ver cada coluna com calma.</p>
      </Section>

      <Section title="この・その・あの・どの — vêm antes de um substantivo">
        <p className="text-sm leading-relaxed text-ink">
          Esta série funciona como um <strong>adjetivo</strong>: vem sempre antes de um
          substantivo e nunca fica sozinha. É a forma que você usa para apontar algo que já está
          à vista — um item na prateleira, uma foto na tela, o prato que acabou de chegar à mesa —
          sem precisar levantar o dedo para ele.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          Aqui mora uma armadilha para quem vem do português: "este" serve tanto de adjetivo
          ("este livro") quanto de pronome ("este é bom"), com a <strong>mesma palavra</strong>. O
          japonês separa essas duas funções em palavras diferentes, que não se misturam nunca:{' '}
          <span className="font-jp">この</span> (sempre com substantivo) e{' '}
          <span className="font-jp">これ</span> (sempre sozinho, visto na próxima seção).
        </p>
        <Ex
          jp="このほんはおもしろいです。"
          romaji="kono hon wa omoshiroi desu."
          pt="Este livro é interessante."
          notes={`この gruda no substantivo ほん (livro): "este livro".`}
        />
        <Ex
          jp="このセーターはいくらですか？"
          romaji="kono seetaa wa ikura desu ka?"
          pt="Quanto custa este suéter?"
          notes="Numa loja, apontando (sem tocar) para a peça exposta perto de você."
        />
        <Ex
          jp="そのえいがをみましたか？"
          romaji="sono eiga o mimashita ka?"
          pt="Você viu esse filme?"
          notes={`その + えいが (filme) = "esse filme", que está perto de quem ouve.`}
        />
        <Ex
          jp="あのやまはきれいですね。"
          romaji="ano yama wa kirei desu ne."
          pt="Aquela montanha é bonita, não é?"
          notes="あの + やま (montanha), algo distante dos dois."
        />
        <Ex
          jp="どのでんしゃにのりますか？"
          romaji="dono densha ni norimasu ka?"
          pt="Em qual trem você vai entrar?"
          notes={`どの pergunta "qual", mas precisa de um substantivo (でんしゃ, trem) depois.`}
        />
        <Note>
          <strong>Regra prática:</strong> <span className="font-jp">この</span> e{' '}
          <span className="font-jp">これ</span> não são intercambiáveis.{' '}
          <span className="font-jp">この</span> precisa de um substantivo depois (
          <span className="font-jp">このほん</span> ✓). <span className="font-jp">これ</span>{' '}
          fica sozinho (<span className="font-jp">これはほんです</span> ✓). Nunca diga{' '}
          <span className="font-jp line-through">このはほんです</span> ✗.
        </Note>
        <Note>
          <strong>Aprofundamento:</strong> <span className="font-jp">あの</span> sozinho, sem
          substantivo depois, também funciona como uma interjeição de hesitação — "hã...",
          "bem..." — usada para chamar a atenção de alguém com delicadeza antes de um pedido ou
          pergunta: <span className="font-jp">あのう、しつもんがあるんですが……</span> (
          <em>anou, shitsumon ga aru n desu ga...</em>, "hã... eu tenho uma pergunta..."). É a
          única exceção à regra desta seção — aqui あの não precisa de substantivo nenhum depois.
        </Note>
      </Section>

      <Section title="これ・それ・あれ・どれ — ficam sozinhos">
        <p className="text-sm leading-relaxed text-ink">
          Esta série substitui o próprio objeto. Você usa quando não quer (ou não precisa) nomear
          a coisa.
        </p>
        <Ex
          jp="これはなんですか？"
          romaji="kore wa nan desu ka?"
          pt="O que é isto?"
          notes="これ aponta um objeto perto de quem fala, sem nomeá-lo."
        />
        <Ex
          jp="それをください。"
          romaji="sore o kudasai."
          pt="Me dá isso, por favor."
          notes={`それ = a coisa perto de quem ouve. をください = "por favor, me dê".`}
        />
        <Ex
          jp="あれはわたしのかさです。"
          romaji="are wa watashi no kasa desu."
          pt="Aquilo é meu guarda-chuva."
          notes="あれ = algo longe dos dois. かさ = guarda-chuva."
        />
        <Ex
          jp="どれがあなたのですか？"
          romaji="dore ga anata no desu ka?"
          pt="Qual é o seu?"
          notes={`どれ pergunta "qual" entre várias coisas.`}
        />
        <Ex
          jp="A：これ、たべていい？　B：それはだめ。"
          romaji="A: kore, tabete ii? B: sore wa dame."
          pt="A: Posso comer isto? B: Isso não pode."
          notes="A usa これ (perto de A). B, ao responder, usa それ, porque a mesma coisa está perto de A e longe de B."
        />
      </Section>

      <Section title="ここ・そこ・あそこ・どこ — indicam lugar">
        <p className="text-sm leading-relaxed text-ink">
          Esta série aponta <strong>lugares</strong>, não objetos — ela responde "onde", não "o
          quê". É a série que mais aparece fora de casa: pedindo ou dando direção, marcando onde
          sentar, explicando onde algo ficou.
        </p>
        <Ex jp="ここにすわってください。" romaji="koko ni suwatte kudasai." pt="Por favor, sente-se aqui." />
        <Ex
          jp="そこはあぶないです。"
          romaji="soko wa abunai desu."
          pt="Aí é perigoso."
          notes="あぶない = perigoso."
        />
        <Ex
          jp="あそこにトイレがあります。"
          romaji="asoko ni toire ga arimasu."
          pt="O banheiro fica lá."
          notes={`Repare: o grupo あ usa あそこ (e não あこ). É a única forma "irregular" da tabela.`}
        />
        <Ex
          jp="すみません、ゆうびんきょくはどこですか？"
          romaji="sumimasen, yuubinkyoku wa doko desu ka?"
          pt="Com licença, onde fica o correio?"
          notes="どこ = onde. Frase super útil para se virar na rua."
        />
      </Section>

      <Section title="こちら・そちら・あちら・どちら — direção (formal)">
        <p className="text-sm leading-relaxed text-ink">
          Indicam direção ou lado, de forma educada. Muito usadas por atendentes em lojas, hotéis
          e empresas.
        </p>
        <Ex
          jp="こちらへどうぞ。"
          romaji="kochira e douzo."
          pt="Por aqui, por favor."
          notes="Um atendente guiando você. (へ aqui se lê e.)"
        />
        <Ex jp="えきはあちらです。" romaji="eki wa achira desu." pt="A estação é por lá." />
        <Ex
          jp="どちらがよろしいですか？"
          romaji="dochira ga yoroshii desu ka?"
          pt="Qual dos dois o senhor prefere?"
          notes={`どちら também é a forma educada de "qual entre duas opções".`}
        />
        <Ex
          jp="こちらはたなかさんです。"
          romaji="kochira wa tanaka-san desu."
          pt="Este é o sr. Tanaka."
          notes="こちら também apresenta pessoas com educação — mesmo uso visto na lição de Auto-apresentação."
        />
        <Ex
          jp="どちらさまですか？"
          romaji="dochira-sama desu ka?"
          pt="Quem é, por favor?"
          notes="Forma educada de perguntar a identidade de alguém — no interfone, ao telefone, na recepção."
        />
        <Note>
          Perguntar <span className="font-jp">だれですか</span> ("quem é você?") direto soa
          abrupto, quase uma cobrança. <span className="font-jp">どちらさま</span> —
          literalmente "que direção", com <span className="font-jp">さま</span>, o sufixo mais
          respeitoso (lição de Sufixos de Respeito) — trata a identidade da pessoa como algo a
          perguntar com cuidado, não a exigir. É a forma padrão no interfone, na recepção de um
          escritório, ou ao atender uma ligação endereçada a outra pessoa. O mecanismo de
          polidez por trás da frase (けいご) é assunto das lições de Auto-apresentação e Sufixos
          de Respeito; aqui basta reconhecer e usar <span className="font-jp">どちらさま</span>{' '}
          pronta.
        </Note>
      </Section>

      <Section title="こっち・そっち・あっち・どっち — direção (casual)">
        <p className="text-sm leading-relaxed text-ink">
          São as versões informais das anteriores. Use com amigos e família.
        </p>
        <Ex jp="こっちにきて！" romaji="kocchi ni kite!" pt="Vem aqui!" />
        <Ex
          jp="あっちにいって。"
          romaji="acchi ni itte."
          pt="Vai lá."
          notes={`Dependendo do tom, pode soar rude ("vai pra lá").`}
        />
        <Ex jp="どっちがいい？" romaji="docchi ga ii?" pt="Qual dos dois você prefere?" />
        <GrammarTable
          headers={['Formal', 'Casual', 'Onde cada um cabe']}
          jpCols={[0, 1]}
          rows={[
            ['こちら', 'こっち', 'こちら: lojas, escritórios, apresentações'],
            ['そちら', 'そっち', 'そっち: conversa do dia a dia'],
            ['あちら', 'あっち', 'あっち: pode soar brusco'],
            ['どちら', 'どっち', 'どちら: escolha educada entre dois'],
          ]}
        />
      </Section>

      <Section title="どの・どれ・どちら・どっち — qual delas usar">
        <p className="text-sm leading-relaxed text-ink">
          As quatro formas de perguntar "qual" já apareceram, espalhadas pelas seções anteriores
          — mas nunca são sinônimos livres. Cada uma trava numa resposta diferente para três
          perguntas: vem antes de um substantivo? quantas opções existem? e qual o registro?
          Fixadas essas três respostas, a escolha deixa de ser intuição e vira uma conta simples.
        </p>
        <GrammarTable
          headers={['Forma', 'Precisa de substantivo?', 'Quantas opções', 'Registro']}
          jpCols={[0]}
          rows={[
            ['どの (dono)', 'sim — sempre antes de um substantivo', 'qualquer quantidade', 'neutro'],
            ['どれ (dore)', 'não — fica sozinho', 'três ou mais', 'neutro'],
            ['どちら (dochira)', 'não — fica sozinho', 'duas (regra clássica)', 'formal / educado'],
            ['どっち (docchi)', 'não — fica sozinho', 'duas', 'casual'],
          ]}
        />
        <Note>
          Na prática, <span className="font-jp">どちら</span> costuma aparecer mesmo quando há
          três ou mais opções — soa mais elegante do que{' '}
          <span className="font-jp">どれ</span>, então quem atende ao público (garçom, vendedor,
          recepcionista) tende a usá-la mesmo diante de um cardápio inteiro ou várias amostras.{' '}
          <span className="font-jp">どれ</span> continua correto e comum fora do atendimento; a
          troca por <span className="font-jp">どちら</span> é uma questão de polidez, não de
          quantidade.
        </Note>
      </Section>

      <Section title="こんな・そんな・あんな・どんな — tipo de coisa">
        <p className="text-sm leading-relaxed text-ink">
          Significam "(d)este tipo (de), esse tipo, aquele tipo, que tipo?". Descrevem a{' '}
          <strong>natureza</strong> de algo, não apontam um objeto específico.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          Assim como <span className="font-jp">この・その・あの・どの</span>, esta série funciona
          mais como um <strong>"adjetivo"</strong>: quase sempre vem acompanhada de um
          substantivo logo em seguida, e não fica sozinha.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          Compare: <strong className="font-jp">この</strong>
          <span className="font-jp">ほん</span> = "<strong>este</strong> livro (bem esse aqui)".{' '}
          <strong className="font-jp">こんな</strong>
          <span className="font-jp">ほん</span> = "um livro{' '}
          <strong>assim, deste tipo</strong>".
        </p>
        <Ex
          jp="こんなてんきはきらいです。"
          romaji="konna tenki wa kirai desu."
          pt="Não gosto de tempo assim."
          notes="てんき = clima/tempo. きらい = detestar."
        />
        <Ex
          jp="そんなことをいわないでください。"
          romaji="sonna koto o iwanaide kudasai."
          pt="Por favor, não diga coisas desse tipo."
          notes="pedido com leve reprovação — そんな aponta para algo que a outra pessoa disse ou fez, não para um objeto físico."
        />
        <Ex
          jp="あんなひとにはなりたくない。"
          romaji="anna hito ni wa naritakunai."
          pt="Não quero me tornar uma pessoa como aquela."
          notes="descreve um tipo de pessoa a partir de uma característica notada à distância — comum numa crítica leve sobre alguém fora da conversa."
        />
        <Ex
          jp="どんなおんがくがすきですか？"
          romaji="donna ongaku ga suki desu ka?"
          pt="Que tipo de música você gosta?"
          notes={`どんな é muito comum em perguntas: "que tipo de...?".`}
        />
      </Section>

      <Section title="こう・そう・ああ・どう — modo, maneira">
        <p className="text-sm leading-relaxed text-ink">
          Significam "assim, dessa forma, daquela forma, como?". Descrevem <strong>como</strong>{' '}
          algo é feito.
        </p>
        <Ex
          jp="こうしてください。"
          romaji="kou shite kudasai."
          pt="Por favor, faça assim."
          notes="Dito enquanto se mostra como fazer."
        />
        <Ex jp="そうおもいます。" romaji="sou omoimasu." pt="Acho que sim. / Penso assim." />
        <Ex
          jp="ああ、そうですか。"
          romaji="aa, sou desu ka."
          pt="Ah, é mesmo? / Entendi."
          notes="Reação muito comum ao receber uma informação nova."
        />
        <Ex
          jp="どうすればいいですか？"
          romaji="dou sureba ii desu ka?"
          pt="O que devo fazer? / Como faço?"
        />
        <Ex
          jp="どうぞ。"
          romaji="douzo."
          pt="Por favor (pode ir / aqui está)."
          notes={`Vem de どう ("como você quiser").`}
        />
        <Note>
          Duas expressões importantíssimas do dia a dia:
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              <strong className="font-jp">そうですか</strong> (<em>sou desu ka</em>) = reação de
              quem recebe uma novidade ("Ah, entendi").
            </li>
            <li>
              <strong className="font-jp">そうですね</strong> (<em>sou desu ne</em>) =
              concordância ("É isso mesmo / Pois é").
            </li>
          </ul>
        </Note>
      </Section>

      <Section title="Uso além da distância física">
        <p className="text-sm leading-relaxed text-ink">
          O Ko-So-A-Do também funciona <strong>dentro da conversa</strong>, não só no espaço — a
          mesma régua de distância das primeiras seções, só que medindo o quanto uma informação
          já foi dita ou é compartilhada entre os dois, em vez de medir a distância física de um
          objeto. É a exceção prometida lá atrás: a razão de{' '}
          <span className="font-jp">あれ</span>/<span className="font-jp">あの</span> às vezes
          aparecerem para algo fisicamente perto, desde que os dois já saibam do que se trata.
        </p>
        <GrammarTable
          headers={['Grupo', 'Quando usar no discurso', 'Exemplo']}
          jpCols={[0, 2]}
          rows={[
            [
              'こ',
              <>
                algo que <strong>você</strong> vai dizer a seguir
              </>,
              'こういうりゆうできました。(kou iu riyuu de kimashita.) — Vim por esta razão.',
            ],
            [
              'そ',
              <>
                algo que <strong>o outro</strong> disse, ou que os dois já mencionaram
              </>,
              'そのはなしはしっています。(sono hanashi wa shitte imasu.) — Sei desse assunto.',
            ],
            [
              'あ',
              <>
                algo que <strong>os dois conhecem</strong>, mas não foi citado agora
              </>,
              'あのじけん、おぼえてる？(ano jiken, oboeteru?) — Lembra daquele caso?',
            ],
          ]}
        />
        <Ex
          jp="A：きのうのしけんはむずかしかった。B：そうだったね。"
          romaji="A: kinou no shiken wa muzukashikatta. B: sou datta ne."
          pt="A: A prova de ontem foi difícil. B: Foi mesmo, né."
          notes="B usa そう para se referir ao que A acabou de dizer."
        />
      </Section>

      <Section title="Erros comuns">
        <GrammarTable
          headers={['Erro', 'Incorreto', 'Correto', 'Por quê']}
          jpCols={[1, 2]}
          rows={[
            [
              'Usar この sem substantivo',
              'このはなんですか？',
              'これはなんですか？',
              'この precisa de substantivo; これ fica sozinho.',
            ],
            [
              'Confundir これ e それ (objeto perto de B)',
              'これをください',
              'それをください',
              'Se a coisa está perto de quem ouve, use それ.',
            ],
            [
              'Usar ここ em contexto formal',
              'ここへどうぞ',
              'こちらへどうぞ',
              'Ao atender alguém, こちら soa mais educado.',
            ],
            [
              'Usar どの como pronome',
              'どのがいい？',
              'どれがいい？ / どちらがいい？',
              'どの precisa de substantivo; sozinho, use どれ ou どちら.',
            ],
            [
              'Usar どっち em atendimento educado',
              'どっちがいいですか？ (a um cliente)',
              'どちらがよろしいですか？',
              'どっち é casual; em atendimento ou com desconhecidos, どちら soa apropriado.',
            ],
          ]}
        />
      </Section>

      <Section title="Resumo rápido">
        <GrammarTable
          headers={['Quero dizer...', 'Use']}
          jpCols={[1]}
          rows={[
            ['"este livro" (com substantivo)', 'このほん'],
            ['"isto" (objeto, sozinho)', 'これ'],
            ['"aqui" (lugar)', 'ここ'],
            ['"por aqui" (direção formal)', 'こちら'],
            ['"por aqui" (direção casual)', 'こっち'],
            ['"qual" (com substantivo)', 'どの'],
            ['"qual" (sozinho, três ou mais)', 'どれ'],
            ['"qual dos dois" (educado)', 'どちら'],
            ['"quem é?" (educado, telefone/interfone)', 'どちらさま'],
            ['"deste tipo"', 'こんな'],
            ['"assim, desta forma"', 'こう'],
          ]}
        />
      </Section>
    </div>
  );
}
