import { Section, Ex, Note, GrammarTable } from '../components/Licao';

export const meta = {
  id: 'pronomes',
  title: 'Pronomes Pessoais',
  subtitle: 'わたし、ぼく、あなた e a tendência de omiti-los',
  emoji: '👤',
  tags: ['gramática', 'n5'],
};

export default function Pronomes() {
  return (
    <div className="space-y-10">
      <p className="leading-relaxed text-ink">
        Ao contrário do português, o japonês <strong>omite pronomes com muita frequência</strong>{' '}
        quando o contexto deixa claro de quem se trata. Além disso, o japonês possui vários pronomes
        de primeira e segunda pessoa com níveis distintos de formalidade, gênero e atitude.
        Escolher o errado pode soar estranho, implicar uma personalidade que você não quer transmitir,
        ou até ofender. Este é um dos aspectos mais culturalmente ricos da língua.
      </p>

      <Section title="Primeira pessoa — 'eu'">
        <GrammarTable
          headers={['Pronome', 'Leitura', 'Kanji', 'Gênero / registro', 'Quando usar']}
          jpCols={[0, 1, 2]}
          rows={[
            ['わたし', 'わたし', '私', 'neutro / padrão', 'Mais versátil. Seguro em qualquer situação.'],
            ['わたくし', 'わたくし', '私', 'neutro / muito formal', 'Discursos, contextos formais, negócios de alto nível.'],
            ['ぼく', 'ぼく', '僕', 'masculino / casual a semi-formal', 'Homens em situações informais ou semi-formais.'],
            ['おれ', 'おれ', '俺', 'masculino / casual, rude ou íntimo', 'Entre amigos próximos do mesmo gênero. Evite em contextos formais.'],
            ['あたし', 'あたし', '私', 'feminino / casual', 'Mulheres em conversas informais.'],
            ['あたくし', 'あたくし', '私', 'feminino / muito formal', 'Versão muito formal de あたし, menos comum.'],
            ['うち', 'うち', '—', 'feminino / bem casual', 'Dialeto Kansai. Jovens femininas no Kansai e na cultura pop.'],
          ]}
        />
        <Note>
          Para iniciantes, <strong className="font-jp">わたし</strong> é sempre a escolha segura em
          qualquer situação. Aprenda ぼく e おれ passivamente — você os entenderá em anime e conversas
          — antes de usá-los ativamente, pois a escolha carrega implicações de personalidade.
        </Note>
      </Section>

      <Section title="Formas plurais de 'nós'">
        <GrammarTable
          headers={['Pronome', 'Leitura', 'Base + sufixo', 'Registro']}
          jpCols={[0, 1, 2]}
          rows={[
            ['わたしたち', 'わたしたち', 'わたし + たち', 'neutro, padrão'],
            ['わたしども', 'わたしども', 'わたし + ども', 'muito formal, humilde'],
            ['ぼくたち / ぼくら', 'ぼくたち / ぼくら', 'ぼく + たち / ら', 'masculino casual'],
            ['おれたち / おれら', 'おれたち / おれら', 'おれ + たち / ら', 'masculino, muito casual'],
            ['あたしたち', 'あたしたち', 'あたし + たち', 'feminino casual'],
          ]}
        />
        <Note>
          O sufixo <strong className="font-jp">たち</strong> é mais respeitoso; <strong className="font-jp">ら</strong>{' '}
          é mais casual e às vezes levemente pejorativo quando aplicado a terceiros (かれら, あいつら).
          Para "nós" formal: わたしたち. Para grupos de amigos: ぼくら / おれたち.
        </Note>
      </Section>

      <Section title="Segunda pessoa — 'você'">
        <GrammarTable
          headers={['Pronome', 'Leitura', 'Kanji', 'Registro', 'Atenção']}
          jpCols={[0, 1, 2]}
          rows={[
            ['あなた', 'あなた', '貴方 / あなた', 'neutro / formal', 'Correto gramaticalmente, mas pode soar distante, frio ou condescendente entre iguais.'],
            ['きみ', 'きみ', '君', 'casual / superior→inferior', 'De um superior ou professor para subordinado. Muito comum em letras de músicas.'],
            ['おまえ', 'おまえ', 'お前', 'muito casual / rude', 'Entre íntimos do mesmo gênero. Pode ofender fortemente se mal usado.'],
            ['あんた', 'あんた', 'あなた', 'casual / levemente rude', 'Versão informal de あなた. Pode soar brusco dependendo do tom.'],
            ['そちら', 'そちら', '—', 'muito formal', 'Forma educada de "você / vocês" em atendimento formal.'],
          ]}
        />
        <Note>
          <strong>A melhor prática:</strong> japoneses evitam a segunda pessoa usando o nome da
          pessoa + さん/先生, ou o título dela (部長, sensei, etc.). Se você não sabe o nome, あなた é
          gramaticalmente correto mas pode soar frio. Em muitos casos, simplesmente omita o pronome
          — o contexto é suficiente.
        </Note>
        <Ex jp="田中さんはコーヒーを飲みますか？" reading="たなかさんはコーヒーをのみますか？" pt="(Você,) sr. Tanaka, toma café?" notes="mais natural do que usar あなた" />
        <Ex jp="先生、質問があります。" reading="せんせい、しつもんがあります。" pt="Professor, tenho uma pergunta." notes="o professor é endereçado pelo título, não por あなた" />
      </Section>

      <Section title="Formas plurais de 'vocês / todos'">
        <GrammarTable
          headers={['Pronome', 'Leitura', 'Registro', 'Uso']}
          jpCols={[0, 1]}
          rows={[
            ['あなたたち', 'あなたたち', 'neutro', 'Raro na fala; mais comum na escrita'],
            ['あなたがた', 'あなたがた', 'formal / respeitoso', 'Discursos formais, "vocês" com respeito'],
            ['きみたち', 'きみたち', 'casual / superior→inferior', 'Professor falando com turma, treinador com equipe'],
            ['皆さん', 'みなさん', 'neutro / semi-formal', 'O mais comum: "everyone", qualquer contexto'],
            ['皆様', 'みなさま', 'muito formal', 'Cerimônias, discursos, anúncios formais'],
            ['みんな', 'みんな', 'casual', 'Conversa diária: "todo mundo"'],
          ]}
        />
        <Ex jp="皆さん、よろしいですか？" reading="みなさん、よろしいですか？" pt="Todo mundo está bem? (Posso começar?)" notes="professor perguntando à turma" />
        <Ex jp="皆様、本日はお越しいただきありがとうございます。" reading="みなさま、ほんじつはおこしいただきありがとうございます。" pt="Senhoras e senhores, obrigado por virem hoje." notes="discurso formal" />
      </Section>

      <Section title="Terceira pessoa — 'ele / ela / eles'">
        <GrammarTable
          headers={['Pronome', 'Leitura', 'Significado', 'Atenção']}
          jpCols={[0, 1]}
          rows={[
            ['かれ', 'かれ', 'ele', 'Também significa "namorado". Cuidado com ambiguidade.'],
            ['かのじょ', 'かのじょ', 'ela', 'Também significa "namorada". Igualmente ambíguo.'],
            ['かれら', 'かれら', 'eles (masc./misto)', 'Plural de かれ.'],
            ['かのじょたち', 'かのじょたち', 'elas', 'Plural de かのじょ.'],
            ['あのひと', 'あのひと', 'aquela pessoa', 'Mais neutro e natural. Não implica gênero.'],
            ['あのかた', 'あのかた', 'aquela pessoa (respeitoso)', 'Versão formal de あのひと.'],
            ['あいつ', 'あいつ', 'aquele (rude)', 'Informal e levemente depreciativo.'],
            ['こいつ / そいつ', 'こいつ / そいつ', 'este / esse (rude)', 'Muito informal, usado em frustração ou entre íntimos.'],
          ]}
        />
        <Note>
          「かれ」e「かのじょ」são frequentemente evitados como pronomes de terceira pessoa porque
          significam principalmente "namorado" e "namorada". Para se referir a pessoas, japoneses
          preferem usar o nome, ou あのひと/あのかた. Em textos escritos ou literatura, かれ/かのじょ
          aparecem mais como "he/she".
        </Note>
      </Section>

      <Section title="じぶん — 'si mesmo', 'eu mesmo'">
        <p className="text-sm leading-relaxed text-ink">
          <strong className="font-jp">自分</strong> (じぶん) é o pronome reflexivo do japonês.
          Significa "si mesmo", "eu mesmo", "você mesmo" — dependendo do contexto, pode se referir
          a qualquer pessoa. É especialmente útil para evitar ambiguidade com pronomes de pessoa.
        </p>
        <Ex jp="自分でやります。" reading="じぶんでやります。" pt="Faço eu mesmo. / Faço por conta própria." />
        <Ex jp="自分のことを話してください。" reading="じぶんのことをはなしてください。" pt="Por favor, fale sobre você mesmo." />
        <Ex jp="彼は自分のことしか考えない。" reading="かれはじぶんのことしかかんがえない。" pt="Ele só pensa em si mesmo." notes="じぶん como reflexivo de 'ele'" />
        <Note>
          Em dialeto Kansai, じぶん às vezes é usado como pronome de segunda pessoa ("você"),
          o que pode ser muito confuso para falantes de japonês padrão. Não use じぶん como "você"
          fora do Kansai — vai confundir todo mundo.
        </Note>
      </Section>

      <Section title="A omissão de pronomes — o princípio mais importante">
        <p className="text-sm leading-relaxed text-ink">
          Em japonês, quando o contexto deixa claro quem é o sujeito (ou o objeto), o pronome{' '}
          <em>simplesmente não aparece</em>. Isso é chamado de <strong>pro-drop</strong> e é a norma,
          não a exceção. Usar pronomes em excesso soa não natural — como um livro didático falado,
          não como um ser humano.
        </p>
        <GrammarTable
          headers={['Com pronome (não natural)', 'Sem pronome (natural)', 'Tradução']}
          jpCols={[0, 1]}
          rows={[
            ['わたしはどこに行きますか？', 'どこに行きますか？', 'Onde você vai?'],
            ['わたしはコーヒーが好きです。', 'コーヒーが好きです。', 'Gosto de café.'],
            ['あなたはどう思いますか？', 'どう思いますか？', 'O que você acha?'],
            ['わたしは田中です。', '田中です。', 'Sou Tanaka.'],
          ]}
        />
        <Ex jp="A：昨日、何をしましたか？　B：映画を見ました。" reading="A：きのう、なにをしましたか？　B：えいがをみました。" pt="A: O que você fez ontem? B: Assisti a um filme." notes="B não precisa de pronome — contexto é claro" />
        <Ex jp="お腹が空いたね。何か食べる？" reading="おなかがすいたね。なにかたべる？" pt="Estou com fome, né? Quer comer algo?" notes="nem sujeito nem objeto — contexto diz tudo" />
      </Section>

      <Section title="Quando incluir o pronome (uso enfático)">
        <p className="text-sm leading-relaxed text-ink">
          Incluir o pronome não é errado — é <em>enfático</em>. Quando você diz わたしが, está
          dizendo "eu (e não outra pessoa)". Quando diz あなたが, está dizendo "você (especificamente)".
          Use quando quiser destacar quem é o agente.
        </p>
        <Ex jp="わたしが行きます。（ほかの人じゃなく）" reading="わたしがいきます。" pt="Vou eu (não outra pessoa)." notes="が com pronome = ênfase forte em quem" />
        <Ex jp="あなたに頼んでいるんです。" reading="あなたにたのんでいるんです。" pt="Estou pedindo a você (especificamente)." />
        <Ex jp="私はコーヒー、あなたは紅茶ね。" reading="わたしはコーヒー、あなたはこうちゃね。" pt="Eu vou de café, você de chá, né?" notes="は com contraste — aqui os pronomes são necessários" />
      </Section>

      <Section title="Pronomes em anime vs vida real">
        <p className="text-sm leading-relaxed text-ink">
          O anime e a mídia em geral exageram o uso de certos pronomes para caracterizar
          personalidades. Conhecer essa diferença evita que você soe como um personagem fictício.
        </p>
        <GrammarTable
          headers={['Pronome', 'No anime', 'Na vida real']}
          jpCols={[0]}
          rows={[
            ['おれ', 'Protagonistas masculinos "corajosos", heróis shonen', 'Homens em conversas casuais entre amigos próximos'],
            ['ぼく', 'Garotos tímidos ou intelectuais, personagens juvenis', 'Homens jovens e alguns adultos em situações semi-formais'],
            ['わたし', 'Personagens formais, vilões aristocratas, adultos sérios', 'O pronome mais usado no dia a dia real'],
            ['あたし', 'Protagonistas femininas em geral', 'Mulheres em situações casuais'],
            ['きさま (貴様)', '"Você miserável!" — antagonistas com raiva', 'Praticamente inexistente na fala cotidiana real'],
            ['せっしゃ (拙者)', 'Personagens samurai em dramas históricos', 'Inexistente na fala moderna'],
          ]}
        />
        <Note>
          Se você aprendeu japonês principalmente por anime, preste atenção: おれ e きみ podem soar
          estranhos ou inapropriados em contextos reais. Comece com わたし e observe quais pronomes
          as pessoas usam naturalmente ao seu redor antes de adotar os mais marcados.
        </Note>
      </Section>

      <Section title="Pronomes históricos e literários">
        <p className="text-sm leading-relaxed text-ink">
          Esses pronomes aparecem em literatura clássica, poesia, jogos de RPG, animes de época e
          documentos históricos. Não são usados no japonês moderno cotidiano.
        </p>
        <GrammarTable
          headers={['Pronome', 'Leitura', 'Significado', 'Contexto']}
          jpCols={[0, 1]}
          rows={[
            ['われ / 我', 'われ / が', 'eu (literário)', 'Poesia clássica, discursos solenes, RPGs'],
            ['わが', 'わが', 'meu / nosso (literário)', '我が国 (meu país), 我が家 (minha casa)'],
            ['そなた / そち', 'そなた / そち', 'você (arcaico, respeitoso)', 'Dramas históricos feudais'],
            ['なんじ / 汝', 'なんじ', 'você (arcaico, bíblico)', 'Textos religiosos ou solenes'],
            ['かれ (古語)', 'かれ', 'aquele (pronome demonstrativo, não pessoal)', 'Japonês clássico; diferente do moderno かれ'],
          ]}
        />
      </Section>

      <Section title="Erros comuns">
        <GrammarTable
          headers={['Erro', 'Situação', 'Correto / Melhor', 'Por quê']}
          jpCols={[]}
          rows={[
            [
              'Usar pronomes em excesso',
              '"わたしはコーヒーがわたしは好きです。"',
              '"コーヒーが好きです。"',
              'Pronomes repetidos soam robóticos; omita quando contexto é claro',
            ],
            [
              'Usar おれ em ambiente formal',
              'Numa reunião de trabalho: "おれはそう思います。"',
              '"わたしはそう思います。"',
              'おれ é casual e pode soar rude ou imaturo em contexto profissional',
            ],
            [
              'Usar あなた com superior',
              '"あなたはどう思いますか、部長？"',
              '"部長はどうお考えですか？"',
              'あなた com superior é inadequado; use o cargo ou nome + さん',
            ],
            [
              'Confundir かれ (pronome) com かれ (namorado)',
              '"かれはだれですか？" (intenção: "quem é ele?")',
              '"あのひとはだれですか？"',
              'かれ implica "namorado"; あのひと é neutro para "aquela pessoa"',
            ],
          ]}
        />
      </Section>
    </div>
  );
}
