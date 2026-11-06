/* Tema 3 · Correspondencia entre número y cantidad · Kiki 🐧 */
const OBJ = ["🍎", "⭐", "🐟", "🎈", "🌸", "🍓", "🐞", "⚽"];
const PAL = ["cero", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez", "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve", "veinte"];
const grp = (e, n) => em(e, n).join("");

const GEN = [
  // ---------- Nivel 1: número ↔ cantidad
  [
    () => { const e = pick(OBJ), n = between(3, 10);
      return { prompt: "¿Qué <b>número</b> dice cuántos hay?", say: "¿Qué número dice cuántos hay?", scene: scatter(em(e, n)), ans: n, opts: numOpts(n, [n + 1, n - 1]),
        why: `Hay ${n}. El número ${n} dice cuántos hay.`, hint: "Cuenta uno por uno: el último número que dices es la respuesta." }; },
    () => { const e = pick(OBJ), n = between(3, 9), ns = numOpts(n, [n + 1, n - 1, n + 2], 1).slice(0, 4);
      return { prompt: `¿Qué grupo tiene <b>${n}</b>?`, say: `¿Qué grupo tiene ${n}?`, scene: `<div class="big-num">${n}</div>`, ans: grp(e, n), opts: ns.map(k => grp(e, k)), cls: "grp", cols: 1,
        why: `Ese grupo tiene ${n}.`, hint: "Cuenta los objetos de cada alternativa." }; },
  ],
  // ---------- Nivel 2: dados, cuadros de diez y palabras
  [
    () => { const a = between(1, 6), b = between(1, 6), ans = a + b;
      return { prompt: "¿Cuántos <b>puntos</b> hay en los dos dados?", say: "¿Cuántos puntos hay en total en los dos dados?", scene: `<div class="dice">${dieSvg(a, 70)}${dieSvg(b, 70)}</div>`, ans, opts: numOpts(ans, [ans + 1, ans - 1, a * b !== ans ? a * b : ans + 2], 2),
        why: `${a} + ${b} = ${ans} puntos.`, hint: "Cuenta los puntos del primer dado y sigue contando en el segundo." }; },
    () => { const n = between(4, 19);
      return { prompt: "¿Qué número muestra el <b>cuadro de diez</b>?", say: "¿Qué número muestran las fichas rojas?", scene: `<div class="tfs">${tenFrame(n)}</div>`, ans: n, opts: numOpts(n, [n + 1, n - 1, n > 10 ? n - 10 : 10 - n], 1),
        why: n > 10 ? `Un cuadro lleno es 10, y ${n - 10} más: ${n}.` : `Hay ${n} fichas${n < 10 ? `; faltan ${10 - n} para 10` : ""}.`, hint: "Un cuadro lleno tiene 10." }; },
    () => { const n = between(5, 20), asWord = rnd(2) === 0;
      return asWord
        ? { prompt: `¿Cómo se escribe con números?`, say: `¿Cómo se escribe ${PAL[n]} con números?`, scene: `<div class="word-num">${PAL[n]}</div>`, ans: n, opts: numOpts(n, [n + 1, n - 1, n + 10 <= 29 ? n + 10 : n - 2], 1),
            why: `${PAL[n]} = ${n}.`, hint: "Lee la palabra despacio." }
        : { prompt: `¿Cómo se lee el número <b>${n}</b>?`, say: `¿Cómo se lee este número?`, scene: `<div class="big-num">${n}</div>`, ans: PAL[n], opts: shuffle([...new Set([PAL[n], PAL[n - 1], PAL[Math.min(20, n + 1)], PAL[n > 10 ? n - 10 : n + 10] || PAL[n - 2]])]).slice(0, 4), cls: "grp", cols: 2,
            why: `${n} se lee «${PAL[n]}».`, hint: "Fíjate en las dos cifras del número." };
    },
  ],
  // ---------- Nivel 3: tipo concurso
  [
    () => { const m = between(1, 3), d = between(0, 4), ans = 5 * m + d;
      return { prompt: "Si 🖐️ vale <b>5</b> y ☝️ vale <b>1</b>, ¿qué número se muestra?", say: "Si una mano abierta vale 5 y un dedito vale 1, ¿qué número se muestra?", scene: line([...em("🖐️", m), ...em("☝️", d)]), ans, opts: numOpts(ans, [m + d, ans + 5, ans - 1], 1),
        why: `${m} manos = ${5 * m}${d ? ` y ${d} dedos = ${d}` : ""}. Total: ${ans}.`, hint: "Cuenta de 5 en 5 las manos y luego suma los dedos." }; },
    () => { const k = between(4, 8), g = between(2, k - 1), e = pick(["🎈", "🍦", "🎁", "🍭"]), who = sample(["👧", "👦", "🧒", "👧🏽", "👦🏻", "🧒🏾", "👧🏻", "👦🏽"], k), ans = k - g;
      return { prompt: `Cada niño debe recibir <b>un</b> ${e}. ¿Cuántos ${e} <b>faltan</b>?`, say: "Cada niño debe recibir uno. ¿Cuántos faltan?", scene: line(who) + line(em(e, g)), ans, opts: numOpts(ans, [k, g, ans + 1], 0),
        why: `Hay ${k} niños y ${g} ${e}. Faltan ${k} − ${g} = ${ans}.`, hint: "Une cada niño con un objeto. ¿Cuántos niños se quedan sin nada?" }; },
    () => { const n = between(6, 15), e = pick(OBJ), opts = numOpts(n, [n + 1, n - 1, n + 2], 1).slice(0, 4);
      return { prompt: "¿Qué grupo tiene la <b>misma cantidad</b> que el número de ⭐ del recuadro?", say: "Cuenta las estrellas. ¿Qué grupo tiene la misma cantidad?", scene: `<div class="rowsbox">${scatter(em("⭐", n))}</div>`,
        ans: grp(e, n), opts: opts.map(k => grp(e, k)), cls: "grp", cols: 1, why: `Hay ${n} estrellas, y ese grupo también tiene ${n}.`, hint: "Primero cuenta las estrellas. Después busca el grupo con la misma cantidad." }; },
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
