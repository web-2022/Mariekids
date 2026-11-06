// @incluir olimpiada.js
/* Tema 60 · Retos olímpicos: figuras y lógica · Mika */
const GEN = [0, 1, 2].map(d => OLI_FIG.map(g => () => g(d)));
lesson({ n: 60, title: "Retos olímpicos: figuras y lógica", short: "Retos con figuras", char: "mika", music: "epica", deco: ["🥇", "🔺", "🧊", "🧭"],
  hello: "¡Hola! Soy <b>Mika</b> 🦉. <b>Retos de olimpiada</b> con figuras, cubos, recorridos y acertijos de lógica.",
  levels: [{ title: "Retos bronce", icon: "🥉", desc: "Para empezar" }, { title: "Retos plata", icon: "🥈", desc: "Un poco más difíciles" }, { title: "Retos oro", icon: "🥇", desc: "¡Como en el concurso!" }] }, GEN);
