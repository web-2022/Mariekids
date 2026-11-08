/* Tema 56 · Monedas, precios, compras y vuelto · Coco */
const ITEMS = [["⚽", "pelota"], ["🧸", "osito"], ["🚗", "carrito"], ["🛼", "patines"], ["🎒", "mochila"], ["📚", "libro"]];
const tag = (e, p) => `<span class="price">${e}<small>S/ ${p}</small></span>`;
const GEN = [
  [
    () => { const cs = Array.from({ length: between(2, 4) }, () => pick([1, 2, 5])), ans = cs.reduce((a, b) => a + b, 0);
      return { prompt: "¿Cuánto dinero hay?", say: "¿Cuánto dinero hay en total?", scene: `<div class="line">${cs.map(coin).join("")}</div>`, ans, opts: numOpts(ans, [cs.length, ans + 1, ans - 1], 1), why: `${cs.join(" + ")} = S/ ${ans}.`, hint: "Suma el valor de cada moneda.",
        steps: T => { const cn = T.its(".coin"), acc = cs.map((_, i) => cs.slice(0, i + 1).reduce((p, q) => p + q, 0));
          return [
            { t: `Cada moneda tiene su valor escrito: S/ 1, S/ 2 o S/ 5. No contamos monedas: sumamos su <b>valor</b>.` },
            { t: `Vamos sumando moneda por moneda:`, go: T.count(cn, { label: k => "S/" + acc[k - 1], say: k => acc[k - 1] + " soles", cls: "t-big", ms: 1100 }) },
            { t: `${cs.join(" + ")} = <b>S/ ${ans}</b>.` }
          ]; },
        err: w => w === cs.length ? "Contaste las monedas; hay que sumar lo que vale cada una." : "" }; },
  ],
  [
    () => { const [a, b] = sample(ITEMS, 2), pa = between(3, 15), pb = between(3, 15), ans = pa + pb;
      return { prompt: `Compro ${a[0]} y ${b[0]}. ¿Cuánto pago en total?`, say: `Compro ${a[1]} y ${b[1]}. ¿Cuánto pago?`, scene: tag(a[0], pa) + tag(b[0], pb), ans, opts: numOpts(ans, [Math.abs(pa - pb), ans + 1, ans + 10], 0), why: `S/ ${pa} + S/ ${pb} = S/ ${ans}.`, hint: "Suma los dos precios.",
        steps: T => [
          { t: `«En total» → sumamos los dos precios: S/ ${pa} y S/ ${pb}.` },
          { t: `Sumamos:`, b: BOARD.op([pa, pb]) },
          { t: `Pago <b>S/ ${ans}</b>.` }
        ],
        err: w => w === Math.abs(pa - pb) ? "Restaste; para pagar todo se suma." : "" }; },
    () => { const bs = [pick([10, 20]), pick([10, 20, 50])], c = between(0, 3), ans = bs[0] + bs[1] + 2 * c;
      return { prompt: "¿Cuánto dinero hay en total?", say: "¿Cuánto dinero hay en billetes y monedas?", scene: `<div class="line">${bs.map(bill).join("")}${Array(c).fill(coin(2)).join("")}</div>`, ans, opts: numOpts(ans, [bs[0] + bs[1], ans + 10, ans - 2], 0), why: `S/ ${ans}.`, hint: "Primero los billetes, luego las monedas.",
        steps: T => [
          { t: `Primero sumamos los <b>billetes</b>: S/ ${bs[0]} + S/ ${bs[1]} = S/ ${bs[0] + bs[1]}.`, go: T.count(T.its(".bill"), { label: k => "S/" + bs.slice(0, k).reduce((p, q) => p + q, 0), say: k => bs.slice(0, k).reduce((p, q) => p + q, 0) + " soles", cls: "t-big", ms: 1100 }) },
          c ? { t: `Después las <b>monedas</b> de S/ 2: ${Array(c).fill(2).join(" + ")} = S/ ${2 * c}.`, go: T.count(T.its(".coin"), { label: k => "S/" + (bs[0] + bs[1] + 2 * k), say: k => (bs[0] + bs[1] + 2 * k) + " soles", cls: "t-big", ms: 1000 }) } : { t: `No hay monedas.` },
          { t: `En total hay <b>S/ ${ans}</b>.` }
        ],
        err: w => w === bs[0] + bs[1] ? "Te faltaron las monedas." : "" }; },
  ],
  [
    () => { const its = sample(ITEMS, 4), ps = sample([40, 55, 68, 80, 89, 90, 75, 62], 4), mn = Math.min(...ps), mx = Math.max(...ps), pay = 200, ans = pay - mn - mx;
      return { prompt: "Patrick compra el juguete <b>más barato</b> y el <b>más caro</b>. Si paga con un billete de <b>S/ 200</b>, ¿cuánto recibe de vuelto?", say: "Compra el más barato y el más caro y paga con 200 soles. ¿Cuánto recibe de vuelto?", scene: its.map((x, i) => tag(x[0], ps[i])).join(""), ans, opts: numOpts(ans, [mn + mx, ans + 10, ans - 10], 0),
        why: `${mn} + ${mx} = ${mn + mx}. Vuelto: 200 − ${mn + mx} = ${ans}.`, hint: "Primero suma lo que gastó; después resta de 200.",
        steps: T => [
          { t: `Buscamos el juguete más barato (S/ <b>${mn}</b>) y el más caro (S/ <b>${mx}</b>).`, b: BOARD.lines([`más barato: S/ ${mn}`, `más caro: S/ ${mx}`]) },
          { t: `Gasta ${mn} + ${mx} = S/ ${mn + mx}.`, b: BOARD.op([mn, mx]) },
          { t: `Vuelto: lo que dio menos lo que gastó: 200 − ${mn + mx} = <b>S/ ${ans}</b>.`, b: BOARD.op([200, mn + mx], "-") }
        ],
        err: w => w === mn + mx ? "Eso es lo que gastó; el vuelto es lo que le devuelven de los S/ 200." : "" }; },
    () => { const e = between(5, 9), r = between(2, 5), t = between(6, 12), ne = 2, nr = 1, nt = 3, ans = ne * e + nr * r + nt * t;
      return { prompt: `Una escoba cuesta S/ ${e}, un recogedor S/ ${r} y un tacho S/ ${t}. Si compramos <b>dos escobas, un recogedor y 3 tachos</b>, ¿cuánto pagamos?`, say: "¿Cuánto pagamos por dos escobas, un recogedor y tres tachos?", scene: tag("🧹", e) + tag("🧺", r) + tag("🗑️", t), ans, opts: numOpts(ans, [e + r + t, ans - t, ans + e], 0),
        why: `2 × ${e} + ${r} + 3 × ${t} = ${2 * e} + ${r} + ${3 * t} = ${ans}.`, hint: "Calcula cada producto y suma todo.",
        steps: T => [
          { t: `Calculamos cada producto: 2 escobas = ${e} + ${e} = ${2 * e}; 1 recogedor = ${r}; 3 tachos = ${t} + ${t} + ${t} = ${3 * t}.`, b: BOARD.lines([`🧹 2 × ${e} = ${2 * e}`, `🧺 1 × ${r} = ${r}`, `🗑️ 3 × ${t} = ${3 * t}`], { step: .8 }) },
          { t: `Ahora sumamos todo:`, bAdd: BOARD.lines([`${2 * e} + ${r} + ${3 * t} = ${ans}`]) },
          { t: `Pagamos <b>S/ ${ans}</b>.` }
        ],
        err: w => w === e + r + t ? "Sumaste un solo producto de cada uno; hay que contar 2 escobas y 3 tachos." : "" }; },
    () => { const g = between(21, 49), ans = 100 - g;
      return { prompt: `Miguel va a los juegos con <b>dos billetes de S/ 50</b>. Si en total gastó <b>S/ ${g}</b>, ¿con cuánto dinero regresa a su casa?`, say: `Tiene dos billetes de 50 soles y gastó ${g}. ¿Con cuánto regresa?`, scene: bill(50) + bill(50), ans, opts: numOpts(ans, [50 - g > 0 ? 50 - g : ans + 10, g, ans - 10], 0), why: `50 + 50 = 100. 100 − ${g} = ${ans}.`, hint: "Primero junta lo que tenía.",
        steps: T => [
          { t: `Primero juntamos lo que tenía: 50 + 50 = <b>S/ 100</b>.` },
          { t: `Le quitamos lo que gastó: 100 − ${g}. Completamos desde ${g} hasta 100:`, b: BOARD.jumps(g, saltosHasta(g, 100), { step: .4 }) },
          { t: `100 − ${g} = <b>S/ ${ans}</b>. Regresa con S/ ${ans}.` }
        ],
        err: w => w === g ? "Eso es lo que gastó; piden lo que le queda." : "" }; },
  ]
];
lesson({ n: 56, title: "Monedas, precios, compras y vuelto", short: "Dinero", char: "coco", music: "funk", deco: ["🪙", "💵", "🛒", "🏷️"],
  hello: "¡Hola! Soy <b>Coco</b> 🐵. Vamos de compras: contamos <b>monedas</b>, sumamos <b>precios</b> y calculamos el <b>vuelto</b>.",
  levels: LEVELS3(["Monedas", "¿Cuánto dinero hay?"], ["Compras", "Precios y billetes"], ["", "Vuelto y compras grandes"]) }, GEN);
