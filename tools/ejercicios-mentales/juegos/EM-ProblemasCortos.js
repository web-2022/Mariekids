/* Tema 15 · Problemas cortos · Kiki 🦉 · música: ukelele alegre */
const { pick, shuffle, rnd } = MKU;
const NOMBRES = ["Mika", "Tito", "Lula", "Pipo", "Bimba", "Kiki", "Coco", "Rayo"];
// [emoji, singular, plural, femenino, acción de quitar]
const COSAS = [
  ["🍎", "manzana", "manzanas", true, "Se come"],
  ["🍪", "galleta", "galletas", true, "Se come"],
  ["🍬", "caramelo", "caramelos", false, "Se come"],
  ["🎈", "globo", "globos", false, "Regala"],
  ["⭐", "estrella", "estrellas", true, "Regala"],
  ["🚗", "carrito", "carritos", false, "Presta"],
  ["✏️", "lápiz", "lápices", false, "Presta"],
  ["🌸", "flor", "flores", true, "Regala"],
  ["🐟", "pececito", "pececitos", false, "Regala"],
  ["🧁", "pastelito", "pastelitos", false, "Se come"]
];
const cuantos = f => f ? "¿Cuántas" : "¿Cuántos";

function gen(level, idx) {
  const max = [5, 10, 20][level];
  const [e, sg, pl, fem, quita] = pick(COSAS), name = pick(NOMBRES);
  const type = level === 2 && idx % 3 === 2 ? "compara" : pick(["suma", "resta"]);
  let a, b, ans, text, say;
  if (type === "suma") {
    a = 1 + rnd(max - 1); b = 1 + rnd(max - a); ans = a + b;
    text = `${name} tiene <b>${a}</b> ${a === 1 ? sg : pl}. Le regalan <b>${b}</b> más. ${cuantos(fem)} ${pl} tiene ahora?`;
  } else if (type === "resta") {
    a = 2 + rnd(max - 1); b = 1 + rnd(a - 1); ans = a - b;
    text = `${name} tiene <b>${a}</b> ${pl}. ${quita} <b>${b}</b>. ${cuantos(fem)} ${pl} le quedan?`;
  } else {
    const n2 = pick(NOMBRES.filter(x => x !== name));
    a = 1 + rnd(max - 6); b = a + 1 + rnd(5); ans = b - a;
    text = `${name} tiene <b>${a}</b> ${pl} y ${n2} tiene <b>${b}</b>. ${cuantos(fem)} ${pl} más tiene ${n2}?`;
  }
  const nOpts = level === 0 ? 3 : 4; const opts = new Set([ans]);
  for (const d of shuffle([1, -1, 2, -2, 3])) { if (opts.size >= nOpts) break; if (ans + d >= 0) opts.add(ans + d); }
  return { type, e, sg, pl, fem, a, b, ans, text, opts: shuffle([...opts]) };
}

MKGame({
  slug: "EM-ProblemasCortos", title: "Problemas cortos", short: "Problemas", char: "kiki", music: "music-ukelele.mp3",
  theme: { bg: "linear-gradient(180deg,#fef9c3,#bbf7d0 50%,#a5f3fc)", a1: "#22c55e", a2: "#0891b2", ink: "#134e4a", title: "#0d9488", soft: "#ccfbf1", tile: "#f0fdfa" },
  deco: ["🍎", "🎈", "⭐", "🍬"],
  hello: "¡Hu-hu! Soy <b>Kiki</b> 🦉. Te cuento un problemita y tú lo resuelves. ¡Puedes usar tus dedos!",
  intro: ["Lee (o escucha 🔊) el problema, piensa si <b>se juntan</b> o <b>se quitan</b>, y elige la respuesta."],
  champion: "¡Resuelves problemas como un búho sabio! 🦉",
  levels: [
    { title: "Hasta 5", icon: "🖐️", desc: "Con dibujos para contar" },
    { title: "Hasta 10", icon: "🔟", desc: "Con algunos dibujos" },
    { title: "Hasta 20", icon: "🧠", desc: "Sin dibujos · y comparar" }
  ],
  check(n) {
    const bad = [];
    for (let L = 0; L < 3; L++) for (let k = 0; k < n; k++) {
      const q = gen(L, k);
      if (q.ans < 0 || q.ans > [5, 10, 20][L]) bad.push(`nivel ${L + 1}: resultado fuera de rango (${q.ans})`);
      if (new Set(q.opts).size !== q.opts.length || !q.opts.includes(q.ans)) bad.push("opciones mal");
      if (q.opts.some(o => o < 0)) bad.push("opción negativa");
    }
    return [...new Set(bad)];
  },
  round(level, idx, ui) {
    const q = gen(level, idx);
    const st = document.createElement("div"); st.className = "stage pc-card";
    let pics = "";
    if (level === 0) {
      pics = q.type === "suma" ? `<span class="emoji">${q.e.repeat(q.a)}</span><b> + </b><span class="emoji">${q.e.repeat(q.b)}</span>`
        : `<span class="emoji">${q.e.repeat(q.a - q.b)}</span><span class="emoji pc-off">${q.e.repeat(q.b)}</span>`;
    } else if (level === 1 && q.type !== "compara") pics = `<span class="emoji">${q.e.repeat(q.a)}</span>`;
    st.innerHTML = `<div class="pc-text">${q.text}</div>${pics ? `<div class="pc-pics">${pics}</div>` : ""}`;
    ui.area.appendChild(st);
    ui.prompt("Resuelve el problema 🧠", q.text);
    const op = q.type === "suma" ? `${q.a} + ${q.b} = ${q.ans}` : q.type === "resta" ? `${q.a} − ${q.b} = ${q.ans}` : `${q.b} − ${q.a} = ${q.ans}`;
    ui.choices(q.opts, { cols: q.opts.length === 4 ? 4 : 3, cls: "num", correct: o => o === q.ans,
      why: `${op}. ¡Son ${q.ans} ${q.ans === 1 ? q.sg : q.pl}!`, sayWhy: `${op.replace("−", "menos").replace("+", "más").replace("=", "es igual a")}.`,
      hint: q.type === "suma" ? `Se juntan: empieza en ${q.a} y cuenta ${q.b} más.` : q.type === "resta" ? `Se quitan: empieza en ${q.a} y cuenta ${q.b} hacia atrás.` : `Cuenta desde ${q.a} hasta ${q.b}. ¿Cuántos saltos das?` });
  }
});
