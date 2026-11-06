/* Tema 57 · Tablas y tablas de doble entrada · Lula */
const FR = [["🍎", "Manzana"], ["🍌", "Plátano"], ["🍓", "Fresa"], ["🍇", "Uva"], ["🍐", "Pera"]];
const tbl = (head, rows) => `<table class="tbl"><tr>${head.map(h => `<th>${h}</th>`).join("")}</tr>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join("")}</tr>`).join("")}</table>`;
const GEN = [
  [
    () => { const f = sample(FR, 4), v = f.map(() => between(2, 12)), i = rnd(4);
      return { prompt: `Fruta favorita del salón: ¿cuántos niños prefieren <b>${f[i][1].toLowerCase()}</b>?`, say: `¿Cuántos niños prefieren ${f[i][1]}?`, scene: tbl(["Fruta", "Niños"], f.map((x, k) => [x[0] + " " + x[1], v[k]])), ans: v[i], opts: numOpts(v[i], v.filter((_, k) => k !== i), 0), why: `En la fila de ${f[i][1]} dice ${v[i]}.`, hint: "Busca la fila de esa fruta." }; },
  ],
  [
    () => { const f = sample(FR, 4), v = sample([3, 4, 5, 6, 7, 8, 9, 10, 11], 4), t = pick(["tot", "dif"]); const [a, b] = sample([0, 1, 2, 3], 2);
      const ans = t === "tot" ? v.reduce((x, y) => x + y, 0) : Math.abs(v[a] - v[b]);
      return { prompt: t === "tot" ? "¿Cuántos niños votaron en total?" : `¿Cuántos votos de diferencia hay entre <b>${f[a][1].toLowerCase()}</b> y <b>${f[b][1].toLowerCase()}</b>?`, say: t === "tot" ? "¿Cuántos niños votaron en total?" : `¿Cuántos votos de diferencia hay entre ${f[a][1]} y ${f[b][1]}?`, scene: tbl(["Fruta", "Votos"], f.map((x, k) => [x[0] + " " + x[1], v[k]])),
        ans, opts: numOpts(ans, t === "tot" ? [ans - v[0], ans + 1, ans - 1] : [v[a] + v[b], v[a], v[b]], 0), why: t === "tot" ? `${v.join(" + ")} = ${ans}.` : `${Math.max(v[a], v[b])} − ${Math.min(v[a], v[b])} = ${ans}.`, hint: t === "tot" ? "Suma toda la columna." : "Resta el mayor menos el menor." }; },
  ],
  [
    () => { const dep = ["⚽ Fútbol", "🏐 Vóley", "🏀 Básquet"], n = dep.map(() => [between(2, 9), between(2, 9)]), i = rnd(3), g = rnd(2), t = pick(["celda", "fila", "col"]);
      const ans = t === "celda" ? n[i][g] : t === "fila" ? n[i][0] + n[i][1] : n.reduce((s, r) => s + r[g], 0);
      const q = t === "celda" ? `¿Cuántas ${g ? "niñas" : "niños"} prefieren <b>${dep[i].slice(3)}</b>?`.replace("Cuántas niños", "Cuántos niños") : t === "fila" ? `¿Cuántos estudiantes en total prefieren <b>${dep[i].slice(3)}</b>?` : `¿Cuántos${g ? " niñas" : " niños"} hay en total?`.replace("Cuántos niñas", "Cuántas niñas");
      return { prompt: q, say: q.replace(/<[^>]+>/g, ""), scene: tbl(["Deporte", "👦 Niños", "👧 Niñas"], dep.map((d, k) => [d, n[k][0], n[k][1]])), ans, opts: numOpts(ans, [n[i][1 - g], ans + 1, ans - 1].filter(x => x !== ans), 0),
        why: t === "celda" ? `Cruza la fila ${dep[i]} con la columna ${g ? "Niñas" : "Niños"}: ${ans}.` : t === "fila" ? `${n[i][0]} + ${n[i][1]} = ${ans}.` : `${n.map(r => r[g]).join(" + ")} = ${ans}.`, hint: "En una tabla de doble entrada, cruza la fila con la columna." }; },
  ]
];
lesson({ n: 57, title: "Tablas y tablas de doble entrada", short: "Tablas", char: "lula", music: "ukelele", deco: ["📋", "🍎", "⚽", "✅"],
  hello: "¡Hola! Soy <b>Lula</b> 🦊. Las <b>tablas</b> ordenan la información en filas y columnas. ¡Aprendamos a leerlas!",
  levels: LEVELS3(["Leer una tabla", "¿Cuántos prefieren…?"], ["Totales y diferencias", "Sumar y comparar"], ["", "Tablas de doble entrada"]) }, GEN);
