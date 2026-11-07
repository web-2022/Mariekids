/* Tema 47 · Figuras planas y cuerpos geométricos · Lula */
const SH = { círculo: '<circle cx="40" cy="40" r="32"/>', triángulo: '<path d="M40 8 L74 70 L6 70Z"/>', cuadrado: '<rect x="10" y="10" width="60" height="60"/>', rectángulo: '<rect x="4" y="22" width="72" height="38"/>', rombo: '<path d="M40 4 L74 40 L40 76 L6 40Z"/>', pentágono: '<path d="M40 5 L75 31 L62 73 L18 73 L5 31Z"/>', hexágono: '<path d="M21 8 L59 8 L77 40 L59 72 L21 72 L3 40Z"/>' };
const LADOS = { triángulo: 3, cuadrado: 4, rectángulo: 4, rombo: 4, círculo: 0, pentágono: 5, hexágono: 6 };
const shape = (n, c = "#a78bfa") => `<svg viewBox="0 0 80 80" width="90" fill="${c}" stroke="#312e81" stroke-width="4">${SH[n]}</svg>`;
const CU = [["🎲", "cubo"], ["⚽", "esfera"], ["🥫", "cilindro"], ["🍦", "cono"], ["📦", "prisma"]];
// polígono irregular de k lados (convexo), para contar figuras
function poly(k, c) {
  const a0 = Math.random() * 6.28, pts = Array.from({ length: k }, (_, i) => { const a = a0 + i * 6.283 / k + (Math.random() - .5) * (2.2 / k), r = 30 + Math.random() * 8; return [40 + r * Math.cos(a), 40 + r * Math.sin(a)]; });
  return `<svg viewBox="0 0 80 80" width="62"><path d="M${pts.map(p => p.map(v => v.toFixed(1)).join(" ")).join(" L")}Z" fill="${c}" stroke="#312e81" stroke-width="3"/></svg>`;
}
const GEN = [
  [
    () => { const n = pick(Object.keys(SH));
      return { prompt: "¿Cómo se llama esta figura?", say: "¿Cómo se llama esta figura?", scene: shape(n), ans: n, opts: shuffle([n, ...sample(Object.keys(SH).filter(x => x !== n), 3)]), cols: 2, cls: "grp", why: `Es un ${n}.`, hint: "Cuenta sus lados y mira si son iguales." }; },
  ],
  [
    () => { const [e, n] = pick(CU);
      return { prompt: `¿A qué cuerpo geométrico se parece ${e}?`, say: "¿A qué cuerpo geométrico se parece?", scene: `<div class="big-num">${e}</div>`, ans: n, opts: shuffle([n, ...sample(CU.filter(x => x[1] !== n).map(x => x[1]), 3)]), cols: 2, cls: "grp", why: `${e} tiene forma de ${n}.`, hint: "¿Rueda? ¿Tiene puntas? ¿Tiene caras planas?" }; },
    () => { const n = pick(["triángulo", "cuadrado", "rectángulo", "pentágono", "hexágono"]), ans = LADOS[n], t = pick(["lados", "vértices"]);
      return { prompt: `¿Cuántos <b>${t}</b> tiene un ${n}?`, say: `¿Cuántos ${t} tiene un ${n}?`, scene: shape(n, "#fde68a"), ans, opts: [3, 4, 5, 6], cols: 4, why: `El ${n} tiene ${ans} ${t}.`, hint: t === "lados" ? "Los lados son las rayitas." : "Los vértices son las puntas." }; },
  ],
  [
    () => { const q = pick([["¿Qué cuerpo tiene una sola cara curva y una punta?", "cono"], ["¿Qué cuerpo no tiene caras planas y rueda en todas las direcciones?", "esfera"], ["¿Qué cuerpo tiene 6 caras cuadradas iguales?", "cubo"], ["¿Qué cuerpo tiene 2 caras planas redondas?", "cilindro"]]);
      return { prompt: q[0], say: q[0], scene: line(CU.map(x => x[0])), ans: q[1], opts: CU.map(x => x[1]).slice(0, 4).includes(q[1]) ? CU.map(x => x[1]).slice(0, 4) : [q[1], ...CU.map(x => x[1]).slice(0, 3)], cols: 2, cls: "grp", why: `Es el ${q[1]}.`, hint: "Imagina cada cuerpo en tus manos." }; },
    () => { const want = pick([5, 6]), nm = want === 5 ? "pentágonos" : "hexágonos", k = between(1, 3), otros = Array.from({ length: between(3, 4) }, () => pick([3, 4, 11 - want])), ans = k;
      const figs = shuffle([...Array(k).fill(want), ...otros]);
      return { prompt: `¿Cuántos <b>${nm}</b> hay? (${nm} = figuras de <b>${want}</b> lados)`, say: `¿Cuántos ${nm} hay? Un ${want === 5 ? "pentágono" : "hexágono"} tiene ${want} lados.`, scene: `<div class="line">${figs.map(n => poly(n, pick(["#fde68a", "#bae6fd", "#bbf7d0", "#fbcfe8"]))).join("")}</div>`,
        ans, opts: numOpts(ans, [figs.length, ans + 1, figs.filter(x => x === 11 - want).length].filter(x => x !== ans), 0), why: `Contando los lados de cada figura, hay ${ans} con ${want} lados.`, hint: "Cuenta los lados de cada figura con tu dedo." }; },
    () => { const t = between(1, 3), c = between(1, 3), r = between(0, 2), ans = 3 * t + 4 * c + 4 * r;
      return { prompt: "¿Cuántos <b>lados</b> tienen en total estas figuras?", say: "Suma los lados de todas las figuras.", scene: `<div class="line">${[...Array(t).fill("triángulo"), ...Array(c).fill("cuadrado"), ...Array(r).fill("rectángulo")].map(n => shape(n).replace('width="90"', 'width="56"')).join("")}</div>`, ans, opts: numOpts(ans, [t + c + r, ans + 1, ans - 3], 1),
        why: `Triángulos ${t} × 3 = ${3 * t}; cuadriláteros ${c + r} × 4 = ${4 * (c + r)}. Total ${ans}.`, hint: "El triángulo tiene 3 lados; el cuadrado y el rectángulo, 4." }; },
  ]
];
lesson({ n: 47, title: "Figuras planas y cuerpos geométricos", short: "Figuras y cuerpos", char: "lula", music: "espacial", deco: ["🔵", "🔺", "🟦", "🎲"],
  hello: "¡Hola! Soy <b>Lula</b> 🦊. Hay <b>figuras planas</b> (como el triángulo) y <b>cuerpos</b> (como el cubo). ¡Vamos a conocerlos!",
  levels: LEVELS3(["Figuras planas", "Del triángulo al hexágono"], ["Cuerpos y lados", "Cubo, esfera, cono…"], ["", "¿Cuántos pentágonos? y suma de lados"]) }, GEN);
