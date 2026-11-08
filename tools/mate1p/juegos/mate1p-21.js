/* Tema 21 · Restas con objetos y dibujos · Coco */
const EMO = ["🎈", "🍎", "🐟", "🍪", "⭐", "🧁", "🌸"];
const tached = (e, n, q) => `<div class="line">${Array.from({ length: n }, (_, i) => i < n - q ? `<span class="it" data-k="K">${e}</span>` : `<span class="it" data-k="X" style="position:relative;display:inline-block">${e}<span style="position:absolute;inset:0;display:grid;place-items:center;font-size:.9em">❌</span></span>`).join("")}</div>`;
const GEN = [
  [
    () => { const e = pick(EMO), n = between(4, 10), q = between(1, n - 1), ans = n - q;
      return { prompt: "Quitamos los que tienen ❌. ¿Cuántos <b>quedan</b>?", say: "Quitamos los que tienen una equis. ¿Cuántos quedan?", scene: tached(e, n, q), ans, opts: numOpts(ans, [n, q, n + q], 0), why: `${n} − ${q} = ${ans}.`, hint: "Cuenta solo los que NO tienen ❌.",
        steps: T => [
          { t: `<b>Restar</b> es <b>quitar</b>. Los que tienen ❌ ya no están: los apagamos.`, go: d => { T.dim(T.of("X")); setTimeout(d, 700); } },
          { t: `Contamos los que <b>quedan</b>:`, go: T.count(T.of("K")) },
          { t: `${n} − ${q} = <b>${ans}</b>.`, b: BOARD.jumps(n, Array(q).fill(-1), { step: .35 }) }
        ],
        err: w => w === n ? "Contaste todos, también los quitados." : w === q ? "Contaste los que se quitaron; piden los que quedan." : "" }; },
  ],
  [
    () => { const e = pick(["🎈", "🍪", "🍎"]), n = between(6, 15), q = between(2, n - 2), ans = n - q, verb = { "🎈": "se reventaron", "🍪": "se comió", "🍎": "regaló" }[e], nom = { "🎈": "globos", "🍪": "galletas", "🍎": "manzanas" }[e];
      return { prompt: `Mía tenía <b>${n}</b> ${nom} ${e}. ${e === "🎈" ? `Se reventaron <b>${q}</b>` : `${verb[0].toUpperCase() + verb.slice(1)} <b>${q}</b>`}. ¿Cuántos le quedan?`, say: `Mía tenía ${n} ${nom}. ${e === "🎈" ? "Se reventaron" : verb} ${q}. ¿Cuántos le quedan?`, scene: tached(e, n, q), ans, opts: numOpts(ans, [n + q, q, ans + 1], 0),
        why: `${n} − ${q} = ${ans}.`, hint: "«Quedan» significa restar.",
        steps: T => [
          { t: `Mía tenía ${n}. La palabra <b>«quedan»</b> nos dice que hay que <b>quitar</b>: restar.` },
          { t: `Quitamos los ${q} que ya no están y contamos los que quedan:`, go: d => { T.dim(T.of("X")); T.count(T.of("K"))(d); } },
          { t: `${n} − ${q} = <b>${ans}</b>.`, b: BOARD.jumps(n, Array(q).fill(-1), { step: .35 }) }
        ],
        err: w => w === n + q ? "Sumaste; pero si se van, hay que restar." : "" }; },
  ],
  [
    () => { const n = between(12, 20), a = between(2, 6), b = between(2, 5), ans = n - a - b;
      return { prompt: `En un árbol había <b>${n}</b> pajaritos. Primero se fueron volando <b>${a}</b> y luego <b>${b}</b> más. ¿Cuántos quedan en el árbol?`, say: `Había ${n} pajaritos. Se fueron ${a} y luego ${b} más. ¿Cuántos quedan?`, scene: line(["🌳", ...em("🐦", 5)]), ans, opts: numOpts(ans, [n - a, n - b, a + b], 0),
        why: `${n} − ${a} = ${n - a}; ${n - a} − ${b} = ${ans}.`, hint: "Resta en dos pasos.",
        steps: T => [
          { t: `Había ${n} pajaritos. Se van en <b>dos</b> momentos: primero ${a} y después ${b}. Restamos en dos pasos.` },
          { t: `Primero se van ${a}: ${n} − ${a} = <b>${n - a}</b>.`, b: BOARD.jumps(n, Array(a).fill(-1), { step: .3 }) },
          { t: `Luego se van ${b} más: ${n - a} − ${b} = <b>${ans}</b>.`, b: BOARD.lines([`${n} − ${a} = ${n - a}`, `${n - a} − ${b} = ${ans}`]) }
        ],
        err: w => w === n - a ? `Te faltó quitar los ${b} que se fueron después.` : w === a + b ? "Esos son los que se fueron; piden los que quedan." : "" }; },
    () => { const v = between(2, 5), q = between(2, 4), ans = q;
      return { prompt: "¿Cuántos pajaritos <b>no</b> están volando?", say: "¿Cuántos pajaritos no están volando?", scene: `<div class="line">${em("<span class='it' data-k='V'>🕊️</span>", v).join("")}</div><div class="line">🌳${em("<span class='it' data-k='P'>🐦</span>", q).join("")}</div><div class="legend">Arriba vuelan · abajo están parados</div>`, ans, opts: numOpts(ans, [v, v + q, ans + 1], 0),
        why: `Volando hay ${v}; parados hay ${q}.`, hint: "Cuenta solo los que están parados.",
        steps: T => [
          { t: `Los pajaritos de <b>arriba</b> vuelan. Los que están <b>en el árbol</b> están parados (no vuelan).` },
          { t: `Apagamos los que vuelan y contamos los parados:`, go: d => { T.dim(T.of("V")); T.count(T.of("P"))(d); } },
          { t: `No están volando <b>${ans}</b> pajaritos.` }
        ],
        err: w => w === v ? "Esos son los que vuelan." : w === v + q ? "Contaste todos." : "" }; },
  ]
];
lesson({ n: 21, title: "Restas con objetos y dibujos", short: "Restar con dibujos", char: "coco", music: "funk", deco: ["➖", "🎈", "❌", "🍪"],
  hello: "¡Hola! Soy <b>Coco</b> 🐵. <b>Restar</b> es quitar. ¡Vamos a ver cuántos quedan!",
  levels: LEVELS3(["Quitar", "Tachamos y contamos"], ["Cuentos de restar", "¿Cuántos quedan?"], ["", "Restas en dos pasos"]) }, GEN);
