/**
 * language.js — Language detection and switching
 * Reads ?lang= from the URL, falls back to localStorage, defaults to 'en'.
 */

/**
 * Which language this URL *is*, structurally: /fr/ serves a fully pre-rendered
 * French page, everything else serves English. This is authoritative and must
 * outrank ?lang= and localStorage — without it a returning visitor whose
 * localStorage says 'en' would land on /fr/ and have the whole page instantly
 * rewritten into English, and every crawler that runs JS would index /fr/ as
 * a duplicate of the English page.
 */
function getPageLanguage() {
  // Strip a trailing slash and/or an explicit index.html before testing, so
  // /fr/, /fr and /fr/index.html all read as French. Without the index.html
  // case a direct hit on /fr/index.html — which crawlers and hand-typed links
  // do produce — would fall through to 'en' and rewrite the French page into
  // English while the address bar still said /fr/.
  var path = window.location.pathname.replace(/\/(index\.html?)?$/i, '');
  return path.endsWith('/fr') ? 'fr' : 'en';
}

function getCurrentLanguage() {
  const pageLang = getPageLanguage();
  if (pageLang === 'fr') return 'fr';

  const p = new URLSearchParams(window.location.search);
  const l = p.get('lang');
  if (l === 'en' || l === 'fr') return l;
  return localStorage.getItem('language') || 'en';
}

/** Canonical URL for a language, preserving any anchor the visitor is on. */
function urlForLanguage(lang) {
  return (lang === 'fr' ? '/fr/' : '/') + window.location.hash;
}

function setLanguage(lang) {
  localStorage.setItem('language', lang);

  // Each language has its own real, indexable URL. If the requested language
  // isn't the one this URL serves, navigate instead of swapping text in place:
  // that keeps the visible language and the address bar in agreement, and
  // gives the hreflang pair in <head> two genuinely distinct pages to point at.
  if (lang !== getPageLanguage()) {
    window.location.href = urlForLanguage(lang);
    return;
  }

  const url = new URL(window.location);
  url.searchParams.delete('lang');
  window.history.replaceState({}, '', url);

  // Update all translatable elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });

  // Update textarea placeholder separately
  const ta = document.querySelector('[data-i18n-placeholder]');
  if (ta) {
    const k = ta.getAttribute('data-i18n-placeholder');
    if (translations[lang] && translations[lang][k]) {
      ta.placeholder = translations[lang][k];
    }
  }

  // Update select option text
  document.querySelectorAll('select option[data-i18n]').forEach(opt => {
    const k = opt.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][k]) {
      opt.textContent = translations[lang][k];
    }
  });

  // Sync the language selector dropdown
  document.getElementById('language-select').value = lang;

  // Update page-level meta
  if (lang === 'fr') {
    // Must stay byte-identical to FR_TITLE/FR_DESC in scripts/build_fr_page.py,
    // which bakes them into /fr/. Title <= 60 chars, description <= 155, or
    // search engines truncate them and Bing flags an SEO error.
    document.title = 'Tutoriel IA pour Aînés — Côte Saint-Luc | AI with Robert';
    document.querySelector('meta[name="description"]').setAttribute('content',
      'Tutoriel IA pour aînés à Côte Saint-Luc et Montréal. Apprenez ChatGPT et la sécurité en ligne, à votre rythme. Appel découverte gratuit. 514-250-8491.');
    document.documentElement.lang = 'fr';
  } else {
    // Must stay byte-identical to the <title>/<meta name="description"> in
    // index.html's <head>. JS overwrites them on load, so any drift means
    // crawlers that render JS see different metadata than those that don't.
    document.title = 'AI Tutoring for Seniors — Côte Saint-Luc | AI with Robert';
    document.querySelector('meta[name="description"]').setAttribute('content',
      'Patient, one-on-one AI tutoring for seniors in Côte Saint-Luc & across Montreal. Learn ChatGPT & online safety. Free 30-min discovery call. 514-250-8491.');
    document.documentElement.lang = 'en';
  }

  checkFormValidity();
}

window.setLanguage = setLanguage;
window.getCurrentLanguage = getCurrentLanguage;
window.getPageLanguage = getPageLanguage;
