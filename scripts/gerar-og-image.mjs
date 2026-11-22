/**
 * Gera public/og-image.png — a imagem da prévia do link (LinkedIn, WhatsApp,
 * Facebook…), referenciada pelo Open Graph do index.html (src/lib/site.ts).
 *
 *   npm run build:og-image
 *
 * Monta uma página 1200×630 (tamanho recomendado pelas redes) com o ícone, o
 * título e dois prints reais do app no celular (os do manual do usuário,
 * docs/manual/jpg/) e tira um screenshot com o Chromium do Playwright. As
 * cores são as do tema claro (src/index.css). Ao refazer os prints do
 * manual, rode de novo para a prévia acompanhar.
 */
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from '@playwright/test';

const RAIZ = fileURLToPath(new URL('..', import.meta.url));
const url = (caminho) => pathToFileURL(join(RAIZ, caminho)).href;
const SAIDA = join(RAIZ, 'public', 'og-image.png');

// Tokens do tema claro (src/index.css), em "R G B".
const cor = {
  paper: 'rgb(247 245 240)',
  surface: 'rgb(255 255 255)',
  ink: 'rgb(27 36 48)',
  indigo: 'rgb(30 58 95)',
  hanko: 'rgb(161 53 35)',
  sage: 'rgb(95 106 97)',
  line: 'rgb(228 223 212)',
};

const html = /* html */ `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<link rel="stylesheet" href="${url('node_modules/@fontsource-variable/inter/wght.css')}">
<style>
  * { box-sizing: border-box; margin: 0; }
  html, body { width: 1200px; height: 630px; overflow: hidden; }
  body {
    position: relative;
    background: ${cor.paper};
    color: ${cor.ink};
    font-family: 'Inter Variable', sans-serif;
  }
  .sol {
    position: absolute; width: 560px; height: 560px; border-radius: 50%;
    right: -40px; top: 40px; background: ${cor.hanko}; opacity: 0.1;
  }
  .texto { position: absolute; left: 72px; top: 64px; width: 560px; height: 502px; display: flex; flex-direction: column; }
  .marca { display: flex; align-items: center; gap: 16px; }
  .marca img { width: 68px; height: 68px; border-radius: 18px; box-shadow: 0 2px 8px rgb(27 36 48 / 0.12); }
  .marca span { font-size: 32px; font-weight: 650; letter-spacing: -0.02em; }
  h1 { margin-top: 44px; font-size: 60px; line-height: 1.05; font-weight: 760; letter-spacing: -0.035em; }
  h1 em { font-style: normal; color: ${cor.hanko}; }
  p { margin-top: 24px; font-size: 25px; line-height: 1.4; color: ${cor.sage}; }
  .base { margin-top: auto; display: flex; flex-direction: column; gap: 20px; }
  .selos { display: flex; gap: 10px; }
  .selo {
    padding: 9px 18px; border-radius: 999px; font-size: 20px; font-weight: 600;
    background: ${cor.surface}; border: 1.5px solid ${cor.line}; color: ${cor.indigo};
  }
  .endereco { font-size: 24px; font-weight: 650; letter-spacing: -0.01em; color: ${cor.indigo}; }
  .celular {
    position: absolute; width: 282px; padding: 9px; border-radius: 44px;
    background: ${cor.ink}; box-shadow: 0 34px 60px -24px rgb(27 36 48 / 0.55);
  }
  .celular .tela { border-radius: 35px; overflow: hidden; background: ${cor.paper}; }
  .celular img { display: block; width: 100%; }
  .atras { left: 678px; top: 150px; }
  .atras .tela { height: 520px; }
  .frente { left: 880px; top: 44px; }
</style>
</head>
<body>
  <div class="sol"></div>
  <div class="texto">
    <div class="marca"><img src="${url('public/icons/icon-192.png')}" alt=""><span>Nihongo Study</span></div>
    <h1>Aprenda japonês do zero, <em>em português</em></h1>
    <p>Hiragana e katakana, kanji, flash cards com repetição espaçada, lições e leitura graduada.</p>
    <div class="base">
      <div class="selos">
        <span class="selo">Grátis</span>
        <span class="selo">Sem cadastro</span>
        <span class="selo">Funciona offline</span>
      </div>
      <span class="endereco">nihongostudy.app</span>
    </div>
  </div>
  <div class="celular atras"><div class="tela"><img src="${url('docs/manual/jpg/m-home.jpg')}" alt=""></div></div>
  <div class="celular frente"><div class="tela"><img src="${url('docs/manual/jpg/m-leitura.jpg')}" alt=""></div></div>
</body>
</html>`;

const pasta = mkdtempSync(join(tmpdir(), 'og-image-'));
const arquivo = join(pasta, 'og-image.html');
writeFileSync(arquivo, html);

const navegador = await chromium.launch();
try {
  const pagina = await navegador.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await pagina.goto(pathToFileURL(arquivo).href, { waitUntil: 'load' });
  await pagina.evaluate(() => document.fonts.ready);
  await pagina.screenshot({ path: SAIDA, type: 'png' });
  console.log(`Gerado: ${SAIDA}`);
} finally {
  await navegador.close();
  rmSync(pasta, { recursive: true, force: true });
}
