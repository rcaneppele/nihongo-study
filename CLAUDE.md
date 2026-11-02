# CLAUDE.md

Contexto e convenções deste projeto para uso com o Claude Code. Leia antes de
implementar mudanças.

## O que é

App pessoal de estudo de japonês para um único usuário, uso doméstico, sem fins
comerciais. Cinco funcionalidades centrais: flash cards com repetição espaçada,
treino de hiragana/katakana (modo digitar romaji e modo desenhar com feedback de
caligrafia), módulo de Kanji (repetição espaçada com radical/mnemônico + a
mesma caligrafia do treino de kana), leitura extensiva (textos curtos
graduados por nível, com furigana e significado por palavra) e lições de
estudo (conteúdo estático de gramática e vocabulário). Essas ferramentas são
apresentadas **pelo método** — Hoje · Aprender · Praticar (ler/ouvir/falar/
escrever) · Revisar · Progresso —, não por módulo (ver
`src/features/metodo/estrutura.ts` e `regras-negocio.md` §5d).

## Princípios de arquitetura (não quebrar sem combinar)

- **Sem backend.** Tudo roda no navegador. Não introduza servidor, API remota
  nem banco externo. **Única exceção, combinada:** a sincronização opcional com
  o Google Drive do próprio usuário (`src/features/sync/`) — desligada por
  padrão, sem servidor nosso, e o app funciona 100% sem ela.
- **Offline-first / PWA.** Deve funcionar instalado e sem internet.
- **Dados locais por dispositivo** no IndexedDB (via Dexie). Cada aparelho é
  independente.
- **Sincronização**: manual, via exportar/importar JSON (`src/db/backup.ts`),
  que também é o backup do usuário; ou automática pelo Google Drive (opcional),
  que usa o mesmo arquivo e a mesma mesclagem.
- **Chaves primárias são UUID** (`newId()` em `src/db/schema.ts`), nunca
  auto-incremento — isso é o que torna a mesclagem entre dispositivos possível.

## Stack e comandos

- Vite + React + TypeScript + Tailwind + Dexie + vite-plugin-pwa.
- `npm run dev` (desenvolvimento), `npm run build` (produção), `npm run lint`,
  `npm test` (Vitest — a mesclagem de backup em `src/db/`, o parser de CSV
  da importação de cards e a consistência dos dados de leitura e de
  gramática em contexto).

## Versionamento

Ao final de qualquer tarefa que implemente uma funcionalidade nova ou faça um
ajuste relevante, **verifique se a versão em `package.json` (campo
`version`) precisa subir** — é a fonte única (`vite.config.ts` expõe
`__APP_VERSION__` a partir dela, exibido no rodapé do app; nenhum outro
arquivo precisa ser sincronizado à mão). Isso vale como uma checagem final,
no mesmo espírito de rodar `npm run build`/`npm run lint` antes de
considerar a tarefa pronta — avalie e aplique sem precisar perguntar. Nem
toda mudança pede bump; julgue pelo impacto:

- **Minor** (`2.1.0` → `2.2.0`): funcionalidade nova (uma tela, um modo, um
  módulo), mesmo que grande — desde que não quebre nem resete dados já
  salvos do usuário. É o caso mais comum (ex.: módulo de Kanji, leitura
  extensiva, Kakitori).
- **Major** (`2.x.x` → `3.0.0`): mudança que quebra ou reseta dados já
  salvos do usuário (ex.: a troca de algoritmo de SM-2 para FSRS, que
  resetou o progresso de repetição espaçada de todo card existente). Rara —
  só quando a migração de schema não é 100% aditiva/retrocompatível.
- **Patch** (`2.1.0` → `2.1.1`): correção de bug, ajuste de UI/UX pequeno,
  conteúdo de lição sem mudar estrutura de dados — nada que o usuário
  chamaria de "funcionalidade nova".
- Mudança só de documentação (`CLAUDE.md`, `regras-negocio.md`,
  `docs/*.md`) não pede bump de versão.

## Mapa do código

- `src/db/schema.ts` — tabelas Dexie: `cards`, `reviews`, `kanaProgress`,
  `kanjiProgress`, `wordKnowledge`, `readingProgress`, `activity`, `meta`,
  `deleted` (lápides), `exerciseResults` (histórico dos exercícios),
  `lessonProgress`, `achievements` (conquistas), `journal` (diário) e
  `local` (só do aparelho, fora do backup).
- `src/db/backup.ts` — exportar/importar; modos `replace` e `merge`;
  migrações incrementais por versão em `migrateBackup`.
- `src/db/merge.ts` — regras de mesclagem por tabela (funções puras,
  testadas em `merge.test.ts`; `npm test`); `src/db/contadores.ts` —
  contadores por aparelho (`porAparelho`); `src/db/local.ts` — id do
  aparelho, `setMeta()` (toda gravação em `db.meta`) e `apagar()` (toda
  exclusão de card/review/`wordKnowledge`/`journal`, com lápide). Ver
  `regras-negocio.md` §6.
- `src/features/sync/` — sincronização automática com o Google Drive:
  `googleAuth.ts` (login por redirecionamento, token de ~1h; Client ID em
  `VITE_GOOGLE_CLIENT_ID` — `.env.example`, variável `GOOGLE_CLIENT_ID` no
  deploy), `googleDrive.ts` (API REST do Drive via `fetch`, arquivo gzip no
  `appDataFolder`), `destino.ts` (interface pra outros destinos), `motor.ts`
  (ciclo baixar → mesclar → subir, época dos dados, gatilhos, status),
  `SyncCard.tsx` (Config › Dados) e `AvisoSync.tsx` (Home). Ver
  `regras-negocio.md` §6.
- `src/features/backup/` — lembrete de backup da Home (`LembreteBackup`,
  `useEstadoBackup`); o "Sincronizar com arquivo" e o compartilhar ficam em
  `src/routes/Config.tsx` (aba Dados) + `shareBackup()` em `backup.ts`.
- `src/features/srs/fsrs.ts` — algoritmo FSRS isolado (wrapper do pacote
  `ts-fsrs`; sucessor do SM-2, migrado em schemaVersion 2 — ver
  `regras-negocio.md`), reaproveitado tanto por flash cards quanto pelo
  módulo de Kanji.
- `src/features/flashcards/importCards.ts` — importação de cards via CSV
  (com aspas, testado em `importCards.test.ts`),
  JSON ou texto exportado do Anki ("Notas em Texto Simples"/"Cartões em
  Texto Simples"); `parseCardsFile()` detecta o formato pelo nome do
  arquivo/conteúdo.
- `src/features/flashcards/StudySession.tsx` — sessão de revisão/prática.
- `src/features/flashcards/mining.ts` + `SaveWordForm.tsx` — salvar palavra
  tocada na leitura como card, com a frase de contexto (`Card.example`) e
  a origem (`Card.source`); `CardExampleView.tsx` mostra essa frase no
  verso do card.
- `src/features/flashcards/stages.ts` — estágios de vocabulário (Novo →
  Reconheço → Sei dizer → Domino), promoção para a direção de produção
  (`Card.production`) e fila de revisão dos flash cards (`buildReviewQueue`).
- `src/features/flashcards/vocabulary.ts` + `VocabularyMap.tsx` — página
  "Palavras novas" (`/aprender/palavras`, `PalavrasNovas.tsx`): deck N5 por categoria com estado de cada
  palavra, % conhecido, "Aprender as próximas 10" e painel da palavra;
  `StageControls.tsx` tem o rótulo/ação de estágio usados na lista e no mapa.
- `src/features/flashcards/note.ts` + `CardNote.tsx` — nota de origem/uso
  do card (`Card.note`, com a nota do deck N5 como reserva), exibição e
  edição.
- `src/features/srs/GradeButtons.tsx` — botões de nota das revisões
  (flash cards e kanji), com legenda de intervalo e atalhos; modo 2/4
  botões em `gradeMode.ts`.
- `src/features/flashcards/ProgressStats.tsx` — estatísticas de progresso
  (página `/progresso`), calculadas de `db.cards`/`db.reviews`.
- `src/features/handwriting/strokes.ts` — captura/normalização de traços e
  `scoreDrawing()`: reconhecimento + pontuação de caligrafia contra o
  KanjiVG. Compartilhado entre o treino de kana e o módulo de Kanji (mescla
  `kana-strokes.json` + `kanji-strokes.json` num só `REFERENCE_DATA`).
- `src/features/handwriting/StrokeReferenceFigure.tsx` — animação do
  traçado de referência (ordem/direção correta) usada como feedback depois
  do modo desenho, em kana e kanji.
- `src/components/KanaCanvas.tsx` — canvas de desenho (pointer events),
  também usado pelo módulo de Kanji.
- `src/data/kanji.ts` — dataset `KANJI_N5` (~110 kanji): leituras,
  radicais/mnemônico, exemplos e ordem pedagógica de introdução.
- `src/features/kanji/kanjiQueue.ts` — consultas de fila (kanji devidos,
  disponíveis para aprender, já iniciados).
- `src/features/kanji/KanjiLearn.tsx`, `KanjiReviewSession.tsx`,
  `KanjiDrawSession.tsx` — telas de aprender/revisar/praticar caligrafia do
  módulo de Kanji. Aprender e caligrafia ficam em `/kanji`; a revisão roda
  dentro da Revisão do dia (`/revisar`), depois dos flash cards.
- `src/components/Furigana.tsx` — kanji com leitura em cima via
  `<ruby>/<rt>`; usado no módulo de Kanji, na leitura extensiva e, via
  `FuriganaWord`, nas tabelas de referência das lições.
- `src/data/leitura/types.ts` — tipos da leitura extensiva (`ReadingWord`,
  `ReadingLine`, `ReadingText`); `src/data/leitura/textos.ts`
  (`LEITURA_TEXTOS`, `NIVEIS_LEITURA`) — textos originais por nível (0:
  primeiros passos, em `textos-nivel0.ts`; 1: só kana; 2: kanji com
  furigana; 3: textos longos/N4, em `textos-nivel3.ts`), pré-segmentados
  palavra a palavra (leitura+significado por palavra, `lemma` quando a
  forma não é a de dicionário), sem tokenizador em runtime;
  `textos.test.ts` confere furigana e lemas.
- `src/routes/Leitura.tsx` / `LeituraTexto.tsx` — listagem por nível e tela
  de leitura (`/leitura`, `/leitura/:id`): toggle de furigana, cartão de
  palavra selecionada, `AudioButton` por linha.
- `src/features/leitura/useReadAloud.ts` + `ReadAloudBar.tsx` — "ouvir o
  texto" na leitura (contínuo ou shadowing, linha destacada, escutar
  primeiro); velocidade da fala global em `src/features/audio/speech.ts`.
- `src/features/leitura/knowledge.ts` — vocabulário passivo: palavras
  compreendidas/consultadas ao concluir um texto, "% conhecido" por texto
  e os contadores de palavras compreendidas / que sei dizer do Progresso.
- `src/lib/useHoldToPauseAdvance.ts` — hook do auto-avanço cronometrado do
  treino de kana (barra de progresso; segurar a tela pausa a contagem).
- `src/lib/useTheme.tsx` — `ThemeProvider`/`useTheme`: tema claro/escuro/
  sistema, persistido em `db.meta` (entra no backup) e cacheado em
  `localStorage` só para aplicar antes do primeiro paint.
- `src/lib/pwaUpdate.ts` — registro manual do service worker
  (`setupPWAUpdate()`, chamado em `main.tsx`); checa atualização
  periodicamente e ao voltar o foco, e ativa/recarrega sozinho sem precisar
  de recarregamento manual (ver `regras-negocio.md`).
- `src/data/kana.ts` — kana (seion, dakuten/handakuten, yōon) com romaji e
  famílias para o seletor de treino.
- `src/data/seed/n5.ts` (+ `n5.json`) — deck de vocabulário N5 completo
  (~700 palavras, pt-BR), base de Aprender › Palavras novas; o import por
  categoria inteira fica em Config > Dados > "Vocabulário N5" > Avançado.
- `src/data/kanjivg/kana-strokes.json` / `kanji-strokes.json` — dados de
  traço (ordem/forma) do KanjiVG, gerados por `scripts/build-kana-strokes.mjs`
  / `scripts/build-kanji-strokes.mjs` (`npm run build:kana-strokes` /
  `build:kanji-strokes` para regenerar; lógica de busca/parse do SVG
  compartilhada em `scripts/lib/kanjivg.mjs`).
- `src/features/diga/` + `src/routes/Diga.tsx` — "Diga em japonês"
  (`/licoes/diga`): português → dizer a frase em japonês → conferir,
  usando o `diga` de cada lição + as `quiz.frases`; frases erradas podem
  virar cards.
- `src/data/quiz/` + `src/features/quiz/` + `src/routes/Quiz.tsx` — Quiz
  das lições ("Testar lições", `/licoes/quiz`), gerado do `quiz` de cada
  lição; `src/data/kakitori/` + `src/features/kakitori/` +
  `src/routes/Kakitori.tsx` — ditado (`/licoes/kakitori`), dos grupos
  `kakitori` das lições.
- `src/data/gramatica/` + `src/routes/Gramatica.tsx` — "Gramática em
  contexto" (`/licoes/gramatica`): frases novas com lacuna por ponto
  gramatical, na sessão do Quiz (tipo de pergunta `completar`).
- `src/data/diario/prompts.ts` + `src/features/diario/` +
  `src/routes/Diario.tsx` — diário guiado (`/licoes/diario`): propostas de
  escrita por lição com checklist de autoavaliação.
- `src/features/exercicios/` — histórico dos exercícios (`historico.ts`:
  `registrarResultados`, desempenho por item, acerto recente) e o conteúdo
  de cada item a partir do id (`conteudo.ts`). Quiz, Diga, ditado,
  gramática, escuta e shadowing gravam aqui.
- `src/features/licoes/` — progresso por lição (`progresso.ts`: aberta,
  concluída, trilha) e `TrilhaLicoes.tsx` (Lições e hub Aprender).
- `src/features/conquistas/` — conquistas (`conquistas.ts`: metas sobre os
  dados gravados), aviso de desbloqueio no Layout (`AvisoConquista.tsx`) e
  a lista do Progresso (`ConquistasLista.tsx`).
- `src/features/atividade/atividade.ts` — atividade por dia
  (`registrarAtividade`, chamado por cada módulo), meta diária e sequência
  de dias exibidas na Home e no Progresso.
- `src/features/pontos-fracos/pontosFracos.ts` + `src/routes/PontosFracos.tsx`
  — "Pontos fracos" (`/pontos-fracos`): o que mais erra em cards, kana,
  kanji e leitura, com treino em prática livre.
- `src/licoes/index.ts` — registro central das lições (`LICOES`): cada entrada
  tem `meta` (id, título, subtítulo, emoji, tags) e um `Component` React.
- `src/licoes/*.tsx` — uma lição por arquivo (ex.: `kosoado.tsx`,
  `particulas.tsx`, `familia.tsx`). Para adicionar uma lição, crie o arquivo e
  registre-o em `index.ts`.
- `src/components/Licao.tsx` — componentes de apresentação reutilizáveis pelas
  lições: `Section`, `Ex` (exemplo com japonês/romaji/tradução/nota), `Note`,
  `GrammarTable` e `ReadingKey` (legenda "kana ← descrição" usada na seção
  "Como ler esta lição" de cada lição).
- `src/features/metodo/estrutura.ts` — **estrutura do app pelo método**
  (Hoje · Aprender · Praticar [ler/ouvir/falar/escrever] · Revisar ·
  Progresso): seções, habilidades e atividades de cada hub, e
  `secaoDaRota()`. Fonte única da navegação e dos hubs (`Aprender.tsx`,
  `Praticar.tsx`, `Habilidade.tsx`, `Revisar.tsx`, `Progresso.tsx`). Ao criar
  uma ferramenta nova, decidir aqui em que objetivo(s) ela entra.
  `PlanoDoDia.tsx` é o plano do dia da Home (Revisar → Aprender →
  Praticar). `nivel.ts` dá os indicadores de "Seu nível nesta habilidade".
  `proximoPasso.ts` calcula o "Próximo passo" de cada hub (com
  `src/features/leitura/recomendacao.ts` e `src/features/kana/desempenho.ts`,
  também usados pela Home e pelo treino de kana).
- `src/routes/` — uma página por arquivo.
- `public/privacidade.html` — política de privacidade (página estática, fora
  do React, para abrir direto pela URL; é o link cadastrado na tela de
  consentimento OAuth do Google). URL em `src/lib/privacidade.ts`, linkada no
  rodapé, em Config › Sobre o App e no cartão do Google Drive. Se a
  sincronização passar a usar outro escopo ou dado do Google, atualize a
  página.
- `docs/manual-do-usuario.pdf` — manual do usuário, também oferecido no app
  (Configurações › Sobre o App), importado em `src/routes/Config.tsx` com
  `?url`: o build publica o PDF com hash no nome, então basta substituir o
  arquivo em `docs/` para o app entregar a versão nova (fora do pré-cache do
  PWA; guardado no cache `manual` na primeira abertura). A fonte fica em
  `docs/manual/` (HTML/CSS + prints; `node docs/manual/gerar.cjs` gera o
  PDF — ver `docs/manual/README.md`). Ao mudar uma tela ou um fluxo que o
  manual descreve, atualize o capítulo correspondente.

## Convenções

- TypeScript estrito; evite `any`.
- Componentes em PascalCase; um componente "de página" por arquivo em `routes/`.
- Estilização só com Tailwind + as classes utilitárias em `src/index.css`
  (`btn-primary`, `card-surface`, `card-hero`, `icon-tile`, `badge`,
  `segmented`/`segmented-item`, `field`, `label`, etc.). Cores pelos tokens
  (`indigo`, `hanko`, `paper`, `ink`, `sage`, `line`) — não cravar hex solto.
  Cores de apoio **por módulo** (`sora` flash cards, `matcha` leitura, `fuji`
  lições, `kin` kana, `sakura` pontos fracos; kanji usa `hanko`) só em
  pequenas áreas: ícones, `icon-tile` (fundo `/12`), `badge`, barras finas —
  nunca em fundos grandes. Visão completa em `docs/guia-visual.md`.
- Componentes visuais compartilhados: `PageHeader` (cabeçalho de página com
  ícone na cor do módulo, título, subtítulo e ações), `StatCard` (contador com ícone,
  selo de crescimento ou barra), `ProgressRing` (anel 0–1), `StudyCard`
  (card das sessões de estudo, efeito de pilha + etiqueta), em
  `src/components/` — e `ResultadoResumo` (anel de acerto das telas de
  resultado); cores de módulo prontas em `src/lib/cores.ts`; cores
  dos estágios de vocabulário em `STAGE_BADGE`/`STAGE_BAR`
  (`src/features/flashcards/stages.ts`), as mesmas na lista, no mapa e no
  Progresso. Filtros em pílula: classes `chip`/`chip-active`.
- Ícones: `lucide-react` (traço, mesmo estilo em todo o app); emoji só como
  identidade de cada lição. Fontes empacotadas via `@fontsource-variable`
  (Inter + Noto Sans JP, importadas em `src/main.tsx`) — nunca por CDN, pra
  funcionar offline.
  O modo escuro é resolvido nesses mesmos tokens (redefinidos sob `:root.dark`
  em `src/index.css`), não com variantes `dark:` espalhadas pelos componentes
  — então usar os tokens já garante suporte a claro/escuro de graça.
- Acesso a dados sempre via `db` (Dexie); em componentes, preferir `useLiveQuery`
  para reatividade.
- Comentários e textos de UI em português (pt-BR).
- Mantenha a base de cores e o tom calmo; o acento `hanko` (vermelho) é usado com
  parcimônia (ações de destaque/perigo).
- **Nas lições (`src/licoes/*.tsx`), o texto em japonês é sempre acompanhado de
  romaji.** O usuário ainda está aprendendo a ler kana. Frases de exemplo
  (`<Ex jp="..." romaji="..." pt="..." />`) nunca usam kanji — só hiragana/
  katakana, com o prop `romaji` trazendo a leitura. Kanji só aparece como
  referência opcional em algumas tabelas de vocabulário (família, pronomes,
  sufixos, cargos), via `<FuriganaWord kanji="..." reading="..." />`
  (`src/components/Furigana.tsx`) — a leitura em hiragana pequena em cima do
  kanji, não mais como coluna separada — e claramente explicado como "pode
  ignorar o kanji por enquanto" na seção "Como ler esta lição" de abertura de
  cada lição — nunca dentro de uma frase de exemplo. Se o
  usuário indicar que já avançou bastante nos estudos de kanji, essa regra
  pode ser revisada.
- Toda lição abre com uma seção **"Como ler esta lição"**, explicando o
  formato usado (normalmente via `ReadingKey`) e, quando relevante,
  pronúncias especiais de partículas/sons daquela lição.
- **Lições (`src/licoes/*.tsx`) são a fonte primária de aprendizado novo do
  app, não material de revisão.** Escreva como um professor de japonês que
  também conhece cultura japonesa, a vida real no Japão e as dificuldades
  específicas de um falante de português. Extensão é consequência de
  profundidade, nunca meta: antes de manter um parágrafo ou exemplo,
  verifique se cortá-lo faria o leitor perder informação nova. Cada seção
  abre explicando o quê, o porquê e o quando — não só a mecânica antes dos
  exemplos. Todo ponto central tem 3+ exemplos que diferem em uso, registro
  ou contexto (não só no vocabulário), sendo ao menos um em situação real;
  formas parecidas que o aluno vai confundir são contrastadas lado a lado;
  há pelo menos uma nota cultural amarrada ao tema e uma seção de erros
  comuns. Pesquisar fontes abertas é recomendado para **verificar**
  naturalidade, registro e uso real — nunca para compilar: nenhuma frase,
  tabela ou explicação é copiada ou traduzida de terceiros. Padrão
  completo, com critérios de profundidade, arquétipos de lição, romanização
  e checklist, em `docs/padrao-licoes.md` — consulte antes de criar ou
  expandir uma lição.

## Regras de negócio

Detalhadas em `regras-negocio.md` (SRS e estágios, kana, kanji, leitura,
lições, navegação pelo método, import/export). Consulte antes de
mexer na lógica de revisão ou de sincronização.
