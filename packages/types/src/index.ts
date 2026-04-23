export type AuthPayload = {
  email: string;
  password: string;
};

export type AuthResponse = {
  token?: string;
  next: '/collection';
  user: { email: string };
  message?: string;
};

export type CollectionCard = {
  id: string;
  name: string;
  setName: string;
  rarity: string;
  condition: string;
  estimatedValue: number;
};

export type CollectionSummary = {
  totalCards: number;
  totalEstimatedValue: number;
  dailyChangePct: number;
};

export type CollectionResponse = {
  collectionSummary: CollectionSummary;
  cards: CollectionCard[];
};

export type AddCardPayload = {
  name: string;
  setName: string;
  rarity: string;
  condition: string;
};

export type AddCardResponse = {
  message: string;
  card: CollectionCard & { pricingStatus: 'pending' | 'ready' };
};

export type CollectionValueResponse = {
  totalEstimatedValue: number;
  trend: 'up' | 'down' | 'flat';
  topMovers: Array<{ cardId: string; changePct: number }>;
};

export type MarketplaceListing = {
  id: string;
  cardName: string;
  price: number;
  seller: string;
  condition?: string;
};

export type MarketplaceResponse = {
  listings: MarketplaceListing[];
};

export type SharedCollection = {
  id: string;
  name: string;
  role: string;
  members: number;
  totalEstimatedValue: number;
};

export type SharedCollectionsResponse = {
  sharedCollections: SharedCollection[];
};

export type ProfileResponse = {
  user: {
    username: string;
    email: string;
  };
  stats: {
    collections: number;
    listingsActive: number;
    totalPortfolioValue: number;
  };
};
