# Roadmap de features

Documento de referência para as próximas features do app. Reúne o resultado de
uma pesquisa (setembro/2026) sobre apps de estudo de japonês concorrentes
(WaniKani, Bunpro, Renshuu, Satori Reader, Migaku, LingoDeer, Anki, entre
outros) e recomendações de professores/comunidades de ensino (Tofugu, Tadoku,
AJATT/Tatsumoto, Migaku, pesquisa em aquisição de segunda língua), filtrado
pelo que é **viável dentro da arquitetura deste projeto**.

Este documento é vivo: conforme uma feature é implementada, decidida ou
descartada, atualize a seção correspondente (mova para "Concluído", ajuste
prioridade, ou anote a decisão em "Fora de escopo"). Não é uma spec de
implementação — é o mapa de prioridades e o porquê de cada uma; o desenho
técnico detalhado de cada feature deve virar issue/plano próprio na hora de
implementar.

---

## 1. Restrições que toda feature deste roadmap respeita

Herdadas de `CLAUDE.md` — nenhuma proposta abaixo as viola:

- **Sem backend.** Nenhuma feature depende de servidor, API remota ou conta de
  usuário.
- **Offline-first.** Tudo precisa funcionar instalado, sem internet.
- **Dados locais por dispositivo** (IndexedDB/Dexie); sincronização continua
  manual via export/import de JSON.
- Reaproveitar infraestrutura existente sempre que possível (FSRS, dados
  KanjiVG, padrão de lição/kakitori) em vez de introduzir tecnologia nova sem
  necessidade.

Duas capacidades ficam **fora de escopo por padrão** porque exigem servidor
externo — ver seção 6 para o motivo técnico:

- Reconhecimento de fala do usuário (avaliar pronúncia).
- Conversação ou correção de texto livre com feedback de IA.

---

## 2. Onde o app está hoje (baseline)

Para contexto de quem for ler este roadmap sem ter acompanhado a pesquisa:

| Funcionalidade | Cobre | Não cobre |
|---|---|---|
| Flash cards (FSRS) | Repetição espaçada de vocabulário/frases | Kanji como trilha própria; áudio |
| Treino de Kana | Digitar romaji; desenhar hiragana/katakana com feedback de caligrafia (KanjiVG) | Kanji (só kana); listening |
| Lições | Gramática e vocabulário estático, com quiz e kakitori (escrita) | Leitura extensiva; listening; produção livre |
| Progresso | Estatísticas de `cards`/`reviews` | Gamificação (streaks, conquistas) |

As lacunas mais evidentes — e por isso as mais representadas no roadmap — são
**kanji como módulo próprio**, **qualquer forma de listening** e **leitura
extensiva**.

---

## 3. Top 10 prioritárias

Ordenadas por impacto: cobrem lacunas que nenhuma feature atual toca e são
100% viáveis offline reaproveitando infraestrutura que o app já tem.

### 3.1 Módulo de Kanji com SRS dedicado — ✅ implementado (2026-09)
**O quê:** trilha própria (separada das lições de gramática) no formato
radical → kanji → vocabulário, com mnemônicos e progressão por SRS, usando o
FSRS que o app já tem em `src/features/srs/fsrs.ts`.
**Por quê:** hoje kanji só aparece como coluna de referência opcional dentro
das lições (ver convenção "kanji nunca dentro de `<Ex />`" no CLAUDE.md). É a
maior lacuna do app e o recurso mais citado como diferencial nos concorrentes
(WaniKani é a referência do setor).
**Reaproveita:** engine FSRS, tabela `cards`/`reviews`, dados de traço
KanjiVG (`src/data/kanjivg/`) para a caligrafia (ver 3.8).
**Esforço:** alto — é uma trilha de conteúdo nova (radicais, mnemônicos,
ordenação pedagógica), mas de baixo risco técnico.
**Status:** feito — `/kanji`, ~110 kanji do N5 (`src/data/kanji.ts`),
tabela `kanjiProgress` (schemaVersion 3), fluxo aprender/revisar reaproveitando
o FSRS. Furigana (`src/components/Furigana.tsx`) saiu como componente novo
junto — ver seção 6 sobre aplicá-lo nas lições. N4/N3 seguem como extensão
futura, mesma estrutura.

### 3.2 Leitura extensiva com textos graduados
**O quê:** biblioteca de textos curtos em hiragana/katakana (kanji com
furigana opcional), organizados por nível de dificuldade (inspirado nos
níveis 0–5 do Tadoku: de ~20-50 palavras únicas a textos de milhares de
palavras), com dicionário pop-up ao tocar numa palavra.
**Por quê:** leitura extensiva de material fácil ("input compreensível",
Krashen) é um dos insumos mais citados por professores e comunidades de
imersão como eficaz para aquisição — e o app hoje não tem nenhum material de
leitura livre, só exemplos pontuais dentro das lições.
**Reaproveita:** padrão de conteúdo estático das lições; vocabulário N5 já
importado para o dicionário pop-up.
**Esforço:** médio para a primeira leva de textos (nível inicial); cresce
conforme os níveis avançam.

### 3.3 Listening via Web Speech API (SpeechSynthesis) — ✅ já existia
**Correção (2026-09):** essa pesquisa listou isso como pendência, mas o app
**já tinha** TTS via `SpeechSynthesis` (`src/features/audio/speech.ts` +
`AudioButton`, usado em `Kana.tsx` e nas lições) antes desta pesquisa —
descoberto ao explorar o código durante a implementação de 3.1. Reaproveitado
diretamente no módulo de Kanji para pronúncia de exemplos.
**O quê:** sintetizar em áudio os exemplos japoneses das lições (`<Ex jp=
"...">`) e dos futuros textos de leitura, usando `SpeechSynthesis` do
navegador — síntese **local, offline, sem custo e sem servidor**.
**Por quê:** listening é uma das quatro habilidades e ainda fica pouco
coberta fora do botão de áudio pontual — shadowing/ditado (3.4/3.5) seguem
como lacuna real.
**Viabilidade técnica:** suportado nativamente em Chrome/Edge/Firefox/
Safari. Ressalva: qualidade de voz varia por sistema operacional, e
utterances muito longas (200+ caracteres) podem cortar — mitigar quebrando o
texto em sentenças.
**Esforço:** já pago — é a base (pré-requisito) para 3.4 e 3.5, que continuam
pendentes.

### 3.4 Shadowing
**O quê:** ouvir um trecho de áudio (via TTS do item 3.3) e repetir junto,
1–2 segundos atrás, com controle de velocidade e replay.
**Por quê:** técnica com respaldo forte em treino de pronúncia/fluência
(citada por praticantes de imersão e treino de intérpretes).
**Reaproveita:** TTS de 3.3; não exige gravação nem upload de áudio do
usuário (sem processamento de voz no servidor).
**Esforço:** baixo, depende apenas de 3.3.

### 3.5 Ditado / Kikitori (dictation)
**O quê:** ouvir um áudio (TTS) e digitar o que foi ouvido, comparando com o
texto-fonte com destaque de acertos/erros por palavra.
**Por quê:** treina listening e escrita ao mesmo tempo; é a extensão natural
do kakitori que já existe hoje para escrita a partir de texto.
**Reaproveita:** TTS de 3.3, padrão de exercício do kakitori atual em
`src/licoes`.
**Esforço:** baixo-médio, depende de 3.3.

### 3.6 Treino de pitch accent (アクセント)
**O quê:** exercícios de reconhecimento/produção do padrão de altura tonal
(alto/baixo por mora) de palavras — por exemplo, modo "escute e escolha o
padrão certo entre 4 variações".
**Por quê:** pouquíssimos apps cobrem isso bem (Migaku Pitch Trainer é a
referência); professores apontam pitch accent como causa comum de "sotaque
estrangeiro" mesmo em alunos avançados, e é raramente ensinado explicitamente.
**Viabilidade técnica:** alta — o padrão de pitch é dado simbólico (uma
sequência de alto/baixo por mora), não exige áudio gravado; o áudio de
exemplo pode vir do TTS de 3.3 (com a limitação de que TTS nem sempre acerta
o pitch nativo — vale avisar isso na UI).
**Esforço:** médio — principal custo é levantar/anotar os dados de pitch por
palavra.

### 3.7 Simulados estilo JLPT
**O quê:** provas cronometradas por seção (vocabulário, gramática, leitura,
listening), geradas a partir do próprio banco de conteúdo do app (lições,
vocabulário, textos de leitura).
**Por quê:** dá um objetivo mensurável e concreto, e integra as features de
leitura (3.2) e listening (3.3–3.5) num formato só.
**Reaproveita:** banco de vocabulário/gramática existente.
**Esforço:** médio, e cresce em valor conforme 3.2/3.3 avançam (mais
conteúdo para sortear).

### 3.8 Stroke order expandido para kanji — ✅ implementado (2026-09), junto com 3.1
**O quê:** estender o `KanaCanvas`/`scoreDrawing()` (hoje usado só para kana)
para os kanji do módulo de 3.1, usando o KanjiVG (que já cobre os ~2.136
kanji jōyō, não só kana).
**Por quê:** é extensão direta de tecnologia que já existe e já funciona —
não introduz nada novo, só amplia o dado de entrada.
**Reaproveita:** `src/features/kana/strokes.ts`, `src/components/
KanaCanvas.tsx`, `scripts/build-kana-strokes.mjs` (adaptar para gerar dados
de kanji além de kana).
**Esforço:** baixo-médio — a engine já existe, o trabalho é de dados e
geração de traços.
**Status:** feito — a pasta virou `src/features/handwriting/` (nome
"kana" não fazia mais sentido com kanji reaproveitando o mesmo motor);
`scoreDrawing()`/`getReferenceStrokes()` agora leem um `REFERENCE_DATA`
mesclado de `kana-strokes.json` + `kanji-strokes.json`; a lógica de
busca/parse do KanjiVG foi extraída para `scripts/lib/kanjivg.mjs`,
compartilhada pelos dois scripts geradores. Escopo inicial: só os ~110
kanji do N5 (mesmo escopo do módulo) — cobertura de N4/N3/jōyō completo
é a mesma extensão futura de 3.1.

### 3.9 Sentence mining / vocabulário com contexto
**O quê:** permitir criar um flashcard a partir de uma frase das lições ou
da leitura extensiva, marcando a palavra-alvo desconhecida na frase (em vez
de só importar decks prontos).
**Por quê:** é a prática mais recomendada em comunidades de imersão para
fixar vocabulário com contexto real, seguindo o princípio de "input
compreensível +1" (uma palavra nova por vez, resto conhecido).
**Reaproveita:** `src/features/flashcards/importCards.ts`/schema de cards
existente — é essencialmente um novo fluxo de criação de card, não uma
tabela nova.
**Esforço:** baixo-médio, é CRUD local sobre o schema já existente.

### 3.10 Gamificação alinhada ao SRS
**O quê:** streaks de estudo, heatmap de revisões (estilo "contribution
graph"), conquistas locais (ex.: "100 kanji dominados", "7 dias seguidos",
"N5 completo").
**Por quê:** pesquisa em gamificação de SRS mostra ganho de retenção quando
o reforço acompanha o próprio ciclo de repetição espaçada (não compete com
ele, como ranking competitivo faria).
**Reaproveita:** dados já existentes em `db.reviews`/`db.cards` — é
visualização e regras sobre dado que já é coletado, sem tabela nova além de,
possivelmente, uma tabela pequena de conquistas desbloqueadas.
**Esforço:** baixo — sem infraestrutura nova, sem servidor, sem conta (não
há leaderboard nem comparação entre usuários, coerente com "app de um único
usuário").

---

## 4. Outras features por categoria

Features de prioridade menor que as do Top 10, mas que valem constar no
roadmap.

### Leitura
- **Dicionário pop-up** ao tocar/clicar numa palavra do texto de leitura,
  puxando do vocabulário já importado (N5 e futuros decks).
- **Toggle de furigana** (mostrar/ocultar) nos textos de leitura e nas
  tabelas de kanji das lições, para treinar a transição de "com apoio" para
  "sem apoio" — coerente com a convenção atual de kanji sempre acompanhado
  de leitura. O componente (`src/components/Furigana.tsx`, `<ruby>/<rt>`)
  já existe desde a implementação de 3.1 — falta só aplicá-lo aqui. Isso
  inclui trocar a coluna "Kanji" simples que `familia.tsx`, `pronomes.tsx`
  e `sufixos.tsx` já têm hoje pelo mesmo componente, e considerar adicionar
  referência de kanji nas lições que ainda não têm nenhuma (só onde o
  kanji é realmente comum no uso real, ex.: verbos básicos). Trabalho de
  conteúdo, lição por lição — não mecânico.

### Vocabulário e gramática
- **Exercício de gramática em contexto**: sortear de um banco maior de
  frases (não só os exemplos fixos da lição) para reconhecimento do padrão
  gramatical, reduzindo o risco de o usuário decorar a frase em vez da
  regra.
- **Decks adicionais N4/N3**, seguindo o padrão de `src/data/seed/n5.ts` +
  `n5.json` já existente — extensão de conteúdo, não de arquitetura.

### Produção escrita
- **Diário guiado com prompts** (ex.: "escreva 3 frases usando os kosoado
  desta lição"), com autoavaliação por checklist do próprio usuário —
  correção automática de texto livre ficaria fora de escopo (ver seção 6).
- **Reescrita de frases por blocos**: dado um significado em português,
  montar a frase em japonês escolhendo blocos de palavras/partículas na
  ordem certa — treina produção sem exigir avaliação de texto livre.

### Progresso
- **Modo "revisão de erros"**: lista dedicada dos itens mais errados,
  derivável do que `ProgressStats.tsx` já calcula de `db.reviews`.

---

## 5. Fases sugeridas

Agrupamento por dependência técnica e esforço, não por obrigação — a ordem
real depende do que o usuário quiser estudar primeiro.

**Fase 1 — maior impacto, menor dependência entre si**
1. Módulo de Kanji com SRS (3.1)
2. Web Speech API / TTS (3.3) — desbloqueia 3.4 e 3.5
3. Leitura extensiva, nível inicial (3.2)

**Fase 2 — depende da Fase 1**
4. Shadowing (3.4)
5. Ditado/Kikitori (3.5)
6. Stroke order de kanji (3.8) — depende de 3.1
7. Sentence mining (3.9) — mais valioso com leitura (3.2) disponível

**Fase 3 — consolidação**
8. Pitch accent (3.6)
9. Simulados JLPT (3.7) — mais valioso com 3.2/3.3 maduros
10. Gamificação (3.10) — pode entrar a qualquer momento, é independente

---

## 6. Fora de escopo (por ora) e por quê

- **Reconhecimento de fala do usuário** (avaliar pronúncia): a API
  `SpeechRecognition` do navegador, no Chrome, depende de um servidor do
  Google por trás das cenas para fazer o reconhecimento — isso viola "sem
  backend/API remota". Se algum dia for reconsiderado, precisa ser uma
  decisão explícita e avisada ao usuário (best-effort, dependente de rede).
- **Conversação ou correção de texto livre com feedback de IA**: exigiria um
  LLM externo. Contraria diretamente "sem backend nem API remota" do
  CLAUDE.md. Poderia existir no futuro como integração *opcional* (o próprio
  usuário traz uma chave de API), mas isso é uma decisão de arquitetura
  separada, não algo a assumir por padrão neste roadmap.

---

## 7. Fontes da pesquisa

- [Best app for learning Japanese in 2026 — immit.co](https://immit.co/blog/best-app-for-learning-japanese-in-2026-an-honest-comparison)
- [Best Japanese Learning Resources in 2026 — Kaiwa Blog](https://trykaiwa.com/blog/best-japanese-learning-resources-2026)
- [WaniKani](https://www.wanikani.com/) · [Tofugu: Kanji Radicals e Mnemônicos](https://www.tofugu.com/japanese/kanji-radicals-mnemonic-method/)
- [Anki vs WaniKani — Migaku](https://migaku.com/blog/japanese/anki-vs-wanikani)
- [Japanese Reading Levels: JLPT, Tadoku & More — Migaku](https://migaku.com/blog/japanese/japanese-reading-levels)
- [Tadoku — Graded Readers oficiais](https://tadoku.org/japanese/en/graded-readers-en/)
- [Tofugu: Japanese Graded Readers Primer](https://www.tofugu.com/japanese/japanese-graded-readers/)
- [Shadowing Technique — FluentU](https://www.fluentu.com/blog/japanese/shadowing-japanese/)
- [Migaku Pitch Trainer — review Tofugu](https://www.tofugu.com/japanese-learning-resources-database/migaku-pitch-trainer/) · [demo](https://pitch-demo.migaku.io/)
- [Learning Japanese in 2026: A Practitioner's Playbook — Migaku](https://migaku.com/blog/japanese/learning-japanese-in-2026-a-practitioners-playbook)
- [Output Hypothesis: Research on Speaking and Writing — Mikey Does](https://mikeydoes.com/articles/output-hypothesis-japanese-speaking-writing/)
- [Sentence mining — AJATT/Tatsumoto](https://tatsumoto-ren.github.io/blog/sentence-mining.html) · [SubSmith 2026](https://subsmith.app/blog/sentence-mining-guide)
- [MDN: Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) · [SpeechSynthesis](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis)
- [MyKikitori — prática de listening](https://www.mykikitori.com/)
- [JLPT Listening Skills — jlptjapanesetest.com](https://jlptjapanesetest.com/jlpt-listening-skills/)
- [Gamification + Spaced Repetition — eLearning Industry](https://elearningindustry.com/the-learning-retention-formula)
- [Effectiveness of Gamified Tools for FLL — revisão sistemática (PMC)](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10135444/)
