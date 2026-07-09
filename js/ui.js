/**
 * ui.js — FAQ accordion and navigation highlight on scroll
 */

/* ── FAQ accordion ── */
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const isOpen = btn.getAttribute('aria-expanded') === 'true';

  // Close all
  document.querySelectorAll('.faq-question').forEach(b => {
    b.setAttribute('aria-expanded', 'false');
    b.nextElementSibling.classList.remove('open');
  });

  // Open clicked one if it was closed
  if (!isOpen) {
    btn.setAttribute('aria-expanded', 'true');
    answer.classList.add('open');
  }
}

window.toggleFaq = toggleFaq;

/* ── Nav active highlight on scroll ── */
const sections = document.querySelectorAll('section, .hero');
const navLinks  = document.querySelectorAll('nav a');

function highlightNav() {
  let cur = '';
  const sp = window.scrollY + 250;
  sections.forEach(s => {
    if (sp >= s.offsetTop && sp < s.offsetTop + s.clientHeight) {
      cur = s.getAttribute('id');
    }
  });
  navLinks.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + cur) a.classList.add('active');
  });
}

window.addEventListener('scroll', highlightNav, { passive: true });

/* ── Corrective anchor scroll ──
   Why this is needed: when a link like index.html?lang=fr#pricing loads,
   the browser jumps to #pricing BEFORE our JS runs. setLanguage() then
   swaps in French text, which is often longer than English and changes
   the height of every section above the target — so by the time layout
   settles, the browser's original jump is off. Clicking a nav link
   in-page never hits this because layout is already stable by then.
   Fix: after the language swap (and again after fonts/images finish
   loading, which can also shift heights), recompute the target's real
   position — accounting for the fixed nav's height — and re-scroll. */
function scrollToHashTarget() {
  const hash = window.location.hash;
  if (!hash || hash.length < 2) return;

  let target;
  try { target = document.querySelector(hash); } catch (e) { return; }
  if (!target) return;

  const nav = document.querySelector('nav');
  const offset = (nav ? nav.offsetHeight : 0) + 16;
  const y = target.getBoundingClientRect().top + window.pageYOffset - offset;

  // Force an instant jump (not the smooth-scroll from base.css) since
  // this is a silent correction, not a user-initiated navigation.
  const prevBehavior = document.documentElement.style.scrollBehavior;
  document.documentElement.style.scrollBehavior = 'auto';
  window.scrollTo(0, Math.max(y, 0));
  document.documentElement.style.scrollBehavior = prevBehavior;
}

window.scrollToHashTarget = scrollToHashTarget;

/* ── Mobile/tablet nav scroll affordance ──
   The nav links can overflow horizontally on narrower screens (see
   nav.css / responsive.css). Since the scrollbar itself is hidden,
   people had no visual cue there was more to scroll to. This adds a
   fade on whichever edge has hidden content, plus a one-time gentle
   nudge on load so the scrollability is obvious without anyone
   having to discover it by accident. */
function initNavScrollHint() {
  const wrap = document.querySelector('.nav-scroll-wrap');
  const list = wrap ? wrap.querySelector('ul') : null;
  if (!wrap || !list) return;

  function updateFade() {
    const hasOverflow = list.scrollWidth > list.clientWidth + 2;
    wrap.classList.toggle('has-overflow', hasOverflow);
    wrap.classList.toggle('scrolled-start', list.scrollLeft <= 2);
    wrap.classList.toggle(
      'scrolled-end',
      list.scrollLeft + list.clientWidth >= list.scrollWidth - 2
    );
  }

  list.addEventListener('scroll', updateFade, { passive: true });
  window.addEventListener('resize', updateFade);
  updateFade();

  if (list.dataset.navHintShown) return;

  if (list.scrollWidth > list.clientWidth + 2) {
    list.dataset.navHintShown = 'true';
    setTimeout(() => {
      list.scrollTo({ left: 40, behavior: 'smooth' });
      setTimeout(() => {
        list.scrollTo({ left: 0, behavior: 'smooth' });
        updateFade();
      }, 500);
    }, 700);
  }
}

window.navScrollHint = initNavScrollHint;
