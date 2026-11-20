        /* 📊 ENCUESTA DE LA CLASE: organizar datos, gráficos de barras y tablas de doble entrada. Temas 57–58. */
        const R = MKJ.rnd, P = MKJ.pick;
        const TEMAS = [["🍎", "🍌", "🍇", "🍓"], ["⚽", "🏀", "🏐", "🎾"], ["🐶", "🐱", "🐰", "🐢"], ["🍦", "🍫", "🍰", "🍪"]];
        const COL = ["#ef4444", "#eab308", "#8b5cf6", "#22c55e"];
        let cats = [], cuenta = [], hechos = [], primera = true, listoFn = null, fase = "";
        const NIV = [
            { n: 1, name: "Nivel 1", desc: "Arma el gráfico de barras", cls: "lv1", modo: "armar", k: 3 },
            { n: 2, name: "Nivel 2", desc: "Lee el gráfico: ¿cuántos más?", cls: "lv2", modo: "leer", k: 4 },
            { n: 3, name: "Nivel 3", desc: "Tablas de doble entrada", cls: "lv3", modo: "tabla" }
        ];
        MKP.juego({
            clave: "encuesta1p", rondas: 4, icono: "📊", pausa: 2200, niveles: NIV,
            ronda(nv, i, listo) {
                primera = true; listoFn = listo;
                if (nv.modo === "tabla") { tabla(); return; }
                cats = P(TEMAS).slice(0, nv.k);
                do { cuenta = cats.map(() => R(1, nv.modo === "armar" ? 6 : 9)); } while (new Set(cuenta).size < cats.length);
                if (nv.modo === "armar") { hechos = cats.map(() => 0); armar(); } else leer();
            }
        });
        function grafico(vals, drop) {
            return `<div class="graf" style="--n:${cats.length}">${cats.map((c, k) => `<div class="col${drop ? " drop" : ""}" ${drop ? `data-drop="col" data-k="${k}"` : ""} style="--c:${COL[k]}">${"<i></i>".repeat(vals[k])}</div>`).join("")}</div>
                <div class="etq" style="--n:${cats.length}">${cats.map((c, k) => `<span>${c}${drop ? "" : `<b>${vals[k]}</b>`}</span>`).join("")}</div>`;
        }
        function armar() {
            const votos = MKJ.shuffle(cats.flatMap((c, k) => Array(cuenta[k]).fill(c)));
            document.getElementById("card").innerHTML = `<p class="task">Los niños votaron por su favorito. ¡Arma el gráfico! <button class="again" id="oir" type="button">🔊</button></p>
                <div class="votos">${votos.map(v => `<span>${v}</span>`).join("")}</div>
                ${grafico(hechos, true)}
                <div class="bloqs">${cats.map((c, k) => `<span class="src" data-k="${k}" style="--c:${COL[k]}" title="${c}"></span>`).join("")}</div>
                <p class="sub">Arrastra un bloque de color a su columna por cada voto. Toca una columna para quitar un bloque.</p>
                <div class="tools"><button class="big-btn" id="ok" type="button">✅ ¡Listo!</button></div>`;
            document.querySelectorAll(".src").forEach(s => MKP.arrastrar(s, { alSoltar: d => { if (+d.dataset.k !== +s.dataset.k) { MKJ.sound("error"); MKP.decir("Ese color va en otra columna"); return false; } hechos[+s.dataset.k]++; MKJ.sound("moneda"); MKP.contar(hechos[+s.dataset.k]); armar(); return true; } }));
            document.querySelectorAll(".col").forEach(c => c.onclick = () => { const k = +c.dataset.k; if (hechos[k] > 0) { hechos[k]--; armar(); } });
            document.getElementById("ok").onclick = () => {
                if (hechos.every((h, k) => h === cuenta[k])) {
                    const max = Math.max(...cuenta), gana = cats[cuenta.indexOf(max)];
                    MKJ.sound("ok"); pregunta(`¡Gráfico listo! ¿Cuál ganó?`, gana, cats, `Ganó ${gana} con ${max} votos`);
                } else { primera = false; MKJ.sound("error"); MKP.decir("Cuenta otra vez los votos de cada uno"); }
            };
            const t = "Cuenta los votos y arma el gráfico de barras"; document.getElementById("oir").onclick = () => MKP.decir(t);
            if (!hechos.some(Boolean)) MKP.decir(t);
        }
        function leer() {
            let [a, b] = MKJ.shuffle([0, 1, 2, 3].slice(0, cats.length)).slice(0, 2);
            if (cuenta[a] < cuenta[b]) [a, b] = [b, a];
            const dif = cuenta[a] - cuenta[b];
            document.getElementById("card").innerHTML = `<p class="task">¿Cuántos más eligieron ${cats[a]} que ${cats[b]}? <button class="again" id="oir" type="button">🔊</button></p>${grafico(cuenta, false)}<div id="preg"></div>`;
            const t = "Mira el gráfico. ¿Cuántos más eligieron el primero que el segundo?"; document.getElementById("oir").onclick = () => MKP.decir(t); MKP.decir(t);
            opciones(dif, [dif, dif + 1, dif + 2, Math.max(0, dif - 1)], `${cuenta[a]} menos ${cuenta[b]} es ${dif}`);
        }
        function tabla() {
            const fr = P(TEMAS).slice(0, 3), filas = [["👦", "Niños"], ["👧", "Niñas"]], d = filas.map(() => fr.map(() => R(1, 9)));
            const f = R(0, 1), c = R(0, 2), tipo = R(0, 2);
            let preg, resp;
            if (tipo === 0) { preg = `¿Cuántos ${filas[f][1].toLowerCase()} prefieren ${fr[c]}?`; resp = d[f][c]; }
            else if (tipo === 1) { preg = `¿Cuántos niños y niñas en total prefieren ${fr[c]}?`; resp = d[0][c] + d[1][c]; }
            else { preg = `¿Cuántos ${filas[f][1].toLowerCase()} votaron en total?`; resp = d[f].reduce((a, b) => a + b); }
            document.getElementById("card").innerHTML = `<p class="task">${preg} <button class="again" id="oir" type="button">🔊</button></p>
                <table class="tabla"><tr><th></th>${fr.map(x => `<th>${x}</th>`).join("")}</tr>${filas.map((r, j) => `<tr><th>${r[0]} ${r[1]}</th>${d[j].map(v => `<td>${v}</td>`).join("")}</tr>`).join("")}</table><div id="preg"></div>`;
            document.getElementById("oir").onclick = () => MKP.decir(preg); MKP.decir(preg);
            opciones(resp, [resp, resp + 1, resp - 1 || resp + 2, resp + 3], "La respuesta es " + resp);
        }
        function pregunta(t, resp, ops, voz) {
            document.getElementById("card").insertAdjacentHTML("beforeend", `<p class="task" style="margin-top:12px">${t}</p><div class="answers" id="ans">${MKJ.shuffle(ops.slice()).map(o => `<button class="answer" type="button" style="font-size:40px">${o}</button>`).join("")}</div>`);
            document.querySelector(".tools").remove();
            MKP.decir(t); enlazar(resp, voz);
        }
        function opciones(resp, ops, voz) {
            document.getElementById("preg").innerHTML = `<div class="answers">${MKJ.shuffle([...new Set(ops)].slice(0, 3)).map(o => `<button class="answer" type="button">${o}</button>`).join("")}</div>`;
            enlazar(resp, voz);
        }
        function enlazar(resp, voz) {
            document.querySelectorAll(".answer").forEach(b => b.onclick = () => {
                if (b.dataset.done) return;
                if (b.textContent === String(resp)) { document.querySelectorAll(".answer").forEach(x => x.dataset.done = 1); b.classList.add("right"); MKJ.sound("ok"); MKP.decir("¡Muy bien! " + voz); listoFn(primera); }
                else { primera = false; b.classList.add("wrong"); MKJ.sound("error"); MKP.decir("Mira bien los datos"); }
            });
        }
        window.__juego = { get cuenta() { return cuenta; }, get hechos() { return hechos; } };
