'use client';

import { useEffect, useState } from 'react';
import type { MarketplaceListing } from '@cardx/types';
import { fetchMarketplace } from '../../lib/api';

export default function MarketplacePage() {
  const [listings, setListings] = useState<MarketplaceListing[]>([]);

  useEffect(() => {
    fetchMarketplace()
      .then((data) => setListings(data.listings))
      .catch(() => setListings([]));
  }, []);

  return (
    <section className="page">
      <h1>Marketplace</h1>
      <div className="stack">
        {listings.map((listing) => (
          <article key={listing.id} className="card item-card">
            <strong>{listing.cardName}</strong>
            <span>Seller: {listing.seller}</span>
            <b>${listing.price.toLocaleString()}</b>
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
