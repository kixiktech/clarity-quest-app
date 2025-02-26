
import Stripe from 'stripe';

export const stripe = new Stripe(import.meta.env.VITE_STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-02-24.acacia',
});

export const SUBSCRIPTION_PRICES = {
  monthly: {
    amount: 2500, // $25.00
    id: process.env.STRIPE_MONTHLY_PRICE_ID ?? 'price_monthly',
    perDay: 0.83,
  },
  annual: {
    amount: 21000, // $210.00
    id: process.env.STRIPE_ANNUAL_PRICE_ID ?? 'price_annual',
    perDay: 0.58,
  },
} as const;
