export type AppEvent =
  | 'landing_page_cta_click'
  | 'waitlist_signup'
  | 'onboarding_complete'
  | 'dashboard_view'
  | 'admin_view';

export type Package = {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  emoji: string;
  tag?: string | null;
};

export type Booking = {
  id: string;
  ownerName: string;
  email: string;
  phone: string;
  dogName: string;
  dogBreed: string;
  dogSize: string;
  eventDate: string;
  eventLocation: string;
  packageId: string;
  packageName: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  notes?: string;
};

export type Lead = {
  id: string;
  email: string;
  name: string;
  source: string;
  createdAt: string;
};

export type AddBookingInput = {
  ownerName: string;
  email: string;
  phone: string;
  dogName: string;
  dogBreed: string;
  dogSize: string;
  eventDate: string;
  eventLocation: string;
  packageId: string;
  packageName: string;
  notes?: string;
};
