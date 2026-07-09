/**
 * main.js — Initialisation
 * Runs after DOM is ready. Order matters: language must apply before
 * form validity is checked (checkFormValidity reads getCurrentLanguage).
 */

window.addEventListener('DOMContentLoaded', () => {
  setLanguage(getCurrentLanguage());
  checkFormValidity();
  highlightNav();
  checkFormSuccess();
  navScrollHint();
  navTapReveal();

  // Double rAF: wait for the i18n text swap above to actually reflow
  // the layout before measuring where the anchor now sits.
  requestAnimationFrame(() => requestAnimationFrame(scrollToHashTarget));
});

// Images can still shift section heights after DOMContentLoaded fires.
window.addEventListener('load', () => {
  scrollToHashTarget();
  navScrollHint();
});

// Web fonts swapping in (FOUT) can also shift heights; correct once more.
if (window.document.fonts && document.fonts.ready) {
  document.fonts.ready.then(scrollToHashTarget);
}
