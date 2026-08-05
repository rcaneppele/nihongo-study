import { Section, Ex, Note, GrammarTable, ReadingKey } from '../components/Licao';

export const meta = {
  id: 'familia',
  title: 'Família',
  subtitle: 'Vocabulário de parentesco e os dois registros',
  emoji: '👨‍👩‍👧',
  tags: ['vocabulário', 'n5'],
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

      <Section title="A ideia central: existem dois registros">
        <p className="text-sm leading-relaxed text-ink">
          Em japonês, existem <strong>duas palavras diferentes para cada parente</strong>,
          dependendo de quem é a família:
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
          Existem também <span className="font-jp">しゅじん</span> (<em>shujin</em>, "dono da
          casa") para marido e <span className="font-jp">かない</span> (<em>kanai</em>, "dentro
          da casa") para esposa. São termos antigos, com tom hierárquico, que muitos japoneses
          hoje evitam. Para o seu vocabulário ativo, prefira <span className="font-jp">おっと</span>{' '}
          (marido) e <span className="font-jp">つま</span> (esposa).
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
          casamento". Não precisa decorar tudo isso agora; volte aqui quando precisar.
        </Note>
      </Section>

      <Section title="Filhos por ordem de nascimento">
        <p className="text-sm leading-relaxed text-ink">
          Estes termos aparecem em contextos formais e documentos.
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

      <Section title="Perguntando sobre a família">
        <p className="text-sm leading-relaxed text-ink">
          Ao perguntar sobre a família <strong>do outro</strong>, usam-se as formas respeitosas.
        </p>
        <Ex
          jp="ごかぞくはいますか？"
          romaji="gokazoku wa imasu ka?"
          pt="Você tem família?"
          notes="ごかぞく é a forma respeitosa de かぞく. Nunca use ご para a sua própria família."
        />
        <Ex jp="ごきょうだいはいますか？" romaji="gokyoudai wa imasu ka?" pt="Você tem irmãos?" />
        <Ex
          jp="なんにんかぞくですか？"
          romaji="nan-nin kazoku desu ka?"
          pt="Quantas pessoas há na sua família?"
          notes="なんにん = quantas pessoas."
        />
        <Ex
          jp="おこさんはいますか？"
          romaji="okosan wa imasu ka?"
          pt="Você tem filhos?"
          notes="おこさん é a forma respeitosa. Para os seus filhos, diga こども."
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
          notes="Falando do pai de outra pessoa, usa-se おとうさん (respeitoso)."
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
          ]}
        />
      </Section>
    </div>
  );
}
