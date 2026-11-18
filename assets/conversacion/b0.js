/* Conversación guiada · B0 (curso A0): saludos y presentaciones.
   Formato de cada escenario (ver assets/conversacion/LEEME.md):
   - turnos[].app: lo que dice la app · es: traducción · esperado: respuesta modelo
   - variantes: [{ t, nota }] otras respuestas correctas (nota = cuál suena más natural)
   - acepta: expresiones regulares sobre el texto normalizado (minúsculas, sin signos,
     contracciones expandidas: "I'm" → "i am"; números 0-20 en palabras) para respuestas abiertas
   - errores: [{ re, id, corr, exp }] errores frecuentes que se señalan
   Las respuestas personales (nombre, edad, país) se aceptan por patrón. */
window.MK_CONV = window.MK_CONV || {};
window.MK_CONV.b0 = {
  nivel: "B0", titulo: "Saludos y presentaciones", curso: "A0", color: "#22c55e",
  escenarios: [
    {
      id: "b0-nuevo-amigo", emoji: "👋", titulo: "Conozco a un nuevo amigo",
      intro: "Es tu primer día en un club de inglés. Un niño nuevo, Sam, se acerca a conversar contigo. Responde sus preguntas.",
      vocab: [
        { en: "name", es: "nombre", ej: "My name is Ana." },
        { en: "nice to meet you", es: "mucho gusto", ej: "Nice to meet you, Sam!" },
        { en: "fine", es: "bien", ej: "I'm fine, thank you." },
        { en: "years old", es: "años (de edad)", ej: "I'm seven years old." },
        { en: "from", es: "de (origen)", ej: "I'm from Peru." },
        { en: "brother / sister", es: "hermano / hermana", ej: "I have one sister." },
        { en: "favorite", es: "favorito", ej: "My favorite color is blue." },
        { en: "goodbye", es: "adiós", ej: "Goodbye! See you soon." }
      ],
      clave: ["My name is Ana.", "I'm fine, thank you. And you?", "I'm seven years old.", "I'm from Peru.", "My favorite color is blue.", "Nice to meet you too."],
      pares: [
        { palabras: ["three", "tree"], es: ["tres", "árbol"] },
        { palabras: ["seven", "eleven"], es: ["siete", "once"] },
        { palabras: ["fine", "five"], es: ["bien", "cinco"] }
      ],
      turnos: [
        { app: "Hello! I'm Sam. What's your name?", es: "¡Hola! Soy Sam. ¿Cómo te llamas?",
          esperado: "My name is Ana.", acepta: ["^(hello |hi )?(my name is|i am) [a-z]+( [a-z]+)?$"],
          variantes: [{ t: "I'm Ana.", nota: "«My name is Ana» y «I'm Ana» son correctas; «I'm Ana» es más común al conversar." }],
          errores: [
            { re: "\\bme name\\b", id: "me-my", corr: "My name is Ana.", exp: "«Mi» se dice «my», no «me». «Me» es «a mí»." },
            { re: "^(i )?name is\\b|^name\\b", id: "falta-my", corr: "My name is Ana.", exp: "Falta «my»: «My name is…» (Mi nombre es…)." },
            { re: "\\bmy name [a-z]+$", id: "falta-is", corr: "My name is Ana.", exp: "Falta el verbo «is»: «My name IS Ana»." }
          ] },
        { app: "Nice to meet you! How are you today?", es: "¡Mucho gusto! ¿Cómo estás hoy?",
          esperado: "I'm fine, thank you. And you?",
          variantes: [{ t: "I'm good, thanks. And you?", nota: "«I'm good» es muy natural en conversación." }, { t: "I'm fine, thanks." }, { t: "Fine, thank you." }, { t: "I'm great, thank you." }],
          errores: [{ re: "^i (fine|good|great)\\b", id: "falta-am", corr: "I'm fine, thank you.", exp: "Falta «am»: «I AM fine» o «I'm fine». En inglés el verbo «be» no se omite." }] },
        { app: "I'm great, thanks! How old are you?", es: "¡Estoy genial, gracias! ¿Cuántos años tienes?",
          esperado: "I'm seven years old.", acepta: ["^(i am )?[a-z0-9]+( years old)?$"],
          variantes: [{ t: "I'm seven.", nota: "Se puede decir solo «I'm seven», pero «I'm seven years old» es la frase completa." }],
          errores: [{ re: "\\bi have [a-z0-9]+ years?\\b", id: "edad-have", corr: "I'm seven years old.", exp: "La edad se dice con «be», no con «have»: «I AM seven years old» (no «I have seven years»)." }] },
        { app: "Cool! Where are you from?", es: "¡Genial! ¿De dónde eres?",
          esperado: "I'm from Peru.", acepta: ["^(i am )?from [a-z]+( [a-z]+)?$"],
          variantes: [{ t: "I live in Lima.", nota: "Responde dónde vives; para «de dónde eres» lo natural es «I'm from Peru»." }],
          errores: [{ re: "\\b(i am|im) of\\b|\\bi am de\\b", id: "from-of", corr: "I'm from Peru.", exp: "Para el origen se usa «from»: «I'm FROM Peru» (no «of»)." },
                    { re: "^i from\\b", id: "falta-am", corr: "I'm from Peru.", exp: "Falta «am»: «I AM from Peru» o «I'm from Peru»." }] },
        { app: "Do you have any brothers or sisters?", es: "¿Tienes hermanos o hermanas?",
          esperado: "Yes, I have one brother.", acepta: ["^(yes|no)\\b.*\\b(i have|i do not have|i do not|i do)\\b", "^(yes|no) i (have|do)", "^i have [a-z0-9]+ (brother|brothers|sister|sisters)"],
          variantes: [{ t: "No, I don't.", nota: "Si no tienes, «No, I don't» es la respuesta corta natural." }, { t: "Yes, I have two sisters." }],
          errores: [{ re: "\\bi has\\b", id: "i-has", corr: "Yes, I have one brother.", exp: "Con «I» se usa «have», no «has». «Has» es para he/she/it." }] },
        { app: "What's your favorite color?", es: "¿Cuál es tu color favorito?",
          esperado: "My favorite color is blue.", acepta: ["^my favou?rite colou?r is [a-z]+$", "^(i like )?[a-z]+$"],
          variantes: [{ t: "I like blue.", nota: "Correcto. La frase completa «My favorite color is blue» suena mejor como respuesta." }, { t: "Blue." }],
          errores: [{ re: "\\bmy colou?r favou?rite\\b", id: "orden-adj", corr: "My favorite color is blue.", exp: "En inglés el adjetivo va ANTES del sustantivo: «favorite color» (no «color favorite»)." }] },
        { app: "It was nice to meet you. Goodbye!", es: "Fue un gusto conocerte. ¡Adiós!",
          esperado: "Nice to meet you too. Goodbye!",
          variantes: [{ t: "Goodbye! See you soon.", nota: "Muy bien. Agregar «Nice to meet you too» es más amable." }, { t: "Bye! See you later." }, { t: "You too. Bye!" }],
          errores: [] }
      ]
    }
  ]
};
