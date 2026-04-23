import { prisma } from '../lib/prisma.js';

export type CreateCollectionItemInput = {
  collectionId: string;
  cardExternalId: string;
  cardName: string;
  setName?: string;
  rarity?: string;
  condition: 'MINT' | 'NEAR_MINT' | 'LIGHTLY_PLAYED' | 'MODERATELY_PLAYED' | 'HEAVILY_PLAYED' | 'DAMAGED' | 'AUTHENTICATED';
  quantity?: number;
  notes?: string;
};

export const collectionRepository = {
  async listCollectionItems(collectionId: string) {
    return prisma.collectionItem.findMany({
      where: { collectionId, deletedAt: null },
      include: {
        valuationHistory: {
          orderBy: { observedAt: 'desc' },
          take: 1
        }
      }
    });
  },

  async createCollectionItem(input: CreateCollectionItemInput) {
    return prisma.collectionItem.create({ data: input });
  }
};
