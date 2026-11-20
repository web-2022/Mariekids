        /* 🔐 CAJA FUERTE: halla x, sumas con letras, criptoaritmética e inecuaciones. Temas 62, 64, 67, 69. */
        const R = MKJ.rnd, P = MKJ.pick;
        let resp = [], modo = "", primera = true, listoFn = null, fin = false, elegidos = new Set();
        const NIV = [
            { n: 1, name: "Nivel 1", desc: "Halla x y las letras: x + 7 = 15", cls: "lv1", modo: "x" },
            { n: 2, name: "Nivel 2", desc: "Cifras ocultas: 3▢ + 25 = 59", cls: "lv2", modo: "cripto" },
            { n: 3, name: "Nivel 3", desc: "Inecuaciones: x > 4 y x < 8", cls: "lv3", modo: "ineq" }
        ];
        MKP.juego({
            clave: "caja1p", rondas: 6, icono: "🔐", pausa: 1800, niveles: NIV,
            ronda(nv, i, listo) {
                primera = true; listoFn = listo; fin = false; modo = nv.modo; elegidos = new Set();
                let eq, t, sub = "Toca el número que abre la caja.";
                if (modo === "x") {
                    const k = i % 3;
                    if (k === 0) { const x = R(1, 12), a = R(1, 9); eq = `x + ${a} = ${x + a}`; resp = [x]; t = `x más ${a} es igual a ${x + a}. ¿Cuánto vale x?`; }
                    else if (k === 1) { const x = R(1, 9); const L = P(["A", "B", "M"]); eq = `${L} + ${L} = ${2 * x}`; resp = [x]; t = `${L} más ${L} es ${2 * x}. ¿Cuánto vale ${L}?`; }
                    else { const x = R(1, 12), a = R(x + 1, x + 9); eq = `${a} − x = ${a - x}`; resp = [x]; t = `${a} menos x es ${a - x}. ¿Cuánto vale x?`; }
                } else if (modo === "cripto") {
                    const a = R(11, 59), b = R(11, 39), s = a + b, cual = P(["a", "b", "s"]);
                    const da = String(a), db = String(b), ds = String(s), pos = R(0, 1);
                    const hide = (str, on) => on ? str.split("").map((c, k) => k === pos ? '<span class="h">?</span>' : c).join("") : str;
                    resp = [+(cual === "a" ? da : cual === "b" ? db : ds)[pos]];
                    eq = `<span class="cripto"><span></span><span></span><span>${hide(da, cual === "a")}</span><span></span><span>+</span><span>${hide(db, cual === "b")}</span><span class="ln"></span><span></span><span></span><span>${hide(ds, cual === "s")}</span></span>`;
                    t = "¿Qué cifra está escondida?"; sub = "Toca la cifra que falta.";
                } else {
                    const a = R(1, 6), b = R(a + 2, Math.min(a + 5, 11)), tipo = i % 3;
                    if (tipo === 0) { eq = `x > ${a}  y  x < ${b}`; resp = Array.from({ length: b - a - 1 }, (_, k) => a + 1 + k); t = `Toca todos los números mayores que ${a} y menores que ${b}`; }
                    else if (tipo === 1) { eq = `x < ${b - 2}`; resp = Array.from({ length: b - 2 }, (_, k) => k).filter(v => v <= 11); t = `Toca todos los números menores que ${b - 2}, desde el cero`; }
                    else { eq = `x ≥ ${b}`; resp = Array.from({ length: 12 - b }, (_, k) => b + k); t = `Toca todos los números mayores o iguales que ${b}, hasta el 11`; }
                    sub = "Toca TODOS los números que abren la caja y luego ✅.";
                }
                document.getElementById("card").innerHTML = `<p class="task">Abre la caja fuerte <button class="again" id="oir" type="button">🔊</button></p>
                    <div class="caja-f" id="caja"><span class="cand">🔒</span><span class="eqc">${modo === "cripto" ? eq : eq.replace(/x|[ABM](?= )/g, m => `<span class="h">${m}</span>`)}</span></div>
                    <p class="sub">${sub}</p>
                    <div class="num">${Array.from({ length: modo === "ineq" ? 12 : modo === "cripto" ? 10 : 12 }, (_, k) => `<button type="button" data-n="${k + (modo === "x" ? 1 : 0)}">${k + (modo === "x" ? 1 : 0)}</button>`).join("")}</div>
                    ${modo === "ineq" ? `<div class="tools"><button class="big-btn" id="ok" type="button">✅ ¡Abrir!</button></div>` : ""}`;
                document.querySelectorAll(".num button").forEach(b => b.onclick = () => tocar(b));
                if (modo === "ineq") document.getElementById("ok").onclick = revisarIneq;
                document.getElementById("oir").onclick = () => MKP.decir(t); MKP.decir(t);
            }
        });
        function abrir(msg) { fin = true; document.getElementById("caja").classList.add("abierta"); document.querySelector(".caja-f .cand").textContent = "🔓"; MKJ.sound("ok"); MKP.aviso("¡Abierta!", true); MKP.decir(msg); listoFn(primera); }
        function tocar(b) {
            if (fin) return;
            const n = +b.dataset.n;
            if (modo === "ineq") { if (elegidos.has(n)) { elegidos.delete(n); b.classList.remove("on"); } else { elegidos.add(n); b.classList.add("on"); } MKJ.sound("salto"); return; }
            if (n === resp[0]) abrir("¡Muy bien! Es " + n);
            else { primera = false; b.classList.add("mal"); MKJ.sound("error"); MKP.decir("No abre. Prueba reemplazando el número"); }
        }
        function revisarIneq() {
            if (fin) return;
            const ok = resp.length === elegidos.size && resp.every(v => elegidos.has(v));
            if (ok) abrir("¡Muy bien! Abren " + resp.join(", "));
            else { primera = false; MKJ.sound("error"); MKP.decir(elegidos.size < resp.length ? "Faltan números que también cumplen" : "Algún número no cumple. Revisa"); }
        }
        window.__juego = { get resp() { return resp; }, get modo() { return modo; } };
