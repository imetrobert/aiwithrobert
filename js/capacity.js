/* "At capacity" mode for aiwithrobert.com (same file, different CONFIG, on the Business site).
   Asks Supabase (RPC site_capacity, public, no login) whether the site is at capacity. When it is:
   - elements with data-cap="hide" are hidden (phone number, booking and discovery buttons, form)
   - elements with data-cap="wait" are replaced by a "Join the waitlist" link
   - elements with data-cap="swap" (service/guide call-to-action boxes) become a short notice
   - the contact section shows the notice and the waitlist form (RPC join_waitlist)
   Toggled and scheduled from the toolkit ("Site availability"); see migration/site_capacity.sql in the toolkit repo.
   Loaded as a separate file on every page (NOT part of js/bundle.js). If the status cannot be fetched the site shows normally. */
(function () {
  "use strict";
  var CONFIG = {
    site: "seniors",
    url: "https://ipnajvgwtjrlecbqfwrh.supabase.co",
    key: "sb_publishable_oPa7fZdSTeXKuCwpOF338Q_PcXS57go",
    bg: "#eef6fc", border: "#cfe8f7", ink: "#11304c",
    mount: "#contact .contact-container",
    phone: "514-250-8491", scrub: ".faq-qa, aside",
    en: {
      title: "My schedule is full right now",
      body: "Thank you for your interest in AI with Robert for Seniors. I'm fully booked and unable to take on new students at the moment. If you'd like, leave your details below and I'll contact you personally as soon as a spot opens up.",
      services: ["One-on-one online session", "One-on-one in-home session", "Starter Package (5 hours)", "Complete Package (10 hours)", "Group workshop", "Not sure yet"]
    },
    fr: {
      title: "Mon horaire est complet pour le moment",
      body: "Merci de votre intérêt pour AI with Robert pour aînés. Je suis complet et je ne peux pas accepter de nouveaux élèves pour le moment. Si vous le souhaitez, laissez vos coordonnées ci-dessous et je vous contacterai personnellement dès qu'une place se libérera.",
      services: ["Séance individuelle en ligne", "Séance individuelle à domicile", "Forfait de départ (5 heures)", "Forfait complet (10 heures)", "Atelier de groupe", "Je ne suis pas certain"]
    }
  };
  var COMMON = {
    en: { reopen: "I expect to have availability around ", wait: "Join the waitlist", name: "Your name", org: "Organization / company", email: "Email address", phone: "Phone number (optional)", svc: "Services you're interested in",
      consent: "I agree that these details may be used only to contact me about availability. They are not sold or shared.", send: "Join the waitlist", sending: "Sending...",
      okT: "Your request is logged \u2713", ok: "Thank you. Your details have been saved to the waitlist and I'll reach out as soon as I'm available.", eName: "Please enter your name.", eEmail: "Please enter a valid email address.", eConsent: "Please tick the box to agree before joining the waitlist.", err: "Sorry, something went wrong. Please check your details and try again in a moment.", open: "Good news: requests have just reopened. Please reload this page.", home: "/#contact" },
    fr: { reopen: "Je prévois avoir de la disponibilité vers le ", wait: "Rejoindre la liste d'attente", name: "Votre nom", org: "Organisation / entreprise", email: "Adresse courriel", phone: "Numéro de téléphone (facultatif)", svc: "Services qui vous intéressent",
      consent: "J'accepte que ces renseignements servent uniquement à me contacter au sujet des disponibilités. Ils ne sont ni vendus ni partagés.", send: "Rejoindre la liste d'attente", sending: "Envoi...",
      okT: "Votre demande est enregistrée \u2713", ok: "Merci. Vos coordonnées ont été ajoutées à la liste d'attente et je vous contacterai dès que je serai disponible.", eName: "Veuillez entrer votre nom.", eEmail: "Veuillez entrer une adresse courriel valide.", eConsent: "Veuillez cocher la case pour accepter avant de rejoindre la liste d'attente.", err: "Désolé, une erreur s'est produite. Vérifiez vos renseignements et réessayez dans un instant.", open: "Bonne nouvelle : les demandes viennent de rouvrir. Veuillez recharger cette page.", home: "/fr/#contact" }
  };
  var FR = /^\/fr(\/|$)/.test(location.pathname), L = FR ? "fr" : "en", T = CONFIG[L], C = COMMON[L], CK = "awr_cap_" + CONFIG.site, doc = document;

  var st = doc.createElement("style");
  st.textContent = "html.awr-cap [data-cap=hide],html.awr-cap [data-cap=wait],html.awr-cap [data-cap=swap]{display:none!important}" +
    ".awr-cap-notice{background:" + CONFIG.bg + ";border:1px solid " + CONFIG.border + ";border-radius:12px;padding:1.4rem 1.3rem;max-width:680px;margin:1.5rem auto;color:" + CONFIG.ink + ";text-align:left}" +
    ".awr-cap-notice h3{margin:0 0 .5rem;font-size:1.35rem}.awr-cap-notice p{margin:.4rem 0}.awr-cap-notice fieldset{border:0;padding:0;margin:0 0 1rem}" +
    ".awr-cap-notice legend{font-weight:600;margin-bottom:.4rem;padding:0}.awr-cap-notice .awr-svc label{display:flex;gap:.55rem;align-items:flex-start;margin:.35rem 0;font-weight:400}" +
    ".awr-cap-msg.awr-done{display:block;margin-top:1rem;padding:1.1rem 1.2rem;background:#ecfdf5;border:2px solid #22c55e;border-radius:12px;color:#14532d;font-size:1.1rem;line-height:1.6}.awr-cap-msg.awr-done strong{display:block;font-size:1.25rem;margin-bottom:.3rem}" +
    ".awr-cap-notice input[type=checkbox]{width:1.3rem;height:1.3rem;min-width:1.3rem;padding:0;margin:.2rem 0 0;flex:none}.awr-cap-notice label.awr-consent{display:flex;gap:.7rem;align-items:flex-start;font-weight:400}.awr-cap-notice label.awr-consent span{flex:1}.awr-cap-notice .awr-hp{position:absolute;left:-9999px;height:0;overflow:hidden}.awr-cap-msg{margin:.8rem 0 0;font-weight:600}.awr-cap-msg.awr-err{color:#b42318}.awr-cap-notice .awr-invalid{outline:2px solid #b42318;outline-offset:3px;border-radius:8px;background:#fdecec}.awr-cap-notice input.awr-invalid{border-color:#b42318!important}.awr-cap-notice .awr-star{color:#b42318;font-weight:700}";
  doc.head.appendChild(st);

  function h(tag, attrs, kids) {
    var e = doc.createElement(tag), k;
    for (k in (attrs || {})) { if (k === "text") e.textContent = attrs[k]; else e.setAttribute(k, attrs[k]); }
    (kids || []).forEach(function (c) { if (c) e.appendChild(c); });
    return e;
  }
  function field(id, label, type, required, ac) {
    var i = h("input", { type: type, id: id, name: id, maxlength: id === "awr-email" ? "200" : id === "awr-org" ? "160" : id === "awr-phone" ? "40" : "120" });
    if (required) i.required = true; if (ac) i.setAttribute("autocomplete", ac);
    return h("div", { "class": "form-group" }, [h("label", { "for": id, text: label + (required ? " *" : "") }), i]);
  }
  function reopenLine(reopen) {
    if (!reopen || !/^\d{4}-\d{2}-\d{2}$/.test(reopen)) return null;
    var p = reopen.split("-"), d = new Date(+p[0], +p[1] - 1, +p[2]);
    return h("p", { text: C.reopen + d.toLocaleDateString(FR ? "fr-CA" : "en-CA", { year: "numeric", month: "long", day: "numeric" }) + "." });
  }
  function done(form, msg) {
    form.style.display = "none"; msg.className = "awr-cap-msg awr-done"; msg.textContent = "";
    msg.appendChild(h("strong", { text: C.okT })); msg.appendChild(h("span", { text: C.ok }));
    try { msg.scrollIntoView({ block: "center", behavior: "smooth" }); } catch (e) {}
  }
  function submit(form, msg, btn) {
    if (form.elements["awr-hp-field"].value) { done(form, msg); return; }
    var svc = [].slice.call(form.querySelectorAll("input[name=svc]:checked")).map(function (x) { return x.value; });
    btn.disabled = true; btn.textContent = C.sending; msg.textContent = "";
    fetch(CONFIG.url + "/rest/v1/rpc/join_waitlist", { method: "POST", headers: { apikey: CONFIG.key, "Content-Type": "application/json" },
      body: JSON.stringify({ p_site: CONFIG.site, p_name: form.elements["awr-name"].value, p_organization: form.elements["awr-org"].value, p_email: form.elements["awr-email"].value,
        p_phone: form.elements["awr-phone"].value, p_services: svc, p_language: L, p_consent: form.elements["awr-consent"].checked }) })
      .then(function (r) { return r.text().then(function (t) { return { ok: r.ok, t: t }; }); })
      .then(function (r) {
        if (r.ok) { done(form, msg); return; }
        btn.disabled = false; btn.textContent = C.send;
        msg.classList.add("awr-err"); msg.textContent = /not_at_capacity/.test(r.t) ? C.open : C.err;
      })
      .catch(function () { btn.disabled = false; btn.textContent = C.send; msg.textContent = C.err; });
  }
  function buildNotice(reopen, withForm) {
    var box = h("div", { "class": "awr-cap-notice", role: "region", "aria-label": T.title }, [h("h3", { text: T.title }), h("p", { text: T.body }), reopenLine(reopen)]);
    if (!withForm) return box;
    var msg = h("p", { "class": "awr-cap-msg", role: "status" }), btn = h("button", { type: "submit", "class": "cta-button", text: C.send });
    var fs = h("fieldset", { "class": "awr-svc" }, [h("legend", { text: C.svc })].concat(T.services.map(function (s) {
      return h("label", {}, [h("input", { type: "checkbox", name: "svc", value: s }), h("span", { text: s })]);
    })));
    var consent = h("input", { type: "checkbox", id: "awr-consent", name: "awr-consent", required: "required" });
    var form = h("form", { novalidate: "novalidate" }, [
      h("div", { "class": "awr-hp", "aria-hidden": "true" }, [h("input", { type: "text", name: "awr-hp-field", tabindex: "-1", autocomplete: "off", "data-lpignore": "true", "data-form-type": "other" })]),
      field("awr-name", C.name, "text", true, "name"), field("awr-org", C.org, "text", false, "organization"), field("awr-email", C.email, "email", true, "email"), field("awr-phone", C.phone, "tel", false, "tel"),
      fs, h("p", {}, [h("label", { "class": "awr-consent" }, [consent, h("span", {}, [doc.createTextNode(C.consent + " "), h("span", { "class": "awr-star", text: "*", "aria-hidden": "true" })])])]), btn]);
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var f = form.elements, label = consent.parentNode;
      [].slice.call(form.querySelectorAll(".awr-invalid")).forEach(function (n) { n.classList.remove("awr-invalid"); });
      function bad(el, text) { el.classList.add("awr-invalid"); msg.textContent = text; msg.classList.add("awr-err"); if (el.focus && el !== label) el.focus(); try { el.scrollIntoView({ block: "center", behavior: "smooth" }); } catch (e) {} }
      msg.classList.remove("awr-err");
      if (!f["awr-name"].value.trim()) { bad(f["awr-name"], C.eName); return; }
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f["awr-email"].value.trim())) { bad(f["awr-email"], C.eEmail); return; }
      if (!consent.checked) { bad(label, C.eConsent); return; }
      submit(form, msg, btn);
    });
    form.addEventListener("input", function (e) { e.target.classList.remove("awr-invalid"); if (e.target === consent) consent.parentNode.classList.remove("awr-invalid"); });
    consent.addEventListener("change", function () { consent.parentNode.classList.remove("awr-invalid"); });
    box.appendChild(form); box.appendChild(msg);
    return box;
  }
  function clear() { [].slice.call(doc.querySelectorAll("[data-cap-added]")).forEach(function (n) { n.parentNode.removeChild(n); }); }
  function mark(n) { n.setAttribute("data-cap-added", "1"); return n; }
  function apply(on, reopen) {
    clear();
    doc.documentElement.classList.toggle("awr-cap", !!on);
    if (!on) return;
    [].slice.call(doc.querySelectorAll("[data-cap=wait]")).forEach(function (n) {
      n.parentNode.insertBefore(mark(h("a", { href: "#contact", "class": n.className, text: C.wait })), n.nextSibling);
    });
    [].slice.call(doc.querySelectorAll("[data-cap=swap]")).forEach(function (n) {
      var box = buildNotice(reopen, false); box.appendChild(h("p", {}, [h("a", { href: C.home, "class": "btn cta-button", text: C.wait })]));
      n.parentNode.insertBefore(mark(box), n.nextSibling);
    });
    var m = doc.querySelector(CONFIG.mount);
    if (m) {
      var hdr = m.querySelector(".section-header");
      var box = mark(buildNotice(reopen, true)); box.id = "capacity-notice";
      if (hdr && hdr.nextSibling) m.insertBefore(box, hdr.nextSibling); else m.appendChild(box);
    }
  }
  /* Any FAQ answer or summary blurb that prints the phone number is hidden too while at capacity. */
  if (CONFIG.scrub) [].slice.call(doc.querySelectorAll(CONFIG.scrub)).forEach(function (n) { if (n.textContent.indexOf(CONFIG.phone) !== -1) n.setAttribute("data-cap", "hide"); });
  var cached = null; try { cached = JSON.parse(localStorage.getItem(CK) || "null"); } catch (e) {}
  if (cached && cached.on) apply(true, cached.reopen);
  fetch(CONFIG.url + "/rest/v1/rpc/site_capacity", { method: "POST", headers: { apikey: CONFIG.key, "Content-Type": "application/json" }, body: JSON.stringify({ p_site: CONFIG.site }) })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (j) {
      if (!j || typeof j.at_capacity !== "boolean") return;
      try { localStorage.setItem(CK, JSON.stringify({ on: j.at_capacity, reopen: j.reopen || null })); } catch (e) {}
      if (!(cached && cached.on === j.at_capacity && cached.reopen === (j.reopen || null) && j.at_capacity)) apply(j.at_capacity, j.reopen);
    })
    .catch(function () {});
})();
