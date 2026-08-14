# Regras de negócio — Nihongo Study

Regras de domínio do app. Servem de referência única para a lógica; mudanças de
comportamento devem ser refletidas aqui.

## 1. Flash cards

### Estrutura
- Um card tem: frente (japonês), verso (significado), leitura opcional,
  categoria opcional e tags.
- Categoria é o eixo principal de filtro na tela de estudo.

### Repetição espaçada (FSRS)
Desde a migração para FSRS (schemaVersion 2), cada card carrega `stability`,
`difficulty`, `state` (New/Learning/Review/Relearning), `reps`, `lapses`,
`scheduledDays` e `dueDate` (timestamp da próxima revisão). O algoritmo em si
é o pacote `ts-fsrs`; o app só monta/lê o estado do card — ver
`src/features/srs/fsrs.ts`.

- Card novo: `freshSrs()` cria um card FSRS vazio (`createEmptyCard`), que
  vence imediatamente.
- A sessão de estudo só inclui cards com `dueDate <= agora`, respeitando o filtro
  de categoria selecionado.
- O usuário avalia cada revisão com uma nota do FSRS (`Rating`). Botões:
  - **De novo** → `Rating.Again` (1)
  - **Difícil** → `Rating.Hard` (2)
  - **Bom** → `Rating.Good` (3)
  - **Fácil** → `Rating.Easy` (4)
- `applyFsrs(card, rating)` delega ao `ts-fsrs` (`enable_short_term: false`,
  então o menor intervalo possível é 1 dia — sem passos de aprendizado em
  minutos, já que cada card só é revisado uma vez por sessão) e devolve o
  novo `stability/difficulty/state/reps/lapses/scheduledDays/dueDate`.
- Cada revisão grava uma linha em `reviews` (para estatísticas futuras).

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
- Cards importados entram como novos (estado SRS inicial), com novo UUID.

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
- O teste cobre todos os kana das famílias selecionadas, uma vez cada, em
  ordem aleatória (sem repetição dentro do teste).
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
