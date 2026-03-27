import React, { useState, useEffect } from 'react'
import Head from 'next/head'

function normalizeText(s) {
  if (!s) return ''
  let t = String(s).toLowerCase()
  t = t.replace(/\s*\([^\)]*\)/g, '').trim()
  t = t.replace(/(\d)\s+([a-zA-Z]+)/g, '$1$2')
  t = t.replace(/[;,]/g, '')
  return t
}

export default function Home() {
  const [stores, setStores] = useState([])
  const [products, setProducts] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    fetch('/data/stores.json')
      .then((r) => {
        if (!r.ok) throw new Error('HTTP ' + r.status)
        return r.json()
      })
      .then((d) => {
        if (!mounted) return
        // Support two possible shapes: { stores: [...] , products: [...] } or an array of stores
        const storesData = Array.isArray(d.stores)
          ? d.stores
          : Array.isArray(d)
          ? d
          : d.stores || []
        const productsData = Array.isArray(d.products) ? d.products : []
        setStores(storesData)
        setProducts(productsData)
      })
      .catch((err) => {
        console.warn('Could not load stores.json', err)
        setError('Daten konnten nicht geladen werden.')
      })
    return () => {
      mounted = false
    }
  }, [])

  // Note: price search functionality has been removed per project request.
  // This page still loads `public/data/stores.json` to show market summaries.

  return (
    <>
      <Head>
        <title>Supermarktvergleich</title>
        <meta name="description" content="Sofort vergleichen: Günstigste Supermarktpreise finden" />
      </Head>

      <header className="site-header">
        <div className="container">
          <h1>Supermarktvergleich</h1>
          <p className="tagline">Schnell Preise vergleichen & beim Einkaufen sparen</p>
        </div>
      </header>

      <main className="container" style={{ padding: '1rem 0' }}>
        <section id="compare" style={{ maxWidth: 800 }}>
          <h2>Sofort vergleichen</h2>
          <p className="muted">Gib ein Produkt ein (z. B. "Milch 1L") und vergleiche die Preise aus der Tabelle.</p>

          <div style={{ marginTop: 12 }}>
            <p className="muted">Die direkte Produktsuche/Preisabfrage wurde entfernt. Bitte nutze die Marktübersicht, um Produkte und Profil-Informationen der Märkte einzusehen.</p>
            <p><a href="/overview" className="cta">Zur Marktübersicht</a></p>
          </div>
        </section>

        <section id="market-summary" style={{ marginTop: 28 }}>
          <h2>Marktübersicht</h2>
          <p className="muted">Kompakte Empfehlungen und Kurzprofile der Märkte.</p>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <p className="muted">© Marktvergleich — Demo</p>
        </div>
      </footer>
    </>
  )
}


