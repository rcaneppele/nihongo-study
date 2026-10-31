# Proposta de reorganização — do "conjunto de ferramentas" ao "método"

> **Status: implementada (5 fases, out/2026).** Regras finais em
> `regras-negocio.md` §5d; estrutura em `src/features/metodo/estrutura.ts`.

Outubro/2026. Objetivo: reorganizar o app em torno de **objetivos de
aprendizado** (aprender, praticar habilidades, revisar, acompanhar), em vez
de em torno de **ferramentas** (kana, kanji, flash cards, lições).
Restrição combinada: **nenhuma funcionalidade nova nem removida** — só
mudar onde cada coisa mora, como se chega nela e como o app guia o aluno.

---

## 1. Diagnóstico

### O que existe hoje (por ferramenta)

| Menu | O que tem dentro |
|---|---|
| Início | Hoje (meta + sequência), sugestão do momento, contadores, atalhos |
| Lições | 12 lições · Quiz · Kakitori (ditado) · Diga em japonês |
| Leitura | 40 textos · ouvir o texto / shadowing / escutar primeiro · salvar palavra · "Terminei a leitura" |
| Kanji | Aprender novos · Revisar (FSRS) · Caligrafia |
| Flash cards | Estudar (revisão FSRS, praticar, lista, novo card) · Vocabulário (mapa N5) · Progresso (estatísticas) |
| Kana | Digitar romaji · Múltipla escolha · Desenhar · praticar fracos |
| Pontos fracos | Erros de cards, kana, kanji e leitura |
| Config | Backup, importar, deck N5, preferências, sobre |

### Por que parece "solto"

1. **O menu nomeia ferramentas, não intenções.** Quem abre o app pensando
   "quero melhorar minha escuta" não sabe que isso está em *Leitura* (botão
   "Ouvir o texto") **e** em *Lições* (Kakitori). "Quero falar" está
   espalhado em *Lições* (Diga em japonês), *Leitura* (shadowing) e *Flash
   cards* (direção "Sei dizer").
2. **Uma mesma habilidade aparece em vários lugares** e **um mesmo lugar
   mistura habilidades**: *Flash cards* tem revisão (memória), mapa de
   vocabulário (aprender palavras novas) e estatísticas (progresso); *Kanji*
   tem aprender, revisar e escrever; *Kana* tem ler (romaji) e escrever
   (desenho).
3. **A revisão está fragmentada**: flash cards vencidos num lugar, kanji
   vencidos em outro, pontos fracos em um terceiro.
4. **Só a Home guia.** As outras telas são catálogos — o aluno escolhe
   sozinho o que fazer, sem saber o que mais o ajuda agora.
5. **O progresso está escondido** numa aba de *Flash cards*, apesar de
   medir o app inteiro (vocabulário passivo/ativo vem também da leitura).

---

## 2. O método por trás da reorganização

Aquisição de uma língua avança por um ciclo, e o app já tem peças para
cada etapa — só não as apresenta assim:

```
   APRENDER  ──►  PRATICAR (usar)  ──►  REVISAR (fixar)
   conteúdo       ler · ouvir ·          memória espaçada,
   novo           falar · escrever       pontos fracos
        ▲                                     │
        └──────────  ACOMPANHAR  ◄────────────┘
                     (progresso)
```

- **Aprender** — entrar em contato com algo novo, com explicação.
- **Praticar** — usar o que aprendeu nas **4 habilidades**: ler, ouvir,
  falar, escrever (input → output).
- **Revisar** — impedir o esquecimento: SRS, pontos fracos, testes.
- **Acompanhar** — ver o que já domina e onde está fraco, pra decidir o
  próximo passo.

E por cima de tudo, **Hoje**: o plano do dia que costura o ciclo.

---

## 3. Nova arquitetura de informação

### 3.1 Menu principal

| Menu | Pergunta que responde | Ícone/cor |
|---|---|---|
| **Hoje** | "O que eu faço agora?" | casa · índigo |
| **Aprender** | "O que tem de novo pra eu aprender?" | livro · `fuji` |
| **Praticar** | "Quero treinar ler / ouvir / falar / escrever" | alvo · `matcha` |
| **Revisar** | "O que eu preciso relembrar?" | camadas · `sora` |
| **Progresso** | "Como estou indo?" | gráfico · `kin` |

Cinco itens — cabe na barra inferior do celular **sem** o hoje
improvisado `sidebarOnly`. Configurações continua no topo (engrenagem).
No desktop, a barra lateral mostra as 4 habilidades **expandidas** sob
*Praticar* (atalho direto); no celular, *Praticar* abre um hub com elas.

### 3.2 Onde cada funcionalidade passa a morar

| Funcionalidade (hoje) | Novo lugar |
|---|---|
| Home | **Hoje** (mesma tela, ganha o "plano do dia" — §4.1) |
| Lições (lista + página) | **Aprender › Lições** |
| Mapa de vocabulário (aba de Flash cards) | **Aprender › Palavras novas** |
| Kanji → aprender novos | **Aprender › Kanji novos** |
| Kana → digitar romaji / múltipla escolha | **Aprender › Alfabetos** (é base, não "habilidade"; também aparece em *Praticar › Ler* como reconhecimento) |
| Leitura (textos) | **Praticar › Ler** |
| Leitura → "escutar primeiro" | **Praticar › Ouvir** (abre o texto já com o texto escondido) |
| Kakitori (ditado) | **Praticar › Ouvir** e **Praticar › Escrever** (é as duas coisas) |
| Leitura → shadowing | **Praticar › Falar** (abre o texto já no modo shadowing) |
| Diga em japonês | **Praticar › Falar** |
| Flash cards na direção "dizer em japonês" | **Praticar › Falar** (atalho para praticar só produção) |
| Kana → desenhar | **Praticar › Escrever** |
| Kanji → caligrafia | **Praticar › Escrever** |
| Flash cards → revisão + Kanji → revisão | **Revisar › Revisão do dia** (as duas filas juntas num só lugar) |
| Pontos fracos | **Revisar › Pontos fracos** |
| Quiz | **Revisar › Testar lições** |
| Flash cards → lista, novo card, praticar livre | **Revisar › Meus cards** |
| Flash cards → Progresso (estatísticas) | **Progresso** |
| Contadores da Home (compreendidas, sei dizer, kana, kanji) | **Progresso** (a Home fica com o plano) |
| Config | Config (sem mudança) |

Funcionalidades que servem a mais de uma habilidade (Kakitori, textos de
leitura, flash cards) **aparecem em mais de um hub**, cada vez com o
"modo" certo já escolhido — é o mesmo recurso, entrado por objetivos
diferentes.

### 3.3 Estrutura de cada hub

Todos os hubs seguem o mesmo esqueleto (mesmo componente):

```
┌─────────────────────────────────────────────┐
│  [ícone] Praticar · Ouvir                    │  cabeçalho + 1 frase do
│  Entender japonês falado, sem apoio do texto │  porquê da habilidade
├─────────────────────────────────────────────┤
│  PRÓXIMO PASSO           ┌─────────────┐     │  ← guia: 1 ação recomendada,
│  Escute 「でんわ」 sem    │  Começar →  │     │    calculada dos dados
│  ler — você já leu 2×    └─────────────┘     │
├─────────────────────────────────────────────┤
│  ATIVIDADES                                   │  ← as ferramentas desta
│  ▸ Escutar um texto antes de ler              │    habilidade, com uma
│  ▸ Ditado (Kakitori)                          │    linha sobre quando usar
│  ▸ Ouvir o texto acompanhando                 │    cada uma
├─────────────────────────────────────────────┤
│  SEU NÍVEL NESTA HABILIDADE                   │  ← 1 indicador já existente
│  6 textos lidos · 2 ditados esta semana       │
└─────────────────────────────────────────────┘
```

O **próximo passo** de cada hub usa só dados que o app já tem (a mesma
lógica da "Sugestão para agora" da Home):

| Hub | Próximo passo (dados existentes) |
|---|---|
| Aprender | palavra mais útil ainda não sabida (mapa N5) · kanji novos disponíveis |
| Ler | texto com maior "% conhecido" não lido recentemente |
| Ouvir | texto já lido, para escutar sem ler · ditado de uma lição |
| Falar | cards vencidos na direção "dizer em japonês" · Diga em japonês da lição com mais erros salvos |
| Escrever | família de kana com pior acerto no desenho · kanji para caligrafia |
| Revisar | flash cards + kanji vencidos (fila unificada) · pontos fracos |

---

## 4. Ajustes de fluxo (sem funcionalidade nova)

### 4.1 Hoje vira "plano do dia"
A sugestão única de hoje vira uma **sequência curta, na ordem do ciclo**,
montada só com o que já existe:

1. **Revisar** — as revisões vencidas (cards + kanji). Se não houver, some.
2. **Aprender** — X palavras novas (do mapa) ou a próxima lição.
3. **Praticar** — um texto no ponto certo (ler) ou escutá-lo (ouvir).

Cada passo com estado (feito / a fazer) derivado da atividade do dia, que
já é registrada. A meta, a faixa da semana e a sequência continuam.

### 4.2 Entradas com "modo" pré-escolhido
Hoje cada tela abre sempre igual. Com parâmetros na URL (o mesmo padrão do
`?licao=` do Diga em japonês), cada hub abre a ferramenta já no modo da
habilidade:

- `/leitura/:id?modo=ouvir` → "escutar primeiro" ligado.
- `/leitura/:id?modo=shadowing` → modo shadowing selecionado.
- `/kana?modo=desenho` → modo desenhar selecionado.
- `/flashcards?praticar=producao` → prática na direção "dizer em japonês".

### 4.3 Revisão unificada
"Revisão do dia" mostra **um número** (cards + kanji vencidos) e encadeia
as duas sessões existentes (primeiro flash cards, depois kanji) — sem
mudar a lógica de nenhuma das duas.

### 4.4 Rotas
As rotas atuais **continuam funcionando** (nenhum link quebra, nem os
atalhos da Home). Entram rotas novas para os hubs (`/aprender`,
`/praticar`, `/praticar/ler`, `/praticar/ouvir`, `/praticar/falar`,
`/praticar/escrever`, `/revisar`, `/progresso`); o mapa de vocabulário e
as estatísticas saem das abas de `/flashcards` para `/aprender/palavras`
e `/progresso` (as abas antigas redirecionam).

---

## 5. O que fica de fora (seria funcionalidade nova)

Pra respeitar a restrição, estas ideias ficam anotadas, não incluídas:

- **Trilha de lições com progresso** ("lição 3 de 12 concluída") — hoje o
  app não registra lição concluída. Seria o complemento natural de
  *Aprender*.
- **Nível por habilidade** (ex.: "Ouvir: nível 2") — exigiria registrar
  desempenho de escuta/fala, que hoje não é medido. (Entrou só a parte
  possível com dados existentes: "Seu nível nesta habilidade", em
  `src/features/metodo/nivel.ts`; Ouvir e Falar seguem no roadmap.)
- **Histórico de Quiz e Diga em japonês** — alimentaria Pontos fracos e o
  próximo passo de *Falar*.

---

## 6. Plano de implementação

| Fase | O quê | Esforço |
|---|---|---|
| **1. Navegação** ✅ | Novo menu (Hoje · Aprender · Praticar · Revisar · Progresso); hubs com a lista de atividades apontando para as telas existentes; rotas antigas mantidas | Médio |
| **2. Mover peças** ✅ | Mapa de vocabulário → Aprender; estatísticas → Progresso (com os contadores da Home); `/flashcards` vira "Meus cards"; revisão unificada em Revisar | Médio |
| **3. Modos pré-escolhidos** ✅ | `?modo=` em leitura, kana e flash cards | Baixo |
| **4. Próximo passo por hub** ✅ | Card de recomendação em cada hub (lógica da Home generalizada) | Médio |
| **5. Plano do dia** ✅ | Home vira a sequência Revisar → Aprender → Praticar | Médio |

Cada fase é testável sozinha; a 1 já muda a percepção do app.
Reorganização sem mudar dados → **minor** (nova estrutura de navegação).
