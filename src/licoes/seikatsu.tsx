import { Section, Ex, Note, GrammarTable, ReadingKey } from '../components/Licao';
import Furigana, { FuriganaWord } from '../components/Furigana';
import type { QuizLicao } from '../data/quiz/types';
import type { GrupoKakitori } from '../data/kakitori/types';

export const meta = {
  id: 'seikatsu',
  title: 'Vida cotidiana',
  subtitle: 'せいかつ — rotina, horários e frequência',
  emoji: '⏰',
  tags: ['conversa', 'n5'],
};

export const quiz: QuizLicao = {
  frases: [
    {
      id: 'seikatsu-f1',
      tokens: [
        { texto: 'まいあさ', romaji: 'maiasa' },
        { texto: 'ろくじ', romaji: 'roku-ji' },
        { texto: 'に', romaji: 'ni', particula: true },
        { texto: 'おきます', romaji: 'okimasu' },
      ],
      pt: 'Acordo às seis horas toda manhã.',
    },
    {
      id: 'seikatsu-f2',
      tokens: [
        { texto: 'いつも', romaji: 'itsumo' },
        { texto: 'でんしゃ', romaji: 'densha' },
        { texto: 'で', romaji: 'de', particula: true },
        { texto: 'かいしゃ', romaji: 'kaisha' },
        { texto: 'に', romaji: 'ni' },
        { texto: 'いきます', romaji: 'ikimasu' },
      ],
      pt: 'Sempre vou para a empresa de trem.',
    },
    {
      id: 'seikatsu-f3',
      tokens: [
        { texto: 'くじ', romaji: 'ku-ji' },
        { texto: 'から', romaji: 'kara', particula: true },
        { texto: 'ろくじ', romaji: 'roku-ji' },
        { texto: 'まで', romaji: 'made' },
        { texto: 'はたらきます', romaji: 'hatarakimasu' },
      ],
      pt: 'Trabalho das nove às seis.',
    },
    {
      id: 'seikatsu-f4',
      tokens: [
        { texto: 'よる', romaji: 'yoru' },
        { texto: 'は', romaji: 'wa' },
        { texto: 'よく', romaji: 'yoku' },
        { texto: 'ドラマ', romaji: 'dorama' },
        { texto: 'を', romaji: 'o', particula: true },
        { texto: 'みます', romaji: 'mimasu' },
      ],
      pt: 'À noite, assisto séries com frequência.',
    },
    {
      id: 'seikatsu-f5',
      tokens: [
        { texto: 'コーヒー', romaji: 'koohii' },
        { texto: 'は', romaji: 'wa', particula: true },
        { texto: 'あまり', romaji: 'amari' },
        { texto: 'のみません', romaji: 'nomimasen' },
      ],
      pt: 'Não bebo muito café.',
    },
    {
      id: 'seikatsu-f6',
      tokens: [
        { texto: 'あさごはん', romaji: 'asagohan' },
        { texto: 'は', romaji: 'wa', particula: true },
        { texto: 'ぜんぜん', romaji: 'zenzen' },
        { texto: 'たべません', romaji: 'tabemasen' },
      ],
      pt: 'Nunca tomo café da manhã.',
    },
    {
      id: 'seikatsu-f7',
      tokens: [
        { texto: 'しゅうまつ', romaji: 'shuumatsu' },
        { texto: 'は', romaji: 'wa' },
        { texto: 'ときどき', romaji: 'tokidoki' },
        { texto: 'ジム', romaji: 'jimu' },
        { texto: 'で', romaji: 'de', particula: true },
        { texto: 'うんどうします', romaji: 'undou shimasu' },
      ],
      pt: 'No fim de semana, às vezes faço exercício na academia.',
    },
    {
      id: 'seikatsu-f8',
      tokens: [
        { texto: 'きのう', romaji: 'kinou' },
        { texto: 'は', romaji: 'wa' },
        { texto: 'じゅうにじ', romaji: 'juuni-ji' },
        { texto: 'ごろ', romaji: 'goro', particula: true },
        { texto: 'ねました', romaji: 'nemashita' },
      ],
      pt: 'Ontem dormi por volta da meia-noite.',
    },
    {
      id: 'seikatsu-f9',
      tokens: [
        { texto: 'よる', romaji: 'yoru' },
        { texto: 'おふろ', romaji: 'o-furo' },
        { texto: 'に', romaji: 'ni', particula: true },
        { texto: 'はいります', romaji: 'hairimasu' },
      ],
      pt: 'Tomo banho (de banheira) à noite.',
    },
    {
      id: 'seikatsu-f10',
      tokens: [
        { texto: 'しちじはん', romaji: 'shichi-ji han' },
        { texto: 'に', romaji: 'ni' },
        { texto: 'いえ', romaji: 'ie' },
        { texto: 'を', romaji: 'o', particula: true },
        { texto: 'でます', romaji: 'demasu' },
      ],
      pt: 'Saio de casa às sete e meia.',
    },
    {
      id: 'seikatsu-f11',
      tokens: [
        { texto: 'きのう', romaji: 'kinou' },
        { texto: 'は', romaji: 'wa', particula: true },
        { texto: 'あまり', romaji: 'amari' },
        { texto: 'べんきょうしませんでした', romaji: 'benkyou shimasen deshita' },
      ],
      pt: 'Ontem não estudei muito.',
    },
    {
      id: 'seikatsu-f12',
      tokens: [
        { texto: 'どうりょう', romaji: 'douryou' },
        { texto: 'と', romaji: 'to', particula: true },
        { texto: 'ひるごはん', romaji: 'hirugohan' },
        { texto: 'を', romaji: 'o' },
        { texto: 'たべます', romaji: 'tabemasu' },
      ],
      pt: 'Almoço com os colegas de trabalho.',
    },
  ],
  perguntas: [
    {
      id: 'seikatsu-sig1',
      tipo: 'significado',
      pergunta: 'Como se diz "quatro horas" (no relógio)?',
      alternativas: ['よじ', 'よんじ', 'しじ', 'よっじ'],
      correta: 0,
      explicacao: 'Com o contador じ, o 4 vira よ: よじ. É uma das três leituras irregulares das horas (junto com しちじ e くじ).',
    },
    {
      id: 'seikatsu-sig2',
      tipo: 'significado',
      pergunta: 'Como se diz "nove horas" (no relógio)?',
      alternativas: ['くじ', 'きゅうじ', 'くうじ', 'きゅじ'],
      correta: 0,
      explicacao: 'Nas horas, o 9 é sempre く: くじ. きゅうじ não se usa para dizer as horas.',
    },
    {
      id: 'seikatsu-sig3',
      tipo: 'significado',
      pergunta: 'Como se diz "dez minutos"?',
      alternativas: ['じゅっぷん', 'じゅうふん', 'じゅぷん', 'とおふん'],
      correta: 0,
      explicacao: 'Com 1, 3, 4, 6, 8 e 10, o contador de minutos vira ぷん; com 1, 6, 8 e 10 o número ainda ganha っ: じゅっぷん (também じっぷん).',
    },
    {
      id: 'seikatsu-sig4',
      tipo: 'significado',
      pergunta: 'Complete: コーヒーはあまり ___。 ("Não bebo muito café.")',
      alternativas: ['のみません', 'のみます', 'のみましょう', 'のむ'],
      correta: 0,
      explicacao: 'あまり (no sentido de "não muito") sempre pede o verbo na negativa. A negação fica no verbo, não no advérbio.',
    },
    {
      id: 'seikatsu-sig5',
      tipo: 'significado',
      pergunta: 'Qual palavra significa "às vezes"?',
      alternativas: ['ときどき', 'いつも', 'よく', 'ぜんぜん'],
      correta: 0,
    },
    {
      id: 'seikatsu-sig6',
      tipo: 'significado',
      pergunta: 'Qual sequência vai do MAIS frequente para o MENOS frequente?',
      alternativas: [
        'いつも → よく → ときどき → あまり〜ない → ぜんぜん〜ない',
        'よく → いつも → ときどき → ぜんぜん〜ない → あまり〜ない',
        'ときどき → よく → いつも → あまり〜ない → ぜんぜん〜ない',
        'いつも → ときどき → よく → ぜんぜん〜ない → あまり〜ない',
      ],
      correta: 0,
    },
    {
      id: 'seikatsu-sig7',
      tipo: 'significado',
      pergunta: 'Como se diz "tomo café da manhã"?',
      alternativas: ['あさごはんをたべます', 'あさごはんをのみます', 'あさごはんをとります', 'あさごはんにはいります'],
      correta: 0,
      explicacao: 'O "tomar" do português não vira のむ aqui: refeição se come (たべる). のむ é só para o que se bebe — コーヒーをのみます.',
    },
    {
      id: 'seikatsu-sig8',
      tipo: 'significado',
      pergunta: 'Numa conversa, como dizer "às 17h" de forma natural?',
      alternativas: ['ごごごじに', 'ごごじゅうしちじに', 'ごぜんごじに', 'じゅうしちじはんに'],
      correta: 0,
      explicacao: 'ごご (tarde) vai com o relógio de 12 horas: ごごごじ. じゅうしちじ (relógio de 24h) também existe, mas nunca junto com ごご.',
    },
    {
      id: 'seikatsu-sig9',
      tipo: 'significado',
      pergunta: 'Qual a diferença entre いちじ e いちじかん?',
      alternativas: [
        'いちじ = uma hora (no relógio); いちじかん = uma hora de duração',
        'São sinônimos',
        'いちじ = uma hora de duração; いちじかん = uma hora (no relógio)',
        'いちじかん é a forma educada de いちじ',
      ],
      correta: 0,
    },
    {
      id: 'seikatsu-vf1',
      tipo: 'verdadeiro-falso',
      afirmacao: 'まいにちにおきます é a forma correta de dizer "acordo todo dia".',
      correta: false,
      explicacao: 'Palavras de tempo relativas (まいにち, あした, きのう, あさ) não levam に. O certo é まいにちおきます. Horário de relógio, sim: ろくじにおきます.',
    },
    {
      id: 'seikatsu-vf2',
      tipo: 'verdadeiro-falso',
      afirmacao: 'あまり e ぜんぜん só podem ser usados com verbos no passado.',
      correta: false,
      explicacao: 'Eles pedem verbo na NEGATIVA — presente (あまりのみません) ou passado (あまりのみませんでした).',
    },
    {
      id: 'seikatsu-vf3',
      tipo: 'verdadeiro-falso',
      afirmacao: 'でんしゃをのります é a forma correta de "pego o trem".',
      correta: false,
      explicacao: 'のる (embarcar) marca o veículo com に: でんしゃにのります.',
    },
    {
      id: 'seikatsu-vf4',
      tipo: 'verdadeiro-falso',
      afirmacao: 'Para a pergunta なんじにおきますか？, ろくじです。 é uma resposta natural.',
      correta: true,
      explicacao: 'Na resposta curta, です substitui o verbo inteiro — como "às seis" em português.',
    },
    {
      id: 'seikatsu-vf5',
      tipo: 'verdadeiro-falso',
      afirmacao: 'Em ゆうべはよくねました。, よく significa "bem": "Dormi bem ontem à noite."',
      correta: true,
      explicacao: 'よく significa "com frequência" e também "bem". Com ねる depende do contexto: falando de uma noite específica, よくねました é "dormi bem".',
    },
    {
      id: 'seikatsu-vf6',
      tipo: 'verdadeiro-falso',
      afirmacao: 'Ao terminar uma apresentação oral em japonês, いじょうです sinaliza que você acabou de falar.',
      correta: true,
    },
    {
      id: 'seikatsu-vf7',
      tipo: 'verdadeiro-falso',
      afirmacao: 'しちじにごろおきます é a forma de dizer "acordo por volta das sete".',
      correta: false,
      explicacao: 'ごろ vem colado à hora: しちじごろおきます (ou しちじごろにおきます). に antes de ごろ não existe.',
    },
    {
      id: 'seikatsu-vf8',
      tipo: 'verdadeiro-falso',
      afirmacao: 'Em おきて、シャワーをあびて、でかけました, as três ações estão no passado.',
      correta: true,
      explicacao: 'Numa sequência com a forma て, só o último verbo carrega o tempo — e ele vale para a sequência inteira.',
    },
  ],
};

export const kakitori: GrupoKakitori[] = [
  {
    id: 'seikatsu-rotina',
    label: 'Vida cotidiana — rotina',
    itens: [
      { id: 'seikatsu-k1', jp: 'まいあさろくじにおきます。', kana: 'まいあさろくじにおきます。', romaji: 'maiasa roku-ji ni okimasu.', pt: 'Acordo às seis toda manhã.' },
      { id: 'seikatsu-k2', jp: 'しちじはんにいえをでます。', kana: 'しちじはんにいえをでます。', romaji: 'shichi-ji han ni ie o demasu.', pt: 'Saio de casa às sete e meia.' },
      { id: 'seikatsu-k3', jp: 'でんしゃでかいしゃにいきます。', kana: 'でんしゃでかいしゃにいきます。', romaji: 'densha de kaisha ni ikimasu.', pt: 'Vou para a empresa de trem.' },
      { id: 'seikatsu-k4', jp: 'くじからろくじまではたらきます。', kana: 'くじからろくじまではたらきます。', romaji: 'ku-ji kara roku-ji made hatarakimasu.', pt: 'Trabalho das nove às seis.' },
      { id: 'seikatsu-k5', jp: 'じゅうにじごろひるごはんをたべます。', kana: 'じゅうにじごろひるごはんをたべます。', romaji: 'juuni-ji goro hirugohan o tabemasu.', pt: 'Almoço por volta do meio-dia.' },
      { id: 'seikatsu-k6', jp: 'ときどきジムでうんどうします。', kana: 'ときどきジムでうんどうします。', romaji: 'tokidoki jimu de undou shimasu.', pt: 'Às vezes faço exercício na academia.' },
      { id: 'seikatsu-k7', jp: 'よるはよくドラマをみます。', kana: 'よるはよくドラマをみます。', romaji: 'yoru wa yoku dorama o mimasu.', pt: 'À noite, assisto séries com frequência.' },
      { id: 'seikatsu-k8', jp: 'コーヒーはあまりのみません。', kana: 'コーヒーはあまりのみません。', romaji: 'koohii wa amari nomimasen.', pt: 'Não bebo muito café.' },
      { id: 'seikatsu-k9', jp: 'あさごはんはぜんぜんたべません。', kana: 'あさごはんはぜんぜんたべません。', romaji: 'asagohan wa zenzen tabemasen.', pt: 'Nunca tomo café da manhã.' },
      { id: 'seikatsu-k10', jp: 'じゅういちじごろおふろにはいります。', kana: 'じゅういちじごろおふろにはいります。', romaji: 'juuichi-ji goro o-furo ni hairimasu.', pt: 'Tomo banho por volta das onze.' },
      { id: 'seikatsu-k11', jp: 'なんじにねますか？', kana: 'なんじにねますか？', romaji: 'nan-ji ni nemasu ka?', pt: 'A que horas você dorme?' },
      { id: 'seikatsu-k12', jp: 'きのうはあまりねませんでした。', kana: 'きのうはあまりねませんでした。', romaji: 'kinou wa amari nemasen deshita.', pt: 'Ontem não dormi muito.' },
    ],
  },
];

/** Atalho local para a coluna de kanji de referência: `kj(['起', 'お'], 'きる')` → 起(お)きる. */
function kj(...parts: (string | [string, string])[]) {
  return (
    <Furigana
      segments={parts.map((p) => (typeof p === 'string' ? { text: p } : { text: p[0], reading: p[1] }))}
    />
  );
}

export default function Seikatsu() {
  return (
    <div className="space-y-10">
      <Section title="Como ler esta lição">
        <p className="text-sm leading-relaxed text-ink">
          Como nas outras lições, todo japonês aparece em kana + romaji + tradução. Horários e
          números aparecem por extenso em hiragana (<span className="font-jp">ろくじはん</span>, e
          não 6:30), porque o que você precisa aprender é justamente como eles{' '}
          <strong>soam</strong>.
        </p>
        <ReadingKey
          lines={[
            { text: 'ろくじはんにおきます', desc: 'hiragana' },
            { text: 'roku-ji han ni okimasu', desc: 'romaji' },
            { text: 'Acordo às seis e meia.', desc: 'significado' },
            { text: 'ジム', desc: 'katakana (palavras estrangeiras)' },
            { text: '〜じ / 〜ふん', desc: '〜 marca onde entra o número' },
            { text: '〈hora〉', desc: 'no roteiro: o que você troca pelo seu' },
          ]}
        />
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink">
          <li>
            No romaji, o hífen separa o número do contador:{' '}
            <em>roku-ji</em> (seis horas), <em>juugo-fun</em> (quinze minutos) — do mesmo jeito que
            separa o <em>-san</em> de <em>tanaka-san</em>.
          </li>
          <li>
            <strong className="font-jp">ん</strong> antes de <em>p</em> soa quase como "m":{' '}
            <span className="font-jp">さんぷん</span> (<em>san-pun</em>, três minutos) se diz
            "sampun". O romaji continua escrevendo <em>n</em>.
          </li>
          <li>
            <strong className="font-jp">は</strong> partícula lê-se <em>wa</em>, mas o{' '}
            <span className="font-jp">はん</span> de "meia hora" é <em>han</em> mesmo — não é
            partícula.
          </li>
        </ul>
        <p className="text-sm leading-relaxed text-ink">
          Nas tabelas de vocabulário há uma coluna "Kanji (furigana)" com a palavra como ela
          aparece escrita no Japão — por exemplo,{' '}
          <span className="font-jp text-base">
            <FuriganaWord kanji="生活" reading="せいかつ" />
          </span>
          , o nome desta lição. É só referência: pode ignorar o kanji por enquanto.
        </p>
      </Section>

      <Section title="Objetivos desta lição">
        <p className="text-sm leading-relaxed text-ink">
          O objetivo prático é um só: <strong>contar o seu dia em japonês</strong> — o que você
          faz, a que horas e com que frequência — e entender quando alguém conta o dia dele. Ao
          final, você deve saber:
        </p>
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink">
          <li>
            Dizer e perguntar qualquer horário (hora, minuto, "e meia", manhã/tarde), incluindo as
            leituras irregulares que todo iniciante erra: <span className="font-jp">よじ</span>,{' '}
            <span className="font-jp">しちじ</span>, <span className="font-jp">くじ</span> e os
            minutos em <span className="font-jp">ぷん</span>.
          </li>
          <li>
            Nomear as atividades de um dia comum com a partícula certa — inclusive as que não
            seguem a lógica do português (<span className="font-jp">でんしゃにのる</span>,{' '}
            <span className="font-jp">おふろにはいる</span>,{' '}
            <span className="font-jp">いえをでる</span>).
          </li>
          <li>
            Montar a frase de rotina na ordem natural (quando → que horas → onde → o quê → verbo)
            e saber quais palavras de tempo levam <span className="font-jp">に</span> e quais não.
          </li>
          <li>
            Dizer a frequência: <span className="font-jp">まいにち</span>,{' '}
            <span className="font-jp">いつも</span>, <span className="font-jp">よく</span> e{' '}
            <span className="font-jp">ときどき</span> com o verbo afirmativo;{' '}
            <span className="font-jp">あまり</span> e <span className="font-jp">ぜんぜん</span>{' '}
            com o verbo negativo — no presente e no passado.
          </li>
          <li>
            Encadear as ações do dia e contar o dia de ontem no passado, sem misturar os tempos.
          </li>
          <li>
            Perguntar e responder sobre a rotina de alguém, e fazer uma pequena apresentação oral
            "わたしのいちにち" (meu dia) do começo ao fim, com abertura e fechamento.
          </li>
        </ul>
        <p className="text-sm leading-relaxed text-ink">
          Fora do escopo: o "nunca" de experiência de vida ("nunca fui ao Japão", com{' '}
          <span className="font-jp">〜たことがない</span>), "antes de fazer / depois de fazer"
          com verbo (<span className="font-jp">〜まえに</span>,{' '}
          <span className="font-jp">〜たあとで</span>), dias da semana (na lição de Kanji) e datas.
          A conjugação dos verbos é a da lição de Verbos — aqui ela é só usada, não reexplicada.
        </p>
      </Section>

      <Section title="せいかつ — falar da própria rotina">
        <p className="text-sm leading-relaxed text-ink">
          <span className="font-jp">せいかつ</span> (<em>seikatsu</em>) é "vida" no sentido de
          modo de viver, dia a dia: <span className="font-jp">にほんのせいかつ</span> é "a vida no
          Japão", <span className="font-jp">まいにちのせいかつ</span> é "a vida de todo dia". Para
          falar do <strong>seu</strong> dia, porém, a expressão mais natural é{' '}
          <span className="font-jp">わたしのいちにち</span> (<em>watashi no ichinichi</em>, "o meu
          dia") — é o título típico desse tipo de apresentação em aula.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          Contar a rotina é um dos primeiros "textos longos" que um aluno produz, porque junta
          quase tudo o que veio antes: verbos no presente (hábito) e no passado, partículas de
          tempo e lugar, です em respostas curtas. E não é só exercício de sala: a mesma conversa
          acontece de verdade no Japão.
        </p>
        <Ex
          jp="なんじにおふろにはいりますか？"
          romaji="nan-ji ni o-furo ni hairimasu ka?"
          pt="A que horas você toma banho?"
          notes="numa homestay: a família combina a ordem do banho de todos — pergunta real na primeira noite"
        />
        <Ex
          jp="あさごはんはまいにちたべますか？"
          romaji="asagohan wa mainichi tabemasu ka?"
          pt="Você toma café da manhã todos os dias?"
          notes="numa consulta médica ou no questionário do check-up anual: hábitos de refeição e sono estão sempre lá"
        />
        <Ex
          jp="しゅうまつはなにをしますか？"
          romaji="shuumatsu wa nani o shimasu ka?"
          pt="O que você faz nos fins de semana?"
          notes="entre colegas de trabalho ou de turma — a conversa de rotina mais comum para se conhecer melhor"
        />
      </Section>

      <Section title="Dizer as horas — 〜じ, 〜ふん e はん">
        <p className="text-sm leading-relaxed text-ink">
          Hora no relógio = número + <span className="font-jp">じ</span> (<em>ji</em>); minutos =
          número + <span className="font-jp">ふん</span> ou <span className="font-jp">ぷん</span>{' '}
          (<em>fun/pun</em>); "e meia" = <span className="font-jp">はん</span> (<em>han</em>). A
          ordem é a do português: hora primeiro, minutos depois —{' '}
          <span className="font-jp">しちじじゅうごふん</span> (7h15).
        </p>
        <p className="text-sm leading-relaxed text-ink">
          Por que dedicar uma seção a isso, se os números você já conhece? Porque as leituras
          irregulares caem exatamente nos números mais usados: quem aprendeu a contar com{' '}
          <span className="font-jp">よん</span>, <span className="font-jp">なな</span> e{' '}
          <span className="font-jp">きゅう</span> tende a dizer "よんじ, ななじ, きゅうじ" — e
          as três estão fora do padrão. Vale decorar a tabela como ela é.
        </p>
        <GrammarTable
          headers={['Hora', 'Japonês', 'Romaji']}
          jpCols={[1]}
          rows={[
            ['1h', 'いちじ', 'ichi-ji'],
            ['2h', 'にじ', 'ni-ji'],
            ['3h', 'さんじ', 'san-ji'],
            [<strong>4h</strong>, <strong>よじ</strong>, <strong>yo-ji (não よんじ)</strong>],
            ['5h', 'ごじ', 'go-ji'],
            ['6h', 'ろくじ', 'roku-ji'],
            [<strong>7h</strong>, <strong>しちじ</strong>, <strong>shichi-ji (não ななじ)</strong>],
            ['8h', 'はちじ', 'hachi-ji'],
            [<strong>9h</strong>, <strong>くじ</strong>, <strong>ku-ji (não きゅうじ)</strong>],
            ['10h', 'じゅうじ', 'juu-ji'],
            ['11h', 'じゅういちじ', 'juuichi-ji'],
            ['12h', 'じゅうにじ', 'juuni-ji'],
            ['Que horas?', 'なんじ', 'nan-ji'],
          ]}
        />
        <p className="text-sm leading-relaxed text-ink">
          Nos minutos, o contador muda de som conforme o número: depois de 2, 5, 7 e 9 fica{' '}
          <span className="font-jp">ふん</span>; depois de 1, 3, 4, 6, 8 e 10 vira{' '}
          <span className="font-jp">ぷん</span> — e 1, 6, 8 e 10 ainda "engolem" o final com{' '}
          <span className="font-jp">っ</span>. Dezenas seguem a unidade: 20 é{' '}
          <span className="font-jp">にじゅっぷん</span>, 45 é{' '}
          <span className="font-jp">よんじゅうごふん</span>.
        </p>
        <GrammarTable
          headers={['Minutos', 'Japonês', 'Romaji']}
          jpCols={[1]}
          rows={[
            ['1', 'いっぷん', 'ip-pun'],
            ['2', 'にふん', 'ni-fun'],
            ['3', 'さんぷん', 'san-pun'],
            ['4', 'よんぷん', 'yon-pun'],
            ['5', 'ごふん', 'go-fun'],
            ['6', 'ろっぷん', 'rop-pun'],
            ['7', 'ななふん', 'nana-fun'],
            ['8', 'はっぷん (ou はちふん)', 'hap-pun (hachi-fun)'],
            ['9', 'きゅうふん', 'kyuu-fun'],
            ['10', 'じゅっぷん (ou じっぷん)', 'jup-pun (jip-pun)'],
            ['15', 'じゅうごふん', 'juugo-fun'],
            ['20', 'にじゅっぷん', 'nijup-pun'],
            ['30', 'さんじゅっぷん = はん', 'sanjup-pun = han'],
            ['Quantos minutos?', 'なんぷん', 'nan-pun'],
          ]}
        />
        <Ex
          jp="いま、なんじですか？ — じゅうじにじゅっぷんです。"
          romaji="ima, nan-ji desu ka? — juu-ji nijup-pun desu."
          pt="Que horas são agora? — São dez e vinte."
          notes="perguntar as horas: horário + です, a cópula da lição de Usos do です"
        />
        <Ex
          jp="ろくじはんにおきます。"
          romaji="roku-ji han ni okimasu."
          pt="Acordo às seis e meia."
          notes="はん no lugar de さんじゅっぷん — é o jeito normal de dizer 'e meia' na fala"
        />
        <Ex
          jp="つぎのでんしゃは、くじよんじゅうごふんです。"
          romaji="tsugi no densha wa, ku-ji yonjuugo-fun desu."
          pt="O próximo trem é às nove e quarenta e cinco."
          notes="na estação — o japonês diz os minutos exatos; não existe 'quinze para as dez' como forma padrão"
        />
        <p className="text-sm leading-relaxed text-ink">
          Para separar manhã e tarde, <span className="font-jp">ごぜん</span> (<em>gozen</em>,
          a.m.) e <span className="font-jp">ごご</span> (<em>gogo</em>, p.m.) vêm{' '}
          <strong>antes</strong> da hora — ao contrário do "7 da manhã" do português:{' '}
          <span className="font-jp">ごぜんしちじ</span> (7h),{' '}
          <span className="font-jp">ごごしちじ</span> (19h). Na fala do dia a dia, quando o
          contexto não deixa claro, também é comum usar a parte do dia:{' '}
          <span className="font-jp">あさしちじ</span> (7 da manhã),{' '}
          <span className="font-jp">よるくじ</span> (9 da noite).
        </p>
        <p className="text-sm leading-relaxed text-ink">
          O relógio de 24 horas também é muito usado no Japão: horários de trem, de loja, de
          reunião e de TV vêm escritos assim, e no trabalho se fala{' '}
          <span className="font-jp">じゅうよじ</span> (14h) com naturalidade. Para contar a sua
          rotina, prefira o relógio de 12 horas com ごご/よる — soa mais conversa e menos
          agenda. O que não existe é juntar os dois:{' '}
          <span className="font-jp">ごごじゅうよじ</span> está errado.
        </p>
        <Ex
          jp="かいぎはじゅうよじからです。"
          romaji="kaigi wa juuyo-ji kara desu."
          pt="A reunião é a partir das 14h."
          notes="no trabalho: relógio de 24h, normal em agenda e reunião. から = a partir de (lição de Partículas)"
        />
        <Note>
          <strong>〜じ (ponto) ≠ 〜じかん (duração).</strong>{' '}
          <span className="font-jp">いちじ</span> é "uma hora" no relógio;{' '}
          <span className="font-jp">いちじかん</span> é "uma hora" de duração.{' '}
          <span className="font-jp">にじにねます</span> = durmo às duas;{' '}
          <span className="font-jp">にじかんねます</span> = durmo duas horas. Os minutos não fazem
          essa distinção: <span className="font-jp">ごふん</span> serve para os dois sentidos, e o
          contexto decide.
        </Note>
        <Note>
          <strong>Aprofundamento:</strong> você também vai ouvir{' '}
          <span className="font-jp">ちょうど</span> ("em ponto":{' '}
          <span className="font-jp">しちじちょうど</span>),{' '}
          <span className="font-jp">〜すぎ</span> ("e pouco", passado da hora:{' '}
          <span className="font-jp">しちじすぎ</span>) e{' '}
          <span className="font-jp">〜まえ</span> ("faltando":{' '}
          <span className="font-jp">しちじごふんまえ</span>, cinco para as sete). E{' '}
          <span className="font-jp">ななじ</span> existe: algumas pessoas e alguns avisos usam
          para não confundir com <span className="font-jp">いちじ</span>. Reconheça, mas produza{' '}
          <span className="font-jp">しちじ</span>, a forma padrão.
        </Note>
      </Section>

      <Section title="Palavras de tempo — e quando levam に">
        <p className="text-sm leading-relaxed text-ink">
          Além do relógio, a rotina se conta com partes do dia (<span className="font-jp">あさ</span>,{' '}
          <span className="font-jp">よる</span>), com <span className="font-jp">まい〜</span>{' '}
          ("todo/toda": <span className="font-jp">まいにち</span>,{' '}
          <span className="font-jp">まいあさ</span>) e com a divisão dias úteis × fim de semana.
          Essas palavras são a moldura da sua fala: quase toda frase de rotina começa com uma
          delas.
        </p>
        <GrammarTable
          headers={['Português', 'Japonês', 'Romaji', 'Kanji (furigana)']}
          jpCols={[1, 3]}
          rows={[
            ['manhã', 'あさ', 'asa', <FuriganaWord kanji="朝" reading="あさ" />],
            ['meio-dia, hora do almoço', 'ひる', 'hiru', <FuriganaWord kanji="昼" reading="ひる" />],
            ['a.m. / p.m.', 'ごぜん / ごご', 'gozen / gogo', kj(['午前', 'ごぜん'], ' / ', ['午後', 'ごご'])],
            ['fim de tarde (≈16h–18h)', 'ゆうがた', 'yuugata', <FuriganaWord kanji="夕方" reading="ゆうがた" />],
            ['noite', 'よる', 'yoru', <FuriganaWord kanji="夜" reading="よる" />],
            ['todo dia', 'まいにち', 'mainichi', <FuriganaWord kanji="毎日" reading="まいにち" />],
            ['toda manhã', 'まいあさ', 'maiasa', <FuriganaWord kanji="毎朝" reading="まいあさ" />],
            ['toda noite', 'まいばん', 'maiban', <FuriganaWord kanji="毎晩" reading="まいばん" />],
            ['dias úteis', 'へいじつ', 'heijitsu', <FuriganaWord kanji="平日" reading="へいじつ" />],
            ['fim de semana', 'しゅうまつ', 'shuumatsu', <FuriganaWord kanji="週末" reading="しゅうまつ" />],
            ['hoje de manhã', 'けさ', 'kesa', <FuriganaWord kanji="今朝" reading="けさ" />],
            ['ontem à noite', 'ゆうべ', 'yuube', 'ゆうべ'],
          ]}
        />
        <p className="text-sm leading-relaxed text-ink">
          A regra de partícula é a que mais pega aqui. Horário de relógio leva{' '}
          <span className="font-jp">に</span> (ou <span className="font-jp">ごろ</span>, se for
          aproximado); palavras de tempo <strong>relativas</strong> — todas as da tabela acima —
          não levam nada. A lógica: に aponta um ponto fixo no calendário ou no relógio; "toda
          manhã" e "ontem" mudam conforme quem fala e quando, então dispensam a partícula. Detalhes
          de に e ごろ estão na lição de Partículas.
        </p>
        <GrammarTable
          headers={['Tipo', 'Partícula', 'Exemplo']}
          jpCols={[2]}
          rows={[
            ['Horário exato', 'に', 'しちじにおきます'],
            ['Horário aproximado', 'ごろ (ou ごろに)', 'しちじごろおきます / しちじごろにおきます'],
            ['Palavra relativa (まいにち, あさ, しゅうまつ…)', 'nenhuma', 'まいにちおきます'],
            ['Palavra relativa como tópico / contraste', 'は', 'しゅうまつは…'],
            ['Dia da semana', 'に (opcional na fala)', 'どようび(に)いきます'],
          ]}
        />
        <Ex
          jp="まいあさ、ろくじにおきます。"
          romaji="maiasa, roku-ji ni okimasu."
          pt="Acordo às seis toda manhã."
          notes="as duas regras na mesma frase: まいあさ sem partícula, ろくじ com に"
        />
        <Ex
          jp="へいじつはろくじにおきますが、しゅうまつはくじごろおきます。"
          romaji="heijitsu wa roku-ji ni okimasu ga, shuumatsu wa ku-ji goro okimasu."
          pt="Nos dias úteis acordo às seis, mas no fim de semana acordo por volta das nove."
          notes="は nos dois lados marca o contraste dias úteis × fim de semana; が = 'mas'"
        />
        <Ex
          jp="けさは、あさごはんをたべませんでした。"
          romaji="kesa wa, asagohan o tabemasen deshita."
          pt="Hoje de manhã não tomei café."
          notes="dita depois que a manhã passou, けさ vem com o verbo no passado"
        />
      </Section>

      <Section title="As atividades do dia">
        <p className="text-sm leading-relaxed text-ink">
          O vocabulário de rotina é quase todo verbo — e o verbo vem com a sua partícula. Por isso
          as tabelas trazem a expressão inteira (<span className="font-jp">はをみがきます</span>, e
          não só <span className="font-jp">みがく</span>): decorar o verbo sozinho é o caminho mais
          curto para errar a partícula na hora de falar. Estão na forma{' '}
          <span className="font-jp">ます</span>, que é a que você vai usar na apresentação; a forma
          de dicionário está na coluna de kanji.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          <strong>De manhã</strong>
        </p>
        <GrammarTable
          headers={['Português', 'Japonês', 'Romaji', 'Kanji (furigana)']}
          jpCols={[1, 3]}
          rows={[
            ['acordar / levantar', 'おきます', 'okimasu', kj(['起', 'お'], 'きる')],
            ['lavar o rosto', 'かおをあらいます', 'kao o araimasu', kj(['顔', 'かお'], 'を', ['洗', 'あら'], 'う')],
            ['escovar os dentes', 'はをみがきます', 'ha o migakimasu', kj(['歯', 'は'], 'を', ['磨', 'みが'], 'く')],
            ['tomar banho (chuveiro)', 'シャワーをあびます', 'shawaa o abimasu', kj('シャワーを', ['浴', 'あ'], 'びる')],
            ['trocar de roupa', 'きがえます', 'kigaemasu', kj(['着替', 'きが'], 'える')],
            ['tomar café da manhã', 'あさごはんをたべます', 'asagohan o tabemasu', kj(['朝', 'あさ'], 'ご', ['飯', 'はん'], 'を', ['食', 'た'], 'べる')],
            ['sair de casa', 'いえをでます', 'ie o demasu', kj(['家', 'いえ'], 'を', ['出', 'で'], 'る')],
          ]}
        />
        <p className="text-sm leading-relaxed text-ink">
          <strong>Durante o dia</strong>
        </p>
        <GrammarTable
          headers={['Português', 'Japonês', 'Romaji', 'Kanji (furigana)']}
          jpCols={[1, 3]}
          rows={[
            ['pegar o trem', 'でんしゃにのります', 'densha ni norimasu', kj(['電車', 'でんしゃ'], 'に', ['乗', 'の'], 'る')],
            ['ir para a empresa', 'かいしゃにいきます', 'kaisha ni ikimasu', kj(['会社', 'かいしゃ'], 'に', ['行', 'い'], 'く')],
            ['ir para a escola / faculdade', 'がっこう / だいがくにいきます', 'gakkou / daigaku ni ikimasu', kj(['学校', 'がっこう'], ' / ', ['大学', 'だいがく'])],
            ['trabalhar', 'はたらきます / しごとをします', 'hatarakimasu / shigoto o shimasu', kj(['働', 'はたら'], 'く / ', ['仕事', 'しごと'])],
            ['estudar', 'べんきょうします', 'benkyou shimasu', kj(['勉強', 'べんきょう'], 'する')],
            ['almoçar', 'ひるごはんをたべます', 'hirugohan o tabemasu', kj(['昼', 'ひる'], 'ご', ['飯', 'はん'])],
            ['fazer exercício', 'うんどうします', 'undou shimasu', kj(['運動', 'うんどう'], 'する')],
            ['correr (jogging)', 'ジョギングをします', 'jogingu o shimasu', 'ジョギング'],
            ['jogar futebol', 'サッカーをします', 'sakkaa o shimasu', 'サッカー'],
            ['fazer compras', 'かいものをします', 'kaimono o shimasu', kj(['買', 'か'], 'い', ['物', 'もの'])],
          ]}
        />
        <p className="text-sm leading-relaxed text-ink">
          <strong>À noite</strong>
        </p>
        <GrammarTable
          headers={['Português', 'Japonês', 'Romaji', 'Kanji (furigana)']}
          jpCols={[1, 3]}
          rows={[
            ['voltar para casa', 'いえにかえります', 'ie ni kaerimasu', kj(['家', 'いえ'], 'に', ['帰', 'かえ'], 'る')],
            ['fazer o jantar', 'ばんごはんをつくります', 'bangohan o tsukurimasu', kj(['晩', 'ばん'], 'ご', ['飯', 'はん'], 'を', ['作', 'つく'], 'る')],
            ['jantar', 'ばんごはんをたべます', 'bangohan o tabemasu', kj(['晩', 'ばん'], 'ご', ['飯', 'はん'])],
            ['ver TV / séries', 'テレビ / ドラマをみます', 'terebi / dorama o mimasu', kj(['見', 'み'], 'る')],
            ['ler um livro', 'ほんをよみます', 'hon o yomimasu', kj(['本', 'ほん'], 'を', ['読', 'よ'], 'む')],
            ['ouvir música', 'おんがくをききます', 'ongaku o kikimasu', kj(['音楽', 'おんがく'], 'を', ['聞', 'き'], 'く')],
            ['descansar', 'やすみます', 'yasumimasu', kj(['休', 'やす'], 'む')],
            ['tomar banho (de banheira)', 'おふろにはいります', 'o-furo ni hairimasu', kj('お', ['風呂', 'ふろ'], 'に', ['入', 'はい'], 'る')],
            ['dormir / ir para a cama', 'ねます', 'nemasu', kj(['寝', 'ね'], 'る')],
          ]}
        />
        <Note>
          <strong>O "tomar" do português se divide em três.</strong> "Tomar café" (a bebida) é{' '}
          <span className="font-jp">コーヒーをのみます</span> — のむ, beber. "Tomar café da manhã" é
          comer uma refeição: <span className="font-jp">あさごはんをたべます</span>. E "tomar
          banho" é <span className="font-jp">シャワーをあびます</span> (chuveiro, lit. "banhar-se
          na ducha") ou <span className="font-jp">おふろにはいります</span> (banheira, lit.
          "entrar no ofurô"). Traduzir "tomar" por um verbo só é o erro mais previsível desta
          lição.
        </Note>
        <Note>
          <span className="font-jp">おふろ</span> é a banheira de água quente onde se entra{' '}
          <strong>depois</strong> de se lavar no chuveiro, para relaxar — normalmente à noite. Para
          um japonês, "おふろにはいります" à noite é o padrão, e o banho de manhã é o detalhe que
          chama atenção. Se o seu costume é o banho de chuveiro de manhã, diga{' '}
          <span className="font-jp">あさ、シャワーをあびます</span>. Na fala casual também se ouve{' '}
          <span className="font-jp">シャワーする</span>; reconheça, mas produza あびる.
        </Note>
        <p className="text-sm leading-relaxed text-ink">
          Três destas partículas não batem com o português, e é nelas que o brasileiro tropeça: em
          português "pego o trem" tem objeto direto, mas <span className="font-jp">のる</span> é
          "embarcar <strong>em</strong>" (<span className="font-jp">に</span>); "tomar banho de
          ofurô" vira "entrar <strong>no</strong> ofurô"; e "sair <strong>de</strong> casa" usa{' '}
          <span className="font-jp">を</span>, que com verbos de movimento marca o lugar que você
          deixa ou percorre (<span className="font-jp">いえからでます</span> não está errado, mas{' '}
          <span className="font-jp">いえをでます</span> é o jeito usual de contar a rotina). Vale também o par de sempre: <span className="font-jp">に</span> para
          onde você vai, <span className="font-jp">で</span> onde a ação acontece.
        </p>
        <GrammarTable
          headers={['Português', 'O brasileiro tende a usar', 'Japonês natural', 'Lógica']}
          jpCols={[2]}
          rows={[
            ['pegar o trem', 'を ✗', 'でんしゃにのります', 'embarcar em → に'],
            ['tomar banho de ofurô', 'を ✗', 'おふろにはいります', 'entrar em → に'],
            ['sair de casa', 'から (possível, mas menos usual)', 'いえをでます', 'lugar que se deixa → を'],
            ['ir para a empresa', '—', 'かいしゃにいきます', 'destino → に'],
            ['trabalhar na empresa', 'に ✗', 'かいしゃではたらきます', 'lugar da ação → で'],
          ]}
        />
        <Ex
          jp="しちじはんにいえをでます。"
          romaji="shichi-ji han ni ie o demasu."
          pt="Saio de casa às sete e meia."
          notes="を com verbo de movimento = o lugar que você deixa"
        />
        <Ex
          jp="しんじゅくで、ちかてつにのりかえます。"
          romaji="shinjuku de, chikatetsu ni norikaemasu."
          pt="Em Shinjuku, troco para o metrô."
          notes="na rotina de quem vive em Tóquio: のりかえる (fazer baldeação) segue a mesma lógica de のる — に"
        />
        <Ex
          jp="かいしゃのちかくのジムで、うんどうします。"
          romaji="kaisha no chikaku no jimu de, undou shimasu."
          pt="Faço exercício numa academia perto da empresa."
          notes="で = onde a ação acontece; の liga 'perto da empresa' a 'academia'"
        />
        <Note>
          <span className="font-jp">いえ</span> e <span className="font-jp">うち</span> significam
          "casa"; na fala sobre a própria rotina, <span className="font-jp">うち</span> é mais
          comum e mais afetivo ("lar"): <span className="font-jp">うちにかえります</span>. As duas
          estão certas.
        </Note>
      </Section>

      <Section title="Montando a frase de rotina">
        <p className="text-sm leading-relaxed text-ink">
          Uma frase de rotina é um verbo com peças penduradas antes dele, cada uma com a sua
          partícula: quando, com que frequência, que horas, com quem, onde, o quê. O verbo fica
          sempre no fim; as outras peças têm uma ordem <strong>natural</strong>, não obrigatória —
          como cada uma carrega a própria partícula, mudar a ordem não muda quem faz o quê. Na
          dúvida, siga a da tabela: do mais geral (quando) para o mais específico (o quê).
        </p>
        <GrammarTable
          headers={['Peça', 'Partícula', 'Exemplo']}
          jpCols={[2]}
          rows={[
            ['Quando (palavra relativa)', 'nenhuma, ou は para contraste', 'へいじつは'],
            ['Frequência', 'nenhuma', 'よく'],
            ['Que horas', 'に / ごろ', 'じゅうにじに'],
            ['Com quem', 'と', 'どうりょうと'],
            ['Onde (lugar da ação)', 'で', 'しょくどうで'],
            ['O quê', 'を', 'ひるごはんを'],
            ['Verbo', '—', 'たべます'],
          ]}
        />
        <p className="text-sm leading-relaxed text-ink">
          Montando de dentro para fora, a frase cresce sem mudar de estrutura:
        </p>
        <GrammarTable
          headers={['Japonês', 'Português']}
          jpCols={[0]}
          rows={[
            ['たべます。', 'Como.'],
            ['ひるごはんをたべます。', 'Almoço.'],
            ['しょくどうでひるごはんをたべます。', 'Almoço no refeitório.'],
            ['どうりょうとしょくどうでひるごはんをたべます。', 'Almoço com colegas no refeitório.'],
            ['じゅうにじに、どうりょうとしょくどうでひるごはんをたべます。', 'Ao meio-dia, almoço com colegas no refeitório.'],
          ]}
        />
        <Ex
          jp="へいじつは、よくじゅうにじにどうりょうとしょくどうでひるごはんをたべます。"
          romaji="heijitsu wa, yoku juuni-ji ni douryou to shokudou de hirugohan o tabemasu."
          pt="Nos dias úteis, costumo almoçar ao meio-dia com os colegas no refeitório."
          notes="todas as peças juntas — no trabalho; na fala real, raramente se usa tudo de uma vez"
        />
        <Ex
          jp="ごご、としょかんでにほんごをべんきょうします。"
          romaji="gogo, toshokan de nihongo o benkyou shimasu."
          pt="À tarde, estudo japonês na biblioteca."
          notes="rotina de estudante: só três peças — quando, onde, o quê"
        />
        <Ex
          jp="よるはうちでゲームする。"
          romaji="yoru wa uchi de geemu suru."
          pt="À noite jogo videogame em casa."
          notes="trilha casual, entre amigos: a mesma ordem, só o verbo muda de forma"
        />
        <Note>
          <strong>Sem わたしは em toda frase.</strong> Em português dizemos "eu acordo… eu tomo
          café… eu saio", e o aluno brasileiro repete <span className="font-jp">わたしは</span> em
          cada frase. Em japonês, numa fala sobre você mesmo, o sujeito fica subentendido:{' '}
          <span className="font-jp">わたしは</span> aparece no máximo uma vez, no começo, e às
          vezes nem isso. Repetido, soa como "eu, eu, eu" — e a fala fica com cara de tradução.
        </Note>
      </Section>

      <Section title="Frequência — まいにち, いつも, よく, ときどき">
        <p className="text-sm leading-relaxed text-ink">
          O verbo no presente diz que você <strong>faz</strong> algo, mas não com que frequência —
          e na rotina essa é justamente a informação que interessa. Os advérbios de frequência
          entram sem partícula, normalmente depois do tópico e antes do resto da frase (nunca
          depois do verbo). Todos estes vão com o verbo afirmativo:
        </p>
        <GrammarTable
          headers={['Frequência', 'Japonês', 'Romaji', 'Kanji (furigana)']}
          jpCols={[1, 3]}
          rows={[
            ['sempre, toda vez', 'いつも', 'itsumo', 'いつも'],
            ['todo dia (literal)', 'まいにち', 'mainichi', <FuriganaWord kanji="毎日" reading="まいにち" />],
            ['geralmente, quase sempre', 'たいてい', 'taitei', 'たいてい'],
            ['com frequência, muito', 'よく', 'yoku', 'よく'],
            ['às vezes', 'ときどき', 'tokidoki', <FuriganaWord kanji="時々" reading="ときどき" />],
            ['de vez em quando, raramente', 'たまに', 'tama ni', 'たまに'],
          ]}
        />
        <Ex
          jp="いつもバスでかいしゃにいきます。"
          romaji="itsumo basu de kaisha ni ikimasu."
          pt="Sempre vou de ônibus para a empresa."
          notes="いつも = toda vez que a ação acontece; で = meio de transporte (lição de Partículas)"
        />
        <Ex
          jp="まいばん、にほんごをさんじゅっぷんぐらいべんきょうします。"
          romaji="maiban, nihongo o sanjup-pun gurai benkyou shimasu."
          pt="Toda noite estudo japonês uns trinta minutos."
          notes="duração sem partícula; ぐらい aproxima duração, ごろ aproxima horário"
        />
        <Ex
          jp="しゅうまつは、よくともだちとカラオケにいきます。"
          romaji="shuumatsu wa, yoku tomodachi to karaoke ni ikimasu."
          pt="No fim de semana, vou muito ao karaokê com os amigos."
          notes="よく = com frequência — lazer típico no Japão, com cabines alugadas por hora"
        />
        <Ex
          jp="ときどき、コンビニでひるごはんをかいます。"
          romaji="tokidoki, konbini de hirugohan o kaimasu."
          pt="Às vezes compro o almoço na konbini."
          notes="ときどき — situação real de quem trabalha no Japão: bentô ou onigiri da konbini"
        />
        <Ex
          jp="たまに、うちでりょうりをします。"
          romaji="tama ni, uchi de ryouri o shimasu."
          pt="De vez em quando cozinho em casa."
          notes="たまに: pouco frequente, mas acontece — mais raro que ときどき"
        />
        <Ex
          jp="しゅうにかい、ジョギングをします。"
          romaji="shuu ni ni-kai, jogingu o shimasu."
          pt="Corro duas vezes por semana."
          notes="frequência em número: しゅうに〜かい (lição de Partículas). Mais preciso que qualquer advérbio"
        />
        <p className="text-sm leading-relaxed text-ink">
          Dois pares que se confundem:
        </p>
        <GrammarTable
          headers={['Par', 'Diferença', 'Exemplo']}
          jpCols={[2]}
          rows={[
            [
              'いつも × まいにち',
              'まいにち conta os dias; いつも diz que é sempre assim, toda vez que acontece',
              'まいにちはしります (corro todo dia) / いつもあさはしります (sempre corro de manhã — quando corro, é de manhã)',
            ],
            [
              'ときどき × たまに',
              'たまに é mais raro, e soa como "de vez em quando, sem regularidade"',
              'ときどきジムにいきます / たまにジムにいきます',
            ],
          ]}
        />
        <Note>
          <strong>よく também quer dizer "bem".</strong> Com a maioria dos verbos de rotina, よく
          é frequência: <span className="font-jp">よくカラオケにいきます</span> (vou muito ao
          karaokê). Com <span className="font-jp">わかる</span> é sempre "bem":{' '}
          <span className="font-jp">よくわかりません</span> (não entendo bem). E com{' '}
          <span className="font-jp">ねる</span> depende do contexto:{' '}
          <span className="font-jp">ゆうべはよくねました</span> é "dormi bem ontem à noite", mas{' '}
          <span className="font-jp">あかちゃんはよくねます</span> é "o bebê dorme muito".
        </Note>
      </Section>

      <Section title="Frequência na negativa — あまり e ぜんぜん">
        <p className="text-sm leading-relaxed text-ink">
          <span className="font-jp">あまり</span> (<em>amari</em>, "não muito / quase não") e{' '}
          <span className="font-jp">ぜんぜん</span> (<em>zenzen</em>, "de jeito nenhum / nunca")
          completam a escala para baixo — e <strong>exigem o verbo na negativa</strong>. Esse é o
          ponto em que o português atrapalha: em "nunca como", a própria palavra "nunca" já nega,
          e o verbo fica afirmativo. Em japonês a negação mora sempre no fim do verbo; o advérbio
          só mede o quanto. Então "nunca como" vira, literalmente, "de jeito nenhum não como":{' '}
          <span className="font-jp">ぜんぜんたべません</span>.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          O que eles pedem é a <strong>negativa</strong>, não um tempo verbal: servem igualmente
          para o hábito de hoje (presente) e para contar o que não aconteceu (passado).
        </p>
        <GrammarTable
          headers={['', 'Presente negativo', 'Passado negativo']}
          jpCols={[1, 2]}
          rows={[
            ['あまり (não muito)', 'あまりのみません', 'あまりのみませんでした'],
            ['ぜんぜん (nunca / nada)', 'ぜんぜんのみません', 'ぜんぜんのみませんでした'],
            ['Casual', 'あんまりのまない / ぜんぜんのまない', 'あんまりのまなかった / ぜんぜんのまなかった'],
          ]}
        />
        <Ex
          jp="コーヒーはあまりのみません。"
          romaji="koohii wa amari nomimasen."
          pt="Não bebo muito café."
          notes="recusando o café oferecido no escritório; は no lugar de を, comum em negativas (lição de Verbos)"
        />
        <Ex
          jp="テレビはぜんぜんみません。"
          romaji="terebi wa zenzen mimasen."
          pt="Nunca vejo TV."
          notes="ぜんぜん + negativa = o 'nunca' de hábito"
        />
        <Ex
          jp="よくりょうりをしますか？ — いいえ、あまりしません。"
          romaji="yoku ryouri o shimasu ka? — iie, amari shimasen."
          pt="Você cozinha com frequência? — Não, não muito."
          notes="pergunta com よく, resposta com あまり: o par pergunta-resposta mais comum sobre rotina"
        />
        <Ex
          jp="きのうは、あまりねませんでした。"
          romaji="kinou wa, amari nemasen deshita."
          pt="Ontem não dormi muito."
          notes="passado: a mesma あまり, agora com ませんでした"
        />
        <Ex
          jp="こどものころは、やさいをぜんぜんたべませんでした。"
          romaji="kodomo no koro wa, yasai o zenzen tabemasen deshita."
          pt="Quando criança, eu não comia verdura nenhuma."
          notes="hábito do passado — ませんでした cobre 'não comia' e 'não comi' (lição de Verbos)"
        />
        <Ex
          jp="さいきん、あんまりうんどうしてない。"
          romaji="saikin, anmari undou shitenai."
          pt="Ultimamente não tenho feito muito exercício."
          notes="casual, entre amigos: あんまり é a forma falada de あまり; してない = していない (forma て)"
        />
        <Note>
          <strong>A restrição é só de um lado.</strong> あまり e ぜんぜん precisam da negativa,
          mas os advérbios da seção anterior podem ir com ela sem problema:{' '}
          <span className="font-jp">ときどきあさごはんをたべません</span> (às vezes não tomo café
          da manhã), <span className="font-jp">あさはいつもなにもたべません</span> (de
          manhã nunca como nada — lit. "sempre não como nada").
        </Note>
        <Note>
          <strong>Nem todo "nunca" é ぜんぜん.</strong> ぜんぜん é o "nunca" de{' '}
          <strong>hábito</strong> (não faço isso) ou de um período (não fiz nada disso ontem). O
          "nunca" de <strong>experiência</strong> — "nunca fui ao Japão", "nunca comi natto" — usa
          outra estrutura, <span className="font-jp">〜たことがありません</span>, que fica para uma
          lição futura. <span className="font-jp">にほんにぜんぜんいきませんでした</span> não quer
          dizer "nunca fui ao Japão", e sim algo como "não fui ao Japão de jeito nenhum" (naquele
          período).
        </Note>
        <Note>
          <strong>Aprofundamento:</strong> na fala casual, sobretudo entre jovens, ぜんぜん também
          aparece com frase afirmativa, no sentido de "totalmente":{' '}
          <span className="font-jp">ぜんぜんだいじょうぶ</span> (tá tudo bem, sem problema
          nenhum). É comum, mas informal — reconheça e, ao contar sua rotina, mantenha ぜんぜん
          com a negativa.
        </Note>
      </Section>

      <Section title="Encadeando o dia — forma て, それから, のあと">
        <p className="text-sm leading-relaxed text-ink">
          Uma sequência de frases curtas, todas terminando em ます, soa como alguém lendo uma
          agenda: "Acordo. Lavo o rosto. Escovo os dentes. Saio." Para a fala fluir, junte duas
          ou três ações com a <strong>forma て</strong> (montagem na lição de Verbos) e comece a
          frase seguinte com <span className="font-jp">それから</span> ("depois", "e então").
          Para "depois do trabalho", "antes da aula", use substantivo +{' '}
          <span className="font-jp">のあと</span> / <span className="font-jp">のまえに</span>.
        </p>
        <GrammarTable
          headers={['Conector', 'Sentido', 'Exemplo']}
          jpCols={[0, 2]}
          rows={[
            ['〜て、〜', 'e (em seguida)', 'おきて、シャワーをあびます'],
            ['それから', 'depois, e então (abre frase)', 'それから、いえをでます'],
            ['そのあと', 'depois disso (abre frase)', 'そのあと、ジムにいきます'],
            ['〜のあと(で)', 'depois de ~ (substantivo)', 'しごとのあと'],
            ['〜のまえに', 'antes de ~ (substantivo)', 'じゅぎょうのまえに'],
          ]}
        />
        <Ex
          jp="おきて、かおをあらって、はをみがきます。"
          romaji="okite, kao o aratte, ha o migakimasu."
          pt="Acordo, lavo o rosto e escovo os dentes."
          notes="três ações com て — só o último verbo carrega tempo e polidez"
        />
        <Ex
          jp="あさごはんをたべます。それから、しちじはんにいえをでます。"
          romaji="asagohan o tabemasu. sorekara, shichi-ji han ni ie o demasu."
          pt="Tomo café da manhã. Depois, saio de casa às sete e meia."
          notes="それから abre a frase nova — é o 'e aí' de quem conta uma sequência"
        />
        <Ex
          jp="しごとのあと、ジムでうんどうします。"
          romaji="shigoto no ato, jimu de undou shimasu."
          pt="Depois do trabalho, faço exercício na academia."
          notes="substantivo + のあと = depois de"
        />
        <Ex
          jp="じゅぎょうのまえに、コンビニでコーヒーをかいます。"
          romaji="jugyou no mae ni, konbini de koohii o kaimasu."
          pt="Antes da aula, compro café na konbini."
          notes="substantivo + のまえに = antes de; rotina de estudante"
        />
        <Note>
          Duas ou três ações por frase é o limite confortável. Uma frase com seis{' '}
          <span className="font-jp">て</span> seguidos é gramatical, mas cansa quem ouve e faz
          você se perder no meio — corte e recomece com <span className="font-jp">それから</span>.{' '}
          <span className="font-jp">そして</span> ("e") também liga frases, mas é mais neutro e
          mais comum na escrita; para uma sequência no tempo, <span className="font-jp">それから</span>{' '}
          é o mais natural na fala. "Antes/depois de <strong>fazer</strong> algo", com verbo, fica
          fora desta lição.
        </Note>
      </Section>

      <Section title="Contando o dia de ontem — o passado">
        <p className="text-sm leading-relaxed text-ink">
          A rotina se conta no presente, porque é hábito. Um dia específico — ontem, hoje de
          manhã, o fim de semana passado — se conta no passado, com{' '}
          <span className="font-jp">ました</span> / <span className="font-jp">ませんでした</span>.
          A estrutura da frase é exatamente a mesma; mudam a palavra de tempo e a terminação do
          verbo, e as duas precisam concordar. É a pergunta da segunda-feira:{' '}
          <span className="font-jp">きのうはなにをしましたか？</span>
        </p>
        <GrammarTable
          headers={['Rotina (presente)', 'Ontem (passado)']}
          jpCols={[0, 1]}
          rows={[
            ['まいあさ、ろくじにおきます。', 'きのうは、くじにおきました。'],
            ['いつもでんしゃでいきます。', 'きのうはバスでいきました。'],
            ['あさごはんはぜんぜんたべません。', 'けさはあさごはんをたべました。'],
            ['よるはあまりべんきょうしません。', 'ゆうべはぜんぜんべんきょうしませんでした。'],
          ]}
        />
        <Ex
          jp="きのうは、くじにおきました。にちようびでしたから。"
          romaji="kinou wa, ku-ji ni okimashita. nichiyoubi deshita kara."
          pt="Ontem acordei às nove. Porque era domingo."
          notes="でした (passado de です) + から = 'porque era' — explicação acrescentada depois, como na fala"
        />
        <Ex
          jp="おきて、シャワーをあびて、すぐでかけました。"
          romaji="okite, shawaa o abite, sugu dekakemashita."
          pt="Acordei, tomei banho e saí logo."
          notes="sequência no passado: só o último verbo vai para ました, e vale para os três"
        />
        <Ex
          jp="けさはじかんがありませんでしたから、なにもたべませんでした。"
          romaji="kesa wa jikan ga arimasen deshita kara, nani mo tabemasen deshita."
          pt="Hoje de manhã não tive tempo, então não comi nada."
          notes="なにも + negativa = nada; から = porque (lição de Partículas)"
        />
        <Ex
          jp="せんしゅうは、まいにちざんぎょうしました。"
          romaji="senshuu wa, mainichi zangyou shimashita."
          pt="Semana passada fiz hora extra todo dia."
          notes="no trabalho: ざんぎょう (hora extra) é tema constante. まいにち + passado = hábito daquele período"
        />
        <Ex
          jp="きのうのよる、なにした？ — うちでドラマみてた。"
          romaji="kinou no yoru, nani shita? — uchi de dorama miteta."
          pt="O que você fez ontem à noite? — Fiquei vendo série em casa."
          notes="casual entre amigos: partícula を some na fala; みてた = estava vendo (forma て)"
        />
        <Note>
          Cuidado ao contar uma sequência: o erro típico é começar no passado e "escorregar" para
          o presente no meio (<span className="font-jp">きのうはくじにおきます</span>) — em
          português o presente narrativo existe ("ontem eu acordo, saio, e aí…"), em japonês não.
          Com <span className="font-jp">きのう</span>, <span className="font-jp">けさ</span>,{' '}
          <span className="font-jp">せんしゅう</span>, todo verbo que fecha frase vai para o
          passado.
        </Note>
      </Section>

      <Section title="Perguntando e respondendo sobre a rotina">
        <p className="text-sm leading-relaxed text-ink">
          A pergunta é a própria frase de rotina com <span className="font-jp">か</span> no
          final, trocando a informação que você quer por uma palavra interrogativa (
          <span className="font-jp">なんじ</span>, <span className="font-jp">どこ</span>,{' '}
          <span className="font-jp">だれ</span>, <span className="font-jp">なに</span>) no mesmo
          lugar, com a mesma partícula. Na resposta, o japonês é econômico: para "que horas?" ou
          "onde?", basta a informação + <span className="font-jp">です</span>, como o "às seis"
          do português. Para "você faz…?", repete-se o verbo com a frequência.
        </p>
        <GrammarTable
          headers={['Pergunta', 'Romaji', 'Português']}
          jpCols={[0]}
          rows={[
            ['なんじにおきますか？', 'nan-ji ni okimasu ka?', 'A que horas você acorda?'],
            ['なんじからなんじまではたらきますか？', 'nan-ji kara nan-ji made hatarakimasu ka?', 'Você trabalha de que horas a que horas?'],
            ['どこでひるごはんをたべますか？', 'doko de hirugohan o tabemasu ka?', 'Onde você almoça?'],
            ['だれとすんでいますか？', 'dare to sunde imasu ka?', 'Com quem você mora?'],
            ['まいにちうんどうしますか？', 'mainichi undou shimasu ka?', 'Você faz exercício todo dia?'],
            ['しゅうまつはなにをしますか？', 'shuumatsu wa nani o shimasu ka?', 'O que você faz no fim de semana?'],
          ]}
        />
        <Ex
          jp="なんじにおきますか？ — ろくじです。"
          romaji="nan-ji ni okimasu ka? — roku-ji desu."
          pt="A que horas você acorda? — Às seis."
          notes="resposta curta: です substitui o verbo inteiro (lição de Usos do です)"
        />
        <Ex
          jp="まいにちうんどうしますか？ — いいえ、ときどきします。しゅうにかいぐらいです。"
          romaji="mainichi undou shimasu ka? — iie, tokidoki shimasu. shuu ni ni-kai gurai desu."
          pt="Você faz exercício todo dia? — Não, às vezes. Umas duas vezes por semana."
          notes="corrigir a frequência da pergunta: いいえ + o advérbio certo + verbo afirmativo"
        />
        <Ex
          jp="どこでひるごはんをたべますか？ — たいてい、かいしゃのちかくのていしょくやでたべます。"
          romaji="doko de hirugohan o tabemasu ka? — taitei, kaisha no chikaku no teishokuya de tabemasu."
          pt="Onde você almoça? — Geralmente num restaurante de prato feito perto da empresa."
          notes="たいてい = geralmente; ていしょくや = restaurante de 'prato feito' japonês"
        />
        <Ex
          jp="あしたのあさは、なんじにでかけますか？ — しちじにでかけます。"
          romaji="ashita no asa wa, nan-ji ni dekakemasu ka? — shichi-ji ni dekakemasu."
          pt="Amanhã de manhã, a que horas você sai? — Saio às sete."
          notes="na homestay: a família pergunta para preparar o café da manhã a tempo"
        />
        <p className="text-sm leading-relaxed text-ink">
          Quem ouve alguém contar a rotina não fica calado: reage. Essas reações curtas (
          <span className="font-jp">あいづち</span>, <em>aizuchi</em>) mostram que você está
          acompanhando, e são
          esperadas numa conversa japonesa.
        </p>
        <Ex
          jp="まいあさごじにおきます。 — へえ、はやいですね！"
          romaji="maiasa go-ji ni okimasu. — hee, hayai desu ne!"
          pt="Acordo às cinco toda manhã. — Nossa, que cedo!"
          notes="はやいですね = que cedo; com ね, você reage ao que o outro disse (lição de Partículas)"
        />
        <GrammarTable
          headers={['Reação', 'Romaji', 'Quando usar']}
          jpCols={[0]}
          rows={[
            ['はやいですね！', 'hayai desu ne!', 'acorda/sai muito cedo'],
            ['おそいですね！', 'osoi desu ne!', 'dorme/volta muito tarde'],
            ['たいへんですね。', 'taihen desu ne.', 'rotina puxada: hora extra, viagem longa'],
            ['いいですね！', 'ii desu ne!', 'algo bom: esporte, lazer, folga'],
            ['すごいですね！', 'sugoi desu ne!', 'algo admirável: estuda todo dia, corre 10 km'],
          ]}
        />
      </Section>

      <Section title="Exemplo completo 1 — um dia de trabalho (presente, educado)">
        <p className="text-sm leading-relaxed text-ink">
          Uma funcionária de escritório em Tóquio conta um dia útil típico. Repare como cada frase
          traz só duas ou três peças, e como os advérbios de frequência fazem o trabalho de dizer
          o que é regra e o que é exceção.
        </p>
        <Ex jp="わたしはかいしゃいんです。" romaji="watashi wa kaishain desu." pt="Sou funcionária de empresa." notes="わたしは só uma vez, na primeira frase" />
        <Ex jp="へいじつは、まいあさろくじにおきます。" romaji="heijitsu wa, maiasa roku-ji ni okimasu." pt="Nos dias úteis, acordo às seis toda manhã." />
        <Ex jp="おきて、シャワーをあびて、あさごはんをたべます。" romaji="okite, shawaa o abite, asagohan o tabemasu." pt="Acordo, tomo banho e tomo café da manhã." notes="três ações ligadas com て" />
        <Ex jp="あさごはんは、いつもパンとコーヒーです。" romaji="asagohan wa, itsumo pan to koohii desu." pt="O café da manhã é sempre pão e café." notes="frequência numa frase com です, não só com verbo" />
        <Ex jp="しちじはんにうちをでて、でんしゃでかいしゃにいきます。" romaji="shichi-ji han ni uchi o dete, densha de kaisha ni ikimasu." pt="Saio de casa às sete e meia e vou de trem para a empresa." />
        <Ex jp="かいしゃまで、いちじかんぐらいかかります。" romaji="kaisha made, ichi-jikan gurai kakarimasu." pt="Até a empresa leva mais ou menos uma hora." notes="かかる = levar (tempo); じかん = duração. Trajeto de uma hora é comum na Grande Tóquio" />
        <Ex jp="しごとは、くじからろくじまでです。" romaji="shigoto wa, ku-ji kara roku-ji made desu." pt="O trabalho é das nove às seis." notes="から〜まで + です: horário de algo, sem verbo" />
        <Ex jp="ひるごはんは、たいていどうりょうとかいしゃのちかくでたべます。" romaji="hirugohan wa, taitei douryou to kaisha no chikaku de tabemasu." pt="O almoço, geralmente como com colegas perto da empresa." />
        <Ex jp="ときどき、コンビニでおべんとうをかいます。" romaji="tokidoki, konbini de o-bentou o kaimasu." pt="Às vezes compro um bentô na konbini." />
        <Ex jp="しごとのあと、ときどきジムにいきます。" romaji="shigoto no ato, tokidoki jimu ni ikimasu." pt="Depois do trabalho, às vezes vou à academia." />
        <Ex jp="しちじはんごろうちにかえって、ばんごはんをつくります。" romaji="shichi-ji han goro uchi ni kaette, bangohan o tsukurimasu." pt="Volto para casa por volta das sete e meia e faço o jantar." />
        <Ex jp="よるは、よくドラマをみます。" romaji="yoru wa, yoku dorama o mimasu." pt="À noite, vejo séries com frequência." />
        <Ex jp="じゅういちじごろおふろにはいって、じゅうにじごろねます。" romaji="juuichi-ji goro o-furo ni haitte, juuni-ji goro nemasu." pt="Por volta das onze tomo banho, e por volta da meia-noite vou dormir." notes="o banho de ofurô à noite, padrão japonês" />
      </Section>

      <Section title="Exemplo completo 2 — um dia de estudante (com あまり e ぜんぜん)">
        <p className="text-sm leading-relaxed text-ink">
          Um universitário conta a rotina dele — com os hábitos que ele <strong>não</strong> tem,
          que é onde entram <span className="font-jp">あまり</span> e{' '}
          <span className="font-jp">ぜんぜん</span>.
        </p>
        <Ex jp="ぼくはだいがくせいです。" romaji="boku wa daigakusei desu." pt="Sou universitário." notes="ぼく: 'eu' de homem jovem, comum entre estudantes (lição de Pronomes)" />
        <Ex jp="じゅぎょうは、まいにちくじからです。" romaji="jugyou wa, mainichi ku-ji kara desu." pt="As aulas são todo dia a partir das nove." />
        <Ex jp="はちじごろおきます。あさごはんは、ぜんぜんたべません。" romaji="hachi-ji goro okimasu. asagohan wa, zenzen tabemasen." pt="Acordo por volta das oito. Café da manhã, não tomo nunca." notes="ぜんぜん + negativa; は destaca o assunto 'café da manhã'" />
        <Ex jp="はちじはんにうちをでて、じてんしゃでだいがくにいきます。" romaji="hachi-ji han ni uchi o dete, jitensha de daigaku ni ikimasu." pt="Saio de casa às oito e meia e vou de bicicleta para a faculdade." />
        <Ex jp="ひるは、がくしょくでともだちとたべます。やすいですから。" romaji="hiru wa, gakushoku de tomodachi to tabemasu. yasui desu kara." pt="No almoço, como no bandejão com os amigos. Porque é barato." notes="がくしょく = refeitório da universidade; a razão vem depois, com から" />
        <Ex jp="ごごは、としょかんでべんきょうします。" romaji="gogo wa, toshokan de benkyou shimasu." pt="À tarde, estudo na biblioteca." />
        <Ex jp="しゅうにさんかい、コンビニでアルバイトをします。" romaji="shuu ni san-kai, konbini de arubaito o shimasu." pt="Três vezes por semana, trabalho meio período numa konbini." notes="アルバイト (ou バイト) = trabalho de meio período, quase todo universitário japonês faz" />
        <Ex jp="バイトは、ろくじからじゅうじまでです。" romaji="baito wa, roku-ji kara juu-ji made desu." pt="O turno é das seis às dez." />
        <Ex jp="うちでは、あまりべんきょうしません。" romaji="uchi de wa, amari benkyou shimasen." pt="Em casa, não estudo muito." notes="では = で + は: 'em casa (diferente da biblioteca)'" />
        <Ex jp="いつも、いちじごろねます。" romaji="itsumo, ichi-ji goro nemasu." pt="Sempre vou dormir por volta da uma." />
      </Section>

      <Section title="Exemplo completo 3 — o fim de semana (a escala inteira)">
        <p className="text-sm leading-relaxed text-ink">
          O fim de semana é onde a frequência mais varia, por isso este exemplo passa pela escala
          inteira, de <span className="font-jp">たいてい</span> a{' '}
          <span className="font-jp">ぜんぜん</span>.
        </p>
        <Ex jp="しゅうまつは、たいていくじごろおきます。" romaji="shuumatsu wa, taitei ku-ji goro okimasu." pt="No fim de semana, geralmente acordo por volta das nove." />
        <Ex jp="どようびのあさは、よくこうえんでジョギングをします。" romaji="doyoubi no asa wa, yoku kouen de jogingu o shimasu." pt="Nas manhãs de sábado, costumo correr no parque." notes="どようびのあさ = manhã de sábado; の liga as duas palavras de tempo" />
        <Ex jp="ごごは、ときどきともだちとかいものにいきます。" romaji="gogo wa, tokidoki tomodachi to kaimono ni ikimasu." pt="À tarde, às vezes vou fazer compras com amigos." notes="かいものにいく = ir fazer compras (a atividade como destino)" />
        <Ex jp="にちようびは、そうじをして、せんたくをします。" romaji="nichiyoubi wa, souji o shite, sentaku o shimasu." pt="No domingo, limpo a casa e lavo a roupa." />
        <Ex jp="たまに、ケーキもつくります。" romaji="tama ni, keeki mo tsukurimasu." pt="De vez em quando, também faço bolo." notes="も = também, no lugar de を" />
        <Ex jp="しゅうまつは、しごとのメールはぜんぜんみません。" romaji="shuumatsu wa, shigoto no meeru wa zenzen mimasen." pt="No fim de semana, não olho e-mail de trabalho de jeito nenhum." />
        <Ex jp="にちようびのよるは、あまりでかけません。げつようびのあさがはやいですから。" romaji="nichiyoubi no yoru wa, amari dekakemasen. getsuyoubi no asa ga hayai desu kara." pt="Domingo à noite quase não saio. Porque segunda de manhã começo cedo." notes="あまり + negativa, seguida da razão com から" />
      </Section>

      <Section title="Exemplo completo 4 — ontem (passado, com o que deu errado)">
        <p className="text-sm leading-relaxed text-ink">
          A mesma funcionária do exemplo 1, agora contando o dia de ontem, que fugiu da rotina.
          Compare com o exemplo 1: a estrutura é a mesma, todos os verbos foram para o passado.
        </p>
        <Ex jp="きのうは、たいへんないちにちでした。" romaji="kinou wa, taihen na ichinichi deshita." pt="Ontem foi um dia difícil." notes="でした: passado de です (lição de Usos do です)" />
        <Ex jp="あさ、ねぼうしました。" romaji="asa, nebou shimashita." pt="De manhã, perdi a hora." notes="ねぼうする = dormir demais, perder a hora" />
        <Ex jp="しちじにおきて、あさごはんはたべませんでした。" romaji="shichi-ji ni okite, asagohan wa tabemasen deshita." pt="Acordei às sete e não tomei café da manhã." notes="おきて fica no passado por causa do último verbo" />
        <Ex jp="でんしゃもおくれましたから、かいしゃにはくじじゅっぷんにつきました。" romaji="densha mo okuremashita kara, kaisha ni wa ku-ji jup-pun ni tsukimashita." pt="O trem também atrasou, então cheguei à empresa às nove e dez." notes="つく = chegar; おくれる = atrasar. Se o trem atrasa, a ferrovia emite um comprovante (ちえんしょうめいしょ) para mostrar no trabalho" />
        <Ex jp="ひるごはんは、つくえでおにぎりをたべました。" romaji="hirugohan wa, tsukue de onigiri o tabemashita." pt="No almoço, comi um onigiri na mesa de trabalho." />
        <Ex jp="はちじまでざんぎょうしました。" romaji="hachi-ji made zangyou shimashita." pt="Fiz hora extra até as oito." />
        <Ex jp="ジムには、いきませんでした。" romaji="jimu ni wa, ikimasen deshita." pt="Na academia, não fui." notes="には = に + は: contraste com o costume (ときどきいきます)" />
        <Ex jp="うちにかえって、シャワーをあびて、すぐねました。" romaji="uchi ni kaette, shawaa o abite, sugu nemashita." pt="Voltei para casa, tomei banho e fui dormir logo." />
        <Ex jp="ドラマは、ぜんぜんみませんでした。" romaji="dorama wa, zenzen mimasen deshita." pt="Série, não vi nada." notes="ぜんぜん + passado negativo — o par que a pessoa costuma 'fazer com frequência' (よくみます), negado" />
      </Section>

      <Section title="Exemplo completo 5 — entre amigos (trilha casual)">
        <p className="text-sm leading-relaxed text-ink">
          A mesma conversa sobre rotina, agora entre dois amigos. As informações são as mesmas;
          mudam as formas do verbo (dicionário, ない) e somem algumas partículas, como é normal
          na fala casual.
        </p>
        <Ex jp="A：ねえ、まいにちなんじにおきる？" romaji="A: nee, mainichi nan-ji ni okiru?" pt="A: Ei, que horas você acorda todo dia?" notes="pergunta casual: forma de dicionário + entonação subindo, sem か" />
        <Ex jp="B：ろくじはん。かいしゃ、とおいから。" romaji="B: roku-ji han. kaisha, tooi kara." pt="B: Seis e meia. A empresa é longe." notes="resposta só com o horário; casual dispensa です" />
        <Ex jp="A：たいへんだね。あさごはんはたべる？" romaji="A: taihen da ne. asagohan wa taberu?" pt="A: Puxado, hein. Você toma café da manhã?" />
        <Ex jp="B：ううん、あんまりたべない。コーヒーだけ。" romaji="B: uun, anmari tabenai. koohii dake." pt="B: Não, quase não como. Só café." notes="ううん = 'não' casual; あんまり + ない" />
        <Ex jp="A：しゅうまつは？" romaji="A: shuumatsu wa?" pt="A: E no fim de semana?" notes="só o tópico + は com entonação de pergunta = 'e quanto a…?'" />
        <Ex jp="B：じゅうじまでねる！" romaji="B: juu-ji made neru!" pt="B: Durmo até as dez!" />
      </Section>

      <Section title="Montando a sua apresentação — わたしのいちにち">
        <p className="text-sm leading-relaxed text-ink">
          Para a atividade de fala, use este roteiro. Ele tem a ordem que um ouvinte japonês
          espera — abertura, manhã, dia, noite, fim de semana, fechamento — e passa por todos os
          pontos da lição: horários com に e ごろ, a frequência nas duas direções e uma frase no
          passado.
        </p>
        <GrammarTable
          headers={['Parte', 'Modelo', 'O que trocar']}
          jpCols={[1]}
          rows={[
            ['Abertura', 'みなさん、こんにちは。わたしのいちにちについてはなします。', '—'],
            ['Manhã', 'まいあさ〈hora〉におきます。〈ação〉て、〈ação〉ます。', 'horário, 2–3 ações'],
            ['Saída', '〈hora〉にうちをでて、〈meio〉で〈lugar〉にいきます。', 'でんしゃ / バス / くるま / じてんしゃ'],
            ['Dia', 'しごと / じゅぎょうは〈hora〉から〈hora〉までです。', 'trabalho ou aula'],
            ['Almoço', 'ひるごはんは、〈frequência〉〈lugar〉でたべます。', 'たいてい, よく, ときどき'],
            ['Noite', '〈hora〉ごろうちにかえります。よるは〈frequência〉〈ação〉。', 'lazer, estudo'],
            ['O que não faz', '〈coisa〉はあまり / ぜんぜん〈verbo〉ません。', 'um hábito que você não tem'],
            ['Dormir', '〈hora〉ごろねます。', '—'],
            ['Fim de semana / ontem', 'しゅうまつは…  /  きのうは…ました。', 'uma frase no passado'],
            ['Fechamento', 'いじょうです。ありがとうございました。', '—'],
          ]}
        />
        <p className="text-sm leading-relaxed text-ink">
          Um modelo pronto, de alguém que mora no Brasil, trabalha e estuda japonês à noite:
        </p>
        <Ex jp="みなさん、こんにちは。わたしのいちにちについてはなします。" romaji="minasan, konnichiwa. watashi no ichinichi ni tsuite hanashimasu." pt="Olá a todos. Vou falar sobre o meu dia." notes="〜についてはなします = vou falar sobre ~; abertura fixa de apresentação" />
        <Ex jp="わたしは、まいあさろくじはんにおきます。" romaji="watashi wa, maiasa roku-ji han ni okimasu." pt="Acordo às seis e meia toda manhã." />
        <Ex jp="おきて、シャワーをあびて、あさごはんをたべます。あさごはんは、いつもくだものとコーヒーです。" romaji="okite, shawaa o abite, asagohan o tabemasu. asagohan wa, itsumo kudamono to koohii desu." pt="Acordo, tomo banho e tomo café da manhã. O café da manhã é sempre fruta e café." />
        <Ex jp="はちじにうちをでて、くるまでかいしゃにいきます。" romaji="hachi-ji ni uchi o dete, kuruma de kaisha ni ikimasu." pt="Saio de casa às oito e vou de carro para a empresa." />
        <Ex jp="しごとは、くじからごじはんまでです。" romaji="shigoto wa, ku-ji kara go-ji han made desu." pt="O trabalho é das nove às cinco e meia." />
        <Ex jp="ひるごはんは、たいていじゅうにじごろ、かいしゃのちかくのレストランでたべます。" romaji="hirugohan wa, taitei juuni-ji goro, kaisha no chikaku no resutoran de tabemasu." pt="Almoço geralmente por volta do meio-dia, num restaurante perto da empresa." />
        <Ex jp="しごとのあと、しゅうにかいジムにいきます。" romaji="shigoto no ato, shuu ni ni-kai jimu ni ikimasu." pt="Depois do trabalho, vou à academia duas vezes por semana." />
        <Ex jp="よるは、まいにちさんじゅっぷんぐらいにほんごをべんきょうします。" romaji="yoru wa, mainichi sanjup-pun gurai nihongo o benkyou shimasu." pt="À noite, estudo japonês uns trinta minutos todo dia." />
        <Ex jp="テレビは、あまりみません。" romaji="terebi wa, amari mimasen." pt="TV, quase não vejo." />
        <Ex jp="じゅういちじごろねます。" romaji="juuichi-ji goro nemasu." pt="Vou dormir por volta das onze." />
        <Ex jp="しゅうまつは、よくかぞくとでかけます。きのうは、かぞくとシュラスコをたべました。" romaji="shuumatsu wa, yoku kazoku to dekakemasu. kinou wa, kazoku to shurasuko o tabemashita." pt="No fim de semana, saio bastante com a família. Ontem, comi churrasco com a família." notes="a frase no passado fecha a fala com algo concreto; シュラスコ é como 'churrasco' é conhecido no Japão" />
        <Ex jp="いじょうです。ありがとうございました。" romaji="ijou desu. arigatou gozaimashita." pt="É isso. Muito obrigado(a)." notes="fechamento padrão — ver a nota cultural abaixo" />
        <Note>
          Dicas para a hora de falar: use <span className="font-jp">ごろ</span> sem medo — ninguém
          acorda exatamente às 6h30 todo dia, e ごろ soa mais natural que um horário cravado em
          toda frase. Varie a frequência (pelo menos um advérbio afirmativo e um negativo). Fique
          na trilha educada (ます/です) do começo ao fim. E se esquecer uma palavra no meio, uma
          pausa com <span className="font-jp">えっと…</span> ("hum…") é exatamente o que um
          japonês faria.
        </Note>
      </Section>

      <Section title="Nota cultural: abrir e fechar uma fala em público">
        <p className="text-sm leading-relaxed text-ink">
          Na escola e no trabalho japoneses, uma fala para um grupo — de uma apresentação de
          classe a um relatório numa reunião — tem moldura fixa. Quem fala anuncia o começo e,
          principalmente, anuncia o <strong>fim</strong> com{' '}
          <span className="font-jp">いじょうです</span> (<em>ijou desu</em>, lit. "o que foi dito
          acima é tudo"). É o sinal para a plateia: acabou, agora podem agradecer, aplaudir ou
          perguntar.
        </p>
        <Ex
          jp="いじょうです。ありがとうございました。"
          romaji="ijou desu. arigatou gozaimashita."
          pt="É isso. Muito obrigado(a)."
          notes="a fórmula mais comum, seguida de uma leve inclinação de cabeça"
        />
        <Ex
          jp="これで、わたしのはっぴょうをおわります。"
          romaji="kore de, watashi no happyou o owarimasu."
          pt="Com isso, encerro a minha apresentação."
          notes="variante mais formal, comum em apresentação escolar (はっぴょう = apresentação)"
        />
        <Note>
          Isso muda uma escolha real: o hábito brasileiro de terminar com "…e é isso, gente" ou
          simplesmente parar e sorrir deixa uma plateia japonesa em dúvida se você terminou ou só
          fez uma pausa. Feche sempre com <span className="font-jp">いじょうです</span> +{' '}
          <span className="font-jp">ありがとうございました</span>, e uma pequena reverência. Na
          abertura, uma inclinação de cabeça com <span className="font-jp">よろしくおねがいします</span>{' '}
          também é comum — a mesma fórmula da lição de Apresentação.
        </Note>
      </Section>

      <Section title="Erros comuns">
        <GrammarTable
          headers={['Erro', 'Incorreto', 'Correto', 'Por quê']}
          jpCols={[1, 2]}
          rows={[
            ['Leitura das horas 4, 7 e 9', 'よんじ / ななじ / きゅうじ', 'よじ / しちじ / くじ', 'Com o contador じ, esses três números têm leitura própria.'],
            ['Minutos sempre com ふん', 'じゅうふん / さんふん', 'じゅっぷん / さんぷん', 'Depois de 1, 3, 4, 6, 8 e 10, ふん vira ぷん.'],
            ['に com palavra relativa', 'まいにちにおきます', 'まいにちおきます', 'まいにち, あさ, きのう, しゅうまつ não levam に.'],
            ['Horário sem partícula', 'ろくじおきます', 'ろくじにおきます / ろくじごろおきます', 'Horário de relógio pede に (exato) ou ごろ (aproximado).'],
            [
              'に antes de ごろ',
              'ろくじにごろおきます',
              'ろくじごろおきます / ろくじごろにおきます',
              'ごろ vem colado à hora; se quiser usar に, ela vem depois (ごろに). にごろ não existe.',
            ],
            ['ごご com relógio de 24h', 'ごごじゅうしちじ', 'ごごごじ / じゅうしちじ', 'ごご/ごぜん só com o relógio de 12 horas, e antes da hora.'],
            ['"Nunca" com verbo afirmativo', 'ぜんぜんたべます', 'ぜんぜんたべません', 'A negação mora no verbo; ぜんぜん e あまり só medem o quanto.'],
            ['"Tomar café da manhã" com のむ', 'あさごはんをのみます', 'あさごはんをたべます', 'Refeição se come; のむ é só para bebida.'],
            ['Partícula de のる', 'でんしゃをのります', 'でんしゃにのります', 'のる é "embarcar em": o veículo leva に.'],
            ['Partícula de おふろ', 'おふろをはいります', 'おふろにはいります', 'はいる é "entrar em": o lugar leva に.'],
            ['Lugar da ação com に', 'かいしゃにはたらきます', 'かいしゃではたらきます', 'に é destino; onde a ação acontece é で.'],
            ['Duração com じ', 'にじべんきょうします (querendo "duas horas")', 'にじかんべんきょうします', 'じ é ponto no relógio; duração é じかん.'],
            ['Presente narrativo em fala sobre ontem', 'きのうはくじにおきます', 'きのうはくじにおきました', 'Em japonês, dia específico no passado pede passado em todo verbo final.'],
            ['わたしは em toda frase', 'わたしはおきます。わたしはたべます。', 'おきて、あさごはんをたべます。', 'O sujeito fica subentendido depois da primeira menção.'],
          ]}
        />
      </Section>

      <Section title="Resumo e tabela de referência">
        <GrammarTable
          headers={['Tema', 'Regra', 'Exemplo']}
          jpCols={[2]}
          rows={[
            ['Horas', 'número + じ; irregulares よじ, しちじ, くじ', 'しちじ'],
            ['Minutos', 'ふん após 2, 5, 7, 9; ぷん após 1, 3, 4, 6, 8, 10', 'じゅうごふん / じゅっぷん'],
            ['Meia hora', 'はん', 'ろくじはん'],
            ['Manhã / tarde', 'ごぜん / ごご antes da hora (relógio de 12h)', 'ごごさんじ'],
            ['Ponto × duração', 'じ = no relógio; じかん = quanto tempo', 'にじ / にじかん'],
            ['Horário exato / aproximado', 'に / ごろ (ou ごろに; nunca にごろ)', 'しちじに / しちじごろ'],
            ['Palavras relativas', 'sem に (ou は para contraste)', 'まいにち / しゅうまつは'],
            ['Ordem da frase', 'quando → frequência → hora → com quem → onde → o quê → verbo', 'へいじつは、よくじゅうにじにどうりょうとしょくどうでたべます'],
            ['Frequência (afirmativa)', 'いつも > よく > ときどき > たまに', 'よくみます'],
            ['Frequência (negativa)', 'あまり / ぜんぜん + verbo negativo, presente ou passado', 'あまりみません / ぜんぜんみませんでした'],
            ['Sequência', 'forma て (2–3 ações) + それから; substantivo + のあと / のまえに', 'おきて、たべます。それから…'],
            ['Dia específico', 'mesma frase, verbo em ました / ませんでした', 'きのうはくじにおきました'],
            ['Resposta curta', 'informação + です', 'ろくじです'],
            ['Fechar a fala', 'いじょうです + ありがとうございました', 'いじょうです'],
          ]}
        />
        <p className="text-sm leading-relaxed text-ink">
          A escala de frequência inteira, de cima para baixo:
        </p>
        <GrammarTable
          headers={['Japonês', 'Português', 'Verbo']}
          jpCols={[0]}
          rows={[
            ['いつも', 'sempre', 'afirmativo'],
            ['まいにち / まいあさ / まいばん', 'todo dia / toda manhã / toda noite', 'afirmativo'],
            ['たいてい', 'geralmente', 'afirmativo'],
            ['よく', 'com frequência', 'afirmativo'],
            ['ときどき', 'às vezes', 'afirmativo'],
            ['たまに', 'de vez em quando', 'afirmativo'],
            ['あまり', 'não muito, quase não', 'negativo'],
            ['ぜんぜん', 'nunca, de jeito nenhum', 'negativo'],
          ]}
        />
      </Section>
    </div>
  );
}
