import { api } from '@/lib/api';
import { formatCurrency } from '@/lib/format';

export default async function ProfilePage() {
  const profile = await api.getProfile();

  return (
    <section className="page">
      <h1>Profile</h1>
      <div className="stack">
        <article className="card item-card">
          <strong>{profile.user.username}</strong>
          <span>{profile.user.email}</span>
        </article>
        <article className="card item-card">
          <strong>Portfolio Value</strong>
          <b>{formatCurrency(profile.stats.totalPortfolioValue)}</b>
        </article>
        <article className="card item-card">
          <strong>Active Listings</strong>
          <b>{profile.stats.listingsActive}</b>
        </article>
      </div>
    </section>
  );
}
