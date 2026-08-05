import { Section, Ex, Note, GrammarTable } from '../components/Licao';

export const meta = {
  id: 'apresentacao',
  title: 'Auto-apresentação',
  subtitle: 'じこしょうかい — Jikoshoukai',
  emoji: '🙇',
  tags: ['conversa', 'n5'],
};

export default function Apresentacao() {
  return (
    <div className="space-y-10">
      <p className="leading-relaxed text-ink">
        A <strong>じこしょうかい</strong> (jikoshoukai) é a auto-apresentação. Ela
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
            ['2', 'Dizer o nome', '〜ともうします。（formal） / 〜です。（neutro）'],
            ['3', 'Origem', '〜からきました。 / 〜しゅっしんです。'],
            ['4', 'Ocupação / escola / foco atual', '〜をしています。 / 〜のがくせいです。'],
            ['5', 'Hobby ou informação pessoal', 'しゅみは〜です。 / 〜がすきです。'],
            ['6', 'Encerramento', 'どうぞよろしくおねがいします。'],
          ]}
        />
        <Note>
          A ordem dos passos é bastante flexível, exceto pelo cumprimento no início e o encerramento
          no final. Na prática, a duração da apresentação varia muito: uma じこしょうかい de escritório
          pode levar 1 minuto; em reuniões de grupo pode ser mais longa com perguntas.
        </Note>
      </Section>

      <Section title="Frases essenciais">
        <GrammarTable
          headers={['Japonês', 'Significado', 'Registro']}
          jpCols={[0]}
          rows={[
            ['はじめまして', 'prazer em conhecê-lo (primeira vez)', 'neutro'],
            ['〜ともうします', 'meu nome é ~ (muito formal)', 'muito formal'],
            ['〜といいます', 'me chamo ~', 'padrão'],
            ['〜です', 'sou ~', 'neutro'],
            ['〜からきました', 'vim de ~', 'neutro'],
            ['〜しゅっしんです', 'sou de ~ (origem)', 'neutro'],
            ['〜にすんでいます', 'moro em ~', 'neutro'],
            ['〜さいです', 'tenho ~ anos', 'neutro'],
            ['〜をしています', 'trabalho como ~', 'neutro'],
            ['〜のがくせいです', 'sou estudante de ~', 'neutro'],
            ['しゅみは〜です', 'meu hobby é ~', 'neutro'],
            ['〜がすきです', 'gosto de ~', 'neutro'],
            ['〜をべんきょうしています', 'estou estudando ~', 'neutro'],
            ['どうぞよろしくおねがいします', 'muito prazer / às suas ordens', 'formal/neutro'],
            ['よろしくおねがいします', 'prazer (padrão)', 'neutro'],
            ['よろしく', 'prazer (informal)', 'casual'],
          ]}
        />
      </Section>

      <Section title="Exemplo formal — escola ou trabalho">
        <div className="space-y-2 rounded-xl border border-line bg-white/60 px-5 py-4">
          <Ex jp="はじめまして。" pt="Prazer em conhecê-lo." />
          <Ex jp="たなかじろうともうします。" pt="Meu nome é Tanaka Jiro." notes="ともうします: forma muito formal de dizer o próprio nome" />
          <Ex jp="ブラジルのサンパウロからまいりました。" pt="Vim de São Paulo, Brasil." notes="まいりました é a forma humilde de きました" />
          <Ex jp="げんざい、ITかんけいのしごとをしております。" pt="Atualmente trabalho na área de TI." notes="おります: forma humilde de います" />
          <Ex jp="にほんごはまだべんきょうちゅうですが、よろしくおねがいいたします。" pt="Ainda estou estudando japonês, mas muito prazer." />
        </div>
      </Section>

      <Section title="Exemplo casual — turma de japonês ou grupo de hobby">
        <div className="space-y-2 rounded-xl border border-line bg-white/60 px-5 py-4">
          <Ex jp="はじめまして！たなかです。" pt="Prazer! Sou Tanaka." />
          <Ex jp="ブラジルしゅっしんで、サンパウロにすんでいます。" pt="Sou do Brasil e moro em São Paulo." />
          <Ex jp="にじゅうはっさいです。" pt="Tenho 28 anos." />
          <Ex jp="いま、にほんごをべんきょうしています。アニメがきっかけではじめました。" pt="Estou estudando japonês. Comecei por causa do anime." />
          <Ex jp="しゅみはおんがくをきくこととりょうりです。" pt="Meus hobbies são ouvir música e cozinhar." />
          <Ex jp="よろしくおねがいします！" pt="Muito prazer!" />
        </div>
      </Section>

      <Section title="Exemplo online — aula de japonês por videochamada">
        <div className="space-y-2 rounded-xl border border-line bg-white/60 px-5 py-4">
          <Ex jp="はじめまして。がめんごしですが、よろしくおねがいします。" pt="Prazer. Mesmo que seja pela tela, muito prazer." notes="がめんごし = através da tela" />
          <Ex jp="ブラジルからオンラインでさんかしています。" pt="Estou participando online do Brasil." />
          <Ex jp="じさは12じかんあります。" pt="A diferença de fuso horário é de 12 horas." notes="じさ = diferença de horário" />
          <Ex jp="にほんにいったことはまだありませんが、いつかいきたいです。" pt="Ainda não fui ao Japão, mas quero ir algum dia." />
        </div>
      </Section>

      <Section title="Apresentando outra pessoa">
        <p className="text-sm leading-relaxed text-ink">
          Quando você precisa apresentar alguém a outra pessoa:
        </p>
        <Ex jp="こちらはたなかさんです。" pt="Este é o sr. Tanaka." notes="こちら é a forma educada de apresentar pessoas" />
        <Ex jp="たなかさんをごしょうかいします。" pt="Vou apresentar o sr. Tanaka." notes="ごしょうかいします: forma formal de introduzir alguém" />
        <Ex jp="たなかさんはわたしのどうりょうです。" pt="O sr. Tanaka é meu colega." />
        <Ex jp="こちらのかたがやまだせんせいです。どうぞよろしくおねがいします。" pt="Esta pessoa é a professora Yamada. Muito prazer." />
      </Section>

      <Section title="Perguntas que você pode receber">
        <p className="text-sm leading-relaxed text-ink">
          Depois da apresentação, é comum receber perguntas. Prepare respostas para as mais comuns:
        </p>
        <GrammarTable
          headers={['Pergunta', 'Tradução']}
          jpCols={[0]}
          rows={[
            ['にほんごはどのくらいべんきょうしていますか？', 'Há quanto tempo estuda japonês?'],
            ['どうしてにほんごをべんきょうしていますか？', 'Por que está estudando japonês?'],
            ['にほんにきたことがありますか？', 'Já veio ao Japão?'],
            ['すきなにほんしょくはなんですか？', 'Qual comida japonesa você gosta?'],
            ['しゅみはなんですか？', 'Qual é o seu hobby?'],
            ['おしごとはなにをされていますか？', 'O que você faz?'],
          ]}
        />
      </Section>

      <Section title="Como responder às perguntas">
        <Ex jp="まだはじめたばかりです。はんとしくらいです。" pt="Acabei de começar. Faz uns seis meses." />
        <Ex jp="アニメやゲームがきっかけで、にほんごにきょうみをもちました。" pt="Comecei pelo anime e games e me interessei pela língua." />
        <Ex jp="まだいったことがありませんが、いつかいきたいとおもっています。" pt="Ainda não fui, mas pretendo ir algum dia." />
        <Ex jp="にほんごはまだあまりじょうずじゃないですが、がんばっています。" pt="Ainda não sou muito bom em japonês, mas estou me esforçando." notes="auto-depreciação comum e bem recebida no Japão" />
      </Section>

      <Section title="Vocabulário de hobbies e interesses">
        <GrammarTable
          headers={['Japonês', 'Significado']}
          jpCols={[0]}
          rows={[
            ['おんがくをきく', 'ouvir música'],
            ['えいがをみる', 'assistir filmes'],
            ['どくしょ', 'leitura'],
            ['りょうり', 'cozinhar / culinária'],
            ['りょこう', 'viajar / viagem'],
            ['スポーツ', 'esporte'],
            ['ゲーム', 'jogos (video game)'],
            ['アニメ', 'anime'],
            ['しゃしんをとる', 'tirar fotos / fotografia'],
            ['えをかく', 'desenhar / pintar'],
            ['ヨガ', 'yoga'],
            ['ハイキング', 'caminhada / trilha'],
          ]}
        />
      </Section>

      <Section title="Vocabulário de ocupações">
        <GrammarTable
          headers={['Japonês', 'Significado']}
          jpCols={[0]}
          rows={[
            ['がくせい', 'estudante'],
            ['かいしゃいん', 'funcionário de empresa'],
            ['エンジニア', 'engenheiro / desenvolvedor'],
            ['デザイナー', 'designer'],
            ['せんせい', 'professor'],
            ['いしゃ', 'médico'],
            ['かんごし', 'enfermeiro(a)'],
            ['フリーランス', 'freelancer'],
            ['じえいぎょう', 'autônomo / empreendedor'],
            ['こうむいん', 'servidor público'],
          ]}
        />
      </Section>

      <Section title="Dicas culturais">
        <Note>
          <strong>Reverência (おじぎ):</strong> Ao se apresentar, uma leve inclinação de 15
          graus é apropriada. Em contextos mais formais (entrevistas, negócios), 30 graus. Mantenha
          as mãos ao lado do corpo (homens) ou juntas na frente (mulheres).
        </Note>
        <Note>
          <strong>Cartão de visita (めいし):</strong> Se receber um, segure com as duas mãos,
          olhe com atenção, e coloque na mesa à sua frente durante a reunião. Nunca escreva nele,
          não o dobre e não o guarde no bolso de trás.
        </Note>
        <Note>
          <strong>Auto-depreciação:</strong> É comum dizer coisas como「まだまだです」(ainda tenho
          muito a melhorar) mesmo sendo bastante competente. Aceitar elogios diretamente com
          「ありがとうございます、じょうずでしょう」pode soar arrogante.
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
              'Usar もうします para o sobrenome só',
              'たなかともうします（apenas sobrenome em contexto muito formal）',
              'たなかじろうともうします',
              'Em contextos muito formais, nome completo é mais apropriado',
            ],
            [
              'Esquecer o encerramento',
              'Terminar com "…しゅみはりょうりです。"',
              '"…しゅみはりょうりです。よろしくおねがいします。"',
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
