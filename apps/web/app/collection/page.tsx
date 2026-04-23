const cards = [
  { id: '1', name: 'Charizard', setName: 'Base Set', value: '$3,200' },
  { id: '2', name: 'Blastoise', setName: 'Base Set', value: '$1,400' },
  { id: '3', name: 'Venusaur', setName: 'Base Set', value: '$1,150' }
];

export default function CollectionPage() {
  return (
    <section className="page">
      <header className="hero card">
        <div>
          <p className="eyebrow">My Collection</p>
          <h1>$18,450</h1>
          <p>128 cards · +1.7% today</p>
        </div>
        <button className="button primary">+ Add Card</button>
      </header>

      <section className="section-header">
        <h2>Cards</h2>
      </section>

      <div className="grid">
        {cards.map((card) => (
          <article key={card.id} className="card item-card">
            <strong>{card.name}</strong>
            <span>{card.setName}</span>
            <b>{card.value}</b>
          </article>
        ))}
      </div>
    </section>
  );
}
