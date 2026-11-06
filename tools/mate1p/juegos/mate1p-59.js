// @incluir olimpiada.js
/* Tema 59 · Retos olímpicos: números y operaciones · Rayo */
const GEN = [0, 1, 2].map(d => OLI_NUM.map(g => () => g(d)));
lesson({ n: 59, title: "Retos olímpicos: números y operaciones", short: "Retos con números", char: "rayo", music: "epica", deco: ["🥇", "🧠", "➕", "⭐"],
  hello: "¡Hola! Soy <b>Rayo</b> 🐉. Estos son <b>retos de olimpiada</b> con números: figuras con valor, sucesiones, docenas y más.",
  levels: [{ title: "Retos bronce", icon: "🥉", desc: "Para empezar" }, { title: "Retos plata", icon: "🥈", desc: "Un poco más difíciles" }, { title: "Retos oro", icon: "🥇", desc: "¡Como en el concurso!" }] }, GEN);
