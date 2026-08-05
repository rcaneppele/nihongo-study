import { Section, Ex, Note, GrammarTable } from '../components/Licao';

export const meta = {
  id: 'sufixos',
  title: 'Sufixos de Respeito',
  subtitle: 'さん、せんせい、せんぱい e outros honoríficos',
  emoji: '🎎',
  tags: ['cultura', 'n5'],
};

export default function Sufixos() {
  return (
    <div className="space-y-10">
      <p className="leading-relaxed text-ink">
        Em japonês, chamar alguém apenas pelo nome sem um sufixo honorífico (けいしょう) é
        considerado muito íntimo ou até rude, dependendo do contexto. Os sufixos transmitem
        informações sobre o <strong>nível de respeito</strong>, a <strong>relação</strong> e às
        vezes o <strong>gênero</strong> percebido de quem fala. São adicionados após o nome de
        família ou o nome próprio — escolha depende da relação e do contexto.
      </p>

      <Section title="Os principais sufixos — visão geral">
        <GrammarTable
          headers={['Sufixo', 'Uso principal', 'Formalidade', 'Exemplo']}
          jpCols={[0, 3]}
          rows={[
            ['〜さん', 'Uso padrão, neutro e educado', '★★★', 'たなかさん'],
            ['〜くん', 'Para meninos ou subordinados jovens', '★★', 'けんくん'],
            ['〜ちゃん', 'Carinhoso (crianças, amigos íntimos)', '★', 'さくらちゃん'],
            ['〜さま', 'Muito formal e respeitoso', '★★★★', 'おきゃくさま'],
            ['〜せんせい', 'Professor, médico, mestre, político', '★★★★', 'たなかせんせい'],
            ['〜せんぱい', 'Mais experiente / mais velho no grupo', '★★★', 'すずきせんぱい'],
            ['〜こうはい', 'Mais novo no grupo (raro como sufixo)', '—', '—'],
            ['〜どの', 'Arcaico / documentos formais', '★★★★★', 'たなかじろうどの'],
          ]}
        />
      </Section>

      <Section title="〜さん — o sufixo mais versátil">
        <p className="text-sm leading-relaxed text-ink">
          Equivale aproximadamente a "sr.", "sra.", "srta.", mas sem distinção de gênero ou estado
          civil. É o sufixo mais seguro para usar com pessoas que você acabou de conhecer, colegas
          de trabalho, professores de japonês e em qualquer situação onde não tenha certeza do que
          usar.
        </p>
        <GrammarTable
          headers={['Combinação', 'Exemplo', 'Uso']}
          jpCols={[1]}
          rows={[
            ['Sobrenome + さん', 'たなかさん', 'mais comum e formal — sempre seguro'],
            ['Nome próprio + さん', 'はなこさん', 'mais íntimo que sobrenome, mas ainda respeitoso'],
            ['Profissão + さん', 'さかなやさん', 'ao falar de/com trabalhadores'],
            ['Apelido + さん', 'タナカさん', 'raro, mas possível com estrangeiros'],
          ]}
        />
        <Ex jp="たなかさん、ちょっとよろしいですか？" pt="Sr. Tanaka, você tem um momento?" notes="forma educada de interpelar alguém" />
        <Ex jp="おきゃくさん、いらっしゃいませ。" pt="Bem-vindo, cliente." notes="さん após おきゃく em lojas e restaurantes" />
      </Section>

      <Section title="〜くん — para jovens e subordinados">
        <p className="text-sm leading-relaxed text-ink">
          くん é usado por superiores ou professores ao se dirigir a meninos ou homens jovens, e
          entre colegas masculinos de mesma faixa etária. Em ambientes de trabalho, gerentes às vezes
          usam くん com funcionários jovens (homens), independentemente da formalidade do ambiente.
          Em raros contextos, também é usado com mulheres jovens subordinadas.
        </p>
        <Ex jp="やまだくん、ちょっときて。" pt="Yamada, vem cá um momento." notes="superior chamando subordinado jovem" />
        <Ex jp="けんくん、きょうもちこくか。" pt="Takeshi, chegou atrasado de novo hoje." notes="professor chamando aluno" />
        <Note>
          くん dirigido a mulheres (ex.: professores que chamam alunas de ○○くん) é mais comum em
          escolas e menos em ambientes profissionais. Pode soar paternalista se usado por homens com
          mulheres adultas sem relação clara de hierarquia.
        </Note>
      </Section>

      <Section title="〜ちゃん — carinhoso e íntimo">
        <p className="text-sm leading-relaxed text-ink">
          ちゃん é a forma diminutiva e carinhosa. É amplamente usado com crianças pequenas
          (independentemente do gênero), entre amigos muito próximos e com animais de estimação.
          Para adultos em contexto profissional, use apenas entre pessoas com relação muito próxima
          e estabelecida. Há também usos com sobrenomes ou apelidos abreviados.
        </p>
        <Ex jp="はなこちゃん、だいじょうぶ？" pt="Hanako, você está bem?" notes="falando carinhosamente com criança ou amiga próxima" />
        <Ex jp="たくちゃん、ごはんよ！" pt="Taku, hora de comer!" notes="mãe chamando filho pelo apelido + ちゃん" />
        <GrammarTable
          headers={['Apelido', 'Como se forma', 'Nome original']}
          jpCols={[0, 2]}
          rows={[
            ['たくちゃん', 'たくや → たく + ちゃん', 'たくや'],
            ['さっちゃん', 'さとこ → さ + っちゃん', 'さとこ'],
            ['けんちゃん', 'けんじ → けん + ちゃん', 'けんじ'],
          ]}
        />
      </Section>

      <Section title="〜さま — muito formal e respeitoso">
        <p className="text-sm leading-relaxed text-ink">
          さま é a forma mais elevada de respeito. No dia a dia oral, é raramente usado (soaria
          exagerado). Na escrita formal — cartas, e-mails, correspondência comercial — é padrão. Há
          também usos fixos em atendimento ao cliente.
        </p>
        <GrammarTable
          headers={['Uso', 'Exemplo', 'Contexto']}
          jpCols={[1]}
          rows={[
            ['Nome em cartas', 'たなかじろうさま', 'correspondência formal'],
            ['Cliente', 'おきゃくさま', 'comércio, hotelaria, transporte'],
            ['Todos os presentes', 'みなさま', 'discursos, apresentações formais'],
            ['Deus, divindade', 'かみさま', 'uso religioso ou irônico'],
            ['Forma de elogio extremo', 'せんせいさま', 'arcaico / irônico atualmente'],
          ]}
        />
        <Ex jp="たなかさま、ほんじつはごらいてんありがとうございます。" pt="Sr. Tanaka, obrigado por nos visitar hoje." notes="atendimento de alto nível" />
        <Ex jp="みなさま、ほんじつはおあつまりいただきありがとうございます。" pt="Senhoras e senhores, obrigado por se reunirem aqui hoje." />
      </Section>

      <Section title="せんせい — mais que 'professor'">
        <p className="text-sm leading-relaxed text-ink">
          せんせい é usado como sufixo e como título para professores, médicos, dentistas, advogados,
          políticos eleitos e qualquer pessoa reconhecida como mestre ou autoridade em sua área. É
          colocado após o sobrenome.
        </p>
        <Ex jp="たなかせんせい、しつもんがあります。" pt="Professor Tanaka, tenho uma pergunta." />
        <Ex jp="せんせい、ありがとうございました。" pt="Obrigado, professor." notes="せんせい sozinho também funciona como chamado" />
        <Ex jp="やまだせんせいはげかいです。" pt="O Dr. Yamada é cirurgião." />
        <Note>
          Nunca use せんせい para se referir a si mesmo. Dizer「わたしはせんせいです」(Sou
          professor) ao se apresentar é correto; mas dirigir-se a si mesmo como「せんせい」no
          discurso seria presunçoso.
        </Note>
      </Section>

      <Section title="せんぱい e こうはい — hierarquia de grupo">
        <p className="text-sm leading-relaxed text-ink">
          O conceito de <strong>せんぱい／こうはい</strong> é central na cultura japonesa
          — mais do que uma simples questão de idade, refere-se a quem entrou antes ou depois em um
          grupo (escola, clube, empresa). O せんぱい orienta e protege; o こうはい respeita e aprende.
          Essa relação cria obrigações mútuas que podem durar décadas.
        </p>
        <Ex jp="せんぱい、おしえてください。" pt="Senpai, por favor me ensine." />
        <Ex jp="すずきせんぱいのおかげです。" pt="É graças ao senpai Suzuki." />
        <Ex jp="こうはいのめんどうをみるのはせんぱいのやくめです。" pt="Cuidar dos mais novos é a responsabilidade do senpai." />
        <Note>
          こうはい raramente é usado como sufixo no nome de alguém. Diz-se 「わたしのこうはい」
          (meu kouhai) ou usa-se o nome + さん/くん. Tratar um こうはい de forma desrespeitosa é
          socialmente problemático — a hierarquia é de cuidado mútuo, não de exploração.
        </Note>
      </Section>

      <Section title="Prefixos honoríficos — お e ご">
        <p className="text-sm leading-relaxed text-ink">
          Além dos sufixos, o japonês usa prefixos <strong>お</strong> e <strong>ご</strong> para
          tornar palavras mais polidas ou honrosas. お é usado antes de palavras de origem japonesa
          (わご); ご antes de palavras de origem chinesa (かんご). Há exceções.
        </p>
        <GrammarTable
          headers={['Prefixo', 'Exemplo', 'Significado', 'Origem']}
          jpCols={[1]}
          rows={[
            ['お', 'おなまえ', 'seu nome (respeitoso)', 'japonesa'],
            ['お', 'おみず', 'água (polido)', 'japonesa'],
            ['お', 'おしごと', 'seu trabalho', 'japonesa'],
            ['お', 'おちゃ', 'chá (polido)', 'japonesa'],
            ['ご', 'ごかぞく', 'sua família', 'chinesa'],
            ['ご', 'ごじゅうしょ', 'seu endereço', 'chinesa'],
            ['ご', 'ごいけん', 'sua opinião', 'chinesa'],
            ['ご', 'ごはん', 'refeição / arroz', 'exceção comum'],
          ]}
        />
        <Note>
          Não adicione お/ご a tudo — soaria excessivo. Esses prefixos são usados para coisas{' '}
          <em>relacionadas à outra pessoa</em> (おなまえ, ごじゅうしょ) ou em expressões
          estabelecidas (おちゃ, ごはん). Para as coisas suas próprias em contexto formal, evite:
          dizer 「わたしのおなまえは…」 seria estranho.
        </Note>
      </Section>

      <Section title="Títulos corporativos e organizacionais">
        <p className="text-sm leading-relaxed text-ink">
          Em empresas e organizações, cargos também funcionam como formas de endereçamento. Em vez de
          usar さん com superiores, muitas vezes usa-se o cargo diretamente.
        </p>
        <GrammarTable
          headers={['Título', 'Cargo']}
          jpCols={[0]}
          rows={[
            ['しゃちょう', 'Presidente / CEO'],
            ['ふくしゃちょう', 'Vice-presidente'],
            ['ぶちょう', 'Diretor / Chefe de departamento'],
            ['かちょう', 'Gerente / Chefe de seção'],
            ['かかりちょう', 'Supervisor de equipe'],
            ['しゅにん', 'Líder / Responsável'],
            ['どうりょう', 'Colega (mesmo nível)'],
          ]}
        />
        <Ex jp="ぶちょう、ごほうこくがあります。" pt="Diretor, tenho um relatório para fazer." notes="cargo como forma de chamar — sem usar o nome" />
        <Ex jp="たなかぶちょうはいらっしゃいますか？" pt="O diretor Tanaka está?" notes="sobrenome + cargo como sufixo" />
      </Section>

      <Section title="Regras fundamentais">
        <Note>
          <strong>Nunca adicione sufixos ao seu próprio nome.</strong> Dizer 「わたしはたなかさんです」
          ao se apresentar soa arrogante. Diga apenas 「たなかです」 ou 「たなかともうします」 (formal).
        </Note>
        <Note>
          <strong>Chamar alguém pelo nome sem sufixo</strong> (よびすて) é reservado para
          relações muito íntimas, ou de um superior a um subordinado. Entre desconhecidos ou pessoas
          de nível similar, soaria rude ou presunçoso.
        </Note>
        <Note>
          <strong>Mudar de さん para ちゃん/くん</strong> simboliza uma aproximação na relação. Sempre
          espere que a outra pessoa sugira ("ちゃんでよんでいいよ" = Pode me chamar de ちゃん) antes
          de tomar essa iniciativa.
        </Note>
        <GrammarTable
          headers={['Contexto', 'Sufixo recomendado']}
          jpCols={[]}
          rows={[
            ['Pessoa que você acabou de conhecer', 'さん'],
            ['Professor, médico, dentista, advogado', 'せんせい'],
            ['Veterano no clube / empresa', 'せんぱい'],
            ['Criança pequena (qualquer gênero)', 'ちゃん ou nome sem sufixo'],
            ['Amigo íntimo de longa data', 'くん / ちゃん / nome sem sufixo'],
            ['Cliente, hóspede', 'さま (ou さん em contexto simples)'],
            ['Colega de mesmo nível no trabalho', 'さん'],
            ['Superior com cargo', 'Cargo + さん (ex.: ぶちょうさん) ou só cargo'],
            ['Email / carta formal', 'さま'],
          ]}
        />
      </Section>

      <Section title="Erros comuns">
        <GrammarTable
          headers={['Erro', 'Situação', 'Correto', 'Por quê']}
          jpCols={[]}
          rows={[
            [
              'Chamar médico de さん',
              '"やまださん、つぎはわたしですか？" ao médico',
              '"やまだせんせい、つぎはわたしですか？"',
              'Médicos, dentistas e professores recebem せんせい',
            ],
            [
              'Usar さん para si mesmo',
              '"わたしはたなかさんです。"',
              '"わたしはたなかです。"',
              'Adicionar さん ao próprio nome é arrogante',
            ],
            [
              'Usar ちゃん com desconhecido adulto',
              'Chamar nova colega de "はなこちゃん" no primeiro dia',
              '"はなこさん"',
              'ちゃん com adulto desconhecido é invasivo; espere a relação se desenvolver',
            ],
            [
              'Omitir o sufixo com superior',
              '"たなか、ちょっといいですか？" para o chefe',
              '"たなかさん" ou "たなかぶちょう"',
              'Chamar superior pelo nome sem sufixo é muito rude',
            ],
          ]}
        />
      </Section>
    </div>
  );
}
