import type {
  AuthResponseDto,
  CollectionResponseDto,
  MarketplaceLifecycleEventDto,
  ProfileResponseDto,
  SharedPermissionsByRole
} from '@cardx/types';

export type ApiContracts = {
  auth: AuthResponseDto;
  profile: ProfileResponseDto;
  collection: CollectionResponseDto;
  marketplaceLifecycle: MarketplaceLifecycleEventDto;
  sharedPermissions: SharedPermissionsByRole;
};
