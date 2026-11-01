const { chromium } = require(process.env.PLAYWRIGHT_CORE || 'playwright-core');
const { execFileSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const D = __dirname;
const rodape = `<div style="width:100%;font-family:sans-serif;font-size:7.5pt;color:#8a8f98;padding:0 17mm;display:flex;justify-content:space-between">
  <span>Nihongo Study · Manual do usuário</span><span><span class="pageNumber"></span></span></div>`;
(async () => {
  const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', headless: true, args: ['--allow-file-access-from-files'] });
  const p = await b.newPage();
  const render = async (arq, out, comRodape) => {
    await p.goto('file://' + D + '/' + arq); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(500);
    await p.pdf({ path: out, format: 'A4', preferCSSPageSize: true, printBackground: true,
      displayHeaderFooter: comRodape, headerTemplate: '<span></span>', footerTemplate: comRodape ? rodape : '<span></span>' });
  };
  // passagem 1: descobrir a página de cada capítulo (a contagem inclui a capa)
  await render('corpo.html', D + '/corpo.pdf', true);
  const paginas = execFileSync('pdftotext', ['-layout', D + '/corpo.pdf', '-']).toString().split('\f');
  const titulos = await p.$$eval('section.cap', (ss) => ss.map((s) => ({ id: s.id, t: s.querySelector('h1').innerText.replace(/^\d+\s*/, '').trim() })));
  const mapa = {};
  for (const { id, t } of titulos) {
    const i = paginas.findIndex((pg, n) => n > 0 && pg.replace(/\s+/g, ' ').includes(t.slice(0, 28)));
    mapa[id] = i + 1; // mesma numeração do rodapé (a capa é um PDF à parte, sem número)
  }
  console.log(mapa);
  // passagem 2: preenche o sumário com as páginas encontradas
  let html = fs.readFileSync(D + '/corpo.html', 'utf8');
  for (const [id, n] of Object.entries(mapa)) html = html.replace(`data-toc="${id}"></b>`, `data-toc="${id}">${n}</b>`);
  fs.writeFileSync(D + '/corpo-final.html', html);
  await render('corpo-final.html', D + '/corpo.pdf', true);
  await render('capa.html', D + '/capa.pdf', false);
  await b.close();
  execFileSync('pdfunite', [D + '/capa.pdf', D + '/corpo.pdf', path.join(D, '..', 'manual-do-usuario.pdf')]);
  console.log('docs/manual-do-usuario.pdf gerado');
})();
