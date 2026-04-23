import type {
  CardValuationSummary,
  CollectionCard,
  MarketplaceListing,
  Profile,
  SharedCollectionRole
} from '@cardx/types';

export type WebContracts = {
  me: Profile;
  myCards: CollectionCard[];
  listings: MarketplaceListing[];
  valuations: CardValuationSummary[];
  activeRole: SharedCollectionRole;
};
