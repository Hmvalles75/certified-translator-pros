import {
  STARTING_PRICE_PER_PAGE,
  RUSH_MULTIPLIER,
  DEFAULT_PAGES,
} from "./constants";
import type { Urgency } from "./types/database";

export function calculateOrderPrice(
  pages: number = DEFAULT_PAGES,
  urgency: Urgency = "standard"
): number {
  let basePrice = STARTING_PRICE_PER_PAGE * pages;

  if (urgency === "rush") {
    basePrice = Math.round(basePrice * RUSH_MULTIPLIER);
  }

  return basePrice;
}

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export interface PriceBreakdown {
  basePrice: number;
  rushFee: number;
  totalPrice: number;
}

export function getPriceBreakdown(
  pages: number = DEFAULT_PAGES,
  urgency: Urgency = "standard"
): PriceBreakdown {
  const basePrice = STARTING_PRICE_PER_PAGE * pages;
  const rushFee = urgency === "rush" ? Math.round(basePrice * (RUSH_MULTIPLIER - 1)) : 0;
  const totalPrice = basePrice + rushFee;

  return {
    basePrice,
    rushFee,
    totalPrice,
  };
}
