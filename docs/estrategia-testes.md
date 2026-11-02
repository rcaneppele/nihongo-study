# Estratégia de testes

Como o app é testado, por quê, e o que falta. Documento vivo: ao concluir uma
fase, marque-a aqui; ao criar um tipo de teste novo, descreva-o na seção
correspondente. As regras do dia a dia (o que todo código novo precisa ter)
ficam resumidas no `CLAUDE.md` e detalhadas em `docs/boas-praticas.md`.

## Objetivo

Garantir que nenhuma mudança quebre o que já funciona — em especial o que
**perde dados do usuário** se quebrar (repetição espaçada, backup, migrações,
sincronização). Não é um produto com prazo: a bateria completa pode ser lenta
(dezenas de minutos), desde que seja confiável. A bateria rápida (Node) roda
em segundos e é a que se usa enquanto se programa.

## Diagnóstico inicial (novembro/2026, v2.8.0)

- 4 arquivos de teste, 25 testes, só em Node: mesclagem/backup
  (`src/db/merge.test.ts`), CSV, textos de leitura, gramática em contexto.
- CI só fazia `npm run build` — teste ou lint quebrado ia para produção.
- Sem teste: FSRS/estágios/fila de revisão, revisar/desfazer, migrações de
  backup por versão, motor de sync (área com mais commits de ajuste),
  meta/sequência de dias, nota de caligrafia, geradores de exercícios,
  próximo passo, pontos fracos, conquistas, integridade dos dados de
  lições/kanji/N5, qualquer tela, PWA/offline.
- Obstáculos: lógica de negócio dentro de componentes (`StudySession`,
  `routes/Kana.tsx`), motor de sync criando o destino Google Drive por conta
  própria, `Date.now()`/`Math.random()` espalhados.

## Camadas

| # | Camada | Ferramenta | Arquivos | Garante |
|---|---|---|---|---|
| 1 | Estática | `tsc -b` + ESLint | — | tipos, regras de hooks |
| 2 | Unitários e propriedades | Vitest (Node) + fast-check | `src/**/*.test.ts` | lógica pura |
| 3 | Integridade de conteúdo | Vitest (Node) | `src/data/**/*.test.ts`, `src/licoes/*.test.tsx` | dados das lições, kanji, N5, leitura, exercícios |
| 4 | Integração com o banco | Vitest + `fake-indexeddb` | `src/**/*.test.ts` | serviços que gravam no Dexie, migrações, sync com dois "aparelhos" |
| 5 | Componentes | Vitest Browser Mode (Chromium real) | `src/**/*.browser.test.tsx` | componentes compartilhados com canvas, pointer events, IndexedDB real |
| 6 | Ponta a ponta | Playwright Test sobre o build de produção | `e2e/**/*.spec.ts` | jornadas completas, PWA offline, backup entre aparelhos, sync com Drive simulado, visual, acessibilidade |
| 7 | Qualidade dos testes | cobertura (`@vitest/coverage-v8`) + Stryker (mutação) | `stryker.config.json` | que os testes de fato pegam bugs |

### Por que essas ferramentas

- **Vitest** já é o runner do projeto e usa a mesma configuração do Vite.
- **fast-check** (testes de propriedade): a mesclagem promete ser idempotente,
  comutativa e associativa — isso se verifica com milhares de entradas
  aleatórias, não com 3 exemplos. Idem para invariantes da fila de revisão.
- **Browser Mode** em vez de jsdom: o app depende de canvas, pointer events,
  Web Speech, `<ruby>` e IndexedDB; simular tudo isso no jsdom deixaria o
  teste longe do real.
- **Playwright Test** para E2E: `context.setOffline()` (PWA offline),
  `page.clock` (pular dias: FSRS, sequência, lembrete de backup),
  `page.route()` (API do Google Drive falsa), dois contextos = dois
  aparelhos, Chromium/Firefox/WebKit e viewports de celular,
  `toHaveScreenshot` e `@axe-core/playwright`.
- **Stryker** muda o código de propósito (troca `<` por `<=`, apaga uma
  linha) e confere se algum teste falha. Só roda em Node — mais um motivo
  para a lógica ficar fora dos componentes.

## Como rodar

| Comando | O quê | Quando |
|---|---|---|
| `npm test` | camadas 2–4 (Node, ~7 s) | o tempo todo enquanto programa |
| `npm run test:watch` | idem, em modo watch | idem |
| `npm run test:browser` | camada 5 (componentes no Chromium) | ao mexer em componente |
| `npm run test:e2e` | camada 6 (faz o build antes; ~3 min em 3 navegadores) | antes de commitar |
| `E2E_NAVEGADORES=chromium npm run test:e2e` | E2E num navegador só | iterando numa jornada |
| `npm run test:visual` | screenshots (projeto `visual`) | ao mexer em layout |
| `npm run test:visual:atualizar` | regera as imagens de referência | mudança visual intencional (revise o diff das imagens) |
| `npm run coverage` | cobertura de Node com limites mínimos | ao fechar uma funcionalidade |
| `npm run test:mutation` | Stryker no núcleo (incremental; relatório em `reports/mutation/`) | de vez em quando / ao mexer no núcleo |
| `npm run test:all` | lint + tipos + Node + browser + E2E | antes de push; é o que a CI roda |

### Onde cada camada roda

O repositório é público: o GitHub Actions não tem cota de minutos nos
runners padrão. O limite que importa é o tempo até o deploy e não deixar
teste dependente da máquina travar a publicação.

| Camada | Tempo aprox. | Branch de trabalho | `main` (antes do deploy) e PR | Local (`npm run test:all`) |
|---|---|---|---|---|
| Lint, tipos, Node + cobertura | ~1 min | ✅ | ✅ | ✅ |
| Componentes (Chromium) | ~1 min | ✅ | ✅ | ✅ |
| E2E Chromium + PWA offline | ~3 min | ✅ | ✅ | ✅ |
| E2E celular, Firefox, WebKit | ~3–4 min cada, em paralelo | — | ✅ | ✅ |
| Regressão visual | ~35 s | — | — | `npm run test:visual` |
| Mutação (Stryker) | ~35 min | — | — | `npm run test:mutation` |

- Os jobs rodam em paralelo: o deploy espera uns 5 minutos.
- Um push novo na mesma branch cancela a rodada anterior.
- Cada job tem tempo-limite (15–30 min), e os navegadores do Playwright
  ficam em cache.
- Falhou no Actions: o relatório do Playwright (traces, screenshots) fica
  nos artefatos do job por 14 dias; a cobertura, sempre.
- Visual e mutação ficam só locais porque as imagens dependem das fontes e
  da renderização da máquina, e porque a mutação é lenta e não deve travar
  deploy. Rode antes de mudanças grandes de layout ou no núcleo.

## Convenções de escrita

- Teste descreve **comportamento**, em pt-BR, como regra de negócio
  (`'card sobe para "Sei dizer" ao atingir 7 dias'`), não implementação.
- Tempo controlado: lógica recebe `now` por parâmetro; onde não dá, o teste
  usa `vi.useFakeTimers()`/`vi.setSystemTime()` (Node) ou `page.clock`
  (E2E). Nunca depender do relógio real.
- Aleatoriedade controlada: funções que embaralham recebem um `rng`
  opcional (`src/lib/aleatorio.ts`).
- Banco: testes de integração importam `fake-indexeddb/auto` e limpam as
  tabelas no `beforeEach` (helper `limparBanco()` em `src/test/banco.ts`).
- Fábricas de dados de teste em `src/test/fabricas.ts` (`umCard()`,
  `umBackup()`...) — não repetir objetos literais grandes em cada teste.
- Telas: buscar por papel e texto acessível (`getByRole('button', { name:
  'Lembrei' })`), não por classe CSS; `data-testid` só quando não houver
  alternativa acessível.
- Fixtures de backup congeladas em `src/db/__fixtures__/backup-vN.json`:
  **nunca editar** uma fixture existente; toda mudança de schema adiciona a
  sua.
- E2E prepara estado importando um backup de `e2e/fixtures/` pelo próprio
  fluxo do app (helper `prepararDados()`), não escrevendo no IndexedDB por
  fora.

## Fases

- [x] **Fase 0 — proteger o deploy**: `ci.yml` com lint + tipos + testes;
  deploy depende dele; scripts `test:*`.
- [x] **Fase 1 — testabilidade**: extrair lógica dos componentes para
  módulos (revisão de flash card/kanji, pool de kana), destino de sync
  injetável, `rng` injetável; refactor geral de boas práticas
  (`docs/boas-praticas.md`).
- [x] **Fase 2 — núcleo em Node**: FSRS e estágios, fila de revisão
  (propriedades), revisar/desfazer, migrações por fixture, motor de sync
  com Drive em memória, atividade/sequência com relógio fixo, nota de
  caligrafia contra o próprio KanjiVG, geradores, próximo passo, pontos
  fracos, conquistas, conhecimento de palavras.
- [x] **Fase 3 — integridade de conteúdo**: lições (exemplos sem kanji, com
  romaji, "Como ler esta lição"), kanji, N5, kana, quiz/diga/kakitori,
  diário, estrutura do método.
- [x] **Fase 4 — E2E**: fumaça de todas as rotas, jornadas de cada módulo,
  backup entre dois contextos, sync com Drive falso, PWA offline, visual e
  acessibilidade, em Chromium/Firefox/WebKit + celular.
- [x] **Fase 5 — componentes no Browser Mode**: `KanaCanvas`,
  `GradeButtons`, `Furigana`, `StudyCard`, `ReadAloudBar`, `SyncCard`,
  `SaveWordForm`, `VocabularyMap`.
- [x] **Fase 6 — medir e manter**: limites de cobertura por pasta (sobem,
  nunca descem), Stryker com meta ≥ 80% no núcleo.

## Linha de base da mutação (novembro/2026)

Stryker no núcleo: **70,8%** de mutações mortas (78,6% do código coberto);
o mínimo configurado (`thresholds.break`) é 70 — suba junto quando o
número subir. Por arquivo: `fsrs.ts` 92, `cards.ts` 89, `revisao.ts` 87,
`treino.ts` 86, `merge.ts` 83, `migracoes.ts` 82, `contadores.ts` 81,
`stages.ts` 79 (o resto são rótulos/cores), `backup.ts` 75,
`mesclarNoBanco.ts` 72, `atividade.ts` 72, `strokes.ts` 69,
`motor.ts` 47 (os gatilhos — foco, online, saída, hooks do banco — não têm
teste: próximo alvo).

## Pendências

- **Contraste de cor (WCAG AA):** o texto secundário `sage` (#7c8a7e) tem
  contraste 3,3–3,6 sobre o papel claro (mínimo 4,5); `kin` como texto
  também fica abaixo. Corrigir = escurecer os tokens (decisão de design).
  Até lá, `e2e/jornadas/acessibilidade.spec.ts` desliga só a regra
  `color-contrast`.
- **WebKit local:** precisa de `sudo npx playwright install-deps webkit`
  (na CI já roda).
- **Browser Mode no Vitest 3.2** ainda é experimental (estável no Vitest
  4, que pede Vite 6+): ao atualizar Vite/vite-plugin-pwa, subir junto.
- **Gatilhos do motor de sync** (`iniciarSync`: foco, online, saída,
  alteração no banco com atraso) sem teste — dá pra cobrir em Node com
  `vi.useFakeTimers()` e eventos de `document`/`window` simulados, ou num
  E2E com a API do Drive falsa via `page.route()`.
- **Cobertura de telas**: as `.tsx` de páginas são cobertas pelo E2E, que
  não entra no relatório de cobertura — o número geral (~31%) reflete só
  Node. Os limites valem para a lógica (`src/db`, `src/features/**/*.ts`).
