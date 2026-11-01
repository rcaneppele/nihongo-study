const { chromium } = require(process.env.PLAYWRIGHT_CORE || 'playwright-core');
const BASE = 'http://localhost:5199/nihongo-study';
const IMG = __dirname + '/jpg';
const N5 = require('../../src/data/seed/n5.json');

async function semear(page) {
  await page.goto(BASE + '/'); await page.waitForTimeout(600);
  await page.evaluate(async (n5) => {
    const banco = await new Promise((res, rej) => { const r = indexedDB.open('nihongo-study'); r.onsuccess = () => res(r.result); r.onerror = rej; });
    const put = (store, rows) => new Promise((res) => { const tx = banco.transaction(store, 'readwrite'); const st = tx.objectStore(store); rows.forEach((r) => st.put(r)); tx.oncomplete = res; });
    const DIA = 86400000, now = Date.now();
    const day = (off) => { const d = new Date(now - off * DIA); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; };
    // atividade: 9 dias seguidos até ontem, hoje com um pouco
    const act = [];
    for (let o = 1; o <= 9; o++) act.push({ day: day(o), revisoes: 12 + (o * 7) % 15, praticas: 4 + o % 5, leituras: o % 3 === 0 ? 1 : 0, novos: 3 + o % 4, updatedAt: now });
    act.push({ day: day(0), revisoes: 6, praticas: 2, leituras: 0, novos: 0, updatedAt: now });
    await put('activity', act);
    const srs = (st, sched, due, lapses = 0) => ({ stability: Math.max(1, sched), difficulty: 5, state: st, reps: st ? 4 : 0, lapses, scheduledDays: sched, dueDate: due, lastReviewedAt: st ? now - 2 * DIA : undefined });
    const pal = n5.filter((w) => /Substantivos|Verbos|Adjetivos|Saudações/.test(w.category)).slice(0, 70);
    const cards = pal.map((w, i) => {
      let base;
      if (i < 10) base = srs(0, 0, now);                       // novos
      else if (i < 22) base = srs(2, 3, now - 3600000, i % 4 === 0 ? 2 : 0); // vencidos
      else base = srs(2, 4 + (i % 12), now + (1 + i % 9) * DIA, i % 7 === 0 ? 1 : 0);
      const production = i >= 40 ? srs(2, i >= 60 ? 25 : 5, now + (2 + i % 6) * DIA) : (i >= 36 && i < 40 ? srs(2, 3, now - 3600000) : undefined);
      return { id: 'c' + i, front: w.front, reading: w.reading, back: w.back, category: w.category, tags: w.tags, ...base, production, createdAt: now - 20 * DIA, updatedAt: now };
    });
    await put('cards', cards);
    const reviews = [];
    for (let i = 0; i < 260; i++) reviews.push({ id: 'r' + i, cardId: 'c' + (10 + i % 60), reviewedAt: now - (1 + i % 11) * DIA - (i % 5) * 3600000, quality: i % 6 === 0 ? 1 : (i % 4 === 0 ? 4 : 3), intervalAfter: 1 + i % 15 });
    await put('reviews', reviews);
    const hira = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん'.split('');
    await put('kanaProgress', hira.map((c, i) => ({ char: c, type: 'hiragana', romajiCorrect: 6 + i % 5, romajiWrong: [7, 12, 18, 26, 33].includes(i) ? 5 : i % 9 === 0 ? 1 : 0, drawBest: i < 25 ? 55 + (i * 7) % 45 : undefined, lastPracticed: now - (i % 6) * DIA })));
    const kanji = '一二三四五六七八九十日月火水木'.split('');
    await put('kanjiProgress', kanji.map((c, i) => ({ char: c, ...srs(2, 2 + i % 10, i < 3 ? now - 3600000 : now + (1 + i % 7) * DIA, i === 5 ? 2 : 0), createdAt: now - 15 * DIA, updatedAt: now })));
    await put('readingProgress', ['apresentacao', 'seikatsu', 'kaimono'].map((t, i) => ({ textId: t, timesRead: 1 + (i === 0 ? 1 : 0), lastReadAt: now - (i + 1) * 2 * DIA, updatedAt: now })));
    await put('wordKnowledge', n5.slice(100, 190).map((w, i) => ({ key: w.front, status: i % 9 === 0 ? 'consultada' : 'compreendida', seenCount: 1 + i % 3, lookupCount: i % 9 === 0 ? 1 : 0, updatedAt: now - (i % 10) * DIA })));
    banco.close();
  }, N5);
  await page.reload(); await page.waitForTimeout(800);
}

(async () => {
  const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', headless: true });
  const desk = await browser.newContext({ viewport: { width: 1280, height: 860 }, deviceScaleFactor: 1.5 });
  const p = await desk.newPage();
  await semear(p);
  const shot = async (nome, rota, prep, opts = {}) => {
    try {
      if (rota) { await p.goto(BASE + rota); await p.waitForTimeout(900); }
      if (prep) await prep(p);
      await p.waitForTimeout(400);
      if (opts.inteira) await p.screenshot({ path: `${IMG}/${nome}.jpg`, type: 'jpeg', quality: 85 });
      else {
        const b = await p.locator('main').boundingBox();
        const sy = await p.evaluate(() => window.scrollY);
        const h = Math.min(opts.alt ?? 1000, b.height + 10);
        await p.screenshot({ path: `${IMG}/${nome}.jpg`, type: 'jpeg', quality: 85, fullPage: true, clip: { x: b.x, y: Math.max(b.y + sy, sy), width: b.width, height: h } });
      }
      console.log('ok', nome);
    } catch (e) { console.log('FALHA', nome, e.message.split('\n')[0]); }
  };
  const btn = (n) => p.getByRole('button', { name: n }).first();

  await shot('home', '/', null, { inteira: true });
  await shot('aprender', '/aprender');
  await shot('licoes', '/licoes');
  await shot('licao', '/licoes/desu');
  await shot('palavras', '/aprender/palavras');
  await shot('kanji', '/kanji');
  await shot('kanji-aprender', '/kanji', async () => { await btn(/Aprender \d+ kanji novos/).click(); });
  await shot('kana', '/kana');
  await shot('kana-teste', '/kana', async () => { await btn('Iniciar teste').click(); });
  await shot('praticar', '/praticar');
  await shot('hab-ler', '/praticar/ler');
  await shot('hab-ouvir', '/praticar/ouvir');
  await shot('hab-falar', '/praticar/falar');
  await shot('hab-escrever', '/praticar/escrever');
  await shot('leitura', '/leitura');
  await shot('leitura-texto', '/leitura/apresentacao', async () => { await p.locator('main button', { hasText: 'がくせいです' }).first().click(); });
  await shot('leitura-shadowing', '/leitura/apresentacao?modo=shadowing');
  await shot('diga', '/licoes/diga?licao=desu', async () => { await btn('Começar').click(); await p.waitForTimeout(300); await p.keyboard.press('Space'); });
  await shot('kakitori', '/licoes/kakitori');
  await shot('kana-desenho', '/kana?modo=desenho', async () => { await btn('Iniciar teste').click(); });
  await shot('revisar', '/revisar');
  await shot('revisao-frente', '/revisar', async () => { await btn('Começar revisão').click(); }, { alt: 560 });
  await shot('revisao-verso', null, async () => { await p.keyboard.press('Space'); }, { alt: 560 });
  await shot('revisao-4botoes', '/config?tab=config', async () => { await p.getByRole('button', { name: '4 botões' }).first().click(); await p.goto(BASE + '/revisar'); await p.waitForTimeout(700); await btn('Começar revisão').click(); await p.waitForTimeout(300); await p.keyboard.press('Space'); }, { alt: 560 });
  await p.goto(BASE + '/config?tab=config'); await p.getByRole('button', { name: '2 botões' }).first().click();
  await shot('pontos-fracos', '/pontos-fracos');
  await shot('quiz', '/licoes/quiz');
  await shot('meus-cards', '/flashcards');
  await shot('progresso', '/progresso');
  await shot('progresso-2', '/progresso', async () => { await p.evaluate(() => window.scrollTo(0, 900)); });
  await shot('config', '/config');
  await shot('config-pref', '/config?tab=config');
  await shot('home-escuro', '/config?tab=config', async () => { await btn('Escuro').click(); await p.goto(BASE + '/'); await p.waitForTimeout(800); }, { inteira: true });
  await p.goto(BASE + '/config?tab=config'); await btn('Claro').click();

  const mob = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const m = await mob.newPage();
  await semear(m);
  for (const [nome, rota] of [['m-home', '/'], ['m-praticar', '/praticar'], ['m-leitura', '/leitura/apresentacao']]) {
    await m.goto(BASE + rota); await m.waitForTimeout(900);
    if (nome === 'm-leitura') { await m.locator('main button', { hasText: 'がくせいです' }).first().click(); await m.waitForTimeout(400); }
    await m.screenshot({ path: `${IMG}/${nome}.jpg`, type: 'jpeg', quality: 85 }); console.log('ok', nome);
  }
  await browser.close();
})();
