import { SharedCollectionsResponse } from '@cardx/types';
import { apiRequest } from '@/features/shared/api-client';

export function getSharedCollections() {
  return apiRequest<SharedCollectionsResponse>('/shared/collections');
}
