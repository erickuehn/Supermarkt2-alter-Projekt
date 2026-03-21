import Head from 'next/head';
import SummarySection from '../components/SummarySection';
import MarketCard from '../components/MarketCard';
import Logos from '../components/Logos';
import FooterYear from '../components/FooterYear';

export default function Overview(){
  return (
    <>
      <Head>
        <title>Übersicht — Marktvergleich</title>
        <meta name="description" content="Übersicht: Nachhaltigkeit, Angebote, Kundenfreundlichkeit und Kurzprofile der Supermärkte" />
        <link rel="stylesheet" href="/styles.css" />
      </Head>

      <header className="overview-hero">
        <div className="container">
          <h1>Ausführliche Übersicht</h1>
          <p className="tagline">Kurz und strukturiert — Hintergrund & Empfehlungen</p>
          <a href="/" className="cta">← Zurück zur Übersicht</a>
        </div>
      </header>

      <main className="overview-main container" style={{paddingTop: '1.5rem', paddingBottom: '3rem'}}>
        <div className="market-names-row" aria-label="Supermärkte">
          <div className="name"><a href="/market?id=aldi"><img src="/images/aldi.svg" alt="Aldi Süd" style={{height:36}}/></a></div>
          <div className="name"><a href="/market?id=lidl"><img src="/images/lidl.svg" alt="Lidl" style={{height:36}}/></a></div>
          <div className="name"><a href="/market?id=penny"><img src="/images/penny.svg" alt="Penny" style={{height:36}}/></a></div>
          <div className="name"><a href="/market?id=kaufland"><img src="/images/kaufland.svg" alt="Kaufland" style={{height:36}}/></a></div>
        </div>
        <h1 style={{display:'none'}}>Ausführliche Übersicht — Kurz und strukturiert</h1>

        <SummarySection title="Nachhaltigkeit">
          <p>Laut Ranking (Tierwohl, Umwelt, Lieferketten) liegt die Reihenfolge bei:</p>
          <ol>
            <li>Lidl</li>
            <li>Aldi Süd</li>
            <li>Penny</li>
            <li>Kaufland</li>
          </ol>
          <p>Warum Lidl gut abschneidet: viele Bio‑Produkte, CO₂‑Reduktionsprogramme und vegane Eigenmarken.</p>
        </SummarySection>

        <SummarySection title="Veganes Essen">
          <p>Alle Händler bieten vegane Produkte an — Unterschiede gibt es in Umfang und Eigenmarken.</p>
          <p><strong>Hinweis:</strong> Lidl gilt als einer der besten Discounter für vegane Produkte.</p>
        </SummarySection>

        <SummarySection title="Beste Angebote">
          <p>Übersicht der Angebotslage:</p>
          <ul>
            <li>Kaufland — viele Markenangebote / Prospekte</li>
            <li>Lidl — aggressive Rabattaktionen</li>
            <li>Aldi Süd — weniger Aktionen</li>
            <li>Penny</li>
          </ul>
        </SummarySection>

        <SummarySection title="Kundenfreundlichkeit & Mitarbeiter">
          <p>Typische Reihenfolge aus Umfragen und Tests:</p>
          <ol>
            <li>Aldi Süd</li>
            <li>Lidl</li>
            <li>Kaufland</li>
            <li>Penny</li>
          </ol>
          <p>Die Freundlichkeit der Mitarbeiter variiert stark nach Filiale. Discounter haben oft weniger Personal, was den Service beeinflusst.</p>
        </SummarySection>

        <SummarySection title="Gesamtfazit & Einkaufstipps">
          <ul>
            <li>Preis‑Leistung Sieger: Lidl</li>
            <li>Bester Allrounder (Auswahl + Angebote): Kaufland</li>
            <li>Beste Discounter‑Alternative: Aldi Süd</li>
          </ul>
          <p><strong>Praktische Tipps:</strong></p>
          <ul>
            <li>Grundnahrungsmittel: Lidl oder Aldi</li>
            <li>Großer Einkauf / Markenprodukte: Kaufland</li>
            <li>Schneller Einkauf: Penny</li>
          </ul>
        </SummarySection>

        

        <SummarySection title="Preisvergleich & Sortiment">
          <p>Discounter sind in Deutschland typischerweise günstiger. Viele Tests zeigen Lidl und Aldi oft vorne.</p>
          <p>Sortimentsgrößen (typisch): Discounter 2.000–3.500 Artikel; Kaufland deutlich mehr (auch Non‑Food).</p>
        </SummarySection>

        <div className="container carded" style={{marginTop:'1rem'}}>
          <SummarySection title="Logos & Links" className="section-accent">
            <Logos />
            <p>Webseiten: <a href="https://www.aldi-sued.de" target="_blank" rel="noopener noreferrer">aldi-sued.de</a>, <a href="https://www.lidl.de" target="_blank" rel="noopener noreferrer">lidl.de</a>, <a href="https://www.penny.de" target="_blank" rel="noopener noreferrer">penny.de</a>, <a href="https://www.kaufland.de" target="_blank" rel="noopener noreferrer">kaufland.de</a></p>
          </SummarySection>
        </div>

        <footer style={{marginTop:'2rem', textAlign:'center'}}>
          <p>© <FooterYear /> Marktvergleich — Demo</p>
        </footer>
      </main>
    </>
  );
}
