import { Section, Ex, Note, GrammarTable, ReadingKey } from '../components/Licao';

export const meta = {
  id: 'pronomes',
  title: 'Pronomes Pessoais',
  subtitle: 'わたし, ぼく, あなた e a arte de omiti-los',
  emoji: '👤',
  tags: ['gramática', 'n5'],
};

export default function Pronomes() {
  return (
    <div className="space-y-10">
      <Section title="Como ler esta lição">
        <p className="text-sm leading-relaxed text-ink">
          Cada pronome aparece com kanji (referência), leitura e romaji:
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

      <Section title="Duas ideias centrais">
        <p className="text-sm leading-relaxed text-ink">
          Antes das listas, guarde duas ideias que valem para tudo nesta lição:
        </p>
        <ol className="list-decimal space-y-1.5 pl-5 text-sm leading-relaxed text-ink">
          <li>
            <strong>O japonês omite pronomes o tempo todo.</strong> Quando o contexto já deixa
            claro de quem se fala, o pronome simplesmente some. Isso é o normal, não a exceção.
          </li>
          <li>
            <strong>Existem vários pronomes para "eu" e "você".</strong> Eles mudam conforme
            formalidade, gênero e até personalidade. Escolher o errado pode soar estranho ou
            grosseiro.
          </li>
        </ol>
        <p className="text-sm leading-relaxed text-ink">
          Por isso, a regra de ouro para iniciantes é: use{' '}
          <strong className="font-jp">わたし</strong> para "eu" e <strong>evite</strong> dizer
          "você" (veja como mais adiante).
        </p>
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
        <Note>
          Para iniciantes, <span className="font-jp">わたし</span> é sempre a escolha segura.
          Aprenda <span className="font-jp">ぼく</span> e <span className="font-jp">おれ</span> de
          forma passiva primeiro (você vai entendê-los em anime e conversas) antes de usá-los,
          porque a escolha do pronome já diz muito sobre a sua imagem.
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
      </Section>

      <Section title="Segunda pessoa — 'você'">
        <p className="text-sm leading-relaxed text-ink">
          Aqui é preciso muito cuidado. Vários pronomes de "você" soam frios ou rudes.
        </p>
        <GrammarTable
          headers={['Kanji', 'Hiragana', 'Romaji', 'Registro', 'Atenção']}
          jpCols={[0, 1]}
          rows={[
            ['貴方', 'あなた', 'anata', 'neutro / formal', 'Correto, mas pode soar distante ou frio entre iguais.'],
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
      </Section>

      <Section title="'Vocês / todos' — plurais da segunda pessoa">
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
        <Note>
          <span className="font-jp">かれ</span> e <span className="font-jp">かのじょ</span>{' '}
          costumam ser <strong>evitados</strong> como "ele/ela" justamente porque também
          significam "namorado/namorada". Para se referir a alguém, os japoneses preferem o nome,
          ou <span className="font-jp">あのひと</span> / <span className="font-jp">あのかた</span>.
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
          jp="わたしはコーヒー、あなたはこうちゃね。"
          romaji="watashi wa koohii, anata wa koucha ne."
          pt="Eu vou de café, você de chá, né?"
          notes="Aqui há contraste (は), então os pronomes são necessários."
        />
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
            ['nós', 'わたしたち'],
            ['todos / pessoal', 'みなさん'],
            ['aquela pessoa (ele/ela)', 'あのひと'],
            ['eu mesmo / si mesmo', 'じぶん'],
          ]}
        />
      </Section>
    </div>
  );
}
