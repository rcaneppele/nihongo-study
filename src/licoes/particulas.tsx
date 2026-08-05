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
        As <strong>partículas</strong> (じょし) são palavras curtas colocadas após
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
            ['は', 'marcador de tópico', 'わたしはがくせいです'],
            ['が', 'marcador de sujeito', 'ねこがいます'],
            ['を', 'objeto direto', 'りんごをたべます'],
            ['に', 'destino / tempo / local de existência', 'がっこうにいきます'],
            ['で', 'local de ação / meio / instrumento', 'バスできます'],
            ['の', 'possessivo / modificador nominal', 'わたしのほん'],
            ['と', 'e (lista completa) / com (companhia)', 'パンとバター'],
            ['も', 'também / nem', 'わたしもいきます'],
            ['へ', 'direção (formal/literário)', 'とうきょうへいきます'],
            ['から', 'de (origem no espaço ou tempo)', 'くじから'],
            ['まで', 'até (limite no espaço ou tempo)', 'ごじまで'],
            ['だけ', 'apenas, somente (positivo)', 'これだけでいい'],
            ['しか', 'só… (requer negativa)', 'これしかない'],
            ['ばかり', 'só isso / acabou de', 'きたばかりです'],
            ['ね', 'busca de concordância', 'いいですね'],
            ['よ', 'assertiva / informativa', 'だいじょうぶですよ'],
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
        <Ex jp="わたしはがくせいです。" pt="Eu sou estudante. (Quanto a mim, sou estudante.)" />
        <Ex jp="とうきょうはおおきいです。" pt="Tóquio é grande. (Quanto a Tóquio, é grande.)" />
        <Ex jp="このレストランはおいしいですよ。" pt="Este restaurante é gostoso." />
        <p className="text-sm leading-relaxed text-ink">
          <strong>は também indica contraste</strong> (implícito ou explícito):
        </p>
        <Ex jp="すしはすきですが、さしみはすきじゃないです。" pt="Gosto de sushi, mas sashimi não." notes="は em ambos indica contraste" />
        <Ex jp="コーヒーはのみます。（おちゃはのみません。）" pt="Café eu tomo. (Chá não.)" notes="o contraste pode estar implícito" />
      </Section>

      <Section title="が — marcador de sujeito">
        <p className="text-sm leading-relaxed text-ink">
          Marca o sujeito que realiza a ação ou que possui uma propriedade. É usado para{' '}
          <strong>identificar</strong> ou <strong>destacar</strong> quem/o quê. Aparece
          obrigatoriamente com verbos de estado como{' '}
          <strong className="font-jp">あります・います・わかります・できます・すきです・きらいです</strong>.
        </p>
        <Ex jp="ねこがいます。" pt="Há um gato. / Tem um gato." />
        <Ex jp="だれがきましたか？" pt="Quem veio?" notes="が identifica quem" />
        <Ex jp="にほんごがわかりますか？" pt="Você entende japonês?" />
        <Ex jp="おんがくがすきです。" pt="Gosto de música." notes="すきです sempre usa が, não を" />

        <Note>
          <strong>は vs が — a distinção mais importante do japonês:</strong>
          <br />• <strong className="font-jp">は</strong> apresenta o <em>tópico</em> (já conhecido,
          contexto estabelecido): 「たなかさんはきました」= Quanto ao sr. Tanaka, ele veio.
          <br />• <strong className="font-jp">が</strong> identifica o <em>sujeito</em> (informação
          nova, destaque): 「たなかさんがきました」= Foi o sr. Tanaka quem veio.
          <br />
          Em respostas a perguntas com だれ/なに, use が: 「だれがきましたか？」→「たなかさんがきました」
        </Note>
      </Section>

      <Section title="を — objeto direto">
        <p className="text-sm leading-relaxed text-ink">
          Marca o objeto direto de um verbo transitivo. Pronunciado <strong>o</strong> (não "wo").
          Também usado com verbos de movimento que atravessam um espaço (わたる, とおる, あるく) e com{' '}
          <strong className="font-jp">でる</strong> (sair de).
        </p>
        <Ex jp="りんごをたべます。" pt="Como uma maçã." />
        <Ex jp="えいがをみました。" pt="Assisti a um filme." />
        <Ex jp="にほんごをべんきょうしています。" pt="Estou estudando japonês." />
        <Ex jp="はしをわたります。" pt="Atravesso a ponte." notes="を indicando espaço atravessado" />
        <Ex jp="へやをでました。" pt="Saí do quarto." notes="を com でる" />
      </Section>

      <Section title="に — destino, tempo e local de existência">
        <p className="text-sm leading-relaxed text-ink">
          に tem vários usos. Os principais:
        </p>
        <GrammarTable
          headers={['Uso', 'Exemplo', 'Tradução']}
          jpCols={[1]}
          rows={[
            ['Destino / direção', 'がっこうにいきます', 'Vou para a escola.'],
            ['Local de existência (com あります/います)', 'つくえのうえにほんがあります', 'Há um livro em cima da mesa.'],
            ['Horário específico', 'さんじにおきます', 'Acordo às 3 horas.'],
            ['Dia / data', 'げつようびにきてください', 'Por favor, venha na segunda-feira.'],
            ['Frequência', 'しゅうにさんかい', '3 vezes por semana'],
            ['Destinatário', 'ともだちにでんわします', 'Ligo para meu amigo.'],
            ['Finalidade (verbo no stem + に)', 'たべにいきます', 'Vou para comer.'],
            ['Transformação (になる)', 'いしゃになります', 'Vou me tornar médico.'],
          ]}
        />
        <Note>
          に <strong>não é usado</strong> com dias relativos como きょう, あした, きのう, まいにち — nesses
          casos não se usa partícula: 「きょうきます」(não 「きょうにきます」). Também não se usa com
          しゅうまつ (fim de semana) na fala casual.
        </Note>
      </Section>

      <Section title="で — local de ação e meio">
        <p className="text-sm leading-relaxed text-ink">
          で indica onde uma <em>ação acontece</em> (não onde algo existe) ou o <em>meio/instrumento</em>{' '}
          usado. Também indica causa ou razão com substantivos.
        </p>
        <Ex jp="としょかんでべんきょうします。" pt="Estudo na biblioteca." notes="local da ação" />
        <Ex jp="バスできます。" pt="Venho de ônibus." notes="meio de transporte" />
        <Ex jp="はしでたべます。" pt="Como com hashi." notes="instrumento" />
        <Ex jp="にほんごではなしてください。" pt="Por favor, fale em japonês." notes="língua como meio de comunicação" />
        <Ex jp="かぜでがっこうをやすみました。" pt="Faltei à escola por causa de gripe." notes="causa com substantivo" />
        <Note>
          <strong>に vs で com local:</strong> に indica onde algo <em>existe/está</em>{' '}
          (あります/います); で indica onde uma <em>ação acontece</em>. <br />
          「こうえんにこどもがいます」(Há crianças no parque — existência) <br />
          「こうえんでこどもがあそんでいます」(As crianças estão brincando no parque — ação)
        </Note>
      </Section>

      <Section title="の — possessivo e modificador nominal">
        <p className="text-sm leading-relaxed text-ink">
          の conecta dois substantivos. O primeiro modifica o segundo: posse, tipo, descrição,
          origem. Também pode substituir um substantivo já mencionado (の como pronome).
        </p>
        <Ex jp="これはわたしのほんです。" pt="Este é o meu livro." notes="posse" />
        <Ex jp="にほんごのせんせい" pt="professor de japonês" notes="tipo/especialidade" />
        <Ex jp="とうきょうのちかてつ" pt="metrô de Tóquio" notes="origem/localização" />
        <Ex jp="あかいのをください。" pt="Me dá o vermelho." notes="の como pronome: あかいの = あかいもの" />
        <Ex jp="A：どのかさがあなたの？　B：あのくろいのです。" pt="A: Qual guarda-chuva é o seu? B: É aquele preto ali." />
      </Section>

      <Section title="と — e / com">
        <p className="text-sm leading-relaxed text-ink">
          と conecta substantivos em uma <em>lista completa e exaustiva</em> ("A e B, e só esses")
          ou indica companhia ("junto com").
        </p>
        <Ex jp="パンとバターをかいました。" pt="Comprei pão e manteiga. (apenas esses dois)" notes="lista exaustiva" />
        <Ex jp="ともだちとえいがをみました。" pt="Assisti ao filme com meu amigo." notes="companhia" />
        <Note>
          と lista itens de forma <em>exaustiva</em>. Para lista não-exaustiva ("maçãs, laranjas
          etc."), use <strong className="font-jp">や</strong>:「りんごやオレンジをかいました」
          (Comprei maçãs, laranjas e outras coisas).
        </Note>
      </Section>

      <Section title="も — também / nem">
        <Ex jp="わたしもいきます。" pt="Eu também vou." />
        <Ex jp="コーヒーもおちゃもすきです。" pt="Gosto tanto de café quanto de chá." notes="も em ambos = adição de múltiplos itens" />
        <Ex jp="なにもたべませんでした。" pt="Não comi nada." notes="も + negativa = nem (nada, ninguém, em lugar algum…)" />
        <Ex jp="どこにもいきませんでした。" pt="Não fui a lugar nenhum." />
      </Section>

      <Section title="へ — direção (formal / literário)">
        <p className="text-sm leading-relaxed text-ink">
          Pronunciado <strong>e</strong> (não "he"). Indica direção, similar a に. へ enfatiza o
          <em>trajeto / movimento em direção a</em>, enquanto に enfatiza o <em>destino/chegada</em>.
          Na prática, são frequentemente intercambiáveis, mas へ soa mais literário ou formal.
        </p>
        <Ex jp="にほんへようこそ。" pt="Bem-vindo ao Japão." notes="へ em boas-vindas formais" />
        <Ex jp="とうきょうへいきます。" pt="Vou para Tóquio." notes="foco no trajeto" />
        <Ex jp="こちらへどうぞ。" pt="Por aqui, por favor." notes="comum em atendimento formal" />
      </Section>

      <Section title="から e まで — de e até">
        <p className="text-sm leading-relaxed text-ink">
          Usados para indicar origem e limite, tanto no espaço quanto no tempo. Podem ser combinados
          na mesma frase.
        </p>
        <Ex jp="くじからごじまではたらきます。" pt="Trabalho das 9 às 5." />
        <Ex jp="とうきょうからおおさかまでしんかんせんでいきます。" pt="Vou de Tóquio a Osaka de Shinkansen." />
        <Ex jp="ここからえきまであるいてじゅっぷんです。" pt="Da aqui até a estação são 10 minutos a pé." />
        <Ex jp="どこからきましたか？" pt="De onde você veio?" />
      </Section>

      <Section title="だけ e しか — dois jeitos de dizer 'só'">
        <p className="text-sm leading-relaxed text-ink">
          Ambos significam "apenas/somente", mas com nuances diferentes.{' '}
          <strong className="font-jp">だけ</strong> é neutro; <strong className="font-jp">しか</strong>{' '}
          <em>requer verbo negativo</em> e carrega a ideia de que a quantidade é insuficiente ou
          decepcionante.
        </p>
        <Ex jp="これだけたべました。" pt="Comi apenas isto. (neutro)" notes="だけ — simples limitação" />
        <Ex jp="これしかたべませんでした。" pt="Comi apenas isto. (e que pena / era pouco)" notes="しか + negativa — insuficiência implícita" />
        <Ex jp="あとさんまいだけあります。" pt="Ainda tem apenas 3 folhas." />
        <Ex jp="おかねが100えんしかありません。" pt="Só tenho 100 ienes. (implica: é muito pouco)" />
      </Section>

      <Section title="ばかり — só isso / acabou de">
        <p className="text-sm leading-relaxed text-ink">
          ばかり tem dois usos principais: indicar que <em>algo é feito exclusivamente</em> (com
          sentido negativo de excesso) ou que algo <em>acabou de acontecer</em> (com verbo no
          passado + ばかり).
        </p>
        <Ex jp="ゲームばかりしています。" pt="Fica só jogando videogame. (sentido de excesso)" />
        <Ex jp="いま、きたばかりです。" pt="Acabei de chegar agora." notes="passado + ばかり = acabou de fazer" />
        <Ex jp="にほんごをべんきょうしはじめたばかりです。" pt="Acabei de começar a estudar japonês." />
      </Section>

      <Section title="ので e から — porque (causa e razão)">
        <p className="text-sm leading-relaxed text-ink">
          Ambos introduzem uma causa ou razão, mas com nuances importantes:
        </p>
        <GrammarTable
          headers={['Partícula', 'Tom', 'Uso típico', 'Exemplo']}
          jpCols={[3]}
          rows={[
            ['ので', 'objetivo, educado, suave', 'explicação formal, pedir desculpa', 'いそがしいので、いけません。'],
            ['から', 'direto, subjetivo', 'explicação casual, justificativa', 'いそがしいから、いけない。'],
          ]}
        />
        <Ex jp="あたまがいたいので、はやくかえってもいいですか？" pt="Estou com dor de cabeça, posso ir mais cedo?" notes="ので soa mais educado, boa escolha no trabalho" />
        <Ex jp="ねむいから、もうねる。" pt="Estou com sono, vou dormir." notes="から casual, entre amigos" />
      </Section>

      <Section title="のに — mesmo que / apesar de">
        <p className="text-sm leading-relaxed text-ink">
          のに expressa <em>contraste inesperado</em>, frequentemente com frustração ou surpresa de
          que o resultado não foi o esperado.
        </p>
        <Ex jp="がんばったのに、しっぱいしました。" pt="Mesmo tendo me esforçado, fracassei." notes="frustração: o esforço não levou ao resultado esperado" />
        <Ex jp="くすりをのんだのに、まだいたい。" pt="Mesmo tendo tomado o remédio, ainda dói." />
        <Ex jp="おかねがあるのに、つかわない。" pt="Mesmo tendo dinheiro, não gasta." notes="pode soar como crítica" />
      </Section>

      <Section title="ね e よ — partículas finais">
        <GrammarTable
          headers={['Partícula', 'Função', 'Exemplo', 'Tradução']}
          jpCols={[0, 2]}
          rows={[
            ['ね', 'busca concordância / "né?"', 'いいてんきですね。', 'Que tempo bom, né?'],
            ['よ', 'informa algo novo / assertiva', 'でんしゃがきましたよ。', 'O trem chegou! (você não sabia)'],
            ['ね', 'suaviza tom', 'ちょっとまってくださいね。', 'Por favor, espere um momento, tá?'],
            ['よね', 'confirma algo que acha que o outro sabe', 'たなかさんもくるよね？', 'O sr. Tanaka também vai vir, né?'],
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
            ['では', 'で + は', 'contraste de local / "então" (transição)', 'では、はじめましょう（Então, vamos começar）'],
            ['には', 'に + は', 'destino ou tempo com ênfase/contraste', 'とうきょうにはいきましたが、おおさかにはいっていません'],
            ['でも', 'で + も', '"mesmo em" / "qualquer"', 'どこでもいきます（Vou a qualquer lugar）'],
            ['にも', 'に + も', '"também em/para"', 'とうきょうにもおおさかにもいきました'],
            ['からも', 'から + も', '"também de"', 'にほんからもきています'],
          ]}
        />
      </Section>

      <Section title="Erros comuns com partículas">
        <GrammarTable
          headers={['Erro', 'Incorreto', 'Correto', 'Explicação']}
          jpCols={[1, 2]}
          rows={[
            ['すき com を', 'おんがくをすきです', 'おんがくがすきです', 'すき/きらい usam が, não を'],
            ['Ação em lugar com に', 'としょかんにべんきょうします', 'としょかんでべんきょうします', 'で = onde a ação acontece'],
            ['Existência com で', 'つくえのうえでほんがあります', 'つくえのうえにほんがあります', 'に = onde algo existe'],
            ['しか sem negativa', 'これしかあります', 'これしかありません', 'しか sempre requer negativa'],
            ['と para lista aberta', 'りんごとオレンジとなど…', 'りんごやオレンジなど', 'と é lista exaustiva; や é aberta'],
          ]}
        />
      </Section>
    </div>
  );
}
