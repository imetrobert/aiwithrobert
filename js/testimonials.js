/* Published testimonials. Asks Supabase (public RPC public_testimonials, no login) for the testimonials Robert has published from the
   toolkit's "Testimonials" screen and adds them as cards after the ones already in the page (same markup and classes, so the existing
   styles apply). Only text a client agreed to share is ever returned: the database refuses to publish without a consent record.
   Same file on the Business and Seniors sites; only CONFIG differs. Table and function: migration/site_testimonials.sql in the toolkit repo.
   Loaded as a separate file on the home page (NOT part of js/bundle.js). Fails silently: if it cannot load, the page shows as before. */
(function () {
  "use strict";
  var CONFIG = { site: "seniors", url: "https://ipnajvgwtjrlecbqfwrh.supabase.co", key: "sb_publishable_oPa7fZdSTeXKuCwpOF338Q_PcXS57go", mount: "#testimonials .testimonials-container" };
  function add(box, name, cls, text) {
    if (!text) return null;
    var s = document.createElement("span"); s.className = cls; s.textContent = text; box.appendChild(s); return s;
  }
  function card(t) {
    var f = document.createElement("figure"); f.className = "testimonial-card"; f.setAttribute("data-published", "1");
    var m = document.createElement("span"); m.className = "testimonial-quote-mark"; m.setAttribute("aria-hidden", "true"); m.textContent = "“"; f.appendChild(m);
    var q = document.createElement("blockquote"); q.className = "testimonial-quote"; q.textContent = t.text; f.appendChild(q);
    var c = document.createElement("figcaption"); c.className = "testimonial-author";
    add(c, "", "testimonial-name", t.name); add(c, "", "testimonial-role", t.role); add(c, "", "testimonial-org", t.org); add(c, "", "testimonial-context", t.context);
    if (c.childNodes.length) f.appendChild(c);
    return f;
  }
  function run() {
    var box = document.querySelector(CONFIG.mount);
    if (!box || !window.fetch) return;
    fetch(CONFIG.url + "/rest/v1/rpc/public_testimonials", {
      method: "POST", headers: { apikey: CONFIG.key, "Content-Type": "application/json" }, body: JSON.stringify({ p_site: CONFIG.site })
    }).then(function (r) { return r.ok ? r.json() : []; }).then(function (rows) {
      if (!Array.isArray(rows)) return;
      rows.slice(0, 12).forEach(function (t) { if (t && typeof t.text === "string" && t.text.length >= 20) box.appendChild(card(t)); });
    }).catch(function () {});
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run); else run();
})();
