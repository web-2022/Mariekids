/* Tema 48 · Conteo de triángulos, rectángulos y segmentos · Tito */
// letras de bloques: celdas de una cuadrícula de 3 × 5 ("#" = pintado)
const LETRAS = { L: ["#..", "#..", "#..", "#..", "###"], T: ["###", ".#.", ".#.", ".#.", ".#."], U: ["#.#", "#.#", "#.#", "#.#", "###"], H: ["#.#", "#.#", "###", "#.#", "#.#"],
  E: ["###", "#..", "###", "#..", "###"], F: ["###", "#..", "###", "#..", "#.."], C: ["###", "#..", "#..", "#..", "###"], J: ["..#", "..#", "..#", "#.#", "###"] };
function lados(rows) {            // esquinas del contorno = número de lados
  const on = (x, y) => y >= 0 && y < rows.length && x >= 0 && x < rows[0].length && rows[y][x] === "#"; let k = 0;
  for (let y = 0; y <= rows.length; y++) for (let x = 0; x <= rows[0].length; x++) {
    const a = on(x - 1, y - 1), b = on(x, y - 1), c = on(x - 1, y), d = on(x, y), n = a + b + c + d;
    if (n === 1 || n === 3) k++; else if (n === 2 && a === d) k += 2;
  }
  return k;
}
function letraSvg(rows, col = "#93c5fd") {
  const s = 30, W = rows[0].length * s, H = rows.length * s; let g = "";
  rows.forEach((r, y) => [...r].forEach((ch, x) => { if (ch === "#") g += `<rect x="${x * s}" y="${y * s}" width="${s + .5}" height="${s + .5}" fill="${col}" stroke="none"/>`; }));
  const on = (x, y) => y >= 0 && y < rows.length && x >= 0 && x < rows[0].length && rows[y][x] === "#";
  rows.forEach((r, y) => [...r].forEach((ch, x) => { if (ch !== "#") return;
    if (!on(x, y - 1)) g += `<line x1="${x * s}" y1="${y * s}" x2="${x * s + s}" y2="${y * s}"/>`; if (!on(x, y + 1)) g += `<line x1="${x * s}" y1="${y * s + s}" x2="${x * s + s}" y2="${y * s + s}"/>`;
    if (!on(x - 1, y)) g += `<line x1="${x * s}" y1="${y * s}" x2="${x * s}" y2="${y * s + s}"/>`; if (!on(x + 1, y)) g += `<line x1="${x * s + s}" y1="${y * s}" x2="${x * s + s}" y2="${y * s + s}"/>`; }));
  return `<svg viewBox="-4 -4 ${W + 8} ${H + 8}" width="${(W + 8) * 0.9}" stroke="#1e3a8a" stroke-width="4" stroke-linecap="square">${g}</svg>`;
}
// letra M como en los concursos (contorno con diagonales)
const M_PTS = [[0, 100], [0, 0], [18, 0], [40, 38], [62, 0], [80, 0], [80, 100], [62, 100], [62, 35], [40, 72], [18, 35], [18, 100]];
const mSvg = () => `<svg viewBox="-6 -6 92 112" width="110"><path d="M${M_PTS.map(p => p.join(" ")).join(" L")}Z" fill="#93c5fd" stroke="#1e3a8a" stroke-width="3.5" stroke-linejoin="miter"/></svg>`;
const GEN = [
  [
    () => { const p = between(3, 4), ans = C2(p);
      return { prompt: "¿Cuántos <b>segmentos</b> hay?", say: "¿Cuántos segmentos hay en total? Un segmento une dos puntos.", scene: segPoints(p), ans, opts: numOpts(ans, [p - 1, p, ans + 1], 1), why: `${Array.from({ length: p - 1 }, (_, i) => p - 1 - i).join(" + ")} = ${ans}: ${["AB", "AC", "AD", "BC", "BD", "CD"].filter(s => s.charCodeAt(1) - 65 < p).join(", ")}.`, hint: "Empieza en A y une con todos los demás; luego sigue con B…",
        steps: T => { const N = "ABCD", grp = Array.from({ length: p - 1 }, (_, i) => Array.from({ length: p - 1 - i }, (_, j) => N[i] + N[i + 1 + j]));
          return [
            { t: `Un <b>segmento</b> une dos puntos. Contamos en orden para no olvidar ninguno: primero todos los que empiezan en A, luego en B…` },
            { t: `Los vamos marcando uno por uno:`, go: T.flash(FIG.segs(p), { say: (k, sh) => sh.name }) },
            { t: `${grp.map((g, i) => `Desde ${N[i]}: ${g.length}`).join(" · ")}. Total: ${grp.map(g => g.length).join(" + ")} = <b>${ans}</b>.`, b: BOARD.lines(grp.map((g, i) => `${N[i]} → ${g.join(", ")}`).concat([`${grp.map(g => g.length).join(" + ")} = ${ans}`]), { step: .8 }) }
          ]; },
        err: w => w === p - 1 ? "Contaste solo los pedacitos pequeños; también hay segmentos más largos, como AC." : w === p ? "Contaste los puntos; piden segmentos." : "" }; },
    () => { const m = 2, ans = 3;
      return { prompt: "¿Cuántos <b>triángulos</b> hay en la figura?", say: "¿Cuántos triángulos hay en total? ¡Cuenta también el grande!", scene: triFan(m, 0), ans, opts: [2, 3, 4, 5], cols: 4, why: "2 pequeños + 1 grande = 3.", hint: "No olvides el triángulo grande.",
        steps: T => [
          { t: `Contamos los triángulos <b>pequeños</b> (de 1 pieza) y después los que se forman <b>juntando</b> piezas.` },
          { t: `Los marcamos uno por uno:`, go: T.flash(FIG.triFan(2, 0)) },
          { t: `2 pequeños + 1 grande = <b>3</b>.` }
        ],
        err: w => w === 2 ? "¡Falta el triángulo grande!" : "" }; },
  ],
  [
    () => { const m = between(2, 3), h = between(0, 1), ans = (h + 1) * m * (m + 1) / 2;
      return { prompt: "¿Cuántos triángulos hay en la figura?", say: "¿Cuántos triángulos hay en total?", scene: triFan(m, h), ans, opts: numOpts(ans, [m * (h + 1), ans - 1, ans + 2], 1), why: `Hay ${m * (m + 1) / 2} triángulos con la punta de arriba${h ? ` en cada piso (×${h + 1})` : ""}: ${ans}.`, hint: "Cuenta los de 1 pieza, luego los de 2 piezas, luego los de 3…",
        steps: T => { const F = FIG.triFan(m, h), n1 = m * (m + 1) / 2;
          return [
            { t: `Todos los triángulos tienen la punta arriba. Contamos ${h ? "en cada piso: " : ""}los de 1 pieza, luego los de 2 piezas${m > 2 ? ", luego los de 3" : ""}.` },
            { t: `Los marcamos uno por uno:`, go: T.flash(F) },
            { t: `${h ? `Cada piso tiene ${n1} triángulos, y hay ${h + 1} pisos: ${Array(h + 1).fill(n1).join(" + ")}` : Array.from({ length: m }, (_, i) => m - i).join(" + ")} = <b>${ans}</b>.` }
          ]; },
        err: w => w === m * (h + 1) ? "Contaste solo los pequeños; ¡también hay triángulos formados por varias piezas!" : "" }; },
    () => { const c = between(2, 4), ans = c * (c + 1) / 2;
      return { prompt: "¿Cuántos <b>rectángulos</b> hay en la figura?", say: "¿Cuántos rectángulos hay en total?", scene: rectGrid(1, c), ans, opts: numOpts(ans, [c, c + 1, ans + 1], 1), why: `Simples ${c}, de a 2: ${c - 1}${c > 2 ? `, de a 3: ${c - 2}` : ""}${c > 3 ? ", de a 4: 1" : ""}. Total ${ans}.`, hint: "Cuenta los pequeños, luego los que se forman juntando 2, 3…",
        steps: T => [
          { t: `Contamos los rectángulos por tamaño: los de 1 pieza, luego los de 2 piezas juntas${c > 2 ? ", de 3" : ""}${c > 3 ? " y de 4" : ""}.` },
          { t: `Los marcamos uno por uno:`, go: T.flash(FIG.rects(1, c)) },
          { t: `${Array.from({ length: c }, (_, i) => c - i).join(" + ")} = <b>${ans}</b>.`, b: BOARD.lines(Array.from({ length: c }, (_, i) => `de ${i + 1} pieza${i ? "s" : ""}: ${c - i}`).concat([`${Array.from({ length: c }, (_, i) => c - i).join(" + ")} = ${ans}`]), { step: .6 }) }
        ],
        err: w => w === c ? "Contaste solo los pequeños; juntando piezas salen más." : "" }; },
  ],
  [
    () => { const t = rnd(3); let scene, ans, nombre;
      if (t === 0) { ans = M_PTS.length; scene = mSvg(); nombre = "la letra M"; }
      else { const L = pick(Object.keys(LETRAS)); ans = lados(LETRAS[L]); scene = letraSvg(LETRAS[L]); nombre = `la letra ${L}`; }
      return { prompt: `¿Cuántos <b>lados</b> tiene todo el contorno de ${nombre}?`, say: `¿Cuántos lados tiene todo el contorno de ${nombre}?`, scene, ans, opts: numOpts(ans, [ans - 2, ans + 2, ans - 1], 3),
        why: `Recorriendo el borde y contando cada lado recto: ${ans} lados.`, hint: "Pon tu dedo en una esquina y recorre todo el borde contando cada lado hasta volver al inicio.",
        steps: T => { const svg = T.sc.querySelector("svg");
          if (t === 0) return [
            { t: `Recorremos el borde de la M con el dedo, desde una esquina, y contamos cada lado recto hasta volver al inicio.` },
            { t: `Contamos:`, go: T.edges(svg.querySelector("path"), { sw: 5, r: 7, fs: 10, ms: 650 }) },
            { t: `La M tiene <b>${ans}</b> lados.` }
          ];
          const R = LETRAS[nombre.slice(-1)], on = (x, y) => y >= 0 && y < R.length && x >= 0 && x < R[0].length && R[y][x] === "#", pts = [];
          for (let y = 0; y <= R.length; y++) for (let x = 0; x <= R[0].length; x++) { const a = on(x - 1, y - 1), b = on(x, y - 1), c2 = on(x - 1, y), d = on(x, y), n2 = a + b + c2 + d; if (n2 === 1 || n2 === 3) pts.push([x * 30, y * 30]); }
          return [
            { t: `Truco: en un contorno cerrado hay tantos <b>lados</b> como <b>esquinas</b>. Cada lado termina en una esquina donde el borde dobla.` },
            { t: `Marcamos cada esquina:`, go: T.dots(svg, pts, { r: 9, ms: 650 }) },
            { t: `Hay ${ans} esquinas: el contorno de ${nombre} tiene <b>${ans}</b> lados.` }
          ]; } }; },
    () => { const c = between(2, 3), ans = 3 * c * (c + 1) / 2;
      return { prompt: "¿Cuántos rectángulos (incluidos los cuadrados) hay en la figura?", say: "¿Cuántos rectángulos hay en total, incluidos los cuadrados?", scene: rectGrid(2, c), ans, opts: numOpts(ans, [2 * c, ans - 3, ans + 2], 1), why: `Por filas hay ${c * (c + 1) / 2} formas en el ancho y 3 en lo alto: 3 × ${c * (c + 1) / 2} = ${ans}.`, hint: "Cuenta los de arriba, los de abajo y los que usan las dos filas.",
        steps: T => [
          { t: `Contamos por tamaños: primero los de 1 cuadradito, después los de 2, 3… y también los que usan las dos filas.` },
          { t: `Los marcamos uno por uno:`, go: T.flash(FIG.rects(2, c), { ms: 650 }) },
          { t: `Una fila sola tiene ${c * (c + 1) / 2} rectángulos. Hay arriba, abajo y los de las dos filas juntas: 3 × ${c * (c + 1) / 2} = <b>${ans}</b>.` }
        ],
        err: w => w === 2 * c ? "Contaste solo los pequeños." : "" }; },
    () => { const n = between(2, 3), ans = n === 2 ? 5 : 14;
      return { prompt: "¿Cuántos <b>cuadrados</b> hay en la figura?", say: "¿Cuántos cuadrados hay en total?", scene: squareGrid(n), ans, opts: numOpts(ans, [n * n, n * n + 1, ans + 1], 1), why: n === 2 ? "4 pequeños + 1 grande = 5." : "9 pequeños + 4 medianos + 1 grande = 14.", hint: "Pequeños, medianos y el grande.",
        steps: T => [
          { t: `Contamos los cuadrados por tamaño: pequeños, ${n === 3 ? "medianos (de 2 × 2) " : ""}y el grande.` },
          { t: `Los marcamos uno por uno:`, go: T.flash(FIG.squares(n)) },
          { t: n === 2 ? `4 pequeños + 1 grande = <b>5</b>.` : `9 pequeños + 4 medianos + 1 grande = <b>14</b>.` }
        ],
        err: w => w === n * n ? "Contaste solo los pequeños; ¡también hay cuadrados más grandes!" : "" }; },
    () => { const p = 5, ans = C2(p);
      return { prompt: "¿Cuántos segmentos hay en total?", say: "¿Cuántos segmentos hay en total?", scene: segPoints(p), ans, opts: numOpts(ans, [4, 5, 8], 1), why: "4 + 3 + 2 + 1 = 10.", hint: "Desde A salen 4, desde B salen 3 nuevos…",
        steps: T => [
          { t: `Un segmento une dos puntos. Contamos en orden: desde A, desde B, desde C y desde D.` },
          { t: `Los marcamos uno por uno:`, go: T.flash(FIG.segs(5), { ms: 700, say: (k, sh) => sh.name }) },
          { t: `Desde A salen 4, desde B 3 nuevos, desde C 2 y desde D 1: 4 + 3 + 2 + 1 = <b>10</b>.`, b: BOARD.lines(["A → AB, AC, AD, AE", "B → BC, BD, BE", "C → CD, CE", "D → DE", "4 + 3 + 2 + 1 = 10"], { step: .7 }) }
        ],
        err: w => w === 4 ? "Contaste solo los pedacitos; también hay segmentos largos." : "" }; },
  ]
];
lesson({ n: 48, next: 63, title: "Conteo de triángulos, rectángulos y segmentos", short: "Contar figuras", char: "tito", music: "chiptune", deco: ["🔺", "▭", "📏", "🔢"],
  hello: "¡Bip bup! Soy <b>Tito</b> 🤖. En una figura se esconden más triángulos y rectángulos de los que parece. ¡Cuéntalos todos!",
  levels: LEVELS3(["Segmentos y triángulos", "Los pequeños y el grande"], ["Más figuras", "Triángulos y rectángulos"], ["", "Retos de conteo y lados de contornos"]) }, GEN);
