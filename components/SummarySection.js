export default function SummarySection({title, children, className = ''}){
  return (
    <section className={`summary-section ${className}`}>
      <h2>{title}</h2>
      <div>{children}</div>
    </section>
  );
}
