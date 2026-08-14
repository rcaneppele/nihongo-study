# Nihongo Study

App pessoal para estudar japonês (iniciante): **flash cards** com repetição
espaçada, **treino de hiragana/katakana** (digitar romaji ou desenhar, com
reconhecimento e pontuação de caligrafia) e **lições de gramática/vocabulário**
com quiz de fixação.

- 100% client-side (PWA) — **sem backend**, sem servidor.
- Dados salvos só no dispositivo (IndexedDB).
- Sincronização entre aparelhos via **exportar/importar JSON** (que também é backup).
- Pensado para rodar no PC e instalar no celular/tablet (Android e iPhone/iPad).

## Stack

Vite · React · TypeScript · Tailwind CSS · Dexie (IndexedDB) · vite-plugin-pwa · Canvas API.

## Rodando localmente

```bash
npm install
npm run dev      # abre em http://localhost:5173
```

Build de produção e pré-visualização:

```bash
npm run build
npm run preview
```

## Publicando (para instalar no celular)

O app é estático: qualquer host gratuito serve. Você sobe **uma vez** e depois é
só abrir o link no celular e "Adicionar à Tela de Início".

- **Netlify / Vercel**: conecte o repositório; build `npm run build`, pasta `dist`.
- **GitHub Pages**: publique a pasta `dist`. Se o site ficar num subcaminho
  (`usuario.github.io/nihongo-study/`), ajuste `base` em `vite.config.ts` para
  `'/nihongo-study/'`.

> No iPhone/iPad a instalação é feita pelo **Safari** (menu Compartilhar →
> Adicionar à Tela de Início). O iOS pode limpar dados locais sob pressão de
> armazenamento — exporte um backup de vez em quando.

## Estrutura

```
src/
├── routes/        páginas (Início, Flash cards, Kana, Lições, Quiz, Config)
├── components/    UI reutilizável (Layout, KanaCanvas, componentes de lição)
├── features/
│   ├── srs/       algoritmo FSRS
│   ├── flashcards/ importação CSV/JSON, sessão de revisão
│   └── kana/      captura de traços e scoreDrawing() (reconhecimento + pontuação)
├── licoes/        uma lição de gramática/vocabulário por arquivo + registro central
├── db/            schema (Dexie) e backup (export/import)
└── data/          kana (gojūon), traços do KanjiVG, perguntas de quiz, deck de exemplo
```

## Estado atual

Funciona: cadastro/listagem/filtro de cards, sessão de revisão com FSRS,
drill de kana por romaji, canvas de desenho com reconhecimento e pontuação de
caligrafia contra o KanjiVG, export/import de backup e de cards (CSV, JSON ou
texto exportado do Anki), tema claro/escuro, e 10 lições de gramática/
vocabulário com quiz de fixação.

A implementar: animação da ordem de traço correta no canvas de kana, deck N5
completo (hoje há só um CSV de exemplo em `src/data/seed/`) e estatísticas de
progresso a partir da tabela `reviews`. Veja `CLAUDE.md` para a lista
priorizada.

## Documentação

- `CLAUDE.md` — contexto e convenções para desenvolver com o Claude Code.
- `regras-negocio.md` — regras de domínio (SRS, kana, import/export).

## Licença

Distribuído sob a licença MIT — veja [`LICENSE`](./LICENSE). Contribuições são
bem-vindas via pull request.
