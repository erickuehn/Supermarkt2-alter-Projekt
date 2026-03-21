// Populate the footer stats table from /data/market_scores.json
(async function(){
  try{
    const res = await fetch('/data/market_scores.json');
    if(!res.ok) throw new Error('market_scores.json konnte nicht geladen werden');
    const data = await res.json();
    const markets = data.markets || [];
    const tbody = document.querySelector('#footer-stats tbody');
    if(!tbody) return;

    // clear placeholder
    tbody.innerHTML = '';

    // helper to compute average score
    const avg = (scores)=>{
      const vals = Object.values(scores||{});
      if(!vals.length) return 0;
      return Math.round((vals.reduce((a,b)=>a+b,0)/vals.length)*10)/10;
    };

    markets.forEach(m=>{
      const tr = document.createElement('tr');
      const avgScore = avg(m.scores);

      const tdName = document.createElement('td'); tdName.textContent = m.name; tr.appendChild(tdName);
      const tdAvg = document.createElement('td'); tdAvg.textContent = avgScore; tr.appendChild(tdAvg);

      // Price, Selection, Sustainability — fallback to keys in scores
      const price = m.scores && (m.scores.price ?? m.scores.preis ?? m.scores.prices);
      const selection = m.scores && (m.scores.selection ?? m.scores.auswahl ?? m.scores.selection);
      const sustainability = m.scores && (m.scores.sustainability ?? m.scores.nachhaltigkeit ?? m.scores.sustainability);

      const tdPrice = document.createElement('td'); tdPrice.textContent = price==null? '–' : price; tr.appendChild(tdPrice);
      const tdSel = document.createElement('td'); tdSel.textContent = selection==null? '–' : selection; tr.appendChild(tdSel);
      const tdSus = document.createElement('td'); tdSus.textContent = sustainability==null? '–' : sustainability; tr.appendChild(tdSus);

      tbody.appendChild(tr);
    });

  }catch(err){
    console.error('footer-stats:', err);
    const tbody = document.querySelector('#footer-stats tbody');
    if(tbody) tbody.innerHTML = `<tr><td colspan="5" class="muted">Fehler beim Laden der Statistik</td></tr>`;
  }
})();
