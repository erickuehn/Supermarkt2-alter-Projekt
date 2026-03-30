import Head from 'next/head';
import Script from 'next/script';

const bodyHtml = `
    <header class="site-header">
  <div class="container">
    <h1>Supermarktvergleich</h1>
    <p class="tagline">Schnell Preise vergleichen & beim Einkaufen sparen</p>
    <div style="display:flex;gap:0.75rem;align-items:center;justify-content:center">
  <a href="#compare" class="cta">Jetzt vergleichen</a>
  <button id="login-open" class="cta framed">Login</button>
    </div>
  </div>
</header>

  <main>
      <section id="market-summary" class="container market-summary">
        <h2>Marktübersicht — Kurz & prägnant</h2>
        <p class="muted">Kompakte Empfehlungstabelle und Kurzinformationen zu Preis, Sortiment, Nachhaltigkeit und Angeboten.</p>

        <div class="compact-overview table-wrap">
          <table class="compact-table compact-markets">
            <thead>
              <tr>
                <th>Markt</th>
                <th>Preis 🏷️</th>
                <th>Sortiment 🛒</th>
                <th>Nachhaltigkeit 🌿</th>
                <th>Angebote 🔖</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Aldi Süd</strong></td>
                <td>Sehr günstig</td>
                <td>Klein–mittel</td>
                <td>Gut</td>
                <td>Weniger Aktionen</td>
              </tr>
              <tr>
                <td><strong>Lidl</strong></td>
                <td>Sehr günstig</td>
                <td>Mittel</td>
                <td>Sehr gut</td>
                <td>Regelmäßige Aktionen</td>
              </tr>
              <tr>
                <td><strong>Penny</strong></td>
                <td>Günstig</td>
                <td>Klein</td>
                <td>Ausreichend</td>
                <td>Gelegentliche Angebote</td>
              </tr>
              <tr>
                <td><strong>Kaufland</strong></td>
                <td>Etwas teurer</td>
                <td>Sehr große Auswahl</td>
                <td>Verbesserungsfähig</td>
                <td>Viele Prospekte/Angebote</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style="margin-top:1rem">
          <p><strong>Praktischer Tipp:</strong> Für Basics Lidl/Aldi, für Marken & Großeinkauf Kaufland, für schnellen Einkauf Penny.</p>
          <p>Für die vollständige, druckbare Übersicht: <a href="/market_summary.md">market_summary.md (Download/Öffnen)</a></p>
        </div>

        <!-- Bester Preis Suche (verknüpft mit /api/search) -->
        <div style="margin-top:1rem">
          <h3>Bester Preis</h3>
          <form id="price-search-form" style="display:flex;gap:.5rem;align-items:center;max-width:640px">
            <input id="price-search" name="q" type="search" placeholder="Produktname eingeben (z. B. Milch 1L)" style="flex:1;padding:.6rem;border:1px solid #ddd;border-radius:6px" />
            <button type="submit" class="cta">Suchen</button>
          </form>
          <div id="price-search-results" style="margin-top:.6rem"></div>
          <p class="muted" style="margin-top:.4rem">Suche findet Treffer in der Neon‑Tabelle (wenn verbunden) oder in lokalem Beispieldatensatz.</p>
        </div>
      </section>


    <section id="markets" class="container markets">
    <h2>Markt-Profile</h2>
    <p>Vergleichsseiten für einzelne Märkte mit visuellen Auswertungen (Preise, Nachhaltigkeit, Sortiment etc.).</p>
    <div class="market-links" style="display:flex;gap:0.75rem;flex-wrap:wrap;align-items:center">
      <div class="market-item">
        <a class="market-link" href="https://www.aldi-sued.de" title="Aldi Süd — Webseite" target="_blank" rel="noopener noreferrer">
          <img src="/images/aldi.jpg" alt="Aldi Süd Logo">
        </a>
      </div>
      <div class="market-item">
        <a class="market-link" href="https://www.lidl.de" title="Lidl — Webseite" target="_blank" rel="noopener noreferrer">
          <img src="/images/lidl.jpg" alt="Lidl Logo">
        </a>
      </div>
      <div class="market-item">
        <a class="market-link" href="https://www.penny.de" title="Penny — Webseite" target="_blank" rel="noopener noreferrer">
          <img src="/images/penny.jpg" alt="Penny Logo">
        </a>
      </div>
      <div class="market-item">
        <a class="market-link" href="https://www.kaufland.de" title="Kaufland — Webseite" target="_blank" rel="noopener noreferrer">
          <img src="/images/kaufland.jpg" alt="Kaufland Logo">
        </a>
      </div>
    </div>
  </section>

  <section class="container carded" style="margin-top:1rem">
    <h2>Kurzprofile der vier Märkte</h2>
    <div class="market-grid">
      <div class="market-card">
        <h3>🥇 Aldi Süd</h3>
        <ul>
          <li>sehr günstige Preise</li>
          <li>sehr gute Kundenzufriedenheit</li>
          <li>übersichtliche Läden</li>
          <li>etwas kleinere Auswahl</li>
        </ul>
      </div>
      <div class="market-card">
        <h3>🥈 Lidl</h3>
        <ul>
          <li>sehr günstig</li>
          <li>starke vegane Eigenmarke (z. B. Vemondo)</li>
          <li>gute Obst- und Gemüsequalität</li>
          <li>viele Aktionsprodukte</li>
        </ul>
      </div>
      <div class="market-card">
        <h3>⚖️ Penny</h3>
        <ul>
          <li>günstiger Discounter</li>
          <li>weniger Auswahl</li>
          <li>durchschnittliche Kundenzufriedenheit</li>
        </ul>
      </div>
      <div class="market-card">
        <h3>🥉 Kaufland</h3>
        <ul>
          <li>riesige Auswahl (Supermarkt + Warenhaus)</li>
          <li>viele Markenprodukte</li>
          <li>große Filialen</li>
        </ul>
      </div>
    </div>
  </section>

  <section id="signup" class="container signup">
    <h2>Newsletter</h2>
    <p>Erhalte wöchentliche Angebote per E‑Mail.</p>
    <form id="signup-form">
      <input type="email" id="email" placeholder="Deine E‑Mail" required>
      <button type="submit">Anmelden</button>
    </form>
    <p id="signup-msg" class="muted"></p>
  </section>

  <section id="detailed-comparison" class="container detailed-comparison">
    <h2>Ausführlicher Vergleich (Kurzüberblick)</h2>
    <p class="muted">Kurze Bewertung der vier Märkte nach wichtigen Kriterien (basierend auf den zusammengefassten Angaben).</p>
    <div class="legend" aria-hidden="false" role="list" style="margin-top:.5rem;margin-bottom:.75rem">
      <div class="legend-item" role="listitem">
        <span class="legend-swatch cell-very-good" aria-hidden="true"></span>
        <span class="legend-label">Sehr gut</span>
      </div>
      <div class="legend-item" role="listitem">
        <span class="legend-swatch cell-good" aria-hidden="true"></span>
        <span class="legend-label">Gut</span>
      </div>
      <div class="legend-item" role="listitem">
        <span class="legend-swatch cell-average" aria-hidden="true"></span>
        <span class="legend-label">Durchschnittlich</span>
      </div>
      <div class="legend-item" role="listitem">
        <span class="legend-swatch cell-bad" aria-hidden="true"></span>
        <span class="legend-label">Schlecht</span>
      </div>
    </div>

    <div class="summary-market-row" aria-hidden="false" style="margin-bottom:.5rem">
      <div class="summary-market-empty">&nbsp;</div>
      <div class="summary-market-item"><a href="/market?id=aldi" title="Aldi Süd"><img src="/images/aldi.jpg" alt="Aldi Süd"/></a></div>
      <div class="summary-market-item"><a href="/market?id=lidl" title="Lidl"><img src="/images/lidl.jpg" alt="Lidl"/></a></div>
      <div class="summary-market-item"><a href="/market?id=penny" title="Penny"><img src="/images/penny.jpg" alt="Penny"/></a></div>
      <div class="summary-market-item"><a href="/market?id=kaufland" title="Kaufland"><img src="/images/kaufland.jpg" alt="Kaufland"/></a></div>
    </div>
    <div class="table-wrap">
      <table class="summary-table">
        <thead>
          <tr>
            <th>Kriterium</th>
            <th>Aldi Süd</th>
            <th>Lidl</th>
            <th>Penny</th>
            <th>Kaufland</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Preis</td>
            <td class="cell-very-good">Sehr günstig</td>
            <td class="cell-very-good">Sehr günstig (häufig günstigster)</td>
            <td class="cell-good">Günstig</td>
            <td class="cell-bad">Etwas teurer</td>
          </tr>
          <tr>
            <td>Auswahl</td>
            <td class="cell-average">Klein bis mittel</td>
            <td class="cell-good">Mittel</td>
            <td class="cell-bad">Kleineres Sortiment</td>
            <td class="cell-very-good">Sehr große Auswahl</td>
          </tr>
          <tr>
            <td>Nachhaltigkeit</td>
            <td class="cell-good">Gut</td>
            <td class="cell-very-good">Sehr gut (Bio, CO₂‑Maßnahmen)</td>
            <td class="cell-average">Ausreichend</td>
            <td class="cell-bad">Verbesserungsfähig</td>
          </tr>
          <tr>
            <td>Vegane Produkte</td>
            <td class="cell-good">Gut</td>
            <td class="cell-very-good">Sehr groß (starke Eigenmarke)</td>
            <td class="cell-bad">Begrenzt</td>
            <td class="cell-good">Gut</td>
          </tr>
          <tr>
            <td>Angebote</td>
            <td class="cell-bad">Weniger Aktionen</td>
            <td class="cell-good">Viele Aktionen</td>
            <td class="cell-average">Gelegentliche Angebote</td>
            <td class="cell-very-good">Viele Markenangebote / Prospekte</td>
          </tr>
          <tr>
            <td>Kundenfreundlichkeit</td>
            <td class="cell-very-good">Sehr gut</td>
            <td class="cell-good">Gut</td>
            <td class="cell-average">Durchschnittlich</td>
            <td class="cell-good">Gut</td>
          </tr>
          <tr>
            <td>Mitarbeiterfreundlichkeit</td>
            <td class="cell-good">Gut</td>
            <td class="cell-good">Gut</td>
            <td class="cell-average">Durchschnittlich</td>
            <td class="cell-average">Durchschnittlich</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</main>

<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-meta">
        <p>© <span id="year"></span> Marktvergleich — Demo</p>
        <p class="muted">Kurzstatistiken basieren auf Demo‑Daten.</p>
        <a href="/overview" class="cta framed" style="display:inline-block;margin-top:0.5rem">Mehr Details & Übersicht</a>
      </div>
    </div>
  </div>
</footer>

<!-- Impressum / rechtliche Angaben im Fußbereich -->
<div class="container impressum-container">
  <section class="impressum" aria-label="Impressum">
    <h4 style="margin:0 0 .35rem 0">Impressum</h4>
    <p style="margin:0;font-size:.95rem">Marktvergleich — Demoprojekt<br>
    Betreiber: Demo GmbH<br>
    Musterstraße 1, 12345 Musterstadt<br>
    E‑Mail: <a href="mailto:info@example.com">info@example.com</a></p>
    <p class="impressum-note"><strong>Hinweis:</strong> Dies ist eine Demo‑Anwendung. Ersetze die obigen Angaben durch deine realen Impressumsdaten (Anschrift, Vertretungsberechtigte, ggf. USt‑ID).</p>
  </section>
</div>

  <!-- Login modal -->
  <div id="login-modal" class="modal" aria-hidden="true">
    <div class="modal-dialog login-modal-dialog">
      <button class="modal-close" aria-label="Schließen">×</button>
      <h3>Login</h3>
      <form id="login-form" style="display:flex;flex-direction:column;gap:.5rem;max-width:320px">
        <input type="email" id="login-email" placeholder="E‑Mail" required style="padding:.6rem;border:1px solid #ddd;border-radius:6px" />
        <input type="password" id="login-password" placeholder="Passwort" required style="padding:.6rem;border:1px solid #ddd;border-radius:6px" />
        <div style="display:flex;gap:.5rem;justify-content:flex-end;align-items:center">
          <button type="submit" class="cta">Anmelden</button>
        </div>
        <p id="login-msg" class="muted"></p>
      </form>
    </div>
  </div>
`;

export default function Home(){
  return (
    <>
      <Head>
        <title>Supermarktvergleich</title>
        <meta name="description" content="Finde die günstigsten Supermarkt-Preise in deiner Nähe. Einfach Produkte vergleichen und sparen." />
      </Head>

  <div className="home-root" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
  <Script src="https://cdn.jsdelivr.net/npm/chart.js" strategy="afterInteractive" />
  <Script src="/js/login.js" strategy="afterInteractive" />
  <Script src="/js/footer-stats.js" strategy="afterInteractive" />
  <Script src="/js/market-summary.js" strategy="afterInteractive" />
    </>
  );
}


