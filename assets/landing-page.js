// TAJI Landing Page JS

function tajiInitLogoOverlay() {
  var logoOverlay = document.getElementById('taji-logo-scroll-overlay');
  if (!logoOverlay) return;
  var fadeEnd = window.innerHeight * 0.5;
  function update() {
    var scrollY = window.scrollY || window.pageYOffset;
    if (scrollY >= fadeEnd) {
      logoOverlay.style.opacity = '0';
      logoOverlay.style.pointerEvents = 'none';
    } else {
      var progress = scrollY / fadeEnd;
      var opacity = 1 - progress;
      var scale = 1 - progress * 0.55;
      logoOverlay.style.opacity = opacity;
      logoOverlay.style.transform = 'translateX(-50%) scale(' + scale + ')';
    }
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
}

document.addEventListener('DOMContentLoaded', function () {
  // Sticky nav shadow on scroll
  var nav = document.getElementById('taji-main-nav');
  var announcementBar = document.querySelector('.taji-announcement-bar');
  if (nav) {
    window.addEventListener('scroll', function () {
      var threshold = window.innerWidth <= 768 ? window.innerHeight * 0.8 : 20;
      var isScrolled = window.scrollY > threshold;
      nav.classList.toggle('scrolled', isScrolled);
      if (announcementBar) announcementBar.classList.toggle('scrolled', isScrolled);
    });
  }

  // Mobile hamburger drawer
  var hamburger = document.getElementById('taji-nav-hamburger');
  var drawer = document.getElementById('taji-nav-drawer');
  if (hamburger && drawer) {
    var drawerNav = document.getElementById('taji-main-nav');
    hamburger.addEventListener('click', function () {
      var isOpen = drawer.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      if (drawerNav) drawerNav.classList.toggle('drawer-open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      drawer.setAttribute('aria-hidden', String(!isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    drawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        drawer.classList.remove('open');
        hamburger.classList.remove('open');
        if (drawerNav) drawerNav.classList.remove('drawer-open');
        hamburger.setAttribute('aria-expanded', 'false');
        drawer.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });
  }

  // Logo overlay
  tajiInitLogoOverlay();

  // Cart forms: let Shopify's native theme JS handle AJAX cart if present.
  // This file intentionally does NOT intercept form submissions — the theme's
  // own cart drawer / AJAX handler (e.g. Dawn's cart-notification.js) will
  // pick up the standard product form submission automatically.
});

// Also run immediately in case DOMContentLoaded already fired
if (document.readyState === 'interactive' || document.readyState === 'complete') {
  tajiInitLogoOverlay();
}
