/* =========================================================
   PRÓXIMAMENTE — MVG Learning
   Revisa los enlaces de la página. Si una lección o grado
   todavía no existe, la tarjeta se marca como "Próximamente"
   y, al tocarla, aparece un aviso en lugar de una página de error.

   Uso: agrega al final del <body>
   <script src="assets/proximamente.js" defer></script>
   (con "../" delante si la página está dentro de una carpeta)

   No hay que tocar nada más: cuando subas la página que falta,
   el enlace vuelve a funcionar solo.
========================================================= */
(function () {
    "use strict";

    // En archivos abiertos sin servidor (file://) no se puede comprobar.
    if (location.protocol === "file:") return;

    var CACHE_KEY = "mvg-enlaces-revisados-v2";   // v2: solo se recuerdan las páginas que existen
    var CACHE_MINUTES = 30;
    var CARD_SELECTOR = "article, li, .tile, .card, .topic, .topic-card, .lesson, .lesson-card, .course-card, .item";

    var cache = {};
    try {
        var saved = JSON.parse(sessionStorage.getItem(CACHE_KEY) || "{}");
        if (saved.t && Date.now() - saved.t < CACHE_MINUTES * 60000) cache = saved.data || {};
    } catch (e) { /* sin almacenamiento */ }

    var pending = {};

    function saveCache() {
        try { sessionStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), data: cache })); } catch (e) { }
    }

    // Solo enlaces a páginas .html del mismo sitio
    function targetOf(a) {
        var raw = a.getAttribute("href");
        if (!raw || raw.charAt(0) === "#" || /^(mailto:|tel:|javascript:)/i.test(raw)) return null;
        var url;
        try { url = new URL(raw, location.href); } catch (e) { return null; }
        if (url.origin !== location.origin) return null;
        if (!/\.html?$/i.test(url.pathname)) return null;
        return url.origin + url.pathname;
    }

    function exists(target) {
        if (target in cache) return Promise.resolve(cache[target]);
        if (pending[target]) return pending[target];
        pending[target] = fetch(target + "?v=" + Date.now(), { method: "HEAD", cache: "no-store" })
            .then(function (r) { return r.ok; })
            .catch(function () { return true; }) // sin conexión: no marcar
            .then(function (ok) {
                // Solo se recuerdan las páginas que existen: así un cuento o tema
                // recién subido aparece disponible de inmediato.
                if (ok) cache[target] = true;
                delete pending[target];
                saveCache();
                return ok;
            });
        return pending[target];
    }

    function markSoon(a) {
        if (a.classList.contains("mvg-soon")) return;
        a.classList.add("mvg-soon");
        a.setAttribute("aria-disabled", "true");
        a.dataset.soon = "1";

        var card = a.closest(CARD_SELECTOR);
        // Se marca la tarjeta solo si todos sus enlaces a páginas faltan
        if (card && !card.classList.contains("mvg-soon-card")) {
            var links = Array.prototype.filter.call(card.querySelectorAll("a[href]"), targetOf);
            var allSoon = links.every(function (l) { return l.dataset.soon === "1" || l === a; });
            if (allSoon) {
                card.classList.add("mvg-soon-card");
                // Cambia textos como "Disponible" por "Próximamente"
                Array.prototype.forEach.call(card.querySelectorAll("span, small, b, strong, em, p"), function (el) {
                    if (el.children.length === 0 && /disponible/i.test(el.textContent) && el.textContent.length < 40) {
                        el.textContent = "Próximamente";
                        card.classList.add("mvg-soon-labeled"); // ya tiene su etiqueta: no se agrega otra
                    }
                });
            }
        }
    }

    function check(a) {
        if (a.dataset.soonChecked) return;
        var target = targetOf(a);
        if (!target) return;
        a.dataset.soonChecked = "1";
        exists(target).then(function (ok) { if (!ok) markSoon(a); });
    }

    function scan(root) {
        if (root.tagName === "A") check(root);
        if (root.querySelectorAll) Array.prototype.forEach.call(root.querySelectorAll("a[href]"), check);
    }

    // Aviso amigable
    var toast;
    function showToast(text) {
        if (!toast) {
            toast = document.createElement("div");
            toast.className = "mvg-soon-toast";
            toast.setAttribute("role", "status");
            toast.setAttribute("aria-live", "polite");
            document.body.appendChild(toast);
        }
        toast.textContent = text;
        toast.classList.add("show");
        clearTimeout(showToast.t);
        showToast.t = setTimeout(function () { toast.classList.remove("show"); }, 2400);
    }

    // Antes de salir de la página, confirma que el destino existe
    document.addEventListener("click", function (e) {
        var a = e.target.closest && e.target.closest("a[href]");
        if (!a) return;
        if (a.dataset.soon === "1") {
            e.preventDefault();
            showToast("¡Este tema llega muy pronto! 🚀");
            return;
        }
        var target = targetOf(a);
        if (!target || cache[target] === true) return;
        if (e.ctrlKey || e.metaKey || e.shiftKey || a.target === "_blank") return;
        e.preventDefault();
        exists(target).then(function (ok) {
            if (ok) location.href = a.href;
            else { markSoon(a); showToast("¡Este tema llega muy pronto! 🚀"); }
        });
    }, true);

    // Estilos
    var css = document.createElement("style");
    css.textContent = [
        ".mvg-soon-card{position:relative;filter:grayscale(.55);opacity:.72}",
        ".mvg-soon-card:not(.mvg-soon-labeled)::after{content:'Próximamente';position:absolute;top:8px;right:8px;z-index:5;",
        "padding:4px 10px;border:2px solid #fff;border-radius:999px;background:#17365d;color:#fff;font:900 12px/1.2 Nunito,Arial,sans-serif;",
        "letter-spacing:.3px;box-shadow:0 3px 0 rgba(0,0,0,.18);pointer-events:none}",
        "a.mvg-soon{cursor:not-allowed}",
        ".mvg-soon-card:hover{transform:none!important}",
        ".mvg-soon-toast{position:fixed;left:50%;bottom:calc(22px + env(safe-area-inset-bottom));z-index:99999;",
        "max-width:calc(100% - 32px);padding:12px 20px;border:4px solid #fff;border-radius:18px;color:#fff;",
        "font:900 16px/1.3 Nunito,Arial,sans-serif;text-align:center;background:linear-gradient(180deg,#2e506f,#17365d);",
        "box-shadow:0 9px 0 rgba(10,33,57,.27);opacity:0;visibility:hidden;transform:translate(-50%,30px);",
        "transition:transform .3s,opacity .3s,visibility .3s}",
        ".mvg-soon-toast.show{opacity:1;visibility:visible;transform:translate(-50%,0)}"
    ].join("");
    document.head.appendChild(css);

    function start() {
        scan(document.body);
        // Las tarjetas que se dibujan después (filtros, búsquedas) también se revisan
        new MutationObserver(function (list) {
            list.forEach(function (m) {
                Array.prototype.forEach.call(m.addedNodes, function (n) {
                    if (n.nodeType === 1) scan(n);
                });
            });
        }).observe(document.body, { childList: true, subtree: true });
    }

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
    else start();
})();
