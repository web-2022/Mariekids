/* Tema 47 · Figuras planas y cuerpos geométricos · Lula */
const SH = { círculo: '<circle cx="40" cy="40" r="32"/>', triángulo: '<path d="M40 8 L74 70 L6 70Z"/>', cuadrado: '<rect x="10" y="10" width="60" height="60"/>', rectángulo: '<rect x="4" y="22" width="72" height="38"/>', rombo: '<path d="M40 4 L74 40 L40 76 L6 40Z"/>' };
const LADOS = { triángulo: 3, cuadrado: 4, rectángulo: 4, rombo: 4, círculo: 0 };
const shape = (n, c = "#a78bfa") => `<svg viewBox="0 0 80 80" width="90" fill="${c}" stroke="#312e81" stroke-width="4">${SH[n]}</svg>`;
const CU = [["🎲", "cubo"], ["⚽", "esfera"], ["🥫", "cilindro"], ["🍦", "cono"], ["📦", "prisma"]];
const GEN = [
  [
    () => { const n = pick(Object.keys(SH));
      return { prompt: "¿Cómo se llama esta figura?", say: "¿Cómo se llama esta figura?", scene: shape(n), ans: n, opts: shuffle([n, ...sample(Object.keys(SH).filter(x => x !== n), 3)]), cols: 2, cls: "grp", why: `Es un ${n}.`, hint: "Cuenta sus lados y mira si son iguales." }; },
  ],
  [
    () => { const [e, n] = pick(CU);
      return { prompt: `¿A qué cuerpo geométrico se parece ${e}?`, say: "¿A qué cuerpo geométrico se parece?", scene: `<div class="big-num">${e}</div>`, ans: n, opts: shuffle([n, ...sample(CU.filter(x => x[1] !== n).map(x => x[1]), 3)]), cols: 2, cls: "grp", why: `${e} tiene forma de ${n}.`, hint: "¿Rueda? ¿Tiene puntas? ¿Tiene caras planas?" }; },
    () => { const n = pick(["triángulo", "cuadrado", "rectángulo"]), ans = LADOS[n], t = pick(["lados", "vértices"]);
      return { prompt: `¿Cuántos <b>${t}</b> tiene un ${n}?`, say: `¿Cuántos ${t} tiene un ${n}?`, scene: shape(n, "#fde68a"), ans, opts: [0, 3, 4, 5], cols: 4, why: `El ${n} tiene ${ans} ${t}.`, hint: t === "lados" ? "Los lados son las rayitas." : "Los vértices son las puntas." }; },
  ],
  [
    () => { const q = pick([["¿Qué cuerpo tiene una sola cara curva y una punta?", "cono"], ["¿Qué cuerpo no tiene caras planas y rueda en todas las direcciones?", "esfera"], ["¿Qué cuerpo tiene 6 caras cuadradas iguales?", "cubo"], ["¿Qué cuerpo tiene 2 caras planas redondas?", "cilindro"]]);
      return { prompt: q[0], say: q[0], scene: line(CU.map(x => x[0])), ans: q[1], opts: CU.map(x => x[1]).slice(0, 4).includes(q[1]) ? CU.map(x => x[1]).slice(0, 4) : [q[1], ...CU.map(x => x[1]).slice(0, 3)], cols: 2, cls: "grp", why: `Es el ${q[1]}.`, hint: "Imagina cada cuerpo en tus manos." }; },
    () => { const t = between(1, 3), c = between(1, 3), r = between(0, 2), ans = 3 * t + 4 * c + 4 * r;
      return { prompt: "¿Cuántos <b>lados</b> tienen en total estas figuras?", say: "Suma los lados de todas las figuras.", scene: `<div class="line">${[...Array(t).fill("triángulo"), ...Array(c).fill("cuadrado"), ...Array(r).fill("rectángulo")].map(n => shape(n).replace('width="90"', 'width="56"')).join("")}</div>`, ans, opts: numOpts(ans, [t + c + r, ans + 1, ans - 3], 1),
        why: `Triángulos ${t} × 3 = ${3 * t}; cuadriláteros ${c + r} × 4 = ${4 * (c + r)}. Total ${ans}.`, hint: "El triángulo tiene 3 lados; el cuadrado y el rectángulo, 4." }; },
  ]
];
lesson({ n: 47, title: "Figuras planas y cuerpos geométricos", short: "Figuras y cuerpos", char: "lula", music: "espacial", deco: ["🔵", "🔺", "🟦", "🎲"],
  hello: "¡Hola! Soy <b>Lula</b> 🦊. Hay <b>figuras planas</b> (como el triángulo) y <b>cuerpos</b> (como el cubo). ¡Vamos a conocerlos!",
  levels: LEVELS3(["Figuras planas", "Nombres de figuras"], ["Cuerpos y lados", "Cubo, esfera, cono…"], ["", "Adivinanzas y suma de lados"]) }, GEN);
