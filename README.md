# eazrbeats.de

Website des EAZr Beats Collective (München) inkl. **The Crate**.

- Statische Seite, gehostet über GitHub Pages, Domain `eazrbeats.de`.
- `crate.json` enthält alle Crate-Tracks. Die Daily- und Weekly-Hot-Routinen aktualisieren diese Datei automatisch.
- Format pro Track: `title`, `artist`, `genre` (`house` | `melodic-house-techno` | `afro-house` | `latin-house`), `tier` (`daily` | `weekly`), `dateAdded` (YYYY-MM-DD), `source`, `sourceUrl`, `note`, `confirmations` [{`source`, `sourceUrl`}].
- Seiten: `index.html` (Start mit About und Events), `crate.html` (The Crate), `booking.html`, dazu `impressum.html`, `datenschutz.html`.
- Gemeinsam genutzt: `style.css` (Look), `site.js` (Texte DE/EN, Sprachumschalter, Menü), `crate.js` (lädt `crate.json` für The Crate).
- Menüleiste steht in jeder Seite einzeln, bei Änderungen in allen drei Dateien anpassen.
