import type { MarketplaceResponseDto } from '@cardx/types';

export function getMarketplaceListings(): MarketplaceResponseDto {
  return {
    listings: [
      {
        id: 'list_1',
        cardName: 'Pikachu Illustrator',
        price: 250000,
        seller: 'collector_pro',
        condition: 'Authenticated'
      },
      {
        id: 'list_2',
        cardName: 'Lugia 1st Edition',
        price: 5200,
        seller: 'rarevault',
        condition: 'Near Mint'
      }
    ]
  };
}
