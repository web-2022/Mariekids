/* Tema 63 · Medida de segmentos · Pipo */
// segmento con medidas: pts = ["A","B","C"], parts = medidas de cada tramo (número o "?"),
// tot = medida total debajo (número, "?" o null)
function segLab(pts, parts, tot, sub) {
  const W = 330, L = 22, R = W - 22, n = parts.length;
  const w = parts.map(p => typeof p === "number" ? Math.max(p, 8) : 16), sw = w.reduce((a, b) => a + b, 0);
  const xs = [L]; w.forEach(v => xs.push(xs[xs.length - 1] + (R - L) * v / sw));
  let g = `<line x1="${L}" y1="52" x2="${R}" y2="52" stroke="#0f172a" stroke-width="3"/>`;
  if (sub) parts = parts.map((p, i) => i >= sub[0] && i < sub[1] ? null : p);
  const arc = (x1, x2, p) => { const m = (x1 + x2) / 2, q = p === "?";
    return `<path d="M${x1 + 3} 40 Q${m} 22 ${x2 - 3} 40" fill="none" stroke="${q ? "#e11d48" : "#2563eb"}" stroke-width="2"/>` +
      `<text x="${m}" y="22" text-anchor="middle" font-size="17" font-weight="900" fill="${q ? "#e11d48" : "#1e3a8a"}">${p}</text>`; };
  if (sub) g += arc(xs[sub[0]], xs[sub[1]], sub[2]);
  parts.forEach((p, i) => { if (p === null) return; const m = (xs[i] + xs[i + 1]) / 2, q = p === "?";
    g += `<path d="M${xs[i] + 3} 40 Q${m} 22 ${xs[i + 1] - 3} 40" fill="none" stroke="${q ? "#e11d48" : "#2563eb"}" stroke-width="2"/>`;
    g += `<text x="${m}" y="22" text-anchor="middle" font-size="17" font-weight="900" fill="${q ? "#e11d48" : "#1e3a8a"}">${p}</text>`; });
  xs.forEach((x, i) => { g += `<circle cx="${x}" cy="52" r="5.5" fill="#0f172a"/><text x="${x}" y="78" text-anchor="middle" font-size="16" font-weight="900">${pts[i]}</text>`; });
  let H = 88;
  if (tot != null) { const q = tot === "?";
    g += `<path d="M${L} 90 L${L} 98 L${R} 98 L${R} 90" fill="none" stroke="${q ? "#e11d48" : "#16a34a"}" stroke-width="2.5"/>`;
    g += `<text x="${W / 2}" y="120" text-anchor="middle" font-size="17" font-weight="900" fill="${q ? "#e11d48" : "#166534"}">${pts[0]}${pts[n]} = ${tot}</text>`; H = 128; }
  return svgWrap(W, H, g, 330);
}
const P3 = ["A", "B", "C"], P4 = ["A", "B", "C", "D"];
const GEN = [
  [ // Básico: dos tramos
    () => { const a = between(2, 9), b = between(2, 9), ans = a + b;
      return { prompt: "¿Cuánto mide <b>AC</b>?", say: `A B mide ${a} y B C mide ${b}. ¿Cuánto mide A C?`, scene: segLab(P3, [a, b], "?"),
        ans, opts: numOpts(ans, [Math.abs(a - b), ans + 1, ans - 1], 1), why: `AC = AB + BC = ${a} + ${b} = ${ans}.`, hint: "Suma las dos partes." }; },
    () => { const a = between(5, 20), b = between(5, 20), ans = a + b;
      return { prompt: `AB = ${a} cm y BC = ${b} cm. ¿Cuánto mide <b>AC</b>?`, say: `A B mide ${a} centímetros y B C mide ${b} centímetros. ¿Cuánto mide A C?`, scene: segLab(P3, [a, b], "?"),
        ans, opts: numOpts(ans, [Math.abs(a - b), ans + 10, ans - 1], 1), why: `${a} + ${b} = ${ans} cm.`, hint: "El segmento grande es la suma de los pequeños." }; },
  ],
  [ // Intermedio: tres tramos
    () => { const cs = [between(3, 15), between(3, 15), between(3, 15)], ans = cs[0] + cs[1] + cs[2];
      return { prompt: "¿Cuánto mide <b>AD</b>?", say: `A B mide ${cs[0]}, B C mide ${cs[1]} y C D mide ${cs[2]}. ¿Cuánto mide A D?`, scene: segLab(P4, cs, "?"),
        ans, opts: numOpts(ans, [cs[0] + cs[1], ans + 1, ans - 2], 1), why: `AD = ${cs.join(" + ")} = ${ans}.`, hint: "Suma las tres partes." }; },
    () => { const cs = [between(10, 35), between(10, 35), between(10, 35)], ans = cs[0] + cs[1] + cs[2];
      return { prompt: `AB = ${cs[0]}, BC = ${cs[1]} y CD = ${cs[2]}. Halla <b>AD</b>.`, say: `A B mide ${cs[0]}, B C mide ${cs[1]} y C D mide ${cs[2]}. Halla A D.`, scene: segLab(P4, cs, "?"),
        ans, opts: numOpts(ans, [cs[0] + cs[1], ans + 10, ans - 10], 1), why: `${cs.join(" + ")} = ${ans}.`, hint: "Suma primero dos números y luego el tercero." }; },
    () => { const a = between(3, 12), b = between(3, 12), c = between(3, 12), ans = a + b;
      return { prompt: "¿Cuánto mide <b>AC</b>?", say: `A B mide ${a}, B C mide ${b} y C D mide ${c}. ¿Cuánto mide A C?`, scene: segLab(P4, [a, b, c], null),
        ans, opts: numOpts(ans, [a + b + c, b + c, ans + 1], 1), why: `AC = AB + BC = ${a} + ${b} = ${ans}. CD no se usa.`, hint: "AC va de la A hasta la C." }; },
  ],
  [ // Reto concurso: casos inversos
    () => { const a = between(5, 25), b = between(5, 25), t = a + b, ans = b;
      return { prompt: `AC = ${t} y AB = ${a}. ¿Cuánto mide <b>BC</b>?`, say: `A C mide ${t} y A B mide ${a}. ¿Cuánto mide B C?`, scene: segLab(P3, [a, "?"], t),
        ans, opts: numOpts(ans, [t + a, ans + 1, ans - 1], 1), why: `BC = AC − AB = ${t} − ${a} = ${ans}.`, hint: "Al total le quitas la parte conocida." }; },
    () => { const a = between(5, 20), b = between(5, 20), c = between(5, 20), t = a + b + c, ans = b;
      return { prompt: `AD = ${t}, AB = ${a} y CD = ${c}. ¿Cuánto mide <b>BC</b>?`, say: `A D mide ${t}, A B mide ${a} y C D mide ${c}. ¿Cuánto mide B C?`, scene: segLab(P4, [a, "?", c], t),
        ans, opts: numOpts(ans, [t - a, t - c, ans + 1], 1), why: `BC = ${t} − ${a} − ${c} = ${ans}.`, hint: "Quita al total las dos partes que conoces." }; },
    () => { const a = between(5, 20), b = between(5, 20), c = between(5, 20), t = a + b + c, ans = b + c;
      return { prompt: `AD = ${t} y AB = ${a}. ¿Cuánto mide <b>BD</b>?`, say: `A D mide ${t} y A B mide ${a}. ¿Cuánto mide B D?`, scene: segLab(P4, [a, b, c], t, [1, 3, "?"]),
        ans, opts: numOpts(ans, [t + a, b, ans + 1], 1), why: `BD = AD − AB = ${t} − ${a} = ${ans}.`, hint: "BD va de la B hasta la D." }; },
    () => { const a = between(4, 15), ans = 2 * a;
      return { prompt: `B es el <b>punto medio</b> de AC y AB = ${a}. ¿Cuánto mide <b>AC</b>?`, say: `B es el punto medio de A C y A B mide ${a}. ¿Cuánto mide A C?`, scene: segLab(P3, [a, a], "?"),
        ans, opts: numOpts(ans, [a, ans + 1, a + 1], 1), why: `Punto medio: AB = BC = ${a}. AC = ${a} + ${a} = ${ans}.`, hint: "El punto medio parte el segmento en dos partes iguales." }; },
  ]
];
lesson({ n: 63, next: 49, title: "Medida de segmentos", short: "Medir segmentos", char: "pipo", music: "ukelele", deco: ["📏", "📐", "✏️", "🔢"],
  hello: "¡Hola! Soy <b>Pipo</b>. Un segmento grande está formado por segmentos pequeños: si AB = 16 y BC = 29, entonces <b>AC = 16 + 29 = 45</b>. ¡Vamos a medir!",
  levels: LEVELS3(["Dos partes", "Sumar dos tramos"], ["Tres partes", "Hallar el total"], ["", "Hallar la parte que falta"]) }, GEN);
