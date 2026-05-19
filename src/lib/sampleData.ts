import type { Lead } from '@/types';

export const sampleLeads: Lead[] = [
  {
    id: '1',
    name: 'Sarah Thornton',
    email: 'sarah@example.com',
    source: 'hero_cta',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
  {
    id: '2',
    name: 'Priya Chen',
    email: 'priya@example.com',
    source: 'waitlist_banner',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    id: '3',
    name: 'David Williams',
    email: 'david@example.com',
    source: 'onboarding',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
];
