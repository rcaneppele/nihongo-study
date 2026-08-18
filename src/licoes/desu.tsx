import { Section, Ex, Note, GrammarTable, ReadingKey } from '../components/Licao';
import type { QuizLicao } from '../data/quiz/types';

export const meta = {
  id: 'desu',
  title: 'Usos do desu です',
  subtitle: 'Presente, passado, afirmativo e negativo',
  emoji: '🟰',
  tags: ['gramática', 'n5'],
  audio: true,
};

export const quiz: QuizLicao = {
  frases: [
    {
      id: 'desu-f1',
      tokens: [
        { texto: 'たなかさん', romaji: 'tanaka-san' },
        { texto: 'は', romaji: 'wa', particula: true },
        { texto: 'せんせい', romaji: 'sensei' },
        { texto: 'です', romaji: 'desu' },
      ],
      pt: 'O sr. Tanaka é professor.',
    },
    {
      id: 'desu-f2',
      tokens: [
        { texto: 'わたし', romaji: 'watashi' },
        { texto: 'は', romaji: 'wa', particula: true },
        { texto: 'がくせい', romaji: 'gakusei' },
        { texto: 'です', romaji: 'desu' },
      ],
      pt: 'Eu sou estudante.',
    },
    {
      id: 'desu-f3',
      tokens: [
        { texto: 'わたし', romaji: 'watashi' },
        { texto: 'は', romaji: 'wa', particula: true },
        { texto: 'にほんじん', romaji: 'nihonjin' },
        { texto: 'ではありません', romaji: 'dewa arimasen' },
      ],
      pt: 'Eu não sou japonês.',
    },
    {
      id: 'desu-f4',
      tokens: [
        { texto: 'わたし', romaji: 'watashi' },
        { texto: 'は', romaji: 'wa', particula: true },
        { texto: 'がくせい', romaji: 'gakusei' },
        { texto: 'じゃない', romaji: 'janai' },
      ],
      pt: 'Eu não sou estudante. (casual)',
    },
    {
      id: 'desu-f5',
      tokens: [
        { texto: 'きのう', romaji: 'kinou' },
        { texto: 'は', romaji: 'wa', particula: true },
        { texto: 'やすみ', romaji: 'yasumi' },
        { texto: 'でした', romaji: 'deshita' },
      ],
      pt: 'Ontem foi dia de folga.',
    },
    {
      id: 'desu-f6',
      tokens: [
        { texto: 'たなかさん', romaji: 'tanaka-san' },
        { texto: 'は', romaji: 'wa', particula: true },
        { texto: 'せんせい', romaji: 'sensei' },
        { texto: 'でした', romaji: 'deshita' },
      ],
      pt: 'O sr. Tanaka era professor.',
    },
    {
      id: 'desu-f7',
      tokens: [
        { texto: 'わたし', romaji: 'watashi' },
        { texto: 'は', romaji: 'wa', particula: true },
        { texto: 'がくせい', romaji: 'gakusei' },
        { texto: 'ではありませんでした', romaji: 'dewa arimasen deshita' },
      ],
      pt: 'Eu não era estudante.',
    },
    {
      id: 'desu-f8',
      tokens: [
        { texto: 'きのう', romaji: 'kinou' },
        { texto: 'は', romaji: 'wa', particula: true },
        { texto: 'あめ', romaji: 'ame' },
        { texto: 'じゃなかった', romaji: 'janakatta' },
      ],
      pt: 'Ontem não choveu. (lit. ontem não foi chuva, casual)',
    },
    {
      id: 'desu-f9',
      tokens: [
        { texto: 'ここ', romaji: 'koko' },
        { texto: 'は', romaji: 'wa', particula: true },
        { texto: 'しずか', romaji: 'shizuka' },
        { texto: 'です', romaji: 'desu' },
      ],
      pt: 'Aqui é tranquilo.',
    },
    {
      id: 'desu-f10',
      tokens: [
        { texto: 'ここ', romaji: 'koko' },
        { texto: 'は', romaji: 'wa', particula: true },
        { texto: 'しずか', romaji: 'shizuka' },
        { texto: 'ではありません', romaji: 'dewa arimasen' },
      ],
      pt: 'Aqui não é tranquilo.',
    },
  ],
  perguntas: [
    {
      id: 'desu-sig1',
      tipo: 'significado',
      pergunta: 'Para que serve です numa frase afirmativa no presente, como たなかさんはせんせいです?',
      alternativas: [
        'Para dar polidez à frase',
        'Para transformar o substantivo em verbo',
        'Para indicar passado',
        'Para negar a frase',
      ],
      correta: 0,
      explicacao: 'せんせい sozinho já forma a frase; です entra só para deixar o tom educado.',
    },
    {
      id: 'desu-sig2',
      tipo: 'significado',
      pergunta: 'Qual é a forma passada afirmativa de です?',
      alternativas: ['でした', 'だった', 'ではない', 'ではありません'],
      correta: 0,
    },
    {
      id: 'desu-sig3',
      tipo: 'significado',
      pergunta: 'Qual é a forma negativa educada de です no presente?',
      alternativas: ['ではありません / じゃありません', 'ではなかった', 'でした', 'じゃない'],
      correta: 0,
    },
    {
      id: 'desu-sig4',
      tipo: 'significado',
      pergunta: 'Qual é a forma negativa casual de です no passado?',
      alternativas: ['じゃなかった / ではなかった', 'じゃありませんでした', 'でした', 'じゃない'],
      correta: 0,
      explicacao: 'じゃありませんでした também é passado negativo, mas na trilha educada, não casual.',
    },
    {
      id: 'desu-sig5',
      tipo: 'significado',
      pergunta: "Como fica 'きのうはあめじゃなかった' na trilha educada (ではありませんでした)?",
      alternativas: [
        'きのうはあめではありませんでした',
        'きのうはあめじゃありません',
        'きのうはあめでした',
        'きのうはあめではない',
      ],
      correta: 0,
    },
    {
      id: 'desu-vf1',
      tipo: 'verdadeiro-falso',
      afirmacao: 'じゃ é uma contração falada de では, usada no dia a dia.',
      correta: true,
    },
    {
      id: 'desu-vf2',
      tipo: 'verdadeiro-falso',
      afirmacao: 'です é um verbo e se conjuga como os verbos do Grupo 1 (ごだんどうし).',
      correta: false,
      explicacao: 'です é a cópula — uma peça própria, que não pertence a nenhum dos três grupos de verbos.',
    },
    {
      id: 'desu-vf3',
      tipo: 'verdadeiro-falso',
      afirmacao: 'A negativa de um adjetivo -い, como たかい (caro), também se forma com じゃない: たかいじゃない.',
      correta: false,
      explicacao: 'Adjetivos -い negam trocando い por くない: たかい → たかくない. じゃない/ではない só vale para substantivos e adjetivos -な.',
    },
    {
      id: 'desu-vf4',
      tipo: 'verdadeiro-falso',
      afirmacao: 'ではありませんでした é mais formal do que じゃなかった.',
      correta: true,
    },
    {
      id: 'desu-sig6',
      tipo: 'significado',
      pergunta: 'Qual é o jeito correto de dizer "Há um gato no jardim" (anunciar existência, não descrever um sujeito conhecido)?',
      alternativas: ['にわにねこがいます', 'にわはねこです', 'ねこがにわです', 'にわにねこでした'],
      correta: 0,
      explicacao:
        'います (lugar+に, sujeito+が) anuncia que algo existe. です descreve um sujeito já conhecido — inclusive sua localização, como em トイレはあそこです.',
    },
    {
      id: 'desu-vf5',
      tipo: 'verdadeiro-falso',
      afirmacao: '「トイレはあそこです」(o banheiro é ali) é uma frase correta, mesmo falando de localização.',
      correta: true,
      explicacao:
        'です pode informar a localização de um sujeito já conhecido; o que ele não faz é anunciar que algo existe — isso é papel de います/あります.',
    },
    {
      id: 'desu-vf6',
      tipo: 'verdadeiro-falso',
      afirmacao: 'です pode ser usado para anunciar que algo existe em um lugar, como います faz.',
      correta: false,
      explicacao: 'です descreve/classifica um sujeito conhecido. Anunciar existência é sempre います/あります.',
    },
    {
      id: 'desu-sig7',
      tipo: 'significado',
      pergunta: 'Qual das formas de negativa educada no presente é a mais comum na fala do dia a dia?',
      alternativas: ['じゃないです', 'ではありません', 'じゃない', 'ではない'],
      correta: 0,
      explicacao:
        'じゃないです (a negativa casual じゃない + です) é a mais ouvida na fala; ではありません soa um pouco mais formal/escrito.',
    },
    {
      id: 'desu-sig8',
      tipo: 'significado',
      pergunta: 'Como se transforma がくせいです em uma pergunta?',
      alternativas: [
        'acrescentando か no final: がくせいですか',
        'invertendo a ordem das palavras',
        'trocando です por でしょう',
        'tirando です e pondo か no início',
      ],
      correta: 0,
    },
    {
      id: 'desu-vf7',
      tipo: 'verdadeiro-falso',
      afirmacao: 'Usar だ diretamente com um superior ou com alguém que você acabou de conhecer é uma escolha segura e neutra.',
      correta: false,
      explicacao:
        'だ pode soar mais abrupto fora de contextos muito próximos; o mais seguro na fala informal é simplesmente omitir です.',
    },
    {
      id: 'desu-vf8',
      tipo: 'verdadeiro-falso',
      afirmacao: 'É correto usar さん no final do próprio nome ao se apresentar, como em わたしはたなかさんです.',
      correta: false,
      explicacao: 'さん (e outros tratamentos honoríficos) nunca se aplicam a você mesmo. O certo é わたしはたなかです.',
    },
  ],
};

export default function Desu() {
  return (
    <div className="space-y-10">
      <Section title="Como ler esta lição">
        <p className="text-sm leading-relaxed text-ink">
          Como em todas as lições, o japonês aparece em hiragana (e, quando o
          vocabulário pede — nomes estrangeiros, por exemplo — katakana) + romaji,
          sem kanji.
        </p>
        <ReadingKey
          lines={[
            { text: 'です', desc: 'hiragana' },
            { text: 'desu', desc: 'romaji' },
            { text: 'é / são (educado)', desc: 'significado' },
            { text: 'ブラジル', desc: 'katakana (nomes estrangeiros, como países)' },
          ]}
        />
      </Section>

      <Section title="Objetivos desta lição">
        <p className="text-sm leading-relaxed text-ink">Ao final, você deve saber:</p>
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink">
          <li>Quando です é obrigatório para soar educado, e quando dá para omitir.</li>
          <li>
            Conjugar です nos quatro cenários — presente/passado, afirmativo/negativo —
            nas trilhas educada e casual.
          </li>
          <li>
            Por que です também diz onde algo conhecido fica, mas <strong>não</strong>{' '}
            anuncia que algo existe (isso é trabalho de います/あります).
          </li>
          <li>Por que a fala do dia a dia costuma omitir です, em vez de usar だ.</li>
          <li>Perguntar com ですか, e reconhecer (sem precisar produzir) でございます.</li>
          <li>
            Não confundir a negativa de です (じゃない) com a negativa dos adjetivos -い
            (くない) — são regras diferentes.
          </li>
        </ul>
      </Section>

      <Section title="Por que です é a primeira coisa que você aprende">
        <p className="text-sm leading-relaxed text-ink">
          です é a peça que sustenta toda apresentação pessoal educada: no balcão da
          imigração, numa entrevista de emprego, ao se apresentar num novo trabalho ou
          numa festa. É praticamente impossível passar por essas situações sem usá-lo.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          Sem dominar as quatro combinações desta lição, você fica preso ao presente
          afirmativo — incapaz de negar ("não sou..."), de falar no passado ("era...") ou
          de ajustar o tom para quem está à sua frente. É exatamente essa liberdade que o
          resto da lição constrói.
        </p>
      </Section>

      <Section title="O que é です">
        <p className="text-sm leading-relaxed text-ink">
          <span className="font-jp">です</span> não é um verbo comum — não pertence a nenhum dos
          três grupos de conjugação verbal. Ele é a <strong>cópula</strong>: a peça que liga o
          sujeito a um substantivo ou a um adjetivo -な, funcionando como o nosso "ser/estar".
        </p>
        <Ex
          jp="たなかさんはせんせいです。"
          romaji="tanaka-san wa sensei desu."
          pt="O sr. Tanaka é professor."
          notes="たなかさんは (sujeito) + せんせい (o que se diz sobre ele) + です (liga os dois, com polidez)"
        />
        <p className="text-sm leading-relaxed text-ink">
          Repare que a frase já faz sentido sem です — <span className="font-jp">たなかさんはせんせい</span>{' '}
          já comunica "o Tanaka, professor". O papel do です nessa frase é justamente dar{' '}
          <strong>polidez</strong>. É esse ponto que o resto da lição explora: como です muda
          conforme o tempo (presente/passado) e a afirmação (positiva/negativa).
        </p>
        <Note>
          <strong>Aprofundamento:</strong> em lojas, trens, hotéis e outros atendimentos ao
          público você vai <strong>ouvir</strong>{' '}
          <span className="font-jp">でございます</span> no lugar de です — a versão
          extra-formal usada por quem atende, não algo que você precisa produzir. É o mesmo
          です por trás, só mais polido: <span className="font-jp">こちらはレジでございます</span>{' '}
          ("aqui é o caixa").
        </Note>
      </Section>

      <Section title='です também fala de lugar — mas não "existe"'>
        <p className="text-sm leading-relaxed text-ink">
          です identifica o que é verdade sobre um sujeito já conhecido — inclusive{' '}
          <strong>onde ele fica</strong>. O que です não faz é anunciar que algo existe. Para
          isso, o japonês usa uma estrutura diferente: lugar +{' '}
          <span className="font-jp">に</span>, sujeito + <span className="font-jp">が</span>,{' '}
          <span className="font-jp">います</span> (seres vivos) ou{' '}
          <span className="font-jp">あります</span> (coisas). に e が são partículas
          próprias — detalhes na lição de Partículas; aqui o foco é só saber qual das duas
          estruturas usar.
        </p>
        <Ex
          jp="トイレはあそこです。"
          romaji="toire wa asoko desu."
          pt="O banheiro é ali."
          notes="です: localização de um sujeito já conhecido (responde 'onde fica X?')"
        />
        <Ex
          jp="にわにねこがいます。"
          romaji="niwa ni neko ga imasu."
          pt="Há um gato no jardim."
          notes="います: anuncia a existência de algo — estrutura lugar+に, sujeito+が"
        />
        <Ex
          jp="これはねこです。"
          romaji="kore wa neko desu."
          pt="Isto é um gato."
          notes="です: classificação pura, sem lugar nenhum envolvido"
        />
        <Note>
          Essa é uma das confusões mais comuns de quem vem do português: "ser" e "estar"
          convivem na mesma ideia, e a tentação é achar que です nunca serve para lugar.
          Não é bem assim — <span className="font-jp">トイレはあそこです</span> é
          perfeitamente correto. A pergunta certa não é "tem lugar na frase?", e sim "a
          frase está <strong>descrevendo um sujeito conhecido</strong> (です) ou{' '}
          <strong>anunciando que algo existe</strong> (います/あります)?" います/あります
          ficam fora do escopo desta lição.
        </Note>
      </Section>

      <Section title="Presente afirmativo — polidez">
        <p className="text-sm leading-relaxed text-ink">
          Em uma frase afirmativa no presente, です entra só para deixar o tom educado. Sem ele, a
          frase fica casual (correta entre amigos e família, mas não em situações formais).
        </p>
        <Ex jp="わたしはがくせいです。" romaji="watashi wa gakusei desu." pt="Eu sou estudante." />
        <Ex
          jp="ここはしずかです。"
          romaji="koko wa shizuka desu."
          pt="Aqui é tranquilo."
          notes="しずか (tranquilo) é um adjetivo -な; です entra do mesmo jeito que com substantivos"
        />
        <Ex
          jp="しゅっしんはブラジルです。"
          romaji="shusshin wa burajiru desu."
          pt="Sou (de origem) do Brasil."
          notes="frase típica de autoapresentação — entrevista de emprego, imigração, primeiro encontro"
        />
        <Note>
          <strong>Na fala, o natural é omitir です — não trocar por だ.</strong> だ é a
          versão casual "completa" de です, e você vai <strong>ler e ouvir</strong> muito
          mais do que precisa produzir: em diário, mensagem informal, ou quando alguém
          pensa em voz alta. Dito diretamente a outra pessoa, soa mais abrupto do que a
          simples omissão. Regra prática: entre amigos e família,{' '}
          <span className="font-jp">たなかさんはせんせい</span> (sem です nem だ) já basta;
          guarde だ para reconhecer, não para produzir por enquanto.
        </Note>
      </Section>

      <Section title="Perguntas com ですか">
        <p className="text-sm leading-relaxed text-ink">
          Para perguntar, o japonês não inverte a ordem das palavras como o português faz
          ("é professor?" vs. "professor é"): só acrescenta{' '}
          <span className="font-jp">か</span> no final da frase afirmativa, sem tirar nem
          trocar mais nada. É a mesma pergunta que você vai fazer toda vez que conhecer
          alguém — nome, nacionalidade, profissão — ou confirmar algo sobre um objeto.
        </p>
        <Ex
          jp="がくせいですか？"
          romaji="gakusei desu ka?"
          pt="Você é estudante?"
          notes="か no final, sem mudar mais nada na frase"
        />
        <Ex
          jp="ブラジルからですか？"
          romaji="burajiru kara desu ka?"
          pt="Você é do Brasil?"
          notes="pergunta comum ao se apresentar/conhecer alguém novo"
        />
        <Ex
          jp="これはたなかさんのかばんですか？"
          romaji="kore wa tanaka-san no kaban desu ka?"
          pt="Esta é a bolsa do sr. Tanaka?"
          notes="confirmar algo sobre um objeto específico"
        />
        <Note>
          か é a mesma partícula que transforma qualquer frase em pergunta, e から (em{' '}
          <span className="font-jp">ブラジルから</span>) marca origem — as duas funcionam
          igual em outras lições; detalhes na lição de Partículas.
        </Note>
        <Note>
          <strong>Aprofundamento:</strong> em situações mais formais você vai ouvir{' '}
          <span className="font-jp">でしょうか</span> no lugar de{' '}
          <span className="font-jp">ですか</span> — uma pergunta ainda mais suave e
          indireta, comum em atendimento e por telefone. Reconhecer já basta por enquanto.
        </Note>
      </Section>

      <Section title="Presente negativo">
        <p className="text-sm leading-relaxed text-ink">
          Para negar, です não vira só "não + です" como em português — o predicado inteiro
          troca de forma, porque o japonês não tem uma palavra avulsa para "não". Você usa
          isso toda vez que corrige um engano ("não sou eu"), ou diz o que algo não é.
        </p>
        <GrammarTable
          headers={['Trilha', 'Formas', 'Exemplo']}
          jpCols={[1, 2]}
          rows={[
            ['Educada (formal/escrita)', 'ではありません / じゃありません', 'せんせいではありません'],
            ['Educada (fala do dia a dia)', 'じゃないです', 'せんせいじゃないです'],
            ['Casual', 'ではない / じゃない', 'せんせいじゃない'],
          ]}
        />
        <Ex
          jp="わたしはにほんじんではありません。"
          romaji="watashi wa nihonjin dewa arimasen."
          pt="Eu não sou japonês."
        />
        <Ex
          jp="これはわたしのかさじゃないです。"
          romaji="kore wa watashi no kasa janai desu."
          pt="Este não é o meu guarda-chuva."
          notes="じゃないです — forma educada mais comum na fala; の marca posse, como na lição de Partículas"
        />
        <Ex
          jp="すみません、がくせいではありません。かいしゃいんです。"
          romaji="sumimasen, gakusei dewa arimasen. kaishain desu."
          pt="Desculpe, não sou estudante. Sou funcionário de empresa."
          notes="corrige uma suposição — comum para quem parece mais jovem do que é"
        />
        <Ex
          jp="わたしはがくせいじゃない。"
          romaji="watashi wa gakusei janai."
          pt="Eu não sou estudante."
          notes="forma casual, entre amigos e família"
        />
        <Note>
          <strong>じゃ é uma contração de では</strong> — as duas formas significam o
          mesmo. Na prática, quando estiver em dúvida entre ではありません e じゃないです, vá
          de <span className="font-jp">じゃないです</span>: é a que você mais vai ouvir e
          usar no dia a dia; ではありません soa um pouco mais formal/escrito.
        </Note>
      </Section>

      <Section title="Nota cultural: quem decide relaxar o tom">
        <p className="text-sm leading-relaxed text-ink">
          A troca entre です/ます e a forma casual não é uma escolha unilateral. Na
          prática, quem tem mais idade, mais tempo de casa (num emprego, por exemplo) ou
          posição mais alta é quem "abre a porta" para o tom casual — alguém mais novo,
          mais recente ou estrangeiro que decide sozinho tratar outra pessoa
          informalmente porque "já estamos à vontade" pode soar presunçoso, mesmo com boa
          intenção.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          Na dúvida, isso muda uma escolha real: mantenha です/ます até a outra pessoa
          relaxar o tom primeiro, ou pedir diretamente (
          <span className="font-jp">タメ口でいいよ</span>, algo como "pode falar informal
          comigo").
        </p>
      </Section>

      <Section title="Passado afirmativo — でした">
        <p className="text-sm leading-relaxed text-ink">
          Para o passado, です vira <span className="font-jp">でした</span> (educado) ou{' '}
          <span className="font-jp">だった</span> (casual) — uma forma só, sem a distinção
          que o português faz entre "foi" (evento pontual) e "era" (estado prolongado):{' '}
          <span className="font-jp">たなかさんはせんせいでした</span> serve tanto para "o
          Tanaka foi professor" quanto para "o Tanaka era professor". Você usa isso para
          descrever algo que já não é mais verdade: um emprego antigo, o tempo de ontem,
          como um lugar costumava ser.
        </p>
        <Ex
          jp="きのうはやすみでした。"
          romaji="kinou wa yasumi deshita."
          pt="Ontem foi dia de folga."
        />
        <Ex
          jp="たなかさんはせんせいでした。"
          romaji="tanaka-san wa sensei deshita."
          pt="O sr. Tanaka era professor."
          notes="fala de um estado que já não é mais verdade (ex.: ele se aposentou)"
        />
        <Ex
          jp="ここはむかしこうえんだった。"
          romaji="koko wa mukashi kouen datta."
          pt="Aqui era um parque, antigamente."
          notes="だった = forma casual de でした; むかし não leva partícula, igual きのう/あした"
        />
      </Section>

      <Section title="Passado negativo">
        <p className="text-sm leading-relaxed text-ink">
          O passado negativo junta as duas ideias anteriores — nega e coloca no passado ao
          mesmo tempo, sem regra nova a decorar. Aparece sempre que você conta o que não
          aconteceu ou não era o caso: uma entrevista que não foi fácil, um dia que não
          choveu, um cargo que alguém nunca teve.
        </p>
        <GrammarTable
          headers={['Trilha', 'Formas', 'Exemplo']}
          jpCols={[1, 2]}
          rows={[
            [
              'Educada (formal/escrita)',
              'ではありませんでした / じゃありませんでした',
              'がくせいではありませんでした',
            ],
            ['Educada (fala do dia a dia)', 'じゃなかったです', 'がくせいじゃなかったです'],
            ['Casual', 'ではなかった / じゃなかった', 'がくせいじゃなかった'],
          ]}
        />
        <Ex
          jp="わたしはがくせいではありませんでした。"
          romaji="watashi wa gakusei dewa arimasen deshita."
          pt="Eu não era estudante."
        />
        <Ex
          jp="きのうはひまじゃなかったです。"
          romaji="kinou wa hima janakatta desu."
          pt="Ontem eu não estava livre."
          notes="じゃなかったです — par do じゃないです, o mais comum na fala"
        />
        <Ex
          jp="きのうはあめじゃなかった。"
          romaji="kinou wa ame janakatta."
          pt="Ontem não choveu."
          notes="lit. 'ontem não foi chuva' — あめ (chuva) como substantivo + です. Forma casual"
        />
        <Ex
          jp="めんせつはかんたんではありませんでした。"
          romaji="mensetsu wa kantan dewa arimasen deshita."
          pt="A entrevista não foi fácil."
          notes="registro educado formal, comum em conversa sobre trabalho/entrevista"
        />
      </Section>

      <Section title="Cuidado: です com adjetivos -い">
        <p className="text-sm leading-relaxed text-ink">
          です também aparece depois de adjetivos -い, mas <strong>só para dar polidez na
          afirmativa</strong> — igual ao que ele faz com substantivos.
        </p>
        <Ex
          jp="たかいです。"
          romaji="takai desu."
          pt="É caro."
          notes="たかい (caro) já é uma frase completa; です só deixa educado"
        />
        <p className="text-sm leading-relaxed text-ink">
          A diferença importante: adjetivos -い <strong>não</strong> usam じゃない/ではない para
          negar. Eles têm a própria negativa, trocando い por くない.
        </p>
        <Ex
          jp="たかくないです。"
          romaji="takakunai desu."
          pt="Não é caro."
          notes="たかい → たかくない (negativa do próprio adjetivo). Nunca たかいじゃない"
        />
        <Note>
          じゃない/ではない (e todas as variações desta lição) valem para{' '}
          <strong>substantivos</strong> e <strong>adjetivos -な</strong> (como しずか). Adjetivos
          -い seguem uma regra própria, fora do escopo desta lição.
        </Note>
      </Section>

      <Section title="Erros comuns">
        <GrammarTable
          headers={['Erro', 'Incorreto', 'Correto', 'Por quê']}
          jpCols={[1, 2]}
          rows={[
            [
              'Negar adjetivo -い com じゃない',
              'たかいじゃない',
              'たかくない',
              'Adjetivos -い têm negativa própria (くない), não usam じゃない.',
            ],
            [
              'Misturar trilhas',
              'がくせいですが、いかない',
              'がくせいですが、いきません (educado) / がくせいだけど、いかない (casual)',
              'Mantenha a mesma trilha (educada ou casual) na frase inteira.',
            ],
            [
              'Esquecer o です no passado',
              'きのうはやすみです でした',
              'きのうはやすみでした',
              'でした já é a forma completa do passado; não se soma です a ela.',
            ],
            [
              'Usar です para anunciar que algo existe',
              'にわにねこです',
              'にわにねこがいます',
              'です descreve o que o sujeito é; aqui にわ (jardim) viraria o sujeito e ねこ o que ele "é", o que não faz sentido. Para anunciar existência, use lugar+に, sujeito+が, います/あります.',
            ],
            [
              'Usar さん (ou outro tratamento) sobre si mesmo',
              'わたしはたなかさんです',
              'わたしはたなかです',
              'さん é para se referir aos outros; nunca se usa sobre o próprio nome, mesmo em fala educada.',
            ],
          ]}
        />
      </Section>

      <Section title="Resumo e tabela de referência">
        <p className="text-sm leading-relaxed text-ink">
          です liga o sujeito a um substantivo ou adjetivo -な, e muda em duas dimensões: tempo
          (presente/passado) e afirmação (positivo/negativo).
        </p>
        <GrammarTable
          headers={['', 'Educada (formal)', 'Educada (fala)', 'Casual']}
          jpCols={[1, 2, 3]}
          rows={[
            ['Presente afirmativo', 'です', '—', '(sem です)'],
            [
              'Presente negativo',
              'ではありません / じゃありません',
              'じゃないです',
              'ではない / じゃない',
            ],
            ['Passado afirmativo', 'でした', '—', 'だった'],
            [
              'Passado negativo',
              'ではありませんでした / じゃありませんでした',
              'じゃなかったです',
              'ではなかった / じゃなかった',
            ],
          ]}
        />
        <p className="text-sm leading-relaxed text-ink">
          Na prática: comece sempre pela trilha educada até que o ambiente deixe claro que
          dá para relaxar o tom — e, dentro da trilha educada, prefira a coluna "fala" nas
          negativas, que é o que você vai ouvir com mais frequência no dia a dia. Errar
          para o lado educado nunca soa mal; o contrário, sim.
        </p>
      </Section>
    </div>
  );
}
