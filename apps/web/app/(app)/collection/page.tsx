import { CollectionDashboard } from '@/features/collection/CollectionDashboard';

export default function CollectionPage() {
  return (
    <section className="page">
      <header className="hero card">
        <div>
          <p className="eyebrow">My Collection</p>
          <h1>Dashboard</h1>
          <p>Live data from the backend</p>
        </div>
      </header>
      <section className="section-header">
        <h2>Collection Overview</h2>
      </section>
      <CollectionDashboard />
    </section>
  );
}
