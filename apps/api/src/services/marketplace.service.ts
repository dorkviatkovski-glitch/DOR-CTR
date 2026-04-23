import { marketplaceRepository } from '../repositories/marketplace.repository.js';

const listingRoles = new Set(['OWNER', 'EDITOR']);

export const marketplaceService = {
  async listListings() {
    const listings = await marketplaceRepository.listActiveListings();

    return listings.map((listing: any) => ({
      id: listing.id,
      cardName: listing.collectionItem.cardName,
      priceCents: listing.askingPriceCents,
      seller: listing.seller.profile?.username ?? listing.seller.email,
      condition: listing.collectionItem.condition,
      status: listing.status
    }));
  },

  async createListing(input: { collectionItemId: string; sellerId: string; askingPriceCents: number }) {
    const item = await marketplaceRepository.findCollectionItemForListing(input.collectionItemId);
    if (!item) {
      throw new Error('Collection item not found');
    }

    const membership = item.collection.memberships.find((member: any) => member.userId === input.sellerId);
    if (!membership || !listingRoles.has(membership.role)) {
      throw new Error('Seller must be an owner or editor of the source collection');
    }

    return marketplaceRepository.createListing(input);
  }
};
