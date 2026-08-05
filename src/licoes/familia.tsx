import { Section, Ex, Note, GrammarTable } from '../components/Licao';

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
      <p className="leading-relaxed text-ink">
        O vocabulário de família em japonês tem <strong>dois registros distintos</strong>: um para
        falar da <em>sua própria família</em> (formas humildes — みうち <em>miuchi</em>) e outro para
        falar da <em>família de outra pessoa</em> (formas respeitosas — たにん <em>tanin</em>).
        Confundi-los é um dos erros mais comuns de iniciantes — e um dos que mais chama atenção para
        os falantes nativos. Por isso, entender esse sistema desde o início é fundamental.
      </p>

      <Section title="Por que existem dois registros?">
        <p className="text-sm leading-relaxed text-ink">
          Na cultura japonesa, <strong>humildade sobre si mesmo e respeito pelo outro</strong> são
          valores centrais na comunicação. Ao falar da sua própria família para pessoas de fora,
          você usa formas simples e sem honoríficos — porque engrandecer sua própria família seria
          presunçoso. Ao falar da família de outra pessoa, você usa formas respeitosas — porque
          elevá-la demonstra consideração.
        </p>
        <Note>
          Dentro de casa, entre membros da família, usam-se as formas <em>respeitosas</em>. As
          crianças chamam os pais de <strong className="font-jp">おとうさん・おかあさん</strong>, e os
          cônjuges frequentemente passam a usar os mesmos termos depois de ter filhos. As formas
          humildes (ちち, はは) são usadas apenas ao falar <em>sobre</em> a família com pessoas de fora.
        </Note>
      </Section>

      <Section title="Família nuclear">
        <GrammarTable
          headers={['Grau', 'Minha família (humilde)', 'Família de outros (respeitosa)']}
          jpCols={[1, 2]}
          rows={[
            ['Pai', 'ちち', 'おとうさん'],
            ['Mãe', 'はは', 'おかあさん'],
            ['Irmão mais velho', 'あに', 'おにいさん'],
            ['Irmã mais velha', 'あね', 'おねえさん'],
            ['Irmão mais novo', 'おとうと', 'おとうとさん'],
            ['Irmã mais nova', 'いもうと', 'いもうとさん'],
            ['Marido', 'おっと / しゅじん', 'ごしゅじん'],
            ['Esposa', 'つま / かない', 'おくさん'],
            ['Filho', 'むすこ', 'むすこさん'],
            ['Filha', 'むすめ', 'おじょうさん'],
          ]}
        />
        <Note>
          しゅじん ("dono da casa") e かない ("dentro de casa") são termos tradicionais
          com conotação hierárquica que muitos japoneses modernos evitam, preferindo おっと e つま.
          Para o vocabulário ativo, prefira おっと/つま.
        </Note>
      </Section>

      <Section title="Família estendida">
        <GrammarTable
          headers={['Grau', 'Minha família', 'Família de outros']}
          jpCols={[1, 2]}
          rows={[
            ['Avô', 'そふ', 'おじいさん'],
            ['Avó', 'そぼ', 'おばあさん'],
            ['Tio', 'おじ', 'おじさん'],
            ['Tia', 'おば', 'おばさん'],
            ['Primo / Prima', 'いとこ', 'いとこさん'],
            ['Sobrinho', 'おい', 'おいごさん'],
            ['Sobrinha', 'めい', 'めいごさん'],
          ]}
        />
        <Note>
          <strong className="font-jp">おじいさん</strong> (avô) vs{' '}
          <strong className="font-jp">おじさん</strong> (tio): a diferença está no número de vogais.
          おじいさん tem <em>ii</em> (longo); おじさん tem apenas <em>i</em>. O mesmo vale para{' '}
          <strong className="font-jp">おばあさん</strong> (avó) vs{' '}
          <strong className="font-jp">おばさん</strong> (tia). Chamar alguém de おばあさん quando
          deveria ser おばさん pode ser... delicado.
        </Note>
      </Section>

      <Section title="Família por afinidade (casamento)">
        <GrammarTable
          headers={['Grau', 'Termo (minha família)', 'Uso respeitoso']}
          jpCols={[1, 2]}
          rows={[
            ['Sogro (pai do cônjuge)', 'ぎふ', 'おとうさん'],
            ['Sogra (mãe do cônjuge)', 'ぎぼ', 'おかあさん'],
            ['Cunhado mais velho', 'ぎけい', 'おにいさん'],
            ['Cunhada mais velha', 'ぎし', 'おねえさん'],
            ['Cunhado mais novo', 'ぎてい', 'ぎていさん'],
            ['Cunhada mais nova', 'ぎまい', 'ぎまいさん'],
            ['Genro', 'むこ', 'むこさん'],
            ['Nora', 'よめ', 'およめさん'],
          ]}
        />
      </Section>

      <Section title="Filhos por ordem de nascimento">
        <p className="text-sm leading-relaxed text-ink">
          É comum mencionar a posição de um filho na família. Esses termos são usados em contextos
          formais ou em registros burocráticos.
        </p>
        <GrammarTable
          headers={['Termo', 'Significado']}
          jpCols={[0]}
          rows={[
            ['ちょうなん', 'Primogênito (filho homem)'],
            ['じなん', 'Segundo filho homem'],
            ['さんなん', 'Terceiro filho homem'],
            ['ちょうじょ', 'Primogênita (filha mulher)'],
            ['じじょ', 'Segunda filha mulher'],
            ['すえっこ', 'O filho mais novo (caçula)'],
            ['ひとりっこ', 'Filho único'],
          ]}
        />
        <Ex jp="わたしはちょうなんで、いもうとがふたりいます。" pt="Sou o primogênito e tenho duas irmãs mais novas." />
      </Section>

      <Section title="Outros termos úteis">
        <GrammarTable
          headers={['Japonês', 'Significado']}
          jpCols={[0]}
          rows={[
            ['かぞく', 'família (em geral)'],
            ['りょうしん', 'pais (pai e mãe juntos)'],
            ['きょうだい', 'irmãos (geral, masc. ou misto)'],
            ['しまい', 'irmãs'],
            ['こども', 'criança / filho(s)'],
            ['まご', 'neto / neta'],
            ['しんせき', 'parentes (em geral)'],
            ['どくしん', 'solteiro(a)'],
            ['きこん', 'casado(a)'],
            ['りこん', 'divorciado(a) / divórcio'],
          ]}
        />
      </Section>

      <Section title="Perguntando sobre a família">
        <Ex jp="ごかぞくはいますか？" pt="Você tem família? (forma educada)" notes="ごかぞく é a forma respeitosa de かぞく" />
        <Ex jp="ごきょうだいはいますか？" pt="Você tem irmãos?" />
        <Ex jp="なんにんかぞくですか？" pt="Quantas pessoas tem na sua família?" />
        <Ex jp="おこさんはいますか？" pt="Você tem filhos?" notes="おこさん é a forma respeitosa; meus filhos = こども(たち)" />
        <Ex jp="おとうさんのおしごとはなんですか？" pt="Qual é a profissão do seu pai?" />
      </Section>

      <Section title="Exemplos de uso em contexto">
        <Ex
          jp="これはわたしのちちです。よろしくおねがいします。"
          pt="Este é meu pai. Muito prazer."
          notes="apresentando o próprio pai — usa ちち (humilde)"
        />
        <Ex
          jp="たなかさんのおとうさんはどんなおしごとをされていますか？"
          pt="Que tipo de trabalho o pai do sr. Tanaka faz?"
          notes="perguntando sobre o pai de outra pessoa — usa おとうさん (respeitoso)"
        />
        <Ex
          jp="いもうとがふたりとおとうとがひとりいます。"
          pt="Tenho duas irmãs mais novas e um irmão mais novo."
        />
        <Ex
          jp="りょうしんはブラジルにすんでいます。"
          pt="Meus pais moram no Brasil."
        />
        <Ex
          jp="わたしはひとりっこなので、きょうだいはいません。"
          pt="Sou filho único, então não tenho irmãos."
        />
      </Section>

      <Section title="Erros comuns">
        <GrammarTable
          headers={['Erro', 'Situação incorreta', 'Correto', 'Por quê']}
          jpCols={[]}
          rows={[
            [
              'Usar おとうさん para o próprio pai com estranhos',
              'Dizer "わたしのおとうさんはいしゃです" para um colega',
              '"わたしのちちはいしゃです"',
              'おとうさん é a forma respeitosa; use ちち ao falar da sua família para outros',
            ],
            [
              'Confundir おじいさん e おじさん',
              'Chamar um homem de 50 anos de おじいさん',
              'おじさん',
              'おじいさん = avô (muito mais velho); おじさん = tio / homem de meia-idade',
            ],
            [
              'Usar ごかぞく para a própria família',
              '"わたしのごかぞくは…"',
              '"わたしのかぞくは…"',
              'ごかぞく é respeitoso — para a família de outros, não a sua',
            ],
          ]}
        />
      </Section>
    </div>
  );
}
