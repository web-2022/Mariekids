/* Tema 25 · Reto final · Rayo 🐉 (y todos los Mentecitos) · música: épica */
const { pick, shuffle, sample, rnd } = MKU;

/* ---- mini desafíos de cada amigo (nivel 0, 1, 2) ---- */
const GRUPOS = [["🍎", "🍌", "🍇", "🍓", "🍐"], ["🐶", "🐱", "🐰", "🐻", "🐼"], ["🚗", "🚌", "🚲", "🚂", "🛵"], ["⚽", "🏀", "🎾", "🏐", "⚾"], ["👕", "👖", "🧦", "🧢", "🧥"]];
const NOMBRE_G = ["frutas", "animales", "vehículos", "pelotas", "ropa"];
const ADIV = [["Digo «guau» y muevo la cola.", "🐶", ["🐱", "🐟"]], ["Soy amarillo y alumbro el día.", "☀️", ["🌙", "⭐"]], ["Tengo trompa larga y orejas grandes.", "🐘", ["🦁", "🐭"]],
  ["Me abres cuando llueve.", "☂️", ["🧢", "👟"]], ["Tengo caparazón y camino despacio.", "🐢", ["🐇", "🐎"]], ["Tengo agujas y te digo la hora.", "🕐", ["🔑", "📏"]],
  ["Salgo después de la lluvia y tengo muchos colores.", "🌈", ["☀️", "☁️"]], ["Tengo ocho brazos y vivo en el mar.", "🐙", ["🦀", "🐬"]]];
const CAUSA = [["🌧️ Llovió mucho", "💧 Hay charcos"], ["☀️ Hizo mucho calor", "🍦 El helado se derritió"], ["🔋 Se acabaron las pilas", "🔦 La linterna no prende"],
  ["🎈 Solté el globo", "☁️ El globo se fue volando"], ["🌙 Ya es de noche", "😴 Me dio sueño"], ["🥚 Se cayó el huevo", "💥 El huevo se rompió"]];
const FORMAS = [["⚽", "círculo"], ["🕐", "círculo"], ["🚪", "rectángulo"], ["📱", "rectángulo"], ["🍕", "triángulo"], ["⛺", "triángulo"], ["🎲", "cuadrado"]];

const RETOS = {
  intruso: { who: "mika", make(L) {
    const g = rnd(GRUPOS.length); const k = [3, 4, 5][L] - 1;
    const members = sample(GRUPOS[g], k), odd = pick(GRUPOS[(g + 1 + rnd(GRUPOS.length - 1)) % GRUPOS.length]);
    return { prompt: "¿Cuál <b>no pertenece</b> al grupo?", say: "¿Cuál no pertenece al grupo?", opts: shuffle([...members, odd]), ans: odd,
      why: `Los demás son ${NOMBRE_G[g]}.`, hint: "¿En qué se parecen casi todos?" };
  } },
  patron: { who: "tito", make(L) {
    const shape = pick([["AB", "ABC"], ["ABC", "AAB", "ABB"], ["AABB", "ABCD", "ABAC"]][L]);
    const sym = sample(["🔴", "🔵", "🟡", "🟢", "⭐", "❤️", "🌙"], 5), map = {}; [...new Set(shape)].forEach((c, i) => map[c] = sym[i]);
    const unit = [...shape].map(c => map[c]); const seq = Array.from({ length: unit.length * 2 + 1 }, (_, i) => unit[i % unit.length]);
    const ans = seq.pop();
    return { prompt: "¿Qué <b>sigue</b> en el patrón?", say: "¿Qué sigue en el patrón?", stage: `<div class="rf-seq emoji">${seq.join(" ")} <b>❓</b></div>`,
      opts: shuffle([ans, ...sample([...new Set(sym.filter(x => x !== ans))], 2)]), ans, why: `El grupo ${unit.join(" ")} se repite.`, hint: "Busca el grupo que se repite." };
  } },
  suma: { who: "tito", make(L) {
    const max = [10, 10, 20][L]; const op = L === 0 ? "+" : pick(["+", "−"]);
    let a = 1 + rnd(max - 1), b = 1 + rnd(max - a); if (op === "−") { a = 2 + rnd(max - 1); b = 1 + rnd(a - 1); }
    const ans = op === "+" ? a + b : a - b; const o = new Set([ans]); [1, -1, 2].forEach(d => { if (ans + d >= 0) o.add(ans + d); });
    return { prompt: `¿Cuánto es <b>${a} ${op} ${b}</b>?`, say: `¿Cuánto es ${a} ${op === "+" ? "más" : "menos"} ${b}?`, opts: shuffle([ans, ...shuffle([...o].filter(v => v !== ans)).slice(0, 2)]), ans, num: true,
      why: `${a} ${op} ${b} = ${ans}.`, hint: op === "+" ? "Cuenta hacia adelante con tus dedos." : "Cuenta hacia atrás con tus dedos." };
  } },
  serie: { who: "tito", make(L) {
    const d = pick([[1], [2, 5], [3, 10, -2]][L]); const a = d < 0 ? 15 + rnd(6) : 1 + rnd(8);
    const seq = [0, 1, 2, 3].map(i => a + d * i), ans = a + d * 4;
    return { prompt: "¿Qué número <b>sigue</b>?", say: seq.join(", ") + ". ¿Qué número sigue?", stage: `<div class="rf-seq">${seq.join(" · ")} · <b>?</b></div>`,
      opts: shuffle([ans, ans + 1, ans - 1]), ans, num: true, why: `Van ${d > 0 ? "de " + d + " en " + d : "hacia atrás de " + (-d) + " en " + (-d)}.`, hint: "¿Cuánto cambia de un número al siguiente?" };
  } },
  adivinanza: { who: "kiki", make() {
    const a = pick(ADIV);
    return { prompt: "Adivina, adivinador…", say: a[0], stage: `<div class="rf-riddle">“${a[0]}”</div>`, opts: shuffle([a[1], ...a[2]]), ans: a[1], why: "¡Adivinaste!", hint: "Vuelve a leer las pistas." };
  } },
  causa: { who: "kiki", make() {
    const p = pick(CAUSA); const otros = sample(CAUSA.filter(x => x !== p), 2).map(x => x[0]);
    return { prompt: "<b>¿Por qué pasó?</b>", say: p[1].slice(p[1].indexOf(" ") + 1) + ". ¿Por qué pasó?", stage: `<div class="rf-riddle">${p[1]}</div>`, opts: shuffle([p[0], ...otros]), ans: p[0], txt: true,
      why: `${p[0]}: por eso ${p[1].slice(p[1].indexOf(" ") + 1).toLowerCase()}.`, hint: "¿Cuál de estas cosas haría que eso pase?" };
  } },
  forma: { who: "lula", make() {
    const [e, f] = pick(FORMAS); const otras = ["círculo", "cuadrado", "triángulo", "rectángulo"].filter(x => x !== f);
    return { prompt: `¿Qué forma tiene ${e}?`, say: "¿Qué forma tiene este objeto?", stage: `<div class="rf-big emoji">${e}</div>`, opts: shuffle([f, ...sample(otras, 2)]), ans: f, txt: true, why: `Tiene forma de ${f}.`, hint: "Mira su borde: ¿es redondo o tiene lados?" };
  } }
};
const LISTA = Object.keys(RETOS);
let plan = [];

MKGame({
  slug: "EM-RetoFinal", title: "Reto final", short: "Reto final", char: "rayo", music: "music-epica.mp3",
  theme: { bg: "radial-gradient(circle at 50% 0%,#fde68a 0 80px,transparent 220px),linear-gradient(180deg,#7c2d12,#b91c1c 40%,#6d28d9)", a1: "#f59e0b", a2: "#dc2626", ink: "#7c2d12", title: "#dc2626", soft: "#fef3c7", tile: "#fffbeb" },
  deco: ["🏆", "⭐", "🔥", "🏆"],
  hello: "¡Hola! Soy <b>Rayo</b> 🐉. Todos mis amigos te prepararon <b>retos</b> de lo que aprendiste. ¡Supera los 3 y ganarás tu <b>diploma</b>!",
  intro: ["Mika, Tito, Kiki y Lula te harán preguntas de intrusos, patrones, cuentas, adivinanzas y más."],
  champion: "¡Eres una Mente Brillante! 🏆",
  levels: [
    { title: "Valle de las Ideas", icon: "🌄", desc: "Reto fácil de todos los temas" },
    { title: "Bosque de los Acertijos", icon: "🌲", desc: "Reto medio" },
    { title: "Volcán del Gran Pensador", icon: "🌋", desc: "¡El reto final! Gana tu diploma" }
  ],
  onLevel: () => { plan = shuffle([...LISTA, ...LISTA]).slice(0, 10); },
  check(n) {
    const bad = [];
    for (let L = 0; L < 3; L++) for (const t of LISTA) for (let k = 0; k < n / 10; k++) {
      const q = RETOS[t].make(L);
      if (new Set(q.opts).size !== q.opts.length) bad.push(`${t}: opción repetida`);
      if (q.opts.filter(o => o === q.ans).length !== 1) bad.push(`${t}: respuesta no única`);
      if (q.opts.length < 3) bad.push(`${t}: pocas opciones`);
    }
    return [...new Set(bad)];
  },
  round(level, idx, ui) {
    const t = plan[idx] || pick(LISTA); const R = RETOS[t]; const q = R.make(level);
    ui.char("anima", "jump", R.who);
    if (q.stage) { const st = document.createElement("div"); st.className = "stage"; st.innerHTML = q.stage; ui.area.appendChild(st); }
    ui.prompt(`<small class="rf-who">${MKChar.names[R.who]} te reta:</small><br>${q.prompt}`, `${MKChar.names[R.who]} te reta. ${q.say}`);
    ui.choices(q.opts, { cls: q.num ? "num" : q.txt ? "txt" : "", correct: o => o === q.ans, why: q.why, hint: q.hint });
  },
  onEnd(level, passed, stars, box) {
    if (level !== 2 || !passed) return;
    let nombre = ""; try { nombre = localStorage.getItem("mk_em_nombre") || ""; } catch (e) { }
    const hoy = new Date().toLocaleDateString("es-PE", { day: "numeric", month: "long", year: "numeric" });
    box.innerHTML = `
      <div class="diploma" id="diploma">
        <div class="dip-top">🏆 DIPLOMA 🏆</div>
        <div class="dip-sub">de Mente Brillante</div>
        <p>Los Mentecitos entregan este diploma a</p>
        <input id="dipName" class="dip-name" placeholder="Escribe tu nombre" value="${nombre.replace(/"/g, "&quot;")}" maxlength="32" />
        <p>por completar todos los <b>Ejercicios mentales</b> con mucha inteligencia, paciencia y alegría.</p>
        <div class="dip-chars">${["mika", "tito", "lula", "pipo", "bimba", "kiki", "coco", "rayo"].map(n => `<span>${MKChar(n, "feliz")}</span>`).join("")}</div>
        <div class="dip-date">${hoy}</div>
      </div>
      <button class="btn alt" type="button" id="dipPrint" style="margin-top:10px">🖨️ Imprimir o guardar mi diploma</button>`;
    box.querySelector("#dipName").addEventListener("input", e => { try { localStorage.setItem("mk_em_nombre", e.target.value); } catch (er) { } });
    box.querySelector("#dipPrint").onclick = () => window.print();
  }
});
