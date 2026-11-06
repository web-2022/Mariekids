/* Tema 56 · Monedas, precios, compras y vuelto · Coco */
const ITEMS = [["⚽", "pelota"], ["🧸", "osito"], ["🚗", "carrito"], ["🛼", "patines"], ["🎒", "mochila"], ["📚", "libro"]];
const tag = (e, p) => `<span class="price">${e}<small>S/ ${p}</small></span>`;
const GEN = [
  [
    () => { const cs = Array.from({ length: between(2, 4) }, () => pick([1, 2, 5])), ans = cs.reduce((a, b) => a + b, 0);
      return { prompt: "¿Cuánto dinero hay?", say: "¿Cuánto dinero hay en total?", scene: `<div class="line">${cs.map(coin).join("")}</div>`, ans, opts: numOpts(ans, [cs.length, ans + 1, ans - 1], 1), why: `${cs.join(" + ")} = S/ ${ans}.`, hint: "Suma el valor de cada moneda." }; },
  ],
  [
    () => { const [a, b] = sample(ITEMS, 2), pa = between(3, 15), pb = between(3, 15), ans = pa + pb;
      return { prompt: `Compro ${a[0]} y ${b[0]}. ¿Cuánto pago en total?`, say: `Compro ${a[1]} y ${b[1]}. ¿Cuánto pago?`, scene: tag(a[0], pa) + tag(b[0], pb), ans, opts: numOpts(ans, [Math.abs(pa - pb), ans + 1, ans + 10], 0), why: `S/ ${pa} + S/ ${pb} = S/ ${ans}.`, hint: "Suma los dos precios." }; },
    () => { const bs = [pick([10, 20]), pick([10, 20, 50])], c = between(0, 3), ans = bs[0] + bs[1] + 2 * c;
      return { prompt: "¿Cuánto dinero hay en total?", say: "¿Cuánto dinero hay en billetes y monedas?", scene: `<div class="line">${bs.map(bill).join("")}${Array(c).fill(coin(2)).join("")}</div>`, ans, opts: numOpts(ans, [bs[0] + bs[1], ans + 10, ans - 2], 0), why: `S/ ${ans}.`, hint: "Primero los billetes, luego las monedas." }; },
  ],
  [
    () => { const its = sample(ITEMS, 4), ps = sample([40, 55, 68, 80, 89, 90, 75, 62], 4), mn = Math.min(...ps), mx = Math.max(...ps), pay = 200, ans = pay - mn - mx;
      return { prompt: "Patrick compra el juguete <b>más barato</b> y el <b>más caro</b>. Si paga con un billete de <b>S/ 200</b>, ¿cuánto recibe de vuelto?", say: "Compra el más barato y el más caro y paga con 200 soles. ¿Cuánto recibe de vuelto?", scene: its.map((x, i) => tag(x[0], ps[i])).join(""), ans, opts: numOpts(ans, [mn + mx, ans + 10, ans - 10], 0),
        why: `${mn} + ${mx} = ${mn + mx}. Vuelto: 200 − ${mn + mx} = ${ans}.`, hint: "Primero suma lo que gastó; después resta de 200." }; },
    () => { const e = between(5, 9), r = between(2, 5), t = between(6, 12), ne = 2, nr = 1, nt = 3, ans = ne * e + nr * r + nt * t;
      return { prompt: `Una escoba cuesta S/ ${e}, un recogedor S/ ${r} y un tacho S/ ${t}. Si compramos <b>dos escobas, un recogedor y 3 tachos</b>, ¿cuánto pagamos?`, say: "¿Cuánto pagamos por dos escobas, un recogedor y tres tachos?", scene: tag("🧹", e) + tag("🧺", r) + tag("🗑️", t), ans, opts: numOpts(ans, [e + r + t, ans - t, ans + e], 0),
        why: `2 × ${e} + ${r} + 3 × ${t} = ${2 * e} + ${r} + ${3 * t} = ${ans}.`, hint: "Calcula cada producto y suma todo." }; },
    () => { const g = between(21, 49), ans = 100 - g;
      return { prompt: `Miguel va a los juegos con <b>dos billetes de S/ 50</b>. Si en total gastó <b>S/ ${g}</b>, ¿con cuánto dinero regresa a su casa?`, say: `Tiene dos billetes de 50 soles y gastó ${g}. ¿Con cuánto regresa?`, scene: bill(50) + bill(50), ans, opts: numOpts(ans, [50 - g > 0 ? 50 - g : ans + 10, g, ans - 10], 0), why: `50 + 50 = 100. 100 − ${g} = ${ans}.`, hint: "Primero junta lo que tenía." }; },
  ]
];
lesson({ n: 56, title: "Monedas, precios, compras y vuelto", short: "Dinero", char: "coco", music: "funk", deco: ["🪙", "💵", "🛒", "🏷️"],
  hello: "¡Hola! Soy <b>Coco</b> 🐵. Vamos de compras: contamos <b>monedas</b>, sumamos <b>precios</b> y calculamos el <b>vuelto</b>.",
  levels: LEVELS3(["Monedas", "¿Cuánto dinero hay?"], ["Compras", "Precios y billetes"], ["", "Vuelto y compras grandes"]) }, GEN);
