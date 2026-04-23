import {
  type AddCollectionCardInputDto,
  AddCollectionCardInputSchema,
  AuthCredentialsSchema,
  type CollectionResponseDto,
  CollectionResponseSchema,
  type CollectionValueResponseDto,
  CollectionValueResponseSchema,
  type MarketplaceResponseDto,
  MarketplaceResponseSchema,
  type SharedCollectionsResponseDto,
  SharedCollectionsResponseSchema,
  type AuthResponseDto,
  AuthResponseSchema
} from '@cardx/types';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:4000';

async function requestJson<T>(path: string, init: RequestInit, schema: { parse: (v: unknown) => T }): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init.headers ?? {})
    },
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error(`API request failed: ${res.status}`);
  }

  return schema.parse(await res.json());
}

export async function signup(input: { email: string; password: string }): Promise<AuthResponseDto> {
  const payload = AuthCredentialsSchema.parse(input);
  return requestJson('/auth/signup', { method: 'POST', body: JSON.stringify(payload) }, AuthResponseSchema);
}

export async function login(input: { email: string; password: string }): Promise<AuthResponseDto> {
  const payload = AuthCredentialsSchema.parse(input);
  return requestJson('/auth/login', { method: 'POST', body: JSON.stringify(payload) }, AuthResponseSchema);
}

export async function fetchCollection(): Promise<CollectionResponseDto> {
  return requestJson('/collection', { method: 'GET' }, CollectionResponseSchema);
}

export async function fetchCollectionValue(): Promise<CollectionValueResponseDto> {
  return requestJson('/collection/value', { method: 'GET' }, CollectionValueResponseSchema);
}

export async function addCard(input: AddCollectionCardInputDto) {
  const payload = AddCollectionCardInputSchema.parse(input);

  return requestJson('/collection/cards', { method: 'POST', body: JSON.stringify(payload) }, {
    parse: (v: unknown) => v as { message: string }
  });
}

export async function fetchMarketplace(): Promise<MarketplaceResponseDto> {
  return requestJson('/marketplace', { method: 'GET' }, MarketplaceResponseSchema);
}

export async function fetchSharedCollections(): Promise<SharedCollectionsResponseDto> {
  return requestJson('/shared/collections', { method: 'GET' }, SharedCollectionsResponseSchema);
}
