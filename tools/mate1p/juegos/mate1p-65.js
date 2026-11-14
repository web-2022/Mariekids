/* Tema 65 · Fracciones (gráficas y equivalencias) · Lula */
// barra dividida en n partes iguales; k pintadas (data-k P / W para el tutor)
function fracBar(n, k, o = {}) {
  const W = 300, H = 64, w = W / n, col = o.color || "#f472b6";
  let g = "";
  for (let i = 0; i < n; i++) g += `<rect class="it" data-k="${i < k ? "P" : "W"}" x="${(i * w + 2).toFixed(1)}" y="2" width="${(w).toFixed(1)}" height="${H}" fill="${i < k ? col : "#fff"}" stroke="#0f172a" stroke-width="3"/>`;
  return svgWrap(W + 4, H + 4, g, 300);
}
// círculo (pizza) en n partes iguales
function fracPie(n, k, o = {}) {
  const R = 70, C = 74, col = o.color || "#fbbf24";
  let g = "";
  for (let i = 0; i < n; i++) {
    const a1 = -Math.PI / 2 + i * 2 * Math.PI / n, a2 = a1 + 2 * Math.PI / n, big = n === 1 ? 1 : 0;
    const p = n === 1 ? `M${C} ${C - R} A${R} ${R} 0 1 1 ${C - .01} ${C - R}Z`
      : `M${C} ${C} L${(C + R * Math.cos(a1)).toFixed(1)} ${(C + R * Math.sin(a1)).toFixed(1)} A${R} ${R} 0 ${big} 1 ${(C + R * Math.cos(a2)).toFixed(1)} ${(C + R * Math.sin(a2)).toFixed(1)}Z`;
    g += `<path class="it" data-k="${i < k ? "P" : "W"}" d="${p}" fill="${i < k ? col : "#fff"}" stroke="#0f172a" stroke-width="3"/>`;
  }
  return svgWrap(148, 148, g, 170);
}
// cuadrado en n partes (2 o 4) — en franjas
const fracDraw = (n, k, o = {}) => (o.pie ?? rnd(2)) ? fracPie(n, k, o) : fracBar(n, k, o);
const FR = (a, b) => `${a}/${b}`;
const nomb = { 2: "medios", 3: "tercios", 4: "cuartos", 5: "quintos", 6: "sextos", 8: "octavos" };
const uno = { 2: "un medio", 3: "un tercio", 4: "un cuarto", 5: "un quinto", 6: "un sexto", 8: "un octavo" };
const frVal = f => { const [a, b] = f.split("/").map(Number); return a / b; };
const frOpts = (ans, near) => { const s = new Set([ans]), ok = v => v && !v.startsWith("0/") && ![...s].some(x => Math.abs(frVal(x) - frVal(v)) < 1e-9);
  for (const v of near) { if (s.size >= 4) break; if (ok(v)) s.add(v); } for (const v of shuffle(["1/2", "1/3", "1/4", "2/3", "3/4", "1/5", "2/5", "3/5", "1/6", "5/6"])) { if (s.size >= 4) break; if (ok(v)) s.add(v); } return shuffle([...s]); };
const frSay = f => { const [a, b] = f.split("/").map(Number); return a === 1 ? uno[b] : `${a} ${nomb[b]}`; };

const GEN = [
  [ // Básico: partes iguales y fracción pintada
    () => { const n = pick([2, 3, 4, 5, 6, 8]), ans = n, k = 1;
      return { prompt: `¿En cuántas <b>partes iguales</b> está dividida la figura?`, say: "¿En cuántas partes iguales está dividida la figura?",
        scene: fracDraw(n, k), ans, opts: numOpts(ans, [ans - 1, ans + 1, ans * 2], 1), why: `Contamos las partes: son ${ans}.`, hint: "Cuenta todas las partes, pintadas y sin pintar.",
        steps: T => [
          { t: "Primero miramos la figura: está partida en pedazos del <b>mismo tamaño</b>. Vamos a contarlos todos." },
          { t: "Contamos <b>todas</b> las partes, las pintadas y las blancas:", go: T.count(T.its()) },
          { t: `La figura está dividida en <b>${ans}</b> partes iguales. Por eso cada parte es ${uno[n]}.` }
        ],
        err: w => w === ans - 1 ? "Te faltó contar una parte." : "" }; },
    () => { const n = pick([2, 3, 4, 5, 6]), ans = FR(1, n);
      return { prompt: `¿Qué fracción de la figura está <b>pintada</b>?`, say: "¿Qué fracción de la figura está pintada?",
        scene: fracDraw(n, 1), ans, opts: frOpts(ans, [FR(n, 1), FR(1, n + 1), FR(n - 1, n)]),
        why: `1 parte pintada de ${n} partes iguales: ${ans}.`, hint: "Abajo va el total de partes; arriba, las pintadas.",
        steps: T => [
          { t: "Una fracción tiene dos números: <b>abajo</b> el total de partes iguales y <b>arriba</b> las partes que tomamos." },
          { t: "Contamos todas las partes:", go: T.count(T.its()) },
          { t: `Son ${n} partes y hay <b>1</b> pintada. La fracción es <b>${ans}</b> (${uno[n]}).`, b: BOARD.big(`<div style="font-size:42px;font-weight:900">1<br><span style="border-top:4px solid #0f172a">${n}</span></div>`) }
        ],
        err: w => w === FR(n, 1) ? "Está al revés: abajo va el total de partes." : w === FR(n - 1, n) ? "Esas son las partes sin pintar." : "" }; },
    () => { const n = pick([3, 4, 5, 6, 8]), k = between(2, n - 1), ans = FR(k, n);
      return { prompt: `¿Qué fracción está pintada?`, say: "¿Qué fracción está pintada?",
        scene: fracDraw(n, k), ans, opts: frOpts(ans, [FR(n - k, n), FR(n, k), FR(k, n + 1)].filter(x => x !== ans)),
        why: `${k} partes pintadas de ${n}: ${ans}.`, hint: "Cuenta primero todas las partes y luego las pintadas.",
        steps: T => [
          { t: "Contamos <b>todas</b> las partes:", go: T.count(T.its()) },
          { t: "Ahora contamos solo las <b>pintadas</b>:", go: T.count(T.of("P"), { color: "#e11d48" }) },
          { t: `${k} pintadas de ${n}: la fracción es <b>${ans}</b>.` }
        ],
        err: w => w === FR(n - k, n) ? "Esas son las partes blancas." : w === FR(n, k) ? "Está al revés: abajo va el total." : "" }; },
  ],
  [ // Intermedio: parte sin pintar, fracción de una cantidad, comparar
    () => { const n = pick([3, 4, 5, 6, 8]), k = between(1, n - 1), ans = FR(n - k, n);
      return { prompt: `¿Qué fracción <b>NO</b> está pintada?`, say: "¿Qué fracción no está pintada?",
        scene: fracDraw(n, k), ans, opts: frOpts(ans, [FR(k, n), FR(n, n - k), FR(n - k, n + 1)].filter(x => x !== ans)),
        why: `Hay ${n - k} partes blancas de ${n}: ${ans}.`, hint: "Cuenta las partes blancas.",
        steps: T => [
          { t: `El total de partes es ${n}.`, go: T.count(T.its()) },
          { t: "Contamos las partes <b>blancas</b>:", go: T.count(T.of("W"), { color: "#2563eb" }) },
          { t: `${n - k} blancas de ${n}: <b>${ans}</b>.` }
        ],
        err: w => w === FR(k, n) ? "Esa es la parte pintada; piden la que NO está pintada." : "" }; },
    () => { const n = pick([2, 3, 4]), g = between(2, 4), tot = n * g, ans = g, e = pick(["🍎", "🍓", "🧁", "⚽", "🐟"]);
      return { prompt: `¿Cuánto es <b>${uno[n]}</b> (${FR(1, n)}) de ${tot} ${e}?`, say: `¿Cuánto es ${uno[n]} de ${tot}?`,
        scene: scatter(em(e, tot)), ans, opts: numOpts(ans, [tot - ans, ans + 1, tot], 1),
        why: `Repartimos ${tot} en ${n} grupos iguales: cada grupo tiene ${ans}.`, hint: `Reparte en ${n} grupos iguales.`,
        steps: T => [
          { t: `${uno[n][0].toUpperCase() + uno[n].slice(1)} significa partir en <b>${n} grupos iguales</b> y tomar uno.` },
          { t: `Repartimos los ${tot}:`, b: BOARD.share(tot, n, e) },
          { t: `Cada grupo tiene <b>${ans}</b>: ${uno[n]} de ${tot} es ${ans}.` }
        ],
        err: w => w === tot ? "Ese es el total; hay que repartir." : w === tot - ans ? "Eso es lo que queda, no la parte." : "" }; },
    () => { const [a, b] = shuffle(pick([[2, 4], [2, 3], [3, 4], [2, 8], [4, 8], [3, 6]])), big = Math.min(a, b), ans = FR(1, big);
      return { prompt: `¿Qué es <b>más grande</b>: ${FR(1, a)} o ${FR(1, b)} de la misma pizza?`, say: `¿Qué es más grande: ${uno[a]} o ${uno[b]} de la misma pizza?`,
        scene: `<div class="line">${fracPie(a, 1)}${fracPie(b, 1)}</div>`, ans, opts: [FR(1, a), FR(1, b), "Son iguales"],
        why: `Si partimos la pizza en menos pedazos, cada pedazo es más grande: ${ans}.`, hint: "¿En cuál pizza los pedazos son más grandes?", min: 3,
        steps: T => [
          { t: `Mira las dos pizzas: una en ${a} partes y otra en ${b} partes.` },
          { t: `Mientras <b>más partes</b>, cada pedazo es <b>más pequeño</b>. Con menos partes, cada pedazo es más grande.` },
          { t: `${ans} (${uno[big]}) es más grande.` }
        ],
        err: w => w === "Son iguales" ? "Las pizzas son iguales, pero los pedazos no." : "Ese pedazo es más chico: la pizza tiene más partes." }; },
  ],
  [ // Reto concurso: equivalencias y problemas
    () => { const base = pick([2, 3, 4]), m = pick([2, 2, 3]), n = base * m, k = m, ans = FR(1, base);
      return { prompt: `La parte pintada es <b>${FR(k, n)}</b>. ¿Qué fracción es <b>equivalente</b> (igual)?`, say: `La parte pintada es ${frSay(FR(k, n))}. ¿Qué fracción es equivalente?`,
        scene: `<div class="line">${fracBar(n, k)}</div><div class="line">${fracBar(base, 1, { color: "#38bdf8" })}</div>`, ans, opts: frOpts(ans, [FR(k, n + 1), FR(1, n), FR(base - 1, base)].filter(x => x !== ans && x !== FR(k, n))),
        why: `${FR(k, n)} pinta lo mismo que ${ans}: son fracciones equivalentes.`, hint: "Compara las dos barras: ¿pintan lo mismo?",
        steps: T => [
          { t: `Arriba la barra está en ${n} partes y hay ${k} pintadas. Abajo, la misma barra en ${base} partes.` },
          { t: `Si juntamos de ${m} en ${m} las partes de arriba, quedan ${base} partes, y lo pintado es <b>1</b> de ellas.`, b: BOARD.lines([`${FR(k, n)} = ${FR(k / m, n / m)}`], { step: 1 }) },
          { t: `Pintan lo mismo: ${FR(k, n)} = <b>${ans}</b>.` }
        ],
        err: w => w === FR(1, n) ? `Eso sería una sola parte de ${n}; hay ${k} pintadas.` : "" }; },
    () => { const n = pick([3, 4]), k = between(2, n - 1), g = between(2, 4), tot = n * g, ans = k * g, e = pick(["🍬", "🍪", "🌸"]);
      return { prompt: `Bimba tiene ${tot} ${e}. Regala <b>${FR(k, n)}</b>. ¿Cuántos regala?`, say: `Bimba tiene ${tot}. Regala ${frSay(FR(k, n))}. ¿Cuántos regala?`,
        scene: scatter(em(e, tot)), ans, opts: numOpts(ans, [g, tot - ans, ans + g], 1),
        why: `${uno[n]} de ${tot} es ${g}; ${k} veces eso: ${k} × ${g} = ${ans}.`, hint: `Primero halla ${uno[n]} de ${tot}.`,
        steps: T => [
          { t: `Partimos los ${tot} en <b>${n}</b> grupos iguales:`, b: BOARD.share(tot, n, e) },
          { t: `Cada grupo tiene ${g}. Regala <b>${k}</b> grupos: ${Array(k).fill(g).join(" + ")} = ${ans}.` },
          { t: `Regala <b>${ans}</b>.` }
        ],
        err: w => w === g ? `Ese es un solo grupo (${uno[n]}); regala ${k} grupos.` : w === tot - ans ? "Eso es lo que le queda." : "" }; },
    () => { const n = pick([2, 3, 4, 6, 8]), ans = n;
      return { prompt: `¿Cuántos <b>${nomb[n]}</b> (${FR(1, n)}) forman una pizza entera?`, say: `¿Cuántos ${nomb[n]} forman una pizza entera?`,
        scene: fracPie(n, n), ans, opts: numOpts(ans, [1, ans + 1, ans - 1], 1),
        why: `Una pizza entera = ${FR(n, n)}: son ${n} ${nomb[n]}.`, hint: "Cuenta los pedazos de la pizza entera.",
        steps: T => [
          { t: `Una pizza entera se parte en ${n} pedazos iguales; cada pedazo es ${uno[n]}.` },
          { t: `Cada pedazo es ${uno[n]}. Contamos los pedazos:`, go: T.count(T.its()) },
          { t: `La pizza entera son ${FR(n, n)}: <b>${ans}</b> ${nomb[n]}.` }
        ],
        err: w => w === 1 ? "Es una pizza, pero tiene varios pedazos." : "" }; },
    () => { const n = pick([4, 6, 8]), a = between(1, n / 2 - 1), b = between(1, n - a - 1), ans = n - a - b, nm = pick(["Tito", "Kiki"]), nm2 = pick(["Lula", "Bimba"]);
      return { prompt: `Una pizza tiene ${n} pedazos iguales. ${nm} come ${FR(a, n)} y ${nm2} come ${FR(b, n)}. ¿Cuántos pedazos <b>quedan</b>?`, say: `Una pizza tiene ${n} pedazos. ${nm} come ${frSay(FR(a, n))} y ${nm2} ${frSay(FR(b, n))}. ¿Cuántos pedazos quedan?`,
        scene: fracPie(n, a + b), ans, opts: numOpts(ans, [a + b, n - a, n - b], 0),
        why: `Comieron ${a} + ${b} = ${a + b} pedazos; quedan ${n} − ${a + b} = ${ans}.`, hint: "Suma lo que comieron y réstalo del total.",
        steps: T => [
          { t: `${FR(a, n)} son ${a} pedazos y ${FR(b, n)} son ${b} pedazos. Comieron ${a + b} (los pintados):`, go: T.count(T.of("P"), { color: "#e11d48" }) },
          { t: `Quedan los blancos:`, go: T.count(T.of("W"), { color: "#2563eb" }) },
          { t: `${n} − ${a + b} = <b>${ans}</b> pedazos.` }
        ],
        err: w => w === a + b ? "Eso es lo que comieron; piden lo que queda." : "" }; },
  ]
];
lesson({ n: 65, next: 30, title: "Fracciones (gráficas y equivalencias)", short: "Fracciones", char: "lula", music: "marimba", deco: ["🍕", "🍫", "½", "⭐"],
  hello: "¡Hola! Soy <b>Lula</b>. Una <b>fracción</b> es una parte de algo partido en partes <b>iguales</b>. Si parto una pizza en 4 y como 1, comí <b>1/4</b>: abajo va el total de partes y arriba las que tomo.",
  levels: LEVELS3(["Partes iguales", "½, ⅓, ¼ con dibujos"], ["Fracción de una cantidad", "¼ de 12 · comparar"], ["", "2/4 = 1/2 · problemas"]) }, GEN);
