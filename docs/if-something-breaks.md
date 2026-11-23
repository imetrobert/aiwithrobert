# If something breaks (read this first, then fix only what it names)

1. **A red run or an email from GitHub:** Actions tab, open the failed run, read the last 20 lines of the red step.
   - "Build Assets" red: run `python3 scripts/check_site.py` and `python3 scripts/check_content_sync.py` locally; each prints the exact problem. Usual causes: an English text changed in `index.html` but not in `js/i18n.js` (or the reverse), a missing French string, or a JSON-LD string reworded without its entry in `scripts/build_fr_page.py` (`FR_SUBS`).
   - A generated file looks wrong (`fr/index.html`, `js/bundle.js`, `css/styles.css`, guide or service pages): never edit it by hand; fix the source and push, CI rebuilds it.
2. **The page shows old text:** wait 2 minutes after the push, then force-reload. The `?v=` cache numbers are stamped by CI; never bump them by hand.
3. **Phone, price or hours wrong somewhere:** `grep -rn "<the value>" index.html js/i18n.js js/language.js llms.txt` and change every hit (list in CLAUDE.md).
4. **At-capacity mode stuck on or off:** it is switched in the toolkit ("Site availability"), not in this repo. If the notice shows the wrong wording, edit `js/capacity.js`.
5. **Form or lead problems:** the free forms save through the Supabase RPCs named in CLAUDE.md; a Supabase failure never blocks the visitor. Check the toolkit's Leads/Inquiries screens first.
6. Address or HTTPS problem: Settings > Pages (source `main`, custom domain from `CNAME`).
