/* MK • Motor de lecciones de Inglés
   - Varios tipos de ejercicio: elegir, escuchar, completar, ordenar, traducir, hablar
   - El español y el ejemplo se ocultan hasta responder
   - Cada lección muestra todas sus frases; se aprueba con 80 % a la primera
   - Toda palabra en inglés se puede tocar para escuchar su pronunciación
   Datos: window.MK_LESSON = { items: [...], total: n, pass: 0.8 }               */
(function () {
  "use strict";
  var L = window.MK_LESSON || { items: [] };
  var PASS = L.pass || 0.8;
  var SLUG = (location.pathname.split("/").pop() || "").replace(/\.html$/i, "");
  var card = document.getElementById("lessonCard");
  var $ = function (id) { return document.getElementById(id); };

  /* ---------- voz ---------- */
  var voice = null, slow = false;
  try { slow = localStorage.getItem("mk_eng_slow") === "1"; } catch (e) { }
  function pickVoice() {
    if (!("speechSynthesis" in window)) return;
    var vs = speechSynthesis.getVoices().filter(function (v) { return /^en[-_]/i.test(v.lang); });
    var prefs = [/google us english/i, /samantha/i, /natural/i, /en[-_]us/i, /en[-_]gb/i];
    for (var i = 0; i < prefs.length && !voice; i++) {
      for (var j = 0; j < vs.length; j++) {
        if (prefs[i].test(vs[j].name) || prefs[i].test(vs[j].lang)) { voice = vs[j]; break; }
      }
    }
    if (!voice && vs.length) voice = vs[0];
  }
  if ("speechSynthesis" in window) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
  function say(text, rate) {
    if (!("speechSynthesis" in window) || !text) return;
    var u = new SpeechSynthesisUtterance(String(text).replace(/_+/g, " "));
    u.lang = "en-US"; if (voice) u.voice = voice;
    u.rate = slow ? 0.6 : (rate || 0.9);
    speechSynthesis.cancel(); speechSynthesis.speak(u);
  }
  window.mkSay = say;

  /* ---------- utilidades ---------- */
  function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function clean(w) { return w.replace(/^[^A-Za-z0-9']+|[^A-Za-z0-9']+$/g, ""); }
  function sound(id) { var a = $(id); if (a) { a.currentTime = 0; a.play().catch(function () { }); } }

  /* Texto en inglés con palabras tocables + botón 🔊 para la frase completa */
  function enLine(text, cls, opts) {
    opts = opts || {};
    var box = el("div", "en-line " + (cls || ""));
    var words = el("span", "en-words");
    String(text).split(/(\s+)/).forEach(function (tok) {
      if (/^\s+$/.test(tok) || tok === "") { words.appendChild(document.createTextNode(tok)); return; }
      if (/^_+$/.test(tok)) { words.appendChild(el("span", "en-gap", "_____")); return; }
      var w = el("span", "en-w", esc(tok));
      var c = clean(tok);
      if (c) {
        w.setAttribute("role", "button"); w.title = "Toca para escuchar";
        w.onclick = function (ev) { ev.stopPropagation(); say(c, 0.8); w.classList.add("on"); setTimeout(function () { w.classList.remove("on"); }, 600); };
      }
      words.appendChild(w);
    });
    box.appendChild(words);
    if (!opts.noSpeaker) {
      var b = el("button", "en-say", "🔊"); b.type = "button"; b.setAttribute("aria-label", "Escuchar la frase");
      b.onclick = function (ev) { ev.stopPropagation(); say(opts.sayText || text); };
      box.appendChild(b);
    }
    return box;
  }

  /* ---------- reconocimiento de voz ---------- */
  var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  var NUM = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"];
  var CONTR = { "i'm": "i am", "it's": "it is", "don't": "do not", "doesn't": "does not", "didn't": "did not", "can't": "can not", "cannot": "can not", "won't": "will not", "you're": "you are", "we're": "we are", "they're": "they are", "he's": "he is", "she's": "she is", "that's": "that is", "what's": "what is", "i'll": "i will", "you'll": "you will", "i've": "i have", "i'd": "i would", "isn't": "is not", "aren't": "are not", "wasn't": "was not", "weren't": "were not", "haven't": "have not", "hasn't": "has not", "shouldn't": "should not", "wouldn't": "would not", "couldn't": "could not", "let's": "let us", "mustn't": "must not", "here's": "here is", "there's": "there is" };
  function norm(s) {
    return String(s).toLowerCase().replace(/[’`]/g, "'").split(/\s+/).map(function (w) {
      w = w.replace(/^[^a-z0-9']+|[^a-z0-9']+$/g, "");
      if (CONTR[w]) return CONTR[w];
      if (/^\d+$/.test(w) && NUM[+w]) return NUM[+w];
      return w.replace(/'/g, "");
    }).join(" ").split(/\s+/).filter(Boolean);
  }
  function similarity(target, heard) {
    var t = norm(target), h = norm(heard), pool = h.slice(), hit = 0;
    t.forEach(function (w) { var i = pool.indexOf(w); if (i >= 0) { hit++; pool.splice(i, 1); } });
    return t.length ? hit / t.length : 0;
  }

  /* ---------- plan de la lección ---------- */
  var ITEMS = L.items;
  var TOTAL = Math.min(L.total || ITEMS.length, ITEMS.length);
  var queue, done, firstOk, scored, wrongN, okN, missed, cur, triedWrong, busy;

  function exampleWith(item) {           // ejemplo que contiene la frase completa
    var low = item.en.toLowerCase();
    var idx = [];
    item.examplesEn.forEach(function (ex, i) { if (ex.toLowerCase().indexOf(low) >= 0 && ex.length > item.en.length + 2) idx.push(i); });
    return idx.length ? pick(idx) : -1;
  }
  function exampleToOrder(item) {
    var idx = [];
    item.examplesEn.forEach(function (ex, i) { var n = ex.split(/\s+/).length; if (n >= 3 && n <= 9) idx.push(i); });
    return idx.length ? pick(idx) : -1;
  }
  function typesFor(item) {
    var t = ["choose", "listen", "translate"];
    if (exampleWith(item) >= 0) t.push("gap");
    if (exampleToOrder(item) >= 0) t.push("order");
    if (SR && item.en.split(/\s+/).length <= 9) t.push("speak");
    return t;
  }
  function buildPlan() {
    var chosen = shuffle(ITEMS.slice()).slice(0, TOTAL);
    var cycle = shuffle(["choose", "listen", "gap", "order", "translate", "choose", "listen", "gap", "order", "speak"]);
    var speakCount = 0, k = 0;
    return chosen.map(function (item) {
      var avail = typesFor(item), type = null;
      for (var tries = 0; tries < cycle.length && !type; tries++) {
        var c = cycle[k++ % cycle.length];
        if (avail.indexOf(c) >= 0 && !(c === "speak" && speakCount >= 2)) type = c;
      }
      if (!type) type = pick(["choose", "translate"]);
      if (type === "speak") speakCount++;
      return { item: item, type: type, practice: false };
    });
  }

  /* ---------- pantalla ---------- */
  var TYPE_LABEL = {
    choose: "🤔 Elige qué se dice",
    listen: "🎧 Escucha y elige",
    gap: "✏️ Completa la oración",
    order: "🧩 Ordena las palabras",
    translate: "🇪🇸 ➜ 🇬🇧 Traduce",
    speak: "🎤 Dilo en voz alta"
  };

  function header(step) {
    var h = el("div", "ex-head");
    var badge = el("span", "ex-badge", TYPE_LABEL[step.type] + (step.practice ? " · repaso" : ""));
    var turtle = el("button", "ex-slow" + (slow ? " on" : ""), "🐢");
    turtle.type = "button"; turtle.title = "Audio lento";
    turtle.onclick = function () { slow = !slow; turtle.classList.toggle("on", slow); try { localStorage.setItem("mk_eng_slow", slow ? "1" : "0"); } catch (e) { } say(step.item.en); };
    h.appendChild(badge); h.appendChild(turtle);
    return h;
  }
  function feedback(msg, cls) { var f = $("mkFeedback"); if (f) { f.textContent = msg; f.className = "feedback " + (cls || ""); } }

  function updateBars() {
    $("xpValue").textContent = okN; $("heartsValue").textContent = wrongN;
    $("progressText").textContent = done + "/" + TOTAL;
    $("progressBar").style.width = (done / TOTAL * 100) + "%";
  }

  function options(step, correctText) {
    var others = shuffle(ITEMS.filter(function (i) { return i.en !== step.item.en; })).slice(0, 2).map(function (i) { return i.en; });
    var opts = shuffle([correctText].concat(others));
    var box = el("div", "options");
    opts.forEach(function (o) {
      var b = el("button", "option-btn", esc(o)); b.type = "button";
      b.onclick = function () {
        if (busy) return;
        say(o);
        if (o === correctText) { b.classList.add("ok"); success(); }
        else { b.disabled = true; b.classList.add("bad"); fail(); }
      };
      box.appendChild(b);
    });
    return box;
  }

  function render() {
    if (!queue.length) return summary();
    cur = queue[0]; triedWrong = false; busy = false;
    var it = cur.item, s = cur;
    card.innerHTML = ""; card.className = "card ex-card";
    card.appendChild(header(s));

    if (s.type === "choose") {
      card.appendChild(el("div", "emoji", it.emoji));
      card.appendChild(el("p", "question", esc(it.questions[0])));
      card.appendChild(options(s, it.en));
    } else if (s.type === "listen") {
      var big = el("button", "listen-big", "🔊"); big.type = "button";
      big.onclick = function () { say(it.en); };
      card.appendChild(big);
      card.appendChild(el("p", "question", "Escucha la frase y elige cuál es. Puedes escucharla las veces que quieras."));
      card.appendChild(options(s, it.en));
      setTimeout(function () { say(it.en); }, 350);
    } else if (s.type === "translate") {
      card.appendChild(el("div", "emoji", it.emoji));
      card.appendChild(el("p", "question", "¿Cómo se dice en inglés?"));
      card.appendChild(el("div", "es-big", esc(it.es)));
      card.appendChild(options(s, it.en));
    } else if (s.type === "gap") {
      var gi = s.gi != null ? s.gi : (s.gi = exampleWith(it));
      var ex = it.examplesEn[gi];
      var at = ex.toLowerCase().indexOf(it.en.toLowerCase());
      var gapped = ex.slice(0, at) + " ___ " + ex.slice(at + it.en.length);
      card.appendChild(el("div", "emoji", it.emoji));
      card.appendChild(el("p", "question", "Elige lo que falta en la oración:"));
      card.appendChild(enLine(gapped.replace(/\s+/g, " ").trim(), "gap-line", { noSpeaker: true }));
      card.appendChild(el("p", "hint-es", "💡 " + esc(it.examplesEs[gi])));
      card.appendChild(options(s, ex.slice(at, at + it.en.length)));
    } else if (s.type === "order") {
      var oi = s.oi != null ? s.oi : (s.oi = exampleToOrder(it));
      orderExercise(it, oi);
    } else if (s.type === "speak") {
      speakExercise(it);
    }
    card.appendChild(el("div", "feedback", "")).id = "mkFeedback";
    updateBars();
  }

  function orderExercise(it, oi) {
    var sentence = it.examplesEn[oi], target = sentence.split(/\s+/);
    card.appendChild(el("p", "question", "Escucha 🔊 la oración y ármala tocando las palabras en orden:"));
    card.appendChild(el("div", "es-big small", esc(it.examplesEs[oi])));
    var tools = el("div", "order-tools");
    var bListen = el("button", "tool-btn listen", "🔊 Escuchar oración"); bListen.type = "button";
    var bHint = el("button", "tool-btn hint", "💡 Pista"); bHint.type = "button";
    var bShow = el("button", "tool-btn show", "👀 Ver respuesta"); bShow.type = "button"; bShow.style.display = "none";
    tools.appendChild(bListen); tools.appendChild(bHint); tools.appendChild(bShow);
    card.appendChild(tools);
    var ans = el("div", "order-answer"), bank = el("div", "order-bank");
    var help = el("p", "order-help", "Tip: la primera palabra empieza con mayúscula y la última lleva el punto o signo final.");
    card.appendChild(ans); card.appendChild(bank); card.appendChild(help);
    var tiles = target.map(function (w, i) { return { w: w, i: i }; });
    do { shuffle(tiles); } while (tiles.length > 1 && tiles.every(function (t, i) { return t.w === target[i]; }));
    var placed = [], locked = 0, fails = 0;

    function helped() { if (!triedWrong) { triedWrong = true; if (!cur.practice) missed.push(it); } }
    function goodPrefix() { var k = 0; while (k < placed.length && placed[k].w === target[k]) k++; return k; }
    function nextTile(k) { return tiles.filter(function (t) { return placed.indexOf(t) < 0 && t.w === target[k]; })[0]; }

    bListen.onclick = function () { say(sentence, 0.8); };
    bHint.onclick = function () {
      if (busy) return;
      var k = goodPrefix(); placed = placed.slice(0, k);
      var t = nextTile(k); if (!t) return;
      placed.push(t); locked = k + 1; helped();
      feedback(""); card.classList.remove("wrong");
      say(clean(t.w) || t.w, 0.8);
      help.textContent = "💡 La palabra " + (k + 1) + " es «" + t.w + "». Las verdes ya están bien.";
      draw(); if (placed.length === target.length) check();
    };
    bShow.onclick = function () {
      if (busy) return;
      helped();
      placed = target.map(function (w, i) { return tiles.filter(function (t) { return t.w === w && placed.indexOf(t) < 0; })[0] || tiles[i]; });
      locked = target.length; draw();
      help.textContent = "👀 Así se ordena. Escúchala y repítela en voz alta.";
      say(sentence, 0.8); success(true, true);
    };

    function draw() {
      ans.innerHTML = ""; bank.innerHTML = "";
      if (!placed.length) ans.appendChild(el("span", "order-ph", "Toca las palabras 👇"));
      placed.forEach(function (t, pi) {
        var fixed = pi < locked;
        var b = el("button", "tile in" + (fixed ? " good" : ""), esc(t.w)); b.type = "button";
        b.onclick = function () { if (busy) return; if (fixed) { say(clean(t.w) || t.w, 0.8); return; } placed.splice(pi, 1); draw(); };
        ans.appendChild(b);
      });
      tiles.forEach(function (t) {
        var used = placed.indexOf(t) >= 0;
        var b = el("button", "tile" + (used ? " used" : ""), esc(t.w)); b.type = "button"; b.disabled = used;
        b.onclick = function () {
          if (busy) return; say(clean(t.w) || t.w, 0.8); placed.push(t); draw();
          if (placed.length === target.length) check();
        };
        bank.appendChild(b);
      });
    }
    function check() {
      var ok = placed.every(function (t, i) { return t.w === target[i]; });
      if (ok) { ans.classList.add("ok"); success(); return; }
      fails++; ans.classList.add("bad"); fail();
      var k = goodPrefix();
      setTimeout(function () {
        ans.classList.remove("bad"); placed = placed.slice(0, k); locked = k; draw();
        help.textContent = k ? "✅ Las palabras en verde están bien. Escucha 🔊 y sigue desde ahí." : "Escucha la oración 🔊 y empieza por la palabra con mayúscula.";
        if (fails >= 2) bShow.style.display = "";
        say(sentence, 0.75);
      }, 900);
    }
    draw();
  }

  function speakExercise(it) {
    card.appendChild(el("div", "emoji", it.emoji));
    card.appendChild(el("p", "question", "Escucha 🔊 y repite la frase en voz alta:"));
    card.appendChild(enLine(it.en, "word"));
    card.appendChild(el("div", "translation", esc(it.es)));
    var row = el("div", "speak-row");
    var mic = el("button", "mic-btn", "🎤 Hablar"); mic.type = "button";
    var skip = el("button", "skip-btn", "Omitir ⏭"); skip.type = "button";
    var heardBox = el("p", "heard", "");
    row.appendChild(mic); row.appendChild(skip);
    card.appendChild(row); card.appendChild(heardBox);
    var tries = 0;
    skip.onclick = function () { if (busy) return; cur.skipped = true; success(true); };
    mic.onclick = function () {
      if (busy) return;
      var rec; try { rec = new SR(); } catch (e) { feedback("Tu navegador no permite el micrófono. Puedes omitir este ejercicio.", "bad"); return; }
      rec.lang = "en-US"; rec.maxAlternatives = 3; rec.interimResults = false;
      mic.classList.add("rec"); mic.textContent = "🎙️ Escuchando…";
      if ("speechSynthesis" in window) speechSynthesis.cancel();
      rec.onresult = function (e) {
        var best = 0, txt = "";
        for (var i = 0; i < e.results[0].length; i++) {
          var t = e.results[0][i].transcript, sc = similarity(it.en, t);
          if (sc > best || !txt) { best = Math.max(best, sc); txt = t; }
        }
        heardBox.textContent = "Escuché: «" + txt + "»";
        if (best >= 0.7) success();
        else { tries++; feedback(tries >= 2 ? "Casi 💪 Escucha otra vez 🔊 o toca Omitir." : "Casi 💪 Inténtalo de nuevo, más despacio.", "bad"); }
      };
      rec.onerror = function (e) {
        feedback(e.error === "not-allowed" || e.error === "service-not-allowed" ? "Permite el micrófono para practicar, o toca Omitir." : "No te escuché bien. Toca 🎤 otra vez.", "bad");
      };
      rec.onend = function () { mic.classList.remove("rec"); mic.textContent = "🎤 Hablar"; };
      try { rec.start(); } catch (e) { }
    };
  }

  function fail() {
    wrongN++;
    if (!triedWrong) { triedWrong = true; if (!cur.practice && cur.type !== "speak") missed.push(cur.item); }
    feedback(pick(["❌ Todavía no. ¡Inténtalo otra vez!", "❌ Casi… vuelve a intentar.", "❌ Esa no es. ¡Tú puedes!"]), "bad");
    card.classList.remove("wrong"); void card.offsetWidth; card.classList.add("wrong");
    sound("sound-wrong");
    $("heartsValue").textContent = wrongN;
  }

  function success(skipped, shown) {
    busy = true; feedback("");
    if (!skipped) { okN++; sound("sound-correct"); }
    if (!cur.practice) {
      done++;
      if (cur.type !== "speak" || !skipped) {
        if (cur.type !== "speak") { scored++; if (!triedWrong) firstOk++; }
      }
    }
    // la frase fallada vuelve al final como repaso (una sola vez)
    if (triedWrong && !cur.practice) {
      var alt = cur.type === "order" ? "order" : shuffle(["choose", "translate", "listen"].filter(function (t) { return t !== cur.type; }))[0];
      queue.push({ item: cur.item, type: alt, practice: true });
    }
    queue.shift();
    updateBars();
    reveal(skipped && !shown, shown);
  }

  function reveal(skipped, shown) {
    var it = cur.item;
    card.classList.remove("wrong"); card.classList.add("correct");
    var panel = el("div", "reveal");
    panel.appendChild(el("div", "reveal-title", shown ? "👀 Esta era la respuesta. ¡La próxima te sale!" : skipped ? "⏭ Omitido — escucha la frase:" : pick(["✅ ¡Muy bien!", "✅ ¡Excelente!", "✅ ¡Correcto!", "✅ ¡Genial!"])));
    var top = el("div", "reveal-top");
    top.appendChild(el("div", "emoji small", it.emoji));
    var txt = el("div", "reveal-txt");
    txt.appendChild(enLine(it.en, "word"));
    txt.appendChild(el("div", "translation", esc(it.es)));
    top.appendChild(txt); panel.appendChild(top);
    var exi = cur.gi != null ? cur.gi : (cur.oi != null ? cur.oi : Math.floor(Math.random() * it.examplesEn.length));
    var exBox = el("div", "reveal-ex");
    exBox.appendChild(el("span", "label", "Ejemplo:"));
    exBox.appendChild(enLine(it.examplesEn[exi], "ex-en"));
    exBox.appendChild(el("div", "ex-es", esc(it.examplesEs[exi])));
    panel.appendChild(exBox);
    panel.appendChild(el("p", "tap-tip", "👆 Toca cualquier palabra en inglés para escuchar cómo se pronuncia."));
    var next = el("button", "main-btn next-btn", queue.length ? "Siguiente ➜" : "Ver resultado 🏁"); next.type = "button";
    next.onclick = render;
    panel.appendChild(next);
    var opts = card.querySelector(".options"); if (opts) opts.querySelectorAll("button").forEach(function (b) { b.disabled = true; });
    card.appendChild(panel);
    setTimeout(function () { say(it.en); }, skipped ? 100 : 450);
    panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function summary() {
    var pct = scored ? firstOk / scored : 1;
    var passed = pct >= PASS;
    card.innerHTML = ""; card.className = "card ex-card summary";
    card.appendChild(el("div", "emoji", passed ? "🏆" : "💪"));
    card.appendChild(el("h2", "sum-title", passed ? "¡Tema aprobado!" : "¡Buen intento!"));
    card.appendChild(el("p", "sum-score", "Acertaste <b>" + firstOk + " de " + scored + "</b> a la primera (" + Math.round(pct * 100) + " %)."));
    card.appendChild(el("p", "sum-note", passed ? "Este tema ya quedó marcado como hecho en tu ruta. ⭐" : "Necesitas " + Math.round(PASS * 100) + " % para aprobar. ¡Repite la lección y lo logras!"));
    if (missed.length) {
      var rv = el("div", "sum-review");
      rv.appendChild(el("p", "label", "Repasa estas frases (toca para escuchar):"));
      missed.forEach(function (it) {
        var r = el("div", "sum-row");
        r.appendChild(el("span", "emoji tiny", it.emoji));
        var t = el("div", ""); t.appendChild(enLine(it.en, "")); t.appendChild(el("div", "ex-es", esc(it.es)));
        r.appendChild(t); rv.appendChild(r);
      });
      card.appendChild(rv);
    }
    var row = el("div", "sum-btns");
    var again = el("button", "main-btn", "🔁 Repetir"); again.onclick = start;
    var back = el("button", "main-btn alt", "⬅ Volver a la ruta"); back.onclick = function () { location.href = "ruta-ingles.html"; };
    row.appendChild(again); row.appendChild(back); card.appendChild(row);
    if (passed) {
      try { localStorage.setItem("mk_topic_" + SLUG + "_complete", "true"); } catch (e) { }
      sound("sound-levelup");
    }
    $("progressText").textContent = TOTAL + "/" + TOTAL; $("progressBar").style.width = "100%";
  }

  function start() {
    queue = buildPlan(); done = 0; firstOk = 0; scored = 0; wrongN = 0; okN = 0; missed = [];
    render();
  }

  // pequeña API para pruebas
  window.MKIngles = {
    current: function () { return cur && { en: cur.item.en, type: cur.type, gi: cur.gi, oi: cur.oi, item: cur.item }; },
    restart: start
  };
  start();
})();
