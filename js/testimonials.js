/* Published testimonials. Asks Supabase (public RPC public_testimonials, no login) for the testimonials Robert has published from the
   toolkit's "Testimonials" screen and adds them as cards after the ones already in the page (same markup and classes, so the existing
   styles apply). The section is hidden in the HTML until at least one testimonial is published. Only text a client agreed to share is ever returned: the database refuses to publish without a consent record.
   Same file on the Business and Seniors sites; only CONFIG differs. Table and function: migration/site_testimonials.sql in the toolkit repo.
   Loaded as a separate file on the home page (NOT part of js/bundle.js). Fails silently: if it cannot load, the page shows as before. */
(function () {
  "use strict";
  var CONFIG = { site: "seniors", reviewLinks: true, url: "https://ipnajvgwtjrlecbqfwrh.supabase.co", key: "sb_publishable_oPa7fZdSTeXKuCwpOF338Q_PcXS57go", reveal: "#testimonials", mount: "#testimonials .testimonials-container" };
  function add(box, name, cls, text) {
    if (!text) return null;
    var s = document.createElement("span"); s.className = cls; s.textContent = text; box.appendChild(s); return s;
  }
  /* Optional "See this review on Google" button (same look as the old hand-written card). Only an https Google link is accepted. */
  function reviewLink(url) {
    if (!CONFIG.reviewLinks || typeof url !== "string") return null;
    try {
      var u = new URL(url);
      if (u.protocol !== "https:" || !/(^|\.)(google\.com|google\.ca|goo\.gl|g\.page|share\.google)$/.test(u.hostname)) return null;
    } catch (e) { return null; }
    var a = document.createElement("a"); a.className = "testimonial-gbp-link"; a.href = url; a.target = "_blank"; a.rel = "noopener noreferrer";
    var ns = "http://www.w3.org/2000/svg", svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 24 24"); svg.setAttribute("width", "16"); svg.setAttribute("height", "16"); svg.setAttribute("aria-hidden", "true"); svg.setAttribute("focusable", "false");
    [["#4285F4", "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"],
     ["#34A853", "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.85A11 11 0 0 0 12 23z"],
     ["#FBBC05", "M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.05H2.18a11 11 0 0 0 0 9.9l3.66-2.85z"],
     ["#EA4335", "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1a11 11 0 0 0-9.82 6.05l3.66 2.85C6.71 7.31 9.14 5.38 12 5.38z"]].forEach(function (p) {
      var path = document.createElementNS(ns, "path"); path.setAttribute("fill", p[0]); path.setAttribute("d", p[1]); svg.appendChild(path);
    });
    var span = document.createElement("span"); span.textContent = /^\/fr(\/|$)/.test(location.pathname) ? "Voir cet avis sur Google" : "See this review on Google";
    a.appendChild(svg); a.appendChild(span); return a;
  }
  function card(t) {
    var f = document.createElement("figure"); f.className = "testimonial-card"; f.setAttribute("data-published", "1");
    var m = document.createElement("span"); m.className = "testimonial-quote-mark"; m.setAttribute("aria-hidden", "true"); m.textContent = "“"; f.appendChild(m);
    var q = document.createElement("blockquote"); q.className = "testimonial-quote"; q.textContent = t.text; f.appendChild(q);
    var c = document.createElement("figcaption"); c.className = "testimonial-author";
    add(c, "", "testimonial-name", t.name); add(c, "", "testimonial-role", t.role); add(c, "", "testimonial-org", t.org); add(c, "", "testimonial-context", t.context);
    if (c.childNodes.length) f.appendChild(c);
    var link = reviewLink(t.review_url);
    if (link) f.appendChild(link);
    return f;
  }
  function run() {
    var box = document.querySelector(CONFIG.mount);
    if (!box || !window.fetch) return;
    fetch(CONFIG.url + "/rest/v1/rpc/public_testimonials", {
      method: "POST", headers: { apikey: CONFIG.key, "Content-Type": "application/json" }, body: JSON.stringify({ p_site: CONFIG.site })
    }).then(function (r) { return r.ok ? r.json() : []; }).then(function (rows) {
      if (!Array.isArray(rows)) return;
      var norm = function (x) { return String(x || "").replace(/\s+/g, " ").trim(); }, have = {};
      Array.prototype.forEach.call(box.querySelectorAll(".testimonial-quote"), function (q) { var x = ""; Array.prototype.forEach.call(q.childNodes, function (n) { x += n.nodeName === "BR" ? " " : n.textContent; }); have[norm(x)] = 1; });   /* already baked into the page by scripts/sync_testimonials.py */
      rows.slice(0, 12).forEach(function (t) { if (t && typeof t.text === "string" && t.text.length >= 20 && !have[norm(t.text)]) box.appendChild(card(t)); });
      var shown = document.querySelector(CONFIG.reveal);
      if (shown && box.querySelector("[data-published]")) shown.style.display = "";   /* the section starts hidden so no empty heading shows */
    }).catch(function () {});
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run); else run();
})();
