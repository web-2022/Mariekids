"""Carpeta de cada cuento según la edad para la que se escribió (Cuentos/<carpeta>/cuentoNN.html)."""
CARPETAS = {
    "3-anios": [13, 14, 20, 21, 36, 39],
    "4-5-anios": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 16, 17, 18, 19, 22, 24, 25, 26, 27, 31, 32, 33, 34, 35, 37, 38],
    "primaria-1-2": [11, 12, 23, 28],
    "primaria-3-4": [29, 30],
    "primaria-5-6": [],
    "secundaria": [],
}
CARPETA = {n: c for c, ns in CARPETAS.items() for n in ns}
