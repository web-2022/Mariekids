"""Cuentos 04 a 10."""
from ilustra import *

STORIES = {}

# ------------------------------------------------------------------ 04
def glowpath(n=7):
    return "".join(firefly(120 + i * 95, 330 - (i % 2) * 40, 0.8, mood="happy") for i in range(n))

def nest_tree(x=640, y=470):
    return tree(x, y, 1.15, leaf="#2e5938") + f'<ellipse cx="{x}" cy="{y - 150}" rx="30" ry="36" fill="#3b2414"/>'

STORIES[4] = {
    "title": "El Búho, la Luciérnaga y la Noche Oscura", "emoji": "🦉",
    "scenes": [
        {"img": svg(ground("noche") + moon() + stars(4) + tree(110, 470, 1.0, leaf="#2e5938") + firefly(420, 300, 1.3, mood="sad")
                    + speech(300, 190, "Mi luz es muy pequeña…"), "noche"),
         "alt": "Una luciérnaga pequeña mira la luna grande y se siente triste",
         "p": "En el bosque vivía Lucía, una luciérnaga muy pequeñita. Cada noche miraba la luna grande y brillante, y pensaba que su lucecita no servía para nada.",
         "d": ["—Mi luz es muy pequeña… nadie la necesita —suspiraba."]},
        {"img": svg(ground("noche") + cloud(80, 90, 1.3, "#4b5a8f") + cloud(420, 70, 1.4, "#4b5a8f") + cloud(620, 110, 1.1, "#4b5a8f")
                    + owl(330, 460, 1.1, mood="worried") + owl(430, 470, 0.55, mood="sad") + speech(200, 200, "No veo el camino a casa"), ("#121a3a", "#24305e")),
         "alt": "En una noche sin luna, el búho y su búho bebé no encuentran el camino",
         "p": "Una noche, las nubes taparon la luna y el bosque quedó muy oscuro. Don Plumón, el búho, volvía con su hijito Plumita, pero no podía ver nada.",
         "d": ["—No veo el camino a casa —dijo Don Plumón, preocupado."]},
        {"img": svg(ground("noche") + cloud(420, 70, 1.4, "#4b5a8f") + owl(300, 460, 1.1, mood="surprised") + owl(390, 470, 0.55, mood="surprised")
                    + firefly(520, 330, 1.4, mood="happy") + speech(420, 200, "¡Yo puedo ayudar!"), ("#121a3a", "#24305e")),
         "alt": "La luciérnaga se acerca brillando y el búho la mira sorprendido",
         "p": "Lucía vio a los búhos y voló hacia ellos con su lucecita encendida. Don Plumón se sorprendió al verla tan pequeña.",
         "d": ["—¡Yo puedo ayudar! —dijo Lucía.", "—¿Tú, tan pequeñita? —preguntó el búho."]},
        {"img": svg(ground("noche") + glowpath() + owl(90, 470, 0.8, mood="surprised") + speech(260, 160, "¡Amigas, a brillar juntas!"), ("#121a3a", "#24305e")),
         "alt": "Muchas luciérnagas forman un camino de luz en el bosque oscuro",
         "p": "Lucía llamó a todas sus amigas luciérnagas. Una por una se encendieron y formaron un camino de lucecitas entre los árboles.",
         "d": ["—¡Amigas, a brillar juntas! —gritó Lucía."]},
        {"img": svg(ground("noche") + nest_tree() + "".join(firefly(150 + i * 80, 360 - i * 25, 0.7) for i in range(6))
                    + owl(250, 470, 0.9, mood="happy") + owl(330, 475, 0.5, mood="happy"), ("#121a3a", "#24305e")),
         "alt": "Los búhos siguen el camino de luz hasta el árbol de su casa",
         "p": "Don Plumón y Plumita siguieron el camino de luz paso a paso, hasta llegar al gran árbol donde estaba su casa. ¡Estaban a salvo!",
         "d": ["—¡Ya llegamos, papá! —dijo Plumita feliz."]},
        {"img": svg(ground("noche") + moon() + stars(9) + owl(330, 460, 1.1, mood="happy") + firefly(480, 300, 1.4, mood="love")
                    + speech(150, 180, "Tu luz es grande por dentro"), "noche"),
         "alt": "El búho le da las gracias a la luciérnaga, que brilla feliz",
         "p": "Don Plumón le dio las gracias a Lucía con una gran sonrisa. Desde esa noche, Lucía nunca más pensó que su luz era pequeña.",
         "d": ["—Tu luz es pequeñita por fuera, pero grande por dentro —le dijo el búho."]},
    ],
    "msg": "No importa si eres pequeño: todos tenemos una luz por dentro. Cuando la compartimos con los demás, podemos iluminar el camino de quienes nos necesitan.",
}

# ------------------------------------------------------------------ 05
STORIES[5] = {
    "title": "El Pasto y el Agua Generosa", "emoji": "🌱",
    "scenes": [
        {"img": svg(ground() + sun() + cloud(120, 80, 0.9) + grass(380, 440, 1.6, mood="proud") + drop(560, 300, 1.0, mood="happy")
                    + speech(60, 190, "¡Soy verde gracias a mí!")),
         "alt": "El pasto alto y verde presume, mientras una gota de agua lo mira",
         "p": "En el prado vivía Verdín, un pasto alto y muy verde. Cada mañana, Clarita, una gota de agua, lo regaba con cariño. Pero Verdín nunca le daba las gracias.",
         "d": ["—¡Soy el pasto más verde del prado, y todo gracias a mí! —decía orgulloso."]},
        {"img": svg(ground() + sun() + grass(250, 440, 1.5, mood="proud") + drop(560, 330, 1.0, mood="sad") + cloud(600, 120, 0.9)
                    + speech(380, 210, "Nadie me da las gracias…")),
         "alt": "La gota de agua se va triste hacia una nube",
         "p": "Un día, Clarita se sintió triste. Ella ayudaba todos los días, pero Verdín ni siquiera la miraba. Entonces subió a una nube y se fue lejos.",
         "d": ["—Nadie me da las gracias… —dijo Clarita, y se fue volando."]},
        {"img": svg(ground("seco") + sun(400, 100, 52, "#ffb703") + grass(380, 450, 1.5, mood="sad", dry=True) + word(400, 260, "¡Qué calor!", 34, "#c2410c"), ("#ffe2b8", "#fff6e6")),
         "alt": "Sin agua, el pasto se seca bajo un sol muy fuerte",
         "p": "Pasaron los días y no llovió. El sol calentaba muy fuerte y Verdín empezó a ponerse amarillo y seco. Ya no se sentía tan importante.",
         "d": ["—Tengo mucha sed… sin agua no puedo crecer —dijo con voz bajita."]},
        {"img": svg(ground("seco") + sun(680, 90, 34, "#ffb703") + grass(330, 450, 1.4, mood="sorry", dry=True) + cloud(470, 100, 1.1)
                    + speech(150, 200, "Me equivoqué. Perdón, Clarita"), ("#ffe2b8", "#fff6e6")),
         "alt": "El pasto seco mira hacia una nube y pide perdón",
         "p": "Verdín miró al cielo y entendió su error. No era verde solo por él: el agua, el sol y la tierra lo ayudaban cada día.",
         "d": ["—Me equivoqué. Perdón, Clarita. ¡Gracias por cuidarme siempre!"]},
        {"img": svg(cloud(120, 70, 1.1, "#cbd5e1") + cloud(460, 60, 1.2, "#d6dee8") + rain() + ground() + grass(380, 450, 1.5, mood="surprised")
                    + drop(560, 320, 0.9, mood="happy"), "lluvia"),
         "alt": "Llueve y el pasto vuelve a ponerse verde",
         "p": "Clarita escuchó las palabras de Verdín desde la nube y sonrió. Bajó con la lluvia, gotita a gotita, y el pasto volvió a ponerse verde.",
         "d": ["—¡Volviste! —exclamó Verdín, feliz."]},
        {"img": svg(ground() + sun() + flowers(8, 14) + grass(320, 450, 1.4, mood="happy") + drop(470, 410, 0.9, mood="love")
                    + speech(200, 190, "¡Gracias, Clarita!")),
         "alt": "El pasto verde y la gota de agua juntos en un prado lleno de flores",
         "p": "Desde ese día, Verdín le daba las gracias a Clarita cada mañana. El prado se llenó de flores y todos crecían felices juntos.",
         "d": ["—¡Gracias, Clarita! Juntos el prado es más bonito."]},
    ],
    "msg": "Dar las gracias nos hace humildes. Nadie crece solo: siempre hay alguien que nos ayuda, y agradecer hace felices a todos.",
}

# ------------------------------------------------------------------ 06
MANGO = "#ffb627"
STORIES[6] = {
    "title": "El Tigre, el Gato y el Perro", "emoji": "🐯",
    "scenes": [
        {"img": svg(ground() + sun() + tree(640, 470, 1.25, fruit=MANGO) + tiger(110, 450, 0.9, mood="proud") + cat(310, 450, 1.0, mood="proud")
                    + dog(450, 455, 1.0, mood="proud") + speech(120, 170, "¡Yo soy el mejor!")),
         "alt": "Un tigre, un gato y un perro discuten junto a un árbol de mangos",
         "p": "Un tigre, un gato y un perro vieron un árbol lleno de mangos dulces. Los tres los querían, y cada uno decía que era el mejor para conseguirlos.",
         "d": ["—¡Yo soy el más fuerte! —dijo el tigre.", "—¡Yo trepo mejor! —dijo el gato.", "—¡Yo tengo el mejor olfato! —dijo el perro."]},
        {"img": svg(ground() + sun() + tree(470, 470, 1.25, fruit=MANGO) + tiger(330, 455, 1.0, mood="angry") + word(200, 230, "¡Uff!", 40, "#c2410c")
                    + speech(520, 170, "¡No se caen!")),
         "alt": "El tigre empuja el árbol, pero los mangos no caen",
         "p": "Primero, el tigre empujó el árbol con toda su fuerza. El tronco se movió un poquito, pero ningún mango cayó.",
         "d": ["—¡No se caen! —gruñó el tigre."]},
        {"img": svg(ground() + sun() + tree(450, 470, 1.25, fruit=MANGO) + cat(470, 330, 0.8, mood="scared") + dog(230, 460, 0.9, mood="worried")
                    + speech(520, 170, "¡Está muy alto!")),
         "alt": "El gato trepa el árbol, pero las ramas altas son muy delgadas",
         "p": "Luego, el gato trepó por el tronco. Pero las ramas de arriba eran muy delgadas y se movían. ¡Tuvo miedo de caerse!",
         "d": ["—¡Está muy alto y las ramas tiemblan! —maulló el gato."]},
        {"img": svg(ground() + sun() + tree(660, 470, 1.15, fruit=MANGO) + tiger(130, 455, 0.85, mood="surprised") + cat(300, 455, 0.9, mood="surprised")
                    + dog(430, 460, 1.0, mood="talk") + speech(250, 180, "¿Y si trabajamos juntos?")),
         "alt": "El perro propone trabajar en equipo y los demás lo escuchan",
         "p": "El perro olfateó el aire y tuvo una idea. Ninguno podía solo, pero tal vez juntos sí.",
         "d": ["—¿Y si trabajamos juntos? —preguntó el perro."]},
        {"img": svg(ground() + sun() + tree(470, 470, 1.25, fruit=MANGO) + tiger(330, 455, 1.0, mood="brave") + cat(400, 340, 0.85, mood="happy")
                    + dog(620, 460, 0.95, mood="happy") + word(170, 260, "¡Arriba!", 36, "#7c3aed")),
         "alt": "El gato se sube sobre el tigre para alcanzar los mangos y el perro los recibe",
         "p": "El perro encontró los mangos más dulces con su olfato. El tigre se paró firme como una escalera, el gato subió en su espalda y alcanzó la rama. ¡Los mangos cayeron uno a uno!",
         "d": ["—¡Lo logramos! —gritaron los tres."]},
        {"img": svg(ground() + sun() + tree(680, 470, 1.0) + tiger(140, 455, 0.85, mood="laugh") + cat(330, 460, 0.9, mood="happy")
                    + dog(470, 465, 0.9, mood="happy") + "".join(f'<circle cx="{x}" cy="470" r="13" fill="{MANGO}"/>' for x in (270, 300, 410, 430, 560))
                    + speech(200, 180, "¡Juntos somos los mejores!")),
         "alt": "El tigre, el gato y el perro comparten los mangos felices",
         "p": "Los tres amigos se sentaron a compartir los mangos. Entendieron que cada uno era bueno en algo distinto, y que juntos eran el mejor equipo.",
         "d": ["—¡Juntos somos los mejores! —dijo el tigre riendo."]},
    ],
    "msg": "Cada uno tiene algo especial para aportar. Cuando trabajamos en equipo y unimos lo mejor de cada uno, logramos lo que solos no podemos.",
}

# ------------------------------------------------------------------ 07
HILL = '<path d="M500 300 Q640 150 800 220 L800 500 L500 500 Z" fill="#a7e08f"/>' + "".join(flower(x, y, c, 1.1) for x, y, c in [(600, 230, "#ff8fbf"), (660, 210, "#ffd23f"), (720, 220, "#c4b5fd"), (640, 260, "#ffffff"), (700, 250, "#ff8fbf")])
STORIES[7] = {
    "title": "La Tortuga y el Colibrí", "emoji": "🐢",
    "scenes": [
        {"img": svg(ground() + sun(120, 85) + HILL + hummingbird(420, 220, 1.3, mood="happy") + turtle(220, 450, 1.0, mood="calm")
                    + speech(260, 110, "¡Vamos a la colina de flores!")),
         "alt": "Un colibrí vuela rápido hacia la colina y una tortuga camina despacio",
         "p": "Zum era un colibrí que volaba muy rápido. Su amiga Paz era una tortuga que caminaba despacito. A Zum le encantaba ir a la colina de las flores.",
         "d": ["—¡Vamos, Paz! ¡A la colina de las flores! —dijo Zum."]},
        {"img": svg(ground() + sun(120, 85) + HILL + hummingbird(400, 230, 1.3, mood="angry") + turtle(220, 450, 1.0, mood="sad")
                    + speech(200, 120, "¡Nunca quieres venir!")),
         "alt": "El colibrí se enoja porque la tortuga no lo acompaña",
         "p": "Paz quería ir, pero la colina estaba muy lejos para sus patitas. Zum no lo entendió y se enojó con ella.",
         "d": ["—¡Nunca quieres venir conmigo! —protestó Zum.", "—Es que para mí el camino es muy largo… —respondió Paz."]},
        {"img": svg(cloud(100, 70, 1.1, "#cbd5e1") + cloud(450, 60, 1.2, "#d6dee8") + rain(5) + ground() + hummingbird(420, 440, 1.2, mood="sad"), "lluvia"),
         "alt": "Llueve y el colibrí queda en el suelo con las alas mojadas",
         "p": "Zum se fue volando solo, pero empezó a llover. Sus alitas se mojaron tanto que no podía volar, y tuvo que quedarse en el suelo.",
         "d": ["—¡No puedo volar! El camino se ve tan largo desde aquí abajo…"]},
        {"img": svg(cloud(500, 60, 1.0, "#d6dee8") + ground() + hummingbird(530, 440, 1.1, mood="surprised") + turtle(330, 455, 1.1, mood="happy")
                    + speech(160, 200, "Súbete a mi caparazón"), "nublado"),
         "alt": "La tortuga llega y le ofrece ayuda al colibrí",
         "p": "Despacito, despacito, llegó Paz. Había caminado bajo la lluvia para buscar a su amigo.",
         "d": ["—Súbete a mi caparazón, Zum. Yo te llevo —le dijo con cariño."]},
        {"img": svg(ground() + sun(120, 85) + HILL + turtle(380, 455, 1.2, mood="happy") + hummingbird(380, 365, 0.8, mood="sorry")
                    + speech(120, 170, "Ahora entiendo cómo te sientes")),
         "alt": "El colibrí va sobre el caparazón de la tortuga camino a la colina",
         "p": "Mientras viajaba sobre el caparazón, Zum miró el camino largo y empinado. Por fin entendió por qué Paz no podía ir rápido.",
         "d": ["—Perdón, Paz. Ahora entiendo cómo te sientes —dijo Zum."]},
        {"img": svg(ground() + sun() + HILL + flowers(4, 16) + turtle(520, 300, 0.9, mood="happy") + hummingbird(660, 200, 1.0, mood="love")
                    + speech(60, 190, "Te esperaré siempre")),
         "alt": "La tortuga y el colibrí felices en la colina llena de flores",
         "p": "Cuando llegaron a la colina, Zum le trajo a Paz las flores más bonitas. Desde entonces, cuando salían juntos, Zum volaba despacito a su lado.",
         "d": ["—Te esperaré siempre, amiga —prometió Zum."]},
    ],
    "msg": "Ponerse en el lugar del otro nos ayuda a comprenderlo. Cuando entendemos cómo se sienten los demás, somos mejores amigos.",
}

# ------------------------------------------------------------------ 08
def castle(x=430, y=470, broken=False):
    if broken:
        return "".join(f'<rect x="{x + dx}" y="{y + dy}" width="22" height="16" rx="4" fill="#fb7185" transform="rotate({r} {x + dx} {y + dy})"/>' for dx, dy, r in [(-50, -10, 20), (-10, -6, -30), (30, -12, 45), (60, -4, 10), (0, -24, 70)])
    return (f'<rect x="{x - 50}" y="{y - 60}" width="100" height="60" rx="6" fill="#fb7185"/><rect x="{x - 64}" y="{y - 90}" width="30" height="90" rx="5" fill="#f43f5e"/>'
            f'<rect x="{x + 34}" y="{y - 90}" width="30" height="90" rx="5" fill="#f43f5e"/><rect x="{x - 14}" y="{y - 34}" width="28" height="34" rx="12" fill="#9f1239"/>')

POND = '<rect x="230" y="330" width="560" height="170" rx="60" fill="url(#water)" stroke="#2b8fbf" stroke-width="4"/>'
BALL = '<circle cx="{x}" cy="{y}" r="22" fill="#ef4444"/><path d="M{a} {y} h44" stroke="#fff" stroke-width="5"/>'
STORIES[8] = {
    "title": "El Gorila y el Pez de Cristal", "emoji": "🦍",
    "scenes": [
        {"img": svg(ground() + sun() + POND + castle() + fish(600, 410, 1.2, mood="happy") + gorilla(130, 470, 0.95, mood="happy")
                    + speech(260, 190, "¡Hola! Soy Brillo")),
         "alt": "Un gorila conoce a un pez transparente que vive en un estanque con un castillo",
         "p": "Bruno era un gorila grande y juguetón. Un día conoció a Brillo, un pececito de cristal tan transparente que se veía a través de él. Brillo vivía en un estanque, junto a su castillo de coral.",
         "d": ["—¡Hola! Soy Brillo. ¿Quieres ser mi amigo? —dijo el pez."]},
        {"img": svg(ground() + sun() + POND + castle(broken=True) + fish(640, 420, 1.1, mood="surprised") + gorilla(130, 470, 0.95, mood="scared")
                    + BALL.format(x=430, y=430, a=408) + word(330, 280, "¡PLAF!", 44)),
         "alt": "La pelota del gorila cae al estanque y rompe el castillo de coral",
         "p": "Se hicieron amigos y jugaban todos los días. Pero una tarde, Bruno lanzó su pelota muy fuerte. ¡Plaf! Cayó en el estanque y rompió el castillo de Brillo.",
         "d": ["—¡Uy! —dijo Bruno, y se escondió detrás de un árbol."]},
        {"img": svg(ground() + sun() + POND + castle(broken=True) + fish(560, 420, 1.2, mood="sad") + gorilla(130, 470, 0.95, mood="worried")
                    + speech(260, 190, "Fue… el viento")),
         "alt": "El pez está triste por su castillo y el gorila dice que fue el viento",
         "p": "Brillo encontró su castillo roto y se puso muy triste. Le preguntó a Bruno si sabía qué había pasado.",
         "d": ["—¿Quién rompió mi castillo? —preguntó Brillo.", "—Fue… el viento —dijo Bruno, sin mirarlo."]},
        {"img": svg(ground("noche") + moon() + stars(6) + gorilla(380, 470, 1.0, mood="sad") + speech(200, 200, "Tengo el corazón pesado"), "noche"),
         "alt": "De noche, el gorila no puede dormir porque se siente mal",
         "p": "Esa noche, Bruno no podía dormir. Sentía el corazón pesado, como si llevara una piedra adentro. Sabía que no había dicho la verdad.",
         "d": ["—Tengo el corazón pesado… —murmuró Bruno."]},
        {"img": svg(ground() + sun(120, 85) + POND + castle(broken=True) + fish(600, 410, 1.1, mood="surprised")
                    + gorilla(160, 470, 0.95, mood="sorry") + speech(250, 190, "Fui yo. Perdóname"), "amanecer"),
         "alt": "Por la mañana, el gorila le dice la verdad al pez",
         "p": "Al amanecer, Bruno fue al estanque. Respiró hondo y le contó toda la verdad a Brillo.",
         "d": ["—Fui yo. Mi pelota rompió tu castillo. Perdóname por mentirte."]},
        {"img": svg(ground() + sun() + POND + castle() + fish(600, 400, 1.2, mood="love") + gorilla(150, 470, 0.95, mood="happy")
                    + speech(250, 190, "La verdad nos une más")),
         "alt": "El gorila y el pez reconstruyen juntos el castillo",
         "p": "Brillo lo perdonó y juntos construyeron un castillo nuevo, todavía más bonito. Su amistad se volvió tan clara y fuerte como el cristal.",
         "d": ["—Gracias por decirme la verdad, Bruno. La verdad nos une más —dijo Brillo."]},
    ],
    "msg": "Decir la verdad, aunque nos equivoquemos, es el mejor camino. La honestidad hace que la amistad sea fuerte y que podamos confiar unos en otros.",
}

# ------------------------------------------------------------------ 09
MAP = '<g transform="translate(230 330) rotate(-8)"><rect x="0" y="0" width="70" height="50" rx="4" fill="#fde68a" stroke="#b7791f" stroke-width="3"/><path d="M10 38 q20 -30 50 -20" stroke="#ef4444" stroke-width="3" stroke-dasharray="5 4" fill="none"/></g>'
WATERFALL = ('<rect x="560" y="100" width="240" height="330" fill="#7c8a9a"/><rect x="620" y="100" width="110" height="340" fill="#7fd3ff"/>'
             '<path d="M630 120 v300 M660 110 v320 M700 120 v300" stroke="#e0f7ff" stroke-width="6" opacity=".8"/>'
             + "".join(f'<path d="M520 {300 - i * 12} Q680 {120 - i * 12} 800 {250 - i * 12}" stroke="{c}" stroke-width="12" fill="none" opacity=".75"/>' for i, c in enumerate(["#ef4444", "#f97316", "#facc15", "#22c55e", "#3b82f6", "#8b5cf6"])))
STORIES[9] = {
    "title": "La Piedra que Señalaba el Camino", "emoji": "🪨", "category": "Cuentos de aventura",
    "scenes": [
        {"img": svg(ground() + sun() + tree(80, 420, 0.9) + tree(720, 420, 0.95) + girl(320, 460, 1.0, mood="happy", arm_up=True) + MAP.replace("translate(230 330)", "translate(350 330)")
                    + dog(470, 465, 0.85, mood="happy") + speech(180, 170, "¡A buscar la cascada!")),
         "alt": "Una niña con un mapa y su perro empiezan una aventura en el bosque",
         "p": "Ana y su perrito Bolita encontraron un mapa viejo. Decía que en el bosque había una cascada con un arcoíris. ¡Se fueron de aventura!",
         "d": ["—¡Vamos, Bolita! ¡A buscar la cascada del arcoíris! —dijo Ana."]},
        {"img": svg(ground() + sun() + tree(90, 420, 0.9) + rock(420, 440, 1.3, mood="talk", arrow=True) + '<path d="M270 400 h-60 l12 -12 M210 400 l12 12" stroke="#ff9600" stroke-width="7" fill="none" stroke-linecap="round"/>'
                    + girl(180, 470, 0.85, mood="surprised") + dog(640, 470, 0.8, mood="surprised") + speech(240, 160, "Uno es corto y otro es seguro")),
         "alt": "Una piedra con cara señala dos caminos distintos",
         "p": "En medio del bosque encontraron una piedra muy especial: ¡podía hablar! Tenía dos flechas que señalaban dos caminos.",
         "d": ["—Hay dos caminos: uno es corto y el otro es seguro. Ustedes deciden —dijo la piedra."]},
        {"img": svg(ground() + river(400, 100) + '<path d="M200 395 L330 415 M470 418 L600 398" stroke="#8a5a3c" stroke-width="12" stroke-linecap="round"/><path d="M330 415 L360 470 M470 418 L440 470" stroke="#8a5a3c" stroke-width="10"/>'
                    + girl(150, 400, 0.85, mood="worried") + dog(70, 410, 0.7, mood="worried") + speech(240, 190, "Es peligroso. Mejor regresamos"), "nublado"),
         "alt": "El camino corto tiene un puente roto sobre un río",
         "p": "Primero probaron el camino corto, pero encontraron un puente roto sobre un río muy rápido. Ana lo pensó con calma.",
         "d": ["—Es peligroso. Mejor regresamos y tomamos el camino seguro —decidió."]},
        {"img": svg(ground() + sun() + tree(120, 420, 0.95, fruit="#7c3aed") + tree(650, 420, 0.95) + girl(330, 460, 0.95, mood="happy")
                    + dog(460, 465, 0.85, mood="happy") + speech(220, 170, "Compartimos las moras")),
         "alt": "La niña y el perro descansan y comparten moras en el camino largo",
         "p": "El camino seguro era más largo y se cansaron un poco. Descansaron bajo un árbol de moras y Ana compartió las más dulces con Bolita.",
         "d": ["—Despacio pero seguros, Bolita —dijo Ana."]},
        {"img": svg(ground() + sun() + rock(470, 440, 1.2, mood="happy", arrow=True) + girl(250, 465, 0.95, mood="brave") + dog(110, 470, 0.8, mood="happy")
                    + speech(120, 170, "¿Te rindes o sigues?")),
         "alt": "La piedra vuelve a aparecer y la niña decide seguir",
         "p": "Más adelante, la piedra apareció otra vez. Ana estaba cansada, pero recordó lo que quería encontrar.",
         "d": ["—¿Te rindes o sigues? —preguntó la piedra.", "—¡Sigo! —respondió Ana con fuerza."]},
        {"img": svg(ground() + sun(100, 85) + WATERFALL + girl(260, 465, 1.0, mood="laugh", arm_up=True) + dog(400, 470, 0.9, mood="happy")
                    + rock(100, 470, 0.7, mood="proud")),
         "alt": "La niña y su perro llegan a una cascada con un gran arcoíris",
         "p": "¡Por fin llegaron! Frente a ellos estaba la cascada, con un arcoíris enorme. Ana sonrió: había tomado buenas decisiones en el camino.",
         "d": ["—¡Lo logramos, Bolita! Pensar bien nos trajo hasta aquí."]},
    ],
    "msg": "En la vida elegimos caminos todos los días. Pensar con calma antes de decidir, y no rendirse, nos lleva a lugares maravillosos.",
}

# ------------------------------------------------------------------ 10
STORIES[10] = {
    "title": "El Conejito que Aprendió a Escuchar", "emoji": "🐰",
    "scenes": [
        {"img": svg(ground() + sun() + tree(700, 420, 0.95) + rabbit(400, 450, 1.1, mood="talk") + turtle(180, 460, 0.9, mood="sad")
                    + bird(600, 430, 0.8, mood="sad") + speech(240, 170, "¡Yo, yo, yo primero!")),
         "alt": "Un conejito habla sin parar e interrumpe a sus amigos",
         "p": "Tito era un conejito muy alegre, pero tenía un problema: hablaba todo el tiempo y no dejaba hablar a los demás. Cuando sus amigos contaban algo, él los interrumpía.",
         "d": ["—¡Yo, yo, yo primero! —decía siempre Tito."]},
        {"img": svg(ground() + sun() + owl(200, 460, 1.0, mood="calm") + turtle(360, 465, 0.75, mood="happy") + bird(470, 450, 0.7, mood="happy")
                    + rabbit(640, 455, 0.9, mood="laugh") + speech(80, 160, "Busquen la flor azul junto al lago")),
         "alt": "La maestra búho explica un juego mientras el conejito juega sin escuchar",
         "p": "Un día, la maestra Búho explicó un juego: había que buscar un tesoro. Todos prestaron atención, menos Tito, que estaba jugando con una hoja.",
         "d": ["—Busquen la flor azul junto al lago —explicó la maestra."]},
        {"img": svg(ground("tarde") + sun(650, 150, 40, "#ff9a3c") + tree(120, 430, 1.0, leaf="#3f9c48") + tree(640, 430, 0.9, leaf="#3f9c48")
                    + rabbit(380, 455, 1.0, mood="worried", droopy=True) + speech(240, 180, "¿Dónde estoy?"), "tarde"),
         "alt": "El conejito se pierde en el bosque porque no escuchó",
         "p": "Tito corrió hacia la colina, ¡pero el lago estaba al otro lado! Como no había escuchado, se perdió entre los árboles.",
         "d": ["—¿Dónde estoy? No escuché por dónde había que ir… —dijo asustado."]},
        {"img": svg(ground("tarde") + tree(640, 430, 0.9, leaf="#3f9c48") + rabbit(330, 455, 1.0, mood="calm") + bird(560, 300, 0.7, mood="talk", color="#93c5fd", flying=True)
                    + speech(420, 180, "Por aquí, Tito"), "tarde"),
         "alt": "El conejito se queda en silencio y escucha a un pajarito que lo guía",
         "p": "Tito se quedó quieto y, por primera vez, guardó silencio. Entonces escuchó una vocecita: era su amigo Pío, el pajarito, que lo estaba buscando.",
         "d": ["—Por aquí, Tito. ¡Sígueme! —cantó Pío."]},
        {"img": svg(ground() + sun() + pond(420, 440) + flower(420, 380, "#3b82f6", 2.2) + rabbit(250, 455, 0.95, mood="laugh") + bird(600, 420, 0.7, mood="happy", color="#93c5fd")
                    + turtle(680, 470, 0.7, mood="happy")),
         "alt": "Los amigos encuentran juntos la flor azul junto al lago",
         "p": "Siguiendo la voz de Pío, llegaron al lago. ¡Allí estaba la flor azul! Tito y sus amigos la encontraron juntos.",
         "d": ["—¡Gracias, Pío! Escuchar me ayudó a encontrar el camino."]},
        {"img": svg(ground() + sun() + rabbit(300, 455, 1.1, mood="calm") + turtle(470, 465, 0.9, mood="talk") + bird(620, 440, 0.8, mood="happy")
                    + speech(150, 170, "¿Y tú qué piensas?")),
         "alt": "El conejito ahora escucha con atención a sus amigos",
         "p": "Desde ese día, Tito paraba sus orejas y escuchaba a sus amigos. Descubrió que ellos contaban historias muy divertidas.",
         "d": ["—¿Y tú qué piensas? —le preguntaba ahora Tito a cada amigo."]},
    ],
    "msg": "Escuchar es una forma de respetar a los demás. Cuando dejamos hablar y prestamos atención, aprendemos cosas nuevas y hacemos sentir importantes a nuestros amigos.",
}
