// Fetch public/data/stores.json and render a compact market overview
// Render market summary from /data/stores.json once DOM is ready
(function(){
  async function render() {
    try {
      const res = await fetch('/data/stores.json');
      if (!res.ok) throw new Error('data not found (' + res.status + ')');
      const data = await res.json();
      const container = document.querySelector('.compact-overview');
      if (!container) {
        console.warn('market-summary: .compact-overview container not found');
        return;
      }

      const stores = data.stores || [];
      const products = data.products || [];

      // compute average price and cheapest counts
      const stats = stores.map(s => {
        const prices = products.map(p => p.prices && typeof p.prices[s.id] === 'number' ? p.prices[s.id] : NaN);
        const valid = prices.filter(Number.isFinite);
        const avg = valid.length ? (valid.reduce((a,b)=>a+b,0)/valid.length) : null;
        // count how often this store has the cheapest price for a product
        let cheapest = 0;
        for (const p of products){
          const vals = stores.map(st => (p.prices && typeof p.prices[st.id] === 'number') ? p.prices[st.id] : Infinity);
          const min = Math.min(...vals);
          if (p.prices && typeof p.prices[s.id] === 'number' && p.prices[s.id] === min) cheapest++;
        }
        return { id: s.id, name: s.name, avg, cheapest };
      });

      // build a compact table
      const tableHtml = `
        <table class="compact-table" style="width:100%">
          <thead>
            <tr><th>Markt</th><th>Ø-Preis</th><th>Anzahl günstigster Angebote</th></tr>
          </thead>
          <tbody>
            ${stats.map(st => `
              <tr>
                <td><strong>${escapeHtml(st.name)}</strong></td>
                <td>${st.avg === null ? 'n/a' : (st.avg.toFixed(2) + ' €')}</td>
                <td>${st.cheapest}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;

      container.innerHTML = tableHtml;
    } catch (err) {
      console.error('Failed to render market summary', err);
    }
  }

  function escapeHtml(s){
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    // DOM already ready
    render();
  }
})();
