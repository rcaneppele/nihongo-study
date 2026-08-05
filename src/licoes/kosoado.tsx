import { Section, Ex, Note, GrammarTable, ReadingKey } from '../components/Licao';

export const meta = {
  id: 'kosoado',
  title: 'Ko-So-A-Do',
  subtitle: 'Os demonstrativos japoneses (este, esse, aquele, qual)',
  emoji: '👆',
  tags: ['gramática', 'n5'],
};

export default function KoSoADo() {
  return (
    <div className="space-y-10">
      <Section title="Como ler esta lição">
        <p className="text-sm leading-relaxed text-ink">
          As palavras deste tema quase sempre se escrevem em hiragana. Então aqui você verá:
        </p>
        <ReadingKey
          lines={[
            { text: 'これ', desc: 'hiragana' },
            { text: 'kore', desc: 'romaji' },
            { text: 'isto', desc: 'significado' },
          ]}
        />
      </Section>

      <Section title="O que é o sistema Ko-So-A-Do">
        <p className="text-sm leading-relaxed text-ink">
          <strong>Ko-So-A-Do</strong> (<span className="font-jp">こそあど</span>) é o conjunto de
          palavras que em português seriam "este, esse, aquele, aqui, aí, lá, qual".
        </p>
        <p className="text-sm leading-relaxed text-ink">
          O nome vem da primeira sílaba de cada grupo: <strong className="font-jp">こ</strong> (
          <em>ko</em>), <strong className="font-jp">そ</strong> (<em>so</em>),{' '}
          <strong className="font-jp">あ</strong> (<em>a</em>) e{' '}
          <strong className="font-jp">ど</strong> (<em>do</em>).
        </p>
        <p className="text-sm leading-relaxed text-ink">
          A grande sacada é que <strong>cada grupo indica uma distância diferente</strong>. Uma
          vez que você entende as quatro distâncias, entende o sistema inteiro.
        </p>
      </Section>

      <Section title="As quatro distâncias">
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
          Esta série sempre acompanha um substantivo. Ela nunca fica sozinha.
        </p>
        <Ex
          jp="このほんはおもしろいです。"
          romaji="kono hon wa omoshiroi desu."
          pt="Este livro é interessante."
          notes={`この gruda no substantivo ほん (livro): "este livro".`}
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
          Esta série aponta <strong>lugares</strong>, não objetos.
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
          notes="こちら também apresenta pessoas de forma educada (visto na lição de apresentação)."
        />
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

      <Section title="こんな・そんな・あんな・どんな — tipo de coisa">
        <p className="text-sm leading-relaxed text-ink">
          Significam "deste tipo, desse tipo, daquele tipo, que tipo?". Descrevem a{' '}
          <strong>natureza</strong> de algo, não apontam um objeto específico.
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
        />
        <Ex
          jp="あんなひとにはなりたくない。"
          romaji="anna hito ni wa naritakunai."
          pt="Não quero me tornar uma pessoa como aquela."
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
          O Ko-So-A-Do também funciona <strong>dentro da conversa</strong>, não só no espaço. Isto
          é mais avançado, mas útil de conhecer.
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
            ['"deste tipo"', 'こんな'],
            ['"assim, desta forma"', 'こう'],
          ]}
        />
      </Section>
    </div>
  );
}
