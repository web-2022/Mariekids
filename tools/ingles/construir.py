#!/usr/bin/env python3
"""Construye las clases de Inglés (eng-*.html) desde tools/ingles/cursos/*.txt y actualiza ruta-ingles.html.

Formato de cada clase (líneas):
  === eng-a0-w2 | 🔢 | A0 · Semana 2 · Clase 1: Números del 0 al 10
  desc: texto corto para el menú
  sub: subtítulo de la página (opcional)
  - 0️⃣ | zero | cero | I have zero candies. | Tengo cero caramelos. || otro ejemplo EN | otro ejemplo ES
    (también:  q: pregunta propia para la frase anterior)
  teoria:
  intro: qué vamos a aprender (español)
  tabla: Título del cuadro ; Columna | Inglés* | Pronunciación     (* = columna en inglés, se puede escuchar)
  | 0 | zero | sírou
  ej: frase en inglés | traducción
  ojo: error típico y cómo evitarlo
  pron: ayuda de pronunciación
  nota: texto libre (español)
Kits de test:  === eng-kit-a0-test | 🧪 | Kit · Test rápido A0   +   kit: a0 8   (nivel y número de preguntas)
"""
import json, re, sys, html
from pathlib import Path

AQUI = Path(__file__).resolve().parent
RAIZ = AQUI.parent.parent
VERSION = "7"
PLANT = (AQUI / "plantilla.html").read_text(encoding="utf8")
NIVELES = ["a0", "a1", "a2", "b1", "b2", "c1", "c2"]
GRUPO = {"a0": "g1", "a1": "g2", "a2": "g3", "b1": "g4", "b2": "g5", "c1": "g6", "c2": "g7", "kit": "g8"}


def parse(path):
    clases, cur, modo = [], None, None
    for n, raw in enumerate(path.read_text(encoding="utf8").splitlines(), 1):
        line = raw.rstrip()
        if not line.strip() or line.lstrip().startswith("#"):
            continue
        if line.startswith("==="):
            slug, emo, title = [x.strip() for x in line[3:].split("|", 2)]
            cur = {"slug": slug, "emoji": emo, "title": title, "items": [], "teoria": None, "desc": "", "sub": ""}
            clases.append(cur); modo = None; continue
        s = line.strip()
        if s == "teoria:":
            cur["teoria"] = {"intro": "", "bloques": [], "ejemplos": [], "ojo": [], "pron": [], "notas": []}; modo = "t"; continue
        if modo != "t":
            if s.startswith("desc:"): cur["desc"] = s[5:].strip(); continue
            if s.startswith("sub:"): cur["sub"] = s[4:].strip(); continue
            if s.startswith("kit:"): k = s[4:].split(); cur["kit"] = (k[0], int(k[1])); continue
            if s.startswith("total:"): cur["total"] = int(s[6:]); continue
            if s.startswith("q:"): cur["items"][-1]["questions"] = [s[2:].strip()]; continue
            if s.startswith("- "):
                main, *more = s[2:].split("||")
                p = [x.strip() for x in main.split("|")]
                if len(p) < 3: sys.exit(f"{path.name}:{n}: frase incompleta: {s}")
                it = {"emoji": p[0], "en": p[1], "es": p[2], "examplesEn": [], "examplesEs": []}
                if len(p) >= 5: it["examplesEn"].append(p[3]); it["examplesEs"].append(p[4])
                for m in more:
                    q = [x.strip() for x in m.split("|")]
                    if len(q) >= 2: it["examplesEn"].append(q[0]); it["examplesEs"].append(q[1])
                cur["items"].append(it); continue
            sys.exit(f"{path.name}:{n}: no entiendo: {s}")
        t = cur["teoria"]
        if s.startswith("intro:"): t["intro"] = (t["intro"] + " " + s[6:].strip()).strip()
        elif s.startswith("tabla:"):
            cap, _, cols = s[6:].partition(";")
            if not cols: cap, cols = "", cap
            cab = [c.strip() for c in cols.split("|")]
            t["bloques"].append({"tit": cap.strip(), "cab": [c.rstrip("*") for c in cab], "en": [i for i, c in enumerate(cab) if c.endswith("*")], "filas": []})
        elif s.startswith("|"):
            t["bloques"][-1]["filas"].append([c.strip() for c in s.strip("|").split("|")])
        elif s.startswith("ej:"): t["ejemplos"].append([x.strip() for x in s[3:].split("|", 1)])
        elif s.startswith("ojo:"): t["ojo"].append(s[4:].strip())
        elif s.startswith("pron:"): t["pron"].append(s[5:].strip())
        elif s.startswith("nota:"): t["notas"].append(s[5:].strip())
        else: sys.exit(f"{path.name}:{n}: no entiendo en teoría: {s}")
    return clases


def titulo_menu(href):
    s = (RAIZ / "ruta-ingles.html").read_text(encoding="utf8")
    m = re.search(r'"title": "([^"]*)",\s*"desc": "[^"]*",\s*"href": "' + re.escape(href) + '"', s)
    return m.group(1) if m else href


def nivel(slug):
    m = re.match(r"eng-(?:kit-)?([abc][012])", slug)
    return m.group(1) if m else "kit"


def main():
    todas = []
    for nv in NIVELES + ["kits"]:
        p = AQUI / "cursos" / f"{nv}.txt"
        if p.exists(): todas += parse(p)
    if not todas: sys.exit("no hay cursos")
    por_nivel = {}
    for c in todas:
        if "kit" not in c: por_nivel.setdefault(nivel(c["slug"]), []).extend(c["items"])
    # siguiente clase (en el orden de los archivos)
    for i, c in enumerate(todas):
        if "kit" in c: continue
        nx = next((d for d in todas[i + 1:] if "kit" not in d), None)
        if nx and nivel(nx["slug"]) == nivel(c["slug"]) or nx:
            c["next"] = {"href": nx["slug"] + ".html", "title": nx["title"]}
        else:   # última clase escrita: sigue con la primera semana del nivel siguiente (aunque aún no esté en los cursos)
            lv = nivel(c["slug"]); i2 = NIVELES.index(lv) + 1 if lv in NIVELES else 99
            c["next"] = {"href": f"eng-{NIVELES[i2]}-w1.html", "title": titulo_menu(f"eng-{NIVELES[i2]}-w1.html")} if i2 < len(NIVELES) else None
    for c in todas:
        if "kit" in c:
            lv, tot = c["kit"]; items = por_nivel.get(lv, [])
            if not items: continue          # ese nivel todavía no está en los cursos: se deja la página como está
            lesson = {"items": items, "total": tot, "pass": 0.8, "next": None}
        else:
            if not c["items"]: sys.exit(f"{c['slug']}: sin frases")
            if not c["teoria"]: sys.exit(f"{c['slug']}: falta la teoría")
            lesson = {"items": c["items"], "total": c.get("total", len(c["items"])), "pass": 0.8, "next": c["next"], "teoria": c["teoria"], "titulo": c["title"]}
        sub = c["sub"] or "Escucha, repite y practica. 👆 Toca cualquier palabra en inglés para escuchar cómo se pronuncia. 📖 Mira la teoría cuando quieras."
        page = (PLANT.replace("{{TITLE}}", html.escape(c["title"])).replace("{{H1}}", html.escape(c["title"]))
                .replace("{{SUB}}", html.escape(sub)).replace("{{V}}", VERSION)
                .replace("{{LESSON}}", json.dumps(lesson, ensure_ascii=False, indent=1)))
        (RAIZ / f"{c['slug']}.html").write_text(page, encoding="utf8")
    menu(todas)
    print(f"{len(todas)} clases construidas ·", ", ".join(f"{k}: {len(v)} frases" for k, v in por_nivel.items()))


def menu(todas):
    f = RAIZ / "ruta-ingles.html"; s = f.read_text(encoding="utf8")
    a = s.index("const topics = ["); b = s.index("];", a) + 1
    topics = json.loads(s[a + len("const topics = "):b])
    ga = s.index("const groups = ["); gb = s.index("];", ga) + 1
    groups = json.loads(s[ga + len("const groups = "):gb])
    by_href = {t["href"]: t for t in topics}
    nid = max(t["id"] for t in topics if isinstance(t["id"], int)) + 1
    prev = {}
    for c in todas:
        href = c["slug"] + ".html"; lv = nivel(c["slug"]); g = next(x for x in groups if x["id"] == GRUPO[lv if "kit" not in c else "kit"])
        t = by_href.get(href)
        if not t:
            t = {"id": nid, "emoji": c["emoji"], "title": "", "desc": "", "href": href, "category": "Kits" if "kit" in c else lv.upper()}; nid += 1
            p = prev.get(g["id"])
            pos = topics.index(by_href[p]) + 1 if p else len(topics)
            topics.insert(pos, t); by_href[href] = t
            gi = g["topicIds"].index(by_href[p]["id"]) + 1 if p and by_href[p]["id"] in g["topicIds"] else len(g["topicIds"])
            g["topicIds"].insert(gi, t["id"])
        t["emoji"] = c["emoji"]; t["title"] = c["title"].replace(" · ", " • ", 1)
        if c["desc"]: t["desc"] = c["desc"]
        prev[g["id"]] = href
    for g in groups:
        g["desc"] = f"{len(g['topicIds'])} clases"
    s = s[:a] + "const topics = " + json.dumps(topics, ensure_ascii=False, indent=4).replace("\n", "\n        ") + s[b:]
    ga = s.index("const groups = ["); gb = s.index("];", ga) + 1
    s = s[:ga] + "const groups = " + json.dumps(groups, ensure_ascii=False, indent=4).replace("\n", "\n        ") + s[gb:]
    f.write_text(s, encoding="utf8")


if __name__ == "__main__":
    main()
