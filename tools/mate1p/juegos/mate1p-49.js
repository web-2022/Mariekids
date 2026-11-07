/* Tema 49 · Perímetro de figuras sencillas · Coco */
const rectLab = (w, h) => svgWrap(280, 150, `<rect x="70" y="28" width="190" height="100" fill="#fef3c7" stroke="#b45309" stroke-width="4"/><text x="165" y="20" text-anchor="middle" font-size="18" font-weight="900">${w} cm</text><text x="62" y="84" text-anchor="end" font-size="18" font-weight="900">${h} cm</text>`, 280);
const triLab = (a, b, c) => svgWrap(260, 170, `<path d="M130 15 L230 150 L30 150Z" fill="#dcfce7" stroke="#15803d" stroke-width="4"/><text x="60" y="80" font-size="18" font-weight="900">${a} cm</text><text x="190" y="80" font-size="18" font-weight="900">${b} cm</text><text x="130" y="168" text-anchor="middle" font-size="18" font-weight="900">${c} cm</text>`, 260);
function polyo(k) { const cells = new Set(["1,1"]); while (cells.size < k) { const [x, y] = pick([...cells]).split(",").map(Number), [dx, dy] = pick([[1, 0], [-1, 0], [0, 1], [0, -1]]), nx = x + dx, ny = y + dy; if (nx >= 0 && ny >= 0 && nx < 4 && ny < 3) cells.add(nx + "," + ny); } return [...cells].map(s => s.split(",").map(Number)); }
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
    () => { const w = between(3, 9), h = between(2, w), ans = 2 * (w + h);
      return { prompt: "El <b>perímetro</b> es la medida de todo el borde. ¿Cuál es el perímetro del rectángulo?", say: "¿Cuál es el perímetro del rectángulo? Suma todos sus lados.", scene: rectLab(w, h), ans, opts: numOpts(ans, [w + h, w * h, ans + 2], 1), why: `${w} + ${h} + ${w} + ${h} = ${ans} cm.`, hint: "El rectángulo tiene 4 lados: dos largos y dos cortos." }; },
    () => { const a = between(3, 8), b = between(3, 8), c = between(Math.abs(a - b) + 1, a + b - 1), ans = a + b + c;
      return { prompt: "¿Cuál es el perímetro del triángulo?", say: "¿Cuál es el perímetro del triángulo?", scene: triLab(a, b, c), ans, opts: numOpts(ans, [a + b, ans + 1, ans - 2], 1), why: `${a} + ${b} + ${c} = ${ans} cm.`, hint: "Suma sus tres lados." }; },
  ],
  [
    () => { const s = between(2, 9), ans = 4 * s;
      return { prompt: `Un cuadrado tiene lados de <b>${s} cm</b>. ¿Cuál es su perímetro?`, say: `Un cuadrado tiene lados de ${s} centímetros. ¿Cuál es su perímetro?`, scene: svgWrap(140, 140, `<rect x="20" y="20" width="100" height="100" fill="#e0e7ff" stroke="#4338ca" stroke-width="4"/><text x="70" y="14" text-anchor="middle" font-size="16" font-weight="900">${s} cm</text>`, 140), ans, opts: numOpts(ans, [2 * s, s + 4, s * s !== ans ? s * s : ans + 4], 1), why: `4 lados iguales: ${s} × 4 = ${ans} cm.`, hint: "El cuadrado tiene sus 4 lados iguales." }; },
    () => { const r = between(1, 3), c = between(2, 4), ans = 2 * (r + c);
      return { prompt: "Cada cuadradito mide <b>1 cm</b> de lado. ¿Cuál es el perímetro de la figura pintada?", say: "Cada cuadradito mide 1 centímetro. ¿Cuál es el perímetro?", scene: gridSvg(c, r, new Set([...Array(r * c).keys()]), { color: "#86efac" }), ans, opts: numOpts(ans, [r * c, ans + 2, ans - 2], 1), why: `Cuenta los bordes de afuera: ${c} + ${r} + ${c} + ${r} = ${ans} cm.`, hint: "Recorre el borde con tu dedo contando los lados de los cuadraditos." }; },
  ],
  [
    () => { const t = rnd(3); let scene, ans, nombre;
      if (t === 0) { ans = M_PTS.length; scene = mSvg(); nombre = "la letra M"; }
      else { const L = pick(Object.keys(LETRAS)); ans = lados(LETRAS[L]); scene = letraSvg(LETRAS[L]); nombre = `la letra ${L}`; }
      return { prompt: `¿Cuántos <b>lados</b> tiene todo el contorno de ${nombre}?`, say: `¿Cuántos lados tiene todo el contorno de ${nombre}?`, scene, ans, opts: numOpts(ans, [ans - 2, ans + 2, ans - 1], 3),
        why: `Recorriendo el borde y contando cada lado recto: ${ans} lados.`, hint: "Pon tu dedo en una esquina y recorre todo el borde contando cada lado hasta volver al inicio." }; },
    () => { const k = between(4, 6), cells = polyo(k), key = new Set(cells.map(p => p.join(","))), s = pick([1, 2]);
      let e = 0; cells.forEach(([x, y]) => [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dy]) => { if (!key.has((x + dx) + "," + (y + dy))) e++; }));
      const ans = e * s, painted = new Set(cells.map(([x, y]) => y * 4 + x));
      return { prompt: `Si cada lado de los cuadraditos mide <b>${s} cm</b>, calcula el perímetro de la figura sombreada.`, say: `Cada cuadradito mide ${s} centímetros de lado. ¿Cuál es el perímetro de la figura de color?`, scene: gridSvg(4, 3, painted, { color: "#86efac" }), ans, opts: numOpts(ans, [k * s, (e - 2) * s, (e + 2) * s], 1),
        why: `El borde tiene ${e} lados de ${s} cm: ${e} × ${s} = ${ans} cm.`, hint: "Cuenta solo los lados de afuera de la figura verde." }; },
  ]
];
lesson({ n: 49, title: "Perímetro de figuras sencillas", short: "Perímetro", char: "coco", music: "funk", deco: ["📏", "🟩", "🔺", "▭"],
  hello: "¡Hola! Soy <b>Coco</b> 🐵. El <b>perímetro</b> es lo que mide todo el borde de una figura. ¡Recórrelo con tu dedo!",
  levels: LEVELS3(["Rectángulos y triángulos", "Sumar los lados"], ["Cuadrados y cuadrículas", "Lados iguales"], ["", "Contornos de letras y figuras con cuadraditos"]) }, GEN);
