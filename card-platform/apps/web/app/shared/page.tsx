'use client';

import { useEffect, useState } from 'react';
import type { SharedCollectionDto } from '@cardx/types';
import { fetchSharedCollections } from '../../lib/api';

export default function SharedPage() {
  const [collections, setCollections] = useState<SharedCollectionDto[]>([]);

  useEffect(() => {
    fetchSharedCollections()
      .then((data) => setCollections(data.sharedCollections))
      .catch(() => setCollections([]));
  }, []);

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
            <b>${item.totalEstimatedValue.toLocaleString()}</b>
          </article>
        ))}
      </div>
    </section>
  );
}
