# Phase 7, Schritt 2: Cookies und AGB prüfen

Ziel: Vor dem Upload ist geklärt, ob die Seite eine Cookie-Einwilligung oder AGB braucht. Wenn ja, ist beides gemeinsam mit der Person umgesetzt, als erster Entwurf. Das passiert vor dem Livegang, weil eine Seite, die eine Einwilligung oder AGB braucht, sie ab dem ersten Besucher haben muss.

Meist ist der Schritt schnell erledigt. Eine Angebotsseite, wie sie dieser Skill baut, also ohne Tracking, ohne eingebettete Inhalte von Dritten, mit selbst gehosteten Schriften und einem Formular an den eigenen Server, braucht meist weder einen Cookie-Banner noch AGB. Dann wird das Ergebnis in einem Satz in der Statusdatei festgehalten, und es geht mit Schritt 3 in [7-livegang.md](7-livegang.md) weiter.

Sag der Person zu Beginn deutlich: Das ist keine Rechtsberatung. Alles, was hier entsteht, ist ein erster Entwurf anhand offizieller Quellen. Vor dem Einsatz prüft die Person ihn selbst oder lässt ihn prüfen (Anwalt, IHK, Rechtstexte-Dienst mit Abmahnschutz).

## 1. Bestandsaufnahme

Erst selbst nachsehen, dann fragen.

1. **Die Seite messen.** Mit Playwright die lokale Seite laden (`http://localhost:8000`), ohne zu klicken, und festhalten: gesetzte Cookies, Einträge im lokalen Speicher, alle Anfragen an fremde Domains (Schriften, Skripte, Bilder, iframes).
2. **Den Code durchsuchen** nach Statistik- und Werbe-Skripten, eingebetteten Videos, Karten, Terminbuchung, Chat-Fenstern, Bezahl-Buttons.
3. **Die Person fragen**, was noch kommen soll: Statistik, Newsletter, Terminbuchung, Verkauf oder Buchung über die Seite.

## 2. Cookies und Einwilligung

Die Regel steht in § 25 TDDDG: Informationen auf dem Gerät des Besuchers speichern oder auslesen ist nur mit Einwilligung erlaubt, außer es ist für den gewünschten Dienst unbedingt nötig. Dazu kommt die DSGVO, sobald beim Laden personenbezogene Daten wie die IP-Adresse an Dritte gehen, auch ganz ohne Cookies.

| Auf der Seite | Einwilligung nötig? |
|---|---|
| selbst gehostete Schriften, eigenes CSS und JavaScript | nein |
| Formular an den eigenen Server oder Webhook | nein (gehört aber in die Datenschutzerklärung) |
| Speichern der Einwilligung selbst, Warenkorb, Login | nein, technisch nötig |
| Google Analytics, Werbe-Pixel (Meta, LinkedIn, Google Ads) | ja |
| eingebettete YouTube-Videos, Google Maps, Terminbuchung, Chat-Fenster | ja, weil beim Laden Daten an den Anbieter gehen |
| Statistik ohne Cookies (z. B. Plausible, selbst betriebenes Umami) | umstritten, im Zweifel Einwilligung oder weglassen |

**Erst vermeiden, dann einwilligen lassen.** Oft geht es ohne Banner:
- Suchbegriffe und Klicks aus Google kommen aus der Search Console (Phase 8), dafür läuft nichts auf der Seite.
- Woher Anfragen kommen, zeigt das Feld „Wie sind Sie auf uns aufmerksam geworden?“ im Formular.
- Videos und Karten als Zwei-Klick-Lösung: ein Vorschaubild mit Hinweis, der echte Inhalt lädt erst nach dem Klick.

**Wenn eine Einwilligung nötig ist,** muss sie diese Anforderungen erfüllen (Orientierungshilfe der Datenschutzkonferenz für digitale Dienste, Stand November 2024):
- Skripte, Pixel und Einbettungen laden erst nach der Zustimmung, nicht schon im Hintergrund.
- Ablehnen ist genauso einfach wie Zustimmen, keine vorausgewählten Häkchen.
- Zwecke und Empfänger stehen im Banner oder sind von dort direkt erreichbar.
- Die Einwilligung lässt sich jederzeit widerrufen, zum Beispiel über einen Link im Fußbereich.

Dafür einen fertigen Einwilligungs-Dienst nehmen statt einen eigenen Banner zu bauen. Kostenlose Möglichkeiten (Stand Oktober 2026, Bedingungen vor der Empfehlung auf der Anbieterseite prüfen):

| Dienst | kostenlos bis | Hinweis |
|---|---|---|
| [Cookiebot by Usercentrics](https://www.cookiebot.com) | eine Domain, bis 50 Unterseiten | eine Sprache, Skripte werden von Hand markiert (Attribut `data-cookieconsent`), das übernimmst du |
| Usercentrics (kostenloser Tarif) | eine Domain, 1.000 Sitzungen im Monat | bei mehr Besuchern Wechsel in einen bezahlten Tarif |

Einrichten: Konto und Domain legt die Person beim Dienst an, du baust das Skript in den Kopf der Seite ein, markierst jedes einwilligungspflichtige Skript, prüfst mit Playwright, dass vor der Zustimmung nichts davon lädt, und ergänzt die Datenschutzerklärung um den Dienst und die Kategorien.

## 3. AGB und Verkauf über die Seite

AGB sind gesetzlich nicht vorgeschrieben. Nötig werden sie, sobald über die Seite Verträge geschlossen werden: Shop, bezahlte Buchungen, Kurse, Abos, digitale Produkte. Eine reine Anfrageseite braucht keine, die Bedingungen stehen dann im Angebot.

Wird an Verbraucher verkauft, kommen Pflichten dazu, die wichtiger sind als die AGB selbst:
- Pflichtinformationen vor der Bestellung (Art. 246a EGBGB) und Preise inklusive Mehrwertsteuer (Preisangabenverordnung)
- Widerrufsbelehrung und Muster-Widerrufsformular (Anlage 1 und 2 zu Art. 246a EGBGB)
- Bestell-Button mit „zahlungspflichtig bestellen“ oder gleich eindeutig (§ 312j BGB)
- Kündigungsbutton bei Abos und Dauerverträgen (§ 312k BGB)
- Hinweis zur Verbraucherschlichtung (§ 36 VSBG), Pflicht ab mehr als zehn Beschäftigten
- Barrierefreiheit nach dem Barrierefreiheitsstärkungsgesetz (seit 28.06.2025), Kleinstunternehmen mit Dienstleistungen sind ausgenommen

Sag der Person auch: Für Verkauf reicht eine statische Seite technisch nicht, dafür braucht es einen Shop oder einen Zahlungsdienst. Das ist ein eigenes Projekt.

**AGB-Entwurf:** Auf Wunsch schreibst du einen Entwurf, der zum tatsächlichen Angebot passt, auf Grundlage der Gesetzestexte (§§ 305 bis 310 BGB zur Wirksamkeit von AGB) und der amtlichen Muster. Keine Klauseln aus fremden AGB kopieren. Den Entwurf deutlich als Entwurf kennzeichnen und empfehlen, ihn prüfen zu lassen, bei Verkauf an Verbraucher am besten über einen Rechtstexte-Dienst mit Abmahnschutz.

## Offizielle Quellen

- Gesetze im Internet (gesetze-im-internet.de): TDDDG, BGB, EGBGB, Preisangabenverordnung, VSBG, BFSG
- Datenschutzkonferenz, Orientierungshilfe für Anbieter digitaler Dienste (November 2024): https://www.bfdi.bund.de/SharedDocs/Downloads/DE/DSK/Orientierungshilfen/OH_Digitale-Dienste.pdf

## Abnahme

Zeig der Person in wenigen Sätzen: was gemessen wurde, was nötig ist und was nicht, was umgesetzt wurde und was sie noch prüfen lassen sollte. Danach weiter mit Schritt 3 in [7-livegang.md](7-livegang.md). Das Ergebnis fließt in die Datenschutzerklärung.

## Fertig, wenn

- [ ] Bestandsaufnahme gemacht (Messung der lokalen Seite und Fragen an die Person).
- [ ] Ergebnis in der Statusdatei: nichts nötig, oder was umgesetzt wurde.
- [ ] Falls nötig: Einwilligung eingebaut und geprüft, dass vorher nichts lädt, Datenschutzerklärung ergänzt.
- [ ] Falls nötig: AGB und Pflichtangaben als Entwurf, mit Hinweis zur Prüfung.
