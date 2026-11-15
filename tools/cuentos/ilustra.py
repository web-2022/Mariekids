"""Biblioteca de ilustraciones para los cuentos de MK (SVG 800x500).

Todo es dibujo vectorial propio: fondos, utilería y personajes con caras
que muestran emociones. Cada personaje se dibuja con su base en (x, y).
"""
import math, random

W, H = 800, 500

# ------------------------------------------------------------------ base

SKIES = {
    "dia": ("#bfe7ff", "#eaf7ff"),
    "tarde": ("#ffb07a", "#ffe7c4"),
    "noche": ("#1e2a5a", "#3b4a86"),
    "nublado": ("#c8d6e5", "#eef3f8"),
    "lluvia": ("#a9bccf", "#dfe8f1"),
    "amanecer": ("#ffd3e0", "#fff3d6"),
    "interior": ("#ffe9c7", "#fff6e6"),
    "ajedrez": ("#c7d2fe", "#eef2ff"),
}


def svg(body, sky="dia"):
    a, b = SKIES.get(sky, sky) if isinstance(sky, str) else sky
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" role="img">
<defs>
  <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{a}"/><stop offset="1" stop-color="{b}"/></linearGradient>
  <radialGradient id="glow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff59d" stop-opacity=".95"/><stop offset="1" stop-color="#fff59d" stop-opacity="0"/></radialGradient>
  <radialGradient id="water" cx=".5" cy=".4" r=".7"><stop offset="0" stop-color="#b9f3ff"/><stop offset="1" stop-color="#3fb6e8"/></radialGradient>
  <linearGradient id="riv" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fd3ff"/><stop offset="1" stop-color="#2f9be0"/></linearGradient>
  <radialGradient id="glass" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#ffffff" stop-opacity=".9"/><stop offset="1" stop-color="#bfe9ff" stop-opacity=".35"/></radialGradient>
</defs>
<rect width="{W}" height="{H}" fill="url(#sky)"/>
{body}
</svg>'''


def g(x, y, s=1.0, flip=False, inner=""):
    return f'<g transform="translate({x:.1f} {y:.1f}) scale({-s if flip else s} {s})">{inner}</g>'


# ------------------------------------------------------------------ caras

def face(cx, cy, mood="happy", r=1.0, ink="#1e293b", cheeks=True):
    """Ojos + boca centrados en (cx, cy). r escala la cara."""
    e = 9 * r      # separación de ojos
    out = []
    def eye(x, y, kind):
        if kind == "dot":
            out.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{4 * r:.1f}" fill="{ink}"/><circle cx="{x + 1.4 * r:.1f}" cy="{y - 1.4 * r:.1f}" r="{1.3 * r:.1f}" fill="#fff"/>')
        elif kind == "arc":
            out.append(f'<path d="M{x - 5 * r:.1f} {y + 1 * r:.1f} q{5 * r:.1f} {-6 * r:.1f} {10 * r:.1f} 0" stroke="{ink}" stroke-width="{3 * r:.1f}" fill="none" stroke-linecap="round"/>')
        elif kind == "closed":
            out.append(f'<path d="M{x - 5 * r:.1f} {y - 1 * r:.1f} q{5 * r:.1f} {5 * r:.1f} {10 * r:.1f} 0" stroke="{ink}" stroke-width="{3 * r:.1f}" fill="none" stroke-linecap="round"/>')
        elif kind == "big":
            out.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{6 * r:.1f}" fill="#fff" stroke="{ink}" stroke-width="{1.5 * r:.1f}"/><circle cx="{x:.1f}" cy="{y + r:.1f}" r="{3.2 * r:.1f}" fill="{ink}"/>')
    def mouth(kind):
        y = cy + 11 * r
        if kind == "smile":
            out.append(f'<path d="M{cx - 7 * r:.1f} {y - 2 * r:.1f} q{7 * r:.1f} {8 * r:.1f} {14 * r:.1f} 0" stroke="{ink}" stroke-width="{3 * r:.1f}" fill="none" stroke-linecap="round"/>')
        elif kind == "open":
            out.append(f'<path d="M{cx - 8 * r:.1f} {y - 3 * r:.1f} q{8 * r:.1f} {14 * r:.1f} {16 * r:.1f} 0 Z" fill="#e11d48" stroke="{ink}" stroke-width="{2 * r:.1f}"/>')
        elif kind == "sad":
            out.append(f'<path d="M{cx - 7 * r:.1f} {y + 3 * r:.1f} q{7 * r:.1f} {-7 * r:.1f} {14 * r:.1f} 0" stroke="{ink}" stroke-width="{3 * r:.1f}" fill="none" stroke-linecap="round"/>')
        elif kind == "o":
            out.append(f'<ellipse cx="{cx:.1f}" cy="{y:.1f}" rx="{4 * r:.1f}" ry="{5 * r:.1f}" fill="{ink}"/>')
        elif kind == "flat":
            out.append(f'<path d="M{cx - 6 * r:.1f} {y:.1f} h{12 * r:.1f}" stroke="{ink}" stroke-width="{3 * r:.1f}" stroke-linecap="round"/>')
        elif kind == "wavy":
            out.append(f'<path d="M{cx - 8 * r:.1f} {y:.1f} q{4 * r:.1f} {-4 * r:.1f} {8 * r:.1f} 0 q{4 * r:.1f} {4 * r:.1f} {8 * r:.1f} 0" stroke="{ink}" stroke-width="{2.6 * r:.1f}" fill="none" stroke-linecap="round"/>')
    spec = {
        "happy": ("arc", "smile"), "laugh": ("closed", "open"), "sad": ("dot", "sad"),
        "scared": ("big", "wavy"), "surprised": ("big", "o"), "angry": ("dot", "flat"),
        "sorry": ("dot", "sad"), "brave": ("dot", "flat"), "calm": ("closed", "smile"),
        "proud": ("closed", "smile"), "sleepy": ("closed", "flat"), "worried": ("dot", "wavy"),
        "talk": ("dot", "open"), "love": ("arc", "smile"),
    }[mood]
    eye(cx - e, cy, spec[0]); eye(cx + e, cy, spec[0])
    if mood in ("angry", "brave"):
        out.append(f'<path d="M{cx - e - 6 * r:.1f} {cy - 8 * r:.1f} l{10 * r:.1f} {3 * r:.1f} M{cx + e + 6 * r:.1f} {cy - 8 * r:.1f} l{-10 * r:.1f} {3 * r:.1f}" stroke="{ink}" stroke-width="{3 * r:.1f}" stroke-linecap="round"/>')
    if mood in ("sad", "sorry", "worried"):
        out.append(f'<path d="M{cx - e - 5 * r:.1f} {cy - 9 * r:.1f} l{9 * r:.1f} {-3 * r:.1f} M{cx + e + 5 * r:.1f} {cy - 9 * r:.1f} l{-9 * r:.1f} {-3 * r:.1f}" stroke="{ink}" stroke-width="{2.5 * r:.1f}" stroke-linecap="round"/>')
    if mood == "sad":
        out.append(f'<path d="M{cx + e + 2 * r:.1f} {cy + 5 * r:.1f} q{2 * r:.1f} {6 * r:.1f} 0 {9 * r:.1f}" stroke="#7dd3fc" stroke-width="{3 * r:.1f}" fill="none"/>')
    mouth(spec[1])
    if cheeks and mood in ("happy", "laugh", "calm", "proud", "love"):
        out.append(f'<circle cx="{cx - e - 6 * r:.1f}" cy="{cy + 7 * r:.1f}" r="{4.5 * r:.1f}" fill="#ff9aa2" opacity=".55"/><circle cx="{cx + e + 6 * r:.1f}" cy="{cy + 7 * r:.1f}" r="{4.5 * r:.1f}" fill="#ff9aa2" opacity=".55"/>')
    if mood == "love":
        out.append(heart(cx + 26 * r, cy - 26 * r, 0.5 * r))
    return "".join(out)


# ------------------------------------------------------------------ utilería

def sun(x=690, y=85, r=36, color="#ffd23f"):
    rays = "".join(f'<line x1="{x + math.cos(a) * (r + 10):.1f}" y1="{y + math.sin(a) * (r + 10):.1f}" x2="{x + math.cos(a) * (r + 24):.1f}" y2="{y + math.sin(a) * (r + 24):.1f}" stroke="{color}" stroke-width="6" stroke-linecap="round"/>' for a in [i * math.pi / 6 for i in range(12)])
    return f'<g>{rays}<circle cx="{x}" cy="{y}" r="{r}" fill="{color}"/></g>'


def moon(x=680, y=85):
    return f'<circle cx="{x}" cy="{y}" r="40" fill="#fff6c9"/><circle cx="{x + 16}" cy="{y - 10}" r="36" fill="#26346b"/>'


def stars(seed=11, n=45):
    random.seed(seed)
    return "".join(f'<circle cx="{random.randint(10, 790)}" cy="{random.randint(10, 240)}" r="{random.choice([1.5, 2, 2.5])}" fill="#fff" opacity=".85"/>' for _ in range(n))


def cloud(x, y, s=1.0, color="#ffffff", op=0.95):
    return (f'<g transform="translate({x} {y}) scale({s})" fill="{color}" opacity="{op}"><ellipse cx="0" cy="0" rx="46" ry="26"/>'
            '<ellipse cx="38" cy="-14" rx="36" ry="28"/><ellipse cx="78" cy="2" rx="40" ry="24"/><rect x="-10" y="0" width="100" height="22" rx="11"/></g>')


def rain(seed=3, n=55):
    random.seed(seed)
    return "".join(f'<line x1="{x}" y1="{y}" x2="{x - 8}" y2="{y + 22}" stroke="#59b9ff" stroke-width="4" stroke-linecap="round" opacity=".8"/>' for x, y in [(random.randint(10, 790), random.randint(10, 340)) for _ in range(n)])


def ground(kind="pasto", y1=360, y2=420):
    colors = {"pasto": ("#c3eaa0", "#9bd86f"), "noche": ("#3f6b4a", "#4d7f55"), "seco": ("#e8d9a8", "#d9c48a"),
              "tarde": ("#d9a46a", "#c98a5a"), "arena": ("#f6e3b0", "#ecd08f"), "nieve": ("#f1f5f9", "#e2e8f0")}[kind]
    return (f'<path d="M0 {y1} Q220 {y1 - 40} 430 {y1 - 10} T800 {y1 - 25} L800 500 L0 500 Z" fill="{colors[0]}"/>'
            f'<path d="M0 {y2} Q260 {y2 - 40} 520 {y2 - 10} T800 {y2 - 20} L800 500 L0 500 Z" fill="{colors[1]}"/>')


def floor(color="#e8c99a", wall="#ffe9c7", y=380):
    boards = "".join(f'<line x1="0" y1="{y + i * 30}" x2="800" y2="{y + i * 30}" stroke="#d1ad7a" stroke-width="3"/>' for i in range(1, 5))
    return f'<rect x="0" y="{y}" width="800" height="{500 - y}" fill="{color}"/>{boards}'


def window(x=560, y=110, night=False):
    sky = "#26346b" if night else "#bfe7ff"
    return (f'<rect x="{x}" y="{y}" width="150" height="120" rx="8" fill="{sky}" stroke="#a16207" stroke-width="10"/>'
            f'<line x1="{x + 75}" y1="{y}" x2="{x + 75}" y2="{y + 120}" stroke="#a16207" stroke-width="7"/><line x1="{x}" y1="{y + 60}" x2="{x + 150}" y2="{y + 60}" stroke="#a16207" stroke-width="7"/>')


def tree(x, y, s=1.0, leaf="#4fae55", face_mood=None, dry=False, fruit=None, blossom=False):
    bark = "#8a5a3c" if not dry else "#9a7556"
    out = f'<rect x="-14" y="-120" width="28" height="122" rx="6" fill="{bark}"/>'
    if dry:
        out += ''.join(f'<line x1="0" y1="-100" x2="{dx}" y2="{dy}" stroke="{bark}" stroke-width="10" stroke-linecap="round"/>' for dx, dy in [(-60, -170), (55, -175), (0, -200), (-40, -130), (45, -135)])
    else:
        out += (f'<circle cx="0" cy="-160" r="70" fill="{leaf}"/><circle cx="-55" cy="-125" r="48" fill="{leaf}"/><circle cx="55" cy="-125" r="48" fill="{leaf}"/>'
                f'<circle cx="-20" cy="-185" r="40" fill="#ffffff" opacity=".12"/>')
        if fruit:
            out += ''.join(f'<circle cx="{dx}" cy="{dy}" r="10" fill="{fruit}"/><rect x="{dx - 1}" y="{dy - 14}" width="2" height="6" fill="#5b3a1a"/>' for dx, dy in [(-50, -120), (30, -170), (60, -115), (-10, -140), (-35, -190)])
        if blossom:
            out += ''.join(flower(dx, dy, "#ff8fbf", 0.9) for dx, dy in [(-50, -150), (20, -200), (55, -140), (-15, -120), (35, -105), (-60, -110)])
    if face_mood:
        out += face(0, -70, face_mood, 1.2, ink="#3b2414")
    return g(x, y, s, inner=out)


def bush(x, y, s=1.0, color="#4fae55"):
    return g(x, y, s, inner=f'<circle cx="-30" cy="-22" r="28" fill="{color}"/><circle cx="10" cy="-34" r="34" fill="{color}"/><circle cx="44" cy="-20" r="26" fill="{color}"/><rect x="-58" y="-22" width="128" height="22" rx="10" fill="{color}"/>')


def flower(x, y, color="#ff8fbf", s=1.0):
    petals = "".join(f'<circle cx="{x + math.cos(a) * 7 * s:.1f}" cy="{y + math.sin(a) * 7 * s:.1f}" r="{6 * s:.1f}" fill="{color}"/>' for a in [i * 2 * math.pi / 5 for i in range(5)])
    return petals + f'<circle cx="{x}" cy="{y}" r="{4.5 * s:.1f}" fill="#ffd23f"/>'


def flowers(seed=5, n=10, y0=430, y1=490):
    random.seed(seed)
    return "".join(flower(random.randint(20, 780), random.randint(y0, y1), random.choice(["#ff8fbf", "#ffd23f", "#c4b5fd", "#ffffff"]), 0.7) for _ in range(n))


def river(y=430, h=70):
    return (f'<path d="M0 {y} Q200 {y - 20} 400 {y} T800 {y - 10} L800 {y + h} Q600 {y + h - 15} 400 {y + h} T0 {y + h - 10} Z" fill="url(#riv)"/>'
            f'<path d="M60 {y + 25} q40 -8 80 0 M300 {y + 40} q40 -8 80 0 M560 {y + 22} q40 -8 80 0" stroke="#d6f3ff" stroke-width="5" fill="none" stroke-linecap="round"/>')


def pond(x=400, y=440, rx=150, ry=38):
    return (f'<ellipse cx="{x}" cy="{y}" rx="{rx}" ry="{ry}" fill="url(#water)" stroke="#2b8fbf" stroke-width="3"/>'
            f'<ellipse cx="{x - rx * 0.3}" cy="{y - ry * 0.3}" rx="{rx * 0.3}" ry="{ry * 0.2}" fill="#fff" opacity=".45"/>')


def rock(x, y, s=1.0, color="#9aa4b2", mood=None, arrow=False):
    inner = (f'<path d="M-60 0 Q-70 -50 -20 -70 Q30 -85 60 -50 Q78 -20 62 0 Z" fill="{color}"/>'
             f'<path d="M-40 -50 Q-10 -68 20 -62" stroke="#fff" stroke-width="6" opacity=".35" fill="none" stroke-linecap="round"/>')
    if mood:
        inner += face(0, -34, mood, 1.1)
    if arrow:
        inner += '<path d="M70 -40 h50 l-12 -12 M120 -40 l-12 12" stroke="#ff9600" stroke-width="7" fill="none" stroke-linecap="round"/>'
    return g(x, y, s, inner=inner)


def fence(x0, x1, y, wood="#c89a64"):
    out = f'<rect x="{x0}" y="{y + 12}" width="{x1 - x0}" height="10" fill="{wood}"/><rect x="{x0}" y="{y + 40}" width="{x1 - x0}" height="10" fill="{wood}"/>'
    for px in range(x0, x1 + 1, 46):
        out += f'<rect x="{px}" y="{y}" width="16" height="70" rx="3" fill="{wood}"/><polygon points="{px},{y} {px + 8},{y - 10} {px + 16},{y}" fill="{wood}"/>'
    return out


def house(x=560, y=200, wall="#ffe0a3", roof="#e05d5d"):
    return g(x, y, 1, inner=f'<rect x="0" y="60" width="200" height="160" fill="{wall}"/><polygon points="-20,64 100,-10 220,64" fill="{roof}"/>'
             '<rect x="80" y="140" width="44" height="80" rx="6" fill="#a16207"/><rect x="20" y="96" width="44" height="40" fill="#bfe7ff" stroke="#fff" stroke-width="4"/><rect x="140" y="96" width="44" height="40" fill="#bfe7ff" stroke="#fff" stroke-width="4"/>')


def log_bridge(x0=250, x1=560, y=410):
    out = ""
    for i, px in enumerate(range(x0, x1, 34)):
        out += f'<rect x="{px}" y="{y}" width="30" height="26" rx="6" fill="{"#a16207" if i % 2 else "#b7791f"}"/>'
    return out + f'<line x1="{x0}" y1="{y - 20}" x2="{x1}" y2="{y - 20}" stroke="#8a5a3c" stroke-width="6"/>'


def sparkles(x, y, n=6, spread=120, color="#fff6a8", seed=1):
    random.seed(seed)
    out = ""
    for _ in range(n):
        sx, sy = x + random.randint(-spread, spread), y + random.randint(-spread // 2, spread // 3)
        out += f'<path d="M{sx} {sy - 10} L{sx + 3} {sy - 3} L{sx + 10} {sy} L{sx + 3} {sy + 3} L{sx} {sy + 10} L{sx - 3} {sy + 3} L{sx - 10} {sy} L{sx - 3} {sy - 3} Z" fill="{color}"/>'
    return out


def heart(x, y, s=1.0, color="#ff5c8a"):
    return f'<path transform="translate({x:.1f} {y:.1f}) scale({s:.2f})" d="M0 12 C-22 -4 -14 -22 0 -10 C14 -22 22 -4 0 12 Z" fill="{color}"/>'


def notes(x, y, n=3, color="#8b5cf6"):
    return "".join(f'<g transform="translate({x + i * 34} {y - (i % 2) * 22})" fill="{color}"><ellipse cx="0" cy="0" rx="9" ry="7"/><rect x="7" y="-34" width="4" height="34"/><path d="M11 -34 q14 6 12 18" stroke="{color}" stroke-width="4" fill="none"/></g>' for i in range(n))


def word(x, y, text, size=40, color="#e11d48"):
    return f'<text x="{x}" y="{y}" text-anchor="middle" font-family="Comic Neue, Comic Sans MS, sans-serif" font-size="{size}" font-weight="800" fill="{color}" stroke="#fff" stroke-width="5" paint-order="stroke">{text}</text>'


def speech(x, y, text):
    w = len(text) * 11.8 + 40
    x = max(10, min(x, W - 10 - w))
    return (f'<g><rect x="{x}" y="{y}" width="{w:.0f}" height="46" rx="23" fill="#ffffff" stroke="#bfdbfe" stroke-width="3"/>'
            f'<text x="{x + w / 2:.1f}" y="{y + 30}" text-anchor="middle" font-family="Comic Neue, Comic Sans MS, sans-serif" font-size="21" font-weight="700" fill="#1e3a8a">{text}</text></g>')


def chessboard(y=330, light="#f0d9b5", dark="#b58863"):
    out = ""
    rows = 5
    for r in range(rows):
        top = y + r * (500 - y) / rows
        bot = y + (r + 1) * (500 - y) / rows
        k0, k1 = 0.55 + 0.45 * r / rows, 0.55 + 0.45 * (r + 1) / rows
        for c in range(8):
            def X(k, cc): return 400 + (cc - 4) * 100 * k * 1.25
            pts = f"{X(k0, c):.0f},{top:.0f} {X(k0, c + 1):.0f},{top:.0f} {X(k1, c + 1):.0f},{bot:.0f} {X(k1, c):.0f},{bot:.0f}"
            out += f'<polygon points="{pts}" fill="{dark if (r + c) % 2 else light}"/>'
    return out


# ------------------------------------------------------------------ personajes

def rabbit(x, y, s=1.0, flip=False, mood="happy", color="#f4efe8", droopy=False):
    ears = ('<ellipse cx="22" cy="-110" rx="10" ry="32" fill="{c}" transform="rotate(-12 22 -110)"/><ellipse cx="22" cy="-110" rx="5" ry="22" fill="#ffc2d1" transform="rotate(-12 22 -110)"/>'
            '<ellipse cx="44" cy="-112" rx="10" ry="32" fill="{c}" transform="rotate(10 44 -112)"/><ellipse cx="44" cy="-112" rx="5" ry="22" fill="#ffc2d1" transform="rotate(10 44 -112)"/>')
    if droopy:
        ears = '<ellipse cx="6" cy="-80" rx="10" ry="30" fill="{c}" transform="rotate(-70 6 -80)"/><ellipse cx="60" cy="-82" rx="10" ry="30" fill="{c}" transform="rotate(70 60 -82)"/>'
    inner = (f'<ellipse cx="-14" cy="6" rx="22" ry="10" fill="{color}"/><ellipse cx="22" cy="8" rx="12" ry="8" fill="{color}"/>'
             f'<ellipse cx="0" cy="-22" rx="34" ry="30" fill="{color}"/><circle cx="-34" cy="-24" r="10" fill="#fff"/><ellipse cx="6" cy="-14" rx="16" ry="18" fill="#fff"/>'
             + ears.format(c=color) +
             f'<circle cx="34" cy="-56" r="26" fill="{color}"/><circle cx="56" cy="-52" r="4" fill="#ff8fab"/>' + face(36, -60, mood, 0.85))
    return g(x, y, s, flip, inner)


def turtle(x, y, s=1.0, flip=False, mood="happy", shell="#2f9e5b"):
    inner = (f'<ellipse cx="-30" cy="14" rx="12" ry="9" fill="#8bd17c"/><ellipse cx="28" cy="14" rx="12" ry="9" fill="#8bd17c"/>'
             f'<path d="M-48 2 Q0 -78 48 2 Z" fill="{shell}"/><path d="M-20 -30 l20 -10 l20 10 l0 18 l-20 8 l-20 -8 Z" fill="#ffffff" opacity=".18"/>'
             f'<rect x="-52" y="0" width="104" height="12" rx="6" fill="#a7e08f"/><path d="M-50 4 l-14 -2 l10 -8 Z" fill="#8bd17c"/>'
             f'<ellipse cx="54" cy="-28" rx="23" ry="21" fill="#8bd17c"/>' + face(56, -32, mood, 0.8))
    return g(x, y, s, flip, inner)


def bird(x, y, s=1.0, flip=False, mood="happy", color="#ffffff", flying=False, beak="#ff9f43"):
    wing = ('<path d="M-8 -12 Q-20 -70 30 -60 Q10 -40 18 -8 Z" fill="{c}" stroke="#00000022" stroke-width="2"/>' if flying
            else '<path d="M-18 -8 Q0 -34 26 -12 Q8 4 -18 -8 Z" fill="{c}" stroke="#00000022" stroke-width="2"/>').format(c=color)
    inner = (f'<path d="M-48 -6 L-74 -20 L-70 2 L-78 14 L-46 6 Z" fill="{color}"/><ellipse cx="0" cy="0" rx="50" ry="26" fill="{color}" stroke="#00000018" stroke-width="2"/>'
             f'<circle cx="34" cy="-30" r="20" fill="{color}" stroke="#00000018" stroke-width="2"/>{wing}<path d="M52 -32 L64 -27 L52 -23 Z" fill="{beak}"/>'
             + face(32, -32, mood, 0.72, cheeks=True) +
             '<line x1="-6" y1="24" x2="-10" y2="36" stroke="#ff9f43" stroke-width="4" stroke-linecap="round"/><line x1="10" y1="24" x2="10" y2="36" stroke="#ff9f43" stroke-width="4" stroke-linecap="round"/>')
    return g(x, y, s, flip, inner)


def hummingbird(x, y, s=1.0, flip=False, mood="happy"):
    inner = ('<ellipse cx="-20" cy="-40" rx="34" ry="12" fill="#a7f3d0" opacity=".8" transform="rotate(-30 -20 -40)"/>'
             '<ellipse cx="-14" cy="-38" rx="30" ry="10" fill="#6ee7b7" opacity=".8" transform="rotate(-60 -14 -38)"/>'
             '<path d="M-40 6 L-62 0 L-58 14 Z" fill="#0d9488"/><ellipse cx="0" cy="0" rx="34" ry="16" fill="#14b8a6"/><ellipse cx="6" cy="6" rx="20" ry="9" fill="#ccfbf1"/>'
             '<circle cx="28" cy="-12" r="15" fill="#0f766e"/><path d="M40 -12 L82 -6 L40 -6 Z" fill="#334155"/><ellipse cx="22" cy="-2" rx="8" ry="5" fill="#f43f5e"/>'
             + face(28, -15, mood, 0.55, ink="#fff", cheeks=False))
    return g(x, y, s, flip, inner)


def owl(x, y, s=1.0, flip=False, mood="calm"):
    inner = ('<ellipse cx="0" cy="-50" rx="46" ry="55" fill="#8a5a3c"/><ellipse cx="0" cy="-34" rx="30" ry="36" fill="#d9b48a"/>'
             '<path d="M-44 -86 L-34 -118 L-18 -96 Z M44 -86 L34 -118 L18 -96 Z" fill="#8a5a3c"/>'
             '<circle cx="-18" cy="-72" r="18" fill="#fff6dd"/><circle cx="18" cy="-72" r="18" fill="#fff6dd"/>'
             '<path d="M-6 -62 L0 -52 L6 -62 Z" fill="#f59e0b"/><path d="M-46 -40 Q-62 -10 -40 10 M46 -40 Q62 -10 40 10" stroke="#6b4429" stroke-width="10" fill="none" stroke-linecap="round"/>'
             '<path d="M-14 4 v8 M-6 4 v8 M6 4 v8 M14 4 v8" stroke="#f59e0b" stroke-width="4" stroke-linecap="round"/>')
    eyes = {"calm": "dot", "happy": "dot", "sleepy": "closed", "surprised": "big", "sad": "dot", "worried": "dot", "proud": "closed"}.get(mood, "dot")
    if eyes == "dot":
        inner += '<circle cx="-18" cy="-72" r="8" fill="#1e293b"/><circle cx="18" cy="-72" r="8" fill="#1e293b"/><circle cx="-15" cy="-75" r="2.5" fill="#fff"/><circle cx="21" cy="-75" r="2.5" fill="#fff"/>'
    elif eyes == "closed":
        inner += '<path d="M-26 -72 q8 6 16 0 M10 -72 q8 6 16 0" stroke="#1e293b" stroke-width="4" fill="none" stroke-linecap="round"/>'
    else:
        inner += '<circle cx="-18" cy="-72" r="11" fill="#1e293b"/><circle cx="18" cy="-72" r="11" fill="#1e293b"/><circle cx="-14" cy="-76" r="3" fill="#fff"/><circle cx="22" cy="-76" r="3" fill="#fff"/>'
    if mood in ("sad", "worried"):
        inner += '<path d="M-34 -96 l14 6 M34 -96 l-14 6" stroke="#3b2414" stroke-width="4" stroke-linecap="round"/>'
    return g(x, y, s, flip, inner)


def firefly(x, y, s=1.0, flip=False, mood="happy", glow=True):
    inner = ('<circle cx="-14" cy="6" r="40" fill="url(#glow)"/>' if glow else '') + (
        '<ellipse cx="-4" cy="-14" rx="14" ry="20" fill="#e0f2fe" opacity=".75" transform="rotate(-25 -4 -14)"/>'
        '<ellipse cx="8" cy="-14" rx="14" ry="20" fill="#e0f2fe" opacity=".75" transform="rotate(25 8 -14)"/>'
        f'<ellipse cx="-16" cy="6" rx="14" ry="11" fill="{"#fde047" if glow else "#a3a37a"}"/><ellipse cx="4" cy="2" rx="12" ry="10" fill="#475569"/>'
        '<circle cx="18" cy="-4" r="11" fill="#334155"/><path d="M20 -14 q4 -12 12 -14 M24 -12 q8 -8 16 -6" stroke="#334155" stroke-width="2" fill="none"/>'
        + face(19, -5, mood, 0.4, ink="#fff", cheeks=False))
    return g(x, y, s, flip, inner)


def tiger(x, y, s=1.0, flip=False, mood="happy"):
    stripes = "".join(f'<path d="M{dx} -58 q6 14 0 28" stroke="#1f2937" stroke-width="6" fill="none" stroke-linecap="round"/>' for dx in (-30, -12, 6))
    inner = ('<path d="M-60 -40 q-30 -10 -34 -40" stroke="#f59e0b" stroke-width="10" fill="none" stroke-linecap="round"/>'
             '<rect x="-50" y="-14" width="14" height="30" rx="6" fill="#f59e0b"/><rect x="-24" y="-14" width="14" height="30" rx="6" fill="#f59e0b"/>'
             '<rect x="14" y="-14" width="14" height="30" rx="6" fill="#f59e0b"/><rect x="34" y="-14" width="14" height="30" rx="6" fill="#f59e0b"/>'
             '<ellipse cx="-4" cy="-40" rx="62" ry="32" fill="#f59e0b"/>' + stripes +
             '<circle cx="52" cy="-70" r="34" fill="#f59e0b"/><circle cx="30" cy="-100" r="11" fill="#f59e0b"/><circle cx="72" cy="-100" r="11" fill="#f59e0b"/>'
             '<circle cx="30" cy="-100" r="5" fill="#fde68a"/><circle cx="72" cy="-100" r="5" fill="#fde68a"/>'
             '<ellipse cx="54" cy="-56" rx="20" ry="13" fill="#fff7ed"/><path d="M46 -102 v9 M52 -104 v11 M58 -102 v9" stroke="#1f2937" stroke-width="3.5" stroke-linecap="round"/>'
             '<ellipse cx="54" cy="-62" rx="5" ry="4" fill="#be185d"/>' + face(52, -74, mood, 0.85))
    return g(x, y, s, flip, inner)


def cat(x, y, s=1.0, flip=False, mood="happy", color="#9ca3af"):
    inner = (f'<path d="M-40 -20 q-34 -6 -30 -46" stroke="{color}" stroke-width="9" fill="none" stroke-linecap="round"/>'
             f'<ellipse cx="0" cy="-22" rx="40" ry="26" fill="{color}"/><rect x="-30" y="-6" width="11" height="20" rx="5" fill="{color}"/><rect x="18" y="-6" width="11" height="20" rx="5" fill="{color}"/>'
             f'<circle cx="34" cy="-56" r="26" fill="{color}"/><polygon points="14,-74 16,-100 34,-80" fill="{color}"/><polygon points="40,-80 56,-100 56,-72" fill="{color}"/>'
             '<polygon points="19,-80 20,-92 28,-82" fill="#ffc2d1"/><polygon points="45,-82 53,-92 52,-78" fill="#ffc2d1"/>'
             '<path d="M44 -48 h20 M44 -44 l18 4" stroke="#475569" stroke-width="1.5"/>' + face(34, -58, mood, 0.75))
    return g(x, y, s, flip, inner)


def dog(x, y, s=1.0, flip=False, mood="happy", color="#b45309"):
    inner = (f'<path d="M-38 -26 q-22 -14 -18 -32" stroke="{color}" stroke-width="8" fill="none" stroke-linecap="round"/>'
             f'<ellipse cx="0" cy="-22" rx="42" ry="24" fill="{color}"/><rect x="-30" y="-8" width="11" height="22" rx="5" fill="#7c4a03"/><rect x="20" y="-8" width="11" height="22" rx="5" fill="#7c4a03"/>'
             f'<circle cx="40" cy="-48" r="25" fill="{color}"/><ellipse cx="26" cy="-60" rx="9" ry="18" fill="#7c4a03" transform="rotate(-20 26 -60)"/>'
             '<ellipse cx="58" cy="-42" rx="12" ry="9" fill="#fde68a"/><circle cx="66" cy="-44" r="5" fill="#111"/>' + face(40, -54, mood, 0.65))
    return g(x, y, s, flip, inner)


def gorilla(x, y, s=1.0, flip=False, mood="happy"):
    inner = ('<rect x="-40" y="-40" width="26" height="50" rx="12" fill="#374151"/><rect x="14" y="-40" width="26" height="50" rx="12" fill="#374151"/>'
             '<ellipse cx="0" cy="-70" rx="56" ry="54" fill="#4b5563"/><ellipse cx="0" cy="-60" rx="32" ry="34" fill="#9ca3af"/>'
             '<path d="M-54 -90 Q-90 -40 -60 10 M54 -90 Q90 -40 60 10" stroke="#374151" stroke-width="22" fill="none" stroke-linecap="round"/>'
             '<circle cx="0" cy="-130" r="34" fill="#4b5563"/><ellipse cx="0" cy="-120" rx="26" ry="22" fill="#d1d5db"/>'
             '<circle cx="-34" cy="-132" r="8" fill="#4b5563"/><circle cx="34" cy="-132" r="8" fill="#4b5563"/>' + face(0, -126, mood, 0.85))
    return g(x, y, s, flip, inner)


def fish(x, y, s=1.0, flip=False, mood="happy", color="#7dd3fc", glass=True):
    body = "url(#glass)" if glass else color
    inner = (f'<path d="M-36 0 L-62 -20 L-58 0 L-62 20 Z" fill="{color}" opacity=".85"/><ellipse cx="0" cy="0" rx="40" ry="26" fill="{body}" stroke="{color}" stroke-width="4"/>'
             f'<path d="M-6 -24 q10 -16 24 -6" fill="{color}" opacity=".8"/>'
             + (f'<path d="M-20 -6 q8 6 16 0 M-14 10 q6 4 12 0" stroke="#fff" stroke-width="3" fill="none" opacity=".9"/>' if glass else "")
             + face(16, -4, mood, 0.68))
    return g(x, y, s, flip, inner)


def caiman(x, y, s=1.0, flip=False, mood="happy", color="#4d8a3a"):
    bumps = "".join(f'<circle cx="{dx}" cy="-30" r="7" fill="{color}"/>' for dx in range(-70, 40, 18))
    inner = (f'<path d="M-80 -6 Q-130 -10 -150 6 Q-120 4 -80 10 Z" fill="{color}"/>' + bumps +
             f'<ellipse cx="-20" cy="-12" rx="70" ry="22" fill="{color}"/><rect x="-60" y="0" width="14" height="14" rx="5" fill="{color}"/><rect x="10" y="0" width="14" height="14" rx="5" fill="{color}"/>'
             f'<path d="M40 -26 Q100 -30 120 -14 L120 0 Q90 6 40 2 Z" fill="{color}"/><path d="M48 -6 L118 -8" stroke="#2d5a22" stroke-width="3"/>'
             + "".join(f'<polygon points="{tx},-8 {tx + 4},-2 {tx + 8},-8" fill="#fff"/>' for tx in range(56, 112, 12)) +
             f'<circle cx="48" cy="-34" r="13" fill="{color}"/><circle cx="72" cy="-32" r="12" fill="{color}"/>'
             + face(60, -36, mood, 0.72, cheeks=False))
    return g(x, y, s, flip, inner)


def frog(x, y, s=1.0, flip=False, mood="happy", big=False):
    bx = 1.6 if big else 1.0
    inner = (f'<ellipse cx="0" cy="-22" rx="{38 * bx}" ry="{26 * bx}" fill="#58cc02"/><ellipse cx="0" cy="-14" rx="{24 * bx}" ry="{14 * bx}" fill="#d9f99d"/>'
             f'<circle cx="-16" cy="{-46 * bx}" r="13" fill="#58cc02"/><circle cx="16" cy="{-46 * bx}" r="13" fill="#58cc02"/>'
             f'<ellipse cx="-30" cy="2" rx="16" ry="7" fill="#4caf15"/><ellipse cx="30" cy="2" rx="16" ry="7" fill="#4caf15"/>'
             + face(0, -44 * bx + 4, mood, 1.0))
    return g(x, y, s, flip, inner)


def cow(x, y, s=1.0, flip=False, mood="happy"):
    inner = ('<rect x="-56" y="-30" width="16" height="40" rx="6" fill="#f8fafc"/><rect x="-26" y="-30" width="16" height="40" rx="6" fill="#f8fafc"/>'
             '<rect x="20" y="-30" width="16" height="40" rx="6" fill="#f8fafc"/><rect x="44" y="-30" width="16" height="40" rx="6" fill="#f8fafc"/>'
             '<ellipse cx="0" cy="-60" rx="76" ry="42" fill="#f8fafc"/><ellipse cx="-30" cy="-70" rx="22" ry="16" fill="#1f2937"/><ellipse cx="20" cy="-48" rx="16" ry="12" fill="#1f2937"/>'
             '<path d="M-74 -66 q-24 6 -20 30" stroke="#f8fafc" stroke-width="6" fill="none"/>'
             '<ellipse cx="80" cy="-96" rx="32" ry="30" fill="#f8fafc"/><ellipse cx="88" cy="-76" rx="24" ry="14" fill="#fbcfe8"/>'
             '<path d="M60 -122 q-6 -14 4 -18 M100 -122 q6 -14 -4 -18" stroke="#fde68a" stroke-width="7" fill="none" stroke-linecap="round"/>'
             + face(80, -102, mood, 1.0))
    return g(x, y, s, flip, inner)


def hen(x, y, s=1.0, flip=False, mood="happy", sing=False):
    inner = ('<line x1="-10" y1="0" x2="-14" y2="16" stroke="#f59e0b" stroke-width="5" stroke-linecap="round"/><line x1="10" y1="0" x2="12" y2="16" stroke="#f59e0b" stroke-width="5" stroke-linecap="round"/>'
             '<path d="M-46 -40 L-70 -66 L-60 -30 Z" fill="#c2410c"/><ellipse cx="0" cy="-30" rx="46" ry="34" fill="#fb923c"/>'
             '<path d="M-20 -36 Q0 -60 26 -34 Q4 -20 -20 -36 Z" fill="#f97316"/>'
             '<circle cx="34" cy="-64" r="22" fill="#fb923c"/><path d="M26 -86 q4 -12 10 0 q4 -12 10 0 q4 -10 8 2" fill="#ef4444"/>'
             + ('<path d="M54 -68 L72 -62 L54 -52 Z" fill="#facc15"/>' if not sing else '<path d="M54 -70 L74 -74 L56 -62 L74 -52 L54 -54 Z" fill="#facc15"/>')
             + '<ellipse cx="50" cy="-48" rx="5" ry="8" fill="#ef4444"/>' + face(36, -66, mood, 0.75))
    return g(x, y, s, flip, inner)


def girl(x, y, s=1.0, flip=False, mood="happy", dress="#ff6aa9", hair="#5b3a1a", skin="#ffcf9e", arm_up=False):
    arm = ('<path d="M-20 -78 Q-40 -110 -30 -130" stroke="{k}" stroke-width="11" fill="none" stroke-linecap="round"/>' if arm_up
           else '<path d="M-22 -80 Q-34 -60 -30 -44" stroke="{k}" stroke-width="11" fill="none" stroke-linecap="round"/>').format(k=skin)
    inner = (f'<rect x="-16" y="-40" width="11" height="40" rx="5" fill="{skin}"/><rect x="5" y="-40" width="11" height="40" rx="5" fill="{skin}"/>'
             '<ellipse cx="-11" cy="2" rx="11" ry="6" fill="#7c3aed"/><ellipse cx="11" cy="2" rx="11" ry="6" fill="#7c3aed"/>'
             f'<path d="M-34 -36 L-20 -96 L20 -96 L34 -36 Z" fill="{dress}"/>' + arm +
             f'<path d="M22 -80 Q34 -60 30 -44" stroke="{skin}" stroke-width="11" fill="none" stroke-linecap="round"/>'
             f'<circle cx="0" cy="-122" r="30" fill="{hair}"/><circle cx="0" cy="-118" r="26" fill="{skin}"/>'
             f'<path d="M-28 -124 Q-20 -152 0 -150 Q22 -152 28 -124 Q12 -140 -6 -136 Q-20 -134 -28 -124 Z" fill="{hair}"/>'
             f'<circle cx="-30" cy="-112" r="10" fill="{hair}"/><circle cx="30" cy="-112" r="10" fill="{hair}"/><circle cx="-30" cy="-112" r="4" fill="#ff6aa9"/><circle cx="30" cy="-112" r="4" fill="#ff6aa9"/>'
             + face(0, -116, mood, 0.85))
    return g(x, y, s, flip, inner)


def grass(x, y, s=1.0, mood="happy", dry=False):
    c1, c2 = ("#58cc02", "#3fa300") if not dry else ("#d9c48a", "#b89b5e")
    blades = "".join(f'<path d="M{dx} 0 Q{dx + lean} {-h / 2} {dx + lean * 1.6} {-h} Q{dx + 6} {-h / 2} {dx + 12} 0 Z" fill="{c1 if i % 2 else c2}"/>'
                     for i, (dx, h, lean) in enumerate([(-48, 70, -10), (-30, 92, -4), (-12, 104, 2), (6, 98, 6), (24, 88, 10), (40, 66, 14)]))
    return g(x, y, s, inner=blades + f'<ellipse cx="0" cy="-36" rx="26" ry="20" fill="{c2}"/>' + face(0, -40, mood, 0.7))


def drop(x, y, s=1.0, mood="happy"):
    return g(x, y, s, inner='<path d="M0 -70 Q-36 -20 -30 0 Q-22 26 0 26 Q22 26 30 0 Q36 -20 0 -70 Z" fill="#59b9ff" stroke="#2d8fe0" stroke-width="3"/>'
             '<ellipse cx="-12" cy="-16" rx="6" ry="12" fill="#fff" opacity=".6"/>' + face(2, -2, mood, 0.65))


def shoe(x, y, s=1.0, flip=False, mood="happy", color="#ef4444", run=False):
    inner = (f'<path d="M-60 0 Q-64 -40 -40 -50 L0 -52 Q10 -30 40 -26 Q72 -22 72 0 Z" fill="{color}"/>'
             '<rect x="-64" y="-6" width="140" height="12" rx="6" fill="#f8fafc"/>'
             '<path d="M-30 -48 l26 14 M-24 -40 l24 14 M-18 -32 l22 12" stroke="#fff" stroke-width="4" stroke-linecap="round"/>'
             + face(30, -24, mood, 0.85, ink="#1e293b")
             + ('<path d="M-90 -40 h-30 M-90 -20 h-40 M-90 0 h-30" stroke="#94a3b8" stroke-width="5" stroke-linecap="round" stroke-dasharray="10 8"/>' if run else ""))
    return g(x, y, s, flip, inner)


def chess(x, y, piece="pawn", s=1.0, flip=False, mood="happy", white=True):
    c = "#f8fafc" if white else "#334155"
    st = "#94a3b8" if white else "#0f172a"
    ink = "#1e293b" if white else "#ffffff"
    base = f'<rect x="-42" y="-16" width="84" height="16" rx="6" fill="{c}" stroke="{st}" stroke-width="3"/><path d="M-30 -16 Q-26 -40 -18 -60 L18 -60 Q26 -40 30 -16 Z" fill="{c}" stroke="{st}" stroke-width="3"/>'
    if piece == "pawn":
        top, fy = f'<circle cx="0" cy="-84" r="28" fill="{c}" stroke="{st}" stroke-width="3"/>', -84
    elif piece == "king":
        top, fy = (f'<rect x="-26" y="-118" width="52" height="60" rx="14" fill="{c}" stroke="{st}" stroke-width="3"/>'
                   f'<rect x="-5" y="-150" width="10" height="34" fill="#fbbf24"/><rect x="-16" y="-140" width="32" height="10" fill="#fbbf24"/>'), -90
    elif piece == "queen":
        top, fy = (f'<rect x="-26" y="-116" width="52" height="58" rx="18" fill="{c}" stroke="{st}" stroke-width="3"/>'
                   '<path d="M-26 -116 L-20 -140 L-8 -122 L0 -146 L8 -122 L20 -140 L26 -116 Z" fill="#fbbf24"/>'), -88
    elif piece == "knight":
        top, fy = (f'<path d="M-22 -60 Q-30 -100 -6 -126 L12 -140 L14 -122 Q44 -104 40 -80 Q30 -74 14 -82 Q16 -70 22 -60 Z" fill="{c}" stroke="{st}" stroke-width="3"/>'
                   f'<path d="M-6 -126 Q-20 -112 -22 -86" stroke="{st}" stroke-width="6" fill="none"/>'), -104
    elif piece == "rook":
        top, fy = f'<path d="M-26 -60 L-26 -112 L-14 -112 L-14 -100 L-4 -100 L-4 -112 L6 -112 L6 -100 L16 -100 L16 -112 L26 -112 L26 -60 Z" fill="{c}" stroke="{st}" stroke-width="3"/>', -82
    else:  # bishop
        top, fy = f'<ellipse cx="0" cy="-90" rx="24" ry="34" fill="{c}" stroke="{st}" stroke-width="3"/><circle cx="0" cy="-128" r="7" fill="{c}" stroke="{st}" stroke-width="3"/>', -88
    fx = 10 if piece == "knight" else 0
    return g(x, y, s, flip, base + top + face(fx, fy, mood, 0.7, ink=ink))
