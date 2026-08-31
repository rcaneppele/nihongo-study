import { Section, Ex, Note, GrammarTable, ReadingKey } from '../components/Licao';
import type { QuizLicao } from '../data/quiz/types';
import type { GrupoKakitori } from '../data/kakitori/types';

export const meta = {
  id: 'pronomes',
  title: 'Pronomes Pessoais',
  subtitle: 'わたし, ぼく, あなた e a arte de omiti-los',
  emoji: '👤',
  tags: ['gramática', 'n5'],
};

export const quiz: QuizLicao = {
  frases: [
    {
      id: 'pronomes-f1',
      tokens: [
        { texto: 'じぶん', romaji: 'jibun' },
        { texto: 'で', romaji: 'de', particula: true },
        { texto: 'やります', romaji: 'yarimasu' },
      ],
      pt: 'Faço eu mesmo.',
    },
    {
      id: 'pronomes-f2',
      tokens: [
        { texto: 'わたし', romaji: 'watashi' },
        { texto: 'が', romaji: 'ga', particula: true },
        { texto: 'いきます', romaji: 'ikimasu' },
      ],
      pt: 'Vou eu (e não outra pessoa).',
    },
    {
      id: 'pronomes-f3',
      tokens: [
        { texto: 'みなさん', romaji: 'minasan' },
        { texto: 'よろしい', romaji: 'yoroshii' },
        { texto: 'です', romaji: 'desu' },
        { texto: 'か', romaji: 'ka' },
      ],
      pt: 'Pessoal, tudo certo?',
    },
    {
      id: 'pronomes-f4',
      tokens: [
        { texto: 'たなかさん', romaji: 'tanaka-san' },
        { texto: 'は', romaji: 'wa' },
        { texto: 'コーヒー', romaji: 'koohii' },
        { texto: 'を', romaji: 'o', particula: true },
        { texto: 'のみます', romaji: 'nomimasu' },
        { texto: 'か', romaji: 'ka' },
      ],
      pt: '(Você,) sr. Tanaka, toma café?',
    },
    {
      id: 'pronomes-f5',
      tokens: [
        { texto: 'せんせい', romaji: 'sensei' },
        { texto: 'しつもん', romaji: 'shitsumon' },
        { texto: 'が', romaji: 'ga', particula: true },
        { texto: 'あります', romaji: 'arimasu' },
      ],
      pt: 'Professor, tenho uma pergunta.',
    },
    {
      id: 'pronomes-f6',
      tokens: [
        { texto: 'コーヒー', romaji: 'koohii' },
        { texto: 'が', romaji: 'ga', particula: true },
        { texto: 'すき', romaji: 'suki' },
        { texto: 'です', romaji: 'desu' },
      ],
      pt: 'Gosto de café.',
    },
    {
      id: 'pronomes-f7',
      tokens: [
        { texto: 'えいが', romaji: 'eiga' },
        { texto: 'を', romaji: 'o', particula: true },
        { texto: 'みました', romaji: 'mimashita' },
      ],
      pt: 'Assisti a um filme.',
    },
    {
      id: 'pronomes-f8',
      tokens: [
        { texto: 'あなた', romaji: 'anata' },
        { texto: 'の', romaji: 'no', particula: true },
        { texto: 'いけん', romaji: 'iken' },
        { texto: 'を', romaji: 'o', particula: true },
        { texto: 'おしえてください', romaji: 'oshiete kudasai' },
      ],
      pt: 'Conte-nos sua opinião.',
    },
    {
      id: 'pronomes-f9',
      tokens: [
        { texto: 'あのひと', romaji: 'ano hito' },
        { texto: 'は', romaji: 'wa', particula: true },
        { texto: 'だれ', romaji: 'dare' },
        { texto: 'です', romaji: 'desu' },
        { texto: 'か', romaji: 'ka' },
      ],
      pt: 'Quem é aquela pessoa?',
    },
  ],
  perguntas: [
    {
      id: 'pronomes-sig1',
      tipo: 'significado',
      pergunta: "Qual é o pronome mais seguro e neutro para 'eu' em qualquer situação?",
      alternativas: ['わたし', 'ぼく', 'おれ', 'あたし'],
      correta: 0,
    },
    {
      id: 'pronomes-sig2',
      tipo: 'significado',
      pergunta: 'O que significa じぶん?',
      alternativas: ['si mesmo / eu mesmo', 'você', 'aquela pessoa', 'todos'],
      correta: 0,
    },
    {
      id: 'pronomes-sig3',
      tipo: 'significado',
      pergunta: "Qual pronome de 'eu' é tipicamente masculino e casual/semiformal?",
      alternativas: ['ぼく', 'わたくし', 'あたし', 'うち'],
      correta: 0,
    },
    {
      id: 'pronomes-vf1',
      tipo: 'verdadeiro-falso',
      afirmacao: 'No japonês, é comum omitir o pronome quando o contexto já deixa claro quem é o sujeito.',
      correta: true,
    },
    {
      id: 'pronomes-vf2',
      tipo: 'verdadeiro-falso',
      afirmacao: "あなた é sempre a melhor forma de dizer 'você' em qualquer contexto.",
      correta: false,
      explicacao: 'Os japoneses preferem chamar a pessoa pelo nome + さん ou pelo cargo, evitando あなた.',
    },
    {
      id: 'pronomes-vf3',
      tipo: 'verdadeiro-falso',
      afirmacao: "かれ pode significar tanto 'ele' quanto 'namorado'.",
      correta: true,
    },
    {
      id: 'pronomes-vf4',
      tipo: 'verdadeiro-falso',
      afirmacao: "Incluir o pronome com a partícula が dá ênfase, como em 'fui eu (e não outra pessoa)'.",
      correta: true,
    },
    {
      id: 'pronomes-sig4',
      tipo: 'significado',
      pergunta: 'きみ (kimi) tipicamente flui em que direção?',
      alternativas: [
        'de quem tem mais status/idade para quem tem menos (professor→aluno, chefe→subordinado jovem)',
        'de quem tem menos status/idade para quem tem mais',
        'em qualquer direção, sem restrição',
        'só entre mulheres',
      ],
      correta: 0,
    },
    {
      id: 'pronomes-sig5',
      tipo: 'significado',
      pergunta: 'No dialeto de Kansai, じぶん pode assumir qual outro significado, fora do padrão de Tóquio?',
      alternativas: ['você', 'nós', 'aquela pessoa', 'todos'],
      correta: 0,
    },
    {
      id: 'pronomes-vf5',
      tipo: 'verdadeiro-falso',
      afirmacao: 'あなた nunca tem uso natural na fala ou escrita japonesa cotidiana.',
      correta: false,
      explicacao:
        'Tem usos legítimos, mas restritos: formulários e pesquisas dirigidos a um público desconhecido, letras de música e frases fixas, e tradicionalmente entre casais (esposa se dirigindo ao marido). Fora desses casos, o nome + さん continua sendo a escolha mais natural.',
    },
  ],
};

// Pronomes isolados pro ditado — em vez das `frases` do quiz acima (frases completas, longas
// demais pro Kakitori). O pronome sozinho já é a unidade de vocabulário desta lição.
export const kakitori: GrupoKakitori[] = [
  {
    id: 'pronomes-termos',
    label: meta.title,
    itens: [
      { id: 'pronomes-1', jp: 'わたし', kana: 'わたし', romaji: 'watashi', pt: 'eu (neutro, padrão)' },
      { id: 'pronomes-2', jp: 'わたくし', kana: 'わたくし', romaji: 'watakushi', pt: 'eu (muito formal)' },
      { id: 'pronomes-3', jp: 'ぼく', kana: 'ぼく', romaji: 'boku', pt: 'eu (masculino, casual a semiformal)' },
      { id: 'pronomes-4', jp: 'おれ', kana: 'おれ', romaji: 'ore', pt: 'eu (masculino, bem casual)' },
      { id: 'pronomes-5', jp: 'あたし', kana: 'あたし', romaji: 'atashi', pt: 'eu (feminino, casual)' },
      { id: 'pronomes-6', jp: 'うち', kana: 'うち', romaji: 'uchi', pt: 'eu (feminino, bem casual)' },
      { id: 'pronomes-7', jp: 'じぶん', kana: 'じぶん', romaji: 'jibun', pt: 'eu mesmo / si próprio' },
      { id: 'pronomes-8', jp: 'わたしたち', kana: 'わたしたち', romaji: 'watashitachi', pt: 'nós (neutro)' },
      { id: 'pronomes-9', jp: 'ぼくら', kana: 'ぼくら', romaji: 'bokura', pt: 'nós (masculino, casual)' },
      { id: 'pronomes-10', jp: 'あなた', kana: 'あなた', romaji: 'anata', pt: 'você (neutro/formal)' },
      { id: 'pronomes-11', jp: 'きみ', kana: 'きみ', romaji: 'kimi', pt: 'você (casual, de superior pra inferior)' },
      { id: 'pronomes-12', jp: 'おまえ', kana: 'おまえ', romaji: 'omae', pt: 'você (muito casual, pode soar rude)' },
      { id: 'pronomes-13', jp: 'あんた', kana: 'あんた', romaji: 'anta', pt: 'você (casual, meio rude)' },
      { id: 'pronomes-14', jp: 'かれ', kana: 'かれ', romaji: 'kare', pt: 'ele / namorado' },
      { id: 'pronomes-15', jp: 'かのじょ', kana: 'かのじょ', romaji: 'kanojo', pt: 'ela / namorada' },
      { id: 'pronomes-16', jp: 'あのひと', kana: 'あのひと', romaji: 'ano hito', pt: 'aquela pessoa (neutro)' },
      { id: 'pronomes-17', jp: 'あのかた', kana: 'あのかた', romaji: 'ano kata', pt: 'aquela pessoa (respeitoso)' },
      { id: 'pronomes-18', jp: 'みなさん', kana: 'みなさん', romaji: 'minasan', pt: 'pessoal / todos' },
    ],
  },
];

export default function Pronomes() {
  return (
    <div className="space-y-10">
      <Section title="Como ler esta lição">
        <p className="text-sm leading-relaxed text-ink">
          Cada pronome aparece com kanji (referência), leitura e romaji. As tabelas de
          vocabulário trazem o kanji como coluna extra — pode ignorá-la por enquanto. Como
          em toda lição, as frases de exemplo (<span className="font-jp">jp</span>) usam só
          hiragana/katakana, nunca kanji.
        </p>
        <ReadingKey
          lines={[
            { text: '私', desc: 'kanji (pode ignorar no começo)' },
            { text: 'わたし', desc: 'hiragana' },
            { text: 'watashi', desc: 'romaji' },
            { text: 'eu', desc: 'significado' },
          ]}
        />
      </Section>

      <Section title="Objetivos desta lição">
        <p className="text-sm leading-relaxed text-ink">Ao final, você deve saber:</p>
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink">
          <li>
            Reconhecer que, em japonês, <strong>omitir o pronome é o padrão</strong>, não uma
            exceção — e saber quando o contexto já deixa claro quem é o sujeito.
          </li>
          <li>
            Escolher a forma de "eu" certa para cada registro: <span className="font-jp">わたし</span>{' '}
            como escolha segura, e as demais (<span className="font-jp">ぼく</span>,{' '}
            <span className="font-jp">おれ</span>, <span className="font-jp">あたし</span>…)
            conforme gênero e formalidade.
          </li>
          <li>
            Entender por que <span className="font-jp">あなた</span> raramente é a melhor
            tradução de "você" — e o que os japoneses usam no lugar dela.
          </li>
          <li>
            Diferenciar <span className="font-jp">かれ</span>/<span className="font-jp">かのじょ</span>{' '}
            como "ele/ela" do outro significado que carregam, "namorado/namorada".
          </li>
          <li>
            Usar <span className="font-jp">が</span> junto do pronome para dar ênfase ("fui
            eu, não outra pessoa") quando isso realmente é necessário.
          </li>
        </ul>
      </Section>

      <Section title="Duas ideias centrais">
        <p className="text-sm leading-relaxed text-ink">
          Antes das listas, guarde duas ideias que valem para tudo nesta lição:
        </p>
        <ol className="list-decimal space-y-1.5 pl-5 text-sm leading-relaxed text-ink">
          <li>
            <strong>O japonês omite pronomes o tempo todo.</strong> Numa resposta de
            entrevista, num pedido de restaurante, numa ligação de telefone — sempre que o
            contexto já deixa claro quem fala ou de quem se fala, o pronome simplesmente
            some. Isso é o normal, não a exceção.
          </li>
          <li>
            <strong>Existem vários pronomes para "eu" e "você".</strong> Eles mudam conforme
            formalidade, gênero e até personalidade. Escolher o errado pode soar estranho ou
            grosseiro.
          </li>
        </ol>
        <p className="text-sm leading-relaxed text-ink">
          Isso é bem diferente do português, onde "eu" e "você" são escolhas neutras e
          universais, usadas sem pensar duas vezes. Em japonês, cada pronome carrega uma
          pista de quem fala — e o pronome de segunda pessoa, em especial, pode soar mais
          direto do que a situação pede. Como você viu na lição de Sufixos de Respeito, boa
          parte disso se resolve chamando as pessoas pelo nome + <span className="font-jp">さん</span>.
          Esta lição cobre a outra metade: os pronomes propriamente ditos, e a arte de saber
          quando não usar nenhum.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          Por isso, a regra de ouro para iniciantes é: use{' '}
          <strong className="font-jp">わたし</strong> para "eu" e <strong>evite</strong> dizer
          "você" (veja como mais adiante).
        </p>
        <Note>
          Fora do escopo desta lição: as formas verbais humildes/respeitosas (
          <span className="font-jp">けんじょうご</span>/<span className="font-jp">そんけいご</span>,
          vistas em Auto-apresentação) e os próprios sufixos honoríficos (
          <span className="font-jp">さん</span>, <span className="font-jp">せんせい</span> etc.,
          cobertos em Sufixos de Respeito). Aqui o foco são só os pronomes — quando usá-los,
          quais existem, e sobretudo quando evitá-los.
        </Note>
      </Section>

      <Section title="Primeira pessoa — 'eu'">
        <GrammarTable
          headers={['Kanji', 'Hiragana', 'Romaji', 'Gênero / registro', 'Quando usar']}
          jpCols={[0, 1]}
          rows={[
            ['私', 'わたし', 'watashi', 'neutro / padrão', 'O mais versátil. Seguro em qualquer situação.'],
            ['私', 'わたくし', 'watakushi', 'neutro / muito formal', 'Discursos, negócios de alto nível.'],
            ['僕', 'ぼく', 'boku', 'masculino / casual a semiformal', 'Homens, situações informais ou semiformais.'],
            ['俺', 'おれ', 'ore', 'masculino / casual, pode soar rude', 'Entre amigos próximos. Evite em contexto formal.'],
            ['—', 'あたし', 'atashi', 'feminino / casual', 'Mulheres em conversa informal.'],
            ['—', 'うち', 'uchi', 'feminino / bem casual', 'Dialeto de Kansai e cultura pop.'],
          ]}
        />
        <Ex
          jp="わたしはこのかいしゃではたらいています。"
          romaji="watashi wa kono kaisha de hataraite imasu."
          pt="Eu trabalho nesta empresa."
          notes="わたし — seguro em qualquer situação, formal ou informal."
        />
        <Ex
          jp="ぼくもいっしょにいきます。"
          romaji="boku mo issho ni ikimasu."
          pt="Eu também vou junto."
          notes="ぼく — masculino, casual a semiformal; comum entre homens jovens e em ambientes de trabalho descontraídos."
        />
        <Ex
          jp="おれ、さきにかえるね。"
          romaji="ore, saki ni kaeru ne."
          pt="Eu vou voltar primeiro, viu."
          notes="おれ — bem casual, majoritariamente masculino; reconheça antes de usar (ver nota abaixo)."
        />
        <Note>
          <strong>Aprofundamento:</strong> pronomes marcados por gênero e registro forte —{' '}
          <span className="font-jp">ぼく</span>, <span className="font-jp">おれ</span>{' '}
          (masculinos) e <span className="font-jp">あたし</span>, <span className="font-jp">うち</span>{' '}
          (femininos) — valem primeiro para <strong>reconhecer</strong>, não para produzir.
          Você vai ouvi-los o tempo todo em conversas reais, mas{' '}
          <span className="font-jp">わたし</span> continua sendo a escolha segura para o seu
          próprio uso, em qualquer situação, até você ter certeza do ambiente e da imagem que
          quer passar.
        </Note>
      </Section>

      <Section title="'Nós' — as formas plurais">
        <p className="text-sm leading-relaxed text-ink">
          Para formar o plural, junta-se um sufixo ao pronome.{' '}
          <span className="font-jp">たち</span> é mais respeitoso; <span className="font-jp">ら</span>{' '}
          é mais casual.
        </p>
        <GrammarTable
          headers={['Hiragana', 'Romaji', 'Formação', 'Registro']}
          jpCols={[0, 2]}
          rows={[
            ['わたしたち', 'watashitachi', 'わたし + たち', 'neutro, padrão'],
            ['わたしども', 'watashidomo', 'わたし + ども', 'muito formal, humilde'],
            ['ぼくたち / ぼくら', 'bokutachi / bokura', 'ぼく + たち / ら', 'masculino casual'],
            ['おれたち / おれら', 'oretachi / orera', 'おれ + たち / ら', 'masculino, muito casual'],
            ['あたしたち', 'atashitachi', 'あたし + たち', 'feminino casual'],
          ]}
        />
        <Ex
          jp="ぼくらもさんかします。"
          romaji="bokura mo sanka shimasu."
          pt="Nós também vamos participar."
          notes="ら — mais casual que たち; comum entre homens jovens."
        />
      </Section>

      <Section title="Segunda pessoa — 'você'">
        <p className="text-sm leading-relaxed text-ink">
          Diferente do português, em que "você" é neutro e universal, em japonês apontar um
          pronome diretamente para a pessoa à sua frente carrega peso — soa mais íntimo, mais
          hierárquico ou mais frio do que a mesma frase sem pronome nenhum. Por isso quase
          toda forma de "você" tem alguma restrição de uso, e a mais "correta" do livro
          didático (<span className="font-jp">あなた</span>) é justamente uma das mais
          arriscadas na prática. Isso aparece toda vez que você for traduzir "você"
          automaticamente, do jeito que faria em português.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          Como você viu na lição de Sufixos de Respeito, o japonês resolve grande parte disso
          chamando a pessoa pelo nome + <span className="font-jp">さん</span> (ou o cargo
          dela). Aqui tratamos os pronomes de segunda pessoa em si — para as poucas vezes em
          que você realmente precisa de um.
        </p>
        <GrammarTable
          headers={['Kanji', 'Hiragana', 'Romaji', 'Registro', 'Atenção']}
          jpCols={[0, 1]}
          rows={[
            [
              '貴方',
              'あなた',
              'anata',
              'neutro / formal',
              'Correto, mas raro entre iguais; pode soar distante. Tem usos legítimos restritos — veja nota abaixo.',
            ],
            ['君', 'きみ', 'kimi', 'casual, de superior para inferior', 'Professor com aluno, chefe com subordinado. Comum em músicas.'],
            ['—', 'おまえ', 'omae', 'muito casual, rude', 'Entre íntimos. Pode ofender se mal usado.'],
            ['—', 'あんた', 'anta', 'casual, meio rude', 'Versão informal de あなた. Pode soar brusco.'],
            ['—', 'そちら', 'sochira', 'muito formal', '"Você" educado, em atendimento formal.'],
          ]}
        />
        <Note>
          <strong>A melhor prática dos japoneses: não usar "você".</strong> Em vez disso, chamam a
          pessoa pelo <strong>nome + <span className="font-jp">さん</span></strong> ou pelo{' '}
          <strong>cargo/título</strong> (<span className="font-jp">ぶちょう</span>,{' '}
          <span className="font-jp">せんせい</span>, etc.). E, muitas vezes, simplesmente{' '}
          <strong>omitem</strong> o pronome.
        </Note>
        <Ex
          jp="たなかさんはコーヒーをのみますか？"
          romaji="tanaka-san wa koohii o nomimasu ka?"
          pt="(Você,) sr. Tanaka, toma café?"
          notes="Muito mais natural do que usar あなた. Chama-se a pessoa pelo nome."
        />
        <Ex
          jp="せんせい、しつもんがあります。"
          romaji="sensei, shitsumon ga arimasu."
          pt="Professor, tenho uma pergunta."
          notes="O professor é chamado pelo título せんせい, nunca por あなた."
        />
        <Ex
          jp="きみはどうおもう？"
          romaji="kimi wa dou omou?"
          pt="O que você acha?"
          notes="きみ dito por um professor a um aluno — flui só de superior para inferior, nunca ao contrário."
        />
        <Ex
          jp="あなたのいけんをおしえてください。"
          romaji="anata no iken o oshiete kudasai."
          pt="Conte-nos sua opinião."
          notes="formulário/pesquisa dirigido a um público desconhecido — um dos poucos contextos em que あなた soa neutro."
        />
        <Note>
          Apesar do conselho geral de evitar <span className="font-jp">あなた</span>, ela tem
          usos legítimos e restritos: em <strong>formulários e pesquisas</strong> (como no
          exemplo acima), em <strong>letras de música e frases fixas</strong>, e
          tradicionalmente entre <strong>casais</strong> — esposas se dirigindo ao marido com{' '}
          <span className="font-jp">あなた</span> como forma carinhosa. Fora desses casos,
          ouvir あなた de um estranho, de frente, ainda soa mais formal e distante do que o
          nome da pessoa.
        </Note>
      </Section>

      <Section title="'Vocês / todos' — plurais da segunda pessoa">
        <p className="text-sm leading-relaxed text-ink">
          Para se dirigir a um grupo, vale o mesmo cuidado da segunda pessoa no singular:{' '}
          <span className="font-jp">みなさん</span> é o jeito seguro e mais comum de dizer
          "vocês"/"pessoal", sem apontar pronome nenhum diretamente para ninguém.
        </p>
        <GrammarTable
          headers={['Hiragana', 'Romaji', 'Registro', 'Uso']}
          jpCols={[0]}
          rows={[
            ['みなさん', 'minasan', 'neutro / semiformal', 'O mais comum: "pessoal", "todos".'],
            ['みなさま', 'minasama', 'muito formal', 'Cerimônias, discursos, anúncios.'],
            ['あなたたち', 'anatatachi', 'neutro', 'Raro na fala; mais na escrita.'],
            ['きみたち', 'kimitachi', 'casual, de superior para inferior', 'Professor com a turma, técnico com o time.'],
            ['みんな', 'minna', 'casual', '"Todo mundo", conversa do dia a dia.'],
          ]}
        />
        <Ex
          jp="みなさん、よろしいですか？"
          romaji="minasan, yoroshii desu ka?"
          pt="Pessoal, tudo certo? (Posso começar?)"
          notes={`みなさん é o jeito seguro de dizer "vocês" para um grupo.`}
        />
      </Section>

      <Section title="Terceira pessoa — 'ele / ela'">
        <p className="text-sm leading-relaxed text-ink">
          Aqui também há armadilha: <span className="font-jp">かれ</span> e{' '}
          <span className="font-jp">かのじょ</span> significam "ele"/"ela", mas em contextos de
          relacionamento significam "namorado"/"namorada" — a ambiguidade só desaparece pelo
          assunto da conversa. Por isso, para simplesmente identificar alguém sem ambiguidade,
          o japonês prefere <span className="font-jp">あのひと</span>.
        </p>
        <GrammarTable
          headers={['Kanji', 'Hiragana', 'Romaji', 'Significado', 'Atenção']}
          jpCols={[0, 1]}
          rows={[
            ['彼', 'かれ', 'kare', 'ele', 'Também significa "namorado". Cuidado com a ambiguidade.'],
            ['彼女', 'かのじょ', 'kanojo', 'ela', 'Também significa "namorada".'],
            ['—', 'あのひと', 'ano hito', 'aquela pessoa', 'Neutro e natural. Não indica gênero.'],
            ['—', 'あのかた', 'ano kata', 'aquela pessoa (respeitoso)', 'Versão formal de あのひと.'],
            ['—', 'あいつ', 'aitsu', 'aquele (rude)', 'Informal, meio depreciativo.'],
          ]}
        />
        <Ex
          jp="あのひとはだれですか？"
          romaji="ano hito wa dare desu ka?"
          pt="Quem é aquela pessoa?"
          notes="あのひと — neutro, sem ambiguidade. O あの é o mesmo da lição de Ko-So-A-Do."
        />
        <Ex
          jp="かれとりょこうにいきました。"
          romaji="kare to ryokou ni ikimashita."
          pt="Fui viajar com meu namorado."
          notes="aqui かれ significa 'namorado' — o assunto (relacionamento) resolve a ambiguidade."
        />
        <Ex
          jp="かのじょはえいごをおしえています。"
          romaji="kanojo wa eigo o oshiete imasu."
          pt="Ela dá aulas de inglês."
          notes="aqui かのじょ é só 'ela' — o contexto profissional deixa claro que não é sobre namoro."
        />
        <Note>
          <span className="font-jp">かれ</span> e <span className="font-jp">かのじょ</span>{' '}
          costumam ser <strong>evitados</strong> como "ele/ela" justamente por essa
          ambiguidade. Para se referir a alguém sem risco de confusão, os japoneses preferem o
          nome, ou <span className="font-jp">あのひと</span> / <span className="font-jp">あのかた</span>.
        </Note>
      </Section>

      <Section title="じぶん — 'si mesmo'">
        <p className="text-sm leading-relaxed text-ink">
          <strong className="font-jp">じぶん</strong> (<span className="font-jp">自分</span>,{' '}
          <em>jibun</em>) é o pronome reflexivo. Significa "si mesmo, eu mesmo, você mesmo",
          conforme o contexto. É ótimo para evitar confusão com pronomes de pessoa.
        </p>
        <Ex jp="じぶんでやります。" romaji="jibun de yarimasu." pt="Faço eu mesmo. / Faço por conta própria." />
        <Ex
          jp="じぶんでかんがえてください。"
          romaji="jibun de kangaete kudasai."
          pt="Pense por si mesmo, por favor."
          notes="professor incentivando o aluno a pensar sozinho — situação comum em sala de aula."
        />
        <Ex
          jp="かれはじぶんのことしかかんがえない。"
          romaji="kare wa jibun no koto shika kangaenai."
          pt="Ele só pensa em si mesmo."
          notes={`Aqui じぶん se refere a "ele". Note o しか + verbo negativo (visto na lição de partículas).`}
        />
        <Note>
          No dialeto de Kansai, <span className="font-jp">じぶん</span> às vezes vira "você", o que
          confunde muita gente. Fora de Kansai, não use <span className="font-jp">じぶん</span>{' '}
          como "você".
        </Note>
      </Section>

      <Section title="A omissão de pronomes — o princípio mais importante">
        <p className="text-sm leading-relaxed text-ink">
          Quando o contexto deixa claro quem é o sujeito, o pronome <strong>desaparece</strong>.
          Usar pronome demais soa como um robô lendo um livro didático.
        </p>
        <GrammarTable
          headers={['Com pronome (soa artificial)', 'Sem pronome (natural)', 'Tradução']}
          jpCols={[0, 1]}
          rows={[
            ['わたしはコーヒーがすきです。', 'コーヒーがすきです。', 'Gosto de café.'],
            ['あなたはどうおもいますか？', 'どうおもいますか？', 'O que você acha?'],
            ['わたしはたなかです。', 'たなかです。', 'Sou Tanaka.'],
          ]}
        />
        <Ex
          jp="A：きのう、なにをしましたか？　B：えいがをみました。"
          romaji="A: kinou, nani o shimashita ka? B: eiga o mimashita."
          pt="A: O que você fez ontem? B: Assisti a um filme."
          notes={`B não precisa dizer "eu": o contexto já diz que é ele.`}
        />
        <Ex
          jp="コーヒーをおねがいします。"
          romaji="koohii o onegaishimasu."
          pt="Um café, por favor."
          notes={`no konbini/café, "eu quero" nunca precisa ser dito — o pedido já deixa claro quem fala`}
        />
        <Ex
          jp="がくせいです。だいがくでけいざいをべんきょうしています。"
          romaji="gakusei desu. daigaku de keizai o benkyou shite imasu."
          pt="Sou estudante. Estudo economia na faculdade."
          notes="resposta típica de auto-apresentação/entrevista, sem nenhum わたし — e ainda assim natural"
        />
      </Section>

      <Section title="Quando incluir o pronome (para dar ênfase)">
        <p className="text-sm leading-relaxed text-ink">
          Incluir o pronome não é errado: é <strong>enfático</strong>.{' '}
          <span className="font-jp">わたしが</span> significa "eu (e não outra pessoa)".
        </p>
        <Ex
          jp="わたしがいきます。"
          romaji="watashi ga ikimasu."
          pt="Vou eu (e não outra pessoa)."
          notes="が com pronome dá esse destaque forte em quem faz."
        />
        <Ex
          jp="いいえ、わたしがやりました。"
          romaji="iie, watashi ga yarimashita."
          pt="Não, fui eu que fiz."
          notes="が com pronome também serve para reivindicar autoria/responsabilidade, corrigindo uma suposição errada."
        />
        <Ex
          jp="わたしはコーヒー、あなたはこうちゃね。"
          romaji="watashi wa koohii, anata wa koucha ne."
          pt="Eu vou de café, você de chá, né?"
          notes="Aqui há contraste (は), então os pronomes são necessários."
        />
      </Section>

      <Section title="Nota cultural: o que a escolha do pronome diz sobre você">
        <p className="text-sm leading-relaxed text-ink">
          Em português, "eu" e "você" são neutros: não dizem nada sobre quem fala, além do
          óbvio. Em japonês, cada pronome de primeira ou segunda pessoa carrega uma pista de
          gênero, idade, personalidade ou proximidade — escolher errado não é só um erro
          gramatical, é uma escolha de <strong>autoimagem</strong> ou de{' '}
          <strong>quão perto você está assumindo estar</strong> de alguém.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          Por isso a estratégia mais segura não é "decorar o pronome certo para cada
          situação" — é, na dúvida, <strong>não usar pronome nenhum</strong> (deixar o
          contexto falar) ou recorrer a <span className="font-jp">わたし</span>/nome +{' '}
          <span className="font-jp">さん</span>. Essa é uma escolha real: errar para o lado
          neutro nunca soa mal; escolher um pronome forte demais (<span className="font-jp">おれ</span>{' '}
          num contexto formal, <span className="font-jp">あなた</span> olhando nos olhos de
          um superior) pode soar presunçoso mesmo com boa intenção.
        </p>
      </Section>

      <Section title="Pronomes no anime vs. na vida real">
        <p className="text-sm leading-relaxed text-ink">
          O anime exagera certos pronomes para dar personalidade aos personagens. Saber disso
          evita que você soe como um personagem fictício.
        </p>
        <GrammarTable
          headers={['Pronome', 'No anime', 'Na vida real']}
          jpCols={[0]}
          rows={[
            ['おれ', 'heróis "durões"', 'homens em conversa casual entre amigos'],
            ['ぼく', 'garotos tímidos ou intelectuais', 'homens jovens, situações semiformais'],
            ['わたし', 'vilões elegantes, personagens sérios', 'o pronome mais usado no dia a dia'],
            [
              <>
                きさま (<em>kisama</em>)
              </>,
              '"Seu miserável!", vilão com raiva',
              'praticamente não existe na fala real',
            ],
          ]}
        />
        <Note>
          Se você aprendeu japonês por anime, atenção: <span className="font-jp">おれ</span> e{' '}
          <span className="font-jp">きみ</span> podem soar estranhos na vida real. Comece com{' '}
          <span className="font-jp">わたし</span> e observe quais pronomes as pessoas ao seu redor
          usam.
        </Note>
      </Section>

      <Section title="Pronomes históricos e literários">
        <p className="text-sm leading-relaxed text-ink">
          Aparecem em literatura clássica, RPGs, dramas de época. Não se usam no japonês moderno
          do dia a dia. Estão aqui só para reconhecimento.
        </p>
        <GrammarTable
          headers={['Hiragana', 'Romaji', 'Significado', 'Onde aparece']}
          jpCols={[0]}
          rows={[
            ['われ', 'ware', 'eu (literário)', 'poesia clássica, discursos solenes, RPGs'],
            [
              'わが',
              'waga',
              'meu / nosso (literário)',
              <>
                <span className="font-jp">わがくに</span> (meu país),{' '}
                <span className="font-jp">わがや</span> (minha casa)
              </>,
            ],
            ['そなた', 'sonata', 'você (arcaico, respeitoso)', 'dramas históricos'],
            ['なんじ', 'nanji', 'você (arcaico, solene)', 'textos religiosos ou antigos'],
            ['せっしゃ', 'sessha', 'eu (de samurai)', 'dramas de época'],
          ]}
        />
      </Section>

      <Section title="Erros comuns">
        <GrammarTable
          headers={['Erro', 'Incorreto', 'Correto / melhor', 'Por quê']}
          jpCols={[1, 2]}
          rows={[
            [
              'Usar pronomes demais',
              'わたしはコーヒーがわたしはすきです。',
              'コーヒーがすきです。',
              'Repetir pronome soa robótico; omita quando o contexto é claro.',
            ],
            [
              <>
                Usar <span className="font-jp">おれ</span> no trabalho
              </>,
              'Numa reunião: おれはそうおもいます。',
              'わたしはそうおもいます。',
              <>
                <span className="font-jp">おれ</span> é casual e pode soar rude num contexto
                profissional.
              </>,
            ],
            [
              <>
                Usar <span className="font-jp">あなた</span> com um superior
              </>,
              'あなたはどうおもいますか、ぶちょう？',
              'ぶちょうはどうおもいますか？',
              <>
                Com superiores, use o cargo ou nome + <span className="font-jp">さん</span>, nunca{' '}
                <span className="font-jp">あなた</span>.
              </>,
            ],
            [
              <>
                Confundir <span className="font-jp">かれ</span> "ele" com "namorado"
              </>,
              'かれはだれですか？ (querendo dizer "quem é ele?")',
              'あのひとはだれですか？',
              <>
                <span className="font-jp">かれ</span> dá a ideia de "namorado";{' '}
                <span className="font-jp">あのひと</span> é neutro.
              </>,
            ],
            [
              <>
                Usar <span className="font-jp">きみ</span> com superior ou desconhecido
              </>,
              'せんせい、きみはどうおもいますか？ (aluno para o professor)',
              'せんせい、どうおもいますか？',
              <>
                <span className="font-jp">きみ</span> só flui de quem tem mais status/idade
                para quem tem menos; usado ao contrário soa estranho ou deselegante.
              </>,
            ],
          ]}
        />
      </Section>

      <Section title="Resumo rápido">
        <GrammarTable
          headers={['Quero dizer...', 'Use (padrão seguro)']}
          jpCols={[1]}
          rows={[
            ['eu', 'わたし'],
            [
              'você',
              <>
                o nome da pessoa + <span className="font-jp">さん</span> (ou omita)
              </>,
            ],
            [
              'você (formulário/pesquisa)',
              <span className="font-jp">あなた</span>,
            ],
            ['nós', 'わたしたち'],
            ['todos / pessoal', 'みなさん'],
            ['aquela pessoa (ele/ela, neutro)', 'あのひと'],
            [
              'namorado(a)',
              <>
                <span className="font-jp">かれ</span> / <span className="font-jp">かのじょ</span>
              </>,
            ],
            ['eu mesmo / si mesmo', 'じぶん'],
          ]}
        />
      </Section>
    </div>
  );
}
