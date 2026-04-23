export type ApiEnvelope<T> = {
  data: T;
  meta?: Record<string, string | number | boolean | null>;
};

export type AuthUser = {
  id: string;
  email: string;
  displayName: string;
};

export type SessionTokens = {
  accessToken: string;
  refreshToken: string;
  expiresInSeconds: number;
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

export type CollectionDashboard = {
  collectionSummary: CollectionSummary;
  cards: CollectionCard[];
};

export type SharedCollection = {
  id: string;
  name: string;
  role: 'owner' | 'editor' | 'viewer';
  members: number;
  totalEstimatedValue: number;
};

export type MarketplaceListing = {
  id: string;
  cardName: string;
  price: number;
  seller: string;
  condition?: string;
  status: 'active' | 'sold' | 'draft';
};

export type PricingEstimate = {
  cardId: string;
  estimatedValue: number;
  sourceCount: number;
  trend: 'up' | 'down' | 'flat';
  confidence: 'low' | 'medium' | 'high';
};

export type ProfileSnapshot = {
  user: Pick<AuthUser, 'email' | 'displayName'>;
  stats: {
    collections: number;
    listingsActive: number;
    totalPortfolioValue: number;
  };
};
