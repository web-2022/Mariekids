"""Cuentos 20, 21, 22, 23 y 26."""
from ilustra import *

STORIES = {}

# ------------------------------------------------------------------ 20
LILY = '<ellipse cx="{x}" cy="{y}" rx="46" ry="12" fill="#4ade80"/><path d="M{x} {y} l30 -8" stroke="#16a34a" stroke-width="3"/>'
STORIES[20] = {
    "title": "La Rana que se Creía Vaca", "emoji": "🐸", "category": "Cuentos chistosos",
    "scenes": [
        {"img": svg(ground() + sun() + fence(20, 760, 300) + pond(200, 450, 140, 34) + frog(200, 450, 1.0, mood="love")
                    + cow(560, 470, 1.0, mood="happy") + word(600, 260, "¡Muuu!", 36, "#7c3aed") + speech(60, 170, "¡Quiero ser vaca!")),
         "alt": "Una rana mira con admiración a una vaca que muge",
         "p": "Junto a la laguna vivía Rosi, una ranita verde. Todos los días miraba a la vaca Lola, tan grande y elegante, y pensaba que ser vaca debía ser lo mejor del mundo.",
         "d": ["—¡Quiero ser vaca como Lola! —decía Rosi."]},
        {"img": svg(ground() + sun() + pond(200, 450, 140, 34) + frog(220, 450, 1.1, mood="talk") + word(250, 270, "¡Muuu… CROAC!", 42, "#16a34a")
                    + cow(580, 470, 0.95, mood="laugh")),
         "alt": "La rana intenta mugir pero le sale un croac",
         "p": "Primero, Rosi trató de mugir. Tomó aire, infló la garganta y… ¡le salió un «Muuu-croac» muy gracioso!",
         "d": ["—¡Jajaja! ¡Ese es un mugido muy especial! —rio la vaca."]},
        {"img": svg(ground() + sun() + frog(330, 460, 1.1, mood="sad") + grass(450, 470, 0.7, mood="surprised") + word(330, 260, "¡Puaj!", 50, "#16a34a")
                    + cow(620, 470, 0.8, mood="laugh")),
         "alt": "La rana prueba el pasto y hace una cara de asco",
         "p": "Después, Rosi decidió comer pasto, como las vacas. Masticó, masticó… y puso una cara muy chistosa.",
         "d": ["—¡Puaj! ¡Esto no sabe a mosquitos! —dijo Rosi."]},
        {"img": svg(ground() + sun() + frog(320, 470, 1.5, mood="proud", big=True) + word(330, 200, "¡PFFFF!", 46, "#e11d48")
                    + cow(620, 470, 0.85, mood="surprised") + speech(40, 120, "¡Ya soy grande como una vaca!")),
         "alt": "La rana se infla muchísimo y luego se desinfla",
         "p": "Luego, Rosi se infló y se infló para ser grande como Lola. Pero de pronto… ¡pfffff! Se desinfló y salió volando por el aire.",
         "d": ["—¡Ya soy grande como una vaca! —alcanzó a decir antes de desinflarse."]},
        {"img": svg(ground() + sun() + cow(380, 470, 1.0, mood="scared") + word(390, 240, "¡PUM!", 48, "#7c3aed") + frog(650, 460, 1.0, mood="laugh")
                    + '<path d="M300 380 Q320 300 360 280" stroke="#94a3b8" stroke-width="5" stroke-dasharray="10 8" fill="none"/>'),
         "alt": "La vaca intenta saltar como la rana y se cae sentada",
         "p": "Lola quiso ayudarla y dijo: «Mira, yo intentaré ser rana». Dio un salto… ¡y cayó sentada con un gran «PUM»! Las dos se rieron muchísimo.",
         "d": ["—¡Tú saltas mucho mejor que yo, Rosi! —dijo Lola riendo."]},
        {"img": svg(ground() + sun() + pond(220, 450, 150, 34) + LILY.format(x=220, y=440) + frog(240, 320, 1.4, mood="laugh")
                    + '<path d="M120 440 Q170 260 220 300" stroke="#94a3b8" stroke-width="5" stroke-dasharray="10 8" fill="none"/>'
                    + cow(580, 470, 0.95, mood="laugh") + speech(380, 150, "¡Me gusta ser rana!")),
         "alt": "La rana salta muy alto feliz y la vaca la aplaude",
         "p": "Rosi saltó tan alto que tocó una nube. Por fin entendió que ser rana también era genial: ella podía nadar, saltar y cantar «croac» como nadie.",
         "d": ["—¡Me gusta ser rana! —gritó Rosi desde lo alto."]},
    ],
    "msg": "Es divertido imitar a otros, pero lo mejor es ser uno mismo. Cada uno tiene algo genial, y reírnos juntos de nuestras ocurrencias nos hace más amigos.",
}

# ------------------------------------------------------------------ 21
BED = ('<rect x="40" y="300" width="300" height="90" rx="14" fill="#93c5fd"/><rect x="40" y="250" width="40" height="150" rx="8" fill="#a16207"/>'
       '<rect x="300" y="270" width="40" height="130" rx="8" fill="#a16207"/><rect x="80" y="282" width="80" height="30" rx="12" fill="#fff"/>')
STORIES[21] = {
    "title": "El Zapato que se Escapaba", "emoji": "👟", "category": "Cuentos chistosos",
    "scenes": [
        {"img": svg(floor() + window() + BED + girl(470, 470, 1.0, mood="surprised") + shoe(650, 470, 1.0, mood="sleepy", color="#ef4444")
                    + speech(300, 140, "¿Dónde está mi otro zapato?"), "interior"),
         "alt": "Una niña busca su zapato en la mañana y solo encuentra uno",
         "p": "Cada mañana, Mía se preparaba para ir al colegio. Encontraba un zapato rojo… ¡pero el otro siempre había desaparecido!",
         "d": ["—¿Dónde está mi otro zapato? —preguntaba Mía, buscando por todas partes."]},
        {"img": svg(floor() + shoe(520, 470, 0.9, mood="laugh", run=True) + girl(170, 470, 1.0, mood="surprised", arm_up=True)
                    + word(520, 300, "¡Atrápame!", 42, "#ef4444"), "interior"),
         "alt": "El zapato rojo sale corriendo por el pasillo riéndose",
         "p": "Un día, Mía lo vio: ¡el zapato salió corriendo por el pasillo, dando saltitos y riéndose!",
         "d": ["—¡Atrápame si puedes! —gritó el zapato."]},
        {"img": svg(ground() + sun() + bush(560, 470, 1.2) + dog(380, 470, 1.0, mood="laugh") + shoe(450, 430, 0.55, mood="laugh")
                    + girl(150, 470, 1.0, mood="laugh") + speech(250, 160, "¡Te encontré!")),
         "alt": "El zapato se esconde en el jardín junto al perro",
         "p": "Mía lo siguió hasta el jardín. Allí estaba el zapato, escondido junto al perro Coco, que movía la cola muy divertido.",
         "d": ["—¡Te encontré! —dijo Mía, riendo."]},
        {"img": svg(ground() + sun() + girl(260, 470, 1.0, mood="talk") + shoe(470, 470, 0.9, mood="laugh")
                    + speech(330, 170, "¡Me haces cosquillas!")),
         "alt": "La niña le pregunta al zapato por qué se escapa",
         "p": "Mía se agachó y le preguntó al zapato por qué se escapaba todas las mañanas. El zapato se rio muy fuerte.",
         "d": ["—¿Por qué te escapas? —preguntó Mía.", "—¡Porque cuando me amarras tan fuerte, me haces cosquillas! —respondió el zapato."]},
        {"img": svg(floor() + window() + girl(300, 470, 1.0, mood="calm") + shoe(470, 470, 0.9, mood="happy")
                    + '<path d="M450 432 q-20 -24 0 -30 q20 6 0 30 q20 -24 40 -14 q-14 22 -40 14" stroke="#fff" stroke-width="5" fill="none"/>', "interior"),
         "alt": "La niña amarra el zapato con cuidado haciendo un moño",
         "p": "Entonces Mía amarró los pasadores con mucho cuidado, sin apretar demasiado, y le hizo un moño bonito. El zapato sonrió tranquilo.",
         "d": ["—¡Así sí! ¡Qué cómodo! —dijo el zapato."]},
        {"img": svg(ground() + sun() + house(560, 200) + girl(300, 470, 1.0, mood="laugh", arm_up=True) + shoe(260, 470, 0.35, mood="happy") + shoe(330, 470, 0.35, mood="happy")
                    + speech(60, 170, "¡Somos un buen equipo!")),
         "alt": "La niña corre feliz al colegio con sus dos zapatos",
         "p": "Desde ese día, el zapato nunca más se escapó. Mía y sus zapatos salían juntos cada mañana, corriendo felices hacia el colegio.",
         "d": ["—¡Somos un buen equipo! —cantaban los zapatos, tap, tap, tap."]},
    ],
    "msg": "A veces las cosas tienen una razón divertida. Preguntar con calma y tratar todo con cuidado nos ayuda a resolver los problemas… ¡y a reírnos un montón!",
}

# ------------------------------------------------------------------ 22
BANDAGE = '<rect x="{x}" y="{y}" width="40" height="16" rx="6" fill="#fde68a" stroke="#d97706" stroke-width="2" transform="rotate(-30 {x} {y})"/>'
BASKET = '<g transform="translate({x} {y})"><path d="M-36 -30 h72 l-8 34 h-56 Z" fill="#b7791f"/><path d="M-30 -30 q30 -40 60 0" stroke="#92400e" stroke-width="5" fill="none"/>' + "".join(f'<circle cx="{dx}" cy="-34" r="11" fill="#ef4444"/>' for dx in (-18, 0, 18)) + '</g>'
STORIES[22] = {
    "title": "El Árbol y la Niña que Decía la Verdad", "emoji": "🌳",
    "scenes": [
        {"img": svg(ground() + sun() + tree(470, 470, 1.4, face_mood="happy", fruit="#ef4444") + girl(220, 470, 1.0, mood="laugh")
                    + '<circle cx="290" cy="380" r="13" fill="#ef4444"/>' + speech(40, 150, "¡Toma una manzana, Lupe!")),
         "alt": "Un árbol de manzanas con cara le regala una manzana a una niña",
         "p": "En la plaza del pueblo había un manzano muy viejo y sabio. Cada tarde, la niña Lupe lo visitaba y el árbol le regalaba una manzana roja y jugosa.",
         "d": ["—¡Toma una manzana, Lupe! —decía el árbol con cariño."]},
        {"img": svg(ground() + sun() + tree(450, 470, 1.4, face_mood="surprised", fruit="#ef4444") + girl(560, 340, 0.8, mood="scared")
                    + '<path d="M560 270 l70 -40" stroke="#8a5a3c" stroke-width="10" stroke-linecap="round"/>' + word(670, 220, "¡CRAC!", 44)),
         "alt": "La niña trepa al árbol y una rama se rompe",
         "p": "Un día, Lupe quiso alcanzar la manzana más alta y trepó por las ramas. De pronto… ¡crac! Una rama se rompió y cayó al suelo.",
         "d": ["—¡Uy, no! —dijo Lupe, asustada."]},
        {"img": svg(ground() + sun() + tree(450, 470, 1.4, face_mood="sad", fruit="#ef4444") + girl(220, 470, 1.0, mood="worried")
                    + '<path d="M300 470 l90 -10" stroke="#8a5a3c" stroke-width="10" stroke-linecap="round"/>' + speech(260, 150, "¿Quién rompió mi rama?")),
         "alt": "El árbol triste pregunta quién rompió su rama",
         "p": "El árbol se quejó un poquito y preguntó qué había pasado. Lupe sintió miedo. Pensó en decir que había sido el viento…",
         "d": ["—¿Quién rompió mi rama? —preguntó el árbol."]},
        {"img": svg(ground() + sun() + tree(450, 470, 1.4, face_mood="calm", fruit="#ef4444") + girl(240, 470, 1.0, mood="sorry")
                    + speech(60, 150, "Fui yo. Perdón, árbol")),
         "alt": "La niña le dice la verdad al árbol",
         "p": "Pero Lupe respiró hondo y decidió decir la verdad, aunque le diera vergüenza.",
         "d": ["—Fui yo. Trepé para alcanzar una manzana. Perdón, árbol.", "—Gracias por decirme la verdad, Lupe —respondió el árbol."]},
        {"img": svg(ground() + sun() + tree(450, 470, 1.4, face_mood="happy", fruit="#ef4444") + BANDAGE.format(x=500, y=300) + girl(230, 470, 1.0, mood="happy")
                    + '<g transform="translate(320 470)"><path d="M-30 0 h40 l8 -26 h-56 Z" fill="#60a5fa"/></g>'),
         "alt": "La niña cura la rama del árbol y lo riega",
         "p": "Juntos curaron la herida del árbol con una venda. Durante muchos días, Lupe lo regó y lo cuidó con amor.",
         "d": ["—Te cuidaré hasta que te sientas mejor —prometió Lupe."]},
        {"img": svg(ground() + sun() + flowers(3, 12) + tree(470, 470, 1.5, face_mood="love", fruit="#ef4444", blossom=True) + girl(230, 470, 1.0, mood="laugh", arm_up=True)
                    + BASKET.format(x=320, y=470) + speech(40, 150, "La verdad siempre da frutos")),
         "alt": "El árbol florecido le regala a la niña una canasta llena de manzanas",
         "p": "Llegó la primavera y el árbol se llenó de flores y de manzanas. Esta vez le regaló a Lupe una canasta entera.",
         "d": ["—La verdad siempre da frutos, Lupe —dijo el árbol sonriendo."]},
    ],
    "msg": "Decir la verdad, aunque nos equivoquemos, es lo correcto. La honestidad hace crecer la confianza y la amistad, como un árbol que da frutos.",
}

# ------------------------------------------------------------------ 23
def pawns(xs, moods, y=470, s=0.75, white=True):
    return "".join(chess(x, y, "pawn", s, mood=m, white=white) for x, m in zip(xs, moods))

STORIES[23] = {
    "title": "El Rey y los Peones", "emoji": "♟️", "category": "Cuentos de ajedrez",
    "scenes": [
        {"img": svg(chessboard() + chess(400, 470, "king", 1.3, mood="proud") + pawns((160, 260, 540, 640), ["happy"] * 4)
                    + speech(140, 100, "¡Yo soy el más importante!"), "ajedrez"),
         "alt": "El rey blanco presume frente a los peones",
         "p": "En el tablero vivía el rey Rodolfo. Como el juego terminaba si él caía, se creía la pieza más importante de todas.",
         "d": ["—¡Yo soy el más importante del tablero! —decía, muy estirado."]},
        {"img": svg(chessboard() + chess(400, 470, "king", 1.3, mood="angry") + pawns((160, 260, 540, 640), ["sad"] * 4)
                    + speech(140, 100, "¡Muévanse, peones!"), "ajedrez"),
         "alt": "El rey da órdenes a los peones, que se ponen tristes",
         "p": "El rey nunca saludaba a los peones ni les daba las gracias. Solo les daba órdenes, y ellos se sentían pequeños y poco importantes.",
         "d": ["—¡Muévanse, peones! ¡No me tapen la vista! —ordenaba."]},
        {"img": svg(chessboard() + chess(220, 470, "king", 1.2, mood="scared") + chess(540, 470, "queen", 1.1, mood="angry", white=False)
                    + chess(680, 470, "knight", 1.0, mood="angry", white=False) + speech(380, 110, "¡Jaque al rey!"), "ajedrez"),
         "alt": "La reina y el caballo negros atacan al rey blanco, que tiene miedo",
         "p": "Un día empezó una partida difícil. La reina y el caballo negros avanzaron directo hacia el rey Rodolfo. ¡Estaba en peligro!",
         "d": ["—¡Jaque al rey! —gritó la reina negra.", "—¡Ayuda! —dijo el rey, temblando."]},
        {"img": svg(chessboard() + chess(130, 470, "king", 1.0, mood="surprised") + pawns((290, 380, 470), ["brave"] * 3, s=0.85)
                    + chess(660, 470, "queen", 1.0, mood="surprised", white=False) + speech(250, 110, "¡Te protegemos, majestad!"), "ajedrez"),
         "alt": "Los peones forman una pared para proteger al rey",
         "p": "Entonces, los peones dieron un paso al frente. Se pusieron uno al lado del otro y formaron una pared para proteger al rey.",
         "d": ["—¡Te protegemos, majestad! —dijeron todos juntos."]},
        {"img": svg(chessboard() + chess(400, 470, "king", 1.2, mood="sorry") + pawns((170, 270, 530, 630), ["surprised"] * 4)
                    + speech(150, 100, "Gracias. Sin ustedes no podría"), "ajedrez"),
         "alt": "El rey, con humildad, les da las gracias a los peones",
         "p": "El rey Rodolfo quedó a salvo. Miró a los peones y, por primera vez, bajó la cabeza con humildad.",
         "d": ["—Gracias, amigos. Sin ustedes no podría ganar. Perdón por tratarlos mal."]},
        {"img": svg(chessboard() + chess(250, 470, "king", 1.1, mood="laugh") + chess(520, 470, "queen", 1.15, mood="love") + pawns((680,), ["happy"])
                    + sparkles(520, 280, 7, 140) + word(400, 140, "¡Un peón se hizo reina!", 34, "#7c3aed"), "ajedrez"),
         "alt": "Un peón llega al final del tablero y se convierte en reina; el rey aplaude",
         "p": "En esa misma partida, un peoncito valiente llegó hasta el final del tablero… ¡y se convirtió en reina! El rey aplaudió más fuerte que nadie.",
         "d": ["—¡Todas las piezas son importantes! —dijo el rey, feliz."]},
    ],
    "msg": "Nadie es más importante que los demás. Ser humildes, respetar y agradecer a quienes nos ayudan nos hace verdaderamente grandes.",
}

# ------------------------------------------------------------------ 26
SOFA = ('<rect x="430" y="270" width="340" height="130" rx="30" fill="#7c3aed"/><rect x="410" y="300" width="60" height="110" rx="24" fill="#6d28d9"/>'
        '<rect x="730" y="300" width="60" height="110" rx="24" fill="#6d28d9"/><rect x="450" y="400" width="18" height="26" fill="#4c1d95"/><rect x="730" y="400" width="18" height="26" fill="#4c1d95"/>'
        '<rect x="470" y="250" width="290" height="70" rx="26" fill="#8b5cf6"/>')
BOARD_TABLE = '<rect x="40" y="300" width="320" height="24" rx="8" fill="#a16207"/><rect x="70" y="324" width="20" height="120" fill="#8a5a3c"/><rect x="310" y="324" width="20" height="120" fill="#8a5a3c"/>'
STORIES[26] = {
    "title": "El Peón Perdido", "emoji": "♟️", "category": "Cuentos de ajedrez",
    "scenes": [
        {"img": svg(chessboard() + pawns((150, 250, 550, 650), ["laugh"] * 4) + chess(400, 470, "pawn", 0.62, mood="sad")
                    + speech(130, 140, "¡Eres el más chiquito!"), "ajedrez"),
         "alt": "Los peones se burlan del peón más pequeño",
         "p": "En la caja de ajedrez vivía Pepito, el peón más pequeño de todos. Los otros peones a veces se burlaban de él por su tamaño.",
         "d": ["—¡Eres el más chiquito, Pepito! —le decían riendo."]},
        {"img": svg(floor() + window() + SOFA + BOARD_TABLE + chess(560, 470, "pawn", 0.6, mood="sad")
                    + '<path d="M300 330 Q420 350 540 450" stroke="#94a3b8" stroke-width="5" stroke-dasharray="10 8" fill="none"/>', "interior"),
         "alt": "El peón pequeño rueda fuera del tablero y se esconde debajo del sofá",
         "p": "Pepito se sintió tan triste que se fue rodando del tablero, cayó de la mesa y se escondió debajo del sofá.",
         "d": ["—Nadie me va a extrañar… —pensó Pepito."]},
        {"img": svg(chessboard() + chess(400, 470, "king", 1.2, mood="worried") + pawns((170, 260, 550, 640), ["calm"] * 4)
                    + speech(130, 100, "Falta Pepito. ¡Hay que buscarlo!"), "ajedrez"),
         "alt": "El rey nota que falta un peón; los demás no le dan importancia",
         "p": "Al empezar la partida, el rey contó las piezas y notó que faltaba alguien. Los peones se encogieron de hombros, pero el rey se preocupó.",
         "d": ["—Falta Pepito. ¡Hay que buscarlo! —dijo el rey.", "—Bah, es solo un peón chiquito —respondió un peón."]},
        {"img": svg(floor() + window() + SOFA + chess(200, 470, "king", 0.8, mood="brave") + pawns((310, 390), ["worried", "worried"], s=0.62)
                    + chess(110, 470, "queen", 0.75, mood="brave") + speech(60, 120, "¡Todos somos importantes!"), "interior"),
         "alt": "El rey sale primero a buscar al peón y los demás lo siguen",
         "p": "El rey no discutió: bajó del tablero y fue el primero en buscar. Al ver su ejemplo, la reina y los peones lo siguieron.",
         "d": ["—Aquí todos somos importantes, grandes o pequeños —dijo el rey."]},
        {"img": svg(floor() + SOFA + chess(470, 470, "pawn", 0.6, mood="surprised") + chess(330, 470, "king", 0.85, mood="love")
                    + pawns((130, 220), ["sorry", "sorry"], s=0.62) + speech(60, 120, "Te entendemos, Pepito"), "interior"),
         "alt": "Encuentran al peón debajo del sofá; el rey lo consuela y los peones piden perdón",
         "p": "¡Lo encontraron debajo del sofá! El rey se agachó y le habló con cariño. Los otros peones, siguiendo su ejemplo, le pidieron perdón.",
         "d": ["—Te entendemos, Pepito. Sentirse pequeño duele —dijo el rey.", "—Perdón por burlarnos —dijeron los peones."]},
        {"img": svg(chessboard() + chess(400, 470, "king", 1.1, mood="happy") + pawns((160, 250, 560, 650), ["happy"] * 4) + chess(310, 470, "pawn", 0.62, mood="laugh")
                    + sparkles(310, 300, 6, 90) + speech(140, 100, "¡Ya estamos todos!"), "ajedrez"),
         "alt": "Todas las piezas vuelven felices al tablero con el peón pequeño",
         "p": "Todos volvieron juntos al tablero. Desde ese día, nadie se burló de Pepito, y él jugó feliz, sabiendo que era parte del equipo.",
         "d": ["—¡Ya estamos todos! —celebró Pepito."]},
    ],
    "msg": "Comprender cómo se sienten los demás es un gran regalo. Cuando damos el ejemplo con amabilidad, los demás aprenden a hacer lo mismo.",
}
