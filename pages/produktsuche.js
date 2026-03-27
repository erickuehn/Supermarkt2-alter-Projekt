import Head from 'next/head'
import React, { useState } from 'react'

export default function Produktsuche() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(null) // null = no search yet, [] = no results

  function onSearch(e) {
    e.preventDefault()
    // Demo behaviour: no data bound yet — show placeholder results for illustration
    if (!query.trim()) {
      setResults([])
      return
    }
    // simple mocked results for a nicer UX demo
    const mock = [
      { name: `${query} (Eigenmarke)`, market: 'Lidl', price: '1.29 €' },
      { name: `${query} - Bio`, market: 'Aldi Süd', price: '1.79 €' }
    ]
    setResults(mock)
  }

  return (
    <>
      <Head>
        <title>Produktsuche — Supermarktvergleich</title>
        <meta name="description" content="Produktsuche über die verfügbare Produktliste" />
      </Head>
      <main className="container produktsuche" style={{paddingTop: '2rem'}}>
        <h1>Produktsuche</h1>
        <p className="muted">Suche nach Produktnamen, z. B. "Milch", "Brot" oder "Tomaten".</p>
        <form className="search-form" style={{maxWidth: 720}} onSubmit={onSearch}>
          <input id="product-search" value={query} onChange={(e) => setQuery(e.target.value)} type="search" placeholder="Produktname eingeben" />
          <button type="submit" className="cta framed">Suchen</button>
        </form>

        <div className="search-hint">Gib einen Begriff ein und klicke auf „Suchen“. (Demo-Ergebnisse)</div>

        <section className="search-results" aria-live="polite">
          {results === null && (
            <div className="no-results">Noch keine Suche ausgeführt.</div>
          )}
          {results && results.length === 0 && (
            <div className="no-results">Keine Ergebnisse gefunden. Probiere eine kürzere Suche oder andere Begriffe.</div>
          )}
          {results && results.length > 0 && (
            <div className="results-list">
              {results.map((r, i) => (
                <div key={i} className="search-item">
                  <div>
                    <div style={{fontWeight:700}}>{r.name}</div>
                    <div className="meta">{r.market} · {r.price}</div>
                  </div>
                  <div>
                    <a className="cta" href="#" onClick={(e)=>e.preventDefault()}>Details</a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  )
}
