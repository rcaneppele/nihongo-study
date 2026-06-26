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
        falar da <em>sua própria família</em> (formas humildes — 身内 <em>miuchi</em>) e outro para
        falar da <em>família de outra pessoa</em> (formas respeitosas — 他人 <em>tanin</em>).
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
          crianças chamam os pais de <strong className="font-jp">お父さん・お母さん</strong>, e os
          cônjuges frequentemente passam a usar os mesmos termos depois de ter filhos. As formas
          humildes (ちち, はは) são usadas apenas ao falar <em>sobre</em> a família com pessoas de fora.
        </Note>
      </Section>

      <Section title="Família nuclear">
        <GrammarTable
          headers={['Grau', 'Minha família (humilde)', 'Família de outros (respeitosa)']}
          jpCols={[1, 2]}
          rows={[
            ['Pai', '父（ちち）', 'お父さん（おとうさん）'],
            ['Mãe', '母（はは）', 'お母さん（おかあさん）'],
            ['Irmão mais velho', '兄（あに）', 'お兄さん（おにいさん）'],
            ['Irmã mais velha', '姉（あね）', 'お姉さん（おねえさん）'],
            ['Irmão mais novo', '弟（おとうと）', '弟さん（おとうとさん）'],
            ['Irmã mais nova', '妹（いもうと）', '妹さん（いもうとさん）'],
            ['Marido', '夫（おっと）/ 主人（しゅじん）', 'ご主人（ごしゅじん）'],
            ['Esposa', '妻（つま）/ 家内（かない）', '奥さん（おくさん）'],
            ['Filho', '息子（むすこ）', '息子さん（むすこさん）'],
            ['Filha', '娘（むすめ）', 'お嬢さん（おじょうさん）'],
          ]}
        />
        <Note>
          主人 (しゅじん, "dono da casa") e 家内 (かない, "dentro de casa") são termos tradicionais
          com conotação hierárquica que muitos japoneses modernos evitam, preferindo 夫 e 妻.
          Para o vocabulário ativo, prefira 夫/妻.
        </Note>
      </Section>

      <Section title="Família estendida">
        <GrammarTable
          headers={['Grau', 'Minha família', 'Família de outros']}
          jpCols={[1, 2]}
          rows={[
            ['Avô', '祖父（そふ）', 'お祖父さん（おじいさん）'],
            ['Avó', '祖母（そぼ）', 'お祖母さん（おばあさん）'],
            ['Tio', '叔父（おじ）', 'おじさん'],
            ['Tia', '叔母（おば）', 'おばさん'],
            ['Primo / Prima', 'いとこ', 'いとこさん'],
            ['Sobrinho', '甥（おい）', '甥ごさん（おいごさん）'],
            ['Sobrinha', '姪（めい）', '姪ごさん（めいごさん）'],
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
          headers={['Grau', 'Japonês', 'Leitura', 'Uso respeitoso']}
          jpCols={[1, 2, 3]}
          rows={[
            ['Sogro (pai do cônjuge)', '義父', 'ぎふ', 'お義父さん（おとうさん）'],
            ['Sogra (mãe do cônjuge)', '義母', 'ぎぼ', 'お義母さん（おかあさん）'],
            ['Cunhado mais velho', '義兄', 'ぎけい', 'お義兄さん（おにいさん）'],
            ['Cunhada mais velha', '義姉', 'ぎし', 'お義姉さん（おねえさん）'],
            ['Cunhado mais novo', '義弟', 'ぎてい', '義弟さん'],
            ['Cunhada mais nova', '義妹', 'ぎまい', '義妹さん'],
            ['Genro', '婿（むこ）', 'むこ', '婿さん（むこさん）'],
            ['Nora', '嫁（よめ）', 'よめ', 'お嫁さん（およめさん）'],
          ]}
        />
      </Section>

      <Section title="Filhos por ordem de nascimento">
        <p className="text-sm leading-relaxed text-ink">
          É comum mencionar a posição de um filho na família. Esses termos são usados em contextos
          formais ou em registros burocráticos.
        </p>
        <GrammarTable
          headers={['Termo', 'Leitura', 'Significado']}
          jpCols={[0, 1]}
          rows={[
            ['長男', 'ちょうなん', 'Primogênito (filho homem)'],
            ['次男', 'じなん', 'Segundo filho homem'],
            ['三男', 'さんなん', 'Terceiro filho homem'],
            ['長女', 'ちょうじょ', 'Primogênita (filha mulher)'],
            ['次女', 'じじょ', 'Segunda filha mulher'],
            ['末っ子', 'すえっこ', 'O filho mais novo (caçula)'],
            ['一人っ子', 'ひとりっこ', 'Filho único'],
          ]}
        />
        <Ex jp="私は長男で、妹が二人います。" reading="わたしはちょうなんで、いもうとがふたりいます。" pt="Sou o primogênito e tenho duas irmãs mais novas." />
      </Section>

      <Section title="Outros termos úteis">
        <GrammarTable
          headers={['Japonês', 'Leitura', 'Significado']}
          jpCols={[0, 1]}
          rows={[
            ['家族', 'かぞく', 'família (em geral)'],
            ['両親', 'りょうしん', 'pais (pai e mãe juntos)'],
            ['兄弟', 'きょうだい', 'irmãos (geral, masc. ou misto)'],
            ['姉妹', 'しまい', 'irmãs'],
            ['子ども', 'こども', 'criança / filho(s)'],
            ['孫', 'まご', 'neto / neta'],
            ['親戚', 'しんせき', 'parentes (em geral)'],
            ['独身', 'どくしん', 'solteiro(a)'],
            ['既婚', 'きこん', 'casado(a)'],
            ['離婚', 'りこん', 'divorciado(a) / divórcio'],
          ]}
        />
      </Section>

      <Section title="Perguntando sobre a família">
        <Ex jp="ご家族はいますか？" reading="ごかぞくはいますか？" pt="Você tem família? (forma educada)" notes="ご家族 é a forma respeitosa de 家族" />
        <Ex jp="ご兄弟はいますか？" reading="ごきょうだいはいますか？" pt="Você tem irmãos?" />
        <Ex jp="何人家族ですか？" reading="なんにんかぞくですか？" pt="Quantas pessoas tem na sua família?" />
        <Ex jp="お子さんはいますか？" reading="おこさんはいますか？" pt="Você tem filhos?" notes="お子さん é a forma respeitosa; meus filhos = 子ども(たち)" />
        <Ex jp="お父さんのお仕事は何ですか？" reading="おとうさんのおしごとはなんですか？" pt="Qual é a profissão do seu pai?" />
      </Section>

      <Section title="Exemplos de uso em contexto">
        <Ex
          jp="これは私の父です。よろしくお願いします。"
          reading="これはわたしのちちです。よろしくおねがいします。"
          pt="Este é meu pai. Muito prazer."
          notes="apresentando o próprio pai — usa ちち (humilde)"
        />
        <Ex
          jp="田中さんのお父さんはどんなお仕事をされていますか？"
          reading="たなかさんのおとうさんはどんなおしごとをされていますか？"
          pt="Que tipo de trabalho o pai do sr. Tanaka faz?"
          notes="perguntando sobre o pai de outra pessoa — usa おとうさん (respeitoso)"
        />
        <Ex
          jp="妹が二人と弟が一人います。"
          reading="いもうとがふたりとおとうとがひとりいます。"
          pt="Tenho duas irmãs mais novas e um irmão mais novo."
        />
        <Ex
          jp="両親はブラジルに住んでいます。"
          reading="りょうしんはブラジルにすんでいます。"
          pt="Meus pais moram no Brasil."
        />
        <Ex
          jp="私は一人っ子なので、兄弟はいません。"
          reading="わたしはひとりっこなので、きょうだいはいません。"
          pt="Sou filho único, então não tenho irmãos."
        />
      </Section>

      <Section title="Erros comuns">
        <GrammarTable
          headers={['Erro', 'Situação incorreta', 'Correto', 'Por quê']}
          jpCols={[]}
          rows={[
            [
              'Usar お父さん para o próprio pai com estranhos',
              'Dizer "私のお父さんは医者です" para um colega',
              '"私の父は医者です"',
              'お父さん é a forma respeitosa; use ちち ao falar da sua família para outros',
            ],
            [
              'Confundir おじいさん e おじさん',
              'Chamar um homem de 50 anos de おじいさん',
              'おじさん',
              'おじいさん = avô (muito mais velho); おじさん = tio / homem de meia-idade',
            ],
            [
              'Usar ご家族 para a própria família',
              '"私のご家族は…"',
              '"私の家族は…"',
              'ご家族 é respeitoso — para a família de outros, não a sua',
            ],
          ]}
        />
      </Section>
    </div>
  );
}
