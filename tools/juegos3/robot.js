        /* 🤖 ROBOT EN LA CUADRÍCULA: posiciones, direcciones, recorridos y coordenadas. Temas 52–53. */
        const R = MKJ.rnd;
        let N = 5, ini = [0, 0], meta = [0, 0], muros = new Set(), prog = [], primera = true, listoFn = null, corriendo = false, nivelAct = null;
        const DIR = { "⬆️": [0, -1], "⬇️": [0, 1], "⬅️": [-1, 0], "➡️": [1, 0] };
        const NIV = [
            { n: 1, name: "Nivel 1", desc: "Caminos rectos", cls: "lv1", N: 5, muros: 0, giros: false },
            { n: 2, name: "Nivel 2", desc: "Caminos con vueltas", cls: "lv2", N: 5, muros: 0, giros: true },
            { n: 3, name: "Nivel 3", desc: "Esquiva las paredes y llega a la casilla (columna, fila)", cls: "lv3", N: 6, muros: 6, giros: true, coord: true }
        ];
        const k = (x, y) => x + "," + y;
        function libre(x, y) { return x >= 0 && y >= 0 && x < N && y < N && !muros.has(k(x, y)); }
        function alcanzable() {   // BFS
            const vis = new Set([k(...ini)]), q = [ini];
            while (q.length) { const [x, y] = q.shift(); if (x === meta[0] && y === meta[1]) return true; for (const d of Object.values(DIR)) { const nx = x + d[0], ny = y + d[1]; if (libre(nx, ny) && !vis.has(k(nx, ny))) { vis.add(k(nx, ny)); q.push([nx, ny]); } } }
            return false;
        }
        MKP.juego({
            clave: "robot1p", rondas: 5, icono: "🤖", pausa: 1800, niveles: NIV,
            ronda(nv, i, listo) {
                primera = true; listoFn = listo; prog = []; corriendo = false; nivelAct = nv; N = nv.N;
                do {
                    muros = new Set(); ini = [R(0, N - 1), R(0, N - 1)];
                    if (!nv.giros) meta = Math.random() < .5 ? [R(0, N - 1), ini[1]] : [ini[0], R(0, N - 1)];
                    else meta = [R(0, N - 1), R(0, N - 1)];
                    for (let m = 0; m < nv.muros; m++) muros.add(k(R(0, N - 1), R(0, N - 1)));
                    muros.delete(k(...ini)); muros.delete(k(...meta));
                } while ((meta[0] === ini[0] && meta[1] === ini[1]) || (nv.giros && (meta[0] === ini[0] || meta[1] === ini[1])) || !alcanzable());
                pintar();
                const t = nv.coord ? `Lleva al robot a la casilla columna ${meta[0] + 1}, fila ${meta[1] + 1}` : "Lleva al robot hasta la estrella. Pon las flechas y aprieta ¡Vamos!";
                document.getElementById("oir").onclick = () => MKP.decir(t); MKP.decir(t);
            }
        });
        function pintar(pos, pasos) {
            pos = pos || ini;
            const nv = nivelAct, pas = new Set((pasos || []).map(p => k(...p)));
            document.getElementById("card").innerHTML = `<p class="task">${nv.coord ? `Llega a la casilla <span class="big">(${meta[0] + 1}, ${meta[1] + 1})</span>` : "Lleva al robot 🤖 a la ⭐"} <button class="again" id="oir" type="button">🔊</button></p>
                <div class="grid" style="--n:${N}">${Array.from({ length: N * N }, (_, j) => { const x = j % N, y = Math.floor(j / N), c = k(x, y);
                    return `<div class="celda${muros.has(c) ? " muro" : ""}${pas.has(c) ? " paso" : ""}">${nv.coord && y === 0 ? `<span class="co">${x + 1}</span>` : ""}${nv.coord && x === 0 ? `<span class="co" style="top:auto;bottom:1px">${y + 1}</span>` : ""}${x === pos[0] && y === pos[1] ? "🤖" : x === meta[0] && y === meta[1] && !nv.coord ? "⭐" : x === meta[0] && y === meta[1] ? "🏁" : muros.has(c) ? "🧱" : ""}</div>`; }).join("")}</div>
                <div class="prog" id="prog">${prog.join("") || "<span style='font-size:15px;color:#64748b;font-weight:800'>Tu programa: toca las flechas</span>"}</div>
                <div class="flechas">${Object.keys(DIR).map(d => `<button type="button" data-d="${d}">${d}</button>`).join("")}<button type="button" class="x" data-d="x">⌫</button><button type="button" class="go" data-d="go">▶ ¡Vamos!</button></div>`;
            document.querySelectorAll(".flechas button").forEach(b => b.onclick = () => boton(b.dataset.d));
            const t = nv.coord ? `Lleva al robot a la casilla columna ${meta[0] + 1}, fila ${meta[1] + 1}` : "Lleva al robot hasta la estrella";
            document.getElementById("oir").onclick = () => MKP.decir(t);
        }
        function boton(d) {
            if (corriendo) return;
            if (d === "x") { prog.pop(); pintar(); return; }
            if (d === "go") { correr(); return; }
            if (prog.length < 16) { prog.push(d); MKJ.sound("salto"); pintar(); }
        }
        function correr() {
            corriendo = true; let p = ini.slice(); const pasos = [p.slice()]; let j = 0;
            const paso = () => {
                if (j >= prog.length) { fin(p, pasos); return; }
                const d = DIR[prog[j++]], nx = p[0] + d[0], ny = p[1] + d[1];
                if (!libre(nx, ny)) { MKJ.sound("error"); MKP.decir("¡Choqué! Revisa tu programa"); primera = false; corriendo = false; setTimeout(() => pintar(), 900); return; }
                p = [nx, ny]; pasos.push(p.slice()); pintar(p, pasos); MKJ.sound("moneda"); setTimeout(paso, 380);
            };
            paso();
        }
        function fin(p, pasos) {
            if (p[0] === meta[0] && p[1] === meta[1]) { MKJ.sound("ok"); MKP.aviso("¡Llegué!", true); MKP.decir("¡Muy bien! El robot llegó"); listoFn(primera); }
            else { primera = false; MKJ.sound("error"); MKP.decir("El robot no llegó. Cambia el programa"); corriendo = false; setTimeout(() => pintar(), 900); }
        }
        window.__juego = { get ini() { return ini; }, get meta() { return meta; }, get muros() { return muros; }, boton, libre };
