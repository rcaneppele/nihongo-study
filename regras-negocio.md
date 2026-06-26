# Regras de negócio — Nihongo Study

Regras de domínio do app. Servem de referência única para a lógica; mudanças de
comportamento devem ser refletidas aqui.

## 1. Flash cards

### Estrutura
- Um card tem: frente (japonês), verso (significado), leitura opcional,
  categoria opcional e tags.
- Categoria é o eixo principal de filtro na tela de estudo.

### Repetição espaçada (SM-2)
Cada card carrega `ef` (easiness factor), `interval` (dias), `repetitions`
(acertos consecutivos) e `dueDate` (timestamp da próxima revisão).

- Card novo: `ef = 2.5`, `interval = 0`, `repetitions = 0`, vence imediatamente.
- A sessão de estudo só inclui cards com `dueDate <= agora`, respeitando o filtro
  de categoria selecionado.
- O usuário avalia cada revisão com uma nota de qualidade `q` (0 a 5). Botões:
  - **De novo** → 0
  - **Difícil** → 3
  - **Bom** → 4
  - **Fácil** → 5
- Atualização após a nota:
  1. Se `q >= 3` (acertou):
     - `repetitions == 0` → `interval = 1`
     - `repetitions == 1` → `interval = 6`
     - senão → `interval = round(interval * ef)`
     - `repetitions += 1`
  2. Se `q < 3` (errou): `repetitions = 0` e `interval = 1`.
  3. `ef = ef + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))`, com mínimo de `1.3`.
  4. `dueDate = agora + interval dias`.
- Cada revisão grava uma linha em `reviews` (para estatísticas futuras).

### Importação
- CSV: `front,back,reading,category,tags` (com ou sem cabeçalho; tags separadas
  por `;`). Parser simples — não cobre vírgulas dentro de aspas.
- JSON: array de objetos de card.
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
- Após verificar, mostra os traços corretos numerados e coloridos por ordem
  (`KanaReferenceFigure`) como feedback — não há animação ainda (ver
  CLAUDE.md, próximas tarefas).

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
