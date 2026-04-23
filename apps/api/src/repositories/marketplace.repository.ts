import { prisma } from '../lib/prisma.js';

export const marketplaceRepository = {
  async listActiveListings() {
    return prisma.marketplaceListing.findMany({
      where: { status: 'ACTIVE' },
      include: {
        seller: { include: { profile: true } },
        collectionItem: true
      }
    });
  },

  async findCollectionItemForListing(collectionItemId: string) {
    return prisma.collectionItem.findUnique({
      where: { id: collectionItemId },
      include: {
        collection: {
          include: { memberships: true }
        }
      }
    });
  },

  async createListing(input: { collectionItemId: string; sellerId: string; askingPriceCents: number }) {
    return prisma.marketplaceListing.create({
      data: {
        ...input,
        status: 'ACTIVE'
      }
    });
  }
};
