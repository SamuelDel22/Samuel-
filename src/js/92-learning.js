/* AERIS // learning layer
   - Bilingual text for the learning sections through data-es / data-es-aria attributes
     (English stays in the HTML, Spanish sits next to it, so each pair is easy to edit).
   - Builds the 160-fish pictogram and runs the myth/fact cards.
   No dependencies; safe if any element is missing. */
(function () {
  'use strict';

  function isEs() { return window.currentLang === 'es'; }

  /* ---------- bilingual attributes ---------- */
  function remember() {
    document.querySelectorAll('[data-es]').forEach(function (el) {
      if (el.dataset.en === undefined) el.dataset.en = el.innerHTML;
    });
    document.querySelectorAll('[data-es-aria]').forEach(function (el) {
      if (el.dataset.enAria === undefined) el.dataset.enAria = el.getAttribute('aria-label') || '';
    });
  }

  function apply() {
    var es = isEs();
    document.querySelectorAll('[data-es]').forEach(function (el) {
      var next = es ? el.getAttribute('data-es') : el.dataset.en;
      if (next !== undefined && next !== null && el.innerHTML !== next) el.innerHTML = next;
    });
    document.querySelectorAll('[data-es-aria]').forEach(function (el) {
      el.setAttribute('aria-label', es ? el.getAttribute('data-es-aria') : el.dataset.enAria);
    });
  }

  /* ---------- 160-fish pictogram (92 La Mojana · 38 Bajo Cauca · 30 control) ---------- */
  function buildDots() {
    var box = document.getElementById('lgDots');
    if (!box || box.childElementCount) return;
    var groups = [['g1', 92], ['g2', 38], ['g3', 30]];
    var html = '', n = 0;
    groups.forEach(function (g) {
      for (var i = 0; i < g[1]; i++) { html += '<i class="' + g[0] + '" style="--i:' + (n++) + '"></i>'; }
    });
    box.innerHTML = html;
  }

  /* ---------- myth / fact cards ---------- */
  function bindMyths() {
    document.querySelectorAll('.lgMyth').forEach(function (card) {
      card.addEventListener('click', function () {
        var open = card.getAttribute('aria-pressed') === 'true';
        card.setAttribute('aria-pressed', open ? 'false' : 'true');
        if (!open && typeof window.playFX === 'function') {
          try { window.playFX(card.dataset.verdict === 'fact' ? 'correct' : 'select'); } catch (e) { /* sound is optional */ }
        }
      });
    });
  }

  function boot() {
    remember();
    buildDots();
    bindMyths();
    apply();
    window.addEventListener('aeris:language', function () { remember(); apply(); });
    var sw = document.getElementById('langSwitch');
    if (sw) sw.addEventListener('click', function () { setTimeout(apply, 60); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();

  window.AERIS_LEARN = { apply: apply };
})();
