/* Tema 12 · Unidades, decenas y centenas · Pipo */

const GEN = [
  [
    () => { const t = pick(["d2u", "u2d"]); const d = between(1, 9);
      return t === "d2u" ? { prompt: `<b>${d} decena${d > 1 ? "s" : ""}</b> = ¿cuántas unidades?`, say: `${d} decenas, ¿cuántas unidades son?`, scene: line(em("🔟", d)), ans: 10 * d, opts: numOpts(10 * d, [d, 10 * d + 1, d + 10], 0), why: `Cada decena es 10: ${d} × 10 = ${10 * d}.`, hint: "1 decena = 10 unidades." }
        : { prompt: `<b>${10 * d} unidades</b> = ¿cuántas decenas?`, say: `${10 * d} unidades, ¿cuántas decenas son?`, scene: "", ans: d, opts: numOpts(d, [10 * d, d + 1, d + 10], 1), why: `${10 * d} = ${d} grupos de 10.`, hint: "Agrupa de 10 en 10." }; },
    () => { const d = between(1, 4), u = between(1, 9), ans = 10 * d + u;
      return { prompt: "¿Qué número forman? (🔟 = 1 decena, 🟢 = 1 unidad)", say: "Cada diez es una decena y cada bolita es una unidad. ¿Qué número forman?", scene: line([...em("🔟", d), ...em("🟢", u)]), ans, opts: numOpts(ans, [d + u, 10 * u + d, ans + 10], 0),
        why: `${d} decenas y ${u} unidades = ${ans}.`, hint: "Cuenta las decenas de 10 en 10 y luego suma las unidades." }; },
  ],
  [
    () => { const d = between(1, 9), u = between(0, 9), ans = 10 * d + u;
      return { prompt: `¿Qué número es <b>${d}D ${u}U</b>?`, say: `${d} decenas y ${u} unidades, ¿qué número es?`, scene: `<table class="tbl"><tr><th>D</th><th>U</th></tr><tr><td>${d}</td><td>${u}</td></tr></table>`, ans, opts: numOpts(ans, [10 * u + d, d + u, ans + 10], 0),
        why: `${d}D ${u}U = ${10 * d} + ${u} = ${ans}.`, hint: "D = decenas (de 10 en 10), U = unidades." }; },
    () => { const c = between(1, 9), t = rnd(2), ans = t ? 100 * c : 10 * c;
      return { prompt: t ? `<b>${c} centena${c > 1 ? "s" : ""}</b> = ¿cuántas unidades?` : `<b>${c} centena${c > 1 ? "s" : ""}</b> = ¿cuántas decenas?`, say: t ? `${c} centenas, ¿cuántas unidades son?` : `${c} centenas, ¿cuántas decenas son?`, scene: `<div class="legend">1 C = 10 D = 100 U</div>`,
        ans, opts: numOpts(ans, t ? [10 * c, c, 1000 * c] : [100 * c, c, c + 10], 1), why: t ? `${c} × 100 = ${ans}.` : `Cada centena tiene 10 decenas: ${c} × 10 = ${ans}.`, hint: "1 centena = 10 decenas = 100 unidades." }; },
  ],
  [
    () => { const d = between(3, 5), u = between(2, 8), m = 10 * d + u, nar = pick([20, 18, 24]), ans = m - 6 + nar - 6;
      return { prompt: `Adrián tiene <b>${d}D ${u}U</b> manzanas y <b>${nar}</b> naranjas. Si vende <b>media docena</b> de cada grupo, ¿cuántas frutas le quedan en total?`, say: `Adrián tiene ${d} decenas y ${u} unidades de manzanas y ${nar} naranjas. Si vende media docena de cada una, ¿cuántas frutas le quedan?`, scene: "",
        ans, opts: numOpts(ans, [m + nar - 6, m + nar, ans + 6], 0), why: `Manzanas: ${m} − 6 = ${m - 6}. Naranjas: ${nar} − 6 = ${nar - 6}. Total: ${ans}.`, hint: "Media docena = 6. Quita 6 a cada grupo." }; },
    () => { const n = between(11, 19), ans = n - 10;
      return { prompt: `Panchito tiene <b>${n}</b> cubitos. ¿Cuántos debe quitar para que le quede <b>una decena</b>?`, say: `Tiene ${n} cubitos. ¿Cuántos debe quitar para que le quede una decena?`, scene: line(em("🧊", n)), ans, opts: numOpts(ans, [n, 10, ans + 1], 0),
        why: `Una decena = 10. ${n} − 10 = ${ans}.`, hint: "Una decena son 10." }; },
  ]
];
lesson({ n: 12, title: "Unidades, decenas y centenas", short: "U, D y C", char: "pipo", music: "lofi", deco: ["🔟", "💯", "🟢", "🧱"],
  hello: "¡Hola! Soy <b>Pipo</b> 🐧. 10 unidades forman una <b>decena</b> y 10 decenas forman una <b>centena</b>.",
  levels: LEVELS3(["Decenas", "Grupos de 10"], ["D, U y centenas", "Tablas de valor"], ["", "Problemas con decenas y media docena"]) }, GEN);
