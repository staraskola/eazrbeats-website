// Start page: "hacked" background — animated static noise + glitch bursts over the hero video.
(function () {
  const wrap = document.querySelector('.hack-glitch');
  if (!wrap) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const c = wrap.querySelector('canvas');
  const ctx = c.getContext('2d');
  const W = 160, H = 90;
  c.width = W; c.height = H;
  const img = ctx.createImageData(W, H);
  function noise() {
    const d = img.data;
    for (let i = 0; i < d.length; i += 4) {
      const v = Math.random() * 255;
      d[i] = v; d[i + 1] = v * 0.75; d[i + 2] = v * 0.85; d[i + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
  }
  noise();
  if (reduce) return;
  let last = 0;
  function loop(t) {
    if (t - last > 70) { noise(); last = t; }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
  // random glitch bursts
  function burst() {
    const big = Math.random() < 0.35;
    wrap.classList.add('on');
    if (big) wrap.classList.add('big');
    setTimeout(() => wrap.classList.remove('on', 'big'), (big ? 380 : 160) + Math.random() * 380);
    setTimeout(burst, 1800 + Math.random() * 4200);
  }
  setTimeout(burst, 1200);
})();
