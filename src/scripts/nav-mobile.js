const burger = document.querySelector('.nav__burger');
const mobileNav = document.querySelector('.nav-mobile');

// ─── Burger toggle ───────────────────────────

burger.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('nav-mobile--open');
  burger.classList.toggle('is-active');
  burger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');

  // Close all accordion items when nav closes
  if (!isOpen) {
    document.querySelectorAll('.nav-mobile__item--has-sub.is-open').forEach(item => {
      item.classList.remove('is-open');
      item.querySelector('.nav-mobile__toggle').setAttribute('aria-expanded', 'false');
    });
  }
});

// ─── Accordion toggles ───────────────────────

document.querySelectorAll('.nav-mobile__toggle').forEach(toggle => {
  toggle.addEventListener('click', () => {
    const item = toggle.closest('.nav-mobile__item--has-sub');
    const isOpen = item.classList.contains('is-open');

    // Close all open items
    document.querySelectorAll('.nav-mobile__item--has-sub.is-open').forEach(el => {
      el.classList.remove('is-open');
      el.querySelector('.nav-mobile__toggle').setAttribute('aria-expanded', 'false');
    });

    // Open clicked item if it was closed
    if (!isOpen) {
      item.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
    }
  });
});

// ─── Close on resize above breakpoint ────────

window.addEventListener('resize', () => {
  if (window.innerWidth > 925 && mobileNav.classList.contains('nav-mobile--open')) {
    mobileNav.classList.remove('nav-mobile--open');
    burger.classList.remove('is-active');
    burger.setAttribute('aria-label', 'Open menu');

    document.querySelectorAll('.nav-mobile__item--has-sub.is-open').forEach(item => {
      item.classList.remove('is-open');
      item.querySelector('.nav-mobile__toggle').setAttribute('aria-expanded', 'false');
    });
  }
});

// ─── Close on outside click ──────────────────

const header = document.querySelector('.header');

document.addEventListener('click', (e) => {
  if (mobileNav.classList.contains('nav-mobile--open') && !header.contains(e.target)) {
    mobileNav.classList.remove('nav-mobile--open');
    burger.classList.remove('is-active');
    burger.setAttribute('aria-label', 'Open menu');

    document.querySelectorAll('.nav-mobile__item--has-sub.is-open').forEach(item => {
      item.classList.remove('is-open');
      item.querySelector('.nav-mobile__toggle').setAttribute('aria-expanded', 'false');
    });
  }
});

// ─── Close on link click ─────────────────────

document.querySelectorAll('.nav-mobile__sub-link, .nav-mobile__link').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('nav-mobile--open');
    burger.classList.remove('is-active');
    burger.setAttribute('aria-label', 'Open menu');

    document.querySelectorAll('.nav-mobile__item--has-sub.is-open').forEach(item => {
      item.classList.remove('is-open');
      item.querySelector('.nav-mobile__toggle').setAttribute('aria-expanded', 'false');
    });
  });
});
