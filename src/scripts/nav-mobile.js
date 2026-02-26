const burger = document.querySelector('.nav__burger');
const mobileNav = document.querySelector('.nav-mobile');

burger.addEventListener('click', () => {
  burger.classList.toggle('is-active');
  mobileNav.classList.toggle('nav-mobile--open');
});

// Закрыть при клике на ссылку в мобильном меню
document.querySelectorAll('.nav-mobile__link').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('is-active');
    mobileNav.classList.remove('nav-mobile--open');
  });
});
