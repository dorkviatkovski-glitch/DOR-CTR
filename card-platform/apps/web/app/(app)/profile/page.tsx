export default function ProfilePage() {
  return (
    <section className="page">
      <h1>Profile</h1>
      <div className="stack">
        <article className="card item-card">
          <strong>Dor</strong>
          <span>dor@example.com</span>
        </article>
        <article className="card item-card">
          <strong>Portfolio Value</strong>
          <b>$27,650</b>
        </article>
        <article className="card item-card">
          <strong>Active Listings</strong>
          <b>4</b>
        </article>
      </div>
    </section>
  );
}
