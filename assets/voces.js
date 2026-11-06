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
          hello: "Hooola, pequeñín. Soy un gigante muy bueno. ¡Vamos a leer!" },
        { id: "familia", icon: "👨‍👩‍👧", name: "Mamá o Papá", desc: "¡Graba tu propia voz!", gender: "f", pitch: 1.1, rate: 0.9,
          hello: "", family: true }
    ];
    var FALLBACK = "hada"; // si una página no tiene grabación, lee el Hada

    var FEMALE = /(female|mujer|paulina|m[oó]nica|sabina|helena|laura|dalia|elvira|luc[ií]a|paloma|camila|francisca|isabela|marisol|soledad|esperanza|elena|ximena|salom[eé]|catalina|valentina|renata|larissa|abril|irene|elsa|hilda|linda|beatriz|teresa|marta|google espa[ñn]ol|es-us-x-esc|es-us-x-esf|es-es-x-eea|es-es-x-eec|es-es-x-eed|es-es-x-eef)/i;
    var MALE = /(male|hombre|jorge|juan|diego|pablo|ra[uú]l|[aá]lvaro|carlos|enrique|gerardo|tom[aá]s|jaime|federico|gonzalo|lorenzo|andr[eé]s|emilio|alonso|es-us-x-esd|es-es-x-eee)/i;

    var state = load();
    function load() {
        try { var s = JSON.parse(localStorage.getItem(KEY)); if (s && s.preset) return s; } catch (e) { }
        return { preset: "hada", voice: "", speed: "normal" };
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
    /* Pronunciación: nombres que la voz lee "en inglés" se escriben como suenan en español.
       Solo cambia lo que se escucha; el texto en pantalla queda igual. */
    var SAY = [[/\bAaron\b/gi, "Aarón"], [/\bDanny\b/g, "Dani"]];
    function sayFix(t) { SAY.forEach(function (r) { t = t.replace(r[0], r[1]); }); return t; }

    function dress(u, p) {
        if (u.text) u.text = sayFix(u.text);
        p = p || preset();
        if (p.family) p = preset(FALLBACK);
        var v = pickVoice(p);
        if (v) { u.voice = v; u.lang = v.lang; }
        u.pitch = p.pitch;
        u.rate = Math.max(0.45, Math.min(1.6, (u.rate || BASE_RATE) * p.rate / BASE_RATE * speed().k));
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

    /* ---------------- Voz de la familia (grabaciones) ----------------
       Cada página del cuento se graba por separado y se guarda SOLO en
       este celular (IndexedDB). No se sube a ningún lado. */
    var STORY = (location.pathname.match(/([^\/]+)\.html/i) || [, "cuento"])[1];
    var DB_NAME = "mk-voz-familia", STORE = "grabaciones", dbp = null;
    var canRecord = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder && window.indexedDB);
    function db() {
        if (dbp) return dbp;
        dbp = new Promise(function (ok, fail) {
            var r = indexedDB.open(DB_NAME, 1);
            r.onupgradeneeded = function () { r.result.createObjectStore(STORE); };
            r.onsuccess = function () { ok(r.result); };
            r.onerror = function () { fail(r.error); };
        });
        return dbp;
    }
    function tx(mode, fn) {
        return db().then(function (d) {
            return new Promise(function (ok, fail) {
                var t = d.transaction(STORE, mode), req = fn(t.objectStore(STORE));
                t.oncomplete = function () { ok(req && req.result); };
                t.onerror = function () { fail(t.error); };
            });
        });
    }
    function keyOf(i) { return STORY + "#" + i; }
    function getRec(i) { return tx("readonly", function (st) { return st.get(keyOf(i)); }).catch(function () { return null; }); }
    function putRec(i, blob) { return tx("readwrite", function (st) { return st.put(blob, keyOf(i)); }); }
    function delRec(i) { return tx("readwrite", function (st) { return st.delete(keyOf(i)); }); }

    var player = new Audio(), playingUrl = null;
    function stopAudio() {
        try { player.pause(); } catch (e) { }
        if (playingUrl) { URL.revokeObjectURL(playingUrl); playingUrl = null; }
    }
    function playBlob(blob) {
        stopAudio(); synth.cancel();
        playingUrl = URL.createObjectURL(blob);
        player.src = playingUrl;
        return player.play().catch(function () { });
    }
    function scenes() { return Array.prototype.slice.call(document.querySelectorAll(".scene-card")); }

    /* ---------------- LECTOR: leer, pausar, velocidad y leer todo ----------------
       Lee frase por frase. Así "Pausar" funciona en todos los celulares
       (al seguir, retoma desde la frase donde se quedó). */
    var SPEEDS = [{ id: "lento", icon: "🐢", name: "Lento", k: 0.72 }, { id: "normal", icon: "🙂", name: "Normal", k: 0.85 }, { id: "rapido", icon: "🐇", name: "Rápido", k: 1.0 }];
    function speed() { return SPEEDS.filter(function (x) { return x.id === state.speed; })[0] || SPEEDS[1]; }

    var R = { on: false, all: false, paused: false, scene: -1, items: [], pos: 0, token: 0, audio: false };
    var bar;

    function sentences(card) {
        var out = [];
        Array.prototype.forEach.call(card.querySelectorAll("p, h3"), function (el) {
            if (el.closest(".mk-rec-bar") || el.closest(".mk-read-tools")) return;
            var t = (el.innerText || "").replace(/\s+/g, " ").trim();
            if (!t) return;
            (t.match(/[^.!?…]+[.!?…»”"]*\s*/g) || [t]).forEach(function (x) {
                x = x.trim(); if (x.replace(/[—\-\s.,!?¡¿…«»"”]/g, "")) out.push({ el: el, text: x });
            });
        });
        return out;
    }
    function mark(el) {
        Array.prototype.forEach.call(document.querySelectorAll(".mk-now"), function (x) { x.classList.remove("mk-now"); });
        if (el) el.classList.add("mk-now");
    }
    function activeIndex() { return scenes().indexOf(document.querySelector(".scene-card.active")); }

    function startScene(i) {
        R.scene = i; R.pos = 0; R.audio = false;
        R.items = sentences(scenes()[i]);
        if (preset().family) {
            getRec(i).then(function (blob) {
                if (!R.on || R.scene !== i) return;
                if (blob) { R.audio = true; playScene(blob); } else step();
            });
        } else step();
        updateBar();
    }
    function playScene(blob) {
        var tk = ++R.token;
        mark(scenes()[R.scene]);
        playBlob(blob);
        player.onended = function () { if (tk === R.token && R.on && !R.paused) sceneDone(); };
    }
    function step() {
        if (!R.on || R.paused) return;
        if (R.pos >= R.items.length) return sceneDone();
        var it = R.items[R.pos], tk = ++R.token;
        mark(it.el);
        var u = new SpeechSynthesisUtterance(it.text);
        u.rate = BASE_RATE;
        u.onend = function () { if (tk !== R.token || !R.on || R.paused) return; R.pos++; setTimeout(step, 250); };
        u.onerror = function (ev) { if (tk !== R.token || !R.on || R.paused) return; if (ev && ev.error === "interrupted") return; R.pos++; setTimeout(step, 250); };
        synth.speak(u);
    }
    function sceneDone() {
        mark(null);
        var list = scenes();
        if (R.all && R.scene < list.length - 1) {
            var nb = document.getElementById("nextBtn");
            R.advancing = true; if (nb) nb.click(); R.advancing = false;
            R.scene = activeIndex();
            try { window.scrollTo({ top: 0, behavior: "smooth" }); } catch (e) { window.scrollTo(0, 0); }
            var tk = ++R.token;
            setTimeout(function () { if (tk === R.token && R.on && !R.paused) startScene(activeIndex()); }, 1200); // pausa para mirar el dibujo
            updateBar();
        } else stop();
    }
    function readFrom(all) {
        stop(true);
        R.on = true; R.all = all; R.paused = false;
        startScene(activeIndex());
    }
    function pause() {
        if (!R.on) return;
        R.paused = true; R.token++;
        if (R.audio) { try { player.pause(); } catch (e) { } } else synth.cancel();
        updateBar();
    }
    function resume() {
        if (!R.on) return;
        R.paused = false;
        if (activeIndex() !== R.scene) return startScene(activeIndex());
        if (R.audio) { var tk = ++R.token; player.onended = function () { if (tk === R.token && R.on && !R.paused) sceneDone(); }; player.play().catch(function () { }); }
        else step();
        updateBar();
    }
    function stop(silent) {
        R.on = false; R.paused = false; R.token++;
        synth.cancel(); stopAudio(); mark(null);
        if (!silent) updateBar();
    }
    function updateBar() {
        if (!bar) return;
        bar.hidden = !R.on;
        if (!R.on) return;
        var n = scenes().length;
        bar.querySelector(".mk-pl-info").textContent = (R.all ? "📖 Cuento completo · " : "🔊 ") + "Página " + (R.scene + 1) + " de " + n;
        var pb = bar.querySelector('[data-pl="pause"]');
        pb.textContent = R.paused ? "▶ Seguir" : "⏸ Pausar";
        pb.classList.toggle("go", R.paused);
        var sp = speed();
        bar.querySelector('[data-pl="speed"]').textContent = sp.icon + " " + sp.name;
    }
    function buildPlayer() {
        bar = document.createElement("div");
        bar.className = "mk-player"; bar.hidden = true;
        bar.innerHTML = '<div class="mk-pl-info"></div><div class="mk-pl-btns">' +
            '<button type="button" data-pl="pause">⏸ Pausar</button>' +
            '<button type="button" data-pl="speed" class="sp">🙂 Normal</button>' +
            '<button type="button" data-pl="stop" class="st">⏹ Parar</button></div>';
        document.body.appendChild(bar);
        bar.addEventListener("click", function (e) {
            var b = e.target.closest("[data-pl]"); if (!b) return;
            var a = b.dataset.pl;
            if (a === "pause") R.paused ? resume() : pause();
            else if (a === "stop") stop();
            else if (a === "speed") {
                var k = SPEEDS.indexOf(speed()); state.speed = SPEEDS[(k + 1) % SPEEDS.length].id; save();
                if (R.on && !R.paused && !R.audio) { R.token++; synth.cancel(); setTimeout(step, 150); } // repite la frase con la nueva velocidad
                updateBar();
            }
        });
    }
    function buildReadAll() {
        var b = document.createElement("button");
        b.type = "button"; b.className = "mk-all-btn"; b.textContent = "📖 Leer todo el cuento";
        b.addEventListener("click", function () {
            // empieza desde la primera página
            var guard = 30;
            while (activeIndex() > 0 && guard--) { var pb = document.getElementById("prevBtn"); R.advancing = true; pb.click(); R.advancing = false; }
            readFrom(true);
        });
        var tools = document.querySelector(".mk-read-tools");
        if (tools) tools.insertBefore(b, tools.querySelector(".mk-hint"));
        else { var h = document.querySelector("header"); h.parentNode.insertBefore(b, h.nextSibling); }
    }

    // 🔊 Leer de cada página: ahora pasa por el lector (con pausa y velocidad)
    window.addEventListener("click", function (e) {
        var b = e.target.closest && e.target.closest(".scene-card .readBtn");
        if (!b) return;
        e.stopImmediatePropagation(); e.preventDefault();
        var i = scenes().indexOf(b.closest(".scene-card"));
        if (R.on && R.scene === i && !R.all) { R.paused ? resume() : pause(); return; }
        stop(true); R.on = true; R.all = false; R.paused = false; startScene(i);
    }, true);
    ["nextBtn", "prevBtn"].forEach(function (id) {
        var b = document.getElementById(id);
        if (b) b.addEventListener("click", function () { if (!R.advancing) stop(); refreshBars(); });
    });

    var recOn = false, rec = null, recChunks = [], recIndex = -1, recTimer = null, recStream = null;
    function pickMime() {
        var c = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg;codecs=opus"];
        for (var k = 0; k < c.length; k++) if (MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(c[k])) return c[k];
        return "";
    }
    function startRec(i) {
        stopAudio(); synth.cancel();
        return navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } }).then(function (stream) {
            recStream = stream; recChunks = []; recIndex = i;
            var mime = pickMime();
            rec = mime ? new MediaRecorder(stream, { mimeType: mime }) : new MediaRecorder(stream);
            rec.ondataavailable = function (ev) { if (ev.data && ev.data.size) recChunks.push(ev.data); };
            rec.onstop = function () {
                stream.getTracks().forEach(function (t) { t.stop(); });
                var blob = new Blob(recChunks, { type: rec.mimeType || mime || "audio/webm" });
                clearTimeout(recTimer); rec = null;
                (blob.size > 1000 ? putRec(recIndex, blob) : Promise.resolve()).then(function () { recIndex = -1; refreshBars(); });
            };
            rec.start();
            recTimer = setTimeout(function () { if (rec) rec.stop(); }, 3 * 60 * 1000); // máximo 3 minutos por página
            refreshBars();
        }).catch(function () {
            alertBar("🎤 No se pudo usar el micrófono. Revisa que la app tenga permiso para usarlo.");
        });
    }
    function alertBar(msg) {
        var a = document.querySelector(".scene-card.active .mk-rec-bar .mk-rec-msg");
        if (a) a.textContent = msg;
    }
    function ensureBars() {
        scenes().forEach(function (card, i) {
            if (card.querySelector(".mk-rec-bar")) return;
            var bar = document.createElement("div");
            bar.className = "mk-rec-bar"; bar.dataset.i = i; bar.hidden = true;
            var rb = card.querySelector(".readBtn");
            if (rb && rb.nextSibling) card.insertBefore(bar, rb.nextSibling); else card.appendChild(bar);
        });
    }
    function refreshBars() {
        ensureBars();
        var list = scenes();
        Promise.all(list.map(function (_, i) { return getRec(i); })).then(function (recs) {
            var done = recs.filter(Boolean).length;
            list.forEach(function (card, i) {
                var bar = card.querySelector(".mk-rec-bar");
                bar.hidden = !recOn;
                if (!recOn) return;
                var has = !!recs[i], live = recIndex === i && rec;
                bar.innerHTML =
                    '<div class="mk-rec-top">🎙️ Página ' + (i + 1) + ' de ' + list.length + ' · ' + (has ? "✅ grabada" : "sin grabar") +
                    '<span class="mk-rec-count">Grabadas: ' + done + '/' + list.length + '</span></div>' +
                    (live
                        ? '<button type="button" class="mk-rec-b stop" data-a="stop">⏹ Detener <span class="mk-rec-dot"></span></button>'
                        : '<button type="button" class="mk-rec-b go" data-a="rec">🔴 ' + (has ? "Grabar otra vez" : "Grabar esta página") + '</button>' +
                          (has ? '<button type="button" class="mk-rec-b" data-a="play">▶ Escuchar</button><button type="button" class="mk-rec-b del" data-a="del">🗑️</button>' : "")) +
                    '<button type="button" class="mk-rec-b done" data-a="close">✔ Terminar</button>' +
                    '<p class="mk-rec-msg">' + (live ? "Grabando… lee el texto de esta página con mucho cariño 💛" : "Lee en voz alta el texto de abajo y luego pasa a la siguiente página.") + '</p>';
            });
        });
    }
    document.addEventListener("click", function (e) {
        var b = e.target.closest && e.target.closest(".mk-rec-b");
        if (!b) return;
        var i = +b.closest(".mk-rec-bar").dataset.i, a = b.dataset.a;
        if (a === "rec") startRec(i);
        else if (a === "stop" && rec) rec.stop();
        else if (a === "play") getRec(i).then(function (bl) { if (bl) playBlob(bl); });
        else if (a === "del") delRec(i).then(refreshBars);
        else if (a === "close") { if (rec) rec.stop(); recOn = false; refreshBars(); }
    });
    function startRecordingMode() {
        recOn = true;
        state.preset = "familia"; save();
        if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(function () { });
        if (btn) btn.textContent = label();
        refreshBars();
        var a = document.querySelector(".scene-card.active .mk-rec-bar");
        if (a) a.scrollIntoView({ behavior: "smooth", block: "center" });
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
            ".mk-voz-card.fam{grid-column:1/-1;background:#fffbeb;border-color:#fcd34d}",
            ".mk-voz-card.fam.on{border-color:#f59e0b;background:#fef3c7;box-shadow:0 4px 0 #fcd34d}",
            ".mk-voz-card .fam-info{font-size:13px;color:#92400e;font-weight:700;margin:4px 6px 0}",
            ".mk-voz-rec{margin-top:6px;border:none;border-radius:999px;padding:8px 16px;background:linear-gradient(180deg,#f87171,#dc2626);color:#fff;font-weight:800;font-size:15px;box-shadow:0 4px 0 #991b1b;cursor:pointer}",
            ".mk-rec-bar{margin:6px 0 10px;padding:10px;border:3px dashed #f59e0b;border-radius:16px;background:#fffbeb;text-align:center}",
            ".mk-rec-bar[hidden]{display:none}",
            ".mk-rec-top{font-size:14px;font-weight:800;color:#92400e;margin-bottom:8px;display:flex;justify-content:space-between;gap:6px;flex-wrap:wrap}",
            ".mk-rec-count{color:#16a34a}",
            ".mk-rec-b{margin:3px;border:none;border-radius:999px;padding:9px 14px;font-size:15px;font-weight:800;color:#fff;background:#3b82f6;box-shadow:0 4px 0 #1e40af;cursor:pointer}",
            ".mk-rec-b.go{background:#dc2626;box-shadow:0 4px 0 #991b1b}",
            ".mk-rec-b.stop{background:#0f172a;box-shadow:0 4px 0 #000}",
            ".mk-rec-b.del{background:#94a3b8;box-shadow:0 4px 0 #64748b}",
            ".mk-rec-b.done{background:#16a34a;box-shadow:0 4px 0 #166534}",
            ".mk-rec-dot{display:inline-block;width:12px;height:12px;border-radius:50%;background:#ef4444;margin-left:6px;animation:mkblink 1s infinite}",
            "@keyframes mkblink{50%{opacity:.2}}",
            ".mk-rec-msg{margin:8px 0 0!important;font-size:14px!important;line-height:1.4!important;color:#78350f!important;font-weight:700}",
            ".mk-all-btn{display:inline-flex;align-items:center;gap:6px;min-height:46px;padding:8px 16px;border:3px solid #fff;border-radius:999px;",
            "background:linear-gradient(180deg,#34d399,#059669);color:#fff;font-size:17px;font-weight:800;box-shadow:0 5px 0 #065f46,0 8px 18px rgba(0,0,0,.08);cursor:pointer}",
            ".mk-player{position:fixed;left:50%;bottom:12px;transform:translateX(-50%);z-index:40;width:calc(100% - 24px);max-width:520px;",
            "background:#1e1b4b;color:#fff;border-radius:22px;padding:10px 12px;box-shadow:0 12px 30px rgba(0,0,0,.35);text-align:center}",
            ".mk-player[hidden]{display:none}",
            ".mk-pl-info{font-weight:800;font-size:15px;margin-bottom:8px}",
            ".mk-pl-btns{display:flex;gap:8px;justify-content:center}",
            ".mk-pl-btns button{flex:1;border:none;border-radius:999px;padding:12px 8px;font-size:17px;font-weight:800;color:#1e1b4b;background:#fde047;box-shadow:0 4px 0 #ca8a04;cursor:pointer}",
            ".mk-pl-btns button.go{background:#4ade80;box-shadow:0 4px 0 #15803d}",
            ".mk-pl-btns button.sp{background:#c4b5fd;box-shadow:0 4px 0 #7c3aed}",
            ".mk-pl-btns button.st{flex:.7;background:#fca5a5;box-shadow:0 4px 0 #b91c1c}",
            ".scene-card .mk-now{background:#fef9c3;border-radius:10px;box-shadow:0 0 0 6px #fef9c3;transition:background .2s}",
            "body{padding-bottom:110px!important}",
            ".mk-voz-done{display:block;width:100%;margin-top:14px;border:none;border-radius:999px;padding:14px;font-size:18px;font-weight:800;color:#fff;",
            "background:linear-gradient(180deg,#3b82f6,#1d4ed8);box-shadow:0 5px 0 #1e3a8a;cursor:pointer}"
        ].join("");
        document.head.appendChild(css);
    }

    function label() { var p = preset(); return "🎙️ Voz: " + p.icon; }

    function render() {
        var cur = preset();
        var cards = PRESETS.map(function (p) {
            if (p.family) return '<div class="mk-voz-card fam' + (p.id === cur.id ? " on" : "") + '" data-p="' + p.id + '" role="button" tabindex="0">' +
                '<span class="ok">✅</span><div class="ic">' + p.icon + '</div><b>' + p.name + '</b><small>' + p.desc + '</small>' +
                (canRecord ? '<button type="button" class="mk-voz-rec" data-rec="1">🎙️ Grabar mi voz en este cuento</button>' +
                    '<p class="fam-info">Las grabaciones se guardan solo en este celular. Las páginas sin grabar las lee el Hada.</p>'
                    : '<p class="fam-info">Este navegador no permite grabar. Prueba con Chrome o Safari actualizados.</p>') + '</div>';
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

    function open() { stop(); render(); sheet.hidden = false; }
    function close() { stop(); synth.cancel(); stopAudio(); sheet.hidden = true; btn.textContent = label(); }

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

        buildReadAll();
        buildPlayer();

        sheet = document.createElement("div");
        sheet.className = "mk-voz-back";
        sheet.hidden = true;
        sheet.innerHTML = '<div class="mk-voz-sheet" role="dialog" aria-label="Elegir voz"></div>';
        document.body.appendChild(sheet);

        sheet.addEventListener("click", function (e) {
            if (e.target === sheet) return close();
            var t;
            if (e.target.closest("[data-rec]")) { e.stopPropagation(); close(); startRecordingMode(); return; }
            if ((t = e.target.closest("[data-try]"))) {
                e.stopPropagation();
                var p = preset(t.dataset.try);
                state.preset = p.id; save(); render(); stopAudio();
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

    window.mkVoces = { R: R, presets: PRESETS, state: function () { return state; }, pick: function (id) { return pickVoice(preset(id)); } };

    function start() { if (document.querySelector(".scene-card")) setTimeout(build, 0); }
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
    else start();
})();
