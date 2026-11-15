"""Cuentos 12, 13, 14, 16, 17, 18 y 19."""
from ilustra import *

STORIES = {}

# ------------------------------------------------------------------ 12
CROWN = '<path transform="translate({x} {y})" d="M-22 0 L-16 -26 L-6 -10 L0 -30 L6 -10 L16 -26 L22 0 Z" fill="#fde68a" stroke="#b7791f" stroke-width="3"/>'
STORIES[12] = {
    "title": "El Caballo que Quería Ser Reina", "emoji": "♞",
    "scenes": [
        {"img": svg(chessboard() + chess(250, 470, "knight", 1.2, mood="love") + chess(520, 470, "queen", 1.25, mood="proud")
                    + speech(150, 120, "¡Quiero moverme como la reina!"), "ajedrez"),
         "alt": "Un caballito de ajedrez mira con admiración a la reina",
         "p": "En un tablero de ajedrez vivía Saltarín, un caballito blanco. Admiraba mucho a la reina, porque podía moverse en línea recta por todo el tablero.",
         "d": ["—¡Quiero moverme como la reina! —suspiró Saltarín."]},
        {"img": svg(chessboard() + chess(380, 470, "knight", 1.2, mood="scared") + CROWN.format(x=392, y=345) + word(560, 260, "¡Ay!", 46)
                    + '<path d="M180 440 h120" stroke="#94a3b8" stroke-width="6" stroke-dasharray="12 10" stroke-linecap="round"/>', "ajedrez"),
         "alt": "El caballito con una corona de papel intenta moverse en línea recta y se tropieza",
         "p": "Saltarín se hizo una corona de papel y trató de moverse en línea recta, como la reina. Pero sus patas no estaban hechas para eso, ¡y se tropezó!",
         "d": ["—¡Ay! No me sale —dijo, sobándose la cabeza."]},
        {"img": svg(chessboard() + chess(400, 470, "knight", 1.15, mood="sad") + chess(170, 470, "pawn", 0.8, mood="worried") + chess(620, 470, "pawn", 0.8, mood="worried")
                    + speech(220, 140, "Nunca seré como ella…"), "ajedrez"),
         "alt": "El caballito está triste y los peones lo miran preocupados",
         "p": "Saltarín se sentó en una esquina del tablero, muy triste. Pensaba que su forma de moverse, saltando en forma de L, no servía para nada.",
         "d": ["—Nunca seré como ella… —dijo con la cabeza baja."]},
        {"img": svg(chessboard() + chess(650, 470, "queen", 1.0, mood="scared") + "".join(chess(x, 470, "pawn", 0.75, mood="angry", white=False) for x in (430, 510))
                    + chess(130, 470, "knight", 1.0, mood="surprised") + speech(400, 120, "¡Ayuda! ¡Estoy atrapada!"), "ajedrez"),
         "alt": "La reina queda atrapada detrás de una pared de peones negros",
         "p": "Un día, durante una partida, la reina quedó atrapada detrás de una pared de peones negros. Ninguna pieza podía pasar para ayudarla.",
         "d": ["—¡Ayuda! ¡Estoy atrapada! —gritó la reina."]},
        {"img": svg(chessboard() + "".join(chess(x, 470, "pawn", 0.75, mood="surprised", white=False) for x in (340, 420))
                    + chess(580, 360, "knight", 1.0, mood="brave") + '<path d="M150 430 Q260 160 520 300" stroke="#f59e0b" stroke-width="8" fill="none" stroke-dasharray="14 10" stroke-linecap="round"/>'
                    + chess(700, 470, "queen", 0.9, mood="surprised") + word(230, 230, "¡Salto en L!", 40, "#7c3aed"), "ajedrez"),
         "alt": "El caballito salta por encima de los peones para ayudar a la reina",
         "p": "Entonces Saltarín recordó algo: ¡él era la única pieza que podía saltar por encima de las demás! Tomó impulso y dio su famoso salto en L.",
         "d": ["—¡Mi salto puede llegar donde nadie llega! —gritó feliz."]},
        {"img": svg(chessboard() + chess(300, 470, "knight", 1.2, mood="proud") + chess(520, 470, "queen", 1.2, mood="love")
                    + speech(150, 120, "Me gusta ser como soy"), "ajedrez"),
         "alt": "La reina le agradece al caballito, que está orgulloso de sí mismo",
         "p": "La reina quedó libre y le dio las gracias. Saltarín tiró su corona de papel: ya no quería ser otra pieza.",
         "d": ["—Tu salto es único, Saltarín —le dijo la reina.", "—Ahora lo sé. ¡Me gusta ser como soy!"]},
    ],
    "msg": "Cada uno tiene algo especial. No necesitamos ser como los demás: cuando creemos en nosotros mismos, descubrimos lo que solo nosotros podemos hacer.",
}

# ------------------------------------------------------------------ 13
STAGE = ('<rect x="0" y="380" width="800" height="120" fill="#c08a4a"/><rect x="0" y="380" width="800" height="14" fill="#8a5a3c"/>'
         '<path d="M0 0 Q120 120 60 380 L0 380 Z M800 0 Q680 120 740 380 L800 380 Z" fill="#dc2626"/>'
         '<path d="M0 0 h800 v40 Q600 70 400 40 Q200 70 0 40 Z" fill="#b91c1c"/>')
CANARY = "#facc15"
STORIES[13] = {
    "title": "La Gallina que Quería Cantar", "emoji": "🐔", "category": "Cuentos chistosos",
    "scenes": [
        {"img": svg(ground() + sun() + fence(20, 760, 330) + bird(560, 300, 0.9, mood="laugh", color=CANARY) + notes(620, 250)
                    + hen(260, 450, 1.1, mood="love") + speech(80, 170, "¡Yo también quiero cantar!")),
         "alt": "Una gallina escucha cantar a un canario y sueña con cantar también",
         "p": "En la granja vivía Cata, una gallina muy alegre. Cada mañana escuchaba cantar al canario Pipo, y soñaba con cantar igual de bonito en el festival de la granja.",
         "d": ["—¡Yo también quiero cantar! —decía Cata, con los ojos brillantes."]},
        {"img": svg(ground() + sun(120, 85, 34, "#ffb703") + hen(200, 450, 1.1, mood="talk", sing=True) + word(330, 230, "¡COCO-RIIII!", 46, "#ea580c")
                    + cow(560, 470, 0.75, mood="surprised") + dog(700, 470, 0.7, mood="surprised"), "amanecer"),
         "alt": "La gallina practica muy fuerte y despierta a la vaca y al perro",
         "p": "Cata practicó muy temprano, antes de que saliera el sol. ¡Su canto fue tan fuerte que despertó a toda la granja!",
         "d": ["—¡COCO-RIIII! —cantó Cata.", "—¿Qué fue eso? —preguntó la vaca, con los ojos muy abiertos."]},
        {"img": svg(STAGE + hen(400, 440, 1.2, mood="worried") + word(400, 120, "Festival de la Granja", 34, "#7c3aed"), "interior"),
         "alt": "La gallina está nerviosa en el escenario del festival",
         "p": "Llegó el día del festival. Cata subió al escenario y vio a todos los animales mirándola. Las patitas le temblaban de nervios.",
         "d": ["—Uy… estoy un poquito nerviosa —susurró."]},
        {"img": svg(STAGE + hen(400, 440, 1.2, mood="surprised", sing=True) + word(400, 220, "¡CLOC!", 64, "#e11d48")
                    + cow(140, 500, 0.6, mood="laugh") + dog(670, 495, 0.75, mood="laugh"), "interior"),
         "alt": "A la gallina se le escapa un cloc muy fuerte y todos se ríen",
         "p": "Cata abrió el pico para cantar y… ¡se le escapó un «CLOC» enorme! Todos los animales se echaron a reír. Cata se sorprendió, ¡y también se rio!",
         "d": ["—¡Jajaja! ¡Qué cloc tan gracioso! —dijo el perro."]},
        {"img": svg(STAGE + hen(400, 440, 1.2, mood="laugh", sing=True) + notes(470, 250, 4, "#ea580c")
                    + cow(140, 500, 0.6, mood="laugh") + dog(670, 495, 0.75, mood="happy") + bird(250, 250, 0.6, mood="laugh", color=CANARY, flying=True), "interior"),
         "alt": "La gallina inventa una canción divertida y todos bailan",
         "p": "En vez de ponerse triste, Cata inventó una canción con sus «cloc, cloc, coco-ró» y empezó a bailar. ¡Todos bailaron con ella!",
         "d": ["—¡Cloc, cloc, coco-ró, a bailar con Cata yo! —cantaba feliz."]},
        {"img": svg(STAGE + hen(400, 440, 1.25, mood="proud") + "".join(heart(x, y, 1.2) for x, y in [(230, 260), (580, 250), (190, 330), (620, 330)])
                    + speech(260, 160, "¡Cantar es divertido!"), "interior"),
         "alt": "Todos aplauden a la gallina, que está orgullosa",
         "p": "Al final, todos aplaudieron. Cata no cantó como el canario, pero hizo la canción más divertida del festival.",
         "d": ["—¡Cantar es divertido cuando lo haces con alegría! —dijo Cata."]},
    ],
    "msg": "Reírse con alegría, también de uno mismo, hace todo más divertido. Lo importante no es hacerlo perfecto, ¡sino animarse a intentarlo!",
}

# ------------------------------------------------------------------ 14
TRASH = '<g transform="translate({x} {y}) rotate(-15)"><rect x="-18" y="-10" width="36" height="20" rx="4" fill="#f472b6"/><path d="M-18 -10 l-8 -6 M18 10 l8 6" stroke="#f472b6" stroke-width="4"/></g>'
CAN = '<g transform="translate({x} {y})"><path d="M-30 0 h40 l8 -26 h-56 Z" fill="#60a5fa"/><path d="M10 -18 q24 -4 30 -18" stroke="#60a5fa" stroke-width="7" fill="none"/>' + "".join(f'<line x1="{40 + i * 5}" y1="{-36 + i * 2}" x2="{38 + i * 5}" y2="{-10 + i * 6}" stroke="#7dd3fc" stroke-width="3"/>' for i in range(4)) + '</g>'
STORIES[14] = {
    "title": "La Niña y el Pasto", "emoji": "👧", "category": "Cuentos ecológicos",
    "scenes": [
        {"img": svg(ground() + sun() + tree(680, 420, 0.95) + girl(330, 460, 1.0, mood="laugh", arm_up=True) + flowers(2, 6)
                    + TRASH.format(x=470, y=470) + TRASH.format(x=200, y=480) + '<path d="M300 470 l-20 10 M320 474 l-10 14" stroke="#3fa300" stroke-width="5"/>'),
         "alt": "Una niña corre por el parque, arranca flores y deja basura",
         "p": "Sofía jugaba en el parque todos los días. Corría por el pasto, arrancaba las flores para jugar y dejaba envolturas de dulces tiradas en el suelo.",
         "d": ["—¡Qué divertido es correr! —decía, sin mirar dónde pisaba."]},
        {"img": svg(ground() + sun() + girl(250, 460, 1.0, mood="surprised") + grass(480, 470, 1.4, mood="sad") + speech(380, 230, "¡Ay! ¡Me pisas!")),
         "alt": "El pasto le habla a la niña, que se sorprende",
         "p": "Un día, mientras corría, escuchó una vocecita que venía del suelo. ¡Era el pasto que le estaba hablando!",
         "d": ["—¡Ay! ¡Me pisas muy fuerte! —se quejó el pasto."]},
        {"img": svg(ground() + sun() + girl(220, 460, 1.0, mood="worried") + grass(450, 470, 1.4, mood="talk") + bird(640, 300, 0.6, mood="happy", flying=True)
                    + '<g transform="translate(560 470)"><ellipse cx="0" cy="-8" rx="14" ry="10" fill="#ef4444"/><circle cx="12" cy="-12" r="6" fill="#111"/><circle cx="-4" cy="-10" r="2.5" fill="#111"/><circle cx="4" cy="-4" r="2.5" fill="#111"/></g>'
                    + speech(300, 210, "Damos aire limpio y casa")),
         "alt": "El pasto le explica a la niña que cuida a los animalitos y el aire",
         "p": "El pasto le explicó que él y las flores ayudan a que el aire sea limpio, y que son la casa de mariquitas, gusanitos y pajaritos.",
         "d": ["—Damos aire limpio y casa a muchos animalitos. Por eso necesitamos cuidado —dijo el pasto."]},
        {"img": svg(ground() + sun() + girl(330, 460, 1.0, mood="sorry") + TRASH.format(x=230, y=330) + grass(560, 470, 1.2, mood="happy")
                    + '<rect x="120" y="390" width="60" height="80" rx="8" fill="#22c55e"/><rect x="112" y="380" width="76" height="16" rx="6" fill="#15803d"/>'
                    + speech(260, 190, "Perdón, no lo sabía")),
         "alt": "La niña recoge la basura y la pone en el tacho",
         "p": "Sofía se sintió mal y pidió perdón. Recogió todas las envolturas y las echó en el tacho de basura.",
         "d": ["—Perdón, no lo sabía. ¡Desde hoy te voy a cuidar!"]},
        {"img": svg(ground() + sun() + girl(300, 460, 1.0, mood="happy") + CAN.format(x=380, y=380) + grass(520, 470, 1.2, mood="laugh")
                    + flower(470, 450, "#ff8fbf", 1.3) + '<path d="M470 470 v-14" stroke="#3fa300" stroke-width="4"/>'),
         "alt": "La niña riega el pasto y siembra flores",
         "p": "Al día siguiente, Sofía llegó con su regadera. Regó el pasto, sembró semillas de flores y les contó a sus amigos todo lo que había aprendido.",
         "d": ["—¡Qué rico! ¡Gracias, Sofía! —rio el pasto."]},
        {"img": svg(ground() + sun() + tree(680, 420, 0.95, blossom=True) + flowers(9, 18) + girl(300, 460, 1.0, mood="love") + grass(470, 470, 1.1, mood="happy")
                    + '<g transform="translate(110 470)"><rect x="-4" y="-80" width="8" height="80" fill="#8a5a3c"/><rect x="-60" y="-120" width="120" height="50" rx="8" fill="#fde68a" stroke="#b7791f" stroke-width="3"/>'
                    '<text x="0" y="-88" text-anchor="middle" font-family="Comic Neue, Comic Sans MS" font-size="17" font-weight="800" fill="#92400e">¡Cuida el pasto!</text></g>'),
         "alt": "El parque está lleno de flores y la niña sonríe junto al pasto",
         "p": "Pronto el parque se llenó de flores de colores. Sofía y sus amigos pusieron un cartel para que todos cuidaran el pasto, y ahora jugaban sin hacerle daño.",
         "d": ["—Cuidar la naturaleza es cuidar nuestra casa —dijo Sofía."]},
    ],
    "msg": "La naturaleza también siente y nos regala aire limpio, sombra y belleza. Cuando la respetamos y la cuidamos, todos vivimos mejor.",
}

# ------------------------------------------------------------------ 16
def forest_faces(moods=("calm", "calm", "calm")):
    return (tree(100, 430, 1.0, leaf="#3f9c48", face_mood=moods[0]) + tree(400, 400, 0.85, leaf="#4fae55", face_mood=moods[1])
            + tree(700, 430, 1.0, leaf="#3f9c48", face_mood=moods[2]))

STORIES[16] = {
    "title": "Pompón y el Bosque de las Voces", "emoji": "🐇",
    "scenes": [
        {"img": svg(ground() + sun() + forest_faces(("sleepy", "sleepy", "sleepy")) + rabbit(270, 460, 1.0, mood="talk") + speech(140, 150, "¡HOLA, BOSQUE!")),
         "alt": "Un conejito blanco entra al bosque gritando",
         "p": "Pompón era un conejito blanco que siempre hablaba muy fuerte. Un día escuchó que había un bosque mágico donde los árboles podían hablar, y fue a visitarlo.",
         "d": ["—¡HOLA, BOSQUE! ¡YA LLEGUÉ! —gritó Pompón."]},
        {"img": svg(ground() + sun() + forest_faces(("worried", "talk", "worried")) + rabbit(250, 460, 1.0, mood="surprised") + speech(320, 150, "Shhh…")),
         "alt": "Los árboles con cara le piden silencio al conejito",
         "p": "Los árboles abrieron los ojos y le dijeron algo muy bajito. Pero Pompón hablaba tan fuerte que no podía escucharlos.",
         "d": ["—Shhh… —susurraron los árboles."]},
        {"img": svg(ground("tarde") + forest_faces(("sleepy", "sleepy", "sleepy")) + rabbit(260, 460, 1.0, mood="sad", droopy=True) + speech(160, 150, "¿Por qué nadie me habla?"), "tarde"),
         "alt": "El conejito está triste porque el bosque quedó en silencio",
         "p": "Pompón siguió gritando: «¡Hablen, árboles! ¡Hablen!». Pero el bosque se quedó en silencio. Se sentó triste sobre una piedra.",
         "d": ["—¿Por qué nadie me habla? —preguntó, con las orejas caídas."]},
        {"img": svg(ground("tarde") + forest_faces(("calm", "calm", "calm")) + rabbit(270, 460, 1.0, mood="calm") + word(560, 260, "pío, pío…", 30, "#2563eb"), "tarde"),
         "alt": "El conejito cierra los ojos y escucha con atención",
         "p": "Entonces Pompón cerró los ojos y se quedó muy quieto. Escuchó el viento, el río… y una vocecita muy pequeña que pedía ayuda.",
         "d": ["—Pío, pío… —se escuchaba a lo lejos."]},
        {"img": svg(ground() + sun() + tree(560, 470, 1.15, leaf="#4fae55", face_mood="worried") + '<ellipse cx="560" cy="330" rx="40" ry="14" fill="#a0703c"/>'
                    + rabbit(270, 460, 1.0, mood="brave") + bird(380, 450, 0.45, mood="sad", color="#fde68a") + bird(600, 300, 0.6, mood="worried", color="#fbbf24")),
         "alt": "El conejito encuentra un pajarito que se cayó de su nido",
         "p": "Pompón siguió la vocecita y encontró a un pajarito que se había caído de su nido. Con mucho cuidado, lo ayudó a volver con su mamá.",
         "d": ["—Tranquilo, pequeño. Ya te llevo a casa —le dijo bajito."]},
        {"img": svg(ground() + sun() + forest_faces(("laugh", "happy", "laugh")) + rabbit(260, 460, 1.0, mood="love") + notes(470, 260, 3, "#16a34a")
                    + speech(140, 150, "Cuando escucho, el bosque me habla")),
         "alt": "Los árboles sonríen y hablan con el conejito",
         "p": "Los árboles sonrieron y por fin le hablaron a Pompón. Le contaron historias, secretos y canciones del bosque.",
         "d": ["—¡Ahora entiendo! Cuando escucho, el bosque me habla —dijo Pompón feliz."]},
    ],
    "msg": "Para escuchar a los demás necesitamos guardar silencio y prestar atención. Quien sabe escuchar descubre cosas maravillosas y puede ayudar a quien lo necesita.",
}

# ------------------------------------------------------------------ 17
SUNROCK = '<path d="M300 400 Q300 340 400 335 Q500 340 500 400 Z" fill="#9aa4b2"/><path d="M330 360 Q380 345 430 350" stroke="#fff" stroke-width="6" opacity=".35" fill="none"/>'
def six_caimans(moods):
    pos = [(90, 470, False), (230, 485, False), (120, 410, False), (630, 470, True), (760, 485, True), (690, 410, True)]
    return "".join(caiman(x, y, 0.52, flip=f, mood=m) for (x, y, f), m in zip(pos, moods))

STORIES[17] = {
    "title": "El Colibrí y los Seis Caimanes", "emoji": "🐦",
    "scenes": [
        {"img": svg(sun() + ground(y1=290, y2=310) + river(300, 200) + SUNROCK + six_caimans(["angry"] * 6) + speech(220, 170, "¡La roca es mía!")),
         "alt": "Seis caimanes discuten en el río por una roca con sol",
         "p": "En un río vivían seis caimanes. Todos querían echarse al sol sobre la única roca grande, y cada mañana discutían a gritos.",
         "d": ["—¡La roca es mía! —gritaban los seis al mismo tiempo."]},
        {"img": svg(sun() + ground(y1=290, y2=310) + river(300, 200) + SUNROCK + six_caimans(["angry", "worried", "angry", "angry", "worried", "angry"])
                    + word(400, 300, "¡SPLASH!", 46, "#2563eb") + hummingbird(600, 200, 1.0, mood="surprised")),
         "alt": "Los caimanes se empujan y salpican agua mientras llega un colibrí",
         "p": "Se empujaban, salpicaban agua y nadie lograba subir a la roca. Al final, ¡ninguno tomaba sol! Un colibrí que pasaba se detuvo a mirar.",
         "d": ["—¡Así nadie disfruta del sol! —pensó el colibrí."]},
        {"img": svg(sun() + ground(y1=290, y2=310) + river(300, 200) + SUNROCK + six_caimans(["surprised"] * 6) + hummingbird(400, 260, 1.2, mood="talk")
                    + speech(200, 150, "¿Y si hablamos uno por uno?")),
         "alt": "El colibrí propone que hablen de uno en uno",
         "p": "El colibrí voló hasta la roca y habló con voz tranquila. Los caimanes, sorprendidos, se quedaron callados.",
         "d": ["—¿Y si hablamos uno por uno? Así todos se pueden escuchar —propuso."]},
        {"img": svg(sun() + ground(y1=290, y2=310) + river(300, 200) + SUNROCK + six_caimans(["talk", "calm", "calm", "calm", "calm", "calm"]) + hummingbird(400, 250, 1.0, mood="happy")
                    + speech(40, 170, "A mí me gusta el sol de la mañana")),
         "alt": "Un caimán habla y los demás escuchan con calma",
         "p": "Cada caimán contó lo que necesitaba, mientras los demás escuchaban. Uno quería el sol de la mañana, otro el de la tarde, y otro solo un ratito para secarse.",
         "d": ["—A mí me gusta el sol de la mañana —dijo el primero."]},
        {"img": svg(sun() + ground(y1=290, y2=310) + river(300, 200) + SUNROCK + caiman(400, 360, 0.5, mood="calm")
                    + caiman(120, 470, 0.42, mood="happy") + caiman(260, 480, 0.42, mood="happy") + caiman(560, 480, 0.42, flip=True, mood="happy") + caiman(700, 470, 0.42, flip=True, mood="happy")
                    + hummingbird(640, 220, 0.9, mood="happy") + speech(80, 160, "¡Hagamos turnos!")),
         "alt": "Un caimán toma sol en la roca mientras los demás esperan su turno",
         "p": "Juntos decidieron hacer turnos: cada uno tendría su tiempo en la roca. Mientras uno tomaba sol, los demás nadaban y jugaban en el agua.",
         "d": ["—¡Hagamos turnos! Así todos tenemos sol —dijeron contentos."]},
        {"img": svg(sun() + ground(y1=290, y2=310) + river(300, 200) + SUNROCK + six_caimans(["laugh", "happy", "laugh", "happy", "laugh", "happy"])
                    + hummingbird(400, 240, 1.0, mood="love") + speech(200, 140, "Hablando nos entendemos")),
         "alt": "Los seis caimanes y el colibrí están felices en el río",
         "p": "Desde entonces, cuando había un problema, los caimanes se sentaban a conversar. El río se volvió el lugar más tranquilo y alegre del bosque.",
         "d": ["—¡Hablando nos entendemos! —dijo el colibrí."]},
    ],
    "msg": "Cuando hay un problema, gritar y empujar no ayuda. Escucharnos con respeto y conversar nos permite encontrar soluciones donde todos ganan.",
}

# ------------------------------------------------------------------ 18
def three(moods, xs=(150, 330, 510), y=470):
    return "".join(caiman(x, y, 0.68, mood=m) for x, m in zip(xs, moods))

STORIES[18] = {
    "title": "El Colibrí y los Tres Caimanes", "emoji": "🐦",
    "scenes": [
        {"img": svg(sun() + ground(y1=290, y2=310) + river(300, 200) + three(["laugh", "laugh", "laugh"], xs=(110, 260, 410)) + frog(640, 470, 1.0, mood="sad")
                    + speech(300, 170, "¡Qué ojos tan saltones!")),
         "alt": "Tres caimanes se burlan de una rana en el río",
         "p": "En el río vivían tres caimanes muy bromistas, pero sus bromas no eran amables. Se reían de la rana por sus ojos grandes.",
         "d": ["—¡Qué ojos tan saltones tienes! —se burlaban."]},
        {"img": svg(sun() + ground(y1=290, y2=310) + river(300, 200) + three(["laugh", "laugh", "laugh"], xs=(110, 260, 410)) + turtle(640, 470, 0.9, mood="sad")
                    + word(560, 330, "¡SPLASH!", 40, "#2563eb")),
         "alt": "Los caimanes salpican a la tortuga y ella se va triste",
         "p": "También salpicaban a la tortuga cuando pasaba y empujaban a los peces. Poco a poco, los demás animales dejaron de ir al río.",
         "d": ["—Aquí ya no se puede jugar tranquilo —dijo la tortuga, y se fue."]},
        {"img": svg(sun() + ground(y1=290, y2=310) + river(300, 200) + three(["sad", "worried", "sad"]) + hummingbird(620, 250, 1.1, mood="talk")
                    + speech(320, 150, "Nadie juega con quien no respeta")),
         "alt": "Los caimanes están solos y aburridos; llega un colibrí",
         "p": "Un día, los caimanes se dieron cuenta de que estaban solos y aburridos. Entonces llegó un colibrí y les habló con cariño.",
         "d": ["—¿Saben por qué nadie viene? Nadie quiere jugar con quien no respeta —les explicó."]},
        {"img": svg(sun() + ground(y1=290, y2=310) + river(300, 200) + three(["surprised", "surprised", "surprised"]) + hummingbird(620, 230, 1.1, mood="happy")
                    + speech(180, 140, "Por favor · Gracias · Perdón") + sparkles(400, 300, 6, 200)),
         "alt": "El colibrí enseña a los caimanes las palabras mágicas",
         "p": "El colibrí les enseñó tres palabras mágicas que abren el corazón de los demás: por favor, gracias y perdón. Y les explicó que nunca hay que burlarse de cómo es otro.",
         "d": ["—Con estas palabras, todos se sentirán bien junto a ustedes —dijo el colibrí."]},
        {"img": svg(sun() + ground(y1=290, y2=310) + river(300, 200) + three(["sorry", "sorry", "sorry"], xs=(110, 260, 410)) + frog(590, 470, 0.9, mood="surprised") + turtle(700, 480, 0.75, mood="surprised")
                    + speech(200, 160, "Perdón por burlarnos")),
         "alt": "Los caimanes le piden perdón a la rana y a la tortuga",
         "p": "Los tres caimanes buscaron a la rana y a la tortuga, y les pidieron perdón de corazón.",
         "d": ["—Perdón por burlarnos. Tus ojos son muy bonitos, rana —dijeron.", "—¡Gracias! Los perdono —respondió la rana."]},
        {"img": svg(sun() + ground(y1=290, y2=310) + river(300, 200) + three(["laugh", "happy", "laugh"], xs=(110, 260, 410)) + frog(570, 470, 0.85, mood="laugh")
                    + turtle(690, 480, 0.75, mood="happy") + hummingbird(400, 220, 0.9, mood="love") + fish(560, 420, 0.6, mood="happy", glass=False, color="#fb923c")),
         "alt": "Todos los animales juegan felices en el río",
         "p": "Desde ese día, el río volvió a llenarse de amigos. Los caimanes seguían siendo divertidos, pero ahora sus bromas hacían reír a todos.",
         "d": ["—¡Por favor, juega con nosotros! —invitaban ahora los caimanes."]},
    ],
    "msg": "El respeto es la base para vivir bien juntos. Tratar a los demás con amabilidad y usar las palabras mágicas hace que todos queramos compartir.",
}

# ------------------------------------------------------------------ 19
BROKEN = ('<path d="M150 405 L330 415" stroke="#a16207" stroke-width="16" stroke-linecap="round"/><path d="M470 418 L650 405" stroke="#a16207" stroke-width="16" stroke-linecap="round"/>'
          '<path d="M330 415 L350 470 M470 418 L452 470" stroke="#a16207" stroke-width="12"/>')
LOG = '<g transform="translate({x} {y}) rotate({r})"><rect x="-50" y="-11" width="100" height="22" rx="11" fill="#b7791f"/><circle cx="50" cy="0" r="11" fill="#e2b77a" stroke="#a16207" stroke-width="3"/></g>'
VINE = '<path d="M{x} {y} q20 30 0 60 q-20 30 0 60" stroke="#16a34a" stroke-width="7" fill="none"/>'
STORIES[19] = {
    "title": "El Colibrí y el Puente de Todos", "emoji": "🌉",
    "scenes": [
        {"img": svg(cloud(100, 80, 1.0, "#cbd5e1") + ground(y1=300, y2=320) + river(330, 170) + BROKEN + frog(80, 400, 0.6, mood="sad") + turtle(170, 400, 0.6, mood="sad")
                    + rabbit(700, 400, 0.6, flip=True, mood="sad") + bird(620, 390, 0.5, flip=True, mood="sad", color="#93c5fd") + speech(260, 170, "¡El puente se rompió!"), "nublado"),
         "alt": "El puente sobre el río está roto y los animales quedan separados",
         "p": "Después de una gran lluvia, el río creció y rompió el puente del bosque. Los animales quedaron separados: unos de un lado y otros del otro.",
         "d": ["—¡El puente se rompió! ¿Cómo vamos a cruzar? —preguntaban preocupados."]},
        {"img": svg(sun() + ground(y1=300, y2=320) + river(330, 170) + BROKEN + three(["proud", "proud", "proud"], xs=(170, 330, 490), y=470)
                    + LOG.format(x=640, y=450, r=10) + word(650, 380, "¡Ups!", 34, "#2563eb") + speech(150, 170, "¡Nosotros solos lo arreglamos!")),
         "alt": "Los tres caimanes intentan arreglar el puente solos y el tronco se va con el agua",
         "p": "Los tres caimanes dijeron que ellos eran los más fuertes y que lo arreglarían solos. Pero cada vez que ponían un tronco, ¡el agua se lo llevaba!",
         "d": ["—¡Nosotros solos lo arreglamos! —dijeron. Pero el tronco se fue flotando."]},
        {"img": svg(sun() + ground(y1=300, y2=320) + river(330, 170) + BROKEN + three(["worried", "sad", "worried"], xs=(170, 330, 490), y=470) + hummingbird(600, 230, 1.1, mood="talk")
                    + speech(150, 150, "Cada uno puede ayudar en algo")),
         "alt": "El colibrí les dice a los caimanes que todos pueden ayudar",
         "p": "Cansados, los caimanes se sentaron. Entonces llegó el colibrí con una idea.",
         "d": ["—Cada uno puede ayudar en algo. ¡Si todos participan, será más fácil! —dijo el colibrí."]},
        {"img": svg(sun() + ground(y1=300, y2=320) + river(330, 170) + BROKEN + caiman(250, 480, 0.5, mood="brave") + LOG.format(x=250, y=432, r=0)
                    + caiman(550, 480, 0.5, flip=True, mood="brave") + LOG.format(x=550, y=432, r=0) + hummingbird(400, 200, 0.9, mood="happy") + VINE.format(x=440, y=200)
                    + frog(90, 395, 0.6, mood="happy") + turtle(710, 400, 0.6, flip=True, mood="happy") + rabbit(160, 400, 0.55, mood="brave")),
         "alt": "Todos los animales trabajan juntos: los caimanes llevan troncos y el colibrí lianas",
         "p": "Los caimanes cargaron los troncos, el colibrí trajo lianas para amarrarlos, la rana y la tortuga sostuvieron las puntas, y el conejo buscó piedras. ¡Todos trabajaron!",
         "d": ["—¡Tú amarras, yo cargo, tú sostienes! —se decían unos a otros."]},
        {"img": svg(sun() + ground(y1=300, y2=320) + river(330, 170) + log_bridge(150, 650, 405) + three(["laugh", "happy", "laugh"], xs=(170, 330, 490), y=480)
                    + hummingbird(400, 220, 0.9, mood="love") + sparkles(400, 300, 8, 260) + word(400, 160, "¡Lo logramos!", 40, "#16a34a")),
         "alt": "El puente nuevo está terminado y todos celebran",
         "p": "Al final de la tarde, el puente nuevo estaba listo. ¡Era más fuerte y bonito que el anterior!",
         "d": ["—¡Lo logramos! ¡Y lo hicimos juntos! —celebraron todos."]},
        {"img": svg(sun() + ground(y1=300, y2=320) + river(330, 170) + log_bridge(150, 650, 405) + frog(250, 400, 0.55, mood="laugh") + turtle(340, 403, 0.55, mood="happy")
                    + rabbit(450, 400, 0.5, mood="laugh") + bird(540, 392, 0.45, mood="happy", color="#93c5fd") + three(["happy", "happy", "happy"], xs=(170, 400, 630), y=490)
                    + hummingbird(660, 230, 0.9, mood="happy")),
         "alt": "Los animales cruzan felices el puente mientras los caimanes sonríen",
         "p": "Desde ese día, todos cruzaban el puente felices. Los caimanes aprendieron que no hace falta ser el más fuerte: cuando todos participan, se logran cosas grandes.",
         "d": ["—¡Este puente es de todos! —dijo un caimán con orgullo."]},
    ],
    "msg": "Cuando todos participan y cada uno aporta lo que sabe hacer, el trabajo es más fácil y el resultado es mejor. ¡Juntos somos más fuertes!",
}
