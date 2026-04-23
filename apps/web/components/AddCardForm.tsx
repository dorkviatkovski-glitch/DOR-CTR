'use client';

import { useState, useTransition } from 'react';
import type { AddCardPayload, CollectionCard } from '@cardx/types';

type Props = {
  onAdd: (payload: AddCardPayload) => Promise<CollectionCard>;
};

const defaultPayload: AddCardPayload = {
  name: '',
  setName: '',
  rarity: 'Rare',
  condition: 'Near Mint'
};

export function AddCardForm({ onAdd }: Props) {
  const [payload, setPayload] = useState(defaultPayload);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const updateField = <K extends keyof AddCardPayload>(field: K, value: AddCardPayload[K]) => {
    setPayload((current) => ({ ...current, [field]: value }));
  };

  return (
    <section className="card stack">
      <div className="row spread">
        <div>
          <p className="eyebrow">Collection actions</p>
          <strong>Add a card manually</strong>
        </div>
        <button className="button primary" onClick={() => setIsOpen((state) => !state)} type="button">
          {isOpen ? 'Close' : '+ Add Card'}
        </button>
      </div>

      {isOpen && (
        <form
          className="form"
          onSubmit={(event) => {
            event.preventDefault();
            setError(null);
            startTransition(async () => {
              try {
                await onAdd(payload);
                setPayload(defaultPayload);
                setIsOpen(false);
              } catch (submissionError) {
                setError(submissionError instanceof Error ? submissionError.message : 'Unable to add card');
              }
            });
          }}
        >
          <input
            required
            placeholder="Card name"
            value={payload.name}
            onChange={(event) => updateField('name', event.target.value)}
          />
          <input
            required
            placeholder="Set name"
            value={payload.setName}
            onChange={(event) => updateField('setName', event.target.value)}
          />
          <input
            required
            placeholder="Rarity"
            value={payload.rarity}
            onChange={(event) => updateField('rarity', event.target.value)}
          />
          <select value={payload.condition} onChange={(event) => updateField('condition', event.target.value)}>
            <option>Near Mint</option>
            <option>Lightly Played</option>
            <option>Moderately Played</option>
            <option>Heavily Played</option>
          </select>
          {error ? <span className="small">{error}</span> : null}
          <button className="button primary" type="submit" disabled={isPending}>
            {isPending ? 'Saving…' : 'Save card'}
          </button>
        </form>
      )}
    </section>
  );
}
