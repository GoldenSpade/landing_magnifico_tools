const tabs = document.querySelectorAll('.workflow__tab');
const desc = document.querySelector('.workflow__desc');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    if (tab.classList.contains('workflow__tab--active')) return;

    tabs.forEach(t => t.classList.remove('workflow__tab--active'));
    tab.classList.add('workflow__tab--active');

    desc.style.opacity = '0';
    setTimeout(() => {
      desc.textContent = tab.dataset.desc;
      desc.style.opacity = '1';
    }, 200);
  });
});
