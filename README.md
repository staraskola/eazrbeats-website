# eazrbeats.de

Website des EAZr Beats Collective (München) inkl. **The Crate**.

- Statische Seite, gehostet über GitHub Pages, Domain `eazrbeats.de`.
- `crate.json` enthält alle Crate-Tracks. Die Daily- und Weekly-Hot-Routinen aktualisieren diese Datei automatisch.
- Format pro Track: `title`, `artist`, `genre` (`house` | `melodic-house-techno` | `afro-house` | `latin-house`), `tier` (`daily` | `weekly`), `dateAdded` (YYYY-MM-DD), `source`, `sourceUrl`, `note` (Deutsch), `noteEn` (Englisch, wird bei EN angezeigt), `confirmations` [{`source`, `sourceUrl`}].
- Seiten: `index.html` (Start: Dig the Crate, Frisch in der Crate, Mach mit), `about.html`, `next.html` (Events + Mixes zusammen), `crate.html`, `booking.html`, `kontakt.html`, dazu `impressum.html`, `datenschutz.html`.
- Gemeinsam genutzt: `style.css` (Look), `site.js` (Texte DE/EN, Sprachumschalter, Menü), `crate.js` (The Crate), `home.js` (Startseite, liest ebenfalls `crate.json`).
- Menüleiste und Footer schreibt der Generator in jede Seite.
- Seiten werden mit `python3 tools/gen_pages.py` erzeugt (Texte in `site.js`). Impressum und Datenschutz sind handgeschrieben.
- Neuer Mix: in `tools/gen_pages.py` im Block `nextpage` die Karte "mix/01" ausfüllen (SoundCloud-Embed in `.mix-embed`) und neu erzeugen.
- **Merker:** Events und Mixes sind nur vorübergehend auf einer Seite (`next.html`), weil beides noch leer ist. Sobald es das erste Event oder den ersten Mix gibt, wieder trennen: in `tools/gen_pages.py` `SPLIT_NEXT = True` setzen und neu erzeugen. Dann wird `next.html` zur Weiterleitung.
- Mails: `booking@` nur hinter dem Booking-Button (nie sichtbar), `kontakt@` für alles andere, `news@` für Newsletter.

## Pressekit, 404, Besucherzahlen
- `press/` enthält die Logo-Downloads fürs Pressekit (Booking-Seite). Fotos dort ablegen und auf `booking.html` verlinken, sobald es welche gibt.
- `404.html` zeigt GitHub Pages automatisch bei falschen Links.
- Suchmaschinen: `robots.txt` und `sitemap.xml` schreibt der Generator mit. Die Startseite enthält Schema-Daten (MusicGroup) mit Links zu Instagram, Spotify und TikTok (`TIKTOK` in `tools/gen_pages.py` eintragen).
- Besucherzahlen über GoatCounter (ohne Cookies), Code `eazrbeats`, Dashboard unter https://eazrbeats.goatcounter.com. Das Zählskript lädt nur auf eazrbeats.de (siehe Ende von `site.js`).
