import { prisma } from '../lib/prisma.js';

export const pricingRepository = {
  async getLatestSnapshotsForCollection(collectionId: string) {
    const items = await prisma.collectionItem.findMany({
      where: { collectionId, deletedAt: null },
      include: {
        valuationHistory: {
          orderBy: { observedAt: 'desc' },
          take: 1
        }
      }
    });

    return items.map((item: any) => ({
      item,
      latestValuation: item.valuationHistory[0] ?? null
    }));
  }
};
