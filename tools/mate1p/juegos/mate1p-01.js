/* Tema 1 · Conteo visual de objetos · Tito 🤖 */
const OBJ = ["🍎", "🍓", "⚽", "🌟", "🐞", "🎈", "🍌", "🚗", "🐤", "🧁", "🌸", "🍪"];
const ANIMALES = [["🐶", "perro", 4], ["🐱", "gato", 4], ["🐰", "conejo", 4], ["🐔", "gallina", 2], ["🦜", "loro", 2], ["🐤", "pollito", 2], ["🐷", "chanchito", 4]];
const PL = { "🍎": "manzanas", "🍓": "fresas", "⚽": "pelotas", "🌟": "estrellas", "🐞": "mariquitas", "🎈": "globos", "🍌": "plátanos", "🚗": "carritos", "🐤": "pollitos", "🧁": "pastelitos", "🌸": "flores", "🍪": "galletas", "🧦": "medias", "🎲": "dados", "🐟": "peces" };

const MASC = new Set(["🍌", "🚗", "🐤", "🧁", "🎈", "🎲", "🐟", "🧦"]);
const cu = e => MASC.has(e) ? "Cuántos" : "Cuántas";   // ¿Cuántos plátanos? / ¿Cuántas fresas?
const las = e => MASC.has(e) ? "los" : "las", una = e => MASC.has(e) ? "uno por uno" : "una por una";
const GEN = [
  // ---------- Nivel 1: contar lo que veo
  [
    () => { const e = pick(OBJ), n = between(4, 10);
      return { prompt: `¿${cu(e)} <b>${PL[e]}</b> hay? ${e}`, say: `¿${cu(e)} ${PL[e]} hay?`, scene: scatter(em(e, n)), ans: n, opts: numOpts(n, [n + 1, n - 1, n + 2]),
        why: `Hay ${n} ${PL[e]}. Contamos una por una sin repetir.`, hint: "Toca con tu dedo cada una mientras cuentas.",
        steps: T => [
          { t: `Vamos a contar ${las(e)} ${PL[e]} ${una(e)}. A cada ${e} le ponemos su número para no contarla dos veces.` },
          { t: `¡Contemos juntos! Mira cómo aparece el número en cada ${e}:`, go: T.count(T.its()) },
          { t: `El último número que dijimos fue el <b>${n}</b>. Entonces hay <b>${n}</b> ${PL[e]}. 👇 Busca el <b>${n}</b> en las respuestas.` }
        ] }; },
    () => { const [a, b] = sample(OBJ, 2), na = between(3, 9), nb = between(2, 6);
      return { prompt: `¿${cu(a)} <b>${PL[a]}</b> hay? ${a}`, say: `Hay ${PL[a]} y ${PL[b]}. ¿${cu(a)} ${PL[a]} hay?`, scene: scatter(shuffle([...em(a, na), ...em(b, nb)])), ans: na, opts: numOpts(na, [na + nb, nb, na + 1]),
        why: `Hay ${na} ${PL[a]}. ${MASC.has(b) ? "Los" : "Las"} ${PL[b]} no se cuentan.`, hint: `Cuenta solo ${MASC.has(a) ? "los" : "las"} ${PL[a]}.`,
        steps: T => [
          { t: `En el dibujo hay ${PL[a]} ${a} y ${PL[b]} ${b} ${MASC.has(a) || MASC.has(b) ? "mezclados" : "mezcladas"}. La pregunta pide <b>solo ${las(a)} ${PL[a]}</b>.` },
          { t: `${MASC.has(b) ? "Los" : "Las"} ${PL[b]} no nos sirven: ${MASC.has(b) ? "los" : "las"} apagamos para que no nos confundan.`, go: d => { T.dim(T.of(b)); setTimeout(d, 600); } },
          { t: `Ahora contamos solo ${las(a)} ${PL[a]} ${a}:`, go: T.count(T.of(a)) },
          { t: `Contamos <b>${na}</b> ${PL[a]}. ${MASC.has(b) ? "Los" : "Las"} ${nb} ${PL[b]} no se cuentan. La respuesta es <b>${na}</b>.` }
        ] }; },
  ],
  // ---------- Nivel 2: contar con una condición
  [
    () => { const r = between(2, 5), l = between(2, 5), dirs = shuffle([...Array(r).fill(1), ...Array(l).fill(-1)]), asksRight = rnd(2) === 0, ans = asksRight ? r : l;
      return { prompt: `¿Cuántos peces nadan hacia la <b>${asksRight ? "derecha 👉" : "izquierda 👈"}</b>?`, say: `¿Cuántos peces nadan hacia la ${asksRight ? "derecha" : "izquierda"}?`,
        scene: `<div class="fishes">${dirs.map(d => `<span class="it" data-k="${d > 0 ? "R" : "L"}">${fishSvg(d, pick(["#38bdf8", "#fb923c", "#a78bfa", "#4ade80"]))}</span>`).join("")}</div>`, ans, opts: numOpts(ans, [r + l, asksRight ? l : r]),
        why: `${ans} peces miran hacia la ${asksRight ? "derecha" : "izquierda"}: su cabeza (con el ojo) está de ese lado.`, hint: "Fíjate hacia dónde está la cabeza con el ojito.",
        steps: T => { const lado = asksRight ? "derecha" : "izquierda", si = T.of(asksRight ? "R" : "L"), no = T.of(asksRight ? "L" : "R");
          return [
            { t: `Un pez nada hacia donde está su <b>cabeza</b>, la que tiene el <b>ojito</b> 👁️. La cola queda atrás.` },
            { t: `Nos piden los que van a la <b>${lado} ${asksRight ? "👉" : "👈"}</b>. Apagamos los que miran al otro lado.`, go: d => { T.dim(no); setTimeout(d, 600); } },
            { t: `Ahora contamos los peces que quedan encendidos:`, go: T.count(si) },
            { t: `Hay <b>${ans}</b> peces que nadan hacia la ${lado}. Los otros ${no.length} van al otro lado y no se cuentan. La respuesta es <b>${ans}</b>.` }
          ]; } }; },
    () => { const L = between(3, 8), R = between(3, 8), who = pick(["tito", "lula", "pipo", "kiki"]), e = pick(["🔵", "🟠", "🟢", "🟡"]), leftQ = rnd(2) === 0, ans = leftQ ? L : R;
      return { prompt: `¿Cuántas bolitas hay del lado <b>${leftQ ? "👈 izquierdo" : "derecho 👉"}</b> de ${NAME(who)}?`, say: `¿Cuántas bolitas hay del lado ${leftQ ? "izquierdo" : "derecho"} de ${NAME(who)}?`,
        scene: `<div class="sides"><div class="side"><span class="lab">👈 izquierda</span>${em(`<span class="it" data-k="L">${e}</span>`, L).join("")}</div>${kid(who)}<div class="side"><span class="lab">derecha 👉</span>${em(`<span class="it" data-k="R">${e}</span>`, R).join("")}</div></div>`,
        ans, opts: numOpts(ans, [L + R, leftQ ? R : L]), why: `Del lado ${leftQ ? "izquierdo" : "derecho"} hay ${ans} bolitas.`, hint: `Mira solo el lado ${leftQ ? "👈 izquierdo" : "derecho 👉"}.`,
        steps: T => { const lado = leftQ ? "izquierdo" : "derecho", si = T.of(leftQ ? "L" : "R"), no = T.of(leftQ ? "R" : "L");
          return [
            { t: `${NAME(who)} está en el medio. Las bolitas de un lado son del lado <b>izquierdo 👈</b> y las del otro lado son del lado <b>derecho 👉</b>.` },
            { t: `Nos preguntan por el lado <b>${lado}</b>. Apagamos las bolitas del otro lado.`, go: d => { T.dim(no); setTimeout(d, 600); } },
            { t: `Contamos las bolitas del lado ${lado}:`, go: T.count(si) },
            { t: `Del lado ${lado} hay <b>${ans}</b> bolitas. La respuesta es <b>${ans}</b>.` }
          ]; } }; },
    () => { const [f1, f2] = sample(["🍎", "🍌", "🍓", "🍐", "🍇"], 2), o = pick(["🚗", "⚽", "🎈"]), a = between(2, 5), b = between(2, 5), c = between(2, 4), ans = a + b;
      return { prompt: "¿Cuántas <b>frutas</b> hay en total?", say: "¿Cuántas frutas hay en total?", scene: scatter(shuffle([...em(f1, a), ...em(f2, b), ...em(o, c)])), ans, opts: numOpts(ans, [ans + c, a, b]),
        why: `${a} + ${b} = ${ans} frutas. ${o} no es fruta.`, hint: "Cuenta todas las frutas, pero no lo que no es fruta.",
        steps: T => [
          { t: `Primero pensemos: ¿qué cosas son <b>frutas</b>? ${f1} y ${f2} sí son frutas. ${o} <b>no</b> es una fruta.` },
          { t: `Apagamos ${o} porque no se cuenta.`, go: d => { T.dim(T.of(o)); setTimeout(d, 600); } },
          { t: `Contamos primero ${f1} y seguimos contando con ${f2}, sin volver a empezar:`, go: T.count([...T.of(f1), ...T.of(f2)]) },
          { t: `Hay ${a} ${f1} y ${b} ${f2}: ${a} + ${b} = <b>${ans}</b> frutas. La respuesta es <b>${ans}</b>.` }
        ] }; },
  ],
  // ---------- Nivel 3: tipo concurso
  [
    () => { const an = sample(ANIMALES, 3).map(([e, nm, p]) => [e, nm, p, between(1, 3)]), ans = an.reduce((s, x) => s + x[2] * x[3], 0);
      const txt = an.map(x => `${x[3]} ${x[1]}${x[3] > 1 ? (x[1].endsWith("n") ? "es" : "s") : ""}`).join(", ").replace(/, ([^,]*)$/, " y $1");
      return { prompt: `¿Cuántas <b>patas</b> hay en total?`, say: `¿Cuántas patas hay en total en ${txt}?`, scene: line(an.flatMap(x => em(x[0], x[3]))) + `<div class="legend">${txt}</div>`,
        ans, opts: numOpts(ans, [an.reduce((s, x) => s + x[3], 0) * 4, an.reduce((s, x) => s + x[3], 0) * 2, ans + 2]),
        why: an.map(x => `${x[3]} ${x[0]} → ${x[2] * x[3]}`).join(" · ") + ` · Total: ${ans} patas.`, hint: "Las aves tienen 2 patas y los otros animales tienen 4.",
        steps: T => { const els = T.its(), lista = an.flatMap(x => Array(x[3]).fill(x[2]));
          let acc = 0; const sumas = lista.map(p => (acc += p));
          return [
            { t: `Recuerda: las <b>aves</b> (gallina 🐔, loro 🦜, pollito 🐤) tienen <b>2 patas</b>. Los otros animales (perro, gato, conejo, chanchito) tienen <b>4 patas</b>.` },
            { t: `A cada animal le ponemos cuántas patas tiene:`, go: T.count(els, { label: k => String(lista[k - 1]), say: k => lista[k - 1] + " patas", ms: 1100 }) },
            { t: `Ahora sumamos las patas: <b>${lista.join(" + ")} = ${ans}</b>.`, s: `Ahora sumamos las patas, una tras otra: ${sumas.join(", ")}.` },
            { t: `En total hay <b>${ans}</b> patas. La respuesta es <b>${ans}</b>.` }
          ]; } }; },
    () => { const e = pick(["🧦", "👟", "🧤", "🥚"]), n = 2 * between(3, 8), ans = n / 2;
      return { prompt: `¿Cuántos <b>pares</b> de ${e} hay?`, say: "¿Cuántos pares hay? Un par son dos.", scene: scatter(em(e, n)), ans, opts: numOpts(ans, [n, ans + 1, ans - 1], 1),
        why: `Hay ${n}. Un par son 2, entonces hay ${ans} pares.`, hint: "Un par son DOS. Agrupa de dos en dos.",
        steps: T => [
          { t: `Un <b>par</b> son <b>2</b> cosas que van juntas, como 2 medias o 2 zapatillas.` },
          { t: `Formamos grupos de 2. Cada grupo tiene su color y su número:`, go: T.pairs(T.its(), { near: true, both: true, say: k => "par " + k }) },
          { t: `Formamos <b>${ans}</b> pares con los ${n} ${e}. La respuesta es <b>${ans}</b> (no ${n}, porque ${n} es la cantidad de cosas sueltas).` }
        ] }; },
    () => { const d = 2 * between(2, 6), o1 = between(2, 4), o2 = between(1, 3), ans = d / 2;
      return { prompt: "La <b>mitad</b> de los dados 🎲 que hay en la figura es:", say: "¿Cuánto es la mitad de los dados que hay?", sceneCls: "",
        scene: `<div class="dice">${shuffle([...Array(d).fill(0).map(() => `<span class="it" data-k="D">${dieSvg(between(1, 6), 44)}</span>`), ...em("<span class='it' data-k='O' style='font-size:36px'>⚫</span>", o1), ...em("<span class='it' data-k='O' style='font-size:36px'>⬜</span>", o2)]).join("")}</div>`,
        ans, opts: numOpts(ans, [d, d + o1 + o2, ans + 1], 1), why: `Hay ${d} dados. La mitad de ${d} es ${ans}.`, hint: "Primero cuenta solo los dados. Luego repártelos en 2 grupos iguales.",
        steps: T => { const dd = T.of("D");
          return [
            { t: `Primero, solo nos interesan los <b>dados</b> 🎲. Las fichas ⚫ y ⬜ no son dados: las apagamos.`, go: d2 => { T.dim(T.of("O")); setTimeout(d2, 600); } },
            { t: `Contamos los dados:`, go: T.count(dd) },
            { t: `Hay <b>${d}</b> dados. La <b>mitad</b> es repartirlos en <b>2 grupos iguales</b>. Repartimos de a uno: uno al grupo <b style="color:#2563eb">azul</b>, uno al grupo <b style="color:#ea580c">naranja</b>…`, go: d2 => { T.clear(); T.dim(T.of("O")); T.split(dd)(d2); } },
            { t: `El grupo azul tiene <b>${ans}</b> dados y el naranja también tiene <b>${ans}</b>: son iguales. La mitad de ${d} es <b>${ans}</b>.` }
          ]; } }; },
    () => { const [a, b] = sample(["🍎", "🍐", "🍓", "🍌", "⚽", "🎈"], 2), na = between(6, 11), nb = between(2, na - 2), ans = na - nb;
      return { prompt: `¿${cu(a)} ${a} hay <b>más</b> que ${b}?`, say: `¿${cu(a)} ${PL[a]} hay más que ${PL[b]}?`, scene: line(em(a, na)) + line(em(b, nb)), ans, opts: numOpts(ans, [na, nb, na + nb], 1),
        why: `${na} − ${nb} = ${ans}. Hay ${ans} ${a} más.`, hint: "Une cada uno de arriba con uno de abajo. ¿Cuántos quedan solos?",
        steps: T => { const ls = T.its(".line"), top = [...ls[0].querySelectorAll(".it")], bot = [...ls[1].querySelectorAll(".it")];
          const par = []; bot.forEach((x, i) => par.push(top[i], x));
          return [
            { t: `Para saber cuántos hay <b>de más</b>, juntamos cada ${a} de arriba con un ${b} de abajo, como si fueran parejas de baile.` },
            { t: `Formamos las parejas:`, go: T.pairs(par, { both: true }) },
            { t: `Los ${a} que se quedaron <b>sin pareja</b> son los que hay de más. Contémoslos:`, go: T.count(top.slice(nb), { cls: "t-big" }) },
            { t: `Sobran <b>${ans}</b>. También se puede restar: ${na} − ${nb} = <b>${ans}</b>. La respuesta es <b>${ans}</b>.` }
          ]; } }; },
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
