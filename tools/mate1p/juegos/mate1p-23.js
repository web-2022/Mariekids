/* Tema 23 · Diferencia y cantidad que falta · Pipo */
const GEN = [
  [
    () => { const [n1, n2] = sample(["Ana", "Beto", "Lucía", "Mateo", "Sofía", "Pedro"], 2), e = pick(["🍓", "⚽", "🎈"]), a = between(5, 10), b = between(1, a - 1), ans = a - b;
      return { prompt: `¿Cuántos ${e} <b>más</b> tiene ${n1} que ${n2}?`, say: `¿Cuántos más tiene ${n1} que ${n2}?`, scene: `<div class="line small" style="justify-content:flex-start"><b style="min-width:64px">${n1}</b>${em(`<span class="it" data-k="A">${e}</span>`, a).join("")}</div><div class="line small" style="justify-content:flex-start"><b style="min-width:64px">${n2}</b>${em(`<span class="it" data-k="B">${e}</span>`, b).join("")}</div>`,
        ans, opts: numOpts(ans, [a + b, a, b], 0), why: `${a} − ${b} = ${ans}.`, hint: "Compara uno a uno. ¿Cuántos le sobran a quien tiene más?",
        steps: T => { const A = T.of("A"), B = T.of("B"), par = []; B.forEach((x, i) => par.push(A[i], x));
          return [
            { t: `Comparamos uno a uno: juntamos cada ${e} de ${n1} con uno de ${n2}.`, go: T.pairs(par, { both: true }) },
            { t: `A ${n1} le <b>sobran</b> los que no tienen pareja. Contémoslos:`, go: T.count(A.slice(b), { cls: "t-big" }) },
            { t: `${a} − ${b} = <b>${ans}</b>. ${n1} tiene ${ans} más.`, b: BOARD.lines([`${a} − ${b} = ${ans}`]) }
          ]; },
        err: w => w === a + b ? "Sumaste; «cuántos más» es la diferencia." : w === a ? `${a} es lo que tiene ${n1}; piden cuántos más.` : "" }; },
  ],
  [
    () => { const t = pick([10, 20, 30]), h = between(t - 9, t - 1), ans = t - h;
      return { prompt: `Tengo <b>${h}</b> figuritas. ¿Cuántas me <b>faltan</b> para tener <b>${t}</b>?`, say: `Tengo ${h}. ¿Cuántas me faltan para tener ${t}?`, scene: "", ans, opts: numOpts(ans, [t + h, ans + 1, ans - 1], 0), why: `${t} − ${h} = ${ans}.`, hint: `Cuenta desde ${h} hasta ${t}.`,
        steps: T => [
          { t: `Tengo ${h} y quiero llegar a ${t}. ¡Completamos! Contamos desde ${h} hasta ${t}.` },
          { t: `Saltamos de 1 en 1:`, b: BOARD.jumps(h, Array(ans).fill(1), { step: .35 }) },
          { t: `Dimos ${ans} saltos: ${t} − ${h} = <b>${ans}</b>.` }
        ],
        err: w => w === t + h ? "Sumaste; hay que buscar cuánto falta." : "" }; },
    () => { const d = 2 * between(1, 4), b = between(3, 7), a = b + d, ans = d / 2;
      return { prompt: `Gabrielita tiene <b>${a}</b> fresas 🍓 y Gabriel tiene <b>${b}</b>. ¿Cuántas debe regalarle Gabrielita para que ambos tengan <b>igual</b>?`, say: `Gabrielita tiene ${a} fresas y Gabriel ${b}. ¿Cuántas debe regalarle para que tengan igual?`, scene: line(em("<span class='it' data-k='A'>🍓</span>", a)) + line(em("<span class='it' data-k='B'>🍓</span>", b)),
        ans, opts: numOpts(ans, [d, a - b + 1, ans + 1], 1), why: `La diferencia es ${d}. Si le da ${ans}, los dos tienen ${(a + b) / 2}.`, hint: "No es la diferencia completa: ¡al regalar, uno baja y el otro sube!",
        steps: T => { const A = T.of("A"), B = T.of("B");
          return [
            { t: `Gabrielita tiene ${d} más que Gabriel. Pero <b>ojo</b>: si regala, ella <b>baja</b> y él <b>sube</b>.`, go: d2 => { T.count(A.slice(b), { cls: "t-big" })(d2); } },
            { t: `Esas ${d} de más se reparten <b>a la mitad</b>: una mitad se queda con ella y la otra se la regala.`, b: BOARD.share(d, 2, "🍓", { names: ["se queda", "le regala"] }) },
            { t: `Si le regala ${ans}: ella tiene ${a} − ${ans} = ${a - ans} y él ${b} + ${ans} = ${b + ans}. ¡Iguales! ✅ La respuesta es <b>${ans}</b>.`, b: BOARD.lines([`${a} − ${ans} = ${a - ans}`, `${b} + ${ans} = ${b + ans}`]) }
          ]; },
        err: w => w === d ? `Si le regala ${d}, ella queda con ${a - d} y él con ${b + d}: ¡ahora él tendría más! Hay que regalar la mitad de la diferencia.` : "" }; },
  ],
  [
    () => { const pc = between(12, 20) * 100, tv = pc + between(5, 15) * 100, ans = tv - pc;
      return { prompt: `Jorge vende un televisor a <b>S/ ${tv}</b> y una computadora a <b>S/ ${pc}</b>. ¿Cuánto <b>más</b> cuesta el televisor?`, say: `El televisor cuesta ${tv} soles y la computadora ${pc} soles. ¿Cuánto más cuesta el televisor?`, scene: line(["📺", "💻"]),
        ans, opts: numOpts(ans, [tv + pc, ans + 100, ans - 100], 0), why: `${tv} − ${pc} = ${ans} soles.`, hint: "«Cuánto más» es una resta.",
        steps: T => { const L = colTxt([tv, pc], "-").lines;
          return [
            { t: `«¿Cuánto más cuesta?» es una <b>resta</b>: el precio mayor menos el menor: ${tv} − ${pc}.` },
            { t: `Restamos en columna:`, b: BOARD.op([tv, pc], "-") },
            { t: L.filter(l => !/: 0 − 0 = 0/.test(l)).slice(-2).join(" ") },
            { t: `El televisor cuesta <b>S/ ${ans}</b> más.` }
          ]; },
        err: w => w === tv + pc ? "Sumaste los precios; «cuánto más» es restar." : "" }; },
    () => { const v = between(300, 380), p = between(250, v - 20), ans = v - p;
      return { prompt: `Se recogieron <b>${v} kg</b> de vidrio y <b>${p} kg</b> de plástico. ¿Cuántos kg <b>más</b> de vidrio que de plástico hay?`, say: `Hay ${v} kilos de vidrio y ${p} kilos de plástico. ¿Cuántos kilos más de vidrio hay?`, scene: line(["♻️", "🍾", "🧴"]), ans, opts: numOpts(ans, [ans + 10, ans - 10, ans + 100], 0),
        why: `${v} − ${p} = ${ans} kg.`, hint: "Resta el mayor menos el menor.",
        steps: T => { const L = colTxt([v, p], "-").lines;
          return [
            { t: `«¿Cuántos kg más?» es una <b>resta</b>: ${v} − ${p}.`, b: BOARD.op([v, p], "-") },
            { t: L[0] },
            { t: L.slice(1).join(" ") },
            { t: `Hay <b>${ans}</b> kg más de vidrio.` }
          ]; } }; },
  ]
];
lesson({ n: 23, title: "Diferencia y cantidad que falta", short: "¿Cuánto falta?", char: "pipo", music: "lofi", deco: ["❓", "➖", "🍓", "⚖️"],
  hello: "¡Hola! Soy <b>Pipo</b> 🐧. ¿Cuántos <b>más</b>? ¿Cuántos <b>faltan</b>? ¡La resta nos ayuda a responder!",
  levels: LEVELS3(["¿Cuántos más?", "Comparar dos cantidades"], ["¿Cuántos faltan?", "Completar e igualar"], ["", "Precios y kilos"]) }, GEN);
