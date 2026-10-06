# Phase 7: Livegang

Ziel: Die Seite ist online, auffindbar für Google und KI-Suchmaschinen, rechtlich sauber, und das Formular kommt an.

## 1. SEO- und GEO-Technik

| Datei oder Stelle | Inhalt | Vorlage |
|---|---|---|
| `<title>`, `<meta name="description">` | aus `texte.md`, Hauptbegriff vorn | |
| `<link rel="canonical">` | die eine richtige Adresse der Seite | |
| Open-Graph- und Twitter-Tags | Titel, Beschreibung, Vorschaubild | |
| Vorschaubild | 1200 × 630 Pixel, im Stil der Seite, für LinkedIn, WhatsApp und Co. | [../vorlagen/og-bild.html](../vorlagen/og-bild.html) |
| strukturierte Daten | seit Phase 5 im Kopf der Seite, jetzt mit echter Domain prüfen | |
| `robots.txt` | alle Suchmaschinen und KI-Crawler ausdrücklich erlaubt, Verweis auf die Sitemap | [../vorlagen/robots.txt](../vorlagen/robots.txt) |
| `llms.txt` | Kurzprofil in Faktensätzen, das KI-Assistenten direkt lesen | [../vorlagen/llms.txt](../vorlagen/llms.txt) |
| `sitemap.xml` | alle Seiten | [../vorlagen/sitemap.xml](../vorlagen/sitemap.xml) |

Das Vorschaubild entsteht so: Vorlage in den Ordner `tweak/` kopieren, Texte anpassen, mit Playwright bei 1200 × 630 als PNG fotografieren, nach `assets/img/og-image.png` legen.

**Lighthouse** (Handy) laufen lassen: `npx lighthouse@12 http://localhost:8000 --form-factor=mobile --output=html --output-path=lighthouse.html`. Ziel: in allen vier Bereichen über 90.

## 2. Cookies und AGB prüfen

Vor den Rechtstexten und vor dem Upload klären, ob die Seite eine Cookie-Einwilligung oder AGB braucht. Braucht sie eine, dann ab dem ersten Besucher, nicht erst nach dem Livegang. Ablauf, Rechtsgrundlagen und Umsetzung stehen in [7-cookies-agb.md](7-cookies-agb.md).

Kurz: lokale Seite messen, Code durchsuchen, die Person fragen, was noch dazukommen soll. Ohne Tracking, ohne eingebettete Inhalte von Dritten und ohne Verkauf ist nichts nötig, dann reicht ein Satz in der Statusdatei. Das Ergebnis fließt in die Datenschutzerklärung.

## 3. Rechtstexte (Deutschland)

Impressum und Datenschutzerklärung sind Pflicht. Wichtig ist, dass sie zur echten Seite passen:
- Generator nutzen (zum Beispiel e-recht24 oder Datenschutz-Generator.de) und genau die Dienste angeben, die die Seite wirklich nutzt.
- Dienste entfernen, die nicht mehr genutzt werden (alte Einbettungen, Analyse-Tools, Terminbuchung, Chatbots).
- Den Formularversand beschreiben (wohin gehen die Daten, zum Beispiel an n8n auf eigenem Server).
- Lokale Schriften und fehlende Cookies kurz erwähnen.
- Der Link zur EU-Streitschlichtungsplattform ist seit deren Abschaltung (Juli 2025) überholt.

Sag der Person deutlich: Das ersetzt keine Rechtsberatung. Bei Änderungen an der Seite die Texte neu erzeugen.

## 4. Formular anschließen

Das Formular-Skript [../vorlagen/formular.js](../vorlagen/formular.js) schickt die Anfrage als JSON an die Adresse in `data-endpoint`. Wohin, entscheidet die Person. Mit Empfehlung fragen:

| Weg | Gut für | Kosten | Aufwand |
|---|---|---|---|
| **Eigenes PHP-Skript** [../vorlagen/anfrage.php](../vorlagen/anfrage.php) | normaler Webspace mit PHP (Hostinger, IONOS, all-inkl). Kein Fremddienst, Daten bleiben beim eigenen Hoster. | keine | gering |
| **Formulardienst** (Formspree, Web3Forms) | Netlify, Vercel, GitHub Pages oder Webspace ohne PHP | kostenlos bis zu einer Monatsgrenze | sehr gering |
| **Netlify Forms** | Seiten, die auf Netlify liegen | kostenlos bis zu einer Monatsgrenze | sehr gering |
| **Webhook in n8n, Make oder Zapier** | Anfragen weiterverarbeiten: Mail, CRM, Tabelle, Slack | je nach Dienst | mittel |
| **Nur `mailto:`** (`data-endpoint` leer lassen) | Übergangslösung | keine | keiner |

Empfehlung für Einsteiger mit Webspace: das PHP-Skript. Wer schon n8n oder Make nutzt: Webhook.

### Eigenes PHP-Skript

1. `vorlagen/anfrage.php` ins Projekt kopieren, `EMPFAENGER`, `ABSENDER` und `DOMAIN` eintragen, Datei in `deploy/build.py` aufnehmen.
2. Im Formular `data-endpoint="/anfrage.php"`.
3. Als Absender eine Adresse der eigenen Domain beim Hoster anlegen. Sonst landen die Mails oft im Spam.
4. Das Skript prüft Herkunft, Pflichtfelder und E-Mail-Adresse, wertet das unsichtbare Honeypot-Feld aus und lässt pro IP höchstens fünf Anfragen pro Stunde durch.
5. Lokal läuft PHP meist nicht. Getestet wird nach dem Upload, mit einer Testanfrage der Person.

### Formulardienst

- **Formspree:** Formular auf formspree.io anlegen, die Adresse `https://formspree.io/f/<id>` in `data-endpoint`.
- **Web3Forms:** Zugangsschlüssel auf web3forms.com per E-Mail anfordern. `data-endpoint="https://api.web3forms.com/submit"` und im Formular `<input type="hidden" name="access_key" value="<schlüssel>">`. Der Schlüssel darf öffentlich im HTML stehen, er erlaubt nur das Senden an die hinterlegte Adresse.
- **Netlify Forms:** `data-netlify="true"` und `name` am `<form>`, Versand dann klassisch ohne `formular.js` oder per `fetch` an `/` mit `application/x-www-form-urlencoded` (siehe Netlify-Doku).
- Den Dienst in der Datenschutzerklärung nennen. Bei Diensten außerhalb der EU auf Auftragsverarbeitung und Datenübermittlung achten.

### Webhook (Beispiel n8n)

- Webhook-Knoten mit Methode POST anlegen. Unter Optionen „Allowed Origins (CORS)“ die eigene Domain eintragen, genau so, wie sie im Browser steht (mit `https://`, ohne Schrägstrich am Ende).
- Adresse des Produktiv-Webhooks in `data-endpoint` des Formulars eintragen.
- Vor dem Livegang die CORS-Freigabe prüfen, ohne Daten zu senden: `curl -i -X OPTIONS <webhook> -H "Origin: https://domain.de" -H "Access-Control-Request-Method: POST"`. Die Antwort muss `Access-Control-Allow-Origin` mit der Domain enthalten.
- Benachrichtigungs-Mail: Vorlage [../vorlagen/anfrage-email.html](../vorlagen/anfrage-email.html) in den Mail-Knoten (HTML) kopieren, Farben anpassen.

Bei allen Wegen gilt: Eine echte Testanfrage sendet die Person selbst oder gibt ausdrücklich das OK dafür.

## 5. Upload vorbereiten

- **Build-Skript** [../vorlagen/build.py](../vorlagen/build.py) nach `deploy/build.py` kopieren und die Dateiliste anpassen. Es kopiert genau die Dateien, die live gehen, nach `dist/` und packt `dist.zip`. So landen nie Arbeitsdateien (Recherche, Panel, Entwürfe) auf dem Server.
- **`.htaccess`** für Apache- und LiteSpeed-Server (Hostinger, IONOS, all-inkl): [../vorlagen/.htaccess](../vorlagen/.htaccess). Erzwingt HTTPS, leitet `www` auf die Adresse ohne `www` um (sonst passt die CORS-Freigabe des Formulars nicht), sperrt lokale Ordner, setzt Caching. Bei Netlify oder Vercel stattdessen deren Konfigurationsdatei.

## 6. Online stellen

**Erst nach ausdrücklichem OK der Person.**

### Mit Hostinger-MCP

Falls der Hosting-MCP noch nicht verbunden ist (prüfen mit `/mcp`), jetzt einrichten. API-Token im Hostinger-Panel unter Konto, API erzeugen. Die Person trägt den Token selbst im Terminal ein, nicht im Chat:
- Claude Code: `claude mcp add hostinger -s user -e APITOKEN=<token> -- npx -y hostinger-api-mcp`, unter Windows `-- cmd /c npx -y hostinger-api-mcp`. Global (`-s user`) eintragen: Ein nur für ein Projekt eingetragener MCP wird unter Windows manchmal nicht geladen, weil VS Code den Pfad mit kleinem Laufwerksbuchstaben öffnet.
- Codex: `codex mcp add hostinger --env APITOKEN=<token> -- npx -y hostinger-api-mcp`
- Danach den Agenten neu starten, denselben Chat wieder öffnen und weitermachen.

1. Liegt die Domain in einem anderen Hostinger-Konto als das Hosting, die Domain zuerst ins Hauptkonto verschieben. Sonst verlangt Hostinger einen TXT-Eigentumsnachweis.
2. Website anlegen: `hosting_websites_create` (Domain, Hosting-Bestellung). Dann `hosting_websites_list-setups` abfragen, bis der Status „completed“ ist. Das dauert einige Minuten. Den Schreibbefehl nicht wiederholen.
3. `python deploy/build.py`, das Zip mit Zeitstempel kopieren (`site_JJJJMMTT_HHMMSS.zip`), dann `hosting_deploy-static-website` mit Domain und absolutem Pfad zum Zip.
4. DNS prüfen (`dns_records_list`). Bei Hostinger-Domains zeigen `@` (ALIAS) und `www` (CNAME) auf das Hostinger-CDN, dann ist nichts zu ändern. Mail-Einträge (MX) und Subdomains nicht anfassen.
5. **Cache leeren:** `hosting_cache_clear-website`. Sonst liefert das CDN noch die alte Seite aus.

### Ohne MCP

`dist.zip` im Dateimanager des Hosters in den Web-Ordner (meist `public_html`) hochladen und entpacken. Domain im Hoster-Panel mit dem Webspace verbinden, SSL-Zertifikat aktivieren.

## 7. Live prüfen

- HTTPS funktioniert, `http://` und `www.` leiten auf die richtige Adresse um.
- Alle Dateien liefern Status 200 (`curl -I` auf Seite, CSS, JS, Schriften, Bilder, robots.txt, llms.txt, sitemap.xml).
- Gesperrte Ordner (`/tweak/` usw.) liefern 404.
- `python werkzeuge/pruefen.py https://domain.de` für Screenshots und Konsole.
- Cookies und Anfragen an fremde Domains auf der Live-Seite einmal nachmessen. Das Ergebnis muss zu Schritt 2 passen.
- Strukturierte Daten mit dem Google Rich Results Test prüfen.
- Vorschaubild mit dem LinkedIn Post Inspector prüfen.

Für spätere Änderungen in der Statusdatei festhalten: Build, Upload, Cache leeren, prüfen.

## Fertig, wenn

- [ ] SEO-Dateien, Vorschaubild, Lighthouse über 90.
- [ ] Cookies und AGB geprüft, Ergebnis in der Statusdatei, falls nötig vor dem Upload umgesetzt.
- [ ] Impressum und Datenschutz passen zur echten Seite.
- [ ] Formular-Ziel eingetragen und mit einer Testanfrage der Person geprüft.
- [ ] Seite online, Live-Prüfung bestanden.
- [ ] Ablauf für spätere Updates in der Statusdatei.

Weiter mit [Phase 8: Danach](8-danach.md).
