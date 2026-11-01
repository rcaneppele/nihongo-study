# Nihongo Study

App pessoal para estudar japonês (iniciante), organizado **pelo método** em
vez de por ferramenta:

- **Hoje** — plano do dia (Revisar → Aprender → Praticar), meta diária e
  sequência de dias.
- **Aprender** — lições de gramática/vocabulário, palavras novas do deck N5,
  kanji novos (radical + mnemônico) e alfabetos (hiragana/katakana).
- **Praticar** — as quatro habilidades: **ler** (textos graduados com
  furigana e significado por palavra), **ouvir** (escutar antes de ler,
  ditado), **falar** (shadowing, "Diga em japonês", cards na direção
  português → japonês) e **escrever** (desenho de kana/kanji com
  reconhecimento e pontuação de caligrafia).
- **Revisar** — Revisão do dia (flash cards + kanji com repetição espaçada
  FSRS), pontos fracos, quiz das lições e "Meus cards".
- **Progresso** — vocabulário compreendido / que sei dizer, estágios das
  palavras, kana/kanji e estatísticas de revisão.

Princípios:

- 100% client-side (PWA) — **sem backend**, sem servidor; funciona offline.
- Dados salvos só no dispositivo (IndexedDB).
- Sincronização entre aparelhos via **exportar/importar JSON** (que também é backup).
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

> No iPhone/iPad a instalação é feita pelo **Safari** (menu Compartilhar →
> Adicionar à Tela de Início). O iOS pode limpar dados locais sob pressão de
> armazenamento — exporte um backup de vez em quando.

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
│   └── …          kana, kanji, leitura, diga, quiz, kakitori, pontos-fracos, atividade
├── licoes/        uma lição por arquivo + registro central
├── db/            schema (Dexie) e backup (export/import, migrações)
└── data/          kana, kanji N5, textos de leitura, traços do KanjiVG, deck N5
```

## Documentação

- `docs/manual-do-usuario.pdf` — manual do usuário (guia ilustrado para quem
  vai usar o app).
- `CLAUDE.md` — contexto, mapa do código e convenções para desenvolver com o
  Claude Code.
- `regras-negocio.md` — regras de domínio (SRS e estágios, kana, kanji,
  leitura, lições, navegação, import/export).
- `docs/roadmap.md` — próximas features e o porquê de cada uma.
- `docs/padrao-licoes.md` — padrão de conteúdo das lições.
- `docs/proposta-*.md`, `docs/melhorias-aprendizado.md` — registros das
  propostas já implementadas (visual, reorganização, melhorias) e da
  sincronização via Google Drive (`proposta-sincronizacao.md`, melhoria
  futura).

## Licença

Distribuído sob a licença MIT — veja [`LICENSE`](./LICENSE). Contribuições são
bem-vindas via pull request.
