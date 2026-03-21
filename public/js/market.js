// Copied from landingpage/market.js, adjusted paths for Next.js public folder
function qs(key){
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
}

function setYear(){
  const el = document.getElementById('year'); if(el) el.textContent = new Date().getFullYear();
}

async function loadMarket(){
  const id = qs('id') || 'lidl';
  try{
    const res = await fetch('/data/market_scores.json');
    if(!res.ok) throw new Error('market_scores.json konnte nicht geladen werden');
    const data = await res.json();
    const markets = data.markets;
    const market = markets.find(m=>m.id===id);
    if(!market) throw new Error('Markt nicht gefunden: '+id);
    render(market, markets);
  }catch(err){
    const main = document.querySelector('main .container');
    if(main) main.innerHTML = `<p style="color:#c00">Fehler: ${err.message}</p>`;
    console.error(err);
  }
}

function render(market, markets){
  const nameEl = document.getElementById('market-name'); if(nameEl) nameEl.textContent = market.name;
  const labels = Object.keys(market.scores);
  const radarData = labels.map(k=>market.scores[k]);

  const radarCtx = document.getElementById('radarChart');
  if(radarCtx){
    new Chart(radarCtx.getContext('2d'), {
      type: 'radar',
      data: {
        labels: labels.map(l=>l.charAt(0).toUpperCase()+l.slice(1)),
        datasets: [{
          label: market.name,
          data: radarData,
          backgroundColor: 'rgba(43,140,255,0.15)',
          borderColor: 'rgba(43,140,255,0.9)',
          pointBackgroundColor: 'rgba(43,140,255,0.9)'
        }]
      },
      options:{
        scales:{ r:{ suggestedMin:0, suggestedMax:10, ticks:{stepSize:2} } }
      }
    });
  }

  const avgScores = markets.map(m=>{
    const vals = Object.values(m.scores);
    return vals.reduce((a,b)=>a+b,0)/vals.length;
  });
  const barCtx = document.getElementById('barChart');
  if(barCtx){
    new Chart(barCtx.getContext('2d'), {
      type: 'bar',
      data: { labels: markets.map(m=>m.name), datasets:[{ label: 'Durchschnitts-Score', data: avgScores, backgroundColor: markets.map(m=> m.id===market.id ? 'rgba(43,140,255,0.9)' : 'rgba(200,200,200,0.7)') }] },
      options: { scales:{ y:{ beginAtZero:true, suggestedMax:10 } } }
    });
  }
}

setYear();
loadMarket();
