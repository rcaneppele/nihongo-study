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
- Opcionalmente, **nota** (`note`): origem/uso da palavra (empréstimo do
  português, falso amigo, homônimo…), exibida no verso do card nas duas
  direções e no painel do mapa de vocabulário. Se o card não tem `note`
  própria, vale a nota do deck N5 pela frente (`cardNote`, `n5Note`) — assim
  cards importados antes das notas também as mostram. Editável na lista de
  cards ("Nota"/"+ Nota") e no formulário de novo card; salvar vazio grava
  `''`, que esconde inclusive a nota do N5.
- Categoria é o eixo principal de filtro na tela de estudo.

### Meus cards (`/flashcards`)
`/flashcards` é "Meus cards" (Revisar › Meus cards): lista, novo card e
prática livre. A revisão (FSRS) fica **só** na Revisão do dia (`/revisar`,
cards + kanji) — o botão de revisão de Meus cards é um link pra lá, com o
total vencido. As antigas
abas Vocabulário e Progresso viraram páginas do método — `?tab=vocabulario`
redireciona pra `/aprender/palavras` e `?tab=progresso` pra `/progresso`.
A revisão completa do dia (cards + kanji) fica em `/revisar` (§5d).

#### Lista de cards
Pra não virar uma lista infinita conforme o usuário acumula cards: chips de
categoria filtram primeiro, depois uma busca por texto (frente/verso/leitura,
case-insensitive) filtra mais, e só então a lista renderiza — no máximo
`PAGE_SIZE` (20) cards por vez, com um botão "Carregar mais" pra revelar o
próximo lote. Trocar de categoria ou de busca reseta a paginação de volta
pro topo. Isso é só sobre exibição — os filtros de categoria/busca não
afetam quais cards entram na Revisão do dia ou em "Praticar" (isso usa `dueDate`/
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
- A revisão dos flash cards (primeira parte da Revisão do dia) inclui **todos** os cards com
  `dueDate <= agora`, de qualquer categoria — o chip de categoria da lista
  em `/flashcards` é só filtro de exibição, não afeta essa seleção (ver
  seção "Lista de cards" acima). Quem quer estudar restrito a uma categoria
  usa "Praticar" (`PracticeConfigScreen`, seleção de categoria própria),
  que não grava no SRS.
- A ordem de entrega dos cards na sessão é embaralhada (`shuffle`, em
  `src/routes/Revisar.tsx` e `src/routes/Flashcards.tsx`), tanto na Revisão
  do dia quanto em "Praticar" —
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
  mostra a resposta de novo. Na revisão (modo `review`), restaura o card ao estado
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
- **Fila de revisão dos flash cards** (`buildReviewQueue`, usada na
  Revisão do dia e nos contadores de pendências): reconhecimentos e produções vencidos. Os dois sentidos do
  mesmo card **nunca no mesmo dia** (ver a frente em japonês entregaria a
  resposta do outro): se vencem juntos, entra **só a produção**; e se um
  sentido já foi revisado hoje (`lastReviewedAt` de hoje), o outro fica
  para amanhã — como o "enterrar irmãos" do Anki. Isso também segura a
  produção recém-criada pela promoção a Sei dizer (nasce vencida logo
  depois de o reconhecimento ser revisado). Sem essa regra, ao concluir a
  Revisão do dia ainda sobravam itens vencidos na hora (achado no teste
  ponta a ponta). No máximo **20 produções novas por sessão**
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

### Mapa de vocabulário ("Palavras novas")
Página `/aprender/palavras` (Aprender › Palavras novas; `PalavrasNovas.tsx`
+ `VocabularyMap.tsx`, lógica em
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
  na Revisão do dia na hora. É o caminho recomendado; o import por
  categoria inteira em Config fica recolhido em "Avançado" (§1, Deck de
  vocabulário N5).
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
  `seenCount` 0 — entra nas "Palavras compreendidas" do Progresso. Só pode ser
  desmarcado enquanto a palavra não aparece numa leitura concluída (aí o
  registro passa a ser da leitura).

### Importação
`parseCardsFile()` (`src/features/flashcards/importCards.ts`) detecta o
formato pelo nome do arquivo/conteúdo e chama o parser certo:
- CSV: `front,back,reading,category,tags` (com ou sem cabeçalho; tags separadas
  por `;`). Campo entre aspas pode ter vírgula, quebra de linha e `""`.
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
- **Notas do deck** (`note` em `n5.json`): ~40 entradas sem kanji têm nota
  — empréstimos do português (パン, ボタン, たばこ), falsos amigos
  (ストーブ, ノート, アパート), abreviações e homônimos (デパート, コート,
  マッチ) e palavras nativas com uso que confunde lusófonos (あなた, はい,
  いいえ, ちょっと, はく/かぶる). Notas sem kanji, mesma regra das lições.
- Em Config > Dados > "Vocabulário N5" (`src/routes/Config.tsx`), o
  caminho recomendado vem primeiro — um atalho pra Aprender › Palavras
  novas (10 por vez, das mais úteis). O import por categoria inteira fica
  recolhido num bloco "Avançado" (`<details>`), com aviso de que pode
  encher a Revisão do dia de uma vez. Nele, o usuário
  marca quais categorias quer e importa só essas — evita popular a fila de
  revisão com centenas de cards de uma vez só. Antes de importar, o app
  verifica os `front` já existentes em `db.cards` e pula os que já foram
  importados (clicar "Importar selecionados" de novo, ou selecionar
  categorias sobrepostas, não duplica cards). Cards novos entram com estado
  SRS inicial, igual à importação manual.

### Progresso
Página `/progresso` (`src/routes/Progresso.tsx`), junto com os contadores
de vocabulário passivo/ativo e de kana/kanji (que saíram da Home); as
estatísticas de revisão vêm de `src/features/flashcards/ProgressStats.tsx`.
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
- **Sequência de estudo**: a mesma do bloco "Hoje" da Home (qualquer
  atividade, `useResumoDia().sequencia`, §5c) — não há mais uma "sequência
  de revisões" separada, pra não ter dois números com o mesmo nome.

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
- Na configuração, cada tile de família mostra uma barra fina com o
  desempenho **no modo escolhido** (`desempenhoPorFamilia`): largura = kana
  da família já praticados nesse modo; cor = acerto médio deles (romaji e
  múltipla escolha pela taxa de acerto; desenho pela melhor nota) — verde
  ≥ 85%, âmbar ≥ 60%, vermelho abaixo. Sem barra = ainda não praticou nesse
  modo. Só leitura de `kanaProgress`, nada novo gravado.
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
  - a **nota** (0–100) é a forma do desenho inteiro: nuvem de pontos do
    usuário × da referência, depois de normalizar posição/escala pela caixa
    delimitadora (desenhar menor/deslocado no canvas não penaliza). Número,
    ordem e direção dos traços **não** mudam a nota;
  - ≥ `DRAW_PASS_THRESHOLD` (60) conta como acerto no teste. A melhor nota
    de cada kana fica em `kanaProgress.drawBest`;
  - **dicas** (só orientativas, até 3): número de traços diferente do
    oficial; com o mesmo número, por traço pareado por índice — "confira a
    direção" quando a forma do traço está certa nos dois sentidos mas foi
    feita ao contrário, "siga a forma" quando a forma não bate;
  - **combinados (yōon, ex.: きゃ)**: a referência é a de cada kana, lado a
    lado (cada um com metade da largura); o kana pequeno já vem pequeno e
    embaixo no próprio KanjiVG.
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
  - **Revisar** (`KanjiReviewSession.tsx`, aberta só pela Revisão do dia
    em `/revisar` — a página `/kanji` mostra apenas um aviso com link
    quando há kanji vencidos) — mesmo padrão auto-graded de
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
  `sufixos.tsx`, `seikatsu.tsx`, `kanji.tsx`), numa única coluna "Kanji
  (furigana)", com a leitura em cima do kanji. Palavras sem kanji continuam
  como string simples na mesma coluna (ex.: あたし, おまえ), sem
  `FuriganaWord`.

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
- **Níveis** (`NIVEIS_LEITURA` em `textos.ts`): 0 — "Primeiros passos"
  (`textos-nivel0.ts`: 4 ou 5 frases curtíssimas, só kana, quase só です/
  ます no presente, para quem acabou de aprender o alfabeto); 1 (bem
  iniciante, só hiragana/katakana — mesma regra de "sem kanji em frase
  corrida" das lições, aqui estendida ao texto inteiro); 2 (kanji comuns já
  com furigana em cada palavra que os contém); 3 (`textos-nivel3.ts`: textos
  mais longos, mais kanji com furigana e gramática da fronteira N5/N4 —
  〜ながら, 〜たり, 〜てくれる, ので/から). 20 + 20 + 10 + 10 = 60 textos.
  `src/data/leitura/textos.test.ts` confere ids únicos, furigana em toda
  palavra com kanji, níveis 0 e 1 sem kanji e `lemmaReading` em todo lemma
  com kanji. Sem
  restrição a só os kanji do módulo de Kanji (seção 3) — a furigana cobre
  qualquer kanji, é conteúdo de leitura, não de memorização de um dataset
  fechado.
- **Fluxo** (`src/routes/Leitura.tsx` + `LeituraTexto.tsx`): listagem
  agrupada por nível → tela de leitura com toggle de furigana (ligado por
  padrão), um cartão que mostra texto/leitura/significado da última
  palavra tocada (em vez de tooltip flutuante — mais simples e robusto no
  mobile, sem matemática de posicionamento) — no desktop fica fixo no topo
  da coluna enquanto se rola (`sticky`); no celular, com uma palavra
  selecionada, vira um painel fixo no rodapé (acima da barra de navegação),
  com botão de fechar; tocar não rola mais a página —, a palavra
  selecionada fica realçada no texto, e `AudioButton` por linha
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
    palavras distintas — por isso toda palavra cuja forma no texto difere
    da de dicionário traz `lemma` (e `lemmaReading`, quando o lemma tem
    kanji): verbo conjugado → dicionário (`いきました` → `いく`), adjetivo
    flexionado → forma básica (`おいしかったです` → `おいしい`, `しずかで`
    → `しずか`), substantivo + partícula/です → substantivo
    (`とうきょうから` → `とうきょう`). Expressões fixas ficam sem lemma
    (`はじめまして`, `いっしょに`). Texto novo deve seguir a mesma regra.
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
    Domino. Os dois contadores ficam no Progresso (e resumidos no atalho
    de Progresso da Home), com ⓘ explicando cada um
    (abre com toque, pra funcionar no celular) e um selo "↗ +n" dos últimos
    7 dias, só com o que dá pra medir: compreendidas = cards com a primeira
    revisão na semana + palavras compreendidas na primeira leitura em que
    apareceram (`seenCount` 1); sei dizer = cards de Sei dizer/Domino com a
    primeira revisão de produção na semana (`understoodWeek`/`canSayWeek`).
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
    texto". Se ele tocou "Ouvir o texto" com o texto escondido, antes de
    mostrar o app pergunta **quanto entendeu só de ouvido** — Quase tudo
    (1) / Uma parte (0,5) / Pouco (0) ou Pular — e grava a nota em
    `exerciseResults` (`kind: 'escuta'`, item = id do texto) + 1 em
    `praticas`. Desligar "Escutar primeiro" na barra passa pela mesma
    pergunta. O estado de escondido é só da tela.
  - **Shadowing até o fim**: quando o modo Shadowing chega à última linha
    sem ser pausado/parado, grava `exerciseResults` (`kind: 'shadowing'`,
    item = id do texto, sem nota) + 1 em `praticas` e mostra "Shadowing do
    texto inteiro registrado".
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
- O conteúdo das lições é **estático**; o que fica no banco é só o
  progresso de cada uma (abaixo).
- Cada lição usa os componentes de `src/components/Licao.tsx`:
  - `Section` — seção com título e separador.
  - `Ex` — exemplo com campos `jp`, `romaji?`, `pt` e `notes?`.
  - `ReadingKey` — legenda "kana ← descrição" da seção "Como ler esta lição".
  - `Note` — destaque informativo (fundo indigo suave).
  - `GrammarTable` — tabela com suporte a colunas em fonte japonesa (`jpCols`).

### Rotas
- `/licoes` → `src/routes/Licoes.tsx` — grade de cards com todas as lições.
- `/licoes/:id` → `src/routes/Licao.tsx` — renderiza o componente da lição
  correspondente ao `id`; exibe mensagem de "não encontrada" se o id não existir.
  Lições com `quiz.frases` ou `diga` terminam com o atalho "Pratique esta lição" →
  "Diga em japonês" só daquela lição.
- `/licoes/quiz` → `src/routes/Quiz.tsx` (Revisar › Testar lições),
  `/licoes/gramatica` → `src/routes/Gramatica.tsx` (Revisar ›
  Gramática), `/licoes/kakitori` → `src/routes/Kakitori.tsx` (Praticar ›
  Ouvir e Escrever), `/licoes/diga` → `src/routes/Diga.tsx` (Praticar ›
  Falar) e `/licoes/diario` → `src/routes/Diario.tsx` (Praticar ›
  Escrever) — ver as seções abaixo.

### Progresso por lição
`src/features/licoes/progresso.ts`, tabela `lessonProgress` (schemaVersion
7, chave = id da lição): `viewedAt` (última abertura), `completedAt`
(concluída; ausente = não) e `updatedAt` (último marcar/desmarcar — abrir
não conta).
- Abrir a lição grava `viewedAt`. No fim dela, **"Concluí esta lição"**
  grava `completedAt` (e "Desmarcar" apaga). A primeira conclusão soma 1
  em `novos` (meta do dia e passo "Aprender" do Plano do dia); desmarcar
  não subtrai.
- **Trilha** (`TrilhaLicoes`, no topo de `/licoes` e do hub Aprender):
  "N de 12 lições concluídas", barra e a próxima — a primeira de `LICOES`
  sem `completedAt` ("Continuar" se já foi aberta, senão "Próxima"). Na
  grade, selo **Concluída** ou **Em andamento** (aberta, não concluída).
- O fim da lição também tem os atalhos "Diga em japonês" (se a lição tem
  frases) e "Diário guiado" (se tem propostas).

### Quiz ("Testar lições")
Lógica em `src/data/quiz/` (`types.ts`, `gerador.ts`) e
`src/features/quiz/`. Cada lição pode exportar um `quiz` com `frases`
(`FraseEstruturada`: tokens, com as partículas marcadas) e `perguntas`
autoradas.
- **Tipos**: *Reordenar frase* (tocar os blocos na ordem certa, a partir do
  português) e *Escolher partícula* (completar a primeira partícula da
  frase entre a correta e 3 distratoras comuns) são gerados das `frases`;
  *Significado* (múltipla escolha) e *Verdadeiro ou falso* vêm das
  `perguntas`.
- **Configuração**: lições, tipos e quantidade (padrão 10, limitada ao que
  a combinação consegue gerar). Perguntas sorteadas do conjunto.
- **Correção** automática, com feedback e explicação; avança sozinho.
- **Histórico**: ao terminar, cada resposta vai para `exerciseResults`
  (`kind: 'quiz'`, item = id da pergunta/frase, lição, nota 1 ou 0) — ver
  "Histórico dos exercícios" abaixo — e `praticas` += nº de respostas
  (§5c). Desistir no meio não grava nada.

### Kakitori (ditado)
Lógica em `src/data/kakitori/` e `src/features/kakitori/`. Só entram as
lições que exportam `kakitori` (grupos nomeados de itens, ex.: "Kanji -
Números") — as `frases` do quiz são longas demais pra ditado.
- O app fala o item (`speakJapanese`, botão para repetir); o usuário
  escreve o que ouviu **digitando** ou **desenhando** (`?modo=desenhar`, de
  Praticar › Escrever) e revela a resposta (kana, kanji quando difere,
  romaji, tradução).
- **Sem correção automática**: o usuário se marca como acerto ou erro, como
  no flip-card. Ao terminar, grava cada item em `exerciseResults`
  (`kind: 'kakitori'`) e soma em `praticas`.

### Diga em japonês (produção de frases)
Lógica em `src/features/diga/` (`gerador.ts`, `DigaSession.tsx`,
`DigaResultado.tsx`). Treina **montar a frase inteira** em japonês, que o
Quiz (reconhecimento/reordenação) e os flash cards (palavras) não cobrem.

- **Conteúdo**: as frases próprias de cada lição em `diga` (export da
  lição, registrado em `LICOES` — 6 por lição: a gramática da lição com
  vocabulário já visto, em contextos diferentes dos exemplos e do quiz)
  mais as `quiz.frases` (as mesmas do "Reordenar frase" do Quiz). Mesmo
  formato (`FraseEstruturada`); regras de romanização de
  `docs/padrao-licoes.md` §8.3.
- **Configuração**: escolher lições (chips, "Todas"/"Nenhuma") e
  quantidade, mesmo padrão do Quiz. `?licao=<id>` pré-seleciona só uma
  lição (atalho do fim de cada lição).
- **Sessão**: mostra a frase em português; o usuário diz em japonês (em
  voz alta ou de cabeça). "Travou?" mostra as palavras da frase
  embaralhadas como dica. "Mostrar resposta" revela a frase em kana
  (partícula grudada na palavra anterior, espaço entre blocos, como nos
  textos de nível 1 — a partícula é reconhecida pelo texto do token, porque
  nas frases do quiz `particula: true` marca só a que vira lacuna no
  "Escolher partícula"), o romaji e **toca o áudio sozinho** (texto sem
  espaços, pra síntese não fazer pausas). Autoavaliação **Errei / Acertei**
  — pequenas variações naturais contam como acerto. Mesmos atalhos das
  revisões (Espaço revela e, revelado, = Acertei; 1/2; Ctrl+Z volta uma
  frase) e `SessionHeader` com barra de progresso.
- **Resultado**: acertos e lista das frases. "Salvar as N que errei nos
  flash cards" cria cards (frente = frase em kana, verso = português,
  leitura = romaji, categoria **"Frases"**, tags `frase` + id da lição) já
  com `production` — entram direto no estágio **Sei dizer**, porque o
  objetivo é dizer a frase. Pula frases que já têm card (mesma frente).
- Ao terminar, cada frase vai para `exerciseResults` (`kind: 'diga'`, com
  a lição e a autoavaliação como nota) e soma em `praticas`.

### Gramática em contexto
`src/data/gramatica/` (`frases.ts`, `gerador.ts`) + `src/routes/Gramatica.tsx`.
Frases **novas** (não são os exemplos nem o quiz das lições), cada uma com
uma lacuna, agrupadas por **ponto gramatical** (`PONTOS_GRAMATICA`, cada um
ligado a uma lição): です/じゃないです/でした, adjetivos -い, sufixos,
こそあど, família, は/が, を/に/で, の/と/や/も, から/まで/へ/ごろ,
か/ね/よ, verbos em 〜ます, rotina e saudações. Treina reconhecer a regra
numa frase que o aluno nunca viu.
- **Formato**: `frase` com blocos `kana|romaji` separados por espaço e a
  lacuna entre colchetes (`[です|desu]`; romaji pode ter espaço — pedaço
  sem `|` continua o bloco anterior); `distratoras` (nunca também
  corretas na frase — ex.: に e へ com verbo de movimento não aparecem
  juntas), `pt` e `explicacao`. Só kana + romaji e só gramática já
  ensinada (regras de `docs/padrao-licoes.md`). `frases.test.ts` confere o
  formato.
- **Configuração**: pontos (chips agrupados por lição, "Todos"/"Nenhum";
  `?licao=<id>` pré-seleciona os daquela lição) e quantidade (padrão 10).
- **Sessão e resultado**: os do Quiz, com o tipo de pergunta `completar`
  (alternativas em lista quando são longas; a explicação aparece em toda
  resposta). Ao terminar: `exerciseResults` (`kind: 'gramatica'`) e
  `praticas`.

### Diário guiado
`src/data/diario/prompts.ts` + `src/features/diario/diario.ts` +
`src/routes/Diario.tsx`, tabela `journal` (schemaVersion 7).
- **Propostas** (`PROMPTS_DIARIO`): uma ou duas por lição — título,
  instrução, exemplo (kana + romaji + tradução, escondido até "Ver um
  exemplo") e **checklist** de autoavaliação ("usei でした para algo de
  ontem", "não pus さん no meu nome"…).
- O usuário escreve livremente (kana, romaji, como conseguir) e marca o
  checklist. **Sem correção automática** — texto livre exigiria IA externa
  (ver roadmap §4).
- Salvar cria a entrada (`text`, `checked` = índices marcados, datas) e
  soma 1 em `praticas`; editar só atualiza (`updatedAt`); apagar usa
  `apagar('journal', id)` (lápide, §6). A lista mostra as entradas, da mais
  recente, com a proposta, a data e "checklist N/M". `?licao=<id>` põe as
  propostas daquela lição primeiro.

### Histórico dos exercícios
`src/features/exercicios/historico.ts`, tabela `exerciseResults`
(schemaVersion 7): uma linha por resposta (`kind`, `itemId`, `lessonId`,
`score` 0..1, `doneAt`) — histórico imutável, como `reviews`. Tipos: `quiz`,
`diga`, `kakitori`, `gramatica` (nota 1/0), `escuta` (1/0,5/0) e
`shadowing` (sem nota). Usado por: Pontos fracos (§5b), o "Próximo passo"
de Falar e o "Seu nível" de Ouvir/Falar (§5d) e as conquistas (§5e).
`src/features/exercicios/conteudo.ts` recupera o conteúdo de um item (frase
em kana + romaji, pergunta, item de ditado, frase da gramática) a partir do
id guardado.

### Como adicionar uma lição
1. Crie `src/licoes/<id>.tsx` exportando `meta` e o componente default.
2. Importe e registre no array `LICOES` em `src/licoes/index.ts`.
3. Não é necessário alterar rotas — o roteamento é dinâmico pelo `id`.

## 5b. Pontos fracos

`/pontos-fracos` (`src/routes/PontosFracos.tsx`, lógica em
`src/features/pontos-fracos/pontosFracos.ts`), em Revisar › Pontos fracos. Junta o
que o usuário mais erra em cada módulo, **só lendo dados que já existem**
— nada é gravado.

| Origem | Entra quando | Ordem (mais fraco primeiro) |
|---|---|---|
| Flash cards | `lapses` (reconhecimento) + `production.lapses` > 0 | lapsos totais, desempate pela `difficulty` do FSRS |
| Kana | errou ≥ 1× e acerto < 85% (somando "digitar romaji" e "múltipla escolha") | menor taxa de acerto, depois mais erros |
| Kanji | `lapses` > 0 no `kanjiProgress` | lapsos, desempate pela `difficulty` |
| Leitura | `wordKnowledge.status === 'consultada'` (consultou na leitura mais recente) | mais consultas |
| Lições | item de Quiz, ditado, gramática ou "Diga em japonês" (`exerciseResults`) com erro e: a **última tentativa errada** ou acerto < 70% no histórico | menor acerto, mais erros, última errada primeiro |

- Cada origem lista os 8 mais fracos (com "Mostrar todos") e o desempenho
  ("esqueceu 3×", "acerto 40% · errou 5×", "consultou em 2 de 3
  leituras").
- **Treino = prática livre** (`StudySession` em modo `practice`): não mexe
  no FSRS nem em `reviews`/`kanaProgress`. "Treinar meus pontos fracos"
  mistura até 20 itens alternando as origens (um de cada por vez, pra não
  virar só kana); "Treinar só estes" usa até 20 de uma origem. Kana, kanji
  e palavras da leitura entram como cards transitórios (não gravados):
  kana → romaji; kanji → significado + leituras; palavra → significado;
  frase do Quiz/Diga → na direção "dizer em japonês" (vê o português);
  pergunta do Quiz → pergunta e resposta certa; ditado → kana e tradução;
  frase da gramática → frase completa, tradução e o porquê.
  Cards cuja maior parte dos lapsos é na produção são treinados na direção
  "dizer em japonês".

## 5c. Meta diária e sequência de dias

Lógica em `src/features/atividade/atividade.ts`, tabela `activity`
(schemaVersion 5): uma linha por dia (data local "AAAA-MM-DD") com quatro
contadores, somados por `registrarAtividade(tipo, n)`:

| Contador | Quando soma |
|---|---|
| `revisoes` | cada nota em revisão FSRS — flash cards (as duas direções) e kanji |
| `novos` | primeira revisão de reconhecimento de um card (estado New), cada kanji "aprendido" e a primeira conclusão de cada lição |
| `praticas` | cada resposta em treino que não mexe no FSRS: kana (romaji, múltipla escolha, desenho), caligrafia de kanji, prática livre de cards/pontos fracos (ao avançar), no fim de Quiz, gramática em contexto, Kakitori e "Diga em japonês" (nº de itens), e 1 por escuta avaliada, shadowing até o fim e entrada nova no diário |
| `leituras` | cada "Terminei a leitura" |

O desfazer das revisões/prática subtrai o que tinha somado (nunca abaixo
de 0).

- **Meta diária** (Config > Configurações; `db.meta`, chave `metaDiaria`,
  opções 10/20/40/60, padrão 20): atividades = revisões + práticas + novos
  + leituras × 10 (`PESO_LEITURA` — um texto dá bem mais trabalho que uma
  resposta).
- **Sequência**: dias seguidos com estudo, contando qualquer dia com
  atividade registrada **ou** com linha em `reviews` (histórico anterior à
  tabela `activity` — a sequência de quem já estudava não zera). Termina
  hoje, ou ontem se hoje ainda não houve estudo (o dia não acabou — a Home
  avisa "estude hoje para manter").
- **Home**: bloco "Hoje" no topo — anel de progresso até a meta (matcha
  quando batida), chips do dia (revisões/novos/práticas/textos lidos), faixa
  dos **últimos 7 dias** terminando hoje (dia com estudo marcado; hoje em
  destaque escuro) e selo da sequência (`useResumoDia().semana`). É a única
  sequência do app — a página Progresso mostra a mesma ("Sequência de
  estudo").
- **Mesclagem de backup**: o mesmo dia estudado em dois aparelhos soma os
  dois — cada aparelho guarda a própria parte dos contadores
  (`porAparelho`) e a mesclagem soma as partes, então reimportar o mesmo
  arquivo não conta duas vezes (§6).

## 5d. Home (Hoje), navegação e hubs do método

O app é organizado por **objetivo de aprendizado**, não por ferramenta. O
ciclo que a navegação apresenta:

```
   APRENDER  ──►  PRATICAR (usar)  ──►  REVISAR (fixar)
   conteúdo       ler · ouvir ·          memória espaçada,
   novo           falar · escrever       pontos fracos
        ▲                                     │
        └──────────  PROGRESSO  ◄─────────────┘
```

e **Hoje** costura o ciclo num plano do dia. Uma mesma ferramenta pode
aparecer em mais de um hub, cada vez já no modo da habilidade (ver "Modos
pré-escolhidos" abaixo). Ferramenta nova: decidir em
`src/features/metodo/estrutura.ts` em que objetivo(s) ela entra.

- **Saudação** pela hora do aparelho, em japonês com romaji e tradução
  pequenos: おはようございます (antes das 11h), こんにちは (até 18h),
  こんばんは (depois) — o app não sabe o nome do usuário, e assim a saudação
  também ensina. Acima, a data por extenso.
- **Layout** (visual em `docs/guia-visual.md`): saudação → "Hoje"
  (§5c) ao lado do **Plano do dia** → "Seu método" (um atalho por hub:
  Aprender, Praticar, Revisar — com as pendências —, Progresso, cada um
  com uma linha e um número do momento). Os contadores de vocabulário e
  escrita ficam em `/progresso`.
- **Plano do dia** (`src/features/metodo/PlanoDoDia.tsx`): o ciclo do
  método em 3 passos, na ordem **Revisar → Aprender → Praticar**. Cada passo
  mostra a recomendação do hub correspondente e é marcado como **feito**
  pela atividade registrada hoje (tabela `activity`, §5c) — nada novo é
  gravado:

  | Passo | Recomendação | Feito quando |
  |---|---|---|
  | Revisar | "Revisar N item(ns)" (flash cards + kanji vencidos) → Revisão do dia | não há nada vencido |
  | Aprender | o "Próximo passo" de Aprender (palavras novas → kanji → lição) | `novos` > 0 hoje |
  | Praticar | o "Próximo passo" de Praticar (ler, ou escutar um texto já lido) | `leituras` > 0 ou `praticas` > 0 hoje |

  O primeiro passo não feito é o **atual**: destacado, com o porquê e o
  botão escuro "Começar". Os outros não feitos mostram só o título e
  "Fazer agora"; os feitos, um check e o resumo do dia ("2 item(ns)
  novo(s) aprendido(s) hoje"). Com os 3 feitos: "Plano do dia completo!".
- **Navegação pelo método** (`src/features/metodo/estrutura.ts`): **Hoje · Aprender · Praticar · Revisar
  · Progresso** — os mesmos 5 itens na barra inferior do celular e na
  lateral do desktop (que também lista os atalhos de cada seção: Aprender ›
  Lições, Palavras novas, Kanji novos, Alfabetos; Praticar › Ler, Ouvir,
  Falar, Escrever; Revisar › Revisão do dia, Pontos fracos, Testar lições,
  Gramática, Meus cards). Configurações fica na engrenagem (topo no celular, rodapé da
  lateral no desktop).
  - A **seção ativa vem da rota** (`secaoDaRota`), não do clique: dentro de
    uma ferramenta, o menu mostra onde ela mora no método (ex.: `/leitura/…`
    → Praticar; `/flashcards?tab=vocabulario` → Aprender; `/flashcards` →
    Revisar; `/licoes/quiz` e `/licoes/gramatica` → Revisar; Kakitori,
    Diga em japonês e Diário guiado → Praticar). Ferramentas que aparecem em mais de uma seção ficam marcadas
    na principal.
  - Item ativo com pílula e texto **na cor da seção** (Hoje índigo, Aprender
    `fuji`, Praticar `matcha`, Revisar `sora`, Progresso `kin`); Revisar
    mostra as pendências (flash cards + kanji vencidos, `usePendencias`).
- **Revisão do dia** (topo de `/revisar`): um botão encadeia as duas
  revisões FSRS que já existem — primeiro a fila dos flash cards
  (`buildReviewQueue`, embaralhada), depois os kanji vencidos
  (`getDueKanji`) —, sem mudar a lógica de nenhuma. A tela final dos cards
  vira "Continuar para os kanji (N)"; a dos kanji, "Concluir revisão".
  "Desistir e voltar" no meio volta pro hub sem marcar como concluída (o que
  já foi respondido está gravado). Sem nada vencido, o bloco mostra "Tudo em
  dia" (ou "Revisão do dia concluída!" logo depois de terminar).
- **Modos pré-escolhidos** — as atividades dos hubs abrem a ferramenta já
  no modo da habilidade, pela URL (as telas continuam abrindo no padrão sem
  o parâmetro):

  | URL | Efeito | Hub |
  |---|---|---|
  | `/leitura?modo=ouvir` | faixa "Escutar antes de ler" na lista; cada texto abre com "Escutar primeiro" ligado | Ouvir |
  | `/leitura?modo=acompanhar` | faixa explicando "Ouvir o texto" com a linha destacada | Ouvir |
  | `/leitura?modo=shadowing` | faixa "Shadowing"; cada texto abre com o modo shadowing selecionado | Falar |
  | `/kana?modo=romaji` · `desenho` | treino de kana já nesse modo | Ler · Escrever |
  | `/kanji?modo=caligrafia` | começa a prática de caligrafia direto (uma vez; ao sair, fica na página) | Escrever |
  | `/licoes/kakitori?modo=desenhar` | ditado já no modo desenhar | Escrever |
  | `/flashcards?praticar=producao` | abre a prática livre já na direção "dizer em japonês" | Falar |

  Na leitura, o modo acompanha a navegação (lista → texto → "Todos os
  textos"), e a faixa tem "Ler normalmente" pra sair dele. O menu marca
  Praticar quando a ferramenta foi aberta num desses modos de habilidade
  (`secaoDaRota` olha a query também).
- **Próximo passo** (topo dos hubs Aprender, Praticar e de cada
  habilidade; `src/features/metodo/proximoPasso.ts`): uma ação
  recomendada, calculada só com dados já gravados (o passo em si não grava
  nada). Em ordem de prioridade, a primeira regra que se aplica:

  | Hub | Regras |
  |---|---|
  | Aprender | sem abrir/concluir lição há mais de 3 dias → a próxima lição da trilha ("Estudar"/"Continuar a lição …") → N palavras novas (até 10) do mapa, citando a próxima mais útil → kanji novos (se o vocabulário sem kanji acabou) → a próxima lição da trilha → revisitar uma lição (trilha completa) |
  | Ler | texto de `recomendarTexto` (maior "% conhecido", −50 se lido nos últimos 3 dias, −5 por releitura) |
  | Ouvir | escutar sem ler o melhor texto **já lido** (`?modo=ouvir`) → sem texto lido, ditado (Kakitori) |
  | Falar | cards vencidos na direção "dizer em japonês" (→ Revisão do dia) → lição com mais frases erradas no "Diga em japonês" nos últimos 14 dias (`?licao=`) → shadowing de um texto já lido → Diga em japonês |
  | Escrever | família de hiragana com pior nota de desenho (< 85%) → kanji aprendidos ainda não desenhados (caligrafia) → começar a desenhar o hiragana (se nunca desenhou) → ditado à mão |
  | Praticar | sem leitura concluída nos últimos 2 dias → o passo de Ler; senão, o de Ouvir (input primeiro) |

  O Plano do dia da Home usa os passos de Aprender e Praticar daqui.
- **Lições** (`/licoes`) não tem mais a seção "Praticar": no lugar, uma
  linha com o próximo passo do ciclo (Praticar falando, Praticar ouvindo,
  Testar o que ficou). Quiz, gramática em contexto, Kakitori, Diga em
  japonês e o diário moram nos hubs.
- **Hubs** (uma página por seção, mesmo esqueleto: cabeçalho com o porquê +
  cartões de atividade com "pra que serve"): `/aprender`, `/praticar` (as 4
  habilidades), `/praticar/:habilidade` (ler, ouvir, falar, escrever),
  `/revisar` (atividades com contagem de vencidos) e `/progresso`
  (contadores de vocabulário/escrita, as estatísticas de revisão e as
  conquistas, §5e). O hub Aprender também mostra a trilha de lições. As
  atividades apontam pras telas de sempre — as rotas antigas continuam
  valendo. Uma mesma ferramenta aparece em mais de um hub quando serve a
  mais de uma habilidade (Kakitori em Ouvir e Escrever; textos de leitura em
  Ler, Ouvir e Falar).
- **Seu nível nesta habilidade** (fim de cada habilidade;
  `src/features/metodo/nivel.ts`), só com dados gravados:

  | Habilidade | Indicadores |
  |---|---|
  | Ler | textos lidos · palavras compreendidas · kana reconhecidos |
  | Ouvir | acerto no ditado (média dos últimos 30 itens) · entendimento só de ouvido (média das escutas avaliadas) · textos prontos para escutar (já lidos) |
  | Falar | palavras que sei dizer · acerto no "Diga em japonês" (últimas 30 frases) · textos em shadowing (até o fim) · frases salvas como card |
  | Escrever | kana desenhados · nota média do desenho · entradas no diário · kanji desenhados |

  Ouvir e Falar são autoavaliados (sem reconhecimento de voz) — a tela diz
  isso numa linha abaixo dos indicadores.

## 5e. Conquistas

`src/features/conquistas/`, tabela `achievements` (schemaVersion 7, chave =
id da conquista, `unlockedAt`). Marcos locais, sem ranking nem comparação.
- Cada conquista (`CONQUISTAS`) é um número calculado dos dados já
  gravados (`carregarNumeros`) com uma meta: palavras compreendidas
  (50/200/500), sei dizer (25/100), deck N5 inteiro reconhecido, todo o
  hiragana / todo o katakana acertado pelo menos uma vez, kanji
  aprendidos (10/50/todos do N5), textos lidos (1/10/todos), sequência de
  dias (7/30/100), revisões (100/1000), lições concluídas (1/todas),
  acertos em quiz/ditado/gramática/Diga (100), escutas avaliadas (10),
  shadowings (10), entradas no diário (7).
- **Quando confere** (`avaliarConquistas`, montado no Layout como
  `AvisoConquista`): ao abrir o app, a cada troca de tela e quando a
  atividade do dia muda — 1,5 s depois da última mudança, pra conferir uma
  vez só no fim de uma sequência de respostas. O que bateu a meta e ainda
  não estava gravado ganha `unlockedAt` = agora e aparece num aviso no
  rodapé ("Conquista desbloqueada: … e mais N", some em 7 s, "Ver" leva ao
  Progresso). Desbloqueada, fica — mesmo que o número caia depois (ex.:
  sequência quebrada).
- **Progresso**: seção "Conquistas" (N de M), por grupo; desbloqueadas com
  a data, as outras apagadas com a barra até a meta.

## 6. Dados e sincronização

- **Sem backend.** Cada dispositivo guarda seus próprios dados no IndexedDB.
- **Exportar**: gera um JSON versionado com `cards`, `reviews`, `kanaProgress`,
  `kanjiProgress`, `wordKnowledge`, `readingProgress`, `activity`, `meta`,
  `deleted` (lápides), `exerciseResults`, `lessonProgress`, `achievements`
  e `journal` (as quatro últimas desde a schemaVersion 7). Serve de sincronização e de backup. A tabela `local`
  (id do aparelho, estado da sincronização) **nunca** entra no backup.
- **Importar**, dois modos:
  - **Substituir**: limpa tudo e grava o conteúdo do arquivo. Simples e
    previsível. Marca uma nova "época" dos dados (`meta.dataEpoch`, ver abaixo).
  - **Mesclar**: por `id` (UUID) ou pela chave primária da tabela, com uma
    regra por tabela (`src/db/merge.ts`). Toda regra é **idempotente**
    (mesclar o mesmo arquivo de novo não muda nada) e **não depende da
    ordem** (A em B = B em A), pra dois aparelhos convergirem. Empate de
    data mantém o local.
- **Regras da mesclagem por tabela** (schemaVersion 7):
  - `cards`: três grupos de campos, cada um com seu carimbo — conteúdo
    (`contentUpdatedAt`: frente, verso, leitura, categoria, tags, exemplo,
    origem, nota), reconhecimento (`srsUpdatedAt`: estado FSRS) e produção
    (`productionUpdatedAt`). Cada grupo fica com o lado alterado por último,
    independente dos outros — editar a nota num aparelho não desfaz uma
    revisão feita no outro. Carimbo ausente (card anterior à v6) vale
    `updatedAt`; por isso, ao alterar um grupo, os carimbos ausentes dos
    outros são fixados com o `updatedAt` de antes (`carimbosCard`).
  - **Duplicatas de card** (mesma `front`, o critério de duplicata do resto
    do app): depois de mesclar, viram um card só. Fica o de `createdAt` mais
    antigo (empate: menor `id`) — critério de campos que nunca mudam, pra
    todo aparelho escolher o mesmo —, com o estado mais recente de cada
    grupo; o outro é apagado com lápide `mergedInto`, e as revisões dele
    passam para o mantido.
  - `reviews`: histórico imutável — só entra (idempotente pelo `id`) ou sai
    por lápide (desfazer uma nota).
  - `kanjiProgress`: estado FSRS pelo `updatedAt` mais recente; `drawBest`
    pelo maior. Praticar caligrafia **não** mexe em `updatedAt`.
  - `kanaProgress`, `activity`, `wordKnowledge` (`seenCount`/`lookupCount`)
    e `readingProgress` (`timesRead`): **contadores por aparelho**
    (`porAparelho`, `src/db/contadores.ts`). Cada aparelho só escreve a
    própria entrada; mesclar fica com a entrada mais recente de cada
    aparelho, e o total (materializado nos campos de sempre) é a soma — o
    mesmo dia estudado em dois aparelhos soma os dois. Os totais anteriores
    à v6 viram a entrada `legado`, que mescla pelo maior valor (a regra
    antiga). `drawBest`, `lastPracticed` e `lastReadAt` pelo maior;
    `wordKnowledge.status` pelo `updatedAt` mais recente.
  - `meta`: por chave, vence o `updatedAt` mais recente (ausente = 0). Gravar
    sempre via `setMeta` (`src/db/local.ts`).
  - `exerciseResults`: histórico imutável, sem exclusão — só entra
    (idempotente pelo `id`).
  - `lessonProgress`: `viewedAt` pelo maior; `completedAt` (concluída ou
    não) pelo `updatedAt` mais recente — desmarcar depois de concluir vence.
  - `achievements`: fica a data de desbloqueio mais antiga.
  - `journal`: a entrada editada por último (`updatedAt`); apagar deixa
    lápide.
- **Exclusões (lápides)**: apagar um card, desfazer uma nota (apaga o
  review), desmarcar "Já sei" (`wordKnowledge`) e apagar uma entrada do
  diário (`journal`) gravam uma lápide em
  `deleted` (`{ table, key, deletedAt }`) via `apagar()` em
  `src/db/local.ts` — nunca `.delete()` direto nessas tabelas. Na mesclagem,
  a exclusão vence se `deletedAt` for igual ou mais recente que a última
  alteração do registro; um registro alterado depois volta. Lápides com mais
  de 180 dias são descartadas (um aparelho sem sincronizar há mais tempo
  pode ressuscitar o que foi apagado). Apagar um card **não** apaga as
  revisões dele — elas são histórico (Progresso).
- **Época dos dados** (`meta.dataEpoch`): importar no modo Substituir e
  "Apagar tudo" gravam uma época nova. Reservada para a sincronização
  automática substituir (em vez de mesclar) nos outros aparelhos — senão a
  mesclagem traria de volta tudo o que foi substituído.
- **Relógio do aparelho**: as regras dependem das datas de cada aparelho;
  um relógio muito errado pode fazer uma alteração antiga vencer.
- **Sincronizar com arquivo** (Config › Dados, "Sincronizar entre
  aparelhos"): escolher o arquivo do outro aparelho mescla (modo Mesclar) e
  gera o arquivo juntado, que a pessoa baixa ou compartilha pra levar de
  volta. O arquivo não é baixado sozinho depois da mesclagem: o navegador
  só permite baixar/compartilhar logo depois de um toque da pessoa.
- **Compartilhar** (celular): `navigator.share` com o arquivo. O Chrome só
  compartilha alguns tipos de arquivo; se não aceitar `.json`, vai como
  `.txt` (mesmo conteúdo — o importar aceita os dois). Sem suporte, o botão
  não aparece.
- **Sincronização automática com o Google Drive** (opcional, desligada por
  padrão — `src/features/sync/`; Config › Dados). Só aparece se o build tiver
  o Client ID (`VITE_GOOGLE_CLIENT_ID`).
  - **Login**: por redirecionamento (sai do app, passa pela página do
    Google e volta), sem popup e sem script do Google. Escopo só
    `drive.appdata`: uma pasta oculta do app no Drive da pessoa. O token
    dura ~1 hora e, sem servidor, não há como renovar em segundo plano —
    renovar é passar de novo pelo Google (`prompt=none`: volta na hora, sem
    tela, se a pessoa continua logada). O app faz isso **sozinho** só ao
    abrir, ou — com o app aberto — ao voltar pra ele (aba visível ou janela
    em foco) ou mudar de tela, estando numa tela sem sessão de estudo (Hoje,
    Aprender, Praticar e suas habilidades, Lições, Progresso, Config) —
    nunca no meio de uma sessão (o recarregamento perderia a sessão; por
    isso Revisar e as telas de treino ficam de fora) —, no máximo uma vez a
    cada 10 min. Sempre com a conta conectada como sugestão (`login_hint`):
    sem isso, com mais de uma conta Google no navegador, o `prompt=none`
    falha. Se o Google pedir login, não insiste: a Home mostra
    "Sincronização pausada" com o botão Entrar (e Config › Dados mostra o
    código de erro devolvido pelo Google).
  - **Arquivo**: um só, `nihongo-study-sync.json.gz` (o backup comprimido),
    no `appDataFolder`.
  - **Ciclo**: baixar → mesclar aqui (a mesma mesclagem do Importar ›
    Mesclar) → subir o resultado, **só se mudou algo** (comparação por
    chave, sem depender da ordem). Antes de subir, confere se a versão
    remota mudou no meio (outro aparelho gravou); se mudou, repete o ciclo
    (até 3 vezes). Atalho: se nada mudou aqui e a versão remota é a mesma do
    último ciclo, nem baixa — exceto ao abrir o app, que sempre faz o ciclo
    completo (o aviso de alteração pendente só existe na memória).
  - **Quando**: ao abrir o app; ao voltar pra ele (se há alteração pendente
    ou faz mais de 5 min); 30 s depois da última gravação no banco (uma
    sessão de estudo inteira vira um ciclo só); ao sair do app, se há
    alteração pendente; ao voltar a internet; e no botão "Sincronizar
    agora". Sem internet, não tenta.
  - **Época dos dados**: se a época do arquivo remoto é diferente da local,
    um dos aparelhos foi substituído por inteiro (Substituir/Apagar tudo).
    Se foi **este**, sobe sem mesclar (sobrescreve o Drive). Se foi o
    **outro**, pergunta: OK deixa este aparelho igual ao outro; Cancelar
    junta os dois como numa sincronização normal. Na **primeira**
    sincronização de um aparelho, sempre junta (é o que a tela promete ao
    conectar).
  - Sincronizar com sucesso conta como backup (lembrete da Home).
  - **Desconectar** não apaga nada, nem aqui nem no Drive. **Apagar dados do
    Drive** apaga o arquivo remoto e desconecta este aparelho (conectado, o
    próximo ciclo o recriaria).
  - No iPhone com o app instalado, o login pode não voltar para o app — a
    tela de conectar avisa.
- **Lembrete de backup**: `local.lastBackupAt` (só deste aparelho) é gravado
  ao exportar, compartilhar ou salvar o arquivo sincronizado. A Home mostra
  um aviso discreto depois de 7 dias sem backup (contando do primeiro dia
  com atividade, se nunca houve backup); Config › Dados mostra a data do
  último.
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
