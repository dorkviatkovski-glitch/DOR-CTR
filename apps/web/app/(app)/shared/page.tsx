import { api } from '@/lib/api';
import { formatCurrency } from '@/lib/format';

export default async function SharedPage() {
  const sharedCollections = await api.getSharedCollections();

  return (
    <section className="page">
      <div className="row spread">
        <h1>Shared Collections</h1>
        <button className="button primary">Invite</button>
      </div>
      <div className="stack">
        {sharedCollections.sharedCollections.map((item) => (
          <article key={item.id} className="card item-card">
            <strong>{item.name}</strong>
            <span>{item.members} members</span>
            <span>{item.role}</span>
            <b>{formatCurrency(item.totalEstimatedValue)}</b>
          </article>
        ))}
      </div>
    </section>
  );
}
