const menuBtn = document.querySelector('.menu');
const mobile = document.querySelector('.mobile-menu');

const closeMobileMenu = () => {
  if (!menuBtn || !mobile) return;
  mobile.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
  menuBtn.setAttribute('aria-label', 'Open menu');
  menuBtn.textContent = '☰';
};

if (menuBtn && mobile) {
  menuBtn.addEventListener('click', () => {
    const open = !mobile.classList.contains('open');
    mobile.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menuBtn.textContent = open ? '×' : '☰';
  });

  mobile.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', closeMobileMenu);
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMobileMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMobileMenu();
  });
}

document.querySelectorAll('.service').forEach(item => {
  const btn = item.querySelector('button');
  const panel = item.querySelector('.service-panel');

  if (!btn || !panel) return;

  btn.setAttribute('aria-expanded', item.getAttribute('aria-expanded') === 'true' ? 'true' : 'false');
  const panelId = panel.id || `service-panel-${Math.random().toString(36).slice(2)}`;
  panel.id = panelId;
  btn.setAttribute('aria-controls', panelId);

  btn.addEventListener('click', event => {
    event.stopPropagation();
    const expanded = item.getAttribute('aria-expanded') === 'true';
    item.setAttribute('aria-expanded', String(!expanded));
    btn.setAttribute('aria-expanded', String(!expanded));
  });
});

const form = document.querySelector('#consultation-form');
if (form) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Request received';
    }
    form.querySelector('.notice')?.classList.add('show');
  });
}
