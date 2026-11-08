/* Tema 30 · Pares y grupos con igual cantidad · Bimba */
const GEN = [
  [
    () => { const g = pick([2, 3, 5]), k = between(2, 5), n = g * k, e = pick(["🍎", "⭐", "🐟", "🍪"]);
      return { prompt: `¿Cuántos grupos de <b>${g}</b> se pueden formar?`, say: `¿Cuántos grupos de ${g} se pueden formar?`, scene: line(em(e, n)), ans: k, opts: numOpts(k, [n, g, k + 1], 1), why: `${n} en grupos de ${g}: ${Array(k).fill(g).join(" + ")} = ${n} → ${k} grupos.`, hint: `Encierra de ${g} en ${g}.`,
        steps: T => [
          { t: `Formamos grupos de <b>${g}</b>: encerramos de ${g} en ${g} y le ponemos número a cada grupo.`, go: T.chunks(T.its(), g, { say: k => "grupo " + k }) },
          { t: `Formamos ${k} grupos. Comprobamos: ${Array(k).fill(g).join(" + ")} = ${n}. ✅`, b: BOARD.lines([`${Array(k).fill(g).join(" + ")} = ${n}`]) },
          { t: `Se pueden formar <b>${k}</b> grupos de ${g}.` }
        ],
        err: w => w === n ? `${n} son las cosas sueltas; piden cuántos <b>grupos</b>.` : w === g ? `${g} es lo que tiene cada grupo.` : "" }; },
  ],
  [
    () => { const d = between(3, 6), ans = 2 * d;
      return { prompt: `¿Cuántos <b>pares</b> de patas hay en total?`, say: "Cada perrito tiene 4 patas. ¿Cuántos pares de patas hay?", scene: line(em("🐶", d)), ans, opts: numOpts(ans, [4 * d, d, ans + 2], 1), why: `${d} perritos × 4 patas = ${4 * d} patas = ${ans} pares.`, hint: "Un perrito tiene 2 pares de patas.",
        steps: T => [
          { t: `Cada perrito tiene <b>4 patas</b>. Un <b>par</b> son 2, así que cada perrito tiene <b>2 pares</b> de patas.` },
          { t: `Contamos de 2 en 2, dos pares por perrito:`, go: T.count(T.its(), { label: k => String(2 * k), say: k => String(2 * k), ms: 1000 }) },
          { t: `${d} perritos × 2 pares = <b>${ans}</b> pares (son ${4 * d} patas).`, b: BOARD.lines([`${Array(d).fill(2).join(" + ")} = ${ans}`]) }
        ],
        err: w => w === 4 * d ? "Esas son las patas sueltas; piden pares (de 2 en 2)." : w === d ? "Esos son los perritos." : "" }; },
    () => { const g = between(2, 4), k = between(2, 4), e = pick(["🍓", "⚽", "🎈"]), ok = between(0, 1);
      const groups = Array.from({ length: k }, (_, i) => i === 0 && ok === 0 ? g + 1 : g), ans = ok ? "Sí" : "No";
      return { prompt: "¿Todos los grupos tienen la <b>misma cantidad</b>?", say: "¿Todos los grupos tienen la misma cantidad?", scene: `<div class="boxes">${groups.map(x => `<div class="box" style="--bc:${Math.min(x, 3)}">${em(`<span class="it">${e}</span>`, x).join("")}</div>`).join("")}</div>`, ans, opts: ["Sí", "No"], cols: 2, min: 2,
        why: ok ? `Todos tienen ${g}.` : `Un grupo tiene ${g + 1} y los demás ${g}.`, hint: "Cuenta cada caja.",
        steps: T => { const bx = T.its(".box");
          return [
            { t: `Contamos lo que hay en cada caja, una por una:`, go: d => { let i = 0; const nx = () => i < bx.length ? T.count([...bx[i++].querySelectorAll(".it")], { ms: 450 })(nx) : d(); nx(); } },
            { t: ok ? `Todas las cajas tienen <b>${g}</b>: ¡la misma cantidad!` : `Una caja tiene <b>${g + 1}</b> y las demás <b>${g}</b>: no son iguales.`, b: BOARD.table([["Caja", ...groups.map((x, i) => i + 1)], ["Tiene", ...groups]]) },
            { t: `La respuesta es <b>${ans}</b>.` }
          ]; } }; },
  ],
  [
    () => { const k = between(2, 4), g = between(3, 6), J = (n, v) => Array(n).fill(v).join(" + "), ans = J(k, g), opts = [ans, `${k} + ${g}`, J(k + 1, g), k === g ? J(k - 1, g) : J(g, k)];
      return { prompt: `<b>${k}</b> paquetes tienen <b>${g}</b> galletas cada uno. La cantidad de galletas se puede expresar como:`, say: `${k} paquetes con ${g} galletas cada uno. ¿Cómo se expresa?`, scene: `<div class="boxes">${Array.from({ length: k }, () => `<div class="box" style="--bc:3">${em(`<span class="it">🍪</span>`, g).join("")}</div>`).join("")}</div>`,
        ans, opts: shuffle([...new Set(opts)]), cols: 1, cls: "grp", why: `${ans} = ${k * g}.`, hint: "Cada paquete aporta la misma cantidad.",
        steps: T => [
          { t: `Hay ${k} paquetes y cada uno tiene ${g}. Cada paquete aporta <b>${g}</b>.`, go: T.count(T.its(".box"), { label: i => "+" + g, say: () => String(g), ms: 900 }) },
          { t: `Entonces sumamos ${g} una vez por cada paquete: ${k} veces.`, b: BOARD.lines([`${ans} = ${k * g}`]) },
          { t: `La cantidad se expresa como <b>${ans}</b>. Ojo: ${k} + ${g} no sirve, porque ${k} es la cantidad de paquetes.` }
        ],
        err: w => w === `${k} + ${g}` ? `${k} es el número de paquetes, no de galletas.` : "" }; },
  ]
];
lesson({ n: 30, title: "Pares y grupos con igual cantidad", short: "Grupos iguales", char: "bimba", music: "pop", deco: ["👟", "📦", "🍪", "🐶"],
  hello: "¡Hola! Soy <b>Bimba</b> 🐘. Vamos a formar <b>grupos iguales</b>. ¡Es el primer paso para multiplicar!",
  levels: LEVELS3(["Formar grupos", "Grupos de 2, 3 y 5"], ["Pares y grupos iguales", "Patas y cajas"], ["", "Expresar con sumas"]) }, GEN);
