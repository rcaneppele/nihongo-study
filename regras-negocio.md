# Regras de negócio — Nihongo Study

Regras de domínio do app. Servem de referência única para a lógica; mudanças de
comportamento devem ser refletidas aqui.

## 1. Flash cards

### Estrutura
- Um card tem: frente (japonês), verso (significado), leitura opcional,
  categoria opcional e tags.
- Opcionalmente, **frase de contexto** (`example`: frase em pedaços com
  furigana, índice da palavra destacada e tradução) e **origem** (`source`:
  de qual texto de leitura veio). São campos sem índice no Dexie — cards e
  backups antigos simplesmente não têm, sem migração. Quando há `example`,
  o verso do card na sessão mostra a frase com a palavra destacada, áudio
  da frase, "Ver tradução da frase" sob demanda e "Leitura · título"
  (`CardExampleView.tsx`; a origem é só texto, não link, pra não perder a
  sessão em andamento).
- Categoria é o eixo principal de filtro na tela de estudo.

### Lista de cards (aba "Estudar")
Pra não virar uma lista infinita conforme o usuário acumula cards: chips de
categoria filtram primeiro, depois uma busca por texto (frente/verso/leitura,
case-insensitive) filtra mais, e só então a lista renderiza — no máximo
`PAGE_SIZE` (20) cards por vez, com um botão "Carregar mais" pra revelar o
próximo lote. Trocar de categoria ou de busca reseta a paginação de volta
pro topo. Isso é só sobre exibição — os filtros de categoria/busca não
afetam quais cards entram em "Estudar"/"Praticar" (isso usa `dueDate`/
categoria selecionada nas telas de sessão, sem relação com a busca).
- Se a categoria selecionada deixa de existir (ex.: apagou o último card
  dela), a seleção volta pra "Todas" sozinha — senão a lista ficaria presa
  filtrada por uma categoria vazia, sem chip visível pra sair desse estado
  (a fileira de chips só aparece se houver pelo menos uma categoria).

### Repetição espaçada (FSRS)
Desde a migração para FSRS (schemaVersion 2), cada card carrega `stability`,
`difficulty`, `state` (New/Learning/Review/Relearning), `reps`, `lapses`,
`scheduledDays` e `dueDate` (timestamp da próxima revisão). O algoritmo em si
é o pacote `ts-fsrs`; o app só monta/lê o estado do card — ver
`src/features/srs/fsrs.ts`.

- Card novo: `freshSrs()` cria um card FSRS vazio (`createEmptyCard`), que
  vence imediatamente.
- A sessão de estudo ("Estudar") inclui **todos** os cards com
  `dueDate <= agora`, de qualquer categoria — o chip de categoria da lista
  em `/flashcards` é só filtro de exibição, não afeta essa seleção (ver
  seção "Lista de cards" acima). Quem quer estudar restrito a uma categoria
  usa "Praticar" (`PracticeConfigScreen`, seleção de categoria própria),
  que não grava no SRS.
- A ordem de entrega dos cards na sessão é embaralhada (`shuffle`,
  `src/routes/Flashcards.tsx`), tanto em "Estudar" quanto em "Praticar" —
  senão a ordem seria sempre a de inserção no banco, e o usuário acaba
  decorando a sequência em vez de lembrar cada card de forma independente.
- O usuário avalia cada revisão com uma nota do FSRS (`Rating`). Botões
  (`src/features/srs/GradeButtons.tsx`, compartilhado com a revisão de kanji):
  - **Não lembrei** → `Rating.Again` (1)
  - **Com esforço** → `Rating.Hard` (2)
  - **Lembrei** → `Rating.Good` (3)
  - **Fácil** → `Rating.Easy` (4)

  Os rótulos descrevem o que aconteceu, não o nome técnico da nota, pra
  ficar claro pra quem nunca usou SRS; cada botão tem um tooltip com a
  explicação completa (`hint` em `REVIEW_GRADES`).
- **Modo de botões** (Config > Configurações > "Revisão"; `db.meta`, chave
  `reviewGradeMode`, entra no backup): **2 botões** (padrão — só Não
  lembrei e Lembrei; o FSRS funciona bem com passou/não passou e é menos
  decisão por card) ou **4 botões**. Notas antigas com Hard/Easy continuam
  válidas; o modo só muda o que aparece na tela.
- Cada botão tem uma **legenda com o próximo intervalo** ("rever amanhã",
  "rever em 12 dias"…), calculada com `previewInterval()` sem gravar nada.
- **Atalhos de teclado** (`src/lib/useShortcuts.ts`; dicas `<kbd>` só
  aparecem em aparelhos com mouse): Espaço/Enter revela a resposta e, com
  ela revelada, conta como **Lembrei**; `1`…`N` = botões na ordem exibida;
  Ctrl/Cmd+Z = desfazer. Ignorados quando o foco está num campo de texto.
- **Desfazer** (cabeçalho da sessão e tela de conclusão): volta um card e
  mostra a resposta de novo. No modo "Estudar", restaura o card ao estado
  FSRS de antes da nota (`updatedAt` atualizado, pra mesclagem tratar como
  edição recente) e **apaga** a linha de `reviews` gravada — como se a nota
  não tivesse sido dada. Vale pra quantas notas quiser dentro da sessão
  atual; ao sair da sessão, a pilha de desfazer se perde. Em "Praticar",
  só volta o card (nada é gravado).
- Barra de progresso fina abaixo de "N de total" (`SessionHeader`).
- `applyFsrs(card, rating)` delega ao `ts-fsrs` (`enable_short_term: false`,
  então o menor intervalo possível é 1 dia — sem passos de aprendizado em
  minutos, já que cada card só é revisado uma vez por sessão) e devolve o
  novo `stability/difficulty/state/reps/lapses/scheduledDays/dueDate`.
- Cada revisão grava uma linha em `reviews` (para estatísticas futuras). O
  botão de nota fica desabilitado enquanto a gravação está em andamento
  (`StudySession.tsx`), pra um clique duplo não gravar duas revisões do
  mesmo card e pular o próximo sem revisar.

**Migração do SM-2** (schemaVersion 1 → 2): não há conversão exata entre os
modelos de estado do SM-2 (`ef/interval/repetitions`) e do FSRS
(`stability/difficulty`). Cards existentes — no upgrade do Dexie e em
backups antigos importados — são resetados para o estado "novo" do FSRS.
O histórico em `reviews` é preservado, mas notas gravadas antes da migração
usam a escala antiga do SM-2 (0..5); não é relido pelo algoritmo, só fica
como registro histórico.

### Estágios de vocabulário (reconhecer → produzir)
Lógica em `src/features/flashcards/stages.ts`. Cada card tem até **duas
direções**, cada uma com seu próprio estado FSRS:

- **Reconhecimento** (japonês → português): os campos de SRS direto no
  `Card`, como sempre.
- **Produção** (português → japonês): `card.production` (mesmo formato,
  `CardSrs`), opcional — só existe a partir do estágio Sei dizer. Campo sem
  índice: cards e backups antigos simplesmente não têm, sem migração; a
  mesclagem de backup continua por `updatedAt` do card inteiro.

O **estágio** é derivado, nunca gravado:

| Estágio | Condição |
|---|---|
| Novo | sem produção e reconhecimento nunca revisado (`state` New) |
| Reconheço | sem produção, reconhecimento já revisado |
| Sei dizer | tem produção, com intervalo < 21 dias (ou ainda nova) |
| Domino | produção em Review com `scheduledDays >= 21` |

- **Promoção automática**: ao gravar uma revisão de reconhecimento cujo
  novo intervalo é **≥ 7 dias** (`PRODUCTION_MIN_DAYS`), o card ganha
  `production = freshSrs()` (vence na hora). Cards antigos que já tinham
  intervalo ≥ 7 dias são promovidos na próxima revisão deles (ou à mão).
- **Domino é só rótulo**: o FSRS continua agendando as duas direções,
  cada vez mais espaçadas — nada sai da fila.
- **Mudança manual** (lista de cards em `/flashcards`): "Treinar a dizer"
  (Novo/Reconheço → Sei dizer, adianta a promoção); "Voltar um estágio"
  (Sei dizer → Reconheço apaga `production`, e o card é promovido de novo
  quando o reconhecimento firmar; Domino → Sei dizer reinicia a produção do
  zero). Grava `updatedAt`.
- **Fila do "Estudar"** (`buildReviewQueue`, também usada no contador da
  Home): reconhecimentos e produções vencidos. Se as duas direções do
  mesmo card vencem juntas, entra **só a produção** (ver a frente em
  japonês entregaria a resposta); o reconhecimento segue vencido para uma
  próxima sessão. No máximo **20 produções novas por sessão**
  (`NEW_PRODUCTION_PER_SESSION`), pra uma leva grande de promoções não
  inundar a revisão — as demais ficam pras próximas sessões.
- **Card de produção**: frente = "Como se diz em japonês?" + significado
  (`back`); se o card tem frase de contexto, mostra a frase com lacuna no
  lugar da palavra (mantém a partícula grudada: "＿＿が") e a tradução da
  frase como pista. Resposta de cabeça/em voz alta e autoavaliada (mesmos
  botões/atalhos/desfazer); o verso mostra a palavra, leitura, áudio e a
  frase completa.
- Revisões de produção gravam `direction: 'production'` em `reviews`
  (ausente = reconhecimento). O desfazer restaura o card inteiro, inclusive
  desfazendo uma promoção.
- **Praticar** ganhou a escolha de direção (Reconhecer/Dizer em japonês), válida
  pra qualquer card selecionado, independente do estágio — não grava nada.

### Mapa de vocabulário (aba "Vocabulário")
Aba de `/flashcards` (`VocabularyMap.tsx`, lógica em
`src/features/flashcards/vocabulary.ts`), sobre o deck N5 **sem kanji**
(`N5_DECK`, mesmo filtro do import). Não tem tabela própria: cruza o deck
com `cards` (pela `front`) e `wordKnowledge` (pela chave).

- **Estado de cada palavra**: Nova (sem card, não marcada) · Na fila (card
  ainda não revisado) · Reconheço (card revisado, ou compreendida na
  leitura, ou "Já sei" no mapa) · Sei dizer · Domino (estágios do card).
  Cores: neutro → índigo claro → índigo → sage; `hanko` não é usado.
- **% conhecido** do filtro = (Reconheço + Sei dizer + Domino) ÷ palavras.
- **Ordem de utilidade** (`byUsefulness`), usada na grade, no "Aprender" e
  na sugestão: em quantos textos de leitura a palavra aparece (mesma chave
  do vocabulário passivo — frequência no próprio corpus do app); desempate
  pela categoria em ordem "iniciante primeiro" (Saudações, Pronomes,
  Números/tempo, Verbos, Adjetivos, Advérbios, Partículas, Substantivos) e
  depois a ordem do deck. Hoje só ~25 das 155 palavras aparecem nos
  textos, então o desempate pesa.
- **"Aprender as próximas 10"**: cria cards (estado FSRS novo, mesmo formato
  do import do N5) das 10 palavras Novas mais úteis do filtro; elas entram
  em "Estudar" na hora. É a alternativa gradual ao import por categoria em
  Config, que continua existindo.
- **"Testar 10 que já conheço"**: prática livre (não grava nada) com até 10
  palavras sorteadas entre as conhecidas, direção reconhecimento. Palavras
  conhecidas sem card (leitura/"Já sei") entram como card transitório, não
  gravado.
- **Painel da palavra** (por padrão, a próxima mais útil ainda Nova):
  leitura, significado, áudio, estado, textos de leitura em que aparece
  (com link) e ações — "Aprender (criar card)" e "Já sei esta palavra"
  (Nova); "Criar card" e, se marcada no próprio mapa, "Desmarcar já sei"
  (Reconheço sem card); controle de estágio do card (com card).
- **"Já sei"** grava em `wordKnowledge` com status `compreendida` e
  `seenCount` 0 — entra nas "Palavras compreendidas" da Home. Só pode ser
  desmarcado enquanto a palavra não aparece numa leitura concluída (aí o
  registro passa a ser da leitura).

### Importação
`parseCardsFile()` (`src/features/flashcards/importCards.ts`) detecta o
formato pelo nome do arquivo/conteúdo e chama o parser certo:
- CSV: `front,back,reading,category,tags` (com ou sem cabeçalho; tags separadas
  por `;`). Parser simples — não cobre vírgulas dentro de aspas.
- JSON: array de objetos de card.
- Texto do Anki ("Notas em Texto Simples" ou "Cartões em Texto Simples"):
  lê cabeçalho `#separator`/`#html`/`#notetype column`/`#deck column`/
  `#tags column`/`#columns` quando presente (senão detecta separador por
  conteúdo); remove tags HTML e `[sound:...]`; localiza frente/verso/leitura
  por nome de coluna (`front/expression/frente/palavra/termo`,
  `back/meaning/significado/verso/defini`, `reading/leitura/kana/furigana`)
  ou, sem cabeçalho de colunas, pela ordem. Também serve de fallback
  genérico para qualquer TSV.
- Cards importados entram como novos (estado SRS inicial), sempre com novo
  UUID gerado na hora — mesmo se o JSON trouxer um `id`, ele é ignorado
  (evita colidir com um card já existente e derrubar o `bulkAdd` inteiro;
  essa importação nunca faz merge por id, isso é o backup — ver seção 4).

### Deck de vocabulário N5
- `n5.json` traz ~700 palavras do vocabulário N5 (JLPT), traduzidas e
  categorizadas em pt-BR em 8 categorias: Substantivos, Verbos, Adjetivos,
  Advérbios, Números e tempo, Pronomes e interrogativos, Saudações e
  expressões, Partículas e gramática. `src/data/seed/n5.ts` reexporta esse
  arquivo filtrando fora, por enquanto, as entradas com kanji na frente
  (`N5_DECK`) — mesmo motivo da regra de kanji nas lições (usuário ainda
  aprendendo kana). É só remover o filtro quando fizer sentido reintroduzir
  kanji; o dado completo continua em `n5.json`. Para essas ~155 entradas
  sem kanji, o campo `reading` em `n5.json` já vem em **romaji** (não
  hiragana/katakana), já que a frente do card é a própria palavra em kana —
  repetir em kana no verso não ajudaria; nas ~555 entradas com kanji
  (hoje filtradas), `reading` continua em hiragana, já que ali serve de
  furigana pro kanji.
- Em Config > Dados > "Vocabulário N5" (`src/routes/Config.tsx`), o usuário
  marca quais categorias quer e importa só essas — evita popular a fila de
  revisão com centenas de cards de uma vez só. Antes de importar, o app
  verifica os `front` já existentes em `db.cards` e pula os que já foram
  importados (clicar "Importar selecionados" de novo, ou selecionar
  categorias sobrepostas, não duplica cards). Cards novos entram com estado
  SRS inicial, igual à importação manual.

### Progresso
Aba "Progresso" em `/flashcards` (`src/features/flashcards/ProgressStats.tsx`).
Calcula tudo no cliente a partir de `db.cards`/`db.reviews` — nenhum dado
novo persistido, sem lib de gráfico (divs + Tailwind).

- **Taxa de acerto**: `quality > 1` conta como acerto. Funciona tanto pra
  notas do FSRS (1..4, onde 1 = Again/erro) quanto pras antigas do SM-2
  (0..5, onde 0 = De novo/erro) — as duas escalas têm erro em ≤1, sem overlap
  ambíguo, então não precisa saber de qual escala veio a revisão.
- **Jornada do vocabulário**: contagem por estágio (Novo / Reconheço /
  Sei dizer / Domino — ver "Estágios de vocabulário" acima), com a dica de
  cada estágio no tooltip.
- **Intervalo de reconhecimento** (antes "Estágio dos cards"): Novo (`state !== 2`), Aprendendo (`state === 2` e
  `scheduledDays < 21`), Maduro (`state === 2` e `scheduledDays >= 21`, limiar
  igual ao "mature" do Anki). Não há baldes de "Aprendendo"/"Reaprendendo" do
  FSRS (`state` 1/3) porque `enable_short_term: false` faz o algoritmo pular
  direto de Novo pra Revisão, mesmo depois de um lapso — ver
  `src/features/srs/fsrs.ts`.
- **Heatmap de revisões**: últimos 84 dias (12 semanas), um quadrado por dia,
  intensidade da cor proporcional ao nº de revisões daquele dia relativo ao
  dia mais cheio do período. Alinhado por dia da semana (estilo GitHub).
- **Sequência atual**: dias consecutivos (contando de hoje pra trás) com pelo
  menos uma revisão.

## 2. Treino de kana

### Conjuntos
- Escopo: gojūon (seion), dakuten/handakuten (ga, za, da, ba, pa) e yōon
  (kya, sha, cha, ...) de hiragana e katakana — ver `FAMILY_DATA` em
  `src/data/kana.ts`. Katakana é derivado do hiragana por deslocamento de
  código Unicode (mesmo layout dos dois blocos).
- O usuário escolhe hiragana, katakana ou ambos, e quais famílias quer
  treinar (toggles agrupados em "Básicos" e "Combinados").

### Fluxo: teste com pontuação
- Configuração → Teste → Resultado (`src/routes/Kana.tsx`).
- O teste cobre todos os kana das famílias selecionadas pelo menos uma vez,
  em ordem aleatória. Kana com maior taxa de erro histórica em
  `kanaProgress` (para o modo escolhido — `romajiWrong`/`romajiCorrect` no
  modo "digitar romaji", `choiceWrong`/`choiceCorrect` na "múltipla
  escolha", `drawBest` no "desenhar") entram repetidos no pool, até 3 vezes
  a mais (`buildWeightedPool`/`errorRateFor`), pra receberem mais prática na
  mesma sessão; kana sem histórico ou já dominados aparecem só uma vez.
- **Atalho "Praticar pontos fracos"**: na tela de configuração, ignora a
  seleção manual de famílias e monta a sessão com os kana de maior taxa de
  erro no modo/escrita atuais (`getWeakKana`), até 20 (`WEAK_POOL_CAP`). Só
  entram kana já praticados nesse modo e com pelo menos um erro; sem
  histórico de erro, o botão fica desabilitado. O contador exibido reflete
  só esses kana realmente errados; se houver poucos (menos que
  `MIN_WEAK_POOL` = 4), a sessão de fato (não o contador) é completada com
  outros kana do mesmo script — praticados e acertados primeiro, depois
  nunca vistos — só pra dar variedade mínima à sessão (`padWeakPool`).
  **Sem repetição ponderada** aqui (diferente do teste normal): esse pool
  já é só os piores kana, então pesar de novo por cima inflava demais a
  sessão (ex.: 5 kana fracos viravam 17 perguntas) — cada kana aparece uma
  vez. "Refazer teste" no resultado repete a mesma origem (fracos ou
  seleção normal) usada para iniciar a sessão.
- **Sem repetição adjacente**: depois de montar o pool (com as repetições
  extra de kana fracos), `arrangeNoAdjacent` reordena pra nunca colocar o
  mesmo kana duas vezes seguidas, a menos que seja matematicamente
  impossível evitar — repetição "colada" é prática massiva, não espaçada, e
  esvazia o sentido de repetir o item. Aplica-se a toda sessão, não só ao
  atalho de pontos fracos.
- Depois de responder (ou verificar o desenho), o próximo kana avança
  automaticamente após um tempo fixo — maior para erro do que para acerto,
  e maior ainda no modo desenhar (dá tempo de ler o feedback de traços) —
  com uma barra de progresso indicando a contagem
  (`useHoldToPauseAdvance`, `src/lib/useHoldToPauseAdvance.ts`). Segurar o
  dedo/clique na tela pausa a contagem, para o usuário poder ler com calma.
- Ao final, mostra percentual de acerto, contagem e lista dos kana errados
  para revisão. Pode repetir o mesmo teste ou voltar à seleção.

### Modo "digitar romaji"
- Mostra o kana; o usuário digita a leitura.
- Comparação é case-insensitive e usa o romaji canônico (ex.: `shi`, `chi`,
  `tsu`, `fu`).
- Resultado atualiza `kanaProgress` (`romajiCorrect` / `romajiWrong`,
  `lastPracticed`).

### Modo "múltipla escolha"
- Direção oposta ao modo "digitar romaji": mostra o romaji, o usuário toca
  no kana correspondente entre 6 opções (`ChoiceQuestion`, `CHOICE_COUNT` em
  `src/routes/Kana.tsx`).
- Distratores priorizam kana visualmente confundíveis com o correto
  (`getConfusables`, `src/data/kana.ts` — grupos como ぬ/め/ね/れ/わ ou シ/ツ,
  distintos entre hiragana e katakana), completando com aleatórios quando
  faltam opções. A busca por aleatórios segue em camadas: primeiro dentro
  da seleção da sessão, depois em todo o script mas só no mesmo grupo
  (básicos ou combinados/yōon — `KanaEntry.group`) do kana perguntado, e só
  como último recurso (praticamente nunca acontece) em qualquer kana do
  script — evita que um combinado tipo りゅ apareça como opção numa sessão
  só de kana básicos, ou vice-versa. Nunca dois distratores com o mesmo
  romaji do correto (ex.: じ/ぢ).
- Resultado atualiza `kanaProgress` (`choiceCorrect` / `choiceWrong`,
  `lastPracticed`) — contadores separados de `romajiCorrect`/`romajiWrong`
  porque testam a direção oposta (reconhecer o kana a partir do romaji, não
  o contrário).

### Modo "desenhar"
- O app pede um kana (pelo romaji) e o usuário desenha no canvas
  (`src/components/KanaCanvas.tsx`); os traços são capturados como
  sequências de pontos `{x, y, t}`.
- Ao clicar "Verificar", `scoreDrawing()`
  (`src/features/handwriting/strokes.ts` — motor compartilhado com o módulo
  de Kanji, ver seção 3) compara com os dados de traço do KanjiVG
  (`src/data/kanjivg/kana-strokes.json`, gerado por
  `scripts/build-kana-strokes.mjs`):
  - nº de traços (esperado x feito) — penaliza por diferença;
  - forma de cada traço, pareado por índice — distância média ponto a ponto
    após normalizar posição/escala pela caixa delimitadora do desenho
    (desenhar menor/deslocado no canvas não penaliza por si só);
  - direção de cada traço (ângulo do ponto inicial ao final).
  - pontuação 0–100; ≥ `DRAW_PASS_THRESHOLD` (65) conta como acerto no teste.
    A melhor pontuação de cada kana é gravada em `kanaProgress.drawBest`.
- Após verificar, `StrokeReferenceFigure`
  (`src/features/handwriting/StrokeReferenceFigure.tsx`) anima o traçado
  correto na ordem certa (com botão de repetir a animação) como feedback; o
  avanço automático só é liberado depois que a animação termina.

## 3. Módulo de Kanji

- Trilha de repetição espaçada dos kanji do **N5** (~110 kanji,
  `KANJI_N5` em `src/data/kanji.ts`), no estilo radical → mnemônico → kanji.
  N4/N3 ficam para uma fase futura, mesma estrutura de dados.
- Cada `KanjiEntry` traz `meaning`, `onyomi`/`kunyomi` (pares kana+romaji, no
  mesmo estilo de leitura já usado na lição `src/licoes/kanji.tsx`),
  `radicals` (componentes visuais com nome simples em pt-BR),  `mnemonic`
  (texto original, nunca copiado de terceiros — mesmo princípio de
  originalidade das lições, ver `docs/padrao-licoes.md`), `strokeCount`,
  `order` (progressão pedagógica de introdução) e `examples` (2-3 palavras
  reais de uso).
- **Progresso** fica em `db.kanjiProgress` (chave primária = caractere,
  schemaVersion 3 — ver `src/db/schema.ts`), reaproveitando o **mesmo FSRS**
  dos flash cards (`src/features/srs/fsrs.ts`, `freshSrs()`/`applyFsrs()`).
  Uma linha só existe depois que o usuário "aprende" aquele kanji — não é
  pré-populada para os ~110 de uma vez (mesmo padrão lazy de
  `kanaProgress`).
- **Fluxo** (`src/routes/Kanji.tsx`):
  - **Aprender** (`KanjiLearn.tsx`) — apresenta kanji ainda não iniciados,
    em lote (5/10/20 por vez, na ordem de `order`), mostrando radicais,
    mnemônico, leituras e exemplos de uma vez (diferente da revisão). Ao
    confirmar, cria a linha em `kanjiProgress` com `freshSrs()` — o kanji
    entra na fila de revisão imediatamente (`dueDate` = agora).
  - **Revisar** (`KanjiReviewSession.tsx`) — mesmo padrão auto-graded de
    `StudySession.tsx` (flash cards): mostra o kanji, "Mostrar resposta"
    revela leituras/significado/exemplos, e a nota do FSRS atualiza
    `kanjiProgress` — mesmos botões, modo 2/4 botões, atalhos e desfazer
    dos flash cards (seção 1; o desfazer aqui restaura o `kanjiProgress`
    anterior, já que kanji não grava em `reviews`). Fila = kanji com `dueDate`
    vencido (`getDueKanji`, `src/features/kanji/kanjiQueue.ts`).
  - **Caligrafia** (`KanjiDrawSession.tsx`) — mesmo motor do modo "desenhar"
    de kana (`KanaCanvas` + `scoreDrawing()` + `StrokeReferenceFigure`),
    sobre os kanji já aprendidos (`getStartedKanji`). Grava `drawBest` em
    `kanjiProgress`, **independente** do ciclo de FSRS — não afeta
    agendamento de revisão, mesmo padrão de `kanaProgress.drawBest`.
- **Dados de traço**: `src/data/kanjivg/kanji-strokes.json`, gerado por
  `scripts/build-kanji-strokes.mjs` — mesma lógica de busca/parse do
  KanjiVG usada para kana, extraída para `scripts/lib/kanjivg.mjs` e
  compartilhada entre os dois scripts. `src/features/handwriting/strokes.ts`
  mescla os dois JSONs (kana + kanji) num único `REFERENCE_DATA` — o motor
  de pontuação (`scoreDrawing`) é agnóstico de caractere.
- **Furigana**: `src/components/Furigana.tsx` renderiza kanji com a leitura
  pequena em cima via `<ruby>/<rt>`, usado nos exemplos e leituras deste
  módulo e na leitura extensiva (seção 4). `FuriganaWord` (mesmo arquivo) é
  o atalho para o caso comum de uma palavra inteira com uma leitura só —
  usado nas tabelas de vocabulário das lições (`familia.tsx`, `pronomes.tsx`,
  `sufixos.tsx`) no lugar da antiga coluna "Kanji" separada da coluna
  "Hiragana": agora é uma única coluna "Kanji (furigana)", com a leitura em
  cima do kanji. Palavras sem kanji continuam como string simples na mesma
  coluna (ex.: あたし, おまえ), sem `FuriganaWord`.

## 4. Leitura extensiva

- **Dados**: `src/data/leitura/types.ts` define `ReadingWord` (`{ text,
  reading?, meaning? }` — uma palavra, com furigana e significado
  individuais), `ReadingLine` (`ReadingWord[]`, uma frase) e `ReadingText`
  (`{ id, title, level, wordCount, summaryPt, lines }`). Conteúdo em
  `src/data/leitura/textos.ts` (`LEITURA_TEXTOS`), escrito à mão — **sem
  tokenizador/parser morfológico de japonês em runtime**: cada palavra do
  texto já vem pré-segmentada com sua leitura e significado no próprio
  dado, ao contrário de tentar decompor uma string corrida em tempo real.
  Pontuação fica grudada no texto da última palavra da frase (ex.:
  `"です。"`), sem token próprio.
- **Por que não reaproveitar `Token` (quiz) ou `ItemKakitoriFonte`
  (kakitori)**: nenhum dos dois cobre o caso — `Token` não tem leitura de
  kanji nem significado por palavra; `ItemKakitoriFonte` é por item isolado,
  não uma sequência de palavras formando um texto corrido.
- **Níveis**: 1 (bem iniciante, só hiragana/katakana — mesma regra de "sem
  kanji em frase corrida" das lições, aqui estendida ao texto inteiro) e 2
  (kanji comuns já com furigana em cada palavra que os contém). Sem
  restrição a só os kanji do módulo de Kanji (seção 3) — a furigana cobre
  qualquer kanji, é conteúdo de leitura, não de memorização de um dataset
  fechado.
- **Fluxo** (`src/routes/Leitura.tsx` + `LeituraTexto.tsx`): listagem
  agrupada por nível → tela de leitura com toggle de furigana (ligado por
  padrão), um cartão fixo que mostra texto/leitura/significado da última
  palavra tocada (em vez de tooltip flutuante — mais simples e robusto no
  mobile, sem matemática de posicionamento), e `AudioButton` por linha
  (reaproveita `speakJapanese` de `src/features/audio/speech.ts`, texto
  puro sem ruby).
- **Vocabulário passivo e textos lidos** (`src/features/leitura/knowledge.ts`,
  tabelas `wordKnowledge` e `readingProgress`, schemaVersion 4):
  - **Identidade da palavra** (`wordKey`): a mesma forma sugerida como
    frente de card (`suggestCard`): `lemma` quando anotado, senão o texto
    sem pontuação final e sem a partícula de 1 caractere indicada no
    significado. Assim uma palavra lida e um card salvo dela batem.
    Palavras sem `meaning` (partículas/gramática) não contam. Sem `lemma`,
    formas conjugadas diferentes (`行きました`/`行きます`) contam como
    palavras distintas — `ReadingWord.lemma` é opcional e vai sendo
    preenchido aos poucos nos textos.
  - Tocar numa palavra marca ela como **consultada nesta leitura** (tocar
    em PT, a tradução da frase, não marca nada).
  - **"Terminei a leitura"** (fim da tela): para a leitura em voz alta, e
    para cada palavra única do texto grava em `wordKnowledge` o status da
    leitura mais recente — `compreendida` (não tocou) ou `consultada`
    (tocou) —, somando `seenCount`/`lookupCount`; e soma `timesRead` em
    `readingProgress`. Depois mostra um resumo com a lista das consultadas,
    cada uma com "Salvar nos flash cards", e "Ler de novo" (zera as
    consultas da tela, não o histórico) ou "Escolher outro texto". No modo
    "escutar primeiro" não há toques — concluir conta tudo como
    compreendido (o usuário entendeu de ouvido).
  - **Palavras compreendidas** (`useKnownWords`) = chaves com status
    `compreendida` + frentes de cards já revisados ou com produção.
    **Palavras que sei dizer** = frentes de cards no estágio Sei dizer ou
    Domino. Os dois contadores ficam na Home, com ⓘ explicando cada um
    (abre com toque, pra funcionar no celular).
  - **% conhecido** de um texto = palavras únicas dele que estão em
    "compreendidas" ÷ total de palavras únicas. Aparece no topo da tela de
    leitura e, quando > 0, na listagem (junto com "lido N×"); a listagem
    explica que ~90%+ é a faixa ideal.
- **Ouvir o texto** (`ReadAloudBar.tsx` + `useReadAloud.ts`, em
  `src/features/leitura/`): lê as linhas em sequência via
  `speakJapaneseAndWait()`, destacando a linha atual e rolando até ela.
  - **Pausar** cancela a fala e lembra a linha; **Continuar** recomeça
    essa linha (não usa `speechSynthesis.pause()`, instável no Android);
    **Do início** reinicia. Sair da tela para a leitura.
  - Qualquer outra fala no meio (botão de áudio de uma linha/palavra)
    interrompe a leitura, que fica pausada naquela linha — `speech.ts`
    numera cada fala (`generation`) pra quem espera saber que foi
    interrompido, em vez de seguir pra próxima linha por cima.
  - **Modo Shadowing**: depois de cada linha, pausa de 1,2× o tempo que a
    linha levou (mínimo 1,5 s), com aviso "Sua vez — repita a frase em voz
    alta" e barra de contagem. Sem reconhecimento de fala; a conferência é
    de ouvido. O modo não muda durante a reprodução.
  - **Escutar primeiro**: borra o texto (palavras e botão PT ficam
    inclicáveis; o áudio por linha continua) até o usuário tocar "Mostrar
    texto". Estado só da tela, não persistido.
  - **Velocidade** (Normal 0,9 / Lenta 0,65): global — vale pra todo áudio
    do app (AudioButton, kakitori, leitura). `db.meta`, chave
    `speechSpeed`, entra no backup; `speech.ts` mantém em cache pra não
    ler o banco a cada fala.
- **Salvar palavra nos flash cards** (`SaveWordForm.tsx` +
  `src/features/flashcards/mining.ts`): o cartão da palavra tocada mostra
  "+ Salvar nos flash cards" (só em palavras com `meaning` — partículas
  soltas não). Abre um mini-formulário pré-preenchido por `suggestCard()`
  pra o usuário conferir, já que o texto guarda a forma de superfície:
  - tira a pontuação final da frente e da leitura;
  - se o significado termina em "(+ partícula …)", tira essa nota e o
    último caractere da frente/leitura (ex.: `天気が`/`てんきが` →
    `天気`/`てんき`). Partículas de 2+ caracteres (`には`) e conjugações
    ficam pro usuário ajustar.

  O card é criado com estado FSRS novo, categoria **"Leitura"**, tag
  `leitura`, a linha inteira como `example` (palavra destacada) e o texto
  como `source`. Duplicata = mesma `front` (mesmo critério do import do
  N5): se a palavra sugerida já existe, o cartão mostra "Já está nos seus
  flash cards" no lugar do botão; se o usuário editar a frente para uma que
  já existe, o salvamento é recusado com aviso.

## 5. Lições de estudo

### Estrutura
- Cada lição é definida em `src/licoes/<id>.tsx` e exporta um `meta`
  (`LicaoMeta`) e um componente React padrão.
- `LicaoMeta`: `id` (slug único, ex.: `kosoado`), `title` (título em
  português), `subtitle` (transliteração/kanji), `emoji` e `tags` (array de
  strings como `['gramática', 'n5']`).
- O registro central `LICOES` em `src/licoes/index.ts` controla a ordem de
  exibição na listagem.

### Conteúdo
- Lições são **estáticas** — não há persistência nem estado no banco de dados.
  O usuário lê, mas não há progresso rastreado por lição (por ora).
- Cada lição usa os componentes de `src/components/Licao.tsx`:
  - `Section` — seção com título e separador.
  - `Ex` — exemplo com campos `jp`, `reading?`, `pt` e `notes?`.
  - `Note` — destaque informativo (fundo indigo suave).
  - `GrammarTable` — tabela com suporte a colunas em fonte japonesa (`jpCols`).

### Rotas
- `/licoes` → `src/routes/Licoes.tsx` — grade de cards com todas as lições.
- `/licoes/:id` → `src/routes/Licao.tsx` — renderiza o componente da lição
  correspondente ao `id`; exibe mensagem de "não encontrada" se o id não existir.
  Lições com `quiz.frases` terminam com o atalho "Pratique esta lição" →
  "Diga em japonês" só daquela lição.
- `/licoes/diga` → `src/routes/Diga.tsx` — ver "Diga em japonês" abaixo.

### Diga em japonês (produção de frases)
Lógica em `src/features/diga/` (`gerador.ts`, `DigaSession.tsx`,
`DigaResultado.tsx`). Treina **montar a frase inteira** em japonês, que o
Quiz (reconhecimento/reordenação) e os flash cards (palavras) não cobrem.

- **Conteúdo**: as `quiz.frases` das lições — as mesmas frases do
  "Reordenar frase" do Quiz. Toda lição com frases de quiz entra
  automaticamente; não há conteúdo próprio (ainda).
- **Configuração**: escolher lições (chips, "Todas"/"Nenhuma") e
  quantidade, mesmo padrão do Quiz. `?licao=<id>` pré-seleciona só uma
  lição (atalho do fim de cada lição).
- **Sessão**: mostra a frase em português; o usuário diz em japonês (em
  voz alta ou de cabeça). "Travou?" mostra as palavras da frase
  embaralhadas como dica. "Mostrar resposta" revela a frase em kana
  (partícula grudada na palavra anterior, espaço entre blocos, como nos
  textos de nível 1), o romaji e **toca o áudio sozinho** (texto sem
  espaços, pra síntese não fazer pausas). Autoavaliação **Errei / Acertei**
  — pequenas variações naturais contam como acerto. Mesmos atalhos das
  revisões (Espaço revela e, revelado, = Acertei; 1/2; Ctrl+Z volta uma
  frase) e `SessionHeader` com barra de progresso.
- **Resultado**: acertos e lista das frases. "Salvar as N que errei nos
  flash cards" cria cards (frente = frase em kana, verso = português,
  leitura = romaji, categoria **"Frases"**, tags `frase` + id da lição) já
  com `production` — entram direto no estágio **Sei dizer**, porque o
  objetivo é dizer a frase. Pula frases que já têm card (mesma frente).
- Nada é gravado além disso: sem histórico de sessões, como o Quiz.

### Como adicionar uma lição
1. Crie `src/licoes/<id>.tsx` exportando `meta` e o componente default.
2. Importe e registre no array `LICOES` em `src/licoes/index.ts`.
3. Não é necessário alterar rotas — o roteamento é dinâmico pelo `id`.

## 5b. Pontos fracos

`/pontos-fracos` (`src/routes/PontosFracos.tsx`, lógica em
`src/features/pontos-fracos/pontosFracos.ts`), com atalho na Home. Junta o
que o usuário mais erra em cada módulo, **só lendo dados que já existem**
— nenhuma tabela nova, nada gravado.

| Origem | Entra quando | Ordem (mais fraco primeiro) |
|---|---|---|
| Flash cards | `lapses` (reconhecimento) + `production.lapses` > 0 | lapsos totais, desempate pela `difficulty` do FSRS |
| Kana | errou ≥ 1× e acerto < 85% (somando "digitar romaji" e "múltipla escolha") | menor taxa de acerto, depois mais erros |
| Kanji | `lapses` > 0 no `kanjiProgress` | lapsos, desempate pela `difficulty` |
| Leitura | `wordKnowledge.status === 'consultada'` (consultou na leitura mais recente) | mais consultas |

Quiz e "Diga em japonês" não guardam histórico, então não entram.

- Cada origem lista os 8 mais fracos (com "Mostrar todos") e o desempenho
  ("esqueceu 3×", "acerto 40% · errou 5×", "consultou em 2 de 3
  leituras").
- **Treino = prática livre** (`StudySession` em modo `practice`): não mexe
  no FSRS nem em `reviews`/`kanaProgress`. "Treinar meus pontos fracos"
  mistura até 20 itens alternando as origens (um de cada por vez, pra não
  virar só kana); "Treinar só estes" usa até 20 de uma origem. Kana, kanji
  e palavras da leitura entram como cards transitórios (não gravados):
  kana → romaji; kanji → significado + leituras; palavra → significado.
  Cards cuja maior parte dos lapsos é na produção são treinados na direção
  "dizer em japonês".

## 6. Dados e sincronização

- **Sem backend.** Cada dispositivo guarda seus próprios dados no IndexedDB.
- **Exportar**: gera um JSON versionado com `cards`, `reviews`, `kanaProgress`,
  `kanjiProgress`, `wordKnowledge`, `readingProgress` e `meta`. Serve de
  sincronização e de backup.
- **Importar**, dois modos:
  - **Substituir**: limpa tudo e grava o conteúdo do arquivo. Simples e previsível.
  - **Mesclar**: por `id` (UUID) ou pela chave primária da tabela; em conflito,
    vence o registro com `updatedAt` mais recente (cards, kanjiProgress,
    wordKnowledge, readingProgress) ou
    `lastPracticed` mais recente (kana). `reviews` são idempotentes pelo `id`.
- **UUID como chave** é obrigatório para a mesclagem funcionar sem colisão.
- `schemaVersion` no backup permite migração futura na importação —
  migrações são incrementais por versão em `migrateBackup`
  (`src/db/backup.ts`): cada passo só roda se o backup ainda não chegou lá
  (checagem pela versão de origem do backup, não só pela versão atual), pra
  um backup já em v2 não ser reprocessado pela migração de v1→v2 sempre que
  `SCHEMA_VERSION` sobe de novo.

## 7. Atualização do app (PWA)

- **Deploy**: push na `main` dispara o GitHub Actions, que builda e publica
  no GitHub Pages. Como é hospedagem estática, não dá pra configurar
  `Cache-Control` por arquivo — o navegador pode cachear `sw.js` por conta
  própria, o que atrasa a detecção de uma versão nova.
- **Registro do service worker**: manual, em `src/lib/pwaUpdate.ts` (chamado
  em `src/main.tsx`) — `injectRegister: false` em `vite.config.ts` desliga o
  script que o vite-plugin-pwa injetaria sozinho, que é só um `register()`
  puro e nunca fazia o worker novo assumir sozinho (o worker gerado só troca
  de versão ao receber a mensagem `SKIP_WAITING` — ninguém mandava essa
  mensagem antes). O registro manual resolve isso em 4 partes:
  1. `updateViaCache: 'none'` — nunca usa cache HTTP pra buscar o próprio
     `sw.js`, sempre confere a versão real do servidor.
  2. Checagem de atualização periódica (a cada 1h) e sempre que o app volta
     ao primeiro plano (`visibilitychange`) — não depende mais do usuário
     abrir/recarregar manualmente pra notar uma versão nova.
  3. Ao detectar um worker novo instalado, manda `postMessage({ type:
     'SKIP_WAITING' })` pra ele assumir — sem isso, o worker novo fica
     esperando todas as abas fecharem (comportamento padrão do navegador).
  4. Quando o controller troca (o worker novo assumiu), recarrega a página
     uma única vez — troca os arquivos estáticos (JS/CSS) já carregados na
     aba pelos novos, sem precisar de outro recarregamento manual. Um guard
     (`hadController`) evita recarregar sozinho na primeiríssima instalação
     do PWA, quando ainda não existe nenhum controller anterior pra trocar.
- **Antes desta correção**: o app dependia inteiramente do comportamento
  padrão do navegador (só ativa um worker novo depois que todas as
  abas/instâncias fecham), por isso o usuário precisava puxar pra atualizar
  manualmente, às vezes mais de uma vez.

## 8. Privacidade

- Nenhum dado sai do dispositivo automaticamente. Não há telemetria, conta nem
  envio para servidores. A única saída de dados é o arquivo de backup que o
  próprio usuário exporta.
