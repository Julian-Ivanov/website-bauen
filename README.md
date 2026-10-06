# website-bauen

Ein Skill für KI-Agenten wie Claude Code oder Codex, der dich Schritt für Schritt durch den kompletten Bau einer Website führt: Name und Logo, Recherche mit echten Suchdaten, Texte, Design-Richtung, Bau, Prüfung, Livegang und Nachmessen bei Google und ChatGPT. Funktioniert auch, wenn du noch keinen Namen und kein Logo hast.

## Installieren

Kopiere den Link zu dieser Seite und gib ihn deinem Agenten. Du entscheidest, ob der Skill nur in einem Projekt oder in allen Projekten verfügbar sein soll.

Nur für das aktuelle Projekt:

```
Installiere den Skill von https://github.com/Julian-Ivanov/website-bauen in diesem Projekt.
```

Für alle Projekte:

```
Installiere den Skill von https://github.com/Julian-Ivanov/website-bauen global, damit er in jedem Projekt verfügbar ist.
```

Der Agent legt den Skill in seinen Skill-Ordner. Falls er danach nicht gleich auftaucht, starte den Agenten einmal neu.

## Starten

In Claude Code tippst du in einem leeren Projektordner:

```
/website-bauen start
```

In anderen Agenten schreibst du einfach: „Starte den Skill website-bauen.“

## Was du brauchst

- einen KI-Agenten wie Claude Code oder Codex
- impeccable, ein kostenloses Design-Plugin. Der Skill richtet es am Anfang mit dir ein.
- Für die Recherche ein Konto bei DataForSEO, für den Livegang ein Webhosting. Beides richtet der Skill erst in der Phase ein, in der es gebraucht wird.

## Weitermachen und aktualisieren

Der Skill speichert den Stand in der Datei `WEBSITE-STATUS.md` in deinem Projekt. Wenn du ein paar Tage später weitermachst, öffne einen neuen Chat im Projektordner und sag „Mach mit dem Skill website-bauen weiter“, in Claude Code geht auch `/website-bauen weiter`.

Eine neue Version holst du dir, indem du deinem Agenten schreibst: „Aktualisiere den Skill website-bauen von GitHub.“
