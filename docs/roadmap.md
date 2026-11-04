# Roadmap de features

Mapa das próximas features e do porquê de cada uma. Nasceu de uma pesquisa
(setembro/2026) sobre apps de estudo de japonês concorrentes (WaniKani,
Bunpro, Renshuu, Satori Reader, Migaku, LingoDeer, Anki, entre outros) e
recomendações de professores/comunidades de ensino (Tofugu, Tadoku,
AJATT/Tatsumoto, Migaku, pesquisa em aquisição de segunda língua), filtrado
pelo que é **viável dentro da arquitetura deste projeto**.

Este documento é vivo: quando uma feature for implementada, decidida ou
descartada, atualize a seção correspondente (mova para "Concluído", ajuste a
prioridade ou anote a decisão em "Fora de escopo"). Não é uma spec — o
desenho técnico de cada feature vira plano próprio na hora de implementar,
e as regras finais vão para o `regras-negocio.md`.

---

## 1. Restrições que toda feature deste roadmap respeita

Herdadas de `CLAUDE.md`:

- **Sem backend.** Nenhuma feature depende de servidor nosso, API remota ou
  conta de usuário. Única exceção, combinada: a sincronização **opcional**
  com o Google Drive do próprio usuário.
- **Offline-first.** Tudo precisa funcionar instalado, sem internet.
- **Dados locais por dispositivo** (IndexedDB/Dexie, chaves UUID), com
  sincronização manual por arquivo JSON ou automática pelo Google Drive.
  Tabela nova ou campo novo precisa entrar no backup, na mesclagem
  (`src/db/merge.ts`) e, se for exclusão, nas lápides.
- **Encaixe no método.** Toda ferramenta nova é decidida em
  `src/features/metodo/estrutura.ts`: em que objetivo(s) entra (Aprender,
  Praticar › ler/ouvir/falar/escrever, Revisar, Progresso) e se alimenta o
  Plano do dia ou o "Próximo passo" de algum hub.
- Reaproveitar a infraestrutura existente (FSRS, dados KanjiVG, padrão de
  lição, `activity`) em vez de introduzir tecnologia nova sem necessidade.

---

## 2. Em aberto

Ordenadas por impacto. Todas viáveis offline.

### 2.1 Simulados estilo JLPT
**O quê:** provas cronometradas por seção (vocabulário, gramática, leitura,
listening), sorteadas do conteúdo do app (deck N5, `quiz` e `diga` das
lições, gramática em contexto, textos de leitura com áudio por
`SpeechSynthesis`).
**Por quê:** dá um objetivo mensurável e junta leitura e escuta num formato
só. Com 61 textos, ~700 palavras, 13 lições e o banco de gramática já há
conteúdo para sortear.
**Onde entra:** Revisar (ao lado de "Testar lições") e um indicador no
Progresso. O resultado pode ir para `exerciseResults` (novo `kind`), o que
já o leva a Pontos fracos e às conquistas.
**Esforço:** médio.

### 2.2 Conteúdo
Extensões de conteúdo, sem mudança de arquitetura:
- **Decks N4/N3** no padrão de `src/data/seed/n5.ts` + `n5.json` (e a
  "escada" de nível em Aprender › Palavras novas).
- **Kanji N4+** em `src/data/kanji.ts`, com os traços regenerados por
  `npm run build:kanji-strokes`.
- **Mais textos de leitura**, principalmente nos níveis 0 e 3 (hoje 10
  cada; os níveis 1 e 2 têm 20).
- **Mais frases na gramática em contexto** e propostas no diário para as
  lições novas.
- **Lições novas** e expansão das atuais pelo `docs/padrao-licoes.md`.
- **Referência de kanji em mais lições** (hoje em família, pronomes,
  sufixos, seikatsu e kanji), só onde o kanji é comum no uso real (ex.:
  verbos básicos) — trabalho de conteúdo, lição por lição.

---

## 3. Concluído

| Entrega | Quando | Onde ler mais |
|---|---|---|
| FSRS no lugar do SM-2 | v2.0.0, ago/2026 | `regras-negocio.md` §1 |
| Quiz das lições (reordenar frase, escolher partícula, significado, V/F) e Kakitori (ditado) | até v2.1.0, ago/2026 | `regras-negocio.md` §5 |
| Módulo de Kanji com SRS (~110 kanji N5, radical + mnemônico) e caligrafia de kanji (KanjiVG) | set/2026 | `regras-negocio.md` §3 |
| Leitura extensiva graduada (40 textos, furigana, significado por palavra) | set/2026 | `regras-negocio.md` §4 |
| Áudio por `SpeechSynthesis`: botões de áudio, ouvir o texto, escutar primeiro, shadowing, velocidade global | set–out/2026 | `regras-negocio.md` §4 |
| Furigana nas tabelas de kanji das lições (`FuriganaWord`) | set/2026 | `regras-negocio.md` §3 |
| Melhorias de aprendizado: revisão com 2/4 botões e desfazer; card com frase de contexto e "salvar palavra" da leitura (sentence mining); estágios Reconheço → Sei dizer → Domino; vocabulário passivo e "% conhecido"; mapa de vocabulário N5; Diga em japonês; Pontos fracos; meta diária, sequência e heatmap; notas nos cards | v2.5.0, out/2026 | `regras-negocio.md` §1, §4, §5, §5b, §5c |
| Novo visual (tokens por módulo, fontes empacotadas, componentes) | out/2026 | `docs/guia-visual.md` |
| Reorganização pelo método (Hoje · Aprender · Praticar · Revisar · Progresso, Plano do dia, Próximo passo) | v2.6.0, out/2026 | `regras-negocio.md` §5d |
| Manual do usuário (PDF, também dentro do app) | v2.6.x, out/2026 | `docs/manual/README.md` |
| Sincronização automática pelo Google Drive + mesclagem com lápides e contadores por aparelho; política de privacidade | v2.7.x, nov/2026 | `regras-negocio.md` §6, `docs/proposta-sincronizacao.md` |
| Histórico dos exercícios (Quiz, Diga, ditado, gramática, escuta, shadowing) alimentando Pontos fracos e o "Próximo passo" de Falar | v2.8.0, nov/2026 | `regras-negocio.md` §5, §5b |
| Nível por habilidade em Ouvir e Falar (escuta autoavaliada, ditado, Diga, shadowing) | v2.8.0, nov/2026 | `regras-negocio.md` §5d |
| Progresso por lição e trilha (concluir lição, próxima lição no passo "Aprender") | v2.8.0, nov/2026 | `regras-negocio.md` §5 |
| Conquistas locais | v2.8.0, nov/2026 | `regras-negocio.md` §5e |
| Gramática em contexto (frases novas com lacuna) e diário guiado (escrita com checklist) | v2.8.0, nov/2026 | `regras-negocio.md` §5 |
| Leitura: nível "Primeiros passos" (curtíssimos, só kana) e nível 3 (textos longos, N4) — 60 textos | v2.8.0, nov/2026 | `regras-negocio.md` §4 |
| Lição de Onomatopeias, com quiz, Diga, ditado, gramática em contexto, diário e texto de leitura | v2.9.0, nov/2026 | `regras-negocio.md` §5 |

---

## 4. Fora de escopo (por ora) e por quê

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

## 5. Fontes da pesquisa

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
