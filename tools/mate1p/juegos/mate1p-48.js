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
      return { prompt: "¿Cuántos <b>segmentos</b> hay?", say: "¿Cuántos segmentos hay en total? Un segmento une dos puntos.", scene: segPoints(p), ans, opts: numOpts(ans, [p - 1, p, ans + 1], 1), why: `${Array.from({ length: p - 1 }, (_, i) => p - 1 - i).join(" + ")} = ${ans}: ${["AB", "AC", "AD", "BC", "BD", "CD"].filter(s => s.charCodeAt(1) - 65 < p).join(", ")}.`, hint: "Empieza en A y une con todos los demás; luego sigue con B…" }; },
    () => { const m = 2, ans = 3;
      return { prompt: "¿Cuántos <b>triángulos</b> hay en la figura?", say: "¿Cuántos triángulos hay en total? ¡Cuenta también el grande!", scene: triFan(m, 0), ans, opts: [2, 3, 4, 5], cols: 4, why: "2 pequeños + 1 grande = 3.", hint: "No olvides el triángulo grande." }; },
  ],
  [
    () => { const m = between(2, 3), h = between(0, 1), ans = (h + 1) * m * (m + 1) / 2;
      return { prompt: "¿Cuántos triángulos hay en la figura?", say: "¿Cuántos triángulos hay en total?", scene: triFan(m, h), ans, opts: numOpts(ans, [m * (h + 1), ans - 1, ans + 2], 1), why: `Hay ${m * (m + 1) / 2} triángulos con la punta de arriba${h ? ` en cada piso (×${h + 1})` : ""}: ${ans}.`, hint: "Cuenta los de 1 pieza, luego los de 2 piezas, luego los de 3…" }; },
    () => { const c = between(2, 4), ans = c * (c + 1) / 2;
      return { prompt: "¿Cuántos <b>rectángulos</b> hay en la figura?", say: "¿Cuántos rectángulos hay en total?", scene: rectGrid(1, c), ans, opts: numOpts(ans, [c, c + 1, ans + 1], 1), why: `Simples ${c}, de a 2: ${c - 1}${c > 2 ? `, de a 3: ${c - 2}` : ""}${c > 3 ? ", de a 4: 1" : ""}. Total ${ans}.`, hint: "Cuenta los pequeños, luego los que se forman juntando 2, 3…" }; },
  ],
  [
    () => { const t = rnd(3); let scene, ans, nombre;
      if (t === 0) { ans = M_PTS.length; scene = mSvg(); nombre = "la letra M"; }
      else { const L = pick(Object.keys(LETRAS)); ans = lados(LETRAS[L]); scene = letraSvg(LETRAS[L]); nombre = `la letra ${L}`; }
      return { prompt: `¿Cuántos <b>lados</b> tiene todo el contorno de ${nombre}?`, say: `¿Cuántos lados tiene todo el contorno de ${nombre}?`, scene, ans, opts: numOpts(ans, [ans - 2, ans + 2, ans - 1], 3),
        why: `Recorriendo el borde y contando cada lado recto: ${ans} lados.`, hint: "Pon tu dedo en una esquina y recorre todo el borde contando cada lado hasta volver al inicio." }; },
    () => { const c = between(2, 3), ans = 3 * c * (c + 1) / 2;
      return { prompt: "¿Cuántos rectángulos (incluidos los cuadrados) hay en la figura?", say: "¿Cuántos rectángulos hay en total, incluidos los cuadrados?", scene: rectGrid(2, c), ans, opts: numOpts(ans, [2 * c, ans - 3, ans + 2], 1), why: `Por filas hay ${c * (c + 1) / 2} formas en el ancho y 3 en lo alto: 3 × ${c * (c + 1) / 2} = ${ans}.`, hint: "Cuenta los de arriba, los de abajo y los que usan las dos filas." }; },
    () => { const n = between(2, 3), ans = n === 2 ? 5 : 14;
      return { prompt: "¿Cuántos <b>cuadrados</b> hay en la figura?", say: "¿Cuántos cuadrados hay en total?", scene: squareGrid(n), ans, opts: numOpts(ans, [n * n, n * n + 1, ans + 1], 1), why: n === 2 ? "4 pequeños + 1 grande = 5." : "9 pequeños + 4 medianos + 1 grande = 14.", hint: "Pequeños, medianos y el grande." }; },
    () => { const p = 5, ans = C2(p);
      return { prompt: "¿Cuántos segmentos hay en total?", say: "¿Cuántos segmentos hay en total?", scene: segPoints(p), ans, opts: numOpts(ans, [4, 5, 8], 1), why: "4 + 3 + 2 + 1 = 10.", hint: "Desde A salen 4, desde B salen 3 nuevos…" }; },
  ]
];
lesson({ n: 48, next: 63, title: "Conteo de triángulos, rectángulos y segmentos", short: "Contar figuras", char: "tito", music: "chiptune", deco: ["🔺", "▭", "📏", "🔢"],
  hello: "¡Bip bup! Soy <b>Tito</b> 🤖. En una figura se esconden más triángulos y rectángulos de los que parece. ¡Cuéntalos todos!",
  levels: LEVELS3(["Segmentos y triángulos", "Los pequeños y el grande"], ["Más figuras", "Triángulos y rectángulos"], ["", "Retos de conteo y lados de contornos"]) }, GEN);
