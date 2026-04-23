import {
  AddCollectionCardInputSchema,
  type AddCollectionCardInputDto,
  type CollectionCardDto,
  type CollectionResponseDto,
  type CollectionValueResponseDto
} from '@cardx/types';
import { validateOrThrow } from '../../../common/validate.js';

const cards: CollectionCardDto[] = [
  {
    id: 'uc_1',
    name: 'Charizard',
    setName: 'Base Set',
    rarity: 'Rare Holo',
    condition: 'PSA 8',
    estimatedValue: 3200
  }
];

export function getCollection(): CollectionResponseDto {
  const totalEstimatedValue = cards.reduce((sum, card) => sum + card.estimatedValue, 0);

  return {
    collectionSummary: {
      totalCards: cards.length,
      totalEstimatedValue,
      dailyChangePct: 1.7
    },
    cards
  };
}

export function addCollectionCard(payload: unknown): CollectionCardDto {
  const input = validateOrThrow<AddCollectionCardInputDto>(
    AddCollectionCardInputSchema,
    payload,
    'Invalid card payload'
  );

  const newCard: CollectionCardDto = {
    id: `uc_${cards.length + 1}`,
    name: input.name,
    setName: input.setName,
    condition: input.condition,
    estimatedValue: input.purchasePrice ?? 0
  };

  cards.unshift(newCard);
  return newCard;
}

export function getCollectionValue(): CollectionValueResponseDto {
  const totalEstimatedValue = cards.reduce((sum, card) => sum + card.estimatedValue, 0);

  return {
    totalEstimatedValue,
    trend: 'up',
    topMovers: cards.slice(0, 1).map((card) => ({ cardId: card.id, changePct: 8.2 }))
  };
}
