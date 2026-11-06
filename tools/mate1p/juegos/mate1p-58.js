/* Tema 58 · Gráficos de barras y comparación de datos · Tito */
const FR = [["🍓", "fresa"], ["🍍", "piña"], ["🍊", "naranja"], ["🍌", "plátano"], ["🍎", "manzana"]];
const GEN = [
  [
    () => { const f = sample(FR, 3), v = sample([2, 3, 4, 5, 6, 7, 8], 3), i = rnd(3);
      return { prompt: `¿Cuántos estudiantes prefieren el jugo de <b>${f[i][1]}</b>?`, say: `¿Cuántos estudiantes prefieren jugo de ${f[i][1]}?`, scene: barChart(f.map(x => x[0]), v, "Jugo favorito"), ans: v[i], opts: numOpts(v[i], v.filter((_, k) => k !== i), 0), why: `La barra de ${f[i][0]} llega hasta ${v[i]}.`, hint: "Mira hasta qué número llega la barra." }; },
  ],
  [
    () => { const f = sample(FR, 4), v = sample([2, 3, 4, 5, 6, 7, 8, 9], 4), most = rnd(2) === 0, i = v.indexOf(most ? Math.max(...v) : Math.min(...v));
      return { prompt: `¿Qué fruta prefieren <b>${most ? "más" : "menos"}</b> estudiantes?`, say: `¿Qué fruta prefieren ${most ? "más" : "menos"} estudiantes?`, scene: barChart(f.map(x => x[0]), v), ans: f[i][0], opts: f.map(x => x[0]), cols: 4, why: `${f[i][0]} tiene la barra más ${most ? "alta" : "baja"}.`, hint: most ? "Busca la barra más alta." : "Busca la barra más baja." }; },
    () => { const f = sample(FR, 3), v = sample([2, 3, 4, 5, 6, 7, 8], 3), [a, b] = sample([0, 1, 2], 2), ans = Math.abs(v[a] - v[b]);
      return { prompt: `¿Cuántos estudiantes <b>más</b> prefieren ${v[a] > v[b] ? f[a][0] : f[b][0]} que ${v[a] > v[b] ? f[b][0] : f[a][0]}?`, say: "¿Cuántos estudiantes más prefieren una fruta que la otra?", scene: barChart(f.map(x => x[0]), v), ans, opts: numOpts(ans, [v[a] + v[b], Math.max(v[a], v[b]), ans + 1], 0), why: `${Math.max(v[a], v[b])} − ${Math.min(v[a], v[b])} = ${ans}.`, hint: "Lee las dos barras y réstalas." }; },
  ],
  [
    () => { const f = sample(FR, 4), v = sample([2, 4, 6, 8, 10, 12, 14], 4), ans = v.reduce((a, b) => a + b, 0);
      return { prompt: "¿Cuántos estudiantes votaron <b>en total</b>?", say: "¿Cuántos estudiantes votaron en total?", scene: barChart(f.map(x => x[0]), v, "Fruta del recreo"), ans, opts: numOpts(ans, [Math.max(...v), ans - 2, ans + 2], 0), why: `${v.join(" + ")} = ${ans}.`, hint: "Lee cada barra y súmalas todas." }; },
    () => { const f = sample(FR, 4), v = sample([3, 4, 5, 6, 7, 8, 9], 4), s = [...v].sort((a, b) => a - b), ans = s[3] + s[0];
      return { prompt: "Suma los votos de la fruta <b>más</b> votada y de la <b>menos</b> votada.", say: "Suma los votos de la fruta más votada y de la menos votada.", scene: barChart(f.map(x => x[0]), v), ans, opts: numOpts(ans, [s[3] - s[0], s[3] + s[1], s[2] + s[0]], 0), why: `${s[3]} + ${s[0]} = ${ans}.`, hint: "Busca la barra más alta y la más baja." }; },
  ]
];
lesson({ n: 58, title: "Gráficos de barras y comparación de datos", short: "Gráficos de barras", char: "tito", music: "electro", deco: ["📊", "🍓", "🍊", "📈"],
  hello: "¡Bip bup! Soy <b>Tito</b> 🤖. Un <b>gráfico de barras</b> nos muestra los datos con barras: ¡la más alta es la que tiene más!",
  levels: LEVELS3(["Leer barras", "¿Hasta dónde llega?"], ["Comparar barras", "Más, menos y diferencia"], ["", "Totales y sumas"]) }, GEN);
