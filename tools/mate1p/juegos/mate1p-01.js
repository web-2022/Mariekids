/* Tema 1 · Conteo visual de objetos · Tito 🤖 */
const OBJ = ["🍎", "🍓", "⚽", "🌟", "🐞", "🎈", "🍌", "🚗", "🐤", "🧁", "🌸", "🍪"];
const ANIMALES = [["🐶", "perro", 4], ["🐱", "gato", 4], ["🐰", "conejo", 4], ["🐔", "gallina", 2], ["🦜", "loro", 2], ["🐤", "pollito", 2], ["🐷", "chanchito", 4]];
const PL = { "🍎": "manzanas", "🍓": "fresas", "⚽": "pelotas", "🌟": "estrellas", "🐞": "mariquitas", "🎈": "globos", "🍌": "plátanos", "🚗": "carritos", "🐤": "pollitos", "🧁": "pastelitos", "🌸": "flores", "🍪": "galletas", "🧦": "medias", "🎲": "dados", "🐟": "peces" };

const MASC = new Set(["🍌", "🚗", "🐤", "🧁", "🎈", "🎲", "🐟", "🧦"]);
const cu = e => MASC.has(e) ? "Cuántos" : "Cuántas";   // ¿Cuántos plátanos? / ¿Cuántas fresas?
const GEN = [
  // ---------- Nivel 1: contar lo que veo
  [
    () => { const e = pick(OBJ), n = between(4, 10);
      return { prompt: `¿${cu(e)} <b>${PL[e]}</b> hay? ${e}`, say: `¿${cu(e)} ${PL[e]} hay?`, scene: scatter(em(e, n)), ans: n, opts: numOpts(n, [n + 1, n - 1, n + 2]),
        why: `Hay ${n} ${PL[e]}. Contamos una por una sin repetir.`, hint: "Toca con tu dedo cada una mientras cuentas." }; },
    () => { const [a, b] = sample(OBJ, 2), na = between(3, 9), nb = between(2, 6);
      return { prompt: `¿${cu(a)} <b>${PL[a]}</b> hay? ${a}`, say: `Hay ${PL[a]} y ${PL[b]}. ¿${cu(a)} ${PL[a]} hay?`, scene: scatter(shuffle([...em(a, na), ...em(b, nb)])), ans: na, opts: numOpts(na, [na + nb, nb, na + 1]),
        why: `Hay ${na} ${PL[a]}. ${MASC.has(b) ? "Los" : "Las"} ${PL[b]} no se cuentan.`, hint: `Cuenta solo ${MASC.has(a) ? "los" : "las"} ${PL[a]}.` }; },
  ],
  // ---------- Nivel 2: contar con una condición
  [
    () => { const r = between(2, 5), l = between(2, 5), dirs = shuffle([...Array(r).fill(1), ...Array(l).fill(-1)]), asksRight = rnd(2) === 0, ans = asksRight ? r : l;
      return { prompt: `¿Cuántos peces nadan hacia la <b>${asksRight ? "derecha 👉" : "izquierda 👈"}</b>?`, say: `¿Cuántos peces nadan hacia la ${asksRight ? "derecha" : "izquierda"}?`,
        scene: `<div class="fishes">${dirs.map(d => fishSvg(d, pick(["#38bdf8", "#fb923c", "#a78bfa", "#4ade80"]))).join("")}</div>`, ans, opts: numOpts(ans, [r + l, asksRight ? l : r]),
        why: `${ans} peces miran hacia la ${asksRight ? "derecha" : "izquierda"}: su cabeza (con el ojo) está de ese lado.`, hint: "Fíjate hacia dónde está la cabeza con el ojito." }; },
    () => { const L = between(3, 8), R = between(3, 8), who = pick(["tito", "lula", "pipo", "kiki"]), e = pick(["🔵", "🟠", "🟢", "🟡"]), leftQ = rnd(2) === 0, ans = leftQ ? L : R;
      return { prompt: `¿Cuántas bolitas hay del lado <b>${leftQ ? "👈 izquierdo" : "derecho 👉"}</b> de ${NAME(who)}?`, say: `¿Cuántas bolitas hay del lado ${leftQ ? "izquierdo" : "derecho"} de ${NAME(who)}?`,
        scene: `<div class="sides"><div class="side"><span class="lab">👈 izquierda</span>${em(e, L).join("")}</div>${kid(who)}<div class="side"><span class="lab">derecha 👉</span>${em(e, R).join("")}</div></div>`,
        ans, opts: numOpts(ans, [L + R, leftQ ? R : L]), why: `Del lado ${leftQ ? "izquierdo" : "derecho"} hay ${ans} bolitas.`, hint: `Mira solo el lado ${leftQ ? "👈 izquierdo" : "derecho 👉"}.` }; },
    () => { const [f1, f2] = sample(["🍎", "🍌", "🍓", "🍐", "🍇"], 2), o = pick(["🚗", "⚽", "🎈"]), a = between(2, 5), b = between(2, 5), c = between(2, 4), ans = a + b;
      return { prompt: "¿Cuántas <b>frutas</b> hay en total?", say: "¿Cuántas frutas hay en total?", scene: scatter(shuffle([...em(f1, a), ...em(f2, b), ...em(o, c)])), ans, opts: numOpts(ans, [ans + c, a, b]),
        why: `${a} + ${b} = ${ans} frutas. ${o} no es fruta.`, hint: "Cuenta todas las frutas, pero no lo que no es fruta." }; },
  ],
  // ---------- Nivel 3: tipo concurso
  [
    () => { const an = sample(ANIMALES, 3).map(([e, nm, p]) => [e, nm, p, between(1, 3)]), ans = an.reduce((s, x) => s + x[2] * x[3], 0);
      const txt = an.map(x => `${x[3]} ${x[1]}${x[3] > 1 ? (x[1].endsWith("n") ? "es" : "s") : ""}`).join(", ").replace(/, ([^,]*)$/, " y $1");
      return { prompt: `¿Cuántas <b>patas</b> hay en total?`, say: `¿Cuántas patas hay en total en ${txt}?`, scene: line(an.flatMap(x => em(x[0], x[3]))) + `<div class="legend">${txt}</div>`,
        ans, opts: numOpts(ans, [an.reduce((s, x) => s + x[3], 0) * 4, an.reduce((s, x) => s + x[3], 0) * 2, ans + 2]),
        why: an.map(x => `${x[3]} ${x[0]} → ${x[2] * x[3]}`).join(" · ") + ` · Total: ${ans} patas.`, hint: "Las aves tienen 2 patas y los otros animales tienen 4." }; },
    () => { const e = pick(["🧦", "👟", "🧤", "🥚"]), n = 2 * between(3, 8), ans = n / 2;
      return { prompt: `¿Cuántos <b>pares</b> de ${e} hay?`, say: "¿Cuántos pares hay? Un par son dos.", scene: scatter(em(e, n)), ans, opts: numOpts(ans, [n, ans + 1, ans - 1], 1),
        why: `Hay ${n}. Un par son 2, entonces hay ${ans} pares.`, hint: "Un par son DOS. Agrupa de dos en dos." }; },
    () => { const d = 2 * between(2, 6), o1 = between(2, 4), o2 = between(1, 3), ans = d / 2;
      return { prompt: "La <b>mitad</b> de los dados 🎲 que hay en la figura es:", say: "¿Cuánto es la mitad de los dados que hay?", sceneCls: "",
        scene: `<div class="dice">${shuffle([...Array(d).fill(0).map(() => dieSvg(between(1, 6), 44)), ...em("<span style='font-size:36px'>⚫</span>", o1), ...em("<span style='font-size:36px'>⬜</span>", o2)]).join("")}</div>`,
        ans, opts: numOpts(ans, [d, d + o1 + o2, ans + 1], 1), why: `Hay ${d} dados. La mitad de ${d} es ${ans}.`, hint: "Primero cuenta solo los dados. Luego repártelos en 2 grupos iguales." }; },
    () => { const [a, b] = sample(["🍎", "🍐", "🍓", "🍌", "⚽", "🎈"], 2), na = between(6, 11), nb = between(2, na - 2), ans = na - nb;
      return { prompt: `¿${cu(a)} ${a} hay <b>más</b> que ${b}?`, say: `¿${cu(a)} ${PL[a]} hay más que ${PL[b]}?`, scene: line(em(a, na)) + line(em(b, nb)), ans, opts: numOpts(ans, [na, nb, na + nb], 1),
        why: `${na} − ${nb} = ${ans}. Hay ${ans} ${a} más.`, hint: "Une cada uno de arriba con uno de abajo. ¿Cuántos quedan solos?" }; },
  ]
];

MKGame({
  slug: "mate1p-01", title: "Conteo visual de objetos", short: "Contar", char: "tito", music: B + "music-marimba.mp3", home: HOME,
  theme: { bg: "linear-gradient(135deg,#bae6fd,#c7d2fe 55%,#fbcfe8)", a1: "#3b82f6", a2: "#8b5cf6", ink: "#1e1b4b", title: "#2563eb", soft: "#e0e7ff", tile: "#f5f3ff" },
  deco: ["🔢", "🍎", "⚽", "🌟"],
  hello: "¡Hola! Soy <b>Tito</b> 🤖. Hoy vamos a <b>contar</b> todo lo que vemos, ¡sin equivocarnos!",
  intro: ["Mira bien el dibujo, cuenta con tu dedo y elige la respuesta correcta: A, B, C o D."],
  champion: "¡Eres un campeón del conteo! 🏆",
  levels: [
    { title: "Cuento lo que veo", icon: "👀", desc: "Contar objetos iguales o mezclados" },
    { title: "Cuento con atención", icon: "🔍", desc: "Derecha, izquierda y por tipo" },
    { title: "Reto concurso", icon: "🏆", desc: "Patas, pares, mitad y cuántos más" }
  ],
  check(n) { const bad = []; GEN.forEach((L, i) => L.forEach((g, j) => { for (let k = 0; k < n / 10; k++) checkQ(g(), bad, `N${i + 1}.${j + 1}`); })); return [...new Set(bad)]; },
  round(level, idx, ui) { ask(ui, pick(GEN[level])()); },
  onEnd: nextTopic(2)
});
