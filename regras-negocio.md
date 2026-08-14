# Regras de negócio — Nihongo Study

Regras de domínio do app. Servem de referência única para a lógica; mudanças de
comportamento devem ser refletidas aqui.

## 1. Flash cards

### Estrutura
- Um card tem: frente (japonês), verso (significado), leitura opcional,
  categoria opcional e tags.
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
- O usuário avalia cada revisão com uma nota do FSRS (`Rating`). Botões:
  - **De novo** → `Rating.Again` (1)
  - **Difícil** → `Rating.Hard` (2)
  - **Bom** → `Rating.Good` (3)
  - **Fácil** → `Rating.Easy` (4)
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
- **Estágio dos cards**: Novo (`state !== 2`), Aprendendo (`state === 2` e
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
- Ao clicar "Verificar", `scoreDrawing()` (`src/features/kana/strokes.ts`)
  compara com os dados de traço do KanjiVG
  (`src/data/kanjivg/kana-strokes.json`, gerado por
  `scripts/build-kana-strokes.mjs`):
  - nº de traços (esperado x feito) — penaliza por diferença;
  - forma de cada traço, pareado por índice — distância média ponto a ponto
    após normalizar posição/escala pela caixa delimitadora do desenho
    (desenhar menor/deslocado no canvas não penaliza por si só);
  - direção de cada traço (ângulo do ponto inicial ao final).
  - pontuação 0–100; ≥ `DRAW_PASS_THRESHOLD` (65) conta como acerto no teste.
    A melhor pontuação de cada kana é gravada em `kanaProgress.drawBest`.
- Após verificar, `KanaReferenceFigure`/`KanaStrokeAnimation` anima o
  traçado correto na ordem certa (com botão de repetir a animação) como
  feedback; o avanço automático só é liberado depois que a animação termina.

## 3. Lições de estudo

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

### Como adicionar uma lição
1. Crie `src/licoes/<id>.tsx` exportando `meta` e o componente default.
2. Importe e registre no array `LICOES` em `src/licoes/index.ts`.
3. Não é necessário alterar rotas — o roteamento é dinâmico pelo `id`.

## 4. Dados e sincronização

- **Sem backend.** Cada dispositivo guarda seus próprios dados no IndexedDB.
- **Exportar**: gera um JSON versionado com `cards`, `reviews`, `kanaProgress` e
  `meta`. Serve de sincronização e de backup.
- **Importar**, dois modos:
  - **Substituir**: limpa tudo e grava o conteúdo do arquivo. Simples e previsível.
  - **Mesclar**: por `id` (UUID); em conflito, vence o registro com `updatedAt`
    (cards) ou `lastPracticed` (kana) mais recente. `reviews` são idempotentes
    pelo `id`.
- **UUID como chave** é obrigatório para a mesclagem funcionar sem colisão.
- `schemaVersion` no backup permite migração futura na importação.

## 5. Privacidade

- Nenhum dado sai do dispositivo automaticamente. Não há telemetria, conta nem
  envio para servidores. A única saída de dados é o arquivo de backup que o
  próprio usuário exporta.
