# Boas práticas de código

Regras de design deste projeto — valem para todo código novo e para todo
código existente que for tocado. Complementa o `CLAUDE.md` (convenções de
estilo, UI e conteúdo) e o `docs/estrategia-testes.md` (como testar). O
objetivo é código **simples, coeso, desacoplado e testável** — sem
cerimônia: nada de classes, containers de injeção ou camadas que não pagam o
próprio peso. Funções e módulos bastam.

## 1. Camadas e direção das dependências

```
src/data/          conteúdo estático (lições, kanji, N5, textos) — puro, sem banco nem React
src/lib/           utilitários genéricos (aleatório, datas, conjuntos, hooks de UI) — sem domínio
src/db/            infraestrutura de dados: schema Dexie, backup, mesclagem, migrações
src/features/<m>/  domínio de cada módulo:
   *.ts              regras puras + serviços (funções que leem/gravam no db) + hooks de consulta
   *.tsx             componentes do módulo
src/components/    componentes visuais compartilhados, sem regra de negócio
src/routes/        páginas: compõem componentes e chamam serviços — finas
```

- A dependência aponta para dentro: `routes` → `features` → `db`/`data`/`lib`.
  `data` e `lib` não importam de `features`, `db` não importa de `routes`.
- **Componente não grava no banco.** `db.<tabela>.put/add/update/delete/
  clear/bulk*` só aparece em `src/db/` e nos serviços de `features/<m>/*.ts`.
  O componente chama uma função com nome de regra de negócio
  (`registrarRevisao`, `aprenderKanji`, `apagarTudo`).
- Ler no componente com `useLiveQuery(() => db.x.toArray())` é aceitável
  para consulta simples; consulta com regra (filtro, junção, cálculo) vira
  função ou hook no módulo (`useResumoDia`, `getDueKanji`).

## 2. Núcleo puro, casca fina

- Separe **decidir** de **fazer**: a regra é uma função pura que recebe dados
  e devolve o resultado (`calcularRevisao(card, direcao, nota, now)`); o
  serviço só lê, chama a regra e grava (`registrarRevisao`). A regra pura é
  testada com exemplos e propriedades; o serviço, com `fake-indexeddb`.
- **Tempo e acaso são parâmetros.** Função que depende do momento recebe
  `now: number` (padrão `Date.now()` só na borda). Função que embaralha ou
  sorteia recebe `rng` (padrão `Math.random`) — use `embaralhar`/`sortear`
  de `src/lib/aleatorio.ts`, nunca `sort(() => Math.random() - 0.5)`
  (enviesado).
- Nada de efeito colateral escondido em função com nome de cálculo.

## 3. Responsabilidade única e tamanho

- Um módulo, um motivo para mudar. Sinais para dividir: arquivo de tela
  passando de ~300 linhas, componente com várias telas (`stage === ...`)
  inteiras dentro, funções utilitárias no fim de um arquivo de página.
- Telas de várias etapas: o componente de página só guarda a etapa
  (união discriminada, ex.: `Etapa` em `Revisar.tsx`) e cada etapa é um
  componente próprio em `features/<m>/`.
- Função longa com comentários "passo 1, passo 2" costuma ser várias
  funções.

## 4. Uma fonte de verdade (DRY com critério)

- Fato que aparece em mais de um lugar ganha um dono: a lista das tabelas
  sincronizadas (`TABELAS_SINCRONIZADAS`), a estrutura do método
  (`estrutura.ts`), o registro de lições (`LICOES`), a criação de um card
  novo (`novoCard`). Adicionar uma tabela, lição ou campo deve exigir mexer
  em **um** lugar (mais o teste).
- Regra de três: na terceira cópia de um trecho, extraia. Duas cópias
  parecidas por acaso (que mudariam por motivos diferentes) podem ficar.
- Utilitário genérico vai para `src/lib/`; componente visual repetido vai
  para `src/components/`.

## 5. Desacoplar do que é externo

- Serviços externos e APIs do navegador difíceis de testar (Google Drive,
  OAuth, `confirm`, Web Speech, `navigator.share`) ficam atrás de uma
  interface pequena com um adaptador padrão — como `DestinoSync`
  (`src/features/sync/destino.ts`). O código de domínio depende da
  interface; o teste passa uma implementação em memória.
- Diálogos (`confirm`) não são chamados de dentro de regra de decisão: a
  regra devolve "precisa perguntar" e quem chama pergunta.

## 6. Tipos e erros

- TypeScript estrito, sem `any`; prefira tipos derivados (`Pick`,
  `satisfies`, `as const`) a duplicar formato.
- Estados com formas diferentes são união discriminada (`{ tipo: 'cards';
  ... } | { tipo: 'kanji'; ... }`), não vários booleanos.
- Evite `!` (non-null assertion) quando um `if` deixa o fluxo explícito.
- Serviço sinaliza falha com `throw new Error('mensagem em pt-BR para o
  usuário')`; a tela decide como mostrar. Não engula erro em silêncio.

## 7. Padrões já usados — reaproveite

| Padrão | Onde | Para quê |
|---|---|---|
| Adapter | `src/features/srs/fsrs.ts` | isola a biblioteca `ts-fsrs` (trocável) |
| Strategy | `DestinoSync`; `mesclar*` por tabela em `merge.ts` | trocar destino de sync / regra de mesclagem sem mexer no motor |
| Registry | `LICOES`, `estrutura.ts`, `TABELAS_SINCRONIZADAS` | uma lista central consultada por várias telas |
| Factory | `novoCard`, `freshSrs` | criar registros sempre completos e iguais |
| Observer | status do motor de sync + `useSyncExternalStore`; `useLiveQuery` | tela reage a mudanças sem polling |
| Serviço de domínio | `registrarAtividade`, `registrarRevisao`, `apagar` | gravação com todas as regras (carimbos, lápides, contadores) num lugar só |

## 8. Nomes e comentários

- Domínio em pt-BR (`registrarRevisao`, `sequenciaDeDias`); nomes antigos em
  inglês ficam como estão — não renomeie só por renomear.
- Comentário explica o **porquê** (a regra, o bug evitado), não o quê.
  Mantenha a densidade dos comentários do código ao redor.

## 9. Checklist de código novo

- [ ] Regra de negócio em função pura, com `now`/`rng` como parâmetro.
- [ ] Gravação no banco num serviço do módulo, nunca no componente.
- [ ] Nada duplicado de algo que já existe (`src/lib/`, `src/components/`,
      serviços do módulo).
- [ ] Dependência externa atrás de interface, com adaptador padrão.
- [ ] Testes de cada camada pertinente (`docs/estrategia-testes.md`): regra
      → unitário; serviço → integração; tela/fluxo → E2E da jornada; dado
      novo → teste de integridade; schema novo → fixture de backup.
- [ ] `npm run test:all` verde.
