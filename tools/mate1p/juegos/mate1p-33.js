/* Tema 33 · Complemento hasta 10 · coco */
const TOPS = [10, 10];
const GEN = [
  [
    () => { const t = TOPS[0], h = between(1, t - 1), ans = t - h;
      return { prompt: `Tengo <b>${h}</b>. ¿Cuánto me falta para llegar a <b>${t}</b>?`, say: `Tengo ${h}. ¿Cuánto me falta para llegar a ${t}?`, scene: t <= 20 ? `<div class="tfs">${tenFrame(h)}</div>` : "", ans, opts: numOpts(ans, [t + h, h, ans + 1], 0),
        why: `${h} + ${ans} = ${t}.`, hint: `Cuenta desde ${h} hasta ${t}.` }; },
    () => { const t = TOPS[0], h = between(1, t - 1), ans = t - h;
      return { prompt: `${h} + ⬜ = ${t}`, say: `${h} más cuánto es ${t}?`, scene: "", ans, opts: numOpts(ans, [t, h, ans + 1], 0), why: `${h} + ${ans} = ${t}.`, hint: `¿Qué número completa ${t}?` }; },
  ],
  [
    () => { const t = TOPS[1], h = between(1, t - 1), ans = t - h;
      return { prompt: `${h} + ⬜ = <b>${t}</b>`, say: `${h} más cuánto es ${t}?`, scene: "", ans, opts: numOpts(ans, [t, h, ans + 1], 0), why: `${h} + ${ans} = ${t}.`, hint: `Cuenta desde ${h} hasta ${t}.` }; },
    () => { const t = pick(TOPS), a = between(1, t - 1), b = t - a, pairs = [[a, b]]; while (pairs.length < 4) { const x = between(1, t - 1), y = between(1, t - 1); if (x + y !== t && !pairs.some(p => p[0] === x && p[1] === y)) pairs.push([x, y]); }
      const f = p => `${p[0]} y ${p[1]}`, ans = f([a, b]);
      return { prompt: `¿Qué pareja suma exactamente <b>${t}</b>?`, say: `¿Qué pareja suma ${t}?`, scene: "", ans, opts: shuffle(pairs.map(f)), cols: 2, cls: "grp", why: `${a} + ${b} = ${t}.`, hint: "Suma cada pareja." }; },
  ],
  [
    () => { const t = pick(TOPS), a = between(1, Math.floor(t / 2)), b = between(1, t - a - 1), ans = t - a - b;
      return { prompt: `Ana tiene <b>${a}</b> figuritas y le regalan <b>${b}</b>. ¿Cuántas le faltan para tener <b>${t}</b>?`, say: `Tiene ${a} y le regalan ${b}. ¿Cuántas le faltan para tener ${t}?`, scene: "", ans, opts: numOpts(ans, [t - a, t - b, a + b], 0), why: `${a} + ${b} = ${a + b}; faltan ${t} − ${a + b} = ${ans}.`, hint: "Primero junta lo que tiene, después mira cuánto falta." }; },
    () => { const t = pick(TOPS), x = between(1, t - 2), y = between(1, t - x - 1), ans = t - x - y;
      return { prompt: `${x} + ${y} + ⬜ = ${t}`, say: `${x} más ${y} más cuánto es ${t}?`, scene: "", ans, opts: numOpts(ans, [t - x, t - y, ans + 1], 0), why: `${x} + ${y} + ${ans} = ${t}.`, hint: "Suma los dos primeros y completa." }; },
  ]
];
lesson({ n: 33, title: "Complemento hasta 10", short: "Hasta 10", char: "coco", music: "funk", deco: ["🧩", "🔟", "➕", "🎯"],
  hello: "¡Hola! Vamos a completar números: <b>¿cuánto falta</b> para llegar a 10?",
  levels: LEVELS3(["Con el cuadro de 10", "¿Cuánto falta para 10?"], ["Parejas del 10", "Completar y parejas"], ["", "Problemas para completar"]) }, GEN);
