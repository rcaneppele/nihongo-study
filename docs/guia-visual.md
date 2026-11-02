# Guia visual

Referência do visual do app: tokens, cores por módulo, classes utilitárias e
regras de equilíbrio. Vale para qualquer tela nova ou alterada. O resumo
operacional está no `CLAUDE.md` (Convenções); aqui fica o porquê e o
detalhe.

Identidade: papel, tinta índigo e o vermelho do carimbo (`hanko`) usado com
parcimônia — tom calmo e minimalista, com cor só onde ela tem função.

---

## 1. Tokens de cor

Definidos em `src/index.css` como variáveis RGB, uma vez em `:root` (claro)
e outra em `:root.dark` (escuro). Usar os tokens já garante os dois temas —
não usar variantes `dark:` nos componentes nem hex solto.

| Token | Uso |
|---|---|
| `paper` | fundo da página |
| `surface` | fundo de cards (opaco) |
| `ink` | texto principal |
| `sage` | texto secundário, legendas |
| `line` | bordas e divisores |
| `indigo` / `indigo-soft` | ação primária, item ativo, seção Hoje |
| `hanko` | destaque/perigo: pendências, sequência, ações destrutivas; também o módulo de Kanji |

### Cores de apoio por módulo

Cada módulo tem um tom "dono", usado **só em pequenas áreas**: ícones,
`icon-tile` (fundo a ~12%), `badge`, barras finas. Nunca em fundos grandes.

| Token | Tom | Módulo / uso |
|---|---|---|
| `sora` (céu) | azul | flash cards, revisões; seção Revisar |
| `matcha` | verde | leitura, "compreendida", meta batida; seção Praticar |
| `fuji` | violeta | lições; seção Aprender |
| `kin` (ouro) | âmbar | kana, práticas; seção Progresso |
| `sakura` | rosa | pontos fracos |
| `hanko` | vermelho | kanji (o carimbo) |

Combinações prontas em `src/lib/cores.ts` (`TILE`, `TEXTO`, `PILULA`) —
escritas por extenso porque o Tailwind só gera classes que aparecem
inteiras no código. Cores dos estágios de vocabulário em `STAGE_BADGE`/
`STAGE_BAR` (`src/features/flashcards/stages.ts`): Novo cinza → Reconheço
`sora` claro → Sei dizer `sora` sólido → Domino `matcha`, iguais na lista,
no mapa e no Progresso.

---

## 2. Tipografia

- Fontes **variáveis empacotadas** (`@fontsource-variable/inter` e
  `@fontsource-variable/noto-sans-jp`, importadas em `src/main.tsx`) — nunca
  por CDN, para funcionar offline. Inter entra no pré-cache do PWA; as
  fatias da Noto Sans JP são guardadas em cache conforme o navegador as
  baixa (ver `vite.config.ts`).
- Títulos e números em Inter semibold (`tracking-tight`); japonês com a
  classe `font-jp`.

---

## 3. Superfícies e componentes

Classes utilitárias em `src/index.css`:

| Classe | Para quê |
|---|---|
| `card-surface` | card padrão: `surface` opaco, sombra difusa, borda clara, `rounded-2xl` |
| `card-hero` | bloco de destaque da tela (`rounded-3xl`) |
| `icon-tile` | quadrado do ícone com fundo suave do módulo |
| `badge` | selo pequeno (estado, nível, contagem) |
| `segmented` / `segmented-item` / `segmented-item-active` | controle segmentado em pílula (modos, velocidade, tema, 2/4 botões) |
| `chip` / `chip-active` | filtros em pílula |
| `btn` + `btn-primary` / `btn-dark` / `btn-accent` / `btn-ghost` | botões (primário índigo; escuro para o "Começar" de destaque; `accent` = `hanko`) |
| `field`, `label` | formulários |
| `kbd` | tecla de atalho dentro do botão |
| `countdown-bar` | barra do auto-avanço do treino de kana |

Componentes compartilhados em `src/components/`: `PageHeader` (ícone na cor
do módulo, título, subtítulo, ações), `StatCard` (contador com ícone, selo
de crescimento ou barra, ⓘ com a definição), `ProgressRing`, `StudyCard`
(card das sessões, efeito de pilha + etiqueta de direção),
`SessionHeader` (progresso "N de total" + barra fina), `ResultadoResumo`
(anel de acerto das telas de resultado), `ProximoPassoCard` e
`AtividadeCard` (hubs do método).

Ícones: `lucide-react` (traço) em navegação, ações, contadores e estados
vazios. Emoji só como identidade de cada lição, dentro de um tile suave.
Kana/kanji como ícone (あ, 字) continuam, na cor do módulo.

---

## 4. Regras de equilíbrio

- Cor **só em pequenas áreas** (tiles de 36–44px, badges, barras de ~6px).
  Fundos de página e de cards continuam neutros.
- **Um** elemento de destaque forte por tela (o botão escuro / o bloco
  principal).
- `hanko` é raro: pendências, sequência, kanji, perigo. Nunca decorativo.
- Sem gradiente, blur, sombra pesada ou animação além de transições curtas
  (o app respeita `prefers-reduced-motion`).
- Ícone sempre com rótulo; número sempre com rótulo (e ⓘ quando a
  definição não for óbvia, ex.: "Maduro = intervalo ≥ 21 dias").
- Estado vazio: ícone em tile suave + uma frase + botão de ação.
- Fora de propósito para este app: ranking/pontos competitivos, gráficos
  elaborados de dashboard, avatares, cores saturadas em grandes áreas.
