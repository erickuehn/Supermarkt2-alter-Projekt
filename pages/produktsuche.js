import Head from 'next/head'

export default function Produktsuche() {
  return (
    <>
      <Head>
        <title>Produktsuche — Supermarktvergleich</title>
        <meta name="description" content="Produktsuche über die verfügbare Produktliste" />
      </Head>
      <main className="container" style={{paddingTop: '2rem'}}>
        <h1>Produktsuche</h1>
        <p className="muted">Suche nach Produktnamen, z. B. "Milch", "Brot" oder "Tomaten".</p>
        <form style={{marginTop: '1rem', display: 'flex', gap: '.5rem', maxWidth: 560}} onSubmit={(e) => e.preventDefault()}>
          <input id="product-search" type="search" placeholder="Produktname eingeben" style={{flex:1,padding:'.6rem',border:'1px solid #ddd',borderRadius:'6px'}} />
          <button type="submit" className="cta framed">Suchen</button>
        </form>

        <section style={{marginTop: '1.25rem'}}>
          <p className="muted">Hinweis: Diese Seite ist eine einfache Suchoberfläche; Produktergebnisse sind derzeit statisch oder müssen noch angebunden werden.</p>
        </section>
      </main>
    </>
  )
}
