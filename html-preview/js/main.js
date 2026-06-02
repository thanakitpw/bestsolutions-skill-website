/* Best Solutions Skill — interactions (เติมทีละ feature) */
'use strict';

document.addEventListener('DOMContentLoaded', function () {
  initNav();
  initAccordions();
  initScrollFx();
});

/* Navbar style-on-scroll + reveal-on-scroll */
function initScrollFx() {
  var nav = document.getElementById('nav');
  if (nav) {
    var onScroll = function () { nav.classList.toggle('nav--scrolled', window.scrollY > 40); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  var reveals = document.querySelectorAll('.js-reveal');
  if (!('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('in-view'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  reveals.forEach(function (el) { io.observe(el); });
}

/* Accordions — [data-accordion] group; add data-single for one-open-at-a-time */
function initAccordions() {
  function open(btn, panel) { btn.setAttribute('aria-expanded', 'true'); panel.style.maxHeight = panel.scrollHeight + 'px'; }
  function close(btn, panel) { btn.setAttribute('aria-expanded', 'false'); panel.style.maxHeight = null; }

  document.querySelectorAll('[data-accordion]').forEach(function (group) {
    var single = group.hasAttribute('data-single');
    var triggers = Array.prototype.slice.call(group.querySelectorAll('.acc-trigger'));

    triggers.forEach(function (btn) {
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      if (!panel) return;
      if (btn.getAttribute('aria-expanded') === 'true') open(btn, panel);

      btn.addEventListener('click', function () {
        var isOpen = btn.getAttribute('aria-expanded') === 'true';
        if (single) {
          triggers.forEach(function (other) {
            if (other !== btn) {
              var op = document.getElementById(other.getAttribute('aria-controls'));
              if (op) close(other, op);
            }
          });
        }
        if (isOpen) close(btn, panel); else open(btn, panel);
      });
    });
  });

  // keep open panels sized correctly after viewport reflow
  window.addEventListener('resize', function () {
    document.querySelectorAll('.acc-trigger[aria-expanded="true"]').forEach(function (btn) {
      var p = document.getElementById(btn.getAttribute('aria-controls'));
      if (p) p.style.maxHeight = p.scrollHeight + 'px';
    });
  });
}

/* Mobile nav toggle */
function initNav() {
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('navmenu');
  if (!toggle || !menu) return;

  function setOpen(open) {
    menu.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'ปิดเมนู' : 'เปิดเมนู');
  }

  toggle.addEventListener('click', function () {
    setOpen(!menu.classList.contains('open'));
  });
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { setOpen(false); });
  });
}
