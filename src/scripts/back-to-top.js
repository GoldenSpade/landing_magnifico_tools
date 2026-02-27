export function initBackToTop(lenis) {
  const btn = document.querySelector('.back-to-top');

  lenis.on('scroll', ({ scroll }) => {
    btn.classList.toggle('back-to-top--visible', scroll > 400);
  });

  btn.addEventListener('click', () => {
    lenis.scrollTo(0);
  });
}
