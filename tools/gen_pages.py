# Builds the generated pages (index, about, next, crate, void, booking, kontakt, 404) and the
# events/mixes redirect stubs. Run from anywhere: python3 tools/gen_pages.py
# impressum.html and datenschutz.html are hand-written and not touched here.
import os, re, sys
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))

# Events and Mixes are merged into one "Next" page while both are still empty.
# Once the first event or mix is out: set SPLIT_NEXT = True to bring back
# separate events.html and mixes.html pages (and menu entries) again.
SPLIT_NEXT = False
cur = open('index.html').read()
footer = re.search(r'<footer class="site-footer">.*?</footer>\n', cur, re.S).group(0)
crate_sec = open('crate.html').read()
crate_sec = re.search(r'<div class="band first">\n<section class="sec" id="crate">.*?</section>\n</div>\n', crate_sec, re.S).group(0)

INSTA = 'https://www.instagram.com/eazrbeats/'
SPOTIFY = 'https://open.spotify.com/playlist/4KcjtXLWTB6lq4JP8tt04K'  # The Crate playlist
SPOTIFY_VOID = 'https://open.spotify.com/playlist/4YOP1Gd9jrWMfuIGG2Y8Sl'  # THE VOID playlist
TIKTOK = 'https://www.tiktok.com/@eazrbeats'  # profile URL, goes into the search-engine profile list once set
BOOKING = 'booking@eazrbeats.de'  # nur hinter dem Booking-Button, nie sichtbar
KONTAKT = 'kontakt@eazrbeats.de'
NEWS = 'news@eazrbeats.de'
# Brevo signup form (list "Newsletter", double opt-in). Only the action URL is used;
# the form itself is ours, so no Brevo script or styles load until someone signs up.
BREVO_FORM = 'https://271e78d8.sibforms.com/serve/MUIFAJSYStwrJDqLy42Ecrc5qfbu952H3tunCLqEOj2qNEo-uMQXekhmfnDc89IZYDDQvP3DT4KTqPFPZoBFeAFUcrWhE9eK-rjQWXlJhWRLPuFXXxIVjP0kBSRK1CL7qstSoJLpIOjHAXKMxRgxGYDAiAdfOyD74gIofvVEdhAnrJvCYAsvdI4UVkxunpNlYs7gao6sTT03_pbjiA=='

def news_form(uid):
    return f'''<form class="news-form" action="{BREVO_FORM}" method="POST" data-news-form>
        <label class="sr-only" for="news-{uid}" data-i18n="newsLabel">E-Mail-Adresse</label>
        <div class="news-row">
          <input type="email" id="news-{uid}" name="EMAIL" required autocomplete="email" placeholder="name@mail.de">
          <button class="btn" type="submit" data-i18n="joinNewsBtn">Anmelden</button>
        </div>
        <input type="text" name="email_address_check" value="" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
        <input type="hidden" name="locale" value="de">
        <p class="news-msg" role="status" aria-live="polite"></p>
        <p class="news-note" data-i18n="newsNote"></p>
      </form>'''

# Structured data for search engines (start page only): who we are and where else we are.
# Google uses sameAs to connect the site with the social profiles.
SAME_AS = [u for u in (INSTA, TIKTOK, SPOTIFY, SPOTIFY_VOID) if u]
SCHEMA = '''<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://eazrbeats.de/#website",
      "url": "https://eazrbeats.de/",
      "name": "EAZr Beats Collective",
      "alternateName": ["EAZr Beats", "EAZr"],
      "inLanguage": ["de", "en"],
      "publisher": {"@id": "https://eazrbeats.de/#collective"}
    },
    {
      "@type": "MusicGroup",
      "@id": "https://eazrbeats.de/#collective",
      "name": "EAZr Beats Collective",
      "alternateName": ["EAZr Beats", "EAZr"],
      "url": "https://eazrbeats.de/",
      "logo": "https://eazrbeats.de/icon-512.png",
      "image": "https://eazrbeats.de/og-image.jpg",
      "description": "House- und Techno-Kollektiv aus München.",
      "genre": ["House", "Melodic House & Techno", "Afro House", "Latin House"],
      "foundingLocation": {"@type": "Place", "name": "München, Deutschland"},
      "email": "''' + KONTAKT + '''",
      "sameAs": ''' + '[' + ', '.join(f'"{u}"' for u in SAME_AS) + ']' + '''
    }
  ]
}
</script>
'''

def page(name, title, desc, canon, body, scripts=()):
    nav = [('about', 'about.html', 'navAbout', 'About')]
    nav += ([('events', 'events.html', 'navEvents', 'Events'),
             ('mixes', 'mixes.html', 'navMixes', 'Mixes')] if SPLIT_NEXT else
            [('next', 'next.html', 'navNext', 'Next')])
    nav += [('crate', 'crate.html', None, 'Crate'),
           ('void', 'void.html', None, 'VOID'),
           ('booking', 'booking.html', None, 'Booking'),
           ('kontakt', 'kontakt.html', 'navKontakt', 'Kontakt')]
    links = '\n'.join(
        f'      <a href="{h}" data-page="{k}"' + (f' data-i18n="{i}"' if i else '') + f'>{l}</a>'
        for k, h, i, l in nav)
    sc = ''.join(f'<script src="{s}"></script>\n' for s in ('site.js',) + tuple(scripts))
    return f'''<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta name="theme-color" content="#050403">
<link rel="canonical" href="https://eazrbeats.de/{canon}">
<link rel="icon" type="image/png" sizes="32x32" href="favicon-32.png">
<link rel="icon" type="image/png" sizes="512x512" href="icon-512.png">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<meta property="og:type" content="website">
<meta property="og:url" content="https://eazrbeats.de/{canon}">
<meta property="og:site_name" content="EAZr Beats Collective">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:image" content="https://eazrbeats.de/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="preload" href="fonts/space-mono-400.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="fonts/space-mono-700.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="style.css">
{SCHEMA if name == 'start' else ''}</head>
<body data-page="{name}">

<video class="bg-video" autoplay muted loop playsinline poster="hero-bg.jpg" aria-hidden="true">
  <source src="hero-bg.mp4" type="video/mp4">
</video>
<div class="page-scrim"></div>
<div class="scanlines"></div>
<div class="vignette"></div>
<div class="flicker"></div>

<div class="topbar">
  <div class="chrome">
    <div class="dots">
      <span class="dot-btn r"></span>
      <span class="dot-btn y"></span>
      <span class="dot-btn g"></span>
    </div>
    <span class="chrome-title">eazr@collective: ~/{'' if name == 'start' else name}</span>
    <div class="lang-toggle" role="group" aria-label="Language">
      <button type="button" data-lang="de" class="active">DE</button>
      <button type="button" data-lang="en">EN</button>
    </div>
  </div>
  <nav class="nav" aria-label="Menü">
    <a class="brand" href="index.html" aria-label="EAZr Beats Collective, Startseite">
      <img src="logo-mark.png" alt="EAZr">
      <span>BEATS COLLECTIVE</span>
    </a>
    <button type="button" class="menu-btn" aria-expanded="false" aria-controls="nav-links"><span data-i18n="menu">Menü</span> <span aria-hidden="true">≡</span></button>
    <div class="nav-links" id="nav-links">
{links}
    </div>
  </nav>
</div>

<main>
{body}</main>

{footer}
{sc}</body></html>
'''

def head(cmd, h1):
    return f'''  <div class="sec-head">
    <span class="cmd-line"><span class="prompt">eazr@collective:~$</span> {cmd}</span>
    <h1>{h1}</h1>
  </div>
'''

# ---------------- void ----------------
# Techno sister of the Crate; crate.js renders it from void.json.
void_sec = f'''<div class="band first">
<section class="sec" id="void">
  <header class="masthead">
    <div class="void-ring" aria-hidden="true"></div>
    <div class="badge"><span>SIGNAL LOG</span><span class="cursor">_</span></div>
    <h1 class="wordmark">THE <span class="hollow">VOID</span></h1>
    <p class="sub" data-i18n="voidSub"></p>
    <a class="btn ghost spotify-link" href="{SPOTIFY_VOID}" target="_blank" rel="noopener" data-i18n="crateSpotify">▶ Playlist auf Spotify hören</a>
    <div class="genre-tabs" id="genre-tabs" role="tablist" aria-label="Genre"></div>
  </header>

  <div id="genres"></div>

  <div class="meta"><span data-i18n="voidFooter"></span> · <span data-i18n="crateUpdatedLabel">zuletzt aktualisiert:</span> <span id="updated">–</span></div>
</section>
</div>
'''

# ---------------- start ----------------
start = f'''<section class="hero" id="top">
  <h1 class="sr-only">EAZr Beats Collective · House &amp; Techno aus München</h1>
  <div class="badge"><span data-i18n="badgeComingSoon">COMING SOON</span><span class="cursor">_</span></div>
  <p class="tagline" data-i18n="heroTagline">MÜNCHNER HOUSE &amp; TECHNO — NEUE SETS, SESSIONS UND SHOWS FOLGEN BALD.</p>
  <span class="prompt">eazr@beats:~$ follow --instagram</span>
  <div class="cta-row">
    <a class="btn" href="{INSTA}" target="_blank" rel="noopener">@eazrbeats</a>
    <a class="btn ghost" href="crate.html" data-i18n="ctaCrate">The Crate →</a>
    <a class="btn ghost" href="void.html" data-i18n="ctaVoid">The Void →</a>
  </div>
</section>

<div class="band">
<section class="sec" id="dig">
  <div class="sec-head">
    <span class="cmd-line"><span class="prompt">eazr@crate:~$</span> shuf -n1</span>
    <h2>Dig the Crate</h2>
  </div>
  <p class="lead" data-i18n="digText">Genre wählen, Knopf drücken, neuen Track entdecken.</p>
  <div class="dig-box">
    <div class="genre-tabs dig-tabs" id="dig-tabs" role="group" aria-label="Genre"></div>
    <div class="dig-out" id="dig-out" aria-live="polite"></div>
    <button type="button" class="btn dig-btn" id="dig-btn"><span data-i18n="digBtn">Shuffle</span> ⟳</button>
  </div>
</section>
</div>

<div class="band alt">
<section class="sec" id="fresh-sec">
  <div class="sec-head">
    <span class="cmd-line"><span class="prompt">eazr@crate:~$</span> ls -t ./weekly-hot | head</span>
    <h2 data-i18n="freshTitle">Frisch in der Crate</h2>
  </div>
  <p class="lead" data-i18n="freshText">Die neuesten Weekly-Hot-Picks aus allen vier Genres.</p>
  <div class="picks" id="fresh"></div>
  <a class="btn ghost more" href="crate.html" data-i18n="freshAll">Ganze Crate →</a>
</section>
</div>

<div class="band">
<section class="sec" id="join">
  <div class="sec-head">
    <span class="cmd-line"><span class="prompt">eazr@collective:~$</span> ./join</span>
    <h2 data-i18n="joinTitle">Mach mit</h2>
  </div>
  <div class="cards four">
    <div class="card hot">
      <span class="kicker">01</span>
      <h3 data-i18n="joinFollowTitle">Folgen</h3>
      <p data-i18n="joinFollowText">Crate Picks jeden Sonntag, dazu Road to Live und München.</p>
      <a class="btn" href="{INSTA}" target="_blank" rel="noopener">@eazrbeats</a>
    </div>
    <div class="card">
      <span class="kicker">02</span>
      <h3 data-i18n="joinTipTitle">Track-Tipp</h3>
      <p data-i18n="joinTipText">Du hast einen Track, der in die Crate gehört? Schick ihn uns.</p>
      <a class="btn ghost" href="mailto:{KONTAKT}?subject=Track-Tipp%20f%C3%BCr%20The%20Crate" data-i18n="joinTipBtn">Tipp schicken</a>
    </div>
    <div class="card">
      <span class="kicker">03</span>
      <h3 data-i18n="joinMixTitle">Mix einschicken</h3>
      <p data-i18n="joinMixText">Du legst House auf und kommst aus München? Wir wollen deinen Mix hören.</p>
      <a class="btn ghost" href="mailto:{KONTAKT}?subject=Mix-Einsendung" data-i18n="joinMixBtn">Mix schicken</a>
    </div>
    <div class="card">
      <span class="kicker">04</span>
      <h3>Newsletter</h3>
      <p data-i18n="joinNewsText"></p>
      {news_form('home')}
    </div>
  </div>
</section>
</div>

<div class="band alt">
<section class="sec" id="more">
  <div class="cards">
    <div class="card">
      <span class="kicker">whoami</span>
      <h3>About</h3>
      <p data-i18n="teaserAboutText">Münchner House-Kollektiv. Wer wir sind und was wir vorhaben.</p>
      <a class="btn ghost" href="about.html" data-i18n="teaserAboutBtn">Über uns →</a>
    </div>
    <div class="card">
      <span class="kicker">{'ls ./events' if SPLIT_NEXT else 'ls ./next'}</span>
      <h3>{'Events' if SPLIT_NEXT else 'Next'}</h3>
      <p data-i18n="teaserEventsText">Eigene Open-Air-Reihe ab Sommer 2027, dazu gefilmte Sessions.</p>
      <a class="btn ghost" href="{'events.html' if SPLIT_NEXT else 'next.html'}" data-i18n="{'teaserEventsBtn' if SPLIT_NEXT else 'teaserNextBtn'}"></a>
    </div>
  </div>
</section>
</div>
'''

# ---------------- about ----------------
def crew(n, name, role_key, role, bio_key, bio, alias=''):
    h3 = f'{alias} <span class="real-name">· {name}</span>' if alias else name
    return f'''    <div class="card crew">
      <div class="avatar" aria-hidden="true">{name[0]}</div>
      <span class="kicker">crew/0{n}</span>
      <h3>{h3}</h3>
      <span class="role" data-i18n="{role_key}">{role}</span>
      <p data-i18n="{bio_key}">{bio}</p>
    </div>
'''
about = f'''<div class="band first">
<section class="sec" id="about">
{head('whoami', 'About')}  <p class="lead" data-i18n="aboutText">EAZr Beats Collective ist ein Münchner House- und Techno-Kollektiv.</p>

  <h2 class="sub-h" data-i18n="aboutWhatTitle">Was wir machen</h2>
  <div class="cards four">
    <div class="card"><span class="kicker">01</span><h3 data-i18n="aboutSetsTitle">DJ-Sets</h3><p data-i18n="aboutSetsText"></p></div>
    <div class="card"><span class="kicker">02</span><h3 data-i18n="aboutFormatsTitle">Eigene Formate</h3><p data-i18n="aboutFormatsText"></p></div>
    <div class="card"><span class="kicker">03</span><h3 data-i18n="aboutTracksTitle">Eigene Tracks</h3><p data-i18n="aboutTracksText"></p></div>
    <div class="card"><span class="kicker">04</span><h3 data-i18n="aboutCrateTitle">The Crate</h3><p data-i18n="aboutCrateText"></p><a class="btn ghost" href="crate.html" data-i18n="teaserCrateBtn">Zur Crate →</a></div>
  </div>

  <h2 class="sub-h" data-i18n="crewTitle">Crew</h2>
  <div class="cards four">
{crew(1, 'Laura', 'roleLaura', 'Gründerin · Social Media · Promo', 'bioLaura', '')}{crew(2, 'Noah', 'roleNoah', 'Gründer · DJ · Design', 'bioNoah', '', 'NMB')}{crew(3, 'Wiktor', 'roleWiktor', 'Host · MC · Live', 'bioWiktor', '', 'WIVI')}    <div class="card crew">
      <div class="avatar open" aria-hidden="true">?</div>
      <span class="kicker">crew/04</span>
      <h3 data-i18n="crewOpenTitle">Du?</h3>
      <p data-i18n="crewOpenText"></p>
    </div>
  </div>

  <div class="booking-box" style="margin-top:40px">
    <h2 class="sub-h" style="margin:0" data-i18n="joinCrewTitle">Mitmachen</h2>
    <p class="lead" style="margin:0" data-i18n="joinCrewText"></p>
    <a class="btn" href="mailto:{KONTAKT}?subject=Mitmachen%20bei%20EAZr" data-i18n="joinCrewBtn">Mail schreiben</a>
  </div>
</section>
</div>
'''

# ---------------- events ----------------
events = f'''<div class="band first">
<section class="sec" id="events">
{head('ls ./events', 'Events')}
  <h2 class="sub-h" data-i18n="eventsUpcoming">Coming up</h2>
  <div class="cards">
    <div class="card hot">
      <span class="kicker" data-i18n="openAirKicker">Sommer 2027 · München</span>
      <h3>Open Air</h3>
      <p data-i18n="openAirText"></p>
    </div>
    <div class="card">
      <span class="kicker" data-i18n="sessionsKicker">Format · in Arbeit</span>
      <h3>EAZr Sessions</h3>
      <p data-i18n="sessionsText"></p>
    </div>
  </div>

  <h2 class="sub-h" data-i18n="eventsPast">Archiv</h2>
  <div class="empty">
    <div class="empty-title" data-i18n="eventsPastEmptyTitle">Noch keine vergangenen Events</div>
    <p data-i18n="eventsPastEmptyText"></p>
  </div>

  <div class="booking-box" style="margin-top:40px">
    <p class="lead" style="margin:0" data-i18n="eventsNotify"></p>
    <a class="btn" href="{INSTA}" target="_blank" rel="noopener">@eazrbeats</a>
  </div>
</section>
</div>
'''

# ---------------- mixes ----------------
mixes = f'''<div class="band first">
<section class="sec" id="mixes">
{head('ls ./mixes', 'Mixes')}  <p class="lead" data-i18n="mixesText"></p>
  <!-- Neuer Mix: Karte kopieren, Titel/Datum eintragen und den SoundCloud-Embed (iframe) in .mix-embed setzen. -->
  <div class="cards">
    <div class="card">
      <span class="kicker">mix/01</span>
      <h3 data-i18n="mixesSoonTitle">Mix 01 · in Arbeit</h3>
      <div class="mix-embed placeholder" aria-hidden="true"><span>▶ ▮▮▮▯▯▯▯▯▯▯</span></div>
      <p data-i18n="mixesSoonText"></p>
    </div>
    <div class="card hot">
      <span class="kicker">instagram · tue 19:00</span>
      <h3 data-i18n="mixesRoadTitle">Road to Live</h3>
      <p data-i18n="mixesRoadText"></p>
      <a class="btn" href="{INSTA}" target="_blank" rel="noopener" data-i18n="mixesRoadBtn">Auf Instagram ansehen ↗</a>
    </div>
  </div>
</section>
</div>
'''

# ---------------- next (events + mixes in one, while both are empty) ----------------
nextpage = f'''<div class="band first">
<section class="sec" id="next">
{head('ls ./next', 'Next')}  <p class="lead" data-i18n="nextText"></p>
  <!-- Neuer Mix: Karte "mix/01" ersetzen, Titel eintragen und den SoundCloud-Embed (iframe) in .mix-embed setzen. -->
  <div class="cards">
    <div class="card hot">
      <span class="kicker" data-i18n="openAirKicker">Sommer 2027 · München</span>
      <h3>Open Air</h3>
      <p data-i18n="openAirText"></p>
    </div>
    <div class="card">
      <span class="kicker" data-i18n="sessionsKicker">Format · in Arbeit</span>
      <h3>EAZr Sessions</h3>
      <p data-i18n="sessionsText"></p>
    </div>
    <div class="card">
      <span class="kicker">mix/01</span>
      <h3 data-i18n="mixesSoonTitle">Mix 01 · in Arbeit</h3>
      <div class="mix-embed placeholder" aria-hidden="true"><span>▶ ▮▮▮▯▯▯▯▯▯▯</span></div>
      <p data-i18n="mixesSoonText"></p>
    </div>
    <div class="card">
      <span class="kicker">instagram · tue 19:00</span>
      <h3 data-i18n="mixesRoadTitle">Road to Live</h3>
      <p data-i18n="mixesRoadText"></p>
      <a class="btn" href="{INSTA}" target="_blank" rel="noopener" data-i18n="mixesRoadBtn">Auf Instagram ansehen ↗</a>
    </div>
  </div>

  <div class="booking-box" style="margin-top:40px">
    <p class="lead" style="margin:0" data-i18n="eventsNotify"></p>
    <a class="btn" href="{INSTA}" target="_blank" rel="noopener">@eazrbeats</a>
  </div>
</section>
</div>
'''

def redirect(to, title):
    return f'''<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<title>{title}</title>
<meta name="robots" content="noindex">
<link rel="canonical" href="https://eazrbeats.de/{to}">
<meta http-equiv="refresh" content="0; url={to}">
<script>location.replace('{to}' + location.hash);</script>
</head>
<body style="background:#050403;color:#EFE9FF;font-family:monospace">
<p><a href="{to}" style="color:#EFE9FF">{to}</a></p>
</body>
</html>
'''

# ---------------- booking ----------------
booking = f'''<div class="band first">
<section class="sec" id="booking">
{head('./booking --request', 'Booking')}  <div class="booking-box">
    <p class="lead" style="margin:0" data-i18n="bookingText"></p>
    <a class="btn" href="mailto:{BOOKING}?subject=Booking%20EAZr%20Beats%20Collective" data-i18n="bookingBtn">Anfrage senden</a>
    <p class="booking-note" data-i18n="bookingOther"></p>
  </div>
  <div class="cards" style="margin-top:14px">
    <div class="card"><span class="kicker">01</span><h3 data-i18n="bookingWhat">Was wir mitbringen</h3><p data-i18n="bookingWhatText"></p></div>
    <div class="card"><span class="kicker">02</span><h3 data-i18n="bookingInfo">Was in die Mail gehört</h3><p data-i18n="bookingInfoText"></p></div>
  </div>
</section>
</div>

<div class="band alt">
<section class="sec" id="presskit">
  <div class="sec-head">
    <span class="cmd-line"><span class="prompt">eazr@collective:~$</span> ls ./press</span>
    <h2 data-i18n="pressTitle"></h2>
  </div>
  <p class="lead" data-i18n="pressText"></p>
  <div class="cards">
    <div class="card">
      <span class="kicker">press/logo</span>
      <h3 data-i18n="pressLogo"></h3>
      <img class="press-logo" src="press/eazr-logo-1080.png" alt="EAZr Logo" width="1080" height="1080" loading="lazy">
      <p data-i18n="pressLogoText"></p>
      <div class="cta-row" style="justify-content:flex-start">
        <a class="btn ghost" href="press/eazr-logo-1080.png" download data-i18n="pressLogoDark"></a>
        <a class="btn ghost" href="press/eazr-logo-transparent.png" download data-i18n="pressLogoClear"></a>
      </div>
    </div>
    <div class="card">
      <span class="kicker">press/bio</span>
      <h3 data-i18n="pressBio"></h3>
      <p id="press-bio" data-i18n="pressBioText"></p>
      <button type="button" class="btn ghost" data-copy-from="press-bio" data-i18n="pressCopy"></button>
      <span class="kicker" style="margin-top:22px">press/photos</span>
      <p data-i18n="pressPhotosText"></p>
    </div>
  </div>
</section>
</div>
'''

# ---------------- 404 ----------------
notfound = '''<div class="band first">
<section class="sec" id="notfound">
  <div class="sec-head">
    <span class="cmd-line"><span class="prompt">eazr@collective:~$</span> cd ./page</span>
    <h1>404</h1>
  </div>
  <p class="cmd-line" style="margin-bottom:14px">bash: cd: ./page: No such file or directory</p>
  <p class="lead" data-i18n="notFoundText"></p>
  <div class="cta-row" style="justify-content:flex-start">
    <a class="btn" href="index.html" data-i18n="notFoundHome"></a>
    <a class="btn ghost" href="crate.html">The Crate →</a>
  </div>
</section>
</div>
'''


# ---------------- kontakt ----------------
kontakt = f'''<div class="band first">
<section class="sec" id="kontakt">
{head('./kontakt', '<span data-i18n="kontaktTitle">Kontakt</span>')}  <div class="booking-box">
    <p class="lead" style="margin:0" data-i18n="kontaktText"></p>
    <span class="mail" id="kontakt-mail">{KONTAKT}</span>
    <div class="cta-row" style="justify-content:flex-start">
      <a class="btn" href="mailto:{KONTAKT}" data-i18n="kontaktBtn">Mail schreiben</a>
      <button type="button" class="btn ghost" id="copy-mail" data-copy-from="kontakt-mail" data-i18n="kontaktCopy">Adresse kopieren</button>
    </div>
    <p class="booking-note" data-i18n="kontaktBooking"></p>
  </div>
  <div class="cards" style="margin-top:14px">
    <div class="card"><span class="kicker">newsletter</span><h3>News</h3><p data-i18n="joinNewsText"></p>{news_form('kontakt')}</div>
    <div class="card"><span class="kicker">instagram</span><h3>@eazrbeats</h3><p data-i18n="joinFollowText"></p><a class="btn ghost" href="{INSTA}" target="_blank" rel="noopener">Instagram ↗</a></div>
  </div>
</section>
</div>
'''

D = 'Munich house &amp; techno collective — new sets, sessions and shows dropping soon.'
files = {
  'index.html': page('start', 'EAZr Beats Collective · House &amp; Techno aus München', D, '', start, ['home.js']),
  'about.html': page('about', 'About · EAZr Beats Collective', 'Who we are: a house and techno collective from Munich.', 'about', about),
  'crate.html': page('crate', "The Crate · EAZr Beats Collective", "Selector's log: tracks running in DJ sets right now, confirmed by two independent sources. House, Melodic House &amp; Techno, Afro House, Latin House.", 'crate', crate_sec, ['crate.js']),
  'void.html': page('void', "The Void · EAZr Beats Collective", "Signal log: techno running in DJ sets right now, confirmed by two independent sources. Peak Time / Driving, Raw / Deep / Hypnotic, Hard Techno.", 'void', void_sec, ['crate.js']),
  'kontakt.html': page('kontakt', 'Kontakt · EAZr Beats Collective', 'Contact EAZr Beats Collective, Munich.', 'kontakt', kontakt),
  '404.html': page('404', '404 · EAZr Beats Collective', 'Page not found.', '', notfound).replace('<meta charset="utf-8">', '<meta charset="utf-8">\n<base href="/">\n<meta name="robots" content="noindex">'),
  'booking.html': page('booking', 'Booking · EAZr Beats Collective', 'Book EAZr Beats Collective for clubs, bars, open airs and private events in Munich.', 'booking', booking),
}
if SPLIT_NEXT:
    files['events.html'] = page('events', 'Events · EAZr Beats Collective', 'Upcoming and past EAZr Beats Collective events in Munich.', 'events', events)
    files['mixes.html'] = page('mixes', 'Mixes · EAZr Beats Collective', 'Sets, recordings and studio sessions by EAZr Beats Collective.', 'mixes', mixes)
    files['next.html'] = redirect('events.html', 'Events · EAZr Beats Collective')
else:
    files['next.html'] = page('next', 'Next · EAZr Beats Collective', 'What is next for EAZr Beats Collective: our own events in Munich and the first mixes.', 'next', nextpage)
    files['events.html'] = redirect('next.html', 'Next · EAZr Beats Collective')
    files['mixes.html'] = redirect('next.html', 'Next · EAZr Beats Collective')
for f, c in files.items():
    open(f, 'w').write(c)
print('ok')

# fill empty i18n elements with the German text so the pages read fine without JS / for search engines
js = open('site.js').read()
de = js[js.index('de: {'):js.index('\n  en: {')]
DE = {}
for m in re.finditer(r"^\s{4}(\w+): (['\"])(.*?)\2,\s*$", de, re.M):
    DE[m.group(1)] = m.group(3).replace("\\'", "'")
for f in files:
    s = open(f).read()
    s = re.sub(r'data-i18n="(\w+)"></', lambda m: f'data-i18n="{m.group(1)}">{DE.get(m.group(1), "")}</', s)
    open(f, 'w').write(s)
print('filled', len(DE))

# sitemap + robots for search engines: every real page (no redirects, 404, or the noindex legal pages)
SITEMAP = [''] + [f for f in files if f not in ('index.html', '404.html') and 'noindex' not in files[f]]
open('sitemap.xml', 'w').write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    + ''.join(f'  <url><loc>https://eazrbeats.de/{u}</loc></url>\n' for u in SITEMAP) + '</urlset>\n')
open('robots.txt', 'w').write('User-agent: *\nAllow: /\n\nSitemap: https://eazrbeats.de/sitemap.xml\n')
print('sitemap', len(SITEMAP))
