import { Section, Ex, Note, GrammarTable } from '../components/Licao';

export const meta = {
  id: 'verbos',
  title: 'Verbos',
  subtitle: 'Grupos de conjugação, forma ます, forma て e a base para estudar verbos',
  emoji: '🏃',
  tags: ['gramática', 'n5'],
};

export default function Verbos() {
  return (
    <div className="space-y-10">
      <p className="leading-relaxed text-ink">
        Verbos são o coração da frase japonesa: quase tudo que se quer dizer — ação, estado,
        pedido, permissão — passa por eles. É um assunto grande, então esta lição não tenta
        cobrir tudo de uma vez. O objetivo aqui é dar uma <strong>base sólida e aprofundada</strong>:
        como os verbos japoneses funcionam, os três grupos de conjugação em detalhe, e as
        conjugações mais usadas no dia a dia (forma educada, forma て, negativa e passado). Formas
        mais avançadas (potencial, causativa, passiva, condicional, volitiva etc.) ficam para
        lições futuras.
      </p>

      <Section title="Como os verbos funcionam em japonês">
        <p className="text-sm leading-relaxed text-ink">
          Algumas diferenças importantes em relação ao português logo de início:
        </p>
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink">
          <li>
            O verbo vem <strong>sempre no final da frase</strong> (o japonês segue a ordem
            sujeito–objeto–verbo, diferente do português que é sujeito–verbo–objeto).
          </li>
          <li>
            O verbo <strong>não muda</strong> conforme a pessoa (eu/você/ele) nem o número
            (singular/plural). <span className="font-jp">たべます</span> serve para "eu como",
            "você come", "eles comem" — quem pratica a ação fica claro pelo contexto (ou por um
            substantivo/pronome antes da partícula が ou は), não pelo verbo.
          </li>
          <li>
            O verbo conjuga apenas para três eixos: <strong>tempo</strong>{' '}
            (presente/futuro vs. passado — o japonês não distingue presente de futuro, ambos usam
            a mesma forma), <strong>polaridade</strong> (afirmativo vs. negativo) e{' '}
            <strong>formalidade</strong> (educado vs. casual/simples).
          </li>
          <li>
            As conjugações são <strong>aglutinantes</strong>: sufixos se encaixam um atrás do
            outro sobre uma base do verbo, como blocos de montar. Por isso, uma vez que se entende
            a lógica de formar a base certa, aprender cada novo sufixo fica muito mais rápido.
          </li>
          <li>
            Não existe conjugação para gênero (masculino/feminino) nem para modo formal de
            tratamento como em outras línguas — a formalidade é expressa trocando a{' '}
            <em>terminação do verbo</em>, não o pronome.
          </li>
        </ul>
        <Ex jp="たべます。" pt="Como. / Vou comer. (forma educada, presente/futuro)" />
        <Ex jp="たべません。" pt="Não como. / Não vou comer." notes="negativo" />
        <Ex jp="たべました。" pt="Comi." notes="passado" />
        <Ex jp="たべませんでした。" pt="Não comi." notes="passado negativo" />
      </Section>

      <Section title="A forma de dicionário (じしょけい)">
        <p className="text-sm leading-relaxed text-ink">
          É a forma "crua" do verbo, a que aparece em dicionários — por isso o nome. Todo verbo
          japonês nessa forma termina em um som da <strong>coluna う</strong> do quadro de sons do
          japonês (o chamado 「うだん」): <span className="font-jp">う・く・ぐ・す・つ・ぬ・ぶ・
          む・る</span>. Repare que são sempre esses nove sons finais possíveis — nenhum outro.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          Essa forma tem duas funções: é a <strong>base</strong> sobre a qual todas as outras
          conjugações são construídas, e também é, sozinha, o{' '}
          <em>presente/futuro afirmativo casual</em> — usado ao falar com amigos e família
          próxima, sem o tom educado do ます.
        </p>
        <Ex jp="のむ" pt="beber (forma de dicionário / presente casual)" />
        <Ex jp="たべる" pt="comer (forma de dicionário / presente casual)" />
        <Ex jp="する" pt="fazer (forma de dicionário / presente casual)" />
        <Ex jp="まいにち、みずをのむ。" pt="Bebo água todo dia." notes="fala casual, entre amigos/família" />
      </Section>

      <Section title="Os três grupos de verbos">
        <p className="text-sm leading-relaxed text-ink">
          Para conjugar corretamente, o primeiro passo é sempre saber a qual dos três grupos o
          verbo pertence — as regras de conjugação são diferentes para cada um. Praticamente
          todo verbo japonês se encaixa em um desses três grupos, sem exceção.
        </p>
        <GrammarTable
          headers={['Grupo', 'Também chamado', 'Como reconhecer', 'Exemplos']}
          jpCols={[3]}
          rows={[
            [
              'Grupo 1',
              'ごだんどうし ("verbos em -u")',
              'Termina em qualquer som -u que não seja -iru/-eru (ou é uma exceção do Grupo 2)',
              'かう・のむ・はなす・かく・まつ',
            ],
            [
              'Grupo 2',
              'いちだんどうし ("verbos em -ru")',
              'Termina em -iru ou -eru',
              'たべる・みる・おきる・ねる',
            ],
            ['Grupo 3', 'irregulares', 'Apenas dois verbos — decore direto', 'する・くる'],
          ]}
        />
        <p className="text-sm leading-relaxed text-ink">
          Estatisticamente, a maioria dos verbos do japonês é do Grupo 1. O Grupo 3 tem apenas
          dois membros — mas são dois dos verbos mais usados da língua, então vale a pena
          dominá-los cedo.
        </p>
      </Section>

      <Section title="Grupo 1 em detalhe — ごだんどうし">
        <p className="text-sm leading-relaxed text-ink">
          O nome ごだん significa literalmente <strong>"cinco degraus"</strong>: a última sílaba
          do verbo "sobe e desce" por cinco linhas de vogais diferentes (あ・い・う・え・お)
          conforme a conjugação — por exemplo, <span className="font-jp">のむ</span> pode virar{' '}
          <span className="font-jp">のま</span>, <span className="font-jp">のみ</span>,{' '}
          <span className="font-jp">のむ</span>, <span className="font-jp">のめ</span> ou{' '}
          <span className="font-jp">のも</span> dependendo do que vem em seguida. Essa é a raiz
          do nome "godan" e também da complexidade desse grupo: cada consoante final tem seu
          próprio conjunto de sons.
        </p>
        <p className="text-sm leading-relaxed text-ink">
          Abaixo, exemplos organizados pela terminação da forma de dicionário:
        </p>
        <GrammarTable
          headers={['Terminação', 'Exemplos', 'Significado']}
          jpCols={[1]}
          rows={[
            ['-う', 'かう ・ あう ・ つかう ・ うたう', 'comprar ・ encontrar (alguém) ・ usar ・ cantar'],
            ['-く', 'かく ・ きく ・ あるく ・ はたらく', 'escrever ・ ouvir/perguntar ・ andar ・ trabalhar'],
            ['-ぐ', 'およぐ ・ いそぐ', 'nadar ・ se apressar'],
            ['-す', 'はなす ・ だす ・ かす', 'falar ・ tirar/colocar para fora ・ emprestar'],
            ['-つ', 'まつ ・ たつ', 'esperar ・ ficar em pé'],
            ['-ぬ', 'しぬ', 'morrer (praticamente o único verbo comum com essa terminação)'],
            ['-ぶ', 'あそぶ ・ よぶ ・ とぶ', 'brincar/se divertir ・ chamar ・ voar'],
            ['-む', 'のむ ・ よむ ・ やすむ', 'beber ・ ler ・ descansar'],
            ['-る (parte deles)', 'かえる ・ はいる ・ はしる ・ きる ・ しる', 'voltar para casa ・ entrar ・ correr ・ cortar ・ saber'],
          ]}
        />
        <Note>
          <strong>Curiosidade:</strong> <span className="font-jp">しぬ</span> (morrer) é, na
          prática, o único verbo comum terminado em ぬ em todo o japonês moderno — por isso essa
          linha da tabela de conjugação é usada quase exclusivamente por ele.
        </Note>
        <Note>
          <strong>A pegadinha dos verbos em -iru/-eru:</strong> alguns verbos terminados em -iru
          ou -eru <em>parecem</em> Grupo 2, mas são Grupo 1 "disfarçados" e precisam ser
          decorados à parte. Os mais comuns: <span className="font-jp">かえる</span> (voltar para
          casa), <span className="font-jp">はいる</span> (entrar),{' '}
          <span className="font-jp">はしる</span> (correr),{' '}
          <span className="font-jp">きる</span> (cortar),{' '}
          <span className="font-jp">いる</span> (precisar),{' '}
          <span className="font-jp">しる</span> (saber),{' '}
          <span className="font-jp">へる</span> (diminuir) e{' '}
          <span className="font-jp">しゃべる</span> (tagarelar). Todos conjugam como Grupo 1 —
          por exemplo, o presente educado de かえる é かえります, e não かます.
        </Note>
      </Section>

      <Section title="Grupo 2 em detalhe — いちだんどうし">
        <p className="text-sm leading-relaxed text-ink">
          O nome いちだん significa <strong>"um degrau"</strong>: ao contrário do Grupo 1, esse
          grupo não tem cinco conjuntos de sons diferentes para decorar — a operação é sempre a
          mesma, <strong>tirar o る final</strong> e grudar o sufixo desejado. É por isso que
          este grupo costuma ser considerado mais fácil de conjugar.
        </p>
        <GrammarTable
          headers={['Terminação', 'Exemplos', 'Significado']}
          jpCols={[1]}
          rows={[
            [
              '-いる',
              'みる ・ おきる ・ できる ・ きる ・ いる',
              'ver ・ acordar/levantar ・ conseguir fazer ・ vestir ・ estar/existir (seres vivos)',
            ],
            [
              '-える',
              'たべる ・ ねる ・ あける ・ しめる ・ おしえる ・ おぼえる ・ でかける',
              'comer ・ dormir ・ abrir ・ fechar ・ ensinar ・ lembrar/memorizar ・ sair (de casa)',
            ],
          ]}
        />
        <Note>
          <strong>Sons iguais, grupos diferentes:</strong> repare que{' '}
          <span className="font-jp">きる</span> aparece nas duas listas — como "cortar" (Grupo 1)
          e como "vestir" (Grupo 2) são palavras diferentes que soam igual (assim como "cedo" e
          "sedo" em português soam parecido). O mesmo acontece com{' '}
          <span className="font-jp">いる</span>: "precisar" (Grupo 1) e "estar/existir" (Grupo 2).
          Quando o kanji for estudado, cada uma terá sua própria escrita — por enquanto, o
          contexto e a partícula usada deixam claro qual é qual:{' '}
          <span className="font-jp">ふくをきる</span> (vestir roupa, usa を, verbo de ação) vs.{' '}
          <span className="font-jp">ねこがいる</span> (há um gato, usa が, verbo de estado).
        </Note>
      </Section>

      <Section title="Grupo 3 em detalhe — する e くる">
        <p className="text-sm leading-relaxed text-ink">
          São os dois únicos verbos irregulares do japonês — cada um conjuga de um jeito só seu,
          sem seguir as regras dos outros grupos. Por serem tão usados, vale memorizar suas
          conjugações principais de cor.
        </p>
        <GrammarTable
          headers={['Forma', 'する (fazer)', 'くる (vir)']}
          jpCols={[1, 2]}
          rows={[
            ['dicionário', 'する', 'くる'],
            ['ます', 'します', 'きます'],
            ['ない (negativo simples)', 'しない', 'こない'],
            ['て', 'して', 'きて'],
            ['た (passado simples)', 'した', 'きた'],
          ]}
        />
        <Note>
          Repare que <span className="font-jp">くる</span> muda até o próprio som inicial
          (く → き → こ) dependendo da conjugação — isso não acontece em nenhum outro verbo, por
          isso é irregular de verdade. Já <span className="font-jp">する</span> muda para{' '}
          <span className="font-jp">し</span> em quase tudo, com poucas outras formas irregulares
          mais avançadas.
        </Note>
        <p className="text-sm leading-relaxed text-ink">
          <span className="font-jp">する</span> tem um papel extra muito importante: ele se junta
          a diversos substantivos de ação para <strong>criar novos verbos</strong>. Esse padrão é
          extremamente produtivo — é uma das formas mais fáceis de "verbalizar" vocabulário novo.
        </p>
        <GrammarTable
          headers={['Substantivo + する', 'Significado']}
          jpCols={[0]}
          rows={[
            ['べんきょうする', 'estudar'],
            ['うんどうする', 'se exercitar'],
            ['れんしゅうする', 'praticar'],
            ['そうじする', 'limpar (a casa)'],
            ['せんたくする', 'lavar roupa'],
            ['りょこうする', 'viajar'],
            ['けっこんする', 'casar'],
          ]}
        />
        <Ex jp="まいにち、にほんごをべんきょうします。" pt="Estudo japonês todo dia." notes="べんきょう (estudo) + する" />
        <Ex jp="らいねん、けっこんします。" pt="Vou me casar no ano que vem." notes="けっこん (casamento) + する" />
      </Section>

      <Section title="A base do verbo (stem)">
        <p className="text-sm leading-relaxed text-ink">
          A maioria das conjugações é formada trocando a terminação do verbo por uma{' '}
          <strong>base</strong> e depois grudando um sufixo nela. A forma de obter essa base
          muda conforme o grupo:
        </p>
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink">
          <li>
            <strong>Grupo 2 (いちだん):</strong> tire o <span className="font-jp">る</span> final.{' '}
            <span className="font-jp">たべる → たべ</span>. Simples e sempre igual.
          </li>
          <li>
            <strong>Grupo 1 (ごだん):</strong> troque o som -u final pela sílaba correspondente
            na coluna い do hiragana daquela consoante. <span className="font-jp">のむ → のみ</span>{' '}
            (む → み)
          </li>
          <li>
            <strong>Grupo 3:</strong> irregular — <span className="font-jp">する → し</span>,{' '}
            <span className="font-jp">くる → き</span>
          </li>
        </ul>
        <p className="text-sm leading-relaxed text-ink">
          Essa base (chamada de "base い" ou renyoukei) é a que usamos para o ます, mas o mesmo
          princípio — trocar a terminação -u por outra vogal da mesma consoante — vale para
          várias outras conjugações do Grupo 1 que serão vistas em lições futuras (como a forma
          potencial e a volitiva). Vale a pena memorizar bem esta tabela agora:
        </p>
        <GrammarTable
          headers={['Terminação (dicionário)', 'う', 'く', 'ぐ', 'す', 'つ', 'ぬ', 'ぶ', 'む', 'る']}
          jpCols={[0, 1, 2, 3, 4, 5, 6, 7, 8]}
          rows={[['Vira (base い)', 'い', 'き', 'ぎ', 'し', 'ち', 'に', 'び', 'み', 'り']]}
        />
      </Section>

      <Section title="Forma ます — o japonês educado">
        <p className="text-sm leading-relaxed text-ink">
          É a forma que os livros didáticos ensinam primeiro: educada, segura para usar com
          qualquer pessoa (desconhecidos, superiores, situações formais). É a base い + um dos
          quatro sufixos abaixo.
        </p>
        <GrammarTable
          headers={['Sufixo', 'Sentido', 'のむ → ', 'たべる → ', 'する → ']}
          jpCols={[2, 3, 4]}
          rows={[
            ['〜ます', 'presente/futuro afirmativo', 'のみます', 'たべます', 'します'],
            ['〜ません', 'presente/futuro negativo', 'のみません', 'たべません', 'しません'],
            ['〜ました', 'passado afirmativo', 'のみました', 'たべました', 'しました'],
            ['〜ませんでした', 'passado negativo', 'のみませんでした', 'たべませんでした', 'しませんでした'],
          ]}
        />
        <Ex jp="まいあさ、コーヒーをのみます。" pt="Bebo café toda manhã." />
        <Ex jp="けさはなにもたべませんでした。" pt="Não comi nada hoje de manhã." />
        <Ex jp="あした、ともだちとえいがをみます。" pt="Amanhã vou ver um filme com um amigo." />
        <Ex jp="にちようびはべんきょうしません。" pt="Não estudo aos domingos." notes="する → します" />
        <Ex jp="きのう、こうえんまではしりました。" pt="Ontem corri até o parque." notes="はしる é Grupo 1, apesar de terminar em -eru" />
      </Section>

      <Section title="Forma て — a mais versátil">
        <p className="text-sm leading-relaxed text-ink">
          A forma て não indica tempo nem polaridade sozinha — ela é um "conector": serve de base
          para pedidos, ações em andamento, permissões e para encadear ações em sequência. É uma
          das formas mais usadas no dia a dia, e vale a pena praticar bastante.
        </p>
        <GrammarTable
          headers={['Terminação do verbo (Grupo 1)', 'Vira', 'Exemplo']}
          jpCols={[2]}
          rows={[
            ['う・つ・る', 'って', 'かう → かって　／　まつ → まって　／　かえる → かえって'],
            ['ぬ・ぶ・む', 'んで', 'しぬ → しんで　／　あそぶ → あそんで　／　のむ → のんで'],
            ['く', 'いて', 'かく → かいて'],
            ['ぐ', 'いで', 'およぐ → およいで'],
            ['す', 'して', 'はなす → はなして'],
          ]}
        />
        <Note>
          <strong>Exceção importante:</strong> <span className="font-jp">いく</span> (ir) não
          segue a regra de く → いて. A forma correta é{' '}
          <span className="font-jp">いって</span>, não いいて. É a única exceção dessa regra em
          todo o japonês.
        </Note>
        <p className="text-sm leading-relaxed text-ink">
          Para o <strong>Grupo 2</strong>, é simples: tire o る e coloque て (mesma base do ます).{' '}
          <span className="font-jp">たべる → たべて</span>,{' '}
          <span className="font-jp">みる → みて</span>. Para o{' '}
          <strong>Grupo 3</strong>: <span className="font-jp">する → して</span>,{' '}
          <span className="font-jp">くる → きて</span>.
        </p>
        <GrammarTable
          headers={['Uso da forma て', 'Exemplo', 'Tradução']}
          jpCols={[1]}
          rows={[
            ['〜てください — pedido', 'ちょっとまってください。', 'Espere um pouco, por favor.'],
            ['〜ています — ação em andamento', 'いま、べんきょうしています。', 'Estou estudando agora.'],
            ['〜ています — estado resultante', 'けっこんしています。', 'Sou casado(a). (estado, não ação no momento)'],
            ['〜てもいいです — permissão', 'しゃしんをとってもいいですか？', 'Posso tirar uma foto?'],
            ['〜てはいけません — proibição', 'ここでたべてはいけません。', 'Não é permitido comer aqui.'],
            ['て + て — ações em sequência', 'おきて、かおをあらって、あさごはんをたべます。', 'Acordo, lavo o rosto e tomo café da manhã.'],
          ]}
        />
        <Note>
          A diferença entre "ação em andamento" e "estado resultante" com 〜ています depende do
          tipo de verbo: verbos de ação contínua (たべる、のむ、べんきょうする) descrevem algo
          acontecendo agora; verbos de mudança instantânea (けっこんする、しる、いく) descrevem o
          estado que resultou da mudança. Esse detalhe fica mais claro com a prática — por ora,
          basta saber que ambos os usos existem.
        </Note>
      </Section>

      <Section title="Forma negativa simples (ないけい)">
        <p className="text-sm leading-relaxed text-ink">
          É a versão casual de 〜ません, usada entre amigos e família, e também dentro de frases
          mais longas antes de certas conjunções.
        </p>
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink">
          <li>
            <strong>Grupo 1:</strong> troque o -u final pela sílaba correspondente na coluna あ e
            acrescente ない. <span className="font-jp">のむ → のまない</span>{' '}
            (む → ま). Verbos terminados em う viram わ (não あ):{' '}
            <span className="font-jp">かう → かわない</span>.
          </li>
          <li>
            <strong>Grupo 2:</strong> tire o る e acrescente ない.{' '}
            <span className="font-jp">たべる → たべない</span>
          </li>
          <li>
            <strong>Grupo 3:</strong> <span className="font-jp">する → しない</span>,{' '}
            <span className="font-jp">くる → こない</span>
          </li>
        </ul>
        <GrammarTable
          headers={['Terminação (dicionário)', 'う', 'く', 'ぐ', 'す', 'つ', 'ぬ', 'ぶ', 'む', 'る']}
          jpCols={[0, 1, 2, 3, 4, 5, 6, 7, 8]}
          rows={[['Vira (base あ)', 'わ', 'か', 'が', 'さ', 'た', 'な', 'ば', 'ま', 'ら']]}
        />
        <Ex jp="なっとうはたべない。" pt="Não como natto." notes="casual, entre amigos" />
        <Ex jp="おさけはのまないから、うんてんできるよ。" pt="Como não bebo álcool, posso dirigir." notes="ない dentro de uma frase com から" />
        <Ex jp="あしたはがっこうにいかない。" pt="Amanhã não vou para a escola." notes="いく → いかない (regular na forma ない, só a forma て que é exceção)" />
        <Note>
          O verbo <span className="font-jp">ある</span> (haver/existir, para objetos e coisas) é
          uma exceção: sua negativa <strong>não</strong> é あらない, e sim{' '}
          <strong className="font-jp">ない</strong> sozinho — o único verbo do japonês cuja forma
          negativa não é previsível pela regra do grupo.
        </Note>
      </Section>

      <Section title="Passado simples (たけい)">
        <p className="text-sm leading-relaxed text-ink">
          Segue exatamente as mesmas regras de sons da forma て — basta trocar て por た e で por
          だ no final. Se você já sabe formar a forma て de um verbo, já sabe formar o passado
          simples também.
        </p>
        <GrammarTable
          headers={['て → た', 'で → だ']}
          jpCols={[0, 1]}
          rows={[['かって → かった　／　はなして → はなした　／　たべて → たべた', 'のんで → のんだ　／　あそんで → あそんだ　／　しんで → しんだ']]}
        />
        <Ex jp="きのう、ともだちとはなした。" pt="Ontem conversei com um amigo." notes="はなして → はなした" />
        <Ex jp="けさ、こうえんをはしった。" pt="Corri no parque hoje de manhã." notes="はしって → はしった (はしる é Grupo 1)" />
        <Ex jp="にほんにいった。" pt="Fui ao Japão." notes="いって → いった" />
      </Section>

      <Section title="Formalidade: forma ます vs. forma simples">
        <p className="text-sm leading-relaxed text-ink">
          Um ponto que costuma confundir iniciantes: existem duas "trilhas" de conjugação
          correndo em paralelo — a educada (〜ます/〜ません/〜ました/〜ませんでした) e a simples
          (forma de dicionário/〜ない/〜た/〜なかった). Nenhuma das duas é "mais correta"; elas
          servem para contextos diferentes.
        </p>
        <GrammarTable
          headers={['Contexto', 'Forma recomendada']}
          rows={[
            ['Falando com desconhecidos, no trabalho, com superiores', 'ます (educada)'],
            ['Falando com amigos próximos e família', 'forma simples (casual)'],
            ['Diário pessoal, anotações, redes sociais informais', 'forma simples'],
            [
              'Dentro de uma frase maior, antes de から・けど・し・とおもう・という',
              'geralmente forma simples, mesmo em contexto educado',
            ],
            ['Texto formal escrito (notícias, ensaios, e-mails formais)', 'forma simples (だ/である) — assunto de lições futuras'],
          ]}
        />
        <Ex jp="あめがふるとおもいます。" pt="Acho que vai chover." notes="forma simples ふる antes de とおもいます, mesmo em fala educada" />
        <Note>
          Um erro comum de quem está começando é misturar as duas trilhas dentro da mesma oração
          simples (por exemplo, terminar com ます mas usar から no meio com um verbo em ない sem
          necessidade). Como regra prática para começar: escolha uma trilha para a frase inteira e
          mantenha-a, exceto nos casos de subordinação apontados acima.
        </Note>
      </Section>

      <Section title="Resumo — tabela de referência rápida">
        <GrammarTable
          headers={['Dicionário', 'Grupo', 'ます', 'ない', 'て', 'た']}
          jpCols={[0, 2, 3, 4, 5]}
          rows={[
            ['かう (comprar)', '1', 'かいます', 'かわない', 'かって', 'かった'],
            ['のむ (beber)', '1', 'のみます', 'のまない', 'のんで', 'のんだ'],
            ['はなす (falar)', '1', 'はなします', 'はなさない', 'はなして', 'はなした'],
            ['かく (escrever)', '1', 'かきます', 'かかない', 'かいて', 'かいた'],
            ['あそぶ (brincar)', '1', 'あそびます', 'あそばない', 'あそんで', 'あそんだ'],
            ['しぬ (morrer)', '1', 'しにます', 'しなない', 'しんで', 'しんだ'],
            ['いく (ir)', '1 (exceção na て/た)', 'いきます', 'いかない', 'いって', 'いった'],
            ['かえる (voltar p/ casa)', '1 (parece 2)', 'かえります', 'かえらない', 'かえって', 'かえった'],
            ['たべる (comer)', '2', 'たべます', 'たべない', 'たべて', 'たべた'],
            ['みる (ver)', '2', 'みます', 'みない', 'みて', 'みた'],
            ['おきる (acordar)', '2', 'おきます', 'おきない', 'おきて', 'おきた'],
            ['する (fazer)', '3', 'します', 'しない', 'して', 'した'],
            ['くる (vir)', '3', 'きます', 'こない', 'きて', 'きた'],
          ]}
        />
      </Section>

      <Section title="Erros comuns">
        <GrammarTable
          headers={['Erro', 'Incorreto', 'Correto', 'Explicação']}
          jpCols={[1, 2]}
          rows={[
            [
              'Tratar かえる como Grupo 2',
              'かます',
              'かえります',
              'かえる termina em -eru mas é Grupo 1 — a base segue a regra do godan (る → り), não a de tirar só o る',
            ],
            ['いく na forma て/た', 'いいて / いいた', 'いって / いった', 'いく é a única exceção da regra く → いて'],
            ['Negativa de ある', 'あらない', 'ない', 'ある tem negativa irregular'],
            [
              'Usar う→あ em vez de わ nos verbos em -う',
              'かあない',
              'かわない',
              'verbos terminados em う usam わ na forma ない, não あ',
            ],
            [
              'Misturar as duas trilhas de formalidade',
              'たべますから、いかない',
              'たべるから、いかない　／　たべますから、いきません',
              'mantenha a mesma trilha (educada ou casual) na frase, exceto em subordinações específicas',
            ],
          ]}
        />
        <Note>
          Esta lição cobre a base para reconhecer e conjugar verbos no dia a dia. Formas como
          potencial (posso fazer), volitiva (vamos fazer), condicional (se eu fizer), causativa e
          passiva constroem em cima do que foi visto aqui e ficam para lições futuras.
        </Note>
      </Section>
    </div>
  );
}
