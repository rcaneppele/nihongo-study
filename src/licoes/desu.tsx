import { Section, Ex, Note, GrammarTable, ReadingKey } from '../components/Licao';
import type { QuizLicao } from '../data/quiz/types';

export const meta = {
  id: 'desu',
  title: 'Usos do desu です',
  subtitle: 'Presente, passado, afirmativo e negativo',
  emoji: '🟰',
  tags: ['gramática', 'n5'],
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
  ],
};

export default function Desu() {
  return (
    <div className="space-y-10">
      <Section title="Como ler esta lição">
        <p className="text-sm leading-relaxed text-ink">
          Como em todas as lições, o japonês aparece em hiragana + romaji, sem kanji.
        </p>
        <ReadingKey
          lines={[
            { text: 'です', desc: 'hiragana' },
            { text: 'desu', desc: 'romaji' },
            { text: 'é / são (educado)', desc: 'significado' },
          ]}
        />
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
      </Section>

      <Section title="Presente negativo">
        <p className="text-sm leading-relaxed text-ink">
          Para negar, です some e entra <span className="font-jp">ではありません</span> (ou sua
          contração falada <span className="font-jp">じゃありません</span>) na trilha educada, ou{' '}
          <span className="font-jp">ではない</span> / <span className="font-jp">じゃない</span> na
          trilha casual.
        </p>
        <GrammarTable
          headers={['Trilha', 'Formas', 'Exemplo']}
          jpCols={[1, 2]}
          rows={[
            ['Educada', 'ではありません / じゃありません', 'せんせいではありません'],
            ['Casual', 'ではない / じゃない', 'せんせいじゃない'],
          ]}
        />
        <Ex
          jp="わたしはにほんじんではありません。"
          romaji="watashi wa nihonjin dewa arimasen."
          pt="Eu não sou japonês."
        />
        <Ex
          jp="わたしはがくせいじゃない。"
          romaji="watashi wa gakusei janai."
          pt="Eu não sou estudante."
          notes="forma casual, entre amigos e família"
        />
        <Note>
          <strong>じゃ é uma contração de では.</strong> As duas formas significam o mesmo;{' '}
          <span className="font-jp">では</span> é um pouco mais formal/escrito, e{' '}
          <span className="font-jp">じゃ</span> é a forma mais comum na fala do dia a dia — mesmo
          em contextos educados (<span className="font-jp">じゃありません</span> é perfeitamente
          educado).
        </Note>
      </Section>

      <Section title="Passado afirmativo — でした">
        <p className="text-sm leading-relaxed text-ink">
          Para o passado educado, です vira <span className="font-jp">でした</span>. Na trilha
          casual, vira <span className="font-jp">だった</span>.
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
      </Section>

      <Section title="Passado negativo">
        <p className="text-sm leading-relaxed text-ink">
          O passado negativo junta as duas ideias anteriores: nega e coloca no passado ao mesmo
          tempo.
        </p>
        <GrammarTable
          headers={['Trilha', 'Formas', 'Exemplo']}
          jpCols={[1, 2]}
          rows={[
            [
              'Educada',
              'ではありませんでした / じゃありませんでした',
              'がくせいではありませんでした',
            ],
            ['Casual', 'ではなかった / じゃなかった', 'がくせいじゃなかった'],
          ]}
        />
        <Ex
          jp="わたしはがくせいではありませんでした。"
          romaji="watashi wa gakusei dewa arimasen deshita."
          pt="Eu não era estudante."
        />
        <Ex
          jp="きのうはあめじゃなかった。"
          romaji="kinou wa ame janakatta."
          pt="Ontem não choveu."
          notes="lit. 'ontem não foi chuva' — あめ (chuva) como substantivo + です. Forma casual do passado negativo"
        />
      </Section>

      <Section title="Tabela de referência rápida">
        <GrammarTable
          headers={['', 'Educada', 'Casual']}
          jpCols={[1, 2]}
          rows={[
            ['Presente afirmativo', 'です', '(sem です)'],
            ['Presente negativo', 'ではありません / じゃありません', 'ではない / じゃない'],
            ['Passado afirmativo', 'でした', 'だった'],
            [
              'Passado negativo',
              'ではありませんでした / じゃありませんでした',
              'ではなかった / じゃなかった',
            ],
          ]}
        />
        <Note>
          Na trilha casual afirmativa, o mais comum é <strong>omitir</strong> です por completo:{' '}
          <span className="font-jp">たなかさんはせんせい</span> já basta. Existe uma forma casual
          explícita (<span className="font-jp">だ</span>), mas ela soa direta/dura — evite por
          enquanto.
        </Note>
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
          ]}
        />
      </Section>

      <Section title="Resumo">
        <p className="text-sm leading-relaxed text-ink">
          です liga o sujeito a um substantivo ou adjetivo -な, e muda em duas dimensões: tempo
          (presente/passado) e afirmação (positivo/negativo).
        </p>
        <GrammarTable
          headers={['', 'Afirmativo', 'Negativo']}
          jpCols={[1, 2]}
          rows={[
            ['Presente', 'です', 'ではありません / じゃない'],
            ['Passado', 'でした', 'ではありませんでした / じゃなかった'],
          ]}
        />
        <p className="text-sm leading-relaxed text-ink">
          じゃ é sempre a contração falada de では — as duas formas coexistem, e じゃ é a mais
          comum no dia a dia.
        </p>
      </Section>
    </div>
  );
}
