<?php
/* Formular-Empfänger ohne Fremddienst, für Webspaces mit PHP (Hostinger, IONOS, all-inkl …).

   Einsatz:
   1. Diese Datei als anfrage.php neben index.html legen (und in build.py aufnehmen).
   2. EMPFAENGER und DOMAIN unten anpassen.
   3. Im Formular: data-endpoint="/anfrage.php"
   4. Einmal selbst testen. Landet die Mail im Spam, beim Hoster eine Absender-Adresse
      der eigenen Domain anlegen und als ABSENDER eintragen (SPF und DKIM gelten dann).

   Das Skript nimmt die JSON-Daten von formular.js an, prüft sie, bremst Massen-Anfragen
   und schickt eine schlichte Text-Mail. Antworten gehen per Reply-To direkt an den Besucher. */

const EMPFAENGER = 'kontakt@DOMAIN.DE';
const ABSENDER   = 'formular@DOMAIN.DE';   // Adresse der eigenen Domain, sonst landet es eher im Spam
const DOMAIN     = 'https://DOMAIN.DE';    // genau so, wie die Seite im Browser steht
const MAX_PRO_STUNDE = 5;                  // Anfragen pro IP-Adresse

header('Content-Type: application/json; charset=utf-8');

function antwort(int $status, string $text): void {
    http_response_code($status);
    echo json_encode(['ok' => $status === 200, 'message' => $text], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') antwort(405, 'Nur POST.');

/* Nur Anfragen von der eigenen Seite annehmen */
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && rtrim($origin, '/') !== DOMAIN) antwort(403, 'Herkunft nicht erlaubt.');

/* Daten lesen: JSON (formular.js) oder klassisches Formular */
$roh = file_get_contents('php://input');
$daten = json_decode($roh, true);
if (!is_array($daten)) $daten = $_POST;

/* Honeypot: Bots füllen das unsichtbare Feld aus. So tun, als wäre alles gut. */
if (!empty($daten['website'])) antwort(200, 'Danke.');

/* Bremse: höchstens MAX_PRO_STUNDE Anfragen pro IP und Stunde */
$ip = hash('sha256', $_SERVER['REMOTE_ADDR'] ?? 'unbekannt');
$datei = sys_get_temp_dir() . '/anfrage_' . $ip;
$zeiten = is_file($datei) ? array_filter(explode(',', (string) file_get_contents($datei)), fn($t) => (int) $t > time() - 3600) : [];
if (count($zeiten) >= MAX_PRO_STUNDE) antwort(429, 'Zu viele Anfragen. Bitte später erneut versuchen.');
$zeiten[] = time();
file_put_contents($datei, implode(',', $zeiten));

/* Felder bereinigen: Zeilenumbrüche nur in der Nachricht, Länge begrenzen */
function feld(array $d, string $k, int $max = 300): string {
    $v = trim((string) ($d[$k] ?? ''));
    return mb_substr(str_replace(["\r", "\n"], ' ', $v), 0, $max);
}
$name    = feld($daten, 'name');
$email   = feld($daten, 'email');
$nachricht = mb_substr(trim((string) ($daten['message'] ?? '')), 0, 5000);

if ($name === '' || $nachricht === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    antwort(422, 'Bitte Name, gültige E-Mail-Adresse und Nachricht angeben.');
}
if (empty($daten['consent'])) antwort(422, 'Bitte der Datenschutzerklärung zustimmen.');

/* Alle übrigen Felder mitschicken, ohne technische Felder */
$zeilen = [];
foreach ($daten as $k => $v) {
    if (in_array($k, ['website', 'message', 'consent', 'submittedAt'], true) || is_array($v)) continue;
    $zeilen[] = ucfirst(preg_replace('/[^a-z0-9_-]/i', '', (string) $k)) . ': ' . feld($daten, (string) $k);
}
$text = implode("\n", $zeilen) . "\n\nNachricht:\n" . $nachricht . "\n\nEinwilligung Datenschutz: ja\nZeit: " . date('d.m.Y H:i');

$wer = feld($daten, 'company') ?: $name;
$betreff = '=?UTF-8?B?' . base64_encode('Neue Anfrage: ' . $wer) . '?=';
$kopf = [
    'From: ' . ABSENDER,
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
];

if (!mail(EMPFAENGER, $betreff, $text, implode("\r\n", $kopf), '-f' . ABSENDER)) {
    antwort(500, 'Senden fehlgeschlagen.');
}
antwort(200, 'Danke.');
