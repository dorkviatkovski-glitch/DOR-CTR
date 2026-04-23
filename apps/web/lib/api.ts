import type {
  AddCardPayload,
  AddCardResponse,
  AuthPayload,
  AuthResponse,
  CollectionResponse,
  CollectionValueResponse,
  MarketplaceResponse,
  ProfileResponse,
  SharedCollectionsResponse
} from '@cardx/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {})
    },
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error(`API request failed for ${path} (${response.status})`);
  }

  return response.json() as Promise<T>;
}

export const api = {
  login: (payload: AuthPayload) =>
    request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),
  signup: (payload: AuthPayload) =>
    request<AuthResponse>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),
  getCollection: () => request<CollectionResponse>('/collection'),
  addCollectionCard: (payload: AddCardPayload) =>
    request<AddCardResponse>('/collection/cards', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),
  getCollectionValue: () => request<CollectionValueResponse>('/collection/value'),
  getMarketplace: () => request<MarketplaceResponse>('/marketplace'),
  getSharedCollections: () => request<SharedCollectionsResponse>('/shared/collections'),
  getProfile: () => request<ProfileResponse>('/profile')
};
