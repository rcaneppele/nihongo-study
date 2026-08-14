# Deck inicial (seed)

- `n5.json` / `n5.ts` — vocabulário N5 completo (~700 palavras), traduzido e
  categorizado em pt-BR. Importado por categoria em Config > Dados >
  "Vocabulário N5" (`src/routes/Config.tsx`). Fonte: lista pública de
  vocabulário JLPT N5 ([jamsinclair/open-anki-jlpt-decks](https://github.com/jamsinclair/open-anki-jlpt-decks),
  originalmente de tanos.co.uk), traduzida do inglês.
- Conjunto completo de kana já disponível em `src/data/kana.ts` (não depende
  deste diretório).

Formato de cada entrada em `n5.json`: `{ front, reading, back, category, tags }`
— mesmo shape usado no import CSV/JSON manual (ver ajuda em Config > Dados >
Importar cards), só que sem os campos de SRS (adicionados no momento do
import via `freshSrs()`).
