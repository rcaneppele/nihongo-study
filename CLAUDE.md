# CLAUDE.md

Contexto e convenções deste projeto para uso com o Claude Code. Leia antes de
implementar mudanças.

## O que é

App pessoal de estudo de japonês para um único usuário, uso doméstico, sem fins
comerciais. Três funcionalidades centrais: flash cards com repetição espaçada,
treino de hiragana/katakana (modo digitar romaji e modo desenhar com feedback de
caligrafia) e lições de estudo (conteúdo estático de gramática e vocabulário).

## Princípios de arquitetura (não quebrar sem combinar)

- **Sem backend.** Tudo roda no navegador. Não introduza servidor, API remota
  nem banco externo.
- **Offline-first / PWA.** Deve funcionar instalado e sem internet.
- **Dados locais por dispositivo** no IndexedDB (via Dexie). Cada aparelho é
  independente.
- **Sincronização é manual**, via exportar/importar JSON (`src/db/backup.ts`).
  Esse arquivo também é o backup do usuário.
- **Chaves primárias são UUID** (`newId()` em `src/db/schema.ts`), nunca
  auto-incremento — isso é o que torna a mesclagem entre dispositivos possível.

## Stack e comandos

- Vite + React + TypeScript + Tailwind + Dexie + vite-plugin-pwa.
- `npm run dev` (desenvolvimento), `npm run build` (produção), `npm run lint`.

## Mapa do código

- `src/db/schema.ts` — tabelas Dexie: `cards`, `reviews`, `kanaProgress`, `meta`.
- `src/db/backup.ts` — exportar/importar; modos `replace` e `merge`.
- `src/features/srs/fsrs.ts` — algoritmo FSRS isolado (wrapper do pacote
  `ts-fsrs`; sucessor do SM-2, migrado em schemaVersion 2 — ver
  `regras-negocio.md`).
- `src/features/flashcards/importCards.ts` — importação de cards via CSV,
  JSON ou texto exportado do Anki ("Notas em Texto Simples"/"Cartões em
  Texto Simples"); `parseCardsFile()` detecta o formato pelo nome do
  arquivo/conteúdo.
- `src/features/flashcards/StudySession.tsx` — sessão de revisão/prática.
- `src/features/flashcards/ProgressStats.tsx` — estatísticas de progresso
  (aba "Progresso" em `/flashcards`), calculadas de `db.cards`/`db.reviews`.
- `src/features/kana/strokes.ts` — captura/normalização de traços e
  `scoreDrawing()`: reconhecimento + pontuação de caligrafia contra o KanjiVG.
- `src/components/KanaCanvas.tsx` — canvas de desenho (pointer events).
- `src/lib/useHoldToPauseAdvance.ts` — hook do auto-avanço cronometrado do
  treino de kana (barra de progresso; segurar a tela pausa a contagem).
- `src/lib/useTheme.tsx` — `ThemeProvider`/`useTheme`: tema claro/escuro/
  sistema, persistido em `db.meta` (entra no backup) e cacheado em
  `localStorage` só para aplicar antes do primeiro paint.
- `src/data/kana.ts` — kana (seion, dakuten/handakuten, yōon) com romaji e
  famílias para o seletor de treino.
- `src/data/seed/n5.ts` (+ `n5.json`) — deck de vocabulário N5 completo
  (~700 palavras, pt-BR), importável por categoria em Config > Dados >
  "Vocabulário N5".
- `src/data/kanjivg/kana-strokes.json` — dados de traço (ordem/forma) do
  KanjiVG, gerado por `scripts/build-kana-strokes.mjs`
  (`npm run build:kana-strokes` para regenerar).
- `src/licoes/index.ts` — registro central das lições (`LICOES`): cada entrada
  tem `meta` (id, título, subtítulo, emoji, tags) e um `Component` React.
- `src/licoes/*.tsx` — uma lição por arquivo (ex.: `kosoado.tsx`,
  `particulas.tsx`, `familia.tsx`). Para adicionar uma lição, crie o arquivo e
  registre-o em `index.ts`.
- `src/components/Licao.tsx` — componentes de apresentação reutilizáveis pelas
  lições: `Section`, `Ex` (exemplo com japonês/romaji/tradução/nota), `Note`,
  `GrammarTable` e `ReadingKey` (legenda "kana ← descrição" usada na seção
  "Como ler esta lição" de cada lição).
- `src/routes/` — uma página por arquivo.

## Convenções

- TypeScript estrito; evite `any`.
- Componentes em PascalCase; um componente "de página" por arquivo em `routes/`.
- Estilização só com Tailwind + as classes utilitárias em `src/index.css`
  (`btn-primary`, `card-surface`, `field`, `label`, etc.). Cores pelos tokens
  (`indigo`, `hanko`, `paper`, `ink`, `sage`, `line`) — não cravar hex solto.
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
  coluna de referência opcional em algumas tabelas de vocabulário (família,
  pronomes, sufixos, cargos), sempre ao lado do hiragana e claramente
  explicado como "pode ignorar por enquanto" na seção "Como ler esta lição"
  de abertura de cada lição — nunca dentro de uma frase de exemplo. Se o
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

Detalhadas em `regras-negocio.md` (SRS, kana, import/export). Consulte antes de
mexer na lógica de revisão ou de sincronização.
