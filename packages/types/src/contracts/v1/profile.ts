export interface Profile {
  userId: string;
  username: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
}

export interface ProfileStats {
  collections: number;
  listingsActive: number;
  totalPortfolioValue: number;
}

export interface ProfileResponseDto {
  user: Profile;
  stats: ProfileStats;
}
