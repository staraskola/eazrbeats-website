// EMBERS countdown on /live. Counts days to the target; with data-exact="1" also hours/min/sec.
(function () {
  var el = document.querySelector('.countdown');
  if (!el) return;
  var target = Date.parse(el.dataset.target), exact = el.dataset.exact === '1';
  var val = el.querySelector('.cd-val');
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function tick() {
    var ms = target - Date.now();
    if (isNaN(ms)) return;
    if (ms <= 0) { el.querySelector('.cd-label').textContent = 'STATUS'; val.textContent = 'LIVE LOADING'; return; }
    var s = Math.floor(ms / 1000), d = Math.floor(s / 86400);
    if (exact) {
      val.textContent = d + 'D ' + pad(Math.floor(s % 86400 / 3600)) + ':' + pad(Math.floor(s % 3600 / 60)) + ':' + pad(s % 60);
    } else {
      val.textContent = Math.ceil(ms / 86400000) + (Math.ceil(ms / 86400000) === 1 ? ' DAY' : ' DAYS');
    }
  }
  tick();
  setInterval(tick, exact ? 1000 : 60000);
})();
