export type MarketplaceListingStatus =
  | 'draft'
  | 'active'
  | 'reserved'
  | 'sold'
  | 'cancelled'
  | 'expired';

export interface MarketplaceListing {
  id: string;
  cardId: string;
  sellerUserId: string;
  askingPrice: number;
  status: MarketplaceListingStatus;
  createdAtIso: string;
  updatedAtIso: string;
}

export interface CreateMarketplaceListingRequestDto {
  cardId: string;
  askingPrice: number;
}

export interface MarketplaceLifecycleEventDto {
  listingId: string;
  fromStatus: MarketplaceListingStatus;
  toStatus: MarketplaceListingStatus;
  changedAtIso: string;
  reason?: string;
}
