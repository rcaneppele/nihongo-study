import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ChevronLeft, ChevronRight, Compass } from 'lucide-react';
import { Ex, GrammarTable, Note, ReadingKey, Section } from '../components/Licao';
import Furigana, { FuriganaWord } from '../components/Furigana';
import { MANUAL_URL } from '../lib/manual';

/**
 * Guia "Começando do zero" (`/aprender/comecar`): para quem instalou o app sem
 * nunca ter estudado japonês. Explica como o idioma funciona, o que aprender
 * primeiro e quais partes do app usar nas primeiras semanas. Não é uma lição
 * (fica fora de `LICOES`): não entra na trilha, nas conquistas nem na meta
 * diária, e não grava nada. Mesmas regras de conteúdo das lições: japonês
 * sempre com romaji, sem kanji em exemplo. Ver docs/regras-negocio.md §5d.
 */
export default function Comecar() {
  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <Link to="/aprender" className="mb-4 inline-flex items-center gap-1 text-sm text-sage hover:text-ink">
          <ChevronLeft className="h-4 w-4" />
          Aprender
        </Link>
        <div className="flex items-center gap-4">
          <span className="icon-tile h-16 w-16 rounded-3xl bg-fuji/12 text-fuji" aria-hidden>
            <Compass className="h-8 w-8" />
          </span>
          <div>
            <h1 className="font-display text-2xl font-semibold tracking-tight">Começando do zero</h1>
            <p className="mt-0.5 text-sm text-sage">Como o japonês funciona, por onde começar e como usar o app</p>
          </div>
        </div>
      </div>

      <Section title="Como ler este guia">
        <p>
          Este guia é para quem nunca estudou japonês. Leva uns dez minutos e não tem exercício: a ideia é você entender
          o mapa antes de começar a andar. Os exemplos em japonês vêm assim:
        </p>
        <ReadingKey
          lines={[
            { text: 'わたしは すしを たべます。', desc: 'o japonês (toque no alto-falante para ouvir)' },
            { text: 'watashi wa sushi o tabemasu.', desc: 'romaji: a leitura em letras latinas' },
            { text: 'Eu como sushi.', desc: 'a tradução' },
          ]}
        />
        <p>Por enquanto, não tente ler o japonês: leia o romaji e ouça o áudio. Ler kana vem logo depois deste guia.</p>
      </Section>

      <Section title="Antes de tudo: o que este app é">
        <p>
          O Nihongo Study foi feito para <strong>treinar e fixar</strong> o que se aprende num curso, numa escola ou com
          um professor. Ele tem lições que explicam do zero, mas um app não substitui alguém que corrija a sua
          pronúncia, responda às suas dúvidas e converse com você.
        </p>
        <p>
          Se você está começando sozinho, dá para ir longe com o app. Mas, assim que puder, junte a ele um curso, um
          livro didático de japonês para iniciantes ou aulas com um professor. Aí o app vira o seu treino diário.
        </p>
      </Section>

      <Section title="O que é o japonês">
        <p>
          O japonês é falado por cerca de 125 milhões de pessoas, quase todas no Japão. É uma língua sem parentesco
          claro com o chinês, o coreano ou o português. A gramática não tem nada a ver com a do chinês, mas o Japão
          adotou a escrita chinesa há uns 1.500 anos, e com ela milhares de palavras.
        </p>
        <p>
          Você já conhece algumas palavras: <em>karaokê</em>, <em>tsunami</em>, <em>emoji</em>, <em>saquê</em>,{' '}
          <em>judô</em>. E o caminho também vai na outra direção: o japonês pegou do português palavras como パン (
          <em>pan</em>, pão), da época em que os portugueses chegaram ao Japão, no século 16.
        </p>
        <Note>
          O Brasil tem a maior comunidade de descendentes de japoneses fora do Japão: a imigração começou em 1908, com o
          navio Kasato Maru. Por isso muita coisa da cultura japonesa (comida, festivais, escolas de língua) está perto
          de você, e vale aproveitar.
        </Note>
      </Section>

      <Section title="Três escritas na mesma frase">
        <p>
          A primeira surpresa é a escrita. O japonês usa <strong>três sistemas ao mesmo tempo</strong>, muitas vezes
          na mesma frase. Cada um tem o seu papel:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong>Hiragana</strong> (ひらがな): o alfabeto básico, de 46 sinais. Cada sinal é uma sílaba (か = ka,
            さ = sa). Serve para as partes gramaticais da frase e para qualquer palavra japonesa.
          </li>
          <li>
            <strong>Katakana</strong> (カタカナ): os mesmos sons, com outro desenho. Usado principalmente para palavras
            estrangeiras, como コーヒー (<em>koohii</em>, café).
          </li>
          <li>
            <strong>Kanji</strong>: caracteres de origem chinesa que carregam significado. São milhares; o japonês do
            dia a dia usa cerca de 2.000.
          </li>
        </ul>
        <p>Veja uma frase comum, separada em pedaços. Pode ignorar o kanji por enquanto: está aqui só para você ver como aparece.</p>
        <GrammarTable
          headers={['Pedaço', 'Escrita', 'O que é']}
          jpCols={[0]}
          rows={[
            [<FuriganaWord key="w" kanji="私" reading="わたし" />, 'kanji', 'watashi — eu'],
            ['は', 'hiragana', 'wa — partícula que marca o assunto'],
            ['コーヒー', 'katakana', 'koohii — café (palavra estrangeira)'],
            ['を', 'hiragana', 'o — partícula que marca o objeto'],
            [
              <Furigana key="n" segments={[{ text: '飲', reading: 'の' }, { text: 'みます' }]} />,
              'kanji + hiragana',
              'nomimasu — bebo (o kanji dá o sentido, o hiragana a terminação)',
            ],
          ]}
        />
        <p>Quem está começando escreve a mesma frase só em kana, e está certo:</p>
        <Ex jp="わたしは コーヒーを のみます。" romaji="watashi wa koohii o nomimasu." pt="Eu bebo café." />
        <p>
          <strong>E o romaji?</strong> É uma ajuda para os primeiros dias, não um jeito de escrever japonês. Ninguém no
          Japão lê romaji no dia a dia, e quem fica preso a ele trava depois. A meta das primeiras semanas é ler o
          hiragana sem pensar.
        </p>
      </Section>

      <Section title="O que muda em relação ao português">
        <p>
          Japonês não é difícil em tudo: a pronúncia, por exemplo, é bem amigável para brasileiros. O que exige
          adaptação é a montagem da frase. Estes são os pontos que mais surpreendem:
        </p>

        <h3 className="font-semibold text-ink">1. O verbo vem no fim</h3>
        <p>A ordem básica é "eu sushi como". O verbo fecha a frase, e você só sabe o que acontece no final.</p>
        <Ex jp="わたしは すしを たべます。" romaji="watashi wa sushi o tabemasu." pt="Eu como sushi." notes="literalmente: eu (assunto) sushi (objeto) como" />

        <h3 className="font-semibold text-ink">2. Partículas no lugar das preposições</h3>
        <p>
          Pequenas palavras <strong>depois</strong> de cada termo dizem a função dele: quem faz, o quê, para onde, com
          o quê. Elas fazem o papel do "a", "de", "com" e "em" do português, mas vêm atrás da palavra.
        </p>
        <Ex jp="がっこうに いきます。" romaji="gakkou ni ikimasu." pt="Vou à escola." notes="に (ni) = para onde" />
        <Ex jp="でんしゃで いきます。" romaji="densha de ikimasu." pt="Vou de trem." notes="で (de) = com que meio" />

        <h3 className="font-semibold text-ink">3. O sujeito some quando o contexto já diz</h3>
        <p>
          Em português dizemos "você vai comer?". Em japonês, se está claro com quem se fala, o "você" simplesmente não
          aparece. Usar "você" o tempo todo até soa estranho.
        </p>
        <Ex jp="たべますか。" romaji="tabemasu ka." pt="(Você) vai comer?" notes="か (ka) no fim transforma a frase em pergunta" />
        <Ex jp="はい、たべます。" romaji="hai, tabemasu." pt="Sim, (eu) vou comer." />

        <h3 className="font-semibold text-ink">4. Sem gênero, sem plural obrigatório, sem artigo</h3>
        <p>Não existe "o/a", nem "-s" de plural, nem concordância de masculino e feminino.</p>
        <Ex jp="ねこが います。" romaji="neko ga imasu." pt="Tem um gato / uma gata / gatos (aqui)." notes="o contexto decide" />

        <h3 className="font-semibold text-ink">5. A educação faz parte da gramática</h3>
        <p>
          O mesmo verbo tem uma forma educada e uma casual. A forma educada (terminada em <em>-masu</em>) é a que se
          usa com desconhecidos, no trabalho e na escola, e é a que você aprende primeiro. A casual fica para amigos e
          família.
        </p>
        <Ex jp="たべます。" romaji="tabemasu." pt="Como. / Vou comer." notes="educado: serve para qualquer pessoa" />
        <Ex jp="たべる。" romaji="taberu." pt="Como. / Vou comer." notes="casual: só com amigos e família" />

        <h3 className="font-semibold text-ink">6. A pronúncia é amigável, com duas armadilhas</h3>
        <p>
          São só cinco vogais (a, i, u, e, o), bem parecidas com as nossas, e sem vogais nasais como "ão". As
          armadilhas: o <strong>r</strong> é sempre leve, como em "caro" (nunca como em "rato"), e o{' '}
          <strong>tamanho da vogal</strong> muda o sentido da palavra:
        </p>
        <Ex jp="おばさん" romaji="obasan" pt="tia; senhora de meia-idade" />
        <Ex jp="おばあさん" romaji="obaasan" pt="avó; senhora idosa" notes="o “aa” é um “a” que dura o dobro" />
      </Section>

      <Section title="Erros comuns de quem começa">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Ficar no romaji.</strong> Parece mais rápido, mas atrasa tudo depois. Aprenda o hiragana logo,
            mesmo que devagar.
          </li>
          <li>
            <strong>Querer os kanji antes do kana.</strong> Kanji é para depois. Sem kana, você não lê nem a
            terminação dos verbos.
          </li>
          <li>
            <strong>Traduzir palavra por palavra.</strong> A ordem é outra e o sujeito some. Aprenda frases inteiras,
            como elas são ditas.
          </li>
          <li>
            <strong>Estudar duas horas num dia e nada na semana.</strong> Quinze minutos por dia rendem muito mais.
            A memória precisa de repetição espaçada.
          </li>
          <li>
            <strong>Só ler, sem ouvir nem falar.</strong> Toque no alto-falante dos exemplos e repita em voz alta,
            desde o primeiro dia.
          </li>
        </ul>
      </Section>

      <Section title="O que aprender primeiro">
        <p>
          A ordem abaixo é a de quase todo curso de japonês para iniciantes. O primeiro objetivo costuma ser o nível{' '}
          <strong>N5</strong> do JLPT, o exame oficial de proficiência (vai do N5, o mais básico, ao N1). Todo o
          conteúdo do app é desse nível.
        </p>
        <GrammarTable
          headers={['Etapa', 'O quê', 'Por quê']}
          rows={[
            ['1', 'Hiragana', 'É a base de tudo. Com prática diária, leva de uma a duas semanas.'],
            ['2', 'Saudações e frases prontas', 'Você já consegue dizer algo de verdade, e elas mostram a cultura.'],
            ['3', 'です (desu) e frases do tipo "X é Y"', 'A estrutura mais simples e mais usada.'],
            ['4', 'Katakana', 'Para ler palavras estrangeiras, que são muitas.'],
            ['5', 'Vocabulário do dia a dia e as partículas', 'Com elas você monta as suas próprias frases.'],
            ['6', 'Verbos na forma -masu', 'Ações no presente, no passado e na negativa, no tom educado.'],
            ['7', 'Kanji, poucos por vez', 'Quando o kana já estiver automático. Os do N5 são uns 100.'],
          ]}
        />
      </Section>

      <Section title="Seu primeiro mês no app">
        <p>Siga estes passos na ordem. Cada um abre a parte certa do app:</p>
        <ol className="space-y-3">
          <Passo n={1} to="/licoes/kana" titulo="Lição de Kana">
            Leia sobre hiragana e katakana. Por agora, foque no hiragana.
          </Passo>
          <Passo n={2} to="/kana" titulo="Treino dos alfabetos">
            Treine o hiragana todo dia, uma família de cada vez (あいうえお, かきくけこ…), até reconhecer sem pensar.
          </Passo>
          <Passo n={3} to="/licoes/aisatsu" titulo="Lição de Saudações">
            Suas primeiras frases de verdade: bom dia, obrigado, com licença.
          </Passo>
          <Passo n={4} to="/aprender/palavras" titulo="Palavras novas">
            Aprenda 10 palavras por vez. Elas viram flash cards, e o app avisa quando revisar cada uma.
          </Passo>
          <Passo n={5} to="/revisar" titulo="Revisão do dia">
            Todo dia, antes de aprender algo novo. É o que faz a palavra ficar na memória.
          </Passo>
          <Passo n={6} to="/leitura" titulo="Primeiros textos">
            Comece pelos textos do nível "Primeiros passos". Toque nas palavras que não souber.
          </Passo>
          <Passo n={7} to="/licoes" titulo="As próximas lições">
            Siga a trilha de lições na ordem: です, auto-apresentação e as seguintes.
          </Passo>
        </ol>
        <p>
          A tela <strong>Hoje</strong> também monta um plano do dia, com o próximo passo para revisar, aprender e
          praticar. Quando o hiragana estiver firme, seguir esse plano é o caminho mais simples.
        </p>
        <Note>
          Deixe para depois do primeiro mês: Kanji novos, o ditado (Kakitori), o "Diga em japonês" e o diário guiado.
          Eles são ótimos, mas pedem o kana já automático e algumas lições no bolso.
        </Note>
      </Section>

      <Section title="Quanto tempo por dia">
        <p>
          De 15 a 30 minutos por dia é um bom começo, e todo dia vale mais que muito de vez em quando. A meta diária da
          tela Hoje ajuda a manter o ritmo, e a sequência de dias mostra quantos dias seguidos você estudou.
        </p>
        <p>
          O manual do usuário explica cada tela do app em detalhe, com imagens. Depois de aberto uma vez, ele fica
          disponível também sem internet.
        </p>
        <div className="flex flex-wrap gap-2">
          <a href={MANUAL_URL} target="_blank" rel="noreferrer" className="btn-ghost">
            <BookOpen className="h-4 w-4" />
            Abrir o manual
          </a>
          <Link to="/licoes/kana" className="btn-dark">
            Começar pela lição de Kana
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>
    </div>
  );
}

function Passo({ n, to, titulo, children }: { n: number; to: string; titulo: string; children: ReactNode }) {
  return (
    <li>
      <Link
        to={to}
        className="card-surface group flex items-start gap-3 py-3 transition-colors hover:border-fuji/40"
      >
        <span className="icon-tile h-8 w-8 shrink-0 rounded-xl bg-fuji/12 text-sm font-semibold text-fuji">{n}</span>
        <span className="min-w-0 flex-1">
          <span className="block font-medium text-ink">{titulo}</span>
          <span className="block text-sm text-sage">{children}</span>
        </span>
        <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-sage transition-transform group-hover:translate-x-0.5" />
      </Link>
    </li>
  );
}
