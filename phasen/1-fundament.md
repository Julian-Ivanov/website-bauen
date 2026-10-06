# Phase 1: Fundament

Ziel: Die echte Marke ist gemessen (bei einer neuen Marke: Name und Logo-Form stehen), das Logo trägt die Markenidee, und `PRODUCT.md` beschreibt, für wen die Seite ist und was sie leisten muss.

Gibt es noch keine Marke, gleich mit Abschnitt 1b weitermachen.

## 1. Marke messen

Farben und Schriften nie aus Notizen übernehmen oder aus Screenshots schätzen. Quellen in dieser Reihenfolge:

1. **Live-Seite:** `python werkzeuge/marke_auslesen.py https://example.com` (Skript im Skill-Ordner). Es lädt die Seite, scrollt einmal ganz durch (sonst bleiben animierte Abschnitte leer) und gewichtet die berechneten Farben nach Fläche und Häufigkeit. Ergebnis: Hintergrund, Text, Akzente, Schriften mit Gewichten.
2. **Logo-Datei:** Farben aus SVG oder PNG auslesen.
3. **Markendateien der Person** (Styleguide, Präsentationen).

Danach ein kurzes Markenprofil in die Statusdatei:

| Rolle | Wert |
|---|---|
| Hauptfarbe | |
| Akzent | |
| helle Fläche | |
| Text | |
| Überschriften | Schrift, Gewicht |
| Fließtext | Schrift, Gewicht |
| Merkmale | was die Marke wiedererkennbar macht |

## 1b. Neue Marke: erst der Name

Wenn es noch keinen Namen gibt, kommt er vor allem anderen, denn Domain, Logo, Texte und die spätere Beschreibung in KI-Suchen hängen daran. Erfinde keine Marke im Alleingang: Du schlägst vor, die Person entscheidet.

1. **Fragen in einer Nachricht:** Was bietet die Person an, und für wen? Wofür soll der Name stehen? Drei Adjektive für die Marke. Eigener Name als Marke oder Kunstname? Regional oder überregional?
2. **Acht bis zwölf Vorschläge** als Tabelle: Name, Bedeutung in einem Satz, wie er klingt (auch am Telefon buchstabierbar?), ob die `.de`-Domain frei ist. Domain prüfen über die Domain-Suche des Hosters, per `whois` oder RDAP (`https://rdap.denic.de/domain/<name>.de`, „nicht gefunden“ heißt meist frei). Zusätzlich kurz suchen, ob jemand in derselben Branche schon so heißt.
3. **Markenrecht:** Die Person prüft den Favoriten selbst im Register des Deutschen Patent- und Markenamts (register.dpma.de) und beim EUIPO. Sag deutlich, dass das keine Rechtsberatung ist und eine freie Domain nichts über Markenrechte sagt.
4. **Entscheidung** mit Datum in die Statusdatei. Die Domain sichert die Person selbst, am besten gleich beim späteren Hoster.

Farben und Schriften gibt es bei einer neuen Marke noch nicht. Frag nach drei bis fünf Seiten, die der Person gefallen, egal aus welcher Branche, und notier sie für Phase 2. Dort entsteht die Palette aus den Referenzen, bis dahin bleibt das Markenprofil in der Statusdatei offen.

## 2. Logo prüfen

Frag kurz: Passt das Logo noch? Trägt es die Idee hinter dem Namen? Wenn ja, weiter. Wenn nein, oder wenn es bei einer neuen Marke noch keins gibt:

1. **Bedeutung in Worte fassen.** Was steht im Namen? (Zum Beispiel steht „Brücke“ für Verbindung, „Kompass“ für Orientierung.)
2. **Runde 1:** sechs bis neun Konzepte als SVG. Jedes auf Hell, auf Dunkel, einfarbig, als Favicon in 32 und 16 Pixeln und neben dem Schriftzug zeigen, alles auf einer HTML-Vorschauseite. Schwache Konzepte offen schwach nennen.
3. **Runde 2:** das gewählte Konzept in fünf Varianten, die Kritik der Person gezielt umsetzen.
4. **Feinschliff:** Proportionen neben dem Schriftzug prüfen, den Schriftzug mit opentype.js in Vektorpfade umwandeln (mit Unterschneidung), ein eigenes vereinfachtes Favicon bauen.

Was Logos weniger generiert aussehen lässt:
- Wellen und Bänder als Flächen, die dünn beginnen und dicker werden, statt gleich dicker Linien.
- Flächen in mehreren Tönen derselben Farbe, damit Formen geschliffen statt flach wirken.
- Favicon als Badge mit Hintergrundfläche, sonst bleibt bei 16 Pixeln nichts übrig.
- Eine Logo-Familie statt einer Datei: Logo mit Schriftzug, Zeichen allein, Favicon, jeweils farbig, negativ und einfarbig.

Bei einer neuen Marke entstehen die Runden 1 und 2 einfarbig (dunkel auf Hell, hell auf Dunkel), denn die Farben kommen erst in Phase 2. Hier geht es um die Form. Die Logo-Familie wird nach der Farbwahl in Phase 2 eingefärbt.

Ablage: `logo/final/` mit `vorschau.html`, Entwürfe in `logo/entwuerfe/`.

## 3. Produkt-Kontext festhalten

`/impeccable init` starten. Es schreibt `PRODUCT.md` und fragt nur, was es noch nicht weiß.

Die wichtigste Frage dieser Phase, unbedingt stellen: **Für wen ist die Seite, und was soll sie erreichen?** Dazu gehört, woher die Besucher kommen und was sie schon wissen.

Wer die Person schon kennt, braucht vor allem einen leichten Weg zur Anfrage. Wer sie über Google zum ersten Mal findet, braucht erst Gründe, ihr zu vertrauen. Diese Antwort verändert Texte, Belege und Aufbau.

Außerdem klären:
- Welche Belege gibt es wirklich (Ausbildung, Veröffentlichungen, Reichweite, Kunden mit Erlaubnis)? Mit Links.
- Was soll ausdrücklich nicht auf die Seite (Preise, Fallbeispiele, Kundennamen)?
- Wie wird die Zielgruppe angesprochen (Sie oder du)?

## Abnahme

Zeig der Person das Markenprofil (bei einer neuen Marke: Name und Logo-Form), das Logo (falls überarbeitet) und eine Zusammenfassung von `PRODUCT.md` in fünf Sätzen. Erst nach ihrer Bestätigung weiter.

## Fertig, wenn

- [ ] Markenprofil gemessen und in der Statusdatei, oder bei einer neuen Marke: Name gewählt, Lieblingsseiten notiert.
- [ ] Logo bestätigt oder neue Logo-Familie fertig.
- [ ] `PRODUCT.md` existiert, die Besucherfrage ist beantwortet.
- [ ] Die Person hat bestätigt.

Weiter mit [Phase 2: Recherche](2-recherche.md).
