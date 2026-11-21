"""Carpeta de cada cuento según el grado para el que se escribió (Cuentos/<carpeta>/cuentoNN.html)."""
CARPETAS = {
    "3-anios": [13, 14, 20, 21, 36, 39],
    "4-anios": [3, 5, 7, 10, 16, 24, 25, 27, 32, 34, 35],
    "5-anios": [1, 2, 4, 6, 8, 9, 15, 22, 26, 31, 33, 37, 38],
    "primaria-1": [17, 18, 19, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
    "primaria-2": [11, 12, 23, 28],
    "primaria-3": [29, 30, 50],
    "primaria-4": [],
    "primaria-5": [],
    "primaria-6": [],
    "secundaria-1": [],
    "secundaria-2": [],
    "secundaria-3": [],
    "secundaria-4": [],
    "secundaria-5": [],
}
CARPETA = {n: c for c, ns in CARPETAS.items() for n in ns}
