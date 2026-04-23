export type ApiError = {
  message: string;
  status: number;
  details?: unknown;
};

export type AuthRequest = {
  email: string;
  password: string;
};

export type AuthResponse = {
  next: string;
  user: { email: string };
};

export type LoginResponse = AuthResponse & { token: string };

export type CollectionCard = {
  id: string;
  name: string;
  setName: string;
  rarity?: string;
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

export type AddCollectionCardRequest = {
  name: string;
  setName: string;
  condition: string;
};

export type AddCollectionCardResponse = {
  message: string;
  card: CollectionCard & { pricingStatus: 'pending' | 'ready' };
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
