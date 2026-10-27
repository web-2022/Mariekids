/* =========================================================
   APRENDO A LEER — complemento para los cuentos de MK

   Agrega dos botones a cada cuento:
   • "ABC Mayúsculas": todo el texto del cuento pasa a MAYÚSCULAS.
   • "Sílabas": (solo con mayúsculas) separa cada palabra en sílabas de colores.

   Con MAYÚSCULAS activas se encienden también las ayudas de lectura:
   • Letra más grande y con más espacio.
   • Al tocar una palabra, se escucha despacio, sílaba por sílaba,
     y luego la palabra completa (PA… LO… MA… PALOMA).
   • El botón 🔊 Leer lee más despacio y va resaltando la palabra
     que se está leyendo, para que el niño siga la lectura con la vista.

   Uso: antes de </body> de cada cuento
   <script src="assets/lectura.js" defer></script>
========================================================= */
(function () {
    "use strict";

    var KEY_UPPER = "mk-lectura-mayusculas";
    var KEY_SYLL = "mk-lectura-silabas";
    var TEXT_SELECTOR = ".scene-card p, .scene-card h2, .scene-card h3";

    function read(key, fallback) {
        try { var v = localStorage.getItem(key); return v === null ? fallback : v === "1"; } catch (e) { return fallback; }
    }
    function save(key, on) {
        try { localStorage.setItem(key, on ? "1" : "0"); } catch (e) { }
    }

    /* =====================================================
       SEPARAR EN SÍLABAS (reglas del español)
    ===================================================== */
    var VOWELS = "aeiouáéíóúü";
    var STRONG = "aeoáéíóú";           // í y ú tildadas forman hiato
    var INSEPARABLE = ["bl", "br", "cl", "cr", "dr", "fl", "fr", "gl", "gr", "kl", "kr", "pl", "pr", "tr"];

    function isVowelAt(w, i) {
        var c = w[i];
        if (VOWELS.indexOf(c) >= 0) return true;
        // la "y" final o antes de consonante suena como vocal: hoy, muy, rey
        if (c === "y" && i > 0 && (i === w.length - 1 || VOWELS.indexOf(w[i + 1]) < 0) && VOWELS.indexOf(w[i - 1]) >= 0) return true;
        return false;
    }

    function syllables(word) {
        var w = word.toLowerCase();
        if (w.length < 3) return [word];

        // Unidades: dígrafos ch, ll, rr cuentan como una consonante
        var units = [];
        for (var i = 0; i < w.length; i++) {
            var pair = w.substr(i, 2);
            if (pair === "ch" || pair === "ll" || pair === "rr") {
                units.push({ s: i, e: i + 2, v: false, t: pair });
                i++;
            } else {
                units.push({ s: i, e: i + 1, v: isVowelAt(w, i), t: w[i] });
            }
        }

        // Núcleos: vocales seguidas forman diptongo salvo hiato (dos fuertes)
        var nuclei = [];
        for (var u = 0; u < units.length; u++) {
            if (!units[u].v) continue;
            var start = u;
            while (u + 1 < units.length && units[u + 1].v) {
                var a = units[u].t, b = units[u + 1].t;
                if (STRONG.indexOf(a) >= 0 && STRONG.indexOf(b) >= 0) break; // hiato
                u++;
            }
            nuclei.push([start, u]);
        }
        if (nuclei.length < 2) return [word];

        // Cortes entre núcleos según las consonantes intermedias
        var cuts = [];
        for (var n = 0; n < nuclei.length - 1; n++) {
            var from = nuclei[n][1] + 1, to = nuclei[n + 1][0]; // consonantes en [from, to)
            var count = to - from, cut;
            if (count === 0) cut = to;                                   // hiato
            else if (count === 1) cut = from;                            // pa-lo-ma
            else if (count === 2) cut = INSEPARABLE.indexOf(units[from].t + units[from + 1].t) >= 0 ? from : from + 1; // li-bro / ár-bol
            else if (count === 3) cut = INSEPARABLE.indexOf(units[from + 1].t + units[from + 2].t) >= 0 ? from + 1 : from + 2; // som-bra / ins-ta
            else cut = from + 2;                                         // ins-truc-ción
            cuts.push(units[cut].s);
        }

        var parts = [], last = 0;
        cuts.forEach(function (c) { parts.push(word.slice(last, c)); last = c; });
        parts.push(word.slice(last));
        return parts.filter(Boolean);
    }

    /* =====================================================
       PREPARAR EL TEXTO: cada palabra en su propia etiqueta
    ===================================================== */
    var WORD_RE = /([A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)/g;

    function wrapNode(node) {
        if (node.nodeType === 3) {
            var text = node.nodeValue;
            if (!/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/.test(text)) return;
            var frag = document.createDocumentFragment();
            var last = 0;
            text.replace(WORD_RE, function (m, word, offset) {
                if (offset > last) frag.appendChild(document.createTextNode(text.slice(last, offset)));
                var span = document.createElement("span");
                span.className = "mk-w";
                span.dataset.word = word;
                syllables(word).forEach(function (s) {
                    var sp = document.createElement("span");
                    sp.className = "mk-s";
                    sp.textContent = s;
                    span.appendChild(sp);
                });
                frag.appendChild(span);
                last = offset + word.length;
                return m;
            });
            if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
            node.parentNode.replaceChild(frag, node);
        } else if (node.nodeType === 1 && !node.matches("button, img, script, style, .mk-w")) {
            Array.prototype.slice.call(node.childNodes).forEach(wrapNode);
        }
    }

    function prepareText() {
        document.querySelectorAll(TEXT_SELECTOR).forEach(function (el) {
            Array.prototype.slice.call(el.childNodes).forEach(wrapNode);
        });
    }

    /* =====================================================
       VOZ
    ===================================================== */
    var synth = window.speechSynthesis;

    function spanishVoice() {
        if (!synth) return null;
        var voices = synth.getVoices();
        return voices.find(function (v) { return /^es[-_](PE|419|US|MX)/i.test(v.lang); }) ||
            voices.find(function (v) { return /^es/i.test(v.lang); }) || null;
    }

    function utter(text, rate) {
        var u = new SpeechSynthesisUtterance(text);
        var v = spanishVoice();
        if (v) u.voice = v;
        u.lang = (v && v.lang) || "es-PE";
        u.rate = rate || 0.75;
        u.pitch = 1.1;
        return u;
    }

    function clearHighlight() {
        document.querySelectorAll(".mk-w.mk-reading").forEach(function (w) { w.classList.remove("mk-reading"); });
    }

    // Toca una palabra: sílaba por sílaba y luego completa
    function speakWord(span) {
        if (!synth) return;
        synth.cancel();
        clearHighlight();
        var word = span.dataset.word.toLowerCase();
        var parts = syllables(word);
        span.classList.add("mk-reading", "mk-tapped");
        setTimeout(function () { span.classList.remove("mk-tapped"); }, 400);

        var queue = parts.length > 1 ? parts.map(function (s) { return [s, 0.55]; }) : [];
        queue.push([word, 0.7]);
        queue.forEach(function (item, i) {
            var u = utter(item[0], item[1]);
            if (i === queue.length - 1) u.onend = u.onerror = function () { span.classList.remove("mk-reading"); };
            synth.speak(u);
        });
    }

    // 🔊 Leer en modo aprendizaje: más lento y resaltando cada palabra
    function readScene(card) {
        if (!synth) return;
        synth.cancel();
        clearHighlight();

        var words = Array.prototype.slice.call(card.querySelectorAll(".mk-w"))
            .filter(function (w) { return !w.closest("h2, h3"); });
        if (!words.length) return;

        var text = "", starts = [];
        words.forEach(function (w) {
            starts.push(text.length);
            text += w.dataset.word.toLowerCase() + " ";
        });

        var u = utter(text, 0.7);
        var gotBoundary = false;
        u.onboundary = function (e) {
            if (e.name && e.name !== "word") return;
            gotBoundary = true;
            var idx = 0;
            for (var i = 0; i < starts.length; i++) if (starts[i] <= e.charIndex) idx = i;
            clearHighlight();
            words[idx].classList.add("mk-reading");
        };
        u.onend = u.onerror = function () { clearHighlight(); };
        synth.speak(u);

        // Algunos navegadores no avisan qué palabra leen: se avanza por tiempo
        var i = 0;
        var timer = setInterval(function () {
            if (gotBoundary || !synth.speaking || i >= words.length) { clearInterval(timer); return; }
            clearHighlight();
            words[i].classList.add("mk-reading");
            i++;
        }, 520);
    }

    /* =====================================================
       BOTONES Y MODOS
    ===================================================== */
    var upperOn = read(KEY_UPPER, false);
    var syllOn = read(KEY_SYLL, true);
    var upperBtn, syllBtn, hint;

    function applyModes() {
        document.body.classList.toggle("mk-upper", upperOn);
        document.body.classList.toggle("mk-syll", upperOn && syllOn);
        upperBtn.setAttribute("aria-pressed", String(upperOn));
        syllBtn.setAttribute("aria-pressed", String(syllOn));
        syllBtn.hidden = !upperOn;
        hint.hidden = !upperOn;
    }

    function buildToolbar() {
        var bar = document.createElement("div");
        bar.className = "mk-read-tools";
        bar.setAttribute("role", "toolbar");
        bar.setAttribute("aria-label", "Ayudas para aprender a leer");
        bar.innerHTML =
            '<button type="button" class="mk-tool mk-upper-btn" aria-pressed="false" title="Ver el cuento en MAYÚSCULAS">' +
            '<b>ABC</b> Mayúsculas</button>' +
            '<button type="button" class="mk-tool mk-syll-btn" aria-pressed="true" title="Separar las palabras en sílabas de colores">' +
            '<span class="mk-dot1">SÍ</span><span class="mk-dot2">LA</span><span class="mk-dot1">BAS</span></button>' +
            '<p class="mk-hint">👆 Toca una palabra para escucharla</p>';

        var header = document.querySelector(".app > header, header");
        if (header && header.parentNode) header.parentNode.insertBefore(bar, header.nextSibling);
        else document.body.insertBefore(bar, document.body.firstChild);

        upperBtn = bar.querySelector(".mk-upper-btn");
        syllBtn = bar.querySelector(".mk-syll-btn");
        hint = bar.querySelector(".mk-hint");

        upperBtn.addEventListener("click", function () {
            upperOn = !upperOn;
            save(KEY_UPPER, upperOn);
            if (synth) synth.cancel();
            clearHighlight();
            applyModes();
        });
        syllBtn.addEventListener("click", function () {
            syllOn = !syllOn;
            save(KEY_SYLL, syllOn);
            applyModes();
        });
    }

    function addStyles() {
        var css = document.createElement("style");
        css.textContent = [
            /* Barra de ayudas */
            ".mk-read-tools{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:10px;margin:-6px 0 14px}",
            ".mk-read-tools .mk-tool{display:inline-flex;align-items:center;gap:6px;min-height:46px;padding:8px 16px;",
            "border:3px solid #fff;border-radius:999px;background:#fff;color:#1e3a8a;font-size:17px;font-weight:700;",
            "box-shadow:0 5px 0 #bfdbfe,0 8px 18px rgba(0,0,0,.08);cursor:pointer;line-height:1}",
            ".mk-read-tools .mk-tool b{font-size:19px;letter-spacing:.5px}",
            ".mk-read-tools .mk-tool[aria-pressed='true']{background:linear-gradient(180deg,#8b5cf6,#6d28d9);color:#fff;box-shadow:0 5px 0 #4c1d95}",
            ".mk-read-tools .mk-syll-btn{gap:0;letter-spacing:.5px}",
            ".mk-read-tools .mk-syll-btn[aria-pressed='true']{background:#fff;color:#1e3a8a;box-shadow:0 5px 0 #c4b5fd;border-color:#8b5cf6}",
            ".mk-read-tools .mk-syll-btn[aria-pressed='true'] .mk-dot1{color:#1d4ed8}",
            ".mk-read-tools .mk-syll-btn[aria-pressed='true'] .mk-dot2{color:#e11d48}",
            ".mk-read-tools .mk-hint{width:100%;margin:0;text-align:center;font-size:15px;font-weight:700;color:#475569}",
            ".mk-read-tools [hidden]{display:none!important}",

            /* MAYÚSCULAS y lectura más cómoda */
            "body.mk-upper .scene-card p,body.mk-upper .scene-card h2,body.mk-upper .scene-card h3{text-transform:uppercase;letter-spacing:.06em}",
            "body.mk-upper .scene-card p{font-size:23px;line-height:2.05;font-weight:700}",
            "body.mk-upper .scene-card p.dialogue{font-style:normal}",
            "body.mk-upper .mk-w{cursor:pointer;border-radius:8px;padding:0 2px;transition:background .15s}",
            "body.mk-upper .mk-w:hover{background:#fef3c7}",
            "body.mk-upper .mk-w.mk-reading{background:#fde047;box-shadow:0 0 0 3px #fde047}",
            "body.mk-upper .mk-w.mk-tapped{transform:scale(1.08);display:inline-block}",

            /* Sílabas de colores */
            "body.mk-syll .mk-w .mk-s:nth-child(odd){color:#1d4ed8}",
            "body.mk-syll .mk-w .mk-s:nth-child(even){color:#e11d48}",
            "body.mk-syll .mk-w .mk-s + .mk-s{margin-left:.12em}",
            "body.mk-syll .scene-card h2 .mk-s,body.mk-syll .scene-card h3 .mk-s{color:inherit!important;margin-left:0!important}",

            "@media (max-width:480px){body.mk-upper .scene-card p{font-size:20px}.mk-read-tools .mk-tool{font-size:15px;padding:7px 12px}}"
        ].join("");
        document.head.appendChild(css);
    }

    function start() {
        if (!document.querySelector(".scene-card")) return;
        addStyles();
        prepareText();
        buildToolbar();
        applyModes();

        // Tocar una palabra (solo en modo MAYÚSCULAS)
        document.addEventListener("click", function (e) {
            if (!upperOn) return;
            var w = e.target.closest && e.target.closest(".scene-card .mk-w");
            if (w) speakWord(w);
        });

        // 🔊 Leer: en modo MAYÚSCULAS se usa la lectura lenta con resaltado
        document.addEventListener("click", function (e) {
            if (!upperOn) return;
            var btn = e.target.closest && e.target.closest(".readBtn");
            if (!btn) return;
            e.stopImmediatePropagation();
            e.preventDefault();
            readScene(btn.closest(".scene-card"));
        }, true);

        // Al cambiar de escena se detiene la voz
        ["nextBtn", "prevBtn"].forEach(function (id) {
            var b = document.getElementById(id);
            if (b) b.addEventListener("click", function () { if (synth) synth.cancel(); clearHighlight(); });
        });

        if (synth && synth.onvoiceschanged !== undefined) {
            synth.addEventListener ? synth.addEventListener("voiceschanged", spanishVoice) : null;
        }
    }

    // Para pruebas
    window.mkSilabas = syllables;

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
    else start();
})();
