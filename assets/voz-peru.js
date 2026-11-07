/* =========================================================
   VOZ PERUANA — módulo común de voz para MK / MVG Learning

   Hace que la app hable pausado y claro, como una profesora
   peruana con niños:
   • Elige una voz de Perú o de Latinoamérica (evita España).
   • Lee frase por frase, con silencios en comas, puntos y preguntas.
   • Velocidad según lo que se lee: leer 0.85 · explicar 0.80 · sílabas 0.70.
   • Arregla el texto para el oído: sin emojis, símbolos leídos bien,
     sílabas (ca-sa) separadas con pausa. Lo que se ve en pantalla no cambia.

   Uso: <script src="assets/voz-peru.js"></script> antes de </body>,
   DESPUÉS de los scripts de la página. Si la página tiene speakText(),
   speakTheory(), speakExamples()…, se reemplazan solos.
   API: MKVoz.speak(texto, {modo: "leer" | "explicar" | "silabas", lang})
        MKVoz.stop() · MKVoz.paraOido(texto)
========================================================= */
(function () {
    "use strict";
    var synth = window.speechSynthesis;
    if (!synth || window.MKVoz) return;

    var RATE = { leer: 0.85, explicar: 0.80, silabas: 0.70, palabra: 0.75 };
    var PITCH = 1.03;
    var PAUSA = { coma: 250, dos: 350, punto: 450, pregunta: 550, parrafo: 700, silaba: 320 };
    var MAX = 160; // caracteres por trozo (Chrome corta las frases muy largas)

    /* ---------- Elegir la voz ---------- */
    var LATAM = /^es[-_](PE|419|US|MX|CO|AR|CL|VE|EC|BO|UY|PY|CR|PA|DO|GT|HN|SV|NI|PR|CU)/i;
    var BUENA = /(natural|neural|online|premium|enhanced|google)/i;
    function score(v) {
        var s = 0;
        if (/^es[-_]PE/i.test(v.lang) || /per[uú]/i.test(v.name)) s += 100;
        else if (LATAM.test(v.lang)) s += 60;
        else if (/^es[-_]ES/i.test(v.lang)) s += 5;
        else if (/^es/i.test(v.lang)) s += 30;
        else return -1;
        if (BUENA.test(v.name)) s += 15;
        if (/(female|mujer|camila|paulina|sabina|dalia|elena|valentina|ximena|helena|google espa)/i.test(v.name)) s += 3;
        return s;
    }
    var cacheVoz = null;
    function vozEs() {
        var vs = synth.getVoices() || [], best = null, bs = -1;
        vs.forEach(function (v) { var s = score(v); if (s > bs) { bs = s; best = v; } });
        cacheVoz = best;
        return best;
    }
    function vozEn() {
        var vs = synth.getVoices() || [];
        return vs.filter(function (v) { return /^en[-_]US/i.test(v.lang); }).sort(function (a, b) { return BUENA.test(b.name) - BUENA.test(a.name); })[0]
            || vs.filter(function (v) { return /^en/i.test(v.lang); })[0] || null;
    }
    if (synth.addEventListener) synth.addEventListener("voiceschanged", vozEs);

    /* ---------- Texto pensado para el oído ---------- */
    var ORD = { "1": "primero", "2": "segundo", "3": "tercero", "4": "cuarto", "5": "quinto", "6": "sexto", "7": "séptimo", "8": "octavo", "9": "noveno", "10": "décimo" };
    var NOMBRES = [[/\bAaron\b/gi, "Aarón"], [/\bDanny\b/g, "Dani"]];
    function paraOido(t) {
        t = String(t == null ? "" : t);
        t = t.replace(/<br\s*\/?>/gi, ". ").replace(/<[^>]+>/g, " ")
            .replace(/&nbsp;/g, " ").replace(/&amp;/g, " y ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;|&#39;/g, "");
        t = t.replace(/[0-9#*]️?⃣/g, " ");                 // 1️⃣ 2️⃣ (no dejar el número suelto)
        t = t.replace(/(\d+)\.º/g, function (m, n) { return ORD[n] || n; }).replace(/(\d+)\.ª/g, function (m, n) { return (ORD[n] || n).replace(/o$/, "a"); });
        t = t.replace(/\bS\/\s?(\d+)/g, "$1 soles").replace(/\bN\.º/g, "número").replace(/\bpág\./g, "página").replace(/\betc\./g, "etcétera").replace(/\bEj\./g, "Por ejemplo,");
        t = t.replace(/(\d)\s*kg\b/g, "$1 kilos").replace(/(\d)\s*cm\b/g, "$1 centímetros");
        // flechas: en secuencias de acciones → «después»; entre letras o sílabas → «se lee»
        t = t.replace(/(\S+)\s*(?:→|➡️?|->)\s*/g, function (m, a) { return a.replace(/[^\wáéíóúñü]/gi, "").length <= 3 ? a + " se lee " : a + ", después, "; });
        t = t.replace(/·/g, ", ").replace(/\s\/\s/g, " o ").replace(/([a-záéíóúñü])\/(?=[a-záéíóúñü])/gi, "$1 o ").replace(/\s\+\s/g, " más ").replace(/\s=\s/g, " es igual a ")
            .replace(/\s>\s/g, " es mayor que ").replace(/\s<\s/g, " es menor que ").replace(/×/g, " por ").replace(/\s[−–]\s(?=\d)/g, " menos ");
        t = t.replace(/\b([A-D])\)\s/g, "$1, ");                       // A) B) C)
        t = t.replace(/[«»“”"]/g, "").replace(/[(\[]/g, ", ").replace(/[)\]]/g, ", ");
        t = t.replace(/[\u{1F000}-\u{1FAFF}\u{2190}-\u{21FF}\u{2300}-\u{23FF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{1F1E6}-\u{1F1FF}️‍⃣✓✔✗✘★☆•▪◦]/gu, " ");
        // «c - asa» (opciones de separar) → «c-asa»
        t = t.replace(/\b([a-záéíóúñü]{1,5})\s+-\s+(?=[a-záéíóúñü])/gi, "$1-");
        // «pelota. Pe lo ta.» → sílabas: «pelota. Pe-lo-ta.»
        var sinTilde = function (x) { return x.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); };
        t = t.replace(/([a-záéíóúñü]{3,})([.:,]\s+)((?:[a-záéíóúñü]{1,4}\s+){1,5}[a-záéíóúñü]{1,4})(?=[.,;:!?]|$)/gi, function (m, w, sep, sy) {
            var parts = sy.split(/\s+/);
            return sinTilde(parts.join("")) === sinTilde(w) ? w + sep + parts.join("-") : m;
        });
        NOMBRES.forEach(function (r) { t = t.replace(r[0], r[1]); });
        t = t.replace(/\b(\d{1,2})\s+\1\.\s/g, "$1. ").replace(/(^\s*|[.!?:]\s+)(\d{1,2})\.\s+(?=[A-ZÁÉÍÓÚÑ¿¡])/g, "$1$2, ");   // «1. Sílabas…» → «1, Sílabas…»
        // puntuación ordenada: «Pasos:.» «..» «?.» «, .»
        t = t.replace(/\s+([.,;:?!])/g, "$1").replace(/([:;,])\s*\./g, "$1").replace(/([?!])\s*\./g, "$1").replace(/\.{2,}(?!\.)/g, ".").replace(/…/g, "...")
            .replace(/,\s*,+/g, ",").replace(/([.?!])\s*,/g, "$1").replace(/^\s*[,.:;]\s*/, "");
        return t.replace(/\s+/g, " ").trim();
    }

    /* ---------- Partir en trozos con su pausa ---------- */
    var SIL = /^[a-záéíóúñü]{1,5}(?:-[a-záéíóúñü]{1,5})+$/i;
    function trozos(texto, modo) {
        var out = [];
        var frases = texto.match(/[^.?!:;]+(?:\.{3}|[.?!:;]+)?\s*/g) || [texto];
        frases.forEach(function (f) {
            f = f.trim(); if (!f) return;
            var fin = /\?$|!$/.test(f) ? PAUSA.pregunta : /\.\.\.$/.test(f) ? PAUSA.parrafo : /[:;]$/.test(f) ? PAUSA.dos : PAUSA.punto;
            // listas de sílabas o palabras muy cortas: «ma, me, mi, mo, mu» → una por una, despacio
            var items = f.replace(/[.?!:;]+$/, "").split(/\s*,\s*/);
            var cortas = items.length >= 3 && items.every(function (x) { return x.length > 0 && x.length <= 4; });
            var partes = f.length > MAX || cortas ? f.replace(/,\s+/g, ",\u0001").split("\u0001") : [f];
            partes.forEach(function (p, i) {
                var ult = i === partes.length - 1;
                // palabras separadas en sílabas (ca-sa) se leen sílaba por sílaba
                var piezas = p.split(/(\s+)/), buf = "";
                piezas.forEach(function (w) {
                    var limpio = w.replace(/[.,;:?!¿¡]/g, "");
                    if (SIL.test(limpio)) {
                        if (buf.trim()) out.push({ t: buf.trim(), m: cortas ? "silabas" : modo, pausa: PAUSA.coma });
                        buf = "";
                        var ss = limpio.split("-");
                        ss.forEach(function (s, k) { out.push({ t: s, m: "silabas", pausa: k === ss.length - 1 ? PAUSA.punto : PAUSA.silaba }); });
                    } else buf += w;
                });
                if (buf.trim() && /[\wáéíóúñü]/i.test(buf)) out.push({ t: buf.trim(), m: cortas ? "silabas" : modo, pausa: ult ? fin : PAUSA.coma });
                else if (out.length) out[out.length - 1].pausa = Math.max(out[out.length - 1].pausa, ult ? fin : PAUSA.coma);
            });
        });
        return out;
    }

    /* ---------- Hablar ---------- */
    var token = 0, realSpeak = synth.speak.bind(synth), realCancel = synth.cancel.bind(synth);
    function stop() { token++; realCancel(); }
    function speak(texto, o) {
        o = o || {};
        var modo = o.modo || "leer", en = /^en/i.test(o.lang || "");
        var lista = en ? [{ t: String(texto), m: modo, pausa: 0 }] : trozos(paraOido(texto), modo);
        stop();
        var mio = token, i = 0;
        var voz = en ? vozEn() : (cacheVoz || vozEs());
        (function siguiente() {
            if (mio !== token || i >= lista.length) { if (mio === token && o.onend) o.onend(); return; }
            var tr = lista[i++], u = new SpeechSynthesisUtterance(tr.t);
            if (voz) { u.voice = voz; u.lang = voz.lang; } else u.lang = en ? "en-US" : "es-PE";
            u.rate = (o.rate || RATE[tr.m] || RATE.leer) * (window.MKVozVelocidad || 1);
            u.pitch = o.pitch || PITCH;
            u.__mkVozPeru = true;
            var listo = false;
            var seguir = function () { if (listo) return; listo = true; if (mio === token) setTimeout(siguiente, tr.pausa); };
            u.onend = seguir;
            u.onerror = function (e) { if (e && (e.error === "interrupted" || e.error === "canceled")) return; seguir(); };
            realSpeak(u);
        })();
    }
    document.addEventListener("visibilitychange", function () { if (document.hidden) stop(); });

    window.MKVoz = { speak: speak, stop: stop, paraOido: paraOido, trozos: trozos, voz: function () { return cacheVoz || vozEs(); }, RATE: RATE, PAUSA: PAUSA };

    /* ---------- Conectar con las páginas que ya tienen sus funciones de voz ---------- */
    var modoActual = null;
    function envolver(nombre, modo) {
        var f = window[nombre];
        if (typeof f !== "function" || f.__mkVoz) return;
        var g = function () { var prev = modoActual; modoActual = modo; try { return f.apply(this, arguments); } finally { modoActual = prev; } };
        g.__mkVoz = true; window[nombre] = g;
    }
    function conectar() {
        if (typeof window.speakText === "function" && !window.speakText.__mkVoz) {
            var nuevo = function (text) { speak(text, { modo: modoActual || "leer" }); };
            nuevo.__mkVoz = true; window.speakText = nuevo;
        }
        ["speakTheory", "speakCurrentTheory", "speakExamples", "speakExplanation", "speakHint"].forEach(function (n) { envolver(n, "explicar"); });
        ["speakQuestion"].forEach(function (n) { envolver(n, "leer"); });
        ["speakWord", "speakSyllables"].forEach(function (n) { envolver(n, "silabas"); });
    }
    conectar();
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", conectar);
    window.addEventListener("load", conectar);
})();
