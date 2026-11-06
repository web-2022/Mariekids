/* =========================================================
   VOCES DE CUENTO — complemento para los cuentos de MK

   Agrega el botón "🎙️ Voz" junto a las ayudas de lectura.
   El niño elige un personaje (Hada, Abuelito, Osito…) y todo
   lo que se lee en el cuento usa esa voz: tono y velocidad
   cambian, y se busca una voz de mujer o de hombre del celular.
   También se puede elegir cualquier voz en español del equipo.

   Uso: antes de </body>, después de lectura.js
   <script src="assets/voces.js" defer></script>
========================================================= */
(function () {
    "use strict";
    var synth = window.speechSynthesis;
    if (!synth) return;

    var KEY = "mk-cuento-voz";
    var BASE_RATE = 0.9; // velocidad normal de los cuentos

    var PRESETS = [
        { id: "hada", icon: "🧚", name: "Hada Narradora", desc: "Dulce y mágica", gender: "f", pitch: 1.35, rate: 0.92,
          hello: "¡Hola! Soy el Hada Narradora. ¿Leemos un cuento mágico juntos?" },
        { id: "profe", icon: "👩‍🏫", name: "Profe Cariñosa", desc: "Clara y tranquila", gender: "f", pitch: 1.1, rate: 0.85,
          hello: "Hola, mi amor. Ponte cómodo, que vamos a leer un cuento muy bonito." },
        { id: "osito", icon: "🐻", name: "Osito Tierno", desc: "Chiquita y graciosa", gender: "f", pitch: 1.8, rate: 0.95,
          hello: "¡Hola, hola! Soy el Osito Tierno. ¡Me encantan los cuentos!" },
        { id: "abuelito", icon: "👴", name: "Abuelito Cuentacuentos", desc: "Calmada, como antes de dormir", gender: "m", pitch: 0.8, rate: 0.8,
          hello: "Había una vez… un abuelito que sabía muchos cuentos. ¿Quieres escuchar uno?" },
        { id: "heroe", icon: "🦸", name: "Héroe Aventurero", desc: "Con energía y emoción", gender: "m", pitch: 1.05, rate: 1.0,
          hello: "¡Prepárate! ¡Esta historia está llena de aventuras!" },
        { id: "gigante", icon: "🦕", name: "Gigante Bonachón", desc: "Grave y divertida", gender: "m", pitch: 0.45, rate: 0.78,
          hello: "Hooola, pequeñín. Soy un gigante muy bueno. ¡Vamos a leer!" }
    ];

    var FEMALE = /(female|mujer|paulina|m[oó]nica|sabina|helena|laura|dalia|elvira|luc[ií]a|paloma|camila|francisca|isabela|marisol|soledad|esperanza|elena|ximena|salom[eé]|catalina|valentina|renata|larissa|abril|irene|elsa|hilda|linda|beatriz|teresa|marta|google espa[ñn]ol|es-us-x-esc|es-us-x-esf|es-es-x-eea|es-es-x-eec|es-es-x-eed|es-es-x-eef)/i;
    var MALE = /(male|hombre|jorge|juan|diego|pablo|ra[uú]l|[aá]lvaro|carlos|enrique|gerardo|tom[aá]s|jaime|federico|gonzalo|lorenzo|andr[eé]s|emilio|alonso|es-us-x-esd|es-es-x-eee)/i;

    var state = load();
    function load() {
        try { var s = JSON.parse(localStorage.getItem(KEY)); if (s && s.preset) return s; } catch (e) { }
        return { preset: "hada", voice: "" };
    }
    function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { } }
    function preset(id) { return PRESETS.filter(function (p) { return p.id === (id || state.preset); })[0] || PRESETS[0]; }

    function spanishVoices() {
        return synth.getVoices().filter(function (v) { return /^es/i.test(v.lang); });
    }
    function genderOf(v) {
        var n = v.name + " " + v.voiceURI;
        if (FEMALE.test(n) && !/\bmale\b/i.test(n.replace(/female/ig, ""))) return "f";
        if (MALE.test(n)) return "m";
        return "";
    }
    function langScore(v) {
        return /^es[-_]PE/i.test(v.lang) ? 4 : /^es[-_](419|US|MX|CO|AR|CL)/i.test(v.lang) ? 3 : /^es[-_]ES/i.test(v.lang) ? 1 : 2;
    }
    function pickVoice(p) {
        var list = spanishVoices();
        if (state.voice) {
            var chosen = list.filter(function (v) { return v.voiceURI === state.voice; })[0];
            if (chosen) return chosen;
        }
        var best = null, bestScore = -1;
        list.forEach(function (v) {
            var s = langScore(v) + (genderOf(v) === p.gender ? 10 : genderOf(v) === "" ? 2 : 0) + (v.localService ? 0.5 : 0);
            if (s > bestScore) { best = v; bestScore = s; }
        });
        return best;
    }

    // Todo lo que habla el cuento (botón Leer, palabras, sílabas) pasa por aquí
    var realSpeak = synth.speak.bind(synth);
    function dress(u, p) {
        p = p || preset();
        var v = pickVoice(p);
        if (v) { u.voice = v; u.lang = v.lang; }
        u.pitch = p.pitch;
        u.rate = Math.max(0.5, Math.min(1.6, (u.rate || BASE_RATE) * p.rate / BASE_RATE));
        return u;
    }
    synth.speak = function (u) { if (!u.__mkVoz) dress(u); return realSpeak(u); };

    function sayWith(text, p, voiceURI) {
        synth.cancel();
        var keep = state.voice;
        if (voiceURI !== undefined) state.voice = voiceURI;
        var u = new SpeechSynthesisUtterance(text);
        u.rate = BASE_RATE;
        dress(u, p);
        state.voice = keep;
        u.__mkVoz = true;
        realSpeak(u);
    }

    /* ---------------- Interfaz ---------------- */
    var btn, sheet;
    function addStyles() {
        var css = document.createElement("style");
        css.textContent = [
            ".mk-voz-btn{display:inline-flex;align-items:center;gap:6px;min-height:46px;padding:8px 16px;border:3px solid #fff;border-radius:999px;",
            "background:linear-gradient(180deg,#fb7185,#e11d48);color:#fff;font-size:17px;font-weight:800;box-shadow:0 5px 0 #9f1239,0 8px 18px rgba(0,0,0,.08);cursor:pointer}",
            ".mk-voz-back{position:fixed;inset:0;background:rgba(15,23,42,.45);z-index:50;display:flex;align-items:flex-end;justify-content:center}",
            ".mk-voz-back[hidden]{display:none}",
            ".mk-voz-sheet{width:100%;max-width:560px;max-height:88vh;overflow:auto;background:#fff;border-radius:26px 26px 0 0;padding:18px 16px 24px;",
            "box-shadow:0 -10px 40px rgba(0,0,0,.2);animation:mkvoz .25s ease}",
            "@keyframes mkvoz{from{transform:translateY(40px);opacity:0}}",
            ".mk-voz-sheet h3{margin:0 0 4px;font-size:22px;color:#be123c;text-align:center}",
            ".mk-voz-sheet .sub{margin:0 0 12px;text-align:center;color:#475569;font-size:15px;font-weight:700}",
            ".mk-voz-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}",
            ".mk-voz-card{position:relative;border:3px solid #e2e8f0;border-radius:18px;padding:10px 8px 8px;text-align:center;background:#f8fafc;cursor:pointer}",
            ".mk-voz-card.on{border-color:#e11d48;background:#fff1f2;box-shadow:0 4px 0 #fda4af}",
            ".mk-voz-card .ic{font-size:40px;line-height:1.1}",
            ".mk-voz-card b{display:block;font-size:16px;color:#0f172a;margin-top:2px}",
            ".mk-voz-card small{display:block;font-size:13px;color:#64748b;font-weight:700;min-height:2.4em}",
            ".mk-voz-card .ok{position:absolute;top:6px;right:8px;font-size:18px;display:none}",
            ".mk-voz-card.on .ok{display:block}",
            ".mk-voz-play{margin-top:6px;border:none;border-radius:999px;padding:7px 14px;background:#22c55e;color:#fff;font-weight:800;font-size:14px;box-shadow:0 4px 0 #15803d;cursor:pointer}",
            ".mk-voz-more{margin-top:14px;border-top:2px dashed #e2e8f0;padding-top:10px}",
            ".mk-voz-more summary{cursor:pointer;font-weight:800;color:#1e3a8a;font-size:15px}",
            ".mk-voz-row{display:flex;align-items:center;gap:8px;padding:8px 6px;border-bottom:1px solid #f1f5f9;font-size:14px}",
            ".mk-voz-row label{flex:1;display:flex;gap:8px;align-items:center;cursor:pointer}",
            ".mk-voz-row .mk-voz-play{margin:0;padding:5px 10px}",
            ".mk-voz-done{display:block;width:100%;margin-top:14px;border:none;border-radius:999px;padding:14px;font-size:18px;font-weight:800;color:#fff;",
            "background:linear-gradient(180deg,#3b82f6,#1d4ed8);box-shadow:0 5px 0 #1e3a8a;cursor:pointer}"
        ].join("");
        document.head.appendChild(css);
    }

    function label() { var p = preset(); return "🎙️ Voz: " + p.icon; }

    function render() {
        var cur = preset();
        var cards = PRESETS.map(function (p) {
            return '<div class="mk-voz-card' + (p.id === cur.id ? " on" : "") + '" data-p="' + p.id + '" role="button" tabindex="0">' +
                '<span class="ok">✅</span><div class="ic">' + p.icon + '</div><b>' + p.name + '</b><small>' + p.desc + '</small>' +
                '<button type="button" class="mk-voz-play" data-try="' + p.id + '">▶ Probar</button></div>';
        }).join("");
        var vs = spanishVoices();
        var rows = vs.length ? vs.map(function (v, i) {
            var g = genderOf(v), tag = g === "f" ? "👩" : g === "m" ? "👨" : "🗣️";
            return '<div class="mk-voz-row"><label><input type="radio" name="mkv" value="' + i + '"' + (state.voice === v.voiceURI ? " checked" : "") + '>' +
                tag + ' ' + v.name + ' <small style="color:#94a3b8">(' + v.lang + ')</small></label>' +
                '<button type="button" class="mk-voz-play" data-v="' + i + '">▶</button></div>';
        }).join("") : '<p class="sub">Este equipo no tiene voces en español instaladas.</p>';
        sheet.querySelector(".mk-voz-sheet").innerHTML =
            '<h3>🎙️ ¿Quién te lee el cuento?</h3><p class="sub">Toca ▶ para escuchar y elige tu voz favorita</p>' +
            '<div class="mk-voz-grid">' + cards + '</div>' +
            '<details class="mk-voz-more"' + (state.voice ? " open" : "") + '><summary>🔧 Voces de este celular (' + vs.length + ')</summary>' +
            '<div class="mk-voz-row"><label><input type="radio" name="mkv" value="auto"' + (state.voice ? "" : " checked") + '>✨ Automática (según el personaje)</label></div>' +
            rows + '</details>' +
            '<button type="button" class="mk-voz-done">¡Listo! 📖</button>';
        sheet._vs = vs;
    }

    function open() { render(); sheet.hidden = false; }
    function close() { synth.cancel(); sheet.hidden = true; btn.textContent = label(); }

    function build() {
        addStyles();
        btn = document.createElement("button");
        btn.type = "button";
        btn.className = "mk-voz-btn";
        btn.textContent = label();
        btn.addEventListener("click", open);
        var bar = document.querySelector(".mk-read-tools");
        if (bar) bar.insertBefore(btn, bar.querySelector(".mk-hint"));
        else { var h = document.querySelector("header"); h.parentNode.insertBefore(btn, h.nextSibling); }

        sheet = document.createElement("div");
        sheet.className = "mk-voz-back";
        sheet.hidden = true;
        sheet.innerHTML = '<div class="mk-voz-sheet" role="dialog" aria-label="Elegir voz"></div>';
        document.body.appendChild(sheet);

        sheet.addEventListener("click", function (e) {
            if (e.target === sheet) return close();
            var t;
            if ((t = e.target.closest("[data-try]"))) {
                e.stopPropagation();
                var p = preset(t.dataset.try);
                state.preset = p.id; save(); render();
                sayWith(p.hello, p);
                return;
            }
            if ((t = e.target.closest("[data-v]"))) {
                var v = sheet._vs[+t.dataset.v];
                sayWith(preset().hello, preset(), v.voiceURI);
                return;
            }
            if ((t = e.target.closest(".mk-voz-card"))) { state.preset = t.dataset.p; save(); render(); return; }
            if (e.target.closest(".mk-voz-done")) return close();
        });
        sheet.addEventListener("change", function (e) {
            if (e.target.name !== "mkv") return;
            state.voice = e.target.value === "auto" ? "" : sheet._vs[+e.target.value].voiceURI;
            save();
        });
        if (synth.addEventListener) synth.addEventListener("voiceschanged", function () { if (!sheet.hidden) render(); });
    }

    window.mkVoces = { presets: PRESETS, state: function () { return state; }, pick: function (id) { return pickVoice(preset(id)); } };

    function start() { if (document.querySelector(".scene-card")) setTimeout(build, 0); }
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
    else start();
})();
