'use client';

import { FormEvent, useEffect, useState } from 'react';
import type { CollectionCardDto } from '@cardx/types';
import { addCard, fetchCollection, fetchCollectionValue } from '../../lib/api';

export default function CollectionPage() {
  const [cards, setCards] = useState<CollectionCardDto[]>([]);
  const [totalValue, setTotalValue] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [collection, value] = await Promise.all([fetchCollection(), fetchCollectionValue()]);
        setCards(collection.cards);
        setTotalValue(value.totalEstimatedValue);
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    await addCard({
      name: String(formData.get('name') ?? ''),
      setName: String(formData.get('setName') ?? ''),
      condition: String(formData.get('condition') ?? ''),
      purchasePrice: Number(formData.get('purchasePrice') ?? 0)
    });

    const [collection, value] = await Promise.all([fetchCollection(), fetchCollectionValue()]);
    setCards(collection.cards);
    setTotalValue(value.totalEstimatedValue);
    event.currentTarget.reset();
  }

  return (
    <section className="page stack">
      <header className="hero card">
        <div>
          <p className="eyebrow">My Collection</p>
          <h1>${totalValue.toLocaleString()}</h1>
          <p>{cards.length} cards</p>
        </div>
      </header>

      <form className="card form" onSubmit={onSubmit}>
        <h2>Add Card</h2>
        <input name="name" placeholder="Card name" required />
        <input name="setName" placeholder="Set name" required />
        <input name="condition" placeholder="Condition" />
        <input min={0} name="purchasePrice" placeholder="Purchase price" step="0.01" type="number" />
        <button className="button primary" type="submit">Add card</button>
      </form>

      <section className="section-header">
        <h2>Cards</h2>
      </section>

      {loading ? <p>Loading collection...</p> : null}
      <div className="grid">
        {cards.map((card) => (
          <article key={card.id} className="card item-card">
            <strong>{card.name}</strong>
            <span>{card.setName}</span>
            <b>${card.estimatedValue.toLocaleString()}</b>
          </article>
        ))}
      </div>
    </section>
  );
}
