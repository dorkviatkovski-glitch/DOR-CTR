import type { SharedCollectionsResponseDto } from '@cardx/types';

export function getSharedCollections(): SharedCollectionsResponseDto {
  return {
    sharedCollections: [
      {
        id: 'shared_1',
        name: 'Family Collection',
        role: 'owner',
        members: 3,
        totalEstimatedValue: 9200
      }
    ]
  };
}
