/* Tema 4 · Elementos y cantidad de un conjunto · Lula */
const PAL = ["conjunto", "banana", "manzana", "pelota", "mamá", "papaya", "colegio", "caramelo", "ratoncito", "perrito", "tortuga", "elefante", "amigos", "concurso"];
const EMO = ["🍎", "⭐", "🐶", "⚽", "🌸", "🚗", "🎈", "🐟", "🍓", "🐞"];
const GEN = [
  [
    () => { const k = between(3, 8), o = between(1, 3), nums = sample([...Array(20).keys()], k + o), ans = k;
      return { prompt: "¿Cuántos <b>elementos</b> tiene el conjunto A?", say: "¿Cuántos elementos tiene el conjunto A? Solo cuenta lo que está dentro de A.", scene: venn({ onlyA: nums.slice(0, k), out: nums.slice(k) }),
        ans, opts: numOpts(ans, [k + o, ans + 1, ans - 1], 1), why: `Dentro de A hay ${k} elementos. Lo que está afuera no es de A.`, hint: "Cuenta solo lo que está DENTRO del óvalo A.",
        steps: T => [
          { t: `Los <b>elementos</b> de A son los que están <b>dentro</b> del óvalo A. Lo que está afuera no es de A.` },
          { t: `Apagamos lo que está afuera:`, go: d => { T.dim(T.of("O", "text")); setTimeout(d, 600); } },
          { t: `Contamos lo que está dentro de A:`, go: T.count(T.of("A", "text")) },
          { t: `A tiene <b>${k}</b> elementos.` }
        ],
        err: x => x > k ? "Contaste también los de afuera; solo cuentan los de adentro." : "" }; },
    () => { const its = sample(EMO, between(3, 7)), ans = its.length;
      return { prompt: "¿Cuántos elementos tiene el conjunto?", say: "¿Cuántos elementos tiene el conjunto M?", scene: setTxt("M", its), ans, opts: numOpts(ans, [ans + 1, ans - 1], 1),
        why: `M tiene ${ans} elementos.`, hint: "Cuenta lo que hay entre las llaves { }, separado por ;",
        steps: T => [
          { t: `Los elementos de un conjunto se escriben entre llaves <b>{ }</b> y se separan con punto y coma <b>;</b>.` },
          { t: `Contamos cada elemento:`, go: T.count(T.its()) },
          { t: `M tiene <b>${ans}</b> elementos.` }
        ] }; },
  ],
  [
    () => { const w = pick(PAL), letras = [...w.normalize("NFD").replace(/[̀-ͯ]/g, "")], ans = new Set(letras).size;
      return { prompt: "¿Cuántos elementos tiene el conjunto E?", say: `El conjunto E tiene las letras de la palabra ${w}. ¿Cuántos elementos tiene?`, scene: setTxt("E", letras),
        ans, opts: numOpts(ans, [letras.length, ans + 1, ans - 1], 1), why: `En un conjunto, las letras repetidas se cuentan UNA sola vez: ${[...new Set(letras)].join(", ")} → ${ans}.`, hint: "¡Ojo! Las letras que se repiten cuentan solo una vez.",
        steps: T => { const els = T.its(), seen = new Set(), firsts = [], reps = [];
          els.forEach(x => { const l = x.textContent.trim(); if (seen.has(l)) reps.push(x); else { seen.add(l); firsts.push(x); } });
          return [
            { t: `En un conjunto, cada elemento va <b>una sola vez</b>. Si una letra se repite, la contamos solo una vez.` },
            reps.length ? { t: `Apagamos las letras repetidas:`, go: d => { T.dim(reps); setTimeout(d, 700); } } : { t: `En esta palabra ninguna letra se repite.` },
            { t: `Contamos las letras distintas:`, go: T.count(firsts) },
            { t: `Letras distintas: ${[...seen].join(", ")}. Son <b>${ans}</b>.`, b: BOARD.lines([`{ ${[...seen].join(" ; ")} }`]) }
          ]; },
        err: w => w === letras.length ? "Contaste las letras repetidas más de una vez. En un conjunto ¡cada una va una sola vez!" : "" }; },
    () => { const a = between(1, 6), b = between(a + 3, a + 9), ans = b - a + 1;
      return { prompt: `A = { números del <b>${a}</b> al <b>${b}</b> }. ¿Cuántos elementos tiene A?`, say: `A tiene los números del ${a} al ${b}. ¿Cuántos elementos tiene?`, scene: `<div class="seq">${a}, ${a + 1}, ${a + 2}, … , ${b}</div>`,
        ans, opts: numOpts(ans, [b - a, b, ans + 1], 1), why: `Del ${a} al ${b} hay ${ans} números (incluyendo a los dos).`, hint: "Escribe todos los números y cuéntalos, sin olvidar el primero ni el último.",
        steps: T => { const list = Array.from({ length: ans }, (_, i) => a + i);
          return [
            { t: `«Del ${a} al ${b}» quiere decir <b>todos</b> los números desde el ${a} hasta el ${b}, ¡incluidos los dos!` },
            { t: `Los escribimos todos y los contamos:`, b: BOARD.lines([list.map((x, i) => `${x}<sup style="color:#e11d48">${i + 1}</sup>`).join("  ")], { step: 0 }) },
            { t: `Un truco: ${b} − ${a} = ${b - a}, y le sumamos <b>1</b> porque el ${a} también cuenta: ${b - a} + 1 = <b>${ans}</b>.`, b: BOARD.lines([`${b} − ${a} = ${b - a}`, `${b - a} + 1 = ${ans}`]) }
          ]; },
        err: w => w === b - a ? `Restaste ${b} − ${a}, pero olvidaste contar el ${a}.` : w === b ? `${b} es el último número, no la cantidad.` : "" }; },
  ],
  [
    () => { const all = sample([...Array(15).keys()].map(x => x + 1), 10), oa = between(1, 3), bo = between(1, 3), ob = between(1, 3), out = between(0, 2);
      const z = { onlyA: all.slice(0, oa), both: all.slice(oa, oa + bo), onlyB: all.slice(oa + bo, oa + bo + ob), out: all.slice(oa + bo + ob, oa + bo + ob + out) };
      const t = pick(["A", "B", "AB"]), ans = t === "A" ? oa + bo : t === "B" ? ob + bo : bo;
      return { prompt: t === "AB" ? "¿Cuántos elementos están en <b>A y en B</b> a la vez?" : `¿Cuántos elementos tiene el conjunto <b>${t}</b>?`, say: t === "AB" ? "¿Cuántos elementos están en A y en B a la vez?" : `¿Cuántos elementos tiene el conjunto ${t}?`,
        scene: venn(z), ans, opts: numOpts(ans, [t === "A" ? oa : t === "B" ? ob : oa + bo + ob, oa + bo + ob, ans + 1], 1),
        why: t === "AB" ? `En el centro (A y B) hay ${bo}.` : `${t} tiene lo de su óvalo completo, incluido el centro: ${ans}.`, hint: t === "AB" ? "Mira la parte del medio, donde se cruzan." : "No olvides contar también la parte del medio.",
        steps: T => { const A = T.of("A", "text"), B = T.of("B", "text"), AB = T.of("AB", "text"), O = T.of("O", "text");
          const si = t === "A" ? [...A, ...AB] : t === "B" ? [...B, ...AB] : AB, no = T.its("text.it").filter(x => !si.includes(x));
          return [
            t === "AB" ? { t: `«En A y en B a la vez» es la parte del <b>medio</b>, donde los dos óvalos se cruzan.` }
                       : { t: `El conjunto ${t} es <b>todo</b> lo que está dentro de su óvalo, ¡también la parte del medio que comparte con el otro!` },
            { t: `Apagamos lo que no nos piden:`, go: d => { T.dim(no); setTimeout(d, 700); } },
            { t: `Contamos lo que quedó encendido:`, go: T.count(si) },
            { t: `Son <b>${ans}</b> elemento${ans === 1 ? "" : "s"}.${t !== "AB" ? ` (${t === "A" ? oa : ob} solo de ${t} + ${bo} del medio)` : ""}` }
          ]; },
        err: w => (t !== "AB" && w === (t === "A" ? oa : ob)) ? "Te faltó contar la parte del medio: ¡también es de ese conjunto!" : w === oa + bo + ob ? "Contaste los dos óvalos completos." : "" }; },
  ]
];
lesson({ n: 4, title: "Elementos y cantidad de un conjunto", short: "Conjuntos", char: "lula", music: "ukelele", deco: ["⭕", "{ }", "🍎", "⭐"],
  hello: "¡Hola! Soy <b>Lula</b> 🦊. Un <b>conjunto</b> es un grupo de cosas. Vamos a contar sus <b>elementos</b>.",
  levels: LEVELS3(["Dentro del conjunto", "Contar lo que hay dentro"], ["Letras y números", "Las repetidas cuentan una vez"], ["", "Dos conjuntos que se cruzan"]) }, GEN);
