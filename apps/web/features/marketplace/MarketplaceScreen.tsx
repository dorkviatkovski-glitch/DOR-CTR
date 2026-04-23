'use client';

import { useEffect, useState } from 'react';
import { getMarketplaceListings } from './marketplace.api';
import { MarketplaceResponse } from '@cardx/types';

export function MarketplaceScreen() {
  const [data, setData] = useState<MarketplaceResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      try {
        setData(await getMarketplaceListings());
      } catch (requestError) {
        setError(requestError instanceof Error ? requestError.message : 'Could not load marketplace');
      }
    })();
  }, []);

  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="stack">
      {data?.listings.map((listing) => (
        <article key={listing.id} className="card item-card">
          <strong>{listing.cardName}</strong>
          <span>Seller: {listing.seller}</span>
          <span>{listing.condition}</span>
          <b>${listing.price.toLocaleString()}</b>
        </article>
      ))}
    </div>
  );
}
