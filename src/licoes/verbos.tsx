import { Section, Ex, Note, GrammarTable, ReadingKey } from '../components/Licao';
import type { QuizLicao } from '../data/quiz/types';

export const meta = {
  id: 'verbos',
  title: 'Verbos',
  subtitle: 'Os três grupos, presente e passado (afirmativo e negativo) e a forma て',
  emoji: '🏃',
  tags: ['gramática', 'n5'],
};

export const quiz: QuizLicao = {
  frases: [
    {
      id: 'verbos-f1',
      tokens: [
        { texto: 'まいにち', romaji: 'mainichi' },
        { texto: 'みず', romaji: 'mizu' },
        { texto: 'を', romaji: 'o', particula: true },
        { texto: 'のむ', romaji: 'nomu' },
      ],
      pt: 'Bebo água todo dia.',
    },
    {
      id: 'verbos-f2',
      tokens: [
        { texto: 'まいあさ', romaji: 'maiasa' },
        { texto: 'コーヒー', romaji: 'koohii' },
        { texto: 'を', romaji: 'o', particula: true },
        { texto: 'のみます', romaji: 'nomimasu' },
      ],
      pt: 'Bebo café toda manhã.',
    },
    {
      id: 'verbos-f3',
      tokens: [
        { texto: 'けさ', romaji: 'kesa' },
        { texto: 'は', romaji: 'wa', particula: true },
        { texto: 'なにも', romaji: 'nani mo' },
        { texto: 'たべませんでした', romaji: 'tabemasen deshita' },
      ],
      pt: 'Não comi nada hoje de manhã.',
    },
    {
      id: 'verbos-f4',
      tokens: [
        { texto: 'きのう', romaji: 'kinou' },
        { texto: 'こうえん', romaji: 'kouen' },
        { texto: 'まで', romaji: 'made', particula: true },
        { texto: 'はしりました', romaji: 'hashirimashita' },
      ],
      pt: 'Ontem corri até o parque.',
    },
    {
      id: 'verbos-f5',
      tokens: [
        { texto: 'ちょっと', romaji: 'chotto' },
        { texto: 'まって', romaji: 'matte' },
        { texto: 'ください', romaji: 'kudasai' },
      ],
      pt: 'Espere um pouco, por favor.',
    },
    {
      id: 'verbos-f6',
      tokens: [
        { texto: 'なっとう', romaji: 'nattou' },
        { texto: 'は', romaji: 'wa', particula: true },
        { texto: 'たべない', romaji: 'tabenai' },
      ],
      pt: 'Não como natto.',
    },
    {
      id: 'verbos-f7',
      tokens: [
        { texto: 'あした', romaji: 'ashita' },
        { texto: 'は', romaji: 'wa' },
        { texto: 'がっこう', romaji: 'gakkou' },
        { texto: 'に', romaji: 'ni', particula: true },
        { texto: 'いかない', romaji: 'ikanai' },
      ],
      pt: 'Amanhã não vou à escola.',
    },
    {
      id: 'verbos-f8',
      tokens: [
        { texto: 'きのう', romaji: 'kinou' },
        { texto: 'ともだち', romaji: 'tomodachi' },
        { texto: 'と', romaji: 'to', particula: true },
        { texto: 'はなした', romaji: 'hanashita' },
      ],
      pt: 'Ontem conversei com um amigo.',
    },
    {
      id: 'verbos-f9',
      tokens: [
        { texto: 'にほん', romaji: 'nihon' },
        { texto: 'に', romaji: 'ni', particula: true },
        { texto: 'いった', romaji: 'itta' },
      ],
      pt: 'Fui ao Japão.',
    },
    {
      id: 'verbos-f10',
      tokens: [
        { texto: 'まいにち', romaji: 'mainichi' },
        { texto: 'にほんご', romaji: 'nihongo' },
        { texto: 'を', romaji: 'o', particula: true },
        { texto: 'べんきょうします', romaji: 'benkyou shimasu' },
      ],
      pt: 'Estudo japonês todo dia.',
    },
    {
      id: 'verbos-f12',
      tokens: [
        { texto: 'いっしょに', romaji: 'issho ni' },
        { texto: 'ひるごはん', romaji: 'hirugohan' },
        { texto: 'を', romaji: 'o', particula: true },
        { texto: 'たべませんか', romaji: 'tabemasen ka' },
      ],
      pt: 'Vamos almoçar juntos? (convite)',
    },
    {
      id: 'verbos-f11',
      tokens: [
        { texto: 'きのう', romaji: 'kinou' },
        { texto: 'は', romaji: 'wa', particula: true },
        { texto: 'なにも', romaji: 'nani mo' },
        { texto: 'たべなかった', romaji: 'tabenakatta' },
      ],
      pt: 'Não comi nada ontem. (casual)',
    },
  ],
  perguntas: [
    {
      id: 'verbos-conj1',
      tipo: 'significado',
      pergunta: 'Qual é a forma て de たべる (comer)?',
      alternativas: ['たべて', 'たべった', 'たべんで', 'たべいて'],
      correta: 0,
    },
    {
      id: 'verbos-conj2',
      tipo: 'significado',
      pergunta: 'Qual é a forma て de のむ (beber)?',
      alternativas: ['のんで', 'のいて', 'のって', 'のした'],
      correta: 0,
      explicacao: 'Verbos terminados em ぬ, ぶ, む viram んで na forma て.',
    },
    {
      id: 'verbos-conj3',
      tipo: 'significado',
      pergunta: 'Qual é a forma ない (negativa casual) de かう (comprar)?',
      alternativas: ['かわない', 'かあない', 'かいない', 'からない'],
      correta: 0,
      explicacao: 'Verbos terminados em う usam わ (não あ) na forma ない: かう → かわない.',
    },
    {
      id: 'verbos-conj4',
      tipo: 'significado',
      pergunta: 'Qual é o passado casual (た) de いく (ir)? Atenção: é uma exceção.',
      alternativas: ['いった', 'いいた', 'いた', 'いきた'],
      correta: 0,
      explicacao: 'いく é a única exceção da regra く → いて/いた: vira いって/いった.',
    },
    {
      id: 'verbos-conj5',
      tipo: 'significado',
      pergunta: 'かえる (voltar) parece Grupo 2, mas é Grupo 1. Qual é a forma ます correta?',
      alternativas: ['かえります', 'かえます', 'かえるます', 'かえりします'],
      correta: 0,
      explicacao: 'かえる é Grupo 1 "disfarçado" — a base é かえり (る → り), não かえ.',
    },
    {
      id: 'verbos-sig1',
      tipo: 'significado',
      pergunta: 'Em qual grupo estão os verbos terminados em -iru ou -eru (a maioria deles)?',
      alternativas: ['Grupo 2 (いちだんどうし)', 'Grupo 1 (ごだんどうし)', 'Grupo 3 (irregulares)', 'Nenhum dos três'],
      correta: 0,
    },
    {
      id: 'verbos-conj6',
      tipo: 'significado',
      pergunta: 'Qual é o passado negativo casual (なかった) de のむ (beber)?',
      alternativas: ['のまなかった', 'のみなかった', 'のんでなかった', 'のまませんでした'],
      correta: 0,
      explicacao: 'Parte da forma ない (のまない) e troca い por かった: のまなかった.',
    },
    {
      id: 'verbos-conj7',
      tipo: 'significado',
      pergunta: 'いる (no sentido de "precisar") é um verbo Grupo 1 disfarçado. Qual é a sua forma negativa casual (ない)?',
      alternativas: ['いらない', 'いない', 'いんない', 'いにない'],
      correta: 0,
      explicacao:
        'いる (precisar) é Grupo 1: vira いらない. Já いる (existir/estar) é Grupo 2 e vira いない — mesma grafia, verbos diferentes.',
    },
    {
      id: 'verbos-vf1',
      tipo: 'verdadeiro-falso',
      afirmacao: 'する e くる são os dois únicos verbos irregulares (Grupo 3) do japonês.',
      correta: true,
    },
    {
      id: 'verbos-vf2',
      tipo: 'verdadeiro-falso',
      afirmacao: 'O verbo japonês muda de forma conforme quem é o sujeito (eu, você, eles).',
      correta: false,
      explicacao: 'O verbo não muda conforme a pessoa; たべます serve para eu, você e eles.',
    },
    {
      id: 'verbos-vf3',
      tipo: 'verdadeiro-falso',
      afirmacao: 'A negativa de ある (haver) é あらない.',
      correta: false,
      explicacao: 'ある é irregular: a negativa é só ない.',
    },
    {
      id: 'verbos-vf4',
      tipo: 'verdadeiro-falso',
      afirmacao: 'たべないでした é a forma correta de dizer "não comi" no passado casual.',
      correta: false,
      explicacao:
        'ない funciona como um adjetivo -い: a forma correta troca い por かった — たべなかった. でした não se junta a ない.',
    },
    {
      id: 'verbos-sig2',
      tipo: 'significado',
      pergunta: 'Como dizer "Estou comendo agora"?',
      alternativas: ['いま、たべています', 'いま、たべます', 'いま、たべました', 'いま、たべる'],
      correta: 0,
      explicacao: 'O presente (たべます/たべる) é hábito ou futuro: いま、たべます soa como "vou comer agora". Ação em andamento é 〜ています.',
    },
    {
      id: 'verbos-sig3',
      tipo: 'significado',
      pergunta: 'Um colega pergunta もうひるごはんをたべましたか？ e você ainda vai almoçar. Qual resposta é a natural?',
      alternativas: ['いいえ、まだです', 'いいえ、たべませんでした', 'いいえ、たべません', 'いいえ、たべないでした'],
      correta: 0,
      explicacao: 'たべませんでした soa como "não almocei (e a ocasião passou)". "Ainda não" pede まだ: まだです ou まだたべていません.',
    },
    {
      id: 'verbos-vf5',
      tipo: 'verdadeiro-falso',
      afirmacao: 'いっしょにたべませんか？ pergunta se a outra pessoa costuma não comer junto.',
      correta: false,
      explicacao: 'Negativa + か é convite: "vamos comer juntos?". Para perguntar sobre hábito, usa-se a afirmativa: たべますか？',
    },
    {
      id: 'verbos-vf6',
      tipo: 'verdadeiro-falso',
      afirmacao: 'たべないです é uma forma educada de "não como", comum na conversa do dia a dia.',
      correta: true,
      explicacao: 'É educada e muito ouvida na fala; たべません continua sendo a forma de referência para situações formais.',
    },
    {
      id: 'verbos-vf7',
      tipo: 'verdadeiro-falso',
      afirmacao: 'こどものころ、まいにちあそびました pode significar "quando criança, eu brincava todo dia".',
      correta: true,
      explicacao: 'ました cobre tanto "brinquei" quanto "brincava" — o japonês não faz essa distinção no verbo.',
    },
  ],
};

// Sem `kakitori`: um verbo conjugado sozinho, fora de contexto, não é um item de vocabulário útil
// pra memorizar de ouvido — é só uma forma gramatical. O ditado desta lição foi removido.

export default function Verbos() {
  return (
    <div className="space-y-10">
      <Section title="Como ler esta lição">
        <p className="text-sm leading-relaxed text-ink">
          Aqui, todos os verbos aparecem em hiragana + romaji. Não usamos kanji de propósito: as
          regras de conjugação são regras de <strong>som</strong>, e o hiragana mostra o som
          direto. Palavras de origem estrangeira (コーヒー, バス) aparecem em katakana, como em
          qualquer texto japonês.
        </p>
        <ReadingKey
          lines={[
            { text: 'たべる', desc: 'hiragana' },
            { text: 'taberu', desc: 'romaji' },
            { text: 'comer', desc: 'significado' },
            { text: 'コーヒー', desc: 'katakana (palavras estrangeiras)' },
          ]}
        />
        <p className="text-sm leading-relaxed text-ink">
          Nas tabelas de cada tempo, "Educada (padrão)" é a forma de referência, segura em
          qualquer situação formal; "Educada (fala do dia a dia)" é a variante educada que mais
          se ouve em conversa; "Casual" é para amigos e família. O símbolo 〜 marca onde entra o
          verbo.
        </p>
      </Section>

      <Section title="Objetivos desta lição">
        <p className="text-sm leading-relaxed text-ink">
          Verbos são o coração da frase japonesa: quase tudo (ação, estado, pedido, permissão)
          passa por eles. É um assunto grande, e esta lição não tenta cobrir tudo de uma vez — o
          objetivo é uma <strong>base sólida</strong> para funcionar no dia a dia: pedir algo num
          restaurante, contar o que você fez ontem, dizer o que vai fazer amanhã.
        </p>
        <p className="text-sm leading-relaxed text-ink">Ao final, você deve saber:</p>
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink">
          <li>
            Reconhecer o <strong>grupo</strong> de um verbo (1, 2 ou 3) e montar a base certa
            para conjugá-lo — inclusive os "disfarçados" que parecem Grupo 2 mas não são.
          </li>
          <li>
            Usar os <strong>quatro cenários</strong> — presente/passado, afirmativo/negativo —
            nas duas trilhas: ます / ません / ました / ませんでした e dicionário / ない / た /
            なかった, incluindo as variantes da fala ないです e なかったです.
          </li>
          <li>
            Saber que o presente japonês é hábito ou futuro (não "estou comendo"), e que "ainda
            não fiz" não se diz com o passado negativo.
          </li>
          <li>
            Perguntar com 〜ますか, responder repetindo o verbo e reconhecer 〜ませんか como
            convite.
          </li>
          <li>
            Usar a forma <strong>て</strong> como conector — pedido, ação em andamento,
            permissão, sequência de ações.
          </li>
          <li>
            Escolher entre a trilha educada e a casual sem misturar as duas na mesma frase, e
            saber qual delas é a aposta mais segura no início.
          </li>
        </ul>
        <p className="text-sm leading-relaxed text-ink">
          Formas mais avançadas (potencial, causativa, passiva, condicional) ficam para lições
          futuras.
        </p>
      </Section>

      <Section title="Como os verbos funcionam">
        <p className="text-sm leading-relaxed text-ink">
          Algumas diferenças em relação ao português, logo de início:
        </p>
        <p className="text-sm leading-relaxed text-ink">
          O verbo vem <strong>sempre no final da frase</strong>. O japonês segue a ordem
          sujeito–objeto–verbo, ao contrário do português (sujeito–verbo–objeto).
        </p>
        <p className="text-sm leading-relaxed text-ink">
          O verbo <strong>não muda</strong> conforme a pessoa.{' '}
          <span className="font-jp">たべます</span> (<em>tabemasu</em>) serve para "eu como",
          "você come" e "eles comem". Quem faz a ação fica claro pelo contexto, não pelo verbo.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          O verbo também <strong>não muda</strong> conforme o número (singular ou plural), nem
          conforme o gênero.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          O tempo tem só duas caixas: <strong>presente/futuro</strong> e <strong>passado</strong>.
          O japonês não separa presente de futuro; os dois usam a mesma forma.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          As conjugações são como <strong>blocos de montar</strong>: você forma uma base do verbo
          e encaixa sufixos nela, um atrás do outro. Depois que você entende a lógica de montar a
          base, cada novo sufixo fica fácil.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          Veja as quatro caixas básicas do verbo <span className="font-jp">たべる</span> (comer),
          na forma educada:
        </p>
        <Ex jp="たべます。" romaji="tabemasu." pt="Como. / Vou comer. (presente/futuro, afirmativo)" />
        <Ex jp="たべません。" romaji="tabemasen." pt="Não como. / Não vou comer. (negativo)" />
        <Ex jp="たべました。" romaji="tabemashita." pt="Comi. (passado)" />
        <Ex jp="たべませんでした。" romaji="tabemasen deshita." pt="Não comi. (passado negativo)" />
      </Section>

      <Section title="A forma de dicionário (じしょけい)">
        <p className="text-sm leading-relaxed text-ink">
          É a forma "crua" do verbo, a que aparece nos dicionários. Daí o nome.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          Todo verbo nessa forma termina em um dos nove sons da <strong>coluna う</strong>: う,
          く, ぐ, す, つ, ぬ, ぶ, む, る. Nenhum outro som é possível no final.
        </p>
        <p className="text-sm leading-relaxed text-ink">Essa forma tem duas funções:</p>
        <ol className="list-decimal space-y-1.5 pl-5 text-sm leading-relaxed text-ink">
          <li>É a <strong>base</strong> de onde saem as outras conjugações.</li>
          <li>
            Sozinha, ela já é o <strong>presente casual afirmativo</strong>, usado com amigos e
            família.
          </li>
        </ol>
        <Ex
          jp="まいにち、みずをのむ。"
          romaji="mainichi, mizu o nomu."
          pt="Bebo água todo dia."
          notes="のむ (beber) na forma de dicionário funciona como presente casual. Entre amigos, não precisa do のみます educado"
        />
      </Section>

      <Section title="Os três grupos de verbos">
        <p className="text-sm leading-relaxed text-ink">
          Para conjugar, o primeiro passo é sempre descobrir o <strong>grupo</strong> do verbo.
          Cada grupo conjuga de um jeito. Praticamente todo verbo japonês cabe em um destes três.
        </p>
        <GrammarTable
          headers={['Grupo', 'Também chamado', 'Como reconhecer', 'Exemplos']}
          jpCols={[1, 3]}
          rows={[
            ['Grupo 1', 'ごだんどうし', 'Termina em qualquer som -u, exceto a maioria dos -iru / -eru', 'かう, のむ, はなす, かく, まつ'],
            ['Grupo 2', 'いちだんどうし', 'Termina em -iru ou -eru', 'たべる, みる, おきる, ねる'],
            ['Grupo 3', 'irregulares', 'Só dois verbos: する e くる', 'する, くる'],
          ]}
        />
        <p className="text-sm leading-relaxed text-ink">
          A maioria dos verbos é do Grupo 1. O Grupo 3 tem só dois membros, mas são dois dos
          verbos mais usados da língua, então vale dominá-los cedo.
        </p>
      </Section>

      <Section title="Grupo 1 em detalhe — ごだんどうし">
        <p className="text-sm leading-relaxed text-ink">
          <span className="font-jp">ごだん</span> significa "cinco degraus". O nome descreve o
          que acontece: a última sílaba do verbo "sobe e desce" por cinco vogais (あ・い・う・え・
          お), conforme a conjugação.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          Por exemplo, <span className="font-jp">のむ</span> (<em>nomu</em>) pode virar のま,
          のみ, のむ, のめ ou のも, dependendo do que vem depois. É essa variação que dá nome ao
          grupo, e também o torna o mais trabalhoso.
        </p>
        <p className="text-sm leading-relaxed text-ink">Exemplos organizados pela terminação:</p>
        <GrammarTable
          headers={['Terminação', 'Exemplos', 'Significado']}
          jpCols={[1]}
          rows={[
            ['-う', 'かう, あう, つかう', 'comprar, encontrar (alguém), usar'],
            ['-く', 'かく, きく, あるく', 'escrever, ouvir/perguntar, andar'],
            ['-ぐ', 'およぐ, いそぐ', 'nadar, apressar-se'],
            ['-す', 'はなす, かす', 'falar, emprestar'],
            ['-つ', 'まつ, たつ', 'esperar, ficar em pé'],
            ['-ぬ', 'しぬ', 'morrer (praticamente o único verbo com -ぬ)'],
            ['-ぶ', 'あそぶ, よぶ', 'brincar/divertir-se, chamar'],
            ['-む', 'のむ, よむ, やすむ', 'beber, ler, descansar'],
            ['-る (parte deles)', 'かえる, はいる, はしる', 'voltar para casa, entrar, correr'],
          ]}
        />
        <Note>
          <strong>A pegadinha dos verbos em -iru / -eru.</strong> Alguns verbos terminados em
          -iru ou -eru <strong>parecem</strong> Grupo 2, mas são Grupo 1 "disfarçados". Você
          precisa decorá-los. Os mais comuns: <span className="font-jp">かえる</span> (voltar),{' '}
          <span className="font-jp">はいる</span> (entrar),{' '}
          <span className="font-jp">はしる</span> (correr),{' '}
          <span className="font-jp">きる</span> (cortar),{' '}
          <span className="font-jp">しる</span> (saber) e{' '}
          <span className="font-jp">いる</span> (precisar). Todos conjugam como Grupo 1. Por
          exemplo, o presente educado de <span className="font-jp">かえる</span> é{' '}
          <span className="font-jp">かえります</span>, e não{' '}
          <span className="font-jp">かえます</span>.
        </Note>
      </Section>

      <Section title="Grupo 2 em detalhe — いちだんどうし">
        <p className="text-sm leading-relaxed text-ink">
          <span className="font-jp">いちだん</span> significa "um degrau". Ao contrário do Grupo
          1, aqui a operação é <strong>sempre a mesma</strong>: tirar o る final e grudar o
          sufixo. Por isso este grupo é o mais fácil de conjugar.
        </p>
        <GrammarTable
          headers={['Terminação', 'Exemplos', 'Significado']}
          jpCols={[1]}
          rows={[
            ['-いる', 'みる, おきる, できる', 'ver, acordar/levantar, conseguir fazer'],
            ['-える', 'たべる, ねる, あける, おしえる', 'comer, dormir, abrir, ensinar'],
          ]}
        />
        <Note>
          <strong>Sons iguais, grupos diferentes.</strong> Repare que{' '}
          <span className="font-jp">きる</span> aparece nos dois grupos: como "cortar" (Grupo 1)
          e como "vestir" (Grupo 2). São palavras diferentes que soam igual (como "concerto" e
          "conserto" em português). Por enquanto, o contexto e a partícula deixam claro qual é
          qual: <span className="font-jp">ふくをきる</span> (vestir roupa) vs.{' '}
          <span className="font-jp">パンをきる</span> (cortar o pão).
        </Note>
        <Note>
          <strong>Outro par de sons iguais:</strong>{' '}
          <span className="font-jp">いる</span> também existe nos dois grupos. Como
          "existir/estar" (Grupo 2, negativa <span className="font-jp">いない</span>) —{' '}
          <span className="font-jp">へやにねこがいる</span> (há um gato no quarto). Como
          "precisar" (Grupo 1 disfarçado, negativa <span className="font-jp">いらない</span>) —{' '}
          <span className="font-jp">おかねがいる</span> (preciso de dinheiro). O contexto (do
          que se fala) deixa claro qual é qual.
        </Note>
      </Section>

      <Section title="Grupo 3 em detalhe — する e くる">
        <p className="text-sm leading-relaxed text-ink">
          São os dois únicos verbos irregulares. Cada um conjuga do seu próprio jeito. Como são
          muito usados, vale memorizar de cor.
        </p>
        <GrammarTable
          headers={['Forma', 'する (fazer)', 'くる (vir)']}
          jpCols={[1, 2]}
          rows={[
            ['dicionário', 'する (suru)', 'くる (kuru)'],
            ['ます', 'します (shimasu)', 'きます (kimasu)'],
            ['ない (negativo casual)', 'しない (shinai)', 'こない (konai)'],
            ['て', 'して (shite)', 'きて (kite)'],
            ['た (passado casual)', 'した (shita)', 'きた (kita)'],
          ]}
        />
        <Note>
          Repare que <span className="font-jp">くる</span> muda até o som inicial: く → き → こ.
          Isso não acontece com nenhum outro verbo. <span className="font-jp">する</span> muda
          para し em quase tudo.
        </Note>
        <p className="text-sm leading-relaxed text-ink">
          <span className="font-jp">する</span> tem um papel extra importante: ele se junta a
          substantivos de ação para <strong>criar novos verbos</strong>. É um dos jeitos mais
          fáceis de aumentar seu vocabulário.
        </p>
        <GrammarTable
          headers={['Substantivo + する', 'Significado']}
          jpCols={[0]}
          rows={[
            ['べんきょうする', 'estudar'],
            ['うんどうする', 'exercitar-se'],
            ['そうじする', 'limpar (a casa)'],
            ['りょこうする', 'viajar'],
            ['けっこんする', 'casar'],
          ]}
        />
        <Ex
          jp="まいにち、にほんごをべんきょうします。"
          romaji="mainichi, nihongo o benkyou shimasu."
          pt="Estudo japonês todo dia."
          notes="べんきょう (estudo) + する forma o verbo estudar. Aqui na forma educada, べんきょうします"
        />
        <Ex
          jp="あしたうんどうする。"
          romaji="ashita undou suru."
          pt="Amanhã vou me exercitar. (casual)"
          notes="mesmo verbo, registro casual — a forma de dicionário funcionando como futuro, entre amigos"
        />
        <Ex
          jp="でんしゃがきました。"
          romaji="densha ga kimashita."
          pt="O trem chegou."
          notes="くる na forma ました. Situação real: estação de trem, esperando alguém ou avisando que o trem chegou"
        />
      </Section>

      <Section title="A base do verbo (renyoukei)">
        <p className="text-sm leading-relaxed text-ink">
          A maioria das conjugações se forma trocando a terminação por uma <strong>base</strong>{' '}
          e grudando um sufixo. Como achar a base muda conforme o grupo:
        </p>
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink">
          <li>
            <strong>Grupo 2:</strong> tire o る. <span className="font-jp">たべる → たべ</span>.
            Simples e sempre igual.
          </li>
          <li>
            <strong>Grupo 1:</strong> troque o som -u final pela sílaba da coluna い daquela
            consoante. <span className="font-jp">のむ → のみ</span> (む → み).
          </li>
          <li>
            <strong>Grupo 3:</strong> irregular. <span className="font-jp">する → し</span>,{' '}
            <span className="font-jp">くる → き</span>.
          </li>
        </ul>
        <p className="text-sm leading-relaxed text-ink">
          Essa base (chamada base い) é a que usamos para o ます. Vale memorizar esta tabela de
          trocas do Grupo 1:
        </p>
        <GrammarTable
          headers={['Terminação (dicionário)', 'う', 'く', 'ぐ', 'す', 'つ', 'ぬ', 'ぶ', 'む', 'る']}
          jpCols={[0, 1, 2, 3, 4, 5, 6, 7, 8]}
          rows={[['Vira (base い)', 'い', 'き', 'ぎ', 'し', 'ち', 'に', 'び', 'み', 'り']]}
        />
      </Section>

      <Section title="Forma ます — o japonês educado">
        <p className="text-sm leading-relaxed text-ink">
          É a forma que os cursos ensinam primeiro. É educada e segura para qualquer pessoa
          (desconhecidos, superiores, situações formais).
        </p>
        <p className="text-sm leading-relaxed text-ink">
          Você forma assim: <strong>base い + um dos quatro sufixos</strong> abaixo.
        </p>
        <GrammarTable
          headers={['Sufixo', 'Sentido', 'のむ →', 'たべる →', 'する →']}
          jpCols={[2, 3, 4]}
          rows={[
            ['〜ます', 'presente/futuro afirmativo', 'のみます', 'たべます', 'します'],
            ['〜ません', 'presente/futuro negativo', 'のみません', 'たべません', 'しません'],
            ['〜ました', 'passado afirmativo', 'のみました', 'たべました', 'しました'],
            ['〜ませんでした', 'passado negativo', 'のみませんでした', 'たべませんでした', 'しませんでした'],
          ]}
        />
        <p className="text-sm leading-relaxed text-ink">
          Montar as quatro formas é a parte fácil — a base é sempre a mesma. O que pede atenção
          é <strong>usar</strong> cada uma: cada caixa tem um par na trilha casual e armadilhas
          próprias para quem pensa em português. As próximas seções olham uma caixa por vez, do
          mesmo jeito que a lição de Usos do です faz com です, ではありません, でした e
          ではありませんでした.
        </p>
      </Section>

      <Section title="Duas trilhas: forma ます vs. forma casual">
        <p className="text-sm leading-relaxed text-ink">
          Existem duas "trilhas" de conjugação correndo em paralelo. Nenhuma é mais correta;
          elas servem para contextos diferentes. Cada uma das quatro caixas tem uma versão em
          cada trilha:
        </p>
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink">
          <li>
            <strong>Trilha educada:</strong> ます / ません / ました / ませんでした.
          </li>
          <li>
            <strong>Trilha casual:</strong> dicionário / ない / た / なかった.
          </li>
        </ul>
        <GrammarTable
          headers={['Contexto', 'Trilha recomendada']}
          rows={[
            ['Desconhecidos, trabalho, superiores', 'educada (ます)'],
            ['Amigos próximos e família', 'casual'],
            ['Diário, anotações, redes informais', 'casual'],
          ]}
        />
        <Note>
          <strong>Regra prática para iniciantes:</strong> comece pela trilha educada (ます) — é
          sempre uma escolha segura com desconhecidos, no trabalho, em lojas e repartições, do
          mesmo jeito que です (lição de Usos do です). Guarde a casual para quando a conversa já
          for próxima, ou quando a outra pessoa relaxar o tom primeiro. E dentro de uma mesma frase,
          escolha uma trilha e mantenha-a até o fim — não misture (por exemplo, terminar com ます
          mas usar uma forma casual solta no meio sem necessidade).
        </Note>
      </Section>

      <Section title="Presente afirmativo — hábito e futuro">
        <p className="text-sm leading-relaxed text-ink">
          Na trilha educada é o <span className="font-jp">〜ます</span>; na casual, a própria
          forma de dicionário. Como o japonês não separa presente de futuro, essa mesma forma
          diz o que você <strong>faz sempre</strong> (rotina, gosto, hábito) e o que você{' '}
          <strong>vai fazer</strong> (plano, decisão) — quem desfaz a dúvida é o contexto ou uma
          palavra de tempo, como <span className="font-jp">まいにち</span> (todo dia) ou{' '}
          <span className="font-jp">あした</span> (amanhã).
        </p>
        <GrammarTable
          headers={['Trilha', 'Forma', 'Exemplo']}
          jpCols={[1, 2]}
          rows={[
            ['Educada', '〜ます', 'たべます'],
            ['Casual', 'dicionário', 'たべる'],
          ]}
        />
        <Ex
          jp="まいあさ、コーヒーをのみます。"
          romaji="maiasa, koohii o nomimasu."
          pt="Bebo café toda manhã."
          notes="hábito. のむ é Grupo 1: base のみ + ます"
        />
        <Ex
          jp="あした、しぶやにいきます。"
          romaji="ashita, shibuya ni ikimasu."
          pt="Amanhã vou a Shibuya."
          notes="futuro — mesma forma do hábito; quem marca o tempo é あした. に indica destino (lição de Partículas)"
        />
        <Ex
          jp="これにします。"
          romaji="kore ni shimasu."
          pt="Vou querer este. (lit. fico com este)"
          notes="no restaurante ou numa loja, ao escolher — fórmula fixa com する, decisão tomada agora"
        />
        <Ex
          jp="きょうはいえでたべる。"
          romaji="kyou wa ie de taberu."
          pt="Hoje vou comer em casa."
          notes="trilha casual: forma de dicionário, entre família ou amigos. で marca onde a ação acontece"
        />
        <Note>
          <strong>Armadilha:</strong> quem decorou "たべます = como" tende a usá-lo também para
          "estou comendo", já que ainda não conhece outra forma. Não funciona:{' '}
          <span className="font-jp">いま、たべます</span> quer dizer "vou comer agora (já, já)",
          não "estou comendo". Ação <strong>em andamento</strong> usa outra forma,{' '}
          <span className="font-jp">たべています</span> — vista na forma て, mais adiante. Por
          enquanto, guarde: presente japonês = hábito ou futuro.
        </Note>
      </Section>

      <Section title="Perguntas com 〜ますか">
        <p className="text-sm leading-relaxed text-ink">
          Funciona como com です: acrescente <span className="font-jp">か</span> no final, sem
          mudar a ordem das palavras. Para responder, repete-se o verbo —{' '}
          <span className="font-jp">はい、たべます</span> /{' '}
          <span className="font-jp">いいえ、たべません</span> — do mesmo jeito que em português
          se responde "como" ou "não como", e não só "sim". Você usa isso para perguntar sobre
          hábitos, confirmar planos e checar informação na rua.
        </p>
        <Ex
          jp="おさけをのみますか？"
          romaji="o-sake o nomimasu ka?"
          pt="Você bebe (bebida alcoólica)?"
          notes="pergunta de hábito, comum num jantar com colegas. Resposta: はい、のみます / いいえ、のみません"
        />
        <Ex
          jp="このバスはしぶやにいきますか？"
          romaji="kono basu wa shibuya ni ikimasu ka?"
          pt="Este ônibus vai para Shibuya?"
          notes="no ponto de ônibus, para o motorista ou alguém da fila — confirmar destino"
        />
        <Ex
          jp="あした、くる？"
          romaji="ashita, kuru?"
          pt="Você vem amanhã?"
          notes="casual: forma de dicionário com entonação subindo, sem か"
        />
        <Note>
          Na trilha casual, a pergunta normalmente <strong>dispensa o か</strong> e sobe a
          entonação no final. Um か grudado direto na forma casual (くるか？) soa brusco —
          reconheça se ouvir, mas não use. Detalhes sobre か na lição de Partículas.
        </Note>
      </Section>

      <Section title="Presente negativo — ません e ない">
        <p className="text-sm leading-relaxed text-ink">
          Como com です, o japonês não tem uma palavra avulsa para "não": a negação está na{' '}
          <strong>terminação do verbo</strong>, que vem no fim da frase. Na prática, isso
          significa que você só descobre se a frase é afirmativa ou negativa na última
          sílaba — ao ouvir, espere o verbo terminar antes de concluir. Os usos são os mesmos do
          presente afirmativo, só que negados: o que você não faz (hábito) e o que não vai fazer
          (plano, recusa).
        </p>
        <GrammarTable
          headers={['Trilha', 'Forma', 'Exemplo']}
          jpCols={[1, 2]}
          rows={[
            ['Educada (padrão)', '〜ません', 'たべません'],
            ['Educada (fala do dia a dia)', '〜ないです', 'たべないです'],
            ['Casual', '〜ない', 'たべない'],
          ]}
        />
        <p className="text-sm leading-relaxed text-ink">
          ません sai da base い, como todo o ます. Já a forma <span className="font-jp">ない</span>{' '}
          (<span className="font-jp">ないけい</span>), base também do ないです, tem regra própria
          por grupo:
        </p>
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink">
          <li>
            <strong>Grupo 1:</strong> troque o -u final pela sílaba da coluna あ e acrescente ない.{' '}
            <span className="font-jp">のむ → のまない</span>. Verbos em う viram わ (não あ):{' '}
            <span className="font-jp">かう → かわない</span>.
          </li>
          <li>
            <strong>Grupo 2:</strong> tire o る e ponha ない.{' '}
            <span className="font-jp">たべる → たべない</span>.
          </li>
          <li>
            <strong>Grupo 3:</strong> <span className="font-jp">する → しない</span>,{' '}
            <span className="font-jp">くる → こない</span>.
          </li>
        </ul>
        <GrammarTable
          headers={['Terminação (dicionário)', 'う', 'く', 'ぐ', 'す', 'つ', 'ぬ', 'ぶ', 'む', 'る']}
          jpCols={[0, 1, 2, 3, 4, 5, 6, 7, 8]}
          rows={[['Vira (base あ)', 'わ', 'か', 'が', 'さ', 'た', 'な', 'ば', 'ま', 'ら']]}
        />
        <Ex
          jp="おさけはのみません。"
          romaji="o-sake wa nomimasen."
          pt="Não bebo (bebida alcoólica)."
          notes="hábito, educado — resposta comum num のみかい (confraternização do trabalho). Repare: は no lugar de を, frequente em negativas (lição de Partículas)"
        />
        <Ex
          jp="よくわからないです。"
          romaji="yoku wakaranai desu."
          pt="Não entendo bem."
          notes="ないです — educado, tom de conversa. わかる (entender) é Grupo 1: わかる → わからない"
        />
        <Ex
          jp="あしたはがっこうにいかない。"
          romaji="ashita wa gakkou ni ikanai."
          pt="Amanhã não vou à escola."
          notes="futuro, casual. いく → いかない é regular; só a forma て/た de いく é exceção"
        />
        <Ex
          jp="なっとうはたべない。"
          romaji="nattou wa tabenai."
          pt="Não como natto."
          notes="gosto/hábito, casual. たべる é Grupo 2: tira o る, põe ない"
        />
        <Ex
          jp="きょうはうんどうしない。"
          romaji="kyou wa undou shinai."
          pt="Hoje não vou me exercitar."
          notes="する (Grupo 3) na negativa casual: しない"
        />
        <Note>
          <strong>ません ou ないです?</strong> As duas são educadas e corretas. ません é a forma
          de referência: é a que aparece em avisos, anúncios, e-mails de trabalho e situações
          formais. Na conversa educada do dia a dia, ないです é muito ouvido — levantamentos
          com conversas gravadas já o encontraram mais vezes que ません. A diferença em relação a
          です: lá, じゃないです é a escolha natural na fala; aqui, ません continua sendo a aposta
          mais segura quando a situação for formal. Na dúvida, ません.
        </Note>
        <Note>
          O verbo <span className="font-jp">ある</span> (haver, para objetos e coisas) é uma
          exceção: sua negativa <strong>não</strong> é あらない, e sim <strong>ない</strong>{' '}
          sozinho. É o único verbo fora do Grupo 3 cuja negativa não segue a regra do grupo. Na
          trilha educada é regular: <span className="font-jp">ありません</span>.
        </Note>
        <p className="text-sm leading-relaxed text-ink">
          Um uso que engana: <strong>negativa + か vira convite</strong>.{' '}
          <span className="font-jp">たべますか？</span> pergunta se a pessoa come;{' '}
          <span className="font-jp">たべませんか？</span> convida para comer — parecido com o
          "não quer comer com a gente?" do português, que também convida usando o "não".
        </p>
        <Ex
          jp="いっしょにひるごはんをたべませんか？"
          romaji="issho ni hirugohan o tabemasen ka?"
          pt="Vamos almoçar juntos? (lit. não almoça junto?)"
          notes="convite educado a um colega de trabalho — não é pergunta sobre hábito"
        />
        <Note>
          <strong>Aprofundamento:</strong> você também vai ouvir{' '}
          <span className="font-jp">〜ましょう</span> (<span className="font-jp">たべましょう</span>,
          "vamos comer"). É mais direto: já assume que o outro topa. O 〜ませんか deixa espaço
          para a pessoa recusar, por isso é o convite mais comum a quem você não conhece bem.
        </Note>
      </Section>

      <Section title="Nota cultural: a arte de não terminar a frase">
        <p className="text-sm leading-relaxed text-ink">
          Se o convite com 〜ませんか deixa espaço para recusar, a recusa também costuma vir sem
          o "não" explícito. O verbo japonês vem sempre por último — é ele quem carrega o tempo,
          a negação e, na trilha ます, a polidez da frase inteira. Isso tem uma consequência
          prática: dá para segurar a frase em suspenso e nunca chegar ao verbo, deixando o
          final subentendido.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          É assim que se recusa um convite ou pedido educadamente no dia a dia: em vez de dizer o
          "não" por extenso (<span className="font-jp">いきません</span>), a frase para no meio,
          com um <span className="font-jp">ちょっと</span> ("um pouco") ou um conectivo como{' '}
          <span className="font-jp">けど</span> ("mas") no ar — e espera-se que quem ouve
          complete o resto sozinho.
        </p>
        <Ex
          jp="こんやはちょっと…"
          romaji="konya wa chotto…"
          pt="Hoje à noite… é meio complicado… (recusa educada, sem terminar a frase)"
          notes="resposta a um 〜ませんか. O final negativo fica implícito — dizê-lo por extenso soaria mais brusco"
        />
        <Note>
          Isso muda uma escolha real: ao recusar um convite, você não precisa — e muitas vezes
          não deve — terminar a frase com o verbo negativo por extenso.{' '}
          <span className="font-jp">いいえ、いきません</span> é gramaticalmente perfeito, mas
          soa como uma porta fechando. <span className="font-jp">ちょっと…</span> seguido de
          silêncio (e, se quiser, um <span className="font-jp">すみません</span>) já comunica a
          recusa com mais delicadeza.
        </Note>
      </Section>

      <Section title="Passado afirmativo — ました e た">
        <p className="text-sm leading-relaxed text-ink">
          Na trilha educada, troque ます por <span className="font-jp">ました</span>; na casual,
          use a forma <span className="font-jp">た</span> (<span className="font-jp">たけい</span>).
          Assim como でした, é uma forma só para o que o português divide em duas: "comi" (uma
          vez) e "comia" (costume antigo) saem iguais — você não precisa escolher. Aparece toda
          vez que você conta o que fez: o fim de semana, a viagem, o que comeu no almoço.
        </p>
        <GrammarTable
          headers={['Trilha', 'Forma', 'Exemplo']}
          jpCols={[1, 2]}
          rows={[
            ['Educada', '〜ました', 'たべました'],
            ['Casual', '〜た', 'たべた'],
          ]}
        />
        <p className="text-sm leading-relaxed text-ink">
          ました é só base い + ました. A forma た dá mais trabalho no <strong>Grupo 1</strong>,
          porque o som final se transforma conforme a terminação:
        </p>
        <GrammarTable
          headers={['Terminação', 'Vira', 'Exemplo']}
          jpCols={[2]}
          rows={[
            ['う・つ・る', 'った', 'かう → かった / まつ → まった / かえる → かえった'],
            ['ぬ・ぶ・む', 'んだ', 'しぬ → しんだ / あそぶ → あそんだ / のむ → のんだ'],
            ['く', 'いた', 'かく → かいた'],
            ['ぐ', 'いだ', 'およぐ → およいだ'],
            ['す', 'した', 'はなす → はなした'],
          ]}
        />
        <p className="text-sm leading-relaxed text-ink">
          <strong>Grupo 2:</strong> tire o る e ponha た (<span className="font-jp">たべる → たべた</span>
          ). <strong>Grupo 3:</strong> <span className="font-jp">する → した</span>,{' '}
          <span className="font-jp">くる → きた</span>.
        </p>
        <Note>
          <strong>Exceção importante:</strong> <span className="font-jp">いく</span> (ir) não
          segue a regra de く → いた. O certo é <span className="font-jp">いった</span> (
          <em>itta</em>), não いいた. É a única exceção dessa regra em todo o japonês — e vale
          igual para a forma て, mais adiante.
        </Note>
        <Ex
          jp="きのう、こうえんまではしりました。"
          romaji="kinou, kouen made hashirimashita."
          pt="Ontem corri até o parque."
          notes="ação pontual. はしる é Grupo 1, apesar de terminar em -iru: base はしり (não はし)"
        />
        <Ex
          jp="こどものころ、まいにちこうえんであそびました。"
          romaji="kodomo no koro, mainichi kouen de asobimashita."
          pt="Quando criança, eu brincava no parque todo dia."
          notes="costume no passado ('brincava') — mesma forma de 'brinquei'; quem dá o sentido é まいにち"
        />
        <Ex
          jp="しゅうまつ、なにをしましたか？"
          romaji="shuumatsu, nani o shimashita ka?"
          pt="O que você fez no fim de semana?"
          notes="segunda-feira no trabalho, conversa de corredor. Resposta típica: かいものをしました (fiz compras)"
        />
        <Ex
          jp="ひるごはんはもうたべました。"
          romaji="hirugohan wa mou tabemashita."
          pt="Já almocei."
          notes="もう + passado = 'já'. Útil para agradecer e recusar um convite para almoçar"
        />
        <Ex
          jp="にほんにいった。"
          romaji="nihon ni itta."
          pt="Fui ao Japão."
          notes="casual, com a exceção いく → いった"
        />
      </Section>

      <Section title="Passado negativo — ませんでした e なかった">
        <p className="text-sm leading-relaxed text-ink">
          Junta as duas ideias anteriores — nega e coloca no passado — sem regra nova por grupo:
          na trilha educada, <span className="font-jp">ません + でした</span>; na casual, parte da
          forma <span className="font-jp">ない</span> que você já sabe montar. Aparece sempre que
          você conta o que não aconteceu: não dormiu bem, não tomou o remédio, não foi a lugar
          nenhum.
        </p>
        <GrammarTable
          headers={['Trilha', 'Forma', 'Exemplo']}
          jpCols={[1, 2]}
          rows={[
            ['Educada (padrão)', '〜ませんでした', 'たべませんでした'],
            ['Educada (fala do dia a dia)', '〜なかったです', 'たべなかったです'],
            ['Casual', '〜なかった', 'たべなかった'],
          ]}
        />
        <p className="text-sm leading-relaxed text-ink">
          <span className="font-jp">ない</span> termina em い e se comporta como um adjetivo -い
          só para este fim: troque い por かった, do mesmo jeito que{' '}
          <span className="font-jp">たかい</span> (caro) vira{' '}
          <span className="font-jp">たかかった</span> (era caro).
        </p>
        <GrammarTable
          headers={['Dicionário', 'ない (negativa casual)', 'なかった (passado negativo casual)']}
          jpCols={[0, 1, 2]}
          rows={[
            ['のむ', 'のまない', 'のまなかった'],
            ['たべる', 'たべない', 'たべなかった'],
            ['いく', 'いかない', 'いかなかった'],
            ['する', 'しない', 'しなかった'],
            ['くる', 'こない', 'こなかった'],
            ['ある', 'ない', 'なかった'],
          ]}
        />
        <Ex
          jp="けさはなにもたべませんでした。"
          romaji="kesa wa nani mo tabemasen deshita."
          pt="Não comi nada hoje de manhã."
          notes="educado. なにも + verbo negativo = nada"
        />
        <Ex
          jp="きのうはくすりをのみませんでした。"
          romaji="kinou wa kusuri o nomimasen deshita."
          pt="Ontem não tomei o remédio."
          notes="numa consulta médica. Remédio se 'bebe' em japonês: くすりをのむ"
        />
        <Ex
          jp="しゅうまつはどこにもいかなかったです。"
          romaji="shuumatsu wa doko ni mo ikanakatta desu."
          pt="No fim de semana não fui a lugar nenhum."
          notes="なかったです — educado em tom de conversa, resposta natural ao しゅうまつ、なにをしましたか？"
        />
        <Ex
          jp="ゆうべはよくねなかった。"
          romaji="yuube wa yoku nenakatta."
          pt="Ontem à noite não dormi bem."
          notes="casual. ねる (Grupo 2) → ねない → ねなかった"
        />
        <Note>
          <strong>"Não fiz" ≠ "ainda não fiz".</strong> Se um colega pergunta{' '}
          <span className="font-jp">もうひるごはんをたべましたか？</span> ("já almoçou?") e você
          ainda vai almoçar, a resposta <strong>não</strong> é たべませんでした — isso soa como
          "não almocei (e a hora já passou)". Para "ainda não", o japonês usa{' '}
          <span className="font-jp">まだ</span>: o simples{' '}
          <span className="font-jp">いいえ、まだです</span>, ou{' '}
          <span className="font-jp">まだたべていません</span>, com a forma て vista na próxima
          seção.
        </Note>
        <Note>
          <strong>Erro comum:</strong> não se gruda でした em ない — たべないでした está errado.
          ない já é a peça inteira que muda; a troca é só い → かった. O correto é{' '}
          <span className="font-jp">たべなかった</span> (ou たべなかったです, educado).
        </Note>
      </Section>

      <Section title="Forma て — a mais versátil">
        <p className="text-sm leading-relaxed text-ink">
          A forma て não indica tempo nem afirmação/negação sozinha. Ela é um{' '}
          <strong>conector</strong>. Serve de base para pedidos, ações em andamento, permissões e
          para encadear ações.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          É uma das formas mais usadas no dia a dia — inclusive para o "estou comendo" e o "ainda
          não comi" das seções anteriores. E a boa notícia: você já sabe montá-la. A regra de som
          é <strong>exatamente a do passado casual</strong>, trocando た por て e だ por で — com
          a mesma exceção <span className="font-jp">いく → いって</span>.
        </p>
        <GrammarTable
          headers={['た → て', 'だ → で']}
          jpCols={[0, 1]}
          rows={[
            ['かった → かって / たべた → たべて / した → して', 'のんだ → のんで / およいだ → およいで'],
            ['いった → いって / きた → きて', 'あそんだ → あそんで'],
          ]}
        />
        <p className="text-sm leading-relaxed text-ink">Agora, veja para que a forma て serve:</p>
        <GrammarTable
          headers={['Uso', 'Exemplo', 'Tradução']}
          jpCols={[1]}
          rows={[
            ['〜てください (pedido)', 'ちょっとまってください。', 'Espere um pouco, por favor.'],
            ['〜ています (ação em andamento)', 'いま、べんきょうしています。', 'Estou estudando agora.'],
            ['〜ています (estado)', 'けっこんしています。', 'Sou casado(a).'],
            ['まだ〜ていません (ainda não)', 'まだたべていません。', 'Ainda não comi.'],
            ['〜てもいいです (permissão)', 'しゃしんをとってもいいですか？', 'Posso tirar uma foto?'],
            ['〜てはいけません (proibição)', 'ここでたべてはいけません。', 'Não é permitido comer aqui.'],
            ['て + て (ações em sequência)', 'おきて、かおをあらって、あさごはんをたべます。', 'Acordo, lavo o rosto e tomo café da manhã.'],
          ]}
        />
        <Ex
          jp="ちょっとまってください。"
          romaji="chotto matte kudasai."
          pt="Espere um pouco, por favor."
          notes="まつ (esperar, Grupo 1, termina em つ) → まって + ください"
        />
        <Ex
          jp="おきて、かおをあらって、あさごはんをたべます。"
          romaji="okite, kao o aratte, asagohan o tabemasu."
          pt="Acordo, lavo o rosto e tomo café da manhã."
          notes="a forma て encadeia as três ações. Só o último verbo (たべます) carrega o tempo e a formalidade"
        />
        <Note>
          A forma て sozinha <strong>não pertence a nenhuma trilha</strong> — o registro vem do
          que vem depois dela (ou do último verbo, numa sequência). Não pense nela como "a forma
          casual" só porque não termina em ます:{' '}
          <span className="font-jp">たべてください</span> é educado, e uma sequência como{' '}
          <span className="font-jp">おきて…たべます</span> continua educada até o fim.
        </Note>
      </Section>


      <Section title="Tabela de referência rápida">
        <GrammarTable
          headers={['Dicionário', 'Grupo', 'ます', 'ない', 'なかった', 'て', 'た']}
          jpCols={[0, 2, 3, 4, 5, 6]}
          rows={[
            ['かう (comprar)', '1', 'かいます', 'かわない', 'かわなかった', 'かって', 'かった'],
            ['のむ (beber)', '1', 'のみます', 'のまない', 'のまなかった', 'のんで', 'のんだ'],
            ['はなす (falar)', '1', 'はなします', 'はなさない', 'はなさなかった', 'はなして', 'はなした'],
            ['かく (escrever)', '1', 'かきます', 'かかない', 'かかなかった', 'かいて', 'かいた'],
            ['あそぶ (brincar)', '1', 'あそびます', 'あそばない', 'あそばなかった', 'あそんで', 'あそんだ'],
            ['いく (ir)', '1 (exceção て/た)', 'いきます', 'いかない', 'いかなかった', 'いって', 'いった'],
            ['かえる (voltar)', '1 (parece 2)', 'かえります', 'かえらない', 'かえらなかった', 'かえって', 'かえった'],
            ['たべる (comer)', '2', 'たべます', 'たべない', 'たべなかった', 'たべて', 'たべた'],
            ['みる (ver)', '2', 'みます', 'みない', 'みなかった', 'みて', 'みた'],
            ['おきる (acordar)', '2', 'おきます', 'おきない', 'おきなかった', 'おきて', 'おきた'],
            ['する (fazer)', '3', 'します', 'しない', 'しなかった', 'して', 'した'],
            ['くる (vir)', '3', 'きます', 'こない', 'こなかった', 'きて', 'きた'],
          ]}
        />
      </Section>

      <Section title="Erros comuns">
        <GrammarTable
          headers={['Erro', 'Incorreto', 'Correto', 'Por quê']}
          jpCols={[1, 2]}
          rows={[
            ['Tratar かえる como Grupo 2', 'かえます', 'かえります', 'かえる termina em -eru mas é Grupo 1: a base é かえり (る → り), não かえ.'],
            ['いく na forma て/た', 'いいて / いいた', 'いって / いった', 'いく é a única exceção da regra く → いて.'],
            ['Negativa de ある', 'あらない', 'ない', 'ある tem negativa irregular.'],
            ['う → あ nos verbos em -う', 'かあない', 'かわない', 'Verbos em う usam わ na forma ない, não あ.'],
            [
              'Presente para ação em andamento',
              'いま、たべます (querendo dizer "estou comendo")',
              'いま、たべています',
              'O presente japonês é hábito ou futuro; いま、たべます soa como "vou comer agora".',
            ],
            [
              'Passado negativo casual',
              'たべないでした',
              'たべなかった',
              'ない funciona como adjetivo -い; troca-se só い por かった, não se gruda でした.',
            ],
            [
              'Responder "ainda não" com o passado negativo',
              'もうたべましたか？ — いいえ、たべませんでした',
              'いいえ、まだです / まだたべていません',
              'ませんでした diz que não aconteceu (e a ocasião passou); "ainda não" pede まだ.',
            ],
            [
              'Misturar as duas trilhas',
              'たべますから、いかない',
              'たべるから、いかない (casual) / たべますから、いきません (educado)',
              'Mantenha a mesma trilha na frase.',
            ],
          ]}
        />
      </Section>

      <Section title="Resumo">
        <p className="text-sm leading-relaxed text-ink">
          Para conjugar qualquer verbo, siga sempre estes passos:
        </p>
        <ol className="list-decimal space-y-1.5 pl-5 text-sm leading-relaxed text-ink">
          <li>
            Descubra o <strong>grupo</strong> (1, 2 ou 3).
          </li>
          <li>
            Forme a <strong>base</strong> certa para aquele grupo.
          </li>
          <li>
            Encaixe o <strong>sufixo</strong> que você quer (ます, ない, て, た — e なかった, que
            sai direto do ない, sem regra nova por grupo).
          </li>
        </ol>
        <p className="text-sm leading-relaxed text-ink">
          As quatro caixas, nas duas trilhas, com たべる:
        </p>
        <GrammarTable
          headers={['', 'Educada (padrão)', 'Educada (fala)', 'Casual']}
          jpCols={[1, 2, 3]}
          rows={[
            ['Presente afirmativo (hábito/futuro)', 'たべます', '—', 'たべる'],
            ['Presente negativo', 'たべません', 'たべないです', 'たべない'],
            ['Passado afirmativo', 'たべました', '—', 'たべた'],
            ['Passado negativo', 'たべませんでした', 'たべなかったです', 'たべなかった'],
          ]}
        />
        <p className="text-sm leading-relaxed text-ink">
          Na prática: comece pela trilha educada, e nas negativas fique com ません/ませんでした
          sempre que a situação for formal — ないです/なかったです são naturais na conversa,
          mas não substituem ません num e-mail ou numa reunião. Formas mais avançadas
          (potencial, volitiva, condicional, causativa, passiva) constroem em cima disto e ficam
          para lições futuras.
        </p>
      </Section>
    </div>
  );
}
