
import Stripe from 'stripe';

export const stripe = new Stripe(import.meta.env.VITE_STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
});

export const SUBSCRIPTION_PRICES = {
  monthly: {
    amount: 2500, // $25.00
    id: 'price_monthly', // You'll need to replace this with your actual Stripe price ID
    perDay: 0.83,
  },
  annual: {
    amount: 21000, // $210.00
    id: 'price_annual', // You'll need to replace this with your actual Stripe price ID
    perDay: 0.58,
  },
} as const;
