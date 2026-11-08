/* Tema 62 · Sumas con letras (inicio del álgebra) · Mika */
// opciones con letra (ordenadas por número, como en los exámenes)
function lOpts(c, v, near) {
  const set = new Set([c + v]);
  near = near.filter(x => !/^1[a-z]$/.test(x) && !/^-/.test(x));
  for (const x of near) { if (set.size >= 4) break; set.add(x); }
  for (const k of shuffle([c + 1, c - 1, c + 2, c + 3])) { if (set.size >= 4) break; if (k > 1) set.add(k + v); }
  const num = s => parseInt(s, 10) + (/\d$/.test(s) ? 0.5 : 0);
  return [...set].sort((a, b) => num(a) - num(b));
}
const LTRS = ["x", "y", "a", "m"];
const CAJ = ["🎁", "📦", "🧺"];
const termsTxt = (cs, v, signs) => cs.map((c, i) => (i ? (signs && signs[i] === "-" ? " − " : " + ") : "") + c + v).join("");
const termsSay = (cs, v, signs) => cs.map((c, i) => (i ? (signs && signs[i] === "-" ? " menos " : " más ") : "") + c + " " + v).join("");
const GEN = [
  [ // Básico: la letra es una cajita
    () => { const e = pick(CAJ), a = between(2, 5), b = between(1, 4), ans = a + b;
      return { prompt: `${a} ${e} + ${b} ${e} = ¿cuántas ${e}?`, say: `${a} cajitas más ${b} cajitas. ¿Cuántas cajitas hay en total?`,
        scene: line([...em(e, a), "➕", ...em(e, b)]), ans, opts: numOpts(ans, [ans + 1, ans - 1, a * b], 1),
        why: `${a} + ${b} = ${ans} cajitas.`, hint: "Cuenta todas las cajitas juntas.",
        steps: T => [
          { t: `Contamos las cajitas del primer grupo y seguimos contando con el segundo:`, go: T.count(T.its().filter(x => x.textContent.includes(e))) },
          { t: `${a} + ${b} = <b>${ans}</b> cajitas.` },
          { t: `Esto mismo, con letras, se escribe: ${a}x + ${b}x = ${ans}x.`, b: BOARD.lines([`${a} ${e} + ${b} ${e} = ${ans} ${e}`, `${a}x + ${b}x = ${ans}x`]) }
        ],
        err: w => w === a * b ? "Multiplicaste; hay que juntar (sumar)." : "" }; },
    () => { const e = pick(CAJ), v = pick(LTRS), a = between(2, 5), b = between(2, 4), c = a + b, ans = c + v;
      return { prompt: `Si cada ${e} es una «${v}», ¿cuánto es <b>${a}${v} + ${b}${v}</b>?`, say: `Si cada cajita es una ${v}, ¿cuánto es ${a} ${v} más ${b} ${v}?`,
        scene: line([...em(e, a), "➕", ...em(e, b)]), ans, opts: lOpts(c, v, [String(c), (a * b) + v, (c + 1) + v]), cols: 2,
        why: `${a} cajitas más ${b} cajitas son ${c} cajitas: ${a}${v} + ${b}${v} = ${ans}.`, hint: "Suma los números; la letra se queda igual.",
        steps: T => [
          { t: `La letra «${v}» es como una cajita ${e}. ${a}${v} son ${a} cajitas y ${b}${v} son ${b} cajitas.`, go: T.count(T.its().filter(x => x.textContent.includes(e))) },
          { t: `Juntamos: ${a} cajitas + ${b} cajitas = ${c} cajitas. La letra no cambia: siguen siendo cajitas.`, b: BOARD.lines([`${a}${v} + ${b}${v}`, `= (${a} + ${b})${v}`, `= ${c}${v}`], { step: .9 }) },
          { t: `${a}${v} + ${b}${v} = <b>${ans}</b>.` }
        ],
        err: w => w === String(c) ? "¡Olvidaste la letra! Son cajitas: hay que escribirla." : w === (a * b) + v ? "Multiplicaste; hay que sumar los números." : "" }; },
    () => { const v = pick(LTRS), a = between(2, 7), b = between(2, 7), c = a + b, ans = c + v;
      return { prompt: `Halla la suma: <b>${a}${v} + ${b}${v}</b>`, say: `Halla la suma de ${a} ${v} más ${b} ${v}.`, scene: "",
        ans, opts: lOpts(c, v, [String(c), (c + 2) + v, (c - 1) + v]), cols: 2,
        why: `${a} + ${b} = ${c}, entonces ${ans}.`, hint: "Suma solo los números y escribe la letra al final.",
        steps: T => [
          { t: `Se suman <b>solo los números</b>; la letra «${v}» se queda igual, como un apellido.` },
          { t: `${a} + ${b} = ${c}.`, b: BOARD.lines([`${a}${v} + ${b}${v} = (${a} + ${b})${v} = ${c}${v}`]) },
          { t: `La suma es <b>${ans}</b>.` }
        ],
        err: w => w === String(c) ? "Falta escribir la letra." : "" }; },
  ],
  [ // Intermedio: tres sumandos y restas
    () => { const v = pick(LTRS), cs = [between(2, 6), between(2, 6), between(2, 5)], c = cs[0] + cs[1] + cs[2], ans = c + v;
      return { prompt: `Halla la suma: <b>${termsTxt(cs, v)}</b>`, say: `Halla la suma de ${termsSay(cs, v)}.`, scene: "",
        ans, opts: lOpts(c, v, [String(c), (c - cs[2]) + v, (c + 2) + v]), cols: 2,
        why: `${cs.join(" + ")} = ${c}, entonces ${ans}.`, hint: "Suma los tres números.",
        steps: T => [
          { t: `Hay tres términos con la misma letra «${v}». Sumamos solo los números.` },
          { t: `${cs.join(" + ")}: de dos en dos.`, b: BOARD.lines([`${cs[0]} + ${cs[1]} = ${cs[0] + cs[1]}`, `${cs[0] + cs[1]} + ${cs[2]} = ${c}`]) },
          { t: `${termsTxt(cs, v)} = <b>${ans}</b>.` }
        ],
        err: w => w === String(c) ? "Falta escribir la letra." : "" }; },
    () => { const v = pick(LTRS), b = between(2, 6), c = between(2, 7), a = b + c, ans = c + v;
      return { prompt: `Resta: <b>${a}${v} − ${b}${v}</b>`, say: `Resta ${a} ${v} menos ${b} ${v}.`, scene: "",
        ans, opts: lOpts(c, v, [(a + b) + v, String(c), (c + 1) + v]), cols: 2,
        why: `${a} − ${b} = ${c}, entonces ${ans}.`, hint: "Resta los números; la letra se queda igual.",
        steps: T => [
          { t: `En la resta pasa lo mismo: restamos <b>solo los números</b> y la letra «${v}» se queda.` },
          { t: `${a} − ${b} = ${c}.`, b: BOARD.lines([`${a}${v} − ${b}${v} = (${a} − ${b})${v} = ${c}${v}`]) },
          { t: `El resultado es <b>${ans}</b>.` }
        ],
        err: w => w === (a + b) + v ? "Sumaste; el signo es −." : "" }; },
    () => { const e = pick(CAJ), a = between(4, 8), b = between(2, a - 2), ans = a - b;
      return { prompt: `Había ${a} ${e} y se llevaron ${b} ${e}. ¿Cuántas ${e} quedan?`, say: `Había ${a} cajitas y se llevaron ${b}. ¿Cuántas quedan?`,
        scene: line([...em(e, a)]), ans, opts: numOpts(ans, [a + b, ans + 1, ans - 1], 0),
        why: `${a} − ${b} = ${ans}. Es como ${a}x − ${b}x = ${ans}x.`, hint: "Quita las que se llevaron.",
        steps: T => [
          { t: `Había ${a} cajitas ${e}. Se llevaron ${b}: quitamos ${b}.`, go: d => { T.dim(T.its().slice(a - b)); setTimeout(d, 700); } },
          { t: `Contamos las que quedan:`, go: T.count(T.its().slice(0, a - b)) },
          { t: `${a} − ${b} = <b>${ans}</b>. Con letras: ${a}x − ${b}x = ${ans}x.` }
        ],
        err: w => w === a + b ? "Sumaste; si se llevan, quedan menos." : "" }; },
  ],
  [ // Reto concurso
    () => { const v = pick(LTRS), k = between(2, 3) + 1, cs = Array.from({ length: k }, () => 2 * between(2, 8)), c = cs.reduce((a, b) => a + b, 0), ans = c + v;
      return { prompt: `Halla la suma: <b>${termsTxt(cs, v)}</b>`, say: `Halla la suma de ${termsSay(cs, v)}.`, scene: "",
        ans, opts: lOpts(c, v, [String(c), (c - 2) + v, (c + 4) + v]), cols: 2,
        why: `${cs.join(" + ")} = ${c}, entonces ${ans}.`, hint: "Suma todos los números y deja la letra al final.",
        steps: T => [
          { t: `Todos los términos tienen la letra «${v}». Sumamos los números: ${cs.join(" + ")}.` },
          { t: `Sumamos de dos en dos:`, b: BOARD.lines(cs.slice(1).map((x2, i) => `${cs.slice(0, i + 1).reduce((p, q) => p + q, 0)} + ${x2} = ${cs.slice(0, i + 2).reduce((p, q) => p + q, 0)}`), { step: .8 }) },
          { t: `${termsTxt(cs, v)} = <b>${ans}</b>.` }
        ],
        err: w => w === String(c) ? "¡Falta la letra!" : "" }; },
    () => { const v = pick(LTRS), a = between(2, 6), b = between(2, 6), c = a + b, s = between(2, c - 2), r = c - s, ans = r + v;
      return { prompt: `Reduce: <b>${a}${v} + ${b}${v} − ${s}${v}</b>`, say: `Reduce ${a} ${v} más ${b} ${v} menos ${s} ${v}.`, scene: "",
        ans, opts: lOpts(r, v, [(c + s) + v, c + v, String(r)]), cols: 2,
        why: `${a} + ${b} = ${c}; ${c} − ${s} = ${r}. Entonces ${ans}.`, hint: "Primero suma, después resta.",
        steps: T => [
          { t: `Reducir es juntar en un solo término. Vamos en orden, de izquierda a derecha.` },
          { t: `Primero sumamos: ${a}${v} + ${b}${v} = ${c}${v}. Después restamos: ${c}${v} − ${s}${v} = ${r}${v}.`, b: BOARD.lines([`${a} + ${b} = ${c}`, `${c} − ${s} = ${r}`]) },
          { t: `El resultado es <b>${ans}</b>.` }
        ],
        err: w => w === (c + s) + v ? "El último término se <b>resta</b>." : w === c + v ? "Te faltó restar." : "" }; },
    () => { const v = pick(["x", "a"]), k = between(2, 5), x = between(2, 5), ans = k * x;
      return { prompt: `Si <b>${v} = ${x}</b>, ¿cuánto vale <b>${k}${v}</b>?`, say: `Si ${v} vale ${x}, ¿cuánto vale ${k} ${v}?`,
        scene: `<div class="legend">${k}${v} = ${Array(k).fill(v).join(" + ")}</div>`, ans, opts: numOpts(ans, [k + x, ans + x, ans - x], 1),
        why: `${k}${v} es ${Array(k).fill(x).join(" + ")} = ${ans}.`, hint: `${k}${v} es sumar ${k} veces el ${x}.`,
        steps: T => [
          { t: `${k}${v} quiere decir ${v} repetida ${k} veces: ${Array(k).fill(v).join(" + ")}.` },
          { t: `Cambiamos cada ${v} por ${x}:`, b: BOARD.lines([`${k}${v} = ${Array(k).fill(v).join(" + ")}`, `= ${Array(k).fill(x).join(" + ")}`]) },
          { t: `${Array(k).fill(x).join(" + ")} = <b>${ans}</b>.` }
        ],
        err: w => w === k + x ? `${k}${v} no es ${k} + ${x}: es ${x} repetido ${k} veces.` : "" }; },
    () => { const v = pick(LTRS), a = between(2, 7), b = between(2, 7), c = a + b, ans = b + v;
      return { prompt: `¿Qué falta? <b>${a}${v} + ___ = ${c}${v}</b>`, say: `¿Qué falta? ${a} ${v} más cuánto es igual a ${c} ${v}?`, scene: "",
        ans, opts: lOpts(b, v, [(c + a) + v, String(b), (b + 1) + v]), cols: 2,
        why: `${c} − ${a} = ${b}, entonces falta ${ans}.`, hint: "Resta para hallar lo que falta.",
        steps: T => [
          { t: `¿Qué le falta a ${a}${v} para llegar a ${c}${v}? Miramos solo los números: ¿cuánto le falta a ${a} para llegar a ${c}?` },
          { t: `Contamos desde ${a} hasta ${c}:`, b: BOARD.jumps(a, Array(b).fill(1), { step: .3 }) },
          { t: `Faltan ${b}: falta <b>${ans}</b>.` }
        ],
        err: w => w === String(b) ? "¡Falta la letra!" : w === (c + a) + v ? "Sumaste; hay que buscar lo que falta." : "" }; },
  ]
];
lesson({ n: 62, next: 64, title: "Sumas con letras (inicio del álgebra)", short: "Sumas con letras", char: "mika", music: "kpop", deco: ["🎁", "➕", "🔤", "⭐"],
  hello: "¡Hola! Soy <b>Mika</b>. En matemática una <b>letra</b> puede ser como una <b>cajita</b>: 3x + 2x son 3 cajitas más 2 cajitas = <b>5x</b>. ¡Suma los números y la letra se queda igual!",
  levels: LEVELS3(["Letras como cajitas", "Sumar dos términos"], ["Tres sumandos y restas", "Sumar y quitar"], ["", "Retos de concurso"]) }, GEN);
