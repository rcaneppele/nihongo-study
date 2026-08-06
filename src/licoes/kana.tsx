import { Section, Ex, Note, GrammarTable, ReadingKey } from '../components/Licao';
import type { QuizLicao } from '../data/quiz/types';

export const meta = {
  id: 'kana',
  title: 'Kana — Hiragana e Katakana',
  subtitle: 'Os dois alfabetos fonéticos do japonês',
  emoji: '🔤',
  tags: ['escrita', 'n5'],
};

export const quiz: QuizLicao = {
  perguntas: [
    {
      id: 'kana-sig1',
      tipo: 'significado',
      pergunta: 'Qual conjunto de kana é usado principalmente para palavras estrangeiras?',
      alternativas: ['Katakana', 'Hiragana', 'Kanji', 'Romaji'],
      correta: 0,
    },
    {
      id: 'kana-sig2',
      tipo: 'significado',
      pergunta: 'O que faz o っ pequeno (sokuon)?',
      alternativas: [
        'dobra a consoante seguinte, criando uma pausa',
        'alonga a vogal anterior',
        'transforma o som em sonoro',
        'nada, é decorativo',
      ],
      correta: 0,
    },
    {
      id: 'kana-sig3',
      tipo: 'significado',
      pergunta: 'O que os dois tracinhos (゛), chamados dakuten, fazem a um kana como か?',
      alternativas: [
        'transformam o som numa versão sonora/vibrada (か→が)',
        'criam o som de "p"',
        'alongam a vogal',
        'dobram a consoante',
      ],
      correta: 0,
    },
    {
      id: 'kana-sig4',
      tipo: 'significado',
      pergunta: 'O que a bolinha (゜), chamada handakuten, faz a は?',
      alternativas: ['cria o som de "p" (は→ぱ)', 'cria o som sonoro (は→ば)', 'alonga a vogal', 'nada'],
      correta: 0,
    },
    {
      id: 'kana-vf1',
      tipo: 'verdadeiro-falso',
      afirmacao: 'を lê-se "o" e serve apenas como partícula.',
      correta: true,
    },
    {
      id: 'kana-vf2',
      tipo: 'verdadeiro-falso',
      afirmacao: 'きゃ se lê como dois sons separados, "ki-ya".',
      correta: false,
      explicacao: 'きゃ é um único som, "kya" — o や pequeno se funde com o kana anterior.',
    },
    {
      id: 'kana-vf3',
      tipo: 'verdadeiro-falso',
      afirmacao: 'ん é o único kana que representa só uma consoante, sem vogal.',
      correta: true,
    },
    {
      id: 'kana-vf4',
      tipo: 'verdadeiro-falso',
      afirmacao: 'No katakana, a vogal longa se marca com um traço (ー).',
      correta: true,
    },
  ],
};

function kanaCell(kana: string, romaji: string) {
  return (
    <span className="block whitespace-nowrap">
      <span className="font-jp text-base">{kana}</span>
      <br />
      <span className="text-xs italic text-sage">{romaji}</span>
    </span>
  );
}

const dash = <span className="text-line">—</span>;

export default function Kana() {
  return (
    <div className="space-y-10">
      <p className="leading-relaxed text-ink">
        O japonês se escreve com três sistemas ao mesmo tempo: <strong>kanji</strong>,{' '}
        <strong>hiragana</strong> e <strong>katakana</strong>. Esta lição cobre os dois últimos —
        os alfabetos fonéticos, que são a porta de entrada para ler e escrever japonês.
      </p>

      <Section title="Como ler esta lição">
        <p className="text-sm leading-relaxed text-ink">
          Cada som aparece com o kana e a leitura em romaji (letras do nosso alfabeto), assim:
        </p>
        <ReadingKey
          lines={[
            { text: 'あ', desc: 'kana' },
            { text: 'a', desc: 'romaji (leitura)' },
          ]}
        />
        <p className="text-sm leading-relaxed text-ink">
          Nas tabelas, cada quadradinho traz o kana em cima e o romaji embaixo.
        </p>
      </Section>

      <Section title="O que é o kana">
        <p className="text-sm leading-relaxed text-ink">
          Os kanji são os símbolos que representam ideias — são milhares, e ficam para mais
          tarde.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          O <strong>kana</strong> é diferente: cada símbolo representa um <strong>som</strong>,
          não uma ideia. É como o nosso alfabeto, mas com uma diferença importante. Cada kana
          vale, quase sempre, por uma <strong>sílaba inteira</strong> (consoante + vogal), e não
          por uma letra só.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          Por exemplo, か vale pelo som "ka" de uma vez. Não existe um símbolo só para o "k".
        </p>
        <Note>
          O nome técnico disso é "sistema silábico" (ou, mais preciso, "moraico"). Você não
          precisa decorar esse nome. Basta lembrar: <strong>um kana = um som.</strong>
        </Note>
        <p className="text-sm leading-relaxed text-ink">
          Existem dois conjuntos de kana: hiragana e katakana. Cada um tem os{' '}
          <strong>mesmos 46 sons básicos</strong>, só que com desenhos diferentes.
        </p>
      </Section>

      <Section title="Hiragana e Katakana: para que serve cada um">
        <p className="text-sm leading-relaxed text-ink">
          <strong>Hiragana</strong> (ひらがな) tem traços arredondados. É o kana do dia a dia.
          Serve para:
        </p>
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink">
          <li>palavras japonesas nativas (ねこ = gato);</li>
          <li>partículas e terminações de verbos (たべます);</li>
          <li>tudo que ainda não se escreve com kanji.</li>
        </ul>
        <p className="text-sm leading-relaxed text-ink">
          É por ele que se começa. Aprenda o hiragana primeiro.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          <strong>Katakana</strong> (カタカナ) tem traços retos e angulosos. Serve
          principalmente para:
        </p>
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink">
          <li>palavras estrangeiras (コーヒー = café, do inglês <em>coffee</em>);</li>
          <li>nomes estrangeiros (ブラジル = Brasil);</li>
          <li>sons e ruídos (ワンワン = au-au);</li>
          <li>dar destaque, como o nosso <em>itálico</em>.</li>
        </ul>
        <p className="text-sm leading-relaxed text-ink">
          Regra prática: se a palavra "veio de fora", provavelmente se escreve em katakana.
        </p>
      </Section>

      <Section title="As 5 vogais — a base de tudo">
        <p className="text-sm leading-relaxed text-ink">
          Todo o sistema kana se apoia em <strong>cinco vogais</strong>. Decore-as primeiro; o
          resto se encaixa nelas.
        </p>
        <GrammarTable
          headers={['Hiragana', 'Katakana', 'Romaji', 'Som parecido em português']}
          jpCols={[0, 1]}
          rows={[
            ['あ', 'ア', 'a', '"a" de casa'],
            ['い', 'イ', 'i', '"i" de vida'],
            ['う', 'ウ', 'u', '"u" de uva (mas com lábios relaxados)'],
            ['え', 'エ', 'e', '"ê" fechado, de você'],
            ['お', 'オ', 'o', '"ô" fechado, de avô'],
          ]}
        />
        <p className="text-sm leading-relaxed text-ink">
          Os outros sons são quase sempre uma <strong>consoante + uma dessas vogais</strong>: か
          (k+a), き (k+i), く (k+u), け (k+e), こ (k+o). Por isso, quando você sabe as vogais,
          decorar o resto vira quase automático.
        </p>
      </Section>

      <Section title="Dicas de pronúncia para brasileiros">
        <p className="text-sm leading-relaxed text-ink">
          Alguns sons enganam quem fala português. Preste atenção nestes:
        </p>
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink">
          <li>
            <strong className="font-jp">し</strong> = <em>shi</em> → som de "xi", como em{' '}
            <em>xícara</em>.
          </li>
          <li>
            <strong className="font-jp">ち</strong> = <em>chi</em> → som de "tchi".
          </li>
          <li>
            <strong className="font-jp">つ</strong> = <em>tsu</em> → "ts" + "u", tudo junto. Não
            existe em português; treine bastante.
          </li>
          <li>
            <strong className="font-jp">ふ</strong> = <em>fu</em> → um "f" bem soprado, quase um
            "hu".
          </li>
          <li>
            <strong className="font-jp">じ</strong> = <em>ji</em> → som de "dji".
          </li>
          <li>
            <strong className="font-jp">ら り る れ ろ</strong> = <em>ra ri ru re ro</em> → o "r" é
            uma batidinha rápida, como o "r" de <em>caro</em> ou <em>prato</em>. Nunca é o "rr"
            forte de <em>carro</em>.
          </li>
          <li>
            <strong>As vogais são sempre puras.</strong> え é sempre "ê" (nunca "éi"); お é sempre
            "ô".
          </li>
        </ul>
      </Section>

      <Section title="Como ler as tabelas de kana">
        <p className="text-sm leading-relaxed text-ink">
          A tabela oficial do japonês chama-se <strong>gojūon</strong> (ごじゅうおん, "os
          cinquenta sons"). Ela é organizada no formato tradicional japonês:
        </p>
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink">
          <li>
            <strong>As colunas são lidas da direita para a esquerda.</strong> A coluna あ fica à{' '}
            <strong>direita</strong>; a coluna わ fica à esquerda.
          </li>
          <li>
            <strong>Cada coluna é lida de cima para baixo</strong>, na ordem das vogais: あ, い,
            う, え, お.
          </li>
        </ul>
        <p className="text-sm leading-relaxed text-ink">
          Nas tabelas abaixo, o traço "—" marca um som que <strong>não existe</strong> no
          japonês moderno (a posição fica vazia).
        </p>
      </Section>

      <Section title="Hiragana — seion (sons básicos)">
        <p className="text-sm leading-relaxed text-ink">
          Estes são os 46 sons básicos, sem nenhum sinal extra. "Seion" (せいおん) significa "som
          puro". Leia da direita (あ) para a esquerda (わ), cada coluna de cima para baixo.
        </p>
        <GrammarTable
          headers={['わ行', 'ら行', 'や行', 'ま行', 'は行', 'な行', 'た行', 'さ行', 'か行', 'あ行']}
          rows={[
            [
              kanaCell('わ', 'wa'), kanaCell('ら', 'ra'), kanaCell('や', 'ya'), kanaCell('ま', 'ma'),
              kanaCell('は', 'ha'), kanaCell('な', 'na'), kanaCell('た', 'ta'), kanaCell('さ', 'sa'),
              kanaCell('か', 'ka'), kanaCell('あ', 'a'),
            ],
            [
              dash, kanaCell('り', 'ri'), dash, kanaCell('み', 'mi'),
              kanaCell('ひ', 'hi'), kanaCell('に', 'ni'), kanaCell('ち', 'chi'), kanaCell('し', 'shi'),
              kanaCell('き', 'ki'), kanaCell('い', 'i'),
            ],
            [
              dash, kanaCell('る', 'ru'), kanaCell('ゆ', 'yu'), kanaCell('む', 'mu'),
              kanaCell('ふ', 'fu'), kanaCell('ぬ', 'nu'), kanaCell('つ', 'tsu'), kanaCell('す', 'su'),
              kanaCell('く', 'ku'), kanaCell('う', 'u'),
            ],
            [
              dash, kanaCell('れ', 're'), dash, kanaCell('め', 'me'),
              kanaCell('へ', 'he'), kanaCell('ね', 'ne'), kanaCell('て', 'te'), kanaCell('せ', 'se'),
              kanaCell('け', 'ke'), kanaCell('え', 'e'),
            ],
            [
              kanaCell('を', 'wo'), kanaCell('ろ', 'ro'), kanaCell('よ', 'yo'), kanaCell('も', 'mo'),
              kanaCell('ほ', 'ho'), kanaCell('の', 'no'), kanaCell('と', 'to'), kanaCell('そ', 'so'),
              kanaCell('こ', 'ko'), kanaCell('お', 'o'),
            ],
          ]}
        />
        <GrammarTable
          headers={['Hiragana', 'Romaji', 'Observação']}
          jpCols={[0]}
          rows={[['ん', 'n', 'O único kana que é só consoante. Nunca inicia uma palavra.']]}
        />
        <Note>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              <strong className="font-jp">を</strong> lê-se <em>o</em> e serve <strong>só</strong>{' '}
              como partícula (a de objeto direto). Nunca aparece dentro de uma palavra comum.
            </li>
            <li>
              As posições vazias da coluna や (só や, ゆ, よ) e da coluna わ (só わ e を) são
              normais: esses sons se perderam ao longo da história.
            </li>
            <li>
              <strong className="font-jp">ん</strong> muda de som conforme o que vem depois (às
              vezes soa "n", às vezes "m" ou "ng"). Isso acontece naturalmente; não precisa
              forçar.
            </li>
          </ul>
        </Note>
      </Section>

      <Section title="Katakana — seion (sons básicos)">
        <p className="text-sm leading-relaxed text-ink">
          Os mesmos 46 sons, agora em katakana. Mesma leitura: direita para a esquerda, de cima
          para baixo.
        </p>
        <GrammarTable
          headers={['ワ行', 'ラ行', 'ヤ行', 'マ行', 'ハ行', 'ナ行', 'タ行', 'サ行', 'カ行', 'ア行']}
          rows={[
            [
              kanaCell('ワ', 'wa'), kanaCell('ラ', 'ra'), kanaCell('ヤ', 'ya'), kanaCell('マ', 'ma'),
              kanaCell('ハ', 'ha'), kanaCell('ナ', 'na'), kanaCell('タ', 'ta'), kanaCell('サ', 'sa'),
              kanaCell('カ', 'ka'), kanaCell('ア', 'a'),
            ],
            [
              dash, kanaCell('リ', 'ri'), dash, kanaCell('ミ', 'mi'),
              kanaCell('ヒ', 'hi'), kanaCell('ニ', 'ni'), kanaCell('チ', 'chi'), kanaCell('シ', 'shi'),
              kanaCell('キ', 'ki'), kanaCell('イ', 'i'),
            ],
            [
              dash, kanaCell('ル', 'ru'), kanaCell('ユ', 'yu'), kanaCell('ム', 'mu'),
              kanaCell('フ', 'fu'), kanaCell('ヌ', 'nu'), kanaCell('ツ', 'tsu'), kanaCell('ス', 'su'),
              kanaCell('ク', 'ku'), kanaCell('ウ', 'u'),
            ],
            [
              dash, kanaCell('レ', 're'), dash, kanaCell('メ', 'me'),
              kanaCell('ヘ', 'he'), kanaCell('ネ', 'ne'), kanaCell('テ', 'te'), kanaCell('セ', 'se'),
              kanaCell('ケ', 'ke'), kanaCell('エ', 'e'),
            ],
            [
              kanaCell('ヲ', 'wo'), kanaCell('ロ', 'ro'), kanaCell('ヨ', 'yo'), kanaCell('モ', 'mo'),
              kanaCell('ホ', 'ho'), kanaCell('ノ', 'no'), kanaCell('ト', 'to'), kanaCell('ソ', 'so'),
              kanaCell('コ', 'ko'), kanaCell('オ', 'o'),
            ],
          ]}
        />
        <GrammarTable
          headers={['Katakana', 'Romaji', 'Observação']}
          jpCols={[0]}
          rows={[['ン', 'n', 'Versão em katakana do ん.']]}
        />
        <Note>ヲ (o katakana de を) quase nunca é usado hoje. Está aqui só para a tabela ficar completa.</Note>
      </Section>

      <Section title="Dakuten (゛) — os sons «sonoros»">
        <p className="text-sm leading-relaxed text-ink">
          <strong>Dakuten</strong> (だくてん) são as <strong>duas aspas</strong> que se colocam no
          canto superior direito de um kana: ゛. Elas transformam o som numa versão "mais
          grave/vibrada". A lógica é simples:
        </p>
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink">
          <li>
            <strong className="font-jp">か → が</strong> (k vira g)
          </li>
          <li>
            <strong className="font-jp">さ → ざ</strong> (s vira z)
          </li>
          <li>
            <strong className="font-jp">た → だ</strong> (t vira d)
          </li>
          <li>
            <strong className="font-jp">は → ば</strong> (h vira b)
          </li>
        </ul>
        <p className="text-sm leading-relaxed text-ink">Hiragana com dakuten:</p>
        <GrammarTable
          headers={['ば行', 'だ行', 'ざ行', 'が行']}
          rows={[
            [kanaCell('ば', 'ba'), kanaCell('だ', 'da'), kanaCell('ざ', 'za'), kanaCell('が', 'ga')],
            [kanaCell('び', 'bi'), kanaCell('ぢ', 'ji'), kanaCell('じ', 'ji'), kanaCell('ぎ', 'gi')],
            [kanaCell('ぶ', 'bu'), kanaCell('づ', 'zu'), kanaCell('ず', 'zu'), kanaCell('ぐ', 'gu')],
            [kanaCell('べ', 'be'), kanaCell('で', 'de'), kanaCell('ぜ', 'ze'), kanaCell('げ', 'ge')],
            [kanaCell('ぼ', 'bo'), kanaCell('ど', 'do'), kanaCell('ぞ', 'zo'), kanaCell('ご', 'go')],
          ]}
        />
        <p className="text-sm leading-relaxed text-ink">Katakana com dakuten:</p>
        <GrammarTable
          headers={['バ行', 'ダ行', 'ザ行', 'ガ行']}
          rows={[
            [kanaCell('バ', 'ba'), kanaCell('ダ', 'da'), kanaCell('ザ', 'za'), kanaCell('ガ', 'ga')],
            [kanaCell('ビ', 'bi'), kanaCell('ヂ', 'ji'), kanaCell('ジ', 'ji'), kanaCell('ギ', 'gi')],
            [kanaCell('ブ', 'bu'), kanaCell('ヅ', 'zu'), kanaCell('ズ', 'zu'), kanaCell('グ', 'gu')],
            [kanaCell('ベ', 'be'), kanaCell('デ', 'de'), kanaCell('ゼ', 'ze'), kanaCell('ゲ', 'ge')],
            [kanaCell('ボ', 'bo'), kanaCell('ド', 'do'), kanaCell('ゾ', 'zo'), kanaCell('ゴ', 'go')],
          ]}
        />
        <Note>
          <strong>Detalhe importante:</strong> じ e ぢ têm o <strong>mesmo som</strong> (
          <em>ji</em>); ず e づ também (<em>zu</em>). Na prática, quase sempre se usa じ e ず. As
          formas ぢ e づ aparecem em pouquíssimas palavras. Não se preocupe com elas por enquanto.
        </Note>
      </Section>

      <Section title="Handakuten (゜) — o som «p»">
        <p className="text-sm leading-relaxed text-ink">
          <strong>Handakuten</strong> (はんだくてん) é a <strong>bolinha</strong> no canto
          superior direito: ゜. Ela só aparece na coluna は e cria o som de "p".
        </p>
        <p className="text-sm leading-relaxed text-ink">
          <strong className="font-jp">は → ぱ</strong> (h vira p)
        </p>
        <GrammarTable
          headers={['Hiragana (ぱ行)', 'Romaji', 'Katakana (パ行)']}
          jpCols={[0, 2]}
          rows={[
            ['ぱ', 'pa', 'パ'],
            ['ぴ', 'pi', 'ピ'],
            ['ぷ', 'pu', 'プ'],
            ['ぺ', 'pe', 'ペ'],
            ['ぽ', 'po', 'ポ'],
          ]}
        />
        <Note>
          Cuidado para não confundir os dois sinais:
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              <strong>゛</strong> (duas aspas) = dakuten → som sonoro (が, ざ, だ, ば).
            </li>
            <li>
              <strong>゜</strong> (bolinha) = handakuten → som de "p" (ぱ).
            </li>
          </ul>
        </Note>
      </Section>

      <Section title="Yōon (combinados) — kana + pequeno ゃ ゅ ょ">
        <p className="text-sm leading-relaxed text-ink">
          <strong>Yōon</strong> (ようおん) são sons formados juntando um kana da coluna{' '}
          <strong>い</strong> (como き, し, ち) com um <strong>や, ゆ ou よ pequeno</strong> (ゃ,
          ゅ, ょ). Repare no tamanho: o segundo kana é <strong>miúdo</strong>. É isso que avisa
          que os dois se fundem num único som.
        </p>
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink">
          <li>
            <strong className="font-jp">き + ゃ = きゃ</strong> → <em>kya</em> (um som só, não
            "ki-ya")
          </li>
          <li>
            <strong className="font-jp">し + ゅ = しゅ</strong> → <em>shu</em>
          </li>
          <li>
            <strong className="font-jp">ち + ょ = ちょ</strong> → <em>cho</em>
          </li>
        </ul>
        <p className="text-sm leading-relaxed text-ink">
          Regra prática: leia os dois juntos, rápido, como uma sílaba única.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          Hiragana — yōon. Colunas da direita (き) para a esquerda (り); linhas de cima (ゃ) para
          baixo (ょ).
        </p>
        <GrammarTable
          headers={['り', 'み', 'ひ', 'に', 'ち', 'し', 'き']}
          rows={[
            [
              kanaCell('りゃ', 'rya'), kanaCell('みゃ', 'mya'), kanaCell('ひゃ', 'hya'), kanaCell('にゃ', 'nya'),
              kanaCell('ちゃ', 'cha'), kanaCell('しゃ', 'sha'), kanaCell('きゃ', 'kya'),
            ],
            [
              kanaCell('りゅ', 'ryu'), kanaCell('みゅ', 'myu'), kanaCell('ひゅ', 'hyu'), kanaCell('にゅ', 'nyu'),
              kanaCell('ちゅ', 'chu'), kanaCell('しゅ', 'shu'), kanaCell('きゅ', 'kyu'),
            ],
            [
              kanaCell('りょ', 'ryo'), kanaCell('みょ', 'myo'), kanaCell('ひょ', 'hyo'), kanaCell('にょ', 'nyo'),
              kanaCell('ちょ', 'cho'), kanaCell('しょ', 'sho'), kanaCell('きょ', 'kyo'),
            ],
          ]}
        />
        <p className="text-sm leading-relaxed text-ink">Yōon com dakuten/handakuten (sons sonoros e "p"):</p>
        <GrammarTable
          headers={['ぴ', 'び', 'じ', 'ぎ']}
          rows={[
            [kanaCell('ぴゃ', 'pya'), kanaCell('びゃ', 'bya'), kanaCell('じゃ', 'ja'), kanaCell('ぎゃ', 'gya')],
            [kanaCell('ぴゅ', 'pyu'), kanaCell('びゅ', 'byu'), kanaCell('じゅ', 'ju'), kanaCell('ぎゅ', 'gyu')],
            [kanaCell('ぴょ', 'pyo'), kanaCell('びょ', 'byo'), kanaCell('じょ', 'jo'), kanaCell('ぎょ', 'gyo')],
          ]}
        />
        <p className="text-sm leading-relaxed text-ink">Katakana — yōon. Mesma lógica, em katakana.</p>
        <GrammarTable
          headers={['リ', 'ミ', 'ヒ', 'ニ', 'チ', 'シ', 'キ']}
          rows={[
            [
              kanaCell('リャ', 'rya'), kanaCell('ミャ', 'mya'), kanaCell('ヒャ', 'hya'), kanaCell('ニャ', 'nya'),
              kanaCell('チャ', 'cha'), kanaCell('シャ', 'sha'), kanaCell('キャ', 'kya'),
            ],
            [
              kanaCell('リュ', 'ryu'), kanaCell('ミュ', 'myu'), kanaCell('ヒュ', 'hyu'), kanaCell('ニュ', 'nyu'),
              kanaCell('チュ', 'chu'), kanaCell('シュ', 'shu'), kanaCell('キュ', 'kyu'),
            ],
            [
              kanaCell('リョ', 'ryo'), kanaCell('ミョ', 'myo'), kanaCell('ヒョ', 'hyo'), kanaCell('ニョ', 'nyo'),
              kanaCell('チョ', 'cho'), kanaCell('ショ', 'sho'), kanaCell('キョ', 'kyo'),
            ],
          ]}
        />
        <GrammarTable
          headers={['ピ', 'ビ', 'ジ', 'ギ']}
          rows={[
            [kanaCell('ピャ', 'pya'), kanaCell('ビャ', 'bya'), kanaCell('ジャ', 'ja'), kanaCell('ギャ', 'gya')],
            [kanaCell('ピュ', 'pyu'), kanaCell('ビュ', 'byu'), kanaCell('ジュ', 'ju'), kanaCell('ギュ', 'gyu')],
            [kanaCell('ピョ', 'pyo'), kanaCell('ビョ', 'byo'), kanaCell('ジョ', 'jo'), kanaCell('ギョ', 'gyo')],
          ]}
        />
      </Section>

      <Section title="Sinais especiais que mudam o som">
        <p className="text-sm leading-relaxed text-ink">
          Além dos kana, três sinais aparecem o tempo todo e alteram a leitura.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          <strong>O つ pequeno (っ / ッ) — a "pausa dobrada".</strong> Um <strong>つ miúdo</strong>{' '}
          (っ em hiragana, ッ em katakana) <strong>não se lê</strong>. Ele dobra a consoante
          seguinte, criando uma pausinha.
        </p>
        <Ex
          jp="きって"
          romaji="kitte"
          pt="selo"
          notes="o っ dobra o t: lê-se ki-(pausa)-te. Sem o っ, きて (kite) seria venha. A pausa muda a palavra"
        />
        <Ex jp="がっこう" romaji="gakkou" pt="escola" notes="o っ dobra o k: ga-(pausa)-kou" />

        <p className="text-sm leading-relaxed text-ink">
          <strong>A vogal longa.</strong> Segurar a vogal por mais tempo pode mudar a palavra. O
          jeito de marcar isso é diferente em cada kana.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          No <strong>hiragana</strong>, junta-se uma vogal:
        </p>
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink">
          <li>
            <strong className="font-jp">おかあさん</strong> (<em>okaasan</em>) → mãe (o "a" é
            longo: あ + あ).
          </li>
          <li>
            <strong className="font-jp">こうこう</strong> (<em>koukou</em>) → colégio (o som "ô"
            é longo: お + う).
          </li>
        </ul>
        <p className="text-sm leading-relaxed text-ink">
          No <strong>katakana</strong>, usa-se um <strong>traço</strong> (ー):
        </p>
        <Ex
          jp="コーヒー"
          romaji="koohii"
          pt="café"
          notes="o ー alonga a vogal anterior. コー = kô; ヒー = hii"
        />
        <Ex jp="ラーメン" romaji="raamen" pt="lámen" notes="ラー = râ" />
        <Note>
          Vogal curta e longa são palavras diferentes.{' '}
          <strong className="font-jp">おばさん</strong> (<em>obasan</em>, tia) e{' '}
          <strong className="font-jp">おばあさん</strong> (<em>obaasan</em>, avó) só diferem no
          tamanho do "a". Segurar a vogal importa.
        </Note>
      </Section>

      <Section title="Katakana estendido (para sons estrangeiros)">
        <p className="text-sm leading-relaxed text-ink">
          O japonês criou combinações extras em katakana para imitar sons que não existiam na
          língua. Você não precisa decorar agora; basta reconhecer.
        </p>
        <GrammarTable
          headers={['Katakana', 'Romaji', 'Aparece em']}
          jpCols={[0, 2]}
          rows={[
            ['ファ フィ フェ フォ', 'fa fi fe fo', 'ファイル (arquivo)'],
            ['ティ / ディ', 'ti / di', 'パーティー (festa)'],
            ['ウィ / ウェ', 'wi / we', 'ウェブ (web)'],
            ['ジェ / チェ', 'je / che', 'チェック (checar)'],
            ['ヴ', 'vu (som de "v")', 'ヴァイオリン (violino)'],
          ]}
        />
      </Section>

      <Section title="Exemplos em contexto">
        <p className="text-sm leading-relaxed text-ink">Veja como as peças se juntam em palavras reais.</p>
        <Ex jp="すし" romaji="sushi" pt="sushi" notes="dois kana simples: す (su) + し (shi)" />
        <Ex jp="ねこ" romaji="neko" pt="gato" notes="ね (ne) + こ (ko)" />
        <Ex jp="でんわ" romaji="denwa" pt="telefone" notes="で (dakuten em て) + ん (n) + わ (wa)" />
        <Ex jp="しゃしん" romaji="shashin" pt="foto" notes="começa com o yōon しゃ (sha): し + や pequeno" />
        <Ex jp="パン" romaji="pan" pt="pão" notes="palavra estrangeira, por isso katakana. パ tem handakuten (som de p)" />
        <Ex jp="テレビ" romaji="terebi" pt="televisão" notes="katakana, do inglês television. ビ tem dakuten" />
        <Ex jp="コーヒー" romaji="koohii" pt="café" notes="katakana com dois traços de vogal longa (ー)" />
      </Section>

      <Section title="Kana parecidos (cuidado para não confundir)">
        <p className="text-sm leading-relaxed text-ink">
          Alguns kana têm desenhos parecidos. Vale olhar com atenção desde o começo.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          <strong>No hiragana:</strong>
        </p>
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink">
          <li>
            <strong className="font-jp">さ</strong> (<em>sa</em>) e{' '}
            <strong className="font-jp">ち</strong> (<em>chi</em>) — quase espelhados.
          </li>
          <li>
            <strong className="font-jp">ぬ</strong> (<em>nu</em>),{' '}
            <strong className="font-jp">め</strong> (<em>me</em>) e{' '}
            <strong className="font-jp">ね</strong> (<em>ne</em>) — parecidos, mas com "rabinhos"
            diferentes.
          </li>
          <li>
            <strong className="font-jp">は</strong> (<em>ha</em>),{' '}
            <strong className="font-jp">ほ</strong> (<em>ho</em>) e{' '}
            <strong className="font-jp">ま</strong> (<em>ma</em>) — atenção aos traços.
          </li>
          <li>
            <strong className="font-jp">れ</strong> (<em>re</em>),{' '}
            <strong className="font-jp">ね</strong> (<em>ne</em>) e{' '}
            <strong className="font-jp">わ</strong> (<em>wa</em>) — só muda a parte de baixo.
          </li>
        </ul>
        <p className="text-sm leading-relaxed text-ink">
          <strong>No katakana:</strong>
        </p>
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink">
          <li>
            <strong className="font-jp">シ</strong> (<em>shi</em>) e{' '}
            <strong className="font-jp">ツ</strong> (<em>tsu</em>) — os traços mudam de ângulo
            (シ "deitado", ツ "em pé").
          </li>
          <li>
            <strong className="font-jp">ソ</strong> (<em>so</em>) e{' '}
            <strong className="font-jp">ン</strong> (<em>n</em>) — igualmente sutis.
          </li>
          <li>
            <strong className="font-jp">ク</strong> (<em>ku</em>),{' '}
            <strong className="font-jp">ケ</strong> (<em>ke</em>) e{' '}
            <strong className="font-jp">タ</strong> (<em>ta</em>) — parecem, mas são diferentes.
          </li>
        </ul>
        <Note>
          Dica: シ/ツ e ソ/ン são o pesadelo clássico de quem começa. Não se assuste se confundir
          no início; com leitura, o olho se acostuma.
        </Note>
      </Section>

      <Section title="Erros comuns">
        <GrammarTable
          headers={['Erro', 'Exemplo', 'Correto', 'Por quê']}
          jpCols={[1, 2]}
          rows={[
            ['Ler を como "uo"', 'を = "uo"', 'を = o', 'を é sempre o, e só como partícula.'],
            [
              'Ignorar o っ pequeno',
              'きて / きって trocados',
              'きって = selo, きて = venha',
              'O っ dobra a consoante e muda a palavra.',
            ],
            [
              'Ignorar a vogal longa',
              'おばさん / おばあさん trocados',
              'おばさん = tia, おばあさん = avó',
              'O tamanho da vogal muda o significado.',
            ],
            ['Ler yōon como dois sons', 'きゃ = "ki-ya"', 'きゃ = kya (um som)', 'O や pequeno funde-se com o kana anterior.'],
            [
              'Usar katakana para palavra japonesa',
              'ネコ para "gato"',
              'ねこ',
              'Palavras japonesas comuns vão em hiragana.',
            ],
            [
              'Confundir ゛e ゜',
              'は゜ querendo "ba"',
              'ば (゛) = ba, ぱ (゜) = pa',
              'Duas aspas = som sonoro; bolinha = som de "p".',
            ],
          ]}
        />
      </Section>

      <Section title="Resumo e ordem de estudo sugerida">
        <p className="text-sm leading-relaxed text-ink">Uma sequência que costuma funcionar bem:</p>
        <ol className="list-decimal space-y-1.5 pl-5 text-sm leading-relaxed text-ink">
          <li>
            <strong>As 5 vogais</strong> (あいうえお) — a base de tudo.
          </li>
          <li>
            <strong>Hiragana seion</strong> — os 46 sons básicos, coluna por coluna.
          </li>
          <li>
            <strong>Dakuten e handakuten</strong> — são só variações de sons que você já sabe.
          </li>
          <li>
            <strong>Yōon</strong> — as combinações com ゃゅょ.
          </li>
          <li>
            <strong>Sinais especiais</strong> — っ (pausa), ー (vogal longa).
          </li>
          <li>
            <strong>Katakana</strong> — repita todos os passos acima, agora com os desenhos
            angulosos.
          </li>
        </ol>
        <GrammarTable
          headers={['Preciso escrever...', 'Use']}
          jpCols={[1]}
          rows={[
            ['palavra japonesa comum', 'hiragana'],
            ['palavra estrangeira ou nome de fora', 'katakana'],
            ['som "g, z, d, b"', 'kana + dakuten (゛)'],
            ['som "p"', 'kana + handakuten (゜)'],
            ['som "kya, sha, cho"...', 'yōon (kana + ゃ/ゅ/ょ pequeno)'],
            ['consoante dobrada (pausa)', 'っ pequeno'],
            ['vogal longa (em katakana)', 'traço ー'],
          ]}
        />
      </Section>
    </div>
  );
}
