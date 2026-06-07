/**
 * language.js — Language detection and switching
 * Reads ?lang= from the URL, falls back to localStorage, defaults to 'en'.
 */

function getCurrentLanguage() {
  const p = new URLSearchParams(window.location.search);
  const l = p.get('lang');
  if (l === 'en' || l === 'fr') return l;
  return localStorage.getItem('language') || 'en';
}

function setLanguage(lang) {
  localStorage.setItem('language', lang);

  const url = new URL(window.location);
  url.searchParams.set('lang', lang);
  window.history.pushState({}, '', url);

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
    document.title = 'Tutoriel IA et Formation Technologique pour Aînés à Côte Saint-Luc | AI with Robert';
    document.querySelector('meta[name="description"]').setAttribute('content',
      'Robert Simon offre un tutoriel IA patient et personnalisé pour aînés à Côte Saint-Luc, Québec. Apprenez ChatGPT, la sécurité en ligne et les bases internet. Ateliers IA disponibles. Appel découverte gratuit. 514-250-8491.');
    document.documentElement.lang = 'fr';
  } else {
    document.title = 'AI Tutoring & Technology Training for Seniors — Côte Saint-Luc | AI with Robert';
    document.querySelector('meta[name="description"]').setAttribute('content',
      'Robert Simon offers patient, one-on-one AI tutoring and technology training for seniors in Côte Saint-Luc, QC. Learn ChatGPT, online safety and email security. AI workshops available. Free 30-min discovery call. 514-250-8491.');
    document.documentElement.lang = 'en';
  }

  checkFormValidity();
}

window.setLanguage = setLanguage;
window.getCurrentLanguage = getCurrentLanguage;
