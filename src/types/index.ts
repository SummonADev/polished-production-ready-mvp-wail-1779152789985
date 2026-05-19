export type UserRole = 'couple' | 'planner' | 'other';

export type OnboardingData = {
  name: string;
  email: string;
  role: UserRole;
  dogName: string;
  dogBreed: string;
  dogAge: string;
  eventDate: string;
  painPoints: string[];
  goalStatement: string;
  surveyAnswers: Record<string, string>;
  completedAt: string;
};

export type PackageId = 'essential' | 'signature' | 'elite';

export type Package = {
  id: PackageId;
  name: string;
  price: number;
  tagline: string;
  features: string[];
  highlighted: boolean;
};

export type WorkflowStep = {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'active' | 'complete';
};

export type BookingPlan = {
  packageId: PackageId;
  dogName: string;
  dogBreed: string;
  dogAge: string;
  dogSize: string;
  eventDate: string;
  eventLocation: string;
  specialRequirements: string;
  style: string;
  colorScheme: string;
  selectedAddons: string[];
  generatedAt: string;
};

export type Lead = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  dogName: string;
  dogBreed: string;
  dogAge: string;
  eventDate: string;
  painPoints: string[];
  goalStatement: string;
  surveyAnswers: Record<string, string>;
  bookingPlan: BookingPlan | null;
  createdAt: string;
};

export type AppState = {
  user: OnboardingData | null;
  bookingPlan: BookingPlan | null;
  leads: Lead[];
  analytics: AnalyticsEvent[];
};

export type AnalyticsEvent = {
  event: string;
  timestamp: string;
  data?: Record<string, string>;
};
