import { api } from '@/lib/api';
import { formatCurrency } from '@/lib/format';

export default async function MarketplacePage() {
  const marketplace = await api.getMarketplace();

  return (
    <section className="page">
      <h1>Marketplace</h1>
      <div className="stack">
        {marketplace.listings.map((listing) => (
          <article key={listing.id} className="card item-card">
            <strong>{listing.cardName}</strong>
            <span>Seller: {listing.seller}</span>
            <span>Condition: {listing.condition ?? 'N/A'}</span>
            <b>{formatCurrency(listing.price)}</b>
            <div className="row">
              <button className="button secondary">View</button>
              <button className="button primary">Chat</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
