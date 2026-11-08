/* Tema 50 · Conteo de cubos y construcciones · Bimba */
const sum = H => H.flat().reduce((a, b) => a + b, 0);
const rndH = (r, c, max) => Array.from({ length: r }, () => Array.from({ length: c }, () => between(1, max)));
const GEN = [
  [
    () => { const H = [Array.from({ length: between(2, 4) }, () => between(1, 3))], ans = sum(H);
      return { prompt: "¿Cuántos <b>cubos</b> hay?", say: "¿Cuántos cubos hay en total?", scene: isoCubes(H), ans, opts: numOpts(ans, [H[0].length, ans + 1, ans - 1], 1), why: `Por columnas: ${H[0].join(" + ")} = ${ans}.`, hint: "Cuenta columna por columna, de abajo hacia arriba.",
        steps: T => { const tp = isoTops(H), acc = tp.map((_, i) => tp.slice(0, i + 1).reduce((p, q) => p + q.n, 0));
          return [
            { t: `Contamos <b>columna por columna</b>: cuántos cubos tiene cada torre, de abajo hacia arriba.` },
            { t: `Ponemos en cada torre su número de cubos:`, go: T.dots(T.sc.querySelector("svg"), tp.map(p => [p.x, p.y]), { label: k => tp[k - 1].n, say: k => String(acc[k - 1]), ms: 1000 }) },
            { t: `${H[0].join(" + ")} = <b>${ans}</b> cubos.`, b: BOARD.lines([`${H[0].join(" + ")} = ${ans}`]) }
          ]; },
        err: w => w === H[0].length ? "Contaste columnas; cada columna puede tener varios cubos." : "" }; },
  ],
  [
    () => { const n = between(3, 4), H = [Array.from({ length: n }, (_, i) => n - i)], ans = sum(H);
      return { prompt: "¿Cuántos cubos de igual tamaño forman la escalera?", say: "¿Cuántos cubos forman la escalera?", scene: isoCubes(H), ans, opts: numOpts(ans, [n, 2 * n, ans + 1], 1), why: `${H[0].join(" + ")} = ${ans}.`, hint: "Cada escalón tiene un cubo menos.",
        steps: T => { const tp = isoTops(H);
          return [
            { t: `Es una escalera: cada escalón tiene <b>un cubo menos</b> que el anterior.` },
            { t: `Contamos los cubos de cada columna:`, go: T.dots(T.sc.querySelector("svg"), tp.map(p => [p.x, p.y]), { label: k => tp[k - 1].n, say: k => String(tp[k - 1].n), ms: 1000 }) },
            { t: `${H[0].join(" + ")} = <b>${ans}</b> cubos.`, b: BOARD.lines([`${H[0].join(" + ")} = ${ans}`]) }
          ]; },
        err: w => w === n ? "Contaste solo los de arriba; cada columna tiene más cubos." : "" }; },
    () => { const H = rndH(2, 2, 2), ans = sum(H);
      return { prompt: "¿Cuántos cubos hay en la construcción? (todos se apoyan en el piso o en otro cubo)", say: "¿Cuántos cubos hay en la construcción?", scene: isoCubes(H), ans, opts: numOpts(ans, [ans - 1, ans + 1, 4], 1), why: `Por torres: ${H.flat().join(" + ")} = ${ans}.`, hint: "Hay cubos escondidos atrás: cuenta torre por torre.",
        steps: T => { const tp = isoTops(H);
          return [
            { t: `Hay torres atrás que se ven poco, ¡pero existen! Todos los cubos se apoyan en el piso o en otro cubo.` },
            { t: `Contamos torre por torre:`, go: T.dots(T.sc.querySelector("svg"), tp.map(p => [p.x, p.y]), { label: k => tp[k - 1].n, say: k => tp[k - 1].n + (tp[k - 1].n > 1 ? " cubos" : " cubo"), ms: 1100 }) },
            { t: `${H.flat().join(" + ")} = <b>${ans}</b> cubos.`, b: BOARD.table([["", "izq.", "der."], ["atrás", ...H[0]], ["adelante", ...H[1]]]) }
          ]; },
        err: w => w === 4 ? "Contaste las torres, pero algunas tienen 2 cubos." : "" }; },
  ],
  [
    () => { const f = pick([[2, 2, 2], [2, 3, 2], [3, 2, 1]]), H = Array.from({ length: f[0] }, () => Array(f[1]).fill(f[2])), ans = sum(H);
      return { prompt: "Gabrielita armó esta caja con cubos iguales. ¿Cuántos cubos usó?", say: "¿Cuántos cubos usó para armar la caja?", scene: isoCubes(H), ans, opts: numOpts(ans, [f[0] * f[1], ans - 2, ans + 2], 1), why: `${f[0]} × ${f[1]} = ${f[0] * f[1]} por piso, y ${f[2]} piso${f[2] > 1 ? "s" : ""}: ${ans}.`, hint: "Cuenta los cubos de un piso y multiplica por los pisos.",
        steps: T => [
          { t: `La caja tiene <b>pisos</b> iguales. Contamos los cubos de un piso: ${f[0]} filas de ${f[1]} = ${f[0] * f[1]}.`, b: BOARD.groups(Array.from({ length: f[0] }, (_, i) => ({ n: f[1], e: "🟦", c: "#3b82f6", lab: "fila " + (i + 1) }))) },
          f[2] > 1 ? { t: `Hay ${f[2]} pisos iguales: ${Array(f[2]).fill(f[0] * f[1]).join(" + ")}.`, bAdd: BOARD.lines([`${Array(f[2]).fill(f[0] * f[1]).join(" + ")} = ${ans}`]) } : { t: `Hay un solo piso, así que no hay que sumar más pisos.` },
          { t: `Usó <b>${ans}</b> cubos.` }
        ],
        err: w => w === f[0] * f[1] ? "Ese es un solo piso; hay más pisos." : "" }; },
    () => { const H = rndH(2, 2, 2), have = sum(H), ans = 8 - have;
      return { prompt: "¿Cuántos cubos <b>faltan</b> para formar un cubo grande de 2 × 2 × 2?", say: "¿Cuántos cubos faltan para formar un cubo grande de dos por dos por dos?", scene: isoCubes(H), ans, opts: numOpts(ans, [have, 8, ans + 1], 0), why: `El cubo grande tiene 8. Hay ${have}: faltan ${ans}.`, hint: "Un cubo de 2 × 2 × 2 tiene 8 cubitos.",
        steps: T => { const tp = isoTops(H);
          return [
            { t: `Un cubo grande de 2 × 2 × 2 tiene 2 pisos de 4 cubitos: <b>8</b> cubitos.` },
            { t: `Contamos los que ya hay, torre por torre:`, go: T.dots(T.sc.querySelector("svg"), tp.map(p => [p.x, p.y]), { label: k => tp[k - 1].n, say: k => String(tp.slice(0, k).reduce((p, q) => p + q.n, 0)), ms: 1000 }) },
            { t: `Hay ${have}. Faltan 8 − ${have} = <b>${ans}</b>.`, b: BOARD.lines([`8 − ${have} = ${ans}`]) }
          ]; },
        err: w => w === have ? "Esos son los que ya hay; piden los que faltan." : "" }; },
  ]
];
lesson({ n: 50, title: "Conteo de cubos y construcciones", short: "Cubos", char: "bimba", music: "cajabeat", deco: ["🧊", "🧱", "📦", "🏗️"],
  hello: "¡Hola! Soy <b>Bimba</b> 🐘. Con cubitos se arman torres y escaleras. ¡Ojo con los que se esconden atrás!",
  levels: LEVELS3(["Torres", "Contar cubos"], ["Escaleras y construcciones", "Cubos escondidos"], ["", "Cajas y cubos que faltan"]) }, GEN);
