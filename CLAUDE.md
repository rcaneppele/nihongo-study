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
- `src/features/srs/sm2.ts` — algoritmo SM-2 isolado (trocável por FSRS depois).
- `src/features/flashcards/` — importação CSV/JSON e sessão de revisão.
- `src/features/kana/strokes.ts` — captura/normalização de traços e
  `scoreDrawing()`: reconhecimento + pontuação de caligrafia contra o KanjiVG.
- `src/components/KanaCanvas.tsx` — canvas de desenho (pointer events).
- `src/data/kana.ts` — kana (seion, dakuten/handakuten, yōon) com romaji e
  famílias para o seletor de treino.
- `src/data/kanjivg/kana-strokes.json` — dados de traço (ordem/forma) do
  KanjiVG, gerado por `scripts/build-kana-strokes.mjs`
  (`npm run build:kana-strokes` para regenerar).
- `src/licoes/index.ts` — registro central das lições (`LICOES`): cada entrada
  tem `meta` (id, título, subtítulo, emoji, tags) e um `Component` React.
- `src/licoes/*.tsx` — uma lição por arquivo (ex.: `kosoado.tsx`,
  `particulas.tsx`, `familia.tsx`). Para adicionar uma lição, crie o arquivo e
  registre-o em `index.ts`.
- `src/components/Licao.tsx` — componentes de apresentação reutilizáveis pelas
  lições: `Section`, `Ex` (exemplo com japonês/tradução/nota), `Note` e
  `GrammarTable`.
- `src/routes/` — uma página por arquivo.

## Convenções

- TypeScript estrito; evite `any`.
- Componentes em PascalCase; um componente "de página" por arquivo em `routes/`.
- Estilização só com Tailwind + as classes utilitárias em `src/index.css`
  (`btn-primary`, `card-surface`, `field`, `label`, etc.). Cores pelos tokens
  (`indigo`, `hanko`, `paper`, `ink`, `sage`, `line`) — não cravar hex solto.
- Acesso a dados sempre via `db` (Dexie); em componentes, preferir `useLiveQuery`
  para reatividade.
- Comentários e textos de UI em português (pt-BR).
- Mantenha a base de cores e o tom calmo; o acento `hanko` (vermelho) é usado com
  parcimônia (ações de destaque/perigo).
- **Nas lições (`src/licoes/*.tsx`), todo texto em japonês é escrito só em kana
  (hiragana/katakana), sem kanji.** O usuário ainda não estudou kanji. Por isso
  o componente `Ex` não tem prop de leitura separada — o próprio `jp` já é a
  forma legível. Ao revisar essa regra no futuro, se o usuário indicar que já
  começou a estudar kanji, ela deixa de valer.

## Próximas tarefas (sugestão de ordem)

1. Animação da ordem de traço correta no `KanaCanvas` (hoje a referência só
   aparece como figura estática após "Verificar", em `KanaReferenceFigure`
   em `src/routes/Kana.tsx`).
2. Deck N5 completo em `src/data/seed/` + importação com um clique.
3. Estatísticas de progresso (usar a tabela `reviews`).
4. Migrações de schema no import quando `schemaVersion` mudar.

## Regras de negócio

Detalhadas em `regras-negocio.md` (SRS, kana, import/export). Consulte antes de
mexer na lógica de revisão ou de sincronização.
