/* Tema 5 · Pertenencia, comparación y operaciones con conjuntos · Coco */
const EMO = ["🍎", "⭐", "🐶", "⚽", "🌸", "🚗", "🎈", "🐟", "🍓", "🐞", "🧸", "🍌"];
const GEN = [
  [
    () => { const ins = sample(EMO, 6), A = ins.slice(0, 4), outs = ins.slice(4), not = rnd(2) === 0;
      const opts = not ? shuffle([...sample(A, 3), outs[0]]) : shuffle([A[0], ...outs, sample(EMO.filter(e => !ins.includes(e)), 1)[0]]), ans = not ? outs[0] : A[0];
      return { prompt: not ? "¿Qué elemento <b>NO pertenece</b> (∉) al conjunto A?" : "¿Qué elemento <b>pertenece</b> (∈) al conjunto A?", say: not ? "¿Qué elemento no pertenece al conjunto A?" : "¿Qué elemento pertenece al conjunto A?",
        scene: setTxt("A", A), ans, opts, cols: 4, why: not ? `${outs[0]} no está dentro de A.` : `${A[0]} está dentro de A, entonces pertenece a A.`, hint: "Busca cada elemento dentro de las llaves de A.",
        steps: T => [
          { t: `<b>∈</b> se lee «pertenece»: el elemento está <b>dentro</b> de las llaves del conjunto. <b>∉</b> se lee «no pertenece»: no está dentro.` },
          { t: `Estos son los elementos que están dentro de A:`, go: T.count(T.its()) },
          not ? { t: `Ahora miramos cada respuesta. La que <b>no aparece</b> entre las llaves de A es ${ans}: ${ans} ∉ A.` }
              : { t: `Ahora miramos cada respuesta. La única que <b>sí aparece</b> entre las llaves de A es ${ans}: ${ans} ∈ A.` }
        ] }; },
  ],
  [
    () => { const n = shuffle([between(2, 4), between(5, 6), between(7, 8)]), e = sample(EMO, 3), names = ["A", "B", "C"], big = rnd(2) === 0, best = big ? n.indexOf(Math.max(...n)) : n.indexOf(Math.min(...n));
      return { prompt: `¿Qué conjunto tiene <b>${big ? "más" : "menos"}</b> elementos?`, say: `¿Qué conjunto tiene ${big ? "más" : "menos"} elementos?`, scene: names.map((m, i) => setTxt(m, em(e[i], n[i]))).join(""),
        ans: names[best], opts: [...names, "Todos igual"], cols: 2, why: `A tiene ${n[0]}, B tiene ${n[1]} y C tiene ${n[2]}.`, hint: "Cuenta los elementos de cada conjunto.",
        steps: T => { const S = T.its(".settxt").map(x => [...x.querySelectorAll(".it")]);
          return [
            { t: `Para comparar conjuntos, contamos los elementos de cada uno.` },
            { t: `Contamos A, después B y después C:`, go: d => T.count(S[0], { ms: 600 })(() => T.count(S[1], { ms: 600 })(() => T.count(S[2], { ms: 600 })(d))) },
            { t: `A tiene ${n[0]}, B tiene ${n[1]} y C tiene ${n[2]}. El que tiene <b>${big ? "más" : "menos"}</b> es <b>${names[best]}</b>.`,
              b: BOARD.table([["Conjunto", "A", "B", "C"], ["Elementos", ...n]], { hl: [1, best + 1] }) }
          ]; } }; },
    () => { const a = between(5, 9), b = between(2, a - 1), [x, y] = sample(EMO, 2), ans = a - b;
      return { prompt: "¿Cuántos elementos <b>más</b> tiene A que B?", say: "¿Cuántos elementos más tiene A que B?", scene: setTxt("A", em(x, a)) + setTxt("B", em(y, b)), ans, opts: numOpts(ans, [a + b, a, b], 1),
        why: `${a} − ${b} = ${ans}.`, hint: "Cuenta los dos conjuntos y réstalos.",
        steps: T => { const S = T.its(".settxt").map(x => [...x.querySelectorAll(".it")]), par = [];
          S[1].forEach((x, i) => par.push(S[0][i], x));
          return [
            { t: `Juntamos cada elemento de A con uno de B, como parejas:`, go: T.pairs(par, { both: true }) },
            { t: `Los de A que se quedaron <b>sin pareja</b> son los que tiene de más. Contémoslos:`, go: T.count(S[0].slice(b), { cls: "t-big" }) },
            { t: `A tiene ${a} y B tiene ${b}: ${a} − ${b} = <b>${ans}</b>.`, b: BOARD.lines([`${a} − ${b} = ${ans}`]) }
          ]; },
        err: w => w === a + b ? "Sumaste los dos, pero piden cuántos <b>más</b> tiene A." : w === a ? "Ese es el total de A; piden cuántos más que B." : "" }; },
  ],
  [
    () => { const all = shuffle([...Array(12).keys()].map(x => x + 1)), oa = between(1, 3), bo = between(1, 3), ob = between(1, 3);
      const z = { onlyA: all.slice(0, oa), both: all.slice(oa, oa + bo), onlyB: all.slice(oa + bo, oa + bo + ob), out: all.slice(9, 9 + between(0, 2)) };
      const t = pick(["union", "soloA", "sumaAB"]); let ans, p, why;
      if (t === "union") { ans = oa + bo + ob; p = "¿Cuántos elementos hay en <b>A o en B</b> (unidos)?"; why = `${oa} + ${bo} + ${ob} = ${ans}. Lo de afuera no cuenta.`; }
      else if (t === "soloA") { ans = oa; p = "¿Cuántos elementos están <b>solo en A</b>?"; why = `Solo en A (sin el medio) hay ${oa}.`; }
      else { ans = z.both.reduce((s, v) => s + v, 0); p = "Halla la <b>suma</b> de los números que están en A y en B a la vez."; why = `${z.both.join(" + ")} = ${ans}.`; }
      return { prompt: p, say: p.replace(/<[^>]+>/g, ""), scene: venn(z), ans, opts: numOpts(ans, t === "union" ? [oa + bo + ob + bo, oa + ob, ans + z.out.length] : t === "soloA" ? [oa + bo, bo, ob] : [ans + 1, ans + 2, ans - 1], 0),
        why, hint: "La parte del medio es de A y de B a la vez.",
        steps: T => { const A = T.of("A", "text"), B = T.of("B", "text"), AB = T.of("AB", "text"), O = T.of("O", "text");
          if (t === "union") return [
            { t: `«A o B» (la unión) es <b>todo</b> lo que está dentro de algún óvalo. Lo de afuera no cuenta.`, go: d => { T.dim(O); setTimeout(d, 600); } },
            { t: `Contamos todo lo de adentro, cada número una sola vez (¡el medio también, pero una vez!):`, go: T.count([...A, ...AB, ...B]) },
            { t: `${oa} + ${bo} + ${ob} = <b>${ans}</b>.`, b: BOARD.lines([`solo A: ${oa} · medio: ${bo} · solo B: ${ob}`, `${oa} + ${bo} + ${ob} = ${ans}`]) }
          ];
          if (t === "soloA") return [
            { t: `«Solo en A» es la parte de A que <b>no</b> se cruza con B. El medio no cuenta, porque también es de B.` },
            { t: `Apagamos el medio, B y lo de afuera:`, go: d => { T.dim([...AB, ...B, ...O]); setTimeout(d, 600); } },
            { t: `Contamos lo que quedó:`, go: T.count(A) },
            { t: `Solo en A hay <b>${oa}</b> elemento${oa === 1 ? "" : "s"}.` }
          ];
          return [
            { t: `«En A y en B a la vez» es la parte del <b>medio</b>. Apagamos lo demás.`, go: d => { T.dim([...A, ...B, ...O]); setTimeout(d, 600); } },
            { t: `Los números del medio son: ${z.both.join(", ")}.`, go: T.count(AB, { label: (k, el) => el.textContent, say: (k, el) => el.textContent }) },
            z.both.length > 1 ? { t: `Los sumamos: ${z.both.join(" + ")} = <b>${ans}</b>.`, b: BOARD.lines([`${z.both.join(" + ")} = ${ans}`]) }
                              : { t: `En el medio hay un solo número, así que la suma es ese mismo número: <b>${ans}</b>.` }
          ]; },
        err: w => t === "soloA" && w === oa + bo ? "Contaste también el medio, pero piden <b>solo</b> A." : t === "union" && w === oa + bo + ob + bo ? "Contaste el medio dos veces." : t === "union" && w === oa + ob ? "Te faltó contar el medio." : "" }; },
  ]
];
lesson({ n: 5, title: "Pertenencia, comparación y operaciones con conjuntos", short: "Operaciones con conjuntos", char: "coco", music: "funk", deco: ["∈", "∉", "⭕", "🍌"],
  hello: "¡Hola! Soy <b>Coco</b> 🐵. ¿Este elemento <b>pertenece</b> al conjunto? Vamos a comparar y juntar conjuntos.",
  levels: LEVELS3(["Pertenece o no", "∈ pertenece · ∉ no pertenece"], ["Comparar conjuntos", "¿Cuál tiene más?"], ["", "Unir, solo en A y la parte común"]) }, GEN);
