import type { Package } from '@/types';

export const PACKAGES: Package[] = [
  {
    id: 'essential',
    name: 'Essential',
    tagline: 'Everything you need to have your dog look the part.',
    price: 895,
    features: [
      'Custom-fitted formalwear (tuxedo or gown)',
      'Pre-event grooming session',
      'On-day professional handler (4 hrs)',
      'Photo coordination',
      'Liability coverage',
    ],
  },
  {
    id: 'signature',
    name: 'Signature',
    tagline: 'Our most popular package. The complete best dog experience.',
    price: 1795,
    highlighted: true,
    features: [
      'Everything in Essential',
      'Bespoke tailored garment with custom monogram',
      'Full-day handler (8 hrs)',
      'Professional photo session (50 edited images)',
      'Rehearsal attendance',
      'Emergency outfit backup',
      'Thank-you card from your dog',
    ],
  },
  {
    id: 'elite',
    name: 'Elite',
    tagline: 'White-glove service for the wedding that demands perfection.',
    price: 3200,
    features: [
      'Everything in Signature',
      'Two-day garment fitting',
      'Dedicated lead handler + assistant',
      'Video reel (ceremony highlights)',
      'Custom dog wedding cake (dog-safe)',
      'Post-event pet spa treatment',
      'Priority booking for future events',
    ],
  },
];
