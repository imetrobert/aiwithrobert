/* Anonymous visit counters (no cookies, no IP address, nothing about the person). Adds 1 to a counter in Supabase (RPC track_hit, public)
   so the toolkit's "Website metrics" screen can show visits, page views, clicks and sources per site. Same file on the Business, Seniors
   and Hub sites; only CONFIG.site differs. Table and function: migration/site_hits.sql in the toolkit repo.
   - visit: first page of the day on a device (a local date is kept in localStorage, never sent)
   - view: every page (path only, no query string)   - event: the same events Google Analytics gets (gtag is wrapped, see EVENTS)
   - source: utm_source in the link, else the referring website's host name (kept for the tab in sessionStorage)
   - skipped for bots, headless browsers and any device that opened a page with ?countme=1 (?countme=0 undoes it).
   Fails silently; a broken counter never affects the page. Loaded as a separate file on every page (NOT part of js/bundle.js). */
(function () {
  "use strict";
  var CONFIG = { site: "seniors", url: "https://ipnajvgwtjrlecbqfwrh.supabase.co", key: "sb_publishable_oPa7fZdSTeXKuCwpOF338Q_PcXS57go" };
  var EVENTS = { feasibility_submit: 1, generate_lead: 1, phone_click: 1, email_click: 1, booking_click: 1, brand_card_click: 1 };
  try {
    var q = new URLSearchParams(location.search), nt = q.get("countme");
    if (nt === "1") localStorage.setItem("hits-off", "1"); else if (nt === "0") localStorage.removeItem("hits-off");
    if (localStorage.getItem("hits-off") === "1") return;
    if (navigator.webdriver || /bot|crawl|spider|slurp|headless|lighthouse|preview|monitor|curl|wget/i.test(navigator.userAgent || "")) return;
    var src = sessionStorage.getItem("hits-src");
    if (src === null) {
      src = String(q.get("utm_source") || "").toLowerCase();
      if (!src && document.referrer) { try { var h = new URL(document.referrer).hostname.replace(/^www\./, ""); if (h !== location.hostname.replace(/^www\./, "") && !/aiwithrobert\.com$/.test(h)) src = h; } catch (e) {} }
      src = src.replace(/[^a-z0-9._\/-]/g, "").slice(0, 40);
      sessionStorage.setItem("hits-src", src);
    }
  } catch (e) { var src = ""; }
  function hit(kind, name) {
    try {
      fetch(CONFIG.url + "/rest/v1/rpc/track_hit", { method: "POST", keepalive: true, headers: { apikey: CONFIG.key, "Content-Type": "application/json" },
        body: JSON.stringify({ p_site: CONFIG.site, p_kind: kind, p_name: name || "", p_source: src || "" }) }).catch(function () {});
    } catch (e) {}
  }
  try {
    var day = new Date().toLocaleDateString("en-CA", { timeZone: "America/Toronto" });
    if (localStorage.getItem("hits-day") !== day) { localStorage.setItem("hits-day", day); hit("visit", ""); }
    hit("view", (location.pathname || "/").toLowerCase().slice(0, 78));
    var g = window.gtag;
    if (typeof g === "function") window.gtag = function (cmd, name, params) {
      try { if (cmd === "event" && EVENTS[name]) hit("event", name + (name === "brand_card_click" && params && params.brand ? ":" + String(params.brand).toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 20) : "")); } catch (e) {}
      return g.apply(this, arguments);
    };
  } catch (e) {}
})();
