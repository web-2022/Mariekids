"""Cuentos 31-38: valores para el módulo «Crece» (perseverancia, nervios, error, hábitos,
pedir ayuda, emociones básicas, familia que cambia y duelo)."""
from ilustra import *

STORIES = {}

def hill(color="#7cc56a"):
    return f'<path d="M380 430 Q560 120 760 430 Z" fill="{color}" stroke="#4d8a3a" stroke-width="4"/>'

def blocks(x, y, n, fallen=False):
    cols = ["#ef4444", "#f59e0b", "#22c55e", "#3b82f6", "#a855f7", "#ec4899"]
    if fallen:
        return "".join(f'<rect x="{x + i * 52 - 60}" y="{y - 30 - (i % 2) * 8}" width="44" height="30" rx="5" fill="{cols[i % 6]}" stroke="#334155" stroke-width="2" transform="rotate({(i * 23) % 50 - 25} {x + i * 52 - 38} {y - 15})"/>' for i in range(n))
    return "".join(f'<rect x="{x - 22}" y="{y - 32 * (i + 1)}" width="44" height="30" rx="5" fill="{cols[i % 6]}" stroke="#334155" stroke-width="2"/>' for i in range(n))

def stage(y=400):
    return (f'<rect x="0" y="{y}" width="800" height="100" fill="#b45309"/><rect x="0" y="{y}" width="800" height="12" fill="#92400e"/>'
            '<path d="M0 0 Q80 120 0 240 Z" fill="#dc2626"/><path d="M800 0 Q720 120 800 240 Z" fill="#dc2626"/>')

def nest(x, y, s=1.0):
    return g(x, y, s, False, '<path d="M-60 0 Q0 40 60 0 Q40 22 0 24 Q-40 22 -60 0Z" fill="#a16207"/><path d="M-60 0 Q0 18 60 0" stroke="#713f12" stroke-width="4" fill="none"/>')

def balloon(x, y, color="#60a5fa", s=1.0):
    return g(x, y, s, False, f'<ellipse cx="0" cy="-40" rx="28" ry="34" fill="{color}"/><path d="M0 -6 q-6 30 4 60" stroke="#475569" stroke-width="2" fill="none"/>')

def clock(x, y):
    return f'<circle cx="{x}" cy="{y}" r="34" fill="#fff" stroke="#334155" stroke-width="5"/><path d="M{x} {y} v-22 M{x} {y} h16" stroke="#334155" stroke-width="5" stroke-linecap="round"/>'

def board_list(x, y, items):
    out = f'<rect x="{x}" y="{y}" width="230" height="{40 + 34 * len(items)}" rx="12" fill="#fff" stroke="#94a3b8" stroke-width="3"/>'
    for i, t in enumerate(items):
        out += f'<text x="{x + 16}" y="{y + 42 + 34 * i}" font-family="Comic Neue, Comic Sans MS, sans-serif" font-size="22" font-weight="700" fill="#1e3a8a">{t}</text>'
    return out

def sky_dusk():
    return '<rect width="800" height="500" fill="#fdba74" opacity=".35"/>'

def rainbow():
    cols = ["#ef4444", "#f59e0b", "#facc15", "#22c55e", "#3b82f6", "#8b5cf6"]
    return "".join(f'<path d="M{120 + i * 14} 330 A{280 - i * 14} {230 - i * 14} 0 0 1 {680 - i * 14} 330" stroke="{c}" stroke-width="14" fill="none" opacity=".75"/>' for i, c in enumerate(cols))

# ------------------------------------------------------------------ 31 perseverancia
STORIES[31] = {
    "title": "Tula, la Tortuga que No se Rindió", "emoji": "🐢", "category": "Cuentos con valores",
    "scenes": [
        {"img": svg(ground() + sun() + hill() + flower(640, 205, "#facc15", 1.4) + turtle(220, 450, 1.1, mood="happy") + speech(40, 120, "¡Quiero ver la flor de arriba!")),
         "alt": "Tula, una tortuga, mira una flor amarilla en lo alto de una colina",
         "p": "Tula era una tortuguita que vivía al pie de una colina. Arriba, en la cima, crecía una flor amarilla que brillaba como el sol.",
         "d": ["—¡Quiero ver esa flor de cerca! —dijo Tula."]},
        {"img": svg(ground() + sun() + hill() + flower(640, 205, "#facc15", 1.4) + turtle(470, 390, 0.9, mood="scared", flip=True) + word(380, 300, "¡Pum!", 46)),
         "alt": "Tula resbala colina abajo",
         "p": "Tula empezó a subir, paso a paso. Pero a mitad de camino sus patitas resbalaron y rodó hasta abajo. ¡Pum!",
         "d": ["—¡Ay! Esto es muy difícil —dijo, sacudiéndose el polvo."]},
        {"img": svg(ground() + sun() + hill() + rabbit(160, 450, 0.9, mood="laugh") + turtle(320, 450, 1.0, mood="sad") + speech(30, 120, "¡Las tortugas no suben colinas!")),
         "alt": "Un conejo se ríe de la tortuga triste",
         "p": "Un conejo que pasaba se rio de ella. Tula se sintió triste y pensó en quedarse abajo para siempre.",
         "d": ["—¡Las tortugas no suben colinas! —se burló el conejo."]},
        {"img": svg(ground() + sun() + hill() + owl(150, 300, 0.9, mood="calm") + turtle(330, 450, 1.0, mood="brave") + speech(30, 110, "Un pasito a la vez")),
         "alt": "Un búho sabio le da un consejo a la tortuga",
         "p": "Entonces el búho, que todo lo veía desde su rama, le dio un consejo. Tula respiró hondo y lo intentó otra vez, buscando las piedras firmes.",
         "d": ["—No mires lo lejos que está la cima. Da un pasito a la vez —dijo el búho.", "—Un pasito… y otro pasito —repitió Tula."]},
        {"img": svg(ground("pasto") + sun() + hill() + turtle(560, 310, 0.85, mood="brave", flip=True) + sparkles(560, 280, 5, 80) + word(240, 230, "¡Sí puedo!", 46, "#16a34a")),
         "alt": "La tortuga sube decidida por la colina",
         "p": "Se cansó, descansó un ratito y siguió. Resbaló otra vez, pero se levantó. Paso a paso, la cima estaba cada vez más cerca.",
         "d": ["—¡Sí puedo! ¡Solo tengo que seguir! —se dijo."]},
        {"img": svg(ground() + sun() + hill() + flower(650, 205, "#facc15", 1.6) + turtle(600, 225, 0.8, mood="laugh") + rabbit(160, 450, 0.9, mood="surprised") + speech(30, 120, "¡Lo lograste, Tula!")),
         "alt": "La tortuga feliz en la cima junto a la flor y el conejo sorprendido",
         "p": "Al atardecer, Tula llegó a la cima y olió la flor amarilla. Desde abajo, el conejo la miraba con la boca abierta.",
         "d": ["—¡Lo lograste, Tula! Perdón por reírme —gritó el conejo.", "—No fue fácil, pero no me rendí —sonrió Tula."]},
    ],
    "msg": "Las cosas difíciles se logran paso a paso. Si te caes, descansa un poquito y vuelve a intentarlo: rendirse es lo único que asegura no llegar.",
}

# ------------------------------------------------------------------ 32 nervios y miedo
STORIES[32] = {
    "title": "Lía y el Globo de la Calma", "emoji": "🎈", "category": "Cuentos con valores",
    "scenes": [
        {"img": svg(floor() + window() + girl(300, 440, 1.1, mood="happy", dress="#22c55e") + speech(380, 140, "¡Voy a cantar en la fiesta!"), "interior"),
         "alt": "Lía, una niña, cuenta feliz que cantará en la fiesta del colegio",
         "p": "Lía iba a cantar una canción en la fiesta del colegio. Había practicado mucho y estaba muy contenta.",
         "d": ["—¡Voy a cantar en la fiesta! —le contó a su mamá."]},
        {"img": svg(stage() + girl(400, 430, 1.1, mood="scared", dress="#22c55e") + word(220, 200, "tum tum", 36) + word(600, 200, "tum tum", 36), "interior"),
         "alt": "Lía, en el escenario, siente su corazón latir muy fuerte",
         "p": "Pero el día de la fiesta, cuando vio a tanta gente, su corazón empezó a latir muy fuerte. Le temblaban las manos y sentía mariposas en la barriga.",
         "d": ["—¡No puedo! ¡Tengo miedo! —susurró Lía."]},
        {"img": svg(floor() + girl(260, 440, 1.0, mood="worried", dress="#22c55e") + girl(470, 440, 1.2, mood="calm", dress="#7c3aed", hair="#1f2937") + speech(380, 120, "Es normal sentir nervios"), "interior"),
         "alt": "La profesora se agacha para hablar con Lía",
         "p": "Su profesora se acercó, se agachó a su lado y le habló con calma.",
         "d": ["—Es normal sentir nervios, Lía. Significa que esto te importa. Te enseñaré un truco: el globo de la calma."]},
        {"img": svg(floor() + girl(330, 440, 1.1, mood="calm", dress="#22c55e") + balloon(470, 300, "#60a5fa", 1.6) + word(620, 160, "1, 2, 3…", 38, "#2563eb"), "interior"),
         "alt": "Lía respira hondo imaginando que infla un globo",
         "p": "—Imagina que tu barriga es un globo —dijo la profesora—. Toma aire por la nariz despacito: uno, dos, tres. Y suéltalo por la boca, muy lento: uno, dos, tres, cuatro.",
         "d": ["Lía lo hizo tres veces. Poco a poco, su corazón se fue calmando."]},
        {"img": svg(stage() + girl(400, 430, 1.1, mood="brave", dress="#22c55e") + notes(520, 220, 4) + notes(260, 240, 3), "interior"),
         "alt": "Lía canta en el escenario",
         "p": "Todavía sentía un poquito de nervios, pero ya no la detenían. Lía subió al escenario, buscó la cara de su mamá entre el público y empezó a cantar.",
         "d": ["—Los nervios vienen conmigo, pero yo decido —pensó."]},
        {"img": svg(stage() + girl(400, 430, 1.1, mood="laugh", dress="#22c55e", arm_up=True) + heart(200, 200, 1.4) + heart(620, 220, 1.2) + word(400, 120, "¡Bravo, Lía!", 46, "#16a34a"), "interior"),
         "alt": "Todos aplauden a Lía, que sonríe feliz",
         "p": "Al terminar, todos aplaudieron. Lía estaba feliz y orgullosa: había sido valiente.",
         "d": ["—Ser valiente no es no tener miedo —le dijo su mamá—. Es hacerlo aunque tengas un poquito de miedo."]},
    ],
    "msg": "Sentir nervios o miedo es normal. Cuando te pase, respira despacio como si inflaras un globo, piensa en algo que te dé calma y da el primer paso. Ser valiente es hacerlo aunque tengas un poco de miedo.",
}

# ------------------------------------------------------------------ 33 frustración ante el error
STORIES[33] = {
    "title": "Bruno y la Torre que se Cayó", "emoji": "🧱", "category": "Cuentos con valores",
    "scenes": [
        {"img": svg(floor() + rabbit(220, 440, 1.1, mood="happy") + blocks(470, 440, 6) + speech(380, 110, "¡La torre más alta del mundo!"), "interior"),
         "alt": "Bruno, un conejito, construye una torre de bloques de colores",
         "p": "Bruno, el conejito, quería construir la torre de bloques más alta del mundo. Puso un bloque, luego otro, y otro más.",
         "d": ["—¡Va a ser la torre más alta del mundo! —dijo emocionado."]},
        {"img": svg(floor() + rabbit(220, 440, 1.1, mood="surprised") + blocks(470, 440, 7, fallen=True) + word(470, 200, "¡CATAPLÚM!", 48), "interior"),
         "alt": "La torre se cae y los bloques ruedan por el suelo",
         "p": "Pero cuando puso el séptimo bloque, la torre se tambaleó… ¡y cataplúm! Todos los bloques rodaron por el suelo.",
         "d": []},
        {"img": svg(floor() + rabbit(300, 440, 1.2, mood="angry") + blocks(520, 440, 7, fallen=True) + speech(30, 110, "¡Soy un desastre! ¡No juego más!"), "interior"),
         "alt": "Bruno se enoja, patalea y quiere dejar de jugar",
         "p": "Bruno se puso rojo de rabia. Pateó un bloque, se cruzó de brazos y se le salieron unas lágrimas.",
         "d": ["—¡Soy un desastre! ¡Nunca me sale nada! ¡No juego más!"]},
        {"img": svg(floor() + rabbit(240, 440, 1.0, mood="sad") + rabbit(470, 440, 1.25, mood="calm", color="#e7d7c1") + speech(330, 110, "¿Qué aprendió tu torre?"), "interior"),
         "alt": "La abuela coneja abraza a Bruno y le habla",
         "p": "Su abuela coneja se sentó a su lado y esperó a que se calmara. Luego le preguntó algo curioso.",
         "d": ["—Equivocarse no te hace un desastre, Bruno. Los errores nos enseñan. ¿Qué crees que le pasó a tu torre?", "—Creo que… los bloques de abajo estaban chuecos —dijo Bruno."]},
        {"img": svg(floor() + rabbit(220, 440, 1.1, mood="brave") + blocks(470, 440, 4) + '<rect x="420" y="440" width="100" height="10" fill="#334155"/>' + speech(330, 110, "Abajo, bien derechito"), "interior"),
         "alt": "Bruno vuelve a construir con una base ancha y derecha",
         "p": "Esta vez Bruno puso los bloques de abajo bien derechitos y despacio. Cuando algo se movía, lo arreglaba antes de seguir.",
         "d": ["—Abajo, bien derechito… sin apurarme —decía."]},
        {"img": svg(floor() + rabbit(220, 440, 1.1, mood="laugh", droopy=False) + blocks(470, 440, 10) + sparkles(470, 120, 6, 120), "interior"),
         "alt": "Bruno feliz junto a una torre muy alta",
         "p": "¡La nueva torre llegó más alto que nunca! Bruno aplaudió y le dio un abrazo a su abuela.",
         "d": ["—Gracias a que se cayó, aprendí a hacerla mejor —dijo Bruno."]},
    ],
    "msg": "Equivocarse no es fracasar: es aprender. Cuando algo no te salga, respira, piensa qué pasó y vuelve a intentarlo de otra manera. Cada error te acerca a hacerlo mejor.",
}

# ------------------------------------------------------------------ 34 hábitos y organización
STORIES[34] = {
    "title": "Mishi y la Lista Mágica", "emoji": "📋", "category": "Cuentos con valores",
    "scenes": [
        {"img": svg(floor() + window() + cat(260, 440, 1.2, mood="worried", color="#f59e0b") + clock(620, 150) + word(470, 280, "¿Mi mochila?", 36), "interior"),
         "alt": "Mishi, un gatito, busca sus cosas apurado mientras el reloj avanza",
         "p": "Mishi, el gatito, siempre llegaba tarde al colegio. Cada mañana buscaba su mochila, sus zapatos y su cuaderno por toda la casa.",
         "d": ["—¿Dónde dejé mi mochila? ¿Y mi zapato? —maullaba apurado."]},
        {"img": svg(ground() + sun() + cat(250, 450, 1.1, mood="sad", color="#f59e0b") + owl(560, 330, 0.9, mood="calm") + speech(380, 120, "Otra vez tarde, Mishi"), "dia"),
         "alt": "Mishi llega tarde y triste a la escuela del bosque",
         "p": "Un día llegó tan tarde que se perdió el cuento de la mañana. Se sintió muy triste.",
         "d": ["—Otra vez tarde, Mishi —dijo la maestra búho."]},
        {"img": svg(floor() + owl(250, 360, 0.95, mood="calm") + cat(480, 440, 1.1, mood="surprised", color="#f59e0b") + board_list(540, 70, ["1. 🎒 Mochila", "2. 👟 Zapatos", "3. 🛏️ Dormir"]), "interior"),
         "alt": "La maestra búho le muestra a Mishi una lista con dibujos",
         "p": "La maestra búho le regaló una lista mágica. No tenía hechizos: tenía dibujos de lo que había que hacer cada noche.",
         "d": ["—La magia está en hacerla todos los días, a la misma hora —explicó."]},
        {"img": svg(floor() + window(night=True) + cat(300, 440, 1.1, mood="happy", color="#f59e0b") + board_list(500, 80, ["✅ Mochila lista", "✅ Ropa en la silla", "✅ A dormir 8:00"]), "noche"),
         "alt": "En la noche, Mishi marca su lista antes de dormir",
         "p": "Esa noche, Mishi alistó su mochila, dejó su ropa en la silla y se fue a dormir temprano. Marcó cada cosa con un visto.",
         "d": ["—Mochila, listo. Ropa, listo. ¡A dormir! —dijo bostezando."]},
        {"img": svg(floor() + window() + sun(700, 70) + cat(300, 440, 1.1, mood="laugh", color="#f59e0b") + clock(620, 160) + word(460, 300, "¡Todo listo!", 40, "#16a34a"), "interior"),
         "alt": "En la mañana, Mishi está listo a tiempo",
         "p": "A la mañana siguiente, Mishi no tuvo que buscar nada. Desayunó tranquilo y salió a tiempo.",
         "d": ["—¡Qué fácil es cuando todo está en su lugar! —dijo."]},
        {"img": svg(ground() + sun() + cat(300, 450, 1.1, mood="proud", color="#f59e0b") + owl(560, 330, 0.9, mood="happy") + speech(30, 110, "¡Ya es mi costumbre!")),
         "alt": "Mishi llega temprano y orgulloso a la escuela",
         "p": "Al principio le costó acordarse, pero repitió la lista cada noche. Después de unas semanas, ya no necesitaba mirarla: se había vuelto su costumbre.",
         "d": ["—¡Ahora llego temprano todos los días! —dijo Mishi, orgulloso."]},
    ],
    "msg": "Un hábito es algo que haces tantas veces que se vuelve fácil. Organízate con una lista sencilla, hazla todos los días a la misma hora y verás cómo todo sale mejor.",
}

# ------------------------------------------------------------------ 35 pedir ayuda
STORIES[35] = {
    "title": "Pipo, el Pajarito que No Pedía Ayuda", "emoji": "🐦", "category": "Cuentos con valores",
    "scenes": [
        {"img": svg(ground() + sun() + tree(560, 470, 1.4) + nest(560, 230, 1.0) + bird(280, 400, 1.0, mood="proud", color="#38bdf8") + speech(30, 110, "¡Yo puedo solo!")),
         "alt": "Pipo, un pajarito azul, dice que puede hacerlo todo solo",
         "p": "Pipo era un pajarito azul que siempre decía que podía hacerlo todo solo. No le gustaba pedir ayuda: pensaba que eso era de pajaritos débiles.",
         "d": ["—¡Yo puedo solo! —decía siempre."]},
        {"img": svg(ground() + '<path d="M0 0" />' + sun() + tree(560, 470, 1.4) + nest(560, 230, 1.0) + bird(300, 420, 1.0, mood="sad", color="#38bdf8") + word(300, 300, "¡Ay, mi ala!", 36)),
         "alt": "Pipo se lastima un ala y no puede volar a su nido",
         "p": "Un día de viento, Pipo se golpeó un ala contra una rama y cayó al pasto. Le dolía mucho y no podía volver a su nido.",
         "d": ["—No pasa nada… puedo solo —dijo, aunque le temblaba la voz."]},
        {"img": svg(ground() + sky_dusk() + tree(560, 470, 1.4) + nest(560, 230, 1.0) + bird(300, 420, 1.0, mood="scared", color="#38bdf8"), "tarde"),
         "alt": "Pipo intenta volar una y otra vez, y empieza a oscurecer",
         "p": "Intentó volar una vez, y otra, y otra. Pero cada vez le dolía más. Empezó a oscurecer y Pipo sintió mucho miedo.",
         "d": []},
        {"img": svg(ground() + tree(560, 470, 1.4) + nest(560, 230, 1.0) + bird(300, 420, 1.0, mood="sorry", color="#38bdf8") + dog(140, 440, 1.0, mood="calm") + speech(240, 110, "¿Me… me ayudas?"), "tarde"),
         "alt": "Pipo, con vergüenza, le pide ayuda a un perro amigo",
         "p": "Entonces pasó Toby, el perro. Pipo tuvo vergüenza, pero respiró hondo y se animó a hablar.",
         "d": ["—Toby… me lastimé el ala. ¿Me… me ayudas?", "—¡Claro que sí! Para eso están los amigos —dijo Toby."]},
        {"img": svg(ground() + tree(560, 470, 1.4) + nest(560, 230, 1.0) + girl(420, 440, 1.0, mood="calm") + bird(450, 260, 0.6, mood="happy", color="#38bdf8") + dog(250, 440, 1.0, mood="happy"), "tarde"),
         "alt": "La niña del jardín sube a Pipo a su nido con ayuda del perro",
         "p": "Toby llamó a Mía, la niña de la casa. Ella levantó a Pipo con cuidado, le puso una vendita y lo subió hasta su nido.",
         "d": ["—Ya estás en casa, pequeño —dijo Mía."]},
        {"img": svg(ground() + sun() + tree(560, 470, 1.4) + nest(560, 230, 1.0) + bird(300, 200, 0.9, mood="laugh", color="#38bdf8", flying=True) + dog(200, 440, 1.0, mood="laugh") + speech(380, 110, "Pedir ayuda es de valientes")),
         "alt": "Pipo, ya sano, vuela feliz junto a sus amigos",
         "p": "Días después, Pipo voló otra vez. Desde entonces, cuando algo es muy difícil, no tiene vergüenza de pedir ayuda… y también ayuda a los demás.",
         "d": ["—Pedir ayuda no es de débiles, ¡es de valientes! —cantó Pipo."]},
    ],
    "msg": "Nadie puede con todo solo. Pedir ayuda cuando algo es difícil, cuando algo te duele o cuando tienes miedo es de valientes. Busca a un adulto de confianza: siempre hay alguien dispuesto a ayudarte.",
}

# ------------------------------------------------------------------ 36 emociones básicas
STORIES[36] = {
    "title": "Las Cuatro Caritas de Mía", "emoji": "😊", "category": "Cuentos con valores",
    "scenes": [
        {"img": svg(floor() + window() + girl(260, 440, 1.2, mood="laugh", arm_up=True) + dog(500, 440, 1.0, mood="laugh") + word(470, 170, "ALEGRÍA", 50, "#f59e0b"), "interior"),
         "alt": "Mía salta de alegría porque su perrito la despertó",
         "p": "Mía despertó y su perrito Coco le lamió la cara. ¡Qué cosquillas! Mía se rio y saltó en la cama. Sentía ALEGRÍA: su cuerpo estaba ligero y quería bailar.",
         "d": ["—¡Estoy feliz, Coco! —dijo Mía."]},
        {"img": svg(ground() + sun() + girl(300, 450, 1.2, mood="sad") + balloon(560, 160, "#f87171") + word(560, 330, "TRISTEZA", 46, "#3b82f6")),
         "alt": "A Mía se le escapa su globo rojo y se pone triste",
         "p": "En el parque, a Mía se le escapó su globo rojo. Se fue volando muy alto. Mía sintió TRISTEZA: le salieron lágrimas y no quería jugar.",
         "d": ["Su papá la abrazó: —Puedes llorar, Mía. Llorar ayuda a que la tristeza salga."]},
        {"img": svg(ground() + sun() + girl(260, 450, 1.2, mood="angry") + girl(500, 450, 1.0, mood="laugh", dress="#38bdf8", hair="#111827") + word(400, 140, "ENOJO", 50, "#dc2626")),
         "alt": "Un niño le quita el columpio a Mía y ella se enoja",
         "p": "Luego, un niño le quitó el columpio sin preguntar. Mía sintió ENOJO: se puso roja, apretó los puños y quiso gritar.",
         "d": ["Pero recordó el truco del semáforo: 🔴 PARAR, 🟡 respirar, 🟢 decirlo con palabras. —No me gustó. Es mi turno —dijo Mía."]},
        {"img": svg(floor() + window(night=True) + girl(300, 440, 1.1, mood="scared") + word(560, 200, "¡BUUM!", 50, "#7c3aed") + word(560, 330, "MIEDO", 46, "#7c3aed"), "noche"),
         "alt": "En la noche, un trueno asusta a Mía",
         "p": "En la noche hubo una tormenta. ¡Buum! Sonó un trueno y Mía sintió MIEDO: su corazón latía rápido y se tapó con la manta.",
         "d": ["Su mamá llegó y le dio la mano: —Es solo un trueno. Estás segura. Respiremos juntas."]},
        {"img": svg(floor() + window(night=True) + girl(260, 440, 1.0, mood="calm") + girl(470, 440, 1.25, mood="happy", dress="#a855f7", hair="#3f2a14") + speech(330, 110, "Todas las emociones valen"), "noche"),
         "alt": "Mía y su mamá conversan antes de dormir",
         "p": "Antes de dormir, Mía le contó a su mamá todo lo que había sentido en el día.",
         "d": ["—Hoy sentí alegría, tristeza, enojo y miedo. ¿Está mal?", "—No, mi amor. Todas las emociones son normales. Lo importante es saber qué sentimos y pedir ayuda cuando la necesitamos."]},
        {"img": svg(floor() + window(night=True) + moon(660, 90) + girl(330, 440, 1.1, mood="sleepy") + heart(520, 230, 1.3) + stars(7, 20), "noche"),
         "alt": "Mía se duerme tranquila",
         "p": "Mía cerró los ojos, tranquila. Ya conocía sus cuatro caritas: la alegre, la triste, la enojada y la asustada. Y sabía que todas eran parte de ella.",
         "d": ["—Buenas noches, caritas —susurró Mía."]},
    ],
    "msg": "Todos sentimos alegría, tristeza, enojo y miedo. Ninguna emoción es mala. Lo importante es reconocer lo que sentimos, decirlo con palabras y pedir un abrazo o ayuda cuando lo necesitamos.",
}

# ------------------------------------------------------------------ 37 la familia que cambia
STORIES[37] = {
    "title": "Nico y sus Dos Nidos", "emoji": "🪺", "category": "Cuentos con valores",
    "scenes": [
        {"img": svg(ground() + sun() + tree(400, 470, 1.6) + nest(400, 210, 1.1) + bird(340, 200, 0.6, mood="happy", color="#f59e0b") + bird(460, 200, 0.6, mood="happy", color="#a855f7", flip=True) + bird(400, 185, 0.45, mood="laugh", color="#38bdf8")),
         "alt": "Nico, un pajarito, vive en un nido con su papá y su mamá",
         "p": "Nico era un pajarito que vivía en un nido con su papá y su mamá. Cada mañana desayunaban juntos y cantaban.",
         "d": []},
        {"img": svg(ground() + '<rect width="800" height="500" fill="#94a3b8" opacity=".25"/>' + tree(400, 470, 1.6) + nest(400, 210, 1.1) + bird(330, 200, 0.6, mood="sad", color="#f59e0b") + bird(470, 200, 0.6, mood="sad", color="#a855f7", flip=True) + bird(400, 185, 0.45, mood="worried", color="#38bdf8"), "nublado"),
         "alt": "Los papás de Nico están tristes y Nico está preocupado",
         "p": "Un día, sus papás le explicaron algo con mucho cariño: ya no iban a vivir en el mismo nido. Papá viviría en un árbol cercano y mamá se quedaría en este.",
         "d": ["—¿Es por mi culpa? —preguntó Nico con los ojos llenos de lágrimas.", "—No, Nico. Nunca es culpa de los hijos. Son cosas de los grandes —le dijeron los dos."]},
        {"img": svg(ground() + tree(400, 470, 1.6) + nest(400, 210, 1.1) + bird(400, 190, 0.5, mood="sad", color="#38bdf8") + cloud(200, 100) + cloud(560, 120), "nublado"),
         "alt": "Nico se siente triste y confundido en su nido",
         "p": "Nico se sintió triste, enojado y confundido, todo al mismo tiempo. A veces no quería cantar ni jugar.",
         "d": ["Su mamá le dijo: —Está bien sentirte así. Puedes contarme lo que sientes cuando quieras."]},
        {"img": svg(ground() + sun() + tree(200, 470, 1.3) + nest(200, 250, 0.9) + tree(600, 470, 1.3) + nest(600, 250, 0.9) + bird(400, 200, 0.55, mood="calm", color="#38bdf8", flying=True) + '<path d="M240 240 Q400 120 560 240" stroke="#fbbf24" stroke-width="5" stroke-dasharray="10 10" fill="none"/>'),
         "alt": "Nico vuela de un nido al otro por un caminito de luz",
         "p": "Pronto Nico aprendió el camino entre los dos árboles. Algunos días dormía en el nido de mamá y otros en el nido de papá.",
         "d": ["—En los dos nidos tengo mi lugar —descubrió Nico."]},
        {"img": svg(ground() + sun() + tree(200, 470, 1.3) + nest(200, 250, 0.9) + bird(160, 235, 0.5, mood="happy", color="#f59e0b") + bird(210, 225, 0.4, mood="laugh", color="#38bdf8") + tree(600, 470, 1.3) + nest(600, 250, 0.9) + bird(630, 235, 0.5, mood="happy", color="#a855f7", flip=True) + heart(400, 190, 1.4)),
         "alt": "Nico es feliz en cada nido con cada uno de sus papás",
         "p": "Con papá aprendía a buscar semillas; con mamá, nuevas canciones. Los dos lo seguían queriendo igual que siempre.",
         "d": ["—Te queremos con todo el corazón, en cualquier nido —le decían."]},
        {"img": svg(ground() + sun() + flowers(4, 10) + bird(400, 240, 0.8, mood="laugh", color="#38bdf8", flying=True) + rainbow() + speech(220, 380, "¡Tengo dos nidos llenos de amor!")),
         "alt": "Nico vuela feliz bajo un arcoíris",
         "p": "Con el tiempo, Nico volvió a cantar. Su familia había cambiado, pero el amor seguía ahí.",
         "d": ["—¡Tengo dos nidos y los dos están llenos de amor! —cantó."]},
    ],
    "msg": "A veces las familias cambian: papá y mamá viven en casas distintas, o la familia la forman los abuelos, un solo papá o una sola mamá. Nunca es culpa de los niños. Es normal sentir tristeza o enojo, y es bueno contarlo. Lo que no cambia es el amor de quienes te cuidan.",
}

# ------------------------------------------------------------------ 38 duelo
STORIES[38] = {
    "title": "El Jardín de los Recuerdos", "emoji": "🌻", "category": "Cuentos con valores",
    "scenes": [
        {"img": svg(ground() + sun() + flowers(2, 12) + dog(470, 440, 1.2, mood="happy", color="#9ca3af") + girl(250, 440, 1.0, mood="laugh", dress="#f59e0b")),
         "alt": "Ana juega en el jardín con Abuelo Lucho, un perro viejito",
         "p": "Ana tenía un mejor amigo: Lucho, un perro viejito de orejas grises. Juntos regaban las flores del jardín y él siempre movía la cola al verla.",
         "d": ["—¡Buenos días, Lucho! —decía Ana cada mañana."]},
        {"img": svg(floor() + window() + dog(470, 440, 1.2, mood="sleepy", color="#9ca3af") + girl(250, 440, 1.0, mood="worried", dress="#f59e0b"), "interior"),
         "alt": "Lucho está muy viejito y cansado",
         "p": "Lucho estaba muy viejito. Cada día caminaba más despacio y dormía más. Una mañana, papá le contó a Ana que Lucho había muerto mientras dormía.",
         "d": ["—Su cuerpo ya estaba muy cansado. No sufrió —le explicó papá con voz suave."]},
        {"img": svg(floor() + window(night=False) + girl(300, 440, 1.1, mood="sad", dress="#f59e0b") + girl(480, 440, 1.25, mood="sad", dress="#2563eb", hair="#1f2937"), "nublado"),
         "alt": "Ana llora abrazada a su papá",
         "p": "Ana lloró mucho. Sentía un huequito en el pecho. También se enojó, y a veces preguntaba si Lucho iba a volver.",
         "d": ["—Lucho no va a volver, mi amor. Está bien llorar y extrañarlo. Yo también lo extraño —dijo papá, y la abrazó fuerte."]},
        {"img": svg(floor() + girl(300, 440, 1.1, mood="calm", dress="#f59e0b") + '<rect x="420" y="250" width="200" height="150" rx="10" fill="#fff" stroke="#94a3b8" stroke-width="4"/>' + dog(520, 390, 0.7, mood="happy", color="#9ca3af") + heart(470, 280, 0.8), "interior"),
         "alt": "Ana dibuja a Lucho y escribe lo que más le gustaba de él",
         "p": "Los días siguientes, Ana dibujó a Lucho y le escribió una carta. Papá y ella recordaron las cosas chistosas que hacía. A veces se reían, y a veces lloraban un poquito.",
         "d": ["—Recordarlo me pone triste y feliz a la vez —dijo Ana."]},
        {"img": svg(ground() + sun() + girl(260, 450, 1.0, mood="calm", dress="#f59e0b") + girl(470, 450, 1.25, mood="calm", dress="#2563eb", hair="#1f2937") + flower(370, 455, "#facc15", 2.0)),
         "alt": "Ana y su papá plantan un girasol en el jardín",
         "p": "Juntos plantaron un girasol en el lugar favorito de Lucho. Lo llamaron «el jardín de los recuerdos».",
         "d": ["—Cada vez que lo riegues, piensa en algo bonito de Lucho —dijo papá."]},
        {"img": svg(ground() + sun() + flowers(9, 14) + flower(400, 440, "#facc15", 3.0) + girl(240, 450, 1.0, mood="happy", dress="#f59e0b") + heart(560, 200, 1.3) + sparkles(400, 220, 6, 120)),
         "alt": "El girasol creció grande y Ana sonríe recordando a Lucho",
         "p": "El girasol creció alto y amarillo. Ana todavía extraña a Lucho, pero ahora, cuando lo recuerda, sonríe más de lo que llora.",
         "d": ["—Te llevo en mi corazón, Lucho —susurró Ana."]},
    ],
    "msg": "Cuando alguien que queremos se va o muere, es normal sentir tristeza, enojo o confusión. Llorar, hablar de lo que sentimos y recordar con cariño nos ayuda. No tienes que pasarlo solo: los adultos que te quieren te acompañan, y quienes amamos siguen vivos en nuestros recuerdos.",
}
