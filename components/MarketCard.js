export default function MarketCard({emoji, title, items=[]}){
  return (
    <div className="market-card" style={{background:'#fff',padding:'1rem',borderRadius:8,border:'1px solid #eee'}}>
      <h3>{emoji} {title}</h3>
      <ul>
        {items.map((it,idx)=>(<li key={idx}>{it}</li>))}
      </ul>
    </div>
  );
}
