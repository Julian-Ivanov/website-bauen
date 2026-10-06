"""Gebündelter Prüfdurchgang für eine Seite, lokal oder live.

Aufruf:  python pruefen.py http://localhost:8000 [--chrome] [--out pruefung]

Ein Lauf macht:
- Screenshots Desktop (1440) und Handy (390), jeweils erster Bildschirm und ganze Seite
- Konsolenfehler und fehlgeschlagene Dateien
- Prüfung auf seitliches Scrollen
- Bilder ohne Alternativtext, Überschriften in Reihenfolge, Seitentitel und Beschreibung

Alle Ergebnisse landen im Ordner --out (Standard: pruefung/). Erst alles ansehen,
dann alle Fehler in einem Durchgang beheben, dann ein zweiter Lauf.
"""
import os
import sys

from playwright.sync_api import sync_playwright

GERAETE = [
    ("desktop", {"width": 1440, "height": 900}, False),
    ("handy", {"width": 390, "height": 844}, True),
]

INFOS = r"""
() => ({
  titel: document.title,
  beschreibung: (document.querySelector('meta[name="description"]') || {}).content || "",
  seitlich: document.documentElement.scrollWidth > window.innerWidth + 1,
  breite: document.documentElement.scrollWidth,
  ohneAlt: [...document.images].filter(i => !i.hasAttribute("alt")).map(i => i.currentSrc || i.src),
  ueberschriften: [...document.querySelectorAll("h1, h2, h3")].map(h => h.tagName + "  " + h.textContent.trim().replace(/\s+/g, " ").slice(0, 90)),
  jsonld: document.querySelectorAll('script[type="application/ld+json"]').length
})
"""


def arg(name, default):
    return sys.argv[sys.argv.index(name) + 1] if name in sys.argv else default


def main():
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    if len(sys.argv) < 2 or sys.argv[1].startswith("--"):
        raise SystemExit(__doc__)
    url = sys.argv[1]
    out = arg("--out", "pruefung")
    os.makedirs(out, exist_ok=True)
    probleme = []

    with sync_playwright() as p:
        browser = p.chromium.launch(channel="chrome") if "--chrome" in sys.argv else p.chromium.launch()
        for name, viewport, mobile in GERAETE:
            ctx = browser.new_context(viewport=viewport, is_mobile=mobile, has_touch=mobile,
                                      device_scale_factor=2 if mobile else 1)
            page = ctx.new_page()
            konsole, fehlgeschlagen = [], []
            page.on("console", lambda m: konsole.append(m.text) if m.type == "error" else None)
            page.on("pageerror", lambda e: konsole.append(str(e)))
            page.on("requestfailed", lambda r: fehlgeschlagen.append(r.url))
            page.on("response", lambda r: fehlgeschlagen.append(f"{r.status} {r.url}") if r.status >= 400 else None)

            page.goto(url, wait_until="networkidle", timeout=60000)
            page.wait_for_timeout(600)
            page.screenshot(path=f"{out}/{name}-oben.png")
            height = page.evaluate("document.documentElement.scrollHeight")
            for y in range(0, height, 500):
                page.evaluate(f"window.scrollTo(0, {y})")
                page.wait_for_timeout(100)
            page.wait_for_timeout(800)
            page.evaluate("window.scrollTo(0, 0)")
            page.wait_for_timeout(300)
            page.screenshot(path=f"{out}/{name}-ganz.png", full_page=True)
            info = page.evaluate(INFOS)
            ctx.close()

            print(f"\n== {name} ({viewport['width']} px) ==")
            if name == "desktop":
                print(f"Titel ({len(info['titel'])} Zeichen): {info['titel']}")
                print(f"Beschreibung ({len(info['beschreibung'])} Zeichen): {info['beschreibung']}")
                print(f"Strukturierte Daten: {info['jsonld']} Block(e)")
                print("Überschriften:")
                for h in info["ueberschriften"]:
                    print("  " + h)
                if not info["beschreibung"]:
                    probleme.append("Meta-Beschreibung fehlt")
                if sum(h.startswith("H1") for h in info["ueberschriften"]) != 1:
                    probleme.append("Nicht genau eine H1")
            if info["seitlich"]:
                probleme.append(f"{name}: seitliches Scrollen (Seite ist {info['breite']} px breit)")
            for src in info["ohneAlt"]:
                probleme.append(f"{name}: Bild ohne alt: {src}")
            for k in konsole:
                probleme.append(f"{name}: Konsole: {k}")
            for f in sorted(set(fehlgeschlagen)):
                probleme.append(f"{name}: Datei fehlgeschlagen: {f}")
        browser.close()

    print(f"\nScreenshots in {out}/")
    unique = list(dict.fromkeys(probleme))
    if unique:
        print(f"\n{len(unique)} Problem(e):")
        for pr in unique:
            print("  - " + pr)
    else:
        print("\nKeine automatischen Probleme gefunden. Screenshots trotzdem ansehen.")


if __name__ == "__main__":
    main()
