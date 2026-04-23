import { z } from 'zod';

export const AppErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  details: z.unknown().optional(),
  requestId: z.string().optional()
});
export type AppErrorDto = z.infer<typeof AppErrorSchema>;

export const AuthCredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});
export type AuthCredentialsDto = z.infer<typeof AuthCredentialsSchema>;

export const AuthResponseSchema = z.object({
  token: z.string(),
  next: z.literal('/collection'),
  user: z.object({ email: z.string().email() })
});
export type AuthResponseDto = z.infer<typeof AuthResponseSchema>;

export const CollectionCardSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  setName: z.string().min(1),
  rarity: z.string().optional(),
  condition: z.string().optional(),
  estimatedValue: z.number().nonnegative()
});
export type CollectionCardDto = z.infer<typeof CollectionCardSchema>;

export const AddCollectionCardInputSchema = z.object({
  name: z.string().min(1),
  setName: z.string().min(1),
  condition: z.string().min(1).optional(),
  purchasePrice: z.number().nonnegative().optional()
});
export type AddCollectionCardInputDto = z.infer<typeof AddCollectionCardInputSchema>;

export const CollectionSummarySchema = z.object({
  totalCards: z.number().int().nonnegative(),
  totalEstimatedValue: z.number().nonnegative(),
  dailyChangePct: z.number()
});
export type CollectionSummary = z.infer<typeof CollectionSummarySchema>;

export const CollectionResponseSchema = z.object({
  collectionSummary: CollectionSummarySchema,
  cards: z.array(CollectionCardSchema)
});
export type CollectionResponseDto = z.infer<typeof CollectionResponseSchema>;

export const CollectionValueResponseSchema = z.object({
  totalEstimatedValue: z.number().nonnegative(),
  trend: z.enum(['up', 'down', 'flat']),
  topMovers: z.array(z.object({ cardId: z.string(), changePct: z.number() }))
});
export type CollectionValueResponseDto = z.infer<typeof CollectionValueResponseSchema>;

export const MarketplaceListingSchema = z.object({
  id: z.string(),
  cardName: z.string(),
  price: z.number().nonnegative(),
  seller: z.string(),
  condition: z.string().optional()
});
export type MarketplaceListing = z.infer<typeof MarketplaceListingSchema>;

export const MarketplaceResponseSchema = z.object({
  listings: z.array(MarketplaceListingSchema)
});
export type MarketplaceResponseDto = z.infer<typeof MarketplaceResponseSchema>;

export const SharedCollectionSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  members: z.number().int().nonnegative(),
  totalEstimatedValue: z.number().nonnegative()
});
export type SharedCollectionDto = z.infer<typeof SharedCollectionSchema>;

export const SharedCollectionsResponseSchema = z.object({
  sharedCollections: z.array(SharedCollectionSchema)
});
export type SharedCollectionsResponseDto = z.infer<typeof SharedCollectionsResponseSchema>;
