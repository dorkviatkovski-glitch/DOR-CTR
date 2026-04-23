const collections = [
  { id: '1', name: 'Family Collection', members: 3, role: 'Owner', value: '$9,200' }
];

export default function SharedPage() {
  return (
    <section className="page">
      <div className="row spread">
        <h1>Shared Collections</h1>
        <button className="button primary">Invite</button>
      </div>
      <div className="stack">
        {collections.map((item) => (
          <article key={item.id} className="card item-card">
            <strong>{item.name}</strong>
            <span>{item.members} members</span>
            <span>{item.role}</span>
            <b>{item.value}</b>
          </article>
        ))}
      </div>
    </section>
  );
}
