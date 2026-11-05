# Manual do usuário — fonte

Fonte de `public/manual-do-usuario.pdf` (o PDF que o app oferece em
Configurações › Sobre o App, com link fixo que pode ser compartilhado). O manual é HTML + CSS impresso em PDF pelo
Chrome headless.

- `capa.html` — capa (versão do app e mês: atualizar a cada edição).
- `corpo.html` — sumário + capítulos. O sumário tem `data-toc` vazio: o
  número da página é preenchido pelo `gerar.cjs`.
- `estilo.css` — visual (mesmos tokens de cor do app; fontes de
  `node_modules/@fontsource-variable`).
- `jpg/` — prints do app; `icone.png`; `qr-app.svg` (QR code do endereço do
  app, gerado com o pacote `qrcode`).

## Gerar o PDF

Precisa do Google Chrome em `/usr/bin/google-chrome`, do `pdfunite`
(poppler-utils) e do pacote `playwright-core` (não é dependência do projeto):

```sh
npm i --no-save playwright-core   # ou aponte PLAYWRIGHT_CORE para uma instalação existente
node docs/manual/gerar.cjs        # escreve public/manual-do-usuario.pdf
```

## Refazer os prints

Com o app rodando em `npm run dev -- --port 5199` (e `.env.local` com o
Client ID, para o cartão do Google Drive aparecer):

- `node docs/manual/shots.cjs` — prints gerais (dados de exemplo semeados).
- `node docs/manual/shots-sync.cjs` — aba Dados conectada ao Google Drive e
  Home no celular, com o Drive simulado (nenhuma conta real é usada).

As ilustrações de instalação no Android/iPhone (capítulo 2) não são prints:
são desenhos esquemáticos em HTML/CSS dentro do `corpo.html` (classes
`.tel`).
