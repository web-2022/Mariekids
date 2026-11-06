/* Tema 17 · Docena y media docena · Kiki */
const GEN = [
  [
    () => { const t = pick(["d", "m", "dd"]);
      if (t === "d") return { prompt: "Una <b>docena</b> son…", say: "¿Cuántos son una docena?", scene: line(em("🥚", 12)), ans: 12, opts: [6, 10, 12, 20], cols: 4, why: "1 docena = 12.", hint: "Cuenta los huevos." };
      if (t === "m") return { prompt: "<b>Media docena</b> son…", say: "¿Cuántos son media docena?", scene: line(em("🥚", 6)), ans: 6, opts: [5, 6, 10, 12], cols: 4, why: "Media docena es la mitad de 12 = 6.", hint: "La mitad de 12." };
      const k = between(2, 3); return { prompt: `¿Cuántas <b>docenas</b> de 🍩 hay?`, say: "¿Cuántas docenas hay?", scene: `<div class="rowsbox">${Array.from({ length: k }, () => line(em("🍩", 12), "small")).join("")}</div>`, ans: k, opts: numOpts(k, [12 * k, k + 1], 1), why: `${12 * k} = ${k} docenas.`, hint: "Cada fila tiene 12." }; },
  ],
  [
    () => { const n = between(3, 10), e = pick(["✏️", "🧁", "🌹"]), ans = 12 - n;
      return { prompt: `¿Cuántos ${e} faltan para completar <b>una docena</b>?`, say: "¿Cuántos faltan para completar una docena?", scene: line(em(e, n)), ans, opts: numOpts(ans, [n, 10 - n, ans + 1], 0), why: `12 − ${n} = ${ans}.`, hint: "Una docena son 12." }; },
    () => { const t = pick(["2", "3", "1m", "2m"]), ans = { "2": 24, "3": 36, "1m": 18, "2m": 30 }[t], txt = { "2": "2 docenas", "3": "3 docenas", "1m": "1 docena y media", "2m": "2 docenas y media" }[t];
      return { prompt: `¿Cuántas unidades son <b>${txt}</b>?`, say: `¿Cuántas unidades son ${txt}?`, scene: "", ans, opts: numOpts(ans, [ans - 6, ans + 6, ans + 12], 1), why: `${txt} = ${ans}.`, hint: "1 docena = 12 y media docena = 6." }; },
  ],
  [
    () => { const ar = 6, pal = 20, por = 2, ans = pal - ar * por;
      return { prompt: "En un parque hay <b>media docena</b> de árboles y <b>2 decenas</b> de palomas. Si en cada árbol se paran solo <b>2</b> palomas, ¿cuántas quedan volando?", say: "Hay media docena de árboles y 2 decenas de palomas. Si en cada árbol se paran 2 palomas, ¿cuántas quedan volando?", scene: line([...em("🌳", 6), ...em("🕊️", 4)]),
        ans, opts: numOpts(ans, [14, 12, 10], 0), why: `6 árboles × 2 = 12 palomas paradas. 20 − 12 = ${ans}.`, hint: "Media docena = 6 y 2 decenas = 20." }; },
    () => { const d = between(2, 3), m = between(1, 2), ans = 12 * d - 6 * m;
      return { prompt: `Tengo <b>${d} docenas</b> de galletas 🍪 y regalo <b>${m === 1 ? "media docena" : "dos medias docenas"}</b>. ¿Cuántas me quedan?`, say: `Tengo ${d} docenas de galletas y regalo ${m === 1 ? "media docena" : "dos medias docenas"}. ¿Cuántas me quedan?`, scene: "",
        ans, opts: numOpts(ans, [12 * d, 12 * d - 12 * m, ans + 6].filter(x => x !== ans), 0), why: `${12 * d} − ${6 * m} = ${ans}.`, hint: "Pasa todo a unidades primero." }; },
    () => { const have = between(13, 21), ans = 24 - have;
      return { prompt: `En la cerca hay <b>${have}</b> conejitos. ¿Cuántos más deben entrar para completar <b>2 docenas</b>?`, say: `Hay ${have} conejitos. ¿Cuántos más deben entrar para completar 2 docenas?`, scene: scatter(em("🐇", have)), ans, opts: numOpts(ans, [12 - (have - 12), 24, ans + 1], 0), why: `2 docenas = 24. 24 − ${have} = ${ans}.`, hint: "2 docenas = 24." }; },
  ]
];
lesson({ n: 17, title: "Docena y media docena", short: "Docena", char: "kiki", music: "huayno", deco: ["🥚", "🍩", "1️⃣2️⃣", "6️⃣"],
  hello: "¡Hola! Soy <b>Kiki</b> 🐧. Una <b>docena</b> son 12 y <b>media docena</b> son 6. ¡Como los huevos en su caja!",
  levels: LEVELS3(["Docena y media", "12 y 6"], ["Completar y convertir", "¿Cuántos faltan?"], ["", "Árboles, palomas y conejitos"]) }, GEN);
