import { InfoCard } from '../../components/InfoCard';
import { PageTitle } from '../../components/PageTitle';

const listings = [
  { id: '1', title: 'Pikachu Illustrator', price: '$250,000', seller: 'collector_pro' },
  { id: '2', title: 'Lugia 1st Edition', price: '$5,200', seller: 'rarevault' }
];

export default function MarketplacePage() {
  return (
    <section className="page">
      <PageTitle title="Marketplace" subtitle="Browse high-value listings" />
      <div className="stack">
        {listings.map((listing) => (
          <InfoCard key={listing.id}>
            <strong>{listing.title}</strong>
            <span>Seller: {listing.seller}</span>
            <b>{listing.price}</b>
            <div className="row">
              <button className="button secondary">View</button>
              <button className="button primary">Chat</button>
            </div>
          </InfoCard>
        ))}
      </div>
    </section>
  );
}
