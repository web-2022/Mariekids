/* Tema 5 · Pertenencia, comparación y operaciones con conjuntos · Coco */
const EMO = ["🍎", "⭐", "🐶", "⚽", "🌸", "🚗", "🎈", "🐟", "🍓", "🐞", "🧸", "🍌"];
const GEN = [
  [
    () => { const ins = sample(EMO, 6), A = ins.slice(0, 4), outs = ins.slice(4), not = rnd(2) === 0;
      const opts = not ? shuffle([...sample(A, 3), outs[0]]) : shuffle([A[0], ...outs, sample(EMO.filter(e => !ins.includes(e)), 1)[0]]), ans = not ? outs[0] : A[0];
      return { prompt: not ? "¿Qué elemento <b>NO pertenece</b> (∉) al conjunto A?" : "¿Qué elemento <b>pertenece</b> (∈) al conjunto A?", say: not ? "¿Qué elemento no pertenece al conjunto A?" : "¿Qué elemento pertenece al conjunto A?",
        scene: setTxt("A", A), ans, opts, cols: 4, why: not ? `${outs[0]} no está dentro de A.` : `${A[0]} está dentro de A, entonces pertenece a A.`, hint: "Busca cada elemento dentro de las llaves de A." }; },
  ],
  [
    () => { const n = shuffle([between(2, 4), between(5, 6), between(7, 8)]), e = sample(EMO, 3), names = ["A", "B", "C"], big = rnd(2) === 0, best = big ? n.indexOf(Math.max(...n)) : n.indexOf(Math.min(...n));
      return { prompt: `¿Qué conjunto tiene <b>${big ? "más" : "menos"}</b> elementos?`, say: `¿Qué conjunto tiene ${big ? "más" : "menos"} elementos?`, scene: names.map((m, i) => setTxt(m, em(e[i], n[i]))).join(""),
        ans: names[best], opts: [...names, "Todos igual"], cols: 2, why: `A tiene ${n[0]}, B tiene ${n[1]} y C tiene ${n[2]}.`, hint: "Cuenta los elementos de cada conjunto." }; },
    () => { const a = between(5, 9), b = between(2, a - 1), [x, y] = sample(EMO, 2), ans = a - b;
      return { prompt: "¿Cuántos elementos <b>más</b> tiene A que B?", say: "¿Cuántos elementos más tiene A que B?", scene: setTxt("A", em(x, a)) + setTxt("B", em(y, b)), ans, opts: numOpts(ans, [a + b, a, b], 1),
        why: `${a} − ${b} = ${ans}.`, hint: "Cuenta los dos conjuntos y réstalos." }; },
  ],
  [
    () => { const all = shuffle([...Array(12).keys()].map(x => x + 1)), oa = between(1, 3), bo = between(1, 3), ob = between(1, 3);
      const z = { onlyA: all.slice(0, oa), both: all.slice(oa, oa + bo), onlyB: all.slice(oa + bo, oa + bo + ob), out: all.slice(9, 9 + between(0, 2)) };
      const t = pick(["union", "soloA", "sumaAB"]); let ans, p, why;
      if (t === "union") { ans = oa + bo + ob; p = "¿Cuántos elementos hay en <b>A o en B</b> (unidos)?"; why = `${oa} + ${bo} + ${ob} = ${ans}. Lo de afuera no cuenta.`; }
      else if (t === "soloA") { ans = oa; p = "¿Cuántos elementos están <b>solo en A</b>?"; why = `Solo en A (sin el medio) hay ${oa}.`; }
      else { ans = z.both.reduce((s, v) => s + v, 0); p = "Halla la <b>suma</b> de los números que están en A y en B a la vez."; why = `${z.both.join(" + ")} = ${ans}.`; }
      return { prompt: p, say: p.replace(/<[^>]+>/g, ""), scene: venn(z), ans, opts: numOpts(ans, t === "union" ? [oa + bo + ob + bo, oa + ob, ans + z.out.length] : t === "soloA" ? [oa + bo, bo, ob] : [ans + 1, ans + 2, ans - 1], 0),
        why, hint: "La parte del medio es de A y de B a la vez." }; },
  ]
];
lesson({ n: 5, title: "Pertenencia, comparación y operaciones con conjuntos", short: "Operaciones con conjuntos", char: "coco", music: "funk", deco: ["∈", "∉", "⭕", "🍌"],
  hello: "¡Hola! Soy <b>Coco</b> 🐵. ¿Este elemento <b>pertenece</b> al conjunto? Vamos a comparar y juntar conjuntos.",
  levels: LEVELS3(["Pertenece o no", "∈ pertenece · ∉ no pertenece"], ["Comparar conjuntos", "¿Cuál tiene más?"], ["", "Unir, solo en A y la parte común"]) }, GEN);
