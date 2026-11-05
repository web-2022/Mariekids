/* Tema 26 · Series numéricas · Tito 🤖 · música: electro pop */
const { pick, shuffle, rnd } = MKU;
const REGLAS = [
  [ { s: 1, d: 1, t: "van de 1 en 1" }, { s: 10, d: -1, t: "van hacia atrás de 1 en 1" }, { s: 1, d: 1, t: "van de 1 en 1" } ],
  [ { d: 2, t: "van de 2 en 2" }, { d: 5, t: "van de 5 en 5" }, { d: 10, t: "van de 10 en 10" }, { d: -2, t: "van hacia atrás de 2 en 2" } ],
  [ { d: 3, t: "van de 3 en 3" }, { d: 4, t: "van de 4 en 4" }, { dob: true, t: "se duplican: cada uno es el doble del anterior" }, { crece: true, t: "crecen cada vez más: suman 1, luego 2, luego 3, luego 4" } ]
];
function gen(level) {
  const R = pick(REGLAS[level]); let seq;
  if (R.dob) { const a = pick([1, 2, 3]); seq = [a, a * 2, a * 4, a * 8]; }
  else if (R.crece) { const a = 1 + rnd(5); seq = [a, a + 1, a + 3, a + 6, a + 10]; }
  else {
    const len = 5;
    let a = R.s !== undefined ? R.s + (R.d > 0 ? rnd(10) : rnd(10)) : (R.d > 0 ? 1 + rnd(R.d === 10 ? 3 : 12) : 14 + rnd(10));
    if (R.d < 0) a = Math.max(a, -R.d * (len - 1) + 1);
    seq = Array.from({ length: len }, (_, i) => a + R.d * i);
  }
  const ans = seq[seq.length - 1], shown = seq.slice(0, -1);
  const step = seq[seq.length - 1] - seq[seq.length - 2];
  const opts = new Set([ans]);
  for (const c of shuffle([ans + 1, ans - 1, ans + step, ans - Math.abs(step) + (step > 0 ? 0 : 0), shown[shown.length - 1] + (step > 0 ? step + 1 : step - 1), ans + 2])) {
    if (opts.size >= (level === 0 ? 3 : 4)) break; if (c >= 0 && c !== ans) opts.add(c);
  }
  return { R, shown, ans, opts: shuffle([...opts]) };
}

MKGame({
  slug: "EM-SeriesNumericas", title: "Series numéricas", short: "Series", char: "tito", music: "music-electro.mp3",
  theme: { bg: "linear-gradient(135deg,#0f172a,#7c3aed 50%,#06b6d4)", a1: "#a855f7", a2: "#06b6d4", ink: "#2e1065", title: "#7c3aed", soft: "#ede9fe", tile: "#f5f3ff" },
  deco: ["🔢", "✦", "➕", "✦"],
  hello: "¡Bip bup! Soy <b>Tito</b> 🤖. Los números también tienen <b>patrones</b>. ¿Descubres qué número sigue?",
  intro: ["Mira cómo cambian los números de uno en uno y descubre <b>la regla</b>."],
  champion: "¡Descifras números como un robot! 🤖",
  levels: [
    { title: "De uno en uno", icon: "1️⃣", desc: "+1 y −1" },
    { title: "Saltos", icon: "🦘", desc: "+2, +5, +10 y −2" },
    { title: "Reglas secretas", icon: "🧠", desc: "+3, +4, dobles y saltos que crecen" }
  ],
  check(n) {
    const bad = [];
    for (let L = 0; L < 3; L++) for (let k = 0; k < n; k++) {
      const q = gen(L);
      if (new Set(q.opts).size !== q.opts.length || !q.opts.includes(q.ans)) bad.push("opciones");
      if ([...q.shown, q.ans].some(x => x < 0)) bad.push("número negativo");
      if (q.opts.length < (L === 0 ? 3 : 4)) bad.push("faltan opciones");
    }
    return [...new Set(bad)];
  },
  round(level, idx, ui) {
    const q = gen(level);
    const st = document.createElement("div"); st.className = "stage sn-row";
    st.innerHTML = q.shown.map(x => `<span>${x}</span>`).join("") + `<span class="q">?</span>`;
    ui.area.appendChild(st);
    ui.prompt("¿Qué número <b>sigue</b>?", q.shown.join(", ") + ". ¿Qué número sigue?");
    ui.choices(q.opts, { cols: q.opts.length, cls: "num", correct: o => o === q.ans,
      onTap: o => { if (o === q.ans) st.querySelector(".q").textContent = q.ans; },
      why: `Los números ${q.R.t}. Por eso sigue el ${q.ans}.`,
      hint: "Mira cuánto cambia de un número al siguiente. ¿Siempre cambia igual?" });
  }
});
