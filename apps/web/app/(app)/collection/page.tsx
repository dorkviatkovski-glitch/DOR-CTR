'use client';

import { useEffect, useMemo, useState } from 'react';
import type { AddCardPayload, CollectionCard, CollectionResponse, CollectionValueResponse } from '@cardx/types';
import { AddCardForm } from '@/components/AddCardForm';
import { api } from '@/lib/api';
import { formatCurrency } from '@/lib/format';

export default function CollectionPage() {
  const [collectionData, setCollectionData] = useState<CollectionResponse | null>(null);
  const [valueData, setValueData] = useState<CollectionValueResponse | null>(null);

  useEffect(() => {
    void Promise.all([api.getCollection(), api.getCollectionValue()]).then(([collection, value]) => {
      setCollectionData(collection);
      setValueData(value);
    });
  }, []);

  const topMovers = useMemo(() => {
    if (!valueData || !collectionData) {
      return [];
    }

    return valueData.topMovers.map((mover) => {
      const card = collectionData.cards.find((item) => item.id === mover.cardId);
      return {
        id: mover.cardId,
        name: card?.name ?? 'Unknown card',
        pct: mover.changePct
      };
    });
  }, [collectionData, valueData]);

  const handleAddCard = async (payload: AddCardPayload): Promise<CollectionCard> => {
    const response = await api.addCollectionCard(payload);
    setCollectionData((current) => {
      if (!current) {
        return current;
      }

      return {
        ...current,
        collectionSummary: {
          ...current.collectionSummary,
          totalCards: current.collectionSummary.totalCards + 1
        },
        cards: [response.card, ...current.cards]
      };
    });
    return response.card;
  };

  if (!collectionData || !valueData) {
    return <section className="page">Loading collection…</section>;
  }

  return (
    <section className="page stack">
      <header className="hero-grid">
        <article className="card">
          <p className="eyebrow">Collection Value</p>
          <h1 className="value">{formatCurrency(collectionData.collectionSummary.totalEstimatedValue)}</h1>
          <p>
            {collectionData.collectionSummary.totalCards} cards ·{' '}
            <span className="positive">+{collectionData.collectionSummary.dailyChangePct}% today</span>
          </p>
        </article>
        <article className="card item-card">
          <p className="eyebrow">Live valuation trend</p>
          <strong>{valueData.trend.toUpperCase()}</strong>
          <span className="small">Top movers update in near real-time.</span>
        </article>
      </header>

      <section className="analytics-grid">
        <article className="card item-card">
          <p className="eyebrow">Total portfolio value</p>
          <strong>{formatCurrency(valueData.totalEstimatedValue)}</strong>
        </article>
        <article className="card item-card">
          <p className="eyebrow">Top mover</p>
          <strong>{topMovers[0] ? `${topMovers[0].name} (+${topMovers[0].pct}%)` : 'No movers yet'}</strong>
        </article>
      </section>

      <AddCardForm onAdd={handleAddCard} />

      <section className="section-header">
        <h2>Cards</h2>
      </section>

      <div className="grid">
        {collectionData.cards.map((card) => (
          <article key={card.id} className="card item-card">
            <strong>{card.name}</strong>
            <span>{card.setName}</span>
            <span className="small">{card.rarity} · {card.condition}</span>
            <b>{formatCurrency(card.estimatedValue)}</b>
          </article>
        ))}
      </div>
    </section>
  );
}
