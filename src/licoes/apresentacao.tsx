import { Section, Ex, GrammarTable, ReadingKey } from '../components/Licao';
import type { QuizLicao } from '../data/quiz/types';

export const meta = {
  id: 'apresentacao',
  title: 'Auto-apresentação',
  subtitle: 'じこしょうかい — jikoshoukai',
  emoji: '🙇',
  tags: ['conversa', 'n5'],
};

export const quiz: QuizLicao = {
  frases: [
    {
      id: 'apresentacao-f1',
      tokens: [
        { texto: 'ブラジル', romaji: 'burajiru' },
        { texto: 'の', romaji: 'no' },
        { texto: 'サンパウロ', romaji: 'san pauro' },
        { texto: 'から', romaji: 'kara', particula: true },
        { texto: 'まいりました', romaji: 'mairimashita' },
      ],
      pt: 'Vim de São Paulo, no Brasil.',
    },
    {
      id: 'apresentacao-f2',
      tokens: [
        { texto: 'サンパウロ', romaji: 'san pauro' },
        { texto: 'に', romaji: 'ni', particula: true },
        { texto: 'すんでいます', romaji: 'sunde imasu' },
      ],
      pt: 'Moro em São Paulo.',
    },
    {
      id: 'apresentacao-f3',
      tokens: [
        { texto: 'こちら', romaji: 'kochira' },
        { texto: 'は', romaji: 'wa', particula: true },
        { texto: 'たなかさん', romaji: 'tanaka-san' },
        { texto: 'です', romaji: 'desu' },
      ],
      pt: 'Este é o sr. Tanaka.',
    },
    {
      id: 'apresentacao-f4',
      tokens: [
        { texto: 'たなかさん', romaji: 'tanaka-san' },
        { texto: 'を', romaji: 'o', particula: true },
        { texto: 'ごしょうかいします', romaji: 'goshoukai shimasu' },
      ],
      pt: 'Vou apresentar o sr. Tanaka.',
    },
    {
      id: 'apresentacao-f5',
      tokens: [
        { texto: 'たなかさん', romaji: 'tanaka-san' },
        { texto: 'は', romaji: 'wa' },
        { texto: 'わたし', romaji: 'watashi' },
        { texto: 'の', romaji: 'no', particula: true },
        { texto: 'どうりょう', romaji: 'douryou' },
        { texto: 'です', romaji: 'desu' },
      ],
      pt: 'O sr. Tanaka é meu colega de trabalho.',
    },
    {
      id: 'apresentacao-f6',
      tokens: [
        { texto: 'にほんご', romaji: 'nihongo' },
        { texto: 'を', romaji: 'o', particula: true },
        { texto: 'べんきょうしています', romaji: 'benkyou shite imasu' },
      ],
      pt: 'Estou estudando japonês.',
    },
  ],
  perguntas: [
    {
      id: 'apresentacao-sig1',
      tipo: 'significado',
      pergunta: 'O que significa はじめまして?',
      alternativas: ['prazer (primeira vez que se conhece)', 'até logo', 'com licença', 'muito obrigado'],
      correta: 0,
    },
    {
      id: 'apresentacao-sig2',
      tipo: 'significado',
      pergunta: "Qual é a forma humilde/formal de 'meu nome é'?",
      alternativas: ['ともうします', 'といいます', 'です', 'からきました'],
      correta: 0,
    },
    {
      id: 'apresentacao-sig3',
      tipo: 'significado',
      pergunta: 'O que significa しゅみ?',
      alternativas: ['hobby', 'trabalho', 'idade', 'nome'],
      correta: 0,
    },
    {
      id: 'apresentacao-sig4',
      tipo: 'significado',
      pergunta: "Qual expressão se usa para dizer 'vim de (lugar)'?",
      alternativas: ['からきました', 'にすんでいます', 'をしています', 'がすきです'],
      correta: 0,
    },
    {
      id: 'apresentacao-vf1',
      tipo: 'verdadeiro-falso',
      afirmacao: 'どうぞよろしくおねがいします é o encerramento padrão de uma apresentação.',
      correta: true,
    },
    {
      id: 'apresentacao-vf2',
      tipo: 'verdadeiro-falso',
      afirmacao: 'よろしく sozinho é apropriado numa entrevista de emprego.',
      correta: false,
      explicacao: 'É casual demais para contexto formal; use どうぞよろしくおねがいいたします.',
    },
    {
      id: 'apresentacao-vf3',
      tipo: 'verdadeiro-falso',
      afirmacao: 'はっさい (8 anos) tem uma leitura irregular, com som dobrado.',
      correta: true,
    },
  ],
};

export default function Apresentacao() {
  return (
    <div className="space-y-10">
      <Section title="Como ler esta lição">
        <p className="text-sm leading-relaxed text-ink">
          Todo o japonês aqui aparece em três partes, para você não depender de saber ler hiragana
          ainda:
        </p>
        <ReadingKey
          lines={[
            { text: 'にほんご', desc: 'escrita em hiragana' },
            { text: 'nihongo', desc: 'leitura em romaji (letras do nosso alfabeto)' },
            { text: 'japonês', desc: 'significado' },
          ]}
        />
        <p className="text-sm leading-relaxed text-ink">
          Sobre o romaji, guarde só três detalhes de pronúncia por enquanto:
        </p>
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink">
          <li>
            <strong className="font-jp">は</strong>, quando é partícula de tópico, lê-se <em>wa</em>{' '}
            (e não <em>ha</em>).
          </li>
          <li>
            <strong className="font-jp">を</strong> lê-se <em>o</em>.
          </li>
          <li>
            <strong className="font-jp">え</strong> e <strong>e</strong> têm som fechado, como o
            "ê" de "você".
          </li>
        </ul>
        <p className="text-sm leading-relaxed text-ink">Agora sim, vamos à lição.</p>
      </Section>

      <Section title="O que é a じこしょうかい">
        <p className="text-sm leading-relaxed text-ink">
          A <strong className="font-jp">じこしょうかい</strong> (<em>jikoshoukai</em>) é a
          auto-apresentação: o momento de dizer quem você é.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          Ela aparece em quase toda situação social no Japão. Primeiro dia de aula, entrada em uma
          empresa, grupos de hobby, encontros online. Sempre que você conhece alguém, faz uma{' '}
          <span className="font-jp">じこしょうかい</span>.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          O bom é que existe uma ordem quase fixa que os japoneses seguem. Quando você domina essa
          ordem, consegue se apresentar com segurança em qualquer situação.
        </p>
      </Section>

      <Section title="A estrutura padrão">
        <p className="text-sm leading-relaxed text-ink">
          A apresentação segue seis passos. Só dois têm posição fixa: o <strong>cumprimento</strong>{' '}
          (sempre no início) e o <strong>encerramento</strong> (sempre no fim). O meio é flexível.
        </p>
        <GrammarTable
          headers={['Passo', 'Função', 'Frase modelo']}
          jpCols={[2]}
          rows={[
            ['1', 'Cumprimentar', 'はじめまして。(hajimemashite)'],
            ['2', 'Dizer o nome', '〜です。(desu, neutro) / 〜ともうします。(to moushimasu, formal)'],
            ['3', 'Dizer de onde é', '〜からきました。(kara kimashita)'],
            ['4', 'Dizer o que faz', '〜をしています。(o shite imasu)'],
            ['5', 'Falar um hobby', 'しゅみは〜です。(shumi wa ~ desu)'],
            ['6', 'Encerrar', 'どうぞよろしくおねがいします。(douzo yoroshiku onegaishimasu)'],
          ]}
        />
        <p className="text-sm leading-relaxed text-ink">
          Regra prática: se ficar em dúvida no meio, apenas garanta que começou com{' '}
          <span className="font-jp">はじめまして</span> e terminou com{' '}
          <span className="font-jp">よろしくおねがいします</span>. Com esses dois, sua
          apresentação nunca soa incompleta.
        </p>
      </Section>

      <Section title="Frases essenciais">
        <p className="text-sm leading-relaxed text-ink">
          Estas são as peças que você encaixa na estrutura. A coluna "registro" indica o quão
          formal é cada frase.
        </p>
        <GrammarTable
          headers={['Hiragana', 'Romaji', 'Significado', 'Registro']}
          jpCols={[0]}
          rows={[
            ['はじめまして', 'hajimemashite', 'prazer (primeira vez que se conhece)', 'neutro'],
            ['〜です', '~ desu', 'sou ~', 'neutro'],
            ['〜といいます', '~ to iimasu', 'me chamo ~', 'padrão'],
            ['〜ともうします', '~ to moushimasu', 'meu nome é ~', 'muito formal'],
            ['〜からきました', '~ kara kimashita', 'vim de ~', 'neutro'],
            ['〜しゅっしんです', '~ shusshin desu', 'sou de ~ (origem)', 'neutro'],
            ['〜にすんでいます', '~ ni sunde imasu', 'moro em ~', 'neutro'],
            ['〜さいです', '~ sai desu', 'tenho ~ anos', 'neutro'],
            ['〜をしています', '~ o shite imasu', 'trabalho como ~', 'neutro'],
            ['〜のがくせいです', '~ no gakusei desu', 'sou estudante de ~', 'neutro'],
            ['しゅみは〜です', 'shumi wa ~ desu', 'meu hobby é ~', 'neutro'],
            ['〜がすきです', '~ ga suki desu', 'gosto de ~', 'neutro'],
            ['〜をべんきょうしています', '~ o benkyou shite imasu', 'estou estudando ~', 'neutro'],
            ['よろしくおねがいします', 'yoroshiku onegaishimasu', 'muito prazer / às ordens', 'neutro'],
            ['どうぞよろしくおねがいします', 'douzo yoroshiku onegaishimasu', 'muito prazer (mais formal)', 'formal'],
            ['よろしく', 'yoroshiku', 'prazer (informal)', 'casual'],
          ]}
        />
        <p className="text-sm leading-relaxed text-ink">
          O símbolo <strong className="font-jp">〜</strong> é só um espaço reservado: você troca
          por uma palavra sua. Por exemplo, em <span className="font-jp">しゅみは〜です</span> você
          coloca seu hobby no lugar do <span className="font-jp">〜</span>.
        </p>
      </Section>

      <Section title="Exemplo 1 — apresentação formal (escola ou trabalho)">
        <p className="text-sm leading-relaxed text-ink">
          Este é o modelo mais educado, para entrevistas, primeiro dia de emprego ou reuniões
          sérias.
        </p>
        <Ex
          jp="はじめまして。"
          romaji="hajimemashite."
          pt="Prazer em conhecê-lo."
          notes="Cumprimento de abertura. Nunca falta."
        />
        <Ex
          jp="たなかじろうともうします。"
          romaji="tanaka jirou to moushimasu."
          pt="Meu nome é Tanaka Jiro."
          notes="ともうします é a forma mais humilde de dizer o próprio nome. Em contexto muito formal, diga o nome completo (sobrenome + nome)."
        />
        <Ex
          jp="ブラジルのサンパウロからまいりました。"
          romaji="burajiru no san pauro kara mairimashita."
          pt="Vim de São Paulo, no Brasil."
          notes="まいりました é a versão humilde de きました (vim). Você se rebaixa para demonstrar respeito."
        />
        <Ex
          jp="げんざい、ITかんけいのしごとをしております。"
          romaji="genzai, IT kankei no shigoto o shite orimasu."
          pt="Atualmente trabalho na área de TI."
          notes="おります é a versão humilde de います. É o mesmo padrão: em contexto formal, troca-se o verbo comum pela versão humilde."
        />
        <Ex
          jp="にほんごはまだべんきょうちゅうですが、よろしくおねがいいたします。"
          romaji="nihongo wa mada benkyouchuu desu ga, yoroshiku onegai itashimasu."
          pt="Ainda estou estudando japonês, mas muito prazer."
          notes="いたします é a forma ainda mais educada de します. Encerramento formal."
        />
      </Section>

      <Section title="Exemplo 2 — apresentação casual (turma ou grupo de hobby)">
        <p className="text-sm leading-relaxed text-ink">
          Aqui o tom é leve, para colegas de curso ou pessoas da sua idade.
        </p>
        <Ex
          jp="はじめまして！たなかです。"
          romaji="hajimemashite! tanaka desu."
          pt="Prazer! Sou Tanaka."
          notes="No casual, basta o sobrenome + です. Sem ともうします."
        />
        <Ex
          jp="ブラジルしゅっしんで、サンパウロにすんでいます。"
          romaji="burajiru shusshin de, san pauro ni sunde imasu."
          pt="Sou do Brasil e moro em São Paulo."
          notes="しゅっしん = origem (de onde você é). にすんでいます = moro em (onde você vive hoje)."
        />
        <Ex
          jp="にじゅうはっさいです。"
          romaji="nijuu hassai desu."
          pt="Tenho 28 anos."
          notes="Atenção: 8 anos é はっさい (hassai), com som dobrado, e não はちさい. É uma leitura irregular comum."
        />
        <Ex
          jp="いま、にほんごをべんきょうしています。アニメがきっかけではじめました。"
          romaji="ima, nihongo o benkyou shite imasu. anime ga kikkake de hajimemashita."
          pt="Agora estou estudando japonês. Comecei por causa do anime."
          notes={'きっかけ = o "gatilho", o motivo que fez você começar algo.'}
        />
        <Ex
          jp="しゅみはおんがくをきくこととりょうりです。"
          romaji="shumi wa ongaku o kiku koto to ryouri desu."
          pt="Meus hobbies são ouvir música e cozinhar."
          notes={'Para transformar o verbo きく (ouvir) em "o ato de ouvir", junta-se こと depois dele: きくこと.'}
        />
        <Ex jp="よろしくおねがいします！" romaji="yoroshiku onegaishimasu!" pt="Muito prazer!" />
      </Section>

      <Section title="Exemplo 3 — apresentação online (aula por videochamada)">
        <p className="text-sm leading-relaxed text-ink">
          Útil para quem estuda com professores japoneses pela internet.
        </p>
        <Ex
          jp="はじめまして。がめんごしですが、よろしくおねがいします。"
          romaji="hajimemashite. gamen-goshi desu ga, yoroshiku onegaishimasu."
          pt="Prazer. Mesmo sendo pela tela, muito prazer."
          notes={'がめんごし = "através da tela". Uma forma simpática de reconhecer que o encontro é online.'}
        />
        <Ex
          jp="ブラジルからオンラインでさんかしています。"
          romaji="burajiru kara onrain de sanka shite imasu."
          pt="Estou participando online, do Brasil."
          notes="さんかする = participar."
        />
        <Ex
          jp="じさは12じかんあります。"
          romaji="jisa wa juuni jikan arimasu."
          pt="A diferença de fuso horário é de 12 horas."
          notes="じさ = diferença de horário entre dois lugares."
        />
        <Ex
          jp="にほんにいったことはまだありませんが、いつかいきたいです。"
          romaji="nihon ni itta koto wa mada arimasen ga, itsuka ikitai desu."
          pt="Ainda não fui ao Japão, mas quero ir algum dia."
          notes={'〜たことがあります = "já fiz (tal coisa) alguma vez". Na negativa, まだありません = "ainda não".'}
        />
      </Section>

      <Section title="Apresentando outra pessoa">
        <p className="text-sm leading-relaxed text-ink">
          Às vezes você precisa apresentar alguém a um terceiro. Nesse caso, usam-se formas mais
          educadas.
        </p>
        <Ex
          jp="こちらはたなかさんです。"
          romaji="kochira wa tanaka-san desu."
          pt="Este é o sr. Tanaka."
          notes={'こちら é a forma educada de apontar uma pessoa ("este aqui"). Nunca aponte com o dedo; use こちら.'}
        />
        <Ex
          jp="たなかさんをごしょうかいします。"
          romaji="tanaka-san o goshoukai shimasu."
          pt="Vou apresentar o sr. Tanaka."
          notes={'ごしょうかいします = forma educada de "apresentar alguém".'}
        />
        <Ex
          jp="たなかさんはわたしのどうりょうです。"
          romaji="tanaka-san wa watashi no douryou desu."
          pt="O sr. Tanaka é meu colega de trabalho."
          notes="どうりょう = colega do mesmo nível no trabalho."
        />
        <Ex
          jp="こちらのかたがやまだせんせいです。"
          romaji="kochira no kata ga yamada-sensei desu."
          pt="Esta pessoa é a professora Yamada."
          notes={'かた = forma respeitosa de "pessoa". せんせい = professor(a).'}
        />
      </Section>

      <Section title="Perguntas que você pode receber">
        <p className="text-sm leading-relaxed text-ink">
          Depois da apresentação, é comum receber perguntas. Vale já reconhecer as mais frequentes.
        </p>
        <GrammarTable
          headers={['Pergunta', 'Romaji', 'Tradução']}
          jpCols={[0]}
          rows={[
            ['にほんごはどのくらいべんきょうしていますか？', 'nihongo wa dono kurai benkyou shite imasu ka?', 'Há quanto tempo estuda japonês?'],
            ['どうしてにほんごをべんきょうしていますか？', 'doushite nihongo o benkyou shite imasu ka?', 'Por que estuda japonês?'],
            ['にほんにきたことがありますか？', 'nihon ni kita koto ga arimasu ka?', 'Já veio ao Japão?'],
            ['すきなにほんしょくはなんですか？', 'suki na nihonshoku wa nan desu ka?', 'Que comida japonesa você gosta?'],
            ['しゅみはなんですか？', 'shumi wa nan desu ka?', 'Qual é o seu hobby?'],
            ['おしごとはなにをされていますか？', 'oshigoto wa nani o sarete imasu ka?', 'O que você faz de trabalho?'],
          ]}
        />
      </Section>

      <Section title="Como responder às perguntas">
        <Ex
          jp="まだはじめたばかりです。はんとしくらいです。"
          romaji="mada hajimeta bakari desu. hantoshi kurai desu."
          pt="Acabei de começar. Faz uns seis meses."
          notes={'はんとし = meio ano. くらい = "mais ou menos", aproximação.'}
        />
        <Ex
          jp="アニメやゲームがきっかけで、にほんごにきょうみをもちました。"
          romaji="anime ya geemu ga kikkake de, nihongo ni kyoumi o mochimashita."
          pt="Anime e games foram o motivo, e me interessei pela língua."
          notes="きょうみをもつ = ter interesse por algo."
        />
        <Ex
          jp="まだいったことがありませんが、いつかいきたいとおもっています。"
          romaji="mada itta koto ga arimasen ga, itsuka ikitai to omotte imasu."
          pt="Ainda não fui, mas pretendo ir algum dia."
        />
        <Ex
          jp="にほんごはまだあまりじょうずじゃないですが、がんばっています。"
          romaji="nihongo wa mada amari jouzu ja nai desu ga, ganbatte imasu."
          pt="Ainda não sou muito bom em japonês, mas estou me esforçando."
          notes={'Diminuir-se de leve ("ainda não sou bom") é comum e bem-visto no Japão. Soa humilde, não inseguro.'}
        />
      </Section>

      <Section title="Vocabulário de hobbies">
        <GrammarTable
          headers={['Hiragana', 'Romaji', 'Significado']}
          jpCols={[0]}
          rows={[
            ['おんがくをきく', 'ongaku o kiku', 'ouvir música'],
            ['えいがをみる', 'eiga o miru', 'assistir a filmes'],
            ['どくしょ', 'dokusho', 'leitura'],
            ['りょうり', 'ryouri', 'cozinhar / culinária'],
            ['りょこう', 'ryokou', 'viajar / viagem'],
            ['スポーツ', 'supootsu', 'esporte'],
            ['ゲーム', 'geemu', 'jogos (videogame)'],
            ['アニメ', 'anime', 'anime'],
            ['しゃしんをとる', 'shashin o toru', 'tirar fotos'],
            ['えをかく', 'e o kaku', 'desenhar / pintar'],
            ['ヨガ', 'yoga', 'ioga'],
            ['ハイキング', 'haikingu', 'trilha / caminhada'],
          ]}
        />
      </Section>

      <Section title="Vocabulário de ocupações">
        <GrammarTable
          headers={['Hiragana', 'Romaji', 'Significado']}
          jpCols={[0]}
          rows={[
            ['がくせい', 'gakusei', 'estudante'],
            ['かいしゃいん', 'kaishain', 'funcionário de empresa'],
            ['エンジニア', 'enjinia', 'engenheiro / desenvolvedor'],
            ['デザイナー', 'dezaina', 'designer'],
            ['せんせい', 'sensei', 'professor(a)'],
            ['いしゃ', 'isha', 'médico(a)'],
            ['かんごし', 'kangoshi', 'enfermeiro(a)'],
            ['フリーランス', 'furiiransu', 'freelancer'],
            ['じえいぎょう', 'jieigyou', 'autônomo / dono do próprio negócio'],
            ['こうむいん', 'koumuin', 'servidor público'],
          ]}
        />
      </Section>

      <Section title="Dicas culturais">
        <p className="text-sm leading-relaxed text-ink">
          <strong>
            A reverência (<span className="font-jp">おじぎ</span>, <em>ojigi</em>).
          </strong>{' '}
          Ao se apresentar, uma leve inclinação do tronco de cerca de 15 graus basta. Em situações
          muito formais, como entrevistas, use cerca de 30 graus. Homens mantêm as mãos ao lado do
          corpo; mulheres, juntas à frente.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          <strong>
            O cartão de visita (<span className="font-jp">めいし</span>, <em>meishi</em>).
          </strong>{' '}
          Se receber um, segure com as duas mãos e olhe com atenção. Durante a reunião, deixe-o
          sobre a mesa à sua frente. Nunca escreva nele, não o dobre e não o guarde no bolso de
          trás.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          <strong>A auto-depreciação.</strong> É normal dizer coisas como{' '}
          <span className="font-jp">まだまだです</span> (<em>mada mada desu</em>, "ainda tenho
          muito a melhorar"), mesmo sendo competente. Isso soa educado. Já aceitar um elogio com
          orgulho pode soar arrogante.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          <strong>Assuntos a evitar no primeiro encontro.</strong> Salário, religião e política são
          considerados privados. Perguntar a idade é aceitável, mas em contextos formais é melhor
          esperar a pessoa mencionar.
        </p>
      </Section>

      <Section title="Erros comuns">
        <GrammarTable
          headers={['Situação', 'Incorreto', 'Correto', 'Por quê']}
          jpCols={[1, 2]}
          rows={[
            [
              'Encerrar sem a frase final',
              '…しゅみはりょうりです。',
              '…しゅみはりょうりです。よろしくおねがいします。',
              'Sem o encerramento, a apresentação parece cortada pela metade.',
            ],
            [
              <>
                Usar <span className="font-jp">よろしく</span> em contexto formal
              </>,
              'Numa entrevista: よろしく！',
              'どうぞよろしくおねがいいたします。',
              <>
                <span className="font-jp">よろしく</span> sozinho é casual demais para o trabalho.
              </>,
            ],
            [
              'Dizer só o sobrenome em contexto muito formal',
              'たなかともうします。',
              'たなかじろうともうします。',
              <>
                Com <span className="font-jp">ともうします</span> (bem formal), o nome completo
                soa mais apropriado.
              </>,
            ],
          ]}
        />
      </Section>

      <Section title="Resumo rápido">
        <GrammarTable
          headers={['Quero...', 'Frase']}
          jpCols={[1]}
          rows={[
            ['Cumprimentar', 'はじめまして'],
            ['Dizer o nome (neutro)', '〜です'],
            ['Dizer o nome (formal)', '〜ともうします'],
            ['Dizer de onde sou', '〜からきました / 〜しゅっしんです'],
            ['Falar um hobby', 'しゅみは〜です'],
            ['Encerrar', 'よろしくおねがいします'],
          ]}
        />
      </Section>
    </div>
  );
}
