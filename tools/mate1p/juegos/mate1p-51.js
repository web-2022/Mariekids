/* Tema 51 · Vistas, desarrollos, giros y percepción espacial · Lula */
const ROT = ["⬆️", "↗️", "➡️", "↘️", "⬇️", "↙️", "⬅️", "↖️"];
const net = cells => { const s = 18, W = 5 * s + 4, Hh = 4 * s + 4; return svgWrap(W, Hh, cells.map(([x, y]) => `<rect x="${2 + x * s}" y="${2 + y * s}" width="${s}" height="${s}" fill="#bae6fd" stroke="#0f172a" stroke-width="2"/>`).join(""), 92); };
const OK = [[[1, 0], [0, 1], [1, 1], [2, 1], [3, 1], [1, 2]], [[0, 0], [0, 1], [1, 1], [2, 1], [3, 1], [3, 2]], [[1, 0], [1, 1], [0, 1], [2, 1], [1, 2], [1, 3]], [[0, 0], [1, 0], [1, 1], [2, 1], [3, 1], [2, 2]]];
const BAD = [[[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1]], [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [1, 1]], [[0, 0], [1, 0], [0, 1], [1, 1], [2, 1], [3, 1]], [[0, 1], [1, 1], [2, 1], [3, 1], [1, 0], [2, 0]]];
const GEN = [
  [
    () => { const i = rnd(8), t = pick([[2, "un cuarto de vuelta ↻"], [4, "media vuelta"], [6, "un cuarto de vuelta ↺"]]), ans = ROT[(i + t[0]) % 8];
      return { prompt: `Si la flecha da <b>${t[1]}</b>, ¿cómo queda?`, say: `Si la flecha da ${t[1].replace(/[↻↺]/g, "")}, ¿cómo queda?`, scene: `<div class="big-num">${ROT[i]}</div>`, ans, opts: shuffle([ans, ...sample(ROT.filter(x => x !== ans), 3)]), cols: 4, why: `Queda así: ${ans}.`, hint: "Gira tu dedo como la flecha.",
        steps: T => { const st = t[0] / 2, dirs = Array.from({ length: st + 1 }, (_, j) => ROT[(i + (t[0] === 6 ? -2 : 2) * j % 8 + 8) % 8]);
          const seq = t[0] === 6 ? [ROT[i], ROT[(i + 6) % 8]] : t[0] === 2 ? [ROT[i], ROT[(i + 2) % 8]] : [ROT[i], ROT[(i + 2) % 8], ROT[(i + 4) % 8]];
          return [
            { t: `Un <b>cuarto de vuelta</b> es girar como de las 12 a las 3 en el reloj. <b>Media vuelta</b> son dos cuartos: la flecha apunta al lado contrario.` },
            { t: `Giramos la flecha paso a paso:`, b: BOARD.seq(seq, { diffs: Array(seq.length - 1).fill(null) }) },
            { t: `Queda así: <b>${ans}</b>.` }
          ]; } }; },
  ],
  [
    () => { const ok = pick(OK), ans = net(ok);
      return { prompt: "¿Cuál de estos desarrollos se puede doblar para formar un <b>cubo</b>?", say: "¿Cuál de estos desarrollos forma un cubo al doblarlo?", scene: line(["🎲"]), ans, opts: shuffle([ans, ...sample(BAD, 3).map(net)]), cols: 2, why: "Ese desarrollo tiene las 6 caras sin que se encimen al doblar.", hint: "Imagina que doblas el papel: ¿alguna cara queda encima de otra?",
        steps: T => [
          { t: `Un cubo tiene <b>6 caras</b>. Al doblar el desarrollo, ninguna cara puede quedar encima de otra y no puede faltar ninguna.` },
          { t: `Truco: si hay <b>4 cuadrados en fila</b>, uno arriba y uno abajo de esa fila (no los dos del mismo lado), sí forma un cubo. Si hay bloques de 2 × 2 o 5 en fila, no.` },
          { t: `Este es el que sí se dobla en un cubo: 4 caras en fila y una arriba y otra abajo de esa fila. ¡Búscalo entre las respuestas!`, b: BOARD.big(ans) }
        ],
        ansTxt: null }; },
    () => { const q = pick([["¿Cuántas caras tiene un cubo?", 6], ["¿Cuántas esquinas (vértices) tiene un cubo?", 8], ["¿Cuántas aristas (bordes) tiene un cubo?", 12]]);
      return { prompt: q[0], say: q[0], scene: line(["🎲", "🧊"]), ans: q[1], opts: [4, 6, 8, 12], cols: 4, why: `Un cubo tiene 6 caras, 8 vértices y 12 aristas.`, hint: "Mira un dado y cuenta.",
        steps: T => [
          { t: `Miramos un dado 🎲: tiene caras (los cuadrados planos), vértices (las puntas) y aristas (los bordes donde se juntan dos caras).` },
          { t: `Contamos: caras = arriba, abajo, adelante, atrás, izquierda y derecha = <b>6</b>. Vértices = 4 arriba + 4 abajo = <b>8</b>. Aristas = 4 arriba + 4 abajo + 4 paradas = <b>12</b>.`, b: BOARD.table([["caras", "vértices", "aristas"], [6, 8, 12]]) },
          { t: `La respuesta es <b>${q[1]}</b>.` }
        ] }; },
  ],
  [
    () => { const H = Array.from({ length: 2 }, () => Array.from({ length: between(2, 3) }, () => rnd(3))); if (!H.flat().some(Boolean)) H[0][0] = 1;
      const ans = H.flat().filter(Boolean).length, tot = H.flat().reduce((a, b) => a + b, 0);
      return { prompt: "Si miras la construcción <b>desde arriba</b>, ¿cuántos cuadraditos ves?", say: "Si miras desde arriba, ¿cuántos cuadraditos ves?", scene: isoCubes(H.map(r => r.map(v => v))), ans, opts: numOpts(ans, [tot, ans + 1, ans - 1], 1), why: `Desde arriba se ve un cuadradito por cada torre: ${ans}.`, hint: "Desde arriba, cada torre se ve como un solo cuadrado.",
        steps: T => { const tp = isoTops(H);
          return [
            { t: `Desde arriba, cada torre se ve como <b>un solo cuadradito</b>, aunque tenga varios cubos.` },
            { t: `Marcamos el techo de cada torre:`, go: T.dots(T.sc.querySelector("svg"), tp.map(p => [p.x, p.y])) },
            { t: `Hay ${ans} torres: desde arriba se ven <b>${ans}</b> cuadraditos.` }
          ]; },
        err: w => w === tot ? "Contaste todos los cubos; desde arriba solo se ven los techos." : "" }; },
    () => { const L = "bdpq", c = L[rnd(4)], ans = { b: "d", d: "b", p: "q", q: "p" }[c];
      return { prompt: `¿Cómo se ve la letra <b>${c}</b> en un <b>espejo</b> puesto a su lado?`, say: "¿Cómo se ve esta letra en un espejo?", scene: `<div class="big-num">${c} | 🪞</div>`, ans, opts: ["b", "d", "p", "q"], cols: 4, why: `En el espejo, ${c} se ve como ${ans}.`, hint: "El espejo cambia la izquierda por la derecha.",
        steps: T => [
          { t: `El espejo cambia la <b>izquierda</b> por la <b>derecha</b>, pero lo de arriba sigue arriba.` },
          { t: `La «${c}» tiene la pancita a la ${"bp".includes(c) ? "derecha" : "izquierda"}. En el espejo, la pancita pasa a la ${"bp".includes(c) ? "izquierda" : "derecha"}.`, b: BOARD.lines([`${c}  →  🪞  →  <span style="display:inline-block;transform:scaleX(-1)">${c}</span>`]) },
          { t: `Se ve como <b>${ans}</b>.` }
        ] }; },
  ]
];
lesson({ n: 51, title: "Vistas, desarrollos, giros y percepción espacial", short: "Giros y vistas", char: "lula", music: "espacial", deco: ["🔄", "🎲", "🪞", "⬆️"],
  hello: "¡Hola! Soy <b>Lula</b> 🦊. Vamos a <b>girar</b> figuras, <b>armar</b> cubos con papel y mirar desde <b>arriba</b>.",
  levels: LEVELS3(["Giros", "¿Cómo queda la flecha?"], ["Desarrollos del cubo", "Doblar y armar"], ["", "Vistas y espejos"]) }, GEN);
