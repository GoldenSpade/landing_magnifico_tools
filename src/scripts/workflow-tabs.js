const tabs = document.querySelectorAll('.workflow__tab');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('workflow__tab--active'));
    tab.classList.add('workflow__tab--active');
  });
});
