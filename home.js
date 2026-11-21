// Start page: live counts (hero stats) and a shuffle per box (The Crate = house, THE VOID = techno).
const BOXES = {
  crate: { file: 'crate.json', genres: GENRES, spotify: SPOTIFY_PLAYLIST, tracks: [], current: null },
  void: { file: 'void.json', genres: VOID_GENRES, spotify: VOID_SPOTIFY, tracks: [], current: null },
};

function genreLabelIn(box, key) {
  const g = box.genres.find(x => x.key === key);
  return g ? g.label : '';
}

function renderDig(name) {
  const box = BOXES[name];
  const out = document.getElementById('dig-' + name);
  if (!out) return;
  const t = box.current;
  if (!t) { out.innerHTML = `<p class="dig-empty">${escapeHtml(T[lang].digEmpty)}</p>`; return; }
  out.innerHTML = `
    <div class="dig-cmd"><span class="prompt">eazr@${name}:~$</span> shuf -n1</div>
    <a class="dig-track" href="${box.spotify}" target="_blank" rel="noopener">
      <span class="dig-genre">${escapeHtml(genreLabelIn(box, t.genre))}</span>
      <span class="dig-title">${escapeHtml(t.title || T[lang].unbenannt)}</span>
      <span class="dig-artist">${escapeHtml(t.artist || '')}</span>
      <span class="dig-listen">${escapeHtml(T[lang].digListen)}</span>
    </a>`;
}

function dig(name) {
  const box = BOXES[name];
  const pool = box.tracks.filter(t => t.genre);
  if (!pool.length) { box.current = null; renderDig(name); return; }
  let next = pool[Math.floor(Math.random() * pool.length)];
  if (pool.length > 1 && next === box.current) next = pool[(pool.indexOf(next) + 1) % pool.length];
  box.current = next;
  renderDig(name);
}

document.querySelectorAll('[data-dig]').forEach(btn => btn.addEventListener('click', () => dig(btn.dataset.dig)));

window.onLangChange = () => { renderDig('crate'); renderDig('void'); };

Object.keys(BOXES).forEach(async name => {
  const box = BOXES[name];
  try {
    const res = await fetch(box.file, { cache: 'no-cache' });
    const data = await res.json();
    box.tracks = Array.isArray(data.tracks) ? data.tracks : [];
  } catch (e) {
    box.tracks = [];
  }
  const n = box.tracks.length ? String(box.tracks.length) : '–';
  ['stat-' + name, 'n-' + name].forEach(id => { const el = document.getElementById(id); if (el) el.textContent = n; });
  dig(name);
});
