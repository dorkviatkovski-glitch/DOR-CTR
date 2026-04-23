import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.marketplaceListing.deleteMany();
  await prisma.valuationSnapshot.deleteMany();
  await prisma.collectionItem.deleteMany();
  await prisma.collectionMembership.deleteMany();
  await prisma.collection.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();

  const owner = await prisma.user.create({
    data: {
      email: 'dor@example.com',
      passwordHash: 'dev-only-hash',
      profile: {
        create: {
          username: 'dor',
          displayName: 'Dor'
        }
      }
    }
  });

  const collection = await prisma.collection.create({
    data: {
      name: 'Main Collection',
      description: 'Default seed collection',
      memberships: {
        create: {
          userId: owner.id,
          role: 'OWNER'
        }
      }
    }
  });

  const item = await prisma.collectionItem.create({
    data: {
      collectionId: collection.id,
      cardExternalId: 'base-charizard-4',
      cardName: 'Charizard',
      setName: 'Base Set',
      rarity: 'Rare Holo',
      condition: 'NEAR_MINT',
      quantity: 1,
      notes: 'Seeded item'
    }
  });

  await prisma.valuationSnapshot.createMany({
    data: [
      { collectionItemId: item.id, source: 'manual', priceCents: 315000, confidence: 'medium' },
      { collectionItemId: item.id, source: 'manual', priceCents: 322500, confidence: 'high' }
    ]
  });

  await prisma.marketplaceListing.create({
    data: {
      collectionItemId: item.id,
      sellerId: owner.id,
      askingPriceCents: 350000,
      status: 'ACTIVE'
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
