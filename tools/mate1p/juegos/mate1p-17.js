/* Tema 17 · Docena y media docena · Kiki */
const GEN = [
  [
    () => { const t = pick(["d", "m", "dd"]);
      if (t === "d") return { prompt: "Una <b>docena</b> son…", say: "¿Cuántos son una docena?", scene: line(em("🥚", 12)), ans: 12, opts: [6, 10, 12, 20], cols: 4, why: "1 docena = 12.", hint: "Cuenta los huevos.",
        steps: T => [{ t: "Una <b>docena</b> es un grupo de <b>12</b> cosas. Contemos los huevos:", go: T.count(T.its()) }, { t: "Hay 12 huevos: eso es <b>una docena</b>. Una docena = <b>12</b>." }, { t: "Recuerda: los huevos se venden por docenas. Una docena = 12." }] };
      if (t === "m") return { prompt: "<b>Media docena</b> son…", say: "¿Cuántos son media docena?", scene: line(em("🥚", 6)), ans: 6, opts: [5, 6, 10, 12], cols: 4, why: "Media docena es la mitad de 12 = 6.", hint: "La mitad de 12.",
        steps: T => [{ t: "Una docena son 12. <b>Media</b> docena es la <b>mitad</b> de 12: repartimos 12 en 2 grupos iguales.", b: BOARD.share(12, 2, "🥚", { names: ["mitad", "mitad"] }) }, { t: "Cada mitad tiene 6. Contemos los huevos del dibujo:", go: T.count(T.its()) }, { t: "Media docena = <b>6</b>." }] };
      const k = between(2, 3); return { prompt: `¿Cuántas <b>docenas</b> de 🍩 hay?`, say: "¿Cuántas docenas hay?", scene: `<div class="dzs">${Array.from({ length: k }, () => `<div class="dz">${em("<span class='it'>🍩</span>", 12).join("")}</div>`).join("")}</div>`, ans: k, opts: numOpts(k, [12 * k, k + 1], 1), why: `${12 * k} = ${k} docenas.`, hint: "Cada fila tiene 12.",
        steps: T => [{ t: "Una <b>docena</b> son 12. Cada caja tiene 2 filas de 6: 6 + 6 = 12. ¡Cada caja es una docena!" }, { t: "Contamos las cajas:", go: T.count(T.its(".dz"), { cls: "t-big", say: k => k + (k > 1 ? " docenas" : " docena") }) }, { t: `Hay ${12 * k} donas = <b>${k}</b> docenas.`, b: BOARD.lines([Array(k).fill(12).join(" + ") + " = " + 12 * k]) }],
        err: w => w === 12 * k ? "Contaste las donas; piden cuántas <b>docenas</b> (grupos de 12)." : "" }; },
  ],
  [
    () => { const n = between(3, 10), e = pick(["✏️", "🧁", "🌹"]), ans = 12 - n;
      return { prompt: `¿Cuántos ${e} faltan para completar <b>una docena</b>?`, say: "¿Cuántos faltan para completar una docena?", scene: line(em(e, n)), ans, opts: numOpts(ans, [n, 10 - n, ans + 1], 0), why: `12 − ${n} = ${ans}.`, hint: "Una docena son 12.",
        steps: T => [
          { t: `Una docena son <b>12</b>. Tenemos ${n} ${e}. Ponemos casillas vacías ⬜ hasta llegar a 12:`, b: BOARD.groups([{ items: [...em(e, n), ...em("⬜", 12 - n)], c: "#f59e0b", lab: "12 casillas" }], { step: .15 }) },
          { t: `Contamos desde ${n} hasta 12, saltando de 1 en 1:`, b: BOARD.jumps(n, Array(12 - n).fill(1), { step: .35, min: Math.max(0, n - 1), max: 13 }) },
          { t: `Dimos ${ans} saltos: 12 − ${n} = <b>${ans}</b>.` }
        ],
        err: w => w === 10 - n ? "Completaste hasta 10, pero una docena son 12." : w === n ? "Esos son los que ya hay." : "" }; },
    () => { const t = pick(["2", "3", "1m", "2m"]), ans = { "2": 24, "3": 36, "1m": 18, "2m": 30 }[t], txt = { "2": "2 docenas", "3": "3 docenas", "1m": "1 docena y media", "2m": "2 docenas y media" }[t];
      return { prompt: `¿Cuántas unidades son <b>${txt}</b>?`, say: `¿Cuántas unidades son ${txt}?`, scene: "", ans, opts: numOpts(ans, [ans - 6, ans + 6, ans + 12], 1), why: `${txt} = ${ans}.`, hint: "1 docena = 12 y media docena = 6.",
        steps: T => { const dd = { "2": [2, 0], "3": [3, 0], "1m": [1, 1], "2m": [2, 1] }[t];
          return [
            { t: `Recordamos: 1 docena = <b>12</b> y media docena = <b>6</b>.` },
            { t: `${txt}: sumamos ${dd[0]} vez${dd[0] > 1 ? "es" : ""} 12${dd[1] ? " y una vez 6" : ""}.`, b: BOARD.lines([[...Array(dd[0]).fill(12), ...(dd[1] ? [6] : [])].join(" + ") + " = " + ans]) },
            { t: `${txt} = <b>${ans}</b> unidades.` }
          ]; } }; },
  ],
  [
    () => { const ar = 6, pal = 20, por = 2, ans = pal - ar * por;
      return { prompt: "En un parque hay <b>media docena</b> de árboles y <b>2 decenas</b> de palomas. Si en cada árbol se paran solo <b>2</b> palomas, ¿cuántas quedan volando?", say: "Hay media docena de árboles y 2 decenas de palomas. Si en cada árbol se paran 2 palomas, ¿cuántas quedan volando?", scene: line([...em("🌳", 6), ...em("🕊️", 4)]),
        ans, opts: numOpts(ans, [14, 12, 10], 0), why: `6 árboles × 2 = 12 palomas paradas. 20 − 12 = ${ans}.`, hint: "Media docena = 6 y 2 decenas = 20.",
        steps: T => [
          { t: `Subrayamos los datos: media docena = <b>6 árboles</b>; 2 decenas = <b>20 palomas</b>; en cada árbol se paran <b>2</b>.` },
          { t: `Ponemos 2 palomas en cada uno de los 6 árboles:`, b: BOARD.groups(Array.from({ length: 6 }, () => ({ items: ["🕊️", "🕊️"], c: "#16a34a", lab: "🌳" })), { step: .2 }) },
          { t: `Se pararon 2 + 2 + 2 + 2 + 2 + 2 = 12 palomas. Volando quedan 20 − 12 = <b>${ans}</b>.`, bAdd: BOARD.lines(["6 × 2 = 12", `20 − 12 = ${ans}`]) }
        ],
        err: w => w === 14 ? "Restaste 20 − 6, pero en cada árbol se paran 2 palomas." : w === 12 ? "Esas son las que se pararon; piden las que quedan volando." : "" }; },
    () => { const d = between(2, 3), m = between(1, 2), ans = 12 * d - 6 * m;
      return { prompt: `Tengo <b>${d} docenas</b> de galletas 🍪 y regalo <b>${m === 1 ? "media docena" : "dos medias docenas"}</b>. ¿Cuántas me quedan?`, say: `Tengo ${d} docenas de galletas y regalo ${m === 1 ? "media docena" : "dos medias docenas"}. ¿Cuántas me quedan?`, scene: "",
        ans, opts: numOpts(ans, [12 * d, 12 * d - 12 * m, ans + 6].filter(x => x !== ans), 0), why: `${12 * d} − ${6 * m} = ${ans}.`, hint: "Pasa todo a unidades primero.",
        steps: T => [
          { t: `Pasamos todo a unidades: ${d} docenas = ${Array(d).fill(12).join(" + ")} = <b>${12 * d}</b>; ${m === 1 ? "media docena = <b>6</b>" : "dos medias docenas = 6 + 6 = <b>12</b>"}.` },
          { t: `Quitamos lo que regalé:`, b: BOARD.lines([`${12 * d} − ${6 * m} = ${ans}`]) },
          { t: `Me quedan <b>${ans}</b> galletas.` }
        ],
        err: w => w === 12 * d ? "Olvidaste quitar lo que regalaste." : w === 12 * d - 12 * m ? "Media docena son 6, no 12." : "" }; },
    () => { const have = between(13, 21), ans = 24 - have;
      return { prompt: `En la cerca hay <b>${have}</b> conejitos. ¿Cuántos más deben entrar para completar <b>2 docenas</b>?`, say: `Hay ${have} conejitos. ¿Cuántos más deben entrar para completar 2 docenas?`, scene: scatter(em("🐇", have)), ans, opts: numOpts(ans, [12 - (have - 12), 24, ans + 1], 0), why: `2 docenas = 24. 24 − ${have} = ${ans}.`, hint: "2 docenas = 24.",
        steps: T => [
          { t: `2 docenas = 12 + 12 = <b>24</b> conejitos. Ya hay ${have}.` },
          { t: `Contamos desde ${have} hasta 24 (como cuando completas un vuelto):`, b: BOARD.jumps(have, Array(ans).fill(1), { step: .3 }) },
          { t: `Dimos ${ans} saltos: 24 − ${have} = <b>${ans}</b>.` }
        ],
        err: w => w === 24 ? "24 es el total; piden cuántos faltan." : "" }; },
  ]
];
lesson({ n: 17, title: "Docena y media docena", short: "Docena", char: "kiki", music: "huayno", deco: ["🥚", "🍩", "1️⃣2️⃣", "6️⃣"],
  hello: "¡Hola! Soy <b>Kiki</b> 🐧. Una <b>docena</b> son 12 y <b>media docena</b> son 6. ¡Como los huevos en su caja!",
  levels: LEVELS3(["Docena y media", "12 y 6"], ["Completar y convertir", "¿Cuántos faltan?"], ["", "Árboles, palomas y conejitos"]) }, GEN);
