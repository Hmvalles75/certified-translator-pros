import Stripe from "stripe";

// Initialize Stripe only if key is available
// This allows the build to succeed without env vars
const stripeKey = process.env.STRIPE_SECRET_KEY || "";

if (!stripeKey && process.env.NODE_ENV !== "production") {
  console.warn("Warning: STRIPE_SECRET_KEY not set. Stripe features will not work.");
}

export const stripe = new Stripe(stripeKey, {
  apiVersion: "2023-10-16",
  typescript: true,
});

export function formatAmountForStripe(amount: number): number {
  return Math.round(amount);
}

export function formatAmountForDisplay(amount: number): string {
  return (amount / 100).toFixed(2);
}
