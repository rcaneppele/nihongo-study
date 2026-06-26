import { Section, Ex, Note, GrammarTable } from '../components/Licao';

export const meta = {
  id: 'particulas',
  title: 'Partículas',
  subtitle: 'は、が、を、に, で e outras',
  emoji: '🔗',
  tags: ['gramática', 'n5'],
};

export default function Particulas() {
  return (
    <div className="space-y-10">
      <p className="leading-relaxed text-ink">
        As <strong>partículas</strong> (助詞 — じょし) são palavras curtas colocadas após
        substantivos, verbos ou frases para indicar a função gramatical de cada elemento. São
        diferentes das preposições do português: vêm sempre <em>depois</em> da palavra que
        modificam, nunca antes. Dominar as partículas é essencial — uma troca de partícula muda
        completamente o sentido de uma frase.
      </p>

      <Section title="Visão geral das partículas N5">
        <GrammarTable
          headers={['Partícula', 'Função principal', 'Exemplo breve']}
          jpCols={[0, 2]}
          rows={[
            ['は', 'marcador de tópico', 'わたしは学生です'],
            ['が', 'marcador de sujeito', 'ねこがいます'],
            ['を', 'objeto direto', 'りんごを食べます'],
            ['に', 'destino / tempo / local de existência', 'がっこうに行きます'],
            ['で', 'local de ação / meio / instrumento', 'バスで来ます'],
            ['の', 'possessivo / modificador nominal', 'わたしの本'],
            ['と', 'e (lista completa) / com (companhia)', 'パンとバター'],
            ['も', 'também / nem', 'わたしも行きます'],
            ['へ', 'direção (formal/literário)', '東京へ行きます'],
            ['から', 'de (origem no espaço ou tempo)', '9時から'],
            ['まで', 'até (limite no espaço ou tempo)', '5時まで'],
            ['だけ', 'apenas, somente (positivo)', 'これだけでいい'],
            ['しか', 'só… (requer negativa)', 'これしかない'],
            ['ばかり', 'só isso / acabou de', '来たばかりです'],
            ['ね', 'busca de concordância', 'いいですね'],
            ['よ', 'assertiva / informativa', '大丈夫ですよ'],
            ['か', 'interrogativa', 'どこですか？'],
          ]}
        />
      </Section>

      <Section title="は — marcador de tópico">
        <p className="text-sm leading-relaxed text-ink">
          Indica o <em>tópico</em> da frase (sobre o que se está falando). Pronunciado{' '}
          <strong>wa</strong>, não "ha". É o "quanto a..." do japonês. O tópico pode ser o sujeito,
          o objeto, ou outra coisa — は não define quem pratica a ação, apenas o que está em foco.
        </p>
        <Ex jp="わたしは学生です。" reading="わたしはがくせいです。" pt="Eu sou estudante. (Quanto a mim, sou estudante.)" />
        <Ex jp="東京は大きいです。" reading="とうきょうはおおきいです。" pt="Tóquio é grande. (Quanto a Tóquio, é grande.)" />
        <Ex jp="このレストランはおいしいですよ。" reading="このレストランはおいしいですよ。" pt="Este restaurante é gostoso." />
        <p className="text-sm leading-relaxed text-ink">
          <strong>は também indica contraste</strong> (implícito ou explícito):
        </p>
        <Ex jp="すしは好きですが、さしみは好きじゃないです。" reading="すしはすきですが、さしみはすきじゃないです。" pt="Gosto de sushi, mas sashimi não." notes="は em ambos indica contraste" />
        <Ex jp="コーヒーは飲みます。（お茶は飲みません。）" reading="コーヒーはのみます。" pt="Café eu tomo. (Chá não.)" notes="o contraste pode estar implícito" />
      </Section>

      <Section title="が — marcador de sujeito">
        <p className="text-sm leading-relaxed text-ink">
          Marca o sujeito que realiza a ação ou que possui uma propriedade. É usado para{' '}
          <strong>identificar</strong> ou <strong>destacar</strong> quem/o quê. Aparece
          obrigatoriamente com verbos de estado como{' '}
          <strong className="font-jp">あります・います・わかります・できます・好きです・嫌いです</strong>.
        </p>
        <Ex jp="ねこがいます。" pt="Há um gato. / Tem um gato." />
        <Ex jp="だれが来ましたか？" reading="だれがきましたか？" pt="Quem veio?" notes="が identifica quem" />
        <Ex jp="日本語がわかりますか？" reading="にほんごがわかりますか？" pt="Você entende japonês?" />
        <Ex jp="音楽が好きです。" reading="おんがくがすきです。" pt="Gosto de música." notes="好きです sempre usa が, não を" />

        <Note>
          <strong>は vs が — a distinção mais importante do japonês:</strong>
          <br />• <strong className="font-jp">は</strong> apresenta o <em>tópico</em> (já conhecido,
          contexto estabelecido): 「田中さんは来ました」= Quanto ao sr. Tanaka, ele veio.
          <br />• <strong className="font-jp">が</strong> identifica o <em>sujeito</em> (informação
          nova, destaque): 「田中さんが来ました」= Foi o sr. Tanaka quem veio.
          <br />
          Em respostas a perguntas com だれ/何, use が: 「だれが来ましたか？」→「田中さんが来ました」
        </Note>
      </Section>

      <Section title="を — objeto direto">
        <p className="text-sm leading-relaxed text-ink">
          Marca o objeto direto de um verbo transitivo. Pronunciado <strong>o</strong> (não "wo").
          Também usado com verbos de movimento que atravessam um espaço (渡る, 通る, 歩く) e com{' '}
          <strong className="font-jp">出る</strong> (sair de).
        </p>
        <Ex jp="りんごを食べます。" reading="りんごをたべます。" pt="Como uma maçã." />
        <Ex jp="映画を見ました。" reading="えいがをみました。" pt="Assisti a um filme." />
        <Ex jp="日本語を勉強しています。" reading="にほんごをべんきょうしています。" pt="Estou estudando japonês." />
        <Ex jp="橋を渡ります。" reading="はしをわたります。" pt="Atravesso a ponte." notes="を indicando espaço atravessado" />
        <Ex jp="部屋を出ました。" reading="へやをでました。" pt="Saí do quarto." notes="を com 出る" />
      </Section>

      <Section title="に — destino, tempo e local de existência">
        <p className="text-sm leading-relaxed text-ink">
          に tem vários usos. Os principais:
        </p>
        <GrammarTable
          headers={['Uso', 'Exemplo', 'Tradução']}
          jpCols={[1]}
          rows={[
            ['Destino / direção', '学校に行きます', 'Vou para a escola.'],
            ['Local de existência (com あります/います)', 'つくえの上に本があります', 'Há um livro em cima da mesa.'],
            ['Horário específico', '3時に起きます', 'Acordo às 3 horas.'],
            ['Dia / data', '月曜日に来てください', 'Por favor, venha na segunda-feira.'],
            ['Frequência', '週に3回', '3 vezes por semana'],
            ['Destinatário', '友達に電話します', 'Ligo para meu amigo.'],
            ['Finalidade (verbo no stem + に)', '食べに行きます', 'Vou para comer.'],
            ['Transformação (になる)', '医者になります', 'Vou me tornar médico.'],
          ]}
        />
        <Note>
          に <strong>não é usado</strong> com dias relativos como 今日, 明日, 昨日, 毎日 — nesses
          casos não se usa partícula: 「今日来ます」(não 「今日に来ます」). Também não se usa com
          週末 (fim de semana) na fala casual.
        </Note>
      </Section>

      <Section title="で — local de ação e meio">
        <p className="text-sm leading-relaxed text-ink">
          で indica onde uma <em>ação acontece</em> (não onde algo existe) ou o <em>meio/instrumento</em>{' '}
          usado. Também indica causa ou razão com substantivos.
        </p>
        <Ex jp="図書館で勉強します。" reading="としょかんでべんきょうします。" pt="Estudo na biblioteca." notes="local da ação" />
        <Ex jp="バスで来ます。" pt="Venho de ônibus." notes="meio de transporte" />
        <Ex jp="はしで食べます。" reading="はしでたべます。" pt="Como com hashi." notes="instrumento" />
        <Ex jp="日本語で話してください。" reading="にほんごではなしてください。" pt="Por favor, fale em japonês." notes="língua como meio de comunicação" />
        <Ex jp="かぜで学校を休みました。" reading="かぜでがっこうをやすみました。" pt="Faltei à escola por causa de gripe." notes="causa com substantivo" />
        <Note>
          <strong>に vs で com local:</strong> に indica onde algo <em>existe/está</em>{' '}
          (あります/います); で indica onde uma <em>ação acontece</em>. <br />
          「公園に子どもがいます」(Há crianças no parque — existência) <br />
          「公園で子どもが遊んでいます」(As crianças estão brincando no parque — ação)
        </Note>
      </Section>

      <Section title="の — possessivo e modificador nominal">
        <p className="text-sm leading-relaxed text-ink">
          の conecta dois substantivos. O primeiro modifica o segundo: posse, tipo, descrição,
          origem. Também pode substituir um substantivo já mencionado (の como pronome).
        </p>
        <Ex jp="これはわたしの本です。" pt="Este é o meu livro." notes="posse" />
        <Ex jp="日本語の先生" reading="にほんごのせんせい" pt="professor de japonês" notes="tipo/especialidade" />
        <Ex jp="東京の地下鉄" reading="とうきょうのちかてつ" pt="metrô de Tóquio" notes="origem/localização" />
        <Ex jp="赤いのをください。" reading="あかいのをください。" pt="Me dá o vermelho." notes="の como pronome: 赤いの = 赤いもの" />
        <Ex jp="A：どのかさがあなたの？　B：あの黒いのです。" reading="A：どのかさがあなたの？　B：あのくろいのです。" pt="A: Qual guarda-chuva é o seu? B: É aquele preto ali." />
      </Section>

      <Section title="と — e / com">
        <p className="text-sm leading-relaxed text-ink">
          と conecta substantivos em uma <em>lista completa e exaustiva</em> ("A e B, e só esses")
          ou indica companhia ("junto com").
        </p>
        <Ex jp="パンとバターを買いました。" reading="パンとバターをかいました。" pt="Comprei pão e manteiga. (apenas esses dois)" notes="lista exaustiva" />
        <Ex jp="友達と映画を見ました。" reading="ともだちとえいがをみました。" pt="Assisti ao filme com meu amigo." notes="companhia" />
        <Note>
          と lista itens de forma <em>exaustiva</em>. Para lista não-exaustiva ("maçãs, laranjas
          etc."), use <strong className="font-jp">や</strong>:「りんごやオレンジを買いました」
          (Comprei maçãs, laranjas e outras coisas).
        </Note>
      </Section>

      <Section title="も — também / nem">
        <Ex jp="わたしも行きます。" pt="Eu também vou." />
        <Ex jp="コーヒーもお茶も好きです。" reading="コーヒーもおちゃもすきです。" pt="Gosto tanto de café quanto de chá." notes="も em ambos = adição de múltiplos itens" />
        <Ex jp="何も食べませんでした。" reading="なにもたべませんでした。" pt="Não comi nada." notes="も + negativa = nem (nada, ninguém, em lugar algum…)" />
        <Ex jp="どこにも行きませんでした。" reading="どこにもいきませんでした。" pt="Não fui a lugar nenhum." />
      </Section>

      <Section title="へ — direção (formal / literário)">
        <p className="text-sm leading-relaxed text-ink">
          Pronunciado <strong>e</strong> (não "he"). Indica direção, similar a に. へ enfatiza o
          <em>trajeto / movimento em direção a</em>, enquanto に enfatiza o <em>destino/chegada</em>.
          Na prática, são frequentemente intercambiáveis, mas へ soa mais literário ou formal.
        </p>
        <Ex jp="日本へようこそ。" reading="にほんへようこそ。" pt="Bem-vindo ao Japão." notes="へ em boas-vindas formais" />
        <Ex jp="東京へ行きます。" reading="とうきょうへいきます。" pt="Vou para Tóquio." notes="foco no trajeto" />
        <Ex jp="こちらへどうぞ。" pt="Por aqui, por favor." notes="comum em atendimento formal" />
      </Section>

      <Section title="から e まで — de e até">
        <p className="text-sm leading-relaxed text-ink">
          Usados para indicar origem e limite, tanto no espaço quanto no tempo. Podem ser combinados
          na mesma frase.
        </p>
        <Ex jp="9時から5時まで働きます。" reading="くじからごじまではたらきます。" pt="Trabalho das 9 às 5." />
        <Ex jp="東京から大阪まで新幹線で行きます。" reading="とうきょうからおおさかまでしんかんせんでいきます。" pt="Vou de Tóquio a Osaka de Shinkansen." />
        <Ex jp="ここから駅まで歩いて10分です。" reading="ここからえきまであるいてじゅっぷんです。" pt="Da aqui até a estação são 10 minutos a pé." />
        <Ex jp="どこから来ましたか？" reading="どこからきましたか？" pt="De onde você veio?" />
      </Section>

      <Section title="だけ e しか — dois jeitos de dizer 'só'">
        <p className="text-sm leading-relaxed text-ink">
          Ambos significam "apenas/somente", mas com nuances diferentes.{' '}
          <strong className="font-jp">だけ</strong> é neutro; <strong className="font-jp">しか</strong>{' '}
          <em>requer verbo negativo</em> e carrega a ideia de que a quantidade é insuficiente ou
          decepcionante.
        </p>
        <Ex jp="これだけ食べました。" pt="Comi apenas isto. (neutro)" notes="だけ — simples limitação" />
        <Ex jp="これしか食べませんでした。" pt="Comi apenas isto. (e que pena / era pouco)" notes="しか + negativa — insuficiência implícita" />
        <Ex jp="あと3枚だけあります。" reading="あとさんまいだけあります。" pt="Ainda tem apenas 3 folhas." />
        <Ex jp="お金が100円しかありません。" reading="おかねが100えんしかありません。" pt="Só tenho 100 ienes. (implica: é muito pouco)" />
      </Section>

      <Section title="ばかり — só isso / acabou de">
        <p className="text-sm leading-relaxed text-ink">
          ばかり tem dois usos principais: indicar que <em>algo é feito exclusivamente</em> (com
          sentido negativo de excesso) ou que algo <em>acabou de acontecer</em> (com verbo no
          passado + ばかり).
        </p>
        <Ex jp="ゲームばかりしています。" pt="Fica só jogando videogame. (sentido de excesso)" />
        <Ex jp="今、来たばかりです。" reading="いま、きたばかりです。" pt="Acabei de chegar agora." notes="passado + ばかり = acabou de fazer" />
        <Ex jp="日本語を勉強し始めたばかりです。" reading="にほんごをべんきょうしはじめたばかりです。" pt="Acabei de começar a estudar japonês." />
      </Section>

      <Section title="ので e から — porque (causa e razão)">
        <p className="text-sm leading-relaxed text-ink">
          Ambos introduzem uma causa ou razão, mas com nuances importantes:
        </p>
        <GrammarTable
          headers={['Partícula', 'Tom', 'Uso típico', 'Exemplo']}
          jpCols={[3]}
          rows={[
            ['ので', 'objetivo, educado, suave', 'explicação formal, pedir desculpa', '忙しいので、行けません。'],
            ['から', 'direto, subjetivo', 'explicação casual, justificativa', '忙しいから、行けない。'],
          ]}
        />
        <Ex jp="頭が痛いので、早く帰ってもいいですか？" reading="あたまがいたいので、はやくかえってもいいですか？" pt="Estou com dor de cabeça, posso ir mais cedo?" notes="ので soa mais educado, boa escolha no trabalho" />
        <Ex jp="眠いから、もう寝る。" reading="ねむいから、もうねる。" pt="Estou com sono, vou dormir." notes="から casual, entre amigos" />
      </Section>

      <Section title="のに — mesmo que / apesar de">
        <p className="text-sm leading-relaxed text-ink">
          のに expressa <em>contraste inesperado</em>, frequentemente com frustração ou surpresa de
          que o resultado não foi o esperado.
        </p>
        <Ex jp="頑張ったのに、失敗しました。" reading="がんばったのに、しっぱいしました。" pt="Mesmo tendo me esforçado, fracassei." notes="frustração: o esforço não levou ao resultado esperado" />
        <Ex jp="薬を飲んだのに、まだ痛い。" reading="くすりをのんだのに、まだいたい。" pt="Mesmo tendo tomado o remédio, ainda dói." />
        <Ex jp="お金があるのに、使わない。" reading="おかねがあるのに、つかわない。" pt="Mesmo tendo dinheiro, não gasta." notes="pode soar como crítica" />
      </Section>

      <Section title="ね e よ — partículas finais">
        <GrammarTable
          headers={['Partícula', 'Função', 'Exemplo', 'Tradução']}
          jpCols={[0, 2]}
          rows={[
            ['ね', 'busca concordância / "né?"', 'いい天気ですね。', 'Que tempo bom, né?'],
            ['よ', 'informa algo novo / assertiva', '電車が来ましたよ。', 'O trem chegou! (você não sabia)'],
            ['ね', 'suaviza tom', 'ちょっと待ってくださいね。', 'Por favor, espere um momento, tá?'],
            ['よね', 'confirma algo que acha que o outro sabe', '田中さんも来るよね？', 'O sr. Tanaka também vai vir, né?'],
            ['な', 'concordância / reflexão (masculino casual)', 'おいしいな。', 'Que gostoso. (para si mesmo)'],
          ]}
        />
        <Note>
          よ não deve ser usado em excesso com superiores — pode soar condescendente ("deixa eu te
          explicar…"). ね é mais seguro em situações formais. よね combina as duas: confirma uma
          informação que o falante espera que o ouvinte também saiba.
        </Note>
      </Section>

      <Section title="Combinações de partículas">
        <p className="text-sm leading-relaxed text-ink">
          Partículas podem se combinar. As combinações mais comuns:
        </p>
        <GrammarTable
          headers={['Combinação', 'Formada por', 'Uso', 'Exemplo']}
          jpCols={[0, 3]}
          rows={[
            ['では', 'で + は', 'contraste de local / "então" (transição)', 'では、始めましょう（Então, vamos começar）'],
            ['には', 'に + は', 'destino ou tempo com ênfase/contraste', '東京には行きましたが、大阪には行っていません'],
            ['でも', 'で + も', '"mesmo em" / "qualquer"', 'どこでも行きます（Vou a qualquer lugar）'],
            ['にも', 'に + も', '"também em/para"', '東京にも大阪にも行きました'],
            ['からも', 'から + も', '"também de"', '日本からも来ています'],
          ]}
        />
      </Section>

      <Section title="Erros comuns com partículas">
        <GrammarTable
          headers={['Erro', 'Incorreto', 'Correto', 'Explicação']}
          jpCols={[1, 2]}
          rows={[
            ['好き com を', '音楽を好きです', '音楽が好きです', '好き/嫌い usam が, não を'],
            ['Ação em lugar com に', '図書館に勉強します', '図書館で勉強します', 'でで = onde a ação acontece'],
            ['Existência com で', 'つくえの上で本があります', 'つくえの上に本があります', 'に = onde algo existe'],
            ['しか sem negativa', 'これしかあります', 'これしかありません', 'しか sempre requer negativa'],
            ['と para lista aberta', 'りんごとオレンジとなど…', 'りんごやオレンジなど', 'と é lista exaustiva; や é aberta'],
          ]}
        />
      </Section>
    </div>
  );
}
