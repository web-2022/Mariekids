/* Tema 3 · Correspondencia entre número y cantidad · Kiki 🐧 */
const OBJ = ["🍎", "⭐", "🐟", "🎈", "🌸", "🍓", "🐞", "⚽"];
const PAL = ["cero", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez", "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve", "veinte"];
const grp = (e, n) => em(e, n).join("");

const GEN = [
  // ---------- Nivel 1: número ↔ cantidad
  [
    () => { const e = pick(OBJ), n = between(3, 10);
      return { prompt: "¿Qué <b>número</b> dice cuántos hay?", say: "¿Qué número dice cuántos hay?", scene: scatter(em(e, n)), ans: n, opts: numOpts(n, [n + 1, n - 1]),
        why: `Hay ${n}. El número ${n} dice cuántos hay.`, hint: "Cuenta uno por uno: el último número que dices es la respuesta.",
        steps: T => [
          { t: `Para saber qué número va, contamos ${e} una por una y le ponemos su número a cada una.` },
          { t: `¡Contemos juntos!`, go: T.count(T.its()) },
          { t: `El <b>último número</b> que dijimos es <b>${n}</b>. Ese número dice cuántas hay.` }
        ] }; },
    () => { const e = pick(OBJ), n = between(3, 9), ns = numOpts(n, [n + 1, n - 1, n + 2], 1).slice(0, 4);
      return { prompt: `¿Qué grupo tiene <b>${n}</b>?`, say: `¿Qué grupo tiene ${n}?`, scene: `<div class="big-num">${n}</div>`, ans: grp(e, n), opts: ns.map(k => grp(e, k)), cls: "grp", cols: 1,
        why: `Ese grupo tiene ${n}.`, hint: "Cuenta los objetos de cada alternativa.",
        steps: T => [
          { t: `El número <b>${n}</b> nos dice cuántas cosas debe tener el grupo: ni una más, ni una menos.` },
          { t: `Así se ven <b>${n}</b> ${e} contados uno por uno:`, b: BOARD.groups([{ n, e, c: "#f59e0b", lab: String(n) }], { step: .35 }) },
          { t: `Ahora cuenta cada grupo de las respuestas con tu dedito. El correcto es <b>el grupo que tiene ${n}</b>.` }
        ],
        ansTxt: `el grupo que tiene ${n}` }; },
  ],
  // ---------- Nivel 2: dados, cuadros de diez y palabras
  [
    () => { const a = between(1, 6), b = between(1, 6), ans = a + b;
      return { prompt: "¿Cuántos <b>puntos</b> hay en los dos dados?", say: "¿Cuántos puntos hay en total en los dos dados?", scene: `<div class="dice">${dieSvg(a, 70)}${dieSvg(b, 70)}</div>`, ans, opts: numOpts(ans, [ans + 1, ans - 1, a * b !== ans ? a * b : ans + 2], 2),
        why: `${a} + ${b} = ${ans} puntos.`, hint: "Cuenta los puntos del primer dado y sigue contando en el segundo.",
        steps: T => { const d = T.its(".dice svg");
          return [
            { t: `Cada puntito vale 1. Contamos los puntos del primer dado y <b>seguimos contando</b> en el segundo, sin volver a empezar.` },
            { t: `Primer dado:`, go: T.count([...d[0].querySelectorAll("circle")]) },
            { t: `Seguimos desde ${a} en el segundo dado:`, go: T.count([...d[1].querySelectorAll("circle")], { from: a + 1 }) },
            { t: `${a} + ${b} = <b>${ans}</b> puntos.`, b: BOARD.lines([`${a} + ${b} = ${ans}`]) }
          ]; },
        err: w => w === a * b ? "Multiplicaste, pero aquí hay que <b>juntar</b> los puntos." : "" }; },
    () => { const n = between(4, 19);
      return { prompt: "¿Qué número muestra el <b>cuadro de diez</b>?", say: "¿Qué número muestran las fichas rojas?", scene: `<div class="tfs">${tenFrame(n)}</div>`, ans: n, opts: numOpts(n, [n + 1, n - 1, n > 10 ? n - 10 : 10 - n], 1),
        why: n > 10 ? `Un cuadro lleno es 10, y ${n - 10} más: ${n}.` : `Hay ${n} fichas${n < 10 ? `; faltan ${10 - n} para 10` : ""}.`, hint: "Un cuadro lleno tiene 10.",
        steps: T => { const f = T.its(".tf"), red = i => [...f[i].querySelectorAll("span")].filter(x => x.textContent.includes("🔴"));
          return n > 10 ? [
            { t: `Un cuadro de diez tiene 10 casillas. El primer cuadro está <b>lleno</b>: ¡son 10! No hace falta contarlas.`, go: d => { T.badge(f[0], "10", "t-big"); tutSay("diez"); setTimeout(d, 900); } },
            { t: `Seguimos contando desde 10 en el segundo cuadro:`, go: T.count(red(1), { from: 11 }) },
            { t: `10 y ${n - 10} más son <b>${n}</b>.`, b: BOARD.du(n) }
          ] : [
            { t: `Un cuadro de diez tiene 10 casillas: 2 filas de 5. Cada ficha roja 🔴 vale 1.` },
            { t: `Contamos las fichas rojas:`, go: T.count(red(0)) },
            { t: `Hay <b>${n}</b> fichas.${n < 10 ? ` Las casillas vacías son ${10 - n}: ${n} + ${10 - n} = 10.` : ""}` }
          ]; },
        err: w => w === (n > 10 ? n - 10 : 10 - n) ? (n > 10 ? "Contaste solo el segundo cuadro. ¡El primero también vale 10!" : "Contaste las casillas vacías; piden las fichas rojas.") : "" }; },
    () => { const n = between(5, 20), asWord = rnd(2) === 0;
      const q = asWord
        ? { prompt: `¿Cómo se escribe con números?`, say: `¿Cómo se escribe ${PAL[n]} con números?`, scene: `<div class="word-num">${PAL[n]}</div>`, ans: n, opts: numOpts(n, [n + 1, n - 1, n + 10 <= 29 ? n + 10 : n - 2], 1),
            why: `${PAL[n]} = ${n}.`, hint: "Lee la palabra despacio." }
        : { prompt: `¿Cómo se lee el número <b>${n}</b>?`, say: `¿Cómo se lee este número?`, scene: `<div class="big-num">${n}</div>`, ans: PAL[n], opts: shuffle([...new Set([PAL[n], PAL[n - 1], PAL[Math.min(20, n + 1)], PAL[n > 10 ? n - 10 : n + 10] || PAL[n - 2]])]).slice(0, 4), cls: "grp", cols: 2,
            why: `${n} se lee «${PAL[n]}».`, hint: "Fíjate en las dos cifras del número." };
      return { ...q,
        steps: T => { const D = Math.floor(n / 10), U = n % 10;
          const como = n === 20 ? "«veinte» son 2 decenas: 10 + 10." : n === 10 ? "«diez» es una decena." : n < 10 ? `«${PAL[n]}» es un número de una sola cifra.` : n <= 15 ? `«${PAL[n]}» es diez y ${PAL[U]}: 10 + ${U}. Este nombre hay que aprenderlo de memoria.` : `«${PAL[n]}» se escucha «dieci» + «${PAL[U]}»: diez y ${PAL[U]}, 10 + ${U}.`;
          return asWord ? [
            { t: `Leemos la palabra despacio: «<b>${PAL[n]}</b>».` },
            { t: como, b: n >= 10 ? BOARD.du(n) : BOARD.groups([{ n, e: "●", c: "#3b82f6", lab: String(n) }]) },
            { t: `Entonces «${PAL[n]}» se escribe <b>${n}</b>.` }
          ] : [
            { t: `El número <b>${n}</b>${n >= 10 ? ` tiene ${D} decena${D > 1 ? "s" : ""} y ${U} unidad${U === 1 ? "" : "es"}` : " tiene una sola cifra"}.`, b: n >= 10 ? BOARD.du(n) : "" },
            { t: como },
            { t: `${n} se lee «<b>${PAL[n]}</b>».` }
          ]; } }; },
  ],
  // ---------- Nivel 3: tipo concurso
  [
    () => { const m = between(1, 3), d = between(0, 4), ans = 5 * m + d;
      return { prompt: "Si 🖐️ vale <b>5</b> y ☝️ vale <b>1</b>, ¿qué número se muestra?", say: "Si una mano abierta vale 5 y un dedito vale 1, ¿qué número se muestra?", scene: line([...em("🖐️", m), ...em("☝️", d)]), ans, opts: numOpts(ans, [m + d, ans + 5, ans - 1], 1),
        why: `${m} manos = ${5 * m}${d ? ` y ${d} dedos = ${d}` : ""}. Total: ${ans}.`, hint: "Cuenta de 5 en 5 las manos y luego suma los dedos.",
        steps: T => { const its = T.its(), M = its.filter(x => x.textContent.includes("🖐")), Dd = its.filter(x => x.textContent.includes("☝"));
          return [
            { t: `Una mano abierta 🖐️ tiene 5 dedos, por eso vale <b>5</b>. Un dedito ☝️ vale <b>1</b>.` },
            { t: `Contamos las manos de 5 en 5:`, go: T.count(M, { label: k => String(5 * k), say: k => String(5 * k), cls: "t-big", ms: 1100 }) },
            d > 0 ? { t: `Y seguimos de 1 en 1 con los deditos:`, go: T.count(Dd, { from: 5 * m + 1 }) } : null,
            { t: `${m} mano${m > 1 ? "s" : ""} = ${5 * m}${d ? ` y ${d} dedo${d > 1 ? "s" : ""} = ${d}` : ""}. Total: <b>${ans}</b>.`, b: BOARD.lines([`${Array(m).fill(5).join(" + ")}${d ? " + " + Array(d).fill(1).join(" + ") : ""} = ${ans}`]) }
          ]; },
        err: w => w === m + d ? "Contaste cada mano como 1, pero ¡cada mano vale 5!" : "" }; },
    () => { const k = between(4, 8), g = between(2, k - 1), e = pick(["🎈", "🍦", "🎁", "🍭"]), who = sample(["👧", "👦", "🧒", "👧🏽", "👦🏻", "🧒🏾", "👧🏻", "👦🏽"], k), ans = k - g;
      return { prompt: `Cada niño debe recibir <b>un</b> ${e}. ¿Cuántos ${e} <b>faltan</b>?`, say: "Cada niño debe recibir uno. ¿Cuántos faltan?", scene: line(who) + line(em(e, g)), ans, opts: numOpts(ans, [k, g, ans + 1], 0),
        why: `Hay ${k} niños y ${g} ${e}. Faltan ${k} − ${g} = ${ans}.`, hint: "Une cada niño con un objeto. ¿Cuántos niños se quedan sin nada?",
        steps: T => { const ls = T.its(".line"), kids = [...ls[0].querySelectorAll(".it")], obj = [...ls[1].querySelectorAll(".it")], par = [];
          obj.forEach((x, i) => par.push(kids[i], x));
          return [
            { t: `Cada niño debe recibir <b>un</b> ${e}. Le damos uno a cada niño, en orden:`, go: T.pairs(par, { both: true }) },
            { t: `Los niños que se quedaron <b>sin</b> ${e} nos dicen cuántos faltan. Contémoslos:`, go: T.count(kids.slice(g), { cls: "t-big" }) },
            { t: `Hay ${k} niños y ${g} ${e}: ${k} − ${g} = <b>${ans}</b>. Faltan ${ans}.`, b: BOARD.lines([`${k} − ${g} = ${ans}`]) }
          ]; },
        err: w => w === k ? "Esos son todos los niños; piden los que se quedan sin nada." : w === g ? `Esos son los ${e} que ya hay; piden los que faltan.` : "" }; },
    () => { const n = between(6, 15), e = pick(OBJ), opts = numOpts(n, [n + 1, n - 1, n + 2], 1).slice(0, 4);
      return { prompt: "¿Qué grupo tiene la <b>misma cantidad</b> que el número de ⭐ del recuadro?", say: "Cuenta las estrellas. ¿Qué grupo tiene la misma cantidad?", scene: `<div class="rowsbox" style="display:block">${scatter(em("⭐", n))}</div>`,
        ans: grp(e, n), opts: opts.map(k => grp(e, k)), cls: "grp", cols: 1, why: `Hay ${n} estrellas, y ese grupo también tiene ${n}.`, hint: "Primero cuenta las estrellas. Después busca el grupo con la misma cantidad.",
        steps: T => [
          { t: `Primero contamos las estrellas del recuadro:`, go: T.count(T.its()) },
          { t: `Hay <b>${n}</b> estrellas. Ahora buscamos el grupo que tenga <b>${n}</b>: ni uno más, ni uno menos.`, b: BOARD.groups([{ n, e, c: "#22c55e", lab: String(n) }], { step: .25 }) },
          { t: `Cuenta cada grupo de las respuestas. El correcto es <b>el grupo que tiene ${n}</b>.` }
        ],
        ansTxt: `el grupo que tiene ${n}` }; },
  ]
];

MKGame({
  slug: "mate1p-03", title: "Correspondencia entre número y cantidad", short: "Número y cantidad", char: "kiki", music: B + "music-ukelele.mp3", home: HOME,
  theme: { bg: "linear-gradient(135deg,#bbf7d0,#a5f3fc 55%,#bfdbfe)", a1: "#10b981", a2: "#0ea5e9", ink: "#064e3b", title: "#059669", soft: "#d1fae5", tile: "#f0fdfa" },
  deco: ["🔢", "🎲", "🖐️", "⭐"],
  hello: "¡Hola! Soy <b>Kiki</b> 🐧. Cada <b>número</b> dice cuántas cosas hay. ¡Vamos a unir números y cantidades!",
  intro: ["Cuenta con cuidado y elige A, B, C o D."],
  champion: "¡Unes números y cantidades como una campeona! 🏆",
  levels: [
    { title: "Número y cantidad", icon: "🔢", desc: "¿Cuántos hay? ¿Qué grupo tiene…?" },
    { title: "Dados y cuadros de diez", icon: "🎲", desc: "Puntos, fichas y números en palabras" },
    { title: "Reto concurso", icon: "🏆", desc: "Manos y dedos, faltan y misma cantidad" }
  ],
  check(n) { const bad = []; GEN.forEach((L, i) => L.forEach((g, j) => { for (let k = 0; k < n / 10; k++) checkQ(g(), bad, `N${i + 1}.${j + 1}`); })); return [...new Set(bad)]; },
  round(level, idx, ui) { ask(ui, pick(GEN[level])()); },
  onEnd: nextTopic(4)
});
