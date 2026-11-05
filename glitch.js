// Start page: "hacked" background over the hero video.
// Calm at rest (optional fine grain that drifts slowly, no flicker), then short,
// rare glitch bursts: horizontal bands of the video torn sideways with an RGB split.
(function () {
  const wrap = document.querySelector('.hack-glitch');
  if (!wrap) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fx = wrap.querySelector('canvas');
  const ctx = fx.getContext('2d');
  const video = document.querySelector('.bg-video');
  const poster = new Image();
  poster.src = (video && video.getAttribute('poster')) || 'hero-bg.jpg';
  const band = document.createElement('canvas'), bc = band.getContext('2d');
  const chan = document.createElement('canvas'), cc = chan.getContext('2d');

  // grain: one static tile, generated once; CSS only drifts it slowly
  let grain = wrap.querySelector('.grain');
  if (!grain) { grain = document.createElement('div'); grain.className = 'grain'; wrap.prepend(grain); }
  const tile = document.createElement('canvas');
  tile.width = tile.height = 192;
  const tc = tile.getContext('2d'), ti = tc.createImageData(192, 192);
  for (let i = 0; i < ti.data.length; i += 4) {
    const v = Math.random() * 255;
    ti.data[i] = ti.data[i + 1] = ti.data[i + 2] = v; ti.data[i + 3] = 255;
  }
  tc.putImageData(ti, 0, 0);
  grain.style.backgroundImage = 'url(' + tile.toDataURL() + ')';

  if (reduce) return;

  function resize() {
    fx.width = Math.ceil(window.innerWidth / 2);
    fx.height = Math.ceil(window.innerHeight / 2);
  }
  resize();
  window.addEventListener('resize', resize);

  function source() {
    if (video && video.readyState >= 2 && video.videoWidth && getComputedStyle(video).display !== 'none')
      return [video, video.videoWidth, video.videoHeight];
    if (poster.complete && poster.naturalWidth) return [poster, poster.naturalWidth, poster.naturalHeight];
    return null;
  }

  // one channel of a band (red or cyan), placed with its own offset
  function channel(color, x, y) {
    chan.width = band.width; chan.height = band.height;
    cc.drawImage(band, 0, 0);
    cc.globalCompositeOperation = 'multiply';
    cc.fillStyle = color; cc.fillRect(0, 0, chan.width, chan.height);
    cc.globalCompositeOperation = 'source-over';
    ctx.drawImage(chan, x, y);
  }

  function frame(strength) {
    const W = fx.width, H = fx.height;
    ctx.clearRect(0, 0, W, H);
    const s = source();
    if (!s) return;
    const [el, sw, sh] = s;
    const k = Math.max(W / sw, H / sh), ox = (W - sw * k) / 2, oy = (H - sh * k) / 2;
    const n = 2 + Math.floor(Math.random() * 3 * strength);
    ctx.globalCompositeOperation = 'lighter';
    for (let i = 0; i < n; i++) {
      const h = Math.max(2, Math.round(H * (0.01 + Math.random() * 0.07 * strength)));
      const y = Math.round(Math.random() * (H - h));
      const dx = Math.round((Math.random() - 0.5) * W * 0.1 * strength);
      const split = Math.round(2 + Math.random() * 5 * strength);
      band.width = W; band.height = h;
      bc.drawImage(el, 0, 0, sw, sh, ox, oy - y, sw * k, sh * k);
      channel('#ff0000', dx - split, y);
      channel('#00ffff', dx + split, y);
    }
    ctx.globalCompositeOperation = 'source-over';
    // a thin tear line now and then
    if (Math.random() < 0.6) {
      ctx.fillStyle = 'rgba(239,233,255,0.35)';
      ctx.fillRect(0, Math.round(Math.random() * H), W, 1);
    }
  }

  let timer = 0, running = true;
  function burst() {
    if (!running) return;
    const big = Math.random() < 0.5;
    const dur = big ? 480 + Math.random() * 280 : 110 + Math.random() * 170;
    const strength = big ? 1.4 : 0.8;
    const end = performance.now() + dur;
    wrap.classList.add('on');
    if (big) wrap.classList.add('big');
    (function tick() {
      if (performance.now() < end) { frame(strength); setTimeout(tick, 55 + Math.random() * 40); }
      else { ctx.clearRect(0, 0, fx.width, fx.height); wrap.classList.remove('on', 'big'); }
    })();
    timer = setTimeout(burst, 2000 + Math.random() * 3000);
  }
  timer = setTimeout(burst, 1000);

  // hook for the preview page
  window.eazrGlitch = {
    burst() { clearTimeout(timer); burst(); },
    stop() { running = false; clearTimeout(timer); },
  };
})();
