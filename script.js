// Mamabolo Legacy Group — shared interactions

// Flag that JS is running BEFORE anything else — .reveal elements only
// start hidden when this class is present, so if this script fails to
// load for any reason, all content stays visible by default.
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {

  /* Mobile nav toggle */
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav-desktop');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      nav.classList.toggle('open');
      document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      toggle.classList.remove('open');
      nav.classList.remove('open');
      document.body.style.overflow = '';
    }));
  }

  /* Scroll reveal */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
    // Safety net: force-reveal everything after a short delay in case the
    // observer never fires (e.g. unusual viewport/iframe contexts).
    setTimeout(() => revealEls.forEach(el => el.classList.add('is-visible')), 2500);
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* Contact form */
  const form = document.querySelector('[data-inquiry-form]');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.innerHTML;
      const formData = new FormData(form);
      const fullname = String(formData.get('fullname') || '').trim();
      const email = String(formData.get('email') || '').trim();
      const organization = String(formData.get('org') || '').trim();
      const inquiry = String(formData.get('inquiry') || '').trim();
      const message = String(formData.get('message') || '').trim();

      btn.innerHTML = 'Opening mail app…';
      btn.disabled = true;

      const subject = `Inquiry from ${fullname || 'Website Visitor'} — ${inquiry}`;
      const body = [
        `Full Name: ${fullname}`,
        `Email Address: ${email}`,
        `Organization: ${organization}`,
        `Nature of Inquiry: ${inquiry}`,
        '',
        'Message:',
        message
      ].join('\n');

      const mailtoLink = `mailto:info@mamabololegacygroup.co.za?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoLink;

      setTimeout(() => {
        btn.innerHTML = original;
        btn.disabled = false;
      }, 1800);
    });
  }

  /* Header shadow on scroll */
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.style.boxShadow = window.scrollY > 12 ? '0 10px 30px -20px rgba(0,0,0,.8)' : 'none';
    });
  }
});
