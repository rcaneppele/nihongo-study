# Dados de traços (KanjiVG)

`kana-strokes.json` contém os dados de **ordem e direção de traço** dos kana
usados em `src/data/kana.ts`, derivados do projeto
[KanjiVG](https://kanjivg.tagaini.net/) (licença CC BY-SA — ao redistribuir,
credite o KanjiVG; para uso pessoal este aviso já basta).

## Formato

```json
{
  "あ": {
    "strokes": [
      [[x, y], [x, y], ...],
      ...
    ]
  }
}
```

- Uma entrada por kana (hiragana e katakana — os traços têm formas diferentes
  entre os dois, então cada script tem seu próprio conjunto, sem derivação).
- `strokes` é um array na **ordem correta de traço**; cada traço é um array de
  32 pontos `[x, y]` reamostrados a distâncias iguais ao longo do traço.
- Coordenadas normalizadas para `[0, 1]` (divididas pela largura/altura do
  `viewBox` do SVG original) — comparáveis diretamente com pontos do
  `KanaCanvas` após dividir por `size`.

## Como foi gerado

`node scripts/build-kana-strokes.mjs` — baixa o SVG de cada kana do KanjiVG,
extrai os `<path>` do grupo `StrokePaths_XXXXX` (já em ordem de traço), achata
as curvas (cúbicas/quadráticas) em pontos e normaliza/reamostra como acima.

Se uma família de kana for adicionada em `src/data/kana.ts`, atualize a lista
`HIRAGANA_GROUPS` no topo do script e rode-o de novo.
