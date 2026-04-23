export type SharedCollectionRole = 'owner' | 'editor' | 'viewer';

export interface SharedPermissionMatrix {
  canInvite: boolean;
  canEditCards: boolean;
  canManageRoles: boolean;
  canDeleteCollection: boolean;
}

export type SharedPermissionsByRole = Record<SharedCollectionRole, SharedPermissionMatrix>;

export interface SharedCollectionMember {
  userId: string;
  email: string;
  role: SharedCollectionRole;
}

export interface InviteMemberRequestDto {
  email: string;
  role: Exclude<SharedCollectionRole, 'owner'>;
}
