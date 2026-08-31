import { Section, Ex, Note, GrammarTable, ReadingKey } from '../components/Licao';
import type { QuizLicao } from '../data/quiz/types';
import type { GrupoKakitori } from '../data/kakitori/types';

export const meta = {
  id: 'aisatsu',
  title: 'Saudações do dia a dia',
  subtitle: 'あいさつ — aisatsu',
  emoji: '👋',
  tags: ['conversa', 'n5'],
};

export const quiz: QuizLicao = {
  frases: [
    {
      id: 'aisatsu-f1',
      tokens: [
        { texto: 'まいあさ', romaji: 'maiasa' },
        { texto: 'しちじ', romaji: 'shichiji' },
        { texto: 'に', romaji: 'ni', particula: true },
        { texto: 'おきます', romaji: 'okimasu' },
      ],
      pt: 'Todos os dias de manhã, acordo às sete horas.',
    },
    {
      id: 'aisatsu-f2',
      tokens: [
        { texto: 'いえ', romaji: 'ie' },
        { texto: 'を', romaji: 'o', particula: true },
        { texto: 'でるまえに', romaji: 'deru mae ni' },
        { texto: 'いってきますと', romaji: 'itte kimasu to' },
        { texto: 'いいます', romaji: 'iimasu' },
      ],
      pt: "Antes de sair de casa, digo 'ittekimasu'.",
    },
    {
      id: 'aisatsu-f3',
      tokens: [
        { texto: 'かぞく', romaji: 'kazoku' },
        { texto: 'に', romaji: 'ni', particula: true },
        { texto: 'ただいまと', romaji: 'tadaima to' },
        { texto: 'いいます', romaji: 'iimasu' },
      ],
      pt: "Digo 'tadaima' para a família.",
    },
    {
      id: 'aisatsu-f4',
      tokens: [
        { texto: 'ごはん', romaji: 'gohan' },
        { texto: 'の', romaji: 'no', particula: true },
        { texto: 'まえに', romaji: 'mae ni' },
        { texto: 'てをあらいます', romaji: 'te o araimasu' },
      ],
      pt: 'Antes da refeição, lavo as mãos.',
    },
    {
      id: 'aisatsu-f5',
      tokens: [
        { texto: 'しごと', romaji: 'shigoto' },
        { texto: 'が', romaji: 'ga', particula: true },
        { texto: 'おわったら', romaji: 'owattara' },
        { texto: 'おつかれさまでしたと', romaji: 'otsukaresama deshita to' },
        { texto: 'いいます', romaji: 'iimasu' },
      ],
      pt: "Quando o trabalho termina, digo 'otsukaresama deshita'.",
    },
    {
      id: 'aisatsu-f6',
      tokens: [
        { texto: 'よる', romaji: 'yoru' },
        { texto: 'じゅうじ', romaji: 'juuji' },
        { texto: 'に', romaji: 'ni', particula: true },
        { texto: 'ねます', romaji: 'nemasu' },
      ],
      pt: 'Durmo às dez da noite.',
    },
  ],
  perguntas: [
    {
      id: 'aisatsu-sig1',
      tipo: 'significado',
      pergunta: 'O que significa いただきます?',
      alternativas: ['dito antes de começar a comer', 'dito depois de comer', 'bom dia', 'com licença'],
      correta: 0,
    },
    {
      id: 'aisatsu-sig2',
      tipo: 'significado',
      pergunta: 'Qual expressão quem fica em casa diz para quem está saindo?',
      alternativas: ['いってらっしゃい', 'いってきます', 'ただいま', 'おかえりなさい'],
      correta: 0,
    },
    {
      id: 'aisatsu-sig3',
      tipo: 'significado',
      pergunta: 'O que すみません pode significar, além de "desculpa"?',
      alternativas: ['com licença / obrigado por incomodar', 'boa noite', 'tchau', 'bem-vindo'],
      correta: 0,
    },
    {
      id: 'aisatsu-sig4',
      tipo: 'significado',
      pergunta: 'Por que さようなら raramente é usado entre amigos próximos no dia a dia?',
      alternativas: [
        'soa como uma despedida definitiva ou de longo prazo',
        'é uma palavra rude',
        'só se usa por telefone',
        'é uma palavra muito antiga que ninguém mais entende',
      ],
      correta: 0,
    },
    {
      id: 'aisatsu-vf1',
      tipo: 'verdadeiro-falso',
      afirmacao: 'おかえりなさい é dito por quem está chegando em casa.',
      correta: false,
      explicacao: 'おかえりなさい é dito por quem já está em casa, recebendo quem chega; quem chega diz ただいま.',
    },
    {
      id: 'aisatsu-vf2',
      tipo: 'verdadeiro-falso',
      afirmacao: 'ごちそうさまでした é dito depois de terminar de comer, para agradecer pela refeição.',
      correta: true,
    },
    {
      id: 'aisatsu-vf3',
      tipo: 'verdadeiro-falso',
      afirmacao: 'おつかれさまでした só é usado por chefes falando com subordinados.',
      correta: false,
      explicacao: 'É usado entre colegas de qualquer nível, como forma padrão de reconhecer o esforço de todos.',
    },
    {
      id: 'aisatsu-sig5',
      tipo: 'significado',
      pergunta: 'O que ございます em おはようございます tem em comum com でございます (visto na lição de Usos do です)?',
      alternativas: [
        'é a mesma peça de polidez, só que grudada numa saudação fixa',
        'nada — são coincidências de escrita',
        'ございます só existe em saudações',
        'でございます vem de おはようございます',
      ],
      correta: 0,
    },
    {
      id: 'aisatsu-vf4',
      tipo: 'verdadeiro-falso',
      afirmacao: 'ごめん é apropriado numa reunião de trabalho formal.',
      correta: false,
      explicacao: 'ごめん é só entre amigos próximos; em contexto formal use すみません, しつれいします ou もうしわけございません.',
    },
    {
      id: 'aisatsu-vf5',
      tipo: 'verdadeiro-falso',
      afirmacao: 'どういたしまして é, de longe, a resposta mais comum a um agradecimento no japonês falado do dia a dia.',
      correta: false,
      explicacao: 'É uma resposta correta, mas soa um pouco formal/didática; no dia a dia é comum ouvir いえいえ ou だいじょうぶです em seu lugar.',
    },
  ],
};

// Termos e frases curtas desta lição, prontos pro ditado — em vez das `frases` do quiz acima
// (que concatenam vários tokens numa frase completa, longa demais pro Kakitori).
export const kakitori: GrupoKakitori[] = [
  {
    id: 'aisatsu-termos',
    label: meta.title,
    itens: [
      { id: 'aisatsu-1', jp: 'おはよう！', kana: 'おはよう！', romaji: 'ohayou!', pt: 'Bom dia! (em casa, informal)' },
      { id: 'aisatsu-2', jp: 'おはようございます。', kana: 'おはようございます。', romaji: 'ohayou gozaimasu.', pt: 'Bom dia. (educado)' },
      { id: 'aisatsu-3', jp: 'ただいま！', kana: 'ただいま！', romaji: 'tadaima!', pt: 'Cheguei!' },
      { id: 'aisatsu-4', jp: 'いってきます！', kana: 'いってきます！', romaji: 'itte kimasu!', pt: 'Vou saindo! (dito por quem sai)' },
      { id: 'aisatsu-5', jp: 'いただきます！', kana: 'いただきます！', romaji: 'itadakimasu!', pt: 'Vou comer! (antes da refeição)' },
      { id: 'aisatsu-6', jp: 'ごちそうさまでした。', kana: 'ごちそうさまでした。', romaji: 'gochisousama deshita.', pt: 'Obrigado pela comida. (ao terminar)' },
      { id: 'aisatsu-7', jp: 'どういたしまして。', kana: 'どういたしまして。', romaji: 'dou itashimashite.', pt: 'De nada.' },
      { id: 'aisatsu-8', jp: 'おつかれさまでした！', kana: 'おつかれさまでした！', romaji: 'otsukaresama deshita!', pt: 'Bom trabalho hoje! (resposta de quem fica)' },
      { id: 'aisatsu-9', jp: 'しつれいします。', kana: 'しつれいします。', romaji: 'shitsurei shimasu.', pt: 'Com licença. (ao entrar numa sala)' },
      { id: 'aisatsu-10', jp: 'おさきにしつれいします。', kana: 'おさきにしつれいします。', romaji: 'osaki ni shitsurei shimasu.', pt: 'Vou saindo primeiro, com licença.' },
      { id: 'aisatsu-11', jp: 'こんにちは、たなかさん。', kana: 'こんにちは、たなかさん。', romaji: 'konnichiwa, tanaka-san.', pt: 'Boa tarde, sr. Tanaka.' },
      { id: 'aisatsu-12', jp: 'こんばんは。おげんきですか。', kana: 'こんばんは。おげんきですか。', romaji: 'konbanwa. ogenki desu ka.', pt: 'Boa noite. Como vai?' },
      { id: 'aisatsu-13', jp: 'ごめん！おくれちゃった。', kana: 'ごめん！おくれちゃった。', romaji: 'gomen! okurechatta.', pt: 'Desculpa! Acabei me atrasando.' },
    ],
  },
];

export default function Aisatsu() {
  return (
    <div className="space-y-10">
      <Section title="Como ler esta lição">
        <p className="text-sm leading-relaxed text-ink">
          Todo o japonês aqui aparece em três partes, para você não depender de saber ler hiragana
          ainda:
        </p>
        <ReadingKey
          lines={[
            { text: 'こんにちは', desc: 'escrita em hiragana' },
            { text: 'konnichiwa', desc: 'leitura em romaji (letras do nosso alfabeto)' },
            { text: 'boa tarde', desc: 'significado' },
          ]}
        />
        <p className="text-sm leading-relaxed text-ink">
          Uma pronúncia especial que aparece bastante nesta lição: em{' '}
          <span className="font-jp">こんにちは</span> e <span className="font-jp">こんばんは</span>,
          o <span className="font-jp">は</span> final lê-se <em>wa</em> (não <em>ha</em>) — é o mesmo{' '}
          <span className="font-jp">は</span> de partícula de tópico, "fossilizado" dentro dessas
          saudações.
        </p>
      </Section>

      <Section title="Objetivos desta lição">
        <p className="text-sm leading-relaxed text-ink">Ao final, você deve saber:</p>
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink">
          <li>
            Usar a saudação certa para cada momento de transição do dia — acordar, sair, chegar,
            comer, terminar o trabalho, dormir.
          </li>
          <li>Escolher o registro certo (casual, neutro, formal) conforme quem está à sua frente.</li>
          <li>
            Responder a um agradecimento, e reconhecer quando すみません substitui "obrigado".
          </li>
          <li>
            Evitar さようなら no dia a dia — e saber por que ela soa mais pesada do que os livros
            sugerem.
          </li>
        </ul>
      </Section>

      <Section title="O que é あいさつ">
        <p className="text-sm leading-relaxed text-ink">
          <strong className="font-jp">あいさつ</strong> (<em>aisatsu</em>) significa "saudação" ou
          "cumprimento". Mas no Japão o conceito é mais amplo do que em português: existe uma
          あいさつ certa para praticamente todo momento de transição do dia — acordar, sair de
          casa, chegar, comer, terminar o trabalho, dormir.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          Diferente da <span className="font-jp">じこしょうかい</span> (auto-apresentação, usada
          uma vez ao conhecer alguém), as あいさつ desta lição se repetem várias vezes por dia,
          todos os dias. Aprendê-las bem rende mais no dia a dia do que quase qualquer outra coisa
          neste estágio inicial.
        </p>
      </Section>

      <Section title="Saudações por horário do dia">
        <GrammarTable
          headers={['Hiragana', 'Romaji', 'Quando usar', 'Registro']}
          jpCols={[0]}
          rows={[
            ['おはようございます', 'ohayou gozaimasu', 'de manhã, até por volta do meio-dia', 'neutro/formal'],
            ['おはよう', 'ohayou', 'de manhã, entre amigos e família', 'casual'],
            ['こんにちは', 'konnichiwa', 'do meio-dia até o fim da tarde', 'neutro'],
            ['こんばんは', 'konbanwa', 'à noite, ao encontrar alguém', 'neutro'],
            ['おやすみなさい', 'oyasumi nasai', 'antes de dormir, ou ao se despedir à noite', 'neutro/formal'],
            ['おやすみ', 'oyasumi', 'antes de dormir, entre amigos e família', 'casual'],
          ]}
        />
        <p className="text-sm leading-relaxed text-ink">
          Repare no padrão: tirar o <span className="font-jp">ございます</span> ou{' '}
          <span className="font-jp">なさい</span> deixa a frase mais casual. Isso se repete em
          várias saudações japonesas.
        </p>
        <Ex jp="こんにちは、たなかさん。" romaji="konnichiwa, tanaka-san." pt="Boa tarde, sr. Tanaka." />
        <Ex
          jp="こんばんは。おげんきですか。"
          romaji="konbanwa. ogenki desu ka."
          pt="Boa noite. Como vai?"
          notes="こんばんは é para encontrar alguém à noite — não confundir com おやすみなさい, que é só para se despedir/dormir"
        />
        <Note>
          <span className="font-jp">ございます</span> não é exclusivo de saudação: é a mesma peça
          de polidez que aparece em <span className="font-jp">でございます</span> (a versão
          extra-formal de です, vista na lição de Usos do です). Aqui ela vem grudada em
          おはよう/ありがとう como parte fixa da expressão educada — você não monta essa frase
          peça por peça, só reconhece que おはようございます é mais formal que おはよう pela
          presença dela.
        </Note>
      </Section>

      <Section title="Ao sair e voltar para casa">
        <p className="text-sm leading-relaxed text-ink">
          Esse par é dito toda vez que alguém sai ou entra em casa (ou até numa sala de escritório).
          Cada lado do par tem uma frase própria.
        </p>
        <GrammarTable
          headers={['Momento', 'Quem fala', 'Hiragana', 'Romaji', 'Significado']}
          jpCols={[2]}
          rows={[
            ['Saindo', 'quem sai', 'いってきます', 'itte kimasu', 'lit. "vou e volto"'],
            ['Saindo', 'quem fica', 'いってらっしゃい', 'itte rasshai', 'lit. "vá e volte"'],
            ['Chegando', 'quem chega', 'ただいま', 'tadaima', 'lit. "agora mesmo" → "cheguei"'],
            ['Chegando', 'quem está em casa', 'おかえりなさい', 'okaeri nasai', 'bem-vindo de volta'],
          ]}
        />
        <p className="text-sm leading-relaxed text-ink">
          No dia a dia entre família e amigos, é comum encurtar para{' '}
          <span className="font-jp">いってらっしゃい</span> →{' '}
          <span className="font-jp">いってら</span>, e{' '}
          <span className="font-jp">おかえりなさい</span> →{' '}
          <span className="font-jp">おかえり</span>.
        </p>
      </Section>

      <Section title="Na hora de comer">
        <p className="text-sm leading-relaxed text-ink">
          Assim como sair/chegar, comer também tem uma saudação de abertura e uma de encerramento.
          Não é uma oração religiosa — é um agradecimento pela comida e por quem a preparou.
        </p>
        <GrammarTable
          headers={['Momento', 'Hiragana', 'Romaji', 'Significado']}
          jpCols={[1]}
          rows={[
            ['Antes de comer', 'いただきます', 'itadakimasu', 'lit. "eu recebo (humildemente)"'],
            ['Depois de comer', 'ごちそうさまでした', 'gochisousama deshita', 'lit. "foi um banquete" → "estava delicioso, obrigado"'],
          ]}
        />
        <Ex
          jp="いただきます！"
          romaji="itadakimasu!"
          pt="Vou comer! (dito antes da primeira garfada)"
        />
        <Ex
          jp="ごちそうさまでした。とてもおいしかったです。"
          romaji="gochisousama deshita. totemo oishikatta desu."
          pt="Muito obrigado pela comida. Estava muito gostoso."
        />
      </Section>

      <Section title="Desculpas e licença">
        <p className="text-sm leading-relaxed text-ink">
          <span className="font-jp">すみません</span> é provavelmente a palavra mais versátil do
          japonês cotidiano: serve para pedir desculpas, chamar atenção de alguém, pedir licença
          para passar e até para agradecer quando alguém teve trabalho por sua causa.
        </p>
        <GrammarTable
          headers={['Hiragana', 'Romaji', 'Uso', 'Registro']}
          jpCols={[0]}
          rows={[
            ['すみません', 'sumimasen', 'desculpa leve / com licença / chamar atenção', 'neutro'],
            ['ごめんなさい', 'gomen nasai', 'desculpa mais pessoal, por algo que você fez', 'neutro'],
            ['ごめん', 'gomen', 'desculpa, entre amigos', 'casual'],
            ['しつれいします', 'shitsurei shimasu', 'com licença, ao entrar/sair de uma sala', 'formal'],
            ['もうしわけございません', 'moushiwake gozaimasen', 'peço muitas desculpas', 'muito formal'],
          ]}
        />
        <Ex
          jp="すみません、ちょっといいですか。"
          romaji="sumimasen, chotto ii desu ka."
          pt="Com licença, posso falar um instante?"
          notes="Aqui すみません funciona como 'com licença', chamando a atenção de alguém."
        />
        <Ex
          jp="しつれいします。"
          romaji="shitsurei shimasu."
          pt="Com licença. (ao entrar numa sala, como uma reunião)"
          notes="A mesma frase, dita ao sair, também funciona como 'com licença, vou saindo'."
        />
        <Ex
          jp="ごめん！おくれちゃった。"
          romaji="gomen! okurechatta."
          pt="Desculpa! Acabei me atrasando."
          notes="ごめん — só entre amigos próximos; a versão que você vai ouvir/usar mais no dia a dia informal"
        />
      </Section>

      <Section title="Agradecimentos e respostas">
        <p className="text-sm leading-relaxed text-ink">
          Assim como as despedidas, "obrigado" também tem uma versão curta (entre amigos) e uma
          alongada com <span className="font-jp">ございます</span> (mais educada) — o mesmo padrão
          que você já viu em おはよう/おはようございます.
        </p>
        <GrammarTable
          headers={['Hiragana', 'Romaji', 'Significado', 'Registro']}
          jpCols={[0]}
          rows={[
            ['ありがとう', 'arigatou', 'obrigado', 'casual'],
            ['ありがとうございます', 'arigatou gozaimasu', 'muito obrigado', 'neutro/formal'],
            ['どういたしまして', 'dou itashimashite', 'de nada', 'neutro'],
            ['だいじょうぶです', 'daijoubu desu', 'tudo bem / sem problema (resposta comum a すみません)', 'neutro'],
          ]}
        />
        <Ex
          jp="てつだってくれて、ありがとうございます。"
          romaji="tetsudatte kurete, arigatou gozaimasu."
          pt="Obrigado por me ajudar."
          notes="ありがとうございます — registro neutro/formal, seguro em quase qualquer situação"
        />
        <Ex
          jp="どういたしまして。"
          romaji="dou itashimashite."
          pt="De nada."
          notes="resposta padrão a um agradecimento — mas veja a nota abaixo"
        />
        <Ex
          jp="だいじょうぶです、きにしないでください。"
          romaji="daijoubu desu, ki ni shinaide kudasai."
          pt="Tudo bem, não precisa se preocupar."
          notes="resposta comum quando alguém se desculpa (すみません) por um incômodo pequeno"
        />
        <Note>
          Na prática, <span className="font-jp">どういたしまして</span> soa um pouco mais
          formal/didático do que o japonês do dia a dia costuma usar entre colegas e amigos —
          muitos simplesmente respondem com um aceno, um{' '}
          <span className="font-jp">いえいえ</span> ("imagina, não foi nada") ou repetem{' '}
          <span className="font-jp">だいじょうぶです</span>. Não é errado usar どういたしまして;
          só não se surpreenda se a resposta que você ouvir de volta for outra.
        </Note>
      </Section>

      <Section title="Encontros e despedidas">
        <p className="text-sm leading-relaxed text-ink">
          <span className="font-jp">さようなら</span> é a palavra que os livros ensinam como "tchau",
          mas no dia a dia japonês ela soa mais séria do que parece: costuma indicar uma despedida
          longa ou definitiva. Entre colegas e amigos, usam-se outras expressões.
        </p>
        <GrammarTable
          headers={['Hiragana', 'Romaji', 'Quando usar', 'Registro']}
          jpCols={[0]}
          rows={[
            ['さようなら', 'sayounara', 'despedida longa, ou de professor para aluno', 'formal'],
            ['またね', 'mata ne', 'até mais, entre amigos', 'casual'],
            ['じゃあね', 'jaa ne', 'tchau, entre amigos', 'casual'],
            ['またあした', 'mata ashita', 'até amanhã', 'neutro'],
            ['おつかれさまでした', 'otsukaresama deshita', 'ao final do trabalho/aula, para qualquer pessoa', 'neutro/formal'],
            ['おさきにしつれいします', 'osaki ni shitsurei shimasu', 'eu vou saindo primeiro (no trabalho)', 'formal'],
          ]}
        />
        <Ex
          jp="おつかれさまでした！またあした。"
          romaji="otsukaresama deshita! mata ashita."
          pt="Bom trabalho hoje! Até amanhã."
          notes="おつかれさまでした reconhece o esforço da outra pessoa; é dito ao final do expediente, de qualquer colega para qualquer colega."
        />
        <Ex
          jp="おさきにしつれいします。"
          romaji="osaki ni shitsurei shimasu."
          pt="Vou saindo primeiro, com licença."
          notes="Dito por quem sai do trabalho antes dos outros. A resposta comum é おつかれさまでした."
        />
      </Section>

      <Section title="Exemplo — uma manhã típica">
        <Ex jp="おはよう！" romaji="ohayou!" pt="Bom dia! (em casa, informal)" />
        <Ex
          jp="いってきます！"
          romaji="itte kimasu!"
          pt="Vou saindo! (dito por quem está de saída)"
        />
        <Ex
          jp="いってらっしゃい。きをつけてね。"
          romaji="itte rasshai. ki o tsukete ne."
          pt="Vá com cuidado. (resposta de quem fica em casa)"
          notes="きをつけて = tome cuidado, uma adição comum ao いってらっしゃい."
        />
      </Section>

      <Section title="Exemplo — voltando para casa">
        <Ex jp="ただいま！" romaji="tadaima!" pt="Cheguei!" />
        <Ex
          jp="おかえりなさい。ごはんできてるよ。"
          romaji="okaeri nasai. gohan dekiteru yo."
          pt="Bem-vindo de volta. A comida já está pronta."
        />
        <Ex jp="いただきます！" romaji="itadakimasu!" pt="Vou comer!" />
        <Ex
          jp="ごちそうさまでした。"
          romaji="gochisousama deshita."
          pt="Obrigado pela comida. (ao terminar)"
        />
      </Section>

      <Section title="Exemplo — no trabalho ou na escola">
        <Ex
          jp="おはようございます。"
          romaji="ohayou gozaimasu."
          pt="Bom dia. (ao chegar, mesmo à tarde se for o primeiro encontro do turno)"
          notes="No ambiente de trabalho japonês, おはようございます é usado por quem chega, como uma saudação de 'primeiro encontro do dia', mesmo depois do meio-dia."
        />
        <Ex
          jp="すみません、ちょっとしつもんがあります。"
          romaji="sumimasen, chotto shitsumon ga arimasu."
          pt="Com licença, tenho uma pergunta rápida."
        />
        <Ex
          jp="おさきにしつれいします。"
          romaji="osaki ni shitsurei shimasu."
          pt="Vou saindo primeiro, com licença."
        />
        <Ex
          jp="おつかれさまでした！"
          romaji="otsukaresama deshita!"
          pt="Bom trabalho hoje! (resposta de quem fica)"
        />
      </Section>

      <Section title="Dicas culturais">
        <p className="text-sm leading-relaxed text-ink">
          <strong>
            <span className="font-jp">おつかれさまでした</span> é onipresente.
          </strong>{' '}
          No Japão, essa frase é usada dezenas de vezes por dia em qualquer ambiente de trabalho ou
          estudo: ao sair, ao cruzar com um colega no corredor, em e-mails, até como
          "oi" informal entre colegas. Não existe uma tradução única — pense nela como "valeu pelo
          esforço".
        </p>
        <p className="text-sm leading-relaxed text-ink">
          <strong>
            <span className="font-jp">さようなら</span> soa mais pesado do que parece.
          </strong>{' '}
          Usá-lo com um amigo ou colega que você vai rever amanhã pode soar estranho, como se fosse
          uma despedida de longo prazo. Prefira{' '}
          <span className="font-jp">またね</span> ou{' '}
          <span className="font-jp">またあした</span> no dia a dia.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          <strong>
            <span className="font-jp">いただきます</span> não é uma oração.
          </strong>{' '}
          Mesmo em casas não religiosas, a frase é dita antes de qualquer refeição, sozinho ou
          acompanhado. É uma expressão de gratidão pela comida e por quem a preparou, não um ato
          religioso.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          <strong>
            <span className="font-jp">すみません</span> substitui "obrigado" com frequência.
          </strong>{' '}
          Quando alguém faz um favor que deu trabalho (segurar a porta, ceder o lugar), é comum
          responder com <span className="font-jp">すみません</span> em vez de{' '}
          <span className="font-jp">ありがとう</span> — reconhecendo o incômodo causado, além do
          agradecimento.
        </p>
      </Section>

      <Section title="Erros comuns">
        <GrammarTable
          headers={['Situação', 'Incorreto', 'Correto', 'Por quê']}
          jpCols={[1, 2]}
          rows={[
            [
              'Sair de casa',
              'さようなら (para a família, ao sair para o trabalho)',
              'いってきます',
              <>
                <span className="font-jp">さようなら</span> soa como uma despedida definitiva, não
                o "já volto" do dia a dia.
              </>,
            ],
            [
              'Terminar de comer',
              'ありがとうございました',
              'ごちそうさまでした',
              'Existe uma frase específica para agradecer pela refeição; usar apenas "obrigado" soa incompleto.',
            ],
            [
              'Despedida casual entre amigos',
              'さようなら (todo dia, ao se despedir de um amigo próximo)',
              'またね / じゃあね',
              <>
                <span className="font-jp">さようなら</span> é formal demais e soa como se vocês não
                fossem se ver tão cedo.
              </>,
            ],
          ]}
        />
      </Section>

      <Section title="Resumo rápido">
        <GrammarTable
          headers={['Momento', 'Frase']}
          jpCols={[1]}
          rows={[
            ['Bom dia', 'おはようございます'],
            ['Boa tarde', 'こんにちは'],
            ['Boa noite (encontro)', 'こんばんは'],
            ['Boa noite (dormir)', 'おやすみなさい'],
            ['Saindo de casa', 'いってきます'],
            ['Recebendo quem sai', 'いってらっしゃい'],
            ['Chegando em casa', 'ただいま'],
            ['Recebendo quem chega', 'おかえりなさい'],
            ['Antes de comer', 'いただきます'],
            ['Depois de comer', 'ごちそうさまでした'],
            ['Desculpa / com licença', 'すみません'],
            ['Obrigado', 'ありがとうございます'],
            ['De nada', 'どういたしまして / いえいえ'],
            ['Fim do trabalho/aula', 'おつかれさまでした'],
            ['Até mais (casual)', 'またね'],
          ]}
        />
      </Section>
    </div>
  );
}
