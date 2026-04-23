import { collectionRepository } from '../repositories/collection.repository.js';

export const collectionService = {
  async getCollectionOverview(collectionId: string) {
    const items = await collectionRepository.listCollectionItems(collectionId);
    const normalizedItems = items.map((item: any) => {
      const estimatedValueCents = (item.valuationHistory[0]?.priceCents ?? 0) * item.quantity;
      return {
        id: item.id,
        cardExternalId: item.cardExternalId,
        cardName: item.cardName,
        setName: item.setName,
        rarity: item.rarity,
        condition: item.condition,
        quantity: item.quantity,
        notes: item.notes,
        estimatedValueCents
      };
    });

    return {
      collectionSummary: {
        totalCards: normalizedItems.reduce((acc: number, item: any) => acc + item.quantity, 0),
        totalEstimatedValueCents: normalizedItems.reduce((acc: number, item: any) => acc + item.estimatedValueCents, 0)
      },
      cards: normalizedItems
    };
  },

  async addCollectionCard(input: {
    collectionId: string;
    cardExternalId: string;
    cardName: string;
    setName?: string;
    rarity?: string;
    condition: 'MINT' | 'NEAR_MINT' | 'LIGHTLY_PLAYED' | 'MODERATELY_PLAYED' | 'HEAVILY_PLAYED' | 'DAMAGED' | 'AUTHENTICATED';
    quantity?: number;
    notes?: string;
  }) {
    return collectionRepository.createCollectionItem(input);
  }
};
