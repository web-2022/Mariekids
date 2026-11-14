/* Tema 69 · Inecuaciones (mayor que, menor que con x) · Kiki */
const SG = { "<": "menor que", ">": "mayor que" };
const GEN = [
  [ // Básico: signos y valores posibles
    () => { const a = between(0, 20), b = between(0, 20), ans = a < b ? "<" : a > b ? ">" : "=";
      return { prompt: `¿Qué signo va en el cuadro? <b>${a} □ ${b}</b>`, say: `¿Qué signo va entre ${a} y ${b}?`, scene: "",
        ans, opts: ["<", ">", "="], min: 3, cols: 3, why: `${a} es ${ans === "=" ? "igual a" : SG[ans]} ${b}.`, hint: "La boca del cocodrilo se abre hacia el número mayor.",
        steps: T => [
          { t: "El signo es como la boca de un cocodrilo 🐊: siempre se abre hacia el número <b>mayor</b>." },
          { t: `Comparamos ${a} y ${b} en la recta:`, b: BOARD.marks([a, b]) },
          { t: `${a} ${ans} ${b}: la respuesta es <b>${ans}</b>.` }
        ] }; },
    () => { const n = between(4, 12), sg = pick(["<", ">"]), ok = sg === "<" ? between(0, n - 1) : between(n + 1, n + 8);
      const badp = sg === "<" ? [n, n + 1, n + between(2, 5)] : [n, n - 1, Math.max(0, n - between(2, 4))], opts = [...new Set([ok, ...badp])].sort((x, y) => x - y);
      return { prompt: `Si <b>x ${sg} ${n}</b>, ¿cuál puede ser x?`, say: `Si x es ${SG[sg]} ${n}, ¿cuál puede ser x?`, scene: "",
        ans: ok, opts, why: `${ok} ${sg} ${n} es verdad. ${n} no sirve porque no es ${SG[sg]} sí mismo.`, hint: `Prueba cada alternativa: ¿es ${SG[sg]} ${n}?`,
        steps: T => [
          { t: `x ${sg} ${n} significa: x es <b>${SG[sg]} ${n}</b>.` },
          { t: `Probamos cada alternativa en la recta:`, b: BOARD.marks([{ v: n, c: "#64748b", lab: n }, ...opts.filter(v => v !== n).map(v => ({ v, c: v === ok ? "#16a34a" : "#e11d48" }))]) },
          { t: `Solo <b>${ok}</b> es ${SG[sg]} ${n}.` }
        ],
        err: w => w === n ? `${n} es igual a ${n}, no ${SG[sg]}.` : "" }; },
    () => { const a = between(1, 8), b = a + between(3, 7), ans = b - a - 1;
      return { prompt: `¿Cuántos números cumplen <b>${a} &lt; x &lt; ${b}</b>?`, say: `¿Cuántos números son mayores que ${a} y menores que ${b}?`, scene: "",
        ans, opts: numOpts(ans, [ans + 1, ans + 2, b - a], 0), why: `Son los números de ${a + 1} a ${b - 1}: ${ans}. (${a} y ${b} no entran).`, hint: `Escribe los números entre ${a} y ${b} sin contarlos a ellos.`,
        steps: T => [
          { t: `x está <b>entre</b> ${a} y ${b}; ${a} y ${b} no cuentan.` },
          { t: "Marcamos los que sirven:", b: BOARD.marks(Array.from({ length: ans }, (_, i) => ({ v: a + 1 + i, c: "#16a34a" })), { min: a - 1, max: b + 1 }) },
          { t: `Son ${Array.from({ length: ans }, (_, i) => a + 1 + i).join(", ")}: <b>${ans}</b> números.` }
        ],
        err: w => w === ans + 2 ? `Contaste ${a} y ${b}, pero no entran (el signo es < , no ≤).` : w === ans + 1 ? "Contaste uno de los bordes." : "" }; },
  ],
  [ // Intermedio: x + a < b
    () => { const a = between(1, 6), b = a + between(3, 9), ans = b - a - 1;
      return { prompt: `¿Cuál es el <b>mayor</b> valor de x si <b>x + ${a} &lt; ${b}</b>?`, say: `¿Cuál es el mayor valor de x si x más ${a} es menor que ${b}?`, scene: "",
        ans, opts: numOpts(ans, [b - a, b, ans - 1], 0), why: `x + ${a} < ${b} → x < ${b - a}. El mayor es ${ans}.`, hint: `Si x + ${a} = ${b}, ¿cuánto sería x? Busca uno menos.`,
        steps: T => [
          { t: `Como en una ecuación, quitamos ${a} de los dos lados:`, b: BOARD.lines([`x + ${a} &lt; ${b}`, `x &lt; ${b} − ${a}`, `x &lt; ${b - a}`]) },
          { t: `x es menor que ${b - a}. El mayor número menor que ${b - a} es <b>${ans}</b>.` },
          { t: `Comprobamos: ${ans} + ${a} = ${ans + a}, y ${ans + a} &lt; ${b}. ✅` }
        ],
        err: w => w === b - a ? `Con ${b - a}: ${b - a} + ${a} = ${b}, que no es menor que ${b}.` : "" }; },
    () => { const a = between(1, 6), b = between(3, 12), ans = b + a + 1;
      return { prompt: `¿Cuál es el <b>menor</b> valor de x si <b>x − ${a} &gt; ${b}</b>?`, say: `¿Cuál es el menor valor de x si x menos ${a} es mayor que ${b}?`, scene: "",
        ans, opts: numOpts(ans, [b + a, b - a + 1, ans + 1], 0), why: `x − ${a} > ${b} → x > ${b + a}. El menor es ${ans}.`, hint: "Suma lo que se resta en los dos lados.",
        steps: T => [
          { t: `Sumamos ${a} en los dos lados:`, b: BOARD.lines([`x − ${a} &gt; ${b}`, `x &gt; ${b} + ${a}`, `x &gt; ${b + a}`]) },
          { t: `x es mayor que ${b + a}. El menor que sirve es <b>${ans}</b>.` },
          { t: `Comprobamos: ${ans} − ${a} = ${ans - a}, y ${ans - a} &gt; ${b}. ✅` }
        ],
        err: w => w === b + a ? `${b + a} − ${a} = ${b}, que no es mayor que ${b}.` : "" }; },
    () => { const a = between(2, 6), b = a + between(4, 8), lim = b - a, cands = [lim - 2, lim - 1, lim, lim + 1].filter(v => v >= 0), ans = cands.filter(v => v + a < b).length;
      return { prompt: `¿Cuántos de estos números cumplen <b>x + ${a} &lt; ${b}</b>? ${cands.join(", ")}`, say: `¿Cuántos de estos números cumplen x más ${a} menor que ${b}? ${cands.join(", ")}`, scene: "",
        ans, opts: numOpts(ans, [cands.length, ans + 1, ans - 1], 0), why: `x < ${lim}: sirven ${cands.filter(v => v < lim).join(", ")}.`, hint: "Prueba cada número.",
        steps: T => [
          { t: `Un número cumple si al sumarle ${a} da <b>menos</b> que ${b}.` },
          { t: "Probamos cada número:", b: BOARD.lines(cands.map(v => `${v} + ${a} = ${v + a} ${v + a < b ? "✅ &lt; " + b : "❌ no es &lt; " + b}`)) },
          { t: `Cumplen <b>${ans}</b> números.` }
        ] }; },
  ],
  [ // Reto concurso
    () => { const k = between(2, 4), b = k * between(3, 6) + between(1, k - 1), ans = Math.floor((b - 1) / k);
      return { prompt: `¿Cuál es el <b>mayor</b> valor de x si <b>${k}x &lt; ${b}</b>?`, say: `¿Cuál es el mayor valor de x si ${k} x es menor que ${b}?`, scene: "",
        ans, opts: numOpts(ans, [ans + 1, b - k, b], 0), why: `${k} × ${ans} = ${k * ans} < ${b}, pero ${k} × ${ans + 1} = ${k * (ans + 1)} ya no.`, hint: `Busca en la tabla del ${k}.`,
        steps: T => [
          { t: `Buscamos el número más grande que, multiplicado por ${k}, dé <b>menos</b> que ${b}.` },
          { t: `${k}x es «${k} veces x». Probamos con la tabla del ${k}:`, b: BOARD.lines([ans - 1, ans, ans + 1].filter(v => v >= 0).map(v => `${k} × ${v} = ${k * v} ${k * v < b ? "✅" : "❌"}`)) },
          { t: `El mayor que cumple es x = <b>${ans}</b>.` }
        ],
        err: w => w === ans + 1 ? `${k} × ${ans + 1} = ${k * (ans + 1)}, no es menor que ${b}.` : "" }; },
    () => { const p = between(2, 5), m = between(9, 20), ans = Math.floor(m / p), nm = pick(["Tito", "Lula", "Bimba"]);
      return { prompt: `${nm} tiene S/ ${m}. Cada chocolate cuesta S/ ${p}. ¿Cuántos chocolates puede comprar <b>como máximo</b>?`, say: `${nm} tiene ${m} soles. Cada chocolate cuesta ${p} soles. ¿Cuántos puede comprar como máximo?`, scene: "",
        ans, opts: numOpts(ans, [ans + 1, m - p, m % p], 0), why: `${p} × ${ans} = ${p * ans} ≤ ${m}, pero ${p} × ${ans + 1} = ${p * (ans + 1)} > ${m}.`, hint: `Suma de ${p} en ${p} sin pasarte de ${m}.`,
        steps: T => [
          { t: `Lo que gasta (${p} × x) no puede pasar de ${m}: ${p}x ≤ ${m}.` },
          { t: `Contamos de ${p} en ${p}:`, b: BOARD.jumps(0, Array(ans).fill(p), { max: m + 1, step: .5 }) },
          { t: `Puede comprar <b>${ans}</b> chocolates (gasta S/ ${p * ans}${m - p * ans ? ` y le sobran S/ ${m - p * ans}` : ""}).` }
        ],
        err: w => w === ans + 1 ? `Con ${ans + 1} gastaría ${p * (ans + 1)}: no le alcanza.` : "" }; },
    () => { const a = between(2, 6), b = a + between(5, 9), par = rnd(2), list = Array.from({ length: b - a - 1 }, (_, i) => a + 1 + i).filter(v => v % 2 === (par ? 0 : 1)), ans = list.length;
      return { prompt: `x es un número <b>${par ? "par" : "impar"}</b> y <b>${a} &lt; x &lt; ${b}</b>. ¿Cuántos valores puede tomar x?`, say: `x es un número ${par ? "par" : "impar"}, mayor que ${a} y menor que ${b}. ¿Cuántos valores puede tomar x?`, scene: "",
        ans, opts: numOpts(ans, [b - a - 1, ans + 1, ans - 1], 0), why: `Entre ${a} y ${b}: ${list.join(", ")}. Son ${ans}.`, hint: `Escribe los números entre ${a} y ${b} y quédate con los ${par ? "pares" : "impares"}.`,
        steps: T => [
          { t: `Números entre ${a} y ${b} (sin ellos): ${Array.from({ length: b - a - 1 }, (_, i) => a + 1 + i).join(", ")}.` },
          { t: `Nos quedamos con los <b>${par ? "pares" : "impares"}</b>:`, b: BOARD.marks(list.map(v => ({ v, c: "#16a34a" })), { min: a, max: b }) },
          { t: `Son ${list.join(", ")}: <b>${ans}</b> valores.` }
        ],
        err: w => w === b - a - 1 ? `Esos son todos; solo cuentan los ${par ? "pares" : "impares"}.` : "" }; },
    () => { const x = between(3, 8), w = between(2, 6), tot = x + w, ans = x + 1;
      return { prompt: `La balanza se inclina: <b>x + ${w}</b> pesa <b>más</b> que ${tot}. ¿Cuál es el <b>menor</b> valor de x?`, say: `x más ${w} pesa más que ${tot}. ¿Cuál es el menor valor de x?`,
        scene: balance(`<span class="weight" style="background:#7c3aed">x</span><span class="weight">${w}</span>`, `<span class="weight">${tot}</span>`, -10), ans, opts: numOpts(ans, [x, tot, ans + 1], 0),
        why: `x + ${w} > ${tot} → x > ${x}. El menor es ${ans}.`, hint: `Quita ${w} de los dos lados.`,
        steps: T => [
          { t: `El lado de x baja: pesa más. Escribimos: x + ${w} &gt; ${tot}.` },
          { t: `Quitamos ${w} de los dos lados:`, b: BOARD.lines([`x + ${w} &gt; ${tot}`, `x &gt; ${tot} − ${w}`, `x &gt; ${x}`]) },
          { t: `x debe ser mayor que ${x}: el menor es <b>${ans}</b>.` }
        ],
        err: w2 => w2 === x ? `Con ${x}, la balanza estaría en equilibrio, no inclinada.` : "" }; },
  ]
];
lesson({ n: 69, next: 46, title: "Inecuaciones (x mayor que, menor que)", short: "Inecuaciones", char: "kiki", music: "electro", deco: ["🐊", "⚖️", "❓", "⭐"],
  hello: "¡Hola! Soy <b>Kiki</b>. En una <b>inecuación</b> la balanza no está en equilibrio: <b>x + 2 &lt; 7</b> dice que x + 2 es <b>menor</b> que 7. ¡Ahora x puede tener <b>varios</b> valores! Los buscamos como en las ecuaciones.",
  levels: LEVELS3(["Signos y valores", "&lt; , &gt; · ¿cuál puede ser x?"], ["x + 3 &lt; 9", "mayor y menor valor"], ["", "2x &lt; 11 · problemas"]) }, GEN);
