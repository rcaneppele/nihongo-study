// Prints novos da v2.7 (sincronização): aba Dados conectada ao Drive (Drive simulado) e Home no celular.
const { chromium } = require(process.env.PLAYWRIGHT_CORE || 'playwright-core');
const fs = require('fs');
const BASE = 'http://localhost:5199/nihongo-study';
const N5 = require('../../src/data/seed/n5.json');
const JPG = __dirname + '/jpg';
const src = fs.readFileSync(__dirname + '/shots.cjs', 'utf8');
// reaproveita a semeadura do shots.cjs
eval(src.slice(src.indexOf('async function semear'), src.indexOf('(async () =>')));

async function driveFalso(ctx) {
  await ctx.route(/googleapis\.com/, (route) => {
    const u = route.request().url(), m = route.request().method();
    const cors = { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*', 'access-control-allow-methods': '*' };
    if (m === 'OPTIONS') return route.fulfill({ status: 204, headers: cors });
    const json = (b) => route.fulfill({ status: 200, headers: cors, contentType: 'application/json', body: JSON.stringify(b) });
    if (u.includes('/about')) return json({ user: { emailAddress: 'voce@gmail.com' } });
    if (m === 'POST' || m === 'PATCH') return json({ id: 'f1', version: '2' });
    if (u.includes('spaces=appDataFolder')) return json({ files: [] });
    // sem arquivo remoto: cada ciclo procura, não acha e sobe de novo
    return route.fulfill({ status: 404, headers: cors, body: '' });
  });
}
async function conectar(p) {
  await p.evaluate(async () => {
    const banco = await new Promise((res) => { const r = indexedDB.open('nihongo-study'); r.onsuccess = () => res(r.result); });
    await new Promise((res) => { const tx = banco.transaction('local', 'readwrite'); const st = tx.objectStore('local');
      st.put({ key: 'sync', value: { conectado: true, conta: 'voce@gmail.com' } });
      st.put({ key: 'googleToken', value: { accessToken: 'falso', expiresAt: Date.now() + 3600000 } });
      st.put({ key: 'lastBackupAt', value: Date.now() });
      tx.oncomplete = res; });
    banco.close();
  });
}

(async () => {
  const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', headless: true });
  const desk = await browser.newContext({ viewport: { width: 1280, height: 860 }, deviceScaleFactor: 1.5 });
  await driveFalso(desk);
  const p = await desk.newPage();
  await semear(p); await conectar(p);
  await p.goto(BASE + '/config'); await p.waitForTimeout(2500);
  const b = await p.locator('main').boundingBox();
  await p.screenshot({ path: `${JPG}/config.jpg`, type: 'jpeg', quality: 85, fullPage: true, clip: { x: b.x, y: b.y, width: b.width, height: Math.min(1000, b.height) } });
  console.log('ok config', await p.locator('main').innerText().then((t) => t.slice(0, 300)));

  const mob = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await driveFalso(mob);
  const m = await mob.newPage();
  m.on('requestfailed', (r) => console.log('FALHOU', r.method(), r.url().slice(0, 120), r.failure()?.errorText));
  m.on('request', (r) => { if (/google/.test(r.url())) console.log('REQ', r.method(), r.url().slice(0, 120)); });
  await semear(m); await conectar(m);
  await m.goto(BASE + '/'); await m.waitForTimeout(2000);
  await m.screenshot({ path: `${JPG}/m-home.jpg`, type: 'jpeg', quality: 85 });
  await m.goto(BASE + '/config'); await m.waitForTimeout(3500);
  const card = m.locator('section', { hasText: 'Sincronizar com o Google Drive' }).first();
  await card.screenshot({ path: `${JPG}/m-sync.jpg`, type: 'jpeg', quality: 85 });
  console.log('ok mobile');
  await browser.close();
})();
