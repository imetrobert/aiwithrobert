/**
 * form.js — Contact form validation and auto-formatting
 */

// Anchored regex: exactly XXX-XXX-XXXX, no extra digits
const PHONE_RE = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;

// Saved copy of each submission in the owner's own database (shown in the toolkit's Inquiries screen).
// The formsubmit.co email stays the primary path; this is fire-and-forget and never blocks or fails the form.
// Table + function: migration/site_inquiries.sql in the toolkit repo.
function saveInquiryCopy(form, site) {
  try {
    const fd = new FormData(form), extra = {}, core = {};
    fd.forEach(function (v, k) {
      if (k.charAt(0) === '_' || k === 'brand' || k === 'language' || typeof v !== 'string') return;
      if (k === 'name' || k === 'email' || k === 'phone' || k === 'company' || k === 'message') { core[k] = v; return; }
      if (v.trim() !== '') extra[k] = v.trim().slice(0, 200);
    });
    fetch('https://ipnajvgwtjrlecbqfwrh.supabase.co/rest/v1/rpc/submit_inquiry', {
      method: 'POST', keepalive: true,
      headers: { apikey: 'sb_publishable_oPa7fZdSTeXKuCwpOF338Q_PcXS57go', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        p_site: site, p_name: core.name || '', p_organization: core.company || '', p_email: core.email || '', p_phone: core.phone || '',
        p_message: core.message || '', p_extra: extra, p_language: /^\/fr(\/|$)/.test(location.pathname) ? 'fr' : 'en'
      })
    }).catch(function () {});
  } catch (e) {}
}

const submitBtn = document.getElementById('submit-btn');
const formHint  = document.getElementById('form-hint');

const reqFields = {
  'name':         document.getElementById('name'),
  'email':        document.getElementById('email'),
  'phone':        document.getElementById('phone'),
  'session-type': document.getElementById('session-type'),
};

function checkFormValidity() {
  let ok = true;
  let missing = [];

  for (let f in reqFields) {
    const el = reqFields[f];
    if (!el.value || !el.value.trim()) {
      ok = false;
      missing.push(el.previousElementSibling.textContent.replace(' *', '').trim());
    } else if (el.type === 'tel' && !PHONE_RE.test(el.value)) {
      ok = false;
      missing.push('Valid Phone Number');
    } else if (el.type === 'email' && !el.validity.valid) {
      ok = false;
      missing.push('Valid Email');
    }
  }

  submitBtn.disabled = !ok;
  formHint.style.display = ok ? 'none' : 'block';

  if (!ok) {
    const lang = getCurrentLanguage();
    const prefix   = lang === 'fr' ? 'Champs manquants : ' : 'Still needed: ';
    const fallback = lang === 'fr'
      ? 'Veuillez remplir tous les champs obligatoires (*) ci-dessus'
      : 'Please fill in all required (*) fields above';
    formHint.textContent = missing.length ? prefix + missing.join(', ') : fallback;
  }

  return ok;
}

// Live validation on all required fields
for (let f in reqFields) {
  reqFields[f].addEventListener('input', () => {
    checkFormValidity();
    reqFields[f].classList.remove('error');
    const em = document.getElementById(f + '-error');
    if (em) em.classList.remove('show');
  });
  reqFields[f].addEventListener('change', checkFormValidity);
}

// Auto-format phone as XXX-XXX-XXXX while typing
document.getElementById('phone').addEventListener('input', function (e) {
  let v = e.target.value.replace(/\D/g, '');
  if (v.length <= 3)      e.target.value = v;
  else if (v.length <= 6) e.target.value = v.slice(0, 3) + '-' + v.slice(3);
  else                    e.target.value = v.slice(0, 3) + '-' + v.slice(3, 6) + '-' + v.slice(6, 10);
  checkFormValidity();
});

// Catch browser autofill (fires 'change' not 'input')
window.addEventListener('load', () => {
  Object.values(reqFields).forEach(el => {
    if (el.value && el.value.trim()) checkFormValidity();
  });
});

// Show success panel after formsubmit.co redirect
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

window.checkFormValidity = checkFormValidity;
window.checkFormSuccess  = checkFormSuccess;

// Send French visitors back to the French page after formsubmit.co redirects
(function () {
  const next = document.getElementById('form-next');
  if (next && /^\/fr(\/|$)/i.test(window.location.pathname)) {
    next.value = window.location.origin + '/fr/?submitted=true#contact';
  }
})();

// Tag each submission with brand + language so the email subject and body show where it came from
(function () {
  const form = document.querySelector('.contact-form form');
  if (!form) return;
  form.addEventListener('submit', function () {
    saveInquiryCopy(form, 'seniors');
    const fr = getCurrentLanguage() === 'fr';
    document.getElementById('form-subject').value =
      '[Seniors · ' + (fr ? 'FR' : 'EN') + '] New Contact Form Submission - AI with Robert';
    document.getElementById('form-language').value = fr ? 'Français' : 'English';
  });
})();
