import { Section, Ex, Note, GrammarTable } from '../components/Licao';
import type { QuizLicao } from '../data/quiz/types';

export const meta = {
  id: 'particulas',
  title: 'Partículas',
  subtitle: 'は, が, を, に, で e as outras',
  emoji: '🔗',
  tags: ['gramática', 'n5'],
};

export const quiz: QuizLicao = {
  frases: [
    {
      id: 'particulas-f1',
      tokens: [
        { texto: 'わたし', romaji: 'watashi' },
        { texto: 'は', romaji: 'wa', particula: true },
        { texto: 'がくせい', romaji: 'gakusei' },
        { texto: 'です', romaji: 'desu' },
      ],
      pt: 'Eu sou estudante.',
    },
    {
      id: 'particulas-f2',
      tokens: [
        { texto: 'ねこ', romaji: 'neko' },
        { texto: 'が', romaji: 'ga', particula: true },
        { texto: 'います', romaji: 'imasu' },
      ],
      pt: 'Há um gato.',
    },
    {
      id: 'particulas-f3',
      tokens: [
        { texto: 'りんご', romaji: 'ringo' },
        { texto: 'を', romaji: 'o', particula: true },
        { texto: 'たべます', romaji: 'tabemasu' },
      ],
      pt: 'Como uma maçã.',
    },
    {
      id: 'particulas-f4',
      tokens: [
        { texto: 'がっこう', romaji: 'gakkou' },
        { texto: 'に', romaji: 'ni', particula: true },
        { texto: 'いきます', romaji: 'ikimasu' },
      ],
      pt: 'Vou para a escola.',
    },
    {
      id: 'particulas-f5',
      tokens: [
        { texto: 'としょかん', romaji: 'toshokan' },
        { texto: 'で', romaji: 'de', particula: true },
        { texto: 'べんきょうします', romaji: 'benkyou shimasu' },
      ],
      pt: 'Estudo na biblioteca.',
    },
    {
      id: 'particulas-f6',
      tokens: [
        { texto: 'これ', romaji: 'kore' },
        { texto: 'は', romaji: 'wa' },
        { texto: 'わたし', romaji: 'watashi' },
        { texto: 'の', romaji: 'no', particula: true },
        { texto: 'ほん', romaji: 'hon' },
        { texto: 'です', romaji: 'desu' },
      ],
      pt: 'Este é o meu livro.',
    },
    {
      id: 'particulas-f7',
      tokens: [
        { texto: 'パン', romaji: 'pan' },
        { texto: 'と', romaji: 'to', particula: true },
        { texto: 'バター', romaji: 'bataa' },
        { texto: 'を', romaji: 'o' },
        { texto: 'かいました', romaji: 'kaimashita' },
      ],
      pt: 'Comprei pão e manteiga.',
    },
    {
      id: 'particulas-f8',
      tokens: [
        { texto: 'わたし', romaji: 'watashi' },
        { texto: 'も', romaji: 'mo', particula: true },
        { texto: 'いきます', romaji: 'ikimasu' },
      ],
      pt: 'Eu também vou.',
    },
    {
      id: 'particulas-f9',
      tokens: [
        { texto: 'とうきょう', romaji: 'toukyou' },
        { texto: 'へ', romaji: 'e', particula: true },
        { texto: 'いきます', romaji: 'ikimasu' },
      ],
      pt: 'Vou para Tóquio.',
    },
    {
      id: 'particulas-f10',
      tokens: [
        { texto: 'くじ', romaji: 'ku-ji' },
        { texto: 'から', romaji: 'kara', particula: true },
        { texto: 'ごじ', romaji: 'go-ji' },
        { texto: 'まで', romaji: 'made' },
        { texto: 'はたらきます', romaji: 'hatarakimasu' },
      ],
      pt: 'Trabalho das 9 às 5.',
    },
  ],
  perguntas: [
    {
      id: 'particulas-sig1',
      tipo: 'significado',
      pergunta: 'Qual partícula marca o objeto direto do verbo?',
      alternativas: ['を', 'は', 'が', 'に'],
      correta: 0,
    },
    {
      id: 'particulas-sig2',
      tipo: 'significado',
      pergunta: 'Qual partícula marca o sujeito, dando destaque a uma informação nova?',
      alternativas: ['が', 'は', 'を', 'の'],
      correta: 0,
    },
    {
      id: 'particulas-sig3',
      tipo: 'significado',
      pergunta: 'O que significa a partícula の em わたしのほん?',
      alternativas: ['posse (meu livro)', 'destino', 'também', 'contraste'],
      correta: 0,
    },
    {
      id: 'particulas-sig4',
      tipo: 'significado',
      pergunta: 'Qual partícula você usa para dizer "com" (companhia), como em ともだちとえいがをみました?',
      alternativas: ['と', 'で', 'に', 'も'],
      correta: 0,
    },
    {
      id: 'particulas-vf1',
      tipo: 'verdadeiro-falso',
      afirmacao: 'すきです e きらいです pedem a partícula を.',
      correta: false,
      explicacao: 'Pedem が, não を — é um erro clássico de iniciante.',
    },
    {
      id: 'particulas-vf2',
      tipo: 'verdadeiro-falso',
      afirmacao: 'A partícula に pode indicar tanto destino quanto horário exato.',
      correta: true,
    },
    {
      id: 'particulas-vf3',
      tipo: 'verdadeiro-falso',
      afirmacao: 'しか pode ser usada com um verbo afirmativo.',
      correta: false,
      explicacao: 'しか sempre exige verbo negativo.',
    },
  ],
};

export default function Particulas() {
  return (
    <div className="space-y-10">
      <Section title="Como ler esta lição">
        <p className="text-sm leading-relaxed text-ink">
          As partículas se escrevem sempre em hiragana. Você verá cada exemplo em hiragana,
          depois em romaji, depois em português.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          Três partículas têm uma pronúncia especial que você precisa saber já:
        </p>
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink">
          <li>
            <strong className="font-jp">は</strong>, como partícula, lê-se <strong><em>wa</em></strong>{' '}
            (e não <em>ha</em>).
          </li>
          <li>
            <strong className="font-jp">を</strong> lê-se <strong><em>o</em></strong> (e não <em>wo</em>).
          </li>
          <li>
            <strong className="font-jp">へ</strong>, como partícula, lê-se <strong><em>e</em></strong>{' '}
            (e não <em>he</em>).
          </li>
        </ul>
        <p className="text-sm leading-relaxed text-ink">
          Isso vale só quando elas são partículas. No romaji desta lição, já escrevi a
          pronúncia correta.
        </p>
      </Section>

      <Section title="O que é uma partícula">
        <p className="text-sm leading-relaxed text-ink">
          <strong>Partícula</strong> (<span className="font-jp">じょし</span>, <em>joshi</em>) é
          uma palavrinha curta que vem <strong>depois</strong> de uma palavra para mostrar qual é
          a função dela na frase.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          É diferente das nossas preposições. Em português, dizemos "<strong>para</strong> a
          escola" (a preposição vem antes). Em japonês, a partícula vem <strong>depois</strong>:{' '}
          <span className="font-jp">がっこう</span>
          <strong className="font-jp">に</strong> ("escola-para").
        </p>
        <p className="text-sm leading-relaxed text-ink">
          Dominar as partículas é essencial. Trocar uma partícula muda o sentido inteiro da
          frase.
        </p>
      </Section>

      <Section title="Visão geral">
        <p className="text-sm leading-relaxed text-ink">
          Estas são as partículas mais comuns do nível iniciante (N5). Não decore tudo agora; use
          esta tabela como um índice.
        </p>
        <GrammarTable
          headers={['Partícula', 'Leitura', 'Função principal', 'Exemplo curto']}
          jpCols={[0, 3]}
          rows={[
            ['は', 'wa', 'marca o tópico', 'わたしはがくせいです'],
            ['が', 'ga', 'marca o sujeito', 'ねこがいます'],
            ['を', 'o', 'marca o objeto direto', 'りんごをたべます'],
            ['に', 'ni', 'destino, tempo, lugar onde algo existe', 'がっこうにいきます'],
            ['で', 'de', 'lugar da ação, meio', 'バスできます'],
            ['の', 'no', 'posse / liga dois substantivos', 'わたしのほん'],
            ['と', 'to', '"e" (lista fechada) / "com"', 'パンとバター'],
            ['も', 'mo', 'também / nem', 'わたしもいきます'],
            ['へ', 'e', 'direção (formal)', 'とうきょうへいきます'],
            ['から', 'kara', 'de (origem)', 'くじから'],
            ['まで', 'made', 'até (limite)', 'ごじまで'],
            ['だけ', 'dake', 'apenas (neutro)', 'これだけでいい'],
            ['しか', 'shika', 'só... (com verbo negativo)', 'これしかない'],
            ['ね', 'ne', 'busca concordância ("né?")', 'いいですね'],
            ['よ', 'yo', 'informa algo novo', 'だいじょうぶですよ'],
            ['か', 'ka', 'transforma em pergunta', 'どこですか？'],
          ]}
        />
      </Section>

      <Section title="は — marca o tópico">
        <p className="text-sm leading-relaxed text-ink">
          <span className="font-jp">は</span> indica o <strong>tópico</strong> da frase: aquilo
          sobre o que você está falando. É como dizer "quanto a...".
        </p>
        <Ex jp="わたしはがくせいです。" romaji="watashi wa gakusei desu." pt="Eu sou estudante. (Quanto a mim, sou estudante.)" />
        <Ex jp="とうきょうはおおきいです。" romaji="toukyou wa ookii desu." pt="Tóquio é grande." />
        <p className="text-sm leading-relaxed text-ink">
          <span className="font-jp">は</span> também serve para marcar <strong>contraste</strong>:
        </p>
        <Ex
          jp="すしはすきですが、さしみはすきじゃないです。"
          romaji="sushi wa suki desu ga, sashimi wa suki ja nai desu."
          pt="Gosto de sushi, mas de sashimi não."
          notes="os dois は criam a oposição: sushi sim / sashimi não"
        />
      </Section>

      <Section title="が — marca o sujeito">
        <p className="text-sm leading-relaxed text-ink">
          <span className="font-jp">が</span> aponta <strong>quem</strong> faz a ação ou{' '}
          <strong>quem</strong> tem certa característica. Serve para destacar ou identificar.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          Alguns verbos e adjetivos <strong>exigem</strong>{' '}
          <span className="font-jp">が</span>: あります, います, わかります, できます, すきです,
          きらいです.
        </p>
        <Ex jp="ねこがいます。" romaji="neko ga imasu." pt="Há um gato. / Tem um gato." />
        <Ex
          jp="だれがきましたか？"
          romaji="dare ga kimashita ka?"
          pt="Quem veio?"
          notes="が identifica a pessoa. Numa resposta, também se usa が: たなかさんがきました"
        />
        <Ex
          jp="おんがくがすきです。"
          romaji="ongaku ga suki desu."
          pt="Gosto de música."
          notes="すきです usa が, nunca を. Erro clássico de iniciante"
        />
        <Note>
          <strong>は vs が — a distinção mais importante do japonês.</strong>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              <span className="font-jp">は</span> apresenta o <strong>tópico</strong> (algo já
              conhecido): <span className="font-jp">たなかさんはきました</span> = "Quanto ao
              Tanaka, ele veio."
            </li>
            <li>
              <span className="font-jp">が</span> identifica o <strong>sujeito</strong>{' '}
              (informação nova, com destaque): <span className="font-jp">たなかさんがきました</span>{' '}
              = "Foi o Tanaka quem veio."
            </li>
          </ul>
          <p className="mt-2">
            Regra prática: em respostas a perguntas com <span className="font-jp">だれ</span>{' '}
            (quem) ou <span className="font-jp">なに</span> (o quê), use が.
          </p>
        </Note>
      </Section>

      <Section title="を — marca o objeto direto">
        <p className="text-sm leading-relaxed text-ink">
          <span className="font-jp">を</span> marca o <strong>alvo da ação</strong> (o objeto
          direto do verbo).
        </p>
        <Ex
          jp="りんごをたべます。"
          romaji="ringo o tabemasu."
          pt="Como uma maçã."
          notes="りんご (maçã) é o que sofre a ação de comer"
        />
        <Ex jp="にほんごをべんきょうしています。" romaji="nihongo o benkyou shite imasu." pt="Estou estudando japonês." />
        <p className="text-sm leading-relaxed text-ink">
          <span className="font-jp">を</span> também marca um espaço que se atravessa, com verbos
          de movimento:
        </p>
        <Ex
          jp="はしをわたります。"
          romaji="hashi o watarimasu."
          pt="Atravesso a ponte."
          notes="aqui を não é objeto, mas o percurso atravessado"
        />
      </Section>

      <Section title="に — destino, tempo e lugar onde algo existe">
        <p className="text-sm leading-relaxed text-ink">
          <span className="font-jp">に</span> tem vários usos. Estes são os principais:
        </p>
        <GrammarTable
          headers={['Uso', 'Exemplo', 'Romaji', 'Tradução']}
          jpCols={[1]}
          rows={[
            ['Destino', 'がっこうにいきます', 'gakkou ni ikimasu', 'Vou para a escola.'],
            [
              'Onde algo existe (com あります/います)',
              'つくえのうえにほんがあります',
              'tsukue no ue ni hon ga arimasu',
              'Há um livro sobre a mesa.',
            ],
            ['Horário exato', 'さんじにおきます', 'san-ji ni okimasu', 'Acordo às 3 horas.'],
            ['Dia / data', 'げつようびにきてください', 'getsuyoubi ni kite kudasai', 'Venha na segunda-feira.'],
            ['Frequência', 'しゅうにさんかい', 'shuu ni san-kai', '3 vezes por semana'],
            ['Destinatário', 'ともだちにでんわします', 'tomodachi ni denwa shimasu', 'Ligo para meu amigo.'],
            ['Virar / tornar-se (com なる)', 'いしゃになります', 'isha ni narimasu', 'Vou me tornar médico.'],
          ]}
        />
        <Note>
          <span className="font-jp">に</span> <strong>não</strong> aparece com dias relativos
          como <span className="font-jp">きょう</span> (hoje),{' '}
          <span className="font-jp">あした</span> (amanhã),{' '}
          <span className="font-jp">きのう</span> (ontem),{' '}
          <span className="font-jp">まいにち</span> (todo dia). Nesses casos, não se usa
          partícula: <span className="font-jp">きょうきます</span> (venho hoje), e não{' '}
          <span className="font-jp">きょうにきます</span>.
        </Note>
      </Section>

      <Section title="で — lugar da ação e meio">
        <p className="text-sm leading-relaxed text-ink">
          <span className="font-jp">で</span> indica <strong>onde uma ação acontece</strong> ou o{' '}
          <strong>meio/instrumento</strong> usado.
        </p>
        <Ex
          jp="としょかんでべんきょうします。"
          romaji="toshokan de benkyou shimasu."
          pt="Estudo na biblioteca."
          notes="で = lugar onde a ação (estudar) ocorre"
        />
        <Ex jp="バスできます。" romaji="basu de kimasu." pt="Venho de ônibus." notes="で = meio de transporte" />
        <Ex jp="はしでたべます。" romaji="hashi de tabemasu." pt="Como com hashi." notes="で = instrumento" />
        <Note>
          <strong>に vs で com lugar — cuidado:</strong>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              <span className="font-jp">に</span> = onde algo <strong>existe</strong> (com
              あります/います): <span className="font-jp">こうえんにこどもがいます</span> (há
              crianças no parque).
            </li>
            <li>
              <span className="font-jp">で</span> = onde uma <strong>ação</strong> acontece:{' '}
              <span className="font-jp">こうえんであそびます</span> (brinco no parque).
            </li>
          </ul>
        </Note>
      </Section>

      <Section title="の — posse e ligação entre substantivos">
        <p className="text-sm leading-relaxed text-ink">
          <span className="font-jp">の</span> liga dois substantivos. O primeiro descreve o
          segundo (posse, tipo, origem).
        </p>
        <Ex
          jp="これはわたしのほんです。"
          romaji="kore wa watashi no hon desu."
          pt="Este é o meu livro."
          notes="の = posse (livro de mim)"
        />
        <Ex
          jp="にほんごのせんせい"
          romaji="nihongo no sensei"
          pt="professor de japonês"
          notes="の = especialidade/tipo"
        />
        <p className="text-sm leading-relaxed text-ink">
          <span className="font-jp">の</span> também pode substituir um substantivo já
          mencionado:
        </p>
        <Ex
          jp="あかいのをください。"
          romaji="akai no o kudasai."
          pt="Me dá o vermelho."
          notes="あかいの = o vermelho (a coisa vermelha). O の evita repetir o substantivo"
        />
      </Section>

      <Section title='と — "e" (lista fechada) e "com"'>
        <p className="text-sm leading-relaxed text-ink">
          <span className="font-jp">と</span> junta substantivos em uma lista{' '}
          <strong>completa</strong> ("A e B, só esses") ou indica <strong>companhia</strong>.
        </p>
        <Ex jp="パンとバターをかいました。" romaji="pan to bataa o kaimashita." pt="Comprei pão e manteiga. (só esses dois)" />
        <Ex
          jp="ともだちとえいがをみました。"
          romaji="tomodachi to eiga o mimashita."
          pt="Assisti a um filme com meu amigo."
          notes="と = companhia (junto com o amigo)"
        />
        <Note>
          Se a lista for <strong>aberta</strong> ("maçãs, laranjas etc."), use{' '}
          <span className="font-jp">や</span> em vez de と:{' '}
          <span className="font-jp">りんごやオレンジをかいました</span> (comprei maçãs, laranjas
          e outras coisas).
        </Note>
      </Section>

      <Section title="も — também / nem">
        <Ex jp="わたしもいきます。" romaji="watashi mo ikimasu." pt="Eu também vou." />
        <Ex
          jp="なにもたべませんでした。"
          romaji="nani mo tabemasen deshita."
          pt="Não comi nada."
          notes={`も + verbo negativo = "nem nada / nem ninguém". なに (o quê) vira なにも (nada)`}
        />
      </Section>

      <Section title="へ — direção (formal)">
        <p className="text-sm leading-relaxed text-ink">
          <span className="font-jp">へ</span> indica direção, parecido com{' '}
          <span className="font-jp">に</span>. A diferença é sutil: へ enfatiza o{' '}
          <strong>trajeto</strong>; に enfatiza a <strong>chegada</strong>. Na prática, costumam
          ser intercambiáveis, mas へ soa mais formal.
        </p>
        <Ex jp="にほんへようこそ。" romaji="nihon e youkoso." pt="Bem-vindo ao Japão." notes="へ aqui se lê e" />
        <Ex jp="とうきょうへいきます。" romaji="toukyou e ikimasu." pt="Vou para Tóquio." />
      </Section>

      <Section title="から e まで — de e até">
        <p className="text-sm leading-relaxed text-ink">
          Marcam início e fim, tanto no tempo quanto no espaço. Aparecem muito juntas.
        </p>
        <Ex jp="くじからごじまではたらきます。" romaji="ku-ji kara go-ji made hatarakimasu." pt="Trabalho das 9 às 5." />
        <Ex
          jp="とうきょうからおおさかまでしんかんせんでいきます。"
          romaji="toukyou kara oosaka made shinkansen de ikimasu."
          pt="Vou de Tóquio a Osaka de Shinkansen."
        />
        <Ex jp="どこからきましたか？" romaji="doko kara kimashita ka?" pt="De onde você veio?" />
      </Section>

      <Section title='だけ e しか — dois jeitos de dizer "só"'>
        <p className="text-sm leading-relaxed text-ink">
          Ambos significam "apenas". A diferença é o tom.
        </p>
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink">
          <li>
            <strong className="font-jp">だけ</strong> é neutro.
          </li>
          <li>
            <strong className="font-jp">しか</strong> exige verbo <strong>negativo</strong> e
            passa a ideia de que é pouco, insuficiente.
          </li>
        </ul>
        <Ex jp="これだけたべました。" romaji="kore dake tabemashita." pt="Comi apenas isto. (simples, neutro)" />
        <Ex
          jp="これしかたべませんでした。"
          romaji="kore shika tabemasen deshita."
          pt="Comi só isto. (e olha que era pouco)"
          notes="note o verbo negativo たべませんでした, obrigatório com しか"
        />
        <Ex
          jp="おかねが100えんしかありません。"
          romaji="okane ga hyaku-en shika arimasen."
          pt="Só tenho 100 ienes. (implica: é pouquíssimo)"
        />
      </Section>

      <Section title="ので e から — porque (razão)">
        <p className="text-sm leading-relaxed text-ink">
          As duas introduzem uma causa, mas com tons diferentes.
        </p>
        <GrammarTable
          headers={['Partícula', 'Tom', 'Quando usar']}
          jpCols={[0]}
          rows={[
            ['ので', 'mais educado, suave', 'trabalho, pedir desculpa, explicar com jeito'],
            ['から', 'mais direto, pessoal', 'conversa casual, entre amigos'],
          ]}
        />
        <Ex
          jp="あたまがいたいので、はやくかえってもいいですか？"
          romaji="atama ga itai node, hayaku kaette mo ii desu ka?"
          pt="Estou com dor de cabeça, posso ir mais cedo?"
          notes="ので soa educado. Boa escolha no trabalho"
        />
        <Ex
          jp="ねむいから、もうねる。"
          romaji="nemui kara, mou neru."
          pt="Estou com sono, vou dormir."
          notes="から casual, entre amigos"
        />
      </Section>

      <Section title='のに — "mesmo que / apesar de"'>
        <p className="text-sm leading-relaxed text-ink">
          <span className="font-jp">のに</span> mostra um contraste{' '}
          <strong>inesperado</strong>, geralmente com frustração ou surpresa.
        </p>
        <Ex
          jp="がんばったのに、しっぱいしました。"
          romaji="ganbatta noni, shippai shimashita."
          pt="Mesmo tendo me esforçado, fracassei."
          notes="o esforço não deu o resultado esperado. Daí a frustração"
        />
        <Ex jp="くすりをのんだのに、まだいたい。" romaji="kusuri o nonda noni, mada itai." pt="Mesmo tendo tomado o remédio, ainda dói." />
      </Section>

      <Section title="ね e よ — partículas de final de frase">
        <p className="text-sm leading-relaxed text-ink">
          Vêm no fim da frase e ajustam o tom da conversa.
        </p>
        <GrammarTable
          headers={['Partícula', 'Função', 'Exemplo', 'Tradução']}
          jpCols={[0, 2]}
          rows={[
            ['ね', 'busca concordância ("né?")', 'いいてんきですね。', 'Que tempo bom, né?'],
            ['よ', 'dá uma informação nova', 'でんしゃがきましたよ。', 'O trem chegou! (você não sabia)'],
            ['ね', 'suaviza um pedido', 'ちょっとまってくださいね。', 'Espere um momento, tá?'],
            ['よね', 'confirma algo que acha que o outro sabe', 'たなかさんもくるよね？', 'O Tanaka também vem, né?'],
          ]}
        />
        <Note>
          Cuidado com <span className="font-jp">よ</span> com superiores: pode soar como "deixa
          eu te explicar…". Em situações formais, <span className="font-jp">ね</span> é mais
          seguro.
        </Note>
      </Section>

      <Section title="Combinações de partículas">
        <p className="text-sm leading-relaxed text-ink">
          Algumas partículas se juntam. As mais comuns:
        </p>
        <GrammarTable
          headers={['Combinação', 'Formada por', 'Uso', 'Exemplo']}
          jpCols={[0, 3]}
          rows={[
            ['では', 'で + は', '"então" / contraste de lugar', 'では、はじめましょう (Então, vamos começar)'],
            ['でも', 'で + も', '"em qualquer"', 'どこでもいきます (Vou a qualquer lugar)'],
            ['にも', 'に + も', '"também em/para"', 'とうきょうにもいきました (Fui também a Tóquio)'],
          ]}
        />
      </Section>

      <Section title="Erros comuns">
        <GrammarTable
          headers={['Erro', 'Incorreto', 'Correto', 'Por quê']}
          jpCols={[1, 2]}
          rows={[
            ['すき com を', 'おんがくをすきです', 'おんがくがすきです', 'すき e きらい pedem が, não を.'],
            ['Ação em lugar com に', 'としょかんにべんきょうします', 'としょかんでべんきょうします', 'で marca onde a ação acontece.'],
            ['Existência com で', 'つくえのうえでほんがあります', 'つくえのうえにほんがあります', 'に marca onde algo existe.'],
            ['しか sem verbo negativo', 'これしかあります', 'これしかありません', 'しか sempre pede verbo negativo.'],
            ['と para lista aberta', 'りんごとオレンジとなど…', 'りんごやオレンジなど', 'と é lista fechada; や é lista aberta.'],
          ]}
        />
      </Section>

      <Section title="Resumo rápido">
        <GrammarTable
          headers={['Quero marcar...', 'Use']}
          jpCols={[1]}
          rows={[
            ['o tópico ("quanto a...")', 'は'],
            ['quem faz / o sujeito em destaque', 'が'],
            ['o alvo da ação (objeto)', 'を'],
            ['destino, horário, onde algo existe', 'に'],
            ['onde a ação acontece, o meio', 'で'],
            ['posse, ligação entre substantivos', 'の'],
          ]}
        />
      </Section>
    </div>
  );
}
