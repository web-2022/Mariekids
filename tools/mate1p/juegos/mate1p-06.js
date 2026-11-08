/* Tema 6 · Clasificación y elemento que no pertenece · Mika */
const CATS = [["frutas", ["🍎", "🍌", "🍇", "🍓", "🍐", "🍉", "🍒"]], ["animales", ["🐶", "🐱", "🐰", "🐻", "🐼", "🐮", "🐷"]], ["vehículos", ["🚗", "🚌", "🚲", "🚂", "✈️", "🚀", "🚑"]],
  ["ropa", ["👕", "👖", "🧦", "🧢", "🧥", "👗", "🧣"]], ["útiles", ["✏️", "📏", "📚", "🖍️", "✂️", "📐", "🎒"]], ["pelotas", ["⚽", "🏀", "🎾", "🏐", "⚾", "🏈"]]];
const VUELA = ["🐦", "🦋", "🐝", "🦅", "🦉", "🐞"], NOVUELA = ["🐶", "🐢", "🐌", "🐟", "🐰", "🐱"];
const GEN = [
  [
    () => { const g = rnd(CATS.length), k = 3, mem = sample(CATS[g][1], k), odd = pick(CATS[(g + 1 + rnd(CATS.length - 1)) % CATS.length][1]);
      return { prompt: "¿Cuál <b>no pertenece</b> al grupo?", say: "¿Cuál no pertenece al grupo?", scene: "", ans: odd, opts: shuffle([...mem, odd]), cols: 4, why: `Los demás son ${CATS[g][0]}.`, hint: "¿Qué tienen en común casi todos?",
        steps: T => { const oc = CATS.find(c => c[1].includes(odd))[0];
          return [
            { t: `Para hallar al que <b>no pertenece</b>, buscamos qué tienen <b>en común</b> casi todos.` },
            { t: `${mem.join(" ")} son <b>${CATS[g][0]}</b>.`, b: BOARD.groups([{ items: mem, lab: CATS[g][0], c: "#22c55e" }], { step: .4 }) },
            { t: `En cambio, ${odd} no es de ${CATS[g][0]}: es de <b>${oc}</b>. Por eso ${odd} no pertenece al grupo.`, bAdd: BOARD.groups([{ items: [odd], lab: oc, c: "#e11d48" }]) }
          ]; } }; },
  ],
  [
    () => { const v = between(2, 5), nv = between(2, 5), items = shuffle([...sample(VUELA, Math.min(v, 6)), ...sample(NOVUELA, Math.min(nv, 6))]), ans = Math.min(v, 6);
      return { prompt: "¿Cuántos de estos animales pueden <b>volar</b>?", say: "¿Cuántos de estos animales pueden volar?", scene: line(items), ans, opts: numOpts(ans, [items.length, items.length - ans], 0),
        why: `Vuelan: ${items.filter(x => VUELA.includes(x)).join(" ")}.`, hint: "Busca los que tienen alas.",
        steps: T => { const si = T.its().filter(x => VUELA.includes(x.textContent.trim())), no = T.its().filter(x => !si.includes(x));
          return [
            { t: `Para volar hacen falta <b>alas</b>: las aves, las mariposas, las abejas y las mariquitas tienen alas.` },
            { t: `Apagamos los animales que no vuelan (no tienen alas):`, go: d => { T.dim(no); setTimeout(d, 700); } },
            { t: `Contamos los que vuelan:`, go: T.count(si) },
            { t: `Pueden volar <b>${ans}</b> animales.` }
          ]; },
        err: o => o === items.length ? "Contaste todos; solo piden los que vuelan." : o === items.length - ans ? "Contaste los que NO vuelan." : "" }; },
    () => { const g = sample(CATS, 2), a = between(2, 5), b = between(2, 5), items = shuffle([...sample(g[0][1], a), ...sample(g[1][1], b)]);
      return { prompt: `Si separamos en dos grupos, ¿cuántos hay en el grupo de <b>${g[0][0]}</b>?`, say: `¿Cuántos ${g[0][0]} hay?`, scene: line(items), ans: a, opts: numOpts(a, [b, a + b], 0),
        why: `${g[0][0]}: ${items.filter(x => g[0][1].includes(x)).join(" ")} → ${a}.`, hint: `Cuenta solo los ${g[0][0]}.`,
        steps: T => { const si = T.its().filter(x => g[0][1].includes(x.textContent.trim())), no = T.its().filter(x => !si.includes(x));
          return [
            { t: `Separamos en dos grupos: <b>${g[0][0]}</b> y <b>${g[1][0]}</b>. Nos piden el grupo de ${g[0][0]}.` },
            { t: `Apagamos los ${g[1][0]}:`, go: d => { T.dim(no); setTimeout(d, 700); } },
            { t: `Contamos los ${g[0][0]}:`, go: T.count(si) },
            { t: `En el grupo de ${g[0][0]} hay <b>${a}</b>.`, b: BOARD.groups([{ items: g[0][1].filter(x => items.includes(x)), lab: g[0][0], c: "#22c55e" }, { items: g[1][1].filter(x => items.includes(x)), lab: g[1][0], c: "#94a3b8" }]) }
          ]; },
        err: o => o === b ? `Esos son los ${g[1][0]}.` : o === a + b ? "Contaste los dos grupos juntos." : "" }; },
  ],
  [
    () => { const t = pick(["par", "impar", "dos", "una"]); let mem, odd, why;
      if (t === "par") { mem = sample([2, 4, 6, 8, 10, 12, 14, 16, 18, 20], 3); odd = pick([3, 5, 7, 9, 11, 13, 15]); why = `Los demás son pares; ${odd} es impar.`; }
      else if (t === "impar") { mem = sample([1, 3, 5, 7, 9, 11, 13, 15, 17], 3); odd = pick([2, 4, 6, 8, 10, 12]); why = `Los demás son impares; ${odd} es par.`; }
      else if (t === "dos") { mem = sample([...Array(90).keys()].map(x => x + 10), 3); odd = between(1, 9); why = `Los demás tienen dos cifras; ${odd} tiene una.`; }
      else { const d = between(1, 4); mem = sample([10 * d + 0, 10 * d + 1, 10 * d + 2, 10 * d + 3, 10 * d + 5, 10 * d + 7, 10 * d + 9], 3); odd = 10 * (d + between(1, 4)) + rnd(10); why = `Los demás empiezan con ${d} (están en los ${d}0); ${odd} no.`; }
      return { prompt: "¿Qué número <b>no pertenece</b> al grupo?", say: "¿Qué número no pertenece al grupo?", scene: "", ans: odd, opts: shuffle([...mem, odd]), cols: 4, why, hint: "¿Pares o impares? ¿Una o dos cifras? Busca la regla.",
        steps: T => { const regla = { par: ["Un número <b>par</b> se reparte en 2 sin que sobre nada. Los pares terminan en 0, 2, 4, 6 u 8.", "pares", "impar"], impar: ["Un número <b>impar</b> al repartirlo en 2 sobra 1. Los impares terminan en 1, 3, 5, 7 o 9.", "impares", "par"], dos: ["Fíjate cuántas <b>cifras</b> tiene cada número.", "de dos cifras", "de una cifra"], una: ["Fíjate en la <b>primera cifra</b> (las decenas) de cada número.", `empiezan con ${String(mem[0])[0]}`, "empieza con otra cifra"] }[t];
          return [
            { t: `Buscamos una <b>regla</b> que cumplan casi todos. ${regla[0]}` },
            { t: `${mem.join(", ")} son <b>${regla[1]}</b>.`, b: BOARD.groups([{ items: mem, lab: regla[1], c: "#22c55e" }], { step: .4 }) },
            { t: `${odd} no cumple la regla: ${t === "una" ? "" : "es "}${regla[2]}. Por eso no pertenece.`, bAdd: BOARD.groups([{ items: [odd], lab: "no cumple", c: "#e11d48" }]) }
          ]; } }; },
  ]
];
lesson({ n: 6, title: "Clasificación y elemento que no pertenece", short: "Clasificar", char: "mika", music: "misterio", deco: ["🔎", "🧩", "🍎", "🚗"],
  hello: "¡Hola! Soy <b>Mika</b> 🦉. Vamos a <b>clasificar</b> cosas y a descubrir al <b>intruso</b> que no pertenece.",
  levels: LEVELS3(["El intruso", "¿Cuál no es del grupo?"], ["Clasificar", "Separar en grupos y contar"], ["", "Intrusos con números"]) }, GEN);
