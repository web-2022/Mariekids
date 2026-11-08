/* Tema 34 · Complemento hasta 12 y 15 · kiki */
const TOPS = [12, 15];
const GEN = [
  [
    () => { const t = TOPS[0], h = between(1, t - 1), ans = t - h;
      return { prompt: `Tengo <b>${h}</b>. ¿Cuánto me falta para llegar a <b>${t}</b>?`, say: `Tengo ${h}. ¿Cuánto me falta para llegar a ${t}?`, scene: t <= 20 ? `<div class="tfs">${tenFrame(h)}</div>` : "", ans, opts: numOpts(ans, [t + h, h, ans + 1], 0),
        why: `${h} + ${ans} = ${t}.`, hint: `Cuenta desde ${h} hasta ${t}.`,
        steps: T => [
          { t: `Tengo ${h} y quiero llegar a ${t}. Lo que falta se halla <b>completando</b>: contamos desde ${h} hasta ${t}.` },
          t === 10 ? { t: `En el cuadro de diez, contamos las casillas <b>vacías</b>:`, go: T.count(T.its(".tf span").filter(x => !x.textContent.includes("🔴")).slice(0, ans)) } : { t: `Saltamos en la recta:`, b: BOARD.jumps(h, saltosHasta(h, t), { step: .35 }) },
          { t: `Faltan <b>${ans}</b>. Comprobamos: ${h} + ${ans} = ${t}. ✅`, b: BOARD.jumps(h, saltosHasta(h, t), { step: .3 }) }
        ],
        err: w => w === h ? `${h} es lo que tengo; piden lo que falta.` : w === t + h ? "Sumaste; hay que ver cuánto falta." : "" }; },
    () => { const t = TOPS[0], h = between(1, t - 1), ans = t - h;
      return { prompt: `${h} + ⬜ = ${t}`, say: `${h} más cuánto es ${t}?`, scene: "", ans, opts: numOpts(ans, [t, h, ans + 1], 0), why: `${h} + ${ans} = ${t}.`, hint: `¿Qué número completa ${t}?`,
        steps: T => [
          { t: `¿Qué número sumado a ${h} da ${t}? Contamos desde ${h} hasta ${t}.` },
          { t: `Damos saltos hasta llegar:`, b: BOARD.jumps(h, saltosHasta(h, t), { step: .35 }) },
          { t: `${h} + <b>${ans}</b> = ${t}. ${t === 10 ? "¡Las parejas que suman 10 son amigas del 10!" : ""}` }
        ],
        err: w => w === t ? `${t} es el resultado; buscamos lo que falta.` : w === h ? `${h} ya está escrito.` : "" }; },
  ],
  [
    () => { const t = TOPS[1], h = between(1, t - 1), ans = t - h;
      return { prompt: `${h} + ⬜ = <b>${t}</b>`, say: `${h} más cuánto es ${t}?`, scene: "", ans, opts: numOpts(ans, [t, h, ans + 1], 0), why: `${h} + ${ans} = ${t}.`, hint: `Cuenta desde ${h} hasta ${t}.`,
        steps: T => [
          { t: `¿Cuánto le falta a ${h} para llegar a ${t}? Completamos con saltos.` },
          { t: `${saltosHasta(h, t).some(x => x === 10) ? "Primero llegamos a la decena y luego saltamos de 10 en 10:" : "Saltamos de 1 en 1:"}`, b: BOARD.jumps(h, saltosHasta(h, t), { step: .35 }) },
          { t: `Sumamos los saltos: ${saltosHasta(h, t).join(" + ")} = <b>${ans}</b>. Entonces ${h} + ${ans} = ${t}.` }
        ],
        err: w => w === t ? `${t} es el resultado; buscamos lo que falta.` : "" }; },
    () => { const t = pick(TOPS), a = between(1, t - 1), b = t - a, pairs = [[a, b]]; while (pairs.length < 4) { const x = between(1, t - 1), y = between(1, t - 1); if (x + y !== t && !pairs.some(p => p[0] === x && p[1] === y)) pairs.push([x, y]); }
      const f = p => `${p[0]} y ${p[1]}`, ans = f([a, b]);
      return { prompt: `¿Qué pareja suma exactamente <b>${t}</b>?`, say: `¿Qué pareja suma ${t}?`, scene: "", ans, opts: shuffle(pairs.map(f)), cols: 2, cls: "grp", why: `${a} + ${b} = ${t}.`, hint: "Suma cada pareja.",
        steps: T => [
          { t: `Sumamos cada pareja y buscamos la que da <b>exactamente ${t}</b>:`, b: BOARD.lines(pairs.map(p => `${p[0]} + ${p[1]} = ${p[0] + p[1]} ${p[0] + p[1] === t ? "✅" : "❌"}`), { step: .8 }) },
          { t: `Solo ${a} + ${b} da ${t}.` },
          { t: `La pareja es <b>${ans}</b>.` }
        ] }; },
  ],
  [
    () => { const t = pick(TOPS), a = between(1, Math.floor(t / 2)), b = between(1, t - a - 1), ans = t - a - b;
      return { prompt: `Ana tiene <b>${a}</b> figuritas y le regalan <b>${b}</b>. ¿Cuántas le faltan para tener <b>${t}</b>?`, say: `Tiene ${a} y le regalan ${b}. ¿Cuántas le faltan para tener ${t}?`, scene: "", ans, opts: numOpts(ans, [t - a, t - b, a + b], 0), why: `${a} + ${b} = ${a + b}; faltan ${t} − ${a + b} = ${ans}.`, hint: "Primero junta lo que tiene, después mira cuánto falta.",
        steps: T => [
          { t: `Dos pasos. Paso 1: juntamos lo que tiene: ${a} + ${b} = <b>${a + b}</b>.`, b: BOARD.lines([`${a} + ${b} = ${a + b}`]) },
          { t: `Paso 2: ¿cuánto le falta a ${a + b} para llegar a ${t}?`, b: BOARD.jumps(a + b, saltosHasta(a + b, t), { step: .35 }) },
          { t: `${t} − ${a + b} = <b>${ans}</b>. Le faltan ${ans}.` }
        ],
        err: w => w === t - a ? `Olvidaste las ${b} que le regalaron.` : w === a + b ? "Eso es lo que tiene; piden lo que falta." : "" }; },
    () => { const t = pick(TOPS), x = between(1, t - 2), y = between(1, t - x - 1), ans = t - x - y;
      return { prompt: `${x} + ${y} + ⬜ = ${t}`, say: `${x} más ${y} más cuánto es ${t}?`, scene: "", ans, opts: numOpts(ans, [t - x, t - y, ans + 1], 0), why: `${x} + ${y} + ${ans} = ${t}.`, hint: "Suma los dos primeros y completa.",
        steps: T => [
          { t: `Primero sumamos los dos números que ya están: ${x} + ${y} = <b>${x + y}</b>.`, b: BOARD.lines([`${x} + ${y} = ${x + y}`]) },
          { t: `Ahora completamos desde ${x + y} hasta ${t}:`, b: BOARD.jumps(x + y, saltosHasta(x + y, t), { step: .35 }) },
          { t: `Falta <b>${ans}</b>: ${x} + ${y} + ${ans} = ${t}.` }
        ],
        err: w => w === t - x || w === t - y ? "Te olvidaste de uno de los números." : "" }; },
  ]
];
lesson({ n: 34, title: "Complemento hasta 12 y 15", short: "Hasta 12 y 15", char: "kiki", music: "huayno", deco: ["🧩", "🔟", "➕", "🎯"],
  hello: "¡Hola! Vamos a completar números: <b>¿cuánto falta</b> para llegar a 12 y 15?",
  levels: LEVELS3(["Hasta 12", "¿Cuánto falta?"], ["Hasta 15", "Completar y parejas"], ["", "Problemas para completar"]) }, GEN);
