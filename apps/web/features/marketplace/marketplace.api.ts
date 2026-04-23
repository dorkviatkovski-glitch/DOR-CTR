import { MarketplaceResponse } from '@cardx/types';
import { apiRequest } from '@/features/shared/api-client';

export function getMarketplaceListings() {
  return apiRequest<MarketplaceResponse>('/marketplace');
}
