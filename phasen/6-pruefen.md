# Phase 6: Prüfen und Feinschliff

Ziel: Die Seite ist von einem unabhängigen Prüfer abgenommen, die Person hat die letzten Abstände selbst eingestellt, und das Design-System ist festgehalten.

## 1. Ein gebündelter Prüfdurchgang

`python werkzeuge/pruefen.py http://localhost:8000` (Skript im Skill-Ordner). Es macht in einem Lauf:
- Screenshots Desktop (1440 Pixel) und Handy (390 Pixel), jeweils erster Bildschirm und ganze Seite,
- Konsolenfehler und fehlgeschlagene Dateien,
- Prüfung auf seitliches Scrollen,
- Liste aller Bilder ohne Alternativtext und aller Überschriften in Reihenfolge.

Alle Screenshots ansehen, alle Fehler sammeln, **in einem Durchgang beheben**, dann ein zweiter Lauf zur Kontrolle. Nicht nach jedem kleinen Fix neu fotografieren.

## 2. Automatische Prüfung

`impeccable detect` einmal laufen lassen. Echte Fehler beheben. Treffer, die eine bewusste Entscheidung der Richtung sind (zum Beispiel eine bestimmte Schrift), begründen und für genau diese Datei freigeben, nicht global abschalten.

## 3. Unabhängige Abnahme

In Claude Code den Agenten `impeccable-finish-reviewer` starten. Er prüft gegen den Richtungsvertrag, ohne den Gesprächsverlauf zu kennen, und gibt ein Urteil: ship, fix, rebuild oder recapture. Bei „fix“ alle Punkte in einem Durchgang umsetzen, neu fotografieren und demselben Prüfer zur Abnahme geben.

In anderen Agenten, zum Beispiel Codex, einen frischen Subagenten starten, oder, wenn der Agent keine Subagenten kennt, eine neue Sitzung ohne Vorgeschichte. Er bekommt nur `PRODUCT.md`, den Richtungsvertrag und die Screenshots, mit dem Auftrag, eine geordnete Liste der wesentlichen Mängel zu liefern.

Warum das wichtig ist: Wer die Seite gebaut hat, sieht die eigenen Gewohnheiten nicht mehr. Ein frischer Prüfer findet zum Beispiel, dass die Leistungen doch wieder drei gleiche Spalten geworden sind, dass die Akzentfarbe in jeder Überschrift steht oder dass die Belege erst unter dem ersten Bildschirm kommen.

## 4. Abnahme durch die Person

Jetzt erst die Seite zeigen: lokale Adresse plus Screenshots Desktop und Handy. Änderungswünsche sammeln und gebündelt umsetzen. Bei Textänderungen `texte.md` mitziehen.

## 5. Feinjustierung mit dem Regler-Panel

Abstände und Positionen per Chat zu beschreiben („die Welle etwas weiter runter“) kostet viele Runden. Besser: Die Person schiebt sie selbst.

1. Die verstellbaren Werte sind seit Phase 5 CSS-Variablen.
2. Panel aus [../vorlagen/tweak/](../vorlagen/tweak/) in den Projektordner `tweak/` kopieren. In `tweak.js` oben den Bereich (`SCOPE`) und die Liste der Regler an die Seite anpassen.
3. In `main.js` einbinden, so dass es nur mit `?tweak` in der Adresse lädt:
   ```js
   if (/[?&]tweak\b/.test(location.search)) {
     var t = document.createElement("script"); t.src = "tweak/tweak.js"; document.head.appendChild(t);
   }
   ```
4. Start: `python tweak/server.py`, dann `http://localhost:8765/?tweak` öffnen und der Person die Adresse geben.
5. „Speichern“ schreibt die Werte in `assets/css/tweaks.css`. Danach die Werte fest in `site.css` übernehmen und `tweaks.css` leeren.
6. Der Ordner `tweak/` wird nie hochgeladen.

## 6. Design-System festhalten

Nach der Abnahme:
- Herkunft jeder ausgelieferten Bilddatei eintragen (`impeccable embed-prompt`), ungenutzte Dateien ins Archiv, dann den Agenten `impeccable-documenter` starten. Er schreibt `DESIGN.md` aus der fertigen Seite, nicht aus Absichten.

`DESIGN.md` ist später die Grundlage für Unterseiten, Präsentationen und Angebote im selben Stil.

## Fertig, wenn

- [ ] Prüfdurchgang ohne Fehler (Konsole, seitliches Scrollen, Bilder).
- [ ] Unabhängige Abnahme mit Urteil „ship“.
- [ ] Die Person hat die Seite abgenommen.
- [ ] Panel-Werte fest übernommen.
- [ ] `DESIGN.md` existiert.

Weiter mit [Phase 7: Livegang](7-livegang.md).
