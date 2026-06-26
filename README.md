# Nihongo Study

App pessoal para estudar japonês (iniciante): **flash cards** com repetição
espaçada e **treino de hiragana/katakana** (digitar romaji ou desenhar).

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
├── routes/        páginas (Início, Flash cards, Kana, Dados, Config)
├── components/    UI reutilizável (Layout, KanaCanvas)
├── features/
│   ├── srs/       algoritmo SM-2
│   ├── flashcards/ importação CSV/JSON, sessão de revisão
│   └── kana/      captura e análise de traços
├── db/            schema (Dexie) e backup (export/import)
├── data/          kana (gojūon), traços do KanjiVG, deck inicial
└── lib/           utilitários
```

## Estado atual

Funciona: cadastro/listagem/filtro de cards, sessão de revisão com SM-2,
drill de kana por romaji, export/import de backup e de cards, canvas de desenho
com captura de traços.

A implementar: reconhecimento do desenho + dicas de caligrafia via KanjiVG
(ver `src/features/kana/strokes.ts` e `src/data/kanjivg/`), e o deck N5 completo.

## Documentação

- `CLAUDE.md` — contexto e convenções para desenvolver com o Claude Code.
- `regras-negocio.md` — regras de domínio (SRS, kana, import/export).
