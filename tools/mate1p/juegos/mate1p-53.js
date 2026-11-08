/* Tema 53 · Cuadrículas, coordenadas, recorridos y posiciones · Rayo */
const OB = ["⚽", "🐟", "🎲", "⭐", "🍎", "🐱"];
const MV = { "↑": [0, 1], "↓": [0, -1], "→": [1, 0], "←": [-1, 0] };
const GEN = [
  [
    () => { const x = between(1, 5), y = between(1, 4), e = pick(OB), ans = `(${x};${y})`;
      return { prompt: `¿En qué coordenada está ${e}? (columna ; fila)`, say: "¿En qué coordenada está? Primero la columna, luego la fila.", scene: coordGrid(6, 5, [{ x, y, e }]), ans, opts: shuffle([...new Set([ans, `(${y};${x})`, `(${x + 1};${y})`, `(${x};${y + 1 > 5 ? y - 1 : y + 1})`])]), cols: 2, why: `Columna ${x}, fila ${y}: ${ans}.`, hint: "Primero baja la mirada a la columna (abajo) y luego a la fila (lado).",
        steps: T => { const [px, py] = coordXY(6, 5, x, y), [ax] = coordXY(6, 5, x, 0), [, ay] = coordXY(6, 5, 0, y), [x0, y0] = coordXY(6, 5, 0, 0);
          return [
            { t: `Una coordenada se escribe <b>(columna ; fila)</b>. Primero miramos hacia <b>abajo</b> (columna) y después hacia el <b>lado</b> (fila).` },
            { t: `Bajamos desde ${e} hasta los números de abajo: columna <b>${x}</b>. Vamos hacia el lado: fila <b>${y}</b>.`, go: T.strokes(T.sc.querySelector("svg"), [[px, py, ax, y0], [px, py, x0, ay]], { label: k => k === 1 ? x : y, ms: 1100 }) },
            { t: `La coordenada es <b>${ans}</b>.` }
          ]; },
        err: w => w === `(${y};${x})` ? "¡Al revés! Primero va la columna (abajo) y después la fila (lado)." : "" }; },
  ],
  [
    () => { let x = between(1, 3), y = between(1, 2); const sx = x, sy = y, steps = []; for (let i = 0; i < 3; i++) { for (;;) { const d = pick(Object.keys(MV)), n = between(1, 3), nx = x + MV[d][0] * n, ny = y + MV[d][1] * n; if (nx >= 0 && nx <= 6 && ny >= 0 && ny <= 5) { steps.push([n, d]); x = nx; y = ny; break; } } }
      const ans = `(${x};${y})`;
      return { prompt: "Partiendo del 🎲, sigue el recorrido de las flechas. ¿En qué coordenada termina?", say: "Parte del dado y sigue las flechas. ¿Dónde termina?", scene: `<div class="seq" style="font-size:20px">${steps.map(([n, d]) => `<span class="card-op">${n}${d}</span>`).join(" ")}</div>` + coordGrid(6, 5, [{ x: sx, y: sy, e: "🎲" }]),
        ans, opts: shuffle([...new Set([ans, `(${y};${x})`, `(${x + 1};${y})`, `(${x};${Math.max(0, y - 1) === y ? y + 1 : Math.max(0, y - 1)})`])]), cols: 2, why: `Termina en ${ans}.`, hint: "Mueve tu dedo paso a paso: el número dice cuántas casillas.",
        steps: T => { let cx = sx, cy = sy; const segs = steps.map(([n, d]) => { const [a, b] = coordXY(6, 5, cx, cy); cx += MV[d][0] * n; cy += MV[d][1] * n; const [c2, d2] = coordXY(6, 5, cx, cy); return [a, b, c2, d2]; });
          return [
            { t: `Empezamos en el 🎲, que está en (${sx};${sy}). Cada flecha dice hacia dónde ir, y el número, cuántas casillas.` },
            { t: `Movemos el dedo paso a paso:`, go: T.strokes(T.sc.querySelector("svg"), segs, { label: k => steps[k - 1][0] + steps[k - 1][1], say: k => steps[k - 1][0] + " hacia " + { "↑": "arriba", "↓": "abajo", "→": "la derecha", "←": "la izquierda" }[steps[k - 1][1]], ms: 1400, r: 12 }) },
            { t: `Terminamos en la columna ${x} y la fila ${y}: <b>${ans}</b>.` }
          ]; } }; },
  ],
  [
    () => { const objs = sample(OB.filter(o => o !== "🎲"), 3), pos = []; while (pos.length < 3) { const p = [between(0, 6), between(0, 5)]; if (!pos.some(q => q[0] === p[0] && q[1] === p[1])) pos.push(p); }
      let x = between(0, 6), y = between(0, 5); while (pos.some(q => q[0] === x && q[1] === y)) { x = between(0, 6); y = between(0, 5); }
      const tgt = pos[0], dx = tgt[0] - x, dy = tgt[1] - y, steps = []; if (dy) steps.push([Math.abs(dy), dy > 0 ? "↑" : "↓"]); if (dx) steps.push([Math.abs(dx), dx > 0 ? "→" : "←"]); if (!steps.length) steps.push([0, "→"]);
      return { prompt: "Parte del 🎲 y sigue las flechas. ¿Qué encuentras al final?", say: "Parte del dado, sigue las flechas. ¿Qué encuentras?", scene: `<div class="seq" style="font-size:20px">${steps.map(([n, d]) => `<span class="card-op">${n}${d}</span>`).join(" ")}</div>` + coordGrid(6, 5, [{ x, y, e: "🎲" }, ...pos.map((p, i) => ({ x: p[0], y: p[1], e: objs[i] }))]),
        ans: objs[0], opts: [...objs, "Nada"], cols: 4, why: `Llegas a (${tgt[0]};${tgt[1]}), donde está ${objs[0]}.`, hint: "Primero arriba o abajo, después a los lados.",
        steps: T => { let cx = x, cy = y; const segs = steps.map(([n, d]) => { const [a, b] = coordXY(6, 5, cx, cy); cx += MV[d][0] * n; cy += MV[d][1] * n; const [c2, d2] = coordXY(6, 5, cx, cy); return [a, b, c2, d2]; });
          return [
            { t: `Partimos del 🎲 y seguimos cada flecha contando casillas.` },
            { t: `Recorremos:`, go: T.strokes(T.sc.querySelector("svg"), segs, { label: k => steps[k - 1][0] + steps[k - 1][1], say: k => steps[k - 1][0] + " hacia " + { "↑": "arriba", "↓": "abajo", "→": "la derecha", "←": "la izquierda" }[steps[k - 1][1]], ms: 1400, r: 12 }) },
            { t: `Llegamos a (${tgt[0]};${tgt[1]}), donde está <b>${objs[0]}</b>.` }
          ]; } }; },
  ]
];
lesson({ n: 53, title: "Cuadrículas, coordenadas, recorridos y posiciones", short: "Coordenadas", char: "rayo", music: "aventura", deco: ["🗺️", "⬆️", "➡️", "🎲"],
  hello: "¡Hola! Soy <b>Rayo</b> 🐉. En una <b>cuadrícula</b>, cada lugar tiene su dirección: <b>(columna ; fila)</b>. ¡Vamos de viaje!",
  levels: LEVELS3(["Coordenadas", "(columna ; fila)"], ["Recorridos", "Sigue las flechas"], ["", "¿Qué encuentras?"]) }, GEN);
