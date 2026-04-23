import { ProfileResponse } from '@cardx/types';
import { apiRequest } from '@/features/shared/api-client';

export function getProfile() {
  return apiRequest<ProfileResponse>('/profile');
}
