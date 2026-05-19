export type DogSize = 'small' | 'medium' | 'large' | 'extra-large';

export type PackageId = 'essential' | 'signature' | 'luxury';

export type LeadStatus = 'new' | 'contacted' | 'booked' | 'completed';

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  dogName: string;
  dogBreed: string;
  dogSize: DogSize;
  packageId: PackageId;
  eventDate: string;
  status: LeadStatus;
  createdAt: string;
  notes?: string;
};

export type OnboardingData = {
  ownerName: string;
  email: string;
  phone?: string;
  dogName: string;
  dogBreed: string;
  dogSize: DogSize;
  packageId: PackageId;
  eventDate: string;
  notes?: string;
};

export type Package = {
  id: PackageId;
  name: string;
  tagline: string;
  price: number;
  features: string[];
  highlighted?: boolean;
};

export type Testimonial = {
  id: string;
  name: string;
  location: string;
  dogName: string;
  dogBreed: string;
  packageId: PackageId;
  rating: number;
  quote: string;
  emoji: string;
};

export type AppState = {
  leads: Lead[];
  onboarding: Partial<OnboardingData>;
};

export type AppAction =
  | { type: 'ADD_LEAD'; payload: Lead }
  | { type: 'UPDATE_LEAD'; payload: Lead }
  | { type: 'SET_ONBOARDING'; payload: Partial<OnboardingData> }
  | { type: 'RESET_ONBOARDING' };

export type TrackingEvent = {
  name: string;
  properties?: Record<string, unknown>;
};
