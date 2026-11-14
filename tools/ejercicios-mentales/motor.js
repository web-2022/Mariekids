/* =========================================================
   MOTOR DE EJERCICIOS MENTALES — Mariekids
   Cada juego llama a MKGame({...}) con su mecánica.
   El motor pone: barra superior, personaje con globo, niveles con
   candado y estrellas, progreso, voz, música, pistas, explicación,
   resultado y la marca ✅ Hecho de la ruta.
========================================================= */
(function () {
  "use strict";
  const $ = id => document.getElementById(id);
  const rnd = n => Math.floor(Math.random() * n);
  const pick = a => a[rnd(a.length)];
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function sample(a, n) { return shuffle(a).slice(0, n); }
  const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
  window.MKU = { rnd, pick, shuffle, sample, range };

  // La voz no lee emojis ni flechas
  const speakable = t => String(t || "").replace(/<[^>]+>/g, " ")
    .replace(/[\p{Extended_Pictographic}⬅-⬇➡←-↙️‍❓·→←↑↓]/gu, " ").replace(/\s+([.,!?])/g, "$1").replace(/\s+/g, " ").trim();

  window.MKGame = function (cfg) {
    const R = cfg.rounds || 10;
    const PASS = Math.ceil(R * 0.7);
    const STORE = "mk_em_" + cfg.slug;
    const T = Object.assign({ bg: "linear-gradient(180deg,#f9c5ff,#b9e6ff)", a1: "#ec4899", a2: "#8b5cf6", ink: "#4c1d95", title: "#db2777", soft: "#f3e8ff", tile: "#f5f3ff" }, cfg.theme || {});
    const root = document.documentElement.style;
    Object.entries(T).forEach(([k, v]) => root.setProperty("--" + k, v));

    /* ---------- pantalla base ---------- */
    document.body.innerHTML = `
      ${(cfg.deco || ["✦", "✦", "✦", "✦"]).map((d, i) => `<div class="deco" style="${["left:6%;top:24%", "right:8%;top:40%", "left:14%;bottom:14%", "right:18%;bottom:26%"][i % 4]};animation-delay:${i * .7}s">${d}</div>`).join("")}
      <div id="app">
        <div id="hud">
          <button class="panel panel-btn" id="homeBtn" type="button" aria-label="Volver a la ruta">🏠</button>
          <div class="panel" id="levelBox">${cfg.short || cfg.title}</div>
          <div class="panel hide-xs" id="scoreBox">⭐ 0</div>
          <button class="panel panel-btn music" id="musicBtn" type="button" aria-label="Activar o desactivar música">🎵</button>
          <button class="panel panel-btn sound" id="soundBtn" type="button" aria-label="Activar o desactivar voz">🔊</button>
        </div>
        <section class="card" id="startScreen">
          <div class="hero big"><div class="who" id="startWho"></div><div class="bubble" id="startBubble"></div></div>
          <h1 style="margin-top:10px">${cfg.title}</h1>
          ${(cfg.intro || []).map(p => `<p>${p}</p>`).join("")}
          <div class="levels" id="levels"></div>
          <p style="color:var(--a2);font-size:14px;margin-top:12px">Gana ⭐⭐ o más (${PASS} aciertos de ${R}) para abrir el siguiente nivel.</p>
        </section>
        <section class="card hidden" id="gameScreen">
          <div id="dots"></div>
          <div class="hero"><div class="who" id="gameWho"></div><div class="bubble"><span id="promptText"></span><button type="button" class="say" id="sayBtn" aria-label="Escuchar">🔊</button></div></div>
          <div id="area"></div>
          <div id="feedback"></div>
          <div id="explain"><div class="why" id="whyText"></div><button class="btn alt" id="nextBtn" type="button">Siguiente ➜</button></div>
        </section>
        <section class="card hidden" id="endScreen">
          <div class="hero big" style="justify-content:center"><div class="who" id="endWho"></div></div>
          <h2 id="endTitle"></h2>
          <div class="big-stars" id="endStars"></div>
          <p id="endScore"></p><p id="endNote"></p>
          <div id="endExtra"></div>
          <div class="actions">
            <button class="btn" id="againBtn" type="button">🔁 Jugar otra vez</button>
            <button class="btn alt" id="nextLevelBtn" type="button">Siguiente nivel ➜</button>
            <button class="btn soft" id="menuBtn" type="button">Elegir nivel</button>
          </div>
        </section>
        <audio id="sndOk" src="correct.mp3" preload="auto"></audio>
        <audio id="sndBad" src="wrong.mp3" preload="auto"></audio>
        <audio id="sndWin" src="levelup.mp3" preload="auto"></audio>
        ${cfg.music ? `<audio id="bgMusic" src="${cfg.music}" loop preload="none"></audio>` : ""}
      </div>`;

    /* ---------- estado guardado ---------- */
    let progress = { unlocked: 1, best: cfg.levels.map(() => 0) };
    try { Object.assign(progress, JSON.parse(localStorage.getItem(STORE) || "{}")); } catch (e) { }
    const save = () => { try { localStorage.setItem(STORE, JSON.stringify(progress)); } catch (e) { } };
    let voiceOn = true, musicOn = true;
    try { voiceOn = localStorage.getItem("mk_em_voice") !== "0"; musicOn = localStorage.getItem("mk_em_music") !== "0"; } catch (e) { }

    const play = id => { const a = $(id); if (a) { a.currentTime = 0; a.play().catch(() => { }); } };
    const starsFor = n => n >= Math.ceil(R * 0.9) ? 3 : n >= PASS ? 2 : n >= Math.ceil(R * 0.4) ? 1 : 0;
    const starText = n => "⭐".repeat(n) + "☆".repeat(3 - n);

    /* ---------- música ---------- */
    const music = $("bgMusic");
    const VOL = cfg.musicVolume || 0.2, DUCK = 0.06;
    let fadeTimer = null, hold = false;
    function fadeTo(v) {
      if (!music) return;
      clearInterval(fadeTimer);
      fadeTimer = setInterval(() => {
        const d = v - music.volume;
        if (Math.abs(d) < 0.02) { music.volume = v; clearInterval(fadeTimer); return; }
        music.volume = Math.max(0, Math.min(1, music.volume + Math.sign(d) * 0.02));
      }, 30);
    }
    const duck = on => { if (music && musicOn && !hold) fadeTo(on ? DUCK : VOL); };
    function startMusic() { if (music && musicOn && !document.hidden && music.paused && !hold) { music.volume = VOL; music.play().catch(() => { }); } }
    function musicHold(on) {             // silencio total (para juegos que usan sonidos)
      hold = on;
      if (!music) return;
      if (on) fadeTo(0); else { if (musicOn) { if (music.paused) startMusic(); fadeTo(VOL); } }
    }
    function updateMusicBtn() { const b = $("musicBtn"); if (!music) { b.classList.add("hidden"); return; } b.classList.toggle("off", !musicOn); b.setAttribute("aria-pressed", String(musicOn)); }
    document.addEventListener("pointerdown", startMusic, { passive: true });
    document.addEventListener("visibilitychange", () => { if (!music) return; if (document.hidden) music.pause(); else startMusic(); });

    /* ---------- voz ---------- */
    let voices = [];
    const loadVoices = () => { voices = "speechSynthesis" in window ? speechSynthesis.getVoices() : []; };
    loadVoices(); if ("speechSynthesis" in window) speechSynthesis.onvoiceschanged = loadVoices;
    function say(text, force) {
      if ((!voiceOn && !force) || !("speechSynthesis" in window)) return;
      const t = speakable(text); if (!t) return;
      const u = new SpeechSynthesisUtterance(t);
      u.voice = voices.find(x => x.lang === "es-PE") || voices.find(x => x.lang === "es-419") || voices.find(x => x.lang && x.lang.startsWith("es")) || null;
      u.lang = "es-PE"; u.rate = .92; u.pitch = 1.08;
      u.onstart = () => duck(true); u.onend = u.onerror = () => duck(false);
      speechSynthesis.cancel(); speechSynthesis.speak(u);
    }

    /* ---------- personaje ---------- */
    let curWho = cfg.char;
    function setChar(where, mood, anim, who) {
      const el = $(where); if (!el) return;
      el.innerHTML = MKChar(where === "gameWho" ? (who || curWho) : cfg.char, mood);
      if (anim) { el.classList.remove("jump", "wobble"); void el.offsetWidth; el.classList.add(anim); }
    }

    /* ---------- partida ---------- */
    let level = 0, index = 0, first = 0, results = [], tries = 0, done = false, timers = [], currentPrompt = "", currentSay = "";
    const ui = {};
    function clearTimers() { timers.forEach(t => { clearTimeout(t); clearInterval(t); }); timers = []; }
    ui.later = (fn, ms) => { const t = setTimeout(fn, ms); timers.push(t); return t; };
    ui.every = (fn, ms) => { const t = setInterval(fn, ms); timers.push(t); return t; };
    ui.say = say;
    ui.musicHold = musicHold;
    ui.prompt = (text, sayText) => { currentPrompt = text; currentSay = sayText || text; $("promptText").innerHTML = text; if (sayText !== false) say(currentSay); };
    ui.char = (mood, anim, who) => { if (who) curWho = who; setChar("gameWho", mood, anim); };
    ui.feedback = (text, cls) => { $("feedback").textContent = text || ""; $("feedback").className = cls || ""; };
    ui.helped = () => { if (tries === 0) tries = 1; };
    ui.setSolve = fn => { ui._solve = fn; };
    ui.setMiss = fn => { ui._miss = fn; };
    Object.defineProperty(ui, "tries", { get: () => tries });
    Object.defineProperty(ui, "done", { get: () => done });

    ui.win = (why, sayWhy) => {
      if (done) return; done = true; clearTimers();
      if (tries === 0) first++;
      results[index] = tries === 0 ? "ok" : "help";
      $("scoreBox").textContent = "⭐ " + first;
      play("sndOk"); setChar("gameWho", "feliz", "jump"); burst();
      ui.feedback(tries === 0 ? "✅ ¡A la primera!" : "✅ ¡Lo lograste!");
      showExplain(why, false);
      say("¡Muy bien! " + (sayWhy || why || ""));
      drawDots();
    };
    ui.miss = (hint, sayHint) => {
      if (done) return;
      tries++;
      play("sndBad"); setChar("gameWho", "piensa", "wobble");
      if (tries === 1 && hint) { ui.feedback("💡 Pista: " + hint, "hint"); say("Todavía no. Pista: " + (sayHint || hint)); }
      else { ui.feedback(pick(["❌ Esa no es. ¡Intenta otra vez!", "❌ Casi… ¡vuelve a intentarlo!", "❌ Sigue pensando, ¡tú puedes!"]), "bad"); say("Intenta otra vez."); }
    };
    ui.lose = (why, sayWhy) => {   // se acabó el tiempo o se mostró la respuesta
      if (done) return; done = true; clearTimers();
      if (tries === 0) tries = 1;
      results[index] = "help"; setChar("gameWho", "anima", "wobble");
      ui.feedback("⏰ ¡Casi! Mira la respuesta:", "hint");
      showExplain(why, true);
      say(sayWhy || why);
      drawDots();
    };
    // botones de opciones (lo más común)
    ui.choices = (items, o) => {
      o = o || {};
      const box = document.createElement("div");
      box.className = "choices"; box.style.setProperty("--cols", o.cols || Math.min(items.length, 3));
      const btns = items.map((it, i) => {
        const b = document.createElement("button");
        b.type = "button"; b.className = "choice " + (o.cls || "");
        b.innerHTML = o.render ? o.render(it, i) : String(it);
        if (o.label) b.setAttribute("aria-label", o.label(it));
        b.onclick = () => {
          if (done || b.disabled) return;
          if (o.onTap) o.onTap(it);
          if (o.correct(it, i)) {
            b.classList.add("ok"); btns.forEach(x => { if (x !== b) x.classList.add("dim"); x.disabled = true; });
            ui.win(typeof o.why === "function" ? o.why(it) : o.why, o.sayWhy);
          } else {
            b.classList.add("wrong"); b.disabled = true;
            ui.miss(o.hint, o.sayHint);
          }
        };
        box.appendChild(b); return b;
      });
      (o.parent || ui.area).appendChild(box);
      ui.setSolve(() => { const i = items.findIndex((it, k) => o.correct(it, k)); btns[i].click(); });
      ui.setMiss(() => { const i = items.findIndex((it, k) => !o.correct(it, k)); if (i >= 0) btns[i].click(); });
      return btns;
    };
    // ordenar: items ya en el orden correcto; el niño toca cuál va primero, luego el segundo…
    ui.order = (items, o) => {
      o = o || {};
      const n = items.length; let next = 0;
      const slots = document.createElement("div"); slots.className = "ord-slots"; slots.style.setProperty("--n", n);
      const slotEls = items.map((_, i) => { const s = document.createElement("div"); s.className = "ord-slot"; s.innerHTML = `<b>${i + 1}</b>`; slots.appendChild(s); return s; });
      const deck = document.createElement("div"); deck.className = "choices"; deck.style.setProperty("--cols", Math.min(n, o.cols || 3));
      const order = shuffle(items.map((_, i) => i));
      if (order.every((v, i) => v === i) && n > 1) [order[0], order[1]] = [order[1], order[0]];
      const btns = {};
      order.forEach(i => {
        const b = document.createElement("button"); b.type = "button"; b.className = "choice ord-card";
        b.innerHTML = o.render ? o.render(items[i]) : String(items[i]);
        b.onclick = () => {
          if (done || b.disabled) return;
          if (i === next) {
            b.disabled = true; b.classList.add("ok", "placed");
            slotEls[next].innerHTML = `<b>${next + 1}</b>` + (o.render ? o.render(items[i]) : String(items[i]));
            slotEls[next].classList.add("filled");
            if (o.onPlace) o.onPlace(items[i], next);
            next++;
            if (next === n) { ui.win(o.why, o.sayWhy); deck.remove(); }
          } else {
            b.classList.add("wrong"); setTimeout(() => b.classList.remove("wrong"), 450);
            ui.miss(typeof o.hint === "function" ? o.hint(next) : o.hint, o.sayHint);
          }
        };
        btns[i] = b; deck.appendChild(b);
      });
      ui.area.appendChild(slots); ui.area.appendChild(deck);
      ui.setSolve(() => { for (let k = next; k < n; k++) btns[k].click(); });
      ui.setMiss(() => { const k = order.find(i => i !== next && !btns[i].disabled); if (k !== undefined) btns[k].click(); });
    };
    ui.timer = (seconds, onEnd) => {
      const bar = document.createElement("div"); bar.className = "timer"; bar.innerHTML = "<i></i>";
      ui.area.prepend(bar);
      const i = bar.firstChild, t0 = performance.now();
      const tick = ui.every(() => {
        const f = 1 - (performance.now() - t0) / (seconds * 1000);
        i.style.transform = `scaleX(${Math.max(0, f)})`;
        if (f <= 0) { clearInterval(tick); if (!done) onEnd(); }
      }, 50);
      return bar;
    };

    function showExplain(why, lost) {
      $("whyText").innerHTML = "🧠 " + (why || "");
      $("explain").classList.toggle("lost", !!lost);
      $("explain").classList.add("show");
      $("nextBtn").textContent = index + 1 >= R ? "Ver resultado 🏁" : "Siguiente ➜";
      ui.later(() => $("explain").scrollIntoView({ behavior: "smooth", block: "nearest" }), 150);
    }
    function burst() {
      const r = $("gameWho").getBoundingClientRect();
      ["✨", "🌟", "💖", "🎉"].forEach((e, i) => {
        const s = document.createElement("div"); s.className = "sparkle"; s.textContent = e;
        s.style.left = r.left + r.width / 2 + "px"; s.style.top = r.top + r.height / 3 + "px";
        s.style.setProperty("--dx", (i - 1.5) * 40 + "px");
        document.body.appendChild(s); setTimeout(() => s.remove(), 900);
      });
    }
    function drawDots() {
      const d = $("dots"); d.innerHTML = "";
      for (let i = 0; i < R; i++) { const s = document.createElement("span"); s.className = "dot" + (i === index && !done ? " now" : "") + (results[i] ? " " + results[i] : ""); d.appendChild(s); }
    }
    function show(id) { ["startScreen", "gameScreen", "endScreen"].forEach(s => $(s).classList.toggle("hidden", s !== id)); window.scrollTo({ top: 0 }); }

    function renderLevels() {
      const box = $("levels"); box.innerHTML = "";
      cfg.levels.forEach((L, i) => {
        const open = cfg.openLevels || i < progress.unlocked;   // openLevels: todos los niveles libres
        const b = document.createElement("button"); b.type = "button";
        b.className = "level-btn" + (open ? "" : " locked");
        b.innerHTML = `<span class="ico">${open ? L.icon : "🔒"}</span><span><b>Nivel ${i + 1}: ${L.title}</b><small>${L.desc}</small></span><span class="stars">${starText(starsFor(progress.best[i] || 0))}</span>`;
        b.onclick = () => { if (!open) { say("Primero gana dos estrellas en el nivel " + i, true); return; } startLevel(i); };
        box.appendChild(b);
      });
      $("levelBox").textContent = cfg.short || cfg.title;
      $("scoreBox").textContent = "⭐ " + progress.best.reduce((a, b) => a + starsFor(b), 0) + "/" + cfg.levels.length * 3;
      setChar("startWho", "anima");
      $("startBubble").innerHTML = cfg.hello;
    }

    function startLevel(i) {
      level = i; index = 0; first = 0; results = [];
      $("levelBox").textContent = "Nivel " + (i + 1);
      if (cfg.onLevel) cfg.onLevel(i);
      show("gameScreen"); nextRound();
    }
    function nextRound() {
      clearTimers();
      if (index >= R) return endLevel();
      tries = 0; done = false; ui._solve = null; ui._miss = null;
      ui.level = level; ui.index = index;
      ui.area = $("area"); ui.area.innerHTML = "";
      ui.feedback("");
      $("explain").classList.remove("show", "lost");
      $("scoreBox").textContent = "⭐ " + first;
      curWho = cfg.char;
      setChar("gameWho", "anima");
      drawDots();
      cfg.round(level, index, ui);
    }
    function endLevel() {
      clearTimers();
      const st = starsFor(first);
      if (first > (progress.best[level] || 0)) progress.best[level] = first;
      const passed = first >= PASS;
      if (passed && progress.unlocked < level + 2) progress.unlocked = Math.min(cfg.levels.length, level + 2);
      if (passed) { try { localStorage.setItem("mk_topic_" + cfg.slug + "_complete", "true"); } catch (e) { } }
      save();
      const hasNext = level + 1 < cfg.levels.length;
      setChar("endWho", passed ? "feliz" : "anima", "jump");
      $("endTitle").textContent = st === 3 ? (cfg.champion || "¡Eres un campeón! 🏆") : passed ? "¡Muy bien! 🎉" : "¡Buen intento! 💪";
      $("endStars").textContent = starText(st);
      $("endScore").innerHTML = `Lo hiciste <b>${first} de ${R}</b> veces a la primera.`;
      $("endNote").textContent = passed ? (hasNext ? `¡Abriste el Nivel ${level + 2}!` : "¡Completaste todos los niveles!") : `Necesitas ${PASS} a la primera para abrir el siguiente nivel. ¡Tú puedes!`;
      $("nextLevelBtn").classList.toggle("hidden", !(passed && hasNext));
      $("endExtra").innerHTML = "";
      if (cfg.onEnd) cfg.onEnd(level, passed, st, $("endExtra"));
      show("endScreen");
      play(passed ? "sndWin" : "sndBad");
      say($("endTitle").textContent + ". " + $("endScore").textContent + " " + $("endNote").textContent);
    }

    /* ---------- botones ---------- */
    $("homeBtn").onclick = () => { location.href = cfg.home || "ruta-EjerciosMentales.html"; };
    $("soundBtn").onclick = () => { voiceOn = !voiceOn; $("soundBtn").textContent = voiceOn ? "🔊" : "🔇"; try { localStorage.setItem("mk_em_voice", voiceOn ? "1" : "0"); } catch (e) { } if (!voiceOn && "speechSynthesis" in window) speechSynthesis.cancel(); };
    $("musicBtn").onclick = () => { musicOn = !musicOn; updateMusicBtn(); try { localStorage.setItem("mk_em_music", musicOn ? "1" : "0"); } catch (e) { } if (musicOn) startMusic(); else if (music) music.pause(); };
    $("sayBtn").onclick = () => say((currentSay || currentPrompt) + (tries && cfg.repeatHint ? "" : ""), true);
    $("nextBtn").onclick = () => { index++; nextRound(); };
    $("againBtn").onclick = () => startLevel(level);
    $("nextLevelBtn").onclick = () => startLevel(level + 1);
    $("menuBtn").onclick = () => { renderLevels(); show("startScreen"); };
    $("soundBtn").textContent = voiceOn ? "🔊" : "🔇";
    updateMusicBtn();
    renderLevels();

    // Ganchos para las pruebas automáticas
    window.MK = { cfg, ui, startLevel, get index() { return index; }, get level() { return level; }, get done() { return done; },
      solve: () => ui._solve && ui._solve(), miss: () => ui._miss && ui._miss(), next: () => $("nextBtn").click(), progress: () => progress, first: () => first };
  };
})();
