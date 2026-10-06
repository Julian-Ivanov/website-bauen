/* Regler-Panel für die Feinjustierung. Nur lokal: http://localhost:8765/?tweak
   Speichern schreibt assets/css/tweaks.css über tweak/server.py.

   Anpassen:
   1. SCOPE: der Bereich, dessen CSS-Variablen verstellt werden (meist der Einstieg).
   2. MEDIA: ab welcher Breite die gespeicherten Werte gelten (das Handy behält sein Layout).
   3. CONTROLS: ein Eintrag pro Regler. v = CSS-Variable, die im CSS schon benutzt wird,
      label = Beschriftung für die Person, min/max/step, unit (Standard px),
      start = Messwert, falls die Variable noch keinen Wert hat.
   4. THEME: Farben des Panels an die Marke anpassen. */
(function () {
  "use strict";

  var SCOPE = ".hero";
  var MEDIA = "(min-width: 821px)";
  var THEME = { main: "#1F2A44", accent: "#E4572E", soft: "#F1F3F6", text: "#1A1A1A" };

  var scope = document.querySelector(SCOPE);
  if (!scope) return;

  function px(el, prop) { return el ? Math.round(parseFloat(getComputedStyle(el)[prop]) || 0) : 0; }
  function q(sel) { return scope.querySelector(sel); }

  var controls = [
    { v: "--hero-top", label: "Abstand oben", min: 0, max: 200, start: function () { return px(scope, "paddingTop"); } },
    { v: "--h1-size", label: "Größe Headline", min: 32, max: 120, start: function () { return px(q("h1"), "fontSize"); } },
    { v: "--h1-measure", label: "Breite Headline", unit: "ch", min: 8, max: 24, step: 0.5, start: function () { return 15; } },
    { v: "--h1-gap", label: "Abstand unter der Headline", min: 0, max: 200, start: function () { return px(q("h1"), "marginBottom"); } },
    { v: "--cta-y", label: "Button hoch / runter", min: -80, max: 80, start: function () { return 0; } },
    { v: "--visual-h", label: "Größe Bild", min: 120, max: 640, start: function () { var el = q("img, svg"); return el ? Math.round(el.getBoundingClientRect().height) : 300; } },
    { v: "--visual-x", label: "Bild links / rechts", min: -300, max: 300, start: function () { return 0; } },
    { v: "--lead-size", label: "Größe Einleitungstext", min: 14, max: 30, step: 0.5, start: function () { return px(q("p"), "fontSize"); } }
  ];

  /* Startwert: gespeicherter Wert der Variable, sonst die gemessene Größe.
     Ohne diesen Schritt überschreibt das Panel beim Öffnen gespeicherte Werte. */
  function saved(name) {
    var v = getComputedStyle(scope).getPropertyValue(name).trim();
    return v && !/[a-z]\(/i.test(v) ? parseFloat(v) : null;
  }
  controls.forEach(function (c) {
    var measure = c.start;
    c.start = function () { var v = saved(c.v); return v === null || isNaN(v) ? measure() : v; };
  });

  var values = {};
  controls.forEach(function (c) { values[c.v] = c.start(); });

  function unit(c) { return c.unit || "px"; }
  function applyAll() {
    controls.forEach(function (c) { scope.style.setProperty(c.v, values[c.v] + unit(c)); });
    window.dispatchEvent(new Event("resize"));
  }

  var css = document.createElement("style");
  css.textContent = [
    ".tw{position:fixed;left:16px;bottom:16px;z-index:9999;width:320px;max-height:calc(100vh - 32px);overflow:auto;background:#fff;color:" + THEME.text + ";border-radius:10px;box-shadow:0 18px 50px -12px rgba(0,0,0,.45);font:14px/1.4 system-ui,sans-serif}",
    ".tw header{display:flex;justify-content:space-between;align-items:center;padding:12px 14px;background:" + THEME.main + ";color:#fff;border-radius:10px 10px 0 0;position:sticky;top:0}",
    ".tw .bd{padding:10px 14px 14px}.tw.min .bd{display:none}.tw.right{left:auto;right:16px}",
    ".tw header button{background:transparent;border:1px solid rgba(255,255,255,.4);color:#fff;border-radius:6px;width:30px;height:28px;cursor:pointer;flex:none}",
    ".tw label{display:block;margin:10px 0 2px;font-weight:600;color:" + THEME.main + "}",
    ".tw .row{display:flex;gap:10px;align-items:center}.tw input[type=range]{flex:1;accent-color:" + THEME.accent + "}",
    ".tw output{width:62px;text-align:right;font-variant-numeric:tabular-nums}",
    ".tw .acts{display:flex;gap:8px;margin-top:14px}.tw .acts button{flex:1;height:38px;border:0;border-radius:999px;font-weight:700;cursor:pointer}",
    ".tw .save{background:" + THEME.accent + ";color:#fff}.tw .reset{background:" + THEME.soft + ";color:" + THEME.main + "}",
    ".tw .msg{margin-top:10px;font-size:13px;min-height:1em}"
  ].join("");
  document.head.appendChild(css);

  var panel = document.createElement("div");
  panel.className = "tw";
  panel.innerHTML = "<header><b>Feinjustierung</b><span><button class='side' type='button' title='Panel auf die andere Seite'>⇄</button> <button class='fold' type='button' title='Ein- und ausklappen'>▾</button></span></header><div class='bd'></div>";
  var body = panel.querySelector(".bd");
  panel.querySelector(".fold").addEventListener("click", function () { panel.classList.toggle("min"); });
  panel.querySelector(".side").addEventListener("click", function () { panel.classList.toggle("right"); });

  controls.forEach(function (c) {
    var id = "tw" + c.v.replace(/[^a-z0-9]/gi, "");
    var wrap = document.createElement("div");
    wrap.innerHTML = "<label for='" + id + "'>" + c.label + "</label><div class='row'><input id='" + id + "' type='range'><output></output></div>";
    var input = wrap.querySelector("input");
    var out = wrap.querySelector("output");
    input.min = c.min; input.max = c.max; input.step = c.step || 1; input.value = values[c.v];
    out.textContent = values[c.v] + unit(c);
    input.addEventListener("input", function () {
      values[c.v] = parseFloat(input.value);
      out.textContent = values[c.v] + unit(c);
      scope.style.setProperty(c.v, values[c.v] + unit(c));
      window.dispatchEvent(new Event("resize"));
    });
    c.input = input; c.out = out;
    body.appendChild(wrap);
  });

  var acts = document.createElement("div");
  acts.className = "acts";
  acts.innerHTML = "<button class='reset' type='button'>Zurücksetzen</button><button class='save' type='button'>Speichern</button>";
  var msg = document.createElement("p");
  msg.className = "msg";
  body.appendChild(acts);
  body.appendChild(msg);

  acts.querySelector(".reset").addEventListener("click", function () {
    controls.forEach(function (c) { scope.style.removeProperty(c.v); });
    window.dispatchEvent(new Event("resize"));
    requestAnimationFrame(function () {
      controls.forEach(function (c) {
        values[c.v] = c.start();
        c.input.value = values[c.v];
        c.out.textContent = values[c.v] + unit(c);
      });
      msg.textContent = "Auf die gespeicherten Werte zurückgesetzt.";
    });
  });

  acts.querySelector(".save").addEventListener("click", function () {
    var lines = controls.map(function (c) { return "    " + c.v + ": " + values[c.v] + unit(c) + ";"; });
    var cssText = "/* Feinjustierung aus dem Regler-Panel (?tweak), gespeichert " + new Date().toLocaleString("de-DE") + ". Gilt für " + MEDIA + ". */\n" +
      "@media " + MEDIA + " {\n  " + SCOPE + " {\n" + lines.join("\n") + "\n  }\n}\n";
    fetch("/__tweak", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ css: cssText, values: values }) })
      .then(function (r) { if (!r.ok) throw new Error(r.status); msg.textContent = "Gespeichert in assets/css/tweaks.css."; })
      .catch(function () { msg.textContent = "Speichern ging nicht. Läuft tweak/server.py?"; });
  });

  document.body.appendChild(panel);
  applyAll();
})();
