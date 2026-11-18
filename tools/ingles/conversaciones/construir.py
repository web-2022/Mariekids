#!/usr/bin/env python3
"""Construye assets/conversacion/<nivel>.js desde tools/ingles/conversaciones/<nivel>.txt
Formato del .txt:
  @ eng-a0-w2                      ← clase (nombre de la página)
  # 🏪 | Título | Intro en español   ← nueva situación
  > Pregunta de la app | Traducción | Respuesta esperada | variante1 ~ variante2::nota
  ! regex | corrección | explicación  ← error típico del turno anterior (opcional)
  + regex                           ← respuesta aceptada extra (opcional)
Si existe <nivel>-base.js se copia primero (escenarios escritos a mano)."""
import json, os, sys
AQUI = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.abspath(os.path.join(AQUI, "..", "..", ".."))
NIVELES = {"a0": ("A0", "#22c55e"), "a1": ("A1", "#0ea5e9"), "a2": ("A2", "#6366f1"), "b1": ("B1", "#f59e0b"),
           "b2": ("B2", "#ef4444"), "c1": ("C1", "#7c3aed"), "c2": ("C2", "#db2777")}
def leer(nv):
    esc, clase = [], None
    for n, l in enumerate(open(os.path.join(AQUI, nv + ".txt"), encoding="utf-8"), 1):
        l = l.rstrip("\n").strip()
        if not l or l.startswith("//"): continue
        tag, r = l[0], l[1:].strip()
        p = [x.strip() for x in r.split(" | ")]
        if tag == "@": clase = r
        elif tag == "#":
            assert clase and len(p) == 3, (nv, n, l)
            esc.append({"c": clase, "e": p[0], "t": p[1], "i": p[2], "d": []})
        elif tag == ">":
            assert len(p) in (3, 4), (nv, n, l)
            esc[-1]["d"].append([p[0], p[1], p[2], "|".join(v.strip() for v in p[3].split("~")) if len(p) > 3 else "", [], []])
        elif tag == "!":
            assert len(p) == 3, (nv, n, l); esc[-1]["d"][-1][4].append(p)
        elif tag == "+": esc[-1]["d"][-1][5].append(r)
        else: raise SystemExit("línea rara %s:%d %s" % (nv, n, l))
    return esc
def main():
    for nv, (cod, color) in NIVELES.items():
        if not os.path.exists(os.path.join(AQUI, nv + ".txt")): continue
        esc = leer(nv)
        base = os.path.join(AQUI, nv + "-base.js")
        out = "/* GENERADO por tools/ingles/conversaciones/construir.py — edita " + nv + ".txt */\n"
        out += open(base, encoding="utf-8").read() if os.path.exists(base) else ""
        out += "window.MK_CONV = window.MK_CONV || {};\n"
        out += "window.MK_CONV.%s = window.MK_CONV.%s || { nivel: %s, titulo: \"Conversaciones de cada clase\", curso: %s, color: %s, escenarios: [] };\n" % (nv, nv, json.dumps(cod), json.dumps(cod), json.dumps(color))
        out += "window.MK_CONV.%s.escenarios.push(\n" % nv + ",\n".join(json.dumps(e, ensure_ascii=False) for e in esc) + "\n);\n"
        open(os.path.join(RAIZ, "assets", "conversacion", nv + ".js"), "w", encoding="utf-8").write(out)
        clases = sorted(set(e["c"] for e in esc))
        print(nv, len(esc), "situaciones en", len(clases), "clases")
main()
