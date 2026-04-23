import { InfoCard } from '../../components/InfoCard';

export default function ProfilePage() {
  return (
    <section className="page">
      <h1>Profile</h1>
      <div className="stack">
        <InfoCard>
          <strong>Dor</strong>
          <span>dor@example.com</span>
        </InfoCard>
        <InfoCard>
          <strong>Portfolio Value</strong>
          <b>$27,650</b>
        </InfoCard>
        <InfoCard>
          <strong>Active Listings</strong>
          <b>4</b>
        </InfoCard>
      </div>
    </section>
  );
}
