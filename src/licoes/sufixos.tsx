import { Section, Ex, Note, GrammarTable, ReadingKey } from '../components/Licao';
import type { QuizLicao } from '../data/quiz/types';

export const meta = {
  id: 'sufixos',
  title: 'Sufixos de Respeito',
  subtitle: 'さん, せんせい, せんぱい e outros honoríficos',
  emoji: '🎎',
  tags: ['cultura', 'n5'],
};

export const quiz: QuizLicao = {
  frases: [
    {
      id: 'sufixos-f1',
      tokens: [
        { texto: 'たなかさん', romaji: 'tanaka-san' },
        { texto: 'ちょっと', romaji: 'chotto' },
        { texto: 'よろしい', romaji: 'yoroshii' },
        { texto: 'です', romaji: 'desu' },
        { texto: 'か', romaji: 'ka' },
      ],
      pt: 'Sr. Tanaka, você tem um momento?',
    },
    {
      id: 'sufixos-f2',
      tokens: [
        { texto: 'やまだくん', romaji: 'yamada-kun' },
        { texto: 'ちょっと', romaji: 'chotto' },
        { texto: 'きて', romaji: 'kite' },
      ],
      pt: 'Yamada, vem cá um momento.',
    },
    {
      id: 'sufixos-f3',
      tokens: [
        { texto: 'たなかせんせい', romaji: 'tanaka-sensei' },
        { texto: 'しつもん', romaji: 'shitsumon' },
        { texto: 'が', romaji: 'ga', particula: true },
        { texto: 'あります', romaji: 'arimasu' },
      ],
      pt: 'Professor Tanaka, tenho uma pergunta.',
    },
    {
      id: 'sufixos-f4',
      tokens: [
        { texto: 'せんせい', romaji: 'sensei' },
        { texto: 'ありがとうございました', romaji: 'arigatou gozaimashita' },
      ],
      pt: 'Obrigado, professor.',
    },
    {
      id: 'sufixos-f5',
      tokens: [
        { texto: 'せんぱい', romaji: 'senpai' },
        { texto: 'おしえて', romaji: 'oshiete' },
        { texto: 'ください', romaji: 'kudasai' },
      ],
      pt: 'Senpai, por favor me ensine.',
    },
    {
      id: 'sufixos-f6',
      tokens: [
        { texto: 'すずきせんぱい', romaji: 'suzuki-senpai' },
        { texto: 'の', romaji: 'no', particula: true },
        { texto: 'おかげ', romaji: 'okage' },
        { texto: 'です', romaji: 'desu' },
      ],
      pt: 'É graças ao senpai Suzuki.',
    },
    {
      id: 'sufixos-f7',
      tokens: [
        { texto: 'ぶちょう', romaji: 'buchou' },
        { texto: 'ごほうこく', romaji: 'gohoukoku' },
        { texto: 'が', romaji: 'ga', particula: true },
        { texto: 'あります', romaji: 'arimasu' },
      ],
      pt: 'Diretor, tenho um relatório para apresentar.',
    },
  ],
  perguntas: [
    {
      id: 'sufixos-sig1',
      tipo: 'significado',
      pergunta: 'Qual sufixo é o mais seguro e neutro para chamar alguém que você acabou de conhecer?',
      alternativas: ['さん', 'ちゃん', 'くん', 'さま'],
      correta: 0,
    },
    {
      id: 'sufixos-sig2',
      tipo: 'significado',
      pergunta: 'Qual sufixo se usa com professores, médicos e advogados?',
      alternativas: ['せんせい', 'さん', 'くん', 'どの'],
      correta: 0,
    },
    {
      id: 'sufixos-sig3',
      tipo: 'significado',
      pergunta: 'Qual prefixo honorífico geralmente vai antes de palavras de origem japonesa, como おなまえ?',
      alternativas: ['お', 'ご', 'さん', 'さま'],
      correta: 0,
    },
    {
      id: 'sufixos-sig4',
      tipo: 'significado',
      pergunta: 'Em uma empresa, o que costuma substituir さん ao falar com um superior?',
      alternativas: ['o cargo (ex.: ぶちょう)', 'o sufixo さま sempre', 'o nome sem nada', 'くん'],
      correta: 0,
    },
    {
      id: 'sufixos-vf1',
      tipo: 'verdadeiro-falso',
      afirmacao: 'É educado colocar さん no seu próprio nome ao se apresentar.',
      correta: false,
      explicacao: 'Soa arrogante; diga só o nome, sem sufixo.',
    },
    {
      id: 'sufixos-vf2',
      tipo: 'verdadeiro-falso',
      afirmacao: 'せんぱい se refere a quem entrou depois de você num grupo.',
      correta: false,
      explicacao: 'せんぱい é quem entrou ANTES; こうはい é quem entrou depois.',
    },
    {
      id: 'sufixos-vf3',
      tipo: 'verdadeiro-falso',
      afirmacao: 'ちゃん é apropriado para chamar um adulto desconhecido pela primeira vez.',
      correta: false,
      explicacao: 'ちゃん é íntimo/carinhoso; use さん com desconhecidos.',
    },
    {
      id: 'sufixos-sig5',
      tipo: 'significado',
      pergunta: 'Ao perguntar o nome de alguém que você acabou de conhecer, qual é a forma educada?',
      alternativas: ['おなまえはなんですか？', 'なまえはなんですか？', 'おなまえです', 'なまえをおしえます'],
      correta: 0,
      explicacao: 'お eleva なまえ porque a pergunta é sobre a outra pessoa — nunca use お nas suas próprias coisas.',
    },
    {
      id: 'sufixos-vf4',
      tipo: 'verdadeiro-falso',
      afirmacao: 'こうはい pode virar sufixo, como em たなかこうはい.',
      correta: false,
      explicacao: 'こうはい quase nunca vira sufixo — usa-se como substantivo (わたしのこうはい) ou nome + さん/くん.',
    },
    {
      id: 'sufixos-vf5',
      tipo: 'verdadeiro-falso',
      afirmacao: 'いらっしゃいます (respeitoso) e おります (humilde) são as duas versões de います — uma eleva quem é mencionado, a outra rebaixa quem fala.',
      correta: true,
    },
    {
      id: 'sufixos-vf6',
      tipo: 'verdadeiro-falso',
      afirmacao: 'さん só é usado para chamar alguém diretamente, nunca para falar sobre a pessoa com um terceiro.',
      correta: false,
      explicacao: 'さん também aparece ao falar sobre alguém, como em たなかさんはもうきましたか？',
    },
  ],
};

export default function Sufixos() {
  return (
    <div className="space-y-10">
      <Section title="Como ler esta lição">
        <p className="text-sm leading-relaxed text-ink">
          Os sufixos se escrevem em hiragana. Você verá cada um em hiragana e romaji, com exemplos
          explicados. Algumas tabelas de vocabulário (cargos de trabalho) trazem uma coluna extra
          com o kanji, só como referência — você pode ignorá-la por enquanto.
        </p>
        <ReadingKey
          lines={[
            { text: '〜さん', desc: 'hiragana' },
            { text: 'san', desc: 'romaji' },
            { text: 'sr./sra./srta. (sem indicar gênero)', desc: 'significado' },
          ]}
        />
      </Section>

      <Section title="Objetivos desta lição">
        <p className="text-sm leading-relaxed text-ink">Ao final, você deve saber:</p>
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink">
          <li>
            Escolher o sufixo certo (さん, くん, ちゃん, さま, せんせい, せんぱい ou cargo) para
            cada pessoa e situação.
          </li>
          <li>Nunca colocar um sufixo honorífico no seu próprio nome.</li>
          <li>
            Usar お/ご para deixar uma palavra sobre a outra pessoa mais educada — e saber por que
            não se usa nas suas próprias coisas.
          </li>
          <li>
            Reconhecer que um sufixo carrega informação de hierarquia (せんぱい/こうはい) que o
            português não tem embutida no vocabulário.
          </li>
        </ul>
      </Section>

      <Section title="A ideia central">
        <p className="text-sm leading-relaxed text-ink">
          Em japonês, chamar alguém <strong>só pelo nome, sem sufixo</strong>, soa íntimo demais ou
          até rude, dependendo da situação.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          Por isso, quase sempre se adiciona um sufixo depois do nome. Esse sufixo mostra:
        </p>
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink">
          <li>o <strong>nível de respeito</strong>;</li>
          <li>a <strong>relação</strong> entre as pessoas;</li>
          <li>às vezes, o <strong>gênero</strong> percebido.</li>
        </ul>
        <p className="text-sm leading-relaxed text-ink">
          O sufixo vem depois do sobrenome ou do nome próprio. Qual escolher depende da relação.
        </p>
        <Note>
          Isto é só a metade "nome" da polidez japonesa — como chamar as pessoas. A outra metade,
          trocar o próprio verbo por uma versão humilde ou respeitosa (けいご), é assunto da lição
          de Auto-apresentação. As duas coisas trabalham juntas, mas são peças diferentes.
        </Note>
      </Section>

      <Section title="Visão geral dos principais sufixos">
        <p className="text-sm leading-relaxed text-ink">
          Use esta tabela como um mapa rápido — os detalhes e exemplos de cada sufixo vêm nas
          seções seguintes.
        </p>
        <GrammarTable
          headers={['Sufixo', 'Romaji', 'Uso principal', 'Formalidade']}
          jpCols={[0]}
          rows={[
            ['〜さん', 'san', 'padrão, neutro e educado', '★★★'],
            ['〜くん', 'kun', 'meninos ou subordinados jovens', '★★'],
            ['〜ちゃん', 'chan', 'carinhoso (crianças, íntimos)', '★'],
            ['〜さま', 'sama', 'muito formal e respeitoso', '★★★★'],
            ['〜せんせい', 'sensei', 'professor, médico, mestre', '★★★★'],
            ['〜せんぱい', 'senpai', 'veterano no grupo (mais experiente)', '★★★'],
            ['〜どの', 'dono', 'arcaico, documentos formais', '★★★★★'],
          ]}
        />
      </Section>

      <Section title="〜さん — o mais versátil">
        <p className="text-sm leading-relaxed text-ink">
          Equivale, mais ou menos, a "sr.", "sra.", "srta.", mas{' '}
          <strong>sem indicar gênero nem estado civil</strong>.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          É o sufixo mais seguro. Use com quem você acabou de conhecer, colegas de trabalho e
          sempre que estiver na dúvida.
        </p>
        <Ex
          jp="たなかさん、ちょっとよろしいですか？"
          romaji="tanaka-san, chotto yoroshii desu ka?"
          pt="Sr. Tanaka, você tem um momento?"
          notes="Forma educada de abordar alguém."
        />
        <Ex
          jp="おきゃくさん、いらっしゃいませ。"
          romaji="okyaku-san, irasshaimase."
          pt="Bem-vindo, cliente."
          notes="さん também aparece após おきゃく (cliente), em lojas e restaurantes."
        />
        <Ex
          jp="たなかさんはもうきましたか？"
          romaji="tanaka-san wa mou kimashita ka?"
          pt="O sr. Tanaka já chegou?"
          notes="aqui さん não chama ninguém — é usado ao falar SOBRE a pessoa, numa conversa com um terceiro"
        />
      </Section>

      <Section title="〜くん — para jovens e subordinados">
        <p className="text-sm leading-relaxed text-ink">
          <span className="font-jp">くん</span> é usado por superiores ou professores ao chamar
          meninos e homens jovens. Também entre colegas homens da mesma idade.
        </p>
        <Ex
          jp="やまだくん、ちょっときて。"
          romaji="yamada-kun, chotto kite."
          pt="Yamada, vem cá um momento."
          notes="Um superior chamando um subordinado jovem."
        />
        <Ex
          jp="けんくん、きょうもちこくか。"
          romaji="ken-kun, kyou mo chikoku ka."
          pt="Ken, atrasou de novo hoje?"
          notes="Um professor chamando um aluno."
        />
        <Note>
          <span className="font-jp">くん</span> dirigido a mulheres (por exemplo, professores que
          chamam alunas de <span className="font-jp">○○くん</span>) acontece em escolas, mas é raro
          no trabalho. Fora desses casos, pode soar paternalista.
        </Note>
      </Section>

      <Section title="〜ちゃん — carinhoso e íntimo">
        <p className="text-sm leading-relaxed text-ink">
          <span className="font-jp">ちゃん</span> é a forma carinhosa. Usa-se com crianças pequenas
          (qualquer gênero), entre amigos muito próximos e com animais de estimação.
        </p>
        <Ex
          jp="はなこちゃん、だいじょうぶ？"
          romaji="hanako-chan, daijoubu?"
          pt="Hanako, você está bem?"
          notes="Falando com carinho com uma criança ou amiga próxima."
        />
        <Ex
          jp="たくちゃん、ごはんよ！"
          romaji="taku-chan, gohan yo!"
          pt="Taku, hora de comer!"
          notes="Uma mãe chamando o filho pelo apelido + ちゃん."
        />
        <p className="text-sm leading-relaxed text-ink">
          <span className="font-jp">ちゃん</span> costuma vir com apelidos encurtados:
        </p>
        <GrammarTable
          headers={['Apelido', 'Como se forma', 'Nome original']}
          jpCols={[0, 1, 2]}
          rows={[
            ['たくちゃん', 'たくや → たく + ちゃん', 'たくや'],
            ['けんちゃん', 'けんじ → けん + ちゃん', 'けんじ'],
          ]}
        />
      </Section>

      <Section title="〜さま — muito formal e respeitoso">
        <p className="text-sm leading-relaxed text-ink">
          <span className="font-jp">さま</span> é o grau máximo de respeito. Na fala do dia a dia é
          raro (soaria exagerado). Mas é <strong>padrão na escrita formal</strong>: cartas, e-mails
          e correspondência comercial.
        </p>
        <GrammarTable
          headers={['Uso', 'Exemplo', 'Romaji', 'Contexto']}
          jpCols={[1]}
          rows={[
            ['Nome em carta', 'たなかさま', 'tanaka-sama', 'correspondência formal'],
            ['Cliente', 'おきゃくさま', 'okyaku-sama', 'lojas, hotéis, transporte'],
            ['Todos os presentes', 'みなさま', 'mina-sama', 'discursos, cerimônias'],
            ['Divindade', 'かみさま', 'kami-sama', 'uso religioso'],
          ]}
        />
        <Ex
          jp="たなかさま、ほんじつはごらいてんありがとうございます。"
          romaji="tanaka-sama, honjitsu wa goraiten arigatou gozaimasu."
          pt="Sr. Tanaka, obrigado por nos visitar hoje."
          notes="Atendimento de alto nível. ほんじつ = hoje (formal)."
        />
        <Ex
          jp="おきゃくさま、こちらへどうぞ。"
          romaji="okyaku-sama, kochira e douzo."
          pt="Prezado(a) cliente, por aqui, por favor."
          notes="おきゃくさま é o que você vai ouvir o tempo todo em lojas, hotéis e anúncios — mesmo sem esperar formalidade de volta"
        />
      </Section>

      <Section title='〜せんせい — mais que "professor"'>
        <p className="text-sm leading-relaxed text-ink">
          <span className="font-jp">せんせい</span> é usado com professores, mas também com médicos,
          dentistas, advogados e políticos. Ou seja, qualquer pessoa reconhecida como mestre ou
          autoridade na sua área. Vai depois do sobrenome.
        </p>
        <Ex
          jp="たなかせんせい、しつもんがあります。"
          romaji="tanaka-sensei, shitsumon ga arimasu."
          pt="Professor Tanaka, tenho uma pergunta."
        />
        <Ex
          jp="せんせい、ありがとうございました。"
          romaji="sensei, arigatou gozaimashita."
          pt="Obrigado, professor."
          notes="せんせい sozinho também funciona como forma de chamar."
        />
        <Note>
          <strong>
            Nunca use <span className="font-jp">せんせい</span> para se referir a si mesmo.
          </strong>{' '}
          Dizer <span className="font-jp">わたしはせんせいです</span> ("sou professor") ao se
          apresentar está certo. Mas chamar a si próprio de <span className="font-jp">せんせい</span>{' '}
          soaria presunçoso.
        </Note>
      </Section>

      <Section title="せんぱい e こうはい — a hierarquia do grupo">
        <p className="text-sm leading-relaxed text-ink">
          Esta dupla é central na cultura japonesa. Não é sobre idade, e sim sobre{' '}
          <strong>quem entrou antes</strong> num grupo (escola, clube, empresa).
        </p>
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink">
          <li>
            <strong className="font-jp">せんぱい</strong> (<em>senpai</em>) = quem entrou antes.
            Orienta e protege.
          </li>
          <li>
            <strong className="font-jp">こうはい</strong> (<em>kouhai</em>) = quem entrou depois.
            Respeita e aprende.
          </li>
        </ul>
        <Ex
          jp="せんぱい、おしえてください。"
          romaji="senpai, oshiete kudasai."
          pt="Senpai, por favor me ensine."
          notes="せんぱい pode ser usado sozinho, como forma de chamar."
        />
        <Ex
          jp="すずきせんぱいのおかげです。"
          romaji="suzuki-senpai no okage desu."
          pt="É graças ao senpai Suzuki."
          notes={'〜のおかげです = "graças a...".'}
        />
        <Ex
          jp="かれはわたしのこうはいです。"
          romaji="kare wa watashi no kouhai desu."
          pt="Ele é meu kouhai (entrou depois de mim no grupo)."
          notes="こうはい não vira sufixo (nunca たなかこうはい) — só se usa como substantivo, assim"
        />
        <Note>
          <span className="font-jp">こうはい</span> quase nunca vira sufixo no nome de alguém.
          Diz-se <span className="font-jp">わたしのこうはい</span> ("meu kouhai") ou usa-se nome +{' '}
          <span className="font-jp">さん</span>/<span className="font-jp">くん</span>.
        </Note>
      </Section>

      <Section title="Prefixos honoríficos — お e ご">
        <p className="text-sm leading-relaxed text-ink">
          Além dos sufixos (que vêm depois), há dois prefixos (que vêm antes) para deixar palavras
          mais educadas: <strong className="font-jp">お</strong> e{' '}
          <strong className="font-jp">ご</strong>.
        </p>
        <p className="text-sm leading-relaxed text-ink">Regra geral:</p>
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink">
          <li>
            <strong className="font-jp">お</strong> vai antes de palavras de origem japonesa.
          </li>
          <li>
            <strong className="font-jp">ご</strong> vai antes de palavras de origem chinesa.
          </li>
        </ul>
        <GrammarTable
          headers={['Prefixo', 'Exemplo', 'Romaji', 'Significado']}
          jpCols={[0, 1]}
          rows={[
            ['お', 'おなまえ', 'onamae', 'seu nome (respeitoso)'],
            ['お', 'おしごと', 'oshigoto', 'seu trabalho'],
            ['お', 'おちゃ', 'ocha', 'chá'],
            ['ご', 'ごかぞく', 'gokazoku', 'sua família'],
            ['ご', 'ごじゅうしょ', 'gojuusho', 'seu endereço'],
            ['ご', 'ごはん', 'gohan', 'refeição / arroz (exceção comum)'],
          ]}
        />
        <Ex
          jp="おなまえはなんですか？"
          romaji="onamae wa nan desu ka?"
          pt="Qual é o seu nome?"
          notes="お eleva なまえ porque a pergunta é sobre a outra pessoa — pergunte assim, não なまえは...?"
        />
        <Ex
          jp="ごじゅうしょをおしえてください。"
          romaji="gojuusho o oshiete kudasai."
          pt="Poderia me informar seu endereço?"
          notes="comum em formulários e no balcão de uma imobiliária/prefeitura, pedindo o endereço de outra pessoa"
        />
        <Note>
          Não coloque <span className="font-jp">お</span>/<span className="font-jp">ご</span> em
          tudo, senão soa exagerado. Esses prefixos servem para coisas{' '}
          <strong>relacionadas à outra pessoa</strong> (<span className="font-jp">おなまえ</span>,{' '}
          <span className="font-jp">ごじゅうしょ</span>) ou expressões fixas (
          <span className="font-jp">おちゃ</span>, <span className="font-jp">ごはん</span>). Para
          as <strong>suas</strong> coisas, evite: dizer{' '}
          <span className="font-jp">わたしのおなまえ</span>… soaria estranho.
        </Note>
      </Section>

      <Section title="Títulos de trabalho">
        <p className="text-sm leading-relaxed text-ink">
          Em empresas, o <strong>cargo</strong> costuma substituir o{' '}
          <span className="font-jp">さん</span> ao falar com um superior.
        </p>
        <GrammarTable
          headers={['Kanji', 'Hiragana', 'Romaji', 'Cargo']}
          jpCols={[0, 1]}
          rows={[
            ['社長', 'しゃちょう', 'shachou', 'presidente / CEO'],
            ['部長', 'ぶちょう', 'buchou', 'diretor de departamento'],
            ['課長', 'かちょう', 'kachou', 'gerente de seção'],
            ['主任', 'しゅにん', 'shunin', 'líder / responsável'],
            ['同僚', 'どうりょう', 'douryou', 'colega (mesmo nível)'],
          ]}
        />
        <Ex
          jp="ぶちょう、ごほうこくがあります。"
          romaji="buchou, gohoukoku ga arimasu."
          pt="Diretor, tenho um relatório para apresentar."
          notes="O cargo (ぶちょう) é usado como forma de chamar, sem o nome."
        />
        <Ex
          jp="たなかぶちょうはいらっしゃいますか？"
          romaji="tanaka-buchou wa irasshaimasu ka?"
          pt="O diretor Tanaka está?"
          notes="Aqui, sobrenome + cargo funcionam juntos."
        />
        <Note>
          <span className="font-jp">いらっしゃいます</span> é a versão respeitosa de{' '}
          <span className="font-jp">います</span>, usada para <strong>elevar</strong> quem você
          menciona (aqui, o diretor). É o espelho de{' '}
          <span className="font-jp">おります</span> — a versão humilde de{' '}
          <span className="font-jp">います</span> que <strong>rebaixa você mesmo</strong>, vista na
          lição de Auto-apresentação. Duas peças do mesmo sistema, cada uma apontando para um lado
          diferente.
        </Note>
      </Section>

      <Section title="Três regras fundamentais">
        <Note>
          <strong>Nunca ponha sufixo no seu próprio nome.</strong> Dizer{' '}
          <span className="font-jp">わたしはたなかさんです</span> soa arrogante. Diga só{' '}
          <span className="font-jp">たなかです</span> ou, formal,{' '}
          <span className="font-jp">たなかともうします</span>.
        </Note>
        <Note>
          <strong>Chamar alguém sem sufixo</strong> (<span className="font-jp">よびすて</span>,{' '}
          <em>yobisute</em>) só vale entre pessoas muito íntimas, ou de um superior para um
          subordinado. Entre desconhecidos ou iguais, soa rude.
        </Note>
        <Note>
          <strong>
            Mudar de <span className="font-jp">さん</span> para{' '}
            <span className="font-jp">ちゃん</span>/<span className="font-jp">くん</span>
          </strong>{' '}
          marca uma aproximação. Espere a outra pessoa sugerir isso ("
          <span className="font-jp">ちゃんでよんでいいよ</span>" = "pode me chamar de{' '}
          <span className="font-jp">ちゃん</span>") antes de tomar a iniciativa.
        </Note>
      </Section>

      <Section title="Qual sufixo usar? Tabela de decisão">
        <GrammarTable
          headers={['Situação', 'Sufixo recomendado']}
          jpCols={[]}
          rows={[
            ['Pessoa que você acabou de conhecer', <span className="font-jp">さん</span>],
            ['Professor, médico, dentista, advogado', <span className="font-jp">せんせい</span>],
            ['Veterano no clube / empresa', <span className="font-jp">せんぱい</span>],
            [
              'Criança pequena',
              <>
                <span className="font-jp">ちゃん</span> (ou nome sem sufixo)
              </>,
            ],
            [
              'Amigo íntimo de longa data',
              <>
                <span className="font-jp">くん</span> / <span className="font-jp">ちゃん</span> /
                nome sem sufixo
              </>,
            ],
            [
              'Cliente, hóspede',
              <>
                <span className="font-jp">さま</span> (<span className="font-jp">さん</span> em
                contexto simples)
              </>,
            ],
            ['Colega de mesmo nível', <span className="font-jp">さん</span>],
            [
              'Superior com cargo',
              <>
                cargo (ex.: <span className="font-jp">ぶちょう</span>)
              </>,
            ],
            ['E-mail / carta formal', <span className="font-jp">さま</span>],
          ]}
        />
      </Section>

      <Section title="Erros comuns">
        <GrammarTable
          headers={['Erro', 'Incorreto', 'Correto', 'Por quê']}
          jpCols={[1, 2]}
          rows={[
            [
              <>
                Chamar médico de <span className="font-jp">さん</span>
              </>,
              'やまださん (ao médico)',
              'やまだせんせい',
              <>
                Médicos, dentistas e professores recebem <span className="font-jp">せんせい</span>.
              </>,
            ],
            [
              <>
                Usar <span className="font-jp">さん</span> no próprio nome
              </>,
              'わたしはたなかさんです。',
              'わたしはたなかです。',
              <>
                Pôr <span className="font-jp">さん</span> em si mesmo é arrogante.
              </>,
            ],
            [
              <>
                Usar <span className="font-jp">ちゃん</span> com desconhecido adulto
              </>,
              'はなこちゃん (no primeiro dia)',
              'はなこさん',
              <>
                <span className="font-jp">ちゃん</span> com adulto que você mal conhece é invasivo.
              </>,
            ],
            [
              'Omitir o sufixo com superior',
              'たなか、ちょっといいですか？ (ao chefe)',
              'たなかさん / たなかぶちょう',
              'Chamar superior sem sufixo é muito rude.',
            ],
          ]}
        />
      </Section>
    </div>
  );
}
