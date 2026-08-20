/* ============================================================
   Neha Mishra: Portfolio
   Vanilla JS. Every behaviour here is an enhancement: the page
   is fully readable and navigable with this file removed.
   ============================================================ */

(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var $  = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* ----------------------------------------------------------
     1. THEME: light by default, dark opt-in, persisted
     ---------------------------------------------------------- */

  var THEME_KEY = 'nm-theme';
  var THEME_COLORS = { light: '#FAF6F0', dark: '#08090A' };
  var themeToggle = $('#theme-toggle');
  var themeMeta = $('meta[name="theme-color"]');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (themeMeta) themeMeta.setAttribute('content', THEME_COLORS[theme]);
    if (themeToggle) {
      themeToggle.setAttribute(
        'aria-label',
        theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
      );
    }
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
  }

  applyTheme(root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
  }

  /* ----------------------------------------------------------
     2. HEADER: scrolled state
     ---------------------------------------------------------- */

  var header = $('#header');
  var ticking = false;

  function syncHeader() {
    if (header) header.setAttribute('data-scrolled', window.scrollY > 12 ? 'true' : 'false');
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(syncHeader);
    }
  }, { passive: true });

  syncHeader();

  /* ----------------------------------------------------------
     3. MOBILE MENU
     ---------------------------------------------------------- */

  var navToggle = $('#nav-toggle');
  var menu = $('#mobile-menu');

  function setMenu(open) {
    if (!menu || !navToggle) return;
    menu.setAttribute('data-open', open ? 'true' : 'false');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  if (navToggle && menu) {
    navToggle.addEventListener('click', function () {
      setMenu(menu.getAttribute('data-open') !== 'true');
    });

    $$('.menu__link', menu).forEach(function (link) {
      link.addEventListener('click', function () { setMenu(false); });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.getAttribute('data-open') === 'true') {
        setMenu(false);
        navToggle.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 900) setMenu(false);
    });
  }

  /* ----------------------------------------------------------
     4. SCROLL-SPY: highlights the active nav link
     ---------------------------------------------------------- */

  var sections = $$('main section[id]');
  var navLinks = $$('.nav__link');

  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    var visible = {};

    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        visible[entry.target.id] = entry.isIntersecting ? entry.intersectionRatio : 0;
      });

      var bestId = null;
      var bestRatio = 0;
      sections.forEach(function (s) {
        var r = visible[s.id] || 0;
        if (r > bestRatio) { bestRatio = r; bestId = s.id; }
      });

      navLinks.forEach(function (link) {
        var match = bestId && link.getAttribute('href') === '#' + bestId;
        if (match) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    }, {
      rootMargin: '-25% 0px -45% 0px',
      threshold: [0, 0.15, 0.35, 0.6, 1]
    });

    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ----------------------------------------------------------
     5. SCROLL REVEAL: staggered, fires once
     ---------------------------------------------------------- */

  var reveals = $$('.reveal');

  if (!reveals.length) {
    /* nothing to do */
  } else if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    /* Stagger siblings inside the same container: 50ms per item, capped */
    reveals.forEach(function (el) {
      var parent = el.parentNode;
      var n = parent.__revealCount || 0;
      el.style.transitionDelay = Math.min(n * 50, 300) + 'ms';
      parent.__revealCount = n + 1;
    });

    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        obs.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    reveals.forEach(function (el) { revealObserver.observe(el); });

    /* Failsafe: if the observer never fires (suspended/prerendered tabs),
       nothing above the fold should stay invisible. */
    setTimeout(function () {
      reveals.forEach(function (el) {
        if (el.classList.contains('is-in')) return;
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add('is-in');
          revealObserver.unobserve(el);
        }
      });
    }, 2500);
  }

  /* ----------------------------------------------------------
     6. HERO ROLE ROTATOR
     ---------------------------------------------------------- */

  var rotator = $('#role-rotator');

  if (rotator) {
    var roles = [
      'Software Engineer',
      'Cloud Architect',
      'Machine Learning Explorer',
      'Painter',
      'Stand-up Comedian',
      'Literature Devotee',
      'Hackathon Champion'
    ];
    var roleIndex = 0;

    if (!reduceMotion) {
      setInterval(function () {
        if (document.hidden) return;
        rotator.setAttribute('data-out', 'true');
        setTimeout(function () {
          roleIndex = (roleIndex + 1) % roles.length;
          rotator.textContent = roles[roleIndex];
          rotator.setAttribute('data-out', 'false');
        }, 280);
      }, 2800);
    }
  }

  /* ----------------------------------------------------------
     7. TIMELINE: click to expand
     ---------------------------------------------------------- */

  function setCard(card, open) {
    var toggleBtn = $('.tree-card__toggle', card);
    card.classList.toggle('is-active', open);
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggleBtn.setAttribute('aria-label', open ? 'Hide role details' : 'Show role details');
    }
  }

  $$('.tree-card').forEach(function (card) {
    var toggleBtn = $('.tree-card__toggle', card);

    if (toggleBtn) {
      toggleBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        setCard(card, !card.classList.contains('is-active'));
      });
    }

    /* The whole card is a convenience target for pointer users */
    card.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('a, button')) return;
      setCard(card, !card.classList.contains('is-active'));
    });
  });

  /* Open the current role by default on wide screens */
  var currentCard = $('.tree__item.is-current .tree-card');
  if (currentCard && window.innerWidth >= 700) setCard(currentCard, true);

  /* ----------------------------------------------------------
     8. STAT COUNTERS
     ---------------------------------------------------------- */

  var counters = $$('.stat__num[data-count]');

  function runCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    if (isNaN(target)) return;

    if (reduceMotion) { el.textContent = target + suffix; return; }

    var duration = 1100;
    var start = null;

    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) window.requestAnimationFrame(step);
    }

    window.requestAnimationFrame(step);
  }

  if (counters.length && 'IntersectionObserver' in window) {
    var countObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        runCounter(entry.target);
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.5 });

    counters.forEach(function (el) { countObserver.observe(el); });
  }

  /* ----------------------------------------------------------
     9. FOOTER YEAR
     ---------------------------------------------------------- */

  var yearEl = $('#year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

})();
