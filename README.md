# Nihongo Study

App pessoal para estudar japonês (iniciante), organizado **pelo método** em
vez de por ferramenta:

- **Hoje** — plano do dia (Revisar → Aprender → Praticar), meta diária e
  sequência de dias.
- **Aprender** — lições de gramática/vocabulário (com trilha de lições
  concluídas), palavras novas do deck N5, kanji novos (radical + mnemônico)
  e alfabetos (hiragana/katakana).
- **Praticar** — as quatro habilidades: **ler** (60 textos graduados em
  quatro níveis, com furigana e significado por palavra), **ouvir** (escutar
  antes de ler, com autoavaliação, e ditado), **falar** (shadowing, "Diga em
  japonês", cards na direção português → japonês) e **escrever** (desenho
  de kana/kanji com reconhecimento e pontuação de caligrafia, diário
  guiado). Cada habilidade mostra o seu nível, medido pelo histórico dos
  exercícios.
- **Revisar** — Revisão do dia (flash cards + kanji com repetição espaçada
  FSRS), pontos fracos, quiz das lições, gramática em contexto e "Meus
  cards".
- **Progresso** — vocabulário compreendido / que sei dizer, estágios das
  palavras, kana/kanji, estatísticas de revisão e conquistas.

Princípios:

- 100% client-side (PWA) — **sem backend**, sem servidor; funciona offline.
- Dados salvos no dispositivo (IndexedDB).
- Sincronização entre aparelhos **opcional e automática pelo Google Drive** do
  próprio usuário (pasta oculta do app, sem servidor nosso), ou manual via
  **arquivo JSON** (que também é backup).

App publicado: <https://rcaneppele.github.io/nihongo-study/> — passo a passo
para instalar no Android e no iPhone no manual do usuário (capítulo 2).
- Pensado para rodar no PC e instalar no celular/tablet (Android e iPhone/iPad).

## Stack

Vite · React · TypeScript · Tailwind CSS · Dexie (IndexedDB) · vite-plugin-pwa · Canvas API.

## Rodando localmente

```bash
npm install
npm run dev      # abre em http://localhost:5173/nihongo-study/
```

Build de produção e pré-visualização:

```bash
npm run build
npm run preview
```

## Publicando (para instalar no celular)

O app é estático: qualquer host gratuito serve. Você sobe **uma vez** e depois é
só abrir o link no celular e "Adicionar à Tela de Início".

- Build: `npm run build`, pasta `dist`.
- **GitHub Pages**: o `base` em `vite.config.ts` já é `'/nihongo-study/'`
  (site em `usuario.github.io/nihongo-study/`) e há workflow em
  `.github/workflows/`.
- **Netlify / Vercel / domínio próprio na raiz**: troque `base` para `'/'`.
- **Sincronização com o Google Drive** (opcional): precisa de um OAuth Client
  ID do Google (aplicativo da Web, escopo `drive.appdata`). Localmente, em
  `.env.local` (ver `.env.example`); no deploy, na variável de repositório
  `GOOGLE_CLIENT_ID` (Settings › Secrets and variables › Actions ›
  Variables). Sem ele, o app funciona igual, só sem essa opção.

> No iPhone/iPad a instalação é feita pelo **Safari** (menu Compartilhar →
> Adicionar à Tela de Início). O iOS pode limpar dados locais sob pressão de
> armazenamento — ligue a sincronização com o Google Drive ou exporte um
> backup de vez em quando.

## Estrutura

```
src/
├── routes/        uma página por arquivo (Home, hubs Aprender/Praticar/Revisar/
│                  Progresso, e as ferramentas: lições, leitura, kana, kanji…)
├── components/    UI reutilizável (Layout, PageHeader, StatCard, KanaCanvas…)
├── features/
│   ├── metodo/    estrutura do app pelo método, plano do dia, próximo passo
│   ├── srs/       algoritmo FSRS e botões de nota
│   ├── flashcards/ sessão de revisão, estágios, mapa de vocabulário, importação
│   ├── handwriting/ captura de traços e scoreDrawing() (reconhecimento + pontuação)
│   └── …          kana, kanji, leitura, diga, quiz, kakitori, diario, exercicios,
│                  licoes, conquistas, pontos-fracos, atividade
├── licoes/        uma lição por arquivo + registro central
├── db/            schema (Dexie), backup (export/import, migrações) e mesclagem
└── data/          kana, kanji N5, textos de leitura, traços do KanjiVG, deck N5,
                   gramática em contexto, propostas do diário
```

## Documentação

- `docs/manual-do-usuario.pdf` — manual do usuário (guia ilustrado para quem
  vai usar o app). O app oferece este mesmo arquivo em Configurações › Sobre
  o App; para atualizá-lo lá, basta substituir o PDF. A fonte (HTML/CSS,
  prints e o script que gera o PDF) fica em `docs/manual/`.
- `CLAUDE.md` — contexto, mapa do código e convenções para desenvolver com o
  Claude Code.
- `regras-negocio.md` — regras de domínio (SRS e estágios, kana, kanji,
  leitura, lições, quiz/ditado, navegação pelo método, dados e
  sincronização).
- `docs/roadmap.md` — o que está em aberto (e o porquê) e o que já foi
  entregue.
- `docs/padrao-licoes.md` — padrão de conteúdo das lições.
- `docs/guia-visual.md` — tokens, cores por módulo, classes e regras do
  visual.
- `docs/proposta-sincronizacao.md` — análise da sincronização via Google
  Drive (alternativas, riscos e decisões); as regras vigentes ficam no
  `regras-negocio.md`.

## Licença

Distribuído sob a licença MIT — veja [`LICENSE`](./LICENSE). Contribuições são
bem-vindas via pull request.
