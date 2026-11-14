/* Tema 49 · Perímetro de figuras sencillas · Coco */
const rectLab = (w, h) => svgWrap(280, 150, `<rect x="70" y="28" width="190" height="100" fill="#fef3c7" stroke="#b45309" stroke-width="4"/><text x="165" y="20" text-anchor="middle" font-size="18" font-weight="900">${w} cm</text><text x="62" y="84" text-anchor="end" font-size="18" font-weight="900">${h} cm</text>`, 280);
const triLab = (a, b, c) => svgWrap(260, 170, `<path d="M130 15 L230 150 L30 150Z" fill="#dcfce7" stroke="#15803d" stroke-width="4"/><text x="60" y="80" font-size="18" font-weight="900">${a} cm</text><text x="190" y="80" font-size="18" font-weight="900">${b} cm</text><text x="130" y="168" text-anchor="middle" font-size="18" font-weight="900">${c} cm</text>`, 260);
function polyo(k) { const cells = new Set(["1,1"]); while (cells.size < k) { const [x, y] = pick([...cells]).split(",").map(Number), [dx, dy] = pick([[1, 0], [-1, 0], [0, 1], [0, -1]]), nx = x + dx, ny = y + dy; if (nx >= 0 && ny >= 0 && nx < 4 && ny < 3) cells.add(nx + "," + ny); } return [...cells].map(s => s.split(",").map(Number)); }
const GEN = [
  [
    () => { const w = between(3, 9), h = between(2, w), ans = 2 * (w + h);
      return { prompt: "El <b>perímetro</b> es la medida de todo el borde. ¿Cuál es el perímetro del rectángulo?", say: "¿Cuál es el perímetro del rectángulo? Suma todos sus lados.", scene: rectLab(w, h), ans, opts: numOpts(ans, [w + h, w * h, ans + 2], 1), why: `${w} + ${h} + ${w} + ${h} = ${ans} cm.`, hint: "El rectángulo tiene 4 lados: dos largos y dos cortos.",
        steps: T => { const L = [w, h, w, h];
          return [
            { t: `El <b>perímetro</b> es lo que mide <b>todo el borde</b>, como si caminaras alrededor de la figura. El rectángulo tiene 2 lados largos (${w} cm) y 2 cortos (${h} cm).` },
            { t: `Recorremos el borde y vamos sumando cada lado:`, go: T.edges(T.sc.querySelector("rect"), { label: k => String(L[k - 1]), say: k => String(L.slice(0, k).reduce((p, q) => p + q, 0)), ms: 1000 }) },
            { t: `${w} + ${h} + ${w} + ${h} = <b>${ans}</b> cm.`, b: BOARD.lines([`${w} + ${h} + ${w} + ${h} = ${ans}`]) }
          ]; },
        err: w2 => w2 === w + h ? "Sumaste solo dos lados; el rectángulo tiene cuatro." : w2 === w * h ? "Multiplicaste; el perímetro es sumar todos los lados." : "" }; },
    () => { const a = between(3, 8), b = between(3, 8), c = between(Math.abs(a - b) + 1, a + b - 1), ans = a + b + c;
      return { prompt: "¿Cuál es el perímetro del triángulo?", say: "¿Cuál es el perímetro del triángulo?", scene: triLab(a, b, c), ans, opts: numOpts(ans, [a + b, ans + 1, ans - 2], 1), why: `${a} + ${b} + ${c} = ${ans} cm.`, hint: "Suma sus tres lados.",
        steps: T => { const L = [a, c, b], acc = [a, a + c, a + b + c];
          return [
            { t: `El perímetro del triángulo es la suma de sus <b>3 lados</b>.` },
            { t: `Recorremos el borde sumando:`, go: T.edges(T.sc.querySelector("path"), { label: k => String([b, c, a][k - 1]), say: k => String([b, b + c, a + b + c][k - 1]), ms: 1000 }) },
            { t: `${a} + ${b} + ${c} = <b>${ans}</b> cm.`, b: BOARD.lines([`${a} + ${b} + ${c} = ${ans}`]) }
          ]; },
        err: w => w === a + b ? "Te faltó sumar un lado." : "" }; },
  ],
  [
    () => { const s = between(2, 9), ans = 4 * s;
      return { prompt: `Un cuadrado tiene lados de <b>${s} cm</b>. ¿Cuál es su perímetro?`, say: `Un cuadrado tiene lados de ${s} centímetros. ¿Cuál es su perímetro?`, scene: svgWrap(140, 140, `<rect x="20" y="20" width="100" height="100" fill="#e0e7ff" stroke="#4338ca" stroke-width="4"/><text x="70" y="14" text-anchor="middle" font-size="16" font-weight="900">${s} cm</text>`, 140), ans, opts: numOpts(ans, [2 * s, s + 4, s * s !== ans ? s * s : ans + 4], 1), why: `4 lados iguales: ${s} × 4 = ${ans} cm.`, hint: "El cuadrado tiene sus 4 lados iguales.",
        steps: T => [
          { t: `El cuadrado tiene sus <b>4 lados iguales</b>: cada uno mide ${s} cm.` },
          { t: `Recorremos el borde:`, go: T.edges(T.sc.querySelector("rect"), { label: () => String(s), say: k => String(k * s), ms: 1000 }) },
          { t: `${s} + ${s} + ${s} + ${s} = <b>${ans}</b> cm.`, b: BOARD.lines([`${s} + ${s} + ${s} + ${s} = ${ans}`, `4 × ${s} = ${ans}`]) }
        ],
        err: w => w === 2 * s ? "Sumaste solo dos lados." : w === s * s ? "Multiplicaste lado por lado; el perímetro es sumar los 4 lados." : "" }; },
    () => { const r = between(1, 3), c = between(2, 4), ans = 2 * (r + c);
      return { prompt: "Cada cuadradito mide <b>1 cm</b> de lado. ¿Cuál es el perímetro de la figura pintada?", say: "Cada cuadradito mide 1 centímetro. ¿Cuál es el perímetro?", scene: gridSvg(c, r, new Set([...Array(r * c).keys()]), { color: "#86efac" }), ans, opts: numOpts(ans, [r * c, ans + 2, ans - 2], 1), why: `Cuenta los bordes de afuera: ${c} + ${r} + ${c} + ${r} = ${ans} cm.`, hint: "Recorre el borde con tu dedo contando los lados de los cuadraditos.",
        steps: T => { const S = 34, segs = [];
          for (let x = 0; x < c; x++) segs.push([x * S, 0, (x + 1) * S, 0]);
          for (let y = 0; y < r; y++) segs.push([c * S, y * S, c * S, (y + 1) * S]);
          for (let x = c - 1; x >= 0; x--) segs.push([(x + 1) * S, r * S, x * S, r * S]);
          for (let y = r - 1; y >= 0; y--) segs.push([0, (y + 1) * S, 0, y * S]);
          return [
            { t: `Cada lado de un cuadradito mide 1 cm. Contamos solo los lados del <b>borde de afuera</b>, no los de adentro.` },
            { t: `Recorremos el borde con el dedo:`, go: T.strokes(T.sc.querySelector("svg"), segs) },
            { t: `Hay ${ans} lados de 1 cm: ${c} + ${r} + ${c} + ${r} = <b>${ans}</b> cm.` }
          ]; },
        err: w => w === r * c ? "Contaste los cuadraditos; el perímetro es el borde de afuera." : "" }; },
  ],
  [
    () => { const k = between(4, 6), cells = polyo(k), key = new Set(cells.map(p => p.join(","))), s = pick([1, 2]);
      let e = 0; cells.forEach(([x, y]) => [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dy]) => { if (!key.has((x + dx) + "," + (y + dy))) e++; }));
      const ans = e * s, painted = new Set(cells.map(([x, y]) => y * 4 + x));
      return { prompt: `Si cada lado de los cuadraditos mide <b>${s} cm</b>, calcula el perímetro de la figura sombreada.`, say: `Cada cuadradito mide ${s} centímetros de lado. ¿Cuál es el perímetro de la figura de color?`, scene: gridSvg(4, 3, painted, { color: "#86efac" }), ans, opts: numOpts(ans, [k * s, (e - 2) * s, (e + 2) * s], 1),
        why: `El borde tiene ${e} lados de ${s} cm: ${e} × ${s} = ${ans} cm.`, hint: "Cuenta solo los lados de afuera de la figura verde.",
        steps: T => { const S = 34, segs = [];
          cells.forEach(([x, y]) => { if (!key.has(x + "," + (y - 1))) segs.push([x * S, y * S, (x + 1) * S, y * S]); if (!key.has((x + 1) + "," + y)) segs.push([(x + 1) * S, y * S, (x + 1) * S, (y + 1) * S]); if (!key.has(x + "," + (y + 1))) segs.push([x * S, (y + 1) * S, (x + 1) * S, (y + 1) * S]); if (!key.has((x - 1) + "," + y)) segs.push([x * S, y * S, x * S, (y + 1) * S]); });
          return [
            { t: `Contamos los lados de cuadradito que están en el <b>borde de afuera</b> de la figura verde (los de adentro no cuentan).` },
            { t: `Los marcamos uno por uno:`, go: T.strokes(T.sc.querySelector("svg"), segs, { ms: 550 }) },
            { t: `Hay ${e} lados y cada uno mide ${s} cm: ${s === 1 ? `${e} cm` : `${e} × ${s} = ${ans} cm`}. El perímetro es <b>${ans}</b> cm.` }
          ]; },
        err: w => w === k * s ? "Contaste cuadraditos; el perímetro es el borde." : "" }; },
  ]
];
lesson({ n: 49, next: 66, title: "Perímetro de figuras sencillas", short: "Perímetro", char: "coco", music: "funk", deco: ["📏", "🟩", "🔺", "▭"],
  hello: "¡Hola! Soy <b>Coco</b> 🐵. El <b>perímetro</b> es lo que mide todo el borde de una figura. ¡Recórrelo con tu dedo!",
  levels: LEVELS3(["Rectángulos y triángulos", "Sumar los lados"], ["Cuadrados y cuadrículas", "Lados iguales"], ["", "Figuras con cuadraditos"]) }, GEN);
