import { Section, Ex, Note, GrammarTable, ReadingKey } from '../components/Licao';
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
    {
      id: 'particulas-f11',
      tokens: [
        { texto: 'がっこう', romaji: 'gakkou' },
        { texto: 'へ', romaji: 'e' },
        { texto: 'いきます', romaji: 'ikimasu' },
        { texto: 'か', romaji: 'ka', particula: true },
      ],
      pt: 'Você vai à escola?',
    },
    {
      id: 'particulas-f12',
      tokens: [
        { texto: 'がんばった', romaji: 'ganbatta' },
        { texto: 'のに', romaji: 'noni', particula: true },
        { texto: 'しっぱいしました', romaji: 'shippai shimashita' },
      ],
      pt: 'Mesmo tendo me esforçado, fracassei.',
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
    {
      id: 'particulas-sig5',
      tipo: 'significado',
      pergunta: 'O que faz a partícula か no final de uma frase?',
      alternativas: [
        'transforma a frase em pergunta',
        'marca o objeto direto',
        'indica também/nem',
        'liga dois substantivos',
      ],
      correta: 0,
    },
    {
      id: 'particulas-sig6',
      tipo: 'significado',
      pergunta:
        'Qual partícula você usa para dizer "comprei maçãs, laranjas e outras coisas" (lista aberta, sem dizer tudo o que comprou)?',
      alternativas: ['や', 'と', 'も', 'の'],
      correta: 0,
      explicacao: 'と lista um conjunto fechado ("só isso"); や sugere que há mais itens além dos citados.',
    },
    {
      id: 'particulas-vf4',
      tipo: 'verdadeiro-falso',
      afirmacao:
        'べんきょうしたから、テストができませんでした é a frase certa para dizer "mesmo tendo estudado, não consegui fazer a prova".',
      correta: false,
      explicacao:
        'から introduz uma causa esperada (estudei, por isso consegui). Para um resultado contrário ao esperado, a partícula certa é のに: べんきょうしたのに、テストができませんでした。',
    },
    {
      id: 'particulas-vf5',
      tipo: 'verdadeiro-falso',
      afirmacao: 'にほんごをわかります é a forma correta de dizer "eu entendo japonês".',
      correta: false,
      explicacao: 'わかります pede が, não を — assim como すきです e きらいです: にほんごがわかります。',
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
          Três partículas têm uma pronúncia especial que você precisa saber já — no romaji desta
          lição, já escrevi a pronúncia correta:
        </p>
        <ReadingKey
          lines={[
            { text: 'は (partícula)', desc: 'lê-se wa, nunca ha' },
            { text: 'を (partícula)', desc: 'lê-se o, nunca wo' },
            { text: 'へ (partícula)', desc: 'lê-se e, nunca he' },
          ]}
        />
        <p className="text-sm leading-relaxed text-ink">
          Isso vale só quando essas três sílabas funcionam como partícula. Como parte de uma
          palavra comum (ですはち, por exemplo), leem-se normalmente.
        </p>
      </Section>

      <Section title="Objetivos desta lição">
        <p className="text-sm leading-relaxed text-ink">Ao final, você deve saber:</p>
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink">
          <li>
            Reconhecer a função de cada partícula do nível N5, sem depender de tradução literal
            por preposição — em japonês a lógica é outra.
          </li>
          <li>
            Escolher corretamente entre os pares que mais confundem: は/が, に/で, と/や, だけ/
            しか, ので/から e のに (contraste) vs. から (razão).
          </li>
          <li>
            Saber quais verbos e adjetivos (すきです, きらいです, わかります) exigem が em vez de
            を, mesmo quando a tradução em português parece pedir um objeto direto.
          </li>
          <li>
            Usar か, ね e よ para transformar uma frase em pergunta, buscar concordância ou marcar
            que uma informação é nova para quem ouve.
          </li>
          <li>Evitar os erros mais comuns de quem traduz partícula por partícula do português.</li>
        </ul>
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
          Dominar as partículas é essencial: trocar uma partícula muda o sentido inteiro da
          frase, e o verbo ou adjetivo da frase muitas vezes <strong>exige</strong> uma partícula
          específica — não é escolha livre.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          Isso aparece o tempo todo na vida real: pedir algo num restaurante ou konbini (
          <span className="font-jp">これをください</span>, nunca{' '}
          <span className="font-jp">これはください</span>), perguntar o caminho (
          <span className="font-jp">えきはどこですか</span>) ou simplesmente dizer do que você
          gosta (<span className="font-jp">これがすきです</span>). A partícula certa é o que faz a
          frase soar natural — trocá-la não deixa a frase "mais ou menos certa": muda o sentido ou
          soa estranho para um ouvinte japonês.
        </p>
      </Section>

      <Section title="Visão geral">
        <p className="text-sm leading-relaxed text-ink">
          Estas são as partículas mais comuns do nível iniciante (N5). Não decore tudo agora; use
          esta tabela como um índice — os detalhes e exemplos de cada uma vêm nas seções
          seguintes, na mesma ordem.
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
            ['や', 'ya', '"e" (lista aberta, exemplos)', 'りんごやみかん'],
            ['も', 'mo', 'também / nem', 'わたしもいきます'],
            ['へ', 'e', 'direção (formal) / destinatário', 'とうきょうへいきます'],
            ['から', 'kara', 'de (origem)', 'くじから'],
            ['まで', 'made', 'até (limite)', 'ごじまで'],
            ['だけ', 'dake', 'apenas (neutro)', 'これだけでいい'],
            ['しか', 'shika', 'só... (com verbo negativo)', 'これしかない'],
            ['ので', 'node', 'porque (tom educado)', 'あたまがいたいので'],
            ['のに', 'noni', 'mesmo que / apesar de', 'がんばったのに'],
            ['ね', 'ne', 'busca concordância ("né?")', 'いいですね'],
            ['よ', 'yo', 'informa algo novo', 'だいじょうぶですよ'],
            ['か', 'ka', 'transforma em pergunta', 'どこですか？'],
          ]}
        />
      </Section>

      <Section title="は — marca o tópico">
        <p className="text-sm leading-relaxed text-ink">
          <span className="font-jp">は</span> indica o <strong>tópico</strong> da frase: aquilo
          sobre o que você está falando. É como dizer "quanto a...". A diferença entre は e が
          (que marca o sujeito) é a distinção mais importante deste tema — ela vem detalhada na
          próxima seção.
        </p>
        <Ex jp="わたしはがくせいです。" romaji="watashi wa gakusei desu." pt="Eu sou estudante. (Quanto a mim, sou estudante.)" />
        <Ex jp="とうきょうはおおきいです。" romaji="toukyou wa ookii desu." pt="Tóquio é grande." />
        <Ex
          jp="このみせはやすいです。"
          romaji="kono mise wa yasui desu."
          pt="Esta loja é barata."
          notes="comentário do dia a dia, comparando com outras lojas — konbini, mercado, restaurante"
        />
        <p className="text-sm leading-relaxed text-ink">
          <span className="font-jp">は</span> também serve para marcar <strong>contraste</strong>:
        </p>
        <Ex
          jp="すしはすきですが、さしみはすきじゃないです。"
          romaji="sushi wa suki desu ga, sashimi wa suki ja nai desu."
          pt="Gosto de sushi, mas de sashimi não."
          notes="os dois は criam a oposição: sushi sim / sashimi não"
        />
        <Note>
          Repare que すき normalmente pede が (veja a próxima seção), mas aqui aparece com は. Isso
          não é exceção: quando o objetivo é <strong>comparar ou contrastar</strong>, は pode
          substituir tanto が quanto を, mesmo em palavras que normalmente exigem outra partícula.
        </Note>
      </Section>

      <Section title="が — marca o sujeito">
        <p className="text-sm leading-relaxed text-ink">
          <span className="font-jp">が</span> aponta <strong>quem</strong> faz a ação ou{' '}
          <strong>quem</strong> tem certa característica. Serve para destacar ou identificar.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          Alguns verbos e adjetivos <strong>exigem</strong>{' '}
          <span className="font-jp">が</span>, mesmo quando a tradução em português parece pedir
          um objeto direto: あります, います, わかります, できます, すきです, きらいです.
        </p>
        <Ex jp="ねこがいます。" romaji="neko ga imasu." pt="Há um gato. / Tem um gato." />
        <Ex
          jp="だれがきましたか？"
          romaji="dare ga kimashita ka?"
          pt="Quem veio?"
          notes="cena comum: alguém bate na porta e você pergunta de dentro. Numa resposta, também se usa が: たなかさんがきました"
        />
        <Ex
          jp="おんがくがすきです。"
          romaji="ongaku ga suki desu."
          pt="Gosto de música."
          notes="すきです usa が, nunca を. Erro clássico de quem traduz 'gosto de música' pensando em objeto direto"
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
        <Ex
          jp="これをください。"
          romaji="kore o kudasai."
          pt="Me dá isto, por favor."
          notes="a frase mais útil com を — pedir algo num restaurante, konbini ou loja, apontando o item"
        />
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
        <Note>
          Nem todo predicado que soa como "objeto" em português usa を. Verbos como{' '}
          <span className="font-jp">わかります</span> (entender) pedem が, não を — como você viu
          na seção anterior. Dizer <span className="font-jp">にほんごをわかります</span> é um dos
          erros mais comuns de falante de português.
        </Note>
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
        <p className="text-sm leading-relaxed text-ink">
          A tabela mostra a variedade de usos; estes três exemplos mostram に em contextos mais
          completos, do dia a dia:
        </p>
        <Ex
          jp="びょういんにいきます。"
          romaji="byouin ni ikimasu."
          pt="Vou ao hospital."
          notes="destino — consulta médica, um uso muito mais frequente do que 'ir à escola' na vida adulta"
        />
        <Ex
          jp="でんしゃはしちじにきます。"
          romaji="densha wa shichi-ji ni kimasu."
          pt="O trem chega às 7 horas."
          notes="horário exato — checar o horário na estação"
        />
        <Ex
          jp="こうえんにこどもがいます。"
          romaji="kouen ni kodomo ga imasu."
          pt="Há crianças no parque."
          notes="existência: lugar+に, sujeito+が. Guarde esta frase — ela volta contrastada na próxima seção"
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
          <strong>meio/instrumento</strong> usado. O português não faz essa distinção — "em" cobre
          tanto "há um livro <em>na</em> mesa" quanto "estudo <em>na</em> biblioteca" — por isso o
          instinto natural de quem fala português é usar uma partícula só para "lugar". O japonês
          separa: に é para onde algo <strong>existe</strong> (estado), で é para onde uma{' '}
          <strong>ação</strong> acontece (evento).
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
              crianças no parque, seção anterior).
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
        <Ex
          jp="これはたなかさんのかさですか？"
          romaji="kore wa tanaka-san no kasa desu ka?"
          pt="Este é o guarda-chuva do sr. Tanaka?"
          notes="situação real: achados e perdidos, muito comum no Japão (trem, escritório, restaurante)"
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

      <Section title="と e や — listas fechadas e abertas">
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
        <Ex
          jp="ぶちょうとかいぎをします。"
          romaji="buchou to kaigi o shimasu."
          pt="Tenho uma reunião com o diretor."
          notes="registro de trabalho — と = companhia, mesmo sentido do exemplo anterior, contexto mais formal"
        />
        <Note>
          Se a lista for <strong>aberta</strong> ("maçãs, laranjas etc., e talvez outras coisas"),
          use <span className="font-jp">や</span> em vez de と. と afirma que a lista está
          completa; や sugere que há mais itens além dos citados.
        </Note>
        <Ex
          jp="コンビニでおかしやジュースをかいました。"
          romaji="konbini de okashi ya juusu o kaimashita."
          pt="Comprei salgadinhos, suco e outras coisas no konbini."
          notes="や deixa claro que a lista não é exaustiva — comprou mais coisas além dessas duas"
        />
      </Section>

      <Section title="も — também / nem">
        <Ex jp="わたしもいきます。" romaji="watashi mo ikimasu." pt="Eu também vou." />
        <Ex
          jp="なにもたべませんでした。"
          romaji="nani mo tabemasen deshita."
          pt="Não comi nada."
          notes={`も + verbo negativo = "nem nada / nem ninguém". なに (o quê) vira なにも (nada)`}
        />
        <Ex
          jp="これもおねがいします。"
          romaji="kore mo onegaishimasu."
          pt="Isto também, por favor."
          notes="pedido num restaurante ou loja, acrescentando mais um item ao pedido"
        />
        <Note>
          <span className="font-jp">も</span> substitui は e が diretamente, mas se combina com
          に, で e outras partículas em vez de substituí-las: にも, でも. Essas combinações
          aparecem na seção "Combinações de partículas", mais adiante.
        </Note>
      </Section>

      <Section title="へ — direção (formal) e destinatário">
        <p className="text-sm leading-relaxed text-ink">
          <span className="font-jp">へ</span> indica direção, parecido com{' '}
          <span className="font-jp">に</span>. A diferença é sutil: へ enfatiza o{' '}
          <strong>trajeto</strong>; に enfatiza a <strong>chegada</strong>. Na prática, costumam
          ser intercambiáveis, mas へ soa mais formal.
        </p>
        <Ex jp="にほんへようこそ。" romaji="nihon e youkoso." pt="Bem-vindo ao Japão." notes="へ aqui se lê e" />
        <Ex jp="とうきょうへいきます。" romaji="toukyou e ikimasu." pt="Vou para Tóquio." />
        <Ex
          jp="ともだちへてがみをかきます。"
          romaji="tomodachi e tegami o kakimasu."
          pt="Escrevo uma carta para um amigo."
          notes="へ como destinatário — o mesmo へ que aparece endereçado em cartas e cartões (○○さんへ)"
        />
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
        <Note>
          Você vai encontrar <span className="font-jp">から</span> de novo mais adiante, com outro
          papel: introduzindo uma razão ("porque"). É a mesma partícula, dois usos diferentes —
          detalhes na seção "ので e から".
        </Note>
      </Section>

      <Section title='だけ e しか — dois jeitos de dizer "só"'>
        <p className="text-sm leading-relaxed text-ink">
          Ambos significam "apenas". A diferença não é só de tom: diferente do "só/apenas" em
          português, <span className="font-jp">しか</span> sempre pede um verbo no{' '}
          <strong>negativo</strong> — mesmo quando a frase, em português, é afirmativa.
        </p>
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink">
          <li>
            <strong className="font-jp">だけ</strong> é neutro e usa o verbo normalmente
            (afirmativo ou negativo).
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
          notes="note o verbo negativo たべませんでした, obrigatório com しか — em português a frase é afirmativa"
        />
        <Ex
          jp="おかねが100えんしかありません。"
          romaji="okane ga hyaku-en shika arimasen."
          pt="Só tenho 100 ienes. (implica: é pouquíssimo)"
        />
      </Section>

      <Section title="ので e から — porque (razão)">
        <p className="text-sm leading-relaxed text-ink">
          As duas introduzem uma causa, mas com tons diferentes.{' '}
          <span className="font-jp">から</span> aqui é a mesma partícula que marca origem ("de"),
          só que colada depois de uma frase inteira em vez de um substantivo — não é uma
          coincidência de escrita, é a mesma peça fazendo um trabalho diferente.
        </p>
        <GrammarTable
          headers={['Partícula', 'Tom', 'Quando usar']}
          jpCols={[0]}
          rows={[
            ['ので', 'mais educado, suave, soa mais objetivo', 'trabalho, pedir desculpa, explicar com jeito'],
            ['から', 'mais direto, pessoal — o mais comum na fala casual', 'conversa casual, entre amigos'],
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
        <Ex
          jp="でんしゃがおくれたので、ちょっとおそくなります。"
          romaji="densha ga okureta node, chotto osoku narimasu."
          pt="O trem atrasou, então vou chegar um pouco atrasado."
          notes="mensagem típica avisando um atraso — ので soa mais objetivo, 'a situação exige', não 'eu decidi'"
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
        <Ex
          jp="かさをもってきたのに、あめがふらなかった。"
          romaji="kasa o motte kita noni, ame ga furanakatta."
          pt="Trouxe o guarda-chuva, mas não choveu."
          notes="irritação do dia a dia, sem nada grave envolvido"
        />
        <Note>
          <strong>Não confunda のに com から/ので.</strong> から/ので introduzem uma causa
          esperada (X, por isso Y); のに introduz um resultado que <strong>contraria</strong> a
          expectativa (X, mas Y não era o que se esperava). Compare:
        </Note>
        <Ex
          jp="べんきょうしたから、テストができました。"
          romaji="benkyou shita kara, tesuto ga dekimashita."
          pt="Porque estudei, consegui fazer a prova."
          notes="causa → resultado esperado"
        />
        <Ex
          jp="べんきょうしたのに、テストができませんでした。"
          romaji="benkyou shita noni, tesuto ga dekimasen deshita."
          pt="Mesmo tendo estudado, não consegui fazer a prova."
          notes="mesma causa, resultado contrário ao esperado — troca から por のに muda a mensagem inteira"
        />
      </Section>

      <Section title="か, ね e よ — partículas de final de frase">
        <p className="text-sm leading-relaxed text-ink">
          Vêm no fim da frase e não mudam o significado central — dizem como você quer que a
          frase seja recebida: como pergunta, como busca de concordância, ou como informação nova
          para quem ouve.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          <span className="font-jp">か</span> transforma qualquer frase afirmativa em pergunta, só
          encaixando no final — sem inverter a ordem das palavras como o português faz ("é
          professor?" vs. "professor é"). Você já viu isso com です (
          <span className="font-jp">がくせいですか</span>) na lição de Usos do です; a mesma regra
          vale para qualquer predicado, inclusive verbos:
        </p>
        <Ex
          jp="がっこうへいきますか？"
          romaji="gakkou e ikimasu ka?"
          pt="Você vai à escola?"
          notes="mesma regra do ですか, agora com verbo — só acrescenta か, nada mais muda"
        />
        <Ex
          jp="なんじにきますか？"
          romaji="nan-ji ni kimasu ka?"
          pt="A que horas você vem?"
          notes="pergunta aberta, combinando horário de encontro — situação real do dia a dia"
        />
        <p className="text-sm leading-relaxed text-ink">
          <span className="font-jp">ね</span> busca a concordância de quem ouve ("né?") ou
          suaviza um pedido:
        </p>
        <Ex jp="いいてんきですね。" romaji="ii tenki desu ne." pt="Que tempo bom, né?" notes="pequena conversa clássica, quase um ritual social" />
        <Ex
          jp="ちょっとまってくださいね。"
          romaji="chotto matte kudasai ne."
          pt="Espere um momento, tá?"
          notes="ね suaviza o pedido — comum em atendimento e no trabalho"
        />
        <p className="text-sm leading-relaxed text-ink">
          <span className="font-jp">よ</span> avisa uma informação que quem ouve{' '}
          <strong>ainda não sabe</strong>:
        </p>
        <Ex
          jp="でんしゃがきましたよ。"
          romaji="densha ga kimashita yo."
          pt="O trem chegou!"
          notes="aviso na estação para alguém distraído — よ porque é novidade para quem ouve"
        />
        <Note>
          Cuidado com <span className="font-jp">よ</span> com superiores: pode soar como "deixa
          eu te explicar…". Em situações formais, <span className="font-jp">ね</span> é mais
          seguro. As duas se combinam em <span className="font-jp">よね</span>, para confirmar
          algo que você acha que o outro já sabe:{' '}
          <span className="font-jp">たなかさんもくるよね？</span> (O Tanaka também vem, né?)
        </Note>
      </Section>

      <Section title="Nota cultural: por que ね aparece tanto">
        <p className="text-sm leading-relaxed text-ink">
          Comparado com o "né?" do português, <span className="font-jp">ね</span> aparece com
          muito mais frequência na fala natural japonesa. Não é só uma partícula de dúvida — é uma
          forma constante de checar que você e a outra pessoa estão em sintonia, em vez de só
          afirmar algo de forma unilateral. Essa preferência por buscar concordância, mesmo em
          comentários banais sobre o tempo ou a comida, é um traço real do estilo de comunicação
          japonês.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          Na prática, isso muda uma escolha sua: em conversa casual, use{' '}
          <span className="font-jp">ね</span> com mais liberdade do que o instinto de tradução
          direta sugere. Uma frase sem nenhum ね, em contextos onde um nativo colocaria, pode soar
          mais seca ou distante do que você pretendia — não errada, apenas menos calorosa.
        </p>
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
            [
              'わかります com を',
              'にほんごをわかります',
              'にほんごがわかります',
              'わかります segue o mesmo padrão de すき/きらい: pede が, não を.',
            ],
            ['Ação em lugar com に', 'としょかんにべんきょうします', 'としょかんでべんきょうします', 'で marca onde a ação acontece.'],
            ['Existência com で', 'つくえのうえでほんがあります', 'つくえのうえにほんがあります', 'に marca onde algo existe.'],
            ['しか sem verbo negativo', 'これしかあります', 'これしかありません', 'しか sempre pede verbo negativo.'],
            ['と para lista aberta', 'りんごとオレンジとなど…', 'りんごやオレンジなど', 'と é lista fechada; や é lista aberta.'],
            [
              'のに no lugar de から/ので',
              'べんきょうしたから、テストができませんでした',
              'べんきょうしたのに、テストができませんでした',
              'から/ので indicam causa esperada; para um resultado contrário ao esperado, use のに.',
            ],
          ]}
        />
      </Section>

      <Section title="Resumo rápido">
        <GrammarTable
          headers={['Quero marcar/dizer...', 'Use']}
          jpCols={[1]}
          rows={[
            ['o tópico ("quanto a...")', 'は'],
            ['quem faz / o sujeito em destaque', 'が'],
            ['o alvo da ação (objeto)', 'を'],
            ['destino, horário, onde algo existe', 'に'],
            ['onde a ação acontece, o meio', 'で'],
            ['posse, ligação entre substantivos', 'の'],
            ['lista fechada ("e", só esses) / companhia', 'と'],
            ['lista aberta ("e outras coisas")', 'や'],
            ['também / nem (com negativo)', 'も'],
            ['direção formal / destinatário de carta', 'へ'],
            ['ponto de partida ("de")', 'から'],
            ['ponto de chegada/limite ("até")', 'まで'],
            ['"apenas", tom neutro', 'だけ'],
            ['"só...", com verbo negativo', 'しか'],
            ['razão, tom educado/objetivo', 'ので'],
            ['razão, tom direto/casual', 'から'],
            ['contraste inesperado ("mesmo que")', 'のに'],
            ['busca concordância / suaviza um pedido', 'ね'],
            ['informação nova para quem ouve', 'よ'],
            ['transforma a frase em pergunta', 'か'],
          ]}
        />
      </Section>
    </div>
  );
}
