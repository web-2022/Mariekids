/* Conversación guiada · B3 (curso C1): reuniones de trabajo, explicar problemas y proponer soluciones. */
window.MK_CONV = window.MK_CONV || {};
window.MK_CONV.b3 = {
  nivel: "B3", titulo: "Reuniones de trabajo", curso: "C1", color: "#7c3aed",
  escenarios: [
    {
      id: "b3-produccion-mina", emoji: "⛏️", titulo: "Reunión de producción en mina",
      intro: "Eres el jefe de planeamiento. Diriges la reunión semanal de producción con el gerente de operaciones. La producción está atrasada por un problema con el scoop.",
      vocab: [
        { en: "production figures", es: "cifras de producción", ej: "Today we are going to review the production figures." },
        { en: "monthly target", es: "meta mensual", ej: "Are we on track to meet the monthly target?" },
        { en: "behind", es: "atrasados", ej: "We are a little behind." },
        { en: "scoop", es: "scoop (cargador de bajo perfil)", ej: "The problem is the scoop." },
        { en: "backup", es: "de respaldo / reserva", ej: "We don't have a backup scoop." },
        { en: "stope", es: "tajo", ej: "We should move to the stopes with higher grade." },
        { en: "grade", es: "ley (del mineral)", ej: "Those stopes have a higher grade." },
        { en: "vein", es: "veta", ej: "The veins are wider in that area." },
        { en: "to recover", es: "recuperar", ej: "We need to recover the production." },
        { en: "progress", es: "avance", ej: "Let's meet next week to check the progress." }
      ],
      clave: [
        "Today we are going to review the production figures.",
        "We are a little behind because of equipment problems.",
        "I don't know, maybe four or five weeks.",
        "I think we should move to the stopes with higher grade and wider veins.",
        "Let's meet again next week to check the progress."
      ],
      pares: [
        { palabras: ["stope", "stop", "stove"], es: ["tajo", "parar", "cocina"] },
        { palabras: ["what", "why"], es: ["qué", "por qué"] },
        { palabras: ["don't", "didn't"], es: ["no (presente)", "no (pasado)"] },
        { palabras: ["vein", "vain"], es: ["veta", "vanidoso"] },
        { palabras: ["week", "weak"], es: ["semana", "débil"] }
      ],
      turnos: [
        { app: "Good morning, everyone. Start the meeting and say what you will review today.", es: "Buenos días a todos. Empieza la reunión y di qué van a revisar hoy.",
          esperado: "Good morning, everyone. Today we are going to review the production figures.",
          variantes: [{ t: "Good morning. Today we will review the production figures.", nota: "Correcto. «We are going to review» suena más natural para un plan de la reunión." },
                      { t: "Good morning, everyone. Today we're reviewing the production figures." }],
          errores: [{ re: "\\btoday we going\\b", id: "falta-are", corr: "Today we are going to review the production figures.", exp: "Falta «are»: «we ARE going to…». Con «going to» siempre va am/is/are." },
                    { re: "\\bthe figures of production\\b", id: "orden-sust", corr: "the production figures", exp: "En inglés el sustantivo que describe va primero: «production figures» (cifras de producción)." }] },
        { app: "Are we on track to meet the monthly target?", es: "¿Vamos bien para cumplir la meta mensual?",
          esperado: "Maybe, but we are a little behind because of equipment problems.",
          variantes: [{ t: "Not really. We are a little behind because of equipment problems.", nota: "Muy natural: «Not really» suaviza la mala noticia." },
                      { t: "No, we are a little behind because of equipment problems." }],
          errores: [{ re: "\\bbecause equipment problems\\b", id: "because-of", corr: "because of equipment problems", exp: "Antes de un sustantivo se usa «because OF»: «because of equipment problems». «Because» solo va antes de una oración." },
                    { re: "\\bwe are (a little )?late\\b", id: "late-behind", corr: "we are a little behind", exp: "Para metas o planes se dice «behind» (atrasados). «Late» es para llegar tarde a algo." }] },
        { app: "What equipment is causing the delay?", es: "¿Qué equipo está causando el retraso?",
          esperado: "The problem is the scoop.",
          variantes: [{ t: "It's the scoop.", nota: "Correcto y corto. «The problem is the scoop» es más claro en una reunión." }, { t: "The scoop is the problem." }],
          errores: [{ re: "^problem is\\b", id: "falta-the", corr: "The problem is the scoop.", exp: "Falta «the» al inicio: «THE problem is…». Hablas de un problema concreto." }] },
        { app: "How long will it take to fix it?", es: "¿Cuánto tiempo tomará repararlo?",
          esperado: "I don't know, maybe four or five weeks.",
          variantes: [{ t: "I'm not sure, maybe four or five weeks.", nota: "«I'm not sure» suena más profesional que «I don't know»." },
                      { t: "Maybe four or five weeks." }],
          errores: [{ re: "\\bi did not know\\b", id: "dont-didnt", corr: "I don't know, maybe four or five weeks.", exp: "«I didn't know» significa «no sabía» (pasado). Ahora mismo no lo sabes: «I DON'T know» (no sé)." },
                    { re: "\\b(four|five) week\\b", id: "plural-s", corr: "four or five weeks", exp: "Plural: «weeks» con -s." }] },
        { app: "Do we have a backup scoop?", es: "¿Tenemos un scoop de respaldo?",
          esperado: "No, we don't have a backup scoop.",
          variantes: [{ t: "No, we don't.", nota: "Respuesta corta correcta y natural." }, { t: "Unfortunately, we don't have a backup scoop.", nota: "«Unfortunately» suena muy profesional." }],
          errores: [{ re: "\\bwe (do not|dont) have backup\\b", id: "falta-a", corr: "No, we don't have a backup scoop.", exp: "Falta «a»: «a backup scoop». Con un objeto contable en singular se usa «a»." },
                    { re: "^no we have not\\b", id: "have-not", corr: "No, we don't have a backup scoop.", exp: "Para «tener» se niega con «don't have»: «We DON'T HAVE…» (no «we have not»)." }] },
        { app: "What is your plan to recover the production?", es: "¿Cuál es tu plan para recuperar la producción?",
          esperado: "I think we should move to the stopes with higher grade and wider veins.",
          variantes: [{ t: "We should move to the stopes with higher grade and wider veins.", nota: "Correcto. «I think…» suaviza la propuesta y suena más natural en una reunión." },
                      { t: "My plan is to move to the stopes with higher grade and wider veins." }],
          errores: [{ re: "\\b(stop|stops)\\b", id: "stope-stop", corr: "stopes", exp: "«Tajo» es «stope» (stóup). «Stop» significa «parar». Pronuncia la «o» larga: stóup." },
                    { re: "\\bmore high grade\\b|\\bmost high\\b", id: "comparativo", corr: "higher grade", exp: "Comparativo de «high»: «higher» (más alta), no «more high»." },
                    { re: "\\bmore wide\\b", id: "comparativo", corr: "wider veins", exp: "Comparativo de «wide»: «wider» (más anchas), no «more wide»." },
                    { re: "\\bshould to\\b", id: "should-to", corr: "we should move", exp: "Después de «should» va el verbo sin «to»: «should move»." }] },
        { app: "When can we start?", es: "¿Cuándo podemos empezar?",
          esperado: "We can start today.",
          variantes: [{ t: "We start today.", nota: "Se entiende, pero «We can start today» suena más natural como respuesta a «When can we…?»." },
                      { t: "Today.", nota: "Correcto pero muy corto; en una reunión es mejor una frase completa." }, { t: "We can start right away." }],
          errores: [] },
        { app: "Close the meeting.", es: "Cierra la reunión.",
          esperado: "Thank you, everyone. Let's meet again next week to check the progress.",
          variantes: [{ t: "Thank you, everyone. See you next week.", nota: "Correcto. Mencionar «to check the progress» deja claro el siguiente paso." },
                      { t: "Thanks, everyone. We will meet next week to check the progress." }],
          errores: [{ re: "\\blet us meet again the next week\\b|\\bthe next week\\b", id: "next-week", corr: "next week", exp: "Se dice «next week» sin «the»." }] }
      ]
    }
  ]
};
