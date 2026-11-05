/* =========================================================
   LOS MENTECITOS — personajes originales de Mariekids
   MKChar(nombre, ánimo) devuelve un SVG (viewBox 0 0 120 120).
   ánimo: "feliz" | "piensa" | "anima"
========================================================= */
(function () {
  "use strict";

  function eyes(x1, x2, y, r, mood, color) {
    color = color || "#1f2937";
    if (mood === "feliz") {
      // ojos sonrientes en forma de arco
      return `<path d="M${x1 - r} ${y} q${r} ${-r * 1.3} ${r * 2} 0" stroke="${color}" stroke-width="${r * 0.55}" fill="none" stroke-linecap="round"/>
              <path d="M${x2 - r} ${y} q${r} ${-r * 1.3} ${r * 2} 0" stroke="${color}" stroke-width="${r * 0.55}" fill="none" stroke-linecap="round"/>`;
    }
    const look = mood === "piensa" ? -r * 0.3 : 0;
    return `<circle cx="${x1}" cy="${y}" r="${r}" fill="#fff"/><circle cx="${x2}" cy="${y}" r="${r}" fill="#fff"/>
            <circle cx="${x1 + look}" cy="${y + look}" r="${r * 0.62}" fill="${color}"/><circle cx="${x2 + look}" cy="${y + look}" r="${r * 0.62}" fill="${color}"/>
            <circle cx="${x1 + look + r * 0.22}" cy="${y + look - r * 0.25}" r="${r * 0.22}" fill="#fff"/><circle cx="${x2 + look + r * 0.22}" cy="${y + look - r * 0.25}" r="${r * 0.22}" fill="#fff"/>`;
  }
  function mouth(x, y, w, mood, color) {
    color = color || "#7c2d12";
    if (mood === "feliz") return `<path d="M${x - w} ${y} q${w} ${w * 1.1} ${w * 2} 0 q${-w} ${w * 0.35} ${-w * 2} 0z" fill="#be123c" stroke="${color}" stroke-width="1.5" stroke-linejoin="round"/>`;
    if (mood === "piensa") return `<path d="M${x - w * 0.6} ${y + 2} q${w * 0.6} ${-w * 0.35} ${w * 1.2} 0" stroke="${color}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
    return `<path d="M${x - w * 0.8} ${y} q${w * 0.8} ${w * 0.7} ${w * 1.6} 0" stroke="${color}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
  }
  const cheeks = (x1, x2, y) => `<ellipse cx="${x1}" cy="${y}" rx="6" ry="3.6" fill="#fb7185" opacity=".55"/><ellipse cx="${x2}" cy="${y}" rx="6" ry="3.6" fill="#fb7185" opacity=".55"/>`;
  const sparkle = mood => mood === "feliz" ? `<path d="M102 14l2.5 6 6 2.5-6 2.5-2.5 6-2.5-6-6-2.5 6-2.5z" fill="#fde047"/><path d="M16 22l1.6 4 4 1.6-4 1.6-1.6 4-1.6-4-4-1.6 4-1.6z" fill="#fde047"/>` : "";
  const think = mood => mood === "piensa" ? `<circle cx="100" cy="20" r="4" fill="#c4b5fd"/><circle cx="108" cy="10" r="6" fill="#c4b5fd"/>` : "";

  const C = {
    // Mika: gatita detective con sombrero y lupa
    mika: m => `
      <path d="M28 40 L22 12 L48 30Z" fill="#fb923c"/><path d="M92 40 L98 12 L72 30Z" fill="#fb923c"/>
      <path d="M30 36 L27 20 L43 31Z" fill="#fecdd3"/><path d="M90 36 L93 20 L77 31Z" fill="#fecdd3"/>
      <ellipse cx="60" cy="64" rx="38" ry="34" fill="#fdba74"/>
      <path d="M38 50 q6 -6 12 0" stroke="#ea580c" stroke-width="3" fill="none"/><path d="M70 50 q6 -6 12 0" stroke="#ea580c" stroke-width="3" fill="none"/>
      <path d="M30 26 h60 l-6 -14 h-48z" fill="#92400e"/><rect x="20" y="24" width="80" height="7" rx="3.5" fill="#78350f"/>
      ${eyes(46, 74, 60, 7, m)}
      <path d="M57 72 h6 l-3 4z" fill="#e11d48"/>${mouth(60, 78, 7, m)}${cheeks(36, 84, 72)}
      <path d="M22 70 h14 M22 76 h14 M84 70 h14 M84 76 h14" stroke="#9a3412" stroke-width="1.6" stroke-linecap="round"/>
      <circle cx="100" cy="94" r="12" fill="#e0f2fe" stroke="#475569" stroke-width="4"/><path d="M92 103 l-10 12" stroke="#475569" stroke-width="6" stroke-linecap="round"/>
      ${sparkle(m)}${think(m)}`,

    // Tito: robot veloz con antena de luz
    tito: m => `
      <line x1="60" y1="20" x2="60" y2="8" stroke="#64748b" stroke-width="4"/><circle cx="60" cy="8" r="6" fill="${m === "feliz" ? "#facc15" : "#22d3ee"}"/>
      <rect x="22" y="20" width="76" height="70" rx="22" fill="#93c5fd" stroke="#3b82f6" stroke-width="4"/>
      <rect x="32" y="34" width="56" height="34" rx="14" fill="#1e3a8a"/>
      ${m === "feliz" ? `<path d="M40 52 q6 -8 12 0 M68 52 q6 -8 12 0" stroke="#67e8f9" stroke-width="4" fill="none" stroke-linecap="round"/>` :
        `<rect x="40" y="44" width="12" height="${m === "piensa" ? 6 : 12}" rx="3" fill="#67e8f9"/><rect x="68" y="44" width="12" height="${m === "piensa" ? 6 : 12}" rx="3" fill="#67e8f9"/>`}
      ${m === "feliz" ? `<path d="M48 76 q12 10 24 0" stroke="#1e3a8a" stroke-width="4" fill="none" stroke-linecap="round"/>` : `<rect x="50" y="76" width="20" height="4" rx="2" fill="#1e3a8a"/>`}
      <rect x="10" y="44" width="12" height="22" rx="5" fill="#60a5fa"/><rect x="98" y="44" width="12" height="22" rx="5" fill="#60a5fa"/>
      <rect x="36" y="92" width="48" height="20" rx="8" fill="#60a5fa"/><circle cx="50" cy="102" r="4" fill="#fde047"/><circle cx="62" cy="102" r="4" fill="#f472b6"/><circle cx="74" cy="102" r="4" fill="#4ade80"/>
      ${sparkle(m)}${think(m)}`,

    // Lula: llamita andina con chullo
    lula: m => `
      <rect x="44" y="78" width="32" height="38" rx="14" fill="#fef3c7"/>
      <ellipse cx="60" cy="60" rx="30" ry="28" fill="#fffbeb" stroke="#fde68a" stroke-width="3"/>
      <path d="M30 46 q30 -42 60 0z" fill="#e11d48"/>
      <path d="M33 40 h54" stroke="#facc15" stroke-width="5"/><path d="M36 34 l6 5 6 -5 6 5 6 -5 6 5 6 -5 6 5" stroke="#22c55e" stroke-width="3" fill="none"/>
      <circle cx="60" cy="24" r="7" fill="#7c3aed"/>
      <path d="M30 46 l-2 22" stroke="#e11d48" stroke-width="6" stroke-linecap="round"/><path d="M90 46 l2 22" stroke="#e11d48" stroke-width="6" stroke-linecap="round"/>
      <circle cx="28" cy="72" r="4" fill="#facc15"/><circle cx="92" cy="72" r="4" fill="#facc15"/>
      ${eyes(49, 71, 58, 6, m)}
      <ellipse cx="60" cy="72" rx="12" ry="8" fill="#fde68a"/><path d="M56 70 h8" stroke="#92400e" stroke-width="2" stroke-linecap="round"/>
      ${mouth(60, 76, 5, m)}${cheeks(40, 80, 68)}
      ${sparkle(m)}${think(m)}`,

    // Pipo: pingüino con audífonos
    pipo: m => `
      <ellipse cx="60" cy="66" rx="36" ry="44" fill="#1f2937"/>
      <ellipse cx="60" cy="74" rx="26" ry="32" fill="#f8fafc"/>
      <path d="M28 36 q32 -38 64 0" stroke="#ec4899" stroke-width="6" fill="none"/>
      <rect x="18" y="34" width="16" height="24" rx="7" fill="#f472b6"/><rect x="86" y="34" width="16" height="24" rx="7" fill="#f472b6"/>
      ${eyes(48, 72, 50, 7, m, "#0f172a")}
      <path d="M52 62 l8 8 8 -8z" fill="#f97316"/>${m === "feliz" ? `<path d="M52 62 l8 4 8 -4" stroke="#c2410c" stroke-width="2" fill="none"/>` : ""}
      ${cheeks(40, 80, 64)}
      <ellipse cx="46" cy="112" rx="10" ry="5" fill="#f97316"/><ellipse cx="74" cy="112" rx="10" ry="5" fill="#f97316"/>
      <path d="M8 88 q8 -2 0 -10 M112 88 q-8 -2 0 -10" stroke="#a78bfa" stroke-width="3" fill="none" stroke-linecap="round"/>
      ${sparkle(m)}${think(m)}`,

    // Bimba: elefanta que nunca olvida
    bimba: m => `
      <ellipse cx="22" cy="58" rx="20" ry="26" fill="#a5b4fc"/><ellipse cx="98" cy="58" rx="20" ry="26" fill="#a5b4fc"/>
      <ellipse cx="22" cy="58" rx="12" ry="17" fill="#fbcfe8"/><ellipse cx="98" cy="58" rx="12" ry="17" fill="#fbcfe8"/>
      <ellipse cx="60" cy="56" rx="34" ry="32" fill="#c7d2fe"/>
      <path d="M52 70 q-2 26 8 36 q6 6 10 0" stroke="#a5b4fc" stroke-width="13" fill="none" stroke-linecap="round"/>
      ${eyes(46, 74, 52, 7, m)}
      ${cheeks(38, 82, 66)}${m === "feliz" ? `<path d="M40 74 q6 6 10 2" stroke="#7c3aed" stroke-width="2.4" fill="none" stroke-linecap="round"/>` : ""}
      <circle cx="94" cy="28" r="6" fill="#fde047"/><circle cx="88" cy="22" r="5" fill="#f472b6"/><circle cx="100" cy="22" r="5" fill="#f472b6"/><circle cx="88" cy="34" r="5" fill="#f472b6"/><circle cx="100" cy="34" r="5" fill="#f472b6"/><circle cx="94" cy="28" r="4" fill="#fde047"/>
      ${sparkle(m)}${think(m)}`,

    // Kiki: búho sabio con lentes
    kiki: m => `
      <path d="M26 30 L32 8 L46 24Z" fill="#92400e"/><path d="M94 30 L88 8 L74 24Z" fill="#92400e"/>
      <ellipse cx="60" cy="66" rx="38" ry="44" fill="#b45309"/>
      <ellipse cx="60" cy="80" rx="24" ry="28" fill="#fde68a"/>
      <path d="M48 78 q4 4 8 0 M64 78 q4 4 8 0 M52 90 q4 4 8 0 M60 90 q4 4 8 0" stroke="#d97706" stroke-width="2" fill="none"/>
      <circle cx="44" cy="46" r="15" fill="#fef3c7"/><circle cx="76" cy="46" r="15" fill="#fef3c7"/>
      ${eyes(44, 76, 46, 8, m)}
      <circle cx="44" cy="46" r="15" fill="none" stroke="#1e3a8a" stroke-width="3.5"/><circle cx="76" cy="46" r="15" fill="none" stroke="#1e3a8a" stroke-width="3.5"/><path d="M59 46 h2" stroke="#1e3a8a" stroke-width="3.5"/>
      <path d="M55 60 l5 8 5 -8z" fill="#f97316"/>
      <path d="M22 70 q-10 16 4 30" stroke="#92400e" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M98 70 q10 16 -4 30" stroke="#92400e" stroke-width="9" fill="none" stroke-linecap="round"/>
      <rect x="44" y="4" width="32" height="6" rx="1" fill="#1e3a8a" transform="rotate(-6 60 7)"/><path d="M74 6 l6 10" stroke="#facc15" stroke-width="2"/>
      ${sparkle(m)}${think(m)}`,

    // Coco: monito artista con boina y pincel
    coco: m => `
      <circle cx="22" cy="56" r="14" fill="#a16207"/><circle cx="98" cy="56" r="14" fill="#a16207"/>
      <circle cx="22" cy="56" r="8" fill="#fcd34d"/><circle cx="98" cy="56" r="8" fill="#fcd34d"/>
      <circle cx="60" cy="58" r="36" fill="#a16207"/>
      <path d="M60 36 c-26 0 -30 22 -22 34 c4 18 40 18 44 0 c8 -12 4 -34 -22 -34z" fill="#fde68a"/>
      <ellipse cx="60" cy="26" rx="30" ry="10" fill="#dc2626"/><circle cx="60" cy="15" r="4" fill="#dc2626"/>
      ${eyes(49, 71, 52, 6.5, m)}
      <ellipse cx="60" cy="64" rx="4" ry="2.6" fill="#78350f"/>${mouth(60, 72, 7, m)}${cheeks(40, 80, 64)}
      <path d="M96 96 l18 -28" stroke="#92400e" stroke-width="5" stroke-linecap="round"/><path d="M112 70 l6 -8 -2 10z" fill="#3b82f6"/>
      <circle cx="16" cy="104" r="5" fill="#f472b6"/><circle cx="28" cy="110" r="4" fill="#22c55e"/><circle cx="8" cy="114" r="4" fill="#facc15"/>
      ${sparkle(m)}${think(m)}`,

    // Rayo: dragoncito amigable
    rayo: m => `
      <path d="M18 70 l-14 -20 16 4 2 -16 12 18z" fill="#86efac"/><path d="M102 70 l14 -20 -16 4 -2 -16 -12 18z" fill="#86efac"/>
      <path d="M40 22 l-4 -16 12 10z" fill="#fde047"/><path d="M80 22 l4 -16 -12 10z" fill="#fde047"/>
      <ellipse cx="60" cy="62" rx="38" ry="40" fill="#4ade80"/>
      <ellipse cx="60" cy="82" rx="24" ry="20" fill="#bbf7d0"/>
      <path d="M52 22 l8 -10 8 10z" fill="#22c55e"/>
      ${eyes(46, 74, 52, 8, m)}
      <circle cx="54" cy="70" r="2" fill="#166534"/><circle cx="66" cy="70" r="2" fill="#166534"/>
      ${mouth(60, 78, 8, m, "#14532d")}${cheeks(36, 84, 66)}
      ${m === "feliz" ? `<path d="M92 84 q10 -4 14 4 q-6 0 -6 6 q-4 -6 -8 -10z" fill="#fb923c"/>` : ""}
      ${sparkle(m)}${think(m)}`
  };

  const NAMES = { mika: "Mika", tito: "Tito", lula: "Lula", pipo: "Pipo", bimba: "Bimba", kiki: "Kiki", coco: "Coco", rayo: "Rayo" };

  window.MKChar = function (name, mood) {
    const f = C[name] || C.kiki;
    return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${NAMES[name] || name}">${f(mood || "anima")}</svg>`;
  };
  window.MKChar.names = NAMES;
})();
