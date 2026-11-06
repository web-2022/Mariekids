/* Tema 7 · Comparación de cantidades · Pipo */
const EMO = ["🍎", "⭐", "🐟", "⚽", "🌸", "🍓", "🎈", "🍭"];
const NIN = ["Lucía", "Camilo", "Adriano", "Sofía", "Mateo", "Valeria"];
const GEN = [
  [
    () => { const [a, b] = sample(EMO, 2), x = between(2, 9), y = pick([x, ...[between(2, 9), between(2, 9)].filter(v => v !== x)]), ans = x > y ? "Arriba" : x < y ? "Abajo" : "Hay igual";
      return { prompt: "¿Dónde hay <b>más</b>?", say: "¿Dónde hay más, arriba o abajo?", scene: line(em(a, x)) + `<hr>` + line(em(b, y)), ans, opts: ["Arriba", "Abajo", "Hay igual"], cols: 3,
        why: `Arriba hay ${x} y abajo hay ${y}.`, hint: "Une uno de arriba con uno de abajo. ¿Dónde sobran?" }; },
  ],
  [
    () => { const [a, b] = sample(EMO, 2), x = between(6, 10), y = between(2, x - 1), t = rnd(2), ans = x - y;
      return { prompt: t ? "¿Cuántos <b>más</b> hay arriba que abajo?" : "¿Cuántos hay que <b>agregar abajo</b> para que haya igual?", say: t ? "¿Cuántos más hay arriba que abajo?" : "¿Cuántos hay que agregar abajo para que haya la misma cantidad?",
        scene: line(em(a, x)) + `<hr>` + line(em(b, y)), ans, opts: numOpts(ans, [x, y, x + y], 1), why: `${x} − ${y} = ${ans}.`, hint: "Une cada uno de arriba con uno de abajo: los que sobran son la diferencia." }; },
  ],
  [
    () => { const ks = sample(NIN, 3), n = sample([2, 3, 4, 5, 6, 7], 3), e = pick(["🍭", "🎈", "⚽"]), ord = [0, 1, 2].sort((i, j) => n[j] - n[i]), asc = rnd(2) === 0;
      const fmt = o => (asc ? [...o].reverse() : o).map(i => ks[i]).join(asc ? " < " : " > "); const ans = fmt(ord);
      const perms = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]].map(fmt);
      return { prompt: `Ordena de <b>${asc ? "menor a mayor" : "mayor a menor"}</b> según la cantidad de ${e}.`, say: `Ordena de ${asc ? "menor a mayor" : "mayor a menor"} según la cantidad.`,
        scene: ks.map((k, i) => `<div class="line small" style="justify-content:flex-start"><b style="min-width:80px;font-size:16px">${k}</b>${em(e, n[i]).join("")}</div>`).join(""),
        ans, opts: shuffle([ans, ...sample(perms.filter(p => p !== ans), 3)]), cols: 1, cls: "grp", why: ks.map((k, i) => `${k}: ${n[i]}`).join(" · "), hint: "Cuenta lo de cada niño y luego ordena." }; },
  ]
];
lesson({ n: 7, title: "Comparación de cantidades", short: "Comparar", char: "pipo", music: "calma", deco: ["⚖️", "🍎", "⭐", "🎈"],
  hello: "¡Hola! Soy <b>Pipo</b> 🐧. ¿Dónde hay <b>más</b>? ¿Dónde hay <b>menos</b>? ¡Vamos a comparar!",
  levels: LEVELS3(["¿Dónde hay más?", "Arriba, abajo o igual"], ["¿Cuántos más?", "Diferencia y agregar para igualar"], ["", "Ordenar según la cantidad"]) }, GEN);
