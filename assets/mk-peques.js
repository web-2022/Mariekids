/* =========================================================
   MK PEQUES — base de los juegos de 3 años (sobre mk-juegos.js)
   MKP.juego({ clave, niveles:[{n,name,desc,cls}], rondas, ronda(nivel, i, listo) })
     → arma menú de niveles, HUD, pantalla final y estrellas.
     listo(acierto1raVez) avanza a la siguiente ronda.
   MKP.arrastrar(el, {alSoltar(destino, x, y) → true si se queda, alTocar()})
     → arrastrar con el dedo o el mouse; destinos = elementos con [data-drop]
   MKP.contar(n) → dice «uno», «dos»… en voz alta
========================================================= */
(function () {
    "use strict";
    var $ = function (id) { return document.getElementById(id); };
    var NUM = ["cero", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez", "once", "doce"];

    function decir(t) { MKJ.say(t); }
    function contar(n) { decir(NUM[n] || String(n)); }

    /* ---------- Arrastrar (pointer events: dedo, lápiz y mouse) ---------- */
    function arrastrar(el, o) {
        el.style.touchAction = "none";
        el.addEventListener("pointerdown", function (ev) {
            if (el.dataset.bloqueado) return;
            ev.preventDefault();
            var r = el.getBoundingClientRect(), dx = ev.clientX - r.left, dy = ev.clientY - r.top;
            var x0 = ev.clientX, y0 = ev.clientY, movio = false;
            var fant = el.cloneNode(true);
            fant.classList.add("mkp-fantasma");
            fant.style.cssText += ";position:fixed;z-index:9999;pointer-events:none;margin:0;left:" + r.left + "px;top:" + r.top + "px;width:" + r.width + "px;height:" + r.height + "px;transform:scale(1.15);";
            var sobre = null;
            function mover(e) {
                if (!movio && Math.abs(e.clientX - x0) + Math.abs(e.clientY - y0) < 8) return;
                if (!movio) { movio = true; document.body.appendChild(fant); el.style.opacity = ".3"; MKJ.sound("salto"); }
                fant.style.left = (e.clientX - dx) + "px"; fant.style.top = (e.clientY - dy) + "px";
                var d = destino(e.clientX, e.clientY);
                if (d !== sobre) { if (sobre) sobre.classList.remove("mkp-sobre"); sobre = d; if (d) d.classList.add("mkp-sobre"); }
            }
            function fin(e) {
                window.removeEventListener("pointermove", mover); window.removeEventListener("pointerup", fin); window.removeEventListener("pointercancel", fin);
                if (sobre) sobre.classList.remove("mkp-sobre");
                if (!movio) { if (o.alTocar) o.alTocar(); return; }
                var d = destino(e.clientX, e.clientY), queda = d && o.alSoltar ? o.alSoltar(d, e.clientX, e.clientY) : false;
                if (queda) { fant.remove(); el.style.opacity = ""; return; }
                // vuelve a su lugar
                fant.style.transition = "left .25s, top .25s, transform .25s"; fant.style.left = r.left + "px"; fant.style.top = r.top + "px"; fant.style.transform = "scale(1)";
                setTimeout(function () { fant.remove(); el.style.opacity = ""; }, 260);
            }
            window.addEventListener("pointermove", mover); window.addEventListener("pointerup", fin); window.addEventListener("pointercancel", fin);
        });
    }
    function destino(x, y) {
        var e = document.elementFromPoint(x, y);
        return e ? e.closest("[data-drop]") : null;
    }

    /* ---------- Marco del juego ---------- */
    function juego(cfg) {
        var nivel = cfg.niveles[0], i = 0, ok = 0, fallos = 0, enCurso = false;
        function hud() {
            $("hudLevel").textContent = nivel.name;
            $("hudQ").textContent = (cfg.icono || "⭐") + " " + Math.min(i + 1, cfg.rondas) + "/" + cfg.rondas;
            $("hudOk").textContent = "⭐ " + ok;
        }
        function ronda() { hud(); cfg.ronda(nivel, i, listo); }
        function listo(primera) {
            if (!enCurso) return;
            if (primera) ok++; else fallos++;
            hud(); i++;
            setTimeout(function () { if (!enCurso) return; if (i >= cfg.rondas) fin(); else ronda(); }, cfg.pausa || 1600);
        }
        function empezar(lv) { nivel = lv; i = 0; ok = 0; fallos = 0; enCurso = true; ocultar("startScreen"); ocultar("endScreen"); ronda(); }
        function fin() {
            enCurso = false;
            var st = fallos <= 1 ? 3 : fallos <= 3 ? 2 : 1;
            MKJ.stars(cfg.clave + "-" + nivel.n, st);
            $("endStars").textContent = "⭐".repeat(st) + "☆".repeat(3 - st);
            $("endText").textContent = "¡Lo hiciste muy bien! " + ok + " de " + cfg.rondas + " a la primera.";
            $("nextBtn").textContent = cfg.niveles[nivel.n] ? "▶ Siguiente nivel" : "🔁 Jugar otra vez";
            mostrar("endScreen"); MKJ.sound("gana"); MKJ.confetti(); decir("¡Muy bien! ¡Lo lograste!");
        }
        function menu() {
            enCurso = false;
            var box = $("levels"); box.innerHTML = "";
            cfg.niveles.forEach(function (lv) {
                var st = MKJ.stars(cfg.clave + "-" + lv.n), b = document.createElement("button");
                b.type = "button"; b.className = "level-btn " + lv.cls;
                b.innerHTML = '<span class="num">' + lv.n + '</span><span><b>' + lv.name + '</b><small>' + lv.desc + '</small></span><span class="st">' + "⭐".repeat(st) + "☆".repeat(3 - st) + "</span>";
                b.onclick = function () { MKJ.sound("ok"); empezar(lv); };
                box.appendChild(b);
            });
            mostrar("startScreen");
        }
        function mostrar(id) { $(id).classList.add("show"); }
        function ocultar(id) { $(id).classList.remove("show"); }
        $("nextBtn").onclick = function () { empezar(cfg.niveles[nivel.n] || cfg.niveles[0]); };
        $("menuBtn").onclick = function () { ocultar("endScreen"); menu(); };
        var sb = $("soundBtn"), pinta = function () { sb.textContent = MKJ.soundOn ? "🔊" : "🔇"; };
        sb.onclick = function () { MKJ.setSound(!MKJ.soundOn); pinta(); }; pinta();
        menu();
        return { get nivel() { return nivel; }, get i() { return i; }, empezar: empezar };
    }

    // efecto «¡bien!» o «intenta otra vez» sobre la tarjeta
    function aviso(texto, bien) {
        var a = document.createElement("div");
        a.className = "mkp-aviso " + (bien ? "ok" : "bad"); a.textContent = texto;
        document.body.appendChild(a);
        setTimeout(function () { a.remove(); }, 1300);
    }

    window.MKP = { juego: juego, arrastrar: arrastrar, contar: contar, decir: decir, aviso: aviso, NUM: NUM };
})();
