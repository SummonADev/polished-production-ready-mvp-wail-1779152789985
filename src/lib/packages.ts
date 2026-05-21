import type { Package } from '@/types/index';

export const PACKAGES: Package[] = [
  {
    id: 'gentleman',
    name: 'The Gentleman',
    price: '$1,200',
    period: 'per event',
    emoji: '🎩',
    tag: null,
    description: 'Perfect for a single dog with a supporting role.',
    features: [
      'Custom-fitted tuxedo or dress',
      'Pre-event grooming session',
      'Professional handler (4 hours)',
      '30-min photo session',
      'Safe return home',
    ],
  },
  {
    id: 'grand-marshal',
    name: 'The Grand Marshal',
    price: '$2,400',
    period: 'per event',
    emoji: '🌟',
    tag: 'Most Popular',
    description: 'Our flagship full-service experience.',
    features: [
      'Everything in The Gentleman',
      'Handler for full event (8 hours)',
      'Bespoke accessories & bow tie',
      '1-hour professional photo session',
      'Wedding gallery priority edit',
      'Dedicated event coordinator',
    ],
  },
  {
    id: 'royal-pack',
    name: 'The Royal Pack',
    price: '$3,800',
    period: 'per event',
    emoji: '👑',
    tag: null,
    description: 'For multiple dogs or extra-special occasions.',
    features: [
      'Everything in The Grand Marshal',
      'Up to 3 dogs',
      'Multiple handlers assigned',
      'Rehearsal walk-through included',
      'Custom engraved keepsake collar',
      'Full-day coverage (12 hours)',
    ],
  },
];
