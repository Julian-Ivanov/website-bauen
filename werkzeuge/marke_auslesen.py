"""Misst Farben und Schriften einer Live-Seite.

Aufruf:  python marke_auslesen.py https://example.com [--chrome]

Lädt die Seite, scrollt einmal ganz durch (sonst bleiben animierte Abschnitte leer)
und wertet die berechneten Stile aller sichtbaren Elemente aus. Farben werden nach
Fläche (Hintergründe) und Textmenge (Schriftfarben) gewichtet. Ergebnis als Tabelle
und als marke.json im aktuellen Ordner, dazu ein Screenshot marke.png.

--chrome nutzt das installierte Chrome statt des Playwright-Chromiums.
"""
import json
import sys

from playwright.sync_api import sync_playwright

MESSEN = r"""
() => {
  const bg = {}, fg = {}, fonts = {}, accents = {};
  const add = (m, k, w) => { if (k) m[k] = (m[k] || 0) + w; };
  const hex = (c) => {
    const m = c.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)/);
    if (!m) return null;
    if (m[4] !== undefined && parseFloat(m[4]) < 0.5) return null;
    return "#" + [m[1], m[2], m[3]].map(v => Math.round(+v).toString(16).padStart(2, "0")).join("").toUpperCase();
  };
  for (const el of document.querySelectorAll("body *")) {
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) continue;
    const s = getComputedStyle(el);
    if (s.visibility === "hidden" || s.display === "none" || +s.opacity === 0) continue;
    const area = r.width * r.height;
    add(bg, hex(s.backgroundColor), area);
    const own = [...el.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent.trim()).join("");
    if (own.length) {
      add(fg, hex(s.color), own.length);
      const fam = s.fontFamily.split(",")[0].replace(/["']/g, "").trim();
      const role = /^H[1-3]$/.test(el.tagName) ? "Überschrift" : "Text";
      add(fonts, role + " | " + fam + " | " + s.fontWeight, own.length);
    }
    if (el.matches("a, button, [class*=btn], [class*=button]")) add(accents, hex(s.backgroundColor), 1);
  }
  /* Seitenhintergrund nur mit der sichtbaren Fläche gewichten, die nicht schon von Elementen bedeckt ist */
  const covered = Object.values(bg).reduce((a, b) => a + b, 0);
  const page = document.documentElement.scrollWidth * document.documentElement.scrollHeight;
  add(bg, hex(getComputedStyle(document.body).backgroundColor) || "#FFFFFF", Math.max(page - covered, page * 0.1));
  const top = (m, n) => Object.entries(m).sort((a, b) => b[1] - a[1]).slice(0, n);
  return { hintergrund: top(bg, 8), text: top(fg, 6), buttons: top(accents, 5), schriften: top(fonts, 8),
           titel: document.title };
}
"""


def main():
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    if len(sys.argv) < 2:
        raise SystemExit(__doc__)
    url = sys.argv[1]
    chrome = "--chrome" in sys.argv
    with sync_playwright() as p:
        browser = p.chromium.launch(channel="chrome") if chrome else p.chromium.launch()
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        page.goto(url, wait_until="networkidle", timeout=60000)
        height = page.evaluate("document.documentElement.scrollHeight")
        for y in range(0, height, 600):
            page.evaluate(f"window.scrollTo(0, {y})")
            page.wait_for_timeout(120)
        page.evaluate("window.scrollTo(0, 0)")
        page.wait_for_timeout(400)
        data = page.evaluate(MESSEN)
        page.screenshot(path="marke.png")
        browser.close()

    print(f"\n{data['titel']}\n")
    for key, label in [("hintergrund", "Flächen (nach Fläche)"), ("text", "Textfarben (nach Textmenge)"),
                       ("buttons", "Button- und Linkflächen"), ("schriften", "Schriften (Rolle | Familie | Gewicht)")]:
        print(label)
        total = sum(v for _, v in data[key]) or 1
        for k, v in data[key]:
            if k:
                print(f"  {k:<50} {100 * v / total:5.1f} %")
        print()
    with open("marke.json", "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print("Gespeichert: marke.json, marke.png")


if __name__ == "__main__":
    main()
