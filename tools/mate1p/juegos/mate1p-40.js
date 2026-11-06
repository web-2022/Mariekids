/* Tema 40 · Patrones con números pares e impares · Bimba */
const GEN = [
  [
    () => { const odd = rnd(2), a = 2 * between(0, 10) + odd, s = [a, a + 2, a + 4, a + 6], ans = a + 8;
      return { prompt: `Números <b>${odd ? "impares" : "pares"}</b>: ¿qué número sigue?`, say: s.join(", ") + ". ¿Qué número sigue?", scene: `<div class="seq">${s.join(" , ")} , ?</div>`, ans, opts: numOpts(ans, [ans + 1, ans - 1, ans + 2], 0), why: `De 2 en 2: sigue ${ans}.`, hint: "Suma 2." }; },
  ],
  [
    () => { const odd = rnd(2), a = 2 * between(2, 15) + odd, s = [a, a + 2, a + 4, a + 6, a + 8], h = between(1, 3), ans = s[h];
      return { prompt: `¿Qué número ${odd ? "impar" : "par"} <b>falta</b>?`, say: "¿Qué número falta?", scene: `<div class="seq">${s.map((x, i) => i === h ? "⬜" : x).join(" , ")}</div>`, ans, opts: numOpts(ans, [ans + 1, ans - 1, ans + 2], 0), why: `De 2 en 2: falta ${ans}.`, hint: "Los números van de 2 en 2." }; },
    () => { const n = 2 * between(5, 20) + rnd(2), par = n % 2 === 0, ans = par ? n + 2 : n + 2;
      return { prompt: `¿Cuál es el siguiente número <b>${par ? "par" : "impar"}</b> después de ${n}?`, say: `¿Cuál es el siguiente número ${par ? "par" : "impar"} después de ${n}?`, scene: "", ans, opts: numOpts(ans, [n + 1, n + 3, n - 2], 0), why: `${n} + 2 = ${ans}.`, hint: "Los pares (o impares) van saltando de 2 en 2." }; },
  ],
  [
    () => { const k = between(3, 6), ans = k * k;
      return { prompt: `¿Cuánto suman los <b>${k}</b> primeros números impares?`, say: `¿Cuánto suman los ${k} primeros números impares?`, scene: `<div class="seq">${Array.from({ length: k }, (_, i) => 2 * i + 1).join(" + ")}</div>`, ans, opts: numOpts(ans, [ans + 1, ans - 1, k * (k + 1)], 0), why: `${Array.from({ length: k }, (_, i) => 2 * i + 1).join(" + ")} = ${ans}.`, hint: "Súmalos de dos en dos." }; },
    () => { const a = between(10, 30), b = a + between(6, 10), ev = rnd(2), list = []; for (let x = a + 1; x < b; x++) if ((x % 2 === 0) === !!ev) list.push(x); const ans = list.length;
      return { prompt: `¿Cuántos números <b>${ev ? "pares" : "impares"}</b> hay entre ${a} y ${b}?`, say: `¿Cuántos números ${ev ? "pares" : "impares"} hay entre ${a} y ${b}?`, scene: "", ans, opts: numOpts(ans, [ans + 1, ans - 1, b - a - 1], 0), why: `Son ${list.join(", ")}: ${ans}.`, hint: `Escribe los números entre ${a} y ${b}, sin contar ${a} ni ${b}.` }; },
  ]
];
lesson({ n: 40, title: "Patrones con números pares e impares", short: "Patrones pares", char: "bimba", music: "pop", deco: ["2️⃣", "4️⃣", "1️⃣", "3️⃣"],
  hello: "¡Hola! Soy <b>Bimba</b> 🐘. Los pares y los impares saltan <b>de 2 en 2</b>. ¡Sigamos el patrón!",
  levels: LEVELS3(["¿Qué sigue?", "De 2 en 2"], ["¿Qué falta?", "Pares e impares que faltan"], ["", "Sumas y conteos de impares"]) }, GEN);
