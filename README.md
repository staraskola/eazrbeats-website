# eazrbeats.de

Website des EAZr Beats Collective (München) inkl. **The Crate**.

- Statische Seite, gehostet über GitHub Pages, Domain `eazrbeats.de`.
- `crate.json` enthält alle Crate-Tracks. Die Daily- und Weekly-Hot-Routinen aktualisieren diese Datei automatisch.
- Format pro Track: `title`, `artist`, `genre` (`house` | `melodic-house-techno` | `afro-house` | `latin-house`), `tier` (`daily` | `weekly`), `dateAdded` (YYYY-MM-DD), `source`, `sourceUrl`, `note` (Deutsch), `noteEn` (Englisch, wird bei EN angezeigt), `confirmations` [{`source`, `sourceUrl`}].
- Seiten: `index.html` (Start: Dig the Crate, Frisch in der Crate, Mach mit), `about.html`, `events.html`, `mixes.html`, `crate.html`, `booking.html`, `kontakt.html`, dazu `impressum.html`, `datenschutz.html`.
- Gemeinsam genutzt: `style.css` (Look), `site.js` (Texte DE/EN, Sprachumschalter, Menü), `crate.js` (The Crate), `home.js` (Startseite, liest ebenfalls `crate.json`).
- Menüleiste und Footer stehen in jeder Seite einzeln, bei Änderungen in allen Seiten anpassen.
- Neuer Mix: in `mixes.html` eine Karte kopieren und den SoundCloud-Embed einsetzen.
- Mails: `booking@` nur hinter dem Booking-Button (nie sichtbar), `kontakt@` für alles andere, `news@` für Newsletter.
