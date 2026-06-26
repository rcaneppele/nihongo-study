import { Section, Ex, Note, GrammarTable } from '../components/Licao';

export const meta = {
  id: 'sufixos',
  title: 'Sufixos de Respeito',
  subtitle: 'さん、先生、先輩 e outros honoríficos',
  emoji: '🎎',
  tags: ['cultura', 'n5'],
};

export default function Sufixos() {
  return (
    <div className="space-y-10">
      <p className="leading-relaxed text-ink">
        Em japonês, chamar alguém apenas pelo nome sem um sufixo honorífico (敬称 — けいしょう) é
        considerado muito íntimo ou até rude, dependendo do contexto. Os sufixos transmitem
        informações sobre o <strong>nível de respeito</strong>, a <strong>relação</strong> e às
        vezes o <strong>gênero</strong> percebido de quem fala. São adicionados após o nome de
        família ou o nome próprio — escolha depende da relação e do contexto.
      </p>

      <Section title="Os principais sufixos — visão geral">
        <GrammarTable
          headers={['Sufixo', 'Leitura', 'Uso principal', 'Formalidade', 'Exemplo']}
          jpCols={[0, 4]}
          rows={[
            ['〜さん', 'さん', 'Uso padrão, neutro e educado', '★★★', '田中さん'],
            ['〜くん', 'くん', 'Para meninos ou subordinados jovens', '★★', '健くん'],
            ['〜ちゃん', 'ちゃん', 'Carinhoso (crianças, amigos íntimos)', '★', 'さくらちゃん'],
            ['〜さま', 'さま', 'Muito formal e respeitoso', '★★★★', 'お客さま'],
            ['〜先生', 'せんせい', 'Professor, médico, mestre, político', '★★★★', '田中先生'],
            ['〜先輩', 'せんぱい', 'Mais experiente / mais velho no grupo', '★★★', '鈴木先輩'],
            ['〜後輩', 'こうはい', 'Mais novo no grupo (raro como sufixo)', '—', '—'],
            ['〜どの', 'どの', 'Arcaico / documentos formais', '★★★★★', '田中次郎どの'],
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
            ['Sobrenome + さん', '田中さん', 'mais comum e formal — sempre seguro'],
            ['Nome próprio + さん', '花子さん', 'mais íntimo que sobrenome, mas ainda respeitoso'],
            ['Profissão + さん', '魚屋さん (さかなやさん)', 'ao falar de/com trabalhadores'],
            ['Apelido + さん', 'タナカさん', 'raro, mas possível com estrangeiros'],
          ]}
        />
        <Ex jp="田中さん、ちょっとよろしいですか？" reading="たなかさん、ちょっとよろしいですか？" pt="Sr. Tanaka, você tem um momento?" notes="forma educada de interpelar alguém" />
        <Ex jp="お客さん、いらっしゃいませ。" reading="おきゃくさん、いらっしゃいませ。" pt="Bem-vindo, cliente." notes="さん após お客 em lojas e restaurantes" />
      </Section>

      <Section title="〜くん — para jovens e subordinados">
        <p className="text-sm leading-relaxed text-ink">
          くん é usado por superiores ou professores ao se dirigir a meninos ou homens jovens, e
          entre colegas masculinos de mesma faixa etária. Em ambientes de trabalho, gerentes às vezes
          usam くん com funcionários jovens (homens), independentemente da formalidade do ambiente.
          Em raros contextos, também é usado com mulheres jovens subordinadas.
        </p>
        <Ex jp="山田くん、ちょっと来て。" reading="やまだくん、ちょっときて。" pt="Yamada, vem cá um momento." notes="superior chamando subordinado jovem" />
        <Ex jp="健くん、今日も遅刻か。" reading="けんくん、きょうもちこくか。" pt="Takeshi, chegou atrasado de novo hoje." notes="professor chamando aluno" />
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
        <Ex jp="花子ちゃん、大丈夫？" reading="はなこちゃん、だいじょうぶ？" pt="Hanako, você está bem?" notes="falando carinhosamente com criança ou amiga próxima" />
        <Ex jp="たくちゃん、ご飯よ！" reading="たくちゃん、ごはんよ！" pt="Taku, hora de comer!" notes="mãe chamando filho pelo apelido + ちゃん" />
        <GrammarTable
          headers={['Apelido', 'Como se forma', 'Nome original']}
          jpCols={[0, 2]}
          rows={[
            ['たくちゃん', 'たくや → たく + ちゃん', '拓也（たくや）'],
            ['さっちゃん', 'さとこ → さ + っちゃん', '聡子（さとこ）'],
            ['けんちゃん', 'けんじ → けん + ちゃん', '健二（けんじ）'],
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
            ['Nome em cartas', '田中次郎様', 'correspondência formal'],
            ['Cliente', 'お客様（おきゃくさま）', 'comércio, hotelaria, transporte'],
            ['Todos os presentes', '皆様（みなさま）', 'discursos, apresentações formais'],
            ['Deus, divindade', '神様（かみさま）', 'uso religioso ou irônico'],
            ['Forma de elogio extremo', '先生様', 'arcaico / irônico atualmente'],
          ]}
        />
        <Ex jp="田中様、本日はご来店ありがとうございます。" reading="たなかさま、ほんじつはごらいてんありがとうございます。" pt="Sr. Tanaka, obrigado por nos visitar hoje." notes="atendimento de alto nível" />
        <Ex jp="皆様、本日はお集まりいただきありがとうございます。" reading="みなさま、ほんじつはおあつまりいただきありがとうございます。" pt="Senhoras e senhores, obrigado por se reunirem aqui hoje." />
      </Section>

      <Section title="先生 — mais que 'professor'">
        <p className="text-sm leading-relaxed text-ink">
          先生 é usado como sufixo e como título para professores, médicos, dentistas, advogados,
          políticos eleitos e qualquer pessoa reconhecida como mestre ou autoridade em sua área. É
          colocado após o sobrenome.
        </p>
        <Ex jp="田中先生、質問があります。" reading="たなかせんせい、しつもんがあります。" pt="Professor Tanaka, tenho uma pergunta." />
        <Ex jp="先生、ありがとうございました。" reading="せんせい、ありがとうございました。" pt="Obrigado, professor." notes="先生 sozinho também funciona como chamado" />
        <Ex jp="山田先生は外科医です。" reading="やまだせんせいはげかいです。" pt="O Dr. Yamada é cirurgião." />
        <Note>
          Nunca use 先生 para se referir a si mesmo. Dizer「私は先生です」(Sou professor) ao se
          apresentar é correto; mas dirigir-se a si mesmo como「先生」no discurso seria presunçoso.
        </Note>
      </Section>

      <Section title="先輩 e 後輩 — hierarquia de grupo">
        <p className="text-sm leading-relaxed text-ink">
          O conceito de <strong>先輩／後輩</strong> (せんぱい／こうはい) é central na cultura japonesa
          — mais do que uma simples questão de idade, refere-se a quem entrou antes ou depois em um
          grupo (escola, clube, empresa). O 先輩 orienta e protege; o 後輩 respeita e aprende.
          Essa relação cria obrigações mútuas que podem durar décadas.
        </p>
        <Ex jp="先輩、教えてください。" reading="せんぱい、おしえてください。" pt="Senpai, por favor me ensine." />
        <Ex jp="鈴木先輩のおかげです。" reading="すずきせんぱいのおかげです。" pt="É graças ao senpai Suzuki." />
        <Ex jp="後輩の面倒を見るのは先輩の役目です。" reading="こうはいのめんどうをみるのはせんぱいのやくめです。" pt="Cuidar dos mais novos é a responsabilidade do senpai." />
        <Note>
          後輩 raramente é usado como sufixo no nome de alguém. Diz-se 「私の後輩」(meu kouhai)
          ou usa-se o nome + さん/くん. Tratar um 後輩 de forma desrespeitosa é socialmente
          problemático — a hierarquia é de cuidado mútuo, não de exploração.
        </Note>
      </Section>

      <Section title="Prefixos honoríficos — お e ご">
        <p className="text-sm leading-relaxed text-ink">
          Além dos sufixos, o japonês usa prefixos <strong>お</strong> e <strong>ご</strong> para
          tornar palavras mais polidas ou honrosas. お é usado antes de palavras de origem japonesa
          (和語 — わご); ご antes de palavras de origem chinesa (漢語 — かんご). Há exceções.
        </p>
        <GrammarTable
          headers={['Prefixo', 'Exemplo', 'Leitura', 'Significado', 'Origem']}
          jpCols={[1, 2]}
          rows={[
            ['お', 'お名前', 'おなまえ', 'seu nome (respeitoso)', 'japonesa'],
            ['お', 'お水', 'おみず', 'água (polido)', 'japonesa'],
            ['お', 'お仕事', 'おしごと', 'seu trabalho', 'japonesa'],
            ['お', 'お茶', 'おちゃ', 'chá (polido)', 'japonesa'],
            ['ご', 'ご家族', 'ごかぞく', 'sua família', 'chinesa'],
            ['ご', 'ご住所', 'ごじゅうしょ', 'seu endereço', 'chinesa'],
            ['ご', 'ご意見', 'ごいけん', 'sua opinião', 'chinesa'],
            ['ご', 'ご飯', 'ごはん', 'refeição / arroz', 'exceção comum'],
          ]}
        />
        <Note>
          Não adicione お/ご a tudo — soaria excessivo. Esses prefixos são usados para coisas{' '}
          <em>relacionadas à outra pessoa</em> (お名前, ご住所) ou em expressões estabelecidas (お茶,
          ご飯). Para as coisas suas próprias em contexto formal, evite: dizer 「私のお名前は…」
          seria estranho.
        </Note>
      </Section>

      <Section title="Títulos corporativos e organizacionais">
        <p className="text-sm leading-relaxed text-ink">
          Em empresas e organizações, cargos também funcionam como formas de endereçamento. Em vez de
          usar さん com superiores, muitas vezes usa-se o cargo diretamente.
        </p>
        <GrammarTable
          headers={['Título', 'Leitura', 'Cargo']}
          jpCols={[0, 1]}
          rows={[
            ['社長', 'しゃちょう', 'Presidente / CEO'],
            ['副社長', 'ふくしゃちょう', 'Vice-presidente'],
            ['部長', 'ぶちょう', 'Diretor / Chefe de departamento'],
            ['課長', 'かちょう', 'Gerente / Chefe de seção'],
            ['係長', 'かかりちょう', 'Supervisor de equipe'],
            ['主任', 'しゅにん', 'Líder / Responsável'],
            ['同僚', 'どうりょう', 'Colega (mesmo nível)'],
          ]}
        />
        <Ex jp="部長、ご報告があります。" reading="ぶちょう、ごほうこくがあります。" pt="Diretor, tenho um relatório para fazer." notes="cargo como forma de chamar — sem usar o nome" />
        <Ex jp="田中部長はいらっしゃいますか？" reading="たなかぶちょうはいらっしゃいますか？" pt="O diretor Tanaka está?" notes="sobrenome + cargo como sufixo" />
      </Section>

      <Section title="Regras fundamentais">
        <Note>
          <strong>Nunca adicione sufixos ao seu próprio nome.</strong> Dizer 「わたしは田中さんです」
          ao se apresentar soa arrogante. Diga apenas 「田中です」 ou 「田中と申します」 (formal).
        </Note>
        <Note>
          <strong>Chamar alguém pelo nome sem sufixo</strong> (呼び捨て — よびすて) é reservado para
          relações muito íntimas, ou de um superior a um subordinado. Entre desconhecidos ou pessoas
          de nível similar, soaria rude ou presunçoso.
        </Note>
        <Note>
          <strong>Mudar de さん para ちゃん/くん</strong> simboliza uma aproximação na relação. Sempre
          espere que a outra pessoa sugira ("ちゃんで呼んでいいよ" = Pode me chamar de ちゃん) antes
          de tomar essa iniciativa.
        </Note>
        <GrammarTable
          headers={['Contexto', 'Sufixo recomendado']}
          jpCols={[]}
          rows={[
            ['Pessoa que você acabou de conhecer', 'さん'],
            ['Professor, médico, dentista, advogado', '先生'],
            ['Veterano no clube / empresa', '先輩'],
            ['Criança pequena (qualquer gênero)', 'ちゃん ou nome sem sufixo'],
            ['Amigo íntimo de longa data', 'くん / ちゃん / nome sem sufixo'],
            ['Cliente, hóspede', 'さま (ou さん em contexto simples)'],
            ['Colega de mesmo nível no trabalho', 'さん'],
            ['Superior com cargo', 'Cargo + さん (ex.: 部長さん) ou só cargo'],
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
              '"山田さん、次は私ですか？" ao médico',
              '"山田先生、次は私ですか？"',
              'Médicos, dentistas e professores recebem 先生',
            ],
            [
              'Usar さん para si mesmo',
              '"私は田中さんです。"',
              '"私は田中です。"',
              'Adicionar さん ao próprio nome é arrogante',
            ],
            [
              'Usar ちゃん com desconhecido adulto',
              'Chamar nova colega de "花子ちゃん" no primeiro dia',
              '"花子さん"',
              'ちゃん com adulto desconhecido é invasivo; espere a relação se desenvolver',
            ],
            [
              'Omitir o sufixo com superior',
              '"田中、ちょっといいですか？" para o chefe',
              '"田中さん" ou "田中部長"',
              'Chamar superior pelo nome sem sufixo é muito rude',
            ],
          ]}
        />
      </Section>
    </div>
  );
}
