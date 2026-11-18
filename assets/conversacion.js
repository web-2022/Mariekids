/* MVG Learning · Conversación guiada (inglés)
   Página: conversacion.html  ·  Datos: assets/conversacion/<nivel>.js (window.MK_CONV[nivel])
   Voz: MKVoz (assets/voz-peru.js) para hablar; SpeechRecognition para escuchar (si no hay, se escribe).
   Progreso en localStorage "mk_conv_v1": estrellas, días practicados, medallas y banco de errores. */
(function () {
  "use strict";
  var NIVELES = [
    { id: "b0", nombre: "B0", sub: "Saludos y presentaciones", curso: "A0", emoji: "👋" },
    { id: "b1", nombre: "B1", sub: "Situaciones cotidianas", curso: "A1–A2", emoji: "🛒" },
    { id: "b2", nombre: "B2", sub: "Experiencias y opiniones", curso: "B1–B2", emoji: "💬" },
    { id: "b3", nombre: "B3", sub: "Reuniones de trabajo", curso: "C1", emoji: "💼" }
  ];
  var KEY = "mk_conv_v1", INTERVALOS = [0, 1, 3, 7, 14, 30];
  var $app = document.getElementById("conv");   // solo en conversacion.html; en las clases se usa MKConv.abrir
  var SR = window.SpeechRecognition || window.webkitSpeechRecognition;

  /* ---------- estado guardado ---------- */
  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  var S = load(); S.stars = S.stars || {}; S.days = S.days || []; S.errores = S.errores || []; S.medallas = S.medallas || [];
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { } }
  function hoy(off) { var d = new Date(); d.setDate(d.getDate() + (off || 0)); return d.toISOString().slice(0, 10); }
  function marcarDia() { if (S.days.indexOf(hoy()) < 0) { S.days.push(hoy()); save(); } }
  function racha() { var n = 0, k = S.days.indexOf(hoy()) >= 0 ? 0 : -1; while (S.days.indexOf(hoy(k - n)) >= 0) n++; return n; }

  /* ---------- texto ---------- */
  var NUM = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"];
  var CONTR = { "i'm": "i am", "it's": "it is", "don't": "do not", "doesn't": "does not", "didn't": "did not", "can't": "can not", "cannot": "can not", "won't": "will not", "you're": "you are", "we're": "we are", "they're": "they are", "he's": "he is", "she's": "she is", "that's": "that is", "what's": "what is", "i'll": "i will", "we'll": "we will", "i've": "i have", "we've": "we have", "i'd": "i would", "isn't": "is not", "aren't": "are not", "wasn't": "was not", "weren't": "were not", "haven't": "have not", "hasn't": "has not", "shouldn't": "should not", "wouldn't": "would not", "couldn't": "could not", "let's": "let us", "there's": "there is", "dont": "do not", "didnt": "did not", "im": "i am" };
  function tokens(s) {
    return String(s || "").toLowerCase().replace(/[’`]/g, "'").split(/\s+/).map(function (w) {
      w = w.replace(/^[^a-z0-9']+|[^a-z0-9']+$/g, "");
      if (CONTR[w]) return CONTR[w];
      if (/^\d+$/.test(w) && NUM[+w]) return NUM[+w];
      return w.replace(/'/g, "");
    }).join(" ").split(/\s+/).filter(Boolean);
  }
  function lcs(a, b) { var m = [], i, j; for (i = 0; i <= a.length; i++) { m[i] = []; for (j = 0; j <= b.length; j++) m[i][j] = i && j ? (a[i - 1] === b[j - 1] ? m[i - 1][j - 1] + 1 : Math.max(m[i - 1][j], m[i][j - 1])) : 0; } return m[a.length][b.length]; }
  function sim(a, b) { var x = tokens(a), y = tokens(b); return x.length + y.length ? 2 * lcs(x, y) / (x.length + y.length) : 0; }
  function faltan(target, dicho) { var d = tokens(dicho); return tokens(target).filter(function (w) { var i = d.indexOf(w); if (i >= 0) { d.splice(i, 1); return false; } return true; }); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  /* ---------- voz ---------- */
  function decir(t, o) {
    o = o || {};
    if (window.MKVoz) { MKVoz.speak(t, { lang: o.es ? "" : "en", rate: o.rate, onend: o.onend }); return; }
    try { speechSynthesis.cancel(); var u = new SpeechSynthesisUtterance(t); u.lang = o.es ? "es-PE" : "en-US"; u.rate = o.rate || .9; u.onend = o.onend; speechSynthesis.speak(u); } catch (e) { o.onend && o.onend(); }
  }
  function callar() { if (window.MKVoz) MKVoz.stop(); else try { speechSynthesis.cancel(); } catch (e) { } }
  var rec = null;
  function escuchar(btn, cb) {   // cb(alternativas[]) ; [] = no dijo nada ; null = no se pudo usar el micrófono
    if (!SR) { cb(null); return; }
    callar();
    if (rec) { try { rec.abort(); } catch (e) { } }
    rec = new SR(); rec.lang = "en-US"; rec.interimResults = false; rec.maxAlternatives = 4;
    var listo = false, alts = [];
    btn.classList.add("rec"); var txt = btn.innerHTML; btn.innerHTML = "🎙️ Te escucho…";
    var fin = function (r) { if (listo) return; listo = true; btn.classList.remove("rec"); btn.innerHTML = txt; cb(r); };
    rec.onresult = function (e) { var r = e.results[0]; for (var i = 0; i < r.length; i++) alts.push(r[i].transcript); fin(alts); };
    rec.onerror = function (e) { fin(e.error === "not-allowed" || e.error === "service-not-allowed" ? null : []); };
    rec.onend = function () { setTimeout(function () { fin(alts); }, 200); };
    try { rec.start(); } catch (e) { fin(null); }
  }
  function mejorAlt(alts, targets) { var b = alts[0], bs = -1; alts.forEach(function (a) { targets.forEach(function (t) { var s = sim(t, a); if (s > bs) { bs = s; b = a; } }); }); return b; }

  /* ---------- evaluación de una respuesta ---------- */
  function evaluar(turno, dicho) {
    var n = tokens(dicho).join(" ");
    if (!n) return { estado: "vacio" };
    var targets = [{ t: turno.esperado }].concat(turno.variantes || []);
    var best = targets[0], bs = -1;
    targets.forEach(function (x) { var s = sim(x.t, dicho); if (s > bs) { bs = s; best = x; } });
    var errs = (turno.errores || []).filter(function (e) { return new RegExp(e.re).test(n); }).map(function (e) { return { id: e.id, corr: e.corr, exp: e.exp }; });
    if (bs >= .5) {   // errores generales: falta «the» / «a», don't ↔ didn't
      var T = tokens(best.t), D = tokens(dicho);
      T.forEach(function (w, i) {
        if ((w === "the" || w === "a") && T[i + 1] && T[i + 1].length > 2) {
          var j = D.indexOf(T[i + 1]);
          if (j >= 0 && D[j - 1] !== w && D[j - 1] !== "the" && D[j - 1] !== "a" && D[j - 1] !== "an" && !errs.some(function (e) { return e.id === "falta-" + w; }))
            errs.push({ id: "falta-" + w, corr: best.t, exp: "Falta «" + w + "» antes de «" + T[i + 1] + "». " + (w === "the" ? "Usamos «the» cuando hablamos de algo específico que ya conocemos." : "Usamos «a» con un objeto en singular que se puede contar.") });
        }
      });
      if (/\bdo not\b/.test(T.join(" ")) && /\bdid not\b/.test(D.join(" ")) && !errs.some(function (e) { return e.id === "dont-didnt"; }))
        errs.push({ id: "dont-didnt", corr: best.t, exp: "«didn't» es pasado (no lo hice / no sabía). Aquí hablas del presente: «don't»." });
    }
    var porPatron = (turno.acepta || []).some(function (re) { return new RegExp(re).test(n); });
    if (errs.length) return { estado: "error", errs: errs, best: best, s: bs };
    if (bs >= .8 || porPatron) return { estado: "bien", best: best, s: bs, exacto: best === targets[0] && bs >= .95, patron: porPatron && bs < .8 };
    if (bs >= .45) return { estado: "incompleto", best: best, s: bs, faltan: faltan(best.t, dicho) };
    return { estado: "mal", s: bs };
  }
  function pista(turno, nivel) {
    var w = turno.esperado.split(/\s+/);
    if (nivel === 1) return "Empieza así: «<b>" + esc(w.slice(0, 2).join(" ")) + "…</b>»";
    if (nivel === 2) return "Completa: «<b>" + esc(w.map(function (x, i) { return i && x.replace(/[^A-Za-z']/g, "").length > 3 ? "____" + x.replace(/[A-Za-z']/g, "") : x; }).join(" ")) + "</b>»";
    return "Repite la frase completa: «<b>" + esc(turno.esperado) + "</b>»";
  }

  /* ---------- banco de errores (repetición espaciada) ---------- */
  function guardarError(nivel, esc_, turno, dicho, e) {
    var key = esc_.id + "|" + turno.app + "|" + e.id, x = S.errores.filter(function (y) { return y.key === key; })[0];
    if (x) { x.veces++; x.box = 0; x.due = hoy(); x.dicho = dicho; }
    else S.errores.push({ key: key, nivel: nivel, esc: esc_.titulo, app: turno.app, es: turno.es, dicho: dicho, corr: e.corr && e.corr.split(" ").length > 3 ? e.corr : turno.esperado, exp: e.exp, id: e.id, box: 0, due: hoy(), veces: 1 });
    save();
  }
  function pendientes() { return S.errores.filter(function (x) { return x.due <= hoy(); }); }

  /* ---------- datos por nivel ---------- */
  function cargarNivel(id, cb) {
    if (window.MK_CONV && MK_CONV[id]) { cb(MK_CONV[id]); return; }
    var s = document.createElement("script"); s.src = "assets/conversacion/" + id + ".js?v=2";
    s.onload = function () { cb(window.MK_CONV && MK_CONV[id]); }; s.onerror = function () { cb(null); };
    document.head.appendChild(s);
  }
  function estrellas(n) { return "⭐".repeat(n) + "☆".repeat(3 - n); }
  function starsDe(id) { var x = S.stars[id] || {}; return Math.max(x.prac || 0, x.exam || 0); }
  function revisarMedalla(nv, data) {
    var ok = data.escenarios.length && data.escenarios.every(function (e) { return starsDe(e.id) >= 2; });   // medalla: todos los escenarios con 2+ estrellas
    if (ok && S.medallas.indexOf(nv) < 0) { S.medallas.push(nv); save(); return true; }
    return false;
  }

  /* ---------- vistas ---------- */
  function ir(h) { location.hash = h; }
  function render() {
    callar();
    var h = location.hash.replace(/^#/, "").split("/");
    window.scrollTo(0, 0);
    if (h[0] === "nivel" && h[1]) return cargarNivel(h[1], function (d) { d ? vistaNivel(h[1], d) : vistaHome("Este nivel todavía no tiene escenarios."); });
    if (h[0] === "esc" && h[1] && h[2]) return cargarNivel(h[1], function (d) {
      var e = d && d.escenarios.filter(function (x) { return x.id === h[2]; })[0];
      if (!e) return vistaHome();
      vistaEscenario(h[1], d, e, h[3] || "vocab");
    });
    if (h[0] === "errores") return vistaErrores();
    vistaHome();
  }
  if ($app) window.addEventListener("hashchange", render);

  function vistaHome(aviso) {
    var p = pendientes().length;
    $app.innerHTML = (aviso ? '<p class="cv-aviso">' + esc(aviso) + '</p>' : "") +
      '<section class="cv-hero"><h2>🗣️ Conversación guiada</h2><p>Habla en inglés con la app: ella te pregunta, tú respondes con tu voz y te corrige al instante.</p>' +
      '<div class="cv-stats"><span>🔥 Racha: <b>' + racha() + '</b> día' + (racha() === 1 ? "" : "s") + '</span><span>🏅 Medallas: <b>' + S.medallas.length + '</b>/4</span>' +
      (SR ? "" : '<span class="cv-warn">⌨️ Tu navegador no reconoce voz: podrás escribir tus respuestas.</span>') + '</div></section>' +
      '<a class="cv-errbtn" href="#errores">📒 Mis errores' + (p ? ' <b>' + p + ' para repasar hoy</b>' : '') + '</a>' +
      '<div class="cv-grid">' + NIVELES.map(function (n) {
        return '<a class="cv-card" href="#nivel/' + n.id + '"><span class="cv-em">' + n.emoji + '</span><b>' + n.nombre + (S.medallas.indexOf(n.id) >= 0 ? " 🏅" : "") + '</b><span>' + esc(n.sub) + '</span><small>Curso ' + n.curso + '</small></a>';
      }).join("") + '</div>';
  }

  function vistaNivel(nv, d) {
    var info = NIVELES.filter(function (n) { return n.id === nv; })[0];
    $app.innerHTML = '<a class="cv-back" href="#">⬅ Niveles</a><section class="cv-hero"><h2>' + info.emoji + " " + d.nivel + " · " + esc(d.titulo) + (S.medallas.indexOf(nv) >= 0 ? " 🏅" : "") + '</h2><p>Escenarios para practicar (curso ' + esc(d.curso) + ').</p></section>' +
      '<div class="cv-list">' + d.escenarios.map(function (e) {
        var x = S.stars[e.id] || {};
        return '<a class="cv-esc" href="#esc/' + nv + '/' + e.id + '"><span class="cv-em">' + e.emoji + '</span><span><b>' + esc(e.titulo) + '</b><small>' + e.turnos.length + ' preguntas · Práctica ' + estrellas(x.prac || 0) + ' · Examen ' + estrellas(x.exam || 0) + '</small></span><span class="cv-go">▶</span></a>';
      }).join("") + '</div><p class="cv-nota">Pronto: más escenarios en este nivel.</p>';
  }

  var PASOS = [["vocab", "📚 Vocabulario"], ["repite", "🔁 Escucha y repite"], ["pron", "🗣️ Pronunciación"], ["dialogo", "💬 Diálogo"], ["examen", "📝 Examen"]];
  function vistaEscenario(nv, d, e, paso) {
    $app.innerHTML = '<a class="cv-back" href="#nivel/' + nv + '">⬅ ' + d.nivel + ' · ' + esc(d.titulo) + '</a><div id="cvEsc"></div>';
    montar(document.getElementById("cvEsc"), nv, d, e, paso, {});
  }
  // Escenario completo dentro de cualquier contenedor (página propia o panel dentro de una clase).
  // opts.enClase: true cuando se abre desde una clase (enlaces a «Mis errores» van a conversacion.html)
  function montar(root, nv, d, e, paso, opts) {
    callar(); opts = opts || {};
    root.innerHTML = '<section class="cv-hero sm"><h2>' + e.emoji + ' ' + esc(e.titulo) + '</h2><p>' + esc(e.intro) + '</p></section>' +
      '<nav class="cv-tabs">' + PASOS.map(function (p, i) { return '<button type="button" data-paso="' + p[0] + '" class="' + (p[0] === paso ? "on" : "") + '"><i>' + (i + 1) + '</i>' + p[1] + '</button>'; }).join("") + '</nav><div class="cvBody"></div>';
    var body = root.querySelector(".cvBody");
    root.onclick = function (ev) { var b = ev.target.closest("[data-paso]"); if (b) { ev.preventDefault(); montar(root, nv, d, e, b.dataset.paso, opts); (root.closest(".cv-panel") || window).scrollTo(0, 0); root.scrollIntoView({ block: "start" }); } };
    var sig = function (p) { return '<button type="button" class="cv-next" data-paso="' + p + '">Siguiente ➜</button>'; };
    if (paso === "vocab") vocab(body, e, sig("repite"));
    else if (paso === "repite") repite(body, e, sig("pron"));
    else if (paso === "pron") pron(body, e, sig("dialogo"));
    else dialogo(body, nv, d, e, paso === "examen", opts);
  }

  function vocab(body, e, next) {
    body.innerHTML = '<p class="cv-tip">Toca 🔊 para escuchar cada palabra y su ejemplo.</p><div class="cv-vocab">' + e.vocab.map(function (v, i) {
      return '<div class="cv-vc"><div class="cv-vw"><b>' + esc(v.en) + '</b><button class="cv-mini" data-v="' + i + '" data-k="w">🔊</button></div><div class="cv-ves">' + esc(v.es) + '</div><div class="cv-vej"><span>' + esc(v.ej) + '</span><button class="cv-mini" data-v="' + i + '" data-k="e">🔊</button></div></div>';
    }).join("") + '</div>' + next;
    body.onclick = function (ev) { var b = ev.target.closest("[data-v]"); if (!b) return; var v = e.vocab[+b.dataset.v]; decir(b.dataset.k === "w" ? v.en : v.ej, { rate: .85 }); };
  }

  function repite(body, e, next) {
    body.innerHTML = '<p class="cv-tip">Escucha cada frase clave (normal o lenta 🐢) y repítela con tu voz.</p>' + e.clave.map(function (f, i) {
      return '<div class="cv-rep"><div class="cv-rt">' + esc(f) + '</div><div class="cv-rb"><button class="cv-mini" data-i="' + i + '" data-r="n">🔊 Normal</button><button class="cv-mini" data-i="' + i + '" data-r="l">🐢 Lenta</button>' +
        '<button class="cv-mic sm" data-i="' + i + '" data-r="m"' + (SR ? "" : " disabled") + '>🎤 Repetir</button></div><div class="cv-res" id="rr' + i + '"></div></div>';
    }).join("") + next;
    body.onclick = function (ev) {
      var b = ev.target.closest("[data-r]"); if (!b) return; var f = e.clave[+b.dataset.i];
      if (b.dataset.r === "n") decir(f, { rate: .9 }); else if (b.dataset.r === "l") decir(f, { rate: .6 });
      else escuchar(b, function (alts) {
        var out = document.getElementById("rr" + b.dataset.i);
        if (alts === null) { out.innerHTML = "No pude usar el micrófono. Revisa el permiso del navegador."; return; }
        if (!alts.length) { out.innerHTML = "No te escuché. Toca 🎤 y habla cerca del micrófono."; return; }
        var a = mejorAlt(alts, [f]), s = Math.round(sim(f, a) * 100), fl = faltan(f, a);
        out.innerHTML = '<span class="' + (s >= 85 ? "ok" : s >= 60 ? "mid" : "bad") + '">' + (s >= 85 ? "✅ ¡Muy bien!" : s >= 60 ? "🟡 Casi." : "🔁 Otra vez.") + " " + s + "%</span> Entendí: «" + esc(a) + "»" + (fl.length && s < 85 ? "<br>Te faltó: <b>" + esc(fl.join(", ")) + "</b>" : "");
        if (s >= 60) marcarDia();
      });
    };
  }

  function pron(body, e, next) {
    body.innerHTML = '<p class="cv-tip">Estas palabras se confunden. Escúchalas y di la palabra que te pido: te muestro lo que entendió el micrófono.</p>' + (e.pares || []).map(function (p, i) {
      return '<div class="cv-par"><div class="cv-pw">' + p.palabras.map(function (w, j) { return '<button class="cv-chip" data-p="' + i + '" data-j="' + j + '">🔊 <b>' + esc(w) + '</b><small>' + esc((p.es || [])[j] || "") + '</small></button>'; }).join("") + '</div>' +
        '<button class="cv-mic sm" data-p="' + i + '" data-m="1"' + (SR ? "" : " disabled") + '>🎤 Dilo</button><div class="cv-res" id="pp' + i + '"></div></div>';
    }).join("") + next;
    var objetivo = {};
    body.onclick = function (ev) {
      var b = ev.target.closest("[data-p]"); if (!b) return; var p = e.pares[+b.dataset.p], out = document.getElementById("pp" + b.dataset.p);
      if (!b.dataset.m) { decir(p.palabras[+b.dataset.j], { rate: .7 }); return; }
      var t = objetivo[b.dataset.p] = p.palabras[Math.floor(Math.random() * p.palabras.length)];
      out.innerHTML = 'Di: <b>«' + esc(t) + '»</b>';
      decir("Say: " + t, { rate: .8, onend: function () {
        escuchar(b, function (alts) {
          if (alts === null) { out.innerHTML = "No pude usar el micrófono."; return; }
          if (!alts.length) { out.innerHTML = "No te escuché. Inténtalo otra vez."; return; }
          var tn = tokens(t).join(" "), oyo = alts.map(function (a) { return tokens(a).join(" "); });
          var otras = p.palabras.filter(function (w) { return w !== t; });
          var ok = oyo.some(function (a) { return (" " + a + " ").indexOf(" " + tn + " ") >= 0; });
          var conf = !ok && otras.filter(function (w) { var wn = tokens(w).join(" "); return (" " + oyo[0] + " ").indexOf(" " + wn + " ") >= 0; })[0];
          out.innerHTML = 'Entendí: «<b>' + esc(alts[0]) + '</b>» · ' + (ok ? '<span class="ok">✅ ¡Bien dicho!</span>' : conf ? '<span class="bad">⚠️ Sonó como «' + esc(conf) + '». Escucha la diferencia y repite «' + esc(t) + '».</span>' : '<span class="mid">🔁 No sonó como «' + esc(t) + '». Escúchala y prueba otra vez.</span>');
          if (ok) marcarDia();
        });
      } });
    };
  }

  /* ---------- diálogo (práctica y examen) ---------- */
  function dialogo(body, nv, d, e, examen, opts) {
    opts = opts || {};
    var i = 0, nivelPista = 0, primera = true, puntos = 0, errSes = [], dichoBien = [], intentos = 0;
    body.innerHTML = '<p class="cv-tip">' + (examen ? "📝 <b>Modo examen:</b> sin pistas, una sola respuesta por pregunta." : "💬 La app te pregunta y lee en voz alta. Responde con 🎤 o escribe. Si te trabas, pide una pista.") + '</p>' +
      '<div class="cv-chat" id="chat"></div><div class="cv-input" id="inp"></div>';
    var chat = document.getElementById("chat"), inp = document.getElementById("inp");
    function burbuja(html, cls) { var b = document.createElement("div"); b.className = "cv-b " + cls; b.innerHTML = html; chat.appendChild(b); setTimeout(function () { b.scrollIntoView({ behavior: "smooth", block: "center" }); }, 30); return b; }
    function preguntar() {
      var t = e.turnos[i]; nivelPista = 0; primera = true; intentos = 0;
      var b = burbuja('<div class="cv-who">🤖 App · ' + (i + 1) + '/' + e.turnos.length + '</div><div class="cv-q">' + esc(t.app) + '</div><div class="cv-tr" hidden>🇪🇸 ' + esc(t.es) + '</div>' +
        '<div class="cv-row"><button class="cv-mini" data-a="oir">🔊 Escuchar</button><button class="cv-mini" data-a="lento">🐢 Lento</button><button class="cv-mini" data-a="tr">🇪🇸 Ver en español</button></div>', "app");
      b.onclick = function (ev) { var a = ev.target.closest("[data-a]"); if (!a) return; if (a.dataset.a === "oir") decir(t.app, { rate: .9 }); else if (a.dataset.a === "lento") decir(t.app, { rate: .65 }); else { var tr = b.querySelector(".cv-tr"); tr.hidden = !tr.hidden; } };
      decir(t.app, { rate: .9 });
      controles();
    }
    function controles() {
      inp.innerHTML = (SR ? '<button class="cv-mic" id="mic">🎤 Responder hablando</button>' : "") +
        '<div class="cv-type"><input id="txt" type="text" autocomplete="off" autocapitalize="sentences" placeholder="' + (SR ? "…o escribe tu respuesta" : "Escribe tu respuesta en inglés") + '"><button id="env">Enviar</button></div>' +
        (examen ? "" : '<div class="cv-row"><button class="cv-mini" id="pst">💡 Pista</button><button class="cv-mini" id="nose">🤷 No sé</button></div>');
      var m = document.getElementById("mic");
      if (m) m.onclick = function () { escuchar(m, function (alts) {
        if (alts === null) { burbuja("No pude usar el micrófono. Puedes escribir tu respuesta.", "sys"); return; }
        if (!alts.length) { if (examen) burbuja("No te escuché. Toca 🎤 otra vez.", "sys"); else darPista("Te quedaste callado. Te ayudo:"); return; }
        var t = e.turnos[i]; responder(mejorAlt(alts, [t.esperado].concat((t.variantes || []).map(function (v) { return v.t; }))));
      }); };
      var tx = document.getElementById("txt");
      document.getElementById("env").onclick = function () { if (tx.value.trim()) responder(tx.value.trim()); };
      tx.onkeydown = function (ev) { if (ev.key === "Enter" && tx.value.trim()) responder(tx.value.trim()); };
      if (!examen) { document.getElementById("pst").onclick = function () { darPista(""); }; document.getElementById("nose").onclick = function () { darPista("Tranquilo, te ayudo:"); }; }
    }
    function darPista(pre) {
      var t = e.turnos[i]; nivelPista = Math.min(3, nivelPista + 1); primera = false;
      var b = burbuja('<div class="cv-who">👩‍🏫 Profe</div>' + (pre ? esc(pre) + " " : "") + pista(t, nivelPista) + (nivelPista === 3 ? '<div class="cv-row"><button class="cv-mini" data-a="oir">🔊 Escuchar</button><button class="cv-mini" data-a="lento">🐢 Lento</button></div>' : ""), "hint");
      b.onclick = function (ev) { var a = ev.target.closest("[data-a]"); if (a) decir(t.esperado, { rate: a.dataset.a === "lento" ? .6 : .9 }); };
      if (nivelPista === 3) decir(t.esperado, { rate: .8 });
    }
    function correccion(t, r) {
      var c = r.errs[0];
      return '<div class="cv-who">👩‍🏫 Corrección</div>' + r.errs.map(function (x) { return '⚠️ ' + esc(x.exp); }).join("<br>") +
        '<div class="cv-ok">✅ ' + esc(c.corr.split(" ").length > 3 ? c.corr : t.esperado) + '</div><div class="cv-row"><button class="cv-mini" data-a="oir">🔊 Escuchar</button><button class="cv-mini" data-a="lento">🐢 Lento</button></div>' + (examen ? "" : '<small>Repítela para seguir 🎤</small>');
    }
    function responder(dicho) {
      var t = e.turnos[i]; intentos++;
      var tx0 = document.getElementById("txt"); if (tx0) tx0.value = "";
      burbuja('<div class="cv-who">🧑 Tú</div>' + esc(dicho), "yo");
      var r = evaluar(t, dicho), b;
      var oir = function (el, frase) { el.onclick = function (ev) { var a = ev.target.closest("[data-a]"); if (a) decir(frase, { rate: a.dataset.a === "lento" ? .6 : .9 }); }; };
      if (r.estado === "bien") {
        if (primera) puntos++; dichoBien.push(t.esperado);
        var msg = r.exacto ? "¡Excelente! 🎉" : "¡Muy bien! 👍";
        var nota = r.best.nota ? '<div class="cv-nat">💡 ' + esc(r.best.nota) + "</div>" : "";
        var modelo = !r.exacto ? '<div class="cv-ok">Modelo: ' + esc(t.esperado) + "</div>" : "";
        b = burbuja('<div class="cv-who">👩‍🏫 Profe</div>' + msg + nota + modelo, "good"); oir(b, t.esperado);
        marcarDia(); setTimeout(siguiente, 1400);
        return;
      }
      if (r.estado === "error") {
        r.errs.forEach(function (x) { guardarError(nv, e, t, dicho, x); errSes.push({ app: t.app, corr: x.corr.split(" ").length > 3 ? x.corr : t.esperado, exp: x.exp, id: x.id }); });
        primera = false;
        b = burbuja(correccion(t, r), "err"); oir(b, r.errs[0].corr.split(" ").length > 3 ? r.errs[0].corr : t.esperado);
        decir(r.errs[0].corr.split(" ").length > 3 ? r.errs[0].corr : t.esperado, { rate: .8 });
        if (examen) setTimeout(siguiente, 2200);
        return;
      }
      if (examen) {
        errSes.push({ app: t.app, corr: t.esperado, exp: "Respuesta esperada para esta pregunta.", id: "examen" });
        b = burbuja('<div class="cv-who">👩‍🏫 Corrección</div>Respuesta esperada:<div class="cv-ok">' + esc(t.esperado) + "</div>", "err"); oir(b, t.esperado);
        setTimeout(siguiente, 2200); return;
      }
      primera = false;
      if (r.estado === "incompleto") burbuja('<div class="cv-who">👩‍🏫 Profe</div>¡Vas bien! Completa la frase. Te falta: <b>' + esc(r.faltan.slice(0, 3).join(" … ")) + "</b>", "hint");
      else if (r.estado === "vacio") darPista("No te escuché bien.");
      else darPista(intentos > 1 ? "Mmm, no es eso. Otra pista:" : "Casi. Te doy una pista:");
      if (intentos >= 4 && r.estado !== "vacio") { burbuja("Sigamos con la siguiente. ¡Esta la repasaremos en «Mis errores»!", "sys"); guardarError(nv, e, t, dicho, { id: "sin-resolver", corr: t.esperado, exp: "Practica esta respuesta completa." }); errSes.push({ app: t.app, corr: t.esperado, exp: "Practica esta respuesta completa.", id: "sin-resolver" }); setTimeout(siguiente, 1800); }
    }
    function siguiente() { i++; if (i < e.turnos.length) preguntar(); else resumen(); }
    function resumen() {
      var tot = e.turnos.length, pct = puntos / tot, st = pct >= .9 ? 3 : pct >= .7 ? 2 : pct >= .4 ? 1 : 0;
      var x = S.stars[e.id] = S.stars[e.id] || {}, k = examen ? "exam" : "prac"; if (st > (x[k] || 0)) x[k] = st; save();
      var medalla = revisarMedalla(nv, d);
      var cuenta = {}; errSes.forEach(function (z) { var c = cuenta[z.id] = cuenta[z.id] || { n: 0, z: z }; c.n++; });
      var top = Object.keys(cuenta).map(function (k2) { return cuenta[k2]; }).sort(function (a, b) { return b.n - a.n; }).slice(0, 3);
      var otros = d.escenarios.filter(function (z) { return starsDe(z.id) < 2 && z.id !== e.id; });
      var rec_ = st < 2 ? { txt: "Repite este escenario en modo práctica.", paso: "dialogo" }
        : !examen ? { txt: "¡Ahora pruébate en el modo examen!", paso: "examen" }
        : opts.enClase ? { txt: "¡Dominas esta conversación! Sigue con la siguiente clase.", paso: "" }
        : otros[0] ? { txt: "Sigue con «" + otros[0].titulo + "».", href: "#esc/" + nv + "/" + otros[0].id }
        : { txt: "¡Pasa al siguiente nivel!", href: "#" };
      inp.innerHTML = "";
      burbuja('<div class="cv-sum"><h3>' + (examen ? "📝 Resultado del examen" : "🏁 Resumen de la sesión") + '</h3><div class="cv-stars">' + estrellas(st) + '</div>' +
        '<p>✅ Aciertos a la primera: <b>' + puntos + ' de ' + tot + '</b> · 🔥 Racha: <b>' + racha() + '</b> día(s)' + (medalla ? '<br>🏅 <b>¡Ganaste la medalla del nivel ' + d.nivel + '!</b>' : "") + '</p>' +
        (top.length ? '<h4>Errores principales para practicar</h4><ol>' + top.map(function (c) { return '<li>' + esc(c.z.exp) + '<div class="cv-ok">' + esc(c.z.corr) + '</div></li>'; }).join("") + '</ol>' : '<p>🎉 ¡Sin errores importantes!</p>') +
        (dichoBien.length ? '<h4>Frases que ya dominas</h4><ul>' + dichoBien.slice(0, 4).map(function (f) { return "<li>" + esc(f) + "</li>"; }).join("") + "</ul>" : "") +
        '<p class="cv-recom">👉 <b>Recomendación:</b> ' + esc(rec_.txt) + '</p><div class="cv-row">' + (rec_.paso ? '<button type="button" class="cv-next" data-paso="' + rec_.paso + '">Continuar ➜</button>' : rec_.href ? '<a class="cv-next" href="' + rec_.href + '">Continuar ➜</a>' : "") + (S.errores.length ? '<a class="cv-next alt" href="' + (opts.enClase ? "conversacion.html" : "") + '#errores">📒 Mis errores</a>' : "") + '</div></div>', "sum");
    }
    preguntar();
  }

  /* ---------- Mis errores ---------- */
  function vistaErrores() {
    var lista = pendientes(), todos = S.errores.length;
    $app.innerHTML = '<a class="cv-back" href="#">⬅ Niveles</a><section class="cv-hero sm"><h2>📒 Mis errores</h2><p>Repasa tus errores. Cuando aciertas, vuelven en 1, 3, 7, 14 y 30 días (repetición espaciada).</p></section>' +
      (!todos ? '<p class="cv-tip">Todavía no tienes errores guardados. ¡Practica un diálogo!</p>' :
        !lista.length ? '<p class="cv-tip">🎉 No tienes repasos pendientes hoy. Vuelve mañana.</p>' :
          '<p class="cv-tip">Para repasar hoy: <b>' + lista.length + '</b>. Responde como en el diálogo.</p><div id="rv"></div>') +
      (todos ? '<h3 class="cv-h">Todos mis errores (' + todos + ')</h3><div class="cv-list">' + S.errores.map(function (x) {
        return '<div class="cv-errit"><small>' + esc(x.nivel.toUpperCase() + " · " + x.esc) + ' · ' + x.veces + '× · caja ' + x.box + '/5</small><div>❌ ' + esc(x.dicho) + '</div><div class="cv-ok">✅ ' + esc(x.corr) + '</div><small>' + esc(x.exp) + '</small></div>';
      }).join("") + '</div>' : "");
    if (!lista.length) return;
    var rv = document.getElementById("rv"), k = 0;
    function uno() {
      if (k >= lista.length) { rv.innerHTML = '<p class="cv-tip">✅ ¡Repaso terminado por hoy!</p>'; return; }
      var x = lista[k];
      rv.innerHTML = '<div class="cv-b app"><div class="cv-who">🤖 ' + (k + 1) + '/' + lista.length + '</div><div class="cv-q">' + esc(x.app) + '</div><div class="cv-tr" hidden>🇪🇸 ' + esc(x.es || "") + '</div><div class="cv-row"><button class="cv-mini" id="ro">🔊</button><button class="cv-mini" id="rt">🇪🇸</button><button class="cv-mini" id="rp">💡 Ver respuesta</button></div></div>' +
        '<div class="cv-input">' + (SR ? '<button class="cv-mic" id="rm">🎤 Responder</button>' : "") + '<div class="cv-type"><input id="rx" placeholder="Escribe tu respuesta"><button id="re">Enviar</button></div></div><div id="rres"></div>';
      decir(x.app, { rate: .9 });
      document.getElementById("ro").onclick = function () { decir(x.app, { rate: .9 }); };
      document.getElementById("rt").onclick = function () { var t = rv.querySelector(".cv-tr"); t.hidden = !t.hidden; };
      document.getElementById("rp").onclick = function () { document.getElementById("rres").innerHTML = '<div class="cv-b hint">' + esc(x.corr) + '</div>'; decir(x.corr, { rate: .8 }); };
      var fin = function (dicho) {
        var ok = sim(x.corr, dicho) >= .8 && !(x.id === "dont-didnt" && /did not/.test(tokens(dicho).join(" ")));
        if (ok) { x.box = Math.min(5, x.box + 1); x.due = hoy(INTERVALOS[x.box]); marcarDia(); } else { x.box = 0; x.due = hoy(); }
        save();
        document.getElementById("rres").innerHTML = '<div class="cv-b ' + (ok ? "good" : "err") + '">' + (ok ? "✅ ¡Correcto! Vuelve en " + INTERVALOS[x.box] + " día(s)." : "🔁 Aún no. Correcto:") + '<div class="cv-ok">' + esc(x.corr) + '</div><small>' + esc(x.exp) + '</small><div class="cv-row"><button class="cv-mini" id="rn">Siguiente ➜</button></div></div>';
        if (!ok) decir(x.corr, { rate: .8 });
        document.getElementById("rn").onclick = function () { k++; uno(); };
      };
      var m = document.getElementById("rm"); if (m) m.onclick = function () { escuchar(m, function (alts) { if (alts && alts.length) fin(mejorAlt(alts, [x.corr])); }); };
      var rx = document.getElementById("rx");
      document.getElementById("re").onclick = function () { if (rx.value.trim()) fin(rx.value.trim()); };
      rx.onkeydown = function (ev) { if (ev.key === "Enter" && rx.value.trim()) fin(rx.value.trim()); };
    }
    uno();
  }

  // Abrir la conversación de una clase en un panel: MKConv.abrir("a0", "eng-a0-w1")
  function abrir(nv, id, cb) {
    cargarNivel(nv, function (d) {
      var e = d && d.escenarios.filter(function (x) { return x.id === id; })[0];
      if (!e) { cb && cb(false); return; }
      var ov = document.createElement("div"); ov.className = "cv-panel"; ov.setAttribute("role", "dialog");
      ov.innerHTML = '<div class="cv-pbar"><b>🗣️ Conversación guiada</b><button type="button" class="cv-close">✖ Volver a la clase</button></div><div class="cv-pin"></div>';
      document.body.appendChild(ov); document.body.classList.add("cv-lock");
      var cerrar = function () { callar(); if (rec) try { rec.abort(); } catch (x) { } ov.remove(); document.body.classList.remove("cv-lock"); document.removeEventListener("keydown", esc_); };
      var esc_ = function (ev) { if (ev.key === "Escape") cerrar(); };
      ov.querySelector(".cv-close").onclick = cerrar; document.addEventListener("keydown", esc_);
      montar(ov.querySelector(".cv-pin"), nv, d, e, "vocab", { enClase: true });
      cb && cb(true);
    });
  }
  function tiene(nv, id, cb) { cargarNivel(nv, function (d) { cb(!!(d && d.escenarios.some(function (x) { return x.id === id; }))); }); }
  window.MKConv = { evaluar: evaluar, tokens: tokens, sim: sim, pista: pista, abrir: abrir, tiene: tiene, estado: function () { return S; } };
  if ($app) render();
})();
