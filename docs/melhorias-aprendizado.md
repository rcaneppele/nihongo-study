# Melhorias de aprendizado — análise e propostas

Relatório de outubro/2026, resultado de uma pesquisa de melhorias sobre
como apps de idiomas tratam vocabulário, flashcards, leitura/escuta e
progresso, filtrada pelo que se aplica a um app offline, de um usuário só,
para japonês. Conversação com IA ficou de fora por princípio (sem backend,
sem LLM — ver `roadmap.md` §6).

Complementa o `docs/roadmap.md`: onde uma ideia daqui reforça ou muda um
item que já está lá, isso é indicado (ex.: "→ roadmap 3.6"). Os itens estão
sendo implementados de forma experimental na branch
`experimento/melhorias-aprendizado`.

---

## 1. Ideias centrais

- **Vocabulário é um estado por palavra, não um deck.** Cada palavra passa
  por estágios — nova → reconheço → produzo → domino — e esse estado é
  alimentado por várias fontes (leitura, lições, revisão), visível em todo
  lugar do app. Os flashcards são só um dos jeitos de mover a palavra de
  estágio.
- **Vocabulário passivo pode ser medido sem esforço do usuário**: uma
  palavra lida ou ouvida **sem precisar consultar o significado** conta
  como compreendida.
- **Produção desde o começo**: frases inteiras, ditas em voz alta e
  conferidas com o áudio, com as palavras voltando em **frases novas** (não
  sempre no mesmo card). Palavras escolhidas por quantas frases úteis elas
  destravam, não só por tema.
- **Flashcards contextuais**: o card carrega a frase onde a palavra foi
  encontrada, é criado a partir do que o aluno lê, e cobra as duas direções
  (reconhecer e produzir).

---

## 2. Sobre flashcards/SRS

Uma crítica comum de quem aprendeu muitos idiomas é que o SRS "puro"
(palavra isolada → tradução) treina reconhecimento de um estímulo fixo, não
uso; o vocabulário se consolida com **muitos encontros em contextos
variados** (leitura, escuta, prática constante). Faz sentido e bate com a
literatura de aquisição. Mas há ressalvas para o nosso caso:

1. **Japonês para lusófono não tem cognatos.** Um falante de português
   aprendendo espanhol ou alemão reconhece boa parte do vocabulário por
   semelhança; em japonês quase nada é "de graça" (fora gairaigo).
   Encontros em input demoram muito mais para fixar uma palavra,
   especialmente no começo, quando há pouco input compreensível disponível.
2. **Escrita.** Kana e kanji são memorização de símbolo — é onde o SRS é
   mais forte.
3. **Mesmo apps focados em input acabam oferecendo flashcards** — só que
   contextuais, bidirecionais e alimentados pelo que o aluno leu/ouviu.

**Recomendação:** manter o FSRS, mas **subordiná-lo ao input**: cards com
frase de contexto, criados a partir das leituras/lições, com uma etapa de
produção, e com o app empurrando o usuário para ler/ouvir mais do que para
revisar mais. As propostas abaixo seguem essa linha.

---

## 3. Propostas de funcionalidade

Ordenadas por impacto/esforço. Todas respeitam: sem backend, offline,
dados no Dexie, UUID, sync por JSON. Onde há mudança de schema, ela é
**aditiva** (bump minor).

### 3.1 Sessão de revisão mais leve — ✅ implementado (branch experimental)

- **2 botões por padrão** — "Não lembrei" e "Lembrei" —, cada um com uma
  legenda pequena dizendo quando o card volta ("rever amanhã", "rever em
  12 dias"). O FSRS funciona bem só com passou/não passou; os 4 botões
  ("Não lembrei", "Com esforço", "Lembrei", "Fácil") ficam como opção em
  Config.
- **Atalhos de teclado** com a tecla visível no botão: `Espaço` mostra a
  resposta e, com ela revelada, conta como "Lembrei"; `1`/`2`… escolhem a
  nota; `Ctrl+Z` desfaz.
- **Desfazer** a última nota (restaura o estado FSRS e apaga a linha em
  `reviews`).
- **Barra de progresso** fina abaixo de "3 de 20".

Vale para flash cards e revisão de kanji. Detalhes em `regras-negocio.md`.

### 3.2 Card com contexto + "salvar palavra" da leitura — prioridade alta (→ roadmap 3.6)

**O quê:** ao tocar numa palavra em `LeituraTexto` (e futuramente nos `<Ex>`
das lições), o cartão de palavra ganha **"Salvar nos flash cards"**. O card
criado leva a **frase em que a palavra apareceu** (a `ReadingLine`), a
tradução da frase e a **origem** ("Leitura · 公園で").
No estudo, o verso mostra a frase com a palavra destacada e uma barra de
ações **Ouvir · Frase · Tradução da frase**.

**Por quê:** é a feature que mais aproxima SRS de input — o *sentence
mining* que já estava no roadmap. Os textos de leitura já têm tudo
pré-anotado (`text`, `reading`, `meaning`, `translation`), então não
precisa de tokenizador.

**Dados:** campos opcionais em `Card`: `example?`, `exampleTranslation?`,
`source?` (ex.: `{ kind: 'leitura', id, title }`). Sem índice novo,
compatível com backups antigos. Evitar duplicata comparando `front`, como o
import do N5 já faz.

**Esforço:** baixo-médio.

### 3.3 Estágios de vocabulário: Reconheço → Produzo → Domino — prioridade alta

**O quê:** uma "jornada" de 3 estágios nos flash cards:

| Estágio | Nome sugerido | Direção do card |
|---|---|---|
| 1 | **Reconheço** | japonês → português (o que existe hoje) |
| 2 | **Produzo** | português → japonês, de preferência como **frase com lacuna** |
| 3 | **Domino** | sai da fila ativa; aparece só em revisões espaçadas longas |

O card sobe de estágio automaticamente (ex.: no estágio 1 quando a
estabilidade FSRS passar de N dias; no estágio 2 idem) e o usuário pode
**subir ("já sei") ou rebaixar ("voltar um estágio")** manualmente.

**Por quê:** é a materialização de "vocabulário passivo vs. ativo". Hoje o
app só treina reconhecimento (frente sempre em japonês) — o usuário nunca é
cobrado de **produzir** a palavra.

**Como, offline:** o card de produção mostra o português (+ a frase com
lacuna se houver `example`) e o usuário responde **mentalmente ou em voz
alta** e confere — autoavaliação, que funciona sem reconhecimento de fala.
Se a resposta for um sinônimo válido, o card pode registrar e pedir "outra
forma de dizer". Variante opcional: digitar a resposta em romaji e
converter para kana (o treino de kana já tem lógica de romaji) para
conferência exata, aceitando `reading` como gabarito.

**Dados:** a forma mais limpa é um segundo estado FSRS por card para a
direção de produção (campos opcionais `prod*`, ou tabela nova
`cardProduction` com chave = `cardId`) + `stage?: 1|2|3`. Aditivo, sem
resetar nada → **minor**. Precisa atualizar `migrateBackup` e a mesclagem
em `backup.ts` (vence o `updatedAt` mais recente, como hoje).

**Esforço:** médio. É a mudança mais estrutural deste relatório; vale um
plano próprio e uma seção em `regras-negocio.md`.

### 3.4 Vocabulário passivo implícito na leitura + "% conhecido" do texto — prioridade alta

**O quê:**
- Ao concluir um texto de leitura (botão "Terminei"), as palavras que o
  usuário **não tocou** contam como **compreendidas**; as que tocou ficam
  como "consultadas" (candidatas a salvar).
- Na listagem de `/leitura`, cada texto mostra **"você conhece ~X%"**
  (palavras compreendidas + cards em estágio ≥1 ÷ palavras únicas). Isso
  permite escolher textos no ponto "i+1" (~90–98% conhecido), que é o que
  torna a leitura extensiva eficaz.
- Contador geral na Home: **"palavras compreendidas"** e **"palavras que
  você produz"** (estágio ≥2) — dois números com tooltip explicando cada
  um, em vez de só "cards no total".

**Dados:** precisa de uma identidade de palavra estável. Proposta: campo
opcional `lemma` em `ReadingWord` (forma de dicionário, ex.: `食べた` →
`食べる`) — sem ele, usa `text`. Tabela nova `wordKnowledge` (`key` =
lemma, `status`, `seenCount`, `lookupCount`, `updatedAt`) — chave natural,
mesmo padrão de `kanaProgress`/`kanjiProgress`, mesclável por `updatedAt`.
Também registra textos lidos (hoje "sem progresso persistido").

**Esforço:** médio (parte técnica pequena; o trabalho é preencher `lemma`
nos textos existentes onde a forma difere).

### 3.5 Mapa de vocabulário por tema/nível — prioridade média

**O quê**, sobre o deck N5 que já existe (`n5.json`, ~700 palavras, 8
categorias):
- Tela `/vocabulario` com filtro por **categoria/tema** e uma "escada" de
  **nível JLPT** (N5 hoje; N4/N3 quando os decks existirem — → roadmap §4).
- Grade de **tiles coloridos pelo estágio** (nova / reconheço / produzo /
  domino), `% conhecido` do tema e a contagem por estágio.
- Ações: **"Aprender as 10 próximas"** (cria os cards só delas — substitui
  o import em massa por categoria, evitando inundar a fila), **"Testar 10"**
  (prática sem gravar no SRS, como o "Praticar" de hoje), **"Ler sobre o
  tema"** (link para textos de leitura/lições relacionados por tag).
- Painel "**próxima palavra mais útil que você ainda não sabe**", com
  exemplo, áudio e "Já sei" (marca como conhecida sem criar card).

**Ordem de introdução:** uma ordem **pedagógica curada** por categoria
(campo `order` no `n5.json`) é mais simples que frequência de corpus e
segue o princípio de "palavras que destravam mais frases": começar por
palavras que combinam com a gramática das lições (です, verbos básicos,
こそあど, partículas). Se quisermos frequência real, há listas abertas
derivadas de corpus (checar licença antes; gerar o campo em build, como os
scripts do KanjiVG).

**Por quê:** dá visão de "onde estou" e uma decisão clara do que aprender
em seguida — hoje o vocabulário só existe como cards soltos.

**Esforço:** médio. Depende de 3.3 para as cores de estágio fazerem sentido
(dá para começar com "novo / em estudo / maduro" com o FSRS atual).

### 3.6 Modo escuta e "ler acompanhando" nos textos — prioridade média

- **Tocar texto inteiro**, linha a linha, com a **linha atual destacada**
  (karaokê por frase — `SpeechSynthesis` dispara `onend` por utterance, e o
  app já quebra por linha).
- **Velocidade** ajustável (hoje fixa em `rate = 0.9` em `speech.ts`):
  lento / normal, persistido em `db.meta`.
- **Escutar primeiro**: modo que esconde o texto e só toca o áudio; o
  texto aparece depois, para conferir o que entendeu.
- **Shadowing**: toca a linha, pausa o tempo da linha × 1,2 para o usuário
  repetir em voz alta, segue. Não precisa reconhecimento de fala.

**Por quê:** ouvir textos é um dos pilares da aquisição; hoje o áudio é
só um botão por linha. Tudo reaproveita `speakJapanese`.
**Esforço:** baixo-médio.

### 3.7 Exercício "monte a frase" — prioridade média (→ roadmap §4 "Produção escrita")

**O quê:** no fim de cada lição (ou numa aba "Praticar" das lições), uma
sequência de frases em português que usam **a gramática da lição + palavras
já vistas**. O usuário diz/pensa a frase em japonês, toca para revelar
(kana + romaji + áudio) e se autoavalia. Opcional: versão em blocos
(ordenar palavras/partículas), que já está no roadmap.

**Por quê:** produção desde o primeiro dia, em frases inteiras, com reuso
espaçado das palavras em **frases novas**. As lições hoje são só leitura +
quiz de reconhecimento.

**Dados:** conteúdo estático por lição (array de `{ pt, jp, romaji }`),
mesmo padrão do kakitori. Seguir `padrao-licoes.md` (só kana + romaji).
Pode alimentar o FSRS como "frases" (separadas de vocabulário) se
quisermos revisão espaçada de frases.

**Esforço:** médio, quase todo de conteúdo.

### 3.8 Aba "Meus erros" unificada — prioridade média (→ roadmap §4 "revisão de erros")

**O quê:** uma lista única dos itens mais errados em **todos os módulos** —
cards com mais `lapses`, kana com pior `romajiWrong/choiceWrong`, kanji com
mais lapsos, palavras mais consultadas na leitura — com um botão "Treinar
estes" que monta um exercício a partir dos próprios erros.

**Dados:** tudo já existe, exceto as consultas de leitura (vem com 3.4).
**Esforço:** baixo-médio.

### 3.9 Meta diária e sequência de todo o app — prioridade baixa (→ roadmap 3.7)

**O quê:** a sequência hoje só conta revisões de flash cards. Contar
**qualquer atividade** (leitura concluída, lição, kana, kanji) e mostrar na
Home um resumo do dia ("hoje: 12 revisões, 1 texto lido, 3 palavras
novas") e "palavras até a próxima meta". **Sem ranking** — não faz sentido
num app de um usuário.

**Dados:** pode ser derivado de `reviews` + uma tabela leve de eventos de
estudo (ou reaproveitar `wordKnowledge`/textos lidos de 3.4).
**Esforço:** baixo.

### 3.10 Notas de origem/etimologia no card — prioridade baixa

O módulo de Kanji já tem radical/mnemônico. Estender para o vocabulário um
campo opcional `nota` no card (composição do kanji, origem de gairaigo/
wasei-eigo, "falso amigo"), exibido no verso. Conteúdo a escrever aos
poucos, não feature técnica.

---

## 4. Visual / UX / UI

### Padrões que funcionam bem

- **Uma ação primária por tela**, sempre com a mesma cor de destaque e o
  resto neutro. O olho sabe onde tocar.
- **Botões que explicam a consequência** (legenda curta embaixo do rótulo),
  em vez de deixar o usuário adivinhar o que uma nota significa.
- **Atalhos visíveis** (`kbd` dentro do botão) — ensina o atalho sem tela
  de ajuda.
- **Tooltips nas métricas** (ⓘ): cada número tem uma definição em
  linguagem simples. Número sem rótulo é opaco para quem chega.
- **Stepper de estágios** (① → ② → ③) com contagem do dia: mostra o modelo
  mental do app em uma linha.
- **Grade de tiles por cor de estado**: visão de conjunto instantânea,
  motivadora ("41% conhecido").
- **Painel de detalhe lateral** no desktop (lista à esquerda, item à
  direita) em vez de navegar para outra tela.
- **Card com profundidade** (pilha de cartas atrás, sombra suave) e barra de
  progresso fina acima — sensação de "baralho" sem enfeite.
- **Barra de ações do card** (Ouvir / Tradução / Contexto) com ícone +
  rótulo, tudo opcional — o card fica limpo e a ajuda está a um toque.
- **Navegação agrupada por intenção** (praticar / aprender / progresso).

### O que adaptar no Nihongo Study

1. ✅ **Botões de nota com legenda e `kbd`** em `StudySession.tsx` e
   `KanjiReviewSession.tsx` (3.1).
2. ✅ **Barra de progresso fina** nas sessões de revisão (3.1); estender ao
   quiz quando mexer nele.
3. **Ícone ⓘ com definição** em cada `Stat` da Home e em `ProgressStats`
   (ex.: "Maduro = intervalo ≥ 21 dias").
4. **Agrupar a navegação** em *Praticar* (Leitura, Kana, Kakitori) /
   *Aprender* (Lições, Kanji, Vocabulário) / *Revisar* (Flash cards, Meus
   erros) / *Progresso* — hoje a sidebar é uma lista plana; com as novas
   telas (Vocabulário, Erros), ela vai crescer.
5. **Barra de ações no verso do card** (Ouvir · Frase · Tradução da frase ·
   Nota), com ícone + rótulo pequeno, abaixo de um divisor.
6. **Cores de estágio** para tiles/listas: hoje não há tokens para isso.
   Criar 3–4 tokens novos em `src/index.css` (claro e escuro), derivados da
   paleta atual — sugestão: novo = `line`, reconheço = `indigo` translúcido,
   produzo = `indigo`, domino = `sage`. **Não** usar `hanko` como cor de
   estágio (é reservado a destaque/perigo); o índigo continua sendo a cor
   da ação primária.
7. **Home orientada a "o que fazer agora"**: em vez de 4 contadores + 5
   atalhos de mesmo peso, um bloco principal com a próxima ação sugerida
   (revisões devidas → texto de leitura recomendado pelo % conhecido →
   próximas 10 palavras).

### O que evitar

- **Ranking e pontos competitivos** — sem sentido para um usuário só (já
  decidido no roadmap 3.7).
- **Cabeçalho lotado de números** sem rótulo — preferir 1–2 números com
  rótulo e tooltip.
- **Data de criação** como destaque no card — a *origem* ("Leitura ·
  公園で") é útil; "salvo há 17 horas", não.
- **Cores vibrantes / visual "SaaS"** — o tom calmo de papel/índigo é uma
  identidade melhor para estudo diário e é premissa do `CLAUDE.md`.

---

## 5. Ordem sugerida

1. ✅ **3.1** (revisão mais leve).
2. **3.2** (salvar palavra da leitura com contexto) — fecha o ciclo
   leitura → SRS.
3. **3.6** (modo escuta/shadowing) — barato e dá uso novo aos 30 textos.
4. **3.3** (estágios Reconheço/Produzo/Domino) — a mudança estrutural;
   desenhar com calma e documentar em `regras-negocio.md`.
5. **3.4** (passivo implícito + % conhecido) e **3.5** (mapa de
   vocabulário) — dependem de 3.3 para brilhar.
6. **3.7**, **3.8**, **3.9**, **3.10** conforme houver conteúdo/tempo.

Ajustes de UI da seção 4 entram junto com a feature que mexe na mesma tela.

Quando algo daqui for aprovado no merge, vale movê-lo para o
`docs/roadmap.md` (que é o mapa de prioridades vivo) e deixar este
documento como registro da análise.
