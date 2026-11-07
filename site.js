// Shared on every page: texts DE/EN, language toggle, menu.

// ---------------------------------------------------------------------
// i18n
// ---------------------------------------------------------------------
const T = {
  de: {
    navAbout: 'About',
    navEvents: 'Events',
    navMixes: 'Mixes',
    navNext: 'Next',
    navKontakt: 'Kontakt',
    menu: 'Menü',
    footerDatenschutz: "DATENSCHUTZ",
    footerImpressum: "IMPRESSUM",
    footerCopy: "© 2026 EAZR BEATS COLLECTIVE",
    footerCity: "MÜNCHEN",
    footerKontakt: "[KONTAKT]",
    kontaktTitle: "Kontakt",
    badgeComingSoon: 'LIVE LOADING',
    heroTagline: 'MÜNCHNER HOUSE &amp; TECHNO — NEUE SETS, SESSIONS UND SHOWS FOLGEN BALD.',
    ctaCrate: 'The Crate →',

    // start page
    freshTitle: 'Frisch in der Crate',
    freshText: 'Die neuesten Weekly-Hot-Picks aus allen vier Genres.',
    freshAll: 'Ganze Crate →',
    teaserCrateBtn: 'Zur Crate →',
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
    joinMixText: 'Du legst House oder Techno auf und kommst aus München? Wir wollen deinen Mix hören.',
    joinMixBtn: 'Mix schicken',
    joinNewsText: 'Neue Events, Mixes und Crate-Highlights direkt ins Postfach.',
    joinNewsBtn: 'Anmelden',
    newsLabel: 'E-Mail-Adresse',
    newsNote: 'Kein Spam, Abmelden jederzeit. Du bekommst erst eine Mail zum Bestätigen. <a href="datenschutz#newsletter">Datenschutz</a>',
    newsOk: 'Fast geschafft: Bitte bestätige die Mail in deinem Postfach.',
    newsErr: 'Das hat nicht geklappt. Versuch es nochmal oder schreib an news@eazrbeats.de.',
    newsSending: 'Wird gesendet …',
    teaserAboutText: 'Münchner House- und Techno-Kollektiv. Wer wir sind und was wir vorhaben.',
    teaserAboutBtn: 'Über uns →',
    teaserEventsText: 'Eigene Open-Air-Reihe ab Sommer 2027, dazu gefilmte Sessions.',
    teaserEventsBtn: 'Zu den Events →',
    teaserNextBtn: 'Was kommt →',

    // about
    aboutText: 'EAZr Beats Collective ist ein Münchner House- und Techno-Kollektiv. Wir spielen House, Melodic House, Afro und Latin House, bauen eigene Formate auf und arbeiten an eigenen Tracks. Kein Label, keine Agentur, sondern Leute, die Bock auf gute Abende haben.',
    aboutWhatTitle: 'Was wir machen',
    aboutSetsTitle: 'DJ-Sets',
    aboutSetsText: 'House in allen Farben, von Melodic bis Latin, und Techno von melodisch bis treibend. Gebaut für Abende, die langsam anlaufen und spät aufhören.',
    aboutFormatsTitle: 'Eigene Formate',
    aboutFormatsText: 'Eine Open-Air-Reihe in München und gefilmte Sessions mit der Crowd direkt ums Pult.',
    aboutTracksTitle: 'Eigene Tracks',
    aboutTracksText: 'Erste eigene Produktionen sind in Arbeit. Hören kann man sie hier, sobald sie fertig sind.',
    aboutCrateTitle: 'The Crate',
    aboutCrateText: 'Unser Selector\'s Log: Tracks, die gerade in DJ-Sets laufen, jeden Tag geprüft.',
    crewTitle: 'Crew',
    roleNoah: 'Gründer · DJ · Design',
    bioNoah: 'Hat EAZr mitgegründet, legt House und Techno auf, macht das Design und baut an eigenen Tracks.',
    roleWiktor: 'Host · MC · Live',
    bioWiktor: 'Warschauer Rapper, der in München lebt, und Host von EMBERS by EAZr, unserer Live-Reihe. Er bringt die Energie aus dem Rap mit an unsere Abende, holt als MC die Crowd ab und pusht die Peaks.',
    roleLaura: 'Gründerin · Social Media · Promo',
    bioLaura: 'Hat EAZr mitgegründet und kümmert sich um Socials und Promo.',
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
    sessionsText: 'Unser Live-Format: Sets mit der Crowd direkt ums Pult, gefilmt und live auf Twitch gestreamt.',
    eventsPast: 'Archiv',
    eventsPastEmptyTitle: 'Noch keine vergangenen Events',
    eventsPastEmptyText: 'Hier landen Fotos, Videos und Tracklists, sobald die ersten Abende gelaufen sind.',
    eventsNotify: 'Keine Termine verpassen: Neue Events kündigen wir zuerst auf Instagram an.',

    embersBtn: 'Zu EMBERS →',
    backLive: '← Alle Live-Reihen',
    liveHubText: 'Unsere Live-Reihen. Jede hat ihre eigene Welt, ihren eigenen Sound und ihre eigene Seite.',
    hubEmbersText: 'Die House-Reihe: alles, was House kann. DJ-Sessions mit Host, live aus München auf Twitch gestreamt.',
    emBack: '← ALLE LIVE-REIHEN',
    emDate: 'DATUM', emVenue: 'ORT', emDown: '↓ SCROLL',
    emGather: 'Ein Raum, ein DJ, ein Host. Alles, was House kann, vom ersten warmen Groove bis zum letzten Track, der nicht enden soll.',
    emDoors: 'EINLASS', emStreamAt: '21:30 AUF TWITCH',
    emGlow: 'Jede Session bekommt eine Nummer. Jede Nummer ist eine Nacht, direkt von den Decks, warm vom ersten bis zum letzten Track.',
    emSound: 'All things house', emFormat: 'DJ-Session mit Host',
    emStream: '90 Minuten vom Set laufen live auf Twitch. Der Rest der Nacht bleibt im Raum. Datum, Ort und Gästeliste gibt es zuerst im Newsletter.',
    emFoot: 'DAS FEUER GEHT AUS · DIE GLUT BLEIBT<br>EMBERS IST EINE REIHE VON EAZr BEATS COLLECTIVE · MÜNCHEN',
    hubNextText: 'Die nächste Reihe ist in Arbeit. Name und Datum gibt es zuerst auf Instagram und im Newsletter.',
    // live (EMBERS)
    liveBtn: 'Zur Live-Seite →',
    liveText: 'EMBERS ist unsere House-Reihe: DJ-Sessions mit Host, direkt vom Pult, live aus München gestreamt. Alles, was House kann, jede Session bekommt eine Nummer.',
    liveNextKicker: 'Nächste Session',
    liveNextTba: 'EMBERS 001 · SOON',
    liveNextText: 'Der genaue Tag, Location, Tickets und Gästeliste folgen zuerst auf Instagram und im Newsletter.',
    eventDate: 'KW 1 · 2027 · München',
    liveNextDate: 'EMBERS 001 · KW 1 · 2027',
    eventTimes: 'Einlass 20:00 · Stream ab 21:30 auf Twitch',
    eventMore: 'Der genaue Tag, Location, Tickets und Gästeliste folgen auf Instagram und im Newsletter.',
    liveWatch: '▶ Auf Twitch ansehen',
    livePlanB: 'Falls der Stream mal hakt: Updates gibt es immer in der Instagram-Story von @eazrbeats.',
    liveHowTitle: 'So bist du dabei',
    liveHowText: 'Folge eazrbeats auf Twitch, dann bekommst du eine Nachricht, sobald wir live gehen. Ohne Account kannst du auch einfach zuschauen.',
    liveCrewText: 'Gast-DJs kommen ab und zu dazu.',
    liveArchiveTitle: 'Archiv',
    liveArchiveText: 'Jede Session wird aufgenommen. Die ganzen Sets und Clips landen nach und nach hier.',
    // next (events + mixes)
    nextText: 'Was als Nächstes kommt: unsere eigenen Abende und die ersten Mixes.',
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
    kontaktText: 'Fragen, Ideen, Kooperationen, Presse: Schreib uns.',
    kontaktBtn: 'Mail schreiben',
    kontaktCopy: 'Adresse kopieren',
    kontaktCopied: 'Kopiert ✓',
    kontaktBooking: 'Du willst uns buchen? Dafür gibt es die <a href="booking">Booking-Seite</a>.',
    bookingOther: 'Nur für Booking-Anfragen. Alles andere bitte über <a href="kontakt">Kontakt</a>.',
    bookingWhat: 'Was wir mitbringen',
    bookingWhatText: 'House und Techno: Melodic, Afro, Latin House, Peak-Time und Melodic Techno. DJ-Sets mit Host und MC, auf Wunsch gefilmt.',
    bookingInfo: 'Was in die Mail gehört',
    bookingInfoText: 'Datum, Ort, ungefähre Gästezahl, Spielzeit und ob Technik vor Ort ist.',
    pressTitle: 'Pressekit',
    pressText: 'Für Venues, Veranstalter und Presse: Logo und Kurzbio zum Mitnehmen.',
    pressLogo: 'Logo',
    pressLogoText: 'Auf dunklem Grund (1080 × 1080) und freigestellt mit transparentem Hintergrund.',
    pressLogoDark: 'Logo dunkel ↓',
    pressLogoClear: 'Logo freigestellt ↓',
    pressBio: 'Kurzbio',
    pressBioText: 'EAZr Beats Collective ist ein House- und Techno-Kollektiv aus München, gegründet von Noah und Laura. Die Crew spielt House, Melodic House & Techno, Afro und Latin House, mit Wiktor als Host und MC. In Arbeit: eine eigene Open-Air-Reihe ab Sommer 2027 und gefilmte Sessions mit der Crowd direkt ums Pult.',
    pressCopy: 'Bio kopieren',
    pressPhotosText: 'Crew- und Eventfotos folgen.',
    notFoundText: 'Diese Seite gibt es nicht (mehr). Vielleicht ein alter Link?',
    notFoundHome: 'Zur Startseite',

    // crate
    crateSub: 'Tracks, die gerade in DJ-Sets laufen. Jeder Eintrag ist von mindestens zwei unabhängigen Quellen bestätigt.',
    crateFooter: 'Automatisch gepflegt · Daily Hot täglich geprüft · Weekly Hot jeden Sonntag neu kuratiert',
    crateUpdatedLabel: 'zuletzt aktualisiert:',
    crateSpotify: '▶ Playlist auf Spotify hören',
    voidSub: 'Die dunkle Seite der Crate: Techno, der gerade in DJ-Sets läuft. Peak Time, Melodic, Raw, Hypnotic, Hard. Jeder Eintrag ist von mindestens zwei unabhängigen Quellen bestätigt.',
    voidFooter: 'Automatisch gepflegt · Daily Hot täglich geprüft · Weekly Hot jeden Samstag neu kuratiert',
    ctaVoid: 'The Void →',
    weeklyTag: 'kuratierte Wochen-Highlights',
    pastWeeks: 'Frühere Wochen',
    weekOf: 'Woche vom',
    dailyTag: 'täglich, mit harter Schwelle',
    weeklyEmptyTitle: 'Noch keine Weekly-Highlights',
    weeklyEmptyText: 'Die wöchentliche Kuratierung läuft sonntags. Schau danach wieder vorbei.',
    voidWeeklyEmptyText: 'Die wöchentliche Kuratierung läuft samstags. Schau danach wieder vorbei.',
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
    navNext: 'Next',
    navKontakt: 'Contact',
    menu: 'Menu',
    footerDatenschutz: "PRIVACY",
    footerImpressum: "LEGAL NOTICE",
    footerCopy: "© 2026 EAZR BEATS COLLECTIVE",
    footerCity: "MUNICH",
    footerKontakt: "[CONTACT]",
    kontaktTitle: "Contact",
    badgeComingSoon: 'LIVE LOADING',
    heroTagline: "MUNICH HOUSE &amp; TECHNO — NEW SETS, SESSIONS AND SHOWS DROPPING SOON.",
    ctaCrate: 'The Crate →',

    freshTitle: 'Fresh in the Crate',
    freshText: "The latest Weekly Hot pick from each genre.",
    freshAll: 'Full Crate →',
    teaserCrateBtn: 'Open the Crate →',
    digTitle: 'Dig the Crate',
    digText: "Pick a genre, hit shuffle, find your next track.",
    digAll: 'All genres',
    digBtn: 'Shuffle',
    digListen: 'Listen ↗',
    digEmpty: "Nothing in this one yet. Try another genre.",
    joinTitle: 'Get involved',
    joinFollowTitle: 'Follow',
    joinFollowText: "Crate Picks every Sunday, plus Road to Live and our Munich series.",
    joinTipTitle: 'Track tip',
    joinTipText: "Got a track that belongs in the Crate? Send it our way.",
    joinTipBtn: 'Send a tip',
    joinMixTitle: 'Send a mix',
    joinMixText: "Based in Munich and playing house or techno? We want to hear your mix.",
    joinMixBtn: 'Send your mix',
    joinNewsText: "New events, mixes and Crate highlights, straight to your inbox.",
    joinNewsBtn: 'Sign up',
    newsLabel: 'Email address',
    newsNote: 'No spam, unsubscribe anytime. You will get an email to confirm first. <a href="datenschutz#newsletter">Privacy</a>',
    newsOk: 'Almost there: please confirm the email in your inbox.',
    newsErr: "That didn't work. Try again or write to news@eazrbeats.de.",
    newsSending: 'Sending …',
    teaserAboutText: "A house and techno collective from Munich. Who we are and what we're building.",
    teaserAboutBtn: 'About us →',
    teaserEventsText: 'Our own open air series from summer 2027, plus filmed sessions.',
    teaserEventsBtn: 'See events →',
    teaserNextBtn: "What's next →",

    aboutText: "EAZr Beats Collective is a house and techno collective from Munich. We play house, melodic, afro and latin house, build our own formats and work on our own music. No label, no agency, just people who care about a good night out.",
    aboutWhatTitle: 'What we do',
    aboutSetsTitle: 'DJ sets',
    aboutSetsText: "House in all its shades, from melodic to latin, plus techno from melodic to driving. Built for nights that start slow and finish late.",
    aboutFormatsTitle: 'Our own formats',
    aboutFormatsText: 'An open air series in Munich and filmed sessions with the crowd right around the decks.',
    aboutTracksTitle: "Our own music",
    aboutTracksText: "First productions are in the works. They'll land here once they're finished.",
    aboutCrateTitle: 'The Crate',
    aboutCrateText: "Our selector's log: tracks getting played in DJ sets right now, checked daily.",
    crewTitle: 'Crew',
    roleNoah: "Co-founder · DJ · Design",
    bioNoah: "Plays house and techno, handles the design and is working on our first productions.",
    roleWiktor: 'Host · MC · Live',
    bioWiktor: "Warsaw-born rapper based in Munich and host of EMBERS by EAZr, our live series. He brings the energy of rap to our nights, gets the crowd going as MC and pushes the peaks.",
    roleLaura: "Co-founder · Social media · Promo",
    bioLaura: "Runs our socials and promo.",
    crewOpenTitle: 'You?',
    crewOpenText: "We're looking for DJs in Munich. Send your mix to kontakt@eazrbeats.de.",
    joinCrewTitle: "Join us",
    joinCrewText: "We're looking for DJs, photo and video people, and venues with outdoor space. Just drop us a line.",
    joinCrewBtn: "Get in touch",

    eventsUpcoming: 'Coming up',
    openAirKicker: 'Summer 2027 · Munich',
    openAirText: "Our own open air series: house, tech house, afro and latin house under the open sky. Name, date and venue TBA.",
    sessionsKicker: 'Format · in the works',
    sessionsText: "Our live format: sets with the crowd right up around the decks, filmed and streamed live on Twitch.",
    eventsPast: 'Archive',
    eventsPastEmptyTitle: 'No past events yet',
    eventsPastEmptyText: "Photos, videos and tracklists will land here after our first nights.",
    eventsNotify: "Don't miss a date: new events go up on Instagram first.",

    embersBtn: 'To EMBERS →',
    backLive: '← All live series',
    liveHubText: 'Our live series. Each one has its own world, its own sound and its own page.',
    hubEmbersText: 'The house series: all things house. Hosted live DJ sessions, streamed from Munich on Twitch.',
    emBack: '← ALL LIVE SERIES',
    emDate: 'DATE', emVenue: 'VENUE', emDown: '↓ COME CLOSER',
    emGather: 'One room, one DJ, one host. House in every shape, from the first warm groove to the last track nobody wants to end.',
    emDoors: 'DOORS', emStreamAt: '21:30 ON TWITCH',
    emGlow: 'Every session gets a number. Every number is one night, straight from the decks, warm from start to finish.',
    emSound: 'All things house', emFormat: 'Hosted live DJ session',
    emStream: '90 minutes of the set stream live on Twitch. The rest of the night stays in the room. Date, venue and guest list go out to the newsletter first.',
    emFoot: 'THE FIRE GOES DOWN · THE GLOW STAYS<br>EMBERS IS A SERIES BY EAZr BEATS COLLECTIVE · MUNICH',
    hubNextText: 'The next series is in the works. Name and date drop first on Instagram and in the newsletter.',
    // live (EMBERS)
    liveBtn: 'To the live page →',
    liveText: 'EMBERS is our house series: hosted live DJ sessions, straight from the decks, streamed from Munich. All things house, every session gets a number.',
    liveNextKicker: 'Next session',
    liveNextTba: 'EMBERS 001 · SOON',
    liveNextText: 'Exact day, venue, tickets and guest list drop first on Instagram and in the newsletter.',
    eventDate: 'Week 1 · 2027 · Munich',
    liveNextDate: 'EMBERS 001 · Week 1 · 2027',
    eventTimes: 'Doors 20:00 · Stream from 21:30 on Twitch',
    eventMore: 'Exact day, venue, tickets and guest list drop first on Instagram and in the newsletter.',
    liveWatch: '▶ Watch on Twitch',
    livePlanB: 'If the stream ever acts up: updates are always in the @eazrbeats Instagram story.',
    liveHowTitle: 'How to tune in',
    liveHowText: 'Follow eazrbeats on Twitch and you get a ping as soon as we go live. You can also just watch without an account.',
    liveCrewText: 'Guest DJs join from time to time.',
    liveArchiveTitle: 'Archive',
    liveArchiveText: 'Every session gets recorded. Full sets and clips will land here over time.',
    nextText: "What's coming up: our own nights and the first mixes.",
    mixesText: 'Sets, recordings and studio sessions. The first mixes are in the works.',
    mixesSoonTitle: 'Mix 01 · in the works',
    mixesSoonText: "Our first mix lands here once it's done. Until then, catch Road to Live on Instagram.",
    mixesRoadTitle: 'Road to Live',
    mixesRoadText: "Every Tuesday on Instagram: from bedroom practice to the first gig.",
    mixesRoadBtn: 'Watch on Instagram ↗',

    bookingText: "Club, bar, open air or private event: tell us when, where and what you have in mind, and we'll get back to you.",
    bookingBtn: 'Send request',
    kontaktText: "Questions, ideas, collabs, press: drop us a line.",
    kontaktBtn: "Email us",
    kontaktCopy: 'Copy address',
    kontaktCopied: 'Copied ✓',
    kontaktBooking: 'Want to book us? Use the <a href="booking">booking page</a>.',
    bookingOther: "Booking requests only. For anything else, head to <a href=\"kontakt\">contact</a>.",
    bookingWhat: 'What we bring',
    bookingWhatText: "House and techno: melodic, afro and latin house, peak-time and melodic techno. DJ sets with host and MC, filmed on request.",
    bookingInfo: 'What to include',
    bookingInfoText: "Date, venue, expected crowd size, set length and whether there's gear on site.",
    pressTitle: 'Press kit',
    pressText: 'For venues, promoters and press: logo and short bio, ready to use.',
    pressLogo: 'Logo',
    pressLogoText: 'On a dark background (1080 × 1080) and cut out with a transparent background.',
    pressLogoDark: 'Logo dark ↓',
    pressLogoClear: 'Logo transparent ↓',
    pressBio: 'Short bio',
    pressBioText: "EAZr Beats Collective is a house and techno collective from Munich, founded by Noah and Laura. The crew plays house, melodic house & techno, afro and latin house, with Wiktor on the mic as host and MC. In the works: an open-air series from summer 2027 and filmed sessions with the crowd right around the decks.",
    pressCopy: 'Copy bio',
    pressPhotosText: 'Crew and event photos coming soon.',
    notFoundText: "This page doesn't exist (anymore). Maybe an old link?",
    notFoundHome: 'Back to home',

    crateSub: "Tracks getting played in DJ sets right now. Every entry is backed by at least two independent sources.",
    crateFooter: "Updated automatically · Daily Hot checked every day · Weekly Hot curated every Sunday",
    crateUpdatedLabel: 'last updated:',
    crateSpotify: '▶ Listen on Spotify',
    voidSub: "The dark side of the Crate: techno getting played in DJ sets right now. Peak time, melodic, raw, hypnotic, hard. Every entry is backed by at least two independent sources.",
    voidFooter: "Updated automatically · Daily Hot checked every day · Weekly Hot curated every Saturday",
    ctaVoid: 'The Void →',
    weeklyTag: "hand-picked weekly highlights",
    pastWeeks: 'Previous weeks',
    weekOf: 'Week of',
    dailyTag: "daily, strict threshold",
    weeklyEmptyTitle: 'No Weekly Highlights yet',
    weeklyEmptyText: "Weekly picks drop on Sundays. Check back then.",
    voidWeeklyEmptyText: "Weekly picks drop on Saturdays. Check back then.",
    dailyEmptyTitle: "Nothing has made the cut yet",
    dailyEmptyText: "We check every day, but a track only gets in once two independent sources back it up.",
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
  // series pages (e.g. /embers) live under Live in the menu
  if (a.dataset.page === ({ embers: 'live' }[page] || page)) a.setAttribute('aria-current', 'page');
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

// Every "listen" link on the site points to our playlist; source pages stay in the source chips.
const SPOTIFY_PLAYLIST = 'https://open.spotify.com/playlist/4KcjtXLWTB6lq4JP8tt04K';
const GENRES = [
  { key: 'house', label: 'House' },
  { key: 'melodic-house-techno', label: 'Melodic House & Techno' },
  { key: 'afro-house', label: 'Afro House' },
  { key: 'latin-house', label: 'Latin House' },
];

// THE VOID: the techno sister of the Crate (void.html, data in void.json).
const VOID_SPOTIFY = 'https://open.spotify.com/playlist/4YOP1Gd9jrWMfuIGG2Y8Sl';
const VOID_GENRES = [
  { key: 'peak-time-driving', label: 'Peak Time / Driving' },
  { key: 'melodic-techno', label: 'Melodic Techno' },
  { key: 'raw-deep-hypnotic', label: 'Raw / Deep / Hypnotic' },
  { key: 'hard-techno', label: 'Hard Techno' },
];

// Copy buttons (contact address, press bio): work even without a mail app
document.querySelectorAll('[data-copy-from]').forEach(btn => {
  btn.addEventListener('click', async () => {
    const el = document.getElementById(btn.dataset.copyFrom);
    const label = btn.dataset.i18n;
    let ok = false;
    try { await navigator.clipboard.writeText(el.textContent.trim()); ok = true; } catch (e) {}
    if (!ok) {
      const range = document.createRange();
      range.selectNodeContents(el);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      try { ok = document.execCommand('copy'); } catch (e) {}
    }
    if (ok) {
      btn.textContent = T[lang].kontaktCopied;
      setTimeout(() => { btn.textContent = T[lang][label]; }, 2000);
    }
  });
});

// Visitor counts without cookies (GoatCounter), only on the live domain
if (/(^|\.)eazrbeats\.de$/.test(location.hostname)) {
  const gc = document.createElement('script');
  gc.async = true;
  gc.src = 'https://gc.zgo.at/count.js';
  gc.dataset.goatcounter = 'https://eazrbeats.goatcounter.com/count';
  document.head.appendChild(gc);
}

// Every new page starts at the top (unless a link points to a section with #)
function toTop() {
  if (location.hash) return;
  window.scrollTo(0, 0);
  const first = document.body;
  // also moves the outer page when the site is shown inside a preview frame
  try { first.scrollIntoView({ block: 'start', behavior: 'instant' }); } catch (e) { first.scrollIntoView(true); }
}
const navEntry = performance.getEntriesByType && performance.getEntriesByType('navigation')[0];
if (!navEntry || navEntry.type !== 'back_forward') toTop();

// Newsletter: send the form to Brevo in the background and answer on the page.
// The response is opaque (no-cors), so success means "sent"; Brevo then mails the confirmation link.
document.querySelectorAll('[data-news-form]').forEach(form => {
  const msg = form.querySelector('.news-msg');
  const btn = form.querySelector('button');
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (form.email_address_check.value) return;
    form.locale.value = lang;
    btn.disabled = true;
    msg.textContent = T[lang].newsSending;
    fetch(form.action, { method: 'POST', body: new FormData(form), mode: 'no-cors' })
      .then(() => { msg.textContent = T[lang].newsOk; form.EMAIL.value = ''; form.classList.add('sent'); })
      .catch(() => { msg.textContent = T[lang].newsErr; btn.disabled = false; });
  });
});

// Soft scroll reveal (v2 look): heads and panels fade up as they come into view.
// Off on /embers (own choreography) and with reduced motion; without JS everything just shows.
(function () {
  if (document.body.dataset.page === 'embers' || !('IntersectionObserver' in window)) return;
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const els = document.querySelectorAll('.band .sec-head, .band .lead, .band .sub-h, .card, .pick, .dig-box, .booking-box, .series-tile, .event-promo');
  if (!els.length) return;
  document.documentElement.classList.add('reveal-on');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  els.forEach((el, i) => {
    el.classList.add('rv');
    // small stagger for panels sitting next to each other
    const sib = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
    el.style.transitionDelay = Math.min(sib, 4) * 70 + 'ms';
    io.observe(el);
  });
})();
