        /* 💰 MONEDAS: reconocer monedas peruanas (S/ 1, 2 y 5) y pagar el precio justo. */
        const R = MKJ.rnd, P = MKJ.pick;
        const PROD = ["🍭", "🧃", "🍌", "🧸", "🎈", "✏️", "🍪", "🪀", "🍞", "🥤"];
        let modo = "", meta = 0, total = 0, primera = true, fin = false, listoFn = null, valores = [];
        const NIV = [
            { n: 1, name: "Nivel 1", desc: "Conoce las monedas de 1, 2 y 5 soles", cls: "lv1", modo: "conoce" },
            { n: 2, name: "Nivel 2", desc: "Paga con monedas de 1 sol (hasta 10)", cls: "lv2", modo: "paga", vals: [1], max: 10 },
            { n: 3, name: "Nivel 3", desc: "Paga con monedas de 1, 2 y 5 soles", cls: "lv3", modo: "paga", vals: [1, 2, 5], max: 10 }
        ];
        const moneda = v => v >= 10 ? `<div class="moneda billete b${v}" data-v="${v}"><span><b>${v}</b>soles</span></div>` : `<div class="moneda m${v}" data-v="${v}"><span><b>${v}</b>${v === 1 ? "sol" : "soles"}</span></div>`;
        function vuelto(pagos) {
            const pago = MKJ.pick(pagos || [5, 10, 10, 20]), precio = R(1, pago - 1), v = pago - precio, prod = P(PROD);
            meta = v;
            const opts = MKJ.shuffle([...new Set([v, v + 1, Math.max(0, v - 1), v + 2])].slice(0, 3));
            document.getElementById("card").innerHTML = `<p class="task">¿Cuánto es el vuelto? <button class="again" id="oir" type="button">🔊</button></p>
                <div class="tienda"><span class="prod">${prod}</span><span class="precio">S/ ${precio}</span></div>
                <p class="sub" style="font-size:20px">Pagas con ${moneda(pago).replace('class="moneda', 'style="display:inline-grid;vertical-align:middle" class="moneda')}</p>
                <div class="bolsa">${opts.map(o => `<button class="big-btn vto" data-v="${o}" type="button" style="font-size:30px;min-width:90px">S/ ${o}</button>`).join("")}</div>`;
            document.querySelectorAll(".vto").forEach(b => b.onclick = () => {
                if (fin) return;
                if (+b.dataset.v === v) { fin = true; MKJ.sound("ok"); MKP.aviso("¡Sí!", true); MKP.decir(`¡Muy bien! ${pago} menos ${precio} es ${v}`); listoFn(primera); }
                else { primera = false; MKJ.sound("error"); MKP.decir(`Cuenta desde ${precio} hasta ${pago}`); }
            });
            const t = `Cuesta ${precio} soles y pagas con ${pago}. ¿Cuánto es el vuelto?`;
            document.getElementById("oir").onclick = () => MKP.decir(t); MKP.decir(t);
        }
        const NIV5 = [
            { n: 1, name: "Nivel 1", desc: "Paga con 1, 2 y 5 soles (hasta 15)", cls: "lv1", modo: "paga", vals: [1, 2, 5], max: 15 },
            { n: 2, name: "Nivel 2", desc: "Con billetes de 10 y 20 (hasta 40)", cls: "lv2", modo: "paga", vals: [1, 2, 5, 10, 20], max: 40 },
            { n: 3, name: "Nivel 3", desc: "¿Cuánto es el vuelto?", cls: "lv3", modo: "vuelto" }
        ];
        const NIV6 = [
            { n: 1, name: "Nivel 1", desc: "Paga hasta S/ 50 con monedas y billetes", cls: "lv1", modo: "paga", vals: [1, 2, 5, 10, 20], max: 50 },
            { n: 2, name: "Nivel 2", desc: "Vuelto con 10 y 20 soles", cls: "lv2", modo: "vuelto", pagos: [10, 20] },
            { n: 3, name: "Nivel 3", desc: "Vuelto con 50 soles", cls: "lv3", modo: "vuelto", pagos: [20, 50] }
        ];
        MKP.juego({
            clave: "monedas", rondas: 6, icono: "💰", niveles: NIV, niveles4: NIV, niveles5: NIV5, niveles6: NIV6,
            ronda(nv, i, listo) {
                modo = nv.modo; primera = true; fin = false; listoFn = listo; total = 0;
                if (modo === "conoce") {
                    meta = P([1, 2, 5]);
                    document.getElementById("card").innerHTML = `<p class="task">Toca la moneda de <span class="big">${meta}</span> ${meta === 1 ? "sol" : "soles"} <button class="again" id="oir" type="button">🔊</button></p>
                        <div class="bolsa">${MKJ.shuffle([1, 2, 5, 1, 2, 5]).map(moneda).join("")}</div>`;
                    document.querySelectorAll(".bolsa .moneda").forEach(m => m.onclick = () => conoce(m));
                    const t = `Toca la moneda de ${MKP.NUM[meta]} ${meta === 1 ? "sol" : "soles"}`;
                    document.getElementById("oir").onclick = () => MKP.decir(t); MKP.decir(t); return;
                }
                if (modo === "vuelto") { vuelto(nv.pagos); return; }
                valores = nv.vals; meta = R(nv.max > 20 ? 12 : 2, nv.max);
                const prod = P(PROD);
                document.getElementById("card").innerHTML = `<p class="task">Paga justo <button class="again" id="oir" type="button">🔊</button></p>
                    <div class="tienda"><span class="prod">${prod}</span><span class="precio">S/ ${meta}</span></div>
                    <div class="bandeja" id="bandeja" data-drop="bandeja"><span class="vacia">Arrastra aquí tus monedas</span></div>
                    <div class="total" id="total">Pusiste: S/ 0</div>
                    <div class="bolsa">${valores.map(moneda).join("")}</div>
                    <div class="tools"><button class="big-btn" id="ok" type="button">✅ ¡Pagar!</button></div>`;
                document.querySelectorAll(".bolsa .moneda").forEach(m => MKP.arrastrar(m, { alTocar: () => poner(+m.dataset.v), alSoltar: d => { if (d.id === "bandeja") poner(+m.dataset.v); return false; } }));
                document.getElementById("ok").onclick = pagar;
                const t = `Cuesta ${MKP.NUM[meta]} ${meta === 1 ? "sol" : "soles"}. Paga justo`;
                document.getElementById("oir").onclick = () => MKP.decir(t); MKP.decir(t);
            }
        });
        function conoce(m) {
            if (fin) return;
            if (+m.dataset.v === meta) { fin = true; MKJ.sound("ok"); MKP.aviso("¡Sí!", true); MKP.decir(`¡Muy bien! Es la moneda de ${MKP.NUM[meta]}`); listoFn(primera); }
            else { primera = false; MKJ.sound("error"); m.classList.remove("mal"); void m.offsetWidth; m.classList.add("mal"); MKP.decir(`Esa es de ${MKP.NUM[+m.dataset.v]}`); }
        }
        function poner(v) {
            if (fin) return;
            const b = document.getElementById("bandeja"), e = b.querySelector(".vacia"); if (e) e.remove();
            const div = document.createElement("div"); div.innerHTML = moneda(v); const m = div.firstChild;
            m.onclick = () => { if (fin) return; m.remove(); total -= v; pintar(); MKJ.sound("salto"); };
            b.appendChild(m); total += v; pintar(); MKJ.sound("moneda"); MKP.decir(String(total));
        }
        function pintar() { document.getElementById("total").textContent = "Pusiste: S/ " + total; }
        function pagar() {
            if (fin) return;
            if (total === meta) { fin = true; MKJ.sound("ok"); MKP.aviso("¡Gracias!", true); MKP.decir(`¡Muy bien! Pagaste ${MKP.NUM[meta]} soles justos`); listoFn(primera); }
            else { primera = false; MKJ.sound("error"); MKP.aviso(total < meta ? "¡Falta!" : "¡Es mucho!", false); MKP.decir(total < meta ? `Falta dinero. Pusiste ${total}` : `Pusiste ${total}. Es mucho. Toca una moneda para sacarla`); }
        }
        window.__juego = { get meta() { return meta; }, get total() { return total; }, poner, pagar };
