import {
  AddCollectionCardRequest,
  AddCollectionCardResponse,
  CollectionResponse
} from '@cardx/types';
import { apiRequest } from '@/features/shared/api-client';

export function getCollection() {
  return apiRequest<CollectionResponse>('/collection');
}

export function addCollectionCard(payload: AddCollectionCardRequest) {
  return apiRequest<AddCollectionCardResponse, AddCollectionCardRequest>('/collection/cards', {
    method: 'POST',
    body: payload
  });
}
