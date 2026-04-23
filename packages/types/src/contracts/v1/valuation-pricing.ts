export type PricingTrend = 'up' | 'flat' | 'down';
export type PricingConfidence = 'low' | 'medium' | 'high';

export interface CardValuationSummary {
  cardId: string;
  estimatedValue: number;
  sourceCount: number;
  trend: PricingTrend;
  confidence: PricingConfidence;
  asOfIso: string;
}

export interface PortfolioValuationSummary {
  totalEstimatedValue: number;
  trend: PricingTrend;
  topMovers: Array<{
    cardId: string;
    changePct: number;
  }>;
  asOfIso: string;
}
