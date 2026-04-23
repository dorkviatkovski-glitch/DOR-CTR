export type CardCondition =
  | 'raw_nm'
  | 'raw_lp'
  | 'raw_mp'
  | 'raw_hp'
  | 'psa_10'
  | 'psa_9'
  | 'bgs_95';

export interface CollectionCard {
  id: string;
  ownerUserId: string;
  name: string;
  setName: string;
  rarity?: string;
  condition: CardCondition;
  estimatedValue: number;
}

export interface CollectionSummary {
  totalCards: number;
  totalEstimatedValue: number;
  dailyChangePct: number;
}

export interface CollectionResponseDto {
  collectionSummary: CollectionSummary;
  cards: CollectionCard[];
}

export interface AddCollectionCardRequestDto {
  name: string;
  setName: string;
  rarity?: string;
  condition: CardCondition;
}
