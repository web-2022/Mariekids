/* =========================================================
   MK JUEGOS — base común de los juegos de matemáticas
   (1.º de Primaria)

   window.MKJ.question(nivel)  → pregunta con 3 opciones
   window.MKJ.sound(nombre)    → "ok", "error", "salto", "moneda", "puerta", "gana"
   window.MKJ.say(texto)       → lee en voz alta
   window.MKJ.stars(...)       → guarda y lee estrellas por juego
   window.MKJ.confetti()       → celebración
========================================================= */
(function () {
    "use strict";

    function rnd(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
    function pick(list) { return list[rnd(0, list.length - 1)]; }
    function shuffle(list) {
        for (var i = list.length - 1; i > 0; i--) { var j = rnd(0, i); var t = list[i]; list[i] = list[j]; list[j] = t; }
        return list;
    }

    // Tres opciones: la correcta y dos cercanas, sin repetir y sin negativos
    function options(answer, max) {
        var set = [answer];
        var tries = 0;
        while (set.length < 3 && tries < 50) {
            tries++;
            var d = pick([-3, -2, -1, 1, 2, 3, 10, -10]);
            var o = answer + d;
            if (o >= 0 && o <= (max || 99) && set.indexOf(o) < 0) set.push(o);
        }
        while (set.length < 3) set.push(set[set.length - 1] + 1);
        return shuffle(set);
    }

    var EMOJIS = ["🍎", "⭐", "🐟", "🎈", "🍓", "🐞", "⚽", "🌸", "🧁", "🚗"];

    /* ---------- Tipos de pregunta ---------- */
    var TYPES = {
        // nivel 1: hasta 10
        suma10: function () {
            var a = rnd(1, 7), b = rnd(1, 10 - a);
            return { text: a + " + " + b + " = ?", speak: a + " más " + b, answer: a + b };
        },
        resta10: function () {
            var a = rnd(3, 10), b = rnd(1, a - 1);
            return { text: a + " − " + b + " = ?", speak: a + " menos " + b, answer: a - b };
        },
        contar: function () {
            var n = rnd(3, 10), e = pick(EMOJIS);
            return { text: "¿Cuántos hay?", visual: new Array(n + 1).join(e), speak: "¿Cuántos hay?", answer: n };
        },
        despues: function () {
            var n = rnd(5, 19);
            return { text: "¿Qué número va después del " + n + "?", speak: "¿Qué número va después del " + n + "?", answer: n + 1 };
        },
        antes: function () {
            var n = rnd(6, 20);
            return { text: "¿Qué número va antes del " + n + "?", speak: "¿Qué número va antes del " + n + "?", answer: n - 1 };
        },
        // nivel 2: hasta 20
        suma20: function () {
            var a = rnd(5, 12), b = rnd(2, 20 - a);
            return { text: a + " + " + b + " = ?", speak: a + " más " + b, answer: a + b };
        },
        resta20: function () {
            var a = rnd(11, 20), b = rnd(2, 10);
            return { text: a + " − " + b + " = ?", speak: a + " menos " + b, answer: a - b };
        },
        mayor: function () {
            var a = rnd(2, 20), b = rnd(2, 20);
            while (b === a) b = rnd(2, 20);
            var c = rnd(2, 20);
            while (c === a || c === b) c = rnd(2, 20);
            var ans = Math.max(a, b, c);
            return { text: "¿Cuál es el número mayor?", speak: "¿Cuál es el número mayor?", answer: ans, opts: shuffle([a, b, c]) };
        },
        // nivel 3: completar y decenas
        completar: function () {
            var a = rnd(2, 10), r = rnd(a + 2, 18);
            return { text: a + " + ▢ = " + r, speak: a + " más cuánto es " + r, answer: r - a };
        },
        decenas: function () {
            var d = rnd(1, 2), u = rnd(0, 9);
            var n = d * 10 + u;
            if (n > 20) { d = 1; n = 10 + u; }
            return {
                text: d + " decena" + (d > 1 ? "s" : "") + " y " + u + " unidad" + (u === 1 ? "" : "es") + " = ?",
                speak: d + " decena" + (d > 1 ? "s" : "") + " y " + u + " unidades", answer: n
            };
        }
    };

    var LEVELS = {
        1: ["suma10", "suma10", "resta10", "contar", "despues", "antes"],
        2: ["suma20", "suma20", "resta20", "resta10", "mayor", "despues"],
        3: ["completar", "decenas", "suma20", "resta20", "completar", "mayor"]
    };

    function question(level) {
        var type = pick(LEVELS[Math.min(3, Math.max(1, level || 1))]);
        var q = TYPES[type]();
        q.type = type;
        q.options = q.opts || options(q.answer, 20);
        return q;
    }

    /* ---------- Sonidos (sin archivos) ---------- */
    var ctx = null;
    var soundOn = true;
    try { soundOn = localStorage.getItem("mvg-sonido") !== "off"; } catch (e) { }

    function tone(freq, start, dur, type, vol) {
        var o = ctx.createOscillator(), g = ctx.createGain();
        o.type = type || "sine";
        o.frequency.setValueAtTime(freq, ctx.currentTime + start);
        g.gain.setValueAtTime(vol || 0.2, ctx.currentTime + start);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + dur);
        o.connect(g).connect(ctx.destination);
        o.start(ctx.currentTime + start);
        o.stop(ctx.currentTime + start + dur + 0.02);
    }

    function sound(name) {
        if (!soundOn) return;
        try {
            ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
            if (ctx.state === "suspended") ctx.resume();
            switch (name) {
                case "ok": tone(660, 0, 0.12); tone(990, 0.1, 0.2); break;
                case "error": tone(300, 0, 0.15, "triangle"); tone(220, 0.12, 0.25, "triangle"); break;
                case "salto": tone(420, 0, 0.08, "square", 0.08); tone(620, 0.05, 0.1, "square", 0.06); break;
                case "moneda": tone(988, 0, 0.07, "square", 0.08); tone(1319, 0.06, 0.15, "square", 0.08); break;
                case "puerta": tone(330, 0, 0.1); tone(440, 0.08, 0.1); tone(550, 0.16, 0.18); break;
                case "gana": [523, 659, 784, 1047].forEach(function (f, i) { tone(f, i * 0.12, 0.25); }); break;
                case "caida": tone(500, 0, 0.3, "sawtooth", 0.06); tone(200, 0.15, 0.3, "sawtooth", 0.06); break;
                default: tone(520, 0, 0.12);
            }
        } catch (e) { }
    }

    function setSound(on) {
        soundOn = on;
        try { localStorage.setItem("mvg-sonido", on ? "on" : "off"); } catch (e) { }
        if (!on && window.speechSynthesis) speechSynthesis.cancel();
    }

    /* ---------- Voz ---------- */
    function say(text) {
        if (!soundOn || !window.speechSynthesis) return;
        try {
            speechSynthesis.cancel();
            var u = new SpeechSynthesisUtterance(text);
            var v = speechSynthesis.getVoices().find(function (x) { return /^es/i.test(x.lang); });
            if (v) u.voice = v;
            u.lang = (v && v.lang) || "es-PE";
            u.rate = 0.85;
            u.pitch = 1.1;
            speechSynthesis.speak(u);
        } catch (e) { }
    }

    /* ---------- Estrellas guardadas por juego ---------- */
    function stars(game, value) {
        var key = "mkj-estrellas-" + game;
        try {
            if (typeof value === "number") {
                var best = Number(localStorage.getItem(key) || 0);
                if (value > best) localStorage.setItem(key, String(value));
            }
            return Number(localStorage.getItem(key) || 0);
        } catch (e) { return 0; }
    }

    /* ---------- Confeti ---------- */
    function confetti() {
        var colors = ["#ff6aa9", "#ffc800", "#58cc02", "#0f9dff", "#8b5cf6", "#ff9600"];
        for (var i = 0; i < 70; i++) {
            var p = document.createElement("i");
            p.style.cssText = "position:fixed;z-index:9999;top:-12px;left:" + Math.random() * 100 + "vw;width:10px;height:14px;" +
                "background:" + pick(colors) + ";border-radius:3px;pointer-events:none;" +
                "transform:rotate(" + rnd(0, 360) + "deg);transition:transform 1.8s ease-out, top 1.8s ease-in, opacity 1.8s";
            document.body.appendChild(p);
            (function (el) {
                requestAnimationFrame(function () {
                    el.style.top = (60 + Math.random() * 45) + "vh";
                    el.style.transform = "rotate(" + rnd(360, 900) + "deg) translateX(" + rnd(-80, 80) + "px)";
                    el.style.opacity = "0";
                });
                setTimeout(function () { el.remove(); }, 2000);
            })(p);
        }
    }

    window.MKJ = {
        question: question, sound: sound, say: say, stars: stars, confetti: confetti,
        rnd: rnd, pick: pick, shuffle: shuffle,
        get soundOn() { return soundOn; }, setSound: setSound
    };
})();
