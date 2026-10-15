// Shared on every page: texts DE/EN, language toggle, menu.

// ---------------------------------------------------------------------
// i18n
// ---------------------------------------------------------------------
const T = {
  de: {
    navAbout: 'About',
    navEvents: 'Events',
    navMixes: 'Mixes',
    menu: 'Menü',
    badgeComingSoon: 'COMING SOON',
    heroTagline: 'MÜNCHNER HOUSE &amp; TECHNO — NEUE SETS, SESSIONS UND SHOWS FOLGEN BALD.',
    ctaCrate: 'The Crate →',

    // start page
    freshTitle: 'Frisch in der Crate',
    freshText: 'Die neuesten Weekly-Hot-Picks aus allen vier Genres.',
    freshAll: 'Ganze Crate →',
    digTitle: 'Dig the Crate',
    digText: 'Genre wählen, Knopf drücken, neuen Track entdecken.',
    digAll: 'Alle Genres',
    digBtn: 'Shuffle',
    digListen: 'Anhören ↗',
    digEmpty: 'Hier ist gerade nichts drin. Probier ein anderes Genre.',
    joinTitle: 'Mach mit',
    joinFollowTitle: 'Folgen',
    joinFollowText: 'Crate Picks jeden Sonntag, dazu Road to Live und München.',
    joinTipTitle: 'Track-Tipp',
    joinTipText: 'Du hast einen Track, der in die Crate gehört? Schick ihn uns.',
    joinTipBtn: 'Tipp schicken',
    joinMixTitle: 'Mix einschicken',
    joinMixText: 'Du legst House auf und kommst aus München? Wir wollen deinen Mix hören.',
    joinMixBtn: 'Mix schicken',
    joinNewsText: 'Neue Events, Mixes und Crate-Highlights direkt ins Postfach.',
    joinNewsBtn: 'Anmelden',
    teaserAboutText: 'Münchner House-Kollektiv. Wer wir sind und was wir vorhaben.',
    teaserAboutBtn: 'Über uns →',
    teaserEventsText: 'Eigene Open-Air-Reihe ab Sommer 2027, dazu gefilmte Sessions.',
    teaserEventsBtn: 'Zu den Events →',

    // about
    aboutText: 'EAZr Beats Collective ist ein Münchner House- und Techno-Kollektiv. Wir spielen House, Melodic House, Afro und Latin House, bauen eigene Formate auf und arbeiten an eigenen Tracks. Kein Label, keine Agentur, sondern Leute, die Bock auf gute Abende haben.',
    aboutWhatTitle: 'Was wir machen',
    aboutSetsTitle: 'DJ-Sets',
    aboutSetsText: 'House in allen Farben, von Melodic bis Latin. Gebaut für Abende, die langsam anlaufen und spät aufhören.',
    aboutFormatsTitle: 'Eigene Formate',
    aboutFormatsText: 'Eine Open-Air-Reihe in München und gefilmte Sessions mit der Crowd direkt ums Pult.',
    aboutTracksTitle: 'Eigene Tracks',
    aboutTracksText: 'Erste eigene Produktionen sind in Arbeit. Hören kann man sie hier, sobald sie fertig sind.',
    aboutCrateTitle: 'The Crate',
    aboutCrateText: 'Unser Selector\'s Log: Tracks, die gerade in DJ-Sets laufen, jeden Tag geprüft.',
    crewTitle: 'Crew',
    roleNoah: 'Gründer · DJ · Design',
    bioNoah: 'Hat EAZr mitgegründet, legt House auf, macht das Design und baut an eigenen Tracks.',
    roleWiktor: 'Host · MC · Live',
    bioWiktor: 'Rapper aus Polen. Bei uns am Mic: Host, MC und Live-Act.',
    roleLaura: 'Gründerin · Social Media · Promo',
    bioLaura: 'Hat EAZr mitgegründet und kümmert sich um Socials und Promo.',
    roleLisa: 'Promotion',
    bioLisa: 'Sorgt dafür, dass die Leute von unseren Abenden erfahren und kommen.',
    crewOpenTitle: 'Du?',
    crewOpenText: 'Wir suchen DJs aus München. Schick uns deinen Mix an kontakt@eazrbeats.de.',
    joinCrewTitle: 'Mitmachen',
    joinCrewText: 'Wir suchen DJs, Leute für Foto und Video und Orte mit Außenfläche. Schreib uns einfach.',
    joinCrewBtn: 'Mail schreiben',

    // events
    eventsUpcoming: 'Coming up',
    openAirKicker: 'Sommer 2027 · München',
    openAirText: 'Unsere eigene Open-Air-Reihe: House, Tech House, Afro und Latin House unter freiem Himmel. Name, Datum und Ort folgen.',
    sessionsKicker: 'Format · in Arbeit',
    sessionsText: 'Sets mit der Crowd direkt ums Pult, gefilmt und gestreamt. Mehr dazu bald auf Instagram.',
    eventsPast: 'Archiv',
    eventsPastEmptyTitle: 'Noch keine vergangenen Events',
    eventsPastEmptyText: 'Hier landen Fotos, Videos und Tracklists, sobald die ersten Abende gelaufen sind.',
    eventsNotify: 'Keine Termine verpassen: Neue Events kündigen wir zuerst auf Instagram an.',

    // mixes
    mixesText: 'Sets, Mitschnitte und Studio-Sessions. Die ersten Mixes sind in Arbeit.',
    mixesSoonTitle: 'Mix 01 · in Arbeit',
    mixesSoonText: 'Der erste Mix kommt hier rein, sobald er fertig ist. Bis dahin: Road to Live auf Instagram.',
    mixesRoadTitle: 'Road to Live',
    mixesRoadText: 'Jeden Dienstag auf Instagram: vom Üben im Zimmer bis zum ersten Gig.',
    mixesRoadBtn: 'Auf Instagram ansehen ↗',

    // booking
    bookingText: 'Club, Bar, Open Air oder Privat: Schreib uns kurz, wann, wo und was du dir vorstellst. Wir melden uns.',
    bookingBtn: 'Anfrage senden',
    bookingOther: 'Nur für Booking-Anfragen. Alles andere bitte an <a href="mailto:kontakt@eazrbeats.de">kontakt@eazrbeats.de</a>.',
    bookingWhat: 'Was wir mitbringen',
    bookingWhatText: 'House, Melodic House, Afro und Latin House. DJ-Sets mit Host und MC, auf Wunsch gefilmt.',
    bookingInfo: 'Was in die Mail gehört',
    bookingInfoText: 'Datum, Ort, ungefähre Gästezahl, Spielzeit und ob Technik vor Ort ist.',

    // crate
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
    navMixes: 'Mixes',
    menu: 'Menu',
    badgeComingSoon: 'COMING SOON',
    heroTagline: 'MUNICH HOUSE &amp; TECHNO — NEW SETS, SESSIONS AND SHOWS DROPPING SOON.',
    ctaCrate: 'The Crate →',

    freshTitle: 'Fresh in the Crate',
    freshText: 'The latest Weekly Hot picks across all four genres.',
    freshAll: 'Full Crate →',
    digTitle: 'Dig the Crate',
    digText: 'Pick a genre, hit the button, find your next track.',
    digAll: 'All genres',
    digBtn: 'Shuffle',
    digListen: 'Listen ↗',
    digEmpty: 'Nothing in here right now. Try another genre.',
    joinTitle: 'Get involved',
    joinFollowTitle: 'Follow',
    joinFollowText: 'Crate Picks every Sunday, plus Road to Live and Munich.',
    joinTipTitle: 'Track tip',
    joinTipText: 'Got a track that belongs in the Crate? Send it over.',
    joinTipBtn: 'Send a tip',
    joinMixTitle: 'Send a mix',
    joinMixText: 'You play house and you are from Munich? We want to hear your mix.',
    joinMixBtn: 'Send your mix',
    joinNewsText: 'New events, mixes and Crate highlights straight to your inbox.',
    joinNewsBtn: 'Sign up',
    teaserAboutText: 'House collective from Munich. Who we are and what we are building.',
    teaserAboutBtn: 'About us →',
    teaserEventsText: 'Our own open air series from summer 2027, plus filmed sessions.',
    teaserEventsBtn: 'See events →',

    aboutText: 'EAZr Beats Collective is a house and techno collective from Munich. We play house, melodic house, afro and latin house, build our own formats and work on our own tracks. No label, no agency, just people who live for a good night.',
    aboutWhatTitle: 'What we do',
    aboutSetsTitle: 'DJ sets',
    aboutSetsText: 'House in every shade, from melodic to latin. Built for nights that start slow and end late.',
    aboutFormatsTitle: 'Our own formats',
    aboutFormatsText: 'An open air series in Munich and filmed sessions with the crowd right around the decks.',
    aboutTracksTitle: 'Our own tracks',
    aboutTracksText: 'First productions are in the works. You will hear them here once they are done.',
    aboutCrateTitle: 'The Crate',
    aboutCrateText: 'Our selector\'s log: tracks running in DJ sets right now, checked every day.',
    crewTitle: 'Crew',
    roleNoah: 'Founder · DJ · Design',
    bioNoah: 'Co-founded EAZr, plays house, does the design and works on our own tracks.',
    roleWiktor: 'Host · MC · Live',
    bioWiktor: 'Rapper from Poland. On the mic with us: host, MC and live act.',
    roleLaura: 'Founder · Social media · Promo',
    bioLaura: 'Co-founded EAZr and runs our socials and promo.',
    roleLisa: 'Promotion',
    bioLisa: 'Makes sure people hear about our nights and show up.',
    crewOpenTitle: 'You?',
    crewOpenText: 'We are looking for DJs from Munich. Send your mix to kontakt@eazrbeats.de.',
    joinCrewTitle: 'Join in',
    joinCrewText: 'We are looking for DJs, people for photo and video, and venues with outdoor space. Just drop us a line.',
    joinCrewBtn: 'Write us',

    eventsUpcoming: 'Coming up',
    openAirKicker: 'Summer 2027 · Munich',
    openAirText: 'Our own open air series: house, tech house, afro and latin house under open sky. Name, date and venue TBA.',
    sessionsKicker: 'Format · in the works',
    sessionsText: 'Sets with the crowd right around the decks, filmed and streamed. More soon on Instagram.',
    eventsPast: 'Archive',
    eventsPastEmptyTitle: 'No past events yet',
    eventsPastEmptyText: 'Photos, videos and tracklists land here once the first nights have happened.',
    eventsNotify: 'Never miss a date: we announce new events on Instagram first.',

    mixesText: 'Sets, recordings and studio sessions. The first mixes are in the works.',
    mixesSoonTitle: 'Mix 01 · in the works',
    mixesSoonText: 'The first mix lands here once it is done. Until then: Road to Live on Instagram.',
    mixesRoadTitle: 'Road to Live',
    mixesRoadText: 'Every Tuesday on Instagram: from practising at home to the first gig.',
    mixesRoadBtn: 'Watch on Instagram ↗',

    bookingText: 'Club, bar, open air or private: tell us when, where and what you have in mind. We will get back to you.',
    bookingBtn: 'Send request',
    bookingOther: 'Booking requests only. For anything else, write to <a href="mailto:kontakt@eazrbeats.de">kontakt@eazrbeats.de</a>.',
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

// Pages with dynamic content set this to re-render on language change.
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

// ---------------------------------------------------------------------
// Menu: mark the current page; on small screens open/close the menu
// ---------------------------------------------------------------------
const page = document.body.dataset.page;
document.querySelectorAll('.nav-links a').forEach(a => {
  if (a.dataset.page === page) a.setAttribute('aria-current', 'page');
});

const menuBtn = document.querySelector('.menu-btn');
const navLinksEl = document.getElementById('nav-links');
if (menuBtn && navLinksEl) {
  menuBtn.addEventListener('click', () => {
    const open = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!open));
    navLinksEl.classList.toggle('open', !open);
  });
}

// Shared helpers for pages that render Crate data
function escapeHtml(str) {
  return String(str ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

const GENRES = [
  { key: 'house', label: 'House' },
  { key: 'melodic-house-techno', label: 'Melodic House & Techno' },
  { key: 'afro-house', label: 'Afro House' },
  { key: 'latin-house', label: 'Latin House' },
];
