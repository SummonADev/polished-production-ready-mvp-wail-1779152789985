import type { Booking, Lead } from '@/types/index';

export const sampleBookings: Booking[] = [
  {
    id: 'b1',
    ownerName: 'Sarah Thornton',
    ownerEmail: 'sarah@example.com',
    dogName: 'Biscuit',
    dogBreed: 'Golden Retriever',
    packageId: 'grand-marshal',
    eventDate: '2025-06-15',
    status: 'confirmed',
    createdAt: new Date('2025-01-10').toISOString(),
  },
  {
    id: 'b2',
    ownerName: 'Priya Chen',
    ownerEmail: 'priya@example.com',
    dogName: 'Mochi',
    dogBreed: 'French Bulldog',
    packageId: 'grand-marshal',
    eventDate: '2025-07-20',
    status: 'pending',
    createdAt: new Date('2025-01-15').toISOString(),
  },
  {
    id: 'b3',
    ownerName: 'Lauren Williams',
    ownerEmail: 'lauren@example.com',
    dogName: 'Duchess',
    dogBreed: 'Poodle',
    packageId: 'royal-pack',
    eventDate: '2025-08-05',
    status: 'confirmed',
    createdAt: new Date('2025-01-18').toISOString(),
  },
];

export const sampleLeads: Lead[] = [
  {
    id: 'l1',
    email: 'couple1@example.com',
    name: 'Alex & Jamie',
    source: 'waitlist_banner',
    createdAt: new Date('2025-01-05').toISOString(),
  },
  {
    id: 'l2',
    email: 'couple2@example.com',
    name: 'Morgan & Riley',
    source: 'landing_hero',
    createdAt: new Date('2025-01-08').toISOString(),
  },
];
