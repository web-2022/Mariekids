"""Cuentos para 3 años (5 partes + tarjeta para papás). 39: Mamá Siempre Vuelve."""
from ilustra import *

STORIES = {}

def bear(x, y, s=1.0, flip=False, mood="happy", color="#b7794b", arm_up=False, tear=False, bow=False):
    """Osito de pie con base en (x, y). Altura ~150 a escala 1."""
    snout = "#f3d9bf"
    arm_l = ('<ellipse cx="-38" cy="-118" rx="13" ry="30" transform="rotate(30 -38 -118)" fill="{c}"/>' if arm_up
             else '<ellipse cx="-40" cy="-62" rx="13" ry="28" transform="rotate(18 -40 -62)" fill="{c}"/>').format(c=color)
    inner = (f'<ellipse cx="-18" cy="-6" rx="17" ry="12" fill="{color}"/><ellipse cx="18" cy="-6" rx="17" ry="12" fill="{color}"/>'
             f'<ellipse cx="0" cy="-55" rx="40" ry="46" fill="{color}"/><ellipse cx="0" cy="-48" rx="26" ry="30" fill="{snout}"/>'
             + arm_l + f'<ellipse cx="40" cy="-62" rx="13" ry="28" transform="rotate(-18 40 -62)" fill="{color}"/>'
             f'<circle cx="-30" cy="-150" r="15" fill="{color}"/><circle cx="30" cy="-150" r="15" fill="{color}"/>'
             f'<circle cx="-30" cy="-150" r="7" fill="{snout}"/><circle cx="30" cy="-150" r="7" fill="{snout}"/>'
             f'<circle cx="0" cy="-122" r="38" fill="{color}"/><ellipse cx="0" cy="-108" rx="17" ry="13" fill="{snout}"/>'
             '<ellipse cx="0" cy="-114" rx="6" ry="4.5" fill="#3b2314"/>' + face(0, -126, mood, 0.9)
             + ('<path d="M-14 -118 q-4 10 0 16 q4 -6 0 -16Z" fill="#60a5fa"/>' if tear else "")
             + ('<path d="M-14 -162 l-14 -9 v18 Z M-14 -162 l14 -9 v18 Z" fill="#ec4899"/><circle cx="-14" cy="-162" r="4" fill="#be185d"/>' if bow else ""))
    return g(x, y, s, flip, inner)

def nido(x=470, y=170):
    return (house(x, y, "#fde68a", "#f472b6")
            + f'<rect x="{x + 40}" y="{y + 20}" width="120" height="30" rx="8" fill="#fff" stroke="#f472b6" stroke-width="3"/>'
            + f'<text x="{x + 100}" y="{y + 42}" text-anchor="middle" font-family="Comic Neue, Comic Sans MS, sans-serif" font-size="20" font-weight="800" fill="#db2777">NIDO</text>')

def kiss(x, y, s=1.0):
    return g(x, y, s, False, '<path d="M0 6 C-14 -6 -10 -18 0 -10 C10 -18 14 -6 0 6Z" fill="#f43f5e"/>')

MAMA = dict(color="#8b5a35", bow=True)

STORIES[39] = {
    "title": "Mamá Siempre Vuelve", "emoji": "🧸", "category": "Cuentos para 3 años",
    "scenes": [
        {"img": svg(ground() + sun() + flowers(4, 8) + nido() + bear(250, 455, 1.25, **MAMA) + bear(360, 455, 0.8, mood="happy")),
         "alt": "Osito Tito y Mamá Osa, de la mano, frente a la puerta de un nido colorido",
         "p": "Hoy es un día especial. Osito Tito va al nido por primera vez.", "d": []},
        {"img": svg(ground() + sun() + nido() + bear(260, 455, 1.25, mood="worried", **MAMA) + bear(345, 455, 0.8, mood="sad", tear=True) + word(220, 140, "¡No te vayas!", 40)),
         "alt": "Tito abraza la pierna de su mamá y llora",
         "p": "Tito abraza fuerte a su mamá.", "d": ["—¡No te vayas, mamá! —llora Tito."]},
        {"img": svg(ground() + sun() + nido() + bear(270, 470, 1.05, mood="love", **MAMA) + bear(370, 455, 0.8, mood="surprised") + kiss(390, 365, 1.6) + heart(320, 200, 1.2)),
         "alt": "Mamá Osa se agacha y le da un beso en la manito a Tito",
         "p": "Mamá Osa se agacha y le da un beso en la manito.",
         "d": ["—Guarda este beso. Cuando me extrañes, ponlo en tu cachete. Vengo después del juego y la leche.", "—¡Mamá siempre vuelve!"]},
        {"img": svg(floor() + window() + bear(250, 440, 0.9, mood="happy", arm_up=True) + kiss(232, 318, 1.1) + rabbit(470, 440, 0.8, mood="happy") + '<rect x="560" y="380" width="44" height="30" rx="5" fill="#ef4444"/><rect x="606" y="380" width="44" height="30" rx="5" fill="#3b82f6"/><rect x="583" y="348" width="44" height="30" rx="5" fill="#22c55e"/>' + speech(330, 110, "¡Mamá siempre vuelve!"), "interior"),
         "alt": "Tito juega con bloques junto a un conejito y se toca el cachete con la mano, sonriendo",
         "p": "Tito juega con bloques. Un ratito extraña a su mamá. Se pone el beso en el cachete y dice:", "d": ["—¡Mamá siempre vuelve!"]},
        {"img": svg(ground() + sun() + nido() + bear(560, 455, 1.25, mood="laugh", arm_up=True, **MAMA) + bear(330, 455, 0.85, mood="laugh", arm_up=True) + heart(450, 230, 1.5) + sparkles(450, 250, 6, 140)),
         "alt": "Mamá Osa abre los brazos en la puerta del nido y Tito corre feliz a abrazarla",
         "p": "Después del juego y la leche… ¡ahí está mamá!", "d": ["—¡Volviste! —ríe Tito.", "—Siempre vuelvo, mi amor."]},
    ],
    "msg": "Mamá y papá siempre vuelven por ti.",
    "extra": [
        ("💬 Conversemos", ["¿Por qué lloraba Tito?", "¿Qué le dio su mamá para cuando la extrañara?"]),
        ("🎯 Practiquemos en casa", ["Antes de ir al nido, denle un «beso guardado» en la manito y digan juntos: «¡Mamá siempre vuelve!»."]),
        ("👨‍👩‍👧 Para papá y mamá", ["Despídase siempre, aunque llore: no se vaya a escondidas, porque eso le quita confianza.",
                                  "Dígale cuándo volverá con algo que entienda («después del almuerzo»), no con horas.",
                                  "Despedida corta y cariñosa, y cumpla: llegue a tiempo. Llorar los primeros días es normal; con la rutina se calma."]),
    ],
}

# Ilustraciones definitivas enviadas por el autor (Cuentos/3-anios/img/c39-1..5.webp)
for _k, _sc in enumerate(STORIES[39]["scenes"], 1):
    _sc["file"] = f"c39-{_k}.webp"
