(function(){
  async function doSearch(q){
    const res = await fetch('/api/search?q=' + encodeURIComponent(q));
    if(!res.ok) throw new Error('Search failed');
    return res.json();
  }

  function renderResults(data, container){
    if(!data || data.length===0){
      container.innerHTML = '<div class="muted">Keine Treffer gefunden.</div>';
      return;
    }
    const rows = data.map(item=>{
      // item: { productName, aldi, lidl, penny, kaufland }
      const prices = ['aldi','lidl','penny','kaufland'].map(k=>({k,v:item[k]})).filter(p=>p.v!==null && p.v!==undefined);
      const cheapest = prices.length? prices.reduce((a,b)=>a.v<=b.v?a:b):null;
      return `<div style="padding:.5rem .6rem;border:1px solid #eee;border-radius:8px;margin-bottom:.5rem;background:#fff;display:flex;gap:1rem;align-items:center;justify-content:space-between">
        <div style="flex:1">
          <div style="font-weight:700">${escapeHtml(item.productName)}</div>
          <div style="font-size:.95rem;color:#666;margin-top:.25rem">${prices.map(p=>escapeHtml(p.k)+': '+(p.v==null?'-':formatPrice(p.v))).join(' • ')}</div>
        </div>
        <div style="text-align:right">
          ${cheapest? `<div style="font-weight:800;color:#0b6bff">Bestpreis: ${escapeHtml(cheapest.k)} — ${formatPrice(cheapest.v)}</div>` : '<div class="muted">Keine Preisangaben</div>'}
        </div>
      </div>`;
    }).join('\n');
    container.innerHTML = rows;
  }

  function escapeHtml(s){
    return String(s).replace(/[&<>\"']/g, function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[c];
    });
  }

  function formatPrice(v){
    if(typeof v==='string') v=parseFloat(v);
    return v==null?'-':(Math.round(v*100)/100).toFixed(2)+' €';
  }

  document.addEventListener('DOMContentLoaded', function(){
    const form = document.getElementById('price-search-form');
    const input = document.getElementById('price-search');
    const results = document.getElementById('price-search-results');
    if(!form || !input || !results) return;

    form.addEventListener('submit', async function(e){
      e.preventDefault();
      const q = input.value && input.value.trim();
      if(!q) return;
      results.innerHTML = '<div class="muted">Suche läuft…</div>';
      try{
        const data = await doSearch(q);
        renderResults(data, results);
      }catch(err){
        console.error(err);
        results.innerHTML = '<div class="muted">Fehler bei der Suche.</div>';
      }
    });
  });
})();
