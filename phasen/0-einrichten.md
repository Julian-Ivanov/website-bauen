# Phase 0: Einrichten

Ziel: Die Grundwerkzeuge laufen, es gibt einen Projektordner und eine Statusdatei. Dauer: 5 bis 15 Minuten.

Hier wird nur eingerichtet, was kein Konto und kein Geld braucht. DataForSEO kommt am Anfang von Phase 2, der Hosting-MCP in Phase 7, jeweils direkt bevor sie gebraucht werden. So steht am Anfang keine lange Einrichtung, und die Person versteht an der Stelle, wofür sie das Konto anlegt.

## 1. Ausgangslage klären

Vier Fragen in einer Nachricht, jeweils mit Empfehlung:

1. **Gibt es schon eine Website oder eine Marke?** Wenn ja, die Adresse und vorhandene Markendateien (Logo, Styleguide). Sie sind die wichtigste Quelle für die Marke und zeigen, was besser werden soll. Wenn nein, führt Phase 1 durch Name und Logo.
2. **Wofür ist die Seite da?** Anfragen bekommen, etwas verkaufen, informieren, Bewerbungen sammeln. Eine Seite hat ein Hauptziel.
3. **Wo soll sie laufen?** Eigener Webspace (z. B. Hostinger, IONOS, all-inkl), Netlify oder Vercel, oder noch offen. Empfehlung für Einsteiger: statische Seite auf einem gewöhnlichen Webspace, ohne Baukasten und ohne WordPress. Schnell, sicher, keine Updates.
4. **Soll die Recherche mit echten Suchdaten laufen?** Empfehlung: ja, mit DataForSEO. Die Recherche für ein Projekt kostet damit etwa einen Dollar Guthaben. Ohne geht es auch, die Recherche wird dann ungenauer. Eingerichtet wird es erst in Phase 2.

   Den Link direkt in der Frage anzeigen, damit die Person ihn anklicken kann: https://l.dataforseo.com/4yfnJzk. Wer sich darüber anmeldet, bekommt 5 Dollar Startguthaben statt dem üblichen einen Dollar. Das reicht für mehrere Projekte, ohne selbst Geld aufzuladen. Offen dazusagen, dass es ein Affiliate-Link von Julian Ivanov ist, dem Autor dieses Skills. Für die Person kostet er nichts extra. Wer den Link nicht nutzen will, meldet sich direkt auf dataforseo.com an.

   So kann die Frage etwa lauten: „Ich empfehle dir DataForSEO für die Recherche. Über Julians Link bekommst du 5 Dollar Startguthaben, damit kannst du direkt loslegen und musst nichts aufladen: https://l.dataforseo.com/4yfnJzk. Das ist ein Affiliate-Link, für dich entstehen keine Kosten. Möchtest du das nutzen?“

## 2. Projektordner und Statusdatei anlegen

```
projekt/
  WEBSITE-STATUS.md     Stand der Phasen (aus vorlagen/)
  referenzen/           Screenshots und Notizen zu Vorbildern
  recherche/            Keyword- und GEO-Karte
  archiv/               alte Entwürfe, nie löschen
```
Die übrigen Ordner (`logo/`, `assets/`, `deploy/`, `tweak/`) entstehen in den späteren Phasen.

Statusdatei aus [../vorlagen/WEBSITE-STATUS.md](../vorlagen/WEBSITE-STATUS.md) anlegen und die Antworten aus Schritt 1 eintragen. Phase 0 auf 🔄 setzen.

Das passiert vor den Installationen, weil der Agent danach eventuell neu gestartet werden muss.

## 3. Grundwerkzeuge prüfen und einrichten

Erst prüfen, was schon da ist, dann nur das Fehlende einrichten. Zuerst feststellen, in welchem Agenten der Skill läuft (Claude Code, Codex oder ein anderer), und die Befehle für diesen Agenten nehmen.

**impeccable** (Pflicht: Design-Regeln, Richtungen, Prüfungen). Funktioniert mit Claude Code, Codex, Cursor, Gemini CLI und weiteren Agenten:
```
npx impeccable install
```
Das Programm erkennt die installierten Agenten und fragt, ob es ins Projekt oder global installieren soll. In Claude Code geht alternativ `claude plugin marketplace add pbakaus/impeccable` und `claude plugin install impeccable@impeccable`.
Beim ersten Aufruf lädt impeccable ein eigenes Programm herunter. Wenn das blockiert ist, funktionieren Kontext und Anleitungen trotzdem, nur die automatischen Prüfungen fehlen.

**Python und Playwright** (Screenshots, Messungen):
```
pip install playwright
python -m playwright install chromium
```
Unter Windows funktioniert auch das installierte Chrome (`channel="chrome"`), dann ist der zweite Befehl nicht nötig.

## 4. Neu starten, falls nötig

Wurde etwas neu installiert, muss der Agent einmal neu starten, damit er es sieht.

1. In der Statusdatei eintragen, was eingerichtet wurde und ob Playwright bewusst weggelassen wird.
2. Der Person sagen: Agent neu starten und denselben Chat wieder öffnen (Claude Code im Terminal: `claude --continue`, in der Desktop-App den Chat wieder anklicken), dann einfach weiterschreiben.
3. Nach dem Neustart prüfen, ob alles verfügbar ist, Ergebnis in die Statusdatei, Phase 0 auf ✅.

Gut zu wissen für die Person, einmal erwähnen: Wer später in einem neuen Chat weitermacht, nach längerer Pause oder nach `/compact`, tippt `/website-bauen weiter` (Codex: `$website-bauen weiter`). Der Skill liest dann zuerst die Statusdatei und weiß, wo es weitergeht.

## Fertig, wenn

- [ ] Die vier Fragen sind beantwortet und in der Statusdatei.
- [ ] impeccable läuft. Playwright läuft oder ist bewusst weggelassen und in der Statusdatei vermerkt.
- [ ] Projektordner und Statusdatei existieren.

Weiter mit [Phase 1: Fundament](1-fundament.md).
