# Phase 5: Bauen

Ziel: Die komplette Seite läuft lokal, mit allen Texten aus `texte.md`, der gewählten Richtung und strukturierten Daten.

## Technik

Empfehlung für Angebots- und Personenseiten: **statisches HTML, CSS und etwas JavaScript, ohne Build-Schritt.** Gründe: lädt schnell, läuft auf jedem Webspace, keine Updates, keine Sicherheitslücken durch Plugins, leicht zu ändern.

Ordnerstruktur:
```
index.html
impressum.html
datenschutz.html
assets/css/site.css
assets/css/tweaks.css      leer, für das Regler-Panel in Phase 6
assets/js/main.js
assets/fonts/              Schriften selbst gehostet
assets/img/                Logo, Favicon, Fotos, Vorschaubild
```

Grundsätze:
- **Schriften selbst hosten** (woff2, zum Beispiel aus den `@fontsource-variable`-Paketen auf npm). Kein Google-Fonts-Link, das ist in Deutschland ein Datenschutzproblem und kostet Ladezeit.
- **Keine Drittanbieter-Skripte** ohne Grund. Keine Cookie-Banner nötig, wenn nichts trackt.
- **Farben, Abstände und Schriftgrößen als CSS-Variablen** auf `:root`. Werte, die die Person später selbst verschieben will (Abstände im Einstieg, Größen, Positionen), als eigene Variablen anlegen. Das braucht das Regler-Panel in Phase 6.
- **Bilder** als WebP mit JPG-Fallback, mit `width` und `height`, Fotos unterhalb des ersten Bildschirms mit `loading="lazy"`.
- **Bewegung sparsam** und mit `prefers-reduced-motion` abschaltbar.
- **Mobil zuerst denken.** Die meisten Besucher kommen über das Handy. 16 Pixel Seitenabstand, kein seitliches Scrollen.

## Reihenfolge

1. Mit impeccable bauen. Es lädt vor jeder Änderung seine Qualitätsregeln (`craft-floor.md` im Plugin) selbst.
2. Gerüst und Variablen (Farben, Schriften, Abstände).
3. Erster Bildschirm, bis er sitzt. Er entscheidet über den Eindruck.
4. Restliche Abschnitte in der Reihenfolge aus `texte.md`.
5. Formular mit Prüfung im Browser, Fehlermeldungen, Bestätigung. Vorlage: [../vorlagen/formular.js](../vorlagen/formular.js). Das Ziel (Webhook oder Formulardienst) wird in Phase 7 eingetragen, bis dahin öffnet das Formular das E-Mail-Programm.
6. Impressum und Datenschutz im Stil der Seite (Inhalte folgen in Phase 7).
7. **Strukturierte Daten** im Kopf der Seite als JSON-LD: `Person` und/oder `Organization` bzw. `ProfessionalService`, `FAQPage`, wenn es Fragen gibt. Vorlage: [../vorlagen/strukturierte-daten.json](../vorlagen/strukturierte-daten.json). Nur Fakten aus `PRODUCT.md` und `texte.md`.
8. Favicon-Satz: `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png` (180 Pixel), `favicon-512.png`.

Lokal ansehen: `python -m http.server 8000` im Projektordner, dann `http://localhost:8000`.

## Worauf es beim Bauen ankommt

- Kleine Etiketten über Überschriften („UNSERE LEISTUNGEN“) sind verboten. Sie sind eines der stärksten KI-Signale.
- Kontrast wird gemessen, nicht geschätzt. Helle Akzentfarben sind auf Weiß oft zu schwach für Text. Dann bekommt Text einen dunkleren Ton derselben Farbe.
- Ein Button, der über einer Kante sitzen soll, wird von `overflow: hidden` abgeschnitten. Lieber mit `clip-path` oder ohne Überlauf-Sperre arbeiten.
- Wenn zwei Flächen aneinanderstoßen, entsteht auf manchen Bildschirmen eine feine Linie. Ein Überlappen um zwei Pixel (`margin-bottom: -2px`) behebt das.

## Fertig, wenn

- [ ] Alle Abschnitte aus `texte.md` sind gebaut, keine Platzhalter.
- [ ] Formular prüft Eingaben und zeigt eine Bestätigung.
- [ ] Strukturierte Daten im Kopf der Seite.
- [ ] Seite läuft lokal auf Desktop und Handy-Breite.

Keine eigene Abnahme durch die Person hier. Die kommt nach der Prüfung in Phase 6, damit sie keine halbfertige Seite bewerten muss.

Weiter mit [Phase 6: Prüfen und Feinschliff](6-pruefen.md).
