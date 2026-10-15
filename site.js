// Shared on every page: texts DE/EN, language toggle, active menu entry.

// ---------------------------------------------------------------------
// i18n
// ---------------------------------------------------------------------
const T = {
  de: {
    navAbout: 'About',
    navEvents: 'Events',
    badgeComingSoon: 'COMING SOON',
    heroTagline: 'MÜNCHNER HOUSE &amp; TECHNO — NEUE SETS, SESSIONS UND SHOWS FOLGEN BALD.',
    ctaCrate: 'The Crate →',
    aboutText: 'EAZr Beats Collective ist ein Münchner House- und Techno-Kollektiv. Wir spielen House, Melodic House, Afro und Latin House, bauen eigene Formate auf und arbeiten an eigenen Tracks. Kein Label, keine Agentur, sondern Leute, die Bock auf gute Abende haben.',
    roleNoah: 'Gründer · DJ',
    roleWiktor: 'Host · MC · Live',
    crewOpenTitle: 'Du?',
    crewOpenText: 'Wir suchen DJs aus München. Schick uns deinen Mix an booking@eazrbeats.de.',
    openAirKicker: 'Sommer 2027 · München',
    openAirText: 'Unsere eigene Open-Air-Reihe: House, Tech House, Afro und Latin House unter freiem Himmel. Name, Datum und Ort folgen.',
    sessionsKicker: 'Format · in Arbeit',
    sessionsText: 'Sets mit der Crowd direkt ums Pult, gefilmt und gestreamt. Mehr dazu bald auf Instagram.',
    bookingText: 'Club, Bar, Open Air oder Privat: Schreib uns kurz, wann, wo und was du dir vorstellst. Wir melden uns.',
    bookingBtn: 'Anfrage senden',
    teaserCrateText: 'Tracks, die gerade in DJ-Sets laufen. Täglich geprüft, jeden Sonntag neu kuratiert.',
    teaserCrateBtn: 'Zur Crate →',
    teaserBookingText: 'Club, Bar, Open Air oder Privat? Schreib uns.',
    teaserBookingBtn: 'Zum Booking →',
    bookingWhat: 'Was wir mitbringen',
    bookingWhatText: 'House, Melodic House, Afro und Latin House. DJ-Sets mit Host und MC, auf Wunsch gefilmt.',
    bookingInfo: 'Was in die Mail gehört',
    bookingInfoText: 'Datum, Ort, ungefähre Gästezahl, Spielzeit und ob Technik vor Ort ist.',
    crateSub: 'Tracks, die gerade in DJ-Sets laufen. Jeder Eintrag ist von mindestens zwei unabhängigen Quellen bestätigt.',
    crateFooter: 'Automatisch gepflegt · Daily Hot täglich geprüft · Weekly Hot jeden Sonntag neu kuratiert',
    crateUpdatedLabel: 'zuletzt aktualisiert:',
    weeklyTag: 'kuratierte Wochen-Highlights',
    dailyTag: 'täglich, mit harter Schwelle',
    weeklyEmptyTitle: 'Noch keine Weekly-Highlights',
    weeklyEmptyText: 'Die wöchentliche Kuratierung läuft sonntags. Schau danach wieder vorbei.',
    dailyEmptyTitle: 'Noch nichts, das die Schwelle genommen hat',
    dailyEmptyText: 'Die tägliche Recherche läuft, trägt aber nur ein, was von mindestens zwei unabhängigen Quellen bestätigt wird.',
    locale: 'de-DE',
    unbenannt: 'Unbenannt',
    quelle: 'Quelle',
  },
  en: {
    navAbout: 'About',
    navEvents: 'Events',
    badgeComingSoon: 'COMING SOON',
    heroTagline: 'MUNICH HOUSE &amp; TECHNO — NEW SETS, SESSIONS AND SHOWS DROPPING SOON.',
    ctaCrate: 'The Crate →',
    aboutText: 'EAZr Beats Collective is a house and techno collective from Munich. We play house, melodic house, afro and latin house, build our own formats and work on our own tracks. No label, no agency, just people who live for a good night.',
    roleNoah: 'Founder · DJ',
    roleWiktor: 'Host · MC · Live',
    crewOpenTitle: 'You?',
    crewOpenText: 'We are looking for DJs from Munich. Send your mix to booking@eazrbeats.de.',
    openAirKicker: 'Summer 2027 · Munich',
    openAirText: 'Our own open air series: house, tech house, afro and latin house under open sky. Name, date and venue TBA.',
    sessionsKicker: 'Format · in the works',
    sessionsText: 'Sets with the crowd right around the decks, filmed and streamed. More soon on Instagram.',
    bookingText: 'Club, bar, open air or private: tell us when, where and what you have in mind. We will get back to you.',
    bookingBtn: 'Send request',
    teaserCrateText: 'Tracks running in DJ sets right now. Checked daily, curated fresh every Sunday.',
    teaserCrateBtn: 'Open the Crate →',
    teaserBookingText: 'Club, bar, open air or private? Get in touch.',
    teaserBookingBtn: 'Go to booking →',
    bookingWhat: 'What we bring',
    bookingWhatText: 'House, melodic house, afro and latin house. DJ sets with host and MC, filmed on request.',
    bookingInfo: 'What to include',
    bookingInfoText: 'Date, venue, rough guest count, set length and whether gear is on site.',
    crateSub: 'Tracks running in DJ sets right now. Every entry is confirmed by at least two independent sources.',
    crateFooter: 'Automatically maintained · Daily Hot checked daily · Weekly Hot curated fresh every Sunday',
    crateUpdatedLabel: 'last updated:',
    weeklyTag: 'curated weekly highlights',
    dailyTag: 'daily, with a hard threshold',
    weeklyEmptyTitle: 'No Weekly Highlights yet',
    weeklyEmptyText: 'The weekly curation runs on Sundays. Check back after that.',
    dailyEmptyTitle: "Nothing has cleared the bar yet",
    dailyEmptyText: 'The daily research runs every day, but only logs a track confirmed by at least two independent sources.',
    locale: 'en-GB',
    unbenannt: 'Untitled',
    quelle: 'Source',
  },
};

let lang = 'de';
try { if (localStorage.getItem('eazr-lang') === 'en') lang = 'en'; } catch (e) {}

// Pages with dynamic content (The Crate) set this to re-render on language change.
window.onLangChange = null;

function applyStaticI18n() {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (T[lang][key] != null) el.innerHTML = T[lang][key];
  });
  document.querySelectorAll('.lang-toggle button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

document.querySelectorAll('.lang-toggle button').forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.dataset.lang === lang) return;
    lang = btn.dataset.lang;
    try { localStorage.setItem('eazr-lang', lang); } catch (e) {}
    applyStaticI18n();
    if (typeof window.onLangChange === 'function') window.onLangChange();
  });
});
applyStaticI18n();

// Active menu entry: the current page, or on the start page the section in view.
const page = document.body.dataset.page;
const navLinks = [...document.querySelectorAll('.nav-links a')];
navLinks.forEach(a => a.classList.toggle('active', a.dataset.page === page));
if (page === 'start' && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === 'index.html#' + e.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('main section[id]').forEach(s => io.observe(s));
}
