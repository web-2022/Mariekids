// Prueba automática de los juegos: node tools/ejercicios-mentales/probar.js EM-A EM-B ...
// Requiere un servidor local en http://localhost:8765 con la raíz del sitio.
const { chromium } = require("playwright");
const fs = require("fs");
const OUT = process.env.SHOTS || "/tmp";
(async () => {
  const names = process.argv.slice(2);
  const b = await chromium.launch({ args: ["--autoplay-policy=no-user-gesture-required"] });
  let failures = 0;
  for (const name of names) {
    const p = await b.newPage({ viewport: { width: 390, height: 844 } });
    const errs = [];
    p.on("pageerror", e => errs.push(e.message));
    await p.goto(`http://localhost:8765/${name}.html`);
    await p.waitForFunction(() => window.MK, null, { timeout: 8000 });
    await p.waitForTimeout(300);
    await p.screenshot({ path: `${OUT}/${name}_inicio.png` });
    const checks = await p.evaluate(() => MK.cfg.check ? MK.cfg.check(1500) : ["(sin validador)"]);
    const L = await p.evaluate(() => MK.cfg.levels.length);
    const R = await p.evaluate(() => MK.cfg.rounds || 10);
    const lines = [];
    let hintOk = null;
    for (let lv = 0; lv < L; lv++) {
      await p.evaluate(l => MK.startLevel(l), lv);
      for (let r = 0; r < R; r++) {
        await p.waitForFunction(() => MK.ui._solve, null, { timeout: 20000 });
        if (r === 0 && lv === 0) {
          const hasMiss = await p.evaluate(() => !!MK.ui._miss);
          if (hasMiss) {
            await p.evaluate(() => MK.miss());
            await p.waitForTimeout(120);
            const fb = await p.$eval("#feedback", e => e.textContent);
            hintOk = /Pista|Intenta|Casi|pensando/.test(fb) ? fb : "SIN PISTA: " + fb;
            await p.screenshot({ path: `${OUT}/${name}_pista.png` });
          }
        }
        await p.waitForFunction(() => MK.ui._solve, null, { timeout: 20000 });
        await p.evaluate(() => MK.solve());
        await p.waitForFunction(() => MK.done, null, { timeout: 20000 });
        if (r === 1) { await p.waitForTimeout(450); await p.screenshot({ path: `${OUT}/${name}_L${lv + 1}.png` }); }
        await p.evaluate(() => MK.next());
      }
      await p.waitForTimeout(150);
      const end = await p.$eval("#endScore", e => e.textContent).catch(() => "SIN RESULTADO");
      lines.push(`N${lv + 1}: ${end}`);
    }
    const flag = await p.evaluate(s => localStorage.getItem("mk_topic_" + s + "_complete"), name);
    const ok = !errs.length && flag === "true" && (!checks.length || checks[0] === "(sin validador)");
    if (!ok) failures++;
    console.log(`${ok ? "✅" : "❌"} ${name} | ${lines.join(" | ")} | hecho=${flag} | validación: ${checks.length ? checks.slice(0, 4).join("; ") : "ok"} | pista: ${hintOk} | errores: ${errs.length ? errs.join(" / ") : 0}`);
    await p.close();
  }
  await b.close();
  process.exit(failures ? 1 : 0);
})();
