import { Section, Ex, Note, GrammarTable, ReadingKey } from '../components/Licao';
import type { QuizLicao } from '../data/quiz/types';

export const meta = {
  id: 'verbos',
  title: 'Verbos',
  subtitle: 'Os três grupos, a forma ます, a forma て e a base para conjugar',
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
  ],
};

export default function Verbos() {
  return (
    <div className="space-y-10">
      <Section title="Como ler esta lição">
        <p className="text-sm leading-relaxed text-ink">
          Aqui, todos os verbos aparecem em hiragana + romaji. Não usamos kanji de propósito: as
          regras de conjugação são regras de <strong>som</strong>, e o hiragana mostra o som
          direto.
        </p>
        <ReadingKey
          lines={[
            { text: 'たべる', desc: 'hiragana' },
            { text: 'taberu', desc: 'romaji' },
            { text: 'comer', desc: 'significado' },
          ]}
        />
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
            Conjugar a forma <strong>ます</strong> nos quatro cenários (afirmativo/negativo,
            presente/passado) e usar a forma <strong>て</strong> como conector — pedido, ação em
            andamento, permissão, sequência de ações.
          </li>
          <li>
            Conjugar a trilha <strong>casual completa</strong>: dicionário, ない, た e なかった.
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
          qual: <span className="font-jp">ふくをきる</span> (vestir roupa, ação) vs.{' '}
          <span className="font-jp">ねこがいる</span> (há um gato, estado).
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
        <Ex
          jp="まいあさ、コーヒーをのみます。"
          romaji="maiasa, koohii o nomimasu."
          pt="Bebo café toda manhã."
          notes="のむ é Grupo 1: base のみ + ます"
        />
        <Ex
          jp="けさはなにもたべませんでした。"
          romaji="kesa wa nani mo tabemasen deshita."
          pt="Não comi nada hoje de manhã."
          notes="なにも + verbo negativo = nada. たべる vira たべませんでした (passado negativo)"
        />
        <Ex
          jp="きのう、こうえんまではしりました。"
          romaji="kinou, kouen made hashirimashita."
          pt="Ontem corri até o parque."
          notes="はしる é Grupo 1, apesar de terminar em -eru. Por isso a base é はしり (não はし)"
        />
      </Section>

      <Section title="Forma て — a mais versátil">
        <p className="text-sm leading-relaxed text-ink">
          A forma て não indica tempo nem afirmação/negação sozinha. Ela é um{' '}
          <strong>conector</strong>. Serve de base para pedidos, ações em andamento, permissões e
          para encadear ações.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          É uma das formas mais usadas no dia a dia. Vale praticar bastante.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          Para o <strong>Grupo 1</strong>, a terminação decide o formato:
        </p>
        <GrammarTable
          headers={['Terminação', 'Vira', 'Exemplo']}
          jpCols={[2]}
          rows={[
            ['う・つ・る', 'って', 'かう → かって / まつ → まって / かえる → かえって'],
            ['ぬ・ぶ・む', 'んで', 'しぬ → しんで / あそぶ → あそんで / のむ → のんで'],
            ['く', 'いて', 'かく → かいて'],
            ['ぐ', 'いで', 'およぐ → およいで'],
            ['す', 'して', 'はなす → はなして'],
          ]}
        />
        <Note>
          <strong>Exceção importante:</strong> <span className="font-jp">いく</span> (ir) não
          segue a regra de く → いて. O certo é <span className="font-jp">いって</span> (
          <em>itte</em>), não いいて. É a única exceção dessa regra em todo o japonês.
        </Note>
        <p className="text-sm leading-relaxed text-ink">
          Para o <strong>Grupo 2</strong>: tire o る e ponha て.{' '}
          <span className="font-jp">たべる → たべて</span>,{' '}
          <span className="font-jp">みる → みて</span>. Para o <strong>Grupo 3</strong>:{' '}
          <span className="font-jp">する → して</span>, <span className="font-jp">くる → きて</span>.
        </p>
        <p className="text-sm leading-relaxed text-ink">Agora, veja para que a forma て serve:</p>
        <GrammarTable
          headers={['Uso', 'Exemplo', 'Tradução']}
          jpCols={[1]}
          rows={[
            ['〜てください (pedido)', 'ちょっとまってください。', 'Espere um pouco, por favor.'],
            ['〜ています (ação em andamento)', 'いま、べんきょうしています。', 'Estou estudando agora.'],
            ['〜ています (estado)', 'けっこんしています。', 'Sou casado(a).'],
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

      <Section title="Forma negativa casual (ないけい)">
        <p className="text-sm leading-relaxed text-ink">
          É a versão casual de 〜ません. Usada entre amigos e família.
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
          jp="なっとうはたべない。"
          romaji="nattou wa tabenai."
          pt="Não como natto."
          notes="たべる é Grupo 2: tira o る, põe ない. Casual, entre amigos"
        />
        <Ex
          jp="あしたはがっこうにいかない。"
          romaji="ashita wa gakkou ni ikanai."
          pt="Amanhã não vou à escola."
          notes="いく → いかない. A forma ない de いく é regular; só a forma て (いって) é exceção"
        />
        <Ex
          jp="きょうはうんどうしない。"
          romaji="kyou wa undou shinai."
          pt="Hoje não vou me exercitar."
          notes="する (Grupo 3) na negativa casual: しない. A mesma lógica de たべない, só que irregular"
        />
        <Note>
          O verbo <span className="font-jp">ある</span> (haver, para objetos e coisas) é uma
          exceção: sua negativa <strong>não</strong> é あらない, e sim <strong>ない</strong>{' '}
          sozinho. É o único verbo cuja negativa não segue a regra do grupo.
        </Note>
      </Section>

      <Section title="Passado casual (たけい)">
        <p className="text-sm leading-relaxed text-ink">
          Segue exatamente as mesmas regras da forma て. Basta trocar て por た e で por だ no
          final.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          Ou seja: se você sabe formar a forma て, já sabe formar o passado casual.
        </p>
        <GrammarTable
          headers={['て → た', 'で → だ']}
          jpCols={[0, 1]}
          rows={[['かって → かった / たべて → たべた', 'のんで → のんだ / あそんで → あそんだ']]}
        />
        <Ex
          jp="きのう、ともだちとはなした。"
          romaji="kinou, tomodachi to hanashita."
          pt="Ontem conversei com um amigo."
          notes="はなす → forma て はなして → passado はなした"
        />
        <Ex
          jp="にほんにいった。"
          romaji="nihon ni itta."
          pt="Fui ao Japão."
          notes="いく → いって → いった. Segue a exceção da forma て"
        />
      </Section>

      <Section title="Passado negativo casual (なかった)">
        <p className="text-sm leading-relaxed text-ink">
          Fecha a trilha casual. Diferente das outras conjugações desta lição, aqui não existe
          regra por grupo — a mudança parte sempre da forma <span className="font-jp">ない</span>{' '}
          que você já sabe montar, então não há nada novo para decorar por verbo.
        </p>
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
          jp="きのうはなにもたべなかった。"
          romaji="kinou wa nani mo tabenakatta."
          pt="Ontem não comi nada."
          notes="par casual de けさはなにもたべませんでした, visto na forma ます"
        />
        <Ex
          jp="ゆうべはよくねなかった。"
          romaji="yuube wa yoku nenakatta."
          pt="Ontem à noite não dormi bem."
          notes="ねる (Grupo 2) → ねない → ねなかった. Frase comum ao falar de sono/cansaço, no trabalho ou com amigos"
        />
        <Note>
          <strong>Erro comum:</strong> não se gruda でした em ない — たべないでした está errado.
          ない já é a peça inteira que muda; a troca é só い → かった. O correto é{' '}
          <span className="font-jp">たべなかった</span>.
        </Note>
      </Section>

      <Section title="Duas trilhas: forma ます vs. forma casual">
        <p className="text-sm leading-relaxed text-ink">
          Existem duas "trilhas" de conjugação correndo em paralelo. Nenhuma é mais correta;
          elas servem para contextos diferentes.
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

      <Section title="Nota cultural: a arte de não terminar a frase">
        <p className="text-sm leading-relaxed text-ink">
          O verbo japonês vem sempre por último — é ele quem carrega o tempo, a negação e, na
          trilha ます, a polidez da frase inteira. Isso tem uma consequência prática: dá para
          segurar a frase em suspenso e nunca chegar ao verbo, deixando o final subentendido.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          É assim que se recusa um convite ou pedido educadamente no dia a dia: em vez de dizer o
          "não" por extenso, a frase para no meio, com um conectivo como{' '}
          <span className="font-jp">けど</span> ("mas") no ar — e espera-se que quem ouve
          complete o resto sozinho.
        </p>
        <Ex
          jp="こんやはちょっと…"
          romaji="konya wa chotto…"
          pt="Hoje à noite… é meio complicado… (recusa educada, sem terminar a frase)"
          notes="o verbo negativo (いけません/いけない) fica implícito — dizê-lo por extenso soaria mais brusco"
        />
        <Note>
          Isso muda uma escolha real: ao recusar algo educadamente, você não precisa — e muitas
          vezes não deve — terminar a frase com o verbo negativo por extenso.{' '}
          <span className="font-jp">ちょっと…</span> seguido de silêncio já comunica a recusa,
          com mais delicadeza do que apagar a frase com um いけません explícito.
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
              'Passado negativo casual',
              'たべないでした',
              'たべなかった',
              'ない funciona como adjetivo -い; troca-se só い por かった, não se gruda でした.',
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
          Formas mais avançadas (potencial, volitiva, condicional, causativa, passiva) constroem
          em cima disto e ficam para lições futuras.
        </p>
      </Section>
    </div>
  );
}
