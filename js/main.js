/* Best Solutions Skill — interactions (เติมทีละ feature) */
'use strict';

document.addEventListener('DOMContentLoaded', function () {
  initNav();
});

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
