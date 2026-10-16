// Start page: "Fresh in the Crate" (latest weekly picks) and "Dig the Crate" (random track by genre).
let homeTracks = [];
let digGenre = 'all';
let digCurrent = null;

const freshEl = document.getElementById('fresh');
const digTabsEl = document.getElementById('dig-tabs');
const digOutEl = document.getElementById('dig-out');
const digBtn = document.getElementById('dig-btn');

function genreLabel(key) {
  const g = GENRES.find(x => x.key === key);
  return g ? g.label : 'House';
}

function pickCard(t, extraClass) {
  const title = escapeHtml(t.title || T[lang].unbenannt);
  const artist = escapeHtml(t.artist || '');
  const listen = `<a class="pick-listen" href="${SPOTIFY_PLAYLIST}" target="_blank" rel="noopener">${escapeHtml(T[lang].digListen)}</a>`;
  return `
    <div class="pick${extraClass ? ' ' + extraClass : ''}">
      <span class="kicker">${escapeHtml(genreLabel(t.genre || 'house'))}</span>
      <div class="pick-title">${title}</div>
      <div class="pick-artist">${artist}</div>
      ${listen}
    </div>`;
}

function renderFresh() {
  // newest weekly pick per genre, so all genres show up
  const weekly = homeTracks.filter(t => t.tier === 'weekly' && t.genre)
    .sort((a, b) => String(b.dateAdded).localeCompare(String(a.dateAdded)));
  const seen = new Set();
  const picks = [];
  for (const t of weekly) {
    if (seen.has(t.genre)) continue;
    seen.add(t.genre);
    picks.push(t);
  }
  freshEl.innerHTML = picks.slice(0, 4).map(t => pickCard(t)).join('');
}

function renderDigTabs() {
  const opts = [{ key: 'all', label: T[lang].digAll }, ...GENRES];
  digTabsEl.innerHTML = opts.map(g =>
    `<button type="button" aria-pressed="${g.key === digGenre}" data-genre="${g.key}">${escapeHtml(g.label)}</button>`
  ).join('');
  digTabsEl.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      digGenre = btn.dataset.genre;
      renderDigTabs();
      dig();
    });
  });
}

function dig() {
  const pool = homeTracks.filter(t => t.genre && (digGenre === 'all' || t.genre === digGenre));
  if (!pool.length) {
    digCurrent = null;
    digOutEl.innerHTML = `<p class="dig-empty">${escapeHtml(T[lang].digEmpty)}</p>`;
    return;
  }
  let next = pool[Math.floor(Math.random() * pool.length)];
  if (pool.length > 1 && digCurrent && next === digCurrent) {
    next = pool[(pool.indexOf(next) + 1) % pool.length];
  }
  digCurrent = next;
  renderDigOut();
}

function renderDigOut() {
  if (!digCurrent) return;
  const cmd = `shuf -n1 ./${digGenre === 'all' ? '*' : digGenre}`;
  digOutEl.innerHTML = `
    <div class="dig-cmd"><span class="prompt">eazr@crate:~$</span> ${escapeHtml(cmd)}</div>
    ${pickCard(digCurrent, 'hot')}`;
}

if (digBtn) digBtn.addEventListener('click', dig);

window.onLangChange = () => {
  renderFresh();
  renderDigTabs();
  renderDigOut();
};

(async function bootHome() {
  try {
    const res = await fetch('crate.json', { cache: 'no-cache' });
    const data = await res.json();
    homeTracks = Array.isArray(data.tracks) ? data.tracks : [];
  } catch (e) {
    homeTracks = [];
  }
  renderFresh();
  renderDigTabs();
  dig();
})();
