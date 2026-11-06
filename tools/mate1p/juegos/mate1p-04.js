/* Tema 4 · Elementos y cantidad de un conjunto · Lula */
const PAL = ["conjunto", "banana", "manzana", "pelota", "mamá", "papaya", "colegio", "caramelo", "ratoncito", "perrito", "tortuga", "elefante", "amigos", "concurso"];
const EMO = ["🍎", "⭐", "🐶", "⚽", "🌸", "🚗", "🎈", "🐟", "🍓", "🐞"];
const GEN = [
  [
    () => { const k = between(3, 8), o = between(1, 3), nums = sample([...Array(20).keys()], k + o), ans = k;
      return { prompt: "¿Cuántos <b>elementos</b> tiene el conjunto A?", say: "¿Cuántos elementos tiene el conjunto A? Solo cuenta lo que está dentro de A.", scene: venn({ onlyA: nums.slice(0, k), out: nums.slice(k) }),
        ans, opts: numOpts(ans, [k + o, ans + 1, ans - 1], 1), why: `Dentro de A hay ${k} elementos. Lo que está afuera no es de A.`, hint: "Cuenta solo lo que está DENTRO del óvalo A." }; },
    () => { const its = sample(EMO, between(3, 7)), ans = its.length;
      return { prompt: "¿Cuántos elementos tiene el conjunto?", say: "¿Cuántos elementos tiene el conjunto M?", scene: setTxt("M", its), ans, opts: numOpts(ans, [ans + 1, ans - 1], 1),
        why: `M tiene ${ans} elementos.`, hint: "Cuenta lo que hay entre las llaves { }, separado por ;" }; },
  ],
  [
    () => { const w = pick(PAL), letras = [...w.normalize("NFD").replace(/[̀-ͯ]/g, "")], ans = new Set(letras).size;
      return { prompt: "¿Cuántos elementos tiene el conjunto E?", say: `El conjunto E tiene las letras de la palabra ${w}. ¿Cuántos elementos tiene?`, scene: setTxt("E", letras),
        ans, opts: numOpts(ans, [letras.length, ans + 1, ans - 1], 1), why: `En un conjunto, las letras repetidas se cuentan UNA sola vez: ${[...new Set(letras)].join(", ")} → ${ans}.`, hint: "¡Ojo! Las letras que se repiten cuentan solo una vez." }; },
    () => { const a = between(1, 6), b = between(a + 3, a + 9), ans = b - a + 1;
      return { prompt: `A = { números del <b>${a}</b> al <b>${b}</b> }. ¿Cuántos elementos tiene A?`, say: `A tiene los números del ${a} al ${b}. ¿Cuántos elementos tiene?`, scene: `<div class="seq">${a}, ${a + 1}, ${a + 2}, … , ${b}</div>`,
        ans, opts: numOpts(ans, [b - a, b, ans + 1], 1), why: `Del ${a} al ${b} hay ${ans} números (incluyendo a los dos).`, hint: "Escribe todos los números y cuéntalos, sin olvidar el primero ni el último." }; },
  ],
  [
    () => { const all = sample([...Array(15).keys()].map(x => x + 1), 10), oa = between(1, 3), bo = between(1, 3), ob = between(1, 3), out = between(0, 2);
      const z = { onlyA: all.slice(0, oa), both: all.slice(oa, oa + bo), onlyB: all.slice(oa + bo, oa + bo + ob), out: all.slice(oa + bo + ob, oa + bo + ob + out) };
      const t = pick(["A", "B", "AB"]), ans = t === "A" ? oa + bo : t === "B" ? ob + bo : bo;
      return { prompt: t === "AB" ? "¿Cuántos elementos están en <b>A y en B</b> a la vez?" : `¿Cuántos elementos tiene el conjunto <b>${t}</b>?`, say: t === "AB" ? "¿Cuántos elementos están en A y en B a la vez?" : `¿Cuántos elementos tiene el conjunto ${t}?`,
        scene: venn(z), ans, opts: numOpts(ans, [t === "A" ? oa : t === "B" ? ob : oa + bo + ob, oa + bo + ob, ans + 1], 1),
        why: t === "AB" ? `En el centro (A y B) hay ${bo}.` : `${t} tiene lo de su óvalo completo, incluido el centro: ${ans}.`, hint: t === "AB" ? "Mira la parte del medio, donde se cruzan." : "No olvides contar también la parte del medio." }; },
  ]
];
lesson({ n: 4, title: "Elementos y cantidad de un conjunto", short: "Conjuntos", char: "lula", music: "ukelele", deco: ["⭕", "{ }", "🍎", "⭐"],
  hello: "¡Hola! Soy <b>Lula</b> 🦊. Un <b>conjunto</b> es un grupo de cosas. Vamos a contar sus <b>elementos</b>.",
  levels: LEVELS3(["Dentro del conjunto", "Contar lo que hay dentro"], ["Letras y números", "Las repetidas cuentan una vez"], ["", "Dos conjuntos que se cruzan"]) }, GEN);
