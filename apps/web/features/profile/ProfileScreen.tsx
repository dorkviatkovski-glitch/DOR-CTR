'use client';

import { ProfileResponse } from '@cardx/types';
import { useEffect, useState } from 'react';
import { getProfile } from './profile.api';

export function ProfileScreen() {
  const [data, setData] = useState<ProfileResponse | null>(null);

  useEffect(() => {
    void (async () => setData(await getProfile()))();
  }, []);

  if (!data) return <p className="muted">Loading profile...</p>;

  return (
    <div className="stack">
      <article className="card item-card">
        <strong>{data.user.username}</strong>
        <span>{data.user.email}</span>
      </article>
      <article className="card item-card">
        <strong>Portfolio Value</strong>
        <b>${data.stats.totalPortfolioValue.toLocaleString()}</b>
      </article>
      <article className="card item-card">
        <strong>Active Listings</strong>
        <b>{data.stats.listingsActive}</b>
      </article>
    </div>
  );
}
