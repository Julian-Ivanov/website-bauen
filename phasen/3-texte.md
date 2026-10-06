# Phase 3: Texte

Ziel: `texte.md` enthält jeden Text der Seite, vom Seitentitel bis zur Bestätigung nach dem Absenden des Formulars. Erst danach wird gestaltet.

Warum vor dem Design: Mit echten Texten sieht man sofort, ob eine Überschrift drei Zeilen braucht, ob ein Abschnitt überhaupt nötig ist und wie viel Platz das Formular einnimmt. Mit Platzhaltern entstehen Layouts, die später nicht zum Inhalt passen.

## Vorgehen

1. **Aufbau festlegen.** Aus `PRODUCT.md` und `recherche/wettbewerber.md` die Abschnitte ableiten. Die Themen, die alle Top-Seiten behandeln, kommen vor. Jede Lücke, die die Top-Seiten offenlassen, bekommt einen Abschnitt oder eine Frage im FAQ. Typisch für eine Angebotsseite: Einstieg, Haltung oder Problem, Leistungen, Ablauf, Über mich, Fragen, Anfrage. Nur Abschnitte, die eine echte Frage des Besuchers beantworten.
2. **Textregeln ableiten.** Was haben die starken Wettbewerberseiten gemeinsam? Häufig: H1 mit Leistung und Zielgruppe, darunter ein konkreter Satz zur Zielgruppe, Buttons, die sagen, was passiert, Ablauf mit Zahlen, ein Satz mit Haltung.
3. **Abschnitt für Abschnitt schreiben**, mit der Keyword-Karte daneben. Der Hauptbegriff gehört in Seitentitel, H1 oder Einstieg und eine H2. Nicht in jeden Satz. Varianten und verwandte Begriffe aus der Analyse der Top-Seiten verteilen sich natürlich über die Abschnitte. Der Textumfang bleibt grob im Rahmen der Top-Seiten. Formulierungen der Wettbewerber werden nie übernommen.
4. **Faktensätze sammeln.** Gesondert am Ende von `texte.md`: ein Satz pro Fakt, ohne Werbesprache, so dass eine KI ihn zitieren kann. Beispiel: „X ist KI-Berater und Inhaber von Y. Er berät mittelständische Unternehmen bei der Einführung von KI und verantwortet die Umsetzung.“ Daraus entstehen später strukturierte Daten und `llms.txt`.
5. **Meta-Texte:** Seitentitel (bis etwa 60 Zeichen, Hauptbegriff vorn), Meta-Beschreibung (bis etwa 155 Zeichen, mit dem nächsten Schritt), Text für das Vorschaubild.
6. **Formular-Texte:** Feldnamen, Hinweise unter Feldern, Fehlermeldungen, Bestätigung nach dem Absenden. Keine Zusagen, die die Person nicht gemacht hat (siehe unten).
7. **Prüfen** gegen [../schreibregeln.md](../schreibregeln.md), jeden Text einzeln, auch Meta- und Formular-Texte.
8. **Offene Fragen sammeln** und am Ende stellen. Nichts erfinden, keine Platzhalter-Fakten.

## Formular als Vorauswahl

Wenn die Person nicht jeden Kunden annimmt, ist das Formular eher eine Bewerbung als ein Kontaktformular. Dann Pflichtfelder für das, was zur Einschätzung nötig ist (zum Beispiel Unternehmensgröße, Budgetrahmen, Beschreibung des Vorhabens), und eine Frage, woher der Besucher kommt (inklusive „ChatGPT oder andere KI“, damit GEO messbar wird).

Vorsicht beim Ton: Formulierungen über hohe Nachfrage oder lange Wartezeiten klingen schnell arrogant. Am besten lässt man die Person diese Sätze selbst formulieren und übernimmt sie wörtlich.

## Keine erfundenen Zusagen

Sätze wie „Ich melde mich innerhalb von zwei Werktagen mit Terminvorschlägen“, „Antwort innerhalb von 24 Stunden“, „kostenlos und unverbindlich“ oder „Das Erstgespräch dauert 30 Minuten“ stehen auf fast jeder Kontaktseite. Deshalb schreibt ein Agent sie von selbst, ohne dass die Person das je gesagt hat. Das sind Versprechen im Namen der Person und fallen unter „Nichts erfinden“.

- Zusagen zu Antwortzeit, Ablauf, Dauer, Kosten oder Terminen nur, wenn die Person genau das vorgegeben hat.
- Ohne Vorgabe sagt der Text nur, was sicher stimmt, zum Beispiel: „Danke, deine Anfrage ist angekommen.“
- Will die Person etwas dazu sagen, als offene Frage stellen und ihre Antwort wörtlich übernehmen.

## Ergebnis-Datei

`texte.md` mit dieser Gliederung:
1. Meta (Titel, Beschreibung, Vorschaubild-Text)
2. ein Abschnitt pro Seitenabschnitt, mit Überschrift, Text, Button-Beschriftungen
3. Formular (Felder, Hinweise, Fehler, Bestätigung)
4. Faktensätze
5. Offene Fragen

`texte.md` bleibt die Quelle. Spätere Textänderungen werden dort und in der Seite gleichzeitig gemacht.

## Abnahme

Die Person liest `texte.md` und gibt Änderungen. Rechne mit zwei bis drei Runden. Wörtliche Vorgaben der Person werden wörtlich übernommen, nur Rechtschreibung und Schreibregeln dürfen angepasst werden.

## Fertig, wenn

- [ ] `texte.md` vollständig, keine Platzhalter.
- [ ] Keyword-Karte umgesetzt (Titel, H1, H2, FAQ).
- [ ] Themen der Top-Seiten abgedeckt, die Lücken beantwortet.
- [ ] Keine Zusagen zu Antwortzeit, Ablauf oder Kosten, die die Person nicht gemacht hat.
- [ ] Faktensätze gesammelt.
- [ ] Schreibregeln geprüft.
- [ ] Die Person hat bestätigt.

Weiter mit [Phase 4: Design-Richtung](4-design-richtung.md).
