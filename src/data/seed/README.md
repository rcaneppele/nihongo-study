# Deck inicial (seed)

- `n5.json` / `n5.ts` — vocabulário N5 completo (~700 palavras), traduzido e
  categorizado em pt-BR. Base de Aprender › Palavras novas
  (`src/features/flashcards/vocabulary.ts`, 10 palavras por vez) e, para
  importar categorias inteiras, Config > Dados > "Vocabulário N5" >
  Avançado (`src/routes/Config.tsx`). Fonte: lista pública de
  vocabulário JLPT N5 ([jamsinclair/open-anki-jlpt-decks](https://github.com/jamsinclair/open-anki-jlpt-decks),
  via [chyyran/jlpt-anki-decks](https://github.com/chyyran/jlpt-anki-decks),
  originalmente de tanos.co.uk), traduzida do inglês. O repositório de origem
  não declara licença; crédito em Configurações › Sobre o App e em
  [`THIRD_PARTY_NOTICES.md`](../../../THIRD_PARTY_NOTICES.md).
- Conjunto completo de kana já disponível em `src/data/kana.ts` (não depende
  deste diretório).

Formato de cada entrada em `n5.json`: `{ front, reading, back, category, tags }`
— mesmo shape usado no import CSV/JSON manual (ver ajuda em Config > Dados >
Importar cards), só que sem os campos de SRS (adicionados no momento do
import via `freshSrs()`).
