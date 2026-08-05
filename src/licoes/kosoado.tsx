import { Section, Ex, Note, GrammarTable } from '../components/Licao';

export const meta = {
  id: 'kosoado',
  title: 'Ko-So-A-Do',
  subtitle: 'Os demonstrativos japoneses',
  emoji: '👆',
  tags: ['gramática', 'n5'],
};

export default function KoSoADo() {
  return (
    <div className="space-y-10">
      <p className="leading-relaxed text-ink">
        <strong>Ko-So-A-Do</strong> (こそあど) é o sistema de demonstrativos e interrogativos do
        japonês. O nome vem das sílabas iniciais de cada série: <strong>こ</strong> (ko),{' '}
        <strong>そ</strong> (so), <strong>あ</strong> (a) e <strong>ど</strong> (do). Cada série
        indica a distância em relação ao falante e ao ouvinte — e, além disso, pode ser usada em
        sentido discursivo, referindo-se a algo no contexto da conversa.
      </p>

      <Section title="O sistema de distância">
        <GrammarTable
          headers={['Série', 'Referência física', 'Uso típico']}
          jpCols={[0]}
          rows={[
            ['こ (Ko)', 'Perto do falante', 'este, isto, aqui, desta forma…'],
            ['そ (So)', 'Perto do ouvinte', 'esse, isso, aí, dessa forma…'],
            ['あ (A)', 'Longe de ambos', 'aquele, aquilo, lá, daquela forma…'],
            ['ど (Do)', 'Interrogativo', 'qual, onde, como, de que tipo…'],
          ]}
        />
        <Note>
          Imagine uma conversa entre A e B. A palavra <strong className="font-jp">これ</strong> é
          algo que está perto de A; <strong className="font-jp">それ</strong> está perto de B;{' '}
          <strong className="font-jp">あれ</strong> está longe dos dois. Se só há uma pessoa
          presente, <strong className="font-jp">それ</strong> e <strong className="font-jp">あれ</strong>{' '}
          funcionam como "perto-mas-não-ao-alcance" e "bem longe", respectivamente.
        </Note>
      </Section>

      <Section title="Tabela geral completa">
        <GrammarTable
          headers={['Série', 'Adjetivo', 'Pronome', 'Lugar', 'Direção (formal)', 'Direção (casual)', 'Tipo', 'Modo']}
          jpCols={[0, 1, 2, 3, 4, 5, 6, 7]}
          rows={[
            ['こ', 'この', 'これ', 'ここ', 'こちら', 'こっち', 'こんな', 'こう'],
            ['そ', 'その', 'それ', 'そこ', 'そちら', 'そっち', 'そんな', 'そう'],
            ['あ', 'あの', 'あれ', 'あそこ', 'あちら', 'あっち', 'あんな', 'ああ'],
            ['ど', 'どの', 'どれ', 'どこ', 'どちら', 'どっち', 'どんな', 'どう'],
          ]}
        />
      </Section>

      <Section title="Adjetivos demonstrativos — この・その・あの・どの">
        <p className="text-sm leading-relaxed text-ink">
          Sempre aparecem <em>antes de um substantivo</em>. Nunca podem ficar sozinhos — se não há
          substantivo, use o pronome correspondente (これ, それ, etc.).
        </p>
        <Ex jp="このほんはおもしろいです。" pt="Este livro é interessante." />
        <Ex jp="そのえいがをみましたか？" pt="Você viu esse filme?" />
        <Ex jp="あのやまはきれいですね。" pt="Aquela montanha é bonita, não é?" />
        <Ex jp="どのでんしゃにのりますか？" pt="Em qual trem você vai entrar?" />
        <Note>
          <strong>Erro comum:</strong> usar この quando a intenção é これ.{' '}
          <span className="font-jp">「この」</span> precisa de um substantivo depois:{' '}
          <span className="font-jp">このほん ✓</span> / <span className="font-jp">「これはほんです」✓</span> /{' '}
          <span className="font-jp line-through">「このはほんです」✗</span>
        </Note>
      </Section>

      <Section title="Pronomes — これ・それ・あれ・どれ">
        <p className="text-sm leading-relaxed text-ink">
          Referem-se a <em>objetos ou conceitos</em> sem precisar nomear o substantivo. Aparecem
          sozinhos como sujeito ou objeto da frase.
        </p>
        <Ex jp="これはなんですか？" pt="O que é isto?" />
        <Ex jp="それをください。" pt="Me dá isso, por favor." />
        <Ex jp="あれはわたしのかさです。" pt="Aquilo é meu guarda-chuva." />
        <Ex jp="どれがあなたのですか？" pt="Qual é o seu?" />
        <Ex jp="A：これ、たべていい？　B：それはだめ。" pt="A: Posso comer isto? B: Aquilo não pode." notes="A usa これ (perto de A); B usa それ (perto de A, longe de B)" />
      </Section>

      <Section title="Lugar — ここ・そこ・あそこ・どこ">
        <p className="text-sm leading-relaxed text-ink">
          Indicam <em>lugares</em>, não objetos. Podem ser sujeito, objeto ou complemento de lugar.
        </p>
        <Ex jp="ここにすわってください。" pt="Por favor, sente-se aqui." />
        <Ex jp="そこはあぶないです。" pt="Aí é perigoso." />
        <Ex jp="あそこにトイレがあります。" pt="O banheiro está lá." />
        <Ex jp="どこにいきますか？" pt="Para onde você vai?" />
        <Ex jp="すみません、ゆうびんきょくはどこですか？" pt="Com licença, onde fica o correio?" />
        <Ex jp="ここからそこまでどのくらいかかりますか？" pt="Quanto tempo leva daqui até lá?" />
      </Section>

      <Section title="Direção — こちら・そちら・あちら・どちら (formal)">
        <p className="text-sm leading-relaxed text-ink">
          Indicam direção ou lado. São formas <strong>formais</strong> e muito usadas em atendimento
          ao cliente, lojas, hotéis e situações profissionais. <strong>どちら</strong> também serve
          como versão educada de "qual dos dois" (escolha entre duas opções).
        </p>
        <Ex jp="こちらへどうぞ。" pt="Por aqui, por favor." notes="atendente guiando um cliente" />
        <Ex jp="えきはあちらです。" pt="A estação é por lá." />
        <Ex jp="どちらがよろしいですか？" pt="Qual dos dois seria de sua preferência?" notes="versão educada de どれがいいですか" />
        <Ex jp="こちらはたなかさんです。" pt="Este (aqui) é o sr. Tanaka." notes="こちら também apresenta pessoas formalmente" />
      </Section>

      <Section title="Direção casual — こっち・そっち・あっち・どっち">
        <p className="text-sm leading-relaxed text-ink">
          Versões informais de こちら/そちら/あちら/どちら. Usadas entre amigos, família e em
          situações cotidianas.
        </p>
        <Ex jp="こっちにきて！" pt="Vem aqui!" />
        <Ex jp="あっちにいって。" pt="Vai lá." notes="pode soar rude dependendo do tom" />
        <Ex jp="どっちがいい？" pt="Qual dos dois você prefere?" />
        <GrammarTable
          headers={['Formal', 'Casual', 'Diferença de registro']}
          jpCols={[0, 1]}
          rows={[
            ['こちら', 'こっち', 'こちら: lojas, escritórios, apresentações'],
            ['そちら', 'そっち', 'そっち: conversa diária, amigos'],
            ['あちら', 'あっち', 'あっち: pode soar brusco'],
            ['どちら', 'どっち', 'どちら: escolha educada entre duas opções'],
          ]}
        />
      </Section>

      <Section title="Tipo — こんな・そんな・あんな・どんな">
        <p className="text-sm leading-relaxed text-ink">
          Significam "deste/desse/daquele tipo" e qualificam um substantivo, funcionando como
          adjetivos. Diferente de この/その/あの (que indicam qual objeto específico), こんな/そんな/あんな
          indicam a <em>natureza ou característica</em> de algo.
        </p>
        <Ex jp="こんなてんきはきらいです。" pt="Não gosto de um tempo assim (como este)." />
        <Ex jp="そんなことをいわないでください。" pt="Por favor, não diga coisas assim." />
        <Ex jp="あんなひとにはなりたくない。" pt="Não quero me tornar um pessoa como aquela." />
        <Ex jp="どんなおんがくがすきですか？" pt="Que tipo de música você gosta?" />
        <Ex jp="どんなしごとをしていますか？" pt="Que tipo de trabalho você faz?" />
      </Section>

      <Section title="Modo — こう・そう・ああ・どう">
        <p className="text-sm leading-relaxed text-ink">
          Indicam <em>modo ou maneira</em>: "assim", "dessa forma", "daquela forma", "como". São
          formas adverbiais e não modificam substantivos.
        </p>
        <Ex jp="こうしてください。" pt="Por favor, faça assim (desta forma)." notes="mostrando como fazer algo" />
        <Ex jp="そうおもいます。" pt="Acho que sim. / Penso assim." />
        <Ex jp="ああ、そうですか。" pt="Ah, é mesmo? / Entendi." notes="expressão de compreensão muito comum" />
        <Ex jp="どうすればいいですか？" pt="O que devo fazer? / Como devo proceder?" />
        <Ex jp="どうぞ。" pt="Por favor (vá em frente). / Aqui está." notes="どうぞ vem de どう — 'faça como quiser'" />
        <Note>
          <strong className="font-jp">そうですか</strong> e <strong className="font-jp">そうですね</strong>{' '}
          são expressões cotidianas muito importantes. そうですか é resposta de quem recebeu uma
          informação nova ("Ah, entendi"). そうですね concorda com o que o outro disse ("É isso
          mesmo / Concordo").
        </Note>
      </Section>

      <Section title="Uso discursivo — além da distância física">
        <p className="text-sm leading-relaxed text-ink">
          O sistema こそあど também organiza referências no <em>discurso</em>, não apenas no espaço
          físico. Esta é uma das partes mais sofisticadas e importantes para avançar no japonês.
        </p>
        <GrammarTable
          headers={['Série', 'Uso discursivo', 'Exemplo']}
          jpCols={[2]}
          rows={[
            ['こ', 'Algo que o FALANTE vai dizer a seguir (anafórico prospectivo)', 'こういうりゆうできました。（Por esta razão, vim.）'],
            ['そ', 'Algo que o OUVINTE disse, ou que ambos acabaram de mencionar', 'そのはなしはしっています。（Sei desse assunto.）'],
            ['あ', 'Algo que AMBOS conhecem mas não foi mencionado recentemente', 'あのじけん、おぼえてる？（Você se lembra daquele incidente?）'],
          ]}
        />
        <Ex jp="こんなはなしをしてもいいかな。" pt="Posso falar sobre este assunto (que vou mencionar)?" notes="こ refere algo que o falante está prestes a dizer" />
        <Ex jp="A：きのうのしけんはむずかしかった。B：そうだったね。" pt="A: A prova de ontem foi difícil. B: Foi mesmo, né." notes="B usa そう referindo-se ao que A disse" />
        <Ex jp="あのえいが、もうみた？" pt="Você já viu aquele filme?" notes="あ indica algo que ambos conhecem (um filme famoso)" />
      </Section>

      <Section title="Erros comuns">
        <GrammarTable
          headers={['Erro', 'Incorreto', 'Correto', 'Por quê']}
          jpCols={[1, 2]}
          rows={[
            ['Usar この sem substantivo', 'このはなんですか？', 'これはなんですか？', 'この precisa de substantivo; これ fica sozinho'],
            ['Confundir これ e それ', '（algo perto de B）これをください', '（algo perto de B）それをください', 'Você quer algo que está perto de B, não de você'],
            ['Usar ここ como direção', 'ここへどうぞ', 'こちらへどうぞ', 'Em contexto formal, こちら é mais natural'],
            ['Usar どの sem opção clara', 'どのがいい？', 'どれがいい？ / どちらがいい？', 'どの precisa de substantivo; para pronome use どれ/どちら'],
          ]}
        />
      </Section>

      <Section title="Resumo rápido">
        <GrammarTable
          headers={['Quero dizer...', 'Use']}
          jpCols={[1]}
          rows={[
            ['"este livro" (adjetivo + substantivo)', 'このほん'],
            ['"isto" (pronome, objeto)', 'これ'],
            ['"aqui" (lugar)', 'ここ'],
            ['"por aqui" (direção, formal)', 'こちら'],
            ['"por aqui" (direção, casual)', 'こっち'],
            ['"deste tipo" (qualidade)', 'こんな'],
            ['"assim, desta forma" (modo)', 'こう'],
          ]}
        />
      </Section>
    </div>
  );
}
