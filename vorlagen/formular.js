/* Anfrageformular: Prüfung im Browser, Versand als JSON an einen Webhook, sonst mailto.

   Erwartetes HTML (gekürzt):

   <div id="form-wrap">
     <form id="inquiry-form" data-endpoint="" data-mailto="kontakt@domain.de" novalidate>
       <div class="field">
         <label for="name">Name</label>
         <input id="name" name="name" required>
         <p class="field-error" id="name-error">Bitte geben Sie Ihren Namen an.</p>
       </div>
       ... weitere .field-Blöcke, Pflichtfelder mit required ...
       <div class="field"><label><input type="checkbox" id="consent" name="consent" required> Datenschutz …</label>
         <p class="field-error" id="consent-error">Bitte stimmen Sie zu.</p></div>
       <!-- Honeypot gegen Spam-Bots, per CSS unsichtbar -->
       <input type="text" name="website" tabindex="-1" autocomplete="off" class="hp" aria-hidden="true">
       <button type="submit"><span class="btn-label">Anfrage senden</span></button>
       <p id="form-status" class="form-status" role="status" aria-live="polite"></p>
     </form>
     <div id="form-success" tabindex="-1" hidden>
       <h3>Vielen Dank für Ihre Anfrage.</h3>
       <p id="form-success-text"></p>
     </div>
   </div>

   CSS: .field.has-error .field-error { display:block } (sonst display:none),
        #form-wrap.is-sent form { display:none }, .hp { position:absolute; left:-9999px }

   data-endpoint leer lassen: Das Formular öffnet dann das E-Mail-Programm.
   data-endpoint mit Adresse: Versand per fetch als JSON. Funktioniert mit
   - eigenem PHP-Skript (vorlagen/anfrage.php): data-endpoint="/anfrage.php"
   - Formspree: data-endpoint="https://formspree.io/f/<id>"
   - Web3Forms: data-endpoint="https://api.web3forms.com/submit" plus
     <input type="hidden" name="access_key" value="<schlüssel>"> im Formular
   - n8n, Make oder Zapier: Adresse des Webhooks. Der Webhook muss die eigene Domain per CORS erlauben. */
(function () {
  "use strict";

  var form = document.getElementById("inquiry-form");
  if (!form) return;

  var wrap = document.getElementById("form-wrap");
  var statusEl = document.getElementById("form-status");
  var successEl = document.getElementById("form-success");
  var successText = document.getElementById("form-success-text");
  var submitBtn = form.querySelector('button[type="submit"]');
  var submitLabel = submitBtn.querySelector(".btn-label") || submitBtn;
  var idleLabel = submitLabel.textContent;
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function fieldValid(input) {
    if (input.type === "checkbox") return input.checked;
    var value = input.value.trim();
    if (!value) return false;
    if (input.type === "email") return emailPattern.test(value);
    return true;
  }

  function showError(input, show) {
    var field = input.closest(".field");
    if (field) field.classList.toggle("has-error", show);
    input.setAttribute("aria-invalid", String(show));
    var error = document.getElementById(input.id + "-error");
    if (!error) return;
    var described = (input.getAttribute("aria-describedby") || "").split(" ").filter(Boolean);
    var has = described.indexOf(error.id) !== -1;
    if (show && !has) described.push(error.id);
    if (!show && has) described.splice(described.indexOf(error.id), 1);
    if (described.length) input.setAttribute("aria-describedby", described.join(" "));
    else input.removeAttribute("aria-describedby");
  }

  var required = Array.prototype.slice.call(form.querySelectorAll("[required]"));

  /* Fehler erst nach dem Verlassen eines Feldes zeigen, beim Korrigieren sofort entfernen */
  required.forEach(function (input) {
    var evt = input.type === "checkbox" || input.tagName === "SELECT" ? "change" : "blur";
    input.addEventListener(evt, function () {
      var field = input.closest(".field");
      if ((field && field.classList.contains("has-error")) || input.value.trim()) {
        showError(input, !fieldValid(input));
      }
    });
    input.addEventListener("input", function () {
      var field = input.closest(".field");
      if (field && field.classList.contains("has-error") && fieldValid(input)) showError(input, false);
    });
  });

  function collect() {
    var data = {};
    new FormData(form).forEach(function (value, key) {
      data[key] = typeof value === "string" ? value.trim() : value;
    });
    if (form.elements.consent) data.consent = form.elements.consent.checked;
    data.page = window.location.href;
    data.submittedAt = new Date().toISOString();
    return data;
  }

  /* Beschriftung eines Feldes für die mailto-Nachricht */
  function labelFor(name) {
    var el = form.elements[name];
    var label = el && el.id ? form.querySelector('label[for="' + el.id + '"]') : null;
    return label ? label.textContent.replace(/\s*\(optional\)\s*/i, "").trim() : name;
  }

  function mailtoLink(data) {
    var lines = Object.keys(data)
      .filter(function (k) { return ["website", "consent", "page", "submittedAt", "message"].indexOf(k) === -1; })
      .map(function (k) { return labelFor(k) + ": " + (data[k] || "keine Angabe"); });
    if (data.message) lines.push("", labelFor("message") + ":", data.message);
    var subject = "Anfrage über " + window.location.hostname + (data.company ? ": " + data.company : "");
    return "mailto:" + form.dataset.mailto +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(lines.join("\n"));
  }

  function showSuccess(text) {
    if (text) successText.textContent = text;
    wrap.classList.add("is-sent");
    successEl.hidden = false;
    successEl.focus();
  }

  function setLoading(loading) {
    submitBtn.disabled = loading;
    submitLabel.textContent = loading ? "Wird gesendet …" : idleLabel;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    statusEl.className = "form-status";
    statusEl.textContent = "";

    var firstInvalid = null;
    required.forEach(function (input) {
      var ok = fieldValid(input);
      showError(input, !ok);
      if (!ok && !firstInvalid) firstInvalid = input;
    });
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    var data = collect();
    /* Honeypot ausgefüllt: so tun, als wäre alles gut, aber nichts senden */
    if (data.website) {
      showSuccess();
      return;
    }
    delete data.website;

    var endpoint = form.dataset.endpoint;
    if (!endpoint) {
      window.location.href = mailtoLink(data);
      showSuccess("Ihr E-Mail-Programm öffnet sich mit der vorbereiteten Nachricht. Bitte senden Sie sie dort ab.");
      return;
    }

    setLoading(true);
    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(data)
    })
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        showSuccess();
      })
      .catch(function () {
        statusEl.className = "form-status is-error";
        statusEl.innerHTML = "Die Anfrage konnte gerade nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie direkt an <a href=\"" + mailtoLink(data) + "\">" + form.dataset.mailto + "</a>.";
      })
      .then(function () { setLoading(false); });
  });
})();
