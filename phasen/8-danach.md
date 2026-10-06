# Phase 8: Danach

Ziel: Google kennt die Seite, alle Profile erzählen dieselbe Geschichte, und nach drei bis vier Wochen wird gemessen, ob es wirkt.

## Sofort nach dem Livegang

1. **Google Search Console:** Domain-Eigenschaft anlegen. Google gibt einen TXT-Eintrag vor. Den trägt die Person im DNS ein (oder der Agent über den Hosting-MCP, nach OK). Danach die Sitemap einreichen und die Startseite zur Indexierung anfragen. Die Search Console zeigt später auch, bei welchen Suchbegriffen die Seite erscheint, wie oft sie angeklickt wird und auf welcher Position sie steht. Dafür braucht die Seite kein Google Analytics und keinen Cookie-Banner.
2. **Bing Webmaster Tools:** lässt sich aus der Search Console übernehmen. Bing ist wichtig, weil ChatGPT für die Websuche unter anderem auf Bing zurückgreift.
3. **Profile abgleichen.** Die Faktensätze aus `texte.md` auf alle Profile übertragen: LinkedIn (Person und Firmenseite), YouTube-Kanalbeschreibung, Instagram, Google-Unternehmensprofil, Branchenverzeichnisse. Überall dasselbe: wer, was, für wen, wo, und der Link zur Seite. Was auf einem Profil falsch steht, übernehmen KI-Suchmaschinen.

## Nach drei bis vier Wochen

Dieselben Messungen wie in Phase 2 wiederholen und vergleichen:
- Rankings für die Begriffe der Keyword-Karte (Search Console oder DataForSEO `serp/google/organic/live/advanced`).
- Die drei ChatGPT-Fragen erneut stellen (`ai_optimization/chat_gpt/llm_responses/live`). Wird die Seite jetzt zitiert? Stimmt die Beschreibung der Marke?
- Wie viele Anfragen kamen, und woher (Feld „Wie sind Sie auf mich aufmerksam geworden?“).

Ergebnis als Abschnitt „Nachmessung“ in `recherche/keywords-geo.md`.

## Wie es weitergeht

- **Unterseiten** für die Themen aus der Recherche, die die Startseite nicht abdecken kann. Jede mit eigenem Hauptbegriff, im Stil aus `DESIGN.md`.
- **In Bestenlisten auftauchen.** KI-Suchmaschinen zitieren gern Listen wie „Die besten Anbieter für …“. Gezielt anfragen oder Gastbeiträge platzieren.
- **Inhalte, die verlinken.** Wer einen YouTube-Kanal, Podcast oder Newsletter hat: ein Beitrag zum Kernthema mit Link zur Seite stärkt beides. Google zitiert in KI-Übersichten auch Videos.
- **Design-System weiterverwenden.** Aus `DESIGN.md` lässt sich ein eigener Skill bauen, der Angebote, Präsentationen und weitere Seiten im selben Stil erstellt.

## Fertig, wenn

- [ ] Search Console bestätigt, Sitemap eingereicht.
- [ ] Profile mit denselben Fakten aktualisiert.
- [ ] Termin für die Nachmessung in drei bis vier Wochen steht.

Damit ist der Hauptprozess abgeschlossen. Statusdatei auf „Live“ setzen und zum Schluss [Phase 9](9-cookies-agb.md) durchgehen: Sie prüft, ob die Seite eine Cookie-Einwilligung oder AGB braucht.
