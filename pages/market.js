import Head from 'next/head';

const marketHtml = `
<header class="site-header">
  <div class="container">
    <h1>Marktprofil</h1>
    <p class="tagline">Visuelle Auswertung der wichtigsten Kriterien</p>
    <a href="/" class="cta">Zurück zur Übersicht</a>
  </div>
</header>

<main>
  <section class="container">
    <h2 id="market-name">Markt</h2>
    <div style="display:flex;gap:1rem;flex-wrap:wrap">
      <div style="flex:1;min-width:320px">
        <canvas id="radarChart"></canvas>
      </div>
      <div style="flex:1;min-width:320px">
        <canvas id="barChart"></canvas>
      </div>
    </div>
    <p class="muted">Daten basieren auf Zusammenfassung und Beispielen in der Demo.</p>
  </section>
</main>

<footer class="site-footer">
  <div class="container">
    <p>© <span id="year"></span> Marktvergleich — Demo</p>
  </div>
</footer>
`;

export default function Market(){
  return (
    <>
      <Head>
        <title>Marktprofil — Marktvergleich</title>
        <meta name="description" content="Visuelle Darstellung der Unterschiede zwischen Supermärkten" />
        <link rel="stylesheet" href="/styles.css" />
        <script src="https://cdn.jsdelivr.net/npm/chart.js" defer></script>
      </Head>

      <div dangerouslySetInnerHTML={{ __html: marketHtml }} />

      <script src="/js/market.js" defer></script>
    </>
  );
}
