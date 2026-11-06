/* Tema 6 · Clasificación y elemento que no pertenece · Mika */
const CATS = [["frutas", ["🍎", "🍌", "🍇", "🍓", "🍐", "🍉", "🍒"]], ["animales", ["🐶", "🐱", "🐰", "🐻", "🐼", "🐮", "🐷"]], ["vehículos", ["🚗", "🚌", "🚲", "🚂", "✈️", "🚀", "🚑"]],
  ["ropa", ["👕", "👖", "🧦", "🧢", "🧥", "👗", "🧣"]], ["útiles", ["✏️", "📏", "📚", "🖍️", "✂️", "📐", "🎒"]], ["pelotas", ["⚽", "🏀", "🎾", "🏐", "⚾", "🏈"]]];
const VUELA = ["🐦", "🦋", "🐝", "🦅", "🦉", "🐞"], NOVUELA = ["🐶", "🐢", "🐌", "🐟", "🐰", "🐱"];
const GEN = [
  [
    () => { const g = rnd(CATS.length), k = 3, mem = sample(CATS[g][1], k), odd = pick(CATS[(g + 1 + rnd(CATS.length - 1)) % CATS.length][1]);
      return { prompt: "¿Cuál <b>no pertenece</b> al grupo?", say: "¿Cuál no pertenece al grupo?", scene: "", ans: odd, opts: shuffle([...mem, odd]), cols: 4, why: `Los demás son ${CATS[g][0]}.`, hint: "¿Qué tienen en común casi todos?" }; },
  ],
  [
    () => { const v = between(2, 5), nv = between(2, 5), items = shuffle([...sample(VUELA, Math.min(v, 6)), ...sample(NOVUELA, Math.min(nv, 6))]), ans = Math.min(v, 6);
      return { prompt: "¿Cuántos de estos animales pueden <b>volar</b>?", say: "¿Cuántos de estos animales pueden volar?", scene: line(items), ans, opts: numOpts(ans, [items.length, items.length - ans], 0),
        why: `Vuelan: ${items.filter(x => VUELA.includes(x)).join(" ")}.`, hint: "Busca los que tienen alas." }; },
    () => { const g = sample(CATS, 2), a = between(2, 5), b = between(2, 5), items = shuffle([...sample(g[0][1], a), ...sample(g[1][1], b)]);
      return { prompt: `Si separamos en dos grupos, ¿cuántos hay en el grupo de <b>${g[0][0]}</b>?`, say: `¿Cuántos ${g[0][0]} hay?`, scene: line(items), ans: a, opts: numOpts(a, [b, a + b], 0),
        why: `${g[0][0]}: ${items.filter(x => g[0][1].includes(x)).join(" ")} → ${a}.`, hint: `Cuenta solo los ${g[0][0]}.` }; },
  ],
  [
    () => { const t = pick(["par", "impar", "dos", "una"]); let mem, odd, why;
      if (t === "par") { mem = sample([2, 4, 6, 8, 10, 12, 14, 16, 18, 20], 3); odd = pick([3, 5, 7, 9, 11, 13, 15]); why = `Los demás son pares; ${odd} es impar.`; }
      else if (t === "impar") { mem = sample([1, 3, 5, 7, 9, 11, 13, 15, 17], 3); odd = pick([2, 4, 6, 8, 10, 12]); why = `Los demás son impares; ${odd} es par.`; }
      else if (t === "dos") { mem = sample([...Array(90).keys()].map(x => x + 10), 3); odd = between(1, 9); why = `Los demás tienen dos cifras; ${odd} tiene una.`; }
      else { const d = between(1, 4); mem = sample([10 * d + 0, 10 * d + 1, 10 * d + 2, 10 * d + 3, 10 * d + 5, 10 * d + 7, 10 * d + 9], 3); odd = 10 * (d + between(1, 4)) + rnd(10); why = `Los demás empiezan con ${d} (están en los ${d}0); ${odd} no.`; }
      return { prompt: "¿Qué número <b>no pertenece</b> al grupo?", say: "¿Qué número no pertenece al grupo?", scene: "", ans: odd, opts: shuffle([...mem, odd]), cols: 4, why, hint: "¿Pares o impares? ¿Una o dos cifras? Busca la regla." }; },
  ]
];
lesson({ n: 6, title: "Clasificación y elemento que no pertenece", short: "Clasificar", char: "mika", music: "misterio", deco: ["🔎", "🧩", "🍎", "🚗"],
  hello: "¡Hola! Soy <b>Mika</b> 🦉. Vamos a <b>clasificar</b> cosas y a descubrir al <b>intruso</b> que no pertenece.",
  levels: LEVELS3(["El intruso", "¿Cuál no es del grupo?"], ["Clasificar", "Separar en grupos y contar"], ["", "Intrusos con números"]) }, GEN);
