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
TWITCH = 'https://www.twitch.tv/eazrbeats'  # EMBERS live streams
INSTA_EMBERS = 'https://www.instagram.com/eazrembers/'
INSTA_LAURA = 'https://www.instagram.com/laurajanevucak/'
INSTA_NMB = 'https://www.instagram.com/nmb.muc/'
INSTA_WIVI = 'https://www.instagram.com/_wjackowsky/'  # Noah's personal DJ account, linked on his crew card  # EMBERS sub-account, linked on /embers
# Next EMBERS session shown on /embers and on the /live overview. Empty = 'date TBA' text from site.js.
# Example: LIVE_NEXT = 'EMBERS 001 · Fr 16.01.2027 · 21:00'
LIVE_NEXT = 'EMBERS 001 · KW 1 · 2027'
# Countdown on /embers. Until the exact day is public it counts down to the start of KW 1.
# Once the date is announced, set the exact start, e.g. '2027-01-08T21:30:00+01:00'.
LIVE_COUNTDOWN = '2027-01-04T00:00:00+01:00'
LIVE_COUNTDOWN_EXACT = False  # True = show days/hours/min/sec to the stream start
# Embedded Twitch player on /embers. Keep False until the Twitch channel is fully set up.
TWITCH_EMBED = False  # Before switching on: add a Twitch embed section to datenschutz.html (an iframe sends data to Twitch on page load; the policy currently says "links only, nothing embedded").
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
SAME_AS = [u for u in (INSTA, TIKTOK, TWITCH, SPOTIFY, SPOTIFY_VOID) if u]
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
      "genre": ["House", "Melodic House & Techno", "Afro House", "Latin House", "Techno", "Melodic Techno"],
      "foundingLocation": {"@type": "Place", "name": "München, Deutschland"},
      "email": "''' + KONTAKT + '''",
      "sameAs": ''' + '[' + ', '.join(f'"{u}"' for u in SAME_AS) + ']' + '''
    }
  ]
}
</script>
'''

# Cache busting: browsers keep style.css and scripts for a while, so new pages could
# load with old CSS. Each reference gets ?v=<content hash> and changes with the file.
import hashlib
def v(f):
    return f + '?v=' + hashlib.md5(open(f, 'rb').read()).hexdigest()[:8]

BG_LAYERS = '''
<video class="bg-video" autoplay muted loop playsinline poster="hero-bg.jpg" aria-hidden="true">
  <source src="hero-bg.mp4" type="video/mp4">
</video>
<div class="page-scrim"></div>
<div class="scanlines"></div>
<div class="vignette"></div>
<div class="flicker"></div>
'''
def page(name, title, desc, canon, body, scripts=(), og='og-image.jpg', css=(), immersive=False):
    # immersive=True: the page brings its own full-screen background (e.g. /embers), so the site's video/scanline layers are left out.
    nav = [('about', 'about', 'navAbout', 'About')]
    nav += ([('events', 'events', 'navEvents', 'Events'),
             ('mixes', 'mixes', 'navMixes', 'Mixes')] if SPLIT_NEXT else
            [('next', 'next', 'navNext', 'Next')])
    nav += [('crate', 'crate', None, 'Crate'),
           ('void', 'void', None, 'VOID'),
           ('live', 'live', None, 'Live'),
           ('booking', 'booking', None, 'Booking'),
           ('kontakt', 'kontakt', 'navKontakt', 'Kontakt')]
    links = '\n'.join(
        f'      <a href="{h}" data-page="{k}"' + (f' data-i18n="{i}"' if i else '') + f'>{l}</a>'
        for k, h, i, l in nav)
    sc = ''.join(f'<script src="{v(s)}"></script>\n' for s in ('site.js',) + tuple(scripts))
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
<meta property="og:image" content="https://eazrbeats.de/{og}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="preload" href="fonts/space-mono-400.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="fonts/space-mono-700.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="{v('style.css')}">
{''.join(f'<link rel="stylesheet" href="{v(c)}">' + chr(10) for c in css)}{SCHEMA if name == 'start' else ''}</head>
<body data-page="{name}">
{'' if immersive else BG_LAYERS}{'<div class="hack-glitch" aria-hidden="true"><div class="grain"></div><canvas></canvas><div class="ember"></div><img class="elogo" src="embers-logo.png" alt=""></div>' if name == 'start' else ''}

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
    <a class="brand" href="/" aria-label="EAZr Beats Collective, Startseite">
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
void_sec = f'''<div class="void-bg" aria-hidden="true">
  <div class="vb-stars"></div><div class="vb-halo"></div><div class="vb-disk"></div><div class="vb-lens"></div><div class="vb-horizon"></div><div class="vb-disk front"></div>
</div>
<div class="band first">
<section class="sec" id="void">
  <header class="masthead">
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
  <div class="badge"><span data-i18n="badgeComingSoon">LIVE LOADING</span><span class="cursor">_</span></div>
  <p class="tagline" data-i18n="heroTagline">MÜNCHNER HOUSE &amp; TECHNO — NEUE SETS, SESSIONS UND SHOWS FOLGEN BALD.</p>
  <span class="prompt">eazr@beats:~$ follow --instagram</span>
  <div class="cta-row">
    <a class="btn" href="{INSTA}" target="_blank" rel="noopener">@eazrbeats</a>
    <a class="btn ghost" href="crate" data-i18n="ctaCrate">The Crate →</a>
    <a class="btn ghost" href="void" data-i18n="ctaVoid">The Void →</a>
  </div>
</section>

<div class="band">
<section class="sec" id="embers-001">
  <div class="sec-head">
    <span class="cmd-line"><span class="prompt">eazr@embers:~$</span> ./next --session 001</span>
    <h2 class="embers-title"><img src="embers-logo.png" alt="EMBERS" width="1000" height="167"><span class="num">001</span><span class="by">by EAZr</span></h2>
  </div>
  <div class="event-promo">
    <a class="event-poster" href="embers" aria-label="EMBERS 001 · KW 1 2027 · Zu EMBERS">
      <img src="embers-001-poster-sm.jpg" srcset="embers-001-poster-sm.jpg 640w, embers-001-poster.jpg 1200w" sizes="(max-width: 700px) 90vw, 380px" alt="Plakat EMBERS 001: Hosted live DJ session, KW 1 2027, Doors 20:00, Stream 21:30, München" width="640" height="904" loading="lazy">
    </a>
    <div class="event-info">
      <span class="kicker"><span class="live-dot" aria-hidden="true"></span>LIVE LOADING</span>
      <h3 class="event-date" data-i18n="eventDate">KW 1 · 2027 · München</h3>
      <p data-i18n="eventTimes">Einlass 20:00 · Stream ab 21:30 auf Twitch</p>
      <p data-i18n="eventMore">Location, Tickets und Gästeliste folgen auf Instagram und im Newsletter.</p>
      <div class="cta-row" style="justify-content:flex-start">
        <a class="btn" href="embers" data-i18n="embersBtn">Zu EMBERS →</a>
        <a class="btn ghost" href="{INSTA}" target="_blank" rel="noopener">@eazrbeats ↗</a>
      </div>
    </div>
  </div>
</section>
</div>

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
  <a class="btn ghost more" href="crate" data-i18n="freshAll">Ganze Crate →</a>
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
      <p data-i18n="joinFollowText"></p>
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
      <p data-i18n="joinMixText">Du legst House oder Techno auf und kommst aus München? Wir wollen deinen Mix hören.</p>
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
      <p data-i18n="teaserAboutText">Münchner House- und Techno-Kollektiv. Wer wir sind und was wir vorhaben.</p>
      <a class="btn ghost" href="about" data-i18n="teaserAboutBtn">Über uns →</a>
    </div>
    <div class="card">
      <span class="kicker">{'ls ./events' if SPLIT_NEXT else 'ls ./next'}</span>
      <h3>{'Events' if SPLIT_NEXT else 'Next'}</h3>
      <p data-i18n="teaserEventsText">Eigene Open-Air-Reihe ab Sommer 2027, dazu gefilmte Sessions.</p>
      <a class="btn ghost" href="{'events' if SPLIT_NEXT else 'next'}" data-i18n="{'teaserEventsBtn' if SPLIT_NEXT else 'teaserNextBtn'}"></a>
    </div>
  </div>
</section>
</div>
'''

# ---------------- about ----------------
# EMBERS brand mark: wherever EMBERS is named, the logo goes with it (Noah 07.11.2026: brand recognition).
EMBERS_MARK = '<a class="embers-mark" href="embers" aria-label="EMBERS by EAZr"><img src="embers-logo.png" alt="EMBERS" width="1000" height="167" loading="lazy"><span>by EAZr</span></a>'

def crew(n, name, role_key, role, bio_key, bio, alias='', insta='', extra=''):
    ig = f'\n      <a class="crew-ig" href="{insta}" target="_blank" rel="noopener">@{insta.rstrip("/").rsplit("/", 1)[-1]} ↗</a>' if insta else ''
    h3 = f'{alias} <span class="real-name">· {name}</span>' if alias else name
    return f'''    <div class="card crew">
      <div class="avatar" aria-hidden="true">{name[0]}</div>
      <span class="kicker">crew/0{n}</span>
      <h3>{h3}</h3>
      <span class="role" data-i18n="{role_key}">{role}</span>
      <p data-i18n="{bio_key}">{bio}</p>{extra}{ig}
    </div>
'''
about = f'''<div class="band first">
<section class="sec" id="about">
{head('whoami', 'About')}  <p class="lead" data-i18n="aboutText">EAZr Beats Collective ist ein Münchner House- und Techno-Kollektiv.</p>

  <h2 class="sub-h" data-i18n="aboutWhatTitle">Was wir machen</h2>
  <div class="cards four">
    <div class="card"><span class="kicker">01</span><h3 data-i18n="aboutSetsTitle">DJ-Sets</h3><p data-i18n="aboutSetsText"></p></div>
    <div class="card"><span class="kicker">02</span><h3 data-i18n="aboutFormatsTitle">Eigene Formate</h3><p data-i18n="aboutFormatsText"></p>{EMBERS_MARK}<a class="btn ghost" href="next" data-i18n="teaserNextBtn">Was kommt →</a></div>
    <div class="card"><span class="kicker">03</span><h3 data-i18n="aboutTracksTitle">Eigene Tracks</h3><p data-i18n="aboutTracksText"></p></div>
    <div class="card"><span class="kicker">04</span><h3 data-i18n="aboutCrateTitle">The Crate &amp; The Void</h3><p data-i18n="aboutCrateText"></p><div class="cta-row" style="justify-content:flex-start"><a class="btn ghost" href="crate" data-i18n="ctaCrate">The Crate →</a><a class="btn ghost" href="void" data-i18n="ctaVoid">The Void →</a></div></div>
  </div>

  <h2 class="sub-h" data-i18n="crewTitle">Crew</h2>
  <div class="cards four">
{crew(1, 'Laura', 'roleLaura', 'Gründerin · Social Media · Promo', 'bioLaura', '', '', INSTA_LAURA)}{crew(2, 'Noah', 'roleNoah', 'Gründer · DJ · Design', 'bioNoah', '', 'NMB', INSTA_NMB, EMBERS_MARK)}{crew(3, 'Wiktor', 'roleWiktor', 'Host · MC · Live', 'bioWiktor', '', 'WIVI', INSTA_WIVI, EMBERS_MARK)}    <div class="card crew">
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

EMBERS_DATE = 'KW 1 · 2027'   # DATE box on /embers
EMBERS_VENUE = 'TBA'          # VENUE box on /embers

# ---------------- events ----------------
events = f'''<div class="band first">
<section class="sec" id="events">
{head('ls ./events', 'Events')}
  <h2 class="sub-h" data-i18n="eventsUpcoming">Coming up</h2>
  <div class="cards">
    <div class="card hot">
      <span class="kicker">{EMBERS_DATE} · München</span>
      <h3 class="card-emb"><img src="embers-logo.png" alt="EMBERS" width="1000" height="167" loading="lazy"><span>001</span></h3>
      <p data-i18n="sessionsText"></p>
      <a class="btn ghost" href="embers" data-i18n="emCardBtn">Zur EMBERS-Seite →</a>
    </div>
    <div class="card">
      <span class="kicker" data-i18n="openAirKicker">Sommer 2027 · München</span>
      <h3>Open Air</h3>
      <p data-i18n="openAirText"></p>
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
      <span class="kicker">instagram · tue &amp; thu</span>
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
      <span class="kicker">{EMBERS_DATE} · München</span>
      <h3 class="card-emb"><img src="embers-logo.png" alt="EMBERS" width="1000" height="167" loading="lazy"><span>001</span></h3>
      <p data-i18n="sessionsText"></p>
      <a class="btn ghost" href="embers" data-i18n="emCardBtn">Zur EMBERS-Seite →</a>
    </div>
    <div class="card">
      <span class="kicker" data-i18n="openAirKicker">Sommer 2027 · München</span>
      <h3>Open Air</h3>
      <p data-i18n="openAirText"></p>
    </div>
    <div class="card">
      <span class="kicker">mix/01</span>
      <h3 data-i18n="mixesSoonTitle">Mix 01 · in Arbeit</h3>
      <div class="mix-embed placeholder" aria-hidden="true"><span>▶ ▮▮▮▯▯▯▯▯▯▯</span></div>
      <p data-i18n="mixesSoonText"></p>
    </div>
    <div class="card">
      <span class="kicker">instagram · tue &amp; thu</span>
      <h3 data-i18n="mixesRoadTitle">Road to Live</h3>
      <p data-i18n="mixesRoadText"></p>
      <a class="btn" href="{INSTA}" target="_blank" rel="noopener" data-i18n="mixesRoadBtn">Auf Instagram ansehen ↗</a>
    </div>
  </div>

  <div class="booking-box" style="margin-top:40px">
    <p class="lead" style="margin:0" data-i18n="eventsNotify"></p>
    <a class="btn" href="{INSTA}" target="_blank" rel="noopener">@eazrbeats</a>
    {news_form('next')}
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
    <a class="btn" href="/" data-i18n="notFoundHome"></a>
    <a class="btn ghost" href="crate">The Crate →</a>
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

# ---------------- embers (EMBERS page, /embers) ----------------
live_next = f'<h2 class="live-next" data-i18n="liveNextDate">{LIVE_NEXT}</h2>' if LIVE_NEXT else '<h2 class="live-next" data-i18n="liveNextTba"></h2>'
live_countdown = (f'<p class="countdown" data-target="{LIVE_COUNTDOWN}" data-exact="{1 if LIVE_COUNTDOWN_EXACT else 0}" aria-live="off">'
                  '<span class="cd-label">T-MINUS</span> <span class="cd-val">··</span><span class="cursor">_</span></p>') if LIVE_COUNTDOWN else ''
twitch_player = ('''
  <div class="twitch-player">
    <iframe src="https://player.twitch.tv/?channel=eazrbeats&amp;parent=eazrbeats.de&amp;parent=www.eazrbeats.de&amp;muted=true" title="EMBERS live on Twitch" allowfullscreen loading="lazy"></iframe>
  </div>''') if TWITCH_EMBED else ''
# Immersive page: fixed WebGL magma (embers.js) + a slow descent IGNITE -> GATHER -> GLOW -> STREAM.
# Sound: "Fire in the Soul" by DreamsMaker (Pixabay Content License), loops after the first tap.
embers = f'''<canvas id="world" aria-hidden="true"></canvas>
<div class="emx-heat" aria-hidden="true"></div>
<div class="emx-sub"><a href="live" data-i18n="emBack">← ALLE LIVE-REIHEN</a><span class="temp">HEAT <b id="temp">0600</b> °C</span></div>
<div class="emx">
  <section class="layer" id="ignite">
    <span class="lbl series-line">HOSTED LIVE DJ SESSIONS · BY EAZr · MUNICH</span>
    <h1 style="margin:0"><img class="logo" src="embers-logo.png" alt="EMBERS" width="1000" height="167"></h1>
    <span class="claim">ALL THINGS HOUSE.</span>
    <div class="next"><span>SESSION<b>001</b></span><span><i data-i18n="emDate">DATUM</i><b>{EMBERS_DATE}</b></span><span><i data-i18n="emVenue">ORT</i><b>{EMBERS_VENUE}</b></span></div>
    <span class="down" data-i18n="emDown">↓ SCROLL</span>
  </section>

  <section class="layer" id="gather">
    <span class="lbl">01 · GATHER</span>
    <h2 class="big">COME<br>CLOSER.</h2>
    <p class="txt" data-i18n="emGather"></p>
    <ul class="rules">
      <li><b data-i18n="emDoors">EINLASS</b> 20:00</li>
      <li><b>STREAM</b> <span data-i18n="emStreamAt">21:30 AUF TWITCH</span></li>
      <li><b>NMB</b> · DJ &nbsp;·&nbsp; <b>WIVI</b> · HOST</li>
    </ul>
  </section>

  <section class="layer" id="glow">
    <span class="lbl">02 · GLOW</span>
    <h2 class="big">KEEP IT<br>BURNING.</h2>
    <p class="txt" data-i18n="emGlow"></p>
    <div class="facts">
      <div><span>SOUND</span><b data-i18n="emSound">All things house</b></div>
      <div><span>FORMAT</span><b data-i18n="emFormat">DJ-Session mit Host</b></div>
      <div><span>STREAM</span><b>twitch.tv/eazrbeats</b></div>
    </div>
  </section>

  <section class="layer" id="stream">
    <span class="lbl">03 · STREAM</span>
    <h2 class="big">CAN'T BE<br>THERE?</h2>
    <p class="txt" data-i18n="emStream"></p>
    {news_form('embers')}
    <div class="cta">
      <a class="ebtn" href="{TWITCH}" target="_blank" rel="noopener">▶ TWITCH ↗</a>
      <a class="ebtn" href="{INSTA}" target="_blank" rel="noopener">@EAZRBEATS ↗</a>
    </div>
  </section>

  <div class="emx-foot" id="foot">
    <span class="cool" aria-hidden="true"></span>
    <span class="fbox" data-i18n="emFoot"></span>
  </div>
</div>
<button class="emx-snd" id="snd" type="button" aria-pressed="false"><i aria-hidden="true"><b></b><b></b><b></b></i><span id="sndl">TAP FOR SOUND</span></button>
'''

# ---------------- live (overview of all live series, /live) ----------------
# One tile per series, each already glowing in its own look. A new series = a new tile + its own page.
live = f'''<div class="band first">
<section class="sec" id="live">
  <div class="sec-head">
    <span class="cmd-line"><span class="prompt">eazr@collective:~$</span> ls ./live</span>
    <h1>Live</h1>
  </div>
  <p class="lead" data-i18n="liveHubText"></p>
  <div class="series">
    <a class="series-tile s-embers" href="embers">
      <span class="kicker"><span class="live-dot" aria-hidden="true"></span>01 · LIVE LOADING</span>
      <img class="series-logo" src="embers-logo.png" alt="EMBERS" width="1000" height="167" loading="lazy">
      <span class="series-by">by EAZr</span>
      <p data-i18n="hubEmbersText"></p>
      <p class="series-next">{LIVE_NEXT or 'EMBERS 001 · SOON'}</p>
      <span class="series-go" data-i18n="embersBtn">Zu EMBERS →</span>
    </a>
    <div class="series-tile s-next s-locked" id="next-lock">
      <span class="kicker">02 · [LOCKED]</span>
      <p class="series-mystery">NEXT SERIES<br>LOADING…<span class="cursor blk" aria-hidden="true">█</span></p>
      <span class="lock-bar" aria-hidden="true"><i></i></span>
      <p class="lock-hint">&gt; unlocks after EMBERS 001</p>
      <p data-i18n="hubNextText"></p>
      <button type="button" class="lock-path" aria-controls="lock-out">$ cd ./live/next_series</button>
      <pre class="lock-out" id="lock-out" role="status" aria-live="polite"></pre>
      <a class="series-go" href="{INSTA}" target="_blank" rel="noopener">@eazrbeats ↗</a>
    </div>
  </div>
</section>
</div>
'''

D = 'Munich house &amp; techno collective — new sets, sessions and shows dropping soon.'
files = {
  'index.html': page('start', 'EAZr Beats Collective · House &amp; Techno aus München', D, '', start, ['home.js', 'glitch.js']),
  'about.html': page('about', 'About · EAZr Beats Collective', 'Who we are: a house and techno collective from Munich.', 'about', about),
  'crate.html': page('crate', "The Crate · EAZr Beats Collective", "Selector's log: tracks running in DJ sets right now, backed by two independent sources or one strong one. House, Melodic House &amp; Techno, Afro House, Latin House.", 'crate', crate_sec, ['crate.js']),
  'void.html': page('void', "The Void · EAZr Beats Collective", "Signal log: techno running in DJ sets right now, backed by two independent sources or one strong one. Peak Time / Driving, Melodic Techno, Raw / Deep / Hypnotic, Hard Techno.", 'void', void_sec, ['crate.js']),
  'live.html': page('live', 'Live · EAZr Beats Collective', 'Live series by EAZr Beats Collective from Munich: EMBERS hosted live DJ sessions on Twitch, and more to come.', 'live', live),
  'embers.html': page('embers', 'EMBERS · Live · EAZr Beats Collective', 'EMBERS by EAZr: hosted live DJ sessions from Munich, streamed on Twitch. All things house, straight from the decks.', 'embers', embers, ['embers.js'], og='og-embers.jpg', css=['embers.css'], immersive=True),
  'kontakt.html': page('kontakt', 'Kontakt · EAZr Beats Collective', 'Contact EAZr Beats Collective, Munich.', 'kontakt', kontakt),
  '404.html': page('404', '404 · EAZr Beats Collective', 'Page not found.', '', notfound).replace('<meta charset="utf-8">', '<meta charset="utf-8">\n<base href="/">\n<meta name="robots" content="noindex">'),
  'booking.html': page('booking', 'Booking · EAZr Beats Collective', 'Book EAZr Beats Collective for clubs, bars, open airs and private events in Munich.', 'booking', booking),
}
if SPLIT_NEXT:
    files['events.html'] = page('events', 'Events · EAZr Beats Collective', 'Upcoming and past EAZr Beats Collective events in Munich.', 'events', events)
    files['mixes.html'] = page('mixes', 'Mixes · EAZr Beats Collective', 'Sets, recordings and studio sessions by EAZr Beats Collective.', 'mixes', mixes)
    files['next.html'] = redirect('events', 'Events · EAZr Beats Collective')
else:
    files['next.html'] = page('next', 'Next · EAZr Beats Collective', 'What is next for EAZr Beats Collective: our own events in Munich and the first mixes.', 'next', nextpage)
    files['events.html'] = redirect('next', 'Next · EAZr Beats Collective')
    files['mixes.html'] = redirect('next', 'Next · EAZr Beats Collective')
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
SITEMAP = [''] + [f[:-5] for f in files if f not in ('index.html', '404.html') and 'noindex' not in files[f]]
open('sitemap.xml', 'w').write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    + ''.join(f'  <url><loc>https://eazrbeats.de/{u}</loc></url>\n' for u in SITEMAP) + '</urlset>\n')
open('robots.txt', 'w').write('User-agent: *\nAllow: /\n\nSitemap: https://eazrbeats.de/sitemap.xml\n')
print('sitemap', len(SITEMAP))
