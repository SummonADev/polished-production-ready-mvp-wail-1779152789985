export type PackageId = 'essential' | 'signature' | 'elite' | 'premium' | 'essentials';

export type LeadStatus = 'inquiry' | 'confirmed' | 'completed' | 'cancelled';

export type UserRole = 'bride' | 'groom' | 'planner' | 'other';

export interface Lead {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  packageId: PackageId;
  status: LeadStatus;
  dogName: string;
  dogBreed: string;
  dogAge: string;
  eventDate: string;
  goalStatement?: string;
  createdAt: string;
  surveyAnswers?: Record<string, unknown>;
}

export interface OnboardingData {
  name: string;
  email: string;
  role: UserRole;
  dogName: string;
  dogBreed: string;
  dogAge: string;
  eventDate: string;
  goalStatement?: string;
}

export interface Package {
  id: PackageId;
  name: string;
  tagline: string;
  price: number;
  features: string[];
  highlighted?: boolean;
}

export interface BookingPlan {
  packageId: PackageId;
  leadId: string;
  confirmedAt: string;
  notes?: string;
}

export interface AnalyticsEvent {
  event: string;
  properties?: Record<string, unknown>;
  timestamp: string;
}

export interface AppState {
  leads: Lead[];
  onboardingData: OnboardingData | null;
  user: Lead | null;
  bookingPlan: BookingPlan | null;
  analytics: AnalyticsEvent[];
}
