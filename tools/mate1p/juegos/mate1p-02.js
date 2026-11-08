/* Tema 2 · Conteo en grupos, filas y cuadrículas · Bimba 🐘 */
const OBJ = ["🧁", "🍎", "⭐", "🌸", "🐞", "🍪", "🎈", "🥕"];
const NOM = { "🧁": "pastelitos", "🍎": "manzanas", "⭐": "estrellas", "🌸": "flores", "🐞": "mariquitas", "🍪": "galletas", "🎈": "globos", "🥕": "zanahorias", "🥚": "huevos", "🖍️": "crayolas" };
const FEM = new Set(["🍎", "⭐", "🌸", "🐞", "🍪", "🥕", "🖍️"]);
const cu = e => FEM.has(e) ? "Cuántas" : "Cuántos";
const rowsBox = (e, r, c) => `<div class="rowsbox">${Array.from({ length: r }, () => line(em(e, c))).join("")}</div>`;
const boxes = (e, k, b, bc = 2) => `<div class="boxes">${Array.from({ length: b }, () => `<div class="box" style="--bc:${bc}">${em(`<span class="it">${e}</span>`, k).join("")}</div>`).join("")}</div>`;

const GEN = [
  // ---------- Nivel 1: filas y columnas
  [
    () => { const e = pick(OBJ), r = between(2, 4), c = between(2, 5), ans = r * c;
      return { prompt: `¿${cu(e)} ${e} hay en total?`, say: `¿${cu(e)} ${NOM[e]} hay en total?`, scene: rowsBox(e, r, c), ans, opts: numOpts(ans, [r + c, ans + c, ans - c], 1),
        why: `Hay ${r} filas de ${c}: ${Array(r).fill(c).join(" + ")} = ${ans}.`, hint: "Cuenta fila por fila y ve sumando.",
        steps: T => { const rows = T.its(".line"), last = rows.map(l => [...l.querySelectorAll(".it")].pop());
          return [
            { t: `Las ${NOM[e]} están ordenadas en <b>filas</b> (acostadas ↔). Contar fila por fila es más fácil que contar salteado.` },
            { t: `Contamos la primera fila:`, go: T.count([...rows[0].querySelectorAll(".it")]) },
            { t: `¡Todas las filas tienen ${c}! Entonces contamos de ${c} en ${c}, fila por fila:`, go: T.count(last, { label: k => String(k * c), say: k => String(k * c), cls: "t-big", ms: 1100 }) },
            { t: `Son ${r} filas de ${c}: ${Array(r).fill(c).join(" + ")} = <b>${ans}</b>.`, b: BOARD.lines([Array(r).fill(c).join(" + ") + " = " + ans]) }
          ]; },
        err: w => w === r + c ? `Sumaste ${r} filas más ${c}, pero hay que contar <b>todas</b> las ${NOM[e]}.` : w === ans + c ? "Contaste una fila de más." : w === ans - c ? "Te faltó contar una fila." : "" }; },
    () => { const e = pick(OBJ), r = between(2, 5), c = between(3, 6), askRows = rnd(2) === 0, ans = askRows ? r : c;
      return { prompt: askRows ? `¿Cuántas <b>filas</b> hay? (filas = acostadas ↔)` : `¿${cu(e)} ${e} hay en <b>cada fila</b>?`, say: askRows ? "¿Cuántas filas hay? Las filas van acostadas." : "¿Cuántos hay en cada fila?",
        scene: rowsBox(e, r, c), ans, opts: numOpts(ans, [askRows ? c : r, r * c], 1), why: askRows ? `Hay ${r} filas, una debajo de otra.` : `En cada fila hay ${c}.`, hint: "Una fila va de izquierda a derecha ↔.",
        steps: T => { const rows = T.its(".line");
          return askRows ? [
            { t: `Una <b>fila</b> va acostada ↔, de izquierda a derecha, como niños formados uno al lado del otro.` },
            { t: `Le ponemos un número a cada fila, de arriba hacia abajo:`, go: T.count(rows.map(l => l.querySelector(".it")), { cls: "t-big", say: k => "fila " + k }) },
            { t: `Hay <b>${r}</b> filas, una debajo de otra. Ojo: ${c} es lo que hay <b>en cada fila</b>, no el número de filas.` }
          ] : [
            { t: `Una <b>fila</b> va acostada ↔, de izquierda a derecha. Todas las filas tienen lo mismo.` },
            { t: `Miramos solo la primera fila y contamos:`, go: T.count([...rows[0].querySelectorAll(".it")]) },
            { t: `En cada fila hay <b>${c}</b> ${NOM[e]}. Ojo: ${r} es el número de filas, no lo que hay en cada una.` }
          ]; },
        err: w => w === r * c ? "Contaste todas, pero solo piden " + (askRows ? "las filas." : "una fila.") : "" }; },
  ],
  // ---------- Nivel 2: cuadrículas y cajas
  [
    () => { const c = between(3, 5), r = between(3, 4), tot = c * r, k = between(2, Math.min(7, tot - 3)), p = new Set(sample([...Array(tot).keys()], k)), noPaint = rnd(2) === 0, ans = noPaint ? tot - k : k;
      return { prompt: `¿Cuántos cuadritos <b>${noPaint ? "NO están pintados" : "están pintados"}</b>?`, say: `¿Cuántos cuadritos ${noPaint ? "no están pintados" : "están pintados"}?`, scene: gridSvg(c, r, p),
        ans, opts: numOpts(ans, [tot, noPaint ? k : tot - k, ans + 1], 1), why: noPaint ? `Hay ${tot} cuadritos y ${k} pintados: ${tot} − ${k} = ${ans}.` : `Hay ${k} cuadritos pintados.`, hint: noPaint ? "Cuenta todos los cuadritos blancos." : "Cuenta los cuadritos de color.",
        steps: T => { const P = T.of("P", "rect"), W = T.of("W", "rect"), si = noPaint ? W : P, no = noPaint ? P : W;
          return [
            { t: `Los cuadritos <b>pintados</b> tienen color. Los <b>no pintados</b> son blancos. Nos piden los ${noPaint ? "<b>NO pintados</b> (blancos)" : "<b>pintados</b>"}.` },
            { t: `Apagamos los que no nos piden para no confundirnos.`, go: d => { T.dim(no); setTimeout(d, 600); } },
            { t: `Contamos los cuadritos ${noPaint ? "blancos" : "pintados"}:`, go: T.count(si) },
            noPaint ? { t: `Comprobamos de otra forma: hay ${tot} cuadritos en total y ${k} pintados: ${tot} − ${k} = <b>${ans}</b>.`, b: BOARD.lines([`${tot} − ${k} = ${ans}`]) }
                    : { t: `Hay <b>${ans}</b> cuadritos pintados.` }
          ]; },
        err: w => w === tot ? "Contaste todos los cuadritos, pero solo piden " + (noPaint ? "los blancos." : "los pintados.") : w === (noPaint ? k : tot - k) ? "Contaste los del otro color." : "" }; },
    () => { const e = pick(["🥚", "🧁", "🍪", "🖍️"]), k = pick([2, 3, 4, 5, 6]), b = between(2, 4), ans = k * b;
      return { prompt: `Cada caja tiene la misma cantidad. ¿${cu(e)} ${e} hay en total?`, say: `¿${cu(e)} ${NOM[e]} hay en total en las cajas?`, scene: boxes(e, k, b, k > 4 ? 3 : 2), ans, opts: numOpts(ans, [k + b, ans - k, ans + k], 1),
        why: `${b} cajas de ${k}: ${Array(b).fill(k).join(" + ")} = ${ans}.`, hint: "Cuenta cuántos hay en una caja y suma para cada caja.",
        steps: T => { const bx = T.its(".box");
          return [
            { t: `Todas las cajas tienen la <b>misma cantidad</b>. Basta contar una caja:`, go: T.count([...bx[0].querySelectorAll(".it")]) },
            { t: `En cada caja hay ${k}. Ahora contamos de ${k} en ${k}, caja por caja:`, go: T.count(bx, { label: i => String(i * k), say: i => String(i * k), cls: "t-big", ms: 1100 }) },
            { t: `Son ${b} cajas de ${k}: ${Array(b).fill(k).join(" + ")} = <b>${ans}</b>.`, b: BOARD.lines([Array(b).fill(k).join(" + ") + " = " + ans]) }
          ]; },
        err: w => w === k + b ? `Sumaste ${k} + ${b}, pero hay ${b} cajas y <b>cada una</b> tiene ${k}.` : "" }; },
  ],
  // ---------- Nivel 3: tipo concurso
  [
    () => { const n = between(4, 6), diag = rnd(2) === 0, p = new Set(Array.from({ length: n }, (_, i) => i * n + (diag ? n - 1 - i : i))), ans = n * n - n;
      return { prompt: "¿Cuántos cuadritos del mismo tamaño <b>NO están pintados</b>?", say: "¿Cuántos cuadritos del mismo tamaño no están pintados?", scene: gridSvg(n, n, p, { cell: 30 }) + kid("bimba"),
        ans, opts: numOpts(ans, [n * n, n, ans + 1], 1), why: `Hay ${n} filas de ${n} = ${n * n} cuadritos. Pintados: ${n}. Sin pintar: ${n * n} − ${n} = ${ans}.`, hint: "Cuenta todos los cuadritos (fila por fila) y quita los pintados.",
        steps: T => { const all = T.its("rect"), last = all.filter(x => +x.dataset.c === n - 1);
          return [
            { t: `Primero contamos <b>todos</b> los cuadritos. Hay ${n} filas y cada fila tiene ${n}. Contamos de ${n} en ${n}:`, go: T.count(last, { label: i => String(i * n), say: i => String(i * n), ms: 1100 }) },
            { t: `En total hay <b>${n * n}</b> cuadritos. Los pintados forman una línea en diagonal: uno en cada fila. Son ${n}.`, go: d => { T.paint(T.of("P", "rect"), "#f59e0b"); setTimeout(d, 700); } },
            { t: `A todos les quitamos los pintados: ${n * n} − ${n} = <b>${ans}</b>.`, b: BOARD.lines([`${n} + ${n} + … = ${n * n} cuadritos`, `${n * n} − ${n} = ${ans}`]) }
          ]; },
        err: w => w === n * n ? "Ese es el total, pero hay que quitar los pintados." : w === n ? "Esos son los pintados; piden los que NO están pintados." : "" }; },
    () => { const k = pick([4, 6]), b = between(2, 3), suel = 2 * between(0, 2), tot = k * b + suel, ans = tot / 2;
      return { prompt: "¿Cuántos <b>pares</b> de huevos 🥚 hay?", say: "¿Cuántos pares de huevos hay? Un par son dos.", scene: boxes("🥚", k, b, k / 2) + (suel ? line(em("🥚", suel)) : ""), ans, opts: numOpts(ans, [tot, ans + 1, ans - 1], 1),
        why: `En total hay ${tot} huevos. Un par son 2: ${tot} huevos = ${ans} pares.`, hint: "Primero cuenta todos los huevos y luego agrúpalos de 2 en 2.",
        steps: T => [
          { t: `Un <b>par</b> son <b>2</b>. Vamos a juntar los huevos de 2 en 2, ¡también los que están sueltos!` },
          { t: `Formamos los pares:`, go: T.pairs(T.its(), { near: true, both: true, say: i => "par " + i }) },
          { t: `Hay ${tot} huevos y formamos <b>${ans}</b> pares (la mitad de ${tot}).` }
        ],
        err: w => w === tot ? "Esos son los huevos sueltos, pero piden <b>pares</b> (de 2 en 2)." : "" }; },
    () => { const e = pick(OBJ), r = between(3, 4), c = between(4, 5), falt = Array.from({ length: r }, () => rnd(3));
      if (!falt.some(Boolean)) falt[0] = 1;
      const ans = falt.reduce((a, b) => a + b, 0);
      return { prompt: `En cada fila debe haber <b>${c}</b> ${e}. ¿${cu(e)} <b>faltan</b> en total?`, say: `En cada fila debe haber ${c}. ¿${cu(e)} faltan en total?`,
        scene: `<div class="rowsbox">${falt.map(f => line([...em(e, c - f), ...em("<span style='opacity:.25'>⬜</span>", f)])).join("")}</div>`, ans, opts: numOpts(ans, [r * c - ans, ans + 1, c], 0),
        why: `Faltan ${falt.join(" + ")} = ${ans}.`, hint: "Mira cada fila: ¿cuántos espacios vacíos tiene?",
        steps: T => { const rows = T.its(".line");
          return [
            { t: `Cada fila debe tener ${c}. Los cuadritos ⬜ claritos son los espacios <b>vacíos</b>: ahí falta algo.` },
            { t: `Apagamos lo que sí está y contamos solo los espacios vacíos, fila por fila:`, go: d => { T.dim(T.of(e)); T.count(T.of("⬜"))(d); } },
            { t: `Lo que falta en cada fila: ${falt.join(" + ")} = <b>${ans}</b>.`, b: BOARD.lines(falt.map((f, i) => `Fila ${i + 1}: faltan ${f}`).concat([`Total: ${falt.join(" + ")} = ${ans}`]), { step: .7 }) }
          ]; },
        err: w => w === r * c - ans ? "Esos son los que sí están. Piden los que <b>faltan</b>." : "" }; },
  ]
];

MKGame({
  slug: "mate1p-02", title: "Conteo en grupos, filas y cuadrículas", short: "Filas y grupos", char: "bimba", music: B + "music-pop.mp3", home: HOME,
  theme: { bg: "linear-gradient(135deg,#fde68a,#fbcfe8 55%,#c4b5fd)", a1: "#f59e0b", a2: "#ec4899", ink: "#4a044e", title: "#db2777", soft: "#fce7f3", tile: "#fff7ed" },
  deco: ["🔲", "🧁", "🥚", "⭐"],
  hello: "¡Hola! Soy <b>Bimba</b> 🐘. Cuando hay muchas cosas, es más fácil contar <b>por filas y por grupos</b>.",
  intro: ["Cuenta fila por fila o caja por caja, y elige A, B, C o D."],
  champion: "¡Cuentas filas y grupos como una experta! 🏆",
  levels: [
    { title: "Filas", icon: "↔️", desc: "Contar por filas" },
    { title: "Cuadrículas y cajas", icon: "📦", desc: "Cuadritos pintados y cajas iguales" },
    { title: "Reto concurso", icon: "🏆", desc: "Cuadritos sin pintar, pares y faltantes" }
  ],
  check(n) { const bad = []; GEN.forEach((L, i) => L.forEach((g, j) => { for (let k = 0; k < n / 10; k++) checkQ(g(), bad, `N${i + 1}.${j + 1}`); })); return [...new Set(bad)]; },
  round(level, idx, ui) { ask(ui, pick(GEN[level])()); },
  onEnd: nextTopic(3)
});
