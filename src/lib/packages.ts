import type { Package } from '@/types';

export const PACKAGES: Package[] = [
  {
    id: 'essential',
    name: 'Essential',
    price: 895,
    tagline: 'Perfect for a simple ring-bearer moment.',
    features: [
      'Custom-fitted tuxedo or gown',
      'Professional styling consult',
      'Pre-event grooming session',
      '2-hour handler on event day',
      'Post-event garment care',
    ],
    highlighted: false,
  },
  {
    id: 'signature',
    name: 'Signature',
    price: 1795,
    tagline: 'The full ceremony experience — our most popular.',
    features: [
      'Everything in Essential',
      'Full ceremony + cocktail coverage',
      '4-hour dedicated pet handler',
      'Professional photo session (50 edited images)',
      'Transportation to & from venue',
      'Custom name badge & collar accessory',
    ],
    highlighted: true,
  },
  {
    id: 'elite',
    name: 'Elite',
    price: 2995,
    tagline: 'White-glove, all-day concierge — nothing left to chance.',
    features: [
      'Everything in Signature',
      'Full-day handler (8 hours)',
      'Rehearsal attendance & training prep',
      'Overnight spa boarding night-before',
      'Custom engraved keepsake collar',
      'Priority scheduling & venue coordination',
      'Liability coverage certificate',
    ],
    highlighted: false,
  },
];
