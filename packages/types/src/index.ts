export type CollectionSummary = {
  totalCards: number;
  totalEstimatedValue: number;
  dailyChangePct: number;
};

export type MarketplaceListing = {
  id: string;
  cardName: string;
  price: number;
  seller: string;
  condition?: string;
};

