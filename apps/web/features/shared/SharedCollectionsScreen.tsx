'use client';

import { SharedCollectionsResponse } from '@cardx/types';
import { useEffect, useState } from 'react';
import { getSharedCollections } from './shared.api';

export function SharedCollectionsScreen() {
  const [data, setData] = useState<SharedCollectionsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      try {
        setData(await getSharedCollections());
      } catch (requestError) {
        setError(requestError instanceof Error ? requestError.message : 'Could not load shared collections.');
      }
    })();
  }, []);

  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="stack">
      {data?.sharedCollections.map((item) => (
        <article key={item.id} className="card item-card">
          <strong>{item.name}</strong>
          <span>{item.members} members</span>
          <span>{item.role}</span>
          <b>${item.totalEstimatedValue.toLocaleString()}</b>
        </article>
      ))}
    </div>
  );
}
