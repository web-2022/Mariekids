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
        why: `${a} + ${b} = ${ans} cajitas.`, hint: "Cuenta todas las cajitas juntas." }; },
    () => { const e = pick(CAJ), v = pick(LTRS), a = between(2, 5), b = between(2, 4), c = a + b, ans = c + v;
      return { prompt: `Si cada ${e} es una «${v}», ¿cuánto es <b>${a}${v} + ${b}${v}</b>?`, say: `Si cada cajita es una ${v}, ¿cuánto es ${a} ${v} más ${b} ${v}?`,
        scene: line([...em(e, a), "➕", ...em(e, b)]), ans, opts: lOpts(c, v, [String(c), (a * b) + v, (c + 1) + v]), cols: 2,
        why: `${a} cajitas más ${b} cajitas son ${c} cajitas: ${a}${v} + ${b}${v} = ${ans}.`, hint: "Suma los números; la letra se queda igual." }; },
    () => { const v = pick(LTRS), a = between(2, 7), b = between(2, 7), c = a + b, ans = c + v;
      return { prompt: `Halla la suma: <b>${a}${v} + ${b}${v}</b>`, say: `Halla la suma de ${a} ${v} más ${b} ${v}.`, scene: "",
        ans, opts: lOpts(c, v, [String(c), (c + 2) + v, (c - 1) + v]), cols: 2,
        why: `${a} + ${b} = ${c}, entonces ${ans}.`, hint: "Suma solo los números y escribe la letra al final." }; },
  ],
  [ // Intermedio: tres sumandos y restas
    () => { const v = pick(LTRS), cs = [between(2, 6), between(2, 6), between(2, 5)], c = cs[0] + cs[1] + cs[2], ans = c + v;
      return { prompt: `Halla la suma: <b>${termsTxt(cs, v)}</b>`, say: `Halla la suma de ${termsSay(cs, v)}.`, scene: "",
        ans, opts: lOpts(c, v, [String(c), (c - cs[2]) + v, (c + 2) + v]), cols: 2,
        why: `${cs.join(" + ")} = ${c}, entonces ${ans}.`, hint: "Suma los tres números." }; },
    () => { const v = pick(LTRS), b = between(2, 6), c = between(2, 7), a = b + c, ans = c + v;
      return { prompt: `Resta: <b>${a}${v} − ${b}${v}</b>`, say: `Resta ${a} ${v} menos ${b} ${v}.`, scene: "",
        ans, opts: lOpts(c, v, [(a + b) + v, String(c), (c + 1) + v]), cols: 2,
        why: `${a} − ${b} = ${c}, entonces ${ans}.`, hint: "Resta los números; la letra se queda igual." }; },
    () => { const e = pick(CAJ), a = between(4, 8), b = between(2, a - 2), ans = a - b;
      return { prompt: `Había ${a} ${e} y se llevaron ${b} ${e}. ¿Cuántas ${e} quedan?`, say: `Había ${a} cajitas y se llevaron ${b}. ¿Cuántas quedan?`,
        scene: line([...em(e, a)]), ans, opts: numOpts(ans, [a + b, ans + 1, ans - 1], 0),
        why: `${a} − ${b} = ${ans}. Es como ${a}x − ${b}x = ${ans}x.`, hint: "Quita las que se llevaron." }; },
  ],
  [ // Reto concurso
    () => { const v = pick(LTRS), k = between(2, 3) + 1, cs = Array.from({ length: k }, () => 2 * between(2, 8)), c = cs.reduce((a, b) => a + b, 0), ans = c + v;
      return { prompt: `Halla la suma: <b>${termsTxt(cs, v)}</b>`, say: `Halla la suma de ${termsSay(cs, v)}.`, scene: "",
        ans, opts: lOpts(c, v, [String(c), (c - 2) + v, (c + 4) + v]), cols: 2,
        why: `${cs.join(" + ")} = ${c}, entonces ${ans}.`, hint: "Suma todos los números y deja la letra al final." }; },
    () => { const v = pick(LTRS), a = between(2, 6), b = between(2, 6), c = a + b, s = between(2, c - 2), r = c - s, ans = r + v;
      return { prompt: `Reduce: <b>${a}${v} + ${b}${v} − ${s}${v}</b>`, say: `Reduce ${a} ${v} más ${b} ${v} menos ${s} ${v}.`, scene: "",
        ans, opts: lOpts(r, v, [(c + s) + v, c + v, String(r)]), cols: 2,
        why: `${a} + ${b} = ${c}; ${c} − ${s} = ${r}. Entonces ${ans}.`, hint: "Primero suma, después resta." }; },
    () => { const v = pick(["x", "a"]), k = between(2, 5), x = between(2, 5), ans = k * x;
      return { prompt: `Si <b>${v} = ${x}</b>, ¿cuánto vale <b>${k}${v}</b>?`, say: `Si ${v} vale ${x}, ¿cuánto vale ${k} ${v}?`,
        scene: `<div class="legend">${k}${v} = ${Array(k).fill(v).join(" + ")}</div>`, ans, opts: numOpts(ans, [k + x, ans + x, ans - x], 1),
        why: `${k}${v} es ${Array(k).fill(x).join(" + ")} = ${ans}.`, hint: `${k}${v} es sumar ${k} veces el ${x}.` }; },
    () => { const v = pick(LTRS), a = between(2, 7), b = between(2, 7), c = a + b, ans = b + v;
      return { prompt: `¿Qué falta? <b>${a}${v} + ___ = ${c}${v}</b>`, say: `¿Qué falta? ${a} ${v} más cuánto es igual a ${c} ${v}?`, scene: "",
        ans, opts: lOpts(b, v, [(c + a) + v, String(b), (b + 1) + v]), cols: 2,
        why: `${c} − ${a} = ${b}, entonces falta ${ans}.`, hint: "Resta para hallar lo que falta." }; },
  ]
];
lesson({ n: 62, next: 64, title: "Sumas con letras (inicio del álgebra)", short: "Sumas con letras", char: "mika", music: "kpop", deco: ["🎁", "➕", "🔤", "⭐"],
  hello: "¡Hola! Soy <b>Mika</b>. En matemática una <b>letra</b> puede ser como una <b>cajita</b>: 3x + 2x son 3 cajitas más 2 cajitas = <b>5x</b>. ¡Suma los números y la letra se queda igual!",
  levels: LEVELS3(["Letras como cajitas", "Sumar dos términos"], ["Tres sumandos y restas", "Sumar y quitar"], ["", "Retos de concurso"]) }, GEN);
