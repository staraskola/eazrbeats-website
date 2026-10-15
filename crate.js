// The Crate page: loads crate.json and renders one genre per tab.
let lastDocs = [];
// ---------------------------------------------------------------------
// The Crate — live data
// ---------------------------------------------------------------------
const genresEl = document.getElementById('genres');
const tabsEl = document.getElementById('genre-tabs');
let activeGenre = 'house';
const updatedEl = document.getElementById('updated');

function parseISODate(s) {
  const parts = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(s || ''));
  if (!parts) return null;
  return new Date(Date.UTC(+parts[1], +parts[2] - 1, +parts[3]));
}

function startOfWeek(d) {
  const day = d.getUTCDay();
  const diff = (day === 0 ? -6 : 1) - day;
  const monday = new Date(d);
  monday.setUTCDate(d.getUTCDate() + diff);
  return monday;
}

function fmts() {
  return {
    date: new Intl.DateTimeFormat(T[lang].locale, { day: 'numeric', month: 'long', timeZone: 'UTC' }),
    day: new Intl.DateTimeFormat(T[lang].locale, { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' }),
  };
}

function confirmChips(t) {
  const confirms = Array.isArray(t.confirmations) ? t.confirmations : null;
  if (!confirms || !confirms.length) return '';
  return `<div class="confirms">${confirms.map(c => {
    const label = escapeHtml(c.source || T[lang].quelle);
    return c.sourceUrl
      ? `<span class="confirm-chip"><a href="${escapeHtml(c.sourceUrl)}" target="_blank" rel="noopener">${label}</a></span>`
      : `<span class="confirm-chip">${label}</span>`;
  }).join('')}</div>`;
}

function trackCard(t, hot) {
  const title = escapeHtml(t.title || T[lang].unbenannt);
  const artist = escapeHtml(t.artist || '');
  const link = t.sourceUrl ? `<a href="${escapeHtml(t.sourceUrl)}" target="_blank" rel="noopener">${title}</a>` : title;
  return `
    <div class="track${hot ? ' hot' : ''}">
      <div class="track-top">
        <div class="track-name">${link}${artist ? ` <span class="track-artist">— ${artist}</span>` : ''}</div>
        ${t.source ? `<div class="track-source">${escapeHtml(t.source)}</div>` : ''}
      </div>
      ${t.note ? `<div class="track-note">${escapeHtml(t.note)}</div>` : ''}
      ${confirmChips(t)}
    </div>
  `;
}

function emptyBlock(title, text) {
  return `
    <div class="empty">
      <div class="empty-title">${escapeHtml(title)}</div>
      <p>${escapeHtml(text)}</p>
    </div>
  `;
}

function renderWeeklyHtml(docs) {
  if (!docs.length) return emptyBlock(T[lang].weeklyEmptyTitle, T[lang].weeklyEmptyText);
  const sorted = docs
    .map(d => ({ ...d, _date: parseISODate(d.dateAdded) }))
    .filter(d => d._date)
    .sort((a, b) => b._date - a._date);
  return sorted.map(t => trackCard(t, true)).join('');
}

function renderDailyHtml(docs) {
  if (!docs.length) return emptyBlock(T[lang].dailyEmptyTitle, T[lang].dailyEmptyText);
  const { day: dayFmt } = fmts();
  const withDates = docs
    .map(d => ({ ...d, _date: parseISODate(d.dateAdded) }))
    .filter(d => d._date)
    .sort((a, b) => b._date - a._date);

  const weeks = new Map();
  for (const t of withDates) {
    const monday = startOfWeek(t._date);
    const key = monday.toISOString().slice(0, 10);
    if (!weeks.has(key)) weeks.set(key, { monday, tracks: [] });
    weeks.get(key).tracks.push(t);
  }

  const weekKeys = [...weeks.keys()].sort().reverse();
  return weekKeys.map(wk => {
    const { tracks } = weeks.get(wk);
    const days = new Map();
    for (const t of tracks) {
      const dk = t.dateAdded;
      if (!days.has(dk)) days.set(dk, []);
      days.get(dk).push(t);
    }
    const dayKeys = [...days.keys()].sort().reverse();
    return dayKeys.map(dk => `
        <div class="week-label">${dayFmt.format(parseISODate(dk))}</div>
        ${days.get(dk).map(t => trackCard(t, false)).join('')}
      `).join('');
  }).join('');
}


function render(docs) {
  lastDocs = docs;
  const { date: dateFmt } = fmts();

  tabsEl.innerHTML = GENRES.map(g => `<button type="button" role="tab" id="tab-${g.key}" aria-controls="genre-panel" aria-selected="${g.key === activeGenre}" data-genre="${g.key}">${escapeHtml(g.label)}</button>`).join('');
  tabsEl.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      activeGenre = btn.dataset.genre;
      render(lastDocs);
    });
  });

  const g = GENRES.find(x => x.key === activeGenre) || GENRES[0];
  const genreDocs = docs.filter(d => (d.genre || 'house') === g.key);
  const weekly = genreDocs.filter(d => d.tier === 'weekly');
  const daily = genreDocs.filter(d => d.tier !== 'weekly');
  genresEl.innerHTML = `
    <div class="genre-block" id="genre-panel" role="tabpanel" aria-labelledby="tab-${g.key}">
      <div class="section">
        <div class="prompt-line">
          <span class="prompt">eazr@crate:~$</span><span class="cmd">cat ${g.key}/weekly-hot</span>
          <span class="section-tag">${escapeHtml(T[lang].weeklyTag)}</span>
        </div>
        ${renderWeeklyHtml(weekly)}
      </div>

      <div class="section">
        <div class="prompt-line">
          <span class="prompt">eazr@crate:~$</span><span class="cmd">cat ${g.key}/daily-hot</span>
          <span class="section-tag">${escapeHtml(T[lang].dailyTag)}</span>
        </div>
        ${renderDailyHtml(daily)}
      </div>
    </div>
  `;

  const withDates = docs.map(d => parseISODate(d.dateAdded)).filter(Boolean).sort((a, b) => b - a);
  updatedEl.textContent = withDates.length ? dateFmt.format(withDates[0]) : '–';
}

async function boot() {
  try {
    const res = await fetch('crate.json', { cache: 'no-cache' });
    const data = await res.json();
    render(Array.isArray(data.tracks) ? data.tracks : []);
  } catch (e) {
    render([]);
  }
}

boot();

window.onLangChange = () => render(lastDocs);
