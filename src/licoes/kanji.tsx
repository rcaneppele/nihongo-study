import { Section, Ex, Note, GrammarTable, ReadingKey } from '../components/Licao';
import type { QuizLicao } from '../data/quiz/types';

export const meta = {
  id: 'kanji',
  title: 'Kanji — Primeiros Passos',
  subtitle: 'O terceiro sistema de escrita: como ele funciona e os kanji dos números',
  emoji: '🔢',
  tags: ['escrita', 'kanji', 'n5'],
};

export const quiz: QuizLicao = {
  frases: [
    {
      id: 'kanji-f1',
      tokens: [
        { texto: 'りんご', romaji: 'ringo' },
        { texto: 'を', romaji: 'o', particula: true },
        { texto: 'ひとつ', romaji: 'hitotsu' },
        { texto: 'ください', romaji: 'kudasai' },
      ],
      pt: 'Me dá uma maçã, por favor.',
    },
    {
      id: 'kanji-f2',
      tokens: [
        { texto: 'コーヒー', romaji: 'koohii' },
        { texto: 'を', romaji: 'o', particula: true },
        { texto: 'ふたつ', romaji: 'futatsu' },
        { texto: 'おねがいします', romaji: 'onegaishimasu' },
      ],
      pt: 'Dois cafés, por favor.',
    },
    {
      id: 'kanji-f3',
      tokens: [
        { texto: 'なんばん', romaji: 'nanban' },
        { texto: 'の', romaji: 'no', particula: true },
        { texto: 'バス', romaji: 'basu' },
        { texto: 'です', romaji: 'desu' },
        { texto: 'か', romaji: 'ka' },
      ],
      pt: 'Qual é o número do ônibus?',
    },
    {
      id: 'kanji-f4',
      tokens: [
        { texto: 'ろくばん', romaji: 'rokuban' },
        { texto: 'の', romaji: 'no', particula: true },
        { texto: 'バス', romaji: 'basu' },
        { texto: 'です', romaji: 'desu' },
      ],
      pt: 'É o ônibus número 6.',
    },
    {
      id: 'kanji-f5',
      tokens: [
        { texto: 'おいくつ', romaji: 'oikutsu' },
        { texto: 'です', romaji: 'desu' },
        { texto: 'か', romaji: 'ka' },
      ],
      pt: 'Quantos anos você tem? (educado)',
    },
    {
      id: 'kanji-f6',
      tokens: [
        { texto: 'じゅういっさい', romaji: 'juuissai' },
        { texto: 'です', romaji: 'desu' },
      ],
      pt: 'Tenho onze anos.',
    },
  ],
  perguntas: [
    {
      id: 'kanji-sig1',
      tipo: 'significado',
      pergunta: 'O que é a leitura くんよみ (kun\'yomi) de um kanji?',
      alternativas: [
        'a leitura japonesa nativa, que já existia antes do kanji chegar da China',
        'a leitura que se aproxima da pronúncia chinesa original',
        'o nome do radical do kanji',
        'a forma cursiva do kanji',
      ],
      correta: 0,
    },
    {
      id: 'kanji-sig2',
      tipo: 'significado',
      pergunta: 'Qual leitura de 四 (4) é mais usada no dia a dia, para evitar confusão com a palavra "morte" (し)?',
      alternativas: ['よん (yon)', 'し (shi)', 'なな (nana)', 'く (ku)'],
      correta: 0,
    },
    {
      id: 'kanji-sig3',
      tipo: 'significado',
      pergunta: 'Qual leitura de 七 (7) é mais usada ao ditar números em voz alta, para não confundir com いち (1)?',
      alternativas: ['なな (nana)', 'しち (shichi)', 'よん (yon)', 'きゅう (kyuu)'],
      correta: 0,
    },
    {
      id: 'kanji-vf1',
      tipo: 'verdadeiro-falso',
      afirmacao: 'O kanji de 10 (十) se lê "とおつ" ao contar objetos um por um.',
      correta: false,
      explicacao: 'É exceção: lê-se só とお, sem o sufixo つ. Todos os outros números de 1 a 9 levam つ nessa contagem.',
    },
    {
      id: 'kanji-vf2',
      tipo: 'verdadeiro-falso',
      afirmacao: 'Escrever kun\'yomi em hiragana e on\'yomi em katakana é como o kanji normalmente aparece em textos japoneses do dia a dia.',
      correta: false,
      explicacao: 'É uma convenção de dicionário e material de estudo, para diferenciar as duas leituras. No dia a dia, kanji aparece sozinho ou com furigana pequeno ao lado, não em katakana.',
    },
    {
      id: 'kanji-sig4',
      tipo: 'significado',
      pergunta: 'Por que alguns hotéis e hospitais no Japão evitam o quarto ou andar número 4?',
      alternativas: [
        'porque し, a leitura de 4, soa igual à palavra "morte" (死)',
        'por uma lei nacional que proíbe o número 4 em prédios',
        'porque o kanji de 4 é considerado incompleto',
        'não há motivo, é só coincidência sem relação com a língua',
      ],
      correta: 0,
    },
    {
      id: 'kanji-sig5',
      tipo: 'significado',
      pergunta: 'Como se forma o número 11 (十一) a partir dos kanji de 10 e 1?',
      alternativas: [
        'じゅう (10) + いち (1) = じゅういち',
        'いち (1) + じゅう (10) = いちじゅう',
        'とお (10) + ひとつ (1) = とおひとつ',
        'じゅう sozinho já significa 11',
      ],
      correta: 0,
    },
    {
      id: 'kanji-vf3',
      tipo: 'verdadeiro-falso',
      afirmacao: 'A contagem genérica com つ (ひとつ, ふたつ...) funciona para qualquer quantidade, inclusive acima de 20.',
      correta: false,
      explicacao: 'Esse sistema só vai até とお (10). Para contar acima disso, usa-se a leitura on\'yomi combinada com um contador específico — assunto de uma lição futura.',
    },
    {
      id: 'kanji-vf4',
      tipo: 'verdadeiro-falso',
      afirmacao: '九 (9) tem duas leituras comuns de origem chinesa, く e きゅう, e きゅう é a mais usada hoje em dia para contar idade, por exemplo.',
      correta: true,
    },
  ],
};

export default function Kanji() {
  return (
    <div className="space-y-10">
      <Section title="Como ler esta lição">
        <p className="text-sm leading-relaxed text-ink">Cada kanji aparece assim:</p>
        <ReadingKey
          lines={[
            { text: '一', desc: 'o kanji' },
            { text: 'ひとつ', desc: 'leitura kun\'yomi — japonesa, escrita em hiragana' },
            { text: 'イチ', desc: 'leitura on\'yomi — de origem chinesa, escrita em katakana' },
            { text: 'ichi', desc: 'romaji (da leitura on\'yomi, quando houver mais de uma)' },
            { text: 'um', desc: 'significado' },
          ]}
        />
        <p className="text-sm leading-relaxed text-ink">
          Separar kun'yomi em hiragana e on'yomi em katakana é só uma convenção de estudo — no
          texto japonês real, o kanji aparece sozinho ou com um furigana pequeno do lado, nunca em
          katakana. Aqui essa separação existe só para deixar claro, enquanto você estuda, qual
          leitura é qual.
        </p>
        <Note>
          Diferente das outras lições deste app, aqui o <strong>kanji é o que você está aprendendo
          ativamente</strong> — vale prestar atenção nele, não ignorá-lo. Ainda assim, as frases de
          exemplo (<span className="font-jp">Ex</span>) continuam só em hiragana/katakana com
          romaji: você está vendo o kanji isolado, nas tabelas, antes de vê-lo dentro de frases
          corridas.
        </Note>
      </Section>

      <Section title="Objetivos desta lição">
        <p className="text-sm leading-relaxed text-ink">Ao final, você deve saber:</p>
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink">
          <li>Explicar o que é kanji e por que ele tem duas famílias de leitura, kun'yomi e on'yomi.</li>
          <li>Reconhecer de vista os kanji dos números de 1 a 10.</li>
          <li>
            Diferenciar contar objetos genericamente (<span className="font-jp">ひとつ</span>,{' '}
            <span className="font-jp">ふたつ</span>...) de ler números como dígitos (
            <span className="font-jp">いち</span>, <span className="font-jp">に</span>...).
          </li>
          <li>Saber quais leituras alternativas (4, 7, 9) são as mais naturais no dia a dia.</li>
          <li>Entender por que japoneses evitam certos números em determinadas situações.</li>
        </ul>
        <Note>
          Fora do escopo desta lição: o sistema completo de radicais para consulta em dicionário,
          prática detalhada de ordem de traço, como contar acima de 10, contadores específicos
          (para objetos compridos, chatos, animais...) e como ler datas, meses ou preços. Esses
          temas ficam para lições futuras, conforme o curso avança — aqui o objetivo é só a base
          que a primeira aula do sensei cobriu.
        </Note>
      </Section>

      <Section title="O que é kanji, afinal?">
        <p className="text-sm leading-relaxed text-ink">
          Hiragana e katakana (lição Kana) são <strong>fonéticos</strong>: cada caractere representa
          só um som, sem significado próprio. Kanji é diferente — é um{' '}
          <strong>ideograma</strong>, importado da China junto com a escrita: cada caractere carrega
          um significado inteiro, além de um ou mais sons. O kanji{' '}
          <span className="font-jp text-base">一</span>, por exemplo, não é só o som "ichi" — ele
          já significa "um".
        </p>
        <p className="text-sm leading-relaxed text-ink">
          Na escrita japonesa, os três sistemas trabalham juntos, cada um com seu papel: kanji entra
          nas partes de conteúdo da frase (substantivos, a raiz de verbos e adjetivos); hiragana
          entra nas partículas e terminações gramaticais; katakana entra em palavras estrangeiras.
          Um texto japonês real mistura os três na mesma frase — não é "ou kanji ou kana", é sempre
          os dois juntos.
        </p>
        <Note>
          Kanji também é organizado, em dicionários, por peças menores chamadas{' '}
          <strong>radicais</strong> (<span className="font-jp">ぶしゅ</span>, <em>bushu</em>) — um
          radical se repete em vários kanji diferentes e ajuda a procurar um kanji desconhecido pela
          forma. <span className="font-jp text-base">一</span> é, ele mesmo, o radical número 1 da
          lista tradicional. Não precisa decorar o sistema de radicais agora — só vale saber que ele
          existe, porque um material de estudo pode citar "radical nº X" ao lado de um kanji.
        </Note>
        <Note>
          <strong>Aprofundamento:</strong> a ordem em que se traça um kanji (
          <span className="font-jp">ひつじゅん</span>, <em>hitsujun</em>) segue algumas regras
          gerais: de cima para baixo, da esquerda para a direita, e o traço horizontal antes do
          vertical quando os dois se cruzam. Isso importa para escrever com legibilidade e rapidez à
          mão — mas nesta lição o foco é reconhecer o kanji, não treinar o traço.
        </Note>
      </Section>

      <Section title="As duas leituras: kun'yomi e on'yomi">
        <p className="text-sm leading-relaxed text-ink">
          Quase todo kanji tem pelo menos duas leituras possíveis, e escolher a errada muda a
          palavra inteira.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          <strong>Kun'yomi</strong> (<span className="font-jp">くんよみ</span>) é a leitura
          japonesa: a palavra que os japoneses já falavam antes do kanji chegar da China, e que
          passou a ser escrita com aquele caractere por causa do significado.{' '}
          <strong>On'yomi</strong> (<span className="font-jp">おんよみ</span>) é uma aproximação da
          pronúncia chinesa da época em que aquele kanji foi importado — por isso costuma soar mais
          curta e "diferente" do resto do vocabulário japonês nativo.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          Existe uma regra prática, útil no começo mas com exceções: um kanji <strong>sozinho</strong>{' '}
          (às vezes com hiragana grudado depois) tende a puxar o kun'yomi; um kanji dentro de uma{' '}
          <strong>palavra composta de dois ou mais kanji</strong> tende a puxar o on'yomi. É esse
          segundo caso que faz{' '}
          <span className="font-jp text-base">十</span> (10) e{' '}
          <span className="font-jp text-base">一</span> (1) se combinarem como{' '}
          <span className="font-jp text-base">十一</span>,{' '}
          <span className="font-jp">じゅういち</span> (11) — dois on'yomi grudados formando um
          número novo.
        </p>
        <Note>
          <strong>Armadilha:</strong> a regra acima não é absoluta, e os próprios números têm uma
          exceção conhecida: no dia a dia, prefere-se{' '}
          <span className="font-jp">よん</span> a <span className="font-jp">し</span> para 4, e{' '}
          <span className="font-jp">なな</span> a <span className="font-jp">しち</span> para 7 —
          isso vale mesmo lendo dígitos soltos, situação em que normalmente se esperaria on'yomi. O
          motivo está na próxima seção.
        </Note>
      </Section>

      <Section title="Os kanji dos números de 1 a 10">
        <p className="text-sm leading-relaxed text-ink">
          Esses são os primeiros dez kanji que a maioria dos cursos ensina, porque aparecem em toda
          parte — preço, hora, endereço, quantidade — e porque o próprio traço deles é simples.
        </p>
        <GrammarTable
          headers={['Nº', 'Kanji', 'On\'yomi', 'Romaji', 'Contagem (kun\'yomi + つ)', 'Romaji']}
          jpCols={[1, 2, 4]}
          rows={[
            ['1', '一', 'いち', 'ichi', 'ひとつ', 'hitotsu'],
            ['2', '二', 'に', 'ni', 'ふたつ', 'futatsu'],
            ['3', '三', 'さん', 'san', 'みっつ', 'mittsu'],
            ['4', '四', 'し・よん', 'shi / yon', 'よっつ', 'yottsu'],
            ['5', '五', 'ご', 'go', 'いつつ', 'itsutsu'],
            ['6', '六', 'ろく', 'roku', 'むっつ', 'muttsu'],
            ['7', '七', 'しち・なな', 'shichi / nana', 'ななつ', 'nanatsu'],
            ['8', '八', 'はち', 'hachi', 'やっつ', 'yattsu'],
            ['9', '九', 'く・きゅう', 'ku / kyuu', 'ここのつ', 'kokonotsu'],
            ['10', '十', 'じゅう', 'juu', 'とお', 'too'],
          ]}
        />
        <Note>
          Repare em três irregularidades que valem menção explícita, porque são as que mais confundem
          quem está começando:
        </Note>
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink">
          <li>
            <strong className="font-jp">四</strong> tem duas leituras concorrentes:{' '}
            <span className="font-jp">し</span> (shi) e <span className="font-jp">よん</span> (yon).
            No dia a dia, japoneses preferem <span className="font-jp">よん</span>, porque{' '}
            <span className="font-jp">し</span> tem o mesmo som da palavra "morte" (
            <span className="font-jp">死</span>).
          </li>
          <li>
            <strong className="font-jp">七</strong> também tem duas:{' '}
            <span className="font-jp">しち</span> (shichi) e{' '}
            <span className="font-jp">なな</span> (nana). Ao ditar números em voz alta,{' '}
            <span className="font-jp">なな</span> é a preferida, porque{' '}
            <span className="font-jp">しち</span> se confunde facilmente com{' '}
            <span className="font-jp">いち</span> (1) ao telefone.
          </li>
          <li>
            <strong className="font-jp">十</strong>, na coluna de contagem, é{' '}
            <span className="font-jp">とお</span> — sem o sufixo{' '}
            <span className="font-jp">つ</span> que todos os outros números de 1 a 9 levam. É a
            única exceção da tabela, e é irregular mesmo: não tem explicação além de "decore assim".
          </li>
        </ul>
        <Note>
          <strong>Aprofundamento:</strong> a contagem com{' '}
          <span className="font-jp">つ</span> só existe de 1 a 10 — não há{' '}
          <span className="font-jp">じゅういちつ</span> para "11 objetos". A partir de 11, conta-se
          com a leitura on'yomi combinada a um contador específico (
          <span className="font-jp">こ</span>, <span className="font-jp">ほん</span>,{' '}
          <span className="font-jp">まい</span>...), que muda conforme o formato do objeto — assunto
          de uma lição futura, quando o curso chegar lá.
        </Note>
      </Section>

      <Section title="Contar objetos vs. ler números">
        <p className="text-sm leading-relaxed text-ink">
          Na prática, essa escolha de leitura vira uma decisão o tempo todo: você está contando
          quantas coisas tem na mão, ou está lendo um número como identificador (idade, número de
          ônibus, código)? A primeira situação pede kun'yomi com{' '}
          <span className="font-jp">つ</span>; a segunda pede on'yomi puro, muitas vezes combinando
          dois números como você acabou de ver em 11.
        </p>
        <Ex
          jp="りんごをひとつください。"
          romaji="ringo o hitotsu kudasai."
          pt="Me dá uma maçã, por favor."
          notes="contando um item físico — kun'yomi + つ. Situação real: quitanda, feira, conbini."
        />
        <Ex
          jp="コーヒーをふたつおねがいします。"
          romaji="koohii o futatsu onegaishimasu."
          pt="Dois cafés, por favor."
          notes="mesmo padrão de contagem, registro um pouco mais educado (おねがいします em vez de ください) — comum em cafeteria."
        />
        <Ex jp="なんばんのバスですか？" romaji="nanban no basu desu ka?" pt="Qual é o número do ônibus?" notes="pergunta sobre um número-identificador." />
        <Ex
          jp="ろくばんのバスです。"
          romaji="rokuban no basu desu."
          pt="É o ônibus número 6."
          notes="resposta com on'yomi puro (ろく) — não é quantidade, é um rótulo. Situação real: ponto de ônibus, estação."
        />
        <Ex
          jp="おいくつですか？"
          romaji="oikutsu desu ka?"
          pt="Quantos anos você tem? (educado)"
          notes="pergunta comum ao conhecer alguém."
        />
        <Ex
          jp="じゅういっさいです。"
          romaji="juuissai desu."
          pt="Tenho onze anos."
          notes="十一 (じゅういち) + さい (idade) vira じゅういっさい — on'yomi combinado, exatamente como em 十一 sozinho."
        />
      </Section>

      <Section title="Erros comuns">
        <GrammarTable
          headers={['Erro', 'Incorreto', 'Correto', 'Por quê']}
          jpCols={[1, 2]}
          rows={[
            [
              'Ditar 4 ou 7 com a leitura "de dicionário"',
              'し, しち (ao falar um número de telefone ou código)',
              'よん, なな',
              'し soa igual a "morte"; しち se confunde com いち ao telefone. よん/なな evitam os dois problemas.',
            ],
            [
              'Colocar つ em todos os números da contagem',
              'とおつ (para 10 objetos)',
              'とお',
              '十 é a única exceção: na contagem de 1 a 10, só ele não leva つ.',
            ],
            [
              'Misturar kun\'yomi e on\'yomi dentro da mesma palavra',
              '"ichi-tsu" para "um objeto"',
              'ひとつ (hitotsu)',
              'A contagem com つ usa kun\'yomi do início ao fim; misturar com on\'yomi não existe em japonês.',
            ],
            [
              'Achar que く é sempre a leitura de 9',
              'く-さい (tentando dizer "9 anos")',
              'きゅうさい',
              'きゅう é a leitura mais usada hoje para idade, preço e contagem em geral; く aparece mais em palavras fixas.',
            ],
          ]}
        />
      </Section>

      <Section title="Nota cultural: números que se evita">
        <p className="text-sm leading-relaxed text-ink">
          A preferência por <span className="font-jp">よん</span> e{' '}
          <span className="font-jp">なな</span> não é só uma questão de clareza ao telefone — ela
          também é superstição. Como <span className="font-jp">し</span> (4) soa igual a "morte" (
          <span className="font-jp">死</span>) e <span className="font-jp">く</span> (9) soa igual a
          "sofrimento" (<span className="font-jp">苦</span>), muitos hospitais e hotéis no Japão
          pulam o quarto ou andar de número 4 e 9 — do mesmo jeito que prédios ocidentais às vezes
          pulam o 13º andar. Presentes também costumam evitar vir em conjuntos de 4 ou 9 peças.
        </p>
        <Note>
          Isso muda uma escolha prática: se você for escolher a quantidade de algo para presentear
          alguém no Japão (doces, toalhas, copos), evite conjuntos de 4 ou 9 — prefira 3, 5 ou um
          número par "neutro" como 6 ou 8.
        </Note>
      </Section>

      <Section title="Resumo rápido">
        <GrammarTable
          headers={['Nº', 'Kanji', 'On\'yomi mais usado', 'Contagem (つ)']}
          jpCols={[1, 2, 3]}
          rows={[
            ['1', '一', 'いち', 'ひとつ'],
            ['2', '二', 'に', 'ふたつ'],
            ['3', '三', 'さん', 'みっつ'],
            ['4', '四', 'よん', 'よっつ'],
            ['5', '五', 'ご', 'いつつ'],
            ['6', '六', 'ろく', 'むっつ'],
            ['7', '七', 'なな', 'ななつ'],
            ['8', '八', 'はち', 'やっつ'],
            ['9', '九', 'きゅう', 'ここのつ'],
            ['10', '十', 'じゅう', 'とお'],
          ]}
        />
        <p className="text-sm leading-relaxed text-ink">
          Regra prática para o dia a dia: contando objetos genericamente (até 10), use kun'yomi +{' '}
          <span className="font-jp">つ</span>. Lendo números como identificador (idade, código,
          número de algo), use on'yomi — preferindo{' '}
          <span className="font-jp">よん</span> e <span className="font-jp">なな</span> a{' '}
          <span className="font-jp">し</span> e <span className="font-jp">しち</span>.
        </p>
      </Section>
    </div>
  );
}
