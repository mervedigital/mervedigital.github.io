const header = document.querySelector('[data-header]');
const toggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');
const firstNavLink = nav?.querySelector('a');

const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

const closeMenu = ({ restoreFocus = false } = {}) => {
  nav?.classList.remove('open');
  toggle?.setAttribute('aria-expanded', 'false');
  toggle?.setAttribute('aria-label', 'Menüyü aç');

  if (restoreFocus) toggle?.focus();
};

toggle?.addEventListener('click', () => {
  const isOpen = nav?.classList.toggle('open') ?? false;
  toggle.setAttribute('aria-expanded', String(isOpen));
  toggle.setAttribute('aria-label', isOpen ? 'Menüyü kapat' : 'Menüyü aç');

  if (isOpen) firstNavLink?.focus();
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape' || !nav?.classList.contains('open')) return;

  event.preventDefault();
  closeMenu({ restoreFocus: true });
});

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  closeMenu();
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

document.querySelectorAll('[data-accordion] details').forEach((item) => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    document.querySelectorAll('[data-accordion] details').forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});
