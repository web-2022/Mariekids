"""Cuentos para 1.º de primaria (40–49): 6 escenas, texto para leer solos o acompañados + tarjetas finales."""
from ilustra import *

STORIES = {}


def boy(x, y, s=1.0, flip=False, mood="happy", shirt="#3b82f6", pants="#1e3a8a", hair="#3b2314", skin="#f2c18e", arm_up=False):
    arm = ('<path d="M-20 -78 Q-40 -110 -30 -130" stroke="{k}" stroke-width="11" fill="none" stroke-linecap="round"/>' if arm_up
           else '<path d="M-22 -80 Q-34 -60 -30 -44" stroke="{k}" stroke-width="11" fill="none" stroke-linecap="round"/>').format(k=skin)
    inner = (f'<rect x="-17" y="-46" width="14" height="46" rx="6" fill="{pants}"/><rect x="3" y="-46" width="14" height="46" rx="6" fill="{pants}"/>'
             '<ellipse cx="-11" cy="2" rx="12" ry="6" fill="#111827"/><ellipse cx="11" cy="2" rx="12" ry="6" fill="#111827"/>'
             f'<rect x="-26" y="-96" width="52" height="56" rx="14" fill="{shirt}"/>' + arm +
             f'<path d="M22 -80 Q34 -60 30 -44" stroke="{skin}" stroke-width="11" fill="none" stroke-linecap="round"/>'
             f'<circle cx="0" cy="-120" r="27" fill="{skin}"/>'
             f'<path d="M-27 -124 Q-26 -152 0 -152 Q26 -152 27 -124 Q18 -140 4 -138 Q-12 -142 -27 -124 Z" fill="{hair}"/>'
             + face(0, -116, mood, 0.85))
    return g(x, y, s, flip, inner)


def table(x=400, y=380, w=300, color="#a16207"):
    return (f'<rect x="{x - w / 2}" y="{y}" width="{w}" height="20" rx="8" fill="{color}"/>'
            f'<rect x="{x - w / 2 + 20}" y="{y + 20}" width="16" height="70" fill="#8a5a3c"/><rect x="{x + w / 2 - 36}" y="{y + 20}" width="16" height="70" fill="#8a5a3c"/>')


def board(x=120, y=70, w=260, h=140, text=""):
    return (f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="10" fill="#14532d" stroke="#a16207" stroke-width="10"/>'
            f'<text x="{x + w / 2}" y="{y + h / 2 + 10}" text-anchor="middle" font-family="Comic Neue, Comic Sans MS, sans-serif" font-size="30" font-weight="800" fill="#fff">{text}</text>')


def ball(x, y, r=22, c="#ef4444"):
    return f'<circle cx="{x}" cy="{y}" r="{r}" fill="{c}"/><path d="M{x - r} {y} Q{x} {y - r / 2} {x + r} {y}" stroke="#fff" stroke-width="4" fill="none"/>'


def gafas(x, base, s=1.0):
    """Gafas rosadas sobre la cara de girl(x, base, s)."""
    return g(x, base - 116 * s, s, False, '<circle cx="-13" cy="-2" r="11" fill="#ffffff55" stroke="#ec4899" stroke-width="4"/><circle cx="13" cy="-2" r="11" fill="#ffffff55" stroke="#ec4899" stroke-width="4"/><path d="M-2 -2 h4" stroke="#ec4899" stroke-width="4"/>')


def emoji(x, y, e, size=60):
    return f'<text x="{x}" y="{y}" text-anchor="middle" font-size="{size}">{e}</text>'


CASA = dict(sky="interior")

# ------------------------------------------------------------------ 40
STORIES[40] = {
    "title": "El Lápiz Mágico de Sofía", "emoji": "✏️", "category": "Cuentos con valores",
    "scenes": [
        {"img": svg(floor() + window() + board(90, 60, 300, 150, "2 + 3 = ?") + girl(470, 440, 1.2, mood="happy") + boy(620, 440, 1.1, mood="happy", shirt="#22c55e"), "interior"),
         "alt": "Sofía y Mateo en el salón de clases frente a la pizarra",
         "p": "Sofía estaba en primer grado. Le encantaba ir al colegio, pero las sumas le parecían muy difíciles.",
         "d": ["—Los números se me escapan —le dijo a su amigo Mateo."]},
        {"img": svg(ground() + sun() + girl(300, 455, 1.2, mood="surprised") + emoji(430, 420, "✏️", 70) + sparkles(430, 390, 7, 90), "dia"),
         "alt": "Sofía encuentra en el patio un lápiz que brilla",
         "p": "Un día, en el patio, encontró un lápiz dorado que brillaba. Tenía escrito: «Lápiz mágico».",
         "d": ["—¡Con esto ya no tendré que pensar! —dijo Sofía, feliz."]},
        {"img": svg(floor() + girl(400, 440, 1.0, mood="laugh") + table(400, 360, 320) + emoji(470, 350, "✏️", 40) + word(400, 120, "¡10 de 10!", 46, "#16a34a"), "interior"),
         "alt": "Sofía hace su tarea con el lápiz y saca diez de diez",
         "p": "Esa tarde hizo su tarea con el lápiz dorado. ¡Todas las sumas le salieron bien! Sofía se sintió la niña más lista del mundo.",
         "d": []},
        {"img": svg(floor() + window() + board(90, 60, 300, 150, "4 + 2 = ?") + girl(470, 440, 1.2, mood="worried") + boy(640, 440, 1.0, mood="calm", shirt="#22c55e"), "interior"),
         "alt": "En el examen la profesora pide guardar los lápices de colores y usar solo el lápiz del colegio",
         "p": "Pero al día siguiente hubo un examen. La profesora repartió lápices nuevos para todos.",
         "d": ["—Hoy usaremos estos lápices —dijo la profesora.", "Sofía sintió un nudo en la panza."]},
        {"img": svg(floor() + girl(400, 440, 1.0, mood="calm") + table(400, 360, 320) + emoji(320, 352, "🍎🍎🍎🍎", 32) + emoji(480, 352, "🍎🍎", 32) + word(400, 120, "4 + 2 = 6", 46, "#2563eb"), "interior"),
         "alt": "Sofía cuenta manzanas dibujadas para resolver la suma",
         "p": "Sofía respiró hondo. Dibujó cuatro manzanas, luego dos más, y las contó una por una: «uno, dos, tres, cuatro, cinco… ¡seis!».",
         "d": ["—¡Lo hice yo sola! —susurró sonriendo."]},
        {"img": svg(ground() + sun() + girl(300, 455, 1.2, mood="love", arm_up=True) + boy(480, 455, 1.1, mood="laugh", shirt="#22c55e") + emoji(390, 300, "✏️", 50) + heart(390, 230, 1.2), "dia"),
         "alt": "Sofía le cuenta a Mateo que el verdadero truco estaba en ella",
         "p": "Esa tarde Sofía miró el lápiz dorado y entendió algo: el lápiz no era mágico. La magia era practicar, contar con paciencia y creer en ella misma.",
         "d": ["—El mejor lápiz es el que usas tú —le dijo a Mateo."]},
    ],
    "msg": "No hay trucos mágicos: practicar con paciencia y confiar en ti es lo que te hace aprender.",
    "extra": [
        ("💬 Conversemos", ["¿Por qué Sofía creía que el lápiz era mágico?", "¿Cómo resolvió la suma en el examen?", "¿Qué cosa te salió bien porque practicaste?"]),
        ("🎯 Practiquemos en casa", ["Resuelvan juntos 3 sumas dibujando frutas, como Sofía.", "Pinten un «lápiz de campeón» y pónganlo junto al lugar de tareas."]),
        ("👨‍👩‍👧 Para papá y mamá", ["Elogie el esfuerzo («practicaste mucho») más que la inteligencia («qué listo eres»).", "Cuando se equivoque, pregunte «¿cómo lo puedes comprobar?» en lugar de darle la respuesta."]),
    ],
}

# ------------------------------------------------------------------ 41
STORIES[41] = {
    "title": "La Pelota del Vecino", "emoji": "⚽", "category": "Cuentos con valores",
    "scenes": [
        {"img": svg(ground() + sun() + house(600, 190) + fence(0, 800, 380) + boy(250, 455, 1.2, mood="laugh", arm_up=True) + ball(380, 250), "dia"),
         "alt": "Lucas juega con la pelota en el jardín",
         "p": "Lucas jugaba fútbol en su jardín. Pateó tan fuerte que la pelota voló muy alto…", "d": ["—¡Gooool! —gritó."]},
        {"img": svg(ground() + sun() + house(600, 190) + fence(0, 800, 380) + boy(250, 455, 1.2, mood="scared") + emoji(620, 300, "💥", 70) + word(560, 140, "¡CRASH!", 50, "#dc2626"), "dia"),
         "alt": "La pelota rompe la ventana de la casa del vecino",
         "p": "…y ¡CRASH! La pelota rompió la ventana de don Ernesto, el vecino.", "d": ["Lucas se quedó congelado."]},
        {"img": svg(floor() + window() + boy(330, 440, 1.2, mood="worried") + cat(520, 440, 0.9, mood="surprised"), "interior"),
         "alt": "Lucas se esconde en su cuarto preocupado",
         "p": "Corrió a su cuarto y se escondió. «Nadie me vio», pensó. Pero la panza le dolía y no podía dejar de pensar en la ventana rota.",
         "d": ["—Miau —dijo su gato, como si lo supiera todo."]},
        {"img": svg(floor() + window() + boy(300, 440, 1.1, mood="sad") + girl(470, 440, 1.25, mood="calm", dress="#a855f7"), "interior"),
         "alt": "Lucas le cuenta a su mamá lo que pasó",
         "p": "Al final, Lucas buscó a su mamá y le contó la verdad.", "d": ["—Fui yo. Rompí la ventana sin querer.", "—Gracias por decirme la verdad. Ahora vamos a arreglarlo juntos —respondió mamá."]},
        {"img": svg(ground() + sun() + house(560, 190) + boy(250, 455, 1.1, mood="sorry") + boy(400, 455, 1.25, flip=True, mood="calm", shirt="#64748b", hair="#d1d5db") + emoji(330, 300, "🐷", 50), "dia"),
         "alt": "Lucas le pide perdón a don Ernesto y le ofrece sus ahorros",
         "p": "Tocó la puerta de don Ernesto, le pidió perdón y le ofreció las monedas de su chanchito.",
         "d": ["—Perdón, don Ernesto. Fue mi pelota.", "—Eres un niño valiente —dijo el vecino—. Decir la verdad cuesta más que una ventana."]},
        {"img": svg(ground() + sun() + house(560, 190) + boy(260, 455, 1.1, mood="laugh", arm_up=True) + boy(420, 455, 1.2, flip=True, mood="laugh", shirt="#64748b", hair="#d1d5db") + ball(340, 420) + heart(340, 230, 1.2), "dia"),
         "alt": "Lucas y don Ernesto arreglan la ventana y luego juegan juntos",
         "p": "El sábado arreglaron juntos la ventana. Desde ese día, don Ernesto le devuelve la pelota con una sonrisa… y a veces juega con él.",
         "d": []},
    ],
    "msg": "Decir la verdad da miedo, pero nos deja el corazón tranquilo y nos da amigos que confían en nosotros.",
    "extra": [
        ("💬 Conversemos", ["¿Cómo se sentía Lucas cuando se escondió?", "¿Qué hizo para arreglar el problema?", "¿Por qué dijo don Ernesto que Lucas era valiente?"]),
        ("🎯 Practiquemos en casa", ["Jueguen a «¿qué harías tú?» con situaciones pequeñas: se rompe un vaso, se pierde un lápiz…"]),
        ("👨‍👩‍👧 Para papá y mamá", ["Si su hijo confiesa algo, agradézcale primero la verdad y luego hablen de cómo reparar.", "Evite castigos muy duros por decir la verdad: si no, aprenderá a esconder."]),
    ],
}

# ------------------------------------------------------------------ 42
STORIES[42] = {
    "title": "La Gota Viajera", "emoji": "💧", "category": "Cuentos ecológicos",
    "scenes": [
        {"img": svg(cloud(250, 120, 1.6) + cloud(520, 90, 1.2) + drop(260, 230, 1.4, mood="happy") + ground() + tree(650, 380), "nublado"),
         "alt": "Gotita en una nube sobre el campo",
         "p": "Gotita vivía en una nube blanca y esponjosa. Un día la nube se puso pesada y gris…", "d": ["—¡Allá voy! —gritó Gotita, y cayó como lluvia."]},
        {"img": svg(ground() + river() + drop(400, 430, 1.2, mood="laugh") + rock(200, 440, 1.0) + bush(650, 400), "dia"),
         "alt": "Gotita viaja por un río saltando entre piedras",
         "p": "Cayó en una montaña y bajó por un río, saltando entre piedras. ¡Era como un tobogán!", "d": []},
        {"img": svg(ground() + sun() + flowers(9, 12) + drop(400, 300, 1.2, mood="love") + tree(200, 380, fruit="#ef4444") + hen(620, 440, 0.8), "dia"),
         "alt": "Gotita riega las flores y da de beber a los animales",
         "p": "Gotita regó las flores del campo, dio de beber a una gallina sedienta y ayudó a crecer a un manzano.", "d": ["—¡Me encanta ser útil! —dijo."]},
        {"img": svg(floor() + window() + '<rect x="300" y="260" width="40" height="70" fill="#94a3b8"/><path d="M340 280 h40 v20" stroke="#94a3b8" stroke-width="16" fill="none"/>' + drop(390, 360, 0.9, mood="sad") + drop(420, 410, 0.9, mood="sad") + drop(360, 440, 0.9, mood="sad") + girl(580, 440, 1.1, mood="happy", arm_up=True), "interior"),
         "alt": "Un caño abierto en una casa y gotitas tristes que se van sin que nadie las use",
         "p": "Un día llegó por un tubo a una casa. Una niña se cepillaba los dientes… ¡con el caño abierto! Muchas gotitas se iban por el desagüe sin servir para nada.",
         "d": ["—¡Qué pena! —lloró Gotita."]},
        {"img": svg(floor() + window() + '<rect x="300" y="260" width="40" height="70" fill="#94a3b8"/><path d="M340 280 h40 v20" stroke="#94a3b8" stroke-width="16" fill="none"/>' + emoji(395, 360, "🥛", 60) + girl(560, 440, 1.1, mood="surprised") + speech(420, 120, "¡Cierra el caño, por favor!"), "interior"),
         "alt": "La niña cierra el caño y usa un vaso",
         "p": "Gotita juntó todas sus fuerzas y gritó. La niña la escuchó, cerró el caño y usó un vasito para enjuagarse.",
         "d": ["—¡Así ahorro agua! —dijo la niña."]},
        {"img": svg(cloud(400, 110, 1.6) + drop(400, 200, 1.3, mood="laugh") + ground() + sun(120, 90) + flowers(4, 12) + girl(560, 455, 1.0, mood="love", arm_up=True), "dia"),
         "alt": "Gotita vuelve a la nube y saluda feliz a la niña",
         "p": "El sol calentó a Gotita y la subió otra vez a su nube. Desde arriba, saludó a la niña, que ahora cuidaba cada gota.",
         "d": ["—¡Gracias por cuidarnos! El agua no es infinita."]},
    ],
    "msg": "El agua viaja y da vida a todos. Cuidarla es tarea de todos, también de los niños.",
    "extra": [
        ("💬 Conversemos", ["¿Por dónde viajó Gotita?", "¿Por qué se puso triste en la casa?", "¿Qué hizo la niña para ayudar?"]),
        ("🎯 Practiquemos en casa", ["Pongan un vasito junto al lavadero para enjuagarse los dientes.", "Hagan una lista de 3 formas de ahorrar agua y péguenla en el baño."]),
        ("👨‍👩‍👧 Para papá y mamá", ["Nombre a su hijo «guardián del agua» de la casa: que les recuerde cerrar el caño.", "Expliquen juntos el ciclo del agua: nube, lluvia, río, casa y otra vez nube."]),
    ],
}

# ------------------------------------------------------------------ 43
STORIES[43] = {
    "title": "El Monstruo de Debajo de la Cama", "emoji": "👾", "category": "Cuentos chistosos",
    "scenes": [
        {"img": svg('<rect x="0" y="380" width="800" height="120" fill="#3b3367"/>' + window(560, 90, night=True) + '<rect x="150" y="300" width="330" height="80" rx="16" fill="#60a5fa"/><rect x="150" y="270" width="80" height="40" rx="12" fill="#fff"/>' + boy(260, 330, 0.7, mood="scared") + word(560, 330, "¿Grrr?", 40, "#a855f7"), "noche"),
         "alt": "Tomás en su cama de noche, asustado por un ruido",
         "p": "Todas las noches, Tomás escuchaba un ruidito debajo de su cama: «grrr… grrr…».", "d": ["—¡Hay un monstruo! —pensaba, y se tapaba hasta las orejas."]},
        {"img": svg('<rect x="0" y="380" width="800" height="120" fill="#3b3367"/>' + window(560, 90, night=True) + '<rect x="150" y="300" width="330" height="80" rx="16" fill="#60a5fa"/>' + boy(270, 330, 0.7, mood="brave") + emoji(300, 250, "🔦", 50) + '<path d="M320 250 L470 200 L470 300 Z" fill="#fff59d" opacity=".6"/>', "noche"),
         "alt": "Tomás toma una linterna para ser valiente",
         "p": "Una noche decidió ser valiente. Agarró su linterna, contó hasta tres y se asomó debajo de la cama.", "d": ["—Uno… dos… ¡tres!"]},
        {"img": svg('<rect x="0" y="380" width="800" height="120" fill="#3b3367"/>' + '<rect x="150" y="300" width="330" height="80" rx="16" fill="#60a5fa"/>' + emoji(330, 470, "👾", 90) + boy(600, 440, 1.0, mood="surprised"), "noche"),
         "alt": "Debajo de la cama hay un monstruito verde pequeño y temblando",
         "p": "¡Ahí había un monstruo! Pero era chiquito, verde… y estaba temblando más que él.", "d": ["—¡Ay, no me alumbres! —chilló el monstruito—. ¡Me dan miedo los niños!"]},
        {"img": svg('<rect x="0" y="380" width="800" height="120" fill="#3b3367"/>' + emoji(330, 460, "👾", 80) + boy(520, 440, 1.0, mood="laugh") + speech(200, 120, "¿Tú tienes miedo de MÍ?"), "noche"),
         "alt": "Tomás se ríe al saber que el monstruo le tiene miedo",
         "p": "Tomás se rió tanto que se le salieron las lágrimas.", "d": ["—¿Tú tienes miedo de mí? ¡Yo tengo miedo de ti!", "—Es que roncas como un león —dijo el monstruito."]},
        {"img": svg('<rect x="0" y="380" width="800" height="120" fill="#3b3367"/>' + emoji(300, 460, "👾", 80) + boy(480, 440, 1.0, mood="happy") + emoji(400, 300, "🍪🥛", 50), "noche"),
         "alt": "Tomás y el monstruo comparten galletas y leche",
         "p": "Se sentaron en la alfombra. El monstruito se llamaba Gruñi y su ruido «grrr» era… ¡su panza con hambre! Tomás le dio una galleta.", "d": []},
        {"img": svg('<rect x="0" y="380" width="800" height="120" fill="#3b3367"/>' + window(560, 90, night=True) + '<rect x="150" y="300" width="330" height="80" rx="16" fill="#60a5fa"/>' + boy(260, 330, 0.7, mood="love") + emoji(400, 300, "👾", 50) + stars(), "noche"),
         "alt": "Tomás duerme tranquilo y Gruñi le cuida el sueño",
         "p": "Desde esa noche, Tomás duerme tranquilo. Cuando escucha «grrr», sonríe y deja una galleta junto a la cama.", "d": ["—Buenas noches, Gruñi.", "—Buenas noches, Tomás… y no ronques tanto."]},
    ],
    "msg": "Muchas veces lo que nos da miedo es más pequeño de lo que imaginamos. Mirarlo de frente nos hace valientes.",
    "extra": [
        ("💬 Conversemos", ["¿Qué hizo Tomás para ser valiente?", "¿Qué era el ruido «grrr» en realidad?", "¿A qué le tienes miedo tú? ¿Qué te ayuda a calmarte?"]),
        ("🎯 Practiquemos en casa", ["Dibuja tu propio monstruo simpático y ponle un nombre.", "Practiquen la respiración del monstruo: inhalar contando 3 y botar el aire diciendo «grrr» bajito."]),
        ("👨‍👩‍👧 Para papá y mamá", ["No se burle de los miedos: nómbrelos y acompáñelo a enfrentarlos poco a poco.", "Una lucecita y una rutina tranquila antes de dormir ayudan mucho."]),
    ],
}

# ------------------------------------------------------------------ 44
STORIES[44] = {
    "title": "El Equipo de los Colores", "emoji": "🏃", "category": "Cuentos con valores",
    "scenes": [
        {"img": svg(ground() + sun() + girl(200, 455, 1.1, mood="happy", dress="#ef4444") + boy(330, 455, 1.1, mood="happy", shirt="#ef4444") + girl(470, 455, 1.1, mood="proud", dress="#3b82f6") + boy(600, 455, 1.1, mood="proud", shirt="#3b82f6") + word(400, 120, "Gran carrera", 44, "#7c3aed"), "dia"),
         "alt": "Dos equipos, rojo y azul, listos para la carrera del colegio",
         "p": "En el colegio de Valentina había una gran carrera de relevos: el equipo rojo contra el equipo azul.", "d": []},
        {"img": svg(ground() + sun() + boy(300, 455, 1.1, mood="angry", shirt="#ef4444") + girl(470, 455, 1.1, mood="sad", dress="#ef4444") + speech(150, 110, "¡Tú corres muy lento!"), "dia"),
         "alt": "Pablo le grita a Valentina porque corre lento",
         "p": "En el equipo rojo estaba Pablo, el más rápido. Pero cuando practicaban, se enojaba con los demás.", "d": ["—¡Valentina, corres muy lento! ¡Por tu culpa vamos a perder!"]},
        {"img": svg(ground() + sun() + girl(300, 455, 1.1, mood="sad", dress="#ef4444") + girl(470, 455, 1.25, mood="calm", dress="#22c55e") + speech(300, 110, "Cada uno es bueno en algo"), "dia"),
         "alt": "La profesora consuela a Valentina",
         "p": "Valentina se fue a una esquina con los ojos llenos de lágrimas. La profesora Rosa se sentó a su lado.",
         "d": ["—Cada uno es bueno en algo —le dijo—. Tú eres la mejor dando ánimos."]},
        {"img": svg(ground() + sun() + boy(250, 455, 1.1, mood="sad", shirt="#ef4444") + emoji(330, 420, "🩹", 40) + girl(450, 455, 1.1, mood="brave", dress="#ef4444", arm_up=True) + word(560, 140, "¡Tú puedes!", 44, "#16a34a"), "dia"),
         "alt": "Pablo se cae en la carrera y Valentina lo anima",
         "p": "El día de la carrera, Pablo tropezó y se raspó la rodilla. Todos se quedaron callados… menos Valentina.", "d": ["—¡Arriba, Pablo! ¡Tú puedes! ¡Somos un equipo!"]},
        {"img": svg(ground() + sun() + boy(250, 455, 1.1, mood="brave", shirt="#ef4444") + girl(420, 455, 1.1, mood="laugh", dress="#ef4444", arm_up=True) + boy(560, 455, 1.0, mood="laugh", shirt="#ef4444", arm_up=True), "dia"),
         "alt": "Todo el equipo rojo anima y Pablo termina la carrera",
         "p": "Todo el equipo rojo empezó a gritar con ella. Pablo se levantó y terminó su parte. Llegaron segundos… ¡pero muy felices!", "d": []},
        {"img": svg(ground() + sun() + boy(300, 455, 1.1, mood="sorry", shirt="#ef4444") + girl(460, 455, 1.1, mood="love", dress="#ef4444") + heart(380, 220, 1.3), "dia"),
         "alt": "Pablo le pide perdón a Valentina y le da las gracias",
         "p": "Después, Pablo se acercó a Valentina.", "d": ["—Perdón por gritarte. Tus ánimos me ayudaron a levantarme.", "—En un equipo todos sumamos —sonrió Valentina."]},
    ],
    "msg": "En un equipo todos son importantes. Animar y respetar a los demás vale tanto como ganar.",
    "extra": [
        ("💬 Conversemos", ["¿Cómo se sintió Valentina cuando Pablo le gritó?", "¿En qué era buena Valentina?", "¿Qué aprendió Pablo?"]),
        ("🎯 Practiquemos en casa", ["Inventen un grito de equipo para la familia.", "Cada uno diga en qué es bueno otro miembro de la familia."]),
        ("👨‍👩‍👧 Para papá y mamá", ["Valore los distintos talentos de su hijo, no solo ganar.", "Cuando pierda, felicítelo por el esfuerzo y por cómo trató a los demás."]),
    ],
}

# ------------------------------------------------------------------ 45
STORIES[45] = {
    "title": "Martina y el Mercado de los Números", "emoji": "🛒", "category": "Cuentos de aventura",
    "scenes": [
        {"img": svg(ground() + sun() + girl(260, 455, 1.15, mood="happy", dress="#f59e0b") + girl(420, 455, 1.3, mood="calm", dress="#64748b", hair="#d1d5db") + emoji(560, 410, "🧺", 70), "dia"),
         "alt": "Martina y su abuela van al mercado con una canasta",
         "p": "El sábado, Martina acompañó a su abuela Carmen al mercado. Llevaban una canasta y diez soles.", "d": ["—Hoy tú serás la encargada de las cuentas —dijo la abuela."]},
        {"img": svg(ground() + sun() + table(400, 330, 420, "#d97706") + emoji(300, 320, "🍌🍌🍌", 44) + emoji(500, 320, "🍅🍅", 44) + girl(250, 455, 1.0, mood="surprised", dress="#f59e0b") + word(400, 120, "S/ 3 + S/ 2", 44, "#2563eb"), "dia"),
         "alt": "Puesto del mercado con plátanos y tomates y sus precios",
         "p": "Compraron plátanos por 3 soles y tomates por 2 soles. Martina contó con los dedos.", "d": ["—Tres más dos… ¡son cinco soles!"]},
        {"img": svg(ground() + sun() + girl(280, 455, 1.0, mood="happy", dress="#f59e0b") + emoji(420, 380, "🪙🪙🪙🪙🪙", 40) + word(420, 140, "10 − 5 = 5", 46, "#16a34a"), "dia"),
         "alt": "Martina cuenta las monedas que les quedan",
         "p": "—Abuela, teníamos diez soles. Si gastamos cinco… ¡nos quedan cinco!", "d": ["—¡Muy bien, mi contadora!"]},
        {"img": svg(ground() + sun() + table(400, 330, 420, "#d97706") + emoji(330, 320, "🍞🍞🍞🍞", 40) + girl(250, 455, 1.0, mood="worried", dress="#f59e0b") + boy(560, 455, 1.2, flip=True, mood="happy", shirt="#f97316"), "dia"),
         "alt": "El panadero le da el vuelto equivocado",
         "p": "Luego compraron cuatro panes a un sol cada uno. Pagaron con cinco soles, pero el panadero les devolvió… ¡dos soles!", "d": ["Martina frunció la frente y volvió a contar."]},
        {"img": svg(ground() + sun() + girl(280, 455, 1.0, mood="brave", dress="#f59e0b", arm_up=True) + boy(520, 455, 1.2, flip=True, mood="surprised", shirt="#f97316") + speech(150, 110, "Señor, nos dio un sol de más"), "dia"),
         "alt": "Martina devuelve el sol de más al panadero",
         "p": "—Señor, cuatro panes cuestan cuatro soles. Pagamos cinco, así que el vuelto es un sol. ¡Nos dio uno de más!",
         "d": ["—¡Qué niña tan honesta y tan buena con los números! —dijo el panadero, y le regaló un pan de yema."]},
        {"img": svg(ground() + sun(120, 90) + girl(300, 455, 1.0, mood="laugh", dress="#f59e0b") + girl(450, 455, 1.3, mood="love", dress="#64748b", hair="#d1d5db") + emoji(380, 300, "🥐", 50) + heart(380, 230, 1.2), "dia"),
         "alt": "Martina y su abuela vuelven a casa felices compartiendo el pan",
         "p": "De regreso, Martina y su abuela compartieron el pan de yema.", "d": ["—Los números sirven para todo, abuela.", "—Y la honestidad, para que todos confíen en ti."]},
    ],
    "msg": "Las matemáticas nos ayudan todos los días. Y ser honestos, aunque nadie se dé cuenta, nos hace personas de confianza.",
    "extra": [
        ("💬 Conversemos", ["¿Cuánto gastaron en plátanos y tomates?", "¿Cuánto vuelto debía dar el panadero?", "¿Por qué Martina devolvió el sol?"]),
        ("🎯 Practiquemos en casa", ["Jueguen a la tiendita con monedas de verdad: uno compra y el otro da el vuelto.", "En la próxima compra, que su hijo cuente cuánto cuesta todo."]),
        ("👨‍👩‍👧 Para papá y mamá", ["Involúcrelo en compras reales pequeñas: es la mejor práctica de suma y resta.", "Felicítelo cuando devuelva lo que no es suyo."]),
    ],
}

# ------------------------------------------------------------------ 46
STORIES[46] = {
    "title": "El Búho que No Podía Dormir", "emoji": "🦉", "category": "Cuentos con valores",
    "scenes": [
        {"img": svg(stars() + moon() + tree(400, 470, 1.6) + owl(400, 250, 1.0, mood="worried"), "noche"),
         "alt": "Un búho preocupado en su árbol de noche",
         "p": "Bruno el búho tenía un problema: mañana era su primer día en la Escuela del Bosque y no podía dormir.", "d": ["—¿Y si nadie quiere jugar conmigo? —pensaba."]},
        {"img": svg(stars() + moon() + tree(400, 470, 1.6) + owl(330, 250, 0.9, mood="worried") + owl(470, 240, 1.1, mood="calm"), "noche"),
         "alt": "La abuela búho se acerca a Bruno",
         "p": "Su abuela Olga lo escuchó dar vueltas y se acercó.", "d": ["—Cuando estoy nerviosa, hago tres cosas —le dijo—: respiro, pienso en algo bonito y me digo «yo puedo»."]},
        {"img": svg(stars() + moon() + tree(400, 470, 1.6) + owl(400, 250, 1.0, mood="calm") + cloud(250, 150, 0.8) + cloud(560, 160, 0.8), "noche"),
         "alt": "Bruno respira profundo con los ojos cerrados",
         "p": "Bruno infló su pecho como un globo, contó hasta tres y botó el aire despacito, como si soplara una vela. Una, dos, tres veces.", "d": []},
        {"img": svg(ground() + sun() + tree(150, 400) + owl(330, 330, 0.9, mood="worried") + rabbit(520, 440, 0.8, mood="sad") + turtle(660, 440, 0.8, mood="sad"), "dia"),
         "alt": "En la escuela Bruno ve a otros animalitos también nerviosos",
         "p": "Al día siguiente, en la escuela, Bruno vio a una conejita escondida detrás de su mochila y a una tortuga metida en su caparazón.", "d": ["«Ellos también tienen miedo», pensó."]},
        {"img": svg(ground() + sun() + tree(150, 400) + owl(330, 330, 0.9, mood="brave") + rabbit(520, 440, 0.8, mood="surprised") + turtle(660, 440, 0.8, mood="happy") + speech(330, 110, "¿Respiramos juntos?"), "dia"),
         "alt": "Bruno les enseña a respirar a sus nuevos compañeros",
         "p": "Bruno respiró hondo, se acercó y les enseñó el truco de su abuela.", "d": ["—¿Respiramos juntos? Uno, dos, tres… ¡yo puedo!"]},
        {"img": svg(ground() + sun() + tree(150, 400) + owl(330, 300, 0.9, mood="laugh") + rabbit(500, 440, 0.8, mood="laugh") + turtle(650, 440, 0.8, mood="laugh") + sparkles(480, 250, 7, 160), "dia"),
         "alt": "Bruno, la conejita y la tortuga juegan felices",
         "p": "Al final del día, Bruno tenía dos amigos nuevos. Esa noche durmió tan profundo que roncaba: «uuuh… uuuh…».", "d": []},
    ],
    "msg": "Sentir nervios es normal. Respirar, pensar en algo bonito y decirnos «yo puedo» nos ayuda… y también podemos ayudar a otros.",
    "extra": [
        ("💬 Conversemos", ["¿Por qué Bruno no podía dormir?", "¿Cuáles fueron los tres consejos de la abuela?", "¿Cómo ayudó Bruno a sus compañeros?"]),
        ("🎯 Practiquemos en casa", ["Practiquen la respiración del globo: inflar la panza contando 3 y soplar la vela despacito.", "Antes de dormir, cada uno diga algo bonito del día."]),
        ("👨‍👩‍👧 Para papá y mamá", ["Valide la emoción: «es normal estar nervioso», antes de dar soluciones.", "Practiquen la respiración cuando estén tranquilos, así la recordará cuando la necesite."]),
    ],
}

# ------------------------------------------------------------------ 47
STORIES[47] = {
    "title": "Las Gafas de Ana", "emoji": "👓", "category": "Cuentos con valores",
    "scenes": [
        {"img": svg(floor() + window() + board(90, 60, 300, 150, "LA CASA") + girl(480, 440, 1.2, mood="worried", dress="#a855f7"), "interior"),
         "alt": "Ana no puede leer bien la pizarra",
         "p": "Ana entrecerraba los ojos para leer la pizarra. Las letras le parecían manchitas borrosas.", "d": ["—¿Dice «la cosa»? —preguntó, y algunos se rieron."]},
        {"img": svg(floor() + '<circle cx="400" cy="200" r="90" fill="#fff" stroke="#334155" stroke-width="6"/><text x="400" y="175" text-anchor="middle" font-size="50" font-weight="800">E</text><text x="400" y="230" text-anchor="middle" font-size="28" font-weight="800">F P</text>' + girl(250, 440, 1.1, mood="calm", dress="#a855f7") + boy(580, 440, 1.2, flip=True, mood="happy", shirt="#fff"), "interior"),
         "alt": "Ana en el consultorio del doctor de los ojos",
         "p": "Su mamá la llevó al doctor de los ojos. Después de mirar muchas letras, el doctor sonrió.", "d": ["—Ana necesita gafas. ¡Con ellas verá todo clarito!"]},
        {"img": svg(floor() + window() + girl(400, 440, 1.3, mood="sad", dress="#a855f7") + gafas(400, 440, 1.3), "interior"),
         "alt": "Ana se mira al espejo con sus gafas nuevas, triste",
         "p": "Las gafas eran rosadas y brillantes, pero Ana se miró al espejo y se puso triste.", "d": ["—Se van a burlar de mí… —susurró."]},
        {"img": svg(floor() + window() + girl(300, 440, 1.2, mood="worried", dress="#a855f7") + gafas(300, 440, 1.2) + boy(470, 440, 1.1, mood="laugh", shirt="#f97316") + boy(620, 440, 1.0, mood="surprised", shirt="#22c55e") + speech(400, 110, "¡Cuatro ojos!"), "interior"),
         "alt": "Un compañero se burla de Ana y otro lo mira sorprendido",
         "p": "En el colegio, un niño gritó: «¡Cuatro ojos!». Ana quiso esconderse. Pero entonces habló Diego.", "d": ["—¿Y qué? Mi papá usa gafas y es piloto de avión. ¡Ve mejor que nadie!"]},
        {"img": svg(floor() + window() + board(90, 60, 300, 150, "LA CASA") + girl(480, 440, 1.2, mood="laugh", dress="#a855f7", arm_up=True) + gafas(480, 440, 1.2) + word(560, 130, "¡LA CASA!", 40, "#16a34a"), "interior"),
         "alt": "Ana lee la pizarra perfectamente con sus gafas",
         "p": "Ana se acomodó las gafas y miró la pizarra. ¡Todo se veía clarito!", "d": ["—¡Dice «LA CASA»! —leyó en voz alta, sin equivocarse."]},
        {"img": svg(ground() + sun() + girl(260, 455, 1.1, mood="love", dress="#a855f7") + gafas(260, 455, 1.1) + boy(400, 455, 1.0, mood="happy", shirt="#22c55e") + boy(540, 455, 1.0, mood="sorry", shirt="#f97316") + heart(400, 230, 1.2), "dia"),
         "alt": "El niño que se burló pide perdón y juegan los tres",
         "p": "En el recreo, el niño que se había burlado se acercó.", "d": ["—Perdón, Ana. Tus gafas son muy bonitas.", "—Gracias. ¿Jugamos? Ahora veo la pelota mejor que nunca."]},
    ],
    "msg": "Todos somos diferentes, y eso está bien. Respetar a los demás y defender a quien se burlan nos hace buenos amigos.",
    "extra": [
        ("💬 Conversemos", ["¿Por qué Ana necesitaba gafas?", "¿Qué hizo Diego cuando se burlaron de Ana?", "¿Qué harías tú si alguien se burla de un compañero?"]),
        ("🎯 Practiquemos en casa", ["Jueguen a «lo que me hace especial»: cada uno dice algo único de sí mismo.", "Practiquen una frase para defender a un amigo: «Eso no es bonito. Para, por favor»."]),
        ("👨‍👩‍👧 Para papá y mamá", ["Si su hijo usa gafas, frenillos u otra ayuda, preséntelo como algo positivo.", "Enséñele a contarle a un adulto si alguien lo molesta o molesta a otros."]),
    ],
}

# ------------------------------------------------------------------ 48
STORIES[48] = {
    "title": "La Semilla de Inti", "emoji": "🌱", "category": "Cuentos ecológicos",
    "scenes": [
        {"img": svg(ground() + sun() + house(600, 190) + boy(280, 455, 1.15, mood="surprised", shirt="#eab308") + boy(420, 455, 1.3, mood="happy", shirt="#64748b", hair="#d1d5db") + emoji(350, 330, "🌰", 40), "dia"),
         "alt": "El abuelo le da una semilla a Inti",
         "p": "El abuelo de Inti le regaló una semilla de palta.", "d": ["—Si la cuidas, algún día te dará sombra y frutos —le dijo."]},
        {"img": svg(ground() + sun() + boy(300, 455, 1.15, mood="happy", shirt="#eab308") + '<path d="M420 430 h90 l-12 50 h-66 Z" fill="#c2410c"/>' + emoji(465, 425, "🌰", 30) + emoji(560, 420, "🚿", 46), "dia"),
         "alt": "Inti planta la semilla en una maceta y la riega",
         "p": "Inti la plantó en una maceta, le echó agua y la puso al sol. Todos los días la miraba.", "d": ["—¡Crece, semillita!"]},
        {"img": svg(ground() + sun() + boy(300, 455, 1.15, mood="angry", shirt="#eab308") + '<path d="M420 430 h90 l-12 50 h-66 Z" fill="#c2410c"/>' + word(465, 330, "?", 60, "#64748b"), "dia"),
         "alt": "Inti está molesto porque no sale nada de la maceta",
         "p": "Pasó un día, dos días, cinco días… ¡y nada! Inti se enojó.", "d": ["—¡Esta semilla no sirve! —dijo, y quiso botarla."]},
        {"img": svg(ground() + sun() + boy(280, 455, 1.15, mood="calm", shirt="#eab308") + boy(430, 455, 1.3, mood="calm", shirt="#64748b", hair="#d1d5db") + speech(170, 110, "Las cosas buenas tardan"), "dia"),
         "alt": "El abuelo le explica a Inti que hay que tener paciencia",
         "p": "El abuelo lo detuvo con una sonrisa.", "d": ["—Debajo de la tierra la semilla está trabajando. Las cosas buenas tardan, como cuando aprendiste a montar bicicleta."]},
        {"img": svg(ground() + sun() + boy(300, 455, 1.15, mood="laugh", shirt="#eab308", arm_up=True) + '<path d="M420 430 h90 l-12 50 h-66 Z" fill="#c2410c"/>' + '<path d="M465 430 v-40" stroke="#16a34a" stroke-width="6"/><ellipse cx="452" cy="392" rx="14" ry="7" fill="#22c55e"/><ellipse cx="478" cy="386" rx="14" ry="7" fill="#22c55e"/>' + sparkles(465, 370, 5, 60), "dia"),
         "alt": "Aparece un brotecito verde en la maceta",
         "p": "Inti siguió regando con paciencia. Y una mañana… ¡apareció un brotecito verde!", "d": ["—¡Abuelo, abuelo! ¡Está viva!"]},
        {"img": svg(ground() + sun() + tree(470, 420, 1.5, fruit="#4d7c0f") + boy(250, 455, 1.2, mood="love", shirt="#eab308") + girl(330, 455, 0.8, mood="happy", dress="#f472b6"), "dia"),
         "alt": "Años después, Inti, ya grande, descansa bajo el palto con su hermanita",
         "p": "Pasaron los años. El palto creció grande y fuerte. Ahora Inti descansa bajo su sombra y le regala una semilla a su hermanita.", "d": ["—Si la cuidas con paciencia, algún día te dará sombra y frutos."]},
    ],
    "msg": "Las cosas buenas necesitan tiempo y cuidado. La paciencia hace crecer las semillas… y también a nosotros.",
    "extra": [
        ("💬 Conversemos", ["¿Qué le regaló el abuelo a Inti?", "¿Por qué Inti quiso botar la semilla?", "¿Qué cosa aprendiste tú con paciencia?"]),
        ("🎯 Practiquemos en casa", ["Planten un frijol en un vaso con algodón húmedo y dibujen cómo cambia cada día.", "Cuenten los días hasta que salga el brote."]),
        ("👨‍👩‍👧 Para papá y mamá", ["Ayude a su hijo a ver el progreso lento: fotos de la planta, de sus dibujos, de su letra.", "Cuando quiera rendirse, recuérdele algo que antes le costaba y ahora hace bien."]),
    ],
}

# ------------------------------------------------------------------ 49
STORIES[49] = {
    "title": "El Dragón que Quería Ayudar en Casa", "emoji": "🐉", "category": "Cuentos chistosos",
    "scenes": [
        {"img": svg(floor() + window() + emoji(400, 420, "🐉", 140) + boy(620, 440, 1.0, mood="surprised", shirt="#06b6d4"), "interior"),
         "alt": "Un dragoncito verde aparece en la casa de Joaquín",
         "p": "Un día apareció en la casa de Joaquín un dragoncito verde llamado Chispa.", "d": ["—¡Quiero ayudar en casa! —dijo, y le salió un humito por la nariz."]},
        {"img": svg(floor() + table(400, 340, 300) + emoji(400, 330, "🍳🔥🔥", 60) + emoji(230, 440, "🐉", 100) + boy(600, 440, 1.0, mood="scared", shirt="#06b6d4"), "interior"),
         "alt": "Chispa quema los huevos al querer cocinar",
         "p": "Primero quiso cocinar huevos. Sopló fuego… ¡y los huevos quedaron negros como carbón!", "d": ["—Ups —dijo Chispa."]},
        {"img": svg(floor() + window() + emoji(300, 440, "🐉", 100) + emoji(480, 380, "🧹💨", 60) + emoji(600, 300, "🍃🍃📄📄", 40) + boy(650, 440, 0.9, mood="surprised", shirt="#06b6d4"), "interior"),
         "alt": "Chispa barre con sus alas y vuela todo por la sala",
         "p": "Luego quiso barrer. Agitó sus alas tan fuerte que las hojas, los papeles y hasta el gato volaron por toda la sala.", "d": ["—¡Miaaau! —protestó el gato desde la lámpara."]},
        {"img": svg(floor() + window() + emoji(330, 440, "🐉", 100) + boy(520, 440, 1.0, mood="calm", shirt="#06b6d4") + speech(200, 110, "Ayudar también es aprender"), "interior"),
         "alt": "Joaquín le enseña a Chispa a ayudar paso a paso",
         "p": "Chispa se puso triste. Joaquín se sentó a su lado.", "d": ["—Ayudar también se aprende. Te enseño: primero lo fácil, y despacito."]},
        {"img": svg(floor() + table(400, 340, 300) + emoji(330, 330, "🍽️🍽️", 50) + emoji(220, 440, "🐉", 100) + boy(560, 440, 1.0, mood="laugh", shirt="#06b6d4", arm_up=True), "interior"),
         "alt": "Chispa y Joaquín ponen la mesa y ordenan juntos",
         "p": "Juntos pusieron la mesa, doblaron la ropa y regaron las plantas. Chispa usó su fuego bajito para calentar el agua del té de la abuela.", "d": ["—¡Así sí! —aplaudió Joaquín."]},
        {"img": svg(floor() + window() + table(400, 340, 320) + emoji(260, 440, "🐉", 90) + boy(420, 440, 0.95, mood="love", shirt="#06b6d4") + girl(560, 440, 1.2, mood="laugh", dress="#f472b6") + heart(400, 200, 1.3), "interior"),
         "alt": "La familia cena feliz con Chispa",
         "p": "En la cena, mamá encontró todo ordenado y les dio un abrazo a los dos.", "d": ["—Cuando todos ayudamos, la casa es más bonita —dijo mamá.", "—¡Y más divertida! —dijo Chispa, echando un humito en forma de corazón."]},
    ],
    "msg": "Ayudar en casa es cosa de todos. Al principio nos equivocamos, pero con práctica aprendemos a hacerlo muy bien.",
    "extra": [
        ("💬 Conversemos", ["¿Qué le salió mal a Chispa?", "¿Cómo le enseñó Joaquín?", "¿En qué ayudas tú en casa?"]),
        ("🎯 Practiquemos en casa", ["Hagan una tabla de tareas con dibujos: poner la mesa, regar las plantas, guardar los juguetes.", "Cada tarea cumplida gana una carita feliz."]),
        ("👨‍👩‍👧 Para papá y mamá", ["Dele tareas a su medida y enséñele paso a paso, aunque al inicio tome más tiempo.", "Agradezca su ayuda aunque no quede perfecta."]),
    ],
}
