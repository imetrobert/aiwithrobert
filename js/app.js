/* ================================================
   AI with Robert — app.js
   Application logic: language, form, nav, map.
   ================================================ */

/* ── FAQ accordion ── */
function toggleFaq(btn) {
    const answer = btn.nextElementSibling;
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    document.querySelectorAll('.faq-question').forEach(b => {
        b.setAttribute('aria-expanded', 'false');
        b.nextElementSibling.classList.remove('open');
    });
    if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true');
        answer.classList.add('open');
    }
}
window.toggleFaq = toggleFaq;

/* ── Language switcher ── */
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

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) el.innerHTML = translations[lang][key];
    });

    const ta = document.querySelector('[data-i18n-placeholder]');
    if (ta) {
        const k = ta.getAttribute('data-i18n-placeholder');
        if (translations[lang] && translations[lang][k]) ta.placeholder = translations[lang][k];
    }

    document.querySelectorAll('select option[data-i18n]').forEach(opt => {
        const k = opt.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][k]) opt.textContent = translations[lang][k];
    });

    document.getElementById('language-select').value = lang;

    if (lang === 'fr') {
        document.title = 'Tutoriel IA et Formation Technologique pour A\u00een\u00e9s \u00e0 C\u00f4te Saint-Luc | AI with Robert';
        document.querySelector('meta[name="description"]').setAttribute('content',
            "Robert Simon offre un tutoriel IA patient et personnalis\u00e9 pour a\u00een\u00e9s \u00e0 C\u00f4te Saint-Luc, Qu\u00e9bec. Apprenez ChatGPT, la s\u00e9curit\u00e9 en ligne et les bases internet. Ateliers IA disponibles. Appel d\u00e9couverte gratuit. 514-250-8491.");
        document.documentElement.lang = 'fr';
    } else {
        document.title = 'AI Tutoring & Technology Training for Seniors \u2014 C\u00f4te Saint-Luc | AI with Robert';
        document.querySelector('meta[name="description"]').setAttribute('content',
            'Robert Simon offers patient, one-on-one AI tutoring and technology training for seniors in C\u00f4te Saint-Luc, QC. Learn ChatGPT, online safety and email security. AI workshops available. Free 30-min discovery call. 514-250-8491.');
        document.documentElement.lang = 'en';
    }
}
window.setLanguage = setLanguage;

/* ── Form validation ── */
const submitBtn = document.getElementById('submit-btn');
const formHint  = document.getElementById('form-hint');
const reqFields = {
    'name':         document.getElementById('name'),
    'email':        document.getElementById('email'),
    'phone':        document.getElementById('phone'),
    'session-type': document.getElementById('session-type')
};

function checkFormValidity() {
    let ok = true, missing = [];
    for (let f in reqFields) {
        const el = reqFields[f];
        if (!el.value || !el.value.trim()) {
            ok = false;
            missing.push(el.previousElementSibling.textContent.replace(' *', '').trim());
        } else if (el.type === 'tel' && !el.value.match(/[0-9]{3}-[0-9]{3}-[0-9]{4}/)) {
            ok = false; missing.push('Valid Phone Number');
        } else if (el.type === 'email' && !el.validity.valid) {
            ok = false; missing.push('Valid Email');
        }
    }
    submitBtn.disabled = !ok;
    formHint.style.display = ok ? 'none' : 'block';
    if (!ok) formHint.textContent = missing.length
        ? 'Still needed: ' + missing.join(', ')
        : 'Please fill in all required (*) fields above';
    return ok;
}

for (let f in reqFields) {
    reqFields[f].addEventListener('input', () => {
        checkFormValidity();
        reqFields[f].classList.remove('error');
        const em = document.getElementById(f + '-error');
        if (em) em.classList.remove('show');
    });
    reqFields[f].addEventListener('change', checkFormValidity);
}

/* Auto-format phone as XXX-XXX-XXXX */
document.getElementById('phone').addEventListener('input', function (e) {
    let v = e.target.value.replace(/\D/g, '');
    if (v.length <= 3)       e.target.value = v;
    else if (v.length <= 6)  e.target.value = v.slice(0,3) + '-' + v.slice(3);
    else                     e.target.value = v.slice(0,3) + '-' + v.slice(3,6) + '-' + v.slice(6,10);
    checkFormValidity();
});

/* Show success message after form submit redirect */
function checkFormSuccess() {
    if (new URLSearchParams(window.location.search).get('submitted') === 'true') {
        const form = document.querySelector('.contact-form');
        const msg  = document.getElementById('success-message');
        if (form && msg) {
            form.style.display = 'none';
            msg.style.display  = 'block';
            setTimeout(() => msg.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300);
        }
    }
}

/* ── Nav active highlight on scroll ── */
const sections = document.querySelectorAll('section, .hero');
const navLinks  = document.querySelectorAll('nav a');
function highlightNav() {
    let cur = '';
    const sp = window.scrollY + 250;
    sections.forEach(s => {
        if (sp >= s.offsetTop && sp < s.offsetTop + s.clientHeight) cur = s.getAttribute('id');
    });
    navLinks.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === '#' + cur) a.classList.add('active');
    });
}
window.addEventListener('scroll', highlightNav);

/* ── Intersection Observer: lazy-load Google Map ──
   The iframe uses data-src so it doesn't request Google's
   servers until the user scrolls near the contact section.
   Saves ~300KB on page load for users who never scroll that far. */
function initMapLazyLoad() {
    const wrap = document.querySelector('.map-wrap');
    if (!wrap) return;
    const iframe = wrap.querySelector('iframe[data-src]');
    if (!iframe) return;

    if (!('IntersectionObserver' in window)) {
        // Fallback for very old browsers — load immediately
        iframe.src = iframe.getAttribute('data-src');
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                iframe.src = iframe.getAttribute('data-src');
                // Remove placeholder text once iframe loads
                iframe.addEventListener('load', () => {
                    const placeholder = wrap.querySelector('.map-placeholder');
                    if (placeholder) placeholder.style.display = 'none';
                }, { once: true });
                observer.unobserve(iframe);
            }
        });
    }, { rootMargin: '300px' }); // Start loading 300px before visible

    observer.observe(iframe);
}

/* ── Init ── */
window.addEventListener('DOMContentLoaded', () => {
    setLanguage(getCurrentLanguage());
    checkFormValidity();
    highlightNav();
    checkFormSuccess();
    initMapLazyLoad();
});
