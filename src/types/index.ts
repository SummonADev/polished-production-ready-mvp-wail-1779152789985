export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

export interface Booking {
  id: string;
  ownerName: string;
  ownerEmail: string;
  dogName: string;
  dogBreed: string;
  packageId: string;
  eventDate: string;
  status: BookingStatus;
  createdAt: string;
}

export interface Lead {
  id: string;
  email: string;
  name: string;
  source: string;
  createdAt: string;
}

export interface Package {
  id: string;
  name: string;
  price: string;
  period: string;
  emoji: string;
  tag: string | null;
  description: string;
  features: string[];
}
