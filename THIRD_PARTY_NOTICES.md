# Avisos de terceiros

O código próprio do Nihongo Study está sob a licença MIT (ver [`LICENSE`](./LICENSE)).
Os itens abaixo são de terceiros e continuam sob as licenças deles: **a licença
MIT do projeto não se aplica a eles.**

## Dados

### KanjiVG — ordem e forma dos traços

- **Onde está:** `src/data/kanjivg/kana-strokes.json` e `kanji-strokes.json`.
- **Origem:** [KanjiVG](https://kanjivg.tagaini.net/), © 2009–2026 Ulrich Apel.
- **Licença:** [Creative Commons Atribuição-CompartilhaIgual 3.0 (CC BY-SA 3.0)](https://creativecommons.org/licenses/by-sa/3.0/).
- **Alterações:** os SVGs foram convertidos para JSON, só com o que o app usa
  (ver `scripts/build-kana-strokes.mjs`, `scripts/build-kanji-strokes.mjs` e
  `scripts/lib/kanjivg.mjs`).
- Esses dados adaptados são distribuídos sob a mesma licença CC BY-SA 3.0.

### Vocabulário N5

- **Onde está:** `src/data/seed/n5.json`.
- **Origem:** lista traduzida do inglês para o português a partir de
  [jamsinclair/open-anki-jlpt-decks](https://github.com/jamsinclair/open-anki-jlpt-decks),
  baseada em [chyyran/jlpt-anki-decks](https://github.com/chyyran/jlpt-anki-decks)
  e em listas do site tanos.co.uk.
- **Licença:** o repositório de origem não declara licença para esses dados. Se
  você é titular de direitos sobre essa lista e tem alguma objeção, escreva para
  nihongostudyapp@gmail.com ou abra uma
  [issue](https://github.com/rcaneppele/nihongo-study/issues).

## Fontes

| Fonte | Pacote | Licença |
|---|---|---|
| Inter | `@fontsource-variable/inter` | SIL Open Font License 1.1 |
| Noto Sans JP | `@fontsource-variable/noto-sans-jp` | SIL Open Font License 1.1 |

## Bibliotecas incluídas no app

| Biblioteca | Licença |
|---|---|
| [React](https://github.com/facebook/react) e React DOM | MIT |
| [React Router](https://github.com/remix-run/react-router) | MIT |
| [Dexie](https://github.com/dexie/Dexie.js) e dexie-react-hooks | Apache-2.0 |
| [ts-fsrs](https://github.com/open-spaced-repetition/ts-fsrs) | MIT |
| [Lucide](https://github.com/lucide-icons/lucide) | ISC |

O texto completo de cada licença acompanha o pacote correspondente em
`node_modules/` depois de `npm install`.
