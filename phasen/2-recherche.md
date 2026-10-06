# Phase 2: Recherche

Ziel: Drei Ergebnisse, die alle weiteren Phasen tragen. Erstens Design-Referenzen mit klarer Aussage, was übernommen wird. Zweitens eine Keyword- und GEO-Karte. Drittens eine Übersicht, wie die Wettbewerber ihre Seiten aufbauen.

## A. Design-Referenzen

Ohne Vorbilder erfindet der Agent den Durchschnitt aller Websites. Deshalb zuerst Referenzen.

1. **Lieblingsseiten der Person:** drei bis fünf Adressen erfragen, egal aus welcher Branche.
2. **Passende Design-Systeme suchen:** auf styles.refero.design fünf Systeme finden, die zur Marke und zum Angebot passen.
   - Die Galerie lädt per JavaScript, ein unsichtbarer Browser bekommt Fehler 403. Mit sichtbarem Chrome über Playwright (`headless=False`, `channel="chrome"`) funktioniert die Suche der Seite.
   - Viele Suchbegriffe durchgehen (Branche, Hauptfarbe, Stil wie „editorial“, „personal“, „studio“), nach Farbnähe zur Marke filtern, Screenshots vergleichen, dann die Design-System-Seiten der Finalisten lesen.
3. **Übersicht zeigen:** alle Kandidaten als Bild nebeneinander (eine Übersichtsgrafik oder HTML-Seite), die Person wählt ein bis zwei.
4. **Festhalten**, pro gewählter Referenz in `referenzen/notizen.md`: was übernommen wird (Typografie, Layout, Farbeinsatz, Bewegung, Bildsprache) und was ausdrücklich nicht.

Zum Beispiel: Referenz A liefert die Grundwelt (viel Weißraum, ein großes Bild), Referenz B den Einstieg mit kräftiger Farbfläche. Die 3D-Grafik von Referenz B fällt ausdrücklich weg.

5. **Nur bei einer neuen Marke: Farben und Schriften.** Aus den gewählten Referenzen zwei bis drei Paletten mit Schriftpaar ableiten und auf einer Vorschauseite zeigen (Flächen, Text, Button, Logo in den Farben, Kontrast gemessen). Die Person wählt. Danach die Logo-Familie aus Phase 1 einfärben und das Markenprofil in der Statusdatei ausfüllen.

## B. Keyword- und GEO-Recherche

GEO heißt: in den Antworten von ChatGPT, Perplexity und Googles KI-Übersicht vorkommen. Das hängt an anderen Dingen als ein Google-Ranking, deshalb wird beides gemessen.

### DataForSEO einrichten (falls gewünscht und noch nicht verbunden)

Erst prüfen, ob der DataForSEO-MCP schon verbunden ist (in Claude Code und Codex mit `/mcp`). Wenn nicht, jetzt einrichten. Kurz erklären, wofür: echte Suchvolumen aus Google, die aktuellen Google-Ergebnisse und die Antworten von ChatGPT mit Websuche. Abrechnung nach Verbrauch, ohne Abo.

1. Konto auf dataforseo.com anlegen. Neue Konten bekommen ein kleines Startguthaben (Stand Oktober 2026: ein Dollar), das reicht für die Recherche eines Projekts oft schon. Wer mehr braucht, lädt Guthaben auf, die aktuelle Mindestaufladung steht auf der Preisseite.
2. **Verbinden per Anmeldung im Browser** (empfohlen, kein API-Passwort nötig). Adresse: `https://mcp.dataforseo.com/v3/mcp`
   - Claude Code: `claude mcp add --transport http dataforseo https://mcp.dataforseo.com/v3/mcp -s user`, dann neu starten, denselben Chat wieder öffnen, `/mcp`, DataForSEO wählen, anmelden und im Browser den Zugriff bestätigen.
   - Claude Desktop: Einstellungen, Connectors, eigenen Connector hinzufügen, Adresse eintragen, verbinden und im Browser bestätigen.
   - Codex und andere Agenten: Server mit derselben Adresse eintragen und die Anmeldung des Agenten nutzen (Details in dessen MCP-Doku).
3. **Ersatzweg mit API-Passwort**, falls die Anmeldung im Browser nicht klappt. Im DataForSEO-Dashboard unter „API Access“ stehen Login (die E-Mail-Adresse) und das API-Passwort. Das API-Passwort ist ein anderes als das Konto-Passwort. Daraus den Base64-Wert von `login:api-passwort` bilden:
   - Mac/Linux: `printf 'login:api-passwort' | base64`
   - Windows PowerShell: `[Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes('login:api-passwort'))`

   Claude Code: `claude mcp add --transport http dataforseo https://mcp.dataforseo.com/v3/mcp -s user --header "Authorization: Basic <base64-wert>"`. Codex: mit `codex mcp add` oder als Eintrag unter `[mcp_servers]` in `~/.codex/config.toml`.

   Erklär der Person dabei kurz: Base64 ist keine Verschlüsselung, nur eine andere Schreibweise. Der Wert ist so geheim wie das Passwort selbst und gehört in die persönliche Konfiguration des Agenten (in Claude Code `-s user`), außerhalb des Projektordners. Die Person führt den Befehl selbst aus. Fehler 40100 heißt fast immer: altes oder falsches API-Passwort.
4. In der Statusdatei eintragen, dass DataForSEO verbunden ist.

### Mit DataForSEO (vier Abfragen, zusammen unter einem Dollar)

1. **Suchvolumen** für 30 bis 40 Begriffe, die die Zielgruppe tippen könnte: Leistung, Leistung plus Zielgruppe, Leistung plus Ort, Probleme, Fragen. Endpoint `keywords_data/google_ads/search_volume/live`, Land und Sprache passend setzen (Deutschland: `location_code 2276`, `language_code de`). Der Kurzmodus des MCP zeigt nur zehn Ergebnisse, für alle Ergebnisse den vollständigen Modus nutzen.
2. **Google-Ergebnisse** für die zwei wichtigsten Begriffe: `serp/google/organic/live/advanced`. Zeigt die Wettbewerber, die Fragen aus „Ähnliche Fragen“ und welche Quellen Googles KI-Übersicht zitiert.
3. **ChatGPT-Antworten** mit Websuche: `ai_optimization/chat_gpt/llm_responses/live`. Drei Fragen:
   - eine Frage, wie sie ein Kunde stellen würde („Wer hilft mittelständischen Firmen bei …?“),
   - eine lokale oder spezielle Frage,
   - eine direkte Frage nach der Person oder Marke („Was weißt du über …?“).
4. Vor dem Start einmal das Guthaben prüfen (`appendix/user_data`) und der Person die erwarteten Kosten nennen.

### Ohne DataForSEO

- Google-Suche im privaten Fenster für die Hauptbegriffe, Wettbewerber und „Ähnliche Fragen“ notieren.
- Google-Autovervollständigung für Begriffsvarianten.
- ChatGPT und Perplexity die drei Fragen oben selbst stellen lassen, Antworten in die Recherche kopieren.
- Volumen grob über Google Trends vergleichen. In der Karte vermerken, dass Zahlen fehlen.

### Ergebnis: `recherche/keywords-geo.md`

1. Tabelle mit Begriff, Suchvolumen, Wettbewerb, Einschätzung.
2. Wer bei Google oben steht, was die KI-Übersicht zitiert.
3. Was ChatGPT antwortet, getrennt nach allgemeinen Fragen und der Frage nach der Marke.
4. **Keyword-Karte:** jeder Stelle der Seite ein Begriff (Seitentitel, Meta-Beschreibung, H1, jeder Abschnitt, FAQ).
5. GEO-Maßnahmen (Faktensätze, gleiche Fakten auf allen Profilen, strukturierte Daten, FAQ mit echten Fragen, llms.txt).
6. Themen für spätere Unterseiten. Eine einzelne Seite kann nicht für alles ranken.

Zwei Dinge, die fast immer gelten:
- Der Hauptbegriff ist meist hart umkämpft. Realistisch sind Varianten mit Zielgruppe oder Ort.
- **Immer nach der eigenen Marke fragen.** KI-Suchmaschinen beschreiben eine Person oder Firma aus allem, was sie finden: alte Website, LinkedIn, Branchenverzeichnisse. Steht dort etwas Falsches, etwa eine falsche Mitarbeiterzahl, übernehmen sie es.

## C. Wettbewerber lesen

Fünf bis sechs Seiten: die, die bei Google oben stehen, die ChatGPT nennt, und ein Anbieter mit ähnlichem Profil wie die Person. Pro Seite festhalten:

| Seite | H1 | Unterzeile | Buttons | Vertrauenssignale | Ablauf | konkrete Zahlen | FAQ | Tonfall |
|---|---|---|---|---|---|---|---|---|

Darunter drei bis fünf Muster der starken Seiten und die Fehler der schwachen. Diese Tabelle ist die Grundlage für Phase 3.

## Abnahme

Zeig die gewählten Referenzen mit Übernahme-Notizen, die Keyword-Karte und die wichtigsten drei Erkenntnisse. Kläre dabei strategische Fragen, die die Recherche aufwirft (Beispiel: lokale Ausrichtung ja oder nein). Erst nach Bestätigung weiter.

## Fertig, wenn

- [ ] Ein bis zwei Referenzen gewählt, mit Notizen zu Übernehmen und Weglassen.
- [ ] Bei einer neuen Marke: Farben und Schriften gewählt, Logo eingefärbt, Markenprofil ausgefüllt.
- [ ] `recherche/keywords-geo.md` mit Keyword-Karte.
- [ ] Wettbewerber-Tabelle mit Mustern.
- [ ] Die Person hat bestätigt.

Weiter mit [Phase 3: Texte](3-texte.md).
