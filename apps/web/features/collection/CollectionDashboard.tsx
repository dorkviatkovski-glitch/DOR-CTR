'use client';

import { CollectionCard, CollectionResponse } from '@cardx/types';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { addCollectionCard, getCollection } from './collection.api';

export function CollectionDashboard() {
  const [data, setData] = useState<CollectionResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [setLabel, setSetLabel] = useState('');
  const [condition, setCondition] = useState('');

  useEffect(() => {
    void (async () => {
      try {
        setData(await getCollection());
      } catch (requestError) {
        setError(requestError instanceof Error ? requestError.message : 'Could not load collection.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const trendLabel = useMemo(() => {
    if (!data) {
      return '—';
    }
    return `${data.collectionSummary.dailyChangePct > 0 ? '+' : ''}${data.collectionSummary.dailyChangePct}%`;
  }, [data]);

  async function onAddCard(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    try {
      const response = await addCollectionCard({ name, setName: setLabel, condition });
      const nextCards = [response.card as CollectionCard, ...(data?.cards ?? [])];
      setData((previous) =>
        previous
          ? {
              ...previous,
              cards: nextCards,
              collectionSummary: {
                ...previous.collectionSummary,
                totalCards: previous.collectionSummary.totalCards + 1
              }
            }
          : null
      );
      setName('');
      setSetLabel('');
      setCondition('');
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Could not add card.');
    }
  }

  if (loading) {
    return <p className="muted">Loading collection...</p>;
  }

  if (error && !data) {
    return <p className="error-text">{error}</p>;
  }

  return (
    <div className="stack">
      <section className="grid">
        <article className="card item-card">
          <strong>Total value</strong>
          <b>${data?.collectionSummary.totalEstimatedValue.toLocaleString()}</b>
        </article>
        <article className="card item-card">
          <strong>Card count</strong>
          <b>{data?.collectionSummary.totalCards}</b>
        </article>
        <article className="card item-card">
          <strong>Trend</strong>
          <b>{trendLabel}</b>
        </article>
      </section>

      <section className="card">
        <h2>Add Card</h2>
        <form className="form" onSubmit={onAddCard}>
          <input placeholder="Card name" value={name} onChange={(event) => setName(event.target.value)} required />
          <input placeholder="Set name" value={setLabel} onChange={(event) => setSetLabel(event.target.value)} required />
          <input
            placeholder="Condition (e.g. PSA 9)"
            value={condition}
            onChange={(event) => setCondition(event.target.value)}
            required
          />
          {error && <p className="error-text">{error}</p>}
          <button className="button primary" type="submit">
            Add card
          </button>
        </form>
      </section>

      <section>
        <h2>Cards</h2>
        <div className="grid">
          {data?.cards.map((card) => (
            <article key={card.id} className="card item-card">
              <strong>{card.name}</strong>
              <span>{card.setName}</span>
              <span>{card.condition}</span>
              <b>${card.estimatedValue.toLocaleString()}</b>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
