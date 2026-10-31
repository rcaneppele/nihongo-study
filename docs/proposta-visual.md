# Proposta de visual, UI e UX

Outubro/2026. Objetivo: deixar o app mais impactante visualmente — componentes
mais ricos, cor com função, ícones, badges — **sem perder o tom calmo e
minimalista** que é premissa do `CLAUDE.md`. Referências analisadas: dois
templates de dashboard (Cruip *Mosaic* e *Artifact*) e um shot de app de
agendamento (Dribbble, "Movexa"). Nenhum é de estudo de idiomas; o que
interessa neles são os **padrões de componente**, não o conteúdo.

> **Status: implementada (5 fases, out/2026).** Este documento fica como
> registro das decisões visuais e é a referência citada pelo `CLAUDE.md`.
> Depois dela, a reorganização pelo método (`proposta-reorganizacao.md`)
> mudou a Home: a "Sugestão para agora", os contadores e o "Continuar
> estudando" da §4 deram lugar ao Plano do dia, e os contadores foram
> para o Progresso. Os mockups usados durante a proposta foram removidos.

---

## 1. Diagnóstico do visual atual

O que funciona e deve ficar:
- A identidade: papel, tinta índigo, vermelho de carimbo (`hanko`) usado com
  parcimônia, modo escuro resolvido nos tokens.
- Hierarquia limpa, sem ruído; textos bons; `card-surface` consistente.

O que mais pesa contra:

1. **A fonte de títulos não carrega.** O Tailwind declara `font-display:
   "Shippori Mincho"`, mas o `index.html` só baixa Inter e Noto Sans JP — todo
   título e número grande (`Flash cards`, `0/208`, `Aprender palavras novas`)
   cai numa serifada genérica do sistema (tipo Times). É o detalhe que mais
   "envelhece" a interface hoje.
2. **Fontes vêm do Google por CDN** e não estão no cache do service worker:
   offline (ou no primeiro uso sem rede) o app troca de fonte. Fere o
   offline-first.
3. **Jumbotron em toda página**: o logo grande + subtítulo ocupam ~310px no
   desktop e ~250px no celular antes de qualquer conteúdo, em todas as telas.
4. **Tudo tem o mesmo peso**: contadores, atalhos e cards são caixas iguais
   (borda + fundo quase transparente), sem ícone nem cor. Nada guia o olho —
   o "Para revisar hoje" em vermelho é o único ponto de cor.
5. **Ícones misturados**: SVGs de traço na navegação, emojis coloridos nas
   lições e nos atalhos de prática (📝🎧🗣️), kana como ícone. Cada um num
   estilo.
6. **Números soltos**: estatísticas sem contexto visual (nenhuma barra,
   anel, variação ou tendência), apesar de o app já ter os dados.

---

## 2. O que aproveitar das referências

| Padrão | Onde aparece | Como traduzir pro app |
|---|---|---|
| Card de KPI com **ícone em tile colorido**, número grande e **badge de variação** (`↗ 18%`) | Artifact, Mosaic | Contadores da Home e do Progresso: "412 palavras compreendidas · ↗ +24 esta semana" |
| **Faixa de dias** em pílulas, dia atual escuro, ponto nos dias com atividade | Movexa | Bloco "Hoje": semana de estudo + sequência — é o heatmap traduzido pra 7 dias |
| **Chips de resumo** (6 Booked · 2 Completed · 0 Cancelled) | Movexa | "10 revisões · 2 novas · 2 práticas" no bloco Hoje |
| Blocos **pastel com barra lateral de cor** por categoria | Movexa | Linha sendo lida na leitura; itens por estado (Nova/Reconheço/Sei dizer/Domino) |
| Card de "assistente" com **ícone de destaque** e **botão escuro em pílula** | Movexa | "Sugestão para agora" |
| **Controle segmentado** em pílula (7D · 30D · 12M) | Artifact, Movexa | Abas de Flash cards, modo/velocidade da leitura, tema, 2/4 botões |
| Grupos da navegação com rótulo pequeno em caixa alta; item ativo em fundo suave | Artifact | Já feito no agrupamento; trocar o ativo de "índigo sólido" para "índigo suave" |
| Cantos bem arredondados (`rounded-2xl/3xl`), **sombra difusa** em vez de borda forte, fundo neutro quente | Movexa | Fundamento geral (seção 3) |
| "Ver todos →" no canto do card; cabeçalho de página com ações à direita | Artifact, Mosaic | Seções de listas (leitura, pontos fracos, cards) |

O que **não** trazer: gráficos de área/linha elaborados (dashboard financeiro
não é o caso), avatares, cores saturadas em grandes áreas, gradientes,
vidro/blur, sidebar escura.

---

## 3. Fundamentos (mudanças de base)

### 3.1 Tipografia
> **Feito na fase 1**, com um ajuste: fontes **variáveis**
> (`@fontsource-variable/inter` e `noto-sans-jp`) — um arquivo por fatia
> cobre todos os pesos, o que deixou o CSS em ~39KB comprimido (com fontes
> estáticas e a Shippori Mincho passava de 160KB). A Shippori Mincho ficou de
> fora por isso; volta só se o japonês de destaque pedir.

- **Hospedar as fontes no próprio app** (pacotes `@fontsource/*`, só os pesos
  usados) — some a dependência do Google e funciona offline.
- **Títulos e números em Inter semibold** (`tracking-tight`), não serifada:
  é o que dá o ar moderno das referências e combina com o corpo.
- **Shippori Mincho só para japonês de destaque** (こんにちは da Home, kanji/
  kana grandes no estudo, títulos de textos de leitura) — vira um toque
  cultural pontual, não a fonte de todo título.

### 3.2 Superfícies, raio e sombra
- Cards em `surface` **opaco** (hoje é 60% transparente) sobre o `paper`, com
  **sombra difusa** (`0 1px 2px …, 0 8px 24px -12px …`) e borda bem clara —
  separa melhor sem ficar "caixa desenhada".
- Raios: `rounded-2xl` para cards comuns, `rounded-3xl` para blocos de
  destaque (Hoje, Sugestão), `rounded-full` para botões primários e chips.
- Novas classes em `src/index.css`: `card` (padrão), `card-hero`,
  `icon-tile`, `badge`, `segmented`.

### 3.3 Cor com função — uma cor por módulo
Hoje só existem índigo/hanko/sage. Proposta: **5 tons suaves de apoio**, cada
um "dono" de um módulo, usados **só em ícones, tiles de ícone (fundo a ~12%),
badges e barras finas** — nunca em fundos grandes:

| Token | Tom | Módulo / uso |
|---|---|---|
| `sora` (céu) | azul | Flash cards, revisões |
| `matcha` | verde | Leitura, "compreendida", meta batida |
| `fuji` | violeta | Lições |
| `kin` (ouro) | âmbar | Kana, práticas |
| `sakura` | rosa | Pontos fracos |
| `hanko` (já existe) | vermelho | Kanji (o carimbo), pendências, sequência |

Todos definidos em claro **e** escuro em `:root` / `:root.dark`, como os
tokens atuais — continua valendo "usar token = modo escuro de graça". Os
nomes japoneses mantêm a identidade do projeto.

### 3.4 Ícones
- Adotar **um** conjunto de ícones de traço (`lucide-react` — tree-shaken,
  offline, mesmo estilo dos SVGs atuais da navegação) para navegação,
  atalhos, contadores, ações e estados vazios.
- Emojis ficam **só** como identidade de cada lição, mas dentro de um tile de
  fundo suave — normaliza tamanho e peso.
- Kana/kanji como ícone (あ, 字) continuam, coloridos pelo módulo — é a
  marca do app.

### 3.5 Layout geral
- **Trocar o jumbotron por um cabeçalho compacto**: logo pequeno + nome +
  versão no topo da barra lateral (desktop) e numa barra fina no celular. O
  logo grande pode ficar só na tela "Sobre".
- **Cabeçalho de página padrão** (componente `PageHeader`): título,
  subtítulo e ações à direita — hoje cada tela faz o seu.
- Item ativo da navegação em índigo **suave** (`bg-indigo/8 text-indigo`) em
  vez de sólido; contador de revisões pendentes como badge ao lado de "Flash
  cards".

---

## 4. Componentes por tela

### Home (mockup pronto)
1. Saudação com data ("Quinta-feira, 30 de outubro · こんにちは").
2. **Bloco Hoje** (`rounded-3xl`): anel de progresso da meta (14 de 20),
   chips do dia, **faixa da semana** com dias estudados e badge "🔥 5 dias
   seguidos" — junta meta + sequência + heatmap curto num só lugar.
3. **Sugestão para agora**: tile de ícone em `hanko`, título, porquê, botão
   escuro em pílula + "ou …".
4. **4 contadores** com tile de ícone colorido, número, e badge de variação
   da semana (palavras) ou barra de progresso (kana, kanji).
5. **"Continuar estudando"**: atalhos com tile de ícone do módulo, badge de
   pendência ("12 hoje") e seta.

Dados novos necessários: só a variação semanal (dá pra derivar de
`activity`/`reviews` e de `wordKnowledge.updatedAt`).

### Flash cards
- Abas em **controle segmentado**.
- Card de estudo com efeito de **pilha** (1–2 cartas atrás, deslocadas) e
  **badge de direção** colorido ("Reconhecer" em `sora` / "Dizer em japonês"
  em `matcha`).
- Botões de nota com cor semântica suave ("Não lembrei" contorno `hanko`
  claro; "Lembrei" sólido).
- Lista de cards: estágio como **badge colorido** (Nova cinza · Reconheço
  `sora` claro · Sei dizer `sora` sólido · Domino `matcha`), categoria em
  chip neutro.
- Progresso: contadores com ícone; barra de estágios com as cores acima;
  heatmap na escala de `matcha`.

### Mapa de vocabulário
- Mesmas cores de estágio da lista (consistência).
- Card de resumo com **anel** de % conhecido em vez do número solto.

### Leitura
- Lista: card do texto com **badge de nível** (N1/N2 em `matcha`), barra fina
  de **% conhecido** (verde ≥ 90%, âmbar 70–89%, cinza abaixo) e selo "Lido
  2×".
- Texto: linha sendo lida/selecionada como **bloco com barra lateral**
  (`border-l-4 border-matcha bg-matcha/8`), no estilo dos eventos do Movexa.
- Barra de áudio em segmentados + botão em pílula; no celular, o cartão da
  palavra tocada vira **folha fixa no rodapé** (não precisa rolar até o topo).

### Lições
- Grade: emoji num **tile suave**, tags com cor por tipo (gramática `fuji`,
  conversa `matcha`, vocabulário `kin`, cultura `sakura`, escrita `sora`).
- Cards de prática (Quiz, Kakitori, Diga em japonês) com ícones do conjunto
  (não emoji) e cor `fuji`.
- Dentro da lição: `Note` e `Ex` com fundo suave do módulo e ícone (💡 vira
  ícone de lâmpada), `GrammarTable` com cabeçalho tingido.

### Kana, Kanji, Pontos fracos, Config
- Kana/Kanji: tiles de caractere com estado por cor (praticado/melhor nota
  como barra fina), caligrafia em card `rounded-3xl`.
- Pontos fracos: cada origem com sua cor e ícone; desempenho como badge
  (`acerto 40%` em `hanko` claro).
- Config: seções em cards com ícone no título; opções em segmentados (já
  são quase isso).

### Estados vazios
Ícone grande em tile suave + uma frase + botão de ação (ex.: Flash cards sem
cards → "Aprender as 10 primeiras palavras"). Hoje são só texto cinza.

---

## 5. Equilíbrio — regras para não exagerar

- Cor **só em pequenas áreas** (tiles de 36–44px, badges, barras de 6px).
  Fundos de página e de cards continuam neutros.
- **Um** elemento de destaque forte por tela (o botão escuro / o bloco Hoje).
- `hanko` continua raro: pendências, sequência, kanji. Nunca decorativo.
- Nada de gradiente, blur, sombra pesada ou animação além de transições
  curtas (o app já respeita `prefers-reduced-motion`).
- Ícone sempre acompanhado de rótulo (acessibilidade e clareza).

---

## 6. Plano de implementação sugerido

| Fase | O quê | Impacto | Esforço |
|---|---|---|---|
| **1. Fundamentos** ✅ | Fontes self-hosted + Inter nos títulos; tokens de módulo (claro/escuro); classes `card`, `icon-tile`, `badge`, `segmented`; sombra/raio; cabeçalho compacto no lugar do jumbotron; navegação com ativo suave e ícones lucide | Muito alto — muda o app inteiro de uma vez | Médio |
| **2. Home** ✅ | Implementar o mockup (Hoje, Sugestão, contadores, atalhos) | Alto — é a primeira tela | Médio |
| **3. Estudo** ✅ | Flash cards (pilha, badges de direção/estágio, segmentados), mapa de vocabulário, Progresso | Alto — é onde se passa mais tempo | Médio |
| **4. Leitura e Lições** ✅ | Badges de nível/%, linha com barra lateral, folha da palavra no celular; tiles e tags coloridas nas lições; `Note`/`Ex` | Médio-alto | Médio |
| **5. Demais telas** ✅ | Kana, Kanji, Pontos fracos, Config, estados vazios | Médio | Baixo-médio |

Cada fase é uma entrega testável; a 1 sozinha já resolve os problemas
técnicos (fonte, offline) e o espaço perdido do jumbotron. Mudança visual,
sem mexer em dados → bump **minor** ao final (ou patch se parar na fase 1).

