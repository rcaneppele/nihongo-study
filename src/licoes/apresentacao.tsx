import { Section, Ex, Note, GrammarTable } from '../components/Licao';

export const meta = {
  id: 'apresentacao',
  title: 'Auto-apresentação',
  subtitle: '自己紹介 — Jikoshoukai',
  emoji: '🙇',
  tags: ['conversa', 'n5'],
};

export default function Apresentacao() {
  return (
    <div className="space-y-10">
      <p className="leading-relaxed text-ink">
        A <strong>自己紹介</strong> (じこしょうかい — jikoshoukai) é a auto-apresentação. Ela
        aparece em praticamente toda situação social no Japão: primeiro dia de aula, ingresso em uma
        empresa, reuniões de grupos de hobby, encontros online e muito mais. Existe uma estrutura
        bastante convencional que os japoneses seguem, e dominá-la dá confiança para iniciar
        qualquer relação social em japonês.
      </p>

      <Section title="Estrutura padrão">
        <GrammarTable
          headers={['Passo', 'Função', 'Frase modelo']}
          jpCols={[2]}
          rows={[
            ['1', 'Cumprimento inicial', 'はじめまして。'],
            ['2', 'Dizer o nome', '〜と申します。（formal） / 〜です。（neutro）'],
            ['3', 'Origem', '〜から来ました。 / 〜出身です。'],
            ['4', 'Ocupação / escola / foco atual', '〜をしています。 / 〜の学生です。'],
            ['5', 'Hobby ou informação pessoal', '趣味は〜です。 / 〜が好きです。'],
            ['6', 'Encerramento', 'どうぞよろしくおねがいします。'],
          ]}
        />
        <Note>
          A ordem dos passos é bastante flexível, exceto pelo cumprimento no início e o encerramento
          no final. Na prática, a duração da apresentação varia muito: uma 自己紹介 de escritório
          pode levar 1 minuto; em reuniões de grupo pode ser mais longa com perguntas.
        </Note>
      </Section>

      <Section title="Frases essenciais">
        <GrammarTable
          headers={['Japonês', 'Leitura', 'Significado', 'Registro']}
          jpCols={[0, 1]}
          rows={[
            ['はじめまして', 'はじめまして', 'prazer em conhecê-lo (primeira vez)', 'neutro'],
            ['〜と申します', '〜ともうします', 'meu nome é ~ (muito formal)', 'muito formal'],
            ['〜と言います', '〜といいます', 'me chamo ~', 'padrão'],
            ['〜です', '〜です', 'sou ~', 'neutro'],
            ['〜から来ました', '〜からきました', 'vim de ~', 'neutro'],
            ['〜出身です', '〜しゅっしんです', 'sou de ~ (origem)', 'neutro'],
            ['〜に住んでいます', '〜にすんでいます', 'moro em ~', 'neutro'],
            ['〜さいです', '〜さいです', 'tenho ~ anos', 'neutro'],
            ['〜をしています', '〜をしています', 'trabalho como ~', 'neutro'],
            ['〜の学生です', '〜のがくせいです', 'sou estudante de ~', 'neutro'],
            ['趣味は〜です', 'しゅみは〜です', 'meu hobby é ~', 'neutro'],
            ['〜が好きです', '〜がすきです', 'gosto de ~', 'neutro'],
            ['〜を勉強しています', '〜をべんきょうしています', 'estou estudando ~', 'neutro'],
            ['どうぞよろしくおねがいします', 'どうぞよろしくおねがいします', 'muito prazer / às suas ordens', 'formal/neutro'],
            ['よろしくおねがいします', 'よろしくおねがいします', 'prazer (padrão)', 'neutro'],
            ['よろしく', 'よろしく', 'prazer (informal)', 'casual'],
          ]}
        />
      </Section>

      <Section title="Exemplo formal — escola ou trabalho">
        <div className="space-y-2 rounded-xl border border-line bg-white/60 px-5 py-4">
          <Ex jp="はじめまして。" pt="Prazer em conhecê-lo." />
          <Ex jp="田中次郎と申します。" reading="たなかじろうともうします。" pt="Meu nome é Tanaka Jiro." notes="と申します: forma muito formal de dizer o próprio nome" />
          <Ex jp="ブラジルのサンパウロから参りました。" reading="ブラジルのサンパウロからまいりました。" pt="Vim de São Paulo, Brasil." notes="参りました (まいりました) é a forma humilde de 来ました" />
          <Ex jp="現在、IT関係の仕事をしております。" reading="げんざい、ITかんけいのしごとをしております。" pt="Atualmente trabalho na área de TI." notes="おります: forma humilde de います" />
          <Ex jp="日本語はまだ勉強中ですが、よろしくおねがいいたします。" reading="にほんごはまだべんきょうちゅうですが、よろしくおねがいいたします。" pt="Ainda estou estudando japonês, mas muito prazer." />
        </div>
      </Section>

      <Section title="Exemplo casual — turma de japonês ou grupo de hobby">
        <div className="space-y-2 rounded-xl border border-line bg-white/60 px-5 py-4">
          <Ex jp="はじめまして！田中です。" pt="Prazer! Sou Tanaka." />
          <Ex jp="ブラジル出身で、サンパウロに住んでいます。" reading="ブラジルしゅっしんで、サンパウロにすんでいます。" pt="Sou do Brasil e moro em São Paulo." />
          <Ex jp="28歳です。" reading="にじゅうはっさいです。" pt="Tenho 28 anos." />
          <Ex jp="今、日本語を勉強しています。アニメがきっかけで始めました。" reading="いま、にほんごをべんきょうしています。アニメがきっかけではじめました。" pt="Estou estudando japonês. Comecei por causa do anime." />
          <Ex jp="趣味は音楽を聴くことと料理です。" reading="しゅみはおんがくをきくこととりょうりです。" pt="Meus hobbies são ouvir música e cozinhar." />
          <Ex jp="よろしくおねがいします！" pt="Muito prazer!" />
        </div>
      </Section>

      <Section title="Exemplo online — aula de japonês por videochamada">
        <div className="space-y-2 rounded-xl border border-line bg-white/60 px-5 py-4">
          <Ex jp="はじめまして。画面越しですが、よろしくおねがいします。" reading="はじめまして。がめんごしですが、よろしくおねがいします。" pt="Prazer. Mesmo que seja pela tela, muito prazer." notes="画面越し (がめんごし) = através da tela" />
          <Ex jp="ブラジルからオンラインで参加しています。" reading="ブラジルからオンラインでさんかしています。" pt="Estou participando online do Brasil." />
          <Ex jp="時差は12時間あります。" reading="じさは12じかんあります。" pt="A diferença de fuso horário é de 12 horas." notes="時差 (じさ) = diferença de horário" />
          <Ex jp="日本に行ったことはまだありませんが、いつか行きたいです。" reading="にほんにいったことはまだありませんが、いつかいきたいです。" pt="Ainda não fui ao Japão, mas quero ir algum dia." />
        </div>
      </Section>

      <Section title="Apresentando outra pessoa">
        <p className="text-sm leading-relaxed text-ink">
          Quando você precisa apresentar alguém a outra pessoa:
        </p>
        <Ex jp="こちらは田中さんです。" reading="こちらはたなかさんです。" pt="Este é o sr. Tanaka." notes="こちら é a forma educada de apresentar pessoas" />
        <Ex jp="田中さんをご紹介します。" reading="たなかさんをごしょうかいします。" pt="Vou apresentar o sr. Tanaka." notes="ご紹介します: forma formal de introduzir alguém" />
        <Ex jp="田中さんは私の同僚です。" reading="たなかさんはわたしのどうりょうです。" pt="O sr. Tanaka é meu colega." />
        <Ex jp="こちらの方が山田先生です。どうぞよろしくおねがいします。" reading="こちらのかたがやまだせんせいです。どうぞよろしくおねがいします。" pt="Esta pessoa é a professora Yamada. Muito prazer." />
      </Section>

      <Section title="Perguntas que você pode receber">
        <p className="text-sm leading-relaxed text-ink">
          Depois da apresentação, é comum receber perguntas. Prepare respostas para as mais comuns:
        </p>
        <GrammarTable
          headers={['Pergunta', 'Leitura', 'Tradução']}
          jpCols={[0, 1]}
          rows={[
            ['日本語はどのくらい勉強していますか？', 'にほんごはどのくらいべんきょうしていますか？', 'Há quanto tempo estuda japonês?'],
            ['どうして日本語を勉強していますか？', 'どうしてにほんごをべんきょうしていますか？', 'Por que está estudando japonês?'],
            ['日本に来たことがありますか？', 'にほんにきたことがありますか？', 'Já veio ao Japão?'],
            ['好きな日本食は何ですか？', 'すきなにほんしょくはなんですか？', 'Qual comida japonesa você gosta?'],
            ['趣味は何ですか？', 'しゅみはなんですか？', 'Qual é o seu hobby?'],
            ['お仕事は何をされていますか？', 'おしごとはなにをされていますか？', 'O que você faz?'],
          ]}
        />
      </Section>

      <Section title="Como responder às perguntas">
        <Ex jp="まだ始めたばかりです。半年くらいです。" reading="まだはじめたばかりです。はんとしくらいです。" pt="Acabei de começar. Faz uns seis meses." />
        <Ex jp="アニメやゲームがきっかけで、日本語に興味を持ちました。" reading="アニメやゲームがきっかけで、にほんごにきょうみをもちました。" pt="Comecei pelo anime e games e me interessei pela língua." />
        <Ex jp="まだ行ったことがありませんが、いつか行きたいと思っています。" reading="まだいったことがありませんが、いつかいきたいとおもっています。" pt="Ainda não fui, mas pretendo ir algum dia." />
        <Ex jp="日本語はまだあまり上手じゃないですが、頑張っています。" reading="にほんごはまだあまりじょうずじゃないですが、がんばっています。" pt="Ainda não sou muito bom em japonês, mas estou me esforçando." notes="auto-depreciação comum e bem recebida no Japão" />
      </Section>

      <Section title="Vocabulário de hobbies e interesses">
        <GrammarTable
          headers={['Japonês', 'Leitura', 'Significado']}
          jpCols={[0, 1]}
          rows={[
            ['音楽を聴く', 'おんがくをきく', 'ouvir música'],
            ['映画を見る', 'えいがをみる', 'assistir filmes'],
            ['読書', 'どくしょ', 'leitura'],
            ['料理', 'りょうり', 'cozinhar / culinária'],
            ['旅行', 'りょこう', 'viajar / viagem'],
            ['スポーツ', 'スポーツ', 'esporte'],
            ['ゲーム', 'ゲーム', 'jogos (video game)'],
            ['アニメ', 'アニメ', 'anime'],
            ['写真を撮る', 'しゃしんをとる', 'tirar fotos / fotografia'],
            ['絵を描く', 'えをかく', 'desenhar / pintar'],
            ['ヨガ', 'ヨガ', 'yoga'],
            ['ハイキング', 'ハイキング', 'caminhada / trilha'],
          ]}
        />
      </Section>

      <Section title="Vocabulário de ocupações">
        <GrammarTable
          headers={['Japonês', 'Leitura', 'Significado']}
          jpCols={[0, 1]}
          rows={[
            ['学生', 'がくせい', 'estudante'],
            ['会社員', 'かいしゃいん', 'funcionário de empresa'],
            ['エンジニア', 'エンジニア', 'engenheiro / desenvolvedor'],
            ['デザイナー', 'デザイナー', 'designer'],
            ['先生', 'せんせい', 'professor'],
            ['医者', 'いしゃ', 'médico'],
            ['看護師', 'かんごし', 'enfermeiro(a)'],
            ['フリーランス', 'フリーランス', 'freelancer'],
            ['自営業', 'じえいぎょう', 'autônomo / empreendedor'],
            ['公務員', 'こうむいん', 'servidor público'],
          ]}
        />
      </Section>

      <Section title="Dicas culturais">
        <Note>
          <strong>Reverência (お辞儀 — おじぎ):</strong> Ao se apresentar, uma leve inclinação de 15
          graus é apropriada. Em contextos mais formais (entrevistas, negócios), 30 graus. Mantenha
          as mãos ao lado do corpo (homens) ou juntas na frente (mulheres).
        </Note>
        <Note>
          <strong>Cartão de visita (名刺 — めいし):</strong> Se receber um, segure com as duas mãos,
          olhe com atenção, e coloque na mesa à sua frente durante a reunião. Nunca escreva nele,
          não o dobre e não o guarde no bolso de trás.
        </Note>
        <Note>
          <strong>Auto-depreciação:</strong> É comum dizer coisas como「まだまだです」(ainda tenho
          muito a melhorar) mesmo sendo bastante competente. Aceitar elogios diretamente com
          「ありがとうございます、上手でしょう」pode soar arrogante.
        </Note>
        <Note>
          <strong>Tópicos a evitar na primeira apresentação:</strong> salário, religião e política
          são considerados privados. Perguntar a idade é aceitável no Japão, mas em contextos
          formais, espere que a outra pessoa mencione ou não pergunte.
        </Note>
      </Section>

      <Section title="Erros comuns">
        <GrammarTable
          headers={['Erro', 'Incorreto', 'Correto', 'Por quê']}
          jpCols={[1, 2]}
          rows={[
            [
              'Usar 申します para o sobrenome só',
              '田中と申します（apenas sobrenome em contexto muito formal）',
              '田中次郎と申します',
              'Em contextos muito formais, nome completo é mais apropriado',
            ],
            [
              'Esquecer o encerramento',
              'Terminar com "…趣味は料理です。"',
              '"…趣味は料理です。よろしくおねがいします。"',
              'O encerramento é obrigatório — sem ele a apresentação parece incompleta',
            ],
            [
              'Usar よろしく em contexto muito formal',
              'Numa entrevista de emprego: "よろしく！"',
              '"どうぞよろしくおねがいいたします。"',
              'よろしく sozinho é muito casual para contextos profissionais',
            ],
          ]}
        />
      </Section>
    </div>
  );
}
