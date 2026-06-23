// TAJI Landing Page JS

document.addEventListener('DOMContentLoaded', function () {
  // Sticky nav shadow on scroll
  var nav = document.getElementById('taji-main-nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  // Mobile hamburger drawer
  var hamburger = document.getElementById('taji-nav-hamburger');
  var drawer = document.getElementById('taji-nav-drawer');
  if (hamburger && drawer) {
    hamburger.addEventListener('click', function () {
      var isOpen = drawer.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      drawer.setAttribute('aria-hidden', String(!isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    drawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        drawer.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        drawer.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });
  }

  // Cart forms: let Shopify's native theme JS handle AJAX cart if present.
  // This file intentionally does NOT intercept form submissions — the theme's
  // own cart drawer / AJAX handler (e.g. Dawn's cart-notification.js) will
  // pick up the standard product form submission automatically.
});
