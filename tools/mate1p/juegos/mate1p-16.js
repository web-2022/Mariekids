/* Tema 16 · Números pares e impares · Bimba */
const PAR = n => n % 2 === 0;
const GEN = [
  [
    () => { const wantPar = rnd(2) === 0, good = (wantPar ? 0 : 1) + 2 * between(1, 15), bad = [], ans = good;
      while (bad.length < 3) { const x = between(1, 30); if (PAR(x) !== wantPar && !bad.includes(x)) bad.push(x); }
      return { prompt: `¿Cuál es un número <b>${wantPar ? "par" : "impar"}</b>?`, say: `¿Cuál es un número ${wantPar ? "par" : "impar"}?`, scene: `<div class="legend">Pares terminan en 0, 2, 4, 6, 8 · Impares en 1, 3, 5, 7, 9</div>`, ans, opts: shuffle([ans, ...bad]), cols: 4, why: `${ans} es ${wantPar ? "par" : "impar"}.`, hint: "Mira la última cifra." }; },
    () => { const n = between(3, 12), e = pick(["🧦", "👟", "🧤"]), ans = PAR(n) ? "Par" : "Impar";
      return { prompt: `¿La cantidad de ${e} es par o impar?`, say: "Si los formas de dos en dos, ¿la cantidad es par o impar?", scene: line(em(e, n)), ans, opts: ["Par", "Impar"], cols: 2, min: 2, why: `Hay ${n}: ${PAR(n) ? "todos tienen pareja → par" : "uno se queda sin pareja → impar"}.`, hint: "Forma parejas: ¿alguno se queda solo?" }; },
  ],
  [
    () => { const ns = sample([...Array(30).keys()].map(x => x + 1), 6), wantPar = rnd(2) === 0, ans = ns.filter(x => PAR(x) === wantPar).length;
      return { prompt: `¿Cuántos números <b>${wantPar ? "pares" : "impares"}</b> hay?`, say: `¿Cuántos números ${wantPar ? "pares" : "impares"} hay?`, scene: `<div class="seq">${ns.join(" ; ")}</div>`, ans, opts: numOpts(ans, [6 - ans, 6], 0), why: `${wantPar ? "Pares" : "Impares"}: ${ns.filter(x => PAR(x) === wantPar).join(", ") || "ninguno"}.`, hint: "Mira la última cifra de cada número." }; },
    () => { const ns = sample([...Array(20).keys()].map(x => x + 1), 5), ans = ns.filter(PAR).reduce((a, b) => a + b, 0);
      if (!ns.some(PAR)) ns[0] = 2 * between(1, 9);
      const A = ns.filter(PAR).reduce((a, b) => a + b, 0);
      return { prompt: "Suma solo los números <b>pares</b>.", say: "Suma solo los números pares.", scene: `<div class="seq">${ns.join(" ; ")}</div>`, ans: A, opts: numOpts(A, [ns.reduce((a, b) => a + b, 0), ns.filter(x => !PAR(x)).reduce((a, b) => a + b, 0), A + 2], 0), why: `${ns.filter(PAR).join(" + ")} = ${A}.`, hint: "Primero marca los pares, después súmalos." }; },
  ],
  [
    () => { const g = sample([...Array(15).keys()].map(x => x + 2), 5), odd = g.filter(x => !PAR(x)); if (!odd.length) g[0] = 7;
      const ans = g.filter(x => !PAR(x)).reduce((a, b) => a + b, 0);
      return { prompt: "Pedrito revienta todos los globos con números <b>pares</b>. Halla la <b>suma</b> de los globos que <b>no</b> estallaron.", say: "Pedrito revienta los globos con números pares. ¿Cuánto suman los globos que no estallaron?", scene: line(g.map(x => `🎈<sub style="font:900 16px sans-serif">${x}</sub>`)),
        ans, opts: numOpts(ans, [g.filter(PAR).reduce((a, b) => a + b, 0), g.reduce((a, b) => a + b, 0), ans + 1], 0), why: `Quedan los impares: ${g.filter(x => !PAR(x)).join(" + ")} = ${ans}.`, hint: "Los que no estallan son los impares." }; },
    () => { const n = 2 * between(5, 15), t = rnd(2), ans = t ? n / 2 : n / 2 - 1;
      return { prompt: t ? `¿Cuántos números <b>impares</b> hay menores que <b>${n}</b>?` : `¿Cuántos números <b>pares</b> hay mayores que 0 y menores que <b>${n}</b>?`, say: t ? `¿Cuántos números impares hay menores que ${n}?` : `¿Cuántos números pares hay entre 0 y ${n}?`, scene: "",
        ans, opts: numOpts(ans, [n, ans + 1, ans - 1], 0), why: t ? `Los impares 1, 3, 5, …, ${n - 1}: son ${ans}.` : `Los pares 2, 4, …, ${n - 2}: son ${ans}.`, hint: "Cuenta de 2 en 2." }; },
  ]
];
lesson({ n: 16, title: "Números pares e impares", short: "Pares e impares", char: "bimba", music: "pop", deco: ["🧦", "2️⃣", "4️⃣", "6️⃣"],
  hello: "¡Hola! Soy <b>Bimba</b> 🐘. Los números <b>pares</b> siempre tienen pareja; a los <b>impares</b> siempre les sobra uno.",
  levels: LEVELS3(["¿Par o impar?", "Parejas y última cifra"], ["Contar y sumar pares", "Listas de números"], ["", "Globos y números menores que…"]) }, GEN);
