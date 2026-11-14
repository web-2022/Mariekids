/* Tema 66 · Áreas (contar cuadraditos) · Tito */
// figura conectada de k celdas dentro de una cuadrícula c × r
function blob(c, r, k) {
  const start = between(0, c * r - 1), set = new Set([start]);
  while (set.size < k) {
    const cell = pick([...set]), x = cell % c, y = Math.floor(cell / c);
    const nb = [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]].filter(([a, b]) => a >= 0 && b >= 0 && a < c && b < r).map(([a, b]) => b * c + a);
    set.add(pick(nb));
  }
  return set;
}
const rectSet = (c, a, b, x0 = 0, y0 = 0) => { const s = new Set(); for (let y = 0; y < b; y++) for (let x = 0; x < a; x++) s.add((y0 + y) * c + x0 + x); return s; };
// cuadrícula con celdas enteras (full) y medias (half: celda → diagonal 0 = ◣, 1 = ◢)
function halfGrid(c, r, full, half, color = "#4ade80") {
  const s = 34; let g = "";
  for (let y = 0; y < r; y++) for (let x = 0; x < c; x++) g += `<rect x="${x * s}" y="${y * s}" width="${s}" height="${s}" fill="#fff" stroke="#94a3b8" stroke-width="1.5"/>`;
  full.forEach(k => { const x = k % c, y = Math.floor(k / c); g += `<rect class="it" data-k="F" x="${x * s}" y="${y * s}" width="${s}" height="${s}" fill="${color}" stroke="#0f172a" stroke-width="2"/>`; });
  half.forEach(([k, d]) => { const x = (k % c) * s, y = Math.floor(k / c) * s;
    const pts = d ? `${x},${y + s} ${x + s},${y + s} ${x + s},${y}` : `${x},${y} ${x},${y + s} ${x + s},${y + s}`;
    g += `<polygon class="it" data-k="H" points="${pts}" fill="#facc15" stroke="#0f172a" stroke-width="2"/>`; });
  return svgWrap(c * s + 4, r * s + 4, `<g transform="translate(2 2)">${g}</g>`, 300);
}

const GEN = [
  [ // Básico: contar cuadraditos
    () => { const a = between(2, 5), b = between(1, 4), c = 6, r = 5, x0 = rnd(c - a + 1), y0 = rnd(r - b + 1), ans = a * b;
      return { prompt: `Cada cuadradito mide 1. ¿Cuál es el <b>área</b> de la figura pintada?`, say: "Cada cuadradito mide uno. ¿Cuál es el área de la figura pintada?",
        scene: gridSvg(c, r, rectSet(c, a, b, x0, y0)), ans, opts: numOpts(ans, [2 * (a + b), ans + 1, ans - 1], 1),
        why: `La figura tiene ${ans} cuadraditos: su área es ${ans}.`, hint: "Cuenta los cuadraditos pintados.",
        steps: T => [
          { t: "El <b>área</b> es cuánto espacio ocupa la figura por dentro. Se mide contando cuadraditos." },
          { t: "Contamos los cuadraditos pintados:", go: T.count(T.of("P")) },
          { t: `Hay ${ans} cuadraditos: el área es <b>${ans}</b>.` }
        ],
        err: w => w === 2 * (a + b) ? "Ese es el perímetro (el borde); el área es lo de adentro." : "" }; },
    () => { const k = between(4, 9), ans = k;
      return { prompt: `¿Cuántos cuadraditos ocupa la figura? (su <b>área</b>)`, say: "¿Cuántos cuadraditos ocupa la figura?",
        scene: gridSvg(5, 4, blob(5, 4, k), { color: "#f472b6" }), ans, opts: numOpts(ans, [ans + 1, ans - 1, ans + 2], 1),
        why: `Contamos ${ans} cuadraditos.`, hint: "Ve fila por fila contando.",
        steps: T => [
          { t: "El <b>área</b> es cuántos cuadraditos ocupa la figura por dentro." },
          { t: "Contamos los cuadraditos pintados fila por fila:", go: T.count(T.of("P")) },
          { t: `El área es <b>${ans}</b> cuadraditos.` }
        ] }; },
    () => { const k1 = between(3, 7); let k2 = between(3, 7); while (k2 === k1) k2 = between(3, 7);
      const ans = k1 > k2 ? "La azul" : "La rosada", big = Math.max(k1, k2);
      return { prompt: `¿Qué figura tiene <b>más área</b>?`, say: "¿Qué figura tiene más área?",
        scene: `<div class="line"><span class="fa">${gridSvg(4, 3, blob(4, 3, k1), { color: "#38bdf8" })}</span><span class="fb">${gridSvg(4, 3, blob(4, 3, k2), { color: "#f472b6" })}</span></div>`,
        ans, opts: ["La azul", "La rosada", "Son iguales"], min: 3, why: `Azul: ${k1}, rosada: ${k2}. Tiene más ${ans.toLowerCase()} (${big}).`, hint: "Cuenta los cuadraditos de cada una.",
        steps: T => [
          { t: "Contamos la figura <b>azul</b>:", go: T.count(T.of("P", ".fa .it")) },
          { t: "Ahora la <b>rosada</b>:", go: T.count(T.of("P", ".fb .it"), { color: "#e11d48" }) },
          { t: `${k1} y ${k2}: tiene más área <b>${ans.toLowerCase()}</b>.` }
        ],
        err: w => w === "Son iguales" ? "Cuenta bien: no tienen la misma cantidad." : "" }; },
  ],
  [ // Intermedio: filas × columnas, diferencia, completar
    () => { const a = between(3, 6), b = between(2, 4), ans = a * b, nm = pick(["Tito", "Kiki", "Lula"]);
      return { prompt: `${nm} cubre el piso con ${b} filas de ${a} losetas cada una. ¿Cuántas losetas usa?`, say: `${nm} cubre el piso con ${b} filas de ${a} losetas. ¿Cuántas losetas usa?`,
        scene: gridSvg(a, b, rectSet(a, a, b), { color: "#fbbf24" }), ans, opts: numOpts(ans, [a + b, 2 * (a + b), ans + a], 1),
        why: `${b} filas de ${a}: ${Array(b).fill(a).join(" + ")} = ${ans}.`, hint: "Suma lo que hay en cada fila.",
        steps: T => [
          { t: `Cada fila tiene ${a} losetas. Hay ${b} filas.` },
          { t: "Sumamos fila por fila:", b: BOARD.lines([`${Array(b).fill(a).join(" + ")} = ${ans}`]) },
          { t: `Usa <b>${ans}</b> losetas: esa es el área del piso.` }
        ],
        err: w => w === a + b ? "No se suman filas y columnas; se suman las losetas de todas las filas." : w === 2 * (a + b) ? "Ese es el borde (perímetro)." : "" }; },
    () => { const a = between(3, 5), b = between(2, 3), k = between(2, a * b - 2), ans = a * b - k;
      const set = new Set([...rectSet(6, a, b)].slice(0, k));
      return { prompt: `Kiki quiere pintar todo el rectángulo de ${a} × ${b}. ¿Cuántos cuadraditos le <b>faltan</b>?`, say: `Kiki quiere pintar todo el rectángulo. ¿Cuántos cuadraditos le faltan?`,
        scene: gridSvg(a, b, new Set([...set].map(x => Math.floor(x / 6) * a + x % 6))), ans, opts: numOpts(ans, [k, a * b, ans + 1], 0),
        why: `El rectángulo tiene ${a * b}; ya pintó ${k}; faltan ${a * b} − ${k} = ${ans}.`, hint: "Cuenta los blancos.",
        steps: T => [
          { t: `El rectángulo tiene ${b} filas de ${a}: ${a * b} cuadraditos.` },
          { t: "Contamos los que <b>faltan</b> (blancos):", go: T.count(T.of("W"), { color: "#2563eb" }) },
          { t: `Faltan <b>${ans}</b>.` }
        ],
        err: w => w === k ? "Esos ya están pintados." : w === a * b ? "Ese es el total." : "" }; },
    () => { const a = between(2, 4), b = between(2, 3), c = between(1, 3), d = between(1, 2), ans = a * b + c * d;
      const C = 7, s = new Set([...rectSet(C, a, b), ...rectSet(C, c, d, a, b - d)]);
      return { prompt: `¿Cuál es el área de la figura? (cada cuadradito = 1)`, say: "¿Cuál es el área de la figura?",
        scene: gridSvg(C, 4, s, { color: "#a78bfa" }), ans, opts: numOpts(ans, [a * b, ans + 1, ans - 2], 1),
        why: `Partimos en dos rectángulos: ${a * b} + ${c * d} = ${ans}.`, hint: "Parte la figura en dos rectángulos.",
        steps: T => [
          { t: `Partimos la figura en dos rectángulos: uno de ${a * b} y otro de ${c * d} cuadraditos.` },
          { t: "Contamos todo para comprobar:", go: T.count(T.of("P")) },
          { t: `${a * b} + ${c * d} = <b>${ans}</b>.` }
        ],
        err: w => w === a * b ? "Contaste solo una parte de la figura." : "" }; },
  ],
  [ // Reto concurso: medios cuadraditos y comparaciones
    () => { const C = 5, R = 4, f = between(2, 6), h = pick([2, 4, 6]), cells = shuffle([...Array(C * R).keys()]);
      const full = cells.slice(0, f), half = cells.slice(f, f + h).map(k => [k, rnd(2)]), ans = f + h / 2;
      return { prompt: `Cada cuadradito tiene área 1 y cada triángulo es <b>medio</b> cuadradito. ¿Cuál es el área pintada?`, say: "Cada cuadradito tiene área uno y cada triángulo es medio cuadradito. ¿Cuál es el área pintada?",
        scene: halfGrid(C, R, full, half), ans, opts: numOpts(ans, [f + h, f, ans + 1], 1),
        why: `${f} cuadraditos enteros + ${h} medios (${h} ÷ 2 = ${h / 2}): ${f} + ${h / 2} = ${ans}.`, hint: "Dos triángulos forman un cuadradito.",
        steps: T => [
          { t: "Contamos los cuadraditos <b>enteros</b> (verdes):", go: T.count(T.of("F")) },
          { t: "Ahora los triángulos (amarillos). Cada <b>2 triángulos</b> forman 1 cuadradito:", go: T.count(T.of("H"), { color: "#f59e0b", label: k => (k % 2 ? "½" : String(k / 2)) }) },
          { t: `${f} enteros + ${h / 2} formados con triángulos = <b>${ans}</b>.` }
        ],
        err: w => w === f + h ? "Cada triángulo es solo medio cuadradito." : w === f ? "Faltan los triángulos." : "" }; },
    null
  ]
];
// reemplaza el generador vacío con uno de «mismo perímetro, distinta área»
GEN[2][1] = () => { const [a, b] = pick([[2, 4], [3, 3], [4, 2], [5, 1], [2, 3], [4, 3], [5, 2]]), ans = a * b;
  return { prompt: `Un rectángulo tiene ${a} cuadraditos de largo y ${b} de alto. Si lo cubrimos con cuadraditos de 1, ¿cuál es su área?`, say: `Un rectángulo tiene ${a} de largo y ${b} de alto. ¿Cuál es su área?`,
    scene: gridSvg(5, 4, rectSet(5, a, b), { color: "#34d399" }), ans, opts: numOpts(ans, [2 * (a + b), a + b, ans + 1], 1),
    why: `${b} filas de ${a}: ${ans}. (Su borde mide ${2 * (a + b)}, eso es el perímetro).`, hint: "Área = cuadraditos de adentro.",
    steps: T => [
          { t: "El área es lo de <b>adentro</b>: cuántos cuadraditos caben." },
      { t: `Tiene ${b} fila${b > 1 ? "s" : ""} de ${a} cuadraditos.`, go: T.count(T.of("P")) },
      { t: `El área es <b>${ans}</b>. Ojo: el borde (${2 * (a + b)}) es el perímetro, no el área.` }
    ],
    err: w => w === 2 * (a + b) ? "Ese es el perímetro." : w === a + b ? "Se suman los cuadraditos, no los lados." : "" }; };
GEN[2].push(() => { const a = between(2, 4), b = between(2, 3), cut = between(1, a * b - 2), ans = a * b - cut;
  const C = a, all = rectSet(C, a, b), rest = new Set([...all].slice(cut));
  return { prompt: `Tito tenía un chocolate de ${b} filas de ${a} cuadritos. Se comió los que faltan. ¿Qué área de chocolate <b>queda</b>?`, say: `Tito tenía un chocolate de ${b} filas de ${a} cuadritos. Se comió algunos. ¿Cuánto queda?`,
    scene: gridSvg(a, b, rest, { color: "#92400e" }), ans, opts: numOpts(ans, [cut, a * b, ans + 1], 0),
    why: `Quedan ${ans} cuadritos pintados: ${a * b} − ${cut} = ${ans}.`, hint: "Cuenta los cuadritos de chocolate que quedan.",
    steps: T => [
      { t: `El chocolate entero tenía ${b} × ${a} = ${a * b} cuadritos. Se comió ${cut} (los blancos).` },
      { t: "Contamos los que quedan:", go: T.count(T.of("P")) },
      { t: `Queda un área de <b>${ans}</b>.` }
    ],
    err: w => w === cut ? "Eso es lo que se comió." : "" }; });
lesson({ n: 66, next: 68, title: "Áreas (contar cuadraditos)", short: "Áreas", char: "tito", music: "marimba", deco: ["🟩", "📐", "🧩", "⭐"],
  hello: "¡Hola! Soy <b>Tito</b>. El <b>área</b> es el espacio de adentro de una figura. Para medirla contamos cuadraditos. ¡Ojo! El <b>perímetro</b> es el borde; el área es lo de adentro.",
  levels: LEVELS3(["Cuento cuadraditos", "¿Cuántos cuadraditos ocupa?"], ["Filas y figuras", "3 filas de 4 · figuras en L"], ["", "Medios cuadraditos y problemas"]) }, GEN);
