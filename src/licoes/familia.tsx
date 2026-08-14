import { Section, Ex, Note, GrammarTable, ReadingKey } from '../components/Licao';
import type { QuizLicao } from '../data/quiz/types';

export const meta = {
  id: 'familia',
  title: 'Família',
  subtitle: 'Vocabulário de parentesco e os dois registros',
  emoji: '👨‍👩‍👧',
  tags: ['vocabulário', 'n5'],
};

export const quiz: QuizLicao = {
  frases: [
    {
      id: 'familia-f1',
      tokens: [
        { texto: 'ごかぞく', romaji: 'gokazoku' },
        { texto: 'は', romaji: 'wa', particula: true },
        { texto: 'います', romaji: 'imasu' },
        { texto: 'か', romaji: 'ka' },
      ],
      pt: 'Você tem família?',
    },
    {
      id: 'familia-f2',
      tokens: [
        { texto: 'ごきょうだい', romaji: 'gokyoudai' },
        { texto: 'は', romaji: 'wa', particula: true },
        { texto: 'います', romaji: 'imasu' },
        { texto: 'か', romaji: 'ka' },
      ],
      pt: 'Você tem irmãos?',
    },
    {
      id: 'familia-f3',
      tokens: [
        { texto: 'これ', romaji: 'kore' },
        { texto: 'は', romaji: 'wa' },
        { texto: 'わたし', romaji: 'watashi' },
        { texto: 'の', romaji: 'no', particula: true },
        { texto: 'ちち', romaji: 'chichi' },
        { texto: 'です', romaji: 'desu' },
      ],
      pt: 'Este é meu pai.',
    },
    {
      id: 'familia-f4',
      tokens: [
        { texto: 'りょうしん', romaji: 'ryoushin' },
        { texto: 'は', romaji: 'wa' },
        { texto: 'ブラジル', romaji: 'burajiru' },
        { texto: 'に', romaji: 'ni', particula: true },
        { texto: 'すんでいます', romaji: 'sunde imasu' },
      ],
      pt: 'Meus pais moram no Brasil.',
    },
    {
      id: 'familia-f5',
      tokens: [
        { texto: 'おこさん', romaji: 'okosan' },
        { texto: 'は', romaji: 'wa', particula: true },
        { texto: 'います', romaji: 'imasu' },
        { texto: 'か', romaji: 'ka' },
      ],
      pt: 'Você tem filhos?',
    },
    {
      id: 'familia-f6',
      tokens: [
        { texto: 'なんにん', romaji: 'nan-nin' },
        { texto: 'かぞく', romaji: 'kazoku' },
        { texto: 'です', romaji: 'desu' },
        { texto: 'か', romaji: 'ka' },
      ],
      pt: 'Quantas pessoas há na sua família?',
    },
    {
      id: 'familia-f7',
      tokens: [
        { texto: 'おとうさん', romaji: 'otousan' },
        { texto: 'の', romaji: 'no', particula: true },
        { texto: 'おしごと', romaji: 'oshigoto' },
        { texto: 'は', romaji: 'wa' },
        { texto: 'なん', romaji: 'nan' },
        { texto: 'です', romaji: 'desu' },
        { texto: 'か', romaji: 'ka' },
      ],
      pt: 'Qual é a profissão do seu pai?',
    },
  ],
  perguntas: [
    {
      id: 'familia-sig1',
      tipo: 'significado',
      pergunta: "Como se diz 'meu pai' no registro humilde?",
      alternativas: ['ちち', 'おとうさん', 'ちちおや', 'おとうと'],
      correta: 0,
    },
    {
      id: 'familia-sig2',
      tipo: 'significado',
      pergunta: "Como se diz 'pai de outra pessoa' no registro respeitoso?",
      alternativas: ['おとうさん', 'ちち', 'おっと', 'おじ'],
      correta: 0,
    },
    {
      id: 'familia-sig3',
      tipo: 'significado',
      pergunta: 'O que significa ひとりっこ?',
      alternativas: ['filho único', 'primogênito', 'caçula', 'gêmeos'],
      correta: 0,
    },
    {
      id: 'familia-sig4',
      tipo: 'significado',
      pergunta: 'Qual prefixo nunca deve ser usado para a própria família (ex.: ごかぞく)?',
      alternativas: ['ご', 'お', 'は', 'の'],
      correta: 0,
    },
    {
      id: 'familia-vf1',
      tipo: 'verdadeiro-falso',
      afirmacao: 'Deve-se usar ちち para se referir ao pai de outra pessoa.',
      correta: false,
      explicacao: 'ちち é humilde, só para a própria família; use おとうさん para o pai de outra pessoa.',
    },
    {
      id: 'familia-vf2',
      tipo: 'verdadeiro-falso',
      afirmacao: 'おじいさん significa avô, com o som "i" longo.',
      correta: true,
    },
    {
      id: 'familia-vf3',
      tipo: 'verdadeiro-falso',
      afirmacao: 'Dentro de casa, os filhos chamam os pais pelas formas humildes ちち/はは.',
      correta: false,
      explicacao: 'Usam as formas respeitosas おとうさん/おかあさん, mesmo dentro de casa.',
    },
    {
      id: 'familia-sig5',
      tipo: 'significado',
      pergunta: "Qual é o jeito mais comum de perguntar 'você tem filhos?', sem saber quantos ou de que gênero?",
      alternativas: ['おこさんはいますか', 'むすこさんはいますか', 'おじょうさんはいますか', 'むすめはいますか'],
      correta: 0,
      explicacao: 'おこさん é o termo geral e respeitoso para "filhos"; むすこさん/おじょうさん já presumem o gênero.',
    },
    {
      id: 'familia-vf4',
      tipo: 'verdadeiro-falso',
      afirmacao: 'きょうだい é um termo geral e sem gênero para "irmãos", mesmo que o kanji literalmente signifique "irmãos homens".',
      correta: true,
      explicacao: 'きょうだい (兄弟) é usado no dia a dia como termo coletivo neutro, cobrindo qualquer combinação de irmãos e irmãs.',
    },
  ],
};

export default function Familia() {
  return (
    <div className="space-y-10">
      <Section title="Como ler esta lição">
        <p className="text-sm leading-relaxed text-ink">Cada palavra aparece assim:</p>
        <ReadingKey
          lines={[
            { text: '父', desc: 'kanji (você pode ignorar por enquanto)' },
            { text: 'ちち', desc: 'leitura em hiragana' },
            { text: 'chichi', desc: 'romaji' },
            { text: 'meu pai', desc: 'significado' },
          ]}
        />
        <p className="text-sm leading-relaxed text-ink">
          O kanji está aí só como referência, para você começar a reconhecer com o tempo. No
          início, foque na leitura (hiragana e romaji).
        </p>
      </Section>

      <Section title="Objetivos desta lição">
        <p className="text-sm leading-relaxed text-ink">Ao final, você deve saber:</p>
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink">
          <li>
            Diferenciar o registro humilde (para a própria família) do respeitoso (para a família
            de outra pessoa) e nunca misturar os dois.
          </li>
          <li>Nomear os parentes da família nuclear, estendida e por casamento nos dois registros.</li>
          <li>Perguntar educadamente sobre a família de alguém, usando ご/お corretamente.</li>
          <li>
            Escolher entre um termo geral (<span className="font-jp">こども</span>,{' '}
            <span className="font-jp">きょうだい</span>) e um específico (
            <span className="font-jp">むすこ</span>, <span className="font-jp">あに</span>,{' '}
            <span className="font-jp">いもうと</span>...) conforme a situação.
          </li>
          <li>Evitar os erros de prefixo e pronúncia mais comuns dessa área do vocabulário.</li>
        </ul>
        <Note>
          Fora do escopo desta lição: as formas verbais de keigo que elevam ou rebaixam quem fala
          (ex.: <span className="font-jp">いらっしゃいます</span>,{' '}
          <span className="font-jp">もうします</span>) — isso é assunto das lições
          Auto-apresentação e Sufixos de Respeito. Também não cobrimos aqui família por adoção ou
          novo casamento (padrasto, madrasta, meio-irmão), que não tem um par humilde/respeitoso
          tão estabelecido no japonês do dia a dia.
        </Note>
      </Section>

      <Section title="A ideia central: existem dois registros">
        <p className="text-sm leading-relaxed text-ink">
          Isso aparece toda vez que você fala sobre família em japonês: apresentar seus pais a um
          colega de trabalho, perguntar a um amigo japonês se ele tem irmãos, contar para a
          família anfitriã de um intercâmbio quantas pessoas moram com você. Em japonês, existem{' '}
          <strong>duas palavras diferentes para cada parente</strong>, dependendo de quem é a
          família:
        </p>
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink">
          <li>
            <strong>Registro humilde</strong> (<span className="font-jp">みうち</span>,{' '}
            <em>miuchi</em>): para falar da <strong>sua própria</strong> família.
          </li>
          <li>
            <strong>Registro respeitoso</strong> (<span className="font-jp">たにん</span>,{' '}
            <em>tanin</em>): para falar da família <strong>de outra pessoa</strong>.
          </li>
        </ul>
        <p className="text-sm leading-relaxed text-ink">
          Trocar um pelo outro é um dos erros mais comuns de iniciantes, e um dos que mais chama
          atenção dos japoneses. Por isso vale entender essa lógica desde já.
        </p>
      </Section>

      <Section title="Por que existem dois registros?">
        <p className="text-sm leading-relaxed text-ink">
          Na cultura japonesa, ser humilde consigo mesmo e respeitoso com o outro é um valor
          central.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          Ao falar da <strong>sua</strong> família para alguém de fora, você usa formas simples,
          sem enfeites. Elevar a própria família soaria presunçoso.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          Ao falar da família <strong>do outro</strong>, você usa formas respeitosas. Elevar a
          família alheia demonstra consideração.
        </p>
        <Note>
          Dentro de casa a lógica muda: entre os membros, usam-se as formas respeitosas. As
          crianças chamam os pais de <span className="font-jp">おとうさん</span> e{' '}
          <span className="font-jp">おかあさん</span>. As formas humildes (
          <span className="font-jp">ちち</span>, <span className="font-jp">はは</span>) aparecem
          só quando você fala <strong>sobre</strong> sua família com pessoas de fora.
        </Note>
        <Note>
          Essa troca de vocabulário é o mesmo mecanismo do keigo (linguagem honorífica) explicado
          na lição Auto-apresentação — lá ele troca o verbo inteiro (
          <span className="font-jp">います</span> → <span className="font-jp">おります</span>/
          <span className="font-jp">いらっしゃいます</span>); aqui troca o substantivo de
          parentesco inteiro. É a mesma lógica de "rebaixar quem fala, elevar quem ouve" aplicada
          a outra classe de palavra.
        </Note>
      </Section>

      <Section title="Família nuclear">
        <GrammarTable
          headers={['Grau', 'Kanji', 'Minha família (humilde)', 'Romaji', 'Família de outros (respeitosa)', 'Romaji']}
          jpCols={[1, 2, 4]}
          rows={[
            ['Pai', '父', 'ちち', 'chichi', 'おとうさん', 'otousan'],
            ['Mãe', '母', 'はは', 'haha', 'おかあさん', 'okaasan'],
            ['Irmão mais velho', '兄', 'あに', 'ani', 'おにいさん', 'oniisan'],
            ['Irmã mais velha', '姉', 'あね', 'ane', 'おねえさん', 'oneesan'],
            ['Irmão mais novo', '弟', 'おとうと', 'otouto', 'おとうとさん', 'otoutosan'],
            ['Irmã mais nova', '妹', 'いもうと', 'imouto', 'いもうとさん', 'imoutosan'],
            ['Marido', '夫', 'おっと', 'otto', 'ごしゅじん', 'goshujin'],
            ['Esposa', '妻', 'つま', 'tsuma', 'おくさん', 'okusan'],
            ['Filho', '息子', 'むすこ', 'musuko', 'むすこさん', 'musukosan'],
            ['Filha', '娘', 'むすめ', 'musume', 'おじょうさん', 'ojousan'],
          ]}
        />
        <Note>
          <strong>Aprofundamento:</strong> existem também{' '}
          <span className="font-jp">しゅじん</span> (<em>shujin</em>, "dono da casa") para marido
          e <span className="font-jp">かない</span> (<em>kanai</em>, "dentro da casa") para
          esposa. São termos antigos, com tom hierárquico, que muitos japoneses hoje evitam — mas
          você ainda vai ouvi-los de pessoas mais velhas. Para o seu vocabulário ativo, prefira{' '}
          <span className="font-jp">おっと</span> (marido) e <span className="font-jp">つま</span>{' '}
          (esposa).
        </Note>
      </Section>

      <Section title="Família estendida">
        <GrammarTable
          headers={['Grau', 'Kanji', 'Minha família', 'Romaji', 'Família de outros', 'Romaji']}
          jpCols={[1, 2, 4]}
          rows={[
            ['Avô', '祖父', 'そふ', 'sofu', 'おじいさん', 'ojiisan'],
            ['Avó', '祖母', 'そぼ', 'sobo', 'おばあさん', 'obaasan'],
            ['Tio', '叔父', 'おじ', 'oji', 'おじさん', 'ojisan'],
            ['Tia', '叔母', 'おば', 'oba', 'おばさん', 'obasan'],
            ['Primo(a)', '従兄弟', 'いとこ', 'itoko', 'いとこさん', 'itokosan'],
            ['Sobrinho', '甥', 'おい', 'oi', 'おいごさん', 'oigosan'],
            ['Sobrinha', '姪', 'めい', 'mei', 'めいごさん', 'meigosan'],
          ]}
        />
        <Note>
          <p>Cuidado com uma diferença de som pequena mas importante:</p>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              <strong className="font-jp">おじいさん</strong> (<em>ojiisan</em>) = avô — tem o som{' '}
              <em>i</em> <strong>longo</strong> (jii).
            </li>
            <li>
              <strong className="font-jp">おじさん</strong> (<em>ojisan</em>) = tio — tem o som{' '}
              <em>i</em> <strong>curto</strong> (ji).
            </li>
          </ul>
          <p>
            O mesmo vale para <span className="font-jp">おばあさん</span> (avó) e{' '}
            <span className="font-jp">おばさん</span> (tia). Chamar alguém de "avó" quando você
            quis dizer "tia" pode ser constrangedor.
          </p>
        </Note>
        <Note>
          <strong>Aprofundamento:</strong> no dia a dia, é comum ouvir{' '}
          <span className="font-jp">おいっこ</span> (<em>oikko</em>) e{' '}
          <span className="font-jp">めいっこ</span> (<em>meikko</em>) em vez de{' '}
          <span className="font-jp">おい</span>/<span className="font-jp">めい</span> ao falar do
          próprio sobrinho ou sobrinha — soam um pouco mais informais e afetuosos. As formas da
          tabela (<span className="font-jp">おい</span>/<span className="font-jp">めい</span>)
          são as corretas para o registro neutro e para reconhecer em textos.
        </Note>
      </Section>

      <Section title="Família por casamento">
        <GrammarTable
          headers={['Grau', 'Kanji', 'Minha família', 'Romaji', 'Uso respeitoso']}
          jpCols={[1, 2, 4]}
          rows={[
            ['Sogro', '義父', 'ぎふ', 'gifu', 'おとうさん'],
            ['Sogra', '義母', 'ぎぼ', 'gibo', 'おかあさん'],
            ['Cunhado mais velho', '義兄', 'ぎけい', 'gikei', 'おにいさん'],
            ['Cunhada mais velha', '義姉', 'ぎし', 'gishi', 'おねえさん'],
            ['Cunhado mais novo', '義弟', 'ぎてい', 'gitei', 'ぎていさん'],
            ['Cunhada mais nova', '義妹', 'ぎまい', 'gimai', 'ぎまいさん'],
            ['Genro', '婿', 'むこ', 'muko', 'むこさん'],
            ['Nora', '嫁', 'よめ', 'yome', 'およめさん'],
          ]}
        />
        <Note>
          O prefixo <span className="font-jp">義</span> (<em>gi</em>) marca "parente por
          casamento". Esses termos compactos (<span className="font-jp">ぎけい</span>,{' '}
          <span className="font-jp">ぎし</span>, <span className="font-jp">ぎてい</span>,{' '}
          <span className="font-jp">ぎまい</span>) soam formais, quase de documento. Na fala do
          dia a dia é mais natural dizer <span className="font-jp">ぎりの</span> + o termo de
          sangue: <span className="font-jp">ぎりのあに</span> (<em>giri no ani</em>, "cunhado
          mais velho"). No registro respeitoso, também é comum simplesmente usar{' '}
          <span className="font-jp">おとうとさん</span>/<span className="font-jp">いもうとさん</span>{' '}
          sem diferenciar se é irmão de sangue ou por casamento — a distinção importa mais para
          quem fala da própria família. Não precisa decorar tudo isso agora; volte aqui quando
          precisar.
        </Note>
      </Section>

      <Section title="Filhos por ordem de nascimento">
        <p className="text-sm leading-relaxed text-ink">
          Os termos <span className="font-jp">ちょうなん</span>/<span className="font-jp">じなん</span>/
          <span className="font-jp">さんなん</span> (primeiro, segundo, terceiro filho homem) e{' '}
          <span className="font-jp">ちょうじょ</span>/<span className="font-jp">じじょ</span>{' '}
          (primeira, segunda filha) aparecem em contextos um pouco mais formais — se apresentando,
          preenchendo um formulário, ou explicando a ordem de nascimento numa conversa mais séria.
          Já <span className="font-jp">ひとりっこ</span> (filho único) e{' '}
          <span className="font-jp">すえっこ</span> (caçula) são super comuns no dia a dia,
          inclusive brincando sobre personalidade ("típico de caçula").
        </p>
        <GrammarTable
          headers={['Kanji', 'Hiragana', 'Romaji', 'Significado']}
          jpCols={[0, 1]}
          rows={[
            ['長男', 'ちょうなん', 'chounan', 'primogênito (homem)'],
            ['次男', 'じなん', 'jinan', 'segundo filho homem'],
            ['三男', 'さんなん', 'sannan', 'terceiro filho homem'],
            ['長女', 'ちょうじょ', 'choujo', 'primogênita (mulher)'],
            ['次女', 'じじょ', 'jijo', 'segunda filha mulher'],
            ['末っ子', 'すえっこ', 'suekko', 'o caçula (mais novo)'],
            ['一人っ子', 'ひとりっこ', 'hitorikko', 'filho único'],
          ]}
        />
        <Ex
          jp="わたしはちょうなんで、いもうとがふたりいます。"
          romaji="watashi wa chounan de, imouto ga futari imasu."
          pt="Sou o primogênito e tenho duas irmãs mais novas."
          notes="ふたり = duas pessoas. いもうと (minha irmã mais nova) está na forma humilde, porque falo da minha família."
        />
      </Section>

      <Section title="Outros termos úteis">
        <GrammarTable
          headers={['Kanji', 'Hiragana', 'Romaji', 'Significado']}
          jpCols={[0, 1]}
          rows={[
            ['家族', 'かぞく', 'kazoku', 'família (em geral)'],
            ['両親', 'りょうしん', 'ryoushin', 'os pais (pai e mãe juntos)'],
            ['兄弟', 'きょうだい', 'kyoudai', 'irmãos (geral)'],
            ['姉妹', 'しまい', 'shimai', 'irmãs'],
            ['子供', 'こども', 'kodomo', 'criança / filho(s)'],
            ['孫', 'まご', 'mago', 'neto / neta'],
            ['親戚', 'しんせき', 'shinseki', 'parentes em geral'],
            ['独身', 'どくしん', 'dokushin', 'solteiro(a)'],
            ['既婚', 'きこん', 'kikon', 'casado(a)'],
            ['離婚', 'りこん', 'rikon', 'divórcio / divorciado(a)'],
          ]}
        />
      </Section>

      <Section title="Termos gerais vs. específicos">
        <p className="text-sm leading-relaxed text-ink">
          Várias palavras de parentesco têm uma versão "guarda-chuva", que cobre o grupo todo sem
          entrar em detalhe, e uma versão específica, que já entrega gênero ou posição. Isso
          importa porque escolher a errada não é gramaticalmente incorreto, mas soa estranho — é
          como responder "eu tenho um labrador" quando alguém só perguntou se você tem animal de
          estimação. A regra prática: use o termo geral para perguntar ou falar de algo que ainda
          não se sabe; use o específico quando o gênero ou a posição já são conhecidos.
        </p>
        <GrammarTable
          headers={['Geral', 'Específico', 'Quando usar o geral', 'Quando usar o específico']}
          jpCols={[0, 1]}
          rows={[
            [
              'こども / おこさん',
              'むすこ・むすめ / むすこさん・おじょうさん',
              'Perguntando se a pessoa tem filhos, sem saber quantos ou de que gênero',
              'Já se sabe que é filho ou filha, e quer-se falar dele/dela especificamente',
            ],
            [
              'きょうだい / ごきょうだい',
              'あに・あね・おとうと・いもうと',
              'Perguntando se a pessoa tem irmãos, sem detalhar',
              'Contando quantos irmãos, a ordem e o gênero de cada um',
            ],
          ]}
        />
        <Ex
          jp="おこさんはいますか？"
          romaji="okosan wa imasu ka?"
          pt="Você tem filhos?"
          notes="pergunta geral — o jeito mais comum de perguntar; não presume gênero nem quantidade"
        />
        <Ex
          jp="むすこさんはおいくつですか？"
          romaji="musukosan wa oikutsu desu ka?"
          pt="Quantos anos tem o seu filho?"
          notes="específico — só faz sentido depois de já saber que a pessoa tem um filho homem"
        />
        <Ex
          jp="ごきょうだいはなんにんですか？"
          romaji="gokyoudai wa nan-nin desu ka?"
          pt="Quantos irmãos você tem?"
          notes="pergunta geral sobre a quantidade, sem pedir detalhe ainda"
        />
        <Ex
          jp="あにがひとりと、いもうとがふたりいます。"
          romaji="ani ga hitori to, imouto ga futari imasu."
          pt="Tenho um irmão mais velho e duas irmãs mais novas."
          notes="resposta específica, nomeando cada um — comum ao responder essa pergunta puxando papo com alguém novo"
        />
      </Section>

      <Section title="Perguntando sobre a família">
        <p className="text-sm leading-relaxed text-ink">
          Ao perguntar sobre a família <strong>do outro</strong>, usam-se as formas respeitosas.
        </p>
        <Note>
          <span className="font-jp">ご</span> e <span className="font-jp">お</span> aqui são os
          mesmos prefixos honoríficos ensinados na lição Sufixos de Respeito (
          <span className="font-jp">ご</span> antes de palavra de origem chinesa,{' '}
          <span className="font-jp">お</span> antes de origem japonesa) — a regra vale para
          qualquer coisa relacionada à outra pessoa, não só parentesco.
        </Note>
        <Ex
          jp="ごかぞくはいますか？"
          romaji="gokazoku wa imasu ka?"
          pt="Você tem família?"
          notes="ごかぞく é a forma respeitosa de かぞく. Nunca use ご para a sua própria família."
        />
        <Ex
          jp="ごきょうだいはいますか？"
          romaji="gokyoudai wa imasu ka?"
          pt="Você tem irmãos?"
          notes="pergunta comum logo depois de conhecer alguém, puxando papo"
        />
        <Ex
          jp="なんにんかぞくですか？"
          romaji="nan-nin kazoku desu ka?"
          pt="Quantas pessoas há na sua família?"
          notes="なんにん = quantas pessoas."
        />
        <Ex
          jp="ごりょうしんはおげんきですか？"
          romaji="goryoushin wa ogenki desu ka?"
          pt="Seus pais estão bem?"
          notes="ごりょうしん = seus pais (respeitoso); おげんき = bem/com saúde (também com お educado)."
        />
        <Ex
          jp="おとうさんのおしごとはなんですか？"
          romaji="otousan no oshigoto wa nan desu ka?"
          pt="Qual é a profissão do seu pai?"
          notes="おとうさん (pai do outro, respeitoso). おしごと = trabalho, com o お educado."
        />
      </Section>

      <Section title="Exemplos em contexto">
        <Ex
          jp="これはわたしのちちです。"
          romaji="kore wa watashi no chichi desu."
          pt="Este é meu pai."
          notes="Apresentando o próprio pai, usa-se ちち (humilde), nunca おとうさん."
        />
        <Ex
          jp="たなかさんのおとうさんはどんなおしごとをされていますか？"
          romaji="tanaka-san no otousan wa donna oshigoto o sarete imasu ka?"
          pt="Que tipo de trabalho o pai do sr. Tanaka faz?"
          notes="Falando do pai de outra pessoa, usa-se おとうさん (respeitoso). されていますか é uma forma verbal de keigo — foge do escopo desta lição; repare só na troca do substantivo."
        />
        <Ex
          jp="いもうとがふたりとおとうとがひとりいます。"
          romaji="imouto ga futari to otouto ga hitori imasu."
          pt="Tenho duas irmãs mais novas e um irmão mais novo."
          notes="ふたり = duas pessoas; ひとり = uma pessoa."
        />
        <Ex
          jp="りょうしんはブラジルにすんでいます。"
          romaji="ryoushin wa burajiru ni sunde imasu."
          pt="Meus pais moram no Brasil."
        />
        <Ex
          jp="わたしはひとりっこなので、きょうだいはいません。"
          romaji="watashi wa hitorikko na node, kyoudai wa imasen."
          pt="Sou filho único, então não tenho irmãos."
          notes={`なので = "por isso / então". いません = não há (para seres vivos).`}
        />
      </Section>

      <Section title="Erros comuns">
        <GrammarTable
          headers={['Erro', 'Incorreto', 'Correto', 'Por quê']}
          jpCols={[1, 2]}
          rows={[
            [
              'Usar おとうさん para o próprio pai com estranhos',
              'わたしのおとうさんはいしゃです',
              'わたしのちちはいしゃです',
              'おとうさん é respeitoso; para a sua família, use ちち.',
            ],
            [
              'Confundir おじいさん e おじさん',
              'Chamar um homem de 50 anos de おじいさん',
              'おじさん',
              'おじいさん = avô (bem mais velho); おじさん = tio / homem de meia-idade.',
            ],
            [
              'Usar ごかぞく para a própria família',
              'わたしのごかぞくは…',
              'わたしのかぞくは…',
              'ご é respeitoso; a sua família vai sem ele.',
            ],
            [
              'Usar むすめ/むすこ como se fossem "criança" em geral',
              'むすめさんはいますか？ (tentando perguntar de forma geral)',
              'おこさんはいますか？',
              'むすめさん já presume que é filha (mulher); para perguntar sem saber o gênero, use おこさん.',
            ],
          ]}
        />
      </Section>

      <Section title="Resumo rápido">
        <GrammarTable
          headers={['Situação', 'Use o registro...', 'Exemplo']}
          jpCols={[2]}
          rows={[
            ['Falo da minha família', 'humilde', 'ちち, はは, あに'],
            ['Falo da família de outra pessoa', 'respeitoso', 'おとうさん, おかあさん, おにいさん'],
            ['Dentro de casa, chamando um parente', 'respeitoso', 'おとうさん, おかあさん'],
            ['Pergunta geral sobre filhos/irmãos', 'termo guarda-chuva', 'こども, きょうだい, おこさん, ごきょうだい'],
            ['Já se sabe o gênero/posição', 'termo específico', 'むすこ, おじょうさん, あに, あね, おとうと, いもうと'],
          ]}
        />
      </Section>
    </div>
  );
}
