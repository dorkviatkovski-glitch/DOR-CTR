import { ApiError } from '@cardx/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

export async function apiRequest<TResponse, TRequest = undefined>(
  path: string,
  init?: Omit<RequestInit, 'body'> & { body?: TRequest }
): Promise<TResponse> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {})
    },
    body: init?.body ? JSON.stringify(init.body) : undefined,
    cache: 'no-store'
  });

  if (!response.ok) {
    throw await normalizeApiError(response);
  }

  return response.json() as Promise<TResponse>;
}

async function normalizeApiError(response: Response): Promise<ApiError> {
  let details: unknown;
  try {
    details = await response.json();
  } catch {
    details = undefined;
  }

  const message =
    typeof details === 'object' && details !== null && 'message' in details
      ? String((details as { message: unknown }).message)
      : `Request failed with status ${response.status}`;

  return {
    message,
    status: response.status,
    details
  };
}
