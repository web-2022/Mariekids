"""Cuento 12 nuevo: Los Dos Alfiles (reemplaza al caballo, que repetía la idea del cuento 15)."""
from ilustra import *

STORIES = {}
L, D = "#f0d9b5", "#b58863"

def board(x, y, n=6, cell=34, dots=(), marks=()):
    """Tablero plano de n×n. dots: casillas (c,r) con punto de camino; marks: (c,r,emoji)."""
    out = f'<rect x="{x-6}" y="{y-6}" width="{n*cell+12}" height="{n*cell+12}" rx="10" fill="#8a5a3c"/>'
    for r in range(n):
        for c in range(n):
            out += f'<rect x="{x+c*cell}" y="{y+r*cell}" width="{cell}" height="{cell}" fill="{D if (r+c)%2 else L}"/>'
    for c, r, col in dots:
        out += f'<circle cx="{x+c*cell+cell/2}" cy="{y+r*cell+cell/2}" r="{cell*0.2}" fill="{col}" stroke="#fff" stroke-width="2"/>'
    for c, r, e in marks:
        out += f'<text x="{x+c*cell+cell/2}" y="{y+r*cell+cell*0.78}" text-anchor="middle" font-size="{cell*0.8}">{e}</text>'
    return out

def tile(x, y, dark):
    return f'<ellipse cx="{x}" cy="{y+4}" rx="66" ry="18" fill="{D if dark else L}" stroke="#8a5a3c" stroke-width="3"/>'

def alfi(x, y, s=1.0, mood="happy", flip=False):   # alfil de casillas claras
    return tile(x, y, False) + chess(x, y, "bishop", s, flip, mood, white=True)

def nico(x, y, s=1.0, mood="happy", flip=False):   # alfil de casillas oscuras
    return tile(x, y, True) + chess(x, y, "bishop", s, flip, mood, white=True)

DIAG_L = [(i, i, "#fbbf24") for i in range(6)]          # diagonal de casillas claras
DIAG_D = [(i, 5 - i, "#38bdf8") for i in range(6)]      # diagonal de casillas oscuras

STORIES[12] = {
    "title": "Los Dos Alfiles", "emoji": "♗", "category": "Cuentos de ajedrez",
    "scenes": [
        {"img": svg(chessboard() + alfi(230, 470, 1.2, "laugh") + board(470, 90, dots=DIAG_L)
                    + speech(60, 120, "¡Me encantan las diagonales!"), "ajedrez"),
         "alt": "Un alfil blanco sonríe junto a un tablero con su camino en diagonal por casillas claras",
         "p": "En un tablero de ajedrez vivía Alfi, un alfil alegre. Se movía en diagonal, de esquina a esquina, y siempre caminaba por las casillas claras.",
         "d": ["—¡Zas, zas, en diagonal! ¡Me encantan las diagonales! —cantaba Alfi."]},
        {"img": svg(chessboard() + alfi(200, 470, 1.1, "worried") + chess(600, 470, "pawn", 0.85, mood="laugh", white=False) + tile(600, 470, True)
                    + board(300, 70, dots=DIAG_L, marks=[(2, 3, "♟")]) + word(560, 300, "¡No llego!", 42), "ajedrez"),
         "alt": "El alfil no puede alcanzar a un peón negro que está en una casilla oscura",
         "p": "Un día, un peón negro se paró en una casilla oscura. Alfi quiso atraparlo, pero por más que se movía, ¡siempre caía en casillas claras!",
         "d": ["—¡No llego! ¡No llego! —dijo Alfi, mareado de tanto zigzaguear."]},
        {"img": svg(chessboard() + alfi(300, 470, 1.15, "sad") + speech(150, 130, "No sirvo para todo el tablero…"), "ajedrez"),
         "alt": "El alfil está triste sentado en una casilla clara",
         "p": "Alfi se sentó muy triste. Pensaba que era un alfil incompleto, porque había casillas a las que nunca podría llegar.",
         "d": ["—No sirvo para todo el tablero… —suspiró."]},
        {"img": svg(chessboard() + alfi(250, 470, 1.1, "surprised") + nico(540, 470, 1.1, "happy", flip=True)
                    + speech(330, 120, "¡Yo camino por las oscuras!"), "ajedrez"),
         "alt": "Llega otro alfil que camina por las casillas oscuras",
         "p": "Entonces llegó Nico, el otro alfil del equipo. Él también se movía en diagonal, pero siempre por las casillas oscuras.",
         "d": ["—Yo tampoco puedo pisar las claras —le contó Nico—. ¿Y si jugamos juntos?"]},
        {"img": svg(chessboard() + alfi(170, 470, 0.95, "brave") + nico(630, 470, 0.95, "brave", flip=True)
                    + board(298, 60, dots=DIAG_L + DIAG_D)
                    + word(400, 320, "¡Juntos llegamos a todo!", 36, "#7c3aed"), "ajedrez"),
         "alt": "Los dos alfiles cubren en el tablero las casillas claras y las oscuras",
         "p": "En la siguiente partida, Alfi cuidó las casillas claras y Nico las oscuras. ¡Juntos podían llegar a cualquier lugar del tablero! Así atraparon al peón y pusieron en jaque al rey negro.",
         "d": ["—¡Jaque! —dijeron los dos al mismo tiempo."]},
        {"img": svg(chessboard() + alfi(290, 470, 1.15, "love") + nico(510, 470, 1.15, "love", flip=True) + heart(400, 300, 1.2)
                    + speech(150, 120, "¡Somos la pareja de alfiles!"), "ajedrez"),
         "alt": "Los dos alfiles celebran abrazados",
         "p": "Desde ese día, Alfi ya no se sintió incompleto. Los jugadores de ajedrez saben que dos alfiles juntos son muy fuertes, y los llaman «la pareja de alfiles».",
         "d": ["—Tú cuidas las claras y yo las oscuras. ¡Somos un gran equipo! —dijo Nico."]},
    ],
    "msg": "Nadie puede hacerlo todo solo, y eso está bien. Cuando unimos lo que cada uno sabe hacer, juntos llegamos a todas partes.",
}
