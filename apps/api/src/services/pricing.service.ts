import { pricingRepository } from '../repositories/pricing.repository.js';

export const pricingService = {
  async getPortfolioTotals(collectionId: string) {
    const valuationRows = await pricingRepository.getLatestSnapshotsForCollection(collectionId);

    const items = valuationRows.map(({ item, latestValuation }: any) => {
      const estimatedValueCents = (latestValuation?.priceCents ?? 0) * item.quantity;
      return {
        itemId: item.id,
        cardName: item.cardName,
        quantity: item.quantity,
        latestPriceCents: latestValuation?.priceCents ?? 0,
        estimatedValueCents
      };
    });

    return {
      totalEstimatedValueCents: items.reduce((acc: number, item: any) => acc + item.estimatedValueCents, 0),
      totalCards: items.reduce((acc: number, item: any) => acc + item.quantity, 0),
      items
    };
  }
};
