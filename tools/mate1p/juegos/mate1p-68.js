/* Tema 68 · Trazos de figuras (dibujar de un solo trazo) · Kiki */
// figuras: puntos (coordenadas 0..100) y líneas [i, j]
const FIGS = [
  { n: "triángulo", p: [[50, 8], [92, 88], [8, 88]], e: [[0, 1], [1, 2], [2, 0]] },
  { n: "cuadrado", p: [[12, 12], [88, 12], [88, 88], [12, 88]], e: [[0, 1], [1, 2], [2, 3], [3, 0]] },
  { n: "cuadrado con una diagonal", p: [[12, 12], [88, 12], [88, 88], [12, 88]], e: [[0, 1], [1, 2], [2, 3], [3, 0], [0, 2]] },
  { n: "cuadrado con dos diagonales", p: [[12, 12], [88, 12], [88, 88], [12, 88], [50, 50]], e: [[0, 1], [1, 2], [2, 3], [3, 0], [0, 4], [4, 2], [1, 4], [4, 3]] },
  { n: "casita", p: [[15, 45], [85, 45], [85, 92], [15, 92], [50, 8]], e: [[0, 1], [1, 2], [2, 3], [3, 0], [0, 4], [4, 1]] },
  { n: "sobre", p: [[15, 45], [85, 45], [85, 92], [15, 92], [50, 8], [50, 68]], e: [[0, 1], [1, 2], [2, 3], [3, 0], [0, 4], [4, 1], [0, 5], [5, 2], [1, 5], [5, 3]] },
  { n: "dos cuadrados juntos", p: [[6, 25], [50, 25], [94, 25], [94, 75], [50, 75], [6, 75]], e: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [1, 4]] },
  { n: "ventana", p: [[10, 10], [50, 10], [90, 10], [90, 50], [90, 90], [50, 90], [10, 90], [10, 50], [50, 50]], e: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 0], [1, 8], [8, 5], [7, 8], [8, 3]] },
  { n: "moño", p: [[8, 15], [8, 85], [50, 50], [92, 15], [92, 85]], e: [[0, 1], [1, 2], [2, 0], [2, 3], [3, 4], [4, 2]] },
  { n: "cruz", p: [[50, 8], [50, 92], [8, 50], [92, 50], [50, 50]], e: [[0, 4], [4, 1], [2, 4], [4, 3]] },
  { n: "letra T", p: [[8, 12], [50, 12], [92, 12], [50, 92]], e: [[0, 1], [1, 2], [1, 3]] },
  { n: "estrella", p: [[50, 6], [76, 92], [8, 38], [92, 38], [24, 92]], e: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]] },
  { n: "triángulo con su altura", p: [[50, 8], [92, 88], [8, 88], [50, 88]], e: [[0, 1], [1, 3], [3, 2], [2, 0], [0, 3]] },
  { n: "rectángulo con una línea en medio y una diagonal", p: [[10, 15], [50, 15], [90, 15], [90, 85], [50, 85], [10, 85]], e: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [1, 4], [0, 4]] },
];
const deg = f => f.p.map((_, i) => f.e.filter(e => e.includes(i)).length);
const odd = f => deg(f).filter(d => d % 2).length;
const oneStroke = f => odd(f) === 0 || odd(f) === 2;
const strokesMin = f => Math.max(1, odd(f) / 2);
const LETR = "ABCDEFGHI";
function figSvg(f, o = {}) {
  const S = 1.6, X = v => (v * S + 14).toFixed(1);
  let g = f.e.map(([a, b]) => `<line x1="${X(f.p[a][0])}" y1="${X(f.p[a][1])}" x2="${X(f.p[b][0])}" y2="${X(f.p[b][1])}" stroke="#0f172a" stroke-width="5" stroke-linecap="round"/>`).join("");
  g += f.p.map(([x, y], i) => `<circle class="it" data-k="${o.letters ? LETR[i] : "v"}" cx="${X(x)}" cy="${X(y)}" r="7" fill="${o.mark === i ? "#e11d48" : "#2563eb"}" stroke="#fff" stroke-width="2"/>` +
    (o.letters ? `<text x="${+X(x) + (x < 50 ? -15 : 15)}" y="${+X(y) + (y < 50 ? -8 : 20)}" text-anchor="middle" font-size="17" font-weight="900" fill="#7c3aed">${LETR[i]}</text>` : "")).join("");
  return svgWrap(188, 188, g, o.w || 200);
}
const segsOf = f => { const S = 1.6, X = v => v * S + 14; return f.e.map(([a, b]) => [X(f.p[a][0]), X(f.p[a][1]), X(f.p[b][0]), X(f.p[b][1])]); };
const ptsOf = (f, list) => { const S = 1.6, X = v => v * S + 14; return list.map(i => [X(f.p[i][0]), X(f.p[i][1])]); };

const GEN = [
  [ // Básico: contar líneas y puntos
    () => { const f = pick(FIGS), ans = f.e.length;
      return { prompt: `¿Cuántas <b>líneas rectas</b> (de punto a punto) tiene la figura?`, say: "¿Cuántas líneas rectas, de punto a punto, tiene la figura?",
        scene: figSvg(f), ans, opts: numOpts(ans, [ans - 1, ans + 1, f.p.length], 1), why: `Contamos ${ans} líneas.`, hint: "Cuenta cada línea que va de un punto a otro.",
        steps: T => [
          { t: "Una línea va de un punto azul a otro punto azul. Las contamos una por una sin repetir." },
          { t: "Contamos cada línea que une dos puntos azules:", go: T.strokes(T.sc.querySelector("svg"), segsOf(f)) },
          { t: `Tiene <b>${ans}</b> líneas.` }
        ],
        err: w => w === f.p.length ? "Contaste los puntos; piden las líneas." : "" }; },
    () => { const f = pick(FIGS), ans = f.p.length;
      return { prompt: `¿Cuántos <b>puntos</b> azules tiene la figura?`, say: "¿Cuántos puntos azules tiene la figura?",
        scene: figSvg(f), ans, opts: numOpts(ans, [f.e.length, ans + 1, ans - 1], 1), why: `Tiene ${ans} puntos.`, hint: "Cuenta los puntos azules.",
        steps: T => [
          { t: "Los puntos azules son las esquinas y los cruces de la figura." },
          { t: "Contamos los puntos azules:", go: T.count(T.its()) },
          { t: `Tiene <b>${ans}</b> puntos.` }
        ] }; },
    () => { const f = pick(FIGS.filter(x => x.p.length >= 4)), i = rnd(f.p.length), ans = deg(f)[i];
      return { prompt: `¿Cuántas líneas salen del punto <b>rojo</b>?`, say: "¿Cuántas líneas salen del punto rojo?",
        scene: figSvg(f, { mark: i }), ans, opts: numOpts(ans, [ans + 1, ans - 1, ans + 2], 1), why: `Del punto rojo salen ${ans} líneas.`, hint: "Pon el dedo en el punto rojo y cuenta los caminos.",
        steps: T => [
          { t: "Busca el punto rojo y mira cuántos caminos (líneas) salen de él." },
          { t: "Contamos los caminos que salen del punto rojo:", go: T.strokes(T.sc.querySelector("svg"), segsOf({ p: f.p, e: f.e.filter(e => e.includes(i)) })) },
          { t: `Salen <b>${ans}</b> líneas.` }
        ] }; },
  ],
  [ // Intermedio: puntos pares e impares, ¿un solo trazo?
    () => { const f = pick(FIGS), ans = odd(f), D = deg(f), oi = D.map((d, i) => d % 2 ? i : -1).filter(i => i >= 0);
      return { prompt: `Un punto es <b>impar</b> si de él salen 1, 3 o 5 líneas. ¿Cuántos puntos impares tiene la figura?`, say: "Un punto es impar si de él salen una, tres o cinco líneas. ¿Cuántos puntos impares tiene la figura?",
        scene: figSvg(f), ans, opts: numOpts(ans, [f.p.length - ans, ans + 1, ans + 2], 0), why: `Líneas en cada punto: ${D.join(", ")}. Impares: ${ans}.`, hint: "Cuenta cuántas líneas salen de cada punto.",
        steps: T => [
          { t: `Escribimos cuántas líneas salen de cada punto:`, go: T.count(T.its(), { label: (k) => String(D[k - 1]), say: k => String(D[k - 1]) }) },
          { t: ans ? `Los impares son los que tienen ${[...new Set(D.filter(d => d % 2))].join(" o ")} líneas:` : "Ningún punto tiene 1, 3 ni 5 líneas.", go: ans ? T.dots(T.sc.querySelector("svg"), ptsOf(f, oi), { c: "#f59e0b" }) : undefined },
          { t: `Tiene <b>${ans}</b> puntos impares.` }
        ] }; },
    () => { const f = pick(FIGS), ok = oneStroke(f), ans = ok ? "Sí" : "No";
      return { prompt: `¿Se puede dibujar esta figura de <b>un solo trazo</b>, sin levantar el lápiz y sin repetir líneas?`, say: "¿Se puede dibujar esta figura de un solo trazo, sin levantar el lápiz y sin repetir líneas?",
        scene: figSvg(f), ans, opts: ["Sí", "No"], min: 2, cols: 2, why: `Tiene ${odd(f)} puntos impares. ${ok ? "Con 0 o 2 impares sí se puede." : "Con más de 2 impares no se puede."}`, hint: "Cuenta los puntos impares: si son 0 o 2, sí se puede.",
        steps: T => [
          { t: "La regla del lápiz: cuenta los puntos de donde salen 1, 3 o 5 líneas (puntos <b>impares</b>). Si hay <b>0 o 2</b>, sí se puede de un solo trazo." },
          { t: "Líneas en cada punto:", go: T.count(T.its(), { label: k => String(deg(f)[k - 1]), say: k => String(deg(f)[k - 1]) }) },
          { t: `Hay ${odd(f)} puntos impares, así que la respuesta es <b>${ans}</b>.${odd(f) === 2 ? " (Empieza en un punto impar y termina en el otro)." : ""}` }
        ] }; },
    () => { const f = pick(FIGS.filter(x => odd(x) === 2)), D = deg(f), oi = D.map((d, i) => d % 2 ? i : -1).filter(i => i >= 0), ans = 2;
      return { prompt: `Esta figura se dibuja de un solo trazo. ¿En cuántos de sus puntos puedes <b>empezar</b>?`, say: "Esta figura se dibuja de un solo trazo. ¿En cuántos de sus puntos puedes empezar?",
        scene: figSvg(f), ans, opts: numOpts(ans, [1, f.p.length, 3], 1), why: `Solo en los 2 puntos impares: empiezas en uno y terminas en el otro.`, hint: "Busca los puntos con 1, 3 o 5 líneas.",
        steps: T => [
          { t: "Cuando hay 2 puntos impares, el trazo <b>empieza en uno y termina en el otro</b>." },
          { t: "Marcamos los puntos impares:", go: T.dots(T.sc.querySelector("svg"), ptsOf(f, oi), { c: "#f59e0b" }) },
          { t: `Puedes empezar en <b>2</b> puntos.` }
        ] }; },
  ],
  [ // Reto concurso
    () => { const good = pick(FIGS.filter(oneStroke)), bad = shuffle(FIGS.filter(x => !oneStroke(x))).slice(0, 3), all = shuffle([good, ...bad]), ans = LET[all.indexOf(good)];
      return { prompt: `¿Qué figura se puede dibujar de <b>un solo trazo</b>?`, say: "¿Qué figura se puede dibujar de un solo trazo?",
        scene: `<div class="figs4">${all.map((f, i) => `<div class="f4"><b>${LET[i]}</b>${figSvg(f, { w: 120 })}</div>`).join("")}</div>`, ans, opts: [...LET],
        why: `La figura ${ans} tiene ${odd(good)} puntos impares; las otras tienen 4 o más.`, hint: "Busca la figura con 0 o 2 puntos impares.",
        steps: T => [
          { t: "Regla: se puede de un solo trazo si tiene <b>0 o 2</b> puntos impares (con 1, 3 o 5 líneas)." },
          { t: `Puntos impares: ${all.map((f, i) => `${LET[i]} → ${odd(f)}`).join(" · ")}.`, b: BOARD.table([["Figura", "Puntos impares"], ...all.map((f, i) => [LET[i], odd(f)])], { hl: [all.indexOf(good) + 1, 1] }) },
          { t: `La figura <b>${ans}</b> sí se puede.` }
        ] }; },
    () => { const f = pick(FIGS.filter(x => odd(x) >= 4)), ans = strokesMin(f);
      return { prompt: `¿Cuántos trazos <b>como mínimo</b> necesitas para dibujar la figura sin repetir líneas?`, say: "¿Cuántos trazos como mínimo necesitas para dibujar la figura sin repetir líneas?",
        scene: figSvg(f), ans, opts: numOpts(ans, [1, odd(f), ans + 1], 1), why: `Tiene ${odd(f)} puntos impares: ${odd(f)} ÷ 2 = ${ans} trazos.`, hint: "Cada trazo usa 2 puntos impares.",
        steps: T => [
          { t: "Cada trazo empieza y termina en puntos impares: <b>un trazo por cada 2 puntos impares</b>." },
          { t: "Líneas en cada punto:", go: T.count(T.its(), { label: k => String(deg(f)[k - 1]), say: k => String(deg(f)[k - 1]) }) },
          { t: `Hay ${odd(f)} impares: ${odd(f)} ÷ 2 = <b>${ans}</b> trazos.` }
        ],
        err: w => w === 1 ? "Con más de 2 puntos impares no alcanza un trazo." : w === odd(f) ? "Cada trazo usa dos puntos impares." : "" }; },
    () => { const f = pick(FIGS), ans = deg(f).reduce((a, b) => a + b, 0);
      return { prompt: `Suma las líneas que salen de <b>cada</b> punto. ¿Cuánto da?`, say: "Suma las líneas que salen de cada punto. ¿Cuánto da?",
        scene: figSvg(f), ans, opts: numOpts(ans, [f.e.length, ans + 1, ans - 2], 1), why: `${deg(f).join(" + ")} = ${ans}. ¡Siempre es el doble de las líneas (${f.e.length} × 2)!`, hint: "Escribe cuántas líneas salen de cada punto y súmalas.",
        steps: T => [
          { t: "Líneas en cada punto:", go: T.count(T.its(), { label: k => String(deg(f)[k - 1]), say: k => String(deg(f)[k - 1]) }) },
          { t: `Sumamos: ${deg(f).join(" + ")} = <b>${ans}</b>.` },
          { t: `Truco: cada línea toca 2 puntos, así que la suma es ${f.e.length} × 2 = ${ans}.` }
        ],
        err: w => w === f.e.length ? "Esas son las líneas; cada línea se cuenta en sus dos puntas." : "" }; },
  ]
];
lesson({ n: 68, next: 50, title: "Trazos de figuras (un solo trazo)", short: "Trazos", char: "kiki", music: "electro", deco: ["✏️", "⭐", "🏠", "✉️"],
  hello: "¡Hola! Soy <b>Kiki</b>. ¿Puedes dibujar una figura <b>sin levantar el lápiz</b> y sin pasar dos veces por la misma línea? El secreto: cuenta las líneas que salen de cada punto. Si hay <b>0 o 2</b> puntos impares, ¡sí se puede!",
  levels: LEVELS3(["Líneas y puntos", "¿Cuántas líneas? ¿Cuántos puntos?"], ["Puntos pares e impares", "¿Un solo trazo?"], ["", "¿Cuál figura? · trazos mínimos"]) }, GEN);
