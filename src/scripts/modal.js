export function initModal(lenis) {
  const overlay = document.getElementById('modal-overlay');
  const modals  = document.querySelectorAll('.modal');
  let current   = null;

  // ─── Open / Close ─────────────────────────────

  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal || modal === current) return;

    if (current) _hide(current);

    current = modal;
    lenis.stop();

    const scrollbarW = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = scrollbarW + 'px';

    overlay.classList.add('modal-overlay--open');
    modal.classList.add('modal--open');

    resetModal(modal);

    const firstInput = modal.querySelector('.modal__input');
    if (firstInput) setTimeout(() => firstInput.focus(), 250);
  }

  function closeModal() {
    if (!current) return;
    _hide(current);
    overlay.classList.remove('modal-overlay--open');
    document.body.style.paddingRight = '';
    lenis.start();
    current = null;
  }

  function _hide(modal) {
    modal.classList.remove('modal--open');
  }

  // ─── Reset form & success state ───────────────

  function resetModal(modal) {
    const form    = modal.querySelector('.modal__form');
    const success = modal.querySelector('.modal__success');

    if (form) {
      form.reset();
      form.style.display = '';
      form.querySelectorAll('.modal__input').forEach(inp => {
        inp.classList.remove('modal__input--error');
      });
      form.querySelectorAll('.modal__error').forEach(el => {
        el.textContent = '';
        el.classList.remove('modal__error--visible');
      });
      form.querySelectorAll('.modal__clear').forEach(btn => {
        btn.hidden = true;
      });
      form.querySelectorAll('.modal__input[type="text"][data-validate="password"]').forEach(inp => {
        inp.type = 'password';
      });
      form.querySelectorAll('.modal__eye').forEach(btn => {
        btn.querySelector('.modal__eye-icon--show').hidden = false;
        btn.querySelector('.modal__eye-icon--hide').hidden = true;
        btn.setAttribute('aria-label', 'Show password');
      });
    }

    const switchEl = modal.querySelector('.modal__switch');
    if (switchEl) switchEl.style.display = '';

    if (success) success.classList.remove('modal__success--visible');
  }

  // ─── Validation ───────────────────────────────

  const rules = {
    name:     { min: 2,  msg: 'Please enter your full name (at least 2 characters).' },
    email:    { regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, msg: 'Please enter a valid email address.' },
    password: { min: 8,  msg: 'Password must be at least 8 characters.' },
  };

  function validateInput(input) {
    const type = input.dataset.validate;
    const rule = rules[type];
    if (!rule) return true;

    const val = input.value.trim();
    let valid = true;

    if (rule.regex) valid = rule.regex.test(val);
    else if (rule.min) valid = val.length >= rule.min;

    const errorEl = input.closest('.modal__field').querySelector('.modal__error');

    if (!valid) {
      input.classList.add('modal__input--error');
      if (errorEl) {
        errorEl.textContent = rule.msg;
        errorEl.classList.add('modal__error--visible');
      }
    } else {
      input.classList.remove('modal__input--error');
      if (errorEl) {
        errorEl.textContent = '';
        errorEl.classList.remove('modal__error--visible');
      }
    }

    return valid;
  }

  // ─── Event listeners ──────────────────────────

  // Open modal via [data-modal] on any element
  document.addEventListener('click', e => {
    const trigger = e.target.closest('[data-modal]');
    if (trigger) {
      e.preventDefault();
      openModal('modal-' + trigger.dataset.modal);
    }
  });

  // Close on overlay click
  overlay.addEventListener('click', closeModal);

  // Close on × button
  modals.forEach(modal => {
    modal.querySelector('.modal__close')
      ?.addEventListener('click', closeModal);

    // Stop click propagation inside the box
    modal.querySelector('.modal__box')
      ?.addEventListener('click', e => e.stopPropagation());

    // Switch between modals
    modal.querySelectorAll('.modal__switch-btn').forEach(btn => {
      btn.addEventListener('click', () => openModal('modal-' + btn.dataset.open));
    });

    // Clear error + show/hide clear button on input
    modal.querySelectorAll('.modal__input').forEach(input => {
      const clearBtn = input.closest('.modal__input-wrap')?.querySelector('.modal__clear');

      input.addEventListener('input', () => {
        input.classList.remove('modal__input--error');
        const errorEl = input.closest('.modal__field')?.querySelector('.modal__error');
        if (errorEl) {
          errorEl.textContent = '';
          errorEl.classList.remove('modal__error--visible');
        }
        if (clearBtn) clearBtn.hidden = input.value.length === 0;
      });

      // Clear button click
      clearBtn?.addEventListener('click', () => {
        input.value = '';
        clearBtn.hidden = true;
        input.focus();
      });
    });

    // Eye toggle
    modal.querySelectorAll('.modal__eye').forEach(btn => {
      btn.addEventListener('click', () => {
        const wrap  = btn.closest('.modal__input-wrap');
        const input = wrap?.querySelector('.modal__input');
        const show  = btn.querySelector('.modal__eye-icon--show');
        const hide  = btn.querySelector('.modal__eye-icon--hide');

        if (!input) return;

        const isPassword = input.type === 'password';
        input.type       = isPassword ? 'text' : 'password';
        show.hidden      = isPassword;
        hide.hidden      = !isPassword;
        btn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
      });
    });

    // Form submit
    modal.querySelector('.modal__form')?.addEventListener('submit', e => {
      e.preventDefault();
      const inputs = [...modal.querySelectorAll('.modal__input[data-validate]')];
      const allValid = inputs.map(validateInput).every(Boolean);

      if (!allValid) return;

      const form    = modal.querySelector('.modal__form');
      const success = modal.querySelector('.modal__success');
      const switchEl = modal.querySelector('.modal__switch');

      form.style.display    = 'none';
      if (switchEl) switchEl.style.display = 'none';
      success.classList.add('modal__success--visible');
    });

    // Success "Close" button
    modal.querySelector('.modal__success-btn')
      ?.addEventListener('click', closeModal);
  });

  // Close on ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
}
