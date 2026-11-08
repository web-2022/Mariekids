/* Tema 40 · Patrones con números pares e impares · Bimba */
const GEN = [
  [
    () => { const odd = rnd(2), a = 2 * between(0, 10) + odd, s = [a, a + 2, a + 4, a + 6], ans = a + 8;
      return { prompt: `Números <b>${odd ? "impares" : "pares"}</b>: ¿qué número sigue?`, say: s.join(", ") + ". ¿Qué número sigue?", scene: `<div class="seq">${s.join(" , ")} , ?</div>`, ans, opts: numOpts(ans, [ans + 1, ans - 1, ans + 2], 0), why: `De 2 en 2: sigue ${ans}.`, hint: "Suma 2.",
        steps: T => [
          { t: `Los números ${odd ? "impares" : "pares"} van de <b>2 en 2</b>.`, b: BOARD.seq([...s, "?"], { diffs: [2, 2, 2, null] }) },
          { t: `Al último le sumamos 2: ${s[3]} + 2 = ${ans}.`, b: BOARD.jumps(s[3], [1, 1], { labels: false, pad: 1 }) },
          { t: `Sigue <b>${ans}</b>. (El ${ans - 1} no, porque es ${odd ? "par" : "impar"}.)` }
        ],
        err: w => w === ans - 1 || w === ans + 1 ? `Ese número es ${odd ? "par" : "impar"}; aquí van solo los ${odd ? "impares" : "pares"}.` : "" }; },
  ],
  [
    () => { const odd = rnd(2), a = 2 * between(2, 15) + odd, s = [a, a + 2, a + 4, a + 6, a + 8], h = between(1, 3), ans = s[h];
      return { prompt: `¿Qué número ${odd ? "impar" : "par"} <b>falta</b>?`, say: "¿Qué número falta?", scene: `<div class="seq">${s.map((x, i) => i === h ? "⬜" : x).join(" , ")}</div>`, ans, opts: numOpts(ans, [ans + 1, ans - 1, ans + 2], 0), why: `De 2 en 2: falta ${ans}.`, hint: "Los números van de 2 en 2.",
        steps: T => [
          { t: `Van de <b>2 en 2</b>. Miramos el número antes del espacio: ${s[h - 1]}.`, b: BOARD.seq(s.map((x, i) => i === h ? "⬜" : x), { diffs: s.slice(1).map((x, i) => (i === h || i + 1 === h) ? null : 2) }) },
          { t: `${s[h - 1]} + 2 = ${ans}. Comprobamos: ${ans} + 2 = ${s[h + 1]}. ✅`, b: BOARD.seq(s, { diffs: [2, 2, 2, 2], hl: h }) },
          { t: `Falta el <b>${ans}</b>.` }
        ] }; },
    () => { const n = 2 * between(5, 20) + rnd(2), par = n % 2 === 0, ans = par ? n + 2 : n + 2;
      return { prompt: `¿Cuál es el siguiente número <b>${par ? "par" : "impar"}</b> después de ${n}?`, say: `¿Cuál es el siguiente número ${par ? "par" : "impar"} después de ${n}?`, scene: "", ans, opts: numOpts(ans, [n + 1, n + 3, n - 2], 0), why: `${n} + 2 = ${ans}.`, hint: "Los pares (o impares) van saltando de 2 en 2.",
        steps: T => [
          { t: `${n} es <b>${par ? "par" : "impar"}</b> (termina en ${n % 10}). Los ${par ? "pares" : "impares"} van de 2 en 2.` },
          { t: `Saltamos de 1 en 1: ${n + 1} es ${par ? "impar" : "par"} (no sirve), ${n + 2} es ${par ? "par" : "impar"} ✅.`, b: BOARD.jumps(n, [1, 1], { pad: 1 }) },
          { t: `El siguiente ${par ? "par" : "impar"} es <b>${ans}</b>.` }
        ],
        err: w => w === n + 1 ? `${n + 1} es ${par ? "impar" : "par"}.` : "" }; },
  ],
  [
    () => { const k = between(3, 6), ans = k * k;
      return { prompt: `¿Cuánto suman los <b>${k}</b> primeros números impares?`, say: `¿Cuánto suman los ${k} primeros números impares?`, scene: `<div class="seq">${Array.from({ length: k }, (_, i) => 2 * i + 1).join(" + ")}</div>`, ans, opts: numOpts(ans, [ans + 1, ans - 1, k * (k + 1)], 0), why: `${Array.from({ length: k }, (_, i) => 2 * i + 1).join(" + ")} = ${ans}.`, hint: "Súmalos de dos en dos.",
        steps: T => { const L = Array.from({ length: k }, (_, i) => 2 * i + 1), acc = L.map((_, i) => (i + 1) * (i + 1));
          return [
            { t: `Sumamos poco a poco y miramos qué pasa:`, b: BOARD.lines(L.map((x, i) => `${L.slice(0, i + 1).join(" + ")} = ${acc[i]}`), { step: .8 }) },
            { t: `¡Salen 1, 4, 9, 16…! La suma de los primeros impares da un número «cuadrado»: ${k} × ${k}.` },
            { t: `Los ${k} primeros impares suman <b>${ans}</b>.` }
          ]; } }; },
    () => { const a = between(10, 30), b = a + between(6, 10), ev = rnd(2), list = []; for (let x = a + 1; x < b; x++) if ((x % 2 === 0) === !!ev) list.push(x); const ans = list.length;
      return { prompt: `¿Cuántos números <b>${ev ? "pares" : "impares"}</b> hay entre ${a} y ${b}?`, say: `¿Cuántos números ${ev ? "pares" : "impares"} hay entre ${a} y ${b}?`, scene: "", ans, opts: numOpts(ans, [ans + 1, ans - 1, b - a - 1], 0), why: `Son ${list.join(", ")}: ${ans}.`, hint: `Escribe los números entre ${a} y ${b}, sin contar ${a} ni ${b}.`,
        steps: T => [
          { t: `«Entre ${a} y ${b}» quiere decir sin contar ni el ${a} ni el ${b}. Buscamos los ${ev ? "pares" : "impares"}.` },
          { t: `Los escribimos y marcamos:`, b: BOARD.seq(Array.from({ length: b - a - 1 }, (_, i) => a + 1 + i).map(x => list.includes(x) ? `<b style="color:#16a34a">${x}</b>` : `<span style="opacity:.35">${x}</span>`), { diffs: Array(b - a - 2).fill(null) }) },
          { t: `Son ${list.join(", ")}: <b>${ans}</b>.` }
        ],
        err: w => w === b - a - 1 ? "Contaste todos los números; solo piden los " + (ev ? "pares." : "impares.") : "" }; },
  ]
];
lesson({ n: 40, title: "Patrones con números pares e impares", short: "Patrones pares", char: "bimba", music: "pop", deco: ["2️⃣", "4️⃣", "1️⃣", "3️⃣"],
  hello: "¡Hola! Soy <b>Bimba</b> 🐘. Los pares y los impares saltan <b>de 2 en 2</b>. ¡Sigamos el patrón!",
  levels: LEVELS3(["¿Qué sigue?", "De 2 en 2"], ["¿Qué falta?", "Pares e impares que faltan"], ["", "Sumas y conteos de impares"]) }, GEN);
